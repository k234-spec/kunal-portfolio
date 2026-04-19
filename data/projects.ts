export interface Project {
  id: string;
  title: string;
  description: string;
  stack: string[];
  githubUrl?: string;
  demoUrl?: string;
  thumbnail: string;
  status: "completed" | "in-progress";
}

export const projects: Project[] = [
  {
    id: "marketing-automation",
    title: "Marketing Automation Workflow with n8n",
    description: "Automated lead capture and nurturing pipeline using n8n. Connects LinkedIn, HubSpot CRM, and email sequences to reduce manual outreach time.",
    stack: ["n8n", "HubSpot API", "Webhooks", "JSON"],
    githubUrl: "https://github.com/yourusername/marketing-workflow",
    demoUrl: "https://marketing-demo.kunalmangla.dev",
    thumbnail: "/thumbnails/project-1.png",
    status: "completed",
  },
  {
    id: "linkedin-lead-gen",
    title: "LinkedIn Lead Generation Automation Tool",
    description: "Semi-automated system for identifying and outreaching to B2B decision-makers on LinkedIn. Used for enterprise and partner campaigns.",
    stack: ["LinkedIn", "Apollo", "HubSpot", "n8n", "Google Sheets"],
    githubUrl: "https://github.com/yourusername/linkedin-lead-gen",
    demoUrl: "https://linkedin-automation.kunalmangla.dev",
    thumbnail: "/thumbnails/project-2.png",
    status: "completed",
  },
  {
    id: "idea-validation",
    title: "Idea Validation Dashboard",
    description: "React-based dashboard to validate startup/product ideas by aggregating market signals, competitor data, and user interest metrics in one view.",
    stack: ["React.js", "JavaScript", "REST APIs", "CSS"],
    githubUrl: "https://github.com/yourusername/idea-validation-dashboard",
    thumbnail: "/thumbnails/project-3.png",
    status: "in-progress",
  },
];
