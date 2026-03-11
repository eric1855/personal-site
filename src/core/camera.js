import * as THREE from 'three'

// Fixed world-space offset from car — never rotates with the car (from FollowCamera.tsx)
const OFFSET = new THREE.Vector3(0, 12, 9)
const _target = new THREE.Vector3()

// Camera shake state
const SHAKE_DURATION = 12        // frames (at 60 Hz ~ 0.2s)
const SHAKE_INTENSITY = 0.18     // max displacement in world units

export function createCamera(aspect) {
  const camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000)
  camera.position.set(0, 12, 9)

  let shakeTimer = 0

  function update(carState, collision = false) {
    // Start shake on fresh collision
    if (collision && shakeTimer <= 0) {
      shakeTimer = SHAKE_DURATION
    }

    _target.addVectors(carState.position, OFFSET)

    // Apply shake offset (decays over duration)
    if (shakeTimer > 0) {
      const intensity = SHAKE_INTENSITY * (shakeTimer / SHAKE_DURATION)
      _target.x += (Math.random() - 0.5) * 2 * intensity
      _target.y += (Math.random() - 0.5) * 2 * intensity
      _target.z += (Math.random() - 0.5) * 2 * intensity
      shakeTimer--
    }

    camera.position.copy(_target)
    camera.lookAt(carState.position.x, carState.position.y, carState.position.z)
  }

  return { camera, update }
}
