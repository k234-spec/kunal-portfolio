"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface DesktopContextType {
  openWindows: string[];
  activeWindow: string | null;
  minimizedWindows: string[];
  openWindow: (id: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  // Trash
  trashedDockItems: string[];
  trashDockItem: (id: string) => void;
  restoreDockItem: (id: string) => void;
  emptyTrash: () => void;
}

const DesktopContext = createContext<DesktopContextType | undefined>(undefined);

export function DesktopProvider({ children }: { children: ReactNode }) {
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [minimizedWindows, setMinimizedWindows] = useState<string[]>([]);
  const [trashedDockItems, setTrashedDockItems] = useState<string[]>([]);

  const openWindow = (id: string) => {
    if (!openWindows.includes(id)) setOpenWindows([...openWindows, id]);
    if (minimizedWindows.includes(id)) setMinimizedWindows(minimizedWindows.filter(w => w !== id));
    setActiveWindow(id);
  };

  const closeWindow = (id: string) => {
    setOpenWindows(openWindows.filter(w => w !== id));
    setMinimizedWindows(minimizedWindows.filter(w => w !== id));
    if (activeWindow === id) {
      const remaining = openWindows.filter(w => w !== id && !minimizedWindows.includes(w));
      setActiveWindow(remaining.length > 0 ? remaining[remaining.length - 1] : null);
    }
  };

  const minimizeWindow = (id: string) => {
    if (!minimizedWindows.includes(id)) setMinimizedWindows([...minimizedWindows, id]);
    if (activeWindow === id) {
      const remaining = openWindows.filter(w => w !== id && !minimizedWindows.includes(w));
      setActiveWindow(remaining.length > 0 ? remaining[remaining.length - 1] : null);
    }
  };

  const focusWindow = (id: string) => {
    if (minimizedWindows.includes(id)) setMinimizedWindows(minimizedWindows.filter(w => w !== id));
    setActiveWindow(id);
  };

  const trashDockItem = (id: string) => {
    if (!trashedDockItems.includes(id)) {
      setTrashedDockItems(prev => [...prev, id]);
    }
    // Also close its window if open
    closeWindow(id);
  };

  const restoreDockItem = (id: string) => {
    setTrashedDockItems(prev => prev.filter(i => i !== id));
  };

  const emptyTrash = () => {
    setTrashedDockItems([]);
  };

  return (
    <DesktopContext.Provider value={{
      openWindows, activeWindow, minimizedWindows,
      openWindow, closeWindow, minimizeWindow, focusWindow,
      trashedDockItems, trashDockItem, restoreDockItem, emptyTrash,
    }}>
      {children}
    </DesktopContext.Provider>
  );
}

export function useDesktop() {
  const context = useContext(DesktopContext);
  if (context === undefined) throw new Error("useDesktop must be used within a DesktopProvider");
  return context;
}
