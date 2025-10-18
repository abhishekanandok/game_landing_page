'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function ParticleField() {
  const ref = useRef<THREE.Points>(null!)
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(2000 * 3)
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = Math.random() * 8 - 4
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return positions
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.1
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  return (
    <Points ref={ref} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#d4af37"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  )
}

function Portal() {
  const portalRef = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    if (portalRef.current) {
      portalRef.current.rotation.z = state.clock.elapsedTime * 0.5
      const material = portalRef.current.material
      if (!Array.isArray(material) && 'opacity' in material) {
        material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.1
      }
    }
  })

  return (
    <mesh ref={portalRef} position={[0, 0, -2]}>
      <torusGeometry args={[2, 0.1, 16, 100]} />
      <meshStandardMaterial
        color="#8b5cf6"
        transparent
        opacity={0.4}
        emissive="#8b5cf6"
        emissiveIntensity={0.2}
      />
    </mesh>
  )
}

function SmokeParticles() {
  const smokeRef = useRef<THREE.Points>(null!)
  const smokePositions = useMemo(() => {
    const positions = new Float32Array(500 * 3)
    for (let i = 0; i < 500; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 6
      positions[i * 3 + 1] = Math.random() * 3 - 1.5
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6
    }
    return positions
  }, [])

  useFrame(() => {
    if (smokeRef.current) {
      const positions = smokeRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += 0.01 // Rise upward
        if (positions[i + 1] > 4) {
          positions[i + 1] = -2 // Reset to bottom
        }
      }
      smokeRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <Points ref={smokeRef} positions={smokePositions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#666666"
        size={0.2}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.3}
      />
    </Points>
  )
}

export default function Portal3D() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={1} color="#d4af37" />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#8b5cf6" />
      
      <Portal />
      <ParticleField />
      <SmokeParticles />
    </>
  )
}
