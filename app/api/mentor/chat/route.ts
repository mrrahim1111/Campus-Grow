import { NextRequest, NextResponse } from "next/server";
import {
  generateInteractiveCurriculumMentorReply,
  MentorMode,
  StudentProfile,
  InteractiveMentorResult,
} from "@/lib/mentorKnowledgeEngine";

export const runtime = "nodejs";

interface ChatRequestBody {
  message: string;
  mode?: MentorMode;
  persona?: "architect" | "eli5" | "faang" | "doctor";
  profile?: StudentProfile;
  history?: Array<{ sender: "mentor" | "student"; text: string }>;
}

const PERSONA_PROMPTS: Record<string, string> = {
  architect: `You are a Senior FAANG Principal Architect and College Mentor. You explain concepts through high-scale production systems, design trade-offs, scalability, and clean code principles. You are encouraging, highly practical, and always reference how top tech companies build software.`,
  eli5: `You are the ELI5 (Explain Like I'm 5) Analogy Master. You make any complex computer science or engineering concept crystal clear using everyday analogies (e.g., restaurants, traffic lights, postal systems, libraries). Avoid dry academic jargon without first providing a vivid mental picture.`,
  faang: `You are a Tough FAANG Placement Interviewer. You evaluate code efficiency, time & space Big-O complexity, tricky boundary edge cases, and online assessment (OA) traps. You challenge the student to think about scale, memory limits, and optimal algorithmic patterns.`,
  doctor: `You are a Code Doctor & Bug Buster. You specialize in diagnosing compiler errors, segmentation faults, memory leaks, and logical bugs. When given code or an error, you pinpoint the root cause line-by-line and explain exactly how to fix it defensively.`,
};

export async function POST(req: NextRequest) {
  try {
    const body: ChatRequestBody = await req.json();
    const { message, mode = "EXPLAIN", persona = "eli5", profile, history = [] } = body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    const trimmedMsg = message.trim();
    const apiKey = process.env.GEMINI_API_KEY;

    const studentProfile: StudentProfile = {
      name: profile?.name || "Student",
      branch: profile?.branch || "Computer Science",
      year: profile?.year || "Engineering",
      goal: profile?.goal || "Placements",
      interests: Array.isArray(profile?.interests) ? profile.interests : [],
      completedLessons: typeof profile?.completedLessons === "number" ? profile.completedLessons : 0,
    };

    // If Gemini API Key is configured, attempt live model generation
    if (apiKey) {
      try {
        const personaPrompt = PERSONA_PROMPTS[persona] || PERSONA_PROMPTS.eli5;
        const systemInstruction = `${personaPrompt}
You are the AI Engineering Study Mentor on CampusGrow — an interactive engineering platform with 60+ curriculum lessons across Year 1 (C, Python, Git/Terminal), Year 2 (DSA, OOP, DBMS, OS), Year 3 (Web, AI/ML, Cloud), and Year 4 (Placements, System Design, Capstone).

Student Context:
- Name: ${studentProfile.name}
- Branch: ${studentProfile.branch}
- Year: ${studentProfile.year}
- Ambition: ${studentProfile.goal}

Response Requirements:
Provide your response in valid JSON with this exact schema:
{
  "text": "Markdown formatted explanation. Concise, clear, engaging.",
  "analogy": "A short, vivid 2-3 sentence everyday real-world analogy.",
  "visualDiagram": "Optional ASCII text diagram illustrating data structure, memory layout, or flow.",
  "codeSnippet": {
    "lang": "c" | "python" | "javascript" | "sql" | "bash",
    "title": "Title of example",
    "code": "Clean, syntactically correct code snippet."
  },
  "quiz": {
    "question": "A 1-question check to test understanding of what you just explained.",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correct": "The exact matching text of the correct option",
    "explanation": "Why this option is correct."
  },
  "followUps": [
    "Suggested follow-up question 1",
    "Suggested follow-up question 2",
    "Suggested follow-up question 3"
  ]
}
Respond strictly with valid JSON. Do not wrap in backticks.`;

        // Format recent conversation history for Gemini
        const contents = [];
        const recentHistory = history.slice(-6);
        for (const h of recentHistory) {
          contents.push({
            role: h.sender === "mentor" ? "model" : "user",
            parts: [{ text: h.text }],
          });
        }
        contents.push({
          role: "user",
          parts: [{ text: `[Mode: ${mode}] ${trimmedMsg}` }],
        });

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents,
              systemInstruction: {
                parts: [{ text: systemInstruction }],
              },
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 1200,
                responseMimeType: "application/json",
              },
            }),
          }
        );

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const rawText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText) {
            try {
              const parsed: InteractiveMentorResult = JSON.parse(rawText);
              return NextResponse.json({
                source: "gemini",
                result: parsed,
              });
            } catch {
              // If JSON parsing failed, return text as main explanation
              return NextResponse.json({
                source: "gemini-raw",
                result: {
                  text: rawText,
                  followUps: [
                    "Can you give me a real-world analogy for this?",
                    "Give me a code example I can run in the terminal",
                    "How is this asked in placement technical interviews?",
                  ],
                },
              });
            }
          }
        }
      } catch (geminiErr) {
        console.warn("Gemini API call failed, falling back to local engine:", geminiErr);
      }
    }

    // High-fidelity fallback to the internal Knowledge Engine
    const offlineResult = generateInteractiveCurriculumMentorReply(
      trimmedMsg,
      mode,
      studentProfile
    );

    return NextResponse.json({
      source: "local-engine",
      result: offlineResult,
    });
  } catch (error) {
    console.error("Mentor chat error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
