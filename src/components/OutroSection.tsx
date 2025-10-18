'use client'

import { motion } from 'framer-motion'
import { SoundButton } from '@/components/AudioManager'

export default function OutroSection() {
  return (
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
  )
}
