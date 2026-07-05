# Project State — Portfolio Mariano Sollé

## Last Known Good Commit

`74c5ce9` — merge: Phase 9 — Accessibility (WCAG AA) merged to main

---

## Infrastructure

| Item | Status |
|------|--------|
| Domain: marianosolle.com | ✓ Live |
| Cloudflare DNS + proxy | ✓ Configured |
| HTTPS / SSL | ✓ Active |
| WWW → apex redirect | ✓ Active |
| Vercel production | ✓ Deployed |
| Resend domain verified | ✓ contact@marianosolle.com |
| SPF / DKIM | ✓ Configured |

## Environment Variables (Vercel)

| Variable | Purpose |
|----------|---------|
| `RESEND_API_KEY` | Resend email delivery |
| `PORTFOLIO_PLUS_ACCESS_CODE` | Portfolio Plus password gate |

---

## Completed Work

### Portfolio Plus — Phases 1–3 ✓
- Visibility-based project filtering (`visibility` field in JSON)
- Password gate UI: `PasswordGate`, `LockButton` components
- HMAC-SHA256 stateless session auth (`src/lib/auth.ts`)
- HttpOnly cookie system: session (30d) + visited (60d)
- Middleware route protection for `/portfolio-plus/:path+`
- RSC-level auth on `/portfolio-plus` page and `/projects/[slug]`
- `?from=` redirect with open redirect prevention (`sanitizeFrom`)
- Session expiry UX (`expired` + `expiredHint` i18n keys)
- Confidentiality notice on unlocked view
- `POST /api/lock` endpoint + LockButton in project detail footer

### Security Hardening ✓
- HMAC-SHA256 token replaces static cookie value
- `sanitizeFrom()` rejects absolute URLs and non-`/` paths
- `PORTFOLIO_PLUS_ACCESS_CODE` is server-only

### Visual Polish ✓
- Project years removed from all 7 project JSONs
- Typography, spacing, and color tokens verified across all states
- Error message hierarchy (primary red + secondary gray hint)

### Phase 4 — Motion Cursor ✓
- `ProjectCursor` — spring-following pill cursor
- Appears immediately at mouse position (no off-screen fly-in)
- Theme-aware and locale-aware ("Ver Proyecto" / "View Project")
- Active on `/projects` and Home page project list

### Phase 5 — Stacked Sections ✓
- Hero in normal flow (`min-h-screen`)
- AboutSection: `sticky top-16 z-20 min-h-[100dvh]`
- ProjectList: `relative z-30` — rises over sticky About
- Pure CSS sticky, no transforms or artificial heights

### Phase 6 — Contact Form (Full Stack) ✓
- `POST /api/contact` — Next.js App Router route handler
- Resend SDK integration; sends to `mariano.solle@gmail.com`
- Reply-To set to visitor's email address
- HTML email + plain text fallback
- Email template localized (ES/EN) based on `locale` cookie
- Timestamp in `America/Argentina/Buenos_Aires` (ART), locale-formatted
- Subject: `Consulta desde el portfolio — {name}` / `Portfolio inquiry — {name}`
- Server-side honeypot validation (silent 200 to bots)
- Content-length guard (20 KB) before JSON parse
- Input validation: required fields, email format, max lengths
- HTML sanitization on all user input
- Frontend: idle/loading/success/error state machine
- Blur-triggered per-field validation; errors cleared immediately on fix

### Phase 7 — SEO & Metadata ✓
- `metadataBase`: `https://marianosolle.com`
- Title template: `'%s — Mariano Solle'` with default fallback
- Root metadata: keywords, authors, creator, canonical, robots, OG, Twitter Cards, icons, theme-color
- Per-page `metadata` or `generateMetadata` for all pages and case studies
- Portfolio Plus page and all NDA project pages: `robots: { index: false, follow: false }`
- JSON-LD structured data: `Person`, `WebSite`, `WebPage`, `CreativeWork` (schema.org)
- `app/sitemap.ts` — auto-generated `/sitemap.xml`
- `app/robots.ts` — `/robots.txt`
- `app/opengraph-image.tsx` — branded default OG image (1200×630)

### Phase 8 — Performance & Core Web Vitals ✓
- All bare `<img>` tags replaced with `next/image`
- `preload="none"` on all `<video>` elements
- Google Fonts `@import` removed; Inter loaded via `next/font/google`
- Lenis RAF loop paused on `document.hidden`
- Cache headers: `immutable` for `/_next/static/`, `max-age=3600, stale-while-revalidate=86400` for `/images/`

### Phase 9 — Accessibility (WCAG AA) ✓
- Skip-to-main-content link in root layout (`#main-content`)
- Global `:focus-visible` ring (2px mint/green, 3px offset) in `globals.css`
- `@media (prefers-reduced-motion: reduce)` in `globals.css`
- Lenis smooth scroll disabled when `prefers-reduced-motion: reduce`
- `useReducedMotion()` guards on all Framer Motion animations (Hero, BentoGrid, ProjectListItem, ProjectCard, PlusBanner, PortfolioPlusCard)
- Hero infinite bounce animation respects reduced-motion
- Mobile menu: `<nav aria-label>` (not dialog), `aria-expanded`, `aria-controls`, focus-in on open / return focus on close
- VideoPlayer: `role="button"`, `tabIndex`, `onKeyDown` (Enter/Space), `aria-label`, `aria-pressed`
- ContactForm: sr-only `<label>` per field, `aria-describedby` on inputs, `aria-invalid` only on error, focus to success div on submit
- ContactForm success: `role="status"`, `aria-live="polite"`, `tabIndex=-1` + `el.focus()`
- LangSwitch: `aria-label` communicates current language and switch target
- All decorative `→` arrows: `aria-hidden="true"` across BentoGrid, ProjectListItem, ProjectCard, AboutSection, Footer, PlusBanner, PortfolioPlusCard
- Hero `↓` scroll indicator: `aria-hidden="true"`
- `🔒` emoji in PlusBanner and PortfolioPlusCard: `aria-hidden="true"`
- ProjectCursor floating pill: `aria-hidden="true"`
- VideoPlayer play/pause overlays: `aria-hidden="true"`
- Figma iframe in LegacyLayout: `title="Prototipo interactivo en Figma"`
- AboutSection column headers upgraded from `<p>` to `<h3>`
- All opacity-based text tokens upgraded to pass WCAG AA 4.5:1 contrast
- External links in Footer and ContactForm: `sr-only "(opens in new tab)"` hints
- Footer social links wrapped in `<nav aria-label>` + `<ul>`
- Translation keys added: `nav.openMenu/closeMenu/mobileNav`, `videoPlayer.play/pause`, `footer.socialNav`

---

## Current Portfolio Content

| Project | Visibility | Status |
|---------|-----------|--------|
| proyecto-01 | public | Live |
| proyecto-02 | public | Live |
| proyecto-03 | portfolio-plus | Live (gated) |
| proyecto-04 | public | Live |
| proyecto-05 | portfolio-plus | Live (gated) |
| proyecto-06 | portfolio-plus | Live (gated) |
| proyecto-07 | portfolio-plus | Live (gated) |

---

## Remaining Roadmap

- [ ] **Phase 10 — Premium Polish & Microinteractions** ← next
- [ ] Rate limiting on `/api/contact` (if real spam appears)
- [ ] Analytics (if needed)
- [ ] New case studies / project content updates
