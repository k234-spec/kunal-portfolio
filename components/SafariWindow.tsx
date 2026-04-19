"use client";

import { useState, useEffect, KeyboardEvent } from "react";
import Image from "next/image";
import { m } from "framer-motion";
import Window from "./Window";
import { useDesktop } from "@/context/DesktopContext";
import {
  ArrowLeft, ArrowRight, RotateCcw,
  Search, Plus, X, Globe, ExternalLink,
} from "lucide-react";

// ── Inline brand SVGs ──────────────────────────────────────────────────────────
const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
  </svg>
);

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

// ── Constants ──────────────────────────────────────────────────────────────────
const GITHUB_URL  = "https://github.com/k234-spec";
const LINKEDIN_URL = "https://www.linkedin.com/in/kunal-mangla-/";

interface Tab {
  id: string;
  label: string;
  url: string;
  icon: React.ReactNode;
}

const BOOKMARKS = [
  {
    id: "github",
    label: "GitHub",
    url: GITHUB_URL,
    realUrl: GITHUB_URL,
    icon: <GithubIcon size={20} />,
    color: "from-[#1a1a1a] to-[#2d2d2d]",
    description: "k234-spec — repositories, contributions & open-source work",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    url: LINKEDIN_URL,
    realUrl: LINKEDIN_URL,
    icon: <LinkedinIcon size={20} />,
    color: "from-[#0a66c2] to-[#004182]",
    description: "kunal-mangla- — professional profile, experience & network",
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────────
function displayUrl(url: string) {
  try {
    const u = new URL(url);
    return u.hostname.replace("www.", "") + u.pathname;
  } catch { return url; }
}

function isKnownProfile(url: string) {
  return url === GITHUB_URL || url === LINKEDIN_URL ||
    url.startsWith("https://github.com/k234-spec") ||
    url.startsWith("https://www.linkedin.com/in/kunal-mangla");
}

function resolveUrl(input: string): string {
  const t = input.trim();
  if (!t || t === "newtab" || t === "about:blank") return "newtab";
  if (t.startsWith("http://") || t.startsWith("https://")) return t;
  if (t.toLowerCase() === "github")   return GITHUB_URL;
  if (t.toLowerCase() === "linkedin") return LINKEDIN_URL;
  if (!t.includes(".") || t.includes(" "))
    return `https://www.google.com/search?q=${encodeURIComponent(t)}`;
  return `https://${t}`;
}

function tabIcon(url: string) {
  if (url === "newtab") return <Globe size={12} className="text-white/40" />;
  if (url.includes("github"))   return <GithubIcon size={12} />;
  if (url.includes("linkedin")) return <LinkedinIcon size={12} />;
  return <Globe size={12} />;
}

// ── Google-style Search Results page ─────────────────────────────────────────
function SearchResultsPage({ url }: { url: string }) {
  const isGithub   = url.includes("github.com/k234-spec");
  const isLinkedin = url.includes("linkedin.com/in/kunal-mangla");

  const profile = isGithub
    ? {
        platform: "GitHub",
        handle: "k234-spec",
        realUrl: GITHUB_URL,
        displayUrl: "github.com › k234-spec",
        title: "k234-spec (Kunal Mangla) · GitHub",
        description:
          "Full stack developer & open-source contributor. Repositories covering marketing automation, AI workflows, CRM integrations and web projects. Follow to see contributions and starred projects.",
        icon: <GithubIcon size={28} />,
        iconBg: "bg-white text-black",
        meta: ["Followers · GitHub profile", "Public repositories", "Joined 2019"],
        color: "#ffffff",
        extras: [
          { label: "Repositories", href: `${GITHUB_URL}?tab=repositories` },
          { label: "Stars",        href: `${GITHUB_URL}?tab=stars` },
          { label: "Followers",    href: `${GITHUB_URL}?tab=followers` },
          { label: "Following",    href: `${GITHUB_URL}?tab=following` },
        ],
      }
    : isLinkedin
    ? {
        platform: "LinkedIn",
        handle: "kunal-mangla-",
        realUrl: LINKEDIN_URL,
        displayUrl: "linkedin.com › in › kunal-mangla-",
        title: "Kunal Mangla – Marketing Automation Analyst | LinkedIn",
        description:
          "B.Tech Computer Science (AI/ML), Lingaya's Vidyapeeth. Currently working as Marketing Automation Analyst — building automated lead generation systems, CRM workflows, and transitioning into full-stack product engineering.",
        icon: <LinkedinIcon size={28} />,
        iconBg: "bg-[#0a66c2] text-white",
        meta: ["500+ connections", "Marketing & Technology", "Open to opportunities"],
        color: "#0a66c2",
        extras: [
          { label: "Experience",    href: LINKEDIN_URL },
          { label: "Education",     href: LINKEDIN_URL },
          { label: "Skills",        href: LINKEDIN_URL },
          { label: "Endorsements",  href: LINKEDIN_URL },
        ],
        previewImage: "/linkedin-preview.png",
      }
    : null;

  // Generic Google search view for other URLs
  if (!profile) {
    return (
      <div className="h-full bg-[#202124] flex items-center justify-center">
        <div className="text-center">
          <Globe size={40} className="mx-auto mb-4 text-white/20" />
          <p className="font-mono text-[12px] text-white/30">Opening in external browser…</p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1 font-mono text-[12px] text-blue-400 hover:underline"
          >
            {url} <ExternalLink size={10} />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-[#202124] text-white px-10 py-8 font-sans">
      {/* Google logo + search bar replica */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex gap-[2px] text-[24px] font-bold select-none">
          <span className="text-[#4285f4]">G</span>
          <span className="text-[#ea4335]">o</span>
          <span className="text-[#fbbc04]">o</span>
          <span className="text-[#4285f4]">g</span>
          <span className="text-[#34a853]">l</span>
          <span className="text-[#ea4335]">e</span>
        </div>
        <div className="flex-1 flex items-center gap-3 bg-[#303134] rounded-full px-5 py-2.5 border border-[#5f6368] max-w-[540px]">
          <Search size={16} className="text-white/50 shrink-0" />
          <span className="text-white/80 text-[14px]">
            {profile.platform === "GitHub"
              ? "Kunal Mangla GitHub k234-spec"
              : "Kunal Mangla LinkedIn"}
          </span>
        </div>
      </div>

      {/* Result count */}
      <p className="text-[#bdc1c6] text-[13px] mb-5">
        About 1 result (0.42 seconds)
      </p>

      {/* ── Top result card ── */}
      <m.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-[600px]"
      >
        {/* Site origin row */}
        <div className="flex items-center gap-3 mb-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${profile.iconBg}`}>
            {profile.icon}
          </div>
          <div>
            <p className="text-white text-[14px] font-medium leading-tight">{profile.platform}</p>
            <p className="text-[#bdc1c6] text-[12px]">{profile.displayUrl}</p>
          </div>
        </div>

        {/* Title — the clickable link */}
        <a
          href={profile.realUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group block mb-2"
        >
          <h2 className="text-[#8ab4f8] text-[20px] font-normal group-hover:underline leading-snug">
            {profile.title}
          </h2>
        </a>

        {/* Description */}
        <p className="text-[#bdc1c6] text-[14px] leading-relaxed mb-4">
          {profile.description}
        </p>

        {/* Meta chips */}
        <div className="flex flex-wrap gap-2 mb-5">
          {profile.meta.map((m, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full text-[12px] bg-[#303134] text-[#bdc1c6] border border-[#5f6368]"
            >
              {m}
            </span>
          ))}
        </div>

        {/* Sub-links */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          {profile.extras.map((ex) => (
            <a
              key={ex.label}
              href={ex.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between bg-[#303134] hover:bg-[#3c4043] border border-[#5f6368] rounded-xl px-4 py-3 transition-colors group"
            >
              <span className="text-[#8ab4f8] text-[13px] group-hover:underline">{ex.label}</span>
              <ExternalLink size={12} className="text-white/30" />
            </a>
          ))}
        </div>

        {/* Profile Preview Image (for LinkedIn login-wall bypass feel) */}
        {profile.previewImage && (
          <m.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 relative rounded-2xl overflow-hidden border border-[#5f6368] bg-[#1a1a1a] shadow-2xl group"
          >
            <div className="absolute top-3 left-3 z-10 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-mono text-white/70 uppercase tracking-wider">Live Preview</span>
            </div>
            <Image 
              src={profile.previewImage} 
              alt="Profile Preview" 
              width={600} 
              height={340} 
              className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700"
            />
          </m.div>
        )}

        {/* Open profile CTA */}
        <m.a
          href={profile.realUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-6 flex items-center justify-center gap-3 w-full py-3.5 rounded-xl text-white font-semibold text-[14px] transition-all"
          style={{ backgroundColor: profile.color === "#ffffff" ? "#24292e" : profile.color }}
        >
          <span className="opacity-90">{profile.icon}</span>
          Open {profile.platform} Profile
          <ExternalLink size={14} className="opacity-70" />
        </m.a>
      </m.div>
    </div>
  );
}

// ── New-Tab Page ───────────────────────────────────────────────────────────────
function NewTabPage({ onNavigate }: { onNavigate: (url: string) => void }) {
  const [query, setQuery] = useState("");
  const handleSearch = () => { if (query.trim()) onNavigate(resolveUrl(query)); };

  return (
    <div className="flex flex-col items-center justify-start h-full bg-[#1c1c1e] text-white pt-12 px-8">
      <div className="mb-10 text-center">
        <Globe size={40} className="mx-auto mb-4 text-white/20" />
        <h2 className="font-mono text-[13px] text-white/30 tracking-widest uppercase mb-6">
          Safari — Search or enter a URL
        </h2>
        <div className="flex items-center gap-2 bg-[#2c2c2e] rounded-xl px-4 py-3 w-[420px] border border-white/10 focus-within:border-white/30 transition-colors">
          <Search size={15} className="text-white/40 shrink-0" />
          <input
            className="flex-1 bg-transparent text-white text-[14px] outline-none placeholder:text-white/30"
            placeholder='Search or type "github" / "linkedin"…'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && handleSearch()}
            autoFocus
          />
        </div>
      </div>

      <p className="font-mono text-[10px] text-white/25 uppercase tracking-widest mb-5">Favourites</p>
      <div className="grid grid-cols-2 gap-4 w-full max-w-[540px]">
        {BOOKMARKS.map((bm) => (
          <m.button
            key={bm.id}
            onClick={() => onNavigate(bm.url)}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={`bg-gradient-to-br ${bm.color} rounded-2xl p-5 text-left border border-white/10 hover:border-white/25 transition-all shadow-lg`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0">
                {bm.icon}
              </div>
              <span className="font-semibold text-white text-[15px]">{bm.label}</span>
            </div>
            <p className="font-mono text-[11px] text-white/45 leading-relaxed">{bm.description}</p>
          </m.button>
        ))}
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function SafariWindow() {
  const { closeWindow, minimizeWindow, focusWindow, activeWindow, openWindows } = useDesktop();
  const id = "safari";

  const makeTab = (url: string): Tab => ({
    id: Math.random().toString(36).slice(2),
    label: url === "newtab" ? "New Tab" : displayUrl(url),
    url,
    icon: tabIcon(url),
  });

  const [tabs, setTabs]           = useState<Tab[]>([makeTab("newtab")]);
  const [activeTabId, setActiveTabId] = useState(tabs[0].id);
  const [addressInput, setAddressInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [loadingTabs, setLoadingTabs] = useState<Set<string>>(new Set());

  const activeTab = tabs.find((t) => t.id === activeTabId) ?? tabs[0];

  useEffect(() => {
    if (!isEditing) setAddressInput(activeTab.url === "newtab" ? "" : activeTab.url);
  }, [activeTab, isEditing]);

  if (!openWindows.includes(id)) return null;

  // Tabs
  const addTab = () => {
    const tab = makeTab("newtab");
    setTabs((p) => [...p, tab]);
    setActiveTabId(tab.id);
  };

  const closeTab = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (tabs.length === 1) { closeWindow(id); return; }
    const idx  = tabs.findIndex((t) => t.id === tabId);
    const next = tabs[idx === 0 ? 1 : idx - 1];
    setTabs((p) => p.filter((t) => t.id !== tabId));
    if (activeTabId === tabId) setActiveTabId(next.id);
  };

  // Navigation
  const navigate = (url: string, tabId: string = activeTabId) => {
    const resolved = resolveUrl(url);
    setTabs((prev) =>
      prev.map((t) =>
        t.id === tabId
          ? { ...t, url: resolved, label: resolved === "newtab" ? "New Tab" : displayUrl(resolved), icon: tabIcon(resolved) }
          : t
      )
    );
    setIsEditing(false);
    setAddressInput(resolved === "newtab" ? "" : resolved);
    setLoadingTabs((p) => {
      const next = new Set(Array.from(p));
      next.add(tabId);
      return next;
    });
    setTimeout(() => setLoadingTabs((p) => { 
      const n = new Set(Array.from(p)); 
      n.delete(tabId); 
      return n; 
    }), 900);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter")  navigate(addressInput);
    if (e.key === "Escape") setIsEditing(false);
  };

  const isLoading = loadingTabs.has(activeTabId);

  return (
    <Window
      id={id}
      title="Safari"
      icon={<div className="w-4 h-4 relative"><Image src="/safari.png" alt="Safari" fill className="object-contain" /></div>}
      defaultPosition={{ x: 80, y: 40 }}
      defaultSize={{ width: 900, height: 600 }}
      onClose={() => closeWindow(id)}
      onMinimize={() => minimizeWindow(id)}
      onFocus={() => focusWindow(id)}
      zIndex={activeWindow === id ? 50 : 1}
    >
      <div className="flex flex-col h-full -m-8">

        {/* ── Tab bar ── */}
        <div className="flex items-end gap-1 bg-[#181818] px-3 pt-2 border-b border-[#2a2a2a] shrink-0">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-t-lg text-[11px] font-mono cursor-pointer max-w-[180px] min-w-[110px] transition-all select-none
                ${tab.id === activeTabId
                  ? "bg-[#111] text-white border border-b-0 border-[#2a2a2a]"
                  : "text-white/40 hover:text-white/60 hover:bg-white/5"}`}
            >
              <span className="shrink-0">{tab.icon}</span>
              <span className="truncate flex-1">{tab.label}</span>
              <button
                onClick={(e) => closeTab(tab.id, e)}
                className="opacity-0 group-hover:opacity-60 hover:!opacity-100 transition-opacity ml-auto shrink-0"
              >
                <X size={10} />
              </button>
            </div>
          ))}
          <button
            onClick={addTab}
            className="mb-1 ml-1 w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/10 text-white/40 hover:text-white transition-all shrink-0"
          >
            <Plus size={14} />
          </button>
        </div>

        {/* ── Toolbar ── */}
        <div className="flex items-center gap-2 px-3 py-2 bg-[#111] border-b border-[#2a2a2a] shrink-0">
          <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white/10 text-white/25 transition-colors cursor-not-allowed">
            <ArrowLeft size={14} />
          </button>
          <button className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white/10 text-white/25 transition-colors cursor-not-allowed">
            <ArrowRight size={14} />
          </button>
          <button
            onClick={() => navigate(activeTab.url)}
            className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white/10 text-white/40 hover:text-white transition-colors"
          >
            <RotateCcw size={13} className={isLoading ? "animate-spin" : ""} />
          </button>

          {/* Address bar */}
          <div className="flex-1 flex items-center gap-2 bg-[#2a2a2a] rounded-lg px-3 py-1.5 border border-[#3a3a3a] focus-within:border-white/30 transition-colors">
            <Search size={12} className="text-white/30 shrink-0" />
            <input
              className="flex-1 bg-transparent text-white text-[12px] font-mono outline-none placeholder:text-white/25 min-w-0"
              value={isEditing ? addressInput : (activeTab.url === "newtab" ? "" : activeTab.url)}
              placeholder='Search or type "github" / "linkedin"…'
              onFocus={(e) => { setIsEditing(true); setAddressInput(activeTab.url === "newtab" ? "" : activeTab.url); e.target.select(); }}
              onChange={(e) => setAddressInput(e.target.value)}
              onBlur={() => setIsEditing(false)}
              onKeyDown={handleKeyDown}
            />
          </div>

          {/* Quick bookmark buttons */}
          <button onClick={() => navigate(GITHUB_URL)} title="GitHub" className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white/10 text-white/40 hover:text-white transition-colors">
            <GithubIcon size={14} />
          </button>
          <button onClick={() => navigate(LINKEDIN_URL)} title="LinkedIn" className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white/10 text-[#0a66c2] hover:text-[#0a66c2]/80 transition-colors">
            <LinkedinIcon size={14} />
          </button>
        </div>

        {/* ── Viewport ── */}
        <div className="flex-1 relative overflow-hidden bg-[#202124]">
          {isLoading && (
            <m.div
              className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 z-10"
              initial={{ width: "0%" }}
              animate={{ width: "85%" }}
              transition={{ duration: 0.85, ease: "easeOut" }}
            />
          )}

          {activeTab.url === "newtab" ? (
            <NewTabPage onNavigate={navigate} />
          ) : isKnownProfile(activeTab.url) ? (
            <SearchResultsPage url={activeTab.url} />
          ) : (
            // Fallback for non-embeddable pages — open externally
            <div className="h-full flex flex-col items-center justify-center gap-4 bg-[#202124]">
              <Globe size={36} className="text-white/15" />
              <p className="font-mono text-[12px] text-white/30 text-center max-w-xs">
                This page can&apos;t be displayed inside the portfolio.<br />
                Click below to open it in your real browser.
              </p>
              <a
                href={activeTab.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white text-[13px] font-mono transition-all"
              >
                Open externally <ExternalLink size={13} />
              </a>
            </div>
          )}
        </div>

        {/* ── Status bar ── */}
        <div className="flex items-center justify-between px-4 py-1 bg-[#111] border-t border-[#2a2a2a] shrink-0">
          <span className="font-mono text-[10px] text-white/20">
            {isLoading ? "Loading…" : activeTab.url === "newtab" ? "New Tab" : displayUrl(activeTab.url)}
          </span>
          <span className="font-mono text-[10px] text-white/15">Safari — Kunal Mangla Portfolio</span>
        </div>
      </div>
    </Window>
  );
}
