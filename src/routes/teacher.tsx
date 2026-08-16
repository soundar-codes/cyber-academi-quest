import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Brain, CheckCircle2, ClipboardList, XCircle } from "lucide-react";
import { GridFooter, GridNav } from "@/components/GridNav";
import { CLASS_ROSTER, COURSES } from "@/lib/academy-data";

export const Route = createFileRoute("/teacher")({
  head: () => ({
    meta: [
      { title: "Faculty Console — NEXUS EDU" },
      {
        name: "description",
        content:
          "Faculty console to mark attendance, evaluate assignments, enter exam marks and read AI insights on at-risk students.",
      },
      { property: "og:title", content: "Faculty Console — NEXUS EDU" },
      {
        property: "og:description",
        content: "Attendance, evaluation, exam marks and AI risk insights for every class.",
      },
    ],
  }),
  component: TeacherConsole,
});

function TeacherConsole() {
  const [present, setPresent] = useState<string[]>(CLASS_ROSTER.slice(0, 4).map((s) => s.name));
  const [marks, setMarks] = useState<Record<string, string>>({});

  const toggle = (n: string) =>
    setPresent((p) => (p.includes(n) ? p.filter((x) => x !== n) : [...p, n]));

  return (
    <div className="min-h-screen">
      <GridNav />
      <main className="mx-auto max-w-7xl space-y-6 px-5 py-12">
        <header>
          <span className="label-mono text-primary">Faculty Node · Dr. Meera Raghavan</span>
          <h1 className="mt-2 text-4xl font-black md:text-5xl">Class Control Console</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Live session: AI-401 Neural Systems · Lab Block C · 54 enrolled operatives.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <section className="hud-panel p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <ClipboardList className="size-5 text-primary" /> Attendance Sweep
            </h2>
            <p className="label-mono mt-1 text-muted-foreground">
              {present.length}/{CLASS_ROSTER.length} present
            </p>
            <ul className="mt-4 space-y-2">
              {CLASS_ROSTER.map((s) => {
                const on = present.includes(s.name);
                return (
                  <li
                    key={s.name}
                    className="flex items-center justify-between border border-border px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-semibold">{s.name}</p>
                      <p className="label-mono text-muted-foreground">
                        att {s.attendance}% · avg {s.avg}
                      </p>
                    </div>
                    <button
                      onClick={() => toggle(s.name)}
                      className={`label-mono flex items-center gap-2 rounded-sm px-3 py-2 transition-colors ${
                        on
                          ? "bg-success/15 text-success"
                          : "bg-destructive/15 text-destructive"
                      }`}
                    >
                      {on ? <CheckCircle2 className="size-4" /> : <XCircle className="size-4" />}
                      {on ? "Present" : "Absent"}
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="hud-panel p-6">
            <h2 className="text-lg font-bold">Evaluation Terminal</h2>
            <p className="label-mono mt-1 text-muted-foreground">Enter exam marks (out of 100)</p>
            <ul className="mt-4 space-y-2">
              {CLASS_ROSTER.map((s) => (
                <li key={s.name} className="flex items-center gap-3 border border-border px-4 py-2.5">
                  <span className="flex-1 text-sm">{s.name}</span>
                  <input
                    inputMode="numeric"
                    value={marks[s.name] ?? ""}
                    onChange={(e) => setMarks((m) => ({ ...m, [s.name]: e.target.value }))}
                    placeholder="--"
                    className="w-16 border border-input bg-background/60 px-2 py-1.5 text-center text-sm outline-none focus:border-primary"
                  />
                </li>
              ))}
            </ul>
            <button className="label-mono glow-cyan mt-4 w-full rounded-sm bg-primary py-3 text-primary-foreground">
              Commit Marks
            </button>
          </section>
        </div>

        <section className="hud-panel p-6">
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <Brain className="size-5 text-primary" /> AI Risk Radar
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="label-mono text-left text-muted-foreground">
                  <th className="py-2">Student</th>
                  <th>Attendance</th>
                  <th>Average</th>
                  <th>Submitted</th>
                  <th>Risk</th>
                </tr>
              </thead>
              <tbody>
                {CLASS_ROSTER.map((s) => (
                  <tr key={s.name} className="border-t border-border">
                    <td className="py-3">{s.name}</td>
                    <td>{s.attendance}%</td>
                    <td>{s.avg}</td>
                    <td>{s.submitted}/12</td>
                    <td>
                      <span
                        className={`label-mono rounded-sm px-2.5 py-1 ${
                          s.risk === "high"
                            ? "bg-destructive/15 text-destructive"
                            : s.risk === "medium"
                              ? "bg-warning/15 text-warning"
                              : "bg-success/15 text-success"
                        }`}
                      >
                        {s.risk}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 border-l-2 border-primary pl-4 text-sm text-muted-foreground">
            AI insight: Imran S. and Rahul P. show combined attendance and submission decay —
            intervention within 7 days projected to recover 18 grade points.
          </p>
        </section>

        <section className="hud-panel p-6">
          <h2 className="text-lg font-bold">My Course Nodes</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {COURSES.filter((c) => c.teacher === "Dr. Meera Raghavan").map((c) => (
              <article key={c.id} className="border border-border p-5">
                <span className="label-mono text-primary">{c.code}</span>
                <h3 className="mt-2 text-base font-bold">{c.title}</h3>
                <p className="label-mono mt-2 text-muted-foreground">
                  {c.enrolled}/{c.seats} enrolled · {c.schedule}
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <GridFooter />
    </div>
  );
}
