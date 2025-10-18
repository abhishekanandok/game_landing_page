'use client'

import { motion } from 'framer-motion'
import { ScrollSection } from '@/components/ScrollManager'
import { useMouseParallax, use3DParallax } from '@/hooks/useParallax'

export default function ProgressionSection() {
  const mouseOffset = useMouseParallax(15)
  const rotation3D = use3DParallax(10)

  return (
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
              <h3 className="text-2xl font-bold text-primary mb-6 text-center" style={{ fontFamily: '"Permanent Marker", cursive', textShadow: '2px 2px 0px rgba(0,0,0,0.3)', transform: 'rotate(-1deg)' }}>Progression Interface</h3>
              
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
            <h2 className="text-5xl font-bold text-primary text-glow mb-6" style={{ fontFamily: '"Permanent Marker", cursive', textShadow: '3px 3px 0px rgba(0,0,0,0.4), 0 0 20px rgba(212, 175, 55, 0.6)', transform: 'rotate(-1deg)', letterSpacing: '2px' }}>
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
                    <h4 className="font-bold text-primary text-lg mb-2" style={{ fontFamily: '"Permanent Marker", cursive', textShadow: '2px 2px 0px rgba(0,0,0,0.3)' }}>Hero Souls Currency</h4>
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
                    <h4 className="font-bold text-secondary text-lg mb-2" style={{ fontFamily: '"Permanent Marker", cursive', textShadow: '2px 2px 0px rgba(0,0,0,0.3)' }}>Ancient Upgrades</h4>
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
                    <h4 className="font-bold text-accent text-lg mb-2" style={{ fontFamily: '"Permanent Marker", cursive', textShadow: '2px 2px 0px rgba(0,0,0,0.3)' }}>Legendary Relics</h4>
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
  )
}
