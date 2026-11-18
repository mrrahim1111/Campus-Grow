import { NextResponse } from "next/server";
import { createRazorpayClient } from "@/lib/razorpay";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export async function POST() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Please sign in to manage your subscription." }, { status: 401 });
  }

  const { data: current, error: lookupError } = await supabaseAdmin
    .from("subscriptions")
    .select("razorpay_subscription_id, status, cancel_at_period_end")
    .eq("user_id", user.id)
    .maybeSingle();

  if (lookupError) {
    console.error("[Razorpay] Could not load subscription for cancellation:", lookupError);
    return NextResponse.json({ error: "Unable to load your subscription." }, { status: 500 });
  }
  if (!current?.razorpay_subscription_id || current.status !== "active") {
    return NextResponse.json({ error: "No active Razorpay subscription was found." }, { status: 404 });
  }
  if (current.cancel_at_period_end) {
    return NextResponse.json({ success: true, alreadyScheduled: true });
  }

  try {
    const { client: razorpay } = createRazorpayClient();
    const subscription = await razorpay.subscriptions.fetch(current.razorpay_subscription_id);
    if (subscription.status !== "active") {
      return NextResponse.json({ error: "This subscription is no longer active." }, { status: 409 });
    }

    await razorpay.subscriptions.cancel(subscription.id, true);
    const { error: updateError } = await supabaseAdmin
      .from("subscriptions")
      .update({ cancel_at_period_end: true, updated_at: new Date().toISOString() })
      .eq("user_id", user.id)
      .eq("razorpay_subscription_id", subscription.id);

    if (updateError) throw updateError;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Razorpay] Subscription cancellation failed:", error);
    return NextResponse.json({ error: "Unable to schedule cancellation. Please try again." }, { status: 502 });
  }
}
