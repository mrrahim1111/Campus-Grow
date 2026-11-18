// Dynamic Diagnostic Assessment Questions & Path Generator tailored to branch & academic year

export interface DiagnosticQuestion {
  id: string;
  question: string;
  category: "Logic" | "Memory" | "Branch Specialization" | "Optimization" | "Architecture";
  options: string[];
  correct: number;
  explanation: string;
}

export interface PersonalizedPath {
  tier: "Foundational" | "Intermediate" | "Advanced";
  title: string;
  tagline: string;
  score: number;
  total: number;
  percentage: number;
  branch: string;
  year: string;
  recommendedLessonId: string;
  recommendedLessonTitle: string;
  recommendedProjectId: string;
  recommendedProjectTitle: string;
  weeklyPlan: { week: number; focus: string; deliverables: string }[];
  mentorPrompt: string;
  skillsAssessed: { name: string; score: number; max: number }[];
}

// Branch-specific question pools
export const DIAGNOSTIC_QUESTIONS_BY_BRANCH: Record<string, DiagnosticQuestion[]> = {
  // ── CSE & IT ──────────────────────────────────────────────────────────────
  "Computer Science & Engineering": [
    {
      id: "cse_1",
      question: "In C, what is the value stored in a local variable declared inside a function if it is never explicitly initialized (e.g. `int count;`)?",
      category: "Memory",
      options: [
        "It is always set to 0 by the C standard",
        "It contains indeterminate 'garbage' bits previously present at that stack address",
        "It throws a compilation error at build time",
        "It is set to NULL",
      ],
      correct: 1,
      explanation: "Local variables have automatic storage duration on the stack. The C standard does not zero stack memory for performance reasons, leaving arbitrary leftover bytes (garbage).",
    },
    {
      id: "cse_2",
      question: "Which of the following describes the difference between an Array and a Linked List regarding CPU Cache spatial locality?",
      category: "Optimization",
      options: [
        "Linked lists have better cache locality because nodes can be stored anywhere in RAM",
        "Arrays have superior spatial locality because elements reside in contiguous memory, fitting into CPU cache lines",
        "Both have identical cache performance because modern CPU prefetchers ignore memory layouts",
        "Arrays cause more cache misses due to row-major memory stride overhead",
      ],
      correct: 1,
      explanation: "Arrays occupy contiguous bytes. When one element is loaded, adjacent elements are automatically pulled into the 64-byte L1/L2 cache line, ensuring near-instant sequential lookups.",
    },
    {
      id: "cse_3",
      question: "Given `int arr[5] = {10, 20, 30, 40, 50}; int *p = arr + 2;`, what does `*(p + 1)` evaluate to?",
      category: "Branch Specialization",
      options: ["20", "30", "40", "50"],
      correct: 2,
      explanation: "`arr + 2` points to index 2 (`30`). Adding 1 moves the pointer forward by one `int` offset (4 bytes) to index 3 (`40`). Dereferencing yields `40`.",
    },
    {
      id: "cse_4",
      question: "What is the primary risk of using standard library `strcpy(dest, src)` instead of `snprintf()`?",
      category: "Logic",
      options: [
        "It is slow because it performs multi-threaded memory locking",
        "It does not enforce destination buffer bounds, causing buffer overflow & stack smashing security exploits",
        "It only works on ASCII characters and rejects numeric characters",
        "It frees the source string after copying",
      ],
      correct: 1,
      explanation: "`strcpy` copies until a null terminator `\\0` without checking destination buffer size, allowing attackers to overwrite adjacent stack frame memory (including the return address `%rip`).",
    },
    {
      id: "cse_5",
      question: "When invoking a function in the x86-64 System V AMD64 ABI, how are the first few integer/pointer arguments passed?",
      category: "Architecture",
      options: [
        "Pushed to the hard drive in temporary files",
        "Pushed strictly to RAM stack frames in reverse order",
        "Passed directly inside fast CPU registers (%rdi, %rsi, %rdx, %rcx, %r8, %r9)",
        "Written to a dedicated global array",
      ],
      correct: 2,
      explanation: "Modern 64-bit ABIs pass the first 6 integer/pointer arguments in CPU registers to avoid expensive memory bus traffic to RAM.",
    },
  ],

  // ── AI & Machine Learning ──────────────────────────────────────────────────
  "Artificial Intelligence & ML": [
    {
      id: "aiml_1",
      question: "Why are low-level languages like C/C++ or CUDA used at the core of AI frameworks (like PyTorch and TensorFlow) rather than pure Python?",
      category: "Branch Specialization",
      options: [
        "Python does not support floating point arithmetic",
        "C/C++ allows direct hardware acceleration, memory layout control, SIMD vectorization, and cache line optimization for massive matrix multiplications",
        "C compilers have built-in neural network neural weights",
        "Python code cannot be translated into bytecode",
      ],
      correct: 1,
      explanation: "Python provides high-level developer ergonomics, but execution loops (tensor ops, matrix dot products, autograd) delegate to compiled C/C++/CUDA kernels for maximum throughput.",
    },
    {
      id: "aiml_2",
      question: "In matrix operations (e.g. GEMM in neural network layers), why does iterating in Row-Major order perform significantly faster than Column-Major order in C?",
      category: "Optimization",
      options: [
        "Row-major order skips zeros automatically",
        "Row-major order accesses memory contiguously along cache lines, maximizing L1/L2 cache hit rates",
        "The CPU cannot read columns because of bus hardware limitations",
        "Compilers reject column-major nested loops",
      ],
      correct: 1,
      explanation: "C stores 2D arrays row-by-row in linear RAM. Sequential row access has a stride of 1 element, loading entire cache lines. Column access jumps by row strides, thrashing the cache.",
    },
    {
      id: "aiml_3",
      question: "In numerical computations, what is the consequence of 32-bit `float` vs 64-bit `double` in machine learning model weights?",
      category: "Memory",
      options: [
        "`float` consumes 4 bytes and has 24 bits of mantissa precision; `double` consumes 8 bytes and has 53 bits of precision",
        "`float` only stores positive numbers while `double` stores negative numbers",
        "`float` and `double` are identical synonyms in modern 64-bit architectures",
        "`float` precision is infinite while `double` truncates at 10 decimals",
      ],
      correct: 0,
      explanation: "IEEE 754 single-precision float uses 4 bytes (1 sign, 8 exponent, 23 mantissa). Modern deep learning often uses FP32 or FP16 to halve memory bandwidth and fit larger batch sizes.",
    },
    {
      id: "aiml_4",
      question: "What is the time complexity of multiplying two N x N dense matrices using the naive 3-nested-loop algorithm?",
      category: "Logic",
      options: ["O(N log N)", "O(N^2)", "O(N^3)", "O(2^N)"],
      correct: 2,
      explanation: "The standard matrix multiplication computes N^2 output cells, each requiring N multiplications and additions, yielding O(N^3) time complexity.",
    },
    {
      id: "aiml_5",
      question: "In neural network gradient descent, what mathematical operation requires computing partial derivatives across computational graphs?",
      category: "Architecture",
      options: [
        "The Fourier Transform",
        "Backpropagation via the Multivariable Chain Rule",
        "Singular Value Decomposition",
        "Dijkstra's Shortest Path Algorithm",
      ],
      correct: 1,
      explanation: "Backpropagation applies the calculus chain rule recursively backward from the loss function through each layer to compute parameter gradients.",
    },
  ],

  // ── Data Science ──────────────────────────────────────────────────────────
  "Data Science": [
    {
      id: "ds_1",
      question: "When aggregating 10 million records in memory, which data representation minimizes memory overhead and pointer indirection?",
      category: "Optimization",
      options: [
        "An array of individual pointers to dynamically allocated heap objects",
        "A contiguous Structure of Arrays (SoA) or flat columnar buffer",
        "A linked list of string dictionaries",
        "Nested recursive functions",
      ],
      correct: 1,
      explanation: "Columnar buffers (such as Apache Arrow / SoA) pack primitive numbers side-by-side in continuous memory without 8-byte pointer overhead, enabling SIMD vectorization.",
    },
    {
      id: "ds_2",
      question: "What is the Big-O average time complexity of searching for a key in a well-balanced Hash Map vs. a Binary Search Tree?",
      category: "Logic",
      options: [
        "Hash Map: O(1) average; BST: O(log N) average",
        "Hash Map: O(N); BST: O(1)",
        "Both are always O(N^2)",
        "Hash Map: O(log N); BST: O(1)",
      ],
      correct: 0,
      explanation: "Hash maps compute an index directly in O(1) average time via hash functions. Balanced BSTs (AVL, Red-Black) halve the search space at each branch in O(log N).",
    },
    {
      id: "ds_3",
      question: "In relational data manipulation, what is the difference between an `INNER JOIN` and a `LEFT OUTER JOIN`?",
      category: "Branch Specialization",
      options: [
        "INNER JOIN returns only rows with matches in both tables; LEFT JOIN returns all rows from the left table plus matched right rows",
        "LEFT JOIN deletes unmatched rows from disk",
        "INNER JOIN works only on numbers; LEFT JOIN works only on text",
        "Both produce identical results under all database engines",
      ],
      correct: 0,
      explanation: "An INNER JOIN filters for key intersection. A LEFT OUTER JOIN preserves all left table records, filling missing right-hand columns with NULL.",
    },
    {
      id: "ds_4",
      question: "What occurs during integer overflow in a 32-bit signed two's-complement integer when incrementing `2,147,483,647` by 1?",
      category: "Memory",
      options: [
        "The CPU sets it to infinity",
        "It wraps to `-2,147,483,648` (and in C is officially Undefined Behavior)",
        "The computer shuts down automatically",
        "It automatically upgrades to 64-bit without speed loss",
      ],
      correct: 1,
      explanation: "In two's-complement representation, adding 1 to the maximum positive signed integer sets the sign bit to 1, wrapping to the minimum negative value (-2^31). In C, signed overflow is Undefined Behavior.",
    },
    {
      id: "ds_5",
      question: "Why is data normalization (e.g. Min-Max scaling or Z-score standardization) critical for distance-based algorithms like KNN and K-Means?",
      category: "Architecture",
      options: [
        "It prevents algorithms from crashing with divide-by-zero",
        "It prevents features with large numeric scales (e.g. Salary: $100k) from disproportionately dominating Euclidean distance calculations over smaller features (e.g. Age: 25)",
        "It converts text into integers automatically",
        "It reduces dataset row count by 50%",
      ],
      correct: 1,
      explanation: "Euclidean distance squares feature differences. Unscaled large attributes dwarf small-range attributes unless normalized into standardized ranges.",
    },
  ],

  // ── ECE & EEE ─────────────────────────────────────────────────────────────
  "Electronics & Communication": [
    {
      id: "ece_1",
      question: "In microcontroller embedded programming, what does setting the bitwise expression `PORTB |= (1 << 3);` accomplish?",
      category: "Branch Specialization",
      options: [
        "Clears pin 3 of Port B to LOW (0V)",
        "Sets pin 3 of Port B to HIGH (3.3V/5V) without altering other Port B pins",
        "Toggles all 8 pins of Port B simultaneously",
        "Shuts down the microcontroller clock",
      ],
      correct: 1,
      explanation: "Bitwise OR with a mask `(1 << 3)` (binary `00001000`) forces bit 3 to 1 while leaving all other bits completely unchanged.",
    },
    {
      id: "ece_2",
      question: "Why is the `volatile` keyword essential when declaring a variable accessed by both an Interrupt Service Routine (ISR) and the main loop in C?",
      category: "Memory",
      options: [
        "It makes the variable read-only",
        "It tells the compiler optimizer not to cache the variable in CPU registers, forcing reads from actual RAM every time",
        "It encrypts the variable bits in flash memory",
        "It allocates the variable on the external EEPROM",
      ],
      correct: 1,
      explanation: "Without `volatile`, the compiler may optimize away loop checks by assuming no other code modifies the variable, missing changes made asynchronously by hardware interrupts.",
    },
    {
      id: "ece_3",
      question: "What is the memory size in bytes of a 32-bit ARM Cortex-M register?",
      category: "Architecture",
      options: ["1 byte (8 bits)", "2 bytes (16 bits)", "4 bytes (32 bits)", "8 bytes (64 bits)"],
      correct: 2,
      explanation: "A 32-bit processor's internal registers (r0 through r15) are exactly 32 bits (4 bytes) wide.",
    },
    {
      id: "ece_4",
      question: "What is the binary two's complement representation of the decimal integer `-5` in an 8-bit signed byte?",
      category: "Logic",
      options: ["10000101", "11111011", "11111010", "00000101"],
      correct: 1,
      explanation: "+5 in 8 bits is `00000101`. Invert bits -> `11111010`. Add 1 -> `11111011` (0xFB).",
    },
    {
      id: "ece_5",
      question: "In UART serial communication, what is the purpose of the Baud Rate setting?",
      category: "Optimization",
      options: [
        "It defines the data transmission speed in bits per second (bps) so sender and receiver sample bits synchronously without a shared clock wire",
        "It defines the maximum voltage of the wire",
        "It encrypts the message with AES-128",
        "It counts the number of dropped packets",
      ],
      correct: 0,
      explanation: "UART is asynchronous (no clock line). Both endpoints must agree on the bit duration (baud rate) to sample signal levels at the correct microsecond intervals.",
    },
  ],

  // ── General / Mechanical / Others ──────────────────────────────────────────
  "General Engineering": [
    {
      id: "gen_1",
      question: "In modern computing, what does the Von Neumann Architecture define as its core premise?",
      category: "Architecture",
      options: [
        "Programs must be written in assembly without compilers",
        "Program instructions and program data share the same unified memory space",
        "Hardware must contain at least 16 separate physical processors",
        "Data is stored permanently on magnetic tape",
      ],
      correct: 1,
      explanation: "The Von Neumann architecture features a shared memory system where both instructions and data are stored as binary words, fetched by the CPU's Control Unit.",
    },
    {
      id: "gen_2",
      question: "Which of the following algorithm time complexities represents the fastest asymptotic execution as input size N grows to millions?",
      category: "Optimization",
      options: ["O(N^2) quadratic", "O(N log N) linearithmic", "O(log N) logarithmic", "O(N) linear"],
      correct: 2,
      explanation: "Logarithmic time O(log N) grows extremely slowly. For N = 1,000,000, log2(N) is only ~20 operations, compared to 1,000,000 for O(N).",
    },
    {
      id: "gen_3",
      question: "What does the `&` operator represent in C when placed before a variable name (e.g. `&speed`)?",
      category: "Memory",
      options: [
        "Computes the boolean AND with speed",
        "Returns the physical/virtual RAM memory address where `speed` is stored",
        "Doubles the value of speed",
        "Clears the variable to 0",
      ],
      correct: 1,
      explanation: "The `&` is the address-of operator, yielding a pointer holding the memory offset of the operand variable.",
    },
    {
      id: "gen_4",
      question: "Why do software loops sometimes result in infinite hangs (freezing)?",
      category: "Logic",
      options: [
        "The computer runs out of electric power",
        "The loop termination condition is never reached or the incrementing state variable is never updated inside the loop body",
        "The CPU cannot execute more than 100 iterations",
        "The compiler deleted the loop",
      ],
      correct: 1,
      explanation: "A `while` or `for` loop continues executing as long as its conditional evaluates to true. If state never modifies the condition, the CPU executes it indefinitely.",
    },
    {
      id: "gen_5",
      question: "In simulation and computational engineering, what is the primary role of data structures like arrays and matrices?",
      category: "Branch Specialization",
      options: [
        "To format printed text for user display",
        "To store physical system states (temperatures, velocities, mesh nodes) contiguously for high-speed mathematical processing",
        "To compress files on disk",
        "To manage operating system permissions",
      ],
      correct: 1,
      explanation: "Numerical simulations discretize physical continuous spaces into grids or matrices, using contiguous memory for vector and tensor updates.",
    },
  ],
};

// Fallback lookup
export function getDiagnosticQuestionsForBranch(branch: string): DiagnosticQuestion[] {
  if (DIAGNOSTIC_QUESTIONS_BY_BRANCH[branch]) {
    return DIAGNOSTIC_QUESTIONS_BY_BRANCH[branch];
  }
  if (branch.includes("AI") || branch.includes("Machine Learning")) {
    return DIAGNOSTIC_QUESTIONS_BY_BRANCH["Artificial Intelligence & ML"];
  }
  if (branch.includes("Data")) {
    return DIAGNOSTIC_QUESTIONS_BY_BRANCH["Data Science"];
  }
  if (branch.includes("Electronics") || branch.includes("Electrical") || branch.includes("Communication")) {
    return DIAGNOSTIC_QUESTIONS_BY_BRANCH["Electronics & Communication"];
  }
  if (branch.includes("Computer") || branch.includes("Information") || branch.includes("Software")) {
    return DIAGNOSTIC_QUESTIONS_BY_BRANCH["Computer Science & Engineering"];
  }
  return DIAGNOSTIC_QUESTIONS_BY_BRANCH["General Engineering"];
}

// ─── Path Generation Engine ──────────────────────────────────────────────────

export function generatePersonalizedPath(
  score: number,
  total: number,
  branch: string,
  year: string,
  answers: { question: DiagnosticQuestion; isCorrect: boolean }[]
): PersonalizedPath {
  const percentage = Math.round((score / total) * 100);

  // Categorize skills
  const skillMap: Record<string, { correct: number; total: number }> = {};
  answers.forEach(({ question, isCorrect }) => {
    if (!skillMap[question.category]) {
      skillMap[question.category] = { correct: 0, total: 0 };
    }
    skillMap[question.category].total++;
    if (isCorrect) skillMap[question.category].correct++;
  });

  const skillsAssessed = Object.keys(skillMap).map((cat) => ({
    name: cat,
    score: skillMap[cat].correct,
    max: skillMap[cat].total,
  }));

  if (percentage <= 40) {
    // Foundational Tier
    return {
      tier: "Foundational",
      title: `${branch} • Systems Foundations Track`,
      tagline: "Master core computer architecture, memory models, and syntax from first principles.",
      score,
      total,
      percentage,
      branch,
      year,
      recommendedLessonId: "programming-fundamentals",
      recommendedLessonTitle: "Lesson 1: Programming Fundamentals & Von Neumann Model",
      recommendedProjectId: "cli-calculator",
      recommendedProjectTitle: "Milestone Project 1: Robust CLI Scientific Calculator",
      mentorPrompt: `I just completed my diagnostic quiz with a score of ${score}/${total} for ${branch} (${year}). Explain memory models and variable lifetimes simply with diagrams.`,
      skillsAssessed,
      weeklyPlan: [
        { week: 1, focus: "CPU Fetch-Decode Cycle & Linux Compilation Pipeline", deliverables: "Complete Lessons 1 & 2 + First Hello World in C" },
        { week: 2, focus: "Data Types, LP64 Sizing & Input/Output Buffer Safety", deliverables: "Complete Lessons 3 & 4 + Build CLI Calculator" },
        { week: 3, focus: "Control Flow, 15-Level Precedence & Canonical Loops", deliverables: "Complete Lessons 5, 6 & 7 + Loops Practice" },
        { week: 4, focus: "Activation Frames & Pointers Introduction", deliverables: "Complete Lesson 8 + AI Mentor Review" },
      ],
    };
  } else if (percentage <= 80) {
    // Intermediate Tier
    return {
      tier: "Intermediate",
      title: `${branch} • Accelerated Systems Builder Track`,
      tagline: "Fast-track through syntax to focus on memory management, pointer arithmetic, and CLI systems.",
      score,
      total,
      percentage,
      branch,
      year,
      recommendedLessonId: "operators",
      recommendedLessonTitle: "Lesson 5: Operators, Bitwise Manipulation & Undefined Behavior",
      recommendedProjectId: "student-grade-system",
      recommendedProjectTitle: "Milestone Project 2: Student Record Management System",
      mentorPrompt: `I scored ${score}/${total} on my diagnostic quiz for ${branch} (${year}). I have strong basics but want to master dynamic heap allocation, pointers, and cache efficiency.`,
      skillsAssessed,
      weeklyPlan: [
        { week: 1, focus: "Bitwise Idioms, Short-Circuit Evaluation & Cache Strides", deliverables: "Complete Lessons 5, 6 & 7 + Bitwise Masking" },
        { week: 2, focus: "Stack Frame Calling Conventions & Function Pointer Callbacks", deliverables: "Complete Lesson 8 + Student Grade System" },
        { week: 3, focus: "Virtual Memory, Contiguous Buffers & Struct Padding", deliverables: "Complete Lessons 9 & 10 + Vector Project" },
      ],
    };
  } else {
    // Advanced Tier
    return {
      tier: "Advanced",
      title: `${branch} • High-Performance Systems Architect Track`,
      tagline: "Skip routine syntax and dive straight into virtual address spaces, data structure engineering, and low-level optimizations.",
      score,
      total,
      percentage,
      branch,
      year,
      recommendedLessonId: "arrays-strings",
      recommendedLessonTitle: "Lesson 9: Arrays, Strings & Cache Spatial Locality",
      recommendedProjectId: "bank-account-manager",
      recommendedProjectTitle: "Milestone Project 3: High-Reliability Bank Account Manager",
      mentorPrompt: `I scored a perfect/near-perfect ${score}/${total} on the diagnostic test for ${branch} (${year}). I want advanced systems design challenges, assembly analysis, and kernel-level code patterns.`,
      skillsAssessed,
      weeklyPlan: [
        { week: 1, focus: "Scale-Index-Base Addressing & Buffer Security Exploits", deliverables: "Complete Lesson 9 + String Sanitizer Engine" },
        { week: 2, focus: "Dynamic Heap Mechanics (malloc/free) & Struct Alignment", deliverables: "Complete Lesson 10 + Build Custom Vector Lib" },
        { week: 3, focus: "Capstone Architecture & Systems Integration", deliverables: "Complete Bank Manager Project + Tech Interview Prep" },
      ],
    };
  }
}
