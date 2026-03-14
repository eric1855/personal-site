/**
 * Enchanted / Magical Forest world — full-sized (~120x120, origin-centered).
 *
 * Dense mystical woodland with fairy lights, giant mushrooms, glowing creatures,
 * winding paths, a stream, and magical structures. Portfolio buildings sit in
 * clearings at (0,-20), (20,0), (0,20), (-20,0).
 *
 * All geometry is Three.js primitives, flatShading, low-poly.
 */
import * as THREE from 'three'

// ── reusable temporaries ────────────────────────────────────────
const _q = new THREE.Quaternion()
const _euler = new THREE.Euler()

// ── color palettes ──────────────────────────────────────────────
const TRUNK_BROWN     = 0x4a3728
const TRUNK_DARK      = 0x3b2a1a
const TRUNK_BIRCH     = 0xd4c9b0
const FOLIAGE_DEEP    = [0x1b5e20, 0x1a4a1a, 0x2e7d32, 0x33691e, 0x245a24]
const FOLIAGE_BRIGHT  = [0x558b2f, 0x4caf50, 0x6d8b3a, 0x7cb342, 0x8bc34a]
const MUSHROOM_CAPS   = [0xc62828, 0x7b1fa2, 0x1565c0, 0xe65100, 0xfdd835]
const FAIRY_COLORS    = [0xffee58, 0x81d4fa, 0xa5d6a7, 0xf48fb1, 0xfff9c4, 0xce93d8]
const ROCK_COLORS     = [0x616161, 0x757575, 0x9e9e9e, 0x5d4e37, 0x8d8d8d]
const FLOWER_COLORS   = [0xff5252, 0xffeb3b, 0xe040fb, 0x448aff, 0xff6e40, 0xeeff41, 0xf48fb1]
const CRYSTAL_COLORS  = [0x9c27b0, 0x651fff, 0x448aff, 0x00bcd4]
const FOREST_FLOOR    = 0x2d5a27
const DIRT_PATH       = 0x6b5b3a
const STREAM_BLUE     = 0x4fc3f7
const POND_GLOW       = 0x26a69a
const DARK_SKY        = 0x1a3320
const FOG_COLOR       = 0x1a3320

// ── helpers ─────────────────────────────────────────────────────
function mat(color, opts = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    flatShading: true,
    roughness:         opts.roughness ?? 0.85,
    metalness:         opts.metalness ?? 0.05,
    transparent:       opts.transparent ?? false,
    opacity:           opts.opacity ?? 1.0,
    emissive:          opts.emissive ?? 0x000000,
    emissiveIntensity: opts.emissiveIntensity ?? 0,
    side:              opts.side ?? THREE.FrontSide,
  })
}

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)] }
function rand(lo, hi) { return lo + Math.random() * (hi - lo) }
function randInt(lo, hi) { return Math.floor(rand(lo, hi + 1)) }

/** Check if a position is too close to a portfolio building or another reserved spot */
function isClear(x, z, clearings, minDist) {
  for (const c of clearings) {
    const dx = x - c[0], dz = z - c[1]
    if (Math.sqrt(dx * dx + dz * dz) < (c[2] || minDist)) return false
  }
  return true
}

// ═════════════════════════════════════════════════════════════════
//  MAIN EXPORT
// ═════════════════════════════════════════════════════════════════
export function createWorld(scene, RAPIER, world) {
  const syncList     = []
  const fairyLights  = []
  const butterflies  = []
  const crystals     = []
  const allMeshes    = []

  // ── Set atmosphere ────────────────────────────────────────────
  scene.background = new THREE.Color(DARK_SKY)
  scene.fog = new THREE.Fog(FOG_COLOR, 20, 80)

  // Helper to add mesh with shadows
  function add(m, shadow = true) {
    if (shadow) { m.castShadow = true; m.receiveShadow = true }
    scene.add(m)
    allMeshes.push(m)
    return m
  }

  // Portfolio building clearings + center — objects must avoid these
  const clearings = [
    [0, -20, 8],   // about
    [20, 0, 8],    // projects
    [0, 20, 8],    // contact
    [-20, 0, 8],   // experience
    [0, 0, 6],     // center spawn area
  ]

  // ═══════════════════════════════════════════════════════════════
  //  1. GROUND
  // ═══════════════════════════════════════════════════════════════
  {
    const geo = new THREE.PlaneGeometry(130, 130)
    const ground = new THREE.Mesh(geo, mat(FOREST_FLOOR, { roughness: 1.0 }))
    ground.rotation.x = -Math.PI / 2
    ground.position.y = 0.0
    ground.receiveShadow = true
    scene.add(ground)
    allMeshes.push(ground)

    // Rapier ground collider
    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(0, -0.1, 0)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(65, 0.1, 65).setFriction(0.6),
      body
    )
  }

  // ═══════════════════════════════════════════════════════════════
  //  2. BOUNDARY WALLS (invisible at +/-60)
  // ═══════════════════════════════════════════════════════════════
  {
    const wallH = 6
    const wallThick = 0.5
    const walls = [
      { x:  0,  z: -60, hw: 60, hd: wallThick },
      { x:  0,  z:  60, hw: 60, hd: wallThick },
      { x: -60, z:  0,  hw: wallThick, hd: 60 },
      { x:  60, z:  0,  hw: wallThick, hd: 60 },
    ]
    walls.forEach(w => {
      const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(w.x, wallH / 2, w.z)
      const body = world.createRigidBody(bd)
      world.createCollider(
        RAPIER.ColliderDesc.cuboid(w.hw, wallH / 2, w.hd).setFriction(0.5),
        body
      )
    })
  }

  // ═══════════════════════════════════════════════════════════════
  //  3. DIRT PATHS — winding through the forest connecting clearings
  // ═══════════════════════════════════════════════════════════════
  {
    const pathMat = mat(DIRT_PATH, { roughness: 1.0 })
    // Paths are flat planes raised slightly above ground
    const pathSegments = [
      // Center to About (0,0) -> (0,-20)
      { x: 0, z: -5,  w: 3.5, l: 12, rot: 0 },
      { x: 0, z: -15, w: 3.5, l: 10, rot: 0 },
      // Center to Projects (0,0) -> (20,0)
      { x: 5,  z: 0,  w: 12, l: 3.5, rot: 0 },
      { x: 15, z: 0,  w: 12, l: 3.5, rot: 0 },
      // Center to Contact (0,0) -> (0,20)
      { x: 0, z: 5,   w: 3.5, l: 12, rot: 0 },
      { x: 0, z: 15,  w: 3.5, l: 10, rot: 0 },
      // Center to Experience (0,0) -> (-20,0)
      { x: -5,  z: 0, w: 12, l: 3.5, rot: 0 },
      { x: -15, z: 0, w: 12, l: 3.5, rot: 0 },
      // Winding side paths
      { x: 10,  z: -12, w: 3, l: 8, rot: 0.4 },
      { x: -12, z: -14, w: 3, l: 9, rot: -0.3 },
      { x: 14,  z: 12,  w: 3, l: 7, rot: 0.35 },
      { x: -14, z: 10,  w: 3, l: 8, rot: -0.2 },
      // Outer ring path fragments
      { x: 30,  z: -25, w: 3, l: 12, rot: 0.6 },
      { x: -30, z: 25,  w: 3, l: 12, rot: -0.5 },
      { x: 25,  z: 30,  w: 3, l: 10, rot: 0.7 },
      { x: -25, z: -30, w: 3, l: 10, rot: -0.6 },
      // Paths into far corners
      { x: 40,  z: -40, w: 3, l: 14, rot: 0.3 },
      { x: -40, z: 40,  w: 3, l: 14, rot: -0.3 },
      { x: 40,  z: 40,  w: 3, l: 14, rot: -0.4 },
      { x: -40, z: -40, w: 3, l: 14, rot: 0.4 },
    ]

    pathSegments.forEach(seg => {
      const geo = new THREE.PlaneGeometry(seg.w, seg.l)
      const m = new THREE.Mesh(geo, pathMat)
      m.rotation.x = -Math.PI / 2
      m.rotation.z = seg.rot
      m.position.set(seg.x, 0.02, seg.z)
      m.receiveShadow = true
      scene.add(m)
      allMeshes.push(m)
    })
  }

  // ═══════════════════════════════════════════════════════════════
  //  4. DENSE TREES (45 trees filling the entire map)
  // ═══════════════════════════════════════════════════════════════
  const treePositions = [
    // Near-center ring (between buildings)
    [8, -10],  [-8, -10], [10, 8],  [-10, 8],
    [8, 10],   [-8, 10],  [10, -8], [-10, -8],
    // Mid ring
    [18, -18], [-18, -18], [18, 18], [-18, 18],
    [25, -10], [-25, -10], [25, 10], [-25, 10],
    [10, -28], [-10, -28], [10, 28], [-10, 28],
    // Outer ring — filling the map
    [35, -15], [-35, -15], [35, 15], [-35, 15],
    [15, -38], [-15, -38], [15, 38], [-15, 38],
    [38, -35], [-38, -35], [38, 35], [-38, 35],
    [45, 0],   [-45, 0],   [0, 45],  [0, -45],
    // Far corners
    [48, -48], [-48, -48], [48, 48],  [-48, 48],
    [40, -25], [-40, -25], [40, 25],  [-40, 25],
    [30, -45], [-30, -45], [30, 45],  [-30, 45],
    [50, -10], [-50, 10],  [50, 20],  [-50, -20],
    [20, -50], [-20, 50],
  ]

  treePositions.forEach((pos, i) => {
    let x = pos[0], z = pos[1]
    // Skip if too close to a clearing
    if (!isClear(x, z, clearings, 5)) return

    const style = i % 5   // 0,1 = pine, 2,3 = oak, 4 = birch
    const isAncient = i < 6
    const trunkColor = style === 4 ? TRUNK_BIRCH : (isAncient ? TRUNK_DARK : TRUNK_BROWN)

    const trunkR = isAncient ? rand(0.5, 0.75) : rand(0.12, 0.3)
    const trunkH = isAncient ? rand(5, 8) : rand(2.5, 5.5)

    // Trunk
    const trunkGeo = new THREE.CylinderGeometry(trunkR * 0.7, trunkR, trunkH, 6)
    const trunk = new THREE.Mesh(trunkGeo, mat(trunkColor))
    trunk.position.set(x, trunkH / 2, z)
    add(trunk)

    // Canopy
    const fColors = isAncient ? FOLIAGE_DEEP : (Math.random() > 0.4 ? FOLIAGE_DEEP : FOLIAGE_BRIGHT)
    const foliageColor = pick(fColors)

    if (style <= 1) {
      // Pine — stacked cones
      const layers = isAncient ? 3 : randInt(2, 3)
      for (let layer = 0; layer < layers; layer++) {
        const r = (isAncient ? rand(2.5, 3.5) : rand(1.0, 1.8)) * (1 - layer * 0.2)
        const h = (isAncient ? rand(3, 4.5) : rand(1.8, 3)) * (1 - layer * 0.15)
        const cGeo = new THREE.ConeGeometry(r, h, 6)
        const canopy = new THREE.Mesh(cGeo, mat(pick(fColors)))
        canopy.position.set(x, trunkH + h * 0.3 + layer * h * 0.5, z)
        add(canopy)
      }
    } else if (style <= 3) {
      // Oak — round canopy
      const r = isAncient ? rand(3, 4.5) : rand(1.2, 2.2)
      const cGeo = new THREE.SphereGeometry(r, 6, 5)
      const canopy = new THREE.Mesh(cGeo, mat(foliageColor))
      canopy.position.set(x, trunkH + r * 0.3, z)
      canopy.scale.y = rand(0.6, 0.85)
      add(canopy)

      // Ancient oaks get extra canopy blobs
      if (isAncient) {
        for (let b = 0; b < 3; b++) {
          const br = rand(1.2, 2.0)
          const blob = new THREE.Mesh(
            new THREE.SphereGeometry(br, 5, 4),
            mat(pick(fColors))
          )
          blob.position.set(
            x + rand(-2, 2),
            trunkH * rand(0.5, 0.8),
            z + rand(-2, 2)
          )
          blob.scale.y = 0.6
          add(blob)
        }
      }
    } else {
      // Birch — thin, with sparse small canopy
      const r = rand(0.8, 1.4)
      const h = rand(1.5, 2.5)
      const cGeo = new THREE.SphereGeometry(r, 5, 4)
      const canopy = new THREE.Mesh(cGeo, mat(pick(FOLIAGE_BRIGHT)))
      canopy.position.set(x, trunkH + r * 0.2, z)
      canopy.scale.y = rand(0.7, 1.0)
      add(canopy)

      // Birch bark stripes
      for (let stripe = 0; stripe < 4; stripe++) {
        const sGeo = new THREE.PlaneGeometry(0.08, rand(0.3, 0.6))
        const s = new THREE.Mesh(sGeo, mat(0x3b2a1a))
        const angle = rand(0, Math.PI * 2)
        s.position.set(
          x + Math.cos(angle) * trunkR * 0.72,
          rand(0.5, trunkH - 0.5),
          z + Math.sin(angle) * trunkR * 0.72
        )
        s.rotation.y = -angle
        scene.add(s)
        allMeshes.push(s)
      }
    }

    // Some trees lean slightly
    if (!isAncient && Math.random() > 0.65) {
      trunk.rotation.z = rand(-0.1, 0.1)
    }

    // Rapier fixed cylinder collider for trunk
    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(x, trunkH / 2, z)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cylinder(trunkH / 2, trunkR).setFriction(0.5),
      body
    )
  })

  // ═══════════════════════════════════════════════════════════════
  //  5. GIANT MUSHROOMS (18)
  // ═══════════════════════════════════════════════════════════════
  const mushroomData = [
    // Large with colliders
    { x: 6,   z: -6,   h: 3.5, r: 1.5, color: 0xc62828, spots: true,  collider: true },
    { x: -12, z: 5,    h: 3.0, r: 1.4, color: 0x7b1fa2, spots: false, collider: true },
    { x: 14,  z: 14,   h: 3.2, r: 1.3, color: 0x1565c0, spots: false, collider: true },
    { x: -8,  z: -14,  h: 2.8, r: 1.2, color: 0xc62828, spots: true,  collider: true },
    { x: 28,  z: -18,  h: 4.0, r: 1.6, color: 0xe65100, spots: false, collider: true },
    // Medium without colliders
    { x: -25, z: -20,  h: 2.0, r: 1.0, color: 0xc62828, spots: true,  collider: false },
    { x: 30,  z: 10,   h: 1.8, r: 0.9, color: 0x7b1fa2, spots: false, collider: false },
    { x: -15, z: 30,   h: 2.2, r: 1.0, color: 0xfdd835, spots: false, collider: false },
    { x: 22,  z: -30,  h: 1.5, r: 0.8, color: 0x1565c0, spots: false, collider: false },
    { x: -35, z: -10,  h: 1.6, r: 0.85,color: 0xc62828, spots: true,  collider: false },
    { x: 35,  z: 30,   h: 1.8, r: 0.9, color: 0xe65100, spots: false, collider: false },
    // Small
    { x: 3,   z: 8,    h: 0.8, r: 0.5, color: 0xc62828, spots: true,  collider: false },
    { x: -5,  z: -3,   h: 0.5, r: 0.35,color: 0x7b1fa2, spots: false, collider: false },
    { x: 16,  z: -5,   h: 0.6, r: 0.4, color: 0xfdd835, spots: false, collider: false },
    { x: -30, z: 15,   h: 0.4, r: 0.3, color: 0xc62828, spots: true,  collider: false },
    // Tiny
    { x: 42,  z: -12,  h: 0.3, r: 0.2, color: 0xe65100, spots: false, collider: false },
    { x: -42, z: 18,   h: 0.35,r: 0.22,color: 0x7b1fa2, spots: false, collider: false },
    { x: 12,  z: 42,   h: 0.3, r: 0.2, color: 0x1565c0, spots: false, collider: false },
  ]

  mushroomData.forEach(md => {
    const stemR = md.r * 0.22
    const stemH = md.h

    // Stem
    const stemGeo = new THREE.CylinderGeometry(stemR, stemR * 1.25, stemH, 6)
    const stem = new THREE.Mesh(stemGeo, mat(0xf5f0e8))
    stem.position.set(md.x, stemH / 2, md.z)
    add(stem)

    // Cap — hemisphere
    const capGeo = new THREE.SphereGeometry(md.r, 7, 5, 0, Math.PI * 2, 0, Math.PI / 2)
    const cap = new THREE.Mesh(capGeo, mat(md.color))
    cap.position.set(md.x, stemH, md.z)
    cap.scale.y = 0.5
    add(cap)

    // White spots on red/spotted caps
    if (md.spots) {
      const spotCount = Math.floor(rand(5, 10))
      for (let s = 0; s < spotCount; s++) {
        const theta = rand(0, Math.PI * 2)
        const phi = rand(0.15, 0.7)
        const sr = md.r * 0.97
        const sx = md.x + sr * Math.sin(phi) * Math.cos(theta)
        const sy = stemH + sr * Math.cos(phi) * 0.5
        const sz = md.z + sr * Math.sin(phi) * Math.sin(theta)
        const spotGeo = new THREE.CircleGeometry(md.r * 0.1, 5)
        const spot = new THREE.Mesh(spotGeo, mat(0xffffff))
        spot.position.set(sx, sy, sz)
        spot.lookAt(md.x, stemH, md.z)
        scene.add(spot)
        allMeshes.push(spot)
      }
    }

    // Under-cap glow for large mushrooms
    if (md.h >= 2.0) {
      const glowGeo = new THREE.CircleGeometry(md.r * 0.7, 7)
      const glow = new THREE.Mesh(glowGeo, mat(md.color, {
        emissive: md.color, emissiveIntensity: 0.4,
        transparent: true, opacity: 0.5, side: THREE.DoubleSide
      }))
      glow.rotation.x = Math.PI / 2
      glow.position.set(md.x, stemH - 0.05, md.z)
      scene.add(glow)
      allMeshes.push(glow)
    }

    // Collider for large mushrooms
    if (md.collider) {
      const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(md.x, stemH / 2, md.z)
      const body = world.createRigidBody(bd)
      world.createCollider(
        RAPIER.ColliderDesc.cylinder(stemH / 2, md.r * 0.55).setFriction(0.5),
        body
      )
    }
  })

  // ═══════════════════════════════════════════════════════════════
  //  6. GLOWING FAIRY LIGHTS (28 floating orbs)
  // ═══════════════════════════════════════════════════════════════
  for (let i = 0; i < 28; i++) {
    const angle = rand(0, Math.PI * 2)
    const dist = rand(3, 55)
    const fx = Math.cos(angle) * dist
    const fz = Math.sin(angle) * dist
    const fy = rand(0.5, 6)
    const color = pick(FAIRY_COLORS)
    const radius = rand(0.06, 0.2)

    const geo = new THREE.SphereGeometry(radius, 5, 4)
    const fMat = new THREE.MeshStandardMaterial({
      color,
      flatShading: true,
      emissive: color,
      emissiveIntensity: 1.8,
      transparent: true,
      opacity: rand(0.65, 1.0),
    })
    const orb = new THREE.Mesh(geo, fMat)
    orb.position.set(fx, fy, fz)
    scene.add(orb)
    allMeshes.push(orb)

    // PointLight on the largest 8
    let light = null
    if (i < 8 && radius > 0.1) {
      light = new THREE.PointLight(color, 0.8, 8, 2)
      light.position.set(fx, fy, fz)
      scene.add(light)
    }

    fairyLights.push({
      mesh: orb,
      light,
      baseY: fy,
      phase: rand(0, Math.PI * 2),
      speed: rand(0.6, 1.8),
      pulses: Math.random() > 0.4,
      pulseSpeed: rand(1.2, 3.5),
    })
  }

  // ═══════════════════════════════════════════════════════════════
  //  7. ENCHANTED ARCHWAYS (2 — branch-like curved structures)
  // ═══════════════════════════════════════════════════════════════
  {
    const archPositions = [[12, -12, 0.4], [-14, 14, -0.3]]
    archPositions.forEach(([ax, az, rotY]) => {
      const group = new THREE.Group()
      group.position.set(ax, 0, az)
      group.rotation.y = rotY

      // Left pillar
      const leftPillar = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.3, 4, 6),
        mat(TRUNK_DARK)
      )
      leftPillar.position.set(-1.5, 2, 0)
      leftPillar.rotation.z = 0.15
      group.add(leftPillar)

      // Right pillar
      const rightPillar = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.3, 4, 6),
        mat(TRUNK_DARK)
      )
      rightPillar.position.set(1.5, 2, 0)
      rightPillar.rotation.z = -0.15
      group.add(rightPillar)

      // Arch top — curved using several boxes
      for (let a = -3; a <= 3; a++) {
        const t = a / 3
        const archX = t * 1.5
        const archY = 4.0 + Math.cos(t * Math.PI * 0.5) * 0.5
        const piece = new THREE.Mesh(
          new THREE.BoxGeometry(0.6, 0.2, 0.3),
          mat(TRUNK_DARK)
        )
        piece.position.set(archX, archY, 0)
        piece.rotation.z = -t * 0.2
        group.add(piece)
      }

      // Vines hanging from arch
      for (let v = 0; v < 5; v++) {
        const vineH = rand(0.5, 1.5)
        const vine = new THREE.Mesh(
          new THREE.CylinderGeometry(0.02, 0.02, vineH, 4),
          mat(0x2e7d32)
        )
        vine.position.set(rand(-1.2, 1.2), 4 - vineH / 2, rand(-0.1, 0.1))
        group.add(vine)
      }

      // Glowing rune on the arch
      const rune = new THREE.Mesh(
        new THREE.CircleGeometry(0.15, 6),
        mat(0x81d4fa, { emissive: 0x81d4fa, emissiveIntensity: 2.0 })
      )
      rune.position.set(0, 4.2, 0.16)
      group.add(rune)

      add(group)
    })
  }

  // ═══════════════════════════════════════════════════════════════
  //  8. FAIRY RING (circle of small mushrooms)
  // ═══════════════════════════════════════════════════════════════
  {
    const ringX = -6, ringZ = -30
    const ringR = 3
    const count = 14
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const mx = ringX + Math.cos(angle) * ringR
      const mz = ringZ + Math.sin(angle) * ringR
      const h = rand(0.2, 0.5)
      const r = rand(0.12, 0.25)

      // Tiny stem
      const stem = new THREE.Mesh(
        new THREE.CylinderGeometry(r * 0.2, r * 0.25, h, 4),
        mat(0xf5f0e8)
      )
      stem.position.set(mx, h / 2, mz)
      scene.add(stem); allMeshes.push(stem)

      // Tiny cap
      const cap = new THREE.Mesh(
        new THREE.SphereGeometry(r, 5, 3, 0, Math.PI * 2, 0, Math.PI / 2),
        mat(pick([0xc62828, 0x7b1fa2, 0xfdd835]))
      )
      cap.position.set(mx, h, mz)
      cap.scale.y = 0.45
      scene.add(cap); allMeshes.push(cap)
    }

    // Glowing center of the fairy ring
    const centerGlow = new THREE.Mesh(
      new THREE.CircleGeometry(ringR * 0.6, 8),
      mat(0xa5d6a7, {
        emissive: 0xa5d6a7, emissiveIntensity: 0.5,
        transparent: true, opacity: 0.3, side: THREE.DoubleSide
      })
    )
    centerGlow.rotation.x = -Math.PI / 2
    centerGlow.position.set(ringX, 0.03, ringZ)
    scene.add(centerGlow)
    allMeshes.push(centerGlow)
  }

  // ═══════════════════════════════════════════════════════════════
  //  9. WISHING WELL
  // ═══════════════════════════════════════════════════════════════
  {
    const wx = 30, wz = -8
    const group = new THREE.Group()
    group.position.set(wx, 0, wz)

    // Stone cylinder base
    const base = new THREE.Mesh(
      new THREE.CylinderGeometry(1.0, 1.1, 1.2, 8, 1, true),
      mat(0x9e9e9e, { side: THREE.DoubleSide })
    )
    base.position.y = 0.6
    group.add(base)

    // Rim
    const rim = new THREE.Mesh(
      new THREE.TorusGeometry(1.0, 0.1, 5, 8),
      mat(0x757575)
    )
    rim.rotation.x = Math.PI / 2
    rim.position.y = 1.2
    group.add(rim)

    // Two support posts
    for (let side = -1; side <= 1; side += 2) {
      const post = new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.06, 1.8, 4),
        mat(TRUNK_BROWN)
      )
      post.position.set(side * 0.8, 2.1, 0)
      group.add(post)
    }

    // Roof (small triangular shape)
    const roof = new THREE.Mesh(
      new THREE.ConeGeometry(1.0, 0.6, 4),
      mat(TRUNK_DARK)
    )
    roof.position.y = 3.2
    roof.rotation.y = Math.PI / 4
    group.add(roof)

    // Cross beam
    const beam = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 1.6, 4),
      mat(TRUNK_BROWN)
    )
    beam.rotation.z = Math.PI / 2
    beam.position.y = 3.0
    group.add(beam)

    // Bucket (small cylinder hanging)
    const bucket = new THREE.Mesh(
      new THREE.CylinderGeometry(0.15, 0.12, 0.2, 6),
      mat(TRUNK_BROWN)
    )
    bucket.position.set(0.3, 1.5, 0)
    group.add(bucket)

    // Rope
    const rope = new THREE.Mesh(
      new THREE.CylinderGeometry(0.015, 0.015, 1.4, 4),
      mat(0x8d6e63)
    )
    rope.position.set(0.3, 2.2, 0)
    group.add(rope)

    // Water shimmer inside
    const water = new THREE.Mesh(
      new THREE.CircleGeometry(0.85, 7),
      mat(0x4fc3f7, {
        emissive: 0x26a69a, emissiveIntensity: 0.6,
        transparent: true, opacity: 0.5, side: THREE.DoubleSide
      })
    )
    water.rotation.x = -Math.PI / 2
    water.position.y = 0.3
    group.add(water)

    add(group)

    // Fixed collider
    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(wx, 0.6, wz)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cylinder(0.6, 1.1).setFriction(0.5),
      body
    )
  }

  // ═══════════════════════════════════════════════════════════════
  //  10. CRYSTAL FORMATIONS (5 clusters)
  // ═══════════════════════════════════════════════════════════════
  {
    const crystalClusters = [
      { x: -30, z: -35, count: 4 },
      { x: 38,  z: 20,  count: 3 },
      { x: -20, z: 40,  count: 5 },
      { x: 45,  z: -30, count: 3 },
      { x: -45, z: -15, count: 4 },
    ]

    crystalClusters.forEach(cluster => {
      for (let c = 0; c < cluster.count; c++) {
        const cx = cluster.x + rand(-2, 2)
        const cz = cluster.z + rand(-2, 2)
        const h = rand(0.8, 2.5)
        const r = rand(0.2, 0.5)
        const color = pick(CRYSTAL_COLORS)

        const geo = new THREE.DodecahedronGeometry(r, 0)
        const crystal = new THREE.Mesh(geo, mat(color, {
          emissive: color,
          emissiveIntensity: 0.8,
          transparent: true,
          opacity: 0.7,
          metalness: 0.3,
          roughness: 0.2,
        }))
        crystal.position.set(cx, h * 0.4, cz)
        crystal.scale.set(1, h / r, 1)
        crystal.rotation.set(rand(-0.2, 0.2), rand(0, Math.PI), rand(-0.2, 0.2))
        add(crystal)

        crystals.push({
          mesh: crystal,
          baseEmissive: 0.8,
          phase: rand(0, Math.PI * 2),
          speed: rand(0.8, 2.0),
        })
      }
    })
  }

  // ═══════════════════════════════════════════════════════════════
  //  11. HOLLOW TREE STUMPS (2 — car can drive inside)
  // ═══════════════════════════════════════════════════════════════
  {
    const stumpData = [
      { x: -35, z: 30,  outerR: 2.0, innerR: 1.4, h: 1.5 },
      { x: 40,  z: -15, outerR: 1.8, innerR: 1.2, h: 1.3 },
    ]

    stumpData.forEach(sd => {
      // Outer cylinder (open top)
      const outerGeo = new THREE.CylinderGeometry(sd.outerR, sd.outerR * 1.15, sd.h, 8, 1, true)
      const stump = new THREE.Mesh(outerGeo, mat(TRUNK_DARK, { side: THREE.DoubleSide }))
      stump.position.set(sd.x, sd.h / 2, sd.z)
      add(stump)

      // Ring floor inside
      const ringGeo = new THREE.RingGeometry(sd.innerR, sd.outerR, 8)
      const ringFloor = new THREE.Mesh(ringGeo, mat(TRUNK_BROWN))
      ringFloor.rotation.x = -Math.PI / 2
      ringFloor.position.set(sd.x, 0.03, sd.z)
      add(ringFloor, false)

      // Moss on top rim
      const rimGeo = new THREE.TorusGeometry(sd.outerR * 0.95, 0.12, 5, 8)
      const rim = new THREE.Mesh(rimGeo, mat(0x4a7a3a))
      rim.rotation.x = Math.PI / 2
      rim.position.set(sd.x, sd.h, sd.z)
      add(rim)

      // Hollow ring collider — 6 thin walls around perimeter
      for (let a = 0; a < 6; a++) {
        const angle = (a / 6) * Math.PI * 2
        const wx = sd.x + Math.cos(angle) * (sd.outerR + 0.05)
        const wz = sd.z + Math.sin(angle) * (sd.outerR + 0.05)
        const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(wx, sd.h / 2, wz)
        const body = world.createRigidBody(bd)
        _q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), angle)
        world.createCollider(
          RAPIER.ColliderDesc.cuboid(0.5, sd.h / 2, 0.15)
            .setRotation({ x: _q.x, y: _q.y, z: _q.z, w: _q.w })
            .setFriction(0.5),
          body
        )
      }
    })
  }

  // ═══════════════════════════════════════════════════════════════
  //  12. TREE HOUSES (3 — small boxes on platforms in trees)
  // ═══════════════════════════════════════════════════════════════
  {
    const treehouseData = [
      { x: 10, z: -28, treeH: 5.5 },
      { x: -25, z: -10, treeH: 6 },
      { x: 25, z: 10, treeH: 5 },
    ]

    treehouseData.forEach(th => {
      const platformY = th.treeH * 0.65

      // Platform
      const platform = new THREE.Mesh(
        new THREE.BoxGeometry(2, 0.12, 2),
        mat(TRUNK_BROWN)
      )
      platform.position.set(th.x, platformY, th.z)
      add(platform)

      // House box
      const house = new THREE.Mesh(
        new THREE.BoxGeometry(1.4, 1.2, 1.4),
        mat(0x8d6e63)
      )
      house.position.set(th.x, platformY + 0.72, th.z)
      add(house)

      // Roof
      const roof = new THREE.Mesh(
        new THREE.ConeGeometry(1.2, 0.8, 4),
        mat(0x4a7a3a)
      )
      roof.position.set(th.x, platformY + 1.72, th.z)
      roof.rotation.y = Math.PI / 4
      add(roof)

      // Window (small glowing square)
      const win = new THREE.Mesh(
        new THREE.PlaneGeometry(0.3, 0.3),
        mat(0xffee58, { emissive: 0xffee58, emissiveIntensity: 1.5 })
      )
      win.position.set(th.x, platformY + 0.8, th.z + 0.71)
      add(win, false)

      // Ladder
      for (let rung = 0; rung < 5; rung++) {
        const ry = rung * (platformY / 5) + 0.3
        const rungMesh = new THREE.Mesh(
          new THREE.BoxGeometry(0.5, 0.06, 0.06),
          mat(TRUNK_BROWN)
        )
        rungMesh.position.set(th.x + 1, ry, th.z)
        scene.add(rungMesh); allMeshes.push(rungMesh)
      }
      // Ladder rails
      for (let rail = -1; rail <= 1; rail += 2) {
        const railMesh = new THREE.Mesh(
          new THREE.CylinderGeometry(0.025, 0.025, platformY, 4),
          mat(TRUNK_BROWN)
        )
        railMesh.position.set(th.x + 1 + rail * 0.22, platformY / 2, th.z)
        scene.add(railMesh); allMeshes.push(railMesh)
      }
    })
  }

  // ═══════════════════════════════════════════════════════════════
  //  13. MAGICAL POND with lily pads + glowing water
  // ═══════════════════════════════════════════════════════════════
  {
    const px = -10, pz = 35
    // Glowing water surface
    const pondGeo = new THREE.CircleGeometry(4, 10)
    const pond = new THREE.Mesh(pondGeo, mat(POND_GLOW, {
      emissive: POND_GLOW, emissiveIntensity: 0.5,
      transparent: true, opacity: 0.55, side: THREE.DoubleSide
    }))
    pond.rotation.x = -Math.PI / 2
    pond.position.set(px, 0.025, pz)
    pond.receiveShadow = true
    scene.add(pond); allMeshes.push(pond)

    // Subtle glow light
    const pondLight = new THREE.PointLight(POND_GLOW, 0.6, 10, 2)
    pondLight.position.set(px, 0.5, pz)
    scene.add(pondLight)

    // Lily pads
    for (let lp = 0; lp < 8; lp++) {
      const la = rand(0, Math.PI * 2)
      const ld = rand(0.5, 3.2)
      const lx = px + Math.cos(la) * ld
      const lz = pz + Math.sin(la) * ld
      const padGeo = new THREE.CircleGeometry(rand(0.25, 0.5), 7)
      const pad = new THREE.Mesh(padGeo, mat(0x2e7d32, { side: THREE.DoubleSide }))
      pad.rotation.x = -Math.PI / 2
      pad.position.set(lx, 0.035, lz)
      scene.add(pad); allMeshes.push(pad)

      // Flower on some pads
      if (Math.random() > 0.5) {
        const flower = new THREE.Mesh(
          new THREE.SphereGeometry(0.08, 5, 4),
          mat(pick([0xf48fb1, 0xffffff, 0xffeb3b]), {
            emissive: 0xf48fb1, emissiveIntensity: 0.3
          })
        )
        flower.position.set(lx, 0.08, lz)
        scene.add(flower); allMeshes.push(flower)
      }
    }

    // Pond border stones
    for (let s = 0; s < 12; s++) {
      const sa = (s / 12) * Math.PI * 2
      const sx = px + Math.cos(sa) * 4.2
      const sz = pz + Math.sin(sa) * 4.2
      const stone = new THREE.Mesh(
        new THREE.DodecahedronGeometry(rand(0.2, 0.4), 0),
        mat(pick(ROCK_COLORS), { roughness: 1.0 })
      )
      stone.position.set(sx, 0.15, sz)
      stone.rotation.set(rand(0, 1), rand(0, 1), rand(0, 1))
      stone.scale.y = 0.6
      add(stone)
    }
  }

  // ═══════════════════════════════════════════════════════════════
  //  14. WINDING STREAM + LOG BRIDGE + WATERFALL
  // ═══════════════════════════════════════════════════════════════
  {
    const streamMat = mat(STREAM_BLUE, {
      transparent: true, opacity: 0.4,
      roughness: 0.2, metalness: 0.1, side: THREE.DoubleSide
    })

    // Stream segments winding through the forest
    const streamSegs = [
      { x: -50, z: -35, w: 2.0, l: 8, rot: 0.2 },
      { x: -47, z: -28, w: 2.2, l: 7, rot: -0.15 },
      { x: -44, z: -22, w: 2.0, l: 6, rot: 0.3 },
      { x: -40, z: -17, w: 1.8, l: 6, rot: -0.1 },
      { x: -36, z: -12, w: 2.0, l: 7, rot: 0.25 },
      { x: -32, z: -6,  w: 2.2, l: 7, rot: -0.2 },
      { x: -28, z: 0,   w: 2.0, l: 6, rot: 0.15 },
      { x: -25, z: 5,   w: 1.8, l: 6, rot: -0.3 },
      { x: -22, z: 10,  w: 2.0, l: 7, rot: 0.1 },
      { x: -19, z: 16,  w: 2.2, l: 7, rot: -0.2 },
      { x: -15, z: 22,  w: 2.0, l: 8, rot: 0.15 },
    ]

    streamSegs.forEach(seg => {
      const geo = new THREE.PlaneGeometry(seg.w, seg.l)
      const m = new THREE.Mesh(geo, streamMat)
      m.rotation.x = -Math.PI / 2
      m.rotation.z = seg.rot
      m.position.set(seg.x, 0.02, seg.z)
      m.receiveShadow = true
      scene.add(m); allMeshes.push(m)
    })

    // Stepping stones across stream
    const stonePositions = [
      [-46, -26], [-42, -19], [-34, -9], [-26, 2], [-20, 13],
    ]
    stonePositions.forEach(([sx, sz]) => {
      const geo = new THREE.CylinderGeometry(rand(0.3, 0.55), rand(0.35, 0.6), 0.12, 6)
      const stone = new THREE.Mesh(geo, mat(pick(ROCK_COLORS), { roughness: 1.0 }))
      stone.position.set(sx, 0.07, sz)
      add(stone)
    })

    // Log bridge (driveable, fixed collider)
    {
      const bx = -30, bz = -3
      const logLen = 4.5, logR = 0.4
      const logGeo = new THREE.CylinderGeometry(logR, logR * 1.1, logLen, 7)
      const bridge = new THREE.Mesh(logGeo, mat(TRUNK_BROWN))
      bridge.rotation.z = Math.PI / 2
      bridge.rotation.y = 0.15
      bridge.position.set(bx, logR + 0.02, bz)
      add(bridge)

      // Planks on top for driving surface
      for (let p = -2; p <= 2; p++) {
        const plank = new THREE.Mesh(
          new THREE.BoxGeometry(0.6, 0.06, logLen * 0.9),
          mat(TRUNK_BROWN)
        )
        plank.position.set(bx + p * 0.4, logR * 2 + 0.04, bz)
        plank.rotation.y = 0.15
        add(plank)
      }

      const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(bx, logR + 0.02, bz)
      const body = world.createRigidBody(bd)
      world.createCollider(
        RAPIER.ColliderDesc.cuboid(logLen / 2, logR, logR * 1.5).setFriction(0.7),
        body
      )
    }

    // Small waterfall
    {
      const wfx = -50, wfz = -38
      // Vertical blue plane
      const fallGeo = new THREE.PlaneGeometry(2.5, 3)
      const fall = new THREE.Mesh(fallGeo, mat(STREAM_BLUE, {
        transparent: true, opacity: 0.45,
        emissive: STREAM_BLUE, emissiveIntensity: 0.3,
        side: THREE.DoubleSide
      }))
      fall.position.set(wfx, 1.5, wfz)
      scene.add(fall); allMeshes.push(fall)

      // Mist spheres at base
      for (let ms = 0; ms < 6; ms++) {
        const mist = new THREE.Mesh(
          new THREE.SphereGeometry(rand(0.2, 0.5), 5, 4),
          mat(0xffffff, {
            transparent: true, opacity: 0.15,
            emissive: 0xffffff, emissiveIntensity: 0.2
          })
        )
        mist.position.set(wfx + rand(-1.2, 1.2), rand(0.1, 0.6), wfz + rand(-0.5, 0.5))
        scene.add(mist); allMeshes.push(mist)
      }

      // Rocks at base of waterfall
      for (let r = 0; r < 5; r++) {
        const rock = new THREE.Mesh(
          new THREE.DodecahedronGeometry(rand(0.3, 0.6), 0),
          mat(pick(ROCK_COLORS), { roughness: 1.0 })
        )
        rock.position.set(wfx + rand(-1.5, 1.5), rand(0.1, 0.3), wfz + rand(0.5, 1.5))
        rock.scale.y = 0.7
        add(rock)
      }
    }
  }

  // ═══════════════════════════════════════════════════════════════
  //  15. CREATURES
  // ═══════════════════════════════════════════════════════════════

  // ── Rabbits (4) ──
  const rabbitPositions = [[5, -5], [-18, -25], [28, 15], [-40, 20]]
  rabbitPositions.forEach(([rx, rz]) => {
    const group = new THREE.Group()
    group.position.set(rx, 0, rz)
    group.rotation.y = rand(0, Math.PI * 2)

    // Body
    const body = new THREE.Mesh(new THREE.SphereGeometry(0.22, 5, 4), mat(0xbcaaa4))
    body.position.y = 0.24
    body.scale.set(1, 0.85, 1.2)
    group.add(body)

    // Head
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.14, 5, 4), mat(0xbcaaa4))
    head.position.set(0, 0.38, 0.2)
    group.add(head)

    // Ears
    for (let e = -1; e <= 1; e += 2) {
      const ear = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.22, 4), mat(0xd7ccc8))
      ear.position.set(e * 0.06, 0.54, 0.2)
      ear.rotation.z = e * 0.15
      group.add(ear)
    }

    // Tail
    const tail = new THREE.Mesh(new THREE.SphereGeometry(0.06, 4, 3), mat(0xffffff))
    tail.position.set(0, 0.24, -0.28)
    group.add(tail)

    add(group)
  })

  // ── Foxes (2) ──
  const foxPositions = [[15, -35, 1.2], [-38, -25, 2.5]]
  foxPositions.forEach(([fx, fz, rotY]) => {
    const group = new THREE.Group()
    group.position.set(fx, 0, fz)
    group.rotation.y = rotY

    // Body
    const foxBody = new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 0.3, 0.75),
      mat(0xd84315)
    )
    foxBody.position.y = 0.32
    group.add(foxBody)

    // Head
    const foxHead = new THREE.Mesh(
      new THREE.BoxGeometry(0.28, 0.24, 0.28),
      mat(0xe65100)
    )
    foxHead.position.set(0, 0.4, 0.46)
    group.add(foxHead)

    // Snout
    const snout = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.2, 4), mat(0xff8a65))
    snout.rotation.x = Math.PI / 2
    snout.position.set(0, 0.37, 0.62)
    group.add(snout)

    // Ears
    for (let e = -1; e <= 1; e += 2) {
      const ear = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.14, 3), mat(0xd84315))
      ear.position.set(e * 0.11, 0.55, 0.44)
      group.add(ear)
    }

    // Tail (cylinder)
    const tailGeo = new THREE.CylinderGeometry(0.04, 0.1, 0.5, 5)
    const foxTail = new THREE.Mesh(tailGeo, mat(0xd84315))
    foxTail.rotation.x = -0.6
    foxTail.position.set(0, 0.38, -0.52)
    group.add(foxTail)

    // Tail tip
    const tailTip = new THREE.Mesh(new THREE.SphereGeometry(0.08, 4, 3), mat(0xffffff))
    tailTip.position.set(0, 0.48, -0.72)
    group.add(tailTip)

    // Legs
    for (let lx = -1; lx <= 1; lx += 2) {
      for (let lz = -1; lz <= 1; lz += 2) {
        const leg = new THREE.Mesh(
          new THREE.CylinderGeometry(0.03, 0.03, 0.2, 4),
          mat(0xbf360c)
        )
        leg.position.set(lx * 0.13, 0.1, lz * 0.24)
        group.add(leg)
      }
    }

    add(group)
  })

  // ── Owls (3, perched on branches) ──
  const owlPositions = [[8, 3.8, -10], [-18, 4.5, -18], [35, 3.5, 15]]
  owlPositions.forEach(([ox, oy, oz]) => {
    const group = new THREE.Group()
    group.position.set(ox, oy, oz)
    group.rotation.y = rand(0, Math.PI * 2)

    // Body
    const owlBody = new THREE.Mesh(new THREE.SphereGeometry(0.22, 5, 5), mat(0x795548))
    owlBody.scale.set(1, 1.3, 0.9)
    group.add(owlBody)

    // Head
    const owlHead = new THREE.Mesh(new THREE.SphereGeometry(0.16, 5, 4), mat(0x8d6e63))
    owlHead.position.y = 0.32
    group.add(owlHead)

    // Eyes (large yellow circles)
    for (let e = -1; e <= 1; e += 2) {
      const eyeWhite = new THREE.Mesh(new THREE.CircleGeometry(0.065, 6), mat(0xffeb3b, { emissive: 0xffeb3b, emissiveIntensity: 0.4 }))
      eyeWhite.position.set(e * 0.08, 0.34, 0.15)
      group.add(eyeWhite)
      const pupil = new THREE.Mesh(new THREE.CircleGeometry(0.028, 5), mat(0x212121))
      pupil.position.set(e * 0.08, 0.34, 0.155)
      group.add(pupil)
    }

    // Beak
    const beak = new THREE.Mesh(new THREE.ConeGeometry(0.035, 0.09, 3), mat(0xff8f00))
    beak.rotation.x = Math.PI / 2
    beak.position.set(0, 0.27, 0.17)
    group.add(beak)

    // Ear tufts
    for (let e = -1; e <= 1; e += 2) {
      const tuft = new THREE.Mesh(new THREE.ConeGeometry(0.035, 0.12, 3), mat(0x795548))
      tuft.position.set(e * 0.11, 0.46, 0.02)
      tuft.rotation.z = e * 0.3
      group.add(tuft)
    }

    // Branch
    const branch = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.06, 1.4, 5),
      mat(TRUNK_BROWN)
    )
    branch.rotation.z = Math.PI / 2
    branch.position.set(0, -0.25, 0)
    group.add(branch)

    add(group)
  })

  // ── Butterflies (4, animated flutter) ──
  const butterflyData = [
    { x: 3,   y: 2.0, z: 6,   color: 0xff80ab },
    { x: -8,  y: 1.8, z: 12,  color: 0x80d8ff },
    { x: 22,  y: 2.5, z: -10, color: 0xb388ff },
    { x: -25, y: 1.5, z: 20,  color: 0xffcc80 },
  ]
  butterflyData.forEach(bd => {
    const group = new THREE.Group()
    group.position.set(bd.x, bd.y, bd.z)

    // Body
    const bBody = new THREE.Mesh(
      new THREE.CylinderGeometry(0.015, 0.02, 0.16, 4),
      mat(0x424242)
    )
    group.add(bBody)

    // Wings
    const wingMat = mat(bd.color, {
      transparent: true, opacity: 0.75, side: THREE.DoubleSide,
      emissive: bd.color, emissiveIntensity: 0.3,
    })
    for (let side = -1; side <= 1; side += 2) {
      const wingGeo = new THREE.PlaneGeometry(0.2, 0.16)
      const wing = new THREE.Mesh(wingGeo, wingMat)
      wing.position.x = side * 0.11
      wing.rotation.y = side * 0.3
      wing.name = 'wing'
      group.add(wing)
    }

    scene.add(group); allMeshes.push(group)
    butterflies.push({ group, baseY: bd.y, time: rand(0, Math.PI * 2), baseX: bd.x, baseZ: bd.z })
  })

  // ── Deer (2) ──
  const deerPositions = [[32, -38, 0.8], [-28, 42, 2.2]]
  deerPositions.forEach(([dx, dz, rotY]) => {
    const group = new THREE.Group()
    group.position.set(dx, 0, dz)
    group.rotation.y = rotY

    // Body
    const deerBody = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.45, 1.0),
      mat(0xa1887f)
    )
    deerBody.position.y = 0.9
    group.add(deerBody)

    // Neck
    const neck = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.12, 0.5, 5),
      mat(0xa1887f)
    )
    neck.position.set(0, 1.3, 0.4)
    neck.rotation.x = 0.3
    group.add(neck)

    // Head
    const deerHead = new THREE.Mesh(
      new THREE.BoxGeometry(0.2, 0.2, 0.3),
      mat(0xbcaaa4)
    )
    deerHead.position.set(0, 1.55, 0.55)
    group.add(deerHead)

    // Antlers (cone shapes)
    for (let side = -1; side <= 1; side += 2) {
      // Main antler
      const antler = new THREE.Mesh(
        new THREE.ConeGeometry(0.03, 0.5, 4),
        mat(0x5d4037)
      )
      antler.position.set(side * 0.1, 1.85, 0.5)
      antler.rotation.z = side * 0.3
      group.add(antler)

      // Branch
      const branch = new THREE.Mesh(
        new THREE.ConeGeometry(0.02, 0.25, 3),
        mat(0x5d4037)
      )
      branch.position.set(side * 0.18, 1.95, 0.5)
      branch.rotation.z = side * 0.6
      group.add(branch)
    }

    // Legs (4 cylinder)
    for (let lx = -1; lx <= 1; lx += 2) {
      for (let lz = -1; lz <= 1; lz += 2) {
        const leg = new THREE.Mesh(
          new THREE.CylinderGeometry(0.04, 0.035, 0.65, 4),
          mat(0x8d6e63)
        )
        leg.position.set(lx * 0.18, 0.35, lz * 0.35)
        group.add(leg)
      }
    }

    // Tail
    const deerTail = new THREE.Mesh(
      new THREE.SphereGeometry(0.06, 4, 3),
      mat(0xffffff)
    )
    deerTail.position.set(0, 1.0, -0.55)
    group.add(deerTail)

    add(group)
  })

  // ═══════════════════════════════════════════════════════════════
  //  16. ROCK FORMATIONS (10 clusters + 3 standalone boulders)
  // ═══════════════════════════════════════════════════════════════
  {
    const rockClusterCenters = [
      [12, 30], [-14, -40], [35, -28], [-32, 12],
      [44, 44], [-44, -44], [8, 45], [-42, 8],
      [48, -5], [-5, -48],
    ]

    rockClusterCenters.forEach(([rcx, rcz]) => {
      const count = randInt(3, 6)
      for (let r = 0; r < count; r++) {
        const rr = rand(0.25, 0.8)
        const geo = new THREE.DodecahedronGeometry(rr, 0)
        const rock = new THREE.Mesh(geo, mat(pick(ROCK_COLORS), { roughness: 1.0 }))
        rock.position.set(rcx + rand(-2, 2), rr * 0.55, rcz + rand(-2, 2))
        rock.rotation.set(rand(0, 1), rand(0, 1), rand(0, 1))
        rock.scale.y = rand(0.5, 0.9)
        add(rock)

        // Moss tint on some
        if (Math.random() > 0.55) {
          const mossGeo = new THREE.SphereGeometry(rr * 0.5, 4, 3)
          const moss = new THREE.Mesh(mossGeo, mat(0x4a7a3a, { transparent: true, opacity: 0.6 }))
          moss.position.copy(rock.position)
          moss.position.y += rr * 0.3
          moss.scale.set(1.2, 0.3, 1.2)
          add(moss, false)
        }
      }
    })

    // Standalone boulders with FIXED colliders
    const boulders = [
      { x: 20, z: -42, r: 1.5 },
      { x: -35, z: -35, r: 1.3 },
      { x: 42, z: 28, r: 1.2 },
    ]
    boulders.forEach(b => {
      const geo = new THREE.DodecahedronGeometry(b.r, 1)
      const rock = new THREE.Mesh(geo, mat(0x616161, { roughness: 1.0 }))
      rock.position.set(b.x, b.r * 0.6, b.z)
      rock.scale.y = 0.7
      rock.rotation.set(rand(0, 1), rand(0, 1), rand(0, 1))
      add(rock)

      // Moss patch on top
      const mossGeo = new THREE.SphereGeometry(b.r * 0.6, 5, 4)
      const moss = new THREE.Mesh(mossGeo, mat(0x4a7a3a, { transparent: true, opacity: 0.5 }))
      moss.position.set(b.x, b.r * 0.9, b.z)
      moss.scale.y = 0.25
      add(moss, false)

      // Rapier collider
      const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(b.x, b.r * 0.5, b.z)
      const body = world.createRigidBody(bd)
      world.createCollider(
        RAPIER.ColliderDesc.ball(b.r * 0.7).setFriction(0.5),
        body
      )
    })
  }

  // ═══════════════════════════════════════════════════════════════
  //  17. GROUND COVER — flowers, leaf piles, ferns, mushroom patches
  // ═══════════════════════════════════════════════════════════════

  // ── Flowers (35+) ──
  for (let f = 0; f < 38; f++) {
    const angle = rand(0, Math.PI * 2)
    const dist = rand(3, 55)
    const fx = Math.cos(angle) * dist
    const fz = Math.sin(angle) * dist
    const stemH = rand(0.15, 0.45)

    // Stem
    const stemGeo = new THREE.CylinderGeometry(0.015, 0.015, stemH, 4)
    const stem = new THREE.Mesh(stemGeo, mat(0x388e3c))
    stem.position.set(fx, stemH / 2 + 0.01, fz)
    scene.add(stem); allMeshes.push(stem)

    // Bloom
    const bloomR = rand(0.04, 0.1)
    const bloomColor = pick(FLOWER_COLORS)
    const bloom = new THREE.Mesh(
      new THREE.SphereGeometry(bloomR, 5, 4),
      mat(bloomColor, { emissive: bloomColor, emissiveIntensity: 0.1 })
    )
    bloom.position.set(fx, stemH + bloomR + 0.01, fz)
    scene.add(bloom); allMeshes.push(bloom)
  }

  // ── Leaf piles (25) ──
  for (let lp = 0; lp < 25; lp++) {
    const angle = rand(0, Math.PI * 2)
    const dist = rand(2, 55)
    const lx = Math.cos(angle) * dist
    const lz = Math.sin(angle) * dist
    const leafGeo = new THREE.CircleGeometry(rand(0.3, 0.9), 5)
    const leafColors = [0x33691e, 0x558b2f, 0x827717, 0x6d4c41, 0xbf360c]
    const leaf = new THREE.Mesh(leafGeo, mat(pick(leafColors), { side: THREE.DoubleSide }))
    leaf.rotation.x = -Math.PI / 2
    leaf.rotation.z = rand(0, Math.PI * 2)
    leaf.position.set(lx, 0.018, lz)
    scene.add(leaf); allMeshes.push(leaf)
  }

  // ── Fallen leaves (scattered flat planes) ──
  for (let fl = 0; fl < 30; fl++) {
    const angle = rand(0, Math.PI * 2)
    const dist = rand(2, 55)
    const lx = Math.cos(angle) * dist
    const lz = Math.sin(angle) * dist
    const leafGeo = new THREE.PlaneGeometry(rand(0.1, 0.25), rand(0.1, 0.2))
    const autumnColors = [0xd84315, 0xff8f00, 0xfdd835, 0x6d4c41, 0xbf360c, 0xe65100]
    const leaf = new THREE.Mesh(leafGeo, mat(pick(autumnColors), { side: THREE.DoubleSide }))
    leaf.rotation.x = -Math.PI / 2 + rand(-0.1, 0.1)
    leaf.rotation.z = rand(0, Math.PI * 2)
    leaf.position.set(lx, 0.015, lz)
    scene.add(leaf); allMeshes.push(leaf)
  }

  // ── Fern bushes (15 clusters) ──
  for (let fb = 0; fb < 15; fb++) {
    const angle = rand(0, Math.PI * 2)
    const dist = rand(5, 50)
    const bx = Math.cos(angle) * dist
    const bz = Math.sin(angle) * dist

    for (let frond = 0; frond < 5; frond++) {
      const fh = rand(0.3, 0.8)
      const fw = rand(0.15, 0.3)
      const fernGeo = new THREE.PlaneGeometry(fw, fh)
      const fern = new THREE.Mesh(fernGeo, mat(pick(FOLIAGE_DEEP), { side: THREE.DoubleSide }))
      fern.position.set(bx + rand(-0.3, 0.3), fh / 2, bz + rand(-0.3, 0.3))
      const rotY = rand(0, Math.PI * 2)
      fern.rotation.y = rotY
      fern.rotation.x = rand(-0.2, 0.2)
      scene.add(fern); allMeshes.push(fern)
    }
  }

  // ── Mushroom patches (8 groups of tiny mushrooms) ──
  for (let mp = 0; mp < 8; mp++) {
    const angle = rand(0, Math.PI * 2)
    const dist = rand(8, 50)
    const gx = Math.cos(angle) * dist
    const gz = Math.sin(angle) * dist
    const count = randInt(3, 7)

    for (let m = 0; m < count; m++) {
      const mx = gx + rand(-0.8, 0.8)
      const mz = gz + rand(-0.8, 0.8)
      const mh = rand(0.1, 0.3)
      const mr = rand(0.06, 0.15)

      const stem = new THREE.Mesh(
        new THREE.CylinderGeometry(mr * 0.25, mr * 0.3, mh, 4),
        mat(0xf5f0e8)
      )
      stem.position.set(mx, mh / 2, mz)
      scene.add(stem); allMeshes.push(stem)

      const cap = new THREE.Mesh(
        new THREE.SphereGeometry(mr, 4, 3, 0, Math.PI * 2, 0, Math.PI / 2),
        mat(pick(MUSHROOM_CAPS))
      )
      cap.position.set(mx, mh, mz)
      cap.scale.y = 0.4
      scene.add(cap); allMeshes.push(cap)
    }
  }

  // ═══════════════════════════════════════════════════════════════
  //  18. DYNAMIC OBJECTS — pushable by car
  // ═══════════════════════════════════════════════════════════════

  // ── Small pushable logs (8) ──
  const pushLogPositions = [
    [4, 3], [-7, 8], [15, -10], [-3, -12],
    [25, 5], [-22, -8], [8, 25], [-18, 15],
  ]
  pushLogPositions.forEach(([lx, lz]) => {
    const logLen = rand(0.8, 1.6)
    const logR = rand(0.1, 0.2)
    const geo = new THREE.CylinderGeometry(logR, logR, logLen, 5)
    const log = new THREE.Mesh(geo, mat(TRUNK_BROWN))
    log.rotation.z = Math.PI / 2
    log.position.set(lx, logR + 0.01, lz)
    add(log)

    const bd = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(lx, logR + 0.01, lz)
      .setLinearDamping(0.4)
      .setAngularDamping(0.4)
    const body = world.createRigidBody(bd)

    _q.setFromEuler(_euler.set(0, 0, Math.PI / 2))
    world.createCollider(
      RAPIER.ColliderDesc.cylinder(logLen / 2, logR)
        .setDensity(3.0)
        .setFriction(0.5)
        .setRestitution(0.1)
        .setRotation({ x: _q.x, y: _q.y, z: _q.z, w: _q.w }),
      body
    )

    syncList.push({ mesh: log, body })
  })

  // ── Pushable rocks (5) ──
  const pushRockPositions = [
    [6, -8], [-12, 4], [3, 18], [18, -22], [-28, -12],
  ]
  pushRockPositions.forEach(([rx, rz]) => {
    const rr = rand(0.2, 0.4)
    const geo = new THREE.DodecahedronGeometry(rr, 0)
    const rock = new THREE.Mesh(geo, mat(pick(ROCK_COLORS), { roughness: 1.0 }))
    rock.position.set(rx, rr, rz)
    add(rock)

    const bd = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(rx, rr, rz)
      .setLinearDamping(0.3)
      .setAngularDamping(0.3)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.ball(rr)
        .setDensity(3.0)
        .setFriction(0.5)
        .setRestitution(0.15),
      body
    )

    syncList.push({ mesh: rock, body })
  })

  // ── Pushable mushroom caps (4 detached caps) ──
  const pushCapPositions = [
    [9, 12], [-15, -8], [22, 22], [-30, 5],
  ]
  pushCapPositions.forEach(([cx, cz]) => {
    const capR = rand(0.5, 0.9)
    const capGeo = new THREE.SphereGeometry(capR, 6, 4, 0, Math.PI * 2, 0, Math.PI / 2)
    const capMesh = new THREE.Mesh(capGeo, mat(pick(MUSHROOM_CAPS)))
    capMesh.position.set(cx, capR * 0.3, cz)
    capMesh.scale.y = 0.45
    add(capMesh)

    const bd = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(cx, capR * 0.3, cz)
      .setLinearDamping(0.3)
      .setAngularDamping(0.3)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.ball(capR * 0.5)
        .setDensity(1.5)
        .setFriction(0.4)
        .setRestitution(0.2),
      body
    )

    syncList.push({ mesh: capMesh, body })
  })

  // ── Pushable acorns (3 small brown spheres) ──
  const acornPositions = [[2, -2], [-5, 6], [14, 3]]
  acornPositions.forEach(([ax, az]) => {
    const ar = rand(0.12, 0.2)

    // Acorn body
    const acorn = new THREE.Mesh(
      new THREE.SphereGeometry(ar, 5, 4),
      mat(0x6d4c41)
    )
    acorn.position.set(ax, ar, az)
    acorn.scale.y = 1.2
    add(acorn)

    // Cap on top (visual only, stays attached for simplicity via sync)
    const capMesh = new THREE.Mesh(
      new THREE.SphereGeometry(ar * 0.8, 5, 3, 0, Math.PI * 2, 0, Math.PI / 2),
      mat(0x5d4037)
    )
    capMesh.position.set(0, ar * 0.6, 0)
    capMesh.scale.y = 0.4
    acorn.add(capMesh)

    const bd = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(ax, ar, az)
      .setLinearDamping(0.2)
      .setAngularDamping(0.2)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.ball(ar)
        .setDensity(2.0)
        .setFriction(0.4)
        .setRestitution(0.3),
      body
    )

    syncList.push({ mesh: acorn, body })
  })

  // ═══════════════════════════════════════════════════════════════
  //  19. AMBIENT LIGHTING — deep forest atmosphere
  // ═══════════════════════════════════════════════════════════════
  {
    // Overhead green-ish ambient
    const ambientForest = new THREE.PointLight(0x88cc77, 0.5, 50, 2)
    ambientForest.position.set(0, 8, 0)
    scene.add(ambientForest)

    // Warm accent lights scattered
    const accentLights = [
      { x: 25,  y: 5, z: -20, color: 0xffcc66, intensity: 0.35, dist: 20 },
      { x: -25, y: 5, z: 20,  color: 0xcc99ff, intensity: 0.3,  dist: 20 },
      { x: 0,   y: 6, z: -40, color: 0x81d4fa, intensity: 0.25, dist: 18 },
      { x: 0,   y: 6, z: 40,  color: 0xa5d6a7, intensity: 0.3,  dist: 18 },
      { x: -40, y: 5, z: -20, color: 0xf48fb1, intensity: 0.2,  dist: 15 },
      { x: 40,  y: 5, z: 20,  color: 0xffee58, intensity: 0.25, dist: 15 },
    ]

    accentLights.forEach(al => {
      const light = new THREE.PointLight(al.color, al.intensity, al.dist, 2)
      light.position.set(al.x, al.y, al.z)
      scene.add(light)
    })
  }

  // ═══════════════════════════════════════════════════════════════
  //  UPDATE — animate all the magical elements
  // ═══════════════════════════════════════════════════════════════
  let elapsed = 0

  return {
    syncList,

    update(dt) {
      elapsed += dt

      // ── Fairy lights: bob + pulse ──
      for (let i = 0; i < fairyLights.length; i++) {
        const fl = fairyLights[i]
        // Bob up/down
        const newY = fl.baseY + Math.sin(elapsed * fl.speed + fl.phase) * 0.35
        fl.mesh.position.y = newY
        if (fl.light) fl.light.position.y = newY

        // Firefly pulse
        if (fl.pulses) {
          const pulse = (Math.sin(elapsed * fl.pulseSpeed + fl.phase) + 1) * 0.5
          fl.mesh.material.opacity = 0.3 + pulse * 0.7
          fl.mesh.material.emissiveIntensity = 0.4 + pulse * 2.0
        }
      }

      // ── Butterfly wing flutter + drift ──
      for (let i = 0; i < butterflies.length; i++) {
        const bf = butterflies[i]
        bf.time += dt

        // Gentle figure-8 drift
        const driftX = Math.sin(elapsed * 0.4 + i * 2.5) * 2
        const driftZ = Math.cos(elapsed * 0.3 + i * 1.7) * 2
        bf.group.position.x = bf.baseX + driftX
        bf.group.position.z = bf.baseZ + driftZ
        bf.group.position.y = bf.baseY + Math.sin(elapsed * 1.2 + i * 3) * 0.4

        // Rotate to face direction of movement
        bf.group.rotation.y += dt * 0.5

        // Flutter wings
        bf.group.children.forEach(child => {
          if (child.name === 'wing') {
            const side = child.position.x > 0 ? 1 : -1
            child.rotation.y = side * (0.3 + Math.sin(elapsed * 10 + bf.time) * 0.55)
          }
        })
      }

      // ── Crystal glow pulsing ──
      for (let i = 0; i < crystals.length; i++) {
        const cr = crystals[i]
        const pulse = (Math.sin(elapsed * cr.speed + cr.phase) + 1) * 0.5
        cr.mesh.material.emissiveIntensity = cr.baseEmissive * (0.4 + pulse * 0.8)
        cr.mesh.material.opacity = 0.5 + pulse * 0.3
      }

      // ── Sync dynamic bodies ──
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
