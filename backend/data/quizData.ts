export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correct: number; // index of correct option (0-indexed)
  explanation: string;
  difficulty?: "Easy" | "Medium" | "Hard" | "Extreme";
  codeSnippet?: string;
};

export type QuizTopic = {
  id: string;
  title: string;
  emoji: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Extreme" | "Beginner" | "Intermediate" | "Advanced";
  description: string;
  questions: QuizQuestion[];
};

export const quizTopics: QuizTopic[] = [
  // ==========================================
  // LEVEL 1: EASY TOPICS
  // ==========================================
  {
    id: "c-basics",
    title: "C Programming Foundations",
    emoji: "🔵",
    difficulty: "Easy",
    description: "Fundamental syntax, variables, format specifiers, and loops in C.",
    questions: [
      {
        id: "cb1",
        question: "Which header file is required to use printf() and scanf() in C?",
        options: ["stdlib.h", "stdio.h", "string.h", "math.h"],
        correct: 1,
        explanation: "stdio.h (Standard Input/Output) defines the declarations for printf() and scanf().",
        difficulty: "Easy",
      },
      {
        id: "cb2",
        question: "What is the format specifier for printing an integer in C?",
        options: ["%f", "%c", "%d", "%s"],
        correct: 2,
        explanation: "%d (or %i) is used to format and output signed decimal integers in C.",
        difficulty: "Easy",
      },
      {
        id: "cb3",
        question: "Which loop guarantees that its body is executed at least once?",
        options: ["for loop", "while loop", "do-while loop", "nested loop"],
        correct: 2,
        explanation: "do-while evaluates the termination condition at the end of the iteration, guaranteeing at least one run.",
        difficulty: "Easy",
      },
      {
        id: "cb4",
        question: "What does the 'break' statement do inside a switch-case block?",
        options: [
          "Terminates the program immediately",
          "Exits the switch block and prevents fall-through",
          "Restarts the switch condition",
          "Skips to the default block",
        ],
        correct: 1,
        explanation: "Without 'break', execution continues into subsequent cases (fall-through behavior).",
        difficulty: "Easy",
      },
      {
        id: "cb5",
        question: "What is the return type of the main() function by standard C convention?",
        options: ["void", "int", "float", "char"],
        correct: 1,
        explanation: "Standard C specifies 'int main(void)' or 'int main(int argc, char *argv[])' returning 0 on success.",
        difficulty: "Easy",
      },
      {
        id: "cb6",
        question: "What is the correct syntax to allocate 4 bytes on the heap in C?",
        options: [
          "malloc(sizeof(int))",
          "alloc(4)",
          "new int()",
          "heap(4)",
        ],
        correct: 0,
        explanation: "malloc(sizeof(int)) from <stdlib.h> allocates the required bytes in heap memory.",
        difficulty: "Easy",
      },
      {
        id: "cb7",
        question: "Which operator is used to access the memory address of a variable?",
        options: ["*", "&", "->", "."],
        correct: 1,
        explanation: "The ampersand '&' is the address-of operator; '*' is the dereference operator.",
        difficulty: "Easy",
      },
      {
        id: "cb8",
        question: "What is the index of the first element in any C array?",
        options: ["-1", "0", "1", "Depends on declaration"],
        correct: 1,
        explanation: "C uses 0-based indexing for all arrays.",
        difficulty: "Easy",
      },
    ],
  },
  {
    id: "python-basics",
    title: "Python Core Fundamentals",
    emoji: "🐍",
    difficulty: "Easy",
    description: "Variables, lists, dictionaries, slicing, and functions in Python.",
    questions: [
      {
        id: "py1",
        question: "Which data structure in Python is mutable and ordered?",
        options: ["Tuple", "List", "Set", "FrozenSet"],
        correct: 1,
        explanation: "Lists are ordered and mutable. Tuples are immutable; Sets are unordered.",
        difficulty: "Easy",
      },
      {
        id: "py2",
        question: "What is the output of len({'a': 1, 'b': 2, 'a': 3}) in Python?",
        options: ["3", "2", "1", "SyntaxError"],
        correct: 1,
        explanation: "Dictionary keys must be unique. The second 'a' overwrites the first, resulting in 2 key-value pairs.",
        difficulty: "Easy",
      },
      {
        id: "py3",
        question: "What does the expression 'hello'[::-1] evaluate to?",
        options: ["'hello'", "'olleh'", "'h'", "IndexError"],
        correct: 1,
        explanation: "The slice step of -1 reverses the sequence in Python.",
        difficulty: "Easy",
      },
      {
        id: "py4",
        question: "Which keyword is used to create a generator function in Python?",
        options: ["return", "yield", "generator", "produce"],
        correct: 1,
        explanation: "'yield' produces values lazily one at a time and maintains execution state.",
        difficulty: "Easy",
      },
      {
        id: "py5",
        question: "What is the default return value of a Python function that lacks a return statement?",
        options: ["0", "False", "None", "undefined"],
        correct: 2,
        explanation: "In Python, functions without an explicit return statement return None by default.",
        difficulty: "Easy",
      },
      {
        id: "py6",
        question: "Which operator performs floor division in Python?",
        options: ["/", "//", "%", "^"],
        correct: 1,
        explanation: "// performs integer floor division, truncating fractional digits.",
        difficulty: "Easy",
      },
    ],
  },

  // ==========================================
  // LEVEL 2: MEDIUM TOPICS
  // ==========================================
  {
    id: "data-structures",
    title: "Data Structures & Complexity",
    emoji: "🌲",
    difficulty: "Medium",
    description: "Stacks, queues, linked lists, trees, heaps, and asymptotic Big-O analysis.",
    questions: [
      {
        id: "ds1",
        question: "Which data structure operates on a LIFO (Last In First Out) principle?",
        options: ["Queue", "Stack", "Linked List", "Priority Queue"],
        correct: 1,
        explanation: "A Stack follows LIFO. The last item pushed is the first item popped.",
        difficulty: "Medium",
      },
      {
        id: "ds2",
        question: "What is the worst-case time complexity of quicksort?",
        options: ["O(n log n)", "O(n²)", "O(n)", "O(log n)"],
        correct: 1,
        explanation: "Quicksort degrades to O(n²) when the pivot selection consistently yields unbalanced partitions.",
        difficulty: "Medium",
      },
      {
        id: "ds3",
        question: "What is the time complexity of searching an element in a balanced Binary Search Tree (AVL/Red-Black)?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        correct: 1,
        explanation: "Balanced BSTs guarantee height h = O(log n), so lookups take O(log n) time.",
        difficulty: "Medium",
      },
      {
        id: "ds4",
        question: "In a min-heap, where is the smallest element always located?",
        options: ["At any leaf node", "At the root", "At the bottom right", "In the left subtree"],
        correct: 1,
        explanation: "By the min-heap property, the parent node is always <= its children, keeping the minimum at index 0 (the root).",
        difficulty: "Medium",
      },
      {
        id: "ds5",
        question: "What is the space complexity of an in-place array reversal using two pointers?",
        options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
        correct: 2,
        explanation: "Only two pointer variables are allocated, requiring O(1) auxiliary space.",
        difficulty: "Medium",
      },
      {
        id: "ds6",
        question: "Which algorithm finds the shortest path in a graph with non-negative edge weights?",
        options: ["Kruskal's", "Dijkstra's", "Prim's", "Floyd-Warshall (all-pairs)"],
        correct: 1,
        explanation: "Dijkstra's algorithm finds single-source shortest paths on graphs with non-negative edge weights in O((V + E) log V).",
        difficulty: "Medium",
      },
      {
        id: "ds7",
        question: "What is the average time complexity of insertion into a Hash Table with good hashing?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
        correct: 0,
        explanation: "With uniform distribution and low load factor, average hash table insertion is O(1).",
        difficulty: "Medium",
      },
    ],
  },
  {
    id: "dbms",
    title: "DBMS, SQL & Normalization",
    emoji: "🗄️",
    difficulty: "Medium",
    description: "Relational queries, indexes, ACID transactions, and normalization rules.",
    questions: [
      {
        id: "db1",
        question: "Which SQL clause filters records BEFORE aggregate functions (like SUM/COUNT) are calculated?",
        options: ["HAVING", "WHERE", "ORDER BY", "GROUP BY"],
        correct: 1,
        explanation: "WHERE filters rows before aggregation; HAVING filters groups after aggregation.",
        difficulty: "Medium",
      },
      {
        id: "db2",
        question: "What does the 'I' in the ACID transaction model stand for?",
        options: ["Integrity", "Isolation", "Immutability", "Indexing"],
        correct: 1,
        explanation: "ACID stands for Atomicity, Consistency, Isolation, and Durability.",
        difficulty: "Medium",
      },
      {
        id: "db3",
        question: "Which normal form requires removing transitive functional dependencies?",
        options: ["1NF", "2NF", "3NF", "BCNF"],
        correct: 2,
        explanation: "3NF requires the table to be in 2NF and have no non-prime attribute transitively dependent on the primary key.",
        difficulty: "Medium",
      },
      {
        id: "db4",
        question: "What type of index is physically ordered on disk matching the table row order?",
        options: ["Clustered Index", "Non-Clustered Index", "Bitmap Index", "Full-Text Index"],
        correct: 0,
        explanation: "A Clustered Index dictates the physical ordering of data rows in the table. Each table can have only one clustered index.",
        difficulty: "Medium",
      },
      {
        id: "db5",
        question: "What is a 'phantom read' in SQL transaction isolation levels?",
        options: [
          "A transaction reading uncommitted changes",
          "A transaction seeing newly inserted rows matching a query condition upon re-executing",
          "Reading a row that has been deleted",
          "A deadlock error",
        ],
        correct: 1,
        explanation: "Phantom reads occur when a transaction re-runs a range query and sees new rows inserted by another committed transaction.",
        difficulty: "Medium",
      },
    ],
  },
  {
    id: "oop",
    title: "OOP & Software Architecture",
    emoji: "🧱",
    difficulty: "Medium",
    description: "Inheritance, encapsulation, polymorphism, abstraction, and SOLID principles.",
    questions: [
      {
        id: "oop1",
        question: "What does the 'L' in SOLID design principles represent?",
        options: [
          "Layered Architecture Principle",
          "Liskov Substitution Principle",
          "Loose Coupling Principle",
          "Linear Inheritance Principle",
        ],
        correct: 1,
        explanation: "Liskov Substitution Principle states that derived classes must be substitutable for their base classes without altering correctness.",
        difficulty: "Medium",
      },
      {
        id: "oop2",
        question: "Which mechanism allows a method to behave differently based on the runtime object type?",
        options: ["Encapsulation", "Dynamic / Runtime Polymorphism", "Static Scoping", "Abstraction"],
        correct: 1,
        explanation: "Runtime polymorphism (virtual methods / overriding) resolves method execution based on the actual object at runtime.",
        difficulty: "Medium",
      },
      {
        id: "oop3",
        question: "What design pattern ensures a class has only one instance and provides a global access point to it?",
        options: ["Factory Method", "Singleton", "Adapter", "Observer"],
        correct: 1,
        explanation: "The Singleton pattern restricts instantiation of a class to one single instance.",
        difficulty: "Medium",
      },
      {
        id: "oop4",
        question: "In OOP, what is the key difference between an Interface and an Abstract Class?",
        options: [
          "An abstract class can hold instance state/member variables, while a pure interface cannot",
          "An interface can be instantiated directly",
          "Abstract classes cannot have any concrete methods",
          "Interfaces only support private methods",
        ],
        correct: 0,
        explanation: "Abstract classes can hold state (member variables) and constructor logic; interfaces define contracts of behavior.",
        difficulty: "Medium",
      },
    ],
  },

  // ==========================================
  // LEVEL 3: HARD TOPICS
  // ==========================================
  {
    id: "os-concurrency",
    title: "Operating Systems & Concurrency",
    emoji: "⚙️",
    difficulty: "Hard",
    description: "Virtual memory, page tables, kernel interrupts, semaphores, race conditions, and deadlocks.",
    questions: [
      {
        id: "os1",
        question: "What are the four necessary Coffman conditions for a deadlock to occur?",
        options: [
          "Mutual exclusion, Hold and wait, No preemption, Circular wait",
          "Starvation, Priority inversion, Thrashing, Page fault",
          "Context switch, Thread migration, Cache miss, Semaphore lock",
          "Fork, Exec, Wait, Exit",
        ],
        correct: 0,
        explanation: "Coffman conditions: Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait. Breaking any one prevents deadlocks.",
        difficulty: "Hard",
      },
      {
        id: "os2",
        question: "What happens during a Translation Lookaside Buffer (TLB) miss?",
        options: [
          "The CPU halts execution immediately",
          "The MMU performs a hardware page table walk in main memory",
          "A kernel panic occurs",
          "The process is terminated with SIGSEGV",
        ],
        correct: 1,
        explanation: "A TLB miss triggers a page table walk (in hardware or OS trap) to look up the virtual-to-physical address mapping in RAM.",
        difficulty: "Hard",
      },
      {
        id: "os3",
        question: "What is 'thrashing' in an operating system virtual memory system?",
        options: [
          "When multiple threads compete for a single CPU core",
          "When the OS spends more time swapping pages in/out of disk than executing processes",
          "When a hard drive suffers physical head collision",
          "When processes enter an infinite loop",
        ],
        correct: 1,
        explanation: "Thrashing occurs when total working set sizes exceed physical RAM, causing constant page fault disk I/O.",
        difficulty: "Hard",
      },
      {
        id: "os4",
        question: "What is the key difference between a Mutex and a Binary Semaphore?",
        options: [
          "A mutex has ownership semantics (only the locking thread can unlock it), while a semaphore can be signaled by any thread",
          "A semaphore can only run in user space",
          "A mutex cannot prevent race conditions",
          "A binary semaphore supports priority inheritance automatically",
        ],
        correct: 0,
        explanation: "A Mutex enforces thread ownership (must be unlocked by the thread that acquired it). Semaphores are signaling mechanisms.",
        difficulty: "Hard",
      },
      {
        id: "os5",
        question: "What is the Copy-on-Write (CoW) technique used in modern fork() system calls?",
        options: [
          "Duplicating all RAM memory immediately upon fork()",
          "Sharing parent and child memory pages as read-only until either process attempts a write",
          "Writing memory directly to disk backup",
          "Executing child process in kernel space",
        ],
        correct: 1,
        explanation: "CoW marks pages read-only. When either process writes, a hardware page fault triggers the OS to copy only that specific page.",
        difficulty: "Hard",
      },
      {
        id: "os6",
        question: "What is priority inversion and how is it resolved in real-time operating systems?",
        options: [
          "When a high-priority task is blocked by a low-priority task holding a shared resource; solved via Priority Inheritance",
          "When tasks run backwards in the scheduler queue; solved by resetting ticks",
          "When background daemon tasks take over CPU; solved by SIGKILL",
          "When timer interrupts fail; solved by watchdog reset",
        ],
        correct: 0,
        explanation: "Priority Inheritance temporarily elevates the low-priority thread to the priority of the waiting high-priority thread.",
        difficulty: "Hard",
      },
    ],
  },
  {
    id: "networking-security",
    title: "Computer Networks & Security",
    emoji: "🌐",
    difficulty: "Hard",
    description: "TCP/IP handshake, HTTP/2 & HTTP/3 (QUIC), TLS 1.3, DNS, and modern web security.",
    questions: [
      {
        id: "net1",
        question: "Why does HTTP/3 utilize UDP and QUIC instead of standard TCP?",
        options: [
          "To eliminate Head-of-Line (HoL) blocking across independent multiplexed streams and accelerate handshakes",
          "Because UDP supports automatic hardware encryption",
          "Because TCP cannot transmit JSON data",
          "Because UDP packets are never lost",
        ],
        correct: 0,
        explanation: "In TCP, a dropped packet stalls all streams on the connection (Head-of-Line blocking). QUIC over UDP multiplexes streams independently.",
        difficulty: "Hard",
      },
      {
        id: "net2",
        question: "What is the round-trip handshake time for TLS 1.3 resumption compared to TLS 1.2?",
        options: [
          "TLS 1.3 supports 0-RTT resumption compared to 2-RTT in legacy TLS",
          "TLS 1.3 requires 3 round trips",
          "Both require exactly 1 round trip",
          "TLS 1.3 does not support session resumption",
        ],
        correct: 0,
        explanation: "TLS 1.3 allows 1-RTT initial handshakes and 0-RTT session resumption using pre-shared keys (PSK).",
        difficulty: "Hard",
      },
      {
        id: "net3",
        question: "What security header prevents Clickjacking attacks by forbidding iframe embedding?",
        options: [
          "X-Frame-Options: DENY / CSP frame-ancestors 'none'",
          "Strict-Transport-Security (HSTS)",
          "Access-Control-Allow-Origin: *",
          "Cache-Control: no-store",
        ],
        correct: 0,
        explanation: "X-Frame-Options: DENY and Content-Security-Policy (CSP) frame-ancestors prevent malicious sites from framing the page.",
        difficulty: "Hard",
      },
      {
        id: "net4",
        question: "In TCP flow control, what is the purpose of the Sliding Window mechanism?",
        options: [
          "Allows the receiver to throttle the sender based on its current available buffer space",
          "Encrypts data packets using rotating keys",
          "Routes packets through alternate network paths",
          "Prevents SYN flood attacks",
        ],
        correct: 0,
        explanation: "The TCP receive window (rwnd) advertises how many bytes the receiver can accept before its buffer overflows.",
        difficulty: "Hard",
      },
    ],
  },

  // ==========================================
  // LEVEL 4: EXTREME TOPICS
  // ==========================================
  {
    id: "kernel-systems",
    title: "Deep Systems, Kernel & Assembly",
    emoji: "⚡",
    difficulty: "Extreme",
    description: "x86-64 assembly, CPU cache lines, epoll edge-triggering, memory barriers, and lock-free CAS.",
    questions: [
      {
        id: "ext1",
        question: "What is the typical size of a modern x86 CPU cache line, and what hazard occurs when two cores write to different variables on the same line?",
        options: [
          "64 bytes; False Sharing",
          "16 bytes; Cache Poisoning",
          "128 bytes; Memory Leaking",
          "32 bytes; Branch Misprediction",
        ],
        correct: 0,
        explanation: "CPU cache lines are 64 bytes. When two threads on separate cores write to unrelated variables sharing the same cache line, the CPU constantly invalidates L1/L2 caches (False Sharing).",
        difficulty: "Extreme",
      },
      {
        id: "ext2",
        question: "In Linux epoll, what is the key difference between Level-Triggered (LT) and Edge-Triggered (ET) mode?",
        options: [
          "ET only notifies when the file descriptor changes state (e.g., from unreadable to readable); you must read in a loop until EAGAIN",
          "LT is only supported for UDP sockets",
          "ET does not support non-blocking I/O",
          "LT terminates the socket after one event",
        ],
        correct: 0,
        explanation: "Edge-Triggered (EPOLLET) delivers an event only upon state transitions. The program must drain the buffer using a non-blocking loop until EAGAIN/EWOULDBLOCK.",
        difficulty: "Extreme",
      },
      {
        id: "ext3",
        question: "What is the ABA problem in lock-free concurrent programming using Compare-And-Swap (CAS)?",
        options: [
          "A value changes from A to B and back to A, causing a CAS to succeed even though the underlying state/pointer was modified",
          "A deadlock caused by alphabetical thread names",
          "An infinite loop in memory barriers",
          "CPU branch predictor choosing incorrect branch",
        ],
        correct: 0,
        explanation: "If thread 1 reads value A, thread 2 changes A to B then back to A (e.g. recycled pointer node), thread 1's CAS succeeds unaware of intermediate deallocations.",
        difficulty: "Extreme",
      },
      {
        id: "ext4",
        question: "What CPU assembly instruction is commonly generated to enforce a sequential consistency memory barrier on x86-64?",
        options: ["MFENCE / LOCK prefix", "NOP", "MOV RAX, RBX", "HLT"],
        correct: 0,
        explanation: "MFENCE (or instructions with the LOCK prefix like 'lock cmpxchg' or 'lock add') acts as a full compiler and hardware memory barrier.",
        difficulty: "Extreme",
      },
      {
        id: "ext5",
        question: "Why do high-throughput storage engines (e.g., RocksDB, Cassandra) use LSM Trees instead of B-Trees for write-heavy workloads?",
        options: [
          "LSM Trees turn random disk writes into sequential append-only disk writes (MemTable + WAL -> SSTables)",
          "B-Trees cannot store binary data",
          "LSM Trees use 0 bytes of memory",
          "LSM Trees eliminate compaction",
        ],
        correct: 0,
        explanation: "LSM Trees buffer writes in memory (MemTable) and sequentially flush immutable SSTables to disk, converting random I/O into fast sequential I/O.",
        difficulty: "Extreme",
      },
      {
        id: "ext6",
        question: "In the Raft consensus algorithm, how is the 'Split Vote' scenario prevented or resolved during leader elections?",
        options: [
          "Using randomized election timeouts (e.g. 150ms-300ms) for each follower",
          "By letting the node with the highest IP address automatically win",
          "By querying a centralized coordinator",
          "By restarting all nodes immediately",
        ],
        correct: 0,
        explanation: "Randomized election timeouts ensure candidates rarely start elections at the exact same millisecond, breaking symmetrical split vote deadlocks.",
        difficulty: "Extreme",
      },
    ],
  },
  {
    id: "system-design-extreme",
    title: "High-Scale Distributed System Design",
    emoji: "🛰️",
    difficulty: "Extreme",
    description: "CAP theorem, Paxos/Raft, Consistent Hashing, Distributed Tracing, and Eventual Consistency.",
    questions: [
      {
        id: "sd1",
        question: "In Consistent Hashing with virtual nodes (tokens), what problem do virtual nodes solve?",
        options: [
          "Non-uniform key distribution (hot spots) across physical cache servers",
          "High network encryption overhead",
          "Cross-Site Scripting (XSS)",
          "Preventing SQL injection",
        ],
        correct: 0,
        explanation: "Assigning multiple virtual tokens per physical node spreads keys uniformly across the hash ring, preventing load hotspots.",
        difficulty: "Extreme",
      },
      {
        id: "sd2",
        question: "According to the CAP Theorem, when a network partition (P) occurs, what choice must a distributed system make?",
        options: [
          "Choose between Consistency (C) and Availability (A)",
          "Choose between Performance and Scalability",
          "Choose between Speed and Security",
          "Partitions can be avoided completely with fiber optic cables",
        ],
        correct: 0,
        explanation: "During a network partition, you can either return errors/stall to maintain Consistency (CP), or return stale data to remain Available (AP).",
        difficulty: "Extreme",
      },
      {
        id: "sd3",
        question: "How does the Two-Phase Commit (2PC) protocol handle a coordinator crash during the prepare phase?",
        options: [
          "Participants block indefinitely until the coordinator recovers or an election elects a new coordinator",
          "All participants immediately commit",
          "The database deletes all tables",
          "Transactions are converted to NoSQL",
        ],
        correct: 0,
        explanation: "2PC is a blocking protocol. If the coordinator crashes after nodes vote 'prepared', participants hold locks and wait, causing potential stalls.",
        difficulty: "Extreme",
      },
      {
        id: "sd4",
        question: "What is the purpose of Vector Clocks in decentralized databases like Amazon DynamoDB?",
        options: [
          "To detect concurrent updates and determine causal ordering of data versions without synchronized clocks",
          "To measure CPU temperature",
          "To accelerate vector embeddings for AI models",
          "To encrypt network traffic",
        ],
        correct: 0,
        explanation: "Vector clocks track causality across distributed nodes without relying on synchronized wall-clock times, identifying concurrent conflicting writes.",
        difficulty: "Extreme",
      },
    ],
  },
];
