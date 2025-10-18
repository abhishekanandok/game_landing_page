'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  return (
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
  )
}
