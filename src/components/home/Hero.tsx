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

      {/* ─── Volumetric ambient light — dark mode only ─────────────────────
          7 oversized solid-color divs blurred 200–480px.
          At this level no shape is visible — only atmospheric zones of
          diffused light. Positioned entirely in the right half so the
          gaussian falloff alone creates the organic dark→light transition.
          No hard-edge overlays; only a very wide gradient from left.
      ─────────────────────────────────────────────────────────────────── */}
      {theme === 'dark' && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ overflow: 'hidden' }}
          aria-hidden="true"
        >
          {/* V1 — tall column, dark green depth base */}
          <div style={{
            position: 'absolute',
            width: '60%', height: '150%',
            top: '-25%', right: '-10%',
            background: 'rgba(95, 160, 120, 0.60)',
            filter: 'blur(340px)',
            transform: 'rotate(7deg)',
            animation: 'heroAmbient1 52s ease-in-out infinite',
            willChange: 'transform',
          }} />

          {/* V2 — wide upper mint cloud, bright concentration */}
          <div style={{
            position: 'absolute',
            width: '75%', height: '80%',
            top: '-20%', right: '-15%',
            background: 'rgba(170, 238, 196, 0.46)',
            filter: 'blur(260px)',
            transform: 'rotate(-5deg)',
            animation: 'heroAmbient2 67s ease-in-out infinite',
            willChange: 'transform',
          }} />

          {/* V3 — diagonal sweep, aurora-band quality */}
          <div style={{
            position: 'absolute',
            width: '85%', height: '50%',
            top: '25%', right: '-22%',
            background: 'rgba(140, 210, 168, 0.42)',
            filter: 'blur(400px)',
            transform: 'rotate(-12deg)',
            animation: 'heroAmbient3 45s ease-in-out infinite',
            willChange: 'transform',
          }} />

          {/* V4 — lower-right depth, darker undertone */}
          <div style={{
            position: 'absolute',
            width: '65%', height: '85%',
            bottom: '-28%', right: '-5%',
            background: 'rgba(80, 148, 108, 0.50)',
            filter: 'blur(440px)',
            transform: 'rotate(10deg)',
            animation: 'heroAmbient2 58s ease-in-out infinite reverse',
            willChange: 'transform',
          }} />

          {/* V5 — mid-right floating volume, high mint density */}
          <div style={{
            position: 'absolute',
            width: '50%', height: '95%',
            top: '3%', right: '2%',
            background: 'rgba(170, 238, 196, 0.32)',
            filter: 'blur(290px)',
            transform: 'rotate(-6deg)',
            animation: 'heroAmbient1 73s ease-in-out infinite reverse',
            willChange: 'transform',
          }} />

          {/* V6 — wide shallow layer, extends glow toward center */}
          <div style={{
            position: 'absolute',
            width: '80%', height: '60%',
            top: '18%', right: '-18%',
            background: 'rgba(120, 185, 148, 0.28)',
            filter: 'blur(500px)',
            transform: 'rotate(4deg)',
            animation: 'heroAmbient3 61s ease-in-out infinite',
            willChange: 'transform',
          }} />

          {/* V7 — thin luminous upper strip */}
          <div style={{
            position: 'absolute',
            width: '55%', height: '32%',
            top: '-6%', right: '8%',
            background: 'rgba(170, 238, 196, 0.30)',
            filter: 'blur(210px)',
            transform: 'rotate(-16deg)',
            animation: 'heroAmbient2 39s ease-in-out infinite',
            willChange: 'transform',
          }} />

          {/* ── Left shield ───────────────────────────────────────────────
              Very wide, very gradual. The blur volumes don't extend past
              ~35% from left naturally, but this ensures the text column
              stays anchored in darkness. No abrupt stops — every step
              is spread over at least 10% to prevent any visible seam.
          ─────────────────────────────────────────────────────────────── */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: [
              'linear-gradient(to right,',
              '  #232323       0%,',
              '  #232323       20%,',
              '  rgba(35,35,35,0.96) 30%,',
              '  rgba(35,35,35,0.82) 42%,',
              '  rgba(35,35,35,0.52) 54%,',
              '  rgba(35,35,35,0.18) 65%,',
              '  rgba(35,35,35,0.04) 73%,',
              '  transparent    80%',
              ')',
            ].join(' '),
          }} />

          {/* Bottom anchor — keeps lower third in darkness */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, #232323 0%, rgba(35,35,35,0.70) 18%, rgba(35,35,35,0.18) 36%, transparent 54%)',
          }} />
        </div>
      )}

      {/* ─── Parallax decorative panel (right side) ───────────────────────
          In dark mode the ambient volumes replace the need for any dark
          overlay here — removing it eliminates the hard vertical seam
          that was visible at the 50% mark.
      ─────────────────────────────────────────────────────────────────── */}
      <motion.div
        style={{ y: parallaxY }}
        className="absolute right-0 top-0 w-1/2 h-full pointer-events-none hidden lg:block"
      >
        {/* Light-mode overlay only — dark mode lets the ambient show through */}
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-off-white z-10 dark:opacity-0" />
        <div className="w-full h-full dark:opacity-0 bg-[#efefef] opacity-60" />
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
