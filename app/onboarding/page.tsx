"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import BrandLogo from "@/components/BrandLogo";

export default function Onboarding() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [branch, setBranch] = useState("");

  const handleContinue = () => {
    const studentData = {
      name,
      year,
      branch,
    };

    localStorage.setItem("studentData", JSON.stringify(studentData));

    router.push("/onboarding/knowledge");
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
          Step 1 of 4
        </p>

        <div className="mt-3 h-2 w-full rounded-full bg-gray-200">
          <div className="h-2 w-1/4 rounded-full bg-black"></div>
        </div>

        {/* Heading */}
        <div className="mt-12">
          <h1 className="text-4xl font-bold">
            Let&apos;s get to know you 👋
          </h1>

          <p className="mt-3 text-lg text-gray-600">
            Tell us a little about yourself so we can create
            a learning journey that fits you.
          </p>
        </div>

        {/* Form */}
        <div className="mt-10 space-y-6">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium">
              What&apos;s your name?
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
          </div>

          {/* Year */}
          <div>
            <label className="block text-sm font-medium">
              Which year are you in?
            </label>

            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3"
            >
              <option value="">Select your year</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
          </div>

          {/* Branch */}
          <div>
            <label className="block text-sm font-medium">
              What&apos;s your branch?
            </label>

            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3"
            >
              <option value="">Select your branch</option>

              <optgroup label="── Core Computer Science ──">
                <option value="CSC">CSC — Computer Science &amp; Engineering</option>
                <option value="IT">IT — Information Technology</option>
                <option value="IS">IS — Information Science &amp; Engineering</option>
                <option value="SE">SE — Software Engineering</option>
              </optgroup>

              <optgroup label="── AI &amp; Machine Learning ──">
                <option value="CAI">CAI — Computer Science &amp; Artificial Intelligence</option>
                <option value="CSM">CSM — Computer Science &amp; Machine Learning</option>
                <option value="AIML">AIML — Artificial Intelligence &amp; Machine Learning</option>
                <option value="AIE">AIE — Artificial Intelligence &amp; Engineering</option>
                <option value="DL">DL — Deep Learning &amp; Neural Networks</option>
              </optgroup>

              <optgroup label="── Data Science ──">
                <option value="AID">AID — Artificial Intelligence &amp; Data Science</option>
                <option value="CSD">CSD — Computer Science &amp; Data Science</option>
                <option value="DS">DS — Data Science &amp; Engineering</option>
                <option value="BD">BD — Big Data Analytics</option>
                <option value="BA">BA — Business Analytics &amp; Intelligence</option>
              </optgroup>

              <optgroup label="── Cyber Security ──">
                <option value="CSY">CSY — Computer Science &amp; Cyber Security</option>
                <option value="IS_CS">IS-CS — Information Security &amp; Cyber Security</option>
                <option value="NET">NET — Computer Networks &amp; Security</option>
                <option value="FD">FD — Forensic &amp; Digital Security</option>
              </optgroup>

              <optgroup label="── Cloud &amp; DevOps ──">
                <option value="CLD">CLD — Cloud Computing &amp; DevOps</option>
                <option value="CS_CLD">CS-CLD — Computer Science &amp; Cloud Technology</option>
                <option value="SYS">SYS — Systems &amp; Infrastructure Engineering</option>
              </optgroup>

              <optgroup label="── IoT &amp; Embedded Systems ──">
                <option value="IOT">IOT — Internet of Things</option>
                <option value="ECE">ECE — Electronics &amp; Communication Engineering</option>
                <option value="EEE">EEE — Electrical &amp; Electronics Engineering</option>
                <option value="EMB">EMB — Embedded Systems &amp; VLSI Design</option>
              </optgroup>

              <optgroup label="── Robotics &amp; Automation ──">
                <option value="RAI">RAI — Robotics &amp; Artificial Intelligence</option>
                <option value="RAE">RAE — Robotics &amp; Automation Engineering</option>
                <option value="ME_AI">ME-AI — Mechanical Engineering with AI</option>
              </optgroup>

              <optgroup label="── Computer Applications ──">
                <option value="BCA">BCA — Bachelor of Computer Applications</option>
                <option value="MCA">MCA — Master of Computer Applications</option>
                <option value="BIT">BIT — Bachelor of Information Technology</option>
              </optgroup>
            </select>
          </div>

        </div>

        {/* Continue */}
        <button
          onClick={handleContinue}
          disabled={!name || !year || !branch}
          className="mt-10 w-full rounded-xl bg-black px-6 py-4 text-lg font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Continue →
        </button>

      </div>
    </main>
  );
}