'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

export default function ContactPage() {
  const t = useTranslations('contact')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Placeholder: integrate with email service (Resend, Formspree, etc.)
    setSent(true)
  }

  return (
    <div className="pt-32 pb-20 px-6 max-w-2xl mx-auto">
      <p className="text-[11px] tracking-[2px] uppercase mb-4 font-light dark:text-mint text-[#2a7a4a]">
        {t('tag')}
      </p>
      <h1 className="text-[36px] md:text-[46px] font-medium tracking-[-0.02em] mb-4 dark:text-off-white text-dark">
        {t('title')}
      </h1>
      <p className="text-[16px] font-light leading-[1.7] mb-12 dark:text-off-white/60 text-mid-gray">
        {t('description')}
      </p>

      {sent ? (
        <p className="text-[16px] font-light dark:text-mint text-[#2a7a4a]">{t('success')}</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder={t('namePlaceholder')}
            required
            className="w-full px-4 py-3 rounded-md border text-[14px] font-light outline-none transition-theme
              dark:bg-[#2e2e2e] dark:border-mid-gray dark:text-off-white dark:placeholder-off-white/30
              bg-white border-[#e0e0e0] text-dark focus:ring-2 focus:ring-mint/30"
          />
          <input
            type="email"
            placeholder={t('emailPlaceholder')}
            required
            className="w-full px-4 py-3 rounded-md border text-[14px] font-light outline-none transition-theme
              dark:bg-[#2e2e2e] dark:border-mid-gray dark:text-off-white dark:placeholder-off-white/30
              bg-white border-[#e0e0e0] text-dark focus:ring-2 focus:ring-mint/30"
          />
          <textarea
            placeholder={t('messagePlaceholder')}
            required
            rows={5}
            className="w-full px-4 py-3 rounded-md border text-[14px] font-light outline-none transition-theme resize-none
              dark:bg-[#2e2e2e] dark:border-mid-gray dark:text-off-white dark:placeholder-off-white/30
              bg-white border-[#e0e0e0] text-dark focus:ring-2 focus:ring-mint/30"
          />
          <button
            type="submit"
            className="px-8 py-3 rounded-md text-[13px] font-medium transition-all duration-200 hover:opacity-90
              dark:bg-mint dark:text-mid-gray
              bg-dark text-off-white"
          >
            {t('submit')}
          </button>
        </form>
      )}

      <div className="mt-12 pt-8 border-t dark:border-mid-gray border-[#e0e0e0] flex gap-6">
        <a
          href="https://linkedin.com/in/marianosolle"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[12px] tracking-[1px] uppercase transition-theme dark:text-off-white/40 text-mid-gray hover:opacity-100"
        >
          LinkedIn →
        </a>
        <a
          href="https://dribbble.com/marianosolle"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[12px] tracking-[1px] uppercase transition-theme dark:text-off-white/40 text-mid-gray hover:opacity-100"
        >
          Dribbble →
        </a>
      </div>
    </div>
  )
}
