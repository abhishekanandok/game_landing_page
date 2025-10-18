'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import LoadingScreen from '@/components/LoadingScreen'
import AudioManager, { SoundButton } from '@/components/AudioManager'
import { ScrollSection } from '@/components/ScrollManager'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import { useScreenShake } from '@/hooks/useScreenShake'
import { useMouseParallax, use3DParallax } from '@/hooks/useParallax'

export default function Home() {
  const { shake } = useScreenShake()
  const mouseOffset = useMouseParallax(15)
  const rotation3D = use3DParallax(10)
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />
  }

  return (
    <AudioManager>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#0a0914] via-purple-950/20 to-black scan-lines dragon-scales">
      {/* Hero Section */}
      <HeroSection onShake={shake} />

      {/* Core Gameplay Section - Alternating Image-Text Layout */}
      <ScrollSection id="gameplay" className="py-20 px-4 bg-gradient-to-b from-muted to-black relative overflow-hidden">
        {/* Fire Embers Background */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 15 }, (_, i) => (
            <div
              key={i}
              className="fire-ember"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: 0,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 px-4 lg:px-8">
          <motion.h2 
            className="text-5xl font-bold text-center text-primary text-glow mb-20 glitch-effect fantasy-title"
            data-text="Master the Art of War"
            style={{
              fontFamily: '"Permanent Marker", cursive',
              textShadow: '3px 3px 0px rgba(0,0,0,0.4), 0 0 20px rgba(212, 175, 55, 0.6)',
              transform: 'rotate(-1deg)',
              letterSpacing: '2px'
            }}
            whileHover={{ scale: 1.05 }}
          >
            <span className="ancient-rune">⚔️</span> Master the Art of War <span className="ancient-rune">🛡️</span>
          </motion.h2>

          {/* Row 1: Inventory - Image Left, Text Right */}
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-16 items-center mb-32">
            {/* Image - Tilted Left */}
            <motion.div
              initial={{ opacity: 0, x: -100, rotateZ: -5 }}
              whileInView={{ opacity: 1, x: 0, rotateZ: -3 }}
              transition={{ duration: 0.8, ease: [0.175, 0.885, 0.32, 1.275] }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-2xl border-4 border-primary/30 shadow-2xl glow-hover"
                style={{ 
                  transform: 'rotate(-3deg) scale(1.08)',
                  boxShadow: '0 25px 80px rgba(212, 175, 55, 0.4)'
                }}
              >
                <img 
                  src="/epic_fantasy_rpg_inventory_interface_3d_isometric.jpeg" 
                  alt="Grid-Based Inventory System"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>

            {/* Text Content - Minimal */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4"
            >
              <motion.div 
                className="text-6xl mb-2"
                animate={{ rotateY: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                🎒
              </motion.div>
              <h3 className="text-4xl font-bold mb-3">
                <span className="enchanted-text" style={{ 
                  fontFamily: '"Permanent Marker", cursive', 
                  textShadow: '3px 3px 0px rgba(0,0,0,0.3), 0 0 15px rgba(212, 175, 55, 0.5)'
                }}>
                  Grid-Based Inventory
                </span>
              </h3>
              <p className="text-lg text-foreground/90 leading-relaxed">
                <strong className="text-primary">Strategic item placement</strong> with adjacency bonuses. Position items to unlock powerful synergies.
              </p>
            </motion.div>
          </div>

          {/* Row 2: Hero Collection - Text Left, Image Right */}
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 items-center mb-32">
            {/* Text Content - Minimal */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4 order-2 lg:order-1"
            >
              <motion.div 
                className="text-6xl mb-2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              >
                🛡️
              </motion.div>
              <h3 className="text-4xl font-bold mb-3">
                <span className="enchanted-text" style={{ 
                  fontFamily: '"Permanent Marker", cursive', 
                  textShadow: '3px 3px 0px rgba(0,0,0,0.3), 0 0 15px rgba(212, 175, 55, 0.5)'
                }}>
                  Hero Collection
                </span>
              </h3>
              <p className="text-lg text-foreground/90 leading-relaxed mb-4">
                <strong className="text-primary">Multiple legendary classes.</strong> Command Necromancer, Pyromancer, Ranger, and Berserker with unique abilities.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: '🕯️', name: 'Necromancer' },
                  { icon: '🔥', name: 'Pyromancer' },
                  { icon: '🐺', name: 'Ranger' },
                  { icon: '⚔️', name: 'Berserker' }
                ].map((hero, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 + 0.3 }}
                    className="flex items-center gap-2 px-3 py-2 bg-black/40 border border-primary/30 rounded-lg"
                  >
                    <span className="text-2xl">{hero.icon}</span>
                    <span className="text-sm font-semibold">{hero.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Image - Tilted Right */}
            <motion.div
              initial={{ opacity: 0, x: 100, rotateZ: 5 }}
              whileInView={{ opacity: 1, x: 0, rotateZ: 3 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.175, 0.885, 0.32, 1.275] }}
              className="relative order-1 lg:order-2"
            >
              <div className="relative overflow-hidden rounded-2xl border-4 border-primary/30 shadow-2xl glow-hover"
                style={{ 
                  transform: 'rotate(3deg) scale(1.08)',
                  boxShadow: '0 25px 80px rgba(212, 175, 55, 0.4)'
                }}
              >
                <img 
                  src="/fantasy_game_character_selection_screen_four_legendary.jpeg" 
                  alt="Hero Collection System"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </div>

          {/* Row 3: Auto-Combat - Video Left, Text Right */}
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-16 items-center mb-16">
            {/* Video - Tilted Left */}
            <motion.div
              initial={{ opacity: 0, x: -100, rotateZ: -5 }}
              whileInView={{ opacity: 1, x: 0, rotateZ: -3 }}
              transition={{ duration: 0.8, ease: [0.175, 0.885, 0.32, 1.275] }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-2xl border-4 border-primary/30 shadow-2xl glow-hover"
                style={{ 
                  transform: 'rotate(-3deg) scale(1.08)',
                  boxShadow: '0 25px 80px rgba(212, 175, 55, 0.4)'
                }}
              >
                <video 
                  src="/dynamic_fantasy_battle_scene_showing_tactical_auto_combat.mp4" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>

            {/* Text Content - Minimal */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4"
            >
              <motion.div 
                className="text-6xl mb-2"
                animate={{ rotateZ: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                ⚔️
              </motion.div>
              <h3 className="text-4xl font-bold mb-3">
                <span className="enchanted-text" style={{ 
                  fontFamily: '"Permanent Marker", cursive', 
                  textShadow: '3px 3px 0px rgba(0,0,0,0.3), 0 0 15px rgba(212, 175, 55, 0.5)'
                }}>
                  Automated Combat
                </span>
              </h3>
              <p className="text-lg text-foreground/90 leading-relaxed mb-4">
                <strong className="text-primary">Strategic setup meets auto-execution.</strong> Plan your tactics, then watch epic battles unfold.
              </p>
              <div className="space-y-3">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-blue-400 text-2xl">📋</span>
                  <span className="text-sm font-semibold">Setup Phase</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center gap-3"
                >
                  <motion.span 
                    className="text-red-400 text-2xl"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    ⚔️
                  </motion.span>
                  <span className="text-sm font-semibold">Auto-Battle</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-primary text-2xl">🏆</span>
                  <span className="text-sm font-semibold">Victory & Rewards</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </ScrollSection>


      {/* Progression Systems Section - Next Level */}
      <ScrollSection id="progression" className="py-32 px-4 bg-black relative overflow-hidden">
        {/* Cinematic Video Background */}
        <div className="absolute inset-0 pointer-events-none">
          <video 
            src="/cinematic_fantasy_game_environment_slow_panning_shot.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-black" />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 30 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: i % 3 === 0 ? 'rgba(212, 175, 55, 0.6)' : i % 3 === 1 ? 'rgba(147, 197, 253, 0.6)' : 'rgba(168, 85, 247, 0.6)'
              }}
              animate={{
                y: [0, -30],
                opacity: [0.3, 1],
                scale: [1, 1.5]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Title */}
          <motion.h2 
            className="text-6xl font-bold text-center text-primary text-glow mb-20" 
            style={{ 
              fontFamily: '"Permanent Marker", cursive', 
              textShadow: '4px 4px 0px rgba(0,0,0,0.5), 0 0 30px rgba(212, 175, 55, 0.8)', 
              letterSpacing: '3px' 
            }}
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Power Progression
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Left Side: Interactive Progression Visual */}
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="order-2 lg:order-1"
            >
              <div 
                className="relative bg-gradient-to-br from-purple-900/20 via-black/40 to-black/60 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl"
                style={{
                  transform: `perspective(1500px) rotateX(${rotation3D.rotateX * 0.3}deg) rotateY(${rotation3D.rotateY * -0.5}deg)`,
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Stat Display Cards */}
                <div className="space-y-4 mb-10">
                  {/* Hero Souls */}
                  <motion.div 
                    className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/40 p-5"
                    whileHover={{ scale: 1.02 }}
                    style={{ transform: 'translateZ(20px)' }}
                  >
                    <div className="flex items-center justify-between relative z-10">
                      <div className="flex items-center gap-4">
                        <motion.div 
                          className="w-10 h-10 bg-gradient-to-br from-primary to-yellow-600 rounded-lg rotate-45"
                          animate={{ rotateY: [0, 360] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                          style={{ boxShadow: '0 0 20px rgba(212, 175, 55, 0.6)' }}
                        />
                        <span className="text-foreground font-semibold text-lg">Hero Souls</span>
                      </div>
                      <motion.span 
                        className="text-primary font-bold text-3xl"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                      >
                        1,247
                      </motion.span>
                    </div>
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.div>

                  {/* Ancient Level */}
                  <motion.div 
                    className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500/20 to-blue-500/5 border border-blue-400/40 p-5"
                    whileHover={{ scale: 1.02 }}
                    style={{ transform: 'translateZ(15px)' }}
                  >
                    <div className="flex items-center justify-between relative z-10">
                      <div className="flex items-center gap-4">
                        <motion.svg 
                          viewBox="0 0 50 50" 
                          className="w-10 h-10"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        >
                          <motion.polygon
                            points="25 2, 47 13, 47 37, 25 48, 3 37, 3 13"
                            fill="rgba(147, 197, 253, 0.3)"
                            stroke="rgba(147, 197, 253, 0.8)"
                            strokeWidth="2"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        </motion.svg>
                        <span className="text-foreground font-semibold text-lg">Ancient Level</span>
                      </div>
                      <motion.span 
                        className="text-blue-400 font-bold text-3xl"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7, type: "spring" }}
                      >
                        15
                      </motion.span>
                    </div>
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-transparent"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.div>

                  {/* Relics Found */}
                  <motion.div 
                    className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-500/20 to-purple-500/5 border border-purple-400/40 p-5"
                    whileHover={{ scale: 1.02 }}
                    style={{ transform: 'translateZ(10px)' }}
                  >
                    <div className="flex items-center justify-between relative z-10">
                      <div className="flex items-center gap-4">
                        <div className="relative w-10 h-10">
                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full"
                            animate={{ 
                              boxShadow: [
                                '0 0 20px rgba(168, 85, 247, 0.4)',
                                '0 0 40px rgba(168, 85, 247, 0.8)'
                              ]
                            }}
                            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                          />
                          <motion.div 
                            className="absolute inset-2 bg-gradient-to-br from-purple-300 to-purple-500 rounded-full"
                            animate={{ scale: [0.8, 1] }}
                            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                          />
                        </div>
                        <span className="text-foreground font-semibold text-lg">Relics Found</span>
                      </div>
                      <motion.span 
                        className="text-purple-400 font-bold text-3xl"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.9, type: "spring" }}
                      >
                        3/12
                      </motion.span>
                    </div>
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-transparent"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.div>
                </div>

                {/* Progression Network Visualization */}
                <div className="relative bg-black/50 rounded-2xl p-8 h-64 overflow-hidden backdrop-blur-sm border border-white/5">
                  <svg className="absolute inset-0 w-full h-full">
                    <motion.line
                      x1="25%" y1="50%" x2="50%" y2="50%"
                      stroke="url(#grad1)"
                      strokeWidth="3"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                    />
                    <motion.line
                      x1="50%" y1="50%" x2="75%" y2="50%"
                      stroke="url(#grad2)"
                      strokeWidth="3"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ duration: 1.5, delay: 0.8 }}
                    />
                    <defs>
                      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(147, 197, 253, 0.8)" />
                        <stop offset="100%" stopColor="rgba(212, 175, 55, 0.8)" />
                      </linearGradient>
                      <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(212, 175, 55, 0.8)" />
                        <stop offset="100%" stopColor="rgba(168, 85, 247, 0.8)" />
                      </linearGradient>
                    </defs>
                  </svg>

                  <div className="absolute inset-0 flex items-center justify-around px-12" style={{ zIndex: 2 }}>
                    {/* Ancient Node */}
                    <motion.div 
                      className="relative w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-4 border-blue-300/50"
                      initial={{ scale: 0, rotate: 180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.5, type: "spring" }}
                      animate={{ 
                        boxShadow: [
                          '0 0 20px rgba(147, 197, 253, 0.5)',
                          '0 0 40px rgba(147, 197, 253, 0.8)'
                        ]
                      }}
                      transition={{ 
                        boxShadow: { duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
                      }}
                      whileHover={{ scale: 1.15 }}
                    >
                      {[0, 120, 240].map((angle, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-blue-300 rounded-full top-1/2 left-1/2 -mt-1 -ml-1"
                          animate={{
                            x: Math.cos((angle + i * 120) * Math.PI / 180) * 30,
                            y: Math.sin((angle + i * 120) * Math.PI / 180) * 30
                          }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />
                      ))}
                    </motion.div>

                    {/* Hero Souls Node (Center) */}
                    <motion.div 
                      className="relative w-20 h-20 rounded-full bg-gradient-to-br from-primary to-yellow-600 border-4 border-primary/70"
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.8, type: "spring" }}
                      animate={{ 
                        boxShadow: [
                          '0 0 30px rgba(212, 175, 55, 0.6)',
                          '0 0 60px rgba(212, 175, 55, 1)'
                        ],
                        scale: [1, 1.05]
                      }}
                      transition={{ 
                        boxShadow: { duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
                        scale: { duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
                      }}
                      whileHover={{ scale: 1.2 }}
                    >
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-primary"
                        animate={{ 
                          scale: [1, 1.5],
                          opacity: [0.8, 0]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </motion.div>

                    {/* Relic Node */}
                    <motion.div 
                      className="relative w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-4 border-purple-300/50"
                      initial={{ scale: 0, rotate: 180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 1.1, type: "spring" }}
                      animate={{ 
                        boxShadow: [
                          '0 0 20px rgba(168, 85, 247, 0.5)',
                          '0 0 40px rgba(168, 85, 247, 0.8)'
                        ]
                      }}
                      transition={{ 
                        boxShadow: { duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
                      }}
                      whileHover={{ scale: 1.15 }}
                    >
                      {[45, 135, 225, 315].map((angle, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1.5 h-1.5 bg-purple-300 rounded-full top-1/2 left-1/2"
                          animate={{
                            x: Math.cos(angle * Math.PI / 180) * 25,
                            y: Math.sin(angle * Math.PI / 180) * 25,
                            scale: [1, 1.5]
                          }}
                          transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: i * 0.2 }}
                        />
                      ))}
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side: Content */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="order-1 lg:order-2 space-y-8"
            >
              <p className="text-lg text-foreground/70 leading-relaxed">
                Three-tier progression system rewarding strategic depth and long-term mastery.
              </p>
              
              <div className="space-y-5">
                {/* Hero Souls */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ x: 10 }}
                  className="relative group cursor-pointer"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-yellow-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-300" />
                  <div 
                    className="relative bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-sm border border-primary/30 rounded-2xl p-6 overflow-hidden"
                    style={{
                      transform: `perspective(1000px) translateX(${mouseOffset.x * 0.3}px) translateY(${mouseOffset.y * 0.3}px)`,
                    }}
                  >
                    <div className="flex items-start gap-5">
                      <motion.div 
                        className="relative flex-shrink-0 w-12 h-12"
                        whileHover={{ rotate: 180, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary to-yellow-600 rounded-lg rotate-45" 
                          style={{ boxShadow: '0 0 25px rgba(212, 175, 55, 0.5)' }} 
                        />
                        <motion.div 
                          className="absolute inset-2 bg-gradient-to-br from-yellow-400 to-primary rounded-sm rotate-45"
                          animate={{ 
                            boxShadow: [
                              '0 0 10px rgba(255, 215, 0, 0.5)',
                              '0 0 20px rgba(255, 215, 0, 0.8)'
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                        />
                      </motion.div>
                      <div className="flex-1">
                        <h4 className="font-bold text-primary text-xl mb-2" style={{ fontFamily: '"Permanent Marker", cursive' }}>
                          Hero Souls
                        </h4>
                        <p className="text-foreground/80 text-sm leading-relaxed">
                          Prestige currency unlocking permanent power through strategic resets.
                        </p>
                      </div>
                    </div>
                    <motion.div 
                      className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl"
                      animate={{ 
                        scale: [1, 1.2],
                        opacity: [0.3, 0.5]
                      }}
                      transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                    />
                  </div>
                </motion.div>

                {/* Ancient Upgrades */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ x: 10 }}
                  className="relative group cursor-pointer"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-300" />
                  <div 
                    className="relative bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-sm border border-blue-400/30 rounded-2xl p-6 overflow-hidden"
                    style={{
                      transform: `perspective(1000px) translateX(${mouseOffset.x * 0.5}px) translateY(${mouseOffset.y * 0.5}px)`,
                    }}
                  >
                    <div className="flex items-start gap-5">
                      <motion.svg 
                        viewBox="0 0 50 50" 
                        className="flex-shrink-0 w-12 h-12"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      >
                        <motion.polygon
                          points="25 2, 47 13, 47 37, 25 48, 3 37, 3 13"
                          fill="rgba(147, 197, 253, 0.2)"
                          stroke="rgba(147, 197, 253, 1)"
                          strokeWidth="3"
                          animate={{ 
                            opacity: [0.6, 1, 0.6],
                            strokeWidth: [2, 3, 2]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <motion.polygon
                          points="25 10, 40 18, 40 34, 25 42, 10 34, 10 18"
                          fill="rgba(147, 197, 253, 0.4)"
                          animate={{ scale: [0.9, 1, 0.9] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </motion.svg>
                      <div className="flex-1">
                        <h4 className="font-bold text-blue-400 text-xl mb-2" style={{ fontFamily: '"Permanent Marker", cursive' }}>
                          Ancient Upgrades
                        </h4>
                        <p className="text-foreground/80 text-sm leading-relaxed">
                          Scaling passive bonuses specializing in damage, gold, criticals, and abilities.
                        </p>
                      </div>
                    </div>
                    <motion.div 
                      className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"
                      animate={{ 
                        scale: [1, 1.2],
                        opacity: [0.3, 0.5]
                      }}
                      transition={{ duration: 3.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                    />
                  </div>
                </motion.div>

                {/* Legendary Relics */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ x: 10 }}
                  className="relative group cursor-pointer"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-300" />
                  <div 
                    className="relative bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-sm border border-purple-400/30 rounded-2xl p-6 overflow-hidden"
                    style={{
                      transform: `perspective(1000px) translateX(${mouseOffset.x * 0.7}px) translateY(${mouseOffset.y * 0.7}px)`,
                    }}
                  >
                    <div className="flex items-start gap-5">
                      <div className="relative flex-shrink-0 w-12 h-12">
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full"
                          whileHover={{ scale: 1.2 }}
                          animate={{ 
                            boxShadow: [
                              '0 0 20px rgba(168, 85, 247, 0.4)',
                              '0 0 40px rgba(168, 85, 247, 0.8)'
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                        />
                        <motion.div 
                          className="absolute inset-2 bg-gradient-to-br from-purple-300 to-purple-500 rounded-full"
                          animate={{ 
                            scale: [0.8, 1],
                            opacity: [0.6, 1]
                          }}
                          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                        />
                        {/* Orbiting particles */}
                        {[0, 90, 180, 270].map((angle, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1.5 h-1.5 bg-purple-300 rounded-full top-1/2 left-1/2"
                            animate={{ 
                              x: Math.cos((angle * Math.PI) / 180) * 22,
                              y: Math.sin((angle * Math.PI) / 180) * 22,
                              scale: [1, 1.5]
                            }}
                            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: i * 0.2 }}
                          />
                        ))}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-purple-400 text-xl mb-2" style={{ fontFamily: '"Permanent Marker", cursive' }}>
                          Legendary Relics
                        </h4>
                        <p className="text-foreground/80 text-sm leading-relaxed">
                          Ultra-rare artifacts with game-changing mechanics that transform strategy.
                        </p>
                      </div>
                    </div>
                    <motion.div 
                      className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"
                      animate={{ 
                        scale: [1, 1.2],
                        opacity: [0.3, 0.5]
                      }}
                      transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </ScrollSection>

      {/* Game Features Highlight - 2x3 Grid as per PDF */}
      <ScrollSection id="features" className="py-20 px-4 bg-gradient-to-b from-purple-950/20 to-black relative overflow-hidden">
        {/* Magic Portal Background Effect */}
        <div className="absolute top-1/2 left-1/4 w-96 h-96 magic-portal opacity-30" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 magic-portal opacity-30" style={{ animationDelay: '5s' }} />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-5xl font-bold text-center text-primary text-glow mb-16 fantasy-title" data-text="Game Features Highlight" style={{ fontFamily: '"Permanent Marker", cursive', textShadow: '3px 3px 0px rgba(0,0,0,0.4), 0 0 20px rgba(212, 175, 55, 0.6)', transform: 'rotate(-1deg)', letterSpacing: '2px' }}>
            <span className="ancient-rune">🎮</span> Game Features Highlight <span className="ancient-rune">🏆</span>
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
                className="legendary-card p-8 transition-all duration-300 cursor-pointer text-center"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="text-5xl mb-6 relative z-10">
                  <motion.span
                    className="ancient-rune"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {feature.icon}
                  </motion.span>
                </div>
                <h3 className="text-xl font-bold mb-4 relative z-10">
                  <span className="enchanted-text" style={{ fontFamily: '"Permanent Marker", cursive', textShadow: '2px 2px 0px rgba(0,0,0,0.3)' }}>{feature.title}</span>
                </h3>
                <p className="text-foreground/80 leading-relaxed relative z-10">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollSection>

      {/* Cinematic Outro Section (Scene 6) */}
      <section className="relative py-32 px-4 bg-gradient-to-b from-black via-purple-950/10 to-black overflow-hidden mystical-fog dragon-scales">
        {/* Falling embers and magical particles background */}
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
            <h2 className="text-6xl md:text-7xl font-bold text-primary text-glow mb-8" style={{ fontFamily: '"Permanent Marker", cursive', textShadow: '3px 3px 0px rgba(0,0,0,0.4), 0 0 20px rgba(212, 175, 55, 0.6)', transform: 'rotate(-1deg)', letterSpacing: '2px' }}>
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
                className="text-4xl text-primary ancient-rune"
                initial={{ opacity: 0, scale: 0, rotateY: 180 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ delay: 0.8 + i * 0.2, duration: 0.8 }}
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
              className="quest-button py-4 px-8 rounded-xl text-xl font-bold flex items-center gap-2 justify-center"
              style={{ fontFamily: '"Permanent Marker", cursive', textShadow: '2px 2px 0px rgba(0,0,0,0.3)' }}
            >
              <span className="ancient-rune">⚔️</span>
              <span>Begin Your Legend</span>
            </SoundButton>
            <SoundButton 
              soundType="click" 
              className="glass-panel border-2 border-primary/50 text-primary hover:bg-primary/10 py-4 px-8 rounded-xl text-xl font-bold transition-all duration-300 holographic crystal-glow flex items-center gap-2 justify-center"
              style={{ fontFamily: '"Permanent Marker", cursive', textShadow: '2px 2px 0px rgba(0,0,0,0.3)' }}
            >
              <span className="ancient-rune">📋</span>
              <span>View Chronicles</span>
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

      </div>
    </AudioManager>
  );
}
