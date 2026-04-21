import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-syne",
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kunal-mangla-portfolio.vercel.app"),
  title: { default: "Kunal Mangla — Product Engineer", template: "%s | Kunal Mangla" },
  description: "Product Engineer and Full Stack Developer specializing in React, Next.js, marketing automation (n8n, HubSpot), and AI workflows. Available for roles and freelance.",
  keywords: ["product engineer", "full stack developer", "React", "Next.js", "marketing automation", "n8n", "HubSpot", "portfolio"],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    title: "Kunal Mangla — Product Engineer",
    description: "Product Engineer and Full Stack Developer specializing in React, Next.js, marketing automation (n8n, HubSpot), and AI workflows. Available for roles and freelance.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Kunal Mangla Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kunal Mangla — Product Engineer",
    description: "Product Engineer and Full Stack Developer specializing in React, Next.js, marketing automation (n8n, HubSpot), and AI workflows. Available for roles and freelance.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
