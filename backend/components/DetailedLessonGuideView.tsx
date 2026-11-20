"use client";

import { useState } from "react";
import {
  getDetailedLessonGuide,
  DetailedLessonMasteryGuide,
  DetailedLessonChapter,
} from "@/lib/detailedLessonContent";

interface DetailedLessonGuideViewProps {
  lessonTitle: string;
  category?: string;
  technologies?: string[];
}

export default function DetailedLessonGuideView({
  lessonTitle,
  category = "Computer Science",
  technologies = [],
}: DetailedLessonGuideViewProps) {
  const guide: DetailedLessonMasteryGuide = getDetailedLessonGuide(
    lessonTitle,
    category,
    technologies
  );

  const [activeChapterId, setActiveChapterId] = useState<string>(
    guide.chapters[0]?.id || "ch-1"
  );
  const [selectedLineIdx, setSelectedLineIdx] = useState<number | null>(null);

  const activeChapter =
    guide.chapters.find((c) => c.id === activeChapterId) || guide.chapters[0];

  return (
    <section className="space-y-10 my-10">
      {/* ── Section Title: The Pin-to-Pin Masterclass ── */}
      <div className="border-b border-[#B9E4C9]/60 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">📚</span>
            <h2 className="text-xl sm:text-2xl font-black text-[#102B24] tracking-tight">
              Comprehensive Textbook Deep-Dive (Pin-to-Pin Guide)
            </h2>
          </div>
          <p className="text-xs text-[#557267] mt-1">
            Complete architectural mechanics, line-by-line code annotations, syntax master tables, and placement interview defense. No outside resources required.
          </p>
        </div>

        <span className="text-[11px] font-black uppercase px-3 py-1 rounded-full bg-[#E8F5E9] text-[#16865A] border border-[#B9E4C9] self-start sm:self-auto">
          Exhaustive Reference
        </span>
      </div>

      {/* ── Intuitive Mental Model & Real-World Analogy ── */}
      <div className="rounded-3xl bg-gradient-to-br from-[#F4FBF6] to-white border border-[#B9E4C9] p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-xl">🧠</span>
          <h3 className="text-sm font-black uppercase tracking-wider text-[#0B7650]">
            The Intuitive Mental Model (Zero-Jargon Analogy)
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-[#102B24] font-medium leading-relaxed italic">
          &ldquo;{guide.mentalModelAnalogy}&rdquo;
        </p>

        <div className="pt-2 border-t border-[#B9E4C9]/40">
          <span className="text-[11px] font-black uppercase text-[#557267] block mb-1">
            Why This Exists &amp; What Problem It Solved:
          </span>
          <p className="text-xs text-[#557267] leading-relaxed">
            {guide.whyThisExists}
          </p>
        </div>
      </div>

      {/* ── Chapter Stepper Navigation ── */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {guide.chapters.map((chap) => {
            const isActive = chap.id === activeChapter.id;
            return (
              <button
                key={chap.id}
                onClick={() => {
                  setActiveChapterId(chap.id);
                  setSelectedLineIdx(null);
                }}
                className={`shrink-0 px-4 py-2.5 rounded-2xl text-xs font-black transition cursor-pointer flex items-center gap-2 border ${
                  isActive
                    ? "bg-[#16865A] text-white border-[#16865A] shadow-xs"
                    : "bg-white text-[#557267] border-[#B9E4C9] hover:border-[#16865A] hover:text-[#102B24]"
                }`}
              >
                <span>{chap.icon}</span>
                <span>
                  Chapter {chap.number}: {chap.title.slice(0, 32)}...
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Active Chapter Content Display ── */}
        <article className="rounded-3xl bg-white border border-[#B9E4C9] p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#B9E4C9]/40 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">{activeChapter.icon}</span>
              <h3 className="text-base sm:text-lg font-black text-[#102B24]">
                {activeChapter.title}
              </h3>
            </div>
            <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-[#E8F5E9] text-[#16865A] border border-[#B9E4C9]">
              {activeChapter.badge}
            </span>
          </div>

          <p className="text-xs font-bold text-[#0B7650] leading-relaxed">
            {activeChapter.summary}
          </p>

          {/* Deep-Dive Paragraphs */}
          <div className="space-y-4 text-xs sm:text-sm text-[#102B24] leading-relaxed">
            {activeChapter.deepDiveParagraphs.map((para, pIdx) => (
              <p key={pIdx} className="font-medium leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          {/* Visual Architecture Diagram if available */}
          {activeChapter.visualDiagram && (
            <div className="pt-4 space-y-2">
              <span className="text-[11px] font-black uppercase text-[#557267] block">
                Internal Architecture &amp; Memory Diagram:
              </span>
              <div className="rounded-2xl bg-slate-950 p-4 sm:p-5 overflow-x-auto shadow-inner">
                <pre className="font-mono text-xs text-[#75C99A] leading-relaxed">
                  {activeChapter.visualDiagram.trim()}
                </pre>
              </div>
            </div>
          )}

          {/* Annotated Code Block with Line Explanations */}
          {activeChapter.annotatedCode && (
            <div className="pt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base">💻</span>
                  <span className="text-xs font-black uppercase text-[#102B24]">
                    Production Code Walkthrough ({activeChapter.annotatedCode.filename})
                  </span>
                </div>
                <span className="text-[10px] text-[#557267] italic hidden sm:inline">
                  Click any annotated line to inspect runtime execution
                </span>
              </div>

              <div className="rounded-2xl bg-slate-950 p-4 font-mono text-xs text-slate-200 overflow-x-auto">
                <pre className="space-y-1">
                  {activeChapter.annotatedCode.code.split("\n").map((lineText, lIdx) => (
                    <div
                      key={lIdx}
                      className="hover:bg-slate-800/80 px-2 py-0.5 rounded transition cursor-default"
                    >
                      <span className="inline-block w-8 text-slate-500 select-none text-right mr-3 font-mono text-[11px]">
                        {lIdx + 1}
                      </span>
                      <span className="text-[#B9E4C9]">{lineText}</span>
                    </div>
                  ))}
                </pre>
              </div>

              {/* Line Explanations Card */}
              <div className="p-4 rounded-2xl bg-[#F4FBF6] border border-[#B9E4C9] space-y-2.5">
                <span className="text-xs font-black uppercase text-[#0B7650] block">
                  Line-by-Line Architectural Annotations:
                </span>
                <div className="space-y-2">
                  {activeChapter.annotatedCode.lineExplanations.map((exp, eIdx) => (
                    <div key={eIdx} className="text-xs space-y-0.5">
                      <code className="px-1.5 py-0.5 rounded bg-white border border-[#B9E4C9] font-mono text-[11px] font-bold text-[#102B24]">
                        {exp.line}
                      </code>
                      <p className="text-[#557267] pl-2 text-[11px] leading-relaxed">
                        ↳ {exp.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Traps and Key Takeaways */}
          <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
              <span className="text-xs font-black uppercase text-amber-900 flex items-center gap-1.5">
                <span>⚠️</span>
                <span>Industrial Traps &amp; Silent Bugs:</span>
              </span>
              <ul className="space-y-1.5 text-xs text-amber-950">
                {activeChapter.productionTraps.map((trap, tIdx) => (
                  <li key={tIdx} className="flex items-start gap-1.5">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{trap}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
              <span className="text-xs font-black uppercase text-emerald-900 flex items-center gap-1.5">
                <span>✓</span>
                <span>Key Chapter Takeaways:</span>
              </span>
              <ul className="space-y-1.5 text-xs text-emerald-950">
                {activeChapter.keyTakeaways.map((take, tkIdx) => (
                  <li key={tkIdx} className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{take}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      </div>

      {/* ── Syntax Master Reference Table ── */}
      <div className="rounded-3xl bg-white border border-[#B9E4C9] p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#B9E4C9]/40 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">📋</span>
            <h3 className="text-sm sm:text-base font-black text-[#102B24]">
              Pin-to-Pin Syntax, Method &amp; Complexity Reference
            </h3>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E8F5E9] text-[#16865A]">
            Cheatsheet
          </span>
        </div>

        <p className="text-xs text-[#557267] leading-relaxed">
          Comprehensive reference table covering method signatures, time complexity bounds, return types, and usage warnings.
        </p>

        <div className="overflow-x-auto rounded-2xl border border-[#B9E4C9]">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#E8F5E9] text-[#102B24] border-b border-[#B9E4C9]">
                <th className="p-3 font-black">Token / Method</th>
                <th className="p-3 font-black">Signature</th>
                <th className="p-3 font-black">Complexity</th>
                <th className="p-3 font-black">Return Type</th>
                <th className="p-3 font-black">Practical Usage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#B9E4C9]/40">
              {guide.syntaxTable.map((item, sIdx) => (
                <tr
                  key={sIdx}
                  className={sIdx % 2 === 0 ? "bg-white" : "bg-[#F4FBF6]/50"}
                >
                  <td className="p-3 font-mono font-bold text-[#0B7650]">
                    {item.tokenOrMethod}
                  </td>
                  <td className="p-3 font-mono text-[11px] text-[#557267]">
                    {item.signature}
                  </td>
                  <td className="p-3 font-mono text-[11px] font-bold text-blue-700">
                    {item.complexity}
                  </td>
                  <td className="p-3 text-[11px] text-[#102B24]">
                    {item.returnType}
                  </td>
                  <td className="p-3 text-[11px] text-[#102B24]">
                    <p>{item.practicalUsage}</p>
                    {item.warningNote && (
                      <p className="text-[10px] text-amber-700 mt-0.5">
                        ⚠️ {item.warningNote}
                      </p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Placement Interview Defense (FAANG & Tier-1 Scenarios) ── */}
      <div className="rounded-3xl bg-white border border-[#B9E4C9] p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#B9E4C9]/40 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎯</span>
            <h3 className="text-sm sm:text-base font-black text-[#102B24]">
              Placement Technical Interview Defense (Tier-1 Product Scenarios)
            </h3>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E8F5E9] text-[#16865A]">
            Interview Ready
          </span>
        </div>

        <p className="text-xs text-[#557267] leading-relaxed">
          How to answer senior technical placement questions with architectural depth, handling edge cases and gotchas.
        </p>

        <div className="space-y-4">
          {guide.placementInterviewDefense.map((qa, qIdx) => (
            <div
              key={qIdx}
              className="p-5 rounded-2xl bg-[#F4FBF6] border border-[#B9E4C9] space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h4 className="text-xs sm:text-sm font-black text-[#102B24]">
                  Q{qIdx + 1}: &ldquo;{qa.question}&rdquo;
                </h4>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-white border border-[#B9E4C9] text-[#0B7650] self-start sm:self-auto">
                  Testing: {qa.testedSkill}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#B9E4C9]/60 space-y-1.5">
                <span className="text-[11px] font-black uppercase text-[#16865A] block">
                  Model Staff Engineer Answer:
                </span>
                <p className="text-xs text-[#102B24] leading-relaxed">
                  {qa.modelAnswer}
                </p>
              </div>

              <div className="text-[11px] text-rose-800 font-medium flex items-start gap-1.5 pt-1">
                <span className="font-bold text-rose-600">Gotcha Trap:</span>
                <span>{qa.gotchaPitfall}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Production Readiness Checklist ── */}
      <div className="rounded-3xl bg-white border border-[#B9E4C9] p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-xl">🚀</span>
          <h3 className="text-sm sm:text-base font-black text-[#102B24]">
            Production Readiness &amp; Verification Checklist
          </h3>
        </div>
        <p className="text-xs text-[#557267]">
          Before shipping code involving {lessonTitle} to production, verify all 5 architectural rules:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {guide.productionReadinessChecklist.map((rule, rIdx) => (
            <div
              key={rIdx}
              className="p-3.5 rounded-2xl bg-[#F4FBF6] border border-[#B9E4C9] flex items-start gap-2.5"
            >
              <span className="h-5 w-5 rounded-full bg-[#16865A] text-white flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                ✓
              </span>
              <p className="text-xs text-[#102B24] font-medium leading-relaxed">
                {rule}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
