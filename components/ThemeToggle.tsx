"use client";

import { useEffect } from "react";

export interface ThemeToggleProps {
  collapsed?: boolean;
  className?: string;
}

export default function ThemeToggle(_props: ThemeToggleProps) {
  useEffect(() => {
    try {
      localStorage.removeItem("campusgrow_theme");
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      document.documentElement.style.colorScheme = "light";
    } catch {
      // ignore
    }
  }, []);

  return null;
}
