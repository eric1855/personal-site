/**
 * Construction Site Zone — an active construction zone SW of the main city.
 * Center: x=-45, z=30, radius ~18.
 *
 * Tons of dynamic objects (cones, beams, hard hats, bricks, barrels)
 * so the car can crash through and scatter everything.
 * The tower crane jib slowly rotates via update().
 */
import * as THREE from 'three'

// ── Zone center ──────────────────────────────────────────────────────────
const CX = -45
const CZ = 30

// ── Reusable materials ──────────────────────────────────────────────────
const MAT = {
  yellow:      new THREE.MeshStandardMaterial({ color: '#f9a825', flatShading: true }),
  brightYellow:new THREE.MeshStandardMaterial({ color: '#FFC107', flatShading: true }),
  orange:      new THREE.MeshStandardMaterial({ color: '#FF6F00', flatShading: true }),
  white:       new THREE.MeshStandardMaterial({ color: '#FFFFFF', flatShading: true }),
  steel:       new THREE.MeshStandardMaterial({ color: '#78909C', flatShading: true }),
  concrete:    new THREE.MeshStandardMaterial({ color: '#9E9E9E', flatShading: true }),
  darkGray:    new THREE.MeshStandardMaterial({ color: '#424242', flatShading: true }),
  brown:       new THREE.MeshStandardMaterial({ color: '#8B7355', flatShading: true }),
  darkBrown:   new THREE.MeshStandardMaterial({ color: '#5D4E37', flatShading: true }),
  red:         new THREE.MeshStandardMaterial({ color: '#c0392b', flatShading: true }),
  blue:        new THREE.MeshStandardMaterial({ color: '#1565C0', flatShading: true }),
  sand:        new THREE.MeshStandardMaterial({ color: '#C2B280', flatShading: true }),
  black:       new THREE.MeshStandardMaterial({ color: '#212121', flatShading: true }),
  rust:        new THREE.MeshStandardMaterial({ color: '#8B4513', flatShading: true }),
  puddle:      new THREE.MeshStandardMaterial({ color: '#1a237e', flatShading: true, transparent: true, opacity: 0.35, side: THREE.DoubleSide }),
  fence:       new THREE.MeshStandardMaterial({ color: '#B0BEC5', flatShading: true, transparent: true, opacity: 0.4, side: THREE.DoubleSide }),
  yellowBlack: new THREE.MeshStandardMaterial({ color: '#FFD600', flatShading: true, side: THREE.DoubleSide }),
  greenDark:   new THREE.MeshStandardMaterial({ color: '#2E7D32', flatShading: true }),
}

export function createConstructionSite(scene, RAPIER, world) {
  const syncList = []
  const group = new THREE.Group()
  let craneJib = null

  // ────────────────────────────────────────────────────────────────────────
  //  GROUND — dirt patch
  // ────────────────────────────────────────────────────────────────────────
  _createGround(group)

  // ────────────────────────────────────────────────────────────────────────
  //  TOWER CRANE (animated)
  // ────────────────────────────────────────────────────────────────────────
  craneJib = _createTowerCrane(group, RAPIER, world)

  // ────────────────────────────────────────────────────────────────────────
  //  SCAFFOLDING (2 structures)
  // ────────────────────────────────────────────────────────────────────────
  _createScaffolding(group, RAPIER, world, CX - 10, CZ - 8)
  _createScaffolding(group, RAPIER, world, CX + 8, CZ + 12)

  // ────────────────────────────────────────────────────────────────────────
  //  CONSTRUCTION VEHICLES (parked, fixed)
  // ────────────────────────────────────────────────────────────────────────
  _createExcavator(group, RAPIER, world)
  _createDumpTruck(group, RAPIER, world)
  _createConcreteMixer(group, RAPIER, world)

  // ────────────────────────────────────────────────────────────────────────
  //  BARRIERS & SAFETY
  // ────────────────────────────────────────────────────────────────────────
  _createBarriers(group, RAPIER, world, syncList)
  _createTrafficCones(group, RAPIER, world, syncList)
  _createBarrierTape(group, RAPIER, world)
  _createSigns(group, RAPIER, world)
  _createWarningSigns(group)

  // ────────────────────────────────────────────────────────────────────────
  //  CONSTRUCTION PROPS
  // ────────────────────────────────────────────────────────────────────────
  _createSteelBeams(group, RAPIER, world, syncList)
  _createConcretePipes(group, RAPIER, world)
  _createSandPile(group)
  _createBrickStack(group, RAPIER, world, syncList)
  _createPortaPotty(group, RAPIER, world)
  _createGenerator(group, RAPIER, world)
  _createToolChest(group, RAPIER, world)
  _createHardHats(group, RAPIER, world, syncList)
  _createWoodenPallets(group, RAPIER, world)
  _createCementBags(group, RAPIER, world)
  _createWheelbarrow(group, RAPIER, world)
  _createBarrels(group, RAPIER, world, syncList)

  // ────────────────────────────────────────────────────────────────────────
  //  FENCING
  // ────────────────────────────────────────────────────────────────────────
  _createFencing(group, RAPIER, world)

  scene.add(group)

  return {
    syncList,
    update(dt) {
      if (craneJib) craneJib.rotation.y += dt * 0.15
    },
  }
}

// ══════════════════════════════════════════════════════════════════════════
//  GROUND
// ══════════════════════════════════════════════════════════════════════════

function _createGround(group) {
  // Dirt ground patch
  const dirt = new THREE.Mesh(
    new THREE.CircleGeometry(20, 8),
    MAT.brown
  )
  dirt.rotation.x = -Math.PI / 2
  dirt.position.set(CX, 0.015, CZ)
  dirt.receiveShadow = true
  group.add(dirt)

  // Tire tracks — a few dark brown arcs on the ground
  const trackGeo = new THREE.PlaneGeometry(0.3, 12, 1, 1)
  const tracks = [
    { x: CX - 4, z: CZ + 2, rot: 0.3 },
    { x: CX + 3, z: CZ - 3, rot: -0.2 },
    { x: CX - 1, z: CZ + 6, rot: 0.8 },
    { x: CX + 5, z: CZ + 1, rot: -0.5 },
  ]
  tracks.forEach(t => {
    const m = new THREE.Mesh(trackGeo, MAT.darkBrown)
    m.rotation.x = -Math.PI / 2
    m.rotation.z = t.rot
    m.position.set(t.x, 0.018, t.z)
    m.receiveShadow = true
    group.add(m)
  })

  // Puddles
  const puddleGeo = new THREE.CircleGeometry(1.2, 6)
  const puddles = [
    { x: CX + 6, z: CZ - 4, s: 1.0 },
    { x: CX - 7, z: CZ + 5, s: 0.7 },
    { x: CX + 2, z: CZ + 9, s: 0.85 },
  ]
  puddles.forEach(p => {
    const m = new THREE.Mesh(puddleGeo, MAT.puddle)
    m.rotation.x = -Math.PI / 2
    m.position.set(p.x, 0.02, p.z)
    m.scale.setScalar(p.s)
    group.add(m)
  })
}

// ══════════════════════════════════════════════════════════════════════════
//  TOWER CRANE
// ══════════════════════════════════════════════════════════════════════════

function _createTowerCrane(group, RAPIER, world) {
  const bx = CX
  const bz = CZ

  // ── Concrete base pad ──
  const basePad = new THREE.Mesh(
    new THREE.BoxGeometry(4, 0.4, 4),
    MAT.concrete
  )
  basePad.position.set(bx, 0.2, bz)
  basePad.castShadow = true
  basePad.receiveShadow = true
  group.add(basePad)

  // ── Vertical mast ──
  const mastH = 12
  const mast = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, mastH, 0.8),
    MAT.yellow
  )
  mast.position.set(bx, mastH / 2 + 0.4, bz)
  mast.castShadow = true
  group.add(mast)

  // Mast lattice detail — cross braces
  for (let i = 0; i < 5; i++) {
    const braceH = 1.8 + i * 2.2
    const brace = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, 0.06, 1.0),
      MAT.yellow
    )
    brace.position.set(bx, braceH, bz)
    brace.rotation.y = (i % 2) * Math.PI / 2
    group.add(brace)
  }

  // Fixed collider on the mast
  const mastBodyDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(bx, mastH / 2 + 0.4, bz)
  const mastBody = world.createRigidBody(mastBodyDesc)
  world.createCollider(
    RAPIER.ColliderDesc.cuboid(0.4, mastH / 2, 0.4).setFriction(0.5),
    mastBody
  )

  // ── Rotating jib group (attached at top of mast) ──
  const jibGroup = new THREE.Group()
  jibGroup.position.set(bx, mastH + 0.4, bz)

  // Operator cab at the junction
  const cab = new THREE.Mesh(
    new THREE.BoxGeometry(1.2, 1.0, 1.2),
    MAT.brightYellow
  )
  cab.position.set(0, -0.3, 0)
  cab.castShadow = true
  jibGroup.add(cab)

  // Cab window
  const cabWindow = new THREE.Mesh(
    new THREE.BoxGeometry(1.22, 0.4, 0.5),
    MAT.blue
  )
  cabWindow.position.set(0, 0.0, 0.4)
  jibGroup.add(cabWindow)

  // Main jib (boom arm) — extends forward
  const jibLen = 14
  const jib = new THREE.Mesh(
    new THREE.BoxGeometry(0.4, 0.5, jibLen),
    MAT.yellow
  )
  jib.position.set(0, 0.5, jibLen / 2 + 0.6)
  jib.castShadow = true
  jibGroup.add(jib)

  // Jib lattice diagonals
  for (let i = 0; i < 6; i++) {
    const d = new THREE.Mesh(
      new THREE.BoxGeometry(0.05, 0.05, 2.0),
      MAT.yellow
    )
    d.position.set(0, 0.5, 2.0 + i * 2.1)
    d.rotation.x = ((i % 2) === 0 ? 1 : -1) * 0.5
    jibGroup.add(d)
  }

  // Jib tip — small triangle
  const jibTip = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.3, 0.3),
    MAT.red
  )
  jibTip.position.set(0, 0.5, jibLen + 0.6)
  jibGroup.add(jibTip)

  // Counter-jib (rear) — shorter, with counterweight
  const counterLen = 5
  const counterJib = new THREE.Mesh(
    new THREE.BoxGeometry(0.4, 0.5, counterLen),
    MAT.yellow
  )
  counterJib.position.set(0, 0.5, -(counterLen / 2 + 0.6))
  counterJib.castShadow = true
  jibGroup.add(counterJib)

  // Counterweight blocks
  for (let i = 0; i < 3; i++) {
    const cw = new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 0.6, 0.8),
      MAT.concrete
    )
    cw.position.set(0, 0.0, -(counterLen + 0.2 - i * 0.9))
    cw.castShadow = true
    jibGroup.add(cw)
  }

  // Hoist cable — thin line hanging from jib tip
  const cable = new THREE.Mesh(
    new THREE.BoxGeometry(0.04, 4, 0.04),
    MAT.darkGray
  )
  cable.position.set(0, -1.5, jibLen + 0.2)
  jibGroup.add(cable)

  // Hook at bottom of cable
  const hook = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.3, 0.3),
    MAT.steel
  )
  hook.position.set(0, -3.5, jibLen + 0.2)
  hook.castShadow = true
  jibGroup.add(hook)

  group.add(jibGroup)

  return jibGroup
}

// ══════════════════════════════════════════════════════════════════════════
//  SCAFFOLDING
// ══════════════════════════════════════════════════════════════════════════

function _createScaffolding(group, RAPIER, world, sx, sz) {
  const scaffGroup = new THREE.Group()
  scaffGroup.position.set(sx, 0, sz)

  const poleGeo = new THREE.CylinderGeometry(0.06, 0.06, 6, 5)
  const plankGeo = new THREE.BoxGeometry(3, 0.08, 1.2)
  const crossGeo = new THREE.BoxGeometry(0.05, 0.05, 3.6)

  // 4 vertical poles
  const polePositions = [[-1.4, 0, -0.5], [1.4, 0, -0.5], [-1.4, 0, 0.5], [1.4, 0, 0.5]]
  polePositions.forEach(([px, , pz]) => {
    const pole = new THREE.Mesh(poleGeo, MAT.steel)
    pole.position.set(px, 3, pz)
    pole.castShadow = true
    scaffGroup.add(pole)
  })

  // 3 horizontal platforms
  for (let level = 0; level < 3; level++) {
    const y = 1.5 + level * 2
    const plank = new THREE.Mesh(plankGeo, MAT.rust)
    plank.position.set(0, y, 0)
    plank.castShadow = true
    scaffGroup.add(plank)
  }

  // Cross-bracing on each side
  for (let level = 0; level < 2; level++) {
    const y = 2.5 + level * 2
    const cross = new THREE.Mesh(crossGeo, MAT.steel)
    cross.position.set(0, y, -0.5)
    cross.rotation.y = 0.4
    cross.rotation.z = 0.5
    scaffGroup.add(cross)

    const cross2 = new THREE.Mesh(crossGeo, MAT.steel)
    cross2.position.set(0, y, 0.5)
    cross2.rotation.y = -0.4
    cross2.rotation.z = -0.5
    scaffGroup.add(cross2)
  }

  group.add(scaffGroup)

  // Fixed collider for scaffolding
  const bodyDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(sx, 3, sz)
  const body = world.createRigidBody(bodyDesc)
  world.createCollider(
    RAPIER.ColliderDesc.cuboid(1.5, 3, 0.7).setFriction(0.5),
    body
  )
}

// ══════════════════════════════════════════════════════════════════════════
//  CONSTRUCTION VEHICLES
// ══════════════════════════════════════════════════════════════════════════

function _createExcavator(group, RAPIER, world) {
  const ex = CX + 12
  const ez = CZ - 5
  const vGroup = new THREE.Group()
  vGroup.position.set(ex, 0, ez)
  vGroup.rotation.y = -0.6

  // Track base
  const trackBase = new THREE.Mesh(
    new THREE.BoxGeometry(2.2, 0.5, 3.0),
    MAT.darkGray
  )
  trackBase.position.set(0, 0.25, 0)
  trackBase.castShadow = true
  vGroup.add(trackBase)

  // Tracks (two sides)
  const trackGeo = new THREE.BoxGeometry(0.3, 0.6, 3.2)
  ;[-1.0, 1.0].forEach(side => {
    const t = new THREE.Mesh(trackGeo, MAT.black)
    t.position.set(side, 0.3, 0)
    t.castShadow = true
    vGroup.add(t)
  })

  // Cab (upper body, rotated on turntable)
  const cab = new THREE.Mesh(
    new THREE.BoxGeometry(1.6, 1.2, 1.8),
    MAT.brightYellow
  )
  cab.position.set(0, 1.1, -0.3)
  cab.castShadow = true
  vGroup.add(cab)

  // Cab window
  const window = new THREE.Mesh(
    new THREE.BoxGeometry(1.62, 0.5, 0.15),
    MAT.blue
  )
  window.position.set(0, 1.4, 0.6)
  vGroup.add(window)

  // Boom arm
  const boom = new THREE.Mesh(
    new THREE.BoxGeometry(0.25, 0.3, 3.0),
    MAT.yellow
  )
  boom.position.set(0, 1.5, 2.0)
  boom.rotation.x = -0.3
  boom.castShadow = true
  vGroup.add(boom)

  // Stick (second arm section)
  const stick = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 0.25, 2.2),
    MAT.yellow
  )
  stick.position.set(0, 0.8, 3.8)
  stick.rotation.x = 0.6
  stick.castShadow = true
  vGroup.add(stick)

  // Bucket
  const bucket = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 0.5, 0.6),
    MAT.steel
  )
  bucket.position.set(0, 0.0, 4.3)
  bucket.castShadow = true
  vGroup.add(bucket)

  // Hydraulic cylinders (decorative)
  const cylGeo = new THREE.CylinderGeometry(0.05, 0.05, 1.5, 5)
  const cyl = new THREE.Mesh(cylGeo, MAT.steel)
  cyl.position.set(0.3, 1.3, 1.2)
  cyl.rotation.z = 0.3
  vGroup.add(cyl)

  group.add(vGroup)

  // Fixed collider
  const bodyDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(ex, 0.8, ez)
  const body = world.createRigidBody(bodyDesc)
  world.createCollider(
    RAPIER.ColliderDesc.cuboid(1.2, 0.8, 2.0).setFriction(0.5),
    body
  )
}

function _createDumpTruck(group, RAPIER, world) {
  const tx = CX - 12
  const tz = CZ + 6
  const vGroup = new THREE.Group()
  vGroup.position.set(tx, 0, tz)
  vGroup.rotation.y = 1.2

  // Cab
  const cab = new THREE.Mesh(
    new THREE.BoxGeometry(2.0, 1.6, 1.8),
    MAT.brightYellow
  )
  cab.position.set(0, 1.2, -1.8)
  cab.castShadow = true
  vGroup.add(cab)

  // Cab windshield
  const windshield = new THREE.Mesh(
    new THREE.BoxGeometry(1.8, 0.6, 0.1),
    MAT.blue
  )
  windshield.position.set(0, 1.6, -1.0)
  vGroup.add(windshield)

  // Dump bed (angled slightly as if dumping)
  const bed = new THREE.Mesh(
    new THREE.BoxGeometry(2.0, 0.15, 3.2),
    MAT.steel
  )
  bed.position.set(0, 1.0, 0.7)
  bed.rotation.x = -0.1
  bed.castShadow = true
  vGroup.add(bed)

  // Bed sides
  const sideGeo = new THREE.BoxGeometry(0.1, 0.8, 3.2)
  ;[-0.95, 0.95].forEach(side => {
    const s = new THREE.Mesh(sideGeo, MAT.steel)
    s.position.set(side, 1.4, 0.7)
    s.rotation.x = -0.1
    s.castShadow = true
    vGroup.add(s)
  })

  // Back wall of bed
  const backWall = new THREE.Mesh(
    new THREE.BoxGeometry(2.0, 0.8, 0.1),
    MAT.steel
  )
  backWall.position.set(0, 1.35, 2.3)
  vGroup.add(backWall)

  // Wheels (6 total: 2 front, 4 rear)
  const wheelGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 8)
  const wheelPositions = [
    [-1.1, 0.4, -1.5], [1.1, 0.4, -1.5],  // front
    [-1.1, 0.4, 0.6], [1.1, 0.4, 0.6],    // rear 1
    [-1.1, 0.4, 1.4], [1.1, 0.4, 1.4],    // rear 2
  ]
  wheelPositions.forEach(([wx, wy, wz]) => {
    const w = new THREE.Mesh(wheelGeo, MAT.black)
    w.position.set(wx, wy, wz)
    w.rotation.z = Math.PI / 2
    w.castShadow = true
    vGroup.add(w)
  })

  group.add(vGroup)

  // Fixed collider
  const bodyDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(tx, 1.0, tz)
  const body = world.createRigidBody(bodyDesc)
  world.createCollider(
    RAPIER.ColliderDesc.cuboid(1.1, 1.0, 2.5).setFriction(0.5),
    body
  )
}

function _createConcreteMixer(group, RAPIER, world) {
  const mx = CX + 8
  const mz = CZ + 10
  const vGroup = new THREE.Group()
  vGroup.position.set(mx, 0, mz)
  vGroup.rotation.y = 2.3

  // Cab
  const cab = new THREE.Mesh(
    new THREE.BoxGeometry(1.8, 1.5, 1.6),
    MAT.red
  )
  cab.position.set(0, 1.15, -1.8)
  cab.castShadow = true
  vGroup.add(cab)

  // Cab windshield
  const wind = new THREE.Mesh(
    new THREE.BoxGeometry(1.6, 0.5, 0.1),
    MAT.blue
  )
  wind.position.set(0, 1.5, -1.0)
  vGroup.add(wind)

  // Mixer drum (cylinder)
  const drum = new THREE.Mesh(
    new THREE.CylinderGeometry(0.9, 1.1, 3.0, 8),
    MAT.concrete
  )
  drum.position.set(0, 1.8, 0.5)
  drum.rotation.x = Math.PI / 2
  drum.rotation.z = 0.15
  drum.castShadow = true
  vGroup.add(drum)

  // Helical stripe on drum (decorative rings)
  for (let i = 0; i < 3; i++) {
    const stripe = new THREE.Mesh(
      new THREE.TorusGeometry(1.0, 0.06, 4, 8),
      MAT.yellow
    )
    stripe.position.set(0, 1.8, -0.3 + i * 0.8)
    stripe.rotation.x = Math.PI / 2 + i * 0.3
    vGroup.add(stripe)
  }

  // Drum mouth
  const mouth = new THREE.Mesh(
    new THREE.CylinderGeometry(0.5, 0.5, 0.3, 6),
    MAT.darkGray
  )
  mouth.position.set(0, 1.8, 2.1)
  mouth.rotation.x = Math.PI / 2
  vGroup.add(mouth)

  // Chassis under drum
  const chassis = new THREE.Mesh(
    new THREE.BoxGeometry(1.6, 0.4, 4.5),
    MAT.darkGray
  )
  chassis.position.set(0, 0.5, -0.2)
  vGroup.add(chassis)

  // Wheels
  const wheelGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 8)
  const wheelPos = [
    [-0.95, 0.4, -1.5], [0.95, 0.4, -1.5],
    [-0.95, 0.4, 0.8], [0.95, 0.4, 0.8],
    [-0.95, 0.4, 1.6], [0.95, 0.4, 1.6],
  ]
  wheelPos.forEach(([wx, wy, wz]) => {
    const w = new THREE.Mesh(wheelGeo, MAT.black)
    w.position.set(wx, wy, wz)
    w.rotation.z = Math.PI / 2
    w.castShadow = true
    vGroup.add(w)
  })

  group.add(vGroup)

  // Fixed collider
  const bodyDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(mx, 1.0, mz)
  const body = world.createRigidBody(bodyDesc)
  world.createCollider(
    RAPIER.ColliderDesc.cuboid(1.0, 1.2, 2.5).setFriction(0.5),
    body
  )
}

// ══════════════════════════════════════════════════════════════════════════
//  BARRIERS (mix of fixed & dynamic)
// ══════════════════════════════════════════════════════════════════════════

function _createBarriers(group, RAPIER, world, syncList) {
  const barGeo = new THREE.BoxGeometry(1.6, 0.15, 0.15)
  const legGeo = new THREE.BoxGeometry(0.1, 0.7, 0.4)

  // 8 barriers — mix of fixed & dynamic
  const positions = [
    { x: CX - 6, z: CZ - 12, r: 0.2, dynamic: false },
    { x: CX - 3, z: CZ - 12, r: 0.1, dynamic: false },
    { x: CX + 0, z: CZ - 12, r: -0.1, dynamic: true },
    { x: CX + 3, z: CZ - 12, r: 0.0, dynamic: true },
    { x: CX + 14, z: CZ - 4, r: 1.5, dynamic: false },
    { x: CX + 14, z: CZ + 0, r: 1.5, dynamic: false },
    { x: CX + 14, z: CZ + 4, r: 1.5, dynamic: true },
    { x: CX - 8, z: CZ + 14, r: 0.3, dynamic: true },
  ]

  positions.forEach(p => {
    const barrierGroup = new THREE.Group()

    // Striped bar
    const bar = new THREE.Mesh(barGeo, MAT.orange)
    bar.position.set(0, 0.7, 0)
    bar.castShadow = true
    barrierGroup.add(bar)

    // White stripe on bar
    const stripe = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 0.16, 0.16),
      MAT.white
    )
    stripe.position.set(0.4, 0.7, 0)
    barrierGroup.add(stripe)
    const stripe2 = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 0.16, 0.16),
      MAT.white
    )
    stripe2.position.set(-0.4, 0.7, 0)
    barrierGroup.add(stripe2)

    // Legs
    const legL = new THREE.Mesh(legGeo, MAT.orange)
    legL.position.set(-0.6, 0.35, 0)
    legL.castShadow = true
    barrierGroup.add(legL)

    const legR = new THREE.Mesh(legGeo, MAT.orange)
    legR.position.set(0.6, 0.35, 0)
    legR.castShadow = true
    barrierGroup.add(legR)

    barrierGroup.rotation.y = p.r
    barrierGroup.position.set(p.x, 0, p.z)
    group.add(barrierGroup)

    if (p.dynamic) {
      const bodyDesc = RAPIER.RigidBodyDesc.dynamic()
        .setTranslation(p.x, 0.45, p.z)
        .setLinearDamping(0.3)
        .setAngularDamping(0.4)
      const body = world.createRigidBody(bodyDesc)
      world.createCollider(
        RAPIER.ColliderDesc.cuboid(0.8, 0.45, 0.25)
          .setDensity(3.0)
          .setFriction(0.4)
          .setRestitution(0.1),
        body
      )
      syncList.push({ mesh: barrierGroup, body })
    } else {
      const bodyDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(p.x, 0.45, p.z)
      const body = world.createRigidBody(bodyDesc)
      world.createCollider(
        RAPIER.ColliderDesc.cuboid(0.8, 0.45, 0.25).setFriction(0.5),
        body
      )
    }
  })
}

// ══════════════════════════════════════════════════════════════════════════
//  TRAFFIC CONES (all dynamic, lightweight!)
// ══════════════════════════════════════════════════════════════════════════

function _createTrafficCones(group, RAPIER, world, syncList) {
  const coneGeo = new THREE.ConeGeometry(0.15, 0.45, 6)
  const coneBaseGeo = new THREE.BoxGeometry(0.35, 0.05, 0.35)

  // Scatter 15 cones around the site
  const conePositions = [
    [CX - 2, CZ - 8], [CX + 1, CZ - 7], [CX + 4, CZ - 9],
    [CX - 5, CZ - 5], [CX + 7, CZ - 2], [CX - 8, CZ + 2],
    [CX + 10, CZ + 3], [CX - 3, CZ + 8], [CX + 5, CZ + 7],
    [CX - 7, CZ + 10], [CX + 2, CZ + 11], [CX + 9, CZ + 8],
    [CX - 10, CZ - 2], [CX + 6, CZ - 6], [CX - 1, CZ + 4],
  ]

  conePositions.forEach(([cx, cz]) => {
    const coneGroup = new THREE.Group()

    // Cone body
    const cone = new THREE.Mesh(coneGeo, MAT.orange)
    cone.position.set(0, 0.275, 0)
    cone.castShadow = true
    coneGroup.add(cone)

    // White stripe on cone
    const coneStripe = new THREE.Mesh(
      new THREE.ConeGeometry(0.12, 0.1, 6),
      MAT.white
    )
    coneStripe.position.set(0, 0.35, 0)
    coneGroup.add(coneStripe)

    // Base
    const base = new THREE.Mesh(coneBaseGeo, MAT.orange)
    base.position.set(0, 0.025, 0)
    coneGroup.add(base)

    coneGroup.position.set(cx, 0, cz)
    group.add(coneGroup)

    // Dynamic — very lightweight so car scatters them easily
    const bodyDesc = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(cx, 0.25, cz)
      .setLinearDamping(0.1)
      .setAngularDamping(0.1)
    const body = world.createRigidBody(bodyDesc)
    world.createCollider(
      RAPIER.ColliderDesc.cone(0.225, 0.15)
        .setDensity(2.0)
        .setFriction(0.3)
        .setRestitution(0.3),
      body
    )
    syncList.push({ mesh: coneGroup, body })
  })
}

// ══════════════════════════════════════════════════════════════════════════
//  BARRIER TAPE
// ══════════════════════════════════════════════════════════════════════════

function _createBarrierTape(group, RAPIER, world) {
  const tapes = [
    { x1: CX - 14, z1: CZ - 8, x2: CX - 8, z2: CZ - 8 },
    { x1: CX + 8, z1: CZ - 8, x2: CX + 14, z2: CZ - 6 },
    { x1: CX - 14, z1: CZ + 8, x2: CX - 8, z2: CZ + 10 },
    { x1: CX + 10, z1: CZ + 8, x2: CX + 14, z2: CZ + 10 },
  ]

  const poleGeo = new THREE.CylinderGeometry(0.05, 0.05, 1.2, 5)

  tapes.forEach(t => {
    // Two poles
    const pole1 = new THREE.Mesh(poleGeo, MAT.steel)
    pole1.position.set(t.x1, 0.6, t.z1)
    pole1.castShadow = true
    group.add(pole1)

    const pole2 = new THREE.Mesh(poleGeo, MAT.steel)
    pole2.position.set(t.x2, 0.6, t.z2)
    pole2.castShadow = true
    group.add(pole2)

    // Tape between poles
    const dx = t.x2 - t.x1
    const dz = t.z2 - t.z1
    const len = Math.sqrt(dx * dx + dz * dz)
    const angle = Math.atan2(dx, dz)

    const tape = new THREE.Mesh(
      new THREE.PlaneGeometry(len, 0.1),
      MAT.yellowBlack
    )
    tape.position.set(
      (t.x1 + t.x2) / 2,
      0.9,
      (t.z1 + t.z2) / 2
    )
    tape.rotation.y = angle
    group.add(tape)

    // Fixed colliders on poles only
    const pd1 = RAPIER.RigidBodyDesc.fixed().setTranslation(t.x1, 0.6, t.z1)
    const pb1 = world.createRigidBody(pd1)
    world.createCollider(RAPIER.ColliderDesc.cylinder(0.6, 0.06).setFriction(0.5), pb1)

    const pd2 = RAPIER.RigidBodyDesc.fixed().setTranslation(t.x2, 0.6, t.z2)
    const pb2 = world.createRigidBody(pd2)
    world.createCollider(RAPIER.ColliderDesc.cylinder(0.6, 0.06).setFriction(0.5), pb2)
  })
}

// ══════════════════════════════════════════════════════════════════════════
//  SIGNS
// ══════════════════════════════════════════════════════════════════════════

function _createSigns(group, RAPIER, world) {
  // "UNDER CONSTRUCTION" sign
  const sx = CX + 5
  const sz = CZ - 14

  // Two poles
  const poleGeo = new THREE.CylinderGeometry(0.06, 0.06, 2.5, 5)
  const pole1 = new THREE.Mesh(poleGeo, MAT.steel)
  pole1.position.set(sx - 1.2, 1.25, sz)
  pole1.castShadow = true
  group.add(pole1)

  const pole2 = new THREE.Mesh(poleGeo, MAT.steel)
  pole2.position.set(sx + 1.2, 1.25, sz)
  pole2.castShadow = true
  group.add(pole2)

  // Sign board
  const sign = new THREE.Mesh(
    new THREE.BoxGeometry(2.8, 0.8, 0.08),
    MAT.brightYellow
  )
  sign.position.set(sx, 2.2, sz)
  sign.castShadow = true
  group.add(sign)

  // Dark border on sign
  const border = new THREE.Mesh(
    new THREE.BoxGeometry(2.9, 0.9, 0.06),
    MAT.black
  )
  border.position.set(sx, 2.2, sz - 0.02)
  group.add(border)

  // Fixed collider for the sign posts
  const bodyDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(sx, 1.25, sz)
  const body = world.createRigidBody(bodyDesc)
  world.createCollider(
    RAPIER.ColliderDesc.cuboid(1.4, 1.25, 0.1).setFriction(0.5),
    body
  )
}

function _createWarningSigns(group) {
  const warnGeo = new THREE.BufferGeometry()
  // Triangle shape (flat)
  const vertices = new Float32Array([
    0, 0.8, 0,
    -0.5, 0, 0,
    0.5, 0, 0,
  ])
  warnGeo.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
  warnGeo.computeVertexNormals()

  const poleGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.5, 5)

  const signs = [
    { x: CX - 14, z: CZ + 2 },
    { x: CX + 14, z: CZ - 2 },
  ]

  signs.forEach(s => {
    const pole = new THREE.Mesh(poleGeo, MAT.steel)
    pole.position.set(s.x, 0.75, s.z)
    pole.castShadow = true
    group.add(pole)

    const triangle = new THREE.Mesh(warnGeo, MAT.brightYellow)
    triangle.position.set(s.x, 1.5, s.z)
    triangle.castShadow = true
    group.add(triangle)

    // Exclamation mark (small box)
    const excl = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, 0.3, 0.04),
      MAT.black
    )
    excl.position.set(s.x, 1.8, s.z + 0.03)
    group.add(excl)

    const dot = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, 0.06, 0.04),
      MAT.black
    )
    dot.position.set(s.x, 1.58, s.z + 0.03)
    group.add(dot)
  })
}

// ══════════════════════════════════════════════════════════════════════════
//  STEEL BEAMS (dynamic, pushable)
// ══════════════════════════════════════════════════════════════════════════

function _createSteelBeams(group, RAPIER, world, syncList) {
  const beamGeo = new THREE.BoxGeometry(0.2, 0.2, 4.0)
  const beamPositions = [
    { x: CX + 3, z: CZ + 3, y: 0.1, r: 0.1 },
    { x: CX + 3.1, z: CZ + 3.3, y: 0.3, r: -0.05 },
    { x: CX + 2.9, z: CZ + 3.1, y: 0.5, r: 0.15 },
    { x: CX + 3.2, z: CZ + 2.8, y: 0.7, r: -0.1 },
  ]

  beamPositions.forEach(b => {
    const mesh = new THREE.Mesh(beamGeo, MAT.steel)
    mesh.position.set(b.x, b.y, b.z)
    mesh.rotation.y = b.r
    mesh.castShadow = true
    group.add(mesh)

    const bodyDesc = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(b.x, b.y + 0.1, b.z)
      .setLinearDamping(0.3)
      .setAngularDamping(0.3)
    const body = world.createRigidBody(bodyDesc)
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(0.1, 0.1, 2.0)
        .setDensity(8.0)
        .setFriction(0.5)
        .setRestitution(0.1),
      body
    )
    syncList.push({ mesh, body })
  })
}

// ══════════════════════════════════════════════════════════════════════════
//  CONCRETE PIPES
// ══════════════════════════════════════════════════════════════════════════

function _createConcretePipes(group, RAPIER, world) {
  const pipeGeo = new THREE.CylinderGeometry(0.6, 0.6, 2.5, 8)
  const innerGeo = new THREE.CylinderGeometry(0.45, 0.45, 2.55, 8)
  const innerMat = new THREE.MeshStandardMaterial({ color: '#616161', flatShading: true })

  const pipes = [
    { x: CX - 6, z: CZ + 3, y: 0.6, ry: 0 },
    { x: CX - 6, z: CZ + 3.9, y: 0.6, ry: 0.1 },
    { x: CX - 6, z: CZ + 3.5, y: 1.7, ry: -0.05 },
  ]

  pipes.forEach(p => {
    const pipeGroup = new THREE.Group()

    const pipe = new THREE.Mesh(pipeGeo, MAT.concrete)
    pipe.rotation.z = Math.PI / 2
    pipe.castShadow = true
    pipeGroup.add(pipe)

    // Inner hole
    const inner = new THREE.Mesh(innerGeo, innerMat)
    inner.rotation.z = Math.PI / 2
    pipeGroup.add(inner)

    pipeGroup.position.set(p.x, p.y, p.z)
    pipeGroup.rotation.y = p.ry
    group.add(pipeGroup)
  })

  // Fixed collider for the pipe stack
  const bodyDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(CX - 6, 0.8, CZ + 3.5)
  const body = world.createRigidBody(bodyDesc)
  world.createCollider(
    RAPIER.ColliderDesc.cuboid(1.3, 1.2, 1.0).setFriction(0.5),
    body
  )
}

// ══════════════════════════════════════════════════════════════════════════
//  SAND PILE
// ══════════════════════════════════════════════════════════════════════════

function _createSandPile(group) {
  // Main sand mound
  const sand = new THREE.Mesh(
    new THREE.ConeGeometry(2.5, 1.5, 7),
    MAT.sand
  )
  sand.position.set(CX + 8, 0.75, CZ - 10)
  sand.castShadow = true
  sand.receiveShadow = true
  group.add(sand)

  // Smaller gravel pile next to it
  const gravel = new THREE.Mesh(
    new THREE.ConeGeometry(1.5, 1.0, 6),
    MAT.concrete
  )
  gravel.position.set(CX + 5.5, 0.5, CZ - 9)
  gravel.castShadow = true
  group.add(gravel)
}

// ══════════════════════════════════════════════════════════════════════════
//  BRICK STACK (bottom fixed, top 3 dynamic)
// ══════════════════════════════════════════════════════════════════════════

function _createBrickStack(group, RAPIER, world, syncList) {
  const brickGeo = new THREE.BoxGeometry(0.5, 0.25, 0.25)
  const bx = CX - 4
  const bz = CZ - 6

  // Bottom rows — fixed (part of the structure)
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 4; col++) {
      const offset = (row % 2 === 0) ? 0 : 0.25
      const brick = new THREE.Mesh(brickGeo, MAT.red)
      brick.position.set(
        bx + col * 0.52 - 0.78 + offset,
        0.125 + row * 0.26,
        bz
      )
      brick.castShadow = true
      group.add(brick)
    }
  }

  // Fixed collider for bottom rows
  const fixedDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(bx, 0.39, bz)
  const fixedBody = world.createRigidBody(fixedDesc)
  world.createCollider(
    RAPIER.ColliderDesc.cuboid(1.1, 0.39, 0.15).setFriction(0.6),
    fixedBody
  )

  // Top row — 3 dynamic bricks
  for (let col = 0; col < 3; col++) {
    const brick = new THREE.Mesh(brickGeo, MAT.red)
    brick.position.set(bx + col * 0.52 - 0.52, 0.905, bz)
    brick.castShadow = true
    group.add(brick)

    const bodyDesc = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(bx + col * 0.52 - 0.52, 0.905, bz)
      .setLinearDamping(0.3)
      .setAngularDamping(0.3)
    const body = world.createRigidBody(bodyDesc)
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(0.25, 0.125, 0.125)
        .setDensity(4.0)
        .setFriction(0.5)
        .setRestitution(0.1),
      body
    )
    syncList.push({ mesh: brick, body })
  }
}

// ══════════════════════════════════════════════════════════════════════════
//  PORTA-POTTY
// ══════════════════════════════════════════════════════════════════════════

function _createPortaPotty(group, RAPIER, world) {
  const px = CX - 14
  const pz = CZ - 3

  // Main body
  const body_mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1.1, 2.2, 1.1),
    MAT.blue
  )
  body_mesh.position.set(px, 1.1, pz)
  body_mesh.castShadow = true
  group.add(body_mesh)

  // Door (slightly different blue, inset)
  const doorMat = new THREE.MeshStandardMaterial({ color: '#0D47A1', flatShading: true })
  const door = new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 1.8, 0.05),
    doorMat
  )
  door.position.set(px, 1.0, pz + 0.56)
  group.add(door)

  // Roof overhang
  const roof = new THREE.Mesh(
    new THREE.BoxGeometry(1.2, 0.1, 1.3),
    MAT.darkGray
  )
  roof.position.set(px, 2.25, pz)
  roof.castShadow = true
  group.add(roof)

  // Vent on top
  const vent = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.15, 0.3),
    MAT.darkGray
  )
  vent.position.set(px, 2.38, pz)
  group.add(vent)

  // Fixed collider
  const bodyDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(px, 1.1, pz)
  const physBody = world.createRigidBody(bodyDesc)
  world.createCollider(
    RAPIER.ColliderDesc.cuboid(0.55, 1.1, 0.55).setFriction(0.5),
    physBody
  )
}

// ══════════════════════════════════════════════════════════════════════════
//  GENERATOR
// ══════════════════════════════════════════════════════════════════════════

function _createGenerator(group, RAPIER, world) {
  const gx = CX - 12
  const gz = CZ - 8

  // Main body
  const genBody = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 1.0, 0.9),
    MAT.darkGray
  )
  genBody.position.set(gx, 0.5, gz)
  genBody.castShadow = true
  group.add(genBody)

  // Control panel
  const panel = new THREE.Mesh(
    new THREE.BoxGeometry(0.6, 0.4, 0.05),
    MAT.steel
  )
  panel.position.set(gx + 0.2, 0.7, gz + 0.48)
  group.add(panel)

  // Panel buttons (tiny boxes)
  const btnColors = [MAT.red, MAT.greenDark, MAT.yellow]
  btnColors.forEach((mat, i) => {
    const btn = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, 0.06, 0.02),
      mat
    )
    btn.position.set(gx + 0.05 + i * 0.15, 0.75, gz + 0.5)
    group.add(btn)
  })

  // Exhaust pipe
  const exhaust = new THREE.Mesh(
    new THREE.CylinderGeometry(0.06, 0.06, 0.5, 5),
    MAT.steel
  )
  exhaust.position.set(gx - 0.5, 1.25, gz)
  exhaust.castShadow = true
  group.add(exhaust)

  // Fixed collider
  const bodyDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(gx, 0.5, gz)
  const body = world.createRigidBody(bodyDesc)
  world.createCollider(
    RAPIER.ColliderDesc.cuboid(0.75, 0.5, 0.45).setFriction(0.5),
    body
  )
}

// ══════════════════════════════════════════════════════════════════════════
//  TOOL CHEST
// ══════════════════════════════════════════════════════════════════════════

function _createToolChest(group, RAPIER, world) {
  const tx = CX - 10
  const tz = CZ - 5

  // Main chest body
  const chest = new THREE.Mesh(
    new THREE.BoxGeometry(1.0, 0.8, 0.6),
    MAT.red
  )
  chest.position.set(tx, 0.4, tz)
  chest.castShadow = true
  group.add(chest)

  // Drawer lines (thin black boxes)
  for (let i = 0; i < 3; i++) {
    const drawer = new THREE.Mesh(
      new THREE.BoxGeometry(0.9, 0.02, 0.62),
      MAT.black
    )
    drawer.position.set(tx, 0.18 + i * 0.25, tz)
    group.add(drawer)
  }

  // Drawer handles
  for (let i = 0; i < 3; i++) {
    const handle = new THREE.Mesh(
      new THREE.BoxGeometry(0.2, 0.03, 0.04),
      MAT.steel
    )
    handle.position.set(tx, 0.22 + i * 0.25, tz + 0.32)
    group.add(handle)
  }

  // Fixed collider
  const bodyDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(tx, 0.4, tz)
  const body = world.createRigidBody(bodyDesc)
  world.createCollider(
    RAPIER.ColliderDesc.cuboid(0.5, 0.4, 0.3).setFriction(0.5),
    body
  )
}

// ══════════════════════════════════════════════════════════════════════════
//  HARD HATS (dynamic hemispheres)
// ══════════════════════════════════════════════════════════════════════════

function _createHardHats(group, RAPIER, world, syncList) {
  const hatGeo = new THREE.SphereGeometry(0.18, 6, 4, 0, Math.PI * 2, 0, Math.PI / 2)

  const hatPositions = [
    [CX - 9, 0.02, CZ - 4],
    [CX - 9.3, 0.02, CZ - 3.6],
    [CX - 8.8, 0.02, CZ - 4.3],
    [CX - 9.1, 0.2, CZ - 3.9],
    [CX + 4, 0.02, CZ + 5],
  ]

  hatPositions.forEach(([hx, hy, hz]) => {
    const hat = new THREE.Mesh(hatGeo, MAT.brightYellow)
    hat.position.set(hx, hy, hz)
    hat.castShadow = true
    group.add(hat)

    const bodyDesc = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(hx, hy + 0.1, hz)
      .setLinearDamping(0.2)
      .setAngularDamping(0.2)
    const body = world.createRigidBody(bodyDesc)
    world.createCollider(
      RAPIER.ColliderDesc.ball(0.18)
        .setDensity(0.5)
        .setFriction(0.3)
        .setRestitution(0.4),
      body
    )
    syncList.push({ mesh: hat, body })
  })
}

// ══════════════════════════════════════════════════════════════════════════
//  WOODEN PALLETS
// ══════════════════════════════════════════════════════════════════════════

function _createWoodenPallets(group, RAPIER, world) {
  const palletMat = new THREE.MeshStandardMaterial({ color: '#A67B5B', flatShading: true })
  const slat = new THREE.BoxGeometry(1.2, 0.05, 0.2)
  const runner = new THREE.BoxGeometry(0.15, 0.15, 1.2)

  const pallets = [
    { x: CX + 10, z: CZ + 6 },
    { x: CX + 11, z: CZ + 5 },
  ]

  pallets.forEach(p => {
    const palletGroup = new THREE.Group()

    // Top slats
    for (let i = 0; i < 5; i++) {
      const s = new THREE.Mesh(slat, palletMat)
      s.position.set(0, 0.15, -0.48 + i * 0.24)
      s.castShadow = true
      palletGroup.add(s)
    }

    // Bottom runners
    for (let i = 0; i < 3; i++) {
      const r = new THREE.Mesh(runner, palletMat)
      r.position.set(-0.45 + i * 0.45, 0.075, 0)
      palletGroup.add(r)
    }

    palletGroup.position.set(p.x, 0, p.z)
    group.add(palletGroup)

    // Fixed collider
    const bodyDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(p.x, 0.1, p.z)
    const body = world.createRigidBody(bodyDesc)
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(0.6, 0.1, 0.6).setFriction(0.6),
      body
    )
  })
}

// ══════════════════════════════════════════════════════════════════════════
//  CEMENT BAGS
// ══════════════════════════════════════════════════════════════════════════

function _createCementBags(group, RAPIER, world) {
  const bagGeo = new THREE.BoxGeometry(0.5, 0.2, 0.35)
  const bagMat = new THREE.MeshStandardMaterial({ color: '#BDBDBD', flatShading: true })
  const bx = CX + 11
  const bz = CZ - 3

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const offset = (row % 2 === 0) ? 0 : 0.15
      const bag = new THREE.Mesh(bagGeo, bagMat)
      bag.position.set(
        bx + col * 0.52 - 0.52 + offset,
        0.1 + row * 0.21,
        bz
      )
      bag.castShadow = true
      group.add(bag)
    }
  }

  // Fixed collider for bag stack
  const bodyDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(bx, 0.35, bz)
  const body = world.createRigidBody(bodyDesc)
  world.createCollider(
    RAPIER.ColliderDesc.cuboid(0.85, 0.35, 0.2).setFriction(0.5),
    body
  )
}

// ══════════════════════════════════════════════════════════════════════════
//  WHEELBARROW
// ══════════════════════════════════════════════════════════════════════════

function _createWheelbarrow(group, RAPIER, world) {
  const wx = CX - 2
  const wz = CZ + 10

  const wbGroup = new THREE.Group()
  wbGroup.rotation.y = 0.8

  // Tray (box, tilted)
  const tray = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 0.3, 1.0),
    MAT.steel
  )
  tray.position.set(0, 0.5, 0)
  tray.rotation.x = -0.15
  tray.castShadow = true
  wbGroup.add(tray)

  // Wheel
  const wheel = new THREE.Mesh(
    new THREE.CylinderGeometry(0.2, 0.2, 0.1, 8),
    MAT.black
  )
  wheel.position.set(0, 0.2, 0.65)
  wheel.rotation.z = Math.PI / 2
  wheel.castShadow = true
  wbGroup.add(wheel)

  // Handles (two thin cylinders)
  const handleGeo = new THREE.CylinderGeometry(0.03, 0.03, 1.2, 5)
  ;[-0.3, 0.3].forEach(side => {
    const handle = new THREE.Mesh(handleGeo, MAT.rust)
    handle.position.set(side, 0.55, -0.7)
    handle.rotation.x = 0.3
    wbGroup.add(handle)
  })

  // Legs
  const legGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.4, 5)
  ;[-0.3, 0.3].forEach(side => {
    const leg = new THREE.Mesh(legGeo, MAT.steel)
    leg.position.set(side, 0.2, -0.2)
    wbGroup.add(leg)
  })

  wbGroup.position.set(wx, 0, wz)
  group.add(wbGroup)

  // Fixed collider
  const bodyDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(wx, 0.35, wz)
  const body = world.createRigidBody(bodyDesc)
  world.createCollider(
    RAPIER.ColliderDesc.cuboid(0.45, 0.35, 0.6).setFriction(0.4),
    body
  )
}

// ══════════════════════════════════════════════════════════════════════════
//  BARRELS (dynamic!)
// ══════════════════════════════════════════════════════════════════════════

function _createBarrels(group, RAPIER, world, syncList) {
  const barrelGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.9, 8)
  const barrelMats = [
    new THREE.MeshStandardMaterial({ color: '#E65100', flatShading: true }),
    new THREE.MeshStandardMaterial({ color: '#1B5E20', flatShading: true }),
  ]

  const barrelPositions = [
    [CX - 3, CZ + 12],
    [CX - 2, CZ + 12.5],
  ]

  barrelPositions.forEach(([bx, bz], i) => {
    const barrel = new THREE.Mesh(barrelGeo, barrelMats[i])
    barrel.position.set(bx, 0.45, bz)
    barrel.castShadow = true
    group.add(barrel)

    // Barrel rim detail
    const rim = new THREE.Mesh(
      new THREE.TorusGeometry(0.35, 0.03, 4, 8),
      MAT.darkGray
    )
    rim.position.set(bx, 0.85, bz)
    rim.rotation.x = Math.PI / 2
    group.add(rim)

    const bodyDesc = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(bx, 0.45, bz)
      .setLinearDamping(0.2)
      .setAngularDamping(0.3)
    const body = world.createRigidBody(bodyDesc)
    world.createCollider(
      RAPIER.ColliderDesc.cylinder(0.45, 0.35)
        .setDensity(3.0)
        .setFriction(0.4)
        .setRestitution(0.2),
      body
    )
    syncList.push({ mesh: barrel, body })
  })
}

// ══════════════════════════════════════════════════════════════════════════
//  FENCING (chain-link fence around perimeter, gate opening facing city)
// ══════════════════════════════════════════════════════════════════════════

function _createFencing(group, RAPIER, world) {
  const fenceH = 2.0
  const segments = [
    // North side (with gate gap in the middle facing city)
    { x1: CX - 16, z1: CZ - 16, x2: CX - 4, z2: CZ - 16 },
    { x1: CX + 4, z1: CZ - 16, x2: CX + 16, z2: CZ - 16 },
    // East side
    { x1: CX + 16, z1: CZ - 16, x2: CX + 16, z2: CZ + 16 },
    // South side
    { x1: CX + 16, z1: CZ + 16, x2: CX - 16, z2: CZ + 16 },
    // West side
    { x1: CX - 16, z1: CZ + 16, x2: CX - 16, z2: CZ - 16 },
  ]

  const postGeo = new THREE.CylinderGeometry(0.06, 0.06, fenceH, 5)

  segments.forEach(seg => {
    const dx = seg.x2 - seg.x1
    const dz = seg.z2 - seg.z1
    const len = Math.sqrt(dx * dx + dz * dz)
    const angle = Math.atan2(dx, dz)
    const midX = (seg.x1 + seg.x2) / 2
    const midZ = (seg.z1 + seg.z2) / 2

    // Fence panel (semi-transparent)
    const panel = new THREE.Mesh(
      new THREE.PlaneGeometry(len, fenceH),
      MAT.fence
    )
    panel.position.set(midX, fenceH / 2, midZ)
    panel.rotation.y = angle
    panel.receiveShadow = true
    group.add(panel)

    // Fence posts at each end
    const post1 = new THREE.Mesh(postGeo, MAT.steel)
    post1.position.set(seg.x1, fenceH / 2, seg.z1)
    post1.castShadow = true
    group.add(post1)

    const post2 = new THREE.Mesh(postGeo, MAT.steel)
    post2.position.set(seg.x2, fenceH / 2, seg.z2)
    post2.castShadow = true
    group.add(post2)

    // Top rail
    const rail = new THREE.Mesh(
      new THREE.BoxGeometry(len, 0.05, 0.05),
      MAT.steel
    )
    rail.position.set(midX, fenceH, midZ)
    rail.rotation.y = angle
    group.add(rail)

    // Fixed collider for fence panel
    const bodyDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(midX, fenceH / 2, midZ)
    const body = world.createRigidBody(bodyDesc)

    // Orient collider to match fence rotation
    const halfAngle = angle / 2
    const qw = Math.cos(halfAngle)
    const qy = Math.sin(halfAngle)

    const colDesc = RAPIER.ColliderDesc.cuboid(len / 2, fenceH / 2, 0.08)
      .setFriction(0.5)
    // Set rotation on the body
    body.setRotation({ x: 0, y: qy, z: 0, w: qw }, true)
    world.createCollider(colDesc, body)
  })

  // Gate posts (taller, thicker)
  const gatePostGeo = new THREE.CylinderGeometry(0.1, 0.1, fenceH + 0.5, 6)
  ;[CX - 4, CX + 4].forEach(gx => {
    const post = new THREE.Mesh(gatePostGeo, MAT.yellow)
    post.position.set(gx, (fenceH + 0.5) / 2, CZ - 16)
    post.castShadow = true
    group.add(post)
  })

  // Gate top bar
  const gateBar = new THREE.Mesh(
    new THREE.BoxGeometry(8, 0.15, 0.15),
    MAT.yellow
  )
  gateBar.position.set(CX, fenceH + 0.3, CZ - 16)
  gateBar.castShadow = true
  group.add(gateBar)
}
