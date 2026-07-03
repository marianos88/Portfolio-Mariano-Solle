'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function PasswordGate({ from }: { from?: string }) {
  const t = useTranslations('portfolioPlus')
  const router = useRouter()
  const [code, setCode] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(false)

    const res = await fetch('/api/unlock', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    })

    if (res.ok) {
      router.push(from || '/portfolio-plus')
    } else {
      setError(true)
      setLoading(false)
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-4 max-w-sm"
    >
      <label
        htmlFor="access-code"
        className="block text-[11px] tracking-[2px] uppercase dark:text-off-white/50 text-mid-gray"
      >
        {t('accessCodeLabel')}
      </label>
      <input
        id="access-code"
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder={t('accessCodePlaceholder')}
        required
        autoComplete="off"
        autoFocus
        aria-describedby={error ? 'access-code-error' : undefined}
        aria-invalid={error ? true : undefined}
        className="w-full px-4 py-3 rounded-md border text-[14px] font-light outline-none transition-all
          dark:bg-[#1e1e1e] dark:border-mid-gray dark:text-off-white dark:placeholder-off-white/20
          bg-white border-[#e0e0e0] text-dark placeholder-mid-gray/40
          focus:dark:border-mint/50 focus:border-[#2a7a4a]/50"
      />
      {error && (
        <motion.div
          id="access-code-error"
          role="alert"
          aria-live="polite"
          initial={{ opacity: 0, x: -4 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-1"
        >
          <p className="text-[12px] dark:text-red-400 text-red-500">{t('error')}</p>
          <p className="text-[12px] dark:text-off-white/40 text-mid-gray">{t('errorSuffix')}</p>
        </motion.div>
      )}
      <button
        type="submit"
        disabled={loading}
        aria-busy={loading}
        className="w-full py-3 rounded-md text-[13px] font-medium transition-all duration-200
          disabled:opacity-50 hover:opacity-90
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
          dark:focus-visible:ring-mint focus-visible:ring-[#2a7a4a]
          dark:bg-mint dark:text-mid-gray
          bg-dark text-off-white"
      >
        {t('submit')}
      </button>
    </motion.form>
  )
}
