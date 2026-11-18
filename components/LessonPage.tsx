"use client";

import { ReactNode, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CodeTerminal from "@/components/CodeTerminal";
import LessonAiResources from "@/components/LessonAiResources";
import DetailedLessonGuideView from "@/components/DetailedLessonGuideView";
import { getLessonQuiz, getLessonPractice, LessonQuizQuestion } from "@/data/lessonQuizzes";
import { recordLessonStarted, recordLessonCompleted } from "@/lib/progress";
import AmbientBackground from "@/components/AmbientBackground";

interface LegacyQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface LessonPageProps {
  lessonId: string;
  lessonNumber: number;
  title: string;
  category: string;
  description: string;
  readTime?: string;
  question?: LegacyQuestion;
  questions?: LessonQuizQuestion[];
  practiceCode?: {
    code: string;
    language: "c" | "python" | "javascript" | "sql" | "bash";
    filename?: string;
    title?: string;
    description?: string;
    expectedOutput?: string;
  };
  children: ReactNode;
}

export default function LessonPage({
  lessonId,
  lessonNumber,
  title,
  category,
  description,
  readTime = "40 min interactive sprint",
  question,
  questions: propQuestions,
  practiceCode: propPractice,
  children,
}: LessonPageProps) {
  const router = useRouter();

  // Load questions (minimum 5 questions, Q1 easy -> Q5 difficult)
  const quizList: LessonQuizQuestion[] =
    propQuestions && propQuestions.length >= 5
      ? propQuestions
      : getLessonQuiz(lessonId, title);

  // Load interactive terminal starter code
  const terminalConfig = propPractice || getLessonPractice(lessonId, title);

  const [completed, setCompleted] = useState(false);
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState<Record<number, boolean>>({});
  const [activeTab, setActiveTab] = useState<"lesson" | "terminal" | "quiz">("lesson");

  // Track start & completion status
  useEffect(() => {
    try {
      recordLessonStarted(lessonId, title, category, "Freshman Foundations");
      const completedList = JSON.parse(localStorage.getItem("completedLessons") || "[]");
      const legacyKey = `lesson_${lessonId.replace(/-/g, "_")}`;
      if (completedList.includes(lessonId) || localStorage.getItem(legacyKey) === "completed") {
        setCompleted(true);
      }
    } catch {
      /* ignore */
    }
  }, [lessonId, title, category]);

  const answeredCount = Object.keys(showResults).length;
  const correctCount = quizList.filter((q, idx) => showResults[idx] && answers[idx] === q.correctAnswer).length;
  const isMasteryPassed = answeredCount >= 4 && correctCount >= 4;

  const markComplete = () => {
    if (!isMasteryPassed && !completed) {
      alert("Comprehension Check: Please complete the 5-question quiz and achieve at least 80% (4/5 correct) before marking this lesson complete.");
      return;
    }
    setCompleted(true);
    try {
      // Calculate score and save detailed record
      const answeredTotal = Object.keys(showResults).length;
      const correctTotal = quizList.filter((q, idx) => showResults[idx] && answers[idx] === q.correctAnswer).length;
      const finalCorrect = answeredTotal > 0 ? correctTotal : quizList.length;

      recordLessonCompleted(lessonId, title, {
        correctCount: finalCorrect,
        totalQuestions: quizList.length,
        category,
        trackName: "Freshman Foundations"
      });

      const list: string[] = JSON.parse(localStorage.getItem("completedLessons") || "[]");
      if (!list.includes(lessonId)) {
        list.push(lessonId);
        localStorage.setItem("completedLessons", JSON.stringify(list));
      }
      localStorage.setItem(`lesson_${lessonId.replace(/-/g, "_")}`, "completed");
    } catch (e) {
      console.error(e);
    }
  };

  const handleSelectAnswer = (qIdx: number, option: string) => {
    if (showResults[qIdx]) return; // lock once checked
    setAnswers((prev) => ({ ...prev, [qIdx]: option }));
  };

  const handleCheckAnswer = (qIdx: number) => {
    if (!answers[qIdx]) return;
    setShowResults((prev) => ({ ...prev, [qIdx]: true }));
  };

  const currentQ = quizList[activeQuestionIdx] || quizList[0];
  const optionLabels = ["A", "B", "C", "D"];
  const progress = (lessonNumber / 10) * 100;

  // Standardize duration to 35-45 minutes as requested (at least 30 min, max 50 min)
  const normalizedDuration =
    readTime.includes("min") && parseInt(readTime, 10) >= 30 && parseInt(readTime, 10) <= 50
      ? readTime
      : "40 min interactive sprint";

  return (
    <AmbientBackground intensity="lesson">
      <div className="min-h-screen bg-transparent text-slate-900 dark:text-slate-100 pb-16 font-sans">
        {/* ── Sticky Top Bar ──────────────────────────────────────────── */}
        <header className="sticky top-0 z-30 border-b border-slate-200/80 dark:border-white/10 bg-white/85 dark:bg-[#101B2D]/85 backdrop-blur-xl shadow-xs">
          <div className="w-full px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between">
              <button
                onClick={() => router.push("/learning-hub")}
                className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800 px-3.5 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition cursor-pointer"
              >
                ← Learning Hub
              </button>

              {/* Center: lesson counter & Mode Switcher */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={() => setActiveTab("lesson")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${activeTab === "lesson"
                    ? "bg-[#13C995] text-black shadow-xs font-black"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                >
                  📖 Lesson Notes
                </button>

                <button
                  onClick={() => setActiveTab("terminal")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${activeTab === "terminal"
                    ? "bg-[#13C995] text-black shadow-xs font-black"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                >
                  <span>💻</span>
                  <span className="hidden sm:inline">Code Terminal</span>
                  <span className="sm:hidden">Terminal</span>
                </button>

                <button
                  onClick={() => setActiveTab("quiz")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${activeTab === "quiz"
                    ? "bg-[#13C995] text-black shadow-xs font-black"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                >
                  <span>⚡</span>
                  <span>Quiz ({answeredCount}/5)</span>
                </button>
              </div>

              {/* Right Status & PDF button */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="rounded-xl border border-slate-300 dark:border-white/20 bg-white/80 dark:bg-slate-800 hover:bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 dark:text-slate-200 transition cursor-pointer flex items-center gap-1.5"
                  title="Download full lesson as print-ready PDF"
                >
                  <span>📥</span>
                  <span className="hidden sm:inline">Download PDF</span>
                </button>

                {completed ? (
                  <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-[#13C995]/40 px-3 py-1 text-xs font-bold text-emerald-800 dark:text-[#13C995]">
                    ✓ Mastered
                  </span>
                ) : (
                  <button
                    onClick={markComplete}
                    className="rounded-xl bg-slate-900 dark:bg-white hover:bg-black dark:hover:bg-slate-100 text-white dark:text-slate-900 px-3.5 py-1 text-xs font-bold transition cursor-pointer"
                  >
                    Mark Complete
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* ── Hero Banner ───────────────────────────────────────────── */}
        <section className="relative border-b border-slate-200/80 dark:border-white/10 bg-gradient-to-b from-slate-50 via-white to-white dark:from-[#0B1220] dark:via-[#101B2D] dark:to-[#0B1220]">
          <div className="mx-auto max-w-5xl px-6 py-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 mb-3">
              <span>Engineering Track</span>
              <span>/</span>
              <span className="text-emerald-700 dark:text-[#13C995] font-bold">{category}</span>
              <span>/</span>
              <span className="text-slate-400 dark:text-slate-500">Lesson {lessonNumber}</span>
            </div>

            {/* Badge row */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="rounded-full border border-emerald-200 dark:border-[#13C995]/40 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 text-xs font-black text-emerald-800 dark:text-[#13C995] uppercase tracking-wider">
                Lesson {lessonNumber} of 10
              </span>
              <span className="rounded-full border border-blue-200 dark:border-blue-500/40 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 text-xs font-bold text-blue-800 dark:text-blue-300">
                ⏱️ {normalizedDuration}
              </span>
              <span className="rounded-full border border-purple-200 dark:border-purple-500/40 bg-purple-50 dark:bg-purple-950/40 px-3 py-1 text-xs font-bold text-purple-800 dark:text-purple-300">
                📐 Visual Diagrams &amp; Architecture Models
              </span>
              <span className="rounded-full border border-amber-200 dark:border-amber-500/40 bg-amber-50 dark:bg-amber-950/40 px-3 py-1 text-xs font-bold text-amber-800 dark:text-amber-300">
                💻 In-Browser Compiler &amp; Terminal
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-gray-950">
              {title}
            </h1>

            <p className="mt-4 max-w-3xl text-base sm:text-lg leading-relaxed text-gray-600 font-medium">
              {description}
            </p>

            {/* ── Concept Mastery Architecture Blueprint ──────────────── */}
            <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🗺️</span>
                  <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-800">
                    Concept Architecture &amp; Implementation Blueprint
                  </h3>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  Concept Theory → Visual Diagrams → Production Code
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Concept Pillar 1 */}
                <div className="rounded-2xl p-4 border border-slate-200 bg-slate-50/60 text-left">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-black text-emerald-700 flex items-center gap-1">
                      📖 Concept Deep-Dive
                    </span>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Theory</span>
                  </div>
                  <p className="text-xs font-bold text-gray-900">Intuitive Mental Models &amp; Syntax</p>
                  <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
                    Clear real-world analogies, syntax anatomy, foundational mechanisms, and zero-fear mental models.
                  </p>
                </div>

                {/* Concept Pillar 2 */}
                <div className="rounded-2xl p-4 border border-slate-200 bg-slate-50/60 text-left">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-black text-blue-700 flex items-center gap-1">
                      📊 Architecture &amp; Flow
                    </span>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Diagrams</span>
                  </div>
                  <p className="text-xs font-bold text-gray-900">Internal Execution &amp; Memory</p>
                  <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
                    Stack vs heap memory layouts, execution pipelines, data flow diagrams, and internal hardware mechanics.
                  </p>
                </div>

                {/* Concept Pillar 3 */}
                <div className="rounded-2xl p-4 border border-slate-200 bg-slate-50/60 text-left">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-black text-purple-700 flex items-center gap-1">
                      ⚡ Production &amp; Scale
                    </span>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Resilience</span>
                  </div>
                  <p className="text-xs font-bold text-gray-900">Edge Cases, Big-O &amp; Industry Traps</p>
                  <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
                    Algorithmic complexity graphs, memory boundary checks, concurrency hazards, and interview scenarios.
                  </p>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-6 max-w-md">
              <div className="flex justify-between text-xs text-gray-500 font-bold mb-1.5">
                <span>Curriculum Mastery Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-[#00A86B] transition-all duration-700"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Quick Jumper Bar ───────────────────────────────────────── */}
        <div className="mx-auto max-w-5xl px-6 pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => {
                setActiveTab("lesson");
                document.getElementById("theory-section")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="p-3.5 rounded-2xl border border-slate-200/80 dark:border-white/10 hover:border-emerald-400 dark:hover:border-[#13C995]/50 bg-white/70 dark:bg-[#101B2D]/70 backdrop-blur-md text-left transition cursor-pointer shadow-2xs"
            >
              <div className="flex items-center gap-2">
                <span>📖</span>
                <span className="text-xs font-bold text-slate-900 dark:text-white">1. Core Concepts &amp; Mental Models</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Beginner-friendly explanations &amp; step-by-step logic</p>
            </button>

            <button
              onClick={() => {
                setActiveTab("terminal");
                document.getElementById("terminal-section")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="p-3.5 rounded-2xl border border-slate-200/80 dark:border-white/10 hover:border-blue-400 dark:hover:border-[#55C8FF]/50 bg-white/70 dark:bg-[#101B2D]/70 backdrop-blur-md text-left transition cursor-pointer shadow-2xs"
            >
              <div className="flex items-center gap-2">
                <span>💻</span>
                <span className="text-xs font-bold text-slate-900 dark:text-white">2. Interactive Terminal Sandbox</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Practice coding with real compilation &amp; stdout output</p>
            </button>

            <button
              onClick={() => {
                setActiveTab("quiz");
                document.getElementById("quiz-section")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="p-3.5 rounded-2xl border border-slate-200/80 dark:border-white/10 hover:border-purple-400 dark:hover:border-purple-400/50 bg-white/70 dark:bg-[#101B2D]/70 backdrop-blur-md text-left transition cursor-pointer shadow-2xs"
            >
              <div className="flex items-center gap-2">
                <span>⚡</span>
                <span className="text-xs font-bold text-slate-900 dark:text-white">3. 5-Question Challenge</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Progression from Easy to Tricky Placement traps</p>
            </button>
          </div>
        </div>

        {/* ── Section 1: Comprehensive Lesson Content ─────────────────── */}
        <div id="theory-section" className="mx-auto max-w-5xl px-6 py-8">
          <div className="lesson-content space-y-10 text-slate-800 dark:text-slate-200">
            {children}
          </div>

          {/* ── Encyclopedic Pin-to-Pin Textbook Chapters ── */}
          <DetailedLessonGuideView
            lessonTitle={title}
            category={category}
          />

          {/* ── AI Suggested Masterclasses in 3 Languages & Full Lesson Study Pack ── */}
          <LessonAiResources
            lessonTitle={title}
            category={category}
            lessonNumber={lessonNumber}
          />
        </div>

        {/* ── Section 2: Interactive In-Browser Code Terminal ─────────── */}
        <section id="terminal-section" className="mx-auto max-w-5xl px-6 py-6">
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">💻</span>
              <h2 className="text-xl font-black text-gray-950 tracking-tight">
                Interactive Practice Terminal
              </h2>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Don&apos;t just read code — run it! Edit the code in your browser editor, run the compiler, and test edge cases.
            </p>
          </div>

          <CodeTerminal
            initialCode={terminalConfig.code}
            language={terminalConfig.language}
            filename={terminalConfig.filename}
            title={terminalConfig.title}
            description={terminalConfig.description}
            expectedOutput={terminalConfig.expectedOutput}
          />
        </section>

        {/* ── Section 3: 5 Progressive Quiz Questions ─────────────────── */}
        <section id="quiz-section" className="mx-auto max-w-5xl px-6 py-8">
          <div className="rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-[#101B2D]/70 backdrop-blur-xl p-6 sm:p-10 shadow-sm">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200/80 dark:border-white/10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⚡</span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
                    5-Question Knowledge Mastery Check
                  </h2>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                  Progressive difficulty: Question 1 starts Easy, leading up to Question 5 (Difficult Placement Challenge).
                </p>
              </div>

              {/* Score pill */}
              <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-4 py-2 rounded-2xl border border-slate-200 dark:border-white/10 shadow-xs self-start sm:self-auto">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Mastery Score:</span>
                <span className="text-sm font-black text-emerald-600 dark:text-[#13C995]">
                  {correctCount} / {quizList.length}
                </span>
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500">
                  ({answeredCount} answered)
                </span>
              </div>
            </div>

            {/* Stepper Navigation Pills */}
            <div className="grid grid-cols-5 gap-2 mb-8">
              {quizList.map((q, idx) => {
                const isCurrent = activeQuestionIdx === idx;
                const isChecked = showResults[idx];
                const isRight = isChecked && answers[idx] === q.correctAnswer;
                const isWrong = isChecked && answers[idx] !== q.correctAnswer;

                let pillStyle = "border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-white/20";
                if (isCurrent) pillStyle = "border-slate-900 dark:border-[#55C8FF] bg-slate-900 dark:bg-[#55C8FF] text-white dark:text-black shadow-md";
                if (isRight) pillStyle = "border-[#13C995] bg-[#13C995] text-black shadow-emerald-500/20";
                if (isWrong) pillStyle = "border-red-500 bg-red-500 text-white shadow-red-500/20";

                return (
                  <button
                    key={idx}
                    onClick={() => setActiveQuestionIdx(idx)}
                    className={`p-2 sm:p-3 rounded-2xl border text-center transition flex flex-col items-center justify-center cursor-pointer ${pillStyle}`}
                  >
                    <span className="text-xs font-black">Q{idx + 1}</span>
                    <span className="text-[10px] hidden sm:block font-bold opacity-80 uppercase tracking-tighter">
                      {q.difficulty}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Current Question Box */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-white/10 shadow-sm">
              {/* Difficulty Badge */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[11px] font-black uppercase px-3 py-1 rounded-full border ${currentQ.difficulty === "Easy"
                      ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                      : currentQ.difficulty === "Medium"
                        ? "bg-blue-50 text-blue-800 border-blue-200"
                        : currentQ.difficulty === "Hard"
                          ? "bg-amber-50 text-amber-800 border-amber-200"
                          : "bg-purple-50 text-purple-900 border-purple-300 font-extrabold"
                      }`}
                  >
                    {currentQ.difficultyBadge}
                  </span>

                  <span className="text-xs font-bold text-slate-400">
                    Question {activeQuestionIdx + 1} of {quizList.length}
                  </span>
                </div>

                {showResults[activeQuestionIdx] && (
                  <span
                    className={`text-xs font-black px-3 py-1 rounded-full ${answers[activeQuestionIdx] === currentQ.correctAnswer
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-red-100 text-red-800"
                      }`}
                  >
                    {answers[activeQuestionIdx] === currentQ.correctAnswer ? "✓ Correct" : "✗ Incorrect"}
                  </span>
                )}
              </div>

              {/* Question Title */}
              <h3 className="text-lg sm:text-xl font-black text-gray-950 leading-relaxed mb-6">
                {currentQ.question}
              </h3>

              {/* 4 Options */}
              <div className="space-y-3">
                {currentQ.options.map((option, optIdx) => {
                  const label = optionLabels[optIdx];
                  const isSelected = answers[activeQuestionIdx] === option;
                  const isChecked = showResults[activeQuestionIdx];
                  const isCorrectOpt = option === currentQ.correctAnswer;

                  let optBorder = "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50";

                  if (isChecked) {
                    if (isCorrectOpt) {
                      optBorder = "border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold";
                    } else if (isSelected && !isCorrectOpt) {
                      optBorder = "border-red-400 bg-red-50 text-red-900";
                    } else {
                      optBorder = "border-slate-100 bg-slate-50/50 opacity-40";
                    }
                  } else if (isSelected) {
                    optBorder = "border-emerald-500 bg-emerald-50/50 font-semibold";
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectAnswer(activeQuestionIdx, option)}
                      disabled={isChecked}
                      className={`w-full rounded-2xl border p-4 text-left transition-all flex items-center gap-4 cursor-pointer ${optBorder}`}
                    >
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-bold font-mono border transition ${isChecked && isCorrectOpt
                          ? "border-emerald-500 bg-emerald-500 text-white"
                          : isChecked && isSelected && !isCorrectOpt
                            ? "border-red-500 bg-red-500 text-white"
                            : isSelected
                              ? "border-emerald-500 bg-emerald-500 text-white"
                              : "border-slate-200 bg-slate-100 text-slate-700"
                          }`}
                      >
                        {label}
                      </span>
                      <span className="text-xs sm:text-sm font-medium leading-relaxed">{option}</span>
                      {isChecked && isCorrectOpt && (
                        <span className="ml-auto text-emerald-600 font-bold text-sm">✓ Correct</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Check Answer Button & Explanation */}
              {!showResults[activeQuestionIdx] ? (
                <div className="mt-6 flex items-center justify-between">
                  <button
                    onClick={() => handleCheckAnswer(activeQuestionIdx)}
                    disabled={!answers[activeQuestionIdx]}
                    className="rounded-xl bg-[#00A86B] hover:bg-[#00925d] text-white px-6 py-3 text-xs font-black shadow-md shadow-emerald-500/20 transition active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Verify Answer →
                  </button>
                  <span className="text-[11px] text-slate-400">Select an option to check</span>
                </div>
              ) : (
                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 animate-in fade-in">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm">💡</span>
                    <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                      Why This Answer Is Correct:
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-700 font-medium">
                    {currentQ.explanation}
                  </p>

                  {/* Step to Next Question */}
                  <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-bold">
                      {activeQuestionIdx < quizList.length - 1
                        ? `Up Next: Question ${activeQuestionIdx + 2} (${quizList[activeQuestionIdx + 1].difficulty})`
                        : "Quiz Completed! All 5 questions checked."}
                    </span>

                    {activeQuestionIdx < quizList.length - 1 ? (
                      <button
                        onClick={() => setActiveQuestionIdx(activeQuestionIdx + 1)}
                        className="rounded-xl bg-slate-900 hover:bg-black text-white px-4 py-2 text-xs font-black transition cursor-pointer"
                      >
                        Next Question →
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          markComplete();
                          router.push("/learning-hub");
                        }}
                        className="rounded-xl bg-[#00A86B] hover:bg-[#00925d] text-white px-5 py-2 text-xs font-black shadow-md shadow-emerald-500/20 transition cursor-pointer"
                      >
                        Finish &amp; Lock Lesson ✓
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── Completion Panel ───────────────────────────────────────── */}
        <section className="mx-auto max-w-5xl px-6 pt-4 pb-12">
          <div className="rounded-3xl border border-gray-200 bg-gray-50 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                {completed ? "Status" : "Lock In Progress"}
              </p>
              <h2 className="text-xl sm:text-2xl font-black text-gray-950">
                {completed ? "✓ Lesson Mastered & Logged" : "Done reading & practicing? Lock in your progress."}
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-gray-500">
                {completed
                  ? `Lesson ${lessonNumber} logged to your curriculum progress with verified 5-question comprehension.`
                  : "Locking progress updates your streak, engineering radar score, and unlocks the next module."}
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              {!completed ? (
                <button
                  onClick={markComplete}
                  className={`rounded-2xl px-6 py-3.5 text-xs sm:text-sm font-black transition cursor-pointer active:scale-95 ${isMasteryPassed
                    ? "bg-[#00A86B] hover:bg-[#00925d] text-white shadow-md shadow-emerald-500/20"
                    : "bg-slate-200 hover:bg-slate-300 text-slate-700"
                    }`}
                >
                  {isMasteryPassed ? "Mark as Complete ✓" : "Complete Quiz (≥80%) to Unlock"}
                </button>
              ) : (
                <button
                  onClick={() => router.push("/learning-hub")}
                  className="rounded-2xl bg-[#00A86B] hover:bg-[#00925d] px-6 py-3.5 text-xs sm:text-sm font-black text-white shadow-md shadow-emerald-500/20 transition cursor-pointer active:scale-95"
                >
                  Back to Learning Hub →
                </button>
              )}
              <button
                onClick={() => router.push(`/mentor?prompt=${encodeURIComponent(`Can you explain '${title}' in depth and give me 2 tricky test problems?`)}`)}
                className="rounded-2xl border border-gray-300 bg-white px-5 py-3.5 text-xs sm:text-sm font-bold text-gray-700 hover:bg-gray-50 transition cursor-pointer"
              >
                Ask AI Mentor
              </button>
            </div>
          </div>
        </section>
      </div>
    </AmbientBackground>
  );
}