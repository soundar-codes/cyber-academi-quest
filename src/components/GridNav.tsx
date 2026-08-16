import { Link } from "@tanstack/react-router";
import { Hexagon } from "lucide-react";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Courses" },
  { to: "/dashboard", label: "Student" },
  { to: "/teacher", label: "Faculty" },
  { to: "/admin", label: "Command" },
  { to: "/contact", label: "Contact" },
];

export function GridNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3">
        <Link to="/" className="flex items-center gap-2">
          <Hexagon className="size-6 text-primary" />
          <span className="font-display text-sm font-bold tracking-[0.28em] text-foreground">
            NEXUS<span className="text-primary">EDU</span>
          </span>
        </Link>
        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="label-mono rounded-sm px-3 py-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-primary [&.active]:text-primary"
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          to="/dashboard"
          className="label-mono glow-cyan rounded-sm border border-primary/60 bg-primary/10 px-4 py-2 text-primary transition-colors hover:bg-primary/20"
        >
          Jack In
        </Link>
      </nav>
    </header>
  );
}

export function GridFooter() {
  return (
    <footer className="border-t border-border px-5 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 md:flex-row">
        <p className="label-mono text-muted-foreground">NEXUS EDU // Academic Intelligence Grid</p>
        <p className="label-mono text-muted-foreground">Uplink status: stable</p>
      </div>
    </footer>
  );
}
