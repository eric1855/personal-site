import * as THREE from 'three'

/**
 * Create ground mesh + tree meshes, and register static Oimo bodies for them.
 * @param {THREE.Scene} scene
 * @param {import('oimo').World} world — Oimo physics world
 */
export function createWorldObjects(scene, world) {
  _createGround(scene, world)
  _createTrees(scene, world)
}

function _createGround(scene, world) {
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(300, 300),
    new THREE.MeshStandardMaterial({ color: '#4a7c59', side: THREE.DoubleSide, flatShading: true })
  )
  mesh.rotation.x = -Math.PI / 2
  mesh.receiveShadow = true
  scene.add(mesh)

  // Static ground body — large flat box at Y = -0.5 (top surface at Y = 0)
  world.add({
    type: 'box',
    size: [300, 1, 300],
    pos: [0, -0.5, 0],
    rot: [0, 0, 0],
    move: false,
    density: 1,
    friction: 0.8,
    restitution: 0.0,
    name: 'ground',
  })

  // World boundary walls — invisible static boxes
  const wallH = 10
  const wallThick = 2
  const half = 150
  const walls = [
    { pos: [ half + wallThick / 2, wallH / 2, 0], size: [wallThick, wallH, 300] },
    { pos: [-half - wallThick / 2, wallH / 2, 0], size: [wallThick, wallH, 300] },
    { pos: [0, wallH / 2,  half + wallThick / 2], size: [300, wallH, wallThick] },
    { pos: [0, wallH / 2, -half - wallThick / 2], size: [300, wallH, wallThick] },
  ]
  for (const w of walls) {
    world.add({
      type: 'box',
      size: w.size,
      pos: w.pos,
      move: false,
      density: 1,
      friction: 0.5,
      restitution: 0.2,
      name: 'wall',
    })
  }
}

function _createTrees(scene, world) {
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

    // Static cylinder collider for tree trunk
    // Oimo cylinder: size = [radius, height]
    const trunkRadius = 0.35 * scale  // slightly larger than visual trunk for game feel
    const trunkHeight = 2.0 * scale
    world.add({
      type: 'cylinder',
      size: [trunkRadius, trunkHeight],
      pos: [x, trunkHeight / 2, z],
      move: false,
      density: 1,
      friction: 0.4,
      restitution: 0.3,
      name: `tree_${i}`,
    })
  })
}
