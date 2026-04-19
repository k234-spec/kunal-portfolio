"use client";

import { useState, useEffect } from "react";
import { useDesktop } from "@/context/DesktopContext";
import ControlCenter from "./ControlCenter";

const MENU_ITEMS: Record<string, string[]> = {
  Finder: ["About This Portfolio", "---", "Preferences...", "---", "Services", "---", "Hide Finder", "Quit Finder"],
  File: ["New Finder Window", "New Folder", "---", "Close Window", "Get Info", "---", "Duplicate", "---", "Move to Trash"],
  Edit: ["Undo", "Redo", "---", "Cut", "Copy", "Paste", "Select All", "---", "Find"],
  View: ["as Icons", "as List", "as Columns", "as Gallery", "---", "Sort By", "Clean Up", "---", "Show Path Bar", "Show Status Bar"],
  Go: ["Back", "Forward", "---", "Home", "Desktop", "Applications", "Utilities", "---", "Connect to Server..."],
  Window: ["Minimize", "Zoom", "---", "Bring All to Front", "---", "Applications"],
  Help: ["Kunal Mangla Portfolio Help", "---", "Report a Bug"],
};

export default function MenuBar() {
  const { openWindow } = useDesktop();
  const [timeStr, setTimeStr] = useState<string>("");
  const [dateStr, setDateStr] = useState<string>("");
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const dayName = days[now.getDay()];
      const dayNum = now.getDate();
      const monthName = months[now.getMonth()];
      let hours = now.getHours();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      const mins = now.getMinutes().toString().padStart(2, "0");
      setTimeStr(`${hours}:${mins} ${ampm}`);
      setDateStr(`${dayName} ${dayNum} ${monthName}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    if (!openMenu) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-menubar]")) setOpenMenu(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [openMenu]);

  return (
    <div
      data-menubar
      className="fixed top-0 left-0 w-full h-[28px] z-50 flex justify-between items-center px-3 select-none"
      style={{
        background: "rgba(0,0,0,0.52)",
        backdropFilter: "blur(24px) saturate(180%)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {/* ── LEFT: Apple + App menus ───────────────── */}
      <div className="flex items-center h-full">
        {/* Apple logo */}
        <button
          onClick={() => openWindow("about")}
          className="px-2 h-full flex items-center hover:bg-white/10 transition-colors rounded"
          title="About This Portfolio"
        >
          <svg viewBox="0 0 24 24" className="w-[14px] h-[14px] fill-white">
            <path d="M17.057 20.28c-.96.56-1.856.88-2.63.88-1.25 0-1.633-.78-3.033-.78-1.39 0-1.83.78-3.01.78-.79 0-1.67-.32-2.63-.88-4.82-2.78-4.72-9.62-1.25-11.7.9-.52 1.9-.81 3.02-.81 1.44 0 2.19.83 3.44.83 1.25 0 2-.83 3.44-.83 1.12 0 2.12.31 3.02.81 2.33 1.34 2.87 4.26 1.63 6.42-.33.56-.73 1.15-1.15 1.76l-.88 1.53zm-2.17-15.68c-.62.77-1.47 1.27-2.32 1.27-.14 0-.29-.02-.42-.05.17-1.63 1.25-2.85 2.5-2.85.14 0 .28.02.41.04-.15 1.59-1.55 2.36-2.17 1.59z" />
          </svg>
        </button>

        {/* App name — bold */}
        <button
          onClick={() => setOpenMenu(openMenu === "Finder" ? null : "Finder")}
          className={`px-2.5 h-full flex items-center font-semibold text-white text-[13px] transition-colors rounded ${openMenu === "Finder" ? "bg-white/15" : "hover:bg-white/10"}`}
        >
          Finder
        </button>

        {/* App menus */}
        {Object.keys(MENU_ITEMS).filter(k => k !== "Finder").map((menu) => (
          <div key={menu} className="relative h-full">
            <button
              onClick={() => setOpenMenu(openMenu === menu ? null : menu)}
              className={`px-2.5 h-full flex items-center text-white/85 hover:text-white text-[13px] transition-colors rounded ${openMenu === menu ? "bg-white/15 text-white" : "hover:bg-white/10"}`}
            >
              {menu}
            </button>
            {openMenu === menu && (
              <div
                className="absolute top-[28px] left-0 w-52 rounded-lg py-1 z-[300] shadow-2xl"
                style={{ background: "rgba(32,32,40,0.96)", backdropFilter: "blur(30px)", border: "1px solid rgba(255,255,255,0.10)" }}
              >
                {MENU_ITEMS[menu].map((item, i) =>
                  item === "---" ? (
                    <div key={i} className="my-1 mx-2 h-[1px] bg-white/10" />
                  ) : (
                    <button
                      key={item}
                      className="w-full text-left px-4 py-1.5 text-[13px] text-white/85 hover:bg-white/10 hover:text-white transition-colors"
                      onClick={() => setOpenMenu(null)}
                    >
                      {item}
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── RIGHT: Status icons ───────────────────── */}
      <div className="flex items-center gap-1 h-full">
        {/* Wi-Fi */}
        <button className="px-1.5 h-full flex items-center text-white/70 hover:text-white hover:bg-white/10 transition-colors rounded text-[11px]">
          <svg viewBox="0 0 20 14" className="w-[16px] h-[12px] fill-current">
            <path d="M10 11.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm0-4a5.5 5.5 0 0 1 4.243 2L16 7.758A8 8 0 0 0 2 7.758L3.757 9.5A5.5 5.5 0 0 1 10 7.5zm0-4a9.5 9.5 0 0 1 7.314 3.437L19 5.086A12 12 0 0 0 1 5.086L2.686 6.937A9.5 9.5 0 0 1 10 3.5z" />
          </svg>
        </button>

        {/* Battery */}
        <button className="px-1.5 h-full flex items-center text-white/70 hover:text-white hover:bg-white/10 transition-colors rounded">
          <div className="flex items-center gap-0.5">
            <div className="w-[20px] h-[10px] border border-white/50 rounded-[2px] relative flex items-center px-0.5">
              <div className="h-[6px] w-[13px] bg-[#28ca41] rounded-[1px]" />
            </div>
            <div className="w-[2px] h-[5px] bg-white/40 rounded-r-[1px]" />
          </div>
        </button>

        {/* Control Center */}
        <div className="h-full flex items-center">
          <ControlCenter />
        </div>

        {/* Date + Time */}
        <div className="px-2 h-full flex items-center gap-2 text-white/85 text-[12px] font-medium font-mono">
          <span>{dateStr}</span>
          <span>{timeStr}</span>
        </div>
      </div>
    </div>
  );
}
