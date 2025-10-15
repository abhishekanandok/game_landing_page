'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text3D, Center, Float } from '@react-three/drei'
import * as THREE from 'three'

interface Hero3DProps {
  position: [number, number, number]
  heroType: 'necromancer' | 'hunter' | 'pyromancer'
  onClick: () => void
  isSelected: boolean
}

function HeroStatue({ position, heroType, onClick, isSelected }: Hero3DProps) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  const getHeroColor = () => {
    switch (heroType) {
      case 'necromancer': return '#8b5cf6'
      case 'hunter': return '#10b981'
      case 'pyromancer': return '#ef4444'
      default: return '#d4af37'
    }
  }

  const getHeroEmoji = () => {
    switch (heroType) {
      case 'necromancer': return '🕯️'
      case 'hunter': return '🐺'
      case 'pyromancer': return '🔥'
      default: return '⚔️'
    }
  }

  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
        <mesh
          ref={meshRef}
          onClick={onClick}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          scale={hovered || isSelected ? 1.2 : 1}
        >
          <cylinderGeometry args={[0.5, 0.8, 2, 8]} />
          <meshStandardMaterial
            color={getHeroColor()}
            emissive={getHeroColor()}
            emissiveIntensity={hovered || isSelected ? 0.3 : 0.1}
            transparent
            opacity={0.8}
          />
        </mesh>
        
        {/* Hero Symbol */}
        <Center position={[0, 1.2, 0]}>
          <mesh>
            <boxGeometry args={[0.4, 0.4, 0.1]} />
            <meshStandardMaterial
              color="#d4af37"
              emissive="#d4af37"
              emissiveIntensity={0.2}
            />
          </mesh>
        </Center>
      </Float>

      {/* Aura Effects */}
      {heroType === 'necromancer' && <NecromancerAura />}
      {heroType === 'hunter' && <HunterAura />}
      {heroType === 'pyromancer' && <PyromancerAura />}
    </group>
  )
}

function NecromancerAura() {
  const orbRefs = useRef<THREE.Mesh[]>([])
  
  useFrame((state) => {
    orbRefs.current.forEach((orb, i) => {
      if (orb) {
        const angle = state.clock.elapsedTime + i * (Math.PI * 2) / 3
        orb.position.x = Math.cos(angle) * 1.5
        orb.position.z = Math.sin(angle) * 1.5
        orb.position.y = Math.sin(state.clock.elapsedTime * 2 + i) * 0.3
      }
    })
  })

  return (
    <>
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          ref={(el) => el && (orbRefs.current[i] = el)}
          position={[0, 1, 0]}
        >
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial
            color="#8b5cf6"
            emissive="#8b5cf6"
            emissiveIntensity={0.5}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </>
  )
}

function HunterAura() {
  return (
    <mesh position={[0.8, 0.5, 0.8]}>
      <sphereGeometry args={[0.15, 8, 8]} />
      <meshStandardMaterial
        color="#10b981"
        emissive="#10b981"
        emissiveIntensity={0.3}
        transparent
        opacity={0.6}
      />
    </mesh>
  )
}

function PyromancerAura() {
  const flameRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    if (flameRef.current) {
      flameRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.2
      const material = flameRef.current.material as THREE.MeshStandardMaterial
      if (material.emissiveIntensity !== undefined) {
        material.emissiveIntensity = 0.4 + Math.sin(state.clock.elapsedTime * 4) * 0.2
      }
    }
  })

  return (
    <mesh ref={flameRef} position={[0, 1.5, 0]}>
      <coneGeometry args={[0.2, 0.8, 8]} />
      <meshStandardMaterial
        color="#ef4444"
        emissive="#ef4444"
        emissiveIntensity={0.4}
        transparent
        opacity={0.8}
      />
    </mesh>
  )
}

export default HeroStatue
