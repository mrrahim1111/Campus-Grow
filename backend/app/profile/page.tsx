"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BrandLogo from "@/components/BrandLogo";
import MobileNav from "@/components/MobileNav";
import AmbientBackground from "@/components/AmbientBackground";
import { useSupabaseUser } from "@/hooks/useSupabaseUser";
import UpgradeModal from "@/components/UpgradeModal";
import { createClient } from "@/lib/supabase/client";
import {
  WorkspaceProject,
  getPortfolioFeaturedProjects,
  togglePortfolioStatus,
  WORKSPACE_EVENT,
} from "@/lib/workspaceProjects";

type StudentProfile = {
  name?: string;
  year?: string;
  branch?: string;
  knowledgeLevel?: string;
  goal?: string;
  interests?: string[];
};

const defaultProfile: StudentProfile = {
  name: "",
  year: "1st Year",
  branch: "CSE",
  knowledgeLevel: "Beginner",
  goal: "placement",
};

const branchNames: Record<string, string> = {
  CSC: "Computer Science & Engineering (CSE)",
  CSE: "Computer Science & Engineering (CSE)",
  IT: "Information Technology (IT)",
  SE: "Software Engineering (SE)",
  IS: "Information Science (ISE)",
  AIML: "AI & Machine Learning (AIML)",
  AIDS: "AI & Data Science (AIDS)",
  ECE: "Electronics & Communication (ECE)",
  EEE: "Electrical & Electronics (EEE)",
  MECH: "Mechanical Engineering (ME)",
  CIVIL: "Civil Engineering (CE)",
};

const goalNames: Record<string, string> = {
  placement: "Campus Placement",
  internship: "High-Impact Internship",
  startup: "Startup & Products",
  technical: "Technical Mastery",
  abroad: "Higher Studies Abroad",
  explore: "Full-Spectrum Exploration",
};

export default function ProfilePage() {
  const router = useRouter();
  const { user, profile, isPro, signOut, refetch } = useSupabaseUser();
  const [student, setStudent] = useState<StudentProfile>(defaultProfile);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [roleDiscovery, setRoleDiscovery] = useState<{
    topMatch?: { roleTitle: string; matchScore: number };
    secondMatch?: { roleTitle: string; matchScore: number };
    thirdMatch?: { roleTitle: string; matchScore: number };
    completedAt?: string;
  } | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [portfolioProjects, setPortfolioProjects] = useState<WorkspaceProject[]>([]);

  useEffect(() => {
    const loadPortfolio = () => {
      setPortfolioProjects(getPortfolioFeaturedProjects());
    };
    loadPortfolio();

    window.addEventListener(WORKSPACE_EVENT, loadPortfolio);
    window.addEventListener("storage", loadPortfolio);
    return () => {
      window.removeEventListener(WORKSPACE_EVENT, loadPortfolio);
      window.removeEventListener("storage", loadPortfolio);
    };
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("studentData");
      if (saved) setStudent({ ...defaultProfile, ...JSON.parse(saved) });
    } catch {
      setStudent(defaultProfile);
    }

    try {
      const rd = localStorage.getItem("campusgrow_role_discovery");
      if (rd) {
        const parsed = JSON.parse(rd);
        if (parsed.topMatch) {
          setRoleDiscovery({
            topMatch: {
              roleTitle: parsed.topMatch.role?.title || "AI/ML Engineer",
              matchScore: parsed.topMatch.matchScore || 87,
            },
            secondMatch: {
              roleTitle: parsed.secondMatch?.role?.title || "Data Analyst",
              matchScore: parsed.secondMatch?.matchScore || 81,
            },
            thirdMatch: {
              roleTitle: parsed.thirdMatch?.role?.title || "Full Stack Developer",
              matchScore: parsed.thirdMatch?.matchScore || 72,
            },
            completedAt: parsed.completedAt,
          });
        }
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (!profile) return;
    setStudent((current) => ({
      ...current,
      name: profile.name ?? current.name,
      branch: profile.branch ?? current.branch,
      year: profile.year ?? current.year,
    }));
  }, [profile]);

  const isSignedIn = Boolean(user);
  const accountEmail = user?.email || "";
  const displayName = profile?.name || student.name || "Student";
  const displayBranch = profile?.branch || student.branch || "CSE";
  const displayYear = profile?.year || student.year || "1st Year";
  const displayLevel = student.knowledgeLevel || "Foundational";
  const displayGoal = goalNames[student.goal || "placement"] || "Engineering Excellence";
  const branchFullName = branchNames[displayBranch] || `${displayBranch} Engineering`;
  const focusAreas = student.interests?.length
    ? student.interests
    : ["Data Structures & Algorithms", "Systems & Software Dev", "AI & Engineering Skills"];

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setSaveMessage("");

    try {
      const updatedProfile = { ...student, name: student.name?.trim() || "" };
      localStorage.setItem("studentData", JSON.stringify(updatedProfile));
      setStudent(updatedProfile);

      if (user) {
        const supabase = createClient();
        const { error } = await supabase
          .from("profiles")
          .update({
            name: updatedProfile.name,
            branch: updatedProfile.branch,
            year: updatedProfile.year,
          })
          .eq("id", user.id);
        if (error) throw error;
        await refetch?.();
      }

      setSaveMessage("Profile saved.");
    } catch {
      setSaveMessage("Profile could not be saved. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      setSaveMessage("Could not sign out. Please try again.");
      return;
    }
    router.push("/");
  };

  return (
    <AmbientBackground intensity="dashboard">
      <main className="flex-1 bg-transparent text-slate-900 dark:text-slate-100 min-h-screen">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Account &amp; preferences</p>
            <h1 className="mt-1 text-3xl font-black text-slate-950 dark:text-white">Your Profile</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Manage your account and learning details.</p>
          </div>

          <section className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-[#101B2D]/85 backdrop-blur-xl p-5 shadow-sm sm:p-7 transition-colors">
            <div className="mb-6 flex items-center gap-3 border-b border-slate-200/80 dark:border-white/10 pb-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-emerald-300 dark:border-emerald-600 bg-emerald-100 dark:bg-emerald-950/60 text-xl font-black text-emerald-900 dark:text-emerald-300">
                {displayName.slice(0, 1).toUpperCase()}
              </div>
              <div className="min-w-0">
                <h2 className="truncate text-lg font-bold text-slate-950 dark:text-white">{displayName}</h2>
                <p className="truncate text-sm text-slate-600 dark:text-slate-400">{accountEmail}</p>
              </div>
            </div>

            <div className="mb-6 border-b border-slate-200/80 dark:border-white/10 pb-6">
              <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">Academic track</h2>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-md border border-emerald-300 dark:border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 text-xs font-bold text-emerald-900 dark:text-emerald-300">{displayBranch} · {displayYear}</span>
                <span className="rounded-md border border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1 text-xs font-bold text-blue-900 dark:text-blue-300">{displayLevel}</span>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-white/[0.02] p-3">
                  <span className="text-[10px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Primary objective</span>
                  <p className="mt-1 text-sm font-bold text-slate-950 dark:text-white">{displayGoal}</p>
                </div>
                <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-white/[0.02] p-3">
                  <span className="text-[10px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Branch curriculum track</span>
                  <p className="mt-1 text-sm font-bold text-emerald-700 dark:text-emerald-400">{branchFullName}</p>
                </div>
              </div>
              <div className="mt-4">
                <span className="mb-2 block text-[10px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Focus areas</span>
                <div className="flex flex-wrap gap-2">
                  {focusAreas.map((interest) => (
                    <span key={interest} className="rounded-md border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 px-2.5 py-1 text-xs font-semibold capitalize text-slate-800 dark:text-slate-200">{interest}</span>
                  ))}
                </div>
              </div>

              {/* ── ROLE DISCOVERY (3-Day Career Trial) ── */}
              <div className="mt-6 rounded-2xl border-2 border-emerald-500/30 bg-emerald-50/40 dark:bg-emerald-950/20 p-5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-200/80 dark:border-emerald-500/20 pb-3">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                      🎯 CAREER TRIAL DISCOVERY
                    </span>
                    <h3 className="text-base font-black text-slate-950 dark:text-white">ROLE DISCOVERY</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => router.push("/discover-role")}
                    className="rounded-xl bg-gradient-to-r from-[#13C995] to-[#55C8FF] hover:brightness-110 px-3.5 py-1.5 text-xs font-black text-slate-950 shadow-xs transition active:scale-95 cursor-pointer"
                  >
                    {roleDiscovery ? "View Full Report / Retake →" : "Start 3-Day Role Discovery →"}
                  </button>
                </div>

                {roleDiscovery ? (
                  <div className="mt-4">
                    <div className="grid gap-3 sm:grid-cols-3">
                      <div className="rounded-xl border border-emerald-300 dark:border-emerald-600 bg-white dark:bg-[#0B1220] p-3.5 shadow-2xs">
                        <span className="text-[10px] font-black uppercase text-emerald-700 dark:text-emerald-400">Top Match 🥇</span>
                        <p className="mt-1 text-sm font-black text-slate-950 dark:text-white">{roleDiscovery.topMatch?.roleTitle}</p>
                        <span className="mt-1.5 inline-block rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-600 px-2 py-0.5 text-xs font-black">
                          {roleDiscovery.topMatch?.matchScore}% Match
                        </span>
                      </div>

                      <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0B1220] p-3.5 shadow-2xs">
                        <span className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400">Second 🥈</span>
                        <p className="mt-1 text-sm font-black text-slate-950 dark:text-white">{roleDiscovery.secondMatch?.roleTitle}</p>
                        <span className="mt-1.5 inline-block rounded-full bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10 px-2 py-0.5 text-xs font-bold">
                          {roleDiscovery.secondMatch?.matchScore}% Match
                        </span>
                      </div>

                      <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0B1220] p-3.5 shadow-2xs">
                        <span className="text-[10px] font-black uppercase text-slate-500 dark:text-slate-400">Third 🥉</span>
                        <p className="mt-1 text-sm font-black text-slate-950 dark:text-white">{roleDiscovery.thirdMatch?.roleTitle}</p>
                        <span className="mt-1.5 inline-block rounded-full bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10 px-2 py-0.5 text-xs font-bold">
                          {roleDiscovery.thirdMatch?.matchScore}% Match
                        </span>
                      </div>
                    </div>

                    <p className="mt-3 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                      Guidance based on CampusGrow&apos;s 3-day practical Build, Analyze, and Solve tasks.
                    </p>
                  </div>
                ) : (
                  <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <p className="text-slate-600 dark:text-slate-400 font-medium">
                      Not sure which role suits you? Experience practical tasks in AI/ML, Full Stack, Data, Cyber, and Cloud.
                    </p>
                    <button
                      type="button"
                      onClick={() => router.push("/discover-role")}
                      className="shrink-0 text-emerald-700 dark:text-emerald-400 font-bold hover:underline cursor-pointer"
                    >
                      Start 3-Day Career Trial →
                    </button>
                  </div>
                )}
              </div>
            </div>

            <form onSubmit={handleSave} className="space-y-5">
              <div>
                <label htmlFor="profile-name" className="mb-1 block text-sm font-semibold text-slate-800 dark:text-slate-200">Full name</label>
                <input
                  id="profile-name"
                  type="text"
                  value={student.name || ""}
                  onChange={(event) => { setStudent({ ...student, name: event.target.value }); setSaveMessage(""); }}
                  autoComplete="name"
                  required
                  className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-[#0B1220] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white outline-none focus:border-[#13C995] focus:ring-2 focus:ring-[#13C995]/20 shadow-xs"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="profile-year" className="mb-1 block text-sm font-semibold text-slate-800 dark:text-slate-200">Academic year</label>
                  <select
                    id="profile-year"
                    value={student.year || "1st Year"}
                    onChange={(event) => { setStudent({ ...student, year: event.target.value }); setSaveMessage(""); }}
                    className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-[#0B1220] px-3 py-2.5 text-sm text-slate-900 dark:text-white outline-none focus:border-[#13C995]"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="profile-branch" className="mb-1 block text-sm font-semibold text-slate-800 dark:text-slate-200">Engineering branch</label>
                  <select
                    id="profile-branch"
                    value={student.branch || "CSE"}
                    onChange={(event) => { setStudent({ ...student, branch: event.target.value }); setSaveMessage(""); }}
                    className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-[#0B1220] px-3 py-2.5 text-sm text-slate-900 dark:text-white outline-none focus:border-[#13C995]"
                  >
                    <option value="CSC">CSC — Computer Science (CSE)</option>
                    <option value="CSE">CSE — Computer Science</option>
                    <option value="IT">IT — Information Technology</option>
                    <option value="AIML">AIML — AI &amp; Machine Learning</option>
                    <option value="AIDS">AIDS — AI &amp; Data Science</option>
                    <option value="SE">SE — Software Engineering</option>
                    <option value="ECE">ECE — Electronics &amp; Communication</option>
                    <option value="EEE">EEE — Electrical Engineering</option>
                    <option value="MECH">MECH — Mechanical</option>
                    <option value="CIVIL">CIVIL — Civil Engineering</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="profile-level" className="mb-1 block text-sm font-semibold text-slate-800 dark:text-slate-200">Skill level</label>
                  <select
                    id="profile-level"
                    value={student.knowledgeLevel || "Beginner"}
                    onChange={(event) => { setStudent({ ...student, knowledgeLevel: event.target.value }); setSaveMessage(""); }}
                    className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-[#0B1220] px-3 py-2.5 text-sm text-slate-900 dark:text-white outline-none focus:border-[#13C995]"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="profile-goal" className="mb-1 block text-sm font-semibold text-slate-800 dark:text-slate-200">Primary goal</label>
                  <select
                    id="profile-goal"
                    value={student.goal || "placement"}
                    onChange={(event) => { setStudent({ ...student, goal: event.target.value }); setSaveMessage(""); }}
                    className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-[#0B1220] px-3 py-2.5 text-sm text-slate-900 dark:text-white outline-none focus:border-[#13C995]"
                  >
                    <option value="placement">Campus placement</option>
                    <option value="internship">High-impact internship</option>
                    <option value="startup">Startup &amp; products</option>
                    <option value="technical">Technical mastery</option>
                    <option value="abroad">Higher studies abroad</option>
                    <option value="explore">Explore options</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/80 dark:border-white/10 pt-5">
                <p aria-live="polite" className="text-sm text-slate-600 dark:text-slate-400">{saveMessage}</p>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="rounded-xl bg-gradient-to-r from-[#13C995] to-[#55C8FF] hover:brightness-110 px-6 py-2.5 text-sm font-black text-slate-950 transition shadow-md shadow-emerald-500/20 disabled:cursor-wait disabled:opacity-60 cursor-pointer"
                >
                  {isSaving ? "Saving..." : "Save profile"}
                </button>
              </div>
            </form>
          </section>

          {/* ── FEATURED PROJECTS PORTFOLIO (Auto-Synced from Developer Studio) ── */}
          <section className="mt-6 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-[#101B2D]/85 backdrop-blur-xl p-5 shadow-sm sm:p-7 transition-colors">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 dark:border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 text-sm font-bold border border-amber-300 dark:border-amber-700">
                    ⭐
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                    STUDENT RECRUITER SHOWCASE
                  </span>
                </div>
                <h2 className="text-xl font-black text-slate-950 dark:text-white mt-1">
                  Featured Engineering Portfolio
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  Projects built &amp; tested in CampusGrow Developer Studio. Star projects in your workspace to auto-sync here.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="rounded-full bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 text-xs font-black text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                  {portfolioProjects.length} {portfolioProjects.length === 1 ? "Project" : "Projects"} Featured
                </span>
                <button
                  type="button"
                  onClick={() => router.push("/terminal")}
                  className="rounded-xl bg-gradient-to-r from-[#13C995] to-[#55C8FF] hover:brightness-110 px-3.5 py-1.5 text-xs font-black text-slate-950 shadow-xs transition active:scale-95 cursor-pointer flex items-center gap-1.5"
                >
                  <span>💻 Open Studio</span>
                  <span>→</span>
                </button>
              </div>
            </div>

            {portfolioProjects.length > 0 ? (
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {portfolioProjects.map((proj) => {
                  const langBadge =
                    proj.language === "c"
                      ? { label: "C (Clang 16)", bg: "bg-blue-100 dark:bg-blue-950/60 text-blue-900 dark:text-blue-300 border-blue-300 dark:border-blue-700", icon: "🇨" }
                      : proj.language === "java"
                      ? { label: "Java 21 (JVM)", bg: "bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-700", icon: "☕" }
                      : proj.language === "python"
                      ? { label: "Python 3.14", bg: "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700", icon: "🐍" }
                      : proj.language === "javascript"
                      ? { label: "Node.js ES2024", bg: "bg-yellow-100 dark:bg-yellow-950/60 text-yellow-900 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700", icon: "⚡" }
                      : proj.language === "sql"
                      ? { label: "SQLite 3", bg: "bg-indigo-100 dark:bg-indigo-950/60 text-indigo-900 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700", icon: "🗄️" }
                      : { label: "POSIX Shell", bg: "bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-slate-300 border-slate-300 dark:border-white/10", icon: "🐚" };

                  const snippetLines = proj.code.split("\n").filter((l) => l.trim().length > 0).slice(0, 3).join("\n");

                  return (
                    <div
                      key={proj.id}
                      className="flex flex-col justify-between rounded-xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/[0.03] p-4 shadow-sm hover:border-[#13C995] transition group"
                    >
                      <div>
                        {/* Top Badges */}
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[11px] font-bold ${langBadge.bg}`}
                          >
                            <span>{langBadge.icon}</span>
                            <span>{langBadge.label}</span>
                          </span>

                          <button
                            type="button"
                            onClick={() => {
                              togglePortfolioStatus(proj.id);
                              setPortfolioProjects(getPortfolioFeaturedProjects());
                            }}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 hover:text-amber-700 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 border border-amber-200 dark:border-amber-700 px-2 py-0.5 rounded-md transition cursor-pointer"
                            title="Click to remove from public portfolio"
                          >
                            <span>⭐</span>
                            <span>Featured</span>
                          </button>
                        </div>

                        {/* Title & Description */}
                        <h3 className="text-sm font-black text-slate-950 dark:text-white group-hover:text-emerald-500 transition">
                          {proj.title}
                        </h3>
                        <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                          {proj.description}
                        </p>

                        {/* Mini Code Snippet Preview */}
                        <div className="mt-3 rounded-lg bg-[#070C15] p-2.5 font-mono text-[10px] text-slate-300 overflow-x-auto border border-slate-800 shadow-inner">
                          <div className="flex items-center justify-between text-[9px] text-slate-500 mb-1 border-b border-slate-800 pb-1">
                            <span>{proj.activeFile || "source code"}</span>
                            <span>Verified Studio Build ✓</span>
                          </div>
                          <pre className="text-emerald-400/90 leading-tight">
                            {snippetLines || "// Project code in workspace"}
                          </pre>
                        </div>

                        {/* Tags */}
                        <div className="mt-2.5 flex flex-wrap gap-1">
                          {proj.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded bg-slate-100 dark:bg-white/10 px-1.5 py-0.5 text-[10px] font-semibold text-slate-700 dark:text-slate-300"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Bottom CTA to open in Terminal */}
                      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                        <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                          Synced from Workspace
                        </span>

                        <button
                          type="button"
                          onClick={() => router.push(`/terminal?project=${proj.id}`)}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 text-xs font-bold transition shadow-xs cursor-pointer"
                        >
                          <span>▶ Open in Studio</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="mt-5 rounded-xl border border-dashed border-slate-300 dark:border-white/10 bg-white/50 dark:bg-white/[0.02] p-6 text-center">
                <span className="text-3xl">💻</span>
                <h3 className="mt-2 text-sm font-black text-slate-900 dark:text-white">
                  No Projects Featured Yet
                </h3>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                  Open your Developer Studio workspace, write or customize your code, and click the{" "}
                  <strong className="text-emerald-700 dark:text-emerald-400">⭐ Portfolio: ON</strong> switch to automatically feature your project here.
                </p>
                <button
                  type="button"
                  onClick={() => router.push("/terminal")}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#13C995] to-[#55C8FF] text-slate-950 font-black px-4 py-2 text-xs shadow-xs transition cursor-pointer"
                >
                  <span>Go to Developer Studio &amp; Workspace →</span>
                </button>
              </div>
            )}
          </section>

          {/* Subscription & Pro Access Section */}
          <section className="mt-5 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-[#101B2D]/85 backdrop-blur-xl p-5 shadow-sm sm:p-7 transition-colors">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">{isPro ? "👑" : "🎁"}</span>
                  <h2 className="font-bold text-slate-950 dark:text-white">
                    {isPro ? "CampusGrow Pro Membership" : "Free Starter Plan"}
                  </h2>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      isPro
                        ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700"
                        : "bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10"
                    }`}
                  >
                    {isPro ? "Active (Zero-Cost Dev Mode)" : "Free Tier"}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 max-w-lg">
                  {isPro
                    ? "All premium features (Quizzes, Mock Interviews, AI Resume, and Capstone Projects) are unlocked on your account."
                    : "Learning and AI Mentor are free. Upgrade to unlock industry interviews, timed assessments, and AI resume builder."}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {isPro ? (
                  <button
                    type="button"
                    onClick={() => {
                      localStorage.removeItem("is_pro");
                      localStorage.removeItem("campusgrow_pro");
                      localStorage.removeItem("campusgrow_subscription");
                      window.dispatchEvent(new Event("campusgrow_subscription_updated"));
                      window.dispatchEvent(new Event("storage"));
                      window.location.reload();
                    }}
                    className="rounded-xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/50 px-4 py-2 text-xs font-bold transition cursor-pointer"
                  >
                    Reset to Free (Test Paywall Lock)
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setUpgradeOpen(true)}
                    className="rounded-xl bg-gradient-to-r from-[#13C995] to-[#55C8FF] hover:brightness-110 text-slate-950 px-5 py-2.5 text-sm font-black shadow-sm transition cursor-pointer flex items-center gap-1.5"
                  >
                    <span>⚡ Upgrade with UPI (Free)</span>
                  </button>
                )}
              </div>
            </div>
          </section>

          <section className="mt-5 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-[#101B2D]/85 backdrop-blur-xl p-5 shadow-sm sm:p-7 transition-colors">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-bold text-slate-950 dark:text-white">Account access</h2>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  {isSignedIn ? "Your account is active on this device." : "Sign in to connect your account."}
                </p>
              </div>
              {isSignedIn ? (
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="rounded-xl border border-emerald-700 dark:border-emerald-500 px-4 py-2 text-sm font-bold text-emerald-800 dark:text-emerald-300 transition hover:bg-emerald-50 dark:hover:bg-emerald-950/40 cursor-pointer"
                >
                  Sign Out
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => router.push("/login?redirect=%2Fprofile")}
                  className="rounded-xl bg-gradient-to-r from-[#13C995] to-[#55C8FF] px-4 py-2 text-sm font-black text-slate-950 transition hover:brightness-110 shadow-xs cursor-pointer"
                >
                  Sign In
                </button>
              )}
            </div>
          </section>
        </div>

        <UpgradeModal
          isOpen={upgradeOpen}
          onClose={() => setUpgradeOpen(false)}
          featureTitle="CampusGrow Pro"
        />
      </main>
    </AmbientBackground>
  );
}
