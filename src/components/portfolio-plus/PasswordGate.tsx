'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

export default function PasswordGate() {
  const t = useTranslations('portfolioPlus')
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(false)

    const res = await fetch('/api/unlock', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.refresh()
    } else {
      setError(true)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm">
      <label className="block text-[12px] tracking-[1px] uppercase dark:text-off-white/50 text-mid-gray">
        {t('passwordLabel')}
      </label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder={t('passwordPlaceholder')}
        required
        className="w-full px-4 py-3 rounded-md border text-[14px] font-light outline-none transition-theme
          dark:bg-[#2e2e2e] dark:border-mid-gray dark:text-off-white dark:placeholder-off-white/30
          bg-white border-[#e0e0e0] text-dark placeholder-mid-gray/50
          focus:ring-2 focus:ring-mint/30"
      />
      {error && (
        <p className="text-[12px] text-red-400">{t('error')}</p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-md text-[13px] font-medium transition-all duration-200 disabled:opacity-50
          dark:bg-mint dark:text-mid-gray
          bg-dark text-off-white hover:opacity-90"
      >
        {loading ? '...' : t('submit')}
      </button>
    </form>
  )
}
