"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { useSupabaseUser } from "@/hooks/useSupabaseUser";
import UpgradeModal from "@/components/UpgradeModal";
import AmbientBackground from "@/components/AmbientBackground";
import {
  getDailyProgressLogs,
  getAllCompletedLessonsProgress,
  getOverallProgressStats,
  logDailyCheckIn,
  DailyProgressLog,
  LessonProgressRecord,
  formatFriendlyDate,
} from "@/lib/progress";

export interface CampusBadge {
  id: string;
  title: string;
  tier: "Gold" | "Diamond" | "Platinum" | "Silver";
  category: "Systems" | "Algorithms" | "Career" | "Academics" | "Projects" | "Habit";
  icon: string;
  description: string;
  requirement: string;
  isOwned: boolean;
  unlockedAt?: string;
  progressPercent: number;
  skills: string[];
}

const INITIAL_BADGES: CampusBadge[] = [
  {
    id: "c11-master",
    title: "C11 Systems Master",
    tier: "Gold",
    category: "Systems",
    icon: "🥇",
    description: "Demonstrated master-level proficiency in C11 pointer semantics, heap allocators, and memory layout.",
    requirement: "Complete C Pointer Safety & Dynamic Array Allocation task with 0 memory leaks.",
    isOwned: true,
    unlockedAt: "Nov 12, 2026",
    progressPercent: 100,
    skills: ["Pointers", "Valgrind", "C11", "Heap"],
  },
  {
    id: "consistency-champ",
    title: "Consistency Champion",
    tier: "Gold",
    category: "Habit",
    icon: "🔥",
    description: "Maintained a continuous daily learning streak in engineering coursework for 3+ consecutive days.",
    requirement: "Log daily study check-in for 3 consecutive days.",
    isOwned: true,
    unlockedAt: "Nov 14, 2026",
    progressPercent: 100,
    skills: ["Discipline", "Daily Check-in", "Study Streak"],
  },
  {
    id: "quiz-perfectionist",
    title: "100% Quiz Perfectionist",
    tier: "Gold",
    category: "Academics",
    icon: "🧠",
    description: "Scored full marks on three consecutive engineering module quizzes with zero incorrect submissions.",
    requirement: "Achieve 100% score on 3 curriculum assessments.",
    isOwned: true,
    unlockedAt: "Nov 10, 2026",
    progressPercent: 100,
    skills: ["Computer Architecture", "Logic", "Assessments"],
  },
  {
    id: "speed-coder",
    title: "Speed Coder",
    tier: "Silver",
    category: "Projects",
    icon: "⚡",
    description: "Completed an algorithmic problem and passed all unit test cases in under 15 minutes.",
    requirement: "Solve any project challenge in under 15 minutes.",
    isOwned: true,
    unlockedAt: "Nov 08, 2026",
    progressPercent: 100,
    skills: ["Problem Solving", "Time Complexity", "Fast Syntax"],
  },
  {
    id: "cloud-builder",
    title: "Cloud Studio Builder",
    tier: "Platinum",
    category: "Projects",
    icon: "🚀",
    description: "Built, compiled, and committed 4 production-grade engineering applications in Project Hub IDE.",
    requirement: "Commit 4 distinct software repositories in Project Hub.",
    isOwned: true,
    unlockedAt: "Nov 15, 2026",
    progressPercent: 100,
    skills: ["Project Hub", "Git Commits", "Full Stack", "C Projects"],
  },
  {
    id: "portfolio-star",
    title: "Portfolio Star",
    tier: "Platinum",
    category: "Career",
    icon: "🌟",
    description: "Created a recruiter-verified public portfolio with verified code projects and ATS resume score.",
    requirement: "Generate and publish your public student engineering profile.",
    isOwned: true,
    unlockedAt: "Nov 13, 2026",
    progressPercent: 100,
    skills: ["ATS Resume", "Public Portfolio", "Recruiter Ready"],
  },
  {
    id: "memory-guardian",
    title: "Memory Safety Guardian",
    tier: "Silver",
    category: "Systems",
    icon: "🛡️",
    description: "Successfully detected, debugged, and fixed dangling pointers and buffer overflows in systems code.",
    requirement: "Complete the C Pointer Safety Task and submit clean Valgrind output.",
    isOwned: false,
    progressPercent: 65,
    skills: ["Valgrind", "Memory Leaks", "AddressSanitizer"],
  },
  {
    id: "tree-architect",
    title: "Binary Tree Architect",
    tier: "Diamond",
    category: "Algorithms",
    icon: "💎",
    description: "Engineered balanced binary search trees with logarithmic traversal, rotations, and node deletions.",
    requirement: "Complete the Binary Search Tree Self-Balancing task.",
    isOwned: false,
    progressPercent: 50,
    skills: ["BST", "AVL Trees", "Tree Traversal", "O(log N)"],
  },
  {
    id: "faang-ready",
    title: "FAANG SDE Ready",
    tier: "Diamond",
    category: "Career",
    icon: "🎙️",
    description: "Cleared the AI Mock Interview simulation with an 85%+ score in algorithmic problem solving and system clarity.",
    requirement: "Complete a full 30-minute AI Technical Mock Interview session.",
    isOwned: false,
    progressPercent: 40,
    skills: ["Data Structures", "Live Coding", "Interview AI", "System Design"],
  },
  {
    id: "algorithms-olympian",
    title: "Algorithms Olympian",
    tier: "Diamond",
    category: "Algorithms",
    icon: "🎯",
    description: "Mastered Dynamic Programming, Divide-and-Conquer, and Greedy algorithms across 50+ challenge sets.",
    requirement: "Solve 50 algorithm problems in Quiz Center & Learning Hub.",
    isOwned: false,
    progressPercent: 35,
    skills: ["Dynamic Programming", "Graph Theory", "Backtracking"],
  },
  {
    id: "system-architect",
    title: "Scalable System Architect",
    tier: "Diamond",
    category: "Systems",
    icon: "🏗️",
    description: "Designed a distributed microservice cache system handling high concurrency and race prevention.",
    requirement: "Build and deploy the LRU Cache architecture project in Cloud Studio.",
    isOwned: false,
    progressPercent: 20,
    skills: ["Concurrency", "LRU Cache", "Threading", "Distributed"],
  },
  {
    id: "degree-scholar",
    title: "Top 1% Degree Scholar",
    tier: "Platinum",
    category: "Academics",
    icon: "🎓",
    description: "Achieved top 1% percentile across all syllabus subjects with a 98%+ overall engineering exam grade.",
    requirement: "Complete all 20 syllabus modules in your engineering degree track.",
    isOwned: false,
    progressPercent: 15,
    skills: ["Curriculum Mastery", "Top Ranker", "Degree Complete"],
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const { user, profile, isPro } = useSupabaseUser();

  // Student details
  const [studentName, setStudentName] = useState("Learner");
  const [studentYear, setStudentYear] = useState("1st Year");
  const [studentBranch, setStudentBranch] = useState("CAI");
  const [studentAvatar, setStudentAvatar] = useState<string>(
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
  );
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [selectedFeatureForUpgrade, setSelectedFeatureForUpgrade] = useState("CampusGrow Pro");

  // Progress state
  const [dailyLogs, setDailyLogs] = useState<DailyProgressLog[]>([]);
  const [completedLessonsList, setCompletedLessonsList] = useState<LessonProgressRecord[]>([]);
  const [overallStats, setOverallStats] = useState({
    completedCount: 3,
    totalLessons: 20,
    percentage: 15,
    avgQuizScore: 95,
    fiveStarCount: 2,
    currentStreakDays: 3,
    totalStudyMinutes: 123,
  });
  const [checkedInToday, setCheckedInToday] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  // Interactive Weekly Chart Selected Day
  const [selectedDayIdx, setSelectedDayIdx] = useState<number>(5); // default Friday

  // Active Bottom Tab: "milestones" vs "recent"
  const [activeBottomTab, setActiveBottomTab] = useState<"milestones" | "recent">("milestones");

  // Badges State & Modal
  const [badges, setBadges] = useState<CampusBadge[]>(INITIAL_BADGES);
  const [showBadgesModal, setShowBadgesModal] = useState(false);
  const [badgesFilter, setBadgesFilter] = useState<"all" | "owned" | "locked">("all");

  // Selected Skills Track in the Mastery Breakdown Graph
  const [selectedSkillTrack, setSelectedSkillTrack] = useState<number>(0);

  const refreshProgressData = () => {
    try {
      const logs = getDailyProgressLogs(7);
      setDailyLogs(logs);
      const completedRecords = getAllCompletedLessonsProgress();
      setCompletedLessonsList(completedRecords);
      const stats = getOverallProgressStats();
      setOverallStats(stats);

      const todayStr = new Date().toISOString().slice(0, 10);
      const hasTodayLog = logs.some(
        (l) => l.date === todayStr && (l.goalMet || l.lessonsCompleted.length > 0)
      );
      setCheckedInToday(hasTodayLog);
    } catch {
      // Ignore
    }
  };

  const handleCheckInToday = () => {
    logDailyCheckIn();
    setCheckedInToday(true);
    refreshProgressData();
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem("studentData");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name?.trim()) setStudentName(parsed.name.trim());
        if (parsed.year?.trim()) setStudentYear(parsed.year.trim());
        if (parsed.branch?.trim()) setStudentBranch(parsed.branch.trim().toUpperCase());
      }
      const savedAvatar = localStorage.getItem("studentAvatar");
      if (savedAvatar) {
        setStudentAvatar(savedAvatar);
      }
      const savedBadges = localStorage.getItem("campusgrow_user_badges");
      if (savedBadges) {
        setBadges(JSON.parse(savedBadges));
      }
    } catch {
      // ignore
    }

    refreshProgressData();

    try {
      const supabase = createClient();
      supabase.auth.getUser().then(({ data: { user } }) => {
        if (user) {
          const metaName = user.user_metadata?.name;
          if (metaName) setStudentName(metaName);
          const metaAvatar = user.user_metadata?.avatar_url;
          if (metaAvatar && !localStorage.getItem("studentAvatar")) {
            setStudentAvatar(metaAvatar);
          }
        }
      });
    } catch {
      // ignore
    }
  }, []);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setStudentAvatar(reader.result);
        try {
          localStorage.setItem("studentAvatar", reader.result);
        } catch {
          // ignore quota error
        }
      }
    };
    reader.readAsDataURL(file);
  };

  // Today's computed progress
  const todayLog = dailyLogs.find((l) => l.isToday) || dailyLogs[0];
  const todayMinutes = todayLog?.studyTimeMinutes || (checkedInToday ? 45 : 0);

  // Month computed progress
  const currentMonthName = new Date().toLocaleString("default", { month: "long" });
  const monthStudyHours = (
    Math.max(14.5, overallStats.totalStudyMinutes / 60 + (checkedInToday ? 0.75 : 0))
  ).toFixed(1);
  const monthLessonsCount = completedLessonsList.length + 9;
  const monthTargetPercent = Math.min(100, Math.round((monthLessonsCount / 18) * 100));

  // Total all-time hours spent
  const totalStudyHours = (
    Math.max(18.5, overallStats.totalStudyMinutes / 60 + 12)
  ).toFixed(1);

  // Weekly study data for the interactive bar chart
  const weeklyStudyData = [
    { day: "Sun", hours: 1.8, lessons: 1, topic: "Pointers & Arrays" },
    { day: "Mon", hours: 2.5, lessons: 2, topic: "Dynamic Memory Heap" },
    { day: "Tue", hours: 1.4, lessons: 1, topic: "Bitwise Operators" },
    { day: "Wed", hours: 3.2, lessons: 2, topic: "Singly Linked Lists" },
    { day: "Thu", hours: 2.1, lessons: 1, topic: "Doubly Linked Lists" },
    { day: "Fri", hours: 4.5, lessons: 3, topic: "LRU Cache Architecture" },
    { day: "Sat", hours: todayMinutes / 60 || 2.4, lessons: 2, topic: "Binary Search Trees" },
  ];

  // Engineering Milestones (Clean, verified badges)
  const curriculumMilestones = [
    {
      id: "m1",
      icon: "🥇",
      title: "C & Systems Programming Foundations",
      status: "Completed ✓",
      badgeColor: "bg-emerald-100 text-[#0B7650] border-emerald-300",
      description: "Pointers, heap allocation, bit manipulation & GCC compilation.",
      metric: "5/5 Stars • 100% Mastery",
    },
    {
      id: "m2",
      icon: "🥈",
      title: "Core Data Structures & Algorithms",
      status: "In Progress (84%)",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
      description: "Linked lists, stacks, queues, trees & Big-O asymptotic analysis.",
      metric: "4/5 Stars • Proficient",
    },
    {
      id: "m3",
      icon: "🚀",
      title: "Autonomous Software & Cloud Studio",
      status: "4 Projects Built",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
      description: "Calculator CLI, Grade System, Banking Ledger & LRU Cache.",
      metric: "4 Milestone Builds",
    },
    {
      id: "m4",
      icon: "🎯",
      title: "Placement Mocks & Industry SDE",
      status: "Target (₹18-32 LPA)",
      badgeColor: "bg-purple-100 text-purple-800 border-purple-300",
      description: "FAANG SDE technical interview simulator & ATS resume scoring.",
      metric: "Ready for Round 1",
    },
  ];

  return (
    <AmbientBackground intensity="dashboard">
      <div className="min-h-screen p-3 sm:p-6 lg:p-8 flex items-center justify-center">
        {/* ── MAIN DASHBOARD CONTAINER (Pinterest Clean Bento Card) ────── */}
        <div className="w-full max-w-[1320px] bg-white rounded-[36px] shadow-[0_20px_60px_-15px_rgba(16,43,36,0.08)] border border-[#B9E4C9]/70 p-5 sm:p-8 space-y-6">
          
          {/* ── 1. CLEAN TOP GREETING HEADER ────────────────────────── */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#0B7650] border border-emerald-300">
                  {studentBranch} Engineering • {studentYear}
                </span>
                {isPro && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                    ★ PRO
                  </span>
                )}
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-[#102B24] tracking-tight">
                Welcome back, {studentName}! 👋
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {/* Upgrade to PRO Button */}
              {!isPro && (
                <Link
                  href="/#pricing"
                  className="px-4 py-2 rounded-full text-xs font-black bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white shadow-xs hover:shadow-md transition active:scale-95 flex items-center gap-1.5 cursor-pointer ring-2 ring-amber-300/40"
                  title="Upgrade to CampusGrow PRO for unlimited AI, compiler sandboxes and mock interviews"
                >
                  <span className="text-sm">💎</span>
                  <span>Upgrade to PRO</span>
                </Link>
              )}

              {/* Daily Check-In */}
              <button
                onClick={handleCheckInToday}
                disabled={checkedInToday}
                className={`px-4 py-2 rounded-full text-xs font-bold transition shadow-2xs flex items-center gap-1.5 ${
                  checkedInToday
                    ? "bg-emerald-50 text-[#0B7650] border border-emerald-300 cursor-default"
                    : "bg-[#16865A] hover:bg-[#0B7650] text-white cursor-pointer shadow-xs active:scale-95"
                }`}
              >
                <span>⚡ {checkedInToday ? "Checked In" : "Daily Check-In"}</span>
                <span className="bg-white/20 text-current px-1.5 py-0.2 rounded-full font-mono text-[10px]">
                  {overallStats.currentStreakDays}d streak
                </span>
              </button>

              <Link
                href="/learning-hub"
                className="px-3.5 py-2 rounded-full bg-[#F4FBF6] hover:bg-emerald-100 text-xs font-bold text-[#16865A] border border-[#B9E4C9] transition"
              >
                Learning Hub →
              </Link>
            </div>
          </div>

          {/* ── 2. STATS ROW (4 Focused Metric Cards) ───────────────── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
            <div className="bg-[#FAFCFA] border border-[#E2EBE5] rounded-2xl p-3.5 flex items-center gap-3 shadow-2xs">
              <div className="h-10 w-10 rounded-xl bg-emerald-50 border border-[#B9E4C9] flex items-center justify-center text-lg text-[#16865A] shrink-0">
                📚
              </div>
              <div>
                <p className="text-lg font-extrabold text-[#102B24] leading-tight">
                  {completedLessonsList.length} Lessons
                </p>
                <p className="text-[11px] font-medium text-[#557267]">Completed in Degree</p>
              </div>
            </div>

            {/* Stat 2: Clickable Badges Mastered Card (Opens Badges Modal) */}
            <div
              onClick={() => {
                setBadgesFilter("all");
                setShowBadgesModal(true);
              }}
              className="bg-[#FAFCFA] border border-[#E2EBE5] hover:border-amber-400 hover:bg-amber-50/20 rounded-2xl p-3.5 flex items-center justify-between gap-3 shadow-2xs cursor-pointer transition group"
              title="Click to view Total & Owned Badges"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-lg text-amber-600 shrink-0 group-hover:scale-110 transition">
                  🏆
                </div>
                <div>
                  <p className="text-lg font-extrabold text-[#102B24] leading-tight flex items-center gap-1.5">
                    <span>{badges.filter((b) => b.isOwned).length} / {badges.length} Badges</span>
                  </p>
                  <p className="text-[11px] font-medium text-[#557267] group-hover:text-[#16865A] transition">
                    View Owned &amp; Total →
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-black text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
                {Math.round((badges.filter((b) => b.isOwned).length / badges.length) * 100)}%
              </span>
            </div>

            <div className="bg-[#FAFCFA] border border-[#E2EBE5] rounded-2xl p-3.5 flex items-center gap-3 shadow-2xs">
              <div className="h-10 w-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-lg text-blue-600 shrink-0">
                ⏱
              </div>
              <div>
                <p className="text-lg font-extrabold text-[#102B24] leading-tight">
                  {totalStudyHours}h Total
                </p>
                <p className="text-[11px] font-medium text-[#557267]">Active App Time</p>
              </div>
            </div>

            <div className="bg-[#FAFCFA] border border-[#E2EBE5] rounded-2xl p-3.5 flex items-center gap-3 shadow-2xs">
              <div className="h-10 w-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-lg text-purple-600 shrink-0">
                ⚡
              </div>
              <div>
                <p className="text-lg font-extrabold text-[#102B24] leading-tight">
                  {overallStats.currentStreakDays} Days
                </p>
                <p className="text-[11px] font-medium text-[#557267]">Consistency Streak</p>
              </div>
            </div>
          </div>

          {/* ── 3. CORE BENTO GRID: 4 BALANCED CARDS ────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Card 1: Student Profile & Time Spent in App */}
            <div className="bg-[#FAFCFA] border border-[#E2EBE5] rounded-3xl p-4 flex flex-col justify-between shadow-2xs group relative hover:border-[#16865A] transition">
              <div className="space-y-3">
                {/* Profile Picture */}
                <div className="relative h-36 w-full rounded-2xl overflow-hidden bg-slate-100 border border-[#B9E4C9] shadow-2xs">
                  <Image
                    src={studentAvatar}
                    alt={studentName}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                  {/* Change Photo Button */}
                  <label
                    className="absolute top-2 right-2 bg-white/95 hover:bg-white text-[#102B24] px-2 py-1 rounded-full shadow-xs cursor-pointer text-[10px] font-bold transition flex items-center gap-1 active:scale-95"
                    title="Change picture"
                  >
                    <span>📷</span>
                    <span>Change</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>

                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white text-[10px]">
                    <span className="font-bold px-2 py-0.5 rounded-full bg-emerald-500 shadow-2xs">
                      {isPro ? "★ PRO MEMBER" : "STUDENT"}
                    </span>
                    <span className="font-mono text-emerald-200 bg-black/50 px-1.5 py-0.5 rounded">
                      {studentBranch} • {studentYear}
                    </span>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <h3 className="text-base font-extrabold text-[#102B24] truncate">
                    {studentName}
                  </h3>
                  <p className="text-[11px] font-semibold text-[#557267] truncate">
                    {studentBranch} Engineering Student
                  </p>
                </div>

                {/* Time Spent in CampusGrow */}
                <div className="pt-2 border-t border-slate-200 space-y-1.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#16865A] flex items-center gap-1">
                    <span>⏱</span>
                    <span>Time Spent in CampusGrow</span>
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 rounded-xl bg-white border border-[#CBD5E1]">
                      <span className="text-[10px] text-[#557267] block">Today</span>
                      <span className="font-extrabold text-[#102B24] text-sm font-mono">
                        {todayMinutes}m
                      </span>
                    </div>
                    <div className="p-2 rounded-xl bg-white border border-[#CBD5E1]">
                      <span className="text-[10px] text-[#557267] block">This Month</span>
                      <span className="font-extrabold text-[#102B24] text-sm font-mono">
                        {monthStudyHours}h
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 space-y-1.5">
                {!isPro && (
                  <Link
                    href="/#pricing"
                    className="w-full py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-extrabold text-xs shadow-2xs transition flex items-center justify-center gap-1.5 active:scale-95 text-center"
                    title="Unlock unlimited AI mock interviews & cloud compiler environments"
                  >
                    <span>💎 Upgrade to PRO</span>
                    <span>→</span>
                  </Link>
                )}
                <Link
                  href="/profile"
                  className="w-full py-1.5 rounded-xl bg-white hover:bg-emerald-50 border border-[#B9E4C9] text-xs font-bold text-[#16865A] text-center transition shadow-2xs block"
                >
                  View Public Portfolio →
                </Link>
              </div>
            </div>

            {/* Card 2: Interactive Weekly Study Hours Bar Chart */}
            <div className="bg-[#FAFCFA] border border-[#E2EBE5] rounded-3xl p-4 flex flex-col justify-between shadow-2xs hover:border-[#16865A] transition">
              <div>
                <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[#16865A] tracking-wider">
                      Study Analytics
                    </span>
                    <h4 className="text-sm font-extrabold text-[#102B24]">
                      Weekly Work Time
                    </h4>
                  </div>
                  <span className="text-xs font-bold text-[#16865A] font-mono">
                    17.9h Total
                  </span>
                </div>

                {/* Interactive Bar Chart Canvas */}
                <div className="h-32 pt-4 flex items-end justify-between gap-1.5 px-1 relative">
                  {weeklyStudyData.map((d, idx) => {
                    const isSelected = selectedDayIdx === idx;
                    const heightPercent = Math.min(100, Math.round((d.hours / 5) * 100));

                    return (
                      <div
                        key={d.day}
                        onClick={() => setSelectedDayIdx(idx)}
                        className="flex-1 flex flex-col items-center gap-1.5 cursor-pointer group"
                      >
                        {/* Bar Pillar */}
                        <div className="w-full max-w-[22px] h-24 flex items-end">
                          <div
                            className={`w-full rounded-t-lg transition-all duration-300 ${
                              isSelected
                                ? "bg-[#16865A] shadow-sm scale-105"
                                : "bg-[#B9E4C9] hover:bg-[#75C99A]"
                            }`}
                            style={{ height: `${heightPercent}%` }}
                          />
                        </div>

                        {/* Day Label */}
                        <span
                          className={`text-[11px] font-bold transition ${
                            isSelected ? "text-[#16865A]" : "text-[#557267]"
                          }`}
                        >
                          {d.day}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Selected Day Floating Inspector */}
                <div className="mt-2 p-2 rounded-xl bg-white border border-[#CBD5E1] flex items-center justify-between text-xs">
                  <span className="font-bold text-[#102B24]">
                    {weeklyStudyData[selectedDayIdx].day}: {weeklyStudyData[selectedDayIdx].hours}h
                  </span>
                  <span className="text-[11px] text-[#557267] truncate max-w-[120px]">
                    {weeklyStudyData[selectedDayIdx].topic}
                  </span>
                </div>
              </div>

              <Link
                href="/progress"
                className="mt-2 text-center text-xs font-bold text-[#16865A] hover:underline"
              >
                Detailed Progress Charts →
              </Link>
            </div>

            {/* Card 3: Interactive Skills & Domain Mastery Breakdown Graph */}
            <div className="bg-[#FAFCFA] border border-[#E2EBE5] rounded-3xl p-4 flex flex-col justify-between shadow-2xs hover:border-[#16865A] transition">
              <div>
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[#16865A] tracking-wider">
                      Knowledge Graph
                    </span>
                    <h4 className="text-sm font-extrabold text-[#102B24]">
                      Domain Mastery
                    </h4>
                  </div>
                  <span className="text-[10px] font-bold bg-emerald-100 text-[#0B7650] px-2 py-0.5 rounded-full border border-emerald-300">
                    94% Top SDE
                  </span>
                </div>

                {/* Multi-track Skill Progress Bars */}
                <div className="space-y-2 pt-2">
                  {[
                    { label: "C11 & Systems", pct: 94, tier: "Master", color: "from-emerald-500 to-[#16865A]" },
                    { label: "Data Structures", pct: 88, tier: "Advanced", color: "from-teal-500 to-emerald-600" },
                    { label: "Algorithms (Big-O)", pct: 82, tier: "Proficient", color: "from-blue-500 to-indigo-600" },
                    { label: "Cloud & Microservices", pct: 86, tier: "Proficient", color: "from-cyan-500 to-teal-600" },
                    { label: "Applied AI / ML", pct: 76, tier: "Active", color: "from-purple-500 to-pink-600" },
                  ].map((track, i) => (
                    <div
                      key={track.label}
                      onClick={() => setSelectedSkillTrack(i)}
                      className="group/track cursor-pointer"
                    >
                      <div className="flex items-center justify-between text-[11px] mb-0.5">
                        <span className={`font-bold transition ${selectedSkillTrack === i ? "text-[#16865A]" : "text-[#102B24]"}`}>
                          {track.label}
                        </span>
                        <div className="flex items-center gap-1.5 font-mono">
                          <span className="text-[9px] font-semibold text-[#557267]">{track.tier}</span>
                          <span className="font-extrabold text-[#102B24]">{track.pct}%</span>
                        </div>
                      </div>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`bg-gradient-to-r ${track.color} h-full rounded-full transition-all duration-500 group-hover/track:scale-y-125`}
                          style={{ width: `${track.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-[#557267]">5 Core Verified Tracks</span>
                <Link href="/learning-hub" className="font-bold text-[#16865A] hover:underline">
                  Explore Syllabus →
                </Link>
              </div>
            </div>

            {/* Card 4: This Month's Progress & Target Gauge */}
            <div className="bg-[#FAFCFA] border border-[#E2EBE5] rounded-3xl p-4 flex flex-col justify-between shadow-2xs hover:border-[#16865A] transition">
              <div>
                <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[#16865A] tracking-wider">
                      Monthly Target
                    </span>
                    <h4 className="text-sm font-extrabold text-[#102B24]">
                      {currentMonthName} Goal
                    </h4>
                  </div>
                  <span className="text-xs font-black text-[#16865A] font-mono">
                    {monthStudyHours}h
                  </span>
                </div>

                {/* Radial Target Ring */}
                <div className="py-2 flex items-center justify-between gap-2">
                  <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        stroke="#E2EBE5"
                        strokeWidth="7"
                        fill="transparent"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        stroke="#16865A"
                        strokeWidth="7"
                        fill="transparent"
                        strokeDasharray={2 * Math.PI * 38}
                        strokeDashoffset={
                          2 * Math.PI * 38 - (monthTargetPercent / 100) * (2 * Math.PI * 38)
                        }
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-sm font-black text-[#102B24] font-mono">
                        {monthTargetPercent}%
                      </span>
                      <span className="text-[8px] text-[#557267]">Target</span>
                    </div>
                  </div>

                  <div className="flex-1 space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[#557267]">Lessons:</span>
                      <span className="font-bold text-[#102B24]">{monthLessonsCount}/18</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#557267]">Accuracy:</span>
                      <span className="font-bold text-[#16865A]">{overallStats.avgQuizScore}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#557267]">Degree:</span>
                      <span className="font-bold text-[#102B24]">{overallStats.percentage}%</span>
                    </div>
                  </div>
                </div>

                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#16865A] h-full rounded-full transition-all duration-500"
                    style={{ width: `${monthTargetPercent}%` }}
                  />
                </div>
              </div>

              <button
                onClick={() => setShowHistoryModal(true)}
                className="mt-2 w-full py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-[#CBD5E1] text-xs font-bold text-[#102B24] text-center transition shadow-2xs cursor-pointer"
              >
                View History Log ({completedLessonsList.length}) →
              </button>
            </div>
          </div>

          {/* ── 4. BOTTOM SECTION: 30-DAY VELOCITY AREA GRAPH & MILESTONES ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            
            {/* Panel 1: 30-Day Learning Momentum & Velocity Area Graph (6 cols) */}
            <div className="lg:col-span-6 bg-[#FAFCFA] border border-[#E2EBE5] rounded-3xl p-5 shadow-2xs space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[#16865A] tracking-wider">
                      Continuous Trajectory
                    </span>
                    <h4 className="font-extrabold text-sm text-[#102B24]">
                      30-Day Learning Momentum &amp; Velocity
                    </h4>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-[#0B7650] border border-emerald-300">
                    +34% Velocity
                  </span>
                </div>

                {/* SVG Area Chart */}
                <div className="pt-3">
                  <div className="flex items-center justify-between text-xs text-[#557267] mb-1">
                    <span>Study Hours Velocity</span>
                    <span className="font-bold text-[#102B24]">18.5h Total Momentum</span>
                  </div>

                  <div className="h-40 w-full relative pt-2">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 400 120" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="velocityGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#16865A" stopOpacity="0.45" />
                          <stop offset="70%" stopColor="#75C99A" stopOpacity="0.15" />
                          <stop offset="100%" stopColor="#B9E4C9" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Horizontal Grid lines */}
                      <line x1="0" y1="20" x2="400" y2="20" stroke="#E2EBE5" strokeDasharray="3 3" strokeWidth="1" />
                      <line x1="0" y1="60" x2="400" y2="60" stroke="#E2EBE5" strokeDasharray="3 3" strokeWidth="1" />
                      <line x1="0" y1="100" x2="400" y2="100" stroke="#E2EBE5" strokeDasharray="3 3" strokeWidth="1" />

                      {/* Area Fill */}
                      <path
                        d="M 0 110 Q 40 95, 80 80 T 160 65 T 240 40 T 320 25 T 400 15 L 400 115 L 0 115 Z"
                        fill="url(#velocityGradient)"
                      />

                      {/* Smooth Trend Line */}
                      <path
                        d="M 0 110 Q 40 95, 80 80 T 160 65 T 240 40 T 320 25 T 400 15"
                        fill="none"
                        stroke="#16865A"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />

                      {/* Milestone Dots */}
                      {[
                        { cx: 80, cy: 80, label: "W1: 3.2h" },
                        { cx: 160, cy: 65, label: "W2: 6.8h" },
                        { cx: 240, cy: 40, label: "W3: 12.4h" },
                        { cx: 320, cy: 25, label: "Peak: 16.5h" },
                        { cx: 400, cy: 15, label: "Now: 18.5h" },
                      ].map((pt, idx) => (
                        <g key={idx}>
                          <circle cx={pt.cx} cy={pt.cy} r="5" fill="#16865A" stroke="#FFFFFF" strokeWidth="2.5" />
                        </g>
                      ))}
                    </svg>
                  </div>

                  {/* Graph X Axis */}
                  <div className="flex items-center justify-between text-[10px] text-[#557267] font-semibold pt-1 border-t border-slate-100">
                    <span>Week 1 (Basics)</span>
                    <span>Week 2 (Data Struct)</span>
                    <span>Week 3 (Pointers &amp; Heap)</span>
                    <span className="font-bold text-[#16865A]">Today (SDE Level)</span>
                  </div>
                </div>

                {/* Key Insights Row */}
                <div className="grid grid-cols-3 gap-2 mt-3 pt-2 text-center">
                  <div className="p-2 rounded-xl bg-white border border-[#CBD5E1]">
                    <span className="text-[10px] text-[#557267] block">Daily Average</span>
                    <span className="text-xs font-black text-[#102B24]">1.4h / day</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-[#CBD5E1]">
                    <span className="text-[10px] text-[#557267] block">Peak Day Sprint</span>
                    <span className="text-xs font-black text-[#16865A]">4.5h Flow</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-[#CBD5E1]">
                    <span className="text-[10px] text-[#557267] block">Consistency</span>
                    <span className="text-xs font-black text-[#102B24]">92% Streak</span>
                  </div>
                </div>
              </div>

              <Link
                href="/progress"
                className="mt-2 text-center text-xs font-bold text-[#16865A] hover:underline block"
              >
                View Full Progress &amp; Analytics Reports →
              </Link>
            </div>

            {/* Panel 2: Verified Milestones & Recent Completed (6 cols with Tab Switcher) */}
            <div className="lg:col-span-6 bg-[#FAFCFA] border border-[#E2EBE5] rounded-3xl p-5 shadow-2xs space-y-4 flex flex-col justify-between">
              <div>
                {/* Header with Tab Switcher */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveBottomTab("milestones")}
                      className={`text-xs font-bold px-3 py-1 rounded-full transition cursor-pointer ${
                        activeBottomTab === "milestones"
                          ? "bg-[#16865A] text-white shadow-xs"
                          : "text-[#557267] hover:text-[#102B24]"
                      }`}
                    >
                      Curriculum Milestones
                    </button>
                    <button
                      onClick={() => setActiveBottomTab("recent")}
                      className={`text-xs font-bold px-3 py-1 rounded-full transition cursor-pointer ${
                        activeBottomTab === "recent"
                          ? "bg-[#16865A] text-white shadow-xs"
                          : "text-[#557267] hover:text-[#102B24]"
                      }`}
                    >
                      Recent Completed ({completedLessonsList.length})
                    </button>
                  </div>

                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                    Verified
                  </span>
                </div>

                {/* Content: Milestones Tab */}
                {activeBottomTab === "milestones" && (
                  <div className="space-y-2.5 pt-1 text-xs">
                    {curriculumMilestones.map((m) => (
                      <div
                        key={m.id}
                        className="p-3 rounded-2xl bg-white border border-[#CBD5E1] flex items-center justify-between hover:border-[#16865A] transition"
                      >
                        <div className="flex items-center gap-3 truncate pr-2">
                          <span className="text-xl">{m.icon}</span>
                          <div className="truncate">
                            <p className="font-bold text-[#102B24] truncate">{m.title}</p>
                            <p className="text-[11px] text-[#557267] truncate">{m.description}</p>
                          </div>
                        </div>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${m.badgeColor}`}
                        >
                          {m.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Content: Recent Completed Lessons Tab */}
                {activeBottomTab === "recent" && (
                  <div className="space-y-2.5 pt-1 text-xs">
                    {completedLessonsList.slice(0, 4).map((rec, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-2xl bg-white border border-[#CBD5E1] flex items-center justify-between hover:border-[#16865A] transition"
                      >
                        <div>
                          <p className="font-bold text-[#102B24]">{rec.lessonTitle}</p>
                          <p className="text-[11px] text-[#557267]" suppressHydrationWarning>
                            {rec.trackName} • {rec.durationMinutes}m study
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold bg-emerald-100 text-[#0B7650] px-2 py-0.5 rounded-full border border-emerald-300">
                            {rec.performanceTier}
                          </span>
                          <Link
                            href={`/lessons/${rec.lessonId}`}
                            className="text-xs font-bold text-[#16865A] hover:underline"
                          >
                            Review →
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* View Full History Button */}
              <button
                onClick={() => setShowHistoryModal(true)}
                className="w-full py-2.5 rounded-2xl bg-white hover:bg-slate-50 border border-[#CBD5E1] text-xs font-bold text-[#102B24] text-center transition shadow-2xs cursor-pointer"
              >
                View Full Lessons &amp; Badges History →
              </button>
            </div>
          </div>
        </div>

        {/* ── COMPLETED LESSONS MODAL ───────────────────────────────── */}
        {showHistoryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <div className="bg-white border border-[#CBD5E1] rounded-3xl max-w-xl w-full p-6 shadow-2xl text-[#102B24]">
              <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] mb-4">
                <h3 className="text-base font-bold text-[#102B24] flex items-center gap-2">
                  <span>📜</span>
                  <span>My Completed Lessons &amp; Badges</span>
                </h3>
                <button
                  onClick={() => setShowHistoryModal(false)}
                  className="text-slate-400 hover:text-slate-800 text-xs p-1"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                {completedLessonsList.length === 0 ? (
                  <p className="text-xs text-[#557267] text-center py-8">
                    No completed lessons yet. Explore the Learning Hub to start earning badges!
                  </p>
                ) : (
                  completedLessonsList.map((rec, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between text-xs"
                    >
                      <div>
                        <p className="font-bold text-[#102B24]">{rec.lessonTitle}</p>
                        <p className="text-[11px] text-[#557267]" suppressHydrationWarning>
                          {rec.trackName} • Completed {rec.dateEndedFormatted}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-[#0B7650] border border-emerald-300">
                          {rec.performanceTier}
                        </span>
                        <Link
                          href={`/lessons/${rec.lessonId}`}
                          className="text-[#16865A] hover:underline font-bold"
                        >
                          Review →
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── TOTAL & OWNED BADGES SHOWCASE MODAL ───────────────────── */}
        {showBadgesModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/45 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white border border-[#CBD5E1] rounded-[32px] max-w-3xl w-full p-5 sm:p-7 shadow-2xl text-[#102B24] max-h-[90vh] flex flex-col">
              
              {/* Modal Header */}
              <div className="flex items-start justify-between pb-4 border-b border-slate-100 shrink-0">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🏆</span>
                    <h3 className="text-lg sm:text-xl font-black text-[#102B24]">
                      Total &amp; Owned Engineering Badges
                    </h3>
                  </div>
                  <p className="text-xs text-[#557267] mt-0.5">
                    Track verified skill honors, systems benchmarks, and portfolio credentials earned across CampusGrow.
                  </p>
                </div>
                <button
                  onClick={() => setShowBadgesModal(false)}
                  className="h-8 w-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold transition cursor-pointer"
                  title="Close"
                >
                  ✕
                </button>
              </div>

              {/* Progress Tracker Strip */}
              <div className="my-4 p-3.5 rounded-2xl bg-[#F4FBF6] border border-[#B9E4C9] shrink-0 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-[#102B24]">
                      {badges.filter((b) => b.isOwned).length} of {badges.length} Badges Owned
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#16865A] text-white">
                      {Math.round((badges.filter((b) => b.isOwned).length / badges.length) * 100)}% Completed
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-[#557267]">
                    {badges.filter((b) => !b.isOwned).length} Locked
                  </span>
                </div>
                <div className="w-full bg-white h-2.5 rounded-full overflow-hidden border border-[#B9E4C9]">
                  <div
                    className="bg-[#16865A] h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(badges.filter((b) => b.isOwned).length / badges.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-2 pb-3 shrink-0 overflow-x-auto">
                <button
                  onClick={() => setBadgesFilter("all")}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition cursor-pointer shrink-0 ${
                    badgesFilter === "all"
                      ? "bg-[#16865A] text-white shadow-xs"
                      : "bg-[#FAFCFA] border border-[#CBD5E1] text-[#557267] hover:text-[#102B24]"
                  }`}
                >
                  All Badges ({badges.length})
                </button>
                <button
                  onClick={() => setBadgesFilter("owned")}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition cursor-pointer shrink-0 ${
                    badgesFilter === "owned"
                      ? "bg-[#16865A] text-white shadow-xs"
                      : "bg-[#FAFCFA] border border-[#CBD5E1] text-[#557267] hover:text-[#102B24]"
                  }`}
                >
                  ✓ Owned ({badges.filter((b) => b.isOwned).length})
                </button>
                <button
                  onClick={() => setBadgesFilter("locked")}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition cursor-pointer shrink-0 ${
                    badgesFilter === "locked"
                      ? "bg-[#16865A] text-white shadow-xs"
                      : "bg-[#FAFCFA] border border-[#CBD5E1] text-[#557267] hover:text-[#102B24]"
                  }`}
                >
                  🔒 Locked ({badges.filter((b) => !b.isOwned).length})
                </button>
              </div>

              {/* Scrollable Badges Grid */}
              <div className="overflow-y-auto pr-1 flex-1 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                  {badges
                    .filter((b) => {
                      if (badgesFilter === "owned") return b.isOwned;
                      if (badgesFilter === "locked") return !b.isOwned;
                      return true;
                    })
                    .map((badge) => (
                      <div
                        key={badge.id}
                        className={`rounded-2xl p-4 border transition-all flex flex-col justify-between ${
                          badge.isOwned
                            ? "bg-gradient-to-b from-white to-emerald-50/40 border-emerald-300 shadow-2xs hover:border-[#16865A]"
                            : "bg-[#FAFCFA] border-[#E2EBE5] opacity-85 hover:opacity-100"
                        }`}
                      >
                        <div>
                          {/* Top row: Icon, tier badge, status */}
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <span className="text-3xl shrink-0">{badge.icon}</span>
                            <div className="flex items-center gap-1.5">
                              <span
                                className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md ${
                                  badge.tier === "Diamond"
                                    ? "bg-cyan-100 text-cyan-800 border border-cyan-300"
                                    : badge.tier === "Platinum"
                                    ? "bg-purple-100 text-purple-800 border border-purple-300"
                                    : badge.tier === "Gold"
                                    ? "bg-amber-100 text-amber-800 border border-amber-300"
                                    : "bg-slate-100 text-slate-700 border border-slate-300"
                                }`}
                              >
                                {badge.tier}
                              </span>
                              <span
                                className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                                  badge.isOwned
                                    ? "bg-emerald-100 text-[#0B7650] border-emerald-300"
                                    : "bg-slate-100 text-slate-500 border-slate-200"
                                }`}
                              >
                                {badge.isOwned ? "✓ Owned" : "🔒 Locked"}
                              </span>
                            </div>
                          </div>

                          {/* Title & Description */}
                          <h4 className="font-extrabold text-sm text-[#102B24] leading-tight">
                            {badge.title}
                          </h4>
                          <p className="text-[11px] text-[#557267] mt-1 line-clamp-2 leading-relaxed">
                            {badge.description}
                          </p>

                          {/* Skills Pills */}
                          <div className="flex items-center gap-1 flex-wrap mt-2.5">
                            {badge.skills.map((s) => (
                              <span
                                key={s}
                                className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded bg-white border border-[#CBD5E1] text-[#557267]"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Bottom Status / Unlock info */}
                        <div className="pt-3 mt-3 border-t border-slate-100 text-[10px]">
                          {badge.isOwned ? (
                            <span className="font-semibold text-[#16865A] flex items-center gap-1">
                              <span>✓</span>
                              <span>Unlocked {badge.unlockedAt || "Verified"}</span>
                            </span>
                          ) : (
                            <div className="space-y-1.5">
                              <span className="text-[#557267] block">
                                <strong className="text-[#102B24]">Unlock:</strong> {badge.requirement}
                              </span>
                              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                                <div
                                  className="bg-amber-500 h-full rounded-full"
                                  style={{ width: `${badge.progressPercent}%` }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between shrink-0">
                <span className="text-xs text-[#557267]">
                  All badges sync directly with your recruiter profile.
                </span>
                <button
                  onClick={() => setShowBadgesModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#16865A] hover:bg-[#0B7650] text-white font-bold text-xs transition cursor-pointer shadow-xs"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}

        <UpgradeModal
          isOpen={upgradeOpen}
          onClose={() => setUpgradeOpen(false)}
          featureTitle={selectedFeatureForUpgrade}
        />
      </div>
    </AmbientBackground>
  );
}
