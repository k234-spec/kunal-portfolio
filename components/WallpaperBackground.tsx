"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const wallpapers = [
  "/desktop-1.jpg",
  "/desktop-2.jpg",
  "/desktop-3.jpg",
  "/desktop-6.jpg",
  "/desktop-8.jpg",
  "/desktop-11.jpg",
  "/desktop-15.jpg",
  "/desktop-16.jpg"
];

export default function WallpaperBackground() {
  const [currentWallpaperIndex, setCurrentWallpaperIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWallpaperIndex((prev) => (prev + 1) % wallpapers.length);
    }, 60000); // Change wallpaper every 60 seconds to reduce lag
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="absolute inset-0 bg-[#0a0a0a] z-0" />
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <Image
          src={wallpapers[currentWallpaperIndex]}
          alt="Desktop Wallpaper"
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-90 transition-opacity duration-1000"
        />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0a0a0a]/60 to-[#0a0a0a] z-0 pointer-events-none" />
    </>
  );
}
