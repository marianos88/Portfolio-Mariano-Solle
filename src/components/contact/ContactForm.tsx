'use client'

import { useState, useRef, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { track } from '@/lib/analytics'
import ExternalLink from '@/components/ui/ExternalLink'

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ContactForm() {
  const t = useTranslations('contact')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<FormStatus>('idle')
  const [serverError, setServerError] = useState('')

  const [touched, setTouched] = useState({ name: false, email: false, message: false })
  const [submitAttempted, setSubmitAttempted] = useState(false)

  const honeypotRef = useRef<HTMLInputElement>(null)
  const successRef = useRef<HTMLDivElement>(null)

  const fieldErrors = {
    name: !name.trim() ? t('errorName') : '',
    email: !email.trim() || !EMAIL_RE.test(email.trim()) ? t('errorEmail') : '',
    message: !message.trim() ? t('errorMessage') : '',
  }

  const isFormValid = !fieldErrors.name && !fieldErrors.email && !fieldErrors.message
  const isLoading = status === 'loading'

  const showError = (field: keyof typeof touched) =>
    touched[field] || submitAttempted ? fieldErrors[field] : ''

  const touch = (field: keyof typeof touched) =>
    setTouched((prev) => ({ ...prev, [field]: true }))

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
      // Move focus to the success message so screen readers announce it
      el.focus()
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
        track({ name: 'contact_form_submit' })
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
  const inputError = inputBase + 'dark:border-red-400 border-red-400 focus:ring-red-300/30'

  return (
    <>
      {status === 'success' ? (
        <div ref={successRef} tabIndex={-1} role="status" aria-live="polite" className="outline-none">
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
            <label htmlFor="contact-name" className="sr-only">
              {t('namePlaceholder')}
            </label>
            <input
              id="contact-name"
              type="text"
              placeholder={t('namePlaceholder')}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => touch('name')}
              required
              disabled={isLoading}
              aria-invalid={showError('name') ? true : undefined}
              aria-describedby={showError('name') ? 'contact-name-error' : undefined}
              className={showError('name') ? inputError : inputNormal}
            />
            {showError('name') && (
              <p id="contact-name-error" role="alert" className="mt-1 text-[12px] font-light text-red-500 dark:text-red-400">
                {showError('name')}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="contact-email" className="sr-only">
              {t('emailPlaceholder')}
            </label>
            <input
              id="contact-email"
              type="email"
              placeholder={t('emailPlaceholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => touch('email')}
              required
              disabled={isLoading}
              aria-invalid={showError('email') ? true : undefined}
              aria-describedby={showError('email') ? 'contact-email-error' : undefined}
              className={showError('email') ? inputError : inputNormal}
            />
            {showError('email') && (
              <p id="contact-email-error" role="alert" className="mt-1 text-[12px] font-light text-red-500 dark:text-red-400">
                {showError('email')}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="contact-message" className="sr-only">
              {t('messagePlaceholder')}
            </label>
            <textarea
              id="contact-message"
              placeholder={t('messagePlaceholder')}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onBlur={() => touch('message')}
              required
              rows={5}
              disabled={isLoading}
              aria-invalid={showError('message') ? true : undefined}
              aria-describedby={showError('message') ? 'contact-message-error' : undefined}
              className={
                (showError('message') ? inputError : inputNormal).replace(
                  'transition-theme',
                  'transition-theme resize-none',
                )
              }
            />
            {showError('message') && (
              <p id="contact-message-error" role="alert" className="mt-1 text-[12px] font-light text-red-500 dark:text-red-400">
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
        <ExternalLink
          href="https://linkedin.com/in/marianosolle"
          destination="linkedin"
          className="text-[12px] tracking-[1px] uppercase transition-theme dark:text-off-white/60 text-mid-gray hover:opacity-100"
        >
          LinkedIn
          <span aria-hidden="true"> →</span>
          <span className="sr-only"> (opens in new tab)</span>
        </ExternalLink>
        <ExternalLink
          href="https://dribbble.com/marianosolle"
          destination="dribbble"
          className="text-[12px] tracking-[1px] uppercase transition-theme dark:text-off-white/60 text-mid-gray hover:opacity-100"
        >
          Dribbble
          <span aria-hidden="true"> →</span>
          <span className="sr-only"> (opens in new tab)</span>
        </ExternalLink>
      </div>
    </>
  )
}
