'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export default function PlusBanner() {
  const t = useTranslations('plusBanner')
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="px-6 pb-20 max-w-6xl mx-auto">
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
        whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-xl border p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6
          dark:bg-[#1e2e22] dark:border-[#AAEEC433]
          bg-[#d4f5e2] border-[#88dda8]"
      >
        <div>
          <p className="text-[11px] tracking-[2px] uppercase mb-3 dark:text-mint text-[#2a7a4a]">
            {t('label')}
          </p>
          <h2 className="text-[24px] md:text-[28px] font-medium tracking-tight mb-2 dark:text-off-white text-dark">
            {t('title')}
          </h2>
          <p className="text-[14px] font-light leading-[1.7] max-w-md dark:text-off-white/60 text-mid-gray">
            {t('description')}
          </p>
        </div>

        <Link
          href="/portfolio-plus"
          className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-md text-[13px] font-medium transition-all duration-200 hover:opacity-90
            dark:bg-mint dark:text-mid-gray
            bg-dark text-off-white"
        >
          <span aria-hidden="true">🔒</span>
          {t('cta')}
        </Link>
      </motion.div>
    </section>
  )
}
