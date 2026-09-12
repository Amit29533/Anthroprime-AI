import { useEffect, useState } from 'react'

const STORAGE_KEY = 'ap-theme'

/** Read the current theme from the <html> class (set by the inline script / applyTheme). */
export function getTheme() {
  if (typeof document !== 'undefined') {
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  }
  return 'light'
}

/** Apply a theme, persist it, and notify subscribers so token/inline-style consumers re-render. */
export function applyTheme(theme) {
  const next = theme === 'dark' ? 'dark' : 'light'
  document.documentElement.classList.toggle('dark', next === 'dark')
  try { localStorage.setItem(STORAGE_KEY, next) } catch (e) { /* private mode */ }
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', next === 'dark' ? '#070A0F' : '#F9FAFB')
  window.dispatchEvent(new CustomEvent('ap-theme-change', { detail: { theme: next } }))
}

/** React hook: returns 'light' | 'dark' and re-renders on theme changes. */
export function useTheme() {
  const [theme, setTheme] = useState(getTheme)
  useEffect(() => {
    const onChange = () => setTheme(getTheme())
    window.addEventListener('ap-theme-change', onChange)
    return () => window.removeEventListener('ap-theme-change', onChange)
  }, [])
  return theme
}
