import { createFileRoute } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  CartesianGrid,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Award, Brain, Clock, Flame, Trophy } from "lucide-react";
import { GridFooter, GridNav } from "@/components/GridNav";
import {
  AI_RECOMMENDATIONS,
  ASSIGNMENTS,
  BADGES,
  LEADERBOARD,
  PROGRESS_TREND,
  STUDENT,
  SUBJECT_PERFORMANCE,
} from "@/lib/academy-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Student Grid — NEXUS EDU" },
      {
        name: "description",
        content:
          "Gamified student dashboard: XP levels, streaks, attendance, assignments, grades and personalized AI recommendations.",
      },
      { property: "og:title", content: "Student Grid — NEXUS EDU" },
      {
        property: "og:description",
        content: "Track XP, attendance, assignments, grades and AI recovery plans in one console.",
      },
    ],
  }),
  component: StudentDashboard,
});

function StudentDashboard() {
  const pct = Math.round((STUDENT.xp / STUDENT.nextLevelXp) * 100);

  return (
    <div className="min-h-screen">
      <GridNav />
      <main className="mx-auto max-w-7xl space-y-6 px-5 py-12">
        <section className="hud-panel scanline flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="label-mono text-primary">{STUDENT.handle}</span>
            <h1 className="mt-2 text-3xl font-black md:text-4xl">{STUDENT.name}</h1>
            <p className="mt-1 text-muted-foreground">{STUDENT.rank}</p>
            <div className="mt-5 w-full max-w-md">
              <div className="label-mono flex justify-between text-muted-foreground">
                <span>Level {STUDENT.level}</span>
                <span>
                  {STUDENT.xp} / {STUDENT.nextLevelXp} XP
                </span>
              </div>
              <div className="mt-2 h-2 w-full bg-secondary">
                <div className="glow-cyan h-full bg-primary" style={{ width: `${pct}%` }} />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <Stat icon={Flame} label="Streak" value={`${STUDENT.streak}d`} />
            <Stat icon={Clock} label="Attendance" value={`${STUDENT.attendance}%`} />
            <Stat icon={Award} label="CGPA" value={STUDENT.cgpa.toFixed(2)} />
            <Stat icon={Trophy} label="Rank" value={`#${STUDENT.rankPosition}`} />
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <section className="hud-panel p-6">
            <h2 className="text-lg font-bold">Performance Trajectory</h2>
            <p className="label-mono mt-1 text-muted-foreground">You vs cohort average</p>
            <div className="mt-6 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={PROGRESS_TREND}>
                  <defs>
                    <linearGradient id="me" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.6} />
                      <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />
                  <XAxis dataKey="term" stroke="var(--color-muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-popover)",
                      border: "1px solid var(--color-border)",
                      fontSize: 12,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="var(--color-chart-1)"
                    fill="url(#me)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="class"
                    stroke="var(--color-chart-2)"
                    fill="transparent"
                    strokeDasharray="4 4"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="hud-panel p-6">
            <h2 className="text-lg font-bold">Subject Matrix</h2>
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={SUBJECT_PERFORMANCE}>
                  <PolarGrid stroke="var(--color-border)" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }}
                  />
                  <Radar
                    dataKey="score"
                    stroke="var(--color-chart-2)"
                    fill="var(--color-chart-2)"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <section className="hud-panel p-6 lg:col-span-2">
            <h2 className="text-lg font-bold">Active Quests · Assignments</h2>
            <ul className="mt-4 space-y-3">
              {ASSIGNMENTS.map((a) => (
                <li
                  key={a.id}
                  className="flex flex-wrap items-center justify-between gap-3 border border-border px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold">{a.title}</p>
                    <p className="label-mono mt-1 text-muted-foreground">
                      {a.course} · {a.due}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="label-mono text-plasma">+{a.xp} XP</span>
                    <span
                      className={`label-mono rounded-sm px-2.5 py-1 ${
                        a.status === "done"
                          ? "bg-success/15 text-success"
                          : a.status === "late"
                            ? "bg-destructive/15 text-destructive"
                            : "bg-primary/15 text-primary"
                      }`}
                    >
                      {a.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="hud-panel p-6">
            <h2 className="text-lg font-bold">Cohort Leaderboard</h2>
            <ol className="mt-4 space-y-2">
              {LEADERBOARD.map((l) => (
                <li
                  key={l.rank}
                  className={`flex items-center justify-between border px-4 py-2.5 text-sm ${
                    l.name === STUDENT.name
                      ? "glow-cyan border-primary/60 text-primary"
                      : "border-border"
                  }`}
                >
                  <span className="label-mono">#{l.rank}</span>
                  <span className="flex-1 px-3">{l.name}</span>
                  <span className="label-mono">{l.xp}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <section className="hud-panel p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Brain className="size-5 text-primary" /> AI Recommendations
            </h2>
            <div className="mt-4 space-y-3">
              {AI_RECOMMENDATIONS.map((r) => (
                <article key={r.title} className="border border-border p-4">
                  <span
                    className={`label-mono ${
                      r.tone === "critical"
                        ? "text-destructive"
                        : r.tone === "warning"
                          ? "text-warning"
                          : "text-success"
                    }`}
                  >
                    {r.tone}
                  </span>
                  <h3 className="mt-2 text-sm font-bold">{r.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{r.detail}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="hud-panel p-6">
            <h2 className="text-lg font-bold">Badge Vault</h2>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {BADGES.map((b) => (
                <div
                  key={b.name}
                  className={`border p-4 ${
                    b.earned ? "border-primary/50 bg-primary/5" : "border-border opacity-45"
                  }`}
                >
                  <Trophy className={`size-5 ${b.earned ? "text-plasma" : "text-muted-foreground"}`} />
                  <p className="mt-2 text-sm font-semibold">{b.name}</p>
                  <p className="label-mono mt-1 text-muted-foreground">{b.detail}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <GridFooter />
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Flame;
  label: string;
  value: string;
}) {
  return (
    <div className="border border-border px-4 py-3">
      <Icon className="size-4 text-primary" />
      <p className="font-display mt-2 text-xl font-bold">{value}</p>
      <p className="label-mono text-muted-foreground">{label}</p>
    </div>
  );
}
