import * as THREE from 'three'

// Fixed world-space offset from car — never rotates with the car (from FollowCamera.tsx)
const OFFSET = new THREE.Vector3(0, 12, 9)
const _desiredPos = new THREE.Vector3()
const _desiredLookAt = new THREE.Vector3()
const _currentLookAt = new THREE.Vector3()

// Lerp smoothing factor (0 = no movement, 1 = instant snap)
const SMOOTH_FACTOR = 0.08

// Camera shake state
const SHAKE_DECAY = 0.88
const SHAKE_FREQUENCY = 0.7

export function createCamera(aspect) {
  const camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000)
  camera.position.set(0, 12, 9)
  _currentLookAt.set(0, 0, 0)

  let shakeIntensity = 0
  let shakeTime = 0

  function update(carState) {
    // Compute desired camera position (car + offset)
    _desiredPos.addVectors(carState.position, OFFSET)

    // Apply shake offset to desired position (composes before lerp)
    if (shakeIntensity > 0.001) {
      shakeTime += SHAKE_FREQUENCY
      _desiredPos.x += Math.sin(shakeTime * 17.3) * shakeIntensity
      _desiredPos.y += Math.cos(shakeTime * 23.7) * shakeIntensity * 0.6
      _desiredPos.z += Math.sin(shakeTime * 13.1) * shakeIntensity * 0.4
      shakeIntensity *= SHAKE_DECAY
    } else {
      shakeIntensity = 0
    }

    // Lerp camera position toward desired
    camera.position.lerp(_desiredPos, SMOOTH_FACTOR)

    // Lerp look-at target toward car position
    _desiredLookAt.set(carState.position.x, carState.position.y, carState.position.z)
    _currentLookAt.lerp(_desiredLookAt, SMOOTH_FACTOR)
    camera.lookAt(_currentLookAt)
  }

  function shake(intensity) {
    shakeIntensity = Math.max(shakeIntensity, intensity)
  }

  return { camera, update, shake }
}
