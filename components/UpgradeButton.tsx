"use client";
// components/UpgradeButton.tsx
// Redirects user to Stripe Checkout for PRO upgrade
import { useState } from "react";

interface UpgradeButtonProps {
  billingCycle?: "monthly" | "annual";
  className?: string;
  children?: React.ReactNode;
}

export default function UpgradeButton({
  billingCycle = "monthly",
  className = "",
  children,
}: UpgradeButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpgrade = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ billingCycle }),
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        setError(data.error ?? "Failed to start checkout");
        return;
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleUpgrade}
        disabled={loading}
        className={`${className} disabled:opacity-60 disabled:cursor-not-allowed`}
      >
        {loading ? "Redirecting to payment..." : (children ?? "Upgrade to PRO")}
      </button>
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </div>
  );
}
