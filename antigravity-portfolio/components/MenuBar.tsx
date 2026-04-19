"use client";

import { useState, useEffect } from "react";
import { Wifi, Battery } from "lucide-react";
import { useDesktop } from "@/context/DesktopContext";

export default function MenuBar() {
  const { openWindow } = useDesktop();
  const [timeStr, setTimeStr] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format: "Fri 17 Apr  10:42 AM"
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      
      const dayName = days[now.getDay()];
      const dayNum = now.getDate();
      const monthName = months[now.getMonth()];
      
      let hours = now.getHours();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      
      const mins = now.getMinutes().toString().padStart(2, '0');
      
      setTimeStr(`${dayName} ${dayNum} ${monthName}  ${hours}:${mins} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[28px] z-50 bg-black/55 backdrop-blur-[20px] border-b border-white/10 flex justify-between items-center px-4 font-mono text-[12px] text-white/85 select-none">
      <div className="flex items-center gap-4">
        <svg 
          viewBox="0 0 24 24" 
          className="w-[14px] h-[14px] fill-white hover:opacity-70 cursor-pointer transition-opacity"
          onClick={() => openWindow('about')}
        >
          <path d="M17.057 20.28c-.96.56-1.856.88-2.63.88-1.25 0-1.633-.78-3.033-.78-1.39 0-1.83.78-3.01.78-.79 0-1.67-.32-2.63-.88-4.82-2.78-4.72-9.62-1.25-11.7.9-.52 1.9-.81 3.02-.81 1.44 0 2.19.83 3.44.83 1.25 0 2-.83 3.44-.83 1.12 0 2.12.31 3.02.81 2.33 1.34 2.87 4.26 1.63 6.42-.33.56-.73 1.15-1.15 1.76l-.88 1.53zm-2.17-15.68c-.62.77-1.47 1.27-2.32 1.27-.14 0-.29-.02-.42-.05.17-1.63 1.25-2.85 2.5-2.85.14 0 .28.02.41.04-.15 1.59-1.55 2.36-2.17 1.59z" />
        </svg>
        <span className="font-syne font-extrabold text-accent text-sm tracking-wide">
          KUNAL MANGLA
        </span>
        <div className="flex items-center gap-4">
          <button onClick={() => openWindow('about')} className="hover:text-white transition-colors">About</button>
          <button onClick={() => openWindow('skills')} className="hover:text-white transition-colors">Skills</button>
          <button onClick={() => openWindow('projects')} className="hover:text-white transition-colors">Projects</button>
          <button onClick={() => openWindow('experience')} className="hover:text-white transition-colors">Experience</button>
          <button onClick={() => openWindow('contact')} className="hover:text-white transition-colors">Contact</button>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <Wifi size={14} />
        <Battery size={14} className="rotate-90" />
        <span>{timeStr}</span>
      </div>
    </div>
  );
}
