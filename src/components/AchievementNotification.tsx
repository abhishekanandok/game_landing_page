'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

const achievements: Achievement[] = [
  { id: 'explorer', title: 'Explorer', description: 'Discovered the hero section', icon: '🗺️', rarity: 'common' },
  { id: 'strategist', title: 'Strategist', description: 'Learned about inventory management', icon: '🎯', rarity: 'rare' },
  { id: 'collector', title: 'Collector', description: 'Viewed all three heroes', icon: '👑', rarity: 'epic' },
  { id: 'master', title: 'Master Tactician', description: 'Explored all game features', icon: '⚔️', rarity: 'legendary' }
]

export default function AchievementNotification() {
  const [activeAchievement, setActiveAchievement] = useState<Achievement | null>(null)
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set())

  const showAchievement = (achievementId: string) => {
    if (unlockedAchievements.has(achievementId)) return
    
    const achievement = achievements.find(a => a.id === achievementId)
    if (achievement) {
      setActiveAchievement(achievement)
      setUnlockedAchievements(prev => new Set([...prev, achievementId]))
      
      setTimeout(() => {
        setActiveAchievement(null)
      }, 4000)
    }
  }

  useEffect(() => {
    // Trigger achievements based on scroll or time
    const timer1 = setTimeout(() => showAchievement('explorer'), 2000)
    const timer2 = setTimeout(() => showAchievement('strategist'), 10000)
    
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  const rarityColors = {
    common: 'from-gray-500 to-gray-700',
    rare: 'from-blue-500 to-blue-700',
    epic: 'from-purple-500 to-purple-700',
    legendary: 'from-yellow-500 to-orange-600'
  }

  const rarityGlow = {
    common: '0 0 20px rgba(156, 163, 175, 0.5)',
    rare: '0 0 20px rgba(59, 130, 246, 0.5)',
    epic: '0 0 20px rgba(168, 85, 247, 0.5)',
    legendary: '0 0 30px rgba(251, 146, 60, 0.8)'
  }

  return (
    <div className="fixed top-20 right-4 z-[9990] pointer-events-none">
      <AnimatePresence>
        {activeAchievement && (
          <motion.div
            initial={{ x: 400, opacity: 0, scale: 0.8 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: 400, opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className={`glass-panel p-4 rounded-lg min-w-[300px] bg-gradient-to-br ${rarityColors[activeAchievement.rarity]}`}
            style={{ boxShadow: rarityGlow[activeAchievement.rarity] }}
          >
            <div className="flex items-start gap-3">
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 0.5, repeat: 2 }}
                className="text-4xl"
              >
                {activeAchievement.icon}
              </motion.div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-white">Achievement Unlocked!</h4>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  >
                    ✨
                  </motion.div>
                </div>
                <p className="text-sm font-bold text-white/90">{activeAchievement.title}</p>
                <p className="text-xs text-white/70">{activeAchievement.description}</p>
              </div>
            </div>
            
            {/* Progress bar animation */}
            <motion.div
              className="h-1 bg-white/30 rounded-full mt-3 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="h-full bg-white rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 4, ease: 'linear' }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
