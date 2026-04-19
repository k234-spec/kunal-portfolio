export interface Skill {
  id: string;
  name: string;
  category: string;
  level: "beginner" | "intermediate" | "advanced";
}

export const skills: Skill[] = [
  { id: "react", name: "React.js", category: "Frontend", level: "advanced" },
  { id: "nextjs", name: "Next.js", category: "Frontend", level: "intermediate" },
  { id: "tailwind", name: "Tailwind CSS", category: "Frontend", level: "advanced" },
  { id: "html", name: "HTML/CSS", category: "Frontend", level: "advanced" },
  { id: "node", name: "Node.js", category: "Backend", level: "intermediate" },
  { id: "express", name: "Express", category: "Backend", level: "intermediate" },
  { id: "sql", name: "SQL", category: "Database", level: "intermediate" },
  { id: "mongo", name: "MongoDB", category: "Database", level: "intermediate" },
  { id: "hubspot", name: "HubSpot", category: "Marketing Tech", level: "advanced" },
  { id: "linkedin", name: "LinkedIn Automation", category: "Marketing Tech", level: "advanced" },
  { id: "n8n", name: "n8n", category: "AI & Automation", level: "advanced" },
  { id: "zapier", name: "Zapier", category: "AI & Automation", level: "intermediate" },
  { id: "git", name: "Git", category: "Tools", level: "advanced" },
  { id: "figma", name: "Figma", category: "Tools", level: "intermediate" }
];
