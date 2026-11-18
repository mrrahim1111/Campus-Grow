"use client";
import LessonPage from "@/components/LessonPage";

export default function ConditionalStatements() {
  return (
    <LessonPage
      lessonId="conditional-statements"
      lessonNumber={6}
      title="Conditionals: Logic, Branch Prediction &amp; Jump Tables"
      category="Year 1 • Foundations"
      readTime="42 min branching practice"
      description="Control the flow of execution! Master decision-making from if-else ladders and switch menus to short-circuit boolean evaluation, CPU branch prediction pipeline stalls, and compiler jump tables."
      question={{
        question: "Which statement allows your program to run one block of code if a condition is true, and a completely different block if it is false?",
        options: [
          "`if...else`",
          "`while` loop",
          "`#include`",
          "`printf`",
        ],
        correctAnswer: "`if...else`",
        explanation:
          "`if...else` creates a fork in the road! IF the condition is true, C runs the first block; ELSE, it runs the alternative block.",
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
              Branching Foundations &amp; Decision Trees
            </h2>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Intuition First
          </span>
        </div>

        {/* Section 1: The Fork in the Road */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            1. The Fork in the Road: if and else
          </h3>
          <p className="text-gray-700 leading-7">
            Software isn&apos;t just a straight line; it reacts dynamically to user actions, sensor data, and calculations:
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-blue-200 bg-blue-50/60 p-4">
              <p className="text-xs font-bold text-blue-800 uppercase tracking-wider">🚦 Real World Analogy:</p>
              <p className="text-xs sm:text-sm text-gray-800 mt-1 font-medium leading-relaxed">
                &quot;<strong>IF</strong> light is green, drive forward. <strong>ELSE</strong>, bring car to a full stop.&quot;
              </p>
            </div>
            <div className="rounded-2xl border border-purple-200 bg-purple-50/60 p-4">
              <p className="text-xs font-bold text-purple-800 uppercase tracking-wider">🎓 Grading Example:</p>
              <p className="text-xs sm:text-sm text-gray-800 mt-1 font-medium leading-relaxed">
                &quot;<strong>IF</strong> score &gt;= 40, show &apos;Passed&apos;. <strong>ELSE</strong>, show &apos;Academic Probation&apos;.&quot;
              </p>
            </div>
          </div>

          <pre className="mt-5 overflow-x-auto rounded-2xl bg-slate-900 border border-slate-800 p-6 text-sm leading-7 font-mono text-emerald-300">
{`#include <stdio.h>

int main() {
    int score = 78;

    if (score >= 40) {
        printf("Status: Passed!\\n");
    } else {
        printf("Status: Needs Retake.\\n");
    }
    return 0;
}`}
          </pre>
        </section>

        {/* Section 2: else if ladder & switch */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            2. Multi-Way Branching: else if vs. switch
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <span className="font-mono text-sm font-black text-blue-700">else if Ladder</span>
              <p className="text-xs text-gray-600 mt-1">Best for ranges and complex conditions (&gt;, &lt;, &amp;&amp;):</p>
              <pre className="mt-3 rounded-xl bg-slate-900 p-3 text-xs font-mono text-emerald-300">
{`if (score >= 90) {
    grade = 'A';
} else if (score >= 75) {
    grade = 'B';
} else {
    grade = 'C';
}`}
              </pre>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <span className="font-mono text-sm font-black text-purple-700">switch Statement</span>
              <p className="text-xs text-gray-600 mt-1">Best for exact discrete values (integers or chars):</p>
              <pre className="mt-3 rounded-xl bg-slate-900 p-3 text-xs font-mono text-purple-300">
{`switch (choice) {
    case 1: printf("Deposit"); break;
    case 2: printf("Withdraw"); break;
    default: printf("Invalid");
}`}
              </pre>
            </div>
          </div>
        </section>
      </div>

      {/* ────────────────────────────────────────────────────────────── */}
      {/* 🟡 LEVEL 2: INTERMEDIATE CORE & SHORT-CIRCUIT EVALUATION       */}
      {/* ────────────────────────────────────────────────────────────── */}
      <div className="space-y-8 mt-12">
        <div className="flex items-center justify-between border-b border-amber-200 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🟡</span>
            <h2 className="text-lg font-black uppercase tracking-wider text-amber-900">
              Short-Circuit Evaluation, Jump Tables &amp; CPU Branch Prediction
            </h2>
          </div>
          <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Defensive Logic
          </span>
        </div>

        {/* Section 3: Short-Circuit Boolean Evaluation */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            3. Short-Circuit Evaluation: Preventing Crashes
          </h3>
          <p className="text-gray-700 leading-7 mb-4">
            In C, boolean operators evaluate left-to-right and stop as soon as the outcome is guaranteed:
            <br />
            • In <code className="font-mono font-bold text-blue-700">A &amp;&amp; B</code>: If <code className="font-mono">A</code> is false, <code className="font-mono">B</code> is <strong>never executed</strong>!
            <br />
            • In <code className="font-mono font-bold text-purple-700">A || B</code>: If <code className="font-mono">A</code> is true, <code className="font-mono">B</code> is <strong>never executed</strong>!
          </p>

          <div className="rounded-2xl border border-emerald-300 bg-emerald-50/60 p-5">
            <span className="font-mono text-xs font-black text-emerald-800">✅ Production Defensive Coding Pattern:</span>
            <pre className="mt-2 rounded-xl bg-slate-900 p-3 text-xs font-mono text-emerald-300">
{`// If ptr is NULL, the right side (*ptr == 42) NEVER runs!
// This safely prevents a Segmentation Fault crash:
if (ptr != NULL && *ptr == 42) {
    printf("Safe dereference!\\n");
}`}
            </pre>
          </div>
        </section>

        {/* Section 4: Guard Clauses (Flat Code vs Nested Pyramid) */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            4. Guard Clauses: Eliminating &quot;Pyramid of Doom&quot; Nesting
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-4">
              <span className="font-mono text-xs font-black text-rose-800">❌ Deeply Nested Pyramid</span>
              <pre className="mt-2 rounded-xl bg-slate-900 p-3 text-xs font-mono text-rose-300">
{`if (user != NULL) {
    if (user->isActive) {
        if (user->hasBalance) {
            processPayment();
        }
    }
}`}
              </pre>
            </div>

            <div className="rounded-2xl border border-emerald-300 bg-emerald-50/50 p-4">
              <span className="font-mono text-xs font-black text-emerald-800">✅ Clean Guard Clauses (Flat)</span>
              <pre className="mt-2 rounded-xl bg-slate-900 p-3 text-xs font-mono text-emerald-300">
{`if (user == NULL) return;
if (!user->isActive) return;
if (!user->hasBalance) return;

processPayment(); // Clean main path!`}
              </pre>
            </div>
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
              Dangling Else, Equality Traps &amp; Branch Misprediction Penalty
            </h2>
          </div>
          <span className="text-xs font-bold text-purple-800 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            Branch Prediction &amp; Jumps
          </span>
        </div>

        {/* Section 5: CPU Branch Prediction */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            5. CPU Branch Prediction &amp; The Sorted Array Mystery
          </h3>
          <p className="text-gray-700 leading-7 mb-4">
            Why does processing a <em>sorted</em> array with an if condition run up to <strong>5x faster</strong> than processing an unsorted array on modern Intel and ARM CPUs?
          </p>

          <div className="rounded-2xl border border-purple-200 bg-purple-50/50 p-5 space-y-3 text-xs sm:text-sm text-gray-800">
            <p>
              Modern CPUs use <strong>Instruction Pipelining</strong>. Before an <code className="font-mono">if</code> condition even finishes evaluating in the ALU, the CPU guesses which branch will be taken (Branch Prediction) and pre-fetches its instructions.
            </p>
            <p>
              • On sorted data, the branch pattern is predictable (<code className="font-mono">false, false, ..., true, true</code>). 0% pipeline flush!
            </p>
            <p>
              • On unsorted random data, the CPU mispredicts frequently. Each misprediction forces the CPU to <strong>flush its 14-stage execution pipeline</strong>, incurring a heavy 15-20 cycle latency penalty!
            </p>
          </div>
        </section>

        {/* Section 6: Jump Tables in switch statements */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            6. Compiler Jump Tables: How switch Achieves O(1) Time
          </h3>
          <p className="text-gray-700 leading-7 mb-4">
            When you write a switch statement with contiguous integers, the compiler does <strong>not</strong> generate a slow chain of comparisons. It creates an internal array of function pointers called a <strong>Jump Table</strong>:
          </p>

          <pre className="overflow-x-auto rounded-2xl bg-slate-900 border border-slate-800 p-6 text-sm leading-7 font-mono text-emerald-300">
{`// switch with contiguous cases:
switch (opcode) {
    case 0: handle_add(); break;
    case 1: handle_sub(); break;
    case 2: handle_mul(); break;
    case 3: handle_div(); break;
}

// Compiler generates O(1) direct indirect jump in Assembly:
// jmp *jump_table(,%rax,8)`}
          </pre>
          <p className="mt-3 text-xs text-gray-600">
            Regardless of whether you have 4 cases or 400 cases, the CPU executes the jump in exactly <strong>1 single machine cycle</strong>!
          </p>
        </section>

        {/* Section 7: Assignment in Condition Trap */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            7. The Infamous Assignment in Condition Bug (== vs =)
          </h3>
          <div className="rounded-2xl border border-rose-300 bg-rose-50/60 p-5">
            <p className="text-sm font-bold text-rose-900">🚨 Tricky Screening Bug:</p>
            <pre className="mt-3 rounded-xl bg-slate-900 p-4 text-xs font-mono text-rose-300">
{`int isAdmin = 0;

if (isAdmin = 1) { // SINGLE '=' ASSIGNS 1!
    printf("Access granted to sensitive data!\\n"); // RUNS ALWAYS!
}`}
            </pre>
            <p className="mt-3 text-xs sm:text-sm text-gray-800 leading-relaxed">
              <strong>Yoda Conditions Fix:</strong> Writing the constant on the left side:
              <br />
              <code className="font-mono text-slate-900 font-bold">if (1 == isAdmin)</code>. If you accidentally type a single <code className="font-mono">=</code>, the compiler will refuse to compile (<code className="font-mono">error: lvalue required</code>), catching the bug instantly!
            </p>
          </div>
        </section>
      </div>
    </LessonPage>
  );
}
