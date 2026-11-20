"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AmbientBackground from "@/components/AmbientBackground";

export default function StudioHubPage() {
  const [studentName, setStudentName] = useState("Student");
  const [studentBranch, setStudentBranch] = useState("CSE");
  const [isPro, setIsPro] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "build" | "career" | "network">("all");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("studentData");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name) setStudentName(parsed.name);
        if (parsed.branch) setStudentBranch(parsed.branch);
      }
      const pro =
        localStorage.getItem("is_pro") === "true" ||
        localStorage.getItem("campusgrow_pro") === "true";
      setIsPro(pro);
    } catch {
      // ignore
    }
  }, []);

  const studioSuites = [
    {
      id: "project-hub",
      title: "Project Hub — The Cloud IDE",
      category: "build",
      badge: "Cloud IDE & Runtimes",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
      icon: "🚀",
      href: "/project-hub",
      description:
        "The complete browser-based Cloud IDE. Write, test, and run code across C, Python, JavaScript, Go, and Rust with live app preview and AI pair programming.",
      features: [
        "Multi-file project editor with tabs, file tree & syntax highlighting",
        "Integrated terminal with GCC, Clang, Python, and Node runtimes",
        "Live web & HTML/React preview window updating in real time",
        "Direct 'Commit to Workspace' button with commit messages & diffs",
      ],
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      cta: "Launch Project Hub IDE →",
    },
    {
      id: "workspace",
      title: "Workspace — Cloud Storage & Git Repos",
      category: "build",
      badge: "Storage & Version Control",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
      icon: "💾",
      href: "/workspace",
      description:
        "Your cloud project container and version control hub (like GitHub). Manage all your project repositories, review commit timelines, inspect file diffs, and switch branches.",
      features: [
        "Complete repository manager for all your saved software projects",
        "Git-style commit history with commit hashes, messages & timestamps",
        "Raw file storage browser with instant project downloads",
        "One-click 'Open in Project Hub IDE' to resume coding anytime",
      ],
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
      cta: "Open Workspace Repos →",
    },
    {
      id: "interview",
      title: "AI Mock Interviews",
      category: "career",
      badge: "Placement Readiness",
      badgeColor: "bg-purple-100 text-purple-800 border-purple-300",
      icon: "🎙️",
      href: "/interview",
      description:
        "Simulate realistic Tier-1 tech company interview rounds with an adaptive AI interviewer evaluating algorithmic speed, communication, and system design.",
      features: [
        "Company-specific question sets (Google, Amazon, Microsoft, Uber)",
        "Live whiteboard coding with real-time complexity probing",
        "Behavioral STAR method analysis & vocal delivery feedback",
        "Automated scorecard covering accuracy, speed, and design",
      ],
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
      cta: "Start Mock Interview →",
    },
    {
      id: "resume",
      title: "Software Engineer Resume Builder",
      category: "career",
      badge: "Developer Resume Creator",
      badgeColor: "bg-teal-100 text-teal-800 border-teal-300",
      icon: "📄",
      href: "/resume",
      description:
        "Build a clean, minimalist software engineering resume formatted for top tech companies. Import projects directly from your Workspace with 1 click.",
      features: [
        "Clean single-column developer layouts preferred by top tech firms",
        "One-click import of verified projects from your Workspace",
        "Live formatting preview with typography & margin controls",
        "Clean one-click PDF export ready for job submissions",
      ],
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80",
      cta: "Build Developer Resume →",
    },
    {
      id: "community",
      title: "Community & Engineering Leaderboard",
      category: "network",
      badge: "Peer Network & Rank",
      badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
      icon: "👥",
      href: "/community",
      description:
        "Share milestone portfolio builds, get peer code reviews, ask technical doubts, and climb the All-India engineering leaderboard.",
      features: [
        "All-India student rankings with streaks, XP & capstones shipped",
        "Inter-branch championship league across CSE, IT, AI, Cyber & IoT",
        "Peer code reviews & project showcase discussions",
        "Verified badges and placement study groups",
      ],
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
      cta: "Enter Community & Leaderboard →",
    },
  ];

  const filteredSuites = studioSuites.filter((suite) => {
    if (activeTab === "all") return true;
    return suite.category === activeTab;
  });

  return (
    <AmbientBackground intensity="dashboard">
      <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-8">
        
        {/* Header Title Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200/60">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 text-xs font-bold rounded-full bg-indigo-100 text-indigo-900 border border-indigo-300 uppercase tracking-wider">
                Studio Suite • Pro Developer Suite
              </span>
              {isPro ? (
                <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  ⚡ Pro Active
                </span>
              ) : (
                <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                  Preview Mode
                </span>
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text-dark)] tracking-tight">
              CampusGrow Studio
            </h1>
            <p className="text-sm text-[var(--color-text-secondary)] font-medium max-w-2xl">
              The unified developer and career workspace. Build projects in <strong>Project Hub (IDE)</strong>, store versions in <strong>Workspace</strong>, prep with <strong>Mock Interviews</strong>, and compete on the <strong>Leaderboard</strong>.
            </p>
          </div>

          {/* Tab Filter */}
          <div className="p-1 rounded-2xl glass-surface-elevated border border-white/80 shadow flex items-center gap-1 self-start md:self-auto">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "all"
                  ? "bg-[#16865A] text-white shadow"
                  : "text-[var(--color-text-secondary)] hover:text-emerald-800 hover:bg-emerald-50"
              }`}
            >
              All Tools (5)
            </button>
            <button
              onClick={() => setActiveTab("build")}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "build"
                  ? "bg-[#16865A] text-white shadow"
                  : "text-[var(--color-text-secondary)] hover:text-emerald-800 hover:bg-emerald-50"
              }`}
            >
              🛠️ Build & Store
            </button>
            <button
              onClick={() => setActiveTab("career")}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "career"
                  ? "bg-[#16865A] text-white shadow"
                  : "text-[var(--color-text-secondary)] hover:text-emerald-800 hover:bg-emerald-50"
              }`}
            >
              💼 Placement Prep
            </button>
            <button
              onClick={() => setActiveTab("network")}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "network"
                  ? "bg-[#16865A] text-white shadow"
                  : "text-[var(--color-text-secondary)] hover:text-emerald-800 hover:bg-emerald-50"
              }`}
            >
              👥 Community
            </button>
          </div>
        </div>

        {/* Free Preview Notice Banner */}
        {!isPro && (
          <div className="rounded-3xl glass-surface-elevated p-6 border-2 border-indigo-300 shadow-md bg-gradient-to-r from-indigo-50/80 via-white to-purple-50/70 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-100 px-2.5 py-0.5 rounded-full border border-indigo-200">
                PRO SUITE PREVIEW
              </span>
              <h3 className="text-base font-bold text-[var(--color-text-dark)]">
                You are previewing Studio tools for free
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)] max-w-2xl">
                Feel free to open and test any studio tool. To unlock live cloud compilers, persistent Git repository storage, and unlimited AI mock interviews, upgrade to Studio Pro.
              </p>
            </div>
            <Link
              href="/pricing"
              className="btn-emerald-gradient px-5 py-2.5 rounded-2xl text-xs font-bold shadow whitespace-nowrap cursor-pointer"
            >
              Upgrade to Studio Pro →
            </Link>
          </div>
        )}

        {/* Suite Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredSuites.map((suite) => (
            <div
              key={suite.id}
              className="rounded-3xl glass-surface-elevated p-6 sm:p-8 border border-white/80 shadow-md hover:shadow-xl transition-all space-y-6 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-2.5 rounded-2xl bg-white shadow-xs border border-slate-100 group-hover:scale-105 transition-transform">
                      {suite.icon}
                    </span>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-[var(--color-text-dark)] group-hover:text-[#16865A] transition-colors">
                        {suite.title}
                      </h3>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${suite.badgeColor}`}>
                        {suite.badge}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed font-medium">
                  {suite.description}
                </p>

                {/* Features List */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <h4 className="text-[11px] font-bold text-[var(--color-text-dark)] uppercase tracking-wider">
                    Core Capabilities:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {suite.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-slate-700">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span className="text-[11px] font-medium leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">
                  Synced with CampusGrow Engine
                </span>
                <Link
                  href={suite.href}
                  className="btn-emerald-gradient px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>{suite.cta}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </AmbientBackground>
  );
}
