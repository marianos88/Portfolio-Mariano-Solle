# Handoff — marianosolle.com

_Last updated: Phase 7 complete, merged to main, live in production._

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

---

## Current Production State

- **URL:** `https://marianosolle.com`
- **Last deploy commit:** `18cbfe1` (Phase 7 merge)
- **Vercel project:** `portfolio-mariano-solle` (team: `portfolio-mariano-solle`)
- All 7 projects live; 3 public, 4 gated behind Portfolio Plus

---

## Key Files & Conventions

| What | Where |
|---|---|
| Root metadata | `src/app/layout.tsx` |
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

---

## Remaining Roadmap

1. **Phase 8 — Accessibility (WCAG AA)** ← next
2. Phase 9 — Performance
3. Phase 10 — Microinteractions
4. Rate limiting on `/api/contact` (conditional on spam)
5. Analytics (conditional)
6. New case study content as projects are added
