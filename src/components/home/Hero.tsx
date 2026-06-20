'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Highlight from '@/components/ui/Highlight'
import { useTheme } from '@/components/ui/ThemeProvider'

export default function Hero() {
  const t = useTranslations('hero')
  const { theme } = useTheme()

  return (
    <section className="pt-40 pb-20 px-6 max-w-6xl mx-auto">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-[11px] tracking-[2px] uppercase mb-6 font-light"
        style={{ color: theme === 'dark' ? '#AAEEC4' : '#2a7a4a' }}
      >
        {t('tag')}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-[46px] md:text-[52px] font-medium leading-tight tracking-[-0.02em] mb-6 max-w-2xl"
      >
        {t('titleLine1')}{' '}
        <br className="hidden md:block" />
        {t('titleLine2')} <Highlight>{t('titleHighlight')}</Highlight>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-[14px] font-light leading-[1.7] mb-10 max-w-[400px]"
        style={{ color: theme === 'dark' ? '#888' : '#555' }}
      >
        {t('description')}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
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
    </section>
  )
}
