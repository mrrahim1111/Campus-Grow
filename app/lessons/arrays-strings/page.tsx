"use client";
import LessonPage from "@/components/LessonPage";

export default function ArraysStrings() {
  return (
    <LessonPage
      lessonId="arrays-strings"
      lessonNumber={9}
      title="Arrays &amp; Strings: Contiguous Memory &amp; Security"
      category="Year 1 • Foundations"
      readTime="48 min memory deep-dive"
      description="Store collections of data! Master arrays and strings from 0-indexed locker models to contiguous byte arithmetic, 2D row-major matrices, buffer overflow exploits, and CPU cache line locality."
      question={{
        question: "In an array with 5 elements, what is the index of the very first element in C?",
        options: ["1", "0", "-1", "5"],
        correctAnswer: "0",
        explanation:
          "In C (and most modern programming languages), arrays are zero-indexed! The first item is at index [0], the second is at [1], and the 5th item is at index [4].",
      }}
    >
      {/* ────────────────────────────────────────────────────────────── */}
      {/* 📖 CHAPTER 1: FOUNDATIONS & SYNTAX                             */}
      {/* ────────────────────────────────────────────────────────────── */}
      <div className="space-y-8">
        <div className="flex items-center justify-between border-b border-emerald-200 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">📦</span>
            <h2 className="text-lg font-black uppercase tracking-wider text-emerald-800">
              Array Foundations &amp; Contiguous Storage
            </h2>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Intuition &amp; Syntax
          </span>
        </div>

        {/* Section 1: What is an Array? */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            1. What is an Array? The Row of Numbered Lockers
          </h3>
          <p className="text-gray-700 leading-7">
            Imagine storing the exam marks of 50 students. Creating 50 separate variables (<code className="font-mono">mark1</code>, <code className="font-mono">mark2</code>, ...) would be unbearable.
          </p>
          <p className="mt-3 text-gray-700 leading-7">
            An <strong className="text-gray-950">array</strong> is like a <strong className="text-gray-950">row of numbered lockers</strong> along a corridor. All lockers carry the exact same data type, and each locker has a numeric index starting at <strong>0</strong>:
          </p>

          <div className="mt-5 grid grid-cols-5 gap-2 text-center">
            {[
              { idx: "[0]", val: "95" },
              { idx: "[1]", val: "88" },
              { idx: "[2]", val: "72" },
              { idx: "[3]", val: "91" },
              { idx: "[4]", val: "84" },
            ].map((item) => (
              <div key={item.idx} className="rounded-xl border-2 border-emerald-300 bg-emerald-50/70 p-3">
                <span className="font-mono text-xs font-bold text-emerald-700">Locker {item.idx}</span>
                <p className="font-mono text-base font-black text-gray-950 mt-1">{item.val}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Code Example */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            2. Creating &amp; Accessing Arrays in C
          </h3>
          <pre className="overflow-x-auto rounded-2xl bg-slate-900 border border-slate-800 p-6 text-sm leading-7 font-mono text-emerald-300">
{`#include <stdio.h>

int main() {
    int scores[5] = {95, 88, 72, 91, 84};

    // Access elements via 0-based index
    printf("First student: %d\\n", scores[0]); // 95
    printf("Last student:  %d\\n", scores[4]); // 84

    // Traverse all elements using a loop
    for (int i = 0; i < 5; i++) {
        printf("scores[%d] = %d\\n", i, scores[i]);
    }
    return 0;
}`}
          </pre>
        </section>

        {/* Section 3: Strings in C */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            3. Strings in C: The Null-Terminated Character Array
          </h3>
          <p className="text-gray-700 leading-7">
            C does not have a native string keyword like Python or Java. In C, a string is simply an <strong className="text-gray-950">array of characters</strong> that ends with a special stop sign: <code className="font-mono font-bold text-rose-600">&apos;\\0&apos;</code> (the null terminator, ASCII 0).
          </p>

          <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50/70 p-4">
            <p className="font-mono text-xs font-bold text-blue-800">char name[] = &quot;Campus&quot;; // Length 6, Size 7 bytes!</p>
            <div className="mt-3 flex flex-wrap gap-2 text-center font-mono text-xs font-bold">
              <span className="rounded-lg bg-white border border-blue-300 px-3 py-1.5">&apos;C&apos; [0]</span>
              <span className="rounded-lg bg-white border border-blue-300 px-3 py-1.5">&apos;a&apos; [1]</span>
              <span className="rounded-lg bg-white border border-blue-300 px-3 py-1.5">&apos;m&apos; [2]</span>
              <span className="rounded-lg bg-white border border-blue-300 px-3 py-1.5">&apos;p&apos; [3]</span>
              <span className="rounded-lg bg-white border border-blue-300 px-3 py-1.5">&apos;u&apos; [4]</span>
              <span className="rounded-lg bg-white border border-blue-300 px-3 py-1.5">&apos;s&apos; [5]</span>
              <span className="rounded-lg bg-rose-100 border border-rose-300 text-rose-800 px-3 py-1.5">&apos;\\0&apos; [6] (Stop Sign)</span>
            </div>
          </div>
        </section>
      </div>

      {/* ────────────────────────────────────────────────────────────── */}
      {/* 📊 CHAPTER 2: MEMORY MAPPING & STRING POINTERS                 */}
      {/* ────────────────────────────────────────────────────────────── */}
      <div className="space-y-8 mt-12">
        <div className="flex items-center justify-between border-b border-amber-200 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚙️</span>
            <h2 className="text-lg font-black uppercase tracking-wider text-amber-900">
              Contiguous Memory Architecture &amp; String Mechanics
            </h2>
          </div>
          <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Memory &amp; Libraries
          </span>
        </div>

        {/* Section 4: Contiguous Memory Address Calculation */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            4. The Contiguous Memory Address Formula
          </h3>
          <p className="text-gray-700 leading-7">
            Why do arrays have instant $O(1)$ random access time? Because the computer calculates the exact memory location using simple arithmetic:
          </p>

          <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50/70 p-5 font-mono text-sm text-gray-900">
            Address(arr[i]) = Base_Address + (i &times; sizeof(element))
          </div>
          <p className="mt-3 text-xs text-gray-600 leading-relaxed">
            If <code className="font-mono">arr</code> begins at byte <code className="font-mono">0x2000</code> and stores 4-byte integers:
            <br />
            • <code className="font-mono">arr[0] = 0x2000 + (0 &times; 4) = 0x2000</code>
            <br />
            • <code className="font-mono">arr[3] = 0x2000 + (3 &times; 4) = 0x200C</code>
          </p>
        </section>

        {/* Section 5: Array Decay & Function Arguments */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            5. Array Decay: Why sizeof(arr) Inside Functions is Deceptive
          </h3>
          <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-5">
            <p className="text-sm font-bold text-rose-900">🚨 Tricky Interview Trap:</p>
            <pre className="mt-3 rounded-xl bg-slate-900 p-4 text-xs font-mono text-rose-300">
{`void printSize(int arr[]) {
    printf("Inside func: %zu bytes\\n", sizeof(arr)); // PRINTS 8, NOT 40!
}

int main() {
    int arr[10]; // 10 * 4 = 40 bytes
    printf("In main:     %zu bytes\\n", sizeof(arr)); // Prints 40
    printSize(arr);
}`}
            </pre>
            <p className="mt-3 text-xs sm:text-sm text-gray-800 leading-relaxed">
              <strong>Explanation:</strong> In C, arrays passed to functions <em>decay</em> into pointers (<code className="font-mono">int arr[]</code> is secretly <code className="font-mono">int *arr</code>). Inside the function, <code className="font-mono">sizeof(arr)</code> returns the size of a 64-bit pointer (8 bytes). Always pass the array length as a separate parameter!
            </p>
          </div>
        </section>

        {/* Section 6: Standard <string.h> Functions */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            6. Essential string.h Library Functions
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 font-bold text-gray-700">
                <tr>
                  <th className="p-3 sm:p-4">Function</th>
                  <th className="p-3 sm:p-4">Signature</th>
                  <th className="p-3 sm:p-4">Action</th>
                  <th className="p-3 sm:p-4">Safety Warning</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-gray-800">
                <tr>
                  <td className="p-3 sm:p-4 font-mono font-bold text-blue-600">strlen(s)</td>
                  <td className="p-3 sm:p-4 font-mono text-xs">size_t strlen(const char *s)</td>
                  <td className="p-3 sm:p-4">Counts characters before &apos;\\0&apos;</td>
                  <td className="p-3 sm:p-4 text-slate-500">O(N) traversal</td>
                </tr>
                <tr>
                  <td className="p-3 sm:p-4 font-mono font-bold text-purple-600">strncpy(dest, src, n)</td>
                  <td className="p-3 sm:p-4 font-mono text-xs">char *strncpy(char *d, const char *s, size_t n)</td>
                  <td className="p-3 sm:p-4">Safe bounded string copy</td>
                  <td className="p-3 sm:p-4 text-emerald-600 font-bold">Use over strcpy()!</td>
                </tr>
                <tr>
                  <td className="p-3 sm:p-4 font-mono font-bold text-emerald-600">strcmp(s1, s2)</td>
                  <td className="p-3 sm:p-4 font-mono text-xs">int strcmp(const char *s1, const char *s2)</td>
                  <td className="p-3 sm:p-4">Returns 0 if strings match!</td>
                  <td className="p-3 sm:p-4 text-amber-700">Never use == for strings</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* ────────────────────────────────────────────────────────────── */}
      {/* ⚡ CHAPTER 3: BUFFER OVERFLOW DEFENSE & CPU LOCALITY           */}
      {/* ────────────────────────────────────────────────────────────── */}
      <div className="space-y-8 mt-12">
        <div className="flex items-center justify-between border-b border-purple-200 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🚀</span>
            <h2 className="text-lg font-black uppercase tracking-wider text-purple-900">
              Buffer Overflow Defense, Security &amp; CPU Cache Locality
            </h2>
          </div>
          <span className="text-xs font-bold text-purple-800 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            Security &amp; Cache Lines
          </span>
        </div>

        {/* Section 7: Buffer Overflow & gets() Exploit */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            7. Buffer Overflow &amp; The Deprecation of gets()
          </h3>
          <p className="text-gray-700 leading-7 mb-4">
            Writing more characters into an array than its declared capacity causes a <strong>Buffer Overflow</strong>. Extra characters overwrite adjacent stack memory, including the function&apos;s return address (the root cause of the historic 1988 Morris Worm).
          </p>

          <pre className="overflow-x-auto rounded-2xl bg-slate-900 border border-slate-800 p-6 text-sm leading-7 font-mono text-emerald-300">
{`char buffer[16];

// DANGEROUS: Banned in modern C! No bounds checking.
// gets(buffer); 

// PRODUCTION STANDARD: Always use bounded fgets()
if (fgets(buffer, sizeof(buffer), stdin) != NULL) {
    // Safely reads at most 15 chars + puts '\\0' at the end!
    printf("Safe input: %s\\n", buffer);
}`}
          </pre>
        </section>

        {/* Section 8: Spatial Cache Locality */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            8. CPU Cache Line Locality: Row-Major vs Column-Major Performance
          </h3>
          <p className="text-gray-700 leading-7 mb-4">
            In C, 2D arrays are stored in memory row-by-row (<strong>Row-Major Order</strong>). Modern CPUs fetch RAM in 64-byte chunks called <em>Cache Lines</em>. Iterating row-major gets nearly 100% cache hits, making it up to <strong>10x faster</strong> than column-major traversal:
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-emerald-300 bg-emerald-50/60 p-5">
              <span className="font-mono text-xs font-black text-emerald-800">✅ Fast: Row-Major Traversal (10x Speed)</span>
              <pre className="mt-2 rounded-xl bg-slate-900 p-3 text-xs font-mono text-emerald-300">
{`for (int i = 0; i < N; i++) {
    for (int j = 0; j < N; j++) {
        sum += matrix[i][j]; // Sequential memory hit!
    }
}`}
              </pre>
            </div>

            <div className="rounded-2xl border border-rose-300 bg-rose-50/60 p-5">
              <span className="font-mono text-xs font-black text-rose-800">❌ Slow: Column-Major (Cache Thrashing)</span>
              <pre className="mt-2 rounded-xl bg-slate-900 p-3 text-xs font-mono text-rose-300">
{`for (int j = 0; j < N; j++) {
    for (int i = 0; i < N; i++) {
        sum += matrix[i][j]; // Constant cache miss!
    }
}`}
              </pre>
            </div>
          </div>
        </section>

        {/* Section 9: Two-Pointer String Reversal Algorithm */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            9. FAANG Standard: In-Place Two-Pointer String Reversal
          </h3>
          <pre className="overflow-x-auto rounded-2xl bg-slate-900 border border-slate-800 p-6 text-sm leading-7 font-mono text-emerald-300">
{`#include <stdio.h>
#include <string.h>

void reverseString(char s[]) {
    int left = 0;
    int right = strlen(s) - 1;

    while (left < right) {
        char temp = s[left];
        s[left] = s[right];
        s[right] = temp;
        left++;
        right--;
    }
}

int main() {
    char word[] = "CampusGrow";
    reverseString(word);
    printf("Reversed: %s\\n", word); // "worGsupmaC"
    return 0;
}`}
          </pre>
        </section>
      </div>
    </LessonPage>
  );
}
