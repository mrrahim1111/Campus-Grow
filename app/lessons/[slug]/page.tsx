"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ALL_CURRICULUM_TRACKS, CurriculumLesson } from "@/data/courseCurriculum";
import {
  getHubLessonById,
  HubLesson,
  HubCourse,
  HubDomain,
} from "@/data/engineeringHub";
import CodeTerminal from "@/components/CodeTerminal";
import LessonAiResources from "@/components/LessonAiResources";
import DetailedLessonGuideView from "@/components/DetailedLessonGuideView";
import { getLessonQuiz, getLessonPractice, LessonQuizQuestion } from "@/data/lessonQuizzes";
import { recordLessonStarted, recordLessonCompleted } from "@/lib/progress";
import AmbientBackground from "@/components/AmbientBackground";

// Slug aliases defined outside component to avoid re-creation
const SLUG_ALIASES: Record<string, string> = {
  "git": "git-github-foundations",
  "github": "git-github-foundations",
  "git-github": "git-github-foundations",
  "developer-tools": "git-github-foundations",
  "terminal": "terminal-cli-basics",
  "cli": "terminal-cli-basics",
  "vscode": "vscode-ide-developer-tools",
  "debugging": "debugging-developer-tools",
  "npm": "package-managers-build-tools",
  "docker": "cloud-docker-containers",
  "cicd": "cloud-ci-cd-pipelines",
  "ci-cd": "cloud-ci-cd-pipelines",
  "c-foundations-syntax": "programming-fundamentals",
  "c-control-flow-loops": "conditional-statements",
  "c-pointers-memory": "pointers-mini-project",
  "dsa-arrays-lists": "dsa-arrays-complexity",
  "oop-cpp-java": "oop-classes-objects",
  "dbms-sql-core": "dbms-sql-foundations",
  "os-networks-core": "os-processes-threads",
  "fullstack-web-dev": "web-react-nextjs",
  "placement-dsa-oa": "placement-two-pointers-sliding-window",
  "system-design-senior": "system-design-scalability",
  "aiml-math-foundations": "aiml-python-numpy",
  "aiml-supervised-learning": "aiml-neural-networks",
  "web-html-css-modern": "web-react-nextjs",
  "web-react-foundations": "web-rest-apis-backend",
  "cloud-cicd-github-actions": "cloud-ci-cd-pipelines",
  "dbms-sql-mastery": "dbms-sql-foundations",
  "dbms-relational-model": "dbms-joins-acid",
  "python-basics": "py-basics-logic",
  "python": "py-basics-logic",
  "c": "c-programming",
  "c-lang": "c-programming",
  "c-pointers": "c-pointers-and-memory-virtualization",
};

type ResolvedLesson =
  | {
      type: "hub";
      lesson: HubLesson;
      course: HubCourse;
      domain: HubDomain;
    }
  | {
      type: "curriculum";
      lesson: CurriculumLesson;
      trackName: string;
    };

function resolveLesson(slug: string): ResolvedLesson | null {
  if (!slug) return null;
  const targetSlug = SLUG_ALIASES[slug] || slug;

  // 1. Check Engineering Knowledge Hub (15 domains)
  const hubMatch = getHubLessonById(targetSlug) || getHubLessonById(slug);
  if (hubMatch) {
    return {
      type: "hub",
      lesson: hubMatch.lesson,
      course: hubMatch.course,
      domain: hubMatch.domain,
    };
  }

  // 2. Check Standard Curriculum Tracks
  for (const track of ALL_CURRICULUM_TRACKS) {
    const match = track.lessons.find(
      (l) =>
        l.id === targetSlug ||
        l.route === `/lessons/${targetSlug}` ||
        l.id === slug ||
        l.route === `/lessons/${slug}`
    );
    if (match) return { type: "curriculum", lesson: match, trackName: track.title };
  }

  // Fallback: case-insensitive partial match on curriculum
  const cleanSlug = targetSlug.toLowerCase().replace(/[-_]/g, "");
  for (const track of ALL_CURRICULUM_TRACKS) {
    const match = track.lessons.find((l) => {
      const cleanId = l.id.toLowerCase().replace(/[-_]/g, "");
      return cleanId.includes(cleanSlug) || cleanSlug.includes(cleanId);
    });
    if (match) return { type: "curriculum", lesson: match, trackName: track.title };
  }

  return null;
}

export default function DynamicLessonPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const resolved = useMemo(() => resolveLesson(slug), [slug]);

  const [activeTab, setActiveTab] = useState<"overview" | "concepts" | "terminal" | "quiz" | "assignment">("overview");
  const [completed, setCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Quiz state
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState<Record<number, boolean>>({});

  // Assignment submission state
  const [assignmentNotes, setAssignmentNotes] = useState("");
  const [assignmentSubmitted, setAssignmentSubmitted] = useState(false);

  const lessonId = resolved?.lesson.id || slug;
  const lessonTitle = resolved?.lesson.title || "Lesson";

  useEffect(() => {
    if (!slug) return;
    setIsLoading(false);

    if (resolved) {
      const category = resolved.type === "hub" ? resolved.domain.title : resolved.lesson.category;
      const track = resolved.type === "hub" ? resolved.course.title : resolved.trackName;
      recordLessonStarted(lessonId, lessonTitle, category, track);
    }

    try {
      const list = JSON.parse(localStorage.getItem("completedLessons") || "[]");
      if (list.includes(slug) || list.includes(lessonId)) {
        setCompleted(true);
      }
    } catch {
      // ignore
    }
  }, [slug, resolved, lessonId, lessonTitle]);

  // Normalize Quiz Questions depending on Hub vs Curriculum
  const quizList: LessonQuizQuestion[] = useMemo(() => {
    if (!resolved) return [];

    if (resolved.type === "hub" && resolved.lesson.mcqQuestions?.length > 0) {
      return resolved.lesson.mcqQuestions.map((q, idx) => ({
        id: idx + 1,
        question: q.question,
        options: q.options,
        correctAnswer: q.options[q.correctIndex],
        explanation: q.explanation,
        difficulty: (idx === 0 ? "Easy" : idx < 3 ? "Medium" : "Hard") as any,
        difficultyBadge: idx === 0 ? "Easy Concept" : idx < 3 ? "Medium Traversal" : "Hard Scalability",
      }));
    }

    return getLessonQuiz(lessonId, lessonTitle);
  }, [resolved, lessonId, lessonTitle]);

  // Terminal starter code
  const terminalConfig = useMemo(() => {
    if (resolved?.type === "hub" && resolved.lesson.codeSamples && resolved.lesson.codeSamples.length > 0) {
      const sample = resolved.lesson.codeSamples[0];
      return {
        code: sample.code,
        language: (sample.language.toLowerCase() === "c++" ? "c" : sample.language.toLowerCase()) as any,
        filename: sample.filename || "main.c",
        title: sample.explanation,
        description: `Execute and verify ${resolved.lesson.title}`,
        expectedOutput: "Program executed with deterministic exit code 0.",
      };
    }
    return getLessonPractice(lessonId, lessonTitle);
  }, [resolved, lessonId, lessonTitle]);

  // Chronological Previous and Next Lesson in current track / course
  const { prevLesson, nextLesson } = useMemo(() => {
    if (!resolved) return { prevLesson: null, nextLesson: null };

    if (resolved.type === "curriculum") {
      const track = ALL_CURRICULUM_TRACKS.find((t) => t.title === resolved.trackName);
      if (track) {
        const sorted = [...track.lessons].sort((a, b) => a.order - b.order);
        const idx = sorted.findIndex((l) => l.id === resolved.lesson.id);
        return {
          prevLesson: idx > 0 ? sorted[idx - 1] : null,
          nextLesson: idx < sorted.length - 1 ? sorted[idx + 1] : null,
        };
      }
    } else {
      const allLessons = resolved.course.modules?.flatMap((m) => m.lessons) || [];
      const sorted = [...allLessons].sort((a, b) => a.order - b.order);
      const idx = sorted.findIndex((l) => l.id === resolved.lesson.id);
      return {
        prevLesson: idx > 0 ? sorted[idx - 1] : null,
        nextLesson: idx < sorted.length - 1 ? sorted[idx + 1] : null,
      };
    }

    return { prevLesson: null, nextLesson: null };
  }, [resolved]);

  const correctCount = quizList.filter(
    (q, idx) => showResults[idx] && answers[idx] === q.correctAnswer
  ).length;
  const answeredCount = Object.keys(showResults).length;
  const quizScorePercent = quizList.length > 0 ? Math.round((correctCount / quizList.length) * 100) : 0;
  const isMasteryAchieved = quizScorePercent >= 80 || assignmentSubmitted;

  const handleSelectAnswer = (qIdx: number, option: string) => {
    if (showResults[qIdx]) return;
    setAnswers((prev) => ({ ...prev, [qIdx]: option }));
  };

  const handleCheckAnswer = (qIdx: number) => {
    if (!answers[qIdx]) return;
    setShowResults((prev) => ({ ...prev, [qIdx]: true }));
  };

  const handleMarkComplete = () => {
    if (!isMasteryAchieved && !completed) {
      alert("Rigorous Completion Requirement: Please score at least 80% on the Knowledge Assessment Quiz (4/5) or submit the practical assignment before marking this lesson complete.");
      return;
    }

    setCompleted(true);
    try {
      const category = resolved?.type === "hub" ? resolved.domain.title : resolved?.lesson.category || "Core";
      const track = resolved?.type === "hub" ? resolved.course.title : resolved?.trackName || "Knowledge Hub";

      recordLessonCompleted(lessonId, lessonTitle, {
        correctCount,
        totalQuestions: quizList.length,
        trackName: track,
        category,
      });

      const list: string[] = JSON.parse(localStorage.getItem("completedLessons") || "[]");
      if (!list.includes(lessonId)) {
        list.push(lessonId);
        localStorage.setItem("completedLessons", JSON.stringify(list));
      }
      localStorage.setItem(`lesson_${lessonId.replace(/-/g, "_")}`, "completed");
    } catch {
      // ignore
    }
  };

  if (isLoading && !resolved) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#E8F5E9]">
        <div className="text-center p-8">
          <div className="h-8 w-8 mx-auto rounded-full border-2 border-[#16865A] border-t-transparent animate-spin" />
          <p className="mt-4 text-xs font-bold text-[#557267]">Loading Engineering Lesson…</p>
        </div>
      </div>
    );
  }

  if (!resolved) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#E8F5E9] text-[#102B24]">
        <div className="text-center p-8 max-w-md bg-white/80 border border-[#B9E4C9] rounded-3xl shadow-sm">
          <p className="text-4xl mb-3">🔍</p>
          <h2 className="text-2xl font-black">Lesson Not Found</h2>
          <p className="mt-2 text-xs text-[#557267] font-medium leading-relaxed">
            We couldn&apos;t locate &quot;{slug}&quot; in the curriculum database or knowledge hub.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link
              href="/learning-hub"
              className="rounded-xl bg-[#16865A] px-5 py-2.5 text-xs font-black text-white hover:bg-[#0B7650] transition shadow-xs"
            >
              ← Back to Learning Hub
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isHub = resolved.type === "hub";
  const hubLesson = isHub ? resolved.lesson : null;
  const hubCourse = isHub ? resolved.course : null;
  const hubDomain = isHub ? resolved.domain : null;
  const curLesson = !isHub ? resolved.lesson : null;
  const trackTitle = isHub ? hubCourse?.title : resolved.trackName;

  const youtubeEmbedId = hubLesson?.youtubeEmbedId;
  const pdfNotesUrl = hubLesson?.pdfNotesUrl;

  const currentQ = quizList[activeQuestionIdx] || quizList[0];
  const optionLabels = ["A", "B", "C", "D"];

  return (
    <AmbientBackground intensity="lesson">
      <div className="min-h-screen font-sans pb-20 text-[#102B24]">
        {/* Sticky Lesson Navigation Bar */}
        <header className="sticky top-0 z-30 border-b border-white/80 bg-white/85 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.back()}
                className="rounded-xl border border-[#B9E4C9] bg-white px-3 py-1.5 text-xs font-bold text-[#102B24] hover:bg-[#E8F5E9] transition cursor-pointer"
              >
                ← Back
              </button>

              <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-[#557267]">
                <span className="rounded-full bg-[#E8F5E9] text-[#0B7650] px-2.5 py-0.5 border border-[#B9E4C9]">
                  {trackTitle}
                </span>
                <span>• Lesson {resolved.lesson.order}</span>
              </div>
            </div>

            {/* Quick jump tabs */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  activeTab === "overview"
                    ? "bg-[#16865A] text-white"
                    : "text-[#557267] hover:bg-[#E8F5E9]"
                }`}
              >
                📖 Overview
              </button>

              <button
                onClick={() => setActiveTab("terminal")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  activeTab === "terminal"
                    ? "bg-[#16865A] text-white"
                    : "text-[#557267] hover:bg-[#E8F5E9]"
                }`}
              >
                💻 Code
              </button>

              <button
                onClick={() => setActiveTab("quiz")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                  activeTab === "quiz"
                    ? "bg-[#16865A] text-white"
                    : "text-[#557267] hover:bg-[#E8F5E9]"
                }`}
              >
                <span>⚡ Quiz</span>
                <span className="text-[10px] opacity-80">({answeredCount}/{quizList.length})</span>
              </button>

              {isHub && (
                <button
                  onClick={() => setActiveTab("assignment")}
                  className={`hidden sm:block px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    activeTab === "assignment"
                      ? "bg-[#16865A] text-white"
                      : "text-[#557267] hover:bg-[#E8F5E9]"
                  }`}
                >
                  🚀 Assignment
                </button>
              )}

              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer border border-[#B9E4C9] bg-white text-[#102B24] hover:bg-[#E8F5E9] flex items-center gap-1 shadow-2xs"
                title="Download full lesson as print-ready PDF"
              >
                <span>📥</span>
                <span className="hidden sm:inline">PDF</span>
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="border-b border-[#B9E4C9]/40 bg-gradient-to-b from-[#B9E4C9]/20 via-white to-transparent py-8 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-full bg-[#E8F5E9] text-[#16865A] border border-[#B9E4C9] font-black px-3 py-1">
                Lesson {resolved.lesson.order}
              </span>
              <span className="rounded-full bg-blue-50 text-blue-800 border border-blue-200 font-bold px-3 py-1">
                ⏱️ {resolved.lesson.duration}
              </span>
              <span className="rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold px-3 py-1">
                {resolved.lesson.difficulty}
              </span>
              {completed && (
                <span className="rounded-full bg-emerald-500 text-white font-black px-3 py-1 shadow-2xs">
                  ✓ Verified Complete
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#102B24] tracking-tight">
              {resolved.lesson.title}
            </h1>

            <p className="text-sm sm:text-base text-[#557267] font-medium leading-relaxed max-w-3xl">
              {isHub
                ? hubLesson?.overview.slice(0, 220) + "..."
                : curLesson?.description}
            </p>

            {/* Learning Objectives Pills */}
            {isHub && hubLesson?.learningObjectives && (
              <div className="pt-2">
                <span className="text-[11px] font-black uppercase text-[#557267] block mb-1.5">
                  Target Learning Objectives:
                </span>
                <div className="flex flex-wrap gap-2">
                  {hubLesson.learningObjectives.map((obj, oIdx) => (
                    <span
                      key={oIdx}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-xl bg-white border border-[#B9E4C9] text-[#102B24] shadow-2xs"
                    >
                      <span className="text-[#16865A] font-bold">✓</span>
                      <span>{obj}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Dynamic AI Suggested Masterclasses in 3 Languages + 1 Full Lesson PDF */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <LessonAiResources
            lessonTitle={resolved.lesson.title}
            category={resolved.type === "hub" ? resolved.domain.title : resolved.lesson.category}
            lessonNumber={resolved.lesson.order}
          />
        </section>

        {/* Main Content Area */}
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
          {/* TAB 1: OVERVIEW & THEORY */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Detailed Foundations Article */}
              <article className="rounded-3xl bg-white border border-[#B9E4C9] p-6 sm:p-8 space-y-6 shadow-xs">
                <div className="flex items-center justify-between border-b border-[#B9E4C9]/40 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">💡</span>
                    <h2 className="text-base sm:text-lg font-black text-[#102B24]">
                      Detailed Concept Foundations &amp; Real-World Architecture
                    </h2>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#E8F5E9] text-[#16865A]">
                    Deep Technical Dive
                  </span>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-[#102B24] leading-relaxed">
                  {isHub ? (
                    <div className="space-y-4">
                      <p className="whitespace-pre-line font-medium leading-relaxed">
                        {hubLesson?.overview}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="font-medium leading-relaxed">
                        {curLesson?.content.overview}
                      </p>
                      {curLesson?.content.sections.map((sec, sIdx) => (
                        <div key={sIdx} className="pt-3 border-t border-[#B9E4C9]/30 space-y-2">
                          <h3 className="text-sm font-black text-[#102B24]">{sec.title}</h3>
                          <p className="text-xs text-[#557267] leading-relaxed">{sec.explanation}</p>
                          {sec.codeSnippet && (
                            <pre className="rounded-xl bg-slate-900 p-4 text-xs font-mono text-emerald-400 overflow-x-auto">
                              <code>{sec.codeSnippet}</code>
                            </pre>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </article>

              {/* Pin-to-Pin Textbook Deep Dive Guide */}
              <DetailedLessonGuideView
                lessonTitle={resolved.lesson.title}
                category={resolved.type === "hub" ? resolved.domain.title : resolved.lesson.category}
                technologies={resolved.type === "hub" ? resolved.course.technologies : []}
              />

              {/* Key Concepts from Hub */}
              {isHub && hubLesson?.keyConcepts && hubLesson.keyConcepts.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-black text-[#102B24] flex items-center gap-2">
                    <span>🔑</span>
                    <span>Core Engineering Concepts</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {hubLesson.keyConcepts.map((concept, cIdx) => (
                      <div
                        key={cIdx}
                        className="rounded-2xl bg-white border border-[#B9E4C9] p-5 space-y-2 shadow-2xs"
                      >
                        <span className="text-xs font-black text-[#16865A] block">
                          Concept {cIdx + 1}
                        </span>
                        <h4 className="text-sm font-black text-[#102B24]">{concept.title}</h4>
                        <p className="text-xs text-[#557267] leading-relaxed">
                          {concept.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Practical Production Scenarios */}
              {isHub && hubLesson?.practicalExamples && hubLesson.practicalExamples.length > 0 && (
                <div className="rounded-3xl bg-white border border-[#B9E4C9] p-6 sm:p-8 space-y-4 shadow-xs">
                  <h3 className="text-lg font-black text-[#102B24] flex items-center gap-2">
                    <span>🏭</span>
                    <span>Real-World Production Scenarios</span>
                  </h3>

                  <div className="space-y-3">
                    {hubLesson.practicalExamples.map((ex, exIdx) => (
                      <div
                        key={exIdx}
                        className="p-4 rounded-2xl bg-[#F4FBF6] border border-[#B9E4C9] space-y-2"
                      >
                        <h4 className="text-xs font-black uppercase text-[#0B7650]">
                          Scenario {exIdx + 1}: {ex.title}
                        </h4>
                        <p className="text-xs text-[#102B24] leading-relaxed">
                          {ex.scenario}
                        </p>
                        <div className="text-[11px] font-bold text-[#16865A] pt-1">
                          Key Takeaway: {ex.takeaway}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: INTERACTIVE CODE TERMINAL */}
          {activeTab === "terminal" && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-black text-[#102B24] flex items-center gap-2">
                  <span>💻</span>
                  <span>In-Browser Engineering Sandbox</span>
                </h2>
                <p className="text-xs text-[#557267]">
                  Experiment with executable code samples right in your browser.
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
            </div>
          )}

          {/* TAB 3: 5-QUESTION MCQ ASSESSMENT */}
          {activeTab === "quiz" && (
            <div className="rounded-3xl bg-white border border-[#B9E4C9] p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#B9E4C9]/40">
                <div>
                  <h2 className="text-xl font-black text-[#102B24] flex items-center gap-2">
                    <span>⚡</span>
                    <span>Knowledge Assessment Check</span>
                  </h2>
                  <p className="text-xs text-[#557267] mt-0.5">
                    Rigorous completion rule: Pass with at least 80% (4 of 5 correct) to unlock verified completion.
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-[#E8F5E9] px-4 py-2 rounded-2xl border border-[#B9E4C9] self-start sm:self-auto">
                  <span className="text-xs font-bold text-[#557267]">Score:</span>
                  <span className="text-sm font-black text-[#16865A]">
                    {correctCount} / {quizList.length} ({quizScorePercent}%)
                  </span>
                </div>
              </div>

              {/* Stepper Navigation */}
              <div className="grid grid-cols-5 gap-2">
                {quizList.map((q, idx) => {
                  const isCurrent = activeQuestionIdx === idx;
                  const isChecked = showResults[idx];
                  const isRight = isChecked && answers[idx] === q.correctAnswer;
                  const isWrong = isChecked && answers[idx] !== q.correctAnswer;

                  let style = "bg-white border-[#B9E4C9] text-[#102B24]";
                  if (isCurrent) style = "bg-[#16865A] text-white border-[#16865A]";
                  if (isRight) style = "bg-emerald-500 text-white border-emerald-500";
                  if (isWrong) style = "bg-rose-500 text-white border-rose-500";

                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveQuestionIdx(idx)}
                      className={`p-2.5 rounded-2xl border text-center transition cursor-pointer ${style}`}
                    >
                      <span className="text-xs font-black block">Q{idx + 1}</span>
                      <span className="text-[10px] hidden sm:block opacity-80 uppercase">
                        {q.difficulty}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Current Question */}
              <div className="rounded-2xl bg-[#F4FBF6] border border-[#B9E4C9] p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full bg-white text-[#0B7650] border border-[#B9E4C9]">
                    {currentQ.difficultyBadge}
                  </span>
                  <span className="text-xs font-bold text-[#557267]">
                    Question {activeQuestionIdx + 1} of {quizList.length}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-black text-[#102B24] leading-relaxed">
                  {currentQ.question}
                </h3>

                <div className="space-y-2.5">
                  {currentQ.options.map((opt, optIdx) => {
                    const isSelected = answers[activeQuestionIdx] === opt;
                    const isChecked = showResults[activeQuestionIdx];
                    const isCorrect = opt === currentQ.correctAnswer;

                    let optStyle = "bg-white border-[#B9E4C9] hover:bg-[#E8F5E9]";
                    if (isChecked) {
                      if (isCorrect) optStyle = "bg-emerald-100 border-emerald-500 text-emerald-950 font-bold";
                      else if (isSelected && !isCorrect) optStyle = "bg-rose-100 border-rose-400 text-rose-950";
                      else optStyle = "bg-white/50 border-slate-200 opacity-50";
                    } else if (isSelected) {
                      optStyle = "bg-[#E8F5E9] border-[#16865A] font-bold";
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={isChecked}
                        onClick={() => handleSelectAnswer(activeQuestionIdx, opt)}
                        className={`w-full p-3.5 rounded-xl border text-left transition flex items-center gap-3 cursor-pointer ${optStyle}`}
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold bg-[#E8F5E9] text-[#16865A]">
                          {optionLabels[optIdx]}
                        </span>
                        <span className="text-xs sm:text-sm font-medium">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Verification Button & Explanation */}
                {!showResults[activeQuestionIdx] ? (
                  <div className="pt-2">
                    <button
                      onClick={() => handleCheckAnswer(activeQuestionIdx)}
                      disabled={!answers[activeQuestionIdx]}
                      className="px-5 py-2.5 rounded-xl text-xs font-black text-white bg-[#16865A] hover:bg-[#0B7650] transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                      Verify Answer →
                    </button>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-white border border-[#B9E4C9] space-y-2 animate-in fade-in">
                    <span className="text-xs font-black uppercase text-[#0B7650] block">
                      💡 Technical Explanation:
                    </span>
                    <p className="text-xs text-[#102B24] leading-relaxed">
                      {currentQ.explanation}
                    </p>

                    <div className="pt-2 flex justify-end">
                      {activeQuestionIdx < quizList.length - 1 ? (
                        <button
                          onClick={() => setActiveQuestionIdx(activeQuestionIdx + 1)}
                          className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#16865A] hover:bg-[#0B7650] transition cursor-pointer"
                        >
                          Next Question →
                        </button>
                      ) : (
                        <span className="text-xs font-bold text-[#16865A]">
                          ✓ All Questions Answered
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: PRACTICAL ASSIGNMENT */}
          {activeTab === "assignment" && isHub && hubLesson?.assignment && (
            <div className="rounded-3xl bg-white border border-[#B9E4C9] p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="border-b border-[#B9E4C9]/40 pb-4">
                <span className="text-xs font-black uppercase px-2.5 py-0.5 rounded-full bg-[#E8F5E9] text-[#16865A]">
                  Hands-On Capstone Assignment
                </span>
                <h2 className="text-xl font-black text-[#102B24] mt-2">
                  {hubLesson.assignment.title}
                </h2>
                <p className="text-xs text-[#557267] mt-1 leading-relaxed">
                  {hubLesson.assignment.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-black uppercase text-[#557267] mb-2">Required Deliverables:</h4>
                <ul className="space-y-1.5 text-xs text-[#102B24]">
                  {hubLesson.assignment.deliverables.map((deliv, dIdx) => (
                    <li key={dIdx} className="flex items-center gap-2 p-2 rounded-xl bg-[#F4FBF6] border border-[#B9E4C9]/60">
                      <span className="text-[#16865A] font-bold">✓</span>
                      <span>{deliv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                <span className="text-xs font-black uppercase text-amber-900 block mb-1">
                  Automated Verification Criteria:
                </span>
                <p className="text-xs text-amber-800 leading-relaxed font-mono">
                  {hubLesson.assignment.verificationCriteria}
                </p>
              </div>

              {/* Assignment Submission Box */}
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-black uppercase text-[#557267]">
                  Submission Notes or GitHub Repository Link:
                </label>
                <textarea
                  value={assignmentNotes}
                  onChange={(e) => setAssignmentNotes(e.target.value)}
                  placeholder="Paste GitHub link or summarize implementation verification..."
                  rows={3}
                  className="w-full p-3 rounded-2xl border border-[#B9E4C9] text-xs font-medium text-[#102B24] focus:outline-none focus:ring-2 focus:ring-[#16865A]"
                />

                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#557267]">
                    {assignmentSubmitted ? "✓ Submitted for verification" : "Verification unlocks lesson completion"}
                  </span>

                  <button
                    onClick={() => {
                      if (!assignmentNotes.trim()) {
                        alert("Please enter submission notes or a GitHub link.");
                        return;
                      }
                      setAssignmentSubmitted(true);
                      alert("✓ Assignment submitted successfully! Completion unlocked.");
                    }}
                    className="px-5 py-2.5 rounded-xl text-xs font-black text-white bg-[#16865A] hover:bg-[#0B7650] transition shadow-xs cursor-pointer"
                  >
                    {assignmentSubmitted ? "✓ Verified" : "Submit Assignment →"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Rigorous Completion Action Footer */}
          <section className="rounded-3xl bg-white border border-[#B9E4C9] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div>
              <h4 className="font-black text-[#102B24] text-base">
                Ready to Lock &amp; Verify Lesson Completion?
              </h4>
              <p className="text-xs text-[#557267] mt-0.5">
                {isMasteryAchieved
                  ? "✓ Rigorous completion criteria satisfied (MCQ score ≥ 80% or assignment verified)."
                  : `⚠️ Requires score ≥ 80% on MCQ Quiz (${correctCount}/${quizList.length} currently) or assignment submission.`}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/mentor"
                className="px-4 py-2.5 rounded-xl border border-[#B9E4C9] bg-white text-xs font-bold text-[#102B24] hover:bg-[#E8F5E9] transition"
              >
                🤖 Ask AI Mentor
              </Link>

              <button
                onClick={handleMarkComplete}
                disabled={completed}
                className={`px-5 py-2.5 rounded-xl text-xs font-black transition cursor-pointer ${
                  completed
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-300 cursor-default"
                    : isMasteryAchieved
                    ? "bg-[#16865A] text-white hover:bg-[#0B7650] shadow-sm"
                    : "bg-slate-200 text-slate-500 cursor-not-allowed"
                }`}
              >
                {completed
                  ? "✓ Verified Complete"
                  : isMasteryAchieved
                  ? "Mark Lesson Complete ✓"
                  : "Locked (80% Quiz Required)"}
              </button>
            </div>
          </section>

          {/* Chronological Navigation Bar (Prev / Next Lesson) */}
          <section className="pt-2 pb-12 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
            {prevLesson ? (
              <Link
                href={"route" in prevLesson && prevLesson.route ? prevLesson.route : `/lessons/${prevLesson.id}`}
                className="w-full sm:w-auto inline-flex items-center justify-between sm:justify-start gap-2.5 px-5 py-3 rounded-2xl border border-[#B9E4C9] bg-white hover:bg-[#E8F5E9] text-xs font-bold text-[#102B24] transition shadow-2xs group"
              >
                <span className="text-[#16865A] font-black group-hover:-translate-x-0.5 transition-transform">←</span>
                <span className="text-[#557267]">Previous:</span>
                <span className="font-black text-[#102B24] truncate max-w-[200px]">{prevLesson.title}</span>
              </Link>
            ) : (
              <div />
            )}

            {nextLesson ? (
              <Link
                href={"route" in nextLesson && nextLesson.route ? nextLesson.route : `/lessons/${nextLesson.id}`}
                className="w-full sm:w-auto inline-flex items-center justify-between sm:justify-start gap-2.5 px-6 py-3 rounded-2xl bg-[#16865A] hover:bg-[#0B7650] text-xs font-black text-white transition shadow-sm group"
              >
                <span>Next Lesson:</span>
                <span className="truncate max-w-[200px] font-bold text-white/95">{nextLesson.title}</span>
                <span className="group-hover:translate-x-0.5 transition-transform font-black">→</span>
              </Link>
            ) : (
              <Link
                href="/learning-hub"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#16865A] hover:bg-[#0B7650] text-xs font-black text-white transition shadow-sm"
              >
                <span>🎉 Course Complete! Back to Learning Hub →</span>
              </Link>
            )}
          </section>
        </main>
      </div>
    </AmbientBackground>
  );
}
