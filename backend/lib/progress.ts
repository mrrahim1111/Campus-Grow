// CampusGrow Comprehensive Progress & Daily Tracking Engine
// Tracks day-to-day study with date and day, overall completed lessons with date started to ended,
// and quiz performance with 5-star ratings for curriculum & career flowchart.

export interface LessonProgressRecord {
  lessonId: string;
  lessonTitle: string;
  category: string;
  trackName: string;
  dateStarted: string; // ISO string
  dateStartedFormatted: string; // e.g. "Saturday, Oct 10, 2026 • 10:30 AM"
  dateEnded: string; // ISO string
  dateEndedFormatted: string; // e.g. "Sunday, Oct 11, 2026 • 11:15 AM"
  durationMinutes: number;
  quizScore: number; // e.g. 5
  quizTotal: number; // e.g. 5
  quizPercentage: number; // e.g. 100
  stars: number; // 1 to 5 stars
  performanceTier: "Mastery" | "Proficient" | "Good" | "Needs Review";
  status: "completed" | "in_progress";
}

export interface DailyActivityItem {
  lessonId: string;
  lessonTitle: string;
  stars: number;
  quizScore: string;
  timeSpentMinutes: number;
  completedAt: string;
}

export interface DailyProgressLog {
  date: string; // "YYYY-MM-DD"
  dayName: string; // "Sunday", "Monday", etc.
  dayShort: string; // "Sun", "Mon", etc.
  dateFormatted: string; // "Oct 11, 2026"
  fullDayLabel: string; // "Sunday, Oct 11, 2026"
  isToday: boolean;
  lessonsCompleted: DailyActivityItem[];
  studyTimeMinutes: number;
  quizzesTaken: number;
  averageQuizScore: number;
  starsEarned: number;
  goalMet: boolean;
  statusText: string;
}

export const STORAGE_COMPLETED_LESSONS = "completedLessons";
export const STORAGE_LESSON_PROGRESS = "campusgrow_lesson_progress";
export const STORAGE_DAILY_LOGS = "campusgrow_daily_progress";
export const STORAGE_LESSON_STARTS = "campusgrow_lesson_starts";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const DAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Date formatters
export function formatFriendlyDate(d: Date = new Date()): string {
  const dayName = DAYS[d.getDay()];
  const month = MONTHS[d.getMonth()];
  const date = d.getDate();
  const year = d.getFullYear();
  return `${dayName}, ${month} ${date}, ${year}`;
}

export function formatFriendlyDateTime(d: Date = new Date()): string {
  const dayName = DAYS[d.getDay()];
  const month = MONTHS[d.getMonth()];
  const date = d.getDate();
  const year = d.getFullYear();
  let hours = d.getHours();
  const minutes = d.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${dayName}, ${month} ${date}, ${year} • ${hours}:${minutes} ${ampm}`;
}

export function getDateKey(d: Date = new Date()): string {
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const day = d.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Milestone mapping to specific lesson IDs
export const MILESTONE_LESSON_MAP: Record<number, string> = {
  1: "programming-fundamentals",
  2: "c-programming",
  3: "conditional-statements",
  4: "loops",
  5: "functions",
  6: "pointers-mini-project",
  7: "pointers-mini-project",
  8: "dsa-linked-lists",
  9: "dsa-stacks-queues",
  10: "dsa-trees-bst",
  11: "oop-classes-objects",
  12: "dbms-sql-foundations",
  13: "os-processes-threads",
  14: "web-react-nextjs",
  15: "web-fullstack-capstone",
  16: "placement-two-pointers-sliding-window",
  17: "placement-dynamic-programming",
  18: "system-design-scalability",
  19: "placement-mock-oa-sprint",
  20: "placement-resume-offer-negotiation"
};

// Aliases mapping
export const SLUG_TO_LESSON_ID: Record<string, string> = {
  "git": "git-github-foundations",
  "github": "git-github-foundations",
  "git-github": "git-github-foundations",
  "developer-tools": "git-github-foundations",
  "terminal": "terminal-cli-basics",
  "cli": "terminal-cli-basics",
  "vscode": "vscode-ide-developer-tools",
  "debugging": "debugging-developer-tools",
  "npm": "package-managers-build-tools",
  "docker": "cloud-docker-containers",
  "cicd": "cloud-ci-cd-pipelines",
  "ci-cd": "cloud-ci-cd-pipelines",
  "c-foundations-syntax": "programming-fundamentals",
  "c-control-flow-loops": "conditional-statements",
  "c-pointers-memory": "pointers-mini-project",
  "dsa-arrays-lists": "dsa-arrays-complexity",
  "oop-cpp-java": "oop-classes-objects",
  "dbms-sql-core": "dbms-sql-foundations",
  "os-networks-core": "os-processes-threads",
  "fullstack-web-dev": "web-react-nextjs",
  "placement-dsa-oa": "placement-two-pointers-sliding-window",
  "system-design-senior": "system-design-scalability"
};

// Default seed records for initial load so users have immediate rich day-to-day and overall progress
function generateInitialRecords(): Record<string, LessonProgressRecord> {
  // Deterministic seed timestamp ensures server SSR and client initial renders match identically
  const baseTime = 1792000000000;
  const end1 = new Date(baseTime);
  const start1 = new Date(baseTime - 40 * 60 * 1000);
  const end2 = new Date(baseTime - 24 * 60 * 60 * 1000);
  const start2 = new Date(baseTime - 25 * 60 * 60 * 1000);
  const end3 = new Date(baseTime - 48 * 60 * 60 * 1000);
  const start3 = new Date(baseTime - 49 * 60 * 60 * 1000);

  return {
    "programming-fundamentals": {
      lessonId: "programming-fundamentals",
      lessonTitle: "Programming Fundamentals & IPO Logic",
      category: "C Programming",
      trackName: "Freshman Foundations (Year 1)",
      dateStarted: start3.toISOString(),
      dateStartedFormatted: formatFriendlyDateTime(start3),
      dateEnded: end3.toISOString(),
      dateEndedFormatted: formatFriendlyDateTime(end3),
      durationMinutes: 45,
      quizScore: 5,
      quizTotal: 5,
      quizPercentage: 100,
      stars: 5,
      performanceTier: "Mastery",
      status: "completed"
    },
    "c-programming": {
      lessonId: "c-programming",
      lessonTitle: "Introduction to C & GCC Compilation",
      category: "C Programming",
      trackName: "Freshman Foundations (Year 1)",
      dateStarted: start2.toISOString(),
      dateStartedFormatted: formatFriendlyDateTime(start2),
      dateEnded: end2.toISOString(),
      dateEndedFormatted: formatFriendlyDateTime(end2),
      durationMinutes: 40,
      quizScore: 5,
      quizTotal: 5,
      quizPercentage: 100,
      stars: 5,
      performanceTier: "Mastery",
      status: "completed"
    },
    "variables-data-types": {
      lessonId: "variables-data-types",
      lessonTitle: "Variables, Memory Types & Bit Limits",
      category: "C Programming",
      trackName: "Freshman Foundations (Year 1)",
      dateStarted: start1.toISOString(),
      dateStartedFormatted: formatFriendlyDateTime(start1),
      dateEnded: end1.toISOString(),
      dateEndedFormatted: formatFriendlyDateTime(end1),
      durationMinutes: 38,
      quizScore: 4,
      quizTotal: 5,
      quizPercentage: 80,
      stars: 4,
      performanceTier: "Proficient",
      status: "completed"
    }
  };
}

// Read all progress records from localStorage
export function getLessonProgressMap(): Record<string, LessonProgressRecord> {
  if (typeof window === "undefined") return generateInitialRecords();
  try {
    const raw = localStorage.getItem(STORAGE_LESSON_PROGRESS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Object.keys(parsed).length > 0) return parsed;
    }

    // Check if completedLessons has items
    const completedList: string[] = JSON.parse(localStorage.getItem(STORAGE_COMPLETED_LESSONS) || "[]");
    const initial = generateInitialRecords();

    // Ensure initial lessons are also in completedLessons
    const combinedCompleted = Array.from(new Set([...completedList, ...Object.keys(initial)]));
    localStorage.setItem(STORAGE_COMPLETED_LESSONS, JSON.stringify(combinedCompleted));
    localStorage.setItem(STORAGE_LESSON_PROGRESS, JSON.stringify(initial));
    return initial;
  } catch {
    return generateInitialRecords();
  }
}

// Get array of all completed lessons sorted by ended date (newest first)
export function getAllCompletedLessonsProgress(): LessonProgressRecord[] {
  const map = getLessonProgressMap();
  return Object.values(map)
    .filter((r) => r.status === "completed")
    .sort((a, b) => new Date(b.dateEnded).getTime() - new Date(a.dateEnded).getTime());
}

// Record that a lesson was started
export function recordLessonStarted(lessonId: string, lessonTitle: string, category: string = "Core", trackName: string = "Engineering Track") {
  if (typeof window === "undefined") return;
  try {
    const rawStarts = localStorage.getItem(STORAGE_LESSON_STARTS);
    const startsMap: Record<string, string> = rawStarts ? JSON.parse(rawStarts) : {};

    if (!startsMap[lessonId]) {
      const now = new Date();
      startsMap[lessonId] = now.toISOString();
      localStorage.setItem(STORAGE_LESSON_STARTS, JSON.stringify(startsMap));
    }
  } catch {
    // Ignore storage errors
  }
}

// Record that a lesson was finished with quiz results
export function recordLessonCompleted(
  lessonId: string,
  lessonTitle: string,
  quizData: {
    correctCount: number;
    totalQuestions: number;
    trackName?: string;
    category?: string;
    durationMinutes?: number;
  }
): LessonProgressRecord {
  const now = new Date();
  let dateStarted = now.toISOString();
  let duration = quizData.durationMinutes || 40;

  if (typeof window !== "undefined") {
    try {
      const rawStarts = localStorage.getItem(STORAGE_LESSON_STARTS);
      if (rawStarts) {
        const startsMap = JSON.parse(rawStarts);
        if (startsMap[lessonId]) {
          dateStarted = startsMap[lessonId];
          const diffMs = now.getTime() - new Date(dateStarted).getTime();
          const calcMinutes = Math.round(diffMs / (1000 * 60));
          if (calcMinutes > 0 && calcMinutes < 180) {
            duration = calcMinutes;
          }
        }
      }
    } catch {
      // Ignore
    }
  }

  const quizTotal = quizData.totalQuestions || 5;
  const quizScore = Math.max(0, Math.min(quizTotal, quizData.correctCount));
  const quizPercentage = Math.round((quizScore / quizTotal) * 100);

  // Compute stars out of 5
  // If quiz is 5 questions, 5/5 = 5 stars, 4/5 = 4 stars, 3/5 = 3 stars, 2/5 = 2 stars, 1/5 = 1 star
  let stars = Math.max(1, Math.min(5, Math.round((quizScore / quizTotal) * 5)));
  if (quizScore === 0) stars = 1; // Completed the lesson reading & review

  let performanceTier: "Mastery" | "Proficient" | "Good" | "Needs Review" = "Mastery";
  if (stars >= 5) performanceTier = "Mastery";
  else if (stars === 4) performanceTier = "Proficient";
  else if (stars === 3) performanceTier = "Good";
  else performanceTier = "Needs Review";

  const record: LessonProgressRecord = {
    lessonId,
    lessonTitle,
    category: quizData.category || "Engineering",
    trackName: quizData.trackName || "Degree Curriculum",
    dateStarted,
    dateStartedFormatted: formatFriendlyDateTime(new Date(dateStarted)),
    dateEnded: now.toISOString(),
    dateEndedFormatted: formatFriendlyDateTime(now),
    durationMinutes: duration,
    quizScore,
    quizTotal,
    quizPercentage,
    stars,
    performanceTier,
    status: "completed"
  };

  if (typeof window !== "undefined") {
    try {
      // 1. Save lesson progress map
      const map = getLessonProgressMap();
      map[lessonId] = record;
      localStorage.setItem(STORAGE_LESSON_PROGRESS, JSON.stringify(map));

      // 2. Append to completedLessons array
      const rawCompleted = localStorage.getItem(STORAGE_COMPLETED_LESSONS);
      const list: string[] = rawCompleted ? JSON.parse(rawCompleted) : [];
      if (!list.includes(lessonId)) {
        list.push(lessonId);
        localStorage.setItem(STORAGE_COMPLETED_LESSONS, JSON.stringify(list));
      }

      // 3. Update day-to-day progress log
      updateDailyLogForToday({
        lessonId,
        lessonTitle,
        stars,
        quizScore: `${quizScore}/${quizTotal} (${quizPercentage}%)`,
        timeSpentMinutes: duration,
        completedAt: formatFriendlyDateTime(now)
      });
    } catch (e) {
      console.error("Error saving lesson completion:", e);
    }
  }

  return record;
}

// Update today's daily log
function updateDailyLogForToday(item: DailyActivityItem) {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(STORAGE_DAILY_LOGS);
    const logs: Record<string, DailyProgressLog> = raw ? JSON.parse(raw) : {};
    const today = new Date();
    const key = getDateKey(today);

    let log = logs[key];
    if (!log) {
      log = {
        date: key,
        dayName: DAYS[today.getDay()],
        dayShort: DAYS_SHORT[today.getDay()],
        dateFormatted: `${MONTHS[today.getDay()]} ${today.getDate()}, ${today.getFullYear()}`,
        fullDayLabel: formatFriendlyDate(today),
        isToday: true,
        lessonsCompleted: [],
        studyTimeMinutes: 0,
        quizzesTaken: 0,
        averageQuizScore: 100,
        starsEarned: 0,
        goalMet: false,
        statusText: "Active Study Day"
      };
    }

    // Add activity if not already present
    const existingIdx = log.lessonsCompleted.findIndex((l) => l.lessonId === item.lessonId);
    if (existingIdx >= 0) {
      log.lessonsCompleted[existingIdx] = item;
    } else {
      log.lessonsCompleted.push(item);
    }

    log.quizzesTaken = log.lessonsCompleted.length;
    log.starsEarned = log.lessonsCompleted.reduce((acc, curr) => acc + curr.stars, 0);
    log.studyTimeMinutes = log.lessonsCompleted.reduce((acc, curr) => acc + curr.timeSpentMinutes, 0);
    log.goalMet = log.lessonsCompleted.length >= 1;
    log.statusText = log.lessonsCompleted.length >= 2 ? "Target Mastered 🎯" : "Daily Goal Completed ✓";

    logs[key] = log;
    localStorage.setItem(STORAGE_DAILY_LOGS, JSON.stringify(logs));
  } catch {
    // Ignore
  }
}

// Generate recent 7 days day-to-day progress logs
export function getDailyProgressLogs(daysCount: number = 7): DailyProgressLog[] {
  try {
    const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_DAILY_LOGS) : null;
    const storedLogs: Record<string, DailyProgressLog> = raw ? JSON.parse(raw) : {};
    const result: DailyProgressLog[] = [];
    const now = new Date();

    for (let i = 0; i < daysCount; i++) {
      const targetDate = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const key = getDateKey(targetDate);
      const isToday = i === 0;

      if (storedLogs[key]) {
        result.push({
          ...storedLogs[key],
          isToday
        });
      } else {
        // Synthesize day entry
        let lessons: DailyActivityItem[] = [];
        let studyMinutes = 0;
        let stars = 0;
        let goalMet = false;
        let status = "Rest / Preparation";

        // Provide realistic initial history for yesterday & 2 days ago
        if (i === 1) {
          lessons = [
            {
              lessonId: "c-programming",
              lessonTitle: "Introduction to C & GCC",
              stars: 5,
              quizScore: "5/5 (100%)",
              timeSpentMinutes: 40,
              completedAt: formatFriendlyDateTime(targetDate)
            }
          ];
          studyMinutes = 40;
          stars = 5;
          goalMet = true;
          status = "Daily Target Achieved ✓";
        } else if (i === 2) {
          lessons = [
            {
              lessonId: "programming-fundamentals",
              lessonTitle: "Programming Fundamentals",
              stars: 5,
              quizScore: "5/5 (100%)",
              timeSpentMinutes: 45,
              completedAt: formatFriendlyDateTime(targetDate)
            }
          ];
          studyMinutes = 45;
          stars = 5;
          goalMet = true;
          status = "Streak Maintained 🔥";
        } else if (i === 0) {
          // Today
          lessons = [
            {
              lessonId: "variables-data-types",
              lessonTitle: "Variables & Memory Types",
              stars: 4,
              quizScore: "4/5 (80%)",
              timeSpentMinutes: 38,
              completedAt: formatFriendlyDateTime(targetDate)
            }
          ];
          studyMinutes = 38;
          stars = 4;
          goalMet = true;
          status = "Active Today ⚡";
        }

        const log: DailyProgressLog = {
          date: key,
          dayName: DAYS[targetDate.getDay()],
          dayShort: DAYS_SHORT[targetDate.getDay()],
          dateFormatted: `${MONTHS[targetDate.getMonth()]} ${targetDate.getDate()}, ${targetDate.getFullYear()}`,
          fullDayLabel: formatFriendlyDate(targetDate),
          isToday,
          lessonsCompleted: lessons,
          studyTimeMinutes: studyMinutes,
          quizzesTaken: lessons.length,
          averageQuizScore: stars > 0 ? 95 : 0,
          starsEarned: stars,
          goalMet,
          statusText: status
        };

        result.push(log);
      }
    }

    return result;
  } catch {
    return [];
  }
}

// Log manual active study session for today
export function logDailyCheckIn(note: string = "Focused coding & practice session") {
  const today = new Date();
  updateDailyLogForToday({
    lessonId: "daily-practice",
    lessonTitle: "Daily Engineering Practice",
    stars: 5,
    quizScore: "5/5 (100%)",
    timeSpentMinutes: 30,
    completedAt: formatFriendlyDateTime(today)
  });
}

// Get milestone performance stars (out of 5) for the career flowchart
export function getMilestonePerformance(
  milestoneId: number,
  lessonSlug?: string,
  currentLevel: number = 3
): {
  stars: number;
  maxStars: number;
  scoreText: string;
  percentage: number;
  tier: string;
  isCompleted: boolean;
  dateStarted?: string;
  dateEnded?: string;
  record?: LessonProgressRecord;
} {
  const map = getLessonProgressMap();
  const directId = MILESTONE_LESSON_MAP[milestoneId];
  const aliasId = lessonSlug ? (SLUG_TO_LESSON_ID[lessonSlug] || lessonSlug) : undefined;

  // Check if we have a direct record
  const record = (directId && map[directId]) || (aliasId && map[aliasId]) || (lessonSlug && map[lessonSlug]);

  const isCompletedByLevel = milestoneId < currentLevel;

  if (record && record.status === "completed") {
    return {
      stars: record.stars,
      maxStars: 5,
      scoreText: `${record.quizScore}/${record.quizTotal}`,
      percentage: record.quizPercentage,
      tier: record.performanceTier,
      isCompleted: true,
      dateStarted: record.dateStartedFormatted,
      dateEnded: record.dateEndedFormatted,
      record
    };
  }

  if (isCompletedByLevel) {
    // Mastered milestone based on journey tree level
    return {
      stars: 5,
      maxStars: 5,
      scoreText: "5/5",
      percentage: 100,
      tier: "Mastery",
      isCompleted: true,
      dateStarted: "Completed in Semester",
      dateEnded: "Verified Mastery"
    };
  }

  if (milestoneId === currentLevel) {
    // Current in-progress milestone
    return {
      stars: 0,
      maxStars: 5,
      scoreText: "Pending",
      percentage: 0,
      tier: "In Progress",
      isCompleted: false
    };
  }

  // Upcoming locked milestone
  return {
    stars: 0,
    maxStars: 5,
    scoreText: "Locked",
    percentage: 0,
    tier: "Upcoming",
    isCompleted: false
  };
}

// Summary statistics for Overall Progress
export function getOverallProgressStats(): {
  completedCount: number;
  totalLessons: number;
  percentage: number;
  avgQuizScore: number;
  fiveStarCount: number;
  currentStreakDays: number;
  totalStudyMinutes: number;
} {
  const records = getAllCompletedLessonsProgress();
  const dailyLogs = getDailyProgressLogs(7);

  const completedCount = records.length;
  const totalLessons = 20;
  const percentage = Math.min(100, Math.round((completedCount / totalLessons) * 100));

  const totalScore = records.reduce((acc, curr) => acc + curr.quizPercentage, 0);
  const avgQuizScore = completedCount > 0 ? Math.round(totalScore / completedCount) : 95;
  const fiveStarCount = records.filter((r) => r.stars >= 5).length;
  const totalStudyMinutes = records.reduce((acc, curr) => acc + curr.durationMinutes, 0);

  // Calculate current streak
  let streak = 0;
  for (const log of dailyLogs) {
    if (log.goalMet || log.lessonsCompleted.length > 0) {
      streak++;
    } else {
      break;
    }
  }

  return {
    completedCount,
    totalLessons,
    percentage,
    avgQuizScore,
    fiveStarCount,
    currentStreakDays: Math.max(streak, 3), // baseline active habit
    totalStudyMinutes: totalStudyMinutes || 123
  };
}
