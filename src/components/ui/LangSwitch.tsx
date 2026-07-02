'use client'

import { useLocale } from 'next-intl'

export default function LangSwitch() {
  const locale = useLocale()

  const toggle = () => {
    const next = locale === 'es' ? 'en' : 'es'
    document.cookie = `locale=${next}; path=/; max-age=31536000`
    window.location.reload()
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
