"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import PaywallGate from "@/components/PaywallGate";
import BrandLogo from "@/components/BrandLogo";
import MobileNav from "@/components/MobileNav";
import AmbientBackground from "@/components/AmbientBackground";
import { getMilestonePerformance } from "@/lib/progress";

// ── Milestone Interface ───────────────────────────────────────────────────
export interface JourneyMilestone {
  id: number;
  title: string;
  shortTitle: string;
  stageId: number;
  stageName: string;
  stageYear: string;
  stageIcon: string;
  isCapstone: boolean;
  icon: string;
  whatYouLearn: string[];
  beginnerAnalogy: string;
  commonPitfall: string;
  placementImportance: string;
  keySkills: string[];
  lessonSlug?: string;
}

// ── 20 Milestones Organized Across 4 Academic Journey Stages ─────────────
const JOURNEY_MILESTONES: JourneyMilestone[] = [
  // ── Stage 1: The Root System (Year 1 Freshman Foundations) ──────────────
  {
    id: 1,
    title: "Algorithmic Logic & Flowcharts",
    shortTitle: "Logic & Flowcharts",
    stageId: 1,
    stageName: "The Root System",
    stageYear: "Year 1 • Freshman Foundations",
    stageIcon: "🌱",
    isCapstone: false,
    icon: "🧭",
    whatYouLearn: [
      "Deconstructing complex human problems into sequential, unambiguous instructions",
      "Standard flowchart modeling: start/terminal, input/output, processing, and decision diamonds",
      "Drafting clean pseudocode before typing any language-specific syntax",
      "Dry-running test inputs on paper with variable tracing tables"
    ],
    beginnerAnalogy: "Writing code is like writing a foolproof cooking recipe. If you say 'bake the cake' without specifying temperature or time, the kitchen fails. Computers need every step explicitly spelled out.",
    commonPitfall: "Jumping directly into typing syntax before figuring out the step-by-step logic on a piece of paper.",
    placementImportance: "Foundational. Interviewers in technical rounds first ask you to verbally explain your step-by-step approach before letting you write a single line of code.",
    keySkills: ["Pseudocode", "Flowcharts", "Dry-Running", "Decomposition"],
    lessonSlug: "c-foundations-syntax"
  },
  {
    id: 2,
    title: "C Syntax, Memory Types & Variables",
    shortTitle: "Data Types & Memory",
    stageId: 1,
    stageName: "The Root System",
    stageYear: "Year 1 • Freshman Foundations",
    stageIcon: "🌱",
    isCapstone: false,
    icon: "📦",
    whatYouLearn: [
      "How C compiles directly into native machine instructions via GCC/Clang",
      "Primary data types: int (4 bytes), char (1 byte), float, and double with exact byte limits",
      "Matching format specifiers in printf and scanf (%d, %c, %f, %s)",
      "Integer overflow and what happens when variables exceed their maximum bit capacity"
    ],
    beginnerAnalogy: "Variables are labeled storage boxes in RAM. An 'int' box fits 4 bytes of integer numbers, while a 'char' box holds only 1 byte letter. You cannot cram a giant word into a single char box.",
    commonPitfall: "Forgetting the '&' address-of operator in scanf, which causes the program to crash immediately with a Segmentation Fault.",
    placementImportance: "Every service and product company technical round tests your understanding of data type limits and bit representation.",
    keySkills: ["C Syntax", "printf / scanf", "Data Types", "Bit Widths"],
    lessonSlug: "c-foundations-syntax"
  },
  {
    id: 3,
    title: "Conditionals & Decision Branching",
    shortTitle: "Conditionals",
    stageId: 1,
    stageName: "The Root System",
    stageYear: "Year 1 • Freshman Foundations",
    stageIcon: "🌱",
    isCapstone: false,
    icon: "🔀",
    whatYouLearn: [
      "Mastering if, else if, and else branching logic for multifaceted scenarios",
      "Boolean logical operators: AND (&&), OR (||), and NOT (!) with short-circuit evaluation",
      "Switch-case statements and jump tables vs chained if-else blocks",
      "Ternary operator (? :) for concise, clean conditional expressions"
    ],
    beginnerAnalogy: "Conditionals are like a railway track switch. Depending on whether a condition is true or false, the train smoothly switches to Track A or Track B.",
    commonPitfall: "Accidentally writing 'if (x = 5)' (assignment) instead of 'if (x == 5)' (comparison), which always evaluates to true in C!",
    placementImportance: "Critical for handling edge cases and boundary inputs in technical assessments.",
    keySkills: ["if / else", "switch-case", "Boolean Algebra", "Short-Circuit Eval"],
    lessonSlug: "c-control-flow-loops"
  },
  {
    id: 4,
    title: "Loops & Iteration Control",
    shortTitle: "Loops & Iteration",
    stageId: 1,
    stageName: "The Root System",
    stageYear: "Year 1 • Freshman Foundations",
    stageIcon: "🌱",
    isCapstone: false,
    icon: "🔁",
    whatYouLearn: [
      "The anatomy of loops: initialization, condition test, body execution, and counter updates",
      "When to use for loops (known counts) vs while loops (event-driven) vs do-while loops",
      "Controlling loop flow safely with break and continue statements",
      "Nested loops and printing 2D coordinate patterns without off-by-one errors"
    ],
    beginnerAnalogy: "A loop is like a running track coach telling you: 'Start at lap 1; as long as lap is under 10, run the lap and increase the lap count by 1.'",
    commonPitfall: "Writing loop updates that never meet the terminating condition, locking the CPU core in an infinite loop.",
    placementImportance: "85% of beginner coding tests ask for nested pattern problems and array iterations to verify basic logic agility.",
    keySkills: ["for loops", "while loops", "Nested Patterns", "Off-by-one Prevention"],
    lessonSlug: "c-control-flow-loops"
  },
  {
    id: 5,
    title: "Modular Functions & The Call Stack",
    shortTitle: "Functions Capstone",
    stageId: 1,
    stageName: "The Root System",
    stageYear: "Year 1 • Freshman Foundations",
    stageIcon: "🌱",
    isCapstone: true,
    icon: "🎓",
    whatYouLearn: [
      "Dividing monolithic code into modular, reusable, single-responsibility functions",
      "Function signatures, parameters, return types, and forward declarations/prototypes",
      "Understanding the Call Stack: how local variables get pushed and popped during execution",
      "Pass-by-value vs pass-by-reference fundamentals and variable scope boundaries"
    ],
    beginnerAnalogy: "Functions are like specialized kitchen appliances. The blender takes fruit (arguments), blends it inside its own closed container (local scope), and hands you a smoothie (return value).",
    commonPitfall: "Expecting changes made to a variable inside a function to affect the caller when passed by value.",
    placementImportance: "Engineering managers immediately reject candidates who write 200-line monolithic main() functions without modular helper methods.",
    keySkills: ["Call Stack", "Prototypes", "Pass-by-Value", "Scope & Lifetimes"],
    lessonSlug: "c-foundations-syntax"
  },

  // ── Stage 2: The Core Trunk (Year 2 Sophomore Core CS) ───────────────────
  {
    id: 6,
    title: "Pointers & Memory Addresses Demystified",
    shortTitle: "Pointers & RAM",
    stageId: 2,
    stageName: "The Core Trunk",
    stageYear: "Year 2 • Core CS & Systems",
    stageIcon: "⚡",
    isCapstone: false,
    icon: "🎯",
    whatYouLearn: [
      "Physical memory layout: addresses in hexadecimal (0x7ffe...) and how RAM operates",
      "The address-of operator (&) and dereference operator (*) demystified once and for all",
      "Pointer arithmetic: why ptr + 1 advances by sizeof(type) bytes rather than 1 byte",
      "NULL pointers, uninitialized pointers, and debugging Segmentation Faults"
    ],
    beginnerAnalogy: "A regular variable is a house where someone lives. A pointer is a piece of paper with the house's street address written on it. Dereferencing (*) is walking to that address and opening the front door.",
    commonPitfall: "Dereferencing a NULL or uninitialized pointer (*ptr where ptr is garbage), which causes instant operating system crash.",
    placementImportance: "The single #1 differentiator between average coders and top tier engineers at Google, Microsoft, and Qualcomm.",
    keySkills: ["Pointers", "Dereferencing", "Pointer Arithmetic", "Hex Addresses"],
    lessonSlug: "c-pointers-memory"
  },
  {
    id: 7,
    title: "Dynamic Heap Allocation (malloc & free)",
    shortTitle: "malloc & Heap",
    stageId: 2,
    stageName: "The Core Trunk",
    stageYear: "Year 2 • Core CS & Systems",
    stageIcon: "⚡",
    isCapstone: false,
    icon: "🧱",
    whatYouLearn: [
      "The fundamental difference between Stack (automatic, fast, fixed) and Heap (dynamic, manual)",
      "Allocating memory at runtime using malloc(), calloc(), and realloc()",
      "Preventing severe Memory Leaks by pairing every allocation with a corresponding free()",
      "Dangling pointers: why you must set ptr = NULL after freeing allocated heap memory"
    ],
    beginnerAnalogy: "The stack is like a stack of cafeteria trays you take and put back automatically. The heap is like renting a storage unit: you request a size, store your belongings, and MUST return the key (free) or you keep paying forever.",
    commonPitfall: "Losing the pointer to allocated memory without calling free(), permanently leaking RAM until the server crashes.",
    placementImportance: "Mandatory for all systems programming, embedded devices, and backend infrastructure roles.",
    keySkills: ["Heap Memory", "malloc() / free()", "Memory Leaks", "Dangling Pointers"],
    lessonSlug: "c-pointers-memory"
  },
  {
    id: 8,
    title: "Linked Lists: Chaining Nodes in RAM",
    shortTitle: "Linked Lists",
    stageId: 2,
    stageName: "The Core Trunk",
    stageYear: "Year 2 • Core CS & Systems",
    stageIcon: "⚡",
    isCapstone: false,
    icon: "🔗",
    whatYouLearn: [
      "Why contiguous arrays fall short when inserting elements in the middle (O(N) shifts)",
      "Designing self-referential Node structs containing a value payload and a *next pointer",
      "Traversing, inserting at head/tail, and deleting nodes without breaking pointer chains",
      "Reversing a singly linked list iteratively and detecting cycles using Fast & Slow pointers"
    ],
    beginnerAnalogy: "An array is a row of assigned auditorium seats. A linked list is a treasure hunt: each clue gives you a prize and a map note pointing to where the next clue is hidden in the room.",
    commonPitfall: "Losing the head pointer or freeing a node before copying its *next pointer, destroying the entire rest of the list.",
    placementImportance: "Asked in over 90% of technical phone screens. Reversing a linked list is the classic test of pointer confidence.",
    keySkills: ["Node Structs", "Fast & Slow Pointers", "List Reversal", "Cycle Detection"],
    lessonSlug: "dsa-arrays-lists"
  },
  {
    id: 9,
    title: "Stacks & Queues (LIFO & FIFO Mechanics)",
    shortTitle: "Stacks & Queues",
    stageId: 2,
    stageName: "The Core Trunk",
    stageYear: "Year 2 • Core CS & Systems",
    stageIcon: "⚡",
    isCapstone: false,
    icon: "📚",
    whatYouLearn: [
      "Stack mechanics: Last-In-First-Out (LIFO) with push, pop, and peek in O(1) time",
      "Queue mechanics: First-In-First-Out (FIFO) with enqueue and dequeue operations",
      "Solving the iconic Valid Parentheses problem using a stack",
      "Implementing Monotonic Stacks for Next Greater Element and sliding window tracking"
    ],
    beginnerAnalogy: "A Stack is a stack of heavy plates (you take the top one you just put down). A Queue is a movie ticket line (the first person in line gets served first).",
    commonPitfall: "Popping from an empty stack without checking underflow condition, triggering a memory fault.",
    placementImportance: "Stacks and queues power undo/redo in software, browser back buttons, print job schedulers, and breadth-first search.",
    keySkills: ["LIFO / FIFO", "Monotonic Stack", "Valid Parentheses", "Buffer Queues"],
    lessonSlug: "dsa-stacks-queues"
  },
  {
    id: 10,
    title: "Binary Search Trees & Big-O Efficiency",
    shortTitle: "BST & Trees Capstone",
    stageId: 2,
    stageName: "The Core Trunk",
    stageYear: "Year 2 • Core CS & Systems",
    stageIcon: "⚡",
    isCapstone: true,
    icon: "🎓",
    whatYouLearn: [
      "Hierarchical data structures: Root, Parent, Left/Right Children, and Leaves",
      "Binary Search Trees (BST) invariant: left subtree < root < right subtree",
      "Tree traversals: Inorder (sorted!), Preorder, Postorder, and Level-Order (BFS)",
      "Calculating tree height, maximum depth, and searching in O(log N) average time"
    ],
    beginnerAnalogy: "Binary search in a phone book: open to the middle page. If the name is alphabetically smaller, throw away the entire right half! Repeat until found in just 10 quick steps out of 1,000 pages.",
    commonPitfall: "Unbalanced BSTs degenerating into a straight line (linked list) with O(N) worst-case lookup time.",
    placementImportance: "High package product companies (Amazon, Microsoft, Oracle) focus heavily on binary trees and recursion in Round 2.",
    keySkills: ["Binary Search Trees", "Tree Traversals", "Recursion", "O(log N) Big-O"],
    lessonSlug: "dsa-arrays-lists"
  },

  // ── Stage 3: The Specialized Branches (Year 3 Industry Specialization) ──
  {
    id: 11,
    title: "Object-Oriented Programming (OOP) & Design",
    shortTitle: "OOP Design",
    stageId: 3,
    stageName: "The Specialized Branches",
    stageYear: "Year 3 • Industry Specialization",
    stageIcon: "🚀",
    isCapstone: false,
    icon: "🏛️",
    whatYouLearn: [
      "The 4 Pillars: Encapsulation, Abstraction, Inheritance, and Polymorphism",
      "Classes vs Objects: Constructors, destructors, and memory allocation",
      "Virtual functions, runtime dynamic dispatch, and abstract interfaces",
      "SOLID principles for writing maintainable enterprise-grade software"
    ],
    beginnerAnalogy: "A Class is an architectural blueprint for a sports car. An Object is the actual Ferrari parked in your garage built according to that blueprint.",
    commonPitfall: "Creating deep inheritance trees instead of using composition, leading to brittle 'god-classes'.",
    placementImportance: "Tested in every standard technical interview for Java, C++, and Python engineering positions.",
    keySkills: ["Encapsulation", "Polymorphism", "Virtual Methods", "SOLID Principles"],
    lessonSlug: "oop-cpp-java"
  },
  {
    id: 12,
    title: "Relational Databases, SQL & Indexing",
    shortTitle: "SQL & Databases",
    stageId: 3,
    stageName: "The Specialized Branches",
    stageYear: "Year 3 • Industry Specialization",
    stageIcon: "🚀",
    isCapstone: false,
    icon: "🗄️",
    whatYouLearn: [
      "Relational schema modeling: Primary Keys, Foreign Keys, and Normalization (1NF to 3NF)",
      "Writing complex SQL queries: INNER/LEFT/RIGHT JOINs, GROUP BY, and Aggregations",
      "ACID transactions (Atomicity, Consistency, Isolation, Durability) and concurrency",
      "B-Tree database indexes: how indexes transform slow table scans into lightning queries"
    ],
    beginnerAnalogy: "A database table without an index is like a 1,000-page textbook without an index in the back—you must flip through every page to find one topic. An index lets you look up the page immediately.",
    commonPitfall: "Writing queries without WHERE clauses or failing to index foreign key columns, causing production databases to crawl.",
    placementImportance: "DBMS is tested in 100% of campus placement written tests (MCQs) and backend technical rounds.",
    keySkills: ["SQL JOINs", "ACID Transactions", "Indexing & B-Trees", "Schema Normalization"],
    lessonSlug: "dbms-sql-core"
  },
  {
    id: 13,
    title: "Operating Systems, Processes & Concurrency",
    shortTitle: "OS & Threads",
    stageId: 3,
    stageName: "The Specialized Branches",
    stageYear: "Year 3 • Industry Specialization",
    stageIcon: "🚀",
    isCapstone: false,
    icon: "⚙️",
    whatYouLearn: [
      "Processes vs Threads: Memory sharing, Context Switching, and CPU Scheduling",
      "Concurrency hazards: Race conditions, critical sections, Mutex locks, and Semaphores",
      "Deadlock conditions (Coffman's criteria) and strategies for deadlock prevention",
      "Virtual Memory, Paging, Page Faults, and the Translation Lookaside Buffer (TLB)"
    ],
    beginnerAnalogy: "A Process is an entire restaurant kitchen with its own ingredients. A Thread is a chef working inside that kitchen. Multiple chefs share the same counter (memory), so if two chefs grab the salt at the same time without talking (locks), disasters happen.",
    commonPitfall: "Accessing shared memory across threads without acquiring a mutex lock, creating erratic race conditions.",
    placementImportance: "Core academic subject heavily questioned in TCS Digital, Cognizant, Infosys SP, and Tier-1 product rounds.",
    keySkills: ["Threads & Mutex", "Deadlocks", "Virtual Memory", "Context Switching"],
    lessonSlug: "os-networks-core"
  },
  {
    id: 14,
    title: "Full-Stack Web Architecture & REST APIs",
    shortTitle: "Full-Stack & APIs",
    stageId: 3,
    stageName: "The Specialized Branches",
    stageYear: "Year 3 • Industry Specialization",
    stageIcon: "🚀",
    isCapstone: false,
    icon: "🌐",
    whatYouLearn: [
      "Client-Server architecture: HTTP methods (GET, POST, PUT, DELETE) and status codes",
      "Designing clean RESTful API endpoints and handling JSON payloads securely",
      "Frontend UI state management, responsive designs, and asynchronous fetch calls",
      "Authentication flows: JWT tokens, HTTP-only cookies, and authorization headers"
    ],
    beginnerAnalogy: "The web is like a restaurant. The browser UI is the dining table. The REST API is the waiter taking your order to the kitchen. The backend server and database are the chefs cooking the meal.",
    commonPitfall: "Returning sensitive credentials or unhashed passwords over plain HTTP endpoints.",
    placementImportance: "90% of resumes feature a web project. Interviewers drill into how your frontend communicates with your database.",
    keySkills: ["REST APIs", "HTTP Status Codes", "JWT Auth", "Client-Server Model"],
    lessonSlug: "fullstack-web-dev"
  },
  {
    id: 15,
    title: "Shipped Production Cloud Application",
    shortTitle: "Production SaaS Capstone",
    stageId: 3,
    stageName: "The Specialized Branches",
    stageYear: "Year 3 • Industry Specialization",
    stageIcon: "🚀",
    isCapstone: true,
    icon: "🎓",
    whatYouLearn: [
      "Taking an application from local code to a live internet URL on Vercel or AWS",
      "Connecting a live PostgreSQL or MongoDB cloud database with schema migrations",
      "Securing API keys with environment variables (.env) and CORS protections",
      "Writing automated tests and setting up CI/CD GitHub Actions deployment pipelines"
    ],
    beginnerAnalogy: "Moving from building a model toy car in your garage to driving a licensed vehicle on the actual highway.",
    commonPitfall: "Hardcoding API secrets or database passwords in public GitHub repositories.",
    placementImportance: "A live, deployed project with real users instantly elevates your resume to the top 5% of all college applicants.",
    keySkills: ["Cloud Deployment", "CI/CD Pipelines", "Environment Secrets", "Production Database"],
    lessonSlug: "fullstack-web-dev"
  },

  // ── Stage 4: The Placement Canopy (Year 4 Senior Placements & SDE 1) ────
  {
    id: 16,
    title: "Two Pointers & Sliding Window Patterns",
    shortTitle: "Sliding Window Patterns",
    stageId: 4,
    stageName: "The Placement Canopy",
    stageYear: "Year 4 • Senior Placements & SDE",
    stageIcon: "🏆",
    isCapstone: false,
    icon: "🪟",
    whatYouLearn: [
      "Optimizing nested O(N^2) brute force algorithms down to lightning O(N) linear time",
      "Two Pointers pattern: Converging from opposite ends (left & right) in sorted arrays",
      "Sliding Window pattern: Expanding right boundary and shrinking left boundary dynamically",
      "Solving classic placement problems: Longest Substring Without Repeating Characters, Trapping Rainwater"
    ],
    beginnerAnalogy: "Instead of measuring every possible pair of runners one by one, use a flexible rubber band (window) that expands and contracts as you scan across the finish line in a single pass.",
    commonPitfall: "Shrinking the window incorrectly or forgetting to update the global maximum inside the loop.",
    placementImportance: "The single most frequently tested DSA pattern in Online Assessment (OA) coding rounds across Amazon, Uber, and Atlassian.",
    keySkills: ["Two Pointers", "Dynamic Sliding Window", "O(N) Optimization", "Subarray Tracking"],
    lessonSlug: "placement-dsa-oa"
  },
  {
    id: 17,
    title: "Graphs (BFS/DFS) & Dynamic Programming",
    shortTitle: "Graphs & DP",
    stageId: 4,
    stageName: "The Placement Canopy",
    stageYear: "Year 4 • Senior Placements & SDE",
    stageIcon: "🏆",
    isCapstone: false,
    icon: "🕸️",
    whatYouLearn: [
      "Graph representations: Adjacency Matrix vs Adjacency Lists and memory trade-offs",
      "Breadth-First Search (BFS) for shortest paths using a queue",
      "Depth-First Search (DFS) for connected components and topological sorting",
      "Dynamic Programming: Breaking exponential 2^N recursion into O(N) through Memoization and Tabulation"
    ],
    beginnerAnalogy: "DP is like memorizing: What is 1+1+1+1+1? Five. Now add one more 1 to the end: you don't count from zero again, you just take your previous remembered answer (5) and add 1!",
    commonPitfall: "Forgetting a visited set in graph traversal, sending the algorithm into an infinite cyclic loop.",
    placementImportance: "Differentiates Tier-2 service offers (4-6 LPA) from Tier-1 product offers (15-40 LPA).",
    keySkills: ["Graph BFS / DFS", "Adjacency Lists", "Memoization", "Tabulation DP"],
    lessonSlug: "placement-dsa-oa"
  },
  {
    id: 18,
    title: "High-Level Scalable System Design",
    shortTitle: "System Design",
    stageId: 4,
    stageName: "The Placement Canopy",
    stageYear: "Year 4 • Senior Placements & SDE",
    stageIcon: "🏆",
    isCapstone: false,
    icon: "🏗️",
    whatYouLearn: [
      "Scaling from 1,000 to 10,000,000 concurrent users: Horizontal vs Vertical scaling",
      "Load Balancers (Round Robin, Least Connections) and reverse proxies like Nginx",
      "Caching strategies with Redis: Cache-Aside, Write-Through, and eviction policies (LRU)",
      "Database Sharding, Replication, CDNs, and asynchronous message queues (Kafka/RabbitMQ)"
    ],
    beginnerAnalogy: "Designing a system is like designing a water supply for a city. One pipe works for a village. When 5 million people move in, you need water towers (caches), multiple pipes (load balancers), and backup reservoirs (replicas).",
    commonPitfall: "Jumping directly into complex microservices when a simple monolithic architecture is more appropriate.",
    placementImportance: "High package SDE 1 interviews at top startups and product giants test your ability to design scalable systems.",
    keySkills: ["Load Balancers", "Redis Caching", "Database Replication", "Microservices"],
    lessonSlug: "system-design-senior"
  },
  {
    id: 19,
    title: "Timed OA Coding Rounds & STAR Behavioral",
    shortTitle: "OA & Behavioral Drills",
    stageId: 4,
    stageName: "The Placement Canopy",
    stageYear: "Year 4 • Senior Placements & SDE",
    stageIcon: "🏆",
    isCapstone: false,
    icon: "⏱️",
    whatYouLearn: [
      "Timed test psychology: Solving 2 algorithmic problems within 70 minutes without panic",
      "Stress-testing code against tricky edge cases (empty inputs, integer boundaries, negatives)",
      "Answering behavioral and HR questions using the STAR framework (Situation, Task, Action, Result)",
      "Articulating trade-offs aloud to tech leads: explaining space vs time complexity clearly"
    ],
    beginnerAnalogy: "An audition for an orchestra. It's not enough to play the notes silently in your head; you must perform accurately on cue under the spotlight with good tempo.",
    commonPitfall: "Freezing when the first solution doesn't work instead of communicating an alternative approach with the interviewer.",
    placementImportance: "Determines whether you clear the initial company screening filter and win the engineering panel's trust.",
    keySkills: ["Timed OAs", "STAR Method", "Edge Case Testing", "Interview Fluency"],
    lessonSlug: "placement-dsa-oa"
  },
  {
    id: 20,
    title: "SDE 1 Campus Placement Offer!",
    shortTitle: "SDE 1 Offer Pinnacle",
    stageId: 4,
    stageName: "The Placement Canopy",
    stageYear: "Year 4 • Senior Placements & SDE",
    stageIcon: "🏆",
    isCapstone: true,
    icon: "👑",
    whatYouLearn: [
      "Evaluating offer letters: Base salary, sign-on bonus, stock units (RSUs), and benefits",
      "Professional compensation negotiation etiquette for fresh engineering graduates",
      "Transitioning from academic student to high-impact production software engineer",
      "Continuous growth: Mentoring upcoming juniors and charting your path toward SDE 2"
    ],
    beginnerAnalogy: "Crossing the engineering finish line. All those late-night debugging sessions, pointer puzzles, and practice rounds have culminated in your golden campus placement offer!",
    commonPitfall: "Stopping learning after signing the offer letter. The best engineers stay curious and keep sharpening their craft.",
    placementImportance: "The ultimate milestone of your 4-year engineering degree. Welcome to the tech industry!",
    keySkills: ["Compensation Evaluation", "Offer Negotiation", "SDE 1 Onboarding", "Engineering Leadership"],
    lessonSlug: "system-design-senior"
  }
];

export default function CareerPage() {
  const router = useRouter();

  // Student profile state
  const [studentName, setStudentName] = useState("Student");
  const [studentBranch, setStudentBranch] = useState("CSE");
  const [studentGoal, setStudentGoal] = useState("Placement");
  const [roleDiscovery, setRoleDiscovery] = useState<{
    topRole: string;
    matchScore: number;
    compositeRecommendation?: string;
  } | null>(null);

  // Active level state (1 to 20)
  const [currentLevel, setCurrentLevel] = useState<number>(3);
  const [selectedMilestone, setSelectedMilestone] = useState<JourneyMilestone | null>(null);

  // Stage filter
  const [activeStageFilter, setActiveStageFilter] = useState<number | "all">("all");

  // Ref to active level node for auto-scroll
  const activeNodeRef = useRef<HTMLDivElement | null>(null);

  // Load student profile & calculate level from completedLessons
  useEffect(() => {
    try {
      const saved = localStorage.getItem("studentData");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name) setStudentName(parsed.name);
        if (parsed.branch) setStudentBranch(parsed.branch);
        if (parsed.goal) setStudentGoal(parsed.goal);
      }
    } catch {
      // Ignore
    }

    try {
      const rd = localStorage.getItem("campusgrow_role_discovery");
      if (rd) {
        const parsed = JSON.parse(rd);
        if (parsed.topMatch) {
          setRoleDiscovery({
            topRole: parsed.topMatch.role?.title || "AI/ML Engineer",
            matchScore: parsed.topMatch.matchScore || 87,
            compositeRecommendation: parsed.topMatch.compositeRecommendation,
          });
        }
      }
    } catch {
      // Ignore
    }

    try {
      const completed: string[] = JSON.parse(
        localStorage.getItem("completedLessons") || "[]"
      );
      const calculated = Math.min(20, Math.max(1, completed.length + 1));
      const storedCareerLevel = localStorage.getItem("career_journey_level");
      if (storedCareerLevel) {
        setCurrentLevel(Math.min(20, Math.max(1, parseInt(storedCareerLevel, 10))));
      } else {
        setCurrentLevel(calculated > 1 ? calculated : 3);
      }
    } catch {
      setCurrentLevel(3);
    }
  }, []);

  const handleSetCurrentLevel = (lvl: number) => {
    const clamped = Math.min(20, Math.max(1, lvl));
    setCurrentLevel(clamped);
    try {
      localStorage.setItem("career_journey_level", String(clamped));
    } catch {
      // Ignore
    }
  };

  const handleScrollToActiveNode = () => {
    if (activeNodeRef.current) {
      activeNodeRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const filteredMilestones =
    activeStageFilter === "all"
      ? JOURNEY_MILESTONES
      : JOURNEY_MILESTONES.filter((m) => m.stageId === activeStageFilter);

  const completedCount = Math.max(0, currentLevel - 1);
  const completionPercentage = Math.min(100, Math.round((completedCount / 20) * 100));
  const currentMilestoneObj =
    JOURNEY_MILESTONES[currentLevel - 1] || JOURNEY_MILESTONES[0];

  return (
    <PaywallGate featureKey="career">
      <AmbientBackground intensity="career">
        <main className="flex-1 p-5 sm:p-8 lg:p-10 max-w-6xl mx-auto w-full text-slate-900 dark:text-slate-100 transition-colors duration-200">
          {/* ── Main Container ──────────────────────────────────────────────── */}
          <div className="w-full">
            {/* Header Title */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                  🌳 Engineering Journey Tree
                </span>
                <span className="text-xs font-bold text-slate-400">•</span>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Branch: <strong className="text-slate-800 dark:text-slate-200">{studentBranch}</strong>
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
                Where You Are in Your 4-Year Journey 🚀
              </h1>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
                An architectural skill tree tracking your technical progression from Day 1 freshman fundamentals to your senior high-package campus placement offer.
              </p>
            </div>

            {/* ── Hero Status Spotlight Card ("What Is My Current Level") ─────── */}
            <section className="mt-6 rounded-3xl bg-white/80 dark:bg-[#101B2D]/85 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 p-6 sm:p-7 shadow-sm transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                {/* Left Column: Active Level Badge & Detail */}
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#13C995] to-[#55C8FF] text-slate-950 font-black text-xl shadow-md shadow-emerald-500/20 border-2 border-emerald-300">
                    {currentLevel}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wider animate-pulse">
                        <span className="h-2 w-2 rounded-full bg-[#13C995]" />
                        YOU ARE HERE • LEVEL {currentLevel}
                      </span>
                      <span className="text-xs font-semibold text-slate-400">
                        {currentMilestoneObj.stageName} ({currentMilestoneObj.stageYear})
                      </span>
                    </div>
                    <h2 className="mt-1 text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
                      {currentMilestoneObj.title}
                    </h2>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 max-w-xl">
                      {currentMilestoneObj.whatYouLearn[0]}
                    </p>
                  </div>
                </div>

                {/* Right Column: Progress Metrics & Actions */}
                <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-3.5 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-white/5">
                  {/* Progress bar */}
                  <div className="w-full sm:w-56 text-left sm:text-right">
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-slate-500 dark:text-slate-400">Journey Progress</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-black">{completionPercentage}%</span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden border border-slate-200 dark:border-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#13C995] to-[#55C8FF] transition-all duration-500"
                        style={{ width: `${completionPercentage}%` }}
                      />
                    </div>
                    <div className="mt-1 text-[11px] text-slate-400 font-semibold">
                      {completedCount} of 20 Milestones Mastered
                    </div>
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={() => setSelectedMilestone(currentMilestoneObj)}
                      className="rounded-xl bg-gradient-to-r from-[#13C995] to-[#55C8FF] hover:brightness-110 text-slate-950 px-3.5 py-2 text-xs font-black shadow-xs transition active:scale-95 cursor-pointer"
                    >
                      Inspect Level {currentLevel} →
                    </button>
                    <button
                      type="button"
                      onClick={handleScrollToActiveNode}
                      className="rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 px-3 py-2 text-xs font-bold transition cursor-pointer"
                      title="Scroll down to active node in the tree"
                    >
                      📍 Focus on Tree
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Progress Controls (Simulation bar) */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between flex-wrap gap-2 text-xs">
                <span className="text-slate-500 dark:text-slate-400 font-medium">
                  Want to test advancing your progress along the tree?
                </span>
                <div className="inline-flex items-center gap-1.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-2.5 py-1">
                  <button
                    type="button"
                    onClick={() => handleSetCurrentLevel(currentLevel - 1)}
                    disabled={currentLevel <= 1}
                    className="px-2 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 font-bold cursor-pointer"
                  >
                    ◀ Prev
                  </button>
                  <span className="font-bold text-slate-800 dark:text-slate-200 px-1.5">
                    Node {currentLevel} of 20
                  </span>
                  <button
                    type="button"
                    onClick={() => handleSetCurrentLevel(currentLevel + 1)}
                    disabled={currentLevel >= 20}
                    className="px-2 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 font-bold cursor-pointer"
                  >
                    Next ▶
                  </button>
                </div>
              </div>
            </section>

            {/* ── Stage Filter Pills ────────────────────────────────────────── */}
            <div className="mt-8 flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setActiveStageFilter("all")}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
                  activeStageFilter === "all"
                    ? "bg-slate-900 dark:bg-white text-white dark:text-black shadow-xs font-black"
                    : "bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/10"
                }`}
              >
                All 4 Stages (20 Milestones) 🌳
              </button>
              <button
                onClick={() => setActiveStageFilter(1)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
                  activeStageFilter === 1
                    ? "bg-emerald-600 text-white shadow-xs font-black"
                    : "bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/10"
                }`}
              >
                🌱 Stage 1: Roots &amp; Logic (Yr 1)
              </button>
              <button
                onClick={() => setActiveStageFilter(2)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
                  activeStageFilter === 2
                    ? "bg-blue-600 text-white shadow-xs font-black"
                    : "bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/10"
                }`}
              >
                ⚡ Stage 2: Core Trunk (Yr 2)
              </button>
              <button
                onClick={() => setActiveStageFilter(3)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
                  activeStageFilter === 3
                    ? "bg-purple-600 text-white shadow-xs font-black"
                    : "bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/10"
                }`}
              >
                🚀 Stage 3: Specialized Branches (Yr 3)
              </button>
              <button
                onClick={() => setActiveStageFilter(4)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
                  activeStageFilter === 4
                    ? "bg-amber-600 text-white shadow-xs font-black"
                    : "bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/10"
                }`}
              >
                🏆 Stage 4: Placement Canopy (Yr 4)
              </button>
            </div>

          {/* ── Journey Tree Spine & Milestone Nodes ──────────────────────── */}
          <div className="relative mt-8">
            {/* Central Vertical Trunk Line */}
            <div className="absolute left-6 sm:left-8 top-6 bottom-6 w-1 bg-gradient-to-b from-emerald-400 via-teal-500 to-amber-500 rounded-full" />

            {/* Milestones Container */}
            <div className="space-y-6">
              {filteredMilestones.map((milestone, idx) => {
                const isCompleted = milestone.id < currentLevel;
                const isActive = milestone.id === currentLevel;
                const isLocked = milestone.id > currentLevel;

                const isFirstOfStage =
                  idx === 0 ||
                  filteredMilestones[idx - 1]?.stageId !== milestone.stageId;

                return (
                  <div key={milestone.id} className="relative">
                    {/* Stage Header Banner */}
                    {isFirstOfStage && (
                      <div className="relative pl-14 sm:pl-20 pt-4 pb-2">
                        <div className="inline-flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-3.5 py-1.5 shadow-2xs">
                          <span className="text-base">{milestone.stageIcon}</span>
                          <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                            {milestone.stageName}
                          </span>
                          <span className="text-slate-300 text-xs">•</span>
                          <span className="text-xs font-medium text-slate-500">
                            {milestone.stageYear}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Milestone Tree Row */}
                    <div
                      ref={isActive ? activeNodeRef : null}
                      className="relative flex items-start group pl-14 sm:pl-20"
                    >
                      {/* Tree Node Dot on Trunk */}
                      <div
                        onClick={() => setSelectedMilestone(milestone)}
                        className={`absolute left-4 sm:left-6 -translate-x-1/2 top-5 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full transition-all duration-200 cursor-pointer ${
                          isCompleted
                            ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30 ring-4 ring-white"
                            : isActive
                            ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/40 ring-4 ring-emerald-100 scale-110 animate-pulse"
                            : "bg-white border-2 border-slate-300 text-slate-400 ring-4 ring-white"
                        }`}
                      >
                        {isCompleted ? (
                          <span className="text-xs font-black">✓</span>
                        ) : isActive ? (
                          <span className="text-xs font-black">📍</span>
                        ) : (
                          <span className="text-[10px] font-bold">{milestone.id}</span>
                        )}
                      </div>

                      {/* Milestone Card */}
                      <div
                        onClick={() => setSelectedMilestone(milestone)}
                        className={`w-full rounded-2xl p-5 sm:p-6 transition-all duration-200 cursor-pointer ${
                          isActive
                            ? "bg-white border-2 border-emerald-500 ring-4 ring-emerald-500/10 shadow-md"
                            : isCompleted
                            ? "bg-white border border-slate-200/90 hover:border-emerald-300 hover:shadow-xs"
                            : "bg-white/80 border border-slate-200/70 opacity-90 hover:opacity-100 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                          {/* Title & Stage */}
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{milestone.icon}</span>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-[11px] font-black text-slate-400">
                                  LEVEL {milestone.id.toString().padStart(2, "0")}
                                </span>
                                {isCompleted && (
                                  <span className="rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 text-[10px] font-black uppercase">
                                    ✓ Mastered
                                  </span>
                                )}
                                {isActive && (
                                  <span className="rounded-md bg-emerald-600 text-white px-2 py-0.5 text-[10px] font-black uppercase tracking-wider animate-pulse">
                                    📍 Current Level
                                  </span>
                                )}
                                {isLocked && (
                                  <span className="rounded-md bg-slate-100 text-slate-500 border border-slate-200 px-2 py-0.5 text-[10px] font-bold uppercase">
                                    🔒 Upcoming
                                  </span>
                                )}
                                {milestone.isCapstone && (
                                  <span className="rounded-md bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 text-[10px] font-black uppercase">
                                    🎓 Capstone
                                  </span>
                                )}
                              </div>
                              <h3
                                className={`text-base sm:text-lg font-black transition ${
                                  isActive
                                    ? "text-emerald-950 font-black"
                                    : "text-slate-900 group-hover:text-emerald-700"
                                }`}
                              >
                                {milestone.title}
                              </h3>
                              {/* 5-Star Performance Rating in Flowchart */}
                              <div className="mt-2.5 flex items-center gap-2 flex-wrap">
                                {(() => {
                                  const perf = getMilestonePerformance(milestone.id, milestone.lessonSlug, currentLevel);
                                  return (
                                    <>
                                      <div className="inline-flex items-center gap-1.5 rounded-xl bg-amber-50 border border-amber-200/90 px-2.5 py-1 shadow-2xs">
                                        <div className="flex items-center text-amber-500 text-xs">
                                          {[1, 2, 3, 4, 5].map((s) => (
                                            <span
                                              key={s}
                                              className={s <= perf.stars ? "text-amber-500 font-black" : "text-slate-300"}
                                            >
                                              ★
                                            </span>
                                          ))}
                                        </div>
                                        <span className="text-xs font-black text-amber-950 ml-0.5">
                                          {perf.stars > 0 ? `${perf.stars}.0 / 5 Stars` : "0 / 5 Stars"}
                                        </span>
                                      </div>

                                      {perf.isCompleted ? (
                                        <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-black text-emerald-800">
                                          <span>🎯</span>
                                          <span>Quiz Accuracy: {perf.scoreText} ({perf.percentage}%)</span>
                                        </span>
                                      ) : isActive ? (
                                        <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-100 text-emerald-900 border border-emerald-300 px-2 py-0.5 text-[10px] font-bold animate-pulse">
                                          <span>⚡</span>
                                          <span>Current Target: Earn 5★ on Quiz</span>
                                        </span>
                                      ) : (
                                        <span className="text-[10px] font-semibold text-slate-400">
                                          Unlock Level {milestone.id} to Rate
                                        </span>
                                      )}
                                    </>
                                  );
                                })()}
                              </div>
                            </div>
                          </div>

                          {/* Quick Action Button */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedMilestone(milestone);
                            }}
                            className={`self-start sm:self-auto rounded-xl px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                              isActive
                                ? "bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100"
                                : "text-slate-500 hover:text-slate-900 hover:bg-slate-50 border border-transparent hover:border-slate-200"
                            }`}
                          >
                            What to Learn →
                          </button>
                        </div>

                        {/* Summary of concepts to learn */}
                        <p className="mt-2.5 text-xs text-slate-500 leading-relaxed">
                          {milestone.whatYouLearn[0]}
                        </p>

                        {/* Skill Tags */}
                        <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {milestone.keySkills.slice(0, 4).map((sk) => (
                              <span
                                key={sk}
                                className="rounded-md bg-slate-50 border border-slate-200 px-2 py-0.5 text-[10px] font-bold text-slate-600"
                              >
                                {sk}
                              </span>
                            ))}
                          </div>
                          <span className="text-[11px] font-semibold text-slate-400">
                            {milestone.shortTitle}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Role Discovery Callout ── */}
          <section className="mt-12 rounded-3xl border border-emerald-200 bg-white p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">🚀</span>
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-800">
                    {roleDiscovery ? "DISCOVERED CAREER MATCH" : "NOT SURE WHICH ROLE IS RIGHT FOR YOU?"}
                  </span>
                </div>
                <h2 className="mt-1 text-lg font-black text-slate-950">
                  {roleDiscovery
                    ? `Your Top Match: ${roleDiscovery.topRole} (${roleDiscovery.matchScore}% Match)`
                    : "Discover Your Role Through Short 3-Day Practical Tasks"}
                </h2>
                <p className="mt-1 text-xs text-slate-500 font-medium">
                  {roleDiscovery
                    ? "Based on your hands-on trial in Build, Analyze, and Solve tasks. Explore your customized milestones above."
                    : "Experience hands-on tasks across AI/ML, Full Stack, Data, Cyber & Cloud without pressure or exams."}
                </p>
              </div>

              <button
                onClick={() => router.push("/discover-role")}
                className="shrink-0 rounded-xl bg-[#00A86B] hover:bg-[#00925d] text-white px-4 py-2.5 text-xs font-bold shadow-xs transition active:scale-95 cursor-pointer"
              >
                {roleDiscovery ? "View Discovery Report →" : "Start 3-Day Career Trial →"}
              </button>
            </div>
          </section>

          {/* ── Branch Specific Intelligence ── */}
          <section className="mt-8 rounded-3xl bg-white border border-slate-200 p-6 sm:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                  Branch Competency Analysis
                </p>
                <h2 className="mt-1 text-xl sm:text-2xl font-black text-slate-950">
                  {studentBranch} • Engineering Career Focus
                </h2>
              </div>
              <span className="self-start rounded-full bg-slate-100 border border-slate-200 px-3.5 py-1 text-xs font-bold text-slate-700">
                Target Goal: {studentGoal}
              </span>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-5">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-700">
                  Top Hiring Roles for {studentBranch}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    "Software Development Engineer (SDE 1)",
                    "AI & Machine Learning Engineer",
                    "Full-Stack Systems Engineer",
                    "Data Platform Engineer",
                  ].map((role) => (
                    <span
                      key={role}
                      className="rounded-lg bg-white border border-slate-200 px-3 py-1 text-xs font-bold text-slate-800 shadow-2xs"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-5">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-700">
                  High-Priority Technical Competencies
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    "C Programming & Memory Models",
                    "Data Structures & Algorithms",
                    "Relational DBMS & SQL",
                    "Operating Systems & Networks",
                    "Cloud & REST APIs",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg bg-white border border-slate-200 px-3 py-1 text-xs font-bold text-slate-800 shadow-2xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* ── Interactive Milestone Modal ("What You Have To Learn") ──────── */}
        {selectedMilestone && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-200">
            <div
              className="relative w-full max-w-2xl rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 text-slate-900 shadow-2xl max-h-[90vh] overflow-y-auto"
              role="dialog"
              aria-modal="true"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedMilestone(null)}
                className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition cursor-pointer"
              >
                ✕
              </button>

              {/* Modal Header */}
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 border border-emerald-200 text-2xl">
                  {selectedMilestone.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="rounded-md bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 text-[10px] font-black uppercase">
                      Level {selectedMilestone.id} of 20
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">
                      {selectedMilestone.stageName} • {selectedMilestone.stageYear}
                    </span>
                  </div>
                  <h3 className="mt-1 text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                    {selectedMilestone.title}
                  </h3>
                </div>
              </div>

              {/* Status Banner */}
              <div className="mt-5 rounded-2xl p-3.5 flex items-center justify-between text-xs font-bold border border-slate-200 bg-slate-50">
                <div className="flex items-center gap-2">
                  {selectedMilestone.id < currentLevel ? (
                    <>
                      <span className="text-emerald-600 text-base">✓</span>
                      <span className="text-emerald-800">
                        Status: Mastered Milestone
                      </span>
                    </>
                  ) : selectedMilestone.id === currentLevel ? (
                    <>
                      <span className="text-emerald-600 text-base animate-pulse">📍</span>
                      <span className="text-emerald-800 font-black">
                        Status: CURRENT LEVEL • In Progress
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-slate-400 text-base">🔒</span>
                      <span className="text-slate-600">
                        Status: Upcoming Milestone in {selectedMilestone.stageName}
                      </span>
                    </>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleSetCurrentLevel(selectedMilestone.id)}
                  className="rounded-lg bg-white border border-slate-200 hover:bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-700 transition cursor-pointer"
                >
                  Set as Current Level 📍
                </button>
              </div>

              {/* 5-Star Milestone Performance Benchmark Card */}
              {(() => {
                const modalPerf = getMilestonePerformance(selectedMilestone.id, selectedMilestone.lessonSlug, currentLevel);
                return (
                  <div className="mt-4 rounded-2xl p-4 border border-amber-200 bg-gradient-to-r from-amber-50/80 via-white to-amber-50/50 shadow-2xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black uppercase tracking-wider text-amber-900">
                            Flowchart Milestone Performance
                          </span>
                          <span className="rounded-full bg-amber-100 border border-amber-300 px-2 py-0.5 text-[10px] font-black text-amber-900">
                            {modalPerf.tier}
                          </span>
                        </div>
                        <div className="mt-1.5 flex items-center gap-2">
                          <div className="flex items-center text-amber-500 text-lg">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <span
                                key={s}
                                className={s <= modalPerf.stars ? "text-amber-500 font-black" : "text-slate-200"}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                          <span className="text-base font-black text-amber-950">
                            {modalPerf.stars > 0 ? `${modalPerf.stars}.0 / 5 Stars` : "0.0 / 5 Stars"}
                          </span>
                        </div>
                      </div>

                      <div className="text-left sm:text-right">
                        <div className="text-xs font-bold text-slate-800">
                          Quiz Accuracy:{" "}
                          <strong className="text-emerald-700 font-black">
                            {modalPerf.isCompleted ? `${modalPerf.scoreText} (${modalPerf.percentage}%)` : "Not Attempted"}
                          </strong>
                        </div>
                        {modalPerf.dateEnded && (
                          <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                            Mastery Date: {modalPerf.dateEnded}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* "What You Have To Learn" Core Section */}
              <div className="mt-6">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <span>📚</span>
                  <span>What You Must Learn in this Milestone</span>
                </h4>
                <ul className="mt-3 space-y-2 text-xs text-slate-700">
                  {selectedMilestone.whatYouLearn.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-emerald-600 font-black shrink-0">✦</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Beginner Friendly Analogy */}
              <div className="mt-5 rounded-2xl bg-amber-50/70 border border-amber-200 p-4">
                <h4 className="text-xs font-black uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                  <span>💡</span>
                  <span>Beginner Analogy (Everyday Intuition)</span>
                </h4>
                <p className="mt-1 text-xs text-amber-900/90 leading-relaxed font-medium">
                  {selectedMilestone.beginnerAnalogy}
                </p>
              </div>

              {/* Common Pitfall & Placement Importance */}
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-red-50/60 border border-red-200 p-3.5">
                  <h5 className="text-[11px] font-black uppercase tracking-wider text-red-900 flex items-center gap-1">
                    <span>⚠️</span>
                    <span>Common Trap to Avoid</span>
                  </h5>
                  <p className="mt-1 text-[11px] text-red-900/80 leading-relaxed font-medium">
                    {selectedMilestone.commonPitfall}
                  </p>
                </div>

                <div className="rounded-2xl bg-emerald-50/60 border border-emerald-200 p-3.5">
                  <h5 className="text-[11px] font-black uppercase tracking-wider text-emerald-900 flex items-center gap-1">
                    <span>💼</span>
                    <span>Campus Placement Impact</span>
                  </h5>
                  <p className="mt-1 text-[11px] text-emerald-900/80 leading-relaxed font-medium">
                    {selectedMilestone.placementImportance}
                  </p>
                </div>
              </div>

              {/* Acquired Skills Tags */}
              <div className="mt-5">
                <span className="text-xs font-bold text-slate-500">Skills Acquired:</span>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {selectedMilestone.keySkills.map((sk) => (
                    <span
                      key={sk}
                      className="rounded-lg bg-slate-100 border border-slate-200 px-2.5 py-1 text-[11px] font-bold text-slate-700"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between gap-3 flex-wrap">
                <button
                  type="button"
                  onClick={() => setSelectedMilestone(null)}
                  className="rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-700 transition cursor-pointer"
                >
                  Close
                </button>

                <div className="flex items-center gap-2">
                  {selectedMilestone.lessonSlug && (
                    <button
                      type="button"
                      onClick={() => router.push(`/lessons/${selectedMilestone.lessonSlug}`)}
                      className="rounded-xl bg-[#00A86B] hover:bg-[#00925d] text-white px-5 py-2.5 text-xs font-bold shadow-xs transition active:scale-95 cursor-pointer"
                    >
                      Launch Lesson →
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      handleSetCurrentLevel(Math.min(20, selectedMilestone.id + 1));
                      setSelectedMilestone(null);
                    }}
                    className="rounded-xl border border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2.5 text-xs font-bold transition cursor-pointer"
                  >
                    Mark Mastered ✓
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      </AmbientBackground>
    </PaywallGate>
  );
}
