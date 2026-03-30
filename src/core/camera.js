import * as THREE from 'three'

// Normal follow-cam offset
const OFFSET = new THREE.Vector3(0, 6, 10)
const _desiredPos = new THREE.Vector3()
const _desiredLookAt = new THREE.Vector3()
const _currentLookAt = new THREE.Vector3()

const SMOOTH_FACTOR = 0.08
const BUILDING_SMOOTH = 0.05  // transition speed into lock-on

// Camera shake state
const SHAKE_DECAY = 0.88
const SHAKE_FREQUENCY = 0.7

// Building lock-on
const LOCKON_ENTER_DIST = 9
const LOCKON_EXIT_DIST = 10

export function createCamera(aspect) {
  const camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000)
  camera.position.set(0, 6, 10)
  _currentLookAt.set(0, 1.5, 0)

  let shakeIntensity = 0
  let shakeTime = 0

  let _locations = []
  let _lockedBuilding = null

  function setLocations(locations) {
    _locations = locations
  }

  function update(carState) {
    const carPos = carState.position

    // Check building proximity
    let nearestBuilding = null
    let nearestDist = Infinity
    for (const loc of _locations) {
      const dx = carPos.x - loc.position.x
      const dz = carPos.z - loc.position.z
      const d = Math.sqrt(dx * dx + dz * dz)
      if (d < nearestDist) {
        nearestDist = d
        nearestBuilding = loc
      }
    }

    // Lock-on with hysteresis
    if (_lockedBuilding) {
      const dx = carPos.x - _lockedBuilding.position.x
      const dz = carPos.z - _lockedBuilding.position.z
      const d = Math.sqrt(dx * dx + dz * dz)
      if (d > LOCKON_EXIT_DIST) {
        _lockedBuilding = null
      }
    } else if (nearestBuilding && nearestDist < LOCKON_ENTER_DIST) {
      _lockedBuilding = nearestBuilding
    }

    if (_lockedBuilding) {
      // FIXED stationary camera — positioned above the building, looking down at it
      // Camera does NOT move with the car. It stays at a fixed elevated point
      // so the user always sees the car driving below.
      const bx = _lockedBuilding.position.x
      const bz = _lockedBuilding.position.z

      // Fixed position: above and slightly offset from building (top-down-ish, ~60° angle)
      _desiredPos.set(bx, 16, bz + 10)

      // Look at the building center (slightly above ground)
      _desiredLookAt.set(bx, 1.0, bz)

      // Smooth transition to fixed position
      camera.position.lerp(_desiredPos, BUILDING_SMOOTH)
      _currentLookAt.lerp(_desiredLookAt, BUILDING_SMOOTH)
      camera.lookAt(_currentLookAt)
    } else {
      // Normal follow camera
      _desiredPos.addVectors(carPos, OFFSET)

      if (shakeIntensity > 0.001) {
        shakeTime += SHAKE_FREQUENCY
        _desiredPos.x += Math.sin(shakeTime * 17.3) * shakeIntensity
        _desiredPos.y += Math.cos(shakeTime * 23.7) * shakeIntensity * 0.6
        _desiredPos.z += Math.sin(shakeTime * 13.1) * shakeIntensity * 0.4
        shakeIntensity *= SHAKE_DECAY
      } else {
        shakeIntensity = 0
      }

      camera.position.lerp(_desiredPos, SMOOTH_FACTOR)
      _desiredLookAt.set(carPos.x, carPos.y + 1.5, carPos.z)
      _currentLookAt.lerp(_desiredLookAt, SMOOTH_FACTOR)
      camera.lookAt(_currentLookAt)
    }
  }

  function shake(intensity) {
    shakeIntensity = Math.max(shakeIntensity, intensity)
  }

  return { camera, update, shake, setLocations }
}
