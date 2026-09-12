import React from 'react'
import { Sun, Moon } from 'lucide-react'
import { useTheme, applyTheme } from '../theme'

/** Light ↔ dark switch shown in the header. */
export default function ThemeToggle({ className = '' }) {
  const theme = useTheme()
  const dark = theme === 'dark'
  return (
    <button
      type="button"
      onClick={() => applyTheme(dark ? 'light' : 'dark')}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={dark}
      className={`w-10 h-10 rounded-lg border border-border text-muted hover:text-text hover:bg-surface2 hover:border-border2 transition-colors flex items-center justify-center ${className}`}
    >
      {dark ? <Sun className="w-5 h-5 text-gold" /> : <Moon className="w-5 h-5 text-accent" />}
    </button>
  )
}
