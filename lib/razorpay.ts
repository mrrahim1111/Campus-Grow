import Razorpay from "razorpay";

export const RAZORPAY_PLANS = {
  monthly: {
    id: process.env.RAZORPAY_PLAN_MONTHLY_ID,
    amount: 12900,
    currency: "INR",
    period: "monthly",
    interval: 1,
    totalCount: 120,
    name: "CampusGrow Pro Monthly",
    description: "CampusGrow Pro monthly subscription",
  },
  annual: {
    id: process.env.RAZORPAY_PLAN_ANNUAL_ID,
    amount: 99900,
    currency: "INR",
    period: "yearly",
    interval: 1,
    totalCount: 10,
    name: "CampusGrow Pro Annual",
    description: "CampusGrow Pro annual subscription",
  },
} as const;

export function createRazorpayClient() {
  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    throw new Error("Razorpay API credentials are not configured.");
  }

  return { client: new Razorpay({ key_id: keyId, key_secret: keySecret }), keyId };
}
