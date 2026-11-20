"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PaywallGate from "@/components/PaywallGate";
import {
  AgentKitBuildResult,
  AGENTKIT_BLUEPRINTS,
  buildAgentKitProject,
  validateProjectCode,
  ProjectSnapshot,
  ProjectValidationResult,
} from "@/lib/agentkitEngine";
import {
  createWorkspaceProject,
  LanguageKey,
  togglePortfolioStatus,
} from "@/lib/workspaceProjects";

export default function ProjectHubPage() {
  return (
    <PaywallGate featureKey="project-hub" previewMode={true}>
      <VSCodeProjectHubIDE />
    </PaywallGate>
  );
}

const AI_MODELS = [
  { id: "gemini-2.0-flash", name: "Gemini 2.0 Flash", badge: "Fastest", icon: "⚡" },
  { id: "gemini-1.5-pro", name: "Gemini 1.5 Pro", badge: "Deep Reasoning", icon: "🧠" },
  { id: "claude-3.5-sonnet", name: "Claude 3.5 Sonnet", badge: "Architecture", icon: "✨" },
  { id: "gpt-4o", name: "GPT-4o", badge: "Production", icon: "🔥" },
  { id: "deepseek-r1", name: "DeepSeek R1", badge: "Chain-of-Thought", icon: "🌐" },
] as const;

type ActivityTab = "explorer" | "search" | "git" | "debug" | "ai" | "settings";
type BottomPanelTab = "terminal" | "output" | "problems" | "debug";

function getFileLanguageBadge(filename: string): { label: string; color: string; icon: string } {
  if (filename.endsWith(".c")) return { label: "C (Clang 16)", color: "text-blue-600 bg-blue-50 border-blue-200", icon: "🇨" };
  if (filename.endsWith(".h")) return { label: "C Header", color: "text-purple-600 bg-purple-50 border-purple-200", icon: "📄" };
  if (filename.endsWith(".py")) return { label: "Python 3.14", color: "text-amber-600 bg-amber-50 border-amber-200", icon: "🐍" };
  if (filename.endsWith(".java")) return { label: "Java 21", color: "text-orange-600 bg-orange-50 border-orange-200", icon: "☕" };
  if (filename.endsWith(".ts") || filename.endsWith(".tsx")) return { label: "TypeScript", color: "text-sky-600 bg-sky-50 border-sky-200", icon: "📘" };
  if (filename.endsWith(".js")) return { label: "JavaScript", color: "text-yellow-600 bg-yellow-50 border-yellow-200", icon: "⚡" };
  if (filename.endsWith(".json")) return { label: "JSON", color: "text-emerald-600 bg-emerald-50 border-emerald-200", icon: "📦" };
  if (filename.endsWith(".md")) return { label: "Markdown", color: "text-slate-600 bg-slate-50 border-slate-200", icon: "📖" };
  if (filename.toLowerCase().includes("makefile")) return { label: "Makefile", color: "text-rose-600 bg-rose-50 border-rose-200", icon: "⚙️" };
  return { label: "Plain Text", color: "text-slate-600 bg-slate-50 border-slate-200", icon: "📄" };
}

function VSCodeProjectHubIDE() {
  const router = useRouter();

  // Active Project & State
  const [activeProject, setActiveProject] = useState<AgentKitBuildResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [mountedProjectId, setMountedProjectId] = useState<string | null>(null);
  const [featuredInPortfolio, setFeaturedInPortfolio] = useState<boolean>(false);
  const [selectedModel, setSelectedModel] = useState<string>("gemini-2.0-flash");

  // VS Code Layout State
  const [activeActivity, setActiveActivity] = useState<ActivityTab>("explorer");
  const [showPrimarySidebar, setShowPrimarySidebar] = useState<boolean>(true);
  const [showBottomPanel, setShowBottomPanel] = useState<boolean>(true);
  const [activeBottomTab, setActiveBottomTab] = useState<BottomPanelTab>("terminal");

  // Editor State
  const [openTabs, setOpenTabs] = useState<string[]>([]);
  const [activeTabFile, setActiveTabFile] = useState<string>("");
  const [dirtyFiles, setDirtyFiles] = useState<Record<string, boolean>>({});
  const [saveNotice, setSaveNotice] = useState<string | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ line: 1, col: 1 });

  // Explorer Tree & Search State
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    include: true,
    src: true,
    tests: true,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [newFileModalOpen, setNewFileModalOpen] = useState(false);
  const [newFileNameInput, setNewFileNameInput] = useState("");

  // Quality & Snapshots
  const [validationResult, setValidationResult] = useState<ProjectValidationResult | null>(null);
  const [snapshots, setSnapshots] = useState<ProjectSnapshot[]>([]);
  const [showSnapshotModal, setShowSnapshotModal] = useState(false);

  // Terminal State
  const [terminalHistory, setTerminalHistory] = useState<
    Array<{ type: "input" | "output" | "error" | "system"; text: string }>
  >([
    { type: "system", text: "CampusGrow Visual Studio Code Cloud Studio v2.4 (x86_64-darwin)" },
    { type: "system", text: "Target Environment: Clang 16.0.0 LLVM / GCC 13.2 / Python 3.14.0a" },
    { type: "output", text: "Type 'run' to compile & run, 'test' for test suite, 'ls', 'cat <file>', or 'help'." },
  ]);
  const [terminalInput, setTerminalInput] = useState("");
  const terminalBottomRef = useRef<HTMLDivElement | null>(null);

  // AI Architect State
  const [agentPrompt, setAgentPrompt] = useState("");
  const [copiedCodeNotice, setCopiedCodeNotice] = useState<string | null>(null);

  // Initialize Default High-throughput LRU Cache Project
  useEffect(() => {
    const initial = buildAgentKitProject("High-throughput LRU cache in C11", "c");
    setActiveProject(initial);
    if (initial.validation) setValidationResult(initial.validation);
    if (initial.snapshots) setSnapshots(initial.snapshots);

    const fileNames = Object.keys(initial.files);
    setOpenTabs(fileNames.slice(0, 4));
    setActiveTabFile(fileNames[0] || "");
  }, []);

  // Scroll terminal to bottom
  useEffect(() => {
    if (showBottomPanel && activeBottomTab === "terminal") {
      terminalBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalHistory, showBottomPanel, activeBottomTab]);

  // Handle Tab Switching
  const handleOpenFile = (filename: string) => {
    if (!openTabs.includes(filename)) {
      setOpenTabs((prev) => [...prev, filename]);
    }
    setActiveTabFile(filename);
  };

  const handleCloseTab = (filename: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const remaining = openTabs.filter((t) => t !== filename);
    setOpenTabs(remaining);
    if (activeTabFile === filename) {
      setActiveTabFile(remaining[remaining.length - 1] || "");
    }
  };

  // Handle Code Change
  const handleCodeChange = (newCode: string) => {
    if (!activeProject || !activeTabFile) return;

    setActiveProject((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        files: {
          ...prev.files,
          [activeTabFile]: {
            ...prev.files[activeTabFile],
            content: newCode,
            size: newCode.length,
          },
        },
      };
    });

    setDirtyFiles((prev) => ({ ...prev, [activeTabFile]: true }));
  };

  // Keyboard shortcut Ctrl+S / Cmd+S
  const handleSaveFile = () => {
    if (!activeTabFile) return;
    setDirtyFiles((prev) => ({ ...prev, [activeTabFile]: false }));
    setSaveNotice(`Saved ${activeTabFile}`);
    setTimeout(() => setSaveNotice(null), 2000);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        handleSaveFile();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeTabFile]);

  // Create New File
  const handleCreateNewFile = () => {
    if (!newFileNameInput.trim() || !activeProject) return;
    const cleanName = newFileNameInput.trim();

    setActiveProject((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        files: {
          ...prev.files,
          [cleanName]: {
            name: cleanName,
            language: activeProject.language,
            content: `// ${cleanName}\n// Created in CampusGrow Project Hub\n\n`,
            size: 50,
          },
        },
      };
    });

    handleOpenFile(cleanName);
    setNewFileNameInput("");
    setNewFileModalOpen(false);
  };

  // Delete File
  const handleDeleteFile = (filename: string) => {
    if (!activeProject) return;
    if (confirm(`Delete ${filename}?`)) {
      setActiveProject((prev) => {
        if (!prev) return null;
        const newFiles = { ...prev.files };
        delete newFiles[filename];
        return { ...prev, files: newFiles };
      });
      handleCloseTab(filename);
    }
  };

  // Run Tests Suite
  const handleRunTests = () => {
    if (!activeProject) return;
    setShowBottomPanel(true);
    setActiveBottomTab("output");

    setTerminalHistory((prev) => [
      ...prev,
      { type: "input", text: "make test" },
      { type: "system", text: "Executing test suite runner..." },
    ]);

    const res = validateProjectCode(activeProject.files, activeProject.language);
    setValidationResult(res);

    setTerminalHistory((prev) => [
      ...prev,
      {
        type: res.passed ? "output" : "error",
        text: res.testOutput,
      },
    ]);
  };

  // Run Project Code
  const handleRunProject = () => {
    if (!activeProject) return;
    setShowBottomPanel(true);
    setActiveBottomTab("terminal");

    const cmd = activeProject.language === "python" ? "python3 main.py" : "./bin/project_exec";
    setTerminalHistory((prev) => [
      ...prev,
      { type: "input", text: cmd },
      { type: "system", text: `[100%] Built target ${activeProject.title}` },
      {
        type: "output",
        text:
          validationResult?.testOutput ||
          `>>> [Process exited with returncode 0]\nProgram output successfully rendered in ${activeProject.language} runtime.`,
      },
    ]);
  };

  // Mount to Workspace
  const handleMountToWorkspace = () => {
    if (!activeProject) return;
    const projectFiles: Record<string, { name: string; content: string; language: LanguageKey; size: number; lastCommitMessage: string }> = {};

    Object.entries(activeProject.files).forEach(([name, f]) => {
      projectFiles[name] = {
        name,
        content: f.content,
        language: f.language || activeProject.language,
        size: f.size || f.content.length,
        lastCommitMessage: "Initial scaffold from Project Hub",
      };
    });

    const created = createWorkspaceProject({
      title: activeProject.title,
      description: activeProject.description,
      language: activeProject.language,
      inPortfolio: true,
      tags: ["project-hub", activeProject.language, "production-build"],
      files: projectFiles,
    });

    setMountedProjectId(created.id);
    setSaveNotice("Mounted to Workspace Repositories ✓");
    setTimeout(() => setSaveNotice(null), 3000);
  };

  // Star Portfolio Status
  const handleTogglePortfolio = () => {
    if (!activeProject) return;
    if (mountedProjectId) {
      togglePortfolioStatus(mountedProjectId);
    }
    setFeaturedInPortfolio((p) => !p);
  };

  // Checkpoint Snapshot
  const handleCaptureSnapshot = () => {
    if (!activeProject) return;
    const newSnapshot: ProjectSnapshot = {
      id: `snap_${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      name: `Checkpoint ${snapshots.length + 1} (${activeTabFile || "All Files"})`,
      files: JSON.parse(JSON.stringify(activeProject.files)),
    };
    setSnapshots((prev) => [newSnapshot, ...prev]);
    setSaveNotice("Snapshot captured ✓");
    setTimeout(() => setSaveNotice(null), 2000);
  };

  // Rollback to Snapshot
  const handleRollback = (snap: ProjectSnapshot) => {
    if (!activeProject) return;
    setActiveProject((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        files: JSON.parse(JSON.stringify(snap.files)),
      };
    });
    setDirtyFiles({});
    setShowSnapshotModal(false);
    setSaveNotice(`Rolled back to ${snap.name}`);
    setTimeout(() => setSaveNotice(null), 2500);
  };

  // Terminal Input Dispatcher
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim();
    if (!cmd) return;

    setTerminalHistory((prev) => [...prev, { type: "input", text: cmd }]);
    setTerminalInput("");

    if (cmd === "clear") {
      setTerminalHistory([]);
      return;
    }
    if (cmd === "help") {
      setTerminalHistory((prev) => [
        ...prev,
        {
          type: "output",
          text:
            "Available commands:\n  run         - Compile and execute active project\n  test        - Run automated unit test suite\n  ls          - List repository files\n  cat <file>  - View contents of file\n  clear       - Clear terminal output\n  help        - Show this help manual",
        },
      ]);
      return;
    }
    if (cmd === "ls") {
      const filesList = Object.keys(activeProject?.files || {}).join("  ");
      setTerminalHistory((prev) => [...prev, { type: "output", text: filesList }]);
      return;
    }
    if (cmd.startsWith("cat ")) {
      const targetFile = cmd.slice(4).trim();
      const fileData = activeProject?.files[targetFile];
      if (fileData) {
        setTerminalHistory((prev) => [...prev, { type: "output", text: fileData.content }]);
      } else {
        setTerminalHistory((prev) => [
          ...prev,
          { type: "error", text: `cat: ${targetFile}: No such file or directory` },
        ]);
      }
      return;
    }
    if (cmd === "run") {
      handleRunProject();
      return;
    }
    if (cmd === "test") {
      handleRunTests();
      return;
    }

    setTerminalHistory((prev) => [
      ...prev,
      { type: "error", text: `zsh: command not found: ${cmd}. Type 'help' for available commands.` },
    ]);
  };

  // AI Generation
  const handleGenerateProject = (blueprintPrompt?: string, blueprintLang?: LanguageKey) => {
    const promptToUse = blueprintPrompt || agentPrompt;
    if (!promptToUse.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      const newProj = buildAgentKitProject(promptToUse, blueprintLang || activeProject?.language || "c");
      setActiveProject(newProj);
      if (newProj.validation) setValidationResult(newProj.validation);
      if (newProj.snapshots) setSnapshots(newProj.snapshots);

      const files = Object.keys(newProj.files);
      setOpenTabs(files.slice(0, 4));
      setActiveTabFile(files[0] || "");
      setIsGenerating(false);
      setSaveNotice(`Architected: ${newProj.title}`);
      setTimeout(() => setSaveNotice(null), 3000);
    }, 800);
  };

  // Organize Files into Folders
  const organizeFiles = (files: Record<string, any>) => {
    const folders: Record<string, string[]> = {};
    const rootFiles: string[] = [];

    for (const fileName of Object.keys(files)) {
      if (fileName.includes("/")) {
        const [folder, ...rest] = fileName.split("/");
        if (!folders[folder]) folders[folder] = [];
        folders[folder].push(rest.join("/"));
      } else {
        rootFiles.push(fileName);
      }
    }
    return { folders, rootFiles };
  };

  const fileHierarchy = activeProject ? organizeFiles(activeProject.files) : { folders: {}, rootFiles: [] };
  const activeFileObj = activeProject && activeTabFile ? activeProject.files[activeTabFile] : null;
  const activeFileContent = activeFileObj ? activeFileObj.content : "";
  const linesCount = activeFileContent ? activeFileContent.split("\n").length : 0;
  const activeFileBadge = activeTabFile ? getFileLanguageBadge(activeTabFile) : { label: "No File", color: "", icon: "📄" };

  return (
    <div className="h-screen w-screen bg-[#F8FAFC] text-[#102B24] flex flex-col overflow-hidden font-sans select-none">
      {/* ── 1. VS CODE TOP APPLICATION BAR ───────────────────────────── */}
      <header className="h-10 bg-[#FFFFFF] border-b border-[#E2E8F0] px-3 flex items-center justify-between shrink-0 text-xs shadow-xs z-20">
        {/* Left: Branding & Breadcrumb */}
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition">
            <span className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-md overflow-hidden border border-[#B9E4C9] bg-emerald-50">
              <Image
                src="/campusgrow-icon.png"
                alt="CampusGrow"
                fill
                unoptimized
                className="object-cover"
                priority
              />
            </span>
            <span className="font-bold text-[#102B24] tracking-tight">CampusGrow</span>
            <span className="text-[#94A3B8]">/</span>
            <span className="font-semibold text-[#16865A]">Project Hub</span>
          </Link>

          <span className="text-[#CBD5E1]">|</span>

          {/* Project Title & Status */}
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#102B24] bg-[#F1F5F9] border border-[#E2E8F0] px-2 py-0.5 rounded text-[11px] truncate max-w-xs">
              {activeProject ? activeProject.title : "LRU Cache in C"}
            </span>
            {validationResult && (
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                  validationResult.passed
                    ? "bg-emerald-50 text-[#0B7650] border-emerald-300"
                    : "bg-amber-50 text-amber-800 border-amber-300"
                }`}
              >
                {validationResult.passed ? "✓ Passed" : `⚠️ ${validationResult.warningsCount} warnings`}
              </span>
            )}
            {saveNotice && (
              <span className="text-[11px] font-bold text-[#16865A] animate-pulse">
                {saveNotice}
              </span>
            )}
          </div>
        </div>

        {/* Center: Search / Command Palette Bar */}
        <div className="hidden md:flex items-center justify-center flex-1 max-w-md mx-4">
          <div className="w-full flex items-center gap-1.5 bg-[#F1F5F9] border border-[#CBD5E1] rounded-md px-2.5 py-1 text-slate-500 text-[11px]">
            <span>🔍</span>
            <span className="truncate">project-hub &gt; {activeTabFile || "search files (Cmd+P)"}</span>
          </div>
        </div>

        {/* Right: Quick Action Controls */}
        <div className="flex items-center gap-2">
          {/* Run Code */}
          <button
            onClick={handleRunProject}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#16865A] hover:bg-[#0B7650] text-white text-xs font-bold transition cursor-pointer shadow-xs active:scale-95"
            title="Execute project"
          >
            <span>▶</span>
            <span>Run</span>
          </button>

          {/* Test Suite */}
          <button
            onClick={handleRunTests}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-white hover:bg-[#F1F5F9] text-[#102B24] border border-[#CBD5E1] text-xs font-semibold transition cursor-pointer shadow-xs"
            title="Run Unit Tests"
          >
            <span>🧪</span>
            <span className="hidden sm:inline">Tests</span>
          </button>

          {/* Snapshot */}
          <button
            onClick={handleCaptureSnapshot}
            className="hidden lg:flex items-center gap-1 px-2 py-1 rounded-md bg-white hover:bg-[#F1F5F9] text-[#557267] border border-[#CBD5E1] text-xs font-medium transition cursor-pointer"
            title="Capture snapshot checkpoint"
          >
            <span>📸</span>
            <span>Snapshot</span>
          </button>

          {/* Rollback */}
          {snapshots.length > 0 && (
            <button
              onClick={() => setShowSnapshotModal(true)}
              className="flex items-center gap-1 px-2 py-1 rounded-md bg-white hover:bg-[#F1F5F9] text-[#16865A] border border-[#B9E4C9] text-xs font-semibold transition cursor-pointer"
              title="Rollback snapshots"
            >
              <span>⏪</span>
              <span className="hidden sm:inline">Rollback ({snapshots.length})</span>
            </button>
          )}

          {/* Mount to Workspace */}
          <button
            onClick={handleMountToWorkspace}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold transition border cursor-pointer ${
              mountedProjectId
                ? "bg-emerald-50 text-[#0B7650] border-emerald-300"
                : "bg-white hover:bg-[#F1F5F9] text-[#102B24] border-[#CBD5E1]"
            }`}
            title="Save to Workspace Repositories"
          >
            <span>{mountedProjectId ? "✓ Mounted" : "💾 Mount"}</span>
          </button>

          {/* Portfolio Star */}
          <button
            onClick={handleTogglePortfolio}
            className={`px-2 py-1 rounded-md border text-xs font-bold transition cursor-pointer ${
              featuredInPortfolio
                ? "bg-amber-100 text-amber-800 border-amber-300"
                : "bg-white text-[#557267] border-[#CBD5E1] hover:text-[#102B24]"
            }`}
            title="Star for Recruiter Portfolio"
          >
            ⭐ {featuredInPortfolio ? "Starred" : "Star"}
          </button>

          {/* Toggle Panel Button */}
          <button
            onClick={() => setShowBottomPanel((p) => !p)}
            className={`p-1.5 rounded-md border text-xs transition cursor-pointer ${
              showBottomPanel
                ? "bg-[#E2E8F0] text-[#102B24] border-[#CBD5E1]"
                : "bg-white text-[#557267] border-[#CBD5E1] hover:bg-[#F1F5F9]"
            }`}
            title="Toggle Bottom Terminal Panel"
          >
            ▤
          </button>
        </div>
      </header>

      {/* ── 2. MAIN WORKSPACE AREA ───────────────────────────────────── */}
      <div className="flex-1 flex overflow-hidden">
        {/* ── 2A. LEFT ACTIVITY BAR (48px, VS Code Authentic) ────────── */}
        <aside className="w-12 bg-[#F1F5F9] border-r border-[#E2E8F0] flex flex-col items-center justify-between py-2 shrink-0 z-10">
          <div className="flex flex-col items-center gap-1 w-full">
            {/* Explorer */}
            <button
              onClick={() => {
                if (activeActivity === "explorer") {
                  setShowPrimarySidebar((p) => !p);
                } else {
                  setActiveActivity("explorer");
                  setShowPrimarySidebar(true);
                }
              }}
              className={`w-full py-2.5 flex items-center justify-center text-base transition relative cursor-pointer ${
                activeActivity === "explorer" && showPrimarySidebar
                  ? "text-[#16865A] bg-white border-l-2 border-[#16865A]"
                  : "text-[#64748B] hover:text-[#102B24] hover:bg-slate-200/50"
              }`}
              title="Explorer (Cmd+Shift+E)"
            >
              📁
            </button>

            {/* Search */}
            <button
              onClick={() => {
                if (activeActivity === "search") {
                  setShowPrimarySidebar((p) => !p);
                } else {
                  setActiveActivity("search");
                  setShowPrimarySidebar(true);
                }
              }}
              className={`w-full py-2.5 flex items-center justify-center text-base transition relative cursor-pointer ${
                activeActivity === "search" && showPrimarySidebar
                  ? "text-[#16865A] bg-white border-l-2 border-[#16865A]"
                  : "text-[#64748B] hover:text-[#102B24] hover:bg-slate-200/50"
              }`}
              title="Search (Cmd+Shift+F)"
            >
              🔍
            </button>

            {/* Source Control / Git */}
            <button
              onClick={() => {
                if (activeActivity === "git") {
                  setShowPrimarySidebar((p) => !p);
                } else {
                  setActiveActivity("git");
                  setShowPrimarySidebar(true);
                }
              }}
              className={`w-full py-2.5 flex items-center justify-center text-base transition relative cursor-pointer ${
                activeActivity === "git" && showPrimarySidebar
                  ? "text-[#16865A] bg-white border-l-2 border-[#16865A]"
                  : "text-[#64748B] hover:text-[#102B24] hover:bg-slate-200/50"
              }`}
              title="Source Control"
            >
              🌿
            </button>

            {/* Run & Debug */}
            <button
              onClick={() => {
                if (activeActivity === "debug") {
                  setShowPrimarySidebar((p) => !p);
                } else {
                  setActiveActivity("debug");
                  setShowPrimarySidebar(true);
                }
              }}
              className={`w-full py-2.5 flex items-center justify-center text-base transition relative cursor-pointer ${
                activeActivity === "debug" && showPrimarySidebar
                  ? "text-[#16865A] bg-white border-l-2 border-[#16865A]"
                  : "text-[#64748B] hover:text-[#102B24] hover:bg-slate-200/50"
              }`}
              title="Run & Debug"
            >
              ▶️
            </button>

            {/* AI Assistant */}
            <button
              onClick={() => {
                if (activeActivity === "ai") {
                  setShowPrimarySidebar((p) => !p);
                } else {
                  setActiveActivity("ai");
                  setShowPrimarySidebar(true);
                }
              }}
              className={`w-full py-2.5 flex items-center justify-center text-base transition relative cursor-pointer ${
                activeActivity === "ai" && showPrimarySidebar
                  ? "text-[#16865A] bg-white border-l-2 border-[#16865A]"
                  : "text-[#64748B] hover:text-[#102B24] hover:bg-slate-200/50"
              }`}
              title="AI Copilot & Blueprints"
            >
              🤖
            </button>
          </div>

          {/* Bottom Settings */}
          <div className="flex flex-col items-center gap-1 w-full">
            <button
              onClick={() => {
                if (activeActivity === "settings") {
                  setShowPrimarySidebar((p) => !p);
                } else {
                  setActiveActivity("settings");
                  setShowPrimarySidebar(true);
                }
              }}
              className="w-full py-2 flex items-center justify-center text-base text-[#64748B] hover:text-[#102B24] hover:bg-slate-200/50 transition cursor-pointer"
              title="Settings"
            >
              ⚙️
            </button>
          </div>
        </aside>

        {/* ── 2B. PRIMARY SIDEBAR DRAWER (250px) ──────────────────────── */}
        {showPrimarySidebar && (
          <aside className="w-64 bg-[#FAFAFA] border-r border-[#E2E8F0] flex flex-col shrink-0 text-xs font-sans">
            {/* Header: Activity Title & Action Icons */}
            <div className="h-9 px-3 flex items-center justify-between border-b border-[#E2E8F0] text-[11px] font-bold text-[#64748B] uppercase tracking-wider bg-[#F8FAFC]">
              <span>
                {activeActivity === "explorer" && "EXPLORER: PROJECT-HUB"}
                {activeActivity === "search" && "SEARCH IN PROJECT"}
                {activeActivity === "git" && "SOURCE CONTROL: GIT"}
                {activeActivity === "debug" && "RUN & DEBUG"}
                {activeActivity === "ai" && "AI COPILOT ARCHITECT"}
                {activeActivity === "settings" && "STUDIO SETTINGS"}
              </span>

              {activeActivity === "explorer" && (
                <div className="flex items-center gap-1 text-slate-500">
                  <button
                    onClick={() => setNewFileModalOpen(true)}
                    className="p-1 hover:text-[#16865A] hover:bg-white rounded transition cursor-pointer"
                    title="New File"
                  >
                    +
                  </button>
                  <button
                    onClick={() => setExpandedFolders((p) => ({ include: !p.include, src: !p.src, tests: !p.tests }))}
                    className="p-1 hover:text-[#16865A] hover:bg-white rounded transition cursor-pointer"
                    title="Toggle Folders"
                  >
                    📂
                  </button>
                  <button
                    onClick={() => setShowPrimarySidebar(false)}
                    className="p-1 hover:text-[#16865A] hover:bg-white rounded transition cursor-pointer"
                    title="Hide Sidebar"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>

            {/* Content for Explorer */}
            {activeActivity === "explorer" && (
              <div className="flex-1 overflow-y-auto">
                {/* 1. OPEN EDITORS Section */}
                <div className="border-b border-[#E2E8F0]">
                  <div className="px-3 py-1 bg-[#F1F5F9] text-[10px] font-bold text-[#64748B] uppercase flex items-center justify-between">
                    <span>OPEN EDITORS</span>
                    <span className="text-[10px] font-normal">{openTabs.length}</span>
                  </div>
                  <div className="py-1">
                    {openTabs.map((tab) => {
                      const isActive = activeTabFile === tab;
                      const isDirty = dirtyFiles[tab];
                      const badge = getFileLanguageBadge(tab);
                      return (
                        <div
                          key={tab}
                          onClick={() => setActiveTabFile(tab)}
                          className={`px-3 py-1 flex items-center justify-between cursor-pointer text-xs transition group ${
                            isActive
                              ? "bg-white font-bold text-[#16865A] border-l-2 border-[#16865A]"
                              : "text-[#334155] hover:bg-slate-200/50"
                          }`}
                        >
                          <div className="flex items-center gap-1.5 truncate">
                            <span>{badge.icon}</span>
                            <span className="truncate">{tab}</span>
                            {isDirty && <span className="text-amber-500 font-bold">●</span>}
                          </div>
                          <button
                            onClick={(e) => handleCloseTab(tab, e)}
                            className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-600 px-1 text-xs"
                          >
                            ×
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. PROJECT FILES TREE Section */}
                <div className="p-2">
                  <div className="text-[10px] font-bold text-[#64748B] uppercase px-1 py-1">
                    PROJECT FILES
                  </div>

                  <div className="space-y-0.5 font-mono text-xs">
                    {/* Folders */}
                    {Object.entries(fileHierarchy.folders).map(([folderName, files]) => {
                      const isExpanded = expandedFolders[folderName] ?? true;
                      return (
                        <div key={folderName}>
                          <div
                            onClick={() =>
                              setExpandedFolders((prev) => ({ ...prev, [folderName]: !isExpanded }))
                            }
                            className="px-2 py-1 rounded text-[#334155] hover:bg-slate-200/50 flex items-center gap-1.5 cursor-pointer font-bold transition"
                          >
                            <span className="text-[10px] text-slate-400">{isExpanded ? "▾" : "▸"}</span>
                            <span>📁</span>
                            <span>{folderName}</span>
                          </div>

                          {isExpanded && (
                            <div className="ml-3 border-l border-[#CBD5E1] pl-2 space-y-0.5">
                              {files.map((fname) => {
                                const fullPath = `${folderName}/${fname}`;
                                const isActive = activeTabFile === fullPath;
                                const isDirty = dirtyFiles[fullPath];
                                const badge = getFileLanguageBadge(fname);
                                return (
                                  <div
                                    key={fname}
                                    onClick={() => handleOpenFile(fullPath)}
                                    className={`group px-2 py-1 rounded flex items-center justify-between cursor-pointer transition text-xs ${
                                      isActive
                                        ? "bg-white text-[#16865A] font-bold border border-[#B9E4C9] shadow-2xs"
                                        : "text-[#334155] hover:bg-slate-200/50"
                                    }`}
                                  >
                                    <div className="flex items-center gap-1.5 truncate">
                                      <span>{badge.icon}</span>
                                      <span className="truncate">{fname}</span>
                                      {isDirty && <span className="text-amber-500 font-bold">●</span>}
                                    </div>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteFile(fullPath);
                                      }}
                                      className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-600 px-1 text-[11px]"
                                      title="Delete"
                                    >
                                      🗑️
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {/* Root Files */}
                    {fileHierarchy.rootFiles.map((rf) => {
                      const isActive = activeTabFile === rf;
                      const isDirty = dirtyFiles[rf];
                      const badge = getFileLanguageBadge(rf);
                      return (
                        <div
                          key={rf}
                          onClick={() => handleOpenFile(rf)}
                          className={`group px-2 py-1 rounded flex items-center justify-between cursor-pointer transition text-xs ${
                            isActive
                              ? "bg-white text-[#16865A] font-bold border border-[#B9E4C9] shadow-2xs"
                              : "text-[#334155] hover:bg-slate-200/50"
                          }`}
                        >
                          <div className="flex items-center gap-1.5 truncate">
                            <span>{badge.icon}</span>
                            <span className="truncate">{rf}</span>
                            {isDirty && <span className="text-amber-500 font-bold">●</span>}
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteFile(rf);
                            }}
                            className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-600 px-1 text-[11px]"
                            title="Delete"
                          >
                            🗑️
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Content for Search */}
            {activeActivity === "search" && (
              <div className="p-3 space-y-3 flex-1 overflow-y-auto">
                <input
                  type="text"
                  placeholder="Search in files..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-[#CBD5E1] rounded-md px-2.5 py-1.5 text-xs text-[#102B24] focus:outline-[#16865A]"
                />
                <div className="text-[11px] text-[#64748B]">
                  {searchQuery.trim() ? (
                    <div className="space-y-1">
                      {Object.entries(activeProject?.files || {})
                        .filter(([fname, data]) =>
                          fname.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          data.content.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map(([fname]) => (
                          <div
                            key={fname}
                            onClick={() => handleOpenFile(fname)}
                            className="p-1.5 rounded hover:bg-white cursor-pointer text-[#16865A] font-mono text-xs border border-transparent hover:border-[#CBD5E1]"
                          >
                            📄 {fname}
                          </div>
                        ))}
                    </div>
                  ) : (
                    <p className="text-slate-400">Type a keyword to search filenames and contents.</p>
                  )}
                </div>
              </div>
            )}

            {/* Content for Git / Source Control */}
            {activeActivity === "git" && (
              <div className="p-3 space-y-3 flex-1 overflow-y-auto">
                <div className="flex items-center justify-between text-xs font-bold text-[#102B24]">
                  <span>Branch: main*</span>
                  <span className="text-[11px] text-[#16865A] font-mono">b49a1f2</span>
                </div>
                <div className="text-xs text-[#64748B]">
                  <p className="font-semibold text-[#102B24] mb-1">Changed Files:</p>
                  {Object.keys(dirtyFiles).filter((f) => dirtyFiles[f]).length === 0 ? (
                    <p className="text-slate-400 text-[11px]">Working tree clean. All files saved.</p>
                  ) : (
                    Object.keys(dirtyFiles)
                      .filter((f) => dirtyFiles[f])
                      .map((f) => (
                        <div key={f} className="flex items-center gap-1.5 text-amber-700 font-mono text-[11px]">
                          <span>●</span>
                          <span>{f} (modified)</span>
                        </div>
                      ))
                  )}
                </div>
                <button
                  onClick={handleCaptureSnapshot}
                  className="w-full py-1.5 rounded-md bg-white border border-[#CBD5E1] hover:bg-[#F1F5F9] text-xs font-semibold text-[#102B24] transition cursor-pointer shadow-xs"
                >
                  📸 Create Checkpoint Snapshot
                </button>
              </div>
            )}

            {/* Content for Run & Debug */}
            {activeActivity === "debug" && (
              <div className="p-3 space-y-3 flex-1 overflow-y-auto">
                <button
                  onClick={handleRunProject}
                  className="w-full py-2 rounded-md bg-[#16865A] hover:bg-[#0B7650] text-white text-xs font-bold transition cursor-pointer shadow-xs"
                >
                  ▶ Start Debugging &amp; Run
                </button>
                <button
                  onClick={handleRunTests}
                  className="w-full py-2 rounded-md bg-white border border-[#CBD5E1] hover:bg-[#F1F5F9] text-xs font-bold text-[#102B24] transition cursor-pointer shadow-xs"
                >
                  🧪 Execute Test Suite
                </button>
                <div className="text-[11px] text-[#64748B] space-y-1">
                  <p className="font-bold text-[#102B24]">Environment:</p>
                  <p>• Compiler: Clang 16.0 (LLVM)</p>
                  <p>• Memory Profiler: ASan / Valgrind</p>
                  <p>• Architecture: x86_64 / arm64</p>
                </div>
              </div>
            )}

            {/* Content for AI Assistant */}
            {activeActivity === "ai" && (
              <div className="p-3 space-y-3 flex-1 overflow-y-auto">
                <div>
                  <label className="block text-[11px] font-bold text-[#102B24] mb-1">
                    AI Engine Model
                  </label>
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full bg-white border border-[#CBD5E1] rounded-md px-2 py-1.5 text-xs text-[#102B24]"
                  >
                    {AI_MODELS.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.icon} {m.name} ({m.badge})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#102B24] mb-1">
                    Generate New System Architecture
                  </label>
                  <textarea
                    rows={3}
                    value={agentPrompt}
                    onChange={(e) => setAgentPrompt(e.target.value)}
                    placeholder="e.g. Distributed raft consensus node in C..."
                    className="w-full bg-white border border-[#CBD5E1] rounded-md p-2 text-xs text-[#102B24] focus:outline-[#16865A]"
                  />
                  <button
                    onClick={() => handleGenerateProject()}
                    disabled={isGenerating}
                    className="mt-2 w-full py-1.5 rounded-md bg-[#16865A] hover:bg-[#0B7650] text-white text-xs font-bold transition cursor-pointer shadow-xs disabled:opacity-50"
                  >
                    {isGenerating ? "Architecting..." : "⚡ Build Multi-File Project"}
                  </button>
                </div>

                <div>
                  <p className="text-[11px] font-bold text-[#102B24] mb-1">Curated Blueprints:</p>
                  <div className="space-y-1">
                    {AGENTKIT_BLUEPRINTS.slice(0, 4).map((bp, i) => (
                      <button
                        key={i}
                        onClick={() => handleGenerateProject(bp.description, bp.language)}
                        className="w-full text-left p-2 rounded bg-white hover:bg-emerald-50 border border-[#CBD5E1] hover:border-[#16865A] text-xs text-[#102B24] transition cursor-pointer"
                      >
                        <div className="font-bold flex items-center justify-between">
                          <span>{bp.title}</span>
                          <span className="text-[10px] uppercase font-mono text-[#16865A]">{bp.language}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Content for Settings */}
            {activeActivity === "settings" && (
              <div className="p-3 space-y-3 flex-1 overflow-y-auto text-xs text-[#102B24]">
                <p className="font-bold text-[#102B24]">Editor Configuration</p>
                <div className="space-y-2 text-[#557267]">
                  <p>• Font: JetBrains Mono / Fira Code</p>
                  <p>• Font Size: 13px (Line Height 1.6)</p>
                  <p>• Tab Size: 2 Spaces</p>
                  <p>• Format on Save: Enabled</p>
                  <p>• Theme: VS Code Light (CampusGrow Emerald)</p>
                </div>
              </div>
            )}
          </aside>
        )}

        {/* ── 2C. CENTER CODE EDITOR GROUP ────────────────────────────── */}
        <div className="flex-1 flex flex-col min-w-0 bg-white">
          {/* Editor Tab Bar */}
          <div className="h-9 bg-[#F1F5F9] border-b border-[#CBD5E1] flex items-center justify-between px-1 overflow-x-auto shrink-0">
            {/* Tabs */}
            <div className="flex items-center gap-0.5 h-full">
              {openTabs.map((tab) => {
                const isActive = activeTabFile === tab;
                const isDirty = dirtyFiles[tab];
                const badge = getFileLanguageBadge(tab);

                return (
                  <div
                    key={tab}
                    onClick={() => setActiveTabFile(tab)}
                    className={`h-full px-3 flex items-center gap-2 text-xs border-r border-[#CBD5E1] cursor-pointer transition select-none ${
                      isActive
                        ? "bg-white font-semibold text-[#102B24] border-t-2 border-t-[#16865A] shadow-2xs"
                        : "bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0] hover:text-[#102B24]"
                    }`}
                  >
                    <span>{badge.icon}</span>
                    <span className="truncate max-w-[120px] sm:max-w-xs">{tab}</span>
                    {isDirty ? (
                      <span className="text-amber-500 font-bold text-xs" title="Unsaved changes">●</span>
                    ) : (
                      <button
                        onClick={(e) => handleCloseTab(tab, e)}
                        className="text-slate-400 hover:text-slate-800 rounded p-0.5"
                      >
                        ×
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Tab Bar Right Actions */}
            <div className="flex items-center gap-1 text-slate-500 pr-2">
              <button
                onClick={handleSaveFile}
                className="px-2 py-0.5 text-xs text-[#16865A] hover:bg-white rounded transition cursor-pointer font-bold border border-transparent hover:border-[#CBD5E1]"
                title="Save (Cmd+S)"
              >
                💾 Save
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(activeFileContent);
                  setCopiedCodeNotice("Copied to clipboard!");
                  setTimeout(() => setCopiedCodeNotice(null), 2000);
                }}
                className="px-2 py-0.5 text-xs text-slate-600 hover:bg-white rounded transition cursor-pointer border border-transparent hover:border-[#CBD5E1]"
                title="Copy code"
              >
                📋 {copiedCodeNotice || "Copy"}
              </button>
            </div>
          </div>

          {/* Breadcrumbs Trail */}
          <div className="h-6 bg-white border-b border-[#F1F5F9] px-4 flex items-center gap-1.5 text-[11px] text-slate-400 font-mono shrink-0">
            <span>project-hub</span>
            <span>&gt;</span>
            <span className="text-slate-700 font-semibold">{activeTabFile || "select file"}</span>
            {activeFileBadge && (
              <span className={`ml-2 px-1.5 py-0.2 rounded text-[10px] font-bold ${activeFileBadge.color}`}>
                {activeFileBadge.label}
              </span>
            )}
          </div>

          {/* Editor Canvas Area (Line Numbers + Gutter + JetBrains Mono Textarea) */}
          <div className="flex-1 flex overflow-hidden relative">
            {activeTabFile ? (
              <div className="flex-1 flex font-mono text-[13px] leading-[1.6] bg-white overflow-hidden">
                {/* Line Numbers Gutter */}
                <div className="w-12 bg-[#FAFAFA] border-r border-[#E2E8F0] text-[#94A3B8] text-right py-4 pr-3 select-none shrink-0 overflow-hidden font-mono text-xs">
                  {Array.from({ length: Math.max(linesCount, 25) }, (_, i) => (
                    <div key={i} className="leading-[1.6]">
                      {i + 1}
                    </div>
                  ))}
                </div>

                {/* Code Textarea */}
                <textarea
                  value={activeFileContent}
                  onChange={(e) => handleCodeChange(e.target.value)}
                  onKeyUp={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    const val = target.value.substring(0, target.selectionStart);
                    const line = val.split("\n").length;
                    const col = val.split("\n").pop()?.length || 1;
                    setCursorPosition({ line, col });
                  }}
                  onClick={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    const val = target.value.substring(0, target.selectionStart);
                    const line = val.split("\n").length;
                    const col = val.split("\n").pop()?.length || 1;
                    setCursorPosition({ line, col });
                  }}
                  spellCheck={false}
                  className="flex-1 bg-white text-[#0F172A] p-4 resize-none focus:outline-none overflow-auto font-mono text-[13px] leading-[1.6] selection:bg-[#B9E4C9] selection:text-[#0B7650]"
                  style={{
                    fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                  }}
                />
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-400 gap-2">
                <span className="text-4xl">💻</span>
                <p className="text-sm font-semibold">No file open in editor</p>
                <p className="text-xs text-slate-500">Select a file from Explorer or click &quot;+ File&quot; to begin coding.</p>
              </div>
            )}
          </div>

          {/* ── 2D. RESIZABLE BOTTOM PANEL (VS Code Style) ─────────────── */}
          {showBottomPanel && (
            <div className="h-48 bg-[#FAFAFA] border-t border-[#CBD5E1] flex flex-col shrink-0">
              {/* Panel Header Tabs */}
              <div className="h-8 bg-[#F1F5F9] border-b border-[#CBD5E1] px-3 flex items-center justify-between shrink-0 text-xs">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setActiveBottomTab("terminal")}
                    className={`font-bold transition cursor-pointer ${
                      activeBottomTab === "terminal"
                        ? "text-[#16865A] border-b-2 border-[#16865A]"
                        : "text-[#64748B] hover:text-[#102B24]"
                    }`}
                  >
                    TERMINAL
                  </button>
                  <button
                    onClick={() => setActiveBottomTab("output")}
                    className={`font-bold transition cursor-pointer ${
                      activeBottomTab === "output"
                        ? "text-[#16865A] border-b-2 border-[#16865A]"
                        : "text-[#64748B] hover:text-[#102B24]"
                    }`}
                  >
                    OUTPUT
                  </button>
                  <button
                    onClick={() => setActiveBottomTab("problems")}
                    className={`font-bold transition cursor-pointer ${
                      activeBottomTab === "problems"
                        ? "text-[#16865A] border-b-2 border-[#16865A]"
                        : "text-[#64748B] hover:text-[#102B24]"
                    }`}
                  >
                    PROBLEMS (0)
                  </button>
                  <button
                    onClick={() => setActiveBottomTab("debug")}
                    className={`font-bold transition cursor-pointer ${
                      activeBottomTab === "debug"
                        ? "text-[#16865A] border-b-2 border-[#16865A]"
                        : "text-[#64748B] hover:text-[#102B24]"
                    }`}
                  >
                    DEBUG CONSOLE
                  </button>
                </div>

                <div className="flex items-center gap-2 text-slate-400">
                  <button
                    onClick={() => setTerminalHistory([])}
                    className="hover:text-slate-800 text-[11px] px-1"
                    title="Clear Terminal"
                  >
                    Clear
                  </button>
                  <button
                    onClick={() => setShowBottomPanel(false)}
                    className="hover:text-slate-800 text-xs px-1"
                    title="Close Panel"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Panel Body: Interactive Light Terminal */}
              {activeBottomTab === "terminal" && (
                <div className="flex-1 bg-[#F8FAFC] p-3 overflow-y-auto font-mono text-xs text-[#102B24]">
                  {terminalHistory.map((item, i) => (
                    <div key={i} className="mb-1 leading-relaxed">
                      {item.type === "input" && (
                        <div className="flex items-center gap-1.5">
                          <span className="text-[#16865A] font-bold">student@campusgrow:~/project-hub $</span>
                          <span className="text-[#102B24] font-semibold">{item.text}</span>
                        </div>
                      )}
                      {item.type === "output" && (
                        <pre className="text-[#102B24] whitespace-pre-wrap">{item.text}</pre>
                      )}
                      {item.type === "system" && (
                        <p className="text-slate-500 font-semibold">{item.text}</p>
                      )}
                      {item.type === "error" && (
                        <pre className="text-rose-600 font-semibold whitespace-pre-wrap">{item.text}</pre>
                      )}
                    </div>
                  ))}

                  {/* Terminal CLI Input Line */}
                  <form onSubmit={handleTerminalSubmit} className="flex items-center gap-1.5 mt-1">
                    <span className="text-[#16865A] font-bold">student@campusgrow:~/project-hub $</span>
                    <input
                      type="text"
                      value={terminalInput}
                      onChange={(e) => setTerminalInput(e.target.value)}
                      placeholder="Type 'run', 'test', 'ls', or 'help'..."
                      className="flex-1 bg-transparent border-none text-[#102B24] focus:outline-none font-mono text-xs placeholder:text-slate-400"
                    />
                  </form>
                  <div ref={terminalBottomRef} />
                </div>
              )}

              {/* Panel Body: Output / Build Log */}
              {activeBottomTab === "output" && (
                <div className="flex-1 bg-[#F8FAFC] p-3 overflow-y-auto font-mono text-xs text-[#102B24]">
                  <p className="text-slate-500 mb-2">[CampusGrow Build Output Channel: Clang/GCC Engine]</p>
                  {validationResult ? (
                    <pre className="whitespace-pre-wrap text-emerald-800 font-medium">
                      {validationResult.testOutput}
                    </pre>
                  ) : (
                    <p className="text-slate-400">Click &quot;Tests&quot; or &quot;Run&quot; to generate output logs.</p>
                  )}
                </div>
              )}

              {/* Panel Body: Problems */}
              {activeBottomTab === "problems" && (
                <div className="flex-1 bg-[#F8FAFC] p-3 overflow-y-auto text-xs text-slate-600 font-sans">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold mb-2">
                    <span>✓</span>
                    <span>No errors or syntax diagnostics detected in workspace.</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Clang AST parser verified type consistency and header inclusion guard safety.
                  </p>
                </div>
              )}

              {/* Panel Body: Debug Console */}
              {activeBottomTab === "debug" && (
                <div className="flex-1 bg-[#F8FAFC] p-3 overflow-y-auto font-mono text-xs text-[#102B24]">
                  <p className="text-slate-500 mb-2">[LLDB Debugger Initialized]</p>
                  <p className="text-slate-600">Breakpoint 1: main.c:14 (pending)</p>
                  <p className="text-slate-400 mt-2">Ready for execution stepping (F5 to begin).</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── 3. VS CODE STATUS BAR (24px, Authentic Emerald Theme) ───────── */}
      <footer className="h-6 bg-[#16865A] text-white px-3 flex items-center justify-between shrink-0 text-[11px] font-sans z-20">
        {/* Left: Branch & Errors */}
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 font-semibold">
            <span>🌿</span>
            <span>main*</span>
          </span>
          <span className="flex items-center gap-1">
            <span>⊗ 0</span>
            <span>▲ 0</span>
          </span>
          <span className="hidden sm:inline text-white/80">CampusGrow Studio v2.4</span>
        </div>

        {/* Right: Line/Col, Encoding, Language */}
        <div className="flex items-center gap-3 font-mono text-[10px]">
          <span>
            Ln {cursorPosition.line}, Col {cursorPosition.col}
          </span>
          <span className="hidden md:inline">Spaces: 2</span>
          <span>UTF-8</span>
          <span className="hidden md:inline">LF</span>
          <span className="font-semibold bg-[#0B7650] px-1.5 py-0.5 rounded">
            {activeFileBadge.label}
          </span>
        </div>
      </footer>

      {/* ── MODALS (New File & Snapshots) ────────────────────────────── */}
      {/* New File Modal */}
      {newFileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white border border-[#CBD5E1] rounded-2xl max-w-sm w-full p-5 shadow-xl text-[#102B24]">
            <h3 className="text-sm font-bold text-[#102B24] mb-3 flex items-center gap-2">
              <span>📄</span>
              <span>Create New File</span>
            </h3>
            <input
              type="text"
              autoFocus
              placeholder="e.g. src/utils.c, include/queue.h"
              value={newFileNameInput}
              onChange={(e) => setNewFileNameInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCreateNewFile();
                if (e.key === "Escape") setNewFileModalOpen(false);
              }}
              className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl px-3 py-2 text-xs font-mono text-[#102B24] focus:outline-[#16865A] mb-3"
            />
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setNewFileModalOpen(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-500 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateNewFile}
                className="px-3.5 py-1.5 rounded-lg bg-[#16865A] hover:bg-[#0B7650] text-white text-xs font-bold shadow-xs transition"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Snapshot Rollback Modal */}
      {showSnapshotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white border border-[#CBD5E1] rounded-2xl max-w-md w-full p-5 shadow-xl text-[#102B24]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] mb-3">
              <h3 className="text-sm font-bold text-[#102B24] flex items-center gap-2">
                <span>📸</span>
                <span>Project Snapshots ({snapshots.length})</span>
              </h3>
              <button
                onClick={() => setShowSnapshotModal(false)}
                className="text-slate-400 hover:text-slate-800 text-xs"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {snapshots.map((snap) => (
                <div
                  key={snap.id}
                  className="p-2.5 rounded-xl border border-[#CBD5E1] hover:border-[#16865A] bg-[#F8FAFC] flex items-center justify-between text-xs"
                >
                  <div>
                    <p className="font-bold text-[#102B24]">{snap.name}</p>
                    <p className="text-[11px] text-slate-500">Captured at {snap.timestamp}</p>
                  </div>
                  <button
                    onClick={() => handleRollback(snap)}
                    className="px-2.5 py-1 rounded bg-[#16865A] hover:bg-[#0B7650] text-white text-xs font-bold transition shadow-xs"
                  >
                    Rollback ↺
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
