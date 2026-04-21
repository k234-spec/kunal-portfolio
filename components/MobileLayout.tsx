"use client";

import Image from "next/image";
import { useState } from "react";
import { Code, Briefcase, MessageCircle, Mail, ExternalLink, Menu, X } from "lucide-react";
import { useTypingAnimation } from "@/hooks/useTypingAnimation";
import { skills } from "@/data/skills";
import { projects } from "@/data/projects";
import { experience } from "@/data/experience";
import emailjs from '@emailjs/browser';
import { track } from "@vercel/analytics";

const phrases = [
  "Full Stack Developer",
  "Product Engineer",
  "Marketing Tech Builder",
  "AI Workflow Architect"
];

const certs = [
  { id: "1", name: "Stock Market Certificate", platform: "Spring Pad Institute", date: "2023", verifyUrl: "/stock-market-certificate.jpg", image: "/stock-market-certificate.jpg" },
  { id: "2", name: "UI/UX Certificate", platform: "Institute", date: "2023", verifyUrl: "/ui-ux-certificate.jpg", image: "/ui-ux-certificate.jpg" },
  { id: "3", name: "V Prop Trader Certificate", platform: "Prop V Trader", date: "2023", verifyUrl: "/v-prop-trader-certificate.jpg", image: "/v-prop-trader-certificate.jpg" }
];

export default function MobileLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { displayText } = useTypingAnimation(phrases);

  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      track('contact_form_submit');
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_095lsu8",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_8h790of",
        { 
          from_name: formState.name, 
          from_email: formState.email, 
          subject: formState.subject, 
          message: formState.message,
          to_name: "Kunal Mangla"
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "P9XN3q6iN-rB1N67r"
      );
      setStatus("success");
      setFormState({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const handleResumeDownload = () => {
    track('resume_download', { source: 'mobile_layout' });
    const link = document.createElement('a');
    link.href = '/kunal-mangla-resume.pdf';
    link.download = 'Kunal_Mangla_Resume.pdf';
    link.click();
  };

  const categories = ["Frontend", "Backend", "Database", "Marketing Tech", "AI & Automation", "Tools", "Tools & Others"];
  const groupedSkills = categories.map(cat => ({
    name: cat,
    items: skills.filter(s => s.category === cat || (cat === "Tools & Others" && s.category === "Tools"))
  })).filter(g => g.items.length > 0);

  const getLevelColor = (level: string) => {
    if (level === "beginner") return "bg-[#555]";
    if (level === "intermediate") return "bg-[#ffbd2e]";
    return "bg-[#28ca41]";
  };

  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-bg text-text w-full overflow-x-hidden pt-[60px]">
      {/* Sticky Nav */}
      <nav className="fixed top-0 left-0 w-full h-[60px] bg-[#0a0a0ae6] backdrop-blur-md border-b border-border z-50 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-white">
            <path d="M17.057 20.28c-.96.56-1.856.88-2.63.88-1.25 0-1.633-.78-3.033-.78-1.39 0-1.83.78-3.01.78-.79 0-1.67-.32-2.63-.88-4.82-2.78-4.72-9.62-1.25-11.7.9-.52 1.9-.81 3.02-.81 1.44 0 2.19.83 3.44.83 1.25 0 2-.83 3.44-.83 1.12 0 2.12.31 3.02.81 2.33 1.34 2.87 4.26 1.63 6.42-.33.56-.73 1.15-1.15 1.76l-.88 1.53zm-2.17-15.68c-.62.77-1.47 1.27-2.32 1.27-.14 0-.29-.02-.42-.05.17-1.63 1.25-2.85 2.5-2.85.14 0 .28.02.41.04-.15 1.59-1.55 2.36-2.17 1.59z" />
          </svg>
          <span className="font-syne font-extrabold text-accent">KUNAL MANGLA</span>
        </div>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-text">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-[60px] bg-bg z-40 p-6 flex flex-col gap-6 font-mono text-sm uppercase tracking-wider">
          <button onClick={() => scrollTo('hero')} className="text-left text-muted mb-2">About</button>
          <button onClick={() => scrollTo('skills')} className="text-left text-muted mb-2">Skills</button>
          <button onClick={() => scrollTo('projects')} className="text-left text-muted mb-2">Projects</button>
          <button onClick={() => scrollTo('experience')} className="text-left text-muted mb-2">Experience</button>
          <button onClick={() => scrollTo('certs')} className="text-left text-muted mb-2">Certifications</button>
          <button onClick={() => scrollTo('contact')} className="text-left text-muted mb-2">Contact</button>
        </div>
      )}

      {/* Hero Section */}
      <section id="hero" className="px-6 py-20 flex flex-col items-center text-center">
        <div className="w-[120px] h-[120px] rounded-full overflow-hidden bg-surface-2 mb-6 relative border-2 border-white/10 shadow-xl">
          <Image src="/profile-photo.jpg" alt="Kunal Mangla" fill sizes="120px" className="object-cover" />
        </div>
        <h1 className="font-syne font-extrabold text-[32px] text-text mb-2">Kunal Mangla</h1>
        <h2 className="font-mono text-accent tracking-[4px] uppercase text-[11px] mb-4">Product Engineer</h2>
        <div className="font-mono text-accent text-[14px] h-6 flex items-center justify-center mb-8">
          <span>{displayText}</span><span className="cursor-blink inline-block w-2 ml-1">|</span>
        </div>
        <p className="font-sans text-muted leading-relaxed mb-8 text-[15px]">
          B.Tech in Computer Science (AI/ML). Currently working as a Marketing Automation Analyst, building automated lead gen systems and CRM workflows. Transitioning into full-stack engineering and product leadership.
        </p>
        <div className="flex flex-col w-full gap-4">
          <button onClick={() => scrollTo('projects')} className="bg-accent text-[#0a0a0a] font-syne font-bold text-sm px-6 py-4 rounded-lg w-full">View My Work</button>
          <button onClick={handleResumeDownload} className="bg-transparent border border-border text-text font-syne font-bold text-sm px-6 py-4 rounded-lg w-full">Download Resume</button>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="px-6 py-20 bg-surface">
        <h3 className="font-mono text-[11px] text-accent tracking-[4px] uppercase mb-8">{"// SKILLS"}</h3>
        <div className="flex flex-col gap-8">
          {groupedSkills.map((category, index) => (
            <div key={category.name} className="flex flex-col">
              <span className="font-mono text-[11px] text-muted tracking-[2px] uppercase mb-4">{category.name}</span>
              <div className="flex flex-wrap gap-2">
                {category.items.map(skill => (
                  <div key={skill.id} className="bg-surface-2 border border-border rounded-full px-3 py-1.5 font-sans text-[12px] font-medium text-text flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${getLevelColor(skill.level)}`}></span>{skill.name}
                  </div>
                ))}
              </div>
              {index < groupedSkills.length - 1 && <div className="h-[1px] w-full bg-border mt-8"></div>}
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="px-6 py-20">
        <h3 className="font-mono text-[11px] text-accent tracking-[4px] uppercase mb-8">{"// PROJECTS"}</h3>
        <div className="flex flex-col gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-surface border border-border rounded-xl overflow-hidden flex flex-col">
              <div className="h-[180px] bg-surface-2 relative w-full overflow-hidden">
                <Image src={project.thumbnail} alt={project.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" onError={(e) => { (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450"><rect width="800" height="450" fill="%23181818"/></svg>'}} />
                <div className="absolute top-3 right-3 text-[10px] font-mono px-2 py-1 rounded bg-[#111111]/80 backdrop-blur-md border border-[#2a2a2a]">
                  {project.status === 'completed' ? <span className="text-[#28ca41]">✓ Completed</span> : <span className="text-[#ffbd2e]">⚡ In Progress</span>}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-syne font-bold text-[18px] text-text mb-2 line-clamp-1">{project.title}</h3>
                <p className="font-sans text-[14px] text-muted leading-[1.6] mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.stack.map(tech => <span key={tech} className="bg-surface-3 border border-border rounded px-2 py-1 font-mono text-[10px] text-muted">{tech}</span>)}
                </div>
                <div className="flex items-center gap-4 border-t border-border pt-4 mt-auto">
                  <a href={project.githubUrl || "#"} target="_blank" rel="noopener noreferrer" onClick={() => track('project_link_click', { project: project.title, type: 'github' })} className="text-muted"><Code size={20} /></a>
                  <a href={project.demoUrl || "#"} target="_blank" rel="noopener noreferrer" onClick={() => track('project_link_click', { project: project.title, type: 'demo' })} className="text-muted"><ExternalLink size={20} /></a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="px-6 py-20 bg-surface">
        <h3 className="font-mono text-[11px] text-accent tracking-[4px] uppercase mb-8">{"// EXPERIENCE"}</h3>
        <div className="relative border-l-2 border-[#2a2a2a] ml-4 pb-4">
          {experience.map((exp) => (
            <div key={exp.id} className="mb-10 ml-6 relative">
              <span className={`absolute flex items-center justify-center w-[10px] h-[10px] rounded-full -left-[29px] ring-8 ring-[#111111] top-1.5 ${exp.current ? 'bg-accent' : 'bg-[#2a2a2a] border border-[#555]'}`}></span>
              <div className="bg-[#111111] border border-[#2a2a2a] rounded-xl p-5 shadow-sm">
                <div className="flex gap-4 mb-4">
                  {exp.logo ? (
                    <div className="w-12 h-12 flex-shrink-0 relative rounded-lg overflow-hidden bg-[#2a2a2a] border border-white/10 p-1">
                      <Image src={exp.logo} alt={exp.company} fill className="object-contain" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 flex-shrink-0 bg-[#2a2a2a] rounded-md flex items-center justify-center text-xl">
                      🏢
                    </div>
                  )}
                  <div>
                    <h3 className="font-syne font-bold text-[16px] text-text">{exp.company}</h3>
                    <h4 className="font-sans font-medium text-[13px] text-accent mb-2">{exp.role}</h4>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-mono text-[11px] text-muted">{exp.duration}</span>
                  {exp.current && <span className="bg-[rgba(232,255,71,0.15)] text-accent font-mono text-[10px] px-2 py-0.5 rounded">CURRENT</span>}
                </div>
                <ul className="space-y-2">
                  {exp.contributions.map((contribution, i) => (
                    <li key={i} className="font-sans text-[13px] text-muted leading-[1.6] flex items-start">
                      <span className="text-accent mr-2 mt-1 text-[16px] leading-[14px]">•</span>{contribution}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certs" className="px-6 py-20">
        <h3 className="font-mono text-[11px] text-accent tracking-[4px] uppercase mb-8">{"// CERTIFICATIONS"}</h3>
        <div className="flex flex-col gap-4">
          {certs.map((cert) => (
            <div key={cert.id} className="bg-[#111111] border border-[#2a2a2a] rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden min-w-[320px] md:min-w-[480px]">
              <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer" className="h-32 relative bg-[#181818] w-full border-b border-[#2a2a2a] block">
                <Image src={cert.image} alt={cert.name} fill className="object-cover" />
              </a>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-syne font-semibold text-[15px] text-text mb-2">{cert.name}</h3>
                <p className="font-mono text-[11px] text-accent tracking-[2px] uppercase mb-4">{cert.platform}</p>
                <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
                  <span className="font-sans text-[12px] text-muted">{cert.date}</span>
                  <a href={cert.verifyUrl} className="font-sans text-[12px] text-muted flex items-center gap-1">Verify <ExternalLink size={12} /></a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-6 py-20 bg-surface">
        <h3 className="font-mono text-[11px] text-accent tracking-[4px] uppercase mb-8">{"// CONTACT"}</h3>
        <div className="w-full bg-[#111111] border border-[#2a2a2a] rounded-xl p-5">
          {status === "success" ? (
            <div className="py-12 text-center flex flex-col items-center">
              <span className="text-[40px] mb-4">✨</span>
              <p className="font-mono text-[#28ca41] text-sm mb-6">Message sent! I&apos;ll get back to you soon. ✓</p>
              <button onClick={() => { setStatus("idle"); setFormState({name: "", email: "", subject: "", message: ""}); }} className="text-muted text-xs underline">Send another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] text-[#888] tracking-[2px] uppercase">Name</label>
                <input required type="text" name="name" value={formState.name} onChange={(e) => setFormState({...formState, name: e.target.value})} className="bg-[#181818] border border-[#2a2a2a] rounded-lg px-4 py-3 text-[14px] text-text outline-none focus:border-accent" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] text-[#888] tracking-[2px] uppercase">Email</label>
                <input required type="email" name="email" value={formState.email} onChange={(e) => setFormState({...formState, email: e.target.value})} className="bg-[#181818] border border-[#2a2a2a] rounded-lg px-4 py-3 text-[14px] text-text outline-none focus:border-accent" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] text-[#888] tracking-[2px] uppercase">Subject</label>
                <input required type="text" name="subject" value={formState.subject} onChange={(e) => setFormState({...formState, subject: e.target.value})} className="bg-[#181818] border border-[#2a2a2a] rounded-lg px-4 py-3 text-[14px] text-text outline-none focus:border-accent" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] text-[#888] tracking-[2px] uppercase">Message</label>
                <textarea required name="message" value={formState.message} onChange={(e) => setFormState({...formState, message: e.target.value})} className="bg-[#181818] border border-[#2a2a2a] rounded-lg px-4 py-3 text-[14px] text-text outline-none focus:border-accent min-h-[100px]" />
              </div>
              <button disabled={status === "loading"} type="submit" className="bg-accent text-bg font-syne font-bold text-[14px] uppercase tracking-wide rounded-lg py-4 w-full mt-2 disabled:opacity-50">
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-10 bg-bg text-center flex flex-col items-center">
        <div className="flex gap-4 mb-6">
          <a href="#" className="w-10 h-10 bg-[#181818] rounded-lg flex items-center justify-center text-[#888]"><Code size={20} /></a>
          <a href="#" className="w-10 h-10 bg-[#181818] rounded-lg flex items-center justify-center text-[#888]"><Briefcase size={20} /></a>
          <a href="#" className="w-10 h-10 bg-[#181818] rounded-lg flex items-center justify-center text-[#888]"><MessageCircle size={20} /></a>
          <a href="mailto:contact@example.com" className="w-10 h-10 bg-[#181818] rounded-lg flex items-center justify-center text-[#888]"><Mail size={20} /></a>
        </div>
        <p className="font-mono text-[10px] text-[#555] uppercase tracking-[1px]">&copy; {new Date().getFullYear()} Kunal Mangla. All rights reserved.</p>
      </footer>
    </div>
  );
}
