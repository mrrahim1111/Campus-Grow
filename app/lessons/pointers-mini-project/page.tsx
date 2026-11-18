"use client";
import LessonPage from "@/components/LessonPage";

export default function PointersMiniProject() {
  return (
    <LessonPage
      lessonId="pointers-mini-project"
      lessonNumber={10}
      title="Pointers, Dynamic Memory & Capstone Architecture"
      category="Year 1 • Foundations"
      readTime="50 min capstone sprint"
      description="Demystify pointers from first principles to FAANG level! Learn memory addresses, pointer arithmetic, dynamic heap allocation with malloc/free, and build a production-grade student record system."
      question={{
        question: "If `ptr` is a pointer holding the address of `int x = 42;`, what does `*ptr` give you?",
        options: [
          "The value 42 (the contents stored at that address)",
          "The word 'pointer'",
          "The memory address number in hexadecimal",
          "An error",
        ],
        correctAnswer: "The value 42 (the contents stored at that address)",
        explanation:
          "The `*` symbol before a pointer is called dereferencing! It tells C: 'Follow this address and give me the actual value stored inside the box!'",
      }}
    >
      {/* ────────────────────────────────────────────────────────────── */}
      {/* 🟢 LEVEL 1: FOUNDATIONS & INTUITIVE MENTAL MODELS               */}
      {/* ────────────────────────────────────────────────────────────── */}
      <div className="space-y-8">
        <div className="flex items-center justify-between border-b border-emerald-200 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🟢</span>
            <h2 className="text-lg font-black uppercase tracking-wider text-emerald-800">
              Pointer Foundations &amp; Address References
            </h2>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Intuition First
          </span>
        </div>

        {/* Section 1: Demystifying Pointers */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            1. Pointers Without Panic: The House Address Analogy
          </h3>
          <p className="text-gray-700 leading-7">
            Pointers are often considered the most intimidating topic in C, but the intuition is delightfully simple:
          </p>
          <div className="mt-4 rounded-2xl border-2 border-emerald-300 bg-emerald-50/50 p-6 space-y-3">
            <p className="text-sm font-semibold text-gray-900 leading-relaxed">
              🏡 If a friend asks where you live, you don&apos;t pick up your house and hand it to them. You give them a piece of paper with your <strong>house address</strong> written on it!
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              In computer memory (RAM), every variable lives in a numbered byte slot. A regular variable holds the <strong>data</strong> (like the number 42). A <strong className="text-emerald-700">pointer</strong> is simply a variable that holds the <strong>memory address</strong> of where that data lives!
            </p>
          </div>

          <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3">
              Memory Visualization: Variable vs. Pointer
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="rounded-xl border border-blue-200 bg-white p-4">
                <span className="text-blue-700 font-bold">int score = 95;</span>
                <p className="text-gray-500 text-[11px] mt-1">Memory Address: <strong className="text-slate-800">0x7ffd510</strong></p>
                <p className="text-gray-500 text-[11px]">Value stored inside: <strong className="text-emerald-700">95</strong></p>
              </div>
              <div className="rounded-xl border border-purple-200 bg-white p-4">
                <span className="text-purple-700 font-bold">int *p = &amp;score;</span>
                <p className="text-gray-500 text-[11px] mt-1">Memory Address: <strong className="text-slate-800">0x7ffd518</strong></p>
                <p className="text-gray-500 text-[11px]">Value stored inside: <strong className="text-purple-700">0x7ffd510</strong> (Points to score!)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: & vs * */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            2. The Two Core Operators: &amp; (Address-Of) and * (Dereference)
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-5">
              <span className="font-mono text-base font-black text-blue-800">&amp; (Address Of)</span>
              <p className="text-xs text-gray-700 mt-2 leading-relaxed">
                Finds the exact memory address where a variable lives in RAM.
              </p>
              <pre className="mt-3 rounded-xl bg-slate-900 p-3 text-xs font-mono text-blue-300">
{`int x = 10;
int *ptr = &x; // ptr stores address of x`}
              </pre>
            </div>

            <div className="rounded-2xl border border-purple-200 bg-purple-50/70 p-5">
              <span className="font-mono text-base font-black text-purple-800">* (Value At Address / Dereference)</span>
              <p className="text-xs text-gray-700 mt-2 leading-relaxed">
                Follows the address and looks inside the box to read or change its value.
              </p>
              <pre className="mt-3 rounded-xl bg-slate-900 p-3 text-xs font-mono text-purple-300">
{`printf("%d", *ptr); // Prints 10!
*ptr = 25;          // x is now 25!`}
              </pre>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50/70 p-4">
            <p className="text-xs font-bold uppercase text-rose-800 tracking-wider">⚠️ Crucial Beginner Safety: The NULL Pointer Rule</p>
            <p className="mt-1 text-xs text-gray-700 leading-relaxed">
              Never leave a pointer uninitialized! An uninitialized pointer holds a random memory address (a <em>wild pointer</em>). Always set unassigned pointers to <code className="font-mono font-bold">NULL</code>:
              <br />
              <code className="font-mono text-slate-900 font-bold">int *p = NULL; if (p != NULL) &#123; *p = 50; &#125;</code>
            </p>
          </div>
        </section>
      </div>

      {/* ────────────────────────────────────────────────────────────── */}
      {/* 🟡 LEVEL 2: INTERMEDIATE CORE & MEMORY MECHANICS               */}
      {/* ────────────────────────────────────────────────────────────── */}
      <div className="space-y-8 mt-12">
        <div className="flex items-center justify-between border-b border-amber-200 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🟡</span>
            <h2 className="text-lg font-black uppercase tracking-wider text-amber-900">
              Pointer Arithmetic, Struct Dereferencing &amp; Heap Management
            </h2>
          </div>
          <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Systems &amp; Heap
          </span>
        </div>

        {/* Section 3: Pointer Arithmetic & Array Duality */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            3. Pointer Arithmetic &amp; The Array Duality Law
          </h3>
          <p className="text-gray-700 leading-7">
            When you add 1 to a pointer (<code className="font-mono font-bold text-amber-700">ptr + 1</code>), C does <strong>not</strong> add 1 byte! Instead, it advances the pointer by the size of the underlying data type:
          </p>

          <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="font-mono text-xs text-gray-800 space-y-1">
              <p>• If <code className="text-blue-700 font-bold">int *p = 0x1000</code>: <code className="text-emerald-700">p + 1</code> becomes <strong className="text-purple-700">0x1004</strong> (advances 4 bytes for int!)</p>
              <p>• If <code className="text-blue-700 font-bold">double *d = 0x1000</code>: <code className="text-emerald-700">d + 1</code> becomes <strong className="text-purple-700">0x1008</strong> (advances 8 bytes for double!)</p>
              <p>• If <code className="text-blue-700 font-bold">char *c = 0x1000</code>: <code className="text-emerald-700">c + 1</code> becomes <strong className="text-purple-700">0x1001</strong> (advances 1 byte for char!)</p>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50/50 p-5">
            <p className="text-xs font-black uppercase tracking-wider text-amber-900 mb-2">
              The Golden Equivalence Law
            </p>
            <p className="font-mono text-sm sm:text-base font-bold text-slate-900">
              arr[i] &nbsp;&equiv;&nbsp; *(arr + i)
            </p>
            <p className="text-xs text-gray-700 mt-2 leading-relaxed">
              In C, arrays and pointers are almost interchangeable. An array name <code className="font-mono">arr</code> decays into a pointer pointing to the first element <code className="font-mono">&amp;arr[0]</code>.
            </p>
          </div>
        </section>

        {/* Section 4: Pass by Reference (The Swap Function) */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            4. Pass-By-Reference: The Classic Swap Function
          </h3>
          <p className="text-gray-700 leading-7">
            C is strictly <em>pass-by-value</em>. When you pass a variable to a function, C creates a copy. To allow a function to modify caller variables, we must pass their memory addresses (pointers):
          </p>

          <pre className="mt-4 overflow-x-auto rounded-2xl bg-slate-900 border border-slate-800 p-6 text-sm leading-7 font-mono text-emerald-300">
{`#include <stdio.h>

// Modifies the caller's actual variables through their memory addresses
void swap(int *a, int *b) {
    int temp = *a;  // Follow address 'a' to get original value
    *a = *b;        // Put value of 'b' into address 'a'
    *b = temp;      // Put saved value into address 'b'
}

int main() {
    int x = 10, y = 20;
    printf("Before: x = %d, y = %d\\n", x, y);

    swap(&x, &y);   // Pass addresses of x and y

    printf("After:  x = %d, y = %d\\n", x, y); // Prints x = 20, y = 10!
    return 0;
}`}
          </pre>
        </section>

        {/* Section 5: Dynamic Memory Allocation */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            5. Dynamic Heap Memory: malloc(), calloc(), realloc(), and free()
          </h3>
          <p className="text-gray-700 leading-7">
            Standard arrays have a fixed size decided at compile time. In production, we don&apos;t know user inputs in advance. We use the heap to allocate memory at runtime:
          </p>

          <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 font-bold text-gray-700">
                <tr>
                  <th className="p-3 sm:p-4">Function</th>
                  <th className="p-3 sm:p-4">Signature</th>
                  <th className="p-3 sm:p-4">Purpose</th>
                  <th className="p-3 sm:p-4">Initialization</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-gray-800">
                <tr>
                  <td className="p-3 sm:p-4 font-mono font-bold text-blue-600">malloc()</td>
                  <td className="p-3 sm:p-4 font-mono text-xs">malloc(n * sizeof(type))</td>
                  <td className="p-3 sm:p-4">Allocates raw uninitialized byte block</td>
                  <td className="p-3 sm:p-4 text-rose-600 font-bold">Contains Garbage Values</td>
                </tr>
                <tr>
                  <td className="p-3 sm:p-4 font-mono font-bold text-purple-600">calloc()</td>
                  <td className="p-3 sm:p-4 font-mono text-xs">calloc(n, sizeof(type))</td>
                  <td className="p-3 sm:p-4">Allocates and zeroes out memory</td>
                  <td className="p-3 sm:p-4 text-emerald-600 font-bold">Zero-Initialized (0)</td>
                </tr>
                <tr>
                  <td className="p-3 sm:p-4 font-mono font-bold text-amber-600">realloc()</td>
                  <td className="p-3 sm:p-4 font-mono text-xs">realloc(ptr, new_size)</td>
                  <td className="p-3 sm:p-4">Expands or shrinks an existing block</td>
                  <td className="p-3 sm:p-4 text-slate-600">Preserves existing data</td>
                </tr>
                <tr>
                  <td className="p-3 sm:p-4 font-mono font-bold text-rose-600">free()</td>
                  <td className="p-3 sm:p-4 font-mono text-xs">free(ptr)</td>
                  <td className="p-3 sm:p-4">Releases heap memory back to OS</td>
                  <td className="p-3 sm:p-4 text-slate-600 font-bold">Must set ptr = NULL</td>
                </tr>
              </tbody>
            </table>
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
              Use-After-Free, Dangling Pointers &amp; Memory Leak Defense
            </h2>
          </div>
          <span className="text-xs font-bold text-purple-800 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            FAANG &amp; Architecture
          </span>
        </div>

        {/* Section 6: Dangerous Pointer Bugs & Mitigations */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            6. The Big Three Pointer Vulnerabilities
          </h3>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-4">
              <span className="text-xs font-black uppercase text-rose-800">1. Dangling Pointer</span>
              <p className="mt-2 text-xs text-gray-700 leading-relaxed">
                Occurs when you free memory (<code className="font-mono">free(p);</code>), but keep using <code className="font-mono">p</code>. The address points to freed space that another process may overwrite!
              </p>
              <div className="mt-3 rounded-lg bg-white p-2 font-mono text-[11px] text-rose-700 border border-rose-200">
                free(p);<br />
                p = NULL; // Fix!
              </div>
            </div>

            <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-4">
              <span className="text-xs font-black uppercase text-rose-800">2. Double Free Error</span>
              <p className="mt-2 text-xs text-gray-700 leading-relaxed">
                Calling <code className="font-mono">free()</code> twice on the exact same pointer corrupts the heap metadata table, immediately crashing the program with a security abort.
              </p>
              <div className="mt-3 rounded-lg bg-white p-2 font-mono text-[11px] text-rose-700 border border-rose-200">
                free(p);<br />
                free(p); // CRASH!
              </div>
            </div>

            <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-4">
              <span className="text-xs font-black uppercase text-rose-800">3. Memory Leak</span>
              <p className="mt-2 text-xs text-gray-700 leading-relaxed">
                Allocating heap memory inside a loop without calling <code className="font-mono">free()</code>. Over hours, server RAM consumption climbs to 100% until the OS kernel kills the process.
              </p>
              <div className="mt-3 rounded-lg bg-white p-2 font-mono text-[11px] text-rose-700 border border-rose-200">
                Valgrind check:<br />
                valgrind --leak-check=full
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: FAANG Interview Problem - Linked List Inversion */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            7. FAANG Interview Standard: In-Place Singly Linked List Reversal
          </h3>
          <p className="text-gray-700 leading-7 mb-4">
            A quintessential Google and Microsoft interview question: <em>&quot;Reverse a singly linked list in $O(N)$ time and $O(1)$ auxiliary space using pointer manipulation.&quot;</em>
          </p>

          <pre className="overflow-x-auto rounded-2xl bg-slate-900 border border-slate-800 p-6 text-sm leading-7 font-mono text-emerald-300">
{`struct Node {
    int val;
    struct Node *next;
};

// 3-Pointer In-Place Reversal Algorithm
struct Node* reverseList(struct Node *head) {
    struct Node *prev = NULL;
    struct Node *curr = head;
    struct Node *next = NULL;

    while (curr != NULL) {
        next = curr->next;  // 1. Save next node
        curr->next = prev;  // 2. Reverse pointer direction
        prev = curr;        // 3. Move prev forward
        curr = next;        // 4. Move curr forward
    }
    return prev; // New head of reversed list
}`}
          </pre>
          <div className="mt-4 rounded-xl border border-purple-200 bg-purple-50/70 p-4 text-xs text-purple-900">
            <strong>Complexity:</strong> Time: $O(N)$ — single pass traversal | Space: $O(1)$ — zero auxiliary heap memory allocated.
          </div>
        </section>

        {/* Section 8: Capstone Student Record Management System */}
        <section className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-black text-gray-950 mb-4">
            8. Foundation Capstone: Dynamic Pointer-Driven Student System
          </h3>
          <p className="text-gray-700 leading-7 mb-4">
            Here is the complete production architecture assembling structs, pointers, dynamic memory allocation, and input processing:
          </p>

          <pre className="overflow-x-auto rounded-2xl bg-slate-900 border border-slate-800 p-6 text-sm leading-7 font-mono text-emerald-300">
{`#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Student Record Structure
typedef struct {
    int id;
    char name[50];
    float marks;
} Student;

// Function using pointer to update student marks directly
void updateMarks(Student *s, float newMarks) {
    if (s != NULL) {
        s->marks = newMarks; // Arrow operator dereferences pointer and accesses member!
    }
}

int main() {
    int count = 3;

    // Dynamically allocate array of 3 students on the Heap
    Student *roster = (Student *)malloc(count * sizeof(Student));
    if (roster == NULL) {
        printf("Memory allocation failed!\\n");
        return 1;
    }

    // Populate records using pointer indexing
    roster[0].id = 101; strcpy(roster[0].name, "Aarav Sharma"); roster[0].marks = 88.5;
    roster[1].id = 102; strcpy(roster[1].name, "Priya Patel");  roster[1].marks = 94.0;
    roster[2].id = 103; strcpy(roster[2].name, "Rohan Verma");  roster[2].marks = 76.5;

    // Apply grace mark bonus via pointer
    updateMarks(&roster[2], 82.0);

    printf("=== CampusGrow Student Management System ===\\n\\n");
    float sum = 0;
    for (int i = 0; i < count; i++) {
        printf("ID: %d | Name: %-15s | Marks: %.1f\\n",
               (roster + i)->id, (roster + i)->name, (roster + i)->marks);
        sum += (roster + i)->marks;
    }

    printf("\\nClass Average: %.2f%%\\n", sum / count);

    // Clean up heap memory to prevent memory leaks!
    free(roster);
    roster = NULL;

    printf("Heap memory successfully reclaimed. Zero leaks! 🚀\\n");
    return 0;
}`}
          </pre>

          <div className="mt-5 rounded-2xl border border-emerald-300 bg-emerald-50/80 p-5">
            <p className="text-xs font-black uppercase text-emerald-900 tracking-wider">🎉 Milestone Mastered!</p>
            <p className="mt-1 text-xs sm:text-sm text-gray-900 leading-relaxed font-medium">
              You have mastered the complete journey of systems programming — from variables and memory addresses to heap allocation, struct pointers, and memory hygiene. You are fully prepared for Data Structures and Algorithms!
            </p>
          </div>
        </section>
      </div>
    </LessonPage>
  );
}
