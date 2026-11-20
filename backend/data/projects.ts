export type ProjectMilestone = {
  id: string;
  title: string;
  description: string;
  hint: string;
};

export type AIToolPrompt = {
  phase: string;
  tool: "Google Antigravity" | "Cursor" | "Claude Code" | "GitHub Copilot" | "General AI";
  title: string;
  description: string;
  prompt: string;
  expectedOutput: string;
};

export type GitStep = {
  step: number;
  title: string;
  command: string;
  explanation: string;
  commitMessage?: string;
};

export type DeploymentPlatformGuide = {
  platform: "Cloudflare" | "Vercel" | "Docker & Render" | "Linux VPS & Nginx";
  icon: string;
  badge: string;
  prerequisites: string[];
  steps: {
    title: string;
    command?: string;
    fileContent?: string;
    filePath?: string;
    description: string;
  }[];
  verifyUrl: string;
};

export type Project = {
  id: string;
  title: string;
  shortDescription: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category: "Systems & C" | "Fullstack AI SaaS" | "Backend & Microservices" | "Cloud & DevOps" | "Edge AI & Web3";
  estimatedTime: string;
  skillsRequired: string[];
  overview: string;
  learningOutcomes: string[];
  fileStructure: string;
  milestones: ProjectMilestone[];
  starterCode: string;
  portfolioSummary: string;
  aiGuide: {
    overview: string;
    prompts: AIToolPrompt[];
    tips: string[];
  };
  gitWorkflow: {
    overview: string;
    steps: GitStep[];
  };
  deploymentGuides: DeploymentPlatformGuide[];
};

export const cProjects: Project[] = [
  {
    id: "cli-calculator",
    title: "Console Calculator & Expression Engine",
    shortDescription: "Build a multi-operation arithmetic calculator with memory registers, input sanitation, and loop control.",
    difficulty: "Beginner",
    category: "Systems & C",
    estimatedTime: "2-3 Hours",
    skillsRequired: ["Variables", "printf & scanf", "Operators", "switch & while loop", "Error Handling"],
    overview:
      "A fundamental milestone project where you build an interactive CLI calculator that supports addition, subtraction, multiplication, division, modulus, and memory recall (M+, M-, MR) with continuous calculation until the user chooses to exit.",
    learningOutcomes: [
      "Master interactive user input validation and buffer clearing in C",
      "Handle edge cases like divide-by-zero and overflow safely",
      "Implement persistent memory registers across loop iterations",
    ],
    fileStructure: `calculator/
├── src/
│   ├── main.c          # Entry point & interactive CLI loop
│   ├── calc.c          # Math operations & memory registers
│   └── calc.h          # Header definitions & function prototypes
├── tests/
│   └── test_calc.c     # Unit test runner
├── Makefile            # Build targets (all, test, clean)
├── .gitignore          # Build artifact exclusions
└── README.md           # Documentation & instructions`,
    milestones: [
      {
        id: "m1",
        title: "Display Interactive Menu & State Loop",
        description: "Show operations [1: Add, 2: Subtract, 3: Multiply, 4: Divide, 5: Modulus, 6: Memory Recall, 7: Exit].",
        hint: "Use printf statements inside a do-while loop and read the choice with scanf.",
      },
      {
        id: "m2",
        title: "Input Two Operands with Buffer Sanitization",
        description: "Prompt student for two numbers and discard trailing newline/characters from stdin.",
        hint: "Clear the input stream using `while ((getchar()) != '\\n');` if non-numeric characters are entered.",
      },
      {
        id: "m3",
        title: "Execute Operation via switch with Memory Register",
        description: "Compute result, store into a running memory register, and display result with 2 decimal precision.",
        hint: "Keep a `float memoryRegister = 0.0;` that accumulates or updates on each successful command.",
      },
      {
        id: "m4",
        title: "Zero Division & Invalid Value Safeguards",
        description: "Prevent crashes when dividing by zero or calculating modulo on invalid operands.",
        hint: "Before dividing, verify `if (fabs(num2) < 1e-9) { printf('Error: Zero division!\\n'); }`.",
      },
    ],
    starterCode: `#include <stdio.h>
#include <stdlib.h>
#include <math.h>

void clearInputBuffer() {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

int main() {
    int choice;
    double num1, num2, result = 0.0, memory = 0.0;

    printf("=========================================\\n");
    printf("   ENGINEERING CLI CALCULATOR WITH MEMORY \\n");
    printf("=========================================\\n");

    do {
        printf("\\n[Memory: %.2f]\\n", memory);
        printf("1. Add (+)             2. Subtract (-)\\n");
        printf("3. Multiply (*)        4. Divide (/)\\n");
        printf("5. Modulo (%%)          6. Store into Memory (M+)\\n");
        printf("7. Clear Memory (MC)   8. Exit\\n");
        printf("Select option (1-8): ");

        if (scanf("%d", &choice) != 1) {
            printf("Invalid input! Please enter a number.\\n");
            clearInputBuffer();
            continue;
        }

        if (choice >= 1 && choice <= 5) {
            printf("Enter two numbers: ");
            if (scanf("%lf %lf", &num1, &num2) != 2) {
                printf("Error parsing numbers.\\n");
                clearInputBuffer();
                continue;
            }
        }

        switch (choice) {
            case 1:
                result = num1 + num2;
                printf(">> Result: %.4f\\n", result);
                break;
            case 2:
                result = num1 - num2;
                printf(">> Result: %.4f\\n", result);
                break;
            case 3:
                result = num1 * num2;
                printf(">> Result: %.4f\\n", result);
                break;
            case 4:
                if (fabs(num2) < 1e-9) {
                    printf(">> Error: Cannot divide by zero!\\n");
                } else {
                    result = num1 / num2;
                    printf(">> Result: %.4f\\n", result);
                }
                break;
            case 5:
                if ((long)num2 == 0) {
                    printf(">> Error: Zero modulus invalid!\\n");
                } else {
                    result = (long)num1 % (long)num2;
                    printf(">> Result: %.0f\\n", result);
                }
                break;
            case 6:
                memory = result;
                printf(">> Stored %.4f into Memory!\\n", memory);
                break;
            case 7:
                memory = 0.0;
                printf(">> Memory Cleared!\\n");
                break;
            case 8:
                printf("Exiting calculator. Goodbye!\\n");
                break;
            default:
                printf("Invalid selection! Please choose 1-8.\\n");
        }
    } while (choice != 8);

    return 0;
}`,
    portfolioSummary:
      "Developed a robust command-line calculator in C featuring input sanitation, divide-by-zero protection, floating point precision, and memory registers.",
    aiGuide: {
      overview: "Pin-to-pin guide for accelerating this project using Google Antigravity, Cursor AI, or Claude Code.",
      prompts: [
        {
          phase: "Phase 1: Architecture & Header Design",
          tool: "Google Antigravity",
          title: "Generate Modular C Architecture",
          description: "Split the monolith into clean header and implementation files.",
          prompt: `You are an expert systems engineer. I am building a modular C CLI calculator.
Create the following files:
1. 'include/calc.h' with header guards, declarations for add, subtract, multiply, divide, modulo, and memory register management.
2. 'src/calc.c' with robust implementations, handling IEEE 754 float edge cases and divide-by-zero.
3. 'src/main.c' with a sanitized interactive CLI loop.
4. 'Makefile' with flags: -Wall -Wextra -Werror -std=c11.`,
          expectedOutput: "A complete multi-file C project structure with strict compiler warnings.",
        },
        {
          phase: "Phase 2: Automated Testing with AI",
          tool: "Cursor",
          title: "Unit Test Generation for Edge Cases",
          description: "Generate unit tests checking extreme inputs like huge floats, zero division, and negative numbers.",
          prompt: `Write a standalone test runner 'tests/test_calc.c' using standard assert.h that tests:
- Division by 0 and close-to-zero floats (1e-12)
- Negative number arithmetic
- Modulo on negative numbers
- Memory register persistence across multiple calculations
Return only clean compilable C code with verbose pass/fail printouts.`,
          expectedOutput: "A comprehensive unit test file runnable via 'make test'.",
        },
        {
          phase: "Phase 3: WebAssembly Porting with AI",
          tool: "Claude Code",
          title: "Compile C Engine to WebAssembly",
          description: "Use Emscripten to run this C calculator inside the web browser.",
          prompt: `Generate an Emscripten compilation command and HTML wrapper to compile our 'calc.c' into WebAssembly (calc.wasm + calc.js) so it can run inside a modern browser with full interactive DOM buttons.`,
          expectedOutput: "emcc compilation script and index.html UI wrapper.",
        },
      ],
      tips: [
        "In Google Antigravity, create a '.gemini/config' rule to enforce '-Wall -Wextra' on all GCC commands.",
        "Always test input sanitization with weird strings like 'abc', empty enters, and EOF (Ctrl+D).",
        "Use valgrind or AddressSanitizer (-fsanitize=address) to ensure zero memory corruption.",
      ],
    },
    gitWorkflow: {
      overview: "Standard Git flow for professional software repositories.",
      steps: [
        {
          step: 1,
          title: "Initialize Repository & Add .gitignore",
          command: `git init
cat << 'EOF' > .gitignore
*.o
*.out
*.exe
build/
bin/
.DS_Store
EOF
git add .gitignore
git commit -m "chore: initialize repository and ignore build artifacts"`,
          explanation: "Prevents binary files and object code from polluting git history.",
        },
        {
          step: 2,
          title: "Commit Core Calculator Library",
          command: `git checkout -b feat/core-calculator
git add src/calc.c include/calc.h Makefile
git commit -m "feat(calc): implement arithmetic operations and memory register"`,
          explanation: "Use conventional commits (feat, fix, test, docs).",
        },
        {
          step: 3,
          title: "Commit CLI Interactive Loop & Tests",
          command: `git add src/main.c tests/test_calc.c
git commit -m "feat(cli): add interactive menu loop and unit test suite"
git checkout main
git merge feat/core-calculator`,
          explanation: "Merges feature branch cleanly into main after verification.",
        },
        {
          step: 4,
          title: "Push to GitHub with Remote Tracking",
          command: `git remote add origin https://github.com/YOUR_USERNAME/c-cli-calculator.git
git branch -M main
git push -u origin main
git tag -a v1.0.0 -m "Release v1.0.0 - Production CLI Calculator"
git push origin --tags`,
          explanation: "Tags the release and pushes all branches and tags to GitHub.",
        },
      ],
    },
    deploymentGuides: [
      {
        platform: "Cloudflare",
        icon: "⚡",
        badge: "Wasm Edge",
        prerequisites: ["Cloudflare Account", "Wrangler CLI (`npm i -g wrangler`)", "Emscripten (`emcc`)"],
        steps: [
          {
            title: "Compile C into WebAssembly",
            command: "emcc src/calc.c -s WASM=1 -s EXPORTED_FUNCTIONS='[\"_add\",\"_subtract\",\"_multiply\",\"_divide\"]' -o public/calc.js",
            description: "Translates high-performance C arithmetic directly into portable WebAssembly bytecode.",
          },
          {
            title: "Create Cloudflare Pages Configuration",
            filePath: "wrangler.toml",
            fileContent: `name = "wasm-calculator"
compatibility_date = "2026-10-01"
pages_build_output_dir = "public"`,
            description: "Configures Cloudflare Pages to serve the Wasm binary with proper MIME type headers (application/wasm).",
          },
          {
            title: "Deploy to Cloudflare Pages",
            command: "npx wrangler pages deploy public --project-name=wasm-calculator",
            description: "Instantly provisions a global edge deployment across 300+ Cloudflare edge data centers with zero cold-starts.",
          },
        ],
        verifyUrl: "https://wasm-calculator.pages.dev",
      },
      {
        platform: "Docker & Render",
        icon: "🐳",
        badge: "Container Web Terminal",
        prerequisites: ["Docker Desktop", "Render / Railway Account"],
        steps: [
          {
            title: "Create Multi-Stage Dockerfile",
            filePath: "Dockerfile",
            fileContent: `FROM alpine:latest AS builder
RUN apk add --no-cache gcc musl-dev make
WORKDIR /app
COPY . .
RUN make

FROM alpine:latest
WORKDIR /root/
COPY --from=builder /app/bin/calculator .
ENTRYPOINT ["./calculator"]`,
            description: "Compiles a super-lean (~5MB) Alpine Linux container image.",
          },
          {
            title: "Build and Test Docker Container Locally",
            command: "docker build -t cli-calc . && docker run -it --rm cli-calc",
            description: "Runs your C calculator inside an isolated container with full terminal I/O.",
          },
          {
            title: "Deploy Container to Render / Railway",
            command: "git push origin main",
            description: "Connect GitHub to Render/Railway for automatic web-shell deployments upon every commit.",
          },
        ],
        verifyUrl: "https://render.com/docs/docker",
      },
    ],
  },
  {
    id: "student-grade-system",
    title: "Student Database & Grade Analytics Engine",
    shortDescription: "Manage student marks, compute percentiles, assign GPA, and generate tabular disk-backed reports.",
    difficulty: "Beginner",
    category: "Systems & C",
    estimatedTime: "4-5 Hours",
    skillsRequired: ["Arrays & Structs", "File I/O (fopen, fread, fwrite)", "Sorting Algorithms", "Pointers"],
    overview:
      "A real-world academic record application that allows educators to input student profiles, compute statistics (mean, median, standard deviation), persist records in binary files, and export formatted CSV reports.",
    learningOutcomes: [
      "Structure multi-field records using C 'struct'",
      "Implement binary file persistence so data is never lost on shutdown",
      "Sort students by GPA using custom comparator with qsort()",
    ],
    fileStructure: `student_system/
├── include/
│   └── student.h       # Struct definition & prototypes
├── src/
│   ├── student.c       # CRUD operations & statistical analysis
│   └── main.c          # Interactive admin dashboard
├── data/
│   └── students.bin    # Binary persistent storage
├── Makefile
└── README.md`,
    milestones: [
      {
        id: "m1",
        title: "Define Student Struct & Collections",
        description: "Store student ID, name, array of 5 subject marks, percentage, and letter grade.",
        hint: "Use `typedef struct { int id; char name[50]; float marks[5]; float gpa; char grade; } Student;`.",
      },
      {
        id: "m2",
        title: "Implement File Storage Engine",
        description: "Write `saveToFile()` and `loadFromFile()` functions using fopen with 'rb' and 'wb' modes.",
        hint: "Use `fwrite(&student, sizeof(Student), 1, fp)` to persist binary structs directly to disk.",
      },
      {
        id: "m3",
        title: "GPA & Statistical Aggregations",
        description: "Calculate class average, standard deviation, topper student, and lowest scorer.",
        hint: "Loop through active records and accumulate sum and variance values.",
      },
      {
        id: "m4",
        title: "Sort Rankings & Export Tabular CSV",
        description: "Sort student roster in descending order of GPA and export to 'report.csv'.",
        hint: "Use C standard library `qsort()` with a custom comparison function.",
      },
    ],
    starterCode: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_STUDENTS 100
#define NUM_SUBJECTS 5

typedef struct {
    int id;
    char name[50];
    float marks[NUM_SUBJECTS];
    float average;
    char grade;
} Student;

char calculateGrade(float avg) {
    if (avg >= 90.0) return 'A';
    if (avg >= 80.0) return 'B';
    if (avg >= 70.0) return 'C';
    if (avg >= 60.0) return 'D';
    return 'F';
}

void printStudent(const Student *s) {
    printf("| %-4d | %-20s | %6.2f%% | Grade: %c |\\n", s->id, s->name, s->average, s->grade);
}

int main() {
    Student roster[MAX_STUDENTS];
    int count = 0;

    printf("=== CAMPUS STUDENT GRADE & ANALYTICS ENGINE ===\\n");
    // Implement file loading, menu, input and analytics...
    return 0;
}`,
    portfolioSummary:
      "Engineered an academic record management system in C with binary file persistence, statistical analysis, and automated percentile ranking.",
    aiGuide: {
      overview: "Harness AI to generate binary serializations and statistical algorithms.",
      prompts: [
        {
          phase: "Phase 1: Binary File Serialization",
          tool: "Google Antigravity",
          title: "Generate Safe File I/O with Checksums",
          description: "Write binary read/write routines that won't corrupt if the program terminates unexpectedly.",
          prompt: `In C (C11), write two functions:
1. int saveRoster(const char *filename, const Student *roster, int count);
2. int loadRoster(const char *filename, Student *roster, int maxCount);
Include file existence checks, magic bytes header verification (0x53545544 for 'STUD'), and return explicit error codes.`,
          expectedOutput: "Rock-solid file persistence with magic header verification.",
        },
        {
          phase: "Phase 2: CSV Exporter & Quicksort",
          tool: "Cursor",
          title: "Generate CSV Exporter & Comparator",
          description: "Format student data into RFC 4180 compliant CSV files.",
          prompt: `Write a C function to export our Student array to a CSV file called 'export.csv'. Handle names containing commas by wrapping in double quotes. Also write a qsort comparator function to sort students descending by GPA.`,
          expectedOutput: "Clean CSV export routine and qsort comparator.",
        },
      ],
      tips: [
        "Use Antigravity's inline terminal to run `hexdump -C data/students.bin` to inspect your binary structs.",
        "Check that your string copy functions use `strncpy` or `snprintf` to prevent buffer overflows.",
      ],
    },
    gitWorkflow: {
      overview: "Branch-based development with clean PR commits.",
      steps: [
        {
          step: 1,
          title: "Setup Project Scaffold",
          command: `git init
git checkout -b setup/structure
mkdir -p src include data
git add .
git commit -m "chore: setup modular directory layout for student database"`,
          explanation: "Organize headers, sources, and data directories.",
        },
        {
          step: 2,
          title: "Add File I/O Engine",
          command: `git checkout -b feat/file-engine
git add src/student.c include/student.h
git commit -m "feat(storage): implement binary file serialization with magic byte verification"`,
          explanation: "Isolate storage layer changes into their own branch.",
        },
        {
          step: 3,
          title: "Push to GitHub",
          command: `git checkout main
git merge feat/file-engine
git remote add origin https://github.com/YOUR_USERNAME/student-grade-engine.git
git push -u origin main`,
          explanation: "Publish production code to remote repository.",
        },
      ],
    },
    deploymentGuides: [
      {
        platform: "Linux VPS & Nginx",
        icon: "🐧",
        badge: "Native CLI Daemon",
        prerequisites: ["Ubuntu/Debian VPS", "SSH Key", "Nginx"],
        steps: [
          {
            title: "Clone and Compile on Linux Server",
            command: "git clone https://github.com/YOUR_USERNAME/student-grade-engine.git && cd student-grade-engine && make",
            description: "Compiles an optimized native Linux binary using GCC with -O3 flag.",
          },
          {
            title: "Set up Web API Daemon (Optional cJSON or microhttpd)",
            command: "./bin/student_engine --daemon --port=8080",
            description: "Runs the engine as a background service listening for queries.",
          },
        ],
        verifyUrl: "http://your-server-ip:8080",
      },
    ],
  },
  {
    id: "tcp-chat-server",
    title: "Multi-Threaded TCP Chat & Broadcast Server",
    shortDescription: "Build a concurrent TCP chat server in C supporting room channels, broadcast messaging, and mutex-guarded state.",
    difficulty: "Intermediate",
    category: "Systems & C",
    estimatedTime: "6-8 Hours",
    skillsRequired: ["POSIX Sockets (socket, bind, listen, accept)", "pthread & Mutex", "Concurrency", "Network Protocols"],
    overview:
      "A flagship networking project where you build a high-performance TCP chat server capable of serving 100+ concurrent clients. Features include broadcast messaging, private whispers (/whisper user msg), active room channels, and graceful connection lifecycle handling.",
    learningOutcomes: [
      "Master network socket programming with BSD/POSIX socket API",
      "Manage thread pools and synchronization primitives to prevent race conditions",
      "Design a custom text-based client-server protocol",
    ],
    fileStructure: `chat_server/
├── src/
│   ├── server.c        # Main socket listener & event dispatcher
│   ├── client_handler.c# Thread routine for individual connected clients
│   └── client.c        # Terminal-based interactive chat client
├── include/
│   └── protocol.h      # Message structs, constants & buffer limits
├── Makefile
└── README.md`,
    milestones: [
      {
        id: "m1",
        title: "Socket Creation, Bind & Listen",
        description: "Initialize IPv4 TCP socket, bind to port 8888, and listen for incoming connections.",
        hint: "Use `socket(AF_INET, SOCK_STREAM, 0)` and set `SO_REUSEADDR` to avoid 'Address already in use' errors.",
      },
      {
        id: "m2",
        title: "Concurrent Client Thread Spawning",
        description: "Spawn a dedicated pthread for each accepted client socket with `pthread_create()`.",
        hint: "Pass the client socket descriptor dynamically allocated to avoid race conditions on the loop variable.",
      },
      {
        id: "m3",
        title: "Thread-Safe Broadcast Engine",
        description: "Broadcast incoming messages to all active connected clients using a mutex-protected client array.",
        hint: "Lock `pthread_mutex_lock(&clients_mutex)` before iterating through the client socket array.",
      },
      {
        id: "m4",
        title: "Private Commands & Graceful Disconnect",
        description: "Handle '/nick <name>', '/quit', and detect abrupt client socket disconnections cleanly.",
        hint: "Check return value of `recv()`. If <= 0, remove client from array and close socket.",
      },
    ],
    starterCode: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <pthread.h>
#include <sys/socket.h>
#include <netinet/in.h>

#define PORT 8888
#define MAX_CLIENTS 100
#define BUFFER_SIZE 2048

int main() {
    int server_fd, new_socket;
    struct sockaddr_in address;
    int opt = 1;

    if ((server_fd = socket(AF_INET, SOCK_STREAM, 0)) == 0) {
        perror("Socket creation failed");
        exit(EXIT_FAILURE);
    }

    setsockopt(server_fd, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));
    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY;
    address.sin_port = htons(PORT);

    if (bind(server_fd, (struct sockaddr *)&address, sizeof(address)) < 0) {
        perror("Bind failed");
        exit(EXIT_FAILURE);
    }

    if (listen(server_fd, 10) < 0) {
        perror("Listen failed");
        exit(EXIT_FAILURE);
    }

    printf(">>> Chat Server online on port %d...\\n", PORT);
    // Accept clients in loop & spawn threads...
    return 0;
}`,
    portfolioSummary:
      "Architected a high-concurrency multi-threaded TCP chat server in C supporting 100+ concurrent clients, broadcast routing, and POSIX mutex synchronization.",
    aiGuide: {
      overview: "Use AI to debug race conditions, design packet protocols, and simulate high-concurrency client load.",
      prompts: [
        {
          phase: "Phase 1: Concurrency & Mutex Safety",
          tool: "Google Antigravity",
          title: "Implement Thread-Safe Client Registry",
          description: "Generate bulletproof client add/remove logic with zero memory leaks.",
          prompt: `Write a thread-safe client management module in C:
- Client struct containing socket_fd, client_id, nickname, and room.
- Fixed array of MAX_CLIENTS with pthread_mutex_t.
- void broadcastMessage(const char *msg, int sender_fd);
- void sendDirectMessage(const char *recipient_nick, const char *msg, int sender_fd);
Include detailed comments explaining where deadlocks could occur and how you prevent them.`,
          expectedOutput: "Deadlock-free client registry with clean mutex locking order.",
        },
        {
          phase: "Phase 2: Stress Testing with Python Client Bot",
          tool: "Cursor",
          title: "Generate 50-Client Concurrency Stress Tester",
          description: "Simulate 50 concurrent automated users sending spam to verify server resilience.",
          prompt: `Write a Python 3 asyncio script that connects 50 simultaneous TCP sockets to 127.0.0.1:8888, authenticates unique nicknames, and blasts 10 messages per second each. Report dropped connections, latency, and throughput.`,
          expectedOutput: "A high-performance load testing script to validate C server throughput.",
        },
      ],
      tips: [
        "Compile with `-fsanitize=thread` to catch race conditions and data hazards instantly.",
        "Remember to set `signal(SIGPIPE, SIG_IGN)` to prevent the server crashing when a client unexpectedly closes.",
      ],
    },
    gitWorkflow: {
      overview: "Production Git practices with feature tags.",
      steps: [
        {
          step: 1,
          title: "Initialize Repository & Socket Core",
          command: `git init
git add src/server.c Makefile README.md
git commit -m "feat(server): initialize POSIX TCP socket listener on port 8888"`,
          explanation: "Establishes baseline socket binding.",
        },
        {
          step: 2,
          title: "Add Pthread Client Handlers",
          command: `git checkout -b feat/multithreading
git add src/client_handler.c include/protocol.h
git commit -m "feat(concurrency): integrate pthread worker threads and broadcast mutex"`,
          explanation: "Adds multi-threading capability.",
        },
        {
          step: 3,
          title: "Tag and Push to GitHub",
          command: `git checkout main
git merge feat/multithreading
git remote add origin https://github.com/YOUR_USERNAME/c-tcp-chat-server.git
git push -u origin main --tags`,
          explanation: "Publishes project to GitHub.",
        },
      ],
    },
    deploymentGuides: [
      {
        platform: "Docker & Render",
        icon: "🐳",
        badge: "Dockerized TCP Service",
        prerequisites: ["Docker", "Cloud VM or Render Private Service"],
        steps: [
          {
            title: "Write Multi-Stage Dockerfile",
            filePath: "Dockerfile",
            fileContent: `FROM alpine:3.19 AS build
RUN apk add --no-cache gcc musl-dev make
WORKDIR /src
COPY . .
RUN gcc -O2 -pthread src/server.c src/client_handler.c -Iinclude -o chat_server

FROM alpine:3.19
RUN apk add --no-cache libgcc
WORKDIR /app
COPY --from=build /src/chat_server .
EXPOSE 8888
CMD ["./chat_server"]`,
            description: "Creates an ultra-lightweight 8MB Docker image ready for production.",
          },
          {
            title: "Run Container with Port Forwarding",
            command: "docker build -t c-chat-server . && docker run -d -p 8888:8888 --name chat c-chat-server",
            description: "Exposes port 8888 to external TCP traffic.",
          },
        ],
        verifyUrl: "nc 127.0.0.1 8888",
      },
    ],
  },
  {
    id: "redis-kv-cache",
    title: "High-Speed Key-Value Cache Engine (Redis Clone)",
    shortDescription: "Build an in-memory key-value database in C with O(1) hash tables, LRU eviction, and RESP protocol support.",
    difficulty: "Advanced",
    category: "Systems & C",
    estimatedTime: "10-12 Hours",
    skillsRequired: ["Dynamic Memory (malloc, free)", "Hash Tables & Collisions", "Doubly Linked Lists", "RESP Protocol", "O(1) LRU Cache"],
    overview:
      "Construct a blazing-fast in-memory database inspired by Redis. Implements Robin Hood or separate chaining hash tables, an O(1) Least-Recently-Used (LRU) memory eviction policy using doubly linked lists, TTL key expiration, and basic Redis Serialization Protocol (RESP) commands: SET, GET, DEL, EXPIRE, and STATS.",
    learningOutcomes: [
      "Master collision resolution and rehashing algorithms in pure C",
      "Implement textbook O(1) LRU eviction by marrying a hash table with a doubly linked list",
      "Parse raw TCP byte streams and serialise standard RESP protocol packets",
    ],
    fileStructure: `nanoredis/
├── src/
│   ├── hashtable.c     # Dynamic resizing hash map
│   ├── lru.c           # Doubly linked list eviction tracker
│   ├── resp.c          # Redis protocol parser
│   ├── storage.c       # Core database engine & TTL timers
│   └── server.c        # Event loop / socket server
├── include/
│   ├── hashtable.h
│   └── nanoredis.h
├── tests/
│   └── benchmark.py    # Redis-py performance benchmark
├── Makefile
└── README.md`,
    milestones: [
      {
        id: "m1",
        title: "Dynamic Hash Table with Separate Chaining",
        description: "Implement hash function (MurmurHash3 or djb2) and dynamic resizing when load factor exceeds 0.75.",
        hint: "Allocate buckets dynamically and rehash existing keys into the new table size.",
      },
      {
        id: "m2",
        title: "O(1) LRU Eviction via Doubly Linked List",
        description: "Every GET or SET moves node to head; when max memory is hit, evict tail node in O(1) time.",
        hint: "Store pointer to DLL node inside the hash table entry for constant time lookup and node detachment.",
      },
      {
        id: "m3",
        title: "RESP Wire Protocol Parsing",
        description: "Parse incoming RESP commands like '*3\\r\\n$3\\r\\nSET\\r\\n$3\\r\\nfoo\\r\\n$3\\r\\nbar\\r\\n'.",
        hint: "Tokenize strings separated by \\r\\n and extract command names and arguments cleanly.",
      },
      {
        id: "m4",
        title: "TTL Key Expiration & Benchmark Verification",
        description: "Support 'EXPIRE key seconds' and test throughput using official redis-cli tool.",
        hint: "Compare your server's latency against real Redis using `redis-benchmark -p 6379`.",
      },
    ],
    starterCode: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdint.h>

#define INITIAL_CAPACITY 16
#define MAX_MEMORY_KEYS 1000

typedef struct Node {
    char *key;
    char *value;
    struct Node *prev;
    struct Node *next;
} Node;

typedef struct {
    Node **buckets;
    size_t capacity;
    size_t size;
    Node *lru_head;
    Node *lru_tail;
} CacheEngine;

uint32_t hash_djb2(const char *str) {
    uint32_t hash = 5381;
    int c;
    while ((c = *str++)) hash = ((hash << 5) + hash) + c;
    return hash;
}

int main() {
    printf("=== NANOREDIS IN-MEMORY CACHE ENGINE ===\\n");
    // Implement hash table allocation, LRU linking, and socket server...
    return 0;
}`,
    portfolioSummary:
      "Developed a high-performance in-memory key-value cache engine in C featuring dynamic hash tables, O(1) LRU eviction, and Redis RESP protocol compliance.",
    aiGuide: {
      overview: "Master deep systems engineering algorithms with Google Antigravity & AI.",
      prompts: [
        {
          phase: "Phase 1: LRU Doubly Linked List Architecture",
          tool: "Google Antigravity",
          title: "Implement Doubly Linked List with Detach and Prepend",
          description: "Generate pointer-safe node detachment without memory corruption.",
          prompt: `Implement an LRU doubly linked list in C with functions:
1. void dll_remove(CacheEngine *cache, Node *node);
2. void dll_push_front(CacheEngine *cache, Node *node);
3. Node* dll_pop_tail(CacheEngine *cache);
Ensure all pointers (head, tail, node->prev, node->next) are safely updated, especially for 1-element or empty lists.`,
          expectedOutput: "A thoroughly documented, pointer-safe doubly linked list implementation.",
        },
        {
          phase: "Phase 2: Redis Wire Protocol Compatibility",
          tool: "Cursor",
          title: "Implement RESP Parser for redis-cli compatibility",
          description: "Parse Redis protocol arrays and bulk strings.",
          prompt: `Write a C function that takes a raw TCP buffer received from redis-cli and parses RESP arrays:
Example: *3\\r\\n$3\\r\\nSET\\r\\n$4\\r\\nname\\r\\n$5\\r\\nrahim\\r\\n
Return an array of char* tokens and the total command count. Include error handling for incomplete packets.`,
          expectedOutput: "A production-grade RESP tokenizer.",
        },
      ],
      tips: [
        "Test your server by directly running `redis-cli -p 6379 ping` and `redis-cli set test 123`.",
        "Run AddressSanitizer (`gcc -fsanitize=address`) to confirm all keys and values are freed during eviction.",
      ],
    },
    gitWorkflow: {
      overview: "Standardized release management with semver tags.",
      steps: [
        {
          step: 1,
          title: "Commit Core Hash Table",
          command: `git init
git add src/hashtable.c include/hashtable.h
git commit -m "feat(hashtable): dynamic separate chaining hash table with djb2 hash"`,
          explanation: "Foundation storage structure.",
        },
        {
          step: 2,
          title: "Add LRU & RESP Engine",
          command: `git add src/lru.c src/resp.c src/server.c
git commit -m "feat(lru): O(1) doubly linked list eviction and RESP wire protocol"`,
          explanation: "High-performance eviction mechanics.",
        },
        {
          step: 3,
          title: "Publish to GitHub with Benchmark Graphs",
          command: `git remote add origin https://github.com/YOUR_USERNAME/nanoredis-c.git
git push -u origin main
git tag -a v1.0.0 -m "Release v1.0.0: NanoRedis In-Memory Engine"
git push origin --tags`,
          explanation: "Publish production code with tags.",
        },
      ],
    },
    deploymentGuides: [
      {
        platform: "Docker & Render",
        icon: "🐳",
        badge: "Redis-Compatible Microservice",
        prerequisites: ["Docker"],
        steps: [
          {
            title: "Build Production NanoRedis Docker Image",
            filePath: "Dockerfile",
            fileContent: `FROM alpine:latest AS builder
RUN apk add --no-cache gcc musl-dev make
WORKDIR /app
COPY . .
RUN make release

FROM alpine:latest
COPY --from=builder /app/bin/nanoredis /usr/local/bin/
EXPOSE 6379
ENTRYPOINT ["nanoredis", "--port", "6379", "--max-memory", "128MB"]`,
            description: "Produces a tiny 6MB container compatible with any standard Redis client library.",
          },
          {
            title: "Run and Connect via redis-cli",
            command: "docker run -d -p 6379:6379 --name nanoredis nanoredis-img && redis-cli -p 6379 PING",
            description: "Verifies the PONG response from your custom C server.",
          },
        ],
        verifyUrl: "redis://127.0.0.1:6379",
      },
    ],
  },
  {
    id: "fullstack-ai-saas",
    title: "Fullstack AI SaaS: AI Resume & Career Intelligence Platform",
    shortDescription: "Production Next.js 15, Gemini 1.5 Pro, Supabase Auth/DB, and Razorpay billing with automated PDF generation.",
    difficulty: "Advanced",
    category: "Fullstack AI SaaS",
    estimatedTime: "15-20 Hours",
    skillsRequired: ["Next.js App Router (React 19/TypeScript)", "Supabase Auth & RLS", "Google Gemini API", "Tailwind CSS", "Server Actions"],
    overview:
      "A flagship enterprise-ready AI Web Application. Users authenticate via Supabase Auth, submit raw career details, and an orchestrated Gemini 1.5 Pro pipeline extracts ATS keywords, formats bullet points using Google's X-Y-Z formula, scores resume readability, and exports vector-crisp PDF resumes. Includes paywalls, subscription tiers, and dark/light modes.",
    learningOutcomes: [
      "Orchestrate LLM prompt engineering pipelines with structured JSON outputs",
      "Implement Row-Level Security (RLS) policies in Supabase Postgres",
      "Generate dynamic client-side and server-side PDF exports with React-PDF",
    ],
    fileStructure: `ai-career-saas/
├── app/
│   ├── (auth)/login/page.tsx       # Supabase OAuth login
│   ├── dashboard/page.tsx          # Resume overview & analytics
│   ├── builder/page.tsx            # Live drag-and-drop resume editor
│   └── api/
│       ├── ai/generate/route.ts    # Gemini 1.5 Pro streaming endpoint
│       └── billing/checkout/route.ts# Subscription webhook handler
├── components/
│   ├── ResumePreview.tsx           # Realtime A4 resume renderer
│   ├── PaywallGate.tsx             # Pro tier access controller
│   └── AiSuggestionDrawer.tsx      # Inline AI rewrite assistant
├── lib/
│   ├── supabase/server.ts          # Server-side Supabase client
│   └── gemini.ts                   # Google Generative AI client
├── .env.example
├── next.config.ts
└── README.md`,
    milestones: [
      {
        id: "m1",
        title: "Setup Next.js 15 App Router & Supabase Auth",
        description: "Initialize Next.js project with Tailwind CSS, TypeScript, and Supabase SSR authentication.",
        hint: "Use `@supabase/ssr` to configure cookie-based authentication in middleware and Server Actions.",
      },
      {
        id: "m2",
        title: "Gemini 1.5 Pro Structured Prompt Orchestration",
        description: "Send user career history to Gemini with responseSchema set to strict JSON resume format.",
        hint: "Use Google's `@google/genai` or `@google/generative-ai` with generationConfig: { responseMimeType: 'application/json' }.",
      },
      {
        id: "m3",
        title: "Live Interactive A4 Resume Canvas & ATS Scoring",
        description: "Render reactive resume preview with live edit and instant ATS keyword matching score (0-100%).",
        hint: "Calculate score based on action verbs, metrics (numbers/percentages), and target job description overlap.",
      },
      {
        id: "m4",
        title: "One-Click PDF Export & Pro Paywall Gate",
        description: "Render print-optimized PDF with `@react-pdf/renderer` and guard premium templates behind Pro gate.",
        hint: "Use CSS print media queries `@media print` or server-side `@react-pdf/renderer` stream.",
      },
    ],
    starterCode: `// app/api/ai/generate/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { rawExperience, jobTitle } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = \`Transform this experience for a \${jobTitle} role into Google X-Y-Z bullet points:
Accomplished [X], as measured by [Y], by doing [Z].
Input: \${rawExperience}

Return JSON with structure: { bullets: string[], atsKeywords: string[], readabilityScore: number }\`;

    const result = await model.generateContent(prompt);
    const data = JSON.parse(result.response.text());

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}`,
    portfolioSummary:
      "Built a production fullstack AI SaaS using Next.js 15, Gemini 1.5 Pro, Supabase Auth, and Tailwind CSS, automating resume scoring and professional PDF generation.",
    aiGuide: {
      overview: "Step-by-step instructions to scaffold and ship this SaaS using Google Antigravity and Cursor.",
      prompts: [
        {
          phase: "Phase 1: Database Schema & Supabase RLS",
          tool: "Google Antigravity",
          title: "Generate Postgres DDL with Row Level Security",
          description: "Create user profiles, resume documents, and subscription tables with hardened policies.",
          prompt: `Create a Supabase SQL migration for an AI Resume SaaS:
1. 'profiles' table with id (references auth.users), full_name, is_pro, created_at.
2. 'resumes' table with id, user_id, title, content (JSONB), ats_score, updated_at.
3. Row Level Security policies: users can only SELECT, INSERT, UPDATE, DELETE their own resumes.
4. Auto-profile trigger on new user signup in auth.users.`,
          expectedOutput: "Secure Supabase migration script with RLS enabled.",
        },
        {
          phase: "Phase 2: Live Editor UI with Glassmorphism",
          tool: "Cursor",
          title: "Generate Two-Column Live Resume Builder Component",
          description: "Left side input forms, right side live A4 preview with instant typing updates.",
          prompt: `Write a React 19 Next.js component 'ResumeBuilder.tsx' with:
- Left column: Accordion sections for Contact, Experience, Education, Projects, and Skills.
- Right column: Clean white A4 paper card with shadow and live updates.
- Top bar: 'AI Improve' button that calls '/api/ai/generate' and streaming feedback indicator.
Use Tailwind CSS with rich modern styling.`,
          expectedOutput: "Interactive full-featured React builder component.",
        },
        {
          phase: "Phase 3: High-Fidelity PDF Generation",
          tool: "Claude Code",
          title: "Create React-PDF Document Template",
          description: "Vector-sharp printable PDF matching the web preview.",
          prompt: `Generate a React-PDF document template using '@react-pdf/renderer' that renders an ATS-friendly single-page resume with standard margins, font hierarchies, and page-break guards.`,
          expectedOutput: "Clean printable React-PDF component.",
        },
      ],
      tips: [
        "In Google Antigravity, set up environment secrets in '.env.local' and never commit real API keys.",
        "Always use Gemini's 'responseMimeType: application/json' to guarantee valid JSON parsing without markdown ticks.",
      ],
    },
    gitWorkflow: {
      overview: "GitHub workflow with automated branch protection.",
      steps: [
        {
          step: 1,
          title: "Initialize Next.js Repository",
          command: `git init
git add .
git commit -m "chore: scaffold Next.js 15 App Router with Tailwind and Supabase client"`,
          explanation: "Baseline project setup.",
        },
        {
          step: 2,
          title: "Add Gemini AI Pipeline & Resume Builder",
          command: `git checkout -b feat/ai-pipeline
git add app/api/ai/ components/ lib/gemini.ts
git commit -m "feat(ai): integrate Gemini 1.5 Pro prompt orchestration and live A4 canvas"`,
          explanation: "Isolate AI features on a feature branch.",
        },
        {
          step: 3,
          title: "Push to GitHub and Deploy to Cloudflare / Vercel",
          command: `git checkout main
git merge feat/ai-pipeline
git remote add origin https://github.com/YOUR_USERNAME/ai-career-saas.git
git push -u origin main`,
          explanation: "Triggers automatic deployment preview.",
        },
      ],
    },
    deploymentGuides: [
      {
        platform: "Cloudflare",
        icon: "⚡",
        badge: "Edge SSR via Cloudflare Pages",
        prerequisites: ["Cloudflare Account", "@cloudflare/next-on-pages"],
        steps: [
          {
            title: "Install Cloudflare Next adapter",
            command: "npm install -D @cloudflare/next-on-pages",
            description: "Enables edge execution for Next.js App Router on Cloudflare's global V8 network.",
          },
          {
            title: "Configure next.config.ts for Edge",
            filePath: "next.config.ts",
            fileContent: `import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default nextConfig;`,
            description: "Ensures pure edge-compatible runtime dependencies.",
          },
          {
            title: "Deploy via Wrangler",
            command: "npx @cloudflare/next-on-pages && npx wrangler pages deploy .vercel/output/static --project-name=ai-career-saas",
            description: "Publishes your Next.js application to Cloudflare Pages.",
          },
        ],
        verifyUrl: "https://ai-career-saas.pages.dev",
      },
      {
        platform: "Vercel",
        icon: "▲",
        badge: "Native Zero-Config",
        prerequisites: ["Vercel Account", "GitHub Repository"],
        steps: [
          {
            title: "Import GitHub Repo into Vercel",
            command: "npx vercel --prod",
            description: "Deploys directly from the terminal or via the Vercel dashboard with automatic branch previews.",
          },
          {
            title: "Configure Environment Variables",
            command: "vercel env add GEMINI_API_KEY && vercel env add NEXT_PUBLIC_SUPABASE_URL",
            description: "Injects secure API keys into production runtime.",
          },
        ],
        verifyUrl: "https://ai-career-saas.vercel.app",
      },
    ],
  },
  {
    id: "realtime-doc-workspace",
    title: "Realtime Collaborative Workspace (CRDTs & WebSockets)",
    shortDescription: "Build a Google Docs / Notion clone with conflict-free replicated data types (Yjs), WebSockets, and presence cursors.",
    difficulty: "Advanced",
    category: "Fullstack AI SaaS",
    estimatedTime: "12-16 Hours",
    skillsRequired: ["CRDTs (Yjs / Automerge)", "WebSockets / Socket.io", "React 19 & TipTap Editor", "Node.js / Hono"],
    overview:
      "A distributed systems marvel. Build a multi-user real-time document editor where multiple people can type, highlight, and format simultaneously without merge conflicts or lost keystrokes. Features live colored avatar cursors, offline-first sync, version history, and rich markdown export.",
    learningOutcomes: [
      "Understand Conflict-Free Replicated Data Types (CRDTs) vs Operational Transformation (OT)",
      "Manage bi-directional binary WebSocket state synchronisation using Yjs",
      "Broadcast live user awareness state (cursor coordinates, active selection, avatar name)",
    ],
    fileStructure: `collab_docs/
├── server/
│   ├── index.ts        # Node/Hono WebSocket server with Y-Websocket provider
│   └── persistence.ts  # LevelDB / Postgres binary document snapshots
├── client/
│   ├── src/
│   │   ├── components/Editor.tsx # TipTap collaborative rich editor
│   │   ├── components/Cursors.tsx # Real-time user cursor overlays
│   │   └── hooks/useYjs.ts       # Yjs document provider hook
├── package.json
└── README.md`,
    milestones: [
      {
        id: "m1",
        title: "Setup Yjs Document & WebSocket Server",
        description: "Configure Node.js server with `y-websocket` to handle room subscriptions.",
        hint: "Initialize `const wss = new WebSocket.Server({ port: 1234 }); setupWSConnection(conn, req);`.",
      },
      {
        id: "m2",
        title: "Integrate Collaborative TipTap Editor",
        description: "Connect frontend React editor to the Yjs document state with `@tiptap/extension-collaboration`.",
        hint: "Bind `Collaboration.configure({ document: ydoc })` to TipTap extensions array.",
      },
      {
        id: "m3",
        title: "Multiplayer Awareness & Live Cursors",
        description: "Render smooth colored cursor badges with usernames following remote user selections.",
        hint: "Use `@tiptap/extension-collaboration-cursor` with random distinct user colors.",
      },
      {
        id: "m4",
        title: "Offline-First Sync & Snapshot Persistence",
        description: "Persist document updates in IndexedDB locally and save periodic snapshots to Postgres.",
        hint: "Use `y-indexeddb` on client so changes made offline sync seamlessly upon reconnection.",
      },
    ],
    starterCode: `// client/src/hooks/useCollabEditor.ts
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

export function useCollabEditor(roomName: string, userName: string, userColor: string) {
  const ydoc = new Y.Doc();
  const provider = new WebsocketProvider("ws://localhost:1234", roomName, ydoc);

  provider.awareness.setLocalStateField("user", {
    name: userName,
    color: userColor,
  });

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ history: false }),
      Collaboration.configure({ document: ydoc }),
      CollaborationCursor.configure({
        provider,
        user: { name: userName, color: userColor },
      }),
    ],
  });

  return { editor, provider, ydoc };
}`,
    portfolioSummary:
      "Designed and implemented a real-time collaborative document platform using Yjs CRDTs, WebSockets, and TipTap with multi-user cursor awareness and offline sync.",
    aiGuide: {
      overview: "Guide to building distributed real-time systems using AI pair programming.",
      prompts: [
        {
          phase: "Phase 1: WebSocket Backend & Rooms",
          tool: "Google Antigravity",
          title: "Build High-Throughput Yjs WebSocket Server",
          description: "Create a lightweight WebSocket server in TypeScript with heartbeat ping/pong and rooms.",
          prompt: `Create a TypeScript WebSocket server using 'ws' and 'y-websocket/bin/utils':
- Support multiple dynamic room IDs (/room/[roomId])
- Heartbeat ping every 30 seconds to terminate zombie sockets
- Store periodic binary state updates to disk using LevelDB
- Include clean graceful shutdown handling (SIGINT/SIGTERM)`,
          expectedOutput: "Scalable WebSocket server script.",
        },
        {
          phase: "Phase 2: Custom Presence Cursor UI",
          tool: "Cursor",
          title: "Design Smooth Animated Multiplayer Cursors",
          description: "Render floating cursor flags with user initials that glide smoothly.",
          prompt: `Write a React component with CSS transitions that displays remote multiplayer cursors. Each cursor should have a colored caret line, a smooth coordinate lerp, and an animated badge showing the user's name on hover.`,
          expectedOutput: "Polished presence cursor component.",
        },
      ],
      tips: [
        "Disable standard undo/redo history in the editor when using CRDTs — Yjs provides its own distributed UndoManager.",
        "Simulate network disconnects using Chrome DevTools 'Offline' mode to verify that local edits don't get lost.",
      ],
    },
    gitWorkflow: {
      overview: "Git monorepo management for client & server.",
      steps: [
        {
          step: 1,
          title: "Initialize Monorepo",
          command: `git init
git add package.json server/ client/
git commit -m "chore: setup collaborative document monorepo with client and server packages"`,
          explanation: "Scaffolds dual-package structure.",
        },
        {
          step: 2,
          title: "Add CRDT Engine & Push",
          command: `git add .
git commit -m "feat(collab): integrate Yjs CRDT provider, TipTap editor, and presence cursors"
git remote add origin https://github.com/YOUR_USERNAME/realtime-collab-docs.git
git push -u origin main`,
          explanation: "Ship to GitHub.",
        },
      ],
    },
    deploymentGuides: [
      {
        platform: "Cloudflare",
        icon: "⚡",
        badge: "Cloudflare Durable Objects & Workers",
        prerequisites: ["Cloudflare Workers Paid / Standard", "Wrangler CLI"],
        steps: [
          {
            title: "Configure Cloudflare Durable Object for WebSocket Rooms",
            filePath: "wrangler.toml",
            fileContent: `name = "collab-room-worker"
main = "src/worker.ts"
compatibility_date = "2026-10-01"

[durable_objects]
bindings = [{ name = "ROOMS", class_name = "CollabRoom" }]

[[migrations]]
tag = "v1"
new_classes = ["CollabRoom"]`,
            description: "Durable Objects guarantee a single point of coordination for each document room worldwide.",
          },
          {
            title: "Deploy Room Worker",
            command: "npx wrangler deploy",
            description: "Instant zero-maintenance deployment with global edge presence.",
          },
        ],
        verifyUrl: "wss://collab-room-worker.YOUR_SUBDOMAIN.workers.dev",
      },
    ],
  },
  {
    id: "edge-object-detection",
    title: "Edge Computer Vision & Real-time Object Tracker",
    shortDescription: "Deploy YOLOv8 / ONNX object detection in Python/FastAPI with OpenCV video stream processing and WebRTC feeds.",
    difficulty: "Advanced",
    category: "Edge AI & Web3",
    estimatedTime: "10-14 Hours",
    skillsRequired: ["Python 3.11", "OpenCV (cv2)", "YOLOv8 / ONNX Runtime", "FastAPI & WebSockets", "Asyncio"],
    overview:
      "Build an edge AI computer vision pipeline that processes live camera streams, performs real-time bounding box object detection and tracking (people, cars, electronics) at 60+ FPS using ONNX Runtime with quantized INT8 weights, and broadcasts annotated video feeds via WebSockets or WebRTC.",
    learningOutcomes: [
      "Export PyTorch computer vision models into optimized ONNX runtime graphs",
      "Process multi-frame video pipelines without blocking the asynchronous event loop",
      "Implement Non-Maximum Suppression (NMS) and Kalman-filter bounding box tracking",
    ],
    fileStructure: `vision_edge/
├── app/
│   ├── main.py          # FastAPI server with WebSocket video feed
│   ├── detector.py      # ONNX Runtime model inference engine
│   └── tracker.py       # Centroid / ByteTrack object tracker
├── models/
│   └── yolov8n.onnx     # Quantized edge-optimized weights
├── static/
│   └── index.html       # WebRTC / Canvas live viewer
├── Dockerfile
├── requirements.txt
└── README.md`,
    milestones: [
      {
        id: "m1",
        title: "Export & Optimize ONNX Model",
        description: "Export YOLOv8 nano model to ONNX with INT8 dynamic quantization.",
        hint: "Run `yolo export model=yolov8n.pt format=onnx half=True` or use onnxruntime quantize module.",
      },
      {
        id: "m2",
        title: "Inference Engine & Pre/Post-processing",
        description: "Letterbox input images to 640x640, run ONNX session, and compute Non-Maximum Suppression (NMS).",
        hint: "Scale bounding boxes back to the original camera aspect ratio.",
      },
      {
        id: "m3",
        title: "FastAPI Streaming Endpoint",
        description: "Stream processed MJPEG or binary WebSocket frames directly to web clients.",
        hint: "Use FastAPI `StreamingResponse(generate_frames(), media_type='multipart/x-mixed-replace; boundary=frame')`.",
      },
      {
        id: "m4",
        title: "Telemetry Dashboard & Count Analytics",
        description: "Track total object counts over time, trigger alert when designated areas are entered.",
        hint: "Define virtual bounding polygon zones and test point-in-polygon checks.",
      },
    ],
    starterCode: `# app/main.py
from fastapi import FastAPI, WebSocket
import cv2
import numpy as np
import onnxruntime as ort

app = FastAPI(title="Edge Computer Vision API")

# Load ONNX Session with CPU / CoreML / CUDA provider
session = ort.InferenceSession("models/yolov8n.onnx", providers=['CPUExecutionProvider'])

@app.get("/")
def home():
    return {"status": "Vision Pipeline Online", "fps_target": 60}

# Add WebSocket frame ingestion and bounding box overlays...`,
    portfolioSummary:
      "Architected an edge computer vision pipeline in Python and FastAPI leveraging ONNX Runtime and OpenCV, achieving real-time 60 FPS multi-object tracking.",
    aiGuide: {
      overview: "Prompt templates for generating CV pipelines with Google Antigravity & Claude.",
      prompts: [
        {
          phase: "Phase 1: ONNX Pre & Post Processing",
          tool: "Google Antigravity",
          title: "Generate Numpy-based NMS and Letterboxing",
          description: "High-performance vectorised image scaling without OpenCV bottleneck.",
          prompt: `Write pure NumPy functions for YOLOv8 ONNX inference in Python:
1. letterbox(im, new_shape=(640,640)) preserving aspect ratio with gray padding.
2. non_max_suppression(prediction, conf_thres=0.25, iou_thres=0.45).
Optimize for CPU execution speed using NumPy vectorisation.`,
          expectedOutput: "Clean vectorised NumPy pre/post-processing module.",
        },
      ],
      tips: [
        "Benchmark inference latency with `time.perf_counter()` to verify real-time FPS compliance.",
      ],
    },
    gitWorkflow: {
      overview: "Managing Git LFS for model weights.",
      steps: [
        {
          step: 1,
          title: "Setup Git LFS for Large ONNX Weights",
          command: `git init
git lfs install
git lfs track "*.onnx"
git add .gitattributes requirements.txt app/
git commit -m "chore: setup computer vision service with Git LFS for model weights"`,
          explanation: "Prevents bloating git history with large binary weights.",
        },
        {
          step: 2,
          title: "Push to GitHub",
          command: `git remote add origin https://github.com/YOUR_USERNAME/edge-vision-tracker.git
git push -u origin main`,
          explanation: "Ship code and model tracks.",
        },
      ],
    },
    deploymentGuides: [
      {
        platform: "Docker & Render",
        icon: "🐳",
        badge: "Docker Container with OpenCV",
        prerequisites: ["Docker"],
        steps: [
          {
            title: "Build Container with OpenCV & ONNX",
            filePath: "Dockerfile",
            fileContent: `FROM python:3.11-slim
RUN apt-get update && apt-get install -y libgl1 libglib2.0-0 && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]`,
            description: "Installs Linux graphics dependencies (libgl1) required by OpenCV.",
          },
          {
            title: "Run Container",
            command: "docker build -t vision-edge . && docker run -p 8000:8000 vision-edge",
            description: "Starts the high-speed video inference API server.",
          },
        ],
        verifyUrl: "http://localhost:8000/docs",
      },
    ],
  },
  {
    id: "microservices-devops",
    title: "Production Microservices Platform (Docker, Traefik & CI/CD)",
    shortDescription: "Deploy distributed microservices with Traefik reverse proxy, Prometheus metrics, Grafana dashboards, and GitHub Actions.",
    difficulty: "Advanced",
    category: "Cloud & DevOps",
    estimatedTime: "12-15 Hours",
    skillsRequired: ["Docker & Docker Compose", "Traefik Reverse Proxy", "Prometheus & Grafana", "GitHub Actions CI/CD", "Bash Scripting"],
    overview:
      "A complete Cloud & DevOps masterclass. Architect and deploy a fault-tolerant microservices cluster consisting of an Auth service, an API Gateway (Traefik with automatic SSL), a Background Worker queue, Redis, and an observability stack (Prometheus metrics scraping and Grafana dashboards). Includes automated GitHub Actions CI/CD pipelines with zero-downtime rolling updates.",
    learningOutcomes: [
      "Configure automated path routing and Let's Encrypt TLS certificates with Traefik",
      "Write multi-service docker-compose.yml files with healthchecks and isolated networks",
      "Set up GitHub Actions matrix workflows for automated linting, testing, and deployment",
    ],
    fileStructure: `cloud_platform/
├── .github/
│   └── workflows/
│       ├── test.yml          # Automated CI test runner
│       └── deploy.yml        # CD rolling deployment via SSH
├── services/
│   ├── gateway/              # Traefik dynamic configuration
│   ├── auth-service/         # Go / Node authentication microservice
│   └── worker-service/       # Python Celery / Redis queue worker
├── monitoring/
│   ├── prometheus.yml        # Prometheus metrics scraper config
│   └── grafana/              # Preconfigured dashboard JSONs
├── docker-compose.yml        # Multi-service production stack
├── Makefile                  # Local dev & staging commands
└── README.md`,
    milestones: [
      {
        id: "m1",
        title: "Docker Compose Multi-Container Orchestration",
        description: "Scaffold Auth service, API Gateway, Redis, and Worker with custom bridge networks.",
        hint: "Define frontend and backend internal networks to prevent unauthorized direct database access.",
      },
      {
        id: "m2",
        title: "Traefik Ingress Routing & Auto SSL",
        description: "Configure dynamic routing labels on Docker services so Traefik automatically discovers endpoints.",
        hint: "Use `traefik.http.routers.api.rule=Host(\`api.yourdomain.com\`)` in container labels.",
      },
      {
        id: "m3",
        title: "Prometheus Metrics & Grafana Dashboard",
        description: "Scrape CPU, memory, and HTTP status code rates from services and visualize in Grafana.",
        hint: "Expose `/metrics` endpoint in Prometheus text exposition format.",
      },
      {
        id: "m4",
        title: "GitHub Actions Zero-Downtime Deployment",
        description: "Automate build, docker push to Docker Hub / GHCR, and remote rolling update over SSH.",
        hint: "Use `docker compose up -d --no-deps --build <service_name>` for zero-downtime updates.",
      },
    ],
    starterCode: `# docker-compose.yml
version: "3.8"

networks:
  public-network:
  internal-network:
    internal: true

services:
  traefik:
    image: traefik:v3.0
    command:
      - "--api.insecure=true"
      - "--providers.docker=true"
      - "--entrypoints.web.address=:80"
    ports:
      - "80:80"
      - "8080:8080" # Traefik dashboard
    volumes:
      - "/var/run/docker.sock:/var/run/docker.sock:ro"
    networks:
      - public-network

  auth-service:
    build: ./services/auth-service
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.auth.rule=PathPrefix(\`/api/auth\`)"
    networks:
      - public-network
      - internal-network`,
    portfolioSummary:
      "Architected a production microservices platform featuring Traefik dynamic routing, automated TLS, Prometheus/Grafana observability, and GitHub Actions CI/CD.",
    aiGuide: {
      overview: "Use AI to automate DevOps configurations, debug Docker networking, and write resilient CI/CD pipelines.",
      prompts: [
        {
          phase: "Phase 1: Production GitHub Actions Workflow",
          tool: "Google Antigravity",
          title: "Generate GitHub Actions CI/CD Matrix Pipeline",
          description: "Automated linting, Docker build, vulnerability scanning with Trivy, and deployment.",
          prompt: `Write a complete '.github/workflows/deploy.yml' that:
1. Runs on push to 'main' branch.
2. Checks out code and logs into GitHub Container Registry (ghcr.io).
3. Builds multi-platform Docker images (linux/amd64, linux/arm64) using Buildx.
4. Scans container image using Trivy for HIGH/CRITICAL vulnerabilities.
5. Deploys to Linux VPS via SSH using Appleboy SSH action with zero-downtime rolling restart.`,
          expectedOutput: "A hardened, production-grade GitHub Actions workflow.",
        },
      ],
      tips: [
        "In Google Antigravity, test your Docker Compose syntax using `docker compose config` before deploying.",
      ],
    },
    gitWorkflow: {
      overview: "GitOps and trunk-based deployment flow.",
      steps: [
        {
          step: 1,
          title: "Initialize DevOps Repo & Secrets Guide",
          command: `git init
git add .
git commit -m "chore: scaffold cloud infrastructure compose and monitoring configs"`,
          explanation: "Baseline repo structure.",
        },
        {
          step: 2,
          title: "Add GitHub Actions Workflow",
          command: `git checkout -b feat/cicd
git add .github/workflows/
git commit -m "ci: add automated testing and CD deployment workflow"
git checkout main
git merge feat/cicd
git remote add origin https://github.com/YOUR_USERNAME/cloud-microservices-platform.git
git push -u origin main`,
          explanation: "Triggers first automated CI run on GitHub.",
        },
      ],
    },
    deploymentGuides: [
      {
        platform: "Linux VPS & Nginx",
        icon: "🐧",
        badge: "Live Linux VPS Cluster",
        prerequisites: ["Ubuntu 24.04 Server", "Docker & Docker Compose plugin", "Public Domain Name"],
        steps: [
          {
            title: "Provision Docker on Ubuntu VPS",
            command: "curl -fsSL https://get.docker.com | sh && sudo usermod -aG docker $USER",
            description: "Installs official Docker engine and sets non-root permissions.",
          },
          {
            title: "Start Microservices Cluster",
            command: "docker compose up -d",
            description: "Spins up all microservices, API Gateway, Redis, and Prometheus in detached mode.",
          },
        ],
        verifyUrl: "http://your-server-ip:8080",
      },
    ],
  },
];
