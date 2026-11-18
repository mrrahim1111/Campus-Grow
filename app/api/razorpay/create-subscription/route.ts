import { NextRequest, NextResponse } from "next/server";
import { createRazorpayClient, RAZORPAY_PLANS } from "@/lib/razorpay";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

type BillingCycle = keyof typeof RAZORPAY_PLANS;

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Please sign in before subscribing." }, { status: 401 });
  }

  let body: { billingCycle?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (body.billingCycle !== "monthly" && body.billingCycle !== "annual") {
    return NextResponse.json({ error: "Choose a valid billing cycle." }, { status: 400 });
  }

  const billingCycle: BillingCycle = body.billingCycle;
  const selectedPlan = RAZORPAY_PLANS[billingCycle];

  if (!selectedPlan.id) {
    console.error(`[Razorpay] Missing plan ID for ${billingCycle} subscriptions.`);
    return NextResponse.json({ error: "This subscription plan is not configured yet." }, { status: 503 });
  }

  try {
    const { client: razorpay, keyId } = createRazorpayClient();
    const remotePlan = await razorpay.plans.fetch(selectedPlan.id);
    if (
      Number(remotePlan.item.amount) !== selectedPlan.amount ||
      remotePlan.item.currency !== selectedPlan.currency ||
      remotePlan.period !== selectedPlan.period ||
      remotePlan.interval !== selectedPlan.interval
    ) {
      console.error(`[Razorpay] Configured ${billingCycle} plan does not match the expected amount/currency/interval.`);
      return NextResponse.json({ error: "The subscription plan is misconfigured." }, { status: 503 });
    }

    const { data: currentSubscription, error: currentSubscriptionError } = await supabaseAdmin
      .from("subscriptions")
      .select("status, plan, razorpay_subscription_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (currentSubscriptionError) throw currentSubscriptionError;
    if (currentSubscription?.plan === "pro" && currentSubscription.status === "active") {
      return NextResponse.json({ error: "You already have an active Pro subscription." }, { status: 409 });
    }

    if (currentSubscription?.razorpay_subscription_id) {
      const previous = await razorpay.subscriptions.fetch(currentSubscription.razorpay_subscription_id);
      if (["created", "authenticated", "pending", "active"].includes(previous.status)) {
        await razorpay.subscriptions.cancel(previous.id, false);
      }
    }

    const subscription = await razorpay.subscriptions.create({
      plan_id: selectedPlan.id,
      total_count: selectedPlan.totalCount,
      customer_notify: true,
      notes: {
        user_id: user.id,
        billing_cycle: billingCycle,
      },
    });

    const { error: saveError } = await supabaseAdmin
      .from("subscriptions")
      .upsert(
        {
          user_id: user.id,
          razorpay_subscription_id: subscription.id,
          plan: "free",
          status: subscription.status,
          billing_cycle: billingCycle,
          current_period_start: null,
          current_period_end: null,
          cancel_at_period_end: false,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      );

    if (saveError) {
      await razorpay.subscriptions.cancel(subscription.id, false);
      throw saveError;
    }

    return NextResponse.json({
      subscriptionId: subscription.id,
      keyId,
      planName: selectedPlan.name,
      planDescription: selectedPlan.description,
      user: {
        name: user.user_metadata?.name || "",
        email: user.email || "",
      },
    });
  } catch (error) {
    console.error("[Razorpay] Subscription creation failed:", error);
    return NextResponse.json({ error: "Unable to start the subscription. Please try again." }, { status: 502 });
  }
}
