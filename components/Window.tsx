"use client";

import { m } from "framer-motion";
import React from "react";
import { useDesktop } from "@/context/DesktopContext";

interface WindowProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
  onClose: () => void;
  onMinimize: () => void;
  zIndex: number;
  onFocus: () => void;
}

export default function Window({
  id,
  title,
  icon,
  children,
  defaultPosition,
  defaultSize,
  onClose,
  onMinimize,
  zIndex,
  onFocus,
}: WindowProps) {
  const { minimizedWindows } = useDesktop();
  const isMinimized = minimizedWindows.includes(id);

  const exitAnimation = isMinimized 
    ? { opacity: 0, scale: 0.1, y: 400 } 
    : { opacity: 0, scale: 0.88, y: 10 };

  return (
    <m.div
      id={`window-${id}`}
      drag
      dragMomentum={false}
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={exitAnimation}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      onPointerDown={onFocus}
      style={{
        zIndex,
        width: defaultSize?.width || "auto",
        height: defaultSize?.height || "auto",
        top: defaultPosition?.y || 50,
        left: defaultPosition?.x || 50,
      }}
      className="absolute bg-[#111111] border border-[#2a2a2a] rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden min-w-[320px] md:min-w-[480px] max-w-[95vw]"
    >
      {/* Title Bar */}
      <div 
        onPointerDown={() => {
          onFocus();
        }}
        className="h-[40px] bg-[#181818] px-4 flex items-center justify-between border-b border-[#2a2a2a] cursor-move select-none shrink-0"
      >
        {/* Left: Traffic Lights */}
        <div data-traffic-lights className="flex items-center gap-2 z-10">
          {/* Red: Close */}
          <button 
            onPointerDown={(e) => { e.stopPropagation(); }}
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="w-3.5 h-3.5 rounded-full bg-[#ff5f57] border border-black/10 focus:outline-none hover:brightness-90 cursor-pointer"
          />
          {/* Yellow: Minimize */}
          <button 
            onPointerDown={(e) => { e.stopPropagation(); }}
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] border border-black/10 focus:outline-none hover:brightness-90 cursor-pointer"
          />
          {/* Green: Maximize (visual only) */}
          <button 
            onPointerDown={(e) => { e.stopPropagation(); }}
            className="w-3.5 h-3.5 rounded-full bg-[#28ca41] border border-black/10 focus:outline-none cursor-not-allowed opacity-50"
          />
        </div>
        
        {/* Center: Title */}
        <div className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2 font-mono text-[12px] text-[#888888] pointer-events-none">
          <span>{icon}</span>
          <span>{title}</span>
        </div>

        {/* Right: Empty space to balance title bar */}
        <div className="w-[50px]"></div>
      </div>

      {/* Body */}
      <div 
        className="flex-1 p-8 overflow-y-auto w-full relative"
      >
        {children}
      </div>
    </m.div>
  );
}
