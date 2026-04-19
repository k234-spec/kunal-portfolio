"use client";

import Link from "next/link";
import Window from "@/components/Window";
import { DesktopProvider } from "@/context/DesktopContext";

export default function NotFound() {
  return (
    <DesktopProvider>
      <div className="w-screen h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(232,255,71,0.04)_0%,transparent_60%)]" />
        <Window
          id="404"
          title="404.app"
          icon="⚠️"
          onClose={() => {}}
          onMinimize={() => {}}
          onFocus={() => {}}
          zIndex={500}
        >
          <div className="flex flex-col items-center justify-center p-8 text-center h-[200px]">
            <h2 className="font-syne font-extrabold text-[24px] text-[#ff5f57] mb-4">
              Error 404
            </h2>
            <p className="font-sans text-muted mb-8">
              File not found on this desktop.
            </p>
            <Link 
              href="/"
              className="bg-accent text-bg font-syne font-bold text-sm px-6 py-3 rounded-lg hover:shadow-lg transition-transform hover:-translate-y-1"
            >
              Return to Desktop
            </Link>
          </div>
        </Window>
      </div>
    </DesktopProvider>
  );
}
