"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import AppSidebar from "@/components/AppSidebar";
import TopNavigation from "@/components/TopNavigation";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    try {
      localStorage.removeItem("campusgrow_theme");
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    } catch {}
  }, []);

  // Onboarding, Login, full-screen Diagnostic Assessment, and Homepage (marketing website) shouldn't show the dashboard sidebar
  const noSidebarRoutes = ["/login", "/onboarding", "/assessment"];
  const hideSidebar = pathname === "/" || noSidebarRoutes.some((route) => pathname.startsWith(route));

  if (hideSidebar) {
    return <>{children}</>;
  }

  const isIdeRoute =
    pathname.startsWith("/terminal") ||
    pathname.startsWith("/project-hub") ||
    pathname.startsWith("/workspace");

  return (
    <div className="min-h-screen lg:h-screen lg:overflow-hidden bg-[#E8F5E9] text-[#102B24] flex flex-col lg:flex-row antialiased font-sans transition-colors duration-250">
      <AppSidebar />
      <div
        className={`flex-1 min-w-0 flex flex-col ${
          isIdeRoute
            ? "h-screen overflow-hidden"
            : "lg:h-screen lg:overflow-y-auto overflow-x-hidden"
        }`}
      >
        {!isIdeRoute && <TopNavigation />}
        <main className="flex-1 min-w-0 flex flex-col">
          {children}
        </main>
      </div>
    </div>
  );
}
