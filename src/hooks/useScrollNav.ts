'use client'

import { useState } from 'react'
import { useScroll, useMotionValueEvent } from 'framer-motion'

export function useScrollNav() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 40)
  })

  return scrolled
}
