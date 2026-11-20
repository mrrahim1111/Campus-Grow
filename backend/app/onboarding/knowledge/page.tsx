"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import BrandLogo from "@/components/BrandLogo";

export default function Knowledge() {
  const [selectedLevel, setSelectedLevel] = useState("");
  const router = useRouter();

  const handleContinue = () => {
    if (!selectedLevel) return;

    const existingData = localStorage.getItem("studentData");

    const studentData = existingData
      ? JSON.parse(existingData)
      : {};

    const updatedData = {
      ...studentData,
      knowledgeLevel: selectedLevel,
    };

    localStorage.setItem("studentData", JSON.stringify(updatedData));

    router.push("/onboarding/interests");
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
          Step 2 of 4
        </p>

        <div className="mt-3 h-2 w-full rounded-full bg-gray-200">
          <div className="h-2 w-2/4 rounded-full bg-black"></div>
        </div>

        {/* Heading */}
        <div className="mt-12">
          <h1 className="text-4xl font-bold">
            What's your current level? 💻
          </h1>

          <p className="mt-3 text-lg text-gray-600">
            Don't worry if you're starting from zero.
            There are no wrong answers.
          </p>
        </div>

        {/* Options */}
        <div className="mt-10 space-y-4">

          <button
            onClick={() => setSelectedLevel("beginner")}
            className={`w-full rounded-2xl border p-5 text-left transition ${
              selectedLevel === "beginner"
                ? "border-black bg-gray-100"
                : "border-gray-300 bg-white hover:border-black"
            }`}
          >
            <h2 className="text-lg font-semibold">
              🌱 I'm completely new
            </h2>
            <p className="mt-1 text-gray-600">
              I don't know programming yet.
            </p>
          </button>

          <button
            onClick={() => setSelectedLevel("basic")}
            className={`w-full rounded-2xl border p-5 text-left transition ${
              selectedLevel === "basic"
                ? "border-black bg-gray-100"
                : "border-gray-300 bg-white hover:border-black"
            }`}
          >
            <h2 className="text-lg font-semibold">
              📘 I know the basics
            </h2>
            <p className="mt-1 text-gray-600">
              I understand basic programming concepts.
            </p>
          </button>

          <button
            onClick={() => setSelectedLevel("programming")}
            className={`w-full rounded-2xl border p-5 text-left transition ${
              selectedLevel === "programming"
                ? "border-black bg-gray-100"
                : "border-gray-300 bg-white hover:border-black"
            }`}
          >
            <h2 className="text-lg font-semibold">
              💻 I can write programs
            </h2>
            <p className="mt-1 text-gray-600">
              I can solve basic programming problems.
            </p>
          </button>

          <button
            onClick={() => setSelectedLevel("projects")}
            className={`w-full rounded-2xl border p-5 text-left transition ${
              selectedLevel === "projects"
                ? "border-black bg-gray-100"
                : "border-gray-300 bg-white hover:border-black"
            }`}
          >
            <h2 className="text-lg font-semibold">
              🚀 I already build projects
            </h2>
            <p className="mt-1 text-gray-600">
              I have experience building applications or websites.
            </p>
          </button>

        </div>

        {/* Continue */}
        <button
          onClick={handleContinue}
          disabled={!selectedLevel}
          className="mt-10 w-full rounded-xl bg-black px-6 py-4 text-lg font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Continue →
        </button>

      </div>
    </main>
  );
}