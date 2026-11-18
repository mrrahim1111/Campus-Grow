// app/api/auth/callback/route.ts
// Handles Supabase OAuth (Google) and email confirmation callbacks
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  // Where to go after successful login
  const next = searchParams.get("next") ?? "/dashboard";

  // If Supabase/Google returned an error
  if (error) {
    console.error("[Auth Callback] OAuth error:", error, errorDescription);
    const url = new URL("/", origin);
    url.searchParams.set("error", errorDescription ?? error);
    return NextResponse.redirect(url.toString());
  }

  if (code) {
    const supabase = await createClient();
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError) {
      console.error("[Auth Callback] Code exchange failed:", exchangeError.message);
      const url = new URL("/", origin);
      url.searchParams.set("error", exchangeError.message);
      return NextResponse.redirect(url.toString());
    }

    // Successful — redirect to the intended destination
    const forwardedHost = request.headers.get("x-forwarded-host");
    const isLocalEnv = process.env.NODE_ENV === "development";

    if (isLocalEnv) {
      return NextResponse.redirect(`${origin}${next}`);
    } else if (forwardedHost) {
      return NextResponse.redirect(`https://${forwardedHost}${next}`);
    } else {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // No code — something went wrong
  console.error("[Auth Callback] No code in callback URL");
  return NextResponse.redirect(`${origin}/?error=missing_auth_code`);
}
