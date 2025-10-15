'use client'

import { useRef, useMemo, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial, Sparkles, useTexture } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing'
import * as THREE from 'three'
import { usePerformanceOptimization } from './PerformanceManager'

function OptimizedParticleField() {
  const config = usePerformanceOptimization()
  const ref = useRef<THREE.Points>(null!)
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(config.particles * 3)
    const colors = new Float32Array(config.particles * 3)
    
    for (let i = 0; i < config.particles; i++) {
      // Position
      positions[i * 3] = (Math.random() - 0.5) * 15
      positions[i * 3 + 1] = Math.random() * 10 - 5
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15
      
      // Colors - golden to purple gradient
      const t = Math.random()
      colors[i * 3] = 0.8 + t * 0.2     // R
      colors[i * 3 + 1] = 0.6 + t * 0.1 // G  
      colors[i * 3 + 2] = 0.2 + t * 0.6 // B
    }
    return { positions, colors }
  }, [config.particles])

  const velocities = useMemo(() => {
    const vel = new Float32Array(config.particles * 3)
    for (let i = 0; i < config.particles; i++) {
      vel[i * 3] = (Math.random() - 0.5) * 0.02
      vel[i * 3 + 1] = Math.random() * 0.01 + 0.005
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.02
    }
    return vel
  }, [config.particles])

  useFrame((state) => {
    if (!ref.current) return
    
    const positions = ref.current.geometry.attributes.position.array as Float32Array
    
    for (let i = 0; i < config.particles; i++) {
      const i3 = i * 3
      
      // Update positions with velocities
      positions[i3] += velocities[i3]
      positions[i3 + 1] += velocities[i3 + 1]
      positions[i3 + 2] += velocities[i3 + 2]
      
      // Reset particles that go too high
      if (positions[i3 + 1] > 8) {
        positions[i3 + 1] = -5
        positions[i3] = (Math.random() - 0.5) * 15
        positions[i3 + 2] = (Math.random() - 0.5) * 15
      }
      
      // Add some swirl motion
      const time = state.clock.elapsedTime
      positions[i3] += Math.sin(time + i * 0.01) * 0.001
      positions[i3 + 2] += Math.cos(time + i * 0.01) * 0.001
    }
    
    ref.current.geometry.attributes.position.needsUpdate = true
    ref.current.rotation.y = state.clock.elapsedTime * 0.05
  })

  return (
    <Points ref={ref} positions={particlesPosition.positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        vertexColors
        size={0.08}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
      <bufferAttribute
        attach="attributes-color"
        args={[particlesPosition.colors, 3]}
      />
    </Points>
  )
}

function EnhancedPortal() {
  const portalRef = useRef<THREE.Mesh>(null!)
  const innerRingRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    const time = state.clock.elapsedTime
    
    if (portalRef.current) {
      portalRef.current.rotation.z = time * 0.5
      portalRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.1)
    }
    
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z = -time * 0.8
      const material = innerRingRef.current.material as THREE.MeshStandardMaterial
      if (material.opacity !== undefined) {
        material.opacity = 0.6 + Math.sin(time * 3) * 0.2
      }
    }
  })

  return (
    <group position={[0, 0, -3]}>
      {/* Outer portal ring */}
      <mesh ref={portalRef}>
        <torusGeometry args={[2.5, 0.15, 16, 100]} />
        <meshStandardMaterial
          color="#8b5cf6"
          transparent
          opacity={0.4}
          emissive="#8b5cf6"
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Inner portal ring */}
      <mesh ref={innerRingRef}>
        <torusGeometry args={[1.8, 0.08, 12, 80]} />
        <meshStandardMaterial
          color="#d4af37"
          transparent
          opacity={0.6}
          emissive="#d4af37"
          emissiveIntensity={0.4}
        />
      </mesh>
      
      {/* Portal center effect */}
      <mesh>
        <circleGeometry args={[1.5, 32]} />
        <meshStandardMaterial
          color="#1a0a2e"
          transparent
          opacity={0.8}
          emissive="#4c1d95"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Sparkles around portal */}
      <Sparkles
        count={50}
        scale={[6, 6, 6]}
        size={3}
        speed={0.4}
        color="#d4af37"
      />
    </group>
  )
}

function MysticFog() {
  const fogRef = useRef<THREE.Points>(null!)
  const config = usePerformanceOptimization()
  
  const fogParticles = useMemo(() => {
    const count = Math.floor(config.particles * 0.3)
    const positions = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = Math.random() * 4 - 2
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return positions
  }, [config.particles])

  useFrame((state) => {
    if (!fogRef.current) return
    
    const positions = fogRef.current.geometry.attributes.position.array as Float32Array
    const time = state.clock.elapsedTime
    
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] += 0.005 // Slow upward drift
      positions[i] += Math.sin(time + i) * 0.001 // Gentle swaying
      
      if (positions[i + 1] > 6) {
        positions[i + 1] = -3
      }
    }
    
    fogRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <Points ref={fogRef} positions={fogParticles} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#666666"
        size={0.4}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.2}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

export default function EnhancedPortal3D() {
  const config = usePerformanceOptimization()
  
  return (
    <>
      {/* Enhanced Lighting */}
      <ambientLight intensity={0.3} color="#4c1d95" />
      <pointLight 
        position={[0, 0, 0]} 
        intensity={2} 
        color="#d4af37" 
        distance={10}
        decay={2}
      />
      <spotLight
        position={[0, 8, 0]}
        angle={0.6}
        penumbra={1}
        intensity={1}
        color="#8b5cf6"
        castShadow={config.shadows}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      
      <EnhancedPortal />
      <OptimizedParticleField />
      <MysticFog />
      
      {/* Post-processing effects for high-quality mode */}
      {config.quality === 'high' && (
        <EffectComposer>
          <Bloom 
            intensity={0.5} 
            luminanceThreshold={0.4} 
            luminanceSmoothing={0.9}
          />
          <ChromaticAberration 
            offset={[0.001, 0.001]} 
          />
        </EffectComposer>
      )}
    </>
  )
}
