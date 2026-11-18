import { ALL_CURRICULUM_TRACKS, CurriculumLesson } from "@/data/courseCurriculum";
import { getLessonQuiz } from "@/data/lessonQuizzes";

export type MentorMode =
  | "EXPLAIN"
  | "HINT"
  | "DEBUG"
  | "PRACTICE"
  | "QUIZ"
  | "PROJECT"
  | "ROADMAP"
  | "CAREER";

export interface StudentProfile {
  name: string;
  branch: string;
  year: string;
  goal: string;
  interests: string[];
  completedLessons: number;
}

export interface InteractiveMentorResult {
  text: string;
  analogy?: string;
  visualDiagram?: string;
  codeSnippet?: { lang: string; code: string; title?: string };
  quiz?: {
    question: string;
    options: string[];
    correct: string;
    explanation: string;
  };
  followUps: string[];
  lessonId?: string;
  lessonTitle?: string;
}

// Flatten all lessons across all curriculum tracks
export const ALL_LESSONS: CurriculumLesson[] = ALL_CURRICULUM_TRACKS.flatMap(
  (track) => track.lessons
);

// Map of slug/id to Lesson for instant O(1) lookup
export const LESSON_MAP: Map<string, CurriculumLesson> = new Map();
ALL_LESSONS.forEach((lesson) => {
  LESSON_MAP.set(lesson.id.toLowerCase(), lesson);
  const routeSlug = lesson.route.replace(/^\/lessons\//, "").toLowerCase();
  LESSON_MAP.set(routeSlug, lesson);
});

export interface SubjectTopic {
  id: string;
  keywords: string[];
  title: string;
  lessonId?: string;
  category: string;
  summary: string;
  analogy: string;
  visualDiagram: string;
  explanation: string;
  codeSnippet?: { lang: string; code: string; title?: string };
  commonBugs: string[];
  practiceChallenge: { title: string; prompt: string; constraints: string };
  quizQuestion: {
    question: string;
    options: string[];
    correct: string;
    explanation: string;
  };
  followUps: string[];
}

export const TOPIC_DATABASE: SubjectTopic[] = [
  // ── 1. C POINTERS & MEMORY ────────────────────────────────────────────────
  {
    id: "c-pointers",
    keywords: ["pointer", "pointers", "address", "dereference", "*ptr", "&var", "indirection", "segfault", "segmentation fault", "null pointer"],
    title: "Pointers & Memory Addresses in C",
    lessonId: "c-pointers-memory",
    category: "C Foundations",
    summary: "A pointer is simply a variable that stores a memory address (a number identifying a slot in RAM) instead of holding direct data.",
    analogy: `Imagine a street of houses. Each house has an address (like '42 Oak Lane') and contains furniture.
- A regular variable is the house with furniture inside.
- The address-of operator '&' is looking up the house number on Google Maps.
- A pointer variable is a sticky note where you write down '42 Oak Lane'.
- Dereferencing '*' is walking to '42 Oak Lane', opening the door, and rearranging the furniture inside!`,
    visualDiagram: `+----------------------+         +-----------------------+
|  Pointer Variable: ptr| ------> | Variable: score       |
|  Address:  0x7ffd20  | points  | Address:  0x7ffd10    |
|  Value:    0x7ffd10  | to      | Value:    95 (or 100) |
+----------------------+         +-----------------------+`,
    explanation: `### Pointers in C Made Super Simple

1. **Every variable lives in a numbered memory box in RAM**:
   - \`int score = 95;\` puts 95 into a box at address \`0x7ffd10\`.
2. **The \`&\` (Address-of) Operator**:
   - \`&score\` asks the computer: *"What is the memory address of this box?"*
3. **The \`*\` (Dereference) Operator**:
   - When declaring: \`int *ptr = &score;\` means *"ptr is a pointer pointing to an integer box"*.
   - When using: \`*ptr = 100;\` means *"Go to that address and change whatever is inside to 100"*.

#### Why do we need pointers?
- **Pass-by-Reference**: Allows functions to modify variables in another function directly without copying huge memory blocks.
- **Dynamic Memory**: Required for \`malloc\` when you don't know array sizes in advance.`,
    codeSnippet: {
      lang: "c",
      title: "Pointers & Swapping Memory",
      code: `#include <stdio.h>

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 10, y = 20;
    printf("Before swap: x=%d, y=%d\\n", x, y);

    swap(&x, &y); // Pass addresses
    printf("After swap:  x=%d, y=%d\\n", x, y);

    return 0;
}`,
    },
    commonBugs: [
      "Dereferencing NULL: Trying to open a house door when your sticky note says 'address 0' (causes Segmentation Fault!).",
      "Forgetting the `&` in `scanf(\"%d\", &num)`: Passing the value instead of the memory location.",
      "Returning a pointer to a local stack variable: The memory is erased as soon as the function finishes.",
    ],
    practiceChallenge: {
      title: "Reverse Array In-Place with Two Pointers",
      prompt: "Write a function `void reverse(int *start, int *end)` that swaps elements moving toward the center until `start >= end`.",
      constraints: "O(n) time, O(1) space, no secondary arrays.",
    },
    quizQuestion: {
      question: "Given `int val = 42; int *ptr = &val;`, what does `*ptr += 8;` do?",
      options: [
        "A. Increments the memory address stored in ptr by 8 bytes",
        "B. Modifies the value of val from 42 to 50",
        "C. Causes a compiler error because pointers cannot be added to",
        "D. Creates a new pointer at address 50",
      ],
      correct: "B",
      explanation: "`*ptr` dereferences the pointer to access `val`. Adding 8 updates `val` to 50.",
    },
    followUps: [
      "🔍 Can you explain the code line-by-line?",
      "🐛 Why does dereferencing NULL crash my program?",
      "🎯 Give me a beginner pointer practice challenge",
      "💻 How do I practice pointers in the Terminal?",
    ],
  },

  // ── 2. DYNAMIC MEMORY ALLOCATION ─────────────────────────────────────────
  {
    id: "c-dynamic-memory",
    keywords: ["malloc", "calloc", "realloc", "free", "heap", "stack", "dynamic memory", "memory leak", "valgrind"],
    title: "Dynamic Memory: malloc, calloc, realloc & free",
    lessonId: "c-dynamic-memory",
    category: "C Foundations",
    summary: "Dynamic memory allocates chunks of RAM on the Heap at runtime. You must free this memory manually when done.",
    analogy: `Think of the Stack like a tray dispenser in a cafeteria: plates are quickly stacked and popped off automatically.
The Heap is like renting a storage locker from a warehouse manager:
- You ask the manager for 50 square feet ('malloc(50)').
- The manager hands you the key with the locker number (the pointer).
- When you are finished, you MUST return the key ('free(ptr)').
- If you forget to return the key, the warehouse fills up and nobody else can rent lockers (a Memory Leak)!`,
    visualDiagram: `+-----------------------------------------------+
|  STACK: Fast, automatic, small (local vars)   |
|  int x, int y, function call frames           |
+-----------------------------------------------+
                        |
                        v
+-----------------------------------------------+
|  HEAP: Large, flexible, manual (malloc/free)  |
|  [ malloc(1024) ] ----> returns address to ptr|
+-----------------------------------------------+`,
    explanation: `### Dynamic Memory in C Explained

1. **\`malloc(size)\`**: Allocates raw memory in bytes. Warning: memory contains whatever leftover garbage bits were previously there!
2. **\`calloc(count, size)\`**: Allocates memory and sets all bytes cleanly to **0**.
3. **\`realloc(ptr, new_size)\`**: Resizes an existing heap allocation if you need more or less space.
4. **\`free(ptr)\`**: Releases the memory back to the Operating System.

**Golden Rule**: Every single \`malloc()\` or \`calloc()\` must have exactly one corresponding \`free()\`!`,
    codeSnippet: {
      lang: "c",
      title: "Safe Heap Allocation Pattern",
      code: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int n = 5;
    int *arr = (int*)malloc(n * sizeof(int));

    // 1. ALWAYS check if allocation succeeded!
    if (arr == NULL) {
        printf("Memory allocation failed!\\n");
        return 1;
    }

    // 2. Use the memory safely
    for (int i = 0; i < n; i++) {
        arr[i] = (i + 1) * 10;
        printf("arr[%d] = %d\\n", i, arr[i]);
    }

    // 3. Clean up
    free(arr);
    arr = NULL; // Prevents dangling pointer!
    return 0;
}`,
    },
    commonBugs: [
      "Memory Leak: Discarding the pointer before calling `free()`. The OS cannot reclaim that RAM until the program exits.",
      "Dangling Pointer: Accessing `*arr` after calling `free(arr)`. Fix: Set `arr = NULL` immediately after freeing.",
      "Double Free: Calling `free(arr)` twice on the exact same pointer crashes your program immediately.",
    ],
    practiceChallenge: {
      title: "Dynamic Growable Array (Vector)",
      prompt: "Write a program that starts with an array of size 2, and every time the user enters more numbers, uses `realloc` to double its capacity.",
      constraints: "Handle realloc failure without leaking previous memory.",
    },
    quizQuestion: {
      question: "What is the key difference between `malloc(n * sizeof(int))` and `calloc(n, sizeof(int))`?",
      options: [
        "A. `malloc` allocates on the Stack while `calloc` allocates on the Heap",
        "B. `calloc` automatically initializes all allocated bytes to zero, whereas `malloc` leaves memory uninitialized (garbage values)",
        "C. `malloc` cannot allocate memory for arrays",
        "D. `calloc` automatically calls free() when the function ends",
      ],
      correct: "B",
      explanation: "`calloc` cleans and zeroes out every byte in the allocation, while `malloc` simply returns whatever bits were previously in that RAM location.",
    },
    followUps: [
      "🔍 What happens if I forget to call free()?",
      "💡 What is a dangling pointer and how do I prevent it?",
      "🎯 Give me a dynamic memory practice challenge",
      "💻 Open this code in the Terminal to run it",
    ],
  },

  // ── 3. PYTHON COMPREHENSIONS & DATA STRUCTURES ───────────────────────────
  {
    id: "python-basics",
    keywords: ["python", "list comprehension", "dictionary", "dict", "tuple", "set", "python loops", "lambda", "f-string"],
    title: "Python Lists, Dictionaries & Comprehensions",
    lessonId: "python-syntax-types",
    category: "Python Foundations",
    summary: "Python emphasizes readable code with concise list comprehensions and fast O(1) key-value dictionary lookups.",
    analogy: `A list comprehension is like an assembly line with a bouncer:
Instead of saying:
1. 'Get an empty box.'
2. 'Pick up item 1. Is it a gift? Yes, wrap it and put it in the box.'
3. 'Pick up item 2. Is it a gift? No, skip it.'
In Python you just say:
'[wrap(item) for item in pile if item.is_gift]'! One clear sentence replaces 6 lines of tedious boilerplate.`,
    visualDiagram: `Traditional 5-line Loop:                Python 1-line Comprehension:
result = []                            result = [x * 2 for x in nums if x > 0]
for x in nums:                                      |        |          |
    if x > 0:                                     output   loop      filter
        result.append(x * 2)`,
    explanation: `### Modern Python Made Crystal Clear

1. **List Comprehensions**:
   - Syntax: \`[expression for item in iterable if condition]\`
   - Super fast, readable, and written in one clean expression.
2. **Dictionaries (\`dict\`)**:
   - Key-value hash tables with average **$O(1)$** lookup time.
   - Example: \`student = {"name": "Aarav", "gpa": 3.9}\`.
3. **F-Strings for Clean Output**:
   - \`print(f"Student: {student['name']} has GPA {student['gpa']:.2f}")\`.`,
    codeSnippet: {
      lang: "python",
      title: "Pythonic Comprehensions & Stats",
      code: `# Modern Pythonic Data Processing
scores = [85, 92, 78, 65, 99, 88, 72]

# 1. Filter and transform in one clean line
distinction = [s for s in scores if s >= 90]
scaled = [round(s * 1.05, 1) for s in scores]

# 2. Dictionary comprehension
grade_map = {f"Student {i+1}": s for i, s in enumerate(scores)}

print(f"Top Scorers (>=90): {distinction}")
print(f"Scaled Scores:     {scaled}")
print(f"Gradebook:         {grade_map}")
`,
    },
    commonBugs: [
      "KeyError: Trying to access `data['missing_key']`. Fix: Use `data.get('missing_key', default)`.",
      "Mutating a list while looping over it: Skips elements because indices shift dynamically.",
      "Mixing Tabs and Spaces: Python will throw an `IndentationError`.",
    ],
    practiceChallenge: {
      title: "Frequency Counter with Dictionary",
      prompt: "Write a function `char_frequency(text)` that returns a dictionary mapping each lowercase letter to the number of times it appears, ignoring spaces.",
      constraints: "O(n) time, single pass.",
    },
    quizQuestion: {
      question: "What is the output of `[x * 2 for x in [1, 2, 3, 4] if x % 2 == 0]` in Python?",
      options: [
        "A. [2, 4, 6, 8]",
        "B. [4, 8]",
        "C. [2, 4]",
        "D. [1, 3]",
      ],
      correct: "B",
      explanation: "The filter `if x % 2 == 0` picks only the even numbers: 2 and 4. Doubling them yields `[4, 8]`.",
    },
    followUps: [
      "🔍 How do dictionary comprehensions work?",
      "💡 Explain Python lists vs tuples in simple terms",
      "🎯 Give me a Python data structures challenge",
      "💻 Run this Python code in the Terminal",
    ],
  },

  // ── 4. GIT & GITHUB VERSION CONTROL ──────────────────────────────────────
  {
    id: "git-github",
    keywords: ["git", "github", "commit", "push", "pull", "merge conflict", "branch", "staging", "rebase", "pull request", "pr"],
    title: "Git, GitHub & Resolving Merge Conflicts",
    lessonId: "git-github-foundations",
    category: "Developer Tools",
    summary: "Git is a time-machine for code that tracks file changes through snapshots (commits) and lets multiple engineers collaborate via branches.",
    analogy: `Think of Git like a video game with manual save slots and parallel universes:
- Your working folder is you playing the game right now.
- 'git add' is choosing which inventory items you want in your save file.
- 'git commit' is clicking 'SAVE GAME (Slot 12)'. You can always reload this checkpoint if anything breaks!
- A 'branch' is a parallel universe where you can try a risky side quest without ruining the main storyline.
- A 'merge conflict' is when two players save different actions on the exact same level at the exact same minute — Git pauses and asks: 'Which player's move do you want to keep?'`,
    visualDiagram: `Working Tree            Staging Area (Index)         Local Repository
 [ Edit files ] ------->  [ git add file.c ] --------> [ git commit -m "feat" ]
                              (Ready to save)              (Permanent Snapshot)
                                                                    |
                                                                    v  git push
                                                           [ GitHub Cloud Repo ]`,
    explanation: `### Master Git in 4 Simple Concepts

1. **The 3 Stages of Code**:
   - **Working Directory**: Modified files on your computer.
   - **Staging Area (\`git add\`)**: Files selected for the upcoming snapshot.
   - **Repository (\`git commit\`)**: Permanent historical snapshot with a message.
2. **Branches (\`git checkout -b feature\`)**:
   - Never write experimental code directly on \`main\`! Create a branch, test your changes, and merge them.
3. **Solving Merge Conflicts**:
   - Git inserts conflict markers:
     \`\`\`
     <<<<<<< HEAD (Your branch)
     int max_users = 500;
     =======
     int max_users = 1000;
     >>>>>>> main
     \`\`\`
   - To fix: Delete the marker lines (\`<<<<<<<\`, \`=======\`, \`>>>>>>>\`), pick the right number, run \`git add\`, and commit!`,
    codeSnippet: {
      lang: "bash",
      title: "Standard Professional Git Workflow",
      code: `# 1. Create a clean feature branch
git checkout -b feature/login-page

# 2. Check what files were modified
git status

# 3. Stage and commit with meaningful message
git add src/login.js
git commit -m "feat: add user password validation"

# 4. Push to GitHub and open a Pull Request
git push -u origin feature/login-page
`,
    },
    commonBugs: [
      "Committing sensitive files like `.env` or passwords! Always add `.env` to `.gitignore` first.",
      "Merge conflict fear: People panic when they see `<<<<<<<`. It simply means Git wants you to pick which line is correct.",
      "Detached HEAD state: Checking out a raw commit hash instead of a branch name.",
    ],
    practiceChallenge: {
      title: "Simulate Branch Creation & Merge",
      prompt: "Explain the exact commands to create branch `test-feature`, edit a file, stage it, commit it, switch back to `main`, and merge `test-feature`.",
      constraints: "Use modern Git CLI syntax.",
    },
    quizQuestion: {
      question: "Which command temporarily shelves uncommitted changes so you can pull or switch branches without losing work?",
      options: [
        "A. git reset --hard",
        "B. git stash",
        "C. git branch -d",
        "D. git clean -fd",
      ],
      correct: "B",
      explanation: "`git stash` saves dirty uncommitted changes onto a temporary clipboard. You can re-apply them later with `git stash pop`.",
    },
    followUps: [
      "🔍 How do I fix a merge conflict step-by-step?",
      "💡 What is the difference between git merge and git rebase?",
      "🎯 Give me a Git terminal workflow challenge",
      "💻 Run shell commands in the Terminal",
    ],
  },

  // ── 5. LINKED LISTS & POINTER CHAINS ─────────────────────────────────────
  {
    id: "dsa-linked-lists",
    keywords: ["linked list", "linked lists", "node", "head", "next", "singly linked list", "doubly linked list", "reverse linked list", "cycle detection"],
    title: "Linked Lists: Nodes, Chains & Traversal",
    lessonId: "dsa-linked-lists",
    category: "Data Structures",
    summary: "A Linked List is a dynamic sequence of nodes where each node holds data and a pointer to the next node in RAM.",
    analogy: `Think of an Array like a parking lot: spaces 1 through 10 are side-by-side. If a bus arrives, it needs 10 consecutive spots. If space 5 is taken, the whole bus cannot park!
A Linked List is like a Treasure Hunt:
- Clue #1 is under a rock. When you read it, it gives you a prize AND says: 'Go look inside the clock tower.'
- The clock tower gives you a prize AND says: 'Go look inside the fountain.'
- The fountain says: 'NULL (End of hunt).'
The clues can be scattered anywhere in the city, but you can always find every clue by following the trail!`,
    visualDiagram: `HEAD
  |
  v
+--------+------+      +--------+------+      +--------+------+
| Data:10| Next | ---> | Data:20| Next | ---> | Data:30| NULL |
+--------+------+      +--------+------+      +--------+------+`,
    explanation: `### Linked Lists in Plain English

1. **What is a Node?**:
   - A node is a simple container:
     \`\`\`c
     struct Node {
         int data;
         struct Node *next; // Pointer to next node
     };
     \`\`\`
2. **Advantages over Arrays**:
   - Dynamic size: Can grow or shrink anytime without reallocating large contiguous memory blocks.
   - Insert/Delete at Head is **$O(1)$** constant time!
3. **Disadvantages**:
   - No direct indexing: To get the 5th item, you must start at \`head\` and walk 5 steps ($O(n)$ access).`,
    codeSnippet: {
      lang: "c",
      title: "Reversing a Linked List In-Place",
      code: `#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *next;
};

// Reverse in O(n) time and O(1) extra space
struct Node* reverseList(struct Node *head) {
    struct Node *prev = NULL;
    struct Node *curr = head;
    struct Node *next = NULL;

    while (curr != NULL) {
        next = curr->next; // 1. Remember next node
        curr->next = prev; // 2. Reverse arrow!
        prev = curr;       // 3. Move prev forward
        curr = next;       // 4. Move curr forward
    }
    return prev; // New head!
}
`,
    },
    commonBugs: [
      "Losing the rest of the list: Overwriting `curr->next` before saving the next node into a temporary variable.",
      "Dereferencing NULL: Accessing `node->next` when `node` is already NULL.",
      "Memory leak on deletion: Deleting a node without freeing its allocated heap memory.",
    ],
    practiceChallenge: {
      title: "Detect Cycle with Floyd's Tortoise & Hare",
      prompt: "Implement cycle detection using slow and fast pointers. If fast meets slow, return true. If fast hits NULL, return false.",
      constraints: "O(n) time, O(1) space.",
    },
    quizQuestion: {
      question: "What is the time complexity to insert a new node at the very beginning (head) of a singly linked list?",
      options: [
        "A. O(1)",
        "B. O(n)",
        "C. O(log n)",
        "D. O(n²)",
      ],
      correct: "A",
      explanation: "Inserting at the head takes only 2 pointer assignments (`newNode->next = head; head = newNode;`), taking constant O(1) time.",
    },
    followUps: [
      "🔍 How does the 3-pointer reversal work step-by-step?",
      "💡 What is Floyd's Tortoise and Hare algorithm?",
      "🎯 Give me a linked list challenge",
      "💻 Practice linked list code in the Terminal",
    ],
  },

  // ── 6. BINARY SEARCH & SORTING ───────────────────────────────────────────
  {
    id: "dsa-sorting-searching",
    keywords: ["binary search", "search", "sorting", "merge sort", "quicksort", "bubble sort", "two pointers", "sliding window", "big o"],
    title: "Binary Search, MergeSort & QuickSort",
    lessonId: "dsa-sorting-searching",
    category: "Algorithms",
    summary: "Binary search eliminates half the search space every step on sorted data, running in blazing fast O(log n) time.",
    analogy: `Imagine looking up the word 'Pointers' in a 1,000-page physical dictionary:
- Linear Search: You start on page 1, then page 2, page 3... reading 600 pages before finding 'P'. Very slow!
- Binary Search: You open page 500 (letter 'M'). 'P' comes after 'M', so you tear away pages 1-500. Next, you open page 750 (letter 'T'). 'P' comes before 'T', so you discard 750-1000.
In only 10 flips (log₂ 1000 ≈ 10), you find the exact page out of a thousand!`,
    visualDiagram: `Array (Sorted): [ 3,  8, 12, 19, 25, 33, 42, 55, 68 ]
Step 1: Low = 0, High = 8, Mid = 4 (Value: 25)
Target = 42 -> 42 > 25, so search right half!
New range: [ 33, 42, 55, 68 ] (Half eliminated in 1 check!)`,
    explanation: `### Binary Search & Sorting in Plain English

1. **Binary Search Prerequisite**: The array **MUST be sorted**!
2. **How Binary Search Works**:
   - \`mid = low + (high - low) / 2\` (prevents integer overflow!).
   - If \`arr[mid] == target\`, found!
   - If \`arr[mid] < target\`, search right half (\`low = mid + 1\`).
   - If \`arr[mid] > target\`, search left half (\`high = mid - 1\`).
3. **MergeSort vs QuickSort**:
   - **MergeSort**: Guarantees **$O(n \\log n)$** even in worst case by splitting arrays in half and merging.
   - **QuickSort**: Picks a pivot; average is $O(n \\log n)$, but in-place with tiny memory overhead.`,
    codeSnippet: {
      lang: "python",
      title: "Binary Search Implementation",
      code: `def binary_search(arr, target):
    low = 0
    high = len(arr) - 1

    while low <= high:
        mid = low + (high - low) // 2
        
        if arr[mid] == target:
            return mid  # Found at index mid!
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1

    return -1  # Target not in array
`,
    },
    commonBugs: [
      "Running Binary Search on an unsorted list: Fails silently.",
      "Infinite loop bug: Writing `low = mid` instead of `low = mid + 1`.",
      "Integer overflow in C/Java: `(low + high) / 2` overflows for large arrays. Use `low + (high - low) / 2`.",
    ],
    practiceChallenge: {
      title: "Search in Rotated Sorted Array",
      prompt: "Given a sorted array rotated at a pivot (e.g. [4,5,6,7,0,1,2]), find the target index in O(log n) time.",
      constraints: "O(log n) time, O(1) space.",
    },
    quizQuestion: {
      question: "Which sorting algorithm guarantees O(n log n) time complexity in the absolute worst case?",
      options: [
        "A. QuickSort",
        "B. BubbleSort",
        "C. MergeSort",
        "D. SelectionSort",
      ],
      correct: "C",
      explanation: "MergeSort always divides the array into two halves regardless of order, guaranteeing O(n log n) in best, average, and worst cases.",
    },
    followUps: [
      "🔍 How does MergeSort merge two halves?",
      "💡 What is QuickSort partitioning in simple terms?",
      "🎯 Give me an online assessment binary search challenge",
      "💻 Test this search algorithm in the Terminal",
    ],
  },

  // ── 7. OBJECT-ORIENTED PROGRAMMING (OOP) ──────────────────────────────────
  {
    id: "oop-core",
    keywords: ["oop", "object oriented", "encapsulation", "inheritance", "polymorphism", "abstraction", "class", "object", "solid"],
    title: "OOP 4 Pillars & Clean Architecture",
    lessonId: "oop-core-pillars",
    category: "Core CS",
    summary: "Object-Oriented Programming models software as interacting objects based on Encapsulation, Abstraction, Inheritance, and Polymorphism.",
    analogy: `Think of a Car:
- Blueprint vs Car: The engineering blueprint is the Class; the physical car parked in your driveway is the Object.
- Encapsulation: The engine pistons and spark plugs are enclosed under the hood so you don't mess with them directly.
- Abstraction: You drive the car using a simple steering wheel and pedals; you don't need to know how fuel injection timing works.
- Inheritance: An ElectricCar inherits the steering wheel and wheels from Car, but swaps out the gas tank for a battery.
- Polymorphism: Pressing 'accelerate' speeds up a GasCar (injects fuel) and an ElectricCar (sends voltage to motor) in different ways using the exact same pedal!`,
    visualDiagram: `                   +--------------------+
                   |     Class: Car     |
                   | - engineSpeed      |
                   | + drive()          |
                   +--------------------+
                             |
             +---------------+---------------+
             |                               |
  +----------------------+       +----------------------+
  | Class: ElectricCar   |       | Class: SportsCar     |
  | overrides drive()    |       | overrides drive()    |
  +----------------------+       +----------------------+`,
    explanation: `### The 4 Pillars of OOP in 2 Minutes

1. **Encapsulation**: Hide data behind private variables and expose controlled getters/setters.
2. **Abstraction**: Hide internal complexity and show only clean public methods.
3. **Inheritance**: Reuse code from parent classes (\`class Dog extends Animal\`).
4. **Polymorphism**: 'Many forms' — call the same method (\`shape.draw()\`), and each child class executes its unique implementation.`,
    codeSnippet: {
      lang: "javascript",
      title: "Polymorphism with Payment Processors",
      code: `class PaymentProcessor {
  process(amount) {
    throw new Error("Must implement process method");
  }
}

class CardPaymentProcessor extends PaymentProcessor {
  process(amount) {
    return \`Charging $\${amount} via Card Gateway API.\`;
  }
}

class RazorpayProcessor extends PaymentProcessor {
  process(amount) {
    return \`Charging ₹\${amount} via Razorpay UPI.\`;
  }
}

// Client code doesn't care which processor is passed!
function checkout(processor, amount) {
  console.log(processor.process(amount));
}
`,
    },
    commonBugs: [
      "Violating encapsulation by making all fields public.",
      "Overusing deep inheritance trees: In modern engineering, favor composition over inheritance.",
    ],
    practiceChallenge: {
      title: "Bank Account with Encapsulation",
      prompt: "Create a BankAccount class with private balance, deposit, withdraw, and transaction history. Prevent withdrawing more than the current balance.",
      constraints: "Ensure zero illegal state mutations.",
    },
    quizQuestion: {
      question: "Which OOP pillar allows calling `animal.makeSound()` and having Dog bark while Cat meows without the caller knowing the specific class?",
      options: [
        "A. Encapsulation",
        "B. Polymorphism",
        "C. Serialization",
        "D. Compilation",
      ],
      correct: "B",
      explanation: "Polymorphism ('many forms') allows different subclasses to implement a common method in distinct ways.",
    },
    followUps: [
      "🔍 What is Method Overloading vs Method Overriding?",
      "💡 Explain the SOLID principles in simple words",
      "🎯 Give me an OOP system design challenge",
      "💻 Run this OOP code in the Terminal",
    ],
  },

  // ── 8. DBMS, SQL & ACID TRANSACTIONS ──────────────────────────────────────
  {
    id: "dbms-sql",
    keywords: ["dbms", "sql", "database", "select", "join", "inner join", "left join", "acid", "transactions", "normalization", "b-tree"],
    title: "Database Management Systems & SQL Mastery",
    lessonId: "dbms-relational-sql",
    category: "Core CS",
    summary: "Relational databases store structured data in linked tables and guarantee transactional reliability through ACID properties.",
    analogy: `Think of a bank transfer:
You transfer ₹1,000 to your friend:
Step 1: Deduct ₹1,000 from your account.
Step 2: Add ₹1,000 to your friend's account.
What happens if the bank's power goes out after Step 1?
Without ACID transactions, your ₹1,000 disappears into thin air!
With ACID's 'Atomicity' (All-or-Nothing), if Step 2 doesn't complete, Step 1 is automatically rolled back as if nothing ever happened!`,
    visualDiagram: `Table: Students                        Table: Enrollments
+----+-------------+                  +----+------------+-----------+
| id | name        |                  | id | student_id | course    |
+----+-------------+                  +----+------------+-----------+
| 1  | Aarav       | <==== JOIN ====> | 10 | 1          | Algorithms|
| 2  | Priya       |                  | 11 | 1          | Databases |
+----+-------------+                  +----+------------+-----------+`,
    explanation: `### Core Database & SQL Concepts

1. **Primary Key vs Foreign Key**:
   - **Primary Key**: Unique ID for every row in a table (e.g. \`student_id\`).
   - **Foreign Key**: A link pointing to a Primary Key in another table, connecting related data.
2. **SQL JOINs**:
   - **INNER JOIN**: Returns only rows that match in **both** tables.
   - **LEFT JOIN**: Returns **all** rows from the left table, plus any matching rows from the right (or NULL if no match).
3. **ACID Properties**:
   - **A**tomicity: All statements succeed, or everything rolls back.
   - **C**onsistency: Constraints and rules are always enforced.
   - **I**solation: Concurrent transactions do not corrupt each other.
   - **D**urability: Committed data is written to disk and survives system reboots.`,
    codeSnippet: {
      lang: "sql",
      title: "Relational Query with INNER JOIN",
      code: `-- Fetch students and their enrolled courses
SELECT 
    s.name AS student_name,
    c.title AS course_title,
    e.grade
FROM students s
INNER JOIN enrollments e ON s.id = e.student_id
INNER JOIN courses c ON e.course_id = c.id
WHERE e.grade = 'A'
ORDER BY s.name ASC;
`,
    },
    commonBugs: [
      "Missing indexes on Foreign Keys leading to slow table scans across millions of rows.",
      "SQL Injection: Concatenating raw text instead of using parameterized queries.",
      "Not wrapping multi-step bank updates inside a `BEGIN TRANSACTION ... COMMIT` block.",
    ],
    practiceChallenge: {
      title: "Find 2nd Highest Salary in SQL",
      prompt: "Write a standard SQL query to retrieve the second highest salary from an Employee table without vendor-specific extensions.",
      constraints: "Handle duplicate top salaries gracefully.",
    },
    quizQuestion: {
      question: "In ACID properties, what does 'Atomicity' guarantee?",
      options: [
        "A. Queries execute at atomic speed (under 1 nanosecond)",
        "B. Either all operations in a transaction succeed completely, or all changes are rolled back with zero partial writes",
        "C. Only one query can access the database at a time",
        "D. Tables are automatically split into micro-partitions",
      ],
      correct: "B",
      explanation: "Atomicity treats a transaction as a single indivisible unit: if any statement fails, the entire transaction rolls back completely.",
    },
    followUps: [
      "🔍 What is the difference between INNER JOIN and LEFT JOIN?",
      "💡 Explain B-Tree indexing in databases",
      "🎯 Give me an SQL interview query challenge",
      "💻 Run SQL queries in the Terminal",
    ],
  },

  // ── 9. OPERATING SYSTEMS & COMPUTER NETWORKS ──────────────────────────────
  {
    id: "os-networks",
    keywords: ["operating system", "os", "process", "thread", "deadlock", "paging", "virtual memory", "tcp", "udp", "handshake", "dns", "http"],
    title: "Processes, Threads, Virtual Memory & TCP/IP",
    lessonId: "os-processes-threads",
    category: "Systems & Networks",
    summary: "Operating systems schedule CPU multitasking and isolate memory, while network protocols reliably transmit packets across the internet.",
    analogy: `Process vs Thread:
Think of a busy Restaurant:
- A Process is the entire restaurant building: it has its own kitchen, city license, and private space. Two restaurants cannot touch each other's food without formal agreements (IPC).
- Threads are the individual Chefs working inside that same kitchen: they share the same refrigerator and stove (shared heap memory), but each chef has their own notepad for what order they are preparing right now (private call stack)!
TCP vs UDP:
- TCP is a certified mail courier: you must sign for the parcel before the courier leaves (reliable, ordered, checked).
- UDP is an announcer shouting through a loudspeaker at a cricket stadium: loud, instantaneous, but if you sneezed and missed a sentence, it won't repeat it (fast, zero retransmissions).`,
    visualDiagram: `PROCESS (Private Address Space)
+-------------------------------------------------------+
| Code Segment   | Data Segment   | Heap (Shared Memory)|
+-------------------------------------------------------+
| Thread 1: Stack & Registers | Thread 2: Stack & Regs  |
+-------------------------------------------------------+`,
    explanation: `### Core OS & Computer Networks Concepts

1. **Process vs Thread**:
   - A **Process** is an executing program with isolated memory.
   - A **Thread** is a lightweight execution unit inside a process sharing memory.
2. **Virtual Memory & Paging**:
   - Programs think they own 64GB of contiguous RAM. The OS maps virtual pages to physical RAM frames.
   - A **Page Fault** occurs when requested memory is on disk swap rather than RAM.
3. **TCP 3-Way Handshake**:
   - Client sends \`SYN\` (Synchronize).
   - Server replies \`SYN-ACK\` (Synchronize-Acknowledge).
   - Client confirms \`ACK\` (Acknowledge) -> Connection established!`,
    codeSnippet: {
      lang: "bash",
      title: "Network & Process Inspection Commands",
      code: `# Monitor running processes and CPU usage
top

# Check open network ports and listening connections
netstat -tuln

# Inspect DNS resolution for a domain
nslookup github.com

# Trace network packet hops across routers
traceroute google.com
`,
    },
    commonBugs: [
      "Race Condition: Multiple threads writing to shared variables without Mutex locks.",
      "Deadlock: Thread 1 holds Lock A waiting for Lock B, while Thread 2 holds Lock B waiting for Lock A.",
    ],
    practiceChallenge: {
      title: "Trace TCP 3-Way Handshake Sequence Numbers",
      prompt: "Explain how sequence numbers (SEQ) and acknowledgment numbers (ACK) increment during SYN, SYN-ACK, and ACK packets.",
      constraints: "State exact formula.",
    },
    quizQuestion: {
      question: "Which transport protocol should be chosen for real-time multiplayer gaming where minimum latency is prioritized over retransmitting lost packets?",
      options: [
        "A. TCP",
        "B. UDP",
        "C. HTTP/1.1",
        "D. FTP",
      ],
      correct: "B",
      explanation: "UDP does not wait for acknowledgments or retransmit lost packets, offering minimal latency ideal for real-time gaming, live audio, and video.",
    },
    followUps: [
      "🔍 What is a Deadlock and the 4 Coffman conditions?",
      "💡 Explain Virtual Memory and Paging in simple terms",
      "🎯 Give me an OS technical interview question",
      "💻 Run Linux diagnostic commands in the Terminal",
    ],
  },

  // ── 10. FULL-STACK WEB (REACT, NEXT.JS, REST) ─────────────────────────────
  {
    id: "web-fullstack",
    keywords: ["react", "next.js", "frontend", "backend", "rest api", "html", "css", "usestate", "useeffect", "components", "jsx"],
    title: "React Hooks, Next.js App Router & REST APIs",
    lessonId: "web-react-nextjs",
    category: "Full-Stack Web",
    summary: "Modern web applications use declarative React components for UI state management communicating with secure server APIs.",
    analogy: `Think of a Restaurant Order Slip:
- In old JavaScript (DOM manipulation), you walked into the kitchen and grabbed a pan, poured sauce, and personally placed it on the stove ('document.getElementById().innerHTML = ...').
- In React, you simply write an Order Slip: 'Table 4: 2 Tacos, 1 Lemonade' (the State). Whenever you change the order slip ('setTacos(3)'), React's kitchen automatically updates the customer's table to match the slip!`,
    visualDiagram: `User Event (Click Button)
        |
        v
  setCount(count + 1)  ====> React detects state change
        |
        v
  Virtual DOM Diffing  ====> Updates ONLY the changed number on screen!`,
    explanation: `### React & Modern Web Essentials

1. **State with \`useState\`**:
   - Represents reactive data. When you call \`setCount(newCount)\`, React automatically re-renders the UI to match.
2. **Effects with \`useEffect\`**:
   - Runs side effects like fetching data from an API or subscribing to events.
   - Always specify the dependency array \`[]\`!
3. **RESTful APIs**:
   - \`GET\`: Read data.
   - \`POST\`: Create new data.
   - \`PUT\` / \`PATCH\`: Update existing data.
   - \`DELETE\`: Remove data.`,
    codeSnippet: {
      lang: "javascript",
      title: "Interactive React Component with Hooks",
      code: `"use client";
import { useState, useEffect } from "react";

export default function CounterApp() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(\`Count updated to: \${count}\`);
  }, [count]); // Runs whenever count changes

  return (
    <div>
      <h3>Current Count: {count}</h3>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
`,
    },
    commonBugs: [
      "Mutating state directly: Writing `count = count + 1` instead of `setCount(count + 1)`. React won't re-render!",
      "Missing dependency array in `useEffect`: Causes an infinite fetch loop that crashes your browser or API.",
    ],
    practiceChallenge: {
      title: "Build a Debounced Search Input",
      prompt: "Write a React hook that delays calling an API until the user pauses typing for 300ms.",
      constraints: "Clean up timeout timers in useEffect.",
    },
    quizQuestion: {
      question: "What happens in React if you mutate state directly, e.g. `state.count = 5;` instead of calling `setCount(5)`?",
      options: [
        "A. React throws a fatal compilation error immediately",
        "B. React will not detect the state change, and the component will not re-render",
        "C. The browser refreshes the page",
        "D. It behaves identically to calling `setCount(5)`",
      ],
      correct: "B",
      explanation: "React relies on immutable state updates to detect changes through reference comparison. Direct mutations bypass React's lifecycle, so the UI never updates.",
    },
    followUps: [
      "🔍 How does the React Virtual DOM work?",
      "💡 What is the difference between Server Components and Client Components in Next.js?",
      "🎯 Give me a full-stack web project challenge",
      "💻 Test JavaScript code in the Terminal",
    ],
  },

  // ── 11. DOCKER, CONTAINERS & CI/CD ────────────────────────────────────────
  {
    id: "cloud-devops",
    keywords: ["docker", "container", "containers", "dockerfile", "ci/cd", "ci cd", "github actions", "devops", "cloud"],
    title: "Docker Containerization & CI/CD Automation",
    lessonId: "cloud-docker-containers",
    category: "Cloud & DevOps",
    summary: "Containers bundle code and all dependencies into a lightweight, portable package that runs identically everywhere.",
    analogy: `Think of standard cargo shipping containers:
Before 1950, shipping goods across oceans was chaos: barrels of wine rolled around, sacks of flour got wet, and each ship had to be loaded manually item-by-item.
Then standard shipping containers were invented:
- No matter what is packed inside (a sports car, frozen food, or computers), the steel box has standard corners and standard dimensions.
- Every crane, truck, train, and cargo ship in the world can transport that container identically!
Docker is that standard shipping container for software: your code, runtime, libraries, and settings are sealed inside so it runs identically on your Mac, your teammate's Windows laptop, and AWS cloud servers!`,
    visualDiagram: `VIRTUAL MACHINE (Heavy):           DOCKER CONTAINER (Lightweight):
+-------------------------------+   +-------------------------------+
| App A   | App B   | App C     |   | App A   | App B   | App C     |
+---------+---------+-----------+   +---------+---------+-----------+
| Guest OS| Guest OS| Guest OS  |   | Docker Engine (Shared Kernel) |
+-------------------------------+   +-------------------------------+
| Hypervisor                    |   | Host Operating System         |
+-------------------------------+   +-------------------------------+
| Physical Server Hardware      |   | Physical Server Hardware      |`,
    explanation: `### Docker & CI/CD Made Simple

1. **Image vs Container**:
   - **Image**: The read-only recipe blueprint (like a class).
   - **Container**: The living, running instance of that image (like an object).
2. **Dockerfile Key Instructions**:
   - \`FROM\`: Base operating system / runtime.
   - \`WORKDIR\`: Destination folder inside the container.
   - \`COPY\`: Transfers your project files into the container.
   - \`RUN\`: Executes build commands (e.g. \`npm install\`).
   - \`CMD\`: What command executes when the container boots.
3. **CI/CD Pipelines**:
   - Runs automated test suites on every Git push before code can reach production.`,
    codeSnippet: {
      lang: "yaml",
      title: "Production Dockerfile",
      code: `FROM node:20-alpine
WORKDIR /app

# 1. Cache dependencies first
COPY package*.json ./
RUN npm ci --only=production

# 2. Copy source code
COPY . .

# 3. Expose port and run
EXPOSE 3000
CMD ["npm", "start"]
`,
    },
    commonBugs: [
      "Not using `.dockerignore`: Accidentally copying 500MB of local `node_modules` or `.git` into your container image.",
      "Running as root: Production containers should use non-root users for security.",
    ],
    practiceChallenge: {
      title: "Write a Multi-Service Docker Compose Spec",
      prompt: "Create a docker-compose.yml file that launches a web service and a Postgres database with persistent volume storage.",
      constraints: "Ensure database credentials are wired through environment variables.",
    },
    quizQuestion: {
      question: "Why are Docker containers significantly lighter and faster to boot than Virtual Machines (VMs)?",
      options: [
        "A. Containers do not run actual code",
        "B. Containers share the host OS kernel and isolate user space without bundling a full guest OS",
        "C. Containers only run on Linux",
        "D. Containers bypass CPU execution",
      ],
      correct: "B",
      explanation: "Containers share the host operating system kernel and isolate processes using namespaces and cgroups, eliminating the heavy overhead of running a full guest OS per app.",
    },
    followUps: [
      "🔍 What is the difference between Docker and Kubernetes?",
      "💡 How do GitHub Actions CI/CD pipelines work?",
      "🎯 Give me a Docker DevOps challenge",
      "💻 Inspect Docker Compose in the Terminal",
    ],
  },

  // ── 12. HIGH-LEVEL SYSTEM DESIGN & SCALABILITY ───────────────────────────
  {
    id: "system-design",
    keywords: ["system design", "scalability", "load balancer", "caching", "redis", "sharding", "cap theorem", "horizontal scaling"],
    title: "High-Level System Design & Scalability",
    lessonId: "sysdesign-scalability-basics",
    category: "System Design",
    summary: "System design architects distributed applications that scale gracefully to millions of concurrent users while keeping latency low.",
    analogy: `Imagine a Single Cashier at a Supermarket:
On Black Friday, 10,000 customers arrive.
- Vertical Scaling (Scale Up): Hire an Olympic athlete cashier who scans twice as fast. But even an athlete has biological limits and if they faint, the entire store shuts down!
- Horizontal Scaling (Scale Out): Build 20 checkout lanes with 20 regular cashiers, plus a security guard at the front entrance directing shoppers to the shortest line (Load Balancer).
- Caching: Keep the 10 most popular items (milk, bread) right next to the registers on a quick shelf (Redis Cache) so cashiers don't have to walk to the warehouse for every order!`,
    visualDiagram: `Clients (Millions)
       |
       v
[ Load Balancer (Nginx / ALB) ]
   /         |         \\
  v          v          v
[Server 1] [Server 2] [Server 3]
    \\        |        /
     v       v       v
 [ Fast In-Memory Cache: Redis ] <==== Bypasses slow database disk!
             |
             v (Cache Miss Only)
 [ Relational Database: PostgreSQL ]`,
    explanation: `### Core Scalability Principles

1. **Load Balancing**:
   - Distributes incoming user traffic evenly across multiple backend server instances using Round-Robin or Least-Connections algorithms.
2. **In-Memory Caching (Redis / Memcached)**:
   - Reading from RAM takes **~1 millisecond** vs **~50 milliseconds** from a disk-based SQL database.
   - Cache-Aside Pattern: Check Redis first; on miss, query SQL and store result in Redis with a TTL (expiration).
3. **Database Sharding**:
   - Splitting massive tables horizontally across multiple database servers by user ID.
4. **CAP Theorem**:
   - In a distributed partition, you must choose between **Consistency** (all nodes see latest data) or **Availability** (every request gets an immediate response).`,
    codeSnippet: {
      lang: "javascript",
      title: "Cache-Aside Pattern in Node.js",
      code: `async function getUserProfile(userId) {
  // 1. Check Redis RAM cache first (<1ms)
  const cached = await redis.get(\`user:\${userId}\`);
  if (cached) {
    return JSON.parse(cached);
  }

  // 2. Cache Miss: Query SQL database (Disk I/O)
  const user = await db.users.findById(userId);

  // 3. Populate Redis with 1-hour expiration (TTL)
  if (user) {
    await redis.setex(\`user:\${userId}\`, 3600, JSON.stringify(user));
  }

  return user;
}
`,
    },
    commonBugs: [
      "Cache Stampede: When a popular key expires, thousands of concurrent requests slam the database simultaneously.",
      "Single Point of Failure: Not setting up secondary standby replicas for load balancers or primary databases.",
    ],
    practiceChallenge: {
      title: "Design a URL Shortener (TinyURL)",
      prompt: "Design TinyURL to handle 100M URLs. Explain Base62 encoding vs auto-increment IDs, database choice, and cache strategy.",
      constraints: "Calculate storage and throughput requirements.",
    },
    quizQuestion: {
      question: "According to the CAP theorem, when a distributed network partition (P) occurs, what choice must the system make?",
      options: [
        "A. Upgrade CPU and RAM",
        "B. Choose between Consistency (all nodes return latest data) and Availability (every request receives a response)",
        "C. Automatically convert to a single SQLite file",
        "D. Shut down all reads and writes permanently",
      ],
      correct: "B",
      explanation: "In real-world distributed networks, partitions are inevitable. Systems must choose between Consistency (refusing unsynchronized writes) or Availability (serving potentially stale data).",
    },
    followUps: [
      "🔍 How does Database Sharding work?",
      "💡 What is a Content Delivery Network (CDN) in simple terms?",
      "🎯 Give me a system design interview problem",
      "💻 Explore YAML architecture files in the Terminal",
    ],
  },

  // ── 12. DYNAMIC PROGRAMMING & KNAPSACK ────────────────────────────────────
  {
    id: "dsa-dp",
    keywords: ["dynamic programming", "dp", "knapsack", "memoization", "tabulation", "optimal substructure", "overlapping subproblems"],
    title: "Dynamic Programming & Knapsack Optimization",
    lessonId: "dsa-dynamic-programming",
    category: "Data Structures & Algorithms",
    summary: "Dynamic Programming solves complex optimization problems by breaking them into overlapping subproblems and remembering previous solutions to avoid re-calculating them.",
    analogy: `Imagine Writing '1 + 1 + 1 + 1 + 1' on a Piece of Paper:
- You ask someone: "What does this equal?" They count and answer: "5".
- Now you write another '+ 1' at the end. You ask: "What does it equal now?"
- They immediately say: "6!"
- How did they know so fast without recounting?
Because they MEMOIZED (remembered) that the first part was 5, so they only needed to do 5 + 1 = 6! That is Dynamic Programming!`,
    visualDiagram: `Recursive Fibonacci (Slow O(2^N))    vs    Memoized DP (Fast O(N))
            fib(5)                                    fib(5)
           /      \\                                  /      \\
        fib(4)    fib(3)                          fib(4)    [Cached 2]
        /    \\    /    \\                          /    \\
     fib(3) fib(2) fib(2) fib(1)               fib(3)  [Cached 1]
     (Notice redundant re-calculations!)       (Reads in O(1) from array!)`,
    explanation: `### The Two Core Hallmarks of Dynamic Programming:
1. **Overlapping Subproblems**: The same smaller sub-calculations are repeated multiple times (e.g., \`fib(3)\` computed over and over).
2. **Optimal Substructure**: The optimal solution to the large problem can be constructed directly from optimal solutions of smaller subproblems.

#### Memoization (Top-Down) vs Tabulation (Bottom-Up):
- **Top-Down (Memoization)**: Start with the big problem, use recursion, and store results in a hash table or array as you go.
- **Bottom-Up (Tabulation)**: Start with the smallest base cases (e.g., \`dp[0] = 0, dp[1] = 1\`), fill a 1D or 2D array iteratively with a loop.`,
    codeSnippet: {
      lang: "python",
      title: "0/1 Knapsack in Python (Dynamic Programming)",
      code: `def knapsack(weights, values, capacity):
    n = len(values)
    # dp[w] stores max value achievable with capacity w
    dp = [0] * (capacity + 1)

    for i in range(n):
        wt, val = weights[i], values[i]
        # Traverse backwards to prevent using the same item twice
        for w in range(capacity, wt - 1, -1):
            dp[w] = max(dp[w], dp[w - wt] + val)

    return dp[capacity]

# Example: Items with weights [2, 3, 4] and values [3, 4, 5]
print("Max value:", knapsack([2, 3, 4], [3, 4, 5], 5)) # Output: 7
`,
    },
    commonBugs: [
      "Traversing forward instead of backward in 1D array 0/1 knapsack, causing items to be reused (unbounded knapsack bug).",
      "Forgetting base cases (dp[0] = 0), resulting in incorrect accumulators.",
    ],
    practiceChallenge: {
      title: "Coin Change Problem",
      prompt: "Given coins of different denominations and a total amount, return the fewest number of coins needed to make up that amount. If impossible, return -1.",
      constraints: "O(coins * amount) time complexity, O(amount) space complexity.",
    },
    quizQuestion: {
      question: "Why do we iterate backward when optimizing the 0/1 Knapsack problem using a single 1D array?",
      options: [
        "A. Because Python lists only support backward slicing",
        "B. To ensure each item is included at most once and prevent reading newly overwritten values in the same step",
        "C. To reduce the Big-O time complexity from O(N) to O(1)",
        "D. To automatically sort the weights array in descending order",
      ],
      correct: "B",
      explanation: "Iterating backward ensures we only reference values from the previous item's state, preventing the current item from being used multiple times.",
    },
    followUps: [
      "💡 What is the difference between 0/1 Knapsack and Unbounded Knapsack?",
      "⚡ Explain the Coin Change DP solution step-by-step",
      "▶ Test the Knapsack code in Terminal",
      "🧠 Quiz me on Dynamic Programming",
    ],
  },
];

// Helper to find matching curriculum lesson
export function findMatchingCurriculumLesson(query: string): CurriculumLesson | null {
  const q = query.toLowerCase();

  for (const lesson of ALL_LESSONS) {
    if (q.includes(lesson.id.toLowerCase()) || q.includes(lesson.title.toLowerCase())) {
      return lesson;
    }
  }

  for (const lesson of ALL_LESSONS) {
    if (lesson.keySkills.some((s) => q.includes(s.toLowerCase()))) {
      return lesson;
    }
  }

  return null;
}

// Helper to find matching knowledge topic
export function findMatchingTopic(query: string): SubjectTopic | null {
  const q = query.toLowerCase();

  let bestTopic: SubjectTopic | null = null;
  let bestScore = 0;

  for (const topic of TOPIC_DATABASE) {
    let score = 0;
    for (const kw of topic.keywords) {
      if (q.includes(kw.toLowerCase())) {
        score += kw.length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestTopic = topic;
    }
  }

  return bestScore >= 3 ? bestTopic : null;
}

// Main Interactive Curriculum Mentor Engine
export function generateInteractiveCurriculumMentorReply(
  query: string,
  mode: MentorMode,
  profile: StudentProfile
): InteractiveMentorResult {
  const q = query.toLowerCase().trim();

  // 1. Roadmap & Career Queries
  const isRoadmap =
    mode === "ROADMAP" ||
    mode === "CAREER" ||
    /\b(roadmap|pathway|what should i learn|study plan|what do i learn next|placement|internship|career|job|how to become)\b/.test(q);

  if (isRoadmap) {
    const roadmapText = `## 🗺️ Tailored Engineering Pathway for ${profile.name || "Student"}
**Discipline:** ${profile.branch || "Computer Science"} ${profile.year ? `(${profile.year})` : ""} • **Target:** ${profile.goal || "Software Engineering Excellence"}

### Phase 1: Core Problem Solving & Systems (Year 1)
- **C Foundations**: Labeled memory boxes, pointers, arrays, structs, and heap allocation.
- **Python for Speed**: Indentation, list comprehensions, data structures, and automation.
- **Developer Tools**: Linux CLI, Git & GitHub for team branching, VS Code debugging.

### Phase 2: Core Computer Science Foundations (Year 2)
- **Data Structures**: Linked lists, stacks, queues, binary search trees, and graphs.
- **Algorithmic Patterns**: Two pointers, sliding window, binary search, and dynamic programming.
- **DBMS & SQL**: Relational schemas, multi-table JOINs, indexing, and ACID transactions.
- **OS & Networks**: Concurrency, process vs thread, virtual memory paging, and TCP/IP.

### Phase 3: Applied Specialization (Year 3)
- **Full-Stack Engineering**: React components, Next.js, and secure RESTful backend APIs.
- **DevOps & Cloud**: Docker containerization, multi-stage images, and GitHub Actions CI/CD.
- **System Design**: Horizontal scaling, Redis caching, load balancers, and CAP theorem.

### Phase 4: Campus Placements & Industry Capstone (Year 4)
- **Technical OA Rounds**: Timed problem solving on arrays, trees, and graphs.
- **System & Coding Interviews**: Articulating code decisions out loud with clear Big-O trade-offs.
- **HR & Behavioral Rounds**: Using the STAR framework for project storytelling.`;

    return {
      text: roadmapText,
      followUps: [
        "💻 How do I start with C programming?",
        "⚡ What DSA topics should I learn first?",
        "🛠️ How do I master Git & GitHub?",
        "💼 What do interviewers ask in technical rounds?",
      ],
      lessonId: "c-intro-compilation",
      lessonTitle: "Start Year 1 Foundations",
    };
  }

  // 2. Topic Matching
  const matchedTopic = findMatchingTopic(query);
  const matchedLesson = findMatchingCurriculumLesson(query);

  if (matchedTopic) {
    // Mode: HINT
    if (mode === "HINT" || /\b(hint|clue|nudge|guide me)\b/.test(q)) {
      return {
        text: `### 💡 Socratic Hint: ${matchedTopic.title}

Here is a friendly clue to help you discover the answer yourself:

1. **Observe the Core State**: In ${matchedTopic.title}, what variable or structure remembers current progress?
2. **Watch the Transition**: Ask yourself: *at what exact step does the state change?*
3. **Beware of this Beginner Trap**:
   > ⚠️ ${matchedTopic.commonBugs[0]}

**Try this mini-step**: Trace a minimal example with only 2 or 3 inputs by hand on paper. What should the first step output?`,
        analogy: matchedTopic.analogy,
        codeSnippet: matchedTopic.codeSnippet,
        quiz: matchedTopic.quizQuestion,
        followUps: [
          "🔍 Give me one more hint",
          "💻 Show me the code solution",
          "🧠 Test my understanding with a quiz",
          "▶ Practice this in Terminal",
        ],
        lessonId: matchedTopic.lessonId,
        lessonTitle: matchedTopic.title,
      };
    }

    // Mode: DEBUG
    if (mode === "DEBUG" || /\b(debug|error|bug|crash|segfault|segmentation fault|not working|fix this)\b/.test(q)) {
      return {
        text: `### 🛠️ Systematic Debugging Guide: ${matchedTopic.title}

Let's locate and fix the issue step-by-step:

#### Common Pitfalls in ${matchedTopic.title}:
${matchedTopic.commonBugs.map((bug, i) => `${i + 1}. **${bug}**`).join("\n")}

#### 4-Step Resolution Checklist:
1. **Check Boundary Conditions**: Empty inputs, NULL pointers, negative numbers, or off-by-one indices.
2. **Inspect Variable State**: Add a print statement or set a debugger breakpoint right before the failing line.
3. **Verify Memory Safety**: Ensure variables are initialized before use and pointers point to valid RAM blocks.
4. **Isolate with Minimal Test Case**: Reproduce the error with the smallest possible input (e.g. 1 item).`,
        analogy: matchedTopic.analogy,
        visualDiagram: matchedTopic.visualDiagram,
        codeSnippet: matchedTopic.codeSnippet,
        quiz: matchedTopic.quizQuestion,
        followUps: [
          "🔍 How do I use breakpoints in VS Code?",
          "🐛 Show me a working example of this code",
          "🎯 Give me a practice challenge",
          "▶ Practice in Terminal",
        ],
        lessonId: matchedTopic.lessonId,
        lessonTitle: matchedTopic.title,
      };
    }

    // Mode: PRACTICE
    if (mode === "PRACTICE" || /\b(practice|challenge|exercise|problem)\b/.test(q)) {
      const challenge = matchedTopic.practiceChallenge;
      return {
        text: `### 🎯 Practice Challenge: ${challenge.title}

**Topic:** ${matchedTopic.title} (${matchedTopic.category})

#### Problem Statement:
${challenge.prompt}

#### Engineering Constraints:
- **Constraints:** ${challenge.constraints}
- **Language:** Write in C, Python, JavaScript, or Bash.

#### How to Approach:
1. Write down edge cases first (empty inputs, single items).
2. Trace your logic with sample numbers before running code.
3. Test your solution live in our integrated coding terminal!`,
        analogy: matchedTopic.analogy,
        codeSnippet: matchedTopic.codeSnippet,
        quiz: matchedTopic.quizQuestion,
        followUps: [
          "💡 Give me a hint for this challenge",
          "💻 Show me a starter code template",
          "▶ Open Code Terminal to solve",
          "🧠 Test me with a quiz",
        ],
        lessonId: matchedTopic.lessonId,
        lessonTitle: matchedTopic.title,
      };
    }

    // Mode: QUIZ
    if (mode === "QUIZ" || /\b(quiz|test me|question)\b/.test(q)) {
      const qz = matchedTopic.quizQuestion;
      return {
        text: `### 🧠 Quick Knowledge Check: ${matchedTopic.title}

Test your conceptual understanding with this interactive question! Select your answer using the options below:`,
        quiz: qz,
        analogy: matchedTopic.analogy,
        codeSnippet: matchedTopic.codeSnippet,
        followUps: [
          "💡 Explain the answer in simple terms",
          "🎯 Give me another quiz question",
          "🔍 Explain the code example",
          "▶ Practice in Terminal",
        ],
        lessonId: matchedTopic.lessonId,
        lessonTitle: matchedTopic.title,
      };
    }

    // Mode: EXPLAIN (Default rich, easily understandable pedagogical breakdown)
    return {
      text: `${matchedTopic.explanation}

#### Key Takeaways for Students:
- **${matchedTopic.summary}**
- Pay close attention to edge cases and runtime trade-offs.`,
      analogy: matchedTopic.analogy,
      visualDiagram: matchedTopic.visualDiagram,
      codeSnippet: matchedTopic.codeSnippet,
      quiz: matchedTopic.quizQuestion,
      followUps: matchedTopic.followUps,
      lessonId: matchedTopic.lessonId,
      lessonTitle: matchedTopic.title,
    };
  }

  // 3. Matched Curriculum Lesson directly
  if (matchedLesson) {
    const quizList = getLessonQuiz(matchedLesson.id);
    const sampleQuestion = quizList && quizList.length > 0 ? quizList[0] : null;

    const quizObj = sampleQuestion
      ? {
          question: sampleQuestion.question,
          options: sampleQuestion.options,
          correct: sampleQuestion.correctAnswer,
          explanation: sampleQuestion.explanation,
        }
      : undefined;

    return {
      text: `### 📚 ${matchedLesson.title}

**Category:** ${matchedLesson.category} • **Duration:** ${matchedLesson.duration} • **Difficulty:** ${matchedLesson.difficulty}

#### The Big Picture:
${matchedLesson.content.overview}

#### Key Skills You Will Master:
${matchedLesson.keySkills.map((s) => `- **${s}**`).join("\n")}

${matchedLesson.content.sections[0] ? `#### Core Lesson Insight: ${matchedLesson.content.sections[0].title}
${matchedLesson.content.sections[0].explanation}` : ""}`,
      codeSnippet: matchedLesson.content.sections[0]?.codeSnippet
        ? {
            lang: matchedLesson.content.sections[0].language || "c",
            title: matchedLesson.content.sections[0].title,
            code: matchedLesson.content.sections[0].codeSnippet,
          }
        : undefined,
      quiz: quizObj,
      followUps: [
        `💡 Explain ${matchedLesson.title} with an everyday analogy`,
        "🐛 What common mistakes do beginners make here?",
        "🎯 Give me a practice challenge",
        "▶ Practice this in Terminal",
      ],
      lessonId: matchedLesson.id,
      lessonTitle: matchedLesson.title,
    };
  }

  // 4. Greetings
  if (/^(hello|hi|hey|greetings|good morning|good afternoon)/i.test(q)) {
    return {
      text: `👋 **Hello ${profile.name && profile.name !== "Student" ? profile.name : "Engineer"}!**

I am your personal AI Engineering Study Mentor. I specialize in making complex computer science topics **interactive, intuitive, and easy to understand**!

Here is how I can help:
- 💡 **Everyday Real-World Analogies**: Turning abstract memory, pointers, and algorithms into things you already know.
- 📊 **Visual Memory Diagrams**: Showing you what RAM and data flow actually look like.
- 💻 **Interactive Code Practice**: Send any code directly to the built-in Terminal with one click.
- 🧠 **Interactive Pop Quizzes**: Instant clickable questions to test your understanding right in the chat.

Pick any topic below or ask any question to get started!`,
      followUps: [
        "💻 Explain pointers with a real-world analogy",
        "🐍 How do list comprehensions work in Python?",
        "🛠️ How do I fix a Git merge conflict?",
        "⚡ Explain binary search in simple terms",
      ],
    };
  }

  // 5. General Fallback
  return {
    text: `### 💡 CampusGrow Engineering Guidance

I am here to guide you through any topic across our 39-lesson engineering curriculum!

Regarding: **"${query}"**

#### Recommended Study Strategy:
1. **Understand the Analogy First**: Relate abstract concepts to a real-world mental model before writing code.
2. **Write & Trace Small Code**: Don't just read theory — test small examples in our Terminal!
3. **Test Boundary Cases**: Always check what happens with 0, empty inputs, or boundary values.`,
    followUps: [
      "💻 Explain pointers with a real-world analogy",
      "⚡ Explain linked lists with an analogy",
      "🗄️ Explain SQL JOINs in simple terms",
      "🌐 What is the difference between TCP and UDP?",
    ],
  };
}

// Backward-compatible string generator
export function generateCurriculumMentorReply(
  query: string,
  mode: MentorMode,
  profile: StudentProfile
): string {
  const result = generateInteractiveCurriculumMentorReply(query, mode, profile);
  let reply = result.text;

  if (result.analogy) {
    reply = `> 💡 **Everyday Analogy**:\n> ${result.analogy.replace(/\n/g, "\n> ")}\n\n` + reply;
  }

  if (result.visualDiagram) {
    reply += `\n\n#### 📊 Visual Mental Model:\n\`\`\`text\n${result.visualDiagram}\n\`\`\``;
  }

  if (result.codeSnippet) {
    reply += `\n\n#### 💻 Code Example (${result.codeSnippet.title || "Interactive Sandbox"}):\n\`\`\`${result.codeSnippet.lang}\n${result.codeSnippet.code}\n\`\`\``;
  }

  if (result.quiz) {
    reply += `\n\n#### 🧠 Quick Check: ${result.quiz.question}\n${result.quiz.options.join("\n")}\n*(Correct Answer: ${result.quiz.correct} - ${result.quiz.explanation})*`;
  }

  return reply;
}
