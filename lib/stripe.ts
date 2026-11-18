// lib/stripe.ts
// Server-side Stripe client — never import in client components
import Stripe from "stripe";

// Safe fallback for build-time evaluation when environment variables are not yet injected
const stripeSecretKey =
  process.env.STRIPE_SECRET_KEY || "sk_test_placeholder_for_build_time_evaluation";

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2026-08-26.dahlia" as any,
  typescript: true,
});

export function isStripeConfigured(): boolean {
  return Boolean(
    process.env.STRIPE_SECRET_KEY &&
      process.env.STRIPE_SECRET_KEY !== "sk_test_placeholder_for_build_time_evaluation"
  );
}

// ─── Price IDs ────────────────────────────────────────────────────────────────
export const STRIPE_PRICES = {
  monthly: process.env.STRIPE_PRICE_MONTHLY || "",
  annual: process.env.STRIPE_PRICE_ANNUAL || "",
} as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Create or retrieve a Stripe customer for a user */
export async function getOrCreateStripeCustomer(
  userId: string,
  email: string,
  name: string
): Promise<string> {
  if (!isStripeConfigured()) {
    throw new Error("Stripe secret key is not configured in environment variables.");
  }

  // Check if customer already exists by searching metadata
  const existing = await stripe.customers.search({
    query: `metadata["supabase_user_id"]:"${userId}"`,
    limit: 1,
  });

  if (existing.data.length > 0) {
    return existing.data[0].id;
  }

  // Create new customer
  const customer = await stripe.customers.create({
    email,
    name,
    metadata: { supabase_user_id: userId },
  });

  return customer.id;
}

/** Create a Stripe Checkout Session for a subscription upgrade */
export async function createCheckoutSession({
  customerId,
  priceId,
  userId,
  successUrl,
  cancelUrl,
}: {
  customerId: string;
  priceId: string;
  userId: string;
  successUrl: string;
  cancelUrl: string;
}): Promise<string> {
  if (!isStripeConfigured()) {
    throw new Error("Stripe secret key is not configured in environment variables.");
  }

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    mode: "subscription",
    success_url: successUrl,
    cancel_url: cancelUrl,
    subscription_data: {
      metadata: { supabase_user_id: userId },
    },
    metadata: { supabase_user_id: userId },
    allow_promotion_codes: true,
  });

  return session.url!;
}

/** Create a Stripe Customer Portal session for managing billing */
export async function createPortalSession(
  customerId: string,
  returnUrl: string
): Promise<string> {
  if (!isStripeConfigured()) {
    throw new Error("Stripe secret key is not configured in environment variables.");
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });
  return session.url;
}
