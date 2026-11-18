"use client";
import LessonPage from "@/components/LessonPage";

export default function VariablesDataTypes() {
  return (
    <LessonPage
      lessonId="variables-data-types"
      lessonNumber={3}
      title="Variables &amp; Data Types: Memory Architecture &amp; Overflow"
      category="Year 1 • Foundations"
      readTime="40 min hands-on lab"
      description="Understand computer memory from the ground up! Master variables from labeled box models to exact bitwise byte limits, Two's Complement representation, IEEE-754 floating point precision traps, and struct padding."
      question={{
        question: "Which data type should you choose to store a student's age (e.g., 19 or 21)?",
        options: [
          "`int` (integer for whole numbers)",
          "`char` (single character letter)",
          "`float` (number with decimals)",
          "`void` (empty type)",
        ],
        correctAnswer: "`int` (integer for whole numbers)",
        explanation:
          "Since age is a whole number without decimal points (nobody says they are 19.3492 years old!), an `int` (integer) is the perfect and standard data type.",
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
              Concept Foundations &amp; Storage Mental Models
            </h2>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Mental Models &amp; Syntax
          </span>
        </div>

        {/* Section 1: What is a Variable? */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            1. What is a Variable? The Labeled Storage Box
          </h3>
          <p className="text-gray-700 leading-7">
            Imagine moving into your college hostel room with empty cardboard boxes. To keep things organized, you stick a label on each box:
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-blue-200 bg-blue-50/60 p-4 text-center">
              <span className="text-2xl">📦</span>
              <p className="font-mono text-xs font-bold text-blue-700 mt-1">Box Label: &quot;age&quot;</p>
              <p className="text-sm font-black text-gray-950 mt-1">Value inside: 19</p>
            </div>
            <div className="rounded-2xl border border-purple-200 bg-purple-50/60 p-4 text-center">
              <span className="text-2xl">📦</span>
              <p className="font-mono text-xs font-bold text-purple-700 mt-1">Box Label: &quot;gpa&quot;</p>
              <p className="text-sm font-black text-gray-950 mt-1">Value inside: 8.75</p>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 text-center">
              <span className="text-2xl">📦</span>
              <p className="font-mono text-xs font-bold text-emerald-700 mt-1">Box Label: &quot;grade&quot;</p>
              <p className="text-sm font-black text-gray-950 mt-1">Value inside: &apos;A&apos;</p>
            </div>
          </div>
          <p className="mt-4 text-gray-700 leading-7">
            In C, a <strong className="text-gray-950">variable</strong> is just a labeled storage container in the computer&apos;s memory (RAM). When you need the value, you simply call it by its label name!
          </p>
        </section>

        {/* Section 2: The 4 Core Data Types */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            2. The 4 Fundamental Data Types
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 font-bold text-gray-700">
                <tr>
                  <th className="p-3 sm:p-4">Type</th>
                  <th className="p-3 sm:p-4">What it Stores</th>
                  <th className="p-3 sm:p-4">Example Value</th>
                  <th className="p-3 sm:p-4">Format Specifier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-gray-800">
                <tr>
                  <td className="p-3 sm:p-4 font-mono font-bold text-blue-600">int</td>
                  <td className="p-3 sm:p-4">Whole numbers (positive &amp; negative)</td>
                  <td className="p-3 sm:p-4 font-mono">19, -5, 1000</td>
                  <td className="p-3 sm:p-4 font-mono text-emerald-700 font-bold">%d</td>
                </tr>
                <tr>
                  <td className="p-3 sm:p-4 font-mono font-bold text-purple-600">float</td>
                  <td className="p-3 sm:p-4">Decimal numbers (up to 6 digits precision)</td>
                  <td className="p-3 sm:p-4 font-mono">3.14, 85.5</td>
                  <td className="p-3 sm:p-4 font-mono text-emerald-700 font-bold">%f</td>
                </tr>
                <tr>
                  <td className="p-3 sm:p-4 font-mono font-bold text-indigo-600">double</td>
                  <td className="p-3 sm:p-4">High-precision decimals (up to 15 digits)</td>
                  <td className="p-3 sm:p-4 font-mono">3.1415926535</td>
                  <td className="p-3 sm:p-4 font-mono text-emerald-700 font-bold">%lf</td>
                </tr>
                <tr>
                  <td className="p-3 sm:p-4 font-mono font-bold text-amber-600">char</td>
                  <td className="p-3 sm:p-4">A single letter or character in single quotes</td>
                  <td className="p-3 sm:p-4 font-mono">&apos;A&apos;, &apos;z&apos;, &apos;$&apos;</td>
                  <td className="p-3 sm:p-4 font-mono text-emerald-700 font-bold">%c</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: Creating and Printing Variables */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            3. Writing Code with Variables &amp; Placeholders
          </h3>
          <pre className="overflow-x-auto rounded-2xl bg-slate-900 border border-slate-800 p-6 text-sm leading-7 font-mono text-emerald-300">
            {`#include <stdio.h>

int main() {
    int age = 20;
    float cgpa = 8.75;
    char section = 'A';

    printf("Age: %d years old\\n", age);
    printf("CGPA: %.2f\\n", cgpa);       // %.2f rounds to 2 decimal places
    printf("Section: %c\\n", section);

    return 0;
}`}
          </pre>
        </section>
      </div>

      {/* ────────────────────────────────────────────────────────────── */}
      {/* 📊 CHAPTER 2: MEMORY ARCHITECTURE & SIZES                      */}
      {/* ────────────────────────────────────────────────────────────── */}
      <div className="space-y-8 mt-12">
        <div className="flex items-center justify-between border-b border-amber-200 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚙️</span>
            <h2 className="text-lg font-black uppercase tracking-wider text-amber-900">
              Memory Architecture, Sizing &amp; Type Casting
            </h2>
          </div>
          <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Bytes &amp; Casting
          </span>
        </div>

        {/* Section 4: sizeof Operator & Memory Allocation */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            4. The sizeof() Operator &amp; Architecture Byte Sizes
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 font-bold text-gray-700">
                <tr>
                  <th className="p-3 sm:p-4">Type</th>
                  <th className="p-3 sm:p-4">Bytes (64-bit OS)</th>
                  <th className="p-3 sm:p-4">Total Bits</th>
                  <th className="p-3 sm:p-4">Permitted Range</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-gray-800 font-mono">
                <tr>
                  <td className="p-3 sm:p-4 text-blue-700 font-bold">char</td>
                  <td className="p-3 sm:p-4">1 byte</td>
                  <td className="p-3 sm:p-4">8 bits</td>
                  <td className="p-3 sm:p-4">-128 to 127 (or 0 to 255 unsigned)</td>
                </tr>
                <tr>
                  <td className="p-3 sm:p-4 text-purple-700 font-bold">short</td>
                  <td className="p-3 sm:p-4">2 bytes</td>
                  <td className="p-3 sm:p-4">16 bits</td>
                  <td className="p-3 sm:p-4">-32,768 to 32,767</td>
                </tr>
                <tr>
                  <td className="p-3 sm:p-4 text-emerald-700 font-bold">int</td>
                  <td className="p-3 sm:p-4">4 bytes</td>
                  <td className="p-3 sm:p-4">32 bits</td>
                  <td className="p-3 sm:p-4">-2,147,483,648 to +2,147,483,647</td>
                </tr>
                <tr>
                  <td className="p-3 sm:p-4 text-amber-700 font-bold">long long</td>
                  <td className="p-3 sm:p-4">8 bytes</td>
                  <td className="p-3 sm:p-4">64 bits</td>
                  <td className="p-3 sm:p-4">&plusmn;9.22 &times; 10¹⁸</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 5: Type Casting & Integer Division Trap */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            5. Type Casting: The Integer Division Pitfall
          </h3>
          <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-5">
            <p className="text-sm font-bold text-rose-900">🚨 Tricky Arithmetic Bug:</p>
            <pre className="mt-3 rounded-xl bg-slate-900 p-4 text-xs font-mono text-rose-300">
              {`float result = 5 / 2;
printf("%f\\n", result); // PRINTS 2.000000, NOT 2.500000!`}
            </pre>
            <p className="mt-3 text-xs sm:text-sm text-gray-800 leading-relaxed">
              <strong>Why?</strong> In C, dividing two integers always produces an integer (the decimal part is discarded). By the time it stores into <code className="font-mono">float result</code>, the 0.5 is already lost!
              <br /><br />
              <strong>The Fix:</strong> Explicitly cast at least one operand:
              <br />
              <code className="font-mono text-slate-900 font-bold">float result = (float)5 / 2; // Produces 2.5!</code>
            </p>
          </div>
        </section>
      </div>

      {/* ────────────────────────────────────────────────────────────── */}
      {/* ⚡ CHAPTER 3: HARDWARE ENCODING & PRODUCTION TRAPS            */}
      {/* ────────────────────────────────────────────────────────────── */}
      <div className="space-y-8 mt-12">
        <div className="flex items-center justify-between border-b border-purple-200 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🚀</span>
            <h2 className="text-lg font-black uppercase tracking-wider text-purple-900">
              Hardware Encoding, Two&apos;s Complement &amp; Struct Alignment
            </h2>
          </div>
          <span className="text-xs font-bold text-purple-800 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            Hardware Deep-Dive
          </span>
        </div>

        {/* Section 6: Integer Overflow & Two's Complement */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            6. Two&apos;s Complement Representation &amp; Integer Overflow
          </h3>
          <p className="text-gray-700 leading-7 mb-4">
            Negative integers are represented in binary using <strong>Two&apos;s Complement</strong> (invert all bits and add 1). When a 32-bit signed integer exceeds <code className="font-mono">2,147,483,647</code> (<code className="font-mono">INT_MAX</code>), adding 1 flips the Most Significant Bit (the sign bit), resulting in a sudden jump to <strong className="text-rose-700 font-mono">-2,147,483,648</strong> (<code className="font-mono">INT_MIN</code>).
          </p>

          <pre className="overflow-x-auto rounded-2xl bg-slate-900 border border-slate-800 p-6 text-sm leading-7 font-mono text-emerald-300">
            {`#include <stdio.h>
#include <limits.h>

int main() {
    int max = INT_MAX; // 2147483647
    printf("Max integer: %d\\n", max);

    // Overflow: Undefined Behavior in C standard!
    int overflowed = max + 1;
    printf("Overflowed:  %d\\n", overflowed); // Prints: -2147483648

    return 0;
}`}
          </pre>
        </section>

        {/* Section 7: IEEE-754 Precision Traps */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            7. IEEE-754 Floating Point Precision: Why 0.1 + 0.2 != 0.3
          </h3>
          <p className="text-gray-700 leading-7 mb-4">
            Just like 1/3 cannot be written finitely in base-10 (0.33333...), fractions like 0.1 and 0.2 cannot be represented with finite binary bits in base-2:
          </p>

          <pre className="overflow-x-auto rounded-2xl bg-slate-900 border border-slate-800 p-6 text-sm leading-7 font-mono text-emerald-300">
            {`#include <stdio.h>
#include <math.h>

int main() {
    double a = 0.1 + 0.2;
    double b = 0.3;

    // NEVER do direct == equality on floating point numbers!
    if (a == b) {
        printf("Equal\\n");
    } else {
        printf("NOT EQUAL! a = %.17f\\n", a); // 0.30000000000000004441
    }

    // PRODUCTION STANDARD: Epsilon comparison
    if (fabs(a - b) < 1e-9) {
        printf("Equal within numerical epsilon tolerance!\\n");
    }
    return 0;
}`}
          </pre>
        </section>

        {/* Section 8: Struct Memory Alignment & Padding */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            8. Memory Alignment &amp; Struct Padding in 64-bit CPUs
          </h3>
          <p className="text-gray-700 leading-7 mb-4">
            CPUs read RAM in 4-byte or 8-byte word blocks. To optimize CPU cache throughput, the compiler inserts hidden padding bytes between struct fields:
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-5">
              <span className="font-mono text-xs font-black text-rose-800">Unoptimized Struct (12 Bytes)</span>
              <pre className="mt-2 rounded-xl bg-slate-900 p-3 text-xs font-mono text-rose-300">
                {`struct Bad {
    char a;   // 1 byte
    // [3 padding bytes inserted!]
    int b;    // 4 bytes
    char c;   // 1 byte
    // [3 padding bytes inserted!]
}; // sizeof == 12 bytes!`}
              </pre>
            </div>

            <div className="rounded-2xl border border-emerald-300 bg-emerald-50/50 p-5">
              <span className="font-mono text-xs font-black text-emerald-800">Optimized Struct (8 Bytes)</span>
              <pre className="mt-2 rounded-xl bg-slate-900 p-3 text-xs font-mono text-emerald-300">
                {`struct Good {
    int b;    // 4 bytes
    char a;   // 1 byte
    char c;   // 1 byte
    // [2 padding bytes]
}; // sizeof == 8 bytes (33% RAM saved!)`}
              </pre>
            </div>
          </div>
        </section>
      </div>
    </LessonPage>
  );
}