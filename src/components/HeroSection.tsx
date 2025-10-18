'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { SoundButton } from '@/components/AudioManager'
import { ScrollSection } from '@/components/ScrollManager'

interface HeroSectionProps {
  onShake: (intensity: number, duration: number) => void
}

const heroes = [
  { 
    name: 'Necromancer',
    image: '/Necromance.svg',
    color: '#9333EA',
    glow: 'rgba(138, 43, 226, 0.6)'
  },
  { 
    name: 'Hunter',
    image: '/Hunter.svg',
    color: '#10B981',
    glow: 'rgba(34, 197, 94, 0.6)'
  },
  { 
    name: 'Pyromancer',
    image: '/Pyromancer.svg',
    color: '#FF8C00',
    glow: 'rgba(255, 100, 0, 0.6)'
  }
]

export default function HeroSection({ onShake }: HeroSectionProps) {
  const [currentHero, setCurrentHero] = useState<number>(0)
  const [rotation, setRotation] = useState<number>(0)
  const [isAutoRotating, setIsAutoRotating] = useState(true)

  // Auto-rotate heroes
  useEffect(() => {
    if (!isAutoRotating) return
    
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroes.length)
      setRotation((prev) => prev - 120)
    }, 3000)
    
    return () => clearInterval(interval)
  }, [isAutoRotating])

  const handleHeroSelect = (index: number) => {
    setIsAutoRotating(false)
    setCurrentHero(index)
    setRotation(-index * 120)
    
    // Resume auto-rotation after 5 seconds
    setTimeout(() => setIsAutoRotating(true), 5000)
  }

  return (
    <ScrollSection id="hero" className="relative h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-40"
        >
          <source src="/animate_create_a_cinematic_3d_fantasy_animation.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/15" />
      </div>

      {/* Main Hero Showcase Container */}
      <div className="absolute inset-0 flex items-center justify-center px-4 md:px-8" style={{ zIndex: 2 }}>
        <div className="max-w-7xl w-full flex flex-col items-center justify-center gap-12">
          {/* 3D Cube Carousel for Heroes */}
          <div className="relative w-full max-w-2xl h-[600px] flex items-center justify-center">
            <div 
              className="relative w-full h-full"
              style={{ 
                perspective: '1200px',
                transformStyle: 'preserve-3d'
              }}
            >
              <div
                className="absolute inset-0 transition-transform duration-1000 ease-out"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `rotateY(${rotation}deg)`
                }}
              >
                {heroes.map((hero, index) => (
                  <div
                    key={index}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      transform: `rotateY(${index * 120}deg) translateZ(400px)`,
                      transformStyle: 'preserve-3d',
                      backfaceVisibility: 'hidden'
                    }}
                  >
                    <div 
                      className="relative w-[450px] h-[500px]"
                      style={{
                        filter: `drop-shadow(0 0 40px ${hero.glow})`,
                        transition: 'all 0.5s ease'
                      }}
                    >
                      <Image
                        src={hero.image}
                        alt={hero.name}
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Hero Name Display */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
              <div className="glass-panel px-8 py-3 rounded-full border-2" style={{ borderColor: heroes[currentHero].color }}>
                <h2 
                  className="text-2xl font-bold enchanted-text"
                  style={{
                    fontFamily: '"Permanent Marker", cursive',
                    textShadow: '2px 2px 0px rgba(0,0,0,0.3)',
                    transform: 'rotate(-1deg)',
                    letterSpacing: '1px'
                  }}
                >
                  {heroes[currentHero].name}
                </h2>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-6 z-10">
            {/* Hero Selection Dots */}
            <div className="flex gap-3">
              {heroes.map((hero, i) => (
                <button
                  key={i}
                  onClick={() => handleHeroSelect(i)}
                  className="group relative"
                  style={{
                    filter: currentHero === i ? `drop-shadow(0 0 10px ${hero.glow})` : 'none'
                  }}
                >
                  <div 
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      currentHero === i ? 'scale-125' : 'scale-100 opacity-50'
                    }`}
                    style={{
                      backgroundColor: hero.color,
                      boxShadow: currentHero === i ? `0 0 20px ${hero.glow}` : 'none'
                    }}
                  />
                </button>
              ))}
            </div>
            
            {/* Attractive Play Button */}
            <div onClick={() => onShake(12, 200)}>
              <SoundButton 
                soundType="magic"
                className="group relative"
              >
                <div className="relative flex items-center justify-center">
                  {/* Outer Pulsing Ring */}
                  <div className="absolute w-24 h-24 rounded-full border-4 border-primary/30 animate-ping" />
                  
                  {/* Middle Ring */}
                  <div className="absolute w-20 h-20 rounded-full border-2 border-primary/50" 
                    style={{
                      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                    }}
                  />
                  
                  {/* Main Button */}
                  <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary via-primary-dark to-primary flex items-center justify-center cursor-pointer group-hover:scale-110 transition-all duration-300 shadow-lg"
                    style={{
                      boxShadow: '0 0 40px rgba(212, 175, 55, 0.6), inset 0 0 20px rgba(255, 215, 0, 0.3)'
                    }}
                  >
                    {/* Play Icon */}
                    <svg 
                      className="w-6 h-6 ml-1 text-black" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    
                    {/* Shine Effect */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              </SoundButton>
            </div>
            
            {/* Start Button */}
            
          </div>
        </div>
      </div>

      {/* Minimal Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center pointer-events-none" style={{ zIndex: 3 }}>
        <div className="text-primary/40 text-xl animate-bounce">
          ↓
        </div>
      </div>
    </ScrollSection>
  )
}
