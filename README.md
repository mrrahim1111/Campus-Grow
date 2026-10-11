This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Razorpay subscriptions

The Pro checkout uses automatically renewing Razorpay subscriptions. To configure it:

1. In Razorpay, create a monthly plan for **₹129 INR** and a yearly plan for **₹999 INR**.
2. Add the matching Razorpay API key ID and secret, both plan IDs, and a webhook secret to `.env.local` using [.env.example](./.env.example). Keep test credentials and test plans together; do not mix them with live credentials or plans.
3. In Razorpay, configure a webhook for `https://<your-app-domain>/api/webhooks/razorpay` with the same webhook secret. Subscribe to `subscription.authenticated`, `subscription.activated`, `subscription.charged`, `subscription.completed`, `subscription.halted`, `subscription.cancelled`, `subscription.pending`, `subscription.updated`, `subscription.paused`, and `subscription.resumed`.
4. Apply [the subscription migration](./supabase/migrations/20261003_razorpay_subscriptions.sql) in the Supabase SQL Editor.
5. Restart the app after changing environment variables. Test the complete subscribe, renewal, and end-of-cycle cancellation flow with Razorpay test credentials before using live credentials.

Razorpay requires a finite `total_count`: the monthly plan is set to 120 charges and the yearly plan to 10 charges. Users can schedule cancellation from the dashboard; Pro access remains active through the current billing period.

## Cloudflare Workers deployment

This project uses [vinext](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/) to deploy its Next.js App Router on Cloudflare Workers. The Cloudflare build has been compatibility-checked; vinext is still in beta, so validate the deployed preview before using it for customers.

1. Copy [.env.example](./.env.example) to `.env.local` and fill in the public Supabase settings. The built-in study mentor runs in the browser and does not need a separate AI provider key.
2. For local Worker development, copy [.dev.vars.example](./.dev.vars.example) to `.dev.vars` and add the server-only Supabase and Razorpay values. Never commit `.env.local` or `.dev.vars`.
3. Add a Cloudflare API token with Workers deployment permission as `CLOUDFLARE_API_TOKEN` in `.env.local`. Keep it private. Deploy with `npm run deploy:vinext`; the generated HTTPS `workers.dev` URL does not require a custom domain.
4. Add the rotated Supabase service key and Razorpay server-only values as Worker secrets in Cloudflare's dashboard. Set the webhook endpoint to `https://<your-worker>.workers.dev/api/webhooks/razorpay`.
5. Add the deployed origin and `/api/auth/callback` to Supabase Auth's allowed redirect URLs, and add the deployed origin to Google OAuth's authorized JavaScript origins. The Google OAuth redirect URI should remain Supabase's `/auth/v1/callback` URL.
6. Exercise login, account creation, subscription checkout, webhooks, and scheduled cancellation on the preview before enabling live Razorpay credentials or promoting it for customers.

The built-in study mentor has no third-party model quota, but it only responds to the topics implemented in the app; it is not a general-purpose conversational AI. Cloudflare and Supabase free tiers have usage and availability limits; check their terms and usage dashboards before accepting commercial traffic.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# CampusGrow
