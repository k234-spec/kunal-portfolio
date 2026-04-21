export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  current: boolean;
  contributions: string[];
  logo?: string;
}

export const experience: Experience[] = [
  {
    id: "kiran-consultants",
    company: "Kiran Consultants Private Limited",
    role: "ERP Functional Consultant",
    duration: "Aug 2025 - Present",
    current: true,
    contributions: [
      "Configured and managed ERP systems for various clients.",
      "Provided functional consulting and system optimization strategies.",
    ],
    logo: "/kiran-consultants.jfif"
  },
  {
    id: "abacus-desk",
    company: "Abacus Desk IT Solutions",
    role: "Marketing Automation Analyst",
    duration: "Feb 2025 - June 2025",
    current: false,
    contributions: [
      "Designed and implemented B2B lead generation campaigns.",
      "Managed marketing automation workflows to increase engagement.",
    ],
    logo: "/abacus-desk.jfif"
  },
  {
    id: "brawn-pharmaceuticals",
    company: "Brawn Pharmaceuticals",
    role: "ERP Admin",
    duration: "Feb 2024 - Feb 2025",
    current: false,
    contributions: [
      "Administered ERP systems for seamless pharmaceutical operations.",
      "Handled master data configuration and process monitoring.",
    ],
    logo: "/brawn.jfif"
  },
  {
    id: "adobe",
    company: "Adobe (BPO)",
    role: "Customer Service Associate",
    duration: "Aug 2023 - Nov 2023",
    current: false,
    contributions: [
      "Provided robust customer service handling direct client communications.",
      "Demonstrated strong problem-solving and issue resolution skills.",
    ],
    logo: "/adobe.png"
  },
  {
    id: "innovate-labs",
    company: "Innovate Labs",
    role: "AR/VR Intern",
    duration: "June 2023 - Aug 2023",
    current: false,
    contributions: [
      "Designed AR/VR app user interfaces for enhanced user experience.",
      "Assisted in testing and developing immersive environments.",
    ],
    logo: "/innovate-labs.jfif"
  },
];