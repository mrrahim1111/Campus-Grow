import type { Metadata } from "next";
import "./globals.css";

import AppShell from "@/components/AppShell";

export const metadata: Metadata = {
  title: "CampusGrow — Grow Beyond the Classroom.",
  description:
    "Your personal learning companion for your engineering journey.",
  icons: {
    icon: "/campusgrow-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="h-full antialiased font-sans light"
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-[#E8F5E9] text-[#102B24] selection:bg-[#B9E4C9] selection:text-[#0B7650]"
        suppressHydrationWarning
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
