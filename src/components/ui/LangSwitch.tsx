'use client'

import { useLocale } from 'next-intl'
import { track } from '@/lib/analytics'

export default function LangSwitch() {
  const locale = useLocale()

  const toggle = () => {
    const next = locale === 'es' ? 'en' : 'es'
    track({ name: 'language_switch', locale: next })
    document.cookie = `locale=${next}; path=/; max-age=31536000`
    window.location.reload()
  }

  const label =
    locale === 'es'
      ? 'Switch to English (currently Spanish)'
      : 'Cambiar a Español (actualmente English)'

  return (
    <button
      onClick={toggle}
      aria-label={label}
      className="text-[11px] tracking-[2px] uppercase transition-theme hover:opacity-70 dark:text-off-white/60 light:text-mid-gray"
    >
      <span aria-hidden="true" className={locale === 'es' ? 'opacity-100' : 'opacity-40'}>ES</span>
      <span aria-hidden="true" className="mx-1 opacity-30">|</span>
      <span aria-hidden="true" className={locale === 'en' ? 'opacity-100' : 'opacity-40'}>EN</span>
    </button>
  )
}
