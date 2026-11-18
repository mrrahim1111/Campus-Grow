"use client";
import LessonPage from "@/components/LessonPage";

export default function CProgramming() {
  return (
    <LessonPage
      lessonId="c-programming"
      lessonNumber={2}
      title="Introduction to C: Compilation Pipeline &amp; Memory Segments"
      category="Year 1 • Foundations"
      readTime="38 min deep-dive & terminal"
      description="Write and understand your first C program! Master C from Hello World syntax to the 4 stages of the GCC compilation pipeline, command line arguments (argc/argv), and virtual memory segments."
      question={{
        question: "Where does every C program start executing when you run it?",
        options: [
          "At the very first line of the file, regardless of what is written",
          "Inside the `main()` function",
          "Inside the `#include` header file",
          "It picks a random function to start",
        ],
        correctAnswer: "Inside the `main()` function",
        explanation:
          "In C, `main()` is the designated front door of your program! No matter how many functions or lines of code you have, the computer always starts executing instructions right inside `main()`.",
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
              Language Foundations &amp; Hello World Mental Model
            </h2>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            First Principles
          </span>
        </div>

        {/* Section 1: Why Learn C? */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            1. Why Learn C? The Mother of Modern Software
          </h3>
          <p className="text-gray-700 leading-7">
            Created by Dennis Ritchie at Bell Labs in 1972, C is the foundation of modern computing. The Linux kernel, macOS Darwin kernel, Windows NT, Git, PostgreSQL, Redis, and the Python CPython interpreter are all written in C.
          </p>
          <div className="mt-4 rounded-2xl border border-emerald-300 bg-emerald-50/60 p-5">
            <p className="text-xs sm:text-sm text-gray-800 font-medium leading-relaxed">
              When you code in Python or JavaScript, layers of virtual machines hide how memory and the CPU actually work. C gives you raw, unfiltered control over memory addresses and clock cycles.
            </p>
          </div>
        </section>

        {/* Section 2: Hello World */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            2. Your First C Program: Line-by-Line Dissection
          </h3>
          <pre className="overflow-x-auto rounded-2xl bg-slate-900 border border-slate-800 p-6 text-sm leading-7 font-mono text-emerald-300">
{`#include <stdio.h> // 1. Preprocessor directive: brings in Standard I/O library

int main() {        // 2. The entry point of every C program
    printf("Hello, World!\\n"); // 3. Prints string to stdout; '\\n' is newline
    return 0;       // 4. Returns exit code 0 (Success) to the operating system
}`}
          </pre>

          <div className="mt-4 grid gap-3 sm:grid-cols-4 text-xs font-mono">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <span className="font-bold text-blue-700">\\n</span>
              <p className="text-gray-600 mt-1">Newline (Enter key)</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <span className="font-bold text-blue-700">\\t</span>
              <p className="text-gray-600 mt-1">Horizontal Tab space</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <span className="font-bold text-blue-700">\\\\</span>
              <p className="text-gray-600 mt-1">Backslash character</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <span className="font-bold text-blue-700">\\&quot;</span>
              <p className="text-gray-600 mt-1">Double quotation mark</p>
            </div>
          </div>
        </section>
      </div>

      {/* ────────────────────────────────────────────────────────────── */}
      {/* 🟡 LEVEL 2: INTERMEDIATE CORE & COMPILATION PIPELINE           */}
      {/* ────────────────────────────────────────────────────────────── */}
      <div className="space-y-8 mt-12">
        <div className="flex items-center justify-between border-b border-amber-200 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🟡</span>
            <h2 className="text-lg font-black uppercase tracking-wider text-amber-900">
              4-Stage GCC Compilation Pipeline (Preprocess ➔ Compile ➔ Assemble ➔ Link)
            </h2>
          </div>
          <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Build Mechanics
          </span>
        </div>

        {/* Section 3: The 4 GCC Compilation Stages */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            3. The 4 Stages of GCC Compilation
          </h3>
          <p className="text-gray-700 leading-7 mb-4">
            When you type <code className="font-mono font-bold text-amber-700">gcc main.c</code>, GCC executes four distinct tools behind the scenes:
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <span className="font-mono text-xs font-black text-blue-700">1. Preprocessing (gcc -E)</span>
              <p className="text-xs text-gray-600 mt-1">
                Removes all comments, expands macros (<code className="font-mono">#define</code>), and copies header files into code.
              </p>
              <div className="mt-2 font-mono text-[11px] text-slate-500">Output: main.i</div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <span className="font-mono text-xs font-black text-purple-700">2. Compilation (gcc -S)</span>
              <p className="text-xs text-gray-600 mt-1">
                Translates clean C source code into human-readable assembly instructions tailored to the target CPU.
              </p>
              <div className="mt-2 font-mono text-[11px] text-slate-500">Output: main.s (Assembly)</div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <span className="font-mono text-xs font-black text-amber-700">3. Assembly (gcc -c)</span>
              <p className="text-xs text-gray-600 mt-1">
                The assembler (<code className="font-mono">as</code>) converts assembly mnemonics into raw machine code 0s and 1s.
              </p>
              <div className="mt-2 font-mono text-[11px] text-slate-500">Output: main.o (Object file)</div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <span className="font-mono text-xs font-black text-emerald-700">4. Linking (gcc -o)</span>
              <p className="text-xs text-gray-600 mt-1">
                The linker (<code className="font-mono">ld</code>) merges all object files with standard C library implementations (<code className="font-mono">libc</code>).
              </p>
              <div className="mt-2 font-mono text-[11px] text-slate-500">Output: a.out (Executable)</div>
            </div>
          </div>
        </section>

        {/* Section 4: Command Line Arguments */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            4. Command-Line Arguments: argc and argv
          </h3>
          <p className="text-gray-700 leading-7 mb-4">
            Professional CLI tools (like <code className="font-mono">git commit -m &quot;msg&quot;</code>) accept parameters directly from the terminal shell:
          </p>

          <pre className="overflow-x-auto rounded-2xl bg-slate-900 border border-slate-800 p-6 text-sm leading-7 font-mono text-emerald-300">
{`#include <stdio.h>

int main(int argc, char *argv[]) {
    printf("Total arguments received: %d\\n", argc);

    for (int i = 0; i < argc; i++) {
        printf("argv[%d] = %s\\n", i, argv[i]);
    }
    return 0; // 0 indicates successful execution to shell (echo $?)
}`}
          </pre>
        </section>
      </div>

      {/* ────────────────────────────────────────────────────────────── */}
      {/* 🟣 LEVEL 3: ADVANCED MASTERY & MEMORY SEGMENTS                 */}
      {/* ────────────────────────────────────────────────────────────── */}
      <div className="space-y-8 mt-12">
        <div className="flex items-center justify-between border-b border-purple-200 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🟣</span>
            <h2 className="text-lg font-black uppercase tracking-wider text-purple-900">
              Process Memory Segments (Text, Data, BSS, Heap, Stack)
            </h2>
          </div>
          <span className="text-xs font-bold text-purple-800 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            Memory Layout
          </span>
        </div>

        {/* Section 5: The 5 Memory Segments */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            5. Virtual Memory Segments of a Running C Program
          </h3>
          <p className="text-gray-700 leading-7 mb-4">
            When the OS loads an executable into RAM, it partitions the process address space into 5 distinct memory segments:
          </p>

          <div className="space-y-3 font-mono text-xs sm:text-sm">
            <div className="rounded-xl border border-purple-300 bg-purple-50/70 p-4">
              <span className="font-bold text-purple-900">1. Stack Segment (Grows Downward &darr;)</span>
              <p className="text-gray-600 mt-1">Stores function stack frames, local variables, and return pointers. Automatically managed by CPU.</p>
            </div>
            <div className="rounded-xl border border-blue-300 bg-blue-50/70 p-4">
              <span className="font-bold text-blue-900">2. Heap Segment (Grows Upward &uarr;)</span>
              <p className="text-gray-600 mt-1">Dynamic memory allocated manually by developer via <code className="font-mono">malloc()</code> and released via <code className="font-mono">free()</code>.</p>
            </div>
            <div className="rounded-xl border border-amber-300 bg-amber-50/70 p-4">
              <span className="font-bold text-amber-900">3. BSS Segment (Block Started by Symbol)</span>
              <p className="text-gray-600 mt-1">Contains uninitialized global and static variables. Automatically zeroed by OS kernel on startup.</p>
            </div>
            <div className="rounded-xl border border-emerald-300 bg-emerald-50/70 p-4">
              <span className="font-bold text-emerald-900">4. Data Segment (Initialized)</span>
              <p className="text-gray-600 mt-1">Stores explicitly initialized global and static variables (e.g. <code className="font-mono">int global_counter = 100;</code>).</p>
            </div>
            <div className="rounded-xl border border-slate-300 bg-slate-100 p-4">
              <span className="font-bold text-slate-900">5. Text / Code Segment (Read-Only)</span>
              <p className="text-gray-600 mt-1">Contains compiled binary machine instructions and read-only string literals. Write-protected by MMU.</p>
            </div>
          </div>
        </section>

        {/* Section 6: Production Compiler Flags */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            6. Production GCC Flags: Catching Bugs Before Runtime
          </h3>
          <p className="text-gray-700 leading-7 mb-4">
            Never compile naked <code className="font-mono">gcc main.c</code> in production. Senior engineers enable all warnings and memory sanitizers:
          </p>

          <pre className="overflow-x-auto rounded-2xl bg-slate-900 border border-slate-800 p-6 text-sm leading-7 font-mono text-emerald-300">
{`gcc -Wall -Wextra -Werror -O2 -fsanitize=address -g main.c -o app

# Flag explanations:
# -Wall -Wextra : Enable all rigorous compiler warning checks
# -Werror       : Treat all warnings as fatal errors (zero tolerance for bugs)
# -O2           : Turn on high-performance vectorization optimizations
# -fsanitize=address : AddressSanitizer (instant segfault & leak detection)`}
          </pre>
        </section>
      </div>
    </LessonPage>
  );
}