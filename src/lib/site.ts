/**
 * Canonical site origin. www.marianosolle.com is the primary domain in Vercel
 * (the apex 308-redirects to it), so every canonical, sitemap, robots, Open Graph
 * and JSON-LD URL must use it. Override with NEXT_PUBLIC_SITE_URL if the primary
 * domain ever changes; the value is inlined at build time.
 */
const DEFAULT_SITE_URL = 'https://www.marianosolle.com'

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, '')

/** Absolute URL on the canonical origin. `absoluteUrl('/')` returns the bare origin. */
export function absoluteUrl(path = '/'): string {
  if (!path || path === '/') return SITE_URL
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}
