# Working Memory — Portfolio Mariano Sollé

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 App Router (TypeScript) |
| Styling | Tailwind CSS — utility classes, `dark:` prefix for dark mode |
| Animations | Framer Motion |
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

---

## Key Files

| File | Purpose |
|------|---------|
| `src/lib/projects.ts` | Project data, types, filter functions |
| `src/lib/auth.ts` | Session token generation and verification |
| `src/middleware.ts` | Route protection for `/portfolio-plus/:path+` |
| `src/i18n/en.json` | English strings |
| `src/i18n/es.json` | Spanish strings |
| `src/content/projects/` | Project JSON files (7 total) |

---

## Components

| Component | Path |
|-----------|------|
| `PasswordGate` | `src/components/portfolio-plus/PasswordGate.tsx` |
| `LockButton` | `src/components/portfolio-plus/LockButton.tsx` |
| `ProjectDetail` | `src/components/projects/ProjectDetail.tsx` |

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

---

## Git

- Main branch: `main`
- Feature branch: `claude/great-knuth-bpez38`
