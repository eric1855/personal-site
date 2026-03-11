import * as THREE from 'three'
import { getAmmo, createStaticBody } from '../physics/ammoWorld.js'

export function createWorldObjects(scene, world) {
  _createGround(scene, world)
  _createTrees(scene, world)
}

function _createGround(scene, world) {
  const A = getAmmo()

  // Visual ground
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(300, 300),
    new THREE.MeshStandardMaterial({ color: '#4a7c59', side: THREE.DoubleSide, flatShading: true })
  )
  mesh.rotation.x = -Math.PI / 2
  mesh.receiveShadow = true
  scene.add(mesh)

  // Physics ground — static plane at Y=0 pointing up
  const groundShape = new A.btStaticPlaneShape(new A.btVector3(0, 1, 0), 0)
  createStaticBody(world, groundShape, { x: 0, y: 0, z: 0 })
}

function _createTrees(scene, world) {
  const A = getAmmo()

  // All 28 positions from Scene.tsx — exact values
  const treePositions = [
    [-15, 0, -20], [20, 0, -15], [-25, 0, 10], [18, 0, 25],
    [-10, 0, 30],  [30, 0, 5],  [-35, 0, -5], [12, 0, -30],
    [-20, 0, -40], [35, 0, -25], [-40, 0, 20], [25, 0, 40],
    [-8, 0, -15],  [14, 0, 8],  [-18, 0, 18], [28, 0, -10],
    [-30, 0, 35],  [40, 0, 15], [-45, 0, -15], [22, 0, -45],
    [-12, 0, 45],  [38, 0, -40], [-50, 0, 8],  [16, 0, 50],
    [-22, 0, -52], [44, 0, 28], [-38, 0, -30], [10, 0, -48],
  ]

  // Shared cylinder collision shape for tree trunks
  // Approximate each tree trunk as a cylinder: radius ~0.2*scale, height ~1.6*scale
  // We use a simple box collider for each tree (simpler and faster)

  treePositions.forEach(([x, y, z], i) => {
    // Same scale formula and color selection as Scene.tsx
    const scale      = 0.8 + Math.sin(i * 7.3) * 0.4
    const greenShade = i % 3 === 0 ? '#2d6a4f' : i % 3 === 1 ? '#40916c' : '#52b788'

    const group = new THREE.Group()
    group.position.set(x, y, z)
    group.scale.setScalar(scale)

    // Trunk
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.15, 0.2, 1.6, 5),
      new THREE.MeshStandardMaterial({ color: '#6b4c2a', flatShading: true })
    )
    trunk.position.set(0, 0.8, 0)
    trunk.castShadow = true
    group.add(trunk)

    // 3-tier foliage — [radius, height, segments, y-position]
    const tiers = [[1.2, 2.0, 6, 2.4], [0.9, 1.6, 6, 3.6], [0.5, 1.2, 5, 4.5]]
    const foliageMat = new THREE.MeshStandardMaterial({ color: greenShade, flatShading: true })
    tiers.forEach(([r, h, seg, py]) => {
      const foliage = new THREE.Mesh(new THREE.ConeGeometry(r, h, seg), foliageMat)
      foliage.position.set(0, py, 0)
      foliage.castShadow = true
      group.add(foliage)
    })

    scene.add(group)

    // Physics collider — cylinder approximation for the trunk
    // Use a box for simplicity: roughly 0.4 x 3.0 x 0.4 (scaled)
    const colliderW = 0.4 * scale
    const colliderH = 3.0 * scale
    const colliderD = 0.4 * scale
    const halfExtents = new A.btVector3(colliderW / 2, colliderH / 2, colliderD / 2)
    const treeShape = new A.btBoxShape(halfExtents)
    A.destroy(halfExtents)

    createStaticBody(world, treeShape, {
      x: x,
      y: colliderH / 2, // center at half-height
      z: z,
    })
  })
}
