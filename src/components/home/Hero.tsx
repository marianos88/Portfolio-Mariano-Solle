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

      {/* ── Aurora volumetric background ── dark mode only ──────────────────
       *
       *  Architecture: 7 solid-color divs with filter:blur(250–500px).
       *  At these blur levels the original shape is completely unrecognisable —
       *  only zones of diffused atmospheric light remain. No radial-gradient,
       *  no circles, no blobs. The gaussian falloff does all the transitions.
       *
       *  Composition (matches reference preview):
       *   · Luminosity peaks in the upper-right quadrant
       *   · A diagonal band sweeps from 1 o'clock toward 7 o'clock
       *   · Lower-left corner stays at #232323
       *   · Left text column stays fully dark via a wide multi-stop shield
       *
       *  All volumes are confined to the right 45–100% of the viewport.
       *  With 300px blur on a 1440px screen that adds ~21% bleed leftward,
       *  placing the natural fade boundary around the 25–35% mark — well
       *  behind the left shield which holds solid dark through 20%.
       * ─────────────────────────────────────────────────────────────────── */}
      {theme === 'dark' && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ overflow: 'hidden' }}
          aria-hidden="true"
        >

          {/* V1 ── upper-right primary mass
               Large, bright. The dominant light source of the composition.
               Tilted to create the diagonal aurora direction. */}
          <div style={{
            position: 'absolute',
            width: '70%',
            height: '90%',
            top: '-20%',
            right: '-12%',
            background: 'rgba(170, 238, 196, 0.50)',
            filter: 'blur(280px)',
            transform: 'rotate(-8deg)',
            animation: 'heroAmbient1 54s ease-in-out infinite',
            willChange: 'transform',
          }} />

          {/* V2 ── deep green base layer
               Darker tone for depth behind V1. Wider vertical extent. */}
          <div style={{
            position: 'absolute',
            width: '60%',
            height: '130%',
            top: '-15%',
            right: '-8%',
            background: 'rgba(90, 155, 110, 0.65)',
            filter: 'blur(340px)',
            transform: 'rotate(5deg)',
            animation: 'heroAmbient2 71s ease-in-out infinite',
            willChange: 'transform',
          }} />

          {/* V3 ── diagonal aurora band
               Strongly rotated horizontal slab. Creates the sweeping
               streak visible in the reference from upper-right to center. */}
          <div style={{
            position: 'absolute',
            width: '82%',
            height: '38%',
            top: '18%',
            right: '-20%',
            background: 'rgba(155, 220, 178, 0.44)',
            filter: 'blur(260px)',
            transform: 'rotate(-18deg)',
            animation: 'heroAmbient3 47s ease-in-out infinite',
            willChange: 'transform',
          }} />

          {/* V4 ── secondary upper sweep
               Slightly offset from V1 to break symmetry and add depth. */}
          <div style={{
            position: 'absolute',
            width: '55%',
            height: '65%',
            top: '-10%',
            right: '3%',
            background: 'rgba(170, 238, 196, 0.28)',
            filter: 'blur(310px)',
            transform: 'rotate(-4deg)',
            animation: 'heroAmbient1 63s ease-in-out infinite reverse',
            willChange: 'transform',
          }} />

          {/* V5 ── mid-right atmospheric fill
               Keeps the center-right from going too dark between bands. */}
          <div style={{
            position: 'absolute',
            width: '52%',
            height: '75%',
            top: '12%',
            right: '-2%',
            background: 'rgba(120, 190, 148, 0.36)',
            filter: 'blur(380px)',
            transform: 'rotate(11deg)',
            animation: 'heroAmbient2 56s ease-in-out infinite reverse',
            willChange: 'transform',
          }} />

          {/* V6 ── lower-right anchor
               Pulls light into the bottom-right corner, mirrors the
               reference which has ambient green in that region. */}
          <div style={{
            position: 'absolute',
            width: '58%',
            height: '70%',
            bottom: '-20%',
            right: '-6%',
            background: 'rgba(80, 148, 108, 0.52)',
            filter: 'blur(420px)',
            transform: 'rotate(8deg)',
            animation: 'heroAmbient3 68s ease-in-out infinite',
            willChange: 'transform',
          }} />

          {/* V7 ── wide shallow central haze
               Extremely blurred, low opacity. Softens the transition zone
               and prevents any hard falloff line in the center. */}
          <div style={{
            position: 'absolute',
            width: '78%',
            height: '55%',
            top: '22%',
            right: '-16%',
            background: 'rgba(140, 210, 168, 0.22)',
            filter: 'blur(500px)',
            transform: 'rotate(-6deg)',
            animation: 'heroAmbient1 83s ease-in-out infinite',
            willChange: 'transform',
          }} />

          {/* ── Left dark shield ──────────────────────────────────────────
           *  Pure #232323 for the first 20%, then a very gradual multi-stop
           *  fade across 60% of the screen. No abrupt stop at any point.
           *  The gaussian blur handles the final organic transition;
           *  this shield only ensures the text column stays fully dark.
           * ─────────────────────────────────────────────────────────────── */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(to right,
              #232323        0%,
              #232323       20%,
              rgba(35,35,35,0.97) 28%,
              rgba(35,35,35,0.88) 36%,
              rgba(35,35,35,0.68) 46%,
              rgba(35,35,35,0.42) 56%,
              rgba(35,35,35,0.16) 66%,
              rgba(35,35,35,0.04) 74%,
              transparent   80%
            )`,
          }} />

          {/* ── Bottom fade ────────────────────────────────────────────────
           *  Sinks the lower third back into darkness so the hero footer
           *  area (scroll indicator, etc.) stays clean and dark.
           * ─────────────────────────────────────────────────────────────── */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(to top,
              #232323        0%,
              rgba(35,35,35,0.80) 15%,
              rgba(35,35,35,0.30) 32%,
              transparent   50%
            )`,
          }} />

        </div>
      )}

      {/* ── Parallax decorative panel ────────────────────────────────────────
       *  In dark mode the ambient volumes replace this entirely.
       *  Setting both children to opacity-0 in dark mode ensures zero
       *  interference (the old dark:bg-gradient-to-l was the cause of
       *  the hard vertical seam at the 50% mark).
       * ─────────────────────────────────────────────────────────────────── */}
      <motion.div
        style={{ y: parallaxY }}
        className="absolute right-0 top-0 w-1/2 h-full pointer-events-none hidden lg:block"
      >
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-off-white z-10 dark:opacity-0" />
        <div className="w-full h-full bg-[#efefef] opacity-60 dark:opacity-0" />
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
