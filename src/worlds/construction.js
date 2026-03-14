/**
 * Construction World — a MASSIVE active construction site covering 120x120 units.
 * Origin-centered, 4 portfolio buildings at (0,-20), (20,0), (0,20), (-20,0).
 *
 * 3 animated tower cranes, 9 heavy vehicles, 6 scaffolding structures,
 * 5 buildings under construction, and 80+ dynamic pushable objects.
 * Maximum physics chaos — traffic cones, steel beams, hard hats, barrels everywhere.
 */
import * as THREE from 'three'

// ── Reusable materials ──────────────────────────────────────────────────
const MAT = {
  yellow:       new THREE.MeshStandardMaterial({ color: '#f9a825', flatShading: true }),
  brightYellow: new THREE.MeshStandardMaterial({ color: '#FFC107', flatShading: true }),
  orange:       new THREE.MeshStandardMaterial({ color: '#FF6F00', flatShading: true }),
  white:        new THREE.MeshStandardMaterial({ color: '#FFFFFF', flatShading: true }),
  steel:        new THREE.MeshStandardMaterial({ color: '#78909C', flatShading: true }),
  concrete:     new THREE.MeshStandardMaterial({ color: '#9E9E9E', flatShading: true }),
  darkGray:     new THREE.MeshStandardMaterial({ color: '#424242', flatShading: true }),
  brown:        new THREE.MeshStandardMaterial({ color: '#8B7355', flatShading: true }),
  darkBrown:    new THREE.MeshStandardMaterial({ color: '#5D4E37', flatShading: true }),
  red:          new THREE.MeshStandardMaterial({ color: '#c0392b', flatShading: true }),
  blue:         new THREE.MeshStandardMaterial({ color: '#1565C0', flatShading: true }),
  lightBlue:    new THREE.MeshStandardMaterial({ color: '#42A5F5', flatShading: true }),
  sand:         new THREE.MeshStandardMaterial({ color: '#C2B280', flatShading: true }),
  black:        new THREE.MeshStandardMaterial({ color: '#212121', flatShading: true }),
  rust:         new THREE.MeshStandardMaterial({ color: '#8B4513', flatShading: true }),
  green:        new THREE.MeshStandardMaterial({ color: '#2E7D32', flatShading: true }),
  wood:         new THREE.MeshStandardMaterial({ color: '#A0784A', flatShading: true }),
  woodLight:    new THREE.MeshStandardMaterial({ color: '#C8A26A', flatShading: true }),
  rebar:        new THREE.MeshStandardMaterial({ color: '#5D4037', flatShading: true }),
  dirt:         new THREE.MeshStandardMaterial({ color: '#8B7355', flatShading: true }),
  gravel:       new THREE.MeshStandardMaterial({ color: '#757575', flatShading: true }),
  puddle:       new THREE.MeshStandardMaterial({ color: '#1a237e', flatShading: true, transparent: true, opacity: 0.35, side: THREE.DoubleSide }),
  yellowBlack:  new THREE.MeshStandardMaterial({ color: '#FFD600', flatShading: true, side: THREE.DoubleSide }),
  cementBag:    new THREE.MeshStandardMaterial({ color: '#A59D8F', flatShading: true }),
  portaBlue:    new THREE.MeshStandardMaterial({ color: '#0D47A1', flatShading: true }),
  fuelGreen:    new THREE.MeshStandardMaterial({ color: '#1B5E20', flatShading: true }),
}

export function createWorld(scene, RAPIER, world) {
  const syncList = []
  const craneJibs = []

  // ── Scene atmosphere ────────────────────────────────────────────────
  scene.background = new THREE.Color('#b0b0b0')
  scene.fog = new THREE.Fog('#b0b0b0', 40, 130)

  // ── GROUND — dirt/gravel surface ────────────────────────────────────
  _createGround(scene, RAPIER, world)

  // ── BOUNDARY WALLS at ±60 ──────────────────────────────────────────
  _createBoundaryWalls(scene, RAPIER, world)

  // ── TOWER CRANES (3, animated) ─────────────────────────────────────
  craneJibs.push({ group: _createTowerCrane(scene, RAPIER, world, -15, -35, 14, 0.15), speed: 0.15 })
  craneJibs.push({ group: _createTowerCrane(scene, RAPIER, world, 40, 40, 10, -0.1), speed: -0.10 })
  _createMobileCrane(scene, RAPIER, world, -40, 35)

  // ── HEAVY VEHICLES (9, all fixed colliders) ────────────────────────
  _createExcavator(scene, RAPIER, world, 35, -25, 0.6)
  _createExcavator(scene, RAPIER, world, -30, -40, -1.2)
  _createDumpTruck(scene, RAPIER, world, -35, -10, 0.8)
  _createDumpTruck(scene, RAPIER, world, 30, 30, -0.5)
  _createConcreteMixer(scene, RAPIER, world, 40, -10, 2.3)
  _createBulldozer(scene, RAPIER, world, -10, 40, -0.4)
  _createSteamroller(scene, RAPIER, world, 25, -45, 1.0)
  _createLoader(scene, RAPIER, world, -45, -20, 0.3)
  _createCementPumpTruck(scene, RAPIER, world, 10, 45, -1.8)

  // ── SCAFFOLDING (6 structures) ─────────────────────────────────────
  _createScaffolding(scene, RAPIER, world, -25, -25, 6, 4)
  _createScaffolding(scene, RAPIER, world, 30, -10, 8, 3)
  _createScaffolding(scene, RAPIER, world, -40, 15, 5, 5)
  _createScaffolding(scene, RAPIER, world, 10, -40, 7, 3)
  _createScaffolding(scene, RAPIER, world, 45, 15, 4, 6)
  _createScaffolding(scene, RAPIER, world, -15, 45, 6, 4)

  // ── BUILDINGS UNDER CONSTRUCTION (6) ───────────────────────────────
  _createUnfinishedBuilding(scene, RAPIER, world, -35, 25, 5, 6, 4, 2)
  _createUnfinishedBuilding(scene, RAPIER, world, 35, 10, 6, 4, 5, 3)
  _createUnfinishedBuilding(scene, RAPIER, world, -10, -45, 4, 8, 4, 3)
  _createUnfinishedBuilding(scene, RAPIER, world, 40, -35, 5, 5, 5, 2)
  _createUnfinishedBuilding(scene, RAPIER, world, -45, -5, 3, 7, 3, 3)
  _createUnfinishedBuilding(scene, RAPIER, world, 15, 35, 4, 5, 4, 2)

  // ── TRAFFIC CONES (35, ALL dynamic) ────────────────────────────────
  _createTrafficCones(scene, RAPIER, world, syncList)

  // ── BARRIERS (12, mix of fixed/dynamic) ────────────────────────────
  _createBarriers(scene, RAPIER, world, syncList)

  // ── BARRIER TAPE (8 sections) ──────────────────────────────────────
  _createBarrierTape(scene)

  // ── WARNING SIGNS (6 triangular + 2 big signs) ─────────────────────
  _createWarningSigns(scene, RAPIER, world)
  _createBigSigns(scene, RAPIER, world)

  // ── MATERIAL PILES ─────────────────────────────────────────────────
  _createSandPiles(scene)
  _createConcretePipeStacks(scene, RAPIER, world)
  _createSteelBeams(scene, RAPIER, world, syncList)
  _createBrickStacks(scene, RAPIER, world, syncList)
  _createLumberStacks(scene, RAPIER, world)
  _createCementBags(scene, RAPIER, world)

  // ── SMALL STRUCTURES ───────────────────────────────────────────────
  _createPortaPotties(scene, RAPIER, world)
  _createToolSheds(scene, RAPIER, world)
  _createGenerators(scene, RAPIER, world)
  _createFuelTanks(scene, RAPIER, world)
  _createDumpsters(scene, RAPIER, world)

  // ── GROUND FEATURES ────────────────────────────────────────────────
  _createGroundFeatures(scene)

  // ── DYNAMIC INTERACTIVE OBJECTS (the chaos!) ───────────────────────
  _createDynamicHardHats(scene, RAPIER, world, syncList)
  _createDynamicPlanks(scene, RAPIER, world, syncList)
  _createDynamicPaintCans(scene, RAPIER, world, syncList)
  _createDynamicToolboxes(scene, RAPIER, world, syncList)
  _createDynamicWheelbarrows(scene, RAPIER, world, syncList)
  _createDynamicBarrels(scene, RAPIER, world, syncList)
  _createDynamicCinderBlocks(scene, RAPIER, world, syncList)

  return {
    syncList,
    update(dt) {
      for (const c of craneJibs) c.group.rotation.y += dt * c.speed
    },
  }
}

// ══════════════════════════════════════════════════════════════════════════
//  GROUND
// ══════════════════════════════════════════════════════════════════════════

function _createGround(scene, RAPIER, world) {
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(130, 130),
    MAT.dirt
  )
  ground.rotation.x = -Math.PI / 2
  ground.position.y = 0
  ground.receiveShadow = true
  scene.add(ground)

  // Rapier ground collider
  const groundBody = world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(0, -0.05, 0))
  world.createCollider(RAPIER.ColliderDesc.cuboid(65, 0.05, 65).setFriction(0.8), groundBody)

  // Dirt roads (darker paths connecting areas)
  const roadMat = MAT.darkBrown
  const roads = [
    { x: 0, z: 0, w: 4, d: 120 },   // N-S main road
    { x: 0, z: 0, w: 120, d: 4 },   // E-W main road
    { x: -25, z: -25, w: 3, d: 30 }, // diagonal-ish connector
    { x: 30, z: 20, w: 30, d: 3 },   // east connector
  ]
  roads.forEach(r => {
    const road = new THREE.Mesh(new THREE.PlaneGeometry(r.w, r.d), roadMat)
    road.rotation.x = -Math.PI / 2
    road.position.set(r.x, 0.01, r.z)
    road.receiveShadow = true
    scene.add(road)
  })
}

// ══════════════════════════════════════════════════════════════════════════
//  BOUNDARY WALLS
// ══════════════════════════════════════════════════════════════════════════

function _createBoundaryWalls(scene, RAPIER, world) {
  const wallH = 3
  const wallGeo = new THREE.BoxGeometry(120, wallH, 0.5)
  const wallMat = new THREE.MeshStandardMaterial({ color: '#6D4C41', flatShading: true })

  // Visual walls (corrugated fence look)
  const walls = [
    { x: 0, z: -60, ry: 0 },
    { x: 0, z: 60, ry: 0 },
    { x: -60, z: 0, ry: Math.PI / 2 },
    { x: 60, z: 0, ry: Math.PI / 2 },
  ]
  walls.forEach(w => {
    const mesh = new THREE.Mesh(wallGeo, wallMat)
    mesh.position.set(w.x, wallH / 2, w.z)
    mesh.rotation.y = w.ry
    mesh.castShadow = true
    scene.add(mesh)
  })

  // Rapier boundary colliders
  const bw = [
    { x: 0, z: -60, hx: 60, hz: 0.25 },
    { x: 0, z: 60, hx: 60, hz: 0.25 },
    { x: -60, z: 0, hx: 0.25, hz: 60 },
    { x: 60, z: 0, hx: 0.25, hz: 60 },
  ]
  bw.forEach(b => {
    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(b.x, wallH / 2, b.z)
    const body = world.createRigidBody(bd)
    world.createCollider(RAPIER.ColliderDesc.cuboid(b.hx, wallH / 2, b.hz).setFriction(0.5), body)
  })
}

// ══════════════════════════════════════════════════════════════════════════
//  TOWER CRANE (animated jib)
// ══════════════════════════════════════════════════════════════════════════

function _createTowerCrane(scene, RAPIER, world, cx, cz, mastH, _speed) {
  // Concrete base pad
  const basePad = new THREE.Mesh(new THREE.BoxGeometry(4, 0.4, 4), MAT.concrete)
  basePad.position.set(cx, 0.2, cz)
  basePad.castShadow = true
  basePad.receiveShadow = true
  scene.add(basePad)

  // Vertical mast
  const mast = new THREE.Mesh(new THREE.BoxGeometry(0.8, mastH, 0.8), MAT.yellow)
  mast.position.set(cx, mastH / 2 + 0.4, cz)
  mast.castShadow = true
  scene.add(mast)

  // Mast lattice braces
  for (let i = 0; i < Math.floor(mastH / 2.2); i++) {
    const braceH = 1.8 + i * 2.2
    if (braceH > mastH) break
    const brace = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 1.0), MAT.yellow)
    brace.position.set(cx, braceH, cz)
    brace.rotation.y = (i % 2) * Math.PI / 2
    scene.add(brace)
  }

  // Fixed collider on mast
  const mastBD = RAPIER.RigidBodyDesc.fixed().setTranslation(cx, mastH / 2 + 0.4, cz)
  const mastBody = world.createRigidBody(mastBD)
  world.createCollider(RAPIER.ColliderDesc.cuboid(0.4, mastH / 2, 0.4).setFriction(0.5), mastBody)

  // Rotating jib group
  const jibGroup = new THREE.Group()
  jibGroup.position.set(cx, mastH + 0.4, cz)

  // Operator cab
  const cab = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.0, 1.2), MAT.brightYellow)
  cab.position.set(0, -0.3, 0)
  cab.castShadow = true
  jibGroup.add(cab)

  // Cab window
  const cabWin = new THREE.Mesh(new THREE.BoxGeometry(1.22, 0.4, 0.5), MAT.blue)
  cabWin.position.set(0, 0.0, 0.4)
  jibGroup.add(cabWin)

  // Main jib (boom arm)
  const jibLen = mastH + 2
  const jib = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.5, jibLen), MAT.yellow)
  jib.position.set(0, 0.5, jibLen / 2 + 0.6)
  jib.castShadow = true
  jibGroup.add(jib)

  // Jib lattice diagonals
  for (let i = 0; i < Math.floor(jibLen / 2.1); i++) {
    const d = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 2.0), MAT.yellow)
    d.position.set(0, 0.5, 2.0 + i * 2.1)
    d.rotation.x = ((i % 2) === 0 ? 1 : -1) * 0.5
    jibGroup.add(d)
  }

  // Jib tip
  const jibTip = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.3), MAT.red)
  jibTip.position.set(0, 0.5, jibLen + 0.6)
  jibGroup.add(jibTip)

  // Counter-jib
  const counterLen = 5
  const counterJib = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.5, counterLen), MAT.yellow)
  counterJib.position.set(0, 0.5, -(counterLen / 2 + 0.6))
  counterJib.castShadow = true
  jibGroup.add(counterJib)

  // Counterweight blocks
  for (let i = 0; i < 3; i++) {
    const cw = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.6, 0.8), MAT.concrete)
    cw.position.set(0, 0.0, -(counterLen + 0.2 - i * 0.9))
    cw.castShadow = true
    jibGroup.add(cw)
  }

  // Hoist cable
  const cable = new THREE.Mesh(new THREE.BoxGeometry(0.04, 4, 0.04), MAT.darkGray)
  cable.position.set(0, -1.5, jibLen + 0.2)
  jibGroup.add(cable)

  // Hook
  const hook = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.3), MAT.steel)
  hook.position.set(0, -3.5, jibLen + 0.2)
  hook.castShadow = true
  jibGroup.add(hook)

  scene.add(jibGroup)
  return jibGroup
}

// ══════════════════════════════════════════════════════════════════════════
//  MOBILE CRANE (static, different shape)
// ══════════════════════════════════════════════════════════════════════════

function _createMobileCrane(scene, RAPIER, world, cx, cz) {
  const g = new THREE.Group()
  g.position.set(cx, 0, cz)
  g.rotation.y = 0.7

  // Truck base
  const base = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.0, 5.0), MAT.brightYellow)
  base.position.set(0, 0.5, 0)
  base.castShadow = true
  g.add(base)

  // Cab
  const cab = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.2, 1.6), MAT.brightYellow)
  cab.position.set(0, 1.1, -1.5)
  cab.castShadow = true
  g.add(cab)

  // Cab windshield
  const ws = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.5, 0.1), MAT.blue)
  ws.position.set(0, 1.4, -0.7)
  g.add(ws)

  // Wheels (6)
  const wheelGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.3, 8)
  ;[[-1.3, 0.45, -1.5], [1.3, 0.45, -1.5], [-1.3, 0.45, 0.5], [1.3, 0.45, 0.5], [-1.3, 0.45, 1.5], [1.3, 0.45, 1.5]].forEach(([wx, wy, wz]) => {
    const w = new THREE.Mesh(wheelGeo, MAT.black)
    w.position.set(wx, wy, wz)
    w.rotation.z = Math.PI / 2
    w.castShadow = true
    g.add(w)
  })

  // Telescoping arm (2 sections)
  const arm1 = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 6), MAT.yellow)
  arm1.position.set(0, 2.0, 2)
  arm1.rotation.x = -0.4
  arm1.castShadow = true
  g.add(arm1)

  const arm2 = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.35, 5), MAT.yellow)
  arm2.position.set(0, 3.5, 5.5)
  arm2.rotation.x = -0.3
  arm2.castShadow = true
  g.add(arm2)

  // Outrigger pads (4)
  ;[[-1.8, 0.05, -1], [1.8, 0.05, -1], [-1.8, 0.05, 1], [1.8, 0.05, 1]].forEach(([px, py, pz]) => {
    const pad = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.1, 0.8), MAT.darkGray)
    pad.position.set(px, py, pz)
    g.add(pad)
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.6, 0.15), MAT.darkGray)
    leg.position.set(px, 0.35, pz)
    g.add(leg)
  })

  scene.add(g)

  // Fixed collider
  const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(cx, 1.0, cz)
  const body = world.createRigidBody(bd)
  world.createCollider(RAPIER.ColliderDesc.cuboid(1.5, 1.5, 3.0).setFriction(0.5), body)
}

// ══════════════════════════════════════════════════════════════════════════
//  HEAVY VEHICLES — Excavator
// ══════════════════════════════════════════════════════════════════════════

function _createExcavator(scene, RAPIER, world, cx, cz, ry) {
  const g = new THREE.Group()
  g.position.set(cx, 0, cz)
  g.rotation.y = ry

  // Track base
  const trackBase = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.5, 3.0), MAT.darkGray)
  trackBase.position.set(0, 0.25, 0)
  trackBase.castShadow = true
  g.add(trackBase)

  // Tracks
  const trackGeo = new THREE.BoxGeometry(0.3, 0.6, 3.2)
  ;[-1.0, 1.0].forEach(side => {
    const t = new THREE.Mesh(trackGeo, MAT.black)
    t.position.set(side, 0.3, 0)
    t.castShadow = true
    g.add(t)
  })

  // Cab
  const cab = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.2, 1.8), MAT.brightYellow)
  cab.position.set(0, 1.1, -0.3)
  cab.castShadow = true
  g.add(cab)

  // Cab window
  const win = new THREE.Mesh(new THREE.BoxGeometry(1.62, 0.5, 0.15), MAT.blue)
  win.position.set(0, 1.4, 0.6)
  g.add(win)

  // Boom arm
  const boom = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.3, 3.0), MAT.yellow)
  boom.position.set(0, 1.5, 2.0)
  boom.rotation.x = -0.3
  boom.castShadow = true
  g.add(boom)

  // Stick
  const stick = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.25, 2.2), MAT.yellow)
  stick.position.set(0, 0.8, 3.8)
  stick.rotation.x = 0.6
  stick.castShadow = true
  g.add(stick)

  // Bucket
  const bucket = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.5, 0.6), MAT.steel)
  bucket.position.set(0, 0.0, 4.3)
  bucket.castShadow = true
  g.add(bucket)

  // Hydraulic cylinder
  const cyl = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.5, 5), MAT.steel)
  cyl.position.set(0.3, 1.3, 1.2)
  cyl.rotation.z = 0.3
  g.add(cyl)

  scene.add(g)

  const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(cx, 0.8, cz)
  const body = world.createRigidBody(bd)
  world.createCollider(RAPIER.ColliderDesc.cuboid(1.2, 0.8, 2.0).setFriction(0.5), body)
}

// ══════════════════════════════════════════════════════════════════════════
//  HEAVY VEHICLES — Dump Truck
// ══════════════════════════════════════════════════════════════════════════

function _createDumpTruck(scene, RAPIER, world, cx, cz, ry) {
  const g = new THREE.Group()
  g.position.set(cx, 0, cz)
  g.rotation.y = ry

  // Cab
  const cab = new THREE.Mesh(new THREE.BoxGeometry(2.0, 1.6, 1.8), MAT.brightYellow)
  cab.position.set(0, 1.2, -1.8)
  cab.castShadow = true
  g.add(cab)

  // Windshield
  const ws = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.6, 0.1), MAT.blue)
  ws.position.set(0, 1.6, -1.0)
  g.add(ws)

  // Dump bed
  const bed = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.15, 3.2), MAT.steel)
  bed.position.set(0, 1.0, 0.7)
  bed.rotation.x = -0.1
  bed.castShadow = true
  g.add(bed)

  // Bed sides
  const sideGeo = new THREE.BoxGeometry(0.1, 0.8, 3.2)
  ;[-0.95, 0.95].forEach(side => {
    const s = new THREE.Mesh(sideGeo, MAT.steel)
    s.position.set(side, 1.4, 0.7)
    s.rotation.x = -0.1
    s.castShadow = true
    g.add(s)
  })

  // Back wall
  const bw = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.8, 0.1), MAT.steel)
  bw.position.set(0, 1.35, 2.3)
  g.add(bw)

  // Wheels
  const wheelGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 8)
  ;[[-1.1, 0.4, -1.5], [1.1, 0.4, -1.5], [-1.1, 0.4, 0.6], [1.1, 0.4, 0.6], [-1.1, 0.4, 1.4], [1.1, 0.4, 1.4]].forEach(([wx, wy, wz]) => {
    const w = new THREE.Mesh(wheelGeo, MAT.black)
    w.position.set(wx, wy, wz)
    w.rotation.z = Math.PI / 2
    w.castShadow = true
    g.add(w)
  })

  scene.add(g)

  const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(cx, 1.0, cz)
  const body = world.createRigidBody(bd)
  world.createCollider(RAPIER.ColliderDesc.cuboid(1.1, 1.0, 2.5).setFriction(0.5), body)
}

// ══════════════════════════════════════════════════════════════════════════
//  HEAVY VEHICLES — Concrete Mixer
// ══════════════════════════════════════════════════════════════════════════

function _createConcreteMixer(scene, RAPIER, world, cx, cz, ry) {
  const g = new THREE.Group()
  g.position.set(cx, 0, cz)
  g.rotation.y = ry

  // Cab
  const cab = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.5, 1.6), MAT.red)
  cab.position.set(0, 1.15, -1.8)
  cab.castShadow = true
  g.add(cab)

  // Windshield
  const ws = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.5, 0.1), MAT.blue)
  ws.position.set(0, 1.5, -1.0)
  g.add(ws)

  // Mixer drum
  const drum = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.1, 3.0, 8), MAT.concrete)
  drum.position.set(0, 1.8, 0.5)
  drum.rotation.x = Math.PI / 2
  drum.rotation.z = 0.15
  drum.castShadow = true
  g.add(drum)

  // Helical stripes on drum
  for (let i = 0; i < 3; i++) {
    const stripe = new THREE.Mesh(new THREE.TorusGeometry(1.0, 0.06, 4, 8), MAT.yellow)
    stripe.position.set(0, 1.8, -0.3 + i * 0.8)
    stripe.rotation.x = Math.PI / 2 + i * 0.3
    g.add(stripe)
  }

  // Chassis
  const chassis = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.4, 4.5), MAT.darkGray)
  chassis.position.set(0, 0.5, -0.2)
  g.add(chassis)

  // Wheels
  const wheelGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 8)
  ;[[-0.95, 0.4, -1.5], [0.95, 0.4, -1.5], [-0.95, 0.4, 0.8], [0.95, 0.4, 0.8], [-0.95, 0.4, 1.6], [0.95, 0.4, 1.6]].forEach(([wx, wy, wz]) => {
    const w = new THREE.Mesh(wheelGeo, MAT.black)
    w.position.set(wx, wy, wz)
    w.rotation.z = Math.PI / 2
    w.castShadow = true
    g.add(w)
  })

  scene.add(g)

  const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(cx, 1.0, cz)
  const body = world.createRigidBody(bd)
  world.createCollider(RAPIER.ColliderDesc.cuboid(1.0, 1.2, 2.5).setFriction(0.5), body)
}

// ══════════════════════════════════════════════════════════════════════════
//  HEAVY VEHICLES — Bulldozer
// ══════════════════════════════════════════════════════════════════════════

function _createBulldozer(scene, RAPIER, world, cx, cz, ry) {
  const g = new THREE.Group()
  g.position.set(cx, 0, cz)
  g.rotation.y = ry

  // Track base
  const trackBase = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.6, 3.0), MAT.darkGray)
  trackBase.position.set(0, 0.3, 0)
  trackBase.castShadow = true
  g.add(trackBase)

  // Tracks
  ;[-1.1, 1.1].forEach(side => {
    const t = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.7, 3.2), MAT.black)
    t.position.set(side, 0.35, 0)
    t.castShadow = true
    g.add(t)
  })

  // Cab body
  const cab = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.2, 1.6), MAT.brightYellow)
  cab.position.set(0, 1.2, -0.2)
  cab.castShadow = true
  g.add(cab)

  // Cab window
  const win = new THREE.Mesh(new THREE.BoxGeometry(1.82, 0.4, 0.12), MAT.blue)
  win.position.set(0, 1.5, 0.6)
  g.add(win)

  // Blade
  const blade = new THREE.Mesh(new THREE.BoxGeometry(2.8, 1.0, 0.2), MAT.yellow)
  blade.position.set(0, 0.5, 1.8)
  blade.castShadow = true
  g.add(blade)

  // Blade arms
  ;[-0.9, 0.9].forEach(side => {
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.2, 1.2), MAT.yellow)
    arm.position.set(side, 0.6, 1.2)
    g.add(arm)
  })

  // Exhaust pipe
  const exhaust = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.0, 6), MAT.darkGray)
  exhaust.position.set(-0.7, 1.8, -0.5)
  g.add(exhaust)

  scene.add(g)

  const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(cx, 0.8, cz)
  const body = world.createRigidBody(bd)
  world.createCollider(RAPIER.ColliderDesc.cuboid(1.4, 0.8, 1.8).setFriction(0.5), body)
}

// ══════════════════════════════════════════════════════════════════════════
//  HEAVY VEHICLES — Steamroller
// ══════════════════════════════════════════════════════════════════════════

function _createSteamroller(scene, RAPIER, world, cx, cz, ry) {
  const g = new THREE.Group()
  g.position.set(cx, 0, cz)
  g.rotation.y = ry

  // Main body
  const body1 = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.0, 2.5), MAT.brightYellow)
  body1.position.set(0, 0.8, -0.3)
  body1.castShadow = true
  g.add(body1)

  // Cab
  const cab = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.2, 1.4), MAT.brightYellow)
  cab.position.set(0, 1.9, -0.5)
  cab.castShadow = true
  g.add(cab)

  // Cab window
  const win = new THREE.Mesh(new THREE.BoxGeometry(1.42, 0.5, 0.1), MAT.blue)
  win.position.set(0, 2.1, 0.2)
  g.add(win)

  // Front roller (big cylinder)
  const roller = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 2.0, 10), MAT.steel)
  roller.position.set(0, 0.7, 1.5)
  roller.rotation.z = Math.PI / 2
  roller.castShadow = true
  g.add(roller)

  // Rear wheels
  ;[-0.8, 0.8].forEach(side => {
    const w = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.4, 8), MAT.black)
    w.position.set(side, 0.45, -1.5)
    w.rotation.z = Math.PI / 2
    w.castShadow = true
    g.add(w)
  })

  scene.add(g)

  const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(cx, 0.8, cz)
  const rbody = world.createRigidBody(bd)
  world.createCollider(RAPIER.ColliderDesc.cuboid(1.0, 1.2, 1.8).setFriction(0.5), rbody)
}

// ══════════════════════════════════════════════════════════════════════════
//  HEAVY VEHICLES — Loader
// ══════════════════════════════════════════════════════════════════════════

function _createLoader(scene, RAPIER, world, cx, cz, ry) {
  const g = new THREE.Group()
  g.position.set(cx, 0, cz)
  g.rotation.y = ry

  // Body
  const body1 = new THREE.Mesh(new THREE.BoxGeometry(2.0, 1.2, 2.8), MAT.brightYellow)
  body1.position.set(0, 0.9, 0)
  body1.castShadow = true
  g.add(body1)

  // Cab
  const cab = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.0, 1.4), MAT.brightYellow)
  cab.position.set(0, 2.0, -0.3)
  cab.castShadow = true
  g.add(cab)

  // Cab window
  const win = new THREE.Mesh(new THREE.BoxGeometry(1.62, 0.5, 0.1), MAT.blue)
  win.position.set(0, 2.2, 0.4)
  g.add(win)

  // Wheels (big)
  const wheelGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.4, 8)
  ;[[-1.1, 0.55, -1.0], [1.1, 0.55, -1.0], [-1.1, 0.55, 1.0], [1.1, 0.55, 1.0]].forEach(([wx, wy, wz]) => {
    const w = new THREE.Mesh(wheelGeo, MAT.black)
    w.position.set(wx, wy, wz)
    w.rotation.z = Math.PI / 2
    w.castShadow = true
    g.add(w)
  })

  // Loader arms
  ;[-0.7, 0.7].forEach(side => {
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.2, 3.0), MAT.yellow)
    arm.position.set(side, 1.5, 2.2)
    arm.rotation.x = -0.2
    g.add(arm)
  })

  // Bucket
  const bucket = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.6, 0.8), MAT.steel)
  bucket.position.set(0, 0.8, 3.6)
  bucket.castShadow = true
  g.add(bucket)

  // Bucket floor
  const bFloor = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.1, 1.0), MAT.steel)
  bFloor.position.set(0, 0.5, 3.2)
  g.add(bFloor)

  scene.add(g)

  const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(cx, 1.0, cz)
  const rbody = world.createRigidBody(bd)
  world.createCollider(RAPIER.ColliderDesc.cuboid(1.1, 1.2, 2.2).setFriction(0.5), rbody)
}

// ══════════════════════════════════════════════════════════════════════════
//  HEAVY VEHICLES — Cement Pump Truck
// ══════════════════════════════════════════════════════════════════════════

function _createCementPumpTruck(scene, RAPIER, world, cx, cz, ry) {
  const g = new THREE.Group()
  g.position.set(cx, 0, cz)
  g.rotation.y = ry

  // Chassis
  const chassis = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.5, 5.0), MAT.darkGray)
  chassis.position.set(0, 0.5, 0)
  g.add(chassis)

  // Cab
  const cab = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.4, 1.6), MAT.red)
  cab.position.set(0, 1.2, -1.5)
  cab.castShadow = true
  g.add(cab)

  // Windshield
  const ws = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.5, 0.1), MAT.blue)
  ws.position.set(0, 1.5, -0.7)
  g.add(ws)

  // Pump mechanism (box on back)
  const pump = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.0, 2.0), MAT.steel)
  pump.position.set(0, 1.2, 1.0)
  pump.castShadow = true
  g.add(pump)

  // Boom arm (3 folded sections)
  const sec1 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 3.0), MAT.red)
  sec1.position.set(0, 2.0, 1.0)
  sec1.rotation.x = -0.6
  g.add(sec1)

  const sec2 = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.18, 2.5), MAT.red)
  sec2.position.set(0, 3.5, 2.0)
  sec2.rotation.x = 0.8
  g.add(sec2)

  const sec3 = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.15, 2.0), MAT.red)
  sec3.position.set(0, 2.5, 3.5)
  sec3.rotation.x = -0.3
  g.add(sec3)

  // Wheels (8)
  const wheelGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 8)
  ;[[-1.1, 0.4, -2.0], [1.1, 0.4, -2.0], [-1.1, 0.4, -0.5], [1.1, 0.4, -0.5], [-1.1, 0.4, 1.0], [1.1, 0.4, 1.0], [-1.1, 0.4, 2.0], [1.1, 0.4, 2.0]].forEach(([wx, wy, wz]) => {
    const w = new THREE.Mesh(wheelGeo, MAT.black)
    w.position.set(wx, wy, wz)
    w.rotation.z = Math.PI / 2
    w.castShadow = true
    g.add(w)
  })

  // Outrigger pads
  ;[[-1.8, 0.05, -0.5], [1.8, 0.05, -0.5], [-1.8, 0.05, 1.5], [1.8, 0.05, 1.5]].forEach(([px, py, pz]) => {
    const pad = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.1, 0.6), MAT.darkGray)
    pad.position.set(px, py, pz)
    g.add(pad)
  })

  scene.add(g)

  const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(cx, 1.0, cz)
  const rbody = world.createRigidBody(bd)
  world.createCollider(RAPIER.ColliderDesc.cuboid(1.2, 1.5, 2.8).setFriction(0.5), rbody)
}

// ══════════════════════════════════════════════════════════════════════════
//  SCAFFOLDING
// ══════════════════════════════════════════════════════════════════════════

function _createScaffolding(scene, RAPIER, world, sx, sz, width, levels) {
  const g = new THREE.Group()
  g.position.set(sx, 0, sz)

  const poleGeo = new THREE.CylinderGeometry(0.06, 0.06, levels * 2, 5)
  const plankGeo = new THREE.BoxGeometry(width * 0.7, 0.08, 1.2)
  const crossGeo = new THREE.BoxGeometry(0.05, 0.05, width * 0.9)

  // 4 vertical poles
  const hw = width * 0.35
  const polePositions = [[-hw, 0, -0.5], [hw, 0, -0.5], [-hw, 0, 0.5], [hw, 0, 0.5]]
  polePositions.forEach(([px, , pz]) => {
    const pole = new THREE.Mesh(poleGeo, MAT.steel)
    pole.position.set(px, levels, pz)
    pole.castShadow = true
    g.add(pole)
  })

  // Horizontal platforms at each level
  for (let level = 0; level < levels; level++) {
    const y = 1.5 + level * 2
    const plank = new THREE.Mesh(plankGeo, MAT.rust)
    plank.position.set(0, y, 0)
    plank.castShadow = true
    g.add(plank)
  }

  // Cross-bracing
  for (let level = 0; level < levels - 1; level++) {
    const y = 2.5 + level * 2
    const cross = new THREE.Mesh(crossGeo, MAT.steel)
    cross.position.set(0, y, -0.5)
    cross.rotation.y = 0.4
    cross.rotation.z = 0.5
    g.add(cross)

    const cross2 = new THREE.Mesh(crossGeo, MAT.steel)
    cross2.position.set(0, y, 0.5)
    cross2.rotation.y = -0.4
    cross2.rotation.z = -0.5
    g.add(cross2)
  }

  scene.add(g)

  // Fixed collider
  const h = levels
  const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(sx, h, sz)
  const body = world.createRigidBody(bd)
  world.createCollider(RAPIER.ColliderDesc.cuboid(hw + 0.1, h, 0.7).setFriction(0.5), body)
}

// ══════════════════════════════════════════════════════════════════════════
//  BUILDINGS UNDER CONSTRUCTION
// ══════════════════════════════════════════════════════════════════════════

function _createUnfinishedBuilding(scene, RAPIER, world, cx, cz, w, h, d, floors) {
  const g = new THREE.Group()
  g.position.set(cx, 0, cz)

  const pillarGeo = new THREE.BoxGeometry(0.3, h, 0.3)
  const floorGeo = new THREE.BoxGeometry(w, 0.15, d)
  const rebarGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.5, 5)

  // Corner pillars (concrete columns)
  const hw = w / 2 - 0.15
  const hd = d / 2 - 0.15
  ;[[-hw, h / 2, -hd], [hw, h / 2, -hd], [-hw, h / 2, hd], [hw, h / 2, hd]].forEach(([px, py, pz]) => {
    const p = new THREE.Mesh(pillarGeo, MAT.concrete)
    p.position.set(px, py, pz)
    p.castShadow = true
    g.add(p)
  })

  // Floor slabs at each level
  for (let f = 0; f <= floors; f++) {
    const y = (f / floors) * h
    const floor = new THREE.Mesh(floorGeo, MAT.concrete)
    floor.position.set(0, y, 0)
    floor.castShadow = true
    floor.receiveShadow = true
    g.add(floor)
  }

  // Partial walls on some floors (exposed concrete)
  const wallGeo = new THREE.BoxGeometry(w * 0.4, h / floors * 0.6, 0.12)
  for (let f = 0; f < Math.min(floors, 2); f++) {
    const y = (f / floors) * h + (h / floors) * 0.3
    const wall = new THREE.Mesh(wallGeo, MAT.concrete)
    wall.position.set(0, y, -hd)
    wall.castShadow = true
    g.add(wall)
  }

  // Rebar sticking up from top (exposed steel)
  const rebarCount = Math.floor(w * d / 4)
  for (let i = 0; i < rebarCount; i++) {
    const rx = (Math.random() - 0.5) * (w - 0.5)
    const rz = (Math.random() - 0.5) * (d - 0.5)
    const rebar = new THREE.Mesh(rebarGeo, MAT.rebar)
    rebar.position.set(rx, h + 0.75, rz)
    rebar.castShadow = true
    g.add(rebar)
  }

  // Wooden formwork on sides (plywood sheets)
  if (floors > 1) {
    const formGeo = new THREE.BoxGeometry(w * 0.6, h / floors * 0.8, 0.08)
    const form = new THREE.Mesh(formGeo, MAT.wood)
    form.position.set(0, h / floors * 0.4, hd + 0.05)
    form.castShadow = true
    g.add(form)
  }

  scene.add(g)

  // Fixed collider
  const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(cx, h / 2, cz)
  const body = world.createRigidBody(bd)
  world.createCollider(RAPIER.ColliderDesc.cuboid(w / 2, h / 2, d / 2).setFriction(0.5), body)
}

// ══════════════════════════════════════════════════════════════════════════
//  TRAFFIC CONES (35, all dynamic!)
// ══════════════════════════════════════════════════════════════════════════

function _createTrafficCones(scene, RAPIER, world, syncList) {
  const coneGeo = new THREE.ConeGeometry(0.15, 0.45, 6)
  const baseGeo = new THREE.BoxGeometry(0.35, 0.05, 0.35)

  const positions = [
    // Scattered across entire map
    [-5, -8], [3, -12], [-12, -5], [8, -15], [-20, 5],
    [15, 10], [-8, 18], [25, -5], [-30, -15], [12, 25],
    [-18, -30], [35, 5], [-10, 35], [22, 18], [-25, 12],
    [5, -35], [-35, -25], [28, -20], [-5, 42], [38, 28],
    [42, -15], [-42, 10], [-20, -42], [15, -28], [-28, 35],
    [48, -5], [-48, -10], [10, 50], [-15, -50], [50, 20],
    [-50, 25], [30, 45], [-38, -35], [45, -30], [-25, 50],
  ]

  positions.forEach(([cx, cz]) => {
    const coneGroup = new THREE.Group()

    const cone = new THREE.Mesh(coneGeo, MAT.orange)
    cone.position.set(0, 0.275, 0)
    cone.castShadow = true
    coneGroup.add(cone)

    // White stripe
    const stripe = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.1, 6), MAT.white)
    stripe.position.set(0, 0.35, 0)
    coneGroup.add(stripe)

    // Base
    const base = new THREE.Mesh(baseGeo, MAT.orange)
    base.position.set(0, 0.025, 0)
    coneGroup.add(base)

    coneGroup.position.set(cx, 0, cz)
    scene.add(coneGroup)

    // Dynamic — lightweight, scatter on hit
    const bd = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(cx, 0.25, cz)
      .setLinearDamping(0.1)
      .setAngularDamping(0.1)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cone(0.225, 0.15)
        .setDensity(1.5)
        .setFriction(0.3)
        .setRestitution(0.3),
      body
    )
    syncList.push({ mesh: coneGroup, body })
  })
}

// ══════════════════════════════════════════════════════════════════════════
//  BARRIERS (12, mix of fixed/dynamic)
// ══════════════════════════════════════════════════════════════════════════

function _createBarriers(scene, RAPIER, world, syncList) {
  const barGeo = new THREE.BoxGeometry(1.6, 0.15, 0.15)
  const legGeo = new THREE.BoxGeometry(0.1, 0.7, 0.4)

  const positions = [
    { x: -12, z: -30, r: 0.2, dynamic: false },
    { x: -9, z: -30, r: 0.0, dynamic: false },
    { x: -6, z: -30, r: -0.1, dynamic: true },
    { x: 25, z: -15, r: 1.5, dynamic: false },
    { x: 25, z: -12, r: 1.5, dynamic: true },
    { x: -30, z: 20, r: 0.3, dynamic: false },
    { x: -30, z: 23, r: 0.1, dynamic: true },
    { x: 15, z: 30, r: 0.0, dynamic: false },
    { x: 18, z: 30, r: -0.2, dynamic: true },
    { x: 40, z: -25, r: 0.8, dynamic: true },
    { x: -40, z: -30, r: 0.5, dynamic: false },
    { x: 35, z: 40, r: -0.3, dynamic: true },
  ]

  positions.forEach(p => {
    const bg = new THREE.Group()

    const bar = new THREE.Mesh(barGeo, MAT.orange)
    bar.position.set(0, 0.7, 0)
    bar.castShadow = true
    bg.add(bar)

    // White stripes
    const s1 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.16, 0.16), MAT.white)
    s1.position.set(0.4, 0.7, 0)
    bg.add(s1)
    const s2 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.16, 0.16), MAT.white)
    s2.position.set(-0.4, 0.7, 0)
    bg.add(s2)

    // Legs
    const legL = new THREE.Mesh(legGeo, MAT.orange)
    legL.position.set(-0.6, 0.35, 0)
    legL.castShadow = true
    bg.add(legL)
    const legR = new THREE.Mesh(legGeo, MAT.orange)
    legR.position.set(0.6, 0.35, 0)
    legR.castShadow = true
    bg.add(legR)

    bg.rotation.y = p.r
    bg.position.set(p.x, 0, p.z)
    scene.add(bg)

    if (p.dynamic) {
      const bd = RAPIER.RigidBodyDesc.dynamic()
        .setTranslation(p.x, 0.45, p.z)
        .setLinearDamping(0.3)
        .setAngularDamping(0.4)
      const body = world.createRigidBody(bd)
      world.createCollider(
        RAPIER.ColliderDesc.cuboid(0.8, 0.45, 0.25)
          .setDensity(3.0)
          .setFriction(0.4)
          .setRestitution(0.1),
        body
      )
      syncList.push({ mesh: bg, body })
    } else {
      const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(p.x, 0.45, p.z)
      const body = world.createRigidBody(bd)
      world.createCollider(RAPIER.ColliderDesc.cuboid(0.8, 0.45, 0.25).setFriction(0.5), body)
    }
  })
}

// ══════════════════════════════════════════════════════════════════════════
//  BARRIER TAPE (8 sections)
// ══════════════════════════════════════════════════════════════════════════

function _createBarrierTape(scene) {
  const tapes = [
    { x1: -55, z1: -30, x2: -48, z2: -30 },
    { x1: 48, z1: -30, x2: 55, z2: -28 },
    { x1: -55, z1: 30, x2: -48, z2: 32 },
    { x1: 48, z1: 30, x2: 55, z2: 28 },
    { x1: -20, z1: -55, x2: -14, z2: -55 },
    { x1: 14, z1: -55, x2: 20, z2: -55 },
    { x1: -20, z1: 55, x2: -14, z2: 55 },
    { x1: 14, z1: 55, x2: 20, z2: 55 },
  ]

  const poleGeo = new THREE.CylinderGeometry(0.05, 0.05, 1.2, 5)

  tapes.forEach(t => {
    const pole1 = new THREE.Mesh(poleGeo, MAT.steel)
    pole1.position.set(t.x1, 0.6, t.z1)
    pole1.castShadow = true
    scene.add(pole1)

    const pole2 = new THREE.Mesh(poleGeo, MAT.steel)
    pole2.position.set(t.x2, 0.6, t.z2)
    pole2.castShadow = true
    scene.add(pole2)

    const dx = t.x2 - t.x1
    const dz = t.z2 - t.z1
    const len = Math.sqrt(dx * dx + dz * dz)
    const angle = Math.atan2(dx, dz)

    const tape = new THREE.Mesh(new THREE.PlaneGeometry(len, 0.1), MAT.yellowBlack)
    tape.position.set((t.x1 + t.x2) / 2, 0.9, (t.z1 + t.z2) / 2)
    tape.rotation.y = angle
    scene.add(tape)
  })
}

// ══════════════════════════════════════════════════════════════════════════
//  WARNING SIGNS (6 triangular)
// ══════════════════════════════════════════════════════════════════════════

function _createWarningSigns(scene, RAPIER, world) {
  const warnGeo = new THREE.BufferGeometry()
  const vertices = new Float32Array([0, 0.8, 0, -0.5, 0, 0, 0.5, 0, 0])
  warnGeo.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
  warnGeo.computeVertexNormals()

  const poleGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.5, 5)

  const signs = [
    { x: -55, z: -10 }, { x: 55, z: 10 },
    { x: -10, z: -55 }, { x: 10, z: 55 },
    { x: -40, z: 45 }, { x: 45, z: -45 },
  ]

  signs.forEach(s => {
    const pole = new THREE.Mesh(poleGeo, MAT.steel)
    pole.position.set(s.x, 0.75, s.z)
    pole.castShadow = true
    scene.add(pole)

    const tri = new THREE.Mesh(warnGeo, MAT.brightYellow)
    tri.position.set(s.x, 1.5, s.z)
    tri.castShadow = true
    scene.add(tri)

    // Exclamation mark
    const excl = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.3, 0.04), MAT.black)
    excl.position.set(s.x, 1.8, s.z + 0.03)
    scene.add(excl)

    const dot = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.04), MAT.black)
    dot.position.set(s.x, 1.58, s.z + 0.03)
    scene.add(dot)

    // Collider on pole
    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(s.x, 0.75, s.z)
    const body = world.createRigidBody(bd)
    world.createCollider(RAPIER.ColliderDesc.cylinder(0.75, 0.06).setFriction(0.5), body)
  })
}

// ══════════════════════════════════════════════════════════════════════════
//  BIG SIGNS ("UNDER CONSTRUCTION", "HARD HAT AREA")
// ══════════════════════════════════════════════════════════════════════════

function _createBigSigns(scene, RAPIER, world) {
  const signDefs = [
    { x: 0, z: -50, ry: 0 },
    { x: 0, z: 50, ry: Math.PI },
  ]

  const poleGeo = new THREE.CylinderGeometry(0.06, 0.06, 2.5, 5)

  signDefs.forEach(s => {
    // Two poles
    const p1 = new THREE.Mesh(poleGeo, MAT.steel)
    p1.position.set(s.x - 1.2, 1.25, s.z)
    p1.castShadow = true
    scene.add(p1)

    const p2 = new THREE.Mesh(poleGeo, MAT.steel)
    p2.position.set(s.x + 1.2, 1.25, s.z)
    p2.castShadow = true
    scene.add(p2)

    // Sign board
    const sign = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.8, 0.08), MAT.brightYellow)
    sign.position.set(s.x, 2.2, s.z)
    sign.rotation.y = s.ry
    sign.castShadow = true
    scene.add(sign)

    // Dark border
    const border = new THREE.Mesh(new THREE.BoxGeometry(2.9, 0.9, 0.06), MAT.black)
    border.position.set(s.x, 2.2, s.z - 0.02)
    border.rotation.y = s.ry
    scene.add(border)

    // Fixed collider
    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(s.x, 1.25, s.z)
    const body = world.createRigidBody(bd)
    world.createCollider(RAPIER.ColliderDesc.cuboid(1.4, 1.25, 0.1).setFriction(0.5), body)
  })
}

// ══════════════════════════════════════════════════════════════════════════
//  SAND/GRAVEL PILES (4)
// ══════════════════════════════════════════════════════════════════════════

function _createSandPiles(scene) {
  const piles = [
    { x: 30, z: -40, r: 2.5, h: 1.5, mat: MAT.sand },
    { x: -25, z: 40, r: 2.0, h: 1.2, mat: MAT.sand },
    { x: 45, z: 5, r: 1.8, h: 1.0, mat: MAT.gravel },
    { x: -50, z: -35, r: 1.5, h: 0.8, mat: MAT.gravel },
  ]

  piles.forEach(p => {
    const cone = new THREE.Mesh(new THREE.ConeGeometry(p.r, p.h, 7), p.mat)
    cone.position.set(p.x, p.h / 2, p.z)
    cone.castShadow = true
    cone.receiveShadow = true
    scene.add(cone)
  })
}

// ══════════════════════════════════════════════════════════════════════════
//  CONCRETE PIPE STACKS (3)
// ══════════════════════════════════════════════════════════════════════════

function _createConcretePipeStacks(scene, RAPIER, world) {
  const stacks = [
    { x: -15, z: -15 },
    { x: 40, z: 20 },
    { x: -45, z: -40 },
  ]

  const pipeGeo = new THREE.CylinderGeometry(0.6, 0.6, 2.5, 8)
  const innerGeo = new THREE.CylinderGeometry(0.45, 0.45, 2.55, 8)
  const innerMat = new THREE.MeshStandardMaterial({ color: '#616161', flatShading: true })

  stacks.forEach(s => {
    const pipes = [
      { dx: 0, y: 0.6, dz: 0 },
      { dx: 0, y: 0.6, dz: 0.9 },
      { dx: 0, y: 1.7, dz: 0.45 },
    ]

    pipes.forEach(p => {
      const pg = new THREE.Group()

      const pipe = new THREE.Mesh(pipeGeo, MAT.concrete)
      pipe.rotation.z = Math.PI / 2
      pipe.castShadow = true
      pg.add(pipe)

      const inner = new THREE.Mesh(innerGeo, innerMat)
      inner.rotation.z = Math.PI / 2
      pg.add(inner)

      pg.position.set(s.x + p.dx, p.y, s.z + p.dz)
      scene.add(pg)
    })

    // Fixed collider
    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(s.x, 0.8, s.z + 0.45)
    const body = world.createRigidBody(bd)
    world.createCollider(RAPIER.ColliderDesc.cuboid(1.3, 1.2, 1.0).setFriction(0.5), body)
  })
}

// ══════════════════════════════════════════════════════════════════════════
//  STEEL BEAMS (10, dynamic!)
// ══════════════════════════════════════════════════════════════════════════

function _createSteelBeams(scene, RAPIER, world, syncList) {
  const beamGeo = new THREE.BoxGeometry(0.2, 0.2, 4.0)

  const beams = [
    { x: 8, z: -8, y: 0.1, r: 0.1 },
    { x: 8.1, z: -7.7, y: 0.3, r: -0.05 },
    { x: 7.9, z: -8.1, y: 0.5, r: 0.15 },
    { x: -30, z: 10, y: 0.1, r: 0.8 },
    { x: -30.2, z: 10.3, y: 0.3, r: 0.75 },
    { x: 35, z: -10, y: 0.1, r: -0.3 },
    { x: 35.1, z: -10.2, y: 0.3, r: -0.25 },
    { x: -15, z: 30, y: 0.1, r: 1.2 },
    { x: 20, z: 40, y: 0.1, r: 0.5 },
    { x: -40, z: -15, y: 0.1, r: -0.6 },
  ]

  beams.forEach(b => {
    const mesh = new THREE.Mesh(beamGeo, MAT.steel)
    mesh.position.set(b.x, b.y, b.z)
    mesh.rotation.y = b.r
    mesh.castShadow = true
    scene.add(mesh)

    const bd = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(b.x, b.y + 0.1, b.z)
      .setLinearDamping(0.3)
      .setAngularDamping(0.3)
    const body = world.createRigidBody(bd)
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
//  BRICK STACKS (3, top bricks dynamic)
// ══════════════════════════════════════════════════════════════════════════

function _createBrickStacks(scene, RAPIER, world, syncList) {
  const stacks = [
    { x: -20, z: -35 },
    { x: 25, z: 25 },
    { x: -35, z: -5 },
  ]

  const brickGeo = new THREE.BoxGeometry(0.4, 0.2, 0.2)
  const brickMat = new THREE.MeshStandardMaterial({ color: '#A0522D', flatShading: true })

  stacks.forEach(s => {
    // Base (static grid 4x3x2)
    for (let row = 0; row < 2; row++) {
      for (let col = 0; col < 4; col++) {
        for (let dep = 0; dep < 3; dep++) {
          const brick = new THREE.Mesh(brickGeo, brickMat)
          brick.position.set(
            s.x + col * 0.42 - 0.63,
            row * 0.22 + 0.1,
            s.z + dep * 0.22 - 0.22
          )
          brick.castShadow = true
          scene.add(brick)
        }
      }
    }

    // Fixed collider for base
    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(s.x, 0.22, s.z)
    const body = world.createRigidBody(bd)
    world.createCollider(RAPIER.ColliderDesc.cuboid(0.9, 0.22, 0.4).setFriction(0.5), body)

    // Top row (dynamic — can be knocked off!)
    for (let col = 0; col < 4; col++) {
      for (let dep = 0; dep < 2; dep++) {
        const brick = new THREE.Mesh(brickGeo, brickMat)
        const bx = s.x + col * 0.42 - 0.63
        const by = 0.54
        const bz = s.z + dep * 0.22 - 0.11
        brick.position.set(bx, by, bz)
        brick.castShadow = true
        scene.add(brick)

        const bbd = RAPIER.RigidBodyDesc.dynamic()
          .setTranslation(bx, by, bz)
          .setLinearDamping(0.3)
          .setAngularDamping(0.3)
        const bbody = world.createRigidBody(bbd)
        world.createCollider(
          RAPIER.ColliderDesc.cuboid(0.2, 0.1, 0.1)
            .setDensity(4.0)
            .setFriction(0.6)
            .setRestitution(0.05),
          bbody
        )
        syncList.push({ mesh: brick, body: bbody })
      }
    }
  })
}

// ══════════════════════════════════════════════════════════════════════════
//  LUMBER STACKS (2)
// ══════════════════════════════════════════════════════════════════════════

function _createLumberStacks(scene, RAPIER, world) {
  const stacks = [
    { x: 15, z: -45 },
    { x: -50, z: 15 },
  ]

  const plankGeo = new THREE.BoxGeometry(0.2, 0.15, 3.0)

  stacks.forEach(s => {
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 3; col++) {
        const plank = new THREE.Mesh(plankGeo, MAT.woodLight)
        plank.position.set(s.x + col * 0.25 - 0.25, row * 0.17 + 0.075, s.z)
        plank.castShadow = true
        scene.add(plank)
      }
    }

    // Fixed collider
    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(s.x, 0.35, s.z)
    const body = world.createRigidBody(bd)
    world.createCollider(RAPIER.ColliderDesc.cuboid(0.5, 0.35, 1.5).setFriction(0.5), body)
  })
}

// ══════════════════════════════════════════════════════════════════════════
//  CEMENT BAGS
// ══════════════════════════════════════════════════════════════════════════

function _createCementBags(scene, RAPIER, world) {
  const stacks = [
    { x: -8, z: 35 },
    { x: 45, z: -40 },
  ]

  const bagGeo = new THREE.BoxGeometry(0.6, 0.3, 0.4)

  stacks.forEach(s => {
    // Stack of bags (3 rows, 2 wide)
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 2; col++) {
        const bag = new THREE.Mesh(bagGeo, MAT.cementBag)
        bag.position.set(s.x + col * 0.65 - 0.325, row * 0.32 + 0.15, s.z)
        bag.castShadow = true
        scene.add(bag)
      }
    }

    // Fixed collider
    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(s.x, 0.5, s.z)
    const body = world.createRigidBody(bd)
    world.createCollider(RAPIER.ColliderDesc.cuboid(0.7, 0.5, 0.3).setFriction(0.5), body)
  })
}

// ══════════════════════════════════════════════════════════════════════════
//  PORTA-POTTIES (4)
// ══════════════════════════════════════════════════════════════════════════

function _createPortaPotties(scene, RAPIER, world) {
  const potties = [
    { x: -50, z: -25, ry: 0.3 },
    { x: 50, z: -20, ry: -0.2 },
    { x: -45, z: 45, ry: 1.0 },
    { x: 45, z: 45, ry: -0.5 },
  ]

  potties.forEach(p => {
    const g = new THREE.Group()
    g.position.set(p.x, 0, p.z)
    g.rotation.y = p.ry

    // Body
    const body1 = new THREE.Mesh(new THREE.BoxGeometry(1.0, 2.2, 1.0), MAT.portaBlue)
    body1.position.set(0, 1.1, 0)
    body1.castShadow = true
    g.add(body1)

    // Roof (slightly bigger)
    const roof = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.1, 1.1), MAT.portaBlue)
    roof.position.set(0, 2.25, 0)
    g.add(roof)

    // Door detail
    const door = new THREE.Mesh(new THREE.BoxGeometry(0.02, 1.8, 0.7), MAT.darkGray)
    door.position.set(0.51, 1.0, 0)
    g.add(door)

    // Vent
    const vent = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.3, 0.02), MAT.darkGray)
    vent.position.set(0, 1.8, 0.51)
    g.add(vent)

    scene.add(g)

    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(p.x, 1.1, p.z)
    const rbody = world.createRigidBody(bd)
    world.createCollider(RAPIER.ColliderDesc.cuboid(0.5, 1.1, 0.5).setFriction(0.5), rbody)
  })
}

// ══════════════════════════════════════════════════════════════════════════
//  TOOL SHEDS (3)
// ══════════════════════════════════════════════════════════════════════════

function _createToolSheds(scene, RAPIER, world) {
  const sheds = [
    { x: -55, z: 0, ry: 0 },
    { x: 55, z: -5, ry: Math.PI },
    { x: 0, z: -55, ry: 0.5 },
  ]

  sheds.forEach(s => {
    const g = new THREE.Group()
    g.position.set(s.x, 0, s.z)
    g.rotation.y = s.ry

    // Walls
    const body1 = new THREE.Mesh(new THREE.BoxGeometry(3.0, 2.0, 2.0), MAT.steel)
    body1.position.set(0, 1.0, 0)
    body1.castShadow = true
    g.add(body1)

    // Roof
    const roof = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.1, 2.2), MAT.darkGray)
    roof.position.set(0, 2.05, 0)
    g.add(roof)

    // Door
    const door = new THREE.Mesh(new THREE.BoxGeometry(0.02, 1.6, 1.0), MAT.darkGray)
    door.position.set(1.51, 0.8, 0)
    g.add(door)

    scene.add(g)

    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(s.x, 1.0, s.z)
    const rbody = world.createRigidBody(bd)
    world.createCollider(RAPIER.ColliderDesc.cuboid(1.5, 1.0, 1.0).setFriction(0.5), rbody)
  })
}

// ══════════════════════════════════════════════════════════════════════════
//  GENERATORS (3)
// ══════════════════════════════════════════════════════════════════════════

function _createGenerators(scene, RAPIER, world) {
  const gens = [
    { x: -48, z: 30 },
    { x: 48, z: 35 },
    { x: 5, z: 45 },
  ]

  gens.forEach(g2 => {
    const g = new THREE.Group()
    g.position.set(g2.x, 0, g2.z)

    // Main body
    const body1 = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.0, 1.0), MAT.darkGray)
    body1.position.set(0, 0.5, 0)
    body1.castShadow = true
    g.add(body1)

    // Control panel
    const panel = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.5, 0.6), MAT.steel)
    panel.position.set(0.76, 0.6, 0)
    g.add(panel)

    // Panel lights (small colored boxes)
    const light1 = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.08, 0.08), MAT.green)
    light1.position.set(0.78, 0.7, 0.1)
    g.add(light1)
    const light2 = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.08, 0.08), MAT.red)
    light2.position.set(0.78, 0.7, -0.1)
    g.add(light2)

    // Exhaust
    const exhaust = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.4, 6), MAT.darkGray)
    exhaust.position.set(0, 1.2, 0)
    g.add(exhaust)

    scene.add(g)

    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(g2.x, 0.5, g2.z)
    const rbody = world.createRigidBody(bd)
    world.createCollider(RAPIER.ColliderDesc.cuboid(0.75, 0.5, 0.5).setFriction(0.5), rbody)
  })
}

// ══════════════════════════════════════════════════════════════════════════
//  FUEL TANKS (2)
// ══════════════════════════════════════════════════════════════════════════

function _createFuelTanks(scene, RAPIER, world) {
  const tanks = [
    { x: -52, z: -15 },
    { x: 52, z: 25 },
  ]

  tanks.forEach(t => {
    const g = new THREE.Group()
    g.position.set(t.x, 0, t.z)

    // Container body
    const body1 = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.2, 2.5), MAT.fuelGreen)
    body1.position.set(0, 0.6, 0)
    body1.castShadow = true
    g.add(body1)

    // Legs
    ;[[-0.5, 0.15, -0.8], [0.5, 0.15, -0.8], [-0.5, 0.15, 0.8], [0.5, 0.15, 0.8]].forEach(([lx, ly, lz]) => {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.3, 0.1), MAT.darkGray)
      leg.position.set(lx, ly, lz)
      g.add(leg)
    })

    // Fuel nozzle
    const nozzle = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.4, 6), MAT.black)
    nozzle.position.set(0.6, 0.8, 1.3)
    nozzle.rotation.z = Math.PI / 4
    g.add(nozzle)

    // Warning diamond
    const diamond = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.02), MAT.red)
    diamond.position.set(0, 0.8, 1.26)
    diamond.rotation.z = Math.PI / 4
    g.add(diamond)

    scene.add(g)

    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(t.x, 0.6, t.z)
    const rbody = world.createRigidBody(bd)
    world.createCollider(RAPIER.ColliderDesc.cuboid(0.6, 0.6, 1.25).setFriction(0.5), rbody)
  })
}

// ══════════════════════════════════════════════════════════════════════════
//  DUMPSTERS (3)
// ══════════════════════════════════════════════════════════════════════════

function _createDumpsters(scene, RAPIER, world) {
  const dumpsters = [
    { x: -35, z: 40, ry: 0.3 },
    { x: 35, z: -45, ry: -0.5 },
    { x: 50, z: 10, ry: 1.0 },
  ]

  dumpsters.forEach(d => {
    const g = new THREE.Group()
    g.position.set(d.x, 0, d.z)
    g.rotation.y = d.ry

    // Body (open-top box)
    const bottom = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.1, 1.2), MAT.fuelGreen)
    bottom.position.set(0, 0.4, 0)
    g.add(bottom)

    // Sides
    const sideGeo = new THREE.BoxGeometry(0.08, 1.0, 1.2)
    ;[-1.0, 1.0].forEach(side => {
      const s = new THREE.Mesh(sideGeo, MAT.fuelGreen)
      s.position.set(side, 0.9, 0)
      s.castShadow = true
      g.add(s)
    })

    // Front/back
    const fbGeo = new THREE.BoxGeometry(2.0, 1.0, 0.08)
    ;[-0.6, 0.6].forEach(fz => {
      const f = new THREE.Mesh(fbGeo, MAT.fuelGreen)
      f.position.set(0, 0.9, fz)
      f.castShadow = true
      g.add(f)
    })

    // Legs
    ;[[-0.8, 0.2, 0], [0.8, 0.2, 0]].forEach(([lx, ly, lz]) => {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.4, 1.0), MAT.darkGray)
      leg.position.set(lx, ly, lz)
      g.add(leg)
    })

    scene.add(g)

    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(d.x, 0.7, d.z)
    const rbody = world.createRigidBody(bd)
    world.createCollider(RAPIER.ColliderDesc.cuboid(1.0, 0.7, 0.6).setFriction(0.5), rbody)
  })
}

// ══════════════════════════════════════════════════════════════════════════
//  GROUND FEATURES (tire tracks, puddles, foundation trenches, concrete pads)
// ══════════════════════════════════════════════════════════════════════════

function _createGroundFeatures(scene) {
  // Tire tracks
  const trackGeo = new THREE.PlaneGeometry(0.3, 12, 1, 1)
  const tracks = [
    { x: -4, z: 2, rot: 0.3 }, { x: 3, z: -3, rot: -0.2 },
    { x: -1, z: 6, rot: 0.8 }, { x: 5, z: 1, rot: -0.5 },
    { x: -20, z: -15, rot: 0.4 }, { x: 15, z: -25, rot: -0.6 },
    { x: 30, z: 15, rot: 0.2 }, { x: -35, z: 10, rot: -0.1 },
    { x: -10, z: 30, rot: 1.0 }, { x: 25, z: -35, rot: -0.8 },
  ]
  tracks.forEach(t => {
    const m = new THREE.Mesh(trackGeo, MAT.darkBrown)
    m.rotation.x = -Math.PI / 2
    m.rotation.z = t.rot
    m.position.set(t.x, 0.018, t.z)
    m.receiveShadow = true
    scene.add(m)
  })

  // Puddles
  const puddleGeo = new THREE.CircleGeometry(1.2, 6)
  const puddles = [
    { x: 6, z: -4, s: 1.0 }, { x: -7, z: 5, s: 0.7 },
    { x: 2, z: 9, s: 0.85 }, { x: -25, z: -20, s: 1.2 },
    { x: 30, z: 25, s: 0.6 }, { x: -40, z: 15, s: 0.9 },
    { x: 15, z: -40, s: 1.1 }, { x: -10, z: 45, s: 0.8 },
  ]
  puddles.forEach(p => {
    const m = new THREE.Mesh(puddleGeo, MAT.puddle)
    m.rotation.x = -Math.PI / 2
    m.position.set(p.x, 0.02, p.z)
    m.scale.setScalar(p.s)
    scene.add(m)
  })

  // Foundation trenches (shallow dark rectangles)
  const trenchMat = new THREE.MeshStandardMaterial({ color: '#5D4037', flatShading: true })
  const trenches = [
    { x: 25, z: -30, w: 8, d: 4 },
    { x: -30, z: 30, w: 6, d: 6 },
    { x: 10, z: 40, w: 5, d: 3 },
    { x: -45, z: -10, w: 4, d: 7 },
  ]
  trenches.forEach(t => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(t.w, t.d), trenchMat)
    m.rotation.x = -Math.PI / 2
    m.position.set(t.x, 0.012, t.z)
    m.receiveShadow = true
    scene.add(m)
  })

  // Concrete pads
  const padMat = new THREE.MeshStandardMaterial({ color: '#BDBDBD', flatShading: true })
  const pads = [
    { x: -15, z: -35, w: 6, d: 4 },
    { x: 35, z: 10, w: 5, d: 5 },
    { x: -40, z: 35, w: 4, d: 6 },
    { x: 15, z: -15, w: 3, d: 3 },
  ]
  pads.forEach(p => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(p.w, p.d), padMat)
    m.rotation.x = -Math.PI / 2
    m.position.set(p.x, 0.015, p.z)
    m.receiveShadow = true
    scene.add(m)
  })
}

// ══════════════════════════════════════════════════════════════════════════
//  DYNAMIC HARD HATS (8, very light)
// ══════════════════════════════════════════════════════════════════════════

function _createDynamicHardHats(scene, RAPIER, world, syncList) {
  const hatGeo = new THREE.SphereGeometry(0.2, 6, 4, 0, Math.PI * 2, 0, Math.PI / 2)

  const hats = [
    [-5, -5], [8, 12], [-15, -25], [18, -30],
    [-28, 20], [35, -15], [-40, -35], [10, 38],
  ]

  hats.forEach(([hx, hz]) => {
    const mesh = new THREE.Mesh(hatGeo, MAT.brightYellow)
    mesh.position.set(hx, 0.2, hz)
    mesh.castShadow = true
    scene.add(mesh)

    const bd = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(hx, 0.2, hz)
      .setLinearDamping(0.1)
      .setAngularDamping(0.1)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.ball(0.2)
        .setDensity(0.5)
        .setFriction(0.3)
        .setRestitution(0.4),
      body
    )
    syncList.push({ mesh, body })
  })
}

// ══════════════════════════════════════════════════════════════════════════
//  DYNAMIC WOODEN PLANKS (6)
// ══════════════════════════════════════════════════════════════════════════

function _createDynamicPlanks(scene, RAPIER, world, syncList) {
  const plankGeo = new THREE.BoxGeometry(0.3, 0.1, 2.0)

  const planks = [
    { x: -10, z: 10, r: 0.5 },
    { x: 12, z: -18, r: -0.3 },
    { x: -25, z: -10, r: 0.8 },
    { x: 30, z: 18, r: -1.0 },
    { x: -5, z: 30, r: 0.2 },
    { x: 20, z: -40, r: 1.5 },
  ]

  planks.forEach(p => {
    const mesh = new THREE.Mesh(plankGeo, MAT.wood)
    mesh.position.set(p.x, 0.05, p.z)
    mesh.rotation.y = p.r
    mesh.castShadow = true
    scene.add(mesh)

    const bd = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(p.x, 0.1, p.z)
      .setLinearDamping(0.3)
      .setAngularDamping(0.3)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(0.15, 0.05, 1.0)
        .setDensity(2.0)
        .setFriction(0.5)
        .setRestitution(0.1),
      body
    )
    syncList.push({ mesh, body })
  })
}

// ══════════════════════════════════════════════════════════════════════════
//  DYNAMIC PAINT CANS (5)
// ══════════════════════════════════════════════════════════════════════════

function _createDynamicPaintCans(scene, RAPIER, world, syncList) {
  const canGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.3, 6)

  const colors = ['#E53935', '#1E88E5', '#43A047', '#FFB300', '#8E24AA']
  const positions = [
    [-8, -15], [5, 20], [-18, 8], [22, -12], [-30, -30],
  ]

  positions.forEach(([cx, cz], i) => {
    const mat = new THREE.MeshStandardMaterial({ color: colors[i], flatShading: true })
    const mesh = new THREE.Mesh(canGeo, mat)
    mesh.position.set(cx, 0.15, cz)
    mesh.castShadow = true
    scene.add(mesh)

    const bd = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(cx, 0.15, cz)
      .setLinearDamping(0.2)
      .setAngularDamping(0.2)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cylinder(0.15, 0.12)
        .setDensity(3.0)
        .setFriction(0.4)
        .setRestitution(0.2),
      body
    )
    syncList.push({ mesh, body })
  })
}

// ══════════════════════════════════════════════════════════════════════════
//  DYNAMIC TOOLBOXES (4)
// ══════════════════════════════════════════════════════════════════════════

function _createDynamicToolboxes(scene, RAPIER, world, syncList) {
  const boxGeo = new THREE.BoxGeometry(0.5, 0.25, 0.3)

  const positions = [
    [-12, 15], [18, -25], [-30, 5], [25, 35],
  ]

  positions.forEach(([cx, cz]) => {
    const mesh = new THREE.Mesh(boxGeo, MAT.red)
    mesh.position.set(cx, 0.125, cz)
    mesh.castShadow = true
    scene.add(mesh)

    // Handle
    const handle = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.05, 0.04), MAT.darkGray)
    handle.position.set(0, 0.15, 0)
    mesh.add(handle)

    const bd = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(cx, 0.15, cz)
      .setLinearDamping(0.3)
      .setAngularDamping(0.3)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(0.25, 0.125, 0.15)
        .setDensity(4.0)
        .setFriction(0.5)
        .setRestitution(0.1),
      body
    )
    syncList.push({ mesh, body })
  })
}

// ══════════════════════════════════════════════════════════════════════════
//  DYNAMIC WHEELBARROWS (3)
// ══════════════════════════════════════════════════════════════════════════

function _createDynamicWheelbarrows(scene, RAPIER, world, syncList) {
  const positions = [
    { x: -5, z: -20, r: 0.4 },
    { x: 15, z: 28, r: -0.6 },
    { x: -35, z: -15, r: 1.2 },
  ]

  positions.forEach(p => {
    const g = new THREE.Group()

    // Tray (wedge shape approximated by a box)
    const tray = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.3, 1.0), MAT.steel)
    tray.position.set(0, 0.3, 0)
    tray.rotation.x = -0.15
    tray.castShadow = true
    g.add(tray)

    // Handles
    ;[-0.25, 0.25].forEach(side => {
      const handle = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.8), MAT.wood)
      handle.position.set(side, 0.25, -0.8)
      g.add(handle)
    })

    // Front wheel
    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.1, 8), MAT.black)
    wheel.position.set(0, 0.15, 0.6)
    wheel.rotation.z = Math.PI / 2
    g.add(wheel)

    g.position.set(p.x, 0, p.z)
    g.rotation.y = p.r
    scene.add(g)

    const bd = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(p.x, 0.3, p.z)
      .setLinearDamping(0.4)
      .setAngularDamping(0.4)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(0.35, 0.2, 0.6)
        .setDensity(2.5)
        .setFriction(0.4)
        .setRestitution(0.1),
      body
    )
    syncList.push({ mesh: g, body })
  })
}

// ══════════════════════════════════════════════════════════════════════════
//  DYNAMIC BARRELS (6)
// ══════════════════════════════════════════════════════════════════════════

function _createDynamicBarrels(scene, RAPIER, world, syncList) {
  const barrelGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.8, 8)

  const barrels = [
    { x: -12, z: -35, mat: MAT.rust },
    { x: 20, z: 15, mat: MAT.blue },
    { x: -25, z: 25, mat: MAT.rust },
    { x: 40, z: -20, mat: MAT.fuelGreen },
    { x: -50, z: 5, mat: MAT.rust },
    { x: 30, z: 50, mat: MAT.blue },
  ]

  barrels.forEach(b => {
    const mesh = new THREE.Mesh(barrelGeo, b.mat)
    mesh.position.set(b.x, 0.4, b.z)
    mesh.castShadow = true
    scene.add(mesh)

    // Rim details
    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.03, 4, 8), MAT.darkGray)
    rim.position.set(0, 0.35, 0)
    mesh.add(rim)

    const bd = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(b.x, 0.4, b.z)
      .setLinearDamping(0.2)
      .setAngularDamping(0.2)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cylinder(0.4, 0.3)
        .setDensity(3.0)
        .setFriction(0.4)
        .setRestitution(0.15),
      body
    )
    syncList.push({ mesh, body })
  })
}

// ══════════════════════════════════════════════════════════════════════════
//  DYNAMIC CINDER BLOCKS (4)
// ══════════════════════════════════════════════════════════════════════════

function _createDynamicCinderBlocks(scene, RAPIER, world, syncList) {
  const blockGeo = new THREE.BoxGeometry(0.4, 0.2, 0.2)

  const blocks = [
    [5, -25], [-15, 15], [25, -5], [-20, 40],
  ]

  blocks.forEach(([bx, bz]) => {
    const mesh = new THREE.Mesh(blockGeo, MAT.concrete)
    mesh.position.set(bx, 0.1, bz)
    mesh.castShadow = true
    scene.add(mesh)

    const bd = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(bx, 0.15, bz)
      .setLinearDamping(0.3)
      .setAngularDamping(0.3)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(0.2, 0.1, 0.1)
        .setDensity(5.0)
        .setFriction(0.6)
        .setRestitution(0.05),
      body
    )
    syncList.push({ mesh, body })
  })
}
