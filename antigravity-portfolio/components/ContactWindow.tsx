"use client";

import Window from "./Window";
import { useDesktop } from "@/context/DesktopContext";
import Image from "next/image";
import { Code, Briefcase, MessageCircle, Users } from "lucide-react";

export default function ContactWindow() {
  const { closeWindow, minimizeWindow, focusWindow, activeWindow, openWindows } = useDesktop();
  const id = "contact";

  if (!openWindows.includes(id)) return null;

  return (
    <Window
      id={id}
      title="Contact Me"
      icon="✉️"
      defaultPosition={{ x: 350, y: 100 }}
      defaultSize={{ width: 600, height: 420 }}
      onClose={() => closeWindow(id)}
      onMinimize={() => minimizeWindow(id)}
      onFocus={() => focusWindow(id)}
      zIndex={activeWindow === id ? 50 : 1}
    >
      <div className="flex flex-col h-full w-full bg-[#181818] p-8 text-white rounded-b-xl overflow-y-auto">
        <div className="w-[80px] h-[80px] rounded-full overflow-hidden bg-[#2a2a2a] mb-8 relative border-2 border-white/10 shadow-xl">
          <Image src="/profile-new.jpg" alt="Kunal Mangla" fill className="object-cover" />
        </div>

        <h1 className="font-syne font-bold text-[28px] mb-2">Let&apos;s Connect</h1>
        <p className="font-sans text-[16px] text-gray-400 mb-8 max-w-md">
          Got an idea? A bug to squash? or just wanna talk tech? I&apos;m always down for a good conversation.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a 
            href="https://github.com/k234-spec" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-4 flex flex-col justify-between h-[110px] hover:bg-[#252525] hover:border-white/20 transition-all group"
          >
            <Code size={24} className="text-white/50 group-hover:text-white transition-colors" />
            <span className="font-sans font-semibold text-[14px]">Github</span>
          </a>

          <a 
            href="https://kunal-mangla-portfolio.vercel.app" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#6b52ff]/10 border border-[#6b52ff]/20 rounded-2xl p-4 flex flex-col justify-between h-[110px] hover:bg-[#6b52ff]/20 hover:border-[#6b52ff]/40 transition-all group"
          >
            <Briefcase size={24} className="text-[#6b52ff] group-hover:text-white transition-colors" />
            <span className="font-sans font-semibold text-[14px]">Portfolio</span>
          </a>

          <a 
            href="https://wa.me/917827169606" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25d366]/10 border border-[#25d366]/20 rounded-2xl p-4 flex flex-col justify-between h-[110px] hover:bg-[#25d366]/20 hover:border-[#25d366]/40 transition-all group"
          >
            <MessageCircle size={24} className="text-[#25d366] group-hover:text-white transition-colors" />
            <span className="font-sans font-semibold text-[14px]">Whatsapp</span>
          </a>

          <a 
            href="https://www.linkedin.com/in/kunal-mangla-/" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#0077b5]/10 border border-[#0077b5]/20 rounded-2xl p-4 flex flex-col justify-between h-[110px] hover:bg-[#0077b5]/20 hover:border-[#0077b5]/40 transition-all group"
          >
            <Users size={24} className="text-[#0077b5] group-hover:text-white transition-colors" />
            <span className="font-sans font-semibold text-[14px]">LinkedIn</span>
          </a>

          <a 
            href="https://twitter.com/" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1DA1F2]/10 border border-[#1DA1F2]/20 rounded-2xl p-4 flex flex-col justify-between h-[110px] hover:bg-[#1DA1F2]/20 hover:border-[#1DA1F2]/40 transition-all group"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#1DA1F2] group-hover:fill-white transition-colors">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span className="font-sans font-semibold text-[14px]">Twitter / X</span>
          </a>
        </div>
      </div>
    </Window>
  );
}
