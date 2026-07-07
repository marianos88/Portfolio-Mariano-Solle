# Handoff — marianosolle.com

_Last updated: Phase 11B complete, merged to main._

---

## Architecture

**Stack:** Next.js 14 App Router · TypeScript · Tailwind CSS · Vercel · Cloudflare

| Layer | Detail |
|---|---|
| Framework | Next.js 14.2 App Router, React 18, TypeScript |
| Styling | Tailwind CSS 3.4, custom tokens in `tailwind.config.ts` |
| i18n | `next-intl` with a `locale` cookie (`es` default, `en` available) — no URL-based routing |
| Auth | HMAC-SHA256 stateless session in HttpOnly cookie (30d), Portfolio Plus only |
| Email | Resend SDK, `contact@marianosolle.com`, sends to `mariano.solle@gmail.com` |
| Content | JSON files in `src/content/projects/` and `src/content/portfolio-plus/` |
| SEO | Metadata Routes API, JSON-LD via `src/lib/structured-data.ts`, sitemap, robots |
| Images | `next/image` throughout — AVIF/WebP auto-conversion, CDN-cached, no bare `<img>` tags |
| Hosting | Vercel (production: `marianosolle.com` via Cloudflare) |

---

## Completed Phases

| Phase | Name | Status |
|---|---|---|
| 1–3 | Portfolio Plus (auth gate) | ✓ Production |
| 4 | Motion Cursor | ✓ Production |
| 5 | Stacked Sections | ✓ Production |
| 6 | Contact Form (full stack) | ✓ Production |
| 7 | SEO & Metadata | ✓ Production |
| 8 | Performance & Core Web Vitals | ✓ Production |
| 9 | Accessibility (WCAG AA) | ✓ Production |
| 11A | Analytics Infrastructure (GTM + GA4) | ✓ Production |
| 11B | Analytics Instrumentation | ✓ Merged to main |

---

## Current Production State

- **URL:** `https://marianosolle.com`
- **Last deploy commit:** `aa56403` (Phase 11B merge)
- **Vercel project:** `portfolio-mariano-solle` (team: `portfolio-mariano-solle`)
- All 7 projects live; 3 public, 4 gated behind Portfolio Plus

---

## Key Files & Conventions

| What | Where |
|---|---|
| Analytics helper | `src/lib/analytics.ts` — `track()`, `pageview()`, typed `AnalyticsEvent` union |
| GTM script injection | `src/components/analytics/GtmScript.tsx` (client component) |
| SPA page_view tracking | `src/components/analytics/AnalyticsProvider.tsx` (client component) |
| External link tracking | `src/components/ui/ExternalLink.tsx` — use instead of bare `<a>` for all external URLs |
| GTM container ID | `GTM_ID` env var (server-only); resolved in `layout.tsx` |
| Root layout + skip link | `src/app/layout.tsx` |
| Root metadata + theme script | `src/app/layout.tsx` |
| Per-page metadata | Each `page.tsx` via `metadata` or `generateMetadata` |
| Global styles + focus ring + reduced-motion | `src/styles/globals.css` |
| JSON-LD builders | `src/lib/structured-data.ts` |
| JSON-LD component | `src/components/seo/JsonLd.tsx` |
| OG default image | `src/app/opengraph-image.tsx` (ImageResponse, edge runtime) |
| Sitemap | `src/app/sitemap.ts` |
| Robots | `src/app/robots.ts` |
| i18n strings | `src/i18n/es.json` + `src/i18n/en.json` |
| Project content | `src/content/projects/proyecto-0N.json` |
| Auth | `src/lib/auth.ts` (HMAC-SHA256) |
| Middleware | `src/middleware.ts` (protects `/portfolio-plus/:path+`) |
| Contact API | `src/app/api/contact/route.ts` |
| Contact form | `src/components/contact/ContactForm.tsx` (`'use client'`) |
| Image component | `next/image` — used in `BentoGrid`, `ProjectCard`, `ProjectListItem`, `ProjectDetail` |
| Smooth scroll | `src/components/layout/LenisProvider.tsx` (RAF paused on tab hide; disabled for prefers-reduced-motion) |
| Video player | `src/components/projects/VideoPlayer.tsx` (`preload="none"`, keyboard-accessible) |
| Next.js config | `next.config.mjs` — image formats, cache headers, next-intl plugin |

### Active conventions
- New pages → `src/app/`, reusable components → `src/components/`
- i18n strings in `src/i18n/es.json` and `src/i18n/en.json`; validate with `scripts/validate-i18n.mjs`
- Email copy is self-contained in `src/app/api/contact/route.ts` (`EMAIL_COPY` map)
- Feature branches: `claude/<feature-name>` → Preview on Vercel → manual approval → merge to `main`
- Commit style: `type(scope): description` with Co-Authored-By trailer
- Never push to `main` directly; always use a feature branch and wait for approval

---

## Design Decisions (do not revisit without reason)

- **Locale in cookie, not URL** — keeps paths clean; `next-intl` reads the cookie server-side
- **Portfolio Plus: stateless HMAC auth** — no database; token in HttpOnly cookie, 30d TTL
- **Honeypot bots get silent 200** — avoids signalling detection
- **Portfolio Plus + NDA projects: noindex** — auth-gated content should not be indexed
- **OG validation on preview URLs fails with redirect to vercel.com/login** — this is Vercel Deployment Protection on team preview deployments; it is expected and not a code issue; validate OG on production domain only
- **Rate limiting on contact form deferred** — add only if real spam appears
- **`next/image` with `fill` for fixed-height containers** (BentoGrid, thumbnails, hero) — parent must have `position: relative`
- **`next/image` with `width={0} height={0}` + `style` for fluid content images** — used in ProjectDetail section/legacy images where intrinsic dimensions are unknown
- **`immutable` Cache-Control only for `/_next/static/`** — Next.js content-hashes those filenames; `/images/` uses `max-age=3600, stale-while-revalidate=86400`
- **Inline theme `<script>` in `<head>`** — reads `localStorage` synchronously to prevent dark→light FOUC; needs a nonce if CSP is ever added
- **`suppressHydrationWarning` on `<html>`** — covers the theme class added by the inline script

---

## Phase 8 — Performance Decisions (do not re-investigate)

All bare `<img>` tags have been eliminated. Do not introduce new `<img>` tags; always use `next/image`.

`preload="none"` on all `<video>` elements is intentional — videos are large (4–12 MB each) and should never load until play is clicked.

The Google Fonts `@import` in `globals.css` was removed intentionally. Inter is loaded via `next/font/google` in `layout.tsx` which self-hosts the font and emits a preload link. Do not re-add the `@import`.

The Lenis RAF loop is intentionally paused on `document.hidden`. This is correct behavior.

---

## Phase 9 — Accessibility Decisions (do not re-investigate)

**Mobile menu is `<nav>`, not `role="dialog"`** — the menu is not a modal overlay; using `role="dialog"` would be semantically incorrect and imply focus-trapping that WCAG 2.1.2 prohibits for non-modal overlays. The current pattern (`aria-expanded` + `aria-controls` on the trigger, `<nav aria-label>` on the menu, focus-in on open, return focus on close) is correct and sufficient for WCAG AA.

**No focus trap in the mobile menu** — WCAG 2.1 AA does not require focus trapping for non-modal overlays. Trapping would violate WCAG 2.1.2 (No Keyboard Trap). Focus trapping is only required for `role="dialog"` with `aria-modal="true"`, which this menu is not. The current focus management (move in / return out) fully satisfies AA.

**VideoPlayer uses `role="button"` + `aria-pressed`** — the video control is a toggle button with two stable states (playing / paused). `aria-pressed` is the correct ARIA pattern. The button identity does not change, only its state — this is the textbook case for a toggle button. Do not replace with a label-only pattern unless the design changes significantly.

**`aria-invalid` omitted on valid fields** — setting `aria-invalid="false"` on all fields from page load generates noisy screen reader announcements on initial focus. The attribute is only present when the field has an actual error. This is intentional and WCAG-conformant.

**`cursor-none` replaced with conditional inline style** — the CSS class `cursor-none` hid the system cursor for all users including keyboard users and those who rely on cursor position for visibility. The custom `ProjectCursor` pill is mouse-only and meaningless without hover. The cursor is now hidden only when `hovered === true` (mouse is actively over the element), so keyboard focus always shows the system cursor.

**Decorative arrows and emoji are `aria-hidden`** — `→` arrow characters and `🔒` emoji throughout the UI are purely decorative. They are correctly hidden from the accessibility tree. The meaningful content (link destinations, labels, headings) provides the accessible name independently.

**Contrast thresholds** — all text tokens were upgraded to pass WCAG AA 4.5:1 for normal text. The minimum in dark mode is `/60` opacity on `off-white` (#F8F8F8) against `dark` (#222222), which yields ~5.5:1. The minimum in light mode is full `text-mid-gray` (#3E3E3E) against `off-white`, which yields ~10:1. Do not introduce new opacity modifiers below `/60` for dark mode or below full opacity for light-mode mid-gray text.

**`prefers-reduced-motion` implementation is two-layer** — CSS (`@media (prefers-reduced-motion: reduce)` in `globals.css`) handles CSS transitions; Framer Motion's `useReducedMotion()` hook handles JS-driven animations. Both layers are needed because Framer Motion bypasses CSS. Do not remove either layer.

---

## Remaining Roadmap

1. **Phase 10 — Premium Polish & Microinteractions** ← next
2. Rate limiting on `/api/contact` (conditional on spam)
3. New case study content as projects are added
