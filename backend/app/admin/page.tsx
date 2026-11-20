"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AmbientBackground from "@/components/AmbientBackground";
import {
  ENGINEERING_DOMAINS,
  getAllHubCourses,
  getAllHubLessons,
  getHubStats,
  HubCourse,
  HubLesson,
} from "@/data/engineeringHub";

export default function AdminCurriculumCMSPage() {
  const [stats, setStats] = useState(getHubStats());
  const [activeTab, setActiveTab] = useState<"catalog" | "auditor" | "new_course">("catalog");
  const [selectedDomainId, setSelectedDomainId] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLesson, setSelectedLesson] = useState<{
    lesson: HubLesson;
    course: HubCourse;
  } | null>(null);

  // Form states for editing lesson resources
  const [editYoutubeId, setEditYoutubeId] = useState("");
  const [editYoutubeUrl, setEditYoutubeUrl] = useState("");
  const [editPdfUrl, setEditPdfUrl] = useState("");
  const [editIsPublished, setEditIsPublished] = useState(true);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Form state for creating a new course
  const [newCourseDomain, setNewCourseDomain] = useState("programming-languages");
  const [newCourseId, setNewCourseId] = useState("");
  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [newCourseSubtitle, setNewCourseSubtitle] = useState("");
  const [newCourseDesc, setNewCourseDesc] = useState("");
  const [newCourseDuration, setNewCourseDuration] = useState("6 Weeks • 24 Sprints");
  const [newCourseDifficulty, setNewCourseDifficulty] = useState<"Beginner" | "Intermediate" | "Advanced">("Intermediate");
  const [newCourseTech, setNewCourseTech] = useState("Python, Docker, SQL");
  const [newCourseCareers, setNewCourseCareers] = useState("Software Engineer, Cloud Developer");
  const [newCourseSuccess, setNewCourseSuccess] = useState(false);

  const allCourses = getAllHubCourses();
  const allLessons = getAllHubLessons();

  const auditLessonsMissingVideo = allLessons.filter(
    (l) => !l.lesson.youtubeEmbedId && !l.lesson.youtubeUrl
  );
  const auditLessonsMissingPdf = allLessons.filter(
    (l) => !l.lesson.pdfNotesUrl
  );

  const filteredCourses = allCourses.filter((course) => {
    if (selectedDomainId !== "ALL" && course.domainId !== selectedDomainId) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        course.title.toLowerCase().includes(q) ||
        course.technologies.some((t) => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleOpenEditLesson = (item: { lesson: HubLesson; course: HubCourse }) => {
    setSelectedLesson(item);
    setEditYoutubeId(item.lesson.youtubeEmbedId || "");
    setEditYoutubeUrl(item.lesson.youtubeUrl || "");
    setEditPdfUrl(item.lesson.pdfNotesUrl || "");
    setEditIsPublished(item.lesson.isPublished ?? true);
    setSaveStatus(null);
  };

  const handleSaveLessonResources = async () => {
    if (!selectedLesson) return;
    setSaveStatus("Saving...");

    try {
      const res = await fetch("/api/admin/curriculum", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update_lesson_resource",
          payload: {
            lessonId: selectedLesson.lesson.id,
            youtubeEmbedId: editYoutubeId.trim() || undefined,
            youtubeUrl: editYoutubeUrl.trim() || undefined,
            pdfNotesUrl: editPdfUrl.trim() || undefined,
            isPublished: editIsPublished,
          },
        }),
      });

      const data = await res.json();
      if (data.success) {
        selectedLesson.lesson.youtubeEmbedId = editYoutubeId.trim() || undefined;
        selectedLesson.lesson.youtubeUrl = editYoutubeUrl.trim() || undefined;
        selectedLesson.lesson.pdfNotesUrl = editPdfUrl.trim() || undefined;
        selectedLesson.lesson.isPublished = editIsPublished;
        setStats(getHubStats());
        setSaveStatus("✓ Successfully updated curriculum resource!");
        setTimeout(() => setSaveStatus(null), 3000);
      } else {
        setSaveStatus(`Failed: ${data.error}`);
      }
    } catch (e: any) {
      setSaveStatus(`Error saving: ${e.message}`);
    }
  };

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseId || !newCourseTitle) return;

    const courseObj: HubCourse = {
      id: newCourseId.trim().toLowerCase().replace(/\s+/g, "-"),
      title: newCourseTitle.trim(),
      subtitle: newCourseSubtitle.trim(),
      description: newCourseDesc.trim(),
      domainId: newCourseDomain,
      icon: "💻",
      durationHours: 40,
      duration: newCourseDuration,
      difficulty: newCourseDifficulty,
      technologies: newCourseTech.split(",").map((s) => s.trim()).filter(Boolean),
      careerTags: newCourseCareers.split(",").map((s) => s.trim()).filter(Boolean),
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
      featured: false,
      isPublished: true,
      modules: [],
    };

    try {
      const res = await fetch("/api/admin/curriculum", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create_course",
          payload: { course: courseObj },
        }),
      });
      const data = await res.json();
      if (data.success) {
        setNewCourseSuccess(true);
        setStats(getHubStats());
        setTimeout(() => {
          setNewCourseSuccess(false);
          setActiveTab("catalog");
        }, 1500);
      }
    } catch {
      // ignore
    }
  };

  return (
    <AmbientBackground intensity="catalog">
      <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto space-y-8 font-sans">
        {/* Admin Header */}
        <div className="rounded-3xl bg-gradient-to-r from-[#B9E4C9]/40 via-white to-[#E8F5E9]/60 border border-white/90 p-8 sm:p-10 shadow-sm backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#16865A]/10 text-[#0B7650] border border-[#B9E4C9] text-xs font-black uppercase">
                <span>🛠️</span>
                <span>Curriculum Management System (CMS)</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-[#102B24] tracking-tight">
                Engineering Curriculum Admin
              </h1>
              <p className="text-sm text-[#557267] font-medium">
                Manage 15 knowledge domains, associate full-class YouTube lectures, attach downloadable PDF notes, and audit resource readiness.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/explore"
                className="px-4 py-2 rounded-xl text-xs font-bold text-[#102B24] bg-white border border-[#B9E4C9] hover:bg-[#E8F5E9] transition"
              >
                ← View Student Catalog
              </Link>
            </div>
          </div>

          {/* Quick Metrics KPI Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mt-6 pt-6 border-t border-[#B9E4C9]/40">
            <div className="p-3 rounded-2xl bg-white border border-[#B9E4C9]">
              <span className="text-[10px] font-black uppercase text-[#557267] block">Domains</span>
              <span className="text-xl font-black text-[#102B24]">{stats.totalDomains}</span>
            </div>

            <div className="p-3 rounded-2xl bg-white border border-[#B9E4C9]">
              <span className="text-[10px] font-black uppercase text-[#557267] block">Courses</span>
              <span className="text-xl font-black text-[#102B24]">{stats.totalCourses}</span>
            </div>

            <div className="p-3 rounded-2xl bg-white border border-[#B9E4C9]">
              <span className="text-[10px] font-black uppercase text-[#557267] block">Modules</span>
              <span className="text-xl font-black text-[#102B24]">{stats.totalModules}</span>
            </div>

            <div className="p-3 rounded-2xl bg-white border border-[#B9E4C9]">
              <span className="text-[10px] font-black uppercase text-[#557267] block">Lessons</span>
              <span className="text-xl font-black text-[#102B24]">{stats.totalLessons}</span>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-300">
              <span className="text-[10px] font-black uppercase text-emerald-800 block">Lectures Active</span>
              <span className="text-xl font-black text-emerald-700">{stats.videosAvailable}</span>
            </div>

            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-300">
              <span className="text-[10px] font-black uppercase text-amber-800 block">Pending Review</span>
              <span className="text-xl font-black text-amber-700">
                {stats.pendingVideoVerification}
              </span>
            </div>
          </div>
        </div>

        {/* CMS Navigation Tabs */}
        <div className="flex items-center gap-3 border-b border-[#B9E4C9]/40 pb-3">
          <button
            onClick={() => setActiveTab("catalog")}
            className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
              activeTab === "catalog"
                ? "bg-[#16865A] text-white shadow-xs"
                : "bg-white text-[#557267] border border-[#B9E4C9] hover:bg-[#E8F5E9]"
            }`}
          >
            📚 Catalog &amp; Lesson Resource Editor
          </button>

          <button
            onClick={() => setActiveTab("auditor")}
            className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-2 ${
              activeTab === "auditor"
                ? "bg-[#16865A] text-white shadow-xs"
                : "bg-white text-[#557267] border border-[#B9E4C9] hover:bg-[#E8F5E9]"
            }`}
          >
            <span>🔍 Resource Readiness Auditor</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-amber-100 text-amber-800 font-bold">
              {auditLessonsMissingVideo.length + auditLessonsMissingPdf.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("new_course")}
            className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
              activeTab === "new_course"
                ? "bg-[#16865A] text-white shadow-xs"
                : "bg-white text-[#557267] border border-[#B9E4C9] hover:bg-[#E8F5E9]"
            }`}
          >
            ➕ Author New Course
          </button>
        </div>

        {/* Tab 1: Catalog Browser & Lesson Resource Editor */}
        {activeTab === "catalog" && (
          <div className="space-y-6">
            {/* Filter controls */}
            <div className="p-5 rounded-3xl bg-white/80 border border-white/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1 max-w-sm">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter courses by name or technology..."
                  className="w-full px-3.5 py-2 rounded-xl text-xs bg-white border border-[#B9E4C9] text-[#102B24] focus:outline-none focus:ring-2 focus:ring-[#16865A]"
                />
              </div>

              <div className="flex items-center gap-2">
                <label className="text-xs font-bold text-[#557267]">Domain:</label>
                <select
                  value={selectedDomainId}
                  onChange={(e) => setSelectedDomainId(e.target.value)}
                  className="px-3 py-2 rounded-xl text-xs font-bold bg-white border border-[#B9E4C9] text-[#102B24] focus:outline-none focus:ring-2 focus:ring-[#16865A]"
                >
                  <option value="ALL">All 15 Knowledge Domains</option>
                  {ENGINEERING_DOMAINS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.icon} {d.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Courses and Lessons Accordion Tree */}
            <div className="space-y-4">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="rounded-3xl bg-white border border-[#B9E4C9] p-6 shadow-xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#B9E4C9]/40 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black uppercase px-2 py-0.5 rounded-md bg-[#E8F5E9] text-[#16865A]">
                          {course.difficulty}
                        </span>
                        <span className="text-xs text-[#557267] font-mono">
                          ID: {course.id}
                        </span>
                      </div>
                      <h3 className="text-lg font-black text-[#102B24] mt-1">{course.title}</h3>
                      <p className="text-xs text-[#557267]">{course.subtitle}</p>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-[#102B24] block">
                        {course.modules.length} Modules •{" "}
                        {course.modules.reduce((a, m) => a + m.lessons.length, 0)} Lessons
                      </span>
                      <span className="text-[11px] text-[#557267]">
                        Domain: {course.domainId}
                      </span>
                    </div>
                  </div>

                  {/* Modules in this course */}
                  {course.modules.length === 0 ? (
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-[#557267] italic">
                      No custom lessons registered yet for this track. Use the authoring module below or API to register modules.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {course.modules.map((m, mIdx) => (
                        <div key={m.id} className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-[#102B24]">
                              Module {mIdx + 1}: {m.title}
                            </span>
                            <span className="text-[11px] text-[#557267]">
                              {m.lessons.length} Lessons
                            </span>
                          </div>

                          <div className="grid grid-cols-1 gap-2">
                            {m.lessons.map((lesson) => {
                              const hasVideo = Boolean(lesson.youtubeEmbedId || lesson.youtubeUrl);
                              const hasPdf = Boolean(lesson.pdfNotesUrl);

                              return (
                                <div
                                  key={lesson.id}
                                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-white border border-slate-200 hover:border-[#16865A] transition"
                                >
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs font-bold text-[#102B24]">
                                        {lesson.title}
                                      </span>
                                      <span className="text-[10px] text-slate-400 font-mono">
                                        ({lesson.id})
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-1">
                                      <span
                                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                          hasVideo
                                            ? "bg-emerald-100 text-emerald-800"
                                            : "bg-amber-100 text-amber-800"
                                        }`}
                                      >
                                        {hasVideo ? "✓ Video Linked" : "⚠️ Video Pending"}
                                      </span>

                                      <span
                                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                          hasPdf
                                            ? "bg-emerald-100 text-emerald-800"
                                            : "bg-amber-100 text-amber-800"
                                        }`}
                                      >
                                        {hasPdf ? "✓ PDF Ready" : "⚠️ PDF Pending"}
                                      </span>

                                      <span className="text-[10px] text-slate-500">
                                        {lesson.mcqQuestions.length} MCQs
                                      </span>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <Link
                                      href={`/lessons/${lesson.id}`}
                                      className="px-3 py-1.5 rounded-lg text-xs font-bold text-[#102B24] bg-slate-100 hover:bg-slate-200 transition"
                                    >
                                      Preview →
                                    </Link>
                                    <button
                                      onClick={() => handleOpenEditLesson({ lesson, course })}
                                      className="px-3 py-1.5 rounded-lg text-xs font-black text-white bg-[#16865A] hover:bg-[#0B7650] transition cursor-pointer"
                                    >
                                      Edit Resources ⚙️
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Resource Readiness Auditor */}
        {activeTab === "auditor" && (
          <div className="space-y-6">
            <div className="rounded-3xl bg-white border border-[#B9E4C9] p-6 sm:p-8 space-y-4 shadow-xs">
              <div>
                <h2 className="text-xl font-black text-[#102B24] flex items-center gap-2">
                  <span>⚠️</span>
                  <span>Lessons Awaiting Video or PDF Lecture Handouts</span>
                </h2>
                <p className="text-xs text-[#557267] mt-0.5">
                  CampusGrow strictly flags missing multimedia resources so students never see mock or broken embeds. Use this auditor to attach authentic resources.
                </p>
              </div>

              {auditLessonsMissingVideo.length === 0 && auditLessonsMissingPdf.length === 0 ? (
                <div className="p-8 rounded-2xl bg-[#E8F5E9] text-center font-bold text-[#0B7650]">
                  🎉 All curriculum lessons have verified video lectures and downloadable PDF notes attached!
                </div>
              ) : (
                <div className="space-y-3">
                  {allLessons.map((item) => {
                    const missingVid = !item.lesson.youtubeEmbedId && !item.lesson.youtubeUrl;
                    const missingPdf = !item.lesson.pdfNotesUrl;

                    if (!missingVid && !missingPdf) return null;

                    return (
                      <div
                        key={item.lesson.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-amber-200 shadow-2xs"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-[#102B24]">
                              {item.lesson.title}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              ({item.course.title})
                            </span>
                          </div>

                          <div className="flex items-center gap-2 mt-1.5">
                            {missingVid && (
                              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                                Missing Lecture Video
                              </span>
                            )}
                            {missingPdf && (
                              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                                Missing PDF Handout
                              </span>
                            )}
                          </div>
                        </div>

                        <button
                          onClick={() => handleOpenEditLesson(item)}
                          className="px-3.5 py-1.5 rounded-xl text-xs font-black text-white bg-[#16865A] hover:bg-[#0B7650] transition cursor-pointer self-start sm:self-auto"
                        >
                          Attach Resource →
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Author New Course */}
        {activeTab === "new_course" && (
          <form
            onSubmit={handleCreateCourse}
            className="rounded-3xl bg-white border border-[#B9E4C9] p-6 sm:p-8 space-y-6 shadow-xs max-w-3xl mx-auto"
          >
            <div>
              <h2 className="text-xl font-black text-[#102B24]">
                Register New Course in Knowledge Hub
              </h2>
              <p className="text-xs text-[#557267] mt-0.5">
                Fill in course metadata to publish a new specialization under one of the 15 major domains.
              </p>
            </div>

            {newCourseSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-100 text-emerald-800 text-xs font-bold">
                ✓ Course created and registered in catalog!
              </div>
            )}

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-black uppercase text-[#557267] mb-1">
                  Knowledge Domain
                </label>
                <select
                  value={newCourseDomain}
                  onChange={(e) => setNewCourseDomain(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#B9E4C9] font-bold text-[#102B24]"
                >
                  {ENGINEERING_DOMAINS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.icon} {d.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-black uppercase text-[#557267] mb-1">
                    Course Slug ID
                  </label>
                  <input
                    type="text"
                    value={newCourseId}
                    onChange={(e) => setNewCourseId(e.target.value)}
                    placeholder="e.g. rust-systems-concurrency"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#B9E4C9] font-bold text-[#102B24]"
                  />
                </div>

                <div>
                  <label className="block font-black uppercase text-[#557267] mb-1">
                    Difficulty Level
                  </label>
                  <select
                    value={newCourseDifficulty}
                    onChange={(e) => setNewCourseDifficulty(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#B9E4C9] font-bold text-[#102B24]"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-black uppercase text-[#557267] mb-1">
                  Course Title
                </label>
                <input
                  type="text"
                  value={newCourseTitle}
                  onChange={(e) => setNewCourseTitle(e.target.value)}
                  placeholder="e.g. Advanced Rust Systems Programming & Concurrency"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#B9E4C9] font-bold text-[#102B24]"
                />
              </div>

              <div>
                <label className="block font-black uppercase text-[#557267] mb-1">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={newCourseSubtitle}
                  onChange={(e) => setNewCourseSubtitle(e.target.value)}
                  placeholder="e.g. Master ownership, borrow checking, Tokio async runtimes, and lock-free concurrency"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#B9E4C9] font-bold text-[#102B24]"
                />
              </div>

              <div>
                <label className="block font-black uppercase text-[#557267] mb-1">
                  Full Technical Description
                </label>
                <textarea
                  value={newCourseDesc}
                  onChange={(e) => setNewCourseDesc(e.target.value)}
                  rows={3}
                  placeholder="Describe target engineering competencies, architectural focus, and practical deliverables..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#B9E4C9] text-[#102B24]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-black uppercase text-[#557267] mb-1">
                    Technologies (comma separated)
                  </label>
                  <input
                    type="text"
                    value={newCourseTech}
                    onChange={(e) => setNewCourseTech(e.target.value)}
                    placeholder="Rust, Tokio, SIMD, Rayon"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#B9E4C9] font-bold text-[#102B24]"
                  />
                </div>

                <div>
                  <label className="block font-black uppercase text-[#557267] mb-1">
                    Duration Sprint
                  </label>
                  <input
                    type="text"
                    value={newCourseDuration}
                    onChange={(e) => setNewCourseDuration(e.target.value)}
                    placeholder="6 Weeks • 24 Sprints"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#B9E4C9] font-bold text-[#102B24]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-black uppercase text-[#557267] mb-1">
                  Target Career Roles (comma separated)
                </label>
                <input
                  type="text"
                  value={newCourseCareers}
                  onChange={(e) => setNewCourseCareers(e.target.value)}
                  placeholder="Systems Engineer, Infrastructure Lead, HFT Developer"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#B9E4C9] font-bold text-[#102B24]"
                />
              </div>

              <div className="pt-4 border-t border-[#B9E4C9]/40 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl text-xs font-black text-white bg-[#16865A] hover:bg-[#0B7650] shadow-sm transition cursor-pointer"
                >
                  Publish Course to Catalog →
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Lesson Resource Editor Modal */}
        {selectedLesson && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
            <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-white/90 shadow-2xl p-6 sm:p-8 space-y-6">
              <button
                onClick={() => setSelectedLesson(null)}
                className="absolute top-5 right-5 p-2 rounded-xl text-[#557267] hover:text-[#102B24] hover:bg-[#E8F5E9] transition"
              >
                ✕
              </button>

              <div>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-[#E8F5E9] text-[#16865A]">
                  Resource Editor
                </span>
                <h3 className="text-xl font-black text-[#102B24] mt-1">
                  {selectedLesson.lesson.title}
                </h3>
                <p className="text-xs text-[#557267]">
                  Parent Course: {selectedLesson.course.title}
                </p>
              </div>

              {saveStatus && (
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                  {saveStatus}
                </div>
              )}

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-black uppercase text-[#557267] mb-1">
                    YouTube Video Embed ID
                  </label>
                  <input
                    type="text"
                    value={editYoutubeId}
                    onChange={(e) => setEditYoutubeId(e.target.value)}
                    placeholder="e.g. kJ8hZ2j7Z_o (YouTube 11-char ID)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#B9E4C9] font-mono text-xs text-[#102B24]"
                  />
                  <p className="text-[10px] text-[#557267] mt-1">
                    Renders cleanly via youtube-nocookie.com embedded frame. Leave blank if under verification.
                  </p>
                </div>

                <div>
                  <label className="block font-black uppercase text-[#557267] mb-1">
                    YouTube Full URL
                  </label>
                  <input
                    type="text"
                    value={editYoutubeUrl}
                    onChange={(e) => setEditYoutubeUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#B9E4C9] font-mono text-xs text-[#102B24]"
                  />
                </div>

                <div>
                  <label className="block font-black uppercase text-[#557267] mb-1">
                    Downloadable PDF Lecture Notes URL
                  </label>
                  <input
                    type="text"
                    value={editPdfUrl}
                    onChange={(e) => setEditPdfUrl(e.target.value)}
                    placeholder="https://storage.googleapis.com/... or /docs/c-notes.pdf"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#B9E4C9] font-mono text-xs text-[#102B24]"
                  />
                  <p className="text-[10px] text-[#557267] mt-1">
                    Downloadable verified PDF notes. If absent, lesson shows &quot;PDF Notes in Final Proofing&quot;.
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="isPublishedCheck"
                    checked={editIsPublished}
                    onChange={(e) => setEditIsPublished(e.target.checked)}
                    className="h-4 w-4 text-[#16865A] rounded"
                  />
                  <label htmlFor="isPublishedCheck" className="font-bold text-[#102B24]">
                    Lesson is active &amp; published to students
                  </label>
                </div>

                <div className="pt-4 border-t border-[#B9E4C9]/40 flex items-center justify-end gap-3">
                  <button
                    onClick={() => setSelectedLesson(null)}
                    className="px-4 py-2 rounded-xl font-bold text-[#557267] hover:text-[#102B24] bg-white border border-[#B9E4C9]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveLessonResources}
                    className="px-5 py-2.5 rounded-xl font-black text-white bg-[#16865A] hover:bg-[#0B7650] shadow-sm transition"
                  >
                    Save &amp; Update Lesson →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AmbientBackground>
  );
}
