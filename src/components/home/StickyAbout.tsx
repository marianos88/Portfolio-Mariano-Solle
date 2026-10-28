'use client'

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'

const NAV_OFFSET = 64 // matches md:top-16
const MOBILE_QUERY = '(max-width: 767px)'

// useLayoutEffect warns during SSR; fall back to useEffect on the server.
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

// On mobile the About content can be taller than the viewport, so a fixed
// top-16 hides its bottom under Projects. Shift the sticky offset so it only
// engages once the end of the content reaches the bottom of the viewport.
// Until that offset is measured, mobile stays in normal flow (never pinned
// early); tablet/desktop keep md:sticky md:top-16 from the server render.
export default function StickyAbout({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [top, setTop] = useState<number | null>(null)

  useIsomorphicLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const mq = window.matchMedia(MOBILE_QUERY)

    const update = () => {
      setTop(mq.matches ? Math.min(NAV_OFFSET, window.innerHeight - el.offsetHeight) : null)
    }

    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    window.addEventListener('resize', update)
    mq.addEventListener('change', update)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', update)
      mq.removeEventListener('change', update)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="relative z-20 min-h-screen md:sticky md:top-16"
      style={top !== null ? { position: 'sticky', top } : undefined}
    >
      {children}
    </div>
  )
}
