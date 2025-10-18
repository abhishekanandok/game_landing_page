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
      <ScrollSection id="progression" className="py-32 px-4  relative overflow-hidden">
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
          <div className="absolute inset-0 bg-black/5" />
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

      

      {/* Cinematic Outro Section - Enhanced */}
      <section className="relative py-40 px-4 bg-gradient-to-b from-black via-purple-950/20 to-black overflow-hidden">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(212, 175, 55, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(212, 175, 55, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Floating Energy Orbs */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 15 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full blur-xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                background: i % 3 === 0 
                  ? 'radial-gradient(circle, rgba(212, 175, 55, 0.3), transparent)' 
                  : i % 3 === 1 
                  ? 'radial-gradient(circle, rgba(168, 85, 247, 0.3), transparent)'
                  : 'radial-gradient(circle, rgba(147, 197, 253, 0.3), transparent)'
              }}
              animate={{
                y: [0, -50],
                x: [0, Math.random() * 40 - 20],
                opacity: [0.3, 0.6]
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Geometric Accent Lines */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="h-px bg-gradient-to-r from-transparent via-primary to-transparent mb-12"
          />

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h2 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-400 to-primary mb-6" 
              style={{ 
                fontFamily: '"Permanent Marker", cursive',
                textShadow: '0 0 40px rgba(212, 175, 55, 0.5)',
                letterSpacing: '4px'
              }}
            >
              Begin Your Journey
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-xl md:text-2xl text-foreground/70 mb-16 max-w-2xl mx-auto leading-relaxed"
            >
              Master strategy, collect legendary heroes, and dominate the battlefield
            </motion.p>
          </motion.div>

          {/* Animated Geometric Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex justify-center gap-10 mb-16"
          >
            {/* Sword Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.2, rotate: 15 }}
              className="relative group"
            >
              <svg width="60" height="60" viewBox="0 0 60 60" className="drop-shadow-2xl">
                <motion.path
                  d="M30 5 L35 15 L30 55 L25 15 Z"
                  fill="url(#swordGrad)"
                  stroke="rgba(212, 175, 55, 0.8)"
                  strokeWidth="2"
                  animate={{ opacity: [0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                />
                <circle cx="30" cy="15" r="5" fill="rgba(212, 175, 55, 0.5)" />
                <defs>
                  <linearGradient id="swordGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(212, 175, 55, 1)" />
                    <stop offset="100%" stopColor="rgba(180, 140, 40, 1)" />
                  </linearGradient>
                </defs>
              </svg>
              <motion.div 
                className="absolute inset-0 bg-primary/20 rounded-full blur-xl"
                animate={{ scale: [1, 1.5] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              />
            </motion.div>

            {/* Shield Icon */}
            <motion.div
              initial={{ scale: 0, rotate: 180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.2, rotate: -15 }}
              className="relative group"
            >
              <svg width="60" height="60" viewBox="0 0 60 60">
                <motion.path
                  d="M30 5 L50 15 L50 30 C50 45 30 55 30 55 C30 55 10 45 10 30 L10 15 Z"
                  fill="url(#shieldGrad)"
                  stroke="rgba(147, 197, 253, 0.8)"
                  strokeWidth="2"
                  animate={{ opacity: [0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
                />
                <defs>
                  <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(147, 197, 253, 0.8)" />
                    <stop offset="100%" stopColor="rgba(100, 140, 200, 0.8)" />
                  </linearGradient>
                </defs>
              </svg>
              <motion.div 
                className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl"
                animate={{ scale: [1, 1.5] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
              />
            </motion.div>

            {/* Crystal Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ delay: 1.1, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.2, rotate: 180 }}
              className="relative group"
            >
              <svg width="60" height="60" viewBox="0 0 60 60">
                <motion.path
                  d="M30 5 L45 20 L40 50 L30 55 L20 50 L15 20 Z"
                  fill="url(#crystalGrad)"
                  stroke="rgba(168, 85, 247, 0.8)"
                  strokeWidth="2"
                  animate={{ opacity: [0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 1 }}
                />
                <polygon points="30,15 35,25 30,35 25,25" fill="rgba(200, 150, 255, 0.5)" />
                <defs>
                  <linearGradient id="crystalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(168, 85, 247, 0.8)" />
                    <stop offset="100%" stopColor="rgba(130, 60, 200, 0.8)" />
                  </linearGradient>
                </defs>
              </svg>
              <motion.div 
                className="absolute inset-0 bg-purple-400/20 rounded-full blur-xl"
                animate={{ scale: [1, 1.5] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 1 }}
              />
            </motion.div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <SoundButton 
                soundType="magic" 
                className="relative group quest-button py-5 px-10 rounded-2xl text-xl font-bold overflow-hidden"
                style={{ fontFamily: '"Permanent Marker", cursive' }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8Z" />
                  </svg>
                  Start Playing
                </span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-yellow-600/50 to-primary/50"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </SoundButton>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <SoundButton 
                soundType="click" 
                className="relative group backdrop-blur-sm bg-white/5 border-2 border-primary/50 text-primary hover:bg-primary/10 py-5 px-10 rounded-2xl text-xl font-bold transition-all duration-300"
                style={{ fontFamily: '"Permanent Marker", cursive' }}
              >
                <span className="flex items-center gap-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18M9 21V9" />
                  </svg>
                  Learn More
                </span>
              </SoundButton>
            </motion.div>
          </motion.div>

          {/* Bottom Accent */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 1.5, ease: "easeOut" }}
            className="h-px bg-gradient-to-r from-transparent via-primary to-transparent mt-16"
          />
        </div>
      </section>

      {/* Footer - Enhanced */}
      <footer className="relative bg-gradient-to-b from-black to-purple-950/20 border-t border-primary/20 overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(212, 175, 55, 0.3) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
          {/* Top Section */}
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand Column */}
            <motion.div 
              className="md:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl font-bold text-primary mb-4" style={{ fontFamily: '"Permanent Marker", cursive' }}>
                Auto-Battler Chronicles
              </h3>
              <p className="text-foreground/60 mb-6 leading-relaxed max-w-md">
                Master the ultimate strategic idle game. Build legendary teams, unlock ancient powers, and dominate the battlefield.
              </p>
              {/* Social Links */}
              <div className="flex gap-4">
                {[
                  { icon: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z', label: 'Twitter' },
                  { icon: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22', label: 'GitHub' },
                  { icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z', label: 'Facebook' },
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-lg bg-white/5 border border-primary/20 flex items-center justify-center text-foreground/60 hover:text-primary hover:bg-primary/10 hover:border-primary/40 transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={social.icon} />
                    </svg>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-lg font-bold text-foreground mb-4" style={{ fontFamily: '"Permanent Marker", cursive' }}>
                Quick Links
              </h4>
              <ul className="space-y-3">
                {['Gameplay', 'Progression', 'Features', 'Heroes'].map((link, i) => (
                  <li key={i}>
                    <motion.a
                      href={`#${link.toLowerCase()}`}
                      className="text-foreground/60 hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                      whileHover={{ x: 5 }}
                    >
                      <span className="w-1 h-1 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="text-lg font-bold text-foreground mb-4" style={{ fontFamily: '"Permanent Marker", cursive' }}>
                Resources
              </h4>
              <ul className="space-y-3">
                {['Community', 'Support', 'Updates', 'Privacy'].map((link, i) => (
                  <li key={i}>
                    <motion.a
                      href="#"
                      className="text-foreground/60 hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                      whileHover={{ x: 5 }}
                    >
                      <span className="w-1 h-1 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-8"
          />

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <motion.p
              className="text-foreground/50 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              &copy; {new Date().getFullYear()} Auto-Battler Chronicles. All rights reserved. Forge your destiny.
            </motion.p>

            <motion.div
              className="flex gap-6 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {['Terms', 'Privacy', 'Cookies'].map((item, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-foreground/50 hover:text-primary transition-colors duration-300"
                >
                  {item}
                </a>
              ))}
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <motion.div
            className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2],
              opacity: [0.3, 0.5]
            }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
          />
          <motion.div
            className="absolute -top-10 -left-10 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2],
              opacity: [0.3, 0.5]
            }}
            transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", delay: 1 }}
          />
        </div>
      </footer>

      </div>
    </AudioManager>
  );
}
