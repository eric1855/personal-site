'use client'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RigidBody, CuboidCollider, RapierRigidBody } from '@react-three/rapier'
import * as THREE from 'three'
import { useCarControls } from '@/hooks/useCarControls'

const ACCELERATION   = 0.02
const MAX_SPEED      = 0.4
const REVERSE_SPEED  = 0.18
const FRICTION       = 0.88
const STEER_SPEED    = 0.032   // radians/frame

const MAX_STEER_VIS  = 0.5     // max visual front-wheel steer angle (radians)
const STEER_VIS_LERP = 0.14    // how fast the visual wheels animate

// Car sits with its bottom flush on y=0
const GROUND_Y = 0.28

// Module-level reusables
const _euler = new THREE.Euler()
const _quat  = new THREE.Quaternion()

export interface CarState {
  position: THREE.Vector3
  rotation: number
  speed: number
}

interface CarProps {
  onStateChange?: (state: CarState) => void
}

export default function Car({ onStateChange }: CarProps) {
  const rbRef  = useRef<RapierRigidBody>(null!)
  const posRef = useRef(new THREE.Vector3(0, GROUND_Y, 0))

  const velocity   = useRef(0)
  const rotation   = useRef(0)
  const steerAngle = useRef(0)   // current visual steer angle

  // Refs for front wheel groups so we can animate steering
  const flRef = useRef<THREE.Group>(null!)
  const frRef = useRef<THREE.Group>(null!)

  const controls = useCarControls()

  useFrame(() => {
    const rb = rbRef.current
    if (!rb) return

    const ctrl = controls.current

    // ── Acceleration / braking ─────────────────────────────────────────────
    if (ctrl.forward) {
      velocity.current = Math.min(velocity.current + ACCELERATION, MAX_SPEED)
    } else if (ctrl.backward) {
      velocity.current = Math.max(velocity.current - ACCELERATION, -REVERSE_SPEED)
    } else {
      velocity.current *= FRICTION
      if (Math.abs(velocity.current) < 0.001) velocity.current = 0
    }

    // ── Steering (only effective when moving) ─────────────────────────────
    if (Math.abs(velocity.current) > 0.001) {
      const steerDir = velocity.current > 0 ? 1 : -1
      if (ctrl.left)  rotation.current += STEER_SPEED * steerDir
      if (ctrl.right) rotation.current -= STEER_SPEED * steerDir
    }

    // ── Front wheel visual ─────────────────────────────────────────────────
    const targetSteer = ctrl.left ? MAX_STEER_VIS : ctrl.right ? -MAX_STEER_VIS : 0
    steerAngle.current += (targetSteer - steerAngle.current) * STEER_VIS_LERP
    if (flRef.current) flRef.current.rotation.y = steerAngle.current
    if (frRef.current) frRef.current.rotation.y = steerAngle.current

    // ── Position ───────────────────────────────────────────────────────────
    posRef.current.x += Math.sin(rotation.current) * velocity.current
    posRef.current.y  = GROUND_Y   // stay glued to ground
    posRef.current.z += Math.cos(rotation.current) * velocity.current

    // ── Push kinematic body ────────────────────────────────────────────────
    rb.setNextKinematicTranslation({
      x: posRef.current.x,
      y: posRef.current.y,
      z: posRef.current.z,
    })

    _euler.set(0, rotation.current, 0)
    _quat.setFromEuler(_euler)
    rb.setNextKinematicRotation({ x: _quat.x, y: _quat.y, z: _quat.z, w: _quat.w })

    // ── Notify camera + dust ───────────────────────────────────────────────
    onStateChange?.({
      position: posRef.current,
      rotation: rotation.current,
      speed: velocity.current,
    })
  })

  return (
    <RigidBody
      ref={rbRef}
      type="kinematicPosition"
      position={[0, GROUND_Y, 0]}
    >
      <CuboidCollider args={[0.48, 0.28, 0.92]} />

      {/* Car body */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[1, 0.38, 1.9]} />
        <meshStandardMaterial color="#ff6b35" flatShading />
      </mesh>

      {/* Cabin */}
      <mesh position={[0, 0.34, -0.05]} castShadow>
        <boxGeometry args={[0.78, 0.34, 1.1]} />
        <meshStandardMaterial color="#ff8c5a" flatShading />
      </mesh>

      {/* Windshield */}
      <mesh position={[0, 0.36, 0.52]} rotation={[0.25, 0, 0]}>
        <boxGeometry args={[0.72, 0.28, 0.05]} />
        <meshStandardMaterial color="#88bbee" transparent opacity={0.7} flatShading />
      </mesh>

      {/* Rear window */}
      <mesh position={[0, 0.36, -0.62]} rotation={[-0.25, 0, 0]}>
        <boxGeometry args={[0.72, 0.28, 0.05]} />
        <meshStandardMaterial color="#88bbee" transparent opacity={0.7} flatShading />
      </mesh>

      {/* Headlights */}
      <mesh position={[-0.3, 0.04, 0.96]}>
        <boxGeometry args={[0.2, 0.1, 0.05]} />
        <meshStandardMaterial color="#ffffcc" emissive="#ffff88" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.3, 0.04, 0.96]}>
        <boxGeometry args={[0.2, 0.1, 0.05]} />
        <meshStandardMaterial color="#ffffcc" emissive="#ffff88" emissiveIntensity={0.5} />
      </mesh>

      {/* Taillights */}
      <mesh position={[-0.3, 0.04, -0.96]}>
        <boxGeometry args={[0.2, 0.1, 0.05]} />
        <meshStandardMaterial color="#ff2222" emissive="#ff0000" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[0.3, 0.04, -0.96]}>
        <boxGeometry args={[0.2, 0.1, 0.05]} />
        <meshStandardMaterial color="#ff2222" emissive="#ff0000" emissiveIntensity={0.6} />
      </mesh>

      {/* Front-left wheel — group handles steer rotation around Y */}
      <group ref={flRef} position={[-0.57, -0.13, 0.62]}>
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.22, 0.22, 0.16, 8]} />
          <meshStandardMaterial color="#222222" flatShading />
        </mesh>
      </group>

      {/* Front-right wheel */}
      <group ref={frRef} position={[0.57, -0.13, 0.62]}>
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.22, 0.22, 0.16, 8]} />
          <meshStandardMaterial color="#222222" flatShading />
        </mesh>
      </group>

      {/* Rear-left wheel (static) */}
      <mesh position={[-0.57, -0.13, -0.62]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.22, 0.22, 0.16, 8]} />
        <meshStandardMaterial color="#222222" flatShading />
      </mesh>

      {/* Rear-right wheel (static) */}
      <mesh position={[0.57, -0.13, -0.62]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.22, 0.22, 0.16, 8]} />
        <meshStandardMaterial color="#222222" flatShading />
      </mesh>
    </RigidBody>
  )
}
