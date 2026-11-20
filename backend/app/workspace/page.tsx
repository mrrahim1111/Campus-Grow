"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MobileNav from "@/components/MobileNav";
import PaywallGate from "@/components/PaywallGate";
import { useSupabaseUser } from "@/hooks/useSupabaseUser";
import {
  WorkspaceProject,
  LanguageKey,
  getWorkspaceProjects,
  createWorkspaceProject,
  togglePortfolioStatus,
  deleteWorkspaceProject,
  addCommitToProject,
  addFileToProject,
  WORKSPACE_EVENT,
} from "@/lib/workspaceProjects";

export default function WorkspacePage() {
  const router = useRouter();
  const { user, profile } = useSupabaseUser();

  const [projects, setProjects] = useState<WorkspaceProject[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "portfolio" | "public" | "private" | LanguageKey>("all");
  const [activeFileViewer, setActiveFileViewer] = useState<string | null>(null);

  // New Repository Modal state
  const [showNewRepoModal, setShowNewRepoModal] = useState(false);
  const [newRepoForm, setNewRepoForm] = useState<{
    title: string;
    description: string;
    language: LanguageKey;
    visibility: "public" | "private";
    inPortfolio: boolean;
    tags: string;
  }>({
    title: "",
    description: "",
    language: "c",
    visibility: "public",
    inPortfolio: true,
    tags: "",
  });

  // Commit Form state
  const [commitMessage, setCommitMessage] = useState("");
  const [commitFeedback, setCommitFeedback] = useState<string | null>(null);

  // Add File Modal state
  const [showAddFileModal, setShowAddFileModal] = useState(false);
  const [newFileName, setNewFileName] = useState("");
  const [newFileContent, setNewFileContent] = useState("");

  const studentName = profile?.name || user?.email?.split("@")[0] || "student";
  const studentHandle = studentName.toLowerCase().replace(/\s+/g, "_");

  // Load projects from storage
  useEffect(() => {
    const load = () => {
      const list = getWorkspaceProjects();
      setProjects(list);
    };
    load();

    window.addEventListener(WORKSPACE_EVENT, load);
    window.addEventListener("storage", load);
    return () => {
      window.removeEventListener(WORKSPACE_EVENT, load);
      window.removeEventListener("storage", load);
    };
  }, []);

  const selectedProject = useMemo(() => {
    if (!selectedProjectId) return null;
    return projects.find((p) => p.id === selectedProjectId) || null;
  }, [projects, selectedProjectId]);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;
      if (filterType === "portfolio") return p.inPortfolio;
      if (filterType === "public") return p.visibility !== "private";
      if (filterType === "private") return p.visibility === "private";
      if (filterType === "all") return true;
      return p.language === filterType;
    });
  }, [projects, searchQuery, filterType]);

  const handleToggleStar = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = togglePortfolioStatus(projectId);
    if (updated) {
      setProjects(getWorkspaceProjects());
    }
  };

  const handleDelete = (projectId: string, title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`Are you sure you want to delete repository "${title}"?`)) {
      deleteWorkspaceProject(projectId);
      setProjects(getWorkspaceProjects());
      if (selectedProjectId === projectId) {
        setSelectedProjectId(null);
      }
    }
  };

  const handleCreateRepo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRepoForm.title.trim()) return;

    const tagsArray = newRepoForm.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const created = createWorkspaceProject({
      title: newRepoForm.title.trim(),
      description: newRepoForm.description.trim() || `Production-grade ${newRepoForm.language} project created in CampusGrow.`,
      language: newRepoForm.language,
      inPortfolio: newRepoForm.inPortfolio,
      tags: tagsArray.length > 0 ? tagsArray : [newRepoForm.language, "engineering"],
    });

    setProjects(getWorkspaceProjects());
    setShowNewRepoModal(false);
    setNewRepoForm({
      title: "",
      description: "",
      language: "c",
      visibility: "public",
      inPortfolio: true,
      tags: "",
    });
    setSelectedProjectId(created.id);
  };

  const handleMakeCommit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject || !commitMessage.trim()) return;

    addCommitToProject(selectedProject.id, commitMessage.trim(), studentName);
    setProjects(getWorkspaceProjects());
    setCommitMessage("");
    setCommitFeedback("Commit pushed to main successfully!");
    setTimeout(() => setCommitFeedback(null), 3000);
  };

  const handleAddFile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject || !newFileName.trim()) return;

    addFileToProject(selectedProject.id, newFileName.trim(), newFileContent, selectedProject.language);
    addCommitToProject(selectedProject.id, `Add ${newFileName.trim()}`, studentName);
    setProjects(getWorkspaceProjects());
    setShowAddFileModal(false);
    setNewFileName("");
    setNewFileContent("");
  };

  const languageColors: Record<string, string> = {
    c: "#16865A",
    cpp: "#0284c7",
    java: "#b45309",
    python: "#2563eb",
    javascript: "#ca8a04",
    sql: "#ea580c",
    bash: "#15803d",
    json: "#475569",
  };

  return (
    <PaywallGate featureKey="workspace" previewMode={true}>
      <div className="min-h-screen bg-[#E8F5E9] text-[#102B24] flex flex-col font-sans">
        {/* ── TOP HEADER ────────────────────────────────────── */}
        <header className="border-b border-[#B9E4C9] bg-white px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="flex items-center gap-2 text-[#102B24] font-bold text-sm hover:opacity-80 transition">
              <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-lg overflow-hidden border border-[#B9E4C9] bg-emerald-50 shadow-xs">
                <Image
                  src="/campusgrow-icon.png"
                  alt="CampusGrow"
                  fill
                  unoptimized
                  className="object-cover"
                  priority
                />
              </span>
              <span className="hidden sm:inline font-black tracking-tight text-[#102B24]">CampusGrow</span>
              <span className="text-xs text-[#557267]">/</span>
              <span className="text-xs font-semibold text-[#16865A]">Workspace</span>
            </Link>

            <span className="text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-[#0B7650] border border-emerald-300">
              PRO REPOSITORIES
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => router.push("/project-hub")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#16865A] hover:bg-[#0B7650] text-white text-xs font-bold transition shadow-xs cursor-pointer active:scale-95"
              title="Open Project Hub Cloud IDE"
            >
              <span>🚀</span>
              <span>Project Hub IDE</span>
            </button>

            <button
              onClick={() => setShowNewRepoModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs cursor-pointer active:scale-95"
            >
              <span>+</span>
              <span>New Repository</span>
            </button>

            <button
              onClick={() => router.push("/terminal")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-[#F4FBF6] text-[#102B24] text-xs font-semibold border border-[#B9E4C9] transition cursor-pointer"
              title="Open Terminal IDE Studio"
            >
              <span>💻</span>
              <span className="hidden sm:inline">Code Studio</span>
            </button>

            <button
              onClick={() => router.push("/profile")}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold border border-amber-300 transition cursor-pointer"
              title="View Public Portfolio"
            >
              <span>⭐</span>
              <span className="hidden sm:inline">Portfolio</span>
            </button>

            <MobileNav breakpoint="lg" />
          </div>
        </header>

        {/* ── WORKSPACE IDENTITY & REPO STATS BAR ─────────────────────────── */}
        <section className="bg-white border-b border-[#B9E4C9] px-4 sm:px-8 py-5">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 border-2 border-[#16865A] text-[#0B7650] text-xl font-black">
                {studentName.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-[#102B24] flex items-center gap-2">
                  <span>@{studentHandle}</span>
                  <span className="text-xs font-normal text-[#557267]">/ Workspace Hub</span>
                </h1>
                <p className="text-xs text-[#557267] mt-0.5">
                  Store and manage projects like GitHub. Star repositories with ⭐ to automatically feature them in your recruiter portfolio.
                </p>
              </div>
            </div>

            {/* Metrics */}
            <div className="flex items-center gap-3 text-xs">
              <div className="bg-[#F4FBF6] border border-[#B9E4C9] rounded-xl px-3 py-1.5 text-center">
                <span className="block text-base font-black text-[#102B24]">{projects.length}</span>
                <span className="text-[10px] text-[#557267] font-semibold uppercase">Repositories</span>
              </div>
              <div className="bg-[#F4FBF6] border border-[#B9E4C9] rounded-xl px-3 py-1.5 text-center">
                <span className="block text-base font-black text-amber-600">
                  {projects.filter((p) => p.inPortfolio).length}
                </span>
                <span className="text-[10px] text-[#557267] font-semibold uppercase">In Portfolio</span>
              </div>
              <div className="bg-[#F4FBF6] border border-[#B9E4C9] rounded-xl px-3 py-1.5 text-center">
                <span className="block text-base font-black text-[#16865A]">
                  {projects.reduce((acc, p) => acc + (p.commits?.length || 1), 0)}
                </span>
                <span className="text-[10px] text-[#557267] font-semibold uppercase">Commits</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── PROJECT HUB CALLOUT BANNER ───────────────────────────────────── */}
        <section className="bg-gradient-to-r from-emerald-50 via-teal-50 to-white border-b border-[#B9E4C9] px-4 sm:px-8 py-3.5">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-100 border border-emerald-300 text-lg">
                🤖
              </span>
              <div>
                <p className="text-xs font-bold text-[#102B24] flex items-center gap-2">
                  <span>Need to architect a complex system project?</span>
                  <span className="text-[10px] uppercase font-black px-1.5 py-0.5 rounded bg-emerald-100 text-[#0B7650] border border-emerald-300">
                    VS CODE IDE
                  </span>
                </p>
                <p className="text-[11px] text-[#557267]">
                  Use <strong className="text-[#16865A]">Project Hub IDE</strong> to code multi-file modules, run compiler checks, and mount directly into this Workspace.
                </p>
              </div>
            </div>
            <button
              onClick={() => router.push("/project-hub")}
              className="shrink-0 px-3.5 py-1.5 rounded-lg bg-[#16865A] hover:bg-[#0B7650] text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
            >
              <span>Launch Project Hub</span>
              <span>&rarr;</span>
            </button>
          </div>
        </section>

        {/* ── MAIN WORKSPACE CONTENT ─────────────────────────────────────── */}
        <main className="max-w-6xl w-full mx-auto px-4 sm:px-8 py-6 flex-1 flex flex-col">
          {/* If a repository is currently selected, show the Repo Inspector */}
          {selectedProject ? (
            <div className="space-y-5">
              {/* Back to all repos */}
              <button
                onClick={() => setSelectedProjectId(null)}
                className="text-xs font-semibold text-[#16865A] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>← Back to all repositories</span>
              </button>

              {/* Repo Header */}
              <div className="bg-white border border-[#B9E4C9] rounded-2xl p-5 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#B9E4C9]">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="text-xl">📁</span>
                    <h2 className="text-lg font-bold text-[#102B24] flex items-center gap-1.5">
                      <span className="text-[#557267]">@{studentHandle}</span>
                      <span className="text-[#557267]">/</span>
                      <span className="text-[#16865A] hover:underline">{selectedProject.title}</span>
                    </h2>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#F4FBF6] text-[#557267] border border-[#B9E4C9]">
                      {selectedProject.visibility || "public"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Star / Portfolio Toggle */}
                    <button
                      onClick={(e) => handleToggleStar(selectedProject.id, e)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition border cursor-pointer ${
                        selectedProject.inPortfolio
                          ? "bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200"
                          : "bg-white text-[#557267] border-[#B9E4C9] hover:bg-[#F4FBF6]"
                      }`}
                      title="Toggle showcase on public student portfolio"
                    >
                      <span>{selectedProject.inPortfolio ? "⭐" : "☆"}</span>
                      <span>{selectedProject.inPortfolio ? "In Portfolio ✓" : "Feature in Portfolio"}</span>
                    </button>

                    {/* Open in Code Studio */}
                    <button
                      onClick={() => router.push(`/terminal?lang=${selectedProject.language}`)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#16865A] hover:bg-[#0B7650] text-white text-xs font-bold shadow-xs transition cursor-pointer"
                    >
                      <span>▶ Open in Studio</span>
                    </button>

                    {/* Delete */}
                    <button
                      onClick={(e) => handleDelete(selectedProject.id, selectedProject.title, e)}
                      className="p-1.5 text-[#557267] hover:text-rose-600 rounded-lg hover:bg-rose-50 transition cursor-pointer"
                      title="Delete repository"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                <p className="text-xs text-[#557267] mt-3">{selectedProject.description}</p>

                {/* Tags */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {selectedProject.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-mono bg-[#F4FBF6] text-[#16865A] px-2 py-0.5 rounded-full border border-[#B9E4C9]">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Branch Bar & Latest Commit */}
              <div className="bg-[#F4FBF6] border border-[#B9E4C9] rounded-t-2xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-[#B9E4C9] font-semibold text-[#102B24]">
                    <span>🌿</span>
                    <span>{selectedProject.defaultBranch || "main"}</span>
                  </span>

                  <span className="text-[#557267]">
                    Latest commit: <strong className="text-[#102B24]">{selectedProject.commits?.[0]?.message || "Scaffold files"}</strong> by {selectedProject.commits?.[0]?.author || studentName}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-[#557267] text-[11px]">
                    Hash: {selectedProject.commits?.[0]?.hash || "b49a1f2"}
                  </span>
                  <button
                    onClick={() => setShowAddFileModal(true)}
                    className="px-2.5 py-1 rounded-lg bg-white hover:bg-emerald-50 text-xs font-semibold text-[#16865A] border border-[#B9E4C9]"
                  >
                    + Add File
                  </button>
                </div>
              </div>

              {/* File Tree Table */}
              <div className="border border-t-0 border-[#B9E4C9] rounded-b-2xl overflow-hidden bg-white shadow-xs">
                <table className="w-full text-left text-xs font-mono">
                  <tbody className="divide-y divide-[#E8F5E9]">
                    {Object.values(selectedProject.files || {}).map((file) => (
                      <tr
                        key={file.name}
                        onClick={() => setActiveFileViewer(file.name)}
                        className="hover:bg-[#F4FBF6] transition cursor-pointer group"
                      >
                        <td className="p-3 font-semibold text-[#16865A] flex items-center gap-2">
                          <span>📄</span>
                          <span className="group-hover:underline">{file.name}</span>
                        </td>
                        <td className="p-3 text-[#557267] text-[11px] truncate max-w-[200px]">
                          {file.lastCommitMessage || "Scaffold code"}
                        </td>
                        <td className="p-3 text-[#557267] text-[11px] text-right">
                          {file.size || file.content.length} B
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* File Viewer Box (if a file is selected) */}
              {activeFileViewer && selectedProject.files?.[activeFileViewer] && (
                <div className="bg-white border border-[#B9E4C9] rounded-2xl overflow-hidden shadow-xs">
                  <div className="p-3 border-b border-[#B9E4C9] flex items-center justify-between bg-[#F4FBF6]">
                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span>📄</span>
                      <span className="text-[#102B24] font-bold">{activeFileViewer}</span>
                      <span className="text-[#557267]">
                        ({selectedProject.files[activeFileViewer].content.split("\n").length} lines)
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => router.push(`/terminal?lang=${selectedProject.language}`)}
                        className="px-2.5 py-1 rounded-lg bg-[#16865A] hover:bg-[#0B7650] text-white text-xs font-bold transition"
                      >
                        Edit in Studio →
                      </button>
                      <button
                        onClick={() => setActiveFileViewer(null)}
                        className="text-[#557267] hover:text-[#102B24] text-xs p-1"
                      >
                        ✕
                      </button>
                    </div>
                  </div>

                  <pre className="p-4 text-xs font-mono text-[#102B24] bg-[#F8FAFC] overflow-x-auto leading-relaxed">
                    {selectedProject.files[activeFileViewer].content}
                  </pre>
                </div>
              )}

              {/* Commit Changes Section */}
              <div className="bg-white border border-[#B9E4C9] rounded-2xl p-4 sm:p-5 shadow-xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#16865A] mb-2">
                  Commit Directly to Main Branch
                </h3>
                <form onSubmit={handleMakeCommit} className="flex flex-col sm:flex-row items-center gap-3">
                  <input
                    type="text"
                    required
                    value={commitMessage}
                    onChange={(e) => setCommitMessage(e.target.value)}
                    placeholder="Commit message (e.g. feat: add binary search optimization)..."
                    className="flex-1 w-full bg-[#F8FAFC] border border-[#B9E4C9] rounded-xl px-3 py-2 text-xs text-[#102B24] focus:outline-none focus:border-[#16865A]"
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#16865A] hover:bg-[#0B7650] text-white text-xs font-bold transition cursor-pointer shrink-0 shadow-xs"
                  >
                    Commit changes
                  </button>
                </form>
                {commitFeedback && (
                  <p className="text-xs font-bold text-[#16865A] mt-2">✓ {commitFeedback}</p>
                )}
              </div>

              {/* Rendered README.md */}
              {selectedProject.files?.["README.md"] && (
                <div className="bg-white border border-[#B9E4C9] rounded-2xl p-5 sm:p-7 shadow-xs">
                  <div className="flex items-center gap-2 pb-3 border-b border-[#B9E4C9] text-xs font-bold text-[#102B24] mb-4">
                    <span>📖</span>
                    <span>README.md</span>
                  </div>
                  <pre className="text-xs sm:text-sm font-mono text-[#102B24] whitespace-pre-wrap leading-relaxed">
                    {selectedProject.files["README.md"].content}
                  </pre>
                </div>
              )}
            </div>
          ) : (
            /* ── ALL REPOSITORIES LIST & FILTER ──────────────────────────── */
            <div className="space-y-4">
              {/* Filter and search bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1 flex items-center gap-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Find a repository..."
                    className="w-full max-w-sm bg-white border border-[#B9E4C9] rounded-xl px-3 py-1.5 text-xs text-[#102B24] placeholder:text-[#557267] focus:outline-none focus:border-[#16865A] shadow-xs"
                  />

                  {/* Filter by Type */}
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value as any)}
                    className="bg-white border border-[#B9E4C9] text-[#102B24] text-xs rounded-xl px-3 py-1.5 focus:outline-none cursor-pointer shadow-xs"
                  >
                    <option value="all">Type: All</option>
                    <option value="portfolio">⭐ In Portfolio</option>
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                    <option value="c">Language: C</option>
                    <option value="java">Language: Java</option>
                    <option value="python">Language: Python</option>
                    <option value="sql">Language: SQL</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#557267] font-semibold">
                    {filteredProjects.length} repositories
                  </span>
                </div>
              </div>

              {/* Repositories Cards Grid */}
              <div className="space-y-3">
                {filteredProjects.length === 0 ? (
                  <div className="py-12 text-center text-xs text-[#557267] bg-white border border-[#B9E4C9] rounded-2xl">
                    No repositories found matching your filter. Click <strong>+ New Repository</strong> to create one!
                  </div>
                ) : (
                  filteredProjects.map((p) => {
                    const langColor = languageColors[p.language] || "#16865A";

                    return (
                      <div
                        key={p.id}
                        onClick={() => setSelectedProjectId(p.id)}
                        className="p-4 bg-white border border-[#B9E4C9] hover:border-[#16865A] hover:shadow-md transition-all duration-200 rounded-2xl cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-sm font-bold text-[#16865A] group-hover:underline truncate">
                              {p.title}
                            </h3>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-[#B9E4C9] text-[#557267] bg-[#F4FBF6]">
                              {p.visibility || "public"}
                            </span>
                            {p.inPortfolio && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                                ⭐ Featured in Portfolio
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-[#557267] mt-1 line-clamp-2 leading-relaxed">
                            {p.description}
                          </p>

                          {/* Meta: Language, stars, last updated */}
                          <div className="flex items-center gap-4 text-xs text-[#557267] mt-2 font-mono">
                            <span className="flex items-center gap-1.5">
                              <span
                                className="h-2.5 w-2.5 rounded-full inline-block"
                                style={{ backgroundColor: langColor }}
                              />
                              <span className="uppercase font-bold">{p.language}</span>
                            </span>

                            <span>Updated {new Date(p.updatedAt).toLocaleDateString()}</span>
                            <span>{Object.keys(p.files || {}).length} files</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 shrink-0">
                          {/* Star Portfolio Toggle */}
                          <button
                            type="button"
                            onClick={(e) => handleToggleStar(p.id, e)}
                            className={`p-1.5 rounded-lg text-xs transition cursor-pointer border ${
                              p.inPortfolio
                                ? "text-amber-800 bg-amber-100 border-amber-300"
                                : "text-[#557267] bg-[#F4FBF6] border-[#B9E4C9] hover:text-[#102B24]"
                            }`}
                            title={p.inPortfolio ? "Featured in Portfolio" : "Feature in Portfolio"}
                          >
                            {p.inPortfolio ? "⭐ Starred" : "☆ Star"}
                          </button>

                          {/* Launch Studio */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/terminal?lang=${p.language}`);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-[#F4FBF6] hover:bg-emerald-50 text-[#16865A] text-xs font-semibold border border-[#B9E4C9] transition cursor-pointer flex items-center gap-1"
                          >
                            <span>▶ Code Studio</span>
                          </button>

                          <button
                            type="button"
                            onClick={(e) => handleDelete(p.id, p.title, e)}
                            className="text-[#557267] hover:text-rose-600 p-1.5 rounded-lg transition cursor-pointer"
                            title="Delete"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </main>

        {/* ── CREATE NEW REPOSITORY MODAL ─────────────────────────────────── */}
        {showNewRepoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
            <div className="bg-white border border-[#B9E4C9] rounded-3xl max-w-lg w-full p-6 shadow-xl text-[#102B24]">
              <div className="flex items-center justify-between pb-3 border-b border-[#B9E4C9]">
                <h3 className="text-base font-bold text-[#102B24] flex items-center gap-2">
                  <span>➕</span>
                  <span>Create a New Repository</span>
                </h3>
                <button
                  onClick={() => setShowNewRepoModal(false)}
                  className="text-[#557267] hover:text-[#102B24] text-xs p-1"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateRepo} className="space-y-4 mt-4">
                <div>
                  <label className="block text-xs font-bold text-[#102B24] mb-1">
                    Repository Name *
                  </label>
                  <div className="flex items-center">
                    <span className="bg-[#F4FBF6] border border-r-0 border-[#B9E4C9] rounded-l-xl px-3 py-2 text-xs text-[#557267] font-mono">
                      {studentHandle} /
                    </span>
                    <input
                      type="text"
                      required
                      value={newRepoForm.title}
                      onChange={(e) => setNewRepoForm({ ...newRepoForm, title: e.target.value })}
                      placeholder="e.g. dynamic-array-sort, lru-cache-c"
                      className="flex-1 bg-white border border-[#B9E4C9] rounded-r-xl p-2 text-xs text-[#102B24] focus:outline-none focus:border-[#16865A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#102B24] mb-1">
                    Primary Language &amp; Toolchain *
                  </label>
                  <select
                    value={newRepoForm.language}
                    onChange={(e) => setNewRepoForm({ ...newRepoForm, language: e.target.value as LanguageKey })}
                    className="w-full bg-white border border-[#B9E4C9] rounded-xl p-2.5 text-xs text-[#102B24] focus:outline-none focus:border-[#16865A]"
                  >
                    <option value="c">🇨 C (Clang 16 LLVM - Systems)</option>
                    <option value="java">☕ Java (JDK 21 - OOP Algorithms)</option>
                    <option value="python">🐍 Python 3.14 (Data Analytics)</option>
                    <option value="javascript">⚡ JavaScript (Node.js Concurrency)</option>
                    <option value="sql">🗄️ SQLite (Relational SQL)</option>
                    <option value="bash">🐚 Bash (POSIX Shell Script)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#102B24] mb-1">
                    Short Description
                  </label>
                  <textarea
                    rows={2}
                    value={newRepoForm.description}
                    onChange={(e) => setNewRepoForm({ ...newRepoForm, description: e.target.value })}
                    placeholder="Short description of your project..."
                    className="w-full bg-white border border-[#B9E4C9] rounded-xl p-2.5 text-xs text-[#102B24] focus:outline-none focus:border-[#16865A]"
                  />
                </div>

                <div className="flex items-center gap-4 text-xs text-[#102B24]">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="repoVisibility"
                      checked={newRepoForm.visibility === "public"}
                      onChange={() => setNewRepoForm({ ...newRepoForm, visibility: "public" })}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>🌐 Public</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="repoVisibility"
                      checked={newRepoForm.visibility === "private"}
                      onChange={() => setNewRepoForm({ ...newRepoForm, visibility: "private" })}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>🔒 Private</span>
                  </label>
                </div>

                <div className="flex items-center gap-2 pt-1 border-t border-[#B9E4C9]">
                  <input
                    type="checkbox"
                    id="portfolioToggle"
                    checked={newRepoForm.inPortfolio}
                    onChange={(e) => setNewRepoForm({ ...newRepoForm, inPortfolio: e.target.checked })}
                    className="rounded border-[#B9E4C9] text-emerald-600 focus:ring-emerald-500 h-4 w-4 bg-white cursor-pointer"
                  />
                  <label htmlFor="portfolioToggle" className="text-xs text-[#102B24] cursor-pointer">
                    ⭐ <strong className="text-[#102B24]">Feature in Portfolio:</strong> Automatically show on your public profile
                  </label>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#B9E4C9]">
                  <button
                    type="button"
                    onClick={() => setShowNewRepoModal(false)}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold text-[#557267] hover:text-[#102B24]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl text-xs font-bold bg-[#16865A] hover:bg-[#0B7650] text-white shadow-xs transition cursor-pointer"
                  >
                    Create repository
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ── ADD FILE MODAL ──────────────────────────────────────────────── */}
        {showAddFileModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
            <div className="bg-white border border-[#B9E4C9] rounded-3xl max-w-lg w-full p-6 shadow-xl text-[#102B24]">
              <div className="flex items-center justify-between pb-3 border-b border-[#B9E4C9]">
                <h3 className="text-sm font-bold text-[#102B24] flex items-center gap-2">
                  <span>📄</span>
                  <span>Add File to Repository</span>
                </h3>
                <button
                  onClick={() => setShowAddFileModal(false)}
                  className="text-[#557267] hover:text-[#102B24] text-xs p-1"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddFile} className="space-y-4 mt-4">
                <div>
                  <label className="block text-xs font-bold text-[#102B24] mb-1">
                    Filename *
                  </label>
                  <input
                    type="text"
                    required
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                    placeholder="e.g. helper.c, test_cases.txt, Makefile"
                    className="w-full bg-[#F8FAFC] border border-[#B9E4C9] rounded-xl p-2 text-xs text-[#102B24] focus:outline-none focus:border-[#16865A] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#102B24] mb-1">
                    File Contents
                  </label>
                  <textarea
                    rows={6}
                    value={newFileContent}
                    onChange={(e) => setNewFileContent(e.target.value)}
                    placeholder="// Type or paste file contents..."
                    className="w-full bg-[#F8FAFC] border border-[#B9E4C9] rounded-xl p-2.5 text-xs text-[#102B24] focus:outline-none focus:border-[#16865A] font-mono"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#B9E4C9]">
                  <button
                    type="button"
                    onClick={() => setShowAddFileModal(false)}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold text-[#557267] hover:text-[#102B24]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl text-xs font-bold bg-[#16865A] hover:bg-[#0B7650] text-white shadow-xs transition cursor-pointer"
                  >
                    Add file &amp; commit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </PaywallGate>
  );
}
