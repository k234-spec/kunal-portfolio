# Step-by-Step Build Prompts
## Antigravity macOS Portfolio — Full Execution Guide
### Use these prompts with Claude Code (terminal) or Claude AI chat

---

> **How to use this file:**
> Each prompt is a ready-to-paste instruction. Use them in order.
> - 🖥️ = Run in **Claude Code** (terminal / VS Code extension)
> - 💬 = Paste into **Claude.ai chat**
> - ⚙️ = Manual action you do yourself (no AI needed)
> Estimated total build time: **14–20 days** (part-time) or **5–7 days** (full-time focus)

---

## PHASE 1 — Project Setup & Core Shell
### Goal: A running Next.js app with the macOS desktop skeleton on screen

---

### Prompt 1.1 — Scaffold the Project 🖥️

```
Create a new Next.js 14 project called "antigravity-portfolio" with the following setup:
- TypeScript enabled
- Tailwind CSS configured
- App Router (not Pages Router)
- ESLint enabled
- No src/ directory (use root-level app/)
- Alias "@" mapped to root

After scaffolding, install these additional dependencies:
- framer-motion
- @emailjs/browser
- @vercel/analytics
- lucide-react (for icons)

Then update tailwind.config.ts to add these custom tokens:
Colors: bg (#0a0a0a), surface (#111111), surface-2 (#181818), surface-3 (#202020),
border (#2a2a2a), accent (#e8ff47), accent-2 (#ffb347),
text (#f0ece4), muted (#888888), dim (#555555)

Font families: syne (Syne), sans (DM Sans), mono (JetBrains Mono)

Show me the final tailwind.config.ts and package.json.
```

---

### Prompt 1.2 — Global Styles & Fonts 🖥️

```
In the Next.js 14 App Router project "antigravity-portfolio":

1. Update app/layout.tsx to:
   - Load Syne (weights 400, 600, 700, 800), DM Sans (weights 300, 400, 500, 600),
     and JetBrains Mono (weights 400, 500) using next/font/google
   - Apply font CSS variables to the html element
   - Set metadata: title "Antigravity — Product Engineer | Full Stack Developer",
     description "Product Engineer specializing in full-stack development,
     marketing automation, and AI workflows."
   - Add Open Graph tags with a placeholder og-image.jpg
   - Include <Analytics /> from @vercel/analytics/react

2. Update app/globals.css to:
   - Set body background to #0a0a0a, color to #f0ece4
   - Define CSS custom properties matching the design tokens
     (--bg, --surface, --surface-2, --surface-3, --border, --accent,
      --accent-2, --text, --text-muted, --text-dim)
   - Add a custom scrollbar style: thin, thumb color #2a2a2a, track transparent
   - Add the cursor blink keyframe animation

Show me the complete layout.tsx and globals.css files.
```

---

### Prompt 1.3 — Data Files 🖥️

```
Create a /data/ folder in the root of "antigravity-portfolio" with three TypeScript files:

1. data/projects.ts — export a typed Project[] array with these interfaces:
   { id, title, description, stack: string[], githubUrl?, demoUrl?, thumbnail, status: 'completed' | 'in-progress' }
   
   Include 3 projects:
   - "Marketing Automation Workflow with n8n" (completed, stack: n8n/HubSpot API/Webhooks/JSON)
   - "LinkedIn Lead Generation Automation Tool" (completed, stack: LinkedIn/Apollo/HubSpot/n8n/Google Sheets)
   - "Idea Validation Dashboard" (in-progress, stack: React.js/JavaScript/REST APIs/CSS)
   Use placeholder thumbnail paths like "/thumbnails/project-1.jpg"

2. data/skills.ts — export a typed Skill[] array:
   { id, name, category: string, level: 'beginner' | 'intermediate' | 'advanced' }
   
   Categories and skills:
   - Frontend: React.js (intermediate), HTML (advanced), CSS (advanced), JavaScript ES6+ (intermediate), Next.js (beginner)
   - Backend: Node.js (beginner), Express.js (beginner), REST APIs (intermediate)
   - Database: MongoDB (beginner), SQL (beginner)
   - Marketing Tech: HubSpot CRM (advanced), Apollo (advanced), LinkedIn Outreach (advanced), Lead Generation (advanced)
   - AI & Automation: n8n (advanced), MCP Servers (intermediate), AI Workflow Automation (intermediate), Prompt Engineering (intermediate)
   - Tools: Git/GitHub (intermediate), ERP Systems (intermediate), Dashboard Development (intermediate)

3. data/experience.ts — export a typed Experience[] array:
   { id, company, role, duration, current: boolean, contributions: string[] }
   
   Include 4 roles from the PRD (Abacus Desk, Innovate Labs, Pharma Company, BPO).
   Use placeholder dates like "Jan 2024 – Present".

Show me all three complete files.
```

---

### Prompt 1.4 — macOS Menu Bar Component 🖥️

```
Create components/MenuBar.tsx in the Next.js project.

This is a macOS-style top menu bar. Requirements:
- Fixed to top of viewport, full width, height 28px, z-index 50
- Background: rgba(0,0,0,0.55) with backdrop-filter blur(20px)
- Bottom border: 1px solid rgba(255,255,255,0.08)
- Font: JetBrains Mono, 12px, color rgba(255,255,255,0.85)

Left side: 
  - Logo text "ANTIGRAVITY" in Syne 800, color #e8ff47
  - Nav labels: About | Skills | Projects | Experience | Contact
    (each clickable, calls an onOpenWindow(id) prop)

Right side:
  - Wi-Fi icon (use lucide-react Wifi)
  - Battery icon (use lucide-react Battery)
  - Live clock — updates every second using useEffect + useState
    Format: "Fri 17 Apr  10:42 AM" (matches macOS style)

Use Tailwind for all styling. Accept a prop: onOpenWindow: (id: string) => void
Show me the complete MenuBar.tsx.
```

---

### Prompt 1.5 — macOS Dock Component 🖥️

```
Create components/Dock.tsx in the Next.js project.

This is a macOS-style dock fixed at the bottom center of the screen. Requirements:
- Position: fixed, bottom 20px, left 50%, transform translateX(-50%), z-index 50
- Background: rgba(255,255,255,0.10) + backdrop-filter blur(20px)
- Border: 1px solid rgba(255,255,255,0.15), border-radius 20px
- Padding: 8px 16px, gap 8px between icons
- Box shadow: 0 8px 32px rgba(0,0,0,0.4)

Dock icons (use emoji or lucide-react icons):
  👤 About | 🧠 Skills | 💼 Projects | 📋 Experience | 📜 Certifications | 📄 Resume | ✉️ Contact

Each icon:
- Size: 44×44px, background #181818, border-radius 12px, border 1px solid #2a2a2a
- Font size 20px
- On hover: translateY(-8px) scale(1.15) with Framer Motion whileHover
- Shows a tooltip label above on hover (use Framer Motion AnimatePresence)
- Shows a small dot below the icon if that window is currently open

Props:
  - openWindows: string[] — IDs of currently open windows
  - onOpenWindow: (id: string) => void
  - onResumeDownload: () => void — triggers /antigravity-resume.pdf download

Show me the complete Dock.tsx.
```

---

### Prompt 1.6 — Reusable Window Component 🖥️

```
Create components/Window.tsx — the most important component in the project.

This is a reusable draggable macOS-style window. Requirements:

Props interface:
  id: string
  title: string
  icon: string
  children: React.ReactNode
  defaultPosition?: { x: number; y: number }
  defaultSize?: { width: number; height: number }
  onClose: () => void
  onMinimize: () => void
  zIndex: number
  onFocus: () => void

Features:
1. Draggable — use Framer Motion drag prop with dragMomentum: false
2. Open/close animation using Framer Motion:
   initial: { opacity: 0, scale: 0.92, y: 20 }
   animate: { opacity: 1, scale: 1, y: 0 }
   exit: { opacity: 0, scale: 0.88, y: 10 }
   transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] }
3. Window title bar with:
   - Traffic light dots (red #ff5f57, yellow #ffbd2e, green #28ca41)
   - Red dot onClick calls onClose
   - Yellow dot onClick calls onMinimize
   - Icon + title text in JetBrains Mono, 12px, color #888
4. Window body with padding 32px, overflow-y auto, max-height calc(100vh - 160px)
5. onClick on the window calls onFocus (to bring to front via z-index)
6. Styling: background #111111, border 1px solid #2a2a2a, border-radius 12px,
   box-shadow 0 8px 40px rgba(0,0,0,0.6)
7. Min width: 480px

Wrap in Framer Motion AnimatePresence at the usage site (not inside).
Show me the complete Window.tsx.
```

---

### Prompt 1.7 — Desktop Context & Main Page 🖥️

```
Create the DesktopContext and the main Desktop shell in the Next.js project.

1. Create context/DesktopContext.tsx:
   State to manage:
   - openWindows: string[] — IDs of open windows
   - minimizedWindows: string[] — IDs of minimized windows
   - windowOrder: string[] — determines z-index (last = highest)
   
   Actions: openWindow(id), closeWindow(id), minimizeWindow(id), focusWindow(id)
   
   Export useDesktop() hook for consuming the context.

2. Update app/page.tsx to:
   - Wrap everything in <DesktopProvider>
   - Render <MenuBar onOpenWindow={openWindow} />
   - Render a full-screen desktop canvas div (100vw × 100vh, overflow hidden)
   - Render <Dock openWindows={openWindows} onOpenWindow={openWindow} />
   - Use Framer Motion <AnimatePresence> to render only open windows
   - Import all window components (AboutWindow, SkillsWindow, ProjectsWindow,
     ExperienceWindow, CertsWindow, ContactWindow) — stub them for now
   - Each open window ID maps to its component with correct props
   - Handle z-index: windowOrder.indexOf(id) * 10 + 100

Show me the complete DesktopContext.tsx and page.tsx.
```

---

## PHASE 2 — Content Windows
### Goal: All 6 windows built with real content

---

### Prompt 2.1 — About Window 💬

```
Create components/AboutWindow.tsx for the Antigravity macOS portfolio.

This is the Hero/About section displayed inside a draggable Window component.
The window title is "Hello_World.txt". Content:

Layout (two columns on desktop, stacked on mobile):
LEFT COLUMN:
- Circular profile photo (use next/image, src="/photo.jpg", 120×120px, rounded-full)
- Name: "Antigravity" in Syne 800, 32px, color #f0ece4
- Title: "Product Engineer" in JetBrains Mono, color #e8ff47, letter-spacing 4px, uppercase, 11px
- Typing animation that cycles through:
  "Full Stack Developer", "Product Engineer", "Marketing Tech Builder", "AI Workflow Architect"
  (new text appears every 2.5 seconds with a cursor blink effect using JetBrains Mono, color #e8ff47)

RIGHT COLUMN:
- Section label: "// ABOUT ME" in JetBrains Mono, 11px, #e8ff47, letter-spacing 4px
- Bio paragraph placeholder: "B.Tech in Computer Science (AI/ML). Currently working as a
  Marketing Automation Analyst, building automated lead gen systems and CRM workflows.
  Transitioning into full-stack engineering and product leadership — driven by the belief
  that the best products sit at the intersection of code, automation, and strategy."
- Two CTA buttons side by side:
  1. "View My Work" — background #e8ff47, color #0a0a0a, Syne 700, onClick opens Projects window
  2. "Download Resume" — border 1px solid #2a2a2a, color #f0ece4, background transparent,
     onClick triggers /antigravity-resume.pdf download

Use Tailwind for styling. Import openWindow from useDesktop().
Show me the complete AboutWindow.tsx.
```

---

### Prompt 2.2 — Skills Window 💬

```
Create components/SkillsWindow.tsx for the Antigravity macOS portfolio.
Window title: "Skills.app"

Import skills data from data/skills.ts.

Layout:
- Section label above each category group in JetBrains Mono 11px, color #e8ff47,
  letter-spacing 4px, uppercase
- Skills displayed as pill badges:
  background #181818, border 1px solid #2a2a2a, border-radius 999px,
  padding 6px 14px, font DM Sans 12px weight 500, color #f0ece4
  On hover: border-color #e8ff47, background #202020, transition 0.2s
- Optional: small colored dot on each badge indicating level
  (beginner: #555, intermediate: #ffbd2e, advanced: #28ca41)
- Categories separated by a 1px #2a2a2a divider line

Render all 6 categories from the data file: Frontend, Backend, Database,
Marketing Tech, AI & Automation, Tools & Others.

Use Framer Motion to stagger-animate the badge groups in on mount:
  variants with staggerChildren: 0.04, each badge: opacity 0→1, y 10→0

Show me the complete SkillsWindow.tsx.
```

---

### Prompt 2.3 — Projects Window 💬

```
Create components/ProjectsWindow.tsx for the Antigravity macOS portfolio.
Window title: "Projects.finder"

Import projects data from data/projects.ts.

Layout: CSS Grid, 2 columns on desktop (min 320px each), 1 column on mobile, gap 20px

Each project card:
- Background #111111, border 1px solid #2a2a2a, border-radius 12px, overflow hidden
- Hover: translateY(-4px), box-shadow 0 16px 48px rgba(0,0,0,0.5), transition 0.2s

Card thumbnail area:
- Height 180px, background #181818
- Use next/image with objectFit cover (or a placeholder gradient if no image)

Card body (padding 20px):
- Project title: Syne 700, 18px, color #f0ece4, margin-bottom 8px
- Description: DM Sans 14px, color #888, line-height 1.6, margin-bottom 16px
- Tech stack: inline pills — background #202020, border 1px solid #2a2a2a,
  border-radius 4px, padding 3px 8px, JetBrains Mono 11px, color #888
- Status badge (top-right corner of card):
  completed → background rgba(40,202,65,0.15), color #28ca41, text "✓ Completed"
  in-progress → background rgba(255,189,46,0.15), color #ffbd2e, text "⚡ In Progress"
- Bottom row: GitHub icon button + Demo icon button (use lucide-react Github, ExternalLink)
  color #888, hover color #e8ff47

Show me the complete ProjectsWindow.tsx.
```

---

### Prompt 2.4 — Experience Window 💬

```
Create components/ExperienceWindow.tsx for the Antigravity macOS portfolio.
Window title: "Experience.md"

Import experience data from data/experience.ts.

Layout: Vertical timeline

Timeline design:
- Left side: vertical line, color #2a2a2a, 2px wide
- Each experience entry has a dot on the line: 10×10px circle
  current role: background #e8ff47
  past roles: background #2a2a2a, border 1px solid #555
- Entry card to the right of the dot:
  background #111111, border 1px solid #2a2a2a, border-radius 12px, padding 20px

Each entry content:
- Company name: Syne 700, 18px, color #f0ece4
- Role: DM Sans 500, 14px, color #e8ff47
- Duration: JetBrains Mono 12px, color #888
- "Current" badge (if current: true): background rgba(232,255,71,0.15),
  color #e8ff47, JetBrains Mono 10px, padding 3px 8px, border-radius 4px
- Contributions: bulleted list, DM Sans 14px, color #888, line-height 1.6
  bullet color #e8ff47

Animate each entry in with Framer Motion stagger: opacity 0→1, x -20→0

Show me the complete ExperienceWindow.tsx.
```

---

### Prompt 2.5 — Certifications Window 💬

```
Create components/CertsWindow.tsx for the Antigravity macOS portfolio.
Window title: "Certifications.app"

Since certifications aren't finalized yet, use 3 placeholder entries with this shape:
{ id, name, platform, date, verifyUrl, badgeIcon? }

Example placeholders:
- "JavaScript Algorithms and Data Structures" — freeCodeCamp — Jan 2024
- "React — The Complete Guide" — Udemy — Mar 2024
- "HubSpot Marketing Software" — HubSpot Academy — Nov 2023

Layout: CSS Grid, 2 columns on desktop, 1 on mobile, gap 16px

Each cert card:
- Background #111111, border 1px solid #2a2a2a, border-radius 12px, padding 20px
- Hover: border-color #e8ff47, transition 0.2s
- Badge/icon area: 48×48px rounded square, background #181818, centered icon or emoji 🎓
- Certificate name: Syne 600, 15px, color #f0ece4, margin-top 12px
- Platform: JetBrains Mono 11px, color #e8ff47, letter-spacing 2px, uppercase
- Date: DM Sans 12px, color #888
- "Verify ↗" link: DM Sans 12px, color #888, hover color #e8ff47,
  opens verifyUrl in new tab

Add a note at the top in JetBrains Mono 11px, color #555:
"// certifications list — more coming soon"

Show me the complete CertsWindow.tsx.
```

---

### Prompt 2.6 — Contact Window 💬

```
Create components/ContactWindow.tsx for the Antigravity macOS portfolio.
Window title: "Contact.app"

This window contains an EmailJS-powered contact form styled as a macOS dialog window.

Form layout (max-width 560px, centered):
- Window title bar inside: traffic light dots + "new-message.txt" label
- Background #111111, border 1px solid #2a2a2a, border-radius 12px, overflow hidden

Form fields (2-column grid for Name + Email, full-width for Subject + Message):
- Label: JetBrains Mono 11px, color #888, letter-spacing 2px, uppercase
- Input: background #181818, border 1px solid #2a2a2a, border-radius 8px,
  padding 12px 16px, color #f0ece4, DM Sans 14px
  focus: border-color #e8ff47, box-shadow 0 0 0 2px rgba(232,255,71,0.10)
- Textarea: min-height 120px, resize vertical
- Submit button: background #e8ff47, color #0a0a0a, Syne 700, 14px, uppercase,
  border-radius 8px, padding 14px, full width
  hover: translateY(-2px), box-shadow 0 8px 24px rgba(232,255,71,0.25)
  loading state: shows "Sending..." + disabled

EmailJS integration:
- Import emailjs from '@emailjs/browser'
- Use env vars: NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
- On success: show a success message inside the window (replace form)
  "Message sent! I'll get back to you soon. ✓" in #28ca41
- On error: show error message in #ff5f57

Social links row below the form:
GitHub, LinkedIn, Twitter/X, Email icons (lucide-react)
Each: 40×40px, background #181818, border 1px solid #2a2a2a, border-radius 8px
hover: border-color #e8ff47, color #e8ff47
Link to placeholder URLs for now.

Show me the complete ContactWindow.tsx with full EmailJS integration.
```

---

## PHASE 3 — Polish & Animations
### Goal: Everything feels like a real macOS desktop

---

### Prompt 3.1 — Window Manager & Z-Index System 🖥️

```
In the Antigravity portfolio project, update the window management system:

1. In context/DesktopContext.tsx:
   - windowOrder array tracks focus order (last item = topmost)
   - focusWindow(id) moves that id to end of array
   - Each window's zIndex = 100 + (windowOrder.indexOf(id) * 10)

2. In app/page.tsx:
   - When a window is clicked anywhere, call focusWindow(id)
   - Windows that are minimized should NOT render their component
     (remove from DOM, animate toward dock position)
   - Add a desktop right-click area that does nothing for now
     (placeholder for v2 context menu)

3. Animate minimize:
   When minimizeWindow is called, animate the window:
   scale to 0.1, opacity to 0, y to 400 (toward dock)
   duration 0.3s, then remove from openWindows

4. Restore minimized window from dock:
   If a dock icon is clicked and the window is minimized (not open),
   re-add to openWindows and animate back in normally.

Show me the updated DesktopContext.tsx and page.tsx.
```

---

### Prompt 3.2 — Typing Animation Hook 🖥️

```
Create hooks/useTypingAnimation.ts in the Antigravity portfolio.

This hook cycles through an array of strings with a typewriter effect:

Interface:
  useTypingAnimation(phrases: string[], typingSpeed?: number, deletingSpeed?: number, pauseTime?: number)
  Returns: { displayText: string, isTyping: boolean }

Behavior:
1. Type out the current phrase character by character (default 80ms per char)
2. Pause at the end for pauseTime (default 2000ms)
3. Delete character by character (default 40ms per char)
4. Move to next phrase, repeat

Use useEffect and useState only — no external libraries.

Then update components/AboutWindow.tsx to use this hook with phrases:
["Full Stack Developer", "Product Engineer", "Marketing Tech Builder", "AI Workflow Architect"]

The typed text should appear after the name in JetBrains Mono 16px, color #e8ff47,
followed by a blinking cursor (|) that blinks every 500ms.

Show me the complete useTypingAnimation.ts and the updated typing section of AboutWindow.tsx.
```

---

### Prompt 3.3 — Wallpaper & Background 🖥️

```
Update the main desktop page in the Antigravity portfolio to have a proper background.

Since a custom wallpaper image will be added later (/public/wallpaper.jpg),
create a beautiful CSS-only fallback background for now:

Use a layered background combining:
1. Base: #0a0a0a
2. A subtle radial gradient in top-left: rgba(232,255,71,0.04) at 0%, transparent at 60%
3. A subtle radial gradient in bottom-right: rgba(255,179,71,0.03) at 0%, transparent at 60%
4. A noise texture overlay using an SVG filter (feTurbulence) at very low opacity (0.025)

When /public/wallpaper.jpg exists, it should:
- Cover the full desktop as background-image
- Have an overlay: linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.7) 100%)
- Use next/image with fill, objectFit cover, priority true

Create a WallpaperBackground.tsx component that handles both cases
(with and without the image file) and renders the right one.

Show me the complete WallpaperBackground.tsx.
```

---

### Prompt 3.4 — Mobile Fallback Layout 🖥️

```
Create a mobile fallback layout for the Antigravity portfolio.

On screens below 768px (md breakpoint), the macOS desktop UI is hidden
and replaced with a standard single-page scrollable layout.

Create components/MobileLayout.tsx:

Structure:
- Sticky nav bar at top: "ANTIGRAVITY" logo (Syne 800, #e8ff47) + hamburger menu
- Sections stacked vertically, each 80px padding top/bottom:
  1. Hero: photo, name, role, typing animation, 2 CTA buttons
  2. Skills: same pill badges, grouped by category
  3. Projects: stacked cards (full width)
  4. Experience: same timeline design, full width
  5. Certifications: 2-col grid
  6. Contact: same form, full width
- Footer: social icons + copyright

In app/page.tsx:
- Detect screen size with a useMediaQuery hook (or CSS only via Tailwind hidden/block)
- Below md: render <MobileLayout /> only
- md and above: render the full macOS desktop

Use Tailwind responsive prefixes. Keep all the same data imports.
Show me MobileLayout.tsx and the updated page.tsx with the conditional rendering.
```

---

## PHASE 4 — SEO, Analytics & Deploy
### Goal: Live on Vercel with proper SEO

---

### Prompt 4.1 — SEO & Open Graph 🖥️

```
Update app/layout.tsx in the Antigravity portfolio with complete SEO metadata.

Add using Next.js 14 Metadata API:

1. Basic meta:
   title: { default: "Antigravity — Product Engineer", template: "%s | Antigravity" }
   description: "Product Engineer and Full Stack Developer specializing in React, Next.js,
     marketing automation (n8n, HubSpot), and AI workflows. Available for roles and freelance."
   keywords: ["product engineer", "full stack developer", "React", "Next.js",
     "marketing automation", "n8n", "HubSpot", "portfolio"]

2. Open Graph:
   type: "website"
   title, description (same as above)
   images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Antigravity Portfolio" }]

3. Twitter card:
   card: "summary_large_image"
   title, description, images

4. robots: { index: true, follow: true }

5. Create a public/robots.txt:
   User-agent: *
   Allow: /
   Sitemap: https://YOUR-DOMAIN.vercel.app/sitemap.xml

6. Add a app/sitemap.ts file that generates a sitemap returning just the root URL.

7. Add a app/not-found.tsx page:
   macOS-style "404.app" window with message "File not found on this desktop."
   and a button to go back to the desktop.

Show me all updated/new files.
```

---

### Prompt 4.2 — Resume Download Tracking 🖥️

```
Add resume download tracking to the Antigravity portfolio.

In the Dock component and AboutWindow, when the resume download is triggered:
1. Use the Vercel Analytics track() function:
   import { track } from '@vercel/analytics'
   track('resume_download', { source: 'dock' }) // or 'about_window'

2. The download itself should work like this:
   const handleResumeDownload = (source: string) => {
     track('resume_download', { source })
     const link = document.createElement('a')
     link.href = '/antigravity-resume.pdf'
     link.download = 'Antigravity-Resume.pdf'
     link.click()
   }

Also add tracking for:
- Window opens: track('window_open', { window: id })
- Contact form submission: track('contact_form_submit')
- Project link clicks: track('project_link_click', { project: title, type: 'github' | 'demo' })

Update the relevant components to include these tracking calls.
Show me the updated Dock.tsx, AboutWindow.tsx, ProjectsWindow.tsx, and ContactWindow.tsx.
```

---

### Prompt 4.3 — Environment Variables & EmailJS Setup ⚙️

```
Manual steps — do these yourself:

1. Go to https://www.emailjs.com and create a free account

2. Create a new Email Service:
   - Connect your Gmail or preferred email
   - Copy the Service ID

3. Create an Email Template with these variables:
   {{from_name}}, {{from_email}}, {{subject}}, {{message}}
   Subject line: "Portfolio Contact: {{subject}}"
   - Copy the Template ID

4. Copy your Public Key from EmailJS dashboard

5. Create .env.local in your project root:
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key

6. Add .env.local to .gitignore (it should already be there by default)

7. In Vercel dashboard (after deploying), add these same 3 environment variables
   under Project Settings → Environment Variables.
```

---

### Prompt 4.4 — GitHub & Vercel Deploy 🖥️

```
Prepare the Antigravity portfolio project for GitHub and Vercel deployment.

1. Create a .gitignore if not already present, ensure it includes:
   .env.local, .env*.local, node_modules/, .next/, out/

2. Create a README.md with:
   - Project title and description
   - Tech stack list
   - Local setup instructions (clone, npm install, create .env.local, npm run dev)
   - Deploy instructions (Vercel one-click)
   - Screenshot placeholder

3. Create a vercel.json in the root:
   {
     "framework": "nextjs",
     "buildCommand": "npm run build",
     "outputDirectory": ".next"
   }

4. Initialize git and push to GitHub:
   git init
   git add .
   git commit -m "feat: initial Antigravity portfolio"
   git remote add origin https://github.com/YOUR_USERNAME/antigravity-portfolio.git
   git push -u origin main

5. Go to vercel.com → New Project → Import from GitHub → select the repo
   → Add environment variables → Deploy

Show me the complete README.md and vercel.json.
```

---

## PHASE 5 — Final Content Swap
### Goal: Replace all placeholders with real content

---

### Prompt 5.1 — Replace Placeholder Data ⚙️

```
Manual checklist — do these before final launch:

ASSETS TO ADD to /public/:
□ photo.jpg — your profile photo (min 400×400px, circular crop in CSS)
□ wallpaper.jpg — desktop background (1920×1080px recommended)
□ antigravity-resume.pdf — your latest resume
□ og-image.jpg — 1200×630px social preview image
□ thumbnails/project-1.jpg — Marketing Automation Workflow screenshot
□ thumbnails/project-2.jpg — LinkedIn Lead Gen Tool screenshot
□ thumbnails/project-3.jpg — Idea Validation Dashboard screenshot
□ favicon.ico — 32×32px

DATA TO UPDATE in /data/:
□ data/projects.ts — add real GitHub URLs, demo URLs, final descriptions
□ data/experience.ts — replace placeholder dates with exact employment dates
□ data/skills.ts — adjust proficiency levels if needed
□ Update social links in ContactWindow.tsx (GitHub, LinkedIn, Twitter/X URLs)
□ Update professional email in EmailJS template
□ Update certifications in CertsWindow.tsx with real certs

FINAL CHECKS:
□ Test contact form end-to-end (submit → receive email)
□ Test resume download on desktop and mobile
□ Run Lighthouse audit (target 90+ performance)
□ Test all windows open/close/drag
□ Test on iPhone Safari and Chrome Android
□ Check all external links open in new tab
□ Verify OG image preview using https://opengraph.xyz
```

---

### Prompt 5.2 — Performance Audit & Fix 🖥️

```
Run a performance audit on the Antigravity portfolio and fix any issues.

1. First, build the production bundle:
   npm run build
   npm run start

2. Open Chrome DevTools → Lighthouse → run Performance + SEO + Accessibility audit

3. For each issue found, apply the following common fixes:

If images are too large:
- Convert to WebP using: npx sharp-cli input.jpg -o output.webp
- Add proper width/height to all next/image components
- Add sizes prop: sizes="(max-width: 768px) 100vw, 50vw"

If bundle is too large:
- Add dynamic imports for all Window components:
  const AboutWindow = dynamic(() => import('@/components/AboutWindow'))
  Do this for ALL 6 window components in page.tsx

If fonts are blocking render:
- Ensure all fonts use next/font (not @import in CSS)
- Add display: 'swap' to font options

If Framer Motion is too large:
- Use LazyMotion with domAnimation features:
  import { LazyMotion, domAnimation, m } from 'framer-motion'
  Wrap app with <LazyMotion features={domAnimation}>
  Replace <motion.div> with <m.div>

Apply all relevant fixes and show me the updated files.
```

---

### Prompt 5.3 — Final QA Checklist 💬

```
Review the complete Antigravity portfolio codebase and run a final QA check.

Check the following and list any issues found:

FUNCTIONALITY:
□ All 6 dock icons open their respective windows
□ Windows are draggable without going off-screen
□ Window close (red dot) removes the window
□ Window minimize (yellow dot) hides the window, restores on dock click
□ Multiple windows can be open simultaneously
□ Clicking a window brings it to the front (z-index focus)
□ Typing animation cycles correctly in About window
□ Resume download triggers file download
□ Contact form submits and shows success state
□ All project GitHub/demo links work
□ Live clock in menu bar ticks every second

DESIGN:
□ Color tokens match design doc (accent #e8ff47, bg #0a0a0a, etc.)
□ Fonts loaded correctly (Syne headings, DM Sans body, JetBrains Mono labels)
□ Traffic light dots are correct colors (red/yellow/green)
□ Hover states work on dock icons, skill badges, project cards
□ Mobile fallback renders correctly below 768px

PERFORMANCE:
□ Lighthouse score 90+
□ No console errors in production build
□ All images have alt text
□ No missing env variables

List any bugs or improvements found and provide fixes.
```

---

## Quick Reference — Component Map

```
app/
  page.tsx              ← Desktop shell, renders all windows
  layout.tsx            ← Meta, fonts, Analytics

components/
  MenuBar.tsx           ← Top bar with clock            [Prompt 1.4]
  Dock.tsx              ← Bottom icon bar               [Prompt 1.5]
  Window.tsx            ← Reusable draggable window     [Prompt 1.6]
  WallpaperBackground.tsx ← Desktop background          [Prompt 3.3]
  MobileLayout.tsx      ← Mobile fallback               [Prompt 3.4]
  AboutWindow.tsx       ← Hero / bio / typing           [Prompt 2.1]
  SkillsWindow.tsx      ← Skill badges by category      [Prompt 2.2]
  ProjectsWindow.tsx    ← Project cards                 [Prompt 2.3]
  ExperienceWindow.tsx  ← Timeline                      [Prompt 2.4]
  CertsWindow.tsx       ← Certification cards           [Prompt 2.5]
  ContactWindow.tsx     ← EmailJS form                  [Prompt 2.6]

context/
  DesktopContext.tsx    ← Window open/close/focus state [Prompt 1.7]

hooks/
  useTypingAnimation.ts ← Typewriter effect hook        [Prompt 3.2]

data/
  projects.ts           ← Project data                  [Prompt 1.3]
  skills.ts             ← Skills data                   [Prompt 1.3]
  experience.ts         ← Work history data             [Prompt 1.3]
```

---

## Recommended Tools

| Tool | Purpose | URL |
|---|---|---|
| Claude Code | Execute all 🖥️ prompts | claude.ai/code |
| Vercel | Hosting + deploy | vercel.com |
| EmailJS | Contact form | emailjs.com |
| Vercel Analytics | Visit tracking | vercel.com/analytics |
| opengraph.xyz | Test OG preview image | opengraph.xyz |
| Lighthouse | Performance audit | Chrome DevTools |
| sharp-cli | Image → WebP conversion | `npm i -g sharp-cli` |

---

*Antigravity Portfolio — Build Prompts | April 2026 | v1.0*
*Total prompts: 18 | Estimated completion: 14–20 days part-time*
