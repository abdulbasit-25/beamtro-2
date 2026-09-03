import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

const creatorUrl = "https://abdulbasit-archer.vercel.app/";

export function BeamtroMark({ compact = false, inverse = false }: { compact?: boolean; inverse?: boolean }) {
  return (
    <Link to="/" className="flex min-w-0 items-center gap-2.5" aria-label="Beamtro home">
      <span className="signal-mark grid size-8 shrink-0 place-items-center rounded-xl bg-primary">
        <span className="size-2 rounded-full bg-primary-foreground" />
      </span>
      {!compact && <span className={`font-display text-xl font-bold ${inverse ? "text-room-foreground" : "text-foreground"}`}>Beamtro</span>}
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="border-b border-border/70 bg-background/90 backdrop-blur-md">
      <div className="mx-auto grid h-16 max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 sm:flex sm:justify-between">
        <BeamtroMark />
        <nav className="hidden items-center gap-1 sm:flex" aria-label="Main navigation">
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/help" className="nav-link">Help</Link>
          <a className="nav-link" href={creatorUrl} target="_blank" rel="noreferrer">Archer</a>
        </nav>
        <div className="hidden items-center gap-2 rounded-full bg-success/12 px-3 py-1.5 text-xs font-semibold text-success md:flex">
          <span className="pulse-dot size-1.5 rounded-full bg-success" />
          Patch in · no account
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end">
          <div>
            <BeamtroMark />
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">One room. Voice, video, screen, and everything said.</p>
          </div>
          <nav className="flex flex-wrap gap-2" aria-label="Footer navigation">
            <Link to="/about" className="footer-link">About</Link>
            <Link to="/help" className="footer-link">Help</Link>
            <a href={creatorUrl} target="_blank" rel="noreferrer" className="footer-link">Archer <ArrowUpRight /></a>
          </nav>
        </div>
        <div className="mt-8 flex items-center justify-between border-t border-border pt-5 text-xs text-muted-foreground">
          <span>© Beamtro</span>
          <a href={creatorUrl} target="_blank" rel="noreferrer" className="font-semibold text-foreground hover:underline">Powered by Archer</a>
        </div>
      </div>
    </footer>
  );
}
