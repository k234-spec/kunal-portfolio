"use client";

import { useState, useEffect, useRef } from "react";
import { m, AnimatePresence } from "framer-motion";

export default function ControlCenter() {
  const [open, setOpen] = useState(false);
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(true);
  const [airdrop, setAirdrop] = useState(false);
  const [volume, setVolume] = useState(62);
  const [brightness, setBrightness] = useState(80);
  const [focusMode, setFocusMode] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const Toggle = ({
    on, onClick, icon, label, color = "#3b82f6"
  }: { on: boolean; onClick: () => void; icon: string; label: string; color?: string }) => (
    <button
      onClick={onClick}
      className="flex flex-col gap-1 items-start rounded-xl p-2.5 transition-all active:scale-95"
      style={{
        background: on ? color : "rgba(255,255,255,0.12)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.08)",
        minHeight: 64,
      }}
    >
      <span className="text-[18px]">{icon}</span>
      <span className="text-white text-[11px] font-semibold leading-tight">{label}</span>
      <span className="text-white/60 text-[9px]">{on ? "On" : "Off"}</span>
    </button>
  );

  const Slider = ({
    value, onChange, icon
  }: { value: number; onChange: (v: number) => void; icon: string }) => (
    <div
      className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
      style={{ background: "rgba(255,255,255,0.10)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <span className="text-[16px] shrink-0">{icon}</span>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1 accent-white h-1 cursor-pointer"
        style={{ accentColor: "rgba(255,255,255,0.9)" }}
      />
    </div>
  );

  return (
    <div className="relative" ref={ref}>
      {/* Control Center button in MenuBar */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-white/80 hover:text-white transition-colors px-1"
        title="Control Center"
      >
        {/* macOS control center icon */}
        <svg viewBox="0 0 18 18" className="w-[15px] h-[15px] fill-current">
          <rect x="1" y="1" width="6" height="6" rx="1.5" />
          <rect x="11" y="1" width="6" height="6" rx="1.5" />
          <rect x="1" y="11" width="6" height="6" rx="1.5" />
          <rect x="11" y="11" width="6" height="6" rx="1.5" />
        </svg>
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <m.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-[28px] w-[280px] rounded-2xl p-3 flex flex-col gap-2 z-[200] shadow-2xl"
            style={{
              background: "rgba(28,28,36,0.82)",
              backdropFilter: "blur(40px) saturate(180%)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            {/* Connectivity row */}
            <div className="grid grid-cols-3 gap-2">
              <Toggle on={wifi} onClick={() => setWifi(!wifi)} icon="📶" label="Wi-Fi" color="#2563eb" />
              <Toggle on={bluetooth} onClick={() => setBluetooth(!bluetooth)} icon="🔵" label="Bluetooth" color="#2563eb" />
              <Toggle on={airdrop} onClick={() => setAirdrop(!airdrop)} icon="📡" label="AirDrop" color="#374151" />
            </div>

            {/* Focus mode */}
            <button
              onClick={() => setFocusMode(!focusMode)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all"
              style={{
                background: focusMode ? "rgba(99,60,180,0.7)" : "rgba(255,255,255,0.10)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <span className="text-[18px]">🌙</span>
              <div className="flex flex-col items-start">
                <span className="text-white text-[11px] font-semibold">Focus</span>
                <span className="text-white/60 text-[9px]">{focusMode ? "On" : "Off"}</span>
              </div>
            </button>

            {/* Not Playing card */}
            <div
              className="flex items-center gap-3 rounded-xl px-3 py-2.5"
              style={{ background: "rgba(255,255,255,0.10)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="w-9 h-9 rounded-lg bg-[#1db954] flex items-center justify-center shrink-0">
                <span className="text-[16px]">🎵</span>
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-white text-[11px] font-semibold truncate">Kunal&apos;s Playlist</span>
                <span className="text-white/50 text-[10px]">Spotify</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <span className="text-[14px]">⏮</span>
                <span className="text-[16px]">▶</span>
                <span className="text-[14px]">⏭</span>
              </div>
            </div>

            {/* Volume */}
            <Slider value={volume} onChange={setVolume} icon="🔊" />
            {/* Brightness */}
            <Slider value={brightness} onChange={setBrightness} icon="☀️" />

            {/* Bottom row */}
            <div className="grid grid-cols-4 gap-2 mt-1">
              {[
                { icon: "⏰", label: "Alarm" },
                { icon: "🖥", label: "Display" },
                { icon: "⌨️", label: "Keyboard" },
                { icon: "🎤", label: "Mic" },
              ].map((item) => (
                <button
                  key={item.label}
                  className="flex flex-col items-center gap-1 rounded-xl py-2 transition-all hover:bg-white/10"
                  style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <span className="text-[16px]">{item.icon}</span>
                  <span className="text-white/60 text-[8px]">{item.label}</span>
                </button>
              ))}
            </div>

            <p className="text-white/25 text-[9px] text-center mt-1">Edit Controls</p>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
