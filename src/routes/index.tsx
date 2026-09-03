import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Link2, Radio, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Beamtro — One room for every conversation" },
    { name: "description", content: "Create a temporary room for chat, voice, video, and screen sharing. No account or download required." },
    { property: "og:title", content: "Beamtro — One room for every conversation" },
    { property: "og:description", content: "Quick browser rooms for chat, voice, video, and screen sharing." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}), component: HomePage,
});

const roomCodeFrom = (value: string) => {
  const trimmed = value.trim();
  const match = trimmed.match(/\/room\/([a-z0-9-]+)/i);
  return (match?.[1] ?? trimmed).replace(/[^a-z0-9]/gi, "").toUpperCase();
};

function HomePage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [error, setError] = useState("");
  const go = (code: string) => { if (!name.trim()) { setError("Add your display name first."); return; } sessionStorage.setItem("beamtro-name", name.trim()); void navigate({ to: "/room/$code", params: { code } }); };
  const create = () => go(Array.from({ length: 6 }, () => "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[Math.floor(Math.random() * 32)]).join(""));
  const join = () => { const code = roomCodeFrom(room); if (code.length < 4) { setError("Enter a valid room code or invite link."); return; } go(code); };
  return <div className="min-h-screen bg-background"><SiteHeader /><main>
    <section className="overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.1fr_.9fr] lg:py-24">
        <div className="max-w-2xl">
          <span className="eyebrow"><span className="size-1.5 rounded-full bg-info" />Open → Create → Connect → Talk</span>
          <h1 className="mt-5 text-balance font-display text-5xl font-bold leading-none sm:text-6xl">One room. Voice, video, screen, and everything said.</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">Beamtro opens a line between two to six people. Chat runs the whole time; audio, camera and screen ride on top of it, peer to peer.</p>
        </div>
        <div className="signal-visual" aria-label="Five people connected to one room">
          <div className="flex items-center justify-between"><strong className="font-display">Shared room</strong><span className="flex items-center gap-2 text-xs font-semibold text-success"><span className="pulse-dot size-1.5 rounded-full bg-success" />live</span></div>
          <div className="mt-9 flex items-center gap-3"><span className="signal-person bg-primary/20 text-primary">A</span><span className="flow-line h-px flex-1 text-primary" /><span className="signal-hub"><span className="pulse-dot size-2.5 rounded-full bg-success" /></span><span className="flow-line h-px flex-1 text-info" /><span className="signal-person bg-info/20 text-info">R</span></div>
          <div className="mt-7 flex justify-center gap-3"><span className="signal-person bg-success/20 text-success">M</span><span className="signal-person bg-warning/25">K</span><span className="signal-person bg-accent/25 text-accent">T</span></div>
          <p className="mt-6 text-center text-xs font-medium text-muted-foreground">5 people · one signal line</p>
        </div>
      </div>
    </section>
    <section className="mx-auto max-w-6xl px-5 pb-20">
      <div className="grid items-stretch gap-6 lg:grid-cols-[1fr_.72fr]">
        <div className="entry-panel">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3"><h2 className="font-display text-xl font-semibold">Room entry</h2><span className="status-pill"><span className="size-1.5 rounded-full bg-muted-foreground" />idle — no room connected</span></div>
          <label htmlFor="display-name" className="mt-7 block text-sm font-semibold">Display name</label><Input id="display-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Sam" className="mt-2 h-12" /><p className="mt-2 text-xs text-muted-foreground">Temporary, and only used inside the room.</p>
          <Button onClick={create} size="lg" className="mt-5 w-full">Create a room <ArrowRight /></Button>
          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />or<span className="h-px flex-1 bg-border" /></div>
          <label htmlFor="room-code" className="block text-sm font-semibold">Room code or link</label><div className="mt-2 grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]"><Input id="room-code" value={room} onChange={(e) => setRoom(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") join(); }} placeholder="ABC123 or a Beamtro link" className="h-12" /><Button variant="secondary" size="lg" onClick={join}>Join room</Button></div>
          {error && <p role="alert" className="mt-3 text-sm text-danger">{error}</p>}
        </div>
        <div className="room-preview"><div className="flex items-center justify-between"><span className="text-xs font-semibold uppercase">Room · ABC123</span><span className="flex items-center gap-2 text-xs text-success"><span className="pulse-dot size-1.5 rounded-full bg-success" />connected</span></div><div className="preview-stage"><Radio className="size-8" /><strong>Sam is sharing</strong><span>screen is the main stage</span></div><div className="grid grid-cols-2 gap-2"><div className="preview-person bg-primary/25">A</div><div className="preview-person bg-info/25">R</div></div><div className="mt-4 flex justify-center gap-2"><span className="preview-control"><Users /></span><span className="preview-control"><Link2 /></span></div></div>
      </div>
    </section>
  </main><SiteFooter /></div>;
}
