export type Course = {
  id: string;
  code: string;
  title: string;
  category: "AI" | "Web" | "Systems" | "Data" | "Security";
  teacher: string;
  level: "Initiate" | "Operative" | "Architect";
  schedule: string;
  seats: number;
  enrolled: number;
  rating: number;
  xp: number;
  summary: string;
  syllabus: string[];
};

export const COURSES: Course[] = [
  {
    id: "c1",
    code: "AI-401",
    title: "Neural Systems & Applied Deep Learning",
    category: "AI",
    teacher: "Dr. Meera Raghavan",
    level: "Architect",
    schedule: "Mon / Wed · 09:30 – 11:00",
    seats: 60,
    enrolled: 54,
    rating: 4.9,
    xp: 1200,
    summary: "Build, train and deploy neural architectures with real academic datasets.",
    syllabus: ["Tensors & autograd", "CNN / RNN cores", "Transformers", "Model ops & eval"],
  },
  {
    id: "c2",
    code: "WEB-210",
    title: "Full-Stack Web Engineering",
    category: "Web",
    teacher: "Prof. Arun Kishore",
    level: "Operative",
    schedule: "Tue / Thu · 11:15 – 12:45",
    seats: 80,
    enrolled: 71,
    rating: 4.7,
    xp: 900,
    summary: "From semantic markup to edge-deployed APIs, shipped weekly.",
    syllabus: ["Modern React", "APIs & auth", "Databases", "Edge deployment"],
  },
  {
    id: "c3",
    code: "SEC-330",
    title: "Cyber Defense & Threat Intelligence",
    category: "Security",
    teacher: "Dr. Nithya Balan",
    level: "Architect",
    schedule: "Wed / Fri · 14:00 – 15:30",
    seats: 45,
    enrolled: 45,
    rating: 4.8,
    xp: 1100,
    summary: "Offensive and defensive labs on live sandboxed infrastructure.",
    syllabus: ["Recon", "Exploit chains", "Blue-team ops", "Forensics"],
  },
  {
    id: "c4",
    code: "DAT-150",
    title: "Data Structures & Algorithmic Thinking",
    category: "Systems",
    teacher: "Prof. S. Karthik",
    level: "Initiate",
    schedule: "Mon / Fri · 08:00 – 09:30",
    seats: 120,
    enrolled: 98,
    rating: 4.6,
    xp: 700,
    summary: "The core problem-solving grid every engineer runs on.",
    syllabus: ["Complexity", "Trees & graphs", "DP", "Contest patterns"],
  },
  {
    id: "c5",
    code: "DAT-320",
    title: "Statistical Learning & Analytics",
    category: "Data",
    teacher: "Dr. Fatima Sheikh",
    level: "Operative",
    schedule: "Tue / Sat · 10:00 – 11:30",
    seats: 70,
    enrolled: 41,
    rating: 4.5,
    xp: 850,
    summary: "Turn raw academic telemetry into decisions with statistics.",
    syllabus: ["Inference", "Regression", "Clustering", "Reporting"],
  },
  {
    id: "c6",
    code: "AI-120",
    title: "Prompt Systems & AI Tooling",
    category: "AI",
    teacher: "Dr. Meera Raghavan",
    level: "Initiate",
    schedule: "Thu · 16:00 – 18:00",
    seats: 100,
    enrolled: 88,
    rating: 4.9,
    xp: 600,
    summary: "Design reliable AI workflows for study, research and delivery.",
    syllabus: ["Prompt patterns", "Tool calling", "Evaluation", "Guardrails"],
  },
];

export const CATEGORIES = ["All", "AI", "Web", "Systems", "Data", "Security"] as const;

export const STUDENT = {
  name: "Soundar R.",
  handle: "@soundar.exe",
  rank: "Level 14 · Architect Initiate",
  level: 14,
  xp: 8420,
  nextLevelXp: 10000,
  streak: 27,
  attendance: 91,
  cgpa: 8.74,
  rankPosition: 3,
};

export const SUBJECT_PERFORMANCE = [
  { subject: "Neural Systems", score: 88, attendance: 94, risk: "low" as const },
  { subject: "Full-Stack Web", score: 92, attendance: 97, risk: "low" as const },
  { subject: "Cyber Defense", score: 61, attendance: 72, risk: "high" as const },
  { subject: "Data Structures", score: 74, attendance: 85, risk: "medium" as const },
  { subject: "Statistical Learning", score: 69, attendance: 78, risk: "medium" as const },
];

export const PROGRESS_TREND = [
  { term: "W1", score: 62, class: 65 },
  { term: "W2", score: 66, class: 66 },
  { term: "W3", score: 71, class: 67 },
  { term: "W4", score: 69, class: 68 },
  { term: "W5", score: 78, class: 70 },
  { term: "W6", score: 83, class: 71 },
  { term: "W7", score: 87, class: 73 },
];

export const ASSIGNMENTS = [
  {
    id: "a1",
    title: "Transformer attention lab report",
    course: "AI-401",
    due: "in 2 days",
    xp: 220,
    status: "pending" as const,
  },
  {
    id: "a2",
    title: "Edge API deployment demo",
    course: "WEB-210",
    due: "in 5 days",
    xp: 180,
    status: "pending" as const,
  },
  {
    id: "a3",
    title: "Packet forensics writeup",
    course: "SEC-330",
    due: "overdue 1 day",
    xp: 260,
    status: "late" as const,
  },
  {
    id: "a4",
    title: "Graph traversal problem set",
    course: "DAT-150",
    due: "submitted",
    xp: 140,
    status: "done" as const,
  },
];

export const BADGES = [
  { name: "Streak Keeper", detail: "27-day login streak", earned: true },
  { name: "Night Compiler", detail: "10 late-night submissions", earned: true },
  { name: "Perfect Attendance", detail: "30 days unbroken", earned: false },
  { name: "Top 3 Operative", detail: "Cohort leaderboard", earned: true },
  { name: "Bug Hunter", detail: "Report 5 lab defects", earned: false },
  { name: "AI Whisperer", detail: "Clear all AI-120 quests", earned: true },
];

export const LEADERBOARD = [
  { rank: 1, name: "Aarthi V.", xp: 9840, level: 16 },
  { rank: 2, name: "Vikram N.", xp: 9120, level: 15 },
  { rank: 3, name: "Soundar R.", xp: 8420, level: 14 },
  { rank: 4, name: "Zoya K.", xp: 8010, level: 13 },
  { rank: 5, name: "Rahul P.", xp: 7640, level: 13 },
];

export const AI_RECOMMENDATIONS = [
  {
    title: "Cyber Defense is your weakest node",
    detail:
      "Score dropped 14% after the forensics module and attendance is at 72%. Two 45-min recovery drills this week restores projected grade to B+.",
    tone: "critical" as const,
  },
  {
    title: "Momentum detected in Web Engineering",
    detail:
      "7-week upward trend, 92% average. Unlock the Architect track to convert momentum into 400 bonus XP.",
    tone: "positive" as const,
  },
  {
    title: "Attendance pattern risk",
    detail:
      "Friday 14:00 sessions are missed 3x more than any other slot. Schedule a calendar lock to protect that block.",
    tone: "warning" as const,
  },
];

export const CLASS_ROSTER = [
  { name: "Aarthi V.", attendance: 98, avg: 94, risk: "low" as const, submitted: 12 },
  { name: "Vikram N.", attendance: 93, avg: 89, risk: "low" as const, submitted: 12 },
  { name: "Soundar R.", attendance: 91, avg: 87, risk: "low" as const, submitted: 11 },
  { name: "Zoya K.", attendance: 76, avg: 71, risk: "medium" as const, submitted: 9 },
  { name: "Rahul P.", attendance: 64, avg: 58, risk: "high" as const, submitted: 6 },
  { name: "Imran S.", attendance: 55, avg: 49, risk: "high" as const, submitted: 4 },
];

export const ADMIN_STATS = [
  { label: "Active Students", value: "4,182", delta: "+6.2%" },
  { label: "Faculty Nodes", value: "214", delta: "+1.4%" },
  { label: "Live Courses", value: "126", delta: "+9 new" },
  { label: "At-Risk Flags", value: "37", delta: "-12%" },
];

export const DEPARTMENT_PERF = [
  { dept: "CSE", avg: 84, risk: 9 },
  { dept: "ECE", avg: 79, risk: 12 },
  { dept: "MECH", avg: 74, risk: 16 },
  { dept: "AI&DS", avg: 88, risk: 6 },
  { dept: "CIVIL", avg: 71, risk: 18 },
];
