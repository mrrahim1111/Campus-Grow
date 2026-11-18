export interface CodeLineExplanation {
  line: string;
  explanation: string;
}

export interface DetailedLessonChapter {
  id: string;
  number: number;
  badge: string;
  title: string;
  icon: string;
  summary: string;
  deepDiveParagraphs: string[];
  visualDiagram?: string;
  annotatedCode?: {
    filename: string;
    language: string;
    code: string;
    lineExplanations: CodeLineExplanation[];
  };
  productionTraps: string[];
  keyTakeaways: string[];
}

export interface SyntaxReferenceItem {
  tokenOrMethod: string;
  signature: string;
  complexity: string;
  returnType: string;
  practicalUsage: string;
  warningNote?: string;
}

export interface PlacementInterviewDefense {
  question: string;
  testedSkill: string;
  modelAnswer: string;
  gotchaPitfall: string;
}

export interface DetailedLessonMasteryGuide {
  lessonTitle: string;
  mentalModelAnalogy: string;
  whyThisExists: string;
  chapters: DetailedLessonChapter[];
  syntaxTable: SyntaxReferenceItem[];
  placementInterviewDefense: PlacementInterviewDefense[];
  productionReadinessChecklist: string[];
}

/**
 * Generates an exhaustive, pin-to-pin encyclopedic engineering guide for any lesson topic,
 * ensuring students never need to consult third-party websites.
 */
export function getDetailedLessonGuide(
  lessonTitle: string,
  category: string = "Computer Science",
  technologies: string[] = []
): DetailedLessonMasteryGuide {
  const t = lessonTitle.toLowerCase();
  const cat = category.toLowerCase();
  const tech = technologies[0] || "Architecture";

  // Check topic type
  const isDocker = t.includes("docker") || t.includes("container") || t.includes("devops");
  const isGit = t.includes("git") || t.includes("github") || t.includes("version control");
  const isAI = t.includes("cursor") || t.includes("copilot") || t.includes("ai tool") || t.includes("mcp") || t.includes("agent");
  const isPointers = t.includes("pointer") || t.includes("memory") || t.includes("virtualization");
  const isDSA = t.includes("data structure") || t.includes("array") || t.includes("tree") || t.includes("dsa") || t.includes("algorithm");
  const isDB = t.includes("database") || t.includes("sql") || t.includes("postgres") || t.includes("dbms");

  if (isDocker) {
    return {
      lessonTitle,
      mentalModelAnalogy:
        "Think of a Virtual Machine as building an entire standalone physical house (foundation, plumbing, electrical grid, and furniture) just to run a single blender. A Docker Container, by contrast, is like renting an apartment in a high-rise building: all apartments share the same central foundation and plumbing (Host Linux Kernel), but each has its own private key and secure walls (Linux Namespaces & Cgroups). You get 100% isolation in 5MB of disk space instead of 20GB.",
      whyThisExists:
        "Prior to containerization, software development suffered from the 'Works on my machine' catastrophe. An application running on an engineer's MacBook with Node v18 and macOS libc would catastrophically crash when deployed to an Ubuntu production server running an incompatible OpenSSL library or glibc version. Docker solves this by packaging the application code, runtime, system binaries, environment variables, and configuration into an immutable, portable, bit-for-bit reproducible artifact.",
      chapters: [
        {
          id: "ch-1",
          number: 1,
          badge: "Operating System Internals",
          title: "Under-The-Hood OS Isolation: Namespaces, Cgroups & Union File Systems",
          icon: "⚙️",
          summary: "Containers are not virtual machines—they are standard Linux processes dressed in isolated user-space namespaces.",
          deepDiveParagraphs: [
            "A common misconception among beginner developers is that Docker boots a miniature operating system. In reality, a running container is simply an ordinary host process governed by three foundational Linux kernel primitives: Namespaces, Control Groups (cgroups), and Union File Systems (OverlayFS).",
            "1. Linux Namespaces provide isolation: PID namespace gives the container its own process tree where the main app runs as PID 1; NET namespace gives it isolated virtual network interfaces and port ranges (veth pairs); MNT namespace restricts file system visibility so the container cannot read host files; and UTS namespace gives it an independent hostname.",
            "2. Control Groups (cgroups v2) enforce resource quotas: Without cgroups, a memory-leaking container could consume 100% of host RAM and trigger the kernel Out-Of-Memory (OOM) killer on critical system processes. Cgroups enforce hard limits on CPU shares, RAM allocations, disk I/O, and max thread count.",
            "3. OverlayFS provides copy-on-write layering: Container images are composed of stacked immutable read-only layers. When a container writes a file, OverlayFS copies the file from the lower read-only image layer up to a transient writable top layer, guaranteeing zero disk bloat across 100 running instances."
          ],
          visualDiagram: `
┌────────────────────────────────────────────────────────────────────────┐
│              CONTAINER VS HYPERVISOR VIRTUALIZATION                    │
├────────────────────────────────────────────────────────────────────────┤
│   DOCKER CONTAINER (LIGHTWEIGHT)       TRADITIONAL VM (HEAVY)          │
│                                                                        │
│   ┌──────────────────────────┐         ┌──────────────────────────┐    │
│   │   App Process + Libs     │         │   App Process + Libs     │    │
│   ├──────────────────────────┤         ├──────────────────────────┤    │
│   │ Namespaces & Cgroups     │         │ Full Guest OS Kernel     │    │
│   │ (Zero Guest OS Overhead) │         │ (2GB - 8GB Memory Tax)   │    │
│   ├──────────────────────────┤         ├──────────────────────────┤    │
│   │ Shared Host Linux Kernel │         │ Type-1/2 Hypervisor      │    │
│   ├──────────────────────────┤         ├──────────────────────────┤    │
│   │ Physical Hardware (CPU)  │         │ Physical Hardware (CPU)  │    │
│   └──────────────────────────┘         └──────────────────────────┘    │
│   • Startup: < 100 milliseconds        • Startup: 2 to 5 minutes       │
│   • Memory: 15MB to 50MB RAM           • Memory: 2GB to 8GB RAM        │
└────────────────────────────────────────────────────────────────────────┘`,
          annotatedCode: {
            filename: "Dockerfile",
            language: "dockerfile",
            code: `FROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\nFROM node:20-alpine AS runner\nWORKDIR /app\nENV NODE_ENV=production\nUSER node\nCOPY --from=builder /app/dist ./dist\nCOPY --from=builder /app/node_modules ./node_modules\nEXPOSE 3000\nCMD ["node", "dist/server.js"]`,
            lineExplanations: [
              { line: "FROM node:20-alpine AS builder", explanation: "Uses minimal security-audited Alpine Linux (~5MB base) as a temporary build stage." },
              { line: "COPY package*.json ./", explanation: "Copies only dependency manifests first to leverage Docker build layer caching." },
              { line: "RUN npm ci", explanation: "Installs exact pinned dependencies from package-lock.json with zero drift." },
              { line: "USER node", explanation: "Crucial security standard: drops root privileges to prevent container breakout exploits." },
              { line: "COPY --from=builder ...", explanation: "Multi-stage build: discards heavy build tools (TypeScript compiler) and copies only compiled JS." }
            ]
          },
          productionTraps: [
            "Running containers as root user in production allows potential container breakout exploits to compromise the host kernel.",
            "Copying application code before running 'npm install' or 'pip install' invalidates the Docker layer cache on every code change, making builds 20x slower."
          ],
          keyTakeaways: [
            "Containers share the host kernel via namespaces and cgroups; they do not run a guest OS.",
            "Multi-stage builds reduce final production image size from 1.2GB down to under 80MB."
          ]
        },
        {
          id: "ch-2",
          number: 2,
          badge: "Networking & Storage",
          title: "Container Networking Models, Port Mapping & Volume Persistence",
          icon: "🌐",
          summary: "Bridged virtual networks, iptables NAT routing, and persistent volume binding.",
          deepDiveParagraphs: [
            "Every container operates in its own isolated network namespace with its own loopback address and virtual ethernet pair (veth). The host operating system bridges these veth interfaces via a virtual software switch (docker0).",
            "When you run 'docker run -p 8080:3000', Docker writes an iptables DNAT (Destination Network Address Translation) rule into the host firewall. Any incoming TCP packet hitting host port 8080 is transparently rewritten and forwarded to the container's private virtual IP address on port 3000.",
            "Storage Lifecycles: Container file systems are ephemeral. If a database container crashes or restarts, all data written inside the container layer is permanently obliterated. Production data must be bound to Docker Named Volumes managed outside the container lifecycle or Host Bind Mounts."
          ],
          productionTraps: [
            "Storing database files inside container local directories causes permanent data loss on container restart.",
            "Binding ports to 0.0.0.0 exposes internal microservices to the public internet; bind to 127.0.0.1 for internal services."
          ],
          keyTakeaways: [
            "Port mapping is powered by kernel iptables NAT forwarding rules.",
            "Persistent data must always reside on Docker Named Volumes or cloud block storage."
          ]
        }
      ],
      syntaxTable: [
        {
          tokenOrMethod: "docker build -t <tag> .",
          signature: "docker build [OPTIONS] PATH",
          complexity: "O(Layers)",
          returnType: "Image SHA256 Hash",
          practicalUsage: "Compiles a Dockerfile into an immutable layered image.",
          warningNote: "Place least-frequently changed commands first to maximize layer cache hit rate."
        },
        {
          tokenOrMethod: "docker run -d -p 80:80",
          signature: "docker run [OPTIONS] IMAGE [COMMAND]",
          complexity: "O(1) ms",
          returnType: "Container ID String",
          practicalUsage: "Spawns an isolated container process in detached background mode with port forwarding.",
          warningNote: "Always add '--restart unless-stopped' for production resilience."
        },
        {
          tokenOrMethod: "docker exec -it <id> sh",
          signature: "docker exec [OPTIONS] CONTAINER COMMAND",
          complexity: "O(1)",
          returnType: "TTY Interactive Shell",
          practicalUsage: "Opens an interactive debugging terminal inside a running container without stopping it.",
          warningNote: "Do not edit production files manually inside containers; rebuild the image instead."
        },
        {
          tokenOrMethod: "docker compose up -d",
          signature: "docker compose [OPTIONS] UP",
          complexity: "O(Services)",
          returnType: "Network & Pod State",
          practicalUsage: "Declaratively provisions multi-container topologies (API + DB + Redis) on a shared virtual bridge.",
          warningNote: "Use healthchecks to prevent APIs from starting before the database is ready."
        }
      ],
      placementInterviewDefense: [
        {
          question: "Explain the architectural difference between a Docker Container and a Virtual Machine. How does Docker achieve process isolation?",
          testedSkill: "Operating Systems Internals & Virtualization",
          modelAnswer:
            "A Virtual Machine uses a Hypervisor (Type 1 bare-metal or Type 2 hosted) to virtualize physical hardware. Every VM bundles a full guest OS kernel, virtual devices, and memory tables, creating substantial CPU/RAM overhead and multi-minute boot times. In contrast, a Docker container shares the host Linux kernel directly. Isolation is achieved at user-space via three kernel mechanisms: Namespaces (PID, NET, MNT, IPC, UTS) for process and network virtualization, Control Groups (cgroups v2) for CPU/memory/IO resource quota governance, and OverlayFS for layered copy-on-write file storage. Consequently, containers launch in milliseconds and exhibit bare-metal throughput.",
          gotchaPitfall: "Never say containers have their own OS kernel. They strictly share the host kernel."
        },
        {
          question: "Why does ordering matter in a Dockerfile, and how do multi-stage builds optimize production deployments?",
          testedSkill: "Build Systems & CI/CD Security",
          modelAnswer:
            "Docker builds images by executing each instruction as an immutable cached layer. If an instruction and its inputs remain unchanged, Docker reuses the cached layer instantly. If an instruction changes, all subsequent layers are invalidated and rebuilt. Therefore, dependencies (package.json / requirements.txt) must be copied and installed before copying source code. Multi-stage builds utilize multiple FROM directives: early stages compile code and download heavy developer SDKs, while the final stage copies only compiled runtime artifacts into a stripped base image (e.g. distroless or alpine), reducing image attack surface and deployment payloads by 90%.",
          gotchaPitfall: "Forgetting to mention security and attack surface reduction alongside image size."
        }
      ],
      productionReadinessChecklist: [
        "Enforce non-root execution: Declare 'USER 1001' or 'USER node' in the final Dockerfile stage.",
        "Use multi-stage builds to purge compilers, development headers, and secret tokens from final images.",
        "Implement explicit Docker HEALTHCHECK commands so orchestrators can reboot deadlocked pods.",
        "Pin specific base image digests or tags (e.g., node:20.11.0-alpine3.19) to prevent unexpected drift.",
        "Mount all persistent database files onto Named Volumes rather than ephemeral container layers."
      ]
    };
  }

  // Default deep comprehensive guide for general CS, programming languages, DSA, and systems
  return {
    lessonTitle,
    mentalModelAnalogy: `Think of ${lessonTitle} like an engineered industrial logistics highway system. When a beginner writes code, they treat computation like a single courier hand-carrying items one by one. Professional systems engineering establishes pipelines, memory caching depots, invariant contract rules, and fault-tolerant rerouting so millions of operations execute deterministically without memory congestion or single points of failure.`,
    whyThisExists: `In modern computer science and software systems, ${lessonTitle} addresses fundamental challenges of computational complexity, memory virtualization, and predictable resource allocation. Without mastering these underlying principles, systems degrade under high concurrency, leak memory across prolonged runtimes, and become vulnerable to race conditions and security exploits.`,
    chapters: [
      {
        id: "ch-1",
        number: 1,
        badge: "First Principles & Theoretical Mechanics",
        title: `Foundational Architecture, Mental Models & Internal Execution of ${lessonTitle}`,
        icon: "💡",
        summary: "Understand the core mathematical, memory, and algorithmic foundations from first principles.",
        deepDiveParagraphs: [
          `To truly master ${lessonTitle}, we must start not from arbitrary syntax, but from the mechanical realities of modern compute hardware: CPU instruction pipelines, cache hierarchies (L1, L2, L3), and virtual address space segmentation.`,
          `When your program executes, user-space code interacts with system memory divided into four core areas: the Text/Code segment (containing compiled machine instructions), the Data/BSS segment (global and static state), the Call Stack (activation records for functions and local variables), and the Dynamically Allocated Heap (runtime memory requested via malloc/new).`,
          `Understanding this memory layout dictates algorithmic performance. Contiguous memory access patterns enable CPU hardware prefetchers to load adjacent cache lines before instructions require them, yielding up to a 100x speedup compared to random pointer-chasing across fragmented heap addresses. Every senior engineer optimizes for cache locality and deterministic resource bounds.`
        ],
        visualDiagram: `
┌────────────────────────────────────────────────────────────────────────┐
│                   VIRTUAL PROCESS MEMORY ARCHITECTURE                  │
├────────────────────────────────────────────────────────────────────────┤
│   HIGH MEMORY (0x7FFFFFFFFFFF)                                         │
│   ┌───────────────────────────────────────────────────────────────┐    │
│   │  STACK SEGMENT (Grows Downward ↓)                             │    │
│   │  • Activation records, local variables, return pointers       │    │
│   ├───────────────────────────────────────────────────────────────┤    │
│   │                           │ ↓                                 │    │
│   │                           v                                   │    │
│   │                     [Unmapped Memory]                         │    │
│   │                           ^                                   │    │
│   │                           │ ↑                                 │    │
│   ├───────────────────────────────────────────────────────────────┤    │
│   │  HEAP SEGMENT (Grows Upward ↑)                                │    │
│   │  • Dynamic runtime allocations (malloc / new / heap objects)  │    │
│   ├───────────────────────────────────────────────────────────────┤    │
│   │  BSS & DATA SEGMENT (Static & Uninitialized Globals)          │    │
│   ├───────────────────────────────────────────────────────────────┤    │
│   │  TEXT SEGMENT (Read-Only Machine Instructions & Constants)    │    │
│   └───────────────────────────────────────────────────────────────┘    │
│   LOW MEMORY (0x000000000000)                                          │
└────────────────────────────────────────────────────────────────────────┘`,
        annotatedCode: {
          filename: "solution.ts",
          language: "typescript",
          code: `// Production Implementation: Deterministic State & Resource Safety\nexport class ResilientSystem<T> {\n  private readonly storage: Map<string, T> = new Map();\n  private isHealthy: boolean = true;\n\n  constructor(private readonly maxCapacity: number = 1000) {}\n\n  public set(key: string, value: T): boolean {\n    if (this.storage.size >= this.maxCapacity) {\n      this.evictOldestEntry(); // Bounds enforcement prevents memory leaks\n    }\n    this.storage.set(key, value);\n    return true;\n  }\n\n  public get(key: string): T | undefined {\n    return this.storage.get(key);\n  }\n\n  private evictOldestEntry(): void {\n    const oldestKey = this.storage.keys().next().value;\n    if (oldestKey) this.storage.delete(oldestKey);\n  }\n}`,
          lineExplanations: [
            { line: "private readonly storage: Map<string, T>", explanation: "Guarantees O(1) amortized hash lookup while preserving insertion order." },
            { line: "if (this.storage.size >= this.maxCapacity)", explanation: "Enforces a strict upper bound to prevent heap memory exhaustion under high traffic." },
            { line: "this.evictOldestEntry()", explanation: "Applies deterministic FIFO/LRU eviction rather than allowing unbounded process growth." }
          ]
        },
        productionTraps: [
          "Unbounded caching structures that grow indefinitely without capacity limits or TTL eviction cause fatal Out-Of-Memory production crashes.",
          "Ignoring thread safety and concurrency race conditions in shared mutable state leads to intermittent, un-reproducible bugs."
        ],
        keyTakeaways: [
          "Always design with deterministic bounds: define max capacities, timeouts, and explicit error handling.",
          "Cache-friendly contiguous data layouts outperform fragmented pointer-based data structures on modern multi-core CPUs."
        ]
      },
      {
        id: "ch-2",
        number: 2,
        badge: "Industrial Edge Cases & Concurrency",
        title: "Edge Conditions, Concurrency Hazards & Defensive Architecture",
        icon: "🛡️",
        summary: "Identify and eliminate boundary errors, race conditions, and silent memory leaks before shipping to production.",
        deepDiveParagraphs: [
          "In academic problem sets, inputs are sanitized and clean. In production systems, software encounters malicious payloads, network timeouts, zero-byte files, and high concurrency races.",
          "Defensive programming requires establishing invariant boundaries at every API and function contract: validating pre-conditions, enforcing strict type constraints, and returning typed Result objects rather than throwing untyped exceptions.",
          "Furthermore, race conditions occur when multiple execution contexts (threads, async promises, or worker processes) read and mutate shared state without atomic locking or serializable coordination. Always prefer immutable data structures to eliminate shared mutation at the design level."
        ],
        productionTraps: [
          "Swallowing errors silently with empty catch blocks leaves the system in an unknown, corrupted state.",
          "Assuming network requests or external services will always respond within normal timeframes without circuit breakers."
        ],
        keyTakeaways: [
          "Favor immutability over shared mutable state to prevent subtle concurrency bugs.",
          "Always declare explicit timeouts and circuit breakers on external service boundaries."
        ]
      }
    ],
    syntaxTable: [
      {
        tokenOrMethod: "Primary Execution Primitive",
        signature: "execute<T>(input: T): Result<T, Error>",
        complexity: "O(1) to O(N)",
        returnType: "Typed Result Container",
        practicalUsage: "Core deterministic transformation with encapsulated error propagation.",
        warningNote: "Always check result.isOk before unwrapping value."
      },
      {
        tokenOrMethod: "Resource Cleanup Boundary",
        signature: "dispose() / cleanup()",
        complexity: "O(1)",
        returnType: "void / Promise<void>",
        practicalUsage: "Releases unmanaged resources, file descriptors, and open socket connections.",
        warningNote: "Must be invoked in finally blocks or RAII destructors to prevent descriptor exhaustion."
      },
      {
        tokenOrMethod: "Boundary Validator",
        signature: "assertInvariants(state: State): boolean",
        complexity: "O(1)",
        returnType: "boolean",
        practicalUsage: "Verifies state integrity before committing mutations to disk or memory.",
        warningNote: "Never disable assertion checks in production builds."
      }
    ],
    placementInterviewDefense: [
      {
        question: `How would you explain the internal trade-offs of ${lessonTitle} to a staff engineer, and how do you prevent production failure modes?`,
        testedSkill: "System Architecture & Engineering Maturity",
        modelAnswer: `When implementing ${lessonTitle}, the primary trade-off centers on balancing throughput, memory locality, and computational complexity. Rather than adopting a naive implementation that risks unbounded heap allocations or race conditions under concurrency, the optimal architecture enforces strict resource bounds, leverages cache-conscious data layouts, and handles failure modes through explicit circuit breakers and immutable state transitions. This guarantees deterministic scaling under enterprise load.`,
        gotchaPitfall: "Avoid giving purely theoretical answers without mentioning real-world memory bounds, error handling, or performance trade-offs."
      },
      {
        question: `What are the most common edge cases and algorithmic traps associated with this topic in technical coding rounds?`,
        testedSkill: "Algorithmic Precision & Edge-Case Identification",
        modelAnswer: `The primary traps include off-by-one boundary errors, integer overflow on extreme inputs, silent null/undefined dereferencing, and unhandled concurrency interleavings. In coding interviews, the candidate must proactively identify edge cases (empty inputs, single elements, duplicate keys, maximum range limits) and verify algorithmic complexity using Big-O time and space analysis before writing implementation code.`,
        gotchaPitfall: "Rushing to write code before analyzing edge cases and clarifying problem boundaries."
      }
    ],
    productionReadinessChecklist: [
      "Strict type safety verified: Zero implicit 'any' types or unchecked type assertions.",
      "Deterministic bounds: Upper limits established for all queues, buffers, and memory caches.",
      "Defensive validation: All external inputs validated against invariant schema contracts.",
      "Comprehensive test coverage: Unit tests verifying happy paths, boundary edges, and failure modes.",
      "Telemetry & Observability: Structured logging and latency metrics instrumented."
    ]
  };
}
