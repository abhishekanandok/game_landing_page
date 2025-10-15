'use client'

import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Sparkles, Trail, Sphere } from '@react-three/drei'
import * as THREE from 'three'

interface EnhancedHero3DProps {
  position: [number, number, number]
  heroType: 'necromancer' | 'hunter' | 'pyromancer'
  onClick: () => void
  isSelected: boolean
}

const heroData = {
  necromancer: {
    name: "Veyra the Deathweaver",
    class: "Mage (Necromancer)",
    ability: "Spectral Legion",
    description: "Summon ghostly minions to overwhelm the enemy line; spirits drain stamina and shatter defenses."
  },
  hunter: {
    name: "Lyra & Fen",
    class: "Ranger & Familiar", 
    ability: "Dual Strike",
    description: "Lyra launches arrows while Fen lunges, dealing combo attacks with increased accuracy and critical hits."
  },
  pyromancer: {
    name: "Ignis Emberborn",
    class: "Mage (Pyromancer)",
    ability: "Inferno Pulse", 
    description: "Unleash a wave of fire across enemy ranks, burning armor and applying damage over time."
  }
}

function HeroStatue({ position, heroType, onClick, isSelected }: EnhancedHero3DProps) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const glowRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.15
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
    
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1)
      const material = glowRef.current.material as THREE.MeshStandardMaterial
      if (material.opacity !== undefined) {
        material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 3) * 0.1
      }
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

  const scale = hovered || isSelected ? 1.3 : 1

  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
        {/* Base glow effect */}
        <mesh ref={glowRef} scale={[2, 0.1, 2]} position={[0, -1, 0]}>
          <cylinderGeometry args={[1, 1, 0.1, 32]} />
          <meshStandardMaterial
            color={getHeroColor()}
            transparent
            opacity={0.3}
            emissive={getHeroColor()}
            emissiveIntensity={0.5}
          />
        </mesh>
        
        {/* Main statue */}
        <mesh
          ref={meshRef}
          onClick={onClick}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          scale={scale}
        >
          <cylinderGeometry args={[0.6, 0.9, 2.5, 12]} />
          <meshStandardMaterial
            color={getHeroColor()}
            emissive={getHeroColor()}
            emissiveIntensity={hovered || isSelected ? 0.4 : 0.2}
            transparent
            opacity={0.9}
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>
        
        {/* Hero symbol/crown */}
        <mesh position={[0, 1.5, 0]} scale={scale}>
          <octahedronGeometry args={[0.3]} />
          <meshStandardMaterial
            color="#d4af37"
            emissive="#d4af37"
            emissiveIntensity={0.6}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        
        {/* Selection ring */}
        {(hovered || isSelected) && (
          <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.2, 0.05, 8, 32]} />
            <meshStandardMaterial
              color="#d4af37"
              emissive="#d4af37"
              emissiveIntensity={0.8}
              transparent
              opacity={0.8}
            />
          </mesh>
        )}
      </Float>

      {/* Enhanced Aura Effects */}
      {heroType === 'necromancer' && <EnhancedNecromancerAura />}
      {heroType === 'hunter' && <EnhancedHunterAura />}
      {heroType === 'pyromancer' && <EnhancedPyromancerAura />}
      
      {/* Sparkles around hero */}
      <Sparkles
        count={20}
        scale={[3, 4, 3]}
        size={2}
        speed={0.3}
        color={getHeroColor()}
      />
    </group>
  )
}

function EnhancedNecromancerAura() {
  const orbRefs = useRef<THREE.Mesh[]>([])
  const trailRef = useRef<THREE.Group>(null!)
  
  useFrame((state) => {
    orbRefs.current.forEach((orb, i) => {
      if (orb) {
        const angle = state.clock.elapsedTime * 0.5 + i * (Math.PI * 2) / 4
        orb.position.x = Math.cos(angle) * 2
        orb.position.z = Math.sin(angle) * 2
        orb.position.y = 1 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.5
      }
    })
  })

  return (
    <group>
      {/* Orbiting spirit orbs */}
      {[0, 1, 2, 3].map((i) => (
        <Trail
          key={i}
          width={0.1}
          length={8}
          color="#8b5cf6"
          attenuation={(t) => t * t}
        >
          <mesh
            ref={(el) => el && (orbRefs.current[i] = el)}
            position={[0, 1, 0]}
          >
            <sphereGeometry args={[0.12, 8, 8]} />
            <meshStandardMaterial
              color="#8b5cf6"
              emissive="#8b5cf6"
              emissiveIntensity={0.8}
              transparent
              opacity={0.9}
            />
          </mesh>
        </Trail>
      ))}
      
      {/* Dark energy wisps */}
      <Sparkles
        count={15}
        scale={[4, 6, 4]}
        size={1}
        speed={0.2}
        color="#4c1d95"
      />
    </group>
  )
}

function EnhancedHunterAura() {
  const wolfRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    if (wolfRef.current) {
      const angle = state.clock.elapsedTime * 0.3
      wolfRef.current.position.x = Math.cos(angle) * 1.5
      wolfRef.current.position.z = Math.sin(angle) * 1.5
      wolfRef.current.rotation.y = angle + Math.PI / 2
    }
  })

  return (
    <group>
      {/* Wolf companion */}
      <mesh ref={wolfRef} position={[1.5, 0.3, 0]}>
        <boxGeometry args={[0.4, 0.3, 0.8]} />
        <meshStandardMaterial
          color="#10b981"
          emissive="#10b981"
          emissiveIntensity={0.4}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Nature particles */}
      <Sparkles
        count={25}
        scale={[5, 3, 5]}
        size={1.5}
        speed={0.4}
        color="#22c55e"
      />
      
      {/* Wind effect */}
      <mesh position={[0, 1, 0]}>
        <torusGeometry args={[2, 0.02, 8, 32]} />
        <meshStandardMaterial
          color="#10b981"
          transparent
          opacity={0.3}
          emissive="#10b981"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  )
}

function EnhancedPyromancerAura() {
  const flameRefs = useRef<THREE.Mesh[]>([])
  
  useFrame((state) => {
    flameRefs.current.forEach((flame, i) => {
      if (flame) {
        flame.scale.y = 1 + Math.sin(state.clock.elapsedTime * 4 + i) * 0.3
        flame.rotation.y = state.clock.elapsedTime + i
        const material = flame.material as THREE.MeshStandardMaterial
        if (material.emissiveIntensity !== undefined) {
          material.emissiveIntensity = 0.6 + Math.sin(state.clock.elapsedTime * 6 + i) * 0.3
        }
      }
    })
  })

  return (
    <group>
      {/* Multiple flame pillars */}
      {[0, 1, 2].map((i) => {
        const angle = (i / 3) * Math.PI * 2
        const x = Math.cos(angle) * 1.2
        const z = Math.sin(angle) * 1.2
        
        return (
          <mesh
            key={i}
            ref={(el) => el && (flameRefs.current[i] = el)}
            position={[x, 1.8, z]}
          >
            <coneGeometry args={[0.15, 1, 8]} />
            <meshStandardMaterial
              color="#ef4444"
              emissive="#ef4444"
              emissiveIntensity={0.6}
              transparent
              opacity={0.9}
            />
          </mesh>
        )
      })}
      
      {/* Fire particles */}
      <Sparkles
        count={30}
        scale={[3, 5, 3]}
        size={2}
        speed={0.6}
        color="#f97316"
      />
      
      {/* Heat distortion ring */}
      <mesh position={[0, 0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.8, 0.1, 8, 32]} />
        <meshStandardMaterial
          color="#ef4444"
          transparent
          opacity={0.2}
          emissive="#ef4444"
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  )
}

export default HeroStatue
