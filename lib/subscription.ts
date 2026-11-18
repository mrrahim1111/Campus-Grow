// Subscription & Access Control Engine for CampusGrow
// Learning (/learn, /lessons/*), AI Mentor (/mentor), and Career Roadmaps are FREE.
// Remaining features (Quiz, Mock Interview, Resume Builder, Projects) require CampusGrow PRO.

export type FeatureKey = "learn" | "mentor" | "quiz" | "interview" | "resume" | "projects" | "career" | "workspace" | "agentkit" | "project-hub";

export interface FeatureMeta {
  key: FeatureKey;
  title: string;
  isFree: boolean;
  tier: "Free" | "Pro";
  description: string;
  badge: string;
}

export const FEATURE_CONFIG: Record<FeatureKey, FeatureMeta> = {
  learn: {
    key: "learn",
    title: "Curriculum & Lessons",
    isFree: true,
    tier: "Free",
    description: "10 rigorous systems engineering lessons from hardware to pointers.",
    badge: "100% Free",
  },
  mentor: {
    key: "mentor",
    title: "AI Engineering Mentor",
    isFree: true,
    tier: "Free",
    description: "Interactive AI mentor answering systems programming & C doubts.",
    badge: "100% Free",
  },
  quiz: {
    key: "quiz",
    title: "Engineering Quizzes & Tests",
    isFree: false,
    tier: "Pro",
    description: "Timed exams, memory model quizzes, and compiler diagnostics testing.",
    badge: "PRO Only",
  },
  interview: {
    key: "interview",
    title: "Mock Written & Live Interviews",
    isFree: false,
    tier: "Pro",
    description: "Simulated tech giant interviews with real-time feedback & rubrics.",
    badge: "PRO Only",
  },
  resume: {
    key: "resume",
    title: "AI Resume Builder & Skill Gap Analysis",
    isFree: false,
    tier: "Pro",
    description: "ATS-optimized resume engine with tailored video recommendation assistant.",
    badge: "PRO Only",
  },
  projects: {
    key: "projects",
    title: "Production Capstone Projects",
    isFree: false,
    tier: "Pro",
    description: "Kernel modules, high-throughput web servers, and distributed key-value engines.",
    badge: "PRO Only",
  },
  career: {
    key: "career",
    title: "Branch-Specific Career Roadmaps",
    isFree: true,
    tier: "Free",
    description: "Free step-by-step career tracks for AI/ML, DevOps, Cloud, and Systems.",
    badge: "100% Free",
  },
  workspace: {
    key: "workspace",
    title: "Project Workspace & Repository Storage",
    isFree: false,
    tier: "Pro",
    description: "Cloud Git-style repository storage, file trees, commit history, and automated student portfolio sync.",
    badge: "PRO Only",
  },
  agentkit: {
    key: "agentkit",
    title: "Project Hub (AI Studio)",
    isFree: false,
    tier: "Pro",
    description: "Autonomous multi-file project scaffolding, architecture planning, and verification engine.",
    badge: "PRO Only",
  },
  "project-hub": {
    key: "project-hub",
    title: "Project Hub (AI Studio)",
    isFree: false,
    tier: "Pro",
    description: "Autonomous multi-file project scaffolding, architecture planning, and verification engine.",
    badge: "PRO Only",
  },
};
