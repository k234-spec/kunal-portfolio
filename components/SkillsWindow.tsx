"use client";

import { m } from "framer-motion";
import Window from "./Window";
import { useDesktop } from "@/context/DesktopContext";
import { skills } from "@/data/skills";
import Image from "next/image";

export default function SkillsWindow() {
  const { closeWindow, minimizeWindow, focusWindow, activeWindow, openWindows } = useDesktop();
  const id = "skills";

  if (!openWindows.includes(id)) return null;

  // Group skills by category
  const categories = ["Frontend", "Backend", "Database", "Marketing Tech", "AI & Automation", "Tools", "Tools & Others"];
  const groupedSkills = categories.map(cat => ({
    name: cat,
    items: skills.filter(s => s.category === cat || (cat === "Tools & Others" && s.category === "Tools"))
  })).filter(g => g.items.length > 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  const getLevelColor = (level: string) => {
    if (level === "beginner") return "bg-[#555]";
    if (level === "intermediate") return "bg-[#ffbd2e]";
    return "bg-[#28ca41]"; // advanced
  };

  return (
    <Window
      id={id}
      title="Terminal"
      icon={
        <div className="w-[14px] h-[14px] relative mr-1">
          <Image src="/terminal.png" alt="Terminal" fill className="object-cover rounded-sm" />
        </div>
      }
      defaultPosition={{ x: 150, y: 120 }}
      defaultSize={{ width: 640, height: 500 }}
      onClose={() => closeWindow(id)}
      onMinimize={() => minimizeWindow(id)}
      onFocus={() => focusWindow(id)}
      zIndex={activeWindow === id ? 50 : 1}
    >
      <m.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-8"
      >
        {groupedSkills.map((category, index) => (
          <div key={category.name} className="flex flex-col">
            <span className="font-mono text-[11px] text-accent tracking-[4px] uppercase mb-4">
              {category.name}
            </span>
            <div className="flex flex-wrap gap-3">
              {category.items.map(skill => (
                <m.div 
                  key={skill.id}
                  variants={itemVariants}
                  className="bg-surface-2 border border-border rounded-pill px-[14px] py-[6px] font-sans text-[12px] font-medium text-text flex items-center gap-2 transition-all duration-200 hover:border-accent hover:bg-surface-3 cursor-default"
                >
                  <span className={`w-2 h-2 rounded-full ${getLevelColor(skill.level)}`}></span>
                  {skill.name}
                </m.div>
              ))}
            </div>
            {index < groupedSkills.length - 1 && (
              <div className="h-[1px] w-full bg-border mt-8"></div>
            )}
          </div>
        ))}
      </m.div>
    </Window>
  );
}
