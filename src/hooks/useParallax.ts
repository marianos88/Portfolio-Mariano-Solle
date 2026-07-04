import { useScroll, useTransform } from 'framer-motion'

export function useParallax(offset: number = 300) {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, offset], [0, -offset * 0.4])
  return y
}
