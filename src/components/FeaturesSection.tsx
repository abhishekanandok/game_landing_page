'use client'

import { motion } from 'framer-motion'
import { ScrollSection } from '@/components/ScrollManager'

export default function FeaturesSection() {
  const features = [
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
  ]

  return (
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
          {features.map((feature, index) => (
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
  )
}
