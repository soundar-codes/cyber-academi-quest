import { createFileRoute } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AlertTriangle, Download, Radar, Users } from "lucide-react";
import { GridFooter, GridNav } from "@/components/GridNav";
import { ADMIN_STATS, DEPARTMENT_PERF, SUBJECT_PERFORMANCE } from "@/lib/academy-data";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Command Center — NEXUS EDU" },
      {
        name: "description",
        content:
          "Administrator command center: department analytics, comparative reports, risk monitoring and AI institutional insights.",
      },
      { property: "og:title", content: "Command Center — NEXUS EDU" },
      {
        property: "og:description",
        content: "Institution-wide analytics, risk flags, comparative reports and AI insights.",
      },
    ],
  }),
  component: AdminCenter,
});

const RISK_SPLIT = [
  { name: "Stable", value: 268 },
  { name: "Watch", value: 74 },
  { name: "Critical", value: 37 },
];
const RISK_COLORS = ["var(--color-chart-3)", "var(--color-chart-4)", "var(--color-destructive)"];

function AdminCenter() {
  return (
    <div className="min-h-screen">
      <GridNav />
      <main className="mx-auto max-w-7xl space-y-6 px-5 py-12">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="label-mono text-primary">Clearance Level 5</span>
            <h1 className="mt-2 text-4xl font-black md:text-5xl">Command Center</h1>
          </div>
          <button className="label-mono flex items-center gap-2 rounded-sm border border-primary/60 bg-primary/10 px-4 py-2.5 text-primary hover:bg-primary/20">
            <Download className="size-4" /> Export Report
          </button>
        </header>

        <div className="grid gap-4 md:grid-cols-4">
          {ADMIN_STATS.map((s) => (
            <div key={s.label} className="hud-panel scanline p-6">
              <p className="label-mono text-muted-foreground">{s.label}</p>
              <p className="font-display mt-2 text-3xl font-bold text-primary">{s.value}</p>
              <p className="label-mono mt-1 text-success">{s.delta}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <section className="hud-panel p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Users className="size-5 text-primary" /> Department Comparison
            </h2>
            <div className="mt-6 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={DEPARTMENT_PERF}>
                  <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />
                  <XAxis dataKey="dept" stroke="var(--color-muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-popover)",
                      border: "1px solid var(--color-border)",
                      fontSize: 12,
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="avg" name="Avg score" fill="var(--color-chart-1)" />
                  <Bar dataKey="risk" name="Risk %" fill="var(--color-chart-2)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="hud-panel p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <AlertTriangle className="size-5 text-warning" /> Risk Distribution
            </h2>
            <div className="mt-6 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={RISK_SPLIT}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={95}
                    paddingAngle={3}
                  >
                    {RISK_SPLIT.map((entry, i) => (
                      <Cell key={entry.name} fill={RISK_COLORS[i]} />
                    ))}
                  </Pie>
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-popover)",
                      border: "1px solid var(--color-border)",
                      fontSize: 12,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="hud-panel p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Radar className="size-5 text-primary" /> Weak Subject Map
            </h2>
            <ul className="mt-4 space-y-3">
              {SUBJECT_PERFORMANCE.map((s) => (
                <li key={s.subject}>
                  <div className="flex justify-between text-sm">
                    <span>{s.subject}</span>
                    <span className="label-mono text-muted-foreground">{s.score}%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full bg-secondary">
                    <div
                      className={`h-full ${
                        s.risk === "high"
                          ? "bg-destructive"
                          : s.risk === "medium"
                            ? "bg-warning"
                            : "bg-success"
                      }`}
                      style={{ width: `${s.score}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="hud-panel p-6">
            <h2 className="text-lg font-bold">AI Institutional Insights</h2>
            <div className="mt-4 space-y-3 text-sm">
              {[
                "CIVIL cohort attendance dropped 8% after week 4 — schedule audit recommended.",
                "AI&DS leads all departments; replicate its weekly micro-assessment cadence.",
                "37 critical-risk learners cluster around 2 faculty nodes with low feedback latency scores.",
                "Projected semester pass rate: 91.4% (+2.1% vs last term) if interventions execute.",
              ].map((t) => (
                <p key={t} className="border-l-2 border-primary pl-4 text-muted-foreground">
                  {t}
                </p>
              ))}
            </div>
          </section>
        </div>
      </main>
      <GridFooter />
    </div>
  );
}
