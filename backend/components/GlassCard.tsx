"use client";

import React from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "elevated" | "interactive" | "flat";
  glow?: "green" | "blue" | "none";
  className?: string;
}

export default function GlassCard({
  children,
  variant = "default",
  glow = "none",
  className = "",
  ...props
}: GlassCardProps) {
  let baseClass = "rounded-2xl transition-all duration-200 ";

  switch (variant) {
    case "elevated":
      baseClass += "glass-panel-elevated ";
      break;
    case "interactive":
      baseClass += "glass-panel glass-panel-interactive cursor-pointer ";
      break;
    case "flat":
      baseClass +=
        "bg-white/70 dark:bg-[#101B2D]/70 backdrop-blur-md border border-slate-200/80 dark:border-white/5 ";
      break;
    case "default":
    default:
      baseClass += "glass-panel ";
      break;
  }

  if (glow === "green") {
    baseClass += "spatial-glow-green ";
  } else if (glow === "blue") {
    baseClass += "spatial-glow-blue ";
  }

  return (
    <div className={`${baseClass} ${className}`} {...props}>
      {children}
    </div>
  );
}
