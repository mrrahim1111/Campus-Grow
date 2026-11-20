"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import AmbientBackground from "@/components/AmbientBackground";
import { ENGINEERING_DOMAINS, getAllHubCourses } from "@/data/engineeringHub";
import { ALL_CURRICULUM_TRACKS } from "@/data/courseCurriculum";

interface ProgrammingLanguage {
  id: string;
  name: string;
  icon: string;
  paradigm: string;
  tagline: string;
  industryUsage: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  lessonSlug: string;
}

interface CoreSubject {
  id: string;
  name: string;
  icon: string;
  category: "Fundamentals" | "Systems" | "Architecture" | "Data";
  summary: string;
  coreConcepts: string[];
  trackId: string;
  lessonSlug: string;
}

const ALL_PROGRAMMING_LANGUAGES: ProgrammingLanguage[] = [
  {
    id: "c",
    name: "C Programming",
    icon: "🇨",
    paradigm: "Procedural & Memory Management",
    tagline: "The mother of modern languages. Pointers, memory allocation, and kernel systems.",
    industryUsage: ["Linux Kernel", "Embedded Systems", "Operating Systems", "Game Engines"],
    difficulty: "Beginner",
    lessonSlug: "c-programming",
  },
  {
    id: "cpp",
    name: "C++ (Modern C++20)",
    icon: "⚡",
    paradigm: "Multi-paradigm & High Performance",
    tagline: "Ultra high-speed computing, Standard Template Library (STL), and competitive programming.",
    industryUsage: ["High-Frequency Trading", "Robotics", "Competitive Programming", "Browsers"],
    difficulty: "Intermediate",
    lessonSlug: "programming-fundamentals",
  },
  {
    id: "python",
    name: "Python 3",
    icon: "🐍",
    paradigm: "Interpreted & Object-Oriented",
    tagline: "The global language for AI, data science, automation, and backend web APIs.",
    industryUsage: ["Machine Learning", "Generative AI", "Data Analytics", "FastAPI / Django"],
    difficulty: "Beginner",
    lessonSlug: "variables-data-types",
  },
  {
    id: "java",
    name: "Java (Enterprise)",
    icon: "☕",
    paradigm: "Object-Oriented & JVM",
    tagline: "Robust enterprise banking, high-concurrency backends, and Spring Boot microservices.",
    industryUsage: ["Enterprise Banking", "Spring Boot", "Android", "Big Data (Apache Spark)"],
    difficulty: "Intermediate",
    lessonSlug: "oop-classes-objects",
  },
  {
    id: "javascript",
    name: "JavaScript (ES2024)",
    icon: "🟨",
    paradigm: "Event-Driven & Asynchronous",
    tagline: "The bedrock of modern web development, browsers, Node.js, and interactive UIs.",
    industryUsage: ["Full-Stack Web", "Node.js", "Express", "Browser APIs"],
    difficulty: "Beginner",
    lessonSlug: "web-react-nextjs",
  },
  {
    id: "typescript",
    name: "TypeScript",
    icon: "🔷",
    paradigm: "Typed JavaScript Superset",
    tagline: "Type safety, compile-time contracts, and scalable large-scale software engineering.",
    industryUsage: ["Next.js", "React", "Enterprise Full-Stack", "Node.js Backends"],
    difficulty: "Intermediate",
    lessonSlug: "web-react-nextjs",
  },
  {
    id: "golang",
    name: "Go (Golang)",
    icon: "🐹",
    paradigm: "Concurrent & Compiled",
    tagline: "Designed by Google for high-scale network services, goroutines, and Kubernetes.",
    industryUsage: ["Docker / Kubernetes", "Cloud Microservices", "High-Throughput APIs"],
    difficulty: "Intermediate",
    lessonSlug: "cloud-docker-containers",
  },
  {
    id: "rust",
    name: "Rust",
    icon: "🦀",
    paradigm: "Memory-Safe Systems Programming",
    tagline: "Zero-cost abstractions, borrow checker memory safety, and blazingly fast binaries.",
    industryUsage: ["Linux Kernel", "WebAssembly", "Cryptography", "High-Scale Infrastructure"],
    difficulty: "Advanced",
    lessonSlug: "pointers-mini-project",
  },
  {
    id: "sql",
    name: "SQL & Relational Databases",
    icon: "🗄️",
    paradigm: "Declarative Query Language",
    tagline: "Relational database modeling, complex joins, indexing, and ACID transaction control.",
    industryUsage: ["PostgreSQL", "MySQL", "Data Warehousing", "Supabase"],
    difficulty: "Beginner",
    lessonSlug: "dbms-sql-foundations",
  },
  {
    id: "kotlin",
    name: "Kotlin",
    icon: "🟣",
    paradigm: "Modern JVM & Android First",
    tagline: "Concise, expressive, null-safe language for modern Android and server-side JVM apps.",
    industryUsage: ["Modern Android", "Jetpack Compose", "Server-Side Spring Boot"],
    difficulty: "Intermediate",
    lessonSlug: "oop-classes-objects",
  },
  {
    id: "dart",
    name: "Dart & Flutter",
    icon: "🎯",
    paradigm: "Client-Optimized OOP",
    tagline: "Fast cross-platform app development for iOS, Android, web, and desktop from a single codebase.",
    industryUsage: ["Flutter", "Cross-Platform Mobile Apps", "Web UIs"],
    difficulty: "Intermediate",
    lessonSlug: "web-react-nextjs",
  },
  {
    id: "bash",
    name: "Bash & Linux Shell Scripting",
    icon: "🐚",
    paradigm: "Command-Line Automation",
    tagline: "Master Linux piping, environment automation, cron jobs, and DevOps workflows.",
    industryUsage: ["DevOps Automation", "Server Administration", "CI/CD Pipelines"],
    difficulty: "Beginner",
    lessonSlug: "terminal-cli-basics",
  },
  {
    id: "r",
    name: "R Language",
    icon: "📈",
    paradigm: "Statistical & Matrix Computing",
    tagline: "Data modeling, statistical hypothesis testing, and academic data visualization.",
    industryUsage: ["Statistical Research", "Bioinformatics", "Data Analytics"],
    difficulty: "Intermediate",
    lessonSlug: "ai-data-science-pandas",
  },
  {
    id: "swift",
    name: "Swift",
    icon: "🍎",
    paradigm: "Safe & Fast Apple Native",
    tagline: "Native app development for Apple ecosystem (iOS, iPadOS, macOS, watchOS, VisionOS).",
    industryUsage: ["iOS Apps", "SwiftUI", "macOS Software"],
    difficulty: "Intermediate",
    lessonSlug: "oop-classes-objects",
  },
];

const ALL_CORE_SUBJECTS: CoreSubject[] = [
  {
    id: "dsa",
    name: "Data Structures & Algorithms (DSA)",
    icon: "🧩",
    category: "Fundamentals",
    summary: "Arrays, Linked Lists, Trees, Graphs, Dynamic Programming, and Big-O Space/Time Analysis.",
    coreConcepts: ["Big-O Complexity", "Trees & BST", "Graph Traversals (BFS/DFS)", "Dynamic Programming", "Heaps & Hash Tables"],
    trackId: "dsa-mastery",
    lessonSlug: "dsa-arrays-complexity",
  },
  {
    id: "dbms",
    name: "Database Management Systems (DBMS)",
    icon: "💾",
    category: "Data",
    summary: "Relational algebra, normalization (1NF to BCNF), B-Tree indexing, transactions, and concurrency.",
    coreConcepts: ["ACID Properties", "Normalization", "B+ Tree Indexing", "SQL Joins & Triggers", "Transaction Isolation Levels"],
    trackId: "dbms-foundations",
    lessonSlug: "dbms-sql-foundations",
  },
  {
    id: "os",
    name: "Operating Systems & Linux Internals",
    icon: "🖥️",
    category: "Systems",
    summary: "Process scheduling, virtual memory paging, multithreading synchronization, and file system inodes.",
    coreConcepts: ["Process vs Thread", "Virtual Memory & Paging", "Mutex, Semaphores & Deadlocks", "Context Switching", "System Calls"],
    trackId: "os-networks",
    lessonSlug: "os-processes-threads",
  },
  {
    id: "cn",
    name: "Computer Networks & Protocols",
    icon: "🌐",
    category: "Systems",
    summary: "OSI & TCP/IP models, routing protocols, TCP handshake, HTTP/3, WebSockets, and DNS resolution.",
    coreConcepts: ["TCP vs UDP", "Three-Way Handshake", "DNS & IP Routing", "HTTP/2 & HTTP/3", "Sockets & SSL/TLS"],
    trackId: "os-networks",
    lessonSlug: "networks-tcp-ip-sockets",
  },
  {
    id: "oop",
    name: "Object-Oriented Programming (OOP)",
    icon: "🧱",
    category: "Fundamentals",
    summary: "Encapsulation, inheritance, polymorphism, abstraction, and real-world design modeling.",
    coreConcepts: ["Four Pillars of OOP", "Interfaces & Abstract Classes", "Method Overriding & Overloading", "Composition vs Inheritance"],
    trackId: "oop-mastery",
    lessonSlug: "oop-classes-objects",
  },
  {
    id: "system-design",
    name: "System Design (LLD & HLD)",
    icon: "🏗️",
    category: "Architecture",
    summary: "High-scale distributed systems, microservices, load balancing, sharding, caching, and SOLID principles.",
    coreConcepts: ["Load Balancers", "Consistent Hashing", "Database Sharding & Replication", "Caching Strategies (Redis)", "Kafka Event Streams"],
    trackId: "system-design",
    lessonSlug: "system-design-architectures",
  },
  {
    id: "coa",
    name: "Computer Organization & Architecture (COA)",
    icon: "⚙️",
    category: "Systems",
    summary: "CPU instruction cycle, pipelining hazards, cache memory hierarchy, and memory mapped I/O.",
    coreConcepts: ["Instruction Pipeline", "Cache Hit/Miss & L1/L2/L3", "ALU & Registers", "Von Neumann Architecture", "Assembly Language"],
    trackId: "engineering-essentials",
    lessonSlug: "c-programming",
  },
  {
    id: "toc",
    name: "Compiler Design & Theory of Computation",
    icon: "📜",
    category: "Fundamentals",
    summary: "Finite automata, regular expressions, context-free grammars, lexical analysis, and AST parsing.",
    coreConcepts: ["DFA & NFA", "Turing Machines & Computability", "Lexical Analysis & Lex", "AST Parsing", "Code Optimization"],
    trackId: "advanced-algorithms-theory",
    lessonSlug: "programming-fundamentals",
  },
  {
    id: "software-engineering",
    name: "Software Engineering & Clean Code",
    icon: "🛠️",
    category: "Architecture",
    summary: "Git version control, CI/CD pipelines, automated unit testing, agile sprints, and refactoring.",
    coreConcepts: ["Git & GitHub Workflows", "Unit & Integration Testing", "CI/CD Automation", "Design Patterns", "Agile & Scrum"],
    trackId: "engineering-essentials",
    lessonSlug: "git-github-foundations",
  },
];

export default function LearningHubPage() {
  const [activeTab, setActiveTab] = useState<"domains" | "subjects">("domains");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("ALL");
  const [selectedDomainId, setSelectedDomainId] = useState<string>("ALL");
  const [expandedDomainId, setExpandedDomainId] = useState<string | null>(null);

  // Filtered Domains
  const filteredDomains = useMemo(() => {
    return ENGINEERING_DOMAINS.filter((d) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = d.title.toLowerCase().includes(q);
        const matchesDesc = d.description.toLowerCase().includes(q);
        const matchesTech = d.technologies.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesDesc && !matchesTech) return false;
      }
      return true;
    });
  }, [searchQuery]);

  // Filtered Languages
  const filteredLanguages = useMemo(() => {
    return ALL_PROGRAMMING_LANGUAGES.filter((lang) => {
      if (selectedDifficulty !== "ALL" && lang.difficulty !== selectedDifficulty) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = lang.name.toLowerCase().includes(q);
        const matchesTagline = lang.tagline.toLowerCase().includes(q);
        const matchesUsage = lang.industryUsage.some((u) => u.toLowerCase().includes(q));
        if (!matchesName && !matchesTagline && !matchesUsage) return false;
      }
      return true;
    });
  }, [searchQuery, selectedDifficulty]);

  // Filtered Core Subjects
  const filteredSubjects = useMemo(() => {
    return ALL_CORE_SUBJECTS.filter((sub) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = sub.name.toLowerCase().includes(q);
        const matchesSummary = sub.summary.toLowerCase().includes(q);
        const matchesConcepts = sub.coreConcepts.some((c) => c.toLowerCase().includes(q));
        if (!matchesName && !matchesSummary && !matchesConcepts) return false;
      }
      return true;
    });
  }, [searchQuery]);

  return (
    <AmbientBackground intensity="catalog">
      <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-8">
        
        {/* Header Title */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-2 border-b border-slate-200/60">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 uppercase tracking-wider">
                Universal Knowledge Ecosystem
              </span>
              <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-teal-100 text-teal-800 border border-teal-300">
                Open to All Years & Branches
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text-dark)] tracking-tight">
              CampusGrow Learning Hub
            </h1>
            <p className="text-sm text-[var(--color-text-secondary)] font-medium max-w-3xl leading-relaxed">
              Explore <strong>all 15 major engineering domains</strong> or jump straight into <strong>any programming language and core CS subject</strong>. No semester lockouts—learn what you need, whenever you want.
            </p>
          </div>

          {/* Primary View Switcher */}
          <div className="p-1 rounded-2xl glass-surface-elevated border border-white/80 shadow flex items-center gap-1 self-start lg:self-auto">
            <button
              onClick={() => setActiveTab("domains")}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "domains"
                  ? "bg-[#16865A] text-white shadow"
                  : "text-[var(--color-text-secondary)] hover:text-emerald-800 hover:bg-emerald-50"
              }`}
            >
              <span>🌐 All Domains (15)</span>
            </button>
            <button
              onClick={() => setActiveTab("subjects")}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "subjects"
                  ? "bg-[#16865A] text-white shadow"
                  : "text-[var(--color-text-secondary)] hover:text-emerald-800 hover:bg-emerald-50"
              }`}
            >
              <span>📖 Subjects & Languages</span>
            </button>
          </div>
        </div>

        {/* Global Search & Quick Filter Bar */}
        <div className="rounded-2xl glass-surface-elevated p-4 border border-white/80 shadow-md">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-lg">
              <input
                type="text"
                placeholder={
                  activeTab === "domains"
                    ? "Search any domain, framework, or technology (e.g. Docker, PyTorch, AI)..."
                    : "Search any language or subject (e.g. C++, Python, DSA, OS, DBMS)..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-white border border-slate-200 text-[var(--color-text-dark)] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
              />
              <span className="absolute left-3 top-2.5 text-slate-400">🔍</span>
            </div>

            {activeTab === "subjects" && (
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                <span className="text-xs font-bold text-slate-500 mr-1">Level:</span>
                {["ALL", "Beginner", "Intermediate", "Advanced"].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setSelectedDifficulty(lvl)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      selectedDifficulty === lvl
                        ? "bg-[#16865A] text-white shadow-xs"
                        : "bg-white/80 text-[var(--color-text-secondary)] hover:text-emerald-800 border border-slate-200"
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* VIEW 1: ALL 15 DOMAINS */}
        {activeTab === "domains" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-[var(--color-text-dark)]">
                  The 15 Major Engineering Knowledge Domains
                </h2>
                <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
                  Comprehensive industry curricula across software development, AI, cloud, security, and systems engineering.
                </p>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
                {filteredDomains.length} Domains Available
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDomains.map((domain) => {
                const isExpanded = expandedDomainId === domain.id;

                return (
                  <div
                    key={domain.id}
                    className="rounded-3xl glass-surface-elevated p-6 border border-white/80 shadow-md hover:shadow-xl transition-all flex flex-col justify-between space-y-4 group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#16865A] to-[#75C99A] text-white flex items-center justify-center text-2xl shadow-md group-hover:scale-105 transition-transform">
                          {domain.icon}
                        </div>
                        <button
                          onClick={() => setExpandedDomainId(isExpanded ? null : domain.id)}
                          className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 hover:bg-emerald-200 transition cursor-pointer"
                        >
                          {domain.courses.length} Master Courses {isExpanded ? "▲" : "▼"}
                        </button>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-[var(--color-text-dark)] group-hover:text-[#16865A] transition-colors">
                          {domain.title}
                        </h3>
                        <p className="text-xs text-[var(--color-text-secondary)] mt-1.5 leading-relaxed line-clamp-2">
                          {domain.description}
                        </p>
                      </div>

                      {/* Tech Badges */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {domain.technologies.slice(0, 5).map((tech, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200"
                          >
                            {tech}
                          </span>
                        ))}
                        {domain.technologies.length > 5 && (
                          <span className="text-[10px] font-semibold text-slate-500 px-1 py-0.5">
                            +{domain.technologies.length - 5} more
                          </span>
                        )}
                      </div>

                      {/* Inline Expanded Courses List */}
                      {isExpanded && (
                        <div className="pt-3 border-t border-slate-200/70 space-y-2.5 animate-fadeIn">
                          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">
                            Included Master Courses ({domain.courses.length}):
                          </span>
                          <div className="space-y-2">
                            {domain.courses.map((course) => (
                              <div
                                key={course.id}
                                className="p-3 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5"
                              >
                                <div className="flex items-center justify-between">
                                  <h4 className="text-xs font-bold text-[var(--color-text-dark)] flex items-center gap-1.5">
                                    <span>{course.icon}</span>
                                    <span>{course.title}</span>
                                  </h4>
                                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                                    {course.difficulty}
                                  </span>
                                </div>
                                <p className="text-[11px] text-[var(--color-text-secondary)] leading-snug line-clamp-2">
                                  {course.subtitle}
                                </p>
                                <div className="pt-1 flex items-center justify-between text-[11px] border-t border-slate-100">
                                  <span className="text-slate-500 font-medium">⏱️ {course.durationHours} hrs</span>
                                  <Link
                                    href={`/explore?domain=${domain.id}`}
                                    className="font-bold text-emerald-700 hover:text-emerald-900"
                                  >
                                    View Syllabus →
                                  </Link>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => setExpandedDomainId(isExpanded ? null : domain.id)}
                        className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
                      >
                        <span>{isExpanded ? "Hide Courses" : `View ${domain.courses.length} Courses`}</span>
                        <span>{isExpanded ? "▲" : "▼"}</span>
                      </button>
                      <Link
                        href={`/explore?domain=${domain.id}`}
                        className="text-xs font-bold px-3 py-1.5 rounded-xl btn-emerald-gradient text-white shadow-2xs"
                      >
                        Explore Domain →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW 2: ALL SUBJECTS & PROGRAMMING LANGUAGES */}
        {activeTab === "subjects" && (
          <div className="space-y-12 animate-fadeIn">
            
            {/* SECTION A: ALL PROGRAMMING LANGUAGES */}
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-[var(--color-text-dark)] flex items-center gap-2">
                    <span>💻</span>
                    <span>All Programming Languages ({filteredLanguages.length})</span>
                  </h2>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
                    From memory-managed systems code (C, Rust, Go) to high-level dynamic languages (Python, JavaScript, Dart).
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredLanguages.map((lang) => (
                  <div
                    key={lang.id}
                    className="rounded-3xl glass-surface-elevated p-5 border border-white/80 shadow-md hover:shadow-xl transition-all flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl">{lang.icon}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            lang.difficulty === "Beginner"
                              ? "bg-emerald-100 text-emerald-800"
                              : lang.difficulty === "Intermediate"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {lang.difficulty}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-[var(--color-text-dark)]">{lang.name}</h3>
                        <p className="text-[11px] font-semibold text-emerald-800">{lang.paradigm}</p>
                      </div>

                      <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                        {lang.tagline}
                      </p>

                      <div className="space-y-1 pt-1">
                        <span className="text-[10px] font-bold text-slate-500 uppercase block">Used in industry:</span>
                        <div className="flex flex-wrap gap-1">
                          {lang.industryUsage.map((u, i) => (
                            <span key={i} className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                              {u}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <Link
                        href={`/lessons/${lang.lessonSlug}`}
                        className="text-xs font-bold text-emerald-700 hover:text-emerald-900"
                      >
                        Start Learning →
                      </Link>
                      <Link
                        href="/terminal"
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100"
                      >
                        Run in IDE
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION B: ALL CORE CS SUBJECTS */}
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-[var(--color-text-dark)] flex items-center gap-2">
                    <span>📚</span>
                    <span>Core Computer Science Disciplines ({filteredSubjects.length})</span>
                  </h2>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
                    Essential university engineering subjects required for GATE, FAANG placement rounds, and software architecture.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSubjects.map((sub) => (
                  <div
                    key={sub.id}
                    className="rounded-3xl glass-surface-elevated p-6 border border-white/80 shadow-md hover:shadow-xl transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl">{sub.icon}</span>
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                          {sub.category}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-[var(--color-text-dark)]">{sub.name}</h3>
                        <p className="text-xs text-[var(--color-text-secondary)] mt-1 leading-relaxed">
                          {sub.summary}
                        </p>
                      </div>

                      {/* Core Concepts */}
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] font-bold text-slate-500 uppercase block">Key Concepts:</span>
                        <div className="flex flex-wrap gap-1">
                          {sub.coreConcepts.map((c, i) => (
                            <span key={i} className="text-[11px] font-semibold bg-emerald-50 text-emerald-900 border border-emerald-200/80 px-2 py-0.5 rounded-md">
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <Link
                        href={`/courses`}
                        className="text-xs font-bold text-emerald-700 hover:text-emerald-900"
                      >
                        View Full Curriculum →
                      </Link>
                      <Link
                        href={`/lessons/${sub.lessonSlug}`}
                        className="text-xs font-bold px-3 py-1.5 rounded-xl btn-emerald-gradient text-white shadow-xs"
                      >
                        Open Lessons
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </AmbientBackground>
  );
}
