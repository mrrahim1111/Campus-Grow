"use client";

import { useState, useEffect } from "react";
import AmbientBackground from "@/components/AmbientBackground";

interface CommunityPost {
  id: string;
  author: string;
  avatarInitials: string;
  branch: string;
  year: string;
  title: string;
  content: string;
  category: "Project Showcase" | "Doubt Clarification" | "Placement & Career" | "Study Groups";
  tags: string[];
  upvotes: number;
  hasUpvoted?: boolean;
  comments: {
    author: string;
    branch: string;
    content: string;
    timestamp: string;
  }[];
  timestamp: string;
}

const DEFAULT_POSTS: CommunityPost[] = [
  {
    id: "post-1",
    author: "Rohan Verma",
    avatarInitials: "RV",
    branch: "CSE",
    year: "3rd Year",
    title: "Completed Milestone 3 Banking Ledger in C — Solved race conditions with flock()!",
    content: "Just finished building the CLI Banking Ledger milestone. The trickiest part was handling race conditions when two concurrent CLI processes attempted withdrawal at the exact same millisecond. I solved it using advisory file locks with `flock(fd, LOCK_EX)`. Check out how atomic writes prevent overdraft!",
    category: "Project Showcase",
    tags: ["SystemsProgramming", "C", "Concurrency", "MilestoneBuild"],
    upvotes: 42,
    comments: [
      {
        author: "Pooja Hegde",
        branch: "CAI • 2nd Year",
        content: "Awesome work Rohan! Did you benchmark how flock impacts throughput compared to pthread mutexes?",
        timestamp: "2 hours ago",
      },
      {
        author: "Rohan Verma",
        branch: "CSE • 3rd Year",
        content: "Pthread mutexes are faster for single-process threads, but flock works across separate terminal process runs!",
        timestamp: "1 hour ago",
      },
    ],
    timestamp: "3 hours ago",
  },
  {
    id: "post-2",
    author: "Ananya Deshmukh",
    avatarInitials: "AD",
    branch: "AID",
    year: "4th Year",
    title: "Cracked Google SDE OA! Here are the 3 tree questions that showed up",
    content: "Took the online assessment yesterday. Two questions were medium Binary Tree traversals with path sums, and the third was an O(N log N) interval scheduling problem with custom comparator. The CampusGrow DSA track was almost verbatim what they asked!",
    category: "Placement & Career",
    tags: ["Placement", "Google", "DSA", "InterviewPrep"],
    upvotes: 89,
    comments: [
      {
        author: "Devansh Nair",
        branch: "CSM • 3rd Year",
        content: "Huge congratulations Ananya! How did you optimize the interval overlap checks?",
        timestamp: "4 hours ago",
      },
    ],
    timestamp: "5 hours ago",
  },
  {
    id: "post-3",
    author: "Siddharth Rao",
    avatarInitials: "SR",
    branch: "IT",
    year: "2nd Year",
    title: "Question on B-Tree node splitting when order M=4",
    content: "During node overflow in B-Trees, does the median key immediately propagate to the parent before or after allocating the right sibling child pointer? The visualization in the database engine track shows parent elevation first. Can someone clarify the memory order?",
    category: "Doubt Clarification",
    tags: ["DBMS", "DataStructures", "BTrees", "StorageEngine"],
    upvotes: 18,
    comments: [
      {
        author: "CampusGrow AI Mentor",
        branch: "Staff AI",
        content: "In memory, you split the array of keys first, elevate the median key to the parent node, and link the new right child pointer to the parent's pointer array at medianIndex + 1.",
        timestamp: "20 mins ago",
      },
    ],
    timestamp: "1 day ago",
  },
  {
    id: "post-4",
    author: "Kavya Iyer",
    avatarInitials: "KI",
    branch: "CSD",
    year: "2nd Year",
    title: "Looking for 2 study partners for System Design & Distributed Systems sprint",
    content: "Starting the high-level system design track this weekend: designing scalable URL shorteners, distributed rate limiters, and Kafka replication. We will meet on Google Meet daily at 7 PM IST to review architecture diagrams.",
    category: "Study Groups",
    tags: ["StudyGroup", "SystemDesign", "DistributedSystems", "PeerLearning"],
    upvotes: 27,
    comments: [],
    timestamp: "2 days ago",
  },
];

export default function CommunityPage() {
  const [activeMainTab, setActiveMainTab] = useState<"discussions" | "leaderboard">("discussions");
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
  const [replyInput, setReplyInput] = useState<{ [postId: string]: string }>({});

  // Leaderboard states
  const [leaderboardTimeframe, setLeaderboardTimeframe] = useState<"weekly" | "monthly" | "allTime">("weekly");
  const [leaderboardBranch, setLeaderboardBranch] = useState("All");

  // New post form fields
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newCategory, setNewCategory] = useState<CommunityPost["category"]>("Project Showcase");
  const [newTags, setNewTags] = useState("");
  const [authorName, setAuthorName] = useState("Learner");
  const [authorBranch, setAuthorBranch] = useState("CSE");
  const [authorYear, setAuthorYear] = useState("2nd Year");

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("studentData");
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        if (parsed.name) setAuthorName(parsed.name);
        if (parsed.branch) setAuthorBranch(parsed.branch);
        if (parsed.year) setAuthorYear(parsed.year);
      }

      const savedPosts = localStorage.getItem("campusgrow_community_posts");
      if (savedPosts) {
        setPosts(JSON.parse(savedPosts));
      } else {
        setPosts(DEFAULT_POSTS);
      }
    } catch {
      setPosts(DEFAULT_POSTS);
    }
  }, []);

  const savePosts = (updated: CommunityPost[]) => {
    setPosts(updated);
    try {
      localStorage.setItem("campusgrow_community_posts", JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleUpvote = (id: string) => {
    const updated = posts.map((p) => {
      if (p.id === id) {
        const hasUpvoted = !p.hasUpvoted;
        return {
          ...p,
          upvotes: hasUpvoted ? p.upvotes + 1 : p.upvotes - 1,
          hasUpvoted,
        };
      }
      return p;
    });
    savePosts(updated);
  };

  const handleAddComment = (postId: string) => {
    const text = replyInput[postId]?.trim();
    if (!text) return;

    const updated = posts.map((p) => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [
            ...p.comments,
            {
              author: authorName,
              branch: `${authorBranch} • ${authorYear}`,
              content: text,
              timestamp: "Just now",
            },
          ],
        };
      }
      return p;
    });

    savePosts(updated);
    setReplyInput({ ...replyInput, [postId]: "" });
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const tagList = newTags
      .split(",")
      .map((t) => t.trim().replace(/^#/, ""))
      .filter(Boolean);

    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      author: authorName,
      avatarInitials: authorName
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "CG",
      branch: authorBranch,
      year: authorYear,
      title: newTitle.trim(),
      content: newContent.trim(),
      category: newCategory,
      tags: tagList.length > 0 ? tagList : ["Engineering", "CampusGrow"],
      upvotes: 1,
      hasUpvoted: true,
      comments: [],
      timestamp: "Just now",
    };

    const updated = [newPost, ...posts];
    savePosts(updated);

    // Reset & close
    setNewTitle("");
    setNewContent("");
    setNewTags("");
    setModalOpen(false);
  };

  const categories = [
    "All",
    "Project Showcase",
    "Doubt Clarification",
    "Placement & Career",
    "Study Groups",
  ];

  const allBranchesList = ["All", "CSE", "IT", "CAI", "AID", "CSM", "CYS", "SE", "DS", "CSD", "IOT"];

  const filteredPosts = posts.filter((p) => {
    if (selectedCategory !== "All" && p.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.author.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Comprehensive Leaderboard Data
  const leaderboardEngineers = [
    {
      rank: 1,
      name: "Rohan Verma",
      avatar: "RV",
      branch: "CSE",
      college: "IIT Delhi",
      year: "3rd Year",
      xp: 4920,
      streak: 24,
      lessonsVerified: 18,
      capstonesShipped: 4,
      badge: "Systems Master",
      tier: "Grandmaster",
    },
    {
      rank: 2,
      name: "Ananya Deshmukh",
      avatar: "AD",
      branch: "AID",
      college: "BITS Pilani",
      year: "4th Year",
      xp: 4450,
      streak: 19,
      lessonsVerified: 16,
      capstonesShipped: 3,
      badge: "AI Pioneer",
      tier: "Master",
    },
    {
      rank: 3,
      name: "Siddharth Rao",
      avatar: "SR",
      branch: "IT",
      college: "NIT Surathkal",
      year: "2nd Year",
      xp: 3980,
      streak: 15,
      lessonsVerified: 14,
      capstonesShipped: 3,
      badge: "Kernel Hacker",
      tier: "Master",
    },
    {
      rank: 4,
      name: "Pooja Sharma",
      avatar: "PS",
      branch: "CYS",
      college: "DTU Delhi",
      year: "2nd Year",
      xp: 3620,
      streak: 13,
      lessonsVerified: 13,
      capstonesShipped: 2,
      badge: "Security Specialist",
      tier: "Specialist",
    },
    {
      rank: 5,
      name: "Devansh Nair",
      avatar: "DN",
      branch: "CSM",
      college: "IIIT Hyderabad",
      year: "3rd Year",
      xp: 3340,
      streak: 12,
      lessonsVerified: 12,
      capstonesShipped: 2,
      badge: "Algo Titan",
      tier: "Specialist",
    },
    {
      rank: 6,
      name: "Kavya Iyer",
      avatar: "KI",
      branch: "CSD",
      college: "VIT Vellore",
      year: "2nd Year",
      xp: 3120,
      streak: 11,
      lessonsVerified: 11,
      capstonesShipped: 2,
      badge: "Spatial UI Craftsman",
      tier: "Specialist",
    },
    {
      rank: 7,
      name: "Arjun Mehta",
      avatar: "AM",
      branch: "SE",
      college: "PES University",
      year: "3rd Year",
      xp: 2890,
      streak: 10,
      lessonsVerified: 10,
      capstonesShipped: 2,
      badge: "DevOps Engineer",
      tier: "Practitioner",
    },
    {
      rank: 8,
      name: "Neha Kulkarni",
      avatar: "NK",
      branch: "DS",
      college: "COEP Pune",
      year: "4th Year",
      xp: 2750,
      streak: 9,
      lessonsVerified: 9,
      capstonesShipped: 1,
      badge: "Data Wrangler",
      tier: "Practitioner",
    },
    {
      rank: 9,
      name: "Vikas Pillai",
      avatar: "VP",
      branch: "IOT",
      college: "NIT Trichy",
      year: "3rd Year",
      xp: 2580,
      streak: 8,
      lessonsVerified: 9,
      capstonesShipped: 1,
      badge: "Embedded Specialist",
      tier: "Practitioner",
    },
    {
      rank: 10,
      name: "Sneha Roy",
      avatar: "SR",
      branch: "CAI",
      college: "Jadavpur University",
      year: "3rd Year",
      xp: 2490,
      streak: 8,
      lessonsVerified: 8,
      capstonesShipped: 1,
      badge: "LLM Agent Smith",
      tier: "Practitioner",
    },
  ];

  const filteredLeaderboard = leaderboardEngineers.filter((eng) => {
    if (leaderboardBranch === "All") return true;
    return eng.branch === leaderboardBranch;
  });

  const branchChampionships = [
    { rank: 1, branch: "Core Computer Science (CSE)", xp: "142,500 XP", activeLearners: 840, trophy: "🥇" },
    { rank: 2, branch: "AI & Data Science (AID)", xp: "128,400 XP", activeLearners: 710, trophy: "🥈" },
    { rank: 3, branch: "Cybersecurity & Defense (CYS)", xp: "112,000 XP", activeLearners: 590, trophy: "🥉" },
    { rank: 4, branch: "Information Technology (IT)", xp: "98,600 XP", activeLearners: 540, trophy: "⭐" },
    { rank: 5, branch: "Software Engineering (SE)", xp: "87,200 XP", activeLearners: 460, trophy: "⭐" },
  ];

  return (
    <AmbientBackground intensity="dashboard">
      <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-8">
        
        {/* Header & Main Tab Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-2 border-b border-slate-200/60">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 uppercase tracking-wider">
                Student Network • All CS Disciplines
              </span>
              <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                Season 4 Live 🔥
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-text-dark)] tracking-tight">
              Engineering Community & Leaderboard
            </h1>
            <p className="text-sm text-[var(--color-text-secondary)] font-medium max-w-2xl">
              Connect with peers across all computer science disciplines, showcase capstone projects, ask technical doubts, and compete on the global engineering leaderboard.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Primary View Switcher */}
            <div className="p-1 rounded-2xl glass-surface-elevated border border-white/80 shadow flex items-center gap-1">
              <button
                onClick={() => setActiveMainTab("discussions")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeMainTab === "discussions"
                    ? "bg-[#16865A] text-white shadow"
                    : "text-[var(--color-text-secondary)] hover:text-emerald-800 hover:bg-emerald-50"
                }`}
              >
                <span>💬 Discussions & Showcase</span>
              </button>
              <button
                onClick={() => setActiveMainTab("leaderboard")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeMainTab === "leaderboard"
                    ? "bg-[#16865A] text-white shadow"
                    : "text-[var(--color-text-secondary)] hover:text-emerald-800 hover:bg-emerald-50"
                }`}
              >
                <span>🏆 Engineering Leaderboard</span>
              </button>
            </div>

            {activeMainTab === "discussions" && (
              <button
                onClick={() => setModalOpen(true)}
                className="btn-emerald-gradient px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>+ Create Discussion</span>
              </button>
            )}
          </div>
        </div>

        {/* TAB 1: DISCUSSIONS */}
        {activeMainTab === "discussions" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Filter Bar */}
            <div className="rounded-2xl glass-surface-elevated p-4 border border-white/80 shadow-md space-y-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-md">
                  <input
                    type="text"
                    placeholder="Search discussions, tags, questions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-white border border-slate-200 text-[var(--color-text-dark)] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
                  />
                  <span className="absolute left-3 top-2.5 text-slate-400">🔍</span>
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                        selectedCategory === cat
                          ? "bg-[#16865A] text-white shadow"
                          : "bg-white/80 text-[var(--color-text-secondary)] hover:text-emerald-800 border border-slate-200/80 hover:bg-emerald-50"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content Layout: Posts on left (2 cols) + Community Sidebar on right (1 col) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* POSTS FEED */}
              <div className="lg:col-span-2 space-y-5">
                {filteredPosts.map((post) => {
                  const isExpanded = expandedPostId === post.id;

                  return (
                    <div
                      key={post.id}
                      className="rounded-3xl glass-surface-elevated p-6 border border-white/80 shadow-md space-y-4"
                    >
                      {/* Author Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#16865A] to-[#75C99A] text-white font-bold flex items-center justify-center text-sm shadow">
                            {post.avatarInitials}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-bold text-[var(--color-text-dark)]">{post.author}</p>
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                {post.branch} • {post.year}
                              </span>
                            </div>
                            <p className="text-[11px] text-[var(--color-text-secondary)]">{post.timestamp}</p>
                          </div>
                        </div>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-[var(--color-text-secondary)]">
                          {post.category}
                        </span>
                      </div>

                      {/* Title & Body */}
                      <div>
                        <h3 className="text-base font-bold text-[var(--color-text-dark)]">{post.title}</h3>
                        <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-2 leading-relaxed">
                          {post.content}
                        </p>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {post.tags.map((t, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>

                      {/* Action Bar (Upvote & Comments) */}
                      <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                        <button
                          onClick={() => handleUpvote(post.id)}
                          className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                            post.hasUpvoted
                              ? "bg-emerald-600 text-white shadow"
                              : "bg-white text-[var(--color-text-dark)] border border-slate-200 hover:bg-emerald-50"
                          }`}
                        >
                          <span>▲</span>
                          <span>{post.upvotes} Upvotes</span>
                        </button>

                        <button
                          onClick={() => setExpandedPostId(isExpanded ? null : post.id)}
                          className="text-emerald-700 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span>💬 {post.comments.length} Comments</span>
                          <span>{isExpanded ? "▲" : "▼"}</span>
                        </button>
                      </div>

                      {/* Expanded Comments List & Reply */}
                      {isExpanded && (
                        <div className="pt-3 border-t border-slate-200/60 space-y-3">
                          {post.comments.length === 0 ? (
                            <p className="text-xs text-[var(--color-text-secondary)] italic">
                              No comments yet. Be the first to share your thoughts!
                            </p>
                          ) : (
                            <div className="space-y-2">
                              {post.comments.map((c, i) => (
                                <div
                                  key={i}
                                  className="p-3 rounded-2xl bg-white/70 border border-slate-100 space-y-1 text-xs"
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="font-bold text-[var(--color-text-dark)]">{c.author} <span className="text-[10px] text-[var(--color-text-secondary)] font-normal">({c.branch})</span></span>
                                    <span className="text-[10px] text-[var(--color-text-secondary)]">{c.timestamp}</span>
                                  </div>
                                  <p className="text-[var(--color-text-secondary)]">{c.content}</p>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Reply Input */}
                          <div className="flex items-center gap-2 pt-1">
                            <input
                              type="text"
                              placeholder="Write a peer response or solution..."
                              value={replyInput[post.id] || ""}
                              onChange={(e) => setReplyInput({ ...replyInput, [post.id]: e.target.value })}
                              onKeyDown={(e) => e.key === "Enter" && handleAddComment(post.id)}
                              className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-white border border-slate-200 text-[var(--color-text-dark)] focus:outline-none focus:ring-1 focus:ring-emerald-500"
                            />
                            <button
                              onClick={() => handleAddComment(post.id)}
                              className="btn-emerald-gradient px-4 py-1.5 rounded-xl text-xs font-bold shadow cursor-pointer"
                            >
                              Reply
                            </button>
                          </div>
                        </div>
                      )}

                    </div>
                  );
                })}

                {filteredPosts.length === 0 && (
                  <div className="text-center py-16 rounded-3xl glass-surface border border-dashed border-slate-300">
                    <span className="text-3xl">💬</span>
                    <h3 className="text-base font-bold text-[var(--color-text-dark)] mt-2">No discussions found</h3>
                    <p className="text-xs text-[var(--color-text-secondary)] mt-1">Be the first to post a question or project!</p>
                    <button
                      onClick={() => setModalOpen(true)}
                      className="mt-4 px-4 py-2 rounded-xl text-xs font-bold btn-emerald-gradient shadow cursor-pointer"
                    >
                      Create Discussion
                    </button>
                  </div>
                )}
              </div>

              {/* COMMUNITY SIDEBAR */}
              <div className="space-y-6">
                
                {/* Switch to Leaderboard CTA */}
                <div className="rounded-3xl glass-surface-elevated p-6 border border-emerald-300/80 shadow-md space-y-3 bg-gradient-to-br from-emerald-50/80 to-white/90">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">🏆</span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Top 1% Rank
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-[var(--color-text-dark)]">
                    Engineering Leaderboard
                  </h3>
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    Earn XP by completing structured lessons, passing hands-on sandbox labs, and shipping real capstone code.
                  </p>
                  <button
                    onClick={() => setActiveMainTab("leaderboard")}
                    className="w-full py-2 rounded-xl text-xs font-bold btn-emerald-gradient shadow cursor-pointer text-center"
                  >
                    View Global Rankings →
                  </button>
                </div>

                {/* Trending Topics Widget */}
                <div className="rounded-3xl glass-surface-elevated p-6 border border-white/80 shadow-md space-y-3">
                  <h3 className="text-sm font-bold text-[var(--color-text-dark)]">
                    🔥 Trending Engineering Topics
                  </h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2 rounded-xl bg-white/70 border border-slate-100">
                      <span className="font-semibold text-emerald-800">#SystemsProgramming</span>
                      <span className="text-[10px] text-slate-500">142 posts</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-xl bg-white/70 border border-slate-100">
                      <span className="font-semibold text-teal-800">#BankingLedgerMilestone</span>
                      <span className="text-[10px] text-slate-500">98 posts</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-xl bg-white/70 border border-slate-100">
                      <span className="font-semibold text-emerald-700">#GooglePlacementOA</span>
                      <span className="text-[10px] text-slate-500">84 posts</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-xl bg-white/70 border border-slate-100">
                      <span className="font-semibold text-green-800">#BTreeIndexing</span>
                      <span className="text-[10px] text-slate-500">65 posts</span>
                    </div>
                  </div>
                </div>

                {/* Top Student Contributors */}
                <div className="rounded-3xl glass-surface-elevated p-6 border border-white/80 shadow-md space-y-3">
                  <h3 className="text-sm font-bold text-[var(--color-text-dark)]">
                    🥇 Top Learners This Week
                  </h3>
                  <div className="space-y-2.5 text-xs">
                    {leaderboardEngineers.slice(0, 3).map((eng, idx) => (
                      <div key={eng.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`font-bold ${idx === 0 ? "text-amber-500" : idx === 1 ? "text-slate-400" : "text-amber-700"}`}>
                            {idx === 0 ? "🥇" : idx === 1 ? "🥈" : "🥉"}
                          </span>
                          <div>
                            <p className="font-bold text-[var(--color-text-dark)]">{eng.name}</p>
                            <p className="text-[10px] text-[var(--color-text-secondary)]">{eng.branch} • {eng.xp.toLocaleString()} XP</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                          {eng.streak}d streak
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Community Values */}
                <div className="rounded-3xl glass-surface-elevated p-6 border border-white/80 shadow-md space-y-2 text-xs">
                  <h3 className="text-sm font-bold text-[var(--color-text-dark)]">
                    🛡️ Community Guidelines
                  </h3>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed">
                    CampusGrow is a constructive space dedicated to practical software engineering for students of all engineering departments. Share code snippets with context, respect peers from all academic years, and uplift each other toward placement excellence.
                  </p>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* TAB 2: LEADERBOARD */}
        {activeMainTab === "leaderboard" && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Leaderboard Top Metric Bar & Timeframe Filters */}
            <div className="rounded-3xl glass-surface-elevated p-6 border border-white/80 shadow-lg space-y-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🏆</span>
                    <h2 className="text-xl font-extrabold text-[var(--color-text-dark)]">
                      All-India Engineering Student Rankings
                    </h2>
                  </div>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                    Verified rank calculation based on concept mastery, active daily streak, capstone code reviews, and OA mock assessments.
                  </p>
                </div>

                {/* Timeframe Filter Buttons */}
                <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 border border-slate-200">
                  <button
                    onClick={() => setLeaderboardTimeframe("weekly")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      leaderboardTimeframe === "weekly"
                        ? "bg-[#16865A] text-white shadow-xs"
                        : "text-[var(--color-text-secondary)] hover:text-emerald-800"
                    }`}
                  >
                    Weekly Sprint
                  </button>
                  <button
                    onClick={() => setLeaderboardTimeframe("monthly")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      leaderboardTimeframe === "monthly"
                        ? "bg-[#16865A] text-white shadow-xs"
                        : "text-[var(--color-text-secondary)] hover:text-emerald-800"
                    }`}
                  >
                    Monthly League
                  </button>
                  <button
                    onClick={() => setLeaderboardTimeframe("allTime")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      leaderboardTimeframe === "allTime"
                        ? "bg-[#16865A] text-white shadow-xs"
                        : "text-[var(--color-text-secondary)] hover:text-emerald-800"
                    }`}
                  >
                    All-Time Hall of Fame
                  </button>
                </div>
              </div>

              {/* Branch Filter Pills */}
              <div className="pt-3 border-t border-slate-200/60 flex items-center gap-2 overflow-x-auto pb-1">
                <span className="text-xs font-bold text-[var(--color-text-secondary)] whitespace-nowrap">
                  Filter by Branch:
                </span>
                {allBranchesList.map((br) => (
                  <button
                    key={br}
                    onClick={() => setLeaderboardBranch(br)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      leaderboardBranch === br
                        ? "bg-emerald-700 text-white shadow-xs"
                        : "bg-white/80 text-[var(--color-text-secondary)] hover:text-emerald-800 border border-slate-200 hover:bg-emerald-50"
                    }`}
                  >
                    {br}
                  </button>
                ))}
              </div>
            </div>

            {/* Top 3 Podium Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
              {/* Rank 2 (Silver) */}
              <div className="rounded-3xl glass-surface-elevated p-6 border-2 border-slate-300 shadow-md text-center space-y-3 relative order-2 md:order-1 bg-gradient-to-b from-slate-50/70 to-white/90">
                <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-700 font-extrabold flex items-center justify-center text-lg mx-auto border border-slate-300">
                  🥈
                </div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-slate-600 to-slate-400 text-white font-bold flex items-center justify-center text-xl mx-auto shadow-md">
                  {leaderboardEngineers[1].avatar}
                </div>
                <div>
                  <h3 className="font-bold text-base text-[var(--color-text-dark)]">{leaderboardEngineers[1].name}</h3>
                  <p className="text-xs text-[var(--color-text-secondary)]">{leaderboardEngineers[1].college} • {leaderboardEngineers[1].branch}</p>
                </div>
                <div className="p-3 rounded-2xl bg-white border border-slate-100 space-y-1 text-xs">
                  <div className="flex justify-between font-bold text-[var(--color-text-dark)]">
                    <span>Rank #2</span>
                    <span className="text-emerald-700">{leaderboardEngineers[1].xp.toLocaleString()} XP</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-[var(--color-text-secondary)]">
                    <span>🔥 {leaderboardEngineers[1].streak} Day Streak</span>
                    <span>🛠️ {leaderboardEngineers[1].capstonesShipped} Capstones</span>
                  </div>
                </div>
                <span className="inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800">
                  {leaderboardEngineers[1].badge}
                </span>
              </div>

              {/* Rank 1 (Gold) */}
              <div className="rounded-3xl glass-surface-elevated p-6 border-2 border-amber-400 shadow-xl text-center space-y-4 relative order-1 md:order-2 bg-gradient-to-b from-amber-50/80 to-white/95 scale-100 md:scale-105 z-10">
                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-400 text-amber-950 font-extrabold text-xs shadow-xs">
                  <span>👑</span>
                  <span>CURRENT LEAGUE LEADER</span>
                </div>
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#16865A] to-[#75C99A] text-white font-extrabold flex items-center justify-center text-2xl mx-auto shadow-lg ring-4 ring-amber-300">
                  {leaderboardEngineers[0].avatar}
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-[var(--color-text-dark)]">{leaderboardEngineers[0].name}</h3>
                  <p className="text-xs font-semibold text-emerald-800">{leaderboardEngineers[0].college} • {leaderboardEngineers[0].branch} ({leaderboardEngineers[0].year})</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-amber-200/80 shadow-xs space-y-1.5 text-xs">
                  <div className="flex justify-between font-extrabold text-sm text-[var(--color-text-dark)]">
                    <span className="text-amber-600">Rank #1 Global</span>
                    <span className="text-emerald-700 font-mono">{leaderboardEngineers[0].xp.toLocaleString()} XP</span>
                  </div>
                  <div className="flex justify-between text-[11px] font-medium text-[var(--color-text-secondary)]">
                    <span>🔥 {leaderboardEngineers[0].streak} Day Streak</span>
                    <span>🛠️ {leaderboardEngineers[0].capstonesShipped} Capstones Shipped</span>
                  </div>
                  <div className="text-[11px] text-left text-slate-600 border-t border-slate-100 pt-1">
                    <span>📚 {leaderboardEngineers[0].lessonsVerified} Verified Lessons Completed</span>
                  </div>
                </div>
                <span className="inline-block text-[11px] font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                  ⚡ {leaderboardEngineers[0].tier} • {leaderboardEngineers[0].badge}
                </span>
              </div>

              {/* Rank 3 (Bronze) */}
              <div className="rounded-3xl glass-surface-elevated p-6 border-2 border-amber-700/40 shadow-md text-center space-y-3 relative order-3 bg-gradient-to-b from-amber-50/50 to-white/90">
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-900 font-extrabold flex items-center justify-center text-lg mx-auto border border-amber-300">
                  🥉
                </div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-800 to-amber-600 text-white font-bold flex items-center justify-center text-xl mx-auto shadow-md">
                  {leaderboardEngineers[2].avatar}
                </div>
                <div>
                  <h3 className="font-bold text-base text-[var(--color-text-dark)]">{leaderboardEngineers[2].name}</h3>
                  <p className="text-xs text-[var(--color-text-secondary)]">{leaderboardEngineers[2].college} • {leaderboardEngineers[2].branch}</p>
                </div>
                <div className="p-3 rounded-2xl bg-white border border-slate-100 space-y-1 text-xs">
                  <div className="flex justify-between font-bold text-[var(--color-text-dark)]">
                    <span>Rank #3</span>
                    <span className="text-emerald-700">{leaderboardEngineers[2].xp.toLocaleString()} XP</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-[var(--color-text-secondary)]">
                    <span>🔥 {leaderboardEngineers[2].streak} Day Streak</span>
                    <span>🛠️ {leaderboardEngineers[2].capstonesShipped} Capstones</span>
                  </div>
                </div>
                <span className="inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900">
                  {leaderboardEngineers[2].badge}
                </span>
              </div>
            </div>

            {/* Main Leaderboard Table and Branch League */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* RANKED TABLE (2 cols) */}
              <div className="lg:col-span-2 space-y-4">
                <div className="rounded-3xl glass-surface-elevated p-6 border border-white/80 shadow-md space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
                    <h3 className="text-base font-bold text-[var(--color-text-dark)]">
                      Top Ranked Engineers ({filteredLeaderboard.length})
                    </h3>
                    <span className="text-xs text-[var(--color-text-secondary)]">
                      Updated hourly • Syncs with Studio & Journey
                    </span>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {filteredLeaderboard.map((eng) => (
                      <div
                        key={eng.rank}
                        className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-emerald-50/40 px-2 rounded-2xl transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-xl font-bold flex items-center justify-center text-xs ${
                              eng.rank === 1
                                ? "bg-amber-400 text-amber-950 font-extrabold shadow-xs"
                                : eng.rank === 2
                                ? "bg-slate-300 text-slate-800"
                                : eng.rank === 3
                                ? "bg-amber-200 text-amber-900"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            #{eng.rank}
                          </div>

                          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#16865A] to-[#75C99A] text-white font-bold flex items-center justify-center text-xs shadow-xs">
                            {eng.avatar}
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-bold text-[var(--color-text-dark)]">{eng.name}</p>
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                {eng.branch}
                              </span>
                            </div>
                            <p className="text-[11px] text-[var(--color-text-secondary)]">
                              {eng.college} • {eng.year}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 self-end sm:self-center">
                          <div className="text-right text-xs">
                            <span className="font-extrabold text-[var(--color-text-dark)] block">
                              {eng.xp.toLocaleString()} XP
                            </span>
                            <span className="text-[10px] text-emerald-700 font-semibold">
                              🔥 {eng.streak}d streak • 🛠️ {eng.capstonesShipped} projects
                            </span>
                          </div>

                          <span className="px-2.5 py-1 rounded-xl text-[10px] font-bold bg-white border border-slate-200 text-[var(--color-text-dark)] shadow-xs">
                            {eng.tier}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* BRANCH CHAMPIONSHIPS & XP RULES (1 col) */}
              <div className="space-y-6">
                
                {/* Branch Championship League */}
                <div className="rounded-3xl glass-surface-elevated p-6 border border-white/80 shadow-md space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-[var(--color-text-dark)]">
                      🏛️ Branch Championship League
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      Inter-Dept Cup
                    </span>
                  </div>
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    Cumulative XP scored by all enrolled students in each computer engineering branch.
                  </p>

                  <div className="space-y-2.5 text-xs">
                    {branchChampionships.map((b) => (
                      <div
                        key={b.rank}
                        className="p-3 rounded-2xl bg-white/70 border border-slate-100 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-base">{b.trophy}</span>
                          <div>
                            <p className="font-bold text-[var(--color-text-dark)] text-xs">{b.branch}</p>
                            <p className="text-[10px] text-[var(--color-text-secondary)]">{b.activeLearners} active builders</p>
                          </div>
                        </div>
                        <span className="font-extrabold text-emerald-800 font-mono text-xs">{b.xp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* How to Earn XP & Climb */}
                <div className="rounded-3xl glass-surface-elevated p-6 border border-white/80 shadow-md space-y-3 text-xs">
                  <h3 className="text-sm font-bold text-[var(--color-text-dark)]">
                    ⚡ How to Earn XP & Climb
                  </h3>
                  <div className="space-y-2 text-[var(--color-text-secondary)]">
                    <div className="flex items-center justify-between p-2 rounded-xl bg-white/70 border border-slate-100">
                      <span>Complete a Domain Lesson</span>
                      <span className="font-bold text-emerald-700">+50 XP</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-xl bg-white/70 border border-slate-100">
                      <span>Ship a Milestone Capstone Project</span>
                      <span className="font-bold text-emerald-700">+250 XP</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-xl bg-white/70 border border-slate-100">
                      <span>Pass an AI Mock Interview</span>
                      <span className="font-bold text-emerald-700">+120 XP</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-xl bg-white/70 border border-slate-100">
                      <span>Daily Coding Streak Check-in</span>
                      <span className="font-bold text-emerald-700">+20 XP</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-xl bg-white/70 border border-slate-100">
                      <span>Help a Peer with Accepted Answer</span>
                      <span className="font-bold text-emerald-700">+35 XP</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

      </div>

      {/* CREATE POST MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-xl rounded-3xl glass-surface-elevated p-6 sm:p-8 border border-white/80 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
              <h3 className="text-lg font-bold text-[var(--color-text-dark)]">
                Start a New Discussion
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-200/80 flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[var(--color-text-dark)] mb-1">
                  Discussion Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. How I implemented LRU Cache in C..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-[var(--color-text-dark)] focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-[var(--color-text-dark)] mb-1">
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-[var(--color-text-dark)] focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Project Showcase">Project Showcase</option>
                  <option value="Doubt Clarification">Doubt Clarification</option>
                  <option value="Placement & Career">Placement & Career</option>
                  <option value="Study Groups">Study Groups</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[var(--color-text-dark)] mb-1">
                  Discussion Content
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your solution, architecture trade-off, or doubt in detail..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-[var(--color-text-dark)] focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-[var(--color-text-dark)] mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Systems, C, DataStructures, Placement"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-[var(--color-text-dark)] focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200/60">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold glass-surface cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-emerald-gradient px-5 py-2 rounded-xl text-xs font-bold shadow cursor-pointer"
                >
                  Publish Discussion 🚀
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </AmbientBackground>
  );
}
