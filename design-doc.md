# Design Document
## Antigravity — macOS Desktop Portfolio
### Visual & Interaction Design Specification | v1.0

---

## 1. Design Philosophy

The Antigravity portfolio is built around one core idea: **the browser is a desktop**. Instead of a conventional scroll-and-section layout, visitors land on a fully interactive macOS-style desktop environment. Windows open, minimize, and drag. A dock pulses at the bottom. A menu bar ticks in real time at the top. This is not a gimmick — it signals that the engineer behind it thinks in systems, not just pages.

**Design pillars:**
- **Immersion** — the experience should feel like booting into a real OS
- **Dark aesthetic** — deep blacks, glowing accents, intentional contrast
- **Motion with purpose** — every animation communicates something (open, close, active, idle)
- **Typographic hierarchy** — three distinct typefaces, each with a role

---

## 2. Color System

### Core Palette

| Token | Hex | Usage |
|---|---|---|
| `--bg` | `#0a0a0a` | Desktop background base |
| `--surface` | `#111111` | Window background |
| `--surface-2` | `#181818` | Input fields, cards |
| `--surface-3` | `#202020` | Hover states, secondary panels |
| `--border` | `#2a2a2a` | All borders and dividers |
| `--accent` | `#e8ff47` | Primary accent — yellow-green |
| `--accent-2` | `#ffb347` | Secondary accent — warm orange |
| `--text` | `#f0ece4` | Primary text — warm white |
| `--text-muted` | `#888888` | Secondary labels |
| `--text-dim` | `#555555` | Tertiary / placeholder text |

### Traffic Light System (Window Controls)

| Color | Hex | macOS Action |
|---|---|---|
| Red | `#ff5f57` | Close window |
| Yellow | `#ffbd2e` | Minimize window |
| Green | `#28ca41` | Maximize / zoom |

### Usage Rules

- Never use pure white (`#ffffff`) — always use warm white `#f0ece4`
- Accent `#e8ff47` is reserved for: active states, CTAs, highlighted labels, cursor blink
- Background surfaces must stay within the `#0a0a0a` → `#202020` range
- All borders use `rgba(255,255,255,0.08)` or `#2a2a2a` — never harsh

---

## 3. Typography

### Typeface Stack

| Role | Typeface | Weights | Usage |
|---|---|---|---|
| Display / Headings | **Syne** | 400, 600, 700, 800 | Hero title, section headers, window titles |
| Body / UI | **DM Sans** | 300, 400, 500, 600 | Paragraphs, cards, form labels, buttons |
| Code / Mono | **JetBrains Mono** | 400, 500 | Menu bar, labels, tech stack badges, typing animation |

### Scale

| Label | Size | Weight | Font | Letter Spacing |
|---|---|---|---|---|
| Hero Title | `clamp(48px, 8vw, 96px)` | 800 | Syne | `-3px` |
| Section Title | `clamp(32px, 5vw, 52px)` | 800 | Syne | `-2px` |
| Window Title | `14px` | 500 | DM Sans | `0` |
| Body | `16px` | 400 | DM Sans | `0` |
| Label / Tag | `11px` | 400 | JetBrains Mono | `+4px` (uppercase) |
| Badge / Pill | `12px` | 500 | DM Sans | `0` |
| Menu Bar | `12px` | 400 | JetBrains Mono | `0` |

---

## 4. Layout System

### Desktop Canvas

```
┌─────────────────────────────────────────────────────────┐
│  macOS Menu Bar (28px, blur backdrop, fixed top)        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│             Desktop Wallpaper / Background              │
│                                                         │
│   ┌──────────────────────┐                              │
│   │  Window (draggable)  │                              │
│   │  ● ● ●  Title.app    │                              │
│   │  ─────────────────── │                              │
│   │  Content area        │                              │
│   └──────────────────────┘                              │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  Dock (centered, frosted glass, fixed bottom 20px)      │
└─────────────────────────────────────────────────────────┘
```

### Container

- Max width: `1100px`
- Horizontal padding: `32px`
- Section vertical padding: `80px`

---

## 5. Component Specifications

### 5.1 macOS Menu Bar

```
Height:           28px
Background:       rgba(0,0,0,0.55) + backdrop-filter: blur(20px)
Border bottom:    1px solid rgba(255,255,255,0.08)
Font:             JetBrains Mono, 12px
Left content:     Logo (Syne 800, accent color), nav labels
Right content:    Live clock, Wi-Fi icon, battery icon
```

### 5.2 macOS Dock

```
Position:         absolute bottom: 20px, centered (translateX -50%)
Background:       rgba(255,255,255,0.10) + backdrop-filter: blur(20px)
Border:           1px solid rgba(255,255,255,0.15)
Border radius:    20px
Padding:          8px 16px
Gap between icons: 8px
Box shadow:       0 8px 32px rgba(0,0,0,0.4)
```

#### Dock Icon

```
Size:             44×44px
Background:       #181818
Border radius:    12px
Border:           1px solid #2a2a2a
Icon font size:   20px (emoji or SVG)
Hover:            translateY(-8px) scale(1.15), transition 0.2s
```

### 5.3 Window Component

```
Background:       #111111
Border:           1px solid #2a2a2a
Border radius:    12px
Box shadow:       0 8px 40px rgba(0,0,0,0.6)
Overflow:         hidden
Min width:        400px
Min height:       300px
```

#### Window Title Bar

```
Height:           ~40px
Background:       #181818
Padding:          12px 16px
Border bottom:    1px solid #2a2a2a
Layout:           flex, align-items center, gap 8px
Title font:       JetBrains Mono, 12px, color #888
```

#### Traffic Light Dots

```
Size:             12×12px
Border radius:    50%
Gap:              6px
Colors:           #ff5f57 / #ffbd2e / #28ca41
Cursor:           pointer
```

#### Window Body

```
Padding:          32px
Overflow-y:       auto
Max height:       calc(100vh - 200px)
```

### 5.4 Form Window (Contact)

```
Max width:        680px
Margin:           0 auto
```

#### Form Input / Textarea

```
Background:       #181818
Border:           1px solid #2a2a2a
Border radius:    8px
Padding:          12px 16px
Font:             DM Sans, 14px
Color:            #f0ece4
Focus border:     #e8ff47
Focus shadow:     0 0 0 2px rgba(232,255,71,0.10)
```

#### Submit Button

```
Background:       #e8ff47
Color:            #0a0a0a
Border radius:    8px
Padding:          14px 32px
Font:             Syne, 700, 14px, uppercase
Letter spacing:   1px
Width:            100%
Hover:            translateY(-2px) + box-shadow 0 8px 24px rgba(232,255,71,0.25)
Active:           translateY(0)
Disabled:         opacity 0.5
```

---

## 6. Hero Section

### Layout

```
Height:           100vh (min 600px)
Display:          flex, column, center
Overflow:         hidden
Position:         relative
```

### Background Wallpaper

```
Position:         absolute inset 0
Z-index:          0
Transition:       opacity 1.5s ease-in-out (for wallpaper slider)
Cover:            background-size cover, center
```

### Overlay Gradient

```
Position:         absolute inset 0
Z-index:          1
Gradient:         linear-gradient(to bottom,
                    rgba(0,0,0,0.50) 0%,
                    rgba(0,0,0,0.30) 50%,
                    rgba(0,0,0,0.85) 100%)
```

### Hero Title

```
Font:             Syne, clamp(48px–96px), weight 800
Letter spacing:   -3px
Line height:      1
Accent word:      color #e8ff47
```

### Typing Animation

```
Font:             JetBrains Mono, 18px
Color:            #e8ff47
Height:           28px
Cursor blink:     2px × 20px, #e8ff47, animation blink 1s step-end infinite
```

---

## 7. Skill Badges

```
Display:          inline-flex
Background:       #181818
Border:           1px solid #2a2a2a
Border radius:    999px (pill)
Padding:          6px 14px
Font:             DM Sans, 12px, weight 500
Color:            #f0ece4
Transition:       border-color 0.2s, background 0.2s
Hover:            border-color #e8ff47, background #202020
```

---

## 8. Project Cards

```
Background:       #111111
Border:           1px solid #2a2a2a
Border radius:    12px
Overflow:         hidden
Transition:       transform 0.2s, box-shadow 0.2s
Hover:            translateY(-4px), box-shadow 0 16px 48px rgba(0,0,0,0.5)
```

### Card Thumbnail

```
Height:           200px
Background:       #181818
Object-fit:       cover
```

### Card Body

```
Padding:          20px
```

### Status Badge

```
Font:             JetBrains Mono, 10px
Padding:          4px 8px
Border radius:    4px
Completed:        bg rgba(40,202,65,0.15), color #28ca41
In Progress:      bg rgba(255,189,46,0.15), color #ffbd2e
```

---

## 9. Animations (Framer Motion)

### Window Open

```javascript
initial:  { opacity: 0, scale: 0.92, y: 20 }
animate:  { opacity: 1, scale: 1, y: 0 }
transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] }
```

### Window Close

```javascript
exit:     { opacity: 0, scale: 0.92, y: 20 }
transition: { duration: 0.2, ease: "easeIn" }
```

### Window Minimize

```javascript
// Animate position + scale toward dock icon coords
transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] }
```

### Dock Icon Hover

```css
transform: translateY(-8px) scale(1.15);
transition: transform 0.2s ease;
```

### Page Load Stagger

```javascript
// Each window/section staggers in with delay: index * 0.08s
initial:  { opacity: 0, y: 30 }
animate:  { opacity: 1, y: 0 }
```

---

## 10. Responsive / Mobile Fallback

On screens below `768px`, the macOS desktop metaphor is replaced with a simplified, single-page scrollable layout.

| Element | Desktop Behavior | Mobile Fallback |
|---|---|---|
| Menu bar | Fixed top, blur backdrop | Simplified nav bar |
| Dock | Fixed bottom, frosted glass | Hidden |
| Windows | Draggable, floating | Full-width stacked sections |
| Wallpaper | Fullscreen behind windows | Gradient background |
| Hero | Fullscreen with overlay | Standard hero section |
| Typography | Large display sizes | Scaled down via `clamp()` |

---

## 11. Assets Checklist

| Asset | Spec | Status |
|---|---|---|
| Profile photo | Min 400×400px, JPG/PNG, professional | ✅ Ready |
| Desktop wallpaper | 1920×1080px, dark/abstract | ⏳ Needed |
| Project thumbnails | 3×, min 800×450px, WebP preferred | ⏳ Needed |
| Favicon | 32×32px SVG or ICO | ⏳ Needed |
| OG / Social preview image | 1200×630px | ⏳ Needed |
| Resume PDF | `/public/antigravity-resume.pdf` | ✅ Ready |

---

## 12. Accessibility

- All interactive elements have `:focus-visible` outlines (2px `#e8ff47`)
- Color contrast: text `#f0ece4` on `#0a0a0a` = 15.4:1 (WCAG AAA ✓)
- All images include descriptive `alt` attributes
- Windows trap focus when open (keyboard navigation)
- `prefers-reduced-motion`: disable scale/translate animations, keep fade only

---

*Antigravity Portfolio — Design Document | April 2026 | v1.0*
