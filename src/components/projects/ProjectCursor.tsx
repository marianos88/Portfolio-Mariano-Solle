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
  const label = locale === 'es' ? 'Ver Proyecto' : 'View Project'

  const x = useSpring(mouseX, { stiffness: 400, damping: 28, mass: 0.5 })
  const y = useSpring(mouseY, { stiffness: 400, damping: 28, mass: 0.5 })

  return (
    <motion.div
      className="fixed top-0 left-0 z-[100] pointer-events-none flex items-center justify-center"
      style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.75 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center justify-center gap-3 bg-[#ebebeb] rounded-full pl-5 pr-[18px] h-10">
        <span className="text-[15px] font-medium text-dark leading-none whitespace-nowrap">
          {label}
        </span>
        <span className="text-[15px] font-medium text-dark leading-none" aria-hidden="true">→</span>
      </div>
    </motion.div>
  )
}
