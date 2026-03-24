/**
 * InstancedMesh utilities — batch identical meshes into a single draw call.
 *
 * Usage:
 *   import { createInstancedFromTemplate, updateInstanceTransform } from './instancing.js'
 *
 *   const instanced = createInstancedFromTemplate(treeMesh, [
 *     { position: [10, 0, 5], rotation: [0, 0.5, 0], scale: [1, 1, 1] },
 *     { position: [20, 0, -3], rotation: [0, 1.2, 0], scale: [0.8, 0.8, 0.8] },
 *   ])
 *   scene.add(instanced)
 *
 *   // Later, move instance #0:
 *   updateInstanceTransform(instanced, 0, [12, 0, 5], [0, 0.5, 0], [1, 1, 1])
 */
import * as THREE from 'three'

// Module-level reusable objects to avoid per-call allocation
const _matrix = new THREE.Matrix4()
const _position = new THREE.Vector3()
const _quaternion = new THREE.Quaternion()
const _scale = new THREE.Vector3()
const _euler = new THREE.Euler()

/**
 * Create an InstancedMesh from a template mesh and an array of transforms.
 *
 * @param {THREE.Mesh} templateMesh — the mesh to instance (geometry + material are shared)
 * @param {Array<{position?: number[], rotation?: number[], scale?: number[]}>} transforms
 *   Each entry may have:
 *     position: [x, y, z]    — defaults to [0, 0, 0]
 *     rotation: [x, y, z]    — Euler angles in radians, defaults to [0, 0, 0]
 *     scale:    [x, y, z]    — defaults to [1, 1, 1]
 * @returns {THREE.InstancedMesh}
 */
export function createInstancedFromTemplate(templateMesh, transforms) {
  const count = transforms.length
  const instanced = new THREE.InstancedMesh(
    templateMesh.geometry,
    templateMesh.material,
    count
  )

  // Copy shadow settings from template
  instanced.castShadow = templateMesh.castShadow
  instanced.receiveShadow = templateMesh.receiveShadow

  // Set each instance transform
  for (let i = 0; i < count; i++) {
    const t = transforms[i]
    _setMatrix(t)
    instanced.setMatrixAt(i, _matrix)
  }

  instanced.instanceMatrix.needsUpdate = true
  return instanced
}

/**
 * Update the transform of a single instance in an InstancedMesh.
 *
 * @param {THREE.InstancedMesh} instancedMesh
 * @param {number} index — instance index (0-based)
 * @param {number[]} position — [x, y, z]
 * @param {number[]} rotation — [x, y, z] Euler angles in radians
 * @param {number[]} scale    — [x, y, z]
 */
export function updateInstanceTransform(instancedMesh, index, position, rotation, scale) {
  _setMatrix({ position, rotation, scale })
  instancedMesh.setMatrixAt(index, _matrix)
  instancedMesh.instanceMatrix.needsUpdate = true
}

// ── Internal ─────────────────────────────────────────────────────────────

function _setMatrix(t) {
  const pos = t.position || [0, 0, 0]
  const rot = t.rotation || [0, 0, 0]
  const scl = t.scale || [1, 1, 1]

  _position.set(pos[0], pos[1], pos[2])
  _euler.set(rot[0], rot[1], rot[2])
  _quaternion.setFromEuler(_euler)
  _scale.set(scl[0], scl[1], scl[2])

  _matrix.compose(_position, _quaternion, _scale)
}
