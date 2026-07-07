'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { pageview } from '@/lib/analytics'

/**
 * Fires a page_view into the GTM dataLayer on every client-side route change.
 * GTM script injection is handled separately by GtmScript (server component).
 * Place this inside <body> in the root layout.
 */
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    // Defer so Next.js has flushed the new <title> to the DOM before we read it
    const id = setTimeout(() => pageview(pathname, document.title), 0)
    return () => clearTimeout(id)
  }, [pathname])

  return <>{children}</>
}
