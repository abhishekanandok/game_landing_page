'use client'

import { useEffect, useState, RefObject } from 'react'
import { throttle } from '@/utils/throttle'

export function useMouseParallax(intensity: number = 20) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // Throttle to 16ms (~60fps) for smooth performance
    const handleMouseMove = throttle((e: MouseEvent) => {
      requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * intensity
        const y = (e.clientY / window.innerHeight - 0.5) * intensity
        setOffset({ x, y })
      })
    }, 16)

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [intensity])

  return offset
}

export function useScrollParallax(ref: RefObject<HTMLElement>, speed: number = 0.5) {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    // Throttle scroll events for better performance
    const handleScroll = throttle(() => {
      if (!ref.current) return
      requestAnimationFrame(() => {
        const rect = ref.current!.getBoundingClientRect()
        const scrolled = window.pageYOffset + rect.top
        setOffset(scrolled * speed)
      })
    }, 16)

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [ref, speed])

  return offset
}

export function use3DParallax(intensity: number = 30) {
  const [rotation, setRotation] = useState({ rotateX: 0, rotateY: 0 })

  useEffect(() => {
    // Throttle to 16ms for smooth 60fps performance
    const handleMouseMove = throttle((e: MouseEvent) => {
      requestAnimationFrame(() => {
        const x = (e.clientY / window.innerHeight - 0.5) * intensity
        const y = (e.clientX / window.innerWidth - 0.5) * -intensity
        setRotation({ rotateX: x, rotateY: y })
      })
    }, 16)

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [intensity])

  return rotation
}
