"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AmbientBackground from "@/components/AmbientBackground";
import {
  LIVE_COHORTS,
  UPCOMING_MASTERCLASSES,
  FEATURED_MENTORS,
  LiveCohort,
  Masterclass,
} from "@/data/cohortsData";

export default function LiveCohortsPage() {
  const [activeTab, setActiveTab] = useState<"cohorts" | "masterclasses" | "recordings">("cohorts");
  const [selectedCohort, setSelectedCohort] = useState<LiveCohort | null>(null);
  const [selectedMasterclass, setSelectedMasterclass] = useState<Masterclass | null>(null);
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [expandedWeek, setExpandedWeek] = useState<{ [cohortId: string]: number }>({});
  const [enrolledCohortIds, setEnrolledCohortIds] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [enrollSuccessMessage, setEnrollSuccessMessage] = useState<string | null>(null);

  const toggleWeek = (cohortId: string, weekNum: number) => {
    setExpandedWeek((prev) => ({
      ...prev,
      [cohortId]: prev[cohortId] === weekNum ? 0 : weekNum,
    }));
  };

  const handleEnrollClick = (cohort: LiveCohort) => {
    setSelectedCohort(cohort);
    setSelectedMasterclass(null);
    setEnrollModalOpen(true);
  };

  const handleMasterclassClick = (mc: Masterclass) => {
    setSelectedMasterclass(mc);
    setSelectedCohort(null);
    setEnrollModalOpen(true);
  };

  const handleConfirmEnrollment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      if (selectedCohort) {
        setEnrolledCohortIds((prev) => [...prev, selectedCohort.id]);
        setEnrollSuccessMessage(`Successfully enrolled in ${selectedCohort.title}! Your Google Meet invitation and calendar link have been sent.`);
      } else if (selectedMasterclass) {
        setEnrollSuccessMessage(`Seat confirmed for ${selectedMasterclass.title}! Check your email for joining instructions.`);
      }
      setTimeout(() => {
        setEnrollModalOpen(false);
        setEnrollSuccessMessage(null);
      }, 3000);
    }, 1200);
  };

  return (
    <AmbientBackground intensity="dashboard">
      <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-8">
        
        {/* Top Header Banner */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-2 border-b border-slate-200/60">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 text-xs font-bold rounded-full bg-red-100 text-red-800 border border-red-300 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                Live Cohort Batches
              </span>
              <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                Industry SDE Mentors
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text-dark)] tracking-tight">
              Live Cohorts & Engineering Masterclasses
            </h1>
            <p className="text-sm text-[var(--color-text-secondary)] font-medium max-w-2xl">
              Learn live with Senior Staff Engineers from Google, Microsoft, Uber, and Razorpay. Live weekend code-alongs, 1-on-1 PR reviews, and placement referral access.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="p-1 rounded-2xl glass-surface-elevated border border-white/80 shadow flex items-center gap-1 self-start lg:self-auto">
            <button
              onClick={() => setActiveTab("cohorts")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "cohorts"
                  ? "bg-[#16865A] text-white shadow"
                  : "text-[var(--color-text-secondary)] hover:text-emerald-800 hover:bg-emerald-50"
              }`}
            >
              <span>🔥 6-8 Week Cohorts ({LIVE_COHORTS.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("masterclasses")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "masterclasses"
                  ? "bg-[#16865A] text-white shadow"
                  : "text-[var(--color-text-secondary)] hover:text-emerald-800 hover:bg-emerald-50"
              }`}
            >
              <span>⚡ Weekend Sprints ({UPCOMING_MASTERCLASSES.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("recordings")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "recordings"
                  ? "bg-[#16865A] text-white shadow"
                  : "text-[var(--color-text-secondary)] hover:text-emerald-800 hover:bg-emerald-50"
              }`}
            >
              <span>📼 Class Vault & Notes</span>
            </button>
          </div>
        </div>

        {/* TAB 1: FULL-LENGTH COHORTS */}
        {activeTab === "cohorts" && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Live Countdown & Value Banner */}
            <div className="rounded-3xl glass-surface-elevated p-6 border-2 border-emerald-400/60 shadow-lg bg-gradient-to-r from-emerald-50/80 via-white/95 to-teal-50/70 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-200/60 px-3 py-1 rounded-full border border-emerald-300">
                  ⚡ Mentor Guarantee & Studio Pro Included
                </span>
                <h3 className="text-xl font-extrabold text-[var(--color-text-dark)]">
                  Cohort Enrollees Receive Free Studio Pro Access
                </h3>
                <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] max-w-2xl leading-relaxed">
                  Every enrolled student gets unlimited access to <strong>Project Hub Cloud IDE</strong>, <strong>Workspace Cloud Git Storage</strong>, and <strong>AI Mock Interviews</strong> for the entire duration of their cohort batch.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="text-center p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <span className="block text-2xl font-black text-emerald-700">50</span>
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Seats / Batch</span>
                </div>
                <div className="text-center p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <span className="block text-2xl font-black text-emerald-700">1:1</span>
                  <span className="text-[10px] text-slate-500 font-bold uppercase">PR Reviews</span>
                </div>
                <div className="text-center p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <span className="block text-2xl font-black text-emerald-700">100%</span>
                  <span className="text-[10px] text-slate-500 font-bold uppercase">Live Classes</span>
                </div>
              </div>
            </div>

            {/* Cohorts Grid */}
            <div className="grid grid-cols-1 gap-8">
              {LIVE_COHORTS.map((cohort) => {
                const isEnrolled = enrolledCohortIds.includes(cohort.id);

                return (
                  <div
                    key={cohort.id}
                    className="rounded-3xl glass-surface-elevated p-6 sm:p-8 border border-white/80 shadow-xl space-y-6 transition-all hover:shadow-2xl"
                  >
                    {/* Top Row: Title, Tagline, Badge & Price */}
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                      <div className="space-y-2 max-w-3xl">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-3 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-emerald-600 text-white shadow-xs">
                            {cohort.badge}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-slate-100 text-[var(--color-text-secondary)]">
                            ⏱️ {cohort.durationWeeks} Weeks
                          </span>
                          <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                            🔥 Only {cohort.seatsRemaining} Seats Remaining
                          </span>
                        </div>

                        <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-dark)] tracking-tight">
                          {cohort.title}
                        </h2>

                        <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] font-medium leading-relaxed">
                          {cohort.tagline}
                        </p>
                      </div>

                      <div className="text-left lg:text-right shrink-0 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
                        <span className="text-[10px] text-slate-500 font-bold uppercase block">Complete Cohort Fee</span>
                        <div className="flex items-baseline gap-1 lg:justify-end">
                          <span className="text-3xl font-black text-[var(--color-text-dark)] font-mono">₹{cohort.priceINR.toLocaleString()}</span>
                          <span className="text-xs text-slate-500">/ ${cohort.priceUSD}</span>
                        </div>
                        <span className="text-[10px] text-emerald-700 font-bold block">
                          Includes Studio Pro & Recordings
                        </span>
                      </div>
                    </div>

                    {/* Mentor & Schedule Strip */}
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50/70 to-teal-50/50 border border-emerald-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={cohort.mentor.avatar}
                          alt={cohort.mentor.name}
                          className="w-12 h-12 rounded-2xl object-cover ring-2 ring-emerald-500/40 shadow-xs"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-[var(--color-text-dark)]">{cohort.mentor.name}</h4>
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                              {cohort.mentor.company}
                            </span>
                          </div>
                          <p className="text-xs text-[var(--color-text-secondary)]">
                            {cohort.mentor.role} • {cohort.mentor.experience} Exp • {cohort.mentor.alumniOf}
                          </p>
                        </div>
                      </div>

                      <div className="text-xs text-left sm:text-right space-y-0.5">
                        <p className="font-bold text-[var(--color-text-dark)]">{cohort.startDate}</p>
                        <p className="text-[11px] text-[var(--color-text-secondary)]">{cohort.schedule}</p>
                      </div>
                    </div>

                    {/* Highlights Checklist */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
                      {cohort.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 p-2.5 rounded-xl bg-white/70 border border-slate-100">
                          <span className="text-emerald-600 font-bold">✓</span>
                          <span className="text-[var(--color-text-dark)] font-medium">{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Interactive Week-by-Week Syllabus Accordion */}
                    <div className="space-y-3 pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
                        📚 {cohort.durationWeeks}-Week Curriculum & Capstone Roadmap (Click to inspect)
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {cohort.curriculumWeeks.map((w) => {
                          const isOpen = expandedWeek[cohort.id] === w.week;

                          return (
                            <div
                              key={w.week}
                              onClick={() => toggleWeek(cohort.id, w.week)}
                              className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                                isOpen
                                  ? "bg-emerald-50/90 border-emerald-300 shadow-sm"
                                  : "bg-white/80 border-slate-200/80 hover:bg-slate-50"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
                                    W{w.week}
                                  </span>
                                  <span className="text-xs font-bold text-[var(--color-text-dark)]">{w.title}</span>
                                </div>
                                <span className="text-xs text-slate-400">{isOpen ? "▲" : "▼"}</span>
                              </div>

                              {isOpen && (
                                <div className="mt-3 pt-2 border-t border-slate-200/60 space-y-2 text-xs">
                                  <div>
                                    <span className="font-semibold text-slate-700 block mb-1">Topics covered:</span>
                                    <ul className="list-disc list-inside text-slate-600 space-y-0.5 text-[11px]">
                                      {w.topics.map((t, idx) => (
                                        <li key={idx}>{t}</li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="p-2 rounded-xl bg-white border border-emerald-200 text-[11px]">
                                    <span className="font-bold text-emerald-800">🛠️ Milestone Project: </span>
                                    <span className="text-slate-700 font-medium">{w.handsOnProject}</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="pt-4 border-t border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
                        <span>🔴 Live Streamed on {cohort.meetingPlatform}</span>
                        <span>•</span>
                        <span>Full HD Recordings Available Forever</span>
                      </div>

                      <div className="flex items-center gap-3">
                        {isEnrolled ? (
                          <div className="px-5 py-2.5 rounded-2xl bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center gap-2 border border-emerald-300">
                            <span>✓ Enrolled in Batch</span>
                            <Link href="/workspace" className="underline hover:text-emerald-950">
                              Open Workspace Repos →
                            </Link>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleEnrollClick(cohort)}
                            className="btn-emerald-gradient px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center gap-2"
                          >
                            <span>Enroll in Batch ({cohort.seatsRemaining} Seats Left)</span>
                            <span>→</span>
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* TAB 2: WEEKEND MASTERCLASSES */}
        {activeTab === "masterclasses" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-[var(--color-text-dark)]">
                Intensive 3-Hour Weekend Masterclasses
              </h2>
              <p className="text-xs text-[var(--color-text-secondary)]">
                Focused deep-dives on high-impact engineering topics. Code alongside an industry expert and build a production service in one sitting.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {UPCOMING_MASTERCLASSES.map((mc) => (
                <div
                  key={mc.id}
                  className="rounded-3xl glass-surface-elevated p-6 border border-white/80 shadow-md space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        ⏱️ {mc.durationMinutes} Minutes Live
                      </span>
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {mc.seatsRemaining} Seats Left
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[var(--color-text-dark)] leading-snug">
                      {mc.title}
                    </h3>

                    <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                      {mc.description}
                    </p>

                    {/* Mentor Pill */}
                    <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                      <img src={mc.mentor.avatar} alt={mc.mentor.name} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <p className="font-bold text-[var(--color-text-dark)] text-xs">{mc.mentor.name}</p>
                        <p className="text-[10px] text-slate-500">{mc.mentor.role} @ {mc.mentor.company}</p>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {mc.tags.map((t, i) => (
                        <span key={i} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-lg font-black text-[var(--color-text-dark)] font-mono">₹{mc.priceINR}</span>
                      <span className="text-[10px] text-slate-500 block">{mc.date} • {mc.timeIST}</span>
                    </div>

                    <button
                      onClick={() => handleMasterclassClick(mc)}
                      className="btn-emerald-gradient px-4 py-2 rounded-xl text-xs font-bold shadow cursor-pointer"
                    >
                      Reserve Seat
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: RECORDINGS & NOTES VAULT */}
        {activeTab === "recordings" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-[var(--color-text-dark)]">
                Cohort Recordings & Mentor Slide Vault
              </h2>
              <p className="text-xs text-[var(--color-text-secondary)]">
                All live sessions are recorded in 1080p 60fps with full closed captions, timestamped chapters, and direct repository links.
              </p>
            </div>

            <div className="rounded-3xl glass-surface-elevated p-8 border border-white/80 shadow-md text-center space-y-4">
              <span className="text-4xl block">📼</span>
              <h3 className="text-lg font-bold text-[var(--color-text-dark)]">
                Enrolled Cohort Archive
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)] max-w-md mx-auto">
                Once you enroll in a cohort, your private video vault, mentor code diffs, and slide decks will be populated here automatically.
              </p>
              <button
                onClick={() => setActiveTab("cohorts")}
                className="btn-emerald-gradient px-5 py-2.5 rounded-2xl text-xs font-bold shadow cursor-pointer"
              >
                Browse Upcoming Cohorts →
              </button>
            </div>
          </div>
        )}

      </div>

      {/* ENROLLMENT / PAYMENT MODAL */}
      {enrollModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-3xl glass-surface-elevated p-6 sm:p-8 border border-white/80 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎓</span>
                <h3 className="text-base sm:text-lg font-bold text-[var(--color-text-dark)]">
                  Confirm Cohort Admission
                </h3>
              </div>
              <button
                onClick={() => setEnrollModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {enrollSuccessMessage ? (
              <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-center space-y-2 text-xs text-emerald-900 font-medium">
                <span className="text-3xl block">🎉</span>
                <p className="text-sm font-bold text-emerald-950">Admission Confirmed!</p>
                <p>{enrollSuccessMessage}</p>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                  <p className="font-bold text-[var(--color-text-dark)] text-sm">
                    {selectedCohort?.title || selectedMasterclass?.title}
                  </p>
                  <p className="text-slate-600">
                    Lead Mentor: <strong>{selectedCohort?.mentor.name || selectedMasterclass?.mentor.name}</strong> ({selectedCohort?.mentor.company || selectedMasterclass?.mentor.company})
                  </p>
                  <div className="pt-2 border-t border-slate-100 flex justify-between font-bold text-sm">
                    <span>Total Investment:</span>
                    <span className="text-emerald-700 font-mono">
                      ₹{(selectedCohort?.priceINR || selectedMasterclass?.priceINR || 0).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 text-slate-600">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600">✓</span>
                    <span>Direct access to live Google Meet sessions with mentor Q&A</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600">✓</span>
                    <span>1-on-1 code reviews on your milestone project pull requests</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600">✓</span>
                    <span>Full Studio Pro suite (Cloud IDE & Workspace Git storage) included</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200/60 flex items-center justify-end gap-3">
                  <button
                    onClick={() => setEnrollModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold glass-surface cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmEnrollment}
                    disabled={isProcessing}
                    className="btn-emerald-gradient px-6 py-2.5 rounded-xl text-xs font-bold shadow cursor-pointer disabled:opacity-50 flex items-center gap-2"
                  >
                    {isProcessing ? "Processing Admission..." : "Confirm & Pay with Razorpay / Stripe →"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </AmbientBackground>
  );
}
