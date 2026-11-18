// lib/supabase/admin.ts
// Admin Supabase client with Service Role key — SERVER ONLY, never import in client code
// Used for: webhook handlers, admin operations that bypass RLS
import { createClient } from "@supabase/supabase-js";

// This must only ever run on the server
if (typeof window !== "undefined") {
  throw new Error("lib/supabase/admin.ts must only be used on the server.");
}

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);
