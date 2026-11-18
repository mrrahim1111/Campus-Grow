"use client";
import LessonPage from "@/components/LessonPage";

export default function InputOutput() {
  return (
    <LessonPage
      lessonId="input-output"
      lessonNumber={4}
      title="Input &amp; Output: Streams, Buffering &amp; Format Security"
      category="Year 1 • Foundations"
      readTime="40 min interactive practice"
      description="Make your programs interactive! Master printf and scanf from basic address ampersands to stdin/stdout/stderr stream buffering, trailing newline traps, and Format String vulnerability defense."
      question={{
        question: "When using `scanf(\"%d\", &age);` to read an integer, why is the `&` (ampersand) symbol required before `age`?",
        options: [
          "It tells C the memory address of the `age` box so `scanf` knows where to store the number",
          "It automatically doubles the number entered by the user",
          "It is completely optional and can be skipped without issues",
          "It converts text into sound output on the speaker",
        ],
        correctAnswer: "It tells C the memory address of the `age` box so `scanf` knows where to store the number",
        explanation:
          "Think of `&` as putting a delivery address on an envelope. `scanf` needs to know the exact address of your variable's memory box so it can deliver the number you typed into it!",
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
              I/O Streams &amp; Terminal Communication
            </h2>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Interactive First
          </span>
        </div>

        {/* Section 1: Talking and Listening */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            1. How Programs Talk &amp; Listen
          </h3>
          <p className="text-gray-700 leading-7">
            To build interactive applications — like an ATM portal or game engine — code must communicate with real humans:
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5">
              <span className="text-2xl">🗣️</span>
              <h4 className="font-bold text-gray-950 text-base mt-2">printf() — Talking (Output)</h4>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Pushes formatted text, variables, and calculated data to the user&apos;s terminal screen.
              </p>
            </div>

            <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-5">
              <span className="text-2xl">👂</span>
              <h4 className="font-bold text-gray-950 text-base mt-2">scanf() — Listening (Input)</h4>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Suspends execution, waiting for the user to type into the keyboard and press Enter.
              </p>
            </div>
          </div>

          <pre className="mt-5 overflow-x-auto rounded-2xl bg-slate-900 border border-slate-800 p-6 text-sm leading-7 font-mono text-emerald-300">
{`#include <stdio.h>

int main() {
    int birthYear;

    printf("Enter birth year: ");
    scanf("%d", &birthYear); // '&' tells scanf the address where birthYear lives!

    int age = 2026 - birthYear;
    printf("You will be %d years old in 2026!\\n", age);
    return 0;
}`}
          </pre>
        </section>
      </div>

      {/* ────────────────────────────────────────────────────────────── */}
      {/* 🟡 LEVEL 2: INTERMEDIATE CORE & STREAM BUFFERING               */}
      {/* ────────────────────────────────────────────────────────────── */}
      <div className="space-y-8 mt-12">
        <div className="flex items-center justify-between border-b border-amber-200 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🟡</span>
            <h2 className="text-lg font-black uppercase tracking-wider text-amber-900">
              OS Stream Buffers (Line vs Block) &amp; fflush() Mechanics
            </h2>
          </div>
          <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Streams &amp; Traps
          </span>
        </div>

        {/* Section 2: Standard Streams */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            2. The 3 Standard POSIX Streams: stdin, stdout, and stderr
          </h3>
          <p className="text-gray-700 leading-7 mb-4">
            Every running C program is connected to 3 standard file streams provided by the operating system:
          </p>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 font-bold text-gray-700">
                <tr>
                  <th className="p-3 sm:p-4">Stream</th>
                  <th className="p-3 sm:p-4">File Descriptor</th>
                  <th className="p-3 sm:p-4">Default Source/Sink</th>
                  <th className="p-3 sm:p-4">Buffering Mode</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-gray-800 font-mono">
                <tr>
                  <td className="p-3 sm:p-4 text-blue-700 font-bold">stdin</td>
                  <td className="p-3 sm:p-4">0</td>
                  <td className="p-3 sm:p-4">Keyboard</td>
                  <td className="p-3 sm:p-4">Line-buffered</td>
                </tr>
                <tr>
                  <td className="p-3 sm:p-4 text-emerald-700 font-bold">stdout</td>
                  <td className="p-3 sm:p-4">1</td>
                  <td className="p-3 sm:p-4">Terminal display</td>
                  <td className="p-3 sm:p-4">Line-buffered (flushes on &apos;\\n&apos;)</td>
                </tr>
                <tr>
                  <td className="p-3 sm:p-4 text-rose-700 font-bold">stderr</td>
                  <td className="p-3 sm:p-4">2</td>
                  <td className="p-3 sm:p-4">Error log screen</td>
                  <td className="p-3 sm:p-4 text-rose-700 font-bold">Unbuffered (Instant write)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: The Trailing Newline Trap in scanf */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            3. The Trailing Newline Trap in scanf(&quot;%c&quot;)
          </h3>
          <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-5">
            <p className="text-sm font-bold text-rose-900">🚨 The Most Common 1st-Year C Bug:</p>
            <pre className="mt-3 rounded-xl bg-slate-900 p-4 text-xs font-mono text-rose-300">
{`int age;
char grade;

printf("Enter age: ");
scanf("%d", &age); // User types 19 and hits ENTER ('\\n')

printf("Enter grade: ");
scanf("%c", &grade); // BUG: Immediately reads the leftover '\\n' and skips input!`}
            </pre>
            <p className="mt-3 text-xs sm:text-sm text-gray-800 leading-relaxed">
              <strong>The Fix:</strong> Put a leading space before <code className="font-mono">%c</code> in the format string:
              <br />
              <code className="font-mono text-slate-900 font-bold">scanf(&quot; %c&quot;, &amp;grade);</code>
              <br />
              The space instructs <code className="font-mono">scanf</code> to discard all preceding whitespace, tabs, and newline characters!
            </p>
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
              Buffer Exploits, Newline Residue Traps &amp; POSIX Syscalls
            </h2>
          </div>
          <span className="text-xs font-bold text-purple-800 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            Security &amp; Fast I/O
          </span>
        </div>

        {/* Section 4: Format String Attack (CWE-134) */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            4. The Format String Vulnerability (CWE-134)
          </h3>
          <p className="text-gray-700 leading-7 mb-4">
            Never pass raw user input directly as the first argument to <code className="font-mono">printf()</code>. If an attacker inputs <code className="font-mono">%x %x %x %n</code>, <code className="font-mono">printf</code> dumps secret stack memory and can even overwrite return addresses:
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-4">
              <span className="font-mono text-xs font-black text-rose-800">❌ Vulnerable Code</span>
              <pre className="mt-2 rounded-xl bg-slate-900 p-3 text-xs font-mono text-rose-300">
{`char input[100];
fgets(input, 100, stdin);
printf(input); // SEVERE SECURITY HOLE!`}
              </pre>
            </div>

            <div className="rounded-2xl border border-emerald-300 bg-emerald-50/50 p-4">
              <span className="font-mono text-xs font-black text-emerald-800">✅ Production Secure Standard</span>
              <pre className="mt-2 rounded-xl bg-slate-900 p-3 text-xs font-mono text-emerald-300">
{`char input[100];
fgets(input, 100, stdin);
printf("%s", input); // Safe!`}
              </pre>
            </div>
          </div>
        </section>

        {/* Section 5: Competitive Fast I/O */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            5. Fast I/O: 10x Speedup in Online Assessments (getchar_unlocked)
          </h3>
          <p className="text-gray-700 leading-7 mb-4">
            In competitive programming platforms (Codeforces, LeetCode, CodeChef), parsing $10^6$ numbers with <code className="font-mono">scanf()</code> will Time Out (TLE). Senior engineers write a custom fast integer reader using <code className="font-mono">getchar_unlocked()</code>:
          </p>

          <pre className="overflow-x-auto rounded-2xl bg-slate-900 border border-slate-800 p-6 text-sm leading-7 font-mono text-emerald-300">
{`// Reads an integer up to 10x faster than scanf():
int fastReadInt() {
    int val = 0;
    char ch = getchar();

    // Skip non-digit characters
    while (ch < '0' || ch > '9') ch = getchar();

    // Parse digits directly in registers
    while (ch >= '0' && ch <= '9') {
        val = (val << 3) + (val << 1) + (ch - '0'); // val * 10 + digit
        ch = getchar();
    }
    return val;
}`}
          </pre>
        </section>
      </div>
    </LessonPage>
  );
}
