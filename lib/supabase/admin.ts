// lib/supabase/admin.ts
// Admin Supabase client with Service Role key — SERVER ONLY, never import in client code
// Used for: webhook handlers, admin operations that bypass RLS
import { createClient } from "@supabase/supabase-js";

// This must only ever run on the server
if (typeof window !== "undefined") {
  throw new Error("lib/supabase/admin.ts must only be used on the server.");
}

const DEFAULT_SUPABASE_URL = "https://whwtzpizozuuubliwwwi.supabase.co";

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_Y32XDDkG2D5nYHsSkjocjQ_25RcfLSI",
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);
