'use client'

import { useEffect, useState } from 'react'

export function useScreenShake() {
  const [isShaking, setIsShaking] = useState(false)

  const shake = (intensity: number = 10, duration: number = 300) => {
    if (isShaking) return
    
    setIsShaking(true)
    const element = document.body
    const originalTransform = element.style.transform

    let startTime: number
    const shakeAnimation = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime

      if (elapsed < duration) {
        const x = (Math.random() - 0.5) * intensity
        const y = (Math.random() - 0.5) * intensity
        element.style.transform = `translate(${x}px, ${y}px)`
        requestAnimationFrame(shakeAnimation)
      } else {
        element.style.transform = originalTransform
        setIsShaking(false)
      }
    }

    requestAnimationFrame(shakeAnimation)
  }

  return { shake, isShaking }
}
