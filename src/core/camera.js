import * as THREE from 'three'

// Fixed world-space offset from car — never rotates with the car (from FollowCamera.tsx)
const OFFSET = new THREE.Vector3(0, 12, 9)
const _target = new THREE.Vector3()

// Camera shake state
const SHAKE_DECAY = 0.88
const SHAKE_FREQUENCY = 0.7

export function createCamera(aspect) {
  const camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000)
  camera.position.set(0, 12, 9)

  let shakeIntensity = 0
  let shakeTime = 0

  function update(carState) {
    _target.addVectors(carState.position, OFFSET)

    // Apply shake offset
    if (shakeIntensity > 0.001) {
      shakeTime += SHAKE_FREQUENCY
      _target.x += Math.sin(shakeTime * 17.3) * shakeIntensity
      _target.y += Math.cos(shakeTime * 23.7) * shakeIntensity * 0.6
      _target.z += Math.sin(shakeTime * 13.1) * shakeIntensity * 0.4
      shakeIntensity *= SHAKE_DECAY
    } else {
      shakeIntensity = 0
    }

    camera.position.copy(_target)
    camera.lookAt(carState.position.x, carState.position.y, carState.position.z)
  }

  function shake(intensity) {
    shakeIntensity = Math.max(shakeIntensity, intensity)
  }

  return { camera, update, shake }
}
