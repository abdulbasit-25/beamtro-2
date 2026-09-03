import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Copy, Link2, LoaderCircle, MessageSquare, Mic, MicOff, MonitorUp, MoreHorizontal,
  PhoneOff, Send, Users, Video, VideoOff, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

type Participant = { id: string; name: string; mic: boolean; camera: boolean; speaking?: boolean };
type ChatMessage = { id: string; senderId: string; sender: string; text: string; sentAt: string };
type SignalPayload = { type: string; from: string; to?: string; sdp?: RTCSessionDescriptionInit; candidate?: RTCIceCandidateInit };
type PresenceState = Record<string, Array<{ id?: string; name?: string; mic?: boolean; camera?: boolean }>>;

const initials = (name: string) => name.trim().slice(0, 2).toUpperCase();

function VideoTile({ participant, stream, self = false }: { participant: Participant; stream?: MediaStream | undefined; self?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => { if (ref.current && stream) ref.current.srcObject = stream; }, [stream]);
  return (
    <div className={`participant-tile ${participant.speaking ? "is-speaking" : ""}`}>
      {stream && participant.camera ? (
        <video ref={ref} autoPlay playsInline muted={self} className="h-full w-full object-cover" />
      ) : (
        <div className="grid h-full place-items-center bg-secondary"><span className="grid size-20 place-items-center rounded-3xl bg-accent/25 font-display text-2xl font-bold text-accent-foreground">{initials(participant.name)}</span></div>
      )}
      <div className="absolute inset-x-2 bottom-2 flex items-center justify-between gap-2 rounded-lg bg-room/80 px-2.5 py-1.5 text-xs text-room-foreground backdrop-blur-sm">
        <span className="truncate">{participant.name}{self ? " · you" : ""}</span>
        {participant.mic ? <Mic className="size-3.5" /> : <MicOff className="size-3.5 text-danger" />}
      </div>
    </div>
  );
}

export function RoomExperience({ code }: { code: string }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [joined, setJoined] = useState(false);
  const [status, setStatus] = useState("connecting — establishing line");
  const [mic, setMic] = useState(true);
  const [camera, setCamera] = useState(true);
  const [sharing, setSharing] = useState(false);
  const [panel, setPanel] = useState<"chat" | "participants" | null>("chat");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [remoteStreams, setRemoteStreams] = useState<Record<string, MediaStream>>({});
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
  const localStream = useRef<MediaStream | null>(null);
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);
  const peers = useRef(new Map<string, RTCPeerConnection>());
  const clientId = useRef(crypto.randomUUID());

  useEffect(() => () => {
    localStream.current?.getTracks().forEach((track) => track.stop());
    peers.current.forEach((peer) => peer.close());
    if (channelRef.current) void supabase.removeChannel(channelRef.current);
  }, []);

  const createPeer = (peerId: string) => {
    const existing = peers.current.get(peerId);
    if (existing) return existing;
    const peer = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19302" }] });
    localStream.current?.getTracks().forEach((track) => peer.addTrack(track, localStream.current as MediaStream));
    peer.onicecandidate = (event) => {
      if (event.candidate) channelRef.current?.send({ type: "broadcast", event: "signal", payload: { type: "candidate", from: clientId.current, to: peerId, candidate: event.candidate.toJSON() } });
    };
    peer.ontrack = (event) => {
      const stream = event.streams[0];
      if (stream) setRemoteStreams((current) => ({ ...current, [peerId]: stream }));
    };
    peers.current.set(peerId, peer);
    return peer;
  };

  const sendOffer = async (peerId: string) => {
    const peer = createPeer(peerId);
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    await channelRef.current?.send({ type: "broadcast", event: "signal", payload: { type: "offer", from: clientId.current, to: peerId, sdp: offer } });
  };

  const enterRoom = async () => {
    if (!name.trim()) { setError("Add a display name to enter the room."); return; }
    setError(""); setStatus("connecting — establishing line");
    try {
      localStream.current = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    } catch {
      setMic(false); setCamera(false);
      setError("Camera or microphone is unavailable. You can still join with chat.");
    }
    const channel = supabase.channel(`beamtro:${code}`, { config: { presence: { key: clientId.current } } });
    channelRef.current = channel;
    channel
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState() as PresenceState;
        const next = Object.values(state).flat().filter((item) => item.id && item.name).map((item) => ({ id: item.id ?? "", name: item.name ?? "Guest", mic: item.mic ?? false, camera: item.camera ?? false }));
        setParticipants(next);
      })
      .on("broadcast", { event: "chat" }, ({ payload }) => setMessages((current) => [...current, payload as ChatMessage]))
      .on("broadcast", { event: "signal" }, async ({ payload }) => {
        const signal = payload as SignalPayload;
        if (signal.to && signal.to !== clientId.current) return;
        const peer = createPeer(signal.from);
        if (signal.type === "offer" && signal.sdp) {
          await peer.setRemoteDescription(signal.sdp);
          const answer = await peer.createAnswer(); await peer.setLocalDescription(answer);
          await channel.send({ type: "broadcast", event: "signal", payload: { type: "answer", from: clientId.current, to: signal.from, sdp: answer } });
        } else if (signal.type === "answer" && signal.sdp) await peer.setRemoteDescription(signal.sdp);
        else if (signal.type === "candidate" && signal.candidate) await peer.addIceCandidate(signal.candidate).catch(() => undefined);
      })
      .subscribe(async (state) => {
        if (state === "SUBSCRIBED") {
          setJoined(true); setStatus("connected — room active");
          await channel.track({ id: clientId.current, name: name.trim(), mic, camera });
          const stateNow = channel.presenceState() as PresenceState;
          Object.values(stateNow).flat().forEach((item) => { if (item.id && item.id !== clientId.current) void sendOffer(item.id); });
        }
        if (state === "CHANNEL_ERROR" || state === "TIMED_OUT") setStatus("reconnecting — trying to restore connection");
        if (state === "CLOSED") setStatus("offline — connection lost");
      });
  };

  const toggleTrack = async (kind: "audio" | "video") => {
    const track = localStream.current?.getTracks().find((item) => item.kind === kind);
    if (!track) { setError(`${kind === "audio" ? "Microphone" : "Camera"} unavailable. Check browser permissions.`); return; }
    track.enabled = !track.enabled;
    if (kind === "audio") setMic(track.enabled); else setCamera(track.enabled);
    await channelRef.current?.track({ id: clientId.current, name, mic: kind === "audio" ? track.enabled : mic, camera: kind === "video" ? track.enabled : camera });
  };

  const toggleShare = async () => {
    if (sharing) { screenStream?.getTracks().forEach((track) => track.stop()); setScreenStream(null); setSharing(false); return; }
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
      setScreenStream(stream); setSharing(true);
      const track = stream.getVideoTracks()[0];
      if (track) peers.current.forEach((peer) => { const sender = peer.getSenders().find((item) => item.track?.kind === "video"); void sender?.replaceTrack(track); });
      if (track) track.onended = () => { setScreenStream(null); setSharing(false); };
    } catch { setError("Screen sharing was cancelled or is unavailable."); }
  };

  const sendMessage = async () => {
    const text = message.trim(); if (!text) return;
    const next: ChatMessage = { id: crypto.randomUUID(), senderId: clientId.current, sender: name, text, sentAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
    setMessages((current) => [...current, next]); setMessage("");
    await channelRef.current?.send({ type: "broadcast", event: "chat", payload: next });
  };

  const copyInvite = async () => { await navigator.clipboard.writeText(window.location.href); setCopied(true); window.setTimeout(() => setCopied(false), 1600); };
  const leave = () => { void navigate({ to: "/" }); };

  if (!joined) return (
    <main className="min-h-[calc(100vh-4rem)] bg-background px-5 py-12">
      <div className="mx-auto max-w-lg">
        <div className="mb-8 flex items-center justify-center gap-3"><span className="pulse-dot size-2 rounded-full bg-accent" /><span className="status-copy">{status}</span></div>
        <section className="entry-panel">
          <span className="eyebrow">Room · {code}</span>
          <h1 className="mt-4 font-display text-3xl font-bold">Step into the room.</h1>
          <p className="mt-2 text-sm text-muted-foreground">Choose the temporary name people will see in Beamtro.</p>
          <label htmlFor="room-name" className="mt-7 block text-sm font-semibold">Display name</label>
          <Input id="room-name" autoFocus value={name} onChange={(event) => setName(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") void enterRoom(); }} placeholder="e.g. Sam" className="mt-2 h-12" />
          <p className="mt-2 text-xs text-muted-foreground">Temporary, and only used inside the room.</p>
          {error && <p role="alert" className="mt-3 text-sm text-danger">{error}</p>}
          <Button onClick={() => void enterRoom()} size="lg" className="mt-6 w-full">Join room</Button>
        </section>
      </div>
    </main>
  );

  const self: Participant = { id: clientId.current, name, mic, camera };
  const others = participants.filter((participant) => participant.id !== clientId.current);
  return (
    <main className="room-shell">
      <header className="room-topbar">
        <div className="flex min-w-0 items-center gap-3"><span className="pulse-dot size-2 shrink-0 rounded-full bg-success" /><div className="min-w-0"><p className="truncate text-sm font-semibold">Beamtro · {code}</p><p className="status-copy">{status}</p></div></div>
        <Button variant="outline" size="sm" onClick={() => void copyInvite()}><Link2 /> <span className="hidden sm:inline">{copied ? "Link copied" : "Copy invite link"}</span></Button>
      </header>
      {error && <div role="alert" className="mx-4 mt-3 flex items-center justify-between rounded-lg bg-danger/12 px-3 py-2 text-sm text-danger"><span>{error}</span><Button variant="ghost" size="icon" aria-label="Dismiss error" onClick={() => setError("")}><X className="size-4" /></Button></div>}
      <div className={`room-grid ${panel ? "with-panel" : ""}`}>
        <section className="media-stage" aria-label="Room media">
          {sharing && screenStream ? <VideoTile participant={{ ...self, name: `${name} · sharing` }} stream={screenStream} self /> : (
            <div className="video-grid">
              <VideoTile participant={self} stream={localStream.current ?? undefined} self />
              {others.map((participant) => <VideoTile key={participant.id} participant={participant} stream={remoteStreams[participant.id]} />)}
              {others.length === 0 && <div className="participant-tile invite-tile"><Users className="size-7" /><strong>Waiting for others</strong><span>Share code {code} to bring someone in.</span><Button variant="outline" size="sm" onClick={() => void copyInvite()}><Copy /> {copied ? "Copied" : "Copy invite"}</Button></div>}
            </div>
          )}
        </section>
        {panel && <aside className="side-panel">
          <div className="flex items-center justify-between border-b border-room-line px-4 py-3"><strong className="text-sm">{panel === "chat" ? "Room chat" : `Participants · ${Math.max(participants.length, 1)}`}</strong><Button variant="ghost" size="icon" onClick={() => setPanel(null)} aria-label="Close panel"><X /></Button></div>
          {panel === "chat" ? <>
            <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4">
              {messages.length === 0 && <div className="grid h-full place-items-center text-center text-sm text-room-muted"><p>Nothing said yet.<br />Chat stays with this room.</p></div>}
              {messages.map((item) => <div key={item.id} className="message-row"><div className="flex items-baseline gap-2"><strong className="text-xs">{item.sender}{item.senderId === clientId.current ? " · you" : ""}</strong><time className="text-[10px] text-room-muted">{item.sentAt}</time></div><p className="mt-1 text-sm text-room-foreground/90">{item.text}</p></div>)}
            </div>
            <div className="border-t border-room-line p-3"><div className="flex gap-2"><Input value={message} onChange={(event) => setMessage(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") void sendMessage(); }} placeholder="Message the room…" className="border-room-line bg-room-surface text-room-foreground" /><Button size="icon" onClick={() => void sendMessage()} aria-label="Send message"><Send /></Button></div></div>
          </> : <div className="space-y-2 p-3">{[self, ...others].map((participant) => <div key={participant.id} className="participant-row"><span className="grid size-9 place-items-center rounded-xl bg-accent/20 text-xs font-bold text-accent">{initials(participant.name)}</span><span className="min-w-0 flex-1 truncate text-sm">{participant.name}{participant.id === clientId.current ? " · you" : ""}</span>{participant.mic ? <Mic /> : <MicOff className="text-danger" />}{participant.camera ? <Video /> : <VideoOff className="text-room-muted" />}</div>)}</div>}
        </aside>}
      </div>
      <nav className="control-bar" aria-label="Room controls">
        <Button variant={mic ? "room" : "roomOff"} size="room" onClick={() => void toggleTrack("audio")} aria-label={mic ? "Mute microphone" : "Turn on microphone"}>{mic ? <Mic /> : <MicOff />}</Button>
        <Button variant={camera ? "room" : "roomOff"} size="room" onClick={() => void toggleTrack("video")} aria-label={camera ? "Turn off camera" : "Turn on camera"}>{camera ? <Video /> : <VideoOff />}</Button>
        <Button variant={sharing ? "roomActive" : "room"} size="room" onClick={() => void toggleShare()} aria-label={sharing ? "Stop sharing" : "Share screen"}>{sharing ? <LoaderCircle className="animate-spin" /> : <MonitorUp />}</Button>
        <Button variant={panel === "chat" ? "roomActive" : "room"} size="room" onClick={() => setPanel(panel === "chat" ? null : "chat")} aria-label="Toggle chat"><MessageSquare /></Button>
        <Button variant={panel === "participants" ? "roomActive" : "room"} size="room" onClick={() => setPanel(panel === "participants" ? null : "participants")} aria-label="Toggle participants"><Users /></Button>
        <Button variant="room" size="room" aria-label="More options"><MoreHorizontal /></Button>
        <Button variant="leave" size="roomWide" onClick={leave}><PhoneOff /> <span>Leave</span></Button>
      </nav>
    </main>
  );
}