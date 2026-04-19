"use client";

import Window from "@/components/Window";
import { useDesktop } from "@/context/DesktopContext";
import { experience } from "@/data/experience";
import Image from "next/image";

export default function ExperienceWindow() {
  const { openWindows, activeWindow, closeWindow, minimizeWindow, focusWindow } = useDesktop();
  const id = "experience";

  if (!openWindows.includes(id)) return null;

  return (
    <Window
      id={id}
      title="Work Experience"
      icon={
        <div className="w-[14px] h-[14px] relative mr-1">
          <Image src="/vscode.png" alt="Experience" fill className="object-cover rounded-sm" />
        </div>
      }
      defaultPosition={{ x: 150, y: 100 }}
      defaultSize={{ width: 650, height: 500 }}
      onClose={() => closeWindow(id)}
      onMinimize={() => minimizeWindow(id)}
      zIndex={activeWindow === id ? 50 : 1}
      onFocus={() => focusWindow(id)}
    >
      <div className="flex flex-col gap-6">
        {experience.map((exp) => (
          <div key={exp.id} className="bg-[#181818] border border-[#2a2a2a] rounded-xl p-5 flex gap-4 relative">
            {exp.current && (
              <span className="absolute top-4 right-4 bg-[rgba(232,255,71,0.15)] text-accent font-mono text-[10px] px-2 py-0.5 rounded">
                CURRENT
              </span>
            )}
            {exp.logo ? (
              <div className="w-12 h-12 flex-shrink-0 relative rounded-md overflow-hidden bg-white">
                <Image src={exp.logo} alt={exp.company} fill className="object-contain p-1" />
              </div>
            ) : (
              <div className="w-12 h-12 flex-shrink-0 bg-[#2a2a2a] rounded-md flex items-center justify-center text-xl">
                🏢
              </div>
            )}
            <div className="flex-1">
              <h3 className="font-syne font-bold text-[18px] text-text">{exp.company}</h3>
              <h4 className="font-sans font-medium text-[14px] text-accent mb-1">{exp.role}</h4>
              <p className="font-mono text-[12px] text-muted mb-4">{exp.duration}</p>
              <ul className="space-y-2">
                {exp.contributions.map((contribution, i) => (
                  <li key={i} className="font-sans text-[14px] text-muted leading-[1.6] flex items-start">
                    <span className="text-accent mr-2 mt-1 text-[16px] leading-[14px]">•</span>
                    {contribution}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </Window>
  );
}
