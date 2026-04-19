"use client";

import { AnimatePresence, LazyMotion, domMax } from "framer-motion";
import { DesktopProvider } from "@/context/DesktopContext";
import dynamic from "next/dynamic";
import MenuBar from "@/components/MenuBar";
import Dock from "@/components/Dock";
import WallpaperBackground from "@/components/WallpaperBackground";
import DesktopWidgets from "@/components/DesktopWidgets";
import MobileLayout from "@/components/MobileLayout";
import { useState, useEffect } from "react";
import { track } from "@vercel/analytics/react";
import { useDesktop } from "@/context/DesktopContext";

const AboutWindow       = dynamic(() => import("@/components/AboutWindow"));
const SkillsWindow      = dynamic(() => import("@/components/SkillsWindow"));
const ProjectsWindow    = dynamic(() => import("@/components/ProjectsWindow"));
const ExperienceWindow  = dynamic(() => import("@/components/ExperienceWindow"));
const ContactWindow     = dynamic(() => import("@/components/ContactWindow"));
const CertsWindow       = dynamic(() => import("@/components/CertsWindow"));
const PhotosWindow      = dynamic(() => import("@/components/PhotosWindow"));
const SafariWindow      = dynamic(() => import("@/components/SafariWindow"));
const EducationWindow   = dynamic(() => import("@/components/EducationWindow"));
const TrashWindow       = dynamic(() => import("@/components/TrashWindow"));
const SpotifyWindow     = dynamic(() => import("@/components/SpotifyWindow"));
const FinderAppsWindow  = dynamic(() => import("@/components/FinderAppsWindow"));

/** Inner desktop — needs DesktopContext to be available */
function DesktopInner({ onResumeDownload }: { onResumeDownload: () => void }) {
  const { openWindow } = useDesktop();

  // Open the Finder Applications window by default on first load
  useEffect(() => {
    openWindow("finder");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <WallpaperBackground />
      <MenuBar />
      <DesktopWidgets />

      <AnimatePresence>
        <FinderAppsWindow />
        <AboutWindow />
        <SkillsWindow />
        <ProjectsWindow />
        <ExperienceWindow />
        <CertsWindow />
        <ContactWindow />
        <PhotosWindow />
        <SafariWindow />
        <EducationWindow />
        <TrashWindow />
        <SpotifyWindow />
      </AnimatePresence>

      <Dock onResumeDownload={onResumeDownload} />
    </>
  );
}

export default function Home() {
  const [view, setView] = useState<"mobile" | "tablet" | "desktop">("desktop");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) setView("mobile");
      else if (width < 1024) setView("tablet");
      else setView("desktop");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleResumeDownload = () => {
    track("resume_download", { source: "dock" });
    const link = document.createElement("a");
    link.href = "/kunal-mangla-resume.pdf";
    link.download = "Kunal_Mangla_Resume.pdf";
    link.click();
  };

  if (view === "mobile") {
    return <MobileLayout />;
  }

  return (
    <DesktopProvider>
      <LazyMotion features={domMax}>
        <DesktopInner onResumeDownload={handleResumeDownload} />
      </LazyMotion>
    </DesktopProvider>
  );
}
