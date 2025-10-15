'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { throttle } from '@/utils/throttle'

export default function GamingCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isClicking, setIsClicking] = useState(false)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([])

  useEffect(() => {
    let particleId = 0

    // Throttle cursor updates to 16ms for 60fps
    const handleMouseMove = throttle((e: MouseEvent) => {
      requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY })
        
        // Reduce particle creation frequency for better performance
        if (Math.random() > 0.85) {
          const newParticle = { id: particleId++, x: e.clientX, y: e.clientY }
          setParticles(prev => [...prev.slice(-10), newParticle]) // Reduced from 15 to 10
        }
      })
    }, 16)

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown, { passive: true })
    window.addEventListener('mouseup', handleMouseUp, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <>
      {/* Main Cursor Ring */}
      <motion.div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isClicking ? 0.8 : 1
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      >
        <div className="w-8 h-8 border-2 border-primary rounded-full" />
      </motion.div>

      {/* Inner Dot */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - 2,
          y: mousePosition.y - 2,
          scale: isClicking ? 1.5 : 1
        }}
        transition={{ type: 'spring', stiffness: 800, damping: 30 }}
      >
        <div className="w-1 h-1 bg-primary rounded-full" />
      </motion.div>

      {/* Particle Trail */}
      {particles.map((particle, index) => (
        <motion.div
          key={particle.id}
          className="fixed pointer-events-none z-[9998]"
          initial={{ x: particle.x, y: particle.y, opacity: 0.6, scale: 1 }}
          animate={{ 
            opacity: 0, 
            scale: 0,
            x: particle.x + (Math.random() - 0.5) * 20,
            y: particle.y + (Math.random() - 0.5) * 20
          }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          onAnimationComplete={() => {
            setParticles(prev => prev.filter(p => p.id !== particle.id))
          }}
        >
          <div className="w-1 h-1 bg-primary/60 rounded-full" />
        </motion.div>
      ))}
    </>
  )
}
