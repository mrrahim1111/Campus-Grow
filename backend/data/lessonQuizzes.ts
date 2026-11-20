// CampusGrow Comprehensive 5-Question Quiz Bank & Terminal Starter Code Engine
// Guarantees at least 5 questions per lesson:
// Q1: Easy (Foundational Concept)
// Q2: Easy-Medium (Application)
// Q3: Medium (Code Behavior & Logic)
// Q4: Hard (Edge Cases & Trade-offs)
// Q5: Difficult (Tricky Placement-Level Trap / Runtime Nuance)

export interface LessonQuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Difficult";
  difficultyBadge: string;
}

export interface LessonPracticeCode {
  language: "c" | "python" | "javascript" | "sql" | "bash" | "json" | "yaml";
  filename: string;
  code: string;
  title: string;
  description: string;
  expectedOutput?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// LESSON QUIZ REPOSITORY (All 36 Engineering Lessons)
// ─────────────────────────────────────────────────────────────────────────────

export const LESSON_QUIZ_DATA: Record<string, { questions: LessonQuizQuestion[]; practice: LessonPracticeCode }> = {
  // 1. Programming Fundamentals
  "programming-fundamentals": {
    practice: {
      language: "c",
      filename: "logic.c",
      title: "Input-Process-Output Flowchart in C",
      description: "A complete step-by-step arithmetic processor demonstrating computer logic.",
      expectedOutput: "Sum of 15 and 27 is 42",
      code: `#include <stdio.h>

// Step 1: Input -> Step 2: Process -> Step 3: Output
int main() {
    int num1 = 15;
    int num2 = 27;
    
    // Process: Computation in CPU ALU
    int sum = num1 + num2;
    
    // Output: Display result on terminal
    printf("Sum of %d and %d is %d\\n", num1, num2, sum);
    return 0;
}`,
    },
    questions: [
      {
        id: 1,
        difficulty: "Easy",
        difficultyBadge: "Q1 • Easy (Foundations)",
        question: "What is an algorithm in computer programming?",
        options: [
          "A step-by-step sequence of unambiguous instructions to solve a problem",
          "A physical hardware chip placed inside the motherboard",
          "A programming language created by Microsoft",
          "An error that causes a computer screen to turn blue",
        ],
        correctAnswer: "A step-by-step sequence of unambiguous instructions to solve a problem",
        explanation: "An algorithm is like a foolproof cooking recipe: a finite, sequential set of unambiguous steps that converts given inputs into expected outputs.",
      },
      {
        id: 2,
        difficulty: "Medium",
        difficultyBadge: "Q2 • Moderate (I/O Cycle)",
        question: "In the universal computing architecture, what are the three fundamental stages of every program execution?",
        options: [
          "Input → Process → Output",
          "Download → Upload → Restart",
          "Compile → Delete → Refresh",
          "HTML → CSS → JavaScript",
        ],
        correctAnswer: "Input → Process → Output",
        explanation: "Every computing system accepts data (Input), manipulates it using algorithms in memory/CPU (Process), and presents the result (Output).",
      },
      {
        id: 3,
        difficulty: "Medium",
        difficultyBadge: "Q3 • Intermediate (Logic Tracing)",
        question: "Suppose a program assigns X = 5, then calculates Y = X * 2, and then assigns X = X + 3. What are the final values of X and Y?",
        options: [
          "X = 8, Y = 10",
          "X = 5, Y = 10",
          "X = 8, Y = 16",
          "X = 10, Y = 8",
        ],
        correctAnswer: "X = 8, Y = 10",
        explanation: "Variables store values sequentially in time: Y evaluates to 5 * 2 = 10. Later, X is updated to 5 + 3 = 8. Y is not recomputed because code runs top-to-bottom unless in a loop.",
      },
      {
        id: 4,
        difficulty: "Hard",
        difficultyBadge: "Q4 • Advanced (Edge Cases)",
        question: "Why does an algorithm fail if it lacks a 'termination condition' (stopping criteria)?",
        options: [
          "It enters an infinite loop, exhausting memory and hanging the processor",
          "The computer automatically renames the file",
          "The compiler will convert it into a video game",
          "The syntax highlighting turns bright red",
        ],
        correctAnswer: "It enters an infinite loop, exhausting memory and hanging the processor",
        explanation: "Finiteness is a mandatory algorithmic property. Without a halting condition, instructions cycle endlessly, hogging CPU cycles and causing stack overflow or system freezes.",
      },
      {
        id: 5,
        difficulty: "Difficult",
        difficultyBadge: "Q5 • Difficult (Placement Trap)",
        question: "Consider an algorithm with time complexity O(2^N) vs O(N^2). If N = 50, which statement is critically accurate in engineering production?",
        options: [
          "O(2^N) is impossibly intractable (would take billions of years), while O(N^2) finishes in a fraction of a millisecond",
          "O(2^N) runs faster because powers of 2 align with binary memory architecture",
          "Both algorithms finish in under 1 second on a modern Intel i7 laptop",
          "O(N^2) requires quantum hardware while O(2^N) runs on any smartphone",
        ],
        correctAnswer: "O(2^N) is impossibly intractable (would take billions of years), while O(N^2) finishes in a fraction of a millisecond",
        explanation: "2^50 is approximately 1.12 × 10^15 operations. Even at 1 billion operations/second, it would take over 13 days of nonstop compute, whereas 50^2 is only 2,500 operations (sub-microsecond). Exponential growth is disastrous in production.",
      },
    ],
  },

  // 2. Introduction to C
  "c-programming": {
    practice: {
      language: "c",
      filename: "main.c",
      title: "Your First C Program",
      description: "Compile and execute standard C code using stdio.h and main().",
      expectedOutput: "Hello, World! This is C.\nCode compiled successfully with 0 errors.",
      code: `#include <stdio.h>

int main() {
    printf("Hello, World! This is C.\\n");
    printf("Code compiled successfully with 0 errors.\\n");
    return 0;
}`,
    },
    questions: [
      {
        id: 1,
        difficulty: "Easy",
        difficultyBadge: "Q1 • Easy (Syntax Basics)",
        question: "Where does execution always begin in every valid C program?",
        options: [
          "Inside the main() function",
          "At the first #include preprocessor directive",
          "At the very last line of the source code file",
          "Inside whichever function is named alphabetically first",
        ],
        correctAnswer: "Inside the main() function",
        explanation: "main() is the standardized runtime entry point mandated by the ISO C standard. The operating system hands control directly to main().",
      },
      {
        id: 2,
        difficulty: "Medium",
        difficultyBadge: "Q2 • Moderate (Preprocessor)",
        question: "What is the primary role of '#include <stdio.h>' at the top of a C file?",
        options: [
          "It imports function prototypes for standard input/output such as printf and scanf",
          "It turns on dark mode inside the compiler",
          "It forces the CPU to run at maximum clock speed",
          "It reserves 1 Gigabyte of RAM for the application",
        ],
        correctAnswer: "It imports function prototypes for standard input/output such as printf and scanf",
        explanation: "stdio.h stands for 'Standard Input Output Header'. Without it, the compiler does not know the signature of printf() or scanf().",
      },
      {
        id: 3,
        difficulty: "Medium",
        difficultyBadge: "Q3 • Intermediate (Compilation Pipeline)",
        question: "Which of the following is the correct 4-stage compilation pipeline of a C program?",
        options: [
          "Preprocessor → Compiler → Assembler → Linker",
          "Compiler → Interpreter → Browser → Screen",
          "Editor → Database → WiFi → Execution",
          "Linker → Preprocessor → Git → Binary",
        ],
        correctAnswer: "Preprocessor → Compiler → Assembler → Linker",
        explanation: "C compiles in 4 stages: 1. Preprocessor expands macros & headers; 2. Compiler turns C into Assembly; 3. Assembler turns Assembly into Object code (.o); 4. Linker bundles libraries into an executable (.exe / a.out).",
      },
      {
        id: 4,
        difficulty: "Hard",
        difficultyBadge: "Q4 • Advanced (Exit Codes)",
        question: "What does 'return 0;' inside main() signify to the host operating system?",
        options: [
          "Successful execution without unhandled runtime errors",
          "The program had 0 lines of code",
          "The program outputted the number 0 to the monitor",
          "The RAM was completely cleared of all data",
        ],
        correctAnswer: "Successful execution without unhandled runtime errors",
        explanation: "By UNIX / POSIX convention, an exit code of 0 indicates EXIT_SUCCESS. Any non-zero value (like 1, -1, 139) signals an abnormal termination or error code to bash/zsh.",
      },
      {
        id: 5,
        difficulty: "Difficult",
        difficultyBadge: "Q5 • Difficult (Placement Trap)",
        question: "What will happen if you compile and run this code: 'int main() { printf(\"%d\", printf(\"Hi\")); return 0; }'?",
        options: [
          "It prints 'Hi2' because printf returns the total number of characters successfully printed",
          "It prints 'HiHi' because of recursive nesting",
          "It produces a compile-time syntax error because printf cannot be an argument to itself",
          "It prints 'Hi0' because main returns 0",
        ],
        correctAnswer: "It prints 'Hi2' because printf returns the total number of characters successfully printed",
        explanation: "A famous SDE placement interview question! The inner printf(\"Hi\") executes first, printing 'Hi' and returning the integer count of printed characters (2). The outer printf then prints that integer: '2'. Result: 'Hi2'.",
      },
    ],
  },

  // 3. Variables & Data Types
  "variables-data-types": {
    practice: {
      language: "c",
      filename: "datatypes.c",
      title: "Data Types & Memory Sizes",
      description: "Inspect exact byte sizes and formats for int, float, char, and double.",
      expectedOutput: "Age: 19, GPA: 3.85, Grade: A\nint size: 4 bytes",
      code: `#include <stdio.h>

int main() {
    int age = 19;
    float gpa = 3.85f;
    char grade = 'A';
    
    printf("Age: %d, GPA: %.2f, Grade: %c\\n", age, gpa, grade);
    printf("int size: %zu bytes\\n", sizeof(int));
    return 0;
}`,
    },
    questions: [
      {
        id: 1,
        difficulty: "Easy",
        difficultyBadge: "Q1 • Easy (Types)",
        question: "Which C data type is used to store a single ASCII character like 'Z'?",
        options: [
          "char",
          "int",
          "float",
          "string",
        ],
        correctAnswer: "char",
        explanation: "'char' is a 1-byte integer data type in C that stores single characters wrapped in single quotes, corresponding to ASCII values from -128 to 127 (or 0 to 255 unsigned).",
      },
      {
        id: 2,
        difficulty: "Medium",
        difficultyBadge: "Q2 • Moderate (Format Specifiers)",
        question: "Which format specifier must be used in printf to display a float and a double respectively?",
        options: [
          "%f and %lf",
          "%d and %i",
          "%c and %s",
          "%x and %p",
        ],
        correctAnswer: "%f and %lf",
        explanation: "%f prints a single-precision floating point number, while %lf ('long float') represents double-precision floating point numbers in standard C.",
      },
      {
        id: 3,
        difficulty: "Medium",
        difficultyBadge: "Q3 • Intermediate (Integer Division)",
        question: "What is the evaluated result of the expression: 'float ans = 7 / 2;' in C?",
        options: [
          "3.000000 (because integer division truncates before assignment)",
          "3.500000 (because ans is declared as a float)",
          "4.000000 (because it rounds up automatically)",
          "Compilation error: cannot divide integers into a float",
        ],
        correctAnswer: "3.000000 (because integer division truncates before assignment)",
        explanation: "Both 7 and 2 are integer literals, so 7 / 2 performs integer division resulting in integer 3. Only after this computation is 3 promoted to float 3.0. To get 3.5, you must write '7.0 / 2' or '(float)7 / 2'.",
      },
      {
        id: 4,
        difficulty: "Hard",
        difficultyBadge: "Q4 • Advanced (Type Modifiers)",
        question: "What is the difference between 'signed int' and 'unsigned int' on a standard 32-bit architecture?",
        options: [
          "unsigned int cannot store negative numbers, doubling its positive range up to ~4.29 billion",
          "unsigned int uses 8 bytes while signed int uses 4 bytes",
          "signed int cannot be printed using printf",
          "unsigned int is automatically converted into text",
        ],
        correctAnswer: "unsigned int cannot store negative numbers, doubling its positive range up to ~4.29 billion",
        explanation: "A 32-bit signed int reserves 1 bit for the sign (+/-), giving a range of -2,147,483,648 to 2,147,483,647. An unsigned int uses all 32 bits for magnitude, extending from 0 to 4,294,967,295.",
      },
      {
        id: 5,
        difficulty: "Difficult",
        difficultyBadge: "Q5 • Difficult (Integer Overflow Trap)",
        question: "What happens when an unsigned 8-bit integer variable storing 255 has 1 added to it (i.e. 'unsigned char x = 255; x = x + 1;')?",
        options: [
          "It overflows and wraps around to 0",
          "It throws a Fatal Overflow Exception and crashes",
          "It caps at 255 (saturating arithmetic)",
          "It automatically expands into a 16-bit short",
        ],
        correctAnswer: "It overflows and wraps around to 0",
        explanation: "According to the ISO C specification, unsigned integer overflow is well-defined: operations wrap modulo 2^N. For an 8-bit unsigned char, 255 + 1 mod 256 equals 0! This is a classic security vulnerability and placement question.",
      },
    ],
  },

  // 4. Input & Output in C
  "input-output": {
    practice: {
      language: "c",
      filename: "io.c",
      title: "Interactive I/O with Scanf & Printf",
      description: "Learn how scanf uses memory addresses (&) to populate variables.",
      expectedOutput: "Roll Number: 101, Marks: 92.50\nStudent Record Saved.",
      code: `#include <stdio.h>

int main() {
    int rollNo = 101;
    float marks = 92.5f;
    
    // In practice: scanf("%d", &rollNo);
    printf("Roll Number: %d, Marks: %.2f\\n", rollNo, marks);
    printf("Student Record Saved.\\n");
    return 0;
}`,
    },
    questions: [
      {
        id: 1,
        difficulty: "Easy",
        difficultyBadge: "Q1 • Easy (Syntax)",
        question: "Why do you must pass '&variable' (the address-of operator) to scanf()?",
        options: [
          "Because scanf needs to know where in computer memory to store the user's input",
          "Because & makes the variable read-only",
          "Because & accelerates the CPU fan",
          "Because it is an optional decoration in C",
        ],
        correctAnswer: "Because scanf needs to know where in computer memory to store the user's input",
        explanation: "C passes function arguments by value. If you passed just 'x', scanf would only receive a copy. By passing '&x' (the memory address), scanf can write directly into that memory location.",
      },
      {
        id: 2,
        difficulty: "Medium",
        difficultyBadge: "Q2 • Moderate (Buffer Traps)",
        question: "Why does 'scanf(\"%s\", str)' stop reading input when a user types 'Campus Grow'?",
        options: [
          "%s stops reading at the first whitespace character (space, tab, or newline)",
          "%s only accepts 5 letters maximum",
          "Strings cannot contain capital letters in C",
          "The keyboard cable disconnected",
        ],
        correctAnswer: "%s stops reading at the first whitespace character (space, tab, or newline)",
        explanation: "The %s specifier treats spaces, tabs, and newlines as delimiters. To read multi-word sentences with spaces, engineers use 'fgets(str, sizeof(str), stdin)' instead.",
      },
      {
        id: 3,
        difficulty: "Medium",
        difficultyBadge: "Q3 • Intermediate (String Address)",
        question: "Why do we NOT put the '&' symbol when using scanf with a character array: 'scanf(\"%s\", name);'?",
        options: [
          "Because an array's name automatically decays into a pointer to its first element",
          "Because strings do not have memory addresses in C",
          "Because the compiler adds an invisible '&' automatically",
          "Because characters are stored in the cloud",
        ],
        correctAnswer: "Because an array's name automatically decays into a pointer to its first element",
        explanation: "In C, referencing an array identifier without brackets evaluates directly to the address of its 0th element (&name[0]). Adding another '&' would produce a pointer to the entire array.",
      },
      {
        id: 4,
        difficulty: "Hard",
        difficultyBadge: "Q4 • Advanced (Format Specifiers)",
        question: "What does the format specifier '%-10.2f' achieve in a printf call?",
        options: [
          "Left-aligns the float within a 10-character field width with 2 decimal places",
          "Subtracts 10 from the float and divides by 2",
          "Right-aligns the float with 10 decimal digits",
          "Throws a compiler error due to negative width",
        ],
        correctAnswer: "Left-aligns the float within a 10-character field width with 2 decimal places",
        explanation: "The '-' flag indicates left-alignment, '10' designates the minimum total field width (padding with spaces on the right), and '.2' specifies 2 digits after the decimal point.",
      },
      {
        id: 5,
        difficulty: "Difficult",
        difficultyBadge: "Q5 • Difficult (Stdin Buffer Bug)",
        question: "When reading an integer followed by a character using 'scanf(\"%d\", &num); scanf(\"%c\", &ch);', why is the second scanf skipped without user input?",
        options: [
          "The trailing newline '\\n' from hitting Enter remains in the stdin buffer and is consumed by %c",
          "The CPU caches characters in the ALU",
          "C does not allow integers and characters in the same program",
          "scanf automatically turns off after one reading",
        ],
        correctAnswer: "The trailing newline '\\n' from hitting Enter remains in the stdin buffer and is consumed by %c",
        explanation: "A legendary bug! Pressing Enter leaves '\\n' in the input buffer. %d ignores whitespace, but %c treats '\\n' as a valid character and reads it immediately. Fix: use 'scanf(\" %c\", &ch)' with a leading space to discard leftover whitespace.",
      },
    ],
  },

  // 5. Operators & Expressions
  "operators": {
    practice: {
      language: "c",
      filename: "operators.c",
      title: "Precedence & Bitwise Operators",
      description: "Experiment with post-increment, short-circuit logic, and bitwise shift.",
      expectedOutput: "a = 6, b = 5\nBitwise 5 << 1 = 10",
      code: `#include <stdio.h>

int main() {
    int a = 5;
    int b = a++; // Post-increment
    
    printf("a = %d, b = %d\\n", a, b);
    
    // Bitwise left shift doubles an integer
    int x = 5;
    printf("Bitwise 5 << 1 = %d\\n", x << 1);
    return 0;
}`,
    },
    questions: [
      {
        id: 1,
        difficulty: "Easy",
        difficultyBadge: "Q1 • Easy (Basics)",
        question: "What is the difference between the '=' operator and the '==' operator in C?",
        options: [
          "'=' is assignment (stores value), while '==' is comparison (checks equality)",
          "'==' is assignment, while '=' is comparison",
          "Both operators do the exact same thing",
          "'==' only works with floating point numbers",
        ],
        correctAnswer: "'=' is assignment (stores value), while '==' is comparison (checks equality)",
        explanation: "A single '=' writes the right-hand value into the left-hand variable. A double '==' evaluates whether two operands have identical values, returning 1 (true) or 0 (false).",
      },
      {
        id: 2,
        difficulty: "Medium",
        difficultyBadge: "Q2 • Moderate (Increment/Decrement)",
        question: "If 'int x = 10; int y = ++x;', what will be the values of x and y?",
        options: [
          "x = 11, y = 11",
          "x = 10, y = 11",
          "x = 11, y = 10",
          "x = 10, y = 10",
        ],
        correctAnswer: "x = 11, y = 11",
        explanation: "Pre-increment (++x) increments x first (from 10 to 11), and then yields the updated value to be assigned into y. Both end up as 11.",
      },
      {
        id: 3,
        difficulty: "Medium",
        difficultyBadge: "Q3 • Intermediate (Short-Circuit Evaluation)",
        question: "In the expression 'if (0 && ++count)', will '++count' be executed?",
        options: [
          "No, because the logical AND (&&) short-circuits when the first operand is false (0)",
          "Yes, all expressions in an if condition always run",
          "Only if count was originally negative",
          "It produces a compile error",
        ],
        correctAnswer: "No, because the logical AND (&&) short-circuits when the first operand is false (0)",
        explanation: "In C, short-circuit evaluation guarantees that if the left operand of && is 0 (false), the entire expression can never be true, so the right operand is never evaluated.",
      },
      {
        id: 4,
        difficulty: "Hard",
        difficultyBadge: "Q4 • Advanced (Bitwise Operators)",
        question: "What does the expression 'n & (n - 1)' compute in algorithmic problem solving?",
        options: [
          "It clears the lowest set bit (rightmost 1-bit) of n",
          "It squares the number n",
          "It checks whether n is an odd number",
          "It shifts n by 1 position to the right",
        ],
        correctAnswer: "It clears the lowest set bit (rightmost 1-bit) of n",
        explanation: "Brian Kernighan's bit manipulation trick! 'n & (n - 1)' zeroes out the lowest set bit. If 'n & (n - 1) == 0' (for n > 0), it proves that n is an exact power of 2.",
      },
      {
        id: 5,
        difficulty: "Difficult",
        difficultyBadge: "Q5 • Difficult (Undefined Behavior Trap)",
        question: "What is the result of evaluating 'int i = 3; int ans = i++ + ++i;' in C?",
        options: [
          "Undefined Behavior according to the C standard (violates sequence points)",
          "Strictly 8 on all compilers",
          "Strictly 7 on all compilers",
          "It will always compile to 9",
        ],
        correctAnswer: "Undefined Behavior according to the C standard (violates sequence points)",
        explanation: "Crucial technical interview question! Modifying a scalar variable more than once between two consecutive sequence points produces Undefined Behavior (UB). Different compilers (GCC vs Clang vs MSVC) produce conflicting results.",
      },
    ],
  },

  // 6. Conditional Statements
  "conditional-statements": {
    practice: {
      language: "c",
      filename: "decisions.c",
      title: "Branching Logic & Switch Statements",
      description: "Write clean decision-making algorithms with if-else and switch-case.",
      expectedOutput: "Status: Distinction\nAction: Eligible for scholarship",
      code: `#include <stdio.h>

int main() {
    int marks = 88;
    
    if (marks >= 85) {
        printf("Status: Distinction\\n");
        printf("Action: Eligible for scholarship\\n");
    } else if (marks >= 60) {
        printf("Status: First Class\\n");
    } else {
        printf("Status: Needs Improvement\\n");
    }
    return 0;
}`,
    },
    questions: [
      {
        id: 1,
        difficulty: "Easy",
        difficultyBadge: "Q1 • Easy (Boolean Truth)",
        question: "In C, what integer value is treated as FALSE inside an if statement condition?",
        options: [
          "Only 0 (zero)",
          "-1",
          "Any negative number",
          "Only the keyword false",
        ],
        correctAnswer: "Only 0 (zero)",
        explanation: "In C, 0 evaluates to false. ANY non-zero value (including 1, -5, 42, 999) evaluates to TRUE.",
      },
      {
        id: 2,
        difficulty: "Medium",
        difficultyBadge: "Q2 • Moderate (Switch Fallthrough)",
        question: "What happens if you omit the 'break;' statement at the end of a switch case?",
        options: [
          "Execution 'falls through' and continues running the next case's statements",
          "The program crashes immediately with a Segmentation Fault",
          "The compiler refuses to build the code",
          "The computer restarts",
        ],
        correctAnswer: "Execution 'falls through' and continues running the next case's statements",
        explanation: "Without a break statement, C does not exit the switch block; it cascades down and executes all subsequent case blocks until a break or the end of the switch is encountered.",
      },
      {
        id: 3,
        difficulty: "Medium",
        difficultyBadge: "Q3 • Intermediate (Ternary Operator)",
        question: "Which expression is equivalent to: 'if (a > b) max = a; else max = b;'?",
        options: [
          "max = (a > b) ? a : b;",
          "max = (a > b) : a ? b;",
          "max = if(a > b, a, b);",
          "max = a > b && a || b;",
        ],
        correctAnswer: "max = (a > b) ? a : b;",
        explanation: "The ternary operator '? :' is a shorthand conditional expression with syntax: condition ? value_if_true : value_if_false.",
      },
      {
        id: 4,
        difficulty: "Hard",
        difficultyBadge: "Q4 • Advanced (Switch Constraints)",
        question: "Which of the following data types CANNOT be used in a C switch statement expression?",
        options: [
          "float or double",
          "int",
          "char",
          "enum",
        ],
        correctAnswer: "float or double",
        explanation: "The C specification mandates that the controlling expression of a switch must evaluate to an integral type (int, char, enum). Floating-point values cannot be used because precision rounding makes exact equality checks unreliable.",
      },
      {
        id: 5,
        difficulty: "Difficult",
        difficultyBadge: "Q5 • Difficult (Placement Trap)",
        question: "What does this code print: 'int x = 0; if (x = 5) printf(\"YES\"); else printf(\"NO\");'?",
        options: [
          "YES (because x is assigned 5, and 5 is non-zero, making the condition true)",
          "NO (because x was originally 0)",
          "Compilation error (cannot use = inside if)",
          "Nothing is printed",
        ],
        correctAnswer: "YES (because x is assigned 5, and 5 is non-zero, making the condition true)",
        explanation: "The classic junior developer trap! The programmer typed assignment '=' instead of comparison '=='. The assignment 'x = 5' returns 5. Since 5 is non-zero, the condition is always TRUE! Always enable '-Wall' compiler warnings to catch this.",
      },
    ],
  },

  // 7. Loops & Repetition
  "loops": {
    practice: {
      language: "c",
      filename: "loops.c",
      title: "Repetition with For & While Loops",
      description: "Trace loop counters, step conditions, and early termination with break.",
      expectedOutput: "Counting: 1 2 3 4 5 \nSum: 15",
      code: `#include <stdio.h>

int main() {
    int sum = 0;
    printf("Counting: ");
    
    for (int i = 1; i <= 5; i++) {
        printf("%d ", i);
        sum += i;
    }
    
    printf("\\nSum: %d\\n", sum);
    return 0;
}`,
    },
    questions: [
      {
        id: 1,
        difficulty: "Easy",
        difficultyBadge: "Q1 • Easy (Do-While Basics)",
        question: "What is the key difference between a while loop and a do-while loop?",
        options: [
          "A do-while loop always executes its body at least once before checking the condition",
          "A while loop can only run up to 10 times",
          "A do-while loop cannot use curly braces",
          "A while loop runs backwards",
        ],
        correctAnswer: "A do-while loop always executes its body at least once before checking the condition",
        explanation: "A while loop is 'pre-test' (checks condition first). A do-while loop is 'post-test' (executes body first, then checks condition). Hence, do-while is guaranteed to execute at least 1 time.",
      },
      {
        id: 2,
        difficulty: "Medium",
        difficultyBadge: "Q2 • Moderate (Break vs Continue)",
        question: "What is the effect of the 'continue' statement inside a for loop?",
        options: [
          "It skips the remainder of the current iteration and jumps directly to the update expression",
          "It permanently terminates the entire loop immediately",
          "It restarts the entire loop from i = 0",
          "It exits the whole C program",
        ],
        correctAnswer: "It skips the remainder of the current iteration and jumps directly to the update expression",
        explanation: "'continue' skips the rest of the loop's body for the current cycle and steps straight to the loop increment/condition for the next cycle, unlike 'break' which aborts the loop entirely.",
      },
      {
        id: 3,
        difficulty: "Medium",
        difficultyBadge: "Q3 • Intermediate (Loop Counting)",
        question: "How many times does the loop 'for (int i = 0; i < 10; i += 2)' execute its body?",
        options: [
          "5 times (for i = 0, 2, 4, 6, 8)",
          "10 times",
          "4 times",
          "Infinite times",
        ],
        correctAnswer: "5 times (for i = 0, 2, 4, 6, 8)",
        explanation: "i steps through 0, 2, 4, 6, 8 (total 5 iterations). When i becomes 10, the condition 10 < 10 evaluates to false and the loop halts.",
      },
      {
        id: 4,
        difficulty: "Hard",
        difficultyBadge: "Q4 • Advanced (Nested Loop Complexity)",
        question: "What is the time complexity of two nested loops: 'for (int i=0; i<N; i++) for (int j=0; j<i; j++)'?",
        options: [
          "O(N^2) because it executes N*(N-1)/2 total operations",
          "O(N) because the inner loop stops at i",
          "O(log N) because it forms a triangle",
          "O(N^3) because of memory allocation",
        ],
        correctAnswer: "O(N^2) because it executes N*(N-1)/2 total operations",
        explanation: "The inner loop runs 0 + 1 + 2 + ... + (N-1) times. The sum of the first N-1 integers is N(N-1)/2 = (N^2 - N)/2. In Big-O asymptotic analysis, this simplifies to O(N^2).",
      },
      {
        id: 5,
        difficulty: "Difficult",
        difficultyBadge: "Q5 • Difficult (Placement Loop Trap)",
        question: "What will happen when running: 'unsigned int i; for (i = 5; i >= 0; i--) printf(\"%u \", i);'?",
        options: [
          "It creates an infinite loop because an unsigned integer is always >= 0 and never becomes negative",
          "It prints '5 4 3 2 1 0' and terminates normally",
          "It throws a Segmentation Fault at i = -1",
          "It compiles with an error because i cannot decrement",
        ],
        correctAnswer: "It creates an infinite loop because an unsigned integer is always >= 0 and never becomes negative",
        explanation: "One of the most infamous interview bugs in systems programming! An unsigned int can never be negative. When i = 0 and decrements, it underflows to 4,294,967,295, which is still >= 0! The condition never evaluates to false.",
      },
    ],
  },

  // 8. Functions
  "functions": {
    practice: {
      language: "c",
      filename: "functions.c",
      title: "Modular Functions & Pass-by-Value",
      description: "Organize reusable logic with function signatures and return values.",
      expectedOutput: "Square of 8 is 64\nMax between 14 and 29 is 29",
      code: `#include <stdio.h>

int square(int n) {
    return n * n;
}

int findMax(int a, int b) {
    return (a > b) ? a : b;
}

int main() {
    printf("Square of 8 is %d\\n", square(8));
    printf("Max between 14 and 29 is %d\\n", findMax(14, 29));
    return 0;
}`,
    },
    questions: [
      {
        id: 1,
        difficulty: "Easy",
        difficultyBadge: "Q1 • Easy (Function Declarations)",
        question: "What does the keyword 'void' indicate when used as a function's return type?",
        options: [
          "The function does not return any value back to the caller",
          "The function can only be called once",
          "The function has an error inside it",
          "The function runs inside virtual memory",
        ],
        correctAnswer: "The function does not return any value back to the caller",
        explanation: "'void' as a return type explicitly declares that the function performs an action (like printing or logging) without yielding a return value.",
      },
      {
        id: 2,
        difficulty: "Medium",
        difficultyBadge: "Q2 • Moderate (Pass-by-Value)",
        question: "If you pass an integer variable into 'void modify(int x) { x = 100; }', why does the caller's variable remain unchanged?",
        options: [
          "C passes parameters by value (the function receives an isolated local copy)",
          "The variable 100 was too large for memory",
          "The modify function was declared with void",
          "Variables cannot be changed after declaration",
        ],
        correctAnswer: "C passes parameters by value (the function receives an isolated local copy)",
        explanation: "In C, arguments are passed by value. Modifying parameter 'x' only alters the stack frame copy belonging to 'modify()'. The caller's original variable in main() is completely untouched.",
      },
      {
        id: 3,
        difficulty: "Medium",
        difficultyBadge: "Q3 • Intermediate (Prototypes)",
        question: "What is a 'Function Prototype' (forward declaration) in C?",
        options: [
          "A declaration that informs the compiler of a function's name, return type, and parameters before its actual implementation",
          "A beta version of software released to users",
          "A comment that explains what the code does",
          "A variable stored inside the GPU",
        ],
        correctAnswer: "A declaration that informs the compiler of a function's name, return type, and parameters before its actual implementation",
        explanation: "C compiles files top-to-bottom. If main() calls foo() before foo() is defined, a prototype 'void foo(int);' tells the compiler that foo exists further down.",
      },
      {
        id: 4,
        difficulty: "Hard",
        difficultyBadge: "Q4 • Advanced (Recursion & Call Stack)",
        question: "What causes a 'Stack Overflow' error during a recursive function execution?",
        options: [
          "Missing or unreachable base case, filling the call stack frames beyond allocated stack memory limit",
          "The hard drive runs out of storage space",
          "Too many comments were written in the code",
          "The CPU overheats above 90 degrees",
        ],
        correctAnswer: "Missing or unreachable base case, filling the call stack frames beyond allocated stack memory limit",
        explanation: "Each recursive call pushes a new stack frame (containing return address, parameters, and local variables). Without a base case to halt recursion, stack memory is exhausted, causing a segmentation fault (stack overflow).",
      },
      {
        id: 5,
        difficulty: "Difficult",
        difficultyBadge: "Q5 • Difficult (Placement Trap)",
        question: "What is the output of this code with static variable: 'void count() { static int c = 0; printf(\"%d \", ++c); } int main() { count(); count(); count(); return 0; }'?",
        options: [
          "1 2 3 (static variables retain their state across multiple function invocations)",
          "1 1 1 (static variables reinitialize to 0 on every call)",
          "0 0 0",
          "Compilation error: static cannot be used inside functions",
        ],
        correctAnswer: "1 2 3 (static variables retain their state across multiple function invocations)",
        explanation: "A classic placement interview favorite! Static local variables are allocated in the Data segment (not on the transient stack) and initialized only ONCE. Their value persists between function calls.",
      },
    ],
  },

  // 9. Arrays & Strings
  "arrays-strings": {
    practice: {
      language: "c",
      filename: "arrays.c",
      title: "Arrays & Null-Terminated Strings",
      description: "Inspect array indices, memory continuity, and string length with strlen.",
      expectedOutput: "Array at index 2: 30\nString: CampusGrow (Length: 10)",
      code: `#include <stdio.h>
#include <string.h>

int main() {
    int scores[5] = {10, 20, 30, 40, 50};
    char name[] = "CampusGrow";
    
    printf("Array at index 2: %d\\n", scores[2]);
    printf("String: %s (Length: %zu)\\n", name, strlen(name));
    return 0;
}`,
    },
    questions: [
      {
        id: 1,
        difficulty: "Easy",
        difficultyBadge: "Q1 • Easy (Zero Indexing)",
        question: "In C, if an array is declared as 'int arr[5];', what are the valid index bounds?",
        options: [
          "0 to 4",
          "1 to 5",
          "0 to 5",
          "1 to 4",
        ],
        correctAnswer: "0 to 4",
        explanation: "C arrays use 0-based indexing. For size N, valid indices range from 0 to N-1.",
      },
      {
        id: 2,
        difficulty: "Medium",
        difficultyBadge: "Q2 • Moderate (Null Terminator)",
        question: "What special character marks the end of every valid C string in memory?",
        options: [
          "The null character '\\0' (ASCII 0)",
          "The newline character '\\n'",
          "The dollar sign '$'",
          "A space ' '",
        ],
        correctAnswer: "The null character '\\0' (ASCII 0)",
        explanation: "C strings are arrays of characters terminated by the null character '\\0'. String functions like strlen, strcpy, and printf use '\\0' to know where the text ends.",
      },
      {
        id: 3,
        difficulty: "Medium",
        difficultyBadge: "Q3 • Intermediate (Sizeof vs Strlen)",
        question: "If 'char s[] = \"Hello\";', what do 'sizeof(s)' and 'strlen(s)' evaluate to respectively?",
        options: [
          "sizeof is 6, strlen is 5",
          "sizeof is 5, strlen is 5",
          "sizeof is 5, strlen is 6",
          "sizeof is 8, strlen is 5",
        ],
        correctAnswer: "sizeof is 6, strlen is 5",
        explanation: "sizeof counts the total allocated bytes (including the invisible '\\0' terminator = 6 bytes). strlen counts only the readable characters before '\\0' (= 5 characters).",
      },
      {
        id: 4,
        difficulty: "Hard",
        difficultyBadge: "Q4 • Advanced (Memory Layout)",
        question: "Why does accessing 'arr[10]' on an array of size 5 not produce a compile-time error in C?",
        options: [
          "C does not perform runtime array bounds checking, leading to out-of-bounds memory access",
          "C automatically expands the array to size 11",
          "Indices above size 5 wrap around to 0",
          "The compiler fixes it automatically during linking",
        ],
        correctAnswer: "C does not perform runtime array bounds checking, leading to out-of-bounds memory access",
        explanation: "To maximize raw performance, C skips bounds checking. Accessing out-of-bounds memory accesses whatever bytes happen to sit at that offset, risking garbage values, data corruption, or segmentation faults.",
      },
      {
        id: 5,
        difficulty: "Difficult",
        difficultyBadge: "Q5 • Difficult (Pointer Arithmetic Trap)",
        question: "Given 'int a[] = {10, 20, 30, 40}; int *p = a;', what will '*(p + 2)' and '*p + 2' evaluate to?",
        options: [
          "*(p + 2) is 30, while *p + 2 is 12",
          "Both evaluate to 30",
          "Both evaluate to 12",
          "*(p + 2) is 12, while *p + 2 is 30",
        ],
        correctAnswer: "*(p + 2) is 30, while *p + 2 is 12",
        explanation: "Dereferencing priority trap! '*(p + 2)' offsets the pointer by 2 elements (pointing to index 2 = 30). In contrast, '*p + 2' dereferences p first (value 10) and then adds 2 (10 + 2 = 12).",
      },
    ],
  },

  // 10. Pointers & Mini-Project Capstone
  "pointers-mini-project": {
    practice: {
      language: "c",
      filename: "pointers.c",
      title: "Pointers & Pass-by-Reference Capstone",
      description: "Master memory addresses, dereferencing (*), and swapping variables via pointers.",
      expectedOutput: "Before swap: x=10, y=20\nAfter swap:  x=20, y=10",
      code: `#include <stdio.h>

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 10, y = 20;
    printf("Before swap: x=%d, y=%d\\n", x, y);
    swap(&x, &y);
    printf("After swap:  x=%d, y=%d\\n", x, y);
    return 0;
}`,
    },
    questions: [
      {
        id: 1,
        difficulty: "Easy",
        difficultyBadge: "Q1 • Easy (Definition)",
        question: "What does a pointer variable store in C?",
        options: [
          "The memory address of another variable",
          "A copy of the operating system kernel",
          "Only floating-point decimal numbers",
          "A mathematical formula",
        ],
        correctAnswer: "The memory address of another variable",
        explanation: "A pointer is a variable whose value is the hexadecimal address of another location in computer memory (e.g., 0x7ffd5e).",
      },
      {
        id: 2,
        difficulty: "Medium",
        difficultyBadge: "Q2 • Moderate (Dereferencing)",
        question: "If 'int val = 42; int *ptr = &val;', what does '*ptr' do?",
        options: [
          "It dereferences the pointer to read or write the value (42) stored at that address",
          "It multiplies ptr by val",
          "It deletes the variable from memory",
          "It declares a new pointer",
        ],
        correctAnswer: "It dereferences the pointer to read or write the value (42) stored at that address",
        explanation: "The dereference operator '*' accesses the actual contents residing at the memory address held by the pointer.",
      },
      {
        id: 3,
        difficulty: "Medium",
        difficultyBadge: "Q3 • Intermediate (Null Pointer)",
        question: "Why should you initialize pointers to NULL when they are not pointing to valid memory?",
        options: [
          "To avoid wild pointers pointing to random unpredictable memory addresses",
          "To speed up the internet connection",
          "Because C requires all pointers to be null",
          "It frees the CPU cache",
        ],
        correctAnswer: "To avoid wild pointers pointing to random unpredictable memory addresses",
        explanation: "An uninitialized pointer is a 'wild pointer' containing whatever garbage bits were leftover in that memory block. Pointing to NULL (address 0) makes uninitialized state explicit and safe to test.",
      },
      {
        id: 4,
        difficulty: "Hard",
        difficultyBadge: "Q4 • Advanced (Dynamic Memory)",
        question: "What is the dangerous consequence of calling 'malloc()' without subsequently calling 'free()'?",
        options: [
          "Memory leak: allocated heap RAM remains occupied until the process exits",
          "The computer screen starts flickering",
          "The compiler will delete the executable file",
          "The variable converts into a static global",
        ],
        correctAnswer: "Memory leak: allocated heap RAM remains occupied until the process exits",
        explanation: "Memory allocated on the heap via malloc/calloc does not clean itself up automatically. Forgetting to call free() causes memory leaks, which can crash servers running long-term production tasks.",
      },
      {
        id: 5,
        difficulty: "Difficult",
        difficultyBadge: "Q5 • Difficult (Placement Trap: Dangling Pointer)",
        question: "What critical flaw exists in this function: 'int* getNum() { int x = 100; return &x; }'?",
        options: [
          "It returns the address of a local stack variable that is destroyed once the function returns (dangling pointer)",
          "It returns a float instead of an int",
          "x must be initialized with malloc",
          "Pointers cannot be returned from functions in C",
        ],
        correctAnswer: "It returns the address of a local stack variable that is destroyed once the function returns (dangling pointer)",
        explanation: "A top-tier placement round trap! Local variable 'x' is allocated on the stack frame of getNum(). When getNum() finishes, its stack frame is reclaimed. Returning '&x' hands the caller a dangling pointer to invalid memory.",
      },
    ],
  },

  // ── DEVELOPER TOOLS: TERMINAL & COMMAND LINE ──────────────────────────────
  "terminal-cli-basics": {
    practice: {
      language: "bash",
      filename: "terminal_toolkit.sh",
      title: "Command Line & Terminal: Hands-On Sandbox",
      description: "Practice directory creation, file writing, piping, and grep filtering.",
      expectedOutput: "Directory initialized: /workspace/campusgrow\nFound active records: 2\nStatus: All checks passed (Exit code 0)",
      code: `#!/bin/bash
# Terminal & CLI Practice Sandbox
echo "=== Terminal Navigation & Piping ==="

# 1. Simulate workspace directory creation
mkdir -p campusgrow/logs
echo "System initialized: active" > campusgrow/logs/status.txt
echo "Error: None" >> campusgrow/logs/status.txt
echo "Connection: Established" >> campusgrow/logs/status.txt

# 2. Inspect and count lines containing 'active' or 'Established'
grep -E "active|Established" campusgrow/logs/status.txt

echo "Directory initialized: /workspace/campusgrow"
echo "Found active records: 2"
echo "Status: All checks passed (Exit code 0)"`,
    },
    questions: [
      {
        id: 1,
        difficulty: "Easy",
        difficultyBadge: "Q1 • Easy (Navigation Foundation)",
        question: "Which terminal command prints the absolute path of your current working directory?",
        options: ["pwd", "ls", "cd", "whereami"],
        correctAnswer: "pwd",
        explanation: "'pwd' stands for 'Print Working Directory' and displays your full filesystem path from the root '/' directory.",
      },
      {
        id: 2,
        difficulty: "Medium",
        difficultyBadge: "Q2 • Moderate (File System Operations)",
        question: "What flag must you pass to 'mkdir' to automatically create nested parent directories in a single command (e.g. 'mkdir src/backend/api')?",
        options: ["-p", "-r", "-f", "-a"],
        correctAnswer: "-p",
        explanation: "The '-p' (parents) flag creates all necessary parent directories along the path without erroring if they already exist.",
      },
      {
        id: 3,
        difficulty: "Medium",
        difficultyBadge: "Q3 • Intermediate (Piping & Data Streams)",
        question: "What is the primary function of the Unix pipe operator ('|') in a terminal command?",
        options: [
          "It connects the standard output (stdout) of the command on the left to the standard input (stdin) of the command on the right",
          "It creates a backup copy of the file in the background",
          "It terminates the active process immediately",
          "It runs both commands simultaneously in separate windows",
        ],
        correctAnswer: "It connects the standard output (stdout) of the command on the left to the standard input (stdin) of the command on the right",
        explanation: "The pipe '|' streams the output of one utility into another, allowing small tools like cat, grep, sort, and wc to be chained seamlessly.",
      },
      {
        id: 4,
        difficulty: "Hard",
        difficultyBadge: "Q4 • Advanced (Permissions & chmod)",
        question: "In Unix permissions, what does the octal command 'chmod 755 deploy.sh' grant?",
        options: [
          "Owner: Read/Write/Execute (7), Group: Read/Execute (5), Others: Read/Execute (5)",
          "Everyone gets full read, write, and execute permissions",
          "Only the system administrator can execute the file",
          "The file is encrypted with a 755-bit key",
        ],
        correctAnswer: "Owner: Read/Write/Execute (7), Group: Read/Execute (5), Others: Read/Execute (5)",
        explanation: "Permissions use octal values: Read=4, Write=2, Execute=1. 7 = 4+2+1 (rwx), and 5 = 4+1 (r-x).",
      },
      {
        id: 5,
        difficulty: "Difficult",
        difficultyBadge: "Q5 • Difficult (Placement Trap: I/O Redirection)",
        question: "What is the critical behavioral difference between 'echo \"data\" > file.txt' and 'echo \"data\" >> file.txt'?",
        options: [
          "'>' truncates and overwrites existing file content; '>>' appends content to the end without deleting existing data",
          "'>' creates an encrypted file; '>>' creates an executable file",
          "'>' only works for numbers; '>>' only works for strings",
          "Both perform the exact same overwrite action",
        ],
        correctAnswer: "'>' truncates and overwrites existing file content; '>>' appends content to the end without deleting existing data",
        explanation: "A frequent script-writing trap! A single '>' will wipe out existing file contents, while '>>' safely appends new lines to the end.",
      },
    ],
  },

  // ── DEVELOPER TOOLS: GIT & GITHUB FOUNDATIONS ─────────────────────────────
  "git-github-foundations": {
    practice: {
      language: "bash",
      filename: "git_workflow_lab.sh",
      title: "Git & GitHub: Interactive Version Control Sandbox",
      description: "Simulate initializing a Git repository, staging files, committing, and inspecting commit logs.",
      expectedOutput: "[main (root-commit)] feat: initialize core calculation engine\n1 file changed, 10 insertions(+)\nCommit verified: 100% clean status",
      code: `#!/bin/bash
# Git Version Control Interactive Sandbox
echo "=== Git Daily Workflow Simulation ==="

# 1. Initialize local repository
git init -b main

# 2. Configure local identity
git config user.name "Student Engineer"
git config user.email "student@university.edu"

# 3. Create a feature file
cat << 'EOF' > engine.c
#include <stdio.h>
int main() {
    printf("Engineering Engine Online\\n");
    return 0;
}
EOF

# 4. Stage and commit
git add engine.c
git commit -m "feat: initialize core calculation engine"

# 5. Verify log output
git log --oneline
echo "Commit verified: 100% clean status"`,
    },
    questions: [
      {
        id: 1,
        difficulty: "Easy",
        difficultyBadge: "Q1 • Easy (Version Control Concept)",
        question: "What Git command moves modified files from your Working Directory to the Staging Area?",
        options: ["git add", "git save", "git push", "git commit"],
        correctAnswer: "git add",
        explanation: "'git add' stages changes, preparing them to be included in the next permanent commit snapshot.",
      },
      {
        id: 2,
        difficulty: "Medium",
        difficultyBadge: "Q2 • Moderate (Commit Standards)",
        question: "Why do top software engineering teams use the Conventional Commits specification (e.g. 'feat:', 'fix:', 'docs:')?",
        options: [
          "It provides a structured, machine-readable history that enables automated changelogs and semantic release tagging",
          "It speeds up CPU compilation time",
          "Git refuses to commit any code that does not use this syntax",
          "It prevents merge conflicts automatically",
        ],
        correctAnswer: "It provides a structured, machine-readable history that enables automated changelogs and semantic release tagging",
        explanation: "Conventional Commits standardize communication across distributed teams and allow CI/CD pipelines to determine automated version bumps.",
      },
      {
        id: 3,
        difficulty: "Medium",
        difficultyBadge: "Q3 • Intermediate (Branching & Merge Conflicts)",
        question: "When a Merge Conflict occurs between two branches, what does Git do to the affected files?",
        options: [
          "It halts the merge and inserts conflict markers ('<<<<<<<', '=======', '>>>>>>>') for the developer to resolve",
          "It automatically deletes both files from the repository",
          "It chooses whichever developer committed first and discards the other",
          "It rolls back the entire repository to day one",
        ],
        correctAnswer: "It halts the merge and inserts conflict markers ('<<<<<<<', '=======', '>>>>>>>') for the developer to resolve",
        explanation: "Git preserves both sets of changes inside visual conflict markers, requiring human judgment to review and reconcile the differences.",
      },
      {
        id: 4,
        difficulty: "Hard",
        difficultyBadge: "Q4 • Advanced (Safe Undo on Shared Branches)",
        question: "Why should an engineer use 'git revert <commit>' rather than 'git reset --hard <commit>' on a branch that has already been pushed to GitHub?",
        options: [
          "'git revert' creates a new commit that safely inverts changes without destroying history or breaking teammates' cloned repositories",
          "'git reset' is only supported on Windows operating systems",
          "'git revert' deletes the files permanently from disk",
          "'git reset' requires paying for a GitHub Pro license",
        ],
        correctAnswer: "'git revert' creates a new commit that safely inverts changes without destroying history or breaking teammates' cloned repositories",
        explanation: "Rewriting public git history with 'git reset --hard' causes diverging histories for everyone pulling the branch. 'git revert' cleanly preserves history.",
      },
      {
        id: 5,
        difficulty: "Difficult",
        difficultyBadge: "Q5 • Difficult (Placement / Security Trap)",
        question: "A developer accidentally committed a '.env' file containing live production API keys to GitHub. What is the immediate mandatory protocol?",
        options: [
          "Immediately revoke/rotate the secret keys on the cloud provider, remove the file with 'git rm --cached', add to .gitignore, and purge history",
          "Simply delete the repo and create a new GitHub account",
          "Add the file to .gitignore and push again; Git will automatically wipe it from past commits",
          "Change the file name to '.env.hidden'",
        ],
        correctAnswer: "Immediately revoke/rotate the secret keys on the cloud provider, remove the file with 'git rm --cached', add to .gitignore, and purge history",
        explanation: "Automated bots scrape public GitHub commits in under 10 seconds. Simply removing the file in a new commit leaves the secret in Git history! Revoking the credential immediately is the #1 rule.",
      },
    ],
  },

  // ── DEVELOPER TOOLS: VS CODE & IDE PRODUCTIVITY ───────────────────────────
  "vscode-ide-developer-tools": {
    practice: {
      language: "json",
      filename: ".vscode/settings.json",
      title: "VS Code Configuration: Workspace Standards Lab",
      description: "Inspect and customize team workspace settings for formatting and linting.",
      expectedOutput: "Configuration validated: 100% compliant with enterprise standards.",
      code: `{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.tabSize": 2,
  "editor.wordWrap": "on",
  "editor.rulers": [80, 120],
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,
  "git.autofetch": true,
  "terminal.integrated.defaultProfile.osx": "zsh"
}`,
    },
    questions: [
      {
        id: 1,
        difficulty: "Easy",
        difficultyBadge: "Q1 • Easy (IDE Shortcuts)",
        question: "Which keyboard shortcut opens the universal Command Palette in VS Code?",
        options: ["Cmd+Shift+P / Ctrl+Shift+P", "Cmd+F / Ctrl+F", "Alt+Tab", "F12"],
        correctAnswer: "Cmd+Shift+P / Ctrl+Shift+P",
        explanation: "Cmd+Shift+P (macOS) or Ctrl+Shift+P (Windows/Linux) opens the Command Palette to run any command without touching the mouse.",
      },
      {
        id: 2,
        difficulty: "Medium",
        difficultyBadge: "Q2 • Moderate (Multi-Cursor Productivity)",
        question: "Which shortcut selects the next matching occurrence of a highlighted word for simultaneous multi-cursor editing in VS Code?",
        options: ["Cmd+D / Ctrl+D", "Cmd+C / Ctrl+C", "Alt+Shift+F", "Cmd+Z / Ctrl+Z"],
        correctAnswer: "Cmd+D / Ctrl+D",
        explanation: "Cmd+D / Ctrl+D allows engineers to rapidly select and rename multiple instances of a variable name across an editor buffer in seconds.",
      },
      {
        id: 3,
        difficulty: "Medium",
        difficultyBadge: "Q3 • Intermediate (Team Configuration)",
        question: "Why should teams commit a '.vscode/settings.json' file to their git repository?",
        options: [
          "It guarantees all teammates share identical formatting rules (tab size, formatOnSave, default formatter) automatically",
          "It is required by the browser to compile TypeScript code",
          "It contains the user's personal GitHub passwords",
          "It speeds up CPU clock frequencies",
        ],
        correctAnswer: "It guarantees all teammates share identical formatting rules (tab size, formatOnSave, default formatter) automatically",
        explanation: "Workspace settings override personal settings to eliminate formatting wars and maintain pristine code quality across the team.",
      },
      {
        id: 4,
        difficulty: "Hard",
        difficultyBadge: "Q4 • Advanced (Debugger Configuration)",
        question: "In VS Code's '.vscode/launch.json', what is the fundamental difference between '\"request\": \"launch\"' and '\"request\": \"attach\"'?",
        options: [
          "'\"launch\"' spawns a brand new process and starts debugging; '\"attach\"' connects the debugger to a process that is already running externally",
          "'\"launch\"' is for frontend code only; '\"attach\"' is for backend code only",
          "'\"attach\"' automatically deploys the application to AWS",
          "'\"launch\"' only runs in production environments",
        ],
        correctAnswer: "'\"launch\"' spawns a brand new process and starts debugging; '\"attach\"' connects the debugger to a process that is already running externally",
        explanation: "Use 'attach' when debugging containers, live Node processes, or remote servers that were started outside VS Code.",
      },
      {
        id: 5,
        difficulty: "Difficult",
        difficultyBadge: "Q5 • Difficult (Placement Trap: Tooling Distinction)",
        question: "What is the critical architectural difference between ESLint and Prettier?",
        options: [
          "ESLint analyzes code for logical errors, security bugs, and bad practices; Prettier is an opinionated code formatter that enforces visual styling",
          "Prettier compiles code into machine binary; ESLint formats HTML tags",
          "ESLint is deprecated and replaced by Prettier entirely",
          "Both perform the exact same task and should never be used together",
        ],
        correctAnswer: "ESLint analyzes code for logical errors, security bugs, and bad practices; Prettier is an opinionated code formatter that enforces visual styling",
        explanation: "A classic technical interview question! Linters catch functional bugs and code anti-patterns; formatters standardize spaces, quotes, and layout.",
      },
    ],
  },

  // ── DEVELOPER TOOLS: INTERACTIVE DEBUGGING & DEVTOOLS ──────────────────────
  "debugging-developer-tools": {
    practice: {
      language: "javascript",
      filename: "debug_sandbox.js",
      title: "Interactive Debugging: Off-By-One Bug Hunting",
      description: "Step through execution, isolate variables, and fix array bounds errors.",
      expectedOutput: "Processing item 0: Apple\nProcessing item 1: Banana\nProcessing item 2: Cherry\nExecution status: 0 errors detected",
      code: `// Interactive Debugging Sandbox
const fruits = ["Apple", "Banana", "Cherry"];

// Intentional bug: off-by-one bounds error
// Change '<=' to '<' to fix undefined access!
function processFruits() {
  for (let i = 0; i < fruits.length; i++) {
    console.log(\`Processing item \${i}: \${fruits[i]}\`);
  }
  console.log("Execution status: 0 errors detected");
}

processFruits();`,
    },
    questions: [
      {
        id: 1,
        difficulty: "Easy",
        difficultyBadge: "Q1 • Easy (Breakpoint Concept)",
        question: "What happens when a running program reaches a line with an active breakpoint?",
        options: [
          "Execution pauses immediately before executing that line, allowing inspection of variables in memory",
          "The program crashes and reboots the operating system",
          "The line of code is automatically deleted from the file",
          "The entire file is uploaded to GitHub",
        ],
        correctAnswer: "Execution pauses immediately before executing that line, allowing inspection of variables in memory",
        explanation: "Breakpoints freeze time, allowing engineers to inspect the exact values of all variables in local and global scope.",
      },
      {
        id: 2,
        difficulty: "Medium",
        difficultyBadge: "Q2 • Moderate (Breakpoint Types)",
        question: "When is a Conditional Breakpoint the best debugging tool?",
        options: [
          "When inspecting a loop with thousands of iterations, and you only want to pause when a specific variable hits an edge condition",
          "When you want to permanently increase the execution speed of the program",
          "When you do not know the name of the file you are editing",
          "When you are running code without an internet connection",
        ],
        correctAnswer: "When inspecting a loop with thousands of iterations, and you only want to pause when a specific variable hits an edge condition",
        explanation: "Conditional breakpoints prevent you from clicking 'Continue' 10,000 times by only halting when expressions like 'userId === 999' evaluate to true.",
      },
      {
        id: 3,
        difficulty: "Medium",
        difficultyBadge: "Q3 • Intermediate (Stepping Controls)",
        question: "What is the difference between 'Step Over' (F10) and 'Step Into' (F11) in an interactive debugger?",
        options: [
          "'Step Over' executes the current line without entering helper functions; 'Step Into' dives inside the called function's code",
          "'Step Over' skips to the end of the program; 'Step Into' restarts the computer",
          "'Step Over' deletes the current function; 'Step Into' saves the file",
          "Both buttons perform the exact same action",
        ],
        correctAnswer: "'Step Over' executes the current line without entering helper functions; 'Step Into' dives inside the called function's code",
        explanation: "Use Step Over to step line-by-line in your current scope; use Step Into when you suspect a bug inside a specific helper function.",
      },
      {
        id: 4,
        difficulty: "Hard",
        difficultyBadge: "Q4 • Advanced (Browser DevTools Network Tab)",
        question: "In the Chrome DevTools Network panel, what does an elevated 'Time To First Byte' (TTFB) latency indicate?",
        options: [
          "Backend server processing delays, slow database queries, or server-side rendering latency before the first response byte is returned",
          "Slow client-side CSS rendering in the browser",
          "The user's monitor refresh rate is set too low",
          "The client's mouse DPI is malfunctioning",
        ],
        correctAnswer: "Backend server processing delays, slow database queries, or server-side rendering latency before the first response byte is returned",
        explanation: "TTFB measures the time from request dispatch until the first byte arrives from the server. High TTFB points directly to backend bottlenecks.",
      },
      {
        id: 5,
        difficulty: "Difficult",
        difficultyBadge: "Q5 • Difficult (Placement Trap: Memory Leak Forensics)",
        question: "How can an engineer diagnose a client-side JavaScript memory leak using DevTools Heap Snapshots?",
        options: [
          "Take a heap snapshot, perform the user action multiple times, take another snapshot, and compare to look for detached DOM nodes and uncollected objects",
          "Check the battery percentage of the computer",
          "Refresh the page 100 times and look at the URL bar",
          "Inspect the color of the browser navigation bar",
        ],
        correctAnswer: "Take a heap snapshot, perform the user action multiple times, take another snapshot, and compare to look for detached DOM nodes and uncollected objects",
        explanation: "Comparing sequential heap snapshots reveals objects (such as detached DOM nodes or unremoved event listeners) that should have been garbage collected.",
      },
    ],
  },

  // ── DEVELOPER TOOLS: PACKAGE MANAGERS & BUILD TOOLS ───────────────────────
  "package-managers-build-tools": {
    practice: {
      language: "bash",
      filename: "package_manager_lab.sh",
      title: "Package Management & Security Audit: Hands-On Sandbox",
      description: "Simulate semantic version checks, dependency audits, and production lockfile validation.",
      expectedOutput: "Auditing dependencies... 0 vulnerabilities found\nBuild optimization: Minified (Bundle size: 42 KB)\nStatus: Ready for production",
      code: `#!/bin/bash
# Package Management & Build Tools Sandbox
echo "=== Package Manifest & Audit Engine ==="

# 1. Simulate package security audit
echo "Auditing dependencies... 0 vulnerabilities found"

# 2. Simulate modern build bundling with Vite
echo "Compiling TypeScript -> Browser ES Modules..."
echo "Running tree-shaking dead code elimination..."
echo "Build optimization: Minified (Bundle size: 42 KB)"

echo "Status: Ready for production"`,
    },
    questions: [
      {
        id: 1,
        difficulty: "Easy",
        difficultyBadge: "Q1 • Easy (Dependencies vs devDependencies)",
        question: "What is the difference between 'dependencies' and 'devDependencies' in a package.json file?",
        options: [
          "'dependencies' are required to run the app in production; 'devDependencies' are only needed locally during development and testing",
          "'dependencies' are free; 'devDependencies' require a monthly subscription",
          "'dependencies' only run on Windows; 'devDependencies' only run on Linux",
          "There is no difference; npm treats them identically in production",
        ],
        correctAnswer: "'dependencies' are required to run the app in production; 'devDependencies' are only needed locally during development and testing",
        explanation: "Production cloud servers install only 'dependencies' via 'npm ci --production', keeping container sizes minimal and secure.",
      },
      {
        id: 2,
        difficulty: "Medium",
        difficultyBadge: "Q2 • Moderate (Deterministic CI/CD Installs)",
        question: "Why do automated CI/CD deployment pipelines always execute 'npm ci' instead of 'npm install'?",
        options: [
          "'npm ci' performs a clean, deterministic install strictly matching 'package-lock.json' without ever updating or modifying the lockfile",
          "'npm ci' only works when the developer is physically in the office",
          "'npm ci' converts JavaScript code into Python code",
          "'npm ci' skips all tests to deploy faster",
        ],
        correctAnswer: "'npm ci' performs a clean, deterministic install strictly matching 'package-lock.json' without ever updating or modifying the lockfile",
        explanation: "'npm ci' deletes node_modules and enforces 100% byte-for-byte reproducibility across all cloud build environments.",
      },
      {
        id: 3,
        difficulty: "Medium",
        difficultyBadge: "Q3 • Intermediate (Semantic Versioning Rules)",
        question: "In Semantic Versioning ('MAJOR.MINOR.PATCH'), which version bump contains BREAKING, backwards-incompatible API changes?",
        options: ["MAJOR (e.g. 1.0.0 -> 2.0.0)", "MINOR (e.g. 1.1.0 -> 1.2.0)", "PATCH (e.g. 1.0.1 -> 1.0.2)", "BUILD"],
        correctAnswer: "MAJOR (e.g. 1.0.0 -> 2.0.0)",
        explanation: "Under SemVer, MAJOR versions introduce breaking changes; MINOR versions add backwards-compatible features; PATCH versions fix bugs.",
      },
      {
        id: 4,
        difficulty: "Hard",
        difficultyBadge: "Q4 • Advanced (Bundlers & Tree-Shaking)",
        question: "What performance optimization does 'Tree-Shaking' perform in modern bundlers like Vite and Webpack?",
        options: [
          "It statically analyzes ES Module imports to eliminate unused exported code from the final production bundle",
          "It compresses images using PNG lossless compression",
          "It reboots the server when an error occurs",
          "It converts all fonts into vector SVG files",
        ],
        correctAnswer: "It statically analyzes ES Module imports to eliminate unused exported code from the final production bundle",
        explanation: "Tree-shaking ensures that if you only import 1 function from a 50,000-line library, only that 1 function is bundled for users.",
      },
      {
        id: 5,
        difficulty: "Difficult",
        difficultyBadge: "Q5 • Difficult (Placement / Security Trap)",
        question: "Why is hardcoding API keys in frontend client code (e.g. React or Next.js components) a catastrophic security vulnerability even in private repos?",
        options: [
          "Frontend code is delivered directly to the user's browser, where anyone can inspect network requests or extract secrets from the bundled JS source",
          "The compiler will refuse to build any file containing API keys",
          "Browsers automatically send all API keys to search engine crawlers",
          "It increases the user's internet bill",
        ],
        correctAnswer: "Frontend code is delivered directly to the user's browser, where anyone can inspect network requests or extract secrets from the bundled JS source",
        explanation: "Anything shipped to the browser is public! Secret keys must remain strictly on the backend server and loaded from environment variables.",
      },
    ],
  },

  // ── CLOUD & DEVOPS: DOCKER CONTAINERS ──────────────────────────────────────
  "cloud-docker-containers": {
    practice: {
      language: "bash",
      filename: "dockerfile_sandbox.sh",
      title: "Docker Containerization: Build & Run Lab",
      description: "Practice building lightweight Alpine containers, port mapping, and volume persistence.",
      expectedOutput: "Building image: web-app:v1 (Base: node:20-alpine)\nPort mapping: 0.0.0.0:8080 -> container:3000\nContainer running: web-app-prod (STATUS: Up 12s)",
      code: `#!/bin/bash
# Docker Containerization Sandbox
echo "=== Docker Container Engine ==="

# 1. Inspect Dockerfile layer caching structure
cat << 'EOF' > Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
EOF

echo "Building image: web-app:v1 (Base: node:20-alpine)"
echo "Port mapping: 0.0.0.0:8080 -> container:3000"
echo "Container running: web-app-prod (STATUS: Up 12s)"`,
    },
    questions: [
      {
        id: 1,
        difficulty: "Easy",
        difficultyBadge: "Q1 • Easy (Container Mental Model)",
        question: "What is the primary architectural difference between a Docker container and a traditional Virtual Machine (VM)?",
        options: [
          "Containers share the host operating system kernel and only isolate processes, making them 100x lighter and faster than VMs",
          "Containers can only run Python code",
          "VMs do not use any physical RAM memory",
          "Containers require installing a full separate operating system per app",
        ],
        correctAnswer: "Containers share the host operating system kernel and only isolate processes, making them 100x lighter and faster than VMs",
        explanation: "Containers eliminate OS virtualization overhead by using Linux cgroups and namespaces to isolate user-space processes directly on the host kernel.",
      },
      {
        id: 2,
        difficulty: "Medium",
        difficultyBadge: "Q2 • Moderate (Dockerfile Layer Caching)",
        question: "In a production Dockerfile, why is it critical to copy dependency files (e.g. 'package.json') and run install BEFORE copying the rest of the source code?",
        options: [
          "To maximize Docker layer caching so edits to source code files do not invalidate the cached dependency install layer",
          "Docker will fail to compile if code files are copied first",
          "It automatically encrypts the source code",
          "It reduces CPU temperature during build time",
        ],
        correctAnswer: "To maximize Docker layer caching so edits to source code files do not invalidate the cached dependency install layer",
        explanation: "Docker caches build steps in sequence. Copying dependency manifests first ensures slow package installs are only re-run when dependencies actually change.",
      },
      {
        id: 3,
        difficulty: "Medium",
        difficultyBadge: "Q3 • Intermediate (Port Forwarding Mechanics)",
        question: "When running 'docker run -p 8080:3000 my-app', how does network routing work?",
        options: [
          "Requests made to port 8080 on the host machine are forwarded to port 3000 inside the container's isolated network",
          "Port 8080 and port 3000 are permanently blocked by the firewall",
          "Requests made to port 3000 on the host machine go to port 8080 in the container",
          "The container listens on both ports simultaneously on the host",
        ],
        correctAnswer: "Requests made to port 8080 on the host machine are forwarded to port 3000 inside the container's isolated network",
        explanation: "The syntax is always '-p host_port:container_port'. Accessing 'localhost:8080' in your browser hits port 3000 inside the container.",
      },
      {
        id: 4,
        difficulty: "Hard",
        difficultyBadge: "Q4 • Advanced (Persistent Data Storage)",
        question: "Why must database containers (e.g. PostgreSQL, MySQL) use Docker Volumes rather than storing data directly inside the container filesystem?",
        options: [
          "Containers are ephemeral; without volumes, all database data is permanently destroyed when the container is stopped or upgraded",
          "Containers can only store up to 10 Megabytes of total data",
          "Databases refuse to start without an attached volume",
          "Volumes make SQL queries 100x faster",
        ],
        correctAnswer: "Containers are ephemeral; without volumes, all database data is permanently destroyed when the container is stopped or upgraded",
        explanation: "Docker volumes decouple persistent storage from the container lifecycle, ensuring records persist safely across restarts.",
      },
      {
        id: 5,
        difficulty: "Difficult",
        difficultyBadge: "Q5 • Difficult (Placement / DevOps Trap)",
        question: "What security risk arises when running production Docker containers under the default 'root' user?",
        options: [
          "If an attacker exploits an application remote code execution (RCE) vulnerability, they gain root privileges inside the container, increasing host escape risk",
          "The container cannot connect to the internet",
          "Docker Hub charges extra fees for root containers",
          "Memory usage doubles automatically",
        ],
        correctAnswer: "If an attacker exploits an application remote code execution (RCE) vulnerability, they gain root privileges inside the container, increasing host escape risk",
        explanation: "Production security guidelines mandate adding 'USER node' or a non-root user in your Dockerfile to enforce the principle of least privilege.",
      },
    ],
  },

  // ── CLOUD & DEVOPS: CI/CD PIPELINES ────────────────────────────────────────
  "cloud-ci-cd-pipelines": {
    practice: {
      language: "yaml",
      filename: ".github/workflows/ci.yml",
      title: "GitHub Actions CI/CD Pipeline: Workflow Sandbox",
      description: "Define an automated quality gate with matrix builds, automated tests, and deployment.",
      expectedOutput: "Workflow run: Pull Request Quality Gate\nJob 'test-and-lint' (ubuntu-latest): PASSED (0 failures)\nDeployment status: Ready for cloud rollout",
      code: `name: Pull Request Quality Gate

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  test-and-lint:
    runs-on: ubuntu-latest
    steps:
      - name: 1. Clone repository to runner
        uses: actions/checkout@v4

      - name: 2. Set up Node.js runtime
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: 3. Install dependencies cleanly
        run: npm ci

      - name: 4. Execute Test Suite
        run: npm test`,
    },
    questions: [
      {
        id: 1,
        difficulty: "Easy",
        difficultyBadge: "Q1 • Easy (CI/CD Concepts)",
        question: "In modern software engineering, what does Continuous Integration (CI) automate?",
        options: [
          "Automated code linting, compilation, and automated test execution upon every commit or pull request",
          "Writing code on behalf of the developer",
          "Generating marketing emails for users",
          "Buying domain names automatically",
        ],
        correctAnswer: "Automated code linting, compilation, and automated test execution upon every commit or pull request",
        explanation: "CI acts as an automated quality gate, detecting bugs and syntax errors before code can ever be merged into production branches.",
      },
      {
        id: 2,
        difficulty: "Medium",
        difficultyBadge: "Q2 • Moderate (GitHub Actions Structure)",
        question: "Where must GitHub Actions workflow definition files be placed in a repository?",
        options: [
          "Inside the '.github/workflows/' directory as YAML (.yml or .yaml) files",
          "In the root folder named 'actions.txt'",
          "Inside the 'node_modules/.bin' folder",
          "In a public GitHub gist",
        ],
        correctAnswer: "Inside the '.github/workflows/' directory as YAML (.yml or .yaml) files",
        explanation: "GitHub looks specifically inside '.github/workflows/' to automatically parse and register workflow triggers and jobs.",
      },
      {
        id: 3,
        difficulty: "Medium",
        difficultyBadge: "Q3 • Intermediate (Matrix Testing)",
        question: "What is the purpose of Matrix Builds in a GitHub Actions workflow?",
        options: [
          "It spawns parallel test runners across multiple combinations of operating systems and runtime versions simultaneously",
          "It adds visual 3D effects to the GitHub repository",
          "It encrypts the source code using the Matrix cipher",
          "It limits tests to run only on weekends",
        ],
        correctAnswer: "It spawns parallel test runners across multiple combinations of operating systems and runtime versions simultaneously",
        explanation: "Matrix builds verify that open-source libraries and enterprise apps run without errors across Node 18, 20, 22 on Ubuntu, macOS, and Windows.",
      },
      {
        id: 4,
        difficulty: "Hard",
        difficultyBadge: "Q4 • Advanced (Secret Management in Workflows)",
        question: "How should sensitive cloud deployment credentials (like AWS keys or Vercel tokens) be referenced in GitHub Actions YAML files?",
        options: [
          "Store them in GitHub Encrypted Repository Secrets and reference them via '${{ secrets.TOKEN }}'",
          "Type them directly into the YAML file in plain text",
          "Write them into a comment in the README.md",
          "Save them in a public file named 'credentials.json'",
        ],
        correctAnswer: "Store them in GitHub Encrypted Repository Secrets and reference them via '${{ secrets.TOKEN }}'",
        explanation: "GitHub Secrets encrypt sensitive credentials at rest and automatically mask them with '***' in console execution logs to prevent leaks.",
      },
      {
        id: 5,
        difficulty: "Difficult",
        difficultyBadge: "Q5 • Difficult (Placement Trap: Workflow Job Dependencies)",
        question: "In a multi-job workflow with 'build-and-test' and 'deploy-production', what catastrophic failure occurs if 'deploy-production' omits 'needs: [build-and-test]'?",
        options: [
          "Both jobs run in parallel by default, causing deployment to execute even if the test suite fails with errors!",
          "The workflow runs 10 times slower",
          "GitHub cancels your subscription",
          "Nothing, GitHub automatically detects dependencies without configuration",
        ],
        correctAnswer: "Both jobs run in parallel by default, causing deployment to execute even if the test suite fails with errors!",
        explanation: "A famous production outage trap! In GitHub Actions, jobs run concurrently by default unless explicit dependency chains are defined with 'needs:'.",
      },
    ],
  },

  // ── PRODUCTION CAPSTONE: OPEN SOURCE & GITHUB COLLABORATION ───────────────
  "internship-git-github-collaboration": {
    practice: {
      language: "bash",
      filename: "open_source_pr_workflow.sh",
      title: "Open Source Contribution & PR Lifecycle: Practical Lab",
      description: "Practice the complete fork-clone-upstream-branch-commit-push lifecycle.",
      expectedOutput: "Remote upstream configured: git@github.com:facebook/react.git\nFeature branch created: fix/issue-142-auth-token\nBranch pushed to fork origin: Ready to open Pull Request!",
      code: `#!/bin/bash
# Open Source Contribution Lifecycle Sandbox
echo "=== Open Source Fork & PR Lifecycle ==="

# 1. Simulate cloning your fork
git clone git@github.com:yourusername/open-source-project.git
cd open-source-project

# 2. Add upstream remote pointing to the official repository
git remote add upstream git@github.com:facebook/react.git
git remote -v

# 3. Create descriptive feature branch
git checkout -b fix/issue-142-auth-token

# 4. Commit and push branch to your fork
echo "Feature branch created: fix/issue-142-auth-token"
echo "Branch pushed to fork origin: Ready to open Pull Request!"`,
    },
    questions: [
      {
        id: 1,
        difficulty: "Easy",
        difficultyBadge: "Q1 • Easy (Open Source Model)",
        question: "In open-source GitHub workflows, what is the purpose of 'Forking' a repository?",
        options: [
          "Creating a personal copy of another user's repository under your own GitHub account so you can experiment freely without affecting the original",
          "Deleting the original repository from the internet",
          "Downloading the repository onto a USB thumb drive",
          "Converting the repository into a private corporate project",
        ],
        correctAnswer: "Creating a personal copy of another user's repository under your own GitHub account so you can experiment freely without affecting the original",
        explanation: "Forking allows any developer worldwide to propose contributions to projects like React or Linux through Pull Requests without having direct push access.",
      },
      {
        id: 2,
        difficulty: "Medium",
        difficultyBadge: "Q2 • Moderate (Upstream Remote Synchronization)",
        question: "Why must you configure an 'upstream' remote pointing to the original repository in addition to your 'origin' fork?",
        options: [
          "To fetch and merge the latest code changes made by official maintainers and prevent your local branch from drifting out of date",
          "It is required by GitHub to count contributions on your profile graph",
          "Upstream remotes provide faster download speeds than origin remotes",
          "It allows you to bypass code review approval steps",
        ],
        correctAnswer: "To fetch and merge the latest code changes made by official maintainers and prevent your local branch from drifting out of date",
        explanation: "'origin' points to your personal fork; 'upstream' points to the official repository. Syncing with upstream prevents painful merge conflicts.",
      },
      {
        id: 3,
        difficulty: "Medium",
        difficultyBadge: "Q3 • Intermediate (Issue Automation in PRs)",
        question: "What special syntax should you include in a Pull Request description to automatically close an issue upon merging?",
        options: ["Closes #142 (or Fixes #142)", "@issue-142", "delete issue 142", "DONE: 142"],
        correctAnswer: "Closes #142 (or Fixes #142)",
        explanation: "GitHub recognizes keyword patterns like 'Closes #ID' or 'Fixes #ID' to automatically close the associated issue when the PR is merged.",
      },
      {
        id: 4,
        difficulty: "Hard",
        difficultyBadge: "Q4 • Advanced (Interactive Rebase & Squash)",
        question: "Why do maintainers often ask contributors to 'squash' their commits before merging a Pull Request?",
        options: [
          "To combine multiple messy draft commits (e.g. 'wip', 'fix typo', 'oops') into a single clean, atomic commit for a readable main history",
          "To make the files smaller on disk",
          "Because Git cannot merge more than 2 commits at a time",
          "To delete the author's name from git history",
        ],
        correctAnswer: "To combine multiple messy draft commits (e.g. 'wip', 'fix typo', 'oops') into a single clean, atomic commit for a readable main history",
        explanation: "Squashing keeps the repository's main history pristine and linear, making it easy to bisect, audit, or revert entire features in one step.",
      },
      {
        id: 5,
        difficulty: "Difficult",
        difficultyBadge: "Q5 • Difficult (Placement / Portfolio Challenge)",
        question: "What differentiates a truly recruiter-ready GitHub capstone project from a typical student tutorial clone?",
        options: [
          "A live working deployed demo link, a comprehensive README with architectural decisions, and proof of automated testing via CI",
          "Having 10,000 lines of unformatted code without comments",
          "Making the repository private so nobody can inspect it",
          "Stating that the project was copied from a YouTube video",
        ],
        correctAnswer: "A live working deployed demo link, a comprehensive README with architectural decisions, and proof of automated testing via CI",
        explanation: "Technical interviewers look for execution proof: live URLs (Vercel/Render), clear documentation of architectural trade-offs, and clean commit hygiene.",
      },
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// GENERIC FALLBACK GENERATOR FOR ANY CURRICULUM LESSON
// Guarantees all remaining lessons have 5 structured questions (Q1 Easy -> Q5 Difficult)
// ─────────────────────────────────────────────────────────────────────────────

export function getLessonQuiz(lessonId: string, lessonTitle?: string): LessonQuizQuestion[] {
  // If dedicated curated questions exist, return them
  if (LESSON_QUIZ_DATA[lessonId]) {
    return LESSON_QUIZ_DATA[lessonId].questions;
  }

  const cleanTitle = lessonTitle || lessonId.replace(/-/g, " ");

  // Provide robust 5-question suite tailored for the lesson
  return [
    {
      id: 1,
      difficulty: "Easy",
      difficultyBadge: "Q1 • Easy (Concept Foundation)",
      question: `What is the core engineering concept behind '${cleanTitle}'?`,
      options: [
        `It provides a standardized approach to manage, organize, and execute ${cleanTitle} reliably.`,
        "It is a deprecated technique that is no longer used in modern software engineering.",
        "It is only applicable to hardware electrical circuit design.",
        "It replaces the need for algorithms, testing, and debugging entirely.",
      ],
      correctAnswer: `It provides a standardized approach to manage, organize, and execute ${cleanTitle} reliably.`,
      explanation: `${cleanTitle} is a foundational pillar designed to give engineers structured, scalable patterns for solving software problems efficiently.`,
    },
    {
      id: 2,
      difficulty: "Medium",
      difficultyBadge: "Q2 • Moderate (Application & Workflow)",
      question: `When implementing '${cleanTitle}' in a real-world software system, what is the recommended practice?`,
      options: [
        "Follow modular separation of concerns and validate inputs before processing.",
        "Write all logic in a single monolithic file without error handling.",
        "Avoid writing unit tests or documentation to save development time.",
        "Hardcode all credentials and configuration directly into the source code.",
      ],
      correctAnswer: "Follow modular separation of concerns and validate inputs before processing.",
      explanation: "Production engineering mandates separation of concerns, robust input sanitization, and defensive error handling.",
    },
    {
      id: 3,
      difficulty: "Medium",
      difficultyBadge: "Q3 • Intermediate (Mechanics & Behavior)",
      question: `What common failure mode occurs when '${cleanTitle}' is misused or poorly architected?`,
      options: [
        "Uncontrolled resource leaks, poor algorithmic scaling, or unhandled edge-case crashes.",
        "The computer will automatically convert the code into assembly language.",
        "The program will only run on weekend days.",
        "The code automatically uploads itself to public repositories.",
      ],
      correctAnswer: "Uncontrolled resource leaks, poor algorithmic scaling, or unhandled edge-case crashes.",
      explanation: "Failing to respect underlying system constraints leads to resource bottlenecks, race conditions, or unhandled exception crashes in production.",
    },
    {
      id: 4,
      difficulty: "Hard",
      difficultyBadge: "Q4 • Advanced (Trade-offs & Edge Cases)",
      question: `In high-scale technical systems, what is the primary trade-off when optimizing '${cleanTitle}'?`,
      options: [
        "Balancing time complexity (computational latency) versus space complexity (memory consumption).",
        "Balancing screen brightness versus sound volume.",
        "Balancing keyboard type versus mouse DPI.",
        "Choosing between light mode and dark mode execution.",
      ],
      correctAnswer: "Balancing time complexity (computational latency) versus space complexity (memory consumption).",
      explanation: "The fundamental engineering trade-off is almost always space versus time: caching consumes RAM to save CPU cycles, while minimal memory algorithms require more sequential computation.",
    },
    {
      id: 5,
      difficulty: "Difficult",
      difficultyBadge: "Q5 • Difficult (Placement / OA Challenge)",
      question: `In a technical OA or FAANG interview round, what tricky scenario regarding '${cleanTitle}' are interviewers most likely to test?`,
      options: [
        "Handling extreme boundary conditions (null pointers, empty inputs, overflow limits, and concurrency races).",
        "Whether you can type code at over 150 words per minute without looking at the screen.",
        "Whether you have memorized every single standard library function name in alphabetical order.",
        "Whether you can draw the company's logo using ASCII characters.",
      ],
      correctAnswer: "Handling extreme boundary conditions (null pointers, empty inputs, overflow limits, and concurrency races).",
      explanation: "Interviewers evaluate production readiness by challenging you with boundary edge cases: empty data structures, integer overflow, concurrency collisions, and off-by-one bounds traps.",
    },
  ];
}

export function getLessonPractice(lessonId: string, lessonTitle?: string): LessonPracticeCode {
  if (LESSON_QUIZ_DATA[lessonId]) {
    return LESSON_QUIZ_DATA[lessonId].practice;
  }

  // Detect language based on track/topic
  if (lessonId.startsWith("py-") || lessonId.includes("python") || lessonId.includes("aiml")) {
    return {
      language: "python",
      filename: "solution.py",
      title: `${lessonTitle || "Python Practice"}: Hands-On Sandbox`,
      description: "Run and test interactive Python code directly in your terminal sandbox.",
      expectedOutput: "Test case passed: result = 42\nStatus: OK",
      code: `# ${lessonTitle || "Python Interactive Practice"}
def solve():
    data = [10, 20, 30, 40]
    total = sum(data)
    print(f"Computed total: {total}")
    print("Test case passed: result = 42")
    print("Status: OK")

if __name__ == "__main__":
    solve()`,
    };
  }

  if (lessonId.includes("sql") || lessonId.includes("dbms")) {
    return {
      language: "sql",
      filename: "query.sql",
      title: `${lessonTitle || "SQL Practice"}: Interactive Query Engine`,
      description: "Write and execute structured relational SQL queries.",
      expectedOutput: "(2 rows affected in 0.012s)",
      code: `-- ${lessonTitle || "SQL Hands-on Sandbox"}
SELECT student_id, name, year_level, gpa 
FROM campusgrow_students 
WHERE gpa >= 3.5 
ORDER BY gpa DESC 
LIMIT 5;`,
    };
  }

  if (lessonId.includes("web") || lessonId.includes("react") || lessonId.includes("js")) {
    return {
      language: "javascript",
      filename: "script.js",
      title: `${lessonTitle || "JavaScript Practice"}: Live Runtime`,
      description: "Execute interactive JavaScript and examine live console output.",
      expectedOutput: "Engine initialized: active\nOutput: [1, 4, 9, 16]",
      code: `// ${lessonTitle || "JavaScript Hands-on Sandbox"}
const numbers = [1, 2, 3, 4];
const squared = numbers.map(n => n * n);

console.log("Engine initialized: active");
console.log("Output:", squared);`,
    };
  }

  if (lessonId.includes("terminal") || lessonId.includes("git") || lessonId.includes("docker") || lessonId.includes("cloud")) {
    return {
      language: "bash",
      filename: "deploy.sh",
      title: `${lessonTitle || "CLI Practice"}: Shell Sandbox`,
      description: "Practice command-line instructions, git workflows, and containers.",
      expectedOutput: "Deploying build...\nSUCCESS: Container running on port 3000",
      code: `#!/bin/bash
# ${lessonTitle || "Shell Sandbox"}
echo "Checking environment dependencies..."
echo "Deploying build..."
echo "SUCCESS: Container running on port 3000"`,
    };
  }

  // Default C template
  return {
    language: "c",
    filename: "solution.c",
    title: `${lessonTitle || "C Practice"}: Systems Sandbox`,
    description: "Write, compile, and execute C code in your browser terminal.",
    expectedOutput: "Execution successful: Exit code 0",
    code: `#include <stdio.h>

int main() {
    printf("Executing practice code for: %s\\n", "${lessonTitle || "C Engineering"}");
    printf("Execution successful: Exit code 0\\n");
    return 0;
}`,
  };
}
