'use client'
import { useRef, Suspense } from 'react'
import * as THREE from 'three'
import { Physics } from '@react-three/rapier'
import Car, { CarState } from './Car'
import Ground from './Ground'
import FollowCamera from './FollowCamera'
import DustParticles from './DustParticles'

// Initial car state so carStateRef is never null
const INITIAL_CAR_STATE: CarState = {
  position: new THREE.Vector3(0, 0.35, 0),
  rotation: 0,
  speed: 0,
}

export default function Scene() {
  // Shared ref updated by Car, read by FollowCamera and DustParticles
  const carStateRef = useRef<CarState>(INITIAL_CAR_STATE)

  const handleCarState = (state: CarState) => {
    carStateRef.current = state
  }

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.7} />
      <directionalLight
        position={[15, 25, 10]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={200}
        shadow-camera-left={-80}
        shadow-camera-right={80}
        shadow-camera-top={80}
        shadow-camera-bottom={-80}
      />
      <hemisphereLight args={['#87ceeb', '#4a7c59', 0.3]} />

      {/* Sky color */}
      <color attach="background" args={['#87ceeb']} />

      {/* Fog for depth */}
      <fog attach="fog" args={['#87ceeb', 40, 180]} />

      {/* Suspense required — Physics suspends while loading Rapier WASM */}
      <Suspense fallback={null}>
        <Physics gravity={[0, -20, 0]}>
          <Ground />
          <Car onStateChange={handleCarState} />
          <Trees />
        </Physics>
      </Suspense>

      {/* Non-physics: dust + camera read from carStateRef */}
      <DustParticles carStateRef={carStateRef} />
      <FollowCamera carStateRef={carStateRef} />
    </>
  )
}

// Simple low-poly trees scattered around the world
function Trees() {
  const treePositions: [number, number, number][] = [
    [-15, 0, -20], [20, 0, -15], [-25, 0, 10], [18, 0, 25],
    [-10, 0, 30], [30, 0, 5], [-35, 0, -5], [12, 0, -30],
    [-20, 0, -40], [35, 0, -25], [-40, 0, 20], [25, 0, 40],
    [-8, 0, -15], [14, 0, 8], [-18, 0, 18], [28, 0, -10],
    [-30, 0, 35], [40, 0, 15], [-45, 0, -15], [22, 0, -45],
    [-12, 0, 45], [38, 0, -40], [-50, 0, 8], [16, 0, 50],
    [-22, 0, -52], [44, 0, 28], [-38, 0, -30], [10, 0, -48],
  ]

  return (
    <>
      {treePositions.map(([x, y, z], i) => {
        const scale = 0.8 + Math.sin(i * 7.3) * 0.4  // varied sizes
        const greenShade = i % 3 === 0 ? '#2d6a4f' : i % 3 === 1 ? '#40916c' : '#52b788'
        return (
          <group key={i} position={[x, y, z]} scale={scale}>
            {/* Trunk */}
            <mesh position={[0, 0.8, 0]} castShadow>
              <cylinderGeometry args={[0.15, 0.2, 1.6, 5]} />
              <meshStandardMaterial color="#6b4c2a" flatShading />
            </mesh>
            {/* Bottom foliage */}
            <mesh position={[0, 2.4, 0]} castShadow>
              <coneGeometry args={[1.2, 2.0, 6]} />
              <meshStandardMaterial color={greenShade} flatShading />
            </mesh>
            {/* Middle foliage */}
            <mesh position={[0, 3.6, 0]} castShadow>
              <coneGeometry args={[0.9, 1.6, 6]} />
              <meshStandardMaterial color={greenShade} flatShading />
            </mesh>
            {/* Top foliage */}
            <mesh position={[0, 4.5, 0]} castShadow>
              <coneGeometry args={[0.5, 1.2, 5]} />
              <meshStandardMaterial color={greenShade} flatShading />
            </mesh>
          </group>
        )
      })}
    </>
  )
}
