"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import BrandLogo from "@/components/BrandLogo";
import { createClient } from "@/lib/supabase/client";

export default function Goal() {
  const [selectedGoal, setSelectedGoal] = useState("");
  const router = useRouter();

  const goals = [
    {
      id: "placement",
      title: "💼 Get a good placement",
      description:
        "Prepare myself for campus placements and a strong first job.",
    },
    {
      id: "internship",
      title: "🏢 Get an internship",
      description:
        "Build the skills and projects I need to land an internship.",
    },
    {
      id: "startup",
      title: "🚀 Build my own projects / startup",
      description:
        "Learn by building real products and explore entrepreneurship.",
    },
    {
      id: "technical",
      title: "🧠 Become technically strong",
      description:
        "Build a strong foundation and become confident with technology.",
    },
    {
      id: "abroad",
      title: "🌍 Prepare for opportunities abroad",
      description:
        "Build skills and experience for international opportunities.",
    },
    {
      id: "explore",
      title: "❓ I don't know which role is right for me",
      description:
        "Try short real-world practical tasks across 3 days to discover what suits you.",
    },
  ];

  const handleFinish = async (targetPath?: string) => {
    if (!selectedGoal) return;

    const existingData = localStorage.getItem("studentData");

    const studentData = existingData
      ? JSON.parse(existingData)
      : {};

    const updatedData = {
      ...studentData,
      goal: selectedGoal,
    };

    localStorage.setItem(
      "studentData",
      JSON.stringify(updatedData)
    );

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("student_data").upsert(
          {
            user_id: user.id,
            interests: updatedData.interests || [],
            goal: selectedGoal,
            knowledge_level: updatedData.knowledgeLevel || null,
          },
          { onConflict: "user_id" }
        );
      }
    } catch (err) {
      console.warn("Could not sync student_data to Supabase:", err);
    }

    if (targetPath) {
      router.push(targetPath);
    } else if (selectedGoal === "explore") {
      router.push("/discover-role");
    } else {
      router.push("/assessment");
    }
  };

  return (
    <main className="min-h-screen bg-white text-gray-900 flex flex-col">
      {/* Top Header with BrandLogo in Left Side Corner */}
      <header className="border-b border-gray-100 bg-white px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        <BrandLogo subtitle="Grow Beyond the Classroom." className="-ml-1" />
      </header>

      <div className="mx-auto max-w-2xl px-6 py-10 w-full flex-1">

        {/* Progress */}
        <p className="text-sm font-medium text-gray-500">
          Step 4 of 4
        </p>

        <div className="mt-3 h-2 w-full rounded-full bg-gray-200">
          <div className="h-2 w-full rounded-full bg-black"></div>
        </div>

        {/* Heading */}
        <div className="mt-12">
          <h1 className="text-4xl font-bold">
            What's your main goal? 🎯
          </h1>

          <p className="mt-3 text-lg text-gray-600">
            Choose the goal that matters most to you right now.
          </p>
        </div>

        {/* Goals */}
        <div className="mt-10 space-y-4">
          {goals.map((goal) => {
            const isSelected = selectedGoal === goal.id;

            return (
              <div key={goal.id}>
                <button
                  type="button"
                  onClick={() => setSelectedGoal(goal.id)}
                  className={`w-full rounded-2xl border p-5 text-left transition ${
                    isSelected
                      ? "border-black bg-gray-100"
                      : "border-gray-300 bg-white hover:border-black"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-semibold">
                        {goal.title}
                      </h2>

                      <p className="mt-1 text-gray-600">
                        {goal.description}
                      </p>
                    </div>

                    {isSelected && (
                      <span className="text-xl">✓</span>
                    )}
                  </div>
                </button>

                {/* DISCOVER YOUR ROLE MODAL / CALLOUT WHEN SELECTED */}
                {isSelected && goal.id === "explore" && (
                  <div className="mt-3 rounded-2xl border-2 border-emerald-500/50 bg-emerald-50/60 p-5 text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🚀</span>
                      <h3 className="text-base font-black text-gray-950">
                        DISCOVER YOUR ROLE 🚀
                      </h3>
                    </div>

                    <p className="mt-2 text-xs font-semibold text-gray-700">
                      Not sure whether you should become:
                    </p>

                    <div className="mt-2 grid grid-cols-2 gap-1.5 text-xs font-bold text-gray-900 sm:grid-cols-3">
                      <span>• AI/ML Engineer</span>
                      <span>• Full Stack Developer</span>
                      <span>• Data Analyst</span>
                      <span>• Cybersecurity Engineer</span>
                      <span>• Cloud/DevOps Engineer</span>
                      <span>• Software Developer</span>
                    </div>

                    <p className="mt-3 text-xs text-gray-600">
                      Don&apos;t worry. Try short real-world tasks and discover what suits you.
                    </p>

                    <button
                      type="button"
                      onClick={() => handleFinish("/discover-role")}
                      className="mt-4 w-full rounded-xl bg-emerald-500 hover:bg-emerald-400 py-3 text-sm font-black text-black shadow-md transition active:scale-95 cursor-pointer text-center"
                    >
                      Start 3-Day Role Discovery →
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Finish */}
        <button
          onClick={() => handleFinish()}
          disabled={!selectedGoal}
          className="mt-10 w-full rounded-xl bg-black px-6 py-4 text-lg font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {selectedGoal === "explore" ? "Start 3-Day Role Discovery →" : "Create My Learning Journey →"}
        </button>

      </div>
    </main>
  );
}
