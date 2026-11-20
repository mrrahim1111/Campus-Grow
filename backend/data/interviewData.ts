export type InterviewQuestion = {
  id: string;
  question: string;
  category: "Technical" | "DSA" | "System Design" | "Behavioral / HR";
  hint: string;
  sampleAnswer: string;
  keyPoints: string[];
};

export type InterviewSet = {
  id: string;
  title: string;
  emoji: string;
  company: string;
  role: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  questions: InterviewQuestion[];
};

export const interviewSets: InterviewSet[] = [
  // ===============================================================
  // SET 1: SDE FRESHER PLACEMENT (30 QUESTIONS)
  // ===============================================================
  {
    id: "sde-fresher",
    title: "SDE Fresher Placement Master Set",
    emoji: "💼",
    company: "TCS, Infosys, Wipro, Cognizant & Product Startups",
    role: "Associate Software Engineer / SDE-1",
    difficulty: "Medium",
    description: "Complete 30-question placement simulation spanning DSA, OOP, OS, DBMS, Networks, and HR rounds.",
    questions: [
      {
        id: "sde1",
        category: "Behavioral / HR",
        question: "Tell me about yourself, your technical background, and why you want to join our engineering team.",
        hint: "Mention your degree, primary stack (C/Python/JS), notable projects, and what drives you technically.",
        sampleAnswer:
          "I am a Computer Science graduate passionate about building robust, high-performance systems. Throughout my coursework and personal projects, I developed strong fundamentals in C, data structures, and web technologies. For instance, I built an in-memory caching engine that implements O(1) LRU eviction. I want to join your team because your engineering culture values clean code and operates at a scale where my problem-solving skills can create measurable real-world impact.",
        keyPoints: [
          "Concise academic summary",
          "Core programming languages and stack",
          "Specific highlight of a challenging project",
          "Clear alignment with company engineering values",
          "Enthusiasm for continuous technical growth",
        ],
      },
      {
        id: "sde2",
        category: "DSA",
        question: "Explain the difference between an Array and a Linked List. When is each preferred?",
        hint: "Contrast memory locality, random access time, and insertion/deletion dynamics.",
        sampleAnswer:
          "An array allocates contiguous memory, enabling O(1) random access via index arithmetic and maximizing CPU cache line hits. However, inserting or deleting in the middle takes O(n) due to element shifting. A linked list uses non-contiguous nodes linked by pointers, allowing O(1) insertion/deletion at a known node, but searching takes O(n) with pointer chasing cache misses. I prefer arrays for fixed or index-heavy access, and linked lists when frequent insertions and deletions occur without requiring random indexing.",
        keyPoints: [
          "Contiguous vs non-contiguous memory layout",
          "O(1) index access vs O(n) traversal",
          "Insertion/deletion complexities",
          "CPU cache locality advantages of arrays",
          "Real-world trade-off criteria",
        ],
      },
      {
        id: "sde3",
        category: "Technical",
        question: "What are the four core pillars of Object-Oriented Programming? Give a concise real-world code example for each.",
        hint: "Encapsulation, Abstraction, Inheritance, Polymorphism.",
        sampleAnswer:
          "1. Encapsulation: Bundling data and methods while restricting direct access (e.g., BankAccount private balance with deposit() method). 2. Abstraction: Hiding internal complexity behind simple interfaces (e.g., Car.start() hiding fuel injection logic). 3. Inheritance: Reusing and extending parent class behavior (e.g., ElectricVehicle extending Vehicle). 4. Polymorphism: Single interface exhibiting different behaviors at runtime (e.g., Shape.render() dynamically drawing Circle vs Rectangle).",
        keyPoints: [
          "Encapsulation with private/public access controls",
          "Abstraction via interfaces / abstract classes",
          "Inheritance for code reuse and subtyping",
          "Polymorphism (overloading and runtime overriding)",
          "Clear real-world analogies",
        ],
      },
      {
        id: "sde4",
        category: "Technical",
        question: "What is the difference between a Process and a Thread? How does context switching differ between them?",
        hint: "Discuss address space, overhead, communication (IPC vs shared memory), and kernel scheduler costs.",
        sampleAnswer:
          "A process is an isolated executing program with its own dedicated virtual address space, file descriptors, and memory page tables. A thread is a lightweight execution stream within a process, sharing the parent process's memory space and heap. Context switching between threads is significantly faster because the CPU does not need to flush the Translation Lookaside Buffer (TLB) or reload page tables, whereas process switching requires saving registers, changing page directories, and incurring TLB cache invalidation.",
        keyPoints: [
          "Independent virtual memory vs shared address space",
          "Thread creation overhead vs process creation",
          "TLB flushing and context switch cost difference",
          "IPC mechanisms vs shared memory race conditions",
          "Appropriate use cases for multi-processing vs multi-threading",
        ],
      },
      {
        id: "sde5",
        category: "Technical",
        question: "What are the ACID properties in database management systems, and why are they critical?",
        hint: "Atomicity, Consistency, Isolation, Durability.",
        sampleAnswer:
          "ACID guarantees reliable transaction processing: Atomicity ensures all operations in a transaction succeed or all roll back (all-or-nothing). Consistency ensures the database moves from one valid state to another, upholding all constraints. Isolation ensures concurrent transactions do not interfere with each other, preventing dirty or phantom reads. Durability guarantees that once a transaction commits, its changes survive system crashes and power failures via Write-Ahead Logging (WAL).",
        keyPoints: [
          "Atomicity and rollback mechanisms",
          "Consistency and constraint enforcement",
          "Isolation levels (Read Committed, Repeatable Read, Serializable)",
          "Durability via Write-Ahead Logs (WAL)",
          "Significance in financial and e-commerce systems",
        ],
      },
      {
        id: "sde6",
        category: "DSA",
        question: "How do you detect a cycle in a singly linked list? What is Floyd's Cycle-Finding Algorithm?",
        hint: "Use two pointers moving at different speeds (slow and fast).",
        sampleAnswer:
          "Floyd's Cycle-Finding Algorithm (Tortoise and Hare) uses two pointers: a slow pointer moving 1 node per step, and a fast pointer moving 2 nodes per step. If the linked list contains a cycle, the fast pointer will eventually loop back and meet the slow pointer inside the cycle in O(n) time and O(1) space. If the fast pointer reaches NULL, no cycle exists.",
        keyPoints: [
          "Two pointer technique (slow: 1x, fast: 2x)",
          "Proof of meeting inside the loop",
          "O(n) time complexity",
          "O(1) space complexity without hash set",
          "How to find the cycle start node by resetting slow to head",
        ],
      },
      {
        id: "sde7",
        category: "Technical",
        question: "Explain the TCP Three-Way Handshake and the Four-Way Handshake for termination.",
        hint: "SYN, SYN-ACK, ACK for connect; FIN, ACK, FIN, ACK for disconnect.",
        sampleAnswer:
          "To establish a connection: 1. Client sends SYN (synchronize seq=x). 2. Server replies with SYN-ACK (seq=y, ack=x+1). 3. Client responds with ACK (ack=y+1). Both sides now agree on sequence numbers. To terminate: 1. Client sends FIN. 2. Server sends ACK (half-closed). 3. When server finishes sending data, it sends its own FIN. 4. Client responds with ACK and enters TIME_WAIT to ensure final ACK delivery.",
        keyPoints: [
          "SYN, SYN-ACK, ACK handshake sequence",
          "Exchange of initial sequence numbers (ISN)",
          "FIN, ACK, FIN, ACK termination steps",
          "Half-close socket state",
          "Role of TIME_WAIT state in preventing old packet confusion",
        ],
      },
      {
        id: "sde8",
        category: "Technical",
        question: "What is a Memory Leak? How do you prevent and detect memory leaks in C and modern languages?",
        hint: "malloc without free, reference cycles, Valgrind, smart pointers.",
        sampleAnswer:
          "A memory leak occurs when dynamically allocated heap memory is no longer referenced by the program but is never released back to the operating system. Over time, it increases memory consumption and eventually causes Out-Of-Memory (OOM) crashes. In C, it is prevented by ensuring every malloc() has a corresponding free() on all code branches. We detect them using tools like Valgrind and AddressSanitizer (-fsanitize=address). In garbage-collected languages, leaks occur via stale global references, unclosed streams, or uncleared event listeners.",
        keyPoints: [
          "Heap allocation without deallocation",
          "Impact: OOM kills and degraded performance",
          "Detection tools: Valgrind, ASan, memory profilers",
          "RAII and smart pointers (unique_ptr, shared_ptr) in C++",
          "Stale event listeners in garbage collected languages",
        ],
      },
      {
        id: "sde9",
        category: "DSA",
        question: "Explain the difference between Breadth-First Search (BFS) and Depth-First Search (DFS). When would you choose one over the other?",
        hint: "Queue vs Stack, shortest path in unweighted graphs vs pathfinding/topological sort.",
        sampleAnswer:
          "BFS traverses level-by-level using a FIFO queue, guaranteeing the shortest path in unweighted graphs. Its space complexity is O(w) where w is the maximum graph width. DFS explores as deeply as possible along each branch before backtracking using a LIFO stack or recursion, using O(h) space where h is the tree height. I choose BFS for shortest path and nearest neighbor problems, and DFS for topological sorting, cycle detection, and maze solving.",
        keyPoints: [
          "BFS queue vs DFS stack/recursion",
          "BFS guarantees shortest path in unweighted graphs",
          "Memory space differences: width vs depth",
          "DFS applications (topological sort, strongly connected components)",
          "Time complexity: O(V + E) for both",
        ],
      },
      {
        id: "sde10",
        category: "Technical",
        question: "What is a Primary Key, Foreign Key, and Unique Key in SQL? How do they differ?",
        hint: "Uniqueness, NULL values allowance, relational integrity.",
        sampleAnswer:
          "A Primary Key uniquely identifies each row in a table and cannot contain NULL values; a table can have only one primary key. A Unique Key also enforces uniqueness across rows but can accept NULL values (one or more depending on SQL dialect), and multiple unique keys can exist per table. A Foreign Key is a field referencing the primary key of another table, enforcing referential integrity between related entities.",
        keyPoints: [
          "Primary Key: strictly unique, non-null, 1 per table",
          "Unique Key: unique, allows NULL, multiple per table",
          "Foreign Key: maintains relational integrity across tables",
          "Cascade options: ON DELETE CASCADE / RESTRICT",
          "Automatic indexing implications",
        ],
      },
      {
        id: "sde11",
        category: "Behavioral / HR",
        question: "Describe a project where you encountered a severe bug or obstacle. How did you troubleshoot and resolve it?",
        hint: "Use the STAR method: Situation, Task, Action, Result. Show systematic debugging.",
        sampleAnswer:
          "While developing a student record manager, the application suffered intermittent segmentation faults upon saving records. Task: I needed to diagnose why the binary file write failed unpredictably. Action: Instead of random guessing, I compiled with GCC's '-g' flag and attached GDB, inspecting backtraces. I discovered that a string copy function was overflowing its buffer by 1 byte because it neglected the null-terminator. I replaced 'strcpy' with 'snprintf' and added buffer boundary checks. Result: Zero segfaults across 10,000 stress test iterations.",
        keyPoints: [
          "Clear explanation of the problem context",
          "Systematic debugging tools used (GDB, logs, Valgrind)",
          "Root cause analysis instead of quick patches",
          "Preventative architectural improvement implemented",
          "Quantifiable outcome and lesson learned",
        ],
      },
      {
        id: "sde12",
        category: "Technical",
        question: "What is the difference between Synchronous and Asynchronous programming? How does the Event Loop work in Node.js / JavaScript?",
        hint: "Blocking vs non-blocking I/O, Call Stack, Callback Queue, Microtask Queue.",
        sampleAnswer:
          "Synchronous code executes sequentially, blocking subsequent execution until the current task completes. Asynchronous code offloads long-running I/O tasks (network, disk) to the system kernel or thread pool and continues executing. The Node.js Event Loop continually checks if the Call Stack is empty; once clear, it dequeues pending callbacks from the Microtask Queue (Promises) first, followed by the Macrotask Queue (setTimeout, I/O), achieving high concurrency on a single main thread.",
        keyPoints: [
          "Blocking vs non-blocking execution",
          "Call stack and heap mechanics",
          "Microtasks (Promises) vs Macrotasks (timers, I/O)",
          "Single-threaded concurrency model advantages",
          "Avoiding CPU-intensive blocking on the main thread",
        ],
      },
      {
        id: "sde13",
        category: "DSA",
        question: "Explain the Two-Pointer and Sliding Window techniques with a concrete algorithm problem.",
        hint: "Two pointers from ends vs dynamic subarray window.",
        sampleAnswer:
          "The Two-Pointer technique uses two indices traversing a data structure (e.g., one from start, one from end to check palindromes or find a two-sum in a sorted array) reducing O(n²) checks to O(n). The Sliding Window maintains a contiguous subsegment [left, right] that expands rightward to satisfy a condition and contracts from leftward when violated (e.g., finding the longest substring without repeating characters in O(n) time).",
        keyPoints: [
          "Two pointers moving toward each other on sorted arrays",
          "Sliding window for contiguous subarrays / substrings",
          "O(n) time reduction from O(n²)",
          "Managing window state with hash maps or frequency arrays",
          "Edge case management (empty strings, single elements)",
        ],
      },
      {
        id: "sde14",
        category: "Technical",
        question: "What is DNS (Domain Name System)? Trace what happens step-by-step when you type 'google.com' into your browser.",
        hint: "Browser cache -> OS cache -> Resolver -> Root server -> TLD server -> Authoritative server -> TCP -> TLS -> HTTP.",
        sampleAnswer:
          "1. Browser checks local cache, then OS cache, then router/hosts file. 2. If missed, queries Recursive DNS Resolver (ISP or 8.8.8.8). 3. Resolver queries Root Nameserver ('.'), which points to '.com' TLD nameserver. 4. TLD nameserver points to Google's Authoritative Nameserver. 5. Authoritative server returns Google's IP address. 6. Browser establishes TCP 3-way handshake with IP on port 443. 7. TLS 1.3 cryptographic handshake occurs. 8. Browser issues HTTP GET request and renders returned HTML.",
        keyPoints: [
          "Recursive DNS resolver workflow",
          "Root, TLD (Top-Level Domain), and Authoritative nameservers",
          "DNS caching (TTL)",
          "TCP handshake and TLS negotiation",
          "HTTP request-response lifecycle",
        ],
      },
      {
        id: "sde15",
        category: "Behavioral / HR",
        question: "Where do you see yourself in 3 to 5 years? How does this role fit into your long-term career aspirations?",
        hint: "Demonstrate ambition for technical depth, ownership, and team mentorship.",
        sampleAnswer:
          "In 3 to 5 years, I envision myself as a seasoned engineer with deep mastery in scalable distributed backend systems and cloud architecture. I want to have contributed to core mission-critical features, taken technical ownership of complex modules, and mentored newer junior engineers. This role is the ideal launchpad because your team works on high-throughput challenges that require engineering rigor, allowing me to build high-standard code while creating substantial business value.",
        keyPoints: [
          "Realistic, growth-oriented trajectory",
          "Commitment to technical depth and system design",
          "Desire for architectural ownership",
          "Interest in mentoring and peer collaboration",
          "Alignment with company tech stack and domain",
        ],
      },
      {
        id: "sde16",
        category: "Technical",
        question: "What is the difference between HTTP and HTTPS? Explain symmetric vs asymmetric encryption in TLS.",
        hint: "Port 80 vs 443, SSL/TLS certificates, public/private keys vs session keys.",
        sampleAnswer:
          "HTTP transmits plain text over port 80, vulnerable to eavesdropping and man-in-the-middle attacks. HTTPS encrypts traffic over port 443 using TLS. TLS leverages asymmetric encryption (public/private key pair) during the initial handshake to authenticate server identity and securely exchange a shared secret key. Once established, it switches to symmetric encryption (AES-GCM) with that session key because symmetric encryption is thousands of times faster for high-volume data transmission.",
        keyPoints: [
          "Port 80 (plaintext) vs port 443 (encrypted)",
          "Asymmetric encryption for identity verification & key exchange",
          "Symmetric encryption for session payload performance",
          "Certificate Authorities (CAs) and trust chains",
          "Data integrity, confidentiality, and authenticity guarantees",
        ],
      },
      {
        id: "sde17",
        category: "DSA",
        question: "What is Dynamic Programming? What is the difference between Memoization (Top-Down) and Tabulation (Bottom-Up)?",
        hint: "Overlapping subproblems + optimal substructure, recursion + cache vs iterative array table.",
        sampleAnswer:
          "Dynamic Programming (DP) optimizes recursive problems featuring overlapping subproblems and optimal substructure by storing previously computed subproblem solutions. Memoization is Top-Down: it writes standard recursive code but checks a cache (hash map/array) before calculating. Tabulation is Bottom-Up: it solves the smallest base cases first and iteratively populates a DP table up to the target, eliminating recursion call stack overhead.",
        keyPoints: [
          "Overlapping subproblems definition",
          "Optimal substructure property",
          "Top-Down memoization with call stack overhead",
          "Bottom-Up tabulation iterative efficiency",
          "Space optimization (e.g., O(n) to O(1) in Fibonacci)",
        ],
      },
      {
        id: "sde18",
        category: "Technical",
        question: "What is the difference between SQL and NoSQL databases? When should you choose one over the other?",
        hint: "Relational vs document/key-value, schema rigidity, horizontal vs vertical scaling, ACID vs BASE.",
        sampleAnswer:
          "SQL databases (PostgreSQL, MySQL) are relational, enforce strict predefined schemas, uphold ACID transactions, and typically scale vertically. NoSQL databases (MongoDB, Cassandra, Redis) are non-relational, support flexible or dynamic schemas (JSON documents, wide-column, key-value), and scale horizontally across distributed clusters. Choose SQL for complex joins, financial records, and rigid data relationships. Choose NoSQL for rapid unstructured schemas, high-velocity writes, and distributed multi-region scale.",
        keyPoints: [
          "Structured relational schemas vs dynamic document models",
          "ACID compliance vs eventual consistency (BASE)",
          "Vertical scaling (scale up) vs horizontal sharding (scale out)",
          "Relational JOIN query performance",
          "Concrete project decision criteria",
        ],
      },
      {
        id: "sde19",
        category: "System Design",
        question: "How would you design a URL Shortener like Bitly? Outline the high-level architecture.",
        hint: "API endpoints, base62 encoding vs hashing, database schema, caching with Redis, redirection.",
        sampleAnswer:
          "1. API: POST /api/shorten { longUrl } -> shortUrl, and GET /{shortCode} -> 301/302 Redirect. 2. Shortening Engine: Generate a unique auto-incrementing 64-bit ID and convert it to Base62 (a-z, A-Z, 0-9), yielding 62^7 (~3.5 trillion) distinct 7-character URLs. 3. Storage: Relational DB with columns: id, short_code (indexed), original_url, created_at. 4. Performance: Cache the top 20% most active URLs in Redis with LRU eviction to serve lookups with sub-5ms latency without hitting the primary database.",
        keyPoints: [
          "RESTful API design and status codes (301 vs 302 redirect)",
          "Base62 encoding of unique sequential IDs",
          "Collision avoidance strategies",
          "Redis caching for high read-to-write ratio (100:1)",
          "Database indexing on short_code",
        ],
      },
      {
        id: "sde20",
        category: "Behavioral / HR",
        question: "How do you handle disagreement with a senior engineer or teammate regarding code architecture?",
        hint: "Focus on data, benchmarks, requirements, and respectful communication.",
        sampleAnswer:
          "I approach technical disagreements with curiosity and objective data rather than personal pride. I start by actively listening to their perspective to understand the constraints they are optimizing for (e.g., maintainability, backwards compatibility, delivery speed). I then articulate my viewpoint using objective metrics—such as latency benchmarks, testability, or memory overhead. If consensus isn't reached immediately, I propose a small prototype or spike. Once a final team decision is made, I fully commit to executing it.",
        keyPoints: [
          "Active listening and assuming positive intent",
          "Relying on benchmarks, data, and business constraints",
          "Proposing quick spikes/proof-of-concepts to test hypotheses",
          "Professional disagree-and-commit attitude",
          "Valuing collective team success over individual ego",
        ],
      },
      {
        id: "sde21",
        category: "Technical",
        question: "Explain what happens during a CPU Context Switch. Why is excessive context switching problematic?",
        hint: "Saving registers, program counter, switching page directory, cold CPU cache.",
        sampleAnswer:
          "A CPU Context Switch occurs when the OS scheduler pauses a running process or thread to execute another. The kernel saves the current state (registers, Program Counter, stack pointer) into the Process Control Block (PCB). For processes, it switches virtual memory page tables. It then restores the state of the incoming process. Excessive context switching degrades system throughput because the CPU spends compute cycles executing kernel scheduler bookkeeping instead of user instructions, while causing CPU L1/L2 cache and TLB invalidations.",
        keyPoints: [
          "Process Control Block (PCB) state saving and restoration",
          "Program counter, CPU registers, stack pointers",
          "Virtual memory page table switching cost",
          "CPU cache line and TLB cache invalidation",
          "Symptoms: High CPU usage with low application throughput",
        ],
      },
      {
        id: "sde22",
        category: "DSA",
        question: "How does Binary Search work? What is its time complexity and what are the essential prerequisites?",
        hint: "Sorted order, divide and conquer, mid calculation preventing overflow.",
        sampleAnswer:
          "Binary Search operates on sorted arrays in O(log n) time. It compares the target with the middle element: if equal, it returns index; if target is smaller, it narrows the search interval to the left half; if larger, to the right half. The essential prerequisite is monotonic sorted ordering with O(1) random index access. When computing mid, we use 'left + (right - left) / 2' instead of '(left + right) / 2' to prevent integer arithmetic overflow.",
        keyPoints: [
          "Requirement for sorted contiguous collection",
          "O(log n) time complexity, O(1) space",
          "Preventing integer overflow: left + (right - left) / 2",
          "Binary search on answer space (lower/upper bound)",
          "Comparison with O(n) linear search",
        ],
      },
      {
        id: "sde23",
        category: "Technical",
        question: "What is Cross-Origin Resource Sharing (CORS)? Why do browsers enforce it, and how is it properly configured?",
        hint: "Same-Origin Policy, preflight OPTIONS request, Access-Control-Allow-Origin header.",
        sampleAnswer:
          "CORS is a browser security mechanism that relaxes the strict Same-Origin Policy (SOP), preventing malicious scripts on one origin from accessing sensitive resources on another without authorization. When a cross-origin request is made (different protocol, domain, or port), the browser sends an HTTP OPTIONS preflight request. The server must respond with appropriate headers, such as 'Access-Control-Allow-Origin: https://myapp.com' and 'Access-Control-Allow-Methods: GET, POST'. If missing or mismatched, the browser blocks response reading.",
        keyPoints: [
          "Same-Origin Policy (protocol + domain + port match)",
          "Preflight HTTP OPTIONS request",
          "Access-Control-Allow-Origin header configuration",
          "Handling credentials (cookies, authorization headers)",
          "Why CORS is a browser-enforced security control, not server-side protection",
        ],
      },
      {
        id: "sde24",
        category: "Technical",
        question: "What is the difference between Git Merge and Git Rebase? When should you use each?",
        hint: "Preserving history commit graph vs linear history, golden rule of rebase.",
        sampleAnswer:
          "Git Merge takes the changes from one branch and integrates them into another via a dedicated merge commit, preserving the exact chronological commit graph and branch history. Git Rebase moves or reapplies the entire feature branch commits onto the tip of the target branch, producing a clean, linear commit history without merge commits. I use rebase on local, unpushed feature branches to maintain a tidy history, but I never rebase public shared branches like 'main'.",
        keyPoints: [
          "Merge commit creation vs replaying commits",
          "Linear history with rebase vs chronological accuracy with merge",
          "Golden rule: Never rebase shared public branches",
          "Interactive rebase (squash, fixup) for PR hygiene",
          "Conflict resolution workflow differences",
        ],
      },
      {
        id: "sde25",
        category: "Behavioral / HR",
        question: "Tell me about a time you had to learn a completely unfamiliar technology or framework under a tight deadline.",
        hint: "Explain your learning methodology: documentation, toy prototypes, asking mentors.",
        sampleAnswer:
          "During a 36-hour hackathon, our project required implementing real-time WebSockets, which I had never used before. Rather than getting overwhelmed, I spent 45 minutes studying the official library documentation and built a minimal 20-line echo server to understand the event lifecycle (connection, message, disconnect). Once the fundamentals were clear, I integrated the socket layer into our main app, debugging edge cases via console telemetry. We shipped our real-time collaborative tool on schedule and won the runner-up prize.",
        keyPoints: [
          "Structured learning strategy under time pressure",
          "Reading official documentation over superficial video tutorials",
          "Building minimal reproducible prototypes",
          "Effective debugging and incremental integration",
          "Positive delivery outcome and ongoing knowledge retention",
        ],
      },
      {
        id: "sde26",
        category: "System Design",
        question: "What is a Content Delivery Network (CDN)? How does it improve website performance and availability?",
        hint: "Edge servers, caching static assets, reducing latency, DDoS mitigation.",
        sampleAnswer:
          "A Content Delivery Network (CDN) is a globally distributed network of edge proxy servers (Points of Presence - PoPs) that cache static and dynamic web assets (HTML, images, JS, CSS, videos) close to users geographically. When a user requests an asset, Anycast DNS routes them to the nearest edge server. This drastically reduces round-trip latency (RTT), unloads traffic from origin application servers, and provides DDoS mitigation through distributed edge absorption.",
        keyPoints: [
          "Geographic proximity via edge servers (PoPs)",
          "Caching static assets and media files",
          "Anycast routing for lowest latency",
          "Origin server offloading and traffic shielding",
          "DDoS mitigation and high availability guarantees",
        ],
      },
      {
        id: "sde27",
        category: "Technical",
        question: "What is SQL Injection (SQLi)? Provide an example of vulnerable code and explain how to prevent it completely.",
        hint: "String concatenation in queries vs parameterized queries / prepared statements.",
        sampleAnswer:
          "SQL Injection occurs when untrusted user input is directly concatenated into a dynamic SQL query, allowing an attacker to manipulate query logic (e.g., inputting \"admin' OR '1'='1\"). To prevent it completely, developers must use Parameterized Queries (Prepared Statements). In prepared statements, the database engine compiles the SQL query structure first, and treats user parameters strictly as literal values rather than executable code.",
        keyPoints: [
          "Direct string concatenation vulnerability",
          "Classic injection payload example (' OR '1'='1)",
          "Parameterized queries / Prepared Statements",
          "Object Relational Mappers (ORMs) safe usage",
          "Input validation and principle of least database privilege",
        ],
      },
      {
        id: "sde28",
        category: "DSA",
        question: "What is a Hash Collision? Explain the two primary collision resolution strategies: Chaining and Open Addressing.",
        hint: "Pigeonhole principle, separate chaining with linked lists vs linear/quadratic probing.",
        sampleAnswer:
          "A hash collision occurs when two distinct keys produce the identical hash bucket index. 1. Separate Chaining: Each bucket holds a linked list or self-balancing tree (used in Java 8 HashMap); colliding keys are appended to the bucket's list. 2. Open Addressing: All elements reside directly in the table; upon collision, the algorithm probes alternative slots using Linear Probing (index + i), Quadratic Probing, or Double Hashing until an empty bucket is found.",
        keyPoints: [
          "Why collisions are inevitable (Pigeonhole principle)",
          "Separate chaining mechanics and degradation to O(n) or O(log n)",
          "Open addressing and clustering issues (primary/secondary clustering)",
          "Load factor threshold and rehashing trigger",
          "Time complexity: O(1) average, O(n) worst case",
        ],
      },
      {
        id: "sde29",
        category: "Behavioral / HR",
        question: "What motivates you as an engineer? What do you do when you feel burned out or stuck on a coding roadblock?",
        hint: "Intrinsic passion for problem solving, modular breakdown, stepping away, asking for help.",
        sampleAnswer:
          "What motivates me most is the creative agency of software engineering: transforming an abstract concept into a reliable tool that solves someone's real problem. When I hit a stubborn roadblock or feel stuck, I follow a disciplined rule: I step away for a short walk to reset cognitive fatigue, explain the bug out loud (Rubber Duck debugging), and review assumptions. If I remain blocked after 45 minutes, I formulate a clear question with my current findings and ask a teammate.",
        keyPoints: [
          "Genuine passion for engineering and product craft",
          "Self-awareness and recognizing mental fatigue",
          "Rubber Duck debugging technique",
          "Time-boxing before seeking mentorship",
          "Maintaining long-term sustainable productivity",
        ],
      },
      {
        id: "sde30",
        category: "Technical",
        question: "Do you have any questions for us? What makes a candidate stand out during the final minutes of an interview?",
        hint: "Ask thoughtful questions about engineering culture, deployment frequency, tech debt, and team mentorship.",
        sampleAnswer:
          "Yes, thank you! I would love to ask two questions: 1. How does your engineering team manage the balance between shipping new features rapidly and addressing technical debt or refactoring? 2. What does a successful first 90 days look like for an engineer joining your team, and what is your deployment frequency to production?",
        keyPoints: [
          "Always asking informed, insightful questions",
          "Inquiring about engineering practices and deployment culture",
          "Demonstrating eagerness to integrate and succeed in the first 90 days",
          "Avoiding premature questions about perks or vacation",
          "Ending with a confident, courteous closing tone",
        ],
      },
    ],
  },

  // ===============================================================
  // SET 2: FAANG & TIER-1 PRODUCT ENGINEERING (30 QUESTIONS)
  // ===============================================================
  {
    id: "faang-tier1",
    title: "FAANG & Tier-1 Product Engineering",
    emoji: "🚀",
    company: "Google, Amazon, Microsoft, Meta & Atlassian",
    role: "Software Development Engineer II",
    difficulty: "Hard",
    description: "30 deep-dive questions covering high-scale system design, concurrency, distributed consensus, and leadership principles.",
    questions: [
      {
        id: "faang1",
        category: "System Design",
        question: "Design a distributed Rate Limiter capable of handling 500,000 requests per second across multiple regions.",
        hint: "Token Bucket / Sliding Window Counter, Redis with Lua scripts, local edge caching.",
        sampleAnswer:
          "I would implement a hybrid architecture: 1. Algorithm: Sliding Window Counter or Token Bucket for smooth traffic shaping without burst spikes. 2. Centralized Store: Redis cluster with Lua scripts to atomically check and increment counters in a single round-trip. 3. Global Scale: To avoid cross-region latency, place local Token Buckets at edge reverse proxies (Cloudflare/Envoy) that batch increments asynchronously back to Redis, falling back to local quotas if the central cluster fails.",
        keyPoints: [
          "Token Bucket vs Sliding Window Counter trade-offs",
          "Atomic execution via Redis Lua scripts",
          "Multi-region latency mitigation with local edge caches",
          "Failure mode: Fail-open vs Fail-closed policies",
          "HTTP 429 Too Many Requests with Retry-After header",
        ],
      },
      {
        id: "faang2",
        category: "Technical",
        question: "Explain the CAP Theorem and PACELC Theorem with real-world database examples.",
        hint: "Consistency, Availability, Partition tolerance; if Partition, Availability or Consistency; Else, Latency or Consistency.",
        sampleAnswer:
          "CAP states that in a distributed network partition (P), a system must choose between Consistency (C) (blocking/errors to prevent stale data) or Availability (A) (returning potentially stale data). PACELC extends this: If there is a Partition (P), choose Availability (A) or Consistency (C); Else (E), choose Latency (L) or Consistency (C). For example, Spanner is CP/PC (prioritizes consistency), Cassandra is AP/PA (prioritizes availability and low latency), and MongoDB is CP/PC.",
        keyPoints: [
          "Proof that network partitions are unavoidable in distributed systems",
          "CP vs AP real-world database classifications",
          "PACELC formulation covering normal-state trade-offs (Latency vs Consistency)",
          "Eventual consistency and quorum configurations (R + W > N)",
          "Vector clocks and conflict resolution",
        ],
      },
      {
        id: "faang3",
        category: "Behavioral / HR",
        question: "Amazon Leadership Principle: Tell me about a time you had to make a high-stakes technical decision with incomplete data (Bias for Action).",
        hint: "One-way vs two-way doors, calculating risk, monitoring telemetry.",
        sampleAnswer:
          "During a Black Friday spike, our payment webhook began timing out intermittently due to connection pool exhaustion. We lacked complete logs from the third-party gateway. Recognizing this was a reversible 'two-way door' decision, I exercised Bias for Action: I immediately decoupled the webhook processing by introducing an in-memory queue that returned HTTP 200 to the payment provider instantly and processed transactions with exponential backoff. Latency plummeted from 8 seconds to 12ms, and 0 transactions were lost.",
        keyPoints: [
          "Two-way door (reversible) vs one-way door (irreversible) distinction",
          "Bias for Action under ambiguity and high pressure",
          "Mitigating risk with architectural decoupling",
          "Real-time metrics and validation",
          "Quantified business outcome",
        ],
      },
      {
        id: "faang4",
        category: "DSA",
        question: "How do you find the Median of Two Sorted Arrays of different sizes in O(log(min(m, n))) time?",
        hint: "Binary search on partition cut in the smaller array.",
        sampleAnswer:
          "We perform binary search on the partition cut of the smaller array. Let partitions be left1, right1 and left2, right2. We search for a cut where max(left1, left2) <= min(right1, right2) such that the total elements on the left equals the total elements on the right. If left1 > right2, we shift search left; if left2 > right1, we shift right. Once partitioned, the median is calculated in O(1) from the border elements, achieving O(log(min(m, n))) time.",
        keyPoints: [
          "Binary search on the smaller array partition index",
          "Partition boundary verification: maxLeft <= minRight",
          "O(log(min(m, n))) time complexity proof",
          "O(1) space complexity",
          "Handling odd vs even total element parity",
        ],
      },
      {
        id: "faang5",
        category: "System Design",
        question: "Design a globally scalable Notification System (Push, SMS, Email) handling 100M notifications daily with deduplication.",
        hint: "Message queues (Kafka/RabbitMQ), Idempotency Keys, Priority Queues, Vendor Rate Limiting.",
        sampleAnswer:
          "1. API Gateway validates requests and assigns an Idempotency Key (UUID). 2. Cache / DB checks if key was processed in the last 24h to eliminate duplicates. 3. Notifications are pushed to Apache Kafka partitioned by user ID to guarantee ordering. 4. Worker pools consume messages based on priority (OTP/Auth = High Priority queue; Marketing = Low Priority queue). 5. Workers invoke external vendors (Twilio, SendGrid, FCM) with circuit breakers and token-bucket rate limiters.",
        keyPoints: [
          "Idempotency keys to guarantee at-most-once delivery",
          "Message queue partitioning for high throughput and ordering",
          "Priority tiering (Transactional OTP vs Bulk Marketing)",
          "Vendor rate limiting and circuit breakers (Resilience4j)",
          "Dead-letter queues (DLQ) for failed delivery retries",
        ],
      },
      {
        id: "faang6",
        category: "Technical",
        question: "Explain the internal architecture of the Raft Distributed Consensus algorithm. How does it handle leader election and log replication?",
        hint: "Leader, Follower, Candidate states, heartbeats, randomized election timeouts, log quorum matching.",
        sampleAnswer:
          "Raft decomposes consensus into three subproblems: 1. Leader Election: If followers miss heartbeats within randomized election timeouts (150-300ms), they transition to Candidate, increment term, and request votes. The first to achieve a majority quorum becomes Leader. 2. Log Replication: The Leader appends client commands to its log and sends AppendEntries RPCs to followers. Once a majority logs the entry, the leader commits it and applies it to its state machine. 3. Safety: A candidate cannot win an election unless its log is at least as up-to-date as any voter's log.",
        keyPoints: [
          "Three states: Follower, Candidate, Leader",
          "Randomized election timeouts preventing split votes",
          "Majority quorum requirement (N/2 + 1)",
          "Log replication and commit index progression",
          "Leader Completeness property ensuring safety",
        ],
      },
      {
        id: "faang7",
        category: "DSA",
        question: "Explain how to implement an LRU Cache with O(1) get and O(1) put operations.",
        hint: "Hash Table combined with a Doubly Linked List.",
        sampleAnswer:
          "We combine a Hash Table with a Doubly Linked List. The hash table maps keys to Doubly Linked List nodes, enabling O(1) lookup. The doubly linked list maintains the usage order: the most recently accessed node is kept at the head, and the least recently accessed at the tail. On 'get(key)': look up node in hash table, detach it from its current position in O(1), and prepend it to the head. On 'put(key, val)': if key exists, update and move to head; if new and capacity is reached, remove tail node from both list and map in O(1), then insert the new node at the head.",
        keyPoints: [
          "Hash Table provides O(1) pointer lookup",
          "Doubly Linked List enables O(1) node detachment and insertion",
          "Dummy head and dummy tail pointers to avoid null checks",
          "O(1) eviction of tail node when capacity is exceeded",
          "Thread safety considerations with read-write locks",
        ],
      },
      {
        id: "faang8",
        category: "System Design",
        question: "How would you design a distributed unique ID generator (like Twitter Snowflake) that generates 64-bit sortable IDs?",
        hint: "Timestamp bits, machine ID bits, sequence counter bits.",
        sampleAnswer:
          "Twitter Snowflake generates 64-bit integers structured as: 1. 1 unused sign bit. 2. 41 timestamp bits (milliseconds since custom epoch, lasting ~69 years). 3. 10 machine/datacenter ID bits (supporting 1,024 independent server nodes). 4. 12 sequence counter bits (allowing 4,096 IDs per millisecond per server). This design generates strictly k-sortable IDs chronologically without requiring centralized network coordination or database round-trips.",
        keyPoints: [
          "Bit allocation: 1 sign + 41 timestamp + 10 worker ID + 12 sequence",
          "Generation capacity: 4.096M IDs per second per machine",
          "K-sortable chronological ordering",
          "Zero inter-service network communication",
          "Handling clock drift and NTP backwards time synchronization",
        ],
      },
      {
        id: "faang9",
        category: "Technical",
        question: "What is the difference between Optimistic Concurrency Control (OCC) and Pessimistic Concurrency Control (PCC)?",
        hint: "Version columns / CAS vs database row locks (SELECT FOR UPDATE).",
        sampleAnswer:
          "Pessimistic Concurrency Control assumes conflicts are frequent and locks the target resource upfront using database row locks (e.g., 'SELECT ... FOR UPDATE'), blocking concurrent transactions until committed. Optimistic Concurrency Control assumes conflicts are rare; it reads data without locking and records a version number. Upon committing, it checks if the version has changed (e.g., 'UPDATE table SET val=x, ver=ver+1 WHERE id=1 AND ver=current_ver'). If a conflict is detected, the transaction aborts and retries.",
        keyPoints: [
          "Locking upfront (PCC) vs validating at commit (OCC)",
          "OCC versioning / timestamp checking mechanism",
          "Performance trade-offs under high vs low contention",
          "Risk of deadlocks in PCC",
          "Retry storms mitigation in OCC with exponential backoff",
        ],
      },
      {
        id: "faang10",
        category: "Behavioral / HR",
        question: "Google 'Googliness': Tell me about a time you made a mistake that negatively impacted users. How did you take ownership and prevent recurrence?",
        hint: "Blameless post-mortem, root cause analysis, automated guardrails.",
        sampleAnswer:
          "Early in my career, I deployed an untested database migration during peak traffic that locked a central user table, causing 12 minutes of service degradation. I immediately initiated a rollback script and notified our incident response channel. Afterward, I authored a blameless post-mortem identifying the root cause: lack of automated migration testing against production-sized datasets. I introduced automated migration linting in CI to block non-concurrent index additions and created a staging load-test environment, permanently eliminating that failure mode.",
        keyPoints: [
          "Complete personal ownership without shifting blame",
          "Swift incident response and transparent communication",
          "Authoring a thorough blameless post-mortem",
          "Implementing systemic automated CI guardrails",
          "Demonstrating humility and learning resilience",
        ],
      },
      {
        id: "faang11",
        category: "Technical",
        question: "What is B-Tree vs LSM Tree? Why do databases like Postgres use B-Trees while RocksDB/Cassandra use LSM Trees?",
        hint: "In-place updates with random disk I/O vs append-only writes with compaction.",
        sampleAnswer:
          "B-Trees perform in-place page updates with balanced multi-way trees, making them optimal for read-heavy workloads and range queries because data pages are sorted on disk, but random disk writes can cause write amplification. LSM (Log-Structured Merge) Trees append all writes sequentially to an in-memory MemTable and Write-Ahead Log (WAL), flushing immutable SSTables to disk in batches. This delivers massive write throughput for write-intensive applications at the cost of background compaction and slightly slower point reads.",
        keyPoints: [
          "B-Tree in-place page updates vs LSM append-only logs",
          "Random I/O vs sequential I/O write performance",
          "SSTables, MemTables, and background compaction in LSM",
          "Read amplification and Bloom Filters in LSM trees",
          "PostgreSQL/MySQL (B-Trees) vs Cassandra/RocksDB (LSM)",
        ],
      },
      {
        id: "faang12",
        category: "System Design",
        question: "How would you design a Web Crawler to index 1 billion pages per month?",
        hint: "URL Frontier, Politeness policy, Bloom filters for deduplication, Distributed fetchers, robots.txt.",
        sampleAnswer:
          "1. Architecture: Distributed URL Frontier queue managed by Kafka. 2. Deduplication: Bloom Filters in memory backed by Cassandra to determine whether a URL was already visited in O(1) time. 3. Politeness & Robots.txt: Group URLs by host hash to ensure a worker never floods a single domain, respecting robots.txt and enforcing backoff. 4. Content Parsing: Headless fetchers extract text, clean HTML, and feed an indexing pipeline (Elasticsearch). 5. Storage: Compressed S3 / GCS buckets storing raw HTML snapshots.",
        keyPoints: [
          "URL Frontier scheduling and politeness queues",
          "Bloom filter deduplication for billions of URLs",
          "Handling traps (infinite calendar loops, redirects)",
          "Robots.txt caching and compliance",
          "Distributed worker fault tolerance",
        ],
      },
      {
        id: "faang13",
        category: "DSA",
        question: "Explain Tarjan's or Kosaraju's Algorithm for finding Strongly Connected Components (SCC) in a Directed Graph.",
        hint: "DFS traversal, discovery time, low-link values, stack.",
        sampleAnswer:
          "Tarjan's Algorithm finds all SCCs in a directed graph in a single DFS pass (O(V + E)). It assigns each node a discovery time and a 'low-link' value representing the smallest discovery time reachable from that node. As DFS traverses, nodes are pushed onto a stack. When a node's low-link equals its discovery time, it signifies the root of an SCC; nodes are popped from the stack until that node is popped, forming one complete strongly connected component.",
        keyPoints: [
          "Definition of Strongly Connected Component (SCC)",
          "Discovery time and low-link value mechanics",
          "DFS stack management for component tracking",
          "Single pass O(V + E) time efficiency",
          "Applications in dependency resolution and circuit analysis",
        ],
      },
      {
        id: "faang14",
        category: "Technical",
        question: "Explain the Internal Working of Garbage Collection in the V8 JavaScript Engine (Scavenger & Mark-Sweep-Compact).",
        hint: "Generational hypothesis, Young Generation (Nursery/Intermediate), Semi-space copying, Old Generation.",
        sampleAnswer:
          "V8 relies on the Generational Hypothesis (most objects die young). Memory is split into Young and Old generations. The Young generation uses the Scavenger algorithm: it divides memory into two semi-spaces ('From' and 'To'). Active survivors are copied to 'To' space, and unreferenced objects are reclaimed in milliseconds. Objects surviving two scavenges are promoted to the Old generation. The Old generation is managed by a Major Mark-Sweep-Compact cycle using incremental marking and concurrent sweeping to prevent application pauses.",
        keyPoints: [
          "Generational hypothesis rationale",
          "Young generation semi-space Scavenger copying",
          "Object promotion to Old Generation",
          "Mark-Sweep-Compact algorithm",
          "Incremental and concurrent marking to prevent stop-the-world freezes",
        ],
      },
      {
        id: "faang15",
        category: "System Design",
        question: "Design an In-Memory Distributed Cache like Memcached or Redis Cluster. How do you handle sharding and node failures?",
        hint: "Consistent Hashing with virtual nodes, Gossip protocol, Master-replica failover.",
        sampleAnswer:
          "1. Partitioning: Use Consistent Hashing with virtual nodes (e.g. 256 virtual slots per node) mapped on a 360-degree hash ring. When a node joins or fails, only K/N keys need remapping rather than the entire dataset. 2. Node Discovery: Nodes use a Gossip Protocol to exchange cluster heartbeat state and detect failures. 3. Replication: Each primary master node has 1 or more read replicas; if a master is deemed dead by cluster consensus, a replica promotes itself automatically.",
        keyPoints: [
          "Consistent Hashing ring with virtual nodes",
          "Gossip protocol cluster state communication",
          "Automatic leader election and failover on master crash",
          "Write policies: Write-through vs Write-around vs Write-back",
          "Cache stampede mitigation using mutex locks",
        ],
      },
      {
        id: "faang16",
        category: "DSA",
        question: "How do you solve the Word Break II problem using Dynamic Programming and Trie/Backtracking?",
        hint: "Trie for prefix lookup, memoized DFS for sentence construction.",
        sampleAnswer:
          "We store dictionary words in a Trie for O(length) prefix matching. We write a recursive function 'dfs(index)' with memoization that constructs all valid sentences starting from 'index'. For each valid prefix matching in the Trie, we recursively solve for the remaining suffix. Storing subproblem solutions in a hash map memo prevents redundant recalculations of identical substrings, handling exponential branches efficiently.",
        keyPoints: [
          "Trie data structure for rapid prefix verification",
          "Backtracking with memoization (top-down DP)",
          "Avoiding redundant substring computations",
          "Handling sentence recombination with spaces",
          "Time and space complexity analysis",
        ],
      },
      {
        id: "faang17",
        category: "Technical",
        question: "What is Database Sharding? Explain Range-based, Hash-based, and Directory-based sharding with their trade-offs.",
        hint: "Hotspots in range-based, rebalancing costs in hash-based, lookup overhead in directory-based.",
        sampleAnswer:
          "Sharding splits a database horizontally across multiple physical servers. 1. Range-Based: Shards based on ranges of an attribute (e.g., A-F, G-M). Trade-off: Simple range queries, but creates severe write hotspots for sequential keys. 2. Hash-Based: Applies hash(shardKey) % N. Trade-off: Uniform distribution, but expensive to rebalance when adding shards and inefficient for range scans. 3. Directory-Based: Central lookup service maps keys to shard locations. Trade-off: Highly flexible, but the lookup table becomes a single point of failure and latency bottleneck.",
        keyPoints: [
          "Horizontal partitioning across independent machines",
          "Range-based vs Hash-based vs Directory-based trade-offs",
          "Cross-shard JOIN limitations",
          "Distributed transaction complexity (Two-Phase Commit)",
          "Choosing the optimal Shard Key",
        ],
      },
      {
        id: "faang18",
        category: "Behavioral / HR",
        question: "Amazon LP: Tell me about a time you had to dive deep into a problem that seemed intractable (Dive Deep).",
        hint: "Root cause tracing, profiling, inspecting assembly or network packets.",
        sampleAnswer:
          "Our production service suffered intermittent 504 gateway timeouts that occurred only once every few hours without reproducing in staging. Senior engineers assumed it was network congestion. I took ownership to Dive Deep: I attached eBPF probes and analyzed TCP packet dumps using Wireshark. I discovered that a third-party analytics SDK was issuing synchronous DNS queries with a 5-second socket timeout whenever the internal DNS cache expired. I replaced the synchronous lookup with an asynchronous background resolver, completely eliminating the 504 timeouts.",
        keyPoints: [
          "Refusal to settle for superficial hypotheses",
          "Low-level diagnostic tools utilized (Wireshark, eBPF, profilers)",
          "Uncovering non-obvious root causes",
          "Engineering an enduring fix",
          "Documenting insights for team-wide knowledge sharing",
        ],
      },
      {
        id: "faang19",
        category: "System Design",
        question: "Design a Real-Time Collaborative Document Platform like Google Docs. How do you resolve concurrent edits?",
        hint: "Operational Transformation (OT) vs Conflict-Free Replicated Data Types (CRDTs), WebSockets.",
        sampleAnswer:
          "1. Architecture: Web clients connect via WebSockets to room servers backed by Redis Pub/Sub. 2. Concurrency Resolution: Use CRDTs (like Yjs / Logoot) or Operational Transformation (OT). CRDTs are decentralized and commutative—every character insertion/deletion has a globally unique logical timestamp (Lamport clock) and parent ID, ensuring that all clients converge to the exact same state regardless of the order updates arrive, with zero server merge locks. 3. Persistence: Snapshot periodic state to PostgreSQL and log binary state updates.",
        keyPoints: [
          "CRDTs vs Operational Transformation comparison",
          "Commutative and idempotent state convergence",
          "Bi-directional WebSocket streaming architecture",
          "User presence and live cursor coordinates",
          "Offline-first reconciliation and snapshot compaction",
        ],
      },
      {
        id: "faang20",
        category: "Technical",
        question: "What is Memory Alignment and Data Structure Padding in C/C++? How does it affect performance?",
        hint: "CPU word boundaries, padding bytes, cache lines, reordering struct members.",
        sampleAnswer:
          "CPUs read memory in word-sized chunks (e.g., 4 or 8 bytes) aligned at addresses divisible by word size. If a 4-byte integer is stored at an unaligned address, the CPU may require two memory bus cycles and bitwise shifts to read it. Compilers automatically insert padding bytes between struct members to align them to natural boundaries. Reordering struct members from largest to smallest (e.g. doubles, ints, shorts, chars) eliminates wasted padding, shrinking struct memory footprint and improving CPU L1 cache density.",
        keyPoints: [
          "Natural memory alignment rules for primitives",
          "Cost of unaligned memory access on modern CPUs",
          "Compiler padding insertion between struct members",
          "Optimizing struct declaration order to conserve memory",
          "__attribute__((packed)) and its associated CPU performance penalties",
        ],
      },
      {
        id: "faang21",
        category: "DSA",
        question: "How do you detect and find the Bridges and Articulation Points in an undirected graph?",
        hint: "Tarjan's Bridge-Finding algorithm using discovery time and lowest reachability time.",
        sampleAnswer:
          "A bridge is an edge whose removal increases the number of connected components. We use Tarjan's bridge-finding algorithm via DFS: we track 'tin[u]' (discovery time) and 'low[u]' (lowest discovery time reachable via back-edges). For each tree edge (u, v): if 'low[v] > tin[u]', the edge (u, v) is a bridge because vertex v has no back-edge to vertex u or any ancestor of u. Articulation points are vertices where 'low[v] >= tin[u]' (with special root condition having >= 2 children). Time complexity is O(V + E).",
        keyPoints: [
          "Definition of Bridges and Articulation Points",
          "DFS discovery time (tin) and low-link (low) values",
          "Condition for Bridge: low[v] > tin[u]",
          "Condition for Articulation Point: low[v] >= tin[u] and root case",
          "O(V + E) time complexity",
        ],
      },
      {
        id: "faang22",
        category: "System Design",
        question: "Design a High-Throughput Metrics Monitoring and Alerting System like Prometheus / Datadog.",
        hint: "Time-Series Database (TSDB), Push vs Pull model, Gorilla compression, downsampling.",
        sampleAnswer:
          "1. Ingestion: Prometheus-style Pull scraper or Push gateway receiving metrics in OpenTelemetry format. 2. Storage: TSDB using Gorilla delta-of-delta timestamp compression and XOR floating-point compression, reducing memory to ~1.37 bytes per metric. 3. Indexing: Inverted index mapping metric names and label sets (key=value) to time-series IDs. 4. Retention & Downsampling: Raw data kept for 14 days, downsampled to 5-minute averages for 90 days, and 1-hour rollups for 1 year.",
        keyPoints: [
          "TSDB architecture and append-only disk storage",
          "Gorilla compression (delta-of-delta and XOR float compression)",
          "Pull vs Push architecture trade-offs",
          "Downsampling and retention tiering",
          "Alert evaluation engine and threshold triggers",
        ],
      },
      {
        id: "faang23",
        category: "Behavioral / HR",
        question: "Tell me about a time you received critical constructive feedback that made you change your working style.",
        hint: "Humility, taking actionable steps, measuring positive shift.",
        sampleAnswer:
          "During a mid-year review, my manager pointed out that while my individual code output was exceptional, my pull requests were excessively large (1,000+ lines), making code reviews a bottleneck for teammates. Rather than being defensive, I took ownership: I adopted a strict rule of breaking features into micro-PRs (<250 lines), using feature flags to merge code incrementally. Teammates appreciated the change, PR review turnaround dropped from 2 days to 3 hours, and bug escape rates fell by 30%.",
        keyPoints: [
          "Embracing critical feedback with openness and maturity",
          "Quantifying the underlying team problem",
          "Implementing a concrete systemic change (stacked micro-PRs)",
          "Using feature flags to decouple deployment from release",
          "Demonstrating lasting positive team impact",
        ],
      },
      {
        id: "faang24",
        category: "Technical",
        question: "What is the difference between gRPC and REST APIs? When is gRPC superior?",
        hint: "HTTP/2, Protocol Buffers binary serialization, bi-directional streaming, code generation.",
        sampleAnswer:
          "REST uses HTTP/1.1 or HTTP/2 transmitting human-readable JSON payloads, making it universally accessible for browser clients. gRPC utilizes HTTP/2 exclusively and serializes data into binary Protocol Buffers (Protobuf). gRPC is up to 7x faster and uses ~30% less bandwidth than JSON, supports bi-directional streaming, and automatically generates strongly typed client/server stubs in multiple languages. I use gRPC for high-throughput internal microservice communication and REST for public public-facing APIs.",
        keyPoints: [
          "Binary Protocol Buffers vs text JSON payloads",
          "HTTP/2 multiplexing, header compression, and streaming",
          "Strong contract definition with .proto files and auto code generation",
          "Performance benchmark advantages in latency and CPU serialization",
          "Browser compatibility limitations for pure gRPC",
        ],
      },
      {
        id: "faang25",
        category: "DSA",
        question: "Explain the A* Search Algorithm. What makes a heuristic 'admissible' and 'consistent'?",
        hint: "f(n) = g(n) + h(n), priority queue, admissible never overestimates.",
        sampleAnswer:
          "A* is an informed search algorithm that finds the shortest path by evaluating nodes using f(n) = g(n) + h(n), where g(n) is the exact cost from start to node n, and h(n) is a heuristic estimate from n to goal. An admissible heuristic never overestimates the true cost to reach the goal (guaranteeing optimal path). A consistent (or monotonic) heuristic satisfies h(n) <= cost(n, p) + h(p), ensuring that once a node is expanded, its path cost is minimal without needing re-expansion.",
        keyPoints: [
          "f(n) = g(n) + h(n) evaluation formula",
          "Admissible heuristic: h(n) <= h*(n) (never overestimates)",
          "Consistent / Monotonic heuristic requirement for graph search",
          "Comparison with Dijkstra (where h(n) = 0)",
          "Applications in robotics, gaming, and GPS navigation",
        ],
      },
      {
        id: "faang26",
        category: "System Design",
        question: "Design a Distributed Key-Value Store with Strong Consistency across data centers (like Google Spanner).",
        hint: "TrueTime API with atomic GPS clocks, Multi-Paxos / Raft, Two-Phase Commit.",
        sampleAnswer:
          "Google Spanner achieves globally consistent distributed transactions by combining: 1. TrueTime API: Synchronizes server clocks using GPS receivers and atomic clocks, providing bounded uncertainty intervals [earliest, latest] (~7ms). 2. Multi-Paxos: Shards data into Paxos groups across data centers to replicate state. 3. Concurrency: Implements Two-Phase Locking (2PL) for read-write transactions and Two-Phase Commit across Paxos groups, assigning monotonically increasing timestamps to deliver lock-free snapshot isolation reads worldwide.",
        keyPoints: [
          "TrueTime API with atomic and GPS clocks bounding clock uncertainty",
          "Paxos groups replication across geographical regions",
          "Lock-free consistent read snapshots at exact timestamp t",
          "Two-Phase Commit (2PC) over Multi-Paxos groups",
          "External consistency (strict serializability)",
        ],
      },
      {
        id: "faang27",
        category: "Technical",
        question: "What is an eBPF (Extended Berkeley Packet Filter) program, and why is it transforming Linux observability and security?",
        hint: "Running sandboxed bytecode in the Linux kernel without modifying source or loading kernel modules.",
        sampleAnswer:
          "eBPF allows developers to run sandboxed, verified bytecode safely inside the Linux kernel at runtime without modifying kernel source code or loading dangerous kernel modules. A static verifier guarantees the eBPF program cannot crash the kernel, loop infinitely, or leak memory. It hooks into tracepoints, kprobes, and network sockets (XDP), delivering microsecond-level performance profiling, zero-overhead network packet filtering, and runtime security monitoring (e.g. Cilium, Falco).",
        keyPoints: [
          "Running sandboxed bytecode directly in kernel space",
          "Safety verification without kernel recompilation",
          "Hooking into tracepoints, kprobes, and network drivers (XDP)",
          "Revolutionizing observability, network routing, and security",
          "Prominent ecosystem examples: Cilium, BCC, Falco",
        ],
      },
      {
        id: "faang28",
        category: "Behavioral / HR",
        question: "Tell me about a time you disagreed with product management on a feature timeline and successfully negotiated a compromise.",
        hint: "Trade-offs between technical debt, scope reduction, phased rollout.",
        sampleAnswer:
          "Product management wanted to launch our checkout redesign in 3 weeks, which would have forced us to hardcode payment edge cases and bypass automated regression testing. I scheduled a sync and framed the trade-off in business terms: rushing the full scope introduced a high risk of payment drop-offs during launch week. I proposed a phased MVP: ship core UPI and Card payments on the targeted date, while deferring NetBanking and multi-currency support to Phase 2. Product agreed; we launched on time with zero checkout errors.",
        keyPoints: [
          "Framing technical risk in terms of revenue and customer impact",
          "Proposing solutions (scope reduction / phased rollout) rather than just saying no",
          "Collaborative stakeholder negotiation",
          "Maintaining high software quality standards",
          "Successful on-time delivery with zero critical bugs",
        ],
      },
      {
        id: "faang29",
        category: "DSA",
        question: "What is the KMP (Knuth-Morris-Pratt) algorithm for pattern searching? How does the Longest Prefix Suffix (LPS) array work?",
        hint: "Eliminates backtracking in the main text string, O(n + m) time.",
        sampleAnswer:
          "KMP searches for a pattern of length m in a text of length n in O(n + m) time. Unlike naive O(n*m) search which backtracks the text pointer upon a mismatch, KMP precomputes the LPS (Longest Prefix Suffix) array for the pattern. LPS[i] stores the length of the longest proper prefix of pattern[0...i] that is also a suffix of pattern[0...i]. When a character mismatch occurs, KMP uses the LPS array to slide the pattern to the next valid match candidate without moving the text pointer backwards.",
        keyPoints: [
          "Elimination of text pointer backtracking",
          "LPS (Longest Proper Prefix which is also a Suffix) definition",
          "O(m) preprocessing time and O(n) search time",
          "Overall O(n + m) time complexity",
          "Comparison with Boyer-Moore and Rabin-Karp algorithms",
        ],
      },
      {
        id: "faang30",
        category: "System Design",
        question: "How would you design a Video Streaming Platform like YouTube / Netflix from transcoding to edge delivery?",
        hint: "Chunking, HLS/DASH adaptive bitrate streaming, distributed transcoding workers, CDN caching.",
        sampleAnswer:
          "1. Ingestion: Direct multipart upload to object storage (S3/GCS). 2. Transcoding: Async message queue triggers distributed GPU workers to transcode video into multiple resolutions (1080p, 720p, 480p) sliced into 4-6 second segments (.ts or .m4s) with master playlist files (.m3u8). 3. Streaming Protocol: HLS or MPEG-DASH for Adaptive Bitrate Streaming (ABS), automatically switching video quality based on client network bandwidth. 4. CDN Edge: Segments are heavily cached across global CDN edge nodes.",
        keyPoints: [
          "Adaptive Bitrate Streaming (ABS) via HLS and MPEG-DASH",
          "Video segmentation into 4-6 second chunks",
          "Distributed asynchronous transcoding pipeline",
          "CDN caching strategy for popular media segments",
          "DRM encryption and content protection",
        ],
      },
    ],
  },

  // ===============================================================
  // SET 3: FULLSTACK & WEB ARCHITECT (30 QUESTIONS)
  // ===============================================================
  {
    id: "fullstack-architect",
    title: "Fullstack Web Architect & Cloud Engineer",
    emoji: "🌐",
    company: "Modern SaaS & High-Growth Unicorns",
    role: "Fullstack Engineer / Frontend Architect",
    difficulty: "Medium",
    description: "30 questions covering React 19, Next.js Server Components, SSR hydration, REST/GraphQL, security, and web performance.",
    questions: [
      {
        id: "fs1",
        category: "Technical",
        question: "Explain the difference between React Server Components (RSC) and Client Components in Next.js 15 App Router.",
        hint: "Zero bundle size, server-only execution, streaming, 'use client' directive.",
        sampleAnswer:
          "React Server Components execute strictly on the server, have direct access to backend resources (databases, secrets, filesystem), and their dependencies add 0 bytes to the client JavaScript bundle. They render into an efficient JSON-like stream (RSC payload). Client Components (marked with 'use client') are pre-rendered on the server and hydrated in the browser, enabling interactivity, DOM event listeners, and hooks like useState and useEffect.",
        keyPoints: [
          "RSC dependencies contribute 0 KB to client bundle size",
          "Direct server-side data fetching without API routes",
          "Client Components for interactivity and stateful hooks",
          "Hydration boundary rules ('use client')",
          "Streaming HTML and Suspense integration",
        ],
      },
      {
        id: "fs2",
        category: "Technical",
        question: "What is Hydration in modern frontend frameworks, and what causes a Hydration Mismatch error?",
        hint: "Attaching event listeners to server-rendered HTML, differences between server and client DOM.",
        sampleAnswer:
          "Hydration is the client-side process where React walks over the server-rendered HTML DOM and attaches event listeners, internal state, and effects to make it fully interactive. A Hydration Mismatch error occurs when the initial HTML generated on the server differs from the DOM tree generated by the client's first render pass (e.g. rendering `new Date()`, checking `typeof window !== 'undefined'`, or browser extensions modifying DOM elements).",
        keyPoints: [
          "Attaching event listeners to static server HTML",
          "DOM tree reconciliation between server and client",
          "Common mismatch causes: timestamps, local storage checks, invalid HTML nesting",
          "Resolution: useEffect for client-only state or suppressHydrationWarning",
          "Performance impact of heavy hydration",
        ],
      },
      {
        id: "fs3",
        category: "Technical",
        question: "What is the difference between Cookie-based Sessions and JSON Web Tokens (JWT) for authentication?",
        hint: "Stateful vs stateless, storage locations, revocation, CSRF vs XSS risks.",
        sampleAnswer:
          "Cookie-based sessions are stateful: the server stores session data in memory or Redis and sends an opaque session ID stored in an HttpOnly cookie. Revocation is instantaneous by deleting the session record on the server. JWTs are stateless: claims are cryptographically signed and stored in the token itself; any server with the secret key can verify it without database lookups. However, revoking an unexpired JWT is difficult without maintaining a token blocklist. Cookies are vulnerable to CSRF; JWTs in localStorage are vulnerable to XSS.",
        keyPoints: [
          "Stateful session ID in database vs stateless signed JWT",
          "Instant revocation feasibility",
          "HttpOnly, Secure, SameSite cookie flags",
          "XSS vulnerability in localStorage vs CSRF vulnerability in cookies",
          "Refresh token rotation pattern",
        ],
      },
      {
        id: "fs4",
        category: "Technical",
        question: "Explain the Core Web Vitals (LCP, INP, CLS) and how to optimize each of them.",
        hint: "Largest Contentful Paint, Interaction to Next Paint, Cumulative Layout Shift.",
        sampleAnswer:
          "1. LCP (Largest Contentful Paint < 2.5s): Measures loading speed of the largest above-the-fold image or text block. Optimize via CDN caching, preloading hero images, and eliminating render-blocking CSS. 2. INP (Interaction to Next Paint < 200ms): Measures page responsiveness to user interactions. Optimize by breaking long tasks into microtasks (requestIdleCallback, Web Workers) and avoiding heavy JS on the main thread. 3. CLS (Cumulative Layout Shift < 0.1): Measures visual stability. Optimize by setting explicit width/height dimensions on images and reserving space for dynamic ad banners.",
        keyPoints: [
          "LCP thresholds and image preloading/SSR optimizations",
          "INP as replacement for FID, optimizing main thread responsiveness",
          "CLS elimination through explicit aspect ratios and reserved dimensions",
          "Real User Monitoring (RUM) measurement tools",
          "SEO ranking implications of Core Web Vitals",
        ],
      },
      {
        id: "fs5",
        category: "Technical",
        question: "What is Cross-Site Scripting (XSS)? Explain Stored, Reflected, and DOM-based XSS with defenses.",
        hint: "Injecting malicious JavaScript, Content-Security-Policy (CSP), escaping inputs.",
        sampleAnswer:
          "XSS occurs when an attacker injects malicious JavaScript that executes in a victim's browser. 1. Stored XSS: Injected script is stored permanently in the database (e.g. comment field) and served to all viewers. 2. Reflected XSS: Malicious script is reflected off the web server via URL query parameters. 3. DOM-based XSS: Vulnerability exists entirely client-side when JS reads untrusted data (location.hash) and writes to sinks like innerHTML. Defenses: Strict Content-Security-Policy (CSP), context-aware output encoding, using textContent instead of innerHTML, and HttpOnly cookies.",
        keyPoints: [
          "Stored vs Reflected vs DOM-based XSS mechanisms",
          "Impact: Session hijacking, credential theft, CSRF execution",
          "Content-Security-Policy (CSP) headers",
          "Context-aware sanitization (DOMPurify)",
          "HttpOnly cookies protecting authentication tokens",
        ],
      },
      {
        id: "fs6",
        category: "Technical",
        question: "What is Cross-Site Request Forgery (CSRF)? How does the SameSite cookie attribute mitigate it?",
        hint: "Unauthorized commands transmitted from a trusted user, Anti-CSRF tokens, SameSite=Strict/Lax.",
        sampleAnswer:
          "CSRF tricks an authenticated user into unknowingly submitting an unauthorized HTTP request to a target site where they have an active session (e.g., clicking a link that triggers GET /transfer?amount=1000). The browser automatically attaches stored session cookies. Mitigations: 1. SameSite cookie attribute: 'SameSite=Lax' prevents cookies from being sent on cross-site subrequests (POST/images), and 'SameSite=Strict' blocks them even on cross-site top-level navigations. 2. Synchronizer Token Pattern (Anti-CSRF tokens) embedded in forms and verified on submission.",
        keyPoints: [
          "Mechanism: Exploiting automatic browser cookie transmission",
          "SameSite=Strict, Lax, and None differences",
          "Anti-CSRF synchronizer tokens in state-changing requests",
          "Checking Origin and Referer headers",
          "Why modern token-based auth (Authorization: Bearer) is immune to CSRF",
        ],
      },
      {
        id: "fs7",
        category: "Technical",
        question: "What are Server-Sent Events (SSE) vs WebSockets? When should you choose SSE over WebSockets?",
        hint: "Unidirectional vs bidirectional, HTTP/2 multiplexing, automatic reconnection.",
        sampleAnswer:
          "WebSockets provide full-duplex, bi-directional communication over a single TCP connection, ideal for interactive games and collaborative whiteboards. Server-Sent Events (SSE) provide unidirectional streaming from server to client over standard HTTP (Content-Type: text/event-stream). SSE is superior for live scoreboards, AI chat token streaming (like ChatGPT), and stock tickers because it works over standard HTTP/2 (supporting multiplexing), includes built-in browser reconnection handling, and easily traverses corporate firewalls.",
        keyPoints: [
          "Unidirectional (SSE) vs Bi-directional (WebSockets)",
          "Transport: Standard HTTP/2 stream vs TCP protocol upgrade",
          "Built-in browser reconnection and event IDs in EventSource API",
          "Ideal fit of SSE for LLM text streaming",
          "Firewall and proxy friendliness of SSE",
        ],
      },
      {
        id: "fs8",
        category: "Technical",
        question: "How does the React Virtual DOM diffing algorithm (Reconciliation) achieve O(n) heuristic complexity?",
        hint: "Two elements of different types produce different trees, keys identify stable children.",
        sampleAnswer:
          "Standard tree edit distance algorithms take O(n³) time. React achieves O(n) linear complexity using two heuristics: 1. Different Element Types: If two elements have different component types (e.g., replacing <div> with <span>), React unmounts the old tree and builds the new tree from scratch without diffing children. 2. Keys for Dynamic Lists: By using stable, unique 'key' props on array items, React can match children across renders, identifying insertions, deletions, and moves rather than re-rendering every child element.",
        keyPoints: [
          "Heuristic assumptions reducing O(n³) to O(n)",
          "Component type changes triggering full subtree replacement",
          "The critical importance of stable unique keys in lists",
          "Why index as a key causes rendering and state bugs",
          "React 18/19 Fiber architecture and concurrent scheduling",
        ],
      },
      {
        id: "fs9",
        category: "Technical",
        question: "Explain the difference between useMemo, useCallback, and React.memo. When does premature optimization harm performance?",
        hint: "Memoizing values vs function references vs component renders, memory overhead.",
        sampleAnswer:
          "React.memo is a higher-order component that skips re-rendering a component if its props haven't changed. useMemo caches the result of an expensive calculation between renders. useCallback caches a function definition reference so passing it to child components doesn't break React.memo equality checks. Premature optimization harms performance because useMemo and useCallback incur memory overhead to store dependency arrays and execute equality checks on every single render pass, which often costs more CPU than simply re-instantiating a basic function.",
        keyPoints: [
          "React.memo for component re-render skipping",
          "useMemo for expensive computation caching",
          "useCallback for function reference stability",
          "Cost of dependency array comparisons on every render",
          "Guideline: Optimize only after profiling identifies actual bottlenecks",
        ],
      },
      {
        id: "fs10",
        category: "Technical",
        question: "What is Database Connection Pooling, and why is it essential for serverless edge runtimes?",
        hint: "Handshake overhead, max connection limits in Postgres, Prisma Accelerate / PgBouncer.",
        sampleAnswer:
          "Creating a new database connection involves TCP handshakes, TLS negotiation, and authentication, consuming significant time and memory (~10MB per Postgres connection). Traditional servers maintain a persistent pool of reusable connections. In serverless edge environments (Vercel, AWS Lambda), each invocation can spin up a new isolated instance, easily exhausting database connection limits (e.g. max_connections=100). Connection poolers like PgBouncer or Supabase Supavisor sit between serverless functions and Postgres to manage and reuse connections efficiently.",
        keyPoints: [
          "Connection creation overhead (TCP + TLS + auth)",
          "PostgreSQL process-per-connection architecture memory limits",
          "Serverless connection explosion hazard",
          "Proxy poolers (PgBouncer, AWS RDS Proxy, Prisma Accelerate)",
          "Session pooling vs Transaction pooling modes",
        ],
      },
      {
        id: "fs11",
        category: "Technical",
        question: "What is the difference between REST and GraphQL? What are over-fetching and under-fetching?",
        hint: "Fixed endpoints vs single query endpoint, over-fetching extra data vs multiple roundtrips.",
        sampleAnswer:
          "REST exposes multiple fixed endpoints returning predefined schemas. Over-fetching occurs when an endpoint returns more fields than the client needs (e.g., getting a full 50-field user profile just to show a username). Under-fetching occurs when one endpoint doesn't return enough data, forcing multiple consecutive requests (the N+1 request problem). GraphQL solves this by providing a single endpoint where clients request exact fields in a single query. However, GraphQL introduces complexity in caching, rate limiting, and backend N+1 database queries.",
        keyPoints: [
          "Over-fetching and under-fetching definitions",
          "Client-specified queries vs fixed server endpoints",
          "HTTP caching advantages of REST (GET URLs)",
          "DataLoader pattern to solve backend GraphQL N+1 issues",
          "Schema stitching and federation",
        ],
      },
      {
        id: "fs12",
        category: "Technical",
        question: "Explain the CSS Box Model and the difference between 'box-sizing: content-box' and 'box-sizing: border-box'.",
        hint: "Content, padding, border, margin; total calculated width.",
        sampleAnswer:
          "The CSS Box Model consists of: Content, Padding, Border, and Margin. With 'content-box' (browser default), the declared width applies only to the content area; adding padding and borders expands the actual rendered element width (total = width + padding + border). With 'border-box', the declared width includes content, padding, and border; padding and borders push inward without changing the total rendered box dimensions, making responsive grid and layout calculations predictable.",
        keyPoints: [
          "Four layers: content, padding, border, margin",
          "content-box calculation: declared width + padding + border",
          "border-box calculation: declared width includes padding and border",
          "Universal reset: * { box-sizing: border-box; }",
          "Impact on responsive design layouts",
        ],
      },
      {
        id: "fs13",
        category: "Technical",
        question: "What is Progressive Web App (PWA) architecture? Explain the role of the Service Worker and Web App Manifest.",
        hint: "Offline capabilities, background sync, push notifications, caching strategies.",
        sampleAnswer:
          "A Progressive Web App (PWA) delivers native-app-like experiences via the web. The Web App Manifest (manifest.json) configures installation metadata (icons, display: standalone, theme colors). The Service Worker is a client-side programmable proxy script running in the background independent of web pages. It intercepts network requests, implements caching strategies (Cache-First, Network-First, Stale-While-Revalidate) using the Cache API, and enables offline access and push notifications.",
        keyPoints: [
          "Service Worker lifecycle: Register, Install, Activate",
          "Intercepting fetch events for offline caching",
          "Caching strategies: Cache-First vs Stale-While-Revalidate",
          "manifest.json for home screen installation",
          "Background sync and Push Notification API",
        ],
      },
      {
        id: "fs14",
        category: "Technical",
        question: "What is Micro-Frontend architecture? What are its benefits and challenges?",
        hint: "Independent deployment, Module Federation, shared state, CSS collisions.",
        sampleAnswer:
          "Micro-Frontend architecture decomposes a large frontend monolithic application into smaller, independently developed, tested, and deployed sub-applications managed by autonomous teams. Technologies like Webpack Module Federation dynamically load remote components at runtime. Benefits include independent team deployments, decoupled technology stacks, and fault isolation. Challenges include increased bundle size (duplicate vendor libraries), shared global state synchronization, and CSS naming collisions.",
        keyPoints: [
          "Decomposing monolithic SPAs into autonomous modules",
          "Webpack Module Federation runtime imports",
          "Independent CI/CD deployment pipelines",
          "Challenges: Bundle size bloat and duplicate libraries",
          "Shared state management and unified design system consistency",
        ],
      },
      {
        id: "fs15",
        category: "Technical",
        question: "What are WebSockets vs WebRTC? When would you choose WebRTC for real-time web applications?",
        hint: "Client-server TCP vs Peer-to-Peer UDP, video/audio streaming, ICE/STUN/TURN.",
        sampleAnswer:
          "WebSockets provide bi-directional client-server messaging over TCP. WebRTC (Web Real-Time Communication) provides direct Peer-to-Peer (P2P) audio, video, and data communication over UDP with sub-second latency. WebSockets require all data to pass through your server, introducing bandwidth costs and latency. WebRTC establishes direct peer connections via STUN/TURN signaling servers. I choose WebRTC for video calls, peer-to-peer gaming, and massive file transfers where low latency and avoiding media server bandwidth are critical.",
        keyPoints: [
          "Client-server TCP (WebSockets) vs Peer-to-peer UDP (WebRTC)",
          "Signaling process with STUN and TURN servers for NAT traversal",
          "Sub-100ms latency for live video/audio streaming",
          "WebRTC DataChannel for peer-to-peer binary data transfers",
          "Server cost reduction through P2P offloading",
        ],
      },
      {
        id: "fs16",
        category: "Technical",
        question: "What is Idempotency in HTTP API design? Which HTTP methods are idempotent and which are not?",
        hint: "Executing multiple identical requests yields identical state: GET, PUT, DELETE vs POST.",
        sampleAnswer:
          "An HTTP method is idempotent if making multiple identical requests has the exact same side-effect on the server as making a single request. GET, HEAD, OPTIONS are idempotent and safe (no state changes). PUT is idempotent because replacing a resource repeatedly leaves it in the exact same state. DELETE is idempotent because deleting an already-deleted resource leaves it deleted (returning 204 or 404). POST is NOT idempotent because repeating it creates multiple new records. PATCH is generally non-idempotent.",
        keyPoints: [
          "Definition: Multiple executions produce the identical server state",
          "Idempotent methods: GET, PUT, DELETE, HEAD, OPTIONS",
          "Non-idempotent methods: POST, PATCH",
          "Idempotency-Key headers in payment gateways to prevent double charges",
          "Safety vs Idempotency distinction",
        ],
      },
      {
        id: "fs17",
        category: "Technical",
        question: "What is an SSRF (Server-Side Request Forgery) vulnerability? How do attackers exploit it and how is it prevented?",
        hint: "Tricking the server into querying internal services (AWS metadata 169.254.169.254, localhost).",
        sampleAnswer:
          "SSRF occurs when an attacker induces a server application to make HTTP requests to an arbitrary domain supplied by user input (e.g. 'Fetch URL for preview'). Attackers exploit this to query internal private networks, such as accessing the AWS instance metadata service at 'http://169.254.169.254/latest/meta-data/' to steal IAM cloud credentials. Prevention: Enforce strict URL domain whitelists, block private/loopback IP ranges (127.0.0.1, 10.0.0.0/8, 169.254.0.0/16) at the DNS resolution layer, and disable unused URL protocols.",
        keyPoints: [
          "Exploiting server-side HTTP fetchers to probe internal networks",
          "Cloud metadata exfiltration (169.254.169.254)",
          "Bypassing naive string regex via DNS rebinding",
          "Validating resolved IP addresses before connecting",
          "Network isolation and egress firewall rules",
        ],
      },
      {
        id: "fs18",
        category: "Technical",
        question: "What is Eventual Consistency vs Strong Consistency in modern cloud data architectures?",
        hint: "Read immediately sees write vs replicas converging over time, read-your-own-writes consistency.",
        sampleAnswer:
          "Strong Consistency guarantees that any read operation immediately receives the most recent write, at the expense of higher write latency and reduced availability during network partitions. Eventual Consistency guarantees that, in the absence of new updates, all distributed replicas will eventually converge to the same value; however, reads in the interim may return stale data. Systems often provide 'Read-Your-Own-Writes' consistency for individual user sessions while maintaining eventual consistency across global read replicas.",
        keyPoints: [
          "Strong consistency linearizability guarantees",
          "Eventual consistency performance and availability benefits",
          "Replication lag across multi-region read replicas",
          "Read-Your-Own-Writes consistency implementation using user session tokens",
          "Choosing consistency models based on business criticality",
        ],
      },
      {
        id: "fs19",
        category: "Technical",
        question: "What is WebAssembly (Wasm)? What are its primary use cases in modern fullstack web development?",
        hint: "Compact binary format, near-native execution speed, compiling C/C++/Rust to browser.",
        sampleAnswer:
          "WebAssembly (Wasm) is a low-level binary code format running in modern web browsers at near-native speed with a memory-safe sandboxed execution model. It allows high-performance languages like C, C++, and Rust to run directly on the web alongside JavaScript. Primary use cases include browser-based image/video editing (Figma), 3D games (Unreal Engine), client-side machine learning inference (ONNX/TensorFlow.js), cryptography, and portable edge computing (Cloudflare Workers Wasm).",
        keyPoints: [
          "Compact binary format running at near-native execution speed",
          "Memory-safe sandboxed execution alongside JavaScript",
          "Compiling C/C++/Rust directly for browser execution",
          "Prominent production use cases (Figma, AutoCAD, in-browser video editors)",
          "Edge compute runtimes running Wasm modules",
        ],
      },
      {
        id: "fs20",
        category: "Technical",
        question: "Explain the CSS 'z-index' property and Stacking Contexts. Why does increasing z-index sometimes fail to bring an element to the front?",
        hint: "Stacking context creation (opacity, transform, position + z-index), hierarchy isolation.",
        sampleAnswer:
          "Z-index controls the 3D stacking order of elements along the z-axis, but it only operates within its parent Stacking Context. A new stacking context is created by elements with 'position' (relative/absolute) and z-index other than auto, 'opacity' < 1, 'transform', or 'isolation: isolate'. If element A is inside a stacking context with lower priority than element B's stacking context, increasing element A's z-index to 999999 has no effect—it will remain trapped beneath element B. To bring it forward, you must elevate the parent stacking context itself.",
        keyPoints: [
          "Z-index is scoped strictly within its active Stacking Context",
          "Properties that create new stacking contexts (transform, opacity, isolation)",
          "The 'z-index: 99999' anti-pattern and debugging stacking issues",
          "Using 'isolation: isolate' to prevent unexpected parent leakage",
          "Browser stacking order rules (backgrounds -> negative z-index -> block -> float -> inline -> positioned)",
        ],
      },
      {
        id: "fs21",
        category: "Technical",
        question: "What is the difference between Local Storage, Session Storage, and IndexedDB?",
        hint: "Synchronous 5MB key-value vs asynchronous transactional NoSQL database.",
        sampleAnswer:
          "LocalStorage stores synchronous key-value strings (~5MB limit) persistently across browser sessions until explicitly cleared. SessionStorage is identical in API and size (~5MB) but clears automatically when the browser tab is closed. IndexedDB is an asynchronous, transactional, indexed NoSQL object database capable of storing hundreds of megabytes of structured data, blobs, and typed arrays without blocking the main browser UI thread.",
        keyPoints: [
          "LocalStorage (5MB, synchronous, persistent)",
          "SessionStorage (5MB, synchronous, tab-scoped)",
          "IndexedDB (large capacity, asynchronous, transactional object store)",
          "Main thread blocking risks of JSON.parse on LocalStorage",
          "Offline-first client persistence with IndexedDB",
        ],
      },
      {
        id: "fs22",
        category: "Technical",
        question: "What is Tree Shaking in modern JavaScript bundlers (Vite, Webpack)? What makes code statically analyzable?",
        hint: "Dead code elimination, ES Modules (import/export) vs CommonJS (require), sideEffects flag.",
        sampleAnswer:
          "Tree shaking is dead-code elimination performed by bundlers to remove unused exports from the final JavaScript bundle. It relies on the static structure of ES6 Modules (import and export), where module dependencies can be determined at compile time before execution. CommonJS (require / module.exports) is dynamic and cannot be safely tree-shaken. Setting '\"sideEffects\": false' in package.json informs the bundler that unused imported files contain no global side effects and can be safely stripped.",
        keyPoints: [
          "Dead-code elimination reducing bundle size",
          "Static analyzability of ES Modules (ESM) vs dynamic CommonJS",
          "The role of 'sideEffects: false' in package.json",
          "Impact of barrel files (index.ts) on tree shaking performance",
          "Vite (Rollup) and Webpack tree shaking implementations",
        ],
      },
      {
        id: "fs23",
        category: "Technical",
        question: "What is Content Security Policy (CSP)? Write an example CSP header that prevents malicious script injection.",
        hint: "default-src, script-src, object-src, report-uri, nonces.",
        sampleAnswer:
          "Content Security Policy (CSP) is an HTTP response header that restricts the resources (scripts, images, stylesheets, iframes) the browser is allowed to load for a given page, neutralizing XSS and clickjacking attacks. Example: 'Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-rAnd0m123'; object-src 'none'; frame-ancestors 'none'; base-uri 'self';'. This directive blocks inline scripts lacking the cryptographic nonce, forbids plugin objects, and prevents framing.",
        keyPoints: [
          "Restricting resource sources to mitigate XSS and data injection",
          "Cryptographic nonces and hashes for legitimate inline scripts",
          "object-src 'none' and frame-ancestors 'none'",
          "CSP reporting mode (Content-Security-Policy-Report-Only)",
          "Defense-in-depth security best practices",
        ],
      },
      {
        id: "fs24",
        category: "Technical",
        question: "Explain the difference between Client-Side Rendering (CSR), Server-Side Rendering (SSR), and Incremental Static Regeneration (ISR).",
        hint: "Empty HTML shell + JS download vs render per request vs background cache revalidation.",
        sampleAnswer:
          "1. CSR: Serves an empty HTML shell; JavaScript downloads and renders the UI in the browser. Fast transitions, but slow initial load and poor SEO. 2. SSR: Renders dynamic HTML on the server for every incoming HTTP request. Excellent SEO and fresh data, but incurs higher server compute and TTFB. 3. ISR (Next.js): Serves statically generated HTML instantly from CDN cache, and regenerates pages in the background on demand after a specified revalidation window, combining the speed of static sites with the freshness of SSR.",
        keyPoints: [
          "CSR: Fast navigation, slow initial paint, poor SEO",
          "SSR: Server compute per request, fresh data, good SEO",
          "SSG: Pre-rendered at build time, maximum speed, static data",
          "ISR: Background revalidation combining CDN speed with freshness",
          "Choosing the right rendering strategy per page type",
        ],
      },
      {
        id: "fs25",
        category: "Technical",
        question: "What is Debouncing vs Throttling in frontend event handling? Provide practical use cases for each.",
        hint: "Waiting for silence vs enforcing a maximum execution rate, search input vs scroll/resize.",
        sampleAnswer:
          "Debouncing delays executing a function until a specified period of inactivity has elapsed since the last invocation (e.g., waiting 300ms after the user stops typing in a search bar before dispatching an API call). Throttling enforces a maximum frequency of execution, ensuring the function runs at most once every interval (e.g., updating scroll progress or window resize handlers at most once every 100ms).",
        keyPoints: [
          "Debounce: Executes after inactivity threshold",
          "Throttle: Guarantees execution at regular intervals",
          "Debounce use case: Auto-complete search inputs, auto-save forms",
          "Throttle use case: Infinite scroll, window resize, game loop inputs",
          "Preventing main thread performance lag and API spam",
        ],
      },
      {
        id: "fs26",
        category: "Technical",
        question: "What is OpenTelemetry (OTel)? Why is standardized telemetry critical in modern cloud microservices?",
        hint: "Traces, Metrics, Logs, vendor neutrality, distributed context propagation.",
        sampleAnswer:
          "OpenTelemetry is an open-source observability framework providing a vendor-neutral standard for generating, collecting, and exporting telemetry data: Traces, Metrics, and Logs. In distributed microservices, a single user request traverses dozens of services. OpenTelemetry injects distributed trace contexts (W3C TraceContext headers) across HTTP and gRPC boundaries, allowing engineers to trace a request end-to-end, identify latency bottlenecks, and export data seamlessly to any backend (Jaeger, Datadog, Prometheus) without code lock-in.",
        keyPoints: [
          "Three pillars of observability: Metrics, Traces, Logs",
          "Vendor neutrality preventing observability vendor lock-in",
          "Distributed trace context propagation across microservices",
          "Pinpointing latency bottlenecks across service meshes",
          "OpenTelemetry Collector architecture",
        ],
      },
      {
        id: "fs27",
        category: "Technical",
        question: "What is HTTP Caching? Explain Cache-Control headers: max-age, s-maxage, stale-while-revalidate, and no-cache vs no-store.",
        hint: "Browser cache vs CDN cache, revalidation, completely preventing storage.",
        sampleAnswer:
          "Cache-Control directives dictate caching behavior across browsers and CDNs: 'max-age=X' specifies how many seconds the browser can use the cached response. 's-maxage=X' overrides max-age specifically for shared caches (CDNs). 'stale-while-revalidate=Y' allows clients to immediately serve stale cached content while asynchronously fetching fresh content in the background. 'no-cache' requires the client to revalidate with the origin server (ETag) before serving. 'no-store' strictly forbids any cache from storing the response (essential for sensitive financial data).",
        keyPoints: [
          "max-age (browser) vs s-maxage (CDN / shared proxy)",
          "stale-while-revalidate for instantaneous loads with background updates",
          "no-cache (must revalidate with ETag) vs no-store (never save to disk/RAM)",
          "ETags and If-None-Match conditional requests (304 Not Modified)",
          "Immutable cache headers for content-hashed static assets",
        ],
      },
      {
        id: "fs28",
        category: "Technical",
        question: "What is Atomic CSS (Tailwind CSS)? What are the architectural trade-offs compared to CSS Modules or Styled Components?",
        hint: "Utility classes, PurgeCSS, zero runtime overhead, HTML readability.",
        sampleAnswer:
          "Atomic CSS provides single-purpose utility classes (e.g. 'flex p-4 text-center') mapped to atomic CSS rules. Tailwind CSS compiles these classes into a tiny static stylesheet by scanning source code and purging unused utilities. Trade-offs: Zero runtime overhead, near-zero bundle growth as applications expand, and consistent spacing constraints. The downside is increased HTML class verbosity and potential separation of concerns debate compared to CSS Modules or runtime CSS-in-JS (Styled Components).",
        keyPoints: [
          "Zero runtime CSS calculation overhead",
          "Tiny production bundle size via static purge scanning",
          "Enforcing consistent design tokens (spacing, typography, colors)",
          "HTML class clutter trade-off",
          "Eliminating dead CSS rules in large engineering teams",
        ],
      },
      {
        id: "fs29",
        category: "Technical",
        question: "How do you secure environment secrets in fullstack web applications, especially with Next.js or Docker?",
        hint: "NEXT_PUBLIC_ prefix leaking secrets to browser, .env in gitignore, secret managers.",
        sampleAnswer:
          "1. Prefix Isolation: In Next.js, never prefix secret keys (database URLs, Stripe secret keys) with 'NEXT_PUBLIC_', as anything with that prefix is inlined into public client JavaScript bundles. 2. Git Hygiene: Ensure all '.env*.local' files are in .gitignore and scan commits with GitGuardian or pre-commit hooks. 3. Cloud Production: Inject environment variables securely via cloud secret managers (AWS Secrets Manager, GCP Secret Manager, Vault) or CI/CD secrets rather than baking them into Docker container images.",
        keyPoints: [
          "Strict separation of client-exposed vs server-only environment variables",
          "Never baking secrets into Docker image layers",
          "Automated secret scanning in pre-commit hooks and CI",
          "Centralized secret management services with automatic rotation",
          "Principle of least privilege for API credentials",
        ],
      },
      {
        id: "fs30",
        category: "Behavioral / HR",
        question: "How do you advocate for web accessibility (a11y) and internationalization (i18n) within a fast-moving product team?",
        hint: "Semantic HTML, screen readers, WCAG 2.1 compliance, business case for broader reach.",
        sampleAnswer:
          "I advocate for accessibility and internationalization by framing them as fundamental quality benchmarks that expand market reach and improve SEO, rather than optional chores. Practically, I integrate automated accessibility linters (axe-core, eslint-plugin-jsx-a11y) into our CI pipeline to catch missing alt tags, improper ARIA roles, and low contrast before code merges. I also ensure team components rely on semantic HTML (buttons instead of clickable divs), enabling keyboard navigation and screen reader support by default.",
        keyPoints: [
          "Framing accessibility as legal compliance and market expansion",
          "Automated accessibility testing in CI with axe-core",
          "Semantic HTML over custom accessible divs",
          "Keyboard navigation and focus management",
          "i18n architecture using translation keys and RTL support",
        ],
      },
    ],
  },

  // ===============================================================
  // SET 4: SYSTEMS & LOW-LEVEL C/C++ (30 QUESTIONS)
  // ===============================================================
  {
    id: "systems-c",
    title: "Systems, Low-Level & C/C++ Engineering",
    emoji: "⚡",
    company: "Qualcomm, NVIDIA, Apple, Intel & Embedded Systems",
    role: "Systems Software Engineer / Embedded Developer",
    difficulty: "Hard",
    description: "30 questions covering pointers, virtual memory, assembly, interrupts, volatile keyword, and memory architectures.",
    questions: [
      {
        id: "sys1",
        category: "Technical",
        question: "What does the 'volatile' keyword signify in C and C++? When is it strictly mandatory?",
        hint: "Prevents compiler optimization, memory-mapped I/O, interrupt service routines, multi-threading limits.",
        sampleAnswer:
          "The 'volatile' keyword tells the compiler that a variable's value can change at any time without any action being taken by the code the compiler finds nearby. Consequently, the compiler must reload the value from memory every time it is referenced, completely disabling register caching optimizations. It is mandatory for: 1. Memory-Mapped Hardware Registers (MMIO). 2. Global variables modified inside an Interrupt Service Routine (ISR). 3. Flags shared across signal handlers. Note: Volatile does NOT provide thread synchronization or atomic operations in C/C++.",
        keyPoints: [
          "Informs compiler to avoid register caching optimizations",
          "Memory-mapped I/O hardware registers",
          "Global variables modified within an ISR",
          "Signal handlers communication",
          "Why volatile is NOT sufficient for thread safety (no memory barrier)",
        ],
      },
      {
        id: "sys2",
        category: "Technical",
        question: "Explain the difference between 'const char *p', 'char * const p', and 'const char * const p'.",
        hint: "Pointer to constant data vs constant pointer to data vs constant pointer to constant data.",
        sampleAnswer:
          "Read from right to left: 1. 'const char *p': Pointer to constant character. The pointer variable 'p' can be modified to point to another address, but the character data it points to cannot be modified (*p = 'a' is an error). 2. 'char * const p': Constant pointer to a character. The address stored in 'p' cannot change, but the data at that address can be modified (*p = 'b' is allowed; p++ is an error). 3. 'const char * const p': Constant pointer to constant character; neither the pointer address nor the data it points to can be modified.",
        keyPoints: [
          "Right-to-left syntax reading rule",
          "Pointer to constant data vs constant pointer",
          "Compiler enforcement and immutability guarantees",
          "Function signature best practices for read-only buffers",
          "Preventing accidental pointer mutation",
        ],
      },
      {
        id: "sys3",
        category: "Technical",
        question: "What is an Interrupt Service Routine (ISR)? What are the strict coding constraints when writing an ISR?",
        hint: "Cannot block, cannot allocate heap memory, must be fast, keep volatile variables.",
        sampleAnswer:
          "An Interrupt Service Routine (ISR) is a hardware or software callback executed by the CPU upon receiving an interrupt signal, pausing current program execution. Constraints: 1. An ISR must be as fast as possible; heavy tasks should be deferred to a bottom-half worker or task queue. 2. An ISR must never block or sleep (no mutex locking, no blocking I/O). 3. An ISR must never invoke non-reentrant functions or allocate dynamic heap memory (no malloc/free, no printf). 4. Shared flags must be declared 'volatile'.",
        keyPoints: [
          "Hardware callback mechanism",
          "No blocking operations or sleeping allowed",
          "No dynamic memory allocation (malloc/free) or standard I/O (printf)",
          "Top-half (fast hardware acknowledgement) vs bottom-half processing",
          "Reentrancy and volatile flag requirements",
        ],
      },
      {
        id: "sys4",
        category: "Technical",
        question: "Explain the Virtual Memory architecture in Linux. What is a Page Table, MMU, and Page Fault?",
        hint: "Virtual to physical address translation, Memory Management Unit, demand paging.",
        sampleAnswer:
          "Virtual Memory gives each process the illusion of a contiguous, private address space. The CPU's Memory Management Unit (MMU) translates virtual addresses to physical RAM addresses using multi-level Page Tables. A Page Fault is a hardware trap raised by the MMU when a virtual address is accessed whose corresponding page is not currently mapped into physical RAM (e.g. demand paging, swapped to disk, or invalid memory access). The kernel intercepts the page fault to allocate memory, load data from disk, or terminate the process with SIGSEGV.",
        keyPoints: [
          "Virtual to physical address isolation",
          "MMU hardware translation role",
          "Multi-level page tables and TLB caching",
          "Major vs minor page faults",
          "Demand paging and virtual memory overcommit",
        ],
      },
      {
        id: "sys5",
        category: "Technical",
        question: "What is the difference between Big-Endian and Little-Endian byte order? Write a C snippet to detect system endianness.",
        hint: "Most significant byte first vs least significant byte first, inspecting a short/int via char pointer.",
        sampleAnswer:
          "Endianness defines the byte ordering of multi-byte numbers in memory. Big-Endian stores the Most Significant Byte (MSB) at the lowest memory address (network byte order). Little-Endian stores the Least Significant Byte (LSB) at the lowest address (x86-64 processors). C detection: \n```c\nint x = 1;\nchar *p = (char *)&x;\nif (*p == 1) printf(\"Little-Endian\\n\");\nelse printf(\"Big-Endian\\n\");\n```\nBecause 1 is stored as 0x01, if the first byte in memory is 1, the architecture is Little-Endian.",
        keyPoints: [
          "MSB at lowest address (Big-Endian) vs LSB at lowest address (Little-Endian)",
          "Network byte order (Big-Endian) vs x86-64 (Little-Endian)",
          "C endianness detection using pointer casting or union",
          "Byte swapping macros: htons(), htonl(), ntohs(), ntohl()",
          "Serialization challenges across heterogeneous CPU architectures",
        ],
      },
      {
        id: "sys6",
        category: "Technical",
        question: "What is a Segmentation Fault (SIGSEGV) and a Bus Error (SIGBUS)? How do they differ?",
        hint: "Invalid virtual memory address vs hardware alignment/physical access fault.",
        sampleAnswer:
          "A Segmentation Fault (SIGSEGV) occurs when a process attempts to access an invalid virtual memory address (e.g., dereferencing a NULL pointer, accessing out-of-bounds heap memory, or writing to a read-only memory segment like a string literal). A Bus Error (SIGBUS) occurs when the CPU cannot physically address the requested memory location—typically caused by unaligned memory access on architectures requiring strict alignment, or accessing a memory-mapped file beyond its actual physical file size.",
        keyPoints: [
          "SIGSEGV: Virtual memory address permission or existence violation",
          "SIGBUS: Physical hardware bus error or memory alignment violation",
          "Common causes: NULL dereference, buffer overflow, dangling pointer",
          "Debugging via core dumps and GDB backtraces",
          "Memory protection flags (PROT_READ, PROT_WRITE, PROT_EXEC)",
        ],
      },
      {
        id: "sys7",
        category: "Technical",
        question: "Explain the stack frame layout during a C function call. What are the roles of the Base Pointer (RBP) and Stack Pointer (RSP)?",
        hint: "Call instruction pushes return address, RBP marks frame base, RSP tracks top, local variables.",
        sampleAnswer:
          "During a function call: 1. The caller places arguments into registers/stack and executes 'call', which pushes the return address onto the stack. 2. The callee prologue executes: 'push rbp' (saves caller's base pointer) and 'mov rbp, rsp' (establishes the new frame base). 3. The stack pointer (RSP) is decremented to allocate space for local variables. 4. RSP dynamically tracks the top of the stack, while RBP remains a fixed reference anchor to access local variables and arguments via offsets. 5. 'leave' and 'ret' restore RBP/RSP and jump back.",
        keyPoints: [
          "Role of Call instruction pushing return address",
          "Function prologue: push rbp; mov rbp, rsp; sub rsp, N",
          "RBP as fixed frame base reference vs RSP as dynamic stack top",
          "Stack grows downward on x86 architectures",
          "Function epilogue and stack unwinding",
        ],
      },
      {
        id: "sys8",
        category: "Technical",
        question: "What is a Ring Buffer (Circular Buffer)? How do you implement a lock-free single-producer single-consumer (SPSC) ring buffer in C?",
        hint: "Fixed array, head and tail indices, power of two masking, memory barriers.",
        sampleAnswer:
          "A Ring Buffer uses a fixed-size array that wraps around using modulo arithmetic. For a single-producer single-consumer (SPSC) queue, it can be implemented lock-free: the producer updates the 'head' index, and the consumer updates the 'tail' index. If the buffer size is a power of 2, modulo is replaced with fast bitwise AND: `index & (SIZE - 1)`. To ensure thread safety without mutexes, read and write memory barriers (or atomic load/store with acquire-release semantics) are enforced so the consumer never reads stale payload data before head is updated.",
        keyPoints: [
          "Fixed allocation eliminating runtime malloc/free jitter",
          "Power-of-two sizing for bitwise mask wrapping",
          "Lock-free SPSC concurrency mechanics",
          "Acquire and Release memory order semantics",
          "Ideal for real-time audio, networking packet queues, and IPC",
        ],
      },
      {
        id: "sys9",
        category: "Technical",
        question: "Explain the difference between a Microkernel and a Monolithic Kernel (e.g. Linux vs seL4 / Minix).",
        hint: "Kernel space components, IPC overhead vs reliability and security.",
        sampleAnswer:
          "A Monolithic Kernel (like Linux) runs all core operating system services—process scheduler, virtual memory, device drivers, filesystems, and network stacks—within a single privileged kernel address space. This provides maximum execution speed since internal calls avoid context switches, but a bug in any driver can panic the entire system. A Microkernel (like seL4 or Minix) keeps only the bare essentials in kernel space (IPC, minimal scheduling, memory virtualization), running drivers and filesystems in isolated user-space processes. This delivers extreme security and fault isolation at the cost of IPC message-passing overhead.",
        keyPoints: [
          "Monolithic: All services in privileged kernel space (high speed, single point of crash)",
          "Microkernel: Minimal kernel space, services in user space (fault isolation, security)",
          "IPC context switching performance trade-offs",
          "Formal verification in modern microkernels (seL4)",
          "Hybrid kernel approaches (macOS XNU, Windows NT)",
        ],
      },
      {
        id: "sys10",
        category: "Technical",
        question: "What is a Deadlock? How does the Banker's Algorithm ensure deadlock avoidance in operating systems?",
        hint: "Safe state vs unsafe state, allocation, max need, available resource matrices.",
        sampleAnswer:
          "A Deadlock is a state where a set of processes are blocked because each process is holding a resource and waiting for another resource held by another process in the set. Dijkstra's Banker's Algorithm simulates resource allocation to avoid deadlocks: when a process requests resources, the algorithm checks if granting them leaves the system in a 'Safe State'—a state where there exists at least one sequence of process executions that allows all processes to finish without deadlocking. If the state would become unsafe, the request is denied or deferred.",
        keyPoints: [
          "Deadlock definition and circular dependency",
          "Safe state vs Unsafe state distinction",
          "Allocation, Max Need, and Available resource vectors",
          "Simulation of worst-case resource exhaustion",
          "Why Banker's algorithm is rarely used in general-purpose OS due to dynamic unknown resource needs",
        ],
      },
      {
        id: "sys11",
        category: "Technical",
        question: "What are CPU Caches (L1, L2, L3)? Explain Spatial Locality and Temporal Locality with code examples.",
        hint: "SRAM vs DRAM, 64-byte cache lines, row-major vs column-major 2D array traversal.",
        sampleAnswer:
          "CPU caches are small, ultra-fast SRAM memory banks located on the CPU die bridging the speed gap with slower DRAM. 1. Temporal Locality: If a memory location is accessed, it will likely be accessed again soon (e.g., loop counter variable). 2. Spatial Locality: If a memory location is accessed, nearby memory locations will likely be accessed soon (e.g., sequential array traversal). Iterating a 2D array row-by-row (row-major in C) traverses contiguous cache lines, yielding ~10x higher performance than traversing column-by-column, which causes frequent cache misses.",
        keyPoints: [
          "L1, L2, L3 cache hierarchy latencies (~1ns vs ~10ns vs ~100ns RAM)",
          "64-byte cache line granularity",
          "Temporal locality (loop variables, frequently called functions)",
          "Spatial locality (contiguous array buffers)",
          "Row-major vs column-major array traversal performance disparity",
        ],
      },
      {
        id: "sys12",
        category: "Technical",
        question: "What is the difference between static linking and dynamic linking in C/C++? What are the trade-offs?",
        hint: ".a / .lib vs .so / .dll, binary size, runtime loading, shared memory.",
        sampleAnswer:
          "Static Linking (.a on Linux, .lib on Windows) copies all library machine code directly into the final executable binary at compile time. The executable is standalone and portable, but produces larger binaries and cannot share library memory across processes. Dynamic Linking (.so on Linux, .dll on Windows) links unresolved symbol references that are loaded into memory at runtime by the dynamic linker (ld.so). This reduces disk and RAM usage because multiple running processes share the exact same physical code pages in memory, and allows updating libraries without recompiling applications.",
        keyPoints: [
          "Compile-time inclusion (static) vs runtime loading (dynamic)",
          "Standalone executable portability advantages of static binaries",
          "RAM savings via shared memory code pages with dynamic libraries",
          "DLL hell and shared library ABI version mismatches",
          "Dynamic linker (ld.so) resolution overhead",
        ],
      },
      {
        id: "sys13",
        category: "Technical",
        question: "What is Direct Memory Access (DMA)? Why is it critical for high-throughput peripherals like NICs and NVMe SSDs?",
        hint: "Hardware transfers data directly to RAM without continuous CPU intervention.",
        sampleAnswer:
          "Direct Memory Access (DMA) is a hardware subsystem feature that allows peripheral devices (Network Interface Cards, NVMe SSDs, graphics cards) to transfer blocks of data directly to and from physical system RAM without continuous CPU intervention. Without DMA, the CPU would be forced to read and write every single byte via programmed I/O in a polling loop, wasting 100% of CPU cycles. With DMA, the CPU merely initiates the transfer descriptor, and the DMA controller issues an interrupt when the transfer is complete.",
        keyPoints: [
          "Bypassing CPU for bulk data transfers between peripheral and RAM",
          "Programmed I/O vs DMA performance contrast",
          "Scatter-gather DMA for non-contiguous memory buffers",
          "Cache coherency challenges during DMA transfers",
          "Enabling 100Gbps network line-rate throughput without CPU saturation",
        ],
      },
      {
        id: "sys14",
        category: "Technical",
        question: "What is an Atomic Operation? How do hardware compare-and-swap (CAS) and memory order semantics work?",
        hint: "Indivisible operation, lock cmpxchg, sequential consistency vs acquire-release.",
        sampleAnswer:
          "An atomic operation is an indivisible memory operation that executes completely without interruption by other threads or CPU cores. Hardware Compare-And-Swap (CAS, e.g. 'lock cmpxchg' on x86) atomically compares the value at a memory location with an expected value; if equal, it updates the location to a new value in a single instruction. Memory ordering semantics (relaxed, acquire-release, sequentially consistent) inform both compiler and CPU how memory reads/writes around the atomic operation can be reordered.",
        keyPoints: [
          "Indivisibility of atomic operations",
          "Hardware bus lock and cache coherence protocols (MESI)",
          "Compare-And-Swap (CAS) as basis for lock-free data structures",
          "Memory order models: Relaxed, Acquire-Release, Sequential Consistency",
          "Eliminating OS kernel context switch overhead of heavy mutexes",
        ],
      },
      {
        id: "sys15",
        category: "Technical",
        question: "What is the difference between User Space and Kernel Space in modern CPU architectures (Ring 3 vs Ring 0)?",
        hint: "Privilege rings, hardware protection, system calls, trap instructions.",
        sampleAnswer:
          "Modern CPUs enforce hardware privilege levels (rings): Kernel Space executes in Ring 0 with full, unrestricted access to the underlying hardware, CPU instructions, and physical memory. User Space executes in Ring 3 with restricted privileges—applications cannot directly interact with hardware, access other processes' memory, or execute privileged instructions. To perform hardware operations (file reads, network sockets, process spawning), user-space applications execute a Software Interrupt or 'syscall' instruction to safely transition into Ring 0.",
        keyPoints: [
          "Ring 0 (Kernel / supervisor mode) vs Ring 3 (User mode)",
          "Hardware-enforced execution privilege barriers",
          "System calls (syscall / sysenter) as controlled entry gates",
          "Protecting OS integrity from crashing user applications",
          "Context switch latency penalty between User and Kernel space",
        ],
      },
      {
        id: "sys16",
        category: "Technical",
        question: "What is a Memory Barrier (Memory Fence)? Why are they needed on weakly-ordered CPU architectures like ARM?",
        hint: "Out-of-order execution, instruction reordering by compiler and CPU, DMB instruction.",
        sampleAnswer:
          "Both compilers and modern out-of-order CPUs reorder memory read and write operations to maximize instruction pipeline efficiency, provided single-threaded correctness is preserved. In multi-threaded execution, this reordering can cause catastrophic race conditions where a data payload is read before the 'ready' flag is published. A Memory Barrier (or Fence, e.g. DMB on ARM, MFENCE on x86) forces the compiler and CPU to ensure all prior memory operations complete before any subsequent memory operations are executed.",
        keyPoints: [
          "Out-of-order CPU execution and compiler optimization reordering",
          "Weakly ordered (ARM) vs strongly ordered (x86 TSO) architectures",
          "Read fences, Write fences, and Full fences",
          "Preventing stale payload visibility across cores",
          "std::atomic_thread_fence in C++11",
        ],
      },
      {
        id: "sys17",
        category: "Technical",
        question: "What is the difference between malloc(), calloc(), realloc(), and free() in C? What happens under the hood via sbrk() and mmap()?",
        hint: "Initialization to zero, resizing buffers, brk pointer expansion vs anonymous mmap pages.",
        sampleAnswer:
          "1. malloc(size): Allocates uninitialized heap memory. 2. calloc(n, size): Allocates and zeroes out memory. 3. realloc(ptr, size): Resizes existing block, relocating and copying if necessary. 4. free(ptr): Returns block to memory allocator. Under the hood, glibc malloc uses: 'brk()' / 'sbrk()' for small allocations by moving the heap break pointer upwards; and 'mmap()' for large allocations (>128KB) to allocate dedicated anonymous virtual memory pages directly from the kernel, which are returned immediately to the OS upon free().",
        keyPoints: [
          "malloc uninitialized vs calloc zeroed memory",
          "realloc in-place expansion vs relocation copying",
          "brk() system call expanding data segment break pointer",
          "mmap() for large allocations (>128KB) avoiding fragmentation",
          "Internal allocator free-lists and metadata chunk headers",
        ],
      },
      {
        id: "sys18",
        category: "Technical",
        question: "What is a Watchdog Timer in embedded systems? How does it recover an unresponsive micro-controller?",
        hint: "Hardware countdown timer, kicking the dog, automatic system reset.",
        sampleAnswer:
          "A Watchdog Timer is an independent hardware countdown timer that automatically resets the microcontroller or processor if it reaches zero. During normal operation, the main application loop must periodically 'pet' or 'kick' the watchdog timer to reset its countdown before it expires. If the software deadlocks, enters an infinite loop, or hangs on an unresponsive bus, the watchdog reaches zero and asserts a hardware reset signal, recovering the embedded device without manual human intervention.",
        keyPoints: [
          "Independent hardware countdown timer mechanism",
          "Periodic watchdog resetting ('petting the dog') in main loop",
          "Automatic hardware reboot on software freeze or deadlock",
          "Windowed Watchdog Timers preventing premature resets",
          "Critical importance in automotive, aerospace, and remote IoT systems",
        ],
      },
      {
        id: "sys19",
        category: "Technical",
        question: "Explain the difference between Hard Real-Time and Soft Real-Time operating systems (RTOS).",
        hint: "Deterministic deadline guarantees vs best-effort throughput, FreeRTOS vs standard Linux.",
        sampleAnswer:
          "1. Hard Real-Time: Missing a single timing deadline constitutes a catastrophic system failure (e.g., automotive airbag deployment, flight control fly-by-wire, pacemaker telemetry). The RTOS (e.g., FreeRTOS, QNX, VxWorks) guarantees deterministic worst-case execution time (WCET). 2. Soft Real-Time: Missing a deadline degrades performance or quality of service, but does not cause system failure (e.g., video streaming buffering, audio playback, online gaming).",
        keyPoints: [
          "Deterministic response guarantees vs best-effort throughput",
          "Worst-Case Execution Time (WCET) predictability",
          "Catastrophic failure consequence in hard real-time",
          "RTOS preemptive priority-based scheduling",
          "Why standard Linux is soft real-time without PREEMPT_RT patch",
        ],
      },
      {
        id: "sys20",
        category: "Technical",
        question: "What is Address Space Layout Randomization (ASLR)? How does it defend against buffer overflow exploits?",
        hint: "Randomizing stack, heap, and library base addresses to prevent Return-Oriented Programming (ROP).",
        sampleAnswer:
          "ASLR is a kernel security defense that randomly arranges the memory address space positions of key data areas—including the base of the executable, stack, heap, and linked libraries (libc)—every time a program launches. In a traditional buffer overflow attack, an attacker overwrites the return address with a hardcoded pointer to injected shellcode or a known libc function. With ASLR enabled, memory addresses change randomly on every execution, causing hardcoded exploit payloads to crash with SIGSEGV rather than execute.",
        keyPoints: [
          "Randomizing base addresses of stack, heap, and libraries",
          "Neutralizing hardcoded address return-to-libc attacks",
          "Position Independent Executables (PIE) requirement",
          "Bypassing ASLR via memory leak information disclosures",
          "Combining with Data Execution Prevention (DEP / NX bit)",
        ],
      },
      {
        id: "sys21",
        category: "Technical",
        question: "What is the difference between Polling and Interrupt-Driven I/O? When is polling actually faster?",
        hint: "Busy-wait CPU cycles vs hardware interrupt overhead, high-throughput network packets (DPDK).",
        sampleAnswer:
          "Interrupt-driven I/O allows the CPU to execute other tasks until hardware asserts an interrupt signal indicating data is ready. This is efficient for sporadic, low-frequency devices (keyboards, sensors). Polling repeatedly checks a hardware register status flag in a loop. While polling burns CPU cycles during idle periods, polling is actually faster for ultra-high-throughput, continuous data streams (e.g., 100Gbps network cards using DPDK) because it eliminates the high overhead of interrupt context switching and CPU pipeline flushes.",
        keyPoints: [
          "Busy-waiting vs event-driven hardware interrupt signaling",
          "Interrupt context switch and TLB latency penalty",
          "Why polling is superior in ultra-high packet rate networking (DPDK)",
          "NAPI (New API) hybrid polling in Linux network drivers",
          "Power consumption trade-offs on battery-operated embedded devices",
        ],
      },
      {
        id: "sys22",
        category: "Technical",
        question: "What is an Undefined Behavior (UB) in C/C++? Give three dangerous examples.",
        hint: "Compilers can optimize assuming UB never occurs; signed overflow, NULL dereference, out-of-bounds.",
        sampleAnswer:
          "Undefined Behavior (UB) occurs when code violates C/C++ language specifications. The standard imposes no requirements; the compiler is legally permitted to optimize under the assumption that UB never happens, leading to dead code elimination, silent security vulnerabilities, or program crashes. Three dangerous examples: 1. Signed integer overflow (e.g. `int x = INT_MAX + 1`). 2. Dereferencing a NULL or dangling pointer. 3. Accessing an array out-of-bounds. Compilers can literally delete security boundary checks if they believe an earlier line implied UB.",
        keyPoints: [
          "Definition: Language specification permits arbitrary compiler assumptions",
          "Signed integer overflow vs unsigned wrapping",
          "Compilers deleting security bounds checks due to UB assumptions",
          "Dangling pointer dereferences and use-after-free",
          "Detection tools: UBSan (-fsanitize=undefined)",
        ],
      },
      {
        id: "sys23",
        category: "Technical",
        question: "What is the difference between Mutex, Spinlock, and Read-Write Lock? When should you choose a Spinlock?",
        hint: "Sleeping thread vs busy-waiting in a loop, short critical sections on multi-core CPUs.",
        sampleAnswer:
          "A Mutex puts the waiting thread to sleep if the lock is held, yielding the CPU to other threads (incurring two context switches). A Spinlock busy-waits in a tight CPU loop until the lock becomes available, consuming 100% CPU on that core while waiting. A Read-Write Lock allows multiple concurrent readers, but exclusive access to a single writer. Choose a Spinlock when the critical section is guaranteed to be extremely short (a few CPU cycles) on a multi-core processor, because busy-waiting for 10 nanoseconds is significantly faster than a 2-microsecond OS context switch.",
        keyPoints: [
          "Mutex puts thread to sleep; spinlock busy-waits in a CPU loop",
          "Spinlocks are disastrous on single-core systems (deadlock risk)",
          "Optimal for microsecond critical sections on multi-core systems",
          "Read-Write locks for read-heavy shared data structures",
          "Risk of priority inversion with spinlocks",
        ],
      },
      {
        id: "sys24",
        category: "Technical",
        question: "What is the difference between a Shallow Copy and a Deep Copy in C/C++? How does rule of three/five apply?",
        hint: "Copying pointer address vs allocating new memory buffer, copy constructor, destructor.",
        sampleAnswer:
          "A Shallow Copy duplicates the member values of an object; for pointer members, it copies only the pointer memory address, resulting in two objects pointing to the exact same heap memory block (causing double-free crashes upon destruction). A Deep Copy allocates a new heap memory buffer and duplicates the underlying data content. In C++, the Rule of Five dictates that if a class defines a custom Destructor, Copy Constructor, Copy Assignment, Move Constructor, or Move Assignment, it must implement all five to manage dynamic resources safely.",
        keyPoints: [
          "Shallow copy pointer aliasing and double-free hazard",
          "Deep copy allocating independent heap buffers",
          "Rule of Three (Destructor, Copy Constructor, Copy Assignment)",
          "Rule of Five (incorporating C++11 Move Semantics)",
          "std::unique_ptr for automatic move-only ownership semantics",
        ],
      },
      {
        id: "sys25",
        category: "Technical",
        question: "What is the Linux Epoll mechanism? How does Epoll scale to 100,000 concurrent sockets compared to select() and poll()?",
        hint: "O(1) event readiness notification vs O(n) linear file descriptor scanning.",
        sampleAnswer:
          "Select() and Poll() take O(n) time because the application must pass an entire list of file descriptors to the kernel on every call, and the kernel linearly scans all of them to check readiness. Epoll creates an in-kernel event poll table backed by a Red-Black Tree (to store registered sockets) and a Ready List linked list. When a socket receives network packets, hardware interrupts trigger callback functions that place only the ready sockets onto the ready list. Epoll_wait() returns in O(number of active events) rather than O(total connections), effortlessly scaling to 100,000+ sockets (C10K problem).",
        keyPoints: [
          "select() and poll() O(n) linear scanning bottleneck",
          "Epoll in-kernel Red-Black tree for O(log n) socket registration",
          "Ready List linked list delivering O(active events) response",
          "Edge-Triggered (EPOLLET) vs Level-Triggered (EPOLLIN) modes",
          "Foundation of modern event loops (Node.js libuv, Nginx, Redis)",
        ],
      },
      {
        id: "sys26",
        category: "Technical",
        question: "What is Memory Fragmentation? Explain the difference between Internal and External Fragmentation with solutions.",
        hint: "Wasted space inside allocated block vs small scattered unallocatable free blocks.",
        sampleAnswer:
          "Internal Fragmentation occurs when memory is allocated in fixed-size blocks (e.g., 4KB page size) and the process requires less than the allocated block (e.g. asking for 500 bytes and receiving 4096 bytes—the remaining 3596 bytes are wasted inside the block). External Fragmentation occurs when free memory is broken into many small scattered fragments such that total free memory is sufficient, but no single contiguous block is large enough to satisfy an allocation request. Solutions include Paging (eliminates external fragmentation) and Slab Allocators.",
        keyPoints: [
          "Internal fragmentation: Wasted space inside allocated chunk",
          "External fragmentation: Scattered non-contiguous free memory",
          "Paging hardware eliminating external physical fragmentation",
          "Slab / Buddy allocators managing fixed-size object pools",
          "Memory compaction techniques",
        ],
      },
      {
        id: "sys27",
        category: "Technical",
        question: "What is a Function Pointer in C? What is its syntax, and how is it used to implement callbacks and vtables?",
        hint: "int (*func_ptr)(int, int), event callbacks, simulating C++ polymorphism in pure C.",
        sampleAnswer:
          "A function pointer stores the memory address of an executable function in the text segment. Syntax: `int (*operation)(int, int);`. It enables dynamic runtime function dispatching and callbacks (e.g., passing a custom comparator to standard library `qsort()`). In object-oriented C and Linux kernel drivers, struct instances contain tables of function pointers (e.g., `struct file_operations { read, write, open, release };`), simulating C++ virtual method tables (vtables) and dynamic runtime polymorphism in pure C.",
        keyPoints: [
          "Storing code text segment addresses in pointer variables",
          "Syntax declaration: return_type (*ptr_name)(param_types)",
          "Callback implementations (e.g., qsort comparator)",
          "Linux kernel struct file_operations driver interfaces",
          "Simulating C++ vtables and polymorphism in pure C",
        ],
      },
      {
        id: "sys28",
        category: "Technical",
        question: "What is a Translation Lookaside Buffer (TLB)? Explain TLB shootdown in multi-core processors.",
        hint: "Hardware cache of page table translations, inter-processor interrupt (IPI) on page unmapping.",
        sampleAnswer:
          "The Translation Lookaside Buffer (TLB) is an ultra-fast hardware cache in the MMU that stores recent virtual-to-physical address page translations. When a page table entry is modified or unmapped on one CPU core (e.g. during free() or page eviction), the cached translation on other CPU cores becomes stale. The kernel must trigger a 'TLB Shootdown': it broadcasts Inter-Processor Interrupts (IPI) to all other CPU cores running threads of that process, forcing them to flush their local TLB entries before continuing execution.",
        keyPoints: [
          "Hardware cache for virtual-to-physical address translations",
          "Massive latency savings (1 cycle vs 100 cycles page walk)",
          "TLB Shootdown trigger upon page unmapping or permission change",
          "Inter-Processor Interrupts (IPI) multi-core overhead",
          "HugePages (2MB / 1GB) to reduce TLB footprint and misses",
        ],
      },
      {
        id: "sys29",
        category: "Technical",
        question: "What is the difference between reentrant and thread-safe functions in C?",
        hint: "Can be interrupted safely mid-execution (signals/recursion) vs protected by locks against concurrent threads.",
        sampleAnswer:
          "A thread-safe function can be safely invoked concurrently by multiple threads, typically by guarding shared state using mutexes or thread-local storage. A reentrant function can be safely interrupted mid-execution (by an interrupt, signal handler, or recursive call) and re-invoked without corrupting its state. All reentrant functions that rely strictly on local stack variables and parameters are thread-safe, but a thread-safe function that uses mutexes is NOT reentrant because a signal handler interrupting the mutex-holding thread would attempt to re-lock the mutex, causing an immediate deadlock.",
        keyPoints: [
          "Thread-safe: Safe across concurrent threads (often using locks)",
          "Reentrant: Safe to interrupt and re-enter mid-execution (signal handlers)",
          "Why mutex-based thread-safe functions deadlock in signal handlers",
          "Async-signal-safe functions in POSIX specifications",
          "Relying strictly on local stack parameters",
        ],
      },
      {
        id: "sys30",
        category: "Technical",
        question: "What is Assembly in-line assembly in GCC/Clang? When is it necessary, and what are the clobber registers?",
        hint: "asm volatile (\"...\"), specific CPU instructions not exposed in C (RDTSC, CPUID).",
        sampleAnswer:
          "GCC inline assembly (`asm volatile (...)`) allows embedding raw CPU assembly instructions directly into C/C++ source code. It is necessary when executing machine instructions that have no C standard library equivalent, such as reading high-precision CPU cycle counters (RDTSC), inspecting CPU capabilities (CPUID), or configuring low-level MMU control registers (CR3). The syntax includes output operands, input operands, and a 'clobbers' list informing the compiler which registers, flags, or memory were altered so it doesn't assume their values were preserved.",
        keyPoints: [
          "Embedding architecture-specific machine instructions in C",
          "Executing hardware instructions (RDTSC, CPUID, WFI, CLI)",
          "Extended assembly syntax: asm(code : outputs : inputs : clobbers)",
          "Clobber list preventing compiler register corruption",
          "Portability trade-offs and preferring compiler intrinsics when available",
        ],
      },
    ],
  },
];
