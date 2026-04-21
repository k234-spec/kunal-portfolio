"use client";

import Window from "./Window";
import { useDesktop } from "@/context/DesktopContext";
import Image from "next/image";
import { useTypingAnimation } from "@/hooks/useTypingAnimation";

const phrases = [
  "Full Stack Developer",
  "Product Engineer",
  "Marketing Tech Builder",
  "AI Workflow Architect"
];

export default function AboutWindow() {
  const { closeWindow, minimizeWindow, focusWindow, activeWindow, openWindows } = useDesktop();
  const id = "about";
  const { displayText } = useTypingAnimation(phrases);

  if (!openWindows.includes(id)) return null;

  return (
    <Window
      id={id}
      title="Finder"
      icon={
        <div className="w-[14px] h-[14px] relative mr-1">
          <Image src="/finder.png" alt="Finder" fill className="object-cover rounded-sm" />
        </div>
      }
      defaultPosition={{ x: 100, y: 100 }}
      defaultSize={{ width: 600, height: 450 }}
      onClose={() => closeWindow(id)}
      onMinimize={() => minimizeWindow(id)}
      onFocus={() => focusWindow(id)}
      zIndex={activeWindow === id ? 50 : 1}
    >
      <div className="flex flex-col items-center text-center py-8">
        <div className="w-[120px] h-[120px] rounded-full overflow-hidden bg-[#181818] mb-6 relative border-2 border-white/10 shadow-2xl">
          <Image src="/profile-photo.jpg" alt="Kunal Mangla" fill sizes="120px" className="object-cover" />
        </div>
        <h1 className="font-syne font-extrabold text-[32px] text-text mb-2">Kunal Mangla</h1>
        <h2 className="font-mono text-accent tracking-[4px] uppercase text-[11px] mb-4">Product Engineer</h2>
        <div className="font-mono text-accent text-[14px] h-6 flex items-center justify-center mb-8">
          <span>{displayText}</span><span className="cursor-blink inline-block w-2 ml-1">|</span>
        </div>
        <p className="font-sans text-muted leading-relaxed mb-8 text-[15px] max-w-md">
          B.Tech in Computer Science (AI/ML). Currently working as a Marketing Automation Analyst, building automated lead gen systems and CRM workflows. Transitioning into full-stack engineering and product leadership.
        </p>
      </div>
    </Window>
  );
}
