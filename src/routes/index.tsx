import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, Brain, Cpu, GraduationCap, ShieldCheck, Trophy, Zap } from "lucide-react";
import { CyberGrid } from "@/components/CyberGrid";
import { GridFooter, GridNav } from "@/components/GridNav";
import { AI_RECOMMENDATIONS, COURSES } from "@/lib/academy-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NEXUS EDU — AI Education Management Grid" },
      {
        name: "description",
        content:
          "Cyber-themed education management portal with AI academic intelligence, gamified student progress, faculty control and admin analytics.",
      },
      { property: "og:title", content: "NEXUS EDU — AI Education Management Grid" },
      {
        property: "og:description",
        content:
          "Courses, attendance, assignments, exams and AI-driven academic insight in one gamified command grid.",
      },
    ],
  }),
  component: Index,
});

const PILLARS = [
  {
    icon: GraduationCap,
    title: "Academic Core",
    body: "Students, teachers, courses, classes, assignments, attendance, exams and records on one synchronized grid.",
  },
  {
    icon: Brain,
    title: "AI Intelligence",
    body: "Weak-subject detection, risk scoring, trend analysis and personalized recovery plans generated per learner.",
  },
  {
    icon: Trophy,
    title: "Gamified Progress",
    body: "XP, levels, streaks, badges and cohort leaderboards turn attendance and submissions into a progression loop.",
  },
  {
    icon: ShieldCheck,
    title: "Command & Reports",
    body: "Admins monitor departments, compare cohorts and export progress, risk and recommendation reports.",
  },
];

const TICKER = [
  "AI ENGINE ONLINE",
  "4,182 LEARNER NODES SYNCED",
  "37 RISK FLAGS RAISED",
  "126 LIVE COURSES",
  "ATTENDANCE STREAM NOMINAL",
  "RECOMMENDATION QUEUE CLEAR",
];

function Index() {
  return (
    <div className="min-h-screen">
      <GridNav />

      <section className="relative overflow-hidden">
        <CyberGrid className="pointer-events-none absolute inset-0 h-full w-full opacity-70" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-8 px-5 py-24 md:py-32">
          <span className="label-mono glow-cyan animate-pulse-ring rounded-sm border border-primary/50 px-3 py-1.5 text-primary">
            Web Development × Integrated AI
          </span>
          <h1 className="max-w-4xl text-4xl leading-[1.05] font-black tracking-tight md:text-7xl">
            The <span className="plasma-text">Education Management</span> grid that thinks with your
            campus.
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">
            NEXUS EDU fuses records, attendance, assignments and examinations into a single live
            system — then runs an AI engine across it to surface weak subjects, academic risk and
            personalized recovery paths for every student.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/dashboard"
              className="label-mono glow-cyan rounded-sm bg-primary px-6 py-3 text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Enter Student Grid
            </Link>
            <Link
              to="/courses"
              className="label-mono rounded-sm border border-border px-6 py-3 text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Browse Courses
            </Link>
          </div>

          <dl className="mt-6 grid w-full grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { k: "Learner nodes", v: "4,182" },
              { k: "Faculty nodes", v: "214" },
              { k: "AI insights / day", v: "12.6k" },
              { k: "Risk accuracy", v: "94.2%" },
            ].map((s) => (
              <div key={s.k} className="hud-panel scanline px-4 py-4">
                <dt className="label-mono text-muted-foreground">{s.k}</dt>
                <dd className="font-display mt-1 text-2xl font-bold text-primary">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="overflow-hidden border-y border-border bg-secondary/30 py-2">
        <div className="animate-ticker flex w-max gap-10">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="label-mono flex items-center gap-2 text-muted-foreground">
              <Zap className="size-3 text-primary" /> {t}
            </span>
          ))}
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <h2 className="text-3xl font-bold md:text-4xl">System Modules</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Four subsystems, one shared academic data spine.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p) => (
            <article key={p.title} className="hud-panel hud-corner group p-6 transition-colors">
              <p.icon className="size-7 text-primary transition-transform group-hover:scale-110" />
              <h3 className="mt-4 text-lg font-bold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold md:text-4xl">
                AI Engine <span className="neon-text">Live Feed</span>
              </h2>
              <p className="mt-2 text-muted-foreground">
                Sample intelligence generated from attendance, submissions and exam telemetry.
              </p>
            </div>
            <Cpu className="hidden size-10 text-primary/60 md:block" />
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {AI_RECOMMENDATIONS.map((r) => (
              <article key={r.title} className="hud-panel p-6">
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
                <h3 className="mt-3 text-base font-bold">{r.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{r.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-3xl font-bold md:text-4xl">Featured Course Nodes</h2>
          <Link to="/courses" className="label-mono text-primary hover:underline">
            View all →
          </Link>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {COURSES.slice(0, 3).map((c) => (
            <Link
              key={c.id}
              to="/courses"
              className="hud-panel group block p-6 transition-transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="label-mono text-primary">{c.code}</span>
                <span className="label-mono text-muted-foreground">{c.level}</span>
              </div>
              <h3 className="mt-3 text-lg font-bold group-hover:text-primary">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.summary}</p>
              <div className="mt-5 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Activity className="size-4 text-primary" /> {c.enrolled}/{c.seats}
                </span>
                <span className="flex items-center gap-1">
                  <Trophy className="size-4 text-plasma" /> {c.xp} XP
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <GridFooter />
    </div>
  );
}
