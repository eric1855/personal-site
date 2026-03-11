/**
 * Interactive physics objects scattered around the world.
 * - Dominos near the Projects building (x:20, z:0)
 * - Stacked boxes near the About building (x:0, z:-20)
 * - Bouncy spheres near the Contact building (x:0, z:20)
 *
 * All are dynamic cannon-es bodies with Three.js mesh sync.
 */
import * as THREE from 'three'
import * as CANNON from 'cannon-es'

export function createInteractables(scene, world, objectMat) {
  const syncList = []

  _createDominos(scene, world, objectMat, syncList)
  _createBoxStack(scene, world, objectMat, syncList)
  _createSpheres(scene, world, objectMat, syncList)

  return { syncList }
}

// ─── Dominos ────────────────────────────────────────────────────────────────
// A curved row of dominos near the Projects building
function _createDominos(scene, world, objectMat, syncList) {
  const DOMINO_W = 0.12   // thin
  const DOMINO_H = 0.8    // tall
  const DOMINO_D = 0.5    // wide face
  const COUNT    = 14
  const SPACING  = 0.7

  const mat = new THREE.MeshStandardMaterial({ color: '#f0e6d3', flatShading: true })
  const geo = new THREE.BoxGeometry(DOMINO_W, DOMINO_H, DOMINO_D)

  // Arc of dominos curving from beside the Projects building
  const centerX = 14    // to the left of Projects building (at x:20)
  const centerZ = -4
  const arcRadius = 5
  const arcStart  = -Math.PI * 0.3
  const arcEnd    =  Math.PI * 0.5

  for (let i = 0; i < COUNT; i++) {
    const t = i / (COUNT - 1)
    const angle = arcStart + t * (arcEnd - arcStart)

    const x = centerX + Math.cos(angle) * arcRadius
    const z = centerZ + Math.sin(angle) * arcRadius

    const mesh = new THREE.Mesh(geo, mat)
    mesh.castShadow = true
    mesh.receiveShadow = true
    scene.add(mesh)

    const body = new CANNON.Body({
      mass: 1.5,
      material: objectMat,
      position: new CANNON.Vec3(x, DOMINO_H / 2, z),
      linearDamping: 0.2,
      angularDamping: 0.2,
    })
    body.addShape(new CANNON.Box(new CANNON.Vec3(DOMINO_W / 2, DOMINO_H / 2, DOMINO_D / 2)))

    // Orient each domino to face the next one (tangent to arc)
    body.quaternion.setFromEuler(0, -angle + Math.PI / 2, 0)

    body.sleepSpeedLimit = 0.2
    body.sleepTimeLimit  = 1.5

    world.addBody(body)
    syncList.push({ mesh, body })
  }
}

// ─── Box Stack ──────────────────────────────────────────────────────────────
// A pyramid of crates near the About building
function _createBoxStack(scene, world, objectMat, syncList) {
  const BOX_SIZE = 0.8
  const HALF     = BOX_SIZE / 2

  const colors = ['#c0392b', '#e67e22', '#f1c40f', '#27ae60', '#2980b9', '#8e44ad']
  const geo = new THREE.BoxGeometry(BOX_SIZE, BOX_SIZE, BOX_SIZE)

  // Position near About building (x:0, z:-20) — offset so you can drive into them
  const baseX = 5
  const baseZ = -16

  // Build a 3-2-1 pyramid (3 layers)
  const layers = [
    // Bottom layer: 3x3
    [[-1,0,-1],[0,0,-1],[1,0,-1],[-1,0,0],[0,0,0],[1,0,0],[-1,0,1],[0,0,1],[1,0,1]],
    // Middle layer: 2x2
    [[-0.5,1,-0.5],[0.5,1,-0.5],[-0.5,1,0.5],[0.5,1,0.5]],
    // Top layer: 1
    [[0,2,0]],
  ]

  layers.forEach((layer, li) => {
    layer.forEach(([ox, oy, oz], bi) => {
      const colorIdx = (li * 4 + bi) % colors.length
      const mat = new THREE.MeshStandardMaterial({ color: colors[colorIdx], flatShading: true })

      const mesh = new THREE.Mesh(geo, mat)
      mesh.castShadow = true
      mesh.receiveShadow = true
      scene.add(mesh)

      const x = baseX + ox * BOX_SIZE
      const y = HALF + oy * BOX_SIZE
      const z = baseZ + oz * BOX_SIZE

      const body = new CANNON.Body({
        mass: 3,
        material: objectMat,
        position: new CANNON.Vec3(x, y, z),
        linearDamping: 0.2,
        angularDamping: 0.3,
      })
      body.addShape(new CANNON.Box(new CANNON.Vec3(HALF, HALF, HALF)))

      body.sleepSpeedLimit = 0.3
      body.sleepTimeLimit  = 1.5

      world.addBody(body)
      syncList.push({ mesh, body })
    })
  })
}

// ─── Bouncy Spheres ─────────────────────────────────────────────────────────
// Colorful balls near the Contact building
function _createSpheres(scene, world, objectMat, syncList) {
  const RADIUS = 0.45
  const COUNT  = 8

  const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c', '#e91e63', '#ff5722']
  const geo = new THREE.SphereGeometry(RADIUS, 12, 8)

  // Position near Contact building (x:0, z:20)
  const baseX = -5
  const baseZ = 16

  for (let i = 0; i < COUNT; i++) {
    const mat = new THREE.MeshStandardMaterial({ color: colors[i % colors.length], flatShading: true })

    const mesh = new THREE.Mesh(geo, mat)
    mesh.castShadow = true
    mesh.receiveShadow = true
    scene.add(mesh)

    // Scatter in a rough cluster
    const angle = (i / COUNT) * Math.PI * 2
    const dist  = 1.5 + Math.sin(i * 3.7) * 1.2
    const x = baseX + Math.cos(angle) * dist
    const z = baseZ + Math.sin(angle) * dist

    const body = new CANNON.Body({
      mass: 2,
      material: objectMat,
      position: new CANNON.Vec3(x, RADIUS, z),
      linearDamping: 0.15,
      angularDamping: 0.15,
    })
    body.addShape(new CANNON.Sphere(RADIUS))

    body.sleepSpeedLimit = 0.3
    body.sleepTimeLimit  = 1.0

    world.addBody(body)
    syncList.push({ mesh, body })
  }
}
