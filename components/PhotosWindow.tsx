"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { m, AnimatePresence } from "framer-motion";
import Window from "./Window";
import { useDesktop } from "@/context/DesktopContext";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const photos = [
  { src: "/attachments/IMG-20260418-WA0018.jpg", alt: "Memory 1" },
  { src: "/attachments/IMG-20260418-WA0019.jpg", alt: "Memory 2" },
  { src: "/attachments/IMG-20260418-WA0020.jpg", alt: "Memory 3" },
  { src: "/attachments/IMG-20260418-WA0021.jpg", alt: "Memory 4" },
  { src: "/attachments/IMG-20260418-WA0022.jpg", alt: "Memory 5" },
  { src: "/attachments/IMG-20260418-WA0023.jpg", alt: "Memory 6" },
  { src: "/attachments/IMG-20260418-WA0024.jpg", alt: "Memory 7" },
  { src: "/attachments/IMG-20260418-WA0025.jpg", alt: "Memory 8" },
  { src: "/attachments/IMG-20260418-WA0026.jpg", alt: "Memory 9" },
  { src: "/attachments/IMG-20260418-WA0027.jpg", alt: "Memory 10" },
  { src: "/attachments/IMG-20260418-WA0028.jpg", alt: "Memory 11" },
  { src: "/attachments/IMG-20260418-WA0030.jpg", alt: "Memory 12" },
  { src: "/attachments/IMG-20260418-WA0031.jpg", alt: "Memory 13" },
  { src: "/attachments/IMG-20260418-WA0032.jpg", alt: "Memory 14" },
  { src: "/attachments/IMG-20260418-WA0033.jpg", alt: "Memory 15" },
  { src: "/attachments/IMG-20260418-WA0034.jpg", alt: "Memory 16" },
];

export default function PhotosWindow() {
  const { closeWindow, minimizeWindow, focusWindow, activeWindow, openWindows } = useDesktop();
  const id = "photos";
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!openWindows.includes(id)) return null;

  const nextPhoto = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % photos.length);
    }
  };

  const prevPhoto = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + photos.length) % photos.length);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "ArrowLeft") prevPhoto();
      if (e.key === "Escape") setLightboxIndex(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex]);

  return (
    <Window
      id={id}
      title="Photo Gallery"
      icon={
        <div className="w-4 h-4 relative">
          <Image src="/photos.png" alt="Photos" fill className="object-contain" />
        </div>
      }
      defaultPosition={{ x: 120, y: 80 }}
      defaultSize={{ width: 800, height: 500 }}
      onClose={() => closeWindow(id)}
      onMinimize={() => minimizeWindow(id)}
      onFocus={() => focusWindow(id)}
      zIndex={activeWindow === id ? 50 : 1}
    >
      <div className="h-full flex flex-col -m-8">
        <div className="flex-1 overflow-y-auto p-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo, index) => (
              <m.div
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setLightboxIndex(index)}
                className="relative aspect-square rounded-xl overflow-hidden cursor-pointer bg-[#111] border border-white/5"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </m.div>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {lightboxIndex !== null && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
              onClick={() => setLightboxIndex(null)}
            >
              <button
                className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
                onClick={() => setLightboxIndex(null)}
              >
                <X size={32} />
              </button>

              <button
                className="absolute left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors bg-white/5 p-4 rounded-full backdrop-blur-md"
                onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
              >
                <ChevronLeft size={32} />
              </button>

              <button
                className="absolute right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors bg-white/5 p-4 rounded-full backdrop-blur-md"
                onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
              >
                <ChevronRight size={32} />
              </button>

              <div className="relative w-full h-full max-w-5xl max-h-[80vh]" onClick={(e) => e.stopPropagation()}>
                <Image
                  src={photos[lightboxIndex].src}
                  alt={photos[lightboxIndex].alt}
                  fill
                  className="object-contain"
                  priority
                />
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-white/50 font-mono text-sm">
                  {lightboxIndex + 1} / {photos.length} — {photos[lightboxIndex].alt}
                </div>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </Window>
  );
}
