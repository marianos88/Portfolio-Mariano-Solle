# Project State — Portfolio Mariano Sollé

## Last Known Good Commit

`bab9a62` — fix(cursor): swap theme mapping — light pill on dark mode, dark pill on light mode

---

## Completed Work

### Portfolio Plus — Phases 1–3 ✓
- Visibility-based project filtering (single array, `visibility` field)
- Password gate UI: `PasswordGate`, `LockButton` components
- HMAC-SHA256 stateless session auth (`src/lib/auth.ts`)
- HttpOnly cookie system: session (30d) + visited (60d)
- Middleware route protection for `/portfolio-plus/:path+`
- RSC-level auth on `/portfolio-plus` page and `/projects/[slug]`
- `?from=` redirect param with open redirect prevention (`sanitizeFrom`)
- Session expiry UX (`expired` + `expiredHint` i18n keys)
- Confidentiality notice on unlocked view
- `POST /api/lock` endpoint + LockButton in project detail footer

### Security Hardening ✓
- Replaced static cookie value with HMAC-SHA256 token
- Added `sanitizeFrom()` — rejects absolute URLs and non-`/` paths
- Verified env var is server-only (`PORTFOLIO_PLUS_ACCESS_CODE`)

### Visual Polish ✓
- Removed project years from all 7 project JSONs
- Verified typography, spacing, and color tokens across locked/unlocked states
- Error message hierarchy (primary red + secondary gray hint)

### Phase 4 — Motion Cursor ✓
- `ProjectCursor` — reusable spring-following pill cursor
- Appears immediately at mouse position (no off-screen fly-in via `x.jump()`)
- Theme-aware: light pill on dark bg, dark pill on light bg
- Locale-aware: "Ver Proyecto" (ES) / "View Project" (EN)
- Deployed on `/projects` (`ProjectCard`) and Home page projects list (`ProjectListItem`)
- Replaced old floating-thumbnail-overlay in `ProjectListItem` — thumbnail now inline, grayscale → color on hover
- Reference assets: `public/images/ui/cursor-pill-{dark|light}-{es|en}.png`

### Production Bug Fix ✓
- Root cause: Next.js 14 RSC reconciliation doesn't reliably switch conditional branches on same route via `router.refresh()` in production
- Fix: replaced `window.location.reload()` call in `PasswordGate.tsx` on successful unlock
- Confirmed working in production

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

## Next Phase

> _To be defined by Mariano._

Suggested areas (not committed):
- [ ] Home page / hero section updates
- [ ] About / contact section
- [ ] Project card design iteration
- [ ] New public project content
- [ ] Performance / SEO audit
- [ ] Analytics integration
