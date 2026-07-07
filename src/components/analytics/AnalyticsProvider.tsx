'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { pageview } from '@/lib/analytics'

/**
 * Initializes analytics once on mount and fires a page_view on every
 * client-side route change. Place this inside <body> in the root layout.
 *
 * No scripts are injected here yet — add provider initialization inside
 * the useEffect when a real SDK is integrated.
 */
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const initialized = useRef(false)

  // One-time initialization
  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    // TODO: initialize provider SDK here
    // Example (GA4):
    //   window.gtag?.('config', process.env.NEXT_PUBLIC_GA_ID, { send_page_view: false })
  }, [])

  // Track route changes (also fires on first render for the initial page)
  useEffect(() => {
    pageview(pathname, document.title)
  }, [pathname])

  return <>{children}</>
}
