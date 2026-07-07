'use client'

import { useEffect } from 'react'
import { motion, MotionValue, useSpring } from 'framer-motion'
import { useLocale } from 'next-intl'
import { useTheme } from '@/components/ui/ThemeProvider'

interface Props {
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
  visible: boolean
}

export default function ProjectCursor({ mouseX, mouseY, visible }: Props) {
  const locale = useLocale()
  const { theme } = useTheme()
  const label = locale === 'es' ? 'Ver Proyecto' : 'View Project'

  const x = useSpring(mouseX, { stiffness: 400, damping: 28, mass: 0.5 })
  const y = useSpring(mouseY, { stiffness: 400, damping: 28, mass: 0.5 })

  // Jump to current mouse position on entry so the pill appears immediately
  // instead of springing in from the off-screen initial value.
  useEffect(() => {
    if (visible) {
      x.jump(mouseX.get())
      y.jump(mouseY.get())
    }
  }, [visible]) // eslint-disable-line react-hooks/exhaustive-deps

  const pillBg = theme === 'dark' ? '#ebebeb' : '#2e2e2e'
  const pillText = theme === 'dark' ? '#3d3d3d' : '#a0a0a0'

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 z-[100] pointer-events-none flex items-center justify-center"
      style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.75 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="flex items-center gap-[6px] rounded-full px-5 h-[38px]"
        style={{ background: pillBg }}
      >
        <span
          className="text-[13px] font-normal leading-none whitespace-nowrap"
          style={{ color: pillText }}
        >
          {label}
        </span>
        <span
          className="text-[13px] font-normal leading-none"
          style={{ color: pillText, transform: 'translateY(-1px)' }}
          aria-hidden="true"
        >→</span>
      </div>
    </motion.div>
  )
}
