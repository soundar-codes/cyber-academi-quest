import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CalendarClock, Search, Star, Trophy, UserRound, X } from "lucide-react";
import { GridFooter, GridNav } from "@/components/GridNav";
import { CATEGORIES, COURSES, type Course } from "@/lib/academy-data";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Course Grid — NEXUS EDU" },
      {
        name: "description",
        content:
          "Search, filter and enroll in NEXUS EDU course nodes with schedules, syllabus, seats and XP rewards.",
      },
      { property: "og:title", content: "Course Grid — NEXUS EDU" },
      {
        property: "og:description",
        content: "Search and filter courses, inspect syllabus and schedules, and enroll instantly.",
      },
    ],
  }),
  component: CoursesPage,
});

function CoursesPage() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const [active, setActive] = useState<Course | null>(null);
  const [enrolled, setEnrolled] = useState<string[]>([]);

  const list = useMemo(
    () =>
      COURSES.filter(
        (c) =>
          (cat === "All" || c.category === cat) &&
          (c.title + c.code + c.teacher).toLowerCase().includes(query.toLowerCase()),
      ),
    [query, cat],
  );

  return (
    <div className="min-h-screen">
      <GridNav />
      <main className="mx-auto max-w-7xl px-5 py-14">
        <span className="label-mono text-primary">Node Directory</span>
        <h1 className="mt-2 text-4xl font-black md:text-5xl">Course Grid</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Filter by discipline, inspect the syllabus and schedule, then enroll to sync the node into
          your student dashboard.
        </p>

        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center">
          <div className="hud-panel flex flex-1 items-center gap-3 px-4 py-3">
            <Search className="size-4 text-primary" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search courses, codes or faculty…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`label-mono rounded-sm border px-3 py-2 transition-colors ${
                  cat === c
                    ? "border-primary bg-primary/15 text-primary"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {list.map((c) => {
            const full = c.enrolled >= c.seats;
            const isIn = enrolled.includes(c.id);
            return (
              <article key={c.id} className="hud-panel flex flex-col p-6">
                <div className="flex items-center justify-between">
                  <span className="label-mono text-primary">{c.code}</span>
                  <span className="label-mono flex items-center gap-1 text-warning">
                    <Star className="size-3" /> {c.rating}
                  </span>
                </div>
                <h2 className="mt-3 text-lg font-bold">{c.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{c.summary}</p>
                <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <UserRound className="size-4 text-primary" /> {c.teacher}
                  </li>
                  <li className="flex items-center gap-2">
                    <CalendarClock className="size-4 text-primary" /> {c.schedule}
                  </li>
                  <li className="flex items-center gap-2">
                    <Trophy className="size-4 text-plasma" /> {c.xp} XP · {c.level}
                  </li>
                </ul>
                <div className="mt-4">
                  <div className="label-mono flex justify-between text-muted-foreground">
                    <span>Seats</span>
                    <span>
                      {c.enrolled}/{c.seats}
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full bg-secondary">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${(c.enrolled / c.seats) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="mt-5 flex gap-2">
                  <button
                    onClick={() => setActive(c)}
                    className="label-mono flex-1 rounded-sm border border-border py-2.5 transition-colors hover:border-primary hover:text-primary"
                  >
                    Details
                  </button>
                  <button
                    disabled={full && !isIn}
                    onClick={() => setEnrolled((p) => (isIn ? p.filter((x) => x !== c.id) : [...p, c.id]))}
                    className={`label-mono flex-1 rounded-sm py-2.5 transition-colors ${
                      isIn
                        ? "bg-success text-success-foreground"
                        : full
                          ? "cursor-not-allowed bg-secondary text-muted-foreground"
                          : "glow-cyan bg-primary text-primary-foreground"
                    }`}
                  >
                    {isIn ? "Enrolled" : full ? "Full" : "Enroll"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
        {list.length === 0 && (
          <p className="label-mono mt-12 text-center text-muted-foreground">No nodes matched.</p>
        )}
      </main>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-5 backdrop-blur"
          onClick={() => setActive(null)}
        >
          <div
            className="hud-panel glow-plasma max-h-[85vh] w-full max-w-2xl overflow-auto p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="label-mono text-primary">{active.code}</span>
                <h2 className="mt-2 text-2xl font-bold">{active.title}</h2>
              </div>
              <button onClick={() => setActive(null)} aria-label="Close">
                <X className="size-5 text-muted-foreground hover:text-primary" />
              </button>
            </div>
            <p className="mt-4 text-muted-foreground">{active.summary}</p>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              <Info label="Faculty" value={active.teacher} />
              <Info label="Schedule" value={active.schedule} />
              <Info label="Level" value={active.level} />
              <Info label="Reward" value={`${active.xp} XP`} />
            </div>
            <h3 className="mt-8 text-sm font-bold">Syllabus</h3>
            <ol className="mt-3 space-y-2">
              {active.syllabus.map((s, i) => (
                <li key={s} className="flex items-center gap-3 border border-border px-4 py-2.5 text-sm">
                  <span className="label-mono text-primary">{String(i + 1).padStart(2, "0")}</span>
                  {s}
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
      <GridFooter />
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border px-4 py-3">
      <p className="label-mono text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm">{value}</p>
    </div>
  );
}
