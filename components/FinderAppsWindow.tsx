"use client";

import Image from "next/image";
import { m } from "framer-motion";
import Window from "./Window";
import { useDesktop } from "@/context/DesktopContext";

// All portfolio sections shown as macOS-style app icons
const APPS = [
  { id: "about",      label: "About Me",        src: "/finder.png" },
  { id: "skills",     label: "Terminal",        src: "/terminal.png" },
  { id: "projects",   label: "Projects",        src: "/projects-icon.png" },
  { id: "experience", label: "Experience",      src: "/vscode.png" },
  { id: "education",  label: "Education",       src: "/education.png" },
  { id: "photos",     label: "Photos",          src: "/photos.png" },
  { id: "spotify",    label: "Music",           src: "/spotify.png" },
  { id: "certs",      label: "Certificates",    src: "/folder-icon.png" },
  { id: "contact",    label: "Contact",         src: "/contact-icon.png" },
  { id: "safari",     label: "Safari",          src: "/safari.png" },
];

export default function FinderAppsWindow() {
  const { closeWindow, minimizeWindow, focusWindow, activeWindow, openWindows, openWindow } = useDesktop();
  const id = "finder";

  if (!openWindows.includes(id)) return null;

  return (
    <Window
      id={id}
      title="Applications"
      icon={
        <div className="w-[14px] h-[14px] relative mr-1">
          <Image src="/finder.png" alt="Finder" fill className="object-cover rounded-sm" />
        </div>
      }
      defaultPosition={{ x: 180, y: 60 }}
      defaultSize={{ width: 640, height: 460 }}
      onClose={() => closeWindow(id)}
      onMinimize={() => minimizeWindow(id)}
      onFocus={() => focusWindow(id)}
      zIndex={activeWindow === id ? 50 : 1}
    >
      {/* Finder toolbar */}
      <div className="flex items-center justify-between mb-4 -mt-2 pb-3 border-b border-white/5">
        <div className="flex items-center gap-1">
          <button className="w-7 h-7 flex items-center justify-center rounded-md bg-white/5 text-white/40 hover:bg-white/10 transition-colors text-[12px]">‹</button>
          <button className="w-7 h-7 flex items-center justify-center rounded-md bg-white/5 text-white/40 hover:bg-white/10 transition-colors text-[12px]">›</button>
        </div>

        <span className="text-white/60 font-semibold text-[13px] tracking-wide">Applications</span>

        <div className="flex items-center gap-2">
          <button className="w-7 h-7 flex items-center justify-center rounded-md bg-white/15 text-white transition-colors">
            <svg viewBox="0 0 16 16" className="w-4 h-4 fill-current">
              <rect x="1" y="1" width="6" height="6" rx="1" />
              <rect x="9" y="1" width="6" height="6" rx="1" />
              <rect x="1" y="9" width="6" height="6" rx="1" />
              <rect x="9" y="9" width="6" height="6" rx="1" />
            </svg>
          </button>
          <button className="w-7 h-7 flex items-center justify-center rounded-md text-white/30 hover:bg-white/10 transition-colors">
            <svg viewBox="0 0 16 16" className="w-4 h-4 fill-current">
              <rect x="1" y="2" width="14" height="2" rx="1" />
              <rect x="1" y="7" width="14" height="2" rx="1" />
              <rect x="1" y="12" width="14" height="2" rx="1" />
            </svg>
          </button>
          <div className="flex items-center gap-1.5 bg-white/8 border border-white/10 rounded-lg px-2.5 py-1">
            <svg viewBox="0 0 16 16" className="w-3 h-3 fill-white/30 shrink-0">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.099zm-5.242 1.156a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z" />
            </svg>
            <span className="text-white/30 text-[11px]">Search</span>
          </div>
        </div>
      </div>

      {/* App icon grid — Minimized gaps */}
      <div className="grid grid-cols-5 sm:grid-cols-6 gap-x-2 gap-y-4 overflow-y-auto pr-1 pb-10" style={{ maxHeight: "calc(100% - 40px)" }}>
        {APPS.map((app, i) => (
          <m.button
            key={app.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.03, duration: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onDoubleClick={() => openWindow(app.id)}
            className="flex flex-col items-center gap-1 group outline-none"
          >
            {/* Icon — No background container, just the raw icon */}
            <div className="w-[52px] h-[52px] relative drop-shadow-md">
              <Image src={app.src} alt={app.label} fill className="object-contain" />
            </div>
            {/* Label — Bold and compact */}
            <span className="text-white text-[11px] font-bold text-center leading-tight max-w-[65px] truncate group-hover:bg-blue-600/40 rounded px-1 transition-all">
              {app.label}
            </span>
          </m.button>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center py-1.5 border-t border-white/5 bg-[#1a1a1a]/40 backdrop-blur-md">
        <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest">
          {APPS.length} Apps — 86.13 GB available
        </span>
      </div>
    </Window>
  );
}
