"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { cProjects, Project, DeploymentPlatformGuide } from "@/data/projects";
import PaywallGate from "@/components/PaywallGate";

type Tab = "milestones" | "ai-guide" | "git-guide" | "deployment" | "architecture";

export default function ProjectDetailPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params?.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("milestones");
  const [completedMilestones, setCompletedMilestones] = useState<string[]>([]);
  const [activeHint, setActiveHint] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedPromptIdx, setCopiedPromptIdx] = useState<number | null>(null);
  const [copiedGitIdx, setCopiedGitIdx] = useState<number | null>(null);
  const [copiedDeployIdx, setCopiedDeployIdx] = useState<number | null>(null);
  const [selectedDeployPlatform, setSelectedDeployPlatform] = useState<number>(0);

  useEffect(() => {
    const found = cProjects.find((p) => p.id === projectId);
    if (found) {
      setProject(found);
    }

    try {
      const savedMilestones = JSON.parse(
        localStorage.getItem(`project_milestones_${projectId}`) || "[]"
      );
      setCompletedMilestones(savedMilestones);
    } catch {
      // Ignore parse error
    }
  }, [projectId]);

  if (!project) {
    return (
      <main className="min-h-screen bg-white dark:bg-[#0b0813] p-10 text-center text-gray-900 dark:text-gray-100">
        <h1 className="text-2xl font-bold">Project not found</h1>
        <button
          onClick={() => router.push("/projects")}
          className="mt-4 rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white"
        >
          Back to Projects
        </button>
      </main>
    );
  }

  const toggleMilestone = (milestoneId: string) => {
    let updated: string[];
    if (completedMilestones.includes(milestoneId)) {
      updated = completedMilestones.filter((id) => id !== milestoneId);
    } else {
      updated = [...completedMilestones, milestoneId];
    }
    setCompletedMilestones(updated);
    localStorage.setItem(
      `project_milestones_${projectId}`,
      JSON.stringify(updated)
    );

    try {
      const globalProjects: string[] = JSON.parse(
        localStorage.getItem("completedProjects") || "[]"
      );
      if (updated.length === project.milestones.length) {
        if (!globalProjects.includes(projectId)) {
          globalProjects.push(projectId);
          localStorage.setItem(
            "completedProjects",
            JSON.stringify(globalProjects)
          );
        }
      } else {
        const filtered = globalProjects.filter((id) => id !== projectId);
        localStorage.setItem("completedProjects", JSON.stringify(filtered));
      }
    } catch {
      // Ignore parse error
    }
  };

  const copyStarterCode = () => {
    navigator.clipboard.writeText(project.starterCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const copyPrompt = (promptText: string, idx: number) => {
    navigator.clipboard.writeText(promptText);
    setCopiedPromptIdx(idx);
    setTimeout(() => setCopiedPromptIdx(null), 2000);
  };

  const copyGitCommand = (cmd: string, idx: number) => {
    navigator.clipboard.writeText(cmd);
    setCopiedGitIdx(idx);
    setTimeout(() => setCopiedGitIdx(null), 2000);
  };

  const copyDeployFile = (content: string, idx: number) => {
    navigator.clipboard.writeText(content);
    setCopiedDeployIdx(idx);
    setTimeout(() => setCopiedDeployIdx(null), 2000);
  };

  const isAllComplete =
    completedMilestones.length === project.milestones.length;

  return (
    <PaywallGate featureKey="projects">
      <main className="flex-1 bg-white dark:bg-[#0b0813] text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
        {/* Top Header Bar */}
        <div className="border-b border-gray-200 dark:border-purple-500/20 bg-gray-50/50 dark:bg-[#120f24]">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => router.push("/projects")}
              className="text-xs font-bold rounded-lg border border-gray-300 dark:border-purple-500/30 px-3.5 py-2 hover:bg-gray-100 dark:hover:bg-purple-900/30 transition flex items-center gap-1.5 text-gray-700 dark:text-gray-300"
            >
              ← Back to All Projects
            </button>

            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300">
                {project.category}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold ${
                  project.difficulty === "Beginner"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300"
                    : project.difficulty === "Intermediate"
                    ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
                    : "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300"
                }`}
              >
                {project.difficulty}
              </span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="mx-auto max-w-6xl px-6 pt-8 pb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                Pin-to-Pin Engineering Blueprint
              </p>
              <h1 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight">
                {project.title}
              </h1>
              <p className="mt-2 text-base text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
                {project.overview}
              </p>
            </div>

            {/* Quick Completion Stats */}
            <div className="shrink-0 rounded-2xl border border-gray-200 dark:border-purple-500/20 bg-gray-50/70 dark:bg-[#12101e] p-5 text-center min-w-[180px]">
              <span className="text-xs uppercase font-bold text-gray-500 dark:text-gray-400">
                Milestones Done
              </span>
              <div className="mt-1 text-2xl font-black text-purple-600 dark:text-purple-400">
                {completedMilestones.length} / {project.milestones.length}
              </div>
              <p className="text-[11px] text-gray-500 mt-0.5">
                {isAllComplete ? "🎉 Completed!" : "In Progress"}
              </p>
            </div>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="mt-8 flex flex-wrap gap-2 border-b border-gray-200 dark:border-purple-500/20 pb-3">
            {[
              { id: "milestones", label: "📋 Milestones & Code", badge: `${project.milestones.length}` },
              { id: "ai-guide", label: "🤖 AI Tools Blueprint (Antigravity)", badge: "Prompts" },
              { id: "git-guide", label: "🐙 Git & GitHub Workflow", badge: "Commits" },
              { id: "deployment", label: "🚀 Multi-Platform Deploy", badge: `${project.deploymentGuides.length} Targets` },
              { id: "architecture", label: "🏗️ Architecture & Tree", badge: "Files" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                  activeTab === tab.id
                    ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                    : "bg-gray-100 dark:bg-[#16122b] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-purple-900/30"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`rounded-md px-1.5 py-0.5 text-[10px] font-extrabold ${
                    activeTab === tab.id
                      ? "bg-purple-800 text-purple-100"
                      : "bg-gray-200 dark:bg-purple-950/60 text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {tab.badge}
                </span>
              </button>
            ))}
          </div>

          {/* TAB 1: MILESTONES & STARTER CODE */}
          {activeTab === "milestones" && (
            <div className="mt-8 space-y-10">
              {/* Learning Outcomes */}
              <section className="rounded-3xl border border-gray-200 dark:border-purple-500/20 bg-gray-50/50 dark:bg-[#12101e] p-6 md:p-8">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <span>🎯</span> What You Will Practice & Master
                </h2>
                <ul className="mt-4 grid gap-3 md:grid-cols-3">
                  {project.learningOutcomes.map((outcome, idx) => (
                    <li
                      key={idx}
                      className="rounded-2xl border border-gray-200 dark:border-purple-500/20 bg-white dark:bg-[#1a1630] p-4 text-xs font-semibold leading-relaxed text-gray-800 dark:text-gray-200 shadow-sm"
                    >
                      <span className="text-emerald-500 mr-2">✓</span>
                      {outcome}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Milestones Checklist */}
              <section>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">Project Milestones</h2>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      Check off each milestone as you build it in your code editor or with Antigravity.
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-extrabold text-lg text-purple-600 dark:text-purple-400">
                      {completedMilestones.length} / {project.milestones.length}
                    </span>
                    <p className="text-xs text-gray-500">Completed</p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {project.milestones.map((m, idx) => {
                    const isChecked = completedMilestones.includes(m.id);
                    const showHint = activeHint === m.id;

                    return (
                      <div
                        key={m.id}
                        className={`rounded-2xl border p-5 transition-all ${
                          isChecked
                            ? "border-emerald-300 dark:border-emerald-700/50 bg-emerald-50/40 dark:bg-emerald-950/20"
                            : "border-gray-200 dark:border-purple-500/20 bg-white dark:bg-[#12101e]"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <button
                              onClick={() => toggleMilestone(m.id)}
                              className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-xs font-bold transition ${
                                isChecked
                                  ? "border-emerald-600 bg-emerald-600 text-white"
                                  : "border-gray-400 bg-white dark:bg-[#1a1630] hover:border-black dark:hover:border-white"
                              }`}
                            >
                              {isChecked && "✓"}
                            </button>

                            <div>
                              <h3 className="font-bold text-base text-gray-900 dark:text-white">
                                Milestone {idx + 1}: {m.title}
                              </h3>
                              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                {m.description}
                              </p>
                            </div>
                          </div>

                          <button
                            onClick={() =>
                              setActiveHint(showHint ? null : m.id)
                            }
                            className="rounded-lg border border-gray-200 dark:border-purple-500/30 px-3 py-1 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:border-black dark:hover:border-white transition shrink-0"
                          >
                            {showHint ? "Hide Hint" : "💡 Hint"}
                          </button>
                        </div>

                        {showHint && (
                          <div className="mt-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 p-4 text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
                            <p className="font-bold mb-1">Mentor Hint:</p>
                            {m.hint}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Starter Code Scaffold */}
              <section className="rounded-3xl border border-gray-200 dark:border-purple-500/20 bg-gray-50/50 dark:bg-[#12101e] p-6 md:p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold">Starter Code Scaffold</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      Copy this blueprint into your editor to kickstart implementation.
                    </p>
                  </div>
                  <button
                    onClick={copyStarterCode}
                    className="rounded-xl bg-purple-600 hover:bg-purple-500 px-4 py-2 text-xs font-bold text-white shadow-sm transition"
                  >
                    {copiedCode ? "Copied! ✓" : "Copy Starter Code"}
                  </button>
                </div>

                <pre className="mt-4 overflow-x-auto rounded-2xl bg-black p-6 text-xs font-mono leading-6 text-emerald-400 max-h-96 border border-gray-800">
                  {project.starterCode}
                </pre>
              </section>

              {/* Resume / Portfolio Summary */}
              <section className="rounded-3xl border border-purple-200 dark:border-purple-800/40 bg-purple-50/50 dark:bg-purple-950/20 p-6 md:p-8">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300">
                  📄 Placement Resume & Portfolio Bullet Point
                </span>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-gray-800 dark:text-gray-200">
                  "{project.portfolioSummary}"
                </p>
              </section>
            </div>
          )}

          {/* TAB 2: AI TOOLS BLUEPRINT (ANTIGRAVITY, CURSOR, CLAUDE) */}
          {activeTab === "ai-guide" && (
            <div className="mt-8 space-y-8">
              <div className="rounded-3xl border border-purple-200 dark:border-purple-500/30 bg-purple-50/40 dark:bg-[#120f24] p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">🤖</span>
                  <div>
                    <h2 className="text-2xl font-bold">
                      Pin-to-Pin AI Prompt Blueprint
                    </h2>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      Learn how top 1% engineers use AI pair-programming tools (Google Antigravity, Cursor AI, Claude Code, GitHub Copilot) to build, test, and harden this project in hours instead of weeks.
                    </p>
                  </div>
                </div>

                {/* Best Practice Tips */}
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {project.aiGuide.tips.map((tip, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-purple-200/80 dark:border-purple-500/20 bg-white dark:bg-[#1a1630] p-4 text-xs text-gray-700 dark:text-gray-300"
                    >
                      <strong className="text-purple-600 dark:text-purple-400">💡 Pro AI Tip {idx + 1}:</strong> {tip}
                    </div>
                  ))}
                </div>
              </div>

              {/* Prompt Stages */}
              <div className="space-y-6">
                {project.aiGuide.prompts.map((p, idx) => (
                  <div
                    key={idx}
                    className="rounded-3xl border border-gray-200 dark:border-purple-500/20 bg-white dark:bg-[#12101e] p-6 md:p-8 shadow-sm transition hover:border-purple-400"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="rounded-lg bg-purple-100 dark:bg-purple-900/40 px-2.5 py-1 text-xs font-bold text-purple-700 dark:text-purple-300">
                          {p.phase}
                        </span>
                        <span className="rounded-lg bg-gray-100 dark:bg-gray-800 px-2.5 py-1 text-xs font-semibold text-gray-700 dark:text-gray-300">
                          Recommended: {p.tool}
                        </span>
                      </div>

                      <button
                        onClick={() => copyPrompt(p.prompt, idx)}
                        className="rounded-xl bg-purple-600 hover:bg-purple-500 px-4 py-2 text-xs font-bold text-white transition flex items-center gap-1.5 shadow-sm"
                      >
                        {copiedPromptIdx === idx ? "Copied Prompt! ✓" : "📋 Copy Prompt"}
                      </button>
                    </div>

                    <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {p.description}
                    </p>

                    {/* The Prompt Box */}
                    <div className="mt-4 relative rounded-2xl bg-black dark:bg-[#07050d] p-5 border border-gray-800">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 block mb-2">
                        Exact Prompt to Paste into {p.tool}:
                      </span>
                      <pre className="text-xs font-mono text-gray-200 whitespace-pre-wrap leading-relaxed">
                        {p.prompt}
                      </pre>
                    </div>

                    <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">Expected AI Output:</span> {p.expectedOutput}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: GIT & GITHUB COMMITS WORKFLOW */}
          {activeTab === "git-guide" && (
            <div className="mt-8 space-y-8">
              <div className="rounded-3xl border border-emerald-200 dark:border-emerald-800/40 bg-emerald-50/40 dark:bg-[#081812] p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">🐙</span>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Git & GitHub Commit Roadmap
                    </h2>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                      Step-by-step commands to initialize your git repository, write clean semantic commits (`feat`, `fix`, `chore`), create feature branches, and push to GitHub with release tags.
                    </p>
                  </div>
                </div>
              </div>

              {/* Steps timeline */}
              <div className="space-y-6">
                {project.gitWorkflow.steps.map((step, idx) => (
                  <div
                    key={step.step}
                    className="rounded-3xl border border-gray-200 dark:border-purple-500/20 bg-white dark:bg-[#12101e] p-6 md:p-8 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
                          {step.step}
                        </span>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {step.title}
                        </h3>
                      </div>

                      <button
                        onClick={() => copyGitCommand(step.command, idx)}
                        className="rounded-xl border border-gray-300 dark:border-purple-500/30 px-3.5 py-1.5 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-purple-900/30 transition"
                      >
                        {copiedGitIdx === idx ? "Copied! ✓" : "Copy Command"}
                      </button>
                    </div>

                    <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                      {step.explanation}
                    </p>

                    <div className="mt-4 rounded-2xl bg-black p-5 text-xs font-mono text-emerald-400 overflow-x-auto border border-gray-800">
                      <pre className="whitespace-pre-wrap">{step.command}</pre>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: MULTI-TOOL DEPLOYMENT PLAYBOOK */}
          {activeTab === "deployment" && (
            <div className="mt-8 space-y-8">
              <div className="rounded-3xl border border-blue-200 dark:border-blue-800/40 bg-blue-50/40 dark:bg-[#0b1426] p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">🚀</span>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Multi-Platform Deployment Playbook
                    </h2>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                      Deploy this application to real production clouds: Cloudflare (Pages/Workers), Vercel, Docker & Render, or a Linux VPS with Nginx and SSL.
                    </p>
                  </div>
                </div>
              </div>

              {/* Platform Switcher */}
              <div className="flex flex-wrap gap-3">
                {project.deploymentGuides.map((guide, idx) => (
                  <button
                    key={guide.platform}
                    onClick={() => setSelectedDeployPlatform(idx)}
                    className={`flex items-center gap-2 rounded-2xl border px-5 py-3 text-sm font-bold transition ${
                      selectedDeployPlatform === idx
                        ? "border-blue-500 bg-blue-600 text-white shadow-md shadow-blue-500/20"
                        : "border-gray-200 dark:border-purple-500/20 bg-white dark:bg-[#12101e] text-gray-700 dark:text-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <span>{guide.icon}</span>
                    <span>{guide.platform}</span>
                    <span
                      className={`ml-1 rounded-md px-2 py-0.5 text-[10px] font-extrabold ${
                        selectedDeployPlatform === idx
                          ? "bg-blue-800 text-blue-100"
                          : "bg-gray-100 dark:bg-purple-900/40 text-gray-600 dark:text-gray-300"
                      }`}
                    >
                      {guide.badge}
                    </span>
                  </button>
                ))}
              </div>

              {/* Selected Platform Guide Details */}
              {project.deploymentGuides[selectedDeployPlatform] && (
                <div className="rounded-3xl border border-gray-200 dark:border-purple-500/20 bg-white dark:bg-[#12101e] p-6 md:p-8 shadow-sm space-y-6">
                  <div>
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <span>{project.deploymentGuides[selectedDeployPlatform].icon}</span>
                      <span>Deploying on {project.deploymentGuides[selectedDeployPlatform].platform}</span>
                    </h3>

                    {/* Prerequisites */}
                    <div className="mt-3 flex flex-wrap gap-2 items-center">
                      <span className="text-xs font-bold text-gray-500 dark:text-gray-400">Prerequisites:</span>
                      {project.deploymentGuides[selectedDeployPlatform].prerequisites.map((req, i) => (
                        <span
                          key={i}
                          className="rounded-lg bg-gray-100 dark:bg-purple-900/20 px-2.5 py-1 text-xs text-gray-700 dark:text-gray-300"
                        >
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Steps */}
                  <div className="space-y-6 pt-4 border-t border-gray-100 dark:border-purple-500/20">
                    {project.deploymentGuides[selectedDeployPlatform].steps.map((s, idx) => (
                      <div key={idx} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                              {idx + 1}
                            </span>
                            {s.title}
                          </h4>

                          {s.fileContent && (
                            <button
                              onClick={() => copyDeployFile(s.fileContent!, idx)}
                              className="rounded-lg border border-gray-300 dark:border-purple-500/30 px-3 py-1 text-xs font-bold hover:bg-gray-100 dark:hover:bg-purple-900/30 transition"
                            >
                              {copiedDeployIdx === idx ? "Copied File! ✓" : `Copy ${s.filePath || "File"}`}
                            </button>
                          )}
                        </div>

                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {s.description}
                        </p>

                        {s.command && (
                          <div className="rounded-2xl bg-black p-4 text-xs font-mono text-emerald-400 overflow-x-auto border border-gray-800">
                            <pre>{s.command}</pre>
                          </div>
                        )}

                        {s.fileContent && (
                          <div className="rounded-2xl bg-black p-4 text-xs font-mono text-gray-200 overflow-x-auto border border-gray-800">
                            {s.filePath && (
                              <span className="text-[10px] font-bold text-blue-400 block mb-2">
                                📄 {s.filePath}:
                              </span>
                            )}
                            <pre className="whitespace-pre-wrap">{s.fileContent}</pre>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Verification URL */}
                  <div className="pt-4 border-t border-gray-100 dark:border-purple-500/20 flex items-center justify-between text-xs">
                    <span className="text-gray-500 dark:text-gray-400 font-medium">
                      Verification Endpoint / Format:
                    </span>
                    <code className="rounded-lg bg-gray-100 dark:bg-purple-900/30 px-3 py-1 text-purple-700 dark:text-purple-300 font-mono">
                      {project.deploymentGuides[selectedDeployPlatform].verifyUrl}
                    </code>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: ARCHITECTURE & FILE TREE */}
          {activeTab === "architecture" && (
            <div className="mt-8 space-y-8">
              <div className="rounded-3xl border border-gray-200 dark:border-purple-500/20 bg-white dark:bg-[#12101e] p-6 md:p-8">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <span>🏗️</span> Production Directory Structure
                </h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Recommended file layout for maximum modularity and clean architectural separation of concerns.
                </p>

                <pre className="mt-6 rounded-2xl bg-black p-6 text-xs font-mono text-emerald-400 overflow-x-auto border border-gray-800 leading-relaxed">
                  {project.fileStructure}
                </pre>
              </div>
            </div>
          )}

          {/* Bottom Completion Banner */}
          <div className="mt-12 text-center pt-8 border-t border-gray-200 dark:border-purple-500/20">
            {isAllComplete ? (
              <div className="rounded-3xl bg-emerald-600 dark:bg-emerald-950/60 border border-emerald-500 p-8 text-white">
                <h3 className="text-2xl font-extrabold">
                  🎉 Fantastic Engineering! Project Completed!
                </h3>
                <p className="mt-2 text-emerald-100 text-sm max-w-xl mx-auto">
                  You have marked all milestones complete. Add this project to your resume with the provided bullet point and push your git repo to showcase on your GitHub profile.
                </p>
                <button
                  onClick={() => router.push("/projects")}
                  className="mt-6 rounded-xl bg-white px-6 py-3 text-xs font-extrabold text-emerald-900 shadow-lg hover:bg-emerald-50 transition"
                >
                  Back to All Projects
                </button>
              </div>
            ) : (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Stuck on a milestone or deployment? Open the{" "}
                <button
                  onClick={() => router.push("/terminal")}
                  className="font-bold text-purple-600 dark:text-purple-400 underline underline-offset-4"
                >
                  Developer Terminal
                </button>{" "}
                to test bash commands or ask the AI Mentor!
              </p>
            )}
          </div>
        </div>
      </main>
    </PaywallGate>
  );
}
