import React, { createContext, useContext, useEffect, useState } from 'react'
import { MotionConfig } from 'framer-motion'

const MotionContext = createContext({ paused: false, toggle: () => {} })
export const useMotionSettings = () => useContext(MotionContext)

export default function MotionSettings({ children }) {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  )
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])
  const [userPaused, setPaused] = useState(false)
  const paused = !!reduced || userPaused
  return (
    <MotionContext.Provider
      value={{ paused, toggle: () => setPaused((p) => !p), reduced }}
    >
      <MotionConfig reducedMotion={paused ? 'always' : 'user'}>
        <div className={paused ? 'motion-paused' : ''}>{children}</div>
      </MotionConfig>
    </MotionContext.Provider>
  )
}
