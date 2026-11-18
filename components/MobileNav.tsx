"use client";

import Link from "next/link";
import { useState } from "react";

type MobileNavProps = {
  breakpoint?: "md" | "lg";
};

const navigationItems = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Learning Hub", href: "/learning-hub" },
  { label: "AI Mentor", href: "/mentor" },
  { label: "Studio (PRO)", href: "/studio" },
  { label: "Live Cohorts", href: "/cohorts" },
  { label: "Discover Role 🚀", href: "/discover-role" },
  { label: "Profile", href: "/profile" },
];

export default function MobileNav({ breakpoint = "md" }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const visibilityClass = breakpoint === "lg" ? "lg:hidden" : "md:hidden";

  return (
    <div className={`relative z-40 ${visibilityClass}`}>
      <button
        type="button"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-app-navigation"
        onClick={() => setIsOpen((open) => !open)}
        className="flex h-11 w-11 items-center justify-center rounded-lg border border-emerald-600 bg-gradient-to-r from-emerald-500 to-teal-500 text-gray-950 shadow-[0_2px_0_#047857] transition hover:-translate-y-0.5 hover:border-emerald-400 hover:from-emerald-400 hover:to-teal-400 hover:shadow-lg focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-emerald-400 active:translate-y-px"
      >
        <span className="flex w-5 flex-col gap-1.5" aria-hidden="true">
          <span className={`h-0.5 w-full rounded bg-current transition-transform ${isOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-full rounded bg-current transition-opacity ${isOpen ? "opacity-0" : "opacity-100"}`} />
          <span className={`h-0.5 w-full rounded bg-current transition-transform ${isOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </span>
      </button>

      {isOpen && (
        <nav
          id="mobile-app-navigation"
          aria-label="Main navigation"
          className="absolute right-0 top-full mt-3 grid max-h-[min(70vh,32rem)] w-56 gap-2 overflow-y-auto rounded-xl border border-gray-200 bg-white p-3 shadow-xl"
        >
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="rounded-md border border-emerald-600 bg-gradient-to-r from-emerald-500 to-teal-500 px-3 py-2.5 text-sm font-semibold text-gray-950 transition hover:-translate-y-0.5 hover:border-emerald-400 hover:from-emerald-400 hover:to-teal-400 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 active:translate-y-px"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
