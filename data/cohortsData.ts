// data/cohortsData.ts
// Live Cohorts, Weekend Masterclasses, Industry Mentors & Recordings

export interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  bio: string;
  experience: string;
  alumniOf: string;
}

export interface LiveCohort {
  id: string;
  title: string;
  tagline: string;
  domain: string;
  durationWeeks: number;
  startDate: string;
  schedule: string;
  totalSeats: number;
  seatsRemaining: number;
  priceINR: number;
  priceUSD: number;
  badge: string;
  mentor: Mentor;
  highlights: string[];
  curriculumWeeks: {
    week: number;
    title: string;
    topics: string[];
    handsOnProject: string;
  }[];
  meetingPlatform: "Google Meet" | "Zoom Live" | "CampusGrow Live Stage";
  nextLiveClass: {
    title: string;
    timestamp: string; // ISO or human string
    topic: string;
  };
  sampleRecordingUrl?: string;
}

export interface Masterclass {
  id: string;
  title: string;
  description: string;
  mentor: Mentor;
  date: string;
  timeIST: string;
  durationMinutes: number;
  seatsRemaining: number;
  priceINR: number;
  priceUSD: number;
  tags: string[];
}

export const FEATURED_MENTORS: Mentor[] = [
  {
    id: "arjun-sharma",
    name: "Arjun Sharma",
    role: "Senior Staff Distributed Systems Engineer",
    company: "Google Cloud",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    bio: "11+ years designing globally distributed storage engines and RPC consensus protocols. Mentored 400+ engineers into Big Tech.",
    experience: "11+ Yrs",
    alumniOf: "IIT Bombay",
  },
  {
    id: "neha-kulkarni",
    name: "Neha Kulkarni",
    role: "Principal AI Research Scientist",
    company: "Microsoft Research",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    bio: "Specializing in Large Language Model fine-tuning, RAG pipelines, and Autonomous Agent orchestration.",
    experience: "9+ Yrs",
    alumniOf: "IISc Bangalore",
  },
  {
    id: "vikram-aditya",
    name: "Vikram Aditya",
    role: "Director of Platform Engineering",
    company: "Razorpay",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    bio: "Architected high-throughput payment switches processing billions in transactions. Docker, Kubernetes and Golang specialist.",
    experience: "12+ Yrs",
    alumniOf: "BITS Pilani",
  },
  {
    id: "priya-nair",
    name: "Priya Nair",
    role: "Lead Full-Stack Architect",
    company: "Uber",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    bio: "Expert in micro-frontends, high-performance Next.js architectures, WebSocket real-time feeds, and engineering leadership.",
    experience: "8+ Yrs",
    alumniOf: "NIT Trichy",
  },
];

export const LIVE_COHORTS: LiveCohort[] = [
  {
    id: "fullstack-devops-elite",
    title: "Full-Stack Web & Cloud Native DevOps Elite Cohort",
    tagline: "Build production Next.js apps, Dockerize services, manage Kubernetes clusters, and automate CI/CD pipelines.",
    domain: "Web & DevOps",
    durationWeeks: 8,
    startDate: "Starts Saturday, Nov 22, 2026",
    schedule: "Every Saturday & Sunday • 6:00 PM – 8:30 PM IST",
    totalSeats: 50,
    seatsRemaining: 9,
    priceINR: 5999,
    priceUSD: 79,
    badge: "MOST POPULAR",
    mentor: FEATURED_MENTORS[2], // Vikram Aditya
    highlights: [
      "Live interactive classes with code-along walkthroughs",
      "Dedicated 1-on-1 code reviews on your GitHub PRs",
      "Private Discord / Community channel with mentors",
      "Deploy 4 real production-grade systems to live cloud",
      "Free bundled Studio Pro access included throughout the cohort",
    ],
    curriculumWeeks: [
      {
        week: 1,
        title: "Modern React 19, TypeScript & High-Performance Next.js",
        topics: ["Server Components vs Client Components", "Streaming SSR", "Optimistic UI mutations", "Tailwind CSS architecture"],
        handsOnProject: "Real-time Collaborative Whiteboard & Docs",
      },
      {
        week: 2,
        title: "Enterprise Backend Architecture with Node.js & Go",
        topics: ["Clean Hexagonal Architecture", "REST vs gRPC vs GraphQL", "Database connection pooling", "JWT & Refresh Token rotations"],
        handsOnProject: "High-Throughput Authentication & Rate Limiting Gateway",
      },
      {
        week: 3,
        title: "Databases, Indexing & High-Scale Caching with Redis",
        topics: ["PostgreSQL query planning & EXPLAIN ANALYZE", "B-Tree vs Hash indexing", "Cache-aside & Write-through patterns", "Redis Pub/Sub"],
        handsOnProject: "Sub-millisecond Financial Ledger & Cache Engine",
      },
      {
        week: 4,
        title: "Docker Containerization & Multi-Stage Builds",
        topics: ["Docker internals & cgroups", "Multi-stage scratch builds", "Docker Compose microservices", "Container security & non-root users"],
        handsOnProject: "Microservices Swarm Containerization",
      },
      {
        week: 5,
        title: "Kubernetes Orchestration & Production Deployment",
        topics: ["Pods, Deployments, ReplicaSets & Services", "Ingress controllers & TLS", "ConfigMaps & Secrets", "HPA autoscaling on CPU/Traffic"],
        handsOnProject: "Self-Healing Multi-Zone Kubernetes Cluster Deployment",
      },
      {
        week: 6,
        title: "CI/CD Automation with GitHub Actions & ArgoCD",
        topics: ["GitHub Actions workflow pipelines", "Automated lint & unit testing gates", "GitOps continuous delivery with ArgoCD", "Zero-downtime Blue-Green releases"],
        handsOnProject: "Automated Enterprise GitOps Delivery Pipeline",
      },
      {
        week: 7,
        title: "Cloud Observability: Prometheus, Grafana & Distributed Tracing",
        topics: ["Metric scraping with Prometheus", "Custom Grafana dashboards", "Distributed tracing with OpenTelemetry & Jaeger", "Alertmanager Slack webhooks"],
        handsOnProject: "Full Production Observability Stack",
      },
      {
        week: 8,
        title: "Capstone Demo Day & FAANG System Design Interviews",
        topics: ["Live Capstone Presentations to Tech Leads", "Mock System Design interview rounds", "Portfolio & Resume placement polish", "Hiring referrals"],
        handsOnProject: "Production Multi-Tenant SaaS Platform",
      },
    ],
    meetingPlatform: "Google Meet",
    nextLiveClass: {
      title: "Class 1: High-Performance Next.js & Server Architecture",
      timestamp: "Saturday • 6:00 PM IST",
      topic: "Deep dive into React 19 Server Components, streaming hydration, and cloud edge routing.",
    },
    sampleRecordingUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "agentic-ai-llm-systems",
    title: "Agentic AI, RAG & LLM Production Systems Cohort",
    tagline: "Master LangChain, LlamaIndex, MCP (Model Context Protocol), vector databases, and multi-agent autonomous teams.",
    domain: "Artificial Intelligence",
    durationWeeks: 6,
    startDate: "Starts Saturday, Nov 29, 2026",
    schedule: "Every Saturday & Sunday • 8:30 PM – 10:30 PM IST",
    totalSeats: 45,
    seatsRemaining: 14,
    priceINR: 6999,
    priceUSD: 89,
    badge: "CUTTING EDGE",
    mentor: FEATURED_MENTORS[1], // Neha Kulkarni
    highlights: [
      "Build real autonomous agent swarms with tool-calling capabilities",
      "Production RAG architectures with hybrid semantic search",
      "Fine-tuning open-weights models (Llama 3 & Mistral) with LoRA",
      "Model Context Protocol (MCP) integrations with local dev tooling",
      "Direct code imports into Project Hub IDE & Workspace storage",
    ],
    curriculumWeeks: [
      {
        week: 1,
        title: "Prompt Engineering & Structured Function Calling",
        topics: ["Zero-shot, Few-shot & Chain-of-Thought", "JSON Mode & Pydantic schema validation", "API rate limits, tokens & cost optimization", "System instructions design"],
        handsOnProject: "Autonomous Code Refactoring & Docstring Agent",
      },
      {
        week: 2,
        title: "Production RAG Architecture with Vector Databases",
        topics: ["Chunking strategies (semantic, recursive, markdown)", "Embedding models benchmark", "Pinecone, Qdrant & pgvector in PostgreSQL", "Hybrid BM25 + dense semantic search"],
        handsOnProject: "Enterprise Multi-PDF Semantic Search & Citations Engine",
      },
      {
        week: 3,
        title: "Agentic Workflows with LangGraph & ReAct Loops",
        topics: ["Reasoning + Acting (ReAct) frameworks", "State machines & cycles with LangGraph", "Human-in-the-loop approvals", "Tool execution sandboxes"],
        handsOnProject: "Self-Correcting Autonomous Web Research & Report Agent",
      },
      {
        week: 4,
        title: "Model Context Protocol (MCP) & Local LLM Serving",
        topics: ["Anthropic Model Context Protocol specification", "Building custom MCP server tools", "Ollama & vLLM high-throughput local serving", "Quantization: GGUF, AWQ, EXL2"],
        handsOnProject: "Local Desktop AI Assistant powered by Custom MCP Servers",
      },
      {
        week: 5,
        title: "Fine-Tuning Open Source LLMs with Unsloth & LoRA",
        topics: ["PEFT & Low-Rank Adaptation (LoRA / QLoRA)", "Dataset curation & synthetic data generation", "Training loss tracking & evaluation metrics", "Model weights merging & deployment"],
        handsOnProject: "Fine-Tuned Specialized Medical/Legal Coding LLM",
      },
      {
        week: 6,
        title: "Multi-Agent Swarms & Placement Demo Day",
        topics: ["Multi-agent collaboration architectures", "Shared message boards & task delegation", "AI agent security & prompt injection defense", "Capstones showcase"],
        handsOnProject: "Complete Autonomous Product Development AI Swarm",
      },
    ],
    meetingPlatform: "Zoom Live",
    nextLiveClass: {
      title: "Class 1: Foundations of Agentic AI & Structured JSON Runtimes",
      timestamp: "Saturday, Nov 29 • 8:30 PM IST",
      topic: "Building production pipelines using Gemini 2.0 Flash and Claude 3.5 Sonnet with Pydantic.",
    },
  },
  {
    id: "faang-dsa-systems-placement",
    title: "FAANG DSA, Hard Algorithms & System Design Placement Cohort",
    tagline: "Crack Online Assessments (OA) and Google / Amazon technical coding rounds with pattern-based problem solving.",
    domain: "Placements & DSA",
    durationWeeks: 8,
    startDate: "Starts Monday, Nov 24, 2026",
    schedule: "Every Monday, Wednesday & Friday • 9:00 PM – 10:30 PM IST",
    totalSeats: 60,
    seatsRemaining: 18,
    priceINR: 4999,
    priceUSD: 69,
    badge: "CAREER ACCELERATOR",
    mentor: FEATURED_MENTORS[0], // Arjun Sharma
    highlights: [
      "Pattern-based DSA mastery (Two Pointers, Sliding Window, DP, Graphs)",
      "Daily Online Assessment (OA) mock tests under real time limits",
      "High-Level (HLD) & Low-Level (LLD) System Design live masterclasses",
      "Direct referrals to Tier-1 product firms for top performers",
      "Unlimited 1-on-1 AI mock interviews included in Studio Pro",
    ],
    curriculumWeeks: [
      {
        week: 1,
        title: "Array Patterns, Sliding Window & Two Pointers",
        topics: ["Subarray sum problems", "Fast and slow pointers", "Sliding window minimums & maximums", "Prefix sum & Difference arrays"],
        handsOnProject: "LeetCode Hard Online Assessment Simulator",
      },
      {
        week: 2,
        title: "Trees, Binary Search Trees & Trie Indexing",
        topics: ["Lowest Common Ancestor (LCA)", "Serialize & Deserialize Binary Trees", "Trie prefix matching & autocomplete", "Segment Trees & Fenwick Trees"],
        handsOnProject: "In-Memory Autocomplete & Search Indexer",
      },
      {
        week: 3,
        title: "Graph Algorithms, Topological Sort & Disjoint Set Union (DSU)",
        topics: ["Dijkstra's shortest path with min-heap", "Kruskal's & Prim's minimum spanning tree", "Bipartite graphs & Cycle detection in directed graphs", "Tarjan's strongly connected components"],
        handsOnProject: "Google Maps Route Optimization Engine",
      },
      {
        week: 4,
        title: "Dynamic Programming (1D, 2D & State Compression)",
        topics: ["0/1 Knapsack & Unbounded Knapsack", "Longest Common Subsequence & Edit Distance", "Matrix Chain Multiplication (MCM)", "Bitmask Dynamic Programming"],
        handsOnProject: "Algorithmic Arbitrage & Trading Optimizer",
      },
      {
        week: 5,
        title: "Low-Level Design (LLD): Object-Oriented Principles & Design Patterns",
        topics: ["SOLID design principles in production", "Factory, Singleton, Builder & Strategy patterns", "Observer & Pub/Sub in multi-threaded code", "UML class diagramming"],
        handsOnProject: "Complete LLD of Splitwise & BookMyShow",
      },
      {
        week: 6,
        title: "High-Level Design (HLD): Scalable Distributed Architectures",
        topics: ["Consistent Hashing & Load Balancing", "Database sharding & replication lag", "Cap Theorem in real production", "Message queues: Kafka vs RabbitMQ"],
        handsOnProject: "Architecture Design of WhatsApp / Uber System",
      },
      {
        week: 7,
        title: "Concurrency, Multithreading & Memory Management",
        topics: ["Race conditions, Mutexes & Deadlocks", "Thread pools & Producer-Consumer queues", "Memory leaks & Cache locality", "Zero-copy I/O"],
        handsOnProject: "High-Performance Multi-Threaded Web Crawler",
      },
      {
        week: 8,
        title: "Mock Interview Marathons & Offer Negotiation",
        topics: ["Live 1-on-1 Mock coding rounds with FAANG engineers", "Behavioral Leadership Principles (Amazon STAR method)", "Salary negotiation & equity breakdown", "Resume fine-tuning"],
        handsOnProject: "FAANG Placement Readiness Portfolio",
      },
    ],
    meetingPlatform: "Google Meet",
    nextLiveClass: {
      title: "Class 1: Master Sliding Window & Two-Pointer Patterns",
      timestamp: "Monday, Nov 24 • 9:00 PM IST",
      topic: "Solving 6 complex interview problems with step-by-step invariant derivation.",
    },
  },
];

export const UPCOMING_MASTERCLASSES: Masterclass[] = [
  {
    id: "dist-cache-go",
    title: "Build a Distributed In-Memory Cache in Golang from Scratch",
    description: "Code a real-world Redis alternative with consistent hashing, LRU eviction, and HTTP peer replication in 3 hours.",
    mentor: FEATURED_MENTORS[0], // Arjun Sharma
    date: "Sunday, Nov 23, 2026",
    timeIST: "4:00 PM – 7:00 PM IST",
    durationMinutes: 180,
    seatsRemaining: 18,
    priceINR: 499,
    priceUSD: 9,
    tags: ["Golang", "Distributed Systems", "Cache", "Redis"],
  },
  {
    id: "system-design-hotstar",
    title: "System Design Masterclass: Hotstar for 50M Concurrent Streamers",
    description: "Learn CDN caching strategies, video chunking, live chat fan-out, and auto-scaling mechanisms for cricket world cup scale.",
    mentor: FEATURED_MENTORS[2], // Vikram Aditya
    date: "Saturday, Nov 29, 2026",
    timeIST: "5:00 PM – 7:30 PM IST",
    durationMinutes: 150,
    seatsRemaining: 24,
    priceINR: 499,
    priceUSD: 9,
    tags: ["System Design", "High Scale", "Streaming", "WebSockets"],
  },
  {
    id: "mcp-ai-agents",
    title: "Building Autonomous Coding Agents with Model Context Protocol (MCP)",
    description: "Step-by-step hands-on implementation of custom tools, terminal executors, and persistent memory agents using Python & TypeScript.",
    mentor: FEATURED_MENTORS[1], // Neha Kulkarni
    date: "Sunday, Dec 7, 2026",
    timeIST: "6:00 PM – 8:30 PM IST",
    durationMinutes: 150,
    seatsRemaining: 12,
    priceINR: 699,
    priceUSD: 12,
    tags: ["Agentic AI", "MCP", "Python", "LLMs"],
  },
];
