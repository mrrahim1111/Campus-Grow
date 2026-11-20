"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { interviewSets, InterviewSet, InterviewQuestion } from "@/data/interviewData";
import PaywallGate from "@/components/PaywallGate";

type Screen = "home" | "session" | "review";

export default function InterviewPage() {
  const router = useRouter();

  const [screen, setScreen] = useState<Screen>("home");
  const [activeSet, setActiveSet] = useState<InterviewSet | null>(null);
  const [activeQuestions, setActiveQuestions] = useState<InterviewQuestion[]>([]);
  const [targetQuestionCount, setTargetQuestionCount] = useState<number>(15);
  const [currentQ, setCurrentQ] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [showSample, setShowSample] = useState(false);
  const [reviewIdx, setReviewIdx] = useState(0);
  const [checkedKeyPoints, setCheckedKeyPoints] = useState<Record<string, boolean>>({});
  const [copiedReport, setCopiedReport] = useState(false);

  // Timer state
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && screen === "session") {
      interval = setInterval(() => {
        setElapsedSeconds((s) => s + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, screen]);

  const difficultyColor: Record<string, string> = {
    Easy: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800/40",
    Medium: "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300 dark:border-amber-800/40",
    Hard: "bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border-purple-300 dark:border-purple-800/40",
  };

  const categoryColor: Record<string, string> = {
    Technical: "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300",
    DSA: "bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300",
    "System Design": "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300",
    "Behavioral / HR": "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300",
  };

  function startSession(set: InterviewSet, qCount: number) {
    setActiveSet(set);
    // Take exactly qCount questions (min 15, max 30)
    const count = Math.max(15, Math.min(30, qCount));
    const selected = set.questions.slice(0, count);
    setActiveQuestions(selected);
    setCurrentQ(0);
    setUserAnswers(new Array(selected.length).fill(""));
    setCurrentAnswer("");
    setShowHint(false);
    setShowSample(false);
    setCheckedKeyPoints({});
    setElapsedSeconds(0);
    setIsTimerRunning(true);
    setScreen("session");
  }

  function handleSaveCurrentAnswer() {
    const updated = [...userAnswers];
    updated[currentQ] = currentAnswer;
    setUserAnswers(updated);
  }

  function handleNext() {
    handleSaveCurrentAnswer();
    const total = activeQuestions.length;
    if (currentQ + 1 >= total) {
      setIsTimerRunning(false);
      setScreen("review");
      setReviewIdx(0);
    } else {
      const nextIdx = currentQ + 1;
      setCurrentQ(nextIdx);
      setCurrentAnswer(userAnswers[nextIdx] || "");
      setShowHint(false);
      setShowSample(false);
    }
  }

  function handlePrev() {
    handleSaveCurrentAnswer();
    if (currentQ > 0) {
      const prevIdx = currentQ - 1;
      setCurrentQ(prevIdx);
      setCurrentAnswer(userAnswers[prevIdx] || "");
      setShowHint(false);
      setShowSample(false);
    }
  }

  function handleJumpToQuestion(idx: number) {
    handleSaveCurrentAnswer();
    setCurrentQ(idx);
    setCurrentAnswer(userAnswers[idx] || "");
    setShowHint(false);
    setShowSample(false);
  }

  function toggleKeyPoint(questionId: string, pointIdx: number) {
    const key = `${questionId}_${pointIdx}`;
    setCheckedKeyPoints((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  const question = activeQuestions[currentQ];
  const totalQ = activeQuestions.length;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // Evaluation calculations
  const totalPointsPossible = activeQuestions.reduce(
    (acc, q) => acc + q.keyPoints.length,
    0
  );
  const pointsEarned = Object.values(checkedKeyPoints).filter(Boolean).length;
  const answeredCount = userAnswers.filter((a) => a.trim().length > 15).length;
  const completionPercentage = totalQ > 0 ? Math.round((answeredCount / totalQ) * 100) : 0;
  const pointsPercentage = totalPointsPossible > 0 ? Math.round((pointsEarned / totalPointsPossible) * 100) : 0;

  // Star calculation
  let stars = 1;
  let readinessTitle = "Developing Candidate";
  if (completionPercentage >= 90 && pointsPercentage >= 75) {
    stars = 5;
    readinessTitle = "Top 1% Offer-Ready Candidate 🏆";
  } else if (completionPercentage >= 80 && pointsPercentage >= 60) {
    stars = 4;
    readinessTitle = "Strong Placement Contender 🥇";
  } else if (completionPercentage >= 60) {
    stars = 3;
    readinessTitle = "Solid Foundation - Minor Polish Needed 🥈";
  } else if (completionPercentage >= 40) {
    stars = 2;
    readinessTitle = "Apprentice - More Written Practice Recommended 🥉";
  } else {
    stars = 1;
    readinessTitle = "Foundational Stage - Review Model Answers 📚";
  }

  const copyFeedbackReport = () => {
    const lines = [
      `=== CAMPUSGROW MOCK INTERVIEW EVALUATION ===`,
      `Track: ${activeSet?.title} (${activeSet?.role})`,
      `Questions Practiced: ${totalQ} Questions`,
      `Time Elapsed: ${formatTime(elapsedSeconds)}`,
      `Questions Answered: ${answeredCount} / ${totalQ} (${completionPercentage}%)`,
      `Rubric Key Points Mastered: ${pointsEarned} / ${totalPointsPossible} (${pointsPercentage}%)`,
      `Overall Rating: ${"⭐".repeat(stars)} (${stars}/5 Stars)`,
      `Readiness Verdict: ${readinessTitle}`,
      `Generated on CampusGrow Platform`,
    ];
    navigator.clipboard.writeText(lines.join("\n"));
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2000);
  };

  return (
    <PaywallGate featureKey="interview">
      <main className="flex-1 bg-white dark:bg-[#0b0813] text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
        <div className="mx-auto max-w-4xl px-6 py-10">

          {/* SCREEN 1: HOME & LENGTH SELECTOR */}
          {screen === "home" && (
            <>
              {/* Header */}
              <div>
                <span className="rounded-full bg-purple-100 dark:bg-purple-950/60 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-800/40">
                  Placement Preparation & Written Mocks
                </span>
                <h1 className="mt-3 text-4xl font-extrabold tracking-tight">
                  🎤 Mock Written Interview Simulator
                </h1>
                <p className="mt-2 text-base text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
                  Practice typing high-scoring technical and behavioral answers to real placement questions. Select your target session length from <strong>at least 15 up to 30 questions</strong>!
                </p>
              </div>

              {/* Length Selector Bar */}
              <div className="mt-8 rounded-3xl border border-gray-200 dark:border-purple-500/20 bg-gray-50/60 dark:bg-[#12101e] p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-extrabold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                      Choose Your Session Question Count:
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      Select between 15 questions (fast screening) and 30 questions (full board marathon).
                    </p>
                  </div>

                  {/* Preset Pills */}
                  <div className="flex items-center gap-2">
                    {[
                      { count: 15, label: "⚡ 15 Qs (Speed)" },
                      { count: 20, label: "🎯 20 Qs (Standard)" },
                      { count: 30, label: "🏆 30 Qs (Marathon)" },
                    ].map((preset) => (
                      <button
                        key={preset.count}
                        onClick={() => setTargetQuestionCount(preset.count)}
                        className={`rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                          targetQuestionCount === preset.count
                            ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                            : "bg-white dark:bg-[#1a1630] border border-gray-200 dark:border-purple-500/20 text-gray-700 dark:text-gray-300 hover:border-purple-400"
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Slider */}
                <div className="mt-5 pt-4 border-t border-gray-200 dark:border-purple-500/20 flex items-center gap-4">
                  <span className="text-xs font-bold text-gray-500">15 Qs</span>
                  <input
                    type="range"
                    min={15}
                    max={30}
                    step={1}
                    value={targetQuestionCount}
                    onChange={(e) => setTargetQuestionCount(parseInt(e.target.value, 10))}
                    className="w-full accent-purple-600 cursor-pointer"
                  />
                  <span className="text-xs font-bold text-gray-500">30 Qs</span>
                  <span className="rounded-lg bg-purple-100 dark:bg-purple-900/40 px-3 py-1 text-xs font-black text-purple-700 dark:text-purple-300 shrink-0">
                    Selected: {targetQuestionCount} Questions
                  </span>
                </div>
              </div>

              {/* Interview Sets Grid */}
              <div className="mt-8 space-y-4">
                {interviewSets.map((set) => (
                  <div
                    key={set.id}
                    className="group rounded-3xl border border-gray-200 dark:border-purple-500/20 bg-white dark:bg-[#12101e] p-6 text-left transition-all hover:border-purple-500 dark:hover:border-purple-400 hover:shadow-xl hover:-translate-y-0.5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex items-start gap-3.5">
                        <span className="text-3xl p-3 rounded-2xl bg-gray-50 dark:bg-[#1a1630] border border-gray-200 dark:border-purple-500/20 shrink-0">
                          {set.emoji}
                        </span>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition">
                              {set.title}
                            </h2>
                            <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${difficultyColor[set.difficulty]}`}>
                              {set.difficulty}
                            </span>
                          </div>
                          <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold mt-0.5">
                            {set.role} • {set.company}
                          </p>
                          <p className="mt-2 text-xs leading-5 text-gray-600 dark:text-gray-400 max-w-xl">
                            {set.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 shrink-0">
                        <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
                          {set.questions.length} Questions Pool
                        </span>
                        <button
                          onClick={() => startSession(set, targetQuestionCount)}
                          className="rounded-xl bg-purple-600 hover:bg-purple-500 text-white px-5 py-2.5 text-xs font-bold transition shadow-md shadow-purple-500/20 flex items-center gap-1.5"
                        >
                          Start {targetQuestionCount} Qs Session →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* SCREEN 2: ACTIVE INTERVIEW SESSION */}
          {screen === "session" && question && (
            <div className="space-y-6">
              {/* Top Navigation & Status */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setScreen("home")}
                  className="text-xs font-bold rounded-lg border border-gray-300 dark:border-purple-500/30 px-3.5 py-2 hover:bg-gray-100 dark:hover:bg-purple-900/30 transition text-gray-700 dark:text-gray-300"
                >
                  ✕ Exit Interview
                </button>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold px-3 py-1 rounded-md bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800/40 text-purple-700 dark:text-purple-300 font-mono">
                    ⏱️ {formatTime(elapsedSeconds)}
                  </span>
                  <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
                    Question <strong className="text-purple-600 dark:text-purple-400">{currentQ + 1}</strong> of <strong>{totalQ}</strong>
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-purple-950/40 overflow-hidden">
                <div
                  className="h-full rounded-full bg-purple-600 transition-all duration-300"
                  style={{ width: `${((currentQ + 1) / totalQ) * 100}%` }}
                />
              </div>

              {/* Question Navigator Drawer (Quick Jump 1 to 30) */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2">
                {activeQuestions.map((_, idx) => {
                  const isDone = (userAnswers[idx] || (idx === currentQ ? currentAnswer : "")).trim().length > 15;
                  const isCur = idx === currentQ;

                  return (
                    <button
                      key={idx}
                      onClick={() => handleJumpToQuestion(idx)}
                      className={`h-7 w-7 rounded-lg text-xs font-bold transition shrink-0 flex items-center justify-center ${
                        isCur
                          ? "bg-purple-600 text-white ring-2 ring-purple-400"
                          : isDone
                          ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300"
                          : "bg-gray-100 dark:bg-[#1a1630] text-gray-500 hover:bg-gray-200"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Main Question Card */}
              <div className="rounded-3xl border border-gray-200 dark:border-purple-500/20 bg-white dark:bg-[#12101e] p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-600 text-xs font-bold text-white shrink-0">
                    Q{currentQ + 1}
                  </span>
                  <span className={`rounded-md px-2.5 py-0.5 text-[11px] font-bold ${categoryColor[question.category] || "bg-gray-100 text-gray-800"}`}>
                    {question.category}
                  </span>
                </div>

                <h2 className="mt-4 text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-snug">
                  {question.question}
                </h2>

                {/* Hint Toggle */}
                <div className="mt-4">
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
                  >
                    <span>💡</span> {showHint ? "Hide Mentor Hint" : "Need a Hint? Click Here"}
                  </button>

                  {showHint && (
                    <div className="mt-2 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 p-4 text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
                      <strong>Mentor Hint:</strong> {question.hint}
                    </div>
                  )}
                </div>

                {/* Textarea for Candidate Answer */}
                <div className="mt-6">
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
                    <label className="font-bold">Your Written Answer:</label>
                    <span>
                      Words: {currentAnswer.trim() ? currentAnswer.trim().split(/\s+/).length : 0} | Characters: {currentAnswer.length}
                    </span>
                  </div>

                  <textarea
                    rows={8}
                    value={currentAnswer}
                    onChange={(e) => setCurrentAnswer(e.target.value)}
                    placeholder="Structure your answer with clear rationale, examples, and trade-offs..."
                    className="w-full rounded-2xl border border-gray-300 dark:border-purple-500/30 bg-gray-50/50 dark:bg-[#16122b] p-4 text-sm focus:border-purple-500 focus:outline-none dark:text-white leading-relaxed resize-y"
                  />
                </div>

                {/* Compare / Model Answer Peek */}
                <div className="mt-4">
                  <button
                    onClick={() => setShowSample(!showSample)}
                    className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                  >
                    <span>📖</span> {showSample ? "Hide Benchmark Answer" : "Peek at Model Answer Benchmark"}
                  </button>

                  {showSample && (
                    <div className="mt-3 rounded-2xl border border-blue-200 dark:border-blue-800/40 bg-blue-50/50 dark:bg-[#0b1426] p-5 text-xs text-gray-800 dark:text-gray-200 space-y-3">
                      <div>
                        <strong className="text-blue-700 dark:text-blue-300 uppercase tracking-wide block mb-1">
                          Model Benchmark Answer:
                        </strong>
                        <p className="leading-relaxed whitespace-pre-wrap">{question.sampleAnswer}</p>
                      </div>

                      <div className="pt-2 border-t border-blue-200 dark:border-blue-800/40">
                        <strong className="text-blue-700 dark:text-blue-300 uppercase tracking-wide block mb-1">
                          Key Evaluation Criteria:
                        </strong>
                        <ul className="list-disc pl-5 space-y-1">
                          {question.keyPoints.map((point, i) => (
                            <li key={i}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Navigation Buttons */}
                <div className="mt-8 flex flex-wrap items-center justify-between gap-3 pt-5 border-t border-gray-100 dark:border-purple-500/20">
                  <button
                    onClick={handlePrev}
                    disabled={currentQ === 0}
                    className="rounded-xl border border-gray-300 dark:border-purple-500/30 px-4 py-2.5 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-purple-900/30 transition disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    ← Previous Question
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleNext}
                      className="rounded-xl bg-purple-600 hover:bg-purple-500 text-white px-6 py-2.5 text-xs font-bold transition shadow-md shadow-purple-500/20"
                    >
                      {currentQ + 1 >= totalQ ? "Finish Interview & Evaluate 🏆" : "Save & Next Question →"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN 3: COMPREHENSIVE EVALUATION & REVIEW */}
          {screen === "review" && (
            <div className="space-y-8">
              {/* Summary Hero Card */}
              <div className="rounded-3xl border border-purple-200 dark:border-purple-500/30 bg-gradient-to-b from-purple-50/80 to-white dark:from-[#18132b] dark:to-[#0f0c1c] p-8 md:p-10 shadow-xl text-center">
                {/* Glowing Stars Display */}
                <div className="flex items-center justify-center gap-2 text-4xl md:text-5xl drop-shadow-md">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`transition-all duration-500 ${
                        star <= stars
                          ? "text-amber-400 scale-110 drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]"
                          : "text-gray-300 dark:text-gray-700 opacity-40 scale-95"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>

                <div className="mt-4">
                  <span className="rounded-full bg-purple-100 dark:bg-purple-900/40 px-4 py-1 text-xs font-extrabold text-purple-800 dark:text-purple-300 uppercase tracking-wider">
                    {readinessTitle}
                  </span>
                </div>

                <h2 className="mt-4 text-3xl font-black text-gray-900 dark:text-white">
                  Mock Interview Completed!
                </h2>

                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
                  You completed <strong>{totalQ} placement questions</strong> in {formatTime(elapsedSeconds)}. Check off your key points below to grade your written performance.
                </p>

                {/* Stat Badges */}
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
                  <div className="rounded-2xl border border-purple-200/80 dark:border-purple-800/40 bg-white dark:bg-[#1a1630] p-3">
                    <span className="text-[11px] font-bold text-gray-500 uppercase">Answered</span>
                    <p className="text-xl font-black text-purple-600 dark:text-purple-400">{answeredCount} / {totalQ}</p>
                  </div>
                  <div className="rounded-2xl border border-purple-200/80 dark:border-purple-800/40 bg-white dark:bg-[#1a1630] p-3">
                    <span className="text-[11px] font-bold text-gray-500 uppercase">Rubric Points</span>
                    <p className="text-xl font-black text-emerald-600 dark:text-emerald-400">{pointsEarned} / {totalPointsPossible}</p>
                  </div>
                  <div className="rounded-2xl border border-purple-200/80 dark:border-purple-800/40 bg-white dark:bg-[#1a1630] p-3">
                    <span className="text-[11px] font-bold text-gray-500 uppercase">Total Time</span>
                    <p className="text-xl font-black text-blue-600 dark:text-blue-400">{formatTime(elapsedSeconds)}</p>
                  </div>
                  <div className="rounded-2xl border border-purple-200/80 dark:border-purple-800/40 bg-white dark:bg-[#1a1630] p-3">
                    <span className="text-[11px] font-bold text-gray-500 uppercase">Star Rating</span>
                    <p className="text-xl font-black text-amber-500">{stars} / 5</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <button
                    onClick={copyFeedbackReport}
                    className="rounded-xl bg-purple-600 hover:bg-purple-500 text-white px-5 py-2.5 text-xs font-bold transition shadow-md shadow-purple-500/20 flex items-center gap-1.5"
                  >
                    {copiedReport ? "Report Copied! ✓" : "📋 Export & Copy Interview Report"}
                  </button>
                  <button
                    onClick={() => setScreen("home")}
                    className="rounded-xl border border-gray-300 dark:border-purple-500/30 px-5 py-2.5 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-purple-900/30 transition"
                  >
                    Start Another Interview Round
                  </button>
                </div>
              </div>

              {/* Question By Question Self-Evaluation Review */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <span>📝</span> Review All {totalQ} Questions & Self-Evaluate Rubric
                </h3>

                <div className="space-y-5">
                  {activeQuestions.map((q, qIdx) => {
                    const ans = userAnswers[qIdx] || "";
                    const isAnswered = ans.trim().length > 15;

                    return (
                      <div
                        key={q.id}
                        className="rounded-3xl border border-gray-200 dark:border-purple-500/20 bg-white dark:bg-[#12101e] p-6 shadow-sm space-y-4"
                      >
                        {/* Question Title */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-600 text-xs font-bold text-white shrink-0 mt-0.5">
                              {qIdx + 1}
                            </span>
                            <div>
                              <h4 className="font-bold text-base text-gray-900 dark:text-white">
                                {q.question}
                              </h4>
                              <span className={`inline-block mt-1 rounded-md px-2 py-0.5 text-[10px] font-bold ${categoryColor[q.category] || "bg-gray-100 text-gray-800"}`}>
                                {q.category}
                              </span>
                            </div>
                          </div>

                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold shrink-0 ${
                              isAnswered
                                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
                                : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                            }`}
                          >
                            {isAnswered ? "Answered ✓" : "Skipped / Blank"}
                          </span>
                        </div>

                        {/* Candidate's answer */}
                        <div className="rounded-2xl bg-gray-50 dark:bg-[#1a1630] p-4 text-xs border border-gray-200 dark:border-purple-500/15">
                          <strong className="text-purple-600 dark:text-purple-400 block mb-1">
                            Your Written Response:
                          </strong>
                          {isAnswered ? (
                            <p className="whitespace-pre-wrap leading-relaxed text-gray-800 dark:text-gray-200">{ans}</p>
                          ) : (
                            <p className="italic text-gray-400">No response provided during session.</p>
                          )}
                        </div>

                        {/* Model answer */}
                        <div className="rounded-2xl bg-blue-50/50 dark:bg-[#0b1426] p-4 text-xs border border-blue-200 dark:border-blue-800/40">
                          <strong className="text-blue-700 dark:text-blue-300 block mb-1">
                            Benchmark Model Answer:
                          </strong>
                          <p className="whitespace-pre-wrap leading-relaxed text-gray-800 dark:text-gray-200">
                            {q.sampleAnswer}
                          </p>
                        </div>

                        {/* Interactive key points checklist */}
                        <div className="pt-2">
                          <strong className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide block mb-2">
                            Self-Check: Did you cover these key concepts? (Check to add points):
                          </strong>
                          <div className="grid gap-2 sm:grid-cols-2">
                            {q.keyPoints.map((point, pIdx) => {
                              const key = `${q.id}_${pIdx}`;
                              const isChecked = !!checkedKeyPoints[key];

                              return (
                                <button
                                  key={pIdx}
                                  onClick={() => toggleKeyPoint(q.id, pIdx)}
                                  className={`rounded-xl border p-2.5 text-left text-xs transition flex items-center gap-2.5 ${
                                    isChecked
                                      ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold"
                                      : "border-gray-200 dark:border-gray-800 bg-white dark:bg-[#12101e] text-gray-700 dark:text-gray-300 hover:border-gray-400"
                                  }`}
                                >
                                  <span className={`h-4 w-4 rounded flex items-center justify-center text-[10px] border ${isChecked ? "bg-emerald-600 border-emerald-600 text-white" : "border-gray-400"}`}>
                                    {isChecked && "✓"}
                                  </span>
                                  <span>{point}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </PaywallGate>
  );
}
