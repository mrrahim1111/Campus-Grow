import { NextRequest, NextResponse } from "next/server";
import { createRazorpayClient } from "@/lib/razorpay";
import {
  syncRazorpaySubscription,
  verifyRazorpaySignature,
  type RazorpaySubscriptionEntity,
} from "@/lib/razorpay-subscription-sync";

const SUBSCRIPTION_EVENTS = new Set([
  "subscription.authenticated",
  "subscription.activated",
  "subscription.charged",
  "subscription.completed",
  "subscription.halted",
  "subscription.cancelled",
  "subscription.pending",
  "subscription.updated",
  "subscription.paused",
  "subscription.resumed",
]);

function isSubscriptionEntity(value: unknown): value is RazorpaySubscriptionEntity {
  if (!value || typeof value !== "object") return false;
  const entity = value as Record<string, unknown>;
  return (
    typeof entity.id === "string" &&
    typeof entity.status === "string" &&
    typeof entity.plan_id === "string"
  );
}

export async function POST(request: NextRequest) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = request.headers.get("x-razorpay-signature");
  if (!secret || !signature) {
    return NextResponse.json({ error: "Webhook authentication is not configured." }, { status: 400 });
  }

  const body = await request.text();
  if (!verifyRazorpaySignature(body, signature, secret)) {
    return NextResponse.json({ error: "Invalid webhook signature." }, { status: 400 });
  }

  let event: {
    event?: unknown;
    payload?: { subscription?: { entity?: unknown } };
  };
  try {
    event = JSON.parse(body);
  } catch {
    return NextResponse.json({ error: "Invalid webhook payload." }, { status: 400 });
  }

  if (typeof event.event !== "string" || !SUBSCRIPTION_EVENTS.has(event.event)) {
    return NextResponse.json({ received: true });
  }

  const subscription = event.payload?.subscription?.entity;
  if (!isSubscriptionEntity(subscription)) {
    return NextResponse.json({ error: "Subscription is missing from the webhook payload." }, { status: 400 });
  }

  try {
    const { client: razorpay } = createRazorpayClient();
    const currentSubscription = await razorpay.subscriptions.fetch(subscription.id);
    await syncRazorpaySubscription(currentSubscription);
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[Razorpay Webhook] Subscription sync failed:", error);
    return NextResponse.json({ error: "Subscription update failed." }, { status: 500 });
  }
}
