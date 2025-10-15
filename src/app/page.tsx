'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Scene3D from '@/components/Scene3D'
import HeroModal from '@/components/HeroModal'
import LoadingScreen from '@/components/LoadingScreen'
import AudioManager, { SoundButton } from '@/components/AudioManager'
import { ScrollSection } from '@/components/ScrollManager'
import GamingCursor from '@/components/GamingCursor'
import AchievementNotification from '@/components/AchievementNotification'
import Navbar from '@/components/Navbar'
import { useScreenShake } from '@/hooks/useScreenShake'
import { useMouseParallax, use3DParallax } from '@/hooks/useParallax'

export default function Home() {
  const { shake } = useScreenShake()
  const mouseOffset = useMouseParallax(15)
  const rotation3D = use3DParallax(10)
  const [selectedHero, setSelectedHero] = useState<number>(2) // Default to Pyromancer
  const [modalHero, setModalHero] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const handleHeroSelect = (heroIndex: number | string) => {
    // Handle both number (from hero switcher) and string (from 3D scene)
    if (typeof heroIndex === 'number') {
      setSelectedHero(heroIndex)
      const heroNames = ['necromancer', 'hunter', 'pyromancer']
      setModalHero(heroNames[heroIndex])
    } else {
      const heroNames = ['necromancer', 'hunter', 'pyromancer']
      const index = heroNames.indexOf(heroIndex)
      if (index !== -1) setSelectedHero(index)
      setModalHero(heroIndex)
    }
  }

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />
  }

  return (
    <AudioManager>
      <Navbar />
      <GamingCursor />
      <AchievementNotification />
      <div className="min-h-screen bg-gradient-to-br from-[#0a0914] via-purple-950/20 to-black scan-lines">
      {/* Advanced 3D Hero Portal Section */}
      <ScrollSection id="hero" className="relative h-screen overflow-hidden aurora-background">
        {/* 3D Scene Background */}
        <div className="absolute inset-0 pointer-events-none">
          <Scene3D 
            selectedHero={['necromancer', 'hunter', 'pyromancer'][selectedHero] || null} 
            onHeroSelect={handleHeroSelect} 
          />
        </div>

        {/* Advanced Layered Background Effects */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
          {/* Animated Gradient Overlay */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, rgba(255, 100, 0, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 50%, rgba(255, 100, 0, 0.1) 0%, transparent 50%)'
              ]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Floating Light Orbs - Minimal */}
          {Array.from({ length: 5 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [0.5, 1.5, 0.5]
              }}
              transition={{
                duration: Math.random() * 5 + 3,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Main Hero Showcase Container */}
        <div className="absolute inset-0 flex items-center justify-center px-4 md:px-8 pointer-events-none" style={{ zIndex: 2 }}>
          <div className="max-w-7xl w-full grid md:grid-cols-2 gap-8 items-center" style={{ pointerEvents: 'auto' }}>
            
            {/* Left Side - Hero Character with Clean Design */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative flex flex-col items-center justify-center"
            >
              {/* Main Character Container - Simplified */}
              <div className="relative w-full max-w-lg">

                {/* Multi-Hero Showcase System */}
                <motion.div
                  className="relative z-10"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Hero Images with Transitions */}
                  <div className="relative w-full h-[500px]">
                    {/* Necromancer */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ 
                        opacity: selectedHero === 0 ? 1 : 0,
                        x: selectedHero === 0 ? 0 : -100,
                        y: selectedHero === 0 ? [0, -15, 0] : 0
                      }}
                      transition={{ 
                        opacity: { duration: 0.5 },
                        x: { duration: 0.5 },
                        y: { repeat: Infinity, duration: 5, ease: "easeInOut" }
                      }}
                      style={{ 
                        pointerEvents: selectedHero === 0 ? 'auto' : 'none',
                        filter: 'drop-shadow(0 20px 40px rgba(138, 43, 226, 0.4))'
                      }}
                    >
                      <div className="relative w-[380px] h-[420px] hero-necromancer">
                        <Image
                          src="/Necromance.png"
                          alt="Necromancer Hero"
                          fill
                          className="object-contain"
                          priority
                        />
                      </div>
                      {/* Subtle Energy Glow */}
                      <motion.div
                        className="absolute inset-0 rounded-full -z-10"
                        style={{
                          background: 'radial-gradient(circle, rgba(138, 43, 226, 0.15) 0%, transparent 60%)'
                        }}
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                      />
                    </motion.div>

                    {/* Hunter/Ranger */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ 
                        opacity: selectedHero === 1 ? 1 : 0,
                        x: selectedHero === 1 ? 0 : 100,
                        y: selectedHero === 1 ? [0, -15, 0] : 0
                      }}
                      transition={{ 
                        opacity: { duration: 0.5 },
                        x: { duration: 0.5 },
                        y: { repeat: Infinity, duration: 5, ease: "easeInOut" }
                      }}
                      style={{ 
                        pointerEvents: selectedHero === 1 ? 'auto' : 'none',
                        filter: 'drop-shadow(0 20px 40px rgba(34, 197, 94, 0.4))'
                      }}
                    >
                      <div className="relative w-[380px] h-[420px] hero-hunter">
                        <Image
                          src="/Hunter.jpg"
                          alt="Hunter Hero"
                          fill
                          className="object-contain"
                          priority
                        />
                      </div>
                      {/* Subtle Energy Glow */}
                      <motion.div
                        className="absolute inset-0 rounded-full -z-10"
                        style={{
                          background: 'radial-gradient(circle, rgba(34, 197, 94, 0.15) 0%, transparent 60%)'
                        }}
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                      />
                    </motion.div>

                    {/* Pyromancer */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: selectedHero === 2 ? 1 : 0,
                        scale: selectedHero === 2 ? 1 : 0.8,
                        y: selectedHero === 2 ? [0, -15, 0] : 0
                      }}
                      transition={{ 
                        opacity: { duration: 0.5 },
                        scale: { duration: 0.5 },
                        y: { repeat: Infinity, duration: 5, ease: "easeInOut" }
                      }}
                      style={{ 
                        pointerEvents: selectedHero === 2 ? 'auto' : 'none',
                        filter: 'drop-shadow(0 20px 40px rgba(255, 100, 0, 0.4))'
                      }}
                    >
                      <div className="relative w-[380px] h-[420px] hero-pyromancer">
                        <Image
                          src="/Pyromancer.jpg"
                          alt="Pyromancer Hero"
                          fill
                          className="object-contain"
                          priority
                        />
                      </div>
                      {/* Subtle Energy Glow */}
                      <motion.div
                        className="absolute inset-0 rounded-full -z-10"
                        style={{
                          background: 'radial-gradient(circle, rgba(255, 100, 0, 0.15) 0%, transparent 60%)'
                        }}
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                      />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Hero Selection - Clean Minimal */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="mt-8 flex gap-2 justify-center pointer-events-auto"
                >
                  {[
                    { name: 'Necromancer', color: 'bg-purple-500' },
                    { name: 'Hunter', color: 'bg-green-500' },
                    { name: 'Pyromancer', color: 'bg-orange-500' }
                  ].map((hero, i) => (
                    <motion.button
                      key={i}
                      onClick={() => handleHeroSelect(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        selectedHero === i ? `${hero.color} w-12` : 'bg-white/20 w-8'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    />
                  ))}
                </motion.div>

                {/* Subtle Ambient Particles */}
                {Array.from({ length: 5 }, (_, i) => {
                  const particleColors = {
                    0: `rgba(138, 43, 226, 0.3)`,
                    1: `rgba(34, 197, 94, 0.3)`,
                    2: `rgba(255, 100, 0, 0.3)`
                  }
                  return (
                  <motion.div
                    key={i}
                    className="absolute rounded-full blur-sm"
                    style={{
                      width: 6,
                      height: 6,
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                      background: particleColors[selectedHero as keyof typeof particleColors]
                    }}
                    animate={{
                      y: [0, -80],
                      opacity: [0, 0.6, 0],
                      scale: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: i * 0.8,
                      ease: "easeOut"
                    }}
                  />
                  )
                })}
              </div>

            </motion.div>

            {/* Right Side - Content with Modern Typography */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-left space-y-6"
            >
              {/* Hero Name Tag - Dynamic */}
              <motion.div
                key={selectedHero}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="inline-block glass-panel px-4 py-2 rounded-full"
              >
                <span className="text-sm font-bold text-primary">
                  {selectedHero === 0 && '🕯️ VEYRA THE DEATHWEAVER'}
                  {selectedHero === 1 && '🐺 LYRA & FEN'}
                  {selectedHero === 2 && '🔥 IGNIS EMBERBORN'}
                </span>
              </motion.div>

              {/* Main Title with Dynamic Gradient */}
              <motion.h1
                key={`title-${selectedHero}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="font-serif text-5xl md:text-7xl font-bold leading-tight neon-glow"
                style={{
                  background: selectedHero === 0 
                    ? 'linear-gradient(135deg, #9333EA 0%, #7C3AED 50%, #6B21A8 100%)'
                    : selectedHero === 1
                    ? 'linear-gradient(135deg, #10B981 0%, #059669 50%, #047857 100%)'
                    : 'linear-gradient(135deg, #FFD700 0%, #FF8C00 50%, #FF4500 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                {selectedHero === 0 && <>Master of<br />Dark Necromancy</>}
                {selectedHero === 1 && <>Master of<br />Wild Hunt</>}
                {selectedHero === 2 && <>Master of<br />Inferno Magic</>}
              </motion.h1>

              {/* Description - Dynamic */}
              <motion.p
                key={`desc-${selectedHero}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg text-foreground/80 leading-relaxed max-w-xl"
              >
                {selectedHero === 0 && (
                  <>Command the undead and harness dark spirits in this <span className="text-primary font-semibold">strategic auto-battler</span>. 
                  Master death magic, summon shadow armies, and drain your enemies&apos; life force.</>
                )}
                {selectedHero === 1 && (
                  <>Hunt with primal fury alongside your wolf companion in this <span className="text-primary font-semibold">strategic auto-battler</span>. 
                  Execute devastating dual strikes, track your prey, and unleash the power of the pack.</>
                )}
                {selectedHero === 2 && (
                  <>Wield the fury of flames in this <span className="text-primary font-semibold">strategic auto-battler</span>. 
                  Incinerate enemies with explosive fire magic, create infernal zones, and watch your foes burn.</>
                )}
              </motion.p>

              {/* Feature Pills */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="flex flex-wrap gap-3"
              >
                {['Grid-Based Inventory', 'Auto-Battle', 'Hero Souls', 'Epic Loot'].map((feature, i) => (
                  <motion.span
                    key={i}
                    className="glass-panel px-4 py-2 rounded-full text-sm font-medium pointer-events-auto"
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(212, 175, 55, 0.2)' }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.3 + i * 0.1 }}
                  >
                    {feature}
                  </motion.span>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                className="flex flex-wrap gap-4 pt-4 pointer-events-auto"
              >
                <div onClick={() => shake(15, 200)}>
                  <SoundButton 
                    soundType="magic" 
                    className="game-button holographic px-8 py-4 text-lg font-bold flex items-center gap-2 energy-shield"
                  >
                    <span>⚔️</span>
                    <span>Start Your Journey</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      →
                    </motion.span>
                  </SoundButton>
                </div>
                <div onClick={() => shake(8, 150)}>
                  <SoundButton 
                    soundType="click"
                    className="glass-panel border-2 border-primary/50 text-primary hover:bg-primary/10 px-8 py-4 text-lg font-bold rounded-xl transition-all duration-300 holographic"
                  >
                    <span>🎬</span>
                    <span>Watch Trailer</span>
                  </SoundButton>
                </div>
              </motion.div>

              {/* Social Proof */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
                className="flex items-center gap-6 pt-4 text-sm text-foreground/60"
              >
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {['🎮', '⚔️', '🔥'].map((emoji, i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center">
                        {emoji}
                      </div>
                    ))}
                  </div>
                  <span>10K+ Players</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>⭐⭐⭐⭐⭐</span>
                  <span>4.9/5</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center pointer-events-none"
          style={{ zIndex: 3 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-primary/60 text-sm font-medium"
          >
            <div className="mb-2">Scroll to Explore</div>
            <div className="text-2xl">↓</div>
          </motion.div>
        </motion.div>
      </ScrollSection>

      {/* Core Gameplay Section - 3 Column Layout as per PDF */}
      <ScrollSection id="gameplay" className="py-20 px-4 bg-gradient-to-b from-muted to-black">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="font-serif text-5xl font-bold text-center text-primary text-glow mb-16 glitch-effect"
            data-text="Master the Art of War"
            whileHover={{ scale: 1.05 }}
          >
            Master the Art of War
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Column 1: Inventory Management - GSAP-style slide from left */}
            <motion.div
              initial={{ opacity: 0, x: -100, scale: 0.8 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                ease: [0.175, 0.885, 0.32, 1.275] // back.out(1.7) equivalent
              }}
              className="text-center"
              style={{
                transform: `perspective(1000px) rotateX(${rotation3D.rotateX * 0.5}deg) rotateY(${rotation3D.rotateY * 0.5}deg) translateZ(20px)`,
                transformStyle: 'preserve-3d'
              }}
            >
              <div className="game-ui-panel p-8 glow-hover transition-all duration-300" style={{ transform: 'translateZ(30px)' }}>
                <motion.div 
                  className="text-6xl mb-6"
                  animate={{ rotateY: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                >
                  🎒
                </motion.div>
                <h3 className="font-serif text-2xl font-bold text-primary mb-4">Grid-Based Inventory Management</h3>
                <p className="text-foreground/80 mb-6 leading-relaxed">
                  <strong>Spatial item placement with adjacency bonuses.</strong> Every slot matters - position items strategically to unlock powerful synergies and maximize your combat potential.
                </p>
                
                {/* Enhanced backpack grid with item examples */}
                <div className="bg-black/50 rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-4 gap-1">
                    {Array.from({ length: 16 }, (_, i) => {
                      const itemTypes = ['⚔️', '🛡️', '💎', '🧪', '🏹', '🔮', '⚡', '🔥'];
                      const hasItem = i % 3 === 0 || i === 5 || i === 9 || i === 13;
                      const isAdjacent = hasItem && (i === 4 || i === 8 || i === 6 || i === 10 || i === 14);
                      
                      return (
                        <motion.div
                          key={i}
                          className={`aspect-square flex items-center justify-center text-xs inventory-slot ${
                            hasItem 
                              ? 'has-item text-black' 
                              : isAdjacent 
                                ? 'adjacent-bonus text-green-200' 
                                : 'text-foreground/60'
                          }`}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          animate={{
                            boxShadow: hasItem 
                              ? '0 0 15px rgba(212, 175, 55, 0.6)' 
                              : isAdjacent 
                                ? '0 0 10px rgba(34, 197, 94, 0.4)'
                                : '0 0 5px rgba(212, 175, 55, 0.2)'
                          }}
                          transition={{ 
                            delay: i * 0.03, 
                            repeat: Infinity, 
                            repeatType: 'reverse', 
                            duration: 3,
                            scale: { delay: i * 0.02 }
                          }}
                          whileHover={{ scale: 1.1 }}
                        >
                          {hasItem && itemTypes[i % itemTypes.length]}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
                <div className="text-xs text-foreground/60 space-y-1">
                  <p><span className="text-primary">●</span> Items (gold) provide base stats</p>
                  <p><span className="text-green-400">●</span> Adjacent slots (green) grant synergy bonuses</p>
                </div>
              </div>
            </motion.div>

            {/* Column 2: Hero Collection - GSAP-style fade + scale from bottom */}
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.3,
                ease: [0.175, 0.885, 0.32, 1.275]
              }}
              className="text-center"
              style={{
                transform: `perspective(1000px) rotateX(${rotation3D.rotateX * 0.3}deg) rotateY(${rotation3D.rotateY * 0.3}deg) translateZ(40px)`,
                transformStyle: 'preserve-3d'
              }}
            >
              <div className="game-ui-panel p-8 glow-hover transition-all duration-300" style={{ transform: 'translateZ(50px)' }}>
                <motion.div 
                  className="text-6xl mb-6"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                >
                  🛡️
                </motion.div>
                <h3 className="font-serif text-2xl font-bold text-primary mb-4">Hero Collection System</h3>
                <p className="text-foreground/80 mb-6 leading-relaxed">
                  <strong>Multiple character classes:</strong> Berserker, Pyromancer, Reaper, and Ranger. Each hero brings unique abilities, distinct playstyles, and specialized item synergies to master.
                </p>
                
                {/* Enhanced hero class showcase */}
                <div className="space-y-3 mb-4">
                  {[
                    { icon: '🕯️', name: 'Necromancer', class: 'Veyra the Deathweaver', color: 'purple', specialty: 'Dark Magic & Spirits' },
                    { icon: '🐺', name: 'Ranger', class: 'Lyra & Fen', color: 'green', specialty: 'Dual Strike & Pack Bond' },
                    { icon: '🔥', name: 'Pyromancer', class: 'Ignis Emberborn', color: 'red', specialty: 'Fire Magic & AOE' },
                    { icon: '⚔️', name: 'Berserker', class: 'Coming Soon', color: 'orange', specialty: 'Melee Combat & Rage' }
                  ].map((hero, i) => (
                    <motion.div 
                      key={i}
                      className={`hero-class-card flex items-center gap-3 p-3 border-${hero.color}-400/30`}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 + 0.5, duration: 0.6 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                    >
                      <div className={`w-8 h-8 bg-${hero.color}-600/40 border border-${hero.color}-400 rounded flex items-center justify-center text-sm`}>
                        {hero.icon}
                      </div>
                      <div className="text-left flex-1">
                        <p className="text-xs font-semibold text-foreground">{hero.name}</p>
                        <p className="text-xs text-foreground/60">{hero.specialty}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <p className="text-xs text-foreground/60">Each class offers unique strategic depth and item interactions</p>
              </div>
            </motion.div>

            {/* Column 3: Auto-Combat - GSAP-style slide from right */}
            <motion.div
              initial={{ opacity: 0, x: 100, scale: 0.8 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.6,
                ease: [0.175, 0.885, 0.32, 1.275]
              }}
              className="text-center"
              style={{
                transform: `perspective(1000px) rotateX(${rotation3D.rotateX * 0.5}deg) rotateY(${rotation3D.rotateY * 0.5}deg) translateZ(20px)`,
                transformStyle: 'preserve-3d'
              }}
            >
              <div className="game-ui-panel p-8 glow-hover transition-all duration-300" style={{ transform: 'translateZ(30px)' }}>
                <motion.div 
                  className="text-6xl mb-6"
                  animate={{ rotateZ: [0, 5, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                >
                  ⚔️
                </motion.div>
                <h3 className="font-serif text-2xl font-bold text-primary mb-4">Automated Combat</h3>
                <p className="text-foreground/80 mb-6 leading-relaxed">
                  <strong>Strategic setup followed by auto-battle execution.</strong> Plan your formation, arrange your items, then watch your heroes execute brilliant tactical maneuvers automatically.
                </p>
                
                {/* Enhanced combat phases visualization */}
                <div className="space-y-3 mb-4">
                  {/* Setup Phase */}
                  <motion.div 
                    className="combat-phase p-3 border-blue-400/30"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-blue-400">📋</span>
                      <span className="text-xs font-semibold">Setup Phase</span>
                    </div>
                    <p className="text-xs text-foreground/70">Position heroes, arrange inventory, set formation</p>
                  </motion.div>
                  
                  {/* Battle Phase */}
                  <motion.div 
                    className="combat-phase active p-3 border-red-400/30 relative overflow-hidden"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/20 to-transparent"
                      animate={{ x: [-100, 150] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    />
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-2">
                        <motion.span 
                          className="text-red-400"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                          ⚔️
                        </motion.span>
                        <span className="text-xs font-semibold">Auto-Battle Phase</span>
                      </div>
                      <p className="text-xs text-foreground/70">Heroes execute abilities based on your strategy</p>
                    </div>
                  </motion.div>
                  
                  {/* Victory Phase */}
                  <motion.div 
                    className="combat-phase p-3 border-primary/30"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-primary">🏆</span>
                      <span className="text-xs font-semibold">Victory & Rewards</span>
                    </div>
                    <p className="text-xs text-foreground/70">Collect loot, gain experience, unlock progression</p>
                  </motion.div>
                </div>
                <p className="text-xs text-foreground/60">Tactical depth meets automated convenience</p>
              </div>
            </motion.div>
          </div>
        </div>
      </ScrollSection>


      {/* Progression Systems Section - Darker background as per PDF */}
      <ScrollSection id="progression" className="py-20 px-4 bg-gradient-to-b from-black to-purple-950/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Right Side: Visual - Progression tree mockup */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
              style={{
                transform: `perspective(1200px) rotateX(${rotation3D.rotateX * 0.4}deg) rotateY(${rotation3D.rotateY * -0.6}deg) translateZ(30px)`,
                transformStyle: 'preserve-3d'
              }}
            >
              <div className="bg-gradient-to-br from-muted to-black border border-border rounded-xl p-8 glow" style={{ transform: 'translateZ(40px)' }}>
                <h3 className="font-serif text-2xl font-bold text-primary mb-6 text-center">Progression Interface</h3>
                
                {/* Hero Souls Display */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between p-4 bg-black/50 rounded-lg border border-primary/30">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">💎</span>
                      <span className="text-foreground font-medium">Hero Souls</span>
                    </div>
                    <span className="text-primary font-bold text-xl">1,247</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-black/50 rounded-lg border border-secondary/30">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🏛️</span>
                      <span className="text-foreground font-medium">Ancient Level</span>
                    </div>
                    <span className="text-secondary font-bold text-xl">15</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-black/50 rounded-lg border border-accent/30">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🔮</span>
                      <span className="text-foreground font-medium">Relics Found</span>
                    </div>
                    <span className="text-accent font-bold text-xl">3/12</span>
                  </div>
                </div>

                {/* Progression Tree Visual */}
                <div className="relative bg-black/30 rounded-lg p-6 h-48 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="grid grid-cols-3 gap-8 items-center">
                      {/* Ancient nodes */}
                      <motion.div 
                        className="w-12 h-12 bg-secondary/30 border-2 border-secondary rounded-full flex items-center justify-center"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        🏛️
                      </motion.div>
                      <motion.div 
                        className="w-16 h-16 bg-primary/40 border-2 border-primary rounded-full flex items-center justify-center text-xl"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }}
                      >
                        💎
                      </motion.div>
                      <motion.div 
                        className="w-12 h-12 bg-accent/30 border-2 border-accent rounded-full flex items-center justify-center"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 2, delay: 1 }}
                      >
                        🔮
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* Connection lines */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-0.5 bg-gradient-to-r from-secondary via-primary to-accent opacity-50"></div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Left Side: Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <h2 className="font-serif text-5xl font-bold text-primary text-glow mb-6">
                Progressive Upgrades
              </h2>
              <p className="text-xl text-foreground/80 mb-8">
                <strong>Hero Souls, Ancients, and Relics system</strong> - A deep progression framework that rewards both short-term tactics and long-term strategic planning.
              </p>
              
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-primary/10 border border-primary/30 rounded-lg p-4"
                  style={{
                    transform: `perspective(800px) translateX(${mouseOffset.x * 0.5}px) translateY(${mouseOffset.y * 0.5}px) translateZ(10px)`,
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <div className="flex items-start gap-4">
                    <motion.div 
                      className="text-3xl"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      💎
                    </motion.div>
                    <div className="flex-1">
                      <h4 className="font-bold text-primary text-lg mb-2">Hero Souls Currency</h4>
                      <p className="text-foreground/80 mb-3">The core prestige currency earned by resetting your progress. Each soul represents mastery and unlocks permanent power increases.</p>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="bg-primary/20 px-2 py-1 rounded text-primary">Prestige Reset</span>
                        <span className="text-foreground/60">→</span>
                        <span className="bg-primary/20 px-2 py-1 rounded text-primary">Permanent Power</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-secondary/10 border border-secondary/30 rounded-lg p-4"
                  style={{
                    transform: `perspective(800px) translateX(${mouseOffset.x * 0.7}px) translateY(${mouseOffset.y * 0.7}px) translateZ(15px)`,
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <div className="flex items-start gap-4">
                    <motion.div 
                      className="text-3xl"
                      animate={{ rotateY: [0, 360] }}
                      transition={{ repeat: Infinity, duration: 4 }}
                    >
                      🏛️
                    </motion.div>
                    <div className="flex-1">
                      <h4 className="font-bold text-secondary text-lg mb-2">Ancient Upgrades</h4>
                      <p className="text-foreground/80 mb-3">Powerful entities that provide scaling passive bonuses. Each Ancient specializes in different aspects of power and strategy.</p>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <span className="bg-secondary/20 px-2 py-1 rounded text-secondary">Damage Multipliers</span>
                        <span className="bg-secondary/20 px-2 py-1 rounded text-secondary">Gold Generation</span>
                        <span className="bg-secondary/20 px-2 py-1 rounded text-secondary">Critical Chance</span>
                        <span className="bg-secondary/20 px-2 py-1 rounded text-secondary">Skill Cooldowns</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-accent/10 border border-accent/30 rounded-lg p-4"
                  style={{
                    transform: `perspective(800px) translateX(${mouseOffset.x * 0.9}px) translateY(${mouseOffset.y * 0.9}px) translateZ(20px)`,
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <div className="flex items-start gap-4">
                    <motion.div 
                      className="text-3xl"
                      animate={{ 
                        textShadow: [
                          '0 0 10px rgba(168, 85, 247, 0.5)',
                          '0 0 20px rgba(168, 85, 247, 0.8)',
                          '0 0 10px rgba(168, 85, 247, 0.5)'
                        ]
                      }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      🔮
                    </motion.div>
                    <div className="flex-1">
                      <h4 className="font-bold text-accent text-lg mb-2">Legendary Relics</h4>
                      <p className="text-foreground/80 mb-3">Ultra-rare artifacts with game-changing mechanics. Each relic fundamentally alters gameplay and opens new strategic possibilities.</p>
                      <div className="flex flex-wrap gap-1 text-xs">
                        <span className="bg-accent/20 px-2 py-1 rounded text-accent">Unique Mechanics</span>
                        <span className="bg-accent/20 px-2 py-1 rounded text-accent">Meta-Breaking</span>
                        <span className="bg-accent/20 px-2 py-1 rounded text-accent">Ultra Rare</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </ScrollSection>

      {/* Game Features Highlight - 2x3 Grid as per PDF */}
      <ScrollSection id="features" className="py-20 px-4 bg-gradient-to-b from-purple-950/20 to-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif text-5xl font-bold text-center text-primary text-glow mb-16">
            Game Features Highlight
          </h2>

          {/* 2x3 Grid Layout */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { 
                icon: "🎁", 
                title: "Treasure Chests", 
                desc: "Random loot spawns during battles with tiered rewards and legendary drops."
              },
              { 
                icon: "⚒️", 
                title: "Crafting System", 
                desc: "Combine items for powerful equipment with enhanced stats and unique effects."
              },
              { 
                icon: "🧙‍♂️", 
                title: "Multiple Classes", 
                desc: "Master Berserker, Pyromancer, Reaper, and Ranger with distinct playstyles."
              },
              { 
                icon: "🧩", 
                title: "Strategic Depth", 
                desc: "Resource management and tactical planning reward careful consideration."
              },
              { 
                icon: "🔄", 
                title: "Prestige Mechanics", 
                desc: "Reset for permanent improvements and unlock new strategic options."
              },
              { 
                icon: "💎", 
                title: "Rich Rewards", 
                desc: "Gold multipliers, rare items, and expansion cards await discovery."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-b from-muted to-black border border-border rounded-xl p-8 glow-hover transition-all duration-300 cursor-pointer text-center"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="text-5xl mb-6">{feature.icon}</div>
                <h3 className="font-serif text-xl font-bold text-primary mb-4">{feature.title}</h3>
                <p className="text-foreground/80 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollSection>

      {/* Cinematic Outro Section (Scene 6) */}
      <section className="relative py-32 px-4 bg-gradient-to-b from-black via-purple-950/10 to-black overflow-hidden">
        {/* Falling embers background */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10px`,
              }}
              animate={{
                y: [0, 800],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "linear"
              }}
            />
          ))}
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Final tagline with cinematic fade */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h2 className="font-serif text-6xl md:text-7xl font-bold text-primary text-glow mb-8">
              Prepare Your Heroes
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="text-2xl md:text-3xl text-foreground/90 mb-12"
            >
              The Battle Awaits
            </motion.p>
          </motion.div>

          {/* Glowing rune icons with staggered fade */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex justify-center gap-8 mb-12"
          >
            {['⚔️', '🛡️', '🔮', '👑'].map((rune, i) => (
              <motion.div
                key={i}
                className="text-4xl text-primary"
                initial={{ opacity: 0, scale: 0, rotateY: 180 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ delay: 0.8 + i * 0.2, duration: 0.8 }}
                animate={{ 
                  textShadow: [
                    '0 0 10px rgba(212, 175, 55, 0.5)',
                    '0 0 20px rgba(212, 175, 55, 0.8)',
                    '0 0 10px rgba(212, 175, 55, 0.5)'
                  ]
                }}
                whileHover={{ scale: 1.3, rotateY: 360 }}
              >
                {rune}
              </motion.div>
            ))}
          </motion.div>

          {/* Final CTA with shimmer effect */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <SoundButton 
              soundType="magic" 
              className="bg-primary hover:bg-primary/80 text-black font-bold py-4 px-8 rounded-xl text-xl transition-all duration-300 shimmer cinematic-glow"
            >
              ⚔️ Begin Your Legend
            </SoundButton>
            <SoundButton 
              soundType="click" 
              className="bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-black font-bold py-4 px-8 rounded-xl text-xl transition-all duration-300 shimmer"
            >
              📜 View Chronicles
            </SoundButton>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 bg-black border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="border-t border-border pt-8 text-center text-foreground/60">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              &copy; 2024 Auto-Battler Chronicles. Forge your destiny.
            </motion.p>
          </div>
        </div>
      </footer>

        {/* Hero Modal */}
        <HeroModal hero={modalHero} onClose={() => setModalHero(null)} />
      </div>
    </AudioManager>
  );
}
