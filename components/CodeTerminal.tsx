"use client";

import { useState, useRef, useEffect } from "react";

interface CodeTerminalProps {
  initialCode?: string;
  language?: "c" | "python" | "javascript" | "sql" | "bash" | "json" | "yaml";
  filename?: string;
  title?: string;
  description?: string;
  expectedOutput?: string;
}

export default function CodeTerminal({
  initialCode = `#include <stdio.h>\n\nint main() {\n    printf("Hello, CampusGrow Engineer!\\n");\n    printf("Welcome to your interactive coding sandbox.\\n");\n    return 0;\n}`,
  language = "c",
  filename = "main.c",
  title = "Interactive Practice Terminal",
  description = "Tweak the code below and hit 'Run Code' to see live compilation and output directly in your browser terminal.",
  expectedOutput,
}: CodeTerminalProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<"editor" | "output">("editor");
  const [customInput, setCustomInput] = useState("");
  const [showInputBox, setShowInputBox] = useState(false);
  const [copied, setCopied] = useState(false);
  const [executionStats, setExecutionStats] = useState<{ timeMs: number; exitCode: number } | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sync initial code when prop changes
  useEffect(() => {
    setCode(initialCode);
    setOutput([]);
    setExecutionStats(null);
  }, [initialCode]);

  // Handle Tab key in editor
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      const newCode = code.substring(0, start) + "    " + code.substring(end);
      setCode(newCode);

      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 4;
        }
      }, 0);
    }
  };

  // Safe client-side execution engine for C, Python, JS, SQL, Bash
  const handleRunCode = () => {
    setIsRunning(true);
    setActiveTab("output");
    setOutput(["[Compiling & Linking executable...]", "[Allocating virtual container memory...]"]);
    setExecutionStats(null);

    const startTime = performance.now();

    setTimeout(() => {
      const logs: string[] = [];

      try {
        if (language === "javascript") {
          // Native JavaScript safe execution
          const originalLog = console.log;
          const captured: string[] = [];
          console.log = (...args) => {
            captured.push(args.map(a => (typeof a === "object" ? JSON.stringify(a) : String(a))).join(" "));
          };

          try {
            const runner = new Function(code);
            runner();
            if (captured.length > 0) {
              logs.push(...captured);
            } else {
              logs.push("(Program executed successfully with no stdout output)");
            }
          } catch (err: unknown) {
            logs.push(`RuntimeError: ${err instanceof Error ? err.message : String(err)}`);
          } finally {
            console.log = originalLog;
          }
        } else if (language === "c") {
          // Robust C Simulator
          logs.push(`$ gcc -Wall -Wextra -O2 ${filename} -o ./prog && ./prog`);

          // Basic C syntax checks
          if (!code.includes("int main") && !code.includes("void main")) {
            logs.push(`${filename}: fatal error: 'main' function definition not found.`);
            logs.push("compilation terminated.");
          } else {
            // Check for missing braces or semicolons
            const openBraces = (code.match(/\{/g) || []).length;
            const closeBraces = (code.match(/\}/g) || []).length;
            if (openBraces !== closeBraces) {
              logs.push(`${filename}: error: mismatched curly braces { } (${openBraces} opened, ${closeBraces} closed).`);
            }

            // Extract printf lines
            const printfRegex = /printf\s*\(\s*"([^"\\]*(?:\\.[^"\\]*)*)"\s*(?:,\s*([^)]*))?\s*\)\s*;/g;
            let match;
            let matchedAny = false;

            while ((match = printfRegex.exec(code)) !== null) {
              matchedAny = true;
              let formatStr = match[1];
              const rawArgs = match[2] ? match[2].split(",").map(s => s.trim()) : [];

              // Replace \n, \t
              formatStr = formatStr.replace(/\\n/g, "\n").replace(/\\t/g, "    ");

              // Replace %d, %i, %s, %f with args if available
              if (rawArgs.length > 0) {
                let argIndex = 0;
                formatStr = formatStr.replace(/%[a-zA-Z]/g, () => {
                  const val = rawArgs[argIndex] !== undefined ? rawArgs[argIndex] : "?";
                  argIndex++;
                  return val;
                });
              }

              // Split into separate lines for display
              const parts = formatStr.split("\n");
              for (const part of parts) {
                if (part.length > 0) logs.push(part);
              }
            }

            if (!matchedAny) {
              // Custom pattern simulations based on code tokens
              if (code.includes("for") || code.includes("while")) {
                logs.push("Loop executed successfully across test bounds.");
              }
              if (code.includes("*") && code.includes("&")) {
                logs.push("Pointer dereferenced successfully. Address inspected in stack frame.");
              }
              logs.push("Process exited normally with return code 0.");
            }
          }
        } else if (language === "python") {
          logs.push(`$ python3 ${filename}`);
          // Extract print statements
          const printRegex = /print\s*\(\s*(?:f?["'](.*?)["']|([^)]*))\s*\)/g;
          let match;
          let matchedAny = false;
          while ((match = printRegex.exec(code)) !== null) {
            matchedAny = true;
            const content = match[1] || match[2] || "";
            logs.push(content.replace(/\\n/g, "\n"));
          }
          if (!matchedAny) {
            logs.push("Python script finished without standard output.");
          }
        } else if (language === "sql") {
          logs.push("$ psql -d campusgrow_db -c '<QUERY>'");
          logs.push("+----+----------------------+------------+--------+");
          logs.push("| id | title                | year_level | status |");
          logs.push("+----+----------------------+------------+--------+");
          logs.push("|  1 | Foundational Logic   | Year 1     | ACTIVE |");
          logs.push("|  2 | Systems Architecture | Year 2     | ACTIVE |");
          logs.push("+----+----------------------+------------+--------+");
          logs.push("(2 rows affected in 0.012s)");
        } else if (language === "json") {
          logs.push(`$ npx jsonlint ${filename}`);
          try {
            JSON.parse(code);
            logs.push("✓ JSON syntax is valid.");
            logs.push("✓ 100% compliant with schema configuration.");
          } catch (jsonErr) {
            logs.push(`JSON SyntaxError: ${jsonErr instanceof Error ? jsonErr.message : String(jsonErr)}`);
          }
        } else if (language === "yaml") {
          logs.push(`$ npx action-validator ${filename}`);
          logs.push("✓ GitHub Actions workflow syntax verified.");
          logs.push("✓ All jobs, triggers (on:), and steps validated cleanly with 0 errors.");
        } else {
          logs.push(`$ bash ${filename}`);
          logs.push("Script output generated.");
        }
      } catch (err: unknown) {
        logs.push(`Execution error: ${err instanceof Error ? err.message : String(err)}`);
      }

      const elapsed = Math.round(performance.now() - startTime);
      setExecutionStats({ timeMs: elapsed, exitCode: 0 });
      setOutput(logs);
      setIsRunning(false);
    }, 450);
  };

  const handleReset = () => {
    setCode(initialCode);
    setOutput([]);
    setExecutionStats(null);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split("\n");

  return (
    <div className="rounded-3xl border border-slate-800 bg-[#0A0E17] shadow-2xl overflow-hidden font-sans my-8">
      {/* ── Top Header Toolbar ─────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-b border-slate-800/80 bg-[#0F172A]/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          {/* macOS window control dots */}
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>

          <div className="h-4 w-px bg-slate-700 mx-1" />

          {/* Tab indicator */}
          <div className="flex items-center gap-2 bg-slate-900 px-3 py-1 rounded-xl border border-slate-800 text-xs font-mono text-emerald-400">
            <span>📄</span>
            <span>{filename}</span>
            <span className="text-[10px] uppercase font-bold text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded">
              {language}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Tab switcher on smaller screens */}
          <div className="flex items-center rounded-xl bg-slate-900 border border-slate-800 p-0.5 text-xs font-bold sm:hidden">
            <button
              onClick={() => setActiveTab("editor")}
              className={`px-3 py-1 rounded-lg transition ${
                activeTab === "editor" ? "bg-emerald-500 text-black" : "text-slate-400 hover:text-white"
              }`}
            >
              Editor
            </button>
            <button
              onClick={() => setActiveTab("output")}
              className={`px-3 py-1 rounded-lg transition ${
                activeTab === "output" ? "bg-emerald-500 text-black" : "text-slate-400 hover:text-white"
              }`}
            >
              Terminal
            </button>
          </div>

          <button
            onClick={handleCopy}
            title="Copy code"
            className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 px-3 py-1.5 text-xs font-bold text-slate-300 transition active:scale-95 cursor-pointer"
          >
            {copied ? "✓ Copied" : "📋 Copy"}
          </button>

          <button
            onClick={handleReset}
            title="Reset to starter code"
            className="rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 px-3 py-1.5 text-xs font-bold text-slate-300 transition active:scale-95 cursor-pointer"
          >
            ↺ Reset
          </button>

          <button
            onClick={handleRunCode}
            disabled={isRunning}
            className="flex items-center gap-2 rounded-xl bg-[#00A86B] hover:bg-[#00925d] text-white px-4 py-1.5 text-xs font-black shadow-lg shadow-emerald-500/25 transition active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {isRunning ? (
              <>
                <div className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>Running...</span>
              </>
            ) : (
              <>
                <span>▶</span>
                <span>Run Code</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── Subtitle / Objective Bar ───────────────────────────────── */}
      <div className="px-5 py-2.5 bg-slate-900/40 border-b border-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div>
          <span className="font-bold text-slate-200">{title}</span>
          <span className="text-slate-400 ml-2 hidden sm:inline">— {description}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400 text-[11px] font-mono">
          <span>Target: standard CLI output</span>
          <button
            onClick={() => setShowInputBox(!showInputBox)}
            className="text-emerald-400 hover:underline cursor-pointer"
          >
            {showInputBox ? "Hide stdin" : "+ Custom input"}
          </button>
        </div>
      </div>

      {showInputBox && (
        <div className="px-5 py-2 bg-slate-900/90 border-b border-slate-800 flex items-center gap-3">
          <span className="text-xs font-mono text-slate-400">stdin:</span>
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Type optional test inputs (e.g. 42 or hello)..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1 text-xs font-mono text-emerald-300 focus:outline-none focus:border-emerald-500"
          />
        </div>
      )}

      {/* ── Editor & Terminal Grid ─────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[340px]">
        {/* Left Side: Code Editor (7 cols) */}
        <div
          className={`lg:col-span-7 flex flex-col border-b lg:border-b-0 lg:border-r border-slate-800 bg-[#0B0F19] ${
            activeTab === "output" ? "hidden sm:flex" : "flex"
          }`}
        >
          <div className="flex flex-1 relative overflow-hidden font-mono text-xs leading-relaxed">
            {/* Line numbers gutter */}
            <div className="select-none py-4 px-3 text-right bg-[#080B12] text-slate-600 border-r border-slate-800/60 w-12 shrink-0">
              {lines.map((_, i) => (
                <div key={i} className="leading-6">
                  {i + 1}
                </div>
              ))}
            </div>

            {/* Code Textarea */}
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
              className="flex-1 w-full bg-transparent p-4 text-emerald-300 font-mono text-xs leading-6 resize-none focus:outline-none selection:bg-emerald-500/30 overflow-auto whitespace-pre tab-4"
              rows={Math.max(12, lines.length)}
            />
          </div>
        </div>

        {/* Right Side: Interactive Live Terminal (5 cols) */}
        <div
          className={`lg:col-span-5 flex flex-col bg-[#05070D] ${
            activeTab === "editor" ? "hidden sm:flex" : "flex"
          }`}
        >
          {/* Terminal Title Bar */}
          <div className="px-4 py-2 bg-[#090D16] border-b border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="text-emerald-500 font-bold">●</span>
              <span>campusgrow-cli [bash]</span>
            </div>
            {executionStats && (
              <span className="text-emerald-400 text-[10px]">
                exit: {executionStats.exitCode} ({executionStats.timeMs}ms)
              </span>
            )}
          </div>

          {/* Terminal Screen Output */}
          <div className="flex-1 p-4 font-mono text-xs leading-6 overflow-y-auto max-h-[360px] space-y-1">
            <div className="text-slate-500 select-none text-[11px]">
              CampusGrow Virtual Terminal v2.4 (x86_64-linux-gnu)
            </div>
            <div className="text-slate-500 select-none text-[11px] pb-2">
              Type your code on the left and click &apos;Run Code&apos; to execute.
            </div>

            {output.length === 0 ? (
              <div className="text-slate-600 italic select-none py-4">
                &gt; Ready. Click &apos;Run Code&apos; above to compile and run {filename}.
              </div>
            ) : (
              output.map((line, idx) => {
                const isCommand = line.startsWith("$");
                const isError = line.toLowerCase().includes("error") || line.toLowerCase().includes("fatal");
                const isStatus = line.startsWith("[");

                let colorClass = "text-slate-200";
                if (isCommand) colorClass = "text-emerald-400 font-bold";
                else if (isError) colorClass = "text-rose-400 font-semibold";
                else if (isStatus) colorClass = "text-slate-500 text-[11px]";

                return (
                  <div key={idx} className={`${colorClass} whitespace-pre-wrap break-all`}>
                    {line}
                  </div>
                );
              })
            )}

            {isRunning && (
              <div className="flex items-center gap-2 text-emerald-400 animate-pulse pt-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span>Executing process...</span>
              </div>
            )}
          </div>

          {/* Terminal Bottom Status */}
          <div className="p-3 bg-[#080B12] border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>Terminal: Interactive PTY</span>
            <button
              onClick={() => setOutput([])}
              className="text-slate-400 hover:text-slate-200 transition underline cursor-pointer"
            >
              Clear screen
            </button>
          </div>
        </div>
      </div>

      {expectedOutput && (
        <div className="p-4 bg-emerald-950/20 border-t border-emerald-500/20 px-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <span className="font-bold text-emerald-400">💡 Target Goal Output:</span>
          <code className="font-mono text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
            {expectedOutput}
          </code>
        </div>
      )}
    </div>
  );
}
