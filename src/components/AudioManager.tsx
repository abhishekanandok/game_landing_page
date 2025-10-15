'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface AudioManagerProps {
  children: React.ReactNode
}

export default function AudioManager({ children }: AudioManagerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio context for ambient sounds
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio()
      audioRef.current.loop = true
      audioRef.current.volume = 0.3
      
      // You would load your ambient track here
      // audioRef.current.src = '/audio/ambient-fantasy.mp3'
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const toggleAudio = async () => {
    if (!audioRef.current) return

    try {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        await audioRef.current.play()
        setIsPlaying(true)
        setIsMuted(false)
      }
    } catch (error) {
      console.log('Audio playback failed:', error)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  // Sound effect functions for UI interactions
  const playHoverSound = () => {
    if (isMuted) return
    // Play hover sound effect
    const hoverSound = new Audio()
    // hoverSound.src = '/audio/hover.mp3'
    hoverSound.volume = 0.2
    hoverSound.play().catch(() => {})
  }

  const playClickSound = () => {
    if (isMuted) return
    // Play click sound effect
    const clickSound = new Audio()
    // clickSound.src = '/audio/click.mp3'
    clickSound.volume = 0.3
    clickSound.play().catch(() => {})
  }

  const playMagicSound = () => {
    if (isMuted) return
    // Play magic/portal sound effect
    const magicSound = new Audio()
    // magicSound.src = '/audio/magic.mp3'
    magicSound.volume = 0.4
    magicSound.play().catch(() => {})
  }

  return (
    <div className="relative">
      {children}
      
      {/* Audio Controls */}
      <div className="fixed bottom-6 right-6 z-50 flex gap-3">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleAudio}
          onMouseEnter={playHoverSound}
          className="bg-black/70 backdrop-blur-sm border border-primary/30 rounded-full p-3 text-primary hover:bg-primary/20 transition-colors"
          title={isPlaying ? 'Pause ambient music' : 'Play ambient music'}
        >
          {isPlaying ? '⏸️' : '▶️'}
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMute}
          onMouseEnter={playHoverSound}
          className="bg-black/70 backdrop-blur-sm border border-primary/30 rounded-full p-3 text-primary hover:bg-primary/20 transition-colors"
          title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
        >
          {isMuted ? '🔇' : '🔊'}
        </motion.button>
      </div>

      {/* Audio Context Provider */}
      <AudioContext.Provider value={{ playHoverSound, playClickSound, playMagicSound, isMuted }}>
        <div style={{ display: 'none' }}>{/* Context consumer placeholder */}</div>
      </AudioContext.Provider>
    </div>
  )
}

// Audio Context for components to use sound effects
import { createContext, useContext } from 'react'

interface AudioContextType {
  playHoverSound: () => void
  playClickSound: () => void
  playMagicSound: () => void
  isMuted: boolean
}

const AudioContext = createContext<AudioContextType>({
  playHoverSound: () => {},
  playClickSound: () => {},
  playMagicSound: () => {},
  isMuted: true
})

export const useAudio = () => useContext(AudioContext)

// Enhanced button component with sound effects
export function SoundButton({ 
  children, 
  onClick, 
  className = '',
  soundType = 'click',
  ...props 
}: {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  soundType?: 'click' | 'magic' | 'hover'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}) {
  const { playHoverSound, playClickSound, playMagicSound } = useAudio()

  const handleClick = () => {
    if (soundType === 'click') playClickSound()
    else if (soundType === 'magic') playMagicSound()
    onClick?.()
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={playHoverSound}
      onClick={handleClick}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  )
}
