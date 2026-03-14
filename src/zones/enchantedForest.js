import * as THREE from 'three'

// ── reusable temporaries ────────────────────────────────────
const _v3 = new THREE.Vector3()
const _q  = new THREE.Quaternion()
const _euler = new THREE.Euler()

// ── zone center ─────────────────────────────────────────────
const CX = -45
const CZ = -30

// ── color palettes ──────────────────────────────────────────
const TRUNK_COLOR     = 0x4a3728
const TRUNK_DARK      = 0x3b2a1a
const FOLIAGE_COLORS  = [0x1b5e20, 0x2e7d32, 0x558b2f, 0x33691e, 0x4caf50, 0x6d8b3a]
const MUSHROOM_CAPS   = [0xc62828, 0x7b1fa2, 0x1565c0, 0xe65100]
const FAIRY_COLORS    = [0xffee58, 0x81d4fa, 0xa5d6a7, 0xf48fb1, 0xfff9c4, 0xce93d8]
const ROCK_COLORS     = [0x757575, 0x9e9e9e, 0x616161, 0x8d8d8d]
const FLOWER_COLORS   = [0xff5252, 0xffeb3b, 0xe040fb, 0x448aff, 0xff6e40, 0xeeff41]
const FOREST_FLOOR    = 0x2d5a27
const STREAM_COLOR    = 0x4fc3f7

// ── helpers ─────────────────────────────────────────────────
function mat(color, opts = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    flatShading: true,
    roughness: opts.roughness ?? 0.85,
    metalness: opts.metalness ?? 0.05,
    transparent: opts.transparent ?? false,
    opacity: opts.opacity ?? 1.0,
    emissive: opts.emissive ?? 0x000000,
    emissiveIntensity: opts.emissiveIntensity ?? 0,
    side: opts.side ?? THREE.FrontSide,
  })
}

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)] }
function rand(lo, hi) { return lo + Math.random() * (hi - lo) }
function spreadXZ(r) {
  const a = Math.random() * Math.PI * 2
  const d = Math.random() * r
  return [CX + Math.cos(a) * d, CZ + Math.sin(a) * d]
}

// ── main export ─────────────────────────────────────────────
export function createEnchantedForest(scene, RAPIER, world) {
  const syncList = []
  const fairyLights = []
  const butterflies = []
  const allMeshes = [] // for easy cleanup if ever needed

  function addMesh(m, shadow = true) {
    if (shadow) { m.castShadow = true; m.receiveShadow = true }
    scene.add(m)
    allMeshes.push(m)
    return m
  }

  // ═══════════════════════════════════════════════════════════
  //  FOREST FLOOR
  // ═══════════════════════════════════════════════════════════
  {
    const geo = new THREE.CircleGeometry(22, 12)
    const m = new THREE.Mesh(geo, mat(FOREST_FLOOR, { roughness: 1.0 }))
    m.rotation.x = -Math.PI / 2
    m.position.set(CX, 0.015, CZ)
    m.receiveShadow = true
    scene.add(m)
    allMeshes.push(m)
  }

  // ═══════════════════════════════════════════════════════════
  //  TREES  (18 trees, dense cluster)
  // ═══════════════════════════════════════════════════════════
  const treePositions = [
    // inner ring — tight cluster
    [-42, -28], [-44, -26], [-47, -29], [-43, -33], [-46, -32],
    [-48, -27], [-41, -31], [-44, -35], [-49, -31], [-40, -27],
    // outer ring — fill edges
    [-38, -25], [-50, -34], [-39, -34], [-51, -28], [-37, -30],
    [-46, -24], [-42, -37], [-50, -25],
  ]

  treePositions.forEach((pos, i) => {
    const x = pos[0]
    const z = pos[1]
    const isAncient = i < 3 // first 3 are ancient thick trees
    const isRound   = i % 3 === 0 // every 3rd tree gets round canopy

    const trunkRadius = isAncient ? rand(0.4, 0.6) : rand(0.12, 0.25)
    const trunkHeight = isAncient ? rand(3.5, 5.0) : rand(1.8, 4.0)
    const foliageColor = pick(FOLIAGE_COLORS)

    // trunk
    const trunkGeo = new THREE.CylinderGeometry(trunkRadius * 0.7, trunkRadius, trunkHeight, 6)
    const trunk = new THREE.Mesh(trunkGeo, mat(isAncient ? TRUNK_DARK : TRUNK_COLOR))
    trunk.position.set(x, trunkHeight / 2, z)
    addMesh(trunk)

    // canopy
    let canopy
    if (isRound) {
      const r = isAncient ? rand(2.5, 3.5) : rand(1.0, 1.8)
      const cGeo = new THREE.SphereGeometry(r, 6, 5)
      canopy = new THREE.Mesh(cGeo, mat(foliageColor))
      canopy.position.set(x, trunkHeight + r * 0.4, z)
      canopy.scale.y = rand(0.7, 0.9)
    } else {
      const r = isAncient ? rand(2.0, 3.0) : rand(0.8, 1.6)
      const h = isAncient ? rand(3.0, 4.5) : rand(1.5, 3.0)
      const cGeo = new THREE.ConeGeometry(r, h, 6)
      canopy = new THREE.Mesh(cGeo, mat(foliageColor))
      canopy.position.set(x, trunkHeight + h * 0.35, z)
    }

    // some trees lean
    if (!isAncient && Math.random() > 0.5) {
      const lean = rand(-0.12, 0.12)
      trunk.rotation.z = lean
      canopy.rotation.z = lean
      canopy.position.x += lean * trunkHeight * 0.3
    }

    addMesh(canopy)

    // Ancient trees get a second canopy layer
    if (isAncient) {
      const r2 = rand(1.5, 2.2)
      const extra = new THREE.Mesh(
        new THREE.SphereGeometry(r2, 6, 5),
        mat(pick(FOLIAGE_COLORS))
      )
      extra.position.set(x + rand(-0.8, 0.8), trunkHeight * 0.7, z + rand(-0.8, 0.8))
      extra.scale.y = 0.7
      addMesh(extra)
    }

    // RAPIER — fixed collider for trunk
    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(x, trunkHeight / 2, z)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cylinder(trunkHeight / 2, trunkRadius).setFriction(0.5),
      body
    )
  })

  // ═══════════════════════════════════════════════════════════
  //  GIANT MUSHROOMS  (8)
  // ═══════════════════════════════════════════════════════════
  const mushroomData = [
    { x: CX + 3,  z: CZ + 5,  h: 2.5, r: 1.2, color: 0xc62828, spots: true,  collider: true  },
    { x: CX - 6,  z: CZ + 2,  h: 3.0, r: 1.4, color: 0x7b1fa2, spots: false, collider: true  },
    { x: CX + 7,  z: CZ - 3,  h: 1.5, r: 0.8, color: 0x1565c0, spots: false, collider: false },
    { x: CX - 2,  z: CZ - 7,  h: 0.8, r: 0.5, color: 0xc62828, spots: true,  collider: false },
    { x: CX + 5,  z: CZ + 8,  h: 0.5, r: 0.4, color: 0xe65100, spots: false, collider: false },
    { x: CX - 8,  z: CZ - 4,  h: 1.8, r: 0.9, color: 0xc62828, spots: true,  collider: false },
    { x: CX + 1,  z: CZ + 10, h: 0.6, r: 0.35,color: 0x7b1fa2, spots: false, collider: false },
    { x: CX - 4,  z: CZ + 7,  h: 2.0, r: 1.0, color: 0xe65100, spots: false, collider: false },
  ]

  mushroomData.forEach(md => {
    const stemR = md.r * 0.25
    const stemH = md.h
    // stem
    const stemGeo = new THREE.CylinderGeometry(stemR, stemR * 1.2, stemH, 6)
    const stem = new THREE.Mesh(stemGeo, mat(0xf5f0e8))
    stem.position.set(md.x, stemH / 2, md.z)
    addMesh(stem)

    // cap — hemisphere
    const capGeo = new THREE.SphereGeometry(md.r, 7, 5, 0, Math.PI * 2, 0, Math.PI / 2)
    const cap = new THREE.Mesh(capGeo, mat(md.color))
    cap.position.set(md.x, stemH, md.z)
    cap.scale.y = 0.55
    addMesh(cap)

    // white spots on red caps
    if (md.spots) {
      const spotCount = Math.floor(rand(4, 8))
      for (let s = 0; s < spotCount; s++) {
        const theta = rand(0, Math.PI * 2)
        const phi = rand(0.15, 0.7)
        const sr = md.r * 0.97
        const sx = md.x + sr * Math.sin(phi) * Math.cos(theta)
        const sy = stemH + sr * Math.cos(phi) * 0.55
        const sz = md.z + sr * Math.sin(phi) * Math.sin(theta)
        const spotGeo = new THREE.CircleGeometry(md.r * 0.1, 5)
        const spot = new THREE.Mesh(spotGeo, mat(0xffffff))
        spot.position.set(sx, sy, sz)
        spot.lookAt(md.x, stemH, md.z)
        scene.add(spot)
        allMeshes.push(spot)
      }
    }

    // collider for large mushrooms
    if (md.collider) {
      const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(md.x, stemH / 2, md.z)
      const body = world.createRigidBody(bd)
      world.createCollider(
        RAPIER.ColliderDesc.cylinder(stemH / 2, md.r * 0.6).setFriction(0.5),
        body
      )
    }
  })

  // ═══════════════════════════════════════════════════════════
  //  FAIRY LIGHTS  (12 glowing orbs)
  // ═══════════════════════════════════════════════════════════
  for (let i = 0; i < 12; i++) {
    const [fx, fz] = spreadXZ(16)
    const fy = rand(1.5, 5.5)
    const color = pick(FAIRY_COLORS)
    const radius = rand(0.08, 0.18)

    const geo = new THREE.SphereGeometry(radius, 5, 4)
    const fMat = new THREE.MeshStandardMaterial({
      color,
      flatShading: true,
      emissive: color,
      emissiveIntensity: 1.5,
      transparent: true,
      opacity: rand(0.7, 1.0),
    })
    const orb = new THREE.Mesh(geo, fMat)
    orb.position.set(fx, fy, fz)
    scene.add(orb)
    allMeshes.push(orb)

    // PointLight for the larger ones
    if (radius > 0.12) {
      const pl = new THREE.PointLight(color, 0.6, 6, 2)
      pl.position.set(fx, fy, fz)
      scene.add(pl)
    }

    fairyLights.push({
      mesh: orb,
      baseY: fy,
      phase: rand(0, Math.PI * 2),
      speed: rand(0.8, 1.6),
      pulses: Math.random() > 0.5, // firefly pulsing
      pulseSpeed: rand(1.5, 3.0),
    })
  }

  // ═══════════════════════════════════════════════════════════
  //  STREAM  (winding narrow blue transparent plane)
  // ═══════════════════════════════════════════════════════════
  {
    // Build stream as several overlapping planes to create a winding path
    const streamSegments = [
      { x: CX - 10, z: CZ - 8, w: 2.0, l: 6, rot: 0.3 },
      { x: CX - 8,  z: CZ - 3, w: 1.8, l: 5, rot: -0.1 },
      { x: CX - 6,  z: CZ + 1, w: 2.0, l: 5, rot: 0.2 },
      { x: CX - 5,  z: CZ + 5, w: 1.6, l: 4, rot: -0.25 },
      { x: CX - 3,  z: CZ + 8, w: 2.0, l: 5, rot: 0.15 },
    ]

    const streamMat = mat(STREAM_COLOR, {
      transparent: true,
      opacity: 0.45,
      roughness: 0.2,
      metalness: 0.1,
      side: THREE.DoubleSide,
    })

    streamSegments.forEach(seg => {
      const geo = new THREE.PlaneGeometry(seg.w, seg.l, 1, 1)
      const m = new THREE.Mesh(geo, streamMat)
      m.rotation.x = -Math.PI / 2
      m.rotation.z = seg.rot
      m.position.set(seg.x, 0.02, seg.z)
      m.receiveShadow = true
      scene.add(m)
      allMeshes.push(m)
    })

    // stepping stones across stream
    const stonePositions = [
      [CX - 9, CZ - 6], [CX - 7, CZ - 1], [CX - 5.5, CZ + 3], [CX - 4, CZ + 6.5],
    ]
    stonePositions.forEach(([sx, sz]) => {
      const geo = new THREE.CylinderGeometry(rand(0.3, 0.5), rand(0.35, 0.55), 0.12, 6)
      const stone = new THREE.Mesh(geo, mat(pick(ROCK_COLORS), { roughness: 1.0 }))
      stone.position.set(sx, 0.06, sz)
      addMesh(stone)
    })
  }

  // ═══════════════════════════════════════════════════════════
  //  LOG BRIDGE
  // ═══════════════════════════════════════════════════════════
  {
    const logLen = 4.0
    const logR   = 0.35
    const bx = CX - 7, bz = CZ - 1
    const geo = new THREE.CylinderGeometry(logR, logR, logLen, 7)
    const bridge = new THREE.Mesh(geo, mat(TRUNK_COLOR))
    bridge.rotation.z = Math.PI / 2
    bridge.rotation.y = 0.1 // slight angle across stream
    bridge.position.set(bx, logR + 0.02, bz)
    addMesh(bridge)

    // fixed collider so car can drive on it
    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(bx, logR + 0.02, bz)
    const body = world.createRigidBody(bd)
    // approximate as box for drivable surface
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(logLen / 2, logR, logR).setFriction(0.7),
      body
    )
  }

  // ═══════════════════════════════════════════════════════════
  //  HOLLOW TREE STUMP  (car can drive inside)
  // ═══════════════════════════════════════════════════════════
  {
    const sx = CX + 8, sz = CZ - 6
    const outerR = 1.5, innerR = 1.1, stumpH = 1.2

    // outer cylinder
    const outerGeo = new THREE.CylinderGeometry(outerR, outerR * 1.15, stumpH, 8, 1, true)
    const stump = new THREE.Mesh(outerGeo, mat(TRUNK_DARK, { side: THREE.DoubleSide }))
    stump.position.set(sx, stumpH / 2, sz)
    addMesh(stump)

    // ring floor inside
    const ringGeo = new THREE.RingGeometry(innerR, outerR, 8)
    const ringFloor = new THREE.Mesh(ringGeo, mat(TRUNK_COLOR))
    ringFloor.rotation.x = -Math.PI / 2
    ringFloor.position.set(sx, 0.03, sz)
    addMesh(ringFloor, false)

    // moss on top rim
    const rimGeo = new THREE.TorusGeometry(outerR * 0.95, 0.12, 5, 8)
    const rim = new THREE.Mesh(rimGeo, mat(0x4a7a3a))
    rim.rotation.x = Math.PI / 2
    rim.position.set(sx, stumpH, sz)
    addMesh(rim)

    // fixed collider — hollow ring (approximate with 4 thin walls)
    for (let a = 0; a < 4; a++) {
      const angle = (a / 4) * Math.PI * 2
      const wx = sx + Math.cos(angle) * (outerR + 0.05)
      const wz = sz + Math.sin(angle) * (outerR + 0.05)
      const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(wx, stumpH / 2, wz)
      const body = world.createRigidBody(bd)
      world.createCollider(
        RAPIER.ColliderDesc.cuboid(0.4, stumpH / 2, 0.15)
          .setRotation({ x: 0, y: Math.sin(angle / 2), z: 0, w: Math.cos(angle / 2) })
          .setFriction(0.5),
        body
      )
    }
  }

  // ═══════════════════════════════════════════════════════════
  //  FALLEN LOG  (fixed collider, on its side)
  // ═══════════════════════════════════════════════════════════
  {
    const flx = CX + 4, flz = CZ + 3
    const logLen = 5.0, logR = 0.3
    const geo = new THREE.CylinderGeometry(logR, logR * 1.1, logLen, 6)
    const fallen = new THREE.Mesh(geo, mat(TRUNK_COLOR))
    fallen.rotation.z = Math.PI / 2
    fallen.rotation.y = 0.6
    fallen.position.set(flx, logR, flz)
    addMesh(fallen)

    // moss patches
    for (let mp = 0; mp < 3; mp++) {
      const mGeo = new THREE.SphereGeometry(rand(0.15, 0.3), 4, 3)
      const moss = new THREE.Mesh(mGeo, mat(0x5a8a4a))
      moss.scale.y = 0.3
      moss.position.set(
        flx + rand(-2, 2) * Math.cos(0.6),
        logR * 2 + 0.05,
        flz + rand(-2, 2) * Math.sin(0.6)
      )
      addMesh(moss)
    }

    // fixed collider
    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(flx, logR, flz)
    const body = world.createRigidBody(bd)
    // rotated cylinder — approximate with cuboid oriented along the log
    const hy = logR
    const hx = logLen / 2
    const quat = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0.6, Math.PI / 2))
    world.createCollider(
      RAPIER.ColliderDesc.cylinder(hx, hy)
        .setRotation({ x: quat.x, y: quat.y, z: quat.z, w: quat.w })
        .setFriction(0.5),
      body
    )
  }

  // ═══════════════════════════════════════════════════════════
  //  ROCK FORMATIONS  (4 clusters)
  // ═══════════════════════════════════════════════════════════
  const rockClusterCenters = [
    [CX + 10, CZ + 2], [CX - 3, CZ - 10], [CX + 6, CZ + 10], [CX - 10, CZ + 5],
  ]
  rockClusterCenters.forEach(([rcx, rcz]) => {
    const count = Math.floor(rand(3, 6))
    for (let r = 0; r < count; r++) {
      const rr = rand(0.25, 0.7)
      const geo = new THREE.DodecahedronGeometry(rr, 0)
      const rock = new THREE.Mesh(geo, mat(pick(ROCK_COLORS), { roughness: 1.0 }))
      rock.position.set(rcx + rand(-1.5, 1.5), rr * 0.6, rcz + rand(-1.5, 1.5))
      rock.rotation.set(rand(0, 1), rand(0, 1), rand(0, 1))
      rock.scale.y = rand(0.5, 0.9)
      addMesh(rock)

      // occasional moss tint
      if (Math.random() > 0.6) {
        const mossGeo = new THREE.SphereGeometry(rr * 0.5, 4, 3)
        const moss = new THREE.Mesh(mossGeo, mat(0x4a7a3a, { transparent: true, opacity: 0.7 }))
        moss.position.copy(rock.position)
        moss.position.y += rr * 0.3
        moss.scale.set(1.2, 0.3, 1.2)
        addMesh(moss, false)
      }
    }
  })

  // ═══════════════════════════════════════════════════════════
  //  FLOWERS  (scattered small)
  // ═══════════════════════════════════════════════════════════
  for (let f = 0; f < 14; f++) {
    const [fx, fz] = spreadXZ(17)
    const stemH = rand(0.15, 0.4)
    // stem
    const stemGeo = new THREE.CylinderGeometry(0.015, 0.015, stemH, 4)
    const stem = new THREE.Mesh(stemGeo, mat(0x388e3c))
    stem.position.set(fx, stemH / 2 + 0.01, fz)
    scene.add(stem); allMeshes.push(stem)

    // bloom
    const bloomR = rand(0.04, 0.09)
    const bloom = new THREE.Mesh(
      new THREE.SphereGeometry(bloomR, 5, 4),
      mat(pick(FLOWER_COLORS), { emissive: pick(FLOWER_COLORS), emissiveIntensity: 0.15 })
    )
    bloom.position.set(fx, stemH + bloomR + 0.01, fz)
    scene.add(bloom); allMeshes.push(bloom)
  }

  // ═══════════════════════════════════════════════════════════
  //  LEAF PILES  (flat green planes at ground level)
  // ═══════════════════════════════════════════════════════════
  for (let lp = 0; lp < 10; lp++) {
    const [lx, lz] = spreadXZ(16)
    const leafGeo = new THREE.CircleGeometry(rand(0.3, 0.8), 5)
    const leafColors = [0x33691e, 0x558b2f, 0x827717, 0x6d4c41]
    const leaf = new THREE.Mesh(leafGeo, mat(pick(leafColors), { side: THREE.DoubleSide }))
    leaf.rotation.x = -Math.PI / 2
    leaf.rotation.z = rand(0, Math.PI * 2)
    leaf.position.set(lx, 0.018, lz)
    scene.add(leaf); allMeshes.push(leaf)
  }

  // ═══════════════════════════════════════════════════════════
  //  CREATURES
  // ═══════════════════════════════════════════════════════════

  // ── Rabbits (2) ──
  const rabbitPositions = [[CX + 5, CZ - 2], [CX - 7, CZ + 9]]
  rabbitPositions.forEach(([rx, rz]) => {
    const group = new THREE.Group()
    group.position.set(rx, 0, rz)
    group.rotation.y = rand(0, Math.PI * 2)

    // body
    const body = new THREE.Mesh(new THREE.SphereGeometry(0.2, 5, 4), mat(0xbcaaa4))
    body.position.y = 0.22
    body.scale.set(1, 0.85, 1.2)
    group.add(body)

    // head
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.13, 5, 4), mat(0xbcaaa4))
    head.position.set(0, 0.35, 0.18)
    group.add(head)

    // ears
    for (let e = -1; e <= 1; e += 2) {
      const ear = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.2, 4), mat(0xd7ccc8))
      ear.position.set(e * 0.06, 0.5, 0.18)
      ear.rotation.z = e * 0.15
      group.add(ear)
    }

    // tail
    const tail = new THREE.Mesh(new THREE.SphereGeometry(0.06, 4, 3), mat(0xffffff))
    tail.position.set(0, 0.22, -0.25)
    group.add(tail)

    scene.add(group); allMeshes.push(group)
  })

  // ── Fox (1) ──
  {
    const group = new THREE.Group()
    group.position.set(CX - 5, 0, CZ - 5)
    group.rotation.y = 1.2

    // body
    const foxBody = new THREE.Mesh(
      new THREE.BoxGeometry(0.35, 0.28, 0.7, 1, 1, 1),
      mat(0xd84315)
    )
    foxBody.position.y = 0.3
    group.add(foxBody)

    // head
    const foxHead = new THREE.Mesh(
      new THREE.BoxGeometry(0.25, 0.22, 0.25, 1, 1, 1),
      mat(0xe65100)
    )
    foxHead.position.set(0, 0.38, 0.42)
    group.add(foxHead)

    // snout
    const snout = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.18, 4), mat(0xff8a65))
    snout.rotation.x = Math.PI / 2
    snout.position.set(0, 0.35, 0.58)
    group.add(snout)

    // ears
    for (let e = -1; e <= 1; e += 2) {
      const ear = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.14, 3), mat(0xd84315))
      ear.position.set(e * 0.1, 0.52, 0.4)
      group.add(ear)
    }

    // tail
    const tailGeo = new THREE.CylinderGeometry(0.04, 0.09, 0.5, 5)
    const foxTail = new THREE.Mesh(tailGeo, mat(0xd84315))
    foxTail.rotation.x = -0.6
    foxTail.position.set(0, 0.35, -0.5)
    group.add(foxTail)

    // tail tip
    const tailTip = new THREE.Mesh(new THREE.SphereGeometry(0.07, 4, 3), mat(0xffffff))
    tailTip.position.set(0, 0.45, -0.7)
    group.add(tailTip)

    // legs (4)
    for (let lx = -1; lx <= 1; lx += 2) {
      for (let lz = -1; lz <= 1; lz += 2) {
        const leg = new THREE.Mesh(
          new THREE.CylinderGeometry(0.03, 0.03, 0.18, 4),
          mat(0xbf360c)
        )
        leg.position.set(lx * 0.12, 0.09, lz * 0.22)
        group.add(leg)
      }
    }

    scene.add(group); allMeshes.push(group)
  }

  // ── Owl (1) ──
  {
    const group = new THREE.Group()
    group.position.set(CX - 2, 3.2, CZ - 3) // perched up on a tree
    group.rotation.y = 0.5

    // body
    const owlBody = new THREE.Mesh(new THREE.SphereGeometry(0.2, 5, 5), mat(0x795548))
    owlBody.scale.set(1, 1.3, 0.9)
    group.add(owlBody)

    // head
    const owlHead = new THREE.Mesh(new THREE.SphereGeometry(0.15, 5, 4), mat(0x8d6e63))
    owlHead.position.y = 0.28
    group.add(owlHead)

    // eyes (large circles)
    for (let e = -1; e <= 1; e += 2) {
      const eyeWhite = new THREE.Mesh(new THREE.CircleGeometry(0.06, 6), mat(0xffeb3b))
      eyeWhite.position.set(e * 0.07, 0.3, 0.14)
      group.add(eyeWhite)
      const pupil = new THREE.Mesh(new THREE.CircleGeometry(0.025, 5), mat(0x212121))
      pupil.position.set(e * 0.07, 0.3, 0.145)
      group.add(pupil)
    }

    // beak
    const beak = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.08, 3), mat(0xff8f00))
    beak.rotation.x = Math.PI / 2
    beak.position.set(0, 0.24, 0.16)
    group.add(beak)

    // ear tufts
    for (let e = -1; e <= 1; e += 2) {
      const tuft = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.1, 3), mat(0x795548))
      tuft.position.set(e * 0.1, 0.42, 0.02)
      tuft.rotation.z = e * 0.3
      group.add(tuft)
    }

    // branch the owl sits on
    const branch = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.06, 1.2, 5),
      mat(TRUNK_COLOR)
    )
    branch.rotation.z = Math.PI / 2
    branch.position.set(0, -0.22, 0)
    group.add(branch)

    scene.add(group); allMeshes.push(group)
  }

  // ── Butterflies (2) ──
  const butterflyPositions = [[CX + 2, 2.0, CZ + 4], [CX - 4, 1.5, CZ + 2]]
  const butterflyColors = [0xff80ab, 0x80d8ff]
  butterflyPositions.forEach(([bx, by, bz], i) => {
    const group = new THREE.Group()
    group.position.set(bx, by, bz)

    // body
    const bBody = new THREE.Mesh(
      new THREE.CylinderGeometry(0.015, 0.02, 0.15, 4),
      mat(0x424242)
    )
    group.add(bBody)

    // wings
    const wingMat = mat(butterflyColors[i], {
      transparent: true,
      opacity: 0.75,
      side: THREE.DoubleSide,
      emissive: butterflyColors[i],
      emissiveIntensity: 0.3,
    })
    for (let side = -1; side <= 1; side += 2) {
      const wingGeo = new THREE.PlaneGeometry(0.18, 0.14)
      const wing = new THREE.Mesh(wingGeo, wingMat)
      wing.position.x = side * 0.1
      wing.rotation.y = side * 0.3
      wing.name = 'wing'
      group.add(wing)
    }

    scene.add(group); allMeshes.push(group)
    butterflies.push({ group, baseRotY: 0.3, time: rand(0, Math.PI * 2) })
  })

  // ═══════════════════════════════════════════════════════════
  //  DYNAMIC OBJECTS — pushable by car
  // ═══════════════════════════════════════════════════════════

  // ── Small pushable logs (5) ──
  const pushLogPositions = [
    [CX + 2, CZ + 1], [CX - 3, CZ + 4], [CX + 6, CZ - 1],
    [CX - 1, CZ - 4], [CX + 4, CZ + 6],
  ]
  pushLogPositions.forEach(([lx, lz]) => {
    const logLen = rand(0.8, 1.5)
    const logR = rand(0.1, 0.18)
    const geo = new THREE.CylinderGeometry(logR, logR, logLen, 5)
    const log = new THREE.Mesh(geo, mat(TRUNK_COLOR))
    log.rotation.z = Math.PI / 2
    log.position.set(lx, logR + 0.01, lz)
    addMesh(log)

    const bd = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(lx, logR + 0.01, lz)
      .setLinearDamping(0.3)
      .setAngularDamping(0.3)
    const body = world.createRigidBody(bd)

    const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, Math.PI / 2))
    world.createCollider(
      RAPIER.ColliderDesc.cylinder(logLen / 2, logR)
        .setDensity(3.0)
        .setFriction(0.5)
        .setRestitution(0.1)
        .setRotation({ x: q.x, y: q.y, z: q.z, w: q.w }),
      body
    )

    syncList.push({ mesh: log, body })
  })

  // ── Small pushable rocks (3) ──
  const pushRockPositions = [
    [CX + 3, CZ - 3], [CX - 6, CZ + 1], [CX + 1, CZ + 7],
  ]
  pushRockPositions.forEach(([rx, rz]) => {
    const rr = rand(0.2, 0.35)
    const geo = new THREE.DodecahedronGeometry(rr, 0)
    const rock = new THREE.Mesh(geo, mat(pick(ROCK_COLORS), { roughness: 1.0 }))
    rock.position.set(rx, rr, rz)
    addMesh(rock)

    const bd = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(rx, rr, rz)
      .setLinearDamping(0.3)
      .setAngularDamping(0.3)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.ball(rr)
        .setDensity(3.0)
        .setFriction(0.5)
        .setRestitution(0.1),
      body
    )

    syncList.push({ mesh: rock, body })
  })

  // ═══════════════════════════════════════════════════════════
  //  AMBIENT FOG / ATMOSPHERE — dim point lights in the canopy
  // ═══════════════════════════════════════════════════════════
  {
    // Soft ambient green-ish light deep in the forest
    const ambientForest = new THREE.PointLight(0x88cc77, 0.4, 30, 2)
    ambientForest.position.set(CX, 6, CZ)
    scene.add(ambientForest)

    // A couple of warm accent lights
    const warm1 = new THREE.PointLight(0xffcc66, 0.3, 15, 2)
    warm1.position.set(CX + 6, 4, CZ - 4)
    scene.add(warm1)

    const warm2 = new THREE.PointLight(0xcc99ff, 0.25, 15, 2)
    warm2.position.set(CX - 6, 4, CZ + 5)
    scene.add(warm2)
  }

  // ═══════════════════════════════════════════════════════════
  //  UPDATE  — animate fairy lights + butterflies
  // ═══════════════════════════════════════════════════════════
  let elapsed = 0

  return {
    syncList,

    update(dt) {
      elapsed += dt

      // fairy lights: bob + pulse
      for (let i = 0; i < fairyLights.length; i++) {
        const fl = fairyLights[i]
        // bob up/down
        fl.mesh.position.y = fl.baseY + Math.sin(elapsed * fl.speed + fl.phase) * 0.3

        // firefly pulse
        if (fl.pulses) {
          const pulse = (Math.sin(elapsed * fl.pulseSpeed + fl.phase) + 1) * 0.5
          fl.mesh.material.opacity = 0.35 + pulse * 0.65
          fl.mesh.material.emissiveIntensity = 0.5 + pulse * 1.5
        }
      }

      // butterfly wing flutter
      for (let i = 0; i < butterflies.length; i++) {
        const bf = butterflies[i]
        bf.time += dt
        // gentle drift
        bf.group.position.y += Math.sin(elapsed * 1.2 + i * 3) * 0.001
        bf.group.rotation.y += dt * 0.3

        // flutter wings
        bf.group.children.forEach(child => {
          if (child.name === 'wing') {
            const side = child.position.x > 0 ? 1 : -1
            child.rotation.y = side * (0.3 + Math.sin(elapsed * 8 + bf.time) * 0.5)
          }
        })
      }

      // sync dynamic bodies
      for (let i = 0; i < syncList.length; i++) {
        const s = syncList[i]
        const pos = s.body.translation()
        const rot = s.body.rotation()
        s.mesh.position.set(pos.x, pos.y, pos.z)
        s.mesh.quaternion.set(rot.x, rot.y, rot.z, rot.w)
      }
    },
  }
}
