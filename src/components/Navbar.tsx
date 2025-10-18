'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SoundButton } from './AudioManager'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const leftNavItems = [
    { id: 'hero', label: 'Home' },
    { id: 'gameplay', label: 'Gameplay' }
  ]

  const rightNavItems = [
    { id: 'progression', label: 'Progression' },
    { id: 'features', label: 'Features' }
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <>
      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${
          isScrolled
            ? 'glass-panel shadow-lg'
            : 'bg-transparent'
        }`}
        style={{
          clipPath: 'polygon(0 0, 2% 3%, 4% 1%, 6% 4%, 8% 2%, 10% 5%, 12% 2%, 14% 4%, 16% 1%, 18% 5%, 20% 2%, 22% 4%, 24% 1%, 26% 5%, 28% 2%, 30% 4%, 32% 1%, 34% 5%, 36% 2%, 38% 4%, 40% 1%, 42% 5%, 44% 2%, 46% 4%, 48% 1%, 50% 5%, 52% 1%, 54% 4%, 56% 2%, 58% 5%, 60% 1%, 62% 4%, 64% 2%, 66% 5%, 68% 1%, 70% 4%, 72% 2%, 74% 5%, 76% 1%, 78% 4%, 80% 2%, 82% 5%, 84% 1%, 86% 4%, 88% 2%, 90% 5%, 92% 2%, 94% 4%, 96% 1%, 98% 5%, 100% 2%, 100% 100%, 98% 97%, 96% 99%, 94% 96%, 92% 98%, 90% 95%, 88% 98%, 86% 96%, 84% 99%, 82% 95%, 80% 98%, 78% 96%, 76% 99%, 74% 95%, 72% 98%, 70% 96%, 68% 99%, 66% 95%, 64% 98%, 62% 96%, 60% 99%, 58% 95%, 56% 98%, 54% 96%, 52% 99%, 50% 95%, 48% 99%, 46% 96%, 44% 98%, 42% 95%, 40% 99%, 38% 96%, 36% 98%, 34% 95%, 32% 99%, 30% 96%, 28% 98%, 26% 95%, 24% 99%, 22% 96%, 20% 98%, 18% 95%, 16% 99%, 14% 96%, 12% 98%, 10% 95%, 8% 98%, 6% 96%, 4% 99%, 2% 97%, 0 100%)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Left Navigation */}
            <div className="hidden md:flex items-center gap-1 flex-1 justify-start">
              {leftNavItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="px-4 py-2 rounded-lg font-medium transition-all duration-300 text-foreground/80 hover:text-primary hover:bg-primary/10"
                  style={{
                    fontFamily: '"Permanent Marker", cursive',
                    textShadow: '2px 2px 0px rgba(0,0,0,0.3)',
                    transform: 'rotate(-1deg)'
                  }}
                  whileHover={{ scale: 1.05, y: -2, rotate: 2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            {/* Center Logo */}
            <motion.div
              className="flex items-center gap-3 cursor-pointer flex-shrink-0"
              onClick={() => scrollToSection('hero')}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-center">
                <h1 
                  className="text-xl sm:text-3xl font-bold text-primary neon-glow"
                  style={{
                    fontFamily: '"Permanent Marker", cursive',
                    textShadow: '3px 3px 0px rgba(0,0,0,0.4), 0 0 20px rgba(212, 175, 55, 0.6)',
                    transform: 'rotate(-2deg)',
                    letterSpacing: '2px'
                  }}
                >
                  Auto-Battler
                </h1>
                <p 
                  className="text-xs text-foreground/70 hidden sm:block"
                  style={{
                    fontFamily: '"Permanent Marker", cursive',
                    textShadow: '1px 1px 0px rgba(0,0,0,0.3)',
                    transform: 'rotate(1deg)',
                    letterSpacing: '3px'
                  }}
                >
                  Chronicles
                </p>
              </div>
            </motion.div>

            {/* Right Navigation */}
            <div className="hidden md:flex items-center gap-1 flex-1 justify-end">
              {rightNavItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="px-4 py-2 rounded-lg font-medium transition-all duration-300 text-foreground/80 hover:text-primary hover:bg-primary/10"
                  style={{
                    fontFamily: '"Permanent Marker", cursive',
                    textShadow: '2px 2px 0px rgba(0,0,0,0.3)',
                    transform: 'rotate(1deg)'
                  }}
                  whileHover={{ scale: 1.05, y: -2, rotate: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden glass-panel p-2 rounded-lg"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
              style={{
                fontFamily: '"Permanent Marker", cursive',
                fontSize: '1.5rem'
              }}
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? '✕' : '☰'}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998] md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 glass-panel border-l border-primary/30 z-[9999] md:hidden overflow-y-auto"
            >
              <div className="p-6">
                {/* Close Button */}
                <div className="flex justify-between items-center mb-8">
                  <h2 
                    className="text-xl font-bold text-primary"
                    style={{
                      fontFamily: '"Permanent Marker", cursive',
                      textShadow: '2px 2px 0px rgba(0,0,0,0.3)',
                      transform: 'rotate(-2deg)'
                    }}
                  >
                    Menu
                  </h2>
                  <motion.button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="glass-panel p-2 rounded-lg"
                    whileTap={{ scale: 0.9 }}
                    style={{
                      fontFamily: '"Permanent Marker", cursive',
                      fontSize: '1.25rem'
                    }}
                  >
                    ✕
                  </motion.button>
                </div>

                {/* Navigation Items */}
                <div className="space-y-3 mb-8">
                  {[...leftNavItems, ...rightNavItems].map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => scrollToSection(item.id)}
                      className="w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 text-foreground/80 hover:text-primary hover:bg-primary/10"
                      style={{
                        fontFamily: '"Permanent Marker", cursive',
                        textShadow: '2px 2px 0px rgba(0,0,0,0.3)'
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </div>

                {/* Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <SoundButton
                    soundType="magic"
                    className="w-full game-button px-6 py-3 text-base font-bold flex items-center justify-center holographic energy-shield rounded-full"
                    style={{
                      fontFamily: '"Permanent Marker", cursive',
                      textShadow: '2px 2px 0px rgba(0,0,0,0.3)'
                    }}
                  >
                    Play Now
                  </SoundButton>
                </motion.div>

                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 pt-8 border-t border-primary/20"
                >
                  <p 
                    className="text-xs text-foreground/60 mb-4"
                    style={{
                      fontFamily: '"Permanent Marker", cursive'
                    }}
                  >
                    Connect With Us
                  </p>
                  <div className="flex gap-3">
                    {['Discord', 'Twitter', 'YouTube', 'Steam'].map((platform, i) => (
                      <motion.button
                        key={i}
                        className="glass-panel px-4 py-2 rounded-lg text-sm font-medium"
                        style={{
                          fontFamily: '"Permanent Marker", cursive',
                          textShadow: '1px 1px 0px rgba(0,0,0,0.3)'
                        }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {platform}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
