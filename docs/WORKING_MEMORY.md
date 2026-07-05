# Handoff — marianosolle.com

_Last updated: Phase 8 complete, merged to main, live in production._

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

---

## Current Production State

- **URL:** `https://marianosolle.com`
- **Last deploy commit:** `0a074b9` (Phase 8 merge)
- **Vercel project:** `portfolio-mariano-solle` (team: `portfolio-mariano-solle`)
- All 7 projects live; 3 public, 4 gated behind Portfolio Plus

---

## Key Files & Conventions

| What | Where |
|---|---|
| Root metadata + theme script | `src/app/layout.tsx` |
| Per-page metadata | Each `page.tsx` via `metadata` or `generateMetadata` |
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
| Smooth scroll | `src/components/layout/LenisProvider.tsx` (RAF paused on tab hide) |
| Video player | `src/components/projects/VideoPlayer.tsx` (`preload="none"`) |
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
- **`next/image` with `width={0} height={0}` + `style` for fluid content images** — used in ProjectDetail section/legacy images where intrinsic dimensions are unknown. Aspect ratio is preserved; full CLS elimination requires known dimensions (future: store `width`/`height` in project JSON)
- **`immutable` Cache-Control only for `/_next/static/`** — Next.js content-hashes those filenames; `/images/` uses `max-age=3600, stale-while-revalidate=86400` because filenames are not hashed
- **Inline theme `<script>` in `<head>`** — reads `localStorage` synchronously to prevent dark→light FOUC. No CSP set currently; if CSP is added, this script needs a nonce
- **`suppressHydrationWarning` on `<html>`** — already present from Phase 1; covers the theme class added by the inline script

---

## Phase 8 — Performance Decisions (do not re-investigate)

All bare `<img>` tags have been eliminated. Do not introduce new `<img>` tags; always use `next/image`.

`preload="none"` on all `<video>` elements is intentional — videos are large (4–12 MB each) and should never load until play is clicked.

The Google Fonts `@import` in `globals.css` was removed intentionally. Inter is loaded via `next/font/google` in `layout.tsx` which self-hosts the font and emits a preload link. Do not re-add the `@import`.

The Lenis RAF loop is intentionally paused on `document.hidden`. This is correct behavior.

---

## Remaining Roadmap

1. **Phase 9 — Accessibility (WCAG AA)** ← next
   - Semantic HTML review
   - Keyboard navigation
   - Focus states
   - Screen reader support (ARIA attributes)
   - Color contrast
   - Form accessibility
   - Reduced motion preferences (`prefers-reduced-motion`)
   - WCAG AA compliance target
2. Phase 10 — Microinteractions
3. Rate limiting on `/api/contact` (conditional on spam)
4. Analytics (conditional)
5. New case study content as projects are added
