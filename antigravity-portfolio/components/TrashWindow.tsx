"use client";

import Image from "next/image";
import { m, AnimatePresence } from "framer-motion";
import Window from "./Window";
import { useDesktop } from "@/context/DesktopContext";
import { DEFAULT_DOCK_ITEMS } from "@/data/dockItems";
import { Trash2, MousePointerClick } from "lucide-react";

function ItemIcon({ item }: { item: typeof DEFAULT_DOCK_ITEMS[0] }) {
  if (item.type === "image") {
    return (
      <div className="w-12 h-12 relative">
        <Image src={item.src!} alt={item.alt!} fill className="object-contain grayscale opacity-50" />
      </div>
    );
  }
  return <span className="text-3xl grayscale opacity-50">{item.emoji}</span>;
}

export default function TrashWindow() {
  const {
    closeWindow, minimizeWindow, focusWindow,
    activeWindow, openWindows,
    trashedDockItems, restoreDockItem, emptyTrash,
  } = useDesktop();

  const id = "trash";
  if (!openWindows.includes(id)) return null;

  const trashedItems = DEFAULT_DOCK_ITEMS.filter((item) =>
    trashedDockItems.includes(item.id)
  );

  return (
    <Window
      id={id}
      title="Trash"
      icon={
        <div className="w-4 h-4 relative">
          <Image
            src={trashedItems.length > 0 ? "/trash-full.png" : "/trash-empty.png"}
            alt="Trash"
            fill
            className="object-contain"
          />
        </div>
      }
      defaultPosition={{ x: 200, y: 120 }}
      defaultSize={{ width: 560, height: 420 }}
      onClose={() => closeWindow(id)}
      onMinimize={() => minimizeWindow(id)}
      onFocus={() => focusWindow(id)}
      zIndex={activeWindow === id ? 50 : 1}
    >
      <div className="flex flex-col h-full -mt-2">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="font-mono text-[10px] text-[#444] uppercase tracking-widest mb-1">
              {"// click any item to restore"}
            </p>
            <h2 className="font-syne font-bold text-[18px] text-white">Trash</h2>
          </div>
          {trashedItems.length > 0 && (
            <m.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={emptyTrash}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-[12px] font-mono transition-all"
            >
              <Trash2 size={13} />
              Empty Trash
            </m.button>
          )}
        </div>

        {/* Content */}
        {trashedItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
            <div className="w-20 h-20 relative opacity-25">
              <Image src="/trash-empty.png" alt="Trash empty" fill className="object-contain" />
            </div>
            <p className="font-mono text-[12px] text-[#444]">Trash is Empty</p>
            <p className="font-sans text-[13px] text-[#333] max-w-[240px] leading-relaxed">
              Drag dock icons onto the Trash to remove them. Click any item here to restore it instantly.
            </p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto">
            {/* Hint */}
            <div className="flex items-center gap-2 mb-4 px-1">
              <MousePointerClick size={12} className="text-white/20 shrink-0" />
              <p className="font-mono text-[10px] text-[#444]">
                Click any item to put it back in the dock
              </p>
            </div>

            <m.div layout className="grid grid-cols-2 gap-3">
              <AnimatePresence mode="popLayout">
                {trashedItems.map((item) => (
                  <m.button
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.85, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -8, transition: { duration: 0.18 } }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ scale: 1.03, borderColor: "rgba(255,255,255,0.15)" }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => restoreDockItem(item.id)}
                    className="flex items-center gap-4 bg-[#111] border border-[#2a2a2a] rounded-xl p-4 text-left group cursor-pointer transition-colors hover:bg-[#181818] w-full"
                  >
                    {/* Icon */}
                    <div className="shrink-0 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
                      <ItemIcon item={item} />
                    </div>

                    {/* Label */}
                    <div className="flex-1 min-w-0">
                      <p className="font-syne font-semibold text-[14px] text-[#777] group-hover:text-white transition-colors truncate">
                        {item.label}
                      </p>
                      <p className="font-mono text-[10px] text-[#444] group-hover:text-[#1DB954] transition-colors mt-0.5">
                        Click to restore →
                      </p>
                    </div>

                    {/* Arrow hint */}
                    <div className="shrink-0 w-7 h-7 rounded-full bg-white/0 group-hover:bg-white/10 flex items-center justify-center transition-all">
                      <span className="text-white/0 group-hover:text-white/60 text-[14px] transition-all">↩</span>
                    </div>
                  </m.button>
                ))}
              </AnimatePresence>
            </m.div>
          </div>
        )}
      </div>
    </Window>
  );
}
