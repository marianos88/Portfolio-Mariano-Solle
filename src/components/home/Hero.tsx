'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Highlight from '@/components/ui/Highlight'
import { useTheme } from '@/components/ui/ThemeProvider'
import { useParallax } from '@/hooks/useParallax'

export default function Hero() {
  const t = useTranslations('hero')
  const { theme } = useTheme()
  const parallaxY = useParallax(500)

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24">
      {/* Parallax background image / decorative element */}
      <motion.div
        style={{ y: parallaxY }}
        className="absolute right-0 top-0 w-1/2 h-full pointer-events-none hidden lg:block"
      >
        <div className="absolute inset-0 dark:bg-gradient-to-l dark:from-transparent dark:to-dark bg-gradient-to-l from-transparent to-off-white z-10" />
        {/* Placeholder: replace with actual hero image */}
        <div className="w-full h-full dark:bg-[#1e1e1e] bg-[#efefef] opacity-60" />
      </motion.div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20 lg:py-32">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[11px] tracking-[2px] uppercase mb-8 font-light"
          style={{ color: theme === 'dark' ? '#AAEEC4' : '#2a7a4a' }}
        >
          {t('tag')}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-[52px] md:text-[64px] lg:text-[72px] font-medium leading-[1.05] tracking-[-0.025em] mb-8 max-w-3xl"
        >
          {t('titleLine1')}
          <br />
          {t('titleLine2')} <Highlight>{t('titleHighlight')}</Highlight>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="text-[14px] font-light leading-[1.7] mb-10 max-w-2xl"
          style={{ color: theme === 'dark' ? '#888' : '#555' }}
        >
          {t('description')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="flex items-center gap-4 flex-wrap"
        >
          <Link
            href="/projects"
            className="px-6 py-3 text-[13px] font-medium rounded-md transition-all duration-200 hover:opacity-90
              dark:bg-mint dark:text-mid-gray
              bg-dark text-off-white"
          >
            {t('ctaPrimary')}
          </Link>
          <Link
            href="/about"
            className="px-6 py-3 text-[13px] font-light rounded-md border transition-all duration-200 hover:opacity-70
              dark:border-mid-gray dark:text-off-white/70
              border-[#ccc] text-mid-gray"
          >
            {t('ctaSecondary')}
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-10 left-6 flex items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="text-[11px] tracking-[2px] uppercase dark:text-off-white/30 text-mid-gray/50"
          >
            ↓
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
