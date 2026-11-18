"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandLogo from "@/components/BrandLogo";

export default function AppSidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [studentName, setStudentName] = useState("Student");
  const [isPro, setIsPro] = useState(false);
  
  // Sidebar starts collapsed by default (icon rail mode), expands on click
  const [isCollapsed, setIsCollapsed] = useState(true);

  const isStudioActive =
    pathname.startsWith("/studio") ||
    pathname.startsWith("/project-hub") ||
    pathname.startsWith("/workspace") ||
    pathname.startsWith("/interview") ||
    pathname.startsWith("/resume") ||
    pathname.startsWith("/community");

  const [isStudioExpanded, setIsStudioExpanded] = useState<boolean>(isStudioActive || true);

  useEffect(() => {
    if (isStudioActive) {
      setIsStudioExpanded(true);
    }
  }, [isStudioActive]);

  useEffect(() => {
    const updateSidebarState = () => {
      try {
        const saved = localStorage.getItem("studentData");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.name) setStudentName(parsed.name);
        }
        const pro =
          localStorage.getItem("is_pro") === "true" ||
          localStorage.getItem("campusgrow_pro") === "true";
        setIsPro(pro);
      } catch {
        // Ignore
      }
    };

    updateSidebarState();
    window.addEventListener("storage", updateSidebarState);
    window.addEventListener("campusgrow_subscription_updated", updateSidebarState);

    return () => {
      window.removeEventListener("storage", updateSidebarState);
      window.removeEventListener("campusgrow_subscription_updated", updateSidebarState);
    };
  }, []);

  // Close mobile menu whenever route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navItems = [
    {
      label: "Home",
      href: "/",
      isActive: pathname === "/",
      iconBg: "bg-[#B9E4C9]/40 text-[#16865A] border border-[#B9E4C9]",
      activeIconBg: "bg-white text-[#16865A] shadow-xs",
      icon: (
        <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      badge: null,
    },
    {
      label: "Dashboard",
      href: "/dashboard",
      isActive: pathname === "/dashboard",
      iconBg: "bg-[#E8F5E9] text-[#16865A] border border-[#B9E4C9]",
      activeIconBg: "bg-white text-[#16865A] shadow-xs",
      icon: (
        <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <rect width="7" height="9" x="3" y="3" rx="1" />
          <rect width="7" height="5" x="14" y="3" rx="1" />
          <rect width="7" height="9" x="14" y="12" rx="1" />
          <rect width="7" height="5" x="3" y="16" rx="1" />
        </svg>
      ),
      badge: null,
    },
    {
      label: "Learning Hub",
      href: "/learning-hub",
      isActive: pathname.startsWith("/learning-hub") || pathname.startsWith("/courses") || pathname.startsWith("/explore") || pathname.startsWith("/lessons") || pathname.startsWith("/year"),
      iconBg: "bg-[#E8F5E9] text-[#16865A] border border-[#B9E4C9]",
      activeIconBg: "bg-white text-[#16865A] shadow-xs",
      icon: (
        <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      badge: (
        <span className="text-[10px] font-black uppercase text-[#0B7650] bg-[#E8F5E9] border border-[#B9E4C9] px-2 py-0.5 rounded-md">
          15 DOMAINS
        </span>
      ),
    },
    {
      label: "AI Mentor",
      href: "/mentor",
      isActive: pathname.startsWith("/mentor"),
      iconBg: "bg-[#E8F5E9] text-[#16865A] border border-[#B9E4C9]",
      activeIconBg: "bg-white text-[#16865A] shadow-xs",
      icon: (
        <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8V4H8" />
          <circle cx="8" cy="4" r="1" fill="currentColor" />
          <rect width="16" height="12" x="4" y="8" rx="2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2 14h2M20 14h2M15 13v2M9 13v2" />
        </svg>
      ),
      badge: (
        <span className="text-[10px] font-black uppercase text-[#0B7650] bg-[#E8F5E9] border border-[#B9E4C9] px-2 py-0.5 rounded-md">
          24/7
        </span>
      ),
    },
    {
      label: "Studio",
      href: "/studio",
      isActive: isStudioActive,
      iconBg: "bg-indigo-50 text-indigo-700 border border-indigo-200",
      activeIconBg: "bg-white text-indigo-700 shadow-xs",
      icon: (
        <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      badge: (
        <span className="text-[10px] font-black uppercase text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-md border border-indigo-200">
          PRO
        </span>
      ),
      subItems: [
        {
          label: "Project Hub (IDE)",
          href: "/project-hub",
          icon: "🚀",
          isActive: pathname.startsWith("/project-hub") || pathname.startsWith("/agentkit"),
        },
        {
          label: "Workspace (Storage)",
          href: "/workspace",
          icon: "💾",
          isActive: pathname.startsWith("/workspace"),
        },
        {
          label: "Mock Interviews",
          href: "/interview",
          icon: "🎙️",
          isActive: pathname.startsWith("/interview"),
        },
        {
          label: "Resume Builder",
          href: "/resume",
          icon: "📄",
          isActive: pathname.startsWith("/resume"),
        },
        {
          label: "Community & Rank",
          href: "/community",
          icon: "👥",
          isActive: pathname.startsWith("/community"),
        },
      ],
    },
    {
      label: "Live Cohorts",
      href: "/cohorts",
      isActive: pathname.startsWith("/cohorts"),
      iconBg: "bg-red-50 text-red-700 border border-red-200",
      activeIconBg: "bg-white text-red-700 shadow-xs",
      icon: (
        <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      badge: (
        <span className="text-[10px] font-black uppercase text-red-700 bg-red-100 px-2 py-0.5 rounded-md border border-red-200">
          LIVE
        </span>
      ),
    },
  ];

  return (
    <aside
      className={`bg-white/80 backdrop-blur-xl border-b lg:border-b-0 lg:border-r border-slate-200/80 flex flex-col justify-between shrink-0 lg:h-screen lg:sticky lg:top-0 lg:overflow-y-auto z-30 transition-all duration-250 ease-in-out ${
        isCollapsed ? "w-full lg:w-20 p-3 lg:p-4" : "w-full lg:w-64 p-5 lg:p-6"
      }`}
    >
      <div>
        {/* Header with Expand / Collapse Toggle */}
        <div className="flex items-center justify-between">
          {!isCollapsed ? (
            <div className="flex items-center justify-between w-full">
              <BrandLogo subtitle="Grow Beyond the Classroom." />
              <button
                onClick={() => setIsCollapsed(true)}
                className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                title="Minimize sidebar to icons"
                aria-label="Minimize sidebar"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              </button>
            </div>
          ) : (
            <div className="hidden lg:flex flex-col items-center w-full gap-2">
              <button
                onClick={() => setIsCollapsed(false)}
                className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-emerald-500/30 bg-emerald-50 shadow-md shadow-emerald-500/20 hover:scale-105 transition-transform duration-200 cursor-pointer flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                title="Click to expand sidebar"
              >
                <Image
                  src="/campusgrow-icon.png"
                  alt="CampusGrow"
                  fill
                  className="object-cover"
                  priority
                />
              </button>
              <button
                onClick={() => setIsCollapsed(false)}
                className="p-1 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded transition duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                title="Expand sidebar"
                aria-label="Expand sidebar"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}

          {/* Mobile brand header */}
          <div className="flex lg:hidden items-center justify-between w-full">
            <BrandLogo subtitle="Grow Beyond the Classroom." />
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-slate-600 hover:text-black rounded-lg cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                aria-label="Toggle navigation"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className={`mt-6 space-y-1.5 ${isMobileMenuOpen ? "block" : "hidden lg:block"}`}>
          {navItems.map((item) => {
            const isItemActive = item.isActive;

            // When collapsed on desktop: show icon-only button with pastel/spatial background and tooltip
            if (isCollapsed) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  title={item.label}
                  className={`group flex items-center justify-center h-11 w-11 mx-auto rounded-xl transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                    isItemActive
                      ? "bg-emerald-500/15 border border-emerald-500/30 shadow-xs"
                      : "hover:bg-slate-100/70 border border-transparent"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 ${
                      isItemActive ? item.activeIconBg : item.iconBg
                    }`}
                  >
                    {item.icon}
                  </div>
                </Link>
              );
            }

            // When expanded (or on mobile)
            if (item.subItems) {
              return (
                <div key={item.label} className="space-y-1">
                  <div
                    className={`group flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/70 focus-visible:ring-offset-1 ${
                      isItemActive
                        ? "bg-indigo-50 text-indigo-950 font-bold border border-indigo-200 shadow-xs"
                        : "text-slate-700 hover:text-slate-950 hover:bg-slate-100/70 font-medium border border-transparent"
                    }`}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 min-w-0 flex-1"
                    >
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200 ${
                          isItemActive ? item.activeIconBg : item.iconBg
                        }`}
                      >
                        {item.icon}
                      </div>
                      <span className="truncate transition-transform duration-200 ease-out group-hover:translate-x-[2.5px] motion-reduce:transform-none">
                        {item.label}
                      </span>
                    </Link>

                    <div className="flex items-center gap-1.5">
                      {item.badge && (
                        <span className="shrink-0">{item.badge}</span>
                      )}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setIsStudioExpanded(!isStudioExpanded);
                        }}
                        className="p-1 rounded-md hover:bg-indigo-100 text-slate-500 hover:text-slate-800 transition"
                        title={isStudioExpanded ? "Collapse studio menu" : "Expand studio menu"}
                      >
                        <svg
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            isStudioExpanded ? "rotate-180" : ""
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Indented Sub-items */}
                  {isStudioExpanded && (
                    <div className="pl-6 space-y-1 border-l-2 border-indigo-100 ml-5 my-1">
                      {item.subItems.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs transition-all ${
                            sub.isActive
                              ? "bg-indigo-100 text-indigo-900 font-bold border border-indigo-200 shadow-2xs"
                              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium"
                          }`}
                        >
                          <span>{sub.icon}</span>
                          <span className="truncate">{sub.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`group flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/70 focus-visible:ring-offset-1 ${
                  isItemActive
                    ? "bg-emerald-500/10 text-emerald-950 font-bold border border-emerald-500/30 shadow-xs"
                    : "text-slate-700 hover:text-slate-950 hover:bg-slate-100/70 font-medium border border-transparent"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200 ${
                      isItemActive ? item.activeIconBg : item.iconBg
                    }`}
                  >
                    {item.icon}
                  </div>
                  <span className="truncate transition-transform duration-200 ease-out group-hover:translate-x-[2.5px] motion-reduce:transform-none">
                    {item.label}
                  </span>
                </div>
                {item.badge && (
                  <span className={isItemActive ? "brightness-105 shrink-0" : "shrink-0"}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer with User Profile */}
      <div className="mt-6 pt-4 border-t border-slate-200/80 hidden lg:flex flex-col gap-3">
        {isCollapsed ? (
          <Link
            href="/profile"
            title={`${studentName} (${isPro ? "Pro Member" : "Free Plan"})`}
            className="flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-full"
          >
            <div className="h-10 w-10 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center font-bold text-emerald-800 text-sm hover:scale-105 transition duration-200 cursor-pointer">
              {studentName.charAt(0).toUpperCase()}
            </div>
          </Link>
        ) : (
          <Link
            href="/profile"
            className="flex items-center gap-3 p-2 rounded-2xl hover:bg-slate-100/70 border border-transparent hover:border-slate-200/80 transition duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <div className="h-10 w-10 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center font-bold text-emerald-800 text-sm shrink-0">
              {studentName.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-slate-900 truncate">{studentName}</p>
              {isPro ? (
                <p className="text-[11px] text-amber-600 font-bold truncate">👑 Pro Member</p>
              ) : (
                <Link
                  href="/#pricing"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 text-[10px] font-black text-amber-700 bg-amber-100 hover:bg-amber-200 px-1.5 py-0.5 rounded transition"
                  title="Upgrade to CampusGrow Pro"
                >
                  <span>Free • Upgrade</span>
                  <span>↗</span>
                </Link>
              )}
            </div>
          </Link>
        )}
      </div>
    </aside>
  );
}
