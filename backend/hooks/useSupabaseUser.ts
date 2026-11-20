"use client";
// hooks/useSupabaseUser.ts
// Reactive hook that gives you the current Supabase user + profile + subscription status
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  branch: string | null;
  year: string | null;
  is_pro: boolean;
  avatar_url: string | null;
}

export interface SubscriptionInfo {
  plan: "free" | "pro";
  status: string;
  billing_cycle: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  stripe_customer_id: string | null;
  razorpay_subscription_id: string | null;
}

export function useSupabaseUser() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [subscription, setSubscription] = useState<SubscriptionInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [localPro, setLocalPro] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    // Check initial local pro status
    const checkLocalPro = () => {
      try {
        const isSet =
          localStorage.getItem("is_pro") === "true" ||
          localStorage.getItem("campusgrow_pro") === "true";
        setLocalPro(isSet);
      } catch {
        setLocalPro(false);
      }
    };

    checkLocalPro();

    // Listen for custom and cross-tab storage changes
    window.addEventListener("storage", checkLocalPro);
    window.addEventListener("campusgrow_subscription_updated", checkLocalPro);

    // Get initial session
    supabase.auth
      .getUser()
      .then(async ({ data: { user } }) => {
        setUser(user);
        if (user) await fetchProfile(user.id);
        setLoading(false);
      })
      .catch((err) => {
        console.warn("[Auth] Could not fetch user session:", err);
        setLoading(false);
      });

    // Subscribe to auth changes
    const { data: { subscription: authSub } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchProfile(session.user.id);
        } else {
          setProfile(null);
          setSubscription(null);
        }
        setLoading(false);
      }
    );

    return () => {
      window.removeEventListener("storage", checkLocalPro);
      window.removeEventListener("campusgrow_subscription_updated", checkLocalPro);
      authSub.unsubscribe();
    };
  }, []);

  async function fetchProfile(userId: string) {
    const [{ data: prof }, { data: sub }] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", userId).single(),
      supabase.from("subscriptions").select("*").eq("user_id", userId).single(),
    ]);
    if (prof) setProfile(prof as UserProfile);
    if (sub) setSubscription(sub as SubscriptionInfo);
  }

  const isPro = Boolean(
    localPro ||
    profile?.is_pro === true ||
    (subscription?.plan === "pro" && subscription?.status === "active")
  );

  const signOut = () => supabase.auth.signOut();

  return {
    user,
    profile,
    subscription,
    isPro,
    loading,
    signOut,
    refetch: () => user && fetchProfile(user.id),
  };
}
