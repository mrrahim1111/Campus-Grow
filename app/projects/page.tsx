"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cProjects } from "@/data/projects";
import PaywallGate from "@/components/PaywallGate";

const DIFFICULTY_COLORS: Record<string, string> = {
  Beginner: "bg-emerald-50 text-emerald-800 border-emerald-200",
  Intermediate: "bg-amber-50 text-amber-800 border-amber-200",
  Advanced: "bg-purple-50 text-purple-800 border-purple-200",
};

const CATEGORY_ICONS: Record<string, string> = {
  "Systems & C": "⚙️",
  "Fullstack AI SaaS": "🤖",
  "Backend & Microservices": "🔧",
  "Cloud & DevOps": "☁️",
  "Edge AI & Web3": "🌐",
};

export default function ProjectsPage() {
  const router = useRouter();
  const [completedProjects, setCompletedProjects] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("completedProjects") || "[]"
      );
      setCompletedProjects(saved);
    } catch {
      // Ignore parse error
    }
  }, []);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(cProjects.map((p) => p.category)));
    return ["All", ...cats];
  }, []);

  const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

  const filteredProjects = useMemo(() => {
    return cProjects.filter((project) => {
      const matchesCategory =
        selectedCategory === "All" || project.category === selectedCategory;
      const matchesDifficulty =
        selectedDifficulty === "All" || project.difficulty === selectedDifficulty;
      const matchesSearch =
        searchQuery === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.skillsRequired.some((s) =>
          s.toLowerCase().includes(searchQuery.toLowerCase())
        );

      return matchesCategory && matchesDifficulty && matchesSearch;
    });
  }, [selectedCategory, selectedDifficulty, searchQuery]);

  const completedCount = completedProjects.length;
  const totalCount = cProjects.length;
  const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <PaywallGate featureKey="projects">
      <main className="min-h-screen bg-[#F8FAFC] text-gray-900 font-sans">
        {/* ── Header ──────────────────────────────────────────────── */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-8 py-5">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-500 text-white text-xl shadow-sm">
                    🛠️
                  </span>
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight">
                      Project Lab
                    </h1>
                    <p className="text-xs text-gray-500 font-medium">
                      Build real engineering projects with AI-guided blueprints
                    </p>
                  </div>
                </div>
              </div>

              {/* Progress Summary */}
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Portfolio
                  </p>
                  <p className="text-lg font-black text-gray-950">
                    {completedCount}
                    <span className="text-sm font-bold text-gray-400">
                      {" "}/ {totalCount}
                    </span>
                  </p>
                </div>
                <div className="w-20 h-20 relative">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#8b5cf6"
                      strokeWidth="3"
                      strokeDasharray={`${progressPct}, 100`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-black text-purple-700">
                    {progressPct}%
                  </span>
                </div>
              </div>
            </div>

            {/* Back link */}
            <Link
              href="/learning-hub"
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-700 transition"
            >
              ← Back to Learning Hub
            </Link>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6">
          {/* ── Filters ─────────────────────────────────────────── */}
          <div className="flex flex-col gap-4 mb-8">
            {/* Search bar */}
            <div className="relative max-w-md">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400 text-sm">
                🔍
              </span>
              <input
                type="text"
                placeholder="Search projects or technologies…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm font-medium text-gray-800 placeholder:text-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 focus:outline-none transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 text-xs text-gray-400 hover:text-gray-700 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filter pills row */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              {/* Difficulty */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Level
                </span>
                <div className="flex gap-1.5">
                  {difficulties.map((diff) => (
                    <button
                      key={diff}
                      onClick={() => setSelectedDifficulty(diff)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                        selectedDifficulty === diff
                          ? "bg-gray-900 text-white shadow-sm"
                          : "bg-white text-gray-600 border border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div className="flex items-center gap-2 overflow-x-auto">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider shrink-0">
                  Type
                </span>
                <div className="flex gap-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                        selectedCategory === cat
                          ? "bg-gray-900 text-white shadow-sm"
                          : "bg-white text-gray-600 border border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      {cat !== "All" ? `${CATEGORY_ICONS[cat] || "📦"} ` : ""}
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Results count ─────────────────────────────────────── */}
          <div className="flex items-center justify-between mb-5">
            <p className="text-xs font-bold text-gray-400">
              {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""} found
            </p>
            {(selectedCategory !== "All" || selectedDifficulty !== "All" || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedDifficulty("All");
                  setSearchQuery("");
                }}
                className="text-xs font-bold text-purple-600 hover:text-purple-800 cursor-pointer"
              >
                Clear all filters
              </button>
            )}
          </div>

          {/* ── Projects Grid ─────────────────────────────────────── */}
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => {
              const isCompleted = completedProjects.includes(project.id);
              const diffColor = DIFFICULTY_COLORS[project.difficulty] || "bg-gray-50 text-gray-800 border-gray-200";

              return (
                <div
                  key={project.id}
                  className={`group flex flex-col justify-between rounded-2xl border bg-white p-5 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${
                    isCompleted
                      ? "border-emerald-200 bg-emerald-50/30"
                      : "border-gray-200 hover:border-purple-400"
                  }`}
                >
                  <div>
                    {/* Top row: category + difficulty */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-gray-500">
                        {CATEGORY_ICONS[project.category] || "📦"} {project.category}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold border ${diffColor}`}
                      >
                        {project.difficulty}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-lg font-black text-gray-950 leading-snug group-hover:text-purple-700 transition">
                      {project.title}
                    </h2>

                    {/* Description */}
                    <p className="mt-2 text-xs text-gray-500 leading-relaxed line-clamp-2">
                      {project.shortDescription}
                    </p>

                    {/* Skills */}
                    <div className="mt-3 flex flex-wrap gap-1">
                      {project.skillsRequired.slice(0, 5).map((skill) => (
                        <span
                          key={skill}
                          className="rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-600"
                        >
                          {skill}
                        </span>
                      ))}
                      {project.skillsRequired.length > 5 && (
                        <span className="text-[10px] text-gray-400 font-medium self-center">
                          +{project.skillsRequired.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bottom CTA */}
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400 font-medium">
                        ⏱️ {project.estimatedTime}
                      </span>
                      <span className="text-gray-200">•</span>
                      <span className="text-xs text-gray-400 font-medium">
                        {project.milestones.length} steps
                      </span>
                    </div>

                    <button
                      onClick={() => router.push(`/projects/${project.id}`)}
                      className={`rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
                        isCompleted
                          ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                          : "bg-purple-600 text-white hover:bg-purple-500 shadow-sm"
                      }`}
                    >
                      {isCompleted ? "✓ Review" : "Start →"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Empty State ─────────────────────────────────────── */}
          {filteredProjects.length === 0 && (
            <div className="mt-8 text-center py-16 rounded-2xl border border-dashed border-gray-300 bg-white">
              <span className="text-4xl">🔍</span>
              <h3 className="mt-3 text-lg font-bold text-gray-950">
                No matching projects
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Try clearing your search or switching filters.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedDifficulty("All");
                  setSearchQuery("");
                }}
                className="mt-4 rounded-xl bg-purple-600 px-4 py-2 text-xs font-bold text-white hover:bg-purple-500 cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </main>
    </PaywallGate>
  );
}
