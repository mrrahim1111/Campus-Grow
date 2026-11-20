// lib/supabase/server.ts
// Server-side Supabase client — use inside Server Components, Server Actions, Route Handlers
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const DEFAULT_SUPABASE_URL = "https://whwtzpizozuuubliwwwi.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY = "sb_publishable_Y32XDDkG2D5nYHsSkjocjQ_25RcfLSI";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll called from a Server Component — cookies can only be set
            // in Server Actions / Route Handlers. Safe to ignore here.
          }
        },
      },
    }
  );
}
