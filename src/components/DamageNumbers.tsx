'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

interface DamageNumber {
  id: number
  value: number
  x: number
  y: number
  type: 'normal' | 'critical' | 'heal'
  color: string
}

export default function DamageNumbers({ trigger }: { trigger?: number }) {
  const [numbers, setNumbers] = useState<DamageNumber[]>([])

  useEffect(() => {
    if (trigger !== undefined) {
      generateDamageNumber()
    }
  }, [trigger])

  const generateDamageNumber = () => {
    const types: Array<'normal' | 'critical' | 'heal'> = ['normal', 'critical', 'heal']
    const type = types[Math.floor(Math.random() * types.length)]
    const value = type === 'critical' ? Math.floor(Math.random() * 500 + 300) : Math.floor(Math.random() * 200 + 50)
    
    const colors = {
      normal: '#FFD700',
      critical: '#FF4500',
      heal: '#10B981'
    }

    const newNumber: DamageNumber = {
      id: Date.now() + Math.random(),
      value,
      x: Math.random() * 100 - 50,
      y: 0,
      type,
      color: colors[type]
    }

    setNumbers(prev => [...prev, newNumber])

    setTimeout(() => {
      setNumbers(prev => prev.filter(n => n.id !== newNumber.id))
    }, 1500)
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <AnimatePresence>
        {numbers.map((num) => (
          <motion.div
            key={num.id}
            className="absolute top-1/2 left-1/2 font-bold"
            initial={{ 
              x: num.x, 
              y: num.y, 
              opacity: 1, 
              scale: num.type === 'critical' ? 1.5 : 1 
            }}
            animate={{ 
              y: -100, 
              opacity: 0,
              scale: num.type === 'critical' ? 2 : 1.2
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{ 
              color: num.color,
              fontSize: num.type === 'critical' ? '2.5rem' : '1.5rem',
              textShadow: `0 0 10px ${num.color}, 0 0 20px ${num.color}`,
              fontWeight: 900
            }}
          >
            {num.type === 'critical' && '💥 '}
            {num.value}
            {num.type === 'heal' && ' ❤️'}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
