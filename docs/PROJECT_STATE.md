# Project State — Portfolio Mariano Sollé

## Last Known Good Commit

`18cbfe1` — release: Phase 7 — SEO & Metadata merged to main

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
- Header: `Nuevo mensaje de contacto` / `Portfolio Inquiry`
- Server-side honeypot validation (silent 200 to bots)
- Content-length guard (20 KB) before JSON parse
- Input validation: required fields, email format, max lengths
- HTML sanitization on all user input
- `console.error` logging before 500 responses; internals not exposed
- 405 for all non-POST methods
- Frontend: idle/loading/success/error state machine
- Blur-triggered per-field validation; errors cleared immediately on fix
- Submit disabled while form is invalid or submitting
- Success: two-line copy (title + body), fade + 8px upward animation (220ms)
- Error: server message shown; input preserved for retry

### Phase 7 — SEO & Metadata ✓
- `metadataBase`: `https://marianosolle.com`
- Title template: `'%s — Mariano Solle'` with default fallback
- Root metadata: keywords, authors, creator, canonical, robots, OG, Twitter Cards, icons, theme-color
- Per-page `metadata` or `generateMetadata` for: Home, Projects, Contact, Portfolio Plus, every case study
- Portfolio Plus page and all NDA project pages: `robots: { index: false, follow: false }`
- JSON-LD structured data: `Person`, `WebSite`, `WebPage`, `CreativeWork` (schema.org)
  - `src/lib/structured-data.ts` — typed builder functions
  - `src/components/seo/JsonLd.tsx` — `<script type="application/ld+json">` injector
- `app/sitemap.ts` — auto-generated `/sitemap.xml` (all public pages)
- `app/robots.ts` — `/robots.txt` (allow `/`, disallow `/portfolio-plus`, `/api/`)
- `app/opengraph-image.tsx` — branded default OG image (1200×630) via `ImageResponse`
- Per-project OG images use `coverImage` field from JSON
- `ContactForm` extracted to `src/components/contact/ContactForm.tsx` (client component); `contact/page.tsx` is now a server component that exports metadata
- **Validation results:**
  - `sitemap.xml` ✓ compiled and served correctly
  - `robots.txt` ✓ compiled and served correctly
  - External crawlers (Facebook Debugger, LinkedIn, OG validators) redirected to `vercel.com/login` on preview URL — this is **expected behavior**: Vercel Deployment Protection is enabled by default on all team preview deployments. Not a code issue. Production domain `marianosolle.com` has no such protection.

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

- [ ] **Phase 8 — Accessibility (WCAG AA)** ← next
- [ ] Phase 9 — Performance
- [ ] Phase 10 — Microinteractions
- [ ] Rate limiting on `/api/contact` (if real spam appears)
- [ ] Analytics (if needed)
- [ ] New case studies / project content updates
