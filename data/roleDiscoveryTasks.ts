export interface StudentAttendanceRecord {
  id: string;
  name: string;
  rollNo: string;
  status: "Present" | "Absent" | "Late";
  avatarEmoji: string;
}

export interface Day1BuildState {
  students: StudentAttendanceRecord[];
  calculationFormula: "correct" | "inverse" | "fixed";
  thresholdCondition: "lt75" | "lte50" | "always";
  activeFilter: "All" | "Present" | "Absent" | "Late";
  requirementsChecked: {
    listRendered: boolean;
    statusToggle: boolean;
    percentageMath: boolean;
    thresholdAlert: boolean;
    filterApplied: boolean;
  };
}

export interface AttendanceStudentData {
  id: string;
  rollNo: string;
  name: string;
  totalClasses: number;
  attendedClasses: number;
  attendanceRate: number; // percentage
  fridayAttendanceRate: number; // percentage
  labMissRate: number; // percentage
  trend: "Critical" | "At-Risk" | "Good" | "Excellent";
  primaryIssue: string;
}

export const COHORT_30_STUDENTS: AttendanceStudentData[] = [
  { id: "s1", rollNo: "CS2101", name: "Aarav Sharma", totalClasses: 40, attendedClasses: 36, attendanceRate: 90, fridayAttendanceRate: 88, labMissRate: 5, trend: "Excellent", primaryIssue: "None" },
  { id: "s2", rollNo: "CS2102", name: "Ananya Iyer", totalClasses: 40, attendedClasses: 28, attendanceRate: 70, fridayAttendanceRate: 38, labMissRate: 55, trend: "At-Risk", primaryIssue: "Misses Friday Labs" },
  { id: "s3", rollNo: "CS2103", name: "Rohan Patel", totalClasses: 40, attendedClasses: 34, attendanceRate: 85, fridayAttendanceRate: 80, labMissRate: 10, trend: "Good", primaryIssue: "None" },
  { id: "s4", rollNo: "CS2104", name: "Pooja Hegde", totalClasses: 40, attendedClasses: 26, attendanceRate: 65, fridayAttendanceRate: 25, labMissRate: 70, trend: "Critical", primaryIssue: "Consistent Friday Dropouts" },
  { id: "s5", rollNo: "CS2105", name: "Vikram Malhotra", totalClasses: 40, attendedClasses: 38, attendanceRate: 95, fridayAttendanceRate: 95, labMissRate: 0, trend: "Excellent", primaryIssue: "None" },
  { id: "s6", rollNo: "CS2106", name: "Kavya Menon", totalClasses: 40, attendedClasses: 29, attendanceRate: 72.5, fridayAttendanceRate: 40, labMissRate: 60, trend: "At-Risk", primaryIssue: "Misses Friday Labs" },
  { id: "s7", rollNo: "CS2107", name: "Arjun Reddy", totalClasses: 40, attendedClasses: 33, attendanceRate: 82.5, fridayAttendanceRate: 80, labMissRate: 15, trend: "Good", primaryIssue: "None" },
  { id: "s8", rollNo: "CS2108", name: "Sneha Nair", totalClasses: 40, attendedClasses: 37, attendanceRate: 92.5, fridayAttendanceRate: 90, labMissRate: 5, trend: "Excellent", primaryIssue: "None" },
  { id: "s9", rollNo: "CS2109", name: "Aditya Joshi", totalClasses: 40, attendedClasses: 27, attendanceRate: 67.5, fridayAttendanceRate: 35, labMissRate: 65, trend: "At-Risk", primaryIssue: "Friday Afternoon Debarment Risk" },
  { id: "s10", rollNo: "CS2110", name: "Divya Pillai", totalClasses: 40, attendedClasses: 35, attendanceRate: 87.5, fridayAttendanceRate: 85, labMissRate: 10, trend: "Good", primaryIssue: "None" },
  { id: "s11", rollNo: "CS2111", name: "Siddharth Rao", totalClasses: 40, attendedClasses: 24, attendanceRate: 60, fridayAttendanceRate: 20, labMissRate: 75, trend: "Critical", primaryIssue: "Chronic Friday Absence" },
  { id: "s12", rollNo: "CS2112", name: "Rhea Sen", totalClasses: 40, attendedClasses: 36, attendanceRate: 90, fridayAttendanceRate: 92, labMissRate: 5, trend: "Excellent", primaryIssue: "None" },
  { id: "s13", rollNo: "CS2113", name: "Kunal Verma", totalClasses: 40, attendedClasses: 32, attendanceRate: 80, fridayAttendanceRate: 75, labMissRate: 15, trend: "Good", primaryIssue: "None" },
  { id: "s14", rollNo: "CS2114", name: "Tanvi Deshmukh", totalClasses: 40, attendedClasses: 29, attendanceRate: 72.5, fridayAttendanceRate: 42, labMissRate: 58, trend: "At-Risk", primaryIssue: "Misses Friday Labs" },
  { id: "s15", rollNo: "CS2115", name: "Varun Mehta", totalClasses: 40, attendedClasses: 39, attendanceRate: 97.5, fridayAttendanceRate: 100, labMissRate: 0, trend: "Excellent", primaryIssue: "None" },
  { id: "s16", rollNo: "CS2116", name: "Meera Krishnan", totalClasses: 40, attendedClasses: 31, attendanceRate: 77.5, fridayAttendanceRate: 70, labMissRate: 20, trend: "Good", primaryIssue: "Borderline Attendance" },
  { id: "s17", rollNo: "CS2117", name: "Nikhil Chawla", totalClasses: 40, attendedClasses: 25, attendanceRate: 62.5, fridayAttendanceRate: 30, labMissRate: 68, trend: "Critical", primaryIssue: "Friday Lab Drop-off" },
  { id: "s18", rollNo: "CS2118", name: "Priyanka Roy", totalClasses: 40, attendedClasses: 37, attendanceRate: 92.5, fridayAttendanceRate: 90, labMissRate: 5, trend: "Excellent", primaryIssue: "None" },
  { id: "s19", rollNo: "CS2119", name: "Harsh Bansal", totalClasses: 40, attendedClasses: 33, attendanceRate: 82.5, fridayAttendanceRate: 78, labMissRate: 15, trend: "Good", primaryIssue: "None" },
  { id: "s20", rollNo: "CS2120", name: "Shreya Ghoshal", totalClasses: 40, attendedClasses: 30, attendanceRate: 75, fridayAttendanceRate: 65, labMissRate: 25, trend: "Good", primaryIssue: "Exact Cutoff Threshold" },
  { id: "s21", rollNo: "CS2121", name: "Kabir Das", totalClasses: 40, attendedClasses: 23, attendanceRate: 57.5, fridayAttendanceRate: 15, labMissRate: 82, trend: "Critical", primaryIssue: "Extreme Friday Absenteeism" },
  { id: "s22", rollNo: "CS2122", name: "Ishaan Gupta", totalClasses: 40, attendedClasses: 35, attendanceRate: 87.5, fridayAttendanceRate: 85, labMissRate: 10, trend: "Good", primaryIssue: "None" },
  { id: "s23", rollNo: "CS2123", name: "Neha Saxena", totalClasses: 40, attendedClasses: 38, attendanceRate: 95, fridayAttendanceRate: 95, labMissRate: 0, trend: "Excellent", primaryIssue: "None" },
  { id: "s24", rollNo: "CS2124", name: "Mohit Agarwal", totalClasses: 40, attendedClasses: 28, attendanceRate: 70, fridayAttendanceRate: 40, labMissRate: 56, trend: "At-Risk", primaryIssue: "Friday Lab Misses" },
  { id: "s25", rollNo: "CS2125", name: "Tara Bhatt", totalClasses: 40, attendedClasses: 36, attendanceRate: 90, fridayAttendanceRate: 88, labMissRate: 5, trend: "Excellent", primaryIssue: "None" },
  { id: "s26", rollNo: "CS2126", name: "Abhishek Nambiar", totalClasses: 40, attendedClasses: 34, attendanceRate: 85, fridayAttendanceRate: 82, labMissRate: 12, trend: "Good", primaryIssue: "None" },
  { id: "s27", rollNo: "CS2127", name: "Simran Kaur", totalClasses: 40, attendedClasses: 32, attendanceRate: 80, fridayAttendanceRate: 75, labMissRate: 18, trend: "Good", primaryIssue: "None" },
  { id: "s28", rollNo: "CS2128", name: "Gautam Seth", totalClasses: 40, attendedClasses: 27, attendanceRate: 67.5, fridayAttendanceRate: 32, labMissRate: 64, trend: "At-Risk", primaryIssue: "Friday Afternoon Anomaly" },
  { id: "s29", rollNo: "CS2129", name: "Ritika Sen", totalClasses: 40, attendedClasses: 37, attendanceRate: 92.5, fridayAttendanceRate: 92, labMissRate: 5, trend: "Excellent", primaryIssue: "None" },
  { id: "s30", rollNo: "CS2130", name: "Yashvardhan K", totalClasses: 40, attendedClasses: 35, attendanceRate: 87.5, fridayAttendanceRate: 85, labMissRate: 10, trend: "Good", primaryIssue: "None" },
];

export interface Day3IncidentStation {
  id: string;
  name: string;
  tagline: string;
  icon: string;
}

export const DAY3_STATIONS: Day3IncidentStation[] = [
  {
    id: "debug",
    name: "Station 1: Code & Logic Debugging",
    tagline: "Fix null pointer exceptions and race-condition loops in the API gateway controller.",
    icon: "🔍",
  },
  {
    id: "security",
    name: "Station 2: Security Threat Hunting",
    tagline: "Detect automated brute-force and SQL injection attacks in live auth logs.",
    icon: "🛡️",
  },
  {
    id: "system",
    name: "Station 3: System Resilience & Scale",
    tagline: "Architect a fault-tolerant edge-to-database pipeline for a 10,000 req/s exam spike.",
    icon: "⚙️",
  },
];
