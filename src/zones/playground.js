/**
 * Playground / Park zone — colorful park east of city (center: x=40, z=15, radius ~15).
 *
 * Contains: swing set (animated), slide, seesaw (animated), merry-go-round (animated),
 * sandbox with sandcastle, fountain centerpiece with water particles, benches, lamp posts,
 * trash cans, picnic tables, drinking fountain, gazebo, flower beds, bushes, hedge maze,
 * ornamental trees, kite, hopscotch, pinwheel (animated), playground balls (dynamic),
 * wooden blocks (dynamic), toy cars (dynamic).
 */
import * as THREE from 'three'

// Zone center
const CX = 40
const CZ = 15

// ── Helpers ────────────────────────────────────────────────────────────────

function mat(color, opts = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    flatShading: true,
    ...opts,
  })
}

function emissiveMat(color) {
  return new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: 0.8,
    flatShading: true,
  })
}

function shadow(mesh) {
  mesh.castShadow = true
  mesh.receiveShadow = true
  return mesh
}

// ── Ground Patch ───────────────────────────────────────────────────────────

function createGround(scene) {
  // Grass circle
  const grassGeo = new THREE.CylinderGeometry(16, 16, 0.05, 16)
  const grass = new THREE.Mesh(grassGeo, mat(0x5daa3e))
  grass.position.set(CX, -0.02, CZ)
  grass.receiveShadow = true
  scene.add(grass)

  // Lighter path circle
  const pathGeo = new THREE.CylinderGeometry(13, 13, 0.06, 16)
  const path = new THREE.Mesh(pathGeo, mat(0xccbb88))
  path.position.set(CX, -0.01, CZ)
  path.receiveShadow = true
  scene.add(path)

  // Inner grass
  const innerGeo = new THREE.CylinderGeometry(10, 10, 0.07, 16)
  const inner = new THREE.Mesh(innerGeo, mat(0x66b844))
  inner.position.set(CX, -0.005, CZ)
  inner.receiveShadow = true
  scene.add(inner)
}

// ── Swing Set (ANIMATED) ──────────────────────────────────────────────────

function createSwingSet(scene, RAPIER, world) {
  const group = new THREE.Group()
  group.position.set(CX - 10, 0, CZ - 6)

  const frameMat = mat(0xcc3333)
  const chainMat = mat(0x888888)
  const seatMat = mat(0x2255cc)

  // A-frame supports (4 legs)
  const legGeo = new THREE.BoxGeometry(0.12, 3.5, 0.12)
  const legPositions = [
    [-1.8, 1.75, -1.0, 0.15], [-1.8, 1.75, 1.0, -0.15],
    [1.8, 1.75, -1.0, 0.15], [1.8, 1.75, 1.0, -0.15],
  ]
  for (const [lx, ly, lz, rz] of legPositions) {
    const leg = shadow(new THREE.Mesh(legGeo, frameMat))
    leg.position.set(lx, ly, lz)
    leg.rotation.z = rz
    group.add(leg)
  }

  // Top bar
  const barGeo = new THREE.CylinderGeometry(0.08, 0.08, 4, 8)
  const bar = shadow(new THREE.Mesh(barGeo, frameMat))
  bar.position.set(0, 3.4, 0)
  bar.rotation.z = Math.PI / 2
  group.add(bar)

  // Two swings - each is a pivot group that rotates
  const swings = []
  for (let i = 0; i < 2; i++) {
    const swingPivot = new THREE.Group()
    swingPivot.position.set(-0.8 + i * 1.6, 3.4, 0)

    // Chains (2 per swing)
    const chainGeo = new THREE.CylinderGeometry(0.02, 0.02, 2.2, 4)
    const chainL = shadow(new THREE.Mesh(chainGeo, chainMat))
    chainL.position.set(-0.2, -1.1, 0)
    swingPivot.add(chainL)

    const chainR = shadow(new THREE.Mesh(chainGeo, chainMat))
    chainR.position.set(0.2, -1.1, 0)
    swingPivot.add(chainR)

    // Seat
    const seatGeo = new THREE.BoxGeometry(0.5, 0.06, 0.25)
    const seat = shadow(new THREE.Mesh(seatGeo, seatMat))
    seat.position.set(0, -2.2, 0)
    swingPivot.add(seat)

    group.add(swingPivot)
    swings.push(swingPivot)
  }

  // Fixed collider for the frame
  const frameBody = world.createRigidBody(
    RAPIER.RigidBodyDesc.fixed().setTranslation(CX - 10, 1.7, CZ - 6)
  )
  world.createCollider(
    RAPIER.ColliderDesc.cuboid(2.0, 1.7, 1.1).setFriction(0.5),
    frameBody
  )

  scene.add(group)
  return swings
}

// ── Slide ──────────────────────────────────────────────────────────────────

function createSlide(scene, RAPIER, world) {
  const group = new THREE.Group()
  group.position.set(CX - 6, 0, CZ - 9)

  const frameMat = mat(0xdddd22)
  const slideMat = mat(0xcccccc)
  const railMat = mat(0xff4444)

  // Platform
  const platGeo = new THREE.BoxGeometry(1.5, 0.12, 1.5)
  const plat = shadow(new THREE.Mesh(platGeo, frameMat))
  plat.position.set(0, 2.5, 0)
  group.add(plat)

  // Platform supports (4 legs)
  const supportGeo = new THREE.CylinderGeometry(0.08, 0.08, 2.5, 6)
  const supportMat = mat(0x888888)
  for (const [sx, sz] of [[-0.6, -0.6], [-0.6, 0.6], [0.6, -0.6], [0.6, 0.6]]) {
    const sup = shadow(new THREE.Mesh(supportGeo, supportMat))
    sup.position.set(sx, 1.25, sz)
    group.add(sup)
  }

  // Ladder (back side) - rungs
  for (let r = 0; r < 5; r++) {
    const rungGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.8, 6)
    const rung = shadow(new THREE.Mesh(rungGeo, supportMat))
    rung.position.set(0, 0.5 + r * 0.5, -0.65)
    rung.rotation.z = Math.PI / 2
    group.add(rung)
  }

  // Ladder rails
  const ladderRailGeo = new THREE.BoxGeometry(0.06, 2.8, 0.06)
  for (const lx of [-0.4, 0.4]) {
    const lr = shadow(new THREE.Mesh(ladderRailGeo, supportMat))
    lr.position.set(lx, 1.4, -0.65)
    group.add(lr)
  }

  // Sliding surface (angled)
  const slideGeo = new THREE.BoxGeometry(1.0, 0.06, 3.5)
  const slide = shadow(new THREE.Mesh(slideGeo, slideMat))
  slide.position.set(0, 1.3, 2.2)
  slide.rotation.x = 0.38
  group.add(slide)

  // Side rails
  const sideRailGeo = new THREE.BoxGeometry(0.06, 0.4, 3.5)
  for (const rx of [-0.5, 0.5]) {
    const rail = shadow(new THREE.Mesh(sideRailGeo, railMat))
    rail.position.set(rx, 1.45, 2.2)
    rail.rotation.x = 0.38
    group.add(rail)
  }

  // Platform guard rail
  const guardGeo = new THREE.BoxGeometry(1.5, 0.5, 0.06)
  for (const gz of [-0.7, 0.7]) {
    const guard = shadow(new THREE.Mesh(guardGeo, railMat))
    guard.position.set(0, 2.85, gz)
    group.add(guard)
  }

  // Fixed collider
  const slideBody = world.createRigidBody(
    RAPIER.RigidBodyDesc.fixed().setTranslation(CX - 6, 1.5, CZ - 9 + 1.0)
  )
  world.createCollider(
    RAPIER.ColliderDesc.cuboid(0.9, 1.5, 2.2).setFriction(0.3),
    slideBody
  )

  scene.add(group)
}

// ── Seesaw (ANIMATED) ─────────────────────────────────────────────────────

function createSeesaw(scene) {
  const group = new THREE.Group()
  group.position.set(CX - 3, 0, CZ - 8)

  // Central pivot
  const pivotGeo = new THREE.CylinderGeometry(0.25, 0.35, 0.6, 8)
  const pivot = shadow(new THREE.Mesh(pivotGeo, mat(0x888888)))
  pivot.position.set(0, 0.3, 0)
  group.add(pivot)

  // Pivot triangle supports (front/back)
  const triGeo = new THREE.BoxGeometry(0.06, 0.6, 0.6)
  for (const tz of [-0.3, 0.3]) {
    const tri = shadow(new THREE.Mesh(triGeo, mat(0x777777)))
    tri.position.set(0, 0.3, tz)
    group.add(tri)
  }

  // Plank group (tilts)
  const plankPivot = new THREE.Group()
  plankPivot.position.set(0, 0.6, 0)

  const plankGeo = new THREE.BoxGeometry(4.0, 0.12, 0.5)
  const plank = shadow(new THREE.Mesh(plankGeo, mat(0x44bb44)))
  plankPivot.add(plank)

  // Handle bars at each end
  const handleGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.5, 6)
  const handleMat = mat(0xdd4444)
  for (const hx of [-1.8, 1.8]) {
    const handle = shadow(new THREE.Mesh(handleGeo, handleMat))
    handle.position.set(hx, 0.25, 0)
    plankPivot.add(handle)

    // Crossbar
    const crossGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.4, 6)
    const cross = shadow(new THREE.Mesh(crossGeo, handleMat))
    cross.position.set(hx, 0.5, 0)
    cross.rotation.z = Math.PI / 2
    plankPivot.add(cross)
  }

  group.add(plankPivot)
  scene.add(group)

  return plankPivot
}

// ── Merry-Go-Round (ANIMATED) ─────────────────────────────────────────────

function createMerryGoRound(scene) {
  const group = new THREE.Group()
  group.position.set(CX + 5, 0, CZ - 8)

  // Center axle
  const axleGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.5, 8)
  const axle = shadow(new THREE.Mesh(axleGeo, mat(0x888888)))
  axle.position.set(0, 0.25, 0)
  group.add(axle)

  // Spinning platform group
  const spinGroup = new THREE.Group()
  spinGroup.position.y = 0.35

  // Flat platform
  const platGeo = new THREE.CylinderGeometry(1.8, 1.8, 0.12, 12)
  const plat = shadow(new THREE.Mesh(platGeo, mat(0x3388dd)))
  spinGroup.add(plat)

  // Colored segments on top
  const segColors = [0xff4444, 0x44ff44, 0x4444ff, 0xffff44, 0xff44ff, 0x44ffff]
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2
    const segGeo = new THREE.BoxGeometry(0.8, 0.04, 0.3)
    const seg = shadow(new THREE.Mesh(segGeo, mat(segColors[i])))
    seg.position.set(Math.cos(angle) * 1.0, 0.08, Math.sin(angle) * 1.0)
    seg.rotation.y = -angle
    spinGroup.add(seg)
  }

  // Grab handle bars (4 around edge)
  const handleMat = mat(0xdddddd)
  for (let i = 0; i < 4; i++) {
    const angle = (i / 4) * Math.PI * 2
    const hx = Math.cos(angle) * 1.4
    const hz = Math.sin(angle) * 1.4

    // Vertical handle
    const vGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.8, 6)
    const vHandle = shadow(new THREE.Mesh(vGeo, handleMat))
    vHandle.position.set(hx, 0.46, hz)
    spinGroup.add(vHandle)

    // Horizontal crossbar
    const hGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.6, 6)
    const hHandle = shadow(new THREE.Mesh(hGeo, handleMat))
    hHandle.position.set(hx, 0.85, hz)
    hHandle.rotation.z = Math.PI / 2
    hHandle.rotation.y = angle
    spinGroup.add(hHandle)
  }

  group.add(spinGroup)
  scene.add(group)

  return spinGroup
}

// ── Sandbox ───────────────────────────────────────────────────────────────

function createSandbox(scene) {
  const group = new THREE.Group()
  group.position.set(CX + 8, 0, CZ - 4)

  const woodMat = mat(0x8b5e3c)

  // Walls (4 sides)
  const wallGeo = new THREE.BoxGeometry(3.0, 0.4, 0.12)
  const wallSideGeo = new THREE.BoxGeometry(0.12, 0.4, 3.0)

  const wallF = shadow(new THREE.Mesh(wallGeo, woodMat))
  wallF.position.set(0, 0.2, -1.5)
  group.add(wallF)

  const wallB = shadow(new THREE.Mesh(wallGeo, woodMat))
  wallB.position.set(0, 0.2, 1.5)
  group.add(wallB)

  const wallL = shadow(new THREE.Mesh(wallSideGeo, woodMat))
  wallL.position.set(-1.5, 0.2, 0)
  group.add(wallL)

  const wallR = shadow(new THREE.Mesh(wallSideGeo, woodMat))
  wallR.position.set(1.5, 0.2, 0)
  group.add(wallR)

  // Sand fill
  const sandGeo = new THREE.BoxGeometry(2.88, 0.08, 2.88)
  const sand = new THREE.Mesh(sandGeo, mat(0xe8d5a3))
  sand.position.y = 0.04
  sand.receiveShadow = true
  group.add(sand)

  // Sandcastle - base tower
  const castleBase = shadow(new THREE.Mesh(
    new THREE.CylinderGeometry(0.35, 0.4, 0.5, 8),
    mat(0xdcc48e)
  ))
  castleBase.position.set(0.3, 0.33, 0.2)
  group.add(castleBase)

  // Second tier
  const castleMid = shadow(new THREE.Mesh(
    new THREE.CylinderGeometry(0.25, 0.3, 0.35, 8),
    mat(0xd4b87a)
  ))
  castleMid.position.set(0.3, 0.76, 0.2)
  group.add(castleMid)

  // Turrets (4 small cylinders + cone tops)
  const turretPositions = [[0.55, 0.15], [0.05, 0.15], [0.55, 0.45], [0.05, 0.45]]
  for (const [tx, tz] of turretPositions) {
    const turret = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.1, 0.55, 6),
      mat(0xdcc48e)
    ))
    turret.position.set(tx, 0.36, tz)
    group.add(turret)

    const turretTop = shadow(new THREE.Mesh(
      new THREE.ConeGeometry(0.1, 0.15, 6),
      mat(0xc4a860)
    ))
    turretTop.position.set(tx, 0.71, tz)
    group.add(turretTop)
  }

  // Toy shovel
  const shovelHandle = shadow(new THREE.Mesh(
    new THREE.CylinderGeometry(0.02, 0.02, 0.4, 4),
    mat(0x44aadd)
  ))
  shovelHandle.position.set(-0.6, 0.15, -0.5)
  shovelHandle.rotation.z = 0.6
  group.add(shovelHandle)

  const shovelHead = shadow(new THREE.Mesh(
    new THREE.BoxGeometry(0.15, 0.02, 0.12),
    mat(0x44aadd)
  ))
  shovelHead.position.set(-0.78, 0.05, -0.5)
  group.add(shovelHead)

  // Toy bucket
  const bucket = shadow(new THREE.Mesh(
    new THREE.CylinderGeometry(0.12, 0.15, 0.2, 8),
    mat(0xff4466)
  ))
  bucket.position.set(-0.3, 0.18, -0.6)
  group.add(bucket)

  const bucketHandle = shadow(new THREE.Mesh(
    new THREE.TorusGeometry(0.1, 0.015, 4, 8, Math.PI),
    mat(0xdddddd)
  ))
  bucketHandle.position.set(-0.3, 0.32, -0.6)
  group.add(bucketHandle)

  scene.add(group)
}

// ── Fountain (CENTERPIECE, ANIMATED) ──────────────────────────────────────

function createFountain(scene, RAPIER, world) {
  const group = new THREE.Group()
  group.position.set(CX, 0, CZ)

  const stoneMat = mat(0x999999)
  const waterMat = mat(0x3388cc, { transparent: true, opacity: 0.6 })

  // Base pool
  const poolGeo = new THREE.CylinderGeometry(2.5, 2.8, 0.5, 12)
  const pool = shadow(new THREE.Mesh(poolGeo, stoneMat))
  pool.position.y = 0.25
  group.add(pool)

  // Water surface in pool
  const waterSurf = new THREE.Mesh(
    new THREE.CylinderGeometry(2.3, 2.3, 0.06, 12),
    waterMat
  )
  waterSurf.position.y = 0.45
  waterSurf.receiveShadow = true
  group.add(waterSurf)

  // Pool rim
  const rimGeo = new THREE.TorusGeometry(2.5, 0.12, 6, 16)
  const rim = shadow(new THREE.Mesh(rimGeo, mat(0x777777)))
  rim.position.y = 0.5
  rim.rotation.x = Math.PI / 2
  group.add(rim)

  // Central pillar
  const pillarGeo = new THREE.CylinderGeometry(0.2, 0.25, 2.0, 8)
  const pillar = shadow(new THREE.Mesh(pillarGeo, stoneMat))
  pillar.position.y = 1.25
  group.add(pillar)

  // Lower bowl (tier 1)
  const bowl1Geo = new THREE.CylinderGeometry(1.0, 0.5, 0.3, 10)
  const bowl1 = shadow(new THREE.Mesh(bowl1Geo, stoneMat))
  bowl1.position.y = 1.4
  group.add(bowl1)

  // Water in lower bowl
  const water1 = new THREE.Mesh(
    new THREE.CylinderGeometry(0.9, 0.9, 0.06, 10),
    waterMat
  )
  water1.position.y = 1.52
  group.add(water1)

  // Upper bowl (tier 2)
  const bowl2Geo = new THREE.CylinderGeometry(0.5, 0.3, 0.2, 10)
  const bowl2 = shadow(new THREE.Mesh(bowl2Geo, stoneMat))
  bowl2.position.y = 2.0
  group.add(bowl2)

  // Top spout cap
  const capGeo = new THREE.SphereGeometry(0.15, 6, 6)
  const cap = shadow(new THREE.Mesh(capGeo, mat(0x777777)))
  cap.position.y = 2.25
  group.add(cap)

  // Water particles (small blue spheres animated in update)
  const particles = []
  const particleGeo = new THREE.SphereGeometry(0.06, 4, 4)
  const particleMat = mat(0x55aaff, { transparent: true, opacity: 0.7 })

  for (let i = 0; i < 20; i++) {
    const p = new THREE.Mesh(particleGeo, particleMat)
    const angle = (i / 20) * Math.PI * 2
    const r = 0.15 + Math.random() * 0.3
    p.userData.angle = angle
    p.userData.radius = r
    p.userData.speed = 1.5 + Math.random() * 1.0
    p.userData.phase = Math.random() * Math.PI * 2
    p.userData.maxH = 0.5 + Math.random() * 0.6
    p.position.set(
      Math.cos(angle) * r,
      2.3,
      Math.sin(angle) * r
    )
    group.add(p)
    particles.push(p)
  }

  // Fixed collider
  const fountainBody = world.createRigidBody(
    RAPIER.RigidBodyDesc.fixed().setTranslation(CX, 1.0, CZ)
  )
  world.createCollider(
    RAPIER.ColliderDesc.cylinder(1.0, 2.6).setFriction(0.5),
    fountainBody
  )

  scene.add(group)
  return particles
}

// ── Benches ───────────────────────────────────────────────────────────────

function createBenches(scene) {
  const benchPositions = [
    { x: CX - 5, z: CZ + 4, ry: 0 },
    { x: CX + 5, z: CZ + 5, ry: 0.3 },
    { x: CX - 8, z: CZ + 2, ry: 1.2 },
    { x: CX + 9, z: CZ + 2, ry: -0.8 },
    { x: CX - 4, z: CZ + 10, ry: 0.5 },
    { x: CX + 3, z: CZ + 9, ry: -0.3 },
  ]

  const woodMat = mat(0x8b6914)
  const legMat = mat(0x555555)

  benchPositions.forEach((pos) => {
    const benchGroup = new THREE.Group()
    benchGroup.position.set(pos.x, 0, pos.z)
    benchGroup.rotation.y = pos.ry

    // Seat
    const seatGeo = new THREE.BoxGeometry(1.2, 0.06, 0.4)
    const seat = shadow(new THREE.Mesh(seatGeo, woodMat))
    seat.position.y = 0.45
    benchGroup.add(seat)

    // Backrest
    const backGeo = new THREE.BoxGeometry(1.2, 0.4, 0.06)
    const back = shadow(new THREE.Mesh(backGeo, woodMat))
    back.position.set(0, 0.7, -0.17)
    back.rotation.x = -0.15
    benchGroup.add(back)

    // Legs (4)
    const legGeo = new THREE.BoxGeometry(0.06, 0.45, 0.06)
    for (const [lx, lz] of [[-0.5, -0.15], [-0.5, 0.15], [0.5, -0.15], [0.5, 0.15]]) {
      const leg = shadow(new THREE.Mesh(legGeo, legMat))
      leg.position.set(lx, 0.22, lz)
      benchGroup.add(leg)
    }

    // Slat details on seat
    for (let s = 0; s < 3; s++) {
      const slatGeo = new THREE.BoxGeometry(1.18, 0.02, 0.1)
      const slat = shadow(new THREE.Mesh(slatGeo, mat(0x7a5c10)))
      slat.position.set(0, 0.47, -0.12 + s * 0.13)
      benchGroup.add(slat)
    }

    scene.add(benchGroup)
  })
}

// ── Lamp Posts ─────────────────────────────────────────────────────────────

function createLampPosts(scene) {
  const lampPositions = [
    [CX - 10, CZ + 5], [CX + 10, CZ + 5],
    [CX - 7, CZ + 12], [CX + 7, CZ + 12],
  ]

  const poleMat = mat(0x444444)
  const lamps = []

  lampPositions.forEach(([lx, lz]) => {
    const group = new THREE.Group()
    group.position.set(lx, 0, lz)

    // Pole
    const poleGeo = new THREE.CylinderGeometry(0.06, 0.08, 3.5, 6)
    const pole = shadow(new THREE.Mesh(poleGeo, poleMat))
    pole.position.y = 1.75
    group.add(pole)

    // Base
    const baseGeo = new THREE.CylinderGeometry(0.15, 0.2, 0.15, 8)
    const base = shadow(new THREE.Mesh(baseGeo, poleMat))
    base.position.y = 0.075
    group.add(base)

    // Arm
    const armGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.6, 6)
    const arm = shadow(new THREE.Mesh(armGeo, poleMat))
    arm.position.set(0.25, 3.4, 0)
    arm.rotation.z = Math.PI / 2
    group.add(arm)

    // Lamp bulb (emissive)
    const bulbGeo = new THREE.SphereGeometry(0.15, 6, 6)
    const bulb = new THREE.Mesh(bulbGeo, emissiveMat(0xffee66))
    bulb.position.set(0.5, 3.35, 0)
    group.add(bulb)

    // Lamp shade
    const shadeGeo = new THREE.ConeGeometry(0.25, 0.15, 8)
    const shade = shadow(new THREE.Mesh(shadeGeo, poleMat))
    shade.position.set(0.5, 3.5, 0)
    group.add(shade)

    scene.add(group)
    lamps.push(bulb)
  })

  return lamps
}

// ── Trash Cans ────────────────────────────────────────────────────────────

function createTrashCans(scene) {
  const trashPositions = [
    [CX - 9, CZ - 2], [CX + 11, CZ + 8], [CX + 2, CZ + 12],
  ]

  trashPositions.forEach(([tx, tz]) => {
    const group = new THREE.Group()
    group.position.set(tx, 0, tz)

    // Body
    const bodyGeo = new THREE.CylinderGeometry(0.25, 0.3, 0.7, 8)
    const body = shadow(new THREE.Mesh(bodyGeo, mat(0x446644)))
    body.position.y = 0.35
    group.add(body)

    // Lid
    const lidGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.06, 8)
    const lid = shadow(new THREE.Mesh(lidGeo, mat(0x335533)))
    lid.position.y = 0.73
    group.add(lid)

    // Band
    const bandGeo = new THREE.CylinderGeometry(0.27, 0.27, 0.04, 8)
    const band = shadow(new THREE.Mesh(bandGeo, mat(0x333333)))
    band.position.y = 0.45
    group.add(band)

    scene.add(group)
  })
}

// ── Picnic Tables ─────────────────────────────────────────────────────────

function createPicnicTables(scene) {
  const tablePositions = [
    { x: CX + 10, z: CZ + 10, ry: 0.4 },
    { x: CX - 12, z: CZ + 8, ry: -0.6 },
  ]

  const woodMat = mat(0x8b5e3c)

  tablePositions.forEach((pos) => {
    const group = new THREE.Group()
    group.position.set(pos.x, 0, pos.z)
    group.rotation.y = pos.ry

    // Table top
    const topGeo = new THREE.BoxGeometry(2.0, 0.08, 0.8)
    const top = shadow(new THREE.Mesh(topGeo, woodMat))
    top.position.y = 0.75
    group.add(top)

    // Table legs (A-frame style)
    const legGeo = new THREE.BoxGeometry(0.08, 0.75, 0.8)
    for (const lx of [-0.7, 0.7]) {
      const leg = shadow(new THREE.Mesh(legGeo, woodMat))
      leg.position.set(lx, 0.37, 0)
      group.add(leg)
    }

    // Bench seats (two sides)
    const benchGeo = new THREE.BoxGeometry(2.0, 0.06, 0.3)
    for (const bz of [-0.6, 0.6]) {
      const bench = shadow(new THREE.Mesh(benchGeo, mat(0x7a5020)))
      bench.position.set(0, 0.4, bz)
      group.add(bench)

      // Bench leg supports
      for (const blx of [-0.7, 0.7]) {
        const bLeg = shadow(new THREE.Mesh(
          new THREE.BoxGeometry(0.06, 0.4, 0.06),
          woodMat
        ))
        bLeg.position.set(blx, 0.2, bz)
        group.add(bLeg)
      }
    }

    // Cross brace
    const braceGeo = new THREE.BoxGeometry(1.4, 0.06, 0.06)
    const brace = shadow(new THREE.Mesh(braceGeo, woodMat))
    brace.position.set(0, 0.2, 0)
    group.add(brace)

    scene.add(group)
  })
}

// ── Drinking Fountain ─────────────────────────────────────────────────────

function createDrinkingFountain(scene) {
  const group = new THREE.Group()
  group.position.set(CX + 12, 0, CZ + 3)

  // Base pedestal
  const pedGeo = new THREE.CylinderGeometry(0.2, 0.25, 0.8, 8)
  const ped = shadow(new THREE.Mesh(pedGeo, mat(0x999999)))
  ped.position.y = 0.4
  group.add(ped)

  // Basin
  const basinGeo = new THREE.CylinderGeometry(0.3, 0.2, 0.15, 8)
  const basin = shadow(new THREE.Mesh(basinGeo, mat(0xaaaaaa)))
  basin.position.y = 0.85
  group.add(basin)

  // Spout
  const spoutGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.2, 6)
  const spout = shadow(new THREE.Mesh(spoutGeo, mat(0x888888)))
  spout.position.set(0, 0.95, 0.12)
  spout.rotation.x = -0.5
  group.add(spout)

  // Water droplet (decorative)
  const dropGeo = new THREE.SphereGeometry(0.04, 4, 4)
  const drop = new THREE.Mesh(dropGeo, mat(0x55aaff, { transparent: true, opacity: 0.5 }))
  drop.position.set(0, 0.92, 0.2)
  group.add(drop)

  scene.add(group)
}

// ── Gazebo ────────────────────────────────────────────────────────────────

function createGazebo(scene, RAPIER, world) {
  const group = new THREE.Group()
  group.position.set(CX - 8, 0, CZ + 10)

  const pillarMat = mat(0xcccccc)
  const floorMat = mat(0xaa9977)
  const roofMat = mat(0xcc4444)

  // Raised floor (hexagonal approximation: flat cylinder)
  const floorGeo = new THREE.CylinderGeometry(2.5, 2.5, 0.2, 6)
  const floor = shadow(new THREE.Mesh(floorGeo, floorMat))
  floor.position.y = 0.15
  group.add(floor)

  // Step
  const stepGeo = new THREE.CylinderGeometry(2.8, 2.8, 0.1, 6)
  const step = shadow(new THREE.Mesh(stepGeo, mat(0x999988)))
  step.position.y = 0.05
  group.add(step)

  // 6 pillars
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2
    const px = Math.cos(angle) * 2.2
    const pz = Math.sin(angle) * 2.2

    const pillarGeo = new THREE.CylinderGeometry(0.12, 0.12, 3.0, 8)
    const pillar = shadow(new THREE.Mesh(pillarGeo, pillarMat))
    pillar.position.set(px, 1.75, pz)
    group.add(pillar)

    // Pillar base
    const pBaseGeo = new THREE.BoxGeometry(0.3, 0.15, 0.3)
    const pBase = shadow(new THREE.Mesh(pBaseGeo, mat(0xaaaaaa)))
    pBase.position.set(px, 0.32, pz)
    group.add(pBase)

    // Pillar capital
    const capGeo = new THREE.BoxGeometry(0.3, 0.1, 0.3)
    const cap = shadow(new THREE.Mesh(capGeo, mat(0xaaaaaa)))
    cap.position.set(px, 3.2, pz)
    group.add(cap)
  }

  // Hexagonal roof (cone)
  const roofGeo = new THREE.ConeGeometry(3.0, 1.5, 6)
  const roof = shadow(new THREE.Mesh(roofGeo, roofMat))
  roof.position.y = 4.0
  group.add(roof)

  // Roof trim
  const trimGeo = new THREE.CylinderGeometry(2.8, 2.8, 0.08, 6)
  const trim = shadow(new THREE.Mesh(trimGeo, mat(0xbb3333)))
  trim.position.y = 3.25
  group.add(trim)

  // Roof finial
  const finialGeo = new THREE.SphereGeometry(0.12, 6, 6)
  const finial = shadow(new THREE.Mesh(finialGeo, mat(0xddaa00)))
  finial.position.y = 4.8
  group.add(finial)

  // Inner bench (circular)
  const iBenchGeo = new THREE.CylinderGeometry(1.6, 1.6, 0.08, 6)
  const iBench = shadow(new THREE.Mesh(iBenchGeo, mat(0x8b6914)))
  iBench.position.y = 0.5
  group.add(iBench)

  // Fixed collider (pillars form a rough cylinder)
  const gazeboBody = world.createRigidBody(
    RAPIER.RigidBodyDesc.fixed().setTranslation(CX - 8, 1.5, CZ + 10)
  )
  world.createCollider(
    RAPIER.ColliderDesc.cylinder(1.5, 2.5).setFriction(0.5),
    gazeboBody
  )

  scene.add(group)
}

// ── Garden: Flower Beds, Bushes, Hedge Maze, Ornamental Trees ─────────────

function createGarden(scene) {
  // Flower beds (3)
  const flowerBedData = [
    { x: CX + 6, z: CZ + 6, colors: [0xff4488, 0xff8844, 0xffdd44] },
    { x: CX - 3, z: CZ + 6, colors: [0xaa44ff, 0x44aaff, 0x44ffaa] },
    { x: CX + 2, z: CZ - 4, colors: [0xff4444, 0xffff44, 0xff88ff] },
  ]

  flowerBedData.forEach((bed) => {
    const bedGroup = new THREE.Group()
    bedGroup.position.set(bed.x, 0, bed.z)

    // Dirt patch
    const dirtGeo = new THREE.BoxGeometry(1.5, 0.08, 1.0)
    const dirt = new THREE.Mesh(dirtGeo, mat(0x664422))
    dirt.position.y = 0.04
    dirt.receiveShadow = true
    bedGroup.add(dirt)

    // Border stones
    const stoneGeo = new THREE.BoxGeometry(0.15, 0.12, 0.15)
    const stoneMat = mat(0x888888)
    for (let s = -3; s <= 3; s++) {
      const sFront = shadow(new THREE.Mesh(stoneGeo, stoneMat))
      sFront.position.set(s * 0.2, 0.06, -0.5)
      bedGroup.add(sFront)
      const sBack = shadow(new THREE.Mesh(stoneGeo, stoneMat))
      sBack.position.set(s * 0.2, 0.06, 0.5)
      bedGroup.add(sBack)
    }

    // Flowers (colored spheres on stems)
    for (let f = 0; f < 8; f++) {
      const fx = (Math.random() - 0.5) * 1.2
      const fz = (Math.random() - 0.5) * 0.7
      const color = bed.colors[f % bed.colors.length]

      // Stem
      const stemGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.25 + Math.random() * 0.15, 4)
      const stem = shadow(new THREE.Mesh(stemGeo, mat(0x339933)))
      const stemH = 0.12 + (0.25 + Math.random() * 0.15) / 2
      stem.position.set(fx, stemH, fz)
      bedGroup.add(stem)

      // Flower head
      const flowerGeo = new THREE.SphereGeometry(0.06 + Math.random() * 0.04, 6, 6)
      const flower = shadow(new THREE.Mesh(flowerGeo, mat(color)))
      flower.position.set(fx, stemH + 0.15, fz)
      bedGroup.add(flower)

      // Leaf
      const leafGeo = new THREE.SphereGeometry(0.04, 4, 4)
      const leaf = shadow(new THREE.Mesh(leafGeo, mat(0x44aa44)))
      leaf.position.set(fx + 0.05, stemH - 0.05, fz)
      leaf.scale.set(1.5, 0.5, 1)
      bedGroup.add(leaf)
    }

    scene.add(bedGroup)
  })

  // Bushes (4 green sphere clusters)
  const bushPositions = [
    [CX - 12, CZ + 3], [CX + 13, CZ + 6],
    [CX - 5, CZ - 11], [CX + 8, CZ + 12],
  ]

  bushPositions.forEach(([bx, bz]) => {
    const bushGroup = new THREE.Group()
    bushGroup.position.set(bx, 0, bz)

    const mainGeo = new THREE.SphereGeometry(0.5, 6, 6)
    const main = shadow(new THREE.Mesh(mainGeo, mat(0x338833)))
    main.position.y = 0.35
    bushGroup.add(main)

    // Sub-spheres
    for (let i = 0; i < 3; i++) {
      const subGeo = new THREE.SphereGeometry(0.3, 5, 5)
      const sub = shadow(new THREE.Mesh(subGeo, mat(0x2d7a2d)))
      const angle = (i / 3) * Math.PI * 2
      sub.position.set(Math.cos(angle) * 0.35, 0.25, Math.sin(angle) * 0.35)
      bushGroup.add(sub)
    }

    scene.add(bushGroup)
  })

  // Hedge maze (short green box walls)
  const hedgeGroup = new THREE.Group()
  hedgeGroup.position.set(CX + 10, 0, CZ - 10)

  const hedgeMat = mat(0x2d6e2d)
  const hedgeWalls = [
    // Outer walls
    { x: 0, z: -2.5, w: 5.0, d: 0.2 },    // top
    { x: 0, z: 2.5, w: 5.0, d: 0.2 },     // bottom
    { x: -2.5, z: 0, w: 0.2, d: 5.0 },    // left
    { x: 2.5, z: 0, w: 0.2, d: 5.0 },     // right
    // Inner walls
    { x: -1.0, z: -1.5, w: 2.0, d: 0.2 },
    { x: 1.0, z: -0.5, w: 0.2, d: 2.0 },
    { x: -0.5, z: 0.8, w: 1.8, d: 0.2 },
    { x: 1.5, z: 1.5, w: 0.2, d: 1.5 },
    { x: -1.5, z: 0, w: 0.2, d: 2.0 },
  ]

  hedgeWalls.forEach((hw) => {
    const wallGeo = new THREE.BoxGeometry(hw.w, 0.6, hw.d)
    const wall = shadow(new THREE.Mesh(wallGeo, hedgeMat))
    wall.position.set(hw.x, 0.3, hw.z)
    hedgeGroup.add(wall)
  })

  scene.add(hedgeGroup)

  // Ornamental trees (2)
  const treePositions = [
    [CX - 11, CZ - 5], [CX + 7, CZ + 14],
  ]

  treePositions.forEach(([tx, tz]) => {
    const treeGroup = new THREE.Group()
    treeGroup.position.set(tx, 0, tz)

    // Trunk
    const trunkGeo = new THREE.CylinderGeometry(0.12, 0.18, 2.0, 6)
    const trunk = shadow(new THREE.Mesh(trunkGeo, mat(0x6b4226)))
    trunk.position.y = 1.0
    treeGroup.add(trunk)

    // Ball canopy (multiple spheres)
    const canopyMat = mat(0x33aa33)
    const mainCanopy = shadow(new THREE.Mesh(
      new THREE.SphereGeometry(0.9, 8, 8),
      canopyMat
    ))
    mainCanopy.position.y = 2.5
    treeGroup.add(mainCanopy)

    // Sub-canopies
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2
      const sub = shadow(new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 6, 6),
        mat(0x2d9a2d)
      ))
      sub.position.set(Math.cos(angle) * 0.6, 2.3, Math.sin(angle) * 0.6)
      treeGroup.add(sub)
    }

    scene.add(treeGroup)
  })
}

// ── Kite ──────────────────────────────────────────────────────────────────

function createKite(scene) {
  const group = new THREE.Group()
  group.position.set(CX + 4, 8, CZ + 5)

  // Diamond shape (2 triangles)
  const kiteGeo = new THREE.BufferGeometry()
  const vertices = new Float32Array([
    0, 0.6, 0,     // top
    -0.4, 0, 0,    // left
    0, -0.8, 0,    // bottom
    0, 0.6, 0,     // top
    0, -0.8, 0,    // bottom
    0.4, 0, 0,     // right
  ])
  kiteGeo.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
  kiteGeo.computeVertexNormals()

  const kite = new THREE.Mesh(kiteGeo, mat(0xff4444, { side: THREE.DoubleSide }))
  kite.castShadow = true
  group.add(kite)

  // Cross strut
  const strutH = shadow(new THREE.Mesh(
    new THREE.CylinderGeometry(0.01, 0.01, 0.8, 4),
    mat(0x886633)
  ))
  strutH.rotation.z = Math.PI / 2
  group.add(strutH)

  const strutV = shadow(new THREE.Mesh(
    new THREE.CylinderGeometry(0.01, 0.01, 1.4, 4),
    mat(0x886633)
  ))
  strutV.position.y = -0.1
  group.add(strutV)

  // Tail (series of small bows)
  const tailColors = [0xff4444, 0x4444ff, 0xffff44, 0x44ff44]
  for (let i = 0; i < 4; i++) {
    const bow = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(0.15, 0.04, 0.06),
      mat(tailColors[i])
    ))
    bow.position.set(0, -1.0 - i * 0.4, 0)
    bow.rotation.z = (i % 2 === 0) ? 0.3 : -0.3
    group.add(bow)
  }

  // String (from kite down to ground)
  const stringGeo = new THREE.CylinderGeometry(0.008, 0.008, 7, 4)
  const string = new THREE.Mesh(stringGeo, mat(0xaaaaaa))
  string.position.set(0, -4.2, 0)
  string.rotation.z = 0.15
  group.add(string)

  // Slight tilt
  group.rotation.z = 0.1
  group.rotation.x = -0.1

  scene.add(group)
}

// ── Hopscotch Grid ────────────────────────────────────────────────────────

function createHopscotch(scene) {
  const group = new THREE.Group()
  group.position.set(CX - 2, 0.02, CZ - 12)
  group.rotation.y = 0.3

  const squareColors = [0xff6666, 0x6666ff, 0x66ff66, 0xffff66, 0xff66ff, 0x66ffff, 0xffaa66, 0xaa66ff]
  const layout = [
    [0, 0],           // 1
    [-0.35, 0.6],     // 2 (left)
    [0.35, 0.6],      // 3 (right)
    [0, 1.2],         // 4
    [-0.35, 1.8],     // 5 (left)
    [0.35, 1.8],      // 6 (right)
    [0, 2.4],         // 7
    [0, 3.0],         // 8
  ]

  layout.forEach(([hx, hz], i) => {
    const sqGeo = new THREE.PlaneGeometry(0.55, 0.55)
    const sq = new THREE.Mesh(sqGeo, mat(squareColors[i], { transparent: true, opacity: 0.8 }))
    sq.rotation.x = -Math.PI / 2
    sq.position.set(hx, 0, hz)
    sq.receiveShadow = true
    group.add(sq)

    // Border
    const borderGeo = new THREE.PlaneGeometry(0.6, 0.6)
    const border = new THREE.Mesh(borderGeo, mat(0xffffff, { transparent: true, opacity: 0.5 }))
    border.rotation.x = -Math.PI / 2
    border.position.set(hx, -0.001, hz)
    border.receiveShadow = true
    group.add(border)
  })

  scene.add(group)
}

// ── Pinwheel (ANIMATED) ──────────────────────────────────────────────────

function createPinwheel(scene) {
  const group = new THREE.Group()
  group.position.set(CX - 6, 0, CZ - 4)

  // Stick
  const stickGeo = new THREE.CylinderGeometry(0.02, 0.03, 1.2, 6)
  const stick = shadow(new THREE.Mesh(stickGeo, mat(0x886633)))
  stick.position.y = 0.6
  group.add(stick)

  // Spinning part
  const spinGroup = new THREE.Group()
  spinGroup.position.y = 1.2

  const bladeColors = [0xff2222, 0x2222ff, 0xffff22, 0x22ff22]
  for (let i = 0; i < 4; i++) {
    const angle = (i / 4) * Math.PI * 2
    const bladeGeo = new THREE.BufferGeometry()
    const verts = new Float32Array([
      0, 0, 0,
      Math.cos(angle) * 0.3, Math.sin(angle) * 0.3, 0.05,
      Math.cos(angle + 0.5) * 0.25, Math.sin(angle + 0.5) * 0.25, 0,
    ])
    bladeGeo.setAttribute('position', new THREE.BufferAttribute(verts, 3))
    bladeGeo.computeVertexNormals()
    const blade = new THREE.Mesh(bladeGeo, mat(bladeColors[i], { side: THREE.DoubleSide }))
    blade.castShadow = true
    spinGroup.add(blade)
  }

  // Center pin
  const pinGeo = new THREE.SphereGeometry(0.03, 4, 4)
  const pin = shadow(new THREE.Mesh(pinGeo, mat(0xdddddd)))
  spinGroup.add(pin)

  group.add(spinGroup)
  scene.add(group)

  return spinGroup
}

// ── Dynamic Playground Balls ──────────────────────────────────────────────

function createPlaygroundBalls(scene, RAPIER, world, syncList) {
  const ballColors = [0xff2222, 0x2222ff, 0xffff22, 0x22cc22]
  const radius = 0.3

  const positions = [
    [CX - 4, radius + 0.1, CZ + 2],
    [CX + 3, radius + 0.1, CZ + 3],
    [CX - 1, radius + 0.1, CZ - 2],
    [CX + 6, radius + 0.1, CZ + 1],
  ]

  positions.forEach(([bx, by, bz], i) => {
    const geo = new THREE.SphereGeometry(radius, 8, 8)
    const ball = shadow(new THREE.Mesh(geo, mat(ballColors[i])))
    ball.position.set(bx, by, bz)
    scene.add(ball)

    const rbDesc = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(bx, by, bz)
      .setLinearDamping(0.3)
      .setAngularDamping(0.3)
    const rb = world.createRigidBody(rbDesc)
    const colDesc = RAPIER.ColliderDesc.ball(radius)
      .setDensity(1.5)
      .setFriction(0.4)
      .setRestitution(0.75)
    world.createCollider(colDesc, rb)

    syncList.push({ mesh: ball, body: rb })
  })
}

// ── Dynamic Wooden Blocks ─────────────────────────────────────────────────

function createWoodenBlocks(scene, RAPIER, world, syncList) {
  const blockColors = [0xdd8833, 0xcc6622, 0xbb7744]
  const size = 0.4

  const positions = [
    [CX + 9, size / 2 + 0.05, CZ - 7],
    [CX + 9.5, size / 2 + 0.05, CZ - 6.5],
    [CX + 9.25, size + size / 2 + 0.05, CZ - 6.75],
  ]

  positions.forEach(([bx, by, bz], i) => {
    const geo = new THREE.BoxGeometry(size, size, size)
    const block = shadow(new THREE.Mesh(geo, mat(blockColors[i])))
    block.position.set(bx, by, bz)
    scene.add(block)

    const rbDesc = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(bx, by, bz)
      .setLinearDamping(0.4)
      .setAngularDamping(0.5)
    const rb = world.createRigidBody(rbDesc)
    const half = size / 2
    const colDesc = RAPIER.ColliderDesc.cuboid(half, half, half)
      .setDensity(3.0)
      .setFriction(0.5)
      .setRestitution(0.15)
    world.createCollider(colDesc, rb)

    syncList.push({ mesh: block, body: rb })
  })
}

// ── Dynamic Toy Cars ──────────────────────────────────────────────────────

function createToyCars(scene, RAPIER, world, syncList) {
  const carData = [
    { x: CX - 7, z: CZ - 10, color: 0xff4444, ry: 0.5 },
    { x: CX + 3, z: CZ - 10, color: 0x4444ff, ry: -0.3 },
  ]

  carData.forEach((cd) => {
    const carGroup = new THREE.Group()
    const y = 0.15

    // Body
    const bodyGeo = new THREE.BoxGeometry(0.5, 0.2, 0.3)
    const body = shadow(new THREE.Mesh(bodyGeo, mat(cd.color)))
    carGroup.add(body)

    // Cabin
    const cabinGeo = new THREE.BoxGeometry(0.25, 0.12, 0.25)
    const cabin = shadow(new THREE.Mesh(cabinGeo, mat(cd.color)))
    cabin.position.set(-0.02, 0.16, 0)
    carGroup.add(cabin)

    // Wheels (4)
    const wheelGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.04, 6)
    const wheelMat = mat(0x222222)
    const wheelPos = [
      [0.18, -0.08, 0.17], [0.18, -0.08, -0.17],
      [-0.18, -0.08, 0.17], [-0.18, -0.08, -0.17],
    ]
    for (const [wx, wy, wz] of wheelPos) {
      const wheel = shadow(new THREE.Mesh(wheelGeo, wheelMat))
      wheel.position.set(wx, wy, wz)
      wheel.rotation.x = Math.PI / 2
      carGroup.add(wheel)
    }

    // Windshield
    const windGeo = new THREE.BoxGeometry(0.02, 0.1, 0.2)
    const wind = new THREE.Mesh(windGeo, mat(0x88bbdd, { transparent: true, opacity: 0.5 }))
    wind.position.set(0.12, 0.16, 0)
    carGroup.add(wind)

    carGroup.position.set(cd.x, y, cd.z)
    carGroup.rotation.y = cd.ry
    scene.add(carGroup)

    // Dynamic body
    const rbDesc = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(cd.x, y, cd.z)
      .setLinearDamping(0.5)
      .setAngularDamping(0.5)
    const rb = world.createRigidBody(rbDesc)
    const colDesc = RAPIER.ColliderDesc.cuboid(0.25, 0.15, 0.15)
      .setDensity(2.5)
      .setFriction(0.5)
      .setRestitution(0.2)
    world.createCollider(colDesc, rb)

    syncList.push({ mesh: carGroup, body: rb })
  })
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════════════════════

export function createPlayground(scene, RAPIER, world) {
  const syncList = []

  // Ground
  createGround(scene)

  // ── Animated structures ──
  const swings = createSwingSet(scene, RAPIER, world)
  const seesawPlank = createSeesaw(scene)
  const merryGoRound = createMerryGoRound(scene)
  const pinwheel = createPinwheel(scene)
  const fountainParticles = createFountain(scene, RAPIER, world)

  // ── Static structures ──
  createSlide(scene, RAPIER, world)
  createSandbox(scene)
  createGazebo(scene, RAPIER, world)

  // ── Furniture ──
  createBenches(scene)
  createLampPosts(scene)
  createTrashCans(scene)
  createPicnicTables(scene)
  createDrinkingFountain(scene)

  // ── Garden / nature ──
  createGarden(scene)

  // ── Props ──
  createKite(scene)
  createHopscotch(scene)

  // ── Dynamic interactive objects ──
  createPlaygroundBalls(scene, RAPIER, world, syncList)
  createWoodenBlocks(scene, RAPIER, world, syncList)
  createToyCars(scene, RAPIER, world, syncList)

  // Animation state
  let time = 0

  return {
    syncList,
    update(dt) {
      time += dt

      // ── Swing pendulum (offset phases) ──
      swings.forEach((swingPivot, i) => {
        const phase = i * Math.PI * 0.6
        swingPivot.rotation.z = Math.sin(time * 2.0 + phase) * 0.45
      })

      // ── Seesaw tilt ──
      seesawPlank.rotation.z = Math.sin(time * 1.5) * 0.25

      // ── Merry-go-round spin ──
      merryGoRound.rotation.y += dt * 0.8

      // ── Pinwheel spin ──
      pinwheel.rotation.z += dt * 4.0

      // ── Fountain water particles ──
      for (let i = 0; i < fountainParticles.length; i++) {
        const p = fountainParticles[i]
        const ud = p.userData
        const t = (time * ud.speed + ud.phase) % (Math.PI * 2)

        // Parabolic arc upward from spout then fall outward
        const progress = t / (Math.PI * 2)
        const h = Math.sin(progress * Math.PI) * ud.maxH
        const r = ud.radius + progress * 0.8

        p.position.set(
          Math.cos(ud.angle + time * 0.3) * r,
          2.3 + h,
          Math.sin(ud.angle + time * 0.3) * r
        )

        // Fade out as they fall
        p.scale.setScalar(0.6 + Math.sin(progress * Math.PI) * 0.5)
      }
    },
  }
}
