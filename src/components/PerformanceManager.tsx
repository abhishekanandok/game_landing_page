'use client'

import { useEffect, useState } from 'react'
import { useThree } from '@react-three/fiber'
import { AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'

interface PerformanceConfig {
  pixelRatio: number
  shadows: boolean
  particles: number
  quality: 'low' | 'medium' | 'high'
}

export function usePerformanceOptimization() {
  const [config, setConfig] = useState<PerformanceConfig>({
    pixelRatio: 1,
    shadows: true,
    particles: 2000,
    quality: 'high'
  })

  useEffect(() => {
    // Detect device capabilities
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    
    if (!gl) {
      setConfig(prev => ({ ...prev, quality: 'low', shadows: false, particles: 500 }))
      return
    }

    // Check for mobile devices
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    
    // Check GPU capabilities
    const webgl = gl as WebGLRenderingContext
    const debugInfo = webgl.getExtension('WEBGL_debug_renderer_info')
    const renderer = debugInfo ? webgl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : ''
    
    // Performance-based configuration
    if (isMobile || renderer.includes('Mali') || renderer.includes('Adreno')) {
      setConfig({
        pixelRatio: Math.min(window.devicePixelRatio, 1.5),
        shadows: false,
        particles: 800,
        quality: 'medium'
      })
    } else if (renderer.includes('Intel')) {
      setConfig({
        pixelRatio: Math.min(window.devicePixelRatio, 2),
        shadows: true,
        particles: 1500,
        quality: 'medium'
      })
    } else {
      setConfig({
        pixelRatio: Math.min(window.devicePixelRatio, 2),
        shadows: true,
        particles: 2000,
        quality: 'high'
      })
    }
  }, [])

  return config
}

export function PerformanceManager({ children }: { children: React.ReactNode }) {
  const config = usePerformanceOptimization()
  
  return (
    <>
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
      {children}
    </>
  )
}
