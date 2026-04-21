"use client";

import { ExternalLink, Download, Folder } from "lucide-react";
import Window from "./Window";
import { useDesktop } from "@/context/DesktopContext";
import Image from "next/image";

const certs = [
  {
    id: "1",
    name: "Stock Market Certificate",
    platform: "Spring Pad Institute",
    date: "2023",
    verifyUrl: "/stock-market-certificate.jfif",
    image: "/stock-market-certificate.jfif",
    downloadPath: "/stock-market-certificate.jfif"
  },
  {
    id: "2",
    name: "UI/UX Certificate",
    platform: "Institute",
    date: "2023",
    verifyUrl: "/ui-ux-certificate.jfif",
    image: "/ui-ux-certificate.jfif",
    downloadPath: "/ui-ux-certificate.jfif"
  },
  {
    id: "3",
    name: "V Prop Trader Certificate",
    platform: "Prop V Trader",
    date: "2023",
    verifyUrl: "/v-prop-trader-certificate.jfif",
    image: "/v-prop-trader-certificate.jfif",
    downloadPath: "/v-prop-trader-certificate.jfif"
  }
];

export default function CertsWindow() {
  const { closeWindow, minimizeWindow, focusWindow, activeWindow, openWindows } = useDesktop();
  const id = "certs";

  if (!openWindows.includes(id)) return null;

  return (
    <Window
      id={id}
      title="Certifications"
      icon={
        <div className="w-4 h-4 relative">
          <Image src="/folder-icon.png" alt="Certs" fill className="object-contain" />
        </div>
      }
      defaultPosition={{ x: 300, y: 180 }}
      defaultSize={{ width: 720, height: 520 }}
      onClose={() => closeWindow(id)}
      onMinimize={() => minimizeWindow(id)}
      onFocus={() => focusWindow(id)}
      zIndex={activeWindow === id ? 50 : 1}
    >
      <div className="flex flex-col gap-6 h-full overflow-y-auto pr-2">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[11px] text-[#555]">
            {"// professional certifications & achievements"}
          </p>
          <div className="flex items-center gap-2 text-[#444] font-mono text-[10px]">
            <Folder size={12} />
            Documents / Certs
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certs.map((cert) => (
            <div 
              key={cert.id} 
              className="bg-[#111111] border border-[#2a2a2a] rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/20 hover:bg-[#151515] group flex flex-col shadow-xl"
            >
              <div className="h-40 relative bg-[#181818] w-full border-b border-[#2a2a2a] overflow-hidden">
                <Image 
                  src={cert.image} 
                  alt={cert.name} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                   <p className="text-white text-[12px] font-mono">View full document</p>
                </div>
              </div>
              
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-syne font-bold text-[16px] text-white mb-2 line-clamp-2 leading-tight">
                  {cert.name}
                </h3>
                <p className="font-mono text-[11px] text-accent/80 tracking-[1px] uppercase mb-4">
                  {cert.platform}
                </p>
                
                <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
                  <span className="font-mono text-[11px] text-[#555]">
                    {cert.date}
                  </span>
                  <div className="flex items-center gap-3">
                    <a 
                      href={cert.downloadPath}
                      download={`${cert.name}.jfif`}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all flex items-center gap-2 text-[12px]"
                      title="Download Certificate"
                    >
                      <Download size={14} />
                    </a>
                    <a 
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 px-3 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent transition-all flex items-center gap-2 text-[12px] font-medium"
                    >
                      Verify <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Window>
  );
}
