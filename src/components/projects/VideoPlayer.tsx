'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'

export default function VideoPlayer({
  src,
  poster,
  orientation = 'landscape',
}: {
  src: string
  poster?: string
  orientation?: 'landscape' | 'portrait'
}) {
  const t = useTranslations('videoPlayer')
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  const toggle = () => {
    if (!videoRef.current) return
    if (playing) {
      videoRef.current.pause()
      setPlaying(false)
    } else {
      videoRef.current.play()
      setPlaying(true)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggle()
    }
  }

  const handleEnded = () => setPlaying(false)

  const containerClass =
    orientation === 'portrait'
      ? 'relative mx-auto aspect-[9/16] rounded-xl overflow-hidden bg-black cursor-pointer'
      : 'relative w-full aspect-video rounded-xl overflow-hidden bg-black cursor-pointer'

  const containerStyle =
    orientation === 'portrait' ? { maxWidth: '320px' } : undefined

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={playing ? t('pause') : t('play')}
      aria-pressed={playing}
      className={containerClass}
      style={containerStyle}
      onClick={toggle}
      onKeyDown={handleKeyDown}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        onEnded={handleEnded}
        className="w-full h-full object-cover"
        playsInline
        preload="none"
        aria-hidden="true"
      />

      <AnimatePresence>
        {!playing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center bg-black/50"
            aria-hidden="true"
          >
            <motion.div
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              transition={{ duration: 0.25 }}
              className="w-16 h-16 rounded-full flex items-center justify-center
                dark:bg-mint bg-off-white shadow-2xl"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 3l14 9-14 9V3z" fill="currentColor" className="dark:text-mid-gray text-dark" />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {playing && (
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/20"
          aria-hidden="true"
        >
          <div className="w-14 h-14 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="6" y="4" width="4" height="16" rx="1" fill="white" />
              <rect x="14" y="4" width="4" height="16" rx="1" fill="white" />
            </svg>
          </div>
        </div>
      )}
    </div>
  )
}
