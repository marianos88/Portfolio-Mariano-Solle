'use client'

import { useState, useRef } from 'react'
import { useTranslations } from 'next-intl'

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export default function ContactPage() {
  const t = useTranslations('contact')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  // Honeypot ref — hidden from real users, filled by bots
  const honeypotRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Reject if honeypot is filled
    if (honeypotRef.current?.value) return

    if (status === 'loading') return
    setStatus('loading')
    setErrorMessage('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })

      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setName('')
        setEmail('')
        setMessage('')
        setTimeout(() => setStatus('idle'), 6000)
      } else if (res.status === 400) {
        setErrorMessage(data.error ?? t('errorValidation'))
        setStatus('error')
      } else {
        setErrorMessage(t('errorGeneric'))
        setStatus('error')
      }
    } catch {
      setErrorMessage(t('errorGeneric'))
      setStatus('error')
    }
  }

  const inputClass =
    'w-full px-4 py-3 rounded-md border text-[14px] font-light outline-none transition-theme ' +
    'dark:bg-[#2e2e2e] dark:border-mid-gray dark:text-off-white dark:placeholder-off-white/30 ' +
    'bg-white border-[#e0e0e0] text-dark focus:ring-2 focus:ring-mint/30 ' +
    'disabled:opacity-50 disabled:cursor-not-allowed'

  const isLoading = status === 'loading'

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

      {status === 'success' ? (
        <p className="text-[16px] font-light dark:text-mint text-[#2a7a4a]">{t('success')}</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Honeypot — visually hidden, aria-hidden so screen readers skip it */}
          <input
            ref={honeypotRef}
            type="text"
            name="website"
            aria-hidden="true"
            tabIndex={-1}
            autoComplete="off"
            style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}
          />

          <input
            type="text"
            placeholder={t('namePlaceholder')}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={isLoading}
            aria-label={t('namePlaceholder')}
            className={inputClass}
          />
          <input
            type="email"
            placeholder={t('emailPlaceholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
            aria-label={t('emailPlaceholder')}
            className={inputClass}
          />
          <textarea
            placeholder={t('messagePlaceholder')}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={5}
            disabled={isLoading}
            aria-label={t('messagePlaceholder')}
            className={
              'w-full px-4 py-3 rounded-md border text-[14px] font-light outline-none transition-theme resize-none ' +
              'dark:bg-[#2e2e2e] dark:border-mid-gray dark:text-off-white dark:placeholder-off-white/30 ' +
              'bg-white border-[#e0e0e0] text-dark focus:ring-2 focus:ring-mint/30 ' +
              'disabled:opacity-50 disabled:cursor-not-allowed'
            }
          />

          {status === 'error' && (
            <p role="alert" className="text-[13px] font-light text-red-500 dark:text-red-400">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            aria-busy={isLoading}
            className="px-8 py-3 rounded-md text-[13px] font-medium transition-all duration-200 hover:opacity-90
              dark:bg-mint dark:text-mid-gray
              bg-dark text-off-white
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? t('sending') : t('submit')}
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
