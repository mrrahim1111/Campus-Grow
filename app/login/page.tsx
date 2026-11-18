"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import BrandLogo from "@/components/BrandLogo";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("redirect") ?? "/dashboard";
  const errorParam = searchParams.get("error");

  const supabase = createClient();

  const initialMode =
    searchParams.get("mode") === "signup" || searchParams.get("mode") === "register"
      ? "register"
      : "login";
  const [mode, setMode] = useState<"login" | "register">(initialMode);

  useEffect(() => {
    const requestedMode = searchParams.get("mode");
    if (requestedMode === "signup" || requestedMode === "register") {
      setMode("register");
    } else if (requestedMode === "login") {
      setMode("login");
    }
  }, [searchParams]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [branch, setBranch] = useState("CSC");
  const [year, setYear] = useState("1st Year");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    errorParam === "auth_callback_failed" ? "Authentication callback failed. Try again." : ""
  );
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<"google" | "github" | null>(null);

  // Redirect if already logged in
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) router.replace(redirectTarget);
    });
  }, []);

  // Social Sign-In
  const handleSocialSignIn = async (provider: "google" | "github") => {
    const providerName = provider === "google" ? "Google" : "GitHub";
    setErrorMessage("");
    setSocialLoading(provider);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(redirectTarget)}`,
        },
      });
      if (error) {
        setErrorMessage(error.message);
        setSocialLoading(null);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : `${providerName} sign in failed`;
      setErrorMessage(message);
      setSocialLoading(null);
    }
  };

  // ── Login ─────────────────────────────────────────────────────────────────
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setErrorMessage(error.message);
      } else {
        setSuccessMessage("Authenticated! Entering CampusGrow...");
        router.push(redirectTarget);
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  };

  // ── Register ──────────────────────────────────────────────────────────────
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name: name || "Student", branch, year },
          emailRedirectTo: `${window.location.origin}/api/auth/callback?next=/dashboard`,
        },
      });

      if (error) {
        setErrorMessage(error.message);
      } else {
        localStorage.setItem(
          "studentData",
          JSON.stringify({
            name: name || "Student",
            branch,
            year,
            goal: "placement",
            knowledgeLevel: "Beginner",
          })
        );
        setSuccessMessage("Account created! Please check your email to confirm, then sign in.");
        setMode("login");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Top Left Corner Brand Header */}
      <header className="fixed top-0 left-0 w-full z-20 border-b border-gray-100 bg-white/95 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        <BrandLogo subtitle="Grow Beyond the Classroom." className="-ml-1" />
        <Link
          href="/"
          className="text-xs font-bold text-gray-500 hover:text-black transition rounded-lg px-3 py-1.5 hover:bg-gray-100"
        >
          ← Home
        </Link>
      </header>

      {/* Form Center Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center pt-16 sm:pt-12">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight">
          Welcome to CampusGrow
        </h1>
        <p className="text-xs sm:text-sm font-semibold text-gray-500 mt-1 max-w-sm mx-auto">
          &ldquo;Your personal learning companion for your engineering journey.&rdquo;
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="rounded-3xl border-2 border-gray-200 bg-white p-6 sm:p-8 shadow-xl">
          {/* Sign In with Google Button (Highlighted) */}
          <button
            type="button"
            onClick={() => handleSocialSignIn("google")}
            disabled={socialLoading !== null}
            className="w-full flex items-center justify-center gap-3 rounded-2xl border-2 border-gray-200 bg-white hover:border-emerald-500 hover:bg-gray-50/80 px-4 py-3.5 text-sm font-black text-gray-900 transition-all shadow-sm hover:shadow-md cursor-pointer disabled:opacity-50 group mb-4"
          >
            <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span className="group-hover:text-emerald-600 transition">
              {socialLoading === "google" ? "Connecting to Google..." : "Sign in with Google"}
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleSocialSignIn("github")}
            disabled={socialLoading !== null}
            className="mb-4 flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-gray-200 bg-white px-4 py-3.5 text-sm font-black text-gray-900 shadow-sm transition-all hover:border-emerald-500 hover:bg-gray-50/80 hover:shadow-md disabled:opacity-50"
          >
            <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor" d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.74.08-.74 1.2.08 1.84 1.23 1.84 1.23 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.31-5.47-1.34-5.47-5.96 0-1.32.47-2.39 1.23-3.23-.12-.3-.53-1.53.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.29-1.23 3.29-1.23.66 1.65.25 2.88.13 3.18.77.84 1.22 1.91 1.22 3.23 0 4.63-2.8 5.64-5.48 5.95.43.37.81 1.1.81 2.22v3.13c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
            </svg>
            {socialLoading === "github" ? "Connecting to GitHub..." : "Continue with GitHub"}
          </button>

          {/* Divider */}
          <div className="relative my-4 flex items-center justify-center">
            <div className="w-full border-t border-gray-200" />
            <span className="absolute bg-white px-3 text-[10px] font-black uppercase tracking-wider text-gray-400">
              or continue with email
            </span>
          </div>

          {/* Tab switcher */}
          <div className="flex rounded-xl bg-gray-100 p-1 border border-gray-200 mb-5 text-xs font-bold">
            {(["login", "register"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => { setMode(m); setErrorMessage(""); setSuccessMessage(""); }}
                className={`flex-1 rounded-lg py-2 transition cursor-pointer text-center ${
                  mode === m ? "bg-white text-gray-950 font-black shadow-xs border border-gray-200" : "text-gray-500 hover:text-black"
                }`}
              >
                {m === "login" ? "Sign In" : "Register (Sign Up)"}
              </button>
            ))}
          </div>

          {/* Feedback */}
          {errorMessage && (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700 font-semibold">
              ⚠️ {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-800 font-semibold">
              ✓ {successMessage}
            </div>
          )}

          <form onSubmit={mode === "login" ? handleLogin : handleRegister} className="space-y-4">
            {/* Name (register only) */}
            {mode === "register" && (
              <div>
                <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-1">Full Name</label>
                <input
                  type="text" required placeholder="e.g. Alex Sharma" value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl bg-white border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-1">Email Address</label>
              <input
                type="email" required placeholder="student@university.edu" value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl bg-white border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            {/* Branch + Year (register only) */}
            {mode === "register" && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-1">Branch</label>
                  <select value={branch} onChange={(e) => setBranch(e.target.value)}
                    className="w-full rounded-xl bg-white border border-gray-300 px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-emerald-500">
                    <option value="CSC">CSC – Computer Science</option>
                    <option value="IT">IT – Information Technology</option>
                    <option value="AIML">AIML – AI &amp; Machine Learning</option>
                    <option value="AIDS">AIDS – AI &amp; Data Science</option>
                    <option value="SE">SE – Software Engineering</option>
                    <option value="ECE">ECE – Electronics</option>
                    <option value="MECH">MECH – Mechanical</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-1">Year</label>
                  <select value={year} onChange={(e) => setYear(e.target.value)}
                    className="w-full rounded-xl bg-white border border-gray-300 px-3 py-2.5 text-xs text-gray-900 focus:outline-none focus:border-emerald-500">
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>
              </div>
            )}

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-black text-gray-700 uppercase tracking-wider">Password</label>
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-xs text-gray-500 hover:text-black font-semibold">
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <input
                type={showPassword ? "text" : "password"} required
                placeholder="••••••••" value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl bg-white border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full rounded-xl bg-emerald-500 hover:bg-emerald-400 py-3.5 text-sm font-black text-black transition shadow-lg shadow-emerald-500/25 active:scale-95 cursor-pointer disabled:opacity-50 mt-2"
            >
              {loading ? "Processing..." : mode === "login" ? "Sign In to CampusGrow →" : "Create Account & Enter →"}
            </button>
          </form>

        </div>

        <div className="mt-6 text-center text-xs font-medium text-gray-500">
          CampusGrow • Grow Beyond the Classroom.
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center text-gray-900">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
