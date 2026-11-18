// app/api/webhooks/stripe/route.ts
// Stripe Webhook handler — keeps the database in sync with Stripe subscription events
// IMPORTANT: This route must NOT use any auth middleware. It verifies with Stripe signature.
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase/admin";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("[Stripe Webhook] Signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      // ── Subscription created or updated ─────────────────────────────────
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata.supabase_user_id;

        if (!userId) {
          console.warn("[Webhook] No supabase_user_id in subscription metadata");
          break;
        }

        const priceId = subscription.items.data[0]?.price.id;
        const isActive = subscription.status === "active" || subscription.status === "trialing";

        await supabaseAdmin.from("subscriptions").upsert(
          {
            user_id: userId,
            stripe_subscription_id: subscription.id,
            stripe_price_id: priceId,
            plan: isActive ? "pro" : "free",
            status: subscription.status,
            current_period_start: subscription.items.data[0]?.current_period_start
              ? new Date(subscription.items.data[0].current_period_start * 1000).toISOString()
              : null,
            current_period_end: subscription.items.data[0]?.current_period_end
              ? new Date(subscription.items.data[0].current_period_end * 1000).toISOString()
              : null,
            cancel_at_period_end: subscription.cancel_at_period_end,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id" }
        );

        // Sync is_pro on profiles table
        await supabaseAdmin
          .from("profiles")
          .update({ is_pro: isActive, updated_at: new Date().toISOString() })
          .eq("id", userId);

        console.log(`[Webhook] Subscription ${subscription.status} for user ${userId}`);
        break;
      }

      // ── Subscription deleted / canceled ─────────────────────────────────
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata.supabase_user_id;

        if (!userId) break;

        await supabaseAdmin.from("subscriptions").update({
          plan: "free",
          status: "canceled",
          cancel_at_period_end: false,
          updated_at: new Date().toISOString(),
        }).eq("user_id", userId);

        await supabaseAdmin
          .from("profiles")
          .update({ is_pro: false, updated_at: new Date().toISOString() })
          .eq("id", userId);

        console.log(`[Webhook] Subscription canceled for user ${userId}`);
        break;
      }

      // ── Payment failed ───────────────────────────────────────────────────
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const subId = (invoice.parent?.subscription_details?.subscription ?? null) as string | null;

        if (subId) {
          await supabaseAdmin.from("subscriptions").update({
            status: "past_due",
            updated_at: new Date().toISOString(),
          }).eq("stripe_subscription_id", subId);
        }

        console.log(`[Webhook] Payment failed for subscription ${subId}`);
        break;
      }

      // ── Checkout completed ───────────────────────────────────────────────
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.supabase_user_id;
        const customerId = session.customer as string;

        if (userId && customerId) {
          await supabaseAdmin.from("subscriptions").upsert(
            { user_id: userId, stripe_customer_id: customerId },
            { onConflict: "user_id" }
          );
        }
        break;
      }

      default:
        console.log(`[Webhook] Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("[Stripe Webhook Error]", err);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
