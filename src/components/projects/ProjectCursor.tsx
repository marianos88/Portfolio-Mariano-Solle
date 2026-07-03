'use client'

import { motion, MotionValue, useSpring } from 'framer-motion'
import { useLocale } from 'next-intl'

interface Props {
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
  visible: boolean
}

export default function ProjectCursor({ mouseX, mouseY, visible }: Props) {
  const locale = useLocale()
  const label = locale === 'es' ? 'Ver proyecto' : 'View project'

  const x = useSpring(mouseX, { stiffness: 400, damping: 28, mass: 0.5 })
  const y = useSpring(mouseY, { stiffness: 400, damping: 28, mass: 0.5 })

  return (
    <motion.div
      className="fixed top-0 left-0 z-[100] pointer-events-none flex items-center justify-center"
      style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.75 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="w-28 h-28 rounded-full bg-dark/85 dark:bg-off-white/90 backdrop-blur-sm flex flex-col items-center justify-center gap-1.5">
        <span className="text-[20px] text-white dark:text-dark leading-none">→</span>
        <span className="text-[9px] tracking-[1.5px] uppercase text-white/70 dark:text-dark/65 leading-none">
          {label}
        </span>
      </div>
    </motion.div>
  )
}
