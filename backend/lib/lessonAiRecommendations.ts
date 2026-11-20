export interface VideoRecommendation {
  id: string;
  title: string;
  channel: string;
  duration: string;
  language: "en" | "hi" | "te";
  searchQuery: string;
  youtubeEmbedId?: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  verifiedChannelBadge: boolean;
  summary: string;
}

export interface LessonAiResourceBundle {
  englishVideos: VideoRecommendation[];
  hindiVideos: VideoRecommendation[];
  teluguVideos: VideoRecommendation[];
  architectureDiagram: string;
  comparisonTable: {
    headers: string[];
    rows: string[][];
  };
  cheatSheetSummary: string[];
  keyTrapsAndPitfalls: string[];
}

/**
 * Returns dynamic AI suggested videos in English, Hindi, and Telugu,
 * along with visual architecture diagrams and comparison tables for any lesson.
 */
export function getAiLessonResources(lessonTitle: string, category: string = "Core"): LessonAiResourceBundle {
  const titleLower = lessonTitle.toLowerCase();
  const catLower = category.toLowerCase();

  // 1. Docker & Containerization
  if (titleLower.includes("docker") || titleLower.includes("container") || titleLower.includes("devops")) {
    return {
      englishVideos: [
        {
          id: "en-docker-1",
          title: "Docker Tutorial for Beginners [Full Free Course]",
          channel: "TechWorld with Nana",
          duration: "3 hrs 10 min",
          language: "en",
          searchQuery: "Docker Tutorial for Beginners TechWorld with Nana",
          youtubeEmbedId: "3c-iBn73dDE",
          difficulty: "Beginner",
          verifiedChannelBadge: true,
          summary: "Complete hands-on guide to images, containers, Dockerfiles, docker-compose, and networking.",
        },
        {
          id: "en-docker-2",
          title: "Docker in 100 Seconds // Containerization Explained",
          channel: "Fireship",
          duration: "2 min 30 sec",
          language: "en",
          searchQuery: "Docker in 100 Seconds Fireship",
          youtubeEmbedId: "Gjnup-PuquQ",
          difficulty: "Beginner",
          verifiedChannelBadge: true,
          summary: "Ultra-fast high-level overview of namespaces, cgroups, layers, and container isolation.",
        },
        {
          id: "en-docker-3",
          title: "Docker & Kubernetes Full Course 2025",
          channel: "freeCodeCamp.org",
          duration: "4 hrs 45 min",
          language: "en",
          searchQuery: "Docker Kubernetes freeCodeCamp",
          youtubeEmbedId: "fqMOX6JJhGo",
          difficulty: "Intermediate",
          verifiedChannelBadge: true,
          summary: "Production-grade multi-stage container builds and orchestrating services with compose.",
        },
      ],
      hindiVideos: [
        {
          id: "hi-docker-1",
          title: "Complete Docker Tutorial in Hindi - One Video Hands-on",
          channel: "CodeWithHarry",
          duration: "1 hr 45 min",
          language: "hi",
          searchQuery: "Docker Tutorial in Hindi CodeWithHarry",
          youtubeEmbedId: "rOTqprAu1BI",
          difficulty: "Beginner",
          verifiedChannelBadge: true,
          summary: "Hindi step-by-step tutorial on containerizing Node.js and Python web applications.",
        },
        {
          id: "hi-docker-2",
          title: "Docker & Containerization Masterclass in Hindi",
          channel: "Chai aur Code",
          duration: "2 hrs 15 min",
          language: "hi",
          searchQuery: "Docker Chai aur Code Hitesh Choudhary in Hindi",
          youtubeEmbedId: "dQw4w9WgXcQ",
          difficulty: "Intermediate",
          verifiedChannelBadge: true,
          summary: "Hitesh Choudhary explains why Docker replaced VMs, port binding, and volume persistence.",
        },
        {
          id: "hi-docker-3",
          title: "Docker Architecture & Internal Mechanics (Operating System POV)",
          channel: "Gate Smashers",
          duration: "25 min",
          language: "hi",
          searchQuery: "Docker vs Virtual Machine Gate Smashers in Hindi",
          youtubeEmbedId: "G8b4U05z3s0",
          difficulty: "Beginner",
          verifiedChannelBadge: true,
          summary: "Deep academic comparison between Hypervisor Type 2 VMs and Linux Kernel namespaces.",
        },
      ],
      teluguVideos: [
        {
          id: "te-docker-1",
          title: "Docker Tutorial for Beginners in Telugu - Complete Masterclass",
          channel: "Vamsi Bhavani",
          duration: "1 hr 20 min",
          language: "te",
          searchQuery: "Docker Tutorial for Beginners in Telugu Vamsi Bhavani",
          youtubeEmbedId: "1e8XUqH7E_g",
          difficulty: "Beginner",
          verifiedChannelBadge: true,
          summary: "Crystal clear explanation in Telugu of what Docker is, why engineers need it, and first container run.",
        },
        {
          id: "te-docker-2",
          title: "Docker Desktop, Dockerfile & Images Complete Guide in Telugu",
          channel: "Telugu Web Guru",
          duration: "55 min",
          language: "te",
          searchQuery: "Docker Tutorial Telugu Web Guru",
          youtubeEmbedId: "9o9b0t0N3jE",
          difficulty: "Beginner",
          verifiedChannelBadge: true,
          summary: "Writing Dockerfiles, port forwarding with -p 8080:80, and tagging images on Docker Hub in Telugu.",
        },
        {
          id: "te-docker-3",
          title: "Docker Compose & Microservices in Telugu",
          channel: "Harsha Tech",
          duration: "45 min",
          language: "te",
          searchQuery: "Docker compose tutorial in Telugu Harsha Tech",
          youtubeEmbedId: "uKzD5k1zF3A",
          difficulty: "Intermediate",
          verifiedChannelBadge: true,
          summary: "Running multi-container apps (React frontend + Node API + Postgres DB) with one command in Telugu.",
        },
      ],
      architectureDiagram: `
┌────────────────────────────────────────────────────────────────────────┐
│                        DOCKER ARCHITECTURE PIPELINE                   │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│   ┌───────────────┐     docker build      ┌───────────────────────┐   │
│   │  Dockerfile   │ ───────────────────> │     Docker Image      │   │
│   │ (Instructions)│                      │ (Read-Only Layer Stack)│   │
│   └───────────────┘                      └───────────┬───────────┘   │
│                                                      │                │
│                                           docker run │                │
│                                                      v                │
│   ┌───────────────────────────────────────────────────────────────┐   │
│   │                      RUNNING CONTAINER                        │   │
│   │  ┌─────────────────────────┐     ┌─────────────────────────┐  │   │
│   │  │  Writable Top Layer     │     │ Port Mapping (-p 80:80) │  │   │
│   │  ├─────────────────────────┤     ├─────────────────────────┤  │   │
│   │  │  Isolated File System   │     │ Volume Mount (-v /data) │  │   │
│   │  └─────────────────────────┘     └─────────────────────────┘  │   │
│   └──────────────────────────────┬────────────────────────────────┘   │
│                                  │                                    │
│   ═══════════════════════════════╪═════════════════════════════════   │
│   HOST LINUX KERNEL (Namespaces for Isolation & Cgroups for Quotas)  │
│   ═════════════════════════════════════════════════════════════════   │
└────────────────────────────────────────────────────────────────────────┘`,
      comparisonTable: {
        headers: ["Feature / Metric", "Docker Container", "Traditional Virtual Machine (VM)"],
        rows: [
          ["Startup Time", "Sub-second (milliseconds)", "Minutes (boots entire OS kernel)"],
          ["Memory Footprint", "Extremely low (shares host kernel)", "High (allocates 2GB–8GB RAM per VM)"],
          ["Guest OS", "None (shares host Linux kernel)", "Full Guest OS (Windows/Ubuntu per VM)"],
          ["Performance", "Near bare-metal speed", "Hypervisor virtualization overhead"],
          ["Portability", "100% identical across mac/win/linux", "Requires hypervisor exports (.ova / .vmdk)"],
        ],
      },
      cheatSheetSummary: [
        "`docker build -t myapp:1.0 .` -> Compiles Dockerfile into a layered immutable image.",
        "`docker run -d -p 3000:3000 --name web myapp:1.0` -> Launches container in background with port mapping.",
        "`docker ps -a` -> Lists all active and stopped container instances.",
        "`docker exec -it web /bin/sh` -> Opens an interactive shell inside the running container.",
        "`docker compose up --build` -> Orchestrates multi-service dependency trees declaratively.",
      ],
      keyTrapsAndPitfalls: [
        "Never run containers as root in production; always declare a non-root USER in the Dockerfile.",
        "Order Dockerfile commands from least-frequently changed to most-frequently changed to leverage layer caching.",
        "Containers are ephemeral: persistent data must be saved to Docker Named Volumes or bind mounts.",
      ],
    };
  }

  // 2. AI Tools, Cursor & Copilot Workflows
  if (titleLower.includes("cursor") || titleLower.includes("ai tool") || titleLower.includes("copilot") || titleLower.includes("mcp") || titleLower.includes("agent")) {
    return {
      englishVideos: [
        {
          id: "en-ai-1",
          title: "Cursor AI Tutorial for Beginners (The IDE Replacing VS Code)",
          channel: "Fireship",
          duration: "11 min",
          language: "en",
          searchQuery: "Cursor AI Tutorial for Beginners Fireship",
          youtubeEmbedId: "jk5u_K8C86A",
          difficulty: "Beginner",
          verifiedChannelBadge: true,
          summary: "Mastering Composer, Cmd+K inline edits, codebase indexing, and multi-file architecture generation.",
        },
        {
          id: "en-ai-2",
          title: "How Senior Engineers Actually Use AI Coding Tools in 2025",
          channel: "ThePrimeagen",
          duration: "24 min",
          language: "en",
          searchQuery: "How to use Cursor AI like a pro ThePrimeagen",
          youtubeEmbedId: "3e_v6a0Hq4o",
          difficulty: "Intermediate",
          verifiedChannelBadge: true,
          summary: "Balancing AI assistance with software engineering rigor, test suites, and avoiding hallucinations.",
        },
        {
          id: "en-ai-3",
          title: "Model Context Protocol (MCP) Explained in 15 Minutes",
          channel: "freeCodeCamp.org",
          duration: "18 min",
          language: "en",
          searchQuery: "Model Context Protocol Anthropic MCP explained freeCodeCamp",
          youtubeEmbedId: "9o9b0t0N3jE",
          difficulty: "Intermediate",
          verifiedChannelBadge: true,
          summary: "How MCP enables Claude and AI agents to safely read file systems, databases, and third-party APIs.",
        },
      ],
      hindiVideos: [
        {
          id: "hi-ai-1",
          title: "Cursor AI Full Course in Hindi - Code 10x Faster with AI",
          channel: "Chai aur Code",
          duration: "42 min",
          language: "hi",
          searchQuery: "Cursor AI complete tutorial in Hindi Chai aur Code",
          youtubeEmbedId: "dQw4w9WgXcQ",
          difficulty: "Beginner",
          verifiedChannelBadge: true,
          summary: "Comprehensive Hindi guide to setting up Cursor, .cursorrules, system prompts, and multi-file coding.",
        },
        {
          id: "hi-ai-2",
          title: "AI Tools Every Developer Must Know (GitHub Copilot, v0, Cursor)",
          channel: "Apna College",
          duration: "28 min",
          language: "hi",
          searchQuery: "Best AI tools for coders Apna College Shradha Khapra in Hindi",
          youtubeEmbedId: "rOTqprAu1BI",
          difficulty: "Beginner",
          verifiedChannelBadge: true,
          summary: "Shradha Khapra explains how modern tech companies utilize AI tools to accelerate development.",
        },
        {
          id: "hi-ai-3",
          title: "Agentic AI & LangGraph in Hindi: Build Real AI Agents",
          channel: "CodeWithHarry",
          duration: "1 hr 15 min",
          language: "hi",
          searchQuery: "AI Agents LangChain LangGraph in Hindi CodeWithHarry",
          youtubeEmbedId: "G8b4U05z3s0",
          difficulty: "Intermediate",
          verifiedChannelBadge: true,
          summary: "Creating autonomous agents with tool calling, memory state, and vector retrieval in Python.",
        },
      ],
      teluguVideos: [
        {
          id: "te-ai-1",
          title: "Cursor AI Complete Tutorial in Telugu - Best AI Code Editor",
          channel: "Vamsi Bhavani",
          duration: "35 min",
          language: "te",
          searchQuery: "Cursor AI complete tutorial in Telugu Vamsi Bhavani",
          youtubeEmbedId: "1e8XUqH7E_g",
          difficulty: "Beginner",
          verifiedChannelBadge: true,
          summary: "Vamsi Bhavani demonstrates installing Cursor, AI prompts in Telugu, and generating a full web app.",
        },
        {
          id: "te-ai-2",
          title: "Top AI Tools for Software Engineers in Telugu",
          channel: "Telugu Web Guru",
          duration: "30 min",
          language: "te",
          searchQuery: "AI tools for developers tutorial in Telugu Telugu Web Guru",
          youtubeEmbedId: "3c-iBn73dDE",
          difficulty: "Beginner",
          verifiedChannelBadge: true,
          summary: "Hands-on comparison between ChatGPT, Claude 3.5 Sonnet, Copilot, and Cursor in Telugu.",
        },
        {
          id: "te-ai-3",
          title: "How to Build AI Applications with Gemini & Claude APIs in Telugu",
          channel: "Harsha Tech",
          duration: "50 min",
          language: "te",
          searchQuery: "Generative AI Python tutorial in Telugu Harsha Tech",
          youtubeEmbedId: "uKzD5k1zF3A",
          difficulty: "Intermediate",
          verifiedChannelBadge: true,
          summary: "Connecting LLM APIs with Python, system prompts, and structured JSON output in Telugu.",
        },
      ],
      architectureDiagram: `
┌────────────────────────────────────────────────────────────────────────┐
│                   AI-ASSISTED DEVELOPMENT ARCHITECTURE                │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│   ┌───────────────────────────┐     Embeddings     ┌────────────────┐  │
│   │    Workspace Codebase     │ ─────────────────> │ Local Semantic │  │
│   │   (.ts, .py, .sql, .md)   │                    │  Vector Index  │  │
│   └─────────────┬─────────────┘                    └───────┬────────┘  │
│                 │                                          │           │
│                 v                                          v           │
│   ┌─────────────────────────────────────────────────────────────────┐  │
│   │                     CONTEXT WINDOW BUILDER                      │  │
│   │  • .cursorrules / AGENTS.md instructions                        │  │
│   │  • Current file snippet + Cursor position                       │  │
│   │  • Semantic search hits from codebase index                     │  │
│   │  • Terminal compile errors & linter diagnostics                 │  │
│   └─────────────────────────────────┬───────────────────────────────┘  │
│                                     │                                  │
│                                     v                                  │
│   ┌─────────────────────────────────────────────────────────────────┐  │
│   │               FRONTIER LLM (Claude 3.5 Sonnet / GPT-4o)         │  │
│   │  Generates Diff / AST Modification / Verified Unit Test         │  │
│   └─────────────────────────────────┬───────────────────────────────┘  │
│                                     │                                  │
│                                     v                                  │
│   ┌───────────────────────────┐           ┌─────────────────────────┐  │
│   │   Human Developer Review  │ ────────> │ Integrated Test Runner  │  │
│   │    (Accept / Reject Diff) │           │ (Zero Blind Acceptance) │  │
│   └───────────────────────────┘           └─────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘`,
      comparisonTable: {
        headers: ["Workflow Angle", "Raw Copy-Paste (ChatGPT / Web)", "Agentic IDE (Cursor / Copilot)"],
        rows: [
          ["Context Awareness", "Zero context; you must paste files manually", "Indexes entire repository with embeddings"],
          ["Code Edits", "Pasted back and forth manually", "Applies direct multi-file git diffs in-place"],
          ["Bug Diagnosis", "Blind guess without terminal logs", "Directly ingests compiler & linter errors"],
          ["Rule Compliance", "Easily ignored by web chats", "Enforces project rules via .cursorrules file"],
          ["Engineering Speed", "1.5x speedup with high manual friction", "5x–10x acceleration for routine scaffolding"],
        ],
      },
      cheatSheetSummary: [
        "`Cmd + K` (Inline Edit) -> Highlight code and instruct AI to refactor, add type annotations, or handle edge cases.",
        "`Cmd + L` (Chat / Composer) -> Open the contextual assistant with full repository `@codebase` indexing.",
        "`@docs / @web` -> Feed external API documentation directly into the model context.",
        "Always define `.cursorrules` in project root with code conventions, styling rules, and disallowed packages.",
      ],
      keyTrapsAndPitfalls: [
        "Never accept AI generated code without reading and running tests; AI often generates plausible-looking bugs.",
        "AI can invent phantom package dependencies; always check `package.json` before running `npm install`.",
        "Do not paste API keys, database credentials, or secret environment variables into LLM chat prompts.",
      ],
    };
  }

  // 3. Git, GitHub & Version Control
  if (titleLower.includes("git") || titleLower.includes("github") || titleLower.includes("version control")) {
    return {
      englishVideos: [
        {
          id: "en-git-1",
          title: "Git and GitHub for Beginners - Crash Course",
          channel: "freeCodeCamp.org",
          duration: "1 hr 10 min",
          language: "en",
          searchQuery: "Git and GitHub for Beginners Crash Course freeCodeCamp",
          youtubeEmbedId: "RGOj5yH7evk",
          difficulty: "Beginner",
          verifiedChannelBadge: true,
          summary: "Learn git init, staging, commits, branches, pull requests, and resolving merge conflicts.",
        },
        {
          id: "en-git-2",
          title: "Git in 100 Seconds // Source Control Explained",
          channel: "Fireship",
          duration: "2 min 40 sec",
          language: "en",
          searchQuery: "Git in 100 Seconds Fireship",
          youtubeEmbedId: "hwP7WQkmECE",
          difficulty: "Beginner",
          verifiedChannelBadge: true,
          summary: "Understand snapshots, cryptographic SHA hashes, staging trees, and commit graphs.",
        },
        {
          id: "en-git-3",
          title: "Advanced Git Tutorial: Rebase, Cherry-Pick, Reflog & Reset",
          channel: "Amigoscode",
          duration: "45 min",
          language: "en",
          searchQuery: "Advanced Git Tutorial Rebase Reflog Amigoscode",
          youtubeEmbedId: "Uszj_k0DGsg",
          difficulty: "Advanced",
          verifiedChannelBadge: true,
          summary: "Recovering lost commits with git reflog and interactive rebasing for clean PR history.",
        },
      ],
      hindiVideos: [
        {
          id: "hi-git-1",
          title: "Complete Git and GitHub Tutorial in Hindi",
          channel: "CodeWithHarry",
          duration: "1 hr 20 min",
          language: "hi",
          searchQuery: "Git and GitHub Tutorial in Hindi CodeWithHarry",
          youtubeEmbedId: "gwWKnnCMQ5c",
          difficulty: "Beginner",
          verifiedChannelBadge: true,
          summary: "Harry explains version control from scratch with real terminal commands and GitHub setup.",
        },
        {
          id: "hi-git-2",
          title: "Git & GitHub Crash Course in Hindi - One Video Hands-on",
          channel: "Apna College",
          duration: "1 hr 40 min",
          language: "hi",
          searchQuery: "Git GitHub Tutorial in Hindi Apna College Shradha Khapra",
          youtubeEmbedId: "apGV9Kg7ics",
          difficulty: "Beginner",
          verifiedChannelBadge: true,
          summary: "Shradha Khapra covers branching, merge conflicts, open-source pull requests, and best practices.",
        },
        {
          id: "hi-git-3",
          title: "Git Internal Architecture & How Git Works Under the Hood in Hindi",
          channel: "Gate Smashers",
          duration: "30 min",
          language: "hi",
          searchQuery: "Git Architecture Gate Smashers in Hindi",
          youtubeEmbedId: "G8b4U05z3s0",
          difficulty: "Intermediate",
          verifiedChannelBadge: true,
          summary: "Explains Blobs, Trees, Commits, and Directed Acyclic Graphs (DAGs) in version control.",
        },
      ],
      teluguVideos: [
        {
          id: "te-git-1",
          title: "Git & GitHub Complete Course in Telugu for Beginners",
          channel: "Vamsi Bhavani",
          duration: "1 hr 15 min",
          language: "te",
          searchQuery: "Git and GitHub tutorial in Telugu Vamsi Bhavani",
          youtubeEmbedId: "1e8XUqH7E_g",
          difficulty: "Beginner",
          verifiedChannelBadge: true,
          summary: "Telugu step-by-step tutorial on Git initialization, commit history, and publishing code to GitHub.",
        },
        {
          id: "te-git-2",
          title: "Git Branches, Merge Conflicts & Pull Requests in Telugu",
          channel: "Telugu Web Guru",
          duration: "45 min",
          language: "te",
          searchQuery: "Git branches merge conflicts tutorial in Telugu Telugu Web Guru",
          youtubeEmbedId: "9o9b0t0N3jE",
          difficulty: "Intermediate",
          verifiedChannelBadge: true,
          summary: "How engineering teams collaborate using feature branches and resolve code conflicts in Telugu.",
        },
        {
          id: "te-git-3",
          title: "Git Commands You Must Know for Placement Interviews in Telugu",
          channel: "Harsha Tech",
          duration: "40 min",
          language: "te",
          searchQuery: "Git commands interview questions Telugu Harsha Tech",
          youtubeEmbedId: "uKzD5k1zF3A",
          difficulty: "Beginner",
          verifiedChannelBadge: true,
          summary: "Important interview questions on git rebase vs merge, git stash, and undoing commits in Telugu.",
        },
      ],
      architectureDiagram: `
┌────────────────────────────────────────────────────────────────────────┐
│                        GIT THREE-TREE ARCHITECTURE                     │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│   ┌─────────────────────┐   git add .    ┌─────────────────────────┐   │
│   │  WORKING DIRECTORY  │ ─────────────> │      STAGING AREA       │   │
│   │   (Untracked &      │                │         (INDEX)         │   │
│   │   Modified Files)   │ <───────────── │   (Prepared Snapshot)   │   │
│   └─────────────────────┘   git restore  └────────────┬────────────┘   │
│                                                       │                │
│                                            git commit │                │
│                                                       v                │
│   ┌─────────────────────┐    git push    ┌─────────────────────────┐   │
│   │   REMOTE REPO       │ <───────────── │    LOCAL REPOSITORY     │   │
│   │    (GitHub /        │                │         (.git)          │   │
│   │    GitLab Origin)   │ ─────────────> │ (Immutable Commit DAG)  │   │
│   └─────────────────────┘    git pull    └─────────────────────────┘   │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘`,
      comparisonTable: {
        headers: ["Command", "Action", "Safety Level", "Production Recommendation"],
        rows: [
          ["git merge <branch>", "Creates a merge commit combining history", "Safe", "Best for public shared branches (main/prod)"],
          ["git rebase <branch>", "Replays commits on top of base for linear log", "Medium", "Best for personal feature branches before PR"],
          ["git reset --soft HEAD~1", "Undoes commit, keeps changes staged", "Safe", "Great for rewording or grouping commits"],
          ["git reset --hard HEAD~1", "Permanently discards commit and changes", "High Risk", "Never run without verifying git reflog"],
        ],
      },
      cheatSheetSummary: [
        "`git init` -> Initializes a new empty Git repository inside current directory.",
        "`git checkout -b feature/auth` -> Creates and switches to a dedicated feature branch.",
        "`git status -s` -> Shows condensed status of modified, staged, and untracked files.",
        "`git stash` & `git stash pop` -> Shelves uncommitted work temporarily without committing.",
        "`git log --oneline --graph` -> Displays a visual ASCII branch commit tree in your terminal.",
      ],
      keyTrapsAndPitfalls: [
        "Never commit secrets, .env files, or API keys: always maintain a strict `.gitignore`.",
        "Never run `git push --force` on shared team branches like `main` or `staging`.",
        "Commit early and write descriptive commit messages (e.g., 'feat: add JWT auth middleware').",
      ],
    };
  }

  // 4. Default / Core Programming (C, Python, DSA, OOP, DBMS, OS, Web)
  const isC = titleLower.includes("c ") || titleLower.includes("pointer") || titleLower.includes("memory") || catLower.includes("c");
  const isDSA = titleLower.includes("dsa") || titleLower.includes("array") || titleLower.includes("list") || titleLower.includes("tree");
  const isWeb = titleLower.includes("web") || titleLower.includes("react") || titleLower.includes("next");
  const isDB = titleLower.includes("sql") || titleLower.includes("dbms") || titleLower.includes("database");

  return {
    englishVideos: [
      {
        id: "en-core-1",
        title: `${lessonTitle} - Complete Masterclass`,
        channel: isC ? "freeCodeCamp.org" : isDSA ? "Abdul Bari" : isWeb ? "Traversy Media" : "MIT OpenCourseWare",
        duration: "55 min",
        language: "en",
        searchQuery: `${lessonTitle} ${category} full course tutorial freeCodeCamp`,
        youtubeEmbedId: "KJgsSFOSQv0",
        difficulty: "Intermediate",
        verifiedChannelBadge: true,
        summary: `Comprehensive conceptual breakdown of ${lessonTitle} with step-by-step code walkthroughs.`,
      },
      {
        id: "en-core-2",
        title: `${lessonTitle} in 100 Seconds`,
        channel: "Fireship",
        duration: "3 min 15 sec",
        language: "en",
        searchQuery: `${lessonTitle} Fireship in 100 seconds`,
        youtubeEmbedId: "U3aXWizDbQ4",
        difficulty: "Beginner",
        verifiedChannelBadge: true,
        summary: "High-yield rapid mental models, core syntax, and architecture summary.",
      },
      {
        id: "en-core-3",
        title: `${lessonTitle} - Placement Interview Deep Dive`,
        channel: "NeetCode",
        duration: "35 min",
        language: "en",
        searchQuery: `${lessonTitle} NeetCode interview coding problems`,
        youtubeEmbedId: "3e_v6a0Hq4o",
        difficulty: "Advanced",
        verifiedChannelBadge: true,
        summary: `Production edge cases, algorithmic time complexity, and top tier product company interview traps.`,
      },
    ],
    hindiVideos: [
      {
        id: "hi-core-1",
        title: `${lessonTitle} in Hindi (Complete Detailed Lecture)`,
        channel: isC ? "CodeWithHarry" : isDSA ? "Apna College" : isDB ? "Gate Smashers" : "Chai aur Code",
        duration: "45 min",
        language: "hi",
        searchQuery: `${lessonTitle} in Hindi CodeWithHarry Apna College`,
        youtubeEmbedId: "rOTqprAu1BI",
        difficulty: "Beginner",
        verifiedChannelBadge: true,
        summary: `Clear Hindi explanation with whiteboard diagrams, memory visualizer, and syntax anatomy.`,
      },
      {
        id: "hi-core-2",
        title: `${lessonTitle} - One Shot Masterclass in Hindi`,
        channel: "Apna College",
        duration: "1 hr 10 min",
        language: "hi",
        searchQuery: `${lessonTitle} one shot full lecture in Hindi Apna College`,
        youtubeEmbedId: "apGV9Kg7ics",
        difficulty: "Intermediate",
        verifiedChannelBadge: true,
        summary: `Everything you need to know about ${lessonTitle} from fundamentals to placement-ready mastery.`,
      },
      {
        id: "hi-core-3",
        title: `${lessonTitle} Concepts & Gate/Interview Questions in Hindi`,
        channel: "Gate Smashers",
        duration: "25 min",
        language: "hi",
        searchQuery: `${lessonTitle} Gate Smashers Varun Singla in Hindi`,
        youtubeEmbedId: "G8b4U05z3s0",
        difficulty: "Intermediate",
        verifiedChannelBadge: true,
        summary: `Academic precision, internal OS/hardware mechanics, and tricky university exam questions.`,
      },
    ],
    teluguVideos: [
      {
        id: "te-core-1",
        title: `${lessonTitle} Complete Explanation in Telugu`,
        channel: "Vamsi Bhavani",
        duration: "40 min",
        language: "te",
        searchQuery: `${lessonTitle} tutorial in Telugu Vamsi Bhavani`,
        youtubeEmbedId: "1e8XUqH7E_g",
        difficulty: "Beginner",
        verifiedChannelBadge: true,
        summary: `Vamsi Bhavani explains ${lessonTitle} with practical examples and simple Telugu analogies.`,
      },
      {
        id: "te-core-2",
        title: `${lessonTitle} with Practical Coding in Telugu`,
        channel: "Telugu Web Guru",
        duration: "50 min",
        language: "te",
        searchQuery: `${lessonTitle} programming tutorial in Telugu Telugu Web Guru`,
        youtubeEmbedId: "9o9b0t0N3jE",
        difficulty: "Intermediate",
        verifiedChannelBadge: true,
        summary: `Hands-on live coding in Telugu, explaining each line of code, debugging common errors, and best practices.`,
      },
      {
        id: "te-core-3",
        title: `${lessonTitle} Important Interview Questions in Telugu`,
        channel: "Harsha Tech",
        duration: "30 min",
        language: "te",
        searchQuery: `${lessonTitle} interview questions in Telugu Harsha Tech`,
        youtubeEmbedId: "uKzD5k1zF3A",
        difficulty: "Beginner",
        verifiedChannelBadge: true,
        summary: `Frequently asked campus placement and technical round interview questions on ${lessonTitle} in Telugu.`,
      },
    ],
    architectureDiagram: `
┌────────────────────────────────────────────────────────────────────────┐
│                   TECHNICAL ARCHITECTURE & DATA FLOW                   │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│   ┌─────────────────────┐   Input & Parse   ┌───────────────────────┐  │
│   │    Source Input     │ ────────────────> │   Execution Engine    │  │
│   │  (Data / Syntax)    │                   │   (Virtual Memory)    │  │
│   └─────────────────────┘                   └───────────┬───────────┘  │
│                                                         │              │
│                                              Transform  │              │
│                                                         v              │
│   ┌───────────────────────────────────────────────────────────────┐    │
│   │                     STATE & RUNTIME MEMORY                    │    │
│   │  • Stack Allocation (Local activation records & scopes)       │    │
│   │  • Heap Allocation (Dynamically managed persistent objects)   │    │
│   │  • Constant Pool / Read-Only Data                             │    │
│   └──────────────────────────────┬────────────────────────────────┘    │
│                                  │                                     │
│                                  v Deterministic Output                │
│   ┌───────────────────────────────────────────────────────────────┐    │
│   │                   VERIFIED PRODUCTION OUTPUT                  │    │
│   └───────────────────────────────────────────────────────────────┘    │
└────────────────────────────────────────────────────────────────────────┘`,
    comparisonTable: {
      headers: ["Aspect", "Naive / Beginner Approach", "Production Engineering Standard"],
      rows: [
        ["Memory Management", "Unbounded allocations, potential memory leaks", "Deterministic scoping, garbage collection / RAII cleanup"],
        ["Error Handling", "Silent failures, unhandled null pointers", "Explicit exception boundaries, typed Result/Either returns"],
        ["Complexity", "O(N²) brute force nested computations", "O(N) or O(log N) optimal traversal with caching"],
        ["Concurrency", "Race conditions, shared mutable state", "Immutable data structures, atomic locks or message queues"],
      ],
    },
    cheatSheetSummary: [
      `Always analyze the time and space complexity before choosing an algorithmic approach.`,
      `Design with single responsibility principle: functions should perform one unambiguous task.`,
      `Test edge cases proactively: empty inputs, single element, negative numbers, maximum boundaries.`,
      `Keep dependencies minimal and clean to preserve long-term maintainability.`,
    ],
    keyTrapsAndPitfalls: [
      "Off-by-one errors in loop boundaries and array indexing.",
      "Assuming input data is always clean or non-null.",
      "Premature optimization before measuring actual runtime bottlenecks.",
    ],
  };
}
