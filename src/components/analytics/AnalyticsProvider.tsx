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
    pageview(pathname, document.title)
  }, [pathname])

  return <>{children}</>
}
