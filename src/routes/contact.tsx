import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { GridFooter, GridNav } from "@/components/GridNav";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Uplink — NEXUS EDU" },
      {
        name: "description",
        content:
          "Reach the NEXUS EDU academic support grid: admissions, faculty desk, technical uplink and FAQ.",
      },
      { property: "og:title", content: "Contact Uplink — NEXUS EDU" },
      {
        property: "og:description",
        content: "Contact the NEXUS EDU support grid for admissions, faculty and technical help.",
      },
    ],
  }),
  component: ContactPage,
});

const FAQ = [
  {
    q: "How does the AI engine score academic risk?",
    a: "It blends attendance decay, assignment latency, exam deltas and subject-level variance into a weekly risk index per student.",
  },
  {
    q: "Can teachers override AI recommendations?",
    a: "Yes. Every recommendation is advisory; faculty can accept, dismiss or annotate it from the faculty console.",
  },
  {
    q: "Is progress gamification optional?",
    a: "XP, streaks and badges can be disabled per cohort from the admin command panel.",
  },
];

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen">
      <GridNav />
      <main className="mx-auto max-w-7xl px-5 py-14">
        <span className="label-mono text-primary">Support Channel</span>
        <h1 className="mt-2 text-4xl font-black md:text-5xl">Contact Uplink</h1>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="hud-panel scanline space-y-4 p-8"
          >
            <Field label="Identifier" placeholder="Full name" />
            <Field label="Comm address" placeholder="you@campus.edu" type="email" />
            <div>
              <label className="label-mono text-muted-foreground">Message</label>
              <textarea
                required
                rows={5}
                placeholder="Describe your request…"
                className="mt-2 w-full border border-input bg-background/60 px-4 py-3 text-sm outline-none focus:border-primary"
              />
            </div>
            <button
              type="submit"
              className="label-mono glow-cyan w-full rounded-sm bg-primary py-3 text-primary-foreground"
            >
              {sent ? "Transmission received" : "Transmit"}
            </button>
            {sent && (
              <p className="label-mono text-success">Response ETA: under 24 hours.</p>
            )}
          </form>

          <div className="space-y-4">
            <Detail icon={Mail} label="Email" value="support@nexusedu.grid" />
            <Detail icon={Phone} label="Voice" value="+91 44 4000 1180" />
            <Detail icon={MapPin} label="Campus" value="Block C, Innovation Wing, Chennai" />
            <div className="hud-panel p-6">
              <h2 className="text-lg font-bold">FAQ</h2>
              <div className="mt-4 space-y-4">
                {FAQ.map((f) => (
                  <div key={f.q}>
                    <p className="text-sm font-semibold text-primary">{f.q}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{f.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <GridFooter />
    </div>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="label-mono text-muted-foreground">{label}</label>
      <input
        required
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full border border-input bg-background/60 px-4 py-3 text-sm outline-none focus:border-primary"
      />
    </div>
  );
}

function Detail({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
}) {
  return (
    <div className="hud-panel flex items-center gap-4 p-5">
      <Icon className="size-5 text-primary" />
      <div>
        <p className="label-mono text-muted-foreground">{label}</p>
        <p className="text-sm">{value}</p>
      </div>
    </div>
  );
}
