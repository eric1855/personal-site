'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { CarState } from './Car'

const MAX_PARTICLES = 120
const PARTICLE_LIFETIME = 35 // frames
const EMIT_SPEED_THRESHOLD = 0.01

interface Particle {
  position: THREE.Vector3
  velocity: THREE.Vector3
  life: number
  maxLife: number
}

interface DustParticlesProps {
  carStateRef: React.RefObject<CarState>
}

export default function DustParticles({ carStateRef }: DustParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null!)
  const particles = useRef<Particle[]>([])

  // Pre-allocate buffer
  const positions = useMemo(
    () => new Float32Array(MAX_PARTICLES * 3),
    []
  )

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [positions])

  useFrame(() => {
    const state = carStateRef.current
    if (!state) return

    const { position, rotation, speed } = state

    // Emit new particles when moving
    if (Math.abs(speed) > EMIT_SPEED_THRESHOLD && particles.current.length < MAX_PARTICLES) {
      // Rear of car in world space: offset backward from car center
      const rearOffset = 1.05
      const rearX = position.x - Math.sin(rotation) * rearOffset
      const rearZ = position.z - Math.cos(rotation) * rearOffset
      const rearY = 0.15

      // Emit 2 particles per frame when moving fast, 1 when slow
      const emitCount = Math.abs(speed) > 0.1 ? 2 : 1

      for (let i = 0; i < emitCount; i++) {
        particles.current.push({
          position: new THREE.Vector3(
            rearX + (Math.random() - 0.5) * 0.3,
            rearY + Math.random() * 0.1,
            rearZ + (Math.random() - 0.5) * 0.3
          ),
          velocity: new THREE.Vector3(
            (Math.random() - 0.5) * 0.04 - Math.sin(rotation) * 0.02,
            0.01 + Math.random() * 0.02,
            (Math.random() - 0.5) * 0.04 - Math.cos(rotation) * 0.02
          ),
          life: PARTICLE_LIFETIME,
          maxLife: PARTICLE_LIFETIME,
        })
      }
    }

    // Update existing particles
    particles.current = particles.current.filter(p => {
      p.life--
      p.position.add(p.velocity)
      p.velocity.y *= 0.98  // gravity drag
      return p.life > 0
    })

    // Update geometry buffer
    const count = particles.current.length
    for (let i = 0; i < count; i++) {
      const p = particles.current[i]
      positions[i * 3]     = p.position.x
      positions[i * 3 + 1] = p.position.y
      positions[i * 3 + 2] = p.position.z
    }

    // Zero out unused slots
    for (let i = count; i < MAX_PARTICLES; i++) {
      positions[i * 3]     = 0
      positions[i * 3 + 1] = -999  // hide below ground
      positions[i * 3 + 2] = 0
    }

    geometry.attributes.position.needsUpdate = true
    geometry.setDrawRange(0, count)

    // Fade opacity based on average remaining life
    if (pointsRef.current) {
      const mat = pointsRef.current.material as THREE.PointsMaterial
      if (count > 0) {
        const avgLifeFraction =
          particles.current.reduce((sum, p) => sum + p.life / p.maxLife, 0) / count
        mat.opacity = avgLifeFraction * 0.75
      } else {
        mat.opacity = 0
      }
    }
  })

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        color="#c8a96e"
        size={0.18}
        transparent
        opacity={0}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}
