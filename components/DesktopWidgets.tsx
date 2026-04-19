"use client";

import { useState, useEffect } from "react";

const CITIES = [
  { name: "New Delhi", tz: "Asia/Kolkata", offset: "+5:30" },
  { name: "New York", tz: "America/New_York", offset: "" },
  { name: "London", tz: "Europe/London", offset: "" },
  { name: "Tokyo", tz: "Asia/Tokyo", offset: "" },
];

function getTimeInZone(tz: string) {
  return new Date().toLocaleTimeString("en-US", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function getDayLabel(tz: string) {
  const now = new Date();
  const local = new Date(now.toLocaleString("en-US", { timeZone: tz }));
  const today = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  const diff = local.getDate() - today.getDate();
  if (diff === 0) return "Today";
  if (diff === 1 || diff === -30 || diff === -29 || diff === -28) return "Tomorrow";
  return "Yesterday";
}

export default function DesktopWidgets() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Calendar data
  const year = now.getFullYear();
  const month = now.getMonth();
  const date = now.getDate();
  const dayOfWeek = now.getDay();

  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const dayNames = ["Su","Mo","Tu","We","Th","Fr","Sa"];

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="absolute left-4 top-[44px] flex flex-col gap-3 pointer-events-auto z-10" style={{ width: 200 }}>
      
      {/* Calendar Widget */}
      <div
        className="rounded-2xl overflow-hidden shadow-2xl select-none"
        style={{ background: "rgba(30,30,40,0.72)", backdropFilter: "blur(28px)", border: "1px solid rgba(255,255,255,0.10)" }}
      >
        {/* Month header */}
        <div
          className="flex items-center justify-between px-4 py-2"
          style={{ background: "rgba(220,40,40,0.85)" }}
        >
          <span className="text-white font-semibold text-[13px] tracking-wide">
            {monthNames[month].toUpperCase()}
          </span>
          <span className="text-white/80 text-[12px] font-medium">{year}</span>
        </div>
        {/* Day headers */}
        <div className="grid grid-cols-7 px-2 pt-2 pb-1">
          {dayNames.map((d, i) => (
            <div key={d} className={`text-center text-[10px] font-medium pb-1 ${i === 0 || i === 6 ? "text-white/40" : "text-white/50"}`}>{d}</div>
          ))}
        </div>
        {/* Date grid */}
        <div className="grid grid-cols-7 px-2 pb-3 gap-y-0.5">
          {cells.map((d, i) => {
            const isToday = d === date;
            const colIdx = i % 7;
            const isWeekend = colIdx === 0 || colIdx === 6;
            return (
              <div
                key={i}
                className={`h-6 flex items-center justify-center rounded-full text-[11px] font-medium transition-all
                  ${isToday ? "bg-white text-[#1a1a1a] font-bold" : isWeekend ? "text-white/35" : "text-white/75"}
                `}
              >
                {d || ""}
              </div>
            );
          })}
        </div>
      </div>

      {/* World Clock Widget */}
      <div
        className="rounded-2xl overflow-hidden shadow-2xl select-none px-4 py-3"
        style={{ background: "rgba(30,30,40,0.72)", backdropFilter: "blur(28px)", border: "1px solid rgba(255,255,255,0.10)" }}
      >
        <p className="text-white/50 text-[10px] font-semibold uppercase tracking-widest mb-3">World Clock</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          {CITIES.map((city) => {
            const time = getTimeInZone(city.tz);
            const label = getDayLabel(city.tz);
            return (
              <div key={city.name} className="flex flex-col">
                <span className="text-white/50 text-[10px] font-medium truncate">{city.name}</span>
                <span className="text-white font-semibold text-[15px] leading-tight tabular-nums">{time}</span>
                <span className="text-white/35 text-[9px]">{label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
