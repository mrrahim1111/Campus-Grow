"use client";

import { useState } from "react";
import { getAiLessonResources, VideoRecommendation } from "@/lib/lessonAiRecommendations";

interface LessonAiResourcesProps {
  lessonTitle: string;
  category?: string;
  lessonNumber?: number;
  onDownloadPdf?: () => void;
}

export default function LessonAiResources({
  lessonTitle,
  category = "Engineering",
  lessonNumber = 1,
  onDownloadPdf,
}: LessonAiResourcesProps) {
  const [selectedLang, setSelectedLang] = useState<"en" | "hi" | "te">("en");
  const [activeEmbedVideo, setActiveEmbedVideo] = useState<VideoRecommendation | null>(null);

  const bundle = getAiLessonResources(lessonTitle, category);

  const currentVideos =
    selectedLang === "en"
      ? bundle.englishVideos
      : selectedLang === "hi"
      ? bundle.hindiVideos
      : bundle.teluguVideos;

  const handlePrintPdf = () => {
    if (onDownloadPdf) {
      onDownloadPdf();
      return;
    }
    window.print();
  };

  return (
    <section className="space-y-8 my-8 print:my-0">
      {/* ── Action Bar: AI Video Recs in 3 Languages + 1 Full Lesson PDF ── */}
      <div className="rounded-3xl bg-white border border-[#B9E4C9] p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🤖</span>
            <h3 className="text-base font-black text-[#102B24]">
              AI Masterclass Recommender &amp; Study Pack
            </h3>
          </div>
          <p className="text-xs text-[#557267] mt-1">
            Top-ranked lecture recommendations in 3 languages + instant textbook PDF generator.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={handlePrintPdf}
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#16865A] hover:bg-[#0B7650] text-white text-xs font-black shadow-xs transition cursor-pointer"
          >
            <span>📥</span>
            <span>Download Full Lesson PDF</span>
          </button>
        </div>
      </div>

      {/* ── AI Video Masterclasses in 3 Languages ── */}
      <div className="rounded-3xl bg-white border border-[#B9E4C9] overflow-hidden shadow-xs print:hidden">
        <div className="p-5 bg-[#F4FBF6] border-b border-[#B9E4C9]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🎥</span>
              <h3 className="text-sm font-black text-[#102B24] uppercase tracking-wider">
                AI Suggested Lectures in 3 Languages
              </h3>
            </div>
            <p className="text-[11px] text-[#557267] mt-0.5">
              Select your preferred language to watch high-yield lectures tailored for {lessonTitle}.
            </p>
          </div>

          {/* Language Switcher Tabs */}
          <div className="flex items-center bg-white border border-[#B9E4C9] rounded-2xl p-1 shadow-2xs self-start sm:self-auto">
            <button
              onClick={() => {
                setSelectedLang("en");
                setActiveEmbedVideo(null);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
                selectedLang === "en"
                  ? "bg-[#16865A] text-white shadow-xs"
                  : "text-[#557267] hover:text-[#102B24]"
              }`}
            >
              <span>🇬🇧</span>
              <span>English</span>
            </button>
            <button
              onClick={() => {
                setSelectedLang("hi");
                setActiveEmbedVideo(null);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
                selectedLang === "hi"
                  ? "bg-[#16865A] text-white shadow-xs"
                  : "text-[#557267] hover:text-[#102B24]"
              }`}
            >
              <span>🇮🇳</span>
              <span>Hindi (हिंदी)</span>
            </button>
            <button
              onClick={() => {
                setSelectedLang("te");
                setActiveEmbedVideo(null);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
                selectedLang === "te"
                  ? "bg-[#16865A] text-white shadow-xs"
                  : "text-[#557267] hover:text-[#102B24]"
              }`}
            >
              <span>🇮🇳</span>
              <span>Telugu (తెలుగు)</span>
            </button>
          </div>
        </div>

        {/* Embedded player if user selects to preview */}
        {activeEmbedVideo?.youtubeEmbedId && (
          <div className="p-4 sm:p-6 bg-slate-950 border-b border-[#B9E4C9]/40">
            <div className="max-w-3xl mx-auto space-y-3">
              <div className="flex items-center justify-between text-white">
                <span className="text-xs font-bold text-emerald-400">
                  ▶ Now Playing: {activeEmbedVideo.title}
                </span>
                <button
                  onClick={() => setActiveEmbedVideo(null)}
                  className="text-xs font-bold text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 cursor-pointer"
                >
                  ✕ Close Player
                </button>
              </div>
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeEmbedVideo.youtubeEmbedId}?autoplay=1&rel=0`}
                  title={activeEmbedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              </div>
            </div>
          </div>
        )}

        {/* Video Cards Grid */}
        <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {currentVideos.map((video) => (
            <div
              key={video.id}
              className="rounded-2xl border border-[#B9E4C9] bg-white p-4 flex flex-col justify-between hover:border-[#16865A] hover:shadow-md transition duration-200"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-[#E8F5E9] text-[#0B7650] border border-[#B9E4C9]">
                    {video.channel} {video.verifiedChannelBadge && "✓"}
                  </span>
                  <span className="text-[10px] font-bold text-[#557267]">
                    ⏱️ {video.duration}
                  </span>
                </div>

                <h4 className="text-xs font-black text-[#102B24] line-clamp-2 leading-snug">
                  {video.title}
                </h4>

                <p className="text-[11px] text-[#557267] line-clamp-2 leading-relaxed">
                  {video.summary}
                </p>
              </div>

              <div className="pt-4 flex items-center gap-2">
                {video.youtubeEmbedId && (
                  <button
                    onClick={() => setActiveEmbedVideo(video)}
                    className="flex-1 py-1.5 px-2 rounded-xl text-[11px] font-bold text-[#16865A] bg-[#E8F5E9] hover:bg-[#B9E4C9]/40 border border-[#B9E4C9] transition text-center cursor-pointer"
                  >
                    Quick Preview
                  </button>
                )}

                <a
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                    video.searchQuery
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-1.5 px-2 rounded-xl text-[11px] font-black text-white bg-[#16865A] hover:bg-[#0B7650] transition text-center shadow-2xs"
                >
                  YouTube →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Architecture Visual Graph & Flow Diagram ── */}
      <div className="rounded-3xl bg-white border border-[#B9E4C9] p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#B9E4C9]/40 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">📊</span>
            <h3 className="text-sm sm:text-base font-black text-[#102B24]">
              Visual Concept Architecture &amp; Execution Pipeline
            </h3>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E8F5E9] text-[#16865A]">
            Mental Model
          </span>
        </div>

        <p className="text-xs text-[#557267] leading-relaxed">
          Study this end-to-end structural flow to visualize internal execution, state transformations, and memory boundaries.
        </p>

        <div className="rounded-2xl bg-slate-950 p-4 sm:p-5 overflow-x-auto shadow-inner">
          <pre className="font-mono text-xs text-[#75C99A] leading-relaxed select-all">
            {bundle.architectureDiagram.trim()}
          </pre>
        </div>
      </div>

      {/* ── Comprehensive Comparison Master Table ── */}
      <div className="rounded-3xl bg-white border border-[#B9E4C9] p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#B9E4C9]/40 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚖️</span>
            <h3 className="text-sm sm:text-base font-black text-[#102B24]">
              Engineering Trade-Offs &amp; Comparison Table
            </h3>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E8F5E9] text-[#16865A]">
            System Design
          </span>
        </div>

        <p className="text-xs text-[#557267] leading-relaxed">
          Critical comparison matrix to evaluate performance characteristics, memory overhead, and industry trade-offs.
        </p>

        <div className="overflow-x-auto rounded-2xl border border-[#B9E4C9]">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#E8F5E9] text-[#102B24] border-b border-[#B9E4C9]">
                {bundle.comparisonTable.headers.map((header, hIdx) => (
                  <th key={hIdx} className="p-3 font-black">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#B9E4C9]/40">
              {bundle.comparisonTable.rows.map((row, rIdx) => (
                <tr
                  key={rIdx}
                  className={rIdx % 2 === 0 ? "bg-white" : "bg-[#F4FBF6]/50"}
                >
                  {row.map((cell, cIdx) => (
                    <td
                      key={cIdx}
                      className={`p-3 text-[#102B24] ${
                        cIdx === 0 ? "font-bold text-[#0B7650]" : ""
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Cheat Sheet & Anti-Pattern Traps ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Quick Cheat Sheet */}
        <div className="rounded-3xl bg-white border border-[#B9E4C9] p-6 space-y-3 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="text-base">⚡</span>
            <h4 className="text-xs font-black uppercase text-[#102B24]">
              High-Yield Quick Cheat Sheet
            </h4>
          </div>
          <ul className="space-y-2 text-xs text-[#102B24]">
            {bundle.cheatSheetSummary.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#16865A] font-bold">✓</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Traps & Anti-Patterns */}
        <div className="rounded-3xl bg-white border border-rose-200 p-6 space-y-3 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="text-base">⚠️</span>
            <h4 className="text-xs font-black uppercase text-rose-800">
              Placement Interview Traps &amp; Common Pitfalls
            </h4>
          </div>
          <ul className="space-y-2 text-xs text-rose-950">
            {bundle.keyTrapsAndPitfalls.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">✗</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
