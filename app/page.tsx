"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import BrandLogo from "@/components/BrandLogo";
import UpgradeModal from "@/components/UpgradeModal";

export default function CompanyLandingPage() {
  // Sticky Navbar state
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Billing toggle (Monthly vs Annual)
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");

  // Upgrade modal state
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [selectedPlanFeature, setSelectedPlanFeature] = useState("CampusGrow Pro");

  // Waitlist modal state for physical kits
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistSuccess, setWaitlistSuccess] = useState(false);

  // Contact form state
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactCollege, setContactCollege] = useState("");
  const [contactCategory, setContactCategory] = useState("General Inquiry");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactError, setContactError] = useState("");

  // Video error fallback tracking
  const [heroVideoError, setHeroVideoError] = useState(false);

  // Core Duo Leadership State (2-member showcase inspired by Conicorn)
  const [activeTeamSlide, setActiveTeamSlide] = useState(0); // 0 = Member 1, 1 = Member 2

  // Member 1 State (Founder & CEO)
  const [founderName, setFounderName] = useState("Rahim");
  const [founderRole, setFounderRole] = useState("Founder & CEO");
  const [founderSubtitle, setFounderSubtitle] = useState("Product Vision & Platform Architecture");
  const [founderAvatar, setFounderAvatar] = useState(
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
  );
  const [isEditingFounder, setIsEditingFounder] = useState(false);
  const [tempFounderName, setTempFounderName] = useState("Rahim");
  const [tempFounderRole, setTempFounderRole] = useState("Founder & CEO");
  const [tempFounderSubtitle, setTempFounderSubtitle] = useState("Product Vision & Platform Architecture");

  // Member 2 State (COO & Co-Founder)
  const [member2Name, setMember2Name] = useState("Co-Founder");
  const [member2Role, setMember2Role] = useState("COO & Co-Founder");
  const [member2Subtitle, setMember2Subtitle] = useState("Backend Architecture, Cloud Systems & Operations");
  const [member2Avatar, setMember2Avatar] = useState(
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
  );
  const [isEditingMember2, setIsEditingMember2] = useState(false);
  const [tempMember2Name, setTempMember2Name] = useState("Co-Founder");
  const [tempMember2Role, setTempMember2Role] = useState("COO & Co-Founder");
  const [tempMember2Subtitle, setTempMember2Subtitle] = useState("Backend Architecture, Cloud Systems & Operations");

  useEffect(() => {
    try {
      // Load Member 1 (Rahim / Student)
      const savedStudent = localStorage.getItem("studentData");
      if (savedStudent) {
        const parsed = JSON.parse(savedStudent);
        if (parsed.name?.trim()) {
          setFounderName(parsed.name.trim());
          setTempFounderName(parsed.name.trim());
        }
      }
      const savedAvatar = localStorage.getItem("studentAvatar") || localStorage.getItem("founderAvatar");
      if (savedAvatar) {
        setFounderAvatar(savedAvatar);
      }
      const savedFounder = localStorage.getItem("founderProfile");
      if (savedFounder) {
        const parsed = JSON.parse(savedFounder);
        if (parsed.name) {
          setFounderName(parsed.name);
          setTempFounderName(parsed.name);
        }
        if (parsed.role) {
          setFounderRole(parsed.role);
          setTempFounderRole(parsed.role);
        }
        if (parsed.subtitle) {
          setFounderSubtitle(parsed.subtitle);
          setTempFounderSubtitle(parsed.subtitle);
        }
        if (parsed.avatar) setFounderAvatar(parsed.avatar);
      }

      // Load Member 2
      const savedMember2 = localStorage.getItem("member2Profile");
      if (savedMember2) {
        const parsed = JSON.parse(savedMember2);
        if (parsed.name) {
          setMember2Name(parsed.name);
          setTempMember2Name(parsed.name);
        }
        if (parsed.role) {
          setMember2Role(parsed.role);
          setTempMember2Role(parsed.role);
        }
        if (parsed.subtitle) {
          setMember2Subtitle(parsed.subtitle);
          setTempMember2Subtitle(parsed.subtitle);
        }
        if (parsed.avatar) setMember2Avatar(parsed.avatar);
      }
    } catch { }
  }, []);

  const handleFounderPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setFounderAvatar(reader.result);
        try {
          localStorage.setItem("founderAvatar", reader.result);
          localStorage.setItem("studentAvatar", reader.result);
        } catch { }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveFounderProfile = () => {
    setFounderName(tempFounderName);
    setFounderRole(tempFounderRole);
    setFounderSubtitle(tempFounderSubtitle);
    setIsEditingFounder(false);
    try {
      localStorage.setItem(
        "founderProfile",
        JSON.stringify({
          name: tempFounderName,
          role: tempFounderRole,
          subtitle: tempFounderSubtitle,
          avatar: founderAvatar,
        })
      );
    } catch { }
  };

  const handleMember2PhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setMember2Avatar(reader.result);
        try {
          localStorage.setItem("member2Avatar", reader.result);
        } catch { }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveMember2Profile = () => {
    setMember2Name(tempMember2Name);
    setMember2Role(tempMember2Role);
    setMember2Subtitle(tempMember2Subtitle);
    setIsEditingMember2(false);
    try {
      localStorage.setItem(
        "member2Profile",
        JSON.stringify({
          name: tempMember2Name,
          role: tempMember2Role,
          subtitle: tempMember2Subtitle,
          avatar: member2Avatar,
        })
      );
    } catch { }
  };

  // Navbar scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 24) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for scroll reveals
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const elements = document.querySelectorAll(".scroll-reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactError("");

    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
      setContactError("Please fill in your name, email, and message.");
      return;
    }

    setContactSubmitting(true);
    setTimeout(() => {
      setContactSubmitting(false);
      setContactSuccess(true);
      setContactName("");
      setContactEmail("");
      setContactCollege("");
      setContactMessage("");
    }, 800);
  };

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail.trim() || !waitlistEmail.includes("@")) return;
    setWaitlistSuccess(true);
  };

  // What We Do: 9 Offerings
  const offerings = [
    {
      id: "paths",
      title: "Engineering Learning Paths",
      icon: "🧭",
      subtitle: "Full 4-Year Branch Syllabi",
      desc: "Structured roadmaps tailored to 10 engineering specializations: Computer Science, IT, AI & Data Science, Machine Learning, Cybersecurity, Software Engineering, and IoT. Aligned with tier-1 college curriculum standards.",
      highlights: ["Semester-by-semester roadmaps", "Curriculum exam readiness", "Continuous knowledge graphs"],
      badge: "Syllabus Aligned",
    },
    {
      id: "languages",
      title: "Programming Languages",
      icon: "⚡",
      subtitle: "Systems to High-Level Stacks",
      desc: "Master low-level systems programming in C11 and modern C++ with dynamic memory allocators and Valgrind leak diagnostics. Transition seamlessly into Python 3, Java enterprise architecture, and Rust safety semantics.",
      highlights: ["C11 Pointer Arithmetic & Heap", "Python Data Pipelines", "Rust Concurrency & Safety"],
      badge: "Core Engineering",
    },
    {
      id: "ai-ml",
      title: "AI & Machine Learning",
      icon: "🧠",
      subtitle: "From Linear Algebra to LLMs",
      desc: "Demystify neural networks from first principles. Code gradient descent, compute tensor transformations, build computer vision models, and fine-tune Transformers with PyTorch.",
      highlights: ["Mathematical optimization", "Neural tensor operators", "PyTorch model distillation"],
      badge: "High Demand",
    },
    {
      id: "ai-tools",
      title: "AI Tools & Automation",
      icon: "🤖",
      subtitle: "Modern Agentic Tooling",
      desc: "Learn to build with modern AI developer tools. Configure declarative .cursorrules, orchestrate multi-agent pipelines, write automated test cases, and multiply your engineering velocity.",
      highlights: ["Cursor & Copilot masteries", "Agentic orchestration", "Automated code QA"],
      badge: "Next-Gen Dev",
    },
    {
      id: "web-app",
      title: "Web & App Development",
      icon: "🌐",
      subtitle: "Production Full-Stack Systems",
      desc: "Build scalable web applications with Next.js, React 19, TypeScript, Tailwind CSS, and Node.js microservices. Architect high-throughput REST and gRPC endpoints backed by PostgreSQL.",
      highlights: ["Server-Side Rendering (SSR)", "Micro-frontends & APIs", "Database indexing & caching"],
      badge: "Full-Stack",
    },
    {
      id: "cloud-devops",
      title: "Cloud & DevOps",
      icon: "☁️",
      subtitle: "Containerization to Kubernetes",
      desc: "Master Linux shell diagnostics, Docker containerization, Kubernetes cluster orchestration, and automated CI/CD deployment pipelines on modern cloud infrastructure.",
      highlights: ["Docker & Multi-stage builds", "Kubernetes pods & ingress", "GitHub Actions CI/CD"],
      badge: "Infrastructure",
    },
    {
      id: "security",
      title: "Cybersecurity & Networks",
      icon: "🛡️",
      subtitle: "Applied Cryptography & Defense",
      desc: "Inspect network traffic packet-by-packet with Wireshark, dissect cryptographic hashes, understand buffer overflow vulnerabilities, and design zero-trust application architectures.",
      highlights: ["Applied cryptography (RSA, AES)", "Binary memory auditing", "Network defense protocols"],
      badge: "Defense",
    },
    {
      id: "project-ide",
      title: "Project-Based Learning",
      icon: "💻",
      subtitle: "Zero-Setup Cloud IDE",
      desc: "Write, build, compile, and debug code directly in your browser with Project Hub IDE. Built with an authentic VS Code layout, line numbers gutter, and real-time terminal diagnostics.",
      highlights: ["Instant compilation in browser", "Integrated interactive CLI", "Automatic Git commit tracking"],
      badge: "Live Software",
    },
    {
      id: "career-prep",
      title: "Career & Interview Preparation",
      icon: "🎙️",
      subtitle: "FAANG SDE Simulator & ATS Scoring",
      desc: "Practice real-time speech and coding interview simulations with the AI technical interviewer. Evaluate Big-O algorithmic trade-offs and score your engineering resume against recruiter ATS filters.",
      highlights: ["AI Technical Mock Interview", "Real-time speech feedback", "ATS Resume scoring"],
      badge: "Placement Ready",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5FBF6] text-[#102B24] font-sans antialiased selection:bg-[#B9E4C9] selection:text-[#0B7650] relative overflow-x-hidden">

      {/* ── 0. BACKGROUND SUBTLE GRID PATTERN & AMBIENT MINT GLOW ───── */}
      <div
        className="fixed inset-0 pointer-events-none z-0 bg-[linear-gradient(to_right,#B9E4C918_1px,transparent_1px),linear-gradient(to_bottom,#B9E4C918_1px,transparent_1px)] bg-[size:44px_44px]"
        aria-hidden="true"
      />
      <div
        className="fixed -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-[#B9E4C9]/40 via-[#E8F5E9]/30 to-transparent blur-3xl pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* ── 1. MINIMAL STICKY NAVIGATION ────────────────────────────── */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled
          ? "bg-white/85 backdrop-blur-xl border-b border-[#B9E4C9]/60 shadow-[0_4px_24px_rgba(16,43,36,0.04)] py-3"
          : "bg-transparent py-5"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative h-9 w-9 rounded-xl bg-white border border-[#B9E4C9] flex items-center justify-center p-1.5 shadow-2xs group-hover:border-[#16865A] transition">
              <Image
                src="/campusgrow-icon.png"
                alt="CampusGrow"
                width={32}
                height={32}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-lg tracking-tight text-[#102B24] group-hover:text-[#16865A] transition">
                CampusGrow
              </span>
              <span className="text-[10px] font-semibold text-[#557267] -mt-1 hidden sm:block">
                Grow Beyond the Classroom
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1.5 bg-white/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#B9E4C9]/70 shadow-2xs">
            <a
              href="#hero"
              className="px-3.5 py-1.5 rounded-full text-xs font-bold text-[#557267] hover:text-[#102B24] hover:bg-[#E8F5E9] transition"
            >
              Home
            </a>
            <a
              href="#who-we-are"
              className="px-3.5 py-1.5 rounded-full text-xs font-bold text-[#557267] hover:text-[#102B24] hover:bg-[#E8F5E9] transition"
            >
              About
            </a>
            <a
              href="#why-we-exist"
              className="px-3.5 py-1.5 rounded-full text-xs font-bold text-[#557267] hover:text-[#102B24] hover:bg-[#E8F5E9] transition"
            >
              Why Us
            </a>
            <a
              href="#pricing"
              className="px-3.5 py-1.5 rounded-full text-xs font-bold text-[#557267] hover:text-[#102B24] hover:bg-[#E8F5E9] transition"
            >
              Pricing
            </a>
            <a
              href="#team"
              className="px-3.5 py-1.5 rounded-full text-xs font-bold text-[#557267] hover:text-[#102B24] hover:bg-[#E8F5E9] transition"
            >
              Team
            </a>
            <a
              href="#contact"
              className="px-3.5 py-1.5 rounded-full text-xs font-bold text-[#557267] hover:text-[#102B24] hover:bg-[#E8F5E9] transition"
            >
              Contact
            </a>
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden md:flex items-center gap-2.5">
            <Link
              href="/login"
              className="text-xs font-bold text-[#102B24] hover:text-[#16865A] px-3.5 py-2 rounded-full border border-transparent hover:border-[#B9E4C9] hover:bg-[#E8F5E9] transition"
            >
              Log In
            </Link>
            <Link
              href="/login?mode=signup"
              className="px-4 py-2 rounded-full bg-[#16865A] hover:bg-[#0B7650] text-white text-xs font-extrabold shadow-xs hover:shadow-md transition active:scale-95 flex items-center gap-1.5"
            >
              <span>Sign Up</span>
              <span className="text-emerald-200">→</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white border border-[#B9E4C9] text-[#102B24] hover:bg-[#E8F5E9] transition"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 mx-4 p-4 rounded-3xl bg-white/95 backdrop-blur-2xl border border-[#B9E4C9] shadow-xl space-y-3 animate-in fade-in zoom-in-95 duration-150">
            <nav className="flex flex-col space-y-1">
              {[
                { name: "Home", href: "#hero" },
                { name: "Who We Are", href: "#who-we-are" },
                { name: "Why We Exist", href: "#why-we-exist" },
                { name: "Subscriptions & Pricing", href: "#pricing" },
                { name: "Our Team", href: "#team" },
                { name: "Contact & Community", href: "#contact" },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-[#102B24] hover:bg-[#E8F5E9] transition"
                >
                  {item.name}
                </a>
              ))}
            </nav>
            <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex-1 py-2 rounded-xl text-center text-xs font-bold border border-[#B9E4C9] text-[#102B24] hover:bg-[#E8F5E9] transition"
              >
                Log In
              </Link>
              <Link
                href="/login?mode=signup"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex-1 py-2 rounded-xl text-center text-xs font-bold bg-[#16865A] text-white hover:bg-[#0B7650] transition"
              >
                Sign Up →
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="relative z-10 space-y-28 sm:space-y-36 pb-24">

        {/* ── 1. HERO SECTION (Cinematic Video Background) ─────────── */}
        <section id="hero" className="relative min-h-[90vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-8 pb-16 overflow-hidden">

          {/* Cinematic Looping HTML5 Background Video */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            {!heroVideoError ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                onError={() => setHeroVideoError(true)}
                poster="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1920&q=80"
                className="w-full h-full object-cover opacity-20 filter contrast-125 saturate-50"
              >
                {/* Fallback fast-loading tech stream */}
                <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-graphs-and-data-31913-large.mp4" type="video/mp4" />
              </video>
            ) : (
              <div
                className="w-full h-full bg-cover bg-center opacity-15"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1920&q=80')" }}
              />
            )}
            {/* Cinematic Gradient Overlays: Soft Mint Ambient Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#F5FBF6]/70 via-[#F5FBF6]/90 to-[#F5FBF6]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(185,228,201,0.35)_0%,rgba(245,251,246,0.85)_70%,#F5FBF6_100%)]" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">

            {/* Slogan Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#B9E4C9] shadow-xs backdrop-blur-md animate-in fade-in duration-500">
              <span className="flex h-2 w-2 rounded-full bg-[#16865A] animate-ping" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#16865A]">
                The Engineering Companion
              </span>
              <span className="text-[#557267]">•</span>
              <span className="text-xs font-semibold text-[#557267]">
                Grow Beyond the Classroom
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#102B24] tracking-tight leading-[1.08]">
                Grow Beyond the{" "}
                <span className="bg-gradient-to-r from-[#16865A] via-[#0B7650] to-[#75C99A] bg-clip-text text-transparent underline decoration-[#B9E4C9]/70 decoration-wavy underline-offset-8">
                  Classroom.
                </span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl font-semibold text-[#102B24]/90 max-w-2xl mx-auto tracking-tight">
                Your personal learning companion for your engineering journey.
              </p>
              <p className="text-sm sm:text-base text-[#557267] max-w-2xl mx-auto leading-relaxed">
                Connect university theory with production engineering skills. Compile real code, build cloud systems, and master technical placements with Socratic AI mentorship.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
              <Link
                href="/login?mode=signup"
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-[#16865A] hover:bg-[#0B7650] text-white font-extrabold text-sm shadow-[0_12px_32px_rgba(22,134,90,0.25)] hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Sign Up Free</span>
                <span className="text-emerald-200">→</span>
              </Link>

              <Link
                href="/login"
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white hover:bg-[#E8F5E9] text-[#102B24] font-bold text-sm border border-[#B9E4C9] shadow-2xs transition-all flex items-center justify-center gap-2"
              >
                <span>Log In</span>
                <span>👤</span>
              </Link>

              <a
                href="#who-we-are"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white/70 hover:bg-white text-[#557267] hover:text-[#102B24] font-bold text-sm border border-slate-200 hover:border-[#16865A] transition shadow-2xs flex items-center justify-center gap-1.5"
              >
                <span>Explore CampusGrow</span>
                <span>🧭</span>
              </a>
            </div>

            {/* Platform Metrics Strip */}
            <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
              {[
                { label: "Engineering Branches", val: "10 Tracks" },
                { label: "Cloud Sandboxes", val: "Zero-Config IDE" },
                { label: "AI Socratic Tutor", val: "24/7 Doubts" },
                { label: "Career Benchmark", val: "₹18-32 LPA SDE" },
              ].map((m, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-2xl bg-white/70 border border-[#B9E4C9]/70 backdrop-blur-md shadow-2xs text-center"
                >
                  <p className="text-base sm:text-lg font-black text-[#102B24] font-mono leading-tight">
                    {m.val}
                  </p>
                  <p className="text-[11px] font-semibold text-[#557267] mt-0.5">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Smooth Scroll Indicator */}
            <div className="pt-10 flex flex-col items-center justify-center gap-2">
              <a
                href="#who-we-are"
                className="text-[11px] font-bold uppercase tracking-wider text-[#557267] hover:text-[#16865A] transition flex flex-col items-center gap-1.5"
              >
                <span>Discover Platform</span>
                <div className="w-5 h-8 rounded-full border-2 border-[#B9E4C9] flex items-start justify-center p-1">
                  <span className="w-1 h-2 rounded-full bg-[#16865A] animate-bounce" />
                </div>
              </a>
            </div>

          </div>
        </section>


        {/* ── 2. WHO WE ARE ───────────────────────────────────────── */}
        <section id="who-we-are" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">

            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#E8F5E9] text-[#16865A] border border-[#B9E4C9]">
                01 • Who We Are
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-[#102B24] tracking-tight">
                Built for the Next Generation of Engineers.
              </h2>
              <p className="text-sm sm:text-base text-[#557267] leading-relaxed">
                CampusGrow is a dedicated engineering education platform engineered to connect theoretical college education with the practical software craftsmanship demanded by global technology leaders.
              </p>
            </div>

            {/* Visual Storytelling Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Card 1: Identity & Mission */}
              <div className="rounded-3xl p-7 bg-white border border-[#B9E4C9] shadow-[0_12px_40px_rgba(16,43,36,0.03)] space-y-4 hover:border-[#16865A] transition duration-300">
                <div className="h-12 w-12 rounded-2xl bg-[#E8F5E9] border border-[#B9E4C9] flex items-center justify-center text-2xl text-[#16865A]">
                  🎯
                </div>
                <h3 className="text-xl font-extrabold text-[#102B24]">
                  Our Core Mission
                </h3>
                <p className="text-xs sm:text-sm text-[#557267] leading-relaxed">
                  To eliminate the profound divide between abstract textbook examinations and hands-on production code. We empower students to construct, compile, break, and master engineering systems from day one.
                </p>
                <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#16865A]">
                  <span>Practical Craftsmanship First</span>
                  <span>✓</span>
                </div>
              </div>

              {/* Card 2: Vision */}
              <div className="rounded-3xl p-7 bg-white border border-[#B9E4C9] shadow-[0_12px_40px_rgba(16,43,36,0.03)] space-y-4 hover:border-[#16865A] transition duration-300">
                <div className="h-12 w-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-2xl text-blue-700">
                  🔭
                </div>
                <h3 className="text-xl font-extrabold text-[#102B24]">
                  Our Forward Vision
                </h3>
                <p className="text-xs sm:text-sm text-[#557267] leading-relaxed">
                  A future where every aspiring engineer—regardless of university tier or geography—possesses an autonomous AI tutor, high-speed cloud IDE sandboxes, and verified milestone honors that showcase their real ability.
                </p>
                <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-blue-700">
                  <span>Equitable Engineering Access</span>
                  <span>✓</span>
                </div>
              </div>

              {/* Card 3: Intended Audience */}
              <div className="rounded-3xl p-7 bg-white border border-[#B9E4C9] shadow-[0_12px_40px_rgba(16,43,36,0.03)] space-y-4 hover:border-[#16865A] transition duration-300">
                <div className="h-12 w-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-2xl text-amber-700">
                  🎓
                </div>
                <h3 className="text-xl font-extrabold text-[#102B24]">
                  Our Intended Audience
                </h3>
                <p className="text-xs sm:text-sm text-[#557267] leading-relaxed">
                  Undergraduate engineering students across all 4 years and 10 branches: Core Computer Science, IT, Artificial Intelligence, Machine Learning, Cybersecurity, Cloud DevOps, Software Architecture, and Embedded Systems.
                </p>
                <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-amber-800">
                  <span>1st to 4th Year Undergrads</span>
                  <span>✓</span>
                </div>
              </div>

            </div>

          </div>
        </section>


        {/* ── 3. WHY WE EXIST ───────────────────────────────────────── */}
        <section id="why-we-exist" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">

            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#E8F5E9] text-[#16865A] border border-[#B9E4C9]">
                02 • Why We Exist
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-[#102B24] tracking-tight">
                The Gap That Traditional Education Leaves Behind.
              </h2>
              <p className="text-sm sm:text-base text-[#557267] leading-relaxed">
                Why thousands of brilliant students struggle during placements despite scoring top marks in college semester exams.
              </p>
            </div>

            {/* Problem vs Solution Split Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

              {/* Problem Card */}
              <div className="rounded-3xl p-8 bg-[#FAFCFA] border border-slate-200/90 shadow-2xs space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-rose-700 font-extrabold text-xs uppercase tracking-wider">
                    <span>⚠️ The Status Quo Problem</span>
                  </div>
                  <h3 className="text-2xl font-black text-[#102B24]">
                    Fragmented Tutorials &amp; Pure Theoretical Memorization
                  </h3>
                  <p className="text-xs sm:text-sm text-[#557267] leading-relaxed">
                    Most college syllabi teach theoretical algorithm proofs on paper, while companies hire engineers who can write leak-free C11 allocators, debug multithreaded race conditions, and architect Dockerized microservices.
                  </p>

                  <ul className="space-y-3 text-xs sm:text-sm text-[#557267]">
                    <li className="flex items-start gap-2.5">
                      <span className="text-rose-600 font-bold">✕</span>
                      <span><strong>Scattered YouTube Playlists:</strong> Outdated videos with no interactive execution or compilers.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-rose-600 font-bold">✕</span>
                      <span><strong>Environment Setup Hell:</strong> Hours wasted installing GCC, path variables, and conflicting dependencies.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-rose-600 font-bold">✕</span>
                      <span><strong>No Quality Feedback:</strong> Submitting code without understanding memory complexity or code smells.</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 text-xs text-rose-800">
                  <strong>The Reality:</strong> Over 80% of engineering graduates require costly post-college bootcamps simply to write industry-ready software.
                </div>
              </div>

              {/* CampusGrow Solution Card */}
              <div className="rounded-3xl p-8 bg-white border border-[#B9E4C9] shadow-[0_16px_48px_rgba(22,134,90,0.06)] space-y-6 flex flex-col justify-between relative overflow-hidden">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[#16865A] font-extrabold text-xs uppercase tracking-wider">
                    <span>✨ The CampusGrow Solution</span>
                  </div>
                  <h3 className="text-2xl font-black text-[#102B24]">
                    Structured Roadmaps + Instant Browser Execution
                  </h3>
                  <p className="text-xs sm:text-sm text-[#557267] leading-relaxed">
                    CampusGrow replaces fragmented learning with an integrated operating system for your degree. Learn concepts, compile real code immediately in your browser, and receive Socratic AI guidance.
                  </p>

                  <ul className="space-y-3 text-xs sm:text-sm text-[#102B24]">
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#16865A] font-bold">✓</span>
                      <span><strong>Zero-Config Cloud Studio:</strong> Instant compilation of C, Python, Java, and Web stacks directly in-browser.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#16865A] font-bold">✓</span>
                      <span><strong>Socratic AI Doubts Solver:</strong> Line-by-line debugging and conceptual hints without spoon-feeding answers.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#16865A] font-bold">✓</span>
                      <span><strong>Verified Recruiter Honors:</strong> 12 achievement badges and public GitHub portfolio showcasing actual commits.</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-[#E8F5E9] border border-[#B9E4C9] text-xs text-[#0B7650] flex items-center justify-between">
                  <span><strong>The Result:</strong> SDE Job Readiness by Year 3.</span>
                  <Link href="/learning-hub" className="font-extrabold hover:underline">Explore Syllabus →</Link>
                </div>
              </div>

            </div>

          </div>
        </section>


        {/* ── 3. SUBSCRIPTIONS AND PRICING ────────────────────────── */}
        <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">

            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#E8F5E9] text-[#16865A] border border-[#B9E4C9]">
                03 • Subscriptions &amp; Pricing
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-[#102B24] tracking-tight">
                Transparent Pricing for Student Budgets.
              </h2>
              <p className="text-sm sm:text-base text-[#557267] leading-relaxed">
                Accessible pricing configured directly in our Indian gateway. Start completely free, or unlock unlimited compiler sandboxes and AI mock interviews.
              </p>
            </div>

            {/* Monthly / Yearly Billing Toggle */}
            <div className="flex items-center justify-center gap-3">
              <div className="p-1 rounded-full bg-white border border-[#B9E4C9] flex items-center shadow-2xs">
                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={`px-5 py-2 rounded-full text-xs font-bold transition cursor-pointer ${billingCycle === "monthly"
                    ? "bg-[#16865A] text-white shadow-xs"
                    : "text-[#557267] hover:text-[#102B24]"
                    }`}
                >
                  Monthly Billing
                </button>
                <button
                  onClick={() => setBillingCycle("annual")}
                  className={`px-5 py-2 rounded-full text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${billingCycle === "annual"
                    ? "bg-[#16865A] text-white shadow-xs"
                    : "text-[#557267] hover:text-[#102B24]"
                    }`}
                >
                  <span>Yearly Billing</span>
                  <span className="text-[10px] font-black uppercase px-2 py-0.2 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                    Save 35%
                  </span>
                </button>
              </div>
            </div>

            {/* Pricing Cards Grid (3 Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7 items-stretch">

              {/* Card 1: Free Starter */}
              <div className="rounded-3xl p-7 bg-white border border-[#CBD5E1] shadow-2xs flex flex-col justify-between space-y-6 hover:border-[#16865A] transition">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      Free Starter
                    </span>
                    <span className="text-xs text-[#557267]">Zero Cost</span>
                  </div>

                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-black text-[#102B24]">₹0</span>
                      <span className="text-xs text-[#557267]">/ forever</span>
                    </div>
                    <p className="text-xs text-[#557267] mt-1">Essential engineering fundamentals for all undergraduate students.</p>
                  </div>

                  <ul className="space-y-2.5 pt-4 border-t border-slate-100 text-xs text-[#557267]">
                    <li className="flex items-center gap-2">
                      <span className="text-[#16865A] font-bold">✓</span>
                      <span>Access to core Year 1 &amp; 2 curriculum</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#16865A] font-bold">✓</span>
                      <span>In-browser code playground</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#16865A] font-bold">✓</span>
                      <span>Daily streak check-ins &amp; progress log</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#16865A] font-bold">✓</span>
                      <span>Community question forums</span>
                    </li>
                    <li className="flex items-center gap-2 opacity-50">
                      <span>✕</span>
                      <span>Advanced AI Technical Mock Interviews</span>
                    </li>
                  </ul>
                </div>

                <Link
                  href="/login?mode=signup"
                  className="w-full py-3 rounded-xl bg-white hover:bg-slate-50 border border-[#CBD5E1] text-[#102B24] text-center text-xs font-bold transition shadow-2xs block"
                >
                  Start Free Account
                </Link>
              </div>

              {/* Card 2: Pro Monthly */}
              <div className="rounded-3xl p-7 bg-white border-2 border-[#16865A] shadow-[0_16px_40px_rgba(22,134,90,0.1)] flex flex-col justify-between space-y-6 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#16865A] text-white text-[10px] font-black uppercase tracking-wider shadow-xs">
                  Most Popular
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#0B7650]">
                      CampusGrow Pro
                    </span>
                    <span className="text-xs text-[#16865A] font-bold">Monthly Plan</span>
                  </div>

                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-black text-[#102B24]">₹129</span>
                      <span className="text-xs text-[#557267]">/ month</span>
                    </div>
                    <p className="text-xs text-[#557267] mt-1">Configured in Razorpay gateway (₹129 INR/mo).</p>
                  </div>

                  <ul className="space-y-2.5 pt-4 border-t border-slate-100 text-xs text-[#102B24]">
                    <li className="flex items-center gap-2">
                      <span className="text-[#16865A] font-bold">✓</span>
                      <span><strong>All 10 Branch</strong> complete syllabi &amp; labs</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#16865A] font-bold">✓</span>
                      <span><strong>Unlimited Project Hub IDE</strong> compile runs</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#16865A] font-bold">✓</span>
                      <span><strong>24/7 Socratic AI Mentor</strong> code review</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#16865A] font-bold">✓</span>
                      <span><strong>FAANG SDE Mock Interview</strong> simulator</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#16865A] font-bold">✓</span>
                      <span><strong>12 Verified Badges</strong> &amp; ATS resume score</span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => {
                    setSelectedPlanFeature("CampusGrow Pro Monthly (₹129/mo)");
                    setIsUpgradeModalOpen(true);
                  }}
                  className="w-full py-3 rounded-xl bg-[#16865A] hover:bg-[#0B7650] text-white text-center text-xs font-extrabold transition shadow-xs cursor-pointer active:scale-95"
                >
                  Upgrade to Pro (₹129) →
                </button>
              </div>

              {/* Card 3: Pro Annual */}
              <div className="rounded-3xl p-7 bg-white border border-[#CBD5E1] shadow-2xs flex flex-col justify-between space-y-6 hover:border-[#16865A] transition">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                      Best Value • Annual
                    </span>
                    <span className="text-xs text-[#16865A] font-bold">₹83 / month</span>
                  </div>

                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-black text-[#102B24]">₹999</span>
                      <span className="text-xs text-[#557267]">/ year</span>
                    </div>
                    <p className="text-xs text-[#557267] mt-1">Configured in Razorpay gateway (₹999 INR/yr). Save 35%.</p>
                  </div>

                  <ul className="space-y-2.5 pt-4 border-t border-slate-100 text-xs text-[#102B24]">
                    <li className="flex items-center gap-2">
                      <span className="text-[#16865A] font-bold">✓</span>
                      <span><strong>Everything in Pro Monthly</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#16865A] font-bold">✓</span>
                      <span><strong>2 Months Completely Free</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#16865A] font-bold">✓</span>
                      <span>Priority access to live weekend workshops</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#16865A] font-bold">✓</span>
                      <span>Direct 1-on-1 resume reviews</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#16865A] font-bold">✓</span>
                      <span>Early hardware kit prototype waitlist access</span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => {
                    setSelectedPlanFeature("CampusGrow Pro Annual (₹999/yr)");
                    setIsUpgradeModalOpen(true);
                  }}
                  className="w-full py-3 rounded-xl bg-white hover:bg-[#E8F5E9] border border-[#B9E4C9] text-[#16865A] text-center text-xs font-extrabold transition shadow-2xs cursor-pointer hover:border-[#16865A]"
                >
                  Get Annual Access (₹999) →
                </button>
              </div>

            </div>

            {/* Feature Comparison Table */}
            <div className="rounded-3xl bg-white border border-[#B9E4C9] p-6 sm:p-8 shadow-xs">
              <h4 className="text-lg font-black text-[#102B24] mb-4">
                Detailed Plan Comparison
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-slate-100 text-[#557267]">
                      <th className="py-3 px-4 font-bold">Platform Capability</th>
                      <th className="py-3 px-4 font-bold">Free Starter</th>
                      <th className="py-3 px-4 font-bold text-[#16865A]">CampusGrow Pro</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-[#102B24]">
                    <tr>
                      <td className="py-3 px-4 font-semibold">Supported Engineering Branches</td>
                      <td className="py-3 px-4 text-[#557267]">Core CSE / Basics</td>
                      <td className="py-3 px-4 font-bold text-[#16865A]">All 10 Branch Specializations</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold">Project Hub Cloud IDE Runs</td>
                      <td className="py-3 px-4 text-[#557267]">Standard limits</td>
                      <td className="py-3 px-4 font-bold text-[#16865A]">Unlimited High-Memory Compilations</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold">AI Socratic Doubts Mentorship</td>
                      <td className="py-3 px-4 text-[#557267]">Community response</td>
                      <td className="py-3 px-4 font-bold text-[#16865A]">Instant 24/7 Line-by-Line Code Reviews</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold">Technical Placement Mock Interviews</td>
                      <td className="py-3 px-4 text-[#557267]">Preview only</td>
                      <td className="py-3 px-4 font-bold text-[#16865A]">Full Speech &amp; Code SDE Simulator</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold">Achievement Honors &amp; ATS Resume Scoring</td>
                      <td className="py-3 px-4 text-[#557267]">Standard badges</td>
                      <td className="py-3 px-4 font-bold text-[#16865A]">12 Verified Honors + ATS Analyzer</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </section>


        {/* ── 4. LEADERSHIP & FOUNDING TEAM (Conicorn-Inspired 2-Member Showcase) ── */}
        <section id="team" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[40px] bg-white border border-[#B9E4C9] p-6 sm:p-12 shadow-[0_20px_60px_rgba(16,43,36,0.05)] space-y-10 relative overflow-hidden">

            {/* Ambient Corner Glow */}
            <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#E8F5E9]/80 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#B9E4C9]/30 blur-3xl pointer-events-none" />

            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto space-y-3 relative z-10">
              <span className="text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full bg-[#E8F5E9] text-[#16865A] border border-[#B9E4C9]">
                04 • Leadership & Core Team
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-[#102B24] tracking-tight">
                Meet the Minds Behind CampusGrow.
              </h2>
              <p className="text-xs sm:text-sm text-[#557267] leading-relaxed max-w-xl mx-auto">
                A focused founding duo uniting product vision and resilient backend infrastructure to transform undergraduate engineering education.
              </p>
            </div>

            {/* Conicorn-Inspired 2-Member Arched Cards Showcase */}
            <div className="relative z-10 pt-4 max-w-4xl mx-auto">

              {/* Member Selector Tabs */}
              <div className="flex items-center justify-center gap-2 mb-8">
                <button
                  onClick={() => setActiveTeamSlide(0)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-2 cursor-pointer ${activeTeamSlide === 0
                    ? "bg-[#16865A] text-white shadow-sm"
                    : "bg-[#E8F5E9] text-[#102B24] hover:bg-[#B9E4C9]/60"
                    }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  01 • {founderName} (CEO)
                </button>
                <button
                  onClick={() => setActiveTeamSlide(1)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-2 cursor-pointer ${activeTeamSlide === 1
                    ? "bg-[#16865A] text-white shadow-sm"
                    : "bg-[#E8F5E9] text-[#102B24] hover:bg-[#B9E4C9]/60"
                    }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  02 • {member2Name} (COO)
                </button>
              </div>

              {/* Cards Grid: Symmetrical Arched Cards with Conicorn Aesthetic */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 items-stretch justify-center">

                {/* ── CARD 1: FOUNDER & CEO ── */}
                <div
                  onClick={() => setActiveTeamSlide(0)}
                  className={`transition-all duration-300 flex flex-col items-center cursor-pointer group ${activeTeamSlide === 0
                    ? "scale-[1.02] z-20"
                    : "opacity-85 hover:opacity-100 z-10"
                    }`}
                >
                  {/* Arched Top Portrait Card */}
                  <div
                    className={`relative w-full max-w-[340px] h-84 sm:h-96 rounded-t-[48px] rounded-b-[24px] overflow-hidden bg-slate-900 transition-all duration-300 shadow-lg ${activeTeamSlide === 0
                      ? "border-2 border-[#16865A] shadow-[0_20px_50px_rgba(22,134,90,0.22)]"
                      : "border border-[#CBD5E1] hover:border-[#75C99A]"
                      }`}
                  >
                    <Image
                      src={founderAvatar}
                      alt={founderName}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      priority
                    />

                    {/* Conicorn Soft Dark Vignette Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                    {/* Top Tag & Photo Upload */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-md bg-[#16865A]/85 text-white border border-emerald-300/40">
                        Founder &amp; CEO
                      </span>

                      <label
                        className="bg-white/90 hover:bg-white text-[#102B24] p-1.5 rounded-full shadow-xs cursor-pointer text-[10px] font-bold transition flex items-center justify-center active:scale-95"
                        title="Upload Founder Photo"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>📷</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFounderPhotoUpload}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {/* Floating Frosted Circular Social Pills (Conicorn Style) */}
                    <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2.5 z-10 animate-in fade-in duration-300">
                      <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="h-8 w-8 rounded-full bg-black/65 backdrop-blur-md text-white border border-white/20 flex items-center justify-center text-xs font-bold hover:bg-[#16865A] hover:border-[#75C99A] transition"
                        title="LinkedIn"
                      >
                        in
                      </a>
                      <a
                        href="https://github.com/campusgrow"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="h-8 w-8 rounded-full bg-black/65 backdrop-blur-md text-white border border-white/20 flex items-center justify-center text-xs font-bold hover:bg-[#16865A] hover:border-[#75C99A] transition"
                        title="GitHub"
                      >
                        gh
                      </a>
                      <a
                        href="https://x.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="h-8 w-8 rounded-full bg-black/65 backdrop-blur-md text-white border border-white/20 flex items-center justify-center text-xs font-bold hover:bg-[#16865A] hover:border-[#75C99A] transition"
                        title="X / Twitter"
                      >
                        𝕏
                      </a>
                      <a
                        href="mailto:support@campusgrow.in"
                        onClick={(e) => e.stopPropagation()}
                        className="h-8 w-8 rounded-full bg-black/65 backdrop-blur-md text-white border border-white/20 flex items-center justify-center text-xs font-bold hover:bg-[#16865A] hover:border-[#75C99A] transition"
                        title="Email"
                      >
                        ✉
                      </a>
                    </div>
                  </div>

                  {/* Card Typography */}
                  <div className="text-center mt-4 space-y-1 w-full max-w-[340px]">
                    <div className="flex items-center justify-center gap-2">
                      <h3 className="text-xl font-black tracking-tight text-[#102B24]">
                        {founderName}
                      </h3>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsEditingFounder(!isEditingFounder);
                        }}
                        className="text-xs text-[#557267] hover:text-[#16865A] transition cursor-pointer"
                        title="Edit Founder Details"
                      >
                        ✏️
                      </button>
                    </div>

                    <p className="text-xs font-bold text-[#16865A]">
                      {founderRole}
                    </p>

                    <p className="text-[11px] text-[#557267] font-semibold">
                      {founderSubtitle}
                    </p>
                  </div>
                </div>

                {/* ── CARD 2: BACKEND DEVELOPER & COO ── */}
                <div
                  onClick={() => setActiveTeamSlide(1)}
                  className={`transition-all duration-300 flex flex-col items-center cursor-pointer group ${activeTeamSlide === 1
                    ? "scale-[1.02] z-20"
                    : "opacity-85 hover:opacity-100 z-10"
                    }`}
                >
                  {/* Arched Top Portrait Card */}
                  <div
                    className={`relative w-full max-w-[340px] h-84 sm:h-96 rounded-t-[48px] rounded-b-[24px] overflow-hidden bg-slate-900 transition-all duration-300 shadow-lg ${activeTeamSlide === 1
                      ? "border-2 border-[#16865A] shadow-[0_20px_50px_rgba(22,134,90,0.22)]"
                      : "border border-[#CBD5E1] hover:border-[#75C99A]"
                      }`}
                  >
                    <Image
                      src={member2Avatar}
                      alt={member2Name}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      priority
                    />

                    {/* Conicorn Soft Dark Vignette Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                    {/* Top Tag & Photo Upload */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-md bg-[#102B24]/90 text-emerald-300 border border-emerald-500/30">
                        Backend Developer &amp; COO
                      </span>

                      <label
                        className="bg-white/90 hover:bg-white text-[#102B24] p-1.5 rounded-full shadow-xs cursor-pointer text-[10px] font-bold transition flex items-center justify-center active:scale-95"
                        title="Upload Partner Photo"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>📷</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleMember2PhotoUpload}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {/* Floating Frosted Circular Social Pills (Conicorn Style) */}
                    <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2.5 z-10 animate-in fade-in duration-300">
                      <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="h-8 w-8 rounded-full bg-black/65 backdrop-blur-md text-white border border-white/20 flex items-center justify-center text-xs font-bold hover:bg-[#16865A] hover:border-[#75C99A] transition"
                        title="LinkedIn"
                      >
                        in
                      </a>
                      <a
                        href="https://github.com/campusgrow"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="h-8 w-8 rounded-full bg-black/65 backdrop-blur-md text-white border border-white/20 flex items-center justify-center text-xs font-bold hover:bg-[#16865A] hover:border-[#75C99A] transition"
                        title="GitHub"
                      >
                        gh
                      </a>
                      <a
                        href="https://x.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="h-8 w-8 rounded-full bg-black/65 backdrop-blur-md text-white border border-white/20 flex items-center justify-center text-xs font-bold hover:bg-[#16865A] hover:border-[#75C99A] transition"
                        title="X / Twitter"
                      >
                        𝕏
                      </a>
                      <a
                        href="mailto:support@campusgrow.in"
                        onClick={(e) => e.stopPropagation()}
                        className="h-8 w-8 rounded-full bg-black/65 backdrop-blur-md text-white border border-white/20 flex items-center justify-center text-xs font-bold hover:bg-[#16865A] hover:border-[#75C99A] transition"
                        title="Email"
                      >
                        ✉
                      </a>
                    </div>
                  </div>

                  {/* Card Typography */}
                  <div className="text-center mt-4 space-y-1 w-full max-w-[340px]">
                    <div className="flex items-center justify-center gap-2">
                      <h3 className="text-xl font-black tracking-tight text-[#102B24]">
                        {member2Name}
                      </h3>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsEditingMember2(!isEditingMember2);
                        }}
                        className="text-xs text-[#557267] hover:text-[#16865A] transition cursor-pointer"
                        title="Edit Partner Details"
                      >
                        ✏️
                      </button>
                    </div>

                    <p className="text-xs font-bold text-[#16865A]">
                      {member2Role}
                    </p>

                    <p className="text-[11px] text-[#557267] font-semibold">
                      {member2Subtitle}
                    </p>
                  </div>
                </div>

              </div>

              {/* Edit Member 1 Modal Drawer */}
              {isEditingFounder && (
                <div className="max-w-md mx-auto my-6 p-4 rounded-2xl bg-[#F4FBF6] border border-[#B9E4C9] shadow-xs space-y-3 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#102B24]">Personalize Founder &amp; CEO Profile</span>
                    <button
                      onClick={() => setIsEditingFounder(false)}
                      className="text-xs text-[#557267] hover:text-[#102B24] cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={tempFounderName}
                      onChange={(e) => setTempFounderName(e.target.value)}
                      placeholder="Name (e.g. Rahim)"
                      className="w-full px-3 py-1.5 text-xs rounded-xl bg-white border border-[#CBD5E1] text-[#102B24]"
                    />
                    <input
                      type="text"
                      value={tempFounderRole}
                      onChange={(e) => setTempFounderRole(e.target.value)}
                      placeholder="Role (e.g. Founder & CEO)"
                      className="w-full px-3 py-1.5 text-xs rounded-xl bg-white border border-[#CBD5E1] text-[#102B24]"
                    />
                    <input
                      type="text"
                      value={tempFounderSubtitle}
                      onChange={(e) => setTempFounderSubtitle(e.target.value)}
                      placeholder="Specialization (e.g. Product Vision & Platform Architecture)"
                      className="w-full px-3 py-1.5 text-xs rounded-xl bg-white border border-[#CBD5E1] text-[#102B24]"
                    />
                    <button
                      onClick={handleSaveFounderProfile}
                      className="w-full py-1.5 rounded-xl bg-[#16865A] text-white text-xs font-bold cursor-pointer"
                    >
                      Save Founder Profile
                    </button>
                  </div>
                </div>
              )}

              {/* Edit Member 2 Modal Drawer */}
              {isEditingMember2 && (
                <div className="max-w-md mx-auto my-6 p-4 rounded-2xl bg-[#F4FBF6] border border-[#B9E4C9] shadow-xs space-y-3 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#102B24]">Personalize Backend Developer &amp; COO Profile</span>
                    <button
                      onClick={() => setIsEditingMember2(false)}
                      className="text-xs text-[#557267] hover:text-[#102B24] cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={tempMember2Name}
                      onChange={(e) => setTempMember2Name(e.target.value)}
                      placeholder="Friend Name"
                      className="w-full px-3 py-1.5 text-xs rounded-xl bg-white border border-[#CBD5E1] text-[#102B24]"
                    />
                    <input
                      type="text"
                      value={tempMember2Role}
                      onChange={(e) => setTempMember2Role(e.target.value)}
                      placeholder="Role (e.g. Backend Developer & COO)"
                      className="w-full px-3 py-1.5 text-xs rounded-xl bg-white border border-[#CBD5E1] text-[#102B24]"
                    />
                    <input
                      type="text"
                      value={tempMember2Subtitle}
                      onChange={(e) => setTempMember2Subtitle(e.target.value)}
                      placeholder="Specialization (e.g. Cloud Infrastructure, APIs & Operations)"
                      className="w-full px-3 py-1.5 text-xs rounded-xl bg-white border border-[#CBD5E1] text-[#102B24]"
                    />
                    <button
                      onClick={handleSaveMember2Profile}
                      className="w-full py-1.5 rounded-xl bg-[#16865A] text-white text-xs font-bold cursor-pointer"
                    >
                      Save Partner Profile
                    </button>
                  </div>
                </div>
              )}

              {/* Slider Progress Bar & Navigation Arrows (Exact Conicorn Layout) */}
              <div className="pt-8 border-t border-slate-100 flex items-center justify-between max-w-xl mx-auto">

                {/* Horizontal Progress Bar */}
                <div className="flex-1 max-w-xs bg-slate-200 h-1.5 rounded-full overflow-hidden mr-4">
                  <div
                    className="bg-[#16865A] h-full rounded-full transition-all duration-300"
                    style={{ width: `${((activeTeamSlide + 1) / 2) * 100}%` }}
                  />
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-[#557267]">
                  <span>0{activeTeamSlide + 1}</span>
                  <span>/</span>
                  <span>02</span>
                </div>

                {/* Arrow Controls */}
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => setActiveTeamSlide((prev) => (prev === 0 ? 1 : 0))}
                    className="h-9 w-9 rounded-full bg-white border border-[#B9E4C9] text-[#102B24] hover:bg-[#E8F5E9] hover:border-[#16865A] transition flex items-center justify-center cursor-pointer shadow-2xs"
                    aria-label="Previous Founder"
                  >
                    ‹
                  </button>
                  <button
                    onClick={() => setActiveTeamSlide((prev) => (prev === 1 ? 0 : 1))}
                    className="h-9 w-9 rounded-full bg-white border border-[#B9E4C9] text-[#102B24] hover:bg-[#E8F5E9] hover:border-[#16865A] transition flex items-center justify-center cursor-pointer shadow-2xs"
                    aria-label="Next Founder"
                  >
                    ›
                  </button>
                </div>
              </div>

            </div>

            {/* Founding Duo Manifesto & Engineering Commitment Card */}
            <div className="rounded-3xl p-6 sm:p-8 bg-[#FAFCFA] border border-[#B9E4C9] shadow-2xs grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">

              {/* Left Column: Manifesto Quote */}
              <div className="lg:col-span-8 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#0B7650] border border-emerald-300">
                    A Note From The Founders
                  </span>
                  <span className="text-xs font-bold text-[#557267]">Founding Duo Commitment</span>
                </div>

                <p className="text-sm sm:text-base font-semibold text-[#102B24] leading-relaxed italic">
                  &ldquo;We founded CampusGrow with a simple conviction: engineering cannot be mastered through static PowerPoint slides alone. As a focused two-person founding team, we design, build, and support everything directly — from our zero-setup compiler sandbox and Socratic AI tutor to our resilient backend APIs and deep curriculum pathways. No corporate fluff — just pure engineering rigor for the next generation of builders.&rdquo;
                </p>

                <p className="text-xs font-black text-[#16865A]">
                  — {founderName} (Founder &amp; CEO) &amp; {member2Name} (Backend Developer &amp; COO)
                </p>
              </div>

              {/* Right Column: Duo Engineering Badges */}
              <div className="lg:col-span-4 space-y-2.5 text-xs">
                <div className="p-3 rounded-2xl bg-white border border-[#CBD5E1] shadow-2xs flex items-center gap-3">
                  <span className="h-9 w-9 rounded-xl bg-emerald-50 border border-[#B9E4C9] text-[#16865A] flex items-center justify-center text-lg font-bold shrink-0">
                    ⚡
                  </span>
                  <div>
                    <p className="font-extrabold text-[#102B24]">Founder-Led Engineering</p>
                    <p className="text-[11px] text-[#557267]">100% built by the executive duo with zero bloated layers.</p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-white border border-[#CBD5E1] shadow-2xs flex items-center gap-3">
                  <span className="h-9 w-9 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center text-lg font-bold shrink-0">
                    🛡️
                  </span>
                  <div>
                    <p className="font-extrabold text-[#102B24]">Resilient Cloud Backend</p>
                    <p className="text-[11px] text-[#557267]">Scalable APIs, compiler sandboxes &amp; fast microservices.</p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-white border border-[#CBD5E1] shadow-2xs flex items-center gap-3">
                  <span className="h-9 w-9 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center text-lg font-bold shrink-0">
                    🎓
                  </span>
                  <div>
                    <p className="font-extrabold text-[#102B24]">Direct Student Mentorship</p>
                    <p className="text-[11px] text-[#557267]">Coaching and reviews directly from the platform creators.</p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>


        {/* ── 5. SOCIAL MEDIA AND CONTACT ─────────────────────────── */}
        <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">

            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#E8F5E9] text-[#16865A] border border-[#B9E4C9]">
                05 • Connect With Us
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-[#102B24] tracking-tight">
                Let&apos;s Build Better Engineering Together.
              </h2>
              <p className="text-sm sm:text-base text-[#557267] leading-relaxed">
                Have a question about the curriculum, college collaborations, or our upcoming Engineering Lab hardware kits? Drop us a note.
              </p>
            </div>

            {/* Social Media & Contact Form Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

              {/* Left Column: Authentic Social & Official Channels */}
              <div className="lg:col-span-5 rounded-3xl p-7 bg-white border border-[#B9E4C9] shadow-2xs space-y-6">
                <div>
                  <h3 className="text-xl font-black text-[#102B24]">
                    Official Channels
                  </h3>
                  <p className="text-xs text-[#557267] mt-1">
                    Connect with our team across our verified developer communities.
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  <a
                    href="https://www.linkedin.com/company/campusgrow"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-2xl bg-[#FAFCFA] border border-[#CBD5E1] hover:border-[#16865A] hover:bg-[#E8F5E9] flex items-center justify-between transition group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="h-8 w-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">in</span>
                      <div>
                        <p className="font-bold text-[#102B24]">LinkedIn</p>
                        <p className="text-[11px] text-[#557267]">Industry updates &amp; hiring</p>
                      </div>
                    </div>
                    <span className="text-[#16865A] font-bold group-hover:translate-x-1 transition">↗</span>
                  </a>

                  <a
                    href="https://github.com/campusgrow"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-2xl bg-[#FAFCFA] border border-[#CBD5E1] hover:border-[#16865A] hover:bg-[#E8F5E9] flex items-center justify-between transition group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="h-8 w-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">gh</span>
                      <div>
                        <p className="font-bold text-[#102B24]">GitHub</p>
                        <p className="text-[11px] text-[#557267]">Open-source repos &amp; starter kits</p>
                      </div>
                    </div>
                    <span className="text-[#16865A] font-bold group-hover:translate-x-1 transition">↗</span>
                  </a>

                  <a
                    href="https://youtube.com/@campusgrow"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-2xl bg-[#FAFCFA] border border-[#CBD5E1] hover:border-[#16865A] hover:bg-[#E8F5E9] flex items-center justify-between transition group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="h-8 w-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">yt</span>
                      <div>
                        <p className="font-bold text-[#102B24]">YouTube</p>
                        <p className="text-[11px] text-[#557267]">Deep-dive engineering lectures</p>
                      </div>
                    </div>
                    <span className="text-[#16865A] font-bold group-hover:translate-x-1 transition">↗</span>
                  </a>

                  <a
                    href="https://instagram.com/campusgrow"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-2xl bg-[#FAFCFA] border border-[#CBD5E1] hover:border-[#16865A] hover:bg-[#E8F5E9] flex items-center justify-between transition group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="h-8 w-8 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center font-bold">ig</span>
                      <div>
                        <p className="font-bold text-[#102B24]">Instagram</p>
                        <p className="text-[11px] text-[#557267]">Student campus highlights &amp; tips</p>
                      </div>
                    </div>
                    <span className="text-[#16865A] font-bold group-hover:translate-x-1 transition">↗</span>
                  </a>

                  <div className="p-3 rounded-2xl bg-[#FAFCFA] border border-[#CBD5E1]">
                    <span className="text-[10px] font-bold uppercase text-[#557267]">Support Email</span>
                    <p className="font-mono font-bold text-xs text-[#102B24] select-all">
                      support@campusgrow.in
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Validated Contact Form */}
              <div className="lg:col-span-7 rounded-3xl p-7 bg-white border border-[#B9E4C9] shadow-2xs">
                <div>
                  <h3 className="text-xl font-black text-[#102B24]">
                    Send Us a Message
                  </h3>
                  <p className="text-xs text-[#557267] mt-1">
                    Directly routed to our academic and technical engineering team.
                  </p>
                </div>

                {contactSuccess ? (
                  <div className="p-6 rounded-2xl bg-[#E8F5E9] border border-[#B9E4C9] text-center space-y-3 my-6 animate-in fade-in duration-300">
                    <span className="text-3xl">🎉</span>
                    <h4 className="font-bold text-base text-[#102B24]">Thank you for reaching out!</h4>
                    <p className="text-xs text-[#557267]">
                      We have received your message. Our engineering team typically responds within 24 hours.
                    </p>
                    <button
                      onClick={() => setContactSuccess(false)}
                      className="px-4 py-2 rounded-xl bg-[#16865A] text-white text-xs font-bold cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4 mt-6">
                    {contactError && (
                      <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700">
                        {contactError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-[#102B24] mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] text-xs bg-white text-[#102B24] focus:outline-none focus:ring-2 focus:ring-[#16865A]/40"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-[#102B24] mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="rahul@college.edu"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] text-xs bg-white text-[#102B24] focus:outline-none focus:ring-2 focus:ring-[#16865A]/40"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-[#102B24] mb-1">
                          Engineering College / University
                        </label>
                        <input
                          type="text"
                          value={contactCollege}
                          onChange={(e) => setContactCollege(e.target.value)}
                          placeholder="e.g. IIT, NIT, BITS, SRM..."
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] text-xs bg-white text-[#102B24] focus:outline-none focus:ring-2 focus:ring-[#16865A]/40"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-[#102B24] mb-1">
                          Inquiry Category
                        </label>
                        <select
                          value={contactCategory}
                          onChange={(e) => setContactCategory(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] text-xs bg-white text-[#102B24] focus:outline-none focus:ring-2 focus:ring-[#16865A]/40 cursor-pointer"
                        >
                          <option value="General Inquiry">General Inquiry</option>
                          <option value="Curriculum & Course Access">Curriculum &amp; Course Access</option>
                          <option value="College / Institutional Partnership">College / Institutional Partnership</option>
                          <option value="Hardware Kit Pilot">Engineering Lab Hardware Kits</option>
                          <option value="Campus Ambassador Program">Campus Ambassador Program</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#102B24] mb-1">
                        Message *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        placeholder="How can we help you on your engineering journey?"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] text-xs bg-white text-[#102B24] focus:outline-none focus:ring-2 focus:ring-[#16865A]/40"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={contactSubmitting}
                      className="w-full py-3 rounded-xl bg-[#16865A] hover:bg-[#0B7650] text-white text-xs font-bold transition shadow-xs cursor-pointer active:scale-95 disabled:opacity-50"
                    >
                      {contactSubmitting ? "Transmitting Message..." : "Submit Message →"}
                    </button>
                  </form>
                )}
              </div>

            </div>

          </div>
        </section>

      </main>


      {/* ── FOOTER ─────────────────────────────────────────────────── */}
      <footer className="border-t border-[#B9E4C9] bg-white pt-14 pb-10 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">

            {/* Col 1: Brand & Slogan */}
            <div className="col-span-2 space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-xl bg-[#E8F5E9] border border-[#B9E4C9] flex items-center justify-center p-1">
                  <Image
                    src="/campusgrow-icon.png"
                    alt="CampusGrow"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
                <span className="font-black text-base text-[#102B24]">CampusGrow</span>
              </div>
              <p className="text-[#102B24] font-bold">
                Grow Beyond the Classroom.
              </p>
              <p className="text-[11px] text-[#557267] max-w-sm leading-relaxed">
                Your personal learning companion for your engineering journey. Bridging theoretical university computer science with practical hands-on software development.
              </p>
              <p className="text-[10px] text-[#557267]">
                © {new Date().getFullYear()} CampusGrow Technologies. All rights reserved.
              </p>
            </div>

            {/* Col 2: Platform */}
            <div className="space-y-2.5">
              <p className="font-extrabold text-[#102B24] uppercase tracking-wider text-[11px]">Platform</p>
              <ul className="space-y-2 text-[#557267]">
                <li><Link href="/learning-hub" className="hover:text-[#16865A]">Learning Hub</Link></li>
                <li><Link href="/project-hub" className="hover:text-[#16865A]">Project Hub IDE</Link></li>
                <li><Link href="/workspace" className="hover:text-[#16865A]">Cloud Workspaces</Link></li>
                <li><Link href="/interview" className="hover:text-[#16865A]">AI Mock Interview</Link></li>
                <li><Link href="/quiz" className="hover:text-[#16865A]">Quiz Center</Link></li>
                <li><Link href="/dashboard" className="hover:text-[#16865A]">Student Dashboard</Link></li>
              </ul>
            </div>

            {/* Col 3: Curriculum */}
            <div className="space-y-2.5">
              <p className="font-extrabold text-[#102B24] uppercase tracking-wider text-[11px]">Curriculum</p>
              <ul className="space-y-2 text-[#557267]">
                <li><Link href="/courses" className="hover:text-[#16865A]">10 Branch Tracks</Link></li>
                <li><Link href="/lessons/c-programming" className="hover:text-[#16865A]">C &amp; Systems Programming</Link></li>
                <li><Link href="/explore" className="hover:text-[#16865A]">Data Structures &amp; Algorithms</Link></li>
                <li><Link href="/explore" className="hover:text-[#16865A]">Operating Systems</Link></li>
                <li><Link href="/explore" className="hover:text-[#16865A]">Distributed Cloud &amp; AI</Link></li>
              </ul>
            </div>

            {/* Col 4: Company & Legal */}
            <div className="space-y-2.5">
              <p className="font-extrabold text-[#102B24] uppercase tracking-wider text-[11px]">Company</p>
              <ul className="space-y-2 text-[#557267]">
                <li><a href="#who-we-are" className="hover:text-[#16865A]">Who We Are</a></li>
                <li><a href="#why-we-exist" className="hover:text-[#16865A]">Why We Exist</a></li>
                <li><a href="#team" className="hover:text-[#16865A]">Mentors &amp; Team</a></li>
                <li><a href="#pricing" className="hover:text-[#16865A]">Pricing Plans</a></li>
                <li><a href="#contact" className="hover:text-[#16865A]">Contact Support</a></li>
              </ul>
            </div>

          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#557267]">
            <span>Designed in the CampusGrow Emerald Light visual aesthetic.</span>
            <div className="flex items-center gap-4">
              <a href="#hero" className="hover:text-[#16865A]">Back to Top ↑</a>
            </div>
          </div>
        </div>
      </footer>


      {/* ── HARDWARE WAITLIST MODAL ───────────────────────────────── */}
      {isWaitlistModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white border border-[#B9E4C9] rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔌</span>
                <h3 className="font-black text-base text-[#102B24]">
                  CampusGrow Engineering Lab
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsWaitlistModalOpen(false);
                  setWaitlistSuccess(false);
                }}
                className="text-slate-400 hover:text-slate-700 text-sm p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#557267] leading-relaxed">
              Physical embedded kits with ESP32 microcontrollers, sensor suites, and direct WebUSB integration into CampusGrow Cloud IDE.
            </p>

            {waitlistSuccess ? (
              <div className="p-4 rounded-2xl bg-[#E8F5E9] border border-[#B9E4C9] text-center space-y-2">
                <p className="text-xs font-bold text-[#102B24]">🎉 You are on the hardware pilot waitlist!</p>
                <p className="text-[11px] text-[#557267]">We will notify you as soon as batch 1 kits open for campus delivery.</p>
              </div>
            ) : (
              <form onSubmit={handleWaitlistSubmit} className="space-y-3">
                <input
                  type="email"
                  required
                  placeholder="Enter your student email..."
                  value={waitlistEmail}
                  onChange={(e) => setWaitlistEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] text-xs bg-white text-[#102B24] focus:outline-none focus:ring-2 focus:ring-[#16865A]/40"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#16865A] hover:bg-[#0B7650] text-white text-xs font-bold transition cursor-pointer"
                >
                  Join Hardware Waitlist →
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ── PRO UPGRADE MODAL INTEGRATION ──────────────────────────── */}
      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        featureTitle={selectedPlanFeature}
      />

    </div>
  );
}
