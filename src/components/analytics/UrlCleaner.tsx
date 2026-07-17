'use client'

import { useEffect } from 'react'

const TRACKING_PARAMS = new Set([
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid',
  'fbclid',
  'msclkid',
])

/**
 * Removes tracking query parameters from the browser URL after analytics
 * scripts have had a chance to read them. Uses replaceState — no reload,
 * no new history entry. Runs once on mount; does nothing on SPA navigation.
 */
export function UrlCleaner() {
  useEffect(() => {
    const handlePageViewSent = () => {
      const url = new URL(window.location.href)
      let changed = false

      for (const key of [...url.searchParams.keys()]) {
        if (TRACKING_PARAMS.has(key)) {
          url.searchParams.delete(key)
          changed = true
        }
      }

      if (changed) {
        const clean =
          url.pathname +
          (url.search !== '?' ? url.search : '') +
          url.hash
        window.history.replaceState(null, '', clean)
      }
    }

    window.addEventListener('analytics:page_view_sent', handlePageViewSent, { once: true })
    return () => window.removeEventListener('analytics:page_view_sent', handlePageViewSent)
  }, [])

  return null
}
