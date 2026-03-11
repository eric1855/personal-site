import * as THREE from 'three'

// Fixed world-space offset from car — never rotates with the car (from FollowCamera.tsx)
const OFFSET = new THREE.Vector3(0, 12, 9)
const _target = new THREE.Vector3()

// Camera shake parameters
const SHAKE_INTENSITY = 0.35   // max displacement in world units
const SHAKE_DECAY     = 0.88   // multiplicative decay per frame (~60 Hz)

export function createCamera(aspect) {
  const camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000)
  camera.position.set(0, 12, 9)

  let shakeAmount = 0

  function update(carState) {
    _target.addVectors(carState.position, OFFSET)

    // Apply shake offset
    if (shakeAmount > 0.001) {
      _target.x += (Math.random() - 0.5) * 2 * shakeAmount
      _target.y += (Math.random() - 0.5) * 2 * shakeAmount
      _target.z += (Math.random() - 0.5) * 2 * shakeAmount
      shakeAmount *= SHAKE_DECAY
    } else {
      shakeAmount = 0
    }

    camera.position.copy(_target)
    camera.lookAt(carState.position.x, carState.position.y, carState.position.z)
  }

  /** Trigger a camera shake (call on collision). */
  function shake() {
    shakeAmount = SHAKE_INTENSITY
  }

  return { camera, update, shake }
}
