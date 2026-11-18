export type SkillKey =
  | "logicalThinking"
  | "dataAnalysis"
  | "programming"
  | "problemSolving"
  | "learningAbility"
  | "developmentThinking"
  | "debugging"
  | "creativity"
  | "attentionToDetail"
  | "securityThinking"
  | "systemThinking"
  | "technicalUnderstanding"
  | "automationThinking";

export type RoleId =
  | "aiml"
  | "fullstack"
  | "data_analyst"
  | "cybersecurity"
  | "cloud_devops"
  | "software_developer";

export interface SkillDefinition {
  key: SkillKey;
  name: string;
  description: string;
  icon: string;
}

export const SKILL_DEFINITIONS: Record<SkillKey, SkillDefinition> = {
  logicalThinking: {
    key: "logicalThinking",
    name: "Logical Thinking",
    description: "Ability to deduce cause-and-effect, follow step-by-step logic, and reason through abstractions.",
    icon: "🧠",
  },
  dataAnalysis: {
    key: "dataAnalysis",
    name: "Data Analysis",
    description: "Interpreting tables, distributions, and detecting hidden trends or anomalies in datasets.",
    icon: "📊",
  },
  programming: {
    key: "programming",
    name: "Programming",
    description: "Writing and structuring functional, clean, and algorithmic code to solve tasks.",
    icon: "💻",
  },
  problemSolving: {
    key: "problemSolving",
    name: "Problem Solving",
    description: "Breaking open-ended requirements into actionable engineering components.",
    icon: "🧩",
  },
  learningAbility: {
    key: "learningAbility",
    name: "Learning Ability",
    description: "Speed of synthesizing unfamiliar concepts, documentation, and error feedback.",
    icon: "📚",
  },
  developmentThinking: {
    key: "developmentThinking",
    name: "Development Thinking",
    description: "Designing intuitive user flows, state lifecycles, and component interfaces.",
    icon: "🎨",
  },
  debugging: {
    key: "debugging",
    name: "Debugging",
    description: "Pinpointing root causes, tracing stack traces, and fixing edge cases systematically.",
    icon: "🔍",
  },
  creativity: {
    key: "creativity",
    name: "Creativity",
    description: "Inventive solutions, aesthetic polish, and imaginative feature design.",
    icon: "✨",
  },
  attentionToDetail: {
    key: "attentionToDetail",
    name: "Attention to Detail",
    description: "Catching off-by-one errors, edge conditions, and strict requirement adherence.",
    icon: "🎯",
  },
  securityThinking: {
    key: "securityThinking",
    name: "Security Thinking",
    description: "Anticipating attack vectors, data exposure, sanitization, and defensive hardening.",
    icon: "🛡️",
  },
  systemThinking: {
    key: "systemThinking",
    name: "System Thinking",
    description: "Architecting end-to-end distributed flows, bottlenecks, caching, and resiliency.",
    icon: "⚙️",
  },
  technicalUnderstanding: {
    key: "technicalUnderstanding",
    name: "Technical Understanding",
    description: "Deep comprehension of operating systems, networking protocols, and infrastructure.",
    icon: "🔌",
  },
  automationThinking: {
    key: "automationThinking",
    name: "Automation Thinking",
    description: "Designing CI/CD, scriptable workflows, self-healing systems, and repeatable deployment.",
    icon: "⚡",
  },
};

export interface RoleConfig {
  id: RoleId;
  title: string;
  category: string;
  icon: string;
  tagline: string;
  description: string;
  roadmapKey: string;
  salaryFresher: string;
  salarySenior: string;
  demandStatus: string;
  whyFitPoints: string[];
  enjoyTasks: string[];
  techStack: { category: string; skills: string[] }[];
  collegeRoadmap: { year: string; title: string; desc: string; lessonRoute: string; lessonTitle: string }[];
  standoutProjects: { title: string; desc: string; tech: string }[];
  certifications: string[];
  campusgrowLessons: { id: string; title: string; route: string }[];
  weights: Partial<Record<SkillKey, number>>;
}

/**
 * Configurable Role Skill Matrix as requested:
 * Weights sum to 100% (1.0) for each role.
 */
export const ROLE_MATRIX_CONFIG: Record<RoleId, RoleConfig> = {
  aiml: {
    id: "aiml",
    title: "AI/ML Engineer",
    category: "Artificial Intelligence & Data",
    icon: "🤖",
    tagline: "Build intelligent algorithms, neural models, and predictive systems.",
    description:
      "AI/ML Engineers transform datasets into intelligent models that learn, reason, predict, and automate complex tasks.",
    roadmapKey: "ai",
    salaryFresher: "₹12 – ₹24 LPA",
    salarySenior: "₹28 – ₹60 LPA",
    demandStatus: "🔥 Explosive Demand • 48% YoY Growth",
    whyFitPoints: [
      "Pattern recognition in complex data",
      "Logical reasoning & statistical thinking",
      "Data analysis & anomaly detection",
      "Problem solving with algorithms",
    ],
    enjoyTasks: [
      "Machine Learning & Deep Learning",
      "Data pipelines & feature engineering",
      "AI systems, LLMs & agents",
      "Analytical problem solving",
    ],
    techStack: [
      { category: "Core Languages", skills: ["Python", "C++", "SQL"] },
      { category: "ML/DL Frameworks", skills: ["PyTorch", "TensorFlow", "Scikit-Learn", "HuggingFace"] },
      { category: "Data & Vectors", skills: ["NumPy", "Pandas", "pgvector", "Pinecone"] },
      { category: "GenAI & LLM Tools", skills: ["LangChain", "LlamaIndex", "FastAPI", "Ollama"] },
    ],
    collegeRoadmap: [
      { year: "Year 1", title: "Math & Python Foundations", desc: "Master Python data structures, Linear Algebra, and Multivariable Calculus.", lessonRoute: "/lessons/aiml-python-numpy", lessonTitle: "NumPy & Pandas for Data Analysis" },
      { year: "Year 2", title: "Data Wrangling & Core ML", desc: "Build regression, classification, and clustering pipelines using Pandas and Scikit-Learn with SQL.", lessonRoute: "/lessons/aiml-neural-networks", lessonTitle: "Neural Networks, PyTorch & Modern AI" },
      { year: "Year 3", title: "Deep Learning & Transformers", desc: "Implement attention mechanisms, CNNs, RNNs, and train custom PyTorch models from scratch.", lessonRoute: "/lessons/aiml-deep-learning-transformers", lessonTitle: "Transformers & Attention" },
      { year: "Year 4", title: "GenAI & Production RAG", desc: "Build multi-tenant LLM agents, vector embeddings, fine-tuning, and model deployment on Cloud GPUs.", lessonRoute: "/lessons/aiml-rag-vector-databases", lessonTitle: "Generative AI, RAG & Vector Databases" },
    ],
    standoutProjects: [
      { title: "RAG Research Assistant", desc: "A hybrid semantic search and LLM citation engine using pgvector, LangChain, and FastAPI.", tech: "Python, PyTorch, pgvector, FastAPI" },
      { title: "Defect Detection Vision Model", desc: "Real-time edge computer vision model using YOLOv8 with PyTorch export to ONNX runtime.", tech: "Python, OpenCV, PyTorch, Docker" },
      { title: "Multi-Agent Code Reviewer", desc: "Autonomous agent system that analyzes GitHub PRs, runs AST parsing, and suggests security fixes.", tech: "Python, LangGraph, Claude/Gemini API" },
    ],
    certifications: [
      "AWS Certified Machine Learning - Specialty",
      "TensorFlow Developer Certificate (Google)",
      "DeepLearning.AI Deep Learning Specialization",
    ],
    campusgrowLessons: [
      { id: "aiml-python-numpy", title: "NumPy & Pandas for Data Analysis", route: "/lessons/aiml-python-numpy" },
      { id: "aiml-neural-networks", title: "Neural Networks & PyTorch", route: "/lessons/aiml-neural-networks" },
      { id: "aiml-deep-learning-transformers", title: "Transformers & Attention", route: "/lessons/aiml-deep-learning-transformers" },
      { id: "aiml-rag-vector-databases", title: "Generative AI & RAG", route: "/lessons/aiml-rag-vector-databases" },
    ],
    weights: {
      logicalThinking: 0.25,
      dataAnalysis: 0.25,
      programming: 0.2,
      problemSolving: 0.2,
      learningAbility: 0.1,
    },
  },

  fullstack: {
    id: "fullstack",
    title: "Full Stack Developer",
    category: "Software & Web Engineering",
    icon: "🌐",
    tagline: "Build end-to-end web apps, responsive UIs, and robust server APIs.",
    description:
      "Full Stack Developers design interactive frontend user interfaces and connect them with backend servers, databases, and authentication.",
    roadmapKey: "web",
    salaryFresher: "₹8 – ₹18 LPA",
    salarySenior: "₹22 – ₹45 LPA",
    demandStatus: "🔥 Very High Demand • Universal Hiring Across Startups & Tech Giants",
    whyFitPoints: [
      "UI thinking & practical component design",
      "Hands-on coding across client & server",
      "Structured problem solving & state management",
      "Debugging real-world interface glitches",
    ],
    enjoyTasks: [
      "Building user-facing web applications",
      "Connecting APIs with databases",
      "Interactive product engineering",
      "Modern frameworks like Next.js & React",
    ],
    techStack: [
      { category: "Frontend", skills: ["TypeScript", "React 19", "Next.js App Router", "Tailwind CSS"] },
      { category: "Backend & Runtime", skills: ["Node.js", "Express", "Server Actions", "Python/Go"] },
      { category: "Databases & ORM", skills: ["PostgreSQL", "Prisma", "Drizzle", "Redis", "Supabase"] },
      { category: "DevOps & Tooling", skills: ["Git", "Docker", "Vercel", "GitHub Actions"] },
    ],
    collegeRoadmap: [
      { year: "Year 1", title: "Web Foundations & Git", desc: "Master semantic HTML5, modern CSS3 (Flexbox/Grid), JavaScript ES6+, and Git branching.", lessonRoute: "/lessons/web-react-nextjs", lessonTitle: "Modern Frontend: React, Next.js & UI Components" },
      { year: "Year 2", title: "React & Relational DBs", desc: "Build single-page apps with React components, custom hooks, PostgreSQL, and RESTful APIs.", lessonRoute: "/lessons/web-rest-apis-backend", lessonTitle: "REST APIs, Node.js & Database Integration" },
      { year: "Year 3", title: "Full-Stack Next.js & Security", desc: "Master Next.js App Router, React Server Components (RSC), JWT auth, and Docker containers.", lessonRoute: "/lessons/web-nextjs-rsc-architecture", lessonTitle: "Next.js Full-Stack Architecture: RSC & Actions" },
      { year: "Year 4", title: "System Architecture & Scale", desc: "Implement Redis caching, WebSockets live streaming, microservices, and CI/CD pipelines.", lessonRoute: "/lessons/system-design-scalability", lessonTitle: "Scalability, Caching & Load Balancing" },
    ],
    standoutProjects: [
      { title: "Collaborative Realtime Workspace", desc: "A Notion-like editor with live multiplayer cursor sync, WebSockets, and optimistic state updates.", tech: "Next.js 15, TypeScript, Socket.io, Redis" },
      { title: "Microservices E-Commerce Platform", desc: "Full-stack checkout system with Razorpay billing, inventory locks, and webhook reliability.", tech: "React, Node.js, PostgreSQL, Docker" },
      { title: "Developer Component Library", desc: "Accessible, keyboard-navigable UI component library published to NPM with automated CI tests.", tech: "TypeScript, React, Storybook, Tailwind" },
    ],
    certifications: [
      "Meta Front-End & Back-End Developer Professional Certificate",
      "AWS Certified Developer - Associate",
    ],
    campusgrowLessons: [
      { id: "web-react-nextjs", title: "Modern Frontend: React & Next.js", route: "/lessons/web-react-nextjs" },
      { id: "web-rest-apis-backend", title: "REST APIs & Backend Node.js", route: "/lessons/web-rest-apis-backend" },
      { id: "web-nextjs-rsc-architecture", title: "Next.js 15 RSC Architecture", route: "/lessons/web-nextjs-rsc-architecture" },
      { id: "web-security-auth", title: "Web Security & JWT Auth", route: "/lessons/web-security-auth" },
    ],
    weights: {
      programming: 0.3,
      problemSolving: 0.25,
      developmentThinking: 0.2,
      debugging: 0.15,
      creativity: 0.1,
    },
  },

  cloud_devops: {
    id: "cloud_devops",
    title: "Cloud/DevOps Engineer",
    category: "Infrastructure & Automation",
    icon: "☁️",
    tagline: "Automate deployments, orchestrate containers, and scale systems.",
    description:
      "Cloud and DevOps Engineers design resilient cloud infrastructure, configure CI/CD pipelines, and ensure services handle millions of users effortlessly.",
    roadmapKey: "cloud",
    salaryFresher: "₹10 – ₹22 LPA",
    salarySenior: "₹26 – ₹55 LPA",
    demandStatus: "⚡ Critical Industry Need • 35% YoY Growth",
    whyFitPoints: [
      "System thinking & high-level architecture",
      "Resilience & fault-tolerant design",
      "Automating repetitive workflows",
      "Root cause troubleshooting in production",
    ],
    enjoyTasks: [
      "Cloud platforms (AWS, GCP, Azure)",
      "Docker, Kubernetes & containerization",
      "CI/CD automation & Infrastructure as Code",
      "Observability & high-scale availability",
    ],
    techStack: [
      { category: "Cloud Providers", skills: ["AWS", "Google Cloud", "Azure"] },
      { category: "Containers & K8s", skills: ["Docker", "Kubernetes", "Helm", "Containerd"] },
      { category: "IaC & Automation", skills: ["Terraform", "Ansible", "GitHub Actions", "ArgoCD"] },
      { category: "Observability", skills: ["Prometheus", "Grafana", "ELK Stack", "Datadog"] },
    ],
    collegeRoadmap: [
      { year: "Year 1", title: "Linux CLI & Networking", desc: "Master Bash shell scripting, SSH keys, file permissions, TCP/IP, DNS, and HTTP headers.", lessonRoute: "/lessons/terminal-cli-basics", lessonTitle: "The Command Line & Terminal Toolkit" },
      { year: "Year 2", title: "Docker & CI/CD Pipelines", desc: "Containerize multi-container apps with Docker Compose and build automated GitHub Actions workflows.", lessonRoute: "/lessons/cloud-docker-containers", lessonTitle: "Docker & Containerization for Engineers" },
      { year: "Year 3", title: "Kubernetes & Cloud Infra", desc: "Deploy microservices on AWS/GCP, configure Ingress routing, HPA autoscaling, and Terraform IaC.", lessonRoute: "/lessons/cloud-kubernetes-microservices", lessonTitle: "Kubernetes Orchestration & Microservices" },
      { year: "Year 4", title: "GitOps, SRE & DevSecOps", desc: "Implement ArgoCD declarative deployments, Prometheus alert policies, and zero-downtime routing.", lessonRoute: "/lessons/cloud-cicd-security", lessonTitle: "DevSecOps, Secrets & Cloud Deployments" },
    ],
    standoutProjects: [
      { title: "Self-Healing Kubernetes Cluster", desc: "Multi-tier microservices deployment with automated pod autoscaling, health checks, and Ingress TLS.", tech: "Kubernetes, Docker, Helm, AWS EKS" },
      { title: "Automated GitOps CI/CD Pipeline", desc: "Zero-touch deployment workflow with automated linting, Trivy vulnerability scans, and Blue-Green routing.", tech: "GitHub Actions, Docker, ArgoCD, Bash" },
      { title: "Cloud Cost & Uptime Dashboard", desc: "Automated Prometheus & Grafana telemetry stack tracking cluster latency, CPU throttling, and cloud spend.", tech: "Terraform, Prometheus, Grafana, AWS" },
    ],
    certifications: [
      "AWS Certified Solutions Architect - Associate",
      "CKA: Certified Kubernetes Administrator",
      "HashiCorp Certified: Terraform Associate",
    ],
    campusgrowLessons: [
      { id: "cloud-docker-containers", title: "Docker Containerization", route: "/lessons/cloud-docker-containers" },
      { id: "cloud-ci-cd-pipelines", title: "GitHub Actions CI/CD", route: "/lessons/cloud-ci-cd-pipelines" },
      { id: "cloud-kubernetes-microservices", title: "Kubernetes & Microservices", route: "/lessons/cloud-kubernetes-microservices" },
      { id: "cloud-cicd-security", title: "GitOps & Cloud Security", route: "/lessons/cloud-cicd-security" },
    ],
    weights: {
      systemThinking: 0.3,
      problemSolving: 0.25,
      debugging: 0.2,
      technicalUnderstanding: 0.15,
      automationThinking: 0.1,
    },
  },

  cybersecurity: {
    id: "cybersecurity",
    title: "Cybersecurity Engineer",
    category: "Systems & Security",
    icon: "🛡️",
    tagline: "Defend networks, hunt threats, and harden applications against attack.",
    description:
      "Cybersecurity Engineers protect confidential data, audit code for vulnerabilities, hunt down intruders, and design impregnable architectures.",
    roadmapKey: "cyber",
    salaryFresher: "₹9 – ₹20 LPA",
    salarySenior: "₹24 – ₹52 LPA",
    demandStatus: "🛡️ Massive Talent Shortage • 3.5M Open Positions Globally",
    whyFitPoints: [
      "Security thinking & threat modeling",
      "Analytical triage of security logs",
      "Logical problem solving under pressure",
      "Diligent attention to configuration detail",
    ],
    enjoyTasks: [
      "Ethical hacking & penetration testing",
      "Threat hunting & incident response",
      "Network security & cryptography",
      "Securing modern cloud & web apps",
    ],
    techStack: [
      { category: "Security Tools", skills: ["Wireshark", "Nmap", "Burp Suite", "Metasploit", "Snort"] },
      { category: "Defensive & Audit", skills: ["SIEM (Splunk)", "OWASP Top 10", "Trivy", "SonarQube"] },
      { category: "Protocols & OS", skills: ["Linux Hardening", "TLS 1.3", "IPSec", "Kerberos", "OAuth 2.0"] },
      { category: "Scripting", skills: ["Python", "Bash", "PowerShell", "C"] },
    ],
    collegeRoadmap: [
      { year: "Year 1", title: "OS Internals & Cryptography", desc: "Understand memory registers, stack layout, symmetrical vs public-key crypto, and hashing algorithms.", lessonRoute: "/lessons/os-processes-threads", lessonTitle: "Operating Systems: Processes, Threads & Memory" },
      { year: "Year 2", title: "Network Protocols & Packet Analysis", desc: "Packet inspection with Wireshark, TCP handshake vulnerabilities, firewall rules, and port audits.", lessonRoute: "/lessons/networks-protocols-internals", lessonTitle: "High-Throughput Networking & Protocols" },
      { year: "Year 3", title: "AppSec & Ethical Hacking", desc: "OWASP Top 10 exploitation (SQLi, XSS, CSRF, SSRF), Burp Suite intercepting proxies, and CTF challenges.", lessonRoute: "/lessons/web-security-auth", lessonTitle: "Web Security, Auth & Cryptography" },
      { year: "Year 4", title: "Binary Exploitation & Systems Security", desc: "Stack smashing, ROP chains, shellcode injection, ASLR/DEP bypasses, and kernel security defenses.", lessonRoute: "/lessons/sec-memory-exploits-rop", lessonTitle: "Binary Exploits: Stack Smashing & ROP Chains" },
    ],
    standoutProjects: [
      { title: "Automated Web Vulnerability Scanner", desc: "Python security auditor that crawls web endpoints, checks CORS misconfigurations, and tests SQLi/XSS.", tech: "Python, Requests, Beautiful Soup, Docker" },
      { title: "Intrusion Detection System (IDS)", desc: "Network traffic monitor analyzing packet dumps in real time and alerting on port-scanning botnets.", tech: "C, Scapy, Snort, Wireshark" },
      { title: "Zero-Trust Identity Provider", desc: "Authentication server enforcing MFA, PKCE OAuth 2.0 flows, and cryptographic session token signing.", tech: "Node.js, Redis, WebAuthn, Cryptography" },
    ],
    certifications: [
      "CompTIA Security+",
      "CEH (Certified Ethical Hacker)",
      "OSCP (Offensive Security Certified Professional)",
    ],
    campusgrowLessons: [
      { id: "web-security-auth", title: "Web Security & Cryptography", route: "/lessons/web-security-auth" },
      { id: "networks-protocols-internals", title: "Computer Networks & Protocols", route: "/lessons/networks-protocols-internals" },
      { id: "os-processes-threads", title: "OS Security & Memory Protection", route: "/lessons/os-processes-threads" },
      { id: "cloud-cicd-security", title: "DevSecOps & Image Hardening", route: "/lessons/cloud-cicd-security" },
    ],
    weights: {
      logicalThinking: 0.25,
      securityThinking: 0.3,
      problemSolving: 0.25,
      debugging: 0.1,
      attentionToDetail: 0.1,
    },
  },

  software_developer: {
    id: "software_developer",
    title: "Software Developer",
    category: "Core Software Engineering",
    icon: "💻",
    tagline: "Craft robust, efficient algorithms, data structures, and core software.",
    description:
      "Software Developers engineer core logic, write performant code, optimize algorithms, and build foundational software libraries.",
    roadmapKey: "dsa",
    salaryFresher: "₹10 – ₹25 LPA",
    salarySenior: "₹26 – ₹55 LPA",
    demandStatus: "🏆 Highest Package Potential (FAANG, HFT & Product Companies)",
    whyFitPoints: [
      "Strong core programming ability",
      "Systematic problem solving",
      "Algorithm logic and optimization",
      "Deep debugging skills and adaptability",
    ],
    enjoyTasks: [
      "Data structures and algorithmic design",
      "Object-oriented software architecture",
      "Building backend services and tools",
      "Refining code quality and performance",
    ],
    techStack: [
      { category: "Languages", skills: ["C++", "Java", "Python", "Go"] },
      { category: "Core Algorithms", skills: ["Dynamic Programming", "Graphs", "Tries", "Segment Trees"] },
      { category: "Architecture & Low-Level", skills: ["SOLID Principles", "Design Patterns", "Multithreading", "Memory Management"] },
      { category: "Databases & Storage", skills: ["PostgreSQL", "Redis", "SQLite", "Kafka"] },
    ],
    collegeRoadmap: [
      { year: "Year 1", title: "Language Foundations & Pointers", desc: "Master C/C++ memory addresses, pointers, structs, loops, recursion, and algorithmic thinking.", lessonRoute: "/lessons/c-programming", lessonTitle: "C Programming & Systems Foundations" },
      { year: "Year 2", title: "DSA & Range Queries", desc: "Segment Trees, Fenwick Trees, DSU, and Tarjan's Strongly Connected Components for ultra-low latency.", lessonRoute: "/lessons/dsa-segment-fenwick-trees", lessonTitle: "Segment Trees & Range Queries" },
      { year: "Year 3", title: "Kernel Internals & Lock-Free Concurrency", desc: "Hardware CPU caches (MESI), atomic CAS instructions, lock-free queues, and B+ tree storage engines.", lessonRoute: "/lessons/sys-lock-free-concurrency", lessonTitle: "Lock-Free Concurrency & Atomics" },
      { year: "Year 4", title: "Distributed Consensus & System Design", desc: "Raft consensus, leader election, log replication, split-brain recovery, and high-scale system design.", lessonRoute: "/lessons/dist-consensus-raft-paxos", lessonTitle: "Distributed Consensus: Raft & Paxos" },
    ],
    standoutProjects: [
      { title: "High-Throughput In-Memory Key-Value Store", desc: "A Redis-like cache server with LRU eviction, multithreaded epoll event loop, and RESP protocol support.", tech: "C++, Pthreads, Socket API, Linux" },
      { title: "Distributed Task Scheduler", desc: "A resilient background worker pool executing scheduled jobs with exponential backoff and dead-letter queues.", tech: "Java, Spring Boot, Redis, PostgreSQL" },
      { title: "Custom Compiling Virtual Machine", desc: "Bytecode compiler and stack-based VM executing custom expressions with an interactive REPL.", tech: "C++, AST Parsing, Memory Layout" },
    ],
    certifications: [
      "Oracle Certified Professional: Java SE Developer",
      "AWS Certified Developer - Associate",
    ],
    campusgrowLessons: [
      { id: "dsa-dynamic-programming", title: "Dynamic Programming Mastery", route: "/lessons/dsa-dynamic-programming" },
      { id: "dsa-graph-algorithms", title: "Graph Algorithms & Dijkstra", route: "/lessons/dsa-graph-algorithms" },
      { id: "oop-solid-principles", title: "SOLID Principles in Practice", route: "/lessons/oop-solid-principles" },
      { id: "system-design-distributed-caching", title: "Distributed Caching & Consistent Hashing", route: "/lessons/system-design-distributed-caching" },
    ],
    weights: {
      programming: 0.3,
      problemSolving: 0.25,
      logicalThinking: 0.2,
      debugging: 0.15,
      learningAbility: 0.1,
    },
  },

  data_analyst: {
    id: "data_analyst",
    title: "Data Analyst",
    category: "Data & Business Intelligence",
    icon: "📈",
    tagline: "Turn raw numbers and metrics into compelling insights and strategy.",
    description:
      "Data Analysts dive into company datasets, clean information, uncover behavioral trends, and present visual stories to drive decisions.",
    roadmapKey: "data",
    salaryFresher: "₹7 – ₹16 LPA",
    salarySenior: "₹18 – ₹38 LPA",
    demandStatus: "📊 Steady High Demand Across All Modern Businesses",
    whyFitPoints: [
      "Interpreting large datasets & metrics",
      "Identifying behavioral drop-offs & trends",
      "Logical reasoning with numbers",
      "High attention to data anomalies & detail",
    ],
    enjoyTasks: [
      "Data exploration & trend analysis",
      "SQL querying & data dashboards",
      "Statistical storytelling & charts",
      "Helping teams make data-driven decisions",
    ],
    techStack: [
      { category: "Querying & Data", skills: ["Advanced SQL", "PostgreSQL", "Snowflake", "BigQuery"] },
      { category: "Programming & Stats", skills: ["Python (Pandas, NumPy)", "R", "Excel/Google Sheets"] },
      { category: "BI & Dashboards", skills: ["Tableau", "Power BI", "Metabase", "Looker"] },
      { category: "Analytics Tools", skills: ["Google Analytics", "Mixpanel", "A/B Testing"] },
    ],
    collegeRoadmap: [
      { year: "Year 1", title: "Excel Mastery & Descriptive Stats", desc: "VLOOKUP, Pivot Tables, conditional formatting, probability distributions, and variance metrics.", lessonRoute: "/lessons/py-data-structures", lessonTitle: "Python Lists, Dictionaries & Collections" },
      { year: "Year 2", title: "Advanced SQL & Database Design", desc: "Multi-table JOINs, window functions (RANK, OVER, PARTITION BY), CTEs, and schema indexing.", lessonRoute: "/lessons/dbms-sql-foundations", lessonTitle: "Relational Databases & SQL Queries" },
      { year: "Year 3", title: "Python Data Analysis & BI Dashboards", desc: "Pandas dataframe transformations, exploratory data analysis (EDA), Seaborn, and interactive Tableau dashboards.", lessonRoute: "/lessons/dbms-indexing-optimization", lessonTitle: "Database Indexing & Query Tuning" },
      { year: "Year 4", title: "Product Analytics & Predictive Modeling", desc: "A/B test hypothesis testing, cohort retention analysis, customer lifetime value (LTV), and portfolio case studies.", lessonRoute: "/lessons/aiml-python-numpy", lessonTitle: "Data Analysis with Pandas & Analytics" },
    ],
    standoutProjects: [
      { title: "SaaS Retention & Churn Dashboard", desc: "Interactive Tableau dashboard tracking user cohorts, churn rates, and predicting cancellation risk.", tech: "SQL, Python, Pandas, Tableau" },
      { title: "E-Commerce Customer Segmentation", desc: "RFM (Recency, Frequency, Monetary) segmentation model analyzing 50,000+ purchase transactions.", tech: "Python, Scikit-Learn, BigQuery, Metabase" },
      { title: "Automated Financial Health Pipeline", desc: "ETL script cleaning daily payment transactions and outputting executive KPI summary reports.", tech: "PostgreSQL, Python, Matplotlib, GitHub Actions" },
    ],
    certifications: [
      "Google Data Analytics Professional Certificate",
      "Microsoft Certified: Power BI Data Analyst Associate",
    ],
    campusgrowLessons: [
      { id: "dbms-sql-foundations", title: "Relational Databases & SQL", route: "/lessons/dbms-sql-foundations" },
      { id: "dbms-joins-acid", title: "SQL JOINs, Transactions & ACID", route: "/lessons/dbms-joins-acid" },
      { id: "dbms-indexing-optimization", title: "Database Indexing & Query Tuning", route: "/lessons/dbms-indexing-optimization" },
      { id: "aiml-python-numpy", title: "Python Data Analysis with Pandas", route: "/lessons/aiml-python-numpy" },
    ],
    weights: {
      dataAnalysis: 0.35,
      logicalThinking: 0.25,
      problemSolving: 0.2,
      attentionToDetail: 0.1,
      programming: 0.1,
    },
  },
};

export type InterestRating = "very" | "somewhat" | "unsure" | "not";

export interface TaskPerformanceRecord {
  day: number;
  completed: boolean;
  accuracy: number; // 0 - 100
  timeTakenSeconds: number;
  hintsUsed: number;
  attempts: number;
  problemSolvingScore: number; // 0 - 100
  taskQuality: number; // 0 - 100
  userReflectionEnjoyment?: number; // 1 - 5
}

export interface DayTaskState {
  day1: TaskPerformanceRecord;
  day2: TaskPerformanceRecord;
  day3: TaskPerformanceRecord;
}

export interface RoleMatchResult {
  roleId: RoleId;
  role: RoleConfig;
  matchScore: number; // 0 - 100
  compositeRecommendation: string;
  interestRating?: InterestRating;
  interestLabel?: string;
  rank: number;
}

export interface RoleDiscoveryProfile {
  completedAt: string;
  currentDay: number;
  completedDays: number[];
  taskMetrics: DayTaskState;
  skillScores: Record<SkillKey, number>;
  roleMatches: RoleMatchResult[];
  topMatch: RoleMatchResult;
  secondMatch: RoleMatchResult;
  thirdMatch: RoleMatchResult;
  interestRatings: Partial<Record<RoleId, InterestRating>>;
}

/**
 * Calculates individual skill ability scores based on multi-day performance.
 * Note: Students who take more time to solve problems accurately are NOT penalized.
 */
export function calculateSkillScores(metrics: DayTaskState): Record<SkillKey, number> {
  const d1 = metrics.day1;
  const d2 = metrics.day2;
  const d3 = metrics.day3;

  // Base quality & problem solving scores across tasks
  const d1Eff = (d1.accuracy * 0.5 + d1.problemSolvingScore * 0.3 + d1.taskQuality * 0.2);
  const d2Eff = (d2.accuracy * 0.5 + d2.problemSolvingScore * 0.3 + d2.taskQuality * 0.2);
  const d3Eff = (d3.accuracy * 0.5 + d3.problemSolvingScore * 0.3 + d3.taskQuality * 0.2);

  // Soft hint adjustment (very light, does not penalize curiosity)
  const hintFactor1 = Math.max(0.85, 1 - d1.hintsUsed * 0.04);
  const hintFactor2 = Math.max(0.85, 1 - d2.hintsUsed * 0.04);
  const hintFactor3 = Math.max(0.85, 1 - d3.hintsUsed * 0.04);

  // Student reflections contribute to natural motivation
  const r1 = (d1.userReflectionEnjoyment || 4) / 5;
  const r2 = (d2.userReflectionEnjoyment || 4) / 5;
  const r3 = (d3.userReflectionEnjoyment || 4) / 5;

  const clamp = (val: number) => Math.min(98, Math.max(45, Math.round(val)));

  return {
    // Logical Thinking tested in Day 2 (Analysis) & Day 3 (Solving)
    logicalThinking: clamp(
      d2Eff * hintFactor2 * 0.55 + d3Eff * hintFactor3 * 0.45 + (r2 >= 0.8 ? 3 : 0)
    ),

    // Data Analysis tested heavily in Day 2
    dataAnalysis: clamp(
      d2Eff * hintFactor2 * 0.85 + (d2.accuracy >= 85 ? 10 : 0) + (r2 >= 0.8 ? 5 : 0)
    ),

    // Programming tested in Day 1 (Build) & Day 3 (Debug)
    programming: clamp(
      d1Eff * hintFactor1 * 0.65 + d3Eff * hintFactor3 * 0.35 + (r1 >= 0.8 ? 4 : 0)
    ),

    // Problem Solving tested consistently across all 3 days
    problemSolving: clamp(
      (d1.problemSolvingScore * 0.3 + d2.problemSolvingScore * 0.35 + d3.problemSolvingScore * 0.35) *
        ((hintFactor1 + hintFactor2 + hintFactor3) / 3) +
        5
    ),

    // Learning Ability: based on accuracy despite multiple checkpoints and thoughtful attempts
    learningAbility: clamp(
      (d1.taskQuality * 0.3 + d2.taskQuality * 0.35 + d3.taskQuality * 0.35) * 0.9 + 10
    ),

    // Development Thinking: Day 1 Attendance UI builder
    developmentThinking: clamp(
      d1Eff * hintFactor1 * 0.9 + (d1.taskQuality >= 80 ? 6 : 0) + (r1 >= 0.8 ? 4 : 0)
    ),

    // Debugging: Day 3 Station 1
    debugging: clamp(
      d3Eff * hintFactor3 * 0.9 + (d3.accuracy >= 80 ? 8 : 0)
    ),

    // Creativity: Day 1 Interface layout and user-centric features
    creativity: clamp(
      d1.taskQuality * 0.85 + (r1 >= 0.8 ? 12 : 5)
    ),

    // Attention to Detail: strict checklist completion & anomaly pinpointing
    attentionToDetail: clamp(
      (d1.accuracy * 0.45 + d2.accuracy * 0.55) * ((hintFactor1 + hintFactor2) / 2) + 2
    ),

    // Security Thinking: Day 3 Threat hunting & defensive configuration
    securityThinking: clamp(
      d3Eff * hintFactor3 * 0.85 + (d3.problemSolvingScore >= 80 ? 10 : 2) + (r3 >= 0.8 ? 5 : 0)
    ),

    // System Thinking: Day 3 High-scale traffic & fallback pipeline
    systemThinking: clamp(
      d3Eff * 0.8 + d1Eff * 0.2 + (r3 >= 0.8 ? 6 : 0)
    ),

    // Technical Understanding: Day 3 incident triage & protocols
    technicalUnderstanding: clamp(
      d3Eff * hintFactor3 * 0.85 + d1Eff * 0.15 + 4
    ),

    // Automation Thinking: Day 3 recovery rules & CI/CD deployment logic
    automationThinking: clamp(
      d3Eff * 0.75 + d2Eff * 0.25 + 5
    ),
  };
}

/**
 * Calculates the role match ranking by multiplying skill scores by each role's weights.
 */
export function calculateRoleMatches(
  skillScores: Record<SkillKey, number>,
  interestRatings: Partial<Record<RoleId, InterestRating>> = {}
): RoleMatchResult[] {
  const roles = Object.values(ROLE_MATRIX_CONFIG);

  const evaluated = roles.map((role) => {
    let rawScore = 0;
    let totalWeight = 0;

    for (const [skill, weight] of Object.entries(role.weights)) {
      const sKey = skill as SkillKey;
      const sWeight = weight || 0;
      const score = skillScores[sKey] ?? 70;
      rawScore += score * sWeight;
      totalWeight += sWeight;
    }

    const normalizedScore = totalWeight > 0 ? Math.round(rawScore / totalWeight) : 70;
    const interest = interestRatings[role.id] ?? "unsure";

    // Combine Performance + Interest for recommendation guidance
    let compositeRecommendation = "";
    let interestLabel = "";

    switch (interest) {
      case "very":
        interestLabel = "❤️ Very Interested";
        if (normalizedScore >= 75) {
          compositeRecommendation = "🌟 Strongest Recommendation (High Aptitude & Passion)";
        } else {
          compositeRecommendation = "🚀 Growth Track (High Passion, Great Potential to Build Skills)";
        }
        break;
      case "somewhat":
        interestLabel = "🙂 Somewhat Interested";
        if (normalizedScore >= 75) {
          compositeRecommendation = "✨ Promising Direction (Strong Match with Steady Interest)";
        } else {
          compositeRecommendation = "🌱 Exploratory Path (Moderate Fit)";
        }
        break;
      case "unsure":
        interestLabel = "😐 Exploring";
        if (normalizedScore >= 75) {
          compositeRecommendation = "🔍 Worth Exploring (High Natural Aptitude, Try a Project First)";
        } else {
          compositeRecommendation = "❓ Secondary Consideration";
        }
        break;
      case "not":
        interestLabel = "❌ Not Interested";
        if (normalizedScore >= 75) {
          compositeRecommendation = "💡 Strong Hidden Aptitude (High Capability, but Lower Personal Interest)";
        } else {
          compositeRecommendation = "❌ Not Recommended (Low Interest & Moderate Fit)";
        }
        break;
    }

    return {
      roleId: role.id,
      role,
      matchScore: normalizedScore,
      compositeRecommendation,
      interestRating: interest,
      interestLabel,
      rank: 1,
    };
  });

  // Sort primarily by match score descending
  evaluated.sort((a, b) => b.matchScore - a.matchScore);

  // Assign ranks
  evaluated.forEach((item, idx) => {
    item.rank = idx + 1;
  });

  return evaluated;
}

export const DEFAULT_TASK_METRICS: DayTaskState = {
  day1: {
    day: 1,
    completed: false,
    accuracy: 90,
    timeTakenSeconds: 0,
    hintsUsed: 0,
    attempts: 1,
    problemSolvingScore: 88,
    taskQuality: 92,
    userReflectionEnjoyment: 4,
  },
  day2: {
    day: 2,
    completed: false,
    accuracy: 85,
    timeTakenSeconds: 0,
    hintsUsed: 0,
    attempts: 1,
    problemSolvingScore: 86,
    taskQuality: 88,
    userReflectionEnjoyment: 4,
  },
  day3: {
    day: 3,
    completed: false,
    accuracy: 88,
    timeTakenSeconds: 0,
    hintsUsed: 0,
    attempts: 1,
    problemSolvingScore: 90,
    taskQuality: 90,
    userReflectionEnjoyment: 4,
  },
};

// ── 2-MINUTE RAPID AI ROLE FIT QUIZ ──────────────────────────────────────────
export interface RapidQuizQuestion {
  id: number;
  question: string;
  subtitle: string;
  options: {
    text: string;
    icon: string;
    roleWeights: Partial<Record<RoleId, number>>;
  }[];
}

export const RAPID_DISCOVERY_QUIZ: RapidQuizQuestion[] = [
  {
    id: 1,
    question: "When working on a software project, what excites you the most?",
    subtitle: "Your natural engineering inclination determines long-term career happiness.",
    options: [
      {
        text: "Training models to make predictions and recognize patterns in unstructured data",
        icon: "🤖",
        roleWeights: { aiml: 30, data_analyst: 15 },
      },
      {
        text: "Building sleek, responsive user interfaces and connecting them with snappy backend APIs",
        icon: "🌐",
        roleWeights: { fullstack: 30, software_developer: 15 },
      },
      {
        text: "Automating cloud servers, configuring Docker/Kubernetes, and zero-downtime CI/CD",
        icon: "☁️",
        roleWeights: { cloud_devops: 30, cybersecurity: 10 },
      },
      {
        text: "Hunting down vulnerabilities, ethical hacking, and defending systems against attackers",
        icon: "🛡️",
        roleWeights: { cybersecurity: 30, cloud_devops: 10 },
      },
      {
        text: "Solving complex algorithmic puzzles, optimizing Big-O, and building core backend logic",
        icon: "💻",
        roleWeights: { software_developer: 30, aiml: 10 },
      },
      {
        text: "Querying huge SQL databases, spotting trends, and creating executive business dashboards",
        icon: "📊",
        roleWeights: { data_analyst: 30, aiml: 10 },
      },
    ],
  },
  {
    id: 2,
    question: "How do you feel about Advanced Mathematics & Statistical Theory?",
    subtitle: "Different software disciplines demand vastly different mathematical foundations.",
    options: [
      {
        text: "I love linear algebra, probability, calculus, and mathematical modeling",
        icon: "📐",
        roleWeights: { aiml: 30, data_analyst: 20 },
      },
      {
        text: "I prefer practical discrete math, graphs, binary trees, and logic over calculus",
        icon: "🧩",
        roleWeights: { software_developer: 25, fullstack: 15, cybersecurity: 15 },
      },
      {
        text: "I prefer practical systems engineering, networks, shell scripts, and cloud configs over heavy math",
        icon: "⚙️",
        roleWeights: { cloud_devops: 25, cybersecurity: 20, fullstack: 15 },
      },
      {
        text: "I enjoy business metrics, percentages, cohort churn rates, and descriptive statistics",
        icon: "📈",
        roleWeights: { data_analyst: 30, fullstack: 10 },
      },
    ],
  },
  {
    id: 3,
    question: "What is your reaction when your code crashes with a mysterious error?",
    subtitle: "Your troubleshooting mindset reveals your engineering personality.",
    options: [
      {
        text: "I open Wireshark or security audit logs to see if packet injection or malicious payloads caused it",
        icon: "🔍",
        roleWeights: { cybersecurity: 30, cloud_devops: 15 },
      },
      {
        text: "I inspect container logs, check pod CPU/memory limits, and verify environment configs",
        icon: "🐳",
        roleWeights: { cloud_devops: 30, fullstack: 10 },
      },
      {
        text: "I set breakpoints in VS Code, step through pointers and call stacks to isolate the off-by-one bug",
        icon: "🐞",
        roleWeights: { software_developer: 30, fullstack: 15 },
      },
      {
        text: "I inspect the browser console, React network waterfall, and verify JSON payload schemas",
        icon: "🌐",
        roleWeights: { fullstack: 30, data_analyst: 10 },
      },
      {
        text: "I plot data distributions, check for NaN values, and inspect loss curve gradient descent",
        icon: "📉",
        roleWeights: { aiml: 30, data_analyst: 20 },
      },
    ],
  },
  {
    id: 4,
    question: "If you had 1 month to build whatever you wanted, what would you choose?",
    subtitle: "Passion-driven portfolio choices strongly correlate with interview success.",
    options: [
      {
        text: "A Generative AI agent that reads textbooks, builds vector memory, and chats like a professor",
        icon: "🧠",
        roleWeights: { aiml: 30, software_developer: 10 },
      },
      {
        text: "A full-featured multiplayer web application with live real-time cursors and payment processing",
        icon: "🎨",
        roleWeights: { fullstack: 30, software_developer: 15 },
      },
      {
        text: "A self-healing multi-cloud infrastructure running Kubernetes with automated Prometheus alerts",
        icon: "⚡",
        roleWeights: { cloud_devops: 30, cybersecurity: 10 },
      },
      {
        text: "An automated penetration testing toolkit that probes web apps for OWASP Top 10 vulnerabilities",
        icon: "🚨",
        roleWeights: { cybersecurity: 30, software_developer: 10 },
      },
      {
        text: "A lightning-fast in-memory key-value database written in C++ handling 50,000 queries per second",
        icon: "🚀",
        roleWeights: { software_developer: 30, cloud_devops: 10 },
      },
      {
        text: "A national COVID/election data visualizer with predictive forecasting and interactive charts",
        icon: "📊",
        roleWeights: { data_analyst: 30, aiml: 15 },
      },
    ],
  },
  {
    id: 5,
    question: "What is your primary career & compensation goal?",
    subtitle: "Aligning your engineering track with company salary benchmarks.",
    options: [
      {
        text: "Maximum placement CTC at FAANG or high-frequency trading firms (₹20 – ₹45+ LPA)",
        icon: "🏆",
        roleWeights: { software_developer: 25, aiml: 25 },
      },
      {
        text: "High-demand full-stack flexibility to work at high-growth startups or build my own SaaS",
        icon: "🚀",
        roleWeights: { fullstack: 30, cloud_devops: 15 },
      },
      {
        text: "High-paying remote infrastructure & site-reliability roles with high job security",
        icon: "🌍",
        roleWeights: { cloud_devops: 30, cybersecurity: 20 },
      },
      {
        text: "Specialized government, banking, or defense roles with elite prestige and confidentiality",
        icon: "🏛️",
        roleWeights: { cybersecurity: 30, data_analyst: 15 },
      },
      {
        text: "Fast transition into tech with immediate analyst openings at major consultancies (Deloitte, EY)",
        icon: "💼",
        roleWeights: { data_analyst: 30, fullstack: 15 },
      },
    ],
  },
  {
    id: 6,
    question: "Which of these everyday software analogies makes the most intuitive sense to you?",
    subtitle: "How your brain naturally organizes complex engineering concepts.",
    options: [
      {
        text: "A restaurant kitchen: Customers browse the menu (Frontend), waiters pass orders (APIs), and the pantry stores food (Database)",
        icon: "🍽️",
        roleWeights: { fullstack: 30, software_developer: 10 },
      },
      {
        text: "A brain learning to ride a bike: Adjusting balance muscle-memory over thousands of tiny wobbles (Neural Network Weights)",
        icon: "🚴",
        roleWeights: { aiml: 30, data_analyst: 15 },
      },
      {
        text: "An airport cargo logistics hub: Standard shipping containers (Docker) loaded onto coordinated freight planes (Kubernetes)",
        icon: "✈️",
        roleWeights: { cloud_devops: 30, cybersecurity: 10 },
      },
      {
        text: "A bank vault with biometric scanners, security guards, and tripwires guarding safety deposit boxes (Defense-in-Depth)",
        icon: "🏦",
        roleWeights: { cybersecurity: 30, cloud_devops: 10 },
      },
      {
        text: "A high-speed highway intersection with synchronized traffic lights and express flyovers (Optimized Algorithms & Big-O)",
        icon: "🛣️",
        roleWeights: { software_developer: 30, aiml: 10 },
      },
      {
        text: "A detective piecing together fingerprints, receipts, and phone logs to crack the crime (Data Insights & Correlation)",
        icon: "🕵️",
        roleWeights: { data_analyst: 30, aiml: 10 },
      },
    ],
  },
];

/**
 * Calculates Rapid Quiz Results from student answers.
 */
export function calculateRapidQuizMatches(
  answers: Record<number, number>
): RoleMatchResult[] {
  const scores: Record<RoleId, number> = {
    aiml: 30,
    fullstack: 30,
    cloud_devops: 30,
    cybersecurity: 30,
    software_developer: 30,
    data_analyst: 30,
  };

  RAPID_DISCOVERY_QUIZ.forEach((q) => {
    const selectedOptionIdx = answers[q.id];
    if (selectedOptionIdx !== undefined && q.options[selectedOptionIdx]) {
      const opt = q.options[selectedOptionIdx];
      for (const [roleId, weight] of Object.entries(opt.roleWeights)) {
        scores[roleId as RoleId] += weight || 0;
      }
    }
  });

  // Normalize scores to percentage (max possible is ~180, normalize to 50-98%)
  const maxScore = Math.max(...Object.values(scores), 1);
  const evaluated: RoleMatchResult[] = (Object.keys(ROLE_MATRIX_CONFIG) as RoleId[]).map(
    (roleId) => {
      const role = ROLE_MATRIX_CONFIG[roleId];
      const raw = scores[roleId];
      const normalizedScore = Math.min(
        98,
        Math.max(48, Math.round((raw / maxScore) * 96))
      );

      let compositeRecommendation = "";
      if (normalizedScore >= 88) {
        compositeRecommendation = "🌟 Outstanding Match (Your top natural calling based on preferences)";
      } else if (normalizedScore >= 75) {
        compositeRecommendation = "🚀 Strong Career Track (High alignment with your goals)";
      } else if (normalizedScore >= 60) {
        compositeRecommendation = "✨ Viable Secondary Track (Can build complementary skills)";
      } else {
        compositeRecommendation = "🌱 Exploratory Only";
      }

      return {
        roleId,
        role,
        matchScore: normalizedScore,
        compositeRecommendation,
        rank: 1,
      };
    }
  );

  evaluated.sort((a, b) => b.matchScore - a.matchScore);
  evaluated.forEach((item, idx) => {
    item.rank = idx + 1;
  });

  return evaluated;
}

// ── SKILL GAP ANALYZER UTILITIES ──────────────────────────────────────────────
export interface CoreSkillItem {
  id: string;
  name: string;
  category: "Languages" | "Web & Frameworks" | "Systems & Cloud" | "Data & AI" | "Security & CS Core";
  icon: string;
}

export const STUDENT_CORE_SKILLS: CoreSkillItem[] = [
  { id: "c_cpp", name: "C / C++ (Pointers & Memory)", category: "Languages", icon: "⚡" },
  { id: "python", name: "Python (Core & Data Structures)", category: "Languages", icon: "🐍" },
  { id: "javascript", name: "JavaScript / TypeScript", category: "Languages", icon: "💛" },
  { id: "dsa", name: "Data Structures & Algorithms (Trees, DP)", category: "Security & CS Core", icon: "🧠" },
  { id: "sql", name: "Relational SQL (JOINs, Window Funcs)", category: "Data & AI", icon: "🗄️" },
  { id: "git", name: "Git & GitHub Version Control", category: "Systems & Cloud", icon: "🐙" },
  { id: "linux", name: "Linux Bash CLI & Shell Scripting", category: "Systems & Cloud", icon: "🐧" },
  { id: "react", name: "React & Component State", category: "Web & Frameworks", icon: "⚛️" },
  { id: "nextjs", name: "Next.js App Router & Server Actions", category: "Web & Frameworks", icon: "▲" },
  { id: "docker", name: "Docker Containerization", category: "Systems & Cloud", icon: "🐳" },
  { id: "kubernetes", name: "Kubernetes & Microservices", category: "Systems & Cloud", icon: "☸️" },
  { id: "pandas_numpy", name: "Pandas & NumPy Matrix Math", category: "Data & AI", icon: "🐼" },
  { id: "pytorch", name: "PyTorch & Deep Neural Networks", category: "Data & AI", icon: "🔥" },
  { id: "system_design", name: "System Design (Caching, Kafka)", category: "Security & CS Core", icon: "🏛️" },
  { id: "owasp_sec", name: "Web Security & OWASP Top 10", category: "Security & CS Core", icon: "🛡️" },
  { id: "aws_cloud", name: "AWS Cloud Fundamentals", category: "Systems & Cloud", icon: "☁️" },
];

export const ROLE_SKILL_REQUIREMENTS: Record<RoleId, string[]> = {
  aiml: ["python", "pandas_numpy", "pytorch", "sql", "git", "dsa"],
  fullstack: ["javascript", "react", "nextjs", "sql", "git", "docker"],
  cloud_devops: ["linux", "git", "docker", "kubernetes", "aws_cloud", "python"],
  cybersecurity: ["linux", "c_cpp", "owasp_sec", "git", "python", "aws_cloud"],
  software_developer: ["c_cpp", "dsa", "sql", "git", "system_design", "linux"],
  data_analyst: ["sql", "python", "pandas_numpy", "git"],
};

export interface SkillGapAnalysisResult {
  roleId: RoleId;
  readinessPercentage: number;
  matchedSkills: CoreSkillItem[];
  missingSkills: CoreSkillItem[];
  actionPlanDays: { dayRange: string; title: string; desc: string; lessonLink: string }[];
}

export function calculateSkillGap(
  roleId: RoleId,
  acquiredSkillIds: string[]
): SkillGapAnalysisResult {
  const required = ROLE_SKILL_REQUIREMENTS[roleId] || [];
  const matched = required.filter((id) => acquiredSkillIds.includes(id));
  const missing = required.filter((id) => !acquiredSkillIds.includes(id));

  const readinessPercentage = Math.round(
    (matched.length / (required.length || 1)) * 100
  );

  const matchedSkills = STUDENT_CORE_SKILLS.filter((s) => matched.includes(s.id));
  const missingSkills = STUDENT_CORE_SKILLS.filter((s) => missing.includes(s.id));

  // Dynamic 30-Day Sprint Action Plan
  const actionPlanDays = [
    {
      dayRange: "Days 1 – 7",
      title: "Core Language & Tooling Foundations",
      desc: `Master ${missingSkills[0]?.name || "Git & Command Line fundamentals"} and write clean scripts.`,
      lessonLink: "/year/1",
    },
    {
      dayRange: "Days 8 – 16",
      title: "Core Architecture & Data Layer",
      desc: `Build confidence in ${missingSkills[1]?.name || "SQL and Data Structures"} with daily sandbox exercises.`,
      lessonLink: "/year/2",
    },
    {
      dayRange: "Days 17 – 24",
      title: "Specialization & Framework Implementation",
      desc: `Dive into ${missingSkills[2]?.name || "production frameworks"} and build your first full-stack module.`,
      lessonLink: "/year/3",
    },
    {
      dayRange: "Days 25 – 30",
      title: "Portfolio Project & Interview Readiness",
      desc: "Assemble your capstone project, add CI/CD deployment, and practice placement technical assessments.",
      lessonLink: "/year/4",
    },
  ];

  return {
    roleId,
    readinessPercentage,
    matchedSkills,
    missingSkills,
    actionPlanDays,
  };
}
