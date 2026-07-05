'use client'

import { useState, useRef, useEffect } from 'react'
import { useTranslations } from 'next-intl'

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ContactPage() {
  const t = useTranslations('contact')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<FormStatus>('idle')
  const [serverError, setServerError] = useState('')

  // Track which fields have been blurred at least once
  const [touched, setTouched] = useState({ name: false, email: false, message: false })
  // Whether the user has attempted a submit (reveals all errors at once)
  const [submitAttempted, setSubmitAttempted] = useState(false)

  // Honeypot ref
  const honeypotRef = useRef<HTMLInputElement>(null)
  // Ref to animate the success block
  const successRef = useRef<HTMLDivElement>(null)

  // Per-field validation errors (derived, not stored)
  const fieldErrors = {
    name: !name.trim() ? t('errorName') : '',
    email: !email.trim() || !EMAIL_RE.test(email.trim()) ? t('errorEmail') : '',
    message: !message.trim() ? t('errorMessage') : '',
  }

  const isFormValid = !fieldErrors.name && !fieldErrors.email && !fieldErrors.message
  const isLoading = status === 'loading'

  // Show a field error only after blur or first submit attempt
  const showError = (field: keyof typeof touched) =>
    (touched[field] || submitAttempted) ? fieldErrors[field] : ''

  const touch = (field: keyof typeof touched) =>
    setTouched((prev) => ({ ...prev, [field]: true }))

  // Animate success block in after mount
  useEffect(() => {
    if (status === 'success' && successRef.current) {
      const el = successRef.current
      el.style.opacity = '0'
      el.style.transform = 'translateY(8px)'
      requestAnimationFrame(() => {
        el.style.transition = 'opacity 220ms ease, transform 220ms ease'
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      })
    }
  }, [status])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitAttempted(true)

    if (honeypotRef.current?.value) return
    if (!isFormValid || isLoading) return

    setStatus('loading')
    setServerError('')

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
        setTouched({ name: false, email: false, message: false })
        setSubmitAttempted(false)
        setTimeout(() => setStatus('idle'), 6000)
      } else if (res.status === 400) {
        setServerError(data.error ?? t('errorValidation'))
        setStatus('error')
      } else {
        setServerError(t('errorGeneric'))
        setStatus('error')
      }
    } catch {
      setServerError(t('errorGeneric'))
      setStatus('error')
    }
  }

  const inputBase =
    'w-full px-4 py-3 rounded-md border text-[14px] font-light outline-none transition-theme ' +
    'dark:bg-[#2e2e2e] dark:text-off-white dark:placeholder-off-white/30 ' +
    'bg-white text-dark focus:ring-2 focus:ring-mint/30 ' +
    'disabled:opacity-50 disabled:cursor-not-allowed '

  const inputNormal = inputBase + 'dark:border-mid-gray border-[#e0e0e0]'
  const inputError  = inputBase + 'dark:border-red-400 border-red-400 focus:ring-red-300/30'

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
        <div ref={successRef}>
          <p className="text-[16px] font-medium dark:text-mint text-[#2a7a4a] mb-1">
            {t('successTitle')}
          </p>
          <p className="text-[15px] font-light dark:text-off-white/70 text-mid-gray">
            {t('successBody')}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Honeypot */}
          <input
            ref={honeypotRef}
            type="text"
            name="website"
            aria-hidden="true"
            tabIndex={-1}
            autoComplete="off"
            style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}
          />

          <div>
            <input
              type="text"
              placeholder={t('namePlaceholder')}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => touch('name')}
              required
              disabled={isLoading}
              aria-label={t('namePlaceholder')}
              aria-invalid={!!showError('name')}
              className={showError('name') ? inputError : inputNormal}
            />
            {showError('name') && (
              <p role="alert" className="mt-1 text-[12px] font-light text-red-500 dark:text-red-400">
                {showError('name')}
              </p>
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder={t('emailPlaceholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => touch('email')}
              required
              disabled={isLoading}
              aria-label={t('emailPlaceholder')}
              aria-invalid={!!showError('email')}
              className={showError('email') ? inputError : inputNormal}
            />
            {showError('email') && (
              <p role="alert" className="mt-1 text-[12px] font-light text-red-500 dark:text-red-400">
                {showError('email')}
              </p>
            )}
          </div>

          <div>
            <textarea
              placeholder={t('messagePlaceholder')}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onBlur={() => touch('message')}
              required
              rows={5}
              disabled={isLoading}
              aria-label={t('messagePlaceholder')}
              aria-invalid={!!showError('message')}
              className={
                (showError('message') ? inputError : inputNormal).replace('transition-theme', 'transition-theme resize-none')
              }
            />
            {showError('message') && (
              <p role="alert" className="mt-1 text-[12px] font-light text-red-500 dark:text-red-400">
                {showError('message')}
              </p>
            )}
          </div>

          {status === 'error' && serverError && (
            <p role="alert" className="text-[13px] font-light text-red-500 dark:text-red-400">
              {serverError}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading || !isFormValid}
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
