import { createFileRoute } from "@tanstack/react-router";
import { BeamtroMark } from "@/components/site-chrome";
import { RoomExperience } from "@/components/room-experience";

export const Route = createFileRoute("/room/$code")({
  head: ({ params }) => ({ meta: [
    { title: `Room ${params.code.toUpperCase()} — Beamtro` }, { name: "description", content: "Join a temporary Beamtro room for chat, voice, video, and screen sharing." },
    { property: "og:title", content: `Join Beamtro room ${params.code.toUpperCase()}` }, { property: "og:description", content: "Open the line in Beamtro — no account required." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: RoomRoute,
});
function RoomRoute() { const { code } = Route.useParams(); return <div className="min-h-screen bg-room"><div className="border-b border-room-line bg-room px-4 py-3 text-room-foreground"><BeamtroMark inverse /></div><RoomExperience code={code.toUpperCase()} /></div>; }