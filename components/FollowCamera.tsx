'use client'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { CarState } from './Car'

// Fixed world-space offset from the car — never rotates with the car
const OFFSET = new THREE.Vector3(0, 12, 9)
const _target = new THREE.Vector3()

interface FollowCameraProps {
  carStateRef: React.RefObject<CarState>
}

export default function FollowCamera({ carStateRef }: FollowCameraProps) {
  const { camera } = useThree()

  useFrame(() => {
    const state = carStateRef.current
    if (!state) return

    // Camera is always exactly at car position + fixed offset — no lag, no zoom
    _target.addVectors(state.position, OFFSET)
    camera.position.copy(_target)

    // Always look directly at the car
    camera.lookAt(state.position.x, state.position.y, state.position.z)
  })

  return null
}
