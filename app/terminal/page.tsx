"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import MobileNav from "@/components/MobileNav";
import AmbientBackground from "@/components/AmbientBackground";
export type LanguageKey = "c" | "java" | "python" | "javascript" | "sql" | "bash" | "json";

export type TerminalTheme = "dracula" | "onedark" | "monokai" | "hacker" | "cyberpunk";
export type ViewMode = "split" | "editor-only" | "terminal-only";
export type SidebarTab = "explorer" | "extensions" | "cheatsheet" | null;

interface ExtensionToolchain {
  id: string;
  name: string;
  publisher: string;
  version: string;
  icon: string;
  langKey: LanguageKey;
  description: string;
  features: string[];
  compiler: string;
  standards: string;
}

interface LanguageConfig {
  key: LanguageKey;
  name: string;
  ext: string;
  filename: string;
  icon: string;
  tag: string;
  compiler: string;
  extensionName: string;
  templates: {
    name: string;
    description: string;
    code: string;
  }[];
  cheatsheet: { title: string; desc: string; example: string }[];
}

const EXTENSIONS_TOOLCHAINS: ExtensionToolchain[] = [
  {
    id: "c-clang",
    name: "C/C++ IntelliSense & Clang Toolchain",
    publisher: "CampusGrow / LLVM",
    version: "v2.5.0",
    icon: "🇨",
    langKey: "c",
    description: "Native Clang 16 LLVM compiler with pointer address tracking, memory leak detection, and C11 standards.",
    features: ["Clang 16.0 -O2 Optimizer", "Address dereferencing inspection", "Strict -Wall -Wextra warnings", "POSIX libc runtime"],
    compiler: "clang -O2 -Wall -Wextra -std=c11 main.c -o ./program",
    standards: "ISO/IEC 9899:2011 (C11)",
  },
  {
    id: "java-jdk",
    name: "Extension Pack for Java (JDK 21)",
    publisher: "CampusGrow / OpenJDK",
    version: "v1.9.4",
    icon: "☕",
    langKey: "java",
    description: "Java 21 development kit with OOP class inspector, stream analytics, and placement algorithm sandbox.",
    features: ["Java 21 Language Spec", "OOP encapsulation & polymorphism", "Java Collections & Streams API", "Zero-config sandbox runtime"],
    compiler: "javac Main.java && java Main",
    standards: "JSR 396 (Java SE 21)",
  },
  {
    id: "python-pylance",
    name: "Python 3 & Pylance Suite",
    publisher: "CampusGrow / Python Core",
    version: "v2026.2",
    icon: "🐍",
    langKey: "python",
    description: "Python 3.14 native execution engine with comprehension inspection and algorithmic benchmarking.",
    features: ["Python 3.14 Native Runtime", "List & Dict comprehensions", "Generator pipelines & perf_counter", "Standard library batteries"],
    compiler: "python3 -u main.py",
    standards: "CPython 3.14 POSIX",
  },
  {
    id: "js-node",
    name: "Node.js & JavaScript Toolchain",
    publisher: "CampusGrow / OpenJS",
    version: "v3.2.0",
    icon: "⚡",
    langKey: "javascript",
    description: "Node.js v20 runtime powered by Chrome's V8 engine with asynchronous event loop and modern ES2024 features.",
    features: ["V8 JavaScript Engine", "Native Promises & Async/Await", "Array functional pipelines", "Process & Buffer utilities"],
    compiler: "node index.js",
    standards: "ECMA-262 (ES2024)",
  },
  {
    id: "sql-sqlite",
    name: "SQLite & Relational Database Studio",
    publisher: "CampusGrow / SQLite",
    version: "v1.4.0",
    icon: "🗄️",
    langKey: "sql",
    description: "Lightweight in-memory relational database engine with structured column outputs, joins, and aggregations.",
    features: ["SQLite 3.43 in-memory engine", "Column-aligned query output", "Foreign key constraints & indexes", "Aggregations & Group By"],
    compiler: "sqlite3 -header -column :memory:",
    standards: "ANSI SQL-92 / SQLite dialect",
  },
  {
    id: "bash-shell",
    name: "POSIX Bash & GNU Coreutils",
    publisher: "CampusGrow / FSF",
    version: "v5.2.0",
    icon: "🐚",
    langKey: "bash",
    description: "Interactive Unix shell environment with file manipulation, system statistics, and pipeline scripting.",
    features: ["POSIX Bourne-Again Shell", "Grep, Sed, AWK, Neofetch", "Process management & pipes", "Virtual POSIX file system"],
    compiler: "bash script.sh",
    standards: "IEEE Std 1003.1 (POSIX)",
  },
];

const LANGUAGES: Record<LanguageKey, LanguageConfig> = {
  c: {
    key: "c",
    name: "C (Clang 16 / C11)",
    ext: "c",
    filename: "main.c",
    icon: "🇨",
    tag: "Native Systems & Memory",
    compiler: "clang -O2 -Wall -Wextra -std=c11 main.c -o ./program",
    extensionName: "C/C++ Clang Toolchain v2.5",
    templates: [
      {
        name: "Dynamic Array & Bubble Sort",
        description: "In-place array sorting and iteration with pointer arithmetic",
        code: `#include <stdio.h>

void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

int main() {
    int data[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(data) / sizeof(data[0]);

    printf("Original Array:\\n  [ ");
    for (int i = 0; i < n; i++) printf("%d ", data[i]);
    printf("]\\n\\nSorting array in-place...\\n");

    bubbleSort(data, n);

    printf("Sorted Array:\\n  [ ");
    for (int i = 0; i < n; i++) printf("%d ", data[i]);
    printf("]\\n");

    return 0;
}`,
      },
      {
        name: "Pointers & Memory Address Inspection",
        description: "Inspect pointers, dereferencing, and memory addresses",
        code: `#include <stdio.h>

void modifyWithPointer(int *ptr) {
    printf("[Function] Pointer received address: %p\\n", (void*)ptr);
    printf("[Function] Dereferenced value:       %d\\n", *ptr);
    *ptr = *ptr * 2;
    printf("[Function] Value doubled via pointer!\\n");
}

int main() {
    printf("===========================================\\n");
    printf("   CAMPUSGROW C SYSTEMS RUNTIME ENGINE     \\n");
    printf("===========================================\\n\\n");
    
    int score = 42;
    int *scorePtr = &score;
    
    printf("Initial State:\\n");
    printf("  Variable 'score':          %d\\n", score);
    printf("  Memory Address (&score):   %p\\n", (void*)&score);
    printf("  Pointer Value (scorePtr):  %p\\n", (void*)scorePtr);
    printf("  Dereferenced (*scorePtr):  %d\\n\\n", *scorePtr);
    
    printf("Calling modifyWithPointer(&score)...\\n");
    modifyWithPointer(&score);
    
    printf("\\nFinal State:\\n");
    printf("  Modified 'score' in main:  %d\\n", score);
    printf("  Memory integrity check:    PASSED ✓\\n");
    
    return 0;
}`,
      },
      {
        name: "Interactive Stdin User Input",
        description: "Reads user input dynamically using scanf()",
        code: `#include <stdio.h>

int main() {
    int num1, num2;
    printf("Enter two numbers (via '⌨️ Stdin' drawer):\\n");
    
    if (scanf("%d %d", &num1, &num2) == 2) {
        printf("Received Numbers: %d and %d\\n", num1, num2);
        printf("Sum:              %d\\n", num1 + num2);
        printf("Product:          %d\\n", num1 * num2);
    } else {
        printf("Notice: Open the '⌨️ Stdin' drawer and enter two numbers like: 15 27\\n");
    }
    
    return 0;
}`,
      },
    ],
    cheatsheet: [
      { title: "Pointers & Address", desc: "Access variable address and dereference", example: "int x = 10; int *p = &x; printf(\"%d\", *p);" },
      { title: "Heap Allocation", desc: "Allocate dynamic memory from heap", example: "int *arr = malloc(10 * sizeof(int));\\nfree(arr);" },
      { title: "Structures", desc: "Group heterogeneous records", example: "typedef struct { int id; char name[20]; } User;" },
    ],
  },
  java: {
    key: "java",
    name: "Java (JDK 21 / JVM)",
    ext: "java",
    filename: "Main.java",
    icon: "☕",
    tag: "OOP & Placement Algorithms",
    compiler: "javac Main.java && java Main",
    extensionName: "Extension Pack for Java (JDK 21)",
    templates: [
      {
        name: "Binary Search & Divide and Conquer",
        description: "O(log N) search algorithm over a sorted dataset",
        code: `public class Main {
    public static int binarySearch(int[] arr, int target) {
        int left = 0, right = arr.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (arr[mid] == target) return mid;
            if (arr[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] sortedData = {11, 22, 35, 48, 59, 72, 88, 95, 104};
        int target = 72;

        System.out.println("Searching for: " + target);
        int index = binarySearch(sortedData, target);

        if (index != -1) {
            System.out.println("Element found at index: " + index);
            System.out.println("Verification: sortedData[" + index + "] == " + sortedData[index]);
        } else {
            System.out.println("Element not found in dataset.");
        }
    }
}`,
      },
      {
        name: "OOP Student Records & Stream Processing",
        description: "Class encapsulation, objects, and statistical computation",
        code: `import java.util.*;

public class Main {
    static class Student {
        String name;
        String branch;
        double gpa;

        Student(String name, String branch, double gpa) {
            this.name = name;
            this.branch = branch;
            this.gpa = gpa;
        }

        void display() {
            System.out.println(String.format("| %-14s | %-5s | GPA: %.2f / 10.0 |", name, branch, gpa));
        }
    }

    public static void main(String[] args) {
        System.out.println("=========================================");
        System.out.println("   CAMPUSGROW JAVA 21 RUNTIME (JVM)      ");
        System.out.println("=========================================\\n");

        List<Student> roster = new ArrayList<>();
        roster.add(new Student("Ananya Iyer", "CSE", 9.85));
        roster.add(new Student("Aarav Sharma", "CSE", 9.40));
        roster.add(new Student("Diya Patel", "AIML", 9.15));

        for (Student s : roster) {
            s.display();
        }

        double avgGpa = roster.stream().mapToDouble(s -> s.gpa).average().orElse(0.0);
        System.out.println("-----------------------------------------");
        System.out.println("Class Average GPA: " + String.format("%.2f", avgGpa));
    }
}`,
      },
    ],
    cheatsheet: [
      { title: "Class & Constructor", desc: "Define OOP blueprint", example: "class Car { String model; Car(String m) { this.model = m; } }" },
      { title: "ArrayList", desc: "Dynamic generic collection", example: "List<String> list = new ArrayList<>();\\nlist.add(\"Java\");" },
    ],
  },
  python: {
    key: "python",
    name: "Python 3.14 (Native)",
    ext: "py",
    filename: "main.py",
    icon: "🐍",
    tag: "High-Level & Data Analytics",
    compiler: "python3 -u main.py",
    extensionName: "Python 3 & Pylance Suite",
    templates: [
      {
        name: "Data Analytics & Comprehensions",
        description: "Process student records, compute statistics, and format tabular data",
        code: `# CampusGrow Python 3.14 Analytics Engine
students = [
    {"name": "Ananya Iyer", "branch": "CSE", "score": 96},
    {"name": "Aarav Sharma", "branch": "CSE", "score": 94},
    {"name": "Diya Patel", "branch": "AIML", "score": 91},
    {"name": "Kabir Das", "branch": "IT", "score": 88},
]

print("=== CAMPUS PERFORMANCE REPORT ===")
for s in students:
    grade = "A+" if s["score"] >= 90 else "A" if s["score"] >= 80 else "B"
    print(f"| {s['name']:<14} | {s['branch']:<5} | Score: {s['score']}% | Grade: {grade} |")

avg_score = sum(s["score"] for s in students) / len(students)
print("-" * 45)
print(f"Class Average: {avg_score:.2f}%")
`,
      },
      {
        name: "Fibonacci Generator & Benchmarking",
        description: "Generator yielding Fibonacci numbers with microsecond timing",
        code: `import time

def fibonacci_gen(limit):
    a, b = 0, 1
    count = 0
    while count < limit:
        yield a
        a, b = b, a + b
        count += 1

start_time = time.perf_counter()
fib_sequence = list(fibonacci_gen(15))
elapsed = (time.perf_counter() - start_time) * 1000

print("Fibonacci Sequence (first 15):", fib_sequence)
print(f"Computed in {elapsed:.3f} ms")
`,
      },
    ],
    cheatsheet: [
      { title: "List Comprehension", desc: "Filter and transform", example: "[x * 2 for x in nums if x > 0]" },
      { title: "Dictionary Methods", desc: "Safe key access", example: "user = {'name': 'Rahim'}; name = user.get('name', 'Guest')" },
    ],
  },
  javascript: {
    key: "javascript",
    name: "Node.js (v20 / V8)",
    ext: "js",
    filename: "index.js",
    icon: "⚡",
    tag: "Event-Driven & Async I/O",
    compiler: "node index.js",
    extensionName: "Node.js & JavaScript Toolchain",
    templates: [
      {
        name: "Async Task Queue & Promises",
        description: "Concurrent tasks settled with Promise.all",
        code: `console.log("=== Node.js Async Task Queue ===");

async function worker(id, ms) {
    console.log(\`Task \${id} started (\${ms}ms)\`);
    await new Promise(res => setTimeout(res, ms));
    console.log(\`Task \${id} finished ✓\`);
    return { id, time: ms };
}

Promise.all([worker(1, 100), worker(2, 50), worker(3, 120)]).then(results => {
    console.log("\\nAll workers completed:", results);
});
`,
      },
    ],
    cheatsheet: [
      { title: "Async/Await", desc: "Handle asynchronous promises", example: "const res = await fetch(url);\\nconst data = await res.json();" },
      { title: "Destructuring", desc: "Extract properties", example: "const { name, age } = user;" },
    ],
  },
  sql: {
    key: "sql",
    name: "SQLite (v3.43 Relational)",
    ext: "sql",
    filename: "query.sql",
    icon: "🗄️",
    tag: "Relational Queries & Tables",
    compiler: "sqlite3 -header -column :memory:",
    extensionName: "SQLite Database Studio",
    templates: [
      {
        name: "Students & Placement Schema",
        description: "Schema creation, sample rows, and analytical group by",
        code: `CREATE TABLE students (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    branch TEXT NOT NULL,
    gpa REAL NOT NULL
);

INSERT INTO students VALUES 
(1, 'Aarav Sharma', 'CSE', 9.4),
(2, 'Diya Patel', 'AIML', 9.1),
(3, 'Rohan Verma', 'CSE', 8.7),
(4, 'Ananya Iyer', 'ECE', 8.9);

SELECT branch, COUNT(*) AS count, ROUND(AVG(gpa), 2) AS avg_gpa
FROM students
GROUP BY branch
ORDER BY avg_gpa DESC;
`,
      },
    ],
    cheatsheet: [
      { title: "SELECT with WHERE", desc: "Filter rows", example: "SELECT * FROM users WHERE active = 1;" },
      { title: "JOIN", desc: "Relate records", example: "SELECT u.name, o.total FROM users u JOIN orders o ON u.id = o.user_id;" },
    ],
  },
  bash: {
    key: "bash",
    name: "Bash (Shell Script)",
    ext: "sh",
    filename: "script.sh",
    icon: "🐚",
    tag: "POSIX Unix Environment",
    compiler: "bash script.sh",
    extensionName: "POSIX Bash & GNU Coreutils",
    templates: [
      {
        name: "DevOps System Inspection",
        description: "Inspect terminal directories and system statistics",
        code: `#!/usr/bin/env bash
echo "=== CAMPUSGROW TERMINAL ENVIRONMENT ==="
echo "Date:   $(date)"
echo "Kernel: $(uname -s -r)"
echo "User:   $USER"
echo ""
echo "Installed Compilers:"
which clang gcc python3 node sqlite3 2>/dev/null
echo ""
echo "Session Files:"
ls -lah
`,
      },
    ],
    cheatsheet: [
      { title: "Variables", desc: "Define and interpolate", example: "NAME=\"CampusGrow\"\\necho \"Welcome $NAME\"" },
      { title: "Pipes", desc: "Chain output to input", example: "cat file.txt | grep \"error\" | wc -l" },
    ],
  },
  json: {
    key: "json",
    name: "JSON (Config & Schemas)",
    ext: "json",
    filename: "config.json",
    icon: "📄",
    tag: "Structured Data Exchange",
    compiler: "node -e 'console.log(JSON.parse(fs.readFileSync(0,\"utf8\")))'",
    extensionName: "JSON Tools & Validation",
    templates: [
      {
        name: "Next.js Deployment Config",
        description: "Structured deployment pipeline configuration",
        code: `{
  "application": "CampusGrow",
  "version": "2.6.0",
  "environment": "production",
  "features": {
    "nativeClang": true,
    "jdk21": true,
    "python3": true,
    "sqlite": true
  }
}
`,
      },
    ],
    cheatsheet: [
      { title: "Key-Value", desc: "Standard format", example: "{\\n  \"status\": 200,\\n  \"ready\": true\\n}" },
    ],
  },
};

interface PlaygroundFile {
  name: string;
  lang: LanguageKey;
  description: string;
}

const PLAYGROUND_FILES: PlaygroundFile[] = [
  { name: "main.c", lang: "c", description: "Clang 16 C11 Systems" },
  { name: "Solution.java", lang: "java", description: "Java 21 JVM Algorithms" },
  { name: "script.py", lang: "python", description: "Python 3.14 Script & Data" },
  { name: "index.js", lang: "javascript", description: "Node.js JavaScript Runtime" },
  { name: "queries.sql", lang: "sql", description: "SQLite 3 Relational SQL" },
  { name: "script.sh", lang: "bash", description: "POSIX Unix Bash Shell" },
  { name: "config.json", lang: "json", description: "JSON Config & Schema" },
];

export default function TerminalPage() {
  // Theme & Layout state
  const [theme, setTheme] = useState<TerminalTheme>("onedark");
  const [viewMode, setViewMode] = useState<ViewMode>("split");
  const [activeSidebarTab, setActiveSidebarTab] = useState<SidebarTab>("explorer");
  const [showStdin, setShowStdin] = useState(false);
  const [stdinInput, setStdinInput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [savedFeedback, setSavedFeedback] = useState(false);
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });

  // Standalone Playground Session State
  const [selectedLang, setSelectedLang] = useState<LanguageKey>("c");
  const [activeFileName, setActiveFileName] = useState<string>("main.c");
  const [code, setCode] = useState<string>("");
  const [isDirty, setIsDirty] = useState(false);

  // Shell CLI & Output State
  const [output, setOutput] = useState<string[]>([
    "CampusGrow Studio Developer Terminal v2.6.0",
    "Compilers Online: Clang 16.0 (C) · Java 21 · Python 3.14 · Node 20 · SQLite 3",
    "Press '▶ Run Code' (Ctrl+Enter) or type 'run', 'ls', 'neofetch', 'help'",
    "",
  ]);
  const [cliInput, setCliInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [execStats, setExecStats] = useState<{
    timeMs: number;
    exitCode: number;
    compiler: string;
  } | null>(null);

  const editorRef = useRef<HTMLTextAreaElement>(null);
  const lineGutterRef = useRef<HTMLDivElement>(null);
  const terminalBottomRef = useRef<HTMLDivElement>(null);
  const cliInputRef = useRef<HTMLInputElement>(null);

  const langConfig = LANGUAGES[selectedLang] || LANGUAGES.c;

  // Initialize terminal code on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check session preload (from AI Mentor)
    const preloadCode = sessionStorage.getItem("terminal_preload_code");
    const preloadLang = (sessionStorage.getItem("terminal_preload_lang") as LanguageKey) || null;
    const preloadTitle = sessionStorage.getItem("terminal_preload_title") || "AI Mentor Practice Snippet";

    if (preloadCode) {
      sessionStorage.removeItem("terminal_preload_code");
      sessionStorage.removeItem("terminal_preload_lang");
      sessionStorage.removeItem("terminal_preload_title");

      const targetLang = preloadLang && LANGUAGES[preloadLang] ? preloadLang : "c";
      setSelectedLang(targetLang);
      setActiveFileName(LANGUAGES[targetLang].filename);
      setCode(preloadCode);
      setIsDirty(false);
      setOutput((prev) => [
        ...prev,
        `[Loaded from AI Mentor]: '${preloadTitle}' ready to compile.`,
      ]);
      return;
    }

    // Check query params ?lang=...
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get("lang") as LanguageKey;
    const initialLang: LanguageKey = urlLang && LANGUAGES[urlLang] ? urlLang : "c";
    setSelectedLang(initialLang);
    setActiveFileName(LANGUAGES[initialLang].filename);

    const saved = localStorage.getItem(`campusgrow_terminal_${initialLang}`);
    setCode(saved || LANGUAGES[initialLang].templates[0].code);
    setIsDirty(false);
  }, []);

  // Synchronize Line Gutter scroll with Textarea scroll
  const handleEditorScroll = () => {
    if (editorRef.current && lineGutterRef.current) {
      lineGutterRef.current.scrollTop = editorRef.current.scrollTop;
    }
  };

  // Auto-scroll terminal
  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [output]);

  // Switch language in playground
  const handleSelectLang = (newLang: LanguageKey) => {
    setSelectedLang(newLang);
    const defaultFile = LANGUAGES[newLang].filename;
    setActiveFileName(defaultFile);
    const saved = typeof window !== "undefined" ? localStorage.getItem(`campusgrow_terminal_${newLang}`) : null;
    setCode(saved || LANGUAGES[newLang].templates[0].code);
    setIsDirty(false);
  };

  // Switch file in playground explorer
  const handleSelectFile = (file: PlaygroundFile) => {
    setSelectedLang(file.lang);
    setActiveFileName(file.name);
    const saved = typeof window !== "undefined" ? localStorage.getItem(`campusgrow_terminal_${file.lang}`) : null;
    setCode(saved || LANGUAGES[file.lang].templates[0].code);
    setIsDirty(false);
  };

  // Save current code to localStorage cache
  const handleSaveCode = useCallback(() => {
    try {
      localStorage.setItem(`campusgrow_terminal_${selectedLang}`, code);
    } catch {
      // Ignore
    }
    setIsDirty(false);
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2000);
  }, [selectedLang, code]);

  // Keyboard shortcut Ctrl+S to save, Ctrl+Enter to run
  const handleEditorKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "s") {
      e.preventDefault();
      handleSaveCode();
    } else if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      handleRun();
    } else if (e.key === "Tab") {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const updated = code.substring(0, start) + "    " + code.substring(end);
      setCode(updated);
      setIsDirty(true);
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.selectionStart = editorRef.current.selectionEnd = start + 4;
        }
      }, 0);
    }
  };


  // Cursor tracking
  const handleCursorMove = () => {
    if (!editorRef.current) return;
    const pos = editorRef.current.selectionStart;
    const lines = code.substring(0, pos).split("\n");
    setCursorPos({
      line: lines.length,
      col: lines[lines.length - 1].length + 1,
    });
  };

  // Load a template into the active editor
  const handleLoadTemplate = (index: number) => {
    const template = langConfig.templates[index];
    if (template) {
      setCode(template.code);
      setIsDirty(true);
      setOutput((prev) => [...prev, `[Template Loaded]: ${template.name}`]);
    }
  };

  // Run code against backend execution API
  const handleRun = async () => {
    if (isRunning) return;
    setIsRunning(true);

    setOutput((prev) => [
      ...prev,
      `campusgrow@studio:~$ ${langConfig.compiler}`,
      `[Compiling & Executing ${activeFileName}...]`,
    ]);

    try {
      const res = await fetch("/api/terminal/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: selectedLang,
          code: code,
          stdin: stdinInput,
        }),
      });

      const data = await res.json();

      setExecStats({
        timeMs: data.executionTimeMs || 0,
        exitCode: data.exitCode ?? (data.success ? 0 : 1),
        compiler: data.compiler || langConfig.name,
      });

      const newLogs: string[] = [];
      if (data.stdout) {
        newLogs.push(...data.stdout.trimEnd().split("\n"));
      }
      if (data.stderr) {
        newLogs.push(...data.stderr.trimEnd().split("\n"));
      }
      if (!data.stdout && !data.stderr) {
        newLogs.push(`[Process finished with exit code ${data.exitCode}]`);
      }

      setOutput((prev) => [...prev, ...newLogs, ""]);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setOutput((prev) => [
        ...prev,
        `Execution Error: ${message}`,
        `[Terminated with exit code 1]`,
        "",
      ]);
      setExecStats({
        timeMs: 0,
        exitCode: 1,
        compiler: langConfig.name,
      });
    } finally {
      setIsRunning(false);
    }
  };

  // Interactive Terminal Shell Commands
  const handleCliSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const command = cliInput.trim();
    if (!command) return;

    setCmdHistory((prev) => [...prev, command]);
    setHistoryIndex(-1);
    setCliInput("");

    setOutput((prev) => [...prev, `campusgrow@studio:~$ ${command}`]);

    const parts = command.split(" ").filter(Boolean);
    const cmd = parts[0]?.toLowerCase();
    const args = parts.slice(1);

    switch (cmd) {
      case "clear":
      case "cls":
        setOutput([]);
        setExecStats(null);
        return;

      case "help":
        setOutput((prev) => [
          ...prev,
          "CampusGrow Developer Terminal - Available Commands:",
          "  • run              - Compile & execute active code buffer",
          "  • ls / files       - List available session files",
          "  • cat <file>       - Print file contents to console",
          "  • save             - Save active buffer to local cache (Ctrl+S)",
          "  • reset            - Reset active file to default language template",
          "  • neofetch         - Display environment specs & ASCII art",
          "  • whoami           - Print active developer user",
          "  • pwd              - Print current working directory",
          "  • clear / cls      - Clear terminal screen (Ctrl+L)",
        ]);
        return;

      case "run":
        handleRun();
        return;

      case "files":
      case "ls": {
        const isLong = args.includes("-la") || args.includes("-l");
        if (isLong) {
          const lines = [
            `total ${PLAYGROUND_FILES.length}`,
            "drwxr-xr-x  2 student  staff   64B Oct 24 10:00 .",
            "drwxr-xr-x  3 student  staff   96B Oct 24 10:00 ..",
            ...PLAYGROUND_FILES.map(
              (f) => `-rw-r--r--  1 student  staff  ${(f.name === activeFileName ? code.length : 256).toString().padStart(4, " ")}B Oct 24 10:00 ${f.name}`
            ),
          ];
          setOutput((prev) => [...prev, ...lines]);
        } else {
          setOutput((prev) => [...prev, PLAYGROUND_FILES.map((f) => f.name).join("   ")]);
        }
        return;
      }

      case "save":
        handleSaveCode();
        setOutput((prev) => [...prev, `✓ Saved '${activeFileName}' buffer to cache`]);
        return;

      case "reset":
        setCode(LANGUAGES[selectedLang].templates[0].code);
        setIsDirty(false);
        setOutput((prev) => [...prev, `✓ Reset '${activeFileName}' to default template`]);
        return;

      case "pwd":
        setOutput((prev) => [...prev, "/home/student/terminal"]);
        return;

      case "whoami":
        setOutput((prev) => [...prev, "student (developer)"]);
        return;

      case "cat": {
        const target = args[0];
        if (!target) {
          setOutput((prev) => [...prev, "cat: missing file operand. Usage: cat <file>"]);
          return;
        }
        if (target === activeFileName) {
          setOutput((prev) => [...prev, ...code.split("\n")]);
        } else {
          const found = PLAYGROUND_FILES.find((f) => f.name === target);
          if (found) {
            const saved = typeof window !== "undefined" ? localStorage.getItem(`campusgrow_terminal_${found.lang}`) : null;
            const content = saved || LANGUAGES[found.lang].templates[0].code;
            setOutput((prev) => [...prev, ...content.split("\n")]);
          } else {
            setOutput((prev) => [...prev, `cat: ${target}: No such file in session`]);
          }
        }
        return;
      }

      case "neofetch":
        setOutput((prev) => [
          ...prev,
          "  ██████╗  █████╗  ███╗   ███╗██████╗ ██╗   ██╗███████╗   student@campusgrow-terminal",
          " ██╔════╝ ██╔══██╗ ████╗ ████║██╔══██╗██║   ██║██╔════╝   ---------------------------",
          " ██║      ███████║ ██╔████╔██║██████╔╝██║   ██║███████╗   OS: Linux / POSIX Virtual Environment",
          " ██║      ██╔══██║ ██║╚██╔╝██║██╔═══╝ ██║   ██║╚════██║   Compilers: Clang 16 · Java 21 · Python 3.14 · Node 20 · SQLite 3",
          " ╚██████╗ ██║  ██║ ██║ ╚═╝ ██║██║     ╚██████╔╝███████║   Active File: " + activeFileName,
          "  ╚═════╝ ╚═╝  ╚═╝ ╚═╝     ╚═╝╚═╝      ╚═════╝ ╚══════╝   Shell: bash 5.2.0 (POSIX GNU)",
        ]);
        return;

      case "git":
        if (args[0] === "status") {
          setOutput((prev) => [
            ...prev,
            "On branch main",
            "Your branch is up to date with 'origin/main'.",
            "",
            isDirty ? "Changes not staged for commit:" : "nothing to commit, working tree clean",
            isDirty ? `  modified:   ${activeFileName}` : "",
          ]);
        } else {
          setOutput((prev) => [...prev, "git: 'status', 'commit', 'push' supported. Try 'git status'."]);
        }
        return;

      default:
        setOutput((prev) => [
          ...prev,
          `bash: command not found: '${command}'. Type 'help' for available commands.`,
        ]);
        break;
    }
  };

  const handleCliKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIndex = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setCliInput(cmdHistory[nextIndex] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= cmdHistory.length) {
        setHistoryIndex(-1);
        setCliInput("");
      } else {
        setHistoryIndex(nextIndex);
        setCliInput(cmdHistory[nextIndex]);
      }
    }
  };

  const lineCount = useMemo(() => code.split("\n").length, [code]);


  // Theme palettes
  const themeClasses: Record<TerminalTheme, { bg: string; editorBg: string; text: string; gutter: string; activeLine: string }> = {
    onedark: {
      bg: "bg-[#181a1f]",
      editorBg: "bg-[#1e2227]",
      text: "text-slate-100",
      gutter: "bg-[#1b1d23] text-slate-500 border-slate-800",
      activeLine: "text-cyan-400 font-bold",
    },
    dracula: {
      bg: "bg-[#181a24]",
      editorBg: "bg-[#21222c]",
      text: "text-purple-100",
      gutter: "bg-[#1d1e27] text-purple-400/50 border-purple-500/20",
      activeLine: "text-pink-400 font-bold",
    },
    monokai: {
      bg: "bg-[#191919]",
      editorBg: "bg-[#272822]",
      text: "text-amber-100",
      gutter: "bg-[#1e1f1c] text-amber-500/50 border-amber-500/20",
      activeLine: "text-yellow-400 font-bold",
    },
    hacker: {
      bg: "bg-[#060a0f]",
      editorBg: "bg-[#0c1219]",
      text: "text-emerald-300",
      gutter: "bg-[#080d14] text-emerald-600/70 border-emerald-500/20",
      activeLine: "text-emerald-400 font-bold",
    },
    cyberpunk: {
      bg: "bg-[#0d0221]",
      editorBg: "bg-[#170836]",
      text: "text-yellow-200",
      gutter: "bg-[#12052b] text-cyan-400/50 border-cyan-500/20",
      activeLine: "text-cyan-300 font-bold",
    },
  };

  const curTheme = themeClasses[theme];

  return (
    <div className={`relative flex flex-col h-full w-full ${curTheme.bg} text-slate-100 font-sans overflow-hidden select-none`}>
      <AmbientBackground intensity="terminal" />
      {/* ── UNIFIED SLIM TOP NAVBAR (VS Code / Studio Style - 46px height) ── */}
      <header className="h-12 bg-slate-950 border-b border-slate-800 px-3 flex items-center justify-between gap-3 shrink-0 z-20">
        {/* Left: Studio Brand & Active Project Breadcrumb */}
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-slate-900 transition shrink-0 group"
            title="Go to Dashboard"
          >
            <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-lg overflow-hidden border border-emerald-500/40 bg-emerald-500/20 shadow-xs">
              <Image
                src="/campusgrow-icon.png"
                alt="CampusGrow"
                fill
                className="object-cover"
                priority
              />
            </span>
            <span className="hidden md:inline font-black text-xs tracking-tight text-white group-hover:text-emerald-400 transition">
              Studio
            </span>
          </Link>

          <span className="text-slate-700 hidden sm:inline">/</span>

          {/* File Breadcrumb */}
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400 font-semibold truncate max-w-[200px] sm:max-w-[280px]">
              <span>📄</span>
              <span className="truncate">{activeFileName}</span>
            </div>

            {/* Saved indicator */}
            <span
              className={`text-[10px] font-mono px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0 ${
                isDirty
                  ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                  : "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${isDirty ? "bg-amber-400" : "bg-emerald-400"}`} />
              <span className="hidden sm:inline">{isDirty ? "Unsaved" : savedFeedback ? "Saved ✓" : "Saved"}</span>
            </span>
          </div>
        </div>

        {/* Center: Language & Quick Template Dropdown */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          {/* Language Selector */}
          <div className="relative">
            <select
              value={selectedLang}
              onChange={(e) => handleSelectLang(e.target.value as LanguageKey)}
              aria-label="Active Programming Language"
              className="bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-lg pl-2.5 pr-7 py-1.5 focus:outline-none focus:border-emerald-500 cursor-pointer font-medium appearance-none"
            >
              <option value="c">🇨 C (Clang 16 - C11)</option>
              <option value="java">☕ Java (JDK 21 / JVM)</option>
              <option value="python">🐍 Python 3.14 (Native)</option>
              <option value="javascript">⚡ JavaScript (Node.js)</option>
              <option value="sql">🗄️ SQLite (Relational SQL)</option>
              <option value="bash">🐚 Bash (POSIX Shell)</option>
              <option value="json">📄 JSON (Config / Schema)</option>
            </select>
            <span className="absolute right-2 top-2 text-[10px] text-slate-500 pointer-events-none">▾</span>
          </div>

          {/* Quick Template Selector */}
          <div className="relative">
            <select
              onChange={(e) => handleLoadTemplate(Number(e.target.value))}
              aria-label="Load Code Template"
              className="bg-slate-900 border border-slate-800 text-slate-300 text-xs rounded-lg pl-2.5 pr-7 py-1.5 focus:outline-none focus:border-emerald-500 cursor-pointer appearance-none max-w-[180px] truncate"
            >
              <option value="" disabled selected>
                Templates ({langConfig.templates.length})
              </option>
              {langConfig.templates.map((tmpl, idx) => (
                <option key={tmpl.name} value={idx}>
                  {tmpl.name}
                </option>
              ))}
            </select>
            <span className="absolute right-2 top-2 text-[10px] text-slate-500 pointer-events-none">▾</span>
          </div>
        </div>

        {/* Right Action Controls: Save, Run CTA */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Save Code Button */}
          <button
            onClick={handleSaveCode}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer ${
              isDirty
                ? "bg-slate-800 text-white border-slate-700 hover:bg-slate-700 shadow-xs"
                : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
            }`}
            title="Save code buffer to local cache (Ctrl+S)"
          >
            <span>💾</span>
            <span>{savedFeedback ? "Saved!" : "Save"}</span>
          </button>

          {/* Primary Run Code CTA */}
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-lg text-xs font-black bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 shadow-md shadow-emerald-500/20 transition cursor-pointer disabled:opacity-50"
          >
            {isRunning ? (
              <>
                <svg className="animate-spin h-3.5 w-3.5 text-slate-950" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <span>Compiling...</span>
              </>
            ) : (
              <>
                <span>▶ Run</span>
                <span className="hidden sm:inline text-[10px] opacity-75 font-mono">(Ctrl+↵)</span>
              </>
            )}
          </button>

          {/* View Mode Toggle */}
          <div className="hidden md:flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs">
            <button
              onClick={() => setViewMode("split")}
              className={`px-2 py-1 rounded text-[11px] font-bold transition ${
                viewMode === "split" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"
              }`}
              title="Split View"
            >
              Split
            </button>
            <button
              onClick={() => setViewMode("editor-only")}
              className={`px-2 py-1 rounded text-[11px] font-bold transition ${
                viewMode === "editor-only" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"
              }`}
              title="Editor Only"
            >
              Code
            </button>
            <button
              onClick={() => setViewMode("terminal-only")}
              className={`px-2 py-1 rounded text-[11px] font-bold transition ${
                viewMode === "terminal-only" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"
              }`}
              title="Terminal Only"
            >
              Console
            </button>
          </div>

          {/* Theme Selector */}
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as TerminalTheme)}
            aria-label="Editor Theme"
            className="hidden lg:block bg-slate-900 border border-slate-800 text-slate-300 text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:border-emerald-500 cursor-pointer"
            title="Theme Palette"
          >
            <option value="onedark">🔵 One Dark</option>
            <option value="dracula">🟣 Dracula</option>
            <option value="monokai">🟡 Monokai</option>
            <option value="hacker">🟢 Hacker</option>
            <option value="cyberpunk">⚡ Cyberpunk</option>
          </select>

          <MobileNav breakpoint="lg" />
        </div>
      </header>

      {/* ── IDE BODY: ACTIVITY BAR + COLLAPSIBLE SIDEBAR + EDITOR & TERMINAL ── */}
      <div className="flex-1 flex min-h-0 overflow-hidden relative">
        {/* ── 1. LEFT ACTIVITY BAR (Slim Icon Strip - 48px) ── */}
        <aside className="w-12 bg-slate-950 border-r border-slate-800/80 flex flex-col items-center justify-between py-2 shrink-0 z-10">
          <div className="flex flex-col items-center gap-1.5 w-full">

            {/* Files Explorer */}
            <button
              onClick={() => setActiveSidebarTab(activeSidebarTab === "explorer" ? null : "explorer")}
              className={`h-9 w-9 rounded-lg flex items-center justify-center text-sm transition cursor-pointer ${
                activeSidebarTab === "explorer"
                  ? "bg-slate-800 text-emerald-400 shadow-xs border border-emerald-500/40"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
              title="File Explorer"
            >
              <span>📁</span>
            </button>

            {/* Curated Toolchains & Extensions */}
            <button
              onClick={() => setActiveSidebarTab(activeSidebarTab === "extensions" ? null : "extensions")}
              className={`h-9 w-9 rounded-lg flex items-center justify-center text-sm transition cursor-pointer ${
                activeSidebarTab === "extensions"
                  ? "bg-slate-800 text-purple-400 shadow-xs border border-purple-500/40"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
              title="Native Compilers & Toolchains (6 Installed)"
            >
              <span>🧩</span>
            </button>

            {/* Language Cheatsheets */}
            <button
              onClick={() => setActiveSidebarTab(activeSidebarTab === "cheatsheet" ? null : "cheatsheet")}
              className={`h-9 w-9 rounded-lg flex items-center justify-center text-sm transition cursor-pointer ${
                activeSidebarTab === "cheatsheet"
                  ? "bg-slate-800 text-amber-400 shadow-xs border border-amber-500/40"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
              title="Syntax Quick Reference"
            >
              <span>💡</span>
            </button>

            {/* Stdin Drawer Toggle */}
            <button
              onClick={() => setShowStdin(!showStdin)}
              className={`h-9 w-9 rounded-lg flex items-center justify-center text-sm transition cursor-pointer ${
                showStdin
                  ? "bg-cyan-950 text-cyan-300 border border-cyan-500/40"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
              title="Toggle Standard Input (stdin)"
            >
              <span>⌨️</span>
            </button>
          </div>

          {/* Bottom Icons: Link to Portfolio and Full Course */}
          <div className="flex flex-col items-center gap-2">
            <Link
              href="/profile"
              className="h-8 w-8 rounded-lg flex items-center justify-center text-xs text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition"
              title="View Public Student Portfolio"
            >
              ⭐
            </Link>
            <Link
              href="/learning-hub"
              className="h-8 w-8 rounded-lg flex items-center justify-center text-xs text-slate-400 hover:text-white hover:bg-slate-900 transition"
              title="Browse Learning Hub"
            >
              🎓
            </Link>
          </div>
        </aside>

        {/* ── 2. COLLAPSIBLE ACTIVITY SIDEBAR DRAWER (280px) ── */}
        {activeSidebarTab && (
          <aside className="w-80 bg-slate-950/95 border-r border-slate-800/90 flex flex-col shrink-0 z-10 animate-fadeIn">
            {/* ── TAB: EXPLORER ── */}
            {activeSidebarTab === "explorer" && (
              <div className="flex-1 flex flex-col min-h-0">
                <div className="p-3 border-b border-slate-800/80 flex items-center justify-between shrink-0">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-300">
                    File Explorer
                  </span>
                  <button
                    onClick={() => setActiveSidebarTab(null)}
                    className="text-slate-500 hover:text-white text-xs p-1"
                  >
                    ✕
                  </button>
                </div>

                <div className="p-3 border-b border-slate-800/60 bg-slate-900/40">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Active Session File
                  </p>
                  <p className="text-xs font-mono text-emerald-400 truncate mt-1">
                    {activeFileName}
                  </p>
                </div>

                <div className="p-2 space-y-1 overflow-y-auto">
                  {PLAYGROUND_FILES.map((file) => {
                    const isActive = file.name === activeFileName;
                    return (
                      <button
                        key={file.name}
                        onClick={() => handleSelectFile(file)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-mono flex items-center gap-2 transition cursor-pointer ${
                          isActive
                            ? "bg-slate-900 text-emerald-400 font-bold border border-slate-800"
                            : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
                        }`}
                      >
                        <span>📄</span>
                        <div className="truncate flex-1">
                          <div className="truncate text-xs font-mono">{file.name}</div>
                          <div className="text-[10px] text-slate-500 font-sans truncate">{file.description}</div>
                        </div>
                        {isActive && <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 ml-auto shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── TAB: EXTENSIONS TOOLCHAINS ── */}
            {activeSidebarTab === "extensions" && (
              <div className="flex-1 flex flex-col min-h-0">
                <div className="p-3 border-b border-slate-800/80 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-purple-400">
                      Native Toolchains
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-purple-500/20 text-purple-300">
                      6 Installed
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveSidebarTab(null)}
                    className="text-slate-500 hover:text-white text-xs p-1"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-2 space-y-2">
                  {EXTENSIONS_TOOLCHAINS.map((ext) => {
                    const isActive = ext.langKey === selectedLang;
                    return (
                      <div
                        key={ext.id}
                        className={`p-3 rounded-xl border text-xs transition ${
                          isActive
                            ? "bg-purple-950/20 border-purple-500/50 text-white"
                            : "bg-slate-950/60 border-slate-800 text-slate-300"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="font-bold flex items-center gap-1.5">
                            <span>{ext.icon}</span>
                            <span>{ext.name}</span>
                          </span>
                          {isActive && (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 leading-snug">{ext.description}</p>
                        <div className="mt-2 text-[10px] font-mono text-purple-300/80 bg-slate-900 rounded p-1.5 border border-slate-800">
                          {ext.compiler}
                        </div>
                        {!isActive && (
                          <button
                            type="button"
                            onClick={() => handleSelectLang(ext.langKey)}
                            className="mt-2 w-full py-1 rounded bg-slate-900 hover:bg-slate-800 text-purple-300 border border-slate-800 text-[11px] font-bold transition"
                          >
                            Activate Toolchain →
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── TAB: CHEATSHEET ── */}
            {activeSidebarTab === "cheatsheet" && (
              <div className="flex-1 flex flex-col min-h-0">
                <div className="p-3 border-b border-slate-800/80 flex items-center justify-between shrink-0">
                  <span className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <span>{langConfig.icon}</span>
                    <span>{langConfig.name} Syntax</span>
                  </span>
                  <button
                    onClick={() => setActiveSidebarTab(null)}
                    className="text-slate-500 hover:text-white text-xs p-1"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-2 space-y-2">
                  {langConfig.cheatsheet.map((item, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <p className="text-xs font-bold text-emerald-400">{item.title}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{item.desc}</p>
                      <pre className="mt-1.5 bg-slate-950 p-2 rounded text-[11px] font-mono text-slate-200 overflow-x-auto border border-slate-800/60">
                        {item.example}
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </aside>
        )}

        {/* ── 3. MAIN STUDIO CANVAS: CODE EDITOR & LIVE TERMINAL WINDOW ── */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-0 overflow-hidden">
          {/* ── LEFT PANE: CODE EDITOR (VS Code Gutter & Canvas) ── */}
          <div
            className={`${
              viewMode === "terminal-only"
                ? "hidden"
                : viewMode === "editor-only"
                ? "lg:col-span-12"
                : "lg:col-span-7"
            } flex flex-col border-b lg:border-b-0 lg:border-r border-slate-800 ${curTheme.editorBg} min-h-0 relative`}
          >
            {/* Editor File Tabs Bar */}
            <div className="h-9 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between px-2 shrink-0">
              <div className="flex items-center gap-1 overflow-x-auto h-full">
                <div className="flex items-center gap-2 px-3 h-full border-r border-slate-800 bg-slate-900 text-white font-mono text-xs font-bold border-t-2 border-emerald-400">
                  <span>{langConfig.icon}</span>
                  <span>{activeFileName}</span>
                  {isDirty && <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />}
                </div>
              </div>

              {/* Breadcrumb info */}
              <div className="hidden sm:flex items-center gap-3 font-mono text-[11px] text-slate-400 pr-2">
                <span>Ln {cursorPos.line}, Col {cursorPos.col}</span>
                <span>{lineCount} lines</span>
                <span>UTF-8</span>
              </div>
            </div>

            {/* Stdin Drawer (if opened) */}
            {showStdin && (
              <div className="bg-slate-900/95 border-b border-cyan-500/30 p-2.5 shrink-0 animate-fadeIn">
                <div className="flex items-center justify-between text-xs text-cyan-300 font-bold mb-1">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-cyan-400" />
                    <span>Standard Input (stdin buffer):</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-normal">Fed directly into scanf(), Scanner, or input()</span>
                </div>
                <textarea
                  value={stdinInput}
                  onChange={(e) => setStdinInput(e.target.value)}
                  placeholder="Enter input (e.g. 15 27)..."
                  rows={2}
                  className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>
            )}

            {/* Code Editor Container: Synchronized Gutter + Textarea */}
            <div className="flex-1 flex min-h-0 relative overflow-hidden">
              {/* Line Numbers Gutter: Starts at line 1, exact leading-6 (24px) */}
              <div
                ref={lineGutterRef}
                className={`w-12 py-3 select-none text-right pr-2.5 font-mono text-xs ${curTheme.gutter} border-r shrink-0 overflow-hidden`}
              >
                {Array.from({ length: Math.max(lineCount, 25) }).map((_, idx) => {
                  const lineNum = idx + 1;
                  const isCurrent = cursorPos.line === lineNum;
                  return (
                    <div
                      key={lineNum}
                      style={{ height: "24px", lineHeight: "24px" }}
                      className={isCurrent ? curTheme.activeLine : ""}
                    >
                      {lineNum}
                    </div>
                  );
                })}
              </div>

              {/* Textarea: Strictly matching line-height and font */}
              <textarea
                ref={editorRef}
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setIsDirty(true);
                  handleCursorMove();
                }}
                onScroll={handleEditorScroll}
                onKeyUp={handleCursorMove}
                onClick={handleCursorMove}
                onKeyDown={handleEditorKeyDown}
                spellCheck={false}
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
                className={`flex-1 py-3 px-4 font-mono text-xs sm:text-sm ${curTheme.text} bg-transparent resize-none focus:outline-none selection:bg-emerald-500/30 overflow-y-auto`}
                style={{
                  tabSize: 4,
                  lineHeight: "24px",
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                }}
              />
            </div>

            {/* Editor Mini Bottom Status Bar */}
            <div className="h-6 bg-slate-950 border-t border-slate-800/80 px-3 flex items-center justify-between text-[11px] font-mono text-slate-400 shrink-0">
              <div className="flex items-center gap-3">
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Target: {langConfig.compiler}</span>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span>Spaces: 4</span>
                <span className="hidden sm:inline">{langConfig.tag}</span>
              </div>
            </div>
          </div>

          {/* ── RIGHT PANE: LIVE TERMINAL CONSOLE ── */}
          <div
            className={`${
              viewMode === "editor-only"
                ? "hidden"
                : viewMode === "terminal-only"
                ? "lg:col-span-12"
                : "lg:col-span-5"
            } flex flex-col ${curTheme.bg} min-h-0 border-t lg:border-t-0 border-slate-800`}
          >
            {/* Terminal Window Header with Traffic Lights */}
            <div className="h-9 bg-slate-950 border-b border-slate-800 px-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/80 inline-block" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80 inline-block" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500/80 inline-block" />
                <span className="font-mono text-xs text-slate-300 ml-2 font-bold truncate max-w-[220px]">
                  bash — student@terminal (~/{activeFileName})
                </span>
              </div>

              <div className="flex items-center gap-2">
                {execStats && (
                  <div className="flex items-center gap-1.5 text-[10px] font-mono">
                    <span
                      className={`px-1.5 py-0.2 rounded font-bold ${
                        execStats.exitCode === 0
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-red-500/20 text-red-400 border border-red-500/30"
                      }`}
                    >
                      ● Exit {execStats.exitCode}
                    </span>
                    <span className="text-slate-400">⚡ {execStats.timeMs}ms</span>
                  </div>
                )}

                <button
                  onClick={() => {
                    setOutput([]);
                    setExecStats(null);
                  }}
                  className="text-slate-400 hover:text-white text-[11px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 transition cursor-pointer"
                  title="Clear screen"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Terminal Output Log Stream */}
            <div className="flex-1 p-3 font-mono text-xs leading-5 overflow-y-auto selection:bg-emerald-500/30 flex flex-col justify-between">
              <div className="space-y-1">
                {output.map((line, idx) => {
                  const isCmd = line.startsWith("$") || line.includes("campusgrow@studio");
                  const isError =
                    line.toLowerCase().includes("error") ||
                    line.toLowerCase().includes("fatal") ||
                    line.toLowerCase().includes("exception");
                  const isSuccess =
                    line.toLowerCase().includes("passed") ||
                    line.toLowerCase().includes("success") ||
                    line.toLowerCase().includes("✓");
                  const isWarning =
                    line.toLowerCase().includes("warning") ||
                    line.toLowerCase().includes("warn");

                  return (
                    <div
                      key={idx}
                      className={`whitespace-pre-wrap break-all ${
                        isCmd
                          ? "text-emerald-400 font-bold"
                          : isError
                          ? "text-red-400 font-semibold"
                          : isSuccess
                          ? "text-emerald-300"
                          : isWarning
                          ? "text-yellow-300"
                          : "text-slate-300"
                      }`}
                    >
                      {line}
                    </div>
                  );
                })}
                <div ref={terminalBottomRef} />
              </div>

              {/* Command Quick Launcher & Prompt Form */}
              <div className="mt-3 pt-2 border-t border-slate-800/80 shrink-0">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 text-[11px] text-slate-400">
                  <span className="text-slate-500 text-[10px] font-bold uppercase shrink-0">Runs:</span>
                  <button
                    type="button"
                    onClick={() => handleRun()}
                    className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-slate-800 shrink-0 font-mono transition"
                  >
                    ▶ run
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCliInput("projects");
                      setTimeout(() => cliInputRef.current?.focus(), 0);
                    }}
                    className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 shrink-0 font-mono transition"
                  >
                    projects
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCliInput("portfolio");
                      setTimeout(() => cliInputRef.current?.focus(), 0);
                    }}
                    className="px-2 py-0.5 rounded bg-amber-950/40 hover:bg-amber-900/60 text-amber-300 border border-amber-500/30 shrink-0 font-mono transition"
                  >
                    portfolio
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCliInput("ls -la");
                      setTimeout(() => cliInputRef.current?.focus(), 0);
                    }}
                    className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 shrink-0 font-mono transition"
                  >
                    ls -la
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCliInput("neofetch");
                      setTimeout(() => cliInputRef.current?.focus(), 0);
                    }}
                    className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-purple-400 border border-slate-800 shrink-0 font-mono transition"
                  >
                    neofetch
                  </button>
                </div>

                {/* Interactive Shell Prompt Input */}
                <form onSubmit={handleCliSubmit} className="flex items-center gap-2 pt-1">
                  <span className="text-emerald-400 font-mono font-black text-xs select-none">
                    campusgrow@studio:~$
                  </span>
                  <input
                    ref={cliInputRef}
                    type="text"
                    value={cliInput}
                    onChange={(e) => setCliInput(e.target.value)}
                    onKeyDown={handleCliKeyDown}
                    placeholder="Type 'run', 'projects', 'portfolio', 'ls -la', 'clear'..."
                    className="flex-1 bg-transparent text-xs font-mono text-slate-100 focus:outline-none placeholder:text-slate-600"
                  />
                  <button
                    type="submit"
                    className="text-[11px] text-slate-500 hover:text-emerald-400 font-mono px-2 py-0.5 rounded transition cursor-pointer"
                  >
                    ↵
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
