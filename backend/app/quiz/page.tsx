"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { quizTopics, QuizTopic, QuizQuestion } from "@/data/quizData";
import PaywallGate from "@/components/PaywallGate";

type Screen = "home" | "quiz" | "result";

export default function QuizPage() {
  const router = useRouter();

  const [screen, setScreen] = useState<Screen>("home");
  const [selectedTopic, setSelectedTopic] = useState<QuizTopic | null>(null);
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<string>("All");
  const [questionCountLimit, setQuestionCountLimit] = useState<number>(5);
  const [savedStars, setSavedStars] = useState<Record<string, number>>({});

  useEffect(() => {
    try {
      const starsMap: Record<string, number> = {};
      quizTopics.forEach((t) => {
        const val = localStorage.getItem(`quiz_stars_${t.id}`);
        if (val) {
          starsMap[t.id] = parseInt(val, 10);
        }
      });
      setSavedStars(starsMap);
    } catch {
      // Ignore storage read error
    }
  }, []);

  const levelColor: Record<string, string> = {
    Easy: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800/40",
    Beginner: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800/40",
    Medium: "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300 dark:border-amber-800/40",
    Intermediate: "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300 dark:border-amber-800/40",
    Hard: "bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300 border-red-300 dark:border-red-800/40",
    Advanced: "bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300 border-red-300 dark:border-red-800/40",
    Extreme: "bg-purple-100 text-purple-800 dark:bg-purple-950/70 dark:text-purple-300 border-purple-400 dark:border-purple-700/60 animate-pulse",
  };

  const filteredTopics = useMemo(() => {
    if (selectedLevelFilter === "All") return quizTopics;
    return quizTopics.filter((t) => {
      if (selectedLevelFilter === "Easy") return t.difficulty === "Easy" || t.difficulty === "Beginner";
      if (selectedLevelFilter === "Medium") return t.difficulty === "Medium" || t.difficulty === "Intermediate";
      if (selectedLevelFilter === "Hard") return t.difficulty === "Hard" || t.difficulty === "Advanced";
      if (selectedLevelFilter === "Extreme") return t.difficulty === "Extreme";
      return true;
    });
  }, [selectedLevelFilter]);

  function startQuiz(topic: QuizTopic, limit?: number) {
    setSelectedTopic(topic);
    const count = limit || questionCountLimit;
    const questionsToUse = count >= topic.questions.length ? topic.questions : topic.questions.slice(0, count);
    setActiveQuestions(questionsToUse);
    setCurrentQ(0);
    setSelectedOption(null);
    setAnswered(false);
    setScore(0);
    setAnswers([]);
    setScreen("quiz");
  }

  function handleSelectOption(idx: number) {
    if (answered) return;
    setSelectedOption(idx);
    setAnswered(true);

    const isCorrect = idx === activeQuestions[currentQ].correct;
    if (isCorrect) {
      setScore((s) => s + 1);
    }
    setAnswers((prev) => [...prev, idx]);
  }

  function handleNext() {
    const total = activeQuestions.length;
    if (currentQ + 1 >= total) {
      // Calculate final stars and save
      const finalScore = score + (selectedOption === activeQuestions[currentQ].correct && !answers.includes(selectedOption) ? 0 : 0);
      const pct = Math.round((score / total) * 100);
      let calculatedStars = 1;
      if (pct >= 90) calculatedStars = 5;
      else if (pct >= 75) calculatedStars = 4;
      else if (pct >= 60) calculatedStars = 3;
      else if (pct >= 40) calculatedStars = 2;
      else calculatedStars = 1;

      if (selectedTopic) {
        const currentBest = savedStars[selectedTopic.id] || 0;
        if (calculatedStars > currentBest) {
          try {
            localStorage.setItem(`quiz_stars_${selectedTopic.id}`, calculatedStars.toString());
            setSavedStars((prev) => ({ ...prev, [selectedTopic.id]: calculatedStars }));
          } catch {
            // Ignore error
          }
        }
      }

      setScreen("result");
    } else {
      setCurrentQ((q) => q + 1);
      setSelectedOption(null);
      setAnswered(false);
    }
  }

  function restart() {
    setScreen("home");
    setSelectedTopic(null);
  }

  const question = activeQuestions[currentQ];
  const total = activeQuestions.length;
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

  let earnedStars = 1;
  let starLabel = "Novice Apprentice";
  let starEmoji = "⭐";
  if (percentage >= 90) {
    earnedStars = 5;
    starLabel = "Supreme Engineering Legend 🏆";
    starEmoji = "⭐⭐⭐⭐⭐";
  } else if (percentage >= 75) {
    earnedStars = 4;
    starLabel = "Distinguished Technical Expert 🥇";
    starEmoji = "⭐⭐⭐⭐";
  } else if (percentage >= 60) {
    earnedStars = 3;
    starLabel = "Proficient Placement Ready 🥈";
    starEmoji = "⭐⭐⭐";
  } else if (percentage >= 40) {
    earnedStars = 2;
    starLabel = "Developing Engineer 🥉";
    starEmoji = "⭐⭐";
  } else {
    earnedStars = 1;
    starLabel = "Foundation Grinder 📚";
    starEmoji = "⭐";
  }

  return (
    <PaywallGate featureKey="quiz">
      <main className="flex-1 bg-white dark:bg-[#0b0813] text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
        <div className="mx-auto max-w-4xl px-6 py-10">

          {/* SCREEN 1: HOME CATALOG WITH EASY TO EXTREME TIERS */}
          {screen === "home" && (
            <>
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="rounded-full bg-purple-100 dark:bg-purple-950/60 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-800/40">
                    Mastery & Star Rating Center
                  </span>
                  <h1 className="mt-3 text-4xl font-extrabold tracking-tight">
                    📝 Quiz Center (Easy to Extreme)
                  </h1>
                  <p className="mt-2 text-base text-gray-600 dark:text-gray-400 max-w-2xl">
                    Challenge yourself across 4 rigorous tiers from Easy fundamentals to Extreme kernel & distributed systems. Earn up to 5 stars ⭐ based on your accuracy!
                  </p>
                </div>
              </div>

              {/* Difficulty Level Tabs */}
              <div className="mt-8 flex flex-wrap items-center gap-2 border-b border-gray-200 dark:border-purple-500/20 pb-4">
                <span className="text-xs font-bold uppercase text-gray-400 mr-2">Level:</span>
                {[
                  { id: "All", label: "All Tiers", badge: `${quizTopics.length}` },
                  { id: "Easy", label: "🟢 Easy", badge: "Foundations" },
                  { id: "Medium", label: "🟡 Medium", badge: "Core CS" },
                  { id: "Hard", label: "🔴 Hard", badge: "Advanced Systems" },
                  { id: "Extreme", label: "⚡ Extreme", badge: "Kernel & Distributed" },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setSelectedLevelFilter(tier.id)}
                    className={`rounded-xl px-4 py-2 text-xs font-bold transition flex items-center gap-1.5 ${
                      selectedLevelFilter === tier.id
                        ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                        : "bg-gray-100 dark:bg-[#16122b] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-purple-900/30"
                    }`}
                  >
                    <span>{tier.label}</span>
                    <span className="text-[10px] opacity-75 font-normal">({tier.badge})</span>
                  </button>
                ))}
              </div>

              {/* Topics Grid */}
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {filteredTopics.map((topic) => {
                  const stars = savedStars[topic.id] || 0;

                  return (
                    <div
                      key={topic.id}
                      className="group rounded-3xl border border-gray-200 dark:border-purple-500/20 bg-white dark:bg-[#12101e] p-6 text-left transition-all hover:border-purple-500 dark:hover:border-purple-400 hover:shadow-xl hover:-translate-y-0.5 flex flex-col justify-between"
                    >
                      <div>
                        {/* Top row */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <span className="text-3xl p-2.5 rounded-2xl bg-gray-50 dark:bg-[#1a1630] border border-gray-200 dark:border-purple-500/20">
                              {topic.emoji}
                            </span>
                            <div>
                              <h2 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition">
                                {topic.title}
                              </h2>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                {topic.questions.length} Questions Pool
                              </p>
                            </div>
                          </div>

                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold border ${levelColor[topic.difficulty]}`}
                          >
                            {topic.difficulty}
                          </span>
                        </div>

                        <p className="mt-3 text-xs leading-5 text-gray-600 dark:text-gray-400">
                          {topic.description}
                        </p>

                        {/* Stars earned badge */}
                        <div className="mt-4 flex items-center justify-between rounded-xl bg-gray-50 dark:bg-[#18132b] p-3 border border-gray-100 dark:border-purple-500/15">
                          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                            Your Best Record:
                          </span>
                          <span className="text-xs font-bold text-amber-500">
                            {stars > 0 ? (
                              <span className="flex items-center gap-1">
                                {"⭐".repeat(stars)}
                                <span className="text-[11px] text-gray-400 ml-1">({stars}/5 Stars)</span>
                              </span>
                            ) : (
                              <span className="text-gray-400 text-[11px]">Unranked (0 Stars)</span>
                            )}
                          </span>
                        </div>
                      </div>

                      {/* Start buttons */}
                      <div className="mt-6 flex items-center gap-2 pt-4 border-t border-gray-100 dark:border-purple-500/15">
                        <button
                          onClick={() => startQuiz(topic, 5)}
                          className="flex-1 rounded-xl bg-purple-600 hover:bg-purple-500 text-white py-2 text-xs font-bold transition shadow-md shadow-purple-500/20 text-center"
                        >
                          Quick 5 Qs →
                        </button>
                        <button
                          onClick={() => startQuiz(topic, topic.questions.length)}
                          className="rounded-xl border border-gray-300 dark:border-purple-500/30 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-purple-900/30 py-2 px-3 text-xs font-bold transition"
                        >
                          All ({topic.questions.length})
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* SCREEN 2: ACTIVE QUIZ QUESTION */}
          {screen === "quiz" && question && (
            <div className="space-y-6">
              {/* Progress and Level Bar */}
              <div className="flex items-center justify-between">
                <button
                  onClick={restart}
                  className="text-xs font-bold rounded-lg border border-gray-300 dark:border-purple-500/30 px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-purple-900/30 transition text-gray-700 dark:text-gray-300"
                >
                  ✕ Exit Quiz
                </button>

                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold border ${levelColor[selectedTopic?.difficulty || "Medium"]}`}
                  >
                    {selectedTopic?.difficulty} Tier
                  </span>
                  <span className="text-xs font-bold text-purple-600 dark:text-purple-400">
                    Question {currentQ + 1} of {total}
                  </span>
                </div>
              </div>

              {/* Progress track */}
              <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-purple-950/40 overflow-hidden">
                <div
                  className="h-full rounded-full bg-purple-600 transition-all duration-300"
                  style={{ width: `${((currentQ + 1) / total) * 100}%` }}
                />
              </div>

              {/* Question Card */}
              <div className="rounded-3xl border border-gray-200 dark:border-purple-500/20 bg-white dark:bg-[#12101e] p-6 md:p-8 shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-600 text-xs font-bold text-white shrink-0">
                    Q{currentQ + 1}
                  </span>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-snug">
                    {question.question}
                  </h2>
                </div>

                {/* Options List */}
                <div className="mt-8 space-y-3">
                  {question.options.map((option, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrect = idx === question.correct;

                    let optionStyle =
                      "border-gray-200 dark:border-purple-500/20 bg-gray-50/50 dark:bg-[#18132b] text-gray-800 dark:text-gray-200 hover:border-purple-400";

                    if (answered) {
                      if (isCorrect) {
                        optionStyle =
                          "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold ring-2 ring-emerald-500/20";
                      } else if (isSelected) {
                        optionStyle =
                          "border-red-500 bg-red-50 dark:bg-red-950/40 text-red-900 dark:text-red-200 font-bold ring-2 ring-red-500/20";
                      } else {
                        optionStyle =
                          "border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#12101e] text-gray-400 opacity-60";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(idx)}
                        disabled={answered}
                        className={`w-full rounded-2xl border p-4 text-left text-sm transition flex items-center justify-between ${optionStyle}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex h-6 w-6 items-center justify-center rounded-lg border border-gray-300 dark:border-gray-700 text-xs font-bold">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span>{option}</span>
                        </div>

                        {answered && isCorrect && <span className="text-emerald-600 font-bold text-lg">✓</span>}
                        {answered && isSelected && !isCorrect && (
                          <span className="text-red-600 font-bold text-lg">✕</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Instant Explanation Box */}
                {answered && (
                  <div className="mt-6 rounded-2xl border border-purple-200 dark:border-purple-800/40 bg-purple-50/50 dark:bg-purple-950/30 p-5 text-xs text-purple-900 dark:text-purple-200 leading-relaxed">
                    <p className="font-extrabold uppercase tracking-wide text-purple-700 dark:text-purple-300 mb-1">
                      💡 Deep Engineering Explanation:
                    </p>
                    {question.explanation}
                  </div>
                )}

                {/* Next button */}
                {answered && (
                  <div className="mt-6 text-right">
                    <button
                      onClick={handleNext}
                      className="rounded-xl bg-purple-600 hover:bg-purple-500 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-purple-500/20 transition"
                    >
                      {currentQ + 1 >= total ? "🏆 Calculate My Marks & Stars →" : "Next Question →"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SCREEN 3: RESULT & PERFORMANCE STARS */}
          {screen === "result" && (
            <div className="space-y-8 text-center">
              <div className="rounded-3xl border border-purple-200 dark:border-purple-500/30 bg-gradient-to-b from-purple-50/80 to-white dark:from-[#18132b] dark:to-[#0f0c1c] p-8 md:p-12 shadow-xl">
                {/* Star display */}
                <div className="flex items-center justify-center gap-2 text-4xl md:text-5xl drop-shadow-md">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`transition-all duration-500 ${
                        star <= earnedStars
                          ? "text-amber-400 scale-110 drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]"
                          : "text-gray-300 dark:text-gray-700 opacity-40 scale-95"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>

                <div className="mt-4">
                  <span className="rounded-full bg-purple-100 dark:bg-purple-900/40 px-4 py-1 text-xs font-bold text-purple-800 dark:text-purple-300 uppercase tracking-wider">
                    {starLabel}
                  </span>
                </div>

                <h2 className="mt-4 text-3xl md:text-4xl font-black text-gray-900 dark:text-white">
                  Score: {score} / {total} Marks ({percentage}%)
                </h2>

                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                  {percentage >= 90
                    ? "Outstanding performance! You have mastered this domain at an elite level."
                    : percentage >= 75
                    ? "Impressive job! You are well prepared for campus technical rounds."
                    : percentage >= 60
                    ? "Good foundation! Review the missed questions below to lock in all 5 stars."
                    : "Every master started as a student. Read the explanations below and try again!"}
                </p>

                {/* Action buttons */}
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <button
                    onClick={() => startQuiz(selectedTopic!, total)}
                    className="rounded-xl bg-purple-600 hover:bg-purple-500 px-6 py-3 text-xs font-bold text-white shadow-md shadow-purple-500/20 transition"
                  >
                    🔄 Retake This Quiz
                  </button>
                  <button
                    onClick={restart}
                    className="rounded-xl border border-gray-300 dark:border-purple-500/30 px-6 py-3 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-purple-900/30 transition"
                  >
                    📋 Choose Another Topic
                  </button>
                </div>
              </div>

              {/* Question Review Section */}
              <div className="text-left space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <span>🔍</span> Detailed Performance & Answer Review
                </h3>

                <div className="space-y-4">
                  {activeQuestions.map((q, idx) => {
                    const userAnswer = answers[idx];
                    const isCorrect = userAnswer === q.correct;

                    return (
                      <div
                        key={q.id}
                        className={`rounded-2xl border p-5 transition ${
                          isCorrect
                            ? "border-emerald-200 dark:border-emerald-800/40 bg-emerald-50/20 dark:bg-emerald-950/10"
                            : "border-red-200 dark:border-red-800/40 bg-red-50/20 dark:bg-red-950/10"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <p className="font-bold text-sm text-gray-900 dark:text-white">
                            {idx + 1}. {q.question}
                          </p>
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                              isCorrect
                                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
                                : "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300"
                            }`}
                          >
                            {isCorrect ? "Correct (+1)" : "Incorrect (0)"}
                          </span>
                        </div>

                        <div className="mt-3 text-xs space-y-1">
                          <p className="text-gray-600 dark:text-gray-400">
                            <strong>Your Answer:</strong>{" "}
                            {userAnswer !== null && userAnswer !== undefined
                              ? q.options[userAnswer]
                              : "Not Answered"}
                          </p>
                          {!isCorrect && (
                            <p className="text-emerald-600 dark:text-emerald-400 font-semibold">
                              <strong>Correct Answer:</strong> {q.options[q.correct]}
                            </p>
                          )}
                        </div>

                        <div className="mt-3 rounded-xl bg-gray-50 dark:bg-[#1a1630] p-3 text-xs text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-purple-500/15">
                          <strong className="text-purple-600 dark:text-purple-400">Explanation:</strong>{" "}
                          {q.explanation}
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
