import crypto from "node:crypto";
import { RAZORPAY_PLANS } from "@/lib/razorpay";
import { supabaseAdmin } from "@/lib/supabase/admin";

export type RazorpaySubscriptionEntity = {
  id: string;
  status: string;
  plan_id: string;
  current_start?: number | null;
  current_end?: number | null;
};

export async function syncRazorpaySubscription(subscription: RazorpaySubscriptionEntity) {
  const { data: current, error: lookupError } = await supabaseAdmin
    .from("subscriptions")
    .select("user_id, billing_cycle")
    .eq("razorpay_subscription_id", subscription.id)
    .maybeSingle();

  if (lookupError) throw lookupError;
  if (!current) return false;
  if (current.billing_cycle !== "monthly" && current.billing_cycle !== "annual") {
    throw new Error(`Subscription ${subscription.id} has an unsupported billing cycle.`);
  }
  const configuredPlan = current.billing_cycle === "monthly" ? RAZORPAY_PLANS.monthly : RAZORPAY_PLANS.annual;
  if (subscription.plan_id !== configuredPlan.id) {
    throw new Error(`Subscription ${subscription.id} does not match its configured plan.`);
  }

  const isActive = subscription.status === "active";
  const periodStart = subscription.current_start
    ? new Date(subscription.current_start * 1000).toISOString()
    : null;
  const periodEnd = subscription.current_end
    ? new Date(subscription.current_end * 1000).toISOString()
    : null;
  const now = new Date().toISOString();

  const subscriptionUpdate = {
    plan: isActive ? "pro" : "free",
    status: subscription.status,
    current_period_start: periodStart,
    current_period_end: periodEnd,
    updated_at: now,
    ...(subscription.status === "cancelled" ? { cancel_at_period_end: false } : {}),
  };
  const { error: subscriptionError } = await supabaseAdmin
    .from("subscriptions")
    .update(subscriptionUpdate)
    .eq("user_id", current.user_id)
    .eq("razorpay_subscription_id", subscription.id);

  if (subscriptionError) throw subscriptionError;

  const { error: profileError } = await supabaseAdmin
    .from("profiles")
    .update({ is_pro: isActive, updated_at: now })
    .eq("id", current.user_id);

  if (profileError) throw profileError;
  return true;
}

export function verifyRazorpaySignature(payload: string, signature: string, secret: string) {
  if (!/^[a-f\d]{64}$/i.test(signature)) return false;

  const expected = Buffer.from(crypto.createHmac("sha256", secret).update(payload).digest("hex"), "hex");
  const received = Buffer.from(signature, "hex");
  return expected.length === received.length && crypto.timingSafeEqual(expected, received);
}
