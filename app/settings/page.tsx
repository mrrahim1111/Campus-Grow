"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useSupabaseUser } from "@/hooks/useSupabaseUser";
import AmbientBackground from "@/components/AmbientBackground";
import UpgradeModal from "@/components/UpgradeModal";

export default function SettingsPage() {
  const router = useRouter();
  const { isPro } = useSupabaseUser();

  // Profile States
  const [name, setName] = useState("Learner");
  const [branch, setBranch] = useState("CSC");
  const [year, setYear] = useState("2nd Year");
  const [bio, setBio] = useState("Undergraduate engineering student passionate about systems programming and high-performance software.");
  const [github, setGithub] = useState("https://github.com/");
  const [linkedin, setLinkedin] = useState("https://linkedin.com/in/");
  const [email, setEmail] = useState<string | null>(null);

  // Notifications
  const [notifyDaily, setNotifyDaily] = useState(true);
  const [notifyStreak, setNotifyStreak] = useState(true);
  const [notifyCommunity, setNotifyCommunity] = useState(true);
  const [notifyNewCourses, setNotifyNewCourses] = useState(false);

  // Appearance
  const [glassIntensity, setGlassIntensity] = useState<"subtle" | "balanced" | "prominent">("balanced");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [upgradeOpen, setUpgradeOpen] = useState(false);

  useEffect(() => {
    // 1. Load localStorage studentData
    try {
      const saved = localStorage.getItem("studentData");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name) setName(parsed.name);
        if (parsed.branch) setBranch(parsed.branch);
        if (parsed.year) setYear(parsed.year);
        if (parsed.bio) setBio(parsed.bio);
        if (parsed.github) setGithub(parsed.github);
        if (parsed.linkedin) setLinkedin(parsed.linkedin);
      }
    } catch {
      // ignore
    }

    // 2. Supabase User info
    try {
      const supabase = createClient();
      supabase.auth.getUser().then(({ data: { user } }) => {
        if (user) {
          setEmail(user.email || null);
          const metaName = user.user_metadata?.name;
          if (metaName) setName(metaName);
        }
      });
    } catch {
      // ignore
    }
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const current = localStorage.getItem("studentData");
      const existing = current ? JSON.parse(current) : {};
      const updated = {
        ...existing,
        name: name.trim(),
        branch,
        year,
        bio: bio.trim(),
        github: github.trim(),
        linkedin: linkedin.trim(),
      };
      localStorage.setItem("studentData", JSON.stringify(updated));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch {
      // ignore
    }
  };

  const handleSignOut = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {
      // ignore
    }
    router.push("/login");
  };

  return (
    <AmbientBackground intensity="dashboard">
      <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto w-full space-y-8">
        
        {/* Header */}
        <div className="space-y-1">
          <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300/40 uppercase tracking-wider">
            User Preferences
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text-dark)] tracking-tight">
            Account & Platform Settings
          </h1>
          <p className="text-sm text-[var(--color-text-secondary)] font-medium">
            Manage your personal engineering profile, study notifications, appearance themes, and subscription.
          </p>
        </div>

        {saveSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 text-xs sm:text-sm font-semibold flex items-center justify-between animate-fadeIn">
            <span>✓ Settings successfully saved and synchronized!</span>
            <button onClick={() => setSaveSuccess(false)} className="text-xs font-bold">✕</button>
          </div>
        )}

        {/* PROFILE CARD */}
        <div className="rounded-3xl glass-surface-elevated p-6 sm:p-8 border border-white/70 dark:border-white/10 shadow-lg space-y-6">
          <div className="pb-4 border-b border-slate-200/50 dark:border-slate-800/50">
            <h2 className="text-lg font-bold text-[var(--color-text-dark)]">
              Engineering Student Profile
            </h2>
            <p className="text-xs text-[var(--color-text-secondary)]">
              Information displayed across CampusGrow courses, progress dashboards, and community threads.
            </p>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-bold text-[var(--color-text-dark)] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-[var(--color-text-dark)] focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-[var(--color-text-dark)] mb-1">
                  Branch of Study
                </label>
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-[var(--color-text-dark)] focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                >
                  <option value="CSC">Core Computer Science (CSE / CSC)</option>
                  <option value="IT">Information Technology (IT)</option>
                  <option value="CAI">Computer Science & AI (CAI)</option>
                  <option value="AID">AI & Data Science (AID)</option>
                  <option value="CSM">CS & Machine Learning (CSM)</option>
                  <option value="CYS">Cybersecurity & Networks (CYS)</option>
                  <option value="SE">Software Engineering (SE)</option>
                  <option value="DS">Data Science & Big Data (DS)</option>
                  <option value="CSD">CS & Design (CSD / HCI)</option>
                  <option value="IOT">IoT & Embedded Systems (IOT)</option>
                  <option value="GENERAL">General Engineering / All CS Aspirants</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[var(--color-text-dark)] mb-1">
                  Academic Year
                </label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-[var(--color-text-dark)] focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                >
                  <option value="1st Year">1st Year (Freshman)</option>
                  <option value="2nd Year">2nd Year (Sophomore)</option>
                  <option value="3rd Year">3rd Year (Junior)</option>
                  <option value="4th Year">4th Year (Senior)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-[var(--color-text-dark)] mb-1">
                Student Bio & Specialization Focus
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-[var(--color-text-dark)] focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[var(--color-text-dark)] mb-1">
                  GitHub Profile URL
                </label>
                <input
                  type="url"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-[var(--color-text-dark)] focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-[var(--color-text-dark)] mb-1">
                  LinkedIn Profile URL
                </label>
                <input
                  type="url"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-[var(--color-text-dark)] focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="btn-emerald-gradient px-6 py-2.5 rounded-xl font-bold text-xs shadow-md hover:shadow-lg transition-all"
              >
                Save Profile Changes
              </button>
            </div>
          </form>
        </div>

        {/* NOTIFICATION PREFERENCES */}
        <div className="rounded-3xl glass-surface-elevated p-6 sm:p-8 border border-white/70 dark:border-white/10 shadow-lg space-y-5">
          <div className="pb-4 border-b border-slate-200/50 dark:border-slate-800/50">
            <h2 className="text-lg font-bold text-[var(--color-text-dark)]">
              Notification & Cadence Alerts
            </h2>
            <p className="text-xs text-[var(--color-text-secondary)]">
              Configure daily study reminders to preserve your consistency streak.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60 cursor-pointer">
              <div>
                <p className="font-bold text-[var(--color-text-dark)]">Daily Study Check-in Reminder</p>
                <p className="text-[11px] text-[var(--color-text-secondary)]">Receive a notification each evening if you haven&apos;t completed today&apos;s sprint</p>
              </div>
              <input
                type="checkbox"
                checked={notifyDaily}
                onChange={(e) => setNotifyDaily(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60 cursor-pointer">
              <div>
                <p className="font-bold text-[var(--color-text-dark)]">Streak Protection Alerts</p>
                <p className="text-[11px] text-[var(--color-text-secondary)]">Urgent notification 2 hours before midnight if your active streak is at risk</p>
              </div>
              <input
                type="checkbox"
                checked={notifyStreak}
                onChange={(e) => setNotifyStreak(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60 cursor-pointer">
              <div>
                <p className="font-bold text-[var(--color-text-dark)]">Community Mentions & Replies</p>
                <p className="text-[11px] text-[var(--color-text-secondary)]">Get notified when a student or AI Mentor replies to your code discussions</p>
              </div>
              <input
                type="checkbox"
                checked={notifyCommunity}
                onChange={(e) => setNotifyCommunity(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60 cursor-pointer">
              <div>
                <p className="font-bold text-[var(--color-text-dark)]">New Curriculum & Milestone Releases</p>
                <p className="text-[11px] text-[var(--color-text-secondary)]">Stay updated when new advanced computer science tracks are published</p>
              </div>
              <input
                type="checkbox"
                checked={notifyNewCourses}
                onChange={(e) => setNotifyNewCourses(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
              />
            </label>
          </div>
        </div>

        {/* APPEARANCE & SPATIAL GLASS */}
        <div className="rounded-3xl glass-surface-elevated p-6 sm:p-8 border border-white/70 dark:border-white/10 shadow-lg space-y-5">
          <div className="pb-4 border-b border-slate-200/50 dark:border-slate-800/50">
            <h2 className="text-lg font-bold text-[var(--color-text-dark)]">
              Appearance & Spatial Glass
            </h2>
            <p className="text-xs text-[var(--color-text-secondary)]">
              Customize glassmorphism depth, translucent refractions, and fluid animations.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-[var(--color-text-dark)] mb-2">
                Glassmorphism Depth Level
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(["subtle", "balanced", "prominent"] as const).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setGlassIntensity(level)}
                    className={`p-3 rounded-2xl border text-center font-bold capitalize transition-all ${
                      glassIntensity === level
                        ? "bg-[#16865A] text-white shadow"
                        : "bg-white/60 dark:bg-slate-900/60 text-[var(--color-text-secondary)] border-slate-200/60 dark:border-slate-800/60 hover:text-emerald-700"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ACCOUNT & SUBSCRIPTION */}
        <div className="rounded-3xl glass-surface-elevated p-6 sm:p-8 border border-white/70 dark:border-white/10 shadow-lg space-y-5">
          <div className="pb-4 border-b border-slate-200/50 dark:border-slate-800/50">
            <h2 className="text-lg font-bold text-[var(--color-text-dark)]">
              Subscription & Security
            </h2>
            <p className="text-xs text-[var(--color-text-secondary)]">
              Manage your active subscription status and authentication sessions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 text-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-[var(--color-text-dark)]">
                  {isPro ? "CampusGrow Pro Member" : "Free Student Tier"}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  {isPro ? "Active" : "Standard"}
                </span>
              </div>
              <p className="text-[var(--color-text-secondary)]">
                Connected email: <span className="font-semibold text-[var(--color-text-dark)]">{email || "Local Demo Account"}</span>
              </p>
            </div>

            {!isPro ? (
              <button
                onClick={() => setUpgradeOpen(true)}
                className="btn-emerald-gradient px-4 py-2 rounded-xl font-bold shadow text-xs whitespace-nowrap self-start sm:self-auto"
              >
                Upgrade to Pro Plan ↗
              </button>
            ) : (
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                All Pro Features Unlocked ✓
              </span>
            )}
          </div>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs text-[var(--color-text-secondary)]">
              Need to switch accounts?
            </span>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 hover:bg-rose-100 dark:hover:bg-rose-900 transition-colors"
            >
              Sign Out of CampusGrow
            </button>
          </div>
        </div>

      </div>

      <UpgradeModal
        isOpen={upgradeOpen}
        onClose={() => setUpgradeOpen(false)}
        featureTitle="CampusGrow Pro"
      />
    </AmbientBackground>
  );
}
