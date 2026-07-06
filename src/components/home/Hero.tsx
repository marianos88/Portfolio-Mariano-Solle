'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Highlight from '@/components/ui/Highlight'
import { useTheme } from '@/components/ui/ThemeProvider'
import { useParallax } from '@/hooks/useParallax'

export default function Hero() {
  const t = useTranslations('hero')
  const { theme } = useTheme()
  const parallaxY = useParallax(500)
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24">
      {/* Volumetric ambient light — dark mode only */}
      {theme === 'dark' && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ overflow: 'hidden' }}
          aria-hidden="true"
        >
          {/*
           * 7 overlapping light volumes, each massively oversized and
           * blurred 250–500px. At this blur level no shape is visible —
           * only zones of diffused atmospheric light remain.
           * Volumes are offset, rotated, and animated at different speeds
           * so they never form symmetric or repeating patterns.
           */}

          {/* V1 — tall right-side column, primary depth layer */}
          <div
            style={{
              position: 'absolute',
              width: '65%',
              height: '140%',
              top: '-20%',
              right: '-12%',
              background: 'rgba(110, 175, 140, 0.55)',
              filter: 'blur(320px)',
              transform: 'rotate(6deg)',
              animation: 'heroAmbient1 52s ease-in-out infinite',
              willChange: 'transform',
            }}
          />

          {/* V2 — wide upper sweep, brighter mint concentration */}
          <div
            style={{
              position: 'absolute',
              width: '80%',
              height: '75%',
              top: '-18%',
              right: '-18%',
              background: 'rgba(170, 238, 196, 0.42)',
              filter: 'blur(260px)',
              transform: 'rotate(-4deg)',
              animation: 'heroAmbient2 67s ease-in-out infinite',
              willChange: 'transform',
            }}
          />

          {/* V3 — diagonal horizontal band across center */}
          <div
            style={{
              position: 'absolute',
              width: '90%',
              height: '45%',
              top: '28%',
              right: '-20%',
              background: 'rgba(145, 210, 170, 0.38)',
              filter: 'blur(380px)',
              transform: 'rotate(-11deg)',
              animation: 'heroAmbient3 45s ease-in-out infinite',
              willChange: 'transform',
            }}
          />

          {/* V4 — lower right depth, darker green undertone */}
          <div
            style={{
              position: 'absolute',
              width: '70%',
              height: '80%',
              bottom: '-25%',
              right: '-8%',
              background: 'rgba(90, 155, 115, 0.45)',
              filter: 'blur(420px)',
              transform: 'rotate(9deg)',
              animation: 'heroAmbient2 58s ease-in-out infinite reverse',
              willChange: 'transform',
            }}
          />

          {/* V5 — mid-right floating volume, highest mint density */}
          <div
            style={{
              position: 'absolute',
              width: '55%',
              height: '90%',
              top: '5%',
              right: '0%',
              background: 'rgba(170, 238, 196, 0.30)',
              filter: 'blur(280px)',
              transform: 'rotate(-7deg)',
              animation: 'heroAmbient1 73s ease-in-out infinite reverse',
              willChange: 'transform',
            }}
          />

          {/* V6 — wide shallow layer, extends glow toward center */}
          <div
            style={{
              position: 'absolute',
              width: '85%',
              height: '55%',
              top: '15%',
              right: '-15%',
              background: 'rgba(125, 190, 150, 0.25)',
              filter: 'blur(480px)',
              transform: 'rotate(3deg)',
              animation: 'heroAmbient3 61s ease-in-out infinite',
              willChange: 'transform',
            }}
          />

          {/* V7 — thin upper strip, adds luminosity to top edge */}
          <div
            style={{
              position: 'absolute',
              width: '60%',
              height: '30%',
              top: '-8%',
              right: '5%',
              background: 'rgba(170, 238, 196, 0.28)',
              filter: 'blur(200px)',
              transform: 'rotate(-15deg)',
              animation: 'heroAmbient2 39s ease-in-out infinite',
              willChange: 'transform',
            }}
          />

          {/* Left dark shield — hard dark on left, progressive fade to center */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to right, #232323 0%, #232323 28%, rgba(35,35,35,0.92) 38%, rgba(35,35,35,0.60) 48%, rgba(35,35,35,0.15) 60%, transparent 72%)',
            }}
          />

          {/* Bottom anchor — sinks lower third back into darkness */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to top, #232323 0%, rgba(35,35,35,0.75) 20%, rgba(35,35,35,0.20) 40%, transparent 58%)',
            }}
          />
        </div>
      )}

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
          className="text-[12px] tracking-[2px] uppercase mb-8 font-light"
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
          style={{ color: theme === 'dark' ? '#aaa' : '#555' }}
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
              border-mint dark:text-off-white/70
              text-mid-gray"
          >
            {t('ctaSecondary')}
          </Link>
        </motion.div>

        {/* Scroll indicator — purely decorative */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-10 left-6 flex items-center gap-2"
          aria-hidden="true"
        >
          <motion.div
            animate={prefersReducedMotion ? {} : { y: [0, 6, 0] }}
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
