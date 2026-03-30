/**
 * Interactive physics objects scattered around the world.
 * - Dominos near the Projects building (x:20, z:0)
 * - Stacked boxes near the About building (x:0, z:-20)
 * - Bouncy spheres near the Contact building (x:0, z:20)
 *
 * All are dynamic Rapier bodies with Three.js mesh sync.
 * Ported from physicssim9's cannon-es version.
 */
import * as THREE from 'three'

export function createInteractables(scene, RAPIER, world) {
  const group = new THREE.Group()
  const syncList = []

  _createDominos(group, RAPIER, world, syncList)
  _createBoxStack(group, RAPIER, world, syncList)
  _createSpheres(group, RAPIER, world, syncList)
  _createBowlingPins(group, RAPIER, world, syncList)
  _createTrafficCones(group, RAPIER, world, syncList)
  _createAlienCrystals(group, RAPIER, world, syncList)
  _createBarrels(group, RAPIER, world, syncList)
  _createSpaceCrates(group, RAPIER, world, syncList)

  scene.add(group)
  return { group, syncList }
}

// ─── Dominos ────────────────────────────────────────────────────────────────
// A curved row of dominos near the Projects building
function _createDominos(group, RAPIER, world, syncList) {
  const DOMINO_W = 0.12   // thin
  const DOMINO_H = 0.8    // tall
  const DOMINO_D = 0.5    // wide face
  const COUNT    = 14

  const mat = new THREE.MeshStandardMaterial({ color: '#f0e6d3', flatShading: true })
  const geo = new THREE.BoxGeometry(DOMINO_W, DOMINO_H, DOMINO_D)

  // Arc of dominos curving from beside the Projects building
  const centerX = 12
  const centerZ = -7
  const arcRadius = 4
  const arcStart  = -Math.PI * 0.2
  const arcEnd    =  Math.PI * 0.4

  for (let i = 0; i < COUNT; i++) {
    const t = i / (COUNT - 1)
    const angle = arcStart + t * (arcEnd - arcStart)

    const x = centerX + Math.cos(angle) * arcRadius
    const z = centerZ + Math.sin(angle) * arcRadius
    const y = DOMINO_H / 2

    const mesh = new THREE.Mesh(geo, mat)
    mesh.castShadow = true
    mesh.receiveShadow = true
    group.add(mesh)

    // Orient each domino to face the next one (tangent to arc)
    const orientAngle = -angle + Math.PI / 2
    const halfA = orientAngle * 0.5

    const bodyDesc = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(x, y, z)
      .setRotation({ x: 0, y: Math.sin(halfA), z: 0, w: Math.cos(halfA) })
      .setLinearDamping(0.2)
      .setAngularDamping(0.2)
    const body = world.createRigidBody(bodyDesc)

    // mass ~1.5: density = mass / volume = 1.5 / (0.12 * 0.8 * 0.5) = 31.25
    const colDesc = RAPIER.ColliderDesc.cuboid(DOMINO_W / 2, DOMINO_H / 2, DOMINO_D / 2)
      .setDensity(31.25)
      .setFriction(0.4)
      .setRestitution(0.2)
    world.createCollider(colDesc, body)

    syncList.push({ mesh, body })
  }
}

// ─── Box Stack ──────────────────────────────────────────────────────────────
// A pyramid of crates near the About building
function _createBoxStack(group, RAPIER, world, syncList) {
  const BOX_SIZE = 0.8
  const HALF     = BOX_SIZE / 2

  const colors = ['#c0392b', '#e67e22', '#f1c40f', '#27ae60', '#2980b9', '#8e44ad']
  const geo = new THREE.BoxGeometry(BOX_SIZE, BOX_SIZE, BOX_SIZE)

  // Position near About building (x:0, z:-20) — offset so you can drive into them
  const baseX = 7
  const baseZ = -13

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
      const meshMat = new THREE.MeshStandardMaterial({ color: colors[colorIdx], flatShading: true })

      const mesh = new THREE.Mesh(geo, meshMat)
      mesh.castShadow = true
      mesh.receiveShadow = true
      group.add(mesh)

      const x = baseX + ox * BOX_SIZE
      const y = HALF + oy * BOX_SIZE
      const z = baseZ + oz * BOX_SIZE

      const bodyDesc = RAPIER.RigidBodyDesc.dynamic()
        .setTranslation(x, y, z)
        .setLinearDamping(0.2)
        .setAngularDamping(0.3)
      const body = world.createRigidBody(bodyDesc)

      // mass ~3: volume = 0.8^3 = 0.512, density = 3 / 0.512 ~ 5.86
      const colDesc = RAPIER.ColliderDesc.cuboid(HALF, HALF, HALF)
        .setDensity(5.86)
        .setFriction(0.4)
        .setRestitution(0.2)
      world.createCollider(colDesc, body)

      syncList.push({ mesh, body })
    })
  })
}

// ─── Bouncy Spheres ─────────────────────────────────────────────────────────
// Colorful balls near the Contact building
function _createSpheres(group, RAPIER, world, syncList) {
  const RADIUS = 0.45
  const COUNT  = 8

  const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c', '#e91e63', '#ff5722']
  const geo = new THREE.SphereGeometry(RADIUS, 12, 8)

  // Position in open area (upper-left)
  const baseX = -15
  const baseZ = 8

  for (let i = 0; i < COUNT; i++) {
    const meshMat = new THREE.MeshStandardMaterial({ color: colors[i % colors.length], flatShading: true })

    const mesh = new THREE.Mesh(geo, meshMat)
    mesh.castShadow = true
    mesh.receiveShadow = true
    group.add(mesh)

    // Scatter in a rough cluster
    const angle = (i / COUNT) * Math.PI * 2
    const dist  = 1.5 + Math.sin(i * 3.7) * 1.2
    const x = baseX + Math.cos(angle) * dist
    const z = baseZ + Math.sin(angle) * dist

    const bodyDesc = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(x, RADIUS, z)
      .setLinearDamping(0.15)
      .setAngularDamping(0.15)
    const body = world.createRigidBody(bodyDesc)

    // mass ~2: sphere volume = 4/3 * pi * r^3 = 0.382, density = 2 / 0.382 ~ 5.24
    const colDesc = RAPIER.ColliderDesc.ball(RADIUS)
      .setDensity(5.24)
      .setFriction(0.3)
      .setRestitution(0.6)  // bouncy!
    world.createCollider(colDesc, body)

    syncList.push({ mesh, body })
  }
}

// ─── Bowling Pins ──────────────────────────────────────────────────────────
// Standard 10-pin triangle formation — moved closer to center
function _createBowlingPins(group, RAPIER, world, syncList) {
  const PIN_R = 0.12
  const PIN_H = 0.6
  const CAP_R = 0.1

  const cylGeo   = new THREE.CylinderGeometry(PIN_R, PIN_R, PIN_H, 8)
  const capGeo   = new THREE.SphereGeometry(CAP_R, 8, 6)
  const whiteMat  = new THREE.MeshStandardMaterial({ color: '#f5f5f0', flatShading: true })
  const redMat    = new THREE.MeshStandardMaterial({ color: '#cc2222', flatShading: true })
  const stripeGeo = new THREE.CylinderGeometry(PIN_R + 0.005, PIN_R + 0.005, 0.08, 8)

  // Moved closer to center (was -14, -1)
  const baseX = -8
  const baseZ = -1
  const spacing = 0.35

  const rows = [
    [[0, 0]],
    [[-0.5, 1], [0.5, 1]],
    [[-1, 2], [0, 2], [1, 2]],
    [[-1.5, 3], [-0.5, 3], [0.5, 3], [1.5, 3]],
  ]

  for (const row of rows) {
    for (const [ox, oz] of row) {
      const x = baseX + ox * spacing
      const z = baseZ + oz * spacing
      const y = PIN_H / 2

      const pinGroup = new THREE.Group()

      const bodyMesh = new THREE.Mesh(cylGeo, whiteMat)
      bodyMesh.castShadow = true
      bodyMesh.receiveShadow = true
      pinGroup.add(bodyMesh)

      const stripe = new THREE.Mesh(stripeGeo, redMat)
      stripe.position.y = 0.05
      pinGroup.add(stripe)

      const cap = new THREE.Mesh(capGeo, whiteMat)
      cap.position.y = PIN_H / 2 + CAP_R * 0.5
      cap.castShadow = true
      pinGroup.add(cap)

      group.add(pinGroup)

      const bodyDesc = RAPIER.RigidBodyDesc.dynamic()
        .setTranslation(x, y, z)
        .setLinearDamping(0.2)
        .setAngularDamping(0.3)
      const body = world.createRigidBody(bodyDesc)

      const colDesc = RAPIER.ColliderDesc.cylinder(PIN_H / 2, PIN_R)
        .setDensity(8.0)
        .setFriction(0.5)
        .setRestitution(0.15)
      world.createCollider(colDesc, body)

      syncList.push({ mesh: pinGroup, body })
    }
  }
}

// ─── Traffic Cones ─────────────────────────────────────────────────────────
// 12 simple orange cones along the 4 main roads
function _createTrafficCones(group, RAPIER, world, syncList) {
  const CONE_R = 0.2
  const CONE_H = 0.5

  const coneGeo  = new THREE.ConeGeometry(CONE_R, CONE_H, 8)
  const baseGeo  = new THREE.CylinderGeometry(0.25, 0.25, 0.04, 8)
  const orangeMat = new THREE.MeshStandardMaterial({ color: '#ff6600', flatShading: true })

  // 4 roads, 3 cones each — offset 0.8 from road center (shoulder)
  const positions = [
    // Road to About (going -Z)
    { x:  0.8, z:  -5 }, { x:  0.8, z:  -8 }, { x:  0.8, z: -11 },
    // Road to Projects (going +X)
    { x:  5,   z:  0.8 }, { x:  8,   z:  0.8 }, { x: 11,   z:  0.8 },
    // Road to Contact (going +Z)
    { x: -0.8, z:   5 }, { x: -0.8, z:   8 }, { x: -0.8, z:  11 },
    // Road to Experience (going -X)
    { x: -5,   z: -0.8 }, { x: -8,   z: -0.8 }, { x: -11,  z: -0.8 },
  ]

  for (const pos of positions) {
    const coneGroup = new THREE.Group()

    // Single solid orange cone
    const cone = new THREE.Mesh(coneGeo, orangeMat)
    cone.castShadow = true
    cone.receiveShadow = true
    coneGroup.add(cone)

    // Thin base plate
    const base = new THREE.Mesh(baseGeo, orangeMat)
    base.position.y = -CONE_H / 2 + 0.02
    base.receiveShadow = true
    coneGroup.add(base)

    group.add(coneGroup)

    const bodyDesc = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(pos.x, 0.25, pos.z)
      .setLinearDamping(0.2)
      .setAngularDamping(0.2)
    const body = world.createRigidBody(bodyDesc)

    const colDesc = RAPIER.ColliderDesc.cuboid(0.15, 0.25, 0.15)
      .setDensity(1.5)
      .setFriction(0.4)
      .setRestitution(0.3)
    world.createCollider(colDesc, body)

    syncList.push({ mesh: coneGroup, body })
  }
}

// ─── Alien Crystals ────────────────────────────────────────────────────────
// 6 glowing pushable crystals scattered near the large crater (-28, 28)
function _createAlienCrystals(group, RAPIER, world, syncList) {
  const crystalGeo = new THREE.DodecahedronGeometry(0.3, 0)
  const BALL_R = 0.4

  const crystalDefs = [
    { color: '#00cccc', emissive: '#00ffff' },
    { color: '#8833dd', emissive: '#aa44ff' },
    { color: '#00cccc', emissive: '#00ffff' },
    { color: '#8833dd', emissive: '#aa44ff' },
    { color: '#00aaaa', emissive: '#00dddd' },
    { color: '#9944ee', emissive: '#bb55ff' },
  ]

  const positions = [
    { x: -25, z: 24 },
    { x: -27, z: 26 },
    { x: -29, z: 23 },
    { x: -26, z: 30 },
    { x: -31, z: 28 },
    { x: -28, z: 33 },
  ]

  for (let i = 0; i < 6; i++) {
    const { color, emissive } = crystalDefs[i]
    const mat = new THREE.MeshStandardMaterial({
      color,
      emissive,
      emissiveIntensity: 0.6,
      flatShading: true,
      roughness: 0.2,
      metalness: 0.3,
    })

    const mesh = new THREE.Mesh(crystalGeo, mat)
    mesh.scale.set(0.5, 1.2, 0.5)
    mesh.castShadow = true
    mesh.receiveShadow = true
    group.add(mesh)

    const pos = positions[i]
    const y = 0.5

    const bodyDesc = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(pos.x, y, pos.z)
      .setLinearDamping(0.2)
      .setAngularDamping(0.25)
    const body = world.createRigidBody(bodyDesc)

    const colDesc = RAPIER.ColliderDesc.ball(BALL_R)
      .setDensity(1.5)
      .setFriction(0.3)
      .setRestitution(0.3)
    world.createCollider(colDesc, body)

    syncList.push({ mesh, body })
  }
}

// ─── Barrels ───────────────────────────────────────────────────────────────
// 4 metal barrels near research station (28, -30) — knockable and rollable
function _createBarrels(group, RAPIER, world, syncList) {
  const BARREL_R = 0.35
  const BARREL_H = 0.8

  const barrelGeo = new THREE.CylinderGeometry(BARREL_R, BARREL_R, BARREL_H, 8)
  const bandGeo   = new THREE.CylinderGeometry(BARREL_R + 0.01, BARREL_R + 0.01, 0.06, 8)
  const rimGeo    = new THREE.TorusGeometry(BARREL_R, 0.02, 4, 8)

  const bodyMat = new THREE.MeshStandardMaterial({
    color: '#4a4a5a', flatShading: true, metalness: 0.5, roughness: 0.4,
  })
  const rimMat = new THREE.MeshStandardMaterial({
    color: '#666677', flatShading: true, metalness: 0.6, roughness: 0.3,
  })

  const bandColors = ['#ddcc22', '#cc3333', '#ddcc22', '#cc3333']

  const positions = [
    { x: 25, z: -25 },
    { x: 28, z: -28 },
    { x: 31, z: -26 },
    { x: 27, z: -33 },
  ]

  for (let i = 0; i < 4; i++) {
    const barrelGroup = new THREE.Group()

    const barrel = new THREE.Mesh(barrelGeo, bodyMat)
    barrel.castShadow = true
    barrel.receiveShadow = true
    barrelGroup.add(barrel)

    const bandMat = new THREE.MeshStandardMaterial({
      color: bandColors[i], flatShading: true, metalness: 0.3, roughness: 0.5,
    })
    const band = new THREE.Mesh(bandGeo, bandMat)
    band.position.y = 0.05
    barrelGroup.add(band)

    const topRim = new THREE.Mesh(rimGeo, rimMat)
    topRim.rotation.x = Math.PI / 2
    topRim.position.y = BARREL_H / 2
    barrelGroup.add(topRim)

    const botRim = new THREE.Mesh(rimGeo, rimMat)
    botRim.rotation.x = Math.PI / 2
    botRim.position.y = -BARREL_H / 2
    barrelGroup.add(botRim)

    group.add(barrelGroup)

    const pos = positions[i]
    const y = BARREL_H / 2

    const bodyDesc = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(pos.x, y, pos.z)
      .setLinearDamping(0.2)
      .setAngularDamping(0.25)
    const body = world.createRigidBody(bodyDesc)

    const colDesc = RAPIER.ColliderDesc.cylinder(BARREL_H / 2, BARREL_R)
      .setDensity(4.0)
      .setFriction(0.5)
      .setRestitution(0.1)
    world.createCollider(colDesc, body)

    syncList.push({ mesh: barrelGroup, body })
  }
}

// ─── Space Debris / Crates ─────────────────────────────────────────────────
// 8 small pushable crates scattered across the outer area
function _createSpaceCrates(group, RAPIER, world, syncList) {
  const CRATE_SIZE = 0.6
  const HALF = CRATE_SIZE / 2

  const crateGeo = new THREE.BoxGeometry(CRATE_SIZE, CRATE_SIZE, CRATE_SIZE)
  const markGeo  = new THREE.PlaneGeometry(0.2, 0.2)

  const crateColors = [
    '#3a3a4a', '#4a3a3a', '#3a4a3a', '#4a4a3a',
    '#3a3a5a', '#5a3a3a', '#3a5a3a', '#4a3a5a',
  ]
  const markColors = [
    '#44ff44', '#ff4444', '#4444ff', '#ffff44',
    '#ff44ff', '#44ffff', '#ff8844', '#88ff44',
  ]

  const positions = [
    { x:  22, z:  18 },
    { x: -18, z:  25 },
    { x:  28, z: -12 },
    { x: -25, z: -18 },
    { x:  12, z:  28 },
    { x: -28, z:   5 },
    { x:  15, z: -26 },
    { x:  -8, z: -28 },
  ]

  for (let i = 0; i < 8; i++) {
    const crateMat = new THREE.MeshStandardMaterial({
      color: crateColors[i],
      flatShading: true,
      metalness: 0.5,
      roughness: 0.4,
    })

    const crateGroup = new THREE.Group()

    const crate = new THREE.Mesh(crateGeo, crateMat)
    crate.castShadow = true
    crate.receiveShadow = true
    crateGroup.add(crate)

    // Emissive marking on front face (+Z)
    const markMat = new THREE.MeshStandardMaterial({
      color: markColors[i],
      emissive: markColors[i],
      emissiveIntensity: 0.8,
      flatShading: true,
    })
    const mark = new THREE.Mesh(markGeo, markMat)
    mark.position.z = HALF + 0.001
    crateGroup.add(mark)

    group.add(crateGroup)

    const pos = positions[i]
    const y = HALF

    // Slight random rotation for natural look
    const rotY = (i * 1.37) % (Math.PI * 2)
    const halfA = rotY * 0.5

    const bodyDesc = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(pos.x, y, pos.z)
      .setRotation({ x: 0, y: Math.sin(halfA), z: 0, w: Math.cos(halfA) })
      .setLinearDamping(0.2)
      .setAngularDamping(0.25)
    const body = world.createRigidBody(bodyDesc)

    const colDesc = RAPIER.ColliderDesc.cuboid(HALF, HALF, HALF)
      .setDensity(3.0)
      .setFriction(0.5)
      .setRestitution(0.15)
    world.createCollider(colDesc, body)

    syncList.push({ mesh: crateGroup, body })
  }
}
