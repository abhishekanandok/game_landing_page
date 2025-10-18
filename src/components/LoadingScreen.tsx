'use client'

import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion, AnimatePresence } from 'framer-motion'
import { Progress } from '@react-three/drei'
import * as THREE from 'three'

function LoadingOrb() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial
        color="#d4af37"
        emissive="#d4af37"
        emissiveIntensity={0.5}
        transparent
        opacity={0.8}
      />
    </mesh>
  )
}

function LoadingRunes() {
  const runes = ['⚔️', '🛡️', '🔮', '⚡', '🌟', '💎']
  
  return (
    <>
      {runes.map((rune, index) => {
        const angle = (index / runes.length) * Math.PI * 2
        const radius = 2
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        
        return (
          <mesh key={index} position={[x, 0, z]}>
            <planeGeometry args={[0.5, 0.5]} />
            <meshStandardMaterial
              color="#8b5cf6"
              emissive="#8b5cf6"
              emissiveIntensity={0.3}
              transparent
              opacity={0.7}
            />
          </mesh>
        )
      })}
    </>
  )
}

function Loading3DScene({ progress }: { progress: number }) {
  return (
    <Canvas camera={{ position: [0, 2, 5], fov: 60 }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#d4af37" />
      
      <group rotation={[0, progress * 0.02, 0]}>
        <LoadingOrb />
        <LoadingRunes />
      </group>
      
      {/* Floating particles */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[3, 32, 32]} />
        <meshStandardMaterial
          color="#1a0a2e"
          transparent
          opacity={0.1}
          wireframe
        />
      </mesh>
    </Canvas>
  )
}

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [loadingText, setLoadingText] = useState('Initializing Portal...')

  const loadingSteps = [
    'Initializing Portal...',
    'Summoning Heroes...',
    'Preparing Battlefield...',
    'Charging Ancient Relics...',
    'Awakening the Realm...'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15 + 5
        
        // Update loading text based on progress
        const stepIndex = Math.floor((newProgress / 100) * loadingSteps.length)
        if (stepIndex < loadingSteps.length) {
          setLoadingText(loadingSteps[stepIndex])
        }
        
        if (newProgress >= 100) {
          clearInterval(interval)
          setIsComplete(true)
          setTimeout(onComplete, 1000)
          return 100
        }
        
        return newProgress
      })
    }, 200)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-gradient-to-br from-[#0a0914] via-purple-950/40 to-black z-50 flex items-center justify-center"
        >
          {/* 3D Loading Scene */}
          <div className="absolute inset-0">
            <Loading3DScene progress={progress} />
          </div>
          
          {/* UI Overlay */}
          <div className="relative z-10 text-center">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-primary text-glow mb-4" style={{ fontFamily: '"Permanent Marker", cursive', textShadow: '3px 3px 0px rgba(0,0,0,0.4), 0 0 20px rgba(212, 175, 55, 0.6)', transform: 'rotate(-1deg)', letterSpacing: '2px' }}>
                REALMS OF STRATEGY
              </h1>
              <p className="text-xl text-foreground/80">Preparing your adventure...</p>
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="w-80 mx-auto"
            >
              {/* Progress Bar */}
              <div className="bg-black/50 rounded-full h-3 mb-4 overflow-hidden border border-primary/30">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full glow"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              
              {/* Progress Text */}
              <div className="flex justify-between text-sm text-foreground/70 mb-6">
                <span>{Math.round(progress)}%</span>
                <span>Loading...</span>
              </div>
              
              {/* Loading Status */}
              <motion.p
                key={loadingText}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-primary font-medium"
                style={{ fontFamily: '"Permanent Marker", cursive', textShadow: '2px 2px 0px rgba(0,0,0,0.3)' }}
              >
                {loadingText}
              </motion.p>
            </motion.div>

            {/* Floating Runes */}
            <div className="absolute inset-0 pointer-events-none">
              {['⚔️', '🛡️', '🔮', '⚡'].map((rune, index) => (
                <motion.div
                  key={index}
                  className="absolute text-2xl opacity-30"
                  style={{
                    left: `${20 + index * 20}%`,
                    top: `${30 + (index % 2) * 40}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 360],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 3 + index,
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                >
                  {rune}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
