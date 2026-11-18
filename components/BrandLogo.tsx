"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface BrandLogoProps {
  badge?: string;
  className?: string;
  compactOnMobile?: boolean;
  subtitle?: string;
  size?: "default" | "large";
}

export default function BrandLogo({
  badge,
  className = "",
  compactOnMobile = false,
  subtitle = "Grow Beyond the Classroom.",
  size = "default",
}: BrandLogoProps) {
  const router = useRouter();
  const isLarge = size === "large";

  return (
    <div
      onClick={() => router.push("/")}
      className={`inline-flex items-center ${compactOnMobile ? "gap-2 sm:gap-3" : "gap-3"} cursor-pointer group select-none ${className}`}
      title="CampusGrow — Grow Beyond the Classroom"
    >
      {/* Stable Logo Icon */}
      <div
        className={`relative shrink-0 overflow-hidden rounded-xl border border-emerald-500/30 bg-emerald-50/80 shadow-xs group-hover:scale-105 transition-transform duration-200 flex items-center justify-center ${
          isLarge ? "h-14 w-14" : compactOnMobile ? "h-8 w-8 sm:h-10 sm:w-10" : "h-10 w-10"
        }`}
      >
        <Image
          src="/campusgrow-icon.png"
          alt="CampusGrow"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Stable Brand Text & Tagline */}
      <div className="flex flex-col justify-center shrink-0 leading-none">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`font-black tracking-tight text-slate-950 dark:text-white flex items-center ${
              isLarge ? "text-3xl sm:text-4xl" : compactOnMobile ? "text-base sm:text-xl" : "text-xl"
            }`}
          >
            Campus
            <span className="text-emerald-500 bg-gradient-to-r from-emerald-500 via-[#13C995] to-[#55C8FF] bg-clip-text text-transparent font-black ml-0.5">
              Grow
            </span>
          </span>
        </div>
        <span
          className={`font-bold text-slate-500 dark:text-slate-400 tracking-tight mt-1 leading-tight ${
            isLarge
              ? "whitespace-nowrap text-sm sm:text-base text-emerald-600 dark:text-[#13C995]"
              : compactOnMobile
                ? "whitespace-nowrap text-[9px] sm:text-[11px]"
                : "whitespace-nowrap text-[11px]"
          }`}
        >
          {subtitle}
        </span>
      </div>
    </div>
  );
}
