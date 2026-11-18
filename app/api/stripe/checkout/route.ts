// app/api/stripe/checkout/route.ts
// Creates a Stripe Checkout session for PRO subscription upgrade
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  stripe,
  STRIPE_PRICES,
  getOrCreateStripeCustomer,
  createCheckoutSession,
} from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const billingCycle: "monthly" | "annual" = body.billingCycle ?? "monthly";
    const priceId = STRIPE_PRICES[billingCycle];

    if (!priceId) {
      return NextResponse.json({ error: "Invalid billing cycle" }, { status: 400 });
    }

    // Get user profile for name
    const { data: profile } = await supabase
      .from("profiles")
      .select("name, email")
      .eq("id", user.id)
      .single();

    // Get or create Stripe customer
    const customerId = await getOrCreateStripeCustomer(
      user.id,
      user.email!,
      profile?.name ?? user.email!
    );

    // Update subscription record with customer ID
    await supabase.from("subscriptions").upsert({
      user_id: user.id,
      stripe_customer_id: customerId,
    }, { onConflict: "user_id" });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    const checkoutUrl = await createCheckoutSession({
      customerId,
      priceId,
      userId: user.id,
      successUrl: `${appUrl}/dashboard?upgraded=true`,
      cancelUrl: `${appUrl}/dashboard?upgrade=canceled`,
    });

    return NextResponse.json({ url: checkoutUrl });
  } catch (err) {
    console.error("[Stripe Checkout Error]", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
