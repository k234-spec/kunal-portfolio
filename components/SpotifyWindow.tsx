"use client";

import { useState, KeyboardEvent } from "react";
import Image from "next/image";
import { m, AnimatePresence } from "framer-motion";
import Window from "./Window";
import { useDesktop } from "@/context/DesktopContext";
import { Plus, X, Music, Link, ChevronDown, ChevronUp } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────
interface SpotifyEmbed {
  id: string;
  url: string;        // original URL pasted by user
  embedUrl: string;   // converted embed URL
  label: string;
  type: "track" | "playlist" | "album" | "episode" | "unknown";
}

// ── Convert any open.spotify.com URL → embed URL ──────────────────────────────
function toEmbedUrl(raw: string): { embedUrl: string; type: SpotifyEmbed["type"] } | null {
  try {
    const trimmed = raw.trim();
    // Accept spotify: URIs too  e.g. spotify:track:4iV5W9uYEdYUVa79Axb7Rh
    let url = trimmed;
    if (trimmed.startsWith("spotify:")) {
      const parts = trimmed.split(":");
      if (parts.length >= 3) url = `https://open.spotify.com/${parts[1]}/${parts[2]}`;
    }
    const u = new URL(url);
    if (!u.hostname.includes("spotify.com")) return null;

    // pathname: /track/ID, /playlist/ID, /album/ID, /episode/ID
    const segments = u.pathname.split("/").filter(Boolean);
    if (segments.length < 2) return null;
    const type = segments[0] as SpotifyEmbed["type"];
    const spotifyId = segments[1];

    const embedUrl = `https://open.spotify.com/embed/${type}/${spotifyId}?utm_source=generator&theme=0`;
    return { embedUrl, type };
  } catch {
    return null;
  }
}

function friendlyLabel(url: string, type: SpotifyEmbed["type"]): string {
  const labels: Record<string, string> = {
    track: "Track",
    playlist: "Playlist",
    album: "Album",
    episode: "Episode",
    unknown: "Spotify",
  };
  return `${labels[type] ?? "Spotify"} Recommendation`;
}

// ── Default recommendations (Kunal's picks — update as desired) ───────────────
const DEFAULTS: SpotifyEmbed[] = [
  {
    id: "default-1",
    url: "https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M",
    embedUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator&theme=0",
    label: "Today's Top Hits",
    type: "playlist",
  },
  {
    id: "default-2",
    url: "https://open.spotify.com/playlist/37i9dQZF1DX0XUsuxWHRQd",
    embedUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DX0XUsuxWHRQd?utm_source=generator&theme=0",
    label: "RapCaviar",
    type: "playlist",
  },
];

// ── Spotify Window ─────────────────────────────────────────────────────────────
export default function SpotifyWindow() {
  const { closeWindow, minimizeWindow, focusWindow, activeWindow, openWindows } = useDesktop();
  const id = "spotify";

  const [embeds, setEmbeds]           = useState<SpotifyEmbed[]>(DEFAULTS);
  const [inputUrl, setInputUrl]       = useState("");
  const [inputLabel, setInputLabel]   = useState("");
  const [showAdd, setShowAdd]         = useState(false);
  const [error, setError]             = useState("");
  const [expandedId, setExpandedId]   = useState<string | null>(DEFAULTS[0]?.id ?? null);

  if (!openWindows.includes(id)) return null;

  // ── Add a new embed ──────────────────────────────────────────────────────────
  const handleAdd = () => {
    setError("");
    const result = toEmbedUrl(inputUrl);
    if (!result) {
      setError("Please paste a valid Spotify track, playlist, album, or episode URL.");
      return;
    }
    const newEmbed: SpotifyEmbed = {
      id: Date.now().toString(),
      url: inputUrl.trim(),
      embedUrl: result.embedUrl,
      type: result.type,
      label: inputLabel.trim() || friendlyLabel(inputUrl, result.type),
    };
    setEmbeds((prev) => [newEmbed, ...prev]);
    setExpandedId(newEmbed.id);
    setInputUrl("");
    setInputLabel("");
    setShowAdd(false);
  };

  const handleRemove = (embedId: string) => {
    setEmbeds((prev) => prev.filter((e) => e.id !== embedId));
    if (expandedId === embedId) setExpandedId(null);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleAdd();
    if (e.key === "Escape") { setShowAdd(false); setError(""); }
  };

  return (
    <Window
      id={id}
      title="Spotify.app"
      icon={
        <div className="w-4 h-4 relative">
          <Image src="/spotify.png" alt="Spotify" fill className="object-contain" />
        </div>
      }
      defaultPosition={{ x: 140, y: 60 }}
      defaultSize={{ width: 680, height: 580 }}
      onClose={() => closeWindow(id)}
      onMinimize={() => minimizeWindow(id)}
      onFocus={() => focusWindow(id)}
      zIndex={activeWindow === id ? 50 : 1}
    >
      <div className="flex flex-col h-full -mt-2 gap-4">

        {/* ── Header ── */}
        <div className="flex items-center justify-between shrink-0">
          <div>
            <p className="font-mono text-[10px] text-[#444] uppercase tracking-widest mb-1">
              {"// kunal's picks"}
            </p>
            <h2 className="font-syne font-extrabold text-[20px] text-white flex items-center gap-2">
              <span className="text-[#1DB954]">♫</span> Spotify Recommendations
            </h2>
          </div>
          <m.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { setShowAdd((v) => !v); setError(""); }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1DB954]/10 hover:bg-[#1DB954]/20 border border-[#1DB954]/30 text-[#1DB954] text-[12px] font-mono transition-all"
          >
            <Plus size={13} />
            Add Track / Playlist
          </m.button>
        </div>

        {/* ── Add panel ── */}
        <AnimatePresence>
          {showAdd && (
            <m.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden shrink-0"
            >
              <div className="bg-[#111] border border-[#2a2a2a] rounded-2xl p-5 flex flex-col gap-3">
                <p className="font-mono text-[11px] text-[#555]">
                  Paste any Spotify link — track, playlist, album, or episode
                </p>

                <div className="flex items-center gap-2 bg-[#0d0d0d] rounded-xl px-4 py-2.5 border border-[#2a2a2a] focus-within:border-[#1DB954]/40 transition-colors">
                  <Link size={13} className="text-[#1DB954]/60 shrink-0" />
                  <input
                    className="flex-1 bg-transparent text-white text-[13px] font-mono outline-none placeholder:text-[#444]"
                    placeholder="https://open.spotify.com/track/..."
                    value={inputUrl}
                    onChange={(e) => { setInputUrl(e.target.value); setError(""); }}
                    onKeyDown={handleKeyDown}
                    autoFocus
                  />
                </div>

                <div className="flex items-center gap-2 bg-[#0d0d0d] rounded-xl px-4 py-2.5 border border-[#2a2a2a] focus-within:border-[#1DB954]/40 transition-colors">
                  <Music size={13} className="text-[#555] shrink-0" />
                  <input
                    className="flex-1 bg-transparent text-white text-[13px] font-mono outline-none placeholder:text-[#444]"
                    placeholder="Label (optional)"
                    value={inputLabel}
                    onChange={(e) => setInputLabel(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                </div>

                {error && (
                  <p className="font-mono text-[11px] text-red-400">{error}</p>
                )}

                <div className="flex gap-2">
                  <m.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleAdd}
                    className="flex-1 py-2 rounded-xl bg-[#1DB954] hover:bg-[#1ed760] text-black text-[13px] font-bold transition-colors"
                  >
                    Add to Recommendations
                  </m.button>
                  <button
                    onClick={() => { setShowAdd(false); setError(""); }}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/50 text-[13px] font-mono transition-colors"
                  >
                    Cancel
                  </button>
                </div>

                {/* How-to hint */}
                <p className="font-mono text-[10px] text-[#333] leading-relaxed">
                  In Spotify: Right-click any track/playlist → Share → Copy link
                </p>
              </div>
            </m.div>
          )}
        </AnimatePresence>

        {/* ── Embeds list ── */}
        <div className="flex-1 overflow-y-auto flex flex-col gap-3 pr-1">
          {embeds.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center py-12">
              <div className="w-16 h-16 rounded-full bg-[#1DB954]/10 flex items-center justify-center">
                <Music size={28} className="text-[#1DB954]/40" />
              </div>
              <p className="font-mono text-[12px] text-[#444]">No recommendations yet</p>
              <p className="font-sans text-[13px] text-[#333] max-w-[240px] leading-relaxed">
                Click &quot;Add Track / Playlist&quot; and paste any Spotify link to embed it here.
              </p>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {embeds.map((embed) => {
                const isExpanded = expandedId === embed.id;
                return (
                  <m.div
                    key={embed.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-[#111] border border-[#2a2a2a] rounded-2xl overflow-hidden"
                  >
                    {/* Card header — click to expand/collapse */}
                    <div
                      className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-white/[0.03] transition-colors select-none"
                      onClick={() => setExpandedId(isExpanded ? null : embed.id)}
                    >
                      <div className="w-7 h-7 rounded-full bg-[#1DB954]/15 flex items-center justify-center shrink-0">
                        <span className="text-[#1DB954] text-[14px]">♫</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-[13px] font-semibold truncate">{embed.label}</p>
                        <p className="font-mono text-[10px] text-[#555] capitalize">{embed.type}</p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        {isExpanded
                          ? <ChevronUp size={14} className="text-white/30" />
                          : <ChevronDown size={14} className="text-white/30" />
                        }
                        <button
                          onClick={(e) => { e.stopPropagation(); handleRemove(embed.id); }}
                          className="ml-1 w-6 h-6 flex items-center justify-center rounded-full hover:bg-red-500/20 text-white/20 hover:text-red-400 transition-all"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    </div>

                    {/* Spotify embed iframe */}
                    <AnimatePresence>
                      {isExpanded && (
                        <m.div
                          initial={{ height: 0 }}
                          animate={{ height: embed.type === "track" ? 152 : 352 }}
                          exit={{ height: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <iframe
                            src={embed.embedUrl}
                            width="100%"
                            height={embed.type === "track" ? 152 : 352}
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                            style={{ border: "none", display: "block" }}
                          />
                        </m.div>
                      )}
                    </AnimatePresence>
                  </m.div>
                );
              })}
            </AnimatePresence>
          )}
        </div>
      </div>
    </Window>
  );
}
