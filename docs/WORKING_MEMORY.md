# Working Memory — Portfolio Mariano Sollé

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 App Router (TypeScript) |
| Styling | Tailwind CSS — utility classes, `dark:` prefix for dark mode |
| Animations | Framer Motion — page/element entrance, `AnimatePresence` |
| i18n | next-intl v4.13.0 — cookie-based locale (`es` / `en`) |
| Auth | HMAC-SHA256 stateless session tokens via `crypto.subtle` |
| Deployment | Vercel (production) |

---

## Architecture

### Project Visibility
Single `allProjects` array in `src/lib/projects.ts`. Each project JSON has `visibility: "public" | "portfolio-plus"`. Filter functions:
- `getPublicProjects()` — homepage / project list
- `getPortfolioPlusProjects()` — locked section index
- `getAnyProject(slug)` — project detail, gates portfolio-plus at page level

### Auth Flow
1. User submits access code → `POST /api/unlock`
2. Server compares to `PORTFOLIO_PLUS_ACCESS_CODE` env var
3. On match: generates HMAC-SHA256 token, sets `portfolio_plus_session` cookie (30d, HttpOnly)
4. Also sets `portfolio_plus_visited` cookie (60d) for expiry detection
5. `POST /api/lock` clears both cookies
6. Middleware verifies HMAC token on `/portfolio-plus/:path+`
7. `/portfolio-plus` page verifies at RSC level (not covered by middleware)

### Two-Cookie System
| Cookie | TTL | Purpose |
|--------|-----|---------|
| `portfolio_plus_session` | 30 days | Auth. Contains HMAC token |
| `portfolio_plus_visited` | 60 days | Expiry UX. `!session && visited` → show expiry message |

### Session Token
- `HMAC-SHA256(ACCESS_CODE, "portfolio-plus-session")` → hex string
- Deterministic: server recomputes on every verify, no storage needed
- Token rotation requires changing `PORTFOLIO_PLUS_ACCESS_CODE`

---

## Route Map

| Route | Type | Auth |
|-------|------|------|
| `/` | RSC page | Public |
| `/projects` | RSC page | Public |
| `/projects/[slug]` | RSC page | Gates portfolio-plus slugs |
| `/portfolio-plus` | RSC page (`force-dynamic`) | Self-gating |
| `/portfolio-plus/[slug]` | RSC page | Redirects → `/portfolio-plus` (obsolete) |
| `/api/unlock` | POST route | Public endpoint |
| `/api/lock` | POST route | Public endpoint |

---

## Component Inventory

### Portfolio Plus
| Component | Path | Notes |
|-----------|------|-------|
| `PasswordGate` | `src/components/portfolio-plus/PasswordGate.tsx` | Client. Form, error state, `window.location.reload()` on success |
| `LockButton` | `src/components/portfolio-plus/LockButton.tsx` | Client. `POST /api/lock` then `router.refresh()` |

### Projects
| Component | Path | Notes |
|-----------|------|-------|
| `ProjectDetail` | `src/components/projects/ProjectDetail.tsx` | Client. Renders project content + footer nav. Private projects show LockButton |

---

## Design Conventions

### Spacing / Layout
- Page max-width: `max-w-4xl mx-auto`
- Page padding: `pt-32 pb-20 px-6`
- Section gap: `mb-12`

### Typography Scale
| Use | Class |
|-----|-------|
| Tag / label | `text-[11px] tracking-[2px] uppercase` |
| Body small | `text-[13px] font-light` |
| Body | `text-[14px] font-light` |
| Body large | `text-[16px] font-light leading-[1.7]` |
| Heading | `text-[18px] font-medium` |
| H1 | `text-[36px] md:text-[46px] font-medium tracking-[-0.02em]` |

### Color Tokens
| Token | Dark | Light |
|-------|------|-------|
| Accent | `dark:text-mint` | `text-[#2a7a4a]` |
| Text primary | `dark:text-off-white` | `text-dark` |
| Text muted | `dark:text-off-white/60` | `text-mid-gray` |
| Text faint | `dark:text-off-white/40` | `text-mid-gray` |
| Card bg | `dark:bg-[#2e2e2e]` | `bg-white` |
| Card border | `dark:border-mid-gray` | `border-[#e0e0e0]` |

### Focus Rings
- Dark: `focus-visible:ring-mint` / `focus-visible:ring-mint/40`
- Light: `focus-visible:ring-[#2a7a4a]` / `focus-visible:ring-[#2a7a4a]/40`

---

## i18n

- Locale stored in cookie, read server-side via `getLocale()`, client-side via `useLocale()`
- Translation files: `src/i18n/en.json`, `src/i18n/es.json`
- Key namespaces: `portfolioPlus`, `projects`, `navigation`, etc.
- `portfolioPlus` keys: `tag`, `title`, `description`, `accessCodeLabel`, `accessCodePlaceholder`, `submit`, `error`, `errorSuffix`, `expired`, `expiredHint`, `confidentialityTitle`, `confidentialityText`, `lockButton`

---

## Content

### Projects (`src/content/projects/`)
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

## Environment Variables

| Variable | Used in | Notes |
|----------|---------|-------|
| `PORTFOLIO_PLUS_ACCESS_CODE` | `src/lib/auth.ts` | Server-only. Never expose to client |

**Security constraints:**
- Access code never reaches client bundle
- Validation is server-side only (`verifyAccessCode`, `verifySessionToken`)
- No rate limiting — intentional trade-off for a personal portfolio
- `sanitizeFrom()` rejects absolute URLs and non-`/` relative paths (open redirect prevention)

---

## Git

- Main branch: `main`
- Feature branch pattern: `claude/great-knuth-bpez38`
- Last Portfolio Plus merge: `cb081b8`
