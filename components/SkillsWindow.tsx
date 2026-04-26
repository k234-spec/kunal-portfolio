"use client";

import { m, AnimatePresence } from "framer-motion";
import Window from "./Window";
import { useDesktop } from "@/context/DesktopContext";
import { skills, Skill } from "@/data/skills";
import Image from "next/image";
import * as LucideIcons from "lucide-react";
import { useState } from "react";

const SkillCard = ({ skill }: { skill: Skill }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Dynamically get the Lucide icon
  const IconComponent = (LucideIcons as any)[skill.icon] || LucideIcons.Code;

  const getLevelColor = (level: string) => {
    if (level === "beginner") return "#555";
    if (level === "intermediate") return "#ffbd2e";
    return "#28ca41"; // advanced
  };

  const getLevelWidth = (level: string) => {
    if (level === "beginner") return "33%";
    if (level === "intermediate") return "66%";
    return "100%";
  };

  return (
    <m.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group bg-surface-2 border border-border rounded-xl p-4 flex flex-col gap-3 transition-all duration-300 hover:border-accent hover:shadow-[0_0_20px_rgba(232,255,71,0.1)] cursor-pointer overflow-hidden min-w-[140px] flex-1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
    >
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="flex items-center gap-3 relative z-10">
        <div className="p-2 rounded-lg bg-surface-3 border border-border group-hover:border-accent/30 group-hover:text-accent transition-colors duration-300">
          <IconComponent size={20} strokeWidth={1.5} />
        </div>
        <span className="font-syne font-bold text-[14px] text-text group-hover:text-accent transition-colors duration-300">
          {skill.name}
        </span>
      </div>

      <div className="flex flex-col gap-1 relative z-10">
        <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-wider text-muted">
          <span>Expertise</span>
          <span style={{ color: getLevelColor(skill.level) }}>{skill.level}</span>
        </div>
        <div className="h-[2px] w-full bg-border rounded-full overflow-hidden">
          <m.div 
            initial={{ width: 0 }}
            animate={{ width: getLevelWidth(skill.level) }}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-full rounded-full"
            style={{ backgroundColor: getLevelColor(skill.level) }}
          />
        </div>
      </div>

      <AnimatePresence>
        {isHovered && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="relative z-10"
          >
            <p className="text-[11px] font-sans text-muted leading-relaxed mt-2 border-t border-border pt-2 animate-in fade-in slide-in-from-top-1 duration-300">
              {skill.description}
            </p>
          </m.div>
        )}
      </AnimatePresence>

      {/* Decorative Terminal Bits */}
      <div className="absolute top-2 right-2 opacity-10 group-hover:opacity-30 transition-opacity font-mono text-[8px]">
        {skill.id.toUpperCase()}
      </div>
    </m.div>
  );
};

export default function SkillsWindow() {
  const { closeWindow, minimizeWindow, focusWindow, activeWindow, openWindows } = useDesktop();
  const id = "skills";

  if (!openWindows.includes(id)) return null;

  // Group skills by category
  const categories = ["Frontend", "Backend", "Database", "Marketing Tech", "AI & Automation", "Tools"];
  const groupedSkills = categories.map(cat => ({
    name: cat,
    items: skills.filter(s => s.category === cat)
  })).filter(g => g.items.length > 0);

  return (
    <Window
      id={id}
      title="Terminal — Skills"
      icon={
        <div className="w-[14px] h-[14px] relative mr-1">
          <Image src="/terminal.png" alt="Terminal" fill className="object-cover rounded-sm" />
        </div>
      }
      defaultPosition={{ x: 150, y: 120 }}
      defaultSize={{ width: 700, height: 550 }}
      onClose={() => closeWindow(id)}
      onMinimize={() => minimizeWindow(id)}
      onFocus={() => focusWindow(id)}
      zIndex={activeWindow === id ? 50 : 1}
    >
      <div className="flex flex-col gap-10 p-2">
        {groupedSkills.map((category, index) => (
          <div key={category.name} className="flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[10px] text-accent tracking-[4px] uppercase bg-accent/10 px-2 py-1 rounded">
                {category.name}
              </span>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-accent/20 to-transparent"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.items.map(skill => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </div>
          </div>
        ))}

        {/* Footer Terminal Info */}
        <div className="mt-4 pt-4 border-t border-border flex justify-between items-center font-mono text-[10px] text-muted/50">
          <span>LAST UPDATED: 2024.04.26</span>
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#28ca41]"></span> ADVANCED</span>
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#ffbd2e]"></span> INTERMEDIATE</span>
          </div>
        </div>
      </div>
    </Window>
  );
}
