'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import ThemeToggle from '@/components/ui/ThemeToggle'
import LangSwitch from '@/components/ui/LangSwitch'
import { useState } from 'react'

export default function Navbar() {
  const t = useTranslations('nav')
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-theme dark:bg-[#1a1a1a] dark:border-b dark:border-mid-gray bg-white border-b border-[#e0e0e0]">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-[15px] font-medium tracking-tight transition-theme dark:text-off-white text-dark hover:opacity-70"
        >
          Mariano Solle
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/about" className="text-[13px] font-light transition-theme dark:text-off-white/70 text-mid-gray hover:opacity-100">
            {t('about')}
          </Link>
          <Link href="/projects" className="text-[13px] font-light transition-theme dark:text-off-white/70 text-mid-gray hover:opacity-100">
            {t('projects')}
          </Link>
          <Link href="/portfolio-plus" className="text-[13px] font-light transition-theme dark:text-off-white/70 text-mid-gray hover:opacity-100">
            {t('portfolioPlus')}
          </Link>
          <Link href="/contact" className="text-[13px] font-light transition-theme dark:text-off-white/70 text-mid-gray hover:opacity-100">
            {t('contact')}
          </Link>

          <div className="flex items-center gap-4 ml-4 pl-4 border-l dark:border-mid-gray border-[#e0e0e0]">
            <LangSwitch />
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-4">
          <LangSwitch />
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            className="text-[11px] tracking-[2px] uppercase dark:text-off-white/60 text-mid-gray"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-6 flex flex-col gap-4 transition-theme dark:bg-[#1a1a1a] bg-white">
          {[
            { href: '/about', label: t('about') },
            { href: '/projects', label: t('projects') },
            { href: '/portfolio-plus', label: t('portfolioPlus') },
            { href: '/contact', label: t('contact') },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-[13px] font-light transition-theme dark:text-off-white/70 text-mid-gray"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
