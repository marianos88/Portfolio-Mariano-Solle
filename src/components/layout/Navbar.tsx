'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import ThemeToggle from '@/components/ui/ThemeToggle'
import LangSwitch from '@/components/ui/LangSwitch'
import { useScrollNav } from '@/hooks/useScrollNav'
import { useState, useRef, useEffect } from 'react'

export default function Navbar() {
  const t = useTranslations('nav')
  const scrolled = useScrollNav()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  // Move focus into the menu when it opens; return focus to the button when it closes
  useEffect(() => {
    if (menuOpen) {
      const firstLink = mobileMenuRef.current?.querySelector<HTMLAnchorElement>('a')
      firstLink?.focus()
    }
  }, [menuOpen])

  const closeMenu = () => {
    setMenuOpen(false)
    // Return focus to the trigger button
    menuButtonRef.current?.focus()
  }

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        paddingTop: scrolled ? '12px' : '20px',
        paddingBottom: scrolled ? '12px' : '20px',
      }}
    >
      {/* Background layer */}
      <div
        className={`absolute inset-0 transition-all duration-300 ${
          scrolled
            ? 'dark:bg-dark/80 bg-white/80 backdrop-blur-md dark:border-b dark:border-mid-gray/30 border-b border-[#e0e0e0]/50'
            : 'bg-transparent'
        }`}
      />

      <div className="relative max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-[15px] font-medium tracking-tight transition-theme dark:text-off-white text-dark hover:opacity-70"
        >
          Mariano Solle
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { href: '/about', label: t('about') },
            { href: '/projects', label: t('projects') },
            { href: '/portfolio-plus', label: t('portfolioPlus') },
            { href: '/contact', label: t('contact') },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-[13px] font-light transition-theme dark:text-off-white/70 text-mid-gray hover:dark:text-off-white hover:text-dark"
            >
              {label}
            </Link>
          ))}

          <div className="flex items-center gap-4 ml-4 pl-4 border-l dark:border-mid-gray/50 border-[#e0e0e0]">
            <LangSwitch />
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-4">
          <LangSwitch />
          <ThemeToggle />
          <button
            ref={menuButtonRef}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? t('closeMenu') : t('openMenu')}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="text-[11px] tracking-[2px] uppercase dark:text-off-white/60 text-mid-gray w-6 text-center"
          >
            <span aria-hidden="true">{menuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          ref={mobileMenuRef}
          id="mobile-menu"
          role="dialog"
          aria-label={t('mobileNav')}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden px-6 pt-4 pb-6 flex flex-col gap-5 dark:bg-dark/95 bg-white/95 backdrop-blur-md"
        >
          {[
            { href: '/about', label: t('about') },
            { href: '/projects', label: t('projects') },
            { href: '/portfolio-plus', label: t('portfolioPlus') },
            { href: '/contact', label: t('contact') },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={closeMenu}
              className="text-[15px] font-light transition-theme dark:text-off-white/70 text-mid-gray"
            >
              {label}
            </Link>
          ))}
        </motion.div>
      )}
    </motion.nav>
  )
}
