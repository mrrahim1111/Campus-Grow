"use client";
import LessonPage from "@/components/LessonPage";

export default function ProgrammingFundamentals() {
  return (
    <LessonPage
      lessonId="programming-fundamentals"
      lessonNumber={1}
      title="Programming Fundamentals: Logic, Algorithms &amp; Complexity"
      category="Year 1 • Foundations"
      readTime="35 min interactive sprint"
      description="Welcome to software engineering! Think of coding not as arcane mathematics, but as clear, algorithmic problem-solving. Master mental models, the IPO framework, execution trace tables, and computational complexity."
      question={{
        question: "What is the best way to think about a computer program?",
        options: [
          "A random collection of math formulas that only scientists understand",
          "A clear, step-by-step recipe that tells the computer exactly what to do",
          "A hardware chip that cannot be changed once manufactured",
          "A magical device that automatically guesses what humans want",
        ],
        correctAnswer: "A clear, step-by-step recipe that tells the computer exactly what to do",
        explanation:
          "Just like baking a cake requires following instructions in order (1. mix flour, 2. add eggs, 3. bake in oven), a computer program is simply an orderly set of instructions that a computer carries out step by step.",
      }}
    >
      {/* ────────────────────────────────────────────────────────────── */}
      {/* 🟢 LEVEL 1: FOUNDATIONS & MENTAL MODELS                        */}
      {/* ────────────────────────────────────────────────────────────── */}
      <div className="space-y-8">
        <div className="flex items-center justify-between border-b border-emerald-200 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🟢</span>
            <h2 className="text-lg font-black uppercase tracking-wider text-emerald-800">
              Foundations &amp; Algorithmic Mental Models
            </h2>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Zero Prerequisites
          </span>
        </div>

        {/* Section 1: What is Programming? */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            1. What is Programming? The Cooking Recipe Analogy
          </h3>
          <p className="text-gray-700 leading-7">
            Imagine an assistant who works at incredible speed — performing billions of operations per second — but possesses <strong className="text-gray-950">zero imagination</strong>. If you tell them <em>&quot;Make breakfast,&quot;</em> they freeze. But if you provide an unambiguous, numbered recipe:
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-blue-200 bg-blue-50/60 p-4">
              <span className="text-xs font-bold uppercase text-blue-700">Step 1</span>
              <p className="mt-1 text-sm font-semibold text-gray-900">Take two eggs from the refrigerator.</p>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-4">
              <span className="text-xs font-bold uppercase text-amber-700">Step 2</span>
              <p className="mt-1 text-sm font-semibold text-gray-900">Heat frying pan with butter on medium flame.</p>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4">
              <span className="text-xs font-bold uppercase text-emerald-700">Step 3</span>
              <p className="mt-1 text-sm font-semibold text-gray-900">Cook for 2 minutes and serve warm.</p>
            </div>
          </div>
          <p className="mt-4 text-gray-700 leading-7">
            That is all <strong className="text-gray-950">software engineering</strong> is: breaking complex problems down into simple, unambiguous steps that a processor can execute sequentially.
          </p>
        </section>

        {/* Section 2: The IPO Model */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            2. The Universal IPO Framework (Input &rarr; Process &rarr; Output)
          </h3>
          <p className="text-gray-700 leading-7 mb-4">
            Every software system ever built — from an electric vehicle autopilot to an e-commerce checkout — operates on the exact same 3-step cycle:
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-xl font-bold text-blue-700 mb-3">
                📥
              </div>
              <h4 className="text-sm font-black text-gray-950 uppercase">1. Input</h4>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Raw data entering the program (keyboard keystrokes, GPS coordinates, webcam feed, or database records).
              </p>
            </div>

            <div className="rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-xl font-bold text-purple-700 mb-3">
                ⚙️
              </div>
              <h4 className="text-sm font-black text-gray-950 uppercase">2. Process</h4>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Logical rules and mathematical computations performed by CPU arithmetic units on the input data.
              </p>
            </div>

            <div className="rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-xl font-bold text-emerald-700 mb-3">
                📤
              </div>
              <h4 className="text-sm font-black text-gray-950 uppercase">3. Output</h4>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                The computed final result presented to the user (screen pixels, audio, printed receipt, or saved file).
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* ────────────────────────────────────────────────────────────── */}
      {/* 🟡 LEVEL 2: INTERMEDIATE CORE & ALGORITHMIC THINKING           */}
      {/* ────────────────────────────────────────────────────────────── */}
      <div className="space-y-8 mt-12">
        <div className="flex items-center justify-between border-b border-amber-200 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🟡</span>
            <h2 className="text-lg font-black uppercase tracking-wider text-amber-900">
              Von Neumann Architecture &amp; Execution Pipeline
            </h2>
          </div>
          <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Logic &amp; Tracing
          </span>
        </div>

        {/* Section 3: What Makes an Algorithm? */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            3. The 5 Formal Pillars of an Algorithm
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 font-bold text-gray-700">
                <tr>
                  <th className="p-3 sm:p-4">Pillar</th>
                  <th className="p-3 sm:p-4">Meaning</th>
                  <th className="p-3 sm:p-4">Counter-Example (Failure Mode)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-gray-800">
                <tr>
                  <td className="p-3 sm:p-4 font-bold text-blue-700">1. Finiteness</td>
                  <td className="p-3 sm:p-4">Must terminate after a finite number of steps.</td>
                  <td className="p-3 sm:p-4 text-rose-600 font-mono">Infinite loop freezing UI</td>
                </tr>
                <tr>
                  <td className="p-3 sm:p-4 font-bold text-purple-700">2. Definiteness</td>
                  <td className="p-3 sm:p-4">Each step must be clear and unambiguous.</td>
                  <td className="p-3 sm:p-4 text-rose-600">&quot;Cook until it smells nice&quot;</td>
                </tr>
                <tr>
                  <td className="p-3 sm:p-4 font-bold text-emerald-700">3. Effectiveness</td>
                  <td className="p-3 sm:p-4">Operations must be feasible on real physical hardware.</td>
                  <td className="p-3 sm:p-4 text-rose-600">Dividing by zero</td>
                </tr>
                <tr>
                  <td className="p-3 sm:p-4 font-bold text-amber-700">4. Input &amp; Output</td>
                  <td className="p-3 sm:p-4">Accepts 0 or more inputs; produces 1 or more outputs.</td>
                  <td className="p-3 sm:p-4 text-slate-500">Pure CPU spin doing nothing</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: Dry-Run State Tracing */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            4. State Tracing: The Dry-Run Execution Table
          </h3>
          <p className="text-gray-700 leading-7 mb-4">
            Before running code on a computer, elite software engineers trace their logic with a <strong>Dry-Run Table</strong>:
          </p>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs sm:text-sm font-mono">
              <thead className="border-b border-slate-200 bg-slate-50 font-bold text-gray-700">
                <tr>
                  <th className="p-3">Iteration</th>
                  <th className="p-3">Variable &apos;i&apos;</th>
                  <th className="p-3">Condition (i &lt;= 3)</th>
                  <th className="p-3">Variable &apos;sum&apos; Before</th>
                  <th className="p-3">sum += i</th>
                  <th className="p-3">sum After</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-gray-800">
                <tr><td className="p-3">Start</td><td className="p-3">1</td><td className="p-3 text-emerald-700">TRUE</td><td className="p-3">0</td><td className="p-3">0 + 1</td><td className="p-3 font-bold text-emerald-700">1</td></tr>
                <tr><td className="p-3">Round 2</td><td className="p-3">2</td><td className="p-3 text-emerald-700">TRUE</td><td className="p-3">1</td><td className="p-3">1 + 2</td><td className="p-3 font-bold text-emerald-700">3</td></tr>
                <tr><td className="p-3">Round 3</td><td className="p-3">3</td><td className="p-3 text-emerald-700">TRUE</td><td className="p-3">3</td><td className="p-3">3 + 3</td><td className="p-3 font-bold text-emerald-700">6</td></tr>
                <tr><td className="p-3">Exit</td><td className="p-3">4</td><td className="p-3 text-rose-600 font-bold">FALSE (Terminates)</td><td className="p-3">6</td><td className="p-3">-</td><td className="p-3 font-bold text-blue-700">6 (Final Answer)</td></tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* ────────────────────────────────────────────────────────────── */}
      {/* 🟣 LEVEL 3: ADVANCED MASTERY & COMPUTATIONAL COMPLEXITY        */}
      {/* ────────────────────────────────────────────────────────────── */}
      <div className="space-y-8 mt-12">
        <div className="flex items-center justify-between border-b border-purple-200 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🟣</span>
            <h2 className="text-lg font-black uppercase tracking-wider text-purple-900">
              Systems Architecture &amp; Computational Complexity
            </h2>
          </div>
          <span className="text-xs font-bold text-purple-800 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            Big-O Foundations
          </span>
        </div>

        {/* Section 5: Asymptotic Complexity */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            5. Asymptotic Analysis: Why 1 Second Outweighs 100 Years
          </h3>
          <p className="text-gray-700 leading-7 mb-4">
            In engineering, we measure efficiency using <strong>Asymptotic Time Complexity</strong>. When input size $N = 100,000$ items:
          </p>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-emerald-300 bg-emerald-50/60 p-4">
              <span className="font-mono text-xs font-black text-emerald-800">O(log N) — Binary Search</span>
              <p className="font-mono text-sm font-bold text-emerald-700 mt-1">~17 Operations</p>
              <p className="text-xs text-gray-600 mt-1">Executes in 0.000001 seconds!</p>
            </div>

            <div className="rounded-2xl border border-blue-300 bg-blue-50/60 p-4">
              <span className="font-mono text-xs font-black text-blue-800">O(N) — Linear Scan</span>
              <p className="font-mono text-sm font-bold text-blue-700 mt-1">100,000 Operations</p>
              <p className="text-xs text-gray-600 mt-1">Executes in 0.001 seconds.</p>
            </div>

            <div className="rounded-2xl border border-rose-300 bg-rose-50/60 p-4">
              <span className="font-mono text-xs font-black text-rose-800">O(N²) — Naive Nested Loops</span>
              <p className="font-mono text-sm font-bold text-rose-700 mt-1">10,000,000,000 Operations</p>
              <p className="text-xs text-gray-600 mt-1">Takes 10+ seconds, freezing your server.</p>
            </div>
          </div>
        </section>

        {/* Section 6: The Halting Problem */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            6. The Theoretical Limit of Computing: Alan Turing&apos;s Halting Problem
          </h3>
          <p className="text-gray-700 leading-7">
            Can an AI or compiler inspect any given computer program and definitively decide whether it will finish running or get stuck in an infinite loop?
            <br /><br />
            In 1936, <strong>Alan Turing</strong> proved mathematically that such a universal program <strong>CANNOT EXIST</strong>! This fundamental theorem (the Halting Problem) establishes that software verification is inherently undecidable — which is why defensive coding, bounded loops, and testing remain essential for every engineer.
          </p>
        </section>
      </div>
    </LessonPage>
  );
}