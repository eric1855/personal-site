'use client'
import * as THREE from 'three'
import { RigidBody, CuboidCollider } from '@react-three/rapier'

export default function Ground() {
  return (
    <>
      {/* Visual plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[300, 300]} />
        <meshStandardMaterial color="#4a7c59" side={THREE.DoubleSide} flatShading />
      </mesh>

      {/* Invisible static collider — top surface sits exactly at y=0 */}
      <RigidBody type="fixed" position={[0, -0.1, 0]}>
        <CuboidCollider args={[150, 0.1, 150]} />
      </RigidBody>
    </>
  )
}
