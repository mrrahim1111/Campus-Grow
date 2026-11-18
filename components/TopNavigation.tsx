"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSupabaseUser } from "@/hooks/useSupabaseUser";

interface TopNavigationProps {
  onOpenMobileMenu?: () => void;
}

export default function TopNavigation({ onOpenMobileMenu }: TopNavigationProps) {
  const router = useRouter();
  const { user, profile, isPro, signOut } = useSupabaseUser();

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [studentName, setStudentName] = useState("Student");
  const [studentBranch, setStudentBranch] = useState("CSE");

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("studentData");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name) setStudentName(parsed.name);
        if (parsed.branch) setStudentBranch(parsed.branch);
      }
    } catch {
      // Ignore
    }
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard shortcut for search (/ or Command+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
    setIsSearchOpen(false);
  };

  const displayName = profile?.name || studentName || "Student";
  const userInitial = displayName.charAt(0).toUpperCase();

  const mockNotifications = [
    {
      id: "1",
      title: "Daily Streak Milestone! 🔥",
      desc: "You checked in today. Your learning streak is active.",
      time: "10m ago",
      unread: true,
    },
    {
      id: "2",
      title: "AI Mentor Ready 💡",
      desc: "New curriculum practice sets available for C and Data Structures.",
      time: "1h ago",
      unread: true,
    },
    {
      id: "3",
      title: "Recruiter Portfolio Synced ⭐",
      desc: "Your Developer Studio workspace projects are ready for showcase.",
      time: "1d ago",
      unread: false,
    },
  ];

  return (
    <header className="sticky top-0 z-30 h-16 w-full border-b border-white/80 bg-white/70 backdrop-blur-xl transition-colors duration-200">
      <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger + Breadcrumbs / Platform Title */}
        <div className="flex items-center gap-3">
          {onOpenMobileMenu && (
            <button
              onClick={onOpenMobileMenu}
              type="button"
              className="lg:hidden p-2 rounded-xl text-[#102B24] hover:bg-[#B9E4C9]/20 transition cursor-pointer"
              aria-label="Open mobile navigation"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}

          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-[#557267]">
            <span className="flex h-2 w-2 rounded-full bg-[#16865A] animate-pulse" />
            <Link href="/" className="font-bold text-[#102B24] hover:text-[#16865A] transition">CampusGrow</Link>
            <span>/</span>
            <span>{studentBranch} Engineering</span>
          </div>

          {/* Quick Header Navigation Badges */}
          <div className="hidden md:flex items-center gap-2 ml-3 pl-3 border-l border-[#B9E4C9]/60">
            <Link
              href="/learning-hub"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold text-[#102B24] bg-white/60 border border-[#B9E4C9] hover:bg-[#E8F5E9] hover:border-[#16865A] transition shadow-2xs"
            >
              <span>🧭</span>
              <span>Learning Hub</span>
            </Link>
            <Link
              href="/cohorts"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold text-[#102B24] bg-white/60 border border-[#B9E4C9] hover:bg-[#E8F5E9] hover:border-[#16865A] transition shadow-2xs"
            >
              <span>🔴</span>
              <span>Live Cohorts</span>
            </Link>
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-md mx-auto">
          <form onSubmit={handleSearchSubmit} className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#557267]">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
              </svg>
            </span>
            <input
              ref={searchInputRef}
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 15 domains, tools, languages, frameworks (⌘K)..."
              className="w-full pl-9 pr-12 py-2 rounded-xl text-xs bg-white/70 border border-white/90 text-[#102B24] placeholder-[#557267] focus:outline-none focus:ring-2 focus:ring-[#16865A]/40 shadow-xs transition-all"
            />
            <kbd className="hidden sm:inline-block absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#E8F5E9] text-[#16865A] border border-[#B9E4C9]/60">
              ⌘K
            </kbd>
          </form>
        </div>

        {/* Right: Notifications, Settings, Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Settings Shortcut */}
          <Link
            href="/settings"
            className="p-2 rounded-xl text-[#557267] hover:text-[#102B24] hover:bg-[#B9E4C9]/20 transition"
            title="Settings"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </Link>

          {/* Notifications Dropdown */}
          <div ref={notifRef} className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              type="button"
              className="relative p-2 rounded-xl text-[#557267] hover:text-[#102B24] hover:bg-[#B9E4C9]/20 transition cursor-pointer"
              aria-label="Notifications"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#16865A] ring-2 ring-white" />
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white/95 backdrop-blur-2xl border border-white/80 shadow-xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#B9E4C9]/40">
                  <span className="text-xs font-black uppercase text-[#102B24]">Notifications</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E8F5E9] text-[#16865A]">
                    3 New
                  </span>
                </div>
                <div className="space-y-2">
                  {mockNotifications.map((n) => (
                    <div
                      key={n.id}
                      className="p-2.5 rounded-xl hover:bg-[#F4FBF6] transition border border-transparent hover:border-[#B9E4C9]/30"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-[#102B24]">{n.title}</span>
                        <span className="text-[10px] text-[#557267]">{n.time}</span>
                      </div>
                      <p className="mt-0.5 text-[11px] text-[#557267] leading-tight">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar & Dropdown */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              type="button"
              className="flex items-center gap-2 p-1 pl-2 pr-2.5 rounded-full border border-white/80 bg-white/60 hover:border-[#75C99A] transition cursor-pointer shadow-2xs"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-[#16865A] to-[#75C99A] text-white font-black text-xs shadow-xs">
                {userInitial}
              </div>
              <span className="hidden md:inline text-xs font-bold text-[#102B24] truncate max-w-[100px]">
                {displayName}
              </span>
              <svg className="w-3.5 h-3.5 text-[#557267]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white/95 backdrop-blur-2xl border border-white/80 shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="p-3 border-b border-[#B9E4C9]/40">
                  <p className="text-xs font-black text-[#102B24] truncate">{displayName}</p>
                  <p className="text-[11px] text-[#557267] truncate">{user?.email || `${studentBranch} Student`}</p>
                  <div className="mt-2">
                    <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-[#E8F5E9] text-[#16865A] border border-[#B9E4C9]">
                      {isPro ? "⭐ CampusGrow Pro" : "Free Starter Plan"}
                    </span>
                  </div>
                </div>

                <div className="py-1">
                  <Link
                    href="/learning-hub"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#102B24] hover:bg-[#E8F5E9] transition"
                  >
                    <span>🧭</span>
                    <span>Learning Hub</span>
                  </Link>

                  <Link
                    href="/cohorts"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#102B24] hover:bg-[#E8F5E9] transition"
                  >
                    <span>🔴</span>
                    <span>Live Cohorts</span>
                  </Link>

                  <Link
                    href="/profile"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#102B24] hover:bg-[#E8F5E9] transition"
                  >
                    <span>👤</span>
                    <span>Student Profile</span>
                  </Link>

                  <Link
                    href="/settings"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#102B24] hover:bg-[#E8F5E9] transition"
                  >
                    <span>⚙️</span>
                    <span>Settings &amp; Preferences</span>
                  </Link>

                  <Link
                    href="/progress"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#102B24] hover:bg-[#E8F5E9] transition"
                  >
                    <span>📊</span>
                    <span>Learning Progress</span>
                  </Link>

                  <Link
                    href="/admin"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#0B7650] bg-emerald-50/70 hover:bg-[#E8F5E9] transition border border-emerald-200/60 mt-1"
                  >
                    <span>🛠️</span>
                    <span>Curriculum Admin CMS</span>
                  </Link>
                </div>

                <div className="pt-1 border-t border-[#B9E4C9]/40">
                  <button
                    onClick={async () => {
                      setIsProfileOpen(false);
                      await signOut();
                      router.push("/login");
                    }}
                    type="button"
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition text-left cursor-pointer"
                  >
                    <span>🚪</span>
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
