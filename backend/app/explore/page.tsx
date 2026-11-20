"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import AmbientBackground from "@/components/AmbientBackground";
import {
  ENGINEERING_DOMAINS,
  getAllHubCourses,
  HubCourse,
  HubDomain,
  getHubStats,
} from "@/data/engineeringHub";

function ExploreContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialQuery = searchParams.get("q") || "";
  const initialDomain = searchParams.get("domain") || "ALL";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedDomain, setSelectedDomain] = useState(initialDomain);
  const [selectedDifficulty, setSelectedDifficulty] = useState("ALL");
  const [selectedTech, setSelectedTech] = useState("ALL");
  const [selectedBranch, setSelectedBranch] = useState("ALL");
  const [studentBranch, setStudentBranch] = useState("CSE");
  const [previewCourse, setPreviewCourse] = useState<HubCourse | null>(null);

  // Sync state if URL query changes
  useEffect(() => {
    const q = searchParams.get("q");
    if (q !== null && q !== searchQuery) {
      setSearchQuery(q);
    }
  }, [searchParams]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("studentData");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.branch) {
          setStudentBranch(parsed.branch);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const stats = useMemo(() => getHubStats(), []);
  const allCourses = useMemo(() => getAllHubCourses(), []);

  // Collect distinct technologies
  const allTechnologies = useMemo(() => {
    const set = new Set<string>();
    allCourses.forEach((c) => c.technologies.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [allCourses]);

  // Branch mapping to relevant domain keywords
  const branchDomainMap: Record<string, string[]> = {
    CSE: ["cs-fundamentals", "programming-languages", "web-development", "cloud-and-devops", "databases-and-data-engineering"],
    IT: ["web-development", "cloud-and-devops", "databases-and-data-engineering", "software-engineering-tools"],
    CAI: ["ai-and-ml", "ai-tools-and-agents", "programming-languages", "cs-fundamentals"],
    AID: ["ai-and-ml", "data-science-and-analytics", "databases-and-data-engineering", "ai-tools-and-agents"],
    CSM: ["ai-and-ml", "cs-fundamentals", "data-science-and-analytics", "programming-languages"],
    CYS: ["cybersecurity", "cs-fundamentals", "cloud-and-devops", "programming-languages"],
    SE: ["software-engineering-tools", "web-development", "practical-projects", "cs-fundamentals"],
    DS: ["data-science-and-analytics", "databases-and-data-engineering", "ai-and-ml", "programming-languages"],
    CSD: ["web-development", "mobile-app-development", "practical-projects", "software-engineering-tools"],
    IOT: ["emerging-tech", "programming-languages", "cloud-and-devops", "cs-fundamentals"],
  };

  // Filtered courses
  const filteredCourses = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return allCourses.filter((course) => {
      // Domain filter
      if (selectedDomain !== "ALL" && course.domainId !== selectedDomain) {
        return false;
      }

      // Difficulty filter
      if (selectedDifficulty !== "ALL" && course.difficulty !== selectedDifficulty) {
        return false;
      }

      // Technology filter
      if (selectedTech !== "ALL" && !course.technologies.some((t) => t.toLowerCase() === selectedTech.toLowerCase())) {
        return false;
      }

      // Branch filter (only applies when viewing all domains without a specific domain selected)
      if (selectedBranch !== "ALL" && selectedDomain === "ALL") {
        const allowedDomains = branchDomainMap[selectedBranch] || [];
        if (!allowedDomains.includes(course.domainId)) {
          // If not in preferred domains, also check if tech matches
          const branchMatchesTech = course.technologies.some((t) =>
            t.toLowerCase().includes(selectedBranch.toLowerCase())
          );
          if (!branchMatchesTech) return false;
        }
      }

      // Text search query
      if (q) {
        const matchTitle = course.title.toLowerCase().includes(q);
        const matchSubtitle = course.subtitle.toLowerCase().includes(q);
        const matchDesc = course.description.toLowerCase().includes(q);
        const matchTech = course.technologies.some((t) => t.toLowerCase().includes(q));
        const matchCareer = course.careerTags.some((c) => c.toLowerCase().includes(q));
        if (!matchTitle && !matchSubtitle && !matchDesc && !matchTech && !matchCareer) {
          return false;
        }
      }

      return true;
    });
  }, [allCourses, selectedDomain, selectedDifficulty, selectedTech, selectedBranch, searchQuery]);

  // Recommended courses for user's branch
  const recommendedCourses = useMemo(() => {
    const targetDomains = branchDomainMap[studentBranch] || ["cs-fundamentals", "ai-and-ml"];
    return allCourses.filter((c) => targetDomains.includes(c.domainId)).slice(0, 3);
  }, [allCourses, studentBranch]);

  // Featured trending courses
  const trendingCourses = useMemo(() => {
    return allCourses.filter((c) => c.featured).slice(0, 4);
  }, [allCourses]);

  const branches = ["ALL", "CSE", "IT", "CAI", "AID", "CSM", "CYS", "SE", "DS", "CSD", "IOT"];
  const difficulties = ["ALL", "Beginner", "Intermediate", "Advanced"];

  return (
    <AmbientBackground intensity="catalog">
      <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto space-y-10">
        {/* Top Header Hero */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#B9E4C9]/40 via-white to-[#E8F5E9]/60 border border-white/90 p-8 sm:p-12 shadow-sm backdrop-blur-xl">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#16865A]/10 text-[#0B7650] border border-[#B9E4C9] text-xs font-black uppercase tracking-wider">
              <span>🧭</span>
              <span>CampusGrow Complete Engineering Knowledge Hub</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#102B24] tracking-tight leading-tight">
              Explore 15 Engineering Domains &amp; Modern Technologies
            </h1>

            <p className="text-sm sm:text-base text-[#557267] font-medium leading-relaxed">
              From foundational C systems and operating systems to autonomous AI agents, PyTorch transformers, distributed Go microservices, and cloud DevOps. Rigorous curricula designed for all computer science disciplines.
            </p>

            {/* Quick stats banner */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-bold text-[#102B24]">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#B9E4C9] shadow-2xs">
                <span className="text-[#16865A]">📚</span>
                <span>{stats.totalDomains} Major Domains</span>
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#B9E4C9] shadow-2xs">
                <span className="text-[#16865A]">🎯</span>
                <span>{stats.totalCourses} Master Courses</span>
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#B9E4C9] shadow-2xs">
                <span className="text-[#16865A]">⚡</span>
                <span>{stats.totalLessons} Structured Lessons</span>
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#E8F5E9] text-[#0B7650] border border-[#B9E4C9] shadow-2xs">
                <span>📹</span>
                <span>Verified Lectures &amp; Notes</span>
              </span>
            </div>
          </div>
        </div>

        {/* Search & Multi-Faceted Filter Controls */}
        <div className="space-y-4 rounded-3xl bg-white/80 border border-white/90 p-6 shadow-sm backdrop-blur-xl">
          {/* Universal Search Input */}
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#557267] text-lg">
              🔍
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by technology (Python, Docker, Rust, PyTorch, React, SQL), AI tools (Cursor, Ollama, LangChain), or career goals..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl text-sm bg-white/90 border border-[#B9E4C9] text-[#102B24] placeholder-[#557267] focus:outline-none focus:ring-2 focus:ring-[#16865A] shadow-xs transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#557267] hover:text-[#102B24] bg-[#E8F5E9] px-2.5 py-1 rounded-lg"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter Row 1: Branch & Difficulty Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div>
              <label className="block text-[11px] font-black uppercase text-[#557267] mb-1">
                Target CS Branch
              </label>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs font-bold bg-white border border-[#B9E4C9] text-[#102B24] focus:outline-none focus:ring-2 focus:ring-[#16865A]"
              >
                {branches.map((b) => (
                  <option key={b} value={b}>
                    {b === "ALL" ? "All Engineering Branches" : `${b} Discipline`}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-black uppercase text-[#557267] mb-1">
                Difficulty Level
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs font-bold bg-white border border-[#B9E4C9] text-[#102B24] focus:outline-none focus:ring-2 focus:ring-[#16865A]"
              >
                {difficulties.map((d) => (
                  <option key={d} value={d}>
                    {d === "ALL" ? "All Difficulty Levels" : d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-black uppercase text-[#557267] mb-1">
                Specific Technology / Framework
              </label>
              <select
                value={selectedTech}
                onChange={(e) => setSelectedTech(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs font-bold bg-white border border-[#B9E4C9] text-[#102B24] focus:outline-none focus:ring-2 focus:ring-[#16865A]"
              >
                <option value="ALL">All Technologies &amp; Packages</option>
                {allTechnologies.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Filter Row 2: 15 Domain Pills Scroll */}
          <div className="pt-3 border-t border-[#B9E4C9]/40">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#557267]">
                Filter by 15 Major Knowledge Domains:
              </span>
              <span className="text-[10px] font-bold text-[#16865A]">
                {filteredCourses.length} courses matching
              </span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
              <button
                onClick={() => setSelectedDomain("ALL")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                  selectedDomain === "ALL"
                    ? "bg-[#16865A] text-white shadow-xs"
                    : "bg-white text-[#102B24] border border-[#B9E4C9] hover:bg-[#E8F5E9]"
                }`}
              >
                All 15 Domains
              </button>

              {ENGINEERING_DOMAINS.map((domain) => (
                <button
                  key={domain.id}
                  onClick={() => setSelectedDomain(domain.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                    selectedDomain === domain.id
                      ? "bg-[#16865A] text-white shadow-xs"
                      : "bg-white text-[#102B24] border border-[#B9E4C9] hover:bg-[#E8F5E9]"
                  }`}
                >
                  <span>{domain.icon}</span>
                  <span>{domain.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Section 1: Recommended for Student's Branch */}
        {selectedDomain === "ALL" && !searchQuery && selectedTech === "ALL" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-[#102B24] flex items-center gap-2">
                  <span>🎯</span>
                  <span>Recommended for {studentBranch} Engineering</span>
                </h2>
                <p className="text-xs text-[#557267] font-medium mt-0.5">
                  High-priority core engineering curricula aligned with your departmental semester roadmaps.
                </p>
              </div>
              <Link
                href="/learning-hub"
                className="text-xs font-black text-[#16865A] hover:underline flex items-center gap-1"
              >
                <span>Learning Hub</span>
                <span>→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendedCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onPreview={() => setPreviewCourse(course)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Section 2: Trending Across Industry */}
        {selectedDomain === "ALL" && !searchQuery && selectedTech === "ALL" && (
          <div className="space-y-4 pt-4 border-t border-[#B9E4C9]/40">
            <div>
              <h2 className="text-xl font-black text-[#102B24] flex items-center gap-2">
                <span>🔥</span>
                <span>Trending Industry Specializations</span>
              </h2>
              <p className="text-xs text-[#557267] font-medium mt-0.5">
                Modern AI, systems engineering, cloud architecture, and high-performance technologies in top demand.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {trendingCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  compact
                  onPreview={() => setPreviewCourse(course)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Section 3: All Filtered Courses */}
        <div className="space-y-6 pt-4 border-t border-[#B9E4C9]/40">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-[#102B24] flex items-center gap-2">
                <span>📚</span>
                <span>Course Catalog ({filteredCourses.length})</span>
              </h2>
              <p className="text-xs text-[#557267] font-medium mt-0.5">
                Every course includes learning objectives, full-class video lectures, verified notes, and coding challenges.
              </p>
            </div>

            {(selectedDomain !== "ALL" || selectedDifficulty !== "ALL" || selectedTech !== "ALL" || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedDomain("ALL");
                  setSelectedDifficulty("ALL");
                  setSelectedTech("ALL");
                  setSelectedBranch("ALL");
                  setSearchQuery("");
                }}
                className="text-xs font-black text-rose-600 hover:text-rose-700 bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-200 transition"
              >
                Reset All Filters
              </button>
            )}
          </div>

          {filteredCourses.length === 0 ? (
            <div className="rounded-3xl bg-white border border-[#B9E4C9] p-12 text-center space-y-3">
              <span className="text-4xl">🔍</span>
              <h3 className="text-lg font-black text-[#102B24]">No courses matched your search criteria</h3>
              <p className="text-xs text-[#557267] max-w-md mx-auto">
                Try loosening your filters or searching for foundational topics like &quot;C&quot;, &quot;Python&quot;, &quot;React&quot;, &quot;SQL&quot;, or &quot;Algorithms&quot;.
              </p>
              <button
                onClick={() => {
                  setSelectedDomain("ALL");
                  setSelectedDifficulty("ALL");
                  setSelectedTech("ALL");
                  setSearchQuery("");
                }}
                className="mt-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#16865A] hover:bg-[#0B7650] transition"
              >
                View All Courses
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onPreview={() => setPreviewCourse(course)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Syllabus / Course Preview Modal */}
        {previewCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
            <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-white border border-white/90 shadow-2xl p-6 sm:p-8 space-y-6">
              {/* Close button */}
              <button
                onClick={() => setPreviewCourse(null)}
                className="absolute top-5 right-5 p-2 rounded-xl text-[#557267] hover:text-[#102B24] hover:bg-[#E8F5E9] transition"
              >
                ✕
              </button>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-black uppercase px-2.5 py-0.5 rounded-full bg-[#E8F5E9] text-[#16865A] border border-[#B9E4C9]">
                    {previewCourse.difficulty}
                  </span>
                  <span className="text-xs font-bold text-[#557267]">
                    ⏱️ {previewCourse.duration || `${previewCourse.durationHours || 40} Hours`}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-[#102B24]">
                  {previewCourse.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#557267] mt-1 font-medium">
                  {previewCourse.subtitle}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#E8F5E9]/60 border border-[#B9E4C9]">
                <h4 className="text-xs font-black uppercase text-[#0B7650] mb-1">Course Description</h4>
                <p className="text-xs text-[#102B24] leading-relaxed">
                  {previewCourse.description}
                </p>
              </div>

              {/* Technologies */}
              <div>
                <h4 className="text-xs font-black uppercase text-[#557267] mb-2">Core Technologies Covered</h4>
                <div className="flex flex-wrap gap-1.5">
                  {previewCourse.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-lg text-xs font-bold bg-[#F4FBF6] border border-[#B9E4C9] text-[#0B7650]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modules & Lessons */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase text-[#557267]">
                  Curriculum Modules ({previewCourse.modules.length} Modules • {previewCourse.modules.reduce((a, m) => a + m.lessons.length, 0)} Lessons)
                </h4>

                {previewCourse.modules.length === 0 ? (
                  <p className="text-xs text-[#557267] italic p-3 rounded-xl bg-slate-50 border border-slate-200">
                    Comprehensive modules and lessons are structured and ready for student enrollment.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {previewCourse.modules.map((m, mIdx) => (
                      <div key={m.id} className="rounded-2xl border border-[#B9E4C9] bg-white p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-[#102B24]">
                            Module {mIdx + 1}: {m.title}
                          </span>
                          <span className="text-[10px] font-bold text-[#557267]">
                            {m.lessons.length} Lessons
                          </span>
                        </div>
                        <p className="text-[11px] text-[#557267]">{m.description}</p>

                        <div className="space-y-1.5 pt-2">
                          {m.lessons.map((lesson) => (
                            <Link
                              key={lesson.id}
                              href={`/lessons/${lesson.id}`}
                              className="flex items-center justify-between p-2 rounded-xl text-xs font-bold bg-[#F4FBF6] hover:bg-[#E8F5E9] text-[#102B24] border border-[#B9E4C9]/60 transition"
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-[#16865A]">📖</span>
                                <span>{lesson.title}</span>
                              </div>
                              <span className="text-[10px] text-[#557267] font-mono">
                                {lesson.duration}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#B9E4C9]/40 flex items-center justify-end gap-3">
                <button
                  onClick={() => setPreviewCourse(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-[#557267] hover:text-[#102B24] bg-white border border-[#B9E4C9]"
                >
                  Close
                </button>

                {previewCourse.modules.length > 0 && previewCourse.modules[0].lessons.length > 0 ? (
                  <Link
                    href={`/lessons/${previewCourse.modules[0].lessons[0].id}`}
                    className="px-5 py-2.5 rounded-xl text-xs font-black text-white bg-[#16865A] hover:bg-[#0B7650] shadow-sm transition"
                  >
                    Start First Lesson →
                  </Link>
                ) : (
                  <Link
                    href={`/courses?track=${previewCourse.id}`}
                    className="px-5 py-2.5 rounded-xl text-xs font-black text-white bg-[#16865A] hover:bg-[#0B7650] shadow-sm transition"
                  >
                    Enroll in Track →
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </AmbientBackground>
  );
}

interface CourseCardProps {
  course: HubCourse;
  compact?: boolean;
  onPreview: () => void;
}

function CourseCard({ course, compact = false, onPreview }: CourseCardProps) {
  const firstLessonId =
    course.modules.length > 0 && course.modules[0].lessons.length > 0
      ? course.modules[0].lessons[0].id
      : null;

  return (
    <div className="group rounded-3xl bg-white border border-[#B9E4C9] hover:border-[#16865A] shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between">
      <div>
        {/* Course Thumbnail Image */}
        <div className="relative h-44 w-full overflow-hidden bg-slate-100">
          <Image
            src={course.image}
            alt={course.title}
            fill
            unoptimized
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Badges on image */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-white/95 text-[#0B7650] shadow-xs">
              {course.difficulty}
            </span>
            {course.featured && (
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-amber-500 text-white shadow-xs">
                ⭐ Featured
              </span>
            )}
          </div>

          <div className="absolute bottom-3 left-3 right-3 text-white">
            <p className="text-[11px] font-bold opacity-90">⏱️ {course.duration || `${course.durationHours || 40} Hours`}</p>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-5 space-y-3">
          <div>
            <h3 className="text-base sm:text-lg font-black text-[#102B24] group-hover:text-[#16865A] transition leading-snug">
              {course.title}
            </h3>
            <p className="text-xs text-[#557267] mt-1 line-clamp-2 leading-relaxed">
              {course.subtitle}
            </p>
          </div>

          {/* Tech pills */}
          <div className="flex flex-wrap gap-1">
            {course.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#E8F5E9] text-[#16865A] border border-[#B9E4C9]"
              >
                {tech}
              </span>
            ))}
            {course.technologies.length > 4 && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600">
                +{course.technologies.length - 4}
              </span>
            )}
          </div>

          {/* Career tags */}
          <div className="pt-2 border-t border-[#B9E4C9]/40 flex items-center gap-1.5 text-[11px] text-[#557267]">
            <span className="font-bold text-[#102B24]">💼 Career:</span>
            <span className="truncate">{course.careerTags.slice(0, 2).join(", ")}</span>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-5 pt-0 flex items-center justify-between gap-2">
        <button
          onClick={onPreview}
          className="flex-1 py-2 rounded-xl text-xs font-bold text-[#102B24] bg-[#F4FBF6] hover:bg-[#E8F5E9] border border-[#B9E4C9] transition text-center cursor-pointer"
        >
          View Syllabus
        </button>

        {firstLessonId ? (
          <Link
            href={`/lessons/${firstLessonId}`}
            className="flex-1 py-2 rounded-xl text-xs font-black text-white bg-[#16865A] hover:bg-[#0B7650] transition text-center shadow-xs"
          >
            Start Now →
          </Link>
        ) : (
          <Link
            href="/learning-hub"
            className="flex-1 py-2 rounded-xl text-xs font-black text-white bg-[#16865A] hover:bg-[#0B7650] transition text-center shadow-xs"
          >
            Explore →
          </Link>
        )}
      </div>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#E8F5E9]">
          <div className="h-8 w-8 rounded-full border-2 border-[#16865A] border-t-transparent animate-spin" />
        </div>
      }
    >
      <ExploreContent />
    </Suspense>
  );
}
