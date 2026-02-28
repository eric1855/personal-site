import * as THREE from 'three'

// Fixed world-space offset from car — never rotates with the car (from FollowCamera.tsx)
const OFFSET = new THREE.Vector3(0, 12, 9)
const _target = new THREE.Vector3()

export function createCamera(aspect) {
  const camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000)
  camera.position.set(0, 12, 9)

  function update(carState) {
    _target.addVectors(carState.position, OFFSET)
    camera.position.copy(_target)
    camera.lookAt(carState.position.x, carState.position.y, carState.position.z)
  }

  return { camera, update }
}
