// Shared dock item metadata — used by Dock and TrashWindow

export type DockItemData = {
  id: string;
  label: string;
  type: "image" | "emoji";
  src?: string;
  alt?: string;
  emoji?: string;
};

export const DEFAULT_DOCK_ITEMS: DockItemData[] = [
  { id: "safari",     label: "Safari",         type: "image", src: "/safari.png",    alt: "Safari Browser"    },
  { id: "about",      label: "Finder",          type: "image", src: "/finder.png",    alt: "Finder"    },
  { id: "skills",     label: "Terminal",        type: "image", src: "/terminal.png",  alt: "Terminal"  },
  { id: "projects",   label: "Projects",        type: "image", src: "/projects-icon.png",  alt: "Projects" },
  { id: "experience", label: "Work Experience", type: "image", src: "/vscode.png",    alt: "Experience"   },
  { id: "education",  label: "Education",       type: "image", src: "/education.png", alt: "Education" },
  { id: "photos",     label: "Photo Gallery",   type: "image", src: "/photos.png",    alt: "Photos"    },
  { id: "spotify",    label: "Spotify",         type: "image", src: "/spotify.png",   alt: "Spotify"   },
  { id: "certs",      label: "Certifications",  type: "image", src: "/folder-icon.png", alt: "Certs"    },
  { id: "contact",    label: "Contact Me",      type: "image", src: "/contact-icon.png",  alt: "Contact" },
];
