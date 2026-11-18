"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import PaywallGate from "@/components/PaywallGate";
import BrandLogo from "@/components/BrandLogo";
import MobileNav from "@/components/MobileNav";

// ─── Types ────────────────────────────────────────────────────────────────────

type ResumeData = {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  objective: string;
  education: string;
  branch: string;
  year: string;
  cgpa: string;
  skills: string[];
  projects: { title: string; description: string; tech: string }[];
  certifications: string[];
  languages: string[];
};

type SkillSuggestion = {
  skill: string;
  reason: string;
  priority: "Must Learn" | "Recommended" | "Good to Know";
  youtubeQuery: string;
  youtubeVideos: { title: string; channel: string; url: string }[];
};

type JobRole = {
  id: string;
  title: string;
  emoji: string;
  requiredSkills: string[];
  niceToHaveSkills: string[];
};

// ─── Job Roles Database ────────────────────────────────────────────────────────

const jobRoles: JobRole[] = [
  {
    id: "sde",
    title: "Software Development Engineer (SDE)",
    emoji: "💻",
    requiredSkills: ["Data Structures", "Algorithms", "OOP", "System Design", "SQL", "Git"],
    niceToHaveSkills: ["Docker", "Kubernetes", "Cloud (AWS/GCP)", "Redis", "Microservices"],
  },
  {
    id: "frontend",
    title: "Frontend Developer",
    emoji: "🎨",
    requiredSkills: ["HTML", "CSS", "JavaScript", "React", "TypeScript", "Git"],
    niceToHaveSkills: ["Next.js", "Tailwind CSS", "Redux", "Testing (Jest)", "Figma"],
  },
  {
    id: "backend",
    title: "Backend Developer",
    emoji: "⚙️",
    requiredSkills: ["Node.js or Python", "SQL", "REST APIs", "Git", "OOP", "System Design"],
    niceToHaveSkills: ["MongoDB", "Docker", "Redis", "Microservices", "GraphQL"],
  },
  {
    id: "ml-engineer",
    title: "Machine Learning Engineer",
    emoji: "🤖",
    requiredSkills: ["Python", "NumPy", "Pandas", "Machine Learning", "Statistics", "SQL"],
    niceToHaveSkills: ["TensorFlow", "PyTorch", "Deep Learning", "Data Visualization", "MLOps"],
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    emoji: "📊",
    requiredSkills: ["SQL", "Excel", "Python or R", "Data Visualization", "Statistics"],
    niceToHaveSkills: ["Power BI", "Tableau", "Pandas", "Machine Learning Basics", "BigQuery"],
  },
  {
    id: "devops",
    title: "DevOps / Cloud Engineer",
    emoji: "☁️",
    requiredSkills: ["Linux", "Docker", "Git", "CI/CD", "Shell Scripting"],
    niceToHaveSkills: ["Kubernetes", "Terraform", "AWS/GCP/Azure", "Ansible", "Prometheus"],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity Analyst",
    emoji: "🔐",
    requiredSkills: ["Networking", "Linux", "Security Fundamentals", "Ethical Hacking Basics", "Python"],
    niceToHaveSkills: ["Kali Linux", "OWASP", "Penetration Testing", "Wireshark", "CEH Certification"],
  },
];

// ─── YouTube Video Suggestions by Skill ───────────────────────────────────────

const youtubeBySkill: Record<string, { title: string; channel: string; url: string }[]> = {
  "Data Structures": [
    { title: "Data Structures Full Course", channel: "freeCodeCamp", url: "https://www.youtube.com/watch?v=RBSGKlAvoiM" },
    { title: "Data Structures & Algorithms", channel: "Abdul Bari", url: "https://www.youtube.com/watch?v=0IAPZzGSbME" },
  ],
  "Algorithms": [
    { title: "Algorithms Course - Full Tutorial", channel: "freeCodeCamp", url: "https://www.youtube.com/watch?v=KEEKn7Me-ms" },
    { title: "Sorting Algorithms Visualized", channel: "CS Dojo", url: "https://www.youtube.com/watch?v=pkkFqlG0Cf4" },
  ],
  "Python": [
    { title: "Python for Beginners - Full Course", channel: "freeCodeCamp", url: "https://www.youtube.com/watch?v=rfscVS0vtbw" },
    { title: "Python Tutorial - Python for Beginners", channel: "Programming with Mosh", url: "https://www.youtube.com/watch?v=_uQrJ0TkZlc" },
  ],
  "JavaScript": [
    { title: "JavaScript Full Course for Beginners", channel: "freeCodeCamp", url: "https://www.youtube.com/watch?v=PkZNo7MFNFg" },
    { title: "JavaScript Tutorial for Beginners", channel: "Programming with Mosh", url: "https://www.youtube.com/watch?v=W6NZfCO5SIk" },
  ],
  "React": [
    { title: "React Course - Beginner's Tutorial", channel: "freeCodeCamp", url: "https://www.youtube.com/watch?v=bMknfKXIFA8" },
    { title: "React Tutorial for Beginners", channel: "Programming with Mosh", url: "https://www.youtube.com/watch?v=Ke90Tje7VS0" },
  ],
  "SQL": [
    { title: "SQL Tutorial - Full Database Course", channel: "freeCodeCamp", url: "https://www.youtube.com/watch?v=HXV3zeQKqGY" },
    { title: "MySQL Tutorial for Beginners", channel: "Programming with Mosh", url: "https://www.youtube.com/watch?v=7S_tz1z_5bA" },
  ],
  "Machine Learning": [
    { title: "Machine Learning Course for Beginners", channel: "freeCodeCamp", url: "https://www.youtube.com/watch?v=NWONeJKn6kc" },
    { title: "Machine Learning Specialization", channel: "Stanford Online (Andrew Ng)", url: "https://www.youtube.com/watch?v=jGwO_UgTS7I" },
  ],
  "System Design": [
    { title: "System Design for Beginners Course", channel: "freeCodeCamp", url: "https://www.youtube.com/watch?v=m8Icp_Cid5o" },
    { title: "Gaurav Sen System Design Playlist", channel: "Gaurav Sen", url: "https://www.youtube.com/watch?v=xpDnVSmNFX0" },
  ],
  "Docker": [
    { title: "Docker Tutorial for Beginners", channel: "TechWorld with Nana", url: "https://www.youtube.com/watch?v=3c-iBn73dDE" },
    { title: "Docker Crash Course", channel: "Traversy Media", url: "https://www.youtube.com/watch?v=Wf2eSG3owoA" },
  ],
  "Git": [
    { title: "Git and GitHub for Beginners", channel: "freeCodeCamp", url: "https://www.youtube.com/watch?v=RGOj5yH7evk" },
    { title: "Git Tutorial for Beginners", channel: "Programming with Mosh", url: "https://www.youtube.com/watch?v=8JJ101D3knE" },
  ],
  "Linux": [
    { title: "Linux for Beginners Full Course", channel: "freeCodeCamp", url: "https://www.youtube.com/watch?v=sWbUDq4S6Y8" },
    { title: "Linux Command Line Basics", channel: "The Linux Foundation", url: "https://www.youtube.com/watch?v=yz7nYlnXLfE" },
  ],
  "OOP": [
    { title: "Object Oriented Programming in 7 minutes", channel: "Mosh", url: "https://www.youtube.com/watch?v=pTB0EiLXUC8" },
    { title: "OOP Concepts in Java", channel: "freeCodeCamp", url: "https://www.youtube.com/watch?v=6T_HgnjoYwM" },
  ],
  "Deep Learning": [
    { title: "Deep Learning Crash Course", channel: "freeCodeCamp", url: "https://www.youtube.com/watch?v=VyWAvY2CF9c" },
    { title: "Neural Networks from Scratch", channel: "Sentdex", url: "https://www.youtube.com/watch?v=Wo5dMEP_BbI" },
  ],
  "Statistics": [
    { title: "Statistics for Data Science", channel: "StatQuest with Josh Starmer", url: "https://www.youtube.com/watch?v=xxpc-HPKN28" },
    { title: "Statistics Full Course", channel: "freeCodeCamp", url: "https://www.youtube.com/watch?v=xxpc-HPKN28" },
  ],
  "TypeScript": [
    { title: "TypeScript Tutorial for Beginners", channel: "Programming with Mosh", url: "https://www.youtube.com/watch?v=d56mG7DezGs" },
    { title: "TypeScript Course for Beginners", channel: "Academind", url: "https://www.youtube.com/watch?v=BwuLxPH8IDs" },
  ],
};

function getVideosForSkill(skill: string) {
  for (const key of Object.keys(youtubeBySkill)) {
    if (skill.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(skill.toLowerCase())) {
      return youtubeBySkill[key];
    }
  }
  return [
    {
      title: `Learn ${skill} - Full Tutorial`,
      channel: "freeCodeCamp",
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(skill + " tutorial for beginners")}`,
    },
    {
      title: `${skill} Crash Course`,
      channel: "Traversy Media",
      url: `https://www.youtube.com/results?search_query=${encodeURIComponent(skill + " crash course")}`,
    },
  ];
}

// ─── AI Analysis Engine ────────────────────────────────────────────────────────

function analyzeResume(skills: string[], targetRoleId: string): SkillSuggestion[] {
  const role = jobRoles.find((r) => r.id === targetRoleId);
  if (!role) return [];

  const userSkillsLower = skills.map((s) => s.toLowerCase());

  function hasSkill(required: string) {
    return userSkillsLower.some(
      (us) =>
        us.includes(required.toLowerCase()) ||
        required.toLowerCase().includes(us)
    );
  }

  const suggestions: SkillSuggestion[] = [];

  role.requiredSkills.forEach((skill) => {
    if (!hasSkill(skill)) {
      suggestions.push({
        skill,
        reason: `${skill} is a core requirement for ${role.title}. Most job descriptions list this as mandatory.`,
        priority: "Must Learn",
        youtubeQuery: `${skill} tutorial for beginners`,
        youtubeVideos: getVideosForSkill(skill),
      });
    }
  });

  role.niceToHaveSkills.forEach((skill) => {
    if (!hasSkill(skill)) {
      suggestions.push({
        skill,
        reason: `${skill} will make you stand out among candidates. Many companies list this as a bonus.`,
        priority: suggestions.length < 3 ? "Recommended" : "Good to Know",
        youtubeQuery: `${skill} tutorial`,
        youtubeVideos: getVideosForSkill(skill),
      });
    }
  });

  return suggestions.slice(0, 8);
}

// ─── Components ───────────────────────────────────────────────────────────────

function SkillTag({ skill, onRemove }: { skill: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-sm font-medium text-gray-700">
      {skill}
      <button onClick={onRemove} className="ml-0.5 text-gray-400 hover:text-red-500 font-bold leading-none">×</button>
    </span>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

type ActiveTab = "builder" | "preview" | "ai-coach";

export default function ResumePage() {
  const router = useRouter();
  const printRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<ActiveTab>("builder");
  const [targetRole, setTargetRole] = useState("sde");
  const [suggestions, setSuggestions] = useState<SkillSuggestion[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [newProject, setNewProject] = useState({ title: "", description: "", tech: "" });
  const [addingProject, setAddingProject] = useState(false);
  const [certInput, setCertInput] = useState("");
  const [langInput, setLangInput] = useState("");

  const [resume, setResume] = useState<ResumeData>({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    objective: "",
    education: "",
    branch: "",
    year: "",
    cgpa: "",
    skills: [],
    projects: [],
    certifications: [],
    languages: ["English"],
  });

  // Pre-fill from onboarding data
  useEffect(() => {
    try {
      const sd = JSON.parse(localStorage.getItem("studentData") || "{}");
      setResume((prev) => ({
        ...prev,
        name: sd.name || prev.name,
        branch: sd.branch || prev.branch,
        year: sd.year || prev.year,
      }));
    } catch { /* ignore */ }
  }, []);

  // Re-analyze whenever resume skills or target role changes
  useEffect(() => {
    setSuggestions(analyzeResume(resume.skills, targetRole));
  }, [resume.skills, targetRole]);

  function update(field: keyof ResumeData, value: string) {
    setResume((prev) => ({ ...prev, [field]: value }));
  }

  function addSkill() {
    const trimmed = skillInput.trim();
    if (trimmed && !resume.skills.includes(trimmed)) {
      setResume((prev) => ({ ...prev, skills: [...prev.skills, trimmed] }));
    }
    setSkillInput("");
  }

  function removeSkill(skill: string) {
    setResume((prev) => ({ ...prev, skills: prev.skills.filter((s) => s !== skill) }));
  }

  function addProject() {
    if (newProject.title.trim()) {
      setResume((prev) => ({ ...prev, projects: [...prev.projects, { ...newProject }] }));
      setNewProject({ title: "", description: "", tech: "" });
      setAddingProject(false);
    }
  }

  function removeProject(idx: number) {
    setResume((prev) => ({ ...prev, projects: prev.projects.filter((_, i) => i !== idx) }));
  }

  function addCert() {
    const trimmed = certInput.trim();
    if (trimmed && !resume.certifications.includes(trimmed)) {
      setResume((prev) => ({ ...prev, certifications: [...prev.certifications, trimmed] }));
    }
    setCertInput("");
  }

  function addLang() {
    const trimmed = langInput.trim();
    if (trimmed && !resume.languages.includes(trimmed)) {
      setResume((prev) => ({ ...prev, languages: [...prev.languages, trimmed] }));
    }
    setLangInput("");
  }

  const priorityColor: Record<string, string> = {
    "Must Learn": "bg-red-100 text-red-700 border-red-200",
    "Recommended": "bg-yellow-100 text-yellow-700 border-yellow-200",
    "Good to Know": "bg-blue-100 text-blue-700 border-blue-200",
  };

  return (
    <PaywallGate featureKey="resume">
      <main className="flex-1 bg-white text-gray-900 transition-colors duration-300">

      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* Title */}
        <div className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">
          Career Tools
        </div>
        <h1 className="text-4xl font-bold">📄 Resume Builder + AI Coach</h1>
        <p className="mt-2 text-gray-600">
          Build your resume, then let the AI Coach analyze skill gaps and suggest YouTube videos to level up.
        </p>

        {/* Tabs */}
        <div className="mt-8 flex gap-2 border-b border-gray-200 dark:border-purple-500/20">
          {(["builder", "preview", "ai-coach"] as ActiveTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-sm font-semibold transition border-b-2 ${
                activeTab === tab
                  ? "border-purple-500 text-purple-600 dark:text-purple-400"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
              }`}
            >
              {tab === "builder" && "✏️ Build Resume"}
              {tab === "preview" && "👁️ Preview"}
              {tab === "ai-coach" && "🤖 AI Coach"}
            </button>
          ))}
        </div>

        {/* ─── BUILDER TAB ─────────────────────────────────────────────────── */}
        {activeTab === "builder" && (
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            {/* Left: Personal */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-gray-200 dark:border-purple-500/20 bg-white dark:bg-[#12101e] p-6">
                <h2 className="font-bold text-lg mb-4">👤 Personal Information</h2>
                <div className="space-y-3">
                  {[
                    { label: "Full Name", field: "name", placeholder: "Ravi Kumar" },
                    { label: "Email", field: "email", placeholder: "ravi@example.com" },
                    { label: "Phone", field: "phone", placeholder: "+91 98765 43210" },
                    { label: "LinkedIn URL", field: "linkedin", placeholder: "linkedin.com/in/ravi-kumar" },
                    { label: "GitHub URL", field: "github", placeholder: "github.com/ravi-kumar" },
                  ].map((item) => (
                    <div key={item.field}>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">{item.label}</label>
                      <input
                        type="text"
                        value={resume[item.field as keyof ResumeData] as string}
                        onChange={(e) => update(item.field as keyof ResumeData, e.target.value)}
                        placeholder={item.placeholder}
                        className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:border-black focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="rounded-2xl border border-gray-200 p-6">
                <h2 className="font-bold text-lg mb-4">🎓 Education</h2>
                <div className="space-y-3">
                  {[
                    { label: "College / University", field: "education", placeholder: "ABC Engineering College, Chennai" },
                    { label: "Branch / Specialization", field: "branch", placeholder: "CSE (AI & ML)" },
                    { label: "Current Year", field: "year", placeholder: "3rd Year" },
                    { label: "CGPA / Percentage", field: "cgpa", placeholder: "8.5 / 10" },
                  ].map((item) => (
                    <div key={item.field}>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">{item.label}</label>
                      <input
                        type="text"
                        value={resume[item.field as keyof ResumeData] as string}
                        onChange={(e) => update(item.field as keyof ResumeData, e.target.value)}
                        placeholder={item.placeholder}
                        className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:border-black focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Objective */}
              <div className="rounded-2xl border border-gray-200 p-6">
                <h2 className="font-bold text-lg mb-4">🎯 Career Objective</h2>
                <textarea
                  value={resume.objective}
                  onChange={(e) => update("objective", e.target.value)}
                  placeholder="A passionate and dedicated engineering student seeking a Software Developer role where I can apply my skills in C, Python, and Data Structures to build impactful products..."
                  rows={4}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:border-black focus:outline-none resize-none"
                />
              </div>

              {/* Languages */}
              <div className="rounded-2xl border border-gray-200 p-6">
                <h2 className="font-bold text-lg mb-4">🗣️ Languages Known</h2>
                <div className="flex flex-wrap gap-2 mb-3">
                  {resume.languages.map((lang) => (
                    <SkillTag
                      key={lang}
                      skill={lang}
                      onRemove={() =>
                        setResume((prev) => ({
                          ...prev,
                          languages: prev.languages.filter((l) => l !== lang),
                        }))
                      }
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={langInput}
                    onChange={(e) => setLangInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") addLang(); }}
                    placeholder="Add language (e.g. Tamil)"
                    className="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-black focus:outline-none"
                  />
                  <button onClick={addLang} className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800">Add</button>
                </div>
              </div>
            </div>

            {/* Right: Skills, Projects, Certs */}
            <div className="space-y-6">
              {/* Skills */}
              <div className="rounded-2xl border border-gray-200 p-6">
                <h2 className="font-bold text-lg mb-1">🛠️ Technical Skills</h2>
                <p className="text-xs text-gray-400 mb-4">Add each skill separately (e.g. Python, React, SQL)</p>
                <div className="flex flex-wrap gap-2 mb-3 min-h-[40px]">
                  {resume.skills.map((skill) => (
                    <SkillTag key={skill} skill={skill} onRemove={() => removeSkill(skill)} />
                  ))}
                  {resume.skills.length === 0 && (
                    <p className="text-xs text-gray-300 italic">No skills added yet</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") addSkill(); }}
                    placeholder="e.g. Python, Data Structures, React..."
                    className="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-black focus:outline-none"
                  />
                  <button onClick={addSkill} className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800">Add</button>
                </div>
                <p className="mt-2 text-xs text-gray-400">Press Enter or click Add • {resume.skills.length} skills added</p>
              </div>

              {/* Projects */}
              <div className="rounded-2xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-lg">🚀 Projects</h2>
                  <button
                    onClick={() => setAddingProject(true)}
                    className="rounded-xl border border-gray-300 px-3 py-1.5 text-xs font-semibold hover:bg-gray-50"
                  >
                    + Add Project
                  </button>
                </div>

                {resume.projects.length === 0 && !addingProject && (
                  <p className="text-sm text-gray-400 italic">No projects added yet. Add your best projects!</p>
                )}

                <div className="space-y-3">
                  {resume.projects.map((proj, idx) => (
                    <div key={idx} className="rounded-xl border border-gray-200 p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-sm">{proj.title}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{proj.tech}</p>
                          <p className="text-xs text-gray-600 mt-1 leading-relaxed">{proj.description}</p>
                        </div>
                        <button onClick={() => removeProject(idx)} className="text-gray-300 hover:text-red-400 font-bold ml-2">×</button>
                      </div>
                    </div>
                  ))}
                </div>

                {addingProject && (
                  <div className="mt-3 rounded-xl border border-gray-200 p-4 space-y-3">
                    <input
                      type="text"
                      value={newProject.title}
                      onChange={(e) => setNewProject((p) => ({ ...p, title: e.target.value }))}
                      placeholder="Project title (e.g. Student Grade System)"
                      className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-black focus:outline-none"
                    />
                    <input
                      type="text"
                      value={newProject.tech}
                      onChange={(e) => setNewProject((p) => ({ ...p, tech: e.target.value }))}
                      placeholder="Tech stack (e.g. C, File Handling, CLI)"
                      className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-black focus:outline-none"
                    />
                    <textarea
                      value={newProject.description}
                      onChange={(e) => setNewProject((p) => ({ ...p, description: e.target.value }))}
                      placeholder="Brief description of the project and what you achieved..."
                      rows={2}
                      className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-black focus:outline-none resize-none"
                    />
                    <div className="flex gap-2">
                      <button onClick={addProject} className="flex-1 rounded-xl bg-black py-2 text-sm font-semibold text-white hover:bg-gray-800">
                        Save Project
                      </button>
                      <button onClick={() => setAddingProject(false)} className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold hover:bg-gray-50">
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Certifications */}
              <div className="rounded-2xl border border-gray-200 p-6">
                <h2 className="font-bold text-lg mb-4">🏆 Certifications</h2>
                <div className="space-y-2 mb-3">
                  {resume.certifications.map((cert, idx) => (
                    <div key={idx} className="flex items-center justify-between rounded-xl bg-gray-50 px-3 py-2">
                      <span className="text-sm text-gray-700">🎖️ {cert}</span>
                      <button
                        onClick={() =>
                          setResume((prev) => ({ ...prev, certifications: prev.certifications.filter((_, i) => i !== idx) }))
                        }
                        className="text-gray-300 hover:text-red-400 font-bold"
                      >×</button>
                    </div>
                  ))}
                  {resume.certifications.length === 0 && (
                    <p className="text-xs text-gray-400 italic">No certifications added</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={certInput}
                    onChange={(e) => setCertInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") addCert(); }}
                    placeholder="e.g. AWS Cloud Practitioner"
                    className="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-black focus:outline-none"
                  />
                  <button onClick={addCert} className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800">Add</button>
                </div>
              </div>

              {/* Go to AI Coach CTA */}
              <div className="rounded-2xl bg-gray-900 p-6 text-white">
                <div className="text-2xl mb-2">🤖</div>
                <h3 className="font-bold text-lg">AI Coach Ready</h3>
                <p className="mt-1 text-sm text-gray-300">
                  Add your skills above, then visit the AI Coach tab to see exactly what to learn to get your target job — with YouTube video links.
                </p>
                <button
                  onClick={() => setActiveTab("ai-coach")}
                  className="mt-4 w-full rounded-xl bg-white py-2.5 text-sm font-bold text-black hover:bg-gray-100"
                >
                  Open AI Coach →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ─── PREVIEW TAB ─────────────────────────────────────────────────── */}
        {activeTab === "preview" && (
          <div className="mt-8">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-gray-500">Preview of your resume. Use Ctrl+P / ⌘+P to print or save as PDF.</p>
              <button
                onClick={() => window.print()}
                className="rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
              >
                🖨️ Print / Save PDF
              </button>
            </div>

            {/* Resume Document */}
            <div ref={printRef} className="rounded-2xl border border-gray-200 p-10 bg-white shadow-sm font-sans">
              {/* Header */}
              <div className="border-b border-gray-200 pb-6 mb-6">
                <h1 className="text-3xl font-bold text-gray-900">{resume.name || "Your Name"}</h1>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
                  {resume.email && <span>📧 {resume.email}</span>}
                  {resume.phone && <span>📞 {resume.phone}</span>}
                  {resume.linkedin && <span>🔗 {resume.linkedin}</span>}
                  {resume.github && <span>💻 {resume.github}</span>}
                </div>
              </div>

              {/* Objective */}
              {resume.objective && (
                <section className="mb-6">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">Objective</h2>
                  <p className="text-sm text-gray-700 leading-relaxed">{resume.objective}</p>
                </section>
              )}

              {/* Education */}
              {(resume.education || resume.branch) && (
                <section className="mb-6">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">Education</h2>
                  <div>
                    <p className="font-semibold text-sm text-gray-900">{resume.education}</p>
                    <p className="text-sm text-gray-600">
                      {resume.branch} {resume.year && `• ${resume.year}`} {resume.cgpa && `• CGPA: ${resume.cgpa}`}
                    </p>
                  </div>
                </section>
              )}

              {/* Skills */}
              {resume.skills.length > 0 && (
                <section className="mb-6">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">Technical Skills</h2>
                  <p className="text-sm text-gray-700">{resume.skills.join(" • ")}</p>
                </section>
              )}

              {/* Projects */}
              {resume.projects.length > 0 && (
                <section className="mb-6">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">Projects</h2>
                  <div className="space-y-3">
                    {resume.projects.map((proj, idx) => (
                      <div key={idx}>
                        <p className="font-semibold text-sm text-gray-900">
                          {proj.title}
                          {proj.tech && <span className="ml-2 font-normal text-gray-500">({proj.tech})</span>}
                        </p>
                        <p className="text-sm text-gray-700 leading-relaxed">{proj.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Certifications */}
              {resume.certifications.length > 0 && (
                <section className="mb-6">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">Certifications</h2>
                  <ul className="space-y-1">
                    {resume.certifications.map((cert, idx) => (
                      <li key={idx} className="text-sm text-gray-700">• {cert}</li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Languages */}
              {resume.languages.length > 0 && (
                <section>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">Languages</h2>
                  <p className="text-sm text-gray-700">{resume.languages.join(", ")}</p>
                </section>
              )}
            </div>
          </div>
        )}

        {/* ─── AI COACH TAB ────────────────────────────────────────────────── */}
        {activeTab === "ai-coach" && (
          <div className="mt-8">
            {/* Target Role Selector */}
            <div className="rounded-2xl border border-gray-200 p-6 mb-6">
              <h2 className="font-bold text-lg mb-2">🎯 What job are you targeting?</h2>
              <p className="text-sm text-gray-500 mb-4">
                The AI Coach will compare your current skills with what this role requires.
              </p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {jobRoles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => setTargetRole(role.id)}
                    className={`rounded-2xl border-2 p-4 text-left transition ${
                      targetRole === role.id
                        ? "border-black bg-gray-50"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <span className="text-2xl">{role.emoji}</span>
                    <p className="mt-2 text-sm font-semibold leading-tight">{role.title}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Skill Gap Analysis */}
            {resume.skills.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-300 p-10 text-center">
                <div className="text-4xl mb-3">📋</div>
                <h3 className="font-bold text-lg text-gray-700">Add your skills first</h3>
                <p className="mt-2 text-sm text-gray-400">
                  Go to the Build Resume tab → Technical Skills section and add your current skills. The AI Coach will then show you what you&apos;re missing.
                </p>
                <button
                  onClick={() => setActiveTab("builder")}
                  className="mt-4 rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
                >
                  Add Skills →
                </button>
              </div>
            ) : suggestions.length === 0 ? (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
                <div className="text-4xl mb-3">🏆</div>
                <h3 className="font-bold text-xl text-emerald-800">You&apos;re well prepared!</h3>
                <p className="mt-2 text-sm text-emerald-700">
                  Your resume already covers all core and most nice-to-have skills for the selected role. You&apos;re ready to apply!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h2 className="font-bold text-xl">
                      🧠 Skill Gap Report for {jobRoles.find((r) => r.id === targetRole)?.title}
                    </h2>
                    <p className="text-sm text-gray-500 mt-0.5">
                      You have <strong>{resume.skills.length}</strong> skills. Here&apos;s what to learn next:
                    </p>
                  </div>
                  <span className="rounded-full bg-red-100 px-4 py-1.5 text-sm font-bold text-red-700">
                    {suggestions.filter((s) => s.priority === "Must Learn").length} critical gaps
                  </span>
                </div>

                {suggestions.map((suggestion) => (
                  <div
                    key={suggestion.skill}
                    className={`rounded-2xl border p-6 ${
                      suggestion.priority === "Must Learn"
                        ? "border-red-200 bg-red-50"
                        : suggestion.priority === "Recommended"
                        ? "border-yellow-200 bg-yellow-50"
                        : "border-blue-200 bg-blue-50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-lg">{suggestion.skill}</h3>
                          <span className={`rounded-full border px-3 py-0.5 text-xs font-bold ${priorityColor[suggestion.priority]}`}>
                            {suggestion.priority}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-700 leading-relaxed">{suggestion.reason}</p>
                      </div>
                    </div>

                    {/* YouTube Videos */}
                    <div className="mt-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                        🎬 Best YouTube Resources to Learn This
                      </p>
                      <div className="space-y-2">
                        {suggestion.youtubeVideos.map((video, idx) => (
                          <a
                            key={idx}
                            href={video.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 rounded-xl border border-white bg-white px-4 py-3 text-sm shadow-xs hover:border-gray-300 transition group"
                          >
                            <span className="text-xl shrink-0">▶️</span>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-gray-900 truncate group-hover:text-red-600 transition">
                                {video.title}
                              </p>
                              <p className="text-xs text-gray-400">{video.channel}</p>
                            </div>
                            <span className="text-xs text-gray-400 group-hover:text-red-500 shrink-0">Watch →</span>
                          </a>
                        ))}
                        {/* Search link */}
                        <a
                          href={`https://www.youtube.com/results?search_query=${encodeURIComponent(suggestion.youtubeQuery)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-gray-500 hover:text-red-600 transition"
                        >
                          🔍 Search more on YouTube →
                        </a>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Summary Footer */}
                <div className="mt-6 rounded-2xl bg-gray-900 p-6 text-white">
                  <h3 className="font-bold text-lg">📋 Your Learning Roadmap Summary</h3>
                  <div className="mt-3 space-y-2 text-sm">
                    {suggestions
                      .filter((s) => s.priority === "Must Learn")
                      .map((s) => (
                        <div key={s.skill} className="flex items-center gap-2">
                          <span className="text-red-400">🔴</span>
                          <span className="font-semibold">{s.skill}</span>
                          <span className="text-gray-400">— Must learn before applying</span>
                        </div>
                      ))}
                    {suggestions
                      .filter((s) => s.priority === "Recommended")
                      .map((s) => (
                        <div key={s.skill} className="flex items-center gap-2">
                          <span className="text-yellow-400">🟡</span>
                          <span className="font-semibold">{s.skill}</span>
                          <span className="text-gray-400">— Recommended for stronger profile</span>
                        </div>
                      ))}
                    {suggestions
                      .filter((s) => s.priority === "Good to Know")
                      .map((s) => (
                        <div key={s.skill} className="flex items-center gap-2">
                          <span className="text-blue-400">🔵</span>
                          <span className="font-semibold">{s.skill}</span>
                          <span className="text-gray-400">— Good to know</span>
                        </div>
                      ))}
                  </div>
                  <button
                    onClick={() => router.push("/mentor")}
                    className="mt-5 w-full rounded-xl bg-white py-2.5 text-sm font-bold text-black hover:bg-gray-100"
                  >
                    Get Personalized Roadmap from AI Mentor →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  </PaywallGate>
);
}
