"use client";
import LessonPage from "@/components/LessonPage";

export default function Loops() {
  return (
    <LessonPage
      lessonId="loops"
      lessonNumber={7}
      title="Loops &amp; Iteration: From Basics to Big-O Mastery"
      category="Year 1 • Foundations"
      readTime="45 min comprehensive lab"
      description="Stop repeating yourself! Master iteration from simple for/while/do-while loops to nested coordinate matrices, Big-O loop time complexity, compiler loop unrolling, and FAANG algorithmic optimization."
      question={{
        question: "How many times will this loop execute: `for (int i = 0; i < 5; i++)`?",
        options: ["4 times", "5 times", "6 times", "Infinite times"],
        correctAnswer: "5 times",
        explanation:
          "It starts at `i = 0`, and runs for `i = 0, 1, 2, 3, 4`. That is exactly 5 iterations! When `i` becomes 5, `5 < 5` is false, and the loop terminates.",
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
              Loop Foundations, Iteration &amp; Control Flow
            </h2>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Basics First
          </span>
        </div>

        {/* Section 1: Why Loops? */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            1. Why Do We Need Loops?
          </h3>
          <p className="text-gray-700 leading-7">
            Imagine your professor asks you to print <em>&quot;CampusGrow&quot;</em> 100 times. Without loops, you would have to write 100 repetitive lines:
          </p>
          <pre className="mt-3 overflow-x-auto rounded-2xl bg-slate-900 border border-slate-800 p-5 text-xs sm:text-sm font-mono text-emerald-300">
{`// Tedious way: 100 lines of copy-paste!
printf("CampusGrow\\n");
printf("CampusGrow\\n");
// ... 98 more lines

// The Engineer's way: Just 3 lines!
for (int i = 1; i <= 100; i++) {
    printf("CampusGrow #%d\\n", i);
}`}
          </pre>
          <p className="mt-3 text-xs text-gray-500">
            The computer executes all 100 iterations in under 0.0001 seconds without breaking a sweat!
          </p>
        </section>

        {/* Section 2: Anatomy of a for Loop */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            2. Anatomy of a for Loop: The 3 Core Gears
          </h3>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 space-y-4">
            <p className="font-mono text-base sm:text-lg text-gray-900 font-bold">
              for (<span className="text-blue-600">int i = 1</span>; <span className="text-purple-600">i &lt;= 5</span>; <span className="text-emerald-600">i++</span>) &#123; ... &#125;
            </p>

            <div className="grid gap-3 sm:grid-cols-3 text-xs leading-relaxed">
              <div className="rounded-xl border border-blue-200 bg-white p-3">
                <span className="font-bold text-blue-700">1. Initialization</span>
                <p className="text-gray-600 mt-1"><code className="font-mono">int i = 1</code> starts the counter. Runs only <strong>once</strong> at the start.</p>
              </div>
              <div className="rounded-xl border border-purple-200 bg-white p-3">
                <span className="font-bold text-purple-700">2. Condition Check</span>
                <p className="text-gray-600 mt-1"><code className="font-mono">i &lt;= 5</code> checked before each round. If true, body executes.</p>
              </div>
              <div className="rounded-xl border border-emerald-200 bg-white p-3">
                <span className="font-bold text-emerald-700">3. Update (Increment)</span>
                <p className="text-gray-600 mt-1"><code className="font-mono">i++</code> adds 1 to counter after body completes each iteration.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: The 3 Loop Families Comparison */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            3. The 3 Loop Types: When to Use Which?
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 font-bold text-gray-700">
                <tr>
                  <th className="p-3 sm:p-4">Loop Type</th>
                  <th className="p-3 sm:p-4">Condition Evaluated</th>
                  <th className="p-3 sm:p-4">Minimum Runs</th>
                  <th className="p-3 sm:p-4">Best Used For</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-gray-800">
                <tr>
                  <td className="p-3 sm:p-4 font-mono font-bold text-blue-700">for</td>
                  <td className="p-3 sm:p-4">Entry (Before body)</td>
                  <td className="p-3 sm:p-4">0 times</td>
                  <td className="p-3 sm:p-4">When exact count is known in advance (e.g., iterate 1 to 10)</td>
                </tr>
                <tr>
                  <td className="p-3 sm:p-4 font-mono font-bold text-purple-700">while</td>
                  <td className="p-3 sm:p-4">Entry (Before body)</td>
                  <td className="p-3 sm:p-4">0 times</td>
                  <td className="p-3 sm:p-4">Event-driven loops (e.g., while battery &gt; 0, or while file has lines)</td>
                </tr>
                <tr>
                  <td className="p-3 sm:p-4 font-mono font-bold text-amber-700">do-while</td>
                  <td className="p-3 sm:p-4">Exit (After body)</td>
                  <td className="p-3 sm:p-4 font-bold text-emerald-700">1 time</td>
                  <td className="p-3 sm:p-4">Interactive menus &amp; input prompts (must display at least once!)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* ────────────────────────────────────────────────────────────── */}
      {/* 🟡 LEVEL 2: INTERMEDIATE CORE & ITERATION MECHANICS            */}
      {/* ────────────────────────────────────────────────────────────── */}
      <div className="space-y-8 mt-12">
        <div className="flex items-center justify-between border-b border-amber-200 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🟡</span>
            <h2 className="text-lg font-black uppercase tracking-wider text-amber-900">
              Loop Unrolling, Jump Instruction Cycles &amp; Invariant Hoisting
            </h2>
          </div>
          <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Control Flow &amp; Grids
          </span>
        </div>

        {/* Section 4: Jump Statements (break & continue) */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            4. Loop Jumps: break vs continue
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-5">
              <span className="font-mono text-base font-black text-rose-800">break (Emergency Exit)</span>
              <p className="text-xs text-gray-700 mt-2 leading-relaxed">
                Immediately terminates the innermost loop and jumps code execution to the first statement outside.
              </p>
              <pre className="mt-3 rounded-xl bg-slate-900 p-3 text-xs font-mono text-rose-300">
{`for (int i = 1; i <= 10; i++) {
    if (i == 5) break; // Stops loop completely!
    printf("%d ", i);  // Prints: 1 2 3 4
}`}
              </pre>
            </div>

            <div className="rounded-2xl border border-blue-200 bg-blue-50/60 p-5">
              <span className="font-mono text-base font-black text-blue-800">continue (Skip Turn)</span>
              <p className="text-xs text-gray-700 mt-2 leading-relaxed">
                Skips the rest of the current iteration&apos;s body and immediately jumps to the next round&apos;s increment step.
              </p>
              <pre className="mt-3 rounded-xl bg-slate-900 p-3 text-xs font-mono text-blue-300">
{`for (int i = 1; i <= 5; i++) {
    if (i == 3) continue; // Skips 3!
    printf("%d ", i);     // Prints: 1 2 4 5
}`}
              </pre>
            </div>
          </div>
        </section>

        {/* Section 5: Nested Loops & 2D Coordinate Grids */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            5. Nested Loops: Traversal of 2D Matrices
          </h3>
          <p className="text-gray-700 leading-7">
            A loop inside another loop is how all computer graphics, game boards (Chess, Tic-Tac-Toe), and image pixel grids operate:
          </p>

          <pre className="mt-4 overflow-x-auto rounded-2xl bg-slate-900 border border-slate-800 p-6 text-sm leading-7 font-mono text-emerald-300">
{`#include <stdio.h>

int main() {
    int rows = 3, cols = 4;

    // Outer loop controls ROWS
    for (int r = 0; r < rows; r++) {
        // Inner loop controls COLUMNS
        for (int c = 0; c < cols; c++) {
            printf("[%d,%d] ", r, c);
        }
        printf("\\n"); // Line break after each row finishes
    }
    return 0;
}`}
          </pre>
          <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50/70 p-3 font-mono text-xs text-amber-900">
            Output:<br />
            [0,0] [0,1] [0,2] [0,3]<br />
            [1,0] [1,1] [1,2] [1,3]<br />
            [2,0] [2,1] [2,2] [2,3]
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
              Off-By-One Boundary Traps, Infinite Loop Prevention &amp; SIMD Vectorization
            </h2>
          </div>
          <span className="text-xs font-bold text-purple-800 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            Big-O &amp; Optimization
          </span>
        </div>

        {/* Section 6: Big-O Loop Complexity Matrix */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            6. Big-O Time Complexity of Loops (FAANG Standard)
          </h3>
          <p className="text-gray-700 leading-7 mb-4">
            In coding interviews, FAANG engineers inspect your loop step logic to judge algorithmic scalability:
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <span className="font-mono text-xs font-black text-emerald-700">O(N) — Linear Time</span>
              <p className="text-xs text-gray-600 mt-1">Single loop incrementing by 1:</p>
              <pre className="mt-2 rounded bg-slate-900 p-2 text-[11px] font-mono text-emerald-300">
{`for (int i = 0; i < N; i++)`}
              </pre>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <span className="font-mono text-xs font-black text-blue-700">O(log N) — Logarithmic Time</span>
              <p className="text-xs text-gray-600 mt-1">Loop multiplying or dividing counter:</p>
              <pre className="mt-2 rounded bg-slate-900 p-2 text-[11px] font-mono text-blue-300">
{`for (int i = 1; i < N; i *= 2) // Binary search logic!`}
              </pre>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <span className="font-mono text-xs font-black text-purple-700">O(N²) — Quadratic Time</span>
              <p className="text-xs text-gray-600 mt-1">Nested independent loops:</p>
              <pre className="mt-2 rounded bg-slate-900 p-2 text-[11px] font-mono text-purple-300">
{`for (int i = 0; i < N; i++)
    for (int j = 0; j < N; j++)`}
              </pre>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <span className="font-mono text-xs font-black text-amber-700">O(√N) — Square Root Time</span>
              <p className="text-xs text-gray-600 mt-1">Optimized prime factor test:</p>
              <pre className="mt-2 rounded bg-slate-900 p-2 text-[11px] font-mono text-amber-300">
{`for (int i = 2; i * i <= N; i++) // 100x faster than O(N)`}
              </pre>
            </div>
          </div>
        </section>

        {/* Section 7: The Unsigned Underflow Infinite Loop Trap */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            7. The Infamous Unsigned Integer Underflow Trap
          </h3>
          <div className="rounded-2xl border border-rose-300 bg-rose-50/60 p-5">
            <p className="text-sm font-bold text-rose-900">🚨 Tricky Technical Screening Trap:</p>
            <pre className="mt-3 rounded-xl bg-slate-900 p-4 text-xs font-mono text-rose-300">
{`// WHAT HAPPENS HERE?
for (unsigned int i = 5; i >= 0; i--) {
    printf("%u\\n", i);
}`}
            </pre>
            <p className="mt-3 text-xs sm:text-sm text-gray-800 leading-relaxed">
              <strong>Answer:</strong> It enters an <strong>INFINITE LOOP</strong>! Because <code className="font-mono">i</code> is an <code className="font-mono">unsigned int</code>, it can never be negative. When <code className="font-mono">i == 0</code>, doing <code className="font-mono">i--</code> underflows to <strong className="text-rose-700 font-mono">4,294,967,295</strong>! Thus <code className="font-mono">i &gt;= 0</code> is ALWAYS TRUE.
            </p>
          </div>
        </section>

        {/* Section 8: Loop Optimization - Two Pointers vs O(N^2) */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            8. FAANG Optimization: Two Pointers Replaces O(N²) Nested Loops
          </h3>
          <p className="text-gray-700 leading-7 mb-4">
            In competitive programming and technical interviews, senior candidates know how to replace slow $O(N^2)$ nested loops with an elegant $O(N)$ two-pointer traversal:
          </p>

          <pre className="overflow-x-auto rounded-2xl bg-slate-900 border border-slate-800 p-6 text-sm leading-7 font-mono text-emerald-300">
{`// Goal: Find if sorted array has two elements that sum to 'target'
// Optimized O(N) Two-Pointer Loop:
int left = 0, right = n - 1;

while (left < right) {
    int currentSum = arr[left] + arr[right];
    if (currentSum == target) {
        printf("Found pair: %d + %d = %d\\n", arr[left], arr[right], target);
        break;
    } else if (currentSum < target) {
        left++;   // Need a larger sum
    } else {
        right--;  // Need a smaller sum
    }
}
// Runs in O(N) time with O(1) space! Instant pass on LeetCode tests.`}
          </pre>
        </section>
      </div>
    </LessonPage>
  );
}
