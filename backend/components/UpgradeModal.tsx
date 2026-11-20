"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureTitle?: string;
}

export default function UpgradeModal({ isOpen, onClose, featureTitle }: UpgradeModalProps) {
  const router = useRouter();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card">("upi");
  const [upiApp, setUpiApp] = useState<"gpay" | "phonepe" | "paytm" | "bhim">("gpay");
  const [errorMessage, setErrorMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  // Zero-cost instant UPI upgrade handler for testing & seamless access
  const handleUpiZeroCostCheckout = async () => {
    setIsProcessing(true);
    setErrorMessage("");
    setStatusMessage("Connecting to UPI Gateway (Zero-Cost Verification)...");

    try {
      // Short realistic delay simulating UPI intent handshake
      await new Promise((resolve) => setTimeout(resolve, 600));

      // Save Pro access status locally
      localStorage.setItem("is_pro", "true");
      localStorage.setItem("campusgrow_pro", "true");
      localStorage.setItem(
        "campusgrow_subscription",
        JSON.stringify({
          plan: "pro",
          status: "active",
          billingCycle,
          method: paymentMethod === "upi" ? `UPI (${upiApp.toUpperCase()})` : "Card / NetBanking",
          activatedAt: new Date().toISOString(),
          testMode: true,
        })
      );

      // Trigger cross-component reactive state updates
      window.dispatchEvent(new Event("campusgrow_subscription_updated"));
      window.dispatchEvent(new Event("storage"));

      // Notify server / Supabase in background (if logged in)
      try {
        await fetch("/api/subscription/free-upgrade", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ billingCycle }),
        });
      } catch {
        // Local activation succeeds even if offline
      }

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        window.location.reload();
      }, 1400);
    } catch (err) {
      console.error("[UPI Upgrade Error]:", err);
      setErrorMessage("Something went wrong with the instant activation. Please retry.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleResetToFree = () => {
    try {
      localStorage.removeItem("is_pro");
      localStorage.removeItem("campusgrow_pro");
      localStorage.removeItem("campusgrow_subscription");
      window.dispatchEvent(new Event("campusgrow_subscription_updated"));
      window.dispatchEvent(new Event("storage"));
      window.location.reload();
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 dark:bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/95 dark:bg-[#0B1220]/95 backdrop-blur-2xl p-6 sm:p-8 text-slate-900 dark:text-white shadow-2xl transition-colors">
        {/* Glow effect */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-cyan-500/15 blur-3xl" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 h-9 w-9 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition flex items-center justify-center text-sm font-bold border border-slate-200 dark:border-white/10 cursor-pointer"
        >
          ✕
        </button>

        {isSuccess ? (
          <div className="py-12 text-center animate-in zoom-in-95 duration-300">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 text-4xl text-emerald-500 dark:text-emerald-400 border border-emerald-500/30">
              ✓
            </div>
            <h3 className="mt-6 text-3xl font-extrabold text-slate-950 dark:text-white">CampusGrow Pro Unlocked!</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-zinc-300">
              All quizzes, mock interviews, AI resume tools, and capstone projects are now active.
            </p>
          </div>
        ) : (
          <>
            <div className="text-center">
              <span className="inline-block rounded-full border border-emerald-500/40 bg-emerald-500/15 px-4 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                ⭐ CampusGrow Pro
              </span>
              <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">
                {featureTitle ? `Unlock ${featureTitle}` : "Supercharge Your Engineering Career"}
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-zinc-300">
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Learning & AI Mentor are always 100% Free.</span>
                <br />
                Upgrade to Pro to unlock industry interviews, timed assessments, and AI resume builder.
              </p>
            </div>

            {/* Billing Toggle */}
            <div className="mt-6 flex justify-center">
              <div className="flex items-center rounded-xl bg-slate-100 dark:bg-white/5 p-1 border border-slate-200 dark:border-white/10 text-xs font-semibold">
                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={`rounded-lg px-4 py-1.5 transition cursor-pointer ${
                    billingCycle === "monthly" ? "bg-gradient-to-r from-[#13C995] to-[#55C8FF] text-slate-950 font-extrabold shadow-sm" : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  Monthly (₹129 / mo)
                </button>
                <button
                  onClick={() => setBillingCycle("annual")}
                  className={`rounded-lg px-4 py-1.5 transition cursor-pointer ${
                    billingCycle === "annual" ? "bg-gradient-to-r from-[#13C995] to-[#55C8FF] text-slate-950 font-extrabold shadow-sm" : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  Annual (₹999 / yr) <span className="text-[10px] text-emerald-950 bg-emerald-300 px-1.5 py-0.5 rounded ml-1 font-bold">Save 35%</span>
                </button>
              </div>
            </div>

            {/* Feature Matrix */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
              {/* Free Card */}
              <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-white/[0.03] p-4 text-slate-800 dark:text-zinc-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wider text-[11px]">Free Starter Tier</p>
                    <span className="text-[10px] text-slate-500 dark:text-zinc-400 bg-slate-200/70 dark:bg-zinc-800 px-2 py-0.5 rounded-full font-medium">Included</span>
                  </div>
                  <ul className="mt-3 space-y-1.5 text-slate-600 dark:text-zinc-300">
                    <li className="flex items-center gap-2"><span className="text-emerald-500 font-bold">✓</span> All 10 C/Systems Lessons</li>
                    <li className="flex items-center gap-2"><span className="text-emerald-500 font-bold">✓</span> 24/7 AI Engineering Mentor</li>
                    <li className="flex items-center gap-2"><span className="text-emerald-500 font-bold">✓</span> Student Profile & Dashboard</li>
                    <li className="flex items-center gap-2"><span className="text-emerald-500 font-bold">✓</span> Career Roadmaps</li>
                    <li className="flex items-center gap-2 text-slate-400 dark:text-zinc-500"><span className="font-bold">✕</span> Quizzes & Test Series</li>
                    <li className="flex items-center gap-2 text-slate-400 dark:text-zinc-500"><span className="font-bold">✕</span> Mock Written & Live Interviews</li>
                    <li className="flex items-center gap-2 text-slate-400 dark:text-zinc-500"><span className="font-bold">✕</span> AI Resume Builder & Video Recs</li>
                  </ul>
                </div>
              </div>

              {/* Pro Card */}
              <div className="rounded-2xl border-2 border-emerald-500/80 bg-emerald-50/60 dark:bg-emerald-950/30 p-4 text-slate-900 dark:text-white shadow-lg shadow-emerald-500/10 relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 bg-[#13C995] text-slate-950 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-bl-lg">
                  UNLIMITED
                </div>
                <div>
                  <p className="font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider text-[11px]">CampusGrow Pro</p>
                  <ul className="mt-3 space-y-1.5 text-slate-800 dark:text-zinc-100 font-medium">
                    <li className="flex items-center gap-2"><span className="text-emerald-500 font-bold">✓</span> Everything in Free Tier</li>
                    <li className="flex items-center gap-2"><span className="text-emerald-500 font-bold">✓</span> Full Certification Quizzes</li>
                    <li className="flex items-center gap-2"><span className="text-emerald-500 font-bold">✓</span> Mock Tech & HR Interviews</li>
                    <li className="flex items-center gap-2"><span className="text-emerald-500 font-bold">✓</span> AI Resume Builder & Skill Gap</li>
                    <li className="flex items-center gap-2"><span className="text-emerald-500 font-bold">✓</span> Production Capstone Projects</li>
                    <li className="flex items-center gap-2"><span className="text-emerald-500 font-bold">✓</span> Priority Mentorship</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* UPI / Payment Options */}
            <div className="mt-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-zinc-900/60 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-700 dark:text-zinc-300">Choose Payment Method:</span>
                <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-500/40 px-2 py-0.5 rounded-full">
                  Zero-Cost Dev Mode
                </span>
              </div>

              {/* Method tabs */}
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold mb-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("upi")}
                  className={`py-2 px-3 rounded-xl border transition flex items-center justify-center gap-2 cursor-pointer ${
                    paymentMethod === "upi"
                      ? "border-emerald-500 bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 font-bold shadow-xs"
                      : "border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <span>📱</span>
                  <span>UPI Instant (Preferred)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`py-2 px-3 rounded-xl border transition flex items-center justify-center gap-2 cursor-pointer ${
                    paymentMethod === "card"
                      ? "border-emerald-500 bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 font-bold shadow-xs"
                      : "border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <span>💳</span>
                  <span>Cards / NetBanking</span>
                </button>
              </div>

              {/* UPI App Chips */}
              {paymentMethod === "upi" && (
                <div className="grid grid-cols-4 gap-2 text-[11px] font-semibold">
                  {[
                    { id: "gpay", label: "GPay", icon: "🟢" },
                    { id: "phonepe", label: "PhonePe", icon: "🟣" },
                    { id: "paytm", label: "Paytm", icon: "🔵" },
                    { id: "bhim", label: "BHIM / Any", icon: "⚡" },
                  ].map((app) => (
                    <button
                      key={app.id}
                      type="button"
                      onClick={() => setUpiApp(app.id as any)}
                      className={`p-2 rounded-xl border text-center transition cursor-pointer ${
                        upiApp === app.id
                          ? "border-emerald-500 bg-emerald-500/20 text-emerald-950 dark:text-white font-bold"
                          : "border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200"
                      }`}
                    >
                      <span className="block text-sm">{app.icon}</span>
                      <span className="mt-0.5 block">{app.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Action button */}
            <div className="mt-5">
              {errorMessage && <p role="alert" className="mb-3 text-sm font-semibold text-red-500 dark:text-red-400">{errorMessage}</p>}
              {statusMessage && <p role="status" className="mb-3 text-sm font-semibold text-amber-600 dark:text-amber-300">{statusMessage}</p>}
              <button
                type="button"
                onClick={handleUpiZeroCostCheckout}
                disabled={isProcessing}
                className="w-full rounded-2xl bg-gradient-to-r from-[#13C995] to-[#55C8FF] hover:brightness-110 py-4 text-sm font-black text-slate-950 transition shadow-lg shadow-emerald-500/25 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 active:scale-98"
              >
                {isProcessing ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
                    <span>{statusMessage || "Processing UPI Instant Handshake..."}</span>
                  </>
                ) : (
                  <>
                    <span>⚡ Subscribe with UPI ({billingCycle === "monthly" ? "₹129/mo" : "₹999/yr"})</span>
                    <span>→ Free Instant Upgrade</span>
                  </>
                )}
              </button>

              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 dark:text-zinc-400">
                <span>Renews automatically • Cancel anytime</span>
                <button
                  type="button"
                  onClick={handleResetToFree}
                  className="text-slate-500 dark:text-zinc-500 hover:text-slate-800 dark:hover:text-zinc-300 underline cursor-pointer"
                >
                  Reset to Free (To test paywall)
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
