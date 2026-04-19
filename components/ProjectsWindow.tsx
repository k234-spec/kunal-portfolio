"use client";

import { Code, ExternalLink } from "lucide-react";
import Window from "./Window";
import { useDesktop } from "@/context/DesktopContext";
import { projects } from "@/data/projects";
import Image from "next/image";

export default function ProjectsWindow() {
  const { closeWindow, minimizeWindow, focusWindow, activeWindow, openWindows } = useDesktop();
  const id = "projects";

  if (!openWindows.includes(id)) return null;

  return (
    <Window
      id={id}
      title="Projects"
      icon={
        <div className="w-4 h-4 relative">
          <Image src="/projects-icon.png" alt="Projects" fill className="object-contain" />
        </div>
      }
      defaultPosition={{ x: 250, y: 120 }}
      defaultSize={{ width: 800, height: 600 }}
      onClose={() => closeWindow(id)}
      onMinimize={() => minimizeWindow(id)}
      onFocus={() => focusWindow(id)}
      zIndex={activeWindow === id ? 50 : 1}
    >
      <div className="flex flex-col gap-6">
        <p className="font-mono text-[11px] text-[#555]">{"// selected works & experiments"}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-[#111111] border border-[#2a2a2a] rounded-xl overflow-hidden flex flex-col group transition-colors hover:border-accent">
              <div className="h-[180px] bg-[#181818] relative w-full overflow-hidden border-b border-[#2a2a2a]">
                <Image src={project.thumbnail} alt={project.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" onError={(e) => { (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450"><rect width="800" height="450" fill="%23181818"/></svg>'}} />
                <div className="absolute top-3 right-3 text-[10px] font-mono px-2 py-1 rounded bg-[#111111]/80 backdrop-blur-md border border-[#2a2a2a]">
                  {project.status === 'completed' ? <span className="text-[#28ca41]">✓ Completed</span> : <span className="text-[#ffbd2e]">⚡ In Progress</span>}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-syne font-bold text-[18px] text-text mb-2 line-clamp-1">{project.title}</h3>
                <p className="font-sans text-[14px] text-muted leading-[1.6] mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.stack.map(tech => <span key={tech} className="bg-[#181818] border border-[#2a2a2a] rounded px-2 py-1 font-mono text-[10px] text-muted">{tech}</span>)}
                </div>
                <div className="flex items-center gap-4 border-t border-[#2a2a2a] pt-4 mt-auto">
                  <a href={project.githubUrl || "#"} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors"><Code size={20} /></a>
                  <a href={project.demoUrl || "#"} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors"><ExternalLink size={20} /></a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Window>
  );
}
