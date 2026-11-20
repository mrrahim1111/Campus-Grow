import { defineConfig, loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";
import vinext from "vinext";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "NEXT_PUBLIC_");

  return {
    define: {
      "process.env.NEXT_PUBLIC_SUPABASE_URL": JSON.stringify(env.NEXT_PUBLIC_SUPABASE_URL ?? ""),
      "process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY": JSON.stringify(env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""),
      "process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID": JSON.stringify(env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? ""),
    },
    css: { postcss: {} },
    plugins: [
      tailwindcss(),
      vinext(),
      cloudflare({
        viteEnvironment: {
          name: "rsc",
          childEnvironments: ["ssr"],
        },
      }),
    ],
  };
});
