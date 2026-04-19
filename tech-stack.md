# Tech Stack
## Antigravity — macOS Desktop Portfolio
### Technology Decisions & Architecture | v1.0

---

## 1. Overview

This document defines every technology choice for the Antigravity portfolio, the rationale behind each decision, and how all layers connect. The goal is a **high-performance, zero-backend, visually distinctive** portfolio deployable in minutes via Vercel.

---

## 2. Core Stack at a Glance

| Layer | Technology | Version |
|---|---|---|
| Framework | **Next.js** | 14 (App Router) |
| Language | **TypeScript** | 5.x |
| Styling | **Tailwind CSS** | 3.x |
| Animations | **Framer Motion** | 11.x |
| State Management | **React Context + useState** | Built-in (React 18) |
| Contact Form | **EmailJS** | 4.x |
| Hosting / Deploy | **Vercel** | Free tier |
| Analytics | **Vercel Analytics** | Free tier |
| Version Control | **GitHub** | — |

---

## 3. Framework — Next.js 14 (App Router)

**Why Next.js over plain React / Vite?**

| Concern | Next.js Advantage |
|---|---|
| SEO | Server-side rendering generates complete HTML for crawlers |
| Performance | Automatic code splitting, image optimization via `next/image` |
| Routing | File-based App Router — zero configuration |
| Deployment | First-class Vercel integration, zero-config CI/CD |
| Future-proofing | Server Components ready if API routes ever needed |

**Key Next.js features used:**

- `app/page.tsx` — single-page desktop shell
- `app/layout.tsx` — root layout with meta tags, OG tags, font loading
- `next/image` — WebP conversion, lazy loading, blur placeholder for all images
- `next/font` — zero-layout-shift font loading (Syne, DM Sans, JetBrains Mono from Google Fonts)
- `app/globals.css` — CSS custom properties (`--bg`, `--accent`, etc.)

---

## 4. Language — TypeScript

TypeScript is used throughout (`.tsx` / `.ts` files). No plain `.js` files in `src/`.

**Benefits for this project:**

- Component props typed — Window, Dock icon, Project card, Skill badge all have explicit interfaces
- Data files (`data/projects.ts`, `data/skills.ts`) are strongly typed — prevents runtime errors
- IDE autocomplete speeds up development

**Example type definitions:**

```typescript
// data/projects.ts
export interface Project {
  id: string
  title: string
  description: string
  stack: string[]
  githubUrl?: string
  demoUrl?: string
  thumbnail: string
  status: 'completed' | 'in-progress'
}

// components/Window.tsx
interface WindowProps {
  id: string
  title: string
  icon: string
  children: React.ReactNode
  defaultPosition?: { x: number; y: number }
  onClose: () => void
  onMinimize: () => void
}
```

---

## 5. Styling — Tailwind CSS

**Why Tailwind over CSS Modules or styled-components?**

- Utility-first = no naming overhead, fast iteration
- Purged in production = minimal CSS bundle
- JIT mode = any arbitrary value available (`bg-[#0a0a0a]`)
- Works seamlessly with Framer Motion and `className` composition

**Custom Tailwind config additions (`tailwind.config.ts`):**

```typescript
theme: {
  extend: {
    colors: {
      bg:        '#0a0a0a',
      surface:   '#111111',
      'surface-2': '#181818',
      'surface-3': '#202020',
      border:    '#2a2a2a',
      accent:    '#e8ff47',
      'accent-2':'#ffb347',
      text:      '#f0ece4',
      muted:     '#888888',
      dim:       '#555555',
    },
    fontFamily: {
      syne:  ['Syne', 'sans-serif'],
      sans:  ['DM Sans', 'sans-serif'],
      mono:  ['JetBrains Mono', 'monospace'],
    },
    borderRadius: {
      window: '12px',
      pill:   '999px',
    },
    boxShadow: {
      window: '0 8px 40px rgba(0,0,0,0.6)',
      dock:   '0 8px 32px rgba(0,0,0,0.4)',
    },
  },
}
```

---

## 6. Animations — Framer Motion

**Why Framer Motion?**

- Native support for `AnimatePresence` — handles mount/unmount animations (window open/close)
- Drag API built-in — `drag`, `dragConstraints`, `dragElastic` on Window component
- Spring physics — natural-feeling window interactions
- `useMotionValue` / `useTransform` — for dock icon magnification effect

**Key Framer Motion patterns used:**

```typescript
// Window open/close (AnimatePresence wraps each window)
<motion.div
  initial={{ opacity: 0, scale: 0.92, y: 20 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  exit={{ opacity: 0, scale: 0.88, y: 10 }}
  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
/>

// Draggable window
<motion.div
  drag
  dragMomentum={false}
  dragConstraints={desktopRef}
  style={{ x, y }}
/>

// Dock icon hover bounce
<motion.div whileHover={{ y: -8, scale: 1.15 }} />

// Staggered entrance
<motion.div
  variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
  initial="hidden"
  animate="show"
  transition={{ staggerChildren: 0.08 }}
/>
```

---

## 7. State Management — React Context

No external state library needed. The app state is simple:

```typescript
// context/DesktopContext.tsx
interface DesktopState {
  openWindows: string[]           // IDs of open windows
  minimizedWindows: string[]      // IDs of minimized windows
  activeWindow: string | null     // Currently focused window (z-index)
  openWindow: (id: string) => void
  closeWindow: (id: string) => void
  minimizeWindow: (id: string) => void
  focusWindow: (id: string) => void
}
```

This context is consumed by the Dock (to show active dots), each Window (to handle close/minimize), and the Desktop canvas (to render only open windows).

---

## 8. Contact Form — EmailJS

**Why EmailJS over Formspree, Resend, or a custom API route?**

| Option | Backend needed | Free tier | Setup time |
|---|---|---|---|
| EmailJS | ❌ No | 200 emails/month | ~15 min |
| Formspree | ❌ No | 50 submissions/month | ~5 min |
| Resend | ✅ Yes (API route) | 100 emails/day | ~30 min |
| Custom SMTP | ✅ Yes | — | Hours |

EmailJS wins for a portfolio: no backend, generous free tier, easy template setup.

**Integration:**

```typescript
import emailjs from '@emailjs/browser'

const sendEmail = async (formData: ContactFormData) => {
  await emailjs.send(
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
    { from_name, from_email, subject, message },
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
  )
}
```

Environment variables (non-secret, safe to expose client-side):
```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
```

---

## 9. Fonts — next/font

```typescript
// app/layout.tsx
import { Syne, DM_Sans } from 'next/font/google'
import localFont from 'next/font/local'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-syne',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
})
```

JetBrains Mono loaded via CSS `@import` from Google Fonts (or `next/font/google`).

---

## 10. Hosting & Deployment — Vercel

**Why Vercel?**

- Automatic preview deployments on every `git push`
- Zero-config Next.js optimization
- Free custom domain with SSL
- Edge network CDN — fast globally
- Vercel Analytics included free

**Deployment flow:**

```
Local dev  →  git push  →  GitHub  →  Vercel auto-build  →  Live URL
```

**Environment variables** set in Vercel dashboard (not in `.env` committed to git):
```
NEXT_PUBLIC_EMAILJS_SERVICE_ID
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
```

---

## 11. Analytics — Vercel Analytics

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

Tracks: page views, unique visitors, referrers. No cookies, GDPR-compliant.

For resume download tracking, use:
```typescript
import { track } from '@vercel/analytics'
track('resume_download')
```

---

## 12. Image Optimization

All images use `next/image`:

```typescript
import Image from 'next/image'

<Image
  src="/photo.jpg"
  alt="Antigravity — Product Engineer"
  width={400}
  height={400}
  className="rounded-full"
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
  priority  // for above-the-fold images
/>
```

- Format: WebP (auto-converted by Next.js)
- Lazy loading: default for all non-priority images
- Sizes: responsive `sizes` prop for srcset generation

---

## 13. SEO

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: 'Antigravity — Product Engineer | Full Stack Developer',
  description: 'Product Engineer specializing in full-stack development, marketing automation, and AI workflows.',
  openGraph: {
    title: 'Antigravity — Product Engineer',
    description: 'Full Stack Developer & Marketing Tech Builder',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Antigravity — Product Engineer',
    images: ['/og-image.jpg'],
  },
}
```

---

## 14. Development Setup

### Prerequisites

- Node.js 20+ (LTS)
- npm 10+ or pnpm 9+

### Commands

```bash
# Clone and install
git clone https://github.com/antigravity/portfolio
cd portfolio
npm install

# Development server (localhost:3000)
npm run dev

# Production build + local preview
npm run build
npm run start

# Type check
npm run type-check

# Lint
npm run lint
```

### Recommended VS Code Extensions

- ESLint
- Tailwind CSS IntelliSense
- Prettier
- TypeScript Importer
- Auto Rename Tag

---

## 15. Package Summary

```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "framer-motion": "^11.0.0",
    "@emailjs/browser": "^4.3.0",
    "@vercel/analytics": "^1.3.0"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@types/node": "^20.0.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.2.0"
  }
}
```

---

## 16. Performance Targets

| Metric | Target | Strategy |
|---|---|---|
| Lighthouse Performance | 90+ | `next/image`, font optimization, code splitting |
| First Contentful Paint | < 1.5s | Priority images, minimal initial JS |
| Largest Contentful Paint | < 2.5s | Hero image preloaded |
| Total Blocking Time | < 200ms | Lazy-load non-critical components |
| Bundle size (initial) | < 500KB | Tree-shaking, dynamic imports for windows |
| CLS | < 0.1 | `next/font` eliminates font layout shift |

**Dynamic import for non-critical windows:**
```typescript
const ProjectsWindow = dynamic(() => import('@/components/ProjectsWindow'), {
  loading: () => <WindowSkeleton />,
})
```

---

*Antigravity Portfolio — Tech Stack | April 2026 | v1.0*
