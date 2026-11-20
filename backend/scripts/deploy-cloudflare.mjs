import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { loadEnv } from "vite";

const localEnv = loadEnv("production", process.cwd(), "");
const apiToken = process.env.CLOUDFLARE_API_TOKEN || localEnv.CLOUDFLARE_API_TOKEN;

if (!apiToken) {
  console.error("Set CLOUDFLARE_API_TOKEN in .env.local before deploying.");
  process.exit(1);
}

const cliPath = fileURLToPath(
  new URL("../node_modules/@vinext/cloudflare/dist/cli.js", import.meta.url)
);
const result = spawnSync(
  process.execPath,
  [cliPath, "deploy", "--config", "dist/server/wrangler.json", ...process.argv.slice(2)],
  {
    env: { ...process.env, CLOUDFLARE_API_TOKEN: apiToken },
    stdio: "inherit",
  }
);

if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
