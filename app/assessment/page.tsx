"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import BrandLogo from "@/components/BrandLogo";
import {
  getDiagnosticQuestionsForBranch,
  generatePersonalizedPath,
  DiagnosticQuestion,
  PersonalizedPath,
} from "@/data/diagnosticData";
import { createClient } from "@/lib/supabase/client";

function AssessmentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Student info from onboarding / registration or query params
  const [studentName, setStudentName] = useState("Engineer");
  const [studentBranch, setStudentBranch] = useState("Computer Science & Engineering");
  const [studentYear, setStudentYear] = useState("3rd Year");

  // Assessment flow states: 'intro' | 'testing' | 'analyzing' | 'result'
  const [stage, setStage] = useState<"intro" | "testing" | "analyzing" | "result">("intro");
  const [questions, setQuestions] = useState<DiagnosticQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [recordedAnswers, setRecordedAnswers] = useState<
    { question: DiagnosticQuestion; isCorrect: boolean }[]
  >([]);
  const [generatedPath, setGeneratedPath] = useState<PersonalizedPath | null>(null);

  // Load registered details
  useEffect(() => {
    try {
      const raw = localStorage.getItem("studentData");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.name) setStudentName(parsed.name);
        if (parsed.branch) setStudentBranch(parsed.branch);
        if (parsed.year) setStudentYear(parsed.year);
      }
    } catch {
      /* ignore */
    }

    // Check if branch was passed via query
    const qBranch = searchParams.get("branch");
    if (qBranch) setStudentBranch(qBranch);

    // Check if previously completed path exists in localStorage
    const existing = localStorage.getItem("diagnosticAssessment");
    if (existing) {
      try {
        setGeneratedPath(JSON.parse(existing));
      } catch {
        /* ignore */
      }
    }

    // Also sync from Supabase if logged in
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;
      if (user.user_metadata?.name) setStudentName(user.user_metadata.name);
      if (user.user_metadata?.branch) setStudentBranch(user.user_metadata.branch);
      if (user.user_metadata?.year) setStudentYear(user.user_metadata.year);

      const { data: prof } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      if (prof) {
        if (prof.name) setStudentName(prof.name);
        if (prof.branch) setStudentBranch(prof.branch);
        if (prof.year) setStudentYear(prof.year);
      }

      const { data: dbAssessment } = await supabase
        .from("assessments")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (dbAssessment?.path_data) {
        setGeneratedPath(dbAssessment.path_data as PersonalizedPath);
      }
    });
  }, [searchParams]);

  // Start assessment
  const handleStart = () => {
    const qList = getDiagnosticQuestionsForBranch(studentBranch);
    setQuestions(qList);
    setCurrentIndex(0);
    setSelectedOption(null);
    setHasSubmitted(false);
    setScore(0);
    setRecordedAnswers([]);
    setStage("testing");
  };

  const handleSelectOption = (idx: number) => {
    if (hasSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || hasSubmitted) return;
    setHasSubmitted(true);
    const q = questions[currentIndex];
    const isCorrect = selectedOption === q.correct;
    if (isCorrect) {
      setScore((s) => s + 1);
    }
    setRecordedAnswers((prev) => [...prev, { question: q, isCorrect }]);
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setHasSubmitted(false);
    } else {
      // Complete test & analyze
      setStage("analyzing");
      setTimeout(() => {
        const finalScore = score + (selectedOption === questions[currentIndex].correct ? 1 : 0);
        const finalAnswers = [
          ...recordedAnswers,
          {
            question: questions[currentIndex],
            isCorrect: selectedOption === questions[currentIndex].correct,
          },
        ];

        const path = generatePersonalizedPath(
          finalScore,
          questions.length,
          studentBranch,
          studentYear,
          finalAnswers
        );

        setGeneratedPath(path);
        try {
          localStorage.setItem("diagnosticAssessment", JSON.stringify(path));
          // Also record in studentData
          const sd = JSON.parse(localStorage.getItem("studentData") || "{}");
          sd.placementTier = path.tier;
          sd.placementScore = `${finalScore}/${questions.length}`;
          localStorage.setItem("studentData", JSON.stringify(sd));
        } catch {
          /* ignore */
        }

        // Persist to Supabase if logged in
        try {
          const supabase = createClient();
          supabase.auth.getUser().then(({ data: { user } }) => {
            if (user) {
              supabase
                .from("assessments")
                .insert({
                  user_id: user.id,
                  branch: studentBranch,
                  year: studentYear,
                  score: finalScore,
                  total: questions.length,
                  percentage: Math.round((finalScore / questions.length) * 100),
                  tier: path.tier,
                  path_data: path,
                })
                .then(({ error }) => {
                  if (error) console.warn("Supabase assessment save error:", error.message);
                });
            }
          });
        } catch (err) {
          console.warn("Supabase assessment exception:", err);
        }

        setStage("result");
      }, 1500);
    }
  };

  const currentQ = questions[currentIndex];

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col justify-between">
      {/* ── Navbar ──────────────────────────────────────────────────────── */}
      <header className="border-b border-gray-200 bg-white/95 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-4 shadow-sm">
        <div className="w-full flex items-center justify-between">
          <BrandLogo badge="Diagnostic" subtitle="Grow Beyond the Classroom." className="-ml-1" />

          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-600 font-mono">
              {studentBranch} • {studentYear}
            </span>
            <button
              onClick={() => router.push("/dashboard")}
              className="text-gray-500 hover:text-gray-900 transition"
            >
              Skip to Dashboard →
            </button>
          </div>
        </div>
      </header>

      {/* ── Main Body ───────────────────────────────────────────────────── */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-3xl">

          {/* 1. INTRO STAGE */}
          {stage === "intro" && (
            <div className="rounded-3xl border border-gray-200 bg-gradient-to-b from-gray-50 to-white p-8 md:p-12 shadow-lg relative overflow-hidden">
              <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-emerald-100/60 blur-3xl" />

              <span className="inline-block rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-4">
                Personalized Placement Diagnostic
              </span>

              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-950">
                Welcome, {studentName}!
              </h1>

              <p className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed">
                Before generating your curriculum roadmap, let&apos;s evaluate your current technical foundation in{" "}
                <strong className="text-emerald-600">{studentBranch}</strong>.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3 text-xs">
                <div className="rounded-2xl border border-gray-200 bg-white p-4">
                  <div className="text-xl mb-1">⏱️</div>
                  <p className="font-bold text-gray-900">5 Quick Questions</p>
                  <p className="text-gray-500 mt-1">Takes ~3 minutes to complete.</p>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-4">
                  <div className="text-xl mb-1">🎯</div>
                  <p className="font-bold text-gray-900">Branch-Targeted</p>
                  <p className="text-gray-500 mt-1">Specific to your {studentBranch} domain.</p>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-4">
                  <div className="text-xl mb-1">🧭</div>
                  <p className="font-bold text-gray-900">Dynamic Roadmap</p>
                  <p className="text-gray-500 mt-1">Unlocks your tailored learning path.</p>
                </div>
              </div>

              {/* Branch selector in case student wants to adjust */}
              <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <span className="text-gray-500">Verifying branch curriculum:</span>
                <select
                  value={studentBranch}
                  onChange={(e) => setStudentBranch(e.target.value)}
                  className="rounded-xl bg-white border border-gray-300 px-3 py-2 text-gray-900 text-xs font-semibold focus:outline-none focus:border-emerald-500"
                >
                  <option value="Computer Science & Engineering">Computer Science & Engineering (CSE)</option>
                  <option value="Artificial Intelligence & ML">Artificial Intelligence & ML (AI/ML)</option>
                  <option value="Data Science">Data Science (DS)</option>
                  <option value="Electronics & Communication">Electronics & Communication (ECE)</option>
                  <option value="General Engineering">General / Mechanical / Other</option>
                </select>
              </div>

              <div className="mt-8 flex gap-4">
                <button
                  onClick={handleStart}
                  className="flex-1 rounded-2xl bg-emerald-500 py-4 text-base font-bold text-black hover:bg-emerald-400 transition shadow-lg shadow-emerald-500/20"
                >
                  Begin Diagnostic Assessment →
                </button>
              </div>
            </div>
          )}

          {/* 2. TESTING STAGE */}
          {stage === "testing" && currentQ && (
            <div className="rounded-3xl border border-gray-200 bg-white p-8 md:p-10 shadow-lg relative">
              {/* Progress bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center text-xs font-mono text-gray-500 mb-2">
                  <span>Question {currentIndex + 1} of {questions.length}</span>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-emerald-700 font-bold uppercase tracking-wider">
                    {currentQ.category}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 transition-all duration-300"
                    style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question title */}
              <h2 className="text-xl md:text-2xl font-bold leading-relaxed text-gray-950">
                {currentQ.question}
              </h2>

              {/* Options */}
              <div className="mt-6 space-y-3">
                {currentQ.options.map((opt, idx) => {
                  let borderStyle = "border-gray-200 bg-white hover:border-gray-300 text-gray-800";
                  if (selectedOption === idx) {
                    borderStyle = "border-emerald-500 bg-emerald-50 text-gray-900 font-semibold";
                  }
                  if (hasSubmitted) {
                    if (idx === currentQ.correct) {
                      borderStyle = "border-emerald-500 bg-emerald-50 text-emerald-800 font-bold";
                    } else if (selectedOption === idx) {
                      borderStyle = "border-red-400 bg-red-50 text-red-700 font-bold";
                    } else {
                      borderStyle = "border-gray-100 bg-gray-50 text-gray-400";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={hasSubmitted}
                      className={`w-full text-left rounded-2xl border p-4 text-sm transition flex items-start gap-3 ${borderStyle}`}
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-300 text-xs font-mono text-gray-600">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="mt-0.5">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation card after submit */}
              {hasSubmitted && (
                <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-4 text-xs leading-relaxed animate-in fade-in duration-200">
                  <div className="font-bold text-emerald-700 mb-1">
                    {selectedOption === currentQ.correct ? "✓ Correct!" : "⚠️ Engineering Insight:"}
                  </div>
                  <p className="text-gray-700">{currentQ.explanation}</p>
                </div>
              )}

              {/* Actions */}
              <div className="mt-8 flex justify-end">
                {!hasSubmitted ? (
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={selectedOption === null}
                    className="rounded-xl bg-emerald-500 px-6 py-3 text-sm font-bold text-black hover:bg-emerald-400 transition disabled:opacity-30"
                  >
                    Confirm Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="rounded-xl bg-white px-7 py-3 text-sm font-bold text-black hover:bg-gray-200 transition shadow-lg"
                  >
                    {currentIndex + 1 < questions.length ? "Next Question →" : "Generate My Learning Roadmap →"}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* 3. ANALYZING ANIMATION */}
          {stage === "analyzing" && (
            <div className="py-20 text-center animate-in fade-in duration-300">
              <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-emerald-200" />
                <div className="absolute inset-0 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin" />
                <span className="text-3xl">🧭</span>
              </div>
              <h2 className="mt-6 text-3xl font-extrabold text-gray-950">Synthesizing Diagnostic Telemetry...</h2>
              <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
                Calibrating memory model gaps, branch specialization priorities, and sequencing your custom milestone sprints.
              </p>
            </div>
          )}

          {/* 4. RESULT & PERSONALIZED PATH REVEAL */}
          {stage === "result" && generatedPath && (
            <div className="rounded-3xl border border-gray-200 bg-gradient-to-b from-gray-50 to-white p-8 md:p-12 shadow-lg relative overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="pointer-events-none absolute -top-32 -left-32 h-80 w-80 rounded-full bg-emerald-100/50 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-purple-100/50 blur-3xl" />

              {/* Tier Emblem */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
                <div>
                  <span className="inline-block rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">
                    🎯 Calibrated Track: {generatedPath.tier}
                  </span>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-gray-950">
                    {generatedPath.title}
                  </h1>
                  <p className="text-xs text-gray-500 mt-1">{generatedPath.tagline}</p>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 text-center min-w-[120px]">
                  <div className="text-2xl font-black text-emerald-600">
                    {generatedPath.score} / {generatedPath.total}
                  </div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest font-mono mt-0.5">
                    {generatedPath.percentage}% Score
                  </div>
                </div>
              </div>

              {/* Skills Breakdown */}
              <div className="mt-6">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                  Skill Proficiency Matrix
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {generatedPath.skillsAssessed.map((skill) => (
                    <div key={skill.name} className="rounded-xl border border-gray-200 bg-white p-3">
                      <div className="flex justify-between items-center text-xs mb-1.5">
                        <span className="font-semibold text-gray-700">{skill.name}</span>
                        <span className="font-mono text-gray-500">{skill.score} / {skill.max}</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${(skill.score / skill.max) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Next Action Cards */}
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {/* 1. Recommended Lesson */}
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                      Step 1 • Recommended Starting Lesson
                    </span>
                    <h3 className="mt-1.5 text-base font-bold text-gray-950">
                      {generatedPath.recommendedLessonTitle}
                    </h3>
                    <p className="mt-1 text-xs text-gray-500">
                      Targeted to address your diagnostic results with rigorous systems depth.
                    </p>
                  </div>
                  <button
                    onClick={() => router.push(`/lessons/${generatedPath.recommendedLessonId}`)}
                    className="mt-4 rounded-xl bg-emerald-600 py-2.5 px-4 text-xs font-bold text-white hover:bg-emerald-700 transition"
                  >
                    Start This Lesson →
                  </button>
                </div>

                {/* 2. Recommended Project */}
                <div className="rounded-2xl border border-purple-200 bg-purple-50 p-5 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700">
                      Step 2 • Capstone Project Target
                    </span>
                    <h3 className="mt-1.5 text-base font-bold text-gray-950">
                      {generatedPath.recommendedProjectTitle}
                    </h3>
                    <p className="mt-1 text-xs text-gray-500">
                      Hands-on engineering milestones to solidify your theoretical foundation.
                    </p>
                  </div>
                  <button
                    onClick={() => router.push("/projects")}
                    className="mt-4 rounded-xl border border-purple-300 bg-purple-100 py-2.5 px-4 text-xs font-bold text-purple-800 hover:bg-purple-200 transition"
                  >
                    View Project Milestones →
                  </button>
                </div>
              </div>

              {/* 4-Week Custom Roadmap */}
              <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">
                  🗓️ Your Customized Milestone Roadmap
                </p>
                <div className="space-y-3">
                  {generatedPath.weeklyPlan.map((plan) => (
                    <div key={plan.week} className="flex items-start gap-3 text-xs pb-3 border-b border-gray-200 last:border-0 last:pb-0">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 font-bold font-mono">
                        W{plan.week}
                      </span>
                      <div>
                        <p className="font-semibold text-gray-900">{plan.focus}</p>
                        <p className="text-gray-500 text-[11px] mt-0.5">{plan.deliverables}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Action */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => router.push("/dashboard")}
                  className="flex-1 rounded-2xl bg-gray-950 py-4 text-sm font-bold text-white hover:bg-gray-800 transition shadow-lg text-center"
                >
                  Go to My Customized Dashboard →
                </button>
                <button
                  onClick={() => router.push("/mentor")}
                  className="rounded-2xl border border-gray-200 bg-white px-6 py-4 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
                >
                  🤖 Discuss Path with AI Mentor
                </button>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="border-t border-gray-200 py-4 text-center text-xs text-gray-400">
        CampusGrow • Learning & AI Mentor are 100% Free • Personalized Engineering Education
      </footer>
    </div>
  );
}

export default function AssessmentPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center text-gray-900">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
        </div>
      }
    >
      <AssessmentContent />
    </Suspense>
  );
}
