import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0a0a0a",
        surface: "#111111",
        "surface-2": "#181818",
        "surface-3": "#202020",
        border: "#2a2a2a",
        accent: "#e8ff47",
        "accent-2": "#ffb347",
        text: "#f0ece4",
        muted: "#888888",
        dim: "#555555",
      },
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        sans: ["var(--font-dm-sans)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      borderRadius: {
        window: "12px",
        pill: "999px",
      },
      boxShadow: {
        window: "0 8px 40px rgba(0,0,0,0.6)",
        dock: "0 8px 32px rgba(0,0,0,0.4)",
      },
    },
  },
  plugins: [],
};
export default config;
