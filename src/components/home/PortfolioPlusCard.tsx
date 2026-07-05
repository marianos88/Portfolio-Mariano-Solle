'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export default function PortfolioPlusCard({ index }: { index: number }) {
  const t = useTranslations('plusBanner')
  const [hovered, setHovered] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href="/portfolio-plus"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group flex items-center justify-between py-6 md:py-8 border-t transition-all duration-200
          dark:border-mid-gray/50 border-[#e0e0e0]
          dark:bg-[#1e2e22]/0 hover:dark:bg-[#1e2e22]/40
          bg-transparent hover:bg-[#d4f5e2]/30
          rounded-b-xl px-0 hover:px-4 -mx-0 hover:-mx-4"
        style={{ transition: 'all 0.3s ease' }}
      >
        <div className="flex items-baseline gap-6 md:gap-10 flex-1 min-w-0">
          {/* Index */}
          <span aria-hidden="true" className="text-[11px] tracking-[2px] dark:text-off-white/50 text-mid-gray shrink-0 w-6">
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Title with lock */}
          <div className="flex items-center gap-3 min-w-0">
            <AnimatePresence>
              {hovered && !prefersReducedMotion && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="text-[20px]"
                  aria-hidden="true"
                >
                  🔒
                </motion.span>
              )}
            </AnimatePresence>
            <h3
              className="text-[24px] md:text-[32px] lg:text-[36px] font-medium tracking-[-0.02em] truncate transition-colors duration-200
                dark:text-mint/80 text-[#2a7a4a]
                group-hover:dark:text-mint group-hover:text-[#1a5a3a]"
            >
              Portfolio Plus
            </h3>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8 shrink-0 ml-8">
          <span className="text-[11px] tracking-[2px] uppercase px-2 py-1 rounded
            dark:bg-[#1e2e22] dark:text-mint/60 dark:border dark:border-mint/20
            bg-[#d4f5e2] text-[#2a7a4a] border border-[#88dda8]">
            NDA
          </span>

          <span className="text-[11px] tracking-[1px] uppercase dark:text-off-white/60 text-mid-gray hidden lg:block">
            {t('label')}
          </span>

          <span aria-hidden="true" className="text-[16px] transition-transform duration-200 dark:text-mint text-[#2a7a4a] group-hover:translate-x-1">
            →
          </span>
        </div>
      </Link>
    </motion.div>
  )
}
