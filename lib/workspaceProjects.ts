export type LanguageKey = "c" | "java" | "python" | "javascript" | "sql" | "bash" | "json";

export interface ProjectCommit {
  hash: string;
  message: string;
  author: string;
  timestamp: string;
}

export interface ProjectFile {
  name: string;
  content: string;
  language: LanguageKey;
  size?: number;
  lastCommitMessage?: string;
  lastModified?: string;
}

export interface WorkspaceProject {
  id: string;
  name?: string; // e.g. "bubble-sort-visualizer"
  title: string;
  description: string;
  language: LanguageKey;
  code: string;
  files: Record<string, ProjectFile>;
  activeFile: string;
  inPortfolio: boolean; // Flag: automatically displayed on user's public portfolio
  visibility?: "public" | "private";
  defaultBranch?: string;
  commits?: ProjectCommit[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export const WORKSPACE_STORAGE_KEY = "campusgrow_projects_workspace";
export const WORKSPACE_EVENT = "campusgrow_workspace_updated";

export const DEFAULT_WORKSPACE_PROJECTS: WorkspaceProject[] = [
  {
    id: "proj-dynamic-array",
    title: "Dynamic Array & Bubble Sort Visualizer",
    description: "Pointer-based dynamic array reallocation with in-place bubble sorting and memory verification in C11.",
    language: "c",
    activeFile: "main.c",
    inPortfolio: true,
    tags: ["C11", "Data Structures", "Algorithms", "Pointers"],
    createdAt: "2026-10-18T10:00:00Z",
    updatedAt: "2026-10-21T12:30:00Z",
    files: {
      "main.c": {
        name: "main.c",
        language: "c",
        content: `#include <stdio.h>
#include <stdlib.h>

void printArray(int arr[], int size) {
    printf("[ ");
    for (int i = 0; i < size; i++) {
        printf("%d%s", arr[i], (i == size - 1) ? "" : ", ");
    }
    printf(" ]\\n");
}

void bubbleSort(int *arr, int n) {
    int comparisons = 0, swaps = 0;
    for (int i = 0; i < n - 1; i++) {
        int swapped = 0;
        for (int j = 0; j < n - i - 1; j++) {
            comparisons++;
            if (*(arr + j) > *(arr + j + 1)) {
                int temp = *(arr + j);
                *(arr + j) = *(arr + j + 1);
                *(arr + j + 1) = temp;
                swapped = 1;
                swaps++;
            }
        }
        if (!swapped) break;
    }
    printf(">> Sorting Complete: %d comparisons, %d pointer swaps.\\n", comparisons, swaps);
}

int main() {
    printf("===========================================\\n");
    printf("  CampusGrow Studio: Dynamic Array & Sort  \\n");
    printf("===========================================\\n\\n");

    int capacity = 8;
    int *data = (int *)malloc(capacity * sizeof(int));
    if (!data) {
        printf("Memory allocation failed!\\n");
        return 1;
    }

    int rawValues[] = {64, 34, 25, 12, 22, 11, 90, 48};
    for (int i = 0; i < capacity; i++) {
        data[i] = rawValues[i];
    }

    printf("Original Dataset: ");
    printArray(data, capacity);

    printf("Applying Bubble Sort via pointer dereference...\\n");
    bubbleSort(data, capacity);

    printf("Sorted Dataset:   ");
    printArray(data, capacity);

    free(data);
    printf("\\nMemory freed successfully. Program exited normally.\\n");
    return 0;
}
`,
      },
      "README.md": {
        name: "README.md",
        language: "json",
        content: `# Dynamic Array & Bubble Sort Visualizer
A verified C11 implementation of pointer arithmetic and in-place sorting.
Features:
- Dynamic heap allocation via malloc() and free()
- Pointer arithmetic traversal (*(arr + j))
- Early exit optimization on already sorted passes
- Real-time comparison and swap tracking
`,
      },
    },
    code: `#include <stdio.h>
#include <stdlib.h>

void printArray(int arr[], int size) {
    printf("[ ");
    for (int i = 0; i < size; i++) {
        printf("%d%s", arr[i], (i == size - 1) ? "" : ", ");
    }
    printf(" ]\\n");
}

void bubbleSort(int *arr, int n) {
    int comparisons = 0, swaps = 0;
    for (int i = 0; i < n - 1; i++) {
        int swapped = 0;
        for (int j = 0; j < n - i - 1; j++) {
            comparisons++;
            if (*(arr + j) > *(arr + j + 1)) {
                int temp = *(arr + j);
                *(arr + j) = *(arr + j + 1);
                *(arr + j + 1) = temp;
                swapped = 1;
                swaps++;
            }
        }
        if (!swapped) break;
    }
    printf(">> Sorting Complete: %d comparisons, %d pointer swaps.\\n", comparisons, swaps);
}

int main() {
    printf("===========================================\\n");
    printf("  CampusGrow Studio: Dynamic Array & Sort  \\n");
    printf("===========================================\\n\\n");

    int capacity = 8;
    int *data = (int *)malloc(capacity * sizeof(int));
    if (!data) {
        printf("Memory allocation failed!\\n");
        return 1;
    }

    int rawValues[] = {64, 34, 25, 12, 22, 11, 90, 48};
    for (int i = 0; i < capacity; i++) {
        data[i] = rawValues[i];
    }

    printf("Original Dataset: ");
    printArray(data, capacity);

    printf("Applying Bubble Sort via pointer dereference...\\n");
    bubbleSort(data, capacity);

    printf("Sorted Dataset:   ");
    printArray(data, capacity);

    free(data);
    printf("\\nMemory freed successfully. Program exited normally.\\n");
    return 0;
}
`,
  },
  {
    id: "proj-bst-tree",
    title: "Binary Search Tree & OOP Traversals",
    description: "Robust Java 21 implementation of a Binary Search Tree with recursive in-order, pre-order, and level-order traversals.",
    language: "java",
    activeFile: "Main.java",
    inPortfolio: true,
    tags: ["Java 21", "OOP", "Trees", "Recursion"],
    createdAt: "2026-10-19T14:15:00Z",
    updatedAt: "2026-10-21T09:45:00Z",
    files: {
      "Main.java": {
        name: "Main.java",
        language: "java",
        content: `public class Main {
    static class Node {
        int val;
        Node left, right;
        Node(int val) {
            this.val = val;
        }
    }

    static class BST {
        Node root;

        void insert(int val) {
            root = insertRec(root, val);
        }

        private Node insertRec(Node root, int val) {
            if (root == null) return new Node(val);
            if (val < root.val) root.left = insertRec(root.left, val);
            else if (val > root.val) root.right = insertRec(root.right, val);
            return root;
        }

        void inOrder(Node node) {
            if (node == null) return;
            inOrder(node.left);
            System.out.print(node.val + " -> ");
            inOrder(node.right);
        }

        boolean search(Node node, int target) {
            if (node == null) return false;
            if (node.val == target) return true;
            return target < node.val ? search(node.left, target) : search(node.right, target);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================");
        System.out.println(" CampusGrow Java 21 BST Studio Runner     ");
        System.out.println("==========================================");

        BST tree = new BST();
        int[] keys = {50, 30, 20, 40, 70, 60, 80};
        System.out.println("Inserting keys into BST:");
        for (int k : keys) {
            tree.insert(k);
            System.out.print(k + " ");
        }
        System.out.println("\\n");

        System.out.print("In-Order Traversal (Sorted Output): ");
        tree.inOrder(tree.root);
        System.out.println("END");

        int target = 60;
        System.out.println("Searching for key " + target + ": " + (tree.search(tree.root, target) ? "FOUND ✓" : "NOT FOUND"));
    }
}
`,
      },
    },
    code: `public class Main {
    static class Node {
        int val;
        Node left, right;
        Node(int val) {
            this.val = val;
        }
    }

    static class BST {
        Node root;

        void insert(int val) {
            root = insertRec(root, val);
        }

        private Node insertRec(Node root, int val) {
            if (root == null) return new Node(val);
            if (val < root.val) root.left = insertRec(root.left, val);
            else if (val > root.val) root.right = insertRec(root.right, val);
            return root;
        }

        void inOrder(Node node) {
            if (node == null) return;
            inOrder(node.left);
            System.out.print(node.val + " -> ");
            inOrder(node.right);
        }

        boolean search(Node node, int target) {
            if (node == null) return false;
            if (node.val == target) return true;
            return target < node.val ? search(node.left, target) : search(node.right, target);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================");
        System.out.println(" CampusGrow Java 21 BST Studio Runner     ");
        System.out.println("==========================================");

        BST tree = new BST();
        int[] keys = {50, 30, 20, 40, 70, 60, 80};
        System.out.println("Inserting keys into BST:");
        for (int k : keys) {
            tree.insert(k);
            System.out.print(k + " ");
        }
        System.out.println("\\n");

        System.out.print("In-Order Traversal (Sorted Output): ");
        tree.inOrder(tree.root);
        System.out.println("END");

        int target = 60;
        System.out.println("Searching for key " + target + ": " + (tree.search(tree.root, target) ? "FOUND ✓" : "NOT FOUND"));
    }
}
`,
  },
  {
    id: "proj-python-analytics",
    title: "Algorithmic Benchmark & Analytics",
    description: "Vectorized processing benchmark comparing traditional iterative loops vs Python 3 comprehensions with microsecond profiling.",
    language: "python",
    activeFile: "main.py",
    inPortfolio: true,
    tags: ["Python 3.14", "Performance", "Analytics", "Benchmarking"],
    createdAt: "2026-10-19T18:00:00Z",
    updatedAt: "2026-10-21T11:10:00Z",
    files: {
      "main.py": {
        name: "main.py",
        language: "python",
        content: `import time

def benchmark_pipeline(n: int = 250_000):
    print("==========================================")
    print(" CampusGrow Python 3.14 Performance Lab   ")
    print("==========================================")
    print(f"Dataset Size: {n:,} items\\n")

    # 1. Standard For-Loop
    t0 = time.perf_counter()
    loop_result = []
    for i in range(n):
        if i % 2 == 0:
            loop_result.append(i * 2)
    t1 = time.perf_counter()
    loop_time = (t1 - t0) * 1000

    # 2. Optimized List Comprehension
    t2 = time.perf_counter()
    comp_result = [i * 2 for i in range(n) if i % 2 == 0]
    t3 = time.perf_counter()
    comp_time = (t3 - t2) * 1000

    print(f"For-loop Time:          {loop_time:6.2f} ms")
    print(f"List Comprehension:     {comp_time:6.2f} ms")
    speedup = loop_time / comp_time if comp_time > 0 else 1.0
    print(f"Comprehension Speedup:  {speedup:.2f}x faster 🚀")
    print(f"Verification:           {'PASS ✓' if loop_result == comp_result else 'FAIL'}")

if __name__ == "__main__":
    benchmark_pipeline()
`,
      },
    },
    code: `import time

def benchmark_pipeline(n: int = 250_000):
    print("==========================================")
    print(" CampusGrow Python 3.14 Performance Lab   ")
    print("==========================================")
    print(f"Dataset Size: {n:,} items\\n")

    # 1. Standard For-Loop
    t0 = time.perf_counter()
    loop_result = []
    for i in range(n):
        if i % 2 == 0:
            loop_result.append(i * 2)
    t1 = time.perf_counter()
    loop_time = (t1 - t0) * 1000

    # 2. Optimized List Comprehension
    t2 = time.perf_counter()
    comp_result = [i * 2 for i in range(n) if i % 2 == 0]
    t3 = time.perf_counter()
    comp_time = (t3 - t2) * 1000

    print(f"For-loop Time:          {loop_time:6.2f} ms")
    print(f"List Comprehension:     {comp_time:6.2f} ms")
    speedup = loop_time / comp_time if comp_time > 0 else 1.0
    print(f"Comprehension Speedup:  {speedup:.2f}x faster 🚀")
    print(f"Verification:           {'PASS ✓' if loop_result == comp_result else 'FAIL'}")

if __name__ == "__main__":
    benchmark_pipeline()
`,
  },
  {
    id: "proj-lru-cache",
    title: "LRU Cache & Memory Allocator",
    description: "Systems-level Least Recently Used cache implementation utilizing double-linked list pointers and constant time O(1) eviction.",
    language: "c",
    activeFile: "main.c",
    inPortfolio: false,
    tags: ["Systems", "Pointers", "Memory", "Data Structures"],
    createdAt: "2026-10-20T08:30:00Z",
    updatedAt: "2026-10-21T08:15:00Z",
    files: {
      "main.c": {
        name: "main.c",
        language: "c",
        content: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int key;
    int value;
    struct Node *prev;
    struct Node *next;
} Node;

typedef struct {
    int capacity;
    int size;
    Node *head;
    Node *tail;
} LRUCache;

LRUCache* createCache(int capacity) {
    LRUCache *cache = (LRUCache *)malloc(sizeof(LRUCache));
    cache->capacity = capacity;
    cache->size = 0;
    cache->head = NULL;
    cache->tail = NULL;
    return cache;
}

void printCache(LRUCache *cache) {
    Node *curr = cache->head;
    printf("Cache state [MRU -> LRU]: ");
    while (curr) {
        printf("(%d:%d) ", curr->key, curr->value);
        curr = curr->next;
    }
    printf("\\n");
}

int main() {
    printf("===========================================\\n");
    printf("   CampusGrow Systems: LRU Cache in C      \\n");
    printf("===========================================\\n");

    LRUCache *cache = createCache(3);
    printf("Created LRU Cache with capacity = 3\\n");
    printf("Ready for get() and put() operations.\\n");

    return 0;
}
`,
      },
    },
    code: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int key;
    int value;
    struct Node *prev;
    struct Node *next;
} Node;

typedef struct {
    int capacity;
    int size;
    Node *head;
    Node *tail;
} LRUCache;

LRUCache* createCache(int capacity) {
    LRUCache *cache = (LRUCache *)malloc(sizeof(LRUCache));
    cache->capacity = capacity;
    cache->size = 0;
    cache->head = NULL;
    cache->tail = NULL;
    return cache;
}

int main() {
    printf("===========================================\\n");
    printf("   CampusGrow Systems: LRU Cache in C      \\n");
    printf("===========================================\\n");

    LRUCache *cache = createCache(3);
    printf("Created LRU Cache with capacity = 3\\n");
    printf("Ready for get() and put() operations.\\n");

    return 0;
}
`,
  },
  {
    id: "proj-placement-sql",
    title: "Placement Analytics & Query Studio",
    description: "Relational database schema with students, placement offers, branch averages, and top percentile rankings in SQLite.",
    language: "sql",
    activeFile: "query.sql",
    inPortfolio: false,
    tags: ["SQLite", "Database", "Analytics", "Placement"],
    createdAt: "2026-10-20T11:00:00Z",
    updatedAt: "2026-10-21T10:00:00Z",
    files: {
      "query.sql": {
        name: "query.sql",
        language: "sql",
        content: `-- CampusGrow Placement Analytics Schema
CREATE TABLE students (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    branch TEXT NOT NULL,
    gpa REAL NOT NULL,
    placed_company TEXT,
    package_lpa REAL
);

INSERT INTO students (id, name, branch, gpa, placed_company, package_lpa) VALUES
(1, 'Aarav Sharma', 'CSE', 9.4, 'Google', 32.5),
(2, 'Diya Patel', 'AIML', 9.1, 'Microsoft', 28.0),
(3, 'Rohan Verma', 'CSE', 8.7, 'Amazon', 24.0),
(4, 'Ananya Iyer', 'ECE', 8.9, 'Qualcomm', 22.0),
(5, 'Kabir Mehta', 'IT', 8.2, 'Atlassian', 26.5),
(6, 'Neha Reddy', 'CSE', 9.6, 'Adobe', 30.0);

-- Query: Branch-wise Placement & Salary Aggregations
SELECT 
    branch,
    COUNT(*) AS total_students,
    ROUND(AVG(gpa), 2) AS avg_gpa,
    ROUND(AVG(package_lpa), 1) AS avg_package_lpa,
    MAX(package_lpa) AS top_package_lpa
FROM students
GROUP BY branch
ORDER BY top_package_lpa DESC;
`,
      },
    },
    code: `-- CampusGrow Placement Analytics Schema
CREATE TABLE students (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    branch TEXT NOT NULL,
    gpa REAL NOT NULL,
    placed_company TEXT,
    package_lpa REAL
);

INSERT INTO students (id, name, branch, gpa, placed_company, package_lpa) VALUES
(1, 'Aarav Sharma', 'CSE', 9.4, 'Google', 32.5),
(2, 'Diya Patel', 'AIML', 9.1, 'Microsoft', 28.0),
(3, 'Rohan Verma', 'CSE', 8.7, 'Amazon', 24.0),
(4, 'Ananya Iyer', 'ECE', 8.9, 'Qualcomm', 22.0),
(5, 'Kabir Mehta', 'IT', 8.2, 'Atlassian', 26.5),
(6, 'Neha Reddy', 'CSE', 9.6, 'Adobe', 30.0);

-- Query: Branch-wise Placement & Salary Aggregations
SELECT 
    branch,
    COUNT(*) AS total_students,
    ROUND(AVG(gpa), 2) AS avg_gpa,
    ROUND(AVG(package_lpa), 1) AS avg_package_lpa,
    MAX(package_lpa) AS top_package_lpa
FROM students
GROUP BY branch
ORDER BY top_package_lpa DESC;
`,
  },
  {
    id: "proj-async-pipeline",
    title: "Event Loop & Async Concurrency Queue",
    description: "Node.js asynchronous task queue demonstrating microtask scheduling, Promise concurrency throttling, and timer resolution.",
    language: "javascript",
    activeFile: "index.js",
    inPortfolio: false,
    tags: ["Node.js", "Async/Await", "Event Loop", "V8"],
    createdAt: "2026-10-20T16:20:00Z",
    updatedAt: "2026-10-21T07:40:00Z",
    files: {
      "index.js": {
        name: "index.js",
        language: "javascript",
        content: `console.log("==========================================");
console.log(" CampusGrow Node.js Concurrency Scheduler ");
console.log("==========================================\\n");

async function workerTask(id, delayMs) {
    console.log(\`[Task \${id}] Started (delay: \${delayMs}ms)\`);
    await new Promise((resolve) => setTimeout(resolve, delayMs));
    console.log(\`[Task \${id}] Completed ✓\`);
    return { id, delayMs, status: "SUCCESS" };
}

async function runQueue() {
    const tasks = [
        workerTask(1, 100),
        workerTask(2, 50),
        workerTask(3, 150),
        workerTask(4, 30)
    ];

    console.log("Dispatching 4 concurrent tasks to V8 event loop...");
    const results = await Promise.all(tasks);
    console.log("\\nAll tasks settled successfully:");
    console.table(results);
}

runQueue();
`,
      },
    },
    code: `console.log("==========================================");
console.log(" CampusGrow Node.js Concurrency Scheduler ");
console.log("==========================================\\n");

async function workerTask(id, delayMs) {
    console.log(\`[Task \${id}] Started (delay: \${delayMs}ms)\`);
    await new Promise((resolve) => setTimeout(resolve, delayMs));
    console.log(\`[Task \${id}] Completed ✓\`);
    return { id, delayMs, status: "SUCCESS" };
}

async function runQueue() {
    const tasks = [
        workerTask(1, 100),
        workerTask(2, 50),
        workerTask(3, 150),
        workerTask(4, 30)
    ];

    console.log("Dispatching 4 concurrent tasks to V8 event loop...");
    const results = await Promise.all(tasks);
    console.log("\\nAll tasks settled successfully:");
    console.table(results);
}

runQueue();
`,
  },
];

export function getWorkspaceProjects(): WorkspaceProject[] {
  if (typeof window === "undefined") {
    return DEFAULT_WORKSPACE_PROJECTS;
  }

  try {
    const raw = localStorage.getItem(WORKSPACE_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(WORKSPACE_STORAGE_KEY, JSON.stringify(DEFAULT_WORKSPACE_PROJECTS));
      return DEFAULT_WORKSPACE_PROJECTS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    localStorage.setItem(WORKSPACE_STORAGE_KEY, JSON.stringify(DEFAULT_WORKSPACE_PROJECTS));
    return DEFAULT_WORKSPACE_PROJECTS;
  } catch {
    return DEFAULT_WORKSPACE_PROJECTS;
  }
}

export function saveWorkspaceProjects(projects: WorkspaceProject[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(WORKSPACE_STORAGE_KEY, JSON.stringify(projects));
    window.dispatchEvent(new Event(WORKSPACE_EVENT));
    window.dispatchEvent(new Event("storage"));
  } catch (err) {
    console.error("Failed to save workspace projects:", err);
  }
}

export function getProjectById(id: string): WorkspaceProject | undefined {
  const all = getWorkspaceProjects();
  return all.find((p) => p.id === id);
}

export function createWorkspaceProject(params: {
  title: string;
  description?: string;
  language: LanguageKey;
  initialCode?: string;
  files?: Record<string, ProjectFile>;
  commits?: ProjectCommit[];
  tags?: string[];
  inPortfolio?: boolean;
}): WorkspaceProject {
  const all = getWorkspaceProjects();
  const id = `proj-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const defaultFilename: Record<LanguageKey, string> = {
    c: "main.c",
    java: "Main.java",
    python: "main.py",
    javascript: "index.js",
    sql: "query.sql",
    bash: "script.sh",
    json: "config.json",
  };

  const filename = defaultFilename[params.language];
  const now = new Date().toISOString();
  const code = params.initialCode || (params.files && Object.values(params.files)[0]?.content) || `// ${params.title}\n// Language: ${params.language}\n`;
  const initialFiles = params.files && Object.keys(params.files).length > 0 ? params.files : {
    [filename]: {
      name: filename,
      language: params.language,
      content: code,
    },
  };
  const activeFile = Object.keys(initialFiles).find((f) => f === filename) || Object.keys(initialFiles)[0];

  const defaultCommits: ProjectCommit[] = [
    {
      hash: "init-" + Math.random().toString(16).substring(2, 8),
      message: "Initial commit: scaffold modular project structure",
      author: "AgentKit Architect <agent@campusgrow.internal>",
      timestamp: now,
    },
  ];

  const newProj: WorkspaceProject = {
    id,
    title: params.title.trim() || "Untitled Project",
    description: params.description?.trim() || "Student engineering project in CampusGrow Studio.",
    language: params.language,
    code,
    activeFile,
    files: initialFiles,
    commits: params.commits && params.commits.length > 0 ? params.commits : defaultCommits,
    inPortfolio: params.inPortfolio ?? false,
    tags: params.tags && params.tags.length > 0 ? params.tags : [params.language.toUpperCase(), "Engineering"],
    createdAt: now,
    updatedAt: now,
  };

  const updated = [newProj, ...all];
  saveWorkspaceProjects(updated);
  return newProj;
}

export function updateWorkspaceProject(
  id: string,
  updates: Partial<WorkspaceProject>
): WorkspaceProject | undefined {
  const all = getWorkspaceProjects();
  const idx = all.findIndex((p) => p.id === id);
  if (idx === -1) return undefined;

  const current = all[idx];
  const updatedProject: WorkspaceProject = {
    ...current,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  all[idx] = updatedProject;
  saveWorkspaceProjects(all);
  return updatedProject;
}

export function togglePortfolioStatus(id: string): boolean {
  const all = getWorkspaceProjects();
  const target = all.find((p) => p.id === id);
  if (!target) return false;

  const newStatus = !target.inPortfolio;
  target.inPortfolio = newStatus;
  target.updatedAt = new Date().toISOString();
  saveWorkspaceProjects(all);
  return newStatus;
}

export function deleteWorkspaceProject(id: string): boolean {
  const all = getWorkspaceProjects();
  const filtered = all.filter((p) => p.id !== id);
  if (filtered.length === all.length) return false;
  saveWorkspaceProjects(filtered);
  return true;
}

export function getPortfolioFeaturedProjects(): WorkspaceProject[] {
  const all = getWorkspaceProjects();
  return all.filter((p) => p.inPortfolio);
}

export function addCommitToProject(
  id: string,
  message: string,
  author: string = "Student Engineer"
): ProjectCommit | undefined {
  const all = getWorkspaceProjects();
  const target = all.find((p) => p.id === id);
  if (!target) return undefined;

  const hash = Math.random().toString(16).substring(2, 9);
  const now = new Date().toISOString();
  const commit: ProjectCommit = {
    hash,
    message: message.trim() || "Update project files",
    author,
    timestamp: now,
  };

  const existingCommits = target.commits || [];
  target.commits = [commit, ...existingCommits];
  target.updatedAt = now;

  saveWorkspaceProjects(all);
  return commit;
}

export function addFileToProject(
  projectId: string,
  fileName: string,
  content: string,
  language: LanguageKey
): boolean {
  const all = getWorkspaceProjects();
  const target = all.find((p) => p.id === projectId);
  if (!target) return false;

  const now = new Date().toISOString();
  target.files = {
    ...target.files,
    [fileName]: {
      name: fileName,
      language,
      content,
      size: content.length,
      lastCommitMessage: `Add ${fileName}`,
      lastModified: now,
    },
  };
  target.updatedAt = now;
  saveWorkspaceProjects(all);
  return true;
}

