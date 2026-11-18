import { NextRequest, NextResponse } from "next/server";
import { createRazorpayClient, RAZORPAY_PLANS } from "@/lib/razorpay";
import { syncRazorpaySubscription, verifyRazorpaySignature } from "@/lib/razorpay-subscription-sync";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

type VerificationBody = {
  razorpay_payment_id?: unknown;
  razorpay_subscription_id?: unknown;
  razorpay_signature?: unknown;
};

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: VerificationBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid verification request." }, { status: 400 });
  }

  const paymentId = body.razorpay_payment_id;
  const subscriptionId = body.razorpay_subscription_id;
  const signature = body.razorpay_signature;
  if (
    typeof paymentId !== "string" ||
    typeof subscriptionId !== "string" ||
    typeof signature !== "string"
  ) {
    return NextResponse.json({ error: "Missing subscription verification details." }, { status: 400 });
  }

  const { data: localSubscription, error: lookupError } = await supabaseAdmin
    .from("subscriptions")
    .select("billing_cycle")
    .eq("user_id", user.id)
    .eq("razorpay_subscription_id", subscriptionId)
    .maybeSingle();

  if (lookupError) {
    console.error("[Razorpay] Could not find the user's pending subscription:", lookupError);
    return NextResponse.json({ error: "Unable to verify this subscription." }, { status: 500 });
  }
  if (!localSubscription || (localSubscription.billing_cycle !== "monthly" && localSubscription.billing_cycle !== "annual")) {
    return NextResponse.json({ error: "Subscription does not belong to this account." }, { status: 403 });
  }
  const billingCycle = localSubscription.billing_cycle;

  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) {
    console.error("[Razorpay] Missing API secret during subscription verification.");
    return NextResponse.json({ error: "Payment verification is not configured." }, { status: 503 });
  }
  if (!verifyRazorpaySignature(`${paymentId}|${subscriptionId}`, signature, secret)) {
    return NextResponse.json({ error: "Payment verification failed." }, { status: 400 });
  }

  try {
    const { client: razorpay } = createRazorpayClient();
    const remoteSubscription = await razorpay.subscriptions.fetch(subscriptionId);
    const plan = billingCycle === "monthly" ? RAZORPAY_PLANS.monthly : RAZORPAY_PLANS.annual;

    if (remoteSubscription.plan_id !== plan.id) {
      return NextResponse.json({ error: "Subscription plan does not match this purchase." }, { status: 400 });
    }
    if (!["authenticated", "active", "pending"].includes(remoteSubscription.status)) {
      return NextResponse.json({ error: "Razorpay has not authorized this subscription." }, { status: 402 });
    }

    await syncRazorpaySubscription(remoteSubscription);
    return NextResponse.json({
      success: true,
      active: remoteSubscription.status === "active",
      status: remoteSubscription.status,
    });
  } catch (error) {
    console.error("[Razorpay] Subscription verification failed:", error);
    return NextResponse.json({ error: "Unable to verify this subscription right now." }, { status: 502 });
  }
}
