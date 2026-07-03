'use client'

import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

export default function LockButton() {
  const t = useTranslations('portfolioPlus')
  const router = useRouter()

  const handleLock = async () => {
    await fetch('/api/lock', { method: 'POST' })
    router.refresh()
  }

  return (
    <button
      onClick={handleLock}
      className="text-[11px] tracking-[2px] uppercase transition-opacity opacity-40 hover:opacity-70
        dark:text-off-white text-dark
        focus-visible:outline-none focus-visible:opacity-100 focus-visible:underline"
    >
      {t('lockButton')}
    </button>
  )
}
