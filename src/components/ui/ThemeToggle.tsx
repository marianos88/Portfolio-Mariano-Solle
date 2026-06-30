'use client'

import { useTheme } from './ThemeProvider'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="flex items-center gap-1 text-[11px] tracking-[2px] uppercase transition-theme hover:opacity-70"
    >
      <span className={theme === 'dark' ? 'text-mint' : 'text-mid-gray'}>
        {theme === 'dark' ? '◐' : '○'}
      </span>
    </button>
  )
}
