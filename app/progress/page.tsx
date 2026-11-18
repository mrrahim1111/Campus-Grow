"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AmbientBackground from "@/components/AmbientBackground";
import {
  getDailyProgressLogs,
  getAllCompletedLessonsProgress,
  getOverallProgressStats,
  logDailyCheckIn,
  DailyProgressLog,
  LessonProgressRecord,
} from "@/lib/progress";

export default function ProgressPage() {
  const [dailyLogs, setDailyLogs] = useState<DailyProgressLog[]>([]);
  const [completedLessons, setCompletedLessons] = useState<LessonProgressRecord[]>([]);
  const [stats, setStats] = useState({
    completedCount: 3,
    totalLessons: 20,
    percentage: 15,
    avgQuizScore: 95,
    fiveStarCount: 2,
    currentStreakDays: 3,
    totalStudyMinutes: 123
  });
  const [checkedInToday, setCheckedInToday] = useState(false);
  const [filterTier, setFilterTier] = useState<"all" | "Mastery" | "Proficient">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const refreshData = () => {
    try {
      const logs = getDailyProgressLogs(14);
      setDailyLogs(logs);
      const records = getAllCompletedLessonsProgress();
      setCompletedLessons(records);
      const currentStats = getOverallProgressStats();
      setStats(currentStats);

      const todayStr = new Date().toISOString().slice(0, 10);
      const hasToday = logs.some((l) => l.date === todayStr && (l.goalMet || l.lessonsCompleted.length > 0));
      setCheckedInToday(hasToday);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleCheckIn = () => {
    logDailyCheckIn("Focused deep learning & code practice session");
    setCheckedInToday(true);
    refreshData();
  };

  // Curricular Track Competencies
  const competencyTracks = [
    { name: "C & Systems Programming", pct: 75, tag: "Year 1 Foundation" },
    { name: "Data Structures & Algorithms", pct: 55, tag: "Year 2 Core" },
    { name: "Object-Oriented Programming (OOP)", pct: 60, tag: "Year 2 Core" },
    { name: "Database Engine & Storage", pct: 40, tag: "Year 2 Systems" },
    { name: "Operating Systems & Networking", pct: 30, tag: "Year 2 Architecture" },
    { name: "AI & Machine Learning Pipelines", pct: 25, tag: "Year 3 Specialization" },
    { name: "High-Level System Design", pct: 20, tag: "Year 4 Placement" },
  ];

  // Achievement Badges
  const badges = [
    {
      id: "first-step",
      name: "First Step",
      desc: "Completed your first interactive lesson",
      icon: "🚀",
      unlocked: stats.completedCount >= 1,
    },
    {
      id: "streak-3",
      name: "Consistency Spark",
      desc: "Maintained a 3-day study streak",
      icon: "🔥",
      unlocked: stats.currentStreakDays >= 3,
    },
    {
      id: "quiz-master",
      name: "Quiz Virtuoso",
      desc: "Scored 100% Mastery in a technical assessment",
      icon: "🎯",
      unlocked: stats.fiveStarCount >= 1,
    },
    {
      id: "deep-diver",
      name: "Deep Thinker",
      desc: "Completed 5+ comprehensive computer science topics",
      icon: "🧠",
      unlocked: stats.completedCount >= 5,
    },
    {
      id: "placement-ready",
      name: "Systems Architect",
      desc: "Mastered memory models, OS scheduling & concurrency",
      icon: "⚡",
      unlocked: stats.completedCount >= 8,
    },
    {
      id: "portfolio-star",
      name: "Production Coder",
      desc: "Passed all automated tests on Milestone Builds",
      icon: "🏆",
      unlocked: stats.completedCount >= 10,
    },
  ];

  const filteredHistory = completedLessons.filter((rec) => {
    if (filterTier !== "all" && rec.performanceTier !== filterTier) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        rec.lessonTitle.toLowerCase().includes(q) ||
        rec.trackName.toLowerCase().includes(q) ||
        rec.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <AmbientBackground intensity="dashboard">
      <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-8">
        
        {/* Header Title & Daily Check-in */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 uppercase tracking-wider">
              Cognitive Analytics • For All CS Disciplines
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text-dark)] tracking-tight">
              Learning Progress & Performance
            </h1>
            <p className="text-sm text-[var(--color-text-secondary)] font-medium">
              Monitor your study cadence, retention scores, milestone achievements, and degree mastery across all 4 years.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCheckIn}
              disabled={checkedInToday}
              className={`px-5 py-2.5 text-xs sm:text-sm font-bold rounded-2xl transition-all shadow-md flex items-center gap-2 cursor-pointer ${
                checkedInToday
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-300"
                  : "btn-emerald-gradient"
              }`}
            >
              <span>{checkedInToday ? "✓ Checked In Today" : "⚡ Check In Today"}</span>
              <span className="px-1.5 py-0.5 rounded-full bg-emerald-800/40 text-[10px] text-white">
                {stats.currentStreakDays}d streak
              </span>
            </button>
          </div>
        </div>

        {/* Visual Progress Banner */}
        <div className="relative rounded-3xl overflow-hidden glass-surface-elevated border border-white/80 p-6 sm:p-8 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md">
              Placement Momentum Score
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-text-dark)]">
              Engineering Consistency Curve: High Readiness
            </h2>
            <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
              Your active streak and quiz mastery rate place you in the top 5% of learners preparing for technical assessments this placement cycle.
            </p>
          </div>
          <div className="w-full sm:w-48 h-28 rounded-2xl overflow-hidden border border-emerald-200 shrink-0 shadow-xs">
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80"
              alt="Analytics and growth"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 4 Stat Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="rounded-2xl glass-surface-elevated p-5 border border-white/80 shadow-md">
            <p className="text-xs font-semibold text-[var(--color-text-secondary)]">Curriculum Completion</p>
            <p className="text-3xl font-black text-emerald-700 mt-1">
              {stats.percentage}%
            </p>
            <p className="text-[11px] text-[var(--color-text-secondary)] mt-1">
              {stats.completedCount} of {stats.totalLessons} lessons mastered
            </p>
          </div>

          <div className="rounded-2xl glass-surface-elevated p-5 border border-white/80 shadow-md">
            <p className="text-xs font-semibold text-[var(--color-text-secondary)]">Study Streak</p>
            <p className="text-3xl font-black text-teal-700 mt-1">
              {stats.currentStreakDays} <span className="text-sm font-bold text-slate-500">Days</span>
            </p>
            <p className="text-[11px] text-[var(--color-text-secondary)] mt-1">
              Consecutive daily check-ins
            </p>
          </div>

          <div className="rounded-2xl glass-surface-elevated p-5 border border-white/80 shadow-md">
            <p className="text-xs font-semibold text-[var(--color-text-secondary)]">Quizzes Taken</p>
            <p className="text-3xl font-black text-emerald-600 mt-1">
              {completedLessons.length}
            </p>
            <p className="text-[11px] text-[var(--color-text-secondary)] mt-1">
              {stats.fiveStarCount} in Mastery tier (100%)
            </p>
          </div>

          <div className="rounded-2xl glass-surface-elevated p-5 border border-white/80 shadow-md">
            <p className="text-xs font-semibold text-[var(--color-text-secondary)]">Avg Retention Score</p>
            <p className="text-3xl font-black text-green-700 mt-1">
              {stats.avgQuizScore}%
            </p>
            <p className="text-[11px] text-[var(--color-text-secondary)] mt-1">
              Placement readiness benchmark
            </p>
          </div>
        </div>

        {/* 14-Day Activity Heatmap / Chart */}
        <div className="rounded-3xl glass-surface-elevated p-6 sm:p-8 border border-white/80 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[var(--color-text-dark)]">
                14-Day Study Consistency Activity
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)]">
                Daily check-ins, interactive lesson sprints, and milestone coding commits
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-300">
              🔥 Active Habit Tracker
            </span>
          </div>

          <div className="grid grid-cols-7 sm:grid-cols-14 gap-2 pt-4">
            {dailyLogs.map((log, idx) => (
              <div
                key={log.date || idx}
                className="p-3 rounded-xl bg-white/80 border border-slate-200/80 flex flex-col items-center justify-between gap-1 text-center"
              >
                <span className="text-[10px] font-semibold text-[var(--color-text-secondary)]">
                  {log.dayShort || `D${idx + 1}`}
                </span>
                <span className="text-xl my-1">
                  {log.goalMet ? "⚡" : log.lessonsCompleted.length > 0 ? "📘" : "💤"}
                </span>
                <span className={`text-[10px] font-bold ${log.goalMet ? "text-emerald-700" : "text-slate-400"}`}>
                  {log.goalMet ? "Done" : "Rest"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Competencies Breakdown & Achievement Badges Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Competency Mastery Bars */}
          <div className="rounded-3xl glass-surface-elevated p-6 sm:p-8 border border-white/80 shadow-lg space-y-5">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[var(--color-text-dark)]">
                Core Engineering Competencies
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)]">
                Progress calibrated across 4-year undergraduate syllabus
              </p>
            </div>

            <div className="space-y-4">
              {competencyTracks.map((c, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[var(--color-text-dark)]">{c.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-[var(--color-text-secondary)]">{c.tag}</span>
                      <span className="font-black text-emerald-700">{c.pct}%</span>
                    </div>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-700"
                      style={{ width: `${c.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievement Badges Grid */}
          <div className="rounded-3xl glass-surface-elevated p-6 sm:p-8 border border-white/80 shadow-lg space-y-5">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[var(--color-text-dark)]">
                Achievements & Engineering Badges
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)]">
                Earned through streak consistency and high-scoring evaluations
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {badges.map((b) => (
                <div
                  key={b.id}
                  className={`p-4 rounded-2xl border flex flex-col items-center text-center justify-between transition-all ${
                    b.unlocked
                      ? "bg-white border-emerald-300 shadow-md"
                      : "bg-slate-50 border-slate-200 opacity-50"
                  }`}
                >
                  <span className="text-3xl mb-1">{b.icon}</span>
                  <div>
                    <h4 className="text-xs font-bold text-[var(--color-text-dark)]">{b.name}</h4>
                    <p className="text-[10px] text-[var(--color-text-secondary)] mt-0.5 line-clamp-2">{b.desc}</p>
                  </div>
                  <span
                    className={`mt-2 text-[9px] font-bold px-2 py-0.5 rounded-full ${
                      b.unlocked
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {b.unlocked ? "UNLOCKED" : "LOCKED"}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Detailed Completed Lessons Table */}
        <div className="rounded-3xl glass-surface-elevated p-6 sm:p-8 border border-white/80 shadow-lg space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[var(--color-text-dark)]">
                Completed Lessons History
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)]">
                Permanent records of mastered lessons and quiz performance tiers
              </p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search history..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-xl bg-white border border-slate-200 text-[var(--color-text-dark)] focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <select
                value={filterTier}
                onChange={(e) => setFilterTier(e.target.value as any)}
                className="px-3 py-1.5 text-xs rounded-xl bg-white border border-slate-200 text-[var(--color-text-dark)] focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="all">All Tiers</option>
                <option value="Mastery">Mastery</option>
                <option value="Proficient">Proficient</option>
              </select>
            </div>
          </div>

          {filteredHistory.length === 0 ? (
            <div className="text-center py-10 rounded-2xl bg-white/60 border border-dashed border-slate-300">
              <p className="text-sm font-medium text-[var(--color-text-secondary)]">No completed lessons found for this filter.</p>
              <Link href="/learning-hub" className="mt-2 inline-block text-xs font-bold text-emerald-700 hover:underline">
                Explore Learning Hub to complete your first module →
              </Link>
            </div>
          ) : (
            <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
              {filteredHistory.map((rec, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-white border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <p className="font-bold text-sm text-[var(--color-text-dark)]">{rec.lessonTitle}</p>
                    <p className="text-[11px] text-[var(--color-text-secondary)]">
                      {rec.trackName} • Completed on {rec.dateEndedFormatted}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        rec.performanceTier === "Mastery"
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                          : "bg-blue-100 text-blue-800 border border-blue-300"
                      }`}
                    >
                      {rec.performanceTier} ({rec.quizScore || 100}%)
                    </span>
                    <Link
                      href={`/lessons/${rec.lessonId}`}
                      className="btn-emerald-gradient px-3 py-1.5 rounded-xl font-bold shadow text-xs"
                    >
                      Review Lesson →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </AmbientBackground>
  );
}
