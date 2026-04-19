"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { useDesktop } from "@/context/DesktopContext";
import { DEFAULT_DOCK_ITEMS } from "@/data/dockItems";
import Image from "next/image";

interface DockProps {
  onResumeDownload: () => void;
}

/** Renders the icon for a dock item */
function DockIcon({ item }: { item: typeof DEFAULT_DOCK_ITEMS[0] }) {
  if (item.type === "image") {
    return (
      <div className="w-10 h-10 relative pointer-events-none">
        <Image src={item.src!} alt={item.alt!} fill className="object-contain" />
      </div>
    );
  }
  return <span className="text-2xl pointer-events-none">{item.emoji}</span>;
}

export default function Dock({ onResumeDownload }: DockProps) {
  const {
    openWindows, activeWindow, minimizedWindows,
    openWindow, minimizeWindow, trashedDockItems, trashDockItem,
    openWindow: openTrash,
  } = useDesktop();

  const [draggingId, setDraggingId]       = useState<string | null>(null);
  const [overTrash, setOverTrash]         = useState(false);

  // Filter out trashed items
  const visibleItems = DEFAULT_DOCK_ITEMS.filter(
    (item) => !trashedDockItems.includes(item.id)
  );

  const hasTrash = trashedDockItems.length > 0;

  // ── Dock click: toggle minimize if already active, else open/restore ─────────
  const handleDockClick = (itemId: string) => {
    const isOpen      = openWindows.includes(itemId);
    const isMinimized = minimizedWindows.includes(itemId);
    const isActive    = activeWindow === itemId;

    if (isOpen && isActive && !isMinimized) {
      // Already focused → minimize
      minimizeWindow(itemId);
    } else {
      // Closed, minimized, or just not active → open/restore & focus
      openWindow(itemId);
    }
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggingId(id);
    e.dataTransfer.setData("dockItemId", id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = () => {
    setDraggingId(null);
    setOverTrash(false);
  };

  const handleTrashDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setOverTrash(true);
  };

  const handleTrashDragLeave = () => setOverTrash(false);

  const handleTrashDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("dockItemId");
    if (id) trashDockItem(id);
    setOverTrash(false);
    setDraggingId(null);
  };

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 max-w-[calc(100vw-2rem)]">
      <div
        className="overflow-x-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
      >
        <div 
          className="px-4 py-3 rounded-[24px] flex items-end gap-3 shadow-[0_20px_50px_rgba(0,0,0,0.3)] w-max relative"
          style={{ 
            background: "rgba(220, 220, 225, 0.25)", 
            backdropFilter: "blur(45px) saturate(200%)", 
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.1), 0 8px 32px 0 rgba(0, 0, 0, 0.3)"
          }}
        >
          {/* Inner glass highlight */}
          <div className="absolute inset-0 rounded-[24px] pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)" }} />

          {/* ── Dock items ── */}
          {visibleItems.map((item) => {
            const isOpen      = openWindows.includes(item.id);
            const isActive    = activeWindow === item.id;
            const isMinimized = minimizedWindows.includes(item.id);
            const isDragging  = draggingId === item.id;

            return (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, item.id)}
                onDragEnd={handleDragEnd}
                className={`relative group flex flex-col items-center shrink-0 min-w-[70px] ${
                  isDragging ? "opacity-30" : "opacity-100"
                }`}
              >
                <m.button
                  onClick={() => handleDockClick(item.id)}
                  whileHover={{ scale: 1.15, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-[13px] flex items-center justify-center shadow-lg bg-transparent cursor-grab active:cursor-grabbing"
                >
                  <DockIcon item={item} />
                </m.button>

                {/* Persistent Label */}
                <span className="text-[10px] text-white/70 font-bold mt-1.5 select-none text-center w-full leading-tight group-hover:text-white transition-colors duration-200">
                  {item.label}
                </span>

                {/* Active dot */}
                <div className={`h-1 w-1 rounded-full mt-1.5 ${
                  isOpen
                    ? isActive && !isMinimized ? "bg-white" : "bg-white/50"
                    : "opacity-0"
                }`} />
              </div>
            );
          })}

          {/* Separator */}
          <div className="w-[1px] h-8 bg-white/20 mx-1 self-center shrink-0" />

          {/* Resume */}
          <div className="relative group flex flex-col items-center shrink-0 min-w-[70px]">
            <m.button
              onClick={onResumeDownload}
              whileHover={{ scale: 1.15, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-[13px] bg-transparent flex items-center justify-center shadow-lg"
            >
              <span className="text-2xl">📄</span>
            </m.button>
            <span className="text-[10px] text-white/70 font-bold mt-1.5 select-none group-hover:text-white transition-colors duration-200">Resume</span>
            <div className="h-1 w-1 rounded-full mt-1.5 opacity-0" />
          </div>

          {/* Trash separator */}
          <div className="w-[1px] h-8 bg-white/20 mx-1 self-center shrink-0" />

          {/* ── Trash drop target ── */}
          <div
            onDragOver={handleTrashDragOver}
            onDragLeave={handleTrashDragLeave}
            onDrop={handleTrashDrop}
            className="relative group flex flex-col items-center shrink-0 min-w-[70px]"
          >
            {/* Drop zone glow ring */}
            <m.button
              onClick={() => openTrash("trash")}
              whileHover={{ scale: 1.15, y: -4 }}
              whileTap={{ scale: 0.95 }}
              animate={overTrash ? { scale: 1.3, y: -8 } : {}}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className={`w-12 h-12 rounded-[13px] flex items-center justify-center shadow-lg bg-transparent relative
                ${overTrash ? "ring-2 ring-red-400/60 ring-offset-2 ring-offset-transparent" : ""}
              `}
            >
              <div className="w-10 h-10 relative pointer-events-none">
                <Image
                  src={hasTrash ? "/trash-full.png" : "/trash-empty.png"}
                  alt="Trash"
                  fill
                  className="object-contain transition-all duration-200"
                />
              </div>
              {overTrash && (
                <div className="absolute inset-0 rounded-[13px] bg-red-500/20 animate-pulse" />
              )}
            </m.button>
            <span className="text-[10px] text-white/70 font-bold mt-1.5 select-none group-hover:text-white transition-colors duration-200">
              {overTrash ? "Delete" : "Trash"}
            </span>
            <div className="h-1 w-1 rounded-full mt-1.5 opacity-0" />
          </div>

        </div>
      </div>

      {/* Drag hint — shows when actively dragging */}
      {draggingId && (
        <m.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] text-white/40"
        >
          Drag to Trash to remove →
        </m.div>
      )}
    </div>
  );
}
