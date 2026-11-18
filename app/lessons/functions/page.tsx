"use client";
import LessonPage from "@/components/LessonPage";

export default function Functions() {
  return (
    <LessonPage
      lessonId="functions"
      lessonNumber={8}
      title="Functions: Modular Architecture & Call Stack Mastery"
      category="Year 1 • Foundations"
      readTime="45 min modular mastery"
      description="Write cleaner, reusable, production-ready code! Master functions from input parameters and return types to stack frames, static variables, recursion memory limits, and function pointer callbacks."
      question={{
        question: "Which keyword is used inside a function to send the calculated answer back to the part of the program that called it?",
        options: ["`send`", "`return`", "`output`", "`finish`"],
        correctAnswer: "`return`",
        explanation:
          "The `return` statement immediately ends the function and hands the result back to where the function was called!",
      }}
    >
      {/* ────────────────────────────────────────────────────────────── */}
      {/* 🟢 LEVEL 1: FOUNDATIONS & SYNTAX                               */}
      {/* ────────────────────────────────────────────────────────────── */}
      <div className="space-y-8">
        <div className="flex items-center justify-between border-b border-emerald-200 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🟢</span>
            <h2 className="text-lg font-black uppercase tracking-wider text-emerald-800">
              Function Abstractions &amp; Modular Execution
            </h2>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Intuition First
          </span>
        </div>

        {/* Section 1: What is a Function? */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            1. What is a Function? The Kitchen Blender Model
          </h3>
          <p className="text-gray-700 leading-7">
            Think of a function like a <strong className="text-gray-950">kitchen blender</strong>:
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-blue-200 bg-blue-50/60 p-4 text-center">
              <span className="text-2xl">🍓🥛</span>
              <p className="font-bold text-blue-800 text-xs mt-1">1. Inputs (Parameters)</p>
              <p className="text-xs text-gray-600 mt-0.5">You drop strawberries and milk into the blender jar.</p>
            </div>
            <div className="rounded-2xl border border-purple-200 bg-purple-50/60 p-4 text-center">
              <span className="text-2xl">⚙️🌪️</span>
              <p className="font-bold text-purple-800 text-xs mt-1">2. Process (Function Body)</p>
              <p className="text-xs text-gray-600 mt-0.5">The motor spins blades to blend everything together.</p>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 text-center">
              <span className="text-2xl">🥤</span>
              <p className="font-bold text-emerald-800 text-xs mt-1">3. Output (Return Value)</p>
              <p className="text-xs text-gray-600 mt-0.5">It serves you a delicious strawberry smoothie!</p>
            </div>
          </div>
          <p className="mt-4 text-gray-700 leading-7">
            In C, a function is a named, reusable sub-program. You write the logic once, and you can call it hundreds of times across your codebase without duplicating a single line.
          </p>
        </section>

        {/* Section 2: Writing & Calling a Function */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            2. Writing and Calling Functions in C
          </h3>
          <pre className="overflow-x-auto rounded-2xl bg-slate-900 border border-slate-800 p-6 text-sm leading-7 font-mono text-emerald-300">
{`#include <stdio.h>

// Function definition: takes two integers, returns their sum
int add(int a, int b) {
    return a + b; // Hand answer back to caller
}

// void function: performs an action without returning any value
void printGreeting(char name[]) {
    printf("Hello, %s! Welcome to CampusGrow.\\n", name);
}

int main() {
    printGreeting("Aarav");

    int total = add(15, 25); // Calls add, stores 40 into 'total'
    printf("Sum: %d\\n", total);

    return 0;
}`}
          </pre>
        </section>
      </div>

      {/* ────────────────────────────────────────────────────────────── */}
      {/* 🟡 LEVEL 2: INTERMEDIATE CORE & CALL STACK ARCHITECTURE        */}
      {/* ────────────────────────────────────────────────────────────── */}
      <div className="space-y-8 mt-12">
        <div className="flex items-center justify-between border-b border-amber-200 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🟡</span>
            <h2 className="text-lg font-black uppercase tracking-wider text-amber-900">
              Call Stack Architecture, Activation Frames &amp; Recursion Mechanics
            </h2>
          </div>
          <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Memory &amp; Scope
          </span>
        </div>

        {/* Section 3: Function Prototypes */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            3. Function Prototypes (Forward Declarations)
          </h3>
          <p className="text-gray-700 leading-7">
            The C compiler reads code from top to bottom. If <code className="font-mono">main()</code> calls a function declared lower down in the file, the compiler throws an <em>&quot;implicit declaration&quot;</em> error. A <strong className="text-amber-800">function prototype</strong> informs the compiler ahead of time:
          </p>
          <pre className="mt-3 overflow-x-auto rounded-2xl bg-slate-900 border border-slate-800 p-5 text-xs sm:text-sm font-mono text-emerald-300">
{`#include <stdio.h>

// 1. Function Prototype (Tells compiler: "This function exists below!")
int multiply(int x, int y);

int main() {
    int ans = multiply(4, 5); // Compiler knows signature -> Valid!
    printf("Answer: %d\\n", ans);
    return 0;
}

// 2. Full Implementation
int multiply(int x, int y) {
    return x * y;
}`}
          </pre>
        </section>

        {/* Section 4: Variable Scope & static Variables */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            4. Scope &amp; The Power of static Local Variables
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <span className="font-mono text-sm font-black text-blue-700">Regular Local Variable</span>
              <p className="text-xs text-gray-600 mt-1">Destroyed the moment the function finishes execution.</p>
              <pre className="mt-2 rounded-xl bg-slate-900 p-3 text-xs font-mono text-blue-300">
{`void count() {
    int c = 0;
    c++;
    printf("%d ", c);
}
// Calling count() 3 times prints:
// 1 1 1`}
              </pre>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-5">
              <span className="font-mono text-sm font-black text-amber-800">static Local Variable</span>
              <p className="text-xs text-gray-600 mt-1">Preserves its value in the Data segment across multiple function calls!</p>
              <pre className="mt-2 rounded-xl bg-slate-900 p-3 text-xs font-mono text-amber-300">
{`void count() {
    static int c = 0; // Stays alive!
    c++;
    printf("%d ", c);
}
// Calling count() 3 times prints:
// 1 2 3`}
              </pre>
            </div>
          </div>
        </section>

        {/* Section 5: The Call Stack & Activation Records */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            5. The Call Stack &amp; Stack Frame Anatomy
          </h3>
          <p className="text-gray-700 leading-7">
            When a function is called, the CPU allocates an <strong>Activation Record (Stack Frame)</strong> containing:
          </p>
          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-2 text-xs sm:text-sm text-gray-800 font-mono">
            <p>1. <strong className="text-blue-700">Return Address:</strong> Where the instruction pointer jumps back after execution finishes.</p>
            <p>2. <strong className="text-purple-700">Input Arguments:</strong> Copied parameter values passed by the caller.</p>
            <p>3. <strong className="text-emerald-700">Local Variables:</strong> Memory allocated for all variables declared inside &#123; &#125;.</p>
            <p>4. <strong className="text-amber-700">Frame Pointer (%rbp):</strong> CPU register tracking stack frame boundaries.</p>
          </div>
        </section>
      </div>

      {/* ────────────────────────────────────────────────────────────── */}
      {/* 🟣 LEVEL 3: ADVANCED MASTERY & FAANG PLACEMENT TRAPS           */}
      {/* ────────────────────────────────────────────────────────────── */}
      <div className="space-y-8 mt-12">
        <div className="flex items-center justify-between border-b border-purple-200 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🟣</span>
            <h2 className="text-lg font-black uppercase tracking-wider text-purple-900">
              Stack Overflow Prevention, Tail-Call Optimization &amp; ABI Conventions
            </h2>
          </div>
          <span className="text-xs font-bold text-purple-800 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            Recursion &amp; Traps
          </span>
        </div>

        {/* Section 6: Recursion vs Iteration Stack Cost */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            6. Recursion Mechanics &amp; The Stack Overflow Danger
          </h3>
          <p className="text-gray-700 leading-7 mb-4">
            Recursion is when a function calls itself. Every recursive call pushes a new stack frame onto the Call Stack. Without a proper base condition, the stack exceeds the thread memory limit (default 8MB on Linux), crashing with a <strong>Segmentation Fault (Stack Overflow)</strong>.
          </p>

          <pre className="overflow-x-auto rounded-2xl bg-slate-900 border border-slate-800 p-6 text-sm leading-7 font-mono text-emerald-300">
{`// Factorial with O(N) Call Stack auxiliary space:
int factorial(int n) {
    if (n <= 1) return 1;          // BASE CASE: Halts recursion!
    return n * factorial(n - 1);    // RECURSIVE STEP: Adds stack frame
}

// Tail-Recursive Factorial (Optimized by GCC -O2 into an O(1) space loop):
int factorialTail(int n, int accumulator) {
    if (n <= 1) return accumulator;
    return factorialTail(n - 1, n * accumulator); // Nothing left to compute after call!
}`}
          </pre>
        </section>

        {/* Section 7: Macro vs Inline Function Trap */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            7. The Macro Double Evaluation Bug vs inline Functions
          </h3>
          <div className="rounded-2xl border border-rose-300 bg-rose-50/60 p-5">
            <p className="text-sm font-bold text-rose-900">🚨 Classic System Software Bug:</p>
            <pre className="mt-3 rounded-xl bg-slate-900 p-4 text-xs font-mono text-rose-300">
{`#define SQUARE(x) ((x) * (x))

int a = 3;
int ans = SQUARE(a++); // WHAT IS ans AND a?`}
            </pre>
            <p className="mt-3 text-xs sm:text-sm text-gray-800 leading-relaxed">
              <strong>Answer:</strong> The preprocessor substitutes text literally: <code className="font-mono">((a++) * (a++))</code>. Here <code className="font-mono">a</code> increments <strong>TWICE</strong>! Result is undefined behavior.
              <br /><br />
              <strong>Production Fix:</strong> Always use type-safe <code className="font-mono font-bold text-emerald-700">static inline</code> functions instead of macros:
              <br />
              <code className="font-mono text-slate-900 font-bold">static inline int square(int x) &#123; return x * x; &#125;</code>
            </p>
          </div>
        </section>

        {/* Section 8: Function Pointers & Callbacks */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            8. Function Pointers: High-Performance Callbacks (qsort)
          </h3>
          <p className="text-gray-700 leading-7 mb-4">
            Functions reside in the <em>.text</em> segment of machine code, which means they also have memory addresses! You can pass a function as an argument to another function:
          </p>

          <pre className="overflow-x-auto rounded-2xl bg-slate-900 border border-slate-800 p-6 text-sm leading-7 font-mono text-emerald-300">
{`#include <stdio.h>
#include <stdlib.h>

// Custom comparator function passed into standard C qsort()
int compareAscending(const void *a, const void *b) {
    return (*(int *)a - *(int *)b);
}

int main() {
    int numbers[] = {42, 12, 88, 3, 27};
    int size = sizeof(numbers) / sizeof(numbers[0]);

    // qsort takes the function pointer to compare elements!
    qsort(numbers, size, sizeof(int), compareAscending);

    printf("Sorted: ");
    for (int i = 0; i < size; i++) printf("%d ", numbers[i]);
    printf("\\n");
    return 0;
}`}
          </pre>
        </section>
      </div>
    </LessonPage>
  );
}
