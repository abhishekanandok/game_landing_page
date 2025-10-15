'use client'

import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useInView } from 'react-intersection-observer'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface ScrollSection {
  id: string
  cameraPosition: [number, number, number]
  cameraTarget: [number, number, number]
  duration: number
}

const scrollSections: ScrollSection[] = [
  {
    id: 'hero',
    cameraPosition: [0, 2, 8],
    cameraTarget: [0, 0, 0],
    duration: 1
  },
  {
    id: 'gameplay',
    cameraPosition: [5, 3, 6],
    cameraTarget: [0, -1, 0],
    duration: 1.5
  },
  {
    id: 'progression',
    cameraPosition: [-3, 4, 5],
    cameraTarget: [0, 1, 0],
    duration: 1.2
  },
  {
    id: 'features',
    cameraPosition: [0, 6, 4],
    cameraTarget: [0, 0, 0],
    duration: 1
  }
]

export function ScrollManager() {
  const { camera } = useThree()
  const currentSection = useRef(0)
  const isAnimating = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const sections = document.querySelectorAll('[data-scroll-section]')
    
    sections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => animateToSection(index),
        onEnterBack: () => animateToSection(index),
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const animateToSection = (sectionIndex: number) => {
    if (isAnimating.current || sectionIndex === currentSection.current) return
    
    const section = scrollSections[sectionIndex]
    if (!section) return

    isAnimating.current = true
    currentSection.current = sectionIndex

    gsap.to(camera.position, {
      x: section.cameraPosition[0],
      y: section.cameraPosition[1],
      z: section.cameraPosition[2],
      duration: section.duration,
      ease: 'power2.inOut',
      onComplete: () => {
        isAnimating.current = false
      }
    })

    gsap.to(camera.lookAt, {
      x: section.cameraTarget[0],
      y: section.cameraTarget[1],
      z: section.cameraTarget[2],
      duration: section.duration,
      ease: 'power2.inOut'
    })
  }

  return null
}

export function ScrollSection({ 
  id, 
  children, 
  className = '' 
}: { 
  id: string
  children: React.ReactNode
  className?: string 
}) {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false
  })

  return (
    <section
      ref={ref}
      data-scroll-section={id}
      className={`${className} ${inView ? 'in-view' : ''}`}
    >
      {children}
    </section>
  )
}
