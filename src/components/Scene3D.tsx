'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei'
import EnhancedPortal3D from './EnhancedPortal3D'
import EnhancedHero3D from './EnhancedHero3D'
import { PerformanceManager } from './PerformanceManager'

interface Scene3DProps {
  selectedHero: string | null
  onHeroSelect: (hero: string) => void
}

function CameraController() {
  return (
    <PerspectiveCamera
      makeDefault
      position={[0, 2, 8]}
      fov={60}
    />
  )
}

export default function Scene3D({ selectedHero, onHeroSelect }: Scene3DProps) {
  return (
    <div className="w-full h-screen">
      <Canvas>
        <Suspense fallback={null}>
          <CameraController />
          
          {/* Environment */}
          <Environment preset="night" />
          <fog attach="fog" args={['#0a0914', 5, 20]} />
          
          {/* Performance Manager */}
          <PerformanceManager>
            {/* Enhanced Portal and Particles */}
            <EnhancedPortal3D />
            
            {/* Enhanced Hero Statues */}
            <EnhancedHero3D
              position={[-3, 0, 0]}
              heroType="necromancer"
              onClick={() => onHeroSelect('necromancer')}
              isSelected={selectedHero === 'necromancer'}
            />
            <EnhancedHero3D
              position={[0, 0, 0]}
              heroType="hunter"
              onClick={() => onHeroSelect('hunter')}
              isSelected={selectedHero === 'hunter'}
            />
            <EnhancedHero3D
              position={[3, 0, 0]}
              heroType="pyromancer"
              onClick={() => onHeroSelect('pyromancer')}
              isSelected={selectedHero === 'pyromancer'}
            />
          </PerformanceManager>
          
          {/* Controls */}
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            maxPolarAngle={Math.PI / 2}
            minDistance={5}
            maxDistance={15}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
