'use client'

import { useState, useTransition } from 'react'

export default function LangSwitch() {
  const [locale, setLocale] = useState<'es' | 'en'>(() => {
    if (typeof document !== 'undefined') {
      const match = document.cookie.match(/locale=([^;]+)/)
      return (match?.[1] as 'es' | 'en') ?? 'es'
    }
    return 'es'
  })
  const [, startTransition] = useTransition()

  const toggle = () => {
    const next = locale === 'es' ? 'en' : 'es'
    document.cookie = `locale=${next}; path=/; max-age=31536000`
    setLocale(next)
    startTransition(() => {
      window.location.reload()
    })
  }

  return (
    <button
      onClick={toggle}
      aria-label="Switch language"
      className="text-[11px] tracking-[2px] uppercase transition-theme hover:opacity-70 dark:text-off-white/60 light:text-mid-gray"
    >
      <span className={locale === 'es' ? 'opacity-100' : 'opacity-40'}>ES</span>
      <span className="mx-1 opacity-30">|</span>
      <span className={locale === 'en' ? 'opacity-100' : 'opacity-40'}>EN</span>
    </button>
  )
}
