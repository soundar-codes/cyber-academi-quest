import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, CalendarClock, Layers, Star, Trophy, UserRound } from "lucide-react";
import { GridFooter, GridNav } from "@/components/GridNav";
import { DataTunnel, ModuleOrbit } from "@/components/three/Visuals";
import { COURSES } from "@/lib/academy-data";

export const Route = createFileRoute("/courses/$id")({
  loader: ({ params }) => {
    const course = COURSES.find((c) => c.id === params.id);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Course not found — NEXUS EDU" }, { name: "robots", content: "noindex" }],
      };
    }
    const { course } = loaderData;
    const title = `${course.code} · ${course.title} — NEXUS EDU`;
    return {
      meta: [
        { title },
        { name: "description", content: course.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: course.summary },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: CourseMissing,
  component: CourseDetail,
});

function CourseMissing() {
  return (
    <div className="min-h-screen">
      <GridNav />
      <main className="mx-auto max-w-3xl px-5 py-24 text-center">
        <h1 className="text-3xl font-black">Node not found</h1>
        <p className="mt-3 text-muted-foreground">This course node is offline or was decommissioned.</p>
        <Link to="/courses" className="label-mono mt-8 inline-block border border-primary px-5 py-3 text-primary">
          Back to grid
        </Link>
      </main>
      <GridFooter />
    </div>
  );
}

function CourseDetail() {
  const { course } = Route.useLoaderData();
  const [enrolled, setEnrolled] = useState(false);
  const full = course.enrolled >= course.seats;

  return (
    <div className="min-h-screen">
      <GridNav />

      <section className="relative overflow-hidden border-b border-border">
        <DataTunnel className="pointer-events-none absolute inset-0 opacity-40" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-5 py-16 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <Link to="/courses" className="label-mono inline-flex items-center gap-2 text-muted-foreground hover:text-primary">
              <ArrowLeft className="size-3.5" /> Course grid
            </Link>
            <span className="label-mono mt-6 block text-primary">{course.code} · {course.category}</span>
            <h1 className="mt-2 text-4xl font-black md:text-5xl">{course.title}</h1>
            <p className="mt-4 max-w-2xl text-muted-foreground">{course.summary}</p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              <Fact icon={<UserRound className="size-4 text-primary" />} label="Faculty" value={course.teacher} />
              <Fact icon={<CalendarClock className="size-4 text-primary" />} label="Schedule" value={course.schedule} />
              <Fact icon={<Layers className="size-4 text-primary" />} label="Track" value={course.level} />
              <Fact icon={<Trophy className="size-4 text-plasma" />} label="Reward" value={`${course.xp} XP`} />
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                disabled={full && !enrolled}
                onClick={() => setEnrolled((v) => !v)}
                className={`label-mono rounded-sm px-6 py-3 transition-colors ${
                  enrolled
                    ? "bg-success text-success-foreground"
                    : full
                      ? "cursor-not-allowed bg-secondary text-muted-foreground"
                      : "glow-cyan bg-primary text-primary-foreground"
                }`}
              >
                {enrolled ? "Enrolled · node synced" : full ? "Cohort full" : "Enroll in node"}
              </button>
              <span className="label-mono flex items-center gap-1 text-warning">
                <Star className="size-3.5" /> {course.rating} rating
              </span>
              <span className="label-mono text-muted-foreground">
                {course.enrolled}/{course.seats} seats
              </span>
            </div>
          </div>

          <div className="hud-panel relative min-h-[320px] overflow-hidden">
            <ModuleOrbit modules={course.syllabus} className="absolute inset-0" />
            <span className="label-mono absolute left-4 top-4 text-primary">Knowledge graph</span>
            <span className="label-mono absolute bottom-4 right-4 text-muted-foreground">
              {course.syllabus.length} modules
            </span>
          </div>
        </div>
      </section>

      <main className="mx-auto grid max-w-7xl gap-6 px-5 py-14 lg:grid-cols-[1.4fr_1fr]">
        <div className="hud-panel p-8">
          <span className="label-mono text-primary">Module chain</span>
          <h2 className="mt-2 text-2xl font-bold">Syllabus</h2>
          <ol className="mt-6 space-y-3">
            {course.syllabus.map((s, i) => (
              <li key={s} className="flex items-center gap-4 border border-border px-4 py-3">
                <span className="label-mono text-primary">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-sm">{s}</span>
                <span className="label-mono ml-auto text-muted-foreground">
                  +{Math.round(course.xp / course.syllabus.length)} XP
                </span>
              </li>
            ))}
          </ol>
        </div>

        <aside className="space-y-6">
          <div className="hud-panel p-6">
            <span className="label-mono text-plasma">AI fit analysis</span>
            <p className="mt-3 text-sm text-muted-foreground">
              Based on your attendance and assessment telemetry, this node is a{" "}
              <span className="text-primary">strong match</span>. Expect ~6 study hours per week to
              hold an A band.
            </p>
            <div className="mt-4 space-y-3">
              <Meter label="Predicted grade" value={86} />
              <Meter label="Workload intensity" value={64} />
              <Meter label="Prerequisite readiness" value={91} />
            </div>
          </div>
          <div className="hud-panel p-6">
            <span className="label-mono text-primary">Related nodes</span>
            <ul className="mt-4 space-y-2">
              {COURSES.filter((c) => c.category === course.category && c.id !== course.id)
                .concat(COURSES.filter((c) => c.category !== course.category).slice(0, 2))
                .slice(0, 3)
                .map((c) => (
                  <li key={c.id}>
                    <Link
                      to="/courses/$id"
                      params={{ id: c.id }}
                      className="flex items-center justify-between border border-border px-4 py-3 text-sm transition-colors hover:border-primary hover:text-primary"
                    >
                      <span>{c.title}</span>
                      <span className="label-mono text-muted-foreground">{c.code}</span>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </aside>
      </main>
      <GridFooter />
    </div>
  );
}

function Fact({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <li className="flex items-center gap-3 border border-border px-4 py-3">
      {icon}
      <div>
        <p className="label-mono text-muted-foreground">{label}</p>
        <p className="text-sm">{value}</p>
      </div>
    </li>
  );
}

function Meter({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="label-mono flex justify-between text-muted-foreground">
        <span>{label}</span>
        <span className="text-primary">{value}%</span>
      </div>
      <div className="mt-1.5 h-1.5 w-full bg-secondary">
        <div className="h-full bg-primary" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
