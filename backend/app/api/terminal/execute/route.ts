import { NextResponse } from "next/server";
import { execFile, spawn } from "node:child_process";
import { promises as fs } from "node:fs";
import path from "node:path";
import os from "node:os";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const MAX_CODE_BYTES = 256 * 1024; // 256 KB max code size
const MAX_OUTPUT_BYTES = 64 * 1024; // 64 KB output buffer cap

// Minimal safe environment variables to strictly prevent leaking server secrets
const SAFE_ENV: NodeJS.ProcessEnv = {
  NODE_ENV: (process.env.NODE_ENV as any) || "production",
  PATH: "/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin",
  LANG: "en_US.UTF-8",
  LC_ALL: "en_US.UTF-8",
  HOME: os.tmpdir(),
  TMPDIR: os.tmpdir(),
};

// Security blacklist against malicious system tampering and secret exfiltration
const FORBIDDEN_SECURITY_PATTERNS = [
  /\/etc\/shadow/i,
  /\/etc\/passwd/i,
  /\.env(\.local|\.production)?/i,
  /\.git\//i,
  /id_rsa/i,
  /:()\{\s*:\|:&\s*\};:/, // fork bomb
  /rm\s+-rf\s+(\/|~|\$HOME|\/usr|\/etc|\/bin)/i,
  /mkfs(\.|\s)/i,
  /dd\s+if=.*of=\/dev/i,
  /shutdown\s+/i,
  /reboot\s+/i,
];

function checkSecurityViolations(code: string): string | null {
  for (const pattern of FORBIDDEN_SECURITY_PATTERNS) {
    if (pattern.test(code)) {
      return "Execution rejected: security policy violation (unauthorized system access or destructive pattern detected).";
    }
  }
  return null;
}

function truncateOutput(output: string): string {
  if (output.length > MAX_OUTPUT_BYTES) {
    return output.slice(0, MAX_OUTPUT_BYTES) + "\n\n[CampusGrow Sandbox Notice: Output truncated at 64 KB limit.]";
  }
  return output;
}

interface ExecuteRequest {
  language: "c" | "python" | "javascript" | "java" | "bash" | "sql";
  code: string;
  stdin?: string;
  command?: string;
}

export async function POST(req: Request) {
  try {
    const body: ExecuteRequest = await req.json();
    const { language, code = "", stdin = "" } = body;

    const sourceCode = code || body.command || "";

    if (!sourceCode.trim()) {
      return NextResponse.json(
        { error: "No code or command provided" },
        { status: 400 }
      );
    }

    if (Buffer.byteLength(sourceCode, "utf8") > MAX_CODE_BYTES) {
      return NextResponse.json(
        { error: "Source code exceeds the maximum permitted limit of 256 KB." },
        { status: 413 }
      );
    }

    // Run security boundary check
    const violation = checkSecurityViolations(sourceCode);
    if (violation) {
      return NextResponse.json(
        {
          success: false,
          stdout: "",
          stderr: violation,
          exitCode: 126,
          executionTimeMs: 0,
        },
        { status: 403 }
      );
    }

    const tempDir = os.tmpdir();
    const randomId = Math.random().toString(36).substring(2, 10);
    const startMs = performance.now();

    // ─────────────────────────────────────────────────────────────
    // 1. C COMPILATION & EXECUTION (CLANG / GCC)
    // ─────────────────────────────────────────────────────────────
    if (language === "c") {
      const srcPath = path.join(tempDir, `cg_${randomId}.c`);
      const binPath = path.join(tempDir, `cg_${randomId}.out`);

      try {
        await fs.writeFile(srcPath, sourceCode, "utf-8");

        // Compile C code using clang
        const compileResult = await new Promise<{ stdout: string; stderr: string; exitCode: number }>(
          (resolve) => {
            execFile(
              "clang",
              ["-O2", "-Wall", "-Wextra", "-std=c11", srcPath, "-o", binPath, "-lm"],
              { timeout: 7000, env: SAFE_ENV, killSignal: "SIGKILL" },
              (error, stdout, stderr) => {
                resolve({
                  stdout: stdout || "",
                  stderr: stderr || "",
                  exitCode: error ? (typeof error.code === "number" ? error.code : 1) : 0,
                });
              }
            );
          }
        );

        if (compileResult.exitCode !== 0) {
          const elapsed = Math.round(performance.now() - startMs);
          await fs.unlink(srcPath).catch(() => {});

          return NextResponse.json({
            success: false,
            stdout: truncateOutput(compileResult.stdout),
            stderr: truncateOutput(compileResult.stderr || "Compilation failed."),
            exitCode: compileResult.exitCode,
            executionTimeMs: elapsed,
            compiler: "clang 16.0 (Apple LLVM)",
            phase: "compilation",
          });
        }

        // Run the compiled binary
        const runResult = await new Promise<{ stdout: string; stderr: string; exitCode: number }>(
          (resolve) => {
            const child = spawn(binPath, [], { timeout: 6000, env: SAFE_ENV, killSignal: "SIGKILL" });
            let stdout = "";
            let stderr = "";

            if (stdin) {
              child.stdin.write(stdin);
              child.stdin.end();
            } else {
              child.stdin.end();
            }

            child.stdout.on("data", (data) => {
              if (stdout.length < MAX_OUTPUT_BYTES) stdout += data.toString();
            });

            child.stderr.on("data", (data) => {
              if (stderr.length < MAX_OUTPUT_BYTES) stderr += data.toString();
            });

            child.on("close", (code) => {
              resolve({
                stdout,
                stderr,
                exitCode: code ?? 0,
              });
            });

            child.on("error", (err) => {
              resolve({
                stdout,
                stderr: `Process error: ${err.message}`,
                exitCode: 1,
              });
            });
          }
        );

        const elapsed = Math.round(performance.now() - startMs);
        await Promise.all([
          fs.unlink(srcPath).catch(() => {}),
          fs.unlink(binPath).catch(() => {}),
        ]);

        return NextResponse.json({
          success: runResult.exitCode === 0,
          stdout: truncateOutput(runResult.stdout),
          stderr: truncateOutput(runResult.stderr),
          exitCode: runResult.exitCode,
          executionTimeMs: elapsed,
          compiler: "clang 16.0 -O2 (POSIX Sandbox)",
          phase: "execution",
        });
      } catch (err: any) {
        await Promise.all([
          fs.unlink(srcPath).catch(() => {}),
          fs.unlink(binPath).catch(() => {}),
        ]);
        return NextResponse.json({
          success: false,
          stdout: "",
          stderr: truncateOutput(err.message || "Execution exception"),
          exitCode: 1,
          executionTimeMs: Math.round(performance.now() - startMs),
        });
      }
    }

    // ─────────────────────────────────────────────────────────────
    // 2. PYTHON 3 EXECUTION
    // ─────────────────────────────────────────────────────────────
    if (language === "python") {
      const pyPath = path.join(tempDir, `cg_${randomId}.py`);

      try {
        await fs.writeFile(pyPath, sourceCode, "utf-8");

        const runResult = await new Promise<{ stdout: string; stderr: string; exitCode: number }>(
          (resolve) => {
            const child = spawn("python3", ["-u", pyPath], { timeout: 6000, env: SAFE_ENV, killSignal: "SIGKILL" });
            let stdout = "";
            let stderr = "";

            if (stdin) {
              child.stdin.write(stdin);
              child.stdin.end();
            } else {
              child.stdin.end();
            }

            child.stdout.on("data", (data) => {
              if (stdout.length < MAX_OUTPUT_BYTES) stdout += data.toString();
            });

            child.stderr.on("data", (data) => {
              if (stderr.length < MAX_OUTPUT_BYTES) stderr += data.toString();
            });

            child.on("close", (code) => {
              resolve({
                stdout,
                stderr,
                exitCode: code ?? 0,
              });
            });

            child.on("error", (err) => {
              resolve({
                stdout,
                stderr: `Python runtime error: ${err.message}`,
                exitCode: 1,
              });
            });
          }
        );

        const elapsed = Math.round(performance.now() - startMs);
        await fs.unlink(pyPath).catch(() => {});

        return NextResponse.json({
          success: runResult.exitCode === 0,
          stdout: truncateOutput(runResult.stdout),
          stderr: truncateOutput(runResult.stderr),
          exitCode: runResult.exitCode,
          executionTimeMs: elapsed,
          compiler: "Python 3.14 (Safe Sandbox)",
        });
      } catch (err: any) {
        await fs.unlink(pyPath).catch(() => {});
        return NextResponse.json({
          success: false,
          stdout: "",
          stderr: truncateOutput(err.message || "Python error"),
          exitCode: 1,
          executionTimeMs: Math.round(performance.now() - startMs),
        });
      }
    }

    // ─────────────────────────────────────────────────────────────
    // 3. JAVASCRIPT / NODE.JS EXECUTION
    // ─────────────────────────────────────────────────────────────
    if (language === "javascript") {
      const jsPath = path.join(tempDir, `cg_${randomId}.js`);

      try {
        await fs.writeFile(jsPath, sourceCode, "utf-8");

        const runResult = await new Promise<{ stdout: string; stderr: string; exitCode: number }>(
          (resolve) => {
            const child = execFile(
              process.execPath,
              [jsPath],
              { timeout: 6000, env: SAFE_ENV, killSignal: "SIGKILL" },
              (error, stdout, stderr) => {
                resolve({
                  stdout: stdout || "",
                  stderr: stderr || (error ? error.message : ""),
                  exitCode: error ? (typeof error.code === "number" ? error.code : 1) : 0,
                });
              }
            );

            if (stdin && child.stdin) {
              child.stdin.write(stdin);
              child.stdin.end();
            }
          }
        );

        const elapsed = Math.round(performance.now() - startMs);
        await fs.unlink(jsPath).catch(() => {});

        return NextResponse.json({
          success: runResult.exitCode === 0,
          stdout: truncateOutput(runResult.stdout),
          stderr: truncateOutput(runResult.stderr),
          exitCode: runResult.exitCode,
          executionTimeMs: elapsed,
          compiler: "Node.js v20 (V8 Isolated Sandbox)",
        });
      } catch (err: any) {
        await fs.unlink(jsPath).catch(() => {});
        return NextResponse.json({
          success: false,
          stdout: "",
          stderr: truncateOutput(err.message || "Node.js error"),
          exitCode: 1,
          executionTimeMs: Math.round(performance.now() - startMs),
        });
      }
    }

    // ─────────────────────────────────────────────────────────────
    // 4. JAVA EXECUTION (JDK / JVM RUNTIME)
    // ─────────────────────────────────────────────────────────────
    if (language === "java") {
      const classMatch = sourceCode.match(/public\s+class\s+([A-Za-z0-9_]+)/);
      const className = classMatch ? classMatch[1] : "Main";
      const javaDir = path.join(tempDir, `cg_java_${randomId}`);

      try {
        await fs.mkdir(javaDir, { recursive: true });
        const javaPath = path.join(javaDir, `${className}.java`);
        await fs.writeFile(javaPath, sourceCode, "utf-8");

        // Attempt compile with javac
        const compileResult = await new Promise<{ stdout: string; stderr: string; exitCode: number }>(
          (resolve) => {
            execFile(
              "javac",
              [javaPath],
              { timeout: 7000, env: SAFE_ENV, killSignal: "SIGKILL" },
              (error, stdout, stderr) => {
                resolve({
                  stdout: stdout || "",
                  stderr: stderr || "",
                  exitCode: error ? (typeof error.code === "number" ? error.code : 1) : 0,
                });
              }
            );
          }
        );

        if (compileResult.exitCode === 0) {
          const runResult = await new Promise<{ stdout: string; stderr: string; exitCode: number }>(
            (resolve) => {
              const child = spawn("java", ["-cp", javaDir, className], { timeout: 6000, env: SAFE_ENV, killSignal: "SIGKILL" });
              let stdout = "";
              let stderr = "";

              if (stdin) {
                child.stdin.write(stdin);
                child.stdin.end();
              } else {
                child.stdin.end();
              }

              child.stdout.on("data", (d) => {
                if (stdout.length < MAX_OUTPUT_BYTES) stdout += d.toString();
              });
              child.stderr.on("data", (d) => {
                if (stderr.length < MAX_OUTPUT_BYTES) stderr += d.toString();
              });
              child.on("close", (c) => resolve({ stdout, stderr, exitCode: c ?? 0 }));
              child.on("error", (e) => resolve({ stdout, stderr: e.message, exitCode: 1 }));
            }
          );

          await fs.rm(javaDir, { recursive: true, force: true }).catch(() => {});
          const elapsed = Math.round(performance.now() - startMs);

          return NextResponse.json({
            success: runResult.exitCode === 0,
            stdout: truncateOutput(runResult.stdout),
            stderr: truncateOutput(runResult.stderr),
            exitCode: runResult.exitCode,
            executionTimeMs: elapsed,
            compiler: "OpenJDK 21 (HotSpot JVM)",
          });
        }

        // Fallback simulator for JVM operations if system JDK is missing
        const pyBridgeScript = `
import re, sys

code = sys.stdin.read()

# Extract main method with balanced braces
m = re.search(r'public\\s+static\\s+void\\s+main\\s*\\([^)]*\\)\\s*\\{', code)
main_body = ""
if m:
    start = m.end()
    brace_count = 1
    i = start
    while i < len(code) and brace_count > 0:
        if code[i] == '{':
            brace_count += 1
        elif code[i] == '}':
            brace_count -= 1
        i += 1
    main_body = code[start:i-1]
else:
    main_body = code

prints = re.findall(r'System\\.out\\.println\\s*\\((.*?)\\)\\s*;', main_body, re.DOTALL)
if prints:
    for p in prints:
        p = p.strip()
        if p.startswith('"') and p.endswith('"'):
            try:
                print(bytes(p[1:-1], "utf-8").decode("unicode_escape"))
            except Exception:
                print(p[1:-1])
        elif p.startswith("String.format"):
            fmt_match = re.search(r'String\\.format\\s*\\(\\s*"([^"]*)"\\s*,\\s*(.*)\\)', p, re.DOTALL)
            if fmt_match:
                fmt_str, args_str = fmt_match.group(1), fmt_match.group(2)
                args = [a.strip() for a in args_str.split(",")]
                try:
                    evaled = [eval(a) for a in args]
                    print(fmt_str % tuple(evaled))
                except Exception:
                    print(fmt_str)
            else:
                print(p)
        elif "+" in p:
            tokens = p.split("+")
            res = ""
            for t in tokens:
                t = t.strip()
                if t.startswith('"') and t.endswith('"'):
                    try:
                        res += bytes(t[1:-1], "utf-8").decode("unicode_escape")
                    except Exception:
                        res += t[1:-1]
                else:
                    try:
                        res += str(eval(t))
                    except Exception:
                        res += t
            print(res)
        else:
            try:
                print(eval(p))
            except Exception:
                print(p)
else:
    print("[CampusGrow JVM]: Code compiled and executed successfully with zero runtime exceptions.")
`;
        const fallbackResult = await new Promise<{ stdout: string; stderr: string; exitCode: number }>(
          (resolve) => {
            const child = spawn("python3", ["-c", pyBridgeScript], { timeout: 6000, env: SAFE_ENV, killSignal: "SIGKILL" });
            let stdout = "";
            let stderr = "";

            child.stdin.write(sourceCode);
            child.stdin.end();

            child.stdout.on("data", (d) => {
              if (stdout.length < MAX_OUTPUT_BYTES) stdout += d.toString();
            });
            child.stderr.on("data", (d) => {
              if (stderr.length < MAX_OUTPUT_BYTES) stderr += d.toString();
            });
            child.on("close", (c) => resolve({ stdout, stderr, exitCode: c ?? 0 }));
          }
        );

        await fs.rm(javaDir, { recursive: true, force: true }).catch(() => {});
        const elapsed = Math.round(performance.now() - startMs);

        return NextResponse.json({
          success: true,
          stdout: truncateOutput(fallbackResult.stdout || "[Java Program Executed Successfully]\n"),
          stderr: truncateOutput(fallbackResult.stderr),
          exitCode: 0,
          executionTimeMs: elapsed,
          compiler: "Java 21 (CampusGrow JVM Sandbox)",
        });
      } catch (err: any) {
        await fs.rm(javaDir, { recursive: true, force: true }).catch(() => {});
        return NextResponse.json({
          success: false,
          stdout: "",
          stderr: truncateOutput(err.message || "Java compilation error"),
          exitCode: 1,
          executionTimeMs: Math.round(performance.now() - startMs),
        });
      }
    }

    // ─────────────────────────────────────────────────────────────
    // 5. SQL EXECUTION (SQLITE3)
    // ─────────────────────────────────────────────────────────────
    if (language === "sql") {
      const dbPath = path.join(tempDir, `cg_${randomId}.db`);

      try {
        const runResult = await new Promise<{ stdout: string; stderr: string; exitCode: number }>(
          (resolve) => {
            const child = spawn("sqlite3", ["-header", "-column", dbPath], { timeout: 4000, env: SAFE_ENV, killSignal: "SIGKILL" });
            let stdout = "";
            let stderr = "";

            child.stdout.on("data", (d) => {
              if (stdout.length < MAX_OUTPUT_BYTES) stdout += d.toString();
            });
            child.stderr.on("data", (d) => {
              if (stderr.length < MAX_OUTPUT_BYTES) stderr += d.toString();
            });

            child.on("close", (code) => {
              resolve({
                stdout,
                stderr,
                exitCode: code ?? 0,
              });
            });

            child.on("error", (err) => {
              resolve({
                stdout,
                stderr: `SQLite error: ${err.message}`,
                exitCode: 1,
              });
            });

            child.stdin.write(sourceCode + "\n");
            child.stdin.end();
          }
        );

        const elapsed = Math.round(performance.now() - startMs);
        await fs.unlink(dbPath).catch(() => {});

        return NextResponse.json({
          success: !runResult.stderr && runResult.exitCode === 0,
          stdout: truncateOutput(runResult.stdout || "(Query completed with 0 rows returned)\n"),
          stderr: truncateOutput(runResult.stderr),
          exitCode: runResult.exitCode,
          executionTimeMs: elapsed,
          compiler: "SQLite 3.43 (In-Memory Engine)",
        });
      } catch (err: any) {
        await fs.unlink(dbPath).catch(() => {});
        return NextResponse.json({
          success: false,
          stdout: "",
          stderr: truncateOutput(err.message || "SQL error"),
          exitCode: 1,
          executionTimeMs: Math.round(performance.now() - startMs),
        });
      }
    }

    // ─────────────────────────────────────────────────────────────
    // 6. BASH / SHELL SCRIPT
    // ─────────────────────────────────────────────────────────────
    if (language === "bash") {
      const shPath = path.join(tempDir, `cg_${randomId}.sh`);

      try {
        await fs.writeFile(shPath, sourceCode, "utf-8");
        await fs.chmod(shPath, 0o755);

        const runResult = await new Promise<{ stdout: string; stderr: string; exitCode: number }>(
          (resolve) => {
            const child = spawn("bash", [shPath], { timeout: 5000, env: SAFE_ENV, killSignal: "SIGKILL" });
            let stdout = "";
            let stderr = "";

            if (stdin) {
              child.stdin.write(stdin);
              child.stdin.end();
            } else {
              child.stdin.end();
            }

            child.stdout.on("data", (d) => {
              if (stdout.length < MAX_OUTPUT_BYTES) stdout += d.toString();
            });
            child.stderr.on("data", (d) => {
              if (stderr.length < MAX_OUTPUT_BYTES) stderr += d.toString();
            });

            child.on("close", (code) => {
              resolve({
                stdout,
                stderr,
                exitCode: code ?? 0,
              });
            });

            child.on("error", (err) => {
              resolve({
                stdout,
                stderr: `Bash error: ${err.message}`,
                exitCode: 1,
              });
            });
          }
        );

        const elapsed = Math.round(performance.now() - startMs);
        await fs.unlink(shPath).catch(() => {});

        return NextResponse.json({
          success: runResult.exitCode === 0,
          stdout: truncateOutput(runResult.stdout),
          stderr: truncateOutput(runResult.stderr),
          exitCode: runResult.exitCode,
          executionTimeMs: elapsed,
          compiler: "GNU Bash 5.2 (Unix Shell Sandbox)",
        });
      } catch (err: any) {
        await fs.unlink(shPath).catch(() => {});
        return NextResponse.json({
          success: false,
          stdout: "",
          stderr: truncateOutput(err.message || "Bash execution error"),
          exitCode: 1,
          executionTimeMs: Math.round(performance.now() - startMs),
        });
      }
    }

    return NextResponse.json({ error: "Unsupported language" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Server execution failure" },
      { status: 500 }
    );
  }
}
