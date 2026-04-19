"use client";

import Image from "next/image";
import { m } from "framer-motion";
import Window from "./Window";
import { useDesktop } from "@/context/DesktopContext";
import { GraduationCap, BookOpen, MapPin, Calendar } from "lucide-react";

const education = [
  {
    id: "btech",
    degree: "Bachelor of Technology",
    field: "Computer Science & Engineering",
    institution: "Lingaya's Vidyapeeth",
    location: "Faridabad, Haryana",
    period: "2019 – 2023",
    icon: <GraduationCap size={22} />,
    gradient: "from-violet-600/20 to-indigo-600/10",
    accent: "#7c3aed",
    accentLight: "#a78bfa",
    badge: "B.Tech",
    highlights: [
      "Specialized in Artificial Intelligence & Machine Learning",
      "Final year project on Automated Lead Generation Systems",
      "Active member of the Coding & Entrepreneurship Club",
    ],
  },
  {
    id: "senior",
    degree: "Senior Secondary Education",
    field: "Science Stream (PCM + CS)",
    institution: "Vidya Mandir Public School",
    location: "Delhi",
    period: "2018 – 2019",
    icon: <BookOpen size={22} />,
    gradient: "from-amber-600/20 to-orange-600/10",
    accent: "#d97706",
    accentLight: "#fbbf24",
    badge: "XII",
    highlights: [
      "Physics, Chemistry, Mathematics & Computer Science",
      "School rank holder in Computer Science",
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function EducationWindow() {
  const { closeWindow, minimizeWindow, focusWindow, activeWindow, openWindows } = useDesktop();
  const id = "education";

  if (!openWindows.includes(id)) return null;

  return (
    <Window
      id={id}
      title="Education.app"
      icon={
        <div className="w-4 h-4 relative">
          <Image src="/education.png" alt="Education" fill className="object-contain" />
        </div>
      }
      defaultPosition={{ x: 160, y: 80 }}
      defaultSize={{ width: 680, height: 520 }}
      onClose={() => closeWindow(id)}
      onMinimize={() => minimizeWindow(id)}
      onFocus={() => focusWindow(id)}
      zIndex={activeWindow === id ? 50 : 1}
    >
      <div className="flex flex-col gap-3 -mt-2">
        {/* Header */}
        <div className="mb-4">
          <p className="font-mono text-[10px] text-[#444] uppercase tracking-widest mb-1">
            {"// academic background"}
          </p>
          <h2 className="font-syne font-extrabold text-[22px] text-white leading-tight">
            Education
          </h2>
          <p className="font-sans text-[13px] text-[#666] mt-1">
            Kunal Mangla &mdash; Academic Qualifications
          </p>
        </div>

        {/* Cards */}
        <m.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-5"
        >
          {education.map((edu, index) => (
            <m.div
              key={edu.id}
              variants={cardVariants}
              className={`relative rounded-2xl border border-[#2a2a2a] bg-gradient-to-br ${edu.gradient} overflow-hidden group hover:border-[#3a3a3a] transition-colors duration-300`}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: `linear-gradient(90deg, ${edu.accent}, transparent)` }}
              />

              <div className="p-6">
                <div className="flex items-start gap-4">
                  {/* Icon badge */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-white/10"
                    style={{ backgroundColor: `${edu.accent}33`, color: edu.accentLight }}
                  >
                    {edu.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Degree row */}
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
                      <h3 className="font-syne font-bold text-[17px] text-white leading-snug">
                        {edu.degree}
                      </h3>
                      <span
                        className="font-mono text-[10px] px-2.5 py-1 rounded-full border font-semibold tracking-widest uppercase"
                        style={{
                          color: edu.accentLight,
                          borderColor: `${edu.accent}55`,
                          backgroundColor: `${edu.accent}22`,
                        }}
                      >
                        {edu.badge}
                      </span>
                    </div>

                    {/* Field */}
                    <p
                      className="font-mono text-[11px] uppercase tracking-[2px] mb-3"
                      style={{ color: edu.accentLight }}
                    >
                      {edu.field}
                    </p>

                    {/* Institution & Meta */}
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <div className="flex items-center gap-1.5 text-[#888]">
                        <BookOpen size={12} />
                        <span className="font-sans text-[13px]">{edu.institution}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#888]">
                        <MapPin size={12} />
                        <span className="font-sans text-[13px]">{edu.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#888]">
                        <Calendar size={12} />
                        <span className="font-sans text-[13px]">{edu.period}</span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="flex flex-col gap-2 border-t border-white/5 pt-4">
                      {edu.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span
                            className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ backgroundColor: edu.accent }}
                          />
                          <span className="font-sans text-[13px] text-[#777] leading-snug">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline number */}
              <div
                className="absolute bottom-4 right-5 font-mono text-[48px] font-extrabold opacity-5 select-none leading-none"
                style={{ color: edu.accentLight }}
              >
                {String(education.length - index).padStart(2, "0")}
              </div>
            </m.div>
          ))}
        </m.div>
      </div>
    </Window>
  );
}
