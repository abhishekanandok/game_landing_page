'use client'

import { motion } from 'framer-motion'
import { ScrollSection } from '@/components/ScrollManager'
import { use3DParallax } from '@/hooks/useParallax'

export default function GameplaySection() {
  const rotation3D = use3DParallax(10)

  return (
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
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2 
          className="text-5xl font-bold text-center text-primary text-glow mb-16 glitch-effect fantasy-title"
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

        <div className="grid md:grid-cols-3 gap-12">
          {/* Column 1: Inventory Management */}
          <motion.div
            initial={{ opacity: 0, x: -100, scale: 0.8 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.175, 0.885, 0.32, 1.275]
            }}
            className="text-center"
            style={{
              transform: `perspective(1000px) rotateX(${rotation3D.rotateX * 0.5}deg) rotateY(${rotation3D.rotateY * 0.5}deg) translateZ(20px)`,
              transformStyle: 'preserve-3d'
            }}
          >
            <div className="game-ui-panel parchment-bg p-8 glow-hover transition-all duration-300" style={{ transform: 'translateZ(30px)' }}>
              <motion.div 
                className="text-6xl mb-6"
                animate={{ rotateY: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                🎒
              </motion.div>
              <h3 className="text-2xl font-bold mb-4">
                <span className="enchanted-text" style={{ fontFamily: '"Permanent Marker", cursive', textShadow: '2px 2px 0px rgba(0,0,0,0.3)' }}>Grid-Based Inventory Management</span>
              </h3>
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

          {/* Column 2: Hero Collection */}
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
            <div className="game-ui-panel parchment-bg p-8 glow-hover transition-all duration-300" style={{ transform: 'translateZ(50px)' }}>
              <motion.div 
                className="text-6xl mb-6"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              >
                🛡️
              </motion.div>
              <h3 className="text-2xl font-bold mb-4">
                <span className="enchanted-text" style={{ fontFamily: '"Permanent Marker", cursive', textShadow: '2px 2px 0px rgba(0,0,0,0.3)' }}>Hero Collection System</span>
              </h3>
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

          {/* Column 3: Auto-Combat */}
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
            <div className="game-ui-panel parchment-bg p-8 glow-hover transition-all duration-300" style={{ transform: 'translateZ(30px)' }}>
              <motion.div 
                className="text-6xl mb-6"
                animate={{ rotateZ: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                ⚔️
              </motion.div>
              <h3 className="text-2xl font-bold mb-4">
                <span className="enchanted-text" style={{ fontFamily: '"Permanent Marker", cursive', textShadow: '2px 2px 0px rgba(0,0,0,0.3)' }}>Automated Combat</span>
              </h3>
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
  )
}
