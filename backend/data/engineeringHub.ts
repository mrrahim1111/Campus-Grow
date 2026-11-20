// CampusGrow Complete Engineering Knowledge Hub
// 15 Comprehensive Learning Domains spanning modern engineering education

export type DifficultyLevel = "Beginner" | "Intermediate" | "Advanced";

export interface HubLesson {
  id: string; // slug e.g. "c-pointers-deep-dive"
  title: string;
  order: number;
  duration: string; // e.g. "45 min interactive sprint"
  difficulty: DifficultyLevel;
  learningObjectives: string[];
  youtubeUrl?: string; // YouTube video URL (valid full class video, or undefined if pending)
  youtubeEmbedId?: string; // e.g. "kJ8hZ2j7Z_o"
  pdfNotesUrl?: string; // Downloadable PDF notes URL or static reference
  overview: string; // 2-3 detailed paragraphs with deep technical explanation
  keyConcepts: { title: string; explanation: string }[];
  practicalExamples: { title: string; scenario: string; takeaway: string }[];
  codeSamples?: { language: string; filename?: string; code: string; explanation: string }[];
  practiceQuestions: string[];
  mcqQuestions: {
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
  assignment: {
    title: string;
    description: string;
    deliverables: string[];
    verificationCriteria?: string;
  };
  prerequisites?: string[];
  tags?: string[];
  isPublished?: boolean;
}

export interface HubModule {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: HubLesson[];
}

export interface HubCourse {
  id: string; // slug e.g. "go-systems-programming"
  title: string;
  subtitle: string;
  description: string;
  domainId: string;
  icon: string;
  difficulty: DifficultyLevel;
  durationHours: number;
  duration?: string;
  technologies: string[]; // e.g. ["Go", "Concurrency", "Goroutines", "gRPC"]
  careerTags: string[]; // e.g. ["Backend Engineer", "Cloud Engineer"]
  targetBranches?: string[]; // e.g. ["CSE", "IT", "CAI", "AID", "CSM", "CSD", "CYS", "SE", "DS", "IOT"]
  image: string;
  modules: HubModule[];
  isPublished: boolean;
  featured?: boolean;
}

export interface HubDomain {
  id: string; // slug e.g. "programming-languages"
  number: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  badge: string;
  color: string;
  technologies: string[];
  courses: HubCourse[];
}

// ─────────────────────────────────────────────────────────────────────────────
// 15 MAJOR LEARNING DOMAINS DATA ENGINE
// ─────────────────────────────────────────────────────────────────────────────

export const ENGINEERING_DOMAINS: HubDomain[] = [
  // 1. Programming Languages
  {
    id: "programming-languages",
    number: 1,
    title: "Programming Languages",
    subtitle: "From Low-Level Systems to Modern High-Throughput Languages",
    description: "Master modern programming paradigms across C, C++, Python, Java, TypeScript, Go, Rust, Kotlin, Dart, and SQL with deep memory intuition and architectural patterns.",
    icon: "💻",
    badge: "Core Foundation",
    color: "from-emerald-600 to-teal-700",
    technologies: ["C", "C++", "Python", "Java", "TypeScript", "Go", "Rust", "Kotlin", "Dart", "SQL", "R"],
    courses: [
      {
        id: "c-cpp-systems-mastery",
        title: "C & Modern C++ Systems Engineering",
        subtitle: "Memory pointers, heap allocation, RAII, and cache-friendly systems",
        description: "Explore computer architecture, stack frames, heap fragmentation, manual memory safety, smart pointers, and concurrency in modern C++20.",
        domainId: "programming-languages",
        icon: "⚡",
        difficulty: "Intermediate",
        durationHours: 35,
        technologies: ["C", "C++20", "Pointers", "Virtual Memory", "Valgrind", "Makefiles"],
        careerTags: ["Systems Engineer", "Kernel Developer", "Embedded Engineer", "Quantitative Developer"],
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
        featured: true,
        isPublished: true,
        modules: [
          {
            id: "c-mem-01",
            title: "Memory Models & Hardware Interaction",
            description: "Virtual address spaces, stack frames, heap allocation, and memory leaks.",
            order: 1,
            lessons: [
              {
                id: "c-pointers-and-memory-virtualization",
                title: "Pointers, Memory Virtualization & Address Arithmetic",
                order: 1,
                duration: "40 min interactive sprint",
                difficulty: "Intermediate",
                learningObjectives: [
                  "Understand virtual vs physical memory addressing in modern operating systems.",
                  "Master pointer dereferencing, multi-level pointers, and pointer arithmetic.",
                  "Inspect heap memory structures and eliminate segmentation faults using debugging tools."
                ],
                youtubeUrl: "https://www.youtube.com/watch?v=zuegQmMdy8M",
                youtubeEmbedId: "zuegQmMdy8M",
                pdfNotesUrl: "/notes/c-pointers-memory.pdf",
                overview: `In computer programming, a pointer is not an abstract reference—it is a numerical variable that stores the physical or virtual memory address of another object. On modern 64-bit operating systems, every user-space process executes inside a virtual address space mapped to physical RAM via Page Tables and the CPU's Memory Management Unit (MMU).

When an application invokes malloc() or calloc(), the operating system does not immediately assign physical silicon pins; instead, it reserves a contiguous slice of virtual addresses within the process heap segment. Dereferencing an unmapped address or accessing memory beyond allocated bounds triggers a hardware fault (SIGSEGV), terminating the process immediately.

Understanding how pointers interact with cache lines (typically 64 bytes on modern x86-64 and ARM processors) is what separates junior coders from systems engineers. Accessing contiguous array items allows the CPU hardware prefetcher to load adjacent data into L1/L2 caches before instructions even demand it, yielding a 100x performance difference compared to fragmented pointer-chasing across random heap nodes.`,
                keyConcepts: [
                  {
                    title: "Virtual Address Translation",
                    explanation: "Every pointer holds a virtual 64-bit hexadecimal address that the MMU translates into physical DRAM addresses using multi-level page tables."
                  },
                  {
                    title: "Cache Locality & Spatial Coherence",
                    explanation: "Array memory is sequential, allowing single 64-byte CPU cache lines to load multiple elements simultaneously, whereas scattered linked nodes trigger frequent cache misses."
                  },
                  {
                    title: "Memory Leak Prevention",
                    explanation: "Every dynamic memory allocation (malloc, calloc, realloc) must have a corresponding free() invocation on all execution and error return paths."
                  }
                ],
                practicalExamples: [
                  {
                    title: "Linux Kernel Buffer Allocation",
                    scenario: "Network socket device drivers allocate socket buffers (sk_buff) dynamically to stream packet bytes directly into user-space without redundant data copying.",
                    takeaway: "Direct memory mapping and DMA (Direct Memory Access) maximize throughput by avoiding CPU context copy overhead."
                  }
                ],
                codeSamples: [
                  {
                    language: "c",
                    filename: "virtual_memory_demo.c",
                    code: `#include <stdio.h>
#include <stdlib.h>

void inspect_address(void* ptr, const char* label) {
    printf("%-20s -> Virtual Address: %p\\n", label, ptr);
}

int main() {
    int stack_var = 42;
    int* heap_buffer = (int*)malloc(sizeof(int) * 8);

    if (!heap_buffer) {
        perror("Allocation failed");
        return 1;
    }

    inspect_address(&stack_var, "Stack Variable");
    inspect_address(heap_buffer, "Heap Allocated Buffer");
    inspect_address(main, "Text/Code Segment");

    // Populate buffer sequentially
    for (int i = 0; i < 8; i++) {
        *(heap_buffer + i) = (i + 1) * 10;
    }

    // Always free dynamic allocations
    free(heap_buffer);
    heap_buffer = NULL; // Prevent dangling pointer

    return 0;
}`,
                    explanation: "Notice how stack variables hold high addresses (0x7fff...), heap holds middle addresses (0x55...), and code segments hold lower addresses (0x40...), demonstrating the memory layout of an ELF binary."
                  }
                ],
                practiceQuestions: [
                  "Explain what happens to the virtual address space when a process executes fork() in Unix.",
                  "Why does pointer subtraction (ptr2 - ptr1) return the count of elements rather than the byte difference?"
                ],
                mcqQuestions: [
                  {
                    id: "c-ptr-q1",
                    question: "On a 64-bit architecture, what is the exact memory size of a pointer variable regardless of the type it points to?",
                    options: ["4 bytes", "8 bytes", "16 bytes", "Depends on pointed datatype"],
                    correctIndex: 1,
                    explanation: "On 64-bit architectures, all pointers store a 64-bit address, occupying exactly 8 bytes in memory regardless of whether they point to a char, int, or 1000-byte struct."
                  },
                  {
                    id: "c-ptr-q2",
                    question: "What hardware component translates virtual pointer addresses into physical RAM locations?",
                    options: ["ALU (Arithmetic Logic Unit)", "MMU (Memory Management Unit)", "Instruction Register", "L3 Cache Controller"],
                    correctIndex: 1,
                    explanation: "The Memory Management Unit (MMU) uses page tables maintained by the kernel to translate virtual addresses into physical RAM frames on the fly."
                  }
                ],
                assignment: {
                  title: "Implement a Safe Dynamic Vector in C",
                  description: "Construct a dynamic integer vector struct that doubles its capacity using realloc() when full, tracks memory allocations, and guarantees zero memory leaks under Valgrind.",
                  deliverables: ["vector.c implementation", "vector.h interface with vector_push, vector_get, vector_free", "Valgrind clean execution log"],
                  verificationCriteria: "Passes all test suite edge cases with 0 errors and 0 leaks verified via valgrind --leak-check=full."
                },
                tags: ["C", "Memory", "Pointers", "Systems"],
                isPublished: true
              }
            ]
          }
        ]
      },
      {
        id: "rust-systems-concurrency",
        title: "Rust: Safe Systems Programming & Concurrency",
        subtitle: "Zero-cost abstractions, borrow checker, and fear-free concurrency",
        description: "Harness memory safety without garbage collection, master ownership and borrowing mechanics, build multithreaded actors, and author high-performance systems utilities.",
        domainId: "programming-languages",
        icon: "🦀",
        difficulty: "Advanced",
        durationHours: 30,
        technologies: ["Rust", "Cargo", "Ownership & Borrowing", "Rayon", "Tokio Async", "Traits"],
        careerTags: ["Rust Engineer", "Blockchain Developer", "Systems Architect", "Cloud Security Engineer"],
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
        featured: true,
        isPublished: true,
        modules: [
          {
            id: "ai-tools-mod-01",
            title: "AI Developer Tooling & Velocity Workflows",
            description: "Cursor IDE, AI Codebase Indexing, Prompt Architectures, and Automated Unit Tests.",
            order: 1,
            lessons: [
              {
                id: "ai-tools-cursor-workflow",
                title: "Cursor AI IDE: Multi-File Edits, Codebase Indexing & .cursorrules",
                order: 1,
                duration: "40 min interactive sprint",
                difficulty: "Beginner",
                learningObjectives: [
                  "Understand how AI code editors build semantic vector indexes over your repository.",
                  "Master Composer (Cmd+I) and inline diff generation (Cmd+K) without introducing subtle bugs.",
                  "Enforce engineering standards and prevent hallucinations using strict .cursorrules and system instructions."
                ],
                overview: `Artificial Intelligence has transformed software engineering from manual syntax typing into high-leverage architectural orchestration. Modern AI-native IDEs like Cursor index your entire repository into a local semantic vector database. When you query the model using @codebase or ask for multi-file refactors, the IDE retrieves only the most relevant AST (Abstract Syntax Tree) slices, symbol declarations, and dependency trees to build a pinpoint context window for frontier models such as Claude 3.5 Sonnet.

However, unchecked reliance on AI code generators produces insidious architectural debt: hallucinations, ghost dependencies, security vulnerabilities, and brittle unmaintainable spaghetti code. Professional software engineers do not use AI as a replacement for thinking; they use it as an ultra-fast junior developer that must be strictly bounded.

By authoring explicit project rule files (such as .cursorrules or AGENTS.md), you define project invariants: language versions, mandatory typing conventions, forbidden dependencies, and directory structures. Furthermore, pairing AI code generation with immediate terminal test execution creates a self-healing development loop that increases velocity while preserving production safety.`,
                keyConcepts: [
                  {
                    title: "Codebase Semantic Indexing",
                    explanation: "Code files are parsed into semantic chunks and embedded into high-dimensional vectors, allowing natural language search over entire codebases."
                  },
                  {
                    title: "Prompt Architectures & Invariant Rules",
                    explanation: ".cursorrules and project system prompts act as guardrails, forcing the LLM to follow existing patterns and type signatures."
                  },
                  {
                    title: "Self-Healing Test Driven Loops",
                    explanation: "Directly piping compiler stderr and unit test failures back into the model context window allows it to resolve syntax and logic errors in seconds."
                  }
                ],
                practicalExamples: [
                  {
                    title: "Multi-File Authentication Refactor",
                    scenario: "Refactoring a Next.js App Router codebase from legacy cookie sessions to Supabase SSR JWT auth across 8 files simultaneously.",
                    takeaway: "Using Cursor Composer with explicit file mentions guarantees consistent imports and type signatures across routes and middleware."
                  },
                  {
                    title: "Automated Edge-Case Test Generation",
                    scenario: "Generating comprehensive Jest/Vitest test suites for a complex financial calculation function with negative inputs and floating point boundaries.",
                    takeaway: "AI excels at generating boundary condition tests that human engineers often overlook due to confirmation bias."
                  }
                ],
                codeSamples: [
                  {
                    language: "json",
                    filename: ".cursorrules",
                    code: `{\n  "version": "1.0",\n  "project": "CampusGrow Core",\n  "rules": [\n    "Strict TypeScript only with zero 'any' types.",\n    "Never install new npm packages without explicit permission.",\n    "Always use Tailwind CSS utility tokens matching emerald/mint palette.",\n    "Run 'npm run test' to verify all logic changes before outputting final diffs."\n  ]\n}`,
                    explanation: "Declarative project boundary file that ensures the AI assistant complies with team coding standards."
                  }
                ],
                practiceQuestions: [
                  "Why does full-repository vector indexing perform better than blind file copy-pasting into web chats?",
                  "What security risks arise when pasting proprietary codebase snippets into third-party cloud LLM providers?",
                  "How do .cursorrules enforce project invariants across large engineering teams?"
                ],
                mcqQuestions: [
                  {
                    id: "ai-q1",
                    question: "How does Cursor IDE's @codebase feature determine which files to include in the model context window?",
                    options: [
                      "It blindly sends all files in the directory regardless of size",
                      "It uses semantic vector search and AST symbol graphs to retrieve only relevant code slices",
                      "It only looks at the currently open active tab in the editor",
                      "It runs an external Google web search on the repository name"
                    ],
                    correctIndex: 1,
                    explanation: "Cursor uses embeddings and local vector indexes to perform semantic retrieval over your repository, pulling only high-relevance code chunks into the prompt."
                  },
                  {
                    id: "ai-q2",
                    question: "What is the primary danger of blindly accepting multi-file AI code generation without reading the diff?",
                    options: [
                      "The compiler will refuse to compile any AI generated code",
                      "The AI may hallucinate non-existent package methods or introduce silent race conditions and security vulnerabilities",
                      "The code editor automatically deletes your git repository",
                      "AI code generation runs 100x slower than typing by hand"
                    ],
                    correctIndex: 1,
                    explanation: "LLMs generate plausible token sequences that may appear syntactically correct while introducing subtle logic bugs, unvalidated inputs, or hallucinated APIs."
                  }
                ],
                assignment: {
                  title: "Author Production .cursorrules & Refactor Code",
                  description: "Create a production .cursorrules file for a TypeScript project, configure strict type rules, and prompt Cursor Composer to refactor a messy module with 100% test coverage.",
                  deliverables: [
                    "A validated .cursorrules configuration file",
                    "Git diff demonstrating multi-file refactoring with zero compiler warnings",
                    "A test suite passing with deterministic exit code 0"
                  ]
                }
              }
            ]
          }
        ]
      },
      {
        id: "go-distributed-backends",
        title: "Go: High-Throughput Concurrent Backends",
        subtitle: "Goroutines, channels, gRPC, and microservice architectures",
        description: "Learn why cloud-native infrastructure runs on Go. Build high-concurrency microservices, network proxies, thread pools, and production REST/gRPC endpoints.",
        domainId: "programming-languages",
        icon: "🐹",
        difficulty: "Intermediate",
        durationHours: 25,
        technologies: ["Go", "Goroutines", "Channels", "gRPC", "Docker", "Standard Library"],
        careerTags: ["Go Developer", "Backend Engineer", "DevOps Engineer", "Cloud Engineer"],
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
        featured: false,
        isPublished: true,
        modules: [
          {
            id: "ai-tools-mod-01",
            title: "AI Developer Tooling & Velocity Workflows",
            description: "Cursor IDE, AI Codebase Indexing, Prompt Architectures, and Automated Unit Tests.",
            order: 1,
            lessons: [
              {
                id: "ai-tools-cursor-workflow",
                title: "Cursor AI IDE: Multi-File Edits, Codebase Indexing & .cursorrules",
                order: 1,
                duration: "40 min interactive sprint",
                difficulty: "Beginner",
                learningObjectives: [
                  "Understand how AI code editors build semantic vector indexes over your repository.",
                  "Master Composer (Cmd+I) and inline diff generation (Cmd+K) without introducing subtle bugs.",
                  "Enforce engineering standards and prevent hallucinations using strict .cursorrules and system instructions."
                ],
                overview: `Artificial Intelligence has transformed software engineering from manual syntax typing into high-leverage architectural orchestration. Modern AI-native IDEs like Cursor index your entire repository into a local semantic vector database. When you query the model using @codebase or ask for multi-file refactors, the IDE retrieves only the most relevant AST (Abstract Syntax Tree) slices, symbol declarations, and dependency trees to build a pinpoint context window for frontier models such as Claude 3.5 Sonnet.

However, unchecked reliance on AI code generators produces insidious architectural debt: hallucinations, ghost dependencies, security vulnerabilities, and brittle unmaintainable spaghetti code. Professional software engineers do not use AI as a replacement for thinking; they use it as an ultra-fast junior developer that must be strictly bounded.

By authoring explicit project rule files (such as .cursorrules or AGENTS.md), you define project invariants: language versions, mandatory typing conventions, forbidden dependencies, and directory structures. Furthermore, pairing AI code generation with immediate terminal test execution creates a self-healing development loop that increases velocity while preserving production safety.`,
                keyConcepts: [
                  {
                    title: "Codebase Semantic Indexing",
                    explanation: "Code files are parsed into semantic chunks and embedded into high-dimensional vectors, allowing natural language search over entire codebases."
                  },
                  {
                    title: "Prompt Architectures & Invariant Rules",
                    explanation: ".cursorrules and project system prompts act as guardrails, forcing the LLM to follow existing patterns and type signatures."
                  },
                  {
                    title: "Self-Healing Test Driven Loops",
                    explanation: "Directly piping compiler stderr and unit test failures back into the model context window allows it to resolve syntax and logic errors in seconds."
                  }
                ],
                practicalExamples: [
                  {
                    title: "Multi-File Authentication Refactor",
                    scenario: "Refactoring a Next.js App Router codebase from legacy cookie sessions to Supabase SSR JWT auth across 8 files simultaneously.",
                    takeaway: "Using Cursor Composer with explicit file mentions guarantees consistent imports and type signatures across routes and middleware."
                  },
                  {
                    title: "Automated Edge-Case Test Generation",
                    scenario: "Generating comprehensive Jest/Vitest test suites for a complex financial calculation function with negative inputs and floating point boundaries.",
                    takeaway: "AI excels at generating boundary condition tests that human engineers often overlook due to confirmation bias."
                  }
                ],
                codeSamples: [
                  {
                    language: "json",
                    filename: ".cursorrules",
                    code: `{\n  "version": "1.0",\n  "project": "CampusGrow Core",\n  "rules": [\n    "Strict TypeScript only with zero 'any' types.",\n    "Never install new npm packages without explicit permission.",\n    "Always use Tailwind CSS utility tokens matching emerald/mint palette.",\n    "Run 'npm run test' to verify all logic changes before outputting final diffs."\n  ]\n}`,
                    explanation: "Declarative project boundary file that ensures the AI assistant complies with team coding standards."
                  }
                ],
                practiceQuestions: [
                  "Why does full-repository vector indexing perform better than blind file copy-pasting into web chats?",
                  "What security risks arise when pasting proprietary codebase snippets into third-party cloud LLM providers?",
                  "How do .cursorrules enforce project invariants across large engineering teams?"
                ],
                mcqQuestions: [
                  {
                    id: "ai-q1",
                    question: "How does Cursor IDE's @codebase feature determine which files to include in the model context window?",
                    options: [
                      "It blindly sends all files in the directory regardless of size",
                      "It uses semantic vector search and AST symbol graphs to retrieve only relevant code slices",
                      "It only looks at the currently open active tab in the editor",
                      "It runs an external Google web search on the repository name"
                    ],
                    correctIndex: 1,
                    explanation: "Cursor uses embeddings and local vector indexes to perform semantic retrieval over your repository, pulling only high-relevance code chunks into the prompt."
                  },
                  {
                    id: "ai-q2",
                    question: "What is the primary danger of blindly accepting multi-file AI code generation without reading the diff?",
                    options: [
                      "The compiler will refuse to compile any AI generated code",
                      "The AI may hallucinate non-existent package methods or introduce silent race conditions and security vulnerabilities",
                      "The code editor automatically deletes your git repository",
                      "AI code generation runs 100x slower than typing by hand"
                    ],
                    correctIndex: 1,
                    explanation: "LLMs generate plausible token sequences that may appear syntactically correct while introducing subtle logic bugs, unvalidated inputs, or hallucinated APIs."
                  }
                ],
                assignment: {
                  title: "Author Production .cursorrules & Refactor Code",
                  description: "Create a production .cursorrules file for a TypeScript project, configure strict type rules, and prompt Cursor Composer to refactor a messy module with 100% test coverage.",
                  deliverables: [
                    "A validated .cursorrules configuration file",
                    "Git diff demonstrating multi-file refactoring with zero compiler warnings",
                    "A test suite passing with deterministic exit code 0"
                  ]
                }
              }
            ]
          }
        ]
      },
      {
        id: "python-advanced-engineering",
        title: "Python 3: Advanced Architecture & AsyncIO",
        subtitle: "Metaprogramming, generators, concurrency, and high-performance C-extensions",
        description: "Transition from basic Python scripts to production-grade engineering: descriptors, async/await event loops, memory profiling with cProfile, and high-performance extensions.",
        domainId: "programming-languages",
        icon: "🐍",
        difficulty: "Intermediate",
        durationHours: 25,
        technologies: ["Python 3", "AsyncIO", "Typing", "Generators", "Pytest", "Profiling"],
        careerTags: ["Python Engineer", "Data Engineer", "Backend Developer", "AI Engineer"],
        image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=600&q=80",
        featured: false,
        isPublished: true,
        modules: [
          {
            id: "ai-tools-mod-01",
            title: "AI Developer Tooling & Velocity Workflows",
            description: "Cursor IDE, AI Codebase Indexing, Prompt Architectures, and Automated Unit Tests.",
            order: 1,
            lessons: [
              {
                id: "ai-tools-cursor-workflow",
                title: "Cursor AI IDE: Multi-File Edits, Codebase Indexing & .cursorrules",
                order: 1,
                duration: "40 min interactive sprint",
                difficulty: "Beginner",
                learningObjectives: [
                  "Understand how AI code editors build semantic vector indexes over your repository.",
                  "Master Composer (Cmd+I) and inline diff generation (Cmd+K) without introducing subtle bugs.",
                  "Enforce engineering standards and prevent hallucinations using strict .cursorrules and system instructions."
                ],
                overview: `Artificial Intelligence has transformed software engineering from manual syntax typing into high-leverage architectural orchestration. Modern AI-native IDEs like Cursor index your entire repository into a local semantic vector database. When you query the model using @codebase or ask for multi-file refactors, the IDE retrieves only the most relevant AST (Abstract Syntax Tree) slices, symbol declarations, and dependency trees to build a pinpoint context window for frontier models such as Claude 3.5 Sonnet.

However, unchecked reliance on AI code generators produces insidious architectural debt: hallucinations, ghost dependencies, security vulnerabilities, and brittle unmaintainable spaghetti code. Professional software engineers do not use AI as a replacement for thinking; they use it as an ultra-fast junior developer that must be strictly bounded.

By authoring explicit project rule files (such as .cursorrules or AGENTS.md), you define project invariants: language versions, mandatory typing conventions, forbidden dependencies, and directory structures. Furthermore, pairing AI code generation with immediate terminal test execution creates a self-healing development loop that increases velocity while preserving production safety.`,
                keyConcepts: [
                  {
                    title: "Codebase Semantic Indexing",
                    explanation: "Code files are parsed into semantic chunks and embedded into high-dimensional vectors, allowing natural language search over entire codebases."
                  },
                  {
                    title: "Prompt Architectures & Invariant Rules",
                    explanation: ".cursorrules and project system prompts act as guardrails, forcing the LLM to follow existing patterns and type signatures."
                  },
                  {
                    title: "Self-Healing Test Driven Loops",
                    explanation: "Directly piping compiler stderr and unit test failures back into the model context window allows it to resolve syntax and logic errors in seconds."
                  }
                ],
                practicalExamples: [
                  {
                    title: "Multi-File Authentication Refactor",
                    scenario: "Refactoring a Next.js App Router codebase from legacy cookie sessions to Supabase SSR JWT auth across 8 files simultaneously.",
                    takeaway: "Using Cursor Composer with explicit file mentions guarantees consistent imports and type signatures across routes and middleware."
                  },
                  {
                    title: "Automated Edge-Case Test Generation",
                    scenario: "Generating comprehensive Jest/Vitest test suites for a complex financial calculation function with negative inputs and floating point boundaries.",
                    takeaway: "AI excels at generating boundary condition tests that human engineers often overlook due to confirmation bias."
                  }
                ],
                codeSamples: [
                  {
                    language: "json",
                    filename: ".cursorrules",
                    code: `{\n  "version": "1.0",\n  "project": "CampusGrow Core",\n  "rules": [\n    "Strict TypeScript only with zero 'any' types.",\n    "Never install new npm packages without explicit permission.",\n    "Always use Tailwind CSS utility tokens matching emerald/mint palette.",\n    "Run 'npm run test' to verify all logic changes before outputting final diffs."\n  ]\n}`,
                    explanation: "Declarative project boundary file that ensures the AI assistant complies with team coding standards."
                  }
                ],
                practiceQuestions: [
                  "Why does full-repository vector indexing perform better than blind file copy-pasting into web chats?",
                  "What security risks arise when pasting proprietary codebase snippets into third-party cloud LLM providers?",
                  "How do .cursorrules enforce project invariants across large engineering teams?"
                ],
                mcqQuestions: [
                  {
                    id: "ai-q1",
                    question: "How does Cursor IDE's @codebase feature determine which files to include in the model context window?",
                    options: [
                      "It blindly sends all files in the directory regardless of size",
                      "It uses semantic vector search and AST symbol graphs to retrieve only relevant code slices",
                      "It only looks at the currently open active tab in the editor",
                      "It runs an external Google web search on the repository name"
                    ],
                    correctIndex: 1,
                    explanation: "Cursor uses embeddings and local vector indexes to perform semantic retrieval over your repository, pulling only high-relevance code chunks into the prompt."
                  },
                  {
                    id: "ai-q2",
                    question: "What is the primary danger of blindly accepting multi-file AI code generation without reading the diff?",
                    options: [
                      "The compiler will refuse to compile any AI generated code",
                      "The AI may hallucinate non-existent package methods or introduce silent race conditions and security vulnerabilities",
                      "The code editor automatically deletes your git repository",
                      "AI code generation runs 100x slower than typing by hand"
                    ],
                    correctIndex: 1,
                    explanation: "LLMs generate plausible token sequences that may appear syntactically correct while introducing subtle logic bugs, unvalidated inputs, or hallucinated APIs."
                  }
                ],
                assignment: {
                  title: "Author Production .cursorrules & Refactor Code",
                  description: "Create a production .cursorrules file for a TypeScript project, configure strict type rules, and prompt Cursor Composer to refactor a messy module with 100% test coverage.",
                  deliverables: [
                    "A validated .cursorrules configuration file",
                    "Git diff demonstrating multi-file refactoring with zero compiler warnings",
                    "A test suite passing with deterministic exit code 0"
                  ]
                }
              }
            ]
          }
        ]
      }
    ]
  },

  // 2. Computer Science Fundamentals
  {
    id: "cs-fundamentals",
    number: 2,
    title: "Computer Science Fundamentals",
    subtitle: "The Timeless Core of Software Engineering",
    description: "Deep dive into Data Structures, Algorithmic Analysis, Operating Systems, Kernel Concurrency, Computer Networks, and Database Storage Engines.",
    icon: "🧠",
    badge: "Core Science",
    color: "from-blue-600 to-indigo-700",
    technologies: ["Data Structures", "Algorithms", "Operating Systems", "Computer Networks", "DBMS Internals", "Computer Architecture"],
    courses: [
      {
        id: "dsa-interview-mastery",
        title: "Data Structures & Algorithmic Problem Solving",
        subtitle: "Trees, graphs, dynamic programming, heaps, and asymptotic optimization",
        description: "Master first-principles algorithmic problem solving. Understand when to use red-black trees over hash maps, Dijkstra vs A*, and memoization vs bottom-up DP.",
        domainId: "cs-fundamentals",
        icon: "🌲",
        difficulty: "Intermediate",
        durationHours: 45,
        technologies: ["Arrays", "Linked Lists", "Trees", "Graphs", "DP", "Greedy", "Big-O"],
        careerTags: ["Software Engineer (SDE)", "Competitive Programmer", "Algorithm Engineer"],
        image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80",
        featured: true,
        isPublished: true,
        modules: [
          {
            id: "ai-tools-mod-01",
            title: "AI Developer Tooling & Velocity Workflows",
            description: "Cursor IDE, AI Codebase Indexing, Prompt Architectures, and Automated Unit Tests.",
            order: 1,
            lessons: [
              {
                id: "ai-tools-cursor-workflow",
                title: "Cursor AI IDE: Multi-File Edits, Codebase Indexing & .cursorrules",
                order: 1,
                duration: "40 min interactive sprint",
                difficulty: "Beginner",
                learningObjectives: [
                  "Understand how AI code editors build semantic vector indexes over your repository.",
                  "Master Composer (Cmd+I) and inline diff generation (Cmd+K) without introducing subtle bugs.",
                  "Enforce engineering standards and prevent hallucinations using strict .cursorrules and system instructions."
                ],
                overview: `Artificial Intelligence has transformed software engineering from manual syntax typing into high-leverage architectural orchestration. Modern AI-native IDEs like Cursor index your entire repository into a local semantic vector database. When you query the model using @codebase or ask for multi-file refactors, the IDE retrieves only the most relevant AST (Abstract Syntax Tree) slices, symbol declarations, and dependency trees to build a pinpoint context window for frontier models such as Claude 3.5 Sonnet.

However, unchecked reliance on AI code generators produces insidious architectural debt: hallucinations, ghost dependencies, security vulnerabilities, and brittle unmaintainable spaghetti code. Professional software engineers do not use AI as a replacement for thinking; they use it as an ultra-fast junior developer that must be strictly bounded.

By authoring explicit project rule files (such as .cursorrules or AGENTS.md), you define project invariants: language versions, mandatory typing conventions, forbidden dependencies, and directory structures. Furthermore, pairing AI code generation with immediate terminal test execution creates a self-healing development loop that increases velocity while preserving production safety.`,
                keyConcepts: [
                  {
                    title: "Codebase Semantic Indexing",
                    explanation: "Code files are parsed into semantic chunks and embedded into high-dimensional vectors, allowing natural language search over entire codebases."
                  },
                  {
                    title: "Prompt Architectures & Invariant Rules",
                    explanation: ".cursorrules and project system prompts act as guardrails, forcing the LLM to follow existing patterns and type signatures."
                  },
                  {
                    title: "Self-Healing Test Driven Loops",
                    explanation: "Directly piping compiler stderr and unit test failures back into the model context window allows it to resolve syntax and logic errors in seconds."
                  }
                ],
                practicalExamples: [
                  {
                    title: "Multi-File Authentication Refactor",
                    scenario: "Refactoring a Next.js App Router codebase from legacy cookie sessions to Supabase SSR JWT auth across 8 files simultaneously.",
                    takeaway: "Using Cursor Composer with explicit file mentions guarantees consistent imports and type signatures across routes and middleware."
                  },
                  {
                    title: "Automated Edge-Case Test Generation",
                    scenario: "Generating comprehensive Jest/Vitest test suites for a complex financial calculation function with negative inputs and floating point boundaries.",
                    takeaway: "AI excels at generating boundary condition tests that human engineers often overlook due to confirmation bias."
                  }
                ],
                codeSamples: [
                  {
                    language: "json",
                    filename: ".cursorrules",
                    code: `{\n  "version": "1.0",\n  "project": "CampusGrow Core",\n  "rules": [\n    "Strict TypeScript only with zero 'any' types.",\n    "Never install new npm packages without explicit permission.",\n    "Always use Tailwind CSS utility tokens matching emerald/mint palette.",\n    "Run 'npm run test' to verify all logic changes before outputting final diffs."\n  ]\n}`,
                    explanation: "Declarative project boundary file that ensures the AI assistant complies with team coding standards."
                  }
                ],
                practiceQuestions: [
                  "Why does full-repository vector indexing perform better than blind file copy-pasting into web chats?",
                  "What security risks arise when pasting proprietary codebase snippets into third-party cloud LLM providers?",
                  "How do .cursorrules enforce project invariants across large engineering teams?"
                ],
                mcqQuestions: [
                  {
                    id: "ai-q1",
                    question: "How does Cursor IDE's @codebase feature determine which files to include in the model context window?",
                    options: [
                      "It blindly sends all files in the directory regardless of size",
                      "It uses semantic vector search and AST symbol graphs to retrieve only relevant code slices",
                      "It only looks at the currently open active tab in the editor",
                      "It runs an external Google web search on the repository name"
                    ],
                    correctIndex: 1,
                    explanation: "Cursor uses embeddings and local vector indexes to perform semantic retrieval over your repository, pulling only high-relevance code chunks into the prompt."
                  },
                  {
                    id: "ai-q2",
                    question: "What is the primary danger of blindly accepting multi-file AI code generation without reading the diff?",
                    options: [
                      "The compiler will refuse to compile any AI generated code",
                      "The AI may hallucinate non-existent package methods or introduce silent race conditions and security vulnerabilities",
                      "The code editor automatically deletes your git repository",
                      "AI code generation runs 100x slower than typing by hand"
                    ],
                    correctIndex: 1,
                    explanation: "LLMs generate plausible token sequences that may appear syntactically correct while introducing subtle logic bugs, unvalidated inputs, or hallucinated APIs."
                  }
                ],
                assignment: {
                  title: "Author Production .cursorrules & Refactor Code",
                  description: "Create a production .cursorrules file for a TypeScript project, configure strict type rules, and prompt Cursor Composer to refactor a messy module with 100% test coverage.",
                  deliverables: [
                    "A validated .cursorrules configuration file",
                    "Git diff demonstrating multi-file refactoring with zero compiler warnings",
                    "A test suite passing with deterministic exit code 0"
                  ]
                }
              }
            ]
          }
        ]
      },
      {
        id: "operating-systems-kernel",
        title: "Operating Systems, Kernel Scheduling & Concurrency",
        subtitle: "Processes, threads, locks, virtual memory, and file system mechanics",
        description: "Demystify what happens under the hood of your computer: CPU scheduling algorithms, mutexes, condition variables, deadlocks, and POSIX system calls.",
        domainId: "cs-fundamentals",
        icon: "⚙️",
        difficulty: "Advanced",
        durationHours: 35,
        technologies: ["Process Scheduling", "Pthreads", "Virtual Memory", "Deadlocks", "POSIX", "IPC"],
        careerTags: ["Operating Systems Engineer", "Infrastructure Engineer", "Security Researcher"],
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
        featured: true,
        isPublished: true,
        modules: [
          {
            id: "ai-tools-mod-01",
            title: "AI Developer Tooling & Velocity Workflows",
            description: "Cursor IDE, AI Codebase Indexing, Prompt Architectures, and Automated Unit Tests.",
            order: 1,
            lessons: [
              {
                id: "ai-tools-cursor-workflow",
                title: "Cursor AI IDE: Multi-File Edits, Codebase Indexing & .cursorrules",
                order: 1,
                duration: "40 min interactive sprint",
                difficulty: "Beginner",
                learningObjectives: [
                  "Understand how AI code editors build semantic vector indexes over your repository.",
                  "Master Composer (Cmd+I) and inline diff generation (Cmd+K) without introducing subtle bugs.",
                  "Enforce engineering standards and prevent hallucinations using strict .cursorrules and system instructions."
                ],
                overview: `Artificial Intelligence has transformed software engineering from manual syntax typing into high-leverage architectural orchestration. Modern AI-native IDEs like Cursor index your entire repository into a local semantic vector database. When you query the model using @codebase or ask for multi-file refactors, the IDE retrieves only the most relevant AST (Abstract Syntax Tree) slices, symbol declarations, and dependency trees to build a pinpoint context window for frontier models such as Claude 3.5 Sonnet.

However, unchecked reliance on AI code generators produces insidious architectural debt: hallucinations, ghost dependencies, security vulnerabilities, and brittle unmaintainable spaghetti code. Professional software engineers do not use AI as a replacement for thinking; they use it as an ultra-fast junior developer that must be strictly bounded.

By authoring explicit project rule files (such as .cursorrules or AGENTS.md), you define project invariants: language versions, mandatory typing conventions, forbidden dependencies, and directory structures. Furthermore, pairing AI code generation with immediate terminal test execution creates a self-healing development loop that increases velocity while preserving production safety.`,
                keyConcepts: [
                  {
                    title: "Codebase Semantic Indexing",
                    explanation: "Code files are parsed into semantic chunks and embedded into high-dimensional vectors, allowing natural language search over entire codebases."
                  },
                  {
                    title: "Prompt Architectures & Invariant Rules",
                    explanation: ".cursorrules and project system prompts act as guardrails, forcing the LLM to follow existing patterns and type signatures."
                  },
                  {
                    title: "Self-Healing Test Driven Loops",
                    explanation: "Directly piping compiler stderr and unit test failures back into the model context window allows it to resolve syntax and logic errors in seconds."
                  }
                ],
                practicalExamples: [
                  {
                    title: "Multi-File Authentication Refactor",
                    scenario: "Refactoring a Next.js App Router codebase from legacy cookie sessions to Supabase SSR JWT auth across 8 files simultaneously.",
                    takeaway: "Using Cursor Composer with explicit file mentions guarantees consistent imports and type signatures across routes and middleware."
                  },
                  {
                    title: "Automated Edge-Case Test Generation",
                    scenario: "Generating comprehensive Jest/Vitest test suites for a complex financial calculation function with negative inputs and floating point boundaries.",
                    takeaway: "AI excels at generating boundary condition tests that human engineers often overlook due to confirmation bias."
                  }
                ],
                codeSamples: [
                  {
                    language: "json",
                    filename: ".cursorrules",
                    code: `{\n  "version": "1.0",\n  "project": "CampusGrow Core",\n  "rules": [\n    "Strict TypeScript only with zero 'any' types.",\n    "Never install new npm packages without explicit permission.",\n    "Always use Tailwind CSS utility tokens matching emerald/mint palette.",\n    "Run 'npm run test' to verify all logic changes before outputting final diffs."\n  ]\n}`,
                    explanation: "Declarative project boundary file that ensures the AI assistant complies with team coding standards."
                  }
                ],
                practiceQuestions: [
                  "Why does full-repository vector indexing perform better than blind file copy-pasting into web chats?",
                  "What security risks arise when pasting proprietary codebase snippets into third-party cloud LLM providers?",
                  "How do .cursorrules enforce project invariants across large engineering teams?"
                ],
                mcqQuestions: [
                  {
                    id: "ai-q1",
                    question: "How does Cursor IDE's @codebase feature determine which files to include in the model context window?",
                    options: [
                      "It blindly sends all files in the directory regardless of size",
                      "It uses semantic vector search and AST symbol graphs to retrieve only relevant code slices",
                      "It only looks at the currently open active tab in the editor",
                      "It runs an external Google web search on the repository name"
                    ],
                    correctIndex: 1,
                    explanation: "Cursor uses embeddings and local vector indexes to perform semantic retrieval over your repository, pulling only high-relevance code chunks into the prompt."
                  },
                  {
                    id: "ai-q2",
                    question: "What is the primary danger of blindly accepting multi-file AI code generation without reading the diff?",
                    options: [
                      "The compiler will refuse to compile any AI generated code",
                      "The AI may hallucinate non-existent package methods or introduce silent race conditions and security vulnerabilities",
                      "The code editor automatically deletes your git repository",
                      "AI code generation runs 100x slower than typing by hand"
                    ],
                    correctIndex: 1,
                    explanation: "LLMs generate plausible token sequences that may appear syntactically correct while introducing subtle logic bugs, unvalidated inputs, or hallucinated APIs."
                  }
                ],
                assignment: {
                  title: "Author Production .cursorrules & Refactor Code",
                  description: "Create a production .cursorrules file for a TypeScript project, configure strict type rules, and prompt Cursor Composer to refactor a messy module with 100% test coverage.",
                  deliverables: [
                    "A validated .cursorrules configuration file",
                    "Git diff demonstrating multi-file refactoring with zero compiler warnings",
                    "A test suite passing with deterministic exit code 0"
                  ]
                }
              }
            ]
          }
        ]
      },
      {
        id: "computer-networks-protocols",
        title: "Computer Networks & Internet Protocols",
        subtitle: "TCP/IP, UDP, DNS, TLS 1.3, HTTP/2, HTTP/3, and packet routing",
        description: "Analyze the architecture of the modern Internet: sliding window flow control, congestion avoidance, TLS handshakes, packet capture with Wireshark, and QUIC/HTTP/3.",
        domainId: "cs-fundamentals",
        icon: "🌐",
        difficulty: "Intermediate",
        durationHours: 30,
        technologies: ["TCP/IP", "UDP", "TLS", "HTTP/2", "HTTP/3", "Wireshark", "DNS", "BGP"],
        careerTags: ["Network Engineer", "SRE", "Backend Engineer", "Security Analyst"],
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
        featured: false,
        isPublished: true,
        modules: [
          {
            id: "ai-tools-mod-01",
            title: "AI Developer Tooling & Velocity Workflows",
            description: "Cursor IDE, AI Codebase Indexing, Prompt Architectures, and Automated Unit Tests.",
            order: 1,
            lessons: [
              {
                id: "ai-tools-cursor-workflow",
                title: "Cursor AI IDE: Multi-File Edits, Codebase Indexing & .cursorrules",
                order: 1,
                duration: "40 min interactive sprint",
                difficulty: "Beginner",
                learningObjectives: [
                  "Understand how AI code editors build semantic vector indexes over your repository.",
                  "Master Composer (Cmd+I) and inline diff generation (Cmd+K) without introducing subtle bugs.",
                  "Enforce engineering standards and prevent hallucinations using strict .cursorrules and system instructions."
                ],
                overview: `Artificial Intelligence has transformed software engineering from manual syntax typing into high-leverage architectural orchestration. Modern AI-native IDEs like Cursor index your entire repository into a local semantic vector database. When you query the model using @codebase or ask for multi-file refactors, the IDE retrieves only the most relevant AST (Abstract Syntax Tree) slices, symbol declarations, and dependency trees to build a pinpoint context window for frontier models such as Claude 3.5 Sonnet.

However, unchecked reliance on AI code generators produces insidious architectural debt: hallucinations, ghost dependencies, security vulnerabilities, and brittle unmaintainable spaghetti code. Professional software engineers do not use AI as a replacement for thinking; they use it as an ultra-fast junior developer that must be strictly bounded.

By authoring explicit project rule files (such as .cursorrules or AGENTS.md), you define project invariants: language versions, mandatory typing conventions, forbidden dependencies, and directory structures. Furthermore, pairing AI code generation with immediate terminal test execution creates a self-healing development loop that increases velocity while preserving production safety.`,
                keyConcepts: [
                  {
                    title: "Codebase Semantic Indexing",
                    explanation: "Code files are parsed into semantic chunks and embedded into high-dimensional vectors, allowing natural language search over entire codebases."
                  },
                  {
                    title: "Prompt Architectures & Invariant Rules",
                    explanation: ".cursorrules and project system prompts act as guardrails, forcing the LLM to follow existing patterns and type signatures."
                  },
                  {
                    title: "Self-Healing Test Driven Loops",
                    explanation: "Directly piping compiler stderr and unit test failures back into the model context window allows it to resolve syntax and logic errors in seconds."
                  }
                ],
                practicalExamples: [
                  {
                    title: "Multi-File Authentication Refactor",
                    scenario: "Refactoring a Next.js App Router codebase from legacy cookie sessions to Supabase SSR JWT auth across 8 files simultaneously.",
                    takeaway: "Using Cursor Composer with explicit file mentions guarantees consistent imports and type signatures across routes and middleware."
                  },
                  {
                    title: "Automated Edge-Case Test Generation",
                    scenario: "Generating comprehensive Jest/Vitest test suites for a complex financial calculation function with negative inputs and floating point boundaries.",
                    takeaway: "AI excels at generating boundary condition tests that human engineers often overlook due to confirmation bias."
                  }
                ],
                codeSamples: [
                  {
                    language: "json",
                    filename: ".cursorrules",
                    code: `{\n  "version": "1.0",\n  "project": "CampusGrow Core",\n  "rules": [\n    "Strict TypeScript only with zero 'any' types.",\n    "Never install new npm packages without explicit permission.",\n    "Always use Tailwind CSS utility tokens matching emerald/mint palette.",\n    "Run 'npm run test' to verify all logic changes before outputting final diffs."\n  ]\n}`,
                    explanation: "Declarative project boundary file that ensures the AI assistant complies with team coding standards."
                  }
                ],
                practiceQuestions: [
                  "Why does full-repository vector indexing perform better than blind file copy-pasting into web chats?",
                  "What security risks arise when pasting proprietary codebase snippets into third-party cloud LLM providers?",
                  "How do .cursorrules enforce project invariants across large engineering teams?"
                ],
                mcqQuestions: [
                  {
                    id: "ai-q1",
                    question: "How does Cursor IDE's @codebase feature determine which files to include in the model context window?",
                    options: [
                      "It blindly sends all files in the directory regardless of size",
                      "It uses semantic vector search and AST symbol graphs to retrieve only relevant code slices",
                      "It only looks at the currently open active tab in the editor",
                      "It runs an external Google web search on the repository name"
                    ],
                    correctIndex: 1,
                    explanation: "Cursor uses embeddings and local vector indexes to perform semantic retrieval over your repository, pulling only high-relevance code chunks into the prompt."
                  },
                  {
                    id: "ai-q2",
                    question: "What is the primary danger of blindly accepting multi-file AI code generation without reading the diff?",
                    options: [
                      "The compiler will refuse to compile any AI generated code",
                      "The AI may hallucinate non-existent package methods or introduce silent race conditions and security vulnerabilities",
                      "The code editor automatically deletes your git repository",
                      "AI code generation runs 100x slower than typing by hand"
                    ],
                    correctIndex: 1,
                    explanation: "LLMs generate plausible token sequences that may appear syntactically correct while introducing subtle logic bugs, unvalidated inputs, or hallucinated APIs."
                  }
                ],
                assignment: {
                  title: "Author Production .cursorrules & Refactor Code",
                  description: "Create a production .cursorrules file for a TypeScript project, configure strict type rules, and prompt Cursor Composer to refactor a messy module with 100% test coverage.",
                  deliverables: [
                    "A validated .cursorrules configuration file",
                    "Git diff demonstrating multi-file refactoring with zero compiler warnings",
                    "A test suite passing with deterministic exit code 0"
                  ]
                }
              }
            ]
          }
        ]
      }
    ]
  },

  // 3. Web Development
  {
    id: "web-development",
    number: 3,
    title: "Web Development",
    subtitle: "Modern Frontend, High-Performance SSR & Scalable Backends",
    description: "Build reactive, accessible, and ultra-fast web platforms using React, Next.js, TypeScript, Tailwind CSS, Node.js, FastAPI, Spring Boot, and microservices.",
    icon: "🌐",
    badge: "Full-Stack Web",
    color: "from-cyan-600 to-blue-700",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Express", "FastAPI", "Spring Boot", "REST", "GraphQL"],
    courses: [
      {
        id: "modern-react-nextjs-architecture",
        title: "Production React & Next.js Full-Stack Architecture",
        subtitle: "Server components, streaming SSR, state management, and edge caching",
        description: "Build production-scale web applications from scratch using Next.js App Router, React Server Components (RSC), Tailwind CSS, TypeScript, and edge runtime deployments.",
        domainId: "web-development",
        icon: "⚛️",
        difficulty: "Intermediate",
        durationHours: 40,
        technologies: ["React 19", "Next.js", "TypeScript", "Tailwind CSS", "Server Actions", "Zustand"],
        careerTags: ["Frontend Engineer", "Full-Stack Developer", "Web Architect"],
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
        featured: true,
        isPublished: true,
        modules: [
          {
            id: "ai-tools-mod-01",
            title: "AI Developer Tooling & Velocity Workflows",
            description: "Cursor IDE, AI Codebase Indexing, Prompt Architectures, and Automated Unit Tests.",
            order: 1,
            lessons: [
              {
                id: "ai-tools-cursor-workflow",
                title: "Cursor AI IDE: Multi-File Edits, Codebase Indexing & .cursorrules",
                order: 1,
                duration: "40 min interactive sprint",
                difficulty: "Beginner",
                learningObjectives: [
                  "Understand how AI code editors build semantic vector indexes over your repository.",
                  "Master Composer (Cmd+I) and inline diff generation (Cmd+K) without introducing subtle bugs.",
                  "Enforce engineering standards and prevent hallucinations using strict .cursorrules and system instructions."
                ],
                overview: `Artificial Intelligence has transformed software engineering from manual syntax typing into high-leverage architectural orchestration. Modern AI-native IDEs like Cursor index your entire repository into a local semantic vector database. When you query the model using @codebase or ask for multi-file refactors, the IDE retrieves only the most relevant AST (Abstract Syntax Tree) slices, symbol declarations, and dependency trees to build a pinpoint context window for frontier models such as Claude 3.5 Sonnet.

However, unchecked reliance on AI code generators produces insidious architectural debt: hallucinations, ghost dependencies, security vulnerabilities, and brittle unmaintainable spaghetti code. Professional software engineers do not use AI as a replacement for thinking; they use it as an ultra-fast junior developer that must be strictly bounded.

By authoring explicit project rule files (such as .cursorrules or AGENTS.md), you define project invariants: language versions, mandatory typing conventions, forbidden dependencies, and directory structures. Furthermore, pairing AI code generation with immediate terminal test execution creates a self-healing development loop that increases velocity while preserving production safety.`,
                keyConcepts: [
                  {
                    title: "Codebase Semantic Indexing",
                    explanation: "Code files are parsed into semantic chunks and embedded into high-dimensional vectors, allowing natural language search over entire codebases."
                  },
                  {
                    title: "Prompt Architectures & Invariant Rules",
                    explanation: ".cursorrules and project system prompts act as guardrails, forcing the LLM to follow existing patterns and type signatures."
                  },
                  {
                    title: "Self-Healing Test Driven Loops",
                    explanation: "Directly piping compiler stderr and unit test failures back into the model context window allows it to resolve syntax and logic errors in seconds."
                  }
                ],
                practicalExamples: [
                  {
                    title: "Multi-File Authentication Refactor",
                    scenario: "Refactoring a Next.js App Router codebase from legacy cookie sessions to Supabase SSR JWT auth across 8 files simultaneously.",
                    takeaway: "Using Cursor Composer with explicit file mentions guarantees consistent imports and type signatures across routes and middleware."
                  },
                  {
                    title: "Automated Edge-Case Test Generation",
                    scenario: "Generating comprehensive Jest/Vitest test suites for a complex financial calculation function with negative inputs and floating point boundaries.",
                    takeaway: "AI excels at generating boundary condition tests that human engineers often overlook due to confirmation bias."
                  }
                ],
                codeSamples: [
                  {
                    language: "json",
                    filename: ".cursorrules",
                    code: `{\n  "version": "1.0",\n  "project": "CampusGrow Core",\n  "rules": [\n    "Strict TypeScript only with zero 'any' types.",\n    "Never install new npm packages without explicit permission.",\n    "Always use Tailwind CSS utility tokens matching emerald/mint palette.",\n    "Run 'npm run test' to verify all logic changes before outputting final diffs."\n  ]\n}`,
                    explanation: "Declarative project boundary file that ensures the AI assistant complies with team coding standards."
                  }
                ],
                practiceQuestions: [
                  "Why does full-repository vector indexing perform better than blind file copy-pasting into web chats?",
                  "What security risks arise when pasting proprietary codebase snippets into third-party cloud LLM providers?",
                  "How do .cursorrules enforce project invariants across large engineering teams?"
                ],
                mcqQuestions: [
                  {
                    id: "ai-q1",
                    question: "How does Cursor IDE's @codebase feature determine which files to include in the model context window?",
                    options: [
                      "It blindly sends all files in the directory regardless of size",
                      "It uses semantic vector search and AST symbol graphs to retrieve only relevant code slices",
                      "It only looks at the currently open active tab in the editor",
                      "It runs an external Google web search on the repository name"
                    ],
                    correctIndex: 1,
                    explanation: "Cursor uses embeddings and local vector indexes to perform semantic retrieval over your repository, pulling only high-relevance code chunks into the prompt."
                  },
                  {
                    id: "ai-q2",
                    question: "What is the primary danger of blindly accepting multi-file AI code generation without reading the diff?",
                    options: [
                      "The compiler will refuse to compile any AI generated code",
                      "The AI may hallucinate non-existent package methods or introduce silent race conditions and security vulnerabilities",
                      "The code editor automatically deletes your git repository",
                      "AI code generation runs 100x slower than typing by hand"
                    ],
                    correctIndex: 1,
                    explanation: "LLMs generate plausible token sequences that may appear syntactically correct while introducing subtle logic bugs, unvalidated inputs, or hallucinated APIs."
                  }
                ],
                assignment: {
                  title: "Author Production .cursorrules & Refactor Code",
                  description: "Create a production .cursorrules file for a TypeScript project, configure strict type rules, and prompt Cursor Composer to refactor a messy module with 100% test coverage.",
                  deliverables: [
                    "A validated .cursorrules configuration file",
                    "Git diff demonstrating multi-file refactoring with zero compiler warnings",
                    "A test suite passing with deterministic exit code 0"
                  ]
                }
              }
            ]
          }
        ]
      },
      {
        id: "backend-apis-microservices",
        title: "Scalable Backend APIs, Event Streaming & Microservices",
        subtitle: "Node.js, Express, FastAPI, Redis caching, and Kafka message brokers",
        description: "Design fault-tolerant APIs, implement rate limiters, JWT authentication with refresh token rotations, background workers, and asynchronous event streams.",
        domainId: "web-development",
        icon: "🔌",
        difficulty: "Intermediate",
        durationHours: 35,
        technologies: ["Node.js", "FastAPI", "PostgreSQL", "Redis", "Kafka", "WebSockets"],
        careerTags: ["Backend Engineer", "API Designer", "Platform Engineer"],
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
        featured: true,
        isPublished: true,
        modules: [
          {
            id: "ai-tools-mod-01",
            title: "AI Developer Tooling & Velocity Workflows",
            description: "Cursor IDE, AI Codebase Indexing, Prompt Architectures, and Automated Unit Tests.",
            order: 1,
            lessons: [
              {
                id: "ai-tools-cursor-workflow",
                title: "Cursor AI IDE: Multi-File Edits, Codebase Indexing & .cursorrules",
                order: 1,
                duration: "40 min interactive sprint",
                difficulty: "Beginner",
                learningObjectives: [
                  "Understand how AI code editors build semantic vector indexes over your repository.",
                  "Master Composer (Cmd+I) and inline diff generation (Cmd+K) without introducing subtle bugs.",
                  "Enforce engineering standards and prevent hallucinations using strict .cursorrules and system instructions."
                ],
                overview: `Artificial Intelligence has transformed software engineering from manual syntax typing into high-leverage architectural orchestration. Modern AI-native IDEs like Cursor index your entire repository into a local semantic vector database. When you query the model using @codebase or ask for multi-file refactors, the IDE retrieves only the most relevant AST (Abstract Syntax Tree) slices, symbol declarations, and dependency trees to build a pinpoint context window for frontier models such as Claude 3.5 Sonnet.

However, unchecked reliance on AI code generators produces insidious architectural debt: hallucinations, ghost dependencies, security vulnerabilities, and brittle unmaintainable spaghetti code. Professional software engineers do not use AI as a replacement for thinking; they use it as an ultra-fast junior developer that must be strictly bounded.

By authoring explicit project rule files (such as .cursorrules or AGENTS.md), you define project invariants: language versions, mandatory typing conventions, forbidden dependencies, and directory structures. Furthermore, pairing AI code generation with immediate terminal test execution creates a self-healing development loop that increases velocity while preserving production safety.`,
                keyConcepts: [
                  {
                    title: "Codebase Semantic Indexing",
                    explanation: "Code files are parsed into semantic chunks and embedded into high-dimensional vectors, allowing natural language search over entire codebases."
                  },
                  {
                    title: "Prompt Architectures & Invariant Rules",
                    explanation: ".cursorrules and project system prompts act as guardrails, forcing the LLM to follow existing patterns and type signatures."
                  },
                  {
                    title: "Self-Healing Test Driven Loops",
                    explanation: "Directly piping compiler stderr and unit test failures back into the model context window allows it to resolve syntax and logic errors in seconds."
                  }
                ],
                practicalExamples: [
                  {
                    title: "Multi-File Authentication Refactor",
                    scenario: "Refactoring a Next.js App Router codebase from legacy cookie sessions to Supabase SSR JWT auth across 8 files simultaneously.",
                    takeaway: "Using Cursor Composer with explicit file mentions guarantees consistent imports and type signatures across routes and middleware."
                  },
                  {
                    title: "Automated Edge-Case Test Generation",
                    scenario: "Generating comprehensive Jest/Vitest test suites for a complex financial calculation function with negative inputs and floating point boundaries.",
                    takeaway: "AI excels at generating boundary condition tests that human engineers often overlook due to confirmation bias."
                  }
                ],
                codeSamples: [
                  {
                    language: "json",
                    filename: ".cursorrules",
                    code: `{\n  "version": "1.0",\n  "project": "CampusGrow Core",\n  "rules": [\n    "Strict TypeScript only with zero 'any' types.",\n    "Never install new npm packages without explicit permission.",\n    "Always use Tailwind CSS utility tokens matching emerald/mint palette.",\n    "Run 'npm run test' to verify all logic changes before outputting final diffs."\n  ]\n}`,
                    explanation: "Declarative project boundary file that ensures the AI assistant complies with team coding standards."
                  }
                ],
                practiceQuestions: [
                  "Why does full-repository vector indexing perform better than blind file copy-pasting into web chats?",
                  "What security risks arise when pasting proprietary codebase snippets into third-party cloud LLM providers?",
                  "How do .cursorrules enforce project invariants across large engineering teams?"
                ],
                mcqQuestions: [
                  {
                    id: "ai-q1",
                    question: "How does Cursor IDE's @codebase feature determine which files to include in the model context window?",
                    options: [
                      "It blindly sends all files in the directory regardless of size",
                      "It uses semantic vector search and AST symbol graphs to retrieve only relevant code slices",
                      "It only looks at the currently open active tab in the editor",
                      "It runs an external Google web search on the repository name"
                    ],
                    correctIndex: 1,
                    explanation: "Cursor uses embeddings and local vector indexes to perform semantic retrieval over your repository, pulling only high-relevance code chunks into the prompt."
                  },
                  {
                    id: "ai-q2",
                    question: "What is the primary danger of blindly accepting multi-file AI code generation without reading the diff?",
                    options: [
                      "The compiler will refuse to compile any AI generated code",
                      "The AI may hallucinate non-existent package methods or introduce silent race conditions and security vulnerabilities",
                      "The code editor automatically deletes your git repository",
                      "AI code generation runs 100x slower than typing by hand"
                    ],
                    correctIndex: 1,
                    explanation: "LLMs generate plausible token sequences that may appear syntactically correct while introducing subtle logic bugs, unvalidated inputs, or hallucinated APIs."
                  }
                ],
                assignment: {
                  title: "Author Production .cursorrules & Refactor Code",
                  description: "Create a production .cursorrules file for a TypeScript project, configure strict type rules, and prompt Cursor Composer to refactor a messy module with 100% test coverage.",
                  deliverables: [
                    "A validated .cursorrules configuration file",
                    "Git diff demonstrating multi-file refactoring with zero compiler warnings",
                    "A test suite passing with deterministic exit code 0"
                  ]
                }
              }
            ]
          }
        ]
      }
    ,
      {
        id: "fullstack-graphql-websockets",
        title: "Full-Stack GraphQL, WebSockets & Real-Time Synchronization",
        subtitle: "Apollo Client, Subscriptions, Socket.io, and bidirectional data sync",
        description: "Build reactive, real-time web applications with GraphQL schemas, live queries, WebSocket channels, and optimistic client cache updates.",
        domainId: "web-development",
        icon: "⚡",
        difficulty: "Advanced",
        durationHours: 30,
        technologies: ["GraphQL", "WebSockets", "Socket.io", "Apollo Server", "Redis Pub/Sub", "TypeScript"],
        careerTags: ["Full-Stack Engineer", "Real-Time Systems Developer", "Frontend Architect"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
        featured: false,
        isPublished: true,
        modules: [
          {
            id: "ai-tools-mod-01",
            title: "AI Developer Tooling & Velocity Workflows",
            description: "Cursor IDE, AI Codebase Indexing, Prompt Architectures, and Automated Unit Tests.",
            order: 1,
            lessons: [
              {
                id: "ai-tools-cursor-workflow",
                title: "Cursor AI IDE: Multi-File Edits, Codebase Indexing & .cursorrules",
                order: 1,
                duration: "40 min interactive sprint",
                difficulty: "Beginner",
                learningObjectives: [
                  "Understand how AI code editors build semantic vector indexes over your repository.",
                  "Master Composer (Cmd+I) and inline diff generation (Cmd+K) without introducing subtle bugs.",
                  "Enforce engineering standards and prevent hallucinations using strict .cursorrules and system instructions."
                ],
                overview: `Artificial Intelligence has transformed software engineering from manual syntax typing into high-leverage architectural orchestration. Modern AI-native IDEs like Cursor index your entire repository into a local semantic vector database. When you query the model using @codebase or ask for multi-file refactors, the IDE retrieves only the most relevant AST (Abstract Syntax Tree) slices, symbol declarations, and dependency trees to build a pinpoint context window for frontier models such as Claude 3.5 Sonnet.

However, unchecked reliance on AI code generators produces insidious architectural debt: hallucinations, ghost dependencies, security vulnerabilities, and brittle unmaintainable spaghetti code. Professional software engineers do not use AI as a replacement for thinking; they use it as an ultra-fast junior developer that must be strictly bounded.

By authoring explicit project rule files (such as .cursorrules or AGENTS.md), you define project invariants: language versions, mandatory typing conventions, forbidden dependencies, and directory structures. Furthermore, pairing AI code generation with immediate terminal test execution creates a self-healing development loop that increases velocity while preserving production safety.`,
                keyConcepts: [
                  {
                    title: "Codebase Semantic Indexing",
                    explanation: "Code files are parsed into semantic chunks and embedded into high-dimensional vectors, allowing natural language search over entire codebases."
                  },
                  {
                    title: "Prompt Architectures & Invariant Rules",
                    explanation: ".cursorrules and project system prompts act as guardrails, forcing the LLM to follow existing patterns and type signatures."
                  },
                  {
                    title: "Self-Healing Test Driven Loops",
                    explanation: "Directly piping compiler stderr and unit test failures back into the model context window allows it to resolve syntax and logic errors in seconds."
                  }
                ],
                practicalExamples: [
                  {
                    title: "Multi-File Authentication Refactor",
                    scenario: "Refactoring a Next.js App Router codebase from legacy cookie sessions to Supabase SSR JWT auth across 8 files simultaneously.",
                    takeaway: "Using Cursor Composer with explicit file mentions guarantees consistent imports and type signatures across routes and middleware."
                  },
                  {
                    title: "Automated Edge-Case Test Generation",
                    scenario: "Generating comprehensive Jest/Vitest test suites for a complex financial calculation function with negative inputs and floating point boundaries.",
                    takeaway: "AI excels at generating boundary condition tests that human engineers often overlook due to confirmation bias."
                  }
                ],
                codeSamples: [
                  {
                    language: "json",
                    filename: ".cursorrules",
                    code: `{\n  "version": "1.0",\n  "project": "CampusGrow Core",\n  "rules": [\n    "Strict TypeScript only with zero 'any' types.",\n    "Never install new npm packages without explicit permission.",\n    "Always use Tailwind CSS utility tokens matching emerald/mint palette.",\n    "Run 'npm run test' to verify all logic changes before outputting final diffs."\n  ]\n}`,
                    explanation: "Declarative project boundary file that ensures the AI assistant complies with team coding standards."
                  }
                ],
                practiceQuestions: [
                  "Why does full-repository vector indexing perform better than blind file copy-pasting into web chats?",
                  "What security risks arise when pasting proprietary codebase snippets into third-party cloud LLM providers?",
                  "How do .cursorrules enforce project invariants across large engineering teams?"
                ],
                mcqQuestions: [
                  {
                    id: "ai-q1",
                    question: "How does Cursor IDE's @codebase feature determine which files to include in the model context window?",
                    options: [
                      "It blindly sends all files in the directory regardless of size",
                      "It uses semantic vector search and AST symbol graphs to retrieve only relevant code slices",
                      "It only looks at the currently open active tab in the editor",
                      "It runs an external Google web search on the repository name"
                    ],
                    correctIndex: 1,
                    explanation: "Cursor uses embeddings and local vector indexes to perform semantic retrieval over your repository, pulling only high-relevance code chunks into the prompt."
                  },
                  {
                    id: "ai-q2",
                    question: "What is the primary danger of blindly accepting multi-file AI code generation without reading the diff?",
                    options: [
                      "The compiler will refuse to compile any AI generated code",
                      "The AI may hallucinate non-existent package methods or introduce silent race conditions and security vulnerabilities",
                      "The code editor automatically deletes your git repository",
                      "AI code generation runs 100x slower than typing by hand"
                    ],
                    correctIndex: 1,
                    explanation: "LLMs generate plausible token sequences that may appear syntactically correct while introducing subtle logic bugs, unvalidated inputs, or hallucinated APIs."
                  }
                ],
                assignment: {
                  title: "Author Production .cursorrules & Refactor Code",
                  description: "Create a production .cursorrules file for a TypeScript project, configure strict type rules, and prompt Cursor Composer to refactor a messy module with 100% test coverage.",
                  deliverables: [
                    "A validated .cursorrules configuration file",
                    "Git diff demonstrating multi-file refactoring with zero compiler warnings",
                    "A test suite passing with deterministic exit code 0"
                  ]
                }
              }
            ]
          }
        ]
      },
    ]
  },

  // 4. Mobile App Development
  {
    id: "mobile-app-development",
    number: 4,
    title: "Mobile App Development",
    subtitle: "Cross-Platform and Native iOS & Android Engineering",
    description: "Build responsive, native-feeling mobile applications with Flutter, Dart, React Native, Kotlin, Swift, offline databases, and push notification systems.",
    icon: "📱",
    badge: "Mobile Apps",
    color: "from-teal-600 to-emerald-700",
    technologies: ["Flutter", "Dart", "React Native", "Kotlin", "Swift", "SQLite", "Firebase", "App Store & Play Store"],
    courses: [
      {
        id: "flutter-dart-cross-platform",
        title: "Flutter & Dart: Cross-Platform Mobile Mastery",
        subtitle: "State management with BLoC, native device APIs, and offline sync",
        description: "Build real iOS and Android mobile apps from a single codebase. Learn declarative UI rendering, local caching with SQLite, and background push notifications.",
        domainId: "mobile-app-development",
        icon: "💙",
        difficulty: "Beginner",
        durationHours: 35,
        technologies: ["Flutter", "Dart", "BLoC", "SQLite", "REST APIs", "Firebase"],
        careerTags: ["Flutter Developer", "Mobile Engineer", "App Entrepreneur"],
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80",
        featured: true,
        isPublished: true,
        modules: [
          {
            id: "ai-tools-mod-01",
            title: "AI Developer Tooling & Velocity Workflows",
            description: "Cursor IDE, AI Codebase Indexing, Prompt Architectures, and Automated Unit Tests.",
            order: 1,
            lessons: [
              {
                id: "ai-tools-cursor-workflow",
                title: "Cursor AI IDE: Multi-File Edits, Codebase Indexing & .cursorrules",
                order: 1,
                duration: "40 min interactive sprint",
                difficulty: "Beginner",
                learningObjectives: [
                  "Understand how AI code editors build semantic vector indexes over your repository.",
                  "Master Composer (Cmd+I) and inline diff generation (Cmd+K) without introducing subtle bugs.",
                  "Enforce engineering standards and prevent hallucinations using strict .cursorrules and system instructions."
                ],
                overview: `Artificial Intelligence has transformed software engineering from manual syntax typing into high-leverage architectural orchestration. Modern AI-native IDEs like Cursor index your entire repository into a local semantic vector database. When you query the model using @codebase or ask for multi-file refactors, the IDE retrieves only the most relevant AST (Abstract Syntax Tree) slices, symbol declarations, and dependency trees to build a pinpoint context window for frontier models such as Claude 3.5 Sonnet.

However, unchecked reliance on AI code generators produces insidious architectural debt: hallucinations, ghost dependencies, security vulnerabilities, and brittle unmaintainable spaghetti code. Professional software engineers do not use AI as a replacement for thinking; they use it as an ultra-fast junior developer that must be strictly bounded.

By authoring explicit project rule files (such as .cursorrules or AGENTS.md), you define project invariants: language versions, mandatory typing conventions, forbidden dependencies, and directory structures. Furthermore, pairing AI code generation with immediate terminal test execution creates a self-healing development loop that increases velocity while preserving production safety.`,
                keyConcepts: [
                  {
                    title: "Codebase Semantic Indexing",
                    explanation: "Code files are parsed into semantic chunks and embedded into high-dimensional vectors, allowing natural language search over entire codebases."
                  },
                  {
                    title: "Prompt Architectures & Invariant Rules",
                    explanation: ".cursorrules and project system prompts act as guardrails, forcing the LLM to follow existing patterns and type signatures."
                  },
                  {
                    title: "Self-Healing Test Driven Loops",
                    explanation: "Directly piping compiler stderr and unit test failures back into the model context window allows it to resolve syntax and logic errors in seconds."
                  }
                ],
                practicalExamples: [
                  {
                    title: "Multi-File Authentication Refactor",
                    scenario: "Refactoring a Next.js App Router codebase from legacy cookie sessions to Supabase SSR JWT auth across 8 files simultaneously.",
                    takeaway: "Using Cursor Composer with explicit file mentions guarantees consistent imports and type signatures across routes and middleware."
                  },
                  {
                    title: "Automated Edge-Case Test Generation",
                    scenario: "Generating comprehensive Jest/Vitest test suites for a complex financial calculation function with negative inputs and floating point boundaries.",
                    takeaway: "AI excels at generating boundary condition tests that human engineers often overlook due to confirmation bias."
                  }
                ],
                codeSamples: [
                  {
                    language: "json",
                    filename: ".cursorrules",
                    code: `{\n  "version": "1.0",\n  "project": "CampusGrow Core",\n  "rules": [\n    "Strict TypeScript only with zero 'any' types.",\n    "Never install new npm packages without explicit permission.",\n    "Always use Tailwind CSS utility tokens matching emerald/mint palette.",\n    "Run 'npm run test' to verify all logic changes before outputting final diffs."\n  ]\n}`,
                    explanation: "Declarative project boundary file that ensures the AI assistant complies with team coding standards."
                  }
                ],
                practiceQuestions: [
                  "Why does full-repository vector indexing perform better than blind file copy-pasting into web chats?",
                  "What security risks arise when pasting proprietary codebase snippets into third-party cloud LLM providers?",
                  "How do .cursorrules enforce project invariants across large engineering teams?"
                ],
                mcqQuestions: [
                  {
                    id: "ai-q1",
                    question: "How does Cursor IDE's @codebase feature determine which files to include in the model context window?",
                    options: [
                      "It blindly sends all files in the directory regardless of size",
                      "It uses semantic vector search and AST symbol graphs to retrieve only relevant code slices",
                      "It only looks at the currently open active tab in the editor",
                      "It runs an external Google web search on the repository name"
                    ],
                    correctIndex: 1,
                    explanation: "Cursor uses embeddings and local vector indexes to perform semantic retrieval over your repository, pulling only high-relevance code chunks into the prompt."
                  },
                  {
                    id: "ai-q2",
                    question: "What is the primary danger of blindly accepting multi-file AI code generation without reading the diff?",
                    options: [
                      "The compiler will refuse to compile any AI generated code",
                      "The AI may hallucinate non-existent package methods or introduce silent race conditions and security vulnerabilities",
                      "The code editor automatically deletes your git repository",
                      "AI code generation runs 100x slower than typing by hand"
                    ],
                    correctIndex: 1,
                    explanation: "LLMs generate plausible token sequences that may appear syntactically correct while introducing subtle logic bugs, unvalidated inputs, or hallucinated APIs."
                  }
                ],
                assignment: {
                  title: "Author Production .cursorrules & Refactor Code",
                  description: "Create a production .cursorrules file for a TypeScript project, configure strict type rules, and prompt Cursor Composer to refactor a messy module with 100% test coverage.",
                  deliverables: [
                    "A validated .cursorrules configuration file",
                    "Git diff demonstrating multi-file refactoring with zero compiler warnings",
                    "A test suite passing with deterministic exit code 0"
                  ]
                }
              }
            ]
          }
        ]
      }
    ,
      {
        id: "react-native-expo-enterprise",
        title: "React Native & Expo: Enterprise Cross-Platform Mobile",
        subtitle: "Native bridges, animations with Reanimated 3, gesture handling, and EAS cloud builds",
        description: "Develop enterprise-grade cross-platform apps using React Native, TypeScript, Expo Router, offline persistence, and secure biometric authentication.",
        domainId: "mobile-app-development",
        icon: "📱",
        difficulty: "Intermediate",
        durationHours: 35,
        technologies: ["React Native", "Expo", "TypeScript", "Reanimated 3", "EAS", "Mobile Security"],
        careerTags: ["React Native Developer", "Mobile Engineer", "Frontend Developer"],
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80",
        featured: true,
        isPublished: true,
        modules: [
          {
            id: "ai-tools-mod-01",
            title: "AI Developer Tooling & Velocity Workflows",
            description: "Cursor IDE, AI Codebase Indexing, Prompt Architectures, and Automated Unit Tests.",
            order: 1,
            lessons: [
              {
                id: "ai-tools-cursor-workflow",
                title: "Cursor AI IDE: Multi-File Edits, Codebase Indexing & .cursorrules",
                order: 1,
                duration: "40 min interactive sprint",
                difficulty: "Beginner",
                learningObjectives: [
                  "Understand how AI code editors build semantic vector indexes over your repository.",
                  "Master Composer (Cmd+I) and inline diff generation (Cmd+K) without introducing subtle bugs.",
                  "Enforce engineering standards and prevent hallucinations using strict .cursorrules and system instructions."
                ],
                overview: `Artificial Intelligence has transformed software engineering from manual syntax typing into high-leverage architectural orchestration. Modern AI-native IDEs like Cursor index your entire repository into a local semantic vector database. When you query the model using @codebase or ask for multi-file refactors, the IDE retrieves only the most relevant AST (Abstract Syntax Tree) slices, symbol declarations, and dependency trees to build a pinpoint context window for frontier models such as Claude 3.5 Sonnet.

However, unchecked reliance on AI code generators produces insidious architectural debt: hallucinations, ghost dependencies, security vulnerabilities, and brittle unmaintainable spaghetti code. Professional software engineers do not use AI as a replacement for thinking; they use it as an ultra-fast junior developer that must be strictly bounded.

By authoring explicit project rule files (such as .cursorrules or AGENTS.md), you define project invariants: language versions, mandatory typing conventions, forbidden dependencies, and directory structures. Furthermore, pairing AI code generation with immediate terminal test execution creates a self-healing development loop that increases velocity while preserving production safety.`,
                keyConcepts: [
                  {
                    title: "Codebase Semantic Indexing",
                    explanation: "Code files are parsed into semantic chunks and embedded into high-dimensional vectors, allowing natural language search over entire codebases."
                  },
                  {
                    title: "Prompt Architectures & Invariant Rules",
                    explanation: ".cursorrules and project system prompts act as guardrails, forcing the LLM to follow existing patterns and type signatures."
                  },
                  {
                    title: "Self-Healing Test Driven Loops",
                    explanation: "Directly piping compiler stderr and unit test failures back into the model context window allows it to resolve syntax and logic errors in seconds."
                  }
                ],
                practicalExamples: [
                  {
                    title: "Multi-File Authentication Refactor",
                    scenario: "Refactoring a Next.js App Router codebase from legacy cookie sessions to Supabase SSR JWT auth across 8 files simultaneously.",
                    takeaway: "Using Cursor Composer with explicit file mentions guarantees consistent imports and type signatures across routes and middleware."
                  },
                  {
                    title: "Automated Edge-Case Test Generation",
                    scenario: "Generating comprehensive Jest/Vitest test suites for a complex financial calculation function with negative inputs and floating point boundaries.",
                    takeaway: "AI excels at generating boundary condition tests that human engineers often overlook due to confirmation bias."
                  }
                ],
                codeSamples: [
                  {
                    language: "json",
                    filename: ".cursorrules",
                    code: `{\n  "version": "1.0",\n  "project": "CampusGrow Core",\n  "rules": [\n    "Strict TypeScript only with zero 'any' types.",\n    "Never install new npm packages without explicit permission.",\n    "Always use Tailwind CSS utility tokens matching emerald/mint palette.",\n    "Run 'npm run test' to verify all logic changes before outputting final diffs."\n  ]\n}`,
                    explanation: "Declarative project boundary file that ensures the AI assistant complies with team coding standards."
                  }
                ],
                practiceQuestions: [
                  "Why does full-repository vector indexing perform better than blind file copy-pasting into web chats?",
                  "What security risks arise when pasting proprietary codebase snippets into third-party cloud LLM providers?",
                  "How do .cursorrules enforce project invariants across large engineering teams?"
                ],
                mcqQuestions: [
                  {
                    id: "ai-q1",
                    question: "How does Cursor IDE's @codebase feature determine which files to include in the model context window?",
                    options: [
                      "It blindly sends all files in the directory regardless of size",
                      "It uses semantic vector search and AST symbol graphs to retrieve only relevant code slices",
                      "It only looks at the currently open active tab in the editor",
                      "It runs an external Google web search on the repository name"
                    ],
                    correctIndex: 1,
                    explanation: "Cursor uses embeddings and local vector indexes to perform semantic retrieval over your repository, pulling only high-relevance code chunks into the prompt."
                  },
                  {
                    id: "ai-q2",
                    question: "What is the primary danger of blindly accepting multi-file AI code generation without reading the diff?",
                    options: [
                      "The compiler will refuse to compile any AI generated code",
                      "The AI may hallucinate non-existent package methods or introduce silent race conditions and security vulnerabilities",
                      "The code editor automatically deletes your git repository",
                      "AI code generation runs 100x slower than typing by hand"
                    ],
                    correctIndex: 1,
                    explanation: "LLMs generate plausible token sequences that may appear syntactically correct while introducing subtle logic bugs, unvalidated inputs, or hallucinated APIs."
                  }
                ],
                assignment: {
                  title: "Author Production .cursorrules & Refactor Code",
                  description: "Create a production .cursorrules file for a TypeScript project, configure strict type rules, and prompt Cursor Composer to refactor a messy module with 100% test coverage.",
                  deliverables: [
                    "A validated .cursorrules configuration file",
                    "Git diff demonstrating multi-file refactoring with zero compiler warnings",
                    "A test suite passing with deterministic exit code 0"
                  ]
                }
              }
            ]
          }
        ]
      },
      {
        id: "native-android-kotlin-jetpack",
        title: "Modern Native Android Architecture with Kotlin & Jetpack Compose",
        subtitle: "Declarative UI, Coroutines, StateFlow, Room Database, and Material 3 design",
        description: "Master modern Android engineering: Jetpack Compose reactive state, asynchronous Coroutines, dependency injection with Hilt, and Room SQLite caching.",
        domainId: "mobile-app-development",
        icon: "🤖",
        difficulty: "Intermediate",
        durationHours: 40,
        technologies: ["Kotlin", "Jetpack Compose", "Coroutines & Flow", "Room DB", "Hilt Dagger", "Retrofit"],
        careerTags: ["Android Engineer", "Mobile Systems Developer", "App Architect"],
        image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=600&q=80",
        featured: false,
        isPublished: true,
        modules: [
          {
            id: "ai-tools-mod-01",
            title: "AI Developer Tooling & Velocity Workflows",
            description: "Cursor IDE, AI Codebase Indexing, Prompt Architectures, and Automated Unit Tests.",
            order: 1,
            lessons: [
              {
                id: "ai-tools-cursor-workflow",
                title: "Cursor AI IDE: Multi-File Edits, Codebase Indexing & .cursorrules",
                order: 1,
                duration: "40 min interactive sprint",
                difficulty: "Beginner",
                learningObjectives: [
                  "Understand how AI code editors build semantic vector indexes over your repository.",
                  "Master Composer (Cmd+I) and inline diff generation (Cmd+K) without introducing subtle bugs.",
                  "Enforce engineering standards and prevent hallucinations using strict .cursorrules and system instructions."
                ],
                overview: `Artificial Intelligence has transformed software engineering from manual syntax typing into high-leverage architectural orchestration. Modern AI-native IDEs like Cursor index your entire repository into a local semantic vector database. When you query the model using @codebase or ask for multi-file refactors, the IDE retrieves only the most relevant AST (Abstract Syntax Tree) slices, symbol declarations, and dependency trees to build a pinpoint context window for frontier models such as Claude 3.5 Sonnet.

However, unchecked reliance on AI code generators produces insidious architectural debt: hallucinations, ghost dependencies, security vulnerabilities, and brittle unmaintainable spaghetti code. Professional software engineers do not use AI as a replacement for thinking; they use it as an ultra-fast junior developer that must be strictly bounded.

By authoring explicit project rule files (such as .cursorrules or AGENTS.md), you define project invariants: language versions, mandatory typing conventions, forbidden dependencies, and directory structures. Furthermore, pairing AI code generation with immediate terminal test execution creates a self-healing development loop that increases velocity while preserving production safety.`,
                keyConcepts: [
                  {
                    title: "Codebase Semantic Indexing",
                    explanation: "Code files are parsed into semantic chunks and embedded into high-dimensional vectors, allowing natural language search over entire codebases."
                  },
                  {
                    title: "Prompt Architectures & Invariant Rules",
                    explanation: ".cursorrules and project system prompts act as guardrails, forcing the LLM to follow existing patterns and type signatures."
                  },
                  {
                    title: "Self-Healing Test Driven Loops",
                    explanation: "Directly piping compiler stderr and unit test failures back into the model context window allows it to resolve syntax and logic errors in seconds."
                  }
                ],
                practicalExamples: [
                  {
                    title: "Multi-File Authentication Refactor",
                    scenario: "Refactoring a Next.js App Router codebase from legacy cookie sessions to Supabase SSR JWT auth across 8 files simultaneously.",
                    takeaway: "Using Cursor Composer with explicit file mentions guarantees consistent imports and type signatures across routes and middleware."
                  },
                  {
                    title: "Automated Edge-Case Test Generation",
                    scenario: "Generating comprehensive Jest/Vitest test suites for a complex financial calculation function with negative inputs and floating point boundaries.",
                    takeaway: "AI excels at generating boundary condition tests that human engineers often overlook due to confirmation bias."
                  }
                ],
                codeSamples: [
                  {
                    language: "json",
                    filename: ".cursorrules",
                    code: `{\n  "version": "1.0",\n  "project": "CampusGrow Core",\n  "rules": [\n    "Strict TypeScript only with zero 'any' types.",\n    "Never install new npm packages without explicit permission.",\n    "Always use Tailwind CSS utility tokens matching emerald/mint palette.",\n    "Run 'npm run test' to verify all logic changes before outputting final diffs."\n  ]\n}`,
                    explanation: "Declarative project boundary file that ensures the AI assistant complies with team coding standards."
                  }
                ],
                practiceQuestions: [
                  "Why does full-repository vector indexing perform better than blind file copy-pasting into web chats?",
                  "What security risks arise when pasting proprietary codebase snippets into third-party cloud LLM providers?",
                  "How do .cursorrules enforce project invariants across large engineering teams?"
                ],
                mcqQuestions: [
                  {
                    id: "ai-q1",
                    question: "How does Cursor IDE's @codebase feature determine which files to include in the model context window?",
                    options: [
                      "It blindly sends all files in the directory regardless of size",
                      "It uses semantic vector search and AST symbol graphs to retrieve only relevant code slices",
                      "It only looks at the currently open active tab in the editor",
                      "It runs an external Google web search on the repository name"
                    ],
                    correctIndex: 1,
                    explanation: "Cursor uses embeddings and local vector indexes to perform semantic retrieval over your repository, pulling only high-relevance code chunks into the prompt."
                  },
                  {
                    id: "ai-q2",
                    question: "What is the primary danger of blindly accepting multi-file AI code generation without reading the diff?",
                    options: [
                      "The compiler will refuse to compile any AI generated code",
                      "The AI may hallucinate non-existent package methods or introduce silent race conditions and security vulnerabilities",
                      "The code editor automatically deletes your git repository",
                      "AI code generation runs 100x slower than typing by hand"
                    ],
                    correctIndex: 1,
                    explanation: "LLMs generate plausible token sequences that may appear syntactically correct while introducing subtle logic bugs, unvalidated inputs, or hallucinated APIs."
                  }
                ],
                assignment: {
                  title: "Author Production .cursorrules & Refactor Code",
                  description: "Create a production .cursorrules file for a TypeScript project, configure strict type rules, and prompt Cursor Composer to refactor a messy module with 100% test coverage.",
                  deliverables: [
                    "A validated .cursorrules configuration file",
                    "Git diff demonstrating multi-file refactoring with zero compiler warnings",
                    "A test suite passing with deterministic exit code 0"
                  ]
                }
              }
            ]
          }
        ]
      },
    ]
  },

  // 5. Artificial Intelligence and Machine Learning
  {
    id: "ai-and-ml",
    number: 5,
    title: "Artificial Intelligence & Machine Learning",
    subtitle: "Mathematical Foundations, Deep Neural Networks & Computer Vision",
    description: "Understand the mathematical intuition, build PyTorch neural networks, train transformer architectures, analyze images with OpenCV, and fine-tune open-source models.",
    icon: "🤖",
    badge: "AI/ML Core",
    color: "from-purple-600 to-indigo-700",
    technologies: ["Python", "NumPy", "Pandas", "Scikit-Learn", "PyTorch", "TensorFlow", "OpenCV", "Transformers", "NLP", "Computer Vision"],
    courses: [
      {
        id: "deep-learning-pytorch-transformers",
        title: "Deep Learning, PyTorch & Transformer Architectures",
        subtitle: "Backpropagation, CNNs, RNNs, Self-Attention, and LLM fine-tuning",
        description: "From tensor mathematics and automatic differentiation to building custom transformer attention heads in PyTorch from scratch.",
        domainId: "ai-and-ml",
        icon: "🔥",
        difficulty: "Advanced",
        durationHours: 45,
        technologies: ["PyTorch", "Transformers", "Attention Mechanism", "Hugging Face", "CUDA", "Backpropagation"],
        careerTags: ["AI Engineer", "Machine Learning Engineer", "Deep Learning Researcher"],
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80",
        featured: true,
        isPublished: true,
        modules: [
          {
            id: "ai-tools-mod-01",
            title: "AI Developer Tooling & Velocity Workflows",
            description: "Cursor IDE, AI Codebase Indexing, Prompt Architectures, and Automated Unit Tests.",
            order: 1,
            lessons: [
              {
                id: "ai-tools-cursor-workflow",
                title: "Cursor AI IDE: Multi-File Edits, Codebase Indexing & .cursorrules",
                order: 1,
                duration: "40 min interactive sprint",
                difficulty: "Beginner",
                learningObjectives: [
                  "Understand how AI code editors build semantic vector indexes over your repository.",
                  "Master Composer (Cmd+I) and inline diff generation (Cmd+K) without introducing subtle bugs.",
                  "Enforce engineering standards and prevent hallucinations using strict .cursorrules and system instructions."
                ],
                overview: `Artificial Intelligence has transformed software engineering from manual syntax typing into high-leverage architectural orchestration. Modern AI-native IDEs like Cursor index your entire repository into a local semantic vector database. When you query the model using @codebase or ask for multi-file refactors, the IDE retrieves only the most relevant AST (Abstract Syntax Tree) slices, symbol declarations, and dependency trees to build a pinpoint context window for frontier models such as Claude 3.5 Sonnet.

However, unchecked reliance on AI code generators produces insidious architectural debt: hallucinations, ghost dependencies, security vulnerabilities, and brittle unmaintainable spaghetti code. Professional software engineers do not use AI as a replacement for thinking; they use it as an ultra-fast junior developer that must be strictly bounded.

By authoring explicit project rule files (such as .cursorrules or AGENTS.md), you define project invariants: language versions, mandatory typing conventions, forbidden dependencies, and directory structures. Furthermore, pairing AI code generation with immediate terminal test execution creates a self-healing development loop that increases velocity while preserving production safety.`,
                keyConcepts: [
                  {
                    title: "Codebase Semantic Indexing",
                    explanation: "Code files are parsed into semantic chunks and embedded into high-dimensional vectors, allowing natural language search over entire codebases."
                  },
                  {
                    title: "Prompt Architectures & Invariant Rules",
                    explanation: ".cursorrules and project system prompts act as guardrails, forcing the LLM to follow existing patterns and type signatures."
                  },
                  {
                    title: "Self-Healing Test Driven Loops",
                    explanation: "Directly piping compiler stderr and unit test failures back into the model context window allows it to resolve syntax and logic errors in seconds."
                  }
                ],
                practicalExamples: [
                  {
                    title: "Multi-File Authentication Refactor",
                    scenario: "Refactoring a Next.js App Router codebase from legacy cookie sessions to Supabase SSR JWT auth across 8 files simultaneously.",
                    takeaway: "Using Cursor Composer with explicit file mentions guarantees consistent imports and type signatures across routes and middleware."
                  },
                  {
                    title: "Automated Edge-Case Test Generation",
                    scenario: "Generating comprehensive Jest/Vitest test suites for a complex financial calculation function with negative inputs and floating point boundaries.",
                    takeaway: "AI excels at generating boundary condition tests that human engineers often overlook due to confirmation bias."
                  }
                ],
                codeSamples: [
                  {
                    language: "json",
                    filename: ".cursorrules",
                    code: `{\n  "version": "1.0",\n  "project": "CampusGrow Core",\n  "rules": [\n    "Strict TypeScript only with zero 'any' types.",\n    "Never install new npm packages without explicit permission.",\n    "Always use Tailwind CSS utility tokens matching emerald/mint palette.",\n    "Run 'npm run test' to verify all logic changes before outputting final diffs."\n  ]\n}`,
                    explanation: "Declarative project boundary file that ensures the AI assistant complies with team coding standards."
                  }
                ],
                practiceQuestions: [
                  "Why does full-repository vector indexing perform better than blind file copy-pasting into web chats?",
                  "What security risks arise when pasting proprietary codebase snippets into third-party cloud LLM providers?",
                  "How do .cursorrules enforce project invariants across large engineering teams?"
                ],
                mcqQuestions: [
                  {
                    id: "ai-q1",
                    question: "How does Cursor IDE's @codebase feature determine which files to include in the model context window?",
                    options: [
                      "It blindly sends all files in the directory regardless of size",
                      "It uses semantic vector search and AST symbol graphs to retrieve only relevant code slices",
                      "It only looks at the currently open active tab in the editor",
                      "It runs an external Google web search on the repository name"
                    ],
                    correctIndex: 1,
                    explanation: "Cursor uses embeddings and local vector indexes to perform semantic retrieval over your repository, pulling only high-relevance code chunks into the prompt."
                  },
                  {
                    id: "ai-q2",
                    question: "What is the primary danger of blindly accepting multi-file AI code generation without reading the diff?",
                    options: [
                      "The compiler will refuse to compile any AI generated code",
                      "The AI may hallucinate non-existent package methods or introduce silent race conditions and security vulnerabilities",
                      "The code editor automatically deletes your git repository",
                      "AI code generation runs 100x slower than typing by hand"
                    ],
                    correctIndex: 1,
                    explanation: "LLMs generate plausible token sequences that may appear syntactically correct while introducing subtle logic bugs, unvalidated inputs, or hallucinated APIs."
                  }
                ],
                assignment: {
                  title: "Author Production .cursorrules & Refactor Code",
                  description: "Create a production .cursorrules file for a TypeScript project, configure strict type rules, and prompt Cursor Composer to refactor a messy module with 100% test coverage.",
                  deliverables: [
                    "A validated .cursorrules configuration file",
                    "Git diff demonstrating multi-file refactoring with zero compiler warnings",
                    "A test suite passing with deterministic exit code 0"
                  ]
                }
              }
            ]
          }
        ]
      }
    ,
      {
        id: "machine-learning-scikit-algorithms",
        title: "Applied Machine Learning & Statistical Modeling Algorithms",
        subtitle: "Linear & Logistic Regression, Decision Trees, Random Forests, and XGBoost",
        description: "Master real-world machine learning algorithms from mathematical derivation to hyperparameter tuning and model evaluation on real datasets.",
        domainId: "ai-and-ml",
        icon: "📊",
        difficulty: "Intermediate",
        durationHours: 35,
        technologies: ["Scikit-Learn", "XGBoost", "Feature Engineering", "Pandas", "Cross-Validation", "Matplotlib"],
        careerTags: ["Machine Learning Engineer", "Data Scientist", "Predictive Modeler"],
        image: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?auto=format&fit=crop&w=600&q=80",
        featured: true,
        isPublished: true,
        modules: [
          {
            id: "ai-tools-mod-01",
            title: "AI Developer Tooling & Velocity Workflows",
            description: "Cursor IDE, AI Codebase Indexing, Prompt Architectures, and Automated Unit Tests.",
            order: 1,
            lessons: [
              {
                id: "ai-tools-cursor-workflow",
                title: "Cursor AI IDE: Multi-File Edits, Codebase Indexing & .cursorrules",
                order: 1,
                duration: "40 min interactive sprint",
                difficulty: "Beginner",
                learningObjectives: [
                  "Understand how AI code editors build semantic vector indexes over your repository.",
                  "Master Composer (Cmd+I) and inline diff generation (Cmd+K) without introducing subtle bugs.",
                  "Enforce engineering standards and prevent hallucinations using strict .cursorrules and system instructions."
                ],
                overview: `Artificial Intelligence has transformed software engineering from manual syntax typing into high-leverage architectural orchestration. Modern AI-native IDEs like Cursor index your entire repository into a local semantic vector database. When you query the model using @codebase or ask for multi-file refactors, the IDE retrieves only the most relevant AST (Abstract Syntax Tree) slices, symbol declarations, and dependency trees to build a pinpoint context window for frontier models such as Claude 3.5 Sonnet.

However, unchecked reliance on AI code generators produces insidious architectural debt: hallucinations, ghost dependencies, security vulnerabilities, and brittle unmaintainable spaghetti code. Professional software engineers do not use AI as a replacement for thinking; they use it as an ultra-fast junior developer that must be strictly bounded.

By authoring explicit project rule files (such as .cursorrules or AGENTS.md), you define project invariants: language versions, mandatory typing conventions, forbidden dependencies, and directory structures. Furthermore, pairing AI code generation with immediate terminal test execution creates a self-healing development loop that increases velocity while preserving production safety.`,
                keyConcepts: [
                  {
                    title: "Codebase Semantic Indexing",
                    explanation: "Code files are parsed into semantic chunks and embedded into high-dimensional vectors, allowing natural language search over entire codebases."
                  },
                  {
                    title: "Prompt Architectures & Invariant Rules",
                    explanation: ".cursorrules and project system prompts act as guardrails, forcing the LLM to follow existing patterns and type signatures."
                  },
                  {
                    title: "Self-Healing Test Driven Loops",
                    explanation: "Directly piping compiler stderr and unit test failures back into the model context window allows it to resolve syntax and logic errors in seconds."
                  }
                ],
                practicalExamples: [
                  {
                    title: "Multi-File Authentication Refactor",
                    scenario: "Refactoring a Next.js App Router codebase from legacy cookie sessions to Supabase SSR JWT auth across 8 files simultaneously.",
                    takeaway: "Using Cursor Composer with explicit file mentions guarantees consistent imports and type signatures across routes and middleware."
                  },
                  {
                    title: "Automated Edge-Case Test Generation",
                    scenario: "Generating comprehensive Jest/Vitest test suites for a complex financial calculation function with negative inputs and floating point boundaries.",
                    takeaway: "AI excels at generating boundary condition tests that human engineers often overlook due to confirmation bias."
                  }
                ],
                codeSamples: [
                  {
                    language: "json",
                    filename: ".cursorrules",
                    code: `{\n  "version": "1.0",\n  "project": "CampusGrow Core",\n  "rules": [\n    "Strict TypeScript only with zero 'any' types.",\n    "Never install new npm packages without explicit permission.",\n    "Always use Tailwind CSS utility tokens matching emerald/mint palette.",\n    "Run 'npm run test' to verify all logic changes before outputting final diffs."\n  ]\n}`,
                    explanation: "Declarative project boundary file that ensures the AI assistant complies with team coding standards."
                  }
                ],
                practiceQuestions: [
                  "Why does full-repository vector indexing perform better than blind file copy-pasting into web chats?",
                  "What security risks arise when pasting proprietary codebase snippets into third-party cloud LLM providers?",
                  "How do .cursorrules enforce project invariants across large engineering teams?"
                ],
                mcqQuestions: [
                  {
                    id: "ai-q1",
                    question: "How does Cursor IDE's @codebase feature determine which files to include in the model context window?",
                    options: [
                      "It blindly sends all files in the directory regardless of size",
                      "It uses semantic vector search and AST symbol graphs to retrieve only relevant code slices",
                      "It only looks at the currently open active tab in the editor",
                      "It runs an external Google web search on the repository name"
                    ],
                    correctIndex: 1,
                    explanation: "Cursor uses embeddings and local vector indexes to perform semantic retrieval over your repository, pulling only high-relevance code chunks into the prompt."
                  },
                  {
                    id: "ai-q2",
                    question: "What is the primary danger of blindly accepting multi-file AI code generation without reading the diff?",
                    options: [
                      "The compiler will refuse to compile any AI generated code",
                      "The AI may hallucinate non-existent package methods or introduce silent race conditions and security vulnerabilities",
                      "The code editor automatically deletes your git repository",
                      "AI code generation runs 100x slower than typing by hand"
                    ],
                    correctIndex: 1,
                    explanation: "LLMs generate plausible token sequences that may appear syntactically correct while introducing subtle logic bugs, unvalidated inputs, or hallucinated APIs."
                  }
                ],
                assignment: {
                  title: "Author Production .cursorrules & Refactor Code",
                  description: "Create a production .cursorrules file for a TypeScript project, configure strict type rules, and prompt Cursor Composer to refactor a messy module with 100% test coverage.",
                  deliverables: [
                    "A validated .cursorrules configuration file",
                    "Git diff demonstrating multi-file refactoring with zero compiler warnings",
                    "A test suite passing with deterministic exit code 0"
                  ]
                }
              }
            ]
          }
        ]
      },
      {
        id: "computer-vision-opencv-deeplearning",
        title: "Computer Vision with OpenCV, YOLOv8 & Deep Learning CNNs",
        subtitle: "Image filtering, edge detection, object detection, and video telemetry streaming",
        description: "Build real-time computer vision systems: OpenCV image transforms, convolutional feature extractors, YOLOv8 multi-class object detection, and video processing.",
        domainId: "ai-and-ml",
        icon: "👁️",
        difficulty: "Advanced",
        durationHours: 35,
        technologies: ["OpenCV", "YOLOv8", "Convolutional Neural Networks", "Image Filtering", "PyTorch", "Video Analytics"],
        careerTags: ["Computer Vision Engineer", "Robotics AI Specialist", "Deep Learning Engineer"],
        image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=600&q=80",
        featured: false,
        isPublished: true,
        modules: [
          {
            id: "ai-tools-mod-01",
            title: "AI Developer Tooling & Velocity Workflows",
            description: "Cursor IDE, AI Codebase Indexing, Prompt Architectures, and Automated Unit Tests.",
            order: 1,
            lessons: [
              {
                id: "ai-tools-cursor-workflow",
                title: "Cursor AI IDE: Multi-File Edits, Codebase Indexing & .cursorrules",
                order: 1,
                duration: "40 min interactive sprint",
                difficulty: "Beginner",
                learningObjectives: [
                  "Understand how AI code editors build semantic vector indexes over your repository.",
                  "Master Composer (Cmd+I) and inline diff generation (Cmd+K) without introducing subtle bugs.",
                  "Enforce engineering standards and prevent hallucinations using strict .cursorrules and system instructions."
                ],
                overview: `Artificial Intelligence has transformed software engineering from manual syntax typing into high-leverage architectural orchestration. Modern AI-native IDEs like Cursor index your entire repository into a local semantic vector database. When you query the model using @codebase or ask for multi-file refactors, the IDE retrieves only the most relevant AST (Abstract Syntax Tree) slices, symbol declarations, and dependency trees to build a pinpoint context window for frontier models such as Claude 3.5 Sonnet.

However, unchecked reliance on AI code generators produces insidious architectural debt: hallucinations, ghost dependencies, security vulnerabilities, and brittle unmaintainable spaghetti code. Professional software engineers do not use AI as a replacement for thinking; they use it as an ultra-fast junior developer that must be strictly bounded.

By authoring explicit project rule files (such as .cursorrules or AGENTS.md), you define project invariants: language versions, mandatory typing conventions, forbidden dependencies, and directory structures. Furthermore, pairing AI code generation with immediate terminal test execution creates a self-healing development loop that increases velocity while preserving production safety.`,
                keyConcepts: [
                  {
                    title: "Codebase Semantic Indexing",
                    explanation: "Code files are parsed into semantic chunks and embedded into high-dimensional vectors, allowing natural language search over entire codebases."
                  },
                  {
                    title: "Prompt Architectures & Invariant Rules",
                    explanation: ".cursorrules and project system prompts act as guardrails, forcing the LLM to follow existing patterns and type signatures."
                  },
                  {
                    title: "Self-Healing Test Driven Loops",
                    explanation: "Directly piping compiler stderr and unit test failures back into the model context window allows it to resolve syntax and logic errors in seconds."
                  }
                ],
                practicalExamples: [
                  {
                    title: "Multi-File Authentication Refactor",
                    scenario: "Refactoring a Next.js App Router codebase from legacy cookie sessions to Supabase SSR JWT auth across 8 files simultaneously.",
                    takeaway: "Using Cursor Composer with explicit file mentions guarantees consistent imports and type signatures across routes and middleware."
                  },
                  {
                    title: "Automated Edge-Case Test Generation",
                    scenario: "Generating comprehensive Jest/Vitest test suites for a complex financial calculation function with negative inputs and floating point boundaries.",
                    takeaway: "AI excels at generating boundary condition tests that human engineers often overlook due to confirmation bias."
                  }
                ],
                codeSamples: [
                  {
                    language: "json",
                    filename: ".cursorrules",
                    code: `{\n  "version": "1.0",\n  "project": "CampusGrow Core",\n  "rules": [\n    "Strict TypeScript only with zero 'any' types.",\n    "Never install new npm packages without explicit permission.",\n    "Always use Tailwind CSS utility tokens matching emerald/mint palette.",\n    "Run 'npm run test' to verify all logic changes before outputting final diffs."\n  ]\n}`,
                    explanation: "Declarative project boundary file that ensures the AI assistant complies with team coding standards."
                  }
                ],
                practiceQuestions: [
                  "Why does full-repository vector indexing perform better than blind file copy-pasting into web chats?",
                  "What security risks arise when pasting proprietary codebase snippets into third-party cloud LLM providers?",
                  "How do .cursorrules enforce project invariants across large engineering teams?"
                ],
                mcqQuestions: [
                  {
                    id: "ai-q1",
                    question: "How does Cursor IDE's @codebase feature determine which files to include in the model context window?",
                    options: [
                      "It blindly sends all files in the directory regardless of size",
                      "It uses semantic vector search and AST symbol graphs to retrieve only relevant code slices",
                      "It only looks at the currently open active tab in the editor",
                      "It runs an external Google web search on the repository name"
                    ],
                    correctIndex: 1,
                    explanation: "Cursor uses embeddings and local vector indexes to perform semantic retrieval over your repository, pulling only high-relevance code chunks into the prompt."
                  },
                  {
                    id: "ai-q2",
                    question: "What is the primary danger of blindly accepting multi-file AI code generation without reading the diff?",
                    options: [
                      "The compiler will refuse to compile any AI generated code",
                      "The AI may hallucinate non-existent package methods or introduce silent race conditions and security vulnerabilities",
                      "The code editor automatically deletes your git repository",
                      "AI code generation runs 100x slower than typing by hand"
                    ],
                    correctIndex: 1,
                    explanation: "LLMs generate plausible token sequences that may appear syntactically correct while introducing subtle logic bugs, unvalidated inputs, or hallucinated APIs."
                  }
                ],
                assignment: {
                  title: "Author Production .cursorrules & Refactor Code",
                  description: "Create a production .cursorrules file for a TypeScript project, configure strict type rules, and prompt Cursor Composer to refactor a messy module with 100% test coverage.",
                  deliverables: [
                    "A validated .cursorrules configuration file",
                    "Git diff demonstrating multi-file refactoring with zero compiler warnings",
                    "A test suite passing with deterministic exit code 0"
                  ]
                }
              }
            ]
          }
        ]
      },
    ]
  },

  // 6. AI Tools and Agentic AI
  {
    id: "ai-tools-and-agents",
    number: 6,
    title: "AI Tools & Agentic AI",
    subtitle: "Generative AI, RAG Systems, Autonomous Agents & Model Context Protocol",
    description: "Harness the revolutionary era of Agentic AI: LangChain, LangGraph, LlamaIndex, Model Context Protocol (MCP), Cursor AI, local models with Ollama, and autonomous multi-agent swarms.",
    icon: "✨",
    badge: "Cutting-Edge AI",
    color: "from-emerald-500 to-teal-700",
    technologies: ["LangChain", "LangGraph", "LlamaIndex", "MCP", "RAG", "Ollama", "Cursor", "Gemini API", "Claude", "ChatGPT"],
    courses: [
      {
        id: "autonomous-ai-agents-rag",
        title: "Building Autonomous AI Agents, RAG & MCP Systems",
        subtitle: "LangGraph workflows, vector retrieval, function calling, and multi-agent coordination",
        description: "Learn how modern enterprise AI applications actually work: chunking strategies, vector embeddings with Milvus/Pinecone, tool calling, and MCP server development.",
        domainId: "ai-tools-and-agents",
        icon: "🧠",
        difficulty: "Intermediate",
        durationHours: 35,
        technologies: ["LangGraph", "LlamaIndex", "Model Context Protocol", "Vector DBs", "RAG", "Ollama"],
        careerTags: ["AI Solutions Architect", "Agentic AI Developer", "GenAI Engineer"],
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
        featured: true,
        isPublished: true,
        modules: [
          {
            id: "ai-tools-mod-01",
            title: "AI Developer Tooling & Velocity Workflows",
            description: "Cursor IDE, AI Codebase Indexing, Prompt Architectures, and Automated Unit Tests.",
            order: 1,
            lessons: [
              {
                id: "ai-tools-cursor-workflow",
                title: "Cursor AI IDE: Multi-File Edits, Codebase Indexing & .cursorrules",
                order: 1,
                duration: "40 min interactive sprint",
                difficulty: "Beginner",
                learningObjectives: [
                  "Understand how AI code editors build semantic vector indexes over your repository.",
                  "Master Composer (Cmd+I) and inline diff generation (Cmd+K) without introducing subtle bugs.",
                  "Enforce engineering standards and prevent hallucinations using strict .cursorrules and system instructions."
                ],
                overview: `Artificial Intelligence has transformed software engineering from manual syntax typing into high-leverage architectural orchestration. Modern AI-native IDEs like Cursor index your entire repository into a local semantic vector database. When you query the model using @codebase or ask for multi-file refactors, the IDE retrieves only the most relevant AST (Abstract Syntax Tree) slices, symbol declarations, and dependency trees to build a pinpoint context window for frontier models such as Claude 3.5 Sonnet.

However, unchecked reliance on AI code generators produces insidious architectural debt: hallucinations, ghost dependencies, security vulnerabilities, and brittle unmaintainable spaghetti code. Professional software engineers do not use AI as a replacement for thinking; they use it as an ultra-fast junior developer that must be strictly bounded.

By authoring explicit project rule files (such as .cursorrules or AGENTS.md), you define project invariants: language versions, mandatory typing conventions, forbidden dependencies, and directory structures. Furthermore, pairing AI code generation with immediate terminal test execution creates a self-healing development loop that increases velocity while preserving production safety.`,
                keyConcepts: [
                  {
                    title: "Codebase Semantic Indexing",
                    explanation: "Code files are parsed into semantic chunks and embedded into high-dimensional vectors, allowing natural language search over entire codebases."
                  },
                  {
                    title: "Prompt Architectures & Invariant Rules",
                    explanation: ".cursorrules and project system prompts act as guardrails, forcing the LLM to follow existing patterns and type signatures."
                  },
                  {
                    title: "Self-Healing Test Driven Loops",
                    explanation: "Directly piping compiler stderr and unit test failures back into the model context window allows it to resolve syntax and logic errors in seconds."
                  }
                ],
                practicalExamples: [
                  {
                    title: "Multi-File Authentication Refactor",
                    scenario: "Refactoring a Next.js App Router codebase from legacy cookie sessions to Supabase SSR JWT auth across 8 files simultaneously.",
                    takeaway: "Using Cursor Composer with explicit file mentions guarantees consistent imports and type signatures across routes and middleware."
                  },
                  {
                    title: "Automated Edge-Case Test Generation",
                    scenario: "Generating comprehensive Jest/Vitest test suites for a complex financial calculation function with negative inputs and floating point boundaries.",
                    takeaway: "AI excels at generating boundary condition tests that human engineers often overlook due to confirmation bias."
                  }
                ],
                codeSamples: [
                  {
                    language: "json",
                    filename: ".cursorrules",
                    code: `{\n  "version": "1.0",\n  "project": "CampusGrow Core",\n  "rules": [\n    "Strict TypeScript only with zero 'any' types.",\n    "Never install new npm packages without explicit permission.",\n    "Always use Tailwind CSS utility tokens matching emerald/mint palette.",\n    "Run 'npm run test' to verify all logic changes before outputting final diffs."\n  ]\n}`,
                    explanation: "Declarative project boundary file that ensures the AI assistant complies with team coding standards."
                  }
                ],
                practiceQuestions: [
                  "Why does full-repository vector indexing perform better than blind file copy-pasting into web chats?",
                  "What security risks arise when pasting proprietary codebase snippets into third-party cloud LLM providers?",
                  "How do .cursorrules enforce project invariants across large engineering teams?"
                ],
                mcqQuestions: [
                  {
                    id: "ai-q1",
                    question: "How does Cursor IDE's @codebase feature determine which files to include in the model context window?",
                    options: [
                      "It blindly sends all files in the directory regardless of size",
                      "It uses semantic vector search and AST symbol graphs to retrieve only relevant code slices",
                      "It only looks at the currently open active tab in the editor",
                      "It runs an external Google web search on the repository name"
                    ],
                    correctIndex: 1,
                    explanation: "Cursor uses embeddings and local vector indexes to perform semantic retrieval over your repository, pulling only high-relevance code chunks into the prompt."
                  },
                  {
                    id: "ai-q2",
                    question: "What is the primary danger of blindly accepting multi-file AI code generation without reading the diff?",
                    options: [
                      "The compiler will refuse to compile any AI generated code",
                      "The AI may hallucinate non-existent package methods or introduce silent race conditions and security vulnerabilities",
                      "The code editor automatically deletes your git repository",
                      "AI code generation runs 100x slower than typing by hand"
                    ],
                    correctIndex: 1,
                    explanation: "LLMs generate plausible token sequences that may appear syntactically correct while introducing subtle logic bugs, unvalidated inputs, or hallucinated APIs."
                  }
                ],
                assignment: {
                  title: "Author Production .cursorrules & Refactor Code",
                  description: "Create a production .cursorrules file for a TypeScript project, configure strict type rules, and prompt Cursor Composer to refactor a messy module with 100% test coverage.",
                  deliverables: [
                    "A validated .cursorrules configuration file",
                    "Git diff demonstrating multi-file refactoring with zero compiler warnings",
                    "A test suite passing with deterministic exit code 0"
                  ]
                }
              }
            ]
          }
        ]
      }
    ,
      {
        id: "model-context-protocol-mcp-tools",
        title: "Model Context Protocol (MCP) & Custom Agent Tools",
        subtitle: "Building custom MCP server endpoints, terminal automation, and local LLM tool calling",
        description: "Master Anthropic's Model Context Protocol (MCP): develop custom server tools, connect SQLite and Git to LLMs, and build autonomous agents that interact with files and APIs.",
        domainId: "ai-tools-and-agents",
        icon: "🔌",
        difficulty: "Intermediate",
        durationHours: 30,
        technologies: ["Model Context Protocol", "TypeScript", "Python", "Local Tool Calling", "FastMCP", "Ollama"],
        careerTags: ["Agentic AI Engineer", "AI Tooling Specialist", "Full-Stack AI Developer"],
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
        featured: true,
        isPublished: true,
        modules: [
          {
            id: "ai-tools-mod-01",
            title: "AI Developer Tooling & Velocity Workflows",
            description: "Cursor IDE, AI Codebase Indexing, Prompt Architectures, and Automated Unit Tests.",
            order: 1,
            lessons: [
              {
                id: "ai-tools-cursor-workflow",
                title: "Cursor AI IDE: Multi-File Edits, Codebase Indexing & .cursorrules",
                order: 1,
                duration: "40 min interactive sprint",
                difficulty: "Beginner",
                learningObjectives: [
                  "Understand how AI code editors build semantic vector indexes over your repository.",
                  "Master Composer (Cmd+I) and inline diff generation (Cmd+K) without introducing subtle bugs.",
                  "Enforce engineering standards and prevent hallucinations using strict .cursorrules and system instructions."
                ],
                overview: `Artificial Intelligence has transformed software engineering from manual syntax typing into high-leverage architectural orchestration. Modern AI-native IDEs like Cursor index your entire repository into a local semantic vector database. When you query the model using @codebase or ask for multi-file refactors, the IDE retrieves only the most relevant AST (Abstract Syntax Tree) slices, symbol declarations, and dependency trees to build a pinpoint context window for frontier models such as Claude 3.5 Sonnet.

However, unchecked reliance on AI code generators produces insidious architectural debt: hallucinations, ghost dependencies, security vulnerabilities, and brittle unmaintainable spaghetti code. Professional software engineers do not use AI as a replacement for thinking; they use it as an ultra-fast junior developer that must be strictly bounded.

By authoring explicit project rule files (such as .cursorrules or AGENTS.md), you define project invariants: language versions, mandatory typing conventions, forbidden dependencies, and directory structures. Furthermore, pairing AI code generation with immediate terminal test execution creates a self-healing development loop that increases velocity while preserving production safety.`,
                keyConcepts: [
                  {
                    title: "Codebase Semantic Indexing",
                    explanation: "Code files are parsed into semantic chunks and embedded into high-dimensional vectors, allowing natural language search over entire codebases."
                  },
                  {
                    title: "Prompt Architectures & Invariant Rules",
                    explanation: ".cursorrules and project system prompts act as guardrails, forcing the LLM to follow existing patterns and type signatures."
                  },
                  {
                    title: "Self-Healing Test Driven Loops",
                    explanation: "Directly piping compiler stderr and unit test failures back into the model context window allows it to resolve syntax and logic errors in seconds."
                  }
                ],
                practicalExamples: [
                  {
                    title: "Multi-File Authentication Refactor",
                    scenario: "Refactoring a Next.js App Router codebase from legacy cookie sessions to Supabase SSR JWT auth across 8 files simultaneously.",
                    takeaway: "Using Cursor Composer with explicit file mentions guarantees consistent imports and type signatures across routes and middleware."
                  },
                  {
                    title: "Automated Edge-Case Test Generation",
                    scenario: "Generating comprehensive Jest/Vitest test suites for a complex financial calculation function with negative inputs and floating point boundaries.",
                    takeaway: "AI excels at generating boundary condition tests that human engineers often overlook due to confirmation bias."
                  }
                ],
                codeSamples: [
                  {
                    language: "json",
                    filename: ".cursorrules",
                    code: `{\n  "version": "1.0",\n  "project": "CampusGrow Core",\n  "rules": [\n    "Strict TypeScript only with zero 'any' types.",\n    "Never install new npm packages without explicit permission.",\n    "Always use Tailwind CSS utility tokens matching emerald/mint palette.",\n    "Run 'npm run test' to verify all logic changes before outputting final diffs."\n  ]\n}`,
                    explanation: "Declarative project boundary file that ensures the AI assistant complies with team coding standards."
                  }
                ],
                practiceQuestions: [
                  "Why does full-repository vector indexing perform better than blind file copy-pasting into web chats?",
                  "What security risks arise when pasting proprietary codebase snippets into third-party cloud LLM providers?",
                  "How do .cursorrules enforce project invariants across large engineering teams?"
                ],
                mcqQuestions: [
                  {
                    id: "ai-q1",
                    question: "How does Cursor IDE's @codebase feature determine which files to include in the model context window?",
                    options: [
                      "It blindly sends all files in the directory regardless of size",
                      "It uses semantic vector search and AST symbol graphs to retrieve only relevant code slices",
                      "It only looks at the currently open active tab in the editor",
                      "It runs an external Google web search on the repository name"
                    ],
                    correctIndex: 1,
                    explanation: "Cursor uses embeddings and local vector indexes to perform semantic retrieval over your repository, pulling only high-relevance code chunks into the prompt."
                  },
                  {
                    id: "ai-q2",
                    question: "What is the primary danger of blindly accepting multi-file AI code generation without reading the diff?",
                    options: [
                      "The compiler will refuse to compile any AI generated code",
                      "The AI may hallucinate non-existent package methods or introduce silent race conditions and security vulnerabilities",
                      "The code editor automatically deletes your git repository",
                      "AI code generation runs 100x slower than typing by hand"
                    ],
                    correctIndex: 1,
                    explanation: "LLMs generate plausible token sequences that may appear syntactically correct while introducing subtle logic bugs, unvalidated inputs, or hallucinated APIs."
                  }
                ],
                assignment: {
                  title: "Author Production .cursorrules & Refactor Code",
                  description: "Create a production .cursorrules file for a TypeScript project, configure strict type rules, and prompt Cursor Composer to refactor a messy module with 100% test coverage.",
                  deliverables: [
                    "A validated .cursorrules configuration file",
                    "Git diff demonstrating multi-file refactoring with zero compiler warnings",
                    "A test suite passing with deterministic exit code 0"
                  ]
                }
              }
            ]
          }
        ]
      },
      {
        id: "developer-ai-workflows-cursor-copilot",
        title: "Developer AI Superpowers: Cursor, Claude & Terminal Coding Agents",
        subtitle: "Prompt architectures, automated test generation, and AI codebase indexing",
        description: "10x your software engineering velocity: master Cursor IDE multi-file edits, system prompt design, unit test generation with Claude 3.5 Sonnet, and terminal AI agents.",
        domainId: "ai-tools-and-agents",
        icon: "⚡",
        difficulty: "Beginner",
        durationHours: 20,
        technologies: ["Cursor", "GitHub Copilot", "Claude 3.5 Sonnet", "Prompt Architecture", "AI Debugging", "Terminal Agents"],
        careerTags: ["Modern Software Engineer", "Tech Lead", "AI-First Developer"],
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
        featured: false,
        isPublished: true,
        modules: [
          {
            id: "ai-tools-mod-01",
            title: "AI Developer Tooling & Velocity Workflows",
            description: "Cursor IDE, AI Codebase Indexing, Prompt Architectures, and Automated Unit Tests.",
            order: 1,
            lessons: [
              {
                id: "ai-tools-cursor-workflow",
                title: "Cursor AI IDE: Multi-File Edits, Codebase Indexing & .cursorrules",
                order: 1,
                duration: "40 min interactive sprint",
                difficulty: "Beginner",
                learningObjectives: [
                  "Understand how AI code editors build semantic vector indexes over your repository.",
                  "Master Composer (Cmd+I) and inline diff generation (Cmd+K) without introducing subtle bugs.",
                  "Enforce engineering standards and prevent hallucinations using strict .cursorrules and system instructions."
                ],
                overview: `Artificial Intelligence has transformed software engineering from manual syntax typing into high-leverage architectural orchestration. Modern AI-native IDEs like Cursor index your entire repository into a local semantic vector database. When you query the model using @codebase or ask for multi-file refactors, the IDE retrieves only the most relevant AST (Abstract Syntax Tree) slices, symbol declarations, and dependency trees to build a pinpoint context window for frontier models such as Claude 3.5 Sonnet.

However, unchecked reliance on AI code generators produces insidious architectural debt: hallucinations, ghost dependencies, security vulnerabilities, and brittle unmaintainable spaghetti code. Professional software engineers do not use AI as a replacement for thinking; they use it as an ultra-fast junior developer that must be strictly bounded.

By authoring explicit project rule files (such as .cursorrules or AGENTS.md), you define project invariants: language versions, mandatory typing conventions, forbidden dependencies, and directory structures. Furthermore, pairing AI code generation with immediate terminal test execution creates a self-healing development loop that increases velocity while preserving production safety.`,
                keyConcepts: [
                  {
                    title: "Codebase Semantic Indexing",
                    explanation: "Code files are parsed into semantic chunks and embedded into high-dimensional vectors, allowing natural language search over entire codebases."
                  },
                  {
                    title: "Prompt Architectures & Invariant Rules",
                    explanation: ".cursorrules and project system prompts act as guardrails, forcing the LLM to follow existing patterns and type signatures."
                  },
                  {
                    title: "Self-Healing Test Driven Loops",
                    explanation: "Directly piping compiler stderr and unit test failures back into the model context window allows it to resolve syntax and logic errors in seconds."
                  }
                ],
                practicalExamples: [
                  {
                    title: "Multi-File Authentication Refactor",
                    scenario: "Refactoring a Next.js App Router codebase from legacy cookie sessions to Supabase SSR JWT auth across 8 files simultaneously.",
                    takeaway: "Using Cursor Composer with explicit file mentions guarantees consistent imports and type signatures across routes and middleware."
                  },
                  {
                    title: "Automated Edge-Case Test Generation",
                    scenario: "Generating comprehensive Jest/Vitest test suites for a complex financial calculation function with negative inputs and floating point boundaries.",
                    takeaway: "AI excels at generating boundary condition tests that human engineers often overlook due to confirmation bias."
                  }
                ],
                codeSamples: [
                  {
                    language: "json",
                    filename: ".cursorrules",
                    code: `{\n  "version": "1.0",\n  "project": "CampusGrow Core",\n  "rules": [\n    "Strict TypeScript only with zero 'any' types.",\n    "Never install new npm packages without explicit permission.",\n    "Always use Tailwind CSS utility tokens matching emerald/mint palette.",\n    "Run 'npm run test' to verify all logic changes before outputting final diffs."\n  ]\n}`,
                    explanation: "Declarative project boundary file that ensures the AI assistant complies with team coding standards."
                  }
                ],
                practiceQuestions: [
                  "Why does full-repository vector indexing perform better than blind file copy-pasting into web chats?",
                  "What security risks arise when pasting proprietary codebase snippets into third-party cloud LLM providers?",
                  "How do .cursorrules enforce project invariants across large engineering teams?"
                ],
                mcqQuestions: [
                  {
                    id: "ai-q1",
                    question: "How does Cursor IDE's @codebase feature determine which files to include in the model context window?",
                    options: [
                      "It blindly sends all files in the directory regardless of size",
                      "It uses semantic vector search and AST symbol graphs to retrieve only relevant code slices",
                      "It only looks at the currently open active tab in the editor",
                      "It runs an external Google web search on the repository name"
                    ],
                    correctIndex: 1,
                    explanation: "Cursor uses embeddings and local vector indexes to perform semantic retrieval over your repository, pulling only high-relevance code chunks into the prompt."
                  },
                  {
                    id: "ai-q2",
                    question: "What is the primary danger of blindly accepting multi-file AI code generation without reading the diff?",
                    options: [
                      "The compiler will refuse to compile any AI generated code",
                      "The AI may hallucinate non-existent package methods or introduce silent race conditions and security vulnerabilities",
                      "The code editor automatically deletes your git repository",
                      "AI code generation runs 100x slower than typing by hand"
                    ],
                    correctIndex: 1,
                    explanation: "LLMs generate plausible token sequences that may appear syntactically correct while introducing subtle logic bugs, unvalidated inputs, or hallucinated APIs."
                  }
                ],
                assignment: {
                  title: "Author Production .cursorrules & Refactor Code",
                  description: "Create a production .cursorrules file for a TypeScript project, configure strict type rules, and prompt Cursor Composer to refactor a messy module with 100% test coverage.",
                  deliverables: [
                    "A validated .cursorrules configuration file",
                    "Git diff demonstrating multi-file refactoring with zero compiler warnings",
                    "A test suite passing with deterministic exit code 0"
                  ]
                }
              }
            ]
          }
        ]
      },
    ]
  },

  // 7. Databases and Data Engineering
  {
    id: "databases-and-data-engineering",
    number: 7,
    title: "Databases & Data Engineering",
    subtitle: "Relational Schemas, NoSQL Engines, Caching & Distributed Pipelines",
    description: "Design relational models in PostgreSQL, scale document data in MongoDB, implement sub-millisecond caching in Redis, and build BigLake/Spark data pipelines.",
    icon: "🗄️",
    badge: "Data Infrastructure",
    color: "from-amber-600 to-orange-700",
    technologies: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Supabase", "Apache Spark", "B-Trees", "ACID", "ETL"],
    courses: [
      {
        id: "database-internals-sql-mastery",
        title: "Database Engine Internals, SQL & Query Optimization",
        subtitle: "B-Tree indexes, WAL logging, isolation levels, and EXPLAIN query plans",
        description: "Understand database internals: how storage engines store rows on 8KB disk pages, transaction isolation anomalies, and index tuning for million-row queries.",
        domainId: "databases-and-data-engineering",
        icon: "📊",
        difficulty: "Intermediate",
        durationHours: 30,
        technologies: ["PostgreSQL", "B-Trees", "Indexing", "Query Optimization", "WAL", "ACID"],
        careerTags: ["Database Administrator", "Backend Engineer", "Data Engineer"],
        image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=600&q=80",
        featured: true,
        isPublished: true,
        modules: [
          {
            id: "ai-tools-mod-01",
            title: "AI Developer Tooling & Velocity Workflows",
            description: "Cursor IDE, AI Codebase Indexing, Prompt Architectures, and Automated Unit Tests.",
            order: 1,
            lessons: [
              {
                id: "ai-tools-cursor-workflow",
                title: "Cursor AI IDE: Multi-File Edits, Codebase Indexing & .cursorrules",
                order: 1,
                duration: "40 min interactive sprint",
                difficulty: "Beginner",
                learningObjectives: [
                  "Understand how AI code editors build semantic vector indexes over your repository.",
                  "Master Composer (Cmd+I) and inline diff generation (Cmd+K) without introducing subtle bugs.",
                  "Enforce engineering standards and prevent hallucinations using strict .cursorrules and system instructions."
                ],
                overview: `Artificial Intelligence has transformed software engineering from manual syntax typing into high-leverage architectural orchestration. Modern AI-native IDEs like Cursor index your entire repository into a local semantic vector database. When you query the model using @codebase or ask for multi-file refactors, the IDE retrieves only the most relevant AST (Abstract Syntax Tree) slices, symbol declarations, and dependency trees to build a pinpoint context window for frontier models such as Claude 3.5 Sonnet.

However, unchecked reliance on AI code generators produces insidious architectural debt: hallucinations, ghost dependencies, security vulnerabilities, and brittle unmaintainable spaghetti code. Professional software engineers do not use AI as a replacement for thinking; they use it as an ultra-fast junior developer that must be strictly bounded.

By authoring explicit project rule files (such as .cursorrules or AGENTS.md), you define project invariants: language versions, mandatory typing conventions, forbidden dependencies, and directory structures. Furthermore, pairing AI code generation with immediate terminal test execution creates a self-healing development loop that increases velocity while preserving production safety.`,
                keyConcepts: [
                  {
                    title: "Codebase Semantic Indexing",
                    explanation: "Code files are parsed into semantic chunks and embedded into high-dimensional vectors, allowing natural language search over entire codebases."
                  },
                  {
                    title: "Prompt Architectures & Invariant Rules",
                    explanation: ".cursorrules and project system prompts act as guardrails, forcing the LLM to follow existing patterns and type signatures."
                  },
                  {
                    title: "Self-Healing Test Driven Loops",
                    explanation: "Directly piping compiler stderr and unit test failures back into the model context window allows it to resolve syntax and logic errors in seconds."
                  }
                ],
                practicalExamples: [
                  {
                    title: "Multi-File Authentication Refactor",
                    scenario: "Refactoring a Next.js App Router codebase from legacy cookie sessions to Supabase SSR JWT auth across 8 files simultaneously.",
                    takeaway: "Using Cursor Composer with explicit file mentions guarantees consistent imports and type signatures across routes and middleware."
                  },
                  {
                    title: "Automated Edge-Case Test Generation",
                    scenario: "Generating comprehensive Jest/Vitest test suites for a complex financial calculation function with negative inputs and floating point boundaries.",
                    takeaway: "AI excels at generating boundary condition tests that human engineers often overlook due to confirmation bias."
                  }
                ],
                codeSamples: [
                  {
                    language: "json",
                    filename: ".cursorrules",
                    code: `{\n  "version": "1.0",\n  "project": "CampusGrow Core",\n  "rules": [\n    "Strict TypeScript only with zero 'any' types.",\n    "Never install new npm packages without explicit permission.",\n    "Always use Tailwind CSS utility tokens matching emerald/mint palette.",\n    "Run 'npm run test' to verify all logic changes before outputting final diffs."\n  ]\n}`,
                    explanation: "Declarative project boundary file that ensures the AI assistant complies with team coding standards."
                  }
                ],
                practiceQuestions: [
                  "Why does full-repository vector indexing perform better than blind file copy-pasting into web chats?",
                  "What security risks arise when pasting proprietary codebase snippets into third-party cloud LLM providers?",
                  "How do .cursorrules enforce project invariants across large engineering teams?"
                ],
                mcqQuestions: [
                  {
                    id: "ai-q1",
                    question: "How does Cursor IDE's @codebase feature determine which files to include in the model context window?",
                    options: [
                      "It blindly sends all files in the directory regardless of size",
                      "It uses semantic vector search and AST symbol graphs to retrieve only relevant code slices",
                      "It only looks at the currently open active tab in the editor",
                      "It runs an external Google web search on the repository name"
                    ],
                    correctIndex: 1,
                    explanation: "Cursor uses embeddings and local vector indexes to perform semantic retrieval over your repository, pulling only high-relevance code chunks into the prompt."
                  },
                  {
                    id: "ai-q2",
                    question: "What is the primary danger of blindly accepting multi-file AI code generation without reading the diff?",
                    options: [
                      "The compiler will refuse to compile any AI generated code",
                      "The AI may hallucinate non-existent package methods or introduce silent race conditions and security vulnerabilities",
                      "The code editor automatically deletes your git repository",
                      "AI code generation runs 100x slower than typing by hand"
                    ],
                    correctIndex: 1,
                    explanation: "LLMs generate plausible token sequences that may appear syntactically correct while introducing subtle logic bugs, unvalidated inputs, or hallucinated APIs."
                  }
                ],
                assignment: {
                  title: "Author Production .cursorrules & Refactor Code",
                  description: "Create a production .cursorrules file for a TypeScript project, configure strict type rules, and prompt Cursor Composer to refactor a messy module with 100% test coverage.",
                  deliverables: [
                    "A validated .cursorrules configuration file",
                    "Git diff demonstrating multi-file refactoring with zero compiler warnings",
                    "A test suite passing with deterministic exit code 0"
                  ]
                }
              }
            ]
          }
        ]
      }
    ,
      {
        id: "distributed-data-pipelines-kafka-spark",
        title: "Distributed Data Pipelines: Apache Kafka & Spark Streaming",
        subtitle: "Event sourcing, Kafka topics, consumer lag, and high-throughput streaming ETL",
        description: "Architect high-scale event streaming pipelines: Apache Kafka partitions, exactly-once delivery guarantees, consumer offset management, and Spark batch processing.",
        domainId: "databases-and-data-engineering",
        icon: "🌊",
        difficulty: "Advanced",
        durationHours: 40,
        technologies: ["Apache Kafka", "Apache Spark", "PySpark", "Event-Driven", "Parquet", "ETL Pipelines"],
        careerTags: ["Data Engineer", "Streaming Systems Architect", "Big Data Developer"],
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
        featured: true,
        isPublished: true,
        modules: [
          {
            id: "ai-tools-mod-01",
            title: "AI Developer Tooling & Velocity Workflows",
            description: "Cursor IDE, AI Codebase Indexing, Prompt Architectures, and Automated Unit Tests.",
            order: 1,
            lessons: [
              {
                id: "ai-tools-cursor-workflow",
                title: "Cursor AI IDE: Multi-File Edits, Codebase Indexing & .cursorrules",
                order: 1,
                duration: "40 min interactive sprint",
                difficulty: "Beginner",
                learningObjectives: [
                  "Understand how AI code editors build semantic vector indexes over your repository.",
                  "Master Composer (Cmd+I) and inline diff generation (Cmd+K) without introducing subtle bugs.",
                  "Enforce engineering standards and prevent hallucinations using strict .cursorrules and system instructions."
                ],
                overview: `Artificial Intelligence has transformed software engineering from manual syntax typing into high-leverage architectural orchestration. Modern AI-native IDEs like Cursor index your entire repository into a local semantic vector database. When you query the model using @codebase or ask for multi-file refactors, the IDE retrieves only the most relevant AST (Abstract Syntax Tree) slices, symbol declarations, and dependency trees to build a pinpoint context window for frontier models such as Claude 3.5 Sonnet.

However, unchecked reliance on AI code generators produces insidious architectural debt: hallucinations, ghost dependencies, security vulnerabilities, and brittle unmaintainable spaghetti code. Professional software engineers do not use AI as a replacement for thinking; they use it as an ultra-fast junior developer that must be strictly bounded.

By authoring explicit project rule files (such as .cursorrules or AGENTS.md), you define project invariants: language versions, mandatory typing conventions, forbidden dependencies, and directory structures. Furthermore, pairing AI code generation with immediate terminal test execution creates a self-healing development loop that increases velocity while preserving production safety.`,
                keyConcepts: [
                  {
                    title: "Codebase Semantic Indexing",
                    explanation: "Code files are parsed into semantic chunks and embedded into high-dimensional vectors, allowing natural language search over entire codebases."
                  },
                  {
                    title: "Prompt Architectures & Invariant Rules",
                    explanation: ".cursorrules and project system prompts act as guardrails, forcing the LLM to follow existing patterns and type signatures."
                  },
                  {
                    title: "Self-Healing Test Driven Loops",
                    explanation: "Directly piping compiler stderr and unit test failures back into the model context window allows it to resolve syntax and logic errors in seconds."
                  }
                ],
                practicalExamples: [
                  {
                    title: "Multi-File Authentication Refactor",
                    scenario: "Refactoring a Next.js App Router codebase from legacy cookie sessions to Supabase SSR JWT auth across 8 files simultaneously.",
                    takeaway: "Using Cursor Composer with explicit file mentions guarantees consistent imports and type signatures across routes and middleware."
                  },
                  {
                    title: "Automated Edge-Case Test Generation",
                    scenario: "Generating comprehensive Jest/Vitest test suites for a complex financial calculation function with negative inputs and floating point boundaries.",
                    takeaway: "AI excels at generating boundary condition tests that human engineers often overlook due to confirmation bias."
                  }
                ],
                codeSamples: [
                  {
                    language: "json",
                    filename: ".cursorrules",
                    code: `{\n  "version": "1.0",\n  "project": "CampusGrow Core",\n  "rules": [\n    "Strict TypeScript only with zero 'any' types.",\n    "Never install new npm packages without explicit permission.",\n    "Always use Tailwind CSS utility tokens matching emerald/mint palette.",\n    "Run 'npm run test' to verify all logic changes before outputting final diffs."\n  ]\n}`,
                    explanation: "Declarative project boundary file that ensures the AI assistant complies with team coding standards."
                  }
                ],
                practiceQuestions: [
                  "Why does full-repository vector indexing perform better than blind file copy-pasting into web chats?",
                  "What security risks arise when pasting proprietary codebase snippets into third-party cloud LLM providers?",
                  "How do .cursorrules enforce project invariants across large engineering teams?"
                ],
                mcqQuestions: [
                  {
                    id: "ai-q1",
                    question: "How does Cursor IDE's @codebase feature determine which files to include in the model context window?",
                    options: [
                      "It blindly sends all files in the directory regardless of size",
                      "It uses semantic vector search and AST symbol graphs to retrieve only relevant code slices",
                      "It only looks at the currently open active tab in the editor",
                      "It runs an external Google web search on the repository name"
                    ],
                    correctIndex: 1,
                    explanation: "Cursor uses embeddings and local vector indexes to perform semantic retrieval over your repository, pulling only high-relevance code chunks into the prompt."
                  },
                  {
                    id: "ai-q2",
                    question: "What is the primary danger of blindly accepting multi-file AI code generation without reading the diff?",
                    options: [
                      "The compiler will refuse to compile any AI generated code",
                      "The AI may hallucinate non-existent package methods or introduce silent race conditions and security vulnerabilities",
                      "The code editor automatically deletes your git repository",
                      "AI code generation runs 100x slower than typing by hand"
                    ],
                    correctIndex: 1,
                    explanation: "LLMs generate plausible token sequences that may appear syntactically correct while introducing subtle logic bugs, unvalidated inputs, or hallucinated APIs."
                  }
                ],
                assignment: {
                  title: "Author Production .cursorrules & Refactor Code",
                  description: "Create a production .cursorrules file for a TypeScript project, configure strict type rules, and prompt Cursor Composer to refactor a messy module with 100% test coverage.",
                  deliverables: [
                    "A validated .cursorrules configuration file",
                    "Git diff demonstrating multi-file refactoring with zero compiler warnings",
                    "A test suite passing with deterministic exit code 0"
                  ]
                }
              }
            ]
          }
        ]
      },
      {
        id: "nosql-redis-mongodb-caching",
        title: "High-Scale NoSQL, MongoDB & Sub-millisecond Redis Caching",
        subtitle: "Document schemas, sharded clusters, cache-aside, and memory eviction algorithms",
        description: "Scale applications beyond SQL limits: MongoDB aggregation pipelines, sharding keys, Redis sorted sets, sliding window rate limiters, and cache invalidation strategies.",
        domainId: "databases-and-data-engineering",
        icon: "⚡",
        difficulty: "Intermediate",
        durationHours: 30,
        technologies: ["MongoDB", "Redis", "Caching Strategies", "Document Modeling", "Pub/Sub", "Rate Limiting"],
        careerTags: ["Backend Architect", "Database Engineer", "Cache Specialist"],
        image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=600&q=80",
        featured: false,
        isPublished: true,
        modules: [
          {
            id: "ai-tools-mod-01",
            title: "AI Developer Tooling & Velocity Workflows",
            description: "Cursor IDE, AI Codebase Indexing, Prompt Architectures, and Automated Unit Tests.",
            order: 1,
            lessons: [
              {
                id: "ai-tools-cursor-workflow",
                title: "Cursor AI IDE: Multi-File Edits, Codebase Indexing & .cursorrules",
                order: 1,
                duration: "40 min interactive sprint",
                difficulty: "Beginner",
                learningObjectives: [
                  "Understand how AI code editors build semantic vector indexes over your repository.",
                  "Master Composer (Cmd+I) and inline diff generation (Cmd+K) without introducing subtle bugs.",
                  "Enforce engineering standards and prevent hallucinations using strict .cursorrules and system instructions."
                ],
                overview: `Artificial Intelligence has transformed software engineering from manual syntax typing into high-leverage architectural orchestration. Modern AI-native IDEs like Cursor index your entire repository into a local semantic vector database. When you query the model using @codebase or ask for multi-file refactors, the IDE retrieves only the most relevant AST (Abstract Syntax Tree) slices, symbol declarations, and dependency trees to build a pinpoint context window for frontier models such as Claude 3.5 Sonnet.

However, unchecked reliance on AI code generators produces insidious architectural debt: hallucinations, ghost dependencies, security vulnerabilities, and brittle unmaintainable spaghetti code. Professional software engineers do not use AI as a replacement for thinking; they use it as an ultra-fast junior developer that must be strictly bounded.

By authoring explicit project rule files (such as .cursorrules or AGENTS.md), you define project invariants: language versions, mandatory typing conventions, forbidden dependencies, and directory structures. Furthermore, pairing AI code generation with immediate terminal test execution creates a self-healing development loop that increases velocity while preserving production safety.`,
                keyConcepts: [
                  {
                    title: "Codebase Semantic Indexing",
                    explanation: "Code files are parsed into semantic chunks and embedded into high-dimensional vectors, allowing natural language search over entire codebases."
                  },
                  {
                    title: "Prompt Architectures & Invariant Rules",
                    explanation: ".cursorrules and project system prompts act as guardrails, forcing the LLM to follow existing patterns and type signatures."
                  },
                  {
                    title: "Self-Healing Test Driven Loops",
                    explanation: "Directly piping compiler stderr and unit test failures back into the model context window allows it to resolve syntax and logic errors in seconds."
                  }
                ],
                practicalExamples: [
                  {
                    title: "Multi-File Authentication Refactor",
                    scenario: "Refactoring a Next.js App Router codebase from legacy cookie sessions to Supabase SSR JWT auth across 8 files simultaneously.",
                    takeaway: "Using Cursor Composer with explicit file mentions guarantees consistent imports and type signatures across routes and middleware."
                  },
                  {
                    title: "Automated Edge-Case Test Generation",
                    scenario: "Generating comprehensive Jest/Vitest test suites for a complex financial calculation function with negative inputs and floating point boundaries.",
                    takeaway: "AI excels at generating boundary condition tests that human engineers often overlook due to confirmation bias."
                  }
                ],
                codeSamples: [
                  {
                    language: "json",
                    filename: ".cursorrules",
                    code: `{\n  "version": "1.0",\n  "project": "CampusGrow Core",\n  "rules": [\n    "Strict TypeScript only with zero 'any' types.",\n    "Never install new npm packages without explicit permission.",\n    "Always use Tailwind CSS utility tokens matching emerald/mint palette.",\n    "Run 'npm run test' to verify all logic changes before outputting final diffs."\n  ]\n}`,
                    explanation: "Declarative project boundary file that ensures the AI assistant complies with team coding standards."
                  }
                ],
                practiceQuestions: [
                  "Why does full-repository vector indexing perform better than blind file copy-pasting into web chats?",
                  "What security risks arise when pasting proprietary codebase snippets into third-party cloud LLM providers?",
                  "How do .cursorrules enforce project invariants across large engineering teams?"
                ],
                mcqQuestions: [
                  {
                    id: "ai-q1",
                    question: "How does Cursor IDE's @codebase feature determine which files to include in the model context window?",
                    options: [
                      "It blindly sends all files in the directory regardless of size",
                      "It uses semantic vector search and AST symbol graphs to retrieve only relevant code slices",
                      "It only looks at the currently open active tab in the editor",
                      "It runs an external Google web search on the repository name"
                    ],
                    correctIndex: 1,
                    explanation: "Cursor uses embeddings and local vector indexes to perform semantic retrieval over your repository, pulling only high-relevance code chunks into the prompt."
                  },
                  {
                    id: "ai-q2",
                    question: "What is the primary danger of blindly accepting multi-file AI code generation without reading the diff?",
                    options: [
                      "The compiler will refuse to compile any AI generated code",
                      "The AI may hallucinate non-existent package methods or introduce silent race conditions and security vulnerabilities",
                      "The code editor automatically deletes your git repository",
                      "AI code generation runs 100x slower than typing by hand"
                    ],
                    correctIndex: 1,
                    explanation: "LLMs generate plausible token sequences that may appear syntactically correct while introducing subtle logic bugs, unvalidated inputs, or hallucinated APIs."
                  }
                ],
                assignment: {
                  title: "Author Production .cursorrules & Refactor Code",
                  description: "Create a production .cursorrules file for a TypeScript project, configure strict type rules, and prompt Cursor Composer to refactor a messy module with 100% test coverage.",
                  deliverables: [
                    "A validated .cursorrules configuration file",
                    "Git diff demonstrating multi-file refactoring with zero compiler warnings",
                    "A test suite passing with deterministic exit code 0"
                  ]
                }
              }
            ]
          }
        ]
      },
    ]
  },

  // 8. Cloud Computing and DevOps
  {
    id: "cloud-and-devops",
    number: 8,
    title: "Cloud Computing & DevOps",
    subtitle: "Containerization, Kubernetes Orchestration & Infrastructure as Code",
    description: "Deploy and manage resilient cloud infrastructure across AWS, Google Cloud, Docker, Kubernetes clusters, automated CI/CD pipelines, and Terraform.",
    icon: "☁️",
    badge: "Cloud & Ops",
    color: "from-sky-600 to-indigo-700",
    technologies: ["AWS", "Google Cloud", "Docker", "Kubernetes", "Linux", "GitHub Actions", "Terraform", "CI/CD"],
    courses: [
      {
        id: "docker-kubernetes-devops-pipeline",
        title: "Docker, Kubernetes & Production CI/CD Pipelines",
        subtitle: "Multi-stage builds, ingress controllers, Helm charts, and automated testing",
        description: "Package applications with multi-stage Docker builds, orchestrate high-availability pods in Kubernetes, and automate releases using GitHub Actions.",
        domainId: "cloud-and-devops",
        icon: "🐳",
        difficulty: "Intermediate",
        durationHours: 35,
        technologies: ["Docker", "Kubernetes", "GitHub Actions", "Helm", "Linux CLI", "Terraform"],
        careerTags: ["DevOps Engineer", "Site Reliability Engineer (SRE)", "Cloud Architect"],
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
        featured: true,
        isPublished: true,
        modules: [
          {
            id: "ai-tools-mod-01",
            title: "AI Developer Tooling & Velocity Workflows",
            description: "Cursor IDE, AI Codebase Indexing, Prompt Architectures, and Automated Unit Tests.",
            order: 1,
            lessons: [
              {
                id: "ai-tools-cursor-workflow",
                title: "Cursor AI IDE: Multi-File Edits, Codebase Indexing & .cursorrules",
                order: 1,
                duration: "40 min interactive sprint",
                difficulty: "Beginner",
                learningObjectives: [
                  "Understand how AI code editors build semantic vector indexes over your repository.",
                  "Master Composer (Cmd+I) and inline diff generation (Cmd+K) without introducing subtle bugs.",
                  "Enforce engineering standards and prevent hallucinations using strict .cursorrules and system instructions."
                ],
                overview: `Artificial Intelligence has transformed software engineering from manual syntax typing into high-leverage architectural orchestration. Modern AI-native IDEs like Cursor index your entire repository into a local semantic vector database. When you query the model using @codebase or ask for multi-file refactors, the IDE retrieves only the most relevant AST (Abstract Syntax Tree) slices, symbol declarations, and dependency trees to build a pinpoint context window for frontier models such as Claude 3.5 Sonnet.

However, unchecked reliance on AI code generators produces insidious architectural debt: hallucinations, ghost dependencies, security vulnerabilities, and brittle unmaintainable spaghetti code. Professional software engineers do not use AI as a replacement for thinking; they use it as an ultra-fast junior developer that must be strictly bounded.

By authoring explicit project rule files (such as .cursorrules or AGENTS.md), you define project invariants: language versions, mandatory typing conventions, forbidden dependencies, and directory structures. Furthermore, pairing AI code generation with immediate terminal test execution creates a self-healing development loop that increases velocity while preserving production safety.`,
                keyConcepts: [
                  {
                    title: "Codebase Semantic Indexing",
                    explanation: "Code files are parsed into semantic chunks and embedded into high-dimensional vectors, allowing natural language search over entire codebases."
                  },
                  {
                    title: "Prompt Architectures & Invariant Rules",
                    explanation: ".cursorrules and project system prompts act as guardrails, forcing the LLM to follow existing patterns and type signatures."
                  },
                  {
                    title: "Self-Healing Test Driven Loops",
                    explanation: "Directly piping compiler stderr and unit test failures back into the model context window allows it to resolve syntax and logic errors in seconds."
                  }
                ],
                practicalExamples: [
                  {
                    title: "Multi-File Authentication Refactor",
                    scenario: "Refactoring a Next.js App Router codebase from legacy cookie sessions to Supabase SSR JWT auth across 8 files simultaneously.",
                    takeaway: "Using Cursor Composer with explicit file mentions guarantees consistent imports and type signatures across routes and middleware."
                  },
                  {
                    title: "Automated Edge-Case Test Generation",
                    scenario: "Generating comprehensive Jest/Vitest test suites for a complex financial calculation function with negative inputs and floating point boundaries.",
                    takeaway: "AI excels at generating boundary condition tests that human engineers often overlook due to confirmation bias."
                  }
                ],
                codeSamples: [
                  {
                    language: "json",
                    filename: ".cursorrules",
                    code: `{\n  "version": "1.0",\n  "project": "CampusGrow Core",\n  "rules": [\n    "Strict TypeScript only with zero 'any' types.",\n    "Never install new npm packages without explicit permission.",\n    "Always use Tailwind CSS utility tokens matching emerald/mint palette.",\n    "Run 'npm run test' to verify all logic changes before outputting final diffs."\n  ]\n}`,
                    explanation: "Declarative project boundary file that ensures the AI assistant complies with team coding standards."
                  }
                ],
                practiceQuestions: [
                  "Why does full-repository vector indexing perform better than blind file copy-pasting into web chats?",
                  "What security risks arise when pasting proprietary codebase snippets into third-party cloud LLM providers?",
                  "How do .cursorrules enforce project invariants across large engineering teams?"
                ],
                mcqQuestions: [
                  {
                    id: "ai-q1",
                    question: "How does Cursor IDE's @codebase feature determine which files to include in the model context window?",
                    options: [
                      "It blindly sends all files in the directory regardless of size",
                      "It uses semantic vector search and AST symbol graphs to retrieve only relevant code slices",
                      "It only looks at the currently open active tab in the editor",
                      "It runs an external Google web search on the repository name"
                    ],
                    correctIndex: 1,
                    explanation: "Cursor uses embeddings and local vector indexes to perform semantic retrieval over your repository, pulling only high-relevance code chunks into the prompt."
                  },
                  {
                    id: "ai-q2",
                    question: "What is the primary danger of blindly accepting multi-file AI code generation without reading the diff?",
                    options: [
                      "The compiler will refuse to compile any AI generated code",
                      "The AI may hallucinate non-existent package methods or introduce silent race conditions and security vulnerabilities",
                      "The code editor automatically deletes your git repository",
                      "AI code generation runs 100x slower than typing by hand"
                    ],
                    correctIndex: 1,
                    explanation: "LLMs generate plausible token sequences that may appear syntactically correct while introducing subtle logic bugs, unvalidated inputs, or hallucinated APIs."
                  }
                ],
                assignment: {
                  title: "Author Production .cursorrules & Refactor Code",
                  description: "Create a production .cursorrules file for a TypeScript project, configure strict type rules, and prompt Cursor Composer to refactor a messy module with 100% test coverage.",
                  deliverables: [
                    "A validated .cursorrules configuration file",
                    "Git diff demonstrating multi-file refactoring with zero compiler warnings",
                    "A test suite passing with deterministic exit code 0"
                  ]
                }
              }
            ]
          }
        ]
      }
    ,
      {
        id: "aws-cloud-solutions-architect",
        title: "AWS Cloud Solutions Architecture & Serverless Engineering",
        subtitle: "EC2, S3, Lambda, API Gateway, IAM security policies, and VPC subnets",
        description: "Design fault-tolerant cloud architectures on AWS: multi-AZ deployments, VPC networking, serverless Lambda backends, S3 storage tiers, and IAM zero-trust access control.",
        domainId: "cloud-and-devops",
        icon: "☁️",
        difficulty: "Intermediate",
        durationHours: 40,
        technologies: ["AWS", "Lambda", "S3", "VPC & Subnets", "IAM", "API Gateway", "CloudWatch"],
        careerTags: ["Cloud Architect", "AWS Solutions Engineer", "Backend Developer"],
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
        featured: true,
        isPublished: true,
        modules: [
          {
            id: "ai-tools-mod-01",
            title: "AI Developer Tooling & Velocity Workflows",
            description: "Cursor IDE, AI Codebase Indexing, Prompt Architectures, and Automated Unit Tests.",
            order: 1,
            lessons: [
              {
                id: "ai-tools-cursor-workflow",
                title: "Cursor AI IDE: Multi-File Edits, Codebase Indexing & .cursorrules",
                order: 1,
                duration: "40 min interactive sprint",
                difficulty: "Beginner",
                learningObjectives: [
                  "Understand how AI code editors build semantic vector indexes over your repository.",
                  "Master Composer (Cmd+I) and inline diff generation (Cmd+K) without introducing subtle bugs.",
                  "Enforce engineering standards and prevent hallucinations using strict .cursorrules and system instructions."
                ],
                overview: `Artificial Intelligence has transformed software engineering from manual syntax typing into high-leverage architectural orchestration. Modern AI-native IDEs like Cursor index your entire repository into a local semantic vector database. When you query the model using @codebase or ask for multi-file refactors, the IDE retrieves only the most relevant AST (Abstract Syntax Tree) slices, symbol declarations, and dependency trees to build a pinpoint context window for frontier models such as Claude 3.5 Sonnet.

However, unchecked reliance on AI code generators produces insidious architectural debt: hallucinations, ghost dependencies, security vulnerabilities, and brittle unmaintainable spaghetti code. Professional software engineers do not use AI as a replacement for thinking; they use it as an ultra-fast junior developer that must be strictly bounded.

By authoring explicit project rule files (such as .cursorrules or AGENTS.md), you define project invariants: language versions, mandatory typing conventions, forbidden dependencies, and directory structures. Furthermore, pairing AI code generation with immediate terminal test execution creates a self-healing development loop that increases velocity while preserving production safety.`,
                keyConcepts: [
                  {
                    title: "Codebase Semantic Indexing",
                    explanation: "Code files are parsed into semantic chunks and embedded into high-dimensional vectors, allowing natural language search over entire codebases."
                  },
                  {
                    title: "Prompt Architectures & Invariant Rules",
                    explanation: ".cursorrules and project system prompts act as guardrails, forcing the LLM to follow existing patterns and type signatures."
                  },
                  {
                    title: "Self-Healing Test Driven Loops",
                    explanation: "Directly piping compiler stderr and unit test failures back into the model context window allows it to resolve syntax and logic errors in seconds."
                  }
                ],
                practicalExamples: [
                  {
                    title: "Multi-File Authentication Refactor",
                    scenario: "Refactoring a Next.js App Router codebase from legacy cookie sessions to Supabase SSR JWT auth across 8 files simultaneously.",
                    takeaway: "Using Cursor Composer with explicit file mentions guarantees consistent imports and type signatures across routes and middleware."
                  },
                  {
                    title: "Automated Edge-Case Test Generation",
                    scenario: "Generating comprehensive Jest/Vitest test suites for a complex financial calculation function with negative inputs and floating point boundaries.",
                    takeaway: "AI excels at generating boundary condition tests that human engineers often overlook due to confirmation bias."
                  }
                ],
                codeSamples: [
                  {
                    language: "json",
                    filename: ".cursorrules",
                    code: `{\n  "version": "1.0",\n  "project": "CampusGrow Core",\n  "rules": [\n    "Strict TypeScript only with zero 'any' types.",\n    "Never install new npm packages without explicit permission.",\n    "Always use Tailwind CSS utility tokens matching emerald/mint palette.",\n    "Run 'npm run test' to verify all logic changes before outputting final diffs."\n  ]\n}`,
                    explanation: "Declarative project boundary file that ensures the AI assistant complies with team coding standards."
                  }
                ],
                practiceQuestions: [
                  "Why does full-repository vector indexing perform better than blind file copy-pasting into web chats?",
                  "What security risks arise when pasting proprietary codebase snippets into third-party cloud LLM providers?",
                  "How do .cursorrules enforce project invariants across large engineering teams?"
                ],
                mcqQuestions: [
                  {
                    id: "ai-q1",
                    question: "How does Cursor IDE's @codebase feature determine which files to include in the model context window?",
                    options: [
                      "It blindly sends all files in the directory regardless of size",
                      "It uses semantic vector search and AST symbol graphs to retrieve only relevant code slices",
                      "It only looks at the currently open active tab in the editor",
                      "It runs an external Google web search on the repository name"
                    ],
                    correctIndex: 1,
                    explanation: "Cursor uses embeddings and local vector indexes to perform semantic retrieval over your repository, pulling only high-relevance code chunks into the prompt."
                  },
                  {
                    id: "ai-q2",
                    question: "What is the primary danger of blindly accepting multi-file AI code generation without reading the diff?",
                    options: [
                      "The compiler will refuse to compile any AI generated code",
                      "The AI may hallucinate non-existent package methods or introduce silent race conditions and security vulnerabilities",
                      "The code editor automatically deletes your git repository",
                      "AI code generation runs 100x slower than typing by hand"
                    ],
                    correctIndex: 1,
                    explanation: "LLMs generate plausible token sequences that may appear syntactically correct while introducing subtle logic bugs, unvalidated inputs, or hallucinated APIs."
                  }
                ],
                assignment: {
                  title: "Author Production .cursorrules & Refactor Code",
                  description: "Create a production .cursorrules file for a TypeScript project, configure strict type rules, and prompt Cursor Composer to refactor a messy module with 100% test coverage.",
                  deliverables: [
                    "A validated .cursorrules configuration file",
                    "Git diff demonstrating multi-file refactoring with zero compiler warnings",
                    "A test suite passing with deterministic exit code 0"
                  ]
                }
              }
            ]
          }
        ]
      },
      {
        id: "terraform-gitops-argocd",
        title: "Infrastructure as Code with Terraform & GitOps ArgoCD",
        subtitle: "Declarative cloud provisioning, state management, and GitOps deployments",
        description: "Automate entire cloud environments with code: Terraform modules, state locking with DynamoDB, declarative Kubernetes sync with ArgoCD, and drift detection.",
        domainId: "cloud-and-devops",
        icon: "🏗️",
        difficulty: "Advanced",
        durationHours: 30,
        technologies: ["Terraform", "ArgoCD", "GitOps", "HCL", "State Locking", "Cloud Provisioning"],
        careerTags: ["DevOps Engineer", "Site Reliability Engineer", "Infrastructure Engineer"],
        image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=600&q=80",
        featured: false,
        isPublished: true,
        modules: [
          {
            id: "ai-tools-mod-01",
            title: "AI Developer Tooling & Velocity Workflows",
            description: "Cursor IDE, AI Codebase Indexing, Prompt Architectures, and Automated Unit Tests.",
            order: 1,
            lessons: [
              {
                id: "ai-tools-cursor-workflow",
                title: "Cursor AI IDE: Multi-File Edits, Codebase Indexing & .cursorrules",
                order: 1,
                duration: "40 min interactive sprint",
                difficulty: "Beginner",
                learningObjectives: [
                  "Understand how AI code editors build semantic vector indexes over your repository.",
                  "Master Composer (Cmd+I) and inline diff generation (Cmd+K) without introducing subtle bugs.",
                  "Enforce engineering standards and prevent hallucinations using strict .cursorrules and system instructions."
                ],
                overview: `Artificial Intelligence has transformed software engineering from manual syntax typing into high-leverage architectural orchestration. Modern AI-native IDEs like Cursor index your entire repository into a local semantic vector database. When you query the model using @codebase or ask for multi-file refactors, the IDE retrieves only the most relevant AST (Abstract Syntax Tree) slices, symbol declarations, and dependency trees to build a pinpoint context window for frontier models such as Claude 3.5 Sonnet.

However, unchecked reliance on AI code generators produces insidious architectural debt: hallucinations, ghost dependencies, security vulnerabilities, and brittle unmaintainable spaghetti code. Professional software engineers do not use AI as a replacement for thinking; they use it as an ultra-fast junior developer that must be strictly bounded.

By authoring explicit project rule files (such as .cursorrules or AGENTS.md), you define project invariants: language versions, mandatory typing conventions, forbidden dependencies, and directory structures. Furthermore, pairing AI code generation with immediate terminal test execution creates a self-healing development loop that increases velocity while preserving production safety.`,
                keyConcepts: [
                  {
                    title: "Codebase Semantic Indexing",
                    explanation: "Code files are parsed into semantic chunks and embedded into high-dimensional vectors, allowing natural language search over entire codebases."
                  },
                  {
                    title: "Prompt Architectures & Invariant Rules",
                    explanation: ".cursorrules and project system prompts act as guardrails, forcing the LLM to follow existing patterns and type signatures."
                  },
                  {
                    title: "Self-Healing Test Driven Loops",
                    explanation: "Directly piping compiler stderr and unit test failures back into the model context window allows it to resolve syntax and logic errors in seconds."
                  }
                ],
                practicalExamples: [
                  {
                    title: "Multi-File Authentication Refactor",
                    scenario: "Refactoring a Next.js App Router codebase from legacy cookie sessions to Supabase SSR JWT auth across 8 files simultaneously.",
                    takeaway: "Using Cursor Composer with explicit file mentions guarantees consistent imports and type signatures across routes and middleware."
                  },
                  {
                    title: "Automated Edge-Case Test Generation",
                    scenario: "Generating comprehensive Jest/Vitest test suites for a complex financial calculation function with negative inputs and floating point boundaries.",
                    takeaway: "AI excels at generating boundary condition tests that human engineers often overlook due to confirmation bias."
                  }
                ],
                codeSamples: [
                  {
                    language: "json",
                    filename: ".cursorrules",
                    code: `{\n  "version": "1.0",\n  "project": "CampusGrow Core",\n  "rules": [\n    "Strict TypeScript only with zero 'any' types.",\n    "Never install new npm packages without explicit permission.",\n    "Always use Tailwind CSS utility tokens matching emerald/mint palette.",\n    "Run 'npm run test' to verify all logic changes before outputting final diffs."\n  ]\n}`,
                    explanation: "Declarative project boundary file that ensures the AI assistant complies with team coding standards."
                  }
                ],
                practiceQuestions: [
                  "Why does full-repository vector indexing perform better than blind file copy-pasting into web chats?",
                  "What security risks arise when pasting proprietary codebase snippets into third-party cloud LLM providers?",
                  "How do .cursorrules enforce project invariants across large engineering teams?"
                ],
                mcqQuestions: [
                  {
                    id: "ai-q1",
                    question: "How does Cursor IDE's @codebase feature determine which files to include in the model context window?",
                    options: [
                      "It blindly sends all files in the directory regardless of size",
                      "It uses semantic vector search and AST symbol graphs to retrieve only relevant code slices",
                      "It only looks at the currently open active tab in the editor",
                      "It runs an external Google web search on the repository name"
                    ],
                    correctIndex: 1,
                    explanation: "Cursor uses embeddings and local vector indexes to perform semantic retrieval over your repository, pulling only high-relevance code chunks into the prompt."
                  },
                  {
                    id: "ai-q2",
                    question: "What is the primary danger of blindly accepting multi-file AI code generation without reading the diff?",
                    options: [
                      "The compiler will refuse to compile any AI generated code",
                      "The AI may hallucinate non-existent package methods or introduce silent race conditions and security vulnerabilities",
                      "The code editor automatically deletes your git repository",
                      "AI code generation runs 100x slower than typing by hand"
                    ],
                    correctIndex: 1,
                    explanation: "LLMs generate plausible token sequences that may appear syntactically correct while introducing subtle logic bugs, unvalidated inputs, or hallucinated APIs."
                  }
                ],
                assignment: {
                  title: "Author Production .cursorrules & Refactor Code",
                  description: "Create a production .cursorrules file for a TypeScript project, configure strict type rules, and prompt Cursor Composer to refactor a messy module with 100% test coverage.",
                  deliverables: [
                    "A validated .cursorrules configuration file",
                    "Git diff demonstrating multi-file refactoring with zero compiler warnings",
                    "A test suite passing with deterministic exit code 0"
                  ]
                }
              }
            ]
          }
        ]
      },
    ]
  },

  // 9. Cybersecurity
  {
    id: "cybersecurity",
    number: 9,
    title: "Cybersecurity & Information Security",
    subtitle: "Network Defense, Cryptography, Binary Exploitation & Web Auditing",
    description: "Learn to defend modern software systems: public key cryptography (RSA/ECC), OWASP Top 10 web vulnerabilities, binary reverse engineering, and threat modeling.",
    icon: "🛡️",
    badge: "Security & Defense",
    color: "from-red-600 to-rose-700",
    technologies: ["Cryptography", "OWASP Top 10", "Wireshark", "Burp Suite", "Linux Security", "Network Defense", "Penetration Testing"],
    courses: [
      {
        id: "ethical-hacking-web-security",
        title: "Practical Web Application Security & Ethical Hacking",
        subtitle: "SQL Injection, XSS, CSRF, JWT attacks, and secure code auditing",
        description: "Understand the attacker's mindset to write impenetrable software. Audit vulnerabilities, dissect authentication flaws, and configure zero-trust headers.",
        domainId: "cybersecurity",
        icon: "🔒",
        difficulty: "Intermediate",
        durationHours: 30,
        technologies: ["OWASP", "Burp Suite", "SQL Injection", "XSS", "JWT Auditing", "Secure Headers"],
        careerTags: ["Security Engineer", "Penetration Tester", "AppSec Specialist"],
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80",
        featured: true,
        isPublished: true,
        modules: [
          {
            id: "ai-tools-mod-01",
            title: "AI Developer Tooling & Velocity Workflows",
            description: "Cursor IDE, AI Codebase Indexing, Prompt Architectures, and Automated Unit Tests.",
            order: 1,
            lessons: [
              {
                id: "ai-tools-cursor-workflow",
                title: "Cursor AI IDE: Multi-File Edits, Codebase Indexing & .cursorrules",
                order: 1,
                duration: "40 min interactive sprint",
                difficulty: "Beginner",
                learningObjectives: [
                  "Understand how AI code editors build semantic vector indexes over your repository.",
                  "Master Composer (Cmd+I) and inline diff generation (Cmd+K) without introducing subtle bugs.",
                  "Enforce engineering standards and prevent hallucinations using strict .cursorrules and system instructions."
                ],
                overview: `Artificial Intelligence has transformed software engineering from manual syntax typing into high-leverage architectural orchestration. Modern AI-native IDEs like Cursor index your entire repository into a local semantic vector database. When you query the model using @codebase or ask for multi-file refactors, the IDE retrieves only the most relevant AST (Abstract Syntax Tree) slices, symbol declarations, and dependency trees to build a pinpoint context window for frontier models such as Claude 3.5 Sonnet.

However, unchecked reliance on AI code generators produces insidious architectural debt: hallucinations, ghost dependencies, security vulnerabilities, and brittle unmaintainable spaghetti code. Professional software engineers do not use AI as a replacement for thinking; they use it as an ultra-fast junior developer that must be strictly bounded.

By authoring explicit project rule files (such as .cursorrules or AGENTS.md), you define project invariants: language versions, mandatory typing conventions, forbidden dependencies, and directory structures. Furthermore, pairing AI code generation with immediate terminal test execution creates a self-healing development loop that increases velocity while preserving production safety.`,
                keyConcepts: [
                  {
                    title: "Codebase Semantic Indexing",
                    explanation: "Code files are parsed into semantic chunks and embedded into high-dimensional vectors, allowing natural language search over entire codebases."
                  },
                  {
                    title: "Prompt Architectures & Invariant Rules",
                    explanation: ".cursorrules and project system prompts act as guardrails, forcing the LLM to follow existing patterns and type signatures."
                  },
                  {
                    title: "Self-Healing Test Driven Loops",
                    explanation: "Directly piping compiler stderr and unit test failures back into the model context window allows it to resolve syntax and logic errors in seconds."
                  }
                ],
                practicalExamples: [
                  {
                    title: "Multi-File Authentication Refactor",
                    scenario: "Refactoring a Next.js App Router codebase from legacy cookie sessions to Supabase SSR JWT auth across 8 files simultaneously.",
                    takeaway: "Using Cursor Composer with explicit file mentions guarantees consistent imports and type signatures across routes and middleware."
                  },
                  {
                    title: "Automated Edge-Case Test Generation",
                    scenario: "Generating comprehensive Jest/Vitest test suites for a complex financial calculation function with negative inputs and floating point boundaries.",
                    takeaway: "AI excels at generating boundary condition tests that human engineers often overlook due to confirmation bias."
                  }
                ],
                codeSamples: [
                  {
                    language: "json",
                    filename: ".cursorrules",
                    code: `{\n  "version": "1.0",\n  "project": "CampusGrow Core",\n  "rules": [\n    "Strict TypeScript only with zero 'any' types.",\n    "Never install new npm packages without explicit permission.",\n    "Always use Tailwind CSS utility tokens matching emerald/mint palette.",\n    "Run 'npm run test' to verify all logic changes before outputting final diffs."\n  ]\n}`,
                    explanation: "Declarative project boundary file that ensures the AI assistant complies with team coding standards."
                  }
                ],
                practiceQuestions: [
                  "Why does full-repository vector indexing perform better than blind file copy-pasting into web chats?",
                  "What security risks arise when pasting proprietary codebase snippets into third-party cloud LLM providers?",
                  "How do .cursorrules enforce project invariants across large engineering teams?"
                ],
                mcqQuestions: [
                  {
                    id: "ai-q1",
                    question: "How does Cursor IDE's @codebase feature determine which files to include in the model context window?",
                    options: [
                      "It blindly sends all files in the directory regardless of size",
                      "It uses semantic vector search and AST symbol graphs to retrieve only relevant code slices",
                      "It only looks at the currently open active tab in the editor",
                      "It runs an external Google web search on the repository name"
                    ],
                    correctIndex: 1,
                    explanation: "Cursor uses embeddings and local vector indexes to perform semantic retrieval over your repository, pulling only high-relevance code chunks into the prompt."
                  },
                  {
                    id: "ai-q2",
                    question: "What is the primary danger of blindly accepting multi-file AI code generation without reading the diff?",
                    options: [
                      "The compiler will refuse to compile any AI generated code",
                      "The AI may hallucinate non-existent package methods or introduce silent race conditions and security vulnerabilities",
                      "The code editor automatically deletes your git repository",
                      "AI code generation runs 100x slower than typing by hand"
                    ],
                    correctIndex: 1,
                    explanation: "LLMs generate plausible token sequences that may appear syntactically correct while introducing subtle logic bugs, unvalidated inputs, or hallucinated APIs."
                  }
                ],
                assignment: {
                  title: "Author Production .cursorrules & Refactor Code",
                  description: "Create a production .cursorrules file for a TypeScript project, configure strict type rules, and prompt Cursor Composer to refactor a messy module with 100% test coverage.",
                  deliverables: [
                    "A validated .cursorrules configuration file",
                    "Git diff demonstrating multi-file refactoring with zero compiler warnings",
                    "A test suite passing with deterministic exit code 0"
                  ]
                }
              }
            ]
          }
        ]
      }
    ,
      {
        id: "network-defense-cryptography",
        title: "Applied Cryptography, TLS 1.3 & Network Defense",
        subtitle: "Symmetric vs Asymmetric ciphers, Diffie-Hellman, packet sniffing with Wireshark",
        description: "Understand mathematical data protection: AES-GCM, RSA key pairs, Elliptic Curve Cryptography (ECC), TLS handshakes, and packet analysis with Wireshark.",
        domainId: "cybersecurity",
        icon: "🛡️",
        difficulty: "Intermediate",
        durationHours: 35,
        technologies: ["Cryptography", "RSA / ECC", "TLS 1.3", "Wireshark", "Firewalls", "Zero Trust"],
        careerTags: ["Security Engineer", "Cryptographer", "Network Security Analyst"],
        image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=600&q=80",
        featured: true,
        isPublished: true,
        modules: [
          {
            id: "ai-tools-mod-01",
            title: "AI Developer Tooling & Velocity Workflows",
            description: "Cursor IDE, AI Codebase Indexing, Prompt Architectures, and Automated Unit Tests.",
            order: 1,
            lessons: [
              {
                id: "ai-tools-cursor-workflow",
                title: "Cursor AI IDE: Multi-File Edits, Codebase Indexing & .cursorrules",
                order: 1,
                duration: "40 min interactive sprint",
                difficulty: "Beginner",
                learningObjectives: [
                  "Understand how AI code editors build semantic vector indexes over your repository.",
                  "Master Composer (Cmd+I) and inline diff generation (Cmd+K) without introducing subtle bugs.",
                  "Enforce engineering standards and prevent hallucinations using strict .cursorrules and system instructions."
                ],
                overview: `Artificial Intelligence has transformed software engineering from manual syntax typing into high-leverage architectural orchestration. Modern AI-native IDEs like Cursor index your entire repository into a local semantic vector database. When you query the model using @codebase or ask for multi-file refactors, the IDE retrieves only the most relevant AST (Abstract Syntax Tree) slices, symbol declarations, and dependency trees to build a pinpoint context window for frontier models such as Claude 3.5 Sonnet.

However, unchecked reliance on AI code generators produces insidious architectural debt: hallucinations, ghost dependencies, security vulnerabilities, and brittle unmaintainable spaghetti code. Professional software engineers do not use AI as a replacement for thinking; they use it as an ultra-fast junior developer that must be strictly bounded.

By authoring explicit project rule files (such as .cursorrules or AGENTS.md), you define project invariants: language versions, mandatory typing conventions, forbidden dependencies, and directory structures. Furthermore, pairing AI code generation with immediate terminal test execution creates a self-healing development loop that increases velocity while preserving production safety.`,
                keyConcepts: [
                  {
                    title: "Codebase Semantic Indexing",
                    explanation: "Code files are parsed into semantic chunks and embedded into high-dimensional vectors, allowing natural language search over entire codebases."
                  },
                  {
                    title: "Prompt Architectures & Invariant Rules",
                    explanation: ".cursorrules and project system prompts act as guardrails, forcing the LLM to follow existing patterns and type signatures."
                  },
                  {
                    title: "Self-Healing Test Driven Loops",
                    explanation: "Directly piping compiler stderr and unit test failures back into the model context window allows it to resolve syntax and logic errors in seconds."
                  }
                ],
                practicalExamples: [
                  {
                    title: "Multi-File Authentication Refactor",
                    scenario: "Refactoring a Next.js App Router codebase from legacy cookie sessions to Supabase SSR JWT auth across 8 files simultaneously.",
                    takeaway: "Using Cursor Composer with explicit file mentions guarantees consistent imports and type signatures across routes and middleware."
                  },
                  {
                    title: "Automated Edge-Case Test Generation",
                    scenario: "Generating comprehensive Jest/Vitest test suites for a complex financial calculation function with negative inputs and floating point boundaries.",
                    takeaway: "AI excels at generating boundary condition tests that human engineers often overlook due to confirmation bias."
                  }
                ],
                codeSamples: [
                  {
                    language: "json",
                    filename: ".cursorrules",
                    code: `{\n  "version": "1.0",\n  "project": "CampusGrow Core",\n  "rules": [\n    "Strict TypeScript only with zero 'any' types.",\n    "Never install new npm packages without explicit permission.",\n    "Always use Tailwind CSS utility tokens matching emerald/mint palette.",\n    "Run 'npm run test' to verify all logic changes before outputting final diffs."\n  ]\n}`,
                    explanation: "Declarative project boundary file that ensures the AI assistant complies with team coding standards."
                  }
                ],
                practiceQuestions: [
                  "Why does full-repository vector indexing perform better than blind file copy-pasting into web chats?",
                  "What security risks arise when pasting proprietary codebase snippets into third-party cloud LLM providers?",
                  "How do .cursorrules enforce project invariants across large engineering teams?"
                ],
                mcqQuestions: [
                  {
                    id: "ai-q1",
                    question: "How does Cursor IDE's @codebase feature determine which files to include in the model context window?",
                    options: [
                      "It blindly sends all files in the directory regardless of size",
                      "It uses semantic vector search and AST symbol graphs to retrieve only relevant code slices",
                      "It only looks at the currently open active tab in the editor",
                      "It runs an external Google web search on the repository name"
                    ],
                    correctIndex: 1,
                    explanation: "Cursor uses embeddings and local vector indexes to perform semantic retrieval over your repository, pulling only high-relevance code chunks into the prompt."
                  },
                  {
                    id: "ai-q2",
                    question: "What is the primary danger of blindly accepting multi-file AI code generation without reading the diff?",
                    options: [
                      "The compiler will refuse to compile any AI generated code",
                      "The AI may hallucinate non-existent package methods or introduce silent race conditions and security vulnerabilities",
                      "The code editor automatically deletes your git repository",
                      "AI code generation runs 100x slower than typing by hand"
                    ],
                    correctIndex: 1,
                    explanation: "LLMs generate plausible token sequences that may appear syntactically correct while introducing subtle logic bugs, unvalidated inputs, or hallucinated APIs."
                  }
                ],
                assignment: {
                  title: "Author Production .cursorrules & Refactor Code",
                  description: "Create a production .cursorrules file for a TypeScript project, configure strict type rules, and prompt Cursor Composer to refactor a messy module with 100% test coverage.",
                  deliverables: [
                    "A validated .cursorrules configuration file",
                    "Git diff demonstrating multi-file refactoring with zero compiler warnings",
                    "A test suite passing with deterministic exit code 0"
                  ]
                }
              }
            ]
          }
        ]
      },
      {
        id: "binary-reverse-engineering",
        title: "Binary Exploitation & Reverse Engineering Foundations",
        subtitle: "GDB debugging, x86-64 assembly inspection, buffer overflows, and defensive security",
        description: "Dissect compiled binaries: understand CPU stack frames, analyze disassembly in Ghidra/GDB, exploit memory buffer overflows in C, and configure ASLR/DEP mitigations.",
        domainId: "cybersecurity",
        icon: "🔬",
        difficulty: "Advanced",
        durationHours: 35,
        technologies: ["x86_64 Assembly", "GDB", "Buffer Overflows", "Ghidra", "Memory Security"],
        careerTags: ["Security Researcher", "Reverse Engineer", "Penetration Tester"],
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
        featured: false,
        isPublished: true,
        modules: [
          {
            id: "ai-tools-mod-01",
            title: "AI Developer Tooling & Velocity Workflows",
            description: "Cursor IDE, AI Codebase Indexing, Prompt Architectures, and Automated Unit Tests.",
            order: 1,
            lessons: [
              {
                id: "ai-tools-cursor-workflow",
                title: "Cursor AI IDE: Multi-File Edits, Codebase Indexing & .cursorrules",
                order: 1,
                duration: "40 min interactive sprint",
                difficulty: "Beginner",
                learningObjectives: [
                  "Understand how AI code editors build semantic vector indexes over your repository.",
                  "Master Composer (Cmd+I) and inline diff generation (Cmd+K) without introducing subtle bugs.",
                  "Enforce engineering standards and prevent hallucinations using strict .cursorrules and system instructions."
                ],
                overview: `Artificial Intelligence has transformed software engineering from manual syntax typing into high-leverage architectural orchestration. Modern AI-native IDEs like Cursor index your entire repository into a local semantic vector database. When you query the model using @codebase or ask for multi-file refactors, the IDE retrieves only the most relevant AST (Abstract Syntax Tree) slices, symbol declarations, and dependency trees to build a pinpoint context window for frontier models such as Claude 3.5 Sonnet.

However, unchecked reliance on AI code generators produces insidious architectural debt: hallucinations, ghost dependencies, security vulnerabilities, and brittle unmaintainable spaghetti code. Professional software engineers do not use AI as a replacement for thinking; they use it as an ultra-fast junior developer that must be strictly bounded.

By authoring explicit project rule files (such as .cursorrules or AGENTS.md), you define project invariants: language versions, mandatory typing conventions, forbidden dependencies, and directory structures. Furthermore, pairing AI code generation with immediate terminal test execution creates a self-healing development loop that increases velocity while preserving production safety.`,
                keyConcepts: [
                  {
                    title: "Codebase Semantic Indexing",
                    explanation: "Code files are parsed into semantic chunks and embedded into high-dimensional vectors, allowing natural language search over entire codebases."
                  },
                  {
                    title: "Prompt Architectures & Invariant Rules",
                    explanation: ".cursorrules and project system prompts act as guardrails, forcing the LLM to follow existing patterns and type signatures."
                  },
                  {
                    title: "Self-Healing Test Driven Loops",
                    explanation: "Directly piping compiler stderr and unit test failures back into the model context window allows it to resolve syntax and logic errors in seconds."
                  }
                ],
                practicalExamples: [
                  {
                    title: "Multi-File Authentication Refactor",
                    scenario: "Refactoring a Next.js App Router codebase from legacy cookie sessions to Supabase SSR JWT auth across 8 files simultaneously.",
                    takeaway: "Using Cursor Composer with explicit file mentions guarantees consistent imports and type signatures across routes and middleware."
                  },
                  {
                    title: "Automated Edge-Case Test Generation",
                    scenario: "Generating comprehensive Jest/Vitest test suites for a complex financial calculation function with negative inputs and floating point boundaries.",
                    takeaway: "AI excels at generating boundary condition tests that human engineers often overlook due to confirmation bias."
                  }
                ],
                codeSamples: [
                  {
                    language: "json",
                    filename: ".cursorrules",
                    code: `{\n  "version": "1.0",\n  "project": "CampusGrow Core",\n  "rules": [\n    "Strict TypeScript only with zero 'any' types.",\n    "Never install new npm packages without explicit permission.",\n    "Always use Tailwind CSS utility tokens matching emerald/mint palette.",\n    "Run 'npm run test' to verify all logic changes before outputting final diffs."\n  ]\n}`,
                    explanation: "Declarative project boundary file that ensures the AI assistant complies with team coding standards."
                  }
                ],
                practiceQuestions: [
                  "Why does full-repository vector indexing perform better than blind file copy-pasting into web chats?",
                  "What security risks arise when pasting proprietary codebase snippets into third-party cloud LLM providers?",
                  "How do .cursorrules enforce project invariants across large engineering teams?"
                ],
                mcqQuestions: [
                  {
                    id: "ai-q1",
                    question: "How does Cursor IDE's @codebase feature determine which files to include in the model context window?",
                    options: [
                      "It blindly sends all files in the directory regardless of size",
                      "It uses semantic vector search and AST symbol graphs to retrieve only relevant code slices",
                      "It only looks at the currently open active tab in the editor",
                      "It runs an external Google web search on the repository name"
                    ],
                    correctIndex: 1,
                    explanation: "Cursor uses embeddings and local vector indexes to perform semantic retrieval over your repository, pulling only high-relevance code chunks into the prompt."
                  },
                  {
                    id: "ai-q2",
                    question: "What is the primary danger of blindly accepting multi-file AI code generation without reading the diff?",
                    options: [
                      "The compiler will refuse to compile any AI generated code",
                      "The AI may hallucinate non-existent package methods or introduce silent race conditions and security vulnerabilities",
                      "The code editor automatically deletes your git repository",
                      "AI code generation runs 100x slower than typing by hand"
                    ],
                    correctIndex: 1,
                    explanation: "LLMs generate plausible token sequences that may appear syntactically correct while introducing subtle logic bugs, unvalidated inputs, or hallucinated APIs."
                  }
                ],
                assignment: {
                  title: "Author Production .cursorrules & Refactor Code",
                  description: "Create a production .cursorrules file for a TypeScript project, configure strict type rules, and prompt Cursor Composer to refactor a messy module with 100% test coverage.",
                  deliverables: [
                    "A validated .cursorrules configuration file",
                    "Git diff demonstrating multi-file refactoring with zero compiler warnings",
                    "A test suite passing with deterministic exit code 0"
                  ]
                }
              }
            ]
          }
        ]
      },
    ]
  },

  // 10. Data Science and Analytics
  {
    id: "data-science-and-analytics",
    number: 10,
    title: "Data Science & Analytics",
    subtitle: "Statistical Inference, Exploratory Analysis & Big Data Pipelines",
    description: "Turn raw unstructured records into actionable predictive insights using Python, Pandas, statistical modeling, hypothesis testing, and business intelligence dashboards.",
    icon: "📈",
    badge: "Data Science",
    color: "from-teal-600 to-cyan-700",
    technologies: ["Python", "Pandas", "NumPy", "Statistics", "Seaborn", "PowerBI", "Hypothesis Testing", "Data Cleaning"],
    courses: [
      {
        id: "applied-statistics-data-analysis",
        title: "Applied Statistics, EDA & Predictive Modeling",
        subtitle: "Probability distributions, A/B testing, regression, and data storytelling",
        description: "Master real-world data science: hypothesis testing, outlier detection, statistical significance in A/B tests, and building clear executive presentations.",
        domainId: "data-science-and-analytics",
        icon: "📊",
        difficulty: "Beginner",
        durationHours: 30,
        technologies: ["Python", "Pandas", "Matplotlib", "SciPy", "A/B Testing", "Statistics"],
        careerTags: ["Data Scientist", "Business Analyst", "Quantitative Researcher"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
        featured: false,
        isPublished: true,
        modules: [
          {
            id: "ai-tools-mod-01",
            title: "AI Developer Tooling & Velocity Workflows",
            description: "Cursor IDE, AI Codebase Indexing, Prompt Architectures, and Automated Unit Tests.",
            order: 1,
            lessons: [
              {
                id: "ai-tools-cursor-workflow",
                title: "Cursor AI IDE: Multi-File Edits, Codebase Indexing & .cursorrules",
                order: 1,
                duration: "40 min interactive sprint",
                difficulty: "Beginner",
                learningObjectives: [
                  "Understand how AI code editors build semantic vector indexes over your repository.",
                  "Master Composer (Cmd+I) and inline diff generation (Cmd+K) without introducing subtle bugs.",
                  "Enforce engineering standards and prevent hallucinations using strict .cursorrules and system instructions."
                ],
                overview: `Artificial Intelligence has transformed software engineering from manual syntax typing into high-leverage architectural orchestration. Modern AI-native IDEs like Cursor index your entire repository into a local semantic vector database. When you query the model using @codebase or ask for multi-file refactors, the IDE retrieves only the most relevant AST (Abstract Syntax Tree) slices, symbol declarations, and dependency trees to build a pinpoint context window for frontier models such as Claude 3.5 Sonnet.

However, unchecked reliance on AI code generators produces insidious architectural debt: hallucinations, ghost dependencies, security vulnerabilities, and brittle unmaintainable spaghetti code. Professional software engineers do not use AI as a replacement for thinking; they use it as an ultra-fast junior developer that must be strictly bounded.

By authoring explicit project rule files (such as .cursorrules or AGENTS.md), you define project invariants: language versions, mandatory typing conventions, forbidden dependencies, and directory structures. Furthermore, pairing AI code generation with immediate terminal test execution creates a self-healing development loop that increases velocity while preserving production safety.`,
                keyConcepts: [
                  {
                    title: "Codebase Semantic Indexing",
                    explanation: "Code files are parsed into semantic chunks and embedded into high-dimensional vectors, allowing natural language search over entire codebases."
                  },
                  {
                    title: "Prompt Architectures & Invariant Rules",
                    explanation: ".cursorrules and project system prompts act as guardrails, forcing the LLM to follow existing patterns and type signatures."
                  },
                  {
                    title: "Self-Healing Test Driven Loops",
                    explanation: "Directly piping compiler stderr and unit test failures back into the model context window allows it to resolve syntax and logic errors in seconds."
                  }
                ],
                practicalExamples: [
                  {
                    title: "Multi-File Authentication Refactor",
                    scenario: "Refactoring a Next.js App Router codebase from legacy cookie sessions to Supabase SSR JWT auth across 8 files simultaneously.",
                    takeaway: "Using Cursor Composer with explicit file mentions guarantees consistent imports and type signatures across routes and middleware."
                  },
                  {
                    title: "Automated Edge-Case Test Generation",
                    scenario: "Generating comprehensive Jest/Vitest test suites for a complex financial calculation function with negative inputs and floating point boundaries.",
                    takeaway: "AI excels at generating boundary condition tests that human engineers often overlook due to confirmation bias."
                  }
                ],
                codeSamples: [
                  {
                    language: "json",
                    filename: ".cursorrules",
                    code: `{\n  "version": "1.0",\n  "project": "CampusGrow Core",\n  "rules": [\n    "Strict TypeScript only with zero 'any' types.",\n    "Never install new npm packages without explicit permission.",\n    "Always use Tailwind CSS utility tokens matching emerald/mint palette.",\n    "Run 'npm run test' to verify all logic changes before outputting final diffs."\n  ]\n}`,
                    explanation: "Declarative project boundary file that ensures the AI assistant complies with team coding standards."
                  }
                ],
                practiceQuestions: [
                  "Why does full-repository vector indexing perform better than blind file copy-pasting into web chats?",
                  "What security risks arise when pasting proprietary codebase snippets into third-party cloud LLM providers?",
                  "How do .cursorrules enforce project invariants across large engineering teams?"
                ],
                mcqQuestions: [
                  {
                    id: "ai-q1",
                    question: "How does Cursor IDE's @codebase feature determine which files to include in the model context window?",
                    options: [
                      "It blindly sends all files in the directory regardless of size",
                      "It uses semantic vector search and AST symbol graphs to retrieve only relevant code slices",
                      "It only looks at the currently open active tab in the editor",
                      "It runs an external Google web search on the repository name"
                    ],
                    correctIndex: 1,
                    explanation: "Cursor uses embeddings and local vector indexes to perform semantic retrieval over your repository, pulling only high-relevance code chunks into the prompt."
                  },
                  {
                    id: "ai-q2",
                    question: "What is the primary danger of blindly accepting multi-file AI code generation without reading the diff?",
                    options: [
                      "The compiler will refuse to compile any AI generated code",
                      "The AI may hallucinate non-existent package methods or introduce silent race conditions and security vulnerabilities",
                      "The code editor automatically deletes your git repository",
                      "AI code generation runs 100x slower than typing by hand"
                    ],
                    correctIndex: 1,
                    explanation: "LLMs generate plausible token sequences that may appear syntactically correct while introducing subtle logic bugs, unvalidated inputs, or hallucinated APIs."
                  }
                ],
                assignment: {
                  title: "Author Production .cursorrules & Refactor Code",
                  description: "Create a production .cursorrules file for a TypeScript project, configure strict type rules, and prompt Cursor Composer to refactor a messy module with 100% test coverage.",
                  deliverables: [
                    "A validated .cursorrules configuration file",
                    "Git diff demonstrating multi-file refactoring with zero compiler warnings",
                    "A test suite passing with deterministic exit code 0"
                  ]
                }
              }
            ]
          }
        ]
      }
    ,
      {
        id: "big-data-sql-analytics-bigquery",
        title: "Cloud Data Warehousing & Advanced SQL Analytics",
        subtitle: "Window functions, partitioning, BigQuery analytics, and business reporting",
        description: "Analyze terabyte-scale datasets: SQL window functions (ROW_NUMBER, LEAD, LAG), query optimization, partitioning, clustering, and BI dashboard visualization.",
        domainId: "data-science-and-analytics",
        icon: "📊",
        difficulty: "Intermediate",
        durationHours: 30,
        technologies: ["BigQuery", "Advanced SQL", "Window Functions", "Data Modeling", "Looker Studio"],
        careerTags: ["Data Analyst", "Analytics Engineer", "BI Developer"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
        featured: true,
        isPublished: true,
        modules: [
          {
            id: "ai-tools-mod-01",
            title: "AI Developer Tooling & Velocity Workflows",
            description: "Cursor IDE, AI Codebase Indexing, Prompt Architectures, and Automated Unit Tests.",
            order: 1,
            lessons: [
              {
                id: "ai-tools-cursor-workflow",
                title: "Cursor AI IDE: Multi-File Edits, Codebase Indexing & .cursorrules",
                order: 1,
                duration: "40 min interactive sprint",
                difficulty: "Beginner",
                learningObjectives: [
                  "Understand how AI code editors build semantic vector indexes over your repository.",
                  "Master Composer (Cmd+I) and inline diff generation (Cmd+K) without introducing subtle bugs.",
                  "Enforce engineering standards and prevent hallucinations using strict .cursorrules and system instructions."
                ],
                overview: `Artificial Intelligence has transformed software engineering from manual syntax typing into high-leverage architectural orchestration. Modern AI-native IDEs like Cursor index your entire repository into a local semantic vector database. When you query the model using @codebase or ask for multi-file refactors, the IDE retrieves only the most relevant AST (Abstract Syntax Tree) slices, symbol declarations, and dependency trees to build a pinpoint context window for frontier models such as Claude 3.5 Sonnet.

However, unchecked reliance on AI code generators produces insidious architectural debt: hallucinations, ghost dependencies, security vulnerabilities, and brittle unmaintainable spaghetti code. Professional software engineers do not use AI as a replacement for thinking; they use it as an ultra-fast junior developer that must be strictly bounded.

By authoring explicit project rule files (such as .cursorrules or AGENTS.md), you define project invariants: language versions, mandatory typing conventions, forbidden dependencies, and directory structures. Furthermore, pairing AI code generation with immediate terminal test execution creates a self-healing development loop that increases velocity while preserving production safety.`,
                keyConcepts: [
                  {
                    title: "Codebase Semantic Indexing",
                    explanation: "Code files are parsed into semantic chunks and embedded into high-dimensional vectors, allowing natural language search over entire codebases."
                  },
                  {
                    title: "Prompt Architectures & Invariant Rules",
                    explanation: ".cursorrules and project system prompts act as guardrails, forcing the LLM to follow existing patterns and type signatures."
                  },
                  {
                    title: "Self-Healing Test Driven Loops",
                    explanation: "Directly piping compiler stderr and unit test failures back into the model context window allows it to resolve syntax and logic errors in seconds."
                  }
                ],
                practicalExamples: [
                  {
                    title: "Multi-File Authentication Refactor",
                    scenario: "Refactoring a Next.js App Router codebase from legacy cookie sessions to Supabase SSR JWT auth across 8 files simultaneously.",
                    takeaway: "Using Cursor Composer with explicit file mentions guarantees consistent imports and type signatures across routes and middleware."
                  },
                  {
                    title: "Automated Edge-Case Test Generation",
                    scenario: "Generating comprehensive Jest/Vitest test suites for a complex financial calculation function with negative inputs and floating point boundaries.",
                    takeaway: "AI excels at generating boundary condition tests that human engineers often overlook due to confirmation bias."
                  }
                ],
                codeSamples: [
                  {
                    language: "json",
                    filename: ".cursorrules",
                    code: `{\n  "version": "1.0",\n  "project": "CampusGrow Core",\n  "rules": [\n    "Strict TypeScript only with zero 'any' types.",\n    "Never install new npm packages without explicit permission.",\n    "Always use Tailwind CSS utility tokens matching emerald/mint palette.",\n    "Run 'npm run test' to verify all logic changes before outputting final diffs."\n  ]\n}`,
                    explanation: "Declarative project boundary file that ensures the AI assistant complies with team coding standards."
                  }
                ],
                practiceQuestions: [
                  "Why does full-repository vector indexing perform better than blind file copy-pasting into web chats?",
                  "What security risks arise when pasting proprietary codebase snippets into third-party cloud LLM providers?",
                  "How do .cursorrules enforce project invariants across large engineering teams?"
                ],
                mcqQuestions: [
                  {
                    id: "ai-q1",
                    question: "How does Cursor IDE's @codebase feature determine which files to include in the model context window?",
                    options: [
                      "It blindly sends all files in the directory regardless of size",
                      "It uses semantic vector search and AST symbol graphs to retrieve only relevant code slices",
                      "It only looks at the currently open active tab in the editor",
                      "It runs an external Google web search on the repository name"
                    ],
                    correctIndex: 1,
                    explanation: "Cursor uses embeddings and local vector indexes to perform semantic retrieval over your repository, pulling only high-relevance code chunks into the prompt."
                  },
                  {
                    id: "ai-q2",
                    question: "What is the primary danger of blindly accepting multi-file AI code generation without reading the diff?",
                    options: [
                      "The compiler will refuse to compile any AI generated code",
                      "The AI may hallucinate non-existent package methods or introduce silent race conditions and security vulnerabilities",
                      "The code editor automatically deletes your git repository",
                      "AI code generation runs 100x slower than typing by hand"
                    ],
                    correctIndex: 1,
                    explanation: "LLMs generate plausible token sequences that may appear syntactically correct while introducing subtle logic bugs, unvalidated inputs, or hallucinated APIs."
                  }
                ],
                assignment: {
                  title: "Author Production .cursorrules & Refactor Code",
                  description: "Create a production .cursorrules file for a TypeScript project, configure strict type rules, and prompt Cursor Composer to refactor a messy module with 100% test coverage.",
                  deliverables: [
                    "A validated .cursorrules configuration file",
                    "Git diff demonstrating multi-file refactoring with zero compiler warnings",
                    "A test suite passing with deterministic exit code 0"
                  ]
                }
              }
            ]
          }
        ]
      },
      {
        id: "data-engineering-spark-etl",
        title: "Data Wrangling, Feature Pipelines & Dimensional Modeling",
        subtitle: "Star and Snowflake schemas, data cleaning pipelines, and automated reporting",
        description: "Build robust data ingestion pipelines: handle missing values, transform data with Pandas and dbt, design dimensional star schemas, and automate data quality assertions.",
        domainId: "data-science-and-analytics",
        icon: "🧹",
        difficulty: "Intermediate",
        durationHours: 30,
        technologies: ["Python", "Pandas", "Dimensional Modeling", "Data Cleaning", "dbt", "SQL"],
        careerTags: ["Analytics Engineer", "Data Scientist", "Data Wrangler"],
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
        featured: false,
        isPublished: true,
        modules: [
          {
            id: "ai-tools-mod-01",
            title: "AI Developer Tooling & Velocity Workflows",
            description: "Cursor IDE, AI Codebase Indexing, Prompt Architectures, and Automated Unit Tests.",
            order: 1,
            lessons: [
              {
                id: "ai-tools-cursor-workflow",
                title: "Cursor AI IDE: Multi-File Edits, Codebase Indexing & .cursorrules",
                order: 1,
                duration: "40 min interactive sprint",
                difficulty: "Beginner",
                learningObjectives: [
                  "Understand how AI code editors build semantic vector indexes over your repository.",
                  "Master Composer (Cmd+I) and inline diff generation (Cmd+K) without introducing subtle bugs.",
                  "Enforce engineering standards and prevent hallucinations using strict .cursorrules and system instructions."
                ],
                overview: `Artificial Intelligence has transformed software engineering from manual syntax typing into high-leverage architectural orchestration. Modern AI-native IDEs like Cursor index your entire repository into a local semantic vector database. When you query the model using @codebase or ask for multi-file refactors, the IDE retrieves only the most relevant AST (Abstract Syntax Tree) slices, symbol declarations, and dependency trees to build a pinpoint context window for frontier models such as Claude 3.5 Sonnet.

However, unchecked reliance on AI code generators produces insidious architectural debt: hallucinations, ghost dependencies, security vulnerabilities, and brittle unmaintainable spaghetti code. Professional software engineers do not use AI as a replacement for thinking; they use it as an ultra-fast junior developer that must be strictly bounded.

By authoring explicit project rule files (such as .cursorrules or AGENTS.md), you define project invariants: language versions, mandatory typing conventions, forbidden dependencies, and directory structures. Furthermore, pairing AI code generation with immediate terminal test execution creates a self-healing development loop that increases velocity while preserving production safety.`,
                keyConcepts: [
                  {
                    title: "Codebase Semantic Indexing",
                    explanation: "Code files are parsed into semantic chunks and embedded into high-dimensional vectors, allowing natural language search over entire codebases."
                  },
                  {
                    title: "Prompt Architectures & Invariant Rules",
                    explanation: ".cursorrules and project system prompts act as guardrails, forcing the LLM to follow existing patterns and type signatures."
                  },
                  {
                    title: "Self-Healing Test Driven Loops",
                    explanation: "Directly piping compiler stderr and unit test failures back into the model context window allows it to resolve syntax and logic errors in seconds."
                  }
                ],
                practicalExamples: [
                  {
                    title: "Multi-File Authentication Refactor",
                    scenario: "Refactoring a Next.js App Router codebase from legacy cookie sessions to Supabase SSR JWT auth across 8 files simultaneously.",
                    takeaway: "Using Cursor Composer with explicit file mentions guarantees consistent imports and type signatures across routes and middleware."
                  },
                  {
                    title: "Automated Edge-Case Test Generation",
                    scenario: "Generating comprehensive Jest/Vitest test suites for a complex financial calculation function with negative inputs and floating point boundaries.",
                    takeaway: "AI excels at generating boundary condition tests that human engineers often overlook due to confirmation bias."
                  }
                ],
                codeSamples: [
                  {
                    language: "json",
                    filename: ".cursorrules",
                    code: `{\n  "version": "1.0",\n  "project": "CampusGrow Core",\n  "rules": [\n    "Strict TypeScript only with zero 'any' types.",\n    "Never install new npm packages without explicit permission.",\n    "Always use Tailwind CSS utility tokens matching emerald/mint palette.",\n    "Run 'npm run test' to verify all logic changes before outputting final diffs."\n  ]\n}`,
                    explanation: "Declarative project boundary file that ensures the AI assistant complies with team coding standards."
                  }
                ],
                practiceQuestions: [
                  "Why does full-repository vector indexing perform better than blind file copy-pasting into web chats?",
                  "What security risks arise when pasting proprietary codebase snippets into third-party cloud LLM providers?",
                  "How do .cursorrules enforce project invariants across large engineering teams?"
                ],
                mcqQuestions: [
                  {
                    id: "ai-q1",
                    question: "How does Cursor IDE's @codebase feature determine which files to include in the model context window?",
                    options: [
                      "It blindly sends all files in the directory regardless of size",
                      "It uses semantic vector search and AST symbol graphs to retrieve only relevant code slices",
                      "It only looks at the currently open active tab in the editor",
                      "It runs an external Google web search on the repository name"
                    ],
                    correctIndex: 1,
                    explanation: "Cursor uses embeddings and local vector indexes to perform semantic retrieval over your repository, pulling only high-relevance code chunks into the prompt."
                  },
                  {
                    id: "ai-q2",
                    question: "What is the primary danger of blindly accepting multi-file AI code generation without reading the diff?",
                    options: [
                      "The compiler will refuse to compile any AI generated code",
                      "The AI may hallucinate non-existent package methods or introduce silent race conditions and security vulnerabilities",
                      "The code editor automatically deletes your git repository",
                      "AI code generation runs 100x slower than typing by hand"
                    ],
                    correctIndex: 1,
                    explanation: "LLMs generate plausible token sequences that may appear syntactically correct while introducing subtle logic bugs, unvalidated inputs, or hallucinated APIs."
                  }
                ],
                assignment: {
                  title: "Author Production .cursorrules & Refactor Code",
                  description: "Create a production .cursorrules file for a TypeScript project, configure strict type rules, and prompt Cursor Composer to refactor a messy module with 100% test coverage.",
                  deliverables: [
                    "A validated .cursorrules configuration file",
                    "Git diff demonstrating multi-file refactoring with zero compiler warnings",
                    "A test suite passing with deterministic exit code 0"
                  ]
                }
              }
            ]
          }
        ]
      },
    ]
  },

  // 11. Software Engineering and Developer Tools
  {
    id: "software-engineering-and-tools",
    number: 11,
    title: "Software Engineering & Developer Tools",
    subtitle: "Git Mastery, Architecture Design Patterns & Clean Code Craft",
    description: "Professional tools and methodologies: Git rebasing and merge conflict resolution, VS Code productivity, Design Patterns (Gang of Four), and Test-Driven Development (TDD).",
    icon: "🛠️",
    badge: "Engineering Craft",
    color: "from-slate-700 to-zinc-800",
    technologies: ["Git", "GitHub", "VS Code", "Design Patterns", "TDD", "CI/CD", "Jira", "Postman", "Code Review"],
    courses: [
      {
        id: "git-github-developer-workflows",
        title: "Git, GitHub & Professional Developer Tooling",
        subtitle: "Interactive rebasing, bisecting bugs, pull request etiquette, and CI workflows",
        description: "Master the tool you will use every day of your professional life: resolving hairy merge conflicts, cherry-picking commits, and automating releases with GitHub Actions.",
        domainId: "software-engineering-and-tools",
        icon: "🐙",
        difficulty: "Beginner",
        durationHours: 20,
        technologies: ["Git", "GitHub", "Rebase", "Bisect", "SSH Keys", "PR Reviews"],
        careerTags: ["Software Engineer", "All Engineering Students", "Open Source Contributor"],
        image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=600&q=80",
        featured: true,
        isPublished: true,
        modules: [
          {
            id: "ai-tools-mod-01",
            title: "AI Developer Tooling & Velocity Workflows",
            description: "Cursor IDE, AI Codebase Indexing, Prompt Architectures, and Automated Unit Tests.",
            order: 1,
            lessons: [
              {
                id: "ai-tools-cursor-workflow",
                title: "Cursor AI IDE: Multi-File Edits, Codebase Indexing & .cursorrules",
                order: 1,
                duration: "40 min interactive sprint",
                difficulty: "Beginner",
                learningObjectives: [
                  "Understand how AI code editors build semantic vector indexes over your repository.",
                  "Master Composer (Cmd+I) and inline diff generation (Cmd+K) without introducing subtle bugs.",
                  "Enforce engineering standards and prevent hallucinations using strict .cursorrules and system instructions."
                ],
                overview: `Artificial Intelligence has transformed software engineering from manual syntax typing into high-leverage architectural orchestration. Modern AI-native IDEs like Cursor index your entire repository into a local semantic vector database. When you query the model using @codebase or ask for multi-file refactors, the IDE retrieves only the most relevant AST (Abstract Syntax Tree) slices, symbol declarations, and dependency trees to build a pinpoint context window for frontier models such as Claude 3.5 Sonnet.

However, unchecked reliance on AI code generators produces insidious architectural debt: hallucinations, ghost dependencies, security vulnerabilities, and brittle unmaintainable spaghetti code. Professional software engineers do not use AI as a replacement for thinking; they use it as an ultra-fast junior developer that must be strictly bounded.

By authoring explicit project rule files (such as .cursorrules or AGENTS.md), you define project invariants: language versions, mandatory typing conventions, forbidden dependencies, and directory structures. Furthermore, pairing AI code generation with immediate terminal test execution creates a self-healing development loop that increases velocity while preserving production safety.`,
                keyConcepts: [
                  {
                    title: "Codebase Semantic Indexing",
                    explanation: "Code files are parsed into semantic chunks and embedded into high-dimensional vectors, allowing natural language search over entire codebases."
                  },
                  {
                    title: "Prompt Architectures & Invariant Rules",
                    explanation: ".cursorrules and project system prompts act as guardrails, forcing the LLM to follow existing patterns and type signatures."
                  },
                  {
                    title: "Self-Healing Test Driven Loops",
                    explanation: "Directly piping compiler stderr and unit test failures back into the model context window allows it to resolve syntax and logic errors in seconds."
                  }
                ],
                practicalExamples: [
                  {
                    title: "Multi-File Authentication Refactor",
                    scenario: "Refactoring a Next.js App Router codebase from legacy cookie sessions to Supabase SSR JWT auth across 8 files simultaneously.",
                    takeaway: "Using Cursor Composer with explicit file mentions guarantees consistent imports and type signatures across routes and middleware."
                  },
                  {
                    title: "Automated Edge-Case Test Generation",
                    scenario: "Generating comprehensive Jest/Vitest test suites for a complex financial calculation function with negative inputs and floating point boundaries.",
                    takeaway: "AI excels at generating boundary condition tests that human engineers often overlook due to confirmation bias."
                  }
                ],
                codeSamples: [
                  {
                    language: "json",
                    filename: ".cursorrules",
                    code: `{\n  "version": "1.0",\n  "project": "CampusGrow Core",\n  "rules": [\n    "Strict TypeScript only with zero 'any' types.",\n    "Never install new npm packages without explicit permission.",\n    "Always use Tailwind CSS utility tokens matching emerald/mint palette.",\n    "Run 'npm run test' to verify all logic changes before outputting final diffs."\n  ]\n}`,
                    explanation: "Declarative project boundary file that ensures the AI assistant complies with team coding standards."
                  }
                ],
                practiceQuestions: [
                  "Why does full-repository vector indexing perform better than blind file copy-pasting into web chats?",
                  "What security risks arise when pasting proprietary codebase snippets into third-party cloud LLM providers?",
                  "How do .cursorrules enforce project invariants across large engineering teams?"
                ],
                mcqQuestions: [
                  {
                    id: "ai-q1",
                    question: "How does Cursor IDE's @codebase feature determine which files to include in the model context window?",
                    options: [
                      "It blindly sends all files in the directory regardless of size",
                      "It uses semantic vector search and AST symbol graphs to retrieve only relevant code slices",
                      "It only looks at the currently open active tab in the editor",
                      "It runs an external Google web search on the repository name"
                    ],
                    correctIndex: 1,
                    explanation: "Cursor uses embeddings and local vector indexes to perform semantic retrieval over your repository, pulling only high-relevance code chunks into the prompt."
                  },
                  {
                    id: "ai-q2",
                    question: "What is the primary danger of blindly accepting multi-file AI code generation without reading the diff?",
                    options: [
                      "The compiler will refuse to compile any AI generated code",
                      "The AI may hallucinate non-existent package methods or introduce silent race conditions and security vulnerabilities",
                      "The code editor automatically deletes your git repository",
                      "AI code generation runs 100x slower than typing by hand"
                    ],
                    correctIndex: 1,
                    explanation: "LLMs generate plausible token sequences that may appear syntactically correct while introducing subtle logic bugs, unvalidated inputs, or hallucinated APIs."
                  }
                ],
                assignment: {
                  title: "Author Production .cursorrules & Refactor Code",
                  description: "Create a production .cursorrules file for a TypeScript project, configure strict type rules, and prompt Cursor Composer to refactor a messy module with 100% test coverage.",
                  deliverables: [
                    "A validated .cursorrules configuration file",
                    "Git diff demonstrating multi-file refactoring with zero compiler warnings",
                    "A test suite passing with deterministic exit code 0"
                  ]
                }
              }
            ]
          }
        ]
      }
    ,
      {
        id: "clean-architecture-design-patterns",
        title: "Software Architecture, SOLID & Gang of Four Design Patterns",
        subtitle: "Factory, Strategy, Observer, Decorator, and Hexagonal Ports & Adapters",
        description: "Write clean, decoupled, maintainable software: apply Single Responsibility, Open-Closed, Dependency Inversion, and classic creational/behavioral patterns in production.",
        domainId: "software-engineering-and-tools",
        icon: "🏛️",
        difficulty: "Intermediate",
        durationHours: 35,
        technologies: ["Design Patterns", "SOLID", "Clean Architecture", "UML", "OOP", "Refactoring"],
        careerTags: ["Software Engineer", "Systems Architect", "Senior Developer"],
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
        featured: true,
        isPublished: true,
        modules: [
          {
            id: "ai-tools-mod-01",
            title: "AI Developer Tooling & Velocity Workflows",
            description: "Cursor IDE, AI Codebase Indexing, Prompt Architectures, and Automated Unit Tests.",
            order: 1,
            lessons: [
              {
                id: "ai-tools-cursor-workflow",
                title: "Cursor AI IDE: Multi-File Edits, Codebase Indexing & .cursorrules",
                order: 1,
                duration: "40 min interactive sprint",
                difficulty: "Beginner",
                learningObjectives: [
                  "Understand how AI code editors build semantic vector indexes over your repository.",
                  "Master Composer (Cmd+I) and inline diff generation (Cmd+K) without introducing subtle bugs.",
                  "Enforce engineering standards and prevent hallucinations using strict .cursorrules and system instructions."
                ],
                overview: `Artificial Intelligence has transformed software engineering from manual syntax typing into high-leverage architectural orchestration. Modern AI-native IDEs like Cursor index your entire repository into a local semantic vector database. When you query the model using @codebase or ask for multi-file refactors, the IDE retrieves only the most relevant AST (Abstract Syntax Tree) slices, symbol declarations, and dependency trees to build a pinpoint context window for frontier models such as Claude 3.5 Sonnet.

However, unchecked reliance on AI code generators produces insidious architectural debt: hallucinations, ghost dependencies, security vulnerabilities, and brittle unmaintainable spaghetti code. Professional software engineers do not use AI as a replacement for thinking; they use it as an ultra-fast junior developer that must be strictly bounded.

By authoring explicit project rule files (such as .cursorrules or AGENTS.md), you define project invariants: language versions, mandatory typing conventions, forbidden dependencies, and directory structures. Furthermore, pairing AI code generation with immediate terminal test execution creates a self-healing development loop that increases velocity while preserving production safety.`,
                keyConcepts: [
                  {
                    title: "Codebase Semantic Indexing",
                    explanation: "Code files are parsed into semantic chunks and embedded into high-dimensional vectors, allowing natural language search over entire codebases."
                  },
                  {
                    title: "Prompt Architectures & Invariant Rules",
                    explanation: ".cursorrules and project system prompts act as guardrails, forcing the LLM to follow existing patterns and type signatures."
                  },
                  {
                    title: "Self-Healing Test Driven Loops",
                    explanation: "Directly piping compiler stderr and unit test failures back into the model context window allows it to resolve syntax and logic errors in seconds."
                  }
                ],
                practicalExamples: [
                  {
                    title: "Multi-File Authentication Refactor",
                    scenario: "Refactoring a Next.js App Router codebase from legacy cookie sessions to Supabase SSR JWT auth across 8 files simultaneously.",
                    takeaway: "Using Cursor Composer with explicit file mentions guarantees consistent imports and type signatures across routes and middleware."
                  },
                  {
                    title: "Automated Edge-Case Test Generation",
                    scenario: "Generating comprehensive Jest/Vitest test suites for a complex financial calculation function with negative inputs and floating point boundaries.",
                    takeaway: "AI excels at generating boundary condition tests that human engineers often overlook due to confirmation bias."
                  }
                ],
                codeSamples: [
                  {
                    language: "json",
                    filename: ".cursorrules",
                    code: `{\n  "version": "1.0",\n  "project": "CampusGrow Core",\n  "rules": [\n    "Strict TypeScript only with zero 'any' types.",\n    "Never install new npm packages without explicit permission.",\n    "Always use Tailwind CSS utility tokens matching emerald/mint palette.",\n    "Run 'npm run test' to verify all logic changes before outputting final diffs."\n  ]\n}`,
                    explanation: "Declarative project boundary file that ensures the AI assistant complies with team coding standards."
                  }
                ],
                practiceQuestions: [
                  "Why does full-repository vector indexing perform better than blind file copy-pasting into web chats?",
                  "What security risks arise when pasting proprietary codebase snippets into third-party cloud LLM providers?",
                  "How do .cursorrules enforce project invariants across large engineering teams?"
                ],
                mcqQuestions: [
                  {
                    id: "ai-q1",
                    question: "How does Cursor IDE's @codebase feature determine which files to include in the model context window?",
                    options: [
                      "It blindly sends all files in the directory regardless of size",
                      "It uses semantic vector search and AST symbol graphs to retrieve only relevant code slices",
                      "It only looks at the currently open active tab in the editor",
                      "It runs an external Google web search on the repository name"
                    ],
                    correctIndex: 1,
                    explanation: "Cursor uses embeddings and local vector indexes to perform semantic retrieval over your repository, pulling only high-relevance code chunks into the prompt."
                  },
                  {
                    id: "ai-q2",
                    question: "What is the primary danger of blindly accepting multi-file AI code generation without reading the diff?",
                    options: [
                      "The compiler will refuse to compile any AI generated code",
                      "The AI may hallucinate non-existent package methods or introduce silent race conditions and security vulnerabilities",
                      "The code editor automatically deletes your git repository",
                      "AI code generation runs 100x slower than typing by hand"
                    ],
                    correctIndex: 1,
                    explanation: "LLMs generate plausible token sequences that may appear syntactically correct while introducing subtle logic bugs, unvalidated inputs, or hallucinated APIs."
                  }
                ],
                assignment: {
                  title: "Author Production .cursorrules & Refactor Code",
                  description: "Create a production .cursorrules file for a TypeScript project, configure strict type rules, and prompt Cursor Composer to refactor a messy module with 100% test coverage.",
                  deliverables: [
                    "A validated .cursorrules configuration file",
                    "Git diff demonstrating multi-file refactoring with zero compiler warnings",
                    "A test suite passing with deterministic exit code 0"
                  ]
                }
              }
            ]
          }
        ]
      },
      {
        id: "test-driven-development-ci-gates",
        title: "Test-Driven Development (TDD) & Quality Assurance Engineering",
        subtitle: "Unit testing, integration suites, mocking, code coverage, and regression gates",
        description: "Never ship buggy code again: master red-green-refactor TDD cycles, mock external network calls, write integration tests with Jest/PyTest, and enforce 90%+ branch coverage.",
        domainId: "software-engineering-and-tools",
        icon: "🧪",
        difficulty: "Beginner",
        durationHours: 25,
        technologies: ["Jest", "PyTest", "TDD", "Mocking", "Code Coverage", "CI Gates"],
        careerTags: ["QA Engineer", "Software Developer in Test (SDET)", "Software Engineer"],
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
        featured: false,
        isPublished: true,
        modules: [
          {
            id: "ai-tools-mod-01",
            title: "AI Developer Tooling & Velocity Workflows",
            description: "Cursor IDE, AI Codebase Indexing, Prompt Architectures, and Automated Unit Tests.",
            order: 1,
            lessons: [
              {
                id: "ai-tools-cursor-workflow",
                title: "Cursor AI IDE: Multi-File Edits, Codebase Indexing & .cursorrules",
                order: 1,
                duration: "40 min interactive sprint",
                difficulty: "Beginner",
                learningObjectives: [
                  "Understand how AI code editors build semantic vector indexes over your repository.",
                  "Master Composer (Cmd+I) and inline diff generation (Cmd+K) without introducing subtle bugs.",
                  "Enforce engineering standards and prevent hallucinations using strict .cursorrules and system instructions."
                ],
                overview: `Artificial Intelligence has transformed software engineering from manual syntax typing into high-leverage architectural orchestration. Modern AI-native IDEs like Cursor index your entire repository into a local semantic vector database. When you query the model using @codebase or ask for multi-file refactors, the IDE retrieves only the most relevant AST (Abstract Syntax Tree) slices, symbol declarations, and dependency trees to build a pinpoint context window for frontier models such as Claude 3.5 Sonnet.

However, unchecked reliance on AI code generators produces insidious architectural debt: hallucinations, ghost dependencies, security vulnerabilities, and brittle unmaintainable spaghetti code. Professional software engineers do not use AI as a replacement for thinking; they use it as an ultra-fast junior developer that must be strictly bounded.

By authoring explicit project rule files (such as .cursorrules or AGENTS.md), you define project invariants: language versions, mandatory typing conventions, forbidden dependencies, and directory structures. Furthermore, pairing AI code generation with immediate terminal test execution creates a self-healing development loop that increases velocity while preserving production safety.`,
                keyConcepts: [
                  {
                    title: "Codebase Semantic Indexing",
                    explanation: "Code files are parsed into semantic chunks and embedded into high-dimensional vectors, allowing natural language search over entire codebases."
                  },
                  {
                    title: "Prompt Architectures & Invariant Rules",
                    explanation: ".cursorrules and project system prompts act as guardrails, forcing the LLM to follow existing patterns and type signatures."
                  },
                  {
                    title: "Self-Healing Test Driven Loops",
                    explanation: "Directly piping compiler stderr and unit test failures back into the model context window allows it to resolve syntax and logic errors in seconds."
                  }
                ],
                practicalExamples: [
                  {
                    title: "Multi-File Authentication Refactor",
                    scenario: "Refactoring a Next.js App Router codebase from legacy cookie sessions to Supabase SSR JWT auth across 8 files simultaneously.",
                    takeaway: "Using Cursor Composer with explicit file mentions guarantees consistent imports and type signatures across routes and middleware."
                  },
                  {
                    title: "Automated Edge-Case Test Generation",
                    scenario: "Generating comprehensive Jest/Vitest test suites for a complex financial calculation function with negative inputs and floating point boundaries.",
                    takeaway: "AI excels at generating boundary condition tests that human engineers often overlook due to confirmation bias."
                  }
                ],
                codeSamples: [
                  {
                    language: "json",
                    filename: ".cursorrules",
                    code: `{\n  "version": "1.0",\n  "project": "CampusGrow Core",\n  "rules": [\n    "Strict TypeScript only with zero 'any' types.",\n    "Never install new npm packages without explicit permission.",\n    "Always use Tailwind CSS utility tokens matching emerald/mint palette.",\n    "Run 'npm run test' to verify all logic changes before outputting final diffs."\n  ]\n}`,
                    explanation: "Declarative project boundary file that ensures the AI assistant complies with team coding standards."
                  }
                ],
                practiceQuestions: [
                  "Why does full-repository vector indexing perform better than blind file copy-pasting into web chats?",
                  "What security risks arise when pasting proprietary codebase snippets into third-party cloud LLM providers?",
                  "How do .cursorrules enforce project invariants across large engineering teams?"
                ],
                mcqQuestions: [
                  {
                    id: "ai-q1",
                    question: "How does Cursor IDE's @codebase feature determine which files to include in the model context window?",
                    options: [
                      "It blindly sends all files in the directory regardless of size",
                      "It uses semantic vector search and AST symbol graphs to retrieve only relevant code slices",
                      "It only looks at the currently open active tab in the editor",
                      "It runs an external Google web search on the repository name"
                    ],
                    correctIndex: 1,
                    explanation: "Cursor uses embeddings and local vector indexes to perform semantic retrieval over your repository, pulling only high-relevance code chunks into the prompt."
                  },
                  {
                    id: "ai-q2",
                    question: "What is the primary danger of blindly accepting multi-file AI code generation without reading the diff?",
                    options: [
                      "The compiler will refuse to compile any AI generated code",
                      "The AI may hallucinate non-existent package methods or introduce silent race conditions and security vulnerabilities",
                      "The code editor automatically deletes your git repository",
                      "AI code generation runs 100x slower than typing by hand"
                    ],
                    correctIndex: 1,
                    explanation: "LLMs generate plausible token sequences that may appear syntactically correct while introducing subtle logic bugs, unvalidated inputs, or hallucinated APIs."
                  }
                ],
                assignment: {
                  title: "Author Production .cursorrules & Refactor Code",
                  description: "Create a production .cursorrules file for a TypeScript project, configure strict type rules, and prompt Cursor Composer to refactor a messy module with 100% test coverage.",
                  deliverables: [
                    "A validated .cursorrules configuration file",
                    "Git diff demonstrating multi-file refactoring with zero compiler warnings",
                    "A test suite passing with deterministic exit code 0"
                  ]
                }
              }
            ]
          }
        ]
      },
    ]
  },

  // 12. Emerging Technologies
  {
    id: "emerging-technologies",
    number: 12,
    title: "Emerging Technologies",
    subtitle: "Web3, Quantum Computing, Spatial Computing & Edge AI",
    description: "Stay ahead of industry disruption: explore decentralized consensus in Web3, quantum circuit simulators, WebGL 3D spatial user interfaces, and TinyML on embedded microcontrollers.",
    icon: "🚀",
    badge: "Next-Gen Tech",
    color: "from-fuchsia-600 to-purple-700",
    technologies: ["Web3", "Blockchain", "Quantum Computing", "Three.js", "Spatial UI", "Edge AI", "TinyML"],
    courses: [
      {
        id: "blockchain-web3-smart-contracts",
        title: "Web3, Blockchain & Smart Contract Architecture",
        subtitle: "Ethereum, Solidity, cryptographic consensus, and decentralized systems",
        description: "Learn how decentralized state machines work: cryptographic hashing, gas optimization, smart contract security audits, and connecting web apps with ethers.js.",
        domainId: "emerging-technologies",
        icon: "⛓️",
        difficulty: "Advanced",
        durationHours: 25,
        technologies: ["Solidity", "Ethereum", "Smart Contracts", "Hardhat", "Cryptography"],
        careerTags: ["Smart Contract Engineer", "Web3 Developer", "Blockchain Researcher"],
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=600&q=80",
        featured: false,
        isPublished: true,
        modules: [
          {
            id: "ai-tools-mod-01",
            title: "AI Developer Tooling & Velocity Workflows",
            description: "Cursor IDE, AI Codebase Indexing, Prompt Architectures, and Automated Unit Tests.",
            order: 1,
            lessons: [
              {
                id: "ai-tools-cursor-workflow",
                title: "Cursor AI IDE: Multi-File Edits, Codebase Indexing & .cursorrules",
                order: 1,
                duration: "40 min interactive sprint",
                difficulty: "Beginner",
                learningObjectives: [
                  "Understand how AI code editors build semantic vector indexes over your repository.",
                  "Master Composer (Cmd+I) and inline diff generation (Cmd+K) without introducing subtle bugs.",
                  "Enforce engineering standards and prevent hallucinations using strict .cursorrules and system instructions."
                ],
                overview: `Artificial Intelligence has transformed software engineering from manual syntax typing into high-leverage architectural orchestration. Modern AI-native IDEs like Cursor index your entire repository into a local semantic vector database. When you query the model using @codebase or ask for multi-file refactors, the IDE retrieves only the most relevant AST (Abstract Syntax Tree) slices, symbol declarations, and dependency trees to build a pinpoint context window for frontier models such as Claude 3.5 Sonnet.

However, unchecked reliance on AI code generators produces insidious architectural debt: hallucinations, ghost dependencies, security vulnerabilities, and brittle unmaintainable spaghetti code. Professional software engineers do not use AI as a replacement for thinking; they use it as an ultra-fast junior developer that must be strictly bounded.

By authoring explicit project rule files (such as .cursorrules or AGENTS.md), you define project invariants: language versions, mandatory typing conventions, forbidden dependencies, and directory structures. Furthermore, pairing AI code generation with immediate terminal test execution creates a self-healing development loop that increases velocity while preserving production safety.`,
                keyConcepts: [
                  {
                    title: "Codebase Semantic Indexing",
                    explanation: "Code files are parsed into semantic chunks and embedded into high-dimensional vectors, allowing natural language search over entire codebases."
                  },
                  {
                    title: "Prompt Architectures & Invariant Rules",
                    explanation: ".cursorrules and project system prompts act as guardrails, forcing the LLM to follow existing patterns and type signatures."
                  },
                  {
                    title: "Self-Healing Test Driven Loops",
                    explanation: "Directly piping compiler stderr and unit test failures back into the model context window allows it to resolve syntax and logic errors in seconds."
                  }
                ],
                practicalExamples: [
                  {
                    title: "Multi-File Authentication Refactor",
                    scenario: "Refactoring a Next.js App Router codebase from legacy cookie sessions to Supabase SSR JWT auth across 8 files simultaneously.",
                    takeaway: "Using Cursor Composer with explicit file mentions guarantees consistent imports and type signatures across routes and middleware."
                  },
                  {
                    title: "Automated Edge-Case Test Generation",
                    scenario: "Generating comprehensive Jest/Vitest test suites for a complex financial calculation function with negative inputs and floating point boundaries.",
                    takeaway: "AI excels at generating boundary condition tests that human engineers often overlook due to confirmation bias."
                  }
                ],
                codeSamples: [
                  {
                    language: "json",
                    filename: ".cursorrules",
                    code: `{\n  "version": "1.0",\n  "project": "CampusGrow Core",\n  "rules": [\n    "Strict TypeScript only with zero 'any' types.",\n    "Never install new npm packages without explicit permission.",\n    "Always use Tailwind CSS utility tokens matching emerald/mint palette.",\n    "Run 'npm run test' to verify all logic changes before outputting final diffs."\n  ]\n}`,
                    explanation: "Declarative project boundary file that ensures the AI assistant complies with team coding standards."
                  }
                ],
                practiceQuestions: [
                  "Why does full-repository vector indexing perform better than blind file copy-pasting into web chats?",
                  "What security risks arise when pasting proprietary codebase snippets into third-party cloud LLM providers?",
                  "How do .cursorrules enforce project invariants across large engineering teams?"
                ],
                mcqQuestions: [
                  {
                    id: "ai-q1",
                    question: "How does Cursor IDE's @codebase feature determine which files to include in the model context window?",
                    options: [
                      "It blindly sends all files in the directory regardless of size",
                      "It uses semantic vector search and AST symbol graphs to retrieve only relevant code slices",
                      "It only looks at the currently open active tab in the editor",
                      "It runs an external Google web search on the repository name"
                    ],
                    correctIndex: 1,
                    explanation: "Cursor uses embeddings and local vector indexes to perform semantic retrieval over your repository, pulling only high-relevance code chunks into the prompt."
                  },
                  {
                    id: "ai-q2",
                    question: "What is the primary danger of blindly accepting multi-file AI code generation without reading the diff?",
                    options: [
                      "The compiler will refuse to compile any AI generated code",
                      "The AI may hallucinate non-existent package methods or introduce silent race conditions and security vulnerabilities",
                      "The code editor automatically deletes your git repository",
                      "AI code generation runs 100x slower than typing by hand"
                    ],
                    correctIndex: 1,
                    explanation: "LLMs generate plausible token sequences that may appear syntactically correct while introducing subtle logic bugs, unvalidated inputs, or hallucinated APIs."
                  }
                ],
                assignment: {
                  title: "Author Production .cursorrules & Refactor Code",
                  description: "Create a production .cursorrules file for a TypeScript project, configure strict type rules, and prompt Cursor Composer to refactor a messy module with 100% test coverage.",
                  deliverables: [
                    "A validated .cursorrules configuration file",
                    "Git diff demonstrating multi-file refactoring with zero compiler warnings",
                    "A test suite passing with deterministic exit code 0"
                  ]
                }
              }
            ]
          }
        ]
      }
    ,
      {
        id: "iot-embedded-systems-edgeai",
        title: "IoT, Embedded Firmware & Edge AI Microcontrollers",
        subtitle: "FreeRTOS, ESP32, sensor telemetry, MQTT protocols, and on-device ML inference",
        description: "Program physical microcontrollers: task scheduling with FreeRTOS, sensor telemetry over MQTT/CoAP, hardware UART/I2C buses, and running quantized neural networks on edge devices.",
        domainId: "emerging-technologies",
        icon: "📡",
        difficulty: "Intermediate",
        durationHours: 35,
        technologies: ["ESP32", "FreeRTOS", "MQTT", "C/C++", "Sensors", "Edge AI", "TinyML"],
        careerTags: ["IoT Engineer", "Embedded Firmware Developer", "Edge Computing Engineer"],
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
        featured: true,
        isPublished: true,
        modules: [
          {
            id: "ai-tools-mod-01",
            title: "AI Developer Tooling & Velocity Workflows",
            description: "Cursor IDE, AI Codebase Indexing, Prompt Architectures, and Automated Unit Tests.",
            order: 1,
            lessons: [
              {
                id: "ai-tools-cursor-workflow",
                title: "Cursor AI IDE: Multi-File Edits, Codebase Indexing & .cursorrules",
                order: 1,
                duration: "40 min interactive sprint",
                difficulty: "Beginner",
                learningObjectives: [
                  "Understand how AI code editors build semantic vector indexes over your repository.",
                  "Master Composer (Cmd+I) and inline diff generation (Cmd+K) without introducing subtle bugs.",
                  "Enforce engineering standards and prevent hallucinations using strict .cursorrules and system instructions."
                ],
                overview: `Artificial Intelligence has transformed software engineering from manual syntax typing into high-leverage architectural orchestration. Modern AI-native IDEs like Cursor index your entire repository into a local semantic vector database. When you query the model using @codebase or ask for multi-file refactors, the IDE retrieves only the most relevant AST (Abstract Syntax Tree) slices, symbol declarations, and dependency trees to build a pinpoint context window for frontier models such as Claude 3.5 Sonnet.

However, unchecked reliance on AI code generators produces insidious architectural debt: hallucinations, ghost dependencies, security vulnerabilities, and brittle unmaintainable spaghetti code. Professional software engineers do not use AI as a replacement for thinking; they use it as an ultra-fast junior developer that must be strictly bounded.

By authoring explicit project rule files (such as .cursorrules or AGENTS.md), you define project invariants: language versions, mandatory typing conventions, forbidden dependencies, and directory structures. Furthermore, pairing AI code generation with immediate terminal test execution creates a self-healing development loop that increases velocity while preserving production safety.`,
                keyConcepts: [
                  {
                    title: "Codebase Semantic Indexing",
                    explanation: "Code files are parsed into semantic chunks and embedded into high-dimensional vectors, allowing natural language search over entire codebases."
                  },
                  {
                    title: "Prompt Architectures & Invariant Rules",
                    explanation: ".cursorrules and project system prompts act as guardrails, forcing the LLM to follow existing patterns and type signatures."
                  },
                  {
                    title: "Self-Healing Test Driven Loops",
                    explanation: "Directly piping compiler stderr and unit test failures back into the model context window allows it to resolve syntax and logic errors in seconds."
                  }
                ],
                practicalExamples: [
                  {
                    title: "Multi-File Authentication Refactor",
                    scenario: "Refactoring a Next.js App Router codebase from legacy cookie sessions to Supabase SSR JWT auth across 8 files simultaneously.",
                    takeaway: "Using Cursor Composer with explicit file mentions guarantees consistent imports and type signatures across routes and middleware."
                  },
                  {
                    title: "Automated Edge-Case Test Generation",
                    scenario: "Generating comprehensive Jest/Vitest test suites for a complex financial calculation function with negative inputs and floating point boundaries.",
                    takeaway: "AI excels at generating boundary condition tests that human engineers often overlook due to confirmation bias."
                  }
                ],
                codeSamples: [
                  {
                    language: "json",
                    filename: ".cursorrules",
                    code: `{\n  "version": "1.0",\n  "project": "CampusGrow Core",\n  "rules": [\n    "Strict TypeScript only with zero 'any' types.",\n    "Never install new npm packages without explicit permission.",\n    "Always use Tailwind CSS utility tokens matching emerald/mint palette.",\n    "Run 'npm run test' to verify all logic changes before outputting final diffs."\n  ]\n}`,
                    explanation: "Declarative project boundary file that ensures the AI assistant complies with team coding standards."
                  }
                ],
                practiceQuestions: [
                  "Why does full-repository vector indexing perform better than blind file copy-pasting into web chats?",
                  "What security risks arise when pasting proprietary codebase snippets into third-party cloud LLM providers?",
                  "How do .cursorrules enforce project invariants across large engineering teams?"
                ],
                mcqQuestions: [
                  {
                    id: "ai-q1",
                    question: "How does Cursor IDE's @codebase feature determine which files to include in the model context window?",
                    options: [
                      "It blindly sends all files in the directory regardless of size",
                      "It uses semantic vector search and AST symbol graphs to retrieve only relevant code slices",
                      "It only looks at the currently open active tab in the editor",
                      "It runs an external Google web search on the repository name"
                    ],
                    correctIndex: 1,
                    explanation: "Cursor uses embeddings and local vector indexes to perform semantic retrieval over your repository, pulling only high-relevance code chunks into the prompt."
                  },
                  {
                    id: "ai-q2",
                    question: "What is the primary danger of blindly accepting multi-file AI code generation without reading the diff?",
                    options: [
                      "The compiler will refuse to compile any AI generated code",
                      "The AI may hallucinate non-existent package methods or introduce silent race conditions and security vulnerabilities",
                      "The code editor automatically deletes your git repository",
                      "AI code generation runs 100x slower than typing by hand"
                    ],
                    correctIndex: 1,
                    explanation: "LLMs generate plausible token sequences that may appear syntactically correct while introducing subtle logic bugs, unvalidated inputs, or hallucinated APIs."
                  }
                ],
                assignment: {
                  title: "Author Production .cursorrules & Refactor Code",
                  description: "Create a production .cursorrules file for a TypeScript project, configure strict type rules, and prompt Cursor Composer to refactor a messy module with 100% test coverage.",
                  deliverables: [
                    "A validated .cursorrules configuration file",
                    "Git diff demonstrating multi-file refactoring with zero compiler warnings",
                    "A test suite passing with deterministic exit code 0"
                  ]
                }
              }
            ]
          }
        ]
      },
      {
        id: "ar-vr-spatial-threejs",
        title: "Spatial Computing, WebGL & 3D Interactive Graphics",
        subtitle: "Three.js, custom GLSL shaders, camera matrices, and immersive spatial web UIs",
        description: "Build interactive 3D web worlds: render 3D meshes with Three.js, implement lighting models (Phong/PBR), write custom GLSL fragment shaders, and optimize GPU draw calls.",
        domainId: "emerging-technologies",
        icon: "🕶️",
        difficulty: "Advanced",
        durationHours: 30,
        technologies: ["Three.js", "WebGL", "GLSL Shaders", "3D Math", "Spatial UI", "WebXR"],
        careerTags: ["Graphics Programmer", "Spatial UI Developer", "Frontend 3D Engineer"],
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=600&q=80",
        featured: false,
        isPublished: true,
        modules: [
          {
            id: "ai-tools-mod-01",
            title: "AI Developer Tooling & Velocity Workflows",
            description: "Cursor IDE, AI Codebase Indexing, Prompt Architectures, and Automated Unit Tests.",
            order: 1,
            lessons: [
              {
                id: "ai-tools-cursor-workflow",
                title: "Cursor AI IDE: Multi-File Edits, Codebase Indexing & .cursorrules",
                order: 1,
                duration: "40 min interactive sprint",
                difficulty: "Beginner",
                learningObjectives: [
                  "Understand how AI code editors build semantic vector indexes over your repository.",
                  "Master Composer (Cmd+I) and inline diff generation (Cmd+K) without introducing subtle bugs.",
                  "Enforce engineering standards and prevent hallucinations using strict .cursorrules and system instructions."
                ],
                overview: `Artificial Intelligence has transformed software engineering from manual syntax typing into high-leverage architectural orchestration. Modern AI-native IDEs like Cursor index your entire repository into a local semantic vector database. When you query the model using @codebase or ask for multi-file refactors, the IDE retrieves only the most relevant AST (Abstract Syntax Tree) slices, symbol declarations, and dependency trees to build a pinpoint context window for frontier models such as Claude 3.5 Sonnet.

However, unchecked reliance on AI code generators produces insidious architectural debt: hallucinations, ghost dependencies, security vulnerabilities, and brittle unmaintainable spaghetti code. Professional software engineers do not use AI as a replacement for thinking; they use it as an ultra-fast junior developer that must be strictly bounded.

By authoring explicit project rule files (such as .cursorrules or AGENTS.md), you define project invariants: language versions, mandatory typing conventions, forbidden dependencies, and directory structures. Furthermore, pairing AI code generation with immediate terminal test execution creates a self-healing development loop that increases velocity while preserving production safety.`,
                keyConcepts: [
                  {
                    title: "Codebase Semantic Indexing",
                    explanation: "Code files are parsed into semantic chunks and embedded into high-dimensional vectors, allowing natural language search over entire codebases."
                  },
                  {
                    title: "Prompt Architectures & Invariant Rules",
                    explanation: ".cursorrules and project system prompts act as guardrails, forcing the LLM to follow existing patterns and type signatures."
                  },
                  {
                    title: "Self-Healing Test Driven Loops",
                    explanation: "Directly piping compiler stderr and unit test failures back into the model context window allows it to resolve syntax and logic errors in seconds."
                  }
                ],
                practicalExamples: [
                  {
                    title: "Multi-File Authentication Refactor",
                    scenario: "Refactoring a Next.js App Router codebase from legacy cookie sessions to Supabase SSR JWT auth across 8 files simultaneously.",
                    takeaway: "Using Cursor Composer with explicit file mentions guarantees consistent imports and type signatures across routes and middleware."
                  },
                  {
                    title: "Automated Edge-Case Test Generation",
                    scenario: "Generating comprehensive Jest/Vitest test suites for a complex financial calculation function with negative inputs and floating point boundaries.",
                    takeaway: "AI excels at generating boundary condition tests that human engineers often overlook due to confirmation bias."
                  }
                ],
                codeSamples: [
                  {
                    language: "json",
                    filename: ".cursorrules",
                    code: `{\n  "version": "1.0",\n  "project": "CampusGrow Core",\n  "rules": [\n    "Strict TypeScript only with zero 'any' types.",\n    "Never install new npm packages without explicit permission.",\n    "Always use Tailwind CSS utility tokens matching emerald/mint palette.",\n    "Run 'npm run test' to verify all logic changes before outputting final diffs."\n  ]\n}`,
                    explanation: "Declarative project boundary file that ensures the AI assistant complies with team coding standards."
                  }
                ],
                practiceQuestions: [
                  "Why does full-repository vector indexing perform better than blind file copy-pasting into web chats?",
                  "What security risks arise when pasting proprietary codebase snippets into third-party cloud LLM providers?",
                  "How do .cursorrules enforce project invariants across large engineering teams?"
                ],
                mcqQuestions: [
                  {
                    id: "ai-q1",
                    question: "How does Cursor IDE's @codebase feature determine which files to include in the model context window?",
                    options: [
                      "It blindly sends all files in the directory regardless of size",
                      "It uses semantic vector search and AST symbol graphs to retrieve only relevant code slices",
                      "It only looks at the currently open active tab in the editor",
                      "It runs an external Google web search on the repository name"
                    ],
                    correctIndex: 1,
                    explanation: "Cursor uses embeddings and local vector indexes to perform semantic retrieval over your repository, pulling only high-relevance code chunks into the prompt."
                  },
                  {
                    id: "ai-q2",
                    question: "What is the primary danger of blindly accepting multi-file AI code generation without reading the diff?",
                    options: [
                      "The compiler will refuse to compile any AI generated code",
                      "The AI may hallucinate non-existent package methods or introduce silent race conditions and security vulnerabilities",
                      "The code editor automatically deletes your git repository",
                      "AI code generation runs 100x slower than typing by hand"
                    ],
                    correctIndex: 1,
                    explanation: "LLMs generate plausible token sequences that may appear syntactically correct while introducing subtle logic bugs, unvalidated inputs, or hallucinated APIs."
                  }
                ],
                assignment: {
                  title: "Author Production .cursorrules & Refactor Code",
                  description: "Create a production .cursorrules file for a TypeScript project, configure strict type rules, and prompt Cursor Composer to refactor a messy module with 100% test coverage.",
                  deliverables: [
                    "A validated .cursorrules configuration file",
                    "Git diff demonstrating multi-file refactoring with zero compiler warnings",
                    "A test suite passing with deterministic exit code 0"
                  ]
                }
              }
            ]
          }
        ]
      },
    ]
  },

  // 13. Practical Projects and Product Building
  {
    id: "practical-projects-and-building",
    number: 13,
    title: "Practical Projects & Product Building",
    subtitle: "From Scratch to Shipped Software: Real Milestone Portfolio Builds",
    description: "Build portfolio-ready software systems with strict milestone verification: Scientific Calculator, Student Grade Ledger, ACID Banking System, and Distributed University Database.",
    icon: "🏗️",
    badge: "Hands-on Builds",
    color: "from-emerald-600 to-green-700",
    technologies: ["Full-Stack", "CLI Applications", "Database Storage", "Concurrency", "Unit Testing", "Deployment"],
    courses: [
      {
        id: "portfolio-milestone-projects",
        title: "CampusGrow 4 Milestone Portfolio Engineering Projects",
        subtitle: "Calculator, Student Grade System, Banking Ledger & Library Engine",
        description: "Construct 4 real production software projects step by step. Every project is tested against automated unit tests and memory analyzers to verify industry readiness.",
        domainId: "practical-projects-and-building",
        icon: "🏆",
        difficulty: "Intermediate",
        durationHours: 40,
        technologies: ["C", "File I/O", "Concurrency", "ACID", "B-Trees", "Unit Testing"],
        careerTags: ["Full-Stack Engineer", "Software Engineer", "Resume Portfolio"],
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80",
        featured: true,
        isPublished: true,
        modules: [
          {
            id: "ai-tools-mod-01",
            title: "AI Developer Tooling & Velocity Workflows",
            description: "Cursor IDE, AI Codebase Indexing, Prompt Architectures, and Automated Unit Tests.",
            order: 1,
            lessons: [
              {
                id: "ai-tools-cursor-workflow",
                title: "Cursor AI IDE: Multi-File Edits, Codebase Indexing & .cursorrules",
                order: 1,
                duration: "40 min interactive sprint",
                difficulty: "Beginner",
                learningObjectives: [
                  "Understand how AI code editors build semantic vector indexes over your repository.",
                  "Master Composer (Cmd+I) and inline diff generation (Cmd+K) without introducing subtle bugs.",
                  "Enforce engineering standards and prevent hallucinations using strict .cursorrules and system instructions."
                ],
                overview: `Artificial Intelligence has transformed software engineering from manual syntax typing into high-leverage architectural orchestration. Modern AI-native IDEs like Cursor index your entire repository into a local semantic vector database. When you query the model using @codebase or ask for multi-file refactors, the IDE retrieves only the most relevant AST (Abstract Syntax Tree) slices, symbol declarations, and dependency trees to build a pinpoint context window for frontier models such as Claude 3.5 Sonnet.

However, unchecked reliance on AI code generators produces insidious architectural debt: hallucinations, ghost dependencies, security vulnerabilities, and brittle unmaintainable spaghetti code. Professional software engineers do not use AI as a replacement for thinking; they use it as an ultra-fast junior developer that must be strictly bounded.

By authoring explicit project rule files (such as .cursorrules or AGENTS.md), you define project invariants: language versions, mandatory typing conventions, forbidden dependencies, and directory structures. Furthermore, pairing AI code generation with immediate terminal test execution creates a self-healing development loop that increases velocity while preserving production safety.`,
                keyConcepts: [
                  {
                    title: "Codebase Semantic Indexing",
                    explanation: "Code files are parsed into semantic chunks and embedded into high-dimensional vectors, allowing natural language search over entire codebases."
                  },
                  {
                    title: "Prompt Architectures & Invariant Rules",
                    explanation: ".cursorrules and project system prompts act as guardrails, forcing the LLM to follow existing patterns and type signatures."
                  },
                  {
                    title: "Self-Healing Test Driven Loops",
                    explanation: "Directly piping compiler stderr and unit test failures back into the model context window allows it to resolve syntax and logic errors in seconds."
                  }
                ],
                practicalExamples: [
                  {
                    title: "Multi-File Authentication Refactor",
                    scenario: "Refactoring a Next.js App Router codebase from legacy cookie sessions to Supabase SSR JWT auth across 8 files simultaneously.",
                    takeaway: "Using Cursor Composer with explicit file mentions guarantees consistent imports and type signatures across routes and middleware."
                  },
                  {
                    title: "Automated Edge-Case Test Generation",
                    scenario: "Generating comprehensive Jest/Vitest test suites for a complex financial calculation function with negative inputs and floating point boundaries.",
                    takeaway: "AI excels at generating boundary condition tests that human engineers often overlook due to confirmation bias."
                  }
                ],
                codeSamples: [
                  {
                    language: "json",
                    filename: ".cursorrules",
                    code: `{\n  "version": "1.0",\n  "project": "CampusGrow Core",\n  "rules": [\n    "Strict TypeScript only with zero 'any' types.",\n    "Never install new npm packages without explicit permission.",\n    "Always use Tailwind CSS utility tokens matching emerald/mint palette.",\n    "Run 'npm run test' to verify all logic changes before outputting final diffs."\n  ]\n}`,
                    explanation: "Declarative project boundary file that ensures the AI assistant complies with team coding standards."
                  }
                ],
                practiceQuestions: [
                  "Why does full-repository vector indexing perform better than blind file copy-pasting into web chats?",
                  "What security risks arise when pasting proprietary codebase snippets into third-party cloud LLM providers?",
                  "How do .cursorrules enforce project invariants across large engineering teams?"
                ],
                mcqQuestions: [
                  {
                    id: "ai-q1",
                    question: "How does Cursor IDE's @codebase feature determine which files to include in the model context window?",
                    options: [
                      "It blindly sends all files in the directory regardless of size",
                      "It uses semantic vector search and AST symbol graphs to retrieve only relevant code slices",
                      "It only looks at the currently open active tab in the editor",
                      "It runs an external Google web search on the repository name"
                    ],
                    correctIndex: 1,
                    explanation: "Cursor uses embeddings and local vector indexes to perform semantic retrieval over your repository, pulling only high-relevance code chunks into the prompt."
                  },
                  {
                    id: "ai-q2",
                    question: "What is the primary danger of blindly accepting multi-file AI code generation without reading the diff?",
                    options: [
                      "The compiler will refuse to compile any AI generated code",
                      "The AI may hallucinate non-existent package methods or introduce silent race conditions and security vulnerabilities",
                      "The code editor automatically deletes your git repository",
                      "AI code generation runs 100x slower than typing by hand"
                    ],
                    correctIndex: 1,
                    explanation: "LLMs generate plausible token sequences that may appear syntactically correct while introducing subtle logic bugs, unvalidated inputs, or hallucinated APIs."
                  }
                ],
                assignment: {
                  title: "Author Production .cursorrules & Refactor Code",
                  description: "Create a production .cursorrules file for a TypeScript project, configure strict type rules, and prompt Cursor Composer to refactor a messy module with 100% test coverage.",
                  deliverables: [
                    "A validated .cursorrules configuration file",
                    "Git diff demonstrating multi-file refactoring with zero compiler warnings",
                    "A test suite passing with deterministic exit code 0"
                  ]
                }
              }
            ]
          }
        ]
      }
    ,
      {
        id: "distributed-key-value-store",
        title: "Build a Distributed Key-Value Store from Scratch in Go",
        subtitle: "Raft consensus algorithm, write-ahead logs, and HTTP cluster replication",
        description: "Construct a real-world distributed database: implement leader election and log replication with the Raft consensus protocol, write-ahead logging (WAL), and concurrent read/write locks.",
        domainId: "practical-projects-and-building",
        icon: "🗄️",
        difficulty: "Advanced",
        durationHours: 45,
        technologies: ["Go", "Raft Consensus", "Distributed Storage", "WAL", "Networking", "Concurrency"],
        careerTags: ["Systems Engineer", "Backend Architect", "Distributed Systems Engineer"],
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
        featured: true,
        isPublished: true,
        modules: [
          {
            id: "ai-tools-mod-01",
            title: "AI Developer Tooling & Velocity Workflows",
            description: "Cursor IDE, AI Codebase Indexing, Prompt Architectures, and Automated Unit Tests.",
            order: 1,
            lessons: [
              {
                id: "ai-tools-cursor-workflow",
                title: "Cursor AI IDE: Multi-File Edits, Codebase Indexing & .cursorrules",
                order: 1,
                duration: "40 min interactive sprint",
                difficulty: "Beginner",
                learningObjectives: [
                  "Understand how AI code editors build semantic vector indexes over your repository.",
                  "Master Composer (Cmd+I) and inline diff generation (Cmd+K) without introducing subtle bugs.",
                  "Enforce engineering standards and prevent hallucinations using strict .cursorrules and system instructions."
                ],
                overview: `Artificial Intelligence has transformed software engineering from manual syntax typing into high-leverage architectural orchestration. Modern AI-native IDEs like Cursor index your entire repository into a local semantic vector database. When you query the model using @codebase or ask for multi-file refactors, the IDE retrieves only the most relevant AST (Abstract Syntax Tree) slices, symbol declarations, and dependency trees to build a pinpoint context window for frontier models such as Claude 3.5 Sonnet.

However, unchecked reliance on AI code generators produces insidious architectural debt: hallucinations, ghost dependencies, security vulnerabilities, and brittle unmaintainable spaghetti code. Professional software engineers do not use AI as a replacement for thinking; they use it as an ultra-fast junior developer that must be strictly bounded.

By authoring explicit project rule files (such as .cursorrules or AGENTS.md), you define project invariants: language versions, mandatory typing conventions, forbidden dependencies, and directory structures. Furthermore, pairing AI code generation with immediate terminal test execution creates a self-healing development loop that increases velocity while preserving production safety.`,
                keyConcepts: [
                  {
                    title: "Codebase Semantic Indexing",
                    explanation: "Code files are parsed into semantic chunks and embedded into high-dimensional vectors, allowing natural language search over entire codebases."
                  },
                  {
                    title: "Prompt Architectures & Invariant Rules",
                    explanation: ".cursorrules and project system prompts act as guardrails, forcing the LLM to follow existing patterns and type signatures."
                  },
                  {
                    title: "Self-Healing Test Driven Loops",
                    explanation: "Directly piping compiler stderr and unit test failures back into the model context window allows it to resolve syntax and logic errors in seconds."
                  }
                ],
                practicalExamples: [
                  {
                    title: "Multi-File Authentication Refactor",
                    scenario: "Refactoring a Next.js App Router codebase from legacy cookie sessions to Supabase SSR JWT auth across 8 files simultaneously.",
                    takeaway: "Using Cursor Composer with explicit file mentions guarantees consistent imports and type signatures across routes and middleware."
                  },
                  {
                    title: "Automated Edge-Case Test Generation",
                    scenario: "Generating comprehensive Jest/Vitest test suites for a complex financial calculation function with negative inputs and floating point boundaries.",
                    takeaway: "AI excels at generating boundary condition tests that human engineers often overlook due to confirmation bias."
                  }
                ],
                codeSamples: [
                  {
                    language: "json",
                    filename: ".cursorrules",
                    code: `{\n  "version": "1.0",\n  "project": "CampusGrow Core",\n  "rules": [\n    "Strict TypeScript only with zero 'any' types.",\n    "Never install new npm packages without explicit permission.",\n    "Always use Tailwind CSS utility tokens matching emerald/mint palette.",\n    "Run 'npm run test' to verify all logic changes before outputting final diffs."\n  ]\n}`,
                    explanation: "Declarative project boundary file that ensures the AI assistant complies with team coding standards."
                  }
                ],
                practiceQuestions: [
                  "Why does full-repository vector indexing perform better than blind file copy-pasting into web chats?",
                  "What security risks arise when pasting proprietary codebase snippets into third-party cloud LLM providers?",
                  "How do .cursorrules enforce project invariants across large engineering teams?"
                ],
                mcqQuestions: [
                  {
                    id: "ai-q1",
                    question: "How does Cursor IDE's @codebase feature determine which files to include in the model context window?",
                    options: [
                      "It blindly sends all files in the directory regardless of size",
                      "It uses semantic vector search and AST symbol graphs to retrieve only relevant code slices",
                      "It only looks at the currently open active tab in the editor",
                      "It runs an external Google web search on the repository name"
                    ],
                    correctIndex: 1,
                    explanation: "Cursor uses embeddings and local vector indexes to perform semantic retrieval over your repository, pulling only high-relevance code chunks into the prompt."
                  },
                  {
                    id: "ai-q2",
                    question: "What is the primary danger of blindly accepting multi-file AI code generation without reading the diff?",
                    options: [
                      "The compiler will refuse to compile any AI generated code",
                      "The AI may hallucinate non-existent package methods or introduce silent race conditions and security vulnerabilities",
                      "The code editor automatically deletes your git repository",
                      "AI code generation runs 100x slower than typing by hand"
                    ],
                    correctIndex: 1,
                    explanation: "LLMs generate plausible token sequences that may appear syntactically correct while introducing subtle logic bugs, unvalidated inputs, or hallucinated APIs."
                  }
                ],
                assignment: {
                  title: "Author Production .cursorrules & Refactor Code",
                  description: "Create a production .cursorrules file for a TypeScript project, configure strict type rules, and prompt Cursor Composer to refactor a messy module with 100% test coverage.",
                  deliverables: [
                    "A validated .cursorrules configuration file",
                    "Git diff demonstrating multi-file refactoring with zero compiler warnings",
                    "A test suite passing with deterministic exit code 0"
                  ]
                }
              }
            ]
          }
        ]
      },
      {
        id: "realtime-collaborative-docs",
        title: "Build a Real-Time Collaborative Document Editor",
        subtitle: "CRDTs (Conflict-free Replicated Data Types), WebSockets, and operational transforms",
        description: "Engineer a Google Docs / Notion clone: implement Conflict-Free Replicated Data Types (Yjs CRDTs), WebSocket multiplayer sync, cursor tracking, and presence awareness.",
        domainId: "practical-projects-and-building",
        icon: "📝",
        difficulty: "Advanced",
        durationHours: 40,
        technologies: ["Next.js", "WebSockets", "CRDTs (Yjs)", "Redis", "TypeScript", "Tailwind CSS"],
        careerTags: ["Full-Stack Engineer", "Frontend Architect", "Product Engineer"],
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
        featured: false,
        isPublished: true,
        modules: [
          {
            id: "ai-tools-mod-01",
            title: "AI Developer Tooling & Velocity Workflows",
            description: "Cursor IDE, AI Codebase Indexing, Prompt Architectures, and Automated Unit Tests.",
            order: 1,
            lessons: [
              {
                id: "ai-tools-cursor-workflow",
                title: "Cursor AI IDE: Multi-File Edits, Codebase Indexing & .cursorrules",
                order: 1,
                duration: "40 min interactive sprint",
                difficulty: "Beginner",
                learningObjectives: [
                  "Understand how AI code editors build semantic vector indexes over your repository.",
                  "Master Composer (Cmd+I) and inline diff generation (Cmd+K) without introducing subtle bugs.",
                  "Enforce engineering standards and prevent hallucinations using strict .cursorrules and system instructions."
                ],
                overview: `Artificial Intelligence has transformed software engineering from manual syntax typing into high-leverage architectural orchestration. Modern AI-native IDEs like Cursor index your entire repository into a local semantic vector database. When you query the model using @codebase or ask for multi-file refactors, the IDE retrieves only the most relevant AST (Abstract Syntax Tree) slices, symbol declarations, and dependency trees to build a pinpoint context window for frontier models such as Claude 3.5 Sonnet.

However, unchecked reliance on AI code generators produces insidious architectural debt: hallucinations, ghost dependencies, security vulnerabilities, and brittle unmaintainable spaghetti code. Professional software engineers do not use AI as a replacement for thinking; they use it as an ultra-fast junior developer that must be strictly bounded.

By authoring explicit project rule files (such as .cursorrules or AGENTS.md), you define project invariants: language versions, mandatory typing conventions, forbidden dependencies, and directory structures. Furthermore, pairing AI code generation with immediate terminal test execution creates a self-healing development loop that increases velocity while preserving production safety.`,
                keyConcepts: [
                  {
                    title: "Codebase Semantic Indexing",
                    explanation: "Code files are parsed into semantic chunks and embedded into high-dimensional vectors, allowing natural language search over entire codebases."
                  },
                  {
                    title: "Prompt Architectures & Invariant Rules",
                    explanation: ".cursorrules and project system prompts act as guardrails, forcing the LLM to follow existing patterns and type signatures."
                  },
                  {
                    title: "Self-Healing Test Driven Loops",
                    explanation: "Directly piping compiler stderr and unit test failures back into the model context window allows it to resolve syntax and logic errors in seconds."
                  }
                ],
                practicalExamples: [
                  {
                    title: "Multi-File Authentication Refactor",
                    scenario: "Refactoring a Next.js App Router codebase from legacy cookie sessions to Supabase SSR JWT auth across 8 files simultaneously.",
                    takeaway: "Using Cursor Composer with explicit file mentions guarantees consistent imports and type signatures across routes and middleware."
                  },
                  {
                    title: "Automated Edge-Case Test Generation",
                    scenario: "Generating comprehensive Jest/Vitest test suites for a complex financial calculation function with negative inputs and floating point boundaries.",
                    takeaway: "AI excels at generating boundary condition tests that human engineers often overlook due to confirmation bias."
                  }
                ],
                codeSamples: [
                  {
                    language: "json",
                    filename: ".cursorrules",
                    code: `{\n  "version": "1.0",\n  "project": "CampusGrow Core",\n  "rules": [\n    "Strict TypeScript only with zero 'any' types.",\n    "Never install new npm packages without explicit permission.",\n    "Always use Tailwind CSS utility tokens matching emerald/mint palette.",\n    "Run 'npm run test' to verify all logic changes before outputting final diffs."\n  ]\n}`,
                    explanation: "Declarative project boundary file that ensures the AI assistant complies with team coding standards."
                  }
                ],
                practiceQuestions: [
                  "Why does full-repository vector indexing perform better than blind file copy-pasting into web chats?",
                  "What security risks arise when pasting proprietary codebase snippets into third-party cloud LLM providers?",
                  "How do .cursorrules enforce project invariants across large engineering teams?"
                ],
                mcqQuestions: [
                  {
                    id: "ai-q1",
                    question: "How does Cursor IDE's @codebase feature determine which files to include in the model context window?",
                    options: [
                      "It blindly sends all files in the directory regardless of size",
                      "It uses semantic vector search and AST symbol graphs to retrieve only relevant code slices",
                      "It only looks at the currently open active tab in the editor",
                      "It runs an external Google web search on the repository name"
                    ],
                    correctIndex: 1,
                    explanation: "Cursor uses embeddings and local vector indexes to perform semantic retrieval over your repository, pulling only high-relevance code chunks into the prompt."
                  },
                  {
                    id: "ai-q2",
                    question: "What is the primary danger of blindly accepting multi-file AI code generation without reading the diff?",
                    options: [
                      "The compiler will refuse to compile any AI generated code",
                      "The AI may hallucinate non-existent package methods or introduce silent race conditions and security vulnerabilities",
                      "The code editor automatically deletes your git repository",
                      "AI code generation runs 100x slower than typing by hand"
                    ],
                    correctIndex: 1,
                    explanation: "LLMs generate plausible token sequences that may appear syntactically correct while introducing subtle logic bugs, unvalidated inputs, or hallucinated APIs."
                  }
                ],
                assignment: {
                  title: "Author Production .cursorrules & Refactor Code",
                  description: "Create a production .cursorrules file for a TypeScript project, configure strict type rules, and prompt Cursor Composer to refactor a messy module with 100% test coverage.",
                  deliverables: [
                    "A validated .cursorrules configuration file",
                    "Git diff demonstrating multi-file refactoring with zero compiler warnings",
                    "A test suite passing with deterministic exit code 0"
                  ]
                }
              }
            ]
          }
        ]
      },
    ]
  },

  // 14. Career and Placement Preparation
  {
    id: "career-and-placement",
    number: 14,
    title: "Career & Placement Preparation",
    subtitle: "Technical OA Sprints, System Design & Behavioral Masterclasses",
    description: "Crack competitive technical hiring: Online Assessment (OA) pattern sprints, High-Level System Design (HLD), Low-Level Design (LLD), Mock Technical Interviews, and ATS Resume craft.",
    icon: "🎯",
    badge: "Placement Readiness",
    color: "from-amber-500 to-emerald-700",
    technologies: ["System Design", "OA Sprints", "Mock Interviews", "ATS Resumes", "DSA Sprints", "Behavioral Rounds"],
    courses: [
      {
        id: "system-design-senior-interviews",
        title: "High-Level System Design & Architecture Interviews",
        subtitle: "Scalability, CAP theorem, distributed caching, rate limiters, and sharding",
        description: "Learn how senior engineers design systems that serve 100M+ daily active users: URL shorteners, distributed notification queues, and real-time streaming architectures.",
        domainId: "career-and-placement",
        icon: "🏛️",
        difficulty: "Advanced",
        durationHours: 35,
        technologies: ["System Design", "Distributed Systems", "Caching", "Sharding", "CAP Theorem", "Load Balancing"],
        careerTags: ["SDE II / Senior Engineer", "Systems Architect", "Tech Lead"],
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
        featured: true,
        isPublished: true,
        modules: [
          {
            id: "ai-tools-mod-01",
            title: "AI Developer Tooling & Velocity Workflows",
            description: "Cursor IDE, AI Codebase Indexing, Prompt Architectures, and Automated Unit Tests.",
            order: 1,
            lessons: [
              {
                id: "ai-tools-cursor-workflow",
                title: "Cursor AI IDE: Multi-File Edits, Codebase Indexing & .cursorrules",
                order: 1,
                duration: "40 min interactive sprint",
                difficulty: "Beginner",
                learningObjectives: [
                  "Understand how AI code editors build semantic vector indexes over your repository.",
                  "Master Composer (Cmd+I) and inline diff generation (Cmd+K) without introducing subtle bugs.",
                  "Enforce engineering standards and prevent hallucinations using strict .cursorrules and system instructions."
                ],
                overview: `Artificial Intelligence has transformed software engineering from manual syntax typing into high-leverage architectural orchestration. Modern AI-native IDEs like Cursor index your entire repository into a local semantic vector database. When you query the model using @codebase or ask for multi-file refactors, the IDE retrieves only the most relevant AST (Abstract Syntax Tree) slices, symbol declarations, and dependency trees to build a pinpoint context window for frontier models such as Claude 3.5 Sonnet.

However, unchecked reliance on AI code generators produces insidious architectural debt: hallucinations, ghost dependencies, security vulnerabilities, and brittle unmaintainable spaghetti code. Professional software engineers do not use AI as a replacement for thinking; they use it as an ultra-fast junior developer that must be strictly bounded.

By authoring explicit project rule files (such as .cursorrules or AGENTS.md), you define project invariants: language versions, mandatory typing conventions, forbidden dependencies, and directory structures. Furthermore, pairing AI code generation with immediate terminal test execution creates a self-healing development loop that increases velocity while preserving production safety.`,
                keyConcepts: [
                  {
                    title: "Codebase Semantic Indexing",
                    explanation: "Code files are parsed into semantic chunks and embedded into high-dimensional vectors, allowing natural language search over entire codebases."
                  },
                  {
                    title: "Prompt Architectures & Invariant Rules",
                    explanation: ".cursorrules and project system prompts act as guardrails, forcing the LLM to follow existing patterns and type signatures."
                  },
                  {
                    title: "Self-Healing Test Driven Loops",
                    explanation: "Directly piping compiler stderr and unit test failures back into the model context window allows it to resolve syntax and logic errors in seconds."
                  }
                ],
                practicalExamples: [
                  {
                    title: "Multi-File Authentication Refactor",
                    scenario: "Refactoring a Next.js App Router codebase from legacy cookie sessions to Supabase SSR JWT auth across 8 files simultaneously.",
                    takeaway: "Using Cursor Composer with explicit file mentions guarantees consistent imports and type signatures across routes and middleware."
                  },
                  {
                    title: "Automated Edge-Case Test Generation",
                    scenario: "Generating comprehensive Jest/Vitest test suites for a complex financial calculation function with negative inputs and floating point boundaries.",
                    takeaway: "AI excels at generating boundary condition tests that human engineers often overlook due to confirmation bias."
                  }
                ],
                codeSamples: [
                  {
                    language: "json",
                    filename: ".cursorrules",
                    code: `{\n  "version": "1.0",\n  "project": "CampusGrow Core",\n  "rules": [\n    "Strict TypeScript only with zero 'any' types.",\n    "Never install new npm packages without explicit permission.",\n    "Always use Tailwind CSS utility tokens matching emerald/mint palette.",\n    "Run 'npm run test' to verify all logic changes before outputting final diffs."\n  ]\n}`,
                    explanation: "Declarative project boundary file that ensures the AI assistant complies with team coding standards."
                  }
                ],
                practiceQuestions: [
                  "Why does full-repository vector indexing perform better than blind file copy-pasting into web chats?",
                  "What security risks arise when pasting proprietary codebase snippets into third-party cloud LLM providers?",
                  "How do .cursorrules enforce project invariants across large engineering teams?"
                ],
                mcqQuestions: [
                  {
                    id: "ai-q1",
                    question: "How does Cursor IDE's @codebase feature determine which files to include in the model context window?",
                    options: [
                      "It blindly sends all files in the directory regardless of size",
                      "It uses semantic vector search and AST symbol graphs to retrieve only relevant code slices",
                      "It only looks at the currently open active tab in the editor",
                      "It runs an external Google web search on the repository name"
                    ],
                    correctIndex: 1,
                    explanation: "Cursor uses embeddings and local vector indexes to perform semantic retrieval over your repository, pulling only high-relevance code chunks into the prompt."
                  },
                  {
                    id: "ai-q2",
                    question: "What is the primary danger of blindly accepting multi-file AI code generation without reading the diff?",
                    options: [
                      "The compiler will refuse to compile any AI generated code",
                      "The AI may hallucinate non-existent package methods or introduce silent race conditions and security vulnerabilities",
                      "The code editor automatically deletes your git repository",
                      "AI code generation runs 100x slower than typing by hand"
                    ],
                    correctIndex: 1,
                    explanation: "LLMs generate plausible token sequences that may appear syntactically correct while introducing subtle logic bugs, unvalidated inputs, or hallucinated APIs."
                  }
                ],
                assignment: {
                  title: "Author Production .cursorrules & Refactor Code",
                  description: "Create a production .cursorrules file for a TypeScript project, configure strict type rules, and prompt Cursor Composer to refactor a messy module with 100% test coverage.",
                  deliverables: [
                    "A validated .cursorrules configuration file",
                    "Git diff demonstrating multi-file refactoring with zero compiler warnings",
                    "A test suite passing with deterministic exit code 0"
                  ]
                }
              }
            ]
          }
        ]
      }
    ,
      {
        id: "faang-coding-rounds-oa-mastery",
        title: "Online Assessment (OA) Patterns & FAANG Speed Sprints",
        subtitle: "Two pointers, monotonic stacks, DP state machines, and graph optimization",
        description: "Master the exact algorithmic patterns asked by Google, Amazon, Microsoft, and Uber in 60-minute Online Assessments under strict time constraints.",
        domainId: "career-and-placement",
        icon: "⚡",
        difficulty: "Advanced",
        durationHours: 50,
        technologies: ["OA Patterns", "LeetCode Hard", "Two Pointers", "Monotonic Stack", "DP", "Graphs"],
        careerTags: ["Placement SDE", "Competitive Programmer", "FAANG Candidate"],
        image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80",
        featured: true,
        isPublished: true,
        modules: [
          {
            id: "ai-tools-mod-01",
            title: "AI Developer Tooling & Velocity Workflows",
            description: "Cursor IDE, AI Codebase Indexing, Prompt Architectures, and Automated Unit Tests.",
            order: 1,
            lessons: [
              {
                id: "ai-tools-cursor-workflow",
                title: "Cursor AI IDE: Multi-File Edits, Codebase Indexing & .cursorrules",
                order: 1,
                duration: "40 min interactive sprint",
                difficulty: "Beginner",
                learningObjectives: [
                  "Understand how AI code editors build semantic vector indexes over your repository.",
                  "Master Composer (Cmd+I) and inline diff generation (Cmd+K) without introducing subtle bugs.",
                  "Enforce engineering standards and prevent hallucinations using strict .cursorrules and system instructions."
                ],
                overview: `Artificial Intelligence has transformed software engineering from manual syntax typing into high-leverage architectural orchestration. Modern AI-native IDEs like Cursor index your entire repository into a local semantic vector database. When you query the model using @codebase or ask for multi-file refactors, the IDE retrieves only the most relevant AST (Abstract Syntax Tree) slices, symbol declarations, and dependency trees to build a pinpoint context window for frontier models such as Claude 3.5 Sonnet.

However, unchecked reliance on AI code generators produces insidious architectural debt: hallucinations, ghost dependencies, security vulnerabilities, and brittle unmaintainable spaghetti code. Professional software engineers do not use AI as a replacement for thinking; they use it as an ultra-fast junior developer that must be strictly bounded.

By authoring explicit project rule files (such as .cursorrules or AGENTS.md), you define project invariants: language versions, mandatory typing conventions, forbidden dependencies, and directory structures. Furthermore, pairing AI code generation with immediate terminal test execution creates a self-healing development loop that increases velocity while preserving production safety.`,
                keyConcepts: [
                  {
                    title: "Codebase Semantic Indexing",
                    explanation: "Code files are parsed into semantic chunks and embedded into high-dimensional vectors, allowing natural language search over entire codebases."
                  },
                  {
                    title: "Prompt Architectures & Invariant Rules",
                    explanation: ".cursorrules and project system prompts act as guardrails, forcing the LLM to follow existing patterns and type signatures."
                  },
                  {
                    title: "Self-Healing Test Driven Loops",
                    explanation: "Directly piping compiler stderr and unit test failures back into the model context window allows it to resolve syntax and logic errors in seconds."
                  }
                ],
                practicalExamples: [
                  {
                    title: "Multi-File Authentication Refactor",
                    scenario: "Refactoring a Next.js App Router codebase from legacy cookie sessions to Supabase SSR JWT auth across 8 files simultaneously.",
                    takeaway: "Using Cursor Composer with explicit file mentions guarantees consistent imports and type signatures across routes and middleware."
                  },
                  {
                    title: "Automated Edge-Case Test Generation",
                    scenario: "Generating comprehensive Jest/Vitest test suites for a complex financial calculation function with negative inputs and floating point boundaries.",
                    takeaway: "AI excels at generating boundary condition tests that human engineers often overlook due to confirmation bias."
                  }
                ],
                codeSamples: [
                  {
                    language: "json",
                    filename: ".cursorrules",
                    code: `{\n  "version": "1.0",\n  "project": "CampusGrow Core",\n  "rules": [\n    "Strict TypeScript only with zero 'any' types.",\n    "Never install new npm packages without explicit permission.",\n    "Always use Tailwind CSS utility tokens matching emerald/mint palette.",\n    "Run 'npm run test' to verify all logic changes before outputting final diffs."\n  ]\n}`,
                    explanation: "Declarative project boundary file that ensures the AI assistant complies with team coding standards."
                  }
                ],
                practiceQuestions: [
                  "Why does full-repository vector indexing perform better than blind file copy-pasting into web chats?",
                  "What security risks arise when pasting proprietary codebase snippets into third-party cloud LLM providers?",
                  "How do .cursorrules enforce project invariants across large engineering teams?"
                ],
                mcqQuestions: [
                  {
                    id: "ai-q1",
                    question: "How does Cursor IDE's @codebase feature determine which files to include in the model context window?",
                    options: [
                      "It blindly sends all files in the directory regardless of size",
                      "It uses semantic vector search and AST symbol graphs to retrieve only relevant code slices",
                      "It only looks at the currently open active tab in the editor",
                      "It runs an external Google web search on the repository name"
                    ],
                    correctIndex: 1,
                    explanation: "Cursor uses embeddings and local vector indexes to perform semantic retrieval over your repository, pulling only high-relevance code chunks into the prompt."
                  },
                  {
                    id: "ai-q2",
                    question: "What is the primary danger of blindly accepting multi-file AI code generation without reading the diff?",
                    options: [
                      "The compiler will refuse to compile any AI generated code",
                      "The AI may hallucinate non-existent package methods or introduce silent race conditions and security vulnerabilities",
                      "The code editor automatically deletes your git repository",
                      "AI code generation runs 100x slower than typing by hand"
                    ],
                    correctIndex: 1,
                    explanation: "LLMs generate plausible token sequences that may appear syntactically correct while introducing subtle logic bugs, unvalidated inputs, or hallucinated APIs."
                  }
                ],
                assignment: {
                  title: "Author Production .cursorrules & Refactor Code",
                  description: "Create a production .cursorrules file for a TypeScript project, configure strict type rules, and prompt Cursor Composer to refactor a messy module with 100% test coverage.",
                  deliverables: [
                    "A validated .cursorrules configuration file",
                    "Git diff demonstrating multi-file refactoring with zero compiler warnings",
                    "A test suite passing with deterministic exit code 0"
                  ]
                }
              }
            ]
          }
        ]
      },
      {
        id: "behavioral-leadership-interviews",
        title: "Behavioral Leadership, STAR Method & Tech Lead Rounds",
        subtitle: "Amazon Leadership Principles, conflict resolution, system trade-offs, and salary negotiation",
        description: "Ace the critical non-coding interview: master the STAR method (Situation, Task, Action, Result), articulate technical trade-offs, answer behavioral trap questions, and negotiate offers.",
        domainId: "career-and-placement",
        icon: "🤝",
        difficulty: "Beginner",
        durationHours: 20,
        technologies: ["STAR Method", "Behavioral Rounds", "Leadership", "Offer Negotiation", "Communication"],
        careerTags: ["All Engineering Graduates", "Senior Engineer", "Tech Lead"],
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
        featured: false,
        isPublished: true,
        modules: [
          {
            id: "ai-tools-mod-01",
            title: "AI Developer Tooling & Velocity Workflows",
            description: "Cursor IDE, AI Codebase Indexing, Prompt Architectures, and Automated Unit Tests.",
            order: 1,
            lessons: [
              {
                id: "ai-tools-cursor-workflow",
                title: "Cursor AI IDE: Multi-File Edits, Codebase Indexing & .cursorrules",
                order: 1,
                duration: "40 min interactive sprint",
                difficulty: "Beginner",
                learningObjectives: [
                  "Understand how AI code editors build semantic vector indexes over your repository.",
                  "Master Composer (Cmd+I) and inline diff generation (Cmd+K) without introducing subtle bugs.",
                  "Enforce engineering standards and prevent hallucinations using strict .cursorrules and system instructions."
                ],
                overview: `Artificial Intelligence has transformed software engineering from manual syntax typing into high-leverage architectural orchestration. Modern AI-native IDEs like Cursor index your entire repository into a local semantic vector database. When you query the model using @codebase or ask for multi-file refactors, the IDE retrieves only the most relevant AST (Abstract Syntax Tree) slices, symbol declarations, and dependency trees to build a pinpoint context window for frontier models such as Claude 3.5 Sonnet.

However, unchecked reliance on AI code generators produces insidious architectural debt: hallucinations, ghost dependencies, security vulnerabilities, and brittle unmaintainable spaghetti code. Professional software engineers do not use AI as a replacement for thinking; they use it as an ultra-fast junior developer that must be strictly bounded.

By authoring explicit project rule files (such as .cursorrules or AGENTS.md), you define project invariants: language versions, mandatory typing conventions, forbidden dependencies, and directory structures. Furthermore, pairing AI code generation with immediate terminal test execution creates a self-healing development loop that increases velocity while preserving production safety.`,
                keyConcepts: [
                  {
                    title: "Codebase Semantic Indexing",
                    explanation: "Code files are parsed into semantic chunks and embedded into high-dimensional vectors, allowing natural language search over entire codebases."
                  },
                  {
                    title: "Prompt Architectures & Invariant Rules",
                    explanation: ".cursorrules and project system prompts act as guardrails, forcing the LLM to follow existing patterns and type signatures."
                  },
                  {
                    title: "Self-Healing Test Driven Loops",
                    explanation: "Directly piping compiler stderr and unit test failures back into the model context window allows it to resolve syntax and logic errors in seconds."
                  }
                ],
                practicalExamples: [
                  {
                    title: "Multi-File Authentication Refactor",
                    scenario: "Refactoring a Next.js App Router codebase from legacy cookie sessions to Supabase SSR JWT auth across 8 files simultaneously.",
                    takeaway: "Using Cursor Composer with explicit file mentions guarantees consistent imports and type signatures across routes and middleware."
                  },
                  {
                    title: "Automated Edge-Case Test Generation",
                    scenario: "Generating comprehensive Jest/Vitest test suites for a complex financial calculation function with negative inputs and floating point boundaries.",
                    takeaway: "AI excels at generating boundary condition tests that human engineers often overlook due to confirmation bias."
                  }
                ],
                codeSamples: [
                  {
                    language: "json",
                    filename: ".cursorrules",
                    code: `{\n  "version": "1.0",\n  "project": "CampusGrow Core",\n  "rules": [\n    "Strict TypeScript only with zero 'any' types.",\n    "Never install new npm packages without explicit permission.",\n    "Always use Tailwind CSS utility tokens matching emerald/mint palette.",\n    "Run 'npm run test' to verify all logic changes before outputting final diffs."\n  ]\n}`,
                    explanation: "Declarative project boundary file that ensures the AI assistant complies with team coding standards."
                  }
                ],
                practiceQuestions: [
                  "Why does full-repository vector indexing perform better than blind file copy-pasting into web chats?",
                  "What security risks arise when pasting proprietary codebase snippets into third-party cloud LLM providers?",
                  "How do .cursorrules enforce project invariants across large engineering teams?"
                ],
                mcqQuestions: [
                  {
                    id: "ai-q1",
                    question: "How does Cursor IDE's @codebase feature determine which files to include in the model context window?",
                    options: [
                      "It blindly sends all files in the directory regardless of size",
                      "It uses semantic vector search and AST symbol graphs to retrieve only relevant code slices",
                      "It only looks at the currently open active tab in the editor",
                      "It runs an external Google web search on the repository name"
                    ],
                    correctIndex: 1,
                    explanation: "Cursor uses embeddings and local vector indexes to perform semantic retrieval over your repository, pulling only high-relevance code chunks into the prompt."
                  },
                  {
                    id: "ai-q2",
                    question: "What is the primary danger of blindly accepting multi-file AI code generation without reading the diff?",
                    options: [
                      "The compiler will refuse to compile any AI generated code",
                      "The AI may hallucinate non-existent package methods or introduce silent race conditions and security vulnerabilities",
                      "The code editor automatically deletes your git repository",
                      "AI code generation runs 100x slower than typing by hand"
                    ],
                    correctIndex: 1,
                    explanation: "LLMs generate plausible token sequences that may appear syntactically correct while introducing subtle logic bugs, unvalidated inputs, or hallucinated APIs."
                  }
                ],
                assignment: {
                  title: "Author Production .cursorrules & Refactor Code",
                  description: "Create a production .cursorrules file for a TypeScript project, configure strict type rules, and prompt Cursor Composer to refactor a messy module with 100% test coverage.",
                  deliverables: [
                    "A validated .cursorrules configuration file",
                    "Git diff demonstrating multi-file refactoring with zero compiler warnings",
                    "A test suite passing with deterministic exit code 0"
                  ]
                }
              }
            ]
          }
        ]
      },
    ]
  },

  // 15. Professional Skills and Entrepreneurship
  {
    id: "professional-skills-and-entrepreneurship",
    number: 15,
    title: "Professional Skills & Entrepreneurship",
    subtitle: "Technical Writing, Open Source, Startup MVP & Engineering Leadership",
    description: "The non-coding skills that determine your long-term engineering trajectory: writing design RFCs, collaborating on open-source repositories, launching startup MVPs, and leading teams.",
    icon: "💡",
    badge: "Leadership & Growth",
    color: "from-emerald-700 to-teal-800",
    technologies: ["Technical Writing", "RFCs", "Open Source", "Startup MVP", "Product Thinking", "Engineering Leadership"],
    courses: [
      {
        id: "technical-writing-open-source",
        title: "Technical Writing, RFC Design Documents & Open Source",
        subtitle: "How top engineers communicate architectural decisions and contribute to public codebases",
        description: "Learn how engineers at Google, Stripe, and Meta communicate: write crisp architectural Request for Comments (RFCs), document APIs clearly, and land open source pull requests.",
        domainId: "professional-skills-and-entrepreneurship",
        icon: "✍️",
        difficulty: "Beginner",
        durationHours: 20,
        technologies: ["Technical Writing", "RFC Documentation", "GitHub Open Source", "API Specs", "Markdown"],
        careerTags: ["Engineering Lead", "Open Source Contributor", "Founder", "Staff Engineer"],
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
        featured: false,
        isPublished: true,
        modules: [
          {
            id: "ai-tools-mod-01",
            title: "AI Developer Tooling & Velocity Workflows",
            description: "Cursor IDE, AI Codebase Indexing, Prompt Architectures, and Automated Unit Tests.",
            order: 1,
            lessons: [
              {
                id: "ai-tools-cursor-workflow",
                title: "Cursor AI IDE: Multi-File Edits, Codebase Indexing & .cursorrules",
                order: 1,
                duration: "40 min interactive sprint",
                difficulty: "Beginner",
                learningObjectives: [
                  "Understand how AI code editors build semantic vector indexes over your repository.",
                  "Master Composer (Cmd+I) and inline diff generation (Cmd+K) without introducing subtle bugs.",
                  "Enforce engineering standards and prevent hallucinations using strict .cursorrules and system instructions."
                ],
                overview: `Artificial Intelligence has transformed software engineering from manual syntax typing into high-leverage architectural orchestration. Modern AI-native IDEs like Cursor index your entire repository into a local semantic vector database. When you query the model using @codebase or ask for multi-file refactors, the IDE retrieves only the most relevant AST (Abstract Syntax Tree) slices, symbol declarations, and dependency trees to build a pinpoint context window for frontier models such as Claude 3.5 Sonnet.

However, unchecked reliance on AI code generators produces insidious architectural debt: hallucinations, ghost dependencies, security vulnerabilities, and brittle unmaintainable spaghetti code. Professional software engineers do not use AI as a replacement for thinking; they use it as an ultra-fast junior developer that must be strictly bounded.

By authoring explicit project rule files (such as .cursorrules or AGENTS.md), you define project invariants: language versions, mandatory typing conventions, forbidden dependencies, and directory structures. Furthermore, pairing AI code generation with immediate terminal test execution creates a self-healing development loop that increases velocity while preserving production safety.`,
                keyConcepts: [
                  {
                    title: "Codebase Semantic Indexing",
                    explanation: "Code files are parsed into semantic chunks and embedded into high-dimensional vectors, allowing natural language search over entire codebases."
                  },
                  {
                    title: "Prompt Architectures & Invariant Rules",
                    explanation: ".cursorrules and project system prompts act as guardrails, forcing the LLM to follow existing patterns and type signatures."
                  },
                  {
                    title: "Self-Healing Test Driven Loops",
                    explanation: "Directly piping compiler stderr and unit test failures back into the model context window allows it to resolve syntax and logic errors in seconds."
                  }
                ],
                practicalExamples: [
                  {
                    title: "Multi-File Authentication Refactor",
                    scenario: "Refactoring a Next.js App Router codebase from legacy cookie sessions to Supabase SSR JWT auth across 8 files simultaneously.",
                    takeaway: "Using Cursor Composer with explicit file mentions guarantees consistent imports and type signatures across routes and middleware."
                  },
                  {
                    title: "Automated Edge-Case Test Generation",
                    scenario: "Generating comprehensive Jest/Vitest test suites for a complex financial calculation function with negative inputs and floating point boundaries.",
                    takeaway: "AI excels at generating boundary condition tests that human engineers often overlook due to confirmation bias."
                  }
                ],
                codeSamples: [
                  {
                    language: "json",
                    filename: ".cursorrules",
                    code: `{\n  "version": "1.0",\n  "project": "CampusGrow Core",\n  "rules": [\n    "Strict TypeScript only with zero 'any' types.",\n    "Never install new npm packages without explicit permission.",\n    "Always use Tailwind CSS utility tokens matching emerald/mint palette.",\n    "Run 'npm run test' to verify all logic changes before outputting final diffs."\n  ]\n}`,
                    explanation: "Declarative project boundary file that ensures the AI assistant complies with team coding standards."
                  }
                ],
                practiceQuestions: [
                  "Why does full-repository vector indexing perform better than blind file copy-pasting into web chats?",
                  "What security risks arise when pasting proprietary codebase snippets into third-party cloud LLM providers?",
                  "How do .cursorrules enforce project invariants across large engineering teams?"
                ],
                mcqQuestions: [
                  {
                    id: "ai-q1",
                    question: "How does Cursor IDE's @codebase feature determine which files to include in the model context window?",
                    options: [
                      "It blindly sends all files in the directory regardless of size",
                      "It uses semantic vector search and AST symbol graphs to retrieve only relevant code slices",
                      "It only looks at the currently open active tab in the editor",
                      "It runs an external Google web search on the repository name"
                    ],
                    correctIndex: 1,
                    explanation: "Cursor uses embeddings and local vector indexes to perform semantic retrieval over your repository, pulling only high-relevance code chunks into the prompt."
                  },
                  {
                    id: "ai-q2",
                    question: "What is the primary danger of blindly accepting multi-file AI code generation without reading the diff?",
                    options: [
                      "The compiler will refuse to compile any AI generated code",
                      "The AI may hallucinate non-existent package methods or introduce silent race conditions and security vulnerabilities",
                      "The code editor automatically deletes your git repository",
                      "AI code generation runs 100x slower than typing by hand"
                    ],
                    correctIndex: 1,
                    explanation: "LLMs generate plausible token sequences that may appear syntactically correct while introducing subtle logic bugs, unvalidated inputs, or hallucinated APIs."
                  }
                ],
                assignment: {
                  title: "Author Production .cursorrules & Refactor Code",
                  description: "Create a production .cursorrules file for a TypeScript project, configure strict type rules, and prompt Cursor Composer to refactor a messy module with 100% test coverage.",
                  deliverables: [
                    "A validated .cursorrules configuration file",
                    "Git diff demonstrating multi-file refactoring with zero compiler warnings",
                    "A test suite passing with deterministic exit code 0"
                  ]
                }
              }
            ]
          }
        ]
      }
    ,
      {
        id: "startup-mvp-product-engineering",
        title: "From Code to Cash: Launching a Tech Startup MVP in 14 Days",
        subtitle: "Product thinking, rapid prototyping, Stripe payments, and finding your first 100 users",
        description: "Turn technical skills into a profitable software product: validate problem statements, build a high-converting landing page, wire up Stripe/Razorpay payments, and launch publicly.",
        domainId: "professional-skills-and-entrepreneurship",
        icon: "🚀",
        difficulty: "Intermediate",
        durationHours: 30,
        technologies: ["Product Thinking", "Stripe", "Next.js", "Analytics", "Growth Engineering", "Customer Discovery"],
        careerTags: ["Startup Founder", "Indie Hacker", "Product Engineer"],
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80",
        featured: true,
        isPublished: true,
        modules: [
          {
            id: "ai-tools-mod-01",
            title: "AI Developer Tooling & Velocity Workflows",
            description: "Cursor IDE, AI Codebase Indexing, Prompt Architectures, and Automated Unit Tests.",
            order: 1,
            lessons: [
              {
                id: "ai-tools-cursor-workflow",
                title: "Cursor AI IDE: Multi-File Edits, Codebase Indexing & .cursorrules",
                order: 1,
                duration: "40 min interactive sprint",
                difficulty: "Beginner",
                learningObjectives: [
                  "Understand how AI code editors build semantic vector indexes over your repository.",
                  "Master Composer (Cmd+I) and inline diff generation (Cmd+K) without introducing subtle bugs.",
                  "Enforce engineering standards and prevent hallucinations using strict .cursorrules and system instructions."
                ],
                overview: `Artificial Intelligence has transformed software engineering from manual syntax typing into high-leverage architectural orchestration. Modern AI-native IDEs like Cursor index your entire repository into a local semantic vector database. When you query the model using @codebase or ask for multi-file refactors, the IDE retrieves only the most relevant AST (Abstract Syntax Tree) slices, symbol declarations, and dependency trees to build a pinpoint context window for frontier models such as Claude 3.5 Sonnet.

However, unchecked reliance on AI code generators produces insidious architectural debt: hallucinations, ghost dependencies, security vulnerabilities, and brittle unmaintainable spaghetti code. Professional software engineers do not use AI as a replacement for thinking; they use it as an ultra-fast junior developer that must be strictly bounded.

By authoring explicit project rule files (such as .cursorrules or AGENTS.md), you define project invariants: language versions, mandatory typing conventions, forbidden dependencies, and directory structures. Furthermore, pairing AI code generation with immediate terminal test execution creates a self-healing development loop that increases velocity while preserving production safety.`,
                keyConcepts: [
                  {
                    title: "Codebase Semantic Indexing",
                    explanation: "Code files are parsed into semantic chunks and embedded into high-dimensional vectors, allowing natural language search over entire codebases."
                  },
                  {
                    title: "Prompt Architectures & Invariant Rules",
                    explanation: ".cursorrules and project system prompts act as guardrails, forcing the LLM to follow existing patterns and type signatures."
                  },
                  {
                    title: "Self-Healing Test Driven Loops",
                    explanation: "Directly piping compiler stderr and unit test failures back into the model context window allows it to resolve syntax and logic errors in seconds."
                  }
                ],
                practicalExamples: [
                  {
                    title: "Multi-File Authentication Refactor",
                    scenario: "Refactoring a Next.js App Router codebase from legacy cookie sessions to Supabase SSR JWT auth across 8 files simultaneously.",
                    takeaway: "Using Cursor Composer with explicit file mentions guarantees consistent imports and type signatures across routes and middleware."
                  },
                  {
                    title: "Automated Edge-Case Test Generation",
                    scenario: "Generating comprehensive Jest/Vitest test suites for a complex financial calculation function with negative inputs and floating point boundaries.",
                    takeaway: "AI excels at generating boundary condition tests that human engineers often overlook due to confirmation bias."
                  }
                ],
                codeSamples: [
                  {
                    language: "json",
                    filename: ".cursorrules",
                    code: `{\n  "version": "1.0",\n  "project": "CampusGrow Core",\n  "rules": [\n    "Strict TypeScript only with zero 'any' types.",\n    "Never install new npm packages without explicit permission.",\n    "Always use Tailwind CSS utility tokens matching emerald/mint palette.",\n    "Run 'npm run test' to verify all logic changes before outputting final diffs."\n  ]\n}`,
                    explanation: "Declarative project boundary file that ensures the AI assistant complies with team coding standards."
                  }
                ],
                practiceQuestions: [
                  "Why does full-repository vector indexing perform better than blind file copy-pasting into web chats?",
                  "What security risks arise when pasting proprietary codebase snippets into third-party cloud LLM providers?",
                  "How do .cursorrules enforce project invariants across large engineering teams?"
                ],
                mcqQuestions: [
                  {
                    id: "ai-q1",
                    question: "How does Cursor IDE's @codebase feature determine which files to include in the model context window?",
                    options: [
                      "It blindly sends all files in the directory regardless of size",
                      "It uses semantic vector search and AST symbol graphs to retrieve only relevant code slices",
                      "It only looks at the currently open active tab in the editor",
                      "It runs an external Google web search on the repository name"
                    ],
                    correctIndex: 1,
                    explanation: "Cursor uses embeddings and local vector indexes to perform semantic retrieval over your repository, pulling only high-relevance code chunks into the prompt."
                  },
                  {
                    id: "ai-q2",
                    question: "What is the primary danger of blindly accepting multi-file AI code generation without reading the diff?",
                    options: [
                      "The compiler will refuse to compile any AI generated code",
                      "The AI may hallucinate non-existent package methods or introduce silent race conditions and security vulnerabilities",
                      "The code editor automatically deletes your git repository",
                      "AI code generation runs 100x slower than typing by hand"
                    ],
                    correctIndex: 1,
                    explanation: "LLMs generate plausible token sequences that may appear syntactically correct while introducing subtle logic bugs, unvalidated inputs, or hallucinated APIs."
                  }
                ],
                assignment: {
                  title: "Author Production .cursorrules & Refactor Code",
                  description: "Create a production .cursorrules file for a TypeScript project, configure strict type rules, and prompt Cursor Composer to refactor a messy module with 100% test coverage.",
                  deliverables: [
                    "A validated .cursorrules configuration file",
                    "Git diff demonstrating multi-file refactoring with zero compiler warnings",
                    "A test suite passing with deterministic exit code 0"
                  ]
                }
              }
            ]
          }
        ]
      },
      {
        id: "engineering-management-leadership",
        title: "Engineering Leadership: From Junior Dev to Senior Tech Lead",
        subtitle: "Code reviews, mentoring junior engineers, sprint estimation, and roadmap execution",
        description: "The playbook for rapid engineering promotions: conducting constructive pull request reviews, unblocking peers, scoping ambiguous requirements, and leading project delivery.",
        domainId: "professional-skills-and-entrepreneurship",
        icon: "👔",
        difficulty: "Intermediate",
        durationHours: 25,
        technologies: ["Tech Leadership", "Code Reviews", "Sprint Planning", "Mentorship", "Agile Execution"],
        careerTags: ["Tech Lead", "Engineering Manager", "Senior Staff Engineer"],
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
        featured: false,
        isPublished: true,
        modules: [
          {
            id: "ai-tools-mod-01",
            title: "AI Developer Tooling & Velocity Workflows",
            description: "Cursor IDE, AI Codebase Indexing, Prompt Architectures, and Automated Unit Tests.",
            order: 1,
            lessons: [
              {
                id: "ai-tools-cursor-workflow",
                title: "Cursor AI IDE: Multi-File Edits, Codebase Indexing & .cursorrules",
                order: 1,
                duration: "40 min interactive sprint",
                difficulty: "Beginner",
                learningObjectives: [
                  "Understand how AI code editors build semantic vector indexes over your repository.",
                  "Master Composer (Cmd+I) and inline diff generation (Cmd+K) without introducing subtle bugs.",
                  "Enforce engineering standards and prevent hallucinations using strict .cursorrules and system instructions."
                ],
                overview: `Artificial Intelligence has transformed software engineering from manual syntax typing into high-leverage architectural orchestration. Modern AI-native IDEs like Cursor index your entire repository into a local semantic vector database. When you query the model using @codebase or ask for multi-file refactors, the IDE retrieves only the most relevant AST (Abstract Syntax Tree) slices, symbol declarations, and dependency trees to build a pinpoint context window for frontier models such as Claude 3.5 Sonnet.

However, unchecked reliance on AI code generators produces insidious architectural debt: hallucinations, ghost dependencies, security vulnerabilities, and brittle unmaintainable spaghetti code. Professional software engineers do not use AI as a replacement for thinking; they use it as an ultra-fast junior developer that must be strictly bounded.

By authoring explicit project rule files (such as .cursorrules or AGENTS.md), you define project invariants: language versions, mandatory typing conventions, forbidden dependencies, and directory structures. Furthermore, pairing AI code generation with immediate terminal test execution creates a self-healing development loop that increases velocity while preserving production safety.`,
                keyConcepts: [
                  {
                    title: "Codebase Semantic Indexing",
                    explanation: "Code files are parsed into semantic chunks and embedded into high-dimensional vectors, allowing natural language search over entire codebases."
                  },
                  {
                    title: "Prompt Architectures & Invariant Rules",
                    explanation: ".cursorrules and project system prompts act as guardrails, forcing the LLM to follow existing patterns and type signatures."
                  },
                  {
                    title: "Self-Healing Test Driven Loops",
                    explanation: "Directly piping compiler stderr and unit test failures back into the model context window allows it to resolve syntax and logic errors in seconds."
                  }
                ],
                practicalExamples: [
                  {
                    title: "Multi-File Authentication Refactor",
                    scenario: "Refactoring a Next.js App Router codebase from legacy cookie sessions to Supabase SSR JWT auth across 8 files simultaneously.",
                    takeaway: "Using Cursor Composer with explicit file mentions guarantees consistent imports and type signatures across routes and middleware."
                  },
                  {
                    title: "Automated Edge-Case Test Generation",
                    scenario: "Generating comprehensive Jest/Vitest test suites for a complex financial calculation function with negative inputs and floating point boundaries.",
                    takeaway: "AI excels at generating boundary condition tests that human engineers often overlook due to confirmation bias."
                  }
                ],
                codeSamples: [
                  {
                    language: "json",
                    filename: ".cursorrules",
                    code: `{\n  "version": "1.0",\n  "project": "CampusGrow Core",\n  "rules": [\n    "Strict TypeScript only with zero 'any' types.",\n    "Never install new npm packages without explicit permission.",\n    "Always use Tailwind CSS utility tokens matching emerald/mint palette.",\n    "Run 'npm run test' to verify all logic changes before outputting final diffs."\n  ]\n}`,
                    explanation: "Declarative project boundary file that ensures the AI assistant complies with team coding standards."
                  }
                ],
                practiceQuestions: [
                  "Why does full-repository vector indexing perform better than blind file copy-pasting into web chats?",
                  "What security risks arise when pasting proprietary codebase snippets into third-party cloud LLM providers?",
                  "How do .cursorrules enforce project invariants across large engineering teams?"
                ],
                mcqQuestions: [
                  {
                    id: "ai-q1",
                    question: "How does Cursor IDE's @codebase feature determine which files to include in the model context window?",
                    options: [
                      "It blindly sends all files in the directory regardless of size",
                      "It uses semantic vector search and AST symbol graphs to retrieve only relevant code slices",
                      "It only looks at the currently open active tab in the editor",
                      "It runs an external Google web search on the repository name"
                    ],
                    correctIndex: 1,
                    explanation: "Cursor uses embeddings and local vector indexes to perform semantic retrieval over your repository, pulling only high-relevance code chunks into the prompt."
                  },
                  {
                    id: "ai-q2",
                    question: "What is the primary danger of blindly accepting multi-file AI code generation without reading the diff?",
                    options: [
                      "The compiler will refuse to compile any AI generated code",
                      "The AI may hallucinate non-existent package methods or introduce silent race conditions and security vulnerabilities",
                      "The code editor automatically deletes your git repository",
                      "AI code generation runs 100x slower than typing by hand"
                    ],
                    correctIndex: 1,
                    explanation: "LLMs generate plausible token sequences that may appear syntactically correct while introducing subtle logic bugs, unvalidated inputs, or hallucinated APIs."
                  }
                ],
                assignment: {
                  title: "Author Production .cursorrules & Refactor Code",
                  description: "Create a production .cursorrules file for a TypeScript project, configure strict type rules, and prompt Cursor Composer to refactor a messy module with 100% test coverage.",
                  deliverables: [
                    "A validated .cursorrules configuration file",
                    "Git diff demonstrating multi-file refactoring with zero compiler warnings",
                    "A test suite passing with deterministic exit code 0"
                  ]
                }
              }
            ]
          }
        ]
      },
    ]
  }
];

// Helper functions for the Engineering Knowledge Hub

function generateFull6MonthCurriculum(course: { id: string; title: string; technologies: string[]; domainId: string }): HubModule[] {
  const techPrimary = course.technologies[0] || "Architecture";

  const moduleTemplates = [
    {
      order: 1,
      id: `${course.id}-mod-1`,
      title: "Month 1 (Weeks 1–4): Foundations, Core Architecture & Environmental Setup",
      description: `Master initial mental models, syntax anatomy, developer toolchains, and runtime environments for ${course.title}.`,
      lessons: [
        {
          num: 1,
          suffix: "env-first-principles",
          title: `${course.title}: Environmental Architecture, Toolchains & First Principles`,
          difficulty: "Beginner" as const,
        },
        {
          num: 2,
          suffix: "syntax-data-models",
          title: `${techPrimary} Core Syntax, Data Structures & Primitive Systems`,
          difficulty: "Beginner" as const,
        },
        {
          num: 3,
          suffix: "control-flow-state",
          title: `Control Flow Mechanics, State Transitions & Edge Logic`,
          difficulty: "Beginner" as const,
        },
        {
          num: 4,
          suffix: "functions-memory-scopes",
          title: `Modular Architecture: Scopes, Closures & Stack Frame Allocation`,
          difficulty: "Intermediate" as const,
        }
      ]
    },
    {
      order: 2,
      id: `${course.id}-mod-2`,
      title: "Month 2 (Weeks 5–8): Advanced Patterns, Data Structures & Concurrency",
      description: `Deep-dive into internal execution mechanics, complex data structures, and asynchronous memory management.`,
      lessons: [
        {
          num: 5,
          suffix: "advanced-data-structures",
          title: `High-Performance Data Structures & Memory Layouts in ${techPrimary}`,
          difficulty: "Intermediate" as const,
        },
        {
          num: 6,
          suffix: "concurrency-async-io",
          title: `Concurrency, Asynchronous I/O & Non-Blocking Event Loops`,
          difficulty: "Intermediate" as const,
        },
        {
          num: 7,
          suffix: "error-handling-logging",
          title: `Defensive Error Handling, Telemetry & Structured Logging`,
          difficulty: "Intermediate" as const,
        },
        {
          num: 8,
          suffix: "midterm-production-lab",
          title: `Mid-Term Production Lab: Building a Resilient Subsystem`,
          difficulty: "Intermediate" as const,
        }
      ]
    },
    {
      order: 3,
      id: `${course.id}-mod-3`,
      title: "Month 3 (Weeks 9–12): Modern Tooling, Docker & AI-Assisted Workflows",
      description: `Integrate containerization, automated testing, and developer AI superpowers into your engineering workflow.`,
      lessons: [
        {
          num: 9,
          suffix: "docker-containerization",
          title: `Containerizing ${techPrimary} with Docker & Multi-Stage Builds`,
          difficulty: "Intermediate" as const,
        },
        {
          num: 10,
          suffix: "ai-developer-workflows",
          title: `AI Developer Acceleration: Cursor, Copilot & .cursorrules`,
          difficulty: "Intermediate" as const,
        },
        {
          num: 11,
          suffix: "automated-test-suites",
          title: `Automated Testing: Unit, Integration & Boundary Fuzzing`,
          difficulty: "Intermediate" as const,
        },
        {
          num: 12,
          suffix: "performance-profiling",
          title: `Performance Profiling, Memory Leak Auditing & Benchmarking`,
          difficulty: "Advanced" as const,
        }
      ]
    },
    {
      order: 4,
      id: `${course.id}-mod-4`,
      title: "Month 4 (Weeks 13–18): Distributed Systems, Cloud Deployments & Security",
      description: `Scale beyond a single machine: CI/CD automation, cloud infrastructure, and zero-trust security.`,
      lessons: [
        {
          num: 13,
          suffix: "cicd-github-actions",
          title: `Automated CI/CD Pipelines with GitHub Actions`,
          difficulty: "Intermediate" as const,
        },
        {
          num: 14,
          suffix: "cloud-infrastructure",
          title: `Cloud Architecture: Networking, Subnets & Compute Hosting`,
          difficulty: "Advanced" as const,
        },
        {
          num: 15,
          suffix: "database-caching-scale",
          title: `Database Optimization, Indexing & Sub-millisecond Caching`,
          difficulty: "Advanced" as const,
        },
        {
          num: 16,
          suffix: "zero-trust-security",
          title: `Zero-Trust Security, OAuth2/JWT Authentication & Secrets`,
          difficulty: "Advanced" as const,
        }
      ]
    },
    {
      order: 5,
      id: `${course.id}-mod-5`,
      title: "Months 5–6 (Weeks 19–24): Enterprise Capstone & Placement Interview Mastery",
      description: `Complete a production-grade enterprise system and master senior technical interview problem scenarios.`,
      lessons: [
        {
          num: 17,
          suffix: "capstone-architecture",
          title: `Enterprise Capstone: System Design & Architecture Blueprint`,
          difficulty: "Advanced" as const,
        },
        {
          num: 18,
          suffix: "system-design-scalability",
          title: `High-Availability, Fault Tolerance & CAP Theorem Trade-Offs`,
          difficulty: "Advanced" as const,
        },
        {
          num: 19,
          suffix: "placement-interview-deepdive",
          title: `Top-Tier Product Company Placement Interview Mastery`,
          difficulty: "Advanced" as const,
        },
        {
          num: 20,
          suffix: "production-deploy-review",
          title: `Final Capstone Release, Live URL Deployment & Code Review`,
          difficulty: "Advanced" as const,
        }
      ]
    }
  ];

  return moduleTemplates.map((mod) => ({
    id: mod.id,
    title: mod.title,
    description: mod.description,
    order: mod.order,
    lessons: mod.lessons.map((l) => ({
      id: `${course.id}-${l.suffix}`,
      title: l.title,
      order: l.num,
      duration: "45 min interactive sprint",
      difficulty: l.difficulty,
      learningObjectives: [
        `Master fundamental architectures and execution pipelines for ${l.title}.`,
        `Understand real-world production implementation, edge cases, and industry trade-offs.`,
        `Pass the 5-question comprehension check and verify your code in the in-browser sandbox.`
      ],
      overview: `This lesson represents a core milestone in the ${course.title} 6-month engineering curriculum. Achieving production-grade engineering mastery requires moving far beyond surface-level syntax tutorials into deep architectural intuition, memory virtualization, and system trade-offs.

In this chapter, you will dissect how ${techPrimary} and modern software engineering toolchains interact with underlying operating system kernels, CPU instruction pipelines, and distributed network fabrics. You will examine the concrete mechanical differences between naive beginner approaches and scalable enterprise architectures.

Furthermore, you will explore real-world production failure modes, concurrency race conditions, and security vulnerabilities that frequently derail production deployments, equipping you with the intuition expected in senior technical placement interviews.`,
      keyConcepts: [
        {
          title: "Core Architectural Mechanism",
          explanation: `How ${techPrimary} handles memory, state, and execution transitions deterministically under heavy computational load.`
        },
        {
          title: "Production System Invariants",
          explanation: "Critical design rules that prevent memory leaks, unhandled exceptions, and silent data corruption in production."
        },
        {
          title: "Scalability & Concurrency Boundaries",
          explanation: "Balancing latency, throughput, and hardware resource utilization across multi-core systems and cloud networks."
        }
      ],
      practicalExamples: [
        {
          title: `High-Throughput ${techPrimary} Production Workflow`,
          scenario: `Implementing scalable, resilient service boundaries capable of handling thousands of requests per second with sub-50ms latency.`,
          takeaway: `Clean abstraction boundaries and non-blocking I/O prevent resource saturation under peak traffic spikes.`
        },
        {
          title: "Edge Case & Fault Recovery Handling",
          scenario: `Detecting transient network partitions or memory threshold exhaustion and gracefully falling back to cached state.`,
          takeaway: `Defensive design and circuit breakers ensure the system remains operational even when downstream dependencies fail.`
        }
      ],
      practiceQuestions: [
        `What are the primary performance trade-offs associated with ${l.title}?`,
        `How do modern enterprise engineering teams test and verify this component before production deployment?`,
        `What common interview traps do candidates encounter when asked to implement this from scratch?`
      ],
      mcqQuestions: [
        {
          id: `${course.id}-q1-${l.num}`,
          question: `In production engineering, what is the primary architectural advantage of ${l.title}?`,
          options: [
            "It guarantees deterministic execution, reduced resource footprint, and predictable scaling",
            "It completely eliminates the need for unit testing or compiler checks",
            "It automatically makes all algorithms execute in O(1) time regardless of input size",
            "It prevents any user from ever making network requests"
          ],
          correctIndex: 0,
          explanation: "Production architectural patterns prioritize deterministic execution, memory safety, and predictable resource utilization under scale."
        },
        {
          id: `${course.id}-q2-${l.num}`,
          question: `Which common anti-pattern should software engineers avoid when implementing ${l.title}?`,
          options: [
            "Profiling system bottlenecks before prematurely optimizing code",
            "Writing defensive error boundaries and structured logs",
            "Unbounded memory allocations, silent exception swallowing, and tight unbuffered loops",
            "Containerizing dependencies with multi-stage Docker builds"
          ],
          correctIndex: 2,
          explanation: "Unbounded memory allocations and swallowing errors silently lead to catastrophic production memory leaks and debugging nightmares."
        }
      ],
      assignment: {
        title: `Production Lab & Capstone: ${l.title}`,
        description: `Implement, test, and document a working production module for ${l.title}. Verify with automated test suites and deploy a verified code sample to your cloud workspace.`,
        deliverables: [
          "Documented source code adhering to strict engineering conventions",
          "Automated test suite verifying positive, negative, and edge-case boundaries",
          "A verified build and terminal run with exit code 0"
        ]
      }
    }))
  }));
}

// Ensure every single course has a full 5-module, 20-lesson 6-month roadmap
for (const domain of ENGINEERING_DOMAINS) {
  for (const course of domain.courses) {
    if (!course.modules || course.modules.length < 5) {
      course.modules = generateFull6MonthCurriculum(course);
    }
  }
}

export function getAllHubCourses(): HubCourse[] {
  return ENGINEERING_DOMAINS.flatMap((d) => d.courses);
}

export function getHubCourseById(courseId: string): HubCourse | undefined {
  return getAllHubCourses().find((c) => c.id === courseId);
}

export function getHubDomainById(domainId: string): HubDomain | undefined {
  return ENGINEERING_DOMAINS.find((d) => d.id === domainId);
}

export function searchHubCourses(query: string, filters?: {
  domainId?: string;
  difficulty?: string;
  technology?: string;
  careerTag?: string;
}): HubCourse[] {
  const q = query.toLowerCase().trim();
  let results = getAllHubCourses();

  if (filters?.domainId && filters.domainId !== "ALL") {
    results = results.filter((c) => c.domainId === filters.domainId);
  }

  if (filters?.difficulty && filters.difficulty !== "ALL") {
    results = results.filter((c) => c.difficulty === filters.difficulty);
  }

  if (filters?.technology && filters.technology !== "ALL") {
    results = results.filter((c) => c.technologies.some((t) => t.toLowerCase() === filters.technology?.toLowerCase()));
  }

  if (filters?.careerTag && filters.careerTag !== "ALL") {
    results = results.filter((c) => c.careerTags.some((t) => t.toLowerCase().includes(filters.careerTag?.toLowerCase() || "")));
  }

  if (q) {
    results = results.filter((c) =>
      c.title.toLowerCase().includes(q) ||
      c.subtitle.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.technologies.some((t) => t.toLowerCase().includes(q)) ||
      c.careerTags.some((ct) => ct.toLowerCase().includes(q))
    );
  }

  return results;
}

export function getAllHubLessons(): { lesson: HubLesson; course: HubCourse; domain: HubDomain }[] {
  const all: { lesson: HubLesson; course: HubCourse; domain: HubDomain }[] = [];
  for (const domain of ENGINEERING_DOMAINS) {
    for (const course of domain.courses) {
      for (const module of course.modules) {
        for (const lesson of module.lessons) {
          all.push({ lesson, course, domain });
        }
      }
    }
  }
  return all;
}

export function getHubLessonById(lessonId: string): { lesson: HubLesson; course: HubCourse; domain: HubDomain } | undefined {
  const cleanId = lessonId.toLowerCase().trim();
  const allLessons = getAllHubLessons();
  return allLessons.find(
    (item) => item.lesson.id.toLowerCase() === cleanId || item.lesson.id.replace(/-/g, "") === cleanId.replace(/-/g, "")
  );
}

export function getHubStats() {
  const allCourses = getAllHubCourses();
  const allLessons = getAllHubLessons();
  const videosCount = allLessons.filter((l) => Boolean(l.lesson.youtubeEmbedId || l.lesson.youtubeUrl)).length;
  const pdfCount = allLessons.filter((l) => Boolean(l.lesson.pdfNotesUrl)).length;

  return {
    totalDomains: ENGINEERING_DOMAINS.length,
    totalCourses: allCourses.length,
    totalModules: allCourses.reduce((acc, c) => acc + c.modules.length, 0),
    totalLessons: allLessons.length,
    videosAvailable: videosCount,
    pdfNotesAvailable: pdfCount,
    pendingVideoVerification: allLessons.length - videosCount,
    pendingPdfProofing: allLessons.length - pdfCount,
  };
}

