"use client";

import Window from "./Window";
import { useDesktop } from "@/context/DesktopContext";
import Image from "next/image";
import { useState } from "react";
import { Code, Briefcase, MessageCircle, Users, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import emailjs from '@emailjs/browser';

export default function ContactWindow() {
  const { closeWindow, minimizeWindow, focusWindow, activeWindow, openWindows } = useDesktop();
  const id = "contact";

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  if (!openWindows.includes(id)) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error("EmailJS Configuration Error: Missing environment variables.");
      if (!serviceId) console.error("Missing: NEXT_PUBLIC_EMAILJS_SERVICE_ID");
      if (!templateId) console.error("Missing: NEXT_PUBLIC_EMAILJS_TEMPLATE_ID");
      if (!publicKey) console.error("Missing: NEXT_PUBLIC_EMAILJS_PUBLIC_KEY");
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formState.name,
          from_email: formState.email,
          subject: formState.subject,
          message: formState.message,
          to_name: "Kunal Mangla",
        },
        publicKey
      );
      setStatus("success");
      setFormState({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
    }
  };

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
          <Image src="/profile-photo.jpg" alt="Kunal Mangla" fill className="object-cover" />
        </div>

        <h1 className="font-syne font-bold text-[28px] mb-2">Let&apos;s Connect</h1>
        <p className="font-sans text-[16px] text-gray-400 mb-8 max-w-md">
          Got an idea? A bug to squash? or just wanna talk tech? I&apos;m always down for a good conversation.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
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
            href="https://www.linkedin.com/in/kunal-mangla-/" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#0077b5]/10 border border-[#0077b5]/20 rounded-2xl p-4 flex flex-col justify-between h-[110px] hover:bg-[#0077b5]/20 hover:border-[#0077b5]/40 transition-all group"
          >
            <Users size={24} className="text-[#0077b5] group-hover:text-white transition-colors" />
            <span className="font-sans font-semibold text-[14px]">LinkedIn</span>
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
            href="mailto:manglakunal2@gmail.com" 
            className="bg-[#6b52ff]/10 border border-[#6b52ff]/20 rounded-2xl p-4 flex flex-col justify-between h-[110px] hover:bg-[#6b52ff]/20 hover:border-[#6b52ff]/40 transition-all group"
          >
            <Briefcase size={24} className="text-[#6b52ff] group-hover:text-white transition-colors" />
            <span className="font-sans font-semibold text-[14px]">Email</span>
          </a>
        </div>

        <div className="pt-8 border-t border-white/5">
          <h2 className="font-syne font-bold text-[20px] mb-6">Send a Message</h2>
          
          {status === "success" ? (
            <div className="bg-[#28ca41]/10 border border-[#28ca41]/20 rounded-2xl p-8 flex flex-col items-center text-center">
              <CheckCircle2 size={48} className="text-[#28ca41] mb-4" />
              <h3 className="font-syne font-bold text-[18px] text-white mb-2">Message Sent!</h3>
              <p className="font-sans text-gray-400 mb-6">Thank you for reaching out. I&apos;ll get back to you as soon as possible.</p>
              <button 
                onClick={() => setStatus("idle")}
                className="text-accent font-mono text-[12px] uppercase tracking-wider hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 pb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-[11px] text-gray-500 uppercase">Name</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Your Name" 
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-[#111] border border-white/5 rounded-xl px-4 py-3 text-[14px] focus:border-accent/50 outline-none transition-all text-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-mono text-[11px] text-gray-500 uppercase">Email</label>
                  <input 
                    required
                    type="email" 
                    placeholder="your@email.com" 
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full bg-[#111] border border-white/5 rounded-xl px-4 py-3 text-[14px] focus:border-accent/50 outline-none transition-all text-white"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="font-mono text-[11px] text-gray-500 uppercase">Subject</label>
                <input 
                  required
                  type="text" 
                  placeholder="How can I help you?" 
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  className="w-full bg-[#111] border border-white/5 rounded-xl px-4 py-3 text-[14px] focus:border-accent/50 outline-none transition-all text-white"
                />
              </div>
              <div className="space-y-1.5">
                <label className="font-mono text-[11px] text-gray-500 uppercase">Message</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Tell me about your project..." 
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full bg-[#111] border border-white/5 rounded-xl px-4 py-3 text-[14px] focus:border-accent/50 outline-none transition-all resize-none text-white"
                />
              </div>

              {status === "error" && (
                <div className="flex items-center gap-2 text-red-400 text-[13px] bg-red-400/10 p-3 rounded-lg border border-red-400/20">
                  <AlertCircle size={16} />
                  <span>Failed to send message. Please try again or email me directly.</span>
                </div>
              )}

              <button 
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-accent text-black font-syne font-bold py-4 rounded-xl hover:bg-accent/90 transition-all text-[15px] shadow-lg shadow-accent/10 mt-2 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </Window>
  );
}
