"use client";
import LessonPage from "@/components/LessonPage";

export default function Operators() {
  return (
    <LessonPage
      lessonId="operators"
      lessonNumber={5}
      title="Operators: Math, Bitwise Hacks &amp; Precedence Traps"
      category="Year 1 • Foundations"
      readTime="42 min deep-dive & logic"
      description="Do math and binary logic in code! Master arithmetic, modulo operations, bitwise bit manipulation hacks (Kernighan's algorithm), operator precedence, and undefined sequence points."
      question={{
        question: "What is the result of `14 % 4` in C?",
        options: ["3.5", "2", "3", "0"],
        correctAnswer: "2",
        explanation:
          "The `%` (modulo) operator calculates the remainder after division! 4 goes into 14 three times (4 × 3 = 12), leaving a remainder of 2.",
      }}
    >
      {/* ────────────────────────────────────────────────────────────── */}
      {/* 🟢 LEVEL 1: FOUNDATIONS & ARITHMETIC                           */}
      {/* ────────────────────────────────────────────────────────────── */}
      <div className="space-y-8">
        <div className="flex items-center justify-between border-b border-emerald-200 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🟢</span>
            <h2 className="text-lg font-black uppercase tracking-wider text-emerald-800">
              Operator Foundations &amp; Arithmetic Precedence
            </h2>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Arithmetic First
          </span>
        </div>

        {/* Section 1: Basic Arithmetic */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            1. Arithmetic &amp; Modulo Operators
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-5">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
              <span className="font-mono text-xl font-black text-blue-700">+</span>
              <p className="text-xs text-gray-500 font-bold mt-1">Addition</p>
              <p className="font-mono text-xs text-gray-800 mt-0.5">5 + 3 = 8</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
              <span className="font-mono text-xl font-black text-blue-700">-</span>
              <p className="text-xs text-gray-500 font-bold mt-1">Subtraction</p>
              <p className="font-mono text-xs text-gray-800 mt-0.5">10 - 4 = 6</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
              <span className="font-mono text-xl font-black text-blue-700">*</span>
              <p className="text-xs text-gray-500 font-bold mt-1">Multiply</p>
              <p className="font-mono text-xs text-gray-800 mt-0.5">6 * 7 = 42</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
              <span className="font-mono text-xl font-black text-blue-700">/</span>
              <p className="text-xs text-gray-500 font-bold mt-1">Division</p>
              <p className="font-mono text-xs text-gray-800 mt-0.5">20 / 4 = 5</p>
            </div>
            <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-4 text-center">
              <span className="font-mono text-xl font-black text-emerald-700">%</span>
              <p className="text-xs text-emerald-700 font-bold mt-1">Modulo (Remainder)</p>
              <p className="font-mono text-xs text-gray-800 mt-0.5">14 % 4 = 2</p>
            </div>
          </div>
        </section>

        {/* Section 2: Relational & Logical Operators */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            2. Relational &amp; Logical Boolean Operators
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <span className="font-mono text-xs font-black uppercase text-blue-700">Relational (True=1, False=0)</span>
              <ul className="mt-2 space-y-1 font-mono text-xs text-gray-700">
                <li><code className="text-blue-700 font-bold">==</code> : Equal to (5 == 5 &rarr; 1)</li>
                <li><code className="text-blue-700 font-bold">!=</code> : Not equal (5 != 3 &rarr; 1)</li>
                <li><code className="text-blue-700 font-bold">&gt;=</code> : Greater or equal</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <span className="font-mono text-xs font-black uppercase text-purple-700">Logical Operators</span>
              <ul className="mt-2 space-y-1 font-mono text-xs text-gray-700">
                <li><code className="text-purple-700 font-bold">&amp;&amp;</code> : Logical AND (Both true)</li>
                <li><code className="text-purple-700 font-bold">||</code> : Logical OR (At least one true)</li>
                <li><code className="text-purple-700 font-bold">!</code>  : Logical NOT (Flips 1 &harr; 0)</li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      {/* ────────────────────────────────────────────────────────────── */}
      {/* 🟡 LEVEL 2: INTERMEDIATE CORE & BITWISE OPERATORS              */}
      {/* ────────────────────────────────────────────────────────────── */}
      <div className="space-y-8 mt-12">
        <div className="flex items-center justify-between border-b border-amber-200 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🟡</span>
            <h2 className="text-lg font-black uppercase tracking-wider text-amber-900">
              Bitwise Operations, Bitmasks &amp; ALU Flags
            </h2>
          </div>
          <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Binary Hardware Logic
          </span>
        </div>

        {/* Section 3: Bitwise Operations */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            3. Bitwise Manipulation Operators
          </h3>
          <p className="text-gray-700 leading-7 mb-4">
            Bitwise operators work directly on the individual 0s and 1s inside CPU registers, executing in a single clock cycle:
          </p>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 font-bold text-gray-700">
                <tr>
                  <th className="p-3 sm:p-4">Operator</th>
                  <th className="p-3 sm:p-4">Name</th>
                  <th className="p-3 sm:p-4">Binary Example</th>
                  <th className="p-3 sm:p-4">System Use-Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-gray-800 font-mono">
                <tr>
                  <td className="p-3 sm:p-4 text-blue-700 font-bold">&amp;</td>
                  <td className="p-3 sm:p-4">Bitwise AND</td>
                  <td className="p-3 sm:p-4">5 &amp; 3 (101 &amp; 011 = 001 = 1)</td>
                  <td className="p-3 sm:p-4 text-slate-600">Masking &amp; checking bit status</td>
                </tr>
                <tr>
                  <td className="p-3 sm:p-4 text-purple-700 font-bold">|</td>
                  <td className="p-3 sm:p-4">Bitwise OR</td>
                  <td className="p-3 sm:p-4">5 | 3 (101 | 011 = 111 = 7)</td>
                  <td className="p-3 sm:p-4 text-slate-600">Setting a specific bit flag</td>
                </tr>
                <tr>
                  <td className="p-3 sm:p-4 text-amber-700 font-bold">^</td>
                  <td className="p-3 sm:p-4">Bitwise XOR</td>
                  <td className="p-3 sm:p-4">5 ^ 3 (101 ^ 011 = 110 = 6)</td>
                  <td className="p-3 sm:p-4 text-slate-600">Toggling bits &amp; cryptography</td>
                </tr>
                <tr>
                  <td className="p-3 sm:p-4 text-emerald-700 font-bold">&lt;&lt;</td>
                  <td className="p-3 sm:p-4">Left Shift</td>
                  <td className="p-3 sm:p-4">1 &lt;&lt; 3 (1 &times; 2&sup3; = 8)</td>
                  <td className="p-3 sm:p-4 text-slate-600">Lightning-fast power-of-2 multiplication</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: Bit Masking Formulas */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            4. The Standard Bit-Masking Triad
          </h3>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-blue-200 bg-blue-50/60 p-4">
              <span className="font-mono text-xs font-bold text-blue-800">1. Set kth Bit</span>
              <pre className="mt-2 rounded bg-slate-900 p-2 font-mono text-[11px] text-blue-300">
num |= (1 &lt;&lt; k);
              </pre>
            </div>
            <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-4">
              <span className="font-mono text-xs font-bold text-rose-800">2. Clear kth Bit</span>
              <pre className="mt-2 rounded bg-slate-900 p-2 font-mono text-[11px] text-rose-300">
num &amp;= ~(1 &lt;&lt; k);
              </pre>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4">
              <span className="font-mono text-xs font-bold text-emerald-800">3. Check kth Bit</span>
              <pre className="mt-2 rounded bg-slate-900 p-2 font-mono text-[11px] text-emerald-300">
(num &gt;&gt; k) &amp; 1;
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
              Undefined Behavior, Sequence Points &amp; Bit Tricks
            </h2>
          </div>
          <span className="text-xs font-bold text-purple-800 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            Algorithms &amp; Traps
          </span>
        </div>

        {/* Section 5: Brian Kernighan's Algorithm */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            5. Brian Kernighan&apos;s Algorithm (Count Set Bits in O(set bits))
          </h3>
          <p className="text-gray-700 leading-7 mb-4">
            Subtracting 1 from a number flips all bits up to and including the lowest set bit. Therefore, <code className="font-mono font-bold text-purple-700">n &amp; (n - 1)</code> always removes the lowest set bit:
          </p>

          <pre className="overflow-x-auto rounded-2xl bg-slate-900 border border-slate-800 p-6 text-sm leading-7 font-mono text-emerald-300">
{`// Counts how many 1-bits exist in a number:
int countSetBits(int n) {
    int count = 0;
    while (n > 0) {
        n = n & (n - 1); // Clears the lowest set bit in O(1)!
        count++;
    }
    return count;
}
// Instant O(1) Check if N is a power of 2:
bool isPowerOfTwo = (n > 0) && ((n & (n - 1)) == 0);`}
          </pre>
        </section>

        {/* Section 6: In-Place XOR Swap Trap */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            6. In-Place XOR Swap Trap (The Same-Address Gotcha)
          </h3>
          <div className="rounded-2xl border border-rose-300 bg-rose-50/60 p-5">
            <p className="text-sm font-bold text-rose-900">🚨 Classic Competitive Programming Trap:</p>
            <pre className="mt-3 rounded-xl bg-slate-900 p-4 text-xs font-mono text-rose-300">
{`void xorSwap(int *a, int *b) {
    *a ^= *b;
    *b ^= *a;
    *a ^= *b;
}
// WHAT HAPPENS IF xorSwap(&arr[i], &arr[i]) IS CALLED?`}
            </pre>
            <p className="mt-3 text-xs sm:text-sm text-gray-800 leading-relaxed">
              <strong>Answer:</strong> It wipes the number to <strong>0</strong>! When <code className="font-mono">a == b</code>, <code className="font-mono">*a ^= *a</code> computes <code className="font-mono">x ^ x = 0</code>, permanently erasing the variable. Always add a pointer guard: <code className="font-mono font-bold">if (a != b)</code>.
            </p>
          </div>
        </section>

        {/* Section 7: Undefined Sequence Points */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            7. Undefined Sequence Points: i = i++ + ++i
          </h3>
          <p className="text-gray-700 leading-7">
            Modifying a variable more than once between sequence points (e.g. <code className="font-mono text-rose-700 font-bold">i = i++ + ++i</code>) is <strong>Undefined Behavior</strong> in C standards prior to C23. Different compilers (GCC vs Clang vs MSVC) produce wildly conflicting values. Never write multiple side-effect mutations on the same line!
          </p>
        </section>
      </div>
    </LessonPage>
  );
}
