"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import MobileNav from "@/components/MobileNav";
import AmbientBackground from "@/components/AmbientBackground";
import {
  generateInteractiveCurriculumMentorReply,
  MentorMode,
  StudentProfile,
  InteractiveMentorResult,
} from "@/lib/mentorKnowledgeEngine";

type MentorPersona = "eli5" | "architect" | "faang" | "doctor";

interface ChatMessage {
  id: string;
  sender: "mentor" | "student";
  text: string;
  timestamp: string;
  source?: "gemini" | "gemini-raw" | "local-engine";
  analogy?: string;
  visualDiagram?: string;
  codeSnippet?: { lang: string; code: string; title?: string };
  quiz?: {
    question: string;
    options: string[];
    correct: string;
    explanation: string;
  };
  selectedQuizAnswer?: string;
  followUps?: string[];
  lessonId?: string;
  lessonTitle?: string;
}

const PERSONA_CONFIGS: Record<
  MentorPersona,
  { name: string; title: string; icon: string; desc: string; badgeColor: string }
> = {
  eli5: {
    name: "ELI5 Analogy Master",
    title: "Intuitive & Real-World",
    icon: "🐣",
    desc: "Explains complex code through pizza deliveries, traffic lights, and everyday objects.",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
  },
  architect: {
    name: "Senior FAANG Architect",
    title: "Production Systems",
    icon: "👨‍🏫",
    desc: "Teaches high-scale distributed systems, design patterns, clean code, and trade-offs.",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-300",
  },
  faang: {
    name: "Placement Interviewer",
    title: "FAANG OA & Big-O",
    icon: "💼",
    desc: "Drills edge cases, time/space complexity, 10⁸ operations limits, and interview traps.",
    badgeColor: "bg-rose-100 text-rose-800 border-rose-300",
  },
  doctor: {
    name: "Code Doctor & Bug Buster",
    title: "Debugging & Errors",
    icon: "🛠️",
    desc: "Diagnoses segmentation faults, compiler errors, memory leaks, and fixes broken code.",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
  },
};

const CURRICULUM_TOPIC_PILLS = [
  { label: "💡 C Pointers & Memory", prompt: "Explain how pointers and memory work in C with an everyday real-world analogy." },
  { label: "⚡ Dynamic Programming", prompt: "How do I identify state transitions and solve 0/1 Knapsack with DP?" },
  { label: "🌐 Graph & Dijkstra", prompt: "Explain Dijkstra's shortest path algorithm step-by-step with an analogy." },
  { label: "🗄️ B+ Tree Indexing", prompt: "How do B+ Trees and database indexes speed up SQL queries under the hood?" },
  { label: "🧵 Mutexes & Semaphores", prompt: "Explain the difference between a Mutex and a Semaphore in operating systems." },
  { label: "▲ Next.js RSC & Actions", prompt: "How do React Server Components (RSC) and Server Actions work in Next.js?" },
  { label: "🤖 Transformers & RAG", prompt: "Explain how Scaled Dot-Product Attention and Vector RAG work in GenAI." },
  { label: "☁️ Docker & Kubernetes", prompt: "Explain containerization and how Kubernetes orchestrates pods." },
  { label: "📬 Kafka & Message Queues", prompt: "How does Apache Kafka ensure message ordering and consumer group scaling?" },
  { label: "🏛️ Distributed Rate Limiter", prompt: "How do I design a distributed rate limiter using Redis and sliding windows?" },
  { label: "💼 Placement OA Sprints", prompt: "What high-yield coding patterns should I master for 15-40 LPA campus tests?" },
  { label: "🛠️ Fix Merge Conflict", prompt: "How do I fix a Git merge conflict in simple steps?" },
];

export default function MentorPage() {
  const router = useRouter();
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const [studentName, setStudentName] = useState("Student");
  const [studentBranch, setStudentBranch] = useState("CSE");
  const [studentYear, setStudentYear] = useState("");
  const [studentGoal, setStudentGoal] = useState("");
  const [studentInterests, setStudentInterests] = useState<string[]>([]);
  const [completedCount, setCompletedCount] = useState(0);

  const [persona, setPersona] = useState<MentorPersona>("eli5");
  const [mode, setMode] = useState<MentorMode>("EXPLAIN");
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-welcome",
      sender: "mentor",
      source: "local-engine",
      text: `👋 **Welcome to your Interactive AI Engineering Study Mentor!**

I am ready to guide you across **60+ engineering curriculum modules** spanning Year 1 Foundations, Year 2 Core Computer Science, Year 3 Specializations, and Year 4 Placements & High-Scale System Design.

### 🌟 Mentor Capabilities:
- 💡 **Everyday Real-World Analogies**: Abstract memory, pointers, and algorithms made immediately intuitive.
- 📊 **Visual Memory Models**: ASCII diagrams showing exactly how RAM, pointers, and pipelines flow.
- 💻 **1-Click Terminal Practice**: Run any code snippet directly in our built-in web terminal.
- 🔊 **Voice Narration**: Listen to any explanation aloud with the **Read Aloud** button.
- 🧠 **Interactive Pop Quizzes**: Instant clickable checkpoints directly in the chat stream!

Choose a mentor persona above or pick a topic below to begin!`,
      timestamp: "Just now",
      followUps: [
        "💡 Explain pointers with an everyday analogy",
        "⚡ How does Dynamic Programming work?",
        "🏛️ How does Redis caching work in System Design?",
        "💼 What coding patterns appear in FAANG OA rounds?",
      ],
    },
  ]);

  // Load student profile & completed modules
  useEffect(() => {
    try {
      const savedStudent = localStorage.getItem("studentData");
      if (savedStudent) {
        const parsed = JSON.parse(savedStudent);
        if (parsed.name) setStudentName(parsed.name);
        if (parsed.branch) setStudentBranch(parsed.branch);
        if (typeof parsed.year === "string") setStudentYear(parsed.year);
        if (typeof parsed.goal === "string") setStudentGoal(parsed.goal);
        if (Array.isArray(parsed.interests)) {
          setStudentInterests(
            parsed.interests.filter((i: unknown): i is string => typeof i === "string")
          );
        }
      }

      const completed = JSON.parse(
        localStorage.getItem("completedLessons") || "[]"
      );
      if (Array.isArray(completed)) setCompletedCount(completed.length);
    } catch {
      // Ignore
    }
  }, []);

  // Auto-scroll chat stream
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Clean up speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const modeDescriptions: Record<MentorMode, { title: string; prompt: string }> = {
    EXPLAIN: {
      title: "Explain Concept",
      prompt: "Explain pointers and memory in C using an intuitive everyday analogy.",
    },
    HINT: {
      title: "Get a Hint",
      prompt: "Give me a gentle hint on how to reverse a linked list without giving away the full answer.",
    },
    DEBUG: {
      title: "Debug Error",
      prompt: "Why am I getting 'segmentation fault' when reading a string in C?",
    },
    PRACTICE: {
      title: "Practice Challenge",
      prompt: "Give me a practical challenge on binary search with edge cases.",
    },
    QUIZ: {
      title: "Interactive Pop Quiz",
      prompt: "Test my understanding of SQL JOINs and ACID transactions with a quiz.",
    },
    PROJECT: {
      title: "Project Guidance",
      prompt: "How should I structure a full-stack student portal with React and a REST API?",
    },
    ROADMAP: {
      title: "Roadmap Advice",
      prompt: `What should I focus on next as a ${studentBranch} student?`,
    },
    CAREER: {
      title: "Placement Mastery",
      prompt: "What high-yield coding topics do top tech companies test in campus OA rounds?",
    },
  };

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend ?? input).trim();
    if (!query || isTyping) return;

    const studentMsg: ChatMessage = {
      id: `msg-student-${Date.now()}`,
      sender: "student",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, studentMsg]);
    setInput("");
    setIsTyping(true);

    const profile: StudentProfile = {
      name: studentName,
      branch: studentBranch,
      year: studentYear,
      goal: studentGoal,
      interests: studentInterests,
      completedLessons: completedCount,
    };

    try {
      // Call backend AI Mentor endpoint
      const res = await fetch("/api/mentor/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          mode,
          persona,
          profile,
          history: messages.slice(-6).map((m) => ({
            sender: m.sender,
            text: m.text,
          })),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const result: InteractiveMentorResult = data.result;

        const mentorMsg: ChatMessage = {
          id: `msg-mentor-${Date.now()}`,
          sender: "mentor",
          source: data.source || "local-engine",
          text: result.text,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          analogy: result.analogy,
          visualDiagram: result.visualDiagram,
          codeSnippet: result.codeSnippet,
          quiz: result.quiz,
          followUps: result.followUps,
          lessonId: result.lessonId,
          lessonTitle: result.lessonTitle,
        };

        setMessages((prev) => [...prev, mentorMsg]);
        setIsTyping(false);
        return;
      }
    } catch (e) {
      console.warn("API call failed, falling back to local engine:", e);
    }

    // High-speed fallback
    const result = generateInteractiveCurriculumMentorReply(query, mode, profile);
    const mentorMsg: ChatMessage = {
      id: `msg-mentor-${Date.now()}`,
      sender: "mentor",
      source: "local-engine",
      text: result.text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      analogy: result.analogy,
      visualDiagram: result.visualDiagram,
      codeSnippet: result.codeSnippet,
      quiz: result.quiz,
      followUps: result.followUps,
      lessonId: result.lessonId,
      lessonTitle: result.lessonTitle,
    };

    setMessages((prev) => [...prev, mentorMsg]);
    setIsTyping(false);
  };

  // Text to speech voice narration
  const handleSpeak = (id: string, text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("Text-to-speech is not supported in this browser.");
      return;
    }

    if (speakingMessageId === id) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
      return;
    }

    window.speechSynthesis.cancel();
    // Clean markdown characters for smooth speech
    const cleanSpeech = text
      .replace(/[*#`_~>\[\]\(\)]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanSpeech);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onend = () => setSpeakingMessageId(null);
    utterance.onerror = () => setSpeakingMessageId(null);

    setSpeakingMessageId(id);
    window.speechSynthesis.speak(utterance);
  };

  // Click option in interactive quiz
  const handleSelectQuizAnswer = (messageId: string, optionKey: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === messageId) {
          return {
            ...msg,
            selectedQuizAnswer: optionKey,
          };
        }
        return msg;
      })
    );
  };

  // Pre-load code into terminal and navigate
  const handleOpenInTerminal = (code: string, lang?: string, title?: string) => {
    try {
      sessionStorage.setItem("terminal_preload_code", code);
      sessionStorage.setItem("terminal_preload_lang", lang || "c");
      sessionStorage.setItem("terminal_preload_title", title || "Practice Code");
    } catch {
      // Ignore
    }
    router.push("/terminal");
  };

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const handleClearChat = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
    }
    setMessages([
      {
        id: `msg-reset-${Date.now()}`,
        sender: "mentor",
        source: "local-engine",
        text: `Conversation reset! What topic across our 60+ curriculum lessons would you like to explore, ${studentName}?`,
        timestamp: "Just now",
        followUps: [
          "💡 Explain pointers with an everyday analogy",
          "⚡ Explain Dynamic Programming state transitions",
          "🗄️ Explain database indexing and B+ Trees",
          "🌐 What is the difference between TCP and UDP?",
        ],
      },
    ]);
  };

  // Export full chat as markdown study notes
  const handleExportChat = () => {
    const mdContent = messages
      .map((m) => {
        const speaker = m.sender === "student" ? `### 👤 ${studentName}` : `### 🤖 AI Mentor (${PERSONA_CONFIGS[persona].name})`;
        let body = `${speaker} [${m.timestamp}]\n\n${m.text}`;
        if (m.analogy) body += `\n\n> 💡 **Analogy**: ${m.analogy}`;
        if (m.visualDiagram) body += `\n\n\`\`\`text\n${m.visualDiagram}\n\`\`\``;
        if (m.codeSnippet) body += `\n\n\`\`\`${m.codeSnippet.lang}\n${m.codeSnippet.code}\n\`\`\``;
        return body;
      })
      .join("\n\n---\n\n");

    const blob = new Blob([`# CampusGrow Study Notes\nDate: ${new Date().toLocaleDateString()}\n\n` + mdContent], {
      type: "text/markdown",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `CampusGrow-Mentor-Notes-${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AmbientBackground intensity="mentor">
      <div className="flex-1 min-h-screen bg-transparent text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-white/80 dark:bg-[#101B2D]/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/10 px-5 lg:px-8 py-3.5 shrink-0 transition-colors">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 font-bold text-lg shadow-2xs">
                💡
              </span>
              <div>
                <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  Interactive AI Study Mentor
                  <span className="text-[10px] font-black uppercase text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-md">
                    60+ Modules Trained
                  </span>
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Everyday analogies • Visual memory models • Voice narration • Live terminal sandbox
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportChat}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 transition shadow-2xs cursor-pointer"
              title="Download conversation notes"
            >
              <span>📥</span>
              <span>Export Notes</span>
            </button>

            <Link
              href="/terminal"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition shadow-2xs"
            >
              <span>💻</span>
              <span>Open Terminal</span>
            </Link>

            <button
              onClick={handleClearChat}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 transition cursor-pointer"
              title="Reset conversation"
            >
              🔄 New Chat
            </button>

            <MobileNav breakpoint="lg" />
          </div>
        </div>
      </header>

      {/* Main Chat Container */}
      <div className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-5 flex flex-col min-h-0">
        {/* Mentor Persona Selector */}
        <div className="bg-white/80 dark:bg-[#101B2D]/85 backdrop-blur-xl rounded-2xl border border-slate-200/80 dark:border-white/10 p-3 shadow-xs shrink-0 mb-3 transition-colors">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-white/5">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <span>🎭</span> Select Mentor Persona:
            </span>
            <span className="text-[11px] font-semibold text-purple-700 dark:text-purple-300">
              {PERSONA_CONFIGS[persona].desc}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(Object.keys(PERSONA_CONFIGS) as MentorPersona[]).map((p) => {
              const cfg = PERSONA_CONFIGS[p];
              const isSelected = persona === p;
              return (
                <button
                  key={p}
                  onClick={() => setPersona(p)}
                  className={`flex items-center gap-2 p-2.5 rounded-xl border text-left transition cursor-pointer ${
                    isSelected
                      ? "border-[#13C995] bg-[#13C995]/10 dark:bg-[#13C995]/15 ring-1 ring-[#13C995]/30 shadow-xs"
                      : "border-slate-200/80 dark:border-white/10 bg-white/60 dark:bg-white/[0.02] hover:bg-slate-50 dark:hover:bg-white/5 hover:border-slate-300 dark:hover:border-white/20"
                  }`}
                >
                  <span className="text-2xl shrink-0">{cfg.icon}</span>
                  <div className="min-w-0">
                    <p className={`text-xs font-black truncate ${isSelected ? "text-emerald-950 dark:text-emerald-300" : "text-slate-800 dark:text-slate-200"}`}>
                      {cfg.name}
                    </p>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate font-medium">
                      {cfg.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mentor Mode Selector Tabs */}
        <div className="bg-white/80 dark:bg-[#101B2D]/85 backdrop-blur-xl rounded-2xl border border-slate-200/80 dark:border-white/10 p-2.5 shadow-sm shrink-0 transition-colors">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            {(
              [
                "EXPLAIN",
                "HINT",
                "DEBUG",
                "PRACTICE",
                "QUIZ",
                "PROJECT",
                "ROADMAP",
                "CAREER",
              ] as MentorMode[]
            ).map((m) => {
              const isSelected = mode === m;
              return (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? "bg-gradient-to-r from-[#13C995] to-[#55C8FF] text-slate-950 font-black shadow-sm shadow-emerald-500/20"
                      : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {modeDescriptions[m].title}
                </button>
              );
            })}
          </div>

          {/* Quick Prompt Suggestion */}
          <div className="mt-2 pt-2 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
            <span className="font-medium hidden sm:inline">Suggested question for {modeDescriptions[mode].title}:</span>
            <button
              onClick={() => handleSend(modeDescriptions[mode].prompt)}
              className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-semibold hover:underline truncate text-left cursor-pointer"
            >
              "{modeDescriptions[mode].prompt}" →
            </button>
          </div>
        </div>

        {/* Curriculum Topic Quick Pills */}
        <div className="mt-3 overflow-x-auto pb-1 shrink-0">
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            {CURRICULUM_TOPIC_PILLS.map((pill, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(pill.prompt)}
                className="px-3 py-1 rounded-full text-[11px] font-semibold bg-white/80 dark:bg-[#101B2D]/80 backdrop-blur-md hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-300 border border-slate-200/80 dark:border-white/10 hover:border-emerald-300 dark:hover:border-emerald-600 shadow-2xs transition cursor-pointer"
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Stream Area */}
        <div className="mt-3.5 flex-1 overflow-y-auto space-y-5 p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-[#101B2D]/70 backdrop-blur-xl shadow-sm min-h-[380px] transition-colors">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === "student" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`max-w-3xl rounded-2xl p-4 sm:p-5 ${
                  msg.sender === "student"
                    ? "bg-gradient-to-r from-[#13C995] to-[#0FA87D] text-slate-950 font-medium rounded-br-none shadow-md shadow-emerald-500/20"
                    : "bg-white dark:bg-[#0B1220]/90 backdrop-blur-md text-slate-900 dark:text-slate-100 border border-slate-200/80 dark:border-white/10 rounded-bl-none shadow-sm"
                }`}
              >
                {/* Header label */}
                <div className="flex items-center justify-between gap-3 mb-2.5 text-[11px] font-mono">
                  <div className="flex items-center gap-2">
                    <span className="font-bold flex items-center gap-1.5">
                      {msg.sender === "student" ? `👤 ${studentName}` : `${PERSONA_CONFIGS[persona].icon} ${PERSONA_CONFIGS[persona].name}`}
                    </span>
                    {msg.source && msg.sender === "mentor" && (
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-200/80 dark:bg-white/10 text-slate-600 dark:text-slate-300">
                        {msg.source.startsWith("gemini") ? "✨ Gemini AI" : "⚡ Knowledge Engine"}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {msg.sender === "mentor" && (
                      <button
                        onClick={() => handleSpeak(msg.id, msg.text)}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold transition cursor-pointer ${
                          speakingMessageId === msg.id
                            ? "bg-emerald-500 text-slate-950 animate-pulse font-black"
                            : "bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-slate-700 dark:text-slate-300"
                        }`}
                        title="Read aloud"
                      >
                        {speakingMessageId === msg.id ? "⏹ Stop" : "🔊 Listen"}
                      </button>
                    )}
                    <span className="opacity-70">{msg.timestamp}</span>
                  </div>
                </div>

                {/* 1. Everyday Real-World Analogy Card (if present) */}
                {msg.analogy && (
                  <div className="mb-3.5 p-3.5 rounded-xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/15 border border-amber-500/30 text-slate-800 dark:text-amber-100 shadow-2xs">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-base">💡</span>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300">
                        Everyday Real-World Analogy (Intuitive Picture)
                      </h4>
                    </div>
                    <p className="text-xs leading-relaxed text-amber-950 dark:text-amber-100 font-normal">
                      {msg.analogy}
                    </p>
                  </div>
                )}

                {/* 2. Visual Mental Model / Diagram (if present) */}
                {msg.visualDiagram && (
                  <div className="mb-3.5 p-3 rounded-xl bg-[#070C15] border border-cyan-500/20 text-slate-200 shadow-2xs">
                    <div className="flex items-center justify-between mb-1.5 text-[11px] text-cyan-400 font-mono font-bold">
                      <span>📊 Visual Mental Model</span>
                      <span className="text-slate-500">ASCII Architecture</span>
                    </div>
                    <pre className="text-xs font-mono overflow-x-auto text-emerald-300 leading-5">
                      {msg.visualDiagram}
                    </pre>
                  </div>
                )}

                {/* 3. Main Explanation Markdown Content */}
                <div className="text-sm leading-relaxed space-y-2">
                  <ReactMarkdown
                    components={{
                      h1: ({ children }) => <h1 className="mb-2 mt-3 text-lg font-bold first:mt-0 text-slate-900 dark:text-white">{children}</h1>,
                      h2: ({ children }) => <h2 className="mb-2 mt-3 text-base font-bold first:mt-0 text-slate-900 dark:text-white">{children}</h2>,
                      h3: ({ children }) => <h3 className="mb-1.5 mt-2.5 text-sm font-bold first:mt-0 text-emerald-600 dark:text-emerald-400">{children}</h3>,
                      h4: ({ children }) => <h4 className="mb-1 mt-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">{children}</h4>,
                      p: ({ children }) => <p className="mb-2.5 last:mb-0 text-slate-800 dark:text-slate-200">{children}</p>,
                      ul: ({ children }) => <ul className="mb-2.5 list-disc space-y-1 pl-5 last:mb-0 text-slate-800 dark:text-slate-200">{children}</ul>,
                      ol: ({ children }) => <ol className="mb-2.5 list-decimal space-y-1 pl-5 last:mb-0 text-slate-800 dark:text-slate-200">{children}</ol>,
                      li: ({ children }) => <li className="pl-1">{children}</li>,
                      blockquote: ({ children }) => (
                        <blockquote className="my-2.5 border-l-4 border-emerald-500 bg-emerald-500/10 p-2.5 rounded-r-lg text-slate-700 dark:text-slate-300 italic">
                          {children}
                        </blockquote>
                      ),
                      pre: ({ children }) => (
                        <pre className="my-3 overflow-x-auto rounded-xl bg-[#070C15] p-3.5 text-xs text-emerald-300 font-mono border border-slate-800">
                          {children}
                        </pre>
                      ),
                      code: ({ className, children, ...props }) => (
                        <code
                          className={className ? "font-mono text-emerald-300" : "rounded bg-slate-200 dark:bg-white/10 px-1 py-0.5 font-mono text-[0.88em] text-emerald-700 dark:text-emerald-300"}
                          {...props}
                        >
                          {children}
                        </code>
                      ),
                      table: ({ children }) => (
                        <div className="overflow-x-auto my-3">
                          <table className="min-w-full text-xs border border-slate-300 dark:border-white/10 bg-white dark:bg-[#0B1220] rounded-lg">
                            {children}
                          </table>
                        </div>
                      ),
                      th: ({ children }) => <th className="border border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-white/5 p-2 font-bold text-left text-slate-900 dark:text-white">{children}</th>,
                      td: ({ children }) => <td className="border border-slate-300 dark:border-white/10 p-2 text-slate-800 dark:text-slate-200">{children}</td>,
                      a: ({ children, href }) => {
                        if (href && href.startsWith("/")) {
                          return (
                            <Link href={href} className="text-emerald-600 dark:text-emerald-400 font-bold underline hover:text-emerald-500 inline-flex items-center gap-1">
                              {children}
                            </Link>
                          );
                        }
                        return (
                          <a href={href} target="_blank" rel="noreferrer" className="text-emerald-600 dark:text-emerald-400 underline font-semibold hover:text-emerald-500">
                            {children}
                          </a>
                        );
                      },
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                </div>

                {/* 4. Interactive Code Snippet Card with One-Click Terminal Practice */}
                {msg.codeSnippet && (
                  <div className="mt-3.5 rounded-xl border border-slate-800 bg-[#070C15] overflow-hidden shadow-sm">
                    <div className="bg-slate-900/90 px-3.5 py-2 flex items-center justify-between text-xs text-slate-300 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-emerald-400 font-bold">
                          {msg.codeSnippet.title || "Interactive Code Sandbox"}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 uppercase font-mono">
                          {msg.codeSnippet.lang}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopyCode(msg.id, msg.codeSnippet!.code)}
                          className="text-[11px] px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
                        >
                          {copiedCodeId === msg.id ? "✓ Copied" : "Copy"}
                        </button>
                        <button
                          onClick={() => handleOpenInTerminal(msg.codeSnippet!.code, msg.codeSnippet!.lang, msg.codeSnippet!.title)}
                          className="flex items-center gap-1 px-2.5 py-0.5 rounded bg-[#13C995] hover:bg-emerald-400 text-slate-950 font-bold text-[11px] shadow-sm transition cursor-pointer"
                        >
                          <span>▶ Practice in Terminal</span>
                        </button>
                      </div>
                    </div>
                    <pre className="p-3.5 text-xs font-mono text-emerald-300 overflow-x-auto leading-5">
                      {msg.codeSnippet.code}
                    </pre>
                  </div>
                )}

                {/* 5. Interactive Multiple-Choice Quiz Box */}
                {msg.quiz && (
                  <div className="mt-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-slate-900 dark:text-slate-100 shadow-2xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-black uppercase tracking-wider text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                        <span>🧠</span> Pop Quiz: Test Your Understanding
                      </span>
                      {msg.selectedQuizAnswer && (
                        <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                          Answered
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white mb-2.5">
                      {msg.quiz.question}
                    </p>
                    <div className="space-y-1.5">
                      {msg.quiz.options.map((opt, oIdx) => {
                        const isSelected = msg.selectedQuizAnswer === opt;
                        const isCorrect = opt === msg.quiz!.correct;
                        const hasAnswered = Boolean(msg.selectedQuizAnswer);

                        let btnStyle = "border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200";
                        if (hasAnswered) {
                          if (isCorrect) {
                            btnStyle = "border-emerald-500 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-950 dark:text-emerald-200 font-bold";
                          } else if (isSelected && !isCorrect) {
                            btnStyle = "border-rose-400 bg-rose-50 dark:bg-rose-950/50 text-rose-900 dark:text-rose-200 line-through";
                          } else {
                            btnStyle = "border-slate-200/60 dark:border-white/5 bg-white/40 dark:bg-white/[0.02] opacity-60 text-slate-700 dark:text-slate-400";
                          }
                        }

                        return (
                          <button
                            key={oIdx}
                            disabled={hasAnswered}
                            onClick={() => handleSelectQuizAnswer(msg.id, opt)}
                            className={`w-full text-left p-2.5 rounded-lg border text-xs transition flex items-center justify-between gap-2 cursor-pointer ${btnStyle}`}
                          >
                            <span>{opt}</span>
                            {hasAnswered && isCorrect && <span className="text-emerald-700 dark:text-emerald-400 font-bold">✓ Correct</span>}
                            {hasAnswered && isSelected && !isCorrect && <span className="text-rose-600 dark:text-rose-400 font-bold">✗ Incorrect</span>}
                          </button>
                        );
                      })}
                    </div>

                    {msg.selectedQuizAnswer && (
                      <div className="mt-2.5 pt-2 border-t border-emerald-500/20 text-[11px] leading-relaxed text-slate-700 dark:text-slate-300">
                        <strong className="text-emerald-900 dark:text-emerald-400">Explanation: </strong>
                        {msg.quiz.explanation}
                      </div>
                    )}
                  </div>
                )}

                {/* 6. Linked Curriculum Lesson Button (if mapped) */}
                {msg.lessonId && (
                  <div className="mt-3.5 flex items-center justify-between p-2.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs">
                    <div className="flex items-center gap-1.5">
                      <span>📖</span>
                      <span className="font-semibold text-emerald-950 dark:text-emerald-200">
                        Related Lesson: <strong className="font-bold">{msg.lessonTitle || msg.lessonId}</strong>
                      </span>
                    </div>
                    <Link
                      href={`/lessons/${msg.lessonId}`}
                      className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] shadow-2xs transition"
                    >
                      Study Module →
                    </Link>
                  </div>
                )}

                {/* 7. Suggested Follow-Up Prompts */}
                {msg.followUps && msg.followUps.length > 0 && (
                  <div className="mt-3.5 pt-3 border-t border-slate-200/60 dark:border-white/10">
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1.5 uppercase tracking-wider">
                      Suggested Follow-Ups:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.followUps.map((fu, fIdx) => (
                        <button
                          key={fIdx}
                          onClick={() => handleSend(fu)}
                          className="text-[11px] px-2.5 py-1 rounded-full bg-white dark:bg-white/5 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-slate-200 dark:border-white/10 hover:border-emerald-300 dark:hover:border-emerald-700 text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-300 transition font-medium cursor-pointer"
                        >
                          {fu}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-start gap-2">
              <div className="rounded-2xl rounded-bl-none border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-[#0B1220]/80 backdrop-blur-md p-4 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <span className="animate-spin text-sm text-[#13C995]">⚡</span>
                <span className="font-medium">Mentor is analyzing and generating step-by-step guidance...</span>
                <div className="flex gap-1 ml-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#13C995] animate-bounce" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#13C995] animate-bounce [animation-delay:0.2s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#13C995] animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="mt-3 flex items-center gap-2 shrink-0"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask ${PERSONA_CONFIGS[persona].name} any coding, system design, or interview doubt...`}
            className="flex-1 rounded-2xl border border-slate-300 dark:border-white/10 bg-white/90 dark:bg-[#101B2D]/90 backdrop-blur-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#13C995] shadow-xs"
          />

          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="rounded-2xl bg-gradient-to-r from-[#13C995] to-[#55C8FF] hover:brightness-110 px-6 py-3 text-sm font-black text-slate-950 shadow-md shadow-emerald-500/20 transition active:scale-95 disabled:opacity-40 cursor-pointer flex items-center gap-1.5"
          >
            <span>Send</span>
            <span>→</span>
          </button>
        </form>
      </div>
    </div>
    </AmbientBackground>
  );
}
