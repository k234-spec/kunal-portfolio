# Product Requirements Document
## Antigravity — Personal Developer Portfolio
### macOS Desktop Theme | Next.js 14 | v1.0
**Prepared:** April 2026 | **Status:** Draft — Pending Development

---

## 1. Document Overview

| Field | Detail |
|---|---|
| **Document Owner** | Antigravity |
| **Version** | 1.0 — Initial |
| **Date** | April 2026 |
| **Status** | Draft — Pending Development |
| **Portfolio URL** | TBD (Vercel deployment) |
| **Theme Inspiration** | [muzamil-macfolio.vercel.app](https://muzamil-macfolio.vercel.app) — macOS Desktop UI |

---

## 2. Goals & Success Metrics

### 2.1 Primary Goals

- Land a Full Stack Developer role at a tech company or startup
- Attract freelance clients for web development and marketing automation
- Showcase skills to product-driven companies and startups
- Establish a professional online presence as a Product Engineer

### 2.2 Success Metrics

| Metric | Target | Timeframe |
|---|---|---|
| Recruiter profile views | 50+ per month | Within 3 months |
| Resume downloads | 20+ per month | Within 3 months |
| Contact form inquiries | 5+ per month | Within 3 months |
| LinkedIn profile visits from portfolio | 30+ per month | Within 3 months |
| Page load speed (LCP) | Under 2 seconds | At launch |
| Lighthouse Performance score | 90+ | At launch |

---

## 3. Target Audience

| Audience | Who They Are | What They Look For |
|---|---|---|
| Tech Recruiters | HR/talent teams at IT companies | Skills, projects, resume, clean UI |
| Startup Founders | Early-stage tech startups | Problem-solving, side projects, execution |
| Freelance Clients | SMBs needing web dev / automation | Portfolio work, contact info, turnaround |
| Product Managers | PMs hiring associate PMs | Product thinking, documentation, tools used |

---

## 4. Design & UX Requirements

### 4.1 Theme — macOS Desktop UI

The portfolio replicates a macOS desktop experience in the browser, creating a unique and memorable first impression that differentiates Antigravity from standard portfolio sites.

| Element | Specification |
|---|---|
| **Desktop Wallpaper** | Custom dark background — gradient or abstract (to be provided) |
| **Dock (Bottom Bar)** | Clickable icons for: About, Skills, Projects, Experience, Resume, Contact |
| **Window System** | Each section opens as a draggable macOS window with traffic light buttons (red/yellow/green) |
| **Menu Bar (Top)** | Displays name, live clock, current date, Wi-Fi icon, battery indicator |
| **Right-click Menu** | Custom desktop context menu *(v2 optional feature)* |
| **Color Palette** | Dark mode — deep charcoal `#0a0a0a`, accent yellow-green `#e8ff47`, warm white text |
| **Typography** | Syne (headings, 800 weight) + DM Sans (body) + JetBrains Mono (labels/code) |
| **Responsiveness** | Desktop-first. Mobile shows a simplified single-page fallback layout |

### 4.2 Animations & Interactions

- Window open/close — smooth scale + fade (Framer Motion)
- Dock icon bounce on hover
- Window drag — freely draggable across the desktop canvas
- Window minimize — animates shrinking to dock icon
- Typing animation in Hero/About window cycling through roles
- Smooth scroll within windows
- Cursor blink effect on typed text

---

## 5. Sections & Content Requirements

### 5.1 Hero / About Window

| Field | Value |
|---|---|
| **Window Title** | `Hello_World.txt` |
| **Profile Photo** | Professional photo — circular crop, high quality *(to be provided)* |
| **Name** | Antigravity |
| **Title** | Product Engineer |
| **Tagline** | *"Building full-stack products at the intersection of code, automation, and strategy."* |
| **Short Bio** | 3–4 lines describing background, current role, and engineering direction |
| **CTA Buttons** | "View My Work" → opens Projects window │ "Download Resume" → PDF download |
| **Typing Animation** | Cycles through: `Full Stack Developer` / `Product Engineer` / `Marketing Tech Builder` |

> **📌 Content needed:** Profile photo (min 400×400px JPG/PNG), final bio paragraph, preferred tagline/one-liner.

---

### 5.2 Skills Window

**Window Title:** `Skills.app`  
**Layout:** Grouped skill pill/badge cards with category sections

| Category | Skills |
|---|---|
| Frontend | React.js, HTML, CSS, JavaScript (ES6+), Next.js *(learning)* |
| Backend | Node.js *(learning)*, Express.js *(learning)*, REST APIs |
| Database | MongoDB *(learning)*, Basic SQL |
| Marketing Tech | HubSpot CRM, Apollo, LinkedIn Outreach, Lead Generation |
| AI & Automation | n8n, MCP Servers, AI Workflow Automation, Prompt Engineering |
| Tools & Others | Git/GitHub, ERP Systems, Dashboard Development, Documentation |

Each skill displays as a pill badge. Optionally add proficiency indicator: Beginner / Intermediate / Advanced.

---

### 5.3 Projects Window

**Window Title:** `Projects.finder`  
**Layout:** Card grid — 3 columns on desktop, 1 column on mobile

#### Project 1 — Marketing Automation Workflow
| Field | Detail |
|---|---|
| Title | Marketing Automation Workflow with n8n |
| Description | Automated lead capture and nurturing pipeline using n8n. Connects LinkedIn, HubSpot CRM, and email sequences to reduce manual outreach time. |
| Stack | n8n, HubSpot API, LinkedIn, Webhooks, JSON |
| Links | GitHub / Demo *(to be provided)* |
| Status | ✅ Completed |

#### Project 2 — LinkedIn Lead Gen Tool
| Field | Detail |
|---|---|
| Title | LinkedIn Lead Generation Automation Tool |
| Description | Semi-automated system for identifying and outreaching to B2B decision-makers on LinkedIn. Used for enterprise and partner campaigns. |
| Stack | LinkedIn, Apollo, HubSpot, n8n, Google Sheets |
| Links | GitHub / Demo *(to be provided)* |
| Status | ✅ Completed / Actively Used |

#### Project 3 — Idea Validation Dashboard
| Field | Detail |
|---|---|
| Title | Idea Validation Dashboard |
| Description | React-based dashboard to validate startup/product ideas by aggregating market signals, competitor data, and user interest metrics in one view. |
| Stack | React.js, JavaScript, REST APIs, CSS |
| Links | GitHub / Demo *(to be provided)* |
| Status | 🚧 In Progress |

> **📌 Content needed:** GitHub repo links, live demo URLs, project thumbnail screenshots (min 800×450px each), final descriptions.

---

### 5.4 Work Experience Window

**Window Title:** `Experience.md`  
**Layout:** Vertical timeline card list

| Company | Role | Duration | Key Contributions |
|---|---|---|---|
| Abacus Desk IT Solution | Marketing Automation Analyst | Current | B2B lead gen, LinkedIn campaigns, HubSpot CRM, Basiq360 promotion |
| Innovate Labs | Web Developer Intern | Past | React.js dashboard, AR/VR app UI, website development |
| Pharma Company | ERP Implementation Specialist | Past | Master data, BOM config, inventory, batch tracking, ERP reporting |
| BPO | Customer Service Representative | Past (3–4 months) | Communication skills, customer handling |

> **📌 Content needed:** Exact employment dates for all roles, company logos (optional), achievements/metrics per role.

---

### 5.5 Certifications Window

**Window Title:** `Certifications.app`  
**Layout:** Badge/card grid — 2–3 per row

Each card shows: Certificate name, issuing platform, date earned, verification link.

> **📌 Content needed:** Full certifications list with name, platform, date, and verification URLs. Badge images optional.

---

### 5.6 Resume Download

| Field | Detail |
|---|---|
| Trigger | Dock "Resume" icon + CTA in Hero section |
| Action | Direct PDF download — opens and auto-downloads in new tab |
| File | `antigravity-resume.pdf` placed in `/public/` |
| Status | ✅ Ready (confirmed) |

---

### 5.7 Contact Form Window

**Window Title:** `Contact.app`

| Field | Detail |
|---|---|
| Form Fields | Full Name (required), Email Address (required), Subject (required), Message (required) |
| Submit Action | Send via EmailJS or Formspree — no backend required |
| Success State | Inline success message inside window after submission |
| Social Links | GitHub, LinkedIn, Twitter/X, Email — shown as icon buttons below form |

> **📌 Content needed:** Professional email to receive submissions, GitHub/LinkedIn/Twitter profile URLs.

---

## 6. Technical Requirements

### 6.1 Tech Stack

See `tech-stack.md` for full details.

| Layer | Technology | Reason |
|---|---|---|
| Framework | Next.js 14 (App Router) | SSR/SSG, SEO, performance |
| Styling | Tailwind CSS | Rapid utility-first UI |
| Animations | Framer Motion | Smooth macOS-like window animations |
| State | React useState / useContext | Window open/closed, active app state |
| Contact Form | EmailJS | No backend, free tier |
| Hosting | Vercel | Free tier, GitHub auto-deploy |
| Analytics | Vercel Analytics | Track visits, resume downloads |

### 6.2 SEO Requirements

- Meta title: `Antigravity — Product Engineer | Full Stack Developer`
- Meta description: Short bio targeting recruiter/freelance keywords
- Open Graph tags for LinkedIn and Twitter/X link previews
- `robots.txt` and `sitemap.xml` — auto-generated by Next.js
- Semantic HTML: proper use of `h1`, `h2`, `main`, `section`, `article`

### 6.3 Performance Requirements

| Metric | Target |
|---|---|
| Lighthouse Performance | 90+ |
| First Contentful Paint (FCP) | Under 1.5s |
| Largest Contentful Paint (LCP) | Under 2.5s |
| Total initial bundle size | Under 500KB |
| Image format | WebP via `next/image` |

---

## 7. Recommended Folder Structure

```
antigravity-portfolio/
├── app/
│   ├── layout.tsx            ← Root layout (meta, fonts)
│   ├── page.tsx              ← Main desktop page
│   └── globals.css           ← Global styles
├── components/
│   ├── Desktop.tsx           ← macOS desktop container
│   ├── Dock.tsx              ← Bottom dock with app icons
│   ├── MenuBar.tsx           ← Top macOS menu bar
│   ├── Window.tsx            ← Reusable draggable window
│   ├── AboutWindow.tsx       ← Hero / About content
│   ├── SkillsWindow.tsx      ← Skills content
│   ├── ProjectsWindow.tsx    ← Project cards
│   ├── ExperienceWindow.tsx  ← Work timeline
│   ├── CertsWindow.tsx       ← Certifications
│   └── ContactWindow.tsx     ← Contact form
├── public/
│   ├── photo.jpg             ← Profile photo
│   ├── antigravity-resume.pdf
│   └── wallpaper.jpg         ← Desktop background
├── data/
│   ├── projects.ts
│   ├── skills.ts
│   └── experience.ts
└── package.json
```

---

## 8. Assets & Content Checklist

| Asset / Content | Details | Status |
|---|---|---|
| Profile Photo | JPG/PNG, min 400×400px, professional | ✅ Ready |
| Resume PDF | Up to date | ✅ Ready |
| Desktop Wallpaper | 1920×1080px dark background | ⏳ Needed |
| Bio Paragraph | 2–4 sentences for About section | ⏳ Needed |
| Project Screenshots | 3 images, min 800×450px each | ⏳ Needed |
| Project GitHub Links | Repo URLs for all 3 projects | ⏳ Needed |
| Certifications List | Name, platform, date, verify URL | ⏳ Needed |
| Employment Dates | Exact dates for all 4 roles | ⏳ Needed |
| Contact Email | Professional email for form | ⏳ Needed |
| Social Media URLs | GitHub, LinkedIn, Twitter/X | ⏳ Needed |
| Company Logos | For Work Experience cards | ⬜ Optional |

---

## 9. Development Phases

| Phase | Name | Deliverables | Est. Duration |
|---|---|---|---|
| 1 | Setup & Core Layout | Next.js init, macOS desktop shell, MenuBar, Dock, Window component | 3–4 days |
| 2 | Content Windows | About, Skills, Projects, Experience, Certifications | 5–7 days |
| 3 | Contact & Resume | EmailJS form, PDF download | 2–3 days |
| 4 | Polish & Animations | Framer Motion, responsiveness, mobile fallback | 3–4 days |
| 5 | SEO & Deploy | Meta/OG tags, Vercel deploy, analytics setup | 1–2 days |

**Total estimated: 14–20 days**

---

## 10. Out of Scope (v1.0)

- Blog section — deferred to v2.0
- CMS integration (Sanity, Contentful)
- User authentication
- E-commerce / payment features
- Right-click desktop context menu — v2.0 optional
- Multi-language support

---

## 11. Open Questions

| # | Question | Decision Needed By |
|---|---|---|
| 1 | Which desktop wallpaper / background to use? | Before Phase 1 |
| 2 | Skills — proficiency bars or just badges? | Before Phase 2 |
| 3 | EmailJS (free) or Formspree for contact form? | Before Phase 3 |
| 4 | Boot/loading screen before desktop loads? | Before Phase 1 |
| 5 | Custom domain (e.g., antigravity.dev) or Vercel subdomain? | Before Phase 5 |

---

*Antigravity Portfolio PRD | Product Engineer | April 2026 | v1.0*
