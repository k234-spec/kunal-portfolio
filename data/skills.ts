export interface Skill {
  id: string;
  name: string;
  category: string;
  level: "beginner" | "intermediate" | "advanced";
  description: string;
  icon: string; // Lucide icon name or SVG path identifier
}

export const skills: Skill[] = [
  { 
    id: "react", 
    name: "React.js", 
    category: "Frontend", 
    level: "advanced",
    description: "Building dynamic, component-based UIs with hooks and state management.",
    icon: "Code2"
  },
  { 
    id: "nextjs", 
    name: "Next.js", 
    category: "Frontend", 
    level: "intermediate",
    description: "Server-side rendering, static site generation, and optimized performance.",
    icon: "Zap"
  },
  { 
    id: "tailwind", 
    name: "Tailwind CSS", 
    category: "Frontend", 
    level: "advanced",
    description: "Rapid styling with utility-first CSS for responsive, modern designs.",
    icon: "Palette"
  },
  { 
    id: "html", 
    name: "HTML/CSS", 
    category: "Frontend", 
    level: "advanced",
    description: "Foundational structure and advanced styling for web accessibility.",
    icon: "Layout"
  },
  { 
    id: "node", 
    name: "Node.js", 
    category: "Backend", 
    level: "intermediate",
    description: "Scalable server-side logic and real-time application development.",
    icon: "Server"
  },
  { 
    id: "express", 
    name: "Express", 
    category: "Backend", 
    level: "intermediate",
    description: "Lightweight and flexible web framework for building robust APIs.",
    icon: "Globe"
  },
  { 
    id: "sql", 
    name: "SQL", 
    category: "Database", 
    level: "intermediate",
    description: "Relational database design, querying, and performance optimization.",
    icon: "Database"
  },
  { 
    id: "mongo", 
    name: "MongoDB", 
    category: "Database", 
    level: "intermediate",
    description: "NoSQL document-based data modeling for flexible applications.",
    icon: "Leaf"
  },
  { 
    id: "hubspot", 
    name: "HubSpot", 
    category: "Marketing Tech", 
    level: "advanced",
    description: "CRM management, marketing automation, and sales pipeline optimization.",
    icon: "Target"
  },
  { 
    id: "linkedin", 
    name: "LinkedIn Automation", 
    category: "Marketing Tech", 
    level: "advanced",
    description: "Streamlining lead generation and networking workflows.",
    icon: "Users"
  },
  { 
    id: "n8n", 
    name: "n8n", 
    category: "AI & Automation", 
    level: "advanced",
    description: "Advanced low-code workflow automation and system integration.",
    icon: "Cpu"
  },
  { 
    id: "zapier", 
    name: "Zapier", 
    category: "AI & Automation", 
    level: "intermediate",
    description: "Connecting apps and automating repetitive tasks with ease.",
    icon: "Link2"
  },
  { 
    id: "git", 
    name: "Git", 
    category: "Tools", 
    level: "advanced",
    description: "Version control and collaborative development workflows.",
    icon: "GitBranch"
  },
  { 
    id: "figma", 
    name: "Figma", 
    category: "Tools", 
    level: "intermediate",
    description: "UI/UX design, prototyping, and design-to-code handoff.",
    icon: "Figma"
  }
];
