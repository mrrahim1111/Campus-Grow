"use client";
// components/UpgradeButton.tsx
// Navigates user to pricing & subscription plans
import Link from "next/link";

interface UpgradeButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export default function UpgradeButton({
  className = "",
  children,
}: UpgradeButtonProps) {
  return (
    <Link
      href="/#pricing"
      className={`${className} inline-flex items-center justify-center`}
    >
      {children ?? "Upgrade to PRO"}
    </Link>
  );
}
