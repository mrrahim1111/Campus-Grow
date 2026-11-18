"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import MobileNav from "@/components/MobileNav";
import AmbientBackground from "@/components/AmbientBackground";
import {
  ROLE_MATRIX_CONFIG,
  SKILL_DEFINITIONS,
  RoleId,
  SkillKey,
  InterestRating,
  RoleDiscoveryProfile,
  RoleMatchResult,
  calculateSkillScores,
  calculateRoleMatches,
  DEFAULT_TASK_METRICS,
  RAPID_DISCOVERY_QUIZ,
  calculateRapidQuizMatches,
  STUDENT_CORE_SKILLS,
  calculateSkillGap,
} from "@/data/roleDiscoveryMatrix";
import {
  COHORT_30_STUDENTS,
  StudentAttendanceRecord,
} from "@/data/roleDiscoveryTasks";
import { createClient } from "@/lib/supabase/client";

// Initial mock students for Day 1 Build task
const INITIAL_BUILD_STUDENTS: StudentAttendanceRecord[] = [
  { id: "1", name: "Aarav Sharma", rollNo: "CS2101", status: "Present", avatarEmoji: "👨‍💻" },
  { id: "2", name: "Ananya Iyer", rollNo: "CS2102", status: "Present", avatarEmoji: "👩‍💻" },
  { id: "3", name: "Rohan Patel", rollNo: "CS2103", status: "Absent", avatarEmoji: "🧑‍💻" },
  { id: "4", name: "Pooja Hegde", rollNo: "CS2104", status: "Late", avatarEmoji: "👩‍🔬" },
  { id: "5", name: "Vikram Malhotra", rollNo: "CS2105", status: "Present", avatarEmoji: "👨‍💼" },
  { id: "6", name: "Kavya Menon", rollNo: "CS2106", status: "Absent", avatarEmoji: "👩‍🎨" },
];

type MainTab = "rapid_quiz" | "explorer" | "skill_gap" | "simulation";

export default function DiscoverRolePage() {
  const router = useRouter();

  // Active Discovery Navigation Tab
  const [activeTab, setActiveTab] = useState<MainTab>("rapid_quiz");

  // ── 1. RAPID AI ROLE FIT QUIZ STATE ───────────────────────────────────────
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [rapidQuizCompleted, setRapidQuizCompleted] = useState(false);
  const [rapidQuizResults, setRapidQuizResults] = useState<RoleMatchResult[]>([]);

  // ── 2. ROLE EXPLORER & ROADMAP HUB STATE ──────────────────────────────────
  const [selectedExplorerRole, setSelectedExplorerRole] = useState<RoleId>("aiml");

  // ── 3. SKILL GAP ANALYZER STATE ───────────────────────────────────────────
  const [targetGapRole, setTargetGapRole] = useState<RoleId>("aiml");
  const [userAcquiredSkills, setUserAcquiredSkills] = useState<string[]>([
    "c_cpp",
    "python",
    "git",
    "sql",
  ]);

  // ── 4. 3-DAY WORK SPRINT (SIMULATION) STATE ───────────────────────────────
  const [screen, setScreen] = useState<"intro" | "day1" | "day2" | "day3" | "result">("intro");
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [hintsDay1, setHintsDay1] = useState(0);
  const [hintsDay2, setHintsDay2] = useState(0);
  const [hintsDay3, setHintsDay3] = useState(0);
  const [showHintModal, setShowHintModal] = useState<string | null>(null);

  const [taskMetrics, setTaskMetrics] = useState(DEFAULT_TASK_METRICS);
  const [profileResult, setProfileResult] = useState<RoleDiscoveryProfile | null>(null);
  const [selectedRoleForDetail, setSelectedRoleForDetail] = useState<RoleId>("aiml");

  // Day 1 Build State
  const [buildStudents, setBuildStudents] = useState<StudentAttendanceRecord[]>(INITIAL_BUILD_STUDENTS);
  const [calcFormula, setCalcFormula] = useState<"correct" | "inverse" | "fixed">("correct");
  const [thresholdRule, setThresholdRule] = useState<"lt75" | "lte50" | "always">("lt75");
  const [buildFilter, setBuildFilter] = useState<"All" | "Present" | "Absent" | "Late">("All");
  const [day1Validated, setDay1Validated] = useState(false);
  const [day1Reflection, setDay1Reflection] = useState<number>(4);

  // Day 2 Analyze State
  const [datasetSearch, setDatasetSearch] = useState("");
  const [datasetFilter, setDatasetFilter] = useState<"all" | "at_risk" | "friday_drop" | "critical">("all");
  const [d2Question1, setD2Question1] = useState<number | null>(null);
  const [d2Question2, setD2Question2] = useState<string | null>(null);
  const [d2Question3, setD2Question3] = useState<string | null>(null);
  const [day2Validated, setDay2Validated] = useState(false);
  const [day2Reflection, setDay2Reflection] = useState<number>(4);

  // Day 3 Solve State
  const [d3ActiveStation, setD3ActiveStation] = useState<"debug" | "security" | "system">("debug");
  const [d3DebugPatch, setD3DebugPatch] = useState<"patch_a" | "patch_b" | null>(null);
  const [d3DebugSuccess, setD3DebugSuccess] = useState(false);
  const [d3SecurityDetected, setD3SecurityDetected] = useState<string | null>(null);
  const [d3SecurityRules, setD3SecurityRules] = useState<{ preparedStmt: boolean; rateLimit: boolean; ipQuarantine: boolean }>({
    preparedStmt: false,
    rateLimit: false,
    ipQuarantine: false,
  });
  const [d3SecuritySuccess, setD3SecuritySuccess] = useState(false);
  const [d3SystemOrdered, setD3SystemOrdered] = useState<string[]>([
    "Cloudflare Edge CDN",
    "API Gateway & Rate Limiter",
    "Redis Session Cache",
    "Worker Microservices",
    "Read-Replica DB Cluster",
  ]);
  const [d3CircuitBreakerActive, setD3CircuitBreakerActive] = useState(true);
  const [d3SystemSimulationPassed, setD3SystemSimulationPassed] = useState(false);
  const [day3Reflection, setDay3Reflection] = useState<number>(4);
  const [interestRatings, setInterestRatings] = useState<Partial<Record<RoleId, InterestRating>>>({});

  // Timer Effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerActive) {
      interval = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive]);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("campusgrow_role_discovery");
      if (saved) {
        const parsed: RoleDiscoveryProfile = JSON.parse(saved);
        setProfileResult(parsed);
        if (parsed.interestRatings) setInterestRatings(parsed.interestRatings);
        if (parsed.taskMetrics) setTaskMetrics(parsed.taskMetrics);
      }

      const savedQuiz = localStorage.getItem("campusgrow_rapid_quiz_results");
      if (savedQuiz) {
        const parsedQuiz = JSON.parse(savedQuiz);
        if (Array.isArray(parsedQuiz) && parsedQuiz.length > 0) {
          setRapidQuizResults(parsedQuiz);
          setRapidQuizCompleted(true);
        }
      }
    } catch (e) {
      console.warn("Storage sync failed:", e);
    }
  }, []);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // ── RAPID QUIZ HANDLERS ───────────────────────────────────────────────────
  const handleSelectQuizOption = (questionId: number, optionIdx: number) => {
    const nextAnswers = { ...quizAnswers, [questionId]: optionIdx };
    setQuizAnswers(nextAnswers);

    if (currentQuizIdx < RAPID_DISCOVERY_QUIZ.length - 1) {
      setCurrentQuizIdx((prev) => prev + 1);
    } else {
      // Calculate final results
      const results = calculateRapidQuizMatches(nextAnswers);
      setRapidQuizResults(results);
      setRapidQuizCompleted(true);
      try {
        localStorage.setItem("campusgrow_rapid_quiz_results", JSON.stringify(results));
      } catch {
        // Ignore
      }
    }
  };

  const handleRetakeQuiz = () => {
    setQuizAnswers({});
    setCurrentQuizIdx(0);
    setRapidQuizCompleted(false);
  };

  // ── SKILL GAP HANDLERS ───────────────────────────────────────────────────
  const toggleAcquiredSkill = (skillId: string) => {
    setUserAcquiredSkills((prev) =>
      prev.includes(skillId) ? prev.filter((s) => s !== skillId) : [...prev, skillId]
    );
  };

  const currentSkillGap = calculateSkillGap(targetGapRole, userAcquiredSkills);

  // ── SIMULATION HANDLERS ──────────────────────────────────────────────────
  const toggleStudentStatus = (id: string) => {
    setBuildStudents((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        const nextStatus: StudentAttendanceRecord["status"] =
          s.status === "Present" ? "Absent" : s.status === "Absent" ? "Late" : "Present";
        return { ...s, status: nextStatus };
      })
    );
  };

  const totalBuildStudents = buildStudents.length;
  const presentCount = buildStudents.filter((s) => s.status === "Present").length;
  const absentCount = buildStudents.filter((s) => s.status === "Absent").length;
  const lateCount = buildStudents.filter((s) => s.status === "Late").length;

  let computedAttendancePct = 0;
  if (calcFormula === "correct") {
    computedAttendancePct = Math.round((presentCount / (totalBuildStudents || 1)) * 100);
  } else if (calcFormula === "inverse") {
    computedAttendancePct = Math.round((absentCount / (totalBuildStudents || 1)) * 100);
  } else {
    computedAttendancePct = 100;
  }

  const isThresholdAlertActive =
    thresholdRule === "lt75"
      ? computedAttendancePct < 75
      : thresholdRule === "lte50"
      ? computedAttendancePct <= 50
      : true;

  const filteredBuildStudents = buildStudents.filter((s) => {
    if (buildFilter === "All") return true;
    return s.status === buildFilter;
  });

  const handleValidateDay1 = () => {
    const accuracy = calcFormula === "correct" && thresholdRule === "lt75" ? 95 : 75;
    setDay1Validated(true);
    setTaskMetrics((prev) => ({
      ...prev,
      day1: {
        day: 1,
        completed: true,
        accuracy,
        timeTakenSeconds: secondsElapsed,
        hintsUsed: hintsDay1,
        attempts: prev.day1.attempts + 1,
        problemSolvingScore: 90,
        taskQuality: 94,
        userReflectionEnjoyment: day1Reflection,
      },
    }));
  };

  const handleFinishDay1 = () => {
    setScreen("day2");
    setSecondsElapsed(0);
    setDay1Validated(false);
  };

  const filteredCohortStudents = COHORT_30_STUDENTS.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(datasetSearch.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(datasetSearch.toLowerCase());
    if (!matchesSearch) return false;
    if (datasetFilter === "at_risk") return s.attendanceRate < 75;
    if (datasetFilter === "friday_drop") return s.fridayAttendanceRate < 50;
    if (datasetFilter === "critical") return s.attendanceRate < 65;
    return true;
  });

  const handleValidateDay2 = () => {
    let correctCount = 0;
    if (d2Question1 === 8) correctCount++;
    if (d2Question2 === "friday_labs") correctCount++;
    if (d2Question3 === "friday_alert") correctCount++;

    const accuracy = Math.round((correctCount / 3) * 100);
    setDay2Validated(true);
    setTaskMetrics((prev) => ({
      ...prev,
      day2: {
        day: 2,
        completed: true,
        accuracy: Math.max(70, accuracy),
        timeTakenSeconds: secondsElapsed,
        hintsUsed: hintsDay2,
        attempts: prev.day2.attempts + 1,
        problemSolvingScore: correctCount === 3 ? 95 : 85,
        taskQuality: 92,
        userReflectionEnjoyment: day2Reflection,
      },
    }));
  };

  const handleFinishDay2 = () => {
    setScreen("day3");
    setSecondsElapsed(0);
    setDay2Validated(false);
  };

  const handleRunDebugPatch = () => {
    if (d3DebugPatch === "patch_a") {
      setD3DebugSuccess(true);
    } else {
      setD3DebugSuccess(false);
    }
  };

  const handleDeploySecurity = () => {
    if (
      d3SecurityDetected === "sqli_bruteforce" &&
      d3SecurityRules.preparedStmt &&
      d3SecurityRules.rateLimit
    ) {
      setD3SecuritySuccess(true);
    }
  };

  const handleRunSystemSimulation = () => {
    if (d3CircuitBreakerActive) {
      setD3SystemSimulationPassed(true);
    }
  };

  const handleCompleteDiscovery = () => {
    setTimerActive(false);

    const d3CompletedMetrics = {
      ...taskMetrics,
      day3: {
        day: 3,
        completed: true,
        accuracy: d3DebugSuccess && d3SecuritySuccess && d3SystemSimulationPassed ? 96 : 84,
        timeTakenSeconds: secondsElapsed,
        hintsUsed: hintsDay3,
        attempts: 1,
        problemSolvingScore: 92,
        taskQuality: 94,
        userReflectionEnjoyment: day3Reflection,
      },
    };

    setTaskMetrics(d3CompletedMetrics);

    const skills = calculateSkillScores(d3CompletedMetrics);
    const matches = calculateRoleMatches(skills, interestRatings);

    const profileData: RoleDiscoveryProfile = {
      completedAt: new Date().toISOString(),
      currentDay: 4,
      completedDays: [1, 2, 3],
      taskMetrics: d3CompletedMetrics,
      skillScores: skills,
      roleMatches: matches,
      topMatch: matches[0],
      secondMatch: matches[1],
      thirdMatch: matches[2],
      interestRatings,
    };

    setProfileResult(profileData);
    setSelectedRoleForDetail(matches[0].roleId);
    setScreen("result");

    try {
      localStorage.setItem("campusgrow_role_discovery", JSON.stringify(profileData));
    } catch {
      // Ignore
    }
  };

  return (
    <AmbientBackground intensity="career">
      <div className="flex-1 min-h-screen bg-transparent text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-white/80 dark:bg-[#101B2D]/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/10 px-4 sm:px-8 py-3.5 shrink-0 transition-colors">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white font-bold text-xl shadow-sm">
              🎯
            </span>
            <div>
              <h1 className="text-lg font-black text-slate-950 dark:text-white flex items-center gap-2">
                Discover Your Engineering Role
                <span className="text-[10px] font-black uppercase text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-md">
                  AI Career Engine
                </span>
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Find your calling across AI/ML, Full-Stack, Cloud/DevOps, Security, and Core Systems
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/learning-hub"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 transition cursor-pointer"
            >
              <span>←</span>
              <span>Learning Hub</span>
            </Link>
            <MobileNav breakpoint="lg" />
          </div>
        </div>
      </header>

      {/* Main Navigation Tabs */}
      <nav className="bg-white/80 dark:bg-[#101B2D]/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/10 px-4 sm:px-8 py-2.5 shrink-0 sticky top-0 z-20 transition-colors">
        <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <button
              onClick={() => setActiveTab("rapid_quiz")}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                activeTab === "rapid_quiz"
                  ? "bg-gradient-to-r from-[#13C995] to-[#55C8FF] text-slate-950 shadow-md shadow-emerald-500/20"
                  : "bg-slate-100 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10"
              }`}
            >
              <span>⚡</span>
              <span>2-Min Rapid AI Quiz</span>
            </button>

            <button
              onClick={() => setActiveTab("explorer")}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                activeTab === "explorer"
                  ? "bg-gradient-to-r from-[#13C995] to-[#55C8FF] text-slate-950 shadow-md shadow-emerald-500/20"
                  : "bg-slate-100 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10"
              }`}
            >
              <span>🗺️</span>
              <span>6 Roles &amp; Roadmaps</span>
            </button>

            <button
              onClick={() => setActiveTab("skill_gap")}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                activeTab === "skill_gap"
                  ? "bg-gradient-to-r from-[#13C995] to-[#55C8FF] text-slate-950 shadow-md shadow-emerald-500/20"
                  : "bg-slate-100 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10"
              }`}
            >
              <span>📊</span>
              <span>Skill Gap &amp; 30-Day Plan</span>
            </button>

            <button
              onClick={() => setActiveTab("simulation")}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                activeTab === "simulation"
                  ? "bg-gradient-to-r from-[#13C995] to-[#55C8FF] text-slate-950 shadow-md shadow-emerald-500/20"
                  : "bg-slate-100 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10"
              }`}
            >
              <span>🛠️</span>
              <span>3-Day Hands-on Simulation</span>
            </button>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs text-slate-500 font-semibold">
            <span>Average Fresher CTC: </span>
            <span className="text-emerald-700 font-bold">₹8 – ₹24 LPA</span>
          </div>
        </div>
      </nav>

      {/* ── TAB 1: 2-MINUTE RAPID AI ROLE FIT QUIZ ─────────────────────────── */}
      {activeTab === "rapid_quiz" && (
        <section className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8">
          {!rapidQuizCompleted ? (
            <div className="rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-[#101B2D]/85 backdrop-blur-xl p-6 sm:p-10 shadow-sm transition-colors">
              {/* Progress */}
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 mb-3">
                <span className="uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-black">
                  Question {currentQuizIdx + 1} of {RAPID_DISCOVERY_QUIZ.length}
                </span>
                <span>{Math.round(((currentQuizIdx + 1) / RAPID_DISCOVERY_QUIZ.length) * 100)}% Completed</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden mb-8">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#13C995] to-[#55C8FF] transition-all duration-300"
                  style={{ width: `${((currentQuizIdx + 1) / RAPID_DISCOVERY_QUIZ.length) * 100}%` }}
                />
              </div>

              {/* Question */}
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
                {RAPID_DISCOVERY_QUIZ[currentQuizIdx].question}
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-normal">
                {RAPID_DISCOVERY_QUIZ[currentQuizIdx].subtitle}
              </p>

              {/* Options */}
              <div className="mt-6 space-y-3">
                {RAPID_DISCOVERY_QUIZ[currentQuizIdx].options.map((opt, oIdx) => (
                  <button
                    key={oIdx}
                    onClick={() => handleSelectQuizOption(RAPID_DISCOVERY_QUIZ[currentQuizIdx].id, oIdx)}
                    className="w-full text-left p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/60 dark:bg-white/[0.03] hover:border-[#13C995] dark:hover:border-[#13C995] hover:bg-emerald-50/30 dark:hover:bg-emerald-950/20 transition flex items-start gap-3.5 group cursor-pointer active:scale-[0.99] shadow-2xs"
                  >
                    <span className="text-2xl shrink-0 mt-0.5">{opt.icon}</span>
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-950 dark:group-hover:text-emerald-300 leading-relaxed">
                      {opt.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Results Hero */}
              <div className="rounded-3xl bg-gradient-to-br from-[#10192b] via-[#151d33] to-[#1c1836] border-2 border-purple-500/30 p-7 sm:p-9 text-white shadow-xl relative overflow-hidden">
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-400/40 px-3.5 py-1 text-xs font-black uppercase text-emerald-300 mb-3">
                  <span>🎯</span> Rapid AI Fit Analysis Complete
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
                      Your Top Calling: {rapidQuizResults[0]?.role.title} {rapidQuizResults[0]?.role.icon}
                    </h2>
                    <p className="mt-2 text-sm text-slate-300 max-w-xl leading-relaxed">
                      {rapidQuizResults[0]?.role.tagline}
                    </p>
                  </div>

                  <div className="shrink-0 text-center sm:text-right bg-white/10 rounded-2xl p-4 border border-white/10 backdrop-blur-md">
                    <span className="text-3xl sm:text-4xl font-black text-emerald-400">
                      {rapidQuizResults[0]?.matchScore}%
                    </span>
                    <p className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mt-0.5">
                      Compatibility
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs text-slate-300">
                    <strong className="text-white">Recommendation: </strong>
                    {rapidQuizResults[0]?.compositeRecommendation}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedExplorerRole(rapidQuizResults[0].roleId);
                        setActiveTab("explorer");
                      }}
                      className="px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-black text-xs shadow-md transition cursor-pointer"
                    >
                      View 4-Year Roadmap →
                    </button>
                    <button
                      onClick={handleRetakeQuiz}
                      className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 font-bold text-xs transition cursor-pointer"
                    >
                      🔄 Retake
                    </button>
                  </div>
                </div>
              </div>

              {/* All Role Rankings */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                <h3 className="text-lg font-black text-slate-950 mb-1">
                  Full Role Compatibility Ranking
                </h3>
                <p className="text-xs text-slate-500 font-medium mb-6">
                  How your responses compare across all 6 high-demand engineering careers:
                </p>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {rapidQuizResults.map((result, idx) => (
                    <div
                      key={result.roleId}
                      onClick={() => {
                        setSelectedExplorerRole(result.roleId);
                        setActiveTab("explorer");
                      }}
                      className={`p-4 rounded-2xl border-2 transition cursor-pointer flex flex-col justify-between ${
                        idx === 0
                          ? "border-emerald-500 bg-emerald-50/30"
                          : "border-slate-200 bg-slate-50/50 hover:border-purple-400"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-2xl">{result.role.icon}</span>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[11px] font-black ${
                              idx === 0
                                ? "bg-emerald-500 text-black"
                                : "bg-slate-200 text-slate-800"
                            }`}
                          >
                            {result.matchScore}% Match
                          </span>
                        </div>
                        <h4 className="text-sm font-black text-slate-950">{result.role.title}</h4>
                        <p className="mt-1 text-xs text-slate-500 line-clamp-2">{result.role.tagline}</p>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-slate-200/80 flex items-center justify-between text-[11px] font-bold text-purple-700">
                        <span>Salary: {result.role.salaryFresher}</span>
                        <span>Roadmap →</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {/* ── TAB 2: 6 ROLES & CAREER ROADMAPS (EXPLORER HUB) ────────────────── */}
      {activeTab === "explorer" && (
        <section className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
          {/* Role Navigation Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin mb-6">
            {(Object.keys(ROLE_MATRIX_CONFIG) as RoleId[]).map((rId) => {
              const r = ROLE_MATRIX_CONFIG[rId];
              const isSelected = selectedExplorerRole === rId;
              return (
                <button
                  key={rId}
                  onClick={() => setSelectedExplorerRole(rId)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-xs font-black transition cursor-pointer whitespace-nowrap active:scale-95 ${
                    isSelected
                      ? "border-purple-600 bg-purple-600 text-white shadow-md shadow-purple-500/20"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100 hover:border-slate-300"
                  }`}
                >
                  <span className="text-base">{r.icon}</span>
                  <span>{r.title}</span>
                </button>
              );
            })}
          </div>

          {/* Selected Role Deep-Dive Card */}
          {(() => {
            const role = ROLE_MATRIX_CONFIG[selectedExplorerRole];
            return (
              <div className="space-y-6">
                {/* Hero Header */}
                <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200/80">
                    <div className="flex items-start gap-4">
                      <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-purple-100 text-3xl border border-purple-200 shadow-xs">
                        {role.icon}
                      </span>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="rounded-full bg-purple-100 text-purple-800 border border-purple-200 px-3 py-0.5 text-xs font-black uppercase">
                            {role.category}
                          </span>
                          <span className="rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-0.5 text-xs font-bold">
                            {role.demandStatus}
                          </span>
                        </div>
                        <h2 className="mt-2 text-2xl sm:text-3xl font-black text-slate-950">
                          {role.title}
                        </h2>
                        <p className="mt-1 text-sm text-slate-600 font-normal max-w-2xl">
                          {role.description}
                        </p>
                      </div>
                    </div>

                    {/* Salary Tiers Box */}
                    <div className="rounded-2xl bg-slate-950 p-4 text-white shrink-0 sm:min-w-[260px] shadow-sm">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                        💰 India CTC Benchmarks
                      </span>
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                        <span className="text-xs text-slate-300">Fresher / Campus:</span>
                        <span className="text-sm font-black text-emerald-400">{role.salaryFresher}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-300">Senior (3-5 Yrs):</span>
                        <span className="text-sm font-black text-purple-300">{role.salarySenior}</span>
                      </div>
                    </div>
                  </div>

                  {/* Tech Stack Grid */}
                  <div className="mt-6">
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3">
                      🛠️ Core Tech Stack to Master:
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                      {role.techStack.map((group, gIdx) => (
                        <div key={gIdx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                          <h4 className="text-xs font-bold text-slate-800 mb-2">{group.category}</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {group.skills.map((skill) => (
                              <span
                                key={skill}
                                className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] font-semibold text-slate-700"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 4-Year College Term Roadmap */}
                <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200/80 mb-6">
                    <div>
                      <h3 className="text-xl font-black text-slate-950">
                        🎓 4-Year College Term Roadmap
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        What you must build in each year of engineering to guarantee placement in this role:
                      </p>
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                      Step-by-Step Blueprint
                    </span>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {role.collegeRoadmap.map((stage, sIdx) => (
                      <Link
                        key={sIdx}
                        href={stage.lessonRoute}
                        className="rounded-2xl border-2 border-slate-200/90 bg-white hover:border-purple-500 hover:shadow-md p-5 flex flex-col justify-between transition cursor-pointer group no-underline"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="px-2.5 py-0.5 rounded-full bg-purple-600 text-white text-[10px] font-black uppercase">
                              {stage.year}
                            </span>
                            <span className="text-slate-400 font-mono text-xs font-bold">0{sIdx + 1}</span>
                          </div>
                          <h4 className="text-sm font-black text-slate-950 mt-1 group-hover:text-purple-700 transition">
                            {stage.title}
                          </h4>
                          <p className="mt-1.5 text-xs text-slate-600 leading-relaxed font-normal">
                            {stage.desc}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-[11px] font-bold text-slate-500 truncate max-w-[140px]" title={stage.lessonTitle}>
                            {stage.lessonTitle}
                          </span>
                          <span className="text-xs font-bold text-purple-600 group-hover:text-purple-700 transition flex items-center gap-1 shrink-0">
                            <span>Open Lesson</span>
                            <span>→</span>
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Standout Projects & Certifications */}
                <div className="grid gap-6 lg:grid-cols-3">
                  {/* Standout Projects (2 Columns) */}
                  <div className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                    <h3 className="text-lg font-black text-slate-950 mb-1">
                      📂 Top 3 Standout Portfolio Projects
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mb-4">
                      Build these projects to bypass generic resume screens and impress hiring managers:
                    </p>

                    <div className="space-y-3">
                      {role.standoutProjects.map((proj, pIdx) => (
                        <div key={pIdx} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-sm font-bold text-slate-950">{proj.title}</h4>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-bold">
                              {proj.tech}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed">{proj.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Industry Certifications (1 Column) */}
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-black text-slate-950 mb-1">
                        🏆 Top Certifications
                      </h3>
                      <p className="text-xs text-slate-500 font-medium mb-4">
                        Recognized globally by recruiters:
                      </p>

                      <div className="space-y-2.5">
                        {role.certifications.map((cert, cIdx) => (
                          <div
                            key={cIdx}
                            className="p-3 rounded-xl bg-purple-50/60 border border-purple-200 text-xs font-bold text-purple-950 flex items-center gap-2"
                          >
                            <span>🎖️</span>
                            <span>{cert}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100">
                      <h4 className="text-xs font-bold text-slate-800 mb-2">Relevant CampusGrow Modules:</h4>
                      <div className="space-y-1.5">
                        {role.campusgrowLessons.map((lesson) => (
                          <Link
                            key={lesson.id}
                            href={lesson.route}
                            className="flex items-center justify-between p-2 rounded-lg bg-slate-50 hover:bg-emerald-50 border border-slate-200 text-xs font-semibold text-slate-700 hover:text-emerald-800 transition"
                          >
                            <span className="truncate">{lesson.title}</span>
                            <span className="text-emerald-600 font-bold">Start →</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </section>
      )}

      {/* ── TAB 3: SKILL GAP ANALYZER & 30-DAY PLAN ────────────────────────── */}
      {activeTab === "skill_gap" && (
        <section className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-purple-700">
                  📊 Personalized Assessment
                </span>
                <h2 className="text-2xl font-black text-slate-950 mt-1">
                  Skill Gap Analyzer &amp; 30-Day Sprint Plan
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Check off skills you currently have to compute your job-readiness index and generate a customized recovery sprint.
                </p>
              </div>

              {/* Target Role Selector */}
              <div className="shrink-0">
                <label className="text-xs font-bold text-slate-700 block mb-1">Target Dream Role:</label>
                <select
                  value={targetGapRole}
                  onChange={(e) => setTargetGapRole(e.target.value as RoleId)}
                  className="rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-2xs"
                >
                  {(Object.keys(ROLE_MATRIX_CONFIG) as RoleId[]).map((rId) => (
                    <option key={rId} value={rId}>
                      {ROLE_MATRIX_CONFIG[rId].icon} {ROLE_MATRIX_CONFIG[rId].title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Readiness Index Banner */}
            <div className="mt-6 rounded-2xl bg-gradient-to-r from-purple-900 to-indigo-900 p-5 sm:p-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-purple-200 uppercase tracking-wider">
                  Readiness Index for {ROLE_MATRIX_CONFIG[targetGapRole].title}
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl sm:text-4xl font-black text-emerald-400">
                    {currentSkillGap.readinessPercentage}%
                  </span>
                  <span className="text-xs text-slate-300">
                    ({currentSkillGap.matchedSkills.length} of {currentSkillGap.matchedSkills.length + currentSkillGap.missingSkills.length} Core Requirements Met)
                  </span>
                </div>
              </div>

              <div className="w-full sm:w-60">
                <div className="h-3 rounded-full bg-white/20 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-300 transition-all duration-500"
                    style={{ width: `${currentSkillGap.readinessPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Checklist of Skills */}
            <div className="mt-8">
              <h3 className="text-sm font-black text-slate-950 uppercase tracking-wider mb-3">
                Select Your Acquired Skills:
              </h3>
              <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
                {STUDENT_CORE_SKILLS.map((skill) => {
                  const isChecked = userAcquiredSkills.includes(skill.id);
                  return (
                    <button
                      key={skill.id}
                      onClick={() => toggleAcquiredSkill(skill.id)}
                      className={`p-3 rounded-xl border text-left transition flex items-center justify-between gap-2 cursor-pointer ${
                        isChecked
                          ? "border-emerald-500 bg-emerald-50/70 text-emerald-950 font-bold"
                          : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <span className="flex items-center gap-2 text-xs truncate">
                        <span>{skill.icon}</span>
                        <span className="truncate">{skill.name}</span>
                      </span>
                      <span className="text-xs font-black">{isChecked ? "✓" : "+"}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Gap Analysis Summary & 30-Day Plan */}
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {/* Matched vs Missing */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3">
                  Skill Inventory Breakdown:
                </h4>
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold text-emerald-700 block mb-1.5">
                      ✓ Skills You Already Have ({currentSkillGap.matchedSkills.length})
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {currentSkillGap.matchedSkills.length > 0 ? (
                        currentSkillGap.matchedSkills.map((s) => (
                          <span
                            key={s.id}
                            className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-200"
                          >
                            {s.icon} {s.name}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-slate-400">None checked yet.</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-amber-700 block mb-1.5">
                      ⚠️ Priority Skills to Learn ({currentSkillGap.missingSkills.length})
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {currentSkillGap.missingSkills.length > 0 ? (
                        currentSkillGap.missingSkills.map((s) => (
                          <span
                            key={s.id}
                            className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200"
                          >
                            {s.icon} {s.name}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-emerald-700 font-bold">
                          🎉 Outstanding! You have satisfied all core requirements for this role!
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 30-Day Recovery Sprint */}
              <div className="p-5 rounded-2xl bg-purple-50/50 border border-purple-200">
                <h4 className="text-xs font-black uppercase tracking-wider text-purple-900 mb-3">
                  🚀 Your Tailored 30-Day Sprint Plan:
                </h4>
                <div className="space-y-2.5">
                  {currentSkillGap.actionPlanDays.map((stage, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-white border border-purple-200 text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-purple-900">{stage.dayRange}: {stage.title}</span>
                        <Link href={stage.lessonLink} className="text-purple-600 hover:underline font-bold text-[11px]">
                          Study Track →
                        </Link>
                      </div>
                      <p className="text-slate-600 text-[11px] leading-relaxed">{stage.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── TAB 4: 3-DAY WORK SPRINT (SIMULATION) ───────────────────────────── */}
      {activeTab === "simulation" && (
        <section className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8">
          {screen === "intro" && (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm text-center max-w-3xl mx-auto">
              <span className="text-5xl block mb-4">🛠️</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                Hands-On Engineering Simulation
              </h2>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed max-w-xl mx-auto">
                Step into a real college software project. Complete 3 consecutive engineering tasks to prove your problem-solving abilities:
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3 text-left">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-black text-emerald-700 uppercase">Day 1 • Build</span>
                  <h4 className="text-sm font-bold text-slate-900 mt-1">Attendance Tracker</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Wire up formulas, thresholds, and filters.</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-black text-blue-700 uppercase">Day 2 • Analyze</span>
                  <h4 className="text-sm font-bold text-slate-900 mt-1">Cohort Analytics</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Detect drop-offs and data anomalies.</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-black text-purple-700 uppercase">Day 3 • Solve</span>
                  <h4 className="text-sm font-bold text-slate-900 mt-1">System &amp; Security</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Patch SQLi attacks and handle 10k req/s.</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setScreen("day1");
                  setTimerActive(true);
                  setSecondsElapsed(0);
                }}
                className="mt-8 rounded-2xl bg-purple-600 hover:bg-purple-500 px-8 py-3.5 text-sm font-black text-white shadow-md transition active:scale-95 cursor-pointer"
              >
                Start Day 1 Build Task →
              </button>
            </div>
          )}

          {/* Day 1: Build Screen */}
          {screen === "day1" && (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-700">
                    Day 1 of 3: Build Task
                  </span>
                  <h3 className="text-xl font-black text-slate-950 mt-0.5">
                    Wire Up the College Attendance System
                  </h3>
                </div>
                <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                  ⏱️ {formatTimer(secondsElapsed)}
                </span>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div>
                  <h4 className="text-xs font-bold uppercase text-slate-700 mb-2">Student Attendance List:</h4>
                  <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                    {filteredBuildStudents.map((s) => (
                      <div
                        key={s.id}
                        onClick={() => toggleStudentStatus(s.id)}
                        className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition"
                      >
                        <span className="text-xs font-bold text-slate-900">{s.avatarEmoji} {s.name} ({s.rollNo})</span>
                        <span
                          className={`text-xs font-black px-2.5 py-0.5 rounded-full ${
                            s.status === "Present"
                              ? "bg-emerald-100 text-emerald-800"
                              : s.status === "Absent"
                              ? "bg-rose-100 text-rose-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {s.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <h4 className="text-xs font-bold uppercase text-slate-700 mb-2">Select Formula Calculation:</h4>
                    <select
                      value={calcFormula}
                      onChange={(e) => setCalcFormula(e.target.value as "correct" | "inverse" | "fixed")}
                      className="w-full rounded-xl border border-slate-300 p-2 text-xs font-bold bg-white"
                    >
                      <option value="correct">Present Students / Total Students * 100 (Standard)</option>
                      <option value="inverse">Absent Students / Total Students * 100 (Flawed)</option>
                      <option value="fixed">Fixed 100% (Hardcoded)</option>
                    </select>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <h4 className="text-xs font-bold uppercase text-slate-700 mb-2">At-Risk Alert Rule:</h4>
                    <select
                      value={thresholdRule}
                      onChange={(e) => setThresholdRule(e.target.value as "lt75" | "lte50" | "always")}
                      className="w-full rounded-xl border border-slate-300 p-2 text-xs font-bold bg-white"
                    >
                      <option value="lt75">Trigger Alert when Attendance &lt; 75% (Standard University Rule)</option>
                      <option value="lte50">Trigger Alert when Attendance &lt;= 50%</option>
                      <option value="always">Always Trigger Alert</option>
                    </select>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 text-white flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 font-bold">Computed Metric:</span>
                      <p className="text-2xl font-black text-emerald-400">{computedAttendancePct}%</p>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400 font-bold">Status Alert:</span>
                      <p className={`text-xs font-black ${isThresholdAlertActive ? "text-amber-400" : "text-emerald-400"}`}>
                        {isThresholdAlertActive ? "⚠️ At-Risk Warning" : "✓ Normal"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={handleValidateDay1}
                  className="rounded-xl bg-purple-600 text-white hover:bg-purple-500 px-5 py-2.5 text-xs font-black transition cursor-pointer"
                >
                  Verify Build Implementation →
                </button>
                {day1Validated && (
                  <button
                    onClick={handleFinishDay1}
                    className="rounded-xl bg-emerald-500 text-black hover:bg-emerald-400 px-5 py-2.5 text-xs font-black transition cursor-pointer"
                  >
                    Proceed to Day 2 Analyze →
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Day 2: Analyze Screen */}
          {screen === "day2" && (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-blue-700">
                    Day 2 of 3: Analyze Task
                  </span>
                  <h3 className="text-xl font-black text-slate-950 mt-0.5">
                    Cohort Data Exploration &amp; Anomalies
                  </h3>
                </div>
                <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                  ⏱️ {formatTimer(secondsElapsed)}
                </span>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <input
                      type="text"
                      placeholder="Search student or roll no..."
                      value={datasetSearch}
                      onChange={(e) => setDatasetSearch(e.target.value)}
                      className="rounded-xl border border-slate-300 p-2 text-xs flex-1"
                    />
                    <select
                      value={datasetFilter}
                      onChange={(e) => setDatasetFilter(e.target.value as any)}
                      className="rounded-xl border border-slate-300 p-2 text-xs font-bold"
                    >
                      <option value="all">All (30)</option>
                      <option value="at_risk">&lt; 75% At Risk</option>
                      <option value="friday_drop">Friday Drop</option>
                    </select>
                  </div>

                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {filteredCohortStudents.map((s) => (
                      <div key={s.id} className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-800">{s.name} ({s.rollNo})</span>
                        <div className="flex gap-2">
                          <span className="text-emerald-700 font-bold">{s.attendanceRate}% Overall</span>
                          <span className="text-slate-500">{s.fridayAttendanceRate}% Fri</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      1. How many students are currently under the 75% threshold?
                    </label>
                    <div className="flex gap-2">
                      {[6, 8, 12].map((num) => (
                        <button
                          key={num}
                          onClick={() => setD2Question1(num)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold border ${
                            d2Question1 === num ? "bg-purple-600 text-white border-purple-600" : "bg-white border-slate-200"
                          }`}
                        >
                          {num} Students
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      2. What pattern is causing the largest attendance drop?
                    </label>
                    <div className="flex gap-2">
                      {[
                        { id: "friday_labs", label: "Friday Afternoon Labs" },
                        { id: "monday_morn", label: "Monday Mornings" },
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setD2Question2(item.id)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold border ${
                            d2Question2 === item.id ? "bg-purple-600 text-white border-purple-600" : "bg-white border-slate-200"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={handleValidateDay2}
                  className="rounded-xl bg-purple-600 text-white hover:bg-purple-500 px-5 py-2.5 text-xs font-black transition cursor-pointer"
                >
                  Verify Analysis Answers →
                </button>
                {day2Validated && (
                  <button
                    onClick={handleFinishDay2}
                    className="rounded-xl bg-emerald-500 text-black hover:bg-emerald-400 px-5 py-2.5 text-xs font-black transition cursor-pointer"
                  >
                    Proceed to Day 3 Solve →
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Day 3: Solve Screen */}
          {screen === "day3" && (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-rose-700">
                    Day 3 of 3: Solve Task
                  </span>
                  <h3 className="text-xl font-black text-slate-950 mt-0.5">
                    Incident Triage &amp; Resiliency
                  </h3>
                </div>
                <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                  ⏱️ {formatTimer(secondsElapsed)}
                </span>
              </div>

              {/* Station Tabs */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setD3ActiveStation("debug")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border ${
                    d3ActiveStation === "debug" ? "bg-purple-600 text-white" : "bg-slate-100 text-slate-700"
                  }`}
                >
                  1. Debug Null Crash {d3DebugSuccess && "✓"}
                </button>
                <button
                  onClick={() => setD3ActiveStation("security")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border ${
                    d3ActiveStation === "security" ? "bg-purple-600 text-white" : "bg-slate-100 text-slate-700"
                  }`}
                >
                  2. Defend SQLi Attack {d3SecuritySuccess && "✓"}
                </button>
                <button
                  onClick={() => setD3ActiveStation("system")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border ${
                    d3ActiveStation === "system" ? "bg-purple-600 text-white" : "bg-slate-100 text-slate-700"
                  }`}
                >
                  3. System Scale 10k Req/s {d3SystemSimulationPassed && "✓"}
                </button>
              </div>

              {d3ActiveStation === "debug" && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-600 font-medium">
                    The backend crashes with `NullPointerException` when querying a student who has not attended any classes yet. Choose the correct defensive patch:
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div
                      onClick={() => setD3DebugPatch("patch_a")}
                      className={`p-4 rounded-xl border-2 cursor-pointer ${
                        d3DebugPatch === "patch_a" ? "border-purple-600 bg-purple-50" : "border-slate-200 bg-slate-50"
                      }`}
                    >
                      <span className="text-xs font-bold text-slate-900 block mb-1">Patch A (Defensive Null Check)</span>
                      <pre className="text-[11px] font-mono text-emerald-800 bg-white p-2 rounded border">
                        {`if (records == null || records.isEmpty()) return 0.0;`}
                      </pre>
                    </div>

                    <div
                      onClick={() => setD3DebugPatch("patch_b")}
                      className={`p-4 rounded-xl border-2 cursor-pointer ${
                        d3DebugPatch === "patch_b" ? "border-purple-600 bg-purple-50" : "border-slate-200 bg-slate-50"
                      }`}
                    >
                      <span className="text-xs font-bold text-slate-900 block mb-1">Patch B (Ignore Exception)</span>
                      <pre className="text-[11px] font-mono text-rose-800 bg-white p-2 rounded border">
                        {`try { ... } catch (e) { return 100.0; }`}
                      </pre>
                    </div>
                  </div>

                  <button
                    onClick={handleRunDebugPatch}
                    className="mt-2 rounded-xl bg-purple-600 text-white px-4 py-2 text-xs font-bold"
                  >
                    Deploy Patch →
                  </button>
                  {d3DebugSuccess && <span className="text-xs font-bold text-emerald-600 ml-3">✓ Tests Passed!</span>}
                </div>
              )}

              {d3ActiveStation === "security" && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-600 font-medium">
                    The auth gateway is getting 140 req/sec with payload `admin' OR '1'='1`. Diagnose and deploy defense:
                  </p>
                  <button
                    onClick={() => setD3SecurityDetected("sqli_bruteforce")}
                    className={`w-full p-3 rounded-xl border text-left text-xs font-bold ${
                      d3SecurityDetected === "sqli_bruteforce" ? "border-rose-600 bg-rose-50 text-rose-950" : "border-slate-200"
                    }`}
                  >
                    SQL Injection combined with high-frequency Credential Stuffing
                  </button>

                  <div className="flex gap-4 text-xs font-bold">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={d3SecurityRules.preparedStmt}
                        onChange={(e) => setD3SecurityRules((prev) => ({ ...prev, preparedStmt: e.target.checked }))}
                      />
                      Parameterized Queries
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={d3SecurityRules.rateLimit}
                        onChange={(e) => setD3SecurityRules((prev) => ({ ...prev, rateLimit: e.target.checked }))}
                      />
                      Rate Limiter
                    </label>
                  </div>

                  <button
                    onClick={handleDeploySecurity}
                    className="rounded-xl bg-rose-600 text-white px-4 py-2 text-xs font-bold"
                  >
                    Deploy Security Shield →
                  </button>
                  {d3SecuritySuccess && <span className="text-xs font-bold text-emerald-600 ml-3">✓ Threat Neutralized!</span>}
                </div>
              )}

              {d3ActiveStation === "system" && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-600 font-medium">
                    Simulate a 10,000 req/sec exam spike. Ensure circuit breaker is active:
                  </p>
                  <label className="flex items-center gap-2 text-xs font-bold">
                    <input
                      type="checkbox"
                      checked={d3CircuitBreakerActive}
                      onChange={(e) => setD3CircuitBreakerActive(e.target.checked)}
                    />
                    Activate Circuit Breaker &amp; Redis Cache
                  </label>

                  <button
                    onClick={handleRunSystemSimulation}
                    className="rounded-xl bg-amber-500 text-black px-4 py-2 text-xs font-black"
                  >
                    Simulate Spike →
                  </button>
                  {d3SystemSimulationPassed && <span className="text-xs font-bold text-emerald-600 ml-3">✓ 100% Uptime!</span>}
                </div>
              )}

              <div className="mt-8 pt-4 border-t border-slate-100 flex justify-end">
                <button
                  disabled={!d3DebugSuccess || !d3SecuritySuccess || !d3SystemSimulationPassed}
                  onClick={handleCompleteDiscovery}
                  className="rounded-2xl bg-emerald-500 text-black px-6 py-3 text-sm font-black disabled:opacity-40 shadow-sm cursor-pointer"
                >
                  Complete 3-Day Trial &amp; View Result 🎯
                </button>
              </div>
            </div>
          )}

          {/* Result Screen */}
          {screen === "result" && profileResult && (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm text-center">
              <span className="text-4xl block mb-2">🎉</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
                Simulation Complete: Your Top Role is {profileResult.topMatch?.role?.title}
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                Based on your performance in Build, Analyze, and Solve tasks, your aptitude matched {profileResult.topMatch?.matchScore}%.
              </p>

              <button
                onClick={() => {
                  setSelectedExplorerRole(profileResult.topMatch.roleId);
                  setActiveTab("explorer");
                }}
                className="mt-6 rounded-xl bg-purple-600 text-white px-6 py-2.5 text-xs font-black"
              >
                Explore {profileResult.topMatch?.role?.title} Roadmap →
              </button>
            </div>
          )}
        </section>
      )}
    </div>
    </AmbientBackground>
  );
}
