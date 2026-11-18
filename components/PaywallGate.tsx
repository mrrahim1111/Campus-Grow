"use client";

import { useState, useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { FeatureKey, FEATURE_CONFIG } from "@/lib/subscription";
import { useSupabaseUser } from "@/hooks/useSupabaseUser";
import UpgradeModal from "@/components/UpgradeModal";
import BrandLogo from "@/components/BrandLogo";

interface PaywallGateProps {
  featureKey: FeatureKey;
  children: ReactNode;
  previewMode?: boolean;
}

export default function PaywallGate({ featureKey, children, previewMode = false }: PaywallGateProps) {
  const router = useRouter();
  const { isPro: isSupabasePro, loading: supabaseLoading } = useSupabaseUser();
  const [modalOpen, setModalOpen] = useState(false);
  const [isLocalPro, setIsLocalPro] = useState(false);

  useEffect(() => {
    const check = () => {
      try {
        setIsLocalPro(
          localStorage.getItem("is_pro") === "true" ||
          localStorage.getItem("campusgrow_pro") === "true"
        );
      } catch {
        setIsLocalPro(false);
      }
    };
    check();
    window.addEventListener("storage", check);
    window.addEventListener("campusgrow_subscription_updated", check);
    return () => {
      window.removeEventListener("storage", check);
      window.removeEventListener("campusgrow_subscription_updated", check);
    };
  }, []);

  const feature = FEATURE_CONFIG[featureKey];

  // If already Pro locally or through Supabase, unlock immediately
  if (feature?.isFree || isSupabasePro || isLocalPro) {
    return <>{children}</>;
  }

  // During SSR / initial client mount if not already unlocked locally
  if (supabaseLoading && !isLocalPro) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white text-gray-900">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  // If preview mode is enabled, render the full tool interface with a top upgrade banner
  if (previewMode) {
    return (
      <div className="relative w-full">
        <div className="bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-indigo-500/10 border-b border-amber-300/80 px-4 py-2 flex items-center justify-between text-xs sticky top-0 z-40 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
              ⚡ Studio Pro Preview Mode
            </span>
            <span className="text-slate-700 hidden sm:inline">
              You are previewing {feature?.title || "Studio"}. Upgrade to Pro to unlock live cloud compilers, unlimited Git commits, and persistent cloud storage.
            </span>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="btn-emerald-gradient px-3 py-1 rounded-xl text-xs font-bold shadow-xs cursor-pointer"
          >
            Upgrade to Pro →
          </button>
        </div>
        {children}
        <UpgradeModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </div>
    );
  }

  // Paywall UI for unsubscribed users attempting to access paid features
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col justify-between">
      {/* Navigation header */}
      <header className="border-b border-gray-200 bg-white/95 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
          <BrandLogo badge="Pro Required" />

          <div className="flex items-center text-sm">
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 font-medium">
              Plan: Free Starter
            </span>
          </div>
        </div>
      </header>

      {/* Paywall Main Card */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 text-center max-w-3xl mx-auto w-full">
        {/* Glowing Lock Badge */}
        <div className="relative mb-6">
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-emerald-500/20 to-amber-500/20 blur-xl animate-pulse" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 shadow-xl shadow-emerald-500/10">
            <svg
              className="h-10 w-10 text-emerald-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
        </div>

        {/* Tier Tag */}
        <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-800 mb-4 shadow-2xs">
          <span>🔒</span> PRO Feature
        </div>

        {/* Title & Description */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-950 leading-tight">
          Unlock {feature?.title || "Pro Feature"}
        </h1>

        <p className="mt-3.5 text-base md:text-lg text-gray-600 max-w-xl leading-relaxed">
          {feature?.description || "This feature is exclusively available for CampusGrow Pro members."}
        </p>

        {/* Free vs Pro Comparison Cards */}
        <div className="mt-8 w-full rounded-3xl border border-gray-200 bg-white p-6 text-left shadow-lg">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              ✨ Free Forever vs. Pro Upgrade
            </span>
            <span className="text-xs text-gray-500">
              Transparent Student Pricing
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 text-xs">
            {/* Free Card */}
            <div className="rounded-2xl border border-gray-200/90 bg-gray-50/80 p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <p className="font-bold text-gray-900 text-sm">🎁 Free Starter</p>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    ₹0 Always
                  </span>
                </div>
                <ul className="mt-3 space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>All 10 C & Systems Lessons</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>24/7 AI Engineering Mentor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>Student Profile & Progress</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>Career Roadmaps</span>
                  </li>
                </ul>
              </div>
              <p className="mt-4 text-[11px] text-gray-500 border-t border-gray-200 pt-2">
                No credit card or payment required.
              </p>
            </div>

            {/* Pro Card */}
            <div className="rounded-2xl border-2 border-emerald-500/80 bg-emerald-50/40 p-4 flex flex-col justify-between relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 rounded-bl-xl bg-emerald-500 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-black">
                PRO PASS
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p className="font-bold text-emerald-800 text-sm">⭐ CampusGrow Pro</p>
                </div>
                <ul className="mt-3 space-y-2 text-gray-800 font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Everything in Free Starter</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Quizzes & Timed Assessments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Mock Tech & HR Interviews</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>AI Resume Builder & Video Recs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Production Capstone Projects</span>
                  </li>
                </ul>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-emerald-200 pt-2">
                <span className="text-[11px] font-semibold text-emerald-700">
                  Starts at just ₹129 / month
                </span>
                <span className="text-[10px] text-gray-500">Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex items-center justify-center">
          <button
            onClick={() => setModalOpen(true)}
            className="w-full sm:w-auto rounded-2xl bg-emerald-500 hover:bg-emerald-400 px-8 py-4 text-base font-extrabold text-black transition shadow-lg shadow-emerald-500/25 active:scale-98 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Upgrade to Pro (₹129/mo)</span>
            <span>→</span>
          </button>
        </div>

        {/* Footer shortcuts */}
        <div className="mt-6 flex items-center gap-4 text-xs text-gray-600">
          <button
            onClick={() => router.push("/learning-hub")}
            className="hover:text-emerald-600 underline transition cursor-pointer"
          >
            Take me back to Learning Hub
          </button>
          <span>•</span>
          <button
            onClick={() => router.push("/mentor")}
            className="hover:text-emerald-600 underline transition cursor-pointer"
          >
            Chat with Free AI Mentor
          </button>
        </div>
      </main>

      <UpgradeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        featureTitle={feature?.title}
      />
    </div>
  );
}
