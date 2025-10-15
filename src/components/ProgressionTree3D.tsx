'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Line } from '@react-three/drei'
import * as THREE from 'three'

interface NodeProps {
  position: [number, number, number]
  title: string
  value: string
  color: string
  onHover: (title: string | null) => void
}

function ProgressionNode({ position, title, value, color, onHover }: NodeProps) {
  const nodeRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (nodeRef.current) {
      nodeRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.1
      nodeRef.current.rotation.y = state.clock.elapsedTime * 0.5
    }
  })

  return (
    <group position={position}>
      <mesh
        ref={nodeRef}
        onPointerOver={() => {
          setHovered(true)
          onHover(title)
        }}
        onPointerOut={() => {
          setHovered(false)
          onHover(null)
        }}
        scale={hovered ? 1.2 : 1}
      >
        <octahedronGeometry args={[0.3]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.5 : 0.2}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      <Text
        position={[0, -0.8, 0]}
        fontSize={0.2}
        color="#d4af37"
        anchorX="center"
        anchorY="middle"
      >
        {title}
      </Text>
      
      <Text
        position={[0, -1.1, 0]}
        fontSize={0.15}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {value}
      </Text>
    </group>
  )
}

function ConnectionLine({ start, end }: { start: [number, number, number], end: [number, number, number] }) {
  const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)]
  
  return (
    <Line
      points={points}
      color="#d4af37"
      lineWidth={2}
      transparent
      opacity={0.6}
    />
  )
}

export default function ProgressionTree3D() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  
  const nodes = [
    { position: [-2, 0, 0] as [number, number, number], title: "Hero Souls", value: "1,247", color: "#d4af37" },
    { position: [0, 1, 0] as [number, number, number], title: "Ancient Level", value: "15", color: "#8b5cf6" },
    { position: [2, 0, 0] as [number, number, number], title: "Relics Found", value: "3/12", color: "#ef4444" },
    { position: [0, -1, 0] as [number, number, number], title: "Mercenary Rank", value: "Elite", color: "#10b981" }
  ]

  const connections = [
    { start: [-2, 0, 0] as [number, number, number], end: [0, 1, 0] as [number, number, number] },
    { start: [0, 1, 0] as [number, number, number], end: [2, 0, 0] as [number, number, number] },
    { start: [-2, 0, 0] as [number, number, number], end: [0, -1, 0] as [number, number, number] },
    { start: [2, 0, 0] as [number, number, number], end: [0, -1, 0] as [number, number, number] }
  ]

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 2, 2]} intensity={1} color="#d4af37" />
      
      {/* Connection Lines */}
      {connections.map((connection, index) => (
        <ConnectionLine key={index} start={connection.start} end={connection.end} />
      ))}
      
      {/* Progression Nodes */}
      {nodes.map((node, index) => (
        <ProgressionNode
          key={index}
          position={node.position}
          title={node.title}
          value={node.value}
          color={node.color}
          onHover={setHoveredNode}
        />
      ))}
      
      {/* Tooltip */}
      {hoveredNode && (
        <Text
          position={[0, 2.5, 0]}
          fontSize={0.3}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {hoveredNode}
        </Text>
      )}
    </>
  )
}
