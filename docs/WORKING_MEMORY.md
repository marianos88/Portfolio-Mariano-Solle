# Working Memory — Portfolio Mariano Sollé

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 App Router (TypeScript) |
| Styling | Tailwind CSS — utility classes, `dark:` prefix for dark mode |
| Animations | Framer Motion |
| Scroll | Lenis (`lerp: 0.1, smoothWheel: true`) — no DOM wrapper, no overflow issues |
| i18n | next-intl v4.13.0 — cookie-based locale (`es` / `en`) |
| Deployment | Vercel |

---

## Routes

| Route | Notes |
|-------|-------|
| `/` | Home |
| `/projects` | Public project list |
| `/projects/[slug]` | Project detail — gates portfolio-plus slugs server-side |
| `/portfolio-plus` | Locked section index (`force-dynamic`) |
| `/api/unlock` | POST — validates access code, sets session cookie |
| `/api/lock` | POST — clears session cookies |
| `/api/contact` | POST — **pending implementation** (Resend) |

---

## Key Files

| File | Purpose |
|------|---------|
| `src/app/page.tsx` | Home page — Stacked Sections layout |
| `src/lib/projects.ts` | Project data, types, filter functions |
| `src/lib/auth.ts` | Session token generation and verification |
| `src/middleware.ts` | Route protection for `/portfolio-plus/:path+` |
| `src/i18n/en.json` | English strings |
| `src/i18n/es.json` | Spanish strings |
| `src/content/projects/` | Project JSON files (7 total) |

---

## Stacked Sections — Home Page Architecture

Implemented in `src/app/page.tsx`. Pure CSS sticky, no GSAP, no extra JS.

```tsx
export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero in normal document flow */}
      <Hero />
      {/* About sticks below navbar; Projects scrolls over it */}
      <div className="sticky top-16 z-20 min-h-[100dvh]">
        <AboutSection />
      </div>
      {/* Projects in normal flow, higher z-index to cover sticky About */}
      <div className="relative z-30">
        <ProjectList />
      </div>
    </div>
  )
}
```

### Key invariants
- `top-16` = 64px = navbar effective height. Do not change without re-measuring navbar.
- `min-h-[100dvh]` on About wrapper: ensures containing block is tall enough to hold sticky for the full ProjectList scroll range.
- No `overflow: hidden` on any ancestor — confirmed across `html`, `body`, `LenisProvider`, `ThemeProvider`.
- No negative margins on ProjectList — `-mt-*` shortens the containing block and releases sticky prematurely.
- z-index ladder: Navbar `z-50` > ProjectList `z-30` > About `z-20`.

---

## Components

| Component | Path |
|-----------|------|
| `PasswordGate` | `src/components/portfolio-plus/PasswordGate.tsx` |
| `LockButton` | `src/components/portfolio-plus/LockButton.tsx` |
| `ProjectDetail` | `src/components/projects/ProjectDetail.tsx` |
| `ProjectCard` | `src/components/projects/ProjectCard.tsx` |
| `ProjectCursor` | `src/components/projects/ProjectCursor.tsx` |
| `ProjectListItem` | `src/components/home/ProjectListItem.tsx` |
| `Hero` | `src/components/home/Hero.tsx` |
| `AboutSection` | `src/components/home/AboutSection.tsx` |
| `ProjectList` | `src/components/home/ProjectList.tsx` |

---

## Motion Cursor — ProjectCursor

Reusable pill cursor used on `/projects` and the Home page projects list.

### Behavior
- Follows mouse via `useMotionValue` + `useSpring` (`stiffness: 400, damping: 28, mass: 0.5`)
- On hover entry: springs jump to current mouse position (`x.jump()` / `y.jump()`) — no off-screen fly-in
- Fades + scales in/out (`opacity` + `scale`, 0.18s)
- Native cursor suppressed on parent link (`cursor-none`)

### Theme colors
| Theme | Pill bg | Text |
|-------|---------|------|
| Dark | `#ebebeb` | `#3d3d3d` |
| Light | `#2e2e2e` | `#a0a0a0` |

Theme read from custom `useTheme()` hook (`src/components/ui/ThemeProvider.tsx`).

### Reference assets
`public/images/ui/cursor-pill-{dark|light}-{es|en}.png`

### Integration pattern (ProjectCard / ProjectListItem)
```tsx
const mouseX = useMotionValue(-999)
const mouseY = useMotionValue(-999)
const [hovered, setHovered] = useState(false)

onMouseEnter={(e) => { mouseX.set(e.clientX); mouseY.set(e.clientY); setHovered(true) }}
onMouseLeave={() => setHovered(false)}
onMouseMove={(e) => { mouseX.set(e.clientX); mouseY.set(e.clientY) }}

<ProjectCursor mouseX={mouseX} mouseY={mouseY} visible={hovered} />
```

---

## Projects

| File | Visibility |
|------|-----------|
| `proyecto-01.json` | public |
| `proyecto-02.json` | public |
| `proyecto-03.json` | portfolio-plus |
| `proyecto-04.json` | public |
| `proyecto-05.json` | portfolio-plus |
| `proyecto-06.json` | portfolio-plus |
| `proyecto-07.json` | portfolio-plus |

---

## Design Conventions

### Layout
- Page container: `max-w-4xl mx-auto px-6 pt-32 pb-20`

### Typography
| Use | Class |
|-----|-------|
| Tag / label | `text-[11px] tracking-[2px] uppercase` |
| Body small | `text-[13px] font-light` |
| Body | `text-[14px] font-light` |
| Body large | `text-[16px] font-light leading-[1.7]` |
| Card heading | `text-[18px] font-medium` |
| Page H1 | `text-[36px] md:text-[46px] font-medium tracking-[-0.02em]` |

### Colors
| Token | Dark | Light |
|-------|------|-------|
| Accent | `dark:text-mint` | `text-[#2a7a4a]` |
| Text primary | `dark:text-off-white` | `text-dark` |
| Text muted | `dark:text-off-white/60` | `text-mid-gray` |
| Text faint | `dark:text-off-white/40` | `text-mid-gray` |
| Card bg | `dark:bg-[#2e2e2e]` | `bg-white` |
| Card border | `dark:border-mid-gray` | `border-[#e0e0e0]` |

### Focus rings
- Dark: `focus-visible:ring-mint` / `focus-visible:ring-mint/40`
- Light: `focus-visible:ring-[#2a7a4a]` / `focus-visible:ring-[#2a7a4a]/40`

---

## i18n

- Translation files: `src/i18n/en.json`, `src/i18n/es.json`
- Server: `getTranslations('namespace')`, `getLocale()`
- Client: `useTranslations('namespace')`, `useLocale()`

---

## Environment Variables

| Variable | Notes |
|----------|-------|
| `PORTFOLIO_PLUS_ACCESS_CODE` | Server-only. Never expose to client |
| `RESEND_API_KEY` | Pending — required for contact form |

---

## Git

- Main branch: `main`
- Last merged branch: `claude/mariano-solle-portfolio-hjqyvc`
