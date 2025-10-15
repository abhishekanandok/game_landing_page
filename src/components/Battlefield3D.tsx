'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function BattlefieldTerrain() {
  const terrainRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    if (terrainRef.current) {
      terrainRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05
    }
  })

  return (
    <mesh ref={terrainRef} position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[20, 20, 32, 32]} />
      <meshStandardMaterial
        color="#1a1a1a"
        transparent
        opacity={0.8}
        wireframe
      />
    </mesh>
  )
}

function BattleParticles() {
  const particlesRef = useRef<THREE.Points>(null!)
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(1000 * 3)
    for (let i = 0; i < 1000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15
      positions[i * 3 + 1] = Math.random() * 5
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15
    }
    return positions
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime + positions[i]) * 0.01
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <Points ref={particlesRef} positions={particlePositions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ef4444"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
      />
    </Points>
  )
}

function MiniArmy({ position, color }: { position: [number, number, number], color: string }) {
  const armyRef = useRef<THREE.Group>(null!)
  
  useFrame((state) => {
    if (armyRef.current) {
      armyRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime) * 0.5
      armyRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }
  })

  return (
    <group ref={armyRef} position={position}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[i * 0.5 - 0.5, 0, 0]}>
          <boxGeometry args={[0.1, 0.3, 0.1]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  )
}

export default function Battlefield3D() {
  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#d4af37" />
      <spotLight
        position={[5, 5, 5]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        color="#ef4444"
      />
      
      <BattlefieldTerrain />
      <BattleParticles />
      
      {/* Mini armies fighting */}
      <MiniArmy position={[-2, 0, 0]} color="#8b5cf6" />
      <MiniArmy position={[2, 0, 0]} color="#ef4444" />
      
      {/* Battle effects */}
      <mesh position={[0, 1, 0]}>
        <sphereGeometry args={[0.5, 8, 8]} />
        <meshStandardMaterial
          color="#d4af37"
          emissive="#d4af37"
          emissiveIntensity={0.3}
          transparent
          opacity={0.6}
        />
      </mesh>
    </>
  )
}
