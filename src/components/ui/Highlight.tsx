'use client'

import { useTheme } from './ThemeProvider'

export default function Highlight({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()

  return (
    <span
      style={{
        background: theme === 'dark' ? '#AAEEC4' : '#3E3E3E',
        color: theme === 'dark' ? '#3E3E3E' : '#AAEEC4',
        borderRadius: '5px',
        padding: '0 8px 2px',
        display: 'inline',
      }}
    >
      {children}
    </span>
  )
}
