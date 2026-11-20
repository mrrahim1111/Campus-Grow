// CampusGrow 4-Year Engineering Platform Curriculum Engine
// Designed for a full 4-year engineering journey (Year 1 to Year 4)
// Beginner-friendly, standard, intuitive, and practical for all engineering students.

export type DifficultyLevel = "Beginner" | "Intermediate" | "Advanced";
export type AcademicYear = 1 | 2 | 3 | 4;

export interface LessonContentSection {
  title: string;
  explanation: string;
  codeSnippet?: string;
  language?: string;
  takeaways?: string[];
}

export interface CurriculumLesson {
  id: string;
  title: string;
  category: string;
  description: string;
  route: string;
  order: number;
  duration: string;
  difficulty: DifficultyLevel;
  keySkills: string[];
  trackId: string;
  content: {
    overview: string;
    sections: LessonContentSection[];
  };
  quiz: {
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  };
}

export interface CurriculumTrack {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  category: "Foundation" | "Branch" | "Goal" | "Core CS" | "Specialization" | "Placement";
  year: AcademicYear;
  yearLabel: string;
  badge: string;
  targetBranches?: string[];
  targetGoals?: string[];
  description: string;
  lessons: CurriculumLesson[];
}

// ─────────────────────────────────────────────────────────────────────────────
// YEAR 1: FOUNDATIONS & PROBLEM SOLVING (Freshman Year)
// ─────────────────────────────────────────────────────────────────────────────

// Track 1.1: Core Systems & C Foundation (10 Beginner-Friendly Lessons)
const cFoundationLessons: CurriculumLesson[] = [
  {
    id: "programming-fundamentals",
    title: "Programming Fundamentals",
    category: "Programming Basics",
    description: "Understand how computers think, what algorithms are, and how software solves everyday problems.",
    route: "/lessons/programming-fundamentals",
    order: 1,
    duration: "35 min interactive sprint",
    difficulty: "Beginner",
    keySkills: ["Logical Thinking", "Input-Process-Output", "Algorithmic Steps"],
    trackId: "c-foundation",
    content: {
      overview: "Programming is simply writing step-by-step instructions for a computer to follow, just like a cooking recipe.",
      sections: [
        {
          title: "The Input-Process-Output Model",
          explanation: "Every app on your phone and every software program follows the same basic cycle: take input from the user, process the data with logical rules, and show the result.",
          codeSnippet: "// Simple everyday logic:\n// 1. Input: You enter your exam score\n// 2. Process: Is the score >= 50?\n// 3. Output: \"Pass\" or \"Try Again\"",
          language: "c",
          takeaways: [
            "Computers do not guess — they follow exact instructions in order.",
            "Algorithms are simply precise recipes to solve problems."
          ]
        }
      ]
    },
    quiz: {
      question: "What is an algorithm in computer programming?",
      options: [
        "A piece of computer hardware like a hard drive",
        "A step-by-step set of instructions to solve a specific problem",
        "A special brand of computer screen",
        "A type of computer virus"
      ],
      correctAnswer: "A step-by-step set of instructions to solve a specific problem",
      explanation: "An algorithm is like a recipe: a clear sequence of steps executed one by one to produce a desired result."
    }
  },
  {
    id: "c-programming",
    title: "Introduction to C",
    category: "C Programming",
    description: "Write your very first program in C, learn what main() does, and see how code turns into an app.",
    route: "/lessons/c-programming",
    order: 2,
    duration: "38 min deep-dive & practice",
    difficulty: "Beginner",
    keySkills: ["C Syntax", "main() Function", "printf Output", "Compiler Basics"],
    trackId: "c-foundation",
    content: {
      overview: "C is the mother of modern programming languages. Learning C gives you a crystal-clear understanding of how software works under the hood.",
      sections: [
        {
          title: "Your First 'Hello World' Program",
          explanation: "In C, every program starts executing at the `main()` function. We use `#include <stdio.h>` to get access to standard tools like `printf()` for printing text onto the screen.",
          codeSnippet: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello, CampusGrow Engineer!\\n\");\n    return 0;\n}",
          language: "c",
          takeaways: [
            "`#include <stdio.h>` loads the standard input/output library.",
            "`main()` is the starting door for every C program.",
            "Statements end with a semicolon `;` just like sentences end with a period."
          ]
        }
      ]
    },
    quiz: {
      question: "Where does execution of any C program always begin?",
      options: [
        "At the first line of the file",
        "Inside the main() function",
        "Inside the #include statement",
        "Inside the return statement"
      ],
      correctAnswer: "Inside the main() function",
      explanation: "The operating system always looks for the main() function as the official entry point of every C program."
    }
  },
  {
    id: "variables-data-types",
    title: "Variables & Data Types",
    category: "C Programming",
    description: "Learn how to store numbers, decimal values, and characters using labeled storage boxes in memory.",
    route: "/lessons/variables-data-types",
    order: 3,
    duration: "40 min hands-on lab",
    difficulty: "Beginner",
    keySkills: ["int", "float", "double", "char", "Type Selection"],
    trackId: "c-foundation",
    content: {
      overview: "Think of a variable as a labeled storage box in your computer's memory. The label is the variable name, and the data type decides what kind of item fits inside.",
      sections: [
        {
          title: "The 4 Core Data Types",
          explanation: "Use `int` for whole numbers (like age or marks), `float` or `double` for decimal numbers (like GPA or price), and `char` for single letters in single quotes.",
          codeSnippet: "int studentAge = 19;        // Whole number\nfloat collegeGpa = 8.75;    // Decimal number\nchar gradeSection = 'A';    // Single character in single quotes",
          language: "c",
          takeaways: [
            "`int` stores whole numbers like 10, -5, 2026.",
            "`float` stores decimal numbers like 3.14.",
            "`char` stores single letters like 'A' or 'z'."
          ]
        }
      ]
    },
    quiz: {
      question: "Which data type should you pick to store a student's percentage score like 89.5%?",
      options: ["int", "char", "float", "void"],
      correctAnswer: "float",
      explanation: "Float (or double) stores numbers with decimal fractions, whereas int only stores whole numbers."
    }
  },
  {
    id: "input-output",
    title: "Input & Output in C",
    category: "C Programming",
    description: "Make your programs interactive by printing messages with printf and reading user keyboard input with scanf.",
    route: "/lessons/input-output",
    order: 4,
    duration: "38 min deep-dive & practice",
    difficulty: "Beginner",
    keySkills: ["printf()", "scanf()", "Format Specifiers (%d, %f, %c)", "& Address Operator"],
    trackId: "c-foundation",
    content: {
      overview: "Real apps interact with humans. In C, `printf` talks to the user on screen, and `scanf` listens to what the user types on the keyboard.",
      sections: [
        {
          title: "How to Read User Input",
          explanation: "When using `scanf`, you provide a format specifier (like `%d` for integers) and put an ampersand `&` in front of the variable so C knows where to store the input.",
          codeSnippet: "int age;\nprintf(\"Enter your age: \");\nscanf(\"%d\", &age);   // & tells scanf where to put the number\nprintf(\"You are %d years old!\\n\", age);",
          language: "c",
          takeaways: [
            "Use `%d` for integers, `%f` for floats, and `%c` for characters.",
            "Always include `&` before the variable name inside `scanf()` for numbers."
          ]
        }
      ]
    },
    quiz: {
      question: "Why do we place an ampersand `&` before the variable name in `scanf(\"%d\", &age)`?",
      options: [
        "To multiply the number by 2",
        "To tell scanf the memory address where the typed value should be saved",
        "To make the computer run faster",
        "It is just decoration and can be removed"
      ],
      correctAnswer: "To tell scanf the memory address where the typed value should be saved",
      explanation: "The ampersand '&' gives the address of the variable, allowing scanf to directly write the input into that memory slot."
    }
  },
  {
    id: "operators",
    title: "Operators & Expressions",
    category: "C Programming",
    description: "Calculate math equations, compare values, and make logical decisions using operators.",
    route: "/lessons/operators",
    order: 5,
    duration: "38 min deep-dive & practice",
    difficulty: "Beginner",
    keySkills: ["Arithmetic (+, -, *, /, %)", "Comparisons (==, !=, <, >)", "Logical (&&, ||, !)", "= vs =="],
    trackId: "c-foundation",
    content: {
      overview: "Operators are symbols that tell the computer to perform calculations or comparisons on your data.",
      sections: [
        {
          title: "The Remainder (Modulo) Operator & The Assignment Trap",
          explanation: "The `%` operator gives you the remainder of division (great for checking even vs odd numbers). Always remember: single `=` assigns a value, while double `==` tests if two values are equal.",
          codeSnippet: "int num = 10;\nint remainder = num % 3; // remainder is 1 (since 10 / 3 = 3 with remainder 1)\n\n// Comparison:\nif (num == 10) {\n    printf(\"num is equal to 10\\n\");\n}",
          language: "c",
          takeaways: [
            "`%` calculates the remainder (e.g., `n % 2 == 0` means even).",
            "`=` sets a value (`x = 5`), while `==` checks equality (`if (x == 5)`)."
          ]
        }
      ]
    },
    quiz: {
      question: "What is the difference between `=` and `==` in C?",
      options: [
        "They do exactly the same thing",
        "`=` assigns a value to a variable, while `==` compares whether two values are equal",
        "`==` is used for math, `=` is used for text",
        "`=` is only used in Python, `==` is used in C"
      ],
      correctAnswer: "`=` assigns a value to a variable, while `==` compares whether two values are equal",
      explanation: "Using single = assigns a value, whereas double == checks equality."
    }
  },
  {
    id: "conditional-statements",
    title: "Conditional Statements (Decisions)",
    category: "C Programming",
    description: "Teach your code to make intelligent decisions using if, else if, else, and switch-case statements.",
    route: "/lessons/conditional-statements",
    order: 6,
    duration: "38 min deep-dive & practice",
    difficulty: "Beginner",
    keySkills: ["if...else", "else if Ladders", "switch-case", "break Statement"],
    trackId: "c-foundation",
    content: {
      overview: "Just like choosing an umbrella when it rains, conditional statements let your program choose different paths depending on whether conditions are true or false.",
      sections: [
        {
          title: "The if-else Decision Maker",
          explanation: "When you want to test multiple possibilities in sequence, use an `if...else if...else` ladder or a clean `switch` statement for menus.",
          codeSnippet: "int score = 85;\n\nif (score >= 90) {\n    printf(\"Grade: A+\\n\");\n} else if (score >= 75) {\n    printf(\"Grade: A\\n\");\n} else {\n    printf(\"Grade: B\\n\");\n}",
          language: "c",
          takeaways: [
            "`if` runs code only when its condition is true.",
            "`else` is the safety net when no previous condition matched.",
            "In `switch`, always put `break;` at the end of each case."
          ]
        }
      ]
    },
    quiz: {
      question: "What happens if you forget to write `break;` inside a switch case?",
      options: [
        "The compiler gives an error and stops",
        "The computer crashes immediately",
        "Execution continues into the next case automatically (fall-through)",
        "The switch statement restarts from the beginning"
      ],
      correctAnswer: "Execution continues into the next case automatically (fall-through)",
      explanation: "In C, cases fall through to the next case unless explicitly stopped with a break statement."
    }
  },
  {
    id: "loops",
    title: "Loops & Repetition",
    category: "C Programming",
    description: "Avoid copy-pasting code by automating repetitive tasks with for, while, and do-while loops.",
    route: "/lessons/loops",
    order: 7,
    duration: "40 min hands-on lab",
    difficulty: "Beginner",
    keySkills: ["for Loops", "while Loops", "do-while Loops", "Loop Counters", "Avoiding Infinite Loops"],
    trackId: "c-foundation",
    content: {
      overview: "Imagine doing 10 pushups: you count 1, 2, 3 up to 10 and stop. A loop does the exact same thing in code, repeating tasks without rewriting lines.",
      sections: [
        {
          title: "The for Loop Breakdown",
          explanation: "A `for` loop packages 3 things into one neat line: start point (`int i = 1`), stop condition (`i <= 5`), and step (`i++`).",
          codeSnippet: "// Print numbers 1 through 5\nfor (int i = 1; i <= 5; i++) {\n    printf(\"Count: %d\\n\", i);\n}",
          language: "c",
          takeaways: [
            "Use `for` when you know how many times to repeat.",
            "Use `while` when repeating until an event happens.",
            "Always update your loop variable so the loop eventually ends."
          ]
        }
      ]
    },
    quiz: {
      question: "Which loop is guaranteed to execute its code block at least once, even if the condition is false?",
      options: ["for loop", "while loop", "do-while loop", "nested loop"],
      correctAnswer: "do-while loop",
      explanation: "A do-while loop runs its block first and checks the condition at the end, guaranteeing at least one run."
    }
  },
  {
    id: "functions",
    title: "Functions & Modular Code",
    category: "C Programming",
    description: "Break big messy programs into small, reusable, organized helper functions that accept inputs and return outputs.",
    route: "/lessons/functions",
    order: 8,
    duration: "40 min hands-on lab",
    difficulty: "Beginner",
    keySkills: ["Function Definition", "Parameters & Arguments", "Return Values", "void Functions"],
    trackId: "c-foundation",
    content: {
      overview: "A function is like a kitchen blender: you put ingredients in (parameters), it does the work, and it pours out a delicious result (return value).",
      sections: [
        {
          title: "Creating Reusable Functions",
          explanation: "Instead of writing the same calculation 10 times, write a function once and call it whenever needed.",
          codeSnippet: "// Function that adds two numbers and returns the sum\nint addNumbers(int a, int b) {\n    return a + b;\n}\n\nint main() {\n    int result = addNumbers(10, 25); // result is 35\n    printf(\"Sum: %d\\n\", result);\n    return 0;\n}",
          language: "c",
          takeaways: [
            "Functions keep code clean, readable, and easy to debug.",
            "If a function doesn't return anything, its return type is `void`."
          ]
        }
      ]
    },
    quiz: {
      question: "What return type should you give a function that performs an action but returns no value?",
      options: ["int", "char", "void", "null"],
      correctAnswer: "void",
      explanation: "In C, 'void' signifies that a function does not return any data back to its caller."
    }
  },
  {
    id: "arrays-strings",
    title: "Arrays & Strings",
    category: "C Programming",
    description: "Store multiple values under one name using arrays, and handle words and sentences with null-terminated strings.",
    route: "/lessons/arrays-strings",
    order: 9,
    duration: "42 min practice & mastery",
    difficulty: "Beginner",
    keySkills: ["Arrays", "0-based Indexing", "Strings (char[])", "Null Terminator ('\\0')"],
    trackId: "c-foundation",
    content: {
      overview: "An array is like a row of numbered lockers in your college hallway: each locker holds one item, and you access it using its locker index starting from 0.",
      sections: [
        {
          title: "Arrays & Character Strings",
          explanation: "In C, a string is simply an array of characters ending with a special stop sign called the null terminator `\\0`.",
          codeSnippet: "int marks[3] = {85, 92, 78}; // Locker 0: 85, Locker 1: 92, Locker 2: 78\n\nchar college[] = \"CampusGrow\"; // Characters ended with '\\0'\nprintf(\"First mark: %d, College: %s\\n\", marks[0], college);",
          language: "c",
          takeaways: [
            "Array numbering always starts at 0, not 1.",
            "Strings always have a invisible `\\0` byte at the very end to signal where the word stops."
          ]
        }
      ]
    },
    quiz: {
      question: "If an array has 5 elements, what is the index of the first element?",
      options: ["1", "0", "-1", "5"],
      correctAnswer: "0",
      explanation: "In C and most programming languages, array indexing is 0-based, so the first element is at index 0."
    }
  },
  {
    id: "pointers-mini-project",
    title: "Pointers & Mini-Project Capstone",
    category: "C Programming",
    description: "Understand memory addresses with simple everyday analogies, and build a working Student Grade Portal mini-project.",
    route: "/lessons/pointers-mini-project",
    order: 10,
    duration: "45 min deep-dive & terminal",
    difficulty: "Intermediate",
    keySkills: ["Pointers (* and &)", "Memory Addresses", "Student Portal Capstone", "Real World Project"],
    trackId: "c-foundation",
    content: {
      overview: "Pointers are not scary. A pointer is simply an address card that points to where a piece of data lives in memory, just like a home address on an envelope.",
      sections: [
        {
          title: "The Address Card Analogy",
          explanation: "Use `&` to find the address of a variable, and use `*` to look inside the box at that address.",
          codeSnippet: "int score = 95;\nint *ptr = &score; // ptr holds the address of score\n\nprintf(\"Score: %d\\n\", *ptr); // *ptr peeks inside the address and prints 95\n*ptr = 100;                 // changes score directly to 100!",
          language: "c",
          takeaways: [
            "`&variable` gives you the memory address.",
            "`*pointer` looks up the value stored at that address.",
            "Pointers allow functions to update values directly and efficiently."
          ]
        }
      ]
    },
    quiz: {
      question: "If `int *p = &x;`, what does `*p` do?",
      options: [
        "It prints the letter 'p'",
        "It accesses the value stored inside the variable x",
        "It deletes the variable x",
        "It creates a new string"
      ],
      correctAnswer: "It accesses the value stored inside the variable x",
      explanation: "Dereferencing the pointer '*p' reads or modifies the value at the address p is pointing to."
    }
  }
];

// Track 1.2: Python & Computational Thinking (Year 1)
const pythonFoundationsLessons: CurriculumLesson[] = [
  {
    id: "py-basics-logic",
    title: "Python Basics & Fast Prototyping",
    category: "Python Foundations",
    description: "Write clean, readable Python code with indentation, dynamic types, and friendly error messages.",
    route: "/lessons/py-basics-logic",
    order: 1,
    duration: "38 min deep-dive & practice",
    difficulty: "Beginner",
    keySkills: ["Python Syntax", "Dynamic Typing", "Print & Input", "Indentation Rules"],
    trackId: "python-foundations",
    content: {
      overview: "Python is famous for its clean, English-like syntax. It is the language of choice for data science, automation, and AI.",
      sections: [
        {
          title: "Readability Counts",
          explanation: "Unlike C which uses curly braces `{ }`, Python uses indentation (tabs or 4 spaces) to organize blocks of code.",
          codeSnippet: "name = input(\"What is your name? \")\nmarks = [85, 92, 78, 90]\naverage = sum(marks) / len(marks)\nprint(f\"Hello {name}, your average is {average:.1f}!\")",
          language: "python",
          takeaways: [
            "No semicolons required at the end of statements.",
            "f-strings `f\"{variable}\"` make formatting output clean and intuitive."
          ]
        }
      ]
    },
    quiz: {
      question: "How does Python determine which lines of code belong inside an if-statement or function?",
      options: [
        "By using curly braces { }",
        "By using indentation (whitespace / spaces)",
        "By ending lines with semicolons ;",
        "By using the 'end' keyword"
      ],
      correctAnswer: "By using indentation (whitespace / spaces)",
      explanation: "Python enforces clean, consistent indentation to define code blocks."
    }
  },
  {
    id: "py-data-structures",
    title: "Lists, Dictionaries & Collections",
    category: "Python Foundations",
    description: "Master Python lists, sets, and dictionaries (key-value pairs) for real-world data processing.",
    route: "/lessons/py-data-structures",
    order: 2,
    duration: "40 min hands-on lab",
    difficulty: "Beginner",
    keySkills: ["Python Lists", "Dictionaries (dict)", "List Comprehension", "Key-Value Lookups"],
    trackId: "python-foundations",
    content: {
      overview: "Dictionaries let you store information by name instead of by index, like a real phonebook where names point to phone numbers.",
      sections: [
        {
          title: "Dictionaries & Lists in Action",
          explanation: "Use dictionaries to represent structured items like a student profile or product.",
          codeSnippet: "student = {\n    \"name\": \"Aarav\",\n    \"year\": 1,\n    \"branch\": \"CSE\",\n    \"skills\": [\"Python\", \"C\", \"Git\"]\n}\n\nprint(student[\"name\"])  # Prints: Aarav\nstudent[\"skills\"].append(\"SQL\")",
          language: "python",
          takeaways: [
            "Lists `[...]` are ordered collections.",
            "Dictionaries `{key: value}` give instant O(1) lookups by name."
          ]
        }
      ]
    },
    quiz: {
      question: "What bracket syntax is used to define a Python dictionary?",
      options: ["( ) parentheses", "[ ] square brackets", "{ } curly braces", "< > angle brackets"],
      correctAnswer: "{ } curly braces",
      explanation: "Curly braces { key: value } define a dictionary in Python."
    }
  }
];

// Track 1.3: Engineering Essentials & Developer Tools (Year 1)
const engineeringEssentialsLessons: CurriculumLesson[] = [
  {
    id: "terminal-cli-basics",
    title: "The Command Line & Terminal Toolkit",
    category: "Developer Tools",
    description: "Master the command line from absolute scratch. Learn directory navigation, file manipulation, I/O piping, and everyday developer shortcuts.",
    route: "/lessons/terminal-cli-basics",
    order: 1,
    duration: "45 min deep-dive & terminal",
    difficulty: "Beginner",
    keySkills: ["Terminal Navigation", "pwd, cd, ls, mkdir", "Piping & Redirection (| > >>)", "grep, find & search", "Permissions & chmod"],
    trackId: "engineering-essentials",
    content: {
      overview: "The terminal (Command Line Interface / CLI) is the native language of software engineers. While graphical user interfaces (GUIs) limit you to predefined buttons, the CLI gives you direct, scriptable, lightning-fast control over your local operating system, remote cloud instances (AWS, GCP, Linux VPS), and production servers.",
      sections: [
        {
          title: "1. The Terminal Mental Model: Shells, Kernels & The File Tree",
          explanation: "Think of your computer in three layers: The Hardware (CPU, RAM, Disk), The Kernel (the core OS that manages hardware), and The Shell (the text interface that speaks to the kernel). When you type a command into your terminal emulator (like Terminal, iTerm2, or VS Code terminal), a shell program (such as Bash or Zsh) parses your text and asks the kernel to execute it.\n\nAll files exist in a hierarchical tree rooted at '/' (the Root Directory on Unix/Linux). Your personal workspace is '~' (the Home Directory, e.g. /home/user or /Users/user). Knowing whether you are using an Absolute Path (starting from the root '/') versus a Relative Path (starting from wherever you are '.') prevents 90% of beginner errors.",
          codeSnippet: "# Inspect your current active shell and system information\necho $SHELL\nuname -a\n\n# Your home directory path\necho $HOME\n# Show path where system searches for executable programs\necho $PATH",
          language: "bash",
          takeaways: [
            "The terminal is not magic: it is simply a fast text interface to navigate your hard drive.",
            "'.' means current directory, '..' means parent folder, and '~' means your home folder."
          ]
        },
        {
          title: "2. Directory Navigation & Inspection: pwd, ls & cd",
          explanation: "Navigating your system requires three foundational commands:\n1. 'pwd' (Print Working Directory): Tells you precisely where you are in the filesystem.\n2. 'ls' (List): Shows files in the folder. Flags: 'ls -l' (long format with permissions, file sizes, and dates), 'ls -a' (all files, including hidden dotfiles like .gitignore and .env), and 'ls -lh' (human-readable sizes like 4KB or 2MB).\n3. 'cd' (Change Directory): Moves you into a folder. Shortcuts: 'cd ..' moves up one level, 'cd ~' or simply 'cd' jumps to your home folder, and 'cd -' toggles back to the previous folder you were just in.",
          codeSnippet: "# 1. Where am I?\npwd\n# Output: /Users/student/projects\n\n# 2. List all files including hidden ones with human-readable sizes\nls -lah\n\n# 3. Enter a directory\ncd my-project\n\n# 4. Jump back to parent folder\ncd ..\n\n# 5. Jump back to where you were before\ncd -",
          language: "bash",
          takeaways: [
            "Always press the 'Tab' key: it autocompletes file and folder names instantly and prevents spelling mistakes.",
            "Hidden files start with a dot ('.') and are only visible when using 'ls -a'."
          ]
        },
        {
          title: "3. Creating, Editing, Moving & Deleting Files",
          explanation: "You do not need a mouse or file explorer to organize projects. You can create, move, copy, and inspect files directly:\n• 'mkdir -p backend/api/routes': The '-p' flag creates all nested parent folders automatically in one shot.\n• 'touch main.c index.js': Instantly creates blank files.\n• 'cat filename': Dumps the entire file content to your screen.\n• 'head -n 20 file.txt' & 'tail -n 20 file.txt': View only the top or bottom 20 lines (crucial for inspecting huge logs).\n• 'tail -f server.log': Follows log files in real-time as new lines are appended.\n• 'cp -r source/ destination/': Copies files or folders recursively.\n• 'mv old-name.txt new-name.txt': Renames or moves files.\n• 'rm -rf folder': Permanently deletes. CAUTION: The terminal has NO Recycle Bin or Trash can — deleted files are gone forever!",
          codeSnippet: "# Create a complete project skeleton in 2 commands\nmkdir -p campusgrow-app/{src,docs,tests}\ntouch campusgrow-app/src/{main.c,utils.c,utils.h} campusgrow-app/README.md\n\n# Inspect the tree structure\nls -R campusgrow-app\n\n# Copy a file for safe backup\ncp campusgrow-app/src/main.c campusgrow-app/src/main_backup.c\n\n# Move / rename a file\nmv campusgrow-app/src/main_backup.c campusgrow-app/src/archive.c",
          language: "bash",
          takeaways: [
            "The 'mkdir -p' flag creates entire nested directory structures in a single command.",
            "Double-check before running 'rm -rf': terminal deletions bypass the operating system trash bin."
          ]
        },
        {
          title: "4. Standard I/O, Redirection & The Power of Pipes (|)",
          explanation: "The true genius of the Unix terminal is the Philosophy of Small Tools: programs should do one thing well, and connect together seamlessly. Every terminal program has three standard data streams: Standard Input (stdin), Standard Output (stdout), and Standard Error (stderr).\n\n• Output Redirection (>): Overwrites file with output: 'echo \"Hello\" > notes.txt'.\n• Append Redirection (>>): Adds to the end of a file without overwriting: 'echo \"World\" >> notes.txt'.\n• The Pipe Operator (|): Takes the stdout of the left command and feeds it directly into the stdin of the right command! For example: 'cat access.log | grep \"404\" | wc -l' streams the log, filters lines with 404, and counts them.",
          codeSnippet: "# Write text to a file\necho \"CampusGrow Engineering Sprint\" > manifesto.txt\n# Append another line\necho \"Mastering tools today, leading tech tomorrow.\" >> manifesto.txt\n\n# Search for any line containing 'Sprint' in files\ngrep -rn \"Sprint\" .\n\n# Pipe: List all active processes, filter for node.js, and count lines\nps aux | grep \"node\" | wc -l\n\n# Find all C source files in current folder tree\nfind . -name \"*.c\"",
          language: "bash",
          takeaways: [
            "'>' overwrites a file; '>>' appends new content to the end of the file.",
            "The pipe '|' chains commands together like Lego blocks to build powerful automation on the fly."
          ]
        },
        {
          title: "5. Permissions (chmod), Environment Variables & Keyboard Superpowers",
          explanation: "In Linux/Unix, every file has permissions for 3 entities: User (Owner), Group, and Others. The permissions are Read (r=4), Write (w=2), and Execute (x=1). If you write a bash script 'deploy.sh', you must make it executable by running 'chmod +x deploy.sh' before running './deploy.sh'.\n\nEnvironment Variables configure system settings across processes: 'export PORT=3000' sets a variable, and 'echo $PORT' reads it.\n\nKeyboard Shortcuts for 10x Productivity:\n• Ctrl + C: Abort / Kill currently running process immediately.\n• Ctrl + L: Clears the terminal screen (same as typing 'clear').\n• Ctrl + R: Reverse search through your command history by typing a keyword.\n• Ctrl + A / Ctrl + E: Jump cursor to start / end of command line.\n• Up / Down Arrow: Scroll through previous commands.",
          codeSnippet: "# 1. Create a script and make it executable\necho '#!/bin/bash\necho \"System Online: Running CampusGrow Healthcheck...\"' > healthcheck.sh\nchmod +x healthcheck.sh\n./healthcheck.sh\n\n# 2. View file permissions in long listing\nls -l healthcheck.sh\n# Output: -rwxr-xr-x 1 student staff 64 Oct 7 14:00 healthcheck.sh\n\n# 3. Export an environment variable\nexport CAMPUSGROW_ENV=\"production\"\necho $CAMPUSGROW_ENV",
          language: "bash",
          takeaways: [
            "Use 'chmod +x script.sh' to grant execute permissions before running shell scripts.",
            "Memorize 'Ctrl + R' (search history) and 'Ctrl + C' (kill frozen process) for daily peace of mind."
          ]
        }
      ]
    },
    quiz: {
      question: "Which terminal command changes your current working directory to a new folder?",
      options: ["ls", "pwd", "cd", "rm"],
      correctAnswer: "cd",
      explanation: "'cd' stands for change directory and moves you into another folder."
    }
  },
  {
    id: "git-github-foundations",
    title: "Git & GitHub for Engineering Students",
    category: "Developer Tools",
    description: "The complete, definitive masterclass on version control. Learn Git internals, commit workflows, remote GitHub synchronization, branching strategies, merge conflict resolution, pull requests, .gitignore safeguards, and crafting a standout engineering portfolio.",
    route: "/lessons/git-github-foundations",
    order: 2,
    duration: "50 min definitive masterclass",
    difficulty: "Beginner",
    keySkills: [
      "Git DAG & 3-Tree Architecture",
      "Daily Git Workflow (init, add, commit, diff)",
      "GitHub Cloud, SSH Keys & PAT",
      "Feature Branching & Merge Conflicts",
      "The GitHub Platform (Issues, PRs, Reviews)",
      "Safe Undo, .gitignore & Stash",
      "Recruiter-Ready GitHub Portfolio"
    ],
    trackId: "engineering-essentials",
    content: {
      overview: "Git is the undisputed industry standard version control system used by every professional software team on Earth. Git tracks changes to your project over time as an immutable directed acyclic graph (DAG) of snapshots. It lets you experiment fearlessly on isolated branches, undo mistakes with surgical precision, and collaborate with hundreds of engineers without overwriting code. GitHub is the cloud platform that hosts your Git repositories, runs automated testing and CI/CD pipelines, facilitates open-source pull requests and code reviews, and serves as your public engineering portfolio for hiring managers.",
      sections: [
        {
          title: "1. The Git Mental Model & 3-Tree Architecture",
          explanation: "Before Git, students saved files as 'project_final.zip', 'project_final_v2.zip', and 'project_FINAL_for_real.zip'. If code broke, there was no way to know who changed what line, why they changed it, or how to roll back.\n\nGit treats your project as a series of complete historical snapshots (Commits). Every commit has a unique 40-character SHA-1 cryptographic fingerprint (e.g. 'a1b2c3d...'), an author, a timestamp, and a description message.\n\nThe 3 States of Git (The Golden Architecture):\n1. Working Directory: The actual files on your hard drive that you edit in your IDE (VS Code).\n2. Staging Area (The Index): A preparation area where you select precisely which changes are ready to be snapshotted.\n3. Local Repository: The permanent recorded database saved inside your hidden '.git' directory.\n\nAnalogy: Think of taking a professional photograph. The Working Directory is the studio where actors are moving around. Running 'git add' stages the actors into pose and says 'Smile!'. Running 'git commit' clicks the camera shutter to permanently freeze that frame in history.",
          codeSnippet: "# Initialize a brand new local Git repository in your project folder\ngit init\n\n# Configure your identity (Required for commits to be attributed to you)\ngit config --global user.name \"Your Name\"\ngit config --global user.email \"your.email@university.edu\"\n\n# Set the default branch name to 'main' (industry standard)\ngit config --global init.defaultBranch main\n\n# Verify your Git configuration\ngit config --list",
          language: "bash",
          takeaways: [
            "Git is your code's time machine: every commit is a permanent, immutable milestone you can return to.",
            "Git lives locally on your computer; it works completely offline without internet access.",
            "The 3 trees: Working Tree (drafts) -> Staging Area (curated selection) -> Repository (permanent history)."
          ]
        },
        {
          title: "2. The Essential Daily Workflow: status, add, commit & diff",
          explanation: "Every single day as an engineer, you will cycle through this loop:\n\nStep 1: 'git status' — The single most important command in Git. It reveals which files are modified, which are untracked, and which are staged.\n\nStep 2: 'git add <files>' — Moves files from the Working Directory to the Staging Area. You can stage individual files ('git add main.c'), specific hunks interactively ('git add -p'), or all modified files ('git add .').\n\nStep 3: 'git diff' & 'git diff --staged' — Inspect the exact line-by-line differences before committing. Green '+' lines show additions, red '-' lines show deletions.\n\nStep 4: 'git commit -m \"descriptive message\"' — Wraps all staged changes into a permanent commit.\n\nWriting Professional Commit Messages (Conventional Commits Standard):\n• 'feat: add user login authentication with JWT tokens'\n• 'fix: resolve off-by-one index error in array calculation'\n• 'docs: add API documentation and installation steps to README'\n• 'refactor: simplify database connection pooling logic'\n• 'perf: speed up search query response by indexing user_id column'\n• 'test: add unit tests for discount pricing edge cases'",
          codeSnippet: "# 1. Check current repository status\ngit status\n\n# 2. Stage modified files for commit\ngit add src/main.c README.md\n# Or stage all current directory changes\ngit add .\n\n# 3. View staged changes that will be captured in the next commit\ngit diff --staged\n\n# 4. Commit with clear conventional message\ngit commit -m \"feat: initialize core engineering calculation engine\"\n\n# 5. View commit history with pretty single-line graph format\ngit log --oneline --graph --decorate",
          language: "bash",
          takeaways: [
            "Make small, atomic commits that accomplish one clear goal rather than 1 giant commit with 50 unrelated changes.",
            "Always run 'git status' before and after running 'git add' to confirm what you are committing.",
            "Use the Conventional Commits format (feat:, fix:, docs:, refactor:) used by professional engineering teams worldwide."
          ]
        },
        {
          title: "3. Connecting to GitHub: Remotes, SSH Keys & Push/Pull",
          explanation: "Git is the local engine on your machine; GitHub is the cloud platform where teams share repositories. To sync your local project to GitHub:\n\n1. Generate an SSH Key (Secure Passwordless Authentication):\nRun 'ssh-keygen -t ed25519 -C \"your.email@example.com\"'. Copy the generated public key ('cat ~/.ssh/id_ed25519.pub') and paste it into GitHub Settings ➔ SSH and GPG Keys.\n\n2. Link Local Repo to GitHub Remote:\nOn GitHub, create a new repository (e.g. 'campusgrow-app'). Then link your local repo using 'git remote add origin git@github.com:username/campusgrow-app.git'. Here, 'origin' is simply the standard nickname for your remote cloud server.\n\n3. The Push and Pull Cycle:\n• 'git push -u origin main': Uploads your local commits to GitHub's 'main' branch ('-u' sets upstream tracking so future pushes only require 'git push').\n• 'git pull origin main': Fetches the latest commits published by your teammates from GitHub and merges them directly into your local working branch.\n• 'git fetch origin': Downloads remote updates and commit references without modifying your local working files, letting you inspect changes safely before merging.",
          codeSnippet: "# 1. Check configured remotes\ngit remote -v\n\n# 2. Link local repo to GitHub repository\ngit remote add origin git@github.com:yourusername/campusgrow-app.git\n\n# 3. Rename default branch to 'main' (industry standard)\ngit branch -M main\n\n# 4. Push your commits to GitHub with upstream tracking\ngit push -u origin main\n\n# 5. Pull latest changes from teammates before starting work\ngit pull origin main\n\n# 6. Clone an existing repository from GitHub to your machine\ngit clone git@github.com:facebook/react.git",
          language: "bash",
          takeaways: [
            "SSH keys allow secure, seamless pushing without repeatedly typing passwords.",
            "'git push' uploads your local commits to GitHub; 'git pull' downloads remote updates.",
            "Always run 'git pull' before writing new code to ensure your local branch is synchronized with team members."
          ]
        },
        {
          title: "4. Feature Branching & Surviving Merge Conflicts",
          explanation: "In professional engineering teams, developers NEVER commit directly to the 'main' branch. The 'main' branch represents live, battle-tested production code. If every engineer pushes untested code directly to main, the website will break constantly.\n\nThe Feature Branch Workflow:\n1. Create and switch to a separate sandbox branch: 'git checkout -b feature/dark-mode' (or modern syntax: 'git switch -c feature/dark-mode').\n2. Write code, test, and commit freely on your branch.\n3. When ready, switch back to main ('git checkout main'), pull the latest updates ('git pull'), and merge your feature ('git merge feature/dark-mode').\n\nUnderstanding Merge Conflicts:\nA Merge Conflict occurs when two developers modify the exact same lines of the exact same file in conflicting ways, and Git cannot automatically decide which version is correct. Git halts the merge and inserts conflict markers directly into your file:\n\n<<<<<<< HEAD (Current branch code)\nprintf(\"Hello from Developer Alice\\n\");\n=======\nprintf(\"Hello from Developer Bob\\n\");\n>>>>>>> feature/bob-updates (Incoming branch code)\n\nResolving Conflicts Step-by-Step:\n1. Open the conflicted file in VS Code.\n2. Discuss with your teammate or decide which code to keep (or keep a hybrid of both).\n3. Delete the '<<<<<<<', '=======', and '>>>>>>>' marker lines.\n4. Save the file, run 'git add <file>', and run 'git commit -m \"fix: resolve merge conflict in greetings\"'.",
          codeSnippet: "# 1. Create and switch to a new feature branch\ngit checkout -b feature/user-profile-card\n# (Alternative modern command: git switch -c feature/user-profile-card)\n\n# 2. Make your edits and commit on your branch\ngit add src/ProfileCard.tsx\ngit commit -m \"feat: add responsive student avatar and badge\"\n\n# 3. Switch back to main branch\ngit checkout main\ngit pull origin main\n\n# 4. Merge feature branch into main\ngit merge feature/user-profile-card\n\n# 5. Delete feature branch once merged cleanly\ngit branch -d feature/user-profile-card\n# Delete remote branch on GitHub\ngit push origin --delete feature/user-profile-card",
          language: "bash",
          takeaways: [
            "Branches are free, lightweight, and isolated: always build features on dedicated branches.",
            "Merge conflicts are normal and not an error: they simply mean human judgment is needed to pick the right code.",
            "Delete feature branches once merged to keep the repository clean and maintainable."
          ]
        },
        {
          title: "5. The GitHub Collaborative Platform: Issues, PRs, Code Reviews & Projects",
          explanation: "GitHub is far more than just cloud backup for Git code — it is the collaboration operating system of modern technology companies:\n\n1. Issues: Track bug reports, feature requests, and technical debt. You can assign issues to team members, attach labels (like 'bug', 'enhancement', 'good-first-issue'), and link them to milestones.\n\n2. Pull Requests (PRs): A Pull Request is a formal proposal asking project maintainers to review, test, and merge your branch into main. Every PR shows a side-by-side visual diff of all additions and deletions.\n\n3. Code Reviews: Teammates review your code directly in GitHub. They can leave comments on specific lines, suggest improvements with 1-click apply buttons, request changes, or approve the PR with 'LGTM' (Looks Good To Me).\n\n4. GitHub Discussions & Projects: Kanban boards (To Do, In Progress, Done) that synchronize automatically with PRs and Issues to coordinate sprint velocity across entire engineering departments.\n\n5. Releases & Tags: Create semantic version tags (e.g. 'v1.0.0') to mark production milestones and distribute downloadable binaries and release notes.",
          codeSnippet: "# Linking an Issue in a Pull Request Description:\n# Typing 'Closes #42' or 'Fixes #42' in your PR automatically closes issue #42 on merge!\n\n# Create a semantic Git release tag locally and push to GitHub\ngit tag -a v1.0.0 -m \"Release v1.0.0: Initial production release\"\ngit push origin v1.0.0\n\n# View all tags\ngit tag -l",
          language: "bash",
          takeaways: [
            "Pull Requests allow teammates to review and discuss code before it ever touches production.",
            "Type 'Closes #ID' in your PR description to automatically close the associated issue upon merging.",
            "Tag releases with Semantic Versioning (v1.0.0) to mark production milestones."
          ]
        },
        {
          title: "6. Production Safeguards: .gitignore, Safe Undoing & Stashing",
          explanation: "Critical Engineering Safeguards:\n\n1. The '.gitignore' File: Never commit secret API keys, compiled binaries, or downloaded dependencies. Create a '.gitignore' file at the root of your project specifying what Git must ignore:\n• 'node_modules/' (huge external libraries)\n• '.env*' (secret database passwords & API keys)\n• '*.exe', '*.o', 'a.out' (compiled machine binaries)\n• '.DS_Store' (macOS system metadata)\nIf a file was accidentally committed already, untrack it without deleting it from disk: 'git rm --cached <filename>'.\n\n2. Undoing Mistakes Safely:\n• Discard uncommitted changes to a file: 'git restore <filename>'\n• Unstage a file you added by mistake: 'git restore --staged <filename>'\n• Amend your last commit message: 'git commit --amend -m \"new message\"'\n• Rollback a published commit safely: 'git revert <commit-hash>' (creates a new commit that cleanly reverses the previous changes without destroying history).\n• CAUTION: 'git reset --hard' permanently destroys uncommitted work — only use it when you explicitly intend to throw away local changes!\n\n3. Git Stash (Saving Work in Progress):\nIf you are halfway through a feature and need to switch branches immediately to fix a critical bug, run 'git stash'. It temporarily shelves your uncommitted changes. When you return, run 'git stash pop' to restore your work exactly where you left off.",
          codeSnippet: "# Example production .gitignore file for full-stack engineering\ncat << 'EOF' > .gitignore\n# Dependencies\nnode_modules/\nvendor/\n\n# Environment & Secrets (NEVER COMMIT!)\n.env\n.env.local\n*.pem\n*.key\n\n# Build outputs & Binaries\ndist/\nbuild/\n*.o\n*.exe\na.out\n\n# OS Metadata\n.DS_Store\nThumbs.db\nEOF\n\n# Temporarily stash unfinished work to switch branches\ngit stash save \"wip: half-done payment checkout logic\"\ngit checkout main\n# ...fix critical bug...\ngit checkout feature-payments\ngit stash pop",
          language: "bash",
          takeaways: [
            "Never commit .env files: leaked credentials on public GitHub repositories are scraped by automated botnets in seconds.",
            "Use 'git restore' to discard local accidents before committing.",
            "Use 'git stash' to safely park uncommitted experiments when switching tasks."
          ]
        },
        {
          title: "7. Crafting an Elite GitHub Portfolio for Recruiters",
          explanation: "Your GitHub profile is your live engineering resume. Hiring managers and technical recruiters review your GitHub to verify whether you write real software or just copy tutorials.\n\nElements of an Elite Engineering Profile:\n1. Special Profile README: Create a repository named exactly after your GitHub username (e.g. 'username/username'). Add a self-introduction, tech stack badges (from shields.io), GitHub stats cards, and social links.\n2. Pin Your Top 4-6 Capstone Projects: Don't let recruiters dig through 50 abandoned class assignments. Pin production-grade projects with live demo URLs, architecture diagrams, and comprehensive READMEs.\n3. The Anatomy of an Award-Winning Project README:\n• Project Title with a 1-sentence value proposition\n• Badges: Tech stack, license, live status\n• High-resolution screenshots or animated demo GIF\n• Live Demo Link (Vercel, Netlify, Render)\n• Key Architectural Decisions & Tech Stack Highlights\n• Local Setup & Quickstart Guide ('git clone', 'npm install', 'npm run dev')\n• Author Contact & License Information",
          codeSnippet: "# 🚀 Project Name\n> A production-grade real-time collaborative workspace built with Next.js, WebSockets, and Redis.\n\n[Live Demo](https://my-app.vercel.app) • [API Docs](./docs/api.md) • [Architecture](./docs/architecture.md)\n\n### Key Technical Highlights\n- **Sub-50ms Latency**: Built on persistent WebSockets with pub/sub Redis clusters.\n- **Optimistic UI Updates**: Conflict-free replicated data types (CRDTs) for concurrent editing.\n- **Automated CI/CD**: 100% test coverage verified with GitHub Actions.\n\n### Quickstart\n```bash\ngit clone git@github.com:yourname/project.git\ncd project\nnpm install\nnpm run dev\n```",
          language: "markdown",
          takeaways: [
            "Every pinned repository must have a live working link and a descriptive README.",
            "Maintain a green contribution graph with frequent, atomic commits to demonstrate consistency.",
            "Treat your GitHub profile as your primary proof of engineering competence."
          ]
        }
      ]
    },
    quiz: {
      question: "What command creates a permanent checkpoint/snapshot of your staged changes in Git?",
      options: ["git save", "git commit -m \"message\"", "git push", "git init"],
      correctAnswer: "git commit -m \"message\"",
      explanation: "git commit packages your staged changes into a permanent recorded commit snapshot."
    }
  },
  {
    id: "vscode-ide-developer-tools",
    title: "VS Code & Modern IDE Productivity Superpowers",
    category: "Developer Tools",
    description: "Master Visual Studio Code like a 10x engineer. Learn the Command Palette, multi-cursor editing, keyboard shortcuts, essential extensions, workspace configuration, and built-in source control.",
    route: "/lessons/vscode-ide-developer-tools",
    order: 3,
    duration: "42 min hands-on lab",
    difficulty: "Beginner",
    keySkills: [
      "Command Palette (Ctrl+Shift+P)",
      "Multi-Cursor Editing",
      "Extensions (ESLint, Prettier, GitLens)",
      ".vscode/settings.json & launch.json",
      "Integrated Terminal & Split Views"
    ],
    trackId: "engineering-essentials",
    content: {
      overview: "Visual Studio Code (VS Code) is the world's most popular code editor, used by over 75% of professional software engineers. While beginners treat it as a basic text editor with syntax coloring, elite developers use it as an integrated productivity powerhouse. Mastering its keyboard shortcuts, multi-cursor manipulation, workspace settings, extension ecosystem, and integrated debugger will literally double your coding speed.",
      sections: [
        {
          title: "1. Modern IDE Architecture & The Command Palette",
          explanation: "VS Code is organized into five primary interface zones:\n1. Activity Bar (far left): Quick navigation between Explorer, Search, Source Control, Run & Debug, and Extensions.\n2. Side Bar: Contextual information for the active tool.\n3. Editor Groups: The main editing surface where you write code (supports vertical and horizontal splits).\n4. Panel (bottom): Houses the Integrated Terminal, Output logs, Problems list, and Debug Console.\n5. Status Bar (bottom edge): Shows git branch, language mode, encoding, indentation, and errors.\n\nThe #1 Superpower: The Command Palette:\nPress 'Cmd + Shift + P' (macOS) or 'Ctrl + Shift + P' (Windows/Linux). This opens the Command Palette, which gives you instant keyboard access to EVERY single command, setting, and extension action in the editor without touching your mouse.\n\nFuzzy File Navigation:\nPress 'Cmd + P' (or 'Ctrl + P') to open Quick Open. Type any part of a filename to jump to it instantly. Type '@' followed by a symbol name to jump directly to a function or class inside the file!",
          codeSnippet: "# Essential VS Code Keyboard Shortcuts:\n# Command Palette:  Cmd+Shift+P (Mac) / Ctrl+Shift+P (Win)\n# Quick Open File:  Cmd+P (Mac)       / Ctrl+P (Win)\n# Go to Symbol:     Cmd+Shift+O (Mac) / Ctrl+Shift+O (Win)\n# Toggle Terminal:  Ctrl+` (Backtick)\n# Toggle Sidebar:   Cmd+B (Mac)       / Ctrl+B (Win)",
          language: "bash",
          takeaways: [
            "Never dig through menu bars: open the Command Palette with Ctrl+Shift+P / Cmd+Shift+P.",
            "Use Quick Open (Ctrl+P / Cmd+P) to switch between project files in milliseconds.",
            "Toggle the sidebar (Cmd+B / Ctrl+B) to maximize screen real estate when writing code."
          ]
        },
        {
          title: "2. High-Speed Multi-Cursor Editing & Keyboard Navigation",
          explanation: "Editing code line by line with a mouse is painfully slow. Multi-cursor editing lets you type in multiple places simultaneously:\n\n• Select Next Occurrence ('Cmd + D' / 'Ctrl + D'): Highlight a variable name, press Cmd+D repeatedly to select the next matching instances, and rename them all at once!\n• Place Multiple Cursors ('Option + Click' / 'Alt + Click'): Click anywhere in the editor to place independent active cursors.\n• Column (Box) Selection ('Shift + Option + Drag' / 'Shift + Alt + Drag'): Create a vertical column of cursors across multiple lines.\n• Line Manipulation:\n  - Move line up/down: 'Option + Up/Down' (Mac) / 'Alt + Up/Down' (Win)\n  - Duplicate line: 'Shift + Option + Down' (Mac) / 'Shift + Alt + Down' (Win)\n  - Delete line: 'Cmd + Shift + K' (Mac) / 'Ctrl + Shift + K' (Win)\n  - Comment line: 'Cmd + /' (Mac) / 'Ctrl + /' (Win)",
          codeSnippet: "// Before Multi-Cursor (Editing one by one takes 20 clicks):\n// const user_id = 1;\n// const user_name = \"Alex\";\n// const user_email = \"alex@domain.com\";\n\n// With Alt+Click or Cmd+D, rename 'user_' to 'student_' across all lines in 2 seconds:\nconst student_id = 1;\nconst student_name = \"Alex\";\nconst student_email = \"alex@domain.com\";",
          language: "typescript",
          takeaways: [
            "Use 'Cmd+D' / 'Ctrl+D' to highlight and edit matching words simultaneously.",
            "Use 'Option+Up/Down' / 'Alt+Up/Down' to slide lines of code up and down without copy-pasting.",
            "Duplicate lines instantly with 'Shift+Option+Down' / 'Shift+Alt+Down'."
          ]
        },
        {
          title: "3. The Essential Developer Extension Suite",
          explanation: "Extensions transform VS Code into an enterprise IDE tailored to your exact tech stack. Here are the must-have tools installed by every professional engineer:\n\n1. Prettier - Code Formatter: Enforces consistent quotes, semicolons, and indentation automatically whenever you save a file.\n2. ESLint: Catches syntax errors, unused variables, and subtle JavaScript/TypeScript bugs before you even run the code.\n3. GitLens: Supercharges Git inside VS Code. Shows inline annotations of who authored each line, when it was committed, and the PR link.\n4. Error Lens: Highlights compiler and linter errors directly inline with bright red text so you spot issues immediately.\n5. Tailwind CSS IntelliSense: Provides autocomplete and color previews for utility classes.\n6. Live Server: Spawns a local development server with automatic reload for static HTML/CSS/JS projects.\n7. Docker & Remote - SSH: Allows you to edit code running inside Docker containers or on remote Linux cloud servers seamlessly.",
          codeSnippet: "# Install extensions via terminal command line:\ncode --install-extension esbenp.prettier-vscode\ncode --install-extension dbaeumer.vscode-eslint\ncode --install-extension eamodio.gitlens\ncode --install-extension usernamehw.errorlens\ncode --install-extension bradlc.vscode-tailwindcss",
          language: "bash",
          takeaways: [
            "Prettier guarantees that your code adheres to standard team formatting on every save.",
            "Error Lens makes syntax errors impossible to overlook by displaying them directly beside your code.",
            "GitLens provides instant context on who wrote each line of code and why."
          ]
        },
        {
          title: "4. Workspace Configuration: settings.json, launch.json & tasks.json",
          explanation: "Professional teams check in a '.vscode' folder to their git repository to ensure everyone on the team shares the exact same editor rules:\n\n1. '.vscode/settings.json': Overrides user preferences for this specific project. Configure format-on-save, tab width, and file associations.\n\n2. '.vscode/launch.json': Configures the interactive debugger. Allows 1-click debugging of Node.js servers, Next.js apps, Python scripts, or C/C++ binaries.\n\n3. '.vscode/tasks.json': Automates repetitive build tasks like compiling C code with GCC or running custom test scripts.",
          codeSnippet: "// .vscode/settings.json - Team standard editor configuration\n{\n  \"editor.formatOnSave\": true,\n  \"editor.defaultFormatter\": \"esbenp.prettier-vscode\",\n  \"editor.tabSize\": 2,\n  \"editor.wordWrap\": \"on\",\n  \"editor.rulers\": [80, 120],\n  \"files.trimTrailingWhitespace\": true,\n  \"files.insertFinalNewline\": true\n}",
          language: "json",
          takeaways: [
            "Commit a '.vscode/settings.json' file so all teammates automatically share identical formatting rules.",
            "Enable 'editor.formatOnSave' to never argue about code indentation or trailing spaces again."
          ]
        },
        {
          title: "5. Built-in Source Control, Visual Diffs & Terminal Workflow",
          explanation: "VS Code includes a first-class visual Git interface:\n\n• Visual Source Control: View all modified files, stage individual hunks (partial file commits) with one click, and write conventional commit messages with built-in character counters.\n• Inline Side-by-Side Diffs: Click any modified file to see old code on the left (red) and new code on the right (green).\n• Integrated Terminal Splitting: Press 'Ctrl + ` (Backtick)' to toggle the terminal. Click the split icon to run your Next.js dev server on the left while running git commands or database queries on the right!\n• Terminal Profiles: Easily switch between Bash, Zsh, PowerShell, or WSL depending on your OS.",
          codeSnippet: "# Open current folder in VS Code from terminal:\ncode .\n\n# Open specific file at line 45:\ncode -g src/server.ts:45\n\n# Open visual side-by-side diff between two files:\ncode --diff old_version.js new_version.js",
          language: "bash",
          takeaways: [
            "Use visual side-by-side diffs to review changes before committing.",
            "Split your integrated terminal to run servers and background commands side by side without switching windows."
          ]
        }
      ]
    },
    quiz: {
      question: "Which keyboard shortcut opens the universal Command Palette in Visual Studio Code?",
      options: ["Cmd+Shift+P / Ctrl+Shift+P", "Cmd+F / Ctrl+F", "Alt+Tab", "F12"],
      correctAnswer: "Cmd+Shift+P / Ctrl+Shift+P",
      explanation: "Cmd+Shift+P (macOS) or Ctrl+Shift+P (Windows/Linux) opens the Command Palette to execute any command in VS Code."
    }
  },
  {
    id: "debugging-developer-tools",
    title: "Interactive Debugging & Browser DevTools Masterclass",
    category: "Developer Tools",
    description: "Stop guessing with console.log. Master the scientific debugging process, conditional breakpoints, call stack forensics, browser DevTools, and network waterfall performance audits.",
    route: "/lessons/debugging-developer-tools",
    order: 4,
    duration: "45 min interactive lab",
    difficulty: "Beginner",
    keySkills: [
      "Scientific Debugging",
      "Conditional Breakpoints & Logpoints",
      "Call Stack & Scope Inspection",
      "Browser DevTools (Elements & Network)",
      "Memory Profiling & Storage"
    ],
    trackId: "engineering-essentials",
    content: {
      overview: "Every programmer spends 70% of their career debugging code. Beginners debug by scattering 50 'console.log()' or 'printf()' statements across their project, guessing blindly at what went wrong. Senior engineers use interactive debuggers and browser DevTools to freeze time, step line-by-line through memory, evaluate expressions in real-time, inspect call stacks, and analyze network packets with precision.",
      sections: [
        {
          title: "1. Moving Beyond console.log: The Scientific Debugging Methodology",
          explanation: "Scattering print statements has massive flaws: it pollutes production logs, slows down execution, modifies source code, and cannot pause execution mid-flight.\n\nThe 4-Step Scientific Debugging Method:\n1. Reproduce: Find the exact sequence of minimal inputs that triggers the bug consistently.\n2. Hypothesize: Formulate a clear, falsifiable hypothesis ('The loop is reading index n instead of n-1').\n3. Isolate: Set a breakpoint right before the failure point to observe variable states in memory.\n4. Verify & Fix: Step through execution, verify whether your hypothesis holds, apply the minimal correct fix, and write a test case to prevent regressions.",
          codeSnippet: "# Why print debugging fails:\n# 1. Print statements can change timing in concurrent/async race conditions.\n# 2. Objects printed to console in async JavaScript can mutate before you inspect them!\n# 3. Forgetting to remove console.log leaks private data to public client consoles.",
          language: "bash",
          takeaways: [
            "Debugging is a science, not guesswork: reproduce, hypothesize, isolate, and verify.",
            "Interactive debuggers let you pause program execution without touching your source code."
          ]
        },
        {
          title: "2. Breakpoint Mastery: Line, Conditional, Hit Count & Logpoints",
          explanation: "In modern editors (VS Code, Chrome DevTools), click to the left of any line number to set breakpoints:\n\n1. Standard Line Breakpoint (Red Dot): Halts program execution the instant CPU reaches that line.\n2. Conditional Breakpoint (Orange Dot): Only halts execution if an expression evaluates to TRUE (e.g. 'userId === 999' or 'total < 0'). Crucial for debugging loops with 10,000 iterations where the bug only occurs on item #7,842!\n3. Hit Count Breakpoint: Halts execution only after the line has been executed a specified number of times (e.g. 'hit count: 50').\n4. Logpoint (Diamond): Prints a custom message to the console without pausing execution and without modifying your source code!",
          codeSnippet: "// Example code with tricky bug in loop:\nfor (let i = 0; i <= items.length; i++) {\n  // Setting a conditional breakpoint here:\n  // Condition: i === items.length\n  // Immediately shows that items[i] evaluates to undefined! (Off-by-one bug)\n  processItem(items[i]);\n}",
          language: "javascript",
          takeaways: [
            "Use conditional breakpoints to skip thousands of valid loop iterations and pause only on the failure state.",
            "Use logpoints to print variables dynamically without adding console.log to your source code."
          ]
        },
        {
          title: "3. Execution Stepping: Step Over, Step Into, Step Out & Call Stack Forensics",
          explanation: "When execution pauses at a breakpoint, the debugger controls appear:\n\n• Continue (F5): Resumes normal execution until the next breakpoint is hit.\n• Step Over (F10): Executes the current line and moves to the next line in the same function without diving inside helper methods.\n• Step Into (F11): Dives inside the function being called on the current line to inspect its internal logic.\n• Step Out (Shift + F11): Finishes executing the current function and returns to the calling method.\n\nThe Call Stack Pane:\nShows the exact chain of function invocations that led to the current line. Click on any frame in the call stack to travel back in time and inspect the arguments passed by the caller function!",
          codeSnippet: "# The Debugging Navigation Controls:\n# F5:        Continue to next breakpoint\n# F10:       Step Over current line\n# F11:       Step Into nested function\n# Shift+F11: Step Out of current function\n# Shift+F5:  Stop debugging session",
          language: "bash",
          takeaways: [
            "Use Step Over (F10) for routine lines, and Step Into (F11) when you suspect a bug inside a specific function.",
            "The Call Stack lets you trace who called your function and what arguments they provided."
          ]
        },
        {
          title: "4. Browser DevTools: DOM Inspection, CSS Box Model & Network Waterfall",
          explanation: "Press 'F12' or right-click 'Inspect' in Chrome/Firefox/Edge to open Browser DevTools:\n\n1. Elements Tab: View and live-edit HTML and CSS. Hover over any element to see its Box Model (Margin in orange, Border in yellow, Padding in green, Content in blue). Tweak flexbox and grid alignments live.\n\n2. Console Tab: Execute JavaScript in the context of the live page. Use 'console.table(data)' to render arrays of objects as clean readable tables!\n\n3. Network Tab: Inspect every HTTP request made by the browser:\n• Status Codes: 200 (OK), 304 (Cached), 400 (Bad Request), 401 (Unauthorized), 404 (Not Found), 500 (Internal Server Error).\n• Request Headers & Payload: Inspect JSON bodies sent to APIs.\n• Waterfall Timeline: Measures DNS Lookup, SSL Handshake, TTFB (Time to First Byte), and Content Download time.\n• Throttling: Simulate 'Fast 3G' or 'Offline' mode to test slow connections.",
          codeSnippet: "// Rich Console API techniques:\nconsole.table([\n  { id: 1, name: \"Alice\", role: \"Frontend\" },\n  { id: 2, name: \"Bob\", role: \"Backend\" }\n]);\n\n// Benchmark execution time of complex operations:\nconsole.time(\"ArraySort\");\nlargeArray.sort();\nconsole.timeEnd(\"ArraySort\");",
          language: "javascript",
          takeaways: [
            "Use 'console.table()' to format arrays and objects into beautiful visual tables.",
            "Inspect the Network tab to debug failed API calls, response status codes, and JSON payloads.",
            "Test slow networks and offline behavior using the DevTools Network Throttling dropdown."
          ]
        },
        {
          title: "5. Memory Leak Profiling, Performance Audits & Application Storage",
          explanation: "Enterprise web apps must stay fast and prevent browser tab crashes:\n\n1. Application Tab: Inspect client-side storage:\n• localStorage: Key-value strings that persist indefinitely (5MB limit).\n• sessionStorage: Scoped to the current browser tab.\n• Cookies: Includes HTTP-only session cookies used for secure authentication.\n• IndexedDB: Client-side NoSQL database for offline web apps.\n\n2. Memory Tab & Heap Snapshots: Take a heap snapshot, perform an action, and take another. Compare the two snapshots to find detached DOM nodes or forgotten event listeners that are leaking memory!",
          codeSnippet: "// Inspect and manipulate localStorage directly:\nlocalStorage.setItem(\"user_theme\", \"dark\");\nconsole.log(localStorage.getItem(\"user_theme\"));\n\n// Clear storage for testing clean user onboarding:\nlocalStorage.clear();",
          language: "javascript",
          takeaways: [
            "Check the Application tab to inspect localStorage, cookies, and cached tokens.",
            "Heap snapshots let you detect memory leaks caused by lingering event listeners or uncollected references."
          ]
        }
      ]
    },
    quiz: {
      question: "Which type of breakpoint halts execution ONLY when a specified boolean condition evaluates to true?",
      options: ["Conditional Breakpoint", "Line Breakpoint", "Logpoint", "Hit Count Breakpoint"],
      correctAnswer: "Conditional Breakpoint",
      explanation: "A Conditional Breakpoint pauses program execution only when the configured condition evaluates to true."
    }
  },
  {
    id: "package-managers-build-tools",
    title: "Package Managers, Build Tools & Dev Environment Security",
    category: "Developer Tools",
    description: "Understand npm, pnpm, yarn, lockfile mechanics, semantic versioning (SemVer), modern bundlers (Vite, Webpack), linters, pre-commit hooks, and environment variable security (.env).",
    route: "/lessons/package-managers-build-tools",
    order: 5,
    duration: "40 min deep-dive",
    difficulty: "Beginner",
    keySkills: [
      "npm, pnpm, yarn & Lockfiles",
      "Semantic Versioning (SemVer)",
      "Vite, Webpack & Transpilers",
      "Linters & Pre-commit Hooks (Husky)",
      ".env & API Secret Protection"
    ],
    trackId: "engineering-essentials",
    content: {
      overview: "Modern software is assembled from open-source building blocks. Instead of writing authentication or date formatting from scratch, engineers import community packages. Managing these dependencies, understanding semantic versioning, using fast build bundlers like Vite, and locking down secret environment variables is mandatory for building reliable, secure software.",
      sections: [
        {
          title: "1. Package Managers: npm, pnpm, yarn and Why Lockfiles are Mandatory",
          explanation: "Package managers download and coordinate external third-party libraries:\n• 'npm' (Node Package Manager): The default tool bundled with Node.js.\n• 'pnpm' (Performant npm): Saves gigabytes of disk space by hard-linking identical packages across all projects.\n• 'yarn': Fast package manager created by Meta.\n\nThe 'package.json' vs 'package-lock.json' Golden Rule:\n• 'package.json': Lists the high-level dependencies your project needs (e.g. \"react\": \"^18.2.0\").\n• 'package-lock.json': The exact, frozen tree of every sub-dependency, down to the exact version and SHA cryptographic checksum.\n\nWhy you MUST commit 'package-lock.json' to Git:\nIf developer Alice installs packages on Monday, and library author Bob updates a sub-dependency on Tuesday that has a bug, developer Charlie running 'npm install' on Wednesday will get broken code! Committing the lockfile ensures EVERY teammate and CI server installs the exact same code byte-for-byte. Always run 'npm ci' in production or CI/CD pipelines!",
          codeSnippet: "# 1. Initialize a new project manifest\nnpm init -y\n\n# 2. Install production dependency (saved in 'dependencies')\nnpm install axios\n\n# 3. Install developer-only tooling (saved in 'devDependencies')\nnpm install -D typescript @types/node\n\n# 4. Clean, deterministic install in CI/CD using lockfile\nnpm ci",
          language: "bash",
          takeaways: [
            "Always commit 'package-lock.json' (or 'pnpm-lock.yaml') to Git to prevent 'works on my machine' dependency mismatches.",
            "Use 'npm ci' in CI/CD environments for fast, clean, deterministic installs.",
            "Separate runtime dependencies from dev-only tooling using '--save-dev' (-D)."
          ]
        },
        {
          title: "2. Semantic Versioning (SemVer) & Security Vulnerability Auditing",
          explanation: "Most software packages follow Semantic Versioning (SemVer): 'MAJOR . MINOR . PATCH' (e.g. 2.4.1):\n• PATCH (1.0.0 -> 1.0.1): Backwards-compatible bug fixes.\n• MINOR (1.0.0 -> 1.1.0): Backwards-compatible new features added.\n• MAJOR (1.0.0 -> 2.0.0): BREAKING changes! Code written for v1 may no longer work in v2.\n\nVersion Prefixes in package.json:\n• '^1.2.3' (Caret): Allows updates to newer MINOR and PATCH versions (up to < 2.0.0).\n• '~1.2.3' (Tilde): Allows updates to newer PATCH versions only (up to < 1.3.0).\n• '1.2.3' (Exact): Locks to this specific version only.\n\nSecurity Auditing:\nMalicious packages can steal environment secrets or introduce backdoor vulnerabilities. Run 'npm audit' regularly to scan your dependency tree against the official GitHub advisory database, and 'npm audit fix' to patch known security vulnerabilities automatically.",
          codeSnippet: "# Check all installed dependencies for known security CVEs\nnpm audit\n\n# Automatically upgrade vulnerable packages to safe patched versions\nnpm audit fix\n\n# Inspect outdated packages in your project\nnpm outdated",
          language: "bash",
          takeaways: [
            "MAJOR version bumps introduce breaking changes; MINOR and PATCH updates should be backwards-compatible.",
            "'^' updates minor/patch; '~' updates patch only.",
            "Run 'npm audit' to protect your project from known security vulnerabilities."
          ]
        },
        {
          title: "3. Modern Build Tools, Bundlers & Transpilers (Vite, Webpack, esbuild)",
          explanation: "Browsers only understand HTML, CSS, and vanilla JavaScript. They do not natively understand TypeScript, JSX, SCSS, or thousands of modular imports.\n\nWhat Build Tools Do:\n1. Transpilation: Converts modern TypeScript or JSX into standard browser-compatible JavaScript (via Babel, SWC, or esbuild).\n2. Bundling: Packages hundreds of separate code files into optimized bundles to minimize network requests.\n3. Minification: Strips whitespace, comments, and renames variables to 1-letter characters ('function calculateTotal()' becomes 'function c()') to reduce file size by 70%.\n4. Tree-Shaking: Dead-code elimination that removes unused exports from libraries so your users never download code that is never called.\n\nVite vs Webpack:\nVite uses native ES Modules (ESM) in development and lightning-fast Go-based 'esbuild', delivering instant Hot Module Replacement (HMR) in under 50ms compared to older Webpack configurations.",
          codeSnippet: "# Create a lightning-fast modern web application with Vite\nnpm create vite@latest my-app -- --template react-ts\ncd my-app\nnpm install\nnpm run dev",
          language: "bash",
          takeaways: [
            "Bundlers combine, transpile, and minify your code for browser performance.",
            "Tree-shaking automatically eliminates unused library code from your final production bundle.",
            "Vite provides near-instant Hot Module Replacement during local development."
          ]
        },
        {
          title: "4. Automated Code Quality: Linters, Formatters & Git Pre-commit Hooks",
          explanation: "Top engineering teams enforce code quality automatically before any commit can even be created:\n\n• Linter (ESLint): Analyzes code for potential bugs, security anti-patterns, and bad practices.\n• Formatter (Prettier): Automatically standardizes quotation marks, semicolons, and bracket formatting.\n• Pre-commit Hooks (Husky + lint-staged): A Git hook that runs automatically whenever an engineer types 'git commit'. It runs ESLint and Prettier on only the files you are about to commit. If any test or lint rule fails, the commit is aborted immediately!",
          codeSnippet: "# Set up pre-commit hook with Husky in 2 commands\nnpx husky-init && npm install\n\n# In .husky/pre-commit:\n# npx lint-staged\n\n# package.json config:\n# \"lint-staged\": {\n#   \"*.{ts,tsx,js}\": [\"eslint --fix\", \"prettier --write\"]\n# }",
          language: "bash",
          takeaways: [
            "Linters find code bugs; formatters enforce visual styling.",
            "Use Husky pre-commit hooks to block bad or unformatted code from ever entering Git history."
          ]
        },
        {
          title: "5. Environment Variables & Secret Security: Safeguarding API Keys",
          explanation: "Software requires secret keys (Stripe payment keys, database passwords, OpenAI API tokens). NEVER hardcode secrets into your source code or commit them to GitHub!\n\nThe .env Architecture:\n• '.env.local' / '.env': Stores your actual secret keys locally on your laptop. MUST BE LISTED IN '.gitignore'!\n• '.env.example': A committed template that documents what keys are needed without containing the real values (e.g. 'DATABASE_URL=postgresql://user:password@localhost:5432/dbname').\n\nAccessing Environment Variables:\nIn Node.js: 'process.env.DATABASE_URL'. In Next.js: variables starting with 'NEXT_PUBLIC_' are exposed to the browser, while all others remain secure on the server.",
          codeSnippet: "# .env.local (STRICTLY IN .gitignore - NEVER COMMIT!)\nDATABASE_URL=\"postgresql://admin:super_secret_pw@localhost:5432/production\"\nSTRIPE_SECRET_KEY=\"sk_live_51Abc123xyz...\"\n\n# .env.example (Committed to Git for teammates)\nDATABASE_URL=\"postgresql://user:password@localhost:5432/db\"\nSTRIPE_SECRET_KEY=\"sk_test_placeholder\"",
          language: "bash",
          takeaways: [
            "Never commit .env files: store secret keys locally and list .env in your .gitignore.",
            "Provide a '.env.example' template so teammates know which configuration variables to set up."
          ]
        }
      ]
    },
    quiz: {
      question: "Why must 'package-lock.json' always be committed to Git version control?",
      options: [
        "It locks the exact dependency tree and checksums to guarantee identical installs across all teammates and CI servers",
        "It contains secret database passwords required to launch the project",
        "It compiles the JavaScript code into machine language",
        "It is required by the browser to render HTML elements"
      ],
      correctAnswer: "It locks the exact dependency tree and checksums to guarantee identical installs across all teammates and CI servers",
      explanation: "package-lock.json ensures that every machine and deployment runner installs the exact identical versions of all transitive dependencies."
    }
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// YEAR 2: CORE COMPUTER SCIENCE & SYSTEMS (Sophomore Year)
// ─────────────────────────────────────────────────────────────────────────────

// Track 2.1: Data Structures & Algorithms Mastery (Year 2)
const dsaLessons: CurriculumLesson[] = [
  {
    id: "dsa-arrays-complexity",
    title: "Arrays, Space-Time Complexity & Big-O",
    category: "Data Structures & Algorithms",
    description: "Learn how to measure code performance using Big-O notation, and understand memory arrays.",
    route: "/lessons/dsa-arrays-complexity",
    order: 1,
    duration: "45 min interactive masterclass",
    difficulty: "Intermediate",
    keySkills: ["Big-O Notation", "Time Complexity", "Space Complexity", "Array Operations"],
    trackId: "dsa-mastery",
    content: {
      overview: "Big-O notation tells you how much slower your code gets as the amount of data grows from 10 items to 10 million items.",
      sections: [
        {
          title: "Understanding Big-O with Everyday Comparisons",
          explanation: "O(1) is instant (like looking up locker #5). O(N) takes time proportional to count (reading a book page by page). O(N^2) checks every pair (like shaking hands with every person in a room).",
          codeSnippet: "// O(1) Constant Time Lookup\nint firstItem = arr[0];\n\n// O(N) Linear Time Search\nfor (int i = 0; i < n; i++) {\n    if (arr[i] == target) return i;\n}",
          language: "cpp",
          takeaways: [
            "We always measure the worst-case scenario for safety.",
            "Avoid accidental O(N^2) nested loops when processing large datasets."
          ]
        }
      ]
    },
    quiz: {
      question: "What is the time complexity of looking up an array item by its direct index `arr[4]`?",
      options: ["O(1) Constant time", "O(N) Linear time", "O(N^2) Quadratic time", "O(log N)"],
      correctAnswer: "O(1) Constant time",
      explanation: "Arrays store elements side-by-side in memory, allowing direct index calculation in instant O(1) time."
    }
  },
  {
    id: "dsa-linked-lists",
    title: "Linked Lists & Pointer Connections",
    category: "Data Structures & Algorithms",
    description: "Build dynamic lists where each element points to the next, enabling instant insertions.",
    route: "/lessons/dsa-linked-lists",
    order: 2,
    duration: "45 min deep-dive & terminal",
    difficulty: "Intermediate",
    keySkills: ["Nodes & Pointers", "Traversal", "Insertion & Deletion", "Reversing a List"],
    trackId: "dsa-mastery",
    content: {
      overview: "Unlike arrays which need a continuous block of memory, a linked list is like a treasure hunt: each clue (node) points to where the next clue is hidden.",
      sections: [
        {
          title: "Anatomy of a Node",
          explanation: "Each node holds two things: the data value and a pointer to the next node in line.",
          codeSnippet: "struct Node {\n    int data;\n    struct Node *next; // Points to the next node\n};\n\n// Traversal\nstruct Node *current = head;\nwhile (current != NULL) {\n    printf(\"%d -> \", current->data);\n    current = current->next;\n}",
          language: "c",
          takeaways: [
            "Linked lists can grow and shrink dynamically without reallocation.",
            "To reach the 10th item, you must walk through items 1 through 9."
          ]
        }
      ]
    },
    quiz: {
      question: "What does the `next` pointer of the final node in a singly linked list point to?",
      options: ["The head node", "NULL (nothing)", "Itself", "Random memory"],
      correctAnswer: "NULL (nothing)",
      explanation: "The last node's next pointer is set to NULL to indicate the end of the list."
    }
  },
  {
    id: "dsa-stacks-queues",
    title: "Stacks (LIFO) & Queues (FIFO)",
    category: "Data Structures & Algorithms",
    description: "Understand Undo/Redo buttons, function call stacks, and ticket counter queues.",
    route: "/lessons/dsa-stacks-queues",
    order: 3,
    duration: "45 min interactive masterclass",
    difficulty: "Intermediate",
    keySkills: ["Stack (push, pop, peek)", "Queue (enqueue, dequeue)", "LIFO vs FIFO", "Valid Parentheses"],
    trackId: "dsa-mastery",
    content: {
      overview: "A stack is like a stack of cafeteria plates (last plate placed is first plate taken: LIFO). A queue is like a movie ticket line (first person in line is served first: FIFO).",
      sections: [
        {
          title: "Real World Use Cases",
          explanation: "Browser back buttons and text editor 'Undo' use Stacks. Printer print jobs and video buffering use Queues.",
          codeSnippet: "// Stack: Last-In, First-Out (LIFO)\nstack.push(10); // [10]\nstack.push(20); // [10, 20]\nint top = stack.pop(); // top is 20!\n\n// Queue: First-In, First-Out (FIFO)\nqueue.push(\"Job 1\");\nqueue.push(\"Job 2\");\nstring nextJob = queue.pop(); // \"Job 1\"",
          language: "cpp",
          takeaways: [
            "Stack = LIFO (Last In First Out).",
            "Queue = FIFO (First In First Out)."
          ]
        }
      ]
    },
    quiz: {
      question: "Which data structure models the 'Undo' feature in code editors?",
      options: ["Queue", "Stack", "Binary Tree", "Hash Map"],
      correctAnswer: "Stack",
      explanation: "Undo restores the most recently executed action first, which is the classic LIFO behavior of a Stack."
    }
  },
  {
    id: "dsa-trees-bst",
    title: "Binary Trees & Binary Search Trees",
    category: "Data Structures & Algorithms",
    description: "Organize hierarchical data with trees and achieve lightning fast O(log N) searches with BSTs.",
    route: "/lessons/dsa-trees-bst",
    order: 4,
    duration: "48 min comprehensive lab",
    difficulty: "Intermediate",
    keySkills: ["Root, Left & Right Children", "BST Search Property", "Tree Traversals", "O(log N) Search"],
    trackId: "dsa-mastery",
    content: {
      overview: "Trees represent hierarchy — like folders inside folders on your computer or company org charts.",
      sections: [
        {
          title: "The Golden Rule of Binary Search Trees (BST)",
          explanation: "In a BST: every value to the left of a node is smaller, and every value to the right is larger. This lets you cut search space in half at every step!",
          codeSnippet: "// Search in a BST in O(log N) time\nTreeNode* searchBST(TreeNode* root, int val) {\n    if (root == NULL || root->val == val) return root;\n    if (val < root->val) return searchBST(root->left, val);  // Go left\n    return searchBST(root->right, val);                     // Go right\n}",
          language: "cpp",
          takeaways: [
            "In a BST, left child < parent < right child.",
            "In-order traversal visits all nodes in sorted order."
          ]
        }
      ]
    },
    quiz: {
      question: "In a Binary Search Tree (BST), where are values smaller than the root stored?",
      options: ["In the right subtree", "In the left subtree", "At the root itself", "In a separate array"],
      correctAnswer: "In the left subtree",
      explanation: "The BST invariant requires all values smaller than a node to reside in its left subtree."
    }
  },
  {
    id: "dsa-dynamic-programming",
    title: "Dynamic Programming Masterclass: Knapsack & Memoization",
    category: "Data Structures & Algorithms",
    description: "Break complex exponential problems into O(N) overlapping subproblems using memoization and tabulation.",
    route: "/lessons/dsa-dynamic-programming",
    order: 5,
    duration: "55 min advanced lab",
    difficulty: "Advanced",
    keySkills: ["Memoization (Top-Down)", "Tabulation (Bottom-Up)", "0/1 Knapsack Pattern", "State Transitions", "Space Optimization"],
    trackId: "dsa-mastery",
    content: {
      overview: "Dynamic Programming (DP) is the single most tested topic in Tier-1 technical interviews and FAANG online assessments. DP is simply smart recursion with a memory table to never solve the same subproblem twice.",
      sections: [
        {
          title: "1. The 4-Step Framework for Cracking Any DP Problem",
          explanation: "1. Identify: Overlapping subproblems + optimal substructure (e.g. min coins, max profit, total ways).\n2. State: Define what `dp[i]` represents in plain English.\n3. Recurrence: Write the mathematical transition formula.\n4. Base Case & Direction: Determine where the computation starts (e.g. `dp[0] = 0`).",
          codeSnippet: "// 0/1 Knapsack Tabulation in C++\nint knapSack(int W, int wt[], int val[], int n) {\n    vector<vector<int>> dp(n + 1, vector<int>(W + 1, 0));\n    \n    for (int i = 1; i <= n; i++) {\n        for (int w = 1; w <= W; w++) {\n            if (wt[i - 1] <= w) {\n                // Choice: Take the item OR Leave it\n                dp[i][w] = max(val[i - 1] + dp[i - 1][w - wt[i - 1]], dp[i - 1][w]);\n            } else {\n                dp[i][w] = dp[i - 1][w];\n            }\n        }\n    }\n    return dp[n][W];\n}",
          language: "cpp",
          takeaways: [
            "Top-down recursion + memoization is easier to formulate; bottom-up tabulation avoids stack overflow.",
            "Always inspect if state can be compressed from 2D to 1D to reduce space complexity to O(W)."
          ]
        }
      ]
    },
    quiz: {
      question: "What two properties must a computational problem exhibit to be solvable via Dynamic Programming?",
      options: [
        "Sorted input and constant space",
        "Optimal substructure and overlapping subproblems",
        "Deterministic finite state and memory paging",
        "Binary split and monotonic arrays"
      ],
      correctAnswer: "Optimal substructure and overlapping subproblems",
      explanation: "DP applies when an optimal global solution can be constructed from optimal sub-solutions (optimal substructure) and those subproblems repeat many times (overlapping subproblems)."
    }
  },
  {
    id: "dsa-graph-algorithms",
    title: "Graph Theory, BFS, DFS & Dijkstra's Shortest Path",
    category: "Data Structures & Algorithms",
    description: "Traverse non-linear graphs, detect cycles, perform topological sorting, and find single-source shortest paths.",
    route: "/lessons/dsa-graph-algorithms",
    order: 6,
    duration: "52 min advanced lab",
    difficulty: "Advanced",
    keySkills: ["Adjacency List", "Breadth-First Search (BFS)", "Depth-First Search (DFS)", "Dijkstra's Algorithm", "Topological Sort"],
    trackId: "dsa-mastery",
    content: {
      overview: "Graphs represent real-world networks: social connections (LinkedIn), road maps (Google Maps), internet routing (BGP), and package build dependencies (npm/pip).",
      sections: [
        {
          title: "1. Graph Traversals: BFS vs DFS When to Use Which",
          explanation: "• BFS (Queue): Guarantees the shortest path in unweighted graphs (e.g. minimum hops between two users).\n• DFS (Stack/Recursion): Ideal for backtracking, cycle detection, connected components, and topological sorting (dependency graphs).",
          codeSnippet: "// Dijkstra's Shortest Path using Min-Heap Priority Queue\ntypedef pair<int, int> pii; // {distance, vertex}\nvector<int> dijkstra(int V, vector<vector<pii>>& adj, int src) {\n    priority_queue<pii, vector<pii>, greater<pii>> pq;\n    vector<int> dist(V, 1e9);\n    \n    dist[src] = 0;\n    pq.push({0, src});\n    \n    while (!pq.empty()) {\n        auto [d, u] = pq.top();\n        pq.pop();\n        if (d > dist[u]) continue;\n        \n        for (auto [v, weight] : adj[u]) {\n            if (dist[u] + weight < dist[v]) {\n                dist[v] = dist[u] + weight;\n                pq.push({dist[v], v});\n            }\n        }\n    }\n    return dist;\n}",
          language: "cpp",
          takeaways: [
            "Dijkstra's algorithm achieves O((V + E) log V) with a binary heap on non-negative weights.",
            "Topological Sort uses Kahn's in-degree algorithm (BFS) or reverse post-order DFS on DAGs."
          ]
        }
      ]
    },
    quiz: {
      question: "Which data structure powers Dijkstra's shortest path algorithm to achieve O((V + E) log V) complexity?",
      options: ["LIFO Stack", "Min-Heap (Priority Queue)", "Doubly Linked List", "Circular Queue"],
      correctAnswer: "Min-Heap (Priority Queue)",
      explanation: "A Min-Heap allows extracting the unvisited vertex with the minimum tentative distance in O(log V) time."
    }
  },
  {
    id: "dsa-heaps-greedy",
    title: "Heaps, Priority Queues & Greedy Scheduling",
    category: "Data Structures & Algorithms",
    description: "Solve Top-K frequent elements, merge K sorted streams, and design greedy interval schedulers.",
    route: "/lessons/dsa-heaps-greedy",
    order: 7,
    duration: "48 min deep-dive",
    difficulty: "Advanced",
    keySkills: ["Min-Heap / Max-Heap", "Top-K Elements Pattern", "Merge K Sorted Lists", "Greedy Choice Property", "Interval Scheduling"],
    trackId: "dsa-mastery",
    content: {
      overview: "Heaps maintain the maximum or minimum element in O(1) peek and O(log N) insert/delete. When paired with Greedy strategies, they solve high-throughput stream problems with minimal memory.",
      sections: [
        {
          title: "1. The Top-K Frequent Pattern",
          explanation: "Instead of sorting the entire array in O(N log N), maintain a Min-Heap of size K. Discard smaller elements as you stream, leaving the top K largest in O(N log K) time.",
          codeSnippet: "// Top K Frequent Elements in C++ STL\nvector<int> topKFrequent(vector<int>& nums, int k) {\n    unordered_map<int, int> count;\n    for (int n : nums) count[n]++;\n    \n    // Min-heap stores {frequency, num}\n    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;\n    for (auto& [num, freq] : count) {\n        pq.push({freq, num});\n        if (pq.size() > k) pq.pop(); // Keep only top K\n    }\n    \n    vector<int> result;\n    while (!pq.empty()) { result.push_back(pq.top().second); pq.pop(); }\n    return result;\n}",
          language: "cpp",
          takeaways: [
            "A Min-Heap of size K maintains the K largest elements.",
            "Greedy algorithms require proving the 'Greedy Choice Property' (locally optimal choice yields global optimum)."
          ]
        }
      ]
    },
    quiz: {
      question: "What is the time complexity to find the K-th largest element in an array of size N using a Min-Heap of size K?",
      options: ["O(N log N)", "O(N log K)", "O(K log N)", "O(N * K)"],
      correctAnswer: "O(N log K)",
      explanation: "Iterating through N elements and doing at most log K heap operations takes O(N log K), which is much faster than sorting when K << N."
    }
  },
  {
    id: "dsa-tries-advanced-trees",
    title: "Tries (Prefix Trees) & Advanced Range Query Trees",
    category: "Data Structures & Algorithms",
    description: "Build fast prefix search engines (autocomplete) with Tries, and understand Segment Trees & Lowest Common Ancestor (LCA).",
    route: "/lessons/dsa-tries-advanced-trees",
    order: 8,
    duration: "50 min comprehensive lab",
    difficulty: "Advanced",
    keySkills: ["Trie (Prefix Tree)", "Autocomplete Search", "Lowest Common Ancestor (LCA)", "Binary Lifting", "Segment Trees"],
    trackId: "dsa-mastery",
    content: {
      overview: "Tries are tree data structures optimized for string retrieval. They power search bar autocomplete, spellcheckers, IP routing tables, and genome sequence analysis in O(L) time where L is word length.",
      sections: [
        {
          title: "1. Anatomy of a Trie Node",
          explanation: "Each node contains up to 26 children pointers (one for each letter) and a boolean flag `isEndOfWord`. Inserting and searching takes time strictly proportional to word length, independent of dictionary size!",
          codeSnippet: "class Trie {\n    struct Node {\n        Node* children[26] = {};\n        bool isWord = false;\n    } root;\npublic:\n    void insert(string word) {\n        Node* curr = &root;\n        for (char c : word) {\n            int idx = c - 'a';\n            if (!curr->children[idx]) curr->children[idx] = new Node();\n            curr = curr->children[idx];\n        }\n        curr->isWord = true;\n    }\n    bool startsWith(string prefix) {\n        Node* curr = &root;\n        for (char c : prefix) {\n            int idx = c - 'a';\n            if (!curr->children[idx]) return false;\n            curr = curr->children[idx];\n        }\n        return true;\n    }\n};",
          language: "cpp",
          takeaways: [
            "Trie search is O(L) where L is string length, making it far superior to scanning millions of strings.",
            "Lowest Common Ancestor (LCA) in binary trees can be computed in O(H) recursively or O(log N) with binary lifting."
          ]
        }
      ]
    },
    quiz: {
      question: "What is the time complexity to check if a word of length L exists in a Trie containing N total words?",
      options: ["O(N * L)", "O(log N)", "O(L)", "O(N)"],
      correctAnswer: "O(L)",
      explanation: "Trie traversal only takes steps equal to the number of characters in the word (L), completely independent of how many words (N) exist in the dictionary."
    }
  }
];

// Track 2.2: Object-Oriented Programming (Year 2)
const oopLessons: CurriculumLesson[] = [
  {
    id: "oop-classes-objects",
    title: "Classes, Objects & Encapsulation",
    category: "Object-Oriented Programming",
    description: "Design real-world entities using blueprints (classes) and instances (objects) in Java and C++.",
    route: "/lessons/oop-classes-objects",
    order: 1,
    duration: "42 min practice & mastery",
    difficulty: "Beginner",
    keySkills: ["Classes & Blueprints", "Objects & State", "Constructors", "Encapsulation (getters/setters)"],
    trackId: "oop-mastery",
    content: {
      overview: "A class is an architectural blueprint (like a blueprint for a car), and an object is the actual car built from that blueprint.",
      sections: [
        {
          title: "Encapsulation: Protecting Sensitive Data",
          explanation: "Make fields `private` and provide public getters/setters so invalid data (like negative bank balances) cannot be injected.",
          codeSnippet: "public class BankAccount {\n    private double balance; // Private data\n\n    public BankAccount(double initialBalance) {\n        this.balance = initialBalance;\n    }\n\n    public void deposit(double amount) {\n        if (amount > 0) balance += amount;\n    }\n\n    public double getBalance() { return balance; }\n}",
          language: "java",
          takeaways: [
            "Class = Blueprint, Object = Real instance in memory.",
            "Encapsulation hides internal data and prevents unauthorized modifications."
          ]
        }
      ]
    },
    quiz: {
      question: "What is the primary purpose of encapsulation in OOP?",
      options: [
        "To make code run without a CPU",
        "To hide internal state and protect data through authorized methods",
        "To make all variables globally accessible",
        "To delete unused code"
      ],
      correctAnswer: "To hide internal state and protect data through authorized methods",
      explanation: "Encapsulation binds data and code together, keeping variables private and exposing safe public methods."
    }
  },
  {
    id: "oop-inheritance-polymorphism",
    title: "Inheritance & Polymorphism",
    category: "Object-Oriented Programming",
    description: "Reuse code across parent and child classes, and let different objects respond to the same action in unique ways.",
    route: "/lessons/oop-inheritance-polymorphism",
    order: 2,
    duration: "45 min interactive masterclass",
    difficulty: "Intermediate",
    keySkills: ["Inheritance (extends)", "Method Overriding", "Polymorphism", "Abstract Classes & Interfaces"],
    trackId: "oop-mastery",
    content: {
      overview: "Inheritance models 'is-a' relationships (a Car is a Vehicle), while Polymorphism ('many forms') lets different objects respond to the same command.",
      sections: [
        {
          title: "Polymorphism in Action",
          explanation: "Both Dogs and Cats are Animals, but each makes a different sound when asked to speak.",
          codeSnippet: "class Animal {\n    void speak() { System.out.println(\"Some sound\"); }\n}\n\nclass Dog extends Animal {\n    @Override\n    void speak() { System.out.println(\"Woof! 🐶\"); }\n}\n\n// Polymorphic call:\nAnimal myPet = new Dog();\nmyPet.speak(); // Prints: Woof! 🐶",
          language: "java",
          takeaways: [
            "Child classes inherit features from parent classes, avoiding duplicate code.",
            "Polymorphism lets you write flexible code that works with any subclass."
          ]
        }
      ]
    },
    quiz: {
      question: "What OOP feature allows a subclass to provide a specific implementation of a method defined in its parent class?",
      options: ["Encapsulation", "Method Overriding", "Variable Scoping", "Memory Allocation"],
      correctAnswer: "Method Overriding",
      explanation: "Method overriding lets a child class supply its own specialized behavior for an inherited method."
    }
  },
  {
    id: "oop-solid-principles",
    title: "SOLID Principles & Clean Architectural Design",
    category: "Object-Oriented Programming",
    description: "Write production-grade, maintainable code using Single Responsibility, Open/Closed, Liskov, Interface Segregation, and Dependency Inversion.",
    route: "/lessons/oop-solid-principles",
    order: 3,
    duration: "50 min advanced masterclass",
    difficulty: "Advanced",
    keySkills: ["Single Responsibility (SRP)", "Open/Closed (OCP)", "Liskov Substitution (LSP)", "Interface Segregation (ISP)", "Dependency Inversion (DIP)"],
    trackId: "oop-mastery",
    content: {
      overview: "The SOLID principles are the gold standard for software engineering design. They transform fragile spaghetti code into modular, decoupled systems that can scale across engineering teams.",
      sections: [
        {
          title: "1. The Open/Closed Principle (OCP) in Action",
          explanation: "Software entities should be open for extension, but closed for modification. Rather than adding dozens of if-else statements for new payment types, define a common interface.",
          codeSnippet: "// OCP Compliant Payment Engine in Java\npublic interface PaymentMethod {\n    void pay(double amount);\n}\n\npublic class UPIPayment implements PaymentMethod {\n    public void pay(double amount) { System.out.println(\"Paid via UPI: ₹\" + amount); }\n}\n\npublic class CardPayment implements PaymentMethod {\n    public void pay(double amount) { System.out.println(\"Paid via Card: ₹\" + amount); }\n}\n\n// Adding CryptoPayment requires ZERO edits to PaymentProcessor!\npublic class PaymentProcessor {\n    public void process(PaymentMethod method, double amount) {\n        method.pay(amount);\n    }\n}",
          language: "java",
          takeaways: [
            "Depend upon abstractions (interfaces), not concrete implementations.",
            "Subclasses must be substitutable for their base types without altering correctness (Liskov)."
          ]
        }
      ]
    },
    quiz: {
      question: "Which SOLID principle is violated when modifying an existing class directly every time a new feature is added?",
      options: [
        "Single Responsibility Principle",
        "Open/Closed Principle",
        "Interface Segregation Principle",
        "Liskov Substitution Principle"
      ],
      correctAnswer: "Open/Closed Principle",
      explanation: "The Open/Closed Principle states classes should be open for extension (via polymorphism/interfaces) but closed for modification of existing source code."
    }
  },
  {
    id: "oop-design-patterns",
    title: "Gang of Four (GoF) Design Patterns in Production",
    category: "Object-Oriented Programming",
    description: "Implement Factory, Observer, Strategy, and Decorator patterns solving real-world enterprise architecture challenges.",
    route: "/lessons/oop-design-patterns",
    order: 4,
    duration: "52 min advanced lab",
    difficulty: "Advanced",
    keySkills: ["Factory Pattern", "Observer Pattern", "Strategy Pattern", "Decorator Pattern", "Singleton Thread Safety"],
    trackId: "oop-mastery",
    content: {
      overview: "Design Patterns are battle-tested solutions to recurring software architecture problems. Senior engineers use them to construct decoupled microservices, event listeners, and dynamic algorithms.",
      sections: [
        {
          title: "1. The Observer Pattern (Publish-Subscribe)",
          explanation: "When an event occurs (e.g. order placed), multiple subscribers (SMS, Email, Inventory, Analytics) are notified automatically without hardcoded coupling.",
          codeSnippet: "// Observer Pattern in Java\ninterface OrderObserver {\n    void onOrderPlaced(String orderId);\n}\n\nclass EmailService implements OrderObserver {\n    public void onOrderPlaced(String orderId) { System.out.println(\"Email dispatched for \" + orderId); }\n}\n\nclass OrderManager {\n    private List<OrderObserver> observers = new ArrayList<>();\n    public void attach(OrderObserver o) { observers.add(o); }\n    public void placeOrder(String orderId) {\n        for (OrderObserver o : observers) o.onOrderPlaced(orderId);\n    }\n}",
          language: "java",
          takeaways: [
            "Use Factory to decouple object creation from execution logic.",
            "Use Strategy to swap algorithms at runtime (e.g. sorting strategies, tax calculations)."
          ]
        }
      ]
    },
    quiz: {
      question: "Which design pattern is best suited for notifying multiple independent services when a user profile updates?",
      options: ["Factory Pattern", "Observer Pattern", "Singleton Pattern", "Adapter Pattern"],
      correctAnswer: "Observer Pattern",
      explanation: "The Observer pattern establishes a one-to-many dependency so that when the subject changes state, all dependent observers are notified automatically."
    }
  }
];

// Track 2.3: Database Management Systems & SQL (Year 2)
const dbmsLessons: CurriculumLesson[] = [
  {
    id: "dbms-sql-foundations",
    title: "Relational Databases & SQL Queries",
    category: "Database Management",
    description: "Write SQL SELECT queries, filter records with WHERE, and organize data into clean relational tables.",
    route: "/lessons/dbms-sql-foundations",
    order: 1,
    duration: "42 min practice & mastery",
    difficulty: "Beginner",
    keySkills: ["SQL SELECT", "WHERE & ORDER BY", "Primary Keys", "Table Schema"],
    trackId: "dbms-foundations",
    content: {
      overview: "Databases store the world's information — user logins, Instagram photos, banking balances, and exam grades.",
      sections: [
        {
          title: "The Standard SQL SELECT Query",
          explanation: "SQL (Structured Query Language) is like asking questions to a well-organized spreadsheet table.",
          codeSnippet: "-- Find all 2nd year CSE students with GPA above 8.5\nSELECT student_id, name, gpa\nFROM students\nWHERE branch = 'CSE' AND year = 2 AND gpa >= 8.5\nORDER BY gpa DESC;",
          language: "sql",
          takeaways: [
            "Tables have columns (attributes) and rows (records).",
            "A Primary Key uniquely identifies each row (like student roll number)."
          ]
        }
      ]
    },
    quiz: {
      question: "Which SQL clause is used to filter records based on specific criteria?",
      options: ["ORDER BY", "WHERE", "GROUP BY", "LIMIT"],
      correctAnswer: "WHERE",
      explanation: "The WHERE clause filters rows to include only those meeting the specified condition."
    }
  },
  {
    id: "dbms-joins-acid",
    title: "SQL JOINs, Transactions & ACID Properties",
    category: "Database Management",
    description: "Connect related tables with INNER and LEFT JOINs, and ensure bank-grade reliability with ACID transactions.",
    route: "/lessons/dbms-joins-acid",
    order: 2,
    duration: "45 min interactive masterclass",
    difficulty: "Intermediate",
    keySkills: ["INNER & LEFT JOIN", "Foreign Keys", "ACID Properties", "Database Indexing"],
    trackId: "dbms-foundations",
    content: {
      overview: "In real applications, data is split into multiple tables (e.g. Users and Orders). JOINs bring them together, and ACID guarantees safety.",
      sections: [
        {
          title: "Connecting Tables with JOINs",
          explanation: "Use Foreign Keys to connect tables without repeating user names in every single order row.",
          codeSnippet: "-- Connect Students table with their Course Enrollments\nSELECT students.name, courses.title, enrollments.grade\nFROM students\nINNER JOIN enrollments ON students.id = enrollments.student_id\nINNER JOIN courses ON enrollments.course_id = courses.id;",
          language: "sql",
          takeaways: [
            "INNER JOIN matches rows that exist in both tables.",
            "ACID: Atomicity (all or nothing), Consistency, Isolation, Durability."
          ]
        }
      ]
    },
    quiz: {
      question: "In database ACID properties, what does Atomicity guarantee during a bank money transfer?",
      options: [
        "The transfer happens infinitely fast",
        "Either both debit and credit succeed together, or the entire transaction is rolled back",
        "The database runs on atomic energy",
        "Data is encrypted"
      ],
      correctAnswer: "Either both debit and credit succeed together, or the entire transaction is rolled back",
      explanation: "Atomicity ensures all steps of a transaction succeed as a single unit, or nothing changes."
    }
  },
  {
    id: "dbms-indexing-optimization",
    title: "B+ Tree Indexing & Query Execution Plans",
    category: "Database Management",
    description: "Inspect query plans with EXPLAIN ANALYZE, optimize B+ Tree composite indexes, and eliminate slow table scans.",
    route: "/lessons/dbms-indexing-optimization",
    order: 3,
    duration: "48 min advanced lab",
    difficulty: "Advanced",
    keySkills: ["B+ Tree Indexes", "EXPLAIN & ANALYZE", "Composite Index Column Order", "Covering Indexes", "N+1 Query Resolution"],
    trackId: "dbms-foundations",
    content: {
      overview: "Without indexes, a database must scan every single row on disk (Full Table Scan O(N)). B+ Tree indexes reduce queries to O(log N) disk reads, keeping high-traffic applications snappy.",
      sections: [
        {
          title: "1. The Leftmost Prefix Rule for Composite Indexes",
          explanation: "When you create an index on `(branch, year, gpa)`, the database can use it for queries filtering by `branch`, or `branch AND year`, but NOT for queries filtering by `year` alone!",
          codeSnippet: "-- Create composite index for student lookup\nCREATE INDEX idx_student_lookup ON students(branch, year, gpa);\n\n-- Inspect query execution plan in PostgreSQL / MySQL\nEXPLAIN ANALYZE\nSELECT name, gpa FROM students \nWHERE branch = 'CSE' AND year = 3 \nORDER BY gpa DESC;",
          language: "sql",
          takeaways: [
            "Always index columns used in WHERE, JOIN, and ORDER BY clauses.",
            "A Covering Index contains all columns requested by SELECT, avoiding secondary table heap lookups entirely."
          ]
        }
      ]
    },
    quiz: {
      question: "If an index is created on columns `(A, B, C)`, which query CANNOT take advantage of this index?",
      options: [
        "WHERE A = 5 AND B = 10",
        "WHERE A = 5",
        "WHERE B = 10 AND C = 20",
        "WHERE A = 5 AND B = 10 AND C = 20"
      ],
      correctAnswer: "WHERE B = 10 AND C = 20",
      explanation: "The leftmost prefix rule requires the leading column (A) to be present in the query condition to use the composite index."
    }
  },
  {
    id: "dbms-transactions-concurrency",
    title: "Transactions, MVCC & Isolation Levels",
    category: "Database Management",
    description: "Master ACID internals, Multi-Version Concurrency Control (MVCC), Write-Ahead Logs (WAL), and Isolation Levels.",
    route: "/lessons/dbms-transactions-concurrency",
    order: 4,
    duration: "50 min advanced lab",
    difficulty: "Advanced",
    keySkills: ["Isolation Levels", "Dirty Reads vs Phantom Reads", "MVCC (Multi-Version Concurrency)", "WAL (Write-Ahead Logging)", "Pessimistic vs Optimistic Locking"],
    trackId: "dbms-foundations",
    content: {
      overview: "When thousands of users execute bank transfers and buy concert tickets simultaneously, the database must prevent race conditions without freezing all concurrent traffic.",
      sections: [
        {
          title: "1. The 4 ANSI SQL Isolation Levels",
          explanation: "1. Read Uncommitted: Allows dirty reads (reading uncommitted changes).\n2. Read Committed: Default in PostgreSQL/Oracle; only committed data is visible.\n3. Repeatable Read: Prevents non-repeatable reads during transaction.\n4. Serializable: Strict sequential execution, eliminating phantom reads using lock ranges.",
          codeSnippet: "-- Explicit Transaction with Row-Level Lock\nBEGIN;\nSELECT balance FROM accounts WHERE id = 101 FOR UPDATE; -- Pessimistic Lock\nUPDATE accounts SET balance = balance - 500 WHERE id = 101;\nUPDATE accounts SET balance = balance + 500 WHERE id = 202;\nCOMMIT;",
          language: "sql",
          takeaways: [
            "PostgreSQL uses MVCC (snapshots) so readers never block writers and writers never block readers.",
            "Use optimistic locking with version numbers for high-throughput, low-contention architectures."
          ]
        }
      ]
    },
    quiz: {
      question: "Which isolation level prevents Dirty Reads and Non-Repeatable Reads, but may still allow Phantom Reads?",
      options: ["Read Uncommitted", "Read Committed", "Repeatable Read", "Serializable"],
      correctAnswer: "Repeatable Read",
      explanation: "Repeatable Read guarantees that any row read within a transaction remains identical across multiple reads, but new rows inserted by other transactions (phantoms) could appear unless Serializable is used."
    }
  }
];

// Track 2.4: Operating Systems & Computer Networks (Year 2)
const osNetworksLessons: CurriculumLesson[] = [
  {
    id: "os-processes-threads",
    title: "Operating Systems: Processes, Threads & Memory",
    category: "Operating Systems",
    description: "Understand how your OS runs hundreds of programs at once with multitasking, CPU scheduling, and RAM paging.",
    route: "/lessons/os-processes-threads",
    order: 1,
    duration: "45 min interactive masterclass",
    difficulty: "Intermediate",
    keySkills: ["Processes vs Threads", "Context Switching", "Virtual Memory & Paging", "Deadlocks"],
    trackId: "os-networks",
    content: {
      overview: "The Operating System is the master conductor of your computer hardware, making sure apps don't crash into each other.",
      sections: [
        {
          title: "Process vs Thread",
          explanation: "A Process is an independent running program with its own memory space (like Chrome). A Thread is a lightweight worker inside that process (like a single browser tab).",
          codeSnippet: "// Process: Independent memory, higher overhead\n// Thread: Shared memory inside same process, fast communication\n\n// OS schedules threads across multiple CPU cores for parallel execution",
          language: "c",
          takeaways: [
            "Processes are isolated from each other for security and stability.",
            "Virtual memory lets your computer run large programs even with limited RAM."
          ]
        }
      ]
    },
    quiz: {
      question: "What is the key difference between a process and a thread?",
      options: [
        "Processes have no code",
        "Threads within the same process share memory space, whereas separate processes have isolated memory",
        "Processes can only run on mobile phones",
        "Threads cannot run on the CPU"
      ],
      correctAnswer: "Threads within the same process share memory space, whereas separate processes have isolated memory",
      explanation: "Threads are lightweight units of execution that share the address space of their parent process."
    }
  },
  {
    id: "cn-tcp-ip-http",
    title: "Computer Networks: TCP/IP, DNS & HTTP/HTTPS",
    category: "Computer Networks",
    description: "Follow the journey of an HTTP request from your browser to a web server across the global internet.",
    route: "/lessons/cn-tcp-ip-http",
    order: 2,
    duration: "45 min interactive masterclass",
    difficulty: "Intermediate",
    keySkills: ["Client-Server Model", "DNS Resolution", "TCP 3-Way Handshake", "HTTP Methods (GET, POST)"],
    trackId: "os-networks",
    content: {
      overview: "When you type google.com into your browser, a coordinated ballet of protocols fetches the page in less than 200 milliseconds.",
      sections: [
        {
          title: "The Step-by-Step Web Request",
          explanation: "1. DNS translates domain names into IP addresses. 2. TCP sets up a reliable connection via the 3-Way Handshake (SYN -> SYN-ACK -> ACK). 3. HTTP sends the GET request and receives HTML/JSON.",
          codeSnippet: "# Client makes HTTP GET request:\nGET /api/curriculum HTTP/1.1\nHost: campusgrow.in\n\n# Server responds with status and data:\nHTTP/1.1 200 OK\nContent-Type: application/json\n\n{\"status\": \"success\", \"lessons\": 10}",
          language: "http",
          takeaways: [
            "TCP ensures 100% reliable data delivery with retransmissions.",
            "HTTPS adds TLS encryption so passwords and messages cannot be intercepted."
          ]
        }
      ]
    },
    quiz: {
      question: "What service translates human-friendly domain names like 'campusgrow.in' into numerical IP addresses?",
      options: ["HTTP", "DNS (Domain Name System)", "FTP", "DHCP"],
      correctAnswer: "DNS (Domain Name System)",
      explanation: "DNS acts as the phonebook of the internet, mapping domain names to IP addresses."
    }
  },
  {
    id: "os-concurrency-synchronization",
    title: "Concurrency, Mutexes, Semaphores & Deadlocks",
    category: "Operating Systems",
    description: "Prevent race conditions in multi-threaded programs using Mutex locks, Counting Semaphores, and Banker's Deadlock Avoidance.",
    route: "/lessons/os-concurrency-synchronization",
    order: 3,
    duration: "52 min advanced lab",
    difficulty: "Advanced",
    keySkills: ["Critical Sections", "Mutex (Mutual Exclusion)", "Counting Semaphores", "Producer-Consumer Problem", "Deadlock 4 Coffman Conditions"],
    trackId: "os-networks",
    content: {
      overview: "When multiple CPU threads access the same memory variables concurrently, unsynchronized writes produce catastrophic non-deterministic bugs (like withdrawing the same bank balance twice).",
      sections: [
        {
          title: "1. The Producer-Consumer Queue with Semaphores in C/POSIX",
          explanation: "Use two semaphores (`empty` and `full`) plus a `mutex` lock to coordinate safe item handoffs between threads without spinning or busy-waiting.",
          codeSnippet: "#include <pthread.h>\n#include <semaphore.h>\n\nsem_t emptySlots, fullSlots;\npthread_mutex_t queueMutex;\n\nvoid* producer(void* arg) {\n    while (1) {\n        int item = produce_item();\n        sem_wait(&emptySlots);             // Wait if buffer full\n        pthread_mutex_lock(&queueMutex);   // Enter critical section\n        buffer_insert(item);\n        pthread_mutex_unlock(&queueMutex); // Exit critical section\n        sem_post(&fullSlots);              // Notify consumer\n    }\n}",
          language: "c",
          takeaways: [
            "A Deadlock occurs only when 4 conditions hold simultaneously: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait.",
            "Always acquire nested locks in a strictly defined global order to eliminate Circular Wait."
          ]
        }
      ]
    },
    quiz: {
      question: "Which Coffman condition is broken to prevent deadlocks when locks are always acquired in a consistent numerical order?",
      options: ["Mutual Exclusion", "Circular Wait", "No Preemption", "Hold and Wait"],
      correctAnswer: "Circular Wait",
      explanation: "Acquiring locks in a strict global hierarchy makes it mathematically impossible to form a circular cycle of dependencies."
    }
  },
  {
    id: "networks-protocols-internals",
    title: "High-Throughput Networking: TLS 1.3, HTTP/3 & WebSockets vs gRPC",
    category: "Computer Networks",
    description: "Deep-dive into TLS 1.3 0-RTT handshakes, HTTP/2 multiplexing, QUIC/UDP HTTP/3, and WebSockets vs gRPC streaming architectures.",
    route: "/lessons/networks-protocols-internals",
    order: 4,
    duration: "50 min advanced lab",
    difficulty: "Advanced",
    keySkills: ["TLS 1.3 Handshake", "TCP Sliding Window & Congestion Control", "HTTP/2 Stream Multiplexing", "QUIC & HTTP/3", "gRPC Protocol Buffers"],
    trackId: "os-networks",
    content: {
      overview: "Modern distributed systems communicate across microservices in sub-milliseconds. Understanding transport layer protocols, multiplexing, and binary serialization is vital for backend architects.",
      sections: [
        {
          title: "1. HTTP/1.1 vs HTTP/2 vs HTTP/3 (QUIC)",
          explanation: "• HTTP/1.1 suffers from Head-of-Line (HoL) blocking on single TCP streams.\n• HTTP/2 introduces binary frame multiplexing over one TCP connection.\n• HTTP/3 runs on QUIC (UDP), solving TCP packet loss HoL blocking and enabling 0-RTT connection resumption.",
          codeSnippet: "// Protocol Performance Matrix:\n// Protocol   | Transport | Multiplexing | HoL Blocking | Serialization\n// HTTP/1.1  | TCP       | No (Pipelined)| Yes (App)    | Text (JSON)\n// HTTP/2    | TCP       | Yes (Streams) | Yes (TCP)    | Binary Frames\n// HTTP/3    | QUIC(UDP) | Yes (Native)  | NO           | Binary Frames\n// gRPC      | HTTP/2    | Yes (Native)  | Minor        | Protobuf (Fast)",
          language: "ts",
          takeaways: [
            "Use gRPC (Protobuf) for internal microservice communication for 7x lower CPU overhead than JSON.",
            "WebSockets provide bidirectional, persistent TCP channels ideal for collaborative apps and chat."
          ]
        }
      ]
    },
    quiz: {
      question: "Why does HTTP/3 operate over UDP (QUIC) instead of standard TCP?",
      options: [
        "Because UDP disables encryption completely",
        "To eliminate TCP-level head-of-line blocking when a single packet is dropped",
        "Because TCP cannot transmit audio or video",
        "To allow browsers to bypass firewalls"
      ],
      correctAnswer: "To eliminate TCP-level head-of-line blocking when a single packet is dropped",
      explanation: "In TCP, if one packet in a stream is lost, all multiplexed streams halt until retransmission. QUIC over UDP isolates each stream independently."
    }
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// YEAR 3: INDUSTRY SPECIALIZATIONS & REAL TECH STACKS (Junior Year)
// ─────────────────────────────────────────────────────────────────────────────

// Track 3.1: Full-Stack Web Engineering (Year 3)
const webdevLessons: CurriculumLesson[] = [
  {
    id: "web-react-nextjs",
    title: "Modern Frontend: React, Next.js & UI Components",
    category: "Full-Stack Web Dev",
    description: "Build reactive user interfaces with reusable React components, hooks (useState, useEffect), and Next.js.",
    route: "/lessons/web-react-nextjs",
    order: 1,
    duration: "45 min deep-dive & terminal",
    difficulty: "Intermediate",
    keySkills: ["React Components", "JSX Syntax", "useState & Props", "Next.js App Router"],
    trackId: "webdev-fullstack",
    content: {
      overview: "Modern web applications are built from modular components (buttons, cards, navbars) that react immediately when data changes.",
      sections: [
        {
          title: "Building an Interactive Counter Component",
          explanation: "In React, state represents data that can change over time. When state updates, React automatically refreshes the UI.",
          codeSnippet: "\"use client\";\nimport { useState } from \"react\";\n\nexport default function StreakCounter() {\n    const [streak, setStreak] = useState(1);\n    \n    return (\n        <div className=\"p-4 border rounded-xl\">\n            <p className=\"font-bold\">Study Streak: {streak} Days 🔥</p>\n            <button onClick={() => setStreak(streak + 1)} className=\"bg-emerald-500 px-3 py-1 text-white rounded\">\n                Complete Today's Sprint\n            </button>\n        </div>\n    );\n}",
          language: "tsx",
          takeaways: [
            "React breaks UI into independent, reusable lego blocks called components.",
            "State updates trigger swift, efficient re-renders."
          ]
        }
      ]
    },
    quiz: {
      question: "What React hook is used to store and update local component state?",
      options: ["useData", "useState", "useEffect", "useRouter"],
      correctAnswer: "useState",
      explanation: "useState is the core React hook for declaring state variables that cause the UI to re-render when modified."
    }
  },
  {
    id: "web-rest-apis-backend",
    title: "REST APIs, Node.js & Database Integration",
    category: "Full-Stack Web Dev",
    description: "Connect frontend buttons to backend endpoints, handle JSON payloads, and persist data in databases.",
    route: "/lessons/web-rest-apis-backend",
    order: 2,
    duration: "45 min deep-dive & terminal",
    difficulty: "Intermediate",
    keySkills: ["REST API Endpoints", "GET, POST, PUT, DELETE", "JSON Responses", "Database Queries"],
    trackId: "webdev-fullstack",
    content: {
      overview: "A REST API is the messenger between your frontend website and your backend database.",
      sections: [
        {
          title: "Writing a Clean API Route",
          explanation: "Receive a JSON request from the user, validate the data, save it to the database, and return a clean response.",
          codeSnippet: "// Next.js Route Handler (app/api/progress/route.ts)\nimport { NextResponse } from \"next/server\";\n\nexport async function POST(request: Request) {\n    const body = await request.json();\n    // Save progress to database...\n    return NextResponse.json({ success: true, updatedLesson: body.lessonId });\n}",
          language: "ts",
          takeaways: [
            "GET retrieves data, POST creates new data.",
            "Always return proper HTTP status codes (200 OK, 400 Bad Request, 500 Server Error)."
          ]
        }
      ]
    },
    quiz: {
      question: "Which HTTP method is conventionally used to submit new data from a form to an API?",
      options: ["GET", "POST", "DELETE", "HEAD"],
      correctAnswer: "POST",
      explanation: "POST sends a request payload containing new data to create or process on the server."
    }
  },
  {
    id: "web-nextjs-rsc-architecture",
    title: "Next.js 15 Full-Stack Architecture: RSC, Server Actions & Streaming",
    category: "Full-Stack Web Dev",
    description: "Architect high-performance web apps with React Server Components (RSC), type-safe Server Actions, streaming SSR with Suspense, and edge caching.",
    route: "/lessons/web-nextjs-rsc-architecture",
    order: 3,
    duration: "52 min advanced lab",
    difficulty: "Advanced",
    keySkills: ["React Server Components (RSC)", "Server Actions", "Streaming SSR with Suspense", "Edge Middleware", "Optimistic UI Mutations"],
    trackId: "webdev-fullstack",
    content: {
      overview: "Next.js 15 fundamentally changes web architecture. Server Components execute entirely on the server, sending zero JavaScript to the client while querying databases directly with zero network waterfalls.",
      sections: [
        {
          title: "1. Server Actions: Type-Safe Mutations Without API Boilerplate",
          explanation: "Server Actions allow frontend buttons and forms to invoke asynchronous server functions directly, eliminating the need to write separate REST API boilerplate for simple mutations.",
          codeSnippet: "// app/actions/updateStudent.ts\n\"use server\";\nimport { revalidatePath } from \"next/cache\";\n\nexport async function updateStudentGpa(studentId: string, newGpa: number) {\n    // Direct database query on server\n    await db.update(students).set({ gpa: newGpa }).where(eq(students.id, studentId));\n    \n    // Invalidate cached server page immediately\n    revalidatePath(\"/year/tailored\");\n    return { success: true };\n}",
          language: "ts",
          takeaways: [
            "Server Components keep heavy libraries (markdown parsers, database drivers) off client bundles.",
            "Use 'use server' to define server actions and 'use client' only when state/interactivity is required."
          ]
        }
      ]
    },
    quiz: {
      question: "What is the primary performance benefit of React Server Components (RSC) in Next.js?",
      options: [
        "They disable CSS completely",
        "They execute on the server and send zero JavaScript runtime bundle to the client browser",
        "They prevent users from clicking buttons",
        "They force clients to download the entire database"
      ],
      correctAnswer: "They execute on the server and send zero JavaScript runtime bundle to the client browser",
      explanation: "RSC renders HTML on the server without shipping component code or dependencies to the client bundle, drastically cutting Time-to-Interactive."
    }
  },
  {
    id: "web-security-auth",
    title: "Production Authentication, JWTs, OAuth2 & Web Security",
    category: "Full-Stack Web Dev",
    description: "Implement battle-tested authentication using JWTs with Refresh Token rotation, HTTP-Only cookies, CSRF protection, and RBAC.",
    route: "/lessons/web-security-auth",
    order: 4,
    duration: "50 min advanced lab",
    difficulty: "Advanced",
    keySkills: ["JWT Access & Refresh Tokens", "HTTP-Only Secure Cookies", "OAuth2.0 PKCE Flow", "CSRF & XSS Protections", "Role-Based Access Control (RBAC)"],
    trackId: "webdev-fullstack",
    content: {
      overview: "Security is non-negotiable in production applications. Storing auth tokens in browser localStorage exposes user sessions to malicious XSS script theft. Production apps use HTTP-Only, SameSite cookies with refresh token rotation.",
      sections: [
        {
          title: "1. Secure Token Rotation Architecture",
          explanation: "• Access Token (Short-lived: 15 min): Sent in memory to authorize API calls.\n• Refresh Token (Long-lived: 7 days): Stored in HTTP-Only, Secure, SameSite=Strict cookie.\n• When access token expires, client issues a refresh request; server rotates the refresh token and issues a new pair.",
          codeSnippet: "// Setting secure HTTP-Only cookie in Next.js Route Handler\nimport { cookies } from \"next/headers\";\n\nexport async function POST(req: Request) {\n    const { refreshToken } = await generateTokens(userId);\n    \n    (await cookies()).set(\"refreshToken\", refreshToken, {\n        httpOnly: true,  // JavaScript cannot access (blocks XSS)\n        secure: true,    // HTTPS only\n        sameSite: \"lax\", // Blocks CSRF\n        maxAge: 7 * 24 * 60 * 60,\n    });\n    return NextResponse.json({ success: true });\n}",
          language: "ts",
          takeaways: [
            "Never store access or refresh tokens in localStorage due to XSS vulnerability.",
            "Always implement Refresh Token Rotation: if a refresh token is reused, invalidate all sessions immediately."
          ]
        }
      ]
    },
    quiz: {
      question: "Why should authentication refresh tokens be stored in HTTP-Only cookies instead of browser localStorage?",
      options: [
        "Cookies hold more storage space than localStorage",
        "HTTP-Only cookies cannot be read or stolen by malicious JavaScript during Cross-Site Scripting (XSS) attacks",
        "localStorage does not work on mobile phones",
        "Cookies automatically translate code into C"
      ],
      correctAnswer: "HTTP-Only cookies cannot be read or stolen by malicious JavaScript during Cross-Site Scripting (XSS) attacks",
      explanation: "HTTP-Only flag instructs the browser that the cookie must never be accessible via document.cookie or JavaScript APIs, blocking token theft from XSS injections."
    }
  }
];

// Track 3.2: AI & Machine Learning Specialization (Year 3)
const aimlLessons: CurriculumLesson[] = [
  {
    id: "aiml-python-numpy",
    title: "NumPy & Pandas for Data Analysis",
    category: "AI & Machine Learning",
    description: "Process datasets, clean missing data, and perform fast vectorized math using NumPy and Pandas.",
    route: "/lessons/aiml-python-numpy",
    order: 1,
    duration: "45 min interactive masterclass",
    difficulty: "Intermediate",
    keySkills: ["NumPy Arrays", "Vectorization", "Pandas DataFrames", "Data Cleaning"],
    trackId: "aiml-specialization",
    content: {
      overview: "Before you can train AI models, you need to clean, inspect, and transform raw numbers into mathematical matrices.",
      sections: [
        {
          title: "Vectorized Math with NumPy",
          explanation: "NumPy performs operations across millions of numbers in parallel without slow Python loops.",
          codeSnippet: "import numpy as np\nimport pandas as pd\n\n# Load student dataset\ndf = pd.read_csv(\"students.csv\")\nprint(df.describe()) # Instant stats: mean, min, max\n\n# Vectorized calculation (50x faster than for-loops)\ngpa_scaled = df[\"gpa\"].values * 10",
          language: "python",
          takeaways: [
            "Pandas DataFrames make filtering tabular datasets effortless.",
            "Vectorized calculations run at compiled C speeds under the hood."
          ]
        }
      ]
    },
    quiz: {
      question: "Why is a vectorized NumPy operation significantly faster than a regular Python for loop?",
      options: [
        "NumPy uses magic",
        "NumPy executes optimized compiled C code across contiguous memory blocks",
        "Python loops do not support numbers",
        "NumPy skips mathematical calculations"
      ],
      correctAnswer: "NumPy executes optimized compiled C code across contiguous memory blocks",
      explanation: "NumPy handles data in contiguous memory using optimized C code, bypassing Python interpreter loop overhead."
    }
  },
  {
    id: "aiml-neural-networks",
    title: "Neural Networks, PyTorch & Modern AI",
    category: "AI & Machine Learning",
    description: "Understand artificial neurons, loss functions, gradient descent, and train deep learning models with PyTorch.",
    route: "/lessons/aiml-neural-networks",
    order: 2,
    duration: "48 min comprehensive lab",
    difficulty: "Advanced",
    keySkills: ["Tensors", "Forward & Backpropagation", "Loss Functions", "PyTorch Models"],
    trackId: "aiml-specialization",
    content: {
      overview: "Neural networks are inspired by the human brain: connected layers of artificial neurons that learn patterns from training data.",
      sections: [
        {
          title: "The Training Loop: How AI Actually Learns",
          explanation: "1. Predict output (forward pass). 2. Measure mistake (loss). 3. Adjust weights using gradient descent (backpropagation).",
          codeSnippet: "import torch\nimport torch.nn as nn\n\n# Simple 2-layer neural network\nmodel = nn.Sequential(\n    nn.Linear(10, 32), # 10 inputs -> 32 neurons\n    nn.ReLU(),         # Activation function\n    nn.Linear(32, 1)   # 1 prediction output\n)\n\nprint(model)",
          language: "python",
          takeaways: [
            "Weights are adjusted iteratively to minimize prediction error.",
            "PyTorch makes deep learning modular and GPU-accelerated."
          ]
        }
      ]
    },
    quiz: {
      question: "What algorithm is used to calculate gradients and update weights in a neural network?",
      options: ["Binary Search", "Backpropagation with Gradient Descent", "Dijkstra's Algorithm", "Quicksort"],
      correctAnswer: "Backpropagation with Gradient Descent",
      explanation: "Backpropagation computes gradients of the loss function, and gradient descent updates weights to minimize loss."
    }
  },
  {
    id: "aiml-deep-learning-transformers",
    title: "Transformers & Self-Attention Architecture",
    category: "AI & Machine Learning",
    description: "Deconstruct the Transformer architecture: Scaled Dot-Product Attention, Multi-Head Attention, Positional Encoding, and GPT/BERT models.",
    route: "/lessons/aiml-deep-learning-transformers",
    order: 3,
    duration: "55 min advanced lab",
    difficulty: "Advanced",
    keySkills: ["Self-Attention Mechanics", "Query, Key, Value (Q, K, V)", "Multi-Head Attention", "Positional Embeddings", "Transformer Decoders"],
    trackId: "aiml-specialization",
    content: {
      overview: "The Transformer architecture ('Attention Is All You Need', Vaswani et al.) replaced recurrent networks and powers all modern Large Language Models (LLMs) including GPT-4, Claude, and Gemini.",
      sections: [
        {
          title: "1. The Self-Attention Formula: Q, K, V",
          explanation: "Attention(Q, K, V) = softmax((Q * K^T) / sqrt(d_k)) * V.\n• Query (Q): What am I looking for?\n• Key (K): What do I contain?\n• Value (V): What information do I actually give if matched?\n• The dot product measures semantic similarity between every word pair in parallel!",
          codeSnippet: "# PyTorch Scaled Dot-Product Attention\nimport torch\nimport torch.nn.functional as F\n\ndef scaled_dot_product_attention(Q, K, V):\n    d_k = Q.size(-1)\n    scores = torch.matmul(Q, K.transpose(-2, -1)) / (d_k ** 0.5)\n    attention_weights = F.softmax(scores, dim=-1)\n    output = torch.matmul(attention_weights, V)\n    return output, attention_weights",
          language: "python",
          takeaways: [
            "Self-attention computes token relationships in O(1) sequential steps (fully parallelized across GPU cores).",
            "Multi-head attention lets the model attend to information from different representation subspaces simultaneously."
          ]
        }
      ]
    },
    quiz: {
      question: "In the self-attention formula `softmax((Q * K^T) / sqrt(d_k)) * V`, why are scores divided by `sqrt(d_k)`?",
      options: [
        "To convert tensors into strings",
        "To prevent dot products from growing excessively large, which pushes softmax into regions with vanishing gradients",
        "To encrypt token IDs",
        "To force the model to forget negative weights"
      ],
      correctAnswer: "To prevent dot products from growing excessively large, which pushes softmax into regions with vanishing gradients",
      explanation: "When dimension d_k is large, dot products grow huge, causing softmax outputs to saturate with extremely tiny gradients. Scaling by sqrt(d_k) stabilizes training."
    }
  },
  {
    id: "aiml-rag-vector-databases",
    title: "Generative AI, RAG & Vector Databases",
    category: "AI & Machine Learning",
    description: "Build production Retrieval-Augmented Generation (RAG) pipelines using dense text embeddings, vector similarity (Cosine/HNSW), and Pinecone/pgvector.",
    route: "/lessons/aiml-rag-vector-databases",
    order: 4,
    duration: "52 min advanced lab",
    difficulty: "Advanced",
    keySkills: ["Text Embeddings", "Vector Databases (pgvector, Pinecone)", "Cosine Similarity & HNSW", "RAG Pipeline Architecture", "Prompt Injection Defense"],
    trackId: "aiml-specialization",
    content: {
      overview: "LLMs suffer from knowledge cutoffs and hallucinations. Retrieval-Augmented Generation (RAG) connects an LLM to external real-time enterprise databases by querying semantically similar document vectors.",
      sections: [
        {
          title: "1. The 3-Stage Production RAG Pipeline",
          explanation: "1. Ingestion: Chunk documents, compute 1536-dimensional embedding vectors, and store in vector database.\n2. Retrieval: Embed user prompt, execute Approximate Nearest Neighbor (ANN) search using cosine distance.\n3. Generation: Inject top-k retrieved context into LLM system prompt.",
          codeSnippet: "# Querying pgvector in PostgreSQL for RAG\nSELECT document_id, content, 1 - (embedding <=> $user_query_vector) AS similarity\nFROM document_chunks\nORDER BY embedding <=> $user_query_vector ASC\nLIMIT 5;",
          language: "sql",
          takeaways: [
            "Cosine similarity measures the angle between semantic meaning vectors, irrespective of document word length.",
            "RAG grounds LLM outputs in verified facts, drastically slashing hallucinations."
          ]
        }
      ]
    },
    quiz: {
      question: "What is the primary role of a Vector Database in a RAG (Retrieval-Augmented Generation) application?",
      options: [
        "To compile C code",
        "To store high-dimensional embeddings and perform lightning-fast semantic similarity search",
        "To replace the GPU hardware entirely",
        "To resize image resolutions"
      ],
      correctAnswer: "To store high-dimensional embeddings and perform lightning-fast semantic similarity search",
      explanation: "Vector databases index embedding vectors using algorithms like HNSW to find semantically relevant knowledge for LLM prompts in milliseconds."
    }
  }
];

// Track 3.3: Cloud Computing & DevOps (Year 3)
const cloudDevOpsLessons: CurriculumLesson[] = [
  {
    id: "cloud-docker-containers",
    title: "Docker & Containerization for Engineers",
    category: "Cloud & DevOps",
    description: "Package apps with all their dependencies so they run identically on any laptop, server, or cloud.",
    route: "/lessons/cloud-docker-containers",
    order: 1,
    duration: "45 min interactive masterclass",
    difficulty: "Intermediate",
    keySkills: ["Dockerfiles", "Images & Containers", "Port Forwarding", "docker-compose"],
    trackId: "cloud-devops",
    content: {
      overview: "Eliminate the infamous 'Works on my machine, but breaks on production' syndrome forever. Docker packages your source code, runtime, system libraries, configuration, and dependencies into a lightweight, self-contained, reproducible container that runs identically on macOS, Windows, Linux, and any cloud provider.",
      sections: [
        {
          title: "1. The Container Mental Model: Docker vs Virtual Machines (VMs)",
          explanation: "In traditional Virtual Machines (like VMware or VirtualBox), each VM bundles a complete guest Operating System (taking 10GB+ of disk and gigabytes of RAM). VMs take minutes to boot up.\n\nDocker containers, by contrast, share the host OS kernel and only isolate user-space processes using Linux cgroups and namespaces. A Docker container starts in milliseconds, weighs mere megabytes (e.g. Alpine Linux is only 5MB!), and runs at native hardware speeds.\n\nKey Concepts:\n• Image: A read-only blueprint/snapshot of your application environment (like a class in OOP).\n• Container: A runnable, isolated live instance created from an image (like an object instantiated from a class).\n• Registry: A cloud repository where images are published and pulled from (e.g. Docker Hub, GitHub Packages, AWS ECR).",
          codeSnippet: "# Pull a lightweight official Python image from Docker Hub\ndocker pull python:3.11-alpine\n\n# Run an interactive ephemeral container and open a Python shell\ndocker run -it --rm python:3.11-alpine python3\n\n# List all currently running containers on your system\ndocker ps\n\n# List all downloaded images\ndocker images",
          language: "bash",
          takeaways: [
            "An image is the frozen recipe/blueprint; a container is the running kitchen process.",
            "Containers share the host kernel, making them 100x lighter and faster than traditional virtual machines."
          ]
        },
        {
          title: "2. Anatomy of a Production Dockerfile: Layer Caching & Best Practices",
          explanation: "A Dockerfile is a text recipe that tells Docker step-by-step how to assemble your container image. Each instruction creates a cached layer.\n\nLayer Caching Strategy:\nDocker caches intermediate build layers. If line 4 hasn't changed, Docker reuses the cached layer instantly! Therefore, always copy your dependency manifest ('package.json' or 'requirements.txt') and install dependencies BEFORE copying your full source code. This ensures source code edits don't force a slow re-install of all libraries!",
          codeSnippet: "# 1. Base Image: Use lightweight official Alpine Linux\nFROM node:20-alpine\n\n# 2. Set working directory inside container\nWORKDIR /app\n\n# 3. Copy dependency manifests FIRST to leverage Docker layer caching\nCOPY package*.json ./\n\n# 4. Install production dependencies\nRUN npm ci --only=production\n\n# 5. Copy remaining application source code\nCOPY . .\n\n# 6. Document target port\nEXPOSE 3000\n\n# 7. Default command executed when container launches\nCMD [\"npm\", \"start\"]",
          language: "dockerfile",
          takeaways: [
            "Copy dependency manifests and run 'npm install' or 'pip install' before copying source files to maximize Docker build caching.",
            "Use minimal Alpine or slim images to keep container size small and reduce security vulnerability attack surface."
          ]
        },
        {
          title: "3. Building, Running, Port Mapping & Volume Mounts",
          explanation: "Once your Dockerfile is defined, you build and run it using the Docker CLI:\n\n• Building: 'docker build -t campusgrow-api:v1 .' tags your image.\n• Port Forwarding (-p host:container): Containers live in an isolated virtual network. To access a container web service listening on port 3000 from your laptop browser, you map ports: 'docker run -p 8080:3000 campusgrow-api:v1'. Visiting 'localhost:8080' reaches port 3000 inside the container!\n• Detached Mode (-d): Runs the container as a background daemon.\n• Volumes (-v): Containers are ephemeral (any data written inside vanishes when destroyed). Volumes mount a folder on your host machine into the container so database files persist across restarts.",
          codeSnippet: "# 1. Build Docker image with tag\ndocker build -t my-web-app:v1 .\n\n# 2. Run container in background (-d) with port forwarding (-p) and a name\ndocker run -d -p 3000:3000 --name web-service my-web-app:v1\n\n# 3. View live logs from container\ndocker logs -f web-service\n\n# 4. Execute a bash shell inside running container for debugging\ndocker exec -it web-service sh\n\n# 5. Stop and clean up container\ndocker stop web-service && docker rm web-service",
          language: "bash",
          takeaways: [
            "Port mapping '-p 3000:3000' bridges your host laptop's network to the container's isolated network.",
            "Use volumes to persist database records; otherwise container restarts wipe out local storage."
          ]
        },
        {
          title: "4. Multi-Container Orchestration with Docker Compose",
          explanation: "Real-world production systems rarely consist of just 1 service. A standard application needs a frontend (Next.js), a backend API (Node/Go/Python), a database (PostgreSQL), and a cache (Redis).\n\nRunning 4 separate 'docker run' commands manually with complex network flags is error-prone. Docker Compose allows you to describe your entire multi-service stack in a single 'docker-compose.yml' file and spin everything up with ONE command: 'docker compose up -d'!",
          codeSnippet: "# docker-compose.yml - Multi-Service Engineering Stack\nversion: '3.8'\nservices:\n  web:\n    build: .\n    ports:\n      - \"3000:3000\"\n    environment:\n      - DATABASE_URL=postgresql://user:secret@db:5432/campusgrow\n    depends_on:\n      - db\n      - cache\n\n  db:\n    image: postgres:16-alpine\n    environment:\n      POSTGRES_USER: user\n      POSTGRES_PASSWORD: secret\n      POSTGRES_DB: campusgrow\n    volumes:\n      - pgdata:/var/lib/postgresql/data\n\n  cache:\n    image: redis:7-alpine\n    ports:\n      - \"6379:6379\"\n\nvolumes:\n  pgdata:",
          language: "yaml",
          takeaways: [
            "Docker Compose coordinates multiple interconnected services in a single unified network.",
            "Run 'docker compose up -d' to start the entire full-stack app, and 'docker compose down' to clean it up."
          ]
        }
      ]
    },
    quiz: {
      question: "What is the primary benefit of containerizing an application with Docker?",
      options: [
        "It eliminates the need for any programming code",
        "It packages code and dependencies together to guarantee consistent execution anywhere",
        "It speeds up CPU clock frequency",
        "It automatically writes unit tests"
      ],
      correctAnswer: "It packages code and dependencies together to guarantee consistent execution anywhere",
      explanation: "Docker isolates the application and its dependencies into a reproducible container that runs identically on any environment."
    }
  },
  {
    id: "cloud-ci-cd-pipelines",
    title: "CI/CD Automation with GitHub Actions",
    category: "Cloud & DevOps",
    description: "Learn how top engineering teams deploy code 50+ times a day using automated GitHub Actions CI/CD pipelines, automated testing, and cloud deployments.",
    route: "/lessons/cloud-ci-cd-pipelines",
    order: 2,
    duration: "45 min interactive masterclass",
    difficulty: "Intermediate",
    keySkills: ["Continuous Integration (CI)", "Continuous Deployment (CD)", "GitHub Actions YAML", "Matrix Testing", "GitHub Secrets & Deployment"],
    trackId: "cloud-devops",
    content: {
      overview: "In modern software engineering, nobody deploys code by manually dragging files into an FTP server. Continuous Integration (CI) and Continuous Deployment (CD) automate the entire quality assurance and delivery pipeline. Whenever a developer pushes code or opens a Pull Request, automated cloud bots compile the code, run hundreds of unit tests, check security vulnerabilities, and deploy updates to production automatically.",
      sections: [
        {
          title: "1. The Modern CI/CD Pipeline Architecture",
          explanation: "The CI/CD pipeline consists of two interconnected phases:\n\n1. Continuous Integration (CI):\nFocuses on code health. Every time a branch is updated, automated runners check: Does the code compile? Do the linting rules pass? Do all unit and integration tests pass? If any test fails, the build turns red and blocks the branch from merging.\n\n2. Continuous Delivery / Deployment (CD):\nFocuses on automated release. Once code passes all tests and is merged into 'main', CD takes over: it builds the Docker container, pushes the release to cloud infrastructure (AWS ECS, Google Cloud Run, Vercel, Kubernetes), and rolls out the update with zero user downtime.",
          codeSnippet: "# The CI/CD Lifecycle:\n# Code Push -> [Linter Check] -> [Unit Tests] -> [Docker Build] -> [Cloud Deploy] -> Live!",
          language: "bash",
          takeaways: [
            "CI prevents bugs from ever reaching the main branch.",
            "CD removes human error from production deployments, enabling fast, fearless releases."
          ]
        },
        {
          title: "2. GitHub Actions Syntax: Workflows, Events, Jobs & Steps",
          explanation: "GitHub Actions executes automation directly inside your GitHub repository. Workflows are defined in YAML files located in '.github/workflows/':\n\n• Workflow: The automated procedure composed of one or more jobs.\n• Event (on:): The trigger that kicks off the workflow (e.g. 'on: push', 'on: pull_request', or scheduled cron '0 0 * * *').\n• Job: A set of steps executed on a fresh virtual machine (Runner, e.g. 'runs-on: ubuntu-latest'). Jobs run in parallel by default.\n• Step: An individual task within a job (either running a shell command like 'npm test' or using a prebuilt community action with 'uses: actions/checkout@v4').",
          codeSnippet: "# .github/workflows/ci.yml\nname: Pull Request Quality Gate\n\non:\n  pull_request:\n    branches: [main]\n  push:\n    branches: [main]\n\njobs:\n  test-and-lint:\n    runs-on: ubuntu-latest\n    steps:\n      - name: 1. Clone repository to runner\n        uses: actions/checkout@v4\n\n      - name: 2. Set up Node.js runtime\n        uses: actions/setup-node@v4\n        with:\n          node-version: '20'\n          cache: 'npm'\n\n      - name: 3. Install dependencies cleanly\n        run: npm ci\n\n      - name: 4. Run Linter\n        run: npm run lint\n\n      - name: 5. Execute Test Suite\n        run: npm test",
          language: "yaml",
          takeaways: [
            "Workflows live in the '.github/workflows/' directory as YAML files.",
            "'uses:' imports proven actions from GitHub Marketplace, while 'run:' executes standard bash commands."
          ]
        },
        {
          title: "3. Matrix Testing: Validating Multiple OS & Runtime Versions",
          explanation: "When building libraries or enterprise tools, your software must work seamlessly across Node 18, 20, and 22, or across Ubuntu, macOS, and Windows. Instead of duplicating workflow files, GitHub Actions provides Matrix Builds: it spawns parallel test runners across all combinations simultaneously!",
          codeSnippet: "# Matrix build configuration snippet\njobs:\n  multi-platform-test:\n    strategy:\n      matrix:\n        os: [ubuntu-latest, macos-latest]\n        node: [18, 20, 22]\n    runs-on: ${{ matrix.os }}\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: ${{ matrix.node }}\n      - run: npm test",
          language: "yaml",
          takeaways: [
            "Matrix builds test multiple Node/Python versions and operating systems in parallel.",
            "Matrix testing guarantees multi-platform compatibility before public package releases."
          ]
        },
        {
          title: "4. Managing Secrets & Continuous Deployment (CD)",
          explanation: "Production deployments require cloud access keys, database passwords, and API tokens. NEVER write secrets directly into your YAML files!\n\nUsing GitHub Secrets:\nGo to GitHub Repo ➔ Settings ➔ Secrets and Variables ➔ Actions. Add your credentials (e.g. 'VERCEL_TOKEN', 'AWS_ACCESS_KEY_ID'). In your workflow, reference them securely via '${{ secrets.VERCEL_TOKEN }}'. GitHub automatically masks these secrets in console logs with '***' so they can never be leaked.",
          codeSnippet: "# Automated Continuous Deployment snippet\n  deploy-production:\n    needs: test-and-lint\n    if: github.ref == 'refs/heads/main'\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - name: Deploy to Cloud Provider\n        env:\n          API_SECRET: ${{ secrets.PRODUCTION_API_KEY }}\n          DEPLOY_TOKEN: ${{ secrets.DEPLOY_TOKEN }}\n        run: |\n          echo \"Triggering automated production deployment...\"\n          npx vercel --prod --token=$DEPLOY_TOKEN",
          language: "yaml",
          takeaways: [
            "Store all deployment keys in GitHub Encrypted Secrets; never commit credentials to code.",
            "Use 'needs: [test-job]' to ensure deployment only triggers if all tests pass with 100% success."
          ]
        }
      ]
    },
    quiz: {
      question: "What does CI stand for in modern DevOps workflows?",
      options: ["Computer Interface", "Continuous Integration", "Cloud Infrastructure", "Code Isolation"],
      correctAnswer: "Continuous Integration",
      explanation: "Continuous Integration is the practice of regularly merging and automatically testing code changes in a shared repository."
    }
  },
  {
    id: "cloud-kubernetes-microservices",
    title: "Kubernetes Orchestration, Pods, Services & Ingress",
    category: "Cloud & DevOps",
    description: "Orchestrate containerized microservices at scale using Kubernetes Pods, Deployments, ClusterIP/NodePort Services, Ingress Controllers, and ConfigMaps.",
    route: "/lessons/cloud-kubernetes-microservices",
    order: 3,
    duration: "52 min advanced lab",
    difficulty: "Advanced",
    keySkills: ["Kubernetes (K8s) Architecture", "Pods & ReplicaSets", "Service Discovery & Ingress", "ConfigMaps & Secrets", "Horizontal Pod Autoscaler (HPA)"],
    trackId: "cloud-devops",
    content: {
      overview: "When deploying hundreds of microservice containers across a cluster of servers, manual container management is impossible. Kubernetes automates container scheduling, self-healing restarts, zero-downtime rollouts, and horizontal autoscaling.",
      sections: [
        {
          title: "1. The Anatomy of a Kubernetes Deployment Manifest",
          explanation: "Kubernetes is declarative: you state your desired state (e.g. 'I want 3 replicas of the auth service running at all times'). The K8s control plane continuously reconciles reality to match this declaration.",
          codeSnippet: "# k8s-deployment.yaml\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: campusgrow-api\nspec:\n  replicas: 3 # Self-healing: K8s maintains exactly 3 pods\n  selector:\n    matchLabels:\n      app: campusgrow-api\n  template:\n    metadata:\n      labels:\n        app: campusgrow-api\n    spec:\n      containers:\n      - name: api\n        image: campusgrow/api:v2.6\n        ports:\n        - containerPort: 3000\n        resources:\n          limits:\n            cpu: \"500m\"\n            memory: \"512Mi\"",
          language: "yaml",
          takeaways: [
            "Pods are ephemeral; always expose them through a K8s Service (ClusterIP) for stable virtual IP discovery.",
            "Ingress routes external HTTP/HTTPS traffic to internal cluster services using host and path rules."
          ]
        }
      ]
    },
    quiz: {
      question: "What Kubernetes component automatically replaces a failed container if its process crashes?",
      options: ["Docker Hub", "The Deployment / ReplicaSet controller", "The DNS server", "The Ingress resource"],
      correctAnswer: "The Deployment / ReplicaSet controller",
      explanation: "The ReplicaSet controller continuously monitors the cluster and launches a new pod immediately if an existing one terminates unexpectedly."
    }
  },
  {
    id: "cloud-cicd-security",
    title: "DevSecOps, Secrets Rotation & Blue-Green Deployments",
    category: "Cloud & DevOps",
    description: "Automate security vulnerability scanning (SAST/DAST) in CI/CD, rotate secrets dynamically, and implement zero-downtime Blue-Green / Canary releases.",
    route: "/lessons/cloud-cicd-security",
    order: 4,
    duration: "48 min advanced lab",
    difficulty: "Advanced",
    keySkills: ["Static Code Analysis (SAST)", "Dependency Scanning (Dependabot)", "Blue-Green Deployment", "Canary Rollouts", "Zero-Downtime Traffic Switching"],
    trackId: "cloud-devops",
    content: {
      overview: "Enterprise software teams deploy continuously without interrupting active users. Blue-Green deployments maintain two identical production environments (Blue and Green) and switch the router instantaneously once health checks pass.",
      sections: [
        {
          title: "1. Blue-Green vs Canary Deployments",
          explanation: "• Blue-Green: Blue is live production; deploy version 2 to Green. Run smoke tests on Green. Switch router to Green instantly (instant rollback if issues arise).\n• Canary: Route 5% of traffic to the new version. Monitor error rates. Gradually increase to 25%, 50%, then 100%.",
          codeSnippet: "# Nginx / Cloudflare Weighted Canary Routing\nupstream backend {\n    server green.internal:3000 weight=95; # Stable release\n    server canary.internal:3000 weight=5; # 5% canary test\n}",
          language: "nginx",
          takeaways: [
            "Never deploy destructive database migrations simultaneously with application code.",
            "Use Dependabot and Trivy in GitHub Actions to catch container CVE vulnerabilities before shipping."
          ]
        }
      ]
    },
    quiz: {
      question: "What is the primary advantage of a Blue-Green deployment strategy?",
      options: [
        "It eliminates all database storage",
        "It achieves zero-downtime releases and provides instantaneous rollback capability by switching router targets",
        "It allows running uncompiled code in production",
        "It reduces cloud bandwidth cost to zero"
      ],
      correctAnswer: "It achieves zero-downtime releases and provides instantaneous rollback capability by switching router targets",
      explanation: "Because both environments are fully provisioned, switching live router traffic between Blue and Green takes milliseconds and can be instantly reversed."
    }
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// YEAR 4: CAMPUS PLACEMENTS, SYSTEM DESIGN & CAPSTONE (Senior Year)
// ─────────────────────────────────────────────────────────────────────────────

// Track 4.1: Placement Sprint & Tech OA Cracker (Year 4)
const placementSprintLessons: CurriculumLesson[] = [
  {
    id: "placement-two-pointers-sliding-window",
    title: "High-Yield OA Patterns: Two Pointers & Sliding Window",
    category: "Placement Sprint",
    description: "Crush online assessment (OA) questions using the two most frequent coding interview patterns.",
    route: "/lessons/placement-two-pointers-sliding-window",
    order: 1,
    duration: "45 min deep-dive & terminal",
    difficulty: "Advanced",
    keySkills: ["Two Pointers", "Sliding Window", "Subarray Optimization", "Time Reduction (O(N^2) to O(N))"],
    trackId: "placement-sprint",
    content: {
      overview: "Over 40% of coding assessment questions in top company campus drives test Two Pointers and Sliding Window techniques.",
      sections: [
        {
          title: "The Sliding Window Pattern",
          explanation: "Maintain a dynamic left and right boundary to find the maximum sum or longest substring in linear O(N) time without checking all pairs.",
          codeSnippet: "// Maximum sum subarray of size k in O(N)\nint windowSum = 0, maxSum = 0;\nfor (int i = 0; i < k; i++) windowSum += arr[i];\nmaxSum = windowSum;\n\nfor (int i = k; i < n; i++) {\n    windowSum += arr[i] - arr[i - k]; // Slide window right\n    maxSum = max(maxSum, windowSum);\n}",
          language: "cpp",
          takeaways: [
            "Two pointers reduces O(N^2) brute force searches down to snappy O(N).",
            "Identify sliding window when problems mention 'contiguous subarray' or 'longest substring'."
          ]
        }
      ]
    },
    quiz: {
      question: "What is the primary benefit of applying a sliding window over a brute force approach for subarrays?",
      options: [
        "It uses infinite memory",
        "It reuses previous sums/calculations, reducing time complexity from O(N^2) to O(N)",
        "It makes recursion unnecessary for everything",
        "It works only on negative numbers"
      ],
      correctAnswer: "It reuses previous sums/calculations, reducing time complexity from O(N^2) to O(N)",
      explanation: "By adding the incoming element and subtracting the outgoing element, calculations take O(1) per step, yielding overall O(N) runtime."
    }
  },
  {
    id: "placement-star-interviews",
    title: "STAR Technique for Technical & HR Rounds",
    category: "Placement Sprint",
    description: "Structure your project explanations and behavioral answers to impress senior interviewers.",
    route: "/lessons/placement-star-interviews",
    order: 2,
    duration: "42 min practice & mastery",
    difficulty: "Beginner",
    keySkills: ["STAR Framework", "Project Articulation", "Handling Conflict", "Salary & Offer Etiquette"],
    trackId: "placement-sprint",
    content: {
      overview: "Great technical skills alone won't get you hired if you cannot clearly explain what you built and how you solved problems.",
      sections: [
        {
          title: "The STAR Response Framework",
          explanation: "Situation (Set the scene) -> Task (What needed to be solved) -> Action (The specific engineering choices YOU made) -> Result (Measurable outcome, metrics, impact).",
          codeSnippet: "// Sample STAR Answer for: \"Tell me about a difficult bug you solved\"\n// S: In our college portal, login times spiked to 4 seconds during results week.\n// T: I was tasked with reducing API latency to under 500ms.\n// A: I profiled database queries, added an index on student_id, and cached lookups in Redis.\n// R: Average response time dropped from 4.2s to 180ms, handling 5,000 concurrent students without downtime.",
          language: "markdown",
          takeaways: [
            "Quantify results: 'Reduced latency by 85%' beats 'made it faster'.",
            "Focus on 'I decided' and 'I implemented' rather than vague 'we did'."
          ]
        }
      ]
    },
    quiz: {
      question: "In the STAR interview answering framework, what does 'R' represent?",
      options: ["Rehearsal", "Result (the quantifiable outcome and impact)", "Recommendation", "Reaction"],
      correctAnswer: "Result (the quantifiable outcome and impact)",
      explanation: "Result highlights the concrete outcome, metrics, and measurable success of the actions you took."
    }
  },
  {
    id: "placement-advanced-patterns",
    title: "Elite OA Coding Patterns: Monotonic Stack & Binary Search on Answer",
    category: "Placement Sprint",
    description: "Master Monotonic Stacks (Next Greater Element, Daily Temperatures) and Binary Search on Monotonic Answer Range (Koko Eating Bananas, Capacity to Ship Packages).",
    route: "/lessons/placement-advanced-patterns",
    order: 3,
    duration: "52 min advanced lab",
    difficulty: "Advanced",
    keySkills: ["Monotonic Stack Pattern", "Next Greater Element", "Binary Search on Monotonic Answer", "Interval Merging", "O(N) Complexity Reduction"],
    trackId: "placement-sprint",
    content: {
      overview: "Tier-1 companies (Amazon, Microsoft, Uber, Atlassian) use Online Assessments with hidden test cases and strict 1.5-second time limits. Two patterns crack over 50% of these problems: Monotonic Stacks and Binary Search on Answer.",
      sections: [
        {
          title: "1. Monotonic Stack: Next Greater Element in O(N)",
          explanation: "A monotonic decreasing stack keeps elements in sorted order. As you iterate through the array, pop elements smaller than the current number to resolve their 'next greater' partner in one pass.",
          codeSnippet: "// Next Greater Element in C++\nvector<int> nextGreaterElements(vector<int>& nums) {\n    int n = nums.size();\n    vector<int> result(n, -1);\n    stack<int> st; // stores indices\n    \n    for (int i = 0; i < n; i++) {\n        while (!st.empty() && nums[i] > nums[st.top()]) {\n            result[st.top()] = nums[i];\n            st.pop();\n        }\n        st.push(i);\n    }\n    return result;\n}",
          language: "cpp",
          takeaways: [
            "Every element is pushed and popped at most once, yielding strict O(N) runtime.",
            "Use Binary Search on Answer when a problem asks for 'minimum maximum' or 'maximum minimum' and the feasibility function is monotonic."
          ]
        }
      ]
    },
    quiz: {
      question: "When should you apply the 'Binary Search on Answer Range' pattern?",
      options: [
        "When the input array is already sorted",
        "When the output space is bounded and a feasibility check function `isValid(mid)` is monotonic (true, true... false)",
        "Only when searching strings",
        "When using SQL databases"
      ],
      correctAnswer: "When the output space is bounded and a feasibility check function `isValid(mid)` is monotonic (true, true... false)",
      explanation: "If checking whether an answer `X` is valid produces a monotonic sequence of Trues followed by Falses, you can binary search the answer range in O(log(range) * cost_of_check)."
    }
  },
  {
    id: "placement-faang-oa-simulator",
    title: "FAANG OA Speed Strategy & Hidden Test-Case Survival",
    category: "Placement Sprint",
    description: "Strategies to pass 100% of test cases in 90-minute technical assessments: handling large N (10^5), integer overflow (long long), and recursion stack traps.",
    route: "/lessons/placement-faang-oa-simulator",
    order: 4,
    duration: "50 min advanced lab",
    difficulty: "Advanced",
    keySkills: ["Edge Case Checklists", "Integer Overflow (1e18)", "Time Limit Exceeded (TLE) Diagnosis", "Fast I/O Optimization", "Custom Comparators"],
    trackId: "placement-sprint",
    content: {
      overview: "In college placement assessments, scores are calculated based on hidden test cases (e.g. 15/15 passed). Most students fail test cases 11–15 due to integer overflow, empty inputs, or O(N^2) algorithms timing out on N=100,000.",
      sections: [
        {
          title: "1. The 10^8 Operations per Second Mental Rule",
          explanation: "A standard competitive programming online judge executes ~10^8 operations per second:\n• N <= 10: O(N!) or O(2^N) is fine (Backtracking).\n• N <= 1,000: O(N^2) will pass.\n• N <= 100,000: Requires O(N log N) or O(N).\n• N >= 1,000,000,000: Requires O(log N) or O(1) mathematical formula.",
          codeSnippet: "// Fast I/O in C++ to prevent I/O timeouts on 10^6 lines\n#include <iostream>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    // Always use long long for sums exceeding 2 * 10^9\n    long long total = 0;\n    int n;\n    if (cin >> n) {\n        for (int i = 0; i < n; i++) {\n            long long val;\n            cin >> val;\n            total += val;\n        }\n    }\n    cout << total << \"\\n\";\n    return 0;\n}",
          language: "cpp",
          takeaways: [
            "Use 'long long' whenever multiplying numbers or accumulating sum arrays to avoid 32-bit signed overflow (-2,147,483,648).",
            "Always test edge cases: N=0 (empty), N=1, all negative numbers, duplicate values, and maximum constraints."
          ]
        }
      ]
    },
    quiz: {
      question: "If an Online Assessment problem has constraints `N = 2 * 10^5`, what maximum time complexity will pass within the standard 1.0 second limit?",
      options: ["O(N^2)", "O(N log N) or O(N)", "O(N^3)", "O(2^N)"],
      correctAnswer: "O(N log N) or O(N)",
      explanation: "For N = 200,000, N log N is approximately 3.6 * 10^6 operations (well below the 10^8 per second limit). An O(N^2) algorithm would require 4 * 10^10 operations, guaranteeing a Time Limit Exceeded (TLE) verdict."
    }
  }
];

// Track 4.2: High-Level System Design & Architecture (Year 4)
const systemDesignLessons: CurriculumLesson[] = [
  {
    id: "system-design-scalability",
    title: "Scalability, Load Balancing & Caching",
    category: "System Design",
    description: "Design systems that handle 10 million daily active users using load balancers, CDN, and Redis caching.",
    route: "/lessons/system-design-scalability",
    order: 1,
    duration: "48 min comprehensive lab",
    difficulty: "Advanced",
    keySkills: ["Horizontal vs Vertical Scaling", "Load Balancers (Round Robin)", "Redis Caching", "CDN Delivery"],
    trackId: "system-design",
    content: {
      overview: "When a single server gets overwhelmed by millions of users, you must scale horizontally and add caching layers.",
      sections: [
        {
          title: "The Cache-Aside Pattern with Redis",
          explanation: "Instead of hitting the heavy SQL database for every single user profile request, check fast in-memory Redis first.",
          codeSnippet: "// Cache-Aside flow in pseudocode\nasync function getUserProfile(userId) {\n    let profile = await redis.get(`user:${userId}`);\n    if (profile) return JSON.parse(profile); // Instant cache hit (1ms)!\n    \n    profile = await database.query(\"SELECT * FROM users WHERE id = ?\", userId);\n    await redis.setex(`user:${userId}`, 3600, JSON.stringify(profile)); // Cache for 1 hr\n    return profile;\n}",
          language: "ts",
          takeaways: [
            "Horizontal scaling adds more machines; vertical scaling buys a bigger machine.",
            "Caching frequently read data protects your database from crushing traffic."
          ]
        }
      ]
    },
    quiz: {
      question: "What is the primary role of a Load Balancer in high-scale web architecture?",
      options: [
        "It encrypts hard drives",
        "It distributes incoming network traffic evenly across a pool of backend servers",
        "It converts Python to JavaScript",
        "It deletes duplicate accounts"
      ],
      correctAnswer: "It distributes incoming network traffic evenly across a pool of backend servers",
      explanation: "Load balancers distribute user traffic evenly among servers to prevent bottlenecks and ensure high availability."
    }
  },
  {
    id: "system-design-case-studies",
    title: "System Design Case Studies: URL Shortener & Chat App",
    category: "System Design",
    description: "Walk step-by-step through designing a TinyURL service and a real-time WhatsApp-style chat application.",
    route: "/lessons/system-design-case-studies",
    order: 2,
    duration: "50 min capstone sprint",
    difficulty: "Advanced",
    keySkills: ["Base62 Encoding", "WebSockets for Real-Time Chat", "Database Schema Design", "Capacity Estimation"],
    trackId: "system-design",
    content: {
      overview: "System design interviews evaluate your ability to think through end-to-end architecture, API contracts, and data storage at scale.",
      sections: [
        {
          title: "Designing TinyURL in 3 Steps",
          explanation: "1. Convert long URL to unique 6-character code using Base62. 2. Store mapping in database with index on shortCode. 3. Redirect incoming requests with HTTP 302 Found.",
          codeSnippet: "// TinyURL Schema\nCREATE TABLE short_urls (\n    id BIGINT PRIMARY KEY AUTO_INCREMENT,\n    short_code VARCHAR(7) UNIQUE NOT NULL,\n    original_url TEXT NOT NULL,\n    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\nCREATE INDEX idx_short_code ON short_urls(short_code);",
          language: "sql",
          takeaways: [
            "Always estimate traffic and storage requirements before picking technologies.",
            "Use HTTP 302 for analytics tracking or HTTP 301 for permanent browser caching."
          ]
        }
      ]
    },
    quiz: {
      question: "Which protocol is ideal for two-way, low-latency communication in real-time chat apps?",
      options: ["HTTP/1.0 polling", "WebSockets", "FTP", "SMTP"],
      correctAnswer: "WebSockets",
      explanation: "WebSockets provide persistent, full-duplex bi-directional communication channels over a single TCP connection."
    }
  },
  {
    id: "system-design-distributed-caching",
    title: "Consistent Hashing, Redis Clusters & Cache Stampede",
    category: "System Design",
    description: "Architect distributed caching clusters with Consistent Hashing, solve the Cache Stampede (Thundering Herd) problem, and configure eviction policies (LRU/LFU).",
    route: "/lessons/system-design-distributed-caching",
    order: 3,
    duration: "54 min advanced lab",
    difficulty: "Advanced",
    keySkills: ["Consistent Hashing Ring", "Virtual Nodes", "Cache Stampede (Thundering Herd)", "Mutex Lock vs Probabilistic Early Expiration", "Redis Cluster & Replication"],
    trackId: "system-design",
    content: {
      overview: "In distributed key-value stores handling 100,000+ QPS, naive mod-hash (`hash(key) % N`) forces 90% of keys to remap when adding or removing a server. Consistent Hashing remaps only `K/N` keys, preserving cache hit ratios.",
      sections: [
        {
          title: "1. The Cache Stampede Problem & Distributed Mutex",
          explanation: "When a popular key (e.g. World Cup live score) expires, 10,000 concurrent requests miss the cache simultaneously and slam the database. Solve this using a distributed lock so only ONE request regenerates the cache.",
          codeSnippet: "// Solving Cache Stampede with Redis Mutex Lock in TypeScript\nasync function getCachedHotData(key: string) {\n    let val = await redis.get(key);\n    if (val) return val;\n    \n    // Try to acquire distributed lock for 5 seconds\n    const lockAcquired = await redis.set(`lock:${key}`, \"1\", \"NX\", \"EX\", 5);\n    if (lockAcquired) {\n        // Only 1 worker queries DB and warms cache\n        val = await databaseQuery(key);\n        await redis.setex(key, 300, val);\n        await redis.del(`lock:${key}`);\n        return val;\n    } else {\n        // Other requests wait 50ms and read the freshly warmed cache\n        await sleep(50);\n        return redis.get(key);\n    }\n}",
          language: "ts",
          takeaways: [
            "Consistent Hashing with Virtual Nodes balances keys evenly and limits rebalancing.",
            "Use Redis Write-Through for high consistency or Write-Behind (asynchronous) for heavy write throughput."
          ]
        }
      ]
    },
    quiz: {
      question: "In Consistent Hashing, what is the role of 'Virtual Nodes'?",
      options: [
        "To run virtual machines inside Redis",
        "To distribute keys uniformly across physical servers and prevent 'hot spots'",
        "To encrypt network traffic",
        "To delete expired records automatically"
      ],
      correctAnswer: "To distribute keys uniformly across physical servers and prevent 'hot spots'",
      explanation: "Mapping multiple virtual points on the hash ring per physical node ensures that key distribution remains evenly balanced, preventing any single server from bearing an unfair load."
    }
  },
  {
    id: "system-design-message-queues",
    title: "Event-Driven Architecture & Apache Kafka Partitioning",
    category: "System Design",
    description: "Design decoupled microservices using Apache Kafka, partitions, consumer groups, offset commits, and at-least-once message delivery.",
    route: "/lessons/system-design-message-queues",
    order: 4,
    duration: "52 min advanced lab",
    difficulty: "Advanced",
    keySkills: ["Event-Driven Architecture", "Kafka Topics & Partitions", "Consumer Groups & Rebalancing", "Message Idempotency", "Dead Letter Queues (DLQ)"],
    trackId: "system-design",
    content: {
      overview: "Synchronous HTTP calls between microservices create fragile coupling: if Service B is slow, Service A times out. Event-driven architectures use append-only distributed commit logs (Apache Kafka) to buffer millions of events.",
      sections: [
        {
          title: "1. Kafka Partitions & Total Ordering Guarantees",
          explanation: "Kafka provides strict message ordering ONLY within an individual partition. Messages with the same partition key (e.g. `order_id` or `user_id`) are always routed to the same partition, guaranteeing chronological processing.",
          codeSnippet: "// Kafka Producer Event Emission in Node.js (KafkaJS)\nimport { Kafka } from \"kafkajs\";\nconst kafka = new Kafka({ clientId: \"order-service\", brokers: [\"kafka:9092\"] });\nconst producer = kafka.producer();\n\nawait producer.send({\n    topic: \"orders.created\",\n    messages: [{\n        key: order.userId, // Guarantees all events for this user go to same partition!\n        value: JSON.stringify(order),\n    }],\n});",
          language: "ts",
          takeaways: [
            "Kafka achieves high throughput via sequential disk I/O and zero-copy OS transfers (`sendfile`).",
            "Consumers must be idempotent (e.g. tracking processed UUIDs in database) to handle network duplicate deliveries safely."
          ]
        }
      ]
    },
    quiz: {
      question: "Within Apache Kafka, where is message ordering strictly guaranteed?",
      options: [
        "Across all topics globally",
        "Only within an individual partition of a topic",
        "Across all consumer groups",
        "Only in RAM memory buffers"
      ],
      correctAnswer: "Only within an individual partition of a topic",
      explanation: "Kafka guarantees strict sequential ordering strictly per partition. To preserve order for a specific entity (like a customer), all related messages must share the same partition key."
    }
  },
  {
    id: "system-design-distributed-rate-limiter",
    title: "Designing a Distributed Rate Limiter at 1,000,000 QPS",
    category: "System Design",
    description: "Build an API rate limiter using Token Bucket, Leaky Bucket, and Redis Sliding Window Log/Counter to protect systems from DDoS attacks and API quota abuse.",
    route: "/lessons/system-design-distributed-rate-limiter",
    order: 5,
    duration: "50 min advanced lab",
    difficulty: "Advanced",
    keySkills: ["Token Bucket Algorithm", "Leaky Bucket Algorithm", "Redis Sliding Window Counter", "Lua Atomic Scripts", "HTTP 429 Too Many Requests"],
    trackId: "system-design",
    content: {
      overview: "A rate limiter limits the rate at which network requests are processed. It prevents denial-of-service (DDoS) attacks, stops web scrapers, and enforces monetized API tier limits (e.g. 100 requests/minute).",
      sections: [
        {
          title: "1. The Token Bucket Algorithm",
          explanation: "• A bucket has a maximum capacity (e.g. 10 tokens) and is refilled with tokens at a steady rate (e.g. 2 tokens/sec).\n• Each request takes 1 token. If tokens are available, request proceeds.\n• If the bucket is empty, request is dropped with HTTP 429 Too Many Requests.\n• Token Bucket allows short bursts of traffic while enforcing average rate limits.",
          codeSnippet: "-- Redis Lua Script for Atomic Sliding Window Rate Limiter\n-- Prevents race conditions between concurrent servers\nlocal key = KEYS[1]\nlocal now = tonumber(ARGV[1])\nlocal window = tonumber(ARGV[2])\nlocal limit = tonumber(ARGV[3])\nlocal clearBefore = now - window\n\nredis.call('ZREMRANGEBYSCORE', key, 0, clearBefore)\nlocal currentRequests = redis.call('ZCARD', key)\n\nif currentRequests < limit then\n    redis.call('ZADD', key, now, now)\n    redis.call('EXPIRE', key, math.ceil(window / 1000))\n    return 1 -- Allowed\nelse\n    return 0 -- Rejected (HTTP 429)\nend",
          language: "lua",
          takeaways: [
            "Always execute rate-limiting logic using Redis Lua scripts or atomic increments to prevent concurrency race conditions.",
            "Return HTTP headers `X-RateLimit-Limit`, `X-RateLimit-Remaining`, and `Retry-After` to assist API clients."
          ]
        }
      ]
    },
    quiz: {
      question: "Which HTTP status code should a server return when a client exceeds their allocated API rate limit?",
      options: ["400 Bad Request", "401 Unauthorized", "429 Too Many Requests", "503 Service Unavailable"],
      correctAnswer: "429 Too Many Requests",
      explanation: "RFC 6585 defines HTTP 429 Too Many Requests specifically for rate-limiting rejections, usually accompanied by a `Retry-After` header."
    }
  },
  {
    id: "system-design-sharding-cap",
    title: "Database Sharding, Replication & CAP Theorem Tradeoffs",
    category: "System Design",
    description: "Scale databases beyond a single machine with Horizontal Sharding, Master-Slave Read Replicas, CAP Theorem tradeoffs (CP vs AP), and PACELC.",
    route: "/lessons/system-design-sharding-cap",
    order: 6,
    duration: "52 min advanced lab",
    difficulty: "Advanced",
    keySkills: ["Horizontal Database Sharding", "Shard Key Selection", "Read Replicas & Replication Lag", "CAP Theorem (Consistency vs Availability)", "Eventual Consistency"],
    trackId: "system-design",
    content: {
      overview: "When a relational database reaches terabytes of data and 50,000 writes/second, a single server cannot keep up. Sharding splits data across multiple database instances based on a Shard Key.",
      sections: [
        {
          title: "1. The CAP Theorem in Real Distributed Systems",
          explanation: "In any distributed asynchronous network where network partitions (P) are inevitable, you must choose between:\n• Consistency (C): Every read receives the most recent write or an error (e.g. Google Spanner, CockroachDB, Bank transfers).\n• Availability (A): Every non-failing node returns a response, but it may not be the newest write (e.g. Cassandra, DynamoDB, Social media feeds).",
          codeSnippet: "// Shard Routing Function in Microservice Gateway\nfunction getDatabaseShardConnection(userId: string) {\n    // Consistent Hash of userId maps to Shard DB 1, 2, or 3\n    const hash = murmurHash3(userId);\n    const shardIndex = hash % TOTAL_SHARDS;\n    return dbPools[shardIndex];\n}",
          language: "ts",
          takeaways: [
            "Choosing the wrong Shard Key causes 'Hot Shard' bottlenecks (e.g. sharding by country causes the US/India shard to melt while others sit idle).",
            "Read replicas scale read queries linearly, but introduce Replication Lag (reading slightly stale data for a few milliseconds)."
          ]
        }
      ]
    },
    quiz: {
      question: "According to the CAP Theorem, when a network partition (P) occurs between distributed database nodes, what choice must the system make?",
      options: [
        "Increase CPU clock speed automatically",
        "Choose between returning consistent latest data (C) or guaranteeing available responses (A)",
        "Switch from SQL to Excel",
        "Delete all stored data"
      ],
      correctAnswer: "Choose between returning consistent latest data (C) or guaranteeing available responses (A)",
      explanation: "Because physical network partitions are unavoidable in distributed systems, a system can either cancel operations to guarantee consistency (CP) or proceed with local data to guarantee availability (AP)."
    }
  }
];

// Track 4.3: Production Capstone & Industry Portfolio (Year 4)
const internshipSprintLessons: CurriculumLesson[] = [
  {
    id: "internship-modern-web-stack",
    title: "Production Architecture: Monorepos, Auth & Deployment",
    category: "Production Capstone",
    description: "Build a production-grade full-stack project with secure auth, database schema, and live cloud deployment.",
    route: "/lessons/internship-modern-web-stack",
    order: 1,
    duration: "48 min comprehensive lab",
    difficulty: "Advanced",
    keySkills: ["Production Auth", "Cloud Hosting (Vercel/AWS)", "Environment Variables", "Security Best Practices"],
    trackId: "internship-sprint",
    content: {
      overview: "Recruiters and hiring managers want to see live deployed projects with real user authentication rather than tutorial clones.",
      sections: [
        {
          title: "Production Deployment Checklist",
          explanation: "Secure API keys using `.env.local`, set up authentication tokens with HTTP-only cookies, and deploy with continuous deployment.",
          codeSnippet: "// Accessing protected environment variables safely\nconst DB_URL = process.env.DATABASE_URL;\nif (!DB_URL) {\n    throw new Error(\"DATABASE_URL must be configured before startup!\");\n}",
          language: "ts",
          takeaways: [
            "Never commit secrets, API keys, or passwords to Git.",
            "A live working URL on your resume gets 5x more recruiter callbacks."
          ]
        }
      ]
    },
    quiz: {
      question: "Where should sensitive database passwords and API keys always be stored?",
      options: [
        "Directly inside public frontend JavaScript files",
        "In protected environment variables (.env) that are ignored by Git",
        "In the README.md file",
        "In a public GitHub gist"
      ],
      correctAnswer: "In protected environment variables (.env) that are ignored by Git",
      explanation: "Environment variables keep sensitive credentials safe and out of version-controlled source code."
    }
  },
  {
    id: "internship-git-github-collaboration",
    title: "Open Source, Pull Requests & Engineering Resume",
    category: "Production Capstone",
    description: "Learn professional open source workflows: forking, branch synchronization, pull request reviews, interactive rebase, and crafting a standout engineering GitHub profile.",
    route: "/lessons/internship-git-github-collaboration",
    order: 2,
    duration: "48 min comprehensive lab",
    difficulty: "Intermediate",
    keySkills: ["Open Source Fork & Upstream", "Pull Request Lifecycle", "Interactive Rebase & Squash", "CI/CD Status Checks", "ATS Portfolio Optimization"],
    trackId: "internship-sprint",
    content: {
      overview: "Your code is your ultimate resume. In top tech companies, software is built by teams through code reviews and Pull Requests (PRs). Mastering how to contribute to open source, draft professional pull requests, resolve reviewer feedback, and showcase your GitHub repositories proves to engineering managers that you can contribute on Day 1 without hand-holding.",
      sections: [
        {
          title: "1. Open Source Collaboration: Forking, Cloning & Upstream Remotes",
          explanation: "When contributing to public open source projects (or large enterprise repositories where you lack direct push permissions), you follow the Fork & Pull model:\n\n1. Fork: Click 'Fork' on GitHub to create your personal copy of the repository under your GitHub account.\n2. Clone: Download your fork to your local machine: 'git clone git@github.com:yourusername/project.git'.\n3. Configure Upstream: By default, your remote 'origin' points to your fork. You must link to the original project as 'upstream': 'git remote add upstream git@github.com:original-org/project.git'.\n4. Syncing Fork: Before writing code, always pull the latest changes from upstream: 'git fetch upstream && git merge upstream/main' to prevent branch drift.",
          codeSnippet: "# 1. Clone your fork locally\ngit clone git@github.com:yourusername/open-source-app.git\ncd open-source-app\n\n# 2. Add upstream remote pointing to the official repository\ngit remote add upstream git@github.com:facebook/react.git\ngit remote -v\n\n# 3. Keep your local main in sync with upstream\ngit checkout main\ngit fetch upstream\ngit merge upstream/main\ngit push origin main",
          language: "bash",
          takeaways: [
            "'origin' is your personal fork; 'upstream' is the official maintainer repository.",
            "Always sync with upstream before creating a new feature branch."
          ]
        },
        {
          title: "2. The Pull Request (PR) Lifecycle: From Branch to Production Merge",
          explanation: "A Pull Request (PR) is an official proposal asking project maintainers to review, test, and merge your code into their main codebase.\n\nAnatomy of an Elite Pull Request:\n• Clear, Actionable Title: e.g. 'feat(auth): add OAuth2 Google login button' (avoid vague titles like 'updates' or 'fixed stuff').\n• Problem Statement (Context): What bug or feature does this solve?\n• Proposed Solution: High-level architectural decisions and trade-offs.\n• Testing Evidence: Console logs, automated test results, or before/after visual screenshots.\n• Issue Linkage: Type 'Closes #142' or 'Fixes #89' in the PR description — GitHub automatically closes the corresponding issue once the PR is merged!",
          codeSnippet: "# 1. Create a descriptive feature branch\ngit checkout -b fix/issue-142-token-refresh\n\n# 2. Implement your changes and commit\ngit add src/auth/token.ts\ngit commit -m \"fix(auth): handle expired refresh token grace period\"\n\n# 3. Push branch to your GitHub fork\ngit push -u origin fix/issue-142-token-refresh\n\n# 4. Visit GitHub URL printed in terminal to open Pull Request with 1-click!",
          language: "bash",
          takeaways: [
            "Link issues using 'Closes #ID' or 'Fixes #ID' to automate project board tracking.",
            "Include visual screenshots or test outputs in PR descriptions to speed up code reviews."
          ]
        },
        {
          title: "3. Advanced Git Craft: Interactive Rebase, Squash Merging & Git Stash",
          explanation: "Professional teams value a clean, linear commit history over messy 'wip', 'fixed typo', 'oops' commits.\n\n• Interactive Rebase (git rebase -i): Lets you combine (squash), reword, or delete past commits before opening a pull request. Running 'git rebase -i HEAD~3' opens an editor to squash 3 commits into 1 clean atomic commit.\n• Git Stash: Temporarily stashes uncommitted modifications on a shelf so you can switch branches to investigate an urgent production issue without committing unfinished code: 'git stash' saves work, and 'git stash pop' restores it.",
          codeSnippet: "# 1. Temporarily stash uncommitted changes to switch branches\ngit stash save \"wip: half-finished payment gateway\"\ngit checkout main\n# ...fix critical bug...\ngit checkout feature-payments\ngit stash pop\n\n# 2. Interactive rebase to clean up your last 3 commits\ngit rebase -i HEAD~3\n# Change 'pick' to 'squash' (or 's') on the 2nd and 3rd lines to merge into the first!",
          language: "bash",
          takeaways: [
            "Use 'git stash' to safely park uncommitted experiments when switching tasks.",
            "Interactive rebase allows you to squash messy draft commits into 1 pristine commit for review."
          ]
        },
        {
          title: "4. Automated Quality Control: GitHub Actions & Status Checks",
          explanation: "Top open-source repositories use GitHub Actions to enforce automated quality gates on every Pull Request before any human reviewer looks at the code:\n\n• Continuous Integration (CI): Robots spawn a clean Ubuntu virtual machine, install dependencies, run code linters (ESLint, Prettier), and run the test suite.\n• Status Checks: A green checkmark (✓ All checks have passed) proves your code did not break existing features. A red cross (✗ Tests failed) highlights bugs immediately.\n• Branch Protection Rules: Maintainers configure GitHub so nobody (not even admins) can merge code unless all automated CI checks pass and at least 1 peer approval is submitted.",
          codeSnippet: "# Example GitHub Actions status check config (.github/workflows/pr-check.yml)\nname: PR Verification Gate\non: [pull_request]\njobs:\n  verify:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: 20\n      - run: npm ci\n      - run: npm run lint\n      - run: npm test",
          language: "yaml",
          takeaways: [
            "Always run linters and tests locally before pushing to avoid failing automated CI checks in public.",
            "Branch protection rules guarantee that production main branches remain deployable at all times."
          ]
        },
        {
          title: "5. Crafting a Recruiter-Ready GitHub Profile & ATS Resume",
          explanation: "Your GitHub profile is your live engineering resume. Hiring managers and technical recruiters review your GitHub to verify whether you write real software or just copy tutorials.\n\nElements of an Elite Engineering Profile:\n1. Profile README: Create a repository named exactly after your GitHub username (e.g. 'rahim/rahim'). Add an introduction, tech stack badges, GitHub stats card, and social links.\n2. Pin Your Top 4-6 Capstone Projects: Don't let recruiters dig through 50 abandoned class repos. Pin production-grade projects with live demo URLs, architecture diagrams, and comprehensive READMEs.\n3. Translating GitHub to an ATS Resume: Use the Google X-Y-Z formula: 'Accomplished [X] as measured by [Y] by doing [Z]'. Example: 'Engineered real-time collaborative code editor using Next.js, WebSockets, and Redis, reducing latency by 45% for 2,000+ concurrent active sessions.'",
          codeSnippet: "# 🚀 Project Name\n> A production-grade real-time collaborative workspace built with Next.js, WebSockets, and Redis.\n\n[Live Demo](https://my-app.vercel.app) • [API Docs](./docs/api.md) • [Architecture](./docs/architecture.md)\n\n### Key Technical Highlights\n- **Sub-50ms Latency**: Built on persistent WebSockets with pub/sub Redis clusters.\n- **Optimistic UI Updates**: Conflict-free replicated data types (CRDTs) for concurrent editing.\n- **Automated CI/CD**: 100% test coverage verified with GitHub Actions.",
          language: "markdown",
          takeaways: [
            "Every pinned repository must have a live working link and a descriptive README.",
            "Use metrics and architectural decisions on your resume instead of generic tool lists."
          ]
        }
      ]
    },
    quiz: {
      question: "What makes an engineering project stand out most to hiring managers on a resume?",
      options: [
        "Saying that you copied it from a YouTube tutorial",
        "A live deployed link, clear documentation of choices made, and quantifiable impact",
        "Writing 10,000 lines of messy code without comments",
        "Hiding the source code"
      ],
      correctAnswer: "A live deployed link, clear documentation of choices made, and quantifiable impact",
      explanation: "Hiring managers look for practical execution: live working demos, thoughtful engineering, and well-documented repositories."
    }
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// ADVANCED COMPUTER SCIENCE CURRICULUM TRACKS (EXTREMELY ADVANCED)
// ─────────────────────────────────────────────────────────────────────────────

// Track 5.1: Advanced Algorithms, Graphs & Complexity (Core CS / Advanced)
const advancedAlgorithmsLessons: CurriculumLesson[] = [
  {
    id: "dsa-segment-fenwick-trees",
    title: "Segment Trees & Fenwick Trees: O(log N) Range Queries",
    category: "Advanced Data Structures",
    description: "Master dynamic range queries (RMQ, Range Sum, Range GCD) with Point and Lazy Propagation updates.",
    route: "/lessons/dsa-segment-fenwick-trees",
    order: 1,
    duration: "50 min deep-dive lab",
    difficulty: "Advanced",
    keySkills: ["Segment Trees", "Lazy Propagation", "Fenwick Trees (BIT)", "Range Minimum Queries", "O(log N) Complexity"],
    trackId: "advanced-algorithms-theory",
    content: {
      overview: "Standard arrays take O(N) for range queries and O(1) for updates; prefix sum arrays take O(1) for queries but O(N) for updates. Segment Trees and Fenwick Trees (Binary Indexed Trees) balance both operations in O(log N) time, making them indispensable for high-frequency trading engines and competitive programming.",
      sections: [
        {
          title: "1. The Range Query Dilemma: Balancing Updates and Queries",
          explanation: "In real-time systems, we constantly query aggregate values over intervals [L, R] while streaming concurrent point or range updates. A naive array achieves O(1) updates but O(N) queries. A static prefix sum array achieves O(1) queries but O(N) updates. The Segment Tree constructs a binary tree where each node represents an interval aggregate, guaranteeing O(log N) updates and O(log N) queries.",
          codeSnippet: `// C++ / C Segment Tree Implementation (Range Sum with Point Update)
#include <stdio.h>
#define MAXN 100005

int tree[4 * MAXN];
int arr[MAXN];

void build(int node, int start, int end) {
    if (start == end) {
        tree[node] = arr[start];
        return;
    }
    int mid = (start + end) / 2;
    build(2 * node, start, mid);
    build(2 * node + 1, mid + 1, end);
    tree[node] = tree[2 * node] + tree[2 * node + 1];
}

void update(int node, int start, int end, int idx, int val) {
    if (start == end) {
        arr[idx] = val;
        tree[node] = val;
        return;
    }
    int mid = (start + end) / 2;
    if (idx <= mid) update(2 * node, start, mid, idx, val);
    else update(2 * node + 1, mid + 1, end, idx, val);
    tree[node] = tree[2 * node] + tree[2 * node + 1];
}

int query(int node, int start, int end, int l, int r) {
    if (r < start || end < l) return 0; // Out of range
    if (l <= start && end <= r) return tree[node]; // Completely inside
    int mid = (start + end) / 2;
    return query(2 * node, start, mid, l, r) + query(2 * node + 1, mid + 1, end, l, r);
}`,
          language: "c",
          takeaways: [
            "A Segment Tree over an array of size N requires 4N space.",
            "Lazy Propagation defers interval updates to child nodes until accessed, maintaining O(log N) range updates."
          ]
        },
        {
          title: "2. Binary Indexed Tree (Fenwick Tree): Memory-Efficient Prefix Trees",
          explanation: "Invented by Peter Fenwick, the Fenwick Tree calculates prefix sums in O(log N) using only O(N) auxiliary space. It operates by stripping off the least significant set bit (LSB) using the bitwise identity (x & -x).",
          codeSnippet: `// Fenwick Tree (Binary Indexed Tree) in C
#include <stdio.h>

int bit[100005];
int n = 100000;

void bit_update(int idx, int delta) {
    for (; idx <= n; idx += idx & -idx)
        bit[idx] += delta;
}

int bit_query(int idx) {
    int sum = 0;
    for (; idx > 0; idx -= idx & -idx)
        sum += bit[idx];
    return sum;
}

int bit_range_query(int l, int r) {
    return bit_query(r) - bit_query(l - 1);
}`,
          language: "c",
          takeaways: [
            "Fenwick tree code is exceptionally compact (under 10 lines of C).",
            "Relies on two's complement bitwise arithmetic (x & -x) to navigate ancestor nodes."
          ]
        }
      ]
    },
    quiz: {
      question: "What is the time complexity of a range query on a Segment Tree with N elements?",
      options: [
        "O(1)",
        "O(log N)",
        "O(N)",
        "O(N log N)"
      ],
      correctAnswer: "O(log N)",
      explanation: "A segment tree visits at most 4 nodes per tree level, yielding O(log N) worst-case time."
    }
  },
  {
    id: "dsa-graphs-tarjan-dsu",
    title: "Graph Algorithms: DSU, Tarjan SCC & Network Flow",
    category: "Advanced Graph Theory",
    description: "Master Disjoint Set Union with path compression, Tarjan's Strongly Connected Components, and Ford-Fulkerson Max Flow.",
    route: "/lessons/dsa-graphs-tarjan-dsu",
    order: 2,
    duration: "52 min advanced masterclass",
    difficulty: "Advanced",
    keySkills: ["Disjoint Set Union (DSU)", "Ackermann Inverse O(alpha)", "Tarjan's SCC Algorithm", "Low-Link Values", "Max-Flow Min-Cut"],
    trackId: "advanced-algorithms-theory",
    content: {
      overview: "Real-world network routing, social networks, and static code analyzers depend on advanced graph decomposition: connected component clustering in near O(1) time and identifying circular dependencies via Strongly Connected Components.",
      sections: [
        {
          title: "1. Disjoint Set Union (DSU) with Path Compression & Union by Rank",
          explanation: "DSU maintains dynamic partitions of disjoint sets. Using path compression (flattening tree pointers directly to the root during find) and union by rank (attaching the shallower tree under the deeper tree), operations run in O(alpha(N)) amortized time, where alpha is the inverse Ackermann function (effectively <= 4 for all practical universe sizes).",
          codeSnippet: `// Disjoint Set Union (DSU) in C
#include <stdio.h>

int parent[100005];
int rank_sz[100005];

void dsu_init(int n) {
    for (int i = 0; i <= n; i++) {
        parent[i] = i;
        rank_sz[i] = 1;
    }
}

int dsu_find(int i) {
    if (parent[i] == i) return i;
    return parent[i] = dsu_find(parent[i]); // Path compression
}

void dsu_union(int i, int j) {
    int root_i = dsu_find(i);
    int root_j = dsu_find(j);
    if (root_i != root_j) {
        if (rank_sz[root_i] < rank_sz[root_j]) {
            parent[root_i] = root_j;
        } else if (rank_sz[root_i] > rank_sz[root_j]) {
            parent[root_j] = root_i;
        } else {
            parent[root_j] = root_i;
            rank_sz[root_i]++;
        }
    }
}`,
          language: "c",
          takeaways: [
            "Path compression flattens tree depth to 1 on subsequent lookups.",
            "Inverse Ackermann complexity alpha(N) is practically constant time."
          ]
        },
        {
          title: "2. Tarjan's Strongly Connected Components (SCC) in O(V + E)",
          explanation: "A Strongly Connected Component in a directed graph is a maximal subgraph where every vertex is reachable from every other vertex. Tarjan's algorithm computes SCCs in a single DFS pass using discovery timestamps and low-link values (lowest timestamp reachable via back-edges).",
          codeSnippet: `// High-level Tarjan SCC logic in Python
def tarjan_scc(adj, n):
    index = 0
    indices = [-1] * n
    lowlink = [-1] * n
    on_stack = [False] * n
    stack = []
    sccs = []

    def strongconnect(v):
        nonlocal index
        indices[v] = lowlink[v] = index
        index += 1
        stack.append(v)
        on_stack[v] = True

        for w in adj[v]:
            if indices[w] == -1:
                strongconnect(w)
                lowlink[v] = min(lowlink[v], lowlink[w])
            elif on_stack[w]:
                lowlink[v] = min(lowlink[v], indices[w])

        if lowlink[v] == indices[v]:
            scc = []
            while True:
                w = stack.pop()
                on_stack[w] = False
                scc.append(w)
                if w == v: break
            sccs.append(scc)

    for i in range(n):
        if indices[i] == -1:
            strongconnect(i)
    return sccs`,
          language: "python",
          takeaways: [
            "Tarjan runs in O(V + E) time with a single DFS pass.",
            "Condensing SCCs produces an acyclic Directed Acyclic Graph (DAG) used in topological compiler passes."
          ]
        }
      ]
    },
    quiz: {
      question: "What is the amortized time complexity of DSU operations with both path compression and union by rank?",
      options: [
        "O(1) strict",
        "O(alpha(N)) where alpha is inverse Ackermann",
        "O(log N)",
        "O(N)"
      ],
      correctAnswer: "O(alpha(N)) where alpha is inverse Ackermann",
      explanation: "Combining path compression with union by rank guarantees nearly constant O(alpha(N)) amortized time."
    }
  },
  {
    id: "cs-theory-automata-turing",
    title: "Theory of Computation: Automata, Turing Machines & P vs NP",
    category: "Theoretical Computer Science",
    description: "Deep foundation of computation: Deterministic Finite Automata (DFA), Context-Free Grammars, Turing Equivalence, Decidability, and NP-Completeness.",
    route: "/lessons/cs-theory-automata-turing",
    order: 3,
    duration: "55 min theoretical masterclass",
    difficulty: "Advanced",
    keySkills: ["DFA & NFA Equivalence", "Pumping Lemma", "Chomsky Hierarchy", "Turing Machines", "Halting Problem Undecidability", "P vs NP & Cook-Levin"],
    trackId: "advanced-algorithms-theory",
    content: {
      overview: "Theoretical computer science defines what can and cannot be computed by physical machines. From regular expressions and lexers to compiler pushdown automata and the fundamental limits of algorithms (the Halting Problem and P vs NP).",
      sections: [
        {
          title: "1. The Chomsky Hierarchy & State Machines",
          explanation: "Languages are classified into four nested tiers:\n1. Regular Languages (Type 3): Recognized by Finite Automata (no auxiliary memory; used in regex and tokenizers).\n2. Context-Free Languages (Type 2): Recognized by Pushdown Automata (stack memory; used for programming language grammars).\n3. Context-Sensitive Languages (Type 1): Linear bounded automata.\n4. Recursively Enumerable Languages (Type 0): Recognized by Turing Machines (unbounded tape memory).",
          codeSnippet: `// DFA State Machine in Python (Recognizes binary numbers divisible by 3)
class DivisibleByThreeDFA:
    def __init__(self):
        # States: Remainder 0 (start/accept), Remainder 1, Remainder 2
        self.state = 0

    def transition(self, bit: str):
        # In binary: new_val = (old_val * 2 + bit) % 3
        b = int(bit)
        self.state = (self.state * 2 + b) % 3

    def accepts(self, binary_string: str) -> bool:
        self.state = 0
        for bit in binary_string:
            self.transition(bit)
        return self.state == 0

dfa = DivisibleByThreeDFA()
print("110 (6 in decimal) ->", dfa.accepts("110")) # True
print("101 (5 in decimal) ->", dfa.accepts("101")) # False`,
          language: "python",
          takeaways: [
            "Every NFA can be converted to an equivalent DFA via powerset construction.",
            "The Pumping Lemma is used to prove that a language is NOT regular (e.g. 0^n 1^n requires stack memory)."
          ]
        },
        {
          title: "2. The Halting Problem, Undecidability & P vs NP",
          explanation: "Alan Turing proved in 1936 that no universal program can determine whether an arbitrary program and input will halt or run forever. This established that fundamental undecidable problems exist.\n\nIn computational complexity:\n• P: Problems solvable in polynomial time O(N^k) by a deterministic Turing machine.\n• NP: Problems whose solutions can be verified in polynomial time.\n• NP-Complete: The hardest problems in NP (e.g. 3-SAT, Traveling Salesperson, Hamiltonian Cycle). If any NP-Complete problem is solvable in P, then P = NP.",
          codeSnippet: `// Turing's Diagonalization Proof of the Halting Problem:
// Suppose halts(program, input) returns True if program(input) halts, False otherwise.
// Define:
// def opposite(program):
//     if halts(program, program):
//         while True: pass # Loop forever!
//     else:
//         return True      # Halt immediately!
//
// What happens when we evaluate opposite(opposite)?
// - If it halts, it must loop forever (contradiction).
// - If it loops forever, it must halt (contradiction).
// Therefore, the halts function cannot exist in mathematics!`,
          language: "python",
          takeaways: [
            "The Halting Problem proves that static program analysis can never be 100% complete and sound.",
            "Cook-Levin Theorem proved that Boolean Satisfiability (SAT) is NP-Complete."
          ]
        }
      ]
    },
    quiz: {
      question: "Which of the following problems was mathematically proven to be undecidable by Alan Turing?",
      options: [
        "Sorting an array of N integers",
        "Finding shortest path in a weighted graph",
        "The Halting Problem (determining if an arbitrary program halts)",
        "Parsing a context-free grammar"
      ],
      correctAnswer: "The Halting Problem (determining if an arbitrary program halts)",
      explanation: "Alan Turing used a diagonalization proof in 1936 to prove that no algorithm can decide whether every arbitrary program halts."
    }
  }
];

// Track 5.2: Kernel Architecture, Concurrency & Low-Level Systems
const kernelSystemsLessons: CurriculumLesson[] = [
  {
    id: "sys-cpu-cache-mesi",
    title: "Computer Architecture: CPU Caches, MESI & Memory Barriers",
    category: "Computer Architecture",
    description: "Understand hardware latency tiers (L1/L2/L3), cache lines (64 bytes), False Sharing, MESI protocol, and CPU memory reordering.",
    route: "/lessons/sys-cpu-cache-mesi",
    order: 1,
    duration: "48 min deep systems lab",
    difficulty: "Advanced",
    keySkills: ["L1/L2/L3 Cache Hierarchy", "64-byte Cache Lines", "False Sharing & Alignment", "MESI Coherence Protocol", "Memory Barriers (MFENCE/Acquire-Release)"],
    trackId: "kernel-systems-internals",
    content: {
      overview: "CPUs execute billions of instructions per second, but RAM access takes ~100 nanoseconds (~200 CPU cycles). To bridge this latency gap, multi-core CPUs use multi-level hardware caches (L1 ~1ns, L2 ~4ns, L3 ~20ns) governed by the MESI cache coherence protocol.",
      sections: [
        {
          title: "1. The Memory Latency Hierarchy & False Sharing",
          explanation: "CPUs read and write memory in 64-byte chunks called cache lines. When two independent threads on different CPU cores modify adjacent variables that reside in the same 64-byte cache line, the CPU cores constantly invalidate each other's L1/L2 caches across the interconnect bus. This catastrophic performance degradation is known as False Sharing.",
          codeSnippet: `// Demonstrating False Sharing Prevention in C11
#include <stdio.h>
#include <pthread.h>

// BAD: Both threads increment adjacent integers in the same 64-byte cache line!
struct BadCounter {
    volatile int count1; // 4 bytes
    volatile int count2; // 4 bytes (Shares same 64-byte cache line!)
};

// GOOD: Explicit cache-line alignment prevents false sharing across CPU cores
struct GoodCounter {
    volatile int count1 __attribute__((aligned(64))); // Own 64-byte cache line
    volatile int count2 __attribute__((aligned(64))); // Own 64-byte cache line
};`,
          language: "c",
          takeaways: [
            "Hardware operates on 64-byte cache lines, not individual bytes.",
            "Use __attribute__((aligned(64))) or alignas(64) on multi-threaded shared counters to eliminate false sharing."
          ]
        },
        {
          title: "2. The MESI Cache Coherence Protocol & Memory Barriers",
          explanation: "Modern multi-core processors maintain cache coherence through the MESI protocol states:\n• Modified (M): Line is present only in current cache and is dirty (must be written back to RAM).\n• Exclusive (E): Line is present only in current cache and is clean.\n• Shared (S): Line is present in multiple caches and is read-only.\n• Invalid (I): Line contains stale data and cannot be read.\n\nBecause modern CPUs execute instructions out-of-order, memory barriers (fences) are required to prevent speculative reordering across CPU pipelines.",
          codeSnippet: `// Acquire-Release Memory Semantics in C11 (<stdatomic.h>)
#include <stdatomic.h>
#include <stdbool.h>

atomic_int data = 0;
atomic_bool ready = false;

// Producer Thread:
void producer() {
    atomic_store_explicit(&data, 42, memory_order_relaxed);
    // memory_order_release guarantees 'data' write finishes before 'ready' is published
    atomic_store_explicit(&ready, true, memory_order_release);
}

// Consumer Thread:
int consumer() {
    // memory_order_acquire guarantees reading 'data' will see 42 if 'ready' is true
    while (!atomic_load_explicit(&ready, memory_order_acquire));
    return atomic_load_explicit(&data, memory_order_relaxed);
}`,
          language: "c",
          takeaways: [
            "Acquire-Release semantics avoid costly full hardware bus locks (MFENCE) while guaranteeing happens-before ordering.",
            "Relaxed memory order allows the hardware compiler to optimize instructions without cross-thread guarantees."
          ]
        }
      ]
    },
    quiz: {
      question: "What is 'False Sharing' in multi-core computer architecture?",
      options: [
        "Two threads sharing a single mutex incorrectly",
        "Two threads on different CPU cores modifying independent variables that reside within the same 64-byte cache line",
        "Operating system allocating memory from the swap partition instead of RAM",
        "Cache eviction caused by full disk storage"
      ],
      correctAnswer: "Two threads on different CPU cores modifying independent variables that reside within the same 64-byte cache line",
      explanation: "False sharing occurs when independent variables share a 64-byte cache line, forcing cache coherence invalidation ping-pongs across cores."
    }
  },
  {
    id: "sys-lock-free-concurrency",
    title: "Lock-Free Concurrency: Atomics, Compare-And-Swap & RCU",
    category: "Low-Level Systems",
    description: "Build ultra-low latency concurrent systems: Atomic operations, Compare-And-Swap (CAS), ABA problem, and Read-Copy-Update (RCU).",
    route: "/lessons/sys-lock-free-concurrency",
    order: 2,
    duration: "50 min deep systems lab",
    difficulty: "Advanced",
    keySkills: ["Compare-And-Swap (CAS)", "Lock-Free Stacks (Treiber Stack)", "ABA Problem & Tagged Pointers", "Read-Copy-Update (RCU)", "Hazard Pointers"],
    trackId: "kernel-systems-internals",
    content: {
      overview: "Standard OS mutexes put threads to sleep via kernel context switches (taking 2,000+ CPU cycles). High-frequency trading systems, the Linux kernel, and game engines utilize Lock-Free programming powered by hardware Compare-And-Swap (CAS) instructions.",
      sections: [
        {
          title: "1. The Compare-And-Swap (CAS) Primitive & Treiber Stack",
          explanation: "Hardware atomic instructions like `CMPXCHG` on x86 compare the contents of a memory location to an expected value, and only if they match, modify the contents to a new value atomically in a single clock cycle.",
          codeSnippet: `// Lock-Free Treiber Stack in C11
#include <stdatomic.h>
#include <stdlib.h>

typedef struct Node {
    int value;
    struct Node *next;
} Node;

typedef struct {
    _Atomic(Node *) head;
} LockFreeStack;

void stack_push(LockFreeStack *s, int val) {
    Node *new_node = (Node *)malloc(sizeof(Node));
    new_node->value = val;
    new_node->next = atomic_load(&s->head);

    // Atomically swap head if it still matches new_node->next.
    // If another thread modified head in the meantime, CAS fails and loops!
    while (!atomic_compare_exchange_weak(&s->head, &new_node->next, new_node));
}`,
          language: "c",
          takeaways: [
            "Lock-free code guarantees that at least one thread always makes forward progress.",
            "Compare-and-swap handles concurrent contention without ever putting threads to sleep."
          ]
        },
        {
          title: "2. The ABA Problem & Read-Copy-Update (RCU)",
          explanation: "The ABA problem occurs when a thread reads value A, is preempted, another thread changes A to B and back to A, and the original thread performs a CAS expecting nothing changed. Solved using Hazard Pointers or tagged versions.\n\nRead-Copy-Update (RCU): The synchronization mechanism used throughout the Linux kernel. Readers execute with zero lock overhead (pure memory reads). Writers make a copy of the structure, mutate the copy, atomically swap the pointer, and defer freeing the old copy until all active readers finish their grace period.",
          codeSnippet: `// Linux Kernel RCU Conceptual Model
// Reader: Zero-lock, pure pointer dereference
// rcu_read_lock();
// struct node *p = rcu_dereference(global_ptr);
// use_data(p);
// rcu_read_unlock();

// Writer: Copy on write, atomic publish, defer free
// struct node *new_p = malloc(sizeof(*new_p));
// *new_p = *old_p;
// new_p->value = 999;
// rcu_assign_pointer(global_ptr, new_p);
// synchronize_rcu(); // Wait for all active readers to finish
// free(old_p);`,
          language: "c",
          takeaways: [
            "RCU achieves near-infinite read scalability because readers never block and execute zero atomic instructions.",
            "Writers pay the cost of memory copying and grace period coordination."
          ]
        }
      ]
    },
    quiz: {
      question: "What core hardware instruction powers lock-free data structures across modern CPUs?",
      options: [
        "Mutex Lock (MUTEX_LOCK)",
        "Compare-And-Swap (CAS / CMPXCHG)",
        "Software Interrupt 0x80",
        "Disk Flush (FSYNC)"
      ],
      correctAnswer: "Compare-And-Swap (CAS / CMPXCHG)",
      explanation: "Compare-And-Swap atomically validates that a memory address contains an expected value before swapping it, enabling lock-free concurrency."
    }
  }
];

// Track 5.3: Distributed Systems, Consensus & Fault Tolerance
const distributedConsensusLessons: CurriculumLesson[] = [
  {
    id: "dist-consensus-raft-paxos",
    title: "Distributed Consensus: Raft & Paxos Step-by-Step",
    category: "Distributed Systems",
    description: "Understand state machine replication, leader election, log replication, safety invariants, and split-brain resolution in Raft and Paxos.",
    route: "/lessons/dist-consensus-raft-paxos",
    order: 1,
    duration: "52 min comprehensive lab",
    difficulty: "Advanced",
    keySkills: ["State Machine Replication", "Raft Leader Election", "Log Replication & Quorums", "Split-Brain Resolution", "Paxos Consensus"],
    trackId: "distributed-systems-consensus",
    content: {
      overview: "In a distributed cluster of N nodes where network partitions, packet drops, and node crashes are inevitable, how do nodes agree on a single source of truth? Distributed Consensus protocols (Paxos and Raft) power Kubernetes (etcd), ZooKeeper, and Kafka metadata.",
      sections: [
        {
          title: "1. The Consensus Problem & Raft Leader Election",
          explanation: "Raft decomposes consensus into three independent subproblems:\n1. Leader Election: A cluster requires a majority quorum (e.g. 3 of 5 nodes). Nodes begin as Followers with randomized election timeouts (150ms-300ms). When a timeout expires without receiving heartbeats, the follower converts to Candidate and requests votes.\n2. Log Replication: The elected leader receives client writes, appends them to its local log, broadcasts `AppendEntries` RPCs, and commits entries once acknowledged by a majority.\n3. Safety: A candidate can only win an election if its log is at least as up-to-date as any other majority member.",
          codeSnippet: `// Raft Node State Transitions in Go
type NodeState int

const (
    Follower NodeState = iota
    Candidate
    Leader
)

type RaftNode struct {
    mu          sync.Mutex
    id          int
    currentTerm int
    votedFor    int
    log         []LogEntry
    state       NodeState
    commitIndex int
}

func (rf *RaftNode) RequestVote(args *RequestVoteArgs, reply *RequestVoteReply) {
    rf.mu.Lock()
    defer rf.mu.Unlock()

    if args.Term > rf.currentTerm {
        rf.currentTerm = args.Term
        rf.state = Follower
        rf.votedFor = -1
    }

    // Check log freshness safety invariant
    lastLog := rf.log[len(rf.log)-1]
    isLogUpToDate := args.LastLogTerm > lastLog.Term ||
        (args.LastLogTerm == lastLog.Term && args.LastLogIndex >= len(rf.log)-1)

    if (rf.votedFor == -1 || rf.votedFor == args.CandidateID) && isLogUpToDate {
        rf.votedFor = args.CandidateID
        reply.VoteGranted = true
    } else {
        reply.VoteGranted = false
    }
}`,
          language: "ts",
          takeaways: [
            "Quorums require a strict majority: floor(N/2) + 1 nodes.",
            "Randomized election timeouts prevent vote splits where candidates continuously tie."
          ]
        },
        {
          title: "2. Split-Brain Defense & Log Matching Invariant",
          explanation: "During a network partition separating a 5-node cluster into {Node 1, Node 2} and {Node 3, Node 4, Node 5}:\n• The minority partition ({1, 2}) cannot achieve 3 votes, so it cannot commit any writes.\n• The majority partition ({3, 4, 5}) achieves 3 votes, elects a new leader in a higher term, and continues committing safely.\n• When the partition heals, the minority nodes see the higher term number, step down, and reconcile their logs to match the majority leader.",
          codeSnippet: `// Quorum calculation helper
func HasQuorum(totalNodes int, acknowledgements int) bool {
    needed := (totalNodes / 2) + 1
    return acknowledgements >= needed
}
// 5 nodes -> (5/2) + 1 = 3 acknowledgements needed
// 3 nodes -> (3/2) + 1 = 2 acknowledgements needed`,
          language: "ts",
          takeaways: [
            "Split-brain is mathematically impossible with strict majority quorums.",
            "A cluster of 2F + 1 nodes can tolerate F simultaneous node failures."
          ]
        }
      ]
    },
    quiz: {
      question: "In a 5-node Raft cluster, how many nodes must be online and agree to commit a log entry?",
      options: [
        "2 nodes",
        "3 nodes (majority quorum)",
        "4 nodes",
        "All 5 nodes (unanimous)"
      ],
      correctAnswer: "3 nodes (majority quorum)",
      explanation: "Raft requires a strict majority quorum: floor(5/2) + 1 = 3 nodes."
    }
  },
  {
    id: "dist-transactions-2pc-saga",
    title: "Distributed Transactions: Two-Phase Commit (2PC) & Sagas",
    category: "Distributed Systems",
    description: "Coordinate atomic transactions across distributed microservices: Two-Phase Commit coordinator protocol and Saga event-driven choreography.",
    route: "/lessons/dist-transactions-2pc-saga",
    order: 2,
    duration: "48 min system architecture lab",
    difficulty: "Advanced",
    keySkills: ["Two-Phase Commit (2PC)", "Coordinator Failures", "Saga Pattern", "Compensating Transactions", "Eventual Consistency"],
    trackId: "distributed-systems-consensus",
    content: {
      overview: "When a single business transaction spans multiple microservices and distinct databases (e.g. Order Service, Payment Service, Inventory Service), ACID transactions across single databases cannot be used. We must choose between synchronous 2PC or asynchronous event-driven Sagas.",
      sections: [
        {
          title: "1. Two-Phase Commit (2PC): Synchronous Atomicity",
          explanation: "Phase 1 (Prepare): The Coordinator sends a PREPARE message to all participant nodes. Participants acquire locks, write changes to their local transaction log, and reply YES (ready) or NO (abort).\nPhase 2 (Commit): If all reply YES, the Coordinator sends COMMIT. If any node votes NO or times out, the Coordinator sends ROLLBACK.\n\nLimitation: 2PC is a blocking protocol. If the coordinator crashes during Phase 2, participants remain blocked holding locks indefinitely.",
          codeSnippet: `// 2PC Coordinator State Machine in TypeScript
type Vote = "VOTE_COMMIT" | "VOTE_ABORT";

async function executeTwoPhaseCommit(participants: Participant[]): Promise<boolean> {
    // Phase 1: Prepare
    const votes = await Promise.all(participants.map(p => p.prepare()));
    const allAgreed = votes.every(v => v === "VOTE_COMMIT");

    // Phase 2: Commit or Abort
    if (allAgreed) {
        await Promise.all(participants.map(p => p.commit()));
        return true;
    } else {
        await Promise.all(participants.map(p => p.rollback()));
        return false;
    }
}`,
          language: "ts",
          takeaways: [
            "2PC guarantees strong ACID atomicity across databases.",
            "2PC holds locks throughout the network round-trips, severely degrading throughput at scale."
          ]
        },
        {
          title: "2. The Saga Pattern: Compensating Transactions for Microservices",
          explanation: "In modern distributed architectures, Sagas replace blocking 2PC locks with a sequence of local transactions. If step 3 fails (e.g. Payment Declined), the Saga executes explicit Compensating Transactions in reverse order (e.g. Unreserve Inventory, Cancel Order).",
          codeSnippet: `// Saga Choreography Step with Compensating Actions
interface SagaStep {
    name: string;
    execute: () => Promise<void>;
    compensate: () => Promise<void>;
}

async function runSaga(steps: SagaStep[]) {
    const executed: SagaStep[] = [];
    try {
        for (const step of steps) {
            await step.execute();
            executed.push(step);
        }
        console.log("Saga completed successfully!");
    } catch (err) {
        console.error("Saga failed! Executing compensating transactions in reverse...");
        for (const step of executed.reverse()) {
            await step.compensate();
        }
    }
}`,
          language: "ts",
          takeaways: [
            "Sagas achieve high availability by avoiding distributed database locks.",
            "Compensating transactions must be idempotent (safe to retry multiple times)."
          ]
        }
      ]
    },
    quiz: {
      question: "What is the primary drawback of the Two-Phase Commit (2PC) protocol in high-scale systems?",
      options: [
        "It doesn't support databases",
        "It is a blocking protocol where nodes hold locks across network round-trips",
        "It is impossible to implement in code",
        "It requires zero network messages"
      ],
      correctAnswer: "It is a blocking protocol where nodes hold locks across network round-trips",
      explanation: "2PC holds local database row locks across network round-trips and blocks indefinitely if the coordinator crashes during the commit phase."
    }
  }
];

// Track 5.4: Database Engine Internals & Storage Architecture
const dbmsInternalsLessons: CurriculumLesson[] = [
  {
    id: "dbms-storage-bplus-lsm",
    title: "Storage Engines: B+ Trees vs LSM Trees (WAL & SSTables)",
    category: "Database Internals",
    description: "Deep dive into physical database storage: B+ Tree page splits, Write-Ahead Logs (WAL), Memtables, SSTables, and LSM compaction (RocksDB / Cassandra).",
    route: "/lessons/dbms-storage-bplus-lsm",
    order: 1,
    duration: "52 min comprehensive lab",
    difficulty: "Advanced",
    keySkills: ["B+ Tree 4KB Disk Pages", "LSM Tree Architecture", "Write-Ahead Logging (WAL)", "Memtable & SSTables", "Bloom Filters", "Compaction Algorithms"],
    trackId: "dbms-engine-internals",
    content: {
      overview: "Every database (PostgreSQL, MySQL, Cassandra, RocksDB, MongoDB) is built on an underlying storage engine that arranges bytes on disk. Read-heavy databases use B+ Trees; write-heavy distributed databases use Log-Structured Merge (LSM) Trees.",
      sections: [
        {
          title: "1. B+ Trees: In-Place Mutation for Read-Heavy Workloads",
          explanation: "PostgreSQL and MySQL InnoDB store tables and indexes as B+ Trees organized into fixed-size pages (typically 4KB or 8KB) matching OS disk blocks.\n• High Fan-Out: Each page holds hundreds of pointers, keeping tree height <= 4 even for 1 billion rows.\n• In-Place Updates: Updates modify data in place on disk, requiring a Write-Ahead Log (WAL) to prevent data corruption during power loss.",
          codeSnippet: `// B+ Tree Node Layout in C
#define PAGE_SIZE 4096
#define MAX_KEYS 255

struct BPlusTreeNode {
    bool is_leaf;
    int num_keys;
    int keys[MAX_KEYS];
    union {
        struct BPlusTreeNode *children[MAX_KEYS + 1]; // Internal node
        void *record_pointers[MAX_KEYS];              // Leaf node
    };
    struct BPlusTreeNode *next_leaf; // Linked list for fast range scans!
};`,
          language: "c",
          takeaways: [
            "B+ tree leaf nodes form a linked list, making range scans (WHERE age BETWEEN 20 AND 30) O(log N + K).",
            "Random disk writes occur when inserting into non-contiguous B+ tree pages."
          ]
        },
        {
          title: "2. LSM Trees: Append-Only Architecture for Write-Heavy Engines",
          explanation: "LSM Trees (used in RocksDB, LevelDB, Bigtable, ScyllaDB) convert random disk writes into sequential disk writes:\n1. Memtable: Incoming writes append to an in-memory balanced tree (SkipList) and a Write-Ahead Log on disk.\n2. SSTable (Sorted String Table): When the memtable fills up (e.g. 64MB), it is flushed to disk as an immutable, sorted file.\n3. Bloom Filter: An in-memory bit array tests whether an SSTable definitely does NOT contain a requested key before doing disk reads.\n4. Compaction: Background threads merge duplicate SSTables, removing deleted/overwritten records.",
          codeSnippet: `// Python LSM Tree Conceptual Pipeline
class LSMTree:
    def __init__(self):
        self.memtable = {} # In-memory sorted map
        self.wal_log = []   # Disk append-only log
        self.sstables = []  # Immutable disk files

    def write(self, key: str, value: str):
        # 1. Append sequentially to WAL log (O(1) sequential write)
        self.wal_log.append(f"SET {key}={value}")
        # 2. Insert into sorted in-memory memtable (O(log M))
        self.memtable[key] = value

        if len(self.memtable) >= 1000:
            self.flush_to_sstable()

    def flush_to_sstable(self):
        # Flush sorted memtable to immutable SSTable file on disk
        sorted_pairs = sorted(self.memtable.items())
        self.sstables.append(sorted_pairs)
        self.memtable.clear()`,
          language: "python",
          takeaways: [
            "LSM Trees achieve blazing write speeds by turning all writes into sequential append-only disk I/O.",
            "Reads may need to inspect multiple SSTables unless guided by Bloom Filters."
          ]
        }
      ]
    },
    quiz: {
      question: "Why do LSM-Tree storage engines (like RocksDB and Cassandra) achieve significantly higher write throughput than B+ Trees?",
      options: [
        "They don't store data on disk",
        "They turn all writes into sequential appends to in-memory memtables and WAL, avoiding random disk seeks",
        "They use slower CPUs",
        "They omit indexes entirely"
      ],
      correctAnswer: "They turn all writes into sequential appends to in-memory memtables and WAL, avoiding random disk seeks",
      explanation: "LSM trees append writes sequentially to a WAL and memtable, avoiding the expensive random in-place disk page modifications required by B+ Trees."
    }
  }
];

// Track 5.5: Advanced Cryptography, Exploits & Systems Security
const advancedSecurityLessons: CurriculumLesson[] = [
  {
    id: "sec-memory-exploits-rop",
    title: "Binary Exploitation: Stack Smashing, ROP Chains & ASLR",
    category: "Systems Security",
    description: "Understand the binary security battlefield: Stack buffer overflows, Shellcode injection, Return-Oriented Programming (ROP), and OS defenses (Canaries, DEP/NX, ASLR).",
    route: "/lessons/sec-memory-exploits-rop",
    order: 1,
    duration: "52 min security engineering lab",
    difficulty: "Advanced",
    keySkills: ["Stack Frame Exploits", "Buffer Overflow", "Return-Oriented Programming (ROP)", "Stack Canaries", "ASLR & DEP/NX Mitigation"],
    trackId: "cryptography-systems-security",
    content: {
      overview: "Every major security vulnerability (from Morris Worm to modern zero-days) exploits low-level memory vulnerabilities in C/C++ binaries. Security engineers must master how execution flow is hijacked and how modern operating systems defend binaries.",
      sections: [
        {
          title: "1. The Anatomy of a Stack Buffer Overflow",
          explanation: "When a function is called, the CPU pushes local variables and the Return Address (the instruction pointer to resume after returning) onto the stack. Unsafe functions like `gets()` or `strcpy()` write unbounded bytes past the local buffer, overwriting the saved Return Address with an attacker-controlled address.",
          codeSnippet: `// Vulnerable C Code (Stack Buffer Overflow)
#include <stdio.h>
#include <string.h>

void vulnerable_function() {
    char buffer[64]; // Allocates 64 bytes on the call stack
    // DANGEROUS: gets reads unbounded input until newline!
    // Entering 76 bytes overwrites the saved EIP/RIP return address!
    gets(buffer); 
}

int main() {
    vulnerable_function();
    return 0;
}`,
          language: "c",
          takeaways: [
            "Never use gets() or unbounded sprintf()/strcpy(); always use fgets() and strncpy().",
            "Stack Canaries insert random guard words between local variables and the return address to detect overwrites."
          ]
        },
        {
          title: "2. Modern Mitigations & Return-Oriented Programming (ROP)",
          explanation: "Operating systems deployed three layers of defense:\n1. DEP / NX (Data Execution Prevention): Marks the stack non-executable, preventing injected shellcode from running.\n2. ASLR (Address Space Layout Randomization): Randomizes stack, heap, and library base addresses on every program launch.\n3. ROP (Return-Oriented Programming): Attackers bypass NX by chaining existing short machine instruction fragments ('gadgets' ending in `ret`) already present in executable code libraries (like `libc`).",
          codeSnippet: `// Conceptual ROP Chain Layout on Stack:
// [ Gadget 1 Address: 'pop rdi; ret' ] -> Loads next value into register RDI
// [ Argument: Address of string '/bin/sh' ]
// [ Gadget 2 Address: 'pop rsi; ret' ] -> Loads NULL into RSI
// [ Argument: 0x00000000 ]
// [ Address of system() in libc ]     -> Executes system("/bin/sh")!`,
          language: "c",
          takeaways: [
            "ROP chains weaponize existing executable code already present in memory without injecting new code.",
            "Modern languages like Rust prevent memory corruption entirely through compile-time ownership semantics."
          ]
        }
      ]
    },
    quiz: {
      question: "How does Return-Oriented Programming (ROP) bypass Data Execution Prevention (DEP / NX)?",
      options: [
        "By disabling the antivirus software",
        "By chaining together small existing code fragments ('gadgets' ending in ret) already loaded in executable memory",
        "By writing code into the swap partition",
        "By deleting the operating system kernel"
      ],
      correctAnswer: "By chaining together small existing code fragments ('gadgets' ending in ret) already loaded in executable memory",
      explanation: "ROP bypasses non-executable stacks by stringing together existing instruction sequences ('gadgets') already present in executable libraries."
    }
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// ALL REGISTERED CURRICULUM TRACKS ACROSS ALL 4 YEARS
// ─────────────────────────────────────────────────────────────────────────────
export const ALL_CURRICULUM_TRACKS: CurriculumTrack[] = [
  // ── YEAR 1: FRESHMAN YEAR ──────────────────────────────────────────────────
  {
    id: "c-foundation",
    title: "C Programming & Systems Foundations",
    subtitle: "Everyday analogies to memory addresses — 10 beginner-friendly standard lessons",
    icon: "💻",
    category: "Foundation",
    year: 1,
    yearLabel: "Year 1 • Freshman",
    badge: "Year 1 Core",
    description: "Every engineering journey begins with hardware execution, labeled memory boxes, loops, functions, and pointers.",
    lessons: cFoundationLessons,
  },
  {
    id: "python-foundations",
    title: "Python & Computational Thinking",
    subtitle: "Readable syntax, data structures, and automation for beginners",
    icon: "🐍",
    category: "Foundation",
    year: 1,
    yearLabel: "Year 1 • Freshman",
    badge: "Year 1 Core",
    description: "Learn Python from the ground up: clean indentation, data types, lists, dictionaries, and problem-solving.",
    lessons: pythonFoundationsLessons,
  },
  {
    id: "engineering-essentials",
    title: "Engineering Essentials & Developer Tools",
    subtitle: "Terminal CLI, Git & GitHub, VS Code, Interactive Debugging & Build Tooling",
    icon: "🛠️",
    category: "Foundation",
    year: 1,
    yearLabel: "Year 1 • Freshman",
    badge: "Year 1 Core",
    description: "Master the developer toolkit: Linux CLI navigation, Git version control, GitHub collaboration, VS Code superpowers, interactive debugging, browser DevTools, and package managers.",
    lessons: engineeringEssentialsLessons,
  },

  // ── YEAR 2: SOPHOMORE YEAR ─────────────────────────────────────────────────
  {
    id: "dsa-mastery",
    title: "Data Structures & Algorithms",
    subtitle: "Big-O performance, linked lists, stacks, queues & binary trees",
    icon: "⚡",
    category: "Core CS",
    year: 2,
    yearLabel: "Year 2 • Sophomore",
    badge: "Year 2 Core",
    targetBranches: ["CSC", "IT", "IS", "SE", "CAI", "CSM", "AIML", "AID", "CSD"],
    targetGoals: ["placement", "internship", "technical", "abroad"],
    description: "The algorithmic engine behind efficient software, online coding assessments, and technical screening rounds.",
    lessons: dsaLessons,
  },
  {
    id: "oop-mastery",
    title: "Object-Oriented Programming (OOP)",
    subtitle: "Classes, encapsulation, inheritance, polymorphism & clean design",
    icon: "🧩",
    category: "Core CS",
    year: 2,
    yearLabel: "Year 2 • Sophomore",
    badge: "Year 2 Core",
    targetBranches: ["CSC", "IT", "IS", "SE", "CAI", "CSM", "AIML"],
    description: "Build robust, maintainable systems using industry-standard OOP blueprints, access control, and design patterns.",
    lessons: oopLessons,
  },
  {
    id: "dbms-foundations",
    title: "Database Management Systems & SQL",
    subtitle: "Relational tables, SQL queries, JOINs & ACID transactions",
    icon: "🗄️",
    category: "Core CS",
    year: 2,
    yearLabel: "Year 2 • Sophomore",
    badge: "Year 2 Core",
    targetBranches: ["CSC", "IT", "IS", "SE", "CAI", "CSM", "AIML", "DS"],
    description: "Master database schemas, query writing, indexing, and transactional integrity that power modern enterprise apps.",
    lessons: dbmsLessons,
  },
  {
    id: "os-networks",
    title: "Operating Systems & Computer Networks",
    subtitle: "Processes, threads, memory paging & how the internet works (TCP/IP, HTTP)",
    icon: "🌐",
    category: "Core CS",
    year: 2,
    yearLabel: "Year 2 • Sophomore",
    badge: "Year 2 Core",
    targetBranches: ["CSC", "IT", "IS", "SE", "CAI", "CSM"],
    description: "Understand CPU multitasking, virtual memory, DNS lookups, TCP handshakes, and client-server communication.",
    lessons: osNetworksLessons,
  },

  // ── YEAR 3: JUNIOR YEAR ────────────────────────────────────────────────────
  {
    id: "webdev-fullstack",
    title: "Full-Stack Web Engineering",
    subtitle: "React components, Next.js, REST APIs & database integration",
    icon: "💻",
    category: "Specialization",
    year: 3,
    yearLabel: "Year 3 • Junior",
    badge: "Year 3 Tech Stack",
    targetBranches: ["CSC", "IT", "IS", "SE"],
    targetGoals: ["internship", "startup", "placement"],
    description: "Design interactive user interfaces and build scalable REST APIs with production databases and authentication.",
    lessons: webdevLessons,
  },
  {
    id: "aiml-specialization",
    title: "AI & Machine Learning Specialization",
    subtitle: "NumPy matrix math, Pandas dataframes & PyTorch deep learning",
    icon: "🤖",
    category: "Specialization",
    year: 3,
    yearLabel: "Year 3 • Junior",
    badge: "Year 3 Tech Stack",
    targetBranches: ["CAI", "CSM", "AIML", "AIE", "DL", "AID", "CSD", "DS"],
    description: "Industry-standard machine learning pipelines from data preprocessing to neural network training loops.",
    lessons: aimlLessons,
  },
  {
    id: "cloud-devops",
    title: "Cloud Computing & DevOps",
    subtitle: "Docker containers, microservices & GitHub Actions CI/CD pipelines",
    icon: "☁️",
    category: "Specialization",
    year: 3,
    yearLabel: "Year 3 • Junior",
    badge: "Year 3 Tech Stack",
    targetBranches: ["CSC", "IT", "IS", "SE"],
    targetGoals: ["internship", "startup", "placement"],
    description: "Package applications with Docker and automate testing and deployment with CI/CD continuous delivery pipelines.",
    lessons: cloudDevOpsLessons,
  },

  // ── YEAR 4: SENIOR YEAR ────────────────────────────────────────────────────
  {
    id: "placement-sprint",
    title: "Campus Placement Sprints & Tech OA",
    subtitle: "High-yield coding patterns, Two Pointers, Sliding Window & STAR HR rounds",
    icon: "💼",
    category: "Placement",
    year: 4,
    yearLabel: "Year 4 • Senior",
    badge: "Year 4 Placements",
    targetGoals: ["placement"],
    description: "Targeted, high-yield lessons focused squarely on cracking high-package campus placement online tests and interviews.",
    lessons: placementSprintLessons,
  },
  {
    id: "system-design",
    title: "High-Level System Design & Architecture",
    subtitle: "Scalability, Redis caching, load balancing & case studies (TinyURL, Chat)",
    icon: "🏛️",
    category: "Placement",
    year: 4,
    yearLabel: "Year 4 • Senior",
    badge: "Year 4 Placements",
    targetGoals: ["placement", "technical"],
    description: "Learn how senior engineers architect web applications to handle millions of daily active users with low latency.",
    lessons: systemDesignLessons,
  },
  {
    id: "internship-sprint",
    title: "Production Capstone & Portfolio Sprint",
    subtitle: "Production deployment, environment security & standout engineering resume",
    icon: "🏢",
    category: "Placement",
    year: 4,
    yearLabel: "Year 4 • Senior",
    badge: "Year 4 Capstone",
    targetGoals: ["internship", "startup", "placement"],
    description: "Build portfolio applications with real Git workflows and ATS resume optimization to stand out to hiring managers.",
    lessons: internshipSprintLessons,
  },

  // ── ADVANCED CORE & SYSTEMS ENGINEERING TRACKS ──────────────────────────────
  {
    id: "advanced-algorithms-theory",
    title: "Advanced Algorithms, Graphs & Complexity",
    subtitle: "Segment trees, DSU, Tarjan SCC, Automata, Decidability & P vs NP",
    icon: "🧮",
    category: "Core CS",
    year: 2,
    yearLabel: "Year 2 • Advanced CS",
    badge: "Advanced Theory",
    targetBranches: ["CSC", "IT", "IS", "SE", "CAI", "CSM"],
    targetGoals: ["placement", "technical", "abroad"],
    description: "Master O(log N) dynamic range queries with Segment/Fenwick trees, DSU with inverse Ackermann complexity, Tarjan's SCC, and the theoretical limits of computation.",
    lessons: advancedAlgorithmsLessons,
  },
  {
    id: "kernel-systems-internals",
    title: "Computer Architecture, Kernel Internals & Concurrency",
    subtitle: "L1/L2/L3 caches, MESI, Memory Barriers, Lock-Free Atomics & CAS",
    icon: "⚙️",
    category: "Core CS",
    year: 2,
    yearLabel: "Year 2 • Low-Level Systems",
    badge: "Hardware & Kernel",
    targetBranches: ["CSC", "IT", "IS", "SE"],
    targetGoals: ["technical", "placement"],
    description: "Deep hardware-software interface: 64-byte cache lines, False Sharing prevention, MESI cache coherence, and lock-free concurrency with Compare-And-Swap.",
    lessons: kernelSystemsLessons,
  },
  {
    id: "distributed-systems-consensus",
    title: "Distributed Systems, Consensus & Fault Tolerance",
    subtitle: "Raft leader election, log replication, split-brain, 2PC & Saga patterns",
    icon: "🌐",
    category: "Specialization",
    year: 3,
    yearLabel: "Year 3 • Distributed Systems",
    badge: "Distributed Consensus",
    targetBranches: ["CSC", "IT", "IS", "SE"],
    targetGoals: ["placement", "startup", "technical"],
    description: "Master state machine replication, quorum mathematics, Raft leader election, split-brain defenses, Two-Phase Commit (2PC), and Saga compensating transactions.",
    lessons: distributedConsensusLessons,
  },
  {
    id: "dbms-engine-internals",
    title: "Database Engine Internals & Storage Architecture",
    subtitle: "B+ Tree disk pages, LSM Trees, WAL, Memtables, SSTables & Compaction",
    icon: "🗄️",
    category: "Specialization",
    year: 3,
    yearLabel: "Year 3 • Storage Systems",
    badge: "DBMS Internals",
    targetBranches: ["CSC", "IT", "IS", "SE"],
    targetGoals: ["placement", "technical"],
    description: "Understand how database storage engines work under the hood: B+ Tree page splits vs LSM Tree append-only WAL, SSTables, Bloom filters, and compaction.",
    lessons: dbmsInternalsLessons,
  },
  {
    id: "cryptography-systems-security",
    title: "Advanced Cryptography, Binary Exploits & Systems Security",
    subtitle: "Stack smashing, ROP chains, ASLR/DEP defenses, and cryptographic protocols",
    icon: "🛡️",
    category: "Specialization",
    year: 4,
    yearLabel: "Year 4 • Systems Security",
    badge: "Security & Exploits",
    targetBranches: ["CSC", "IT", "IS", "SE"],
    targetGoals: ["placement", "technical"],
    description: "Binary exploitation and defense: stack buffer overflows, shellcode, Return-Oriented Programming (ROP) gadgets, ASLR/DEP mitigation, and modern cryptography.",
    lessons: advancedSecurityLessons,
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPER: GET PERSONALIZED CURRICULUM FOR STUDENT
// ─────────────────────────────────────────────────────────────────────────────
export function getCurriculumForStudent(
  branch?: string,
  goal?: string,
  interests?: string[],
  year?: string | number
): {
  recommendedTracks: CurriculumTrack[];
  allTracks: CurriculumTrack[];
  allLessons: CurriculumLesson[];
  totalLessonCount: number;
  studentYearNumber: AcademicYear;
  yearLabelText: string;
  yearTracks: CurriculumTrack[];
} {
  const normBranch = (branch || "CSC").toUpperCase();
  const normGoal = (goal || "placement").toLowerCase();

  // Normalize student academic year
  let studentYearNum: AcademicYear = 1;
  const yearStr = String(year || "").toLowerCase();
  if (yearStr.includes("2") || yearStr.includes("second") || yearStr.includes("sophomore")) {
    studentYearNum = 2;
  } else if (yearStr.includes("3") || yearStr.includes("third") || yearStr.includes("junior")) {
    studentYearNum = 3;
  } else if (yearStr.includes("4") || yearStr.includes("fourth") || yearStr.includes("final") || yearStr.includes("senior")) {
    studentYearNum = 4;
  }

  const isAiMl = ["AIML", "CAI", "CSM", "AIE", "DL", "AID", "CSD", "DS"].some(b => normBranch.includes(b));
  const isPlacement = normGoal.includes("placement") || normGoal.includes("job");
  const isInternship = normGoal.includes("internship");

  // Get tracks for student's current year
  const currentYearTracks = ALL_CURRICULUM_TRACKS.filter(t => t.year === studentYearNum);

  const recommendedTracks: CurriculumTrack[] = [];

  // 1. Add current year's tracks first
  currentYearTracks.forEach(t => recommendedTracks.push(t));

  // 2. Add relevant branch or goal tracks if not already present
  if (isAiMl) {
    const aiTrack = ALL_CURRICULUM_TRACKS.find(t => t.id === "aiml-specialization");
    if (aiTrack && !recommendedTracks.some(t => t.id === aiTrack.id)) {
      recommendedTracks.push(aiTrack);
    }
  }

  if (isPlacement) {
    const pTrack = ALL_CURRICULUM_TRACKS.find(t => t.id === "placement-sprint");
    if (pTrack && !recommendedTracks.some(t => t.id === pTrack.id)) {
      recommendedTracks.push(pTrack);
    }
  } else if (isInternship) {
    const iTrack = ALL_CURRICULUM_TRACKS.find(t => t.id === "internship-sprint");
    if (iTrack && !recommendedTracks.some(t => t.id === iTrack.id)) {
      recommendedTracks.push(iTrack);
    }
  }

  // Flatten all unique lessons across all tracks
  const allLessons: CurriculumLesson[] = [];
  ALL_CURRICULUM_TRACKS.forEach(t => {
    t.lessons.forEach(l => {
      if (!allLessons.some(existing => existing.id === l.id)) {
        allLessons.push(l);
      }
    });
  });

  const yearLabelNames: Record<AcademicYear, string> = {
    1: "Year 1 • Foundations & Logic",
    2: "Year 2 • Core Computer Science",
    3: "Year 3 • Specializations & Tech Stacks",
    4: "Year 4 • Placements, System Design & Capstone"
  };

  return {
    recommendedTracks,
    allTracks: ALL_CURRICULUM_TRACKS,
    allLessons,
    totalLessonCount: allLessons.length,
    studentYearNumber: studentYearNum,
    yearLabelText: yearLabelNames[studentYearNum],
    yearTracks: currentYearTracks
  };
}
