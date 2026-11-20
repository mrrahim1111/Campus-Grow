import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  try {
    let billingCycle = "monthly";
    try {
      const body = await request.json();
      if (body.billingCycle) billingCycle = body.billingCycle;
    } catch {
      // ignore
    }

    // Try to get authenticated Supabase user
    try {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const oneYearFromNow = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();

        // Update profile to is_pro = true
        await supabaseAdmin
          .from("profiles")
          .update({ is_pro: true, updated_at: new Date().toISOString() })
          .eq("id", user.id);

        // Upsert subscriptions record to active Pro
        await supabaseAdmin
          .from("subscriptions")
          .upsert(
            {
              user_id: user.id,
              plan: "pro",
              status: "active",
              billing_cycle: billingCycle,
              current_period_start: new Date().toISOString(),
              current_period_end: oneYearFromNow,
              cancel_at_period_end: false,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "user_id" }
          );
      }
    } catch (dbError) {
      console.warn("[Free Upgrade] Supabase sync skipped or failed (local state will still unlock):", dbError);
    }

    return NextResponse.json({
      success: true,
      isPro: true,
      billingCycle,
      message: "Pro subscription unlocked successfully without payment (Zero-Cost Verification).",
    });
  } catch (error) {
    console.error("[Free Upgrade Error]:", error);
    return NextResponse.json(
      { success: true, isPro: true, message: "Local Pro access unlocked." },
      { status: 200 }
    );
  }
}
