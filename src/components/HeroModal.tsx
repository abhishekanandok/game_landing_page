'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface HeroModalProps {
  hero: string | null
  onClose: () => void
}

const heroData = {
  necromancer: {
    name: "Veyra the Deathweaver",
    class: "Mage (Necromancer)",
    description: "Once a revered healer in the ruined city of Carth, Veyra earned the title 'Deathweaver' after bargaining with shadows to save her people from a wasting plague.",
    ability: "Spectral Legion",
    abilityDescription: "Summon ghostly minions to overwhelm the enemy line; spirits drain stamina and shatter defenses.",
    synergy: "Gains bonus damage when surrounded by artifact or dark magic items in the backpack.",
    passive: "Soul Siphon — Restores a portion of health for every enemy defeated by spirits.",
    stats: { attack: 85, defense: 60, magic: 95, speed: 70 },
    lore: "In the darkness beneath Carth's catacombs, she learned to commune with lost spirits, accepting the price of exile for forbidden magic. Now, she commands the silence of the grave, weaving spirits into armor and unleashing haunting curses upon her foes.",
    emoji: "🕯️",
    color: "from-purple-600 to-purple-900"
  },
  hunter: {
    name: "Lyra & Fen",
    class: "Ranger & Familiar",
    description: "In the wild glades of Evergreen, a young orphan girl named Lyra forged an unbreakable bond with a runt wolf she named Fen.",
    ability: "Dual Strike",
    abilityDescription: "Lyra launches arrows while Fen lunges, dealing combo attacks with increased accuracy and critical hits if adjacent to agility items or animal tokens.",
    synergy: "If the backpack contains consumables or forest runes, Fen grows stronger with every attack, occasionally stunning enemies.",
    passive: "Pack Bond — Each takes a portion of damage for the other, reducing total incoming damage.",
    stats: { attack: 90, defense: 75, magic: 45, speed: 95 },
    lore: "Outcast and hunted, they survived by their wits, braving storms and stalkers alike. Fen is no ordinary wolf: awakened during a blood moon, he carries old forest magic in his bones. Side by side, Lyra and Fen outmaneuver their foes, the girl's cunning and the wolf's power blending into a force of nature.",
    emoji: "🐺",
    color: "from-green-600 to-emerald-900"
  },
  pyromancer: {
    name: "Ignis Emberborn",
    class: "Mage (Pyromancer)", 
    description: "They say fire never asks for permission—neither does Ignis. Born in a volcanic outpost where the earth itself trembles, Ignis learned to shape flames from the flicker of candlelight to the fury of an inferno.",
    ability: "Inferno Pulse",
    abilityDescription: "Unleash a wave of fire across enemy ranks, burning armor and applying damage over time.",
    synergy: "Adjacent potions or volatile items amplify his flame attacks, increasing area of effect.",
    passive: "Fiery Vigor — Briefly gains speed and evasion after every three successful fire attacks.",
    stats: { attack: 95, defense: 55, magic: 100, speed: 65 },
    lore: "His relentless pursuit of power once scorched an entire valley, leaving only blackened stone and whispers of revenge. Now, as a master Pyromancer, Ignis wields fire with reckless abandon, turning the tide of battle in a burning flash.",
    emoji: "🔥",
    color: "from-red-600 to-red-900"
  }
}

export default function HeroModal({ hero, onClose }: HeroModalProps) {
  if (!hero || !heroData[hero as keyof typeof heroData]) return null

  const data = heroData[hero as keyof typeof heroData]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className={`bg-gradient-to-br ${data.color} border border-primary/30 rounded-2xl p-8 max-w-2xl w-full mx-4 relative glow`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>

          {/* Hero Header */}
          <div className="text-center mb-8">
            <div className="text-8xl mb-4">{data.emoji}</div>
            <h2 className="font-serif text-4xl font-bold text-primary text-glow mb-2">
              {data.name}
            </h2>
            <p className="text-xl text-white/80 font-medium">{data.class}</p>
          </div>

          {/* Description */}
          <p className="text-white/90 text-lg leading-relaxed mb-8 text-center">
            {data.description}
          </p>

          {/* Ability Section */}
          <div className="bg-black/30 rounded-xl p-6 mb-8">
            <h3 className="font-bold text-primary text-xl mb-3 flex items-center gap-2">
              ⚡ {data.ability}
            </h3>
            <p className="text-white/80 leading-relaxed">
              {data.abilityDescription}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(data.stats).map(([stat, value]) => (
              <div key={stat} className="bg-black/20 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/80 capitalize font-medium">{stat}</span>
                  <span className="text-primary font-bold">{value}</span>
                </div>
                <div className="w-full bg-black/40 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="bg-gradient-to-r from-primary to-primary-dark h-2 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full mt-8 bg-primary hover:bg-primary-dark text-black font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 glow-hover"
          >
            Select {data.name}
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
