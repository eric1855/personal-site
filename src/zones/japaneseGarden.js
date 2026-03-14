/**
 * Japanese Garden zone — a serene zen garden north of the city center.
 *
 * Center: (0, 0, -50), radius ~18
 *
 * Contains: torii gate, 3-tier pagoda, zen rock garden with raked sand,
 * koi pond with animated fish, arched bridge (drivable), stone lanterns (4),
 * bamboo grove, cherry blossom trees (3), stepping stones, bench, fence,
 * shishi-odoshi, tsukubai, stone statues, moss patches, bonsai on pedestal,
 * dynamic pushable zen rocks (3) and wooden buckets (2).
 */
import * as THREE from 'three'

// ── Zone constants ──────────────────────────────────────────────────────────
const CX = 0
const CZ = -50

// ── Reusable materials ──────────────────────────────────────────────────────
const _mat = (color, opts = {}) =>
  new THREE.MeshStandardMaterial({ color, flatShading: true, ...opts })

const RED_VERMILLION = _mat('#d42c2c')
const DARK_WOOD      = _mat('#4a3728')
const DARK_ROOF      = _mat('#2c2c2c')
const STONE_GRAY     = _mat('#888888')
const STONE_DARK     = _mat('#666666')
const SAND_COLOR     = _mat('#d4c5a0')
const RAKED_SAND     = _mat('#c4b590')
const BAMBOO_GREEN   = _mat('#5b8c5a')
const BAMBOO_YELLOW  = _mat('#7a9a58')
const CHERRY_PINK    = _mat('#FFB7C5')
const CHERRY_TRUNK   = _mat('#5c3a1e')
const WATER_MAT      = _mat('#1a8a7a', { transparent: true, opacity: 0.5, side: THREE.DoubleSide })
const LILY_GREEN     = _mat('#2d8a4e')
const LOTUS_PINK     = _mat('#f4a0b5')
const KOI_ORANGE     = _mat('#e87830')
const KOI_WHITE      = _mat('#f0ede4')
const KOI_RED        = _mat('#c43030')
const WOOD_FENCE     = _mat('#8B7355')
const MOSS_GREEN     = _mat('#3a6b3a')
const PETAL_PINK     = _mat('#ffccd5', { transparent: true, opacity: 0.8, side: THREE.DoubleSide })

// ── Helpers ─────────────────────────────────────────────────────────────────

/** Create a mesh, set position, enable shadow, add to parent. */
function _m(geo, mat, pos, parent, rot) {
  const mesh = new THREE.Mesh(geo, mat)
  mesh.position.set(pos[0], pos[1], pos[2])
  if (rot) {
    if (rot[0]) mesh.rotation.x = rot[0]
    if (rot[1]) mesh.rotation.y = rot[1]
    if (rot[2]) mesh.rotation.z = rot[2]
  }
  mesh.castShadow = true
  mesh.receiveShadow = true
  parent.add(mesh)
  return mesh
}

/** Create a fixed Rapier collider (cuboid). */
function _fixedCuboid(RAPIER, world, x, y, z, hx, hy, hz) {
  const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(x, y, z)
  const body = world.createRigidBody(bd)
  world.createCollider(
    RAPIER.ColliderDesc.cuboid(hx, hy, hz).setFriction(0.5),
    body
  )
  return body
}

/** Create a fixed Rapier collider (cylinder). */
function _fixedCylinder(RAPIER, world, x, y, z, halfHeight, radius) {
  const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(x, y, z)
  const body = world.createRigidBody(bd)
  world.createCollider(
    RAPIER.ColliderDesc.cylinder(halfHeight, radius).setFriction(0.5),
    body
  )
  return body
}

/** Create a dynamic Rapier body + cuboid collider, return { mesh, body } for syncList. */
function _dynamicCuboid(RAPIER, world, mesh, x, y, z, hx, hy, hz, density) {
  const bd = RAPIER.RigidBodyDesc.dynamic()
    .setTranslation(x, y, z)
    .setLinearDamping(0.3)
    .setAngularDamping(0.3)
  const body = world.createRigidBody(bd)
  world.createCollider(
    RAPIER.ColliderDesc.cuboid(hx, hy, hz)
      .setDensity(density || 5.0)
      .setFriction(0.4)
      .setRestitution(0.1),
    body
  )
  return { mesh, body }
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────────────────────────────
export function createJapaneseGarden(scene, RAPIER, world) {
  const syncList = []
  const koiFish = []
  const lanternLights = []

  const root = new THREE.Group()
  root.position.set(CX, 0, CZ)
  scene.add(root)

  // ═══════════════════════════════════════════════════════════════════════════
  // 1. TORII GATE — entrance facing south (toward city)
  // ═══════════════════════════════════════════════════════════════════════════
  ;(function createToriiGate() {
    const g = new THREE.Group()
    const pillarH = 5.0
    const pillarR = 0.2
    const spacing = 2.8

    // Two vertical pillars
    const pillarGeo = new THREE.CylinderGeometry(pillarR, pillarR * 1.1, pillarH, 6)
    _m(pillarGeo, RED_VERMILLION, [-spacing / 2, pillarH / 2, 0], g)
    _m(pillarGeo, RED_VERMILLION, [spacing / 2, pillarH / 2, 0], g)

    // Colliders for pillars
    _fixedCylinder(RAPIER, world, CX - spacing / 2, pillarH / 2, CZ + 16, pillarH / 2, pillarR * 1.1)
    _fixedCylinder(RAPIER, world, CX + spacing / 2, pillarH / 2, CZ + 16, pillarH / 2, pillarR * 1.1)

    // Top beam (kasagi) — wider, slightly angled ends for the curved-up look
    const beamGeo = new THREE.BoxGeometry(spacing + 1.6, 0.2, 0.35, 1, 1, 1)
    const topBeam = _m(beamGeo, RED_VERMILLION, [0, pillarH + 0.1, 0], g)

    // Second beam (nuki) — straight horizontal
    const nukiGeo = new THREE.BoxGeometry(spacing + 0.8, 0.15, 0.25)
    _m(nukiGeo, RED_VERMILLION, [0, pillarH * 0.78, 0], g)

    // Curved-up end caps on top beam (angled thin boxes)
    const endGeo = new THREE.BoxGeometry(0.5, 0.12, 0.35)
    const leftEnd = _m(endGeo, RED_VERMILLION, [-(spacing / 2 + 1.05), pillarH + 0.22, 0], g, [0, 0, 0.2])
    const rightEnd = _m(endGeo, RED_VERMILLION, [spacing / 2 + 1.05, pillarH + 0.22, 0], g, [0, 0, -0.2])

    g.position.set(0, 0, 16)
    root.add(g)
  })()

  // ═══════════════════════════════════════════════════════════════════════════
  // 2. PAGODA — 3-tier centerpiece
  // ═══════════════════════════════════════════════════════════════════════════
  ;(function createPagoda() {
    const g = new THREE.Group()
    const tiers = [
      { bodyW: 3.0, bodyH: 1.8, roofW: 4.4, roofH: 0.18, y: 0 },
      { bodyW: 2.4, bodyH: 1.5, roofW: 3.6, roofH: 0.16, y: 1.98 },
      { bodyW: 1.8, bodyH: 1.2, roofW: 2.8, roofH: 0.14, y: 3.64 },
    ]

    let topY = 0
    tiers.forEach((t) => {
      // Body
      const bodyGeo = new THREE.BoxGeometry(t.bodyW, t.bodyH, t.bodyW, 1, 1, 1)
      _m(bodyGeo, DARK_WOOD, [0, t.y + t.bodyH / 2, 0], g)

      // Roof — wider, thin, with slight overhang
      const roofGeo = new THREE.BoxGeometry(t.roofW, t.roofH, t.roofW, 1, 1, 1)
      _m(roofGeo, DARK_ROOF, [0, t.y + t.bodyH + t.roofH / 2, 0], g)

      // Small upturned edges on roof (4 edge pieces)
      const edgeGeo = new THREE.BoxGeometry(t.roofW * 0.15, 0.08, t.roofW + 0.1)
      const edgeGeo2 = new THREE.BoxGeometry(t.roofW + 0.1, 0.08, t.roofW * 0.15)
      _m(edgeGeo, DARK_ROOF, [t.roofW / 2, t.y + t.bodyH + t.roofH + 0.06, 0], g, [0, 0, -0.15])
      _m(edgeGeo, DARK_ROOF, [-t.roofW / 2, t.y + t.bodyH + t.roofH + 0.06, 0], g, [0, 0, 0.15])
      _m(edgeGeo2, DARK_ROOF, [0, t.y + t.bodyH + t.roofH + 0.06, t.roofW / 2], g, [0.15, 0, 0])
      _m(edgeGeo2, DARK_ROOF, [0, t.y + t.bodyH + t.roofH + 0.06, -t.roofW / 2], g, [-0.15, 0, 0])

      topY = t.y + t.bodyH + t.roofH
    })

    // Spire on top — thin cone
    const spireGeo = new THREE.ConeGeometry(0.12, 1.2, 5)
    _m(spireGeo, DARK_ROOF, [0, topY + 0.6, 0], g)

    g.position.set(-2, 0, -3)
    root.add(g)

    // Collider for the whole pagoda body
    _fixedCuboid(RAPIER, world, CX - 2, 2.5, CZ - 3, 2.2, 2.5, 2.2)
  })()

  // ═══════════════════════════════════════════════════════════════════════════
  // 3. ZEN ROCK GARDEN — raked sand with rocks
  // ═══════════════════════════════════════════════════════════════════════════
  const zenRocks = []
  ;(function createZenGarden() {
    // Sand base
    const sandGeo = new THREE.PlaneGeometry(10, 8)
    const sand = _m(sandGeo, SAND_COLOR, [7, 0.02, 2], root, [-Math.PI / 2, 0, 0])
    sand.receiveShadow = true
    sand.castShadow = false

    // Low wooden frame border
    const frameH = 0.15
    const frameMat = DARK_WOOD
    // Long sides
    _m(new THREE.BoxGeometry(10, frameH, 0.12), frameMat, [7, frameH / 2, 2 + 4], root)
    _m(new THREE.BoxGeometry(10, frameH, 0.12), frameMat, [7, frameH / 2, 2 - 4], root)
    // Short sides
    _m(new THREE.BoxGeometry(0.12, frameH, 8), frameMat, [7 + 5, frameH / 2, 2], root)
    _m(new THREE.BoxGeometry(0.12, frameH, 8), frameMat, [7 - 5, frameH / 2, 2], root)

    // Fixed rocks (5)
    const fixedRockPositions = [
      { x: 5.5, z: 1, s: 0.5 },
      { x: 8.5, z: 3, s: 0.4 },
      { x: 9, z: 0.5, s: 0.35 },
      { x: 6, z: 3.5, s: 0.3 },
      { x: 7.5, z: 0, s: 0.45 },
    ]
    fixedRockPositions.forEach((r) => {
      const geo = new THREE.DodecahedronGeometry(r.s, 0)
      const shade = 0.45 + Math.random() * 0.2
      const mat = _mat(new THREE.Color(shade, shade, shade))
      const rock = _m(geo, mat, [r.x, r.s * 0.6, r.z], root)
    })

    // Raked sand lines — concentric arcs around some rocks
    const rakedPositions = [
      { cx: 5.5, cz: 1, rings: 3 },
      { cx: 8.5, cz: 3, rings: 2 },
      { cx: 7.5, cz: 0, rings: 3 },
    ]
    rakedPositions.forEach((rp) => {
      for (let ring = 1; ring <= rp.rings; ring++) {
        const radius = 0.5 + ring * 0.45
        const segments = 16
        for (let i = 0; i < segments; i++) {
          const a1 = (i / segments) * Math.PI * 2
          const a2 = ((i + 1) / segments) * Math.PI * 2
          const mx = rp.cx + Math.cos((a1 + a2) / 2) * radius
          const mz = rp.cz + Math.sin((a1 + a2) / 2) * radius
          const len = radius * (Math.PI * 2) / segments
          const lineGeo = new THREE.PlaneGeometry(len, 0.03)
          const line = _m(lineGeo, RAKED_SAND, [mx, 0.025, mz], root, [-Math.PI / 2, (a1 + a2) / 2 + Math.PI / 2, 0])
          line.castShadow = false
        }
      }
    })

    // Dynamic pushable rocks (3) — car can push, disrupting the zen
    const dynamicRockDefs = [
      { x: 6.5, z: 2, s: 0.4 },
      { x: 8, z: 1.5, s: 0.35 },
      { x: 7, z: 3, s: 0.38 },
    ]
    dynamicRockDefs.forEach((r) => {
      const geo = new THREE.DodecahedronGeometry(r.s, 0)
      const mat = _mat('#777777')
      const mesh = _m(geo, mat, [0, 0, 0], root)
      const gx = CX + r.x
      const gz = CZ + r.z
      // Approximate dodecahedron as a cuboid for collision
      const hs = r.s * 0.7
      syncList.push(_dynamicCuboid(RAPIER, world, mesh, gx, r.s * 0.6, gz, hs, hs, hs, 8.0))
    })
  })()

  // ═══════════════════════════════════════════════════════════════════════════
  // 4. KOI POND — water surface with animated fish
  // ═══════════════════════════════════════════════════════════════════════════
  ;(function createKoiPond() {
    // Water surface — circular
    const pondRadius = 4.0
    const waterGeo = new THREE.CircleGeometry(pondRadius, 8)
    const water = _m(waterGeo, WATER_MAT, [6, -0.05, -8], root, [-Math.PI / 2, 0, 0])
    water.castShadow = false

    // Pond edge — low stone ring
    const ringSegments = 16
    for (let i = 0; i < ringSegments; i++) {
      const a = (i / ringSegments) * Math.PI * 2
      const rx = 6 + Math.cos(a) * (pondRadius + 0.15)
      const rz = -8 + Math.sin(a) * (pondRadius + 0.15)
      const stoneGeo = new THREE.BoxGeometry(0.7, 0.2, 0.3)
      _m(stoneGeo, STONE_DARK, [rx, 0.1, rz], root, [0, a, 0])
    }

    // Lily pads (4) — flat green circles
    const lilyPositions = [
      { x: 5.2, z: -7.2 },
      { x: 7.0, z: -9.0 },
      { x: 5.8, z: -9.5 },
      { x: 7.5, z: -7.5 },
    ]
    lilyPositions.forEach((lp, i) => {
      const padGeo = new THREE.CircleGeometry(0.35, 6)
      const pad = _m(padGeo, LILY_GREEN, [lp.x, 0.0, lp.z], root, [-Math.PI / 2, 0, 0])
      pad.castShadow = false

      // Lotus flower on some lily pads
      if (i < 3) {
        const lotusGeo = new THREE.SphereGeometry(0.08, 5, 4)
        _m(lotusGeo, LOTUS_PINK, [lp.x, 0.06, lp.z], root)
      }
    })

    // Koi fish (5) — animated swimming in circles
    const koiColors = [KOI_ORANGE, KOI_WHITE, KOI_RED, KOI_ORANGE, KOI_WHITE]
    const koiDefs = [
      { radius: 1.5, speed: 0.6, startAngle: 0 },
      { radius: 2.2, speed: 0.45, startAngle: 1.2 },
      { radius: 1.0, speed: 0.7, startAngle: 2.5 },
      { radius: 2.8, speed: 0.35, startAngle: 3.8 },
      { radius: 1.8, speed: 0.55, startAngle: 5.0 },
    ]
    koiDefs.forEach((kd, i) => {
      // Elongated sphere for fish body
      const fishGeo = new THREE.SphereGeometry(0.1, 5, 4)
      fishGeo.scale(1, 0.5, 2.2)
      const fishMesh = _m(fishGeo, koiColors[i], [0, -0.03, 0], root)
      fishMesh.castShadow = false

      koiFish.push({
        mesh: fishMesh,
        angle: kd.startAngle,
        radius: kd.radius,
        speed: kd.speed,
        centerX: 6,
        centerZ: -8,
      })
    })
  })()

  // ═══════════════════════════════════════════════════════════════════════════
  // 5. ARCHED BRIDGE — drivable, over the pond
  // ═══════════════════════════════════════════════════════════════════════════
  ;(function createArchedBridge() {
    const g = new THREE.Group()
    const bridgeSegs = 9
    const bridgeLen = 9.0
    const arcHeight = 1.2
    const bridgeWidth = 2.0

    for (let i = 0; i < bridgeSegs; i++) {
      const t = (i + 0.5) / bridgeSegs
      const x = (t - 0.5) * bridgeLen
      const y = Math.sin(t * Math.PI) * arcHeight
      const angle = Math.cos(t * Math.PI) * (arcHeight / (bridgeLen / 2)) // slope angle

      // Deck segment
      const segLen = bridgeLen / bridgeSegs + 0.05 // slight overlap
      const deckGeo = new THREE.BoxGeometry(segLen, 0.12, bridgeWidth)
      const deck = _m(deckGeo, DARK_WOOD, [x, y, 0], g, [0, 0, -angle * 0.5])

      // Collider for each deck segment — world space
      const wx = CX + 6 + x  // bridge at koi pond x
      const wz = CZ - 8      // bridge at koi pond z
      _fixedCuboid(RAPIER, world, wx, y, wz, segLen / 2, 0.08, bridgeWidth / 2)
    }

    // Railings — posts + horizontal rail on each side
    for (let i = 0; i <= bridgeSegs; i++) {
      const t = i / bridgeSegs
      const x = (t - 0.5) * bridgeLen
      const y = Math.sin(t * Math.PI) * arcHeight

      // Left and right railing posts
      const postGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.6, 5)
      _m(postGeo, RED_VERMILLION, [x, y + 0.3, bridgeWidth / 2], g)
      _m(postGeo, RED_VERMILLION, [x, y + 0.3, -bridgeWidth / 2], g)
    }

    // Horizontal railing beams (approximated with thin boxes along the arc)
    for (let i = 0; i < bridgeSegs; i++) {
      const t1 = i / bridgeSegs
      const t2 = (i + 1) / bridgeSegs
      const x1 = (t1 - 0.5) * bridgeLen
      const x2 = (t2 - 0.5) * bridgeLen
      const y1 = Math.sin(t1 * Math.PI) * arcHeight + 0.55
      const y2 = Math.sin(t2 * Math.PI) * arcHeight + 0.55
      const mx = (x1 + x2) / 2
      const my = (y1 + y2) / 2
      const segLen = bridgeLen / bridgeSegs + 0.02
      const slope = Math.atan2(y2 - y1, x2 - x1)

      const railGeo = new THREE.BoxGeometry(segLen, 0.06, 0.06)
      _m(railGeo, RED_VERMILLION, [mx, my, bridgeWidth / 2], g, [0, 0, slope])
      _m(railGeo, RED_VERMILLION, [mx, my, -bridgeWidth / 2], g, [0, 0, slope])
    }

    g.position.set(6, 0, -8)
    root.add(g)
  })()

  // ═══════════════════════════════════════════════════════════════════════════
  // 6. STONE LANTERNS (4) — warm emissive glow
  // ═══════════════════════════════════════════════════════════════════════════
  ;(function createStoneLanterns() {
    const lanternPositions = [
      { x: -6, z: 5 },
      { x: -6, z: -5 },
      { x: 12, z: 8 },
      { x: 12, z: -12 },
    ]

    lanternPositions.forEach((lp, idx) => {
      const g = new THREE.Group()

      // Post — thin stone cylinder
      const postH = 1.2
      const postGeo = new THREE.CylinderGeometry(0.12, 0.15, postH, 6)
      _m(postGeo, STONE_GRAY, [0, postH / 2, 0], g)

      // Light housing — box with emissive glow
      const housingH = 0.5
      const housingGeo = new THREE.BoxGeometry(0.5, housingH, 0.5, 1, 1, 1)
      const glowMat = new THREE.MeshStandardMaterial({
        color: '#8a7540',
        flatShading: true,
        emissive: '#ffaa33',
        emissiveIntensity: 0.8,
      })
      const housing = new THREE.Mesh(housingGeo, glowMat)
      housing.position.set(0, postH + housingH / 2, 0)
      housing.castShadow = true
      housing.receiveShadow = true
      g.add(housing)

      lanternLights.push({ mesh: housing, phase: idx * 1.5 })

      // Conical hat on top
      const hatGeo = new THREE.ConeGeometry(0.4, 0.3, 4)
      _m(hatGeo, STONE_DARK, [0, postH + housingH + 0.15, 0], g)

      // Base platform
      const baseGeo = new THREE.BoxGeometry(0.45, 0.1, 0.45)
      _m(baseGeo, STONE_GRAY, [0, 0.05, 0], g)

      g.position.set(lp.x, 0, lp.z)
      root.add(g)

      // Collider
      _fixedCuboid(RAPIER, world, CX + lp.x, 0.8, CZ + lp.z, 0.25, 0.8, 0.25)
    })
  })()

  // ═══════════════════════════════════════════════════════════════════════════
  // 7. BAMBOO GROVE — one side of the garden
  // ═══════════════════════════════════════════════════════════════════════════
  ;(function createBambooGrove() {
    const bambooCount = 14
    const groveX = -10
    const groveZ = -2

    for (let i = 0; i < bambooCount; i++) {
      const angle = (i / bambooCount) * Math.PI * 2.5 + i * 0.7
      const dist = 0.8 + (i % 3) * 0.6 + Math.sin(i * 2.3) * 0.4
      const bx = groveX + Math.cos(angle) * dist
      const bz = groveZ + Math.sin(angle) * dist

      const height = 4.0 + Math.sin(i * 3.1) * 1.5
      const radius = 0.06 + (i % 4 === 0 ? 0.03 : 0)
      const lean = (Math.sin(i * 5.7) * 0.05)
      const leanZ = (Math.cos(i * 4.3) * 0.05)
      const color = i % 3 === 0 ? BAMBOO_YELLOW : BAMBOO_GREEN

      const g = new THREE.Group()

      // Main stalk
      const stalkGeo = new THREE.CylinderGeometry(radius * 0.9, radius, height, 6)
      _m(stalkGeo, color, [0, height / 2, 0], g)

      // Nodes — slightly wider rings at intervals (on 2-3 stalks)
      if (i < 3) {
        const nodeCount = Math.floor(height / 1.2)
        for (let n = 1; n <= nodeCount; n++) {
          const ny = n * 1.2
          const nodeGeo = new THREE.CylinderGeometry(radius * 1.5, radius * 1.5, 0.06, 6)
          _m(nodeGeo, color, [0, ny, 0], g)
        }
      }

      g.position.set(bx, 0, bz)
      g.rotation.x = lean
      g.rotation.z = leanZ
      root.add(g)

      // Collider only on thicker stalks (every 4th)
      if (i % 4 === 0) {
        _fixedCylinder(RAPIER, world, CX + bx, height / 2, CZ + bz, height / 2, radius * 2)
      }
    }
  })()

  // ═══════════════════════════════════════════════════════════════════════════
  // 8. CHERRY BLOSSOM TREES (3) — artistic pink canopy
  // ═══════════════════════════════════════════════════════════════════════════
  ;(function createCherryBlossoms() {
    const treeDefs = [
      { x: -4, z: 10, lean: 0.1, scale: 1.0 },
      { x: 3, z: 12, lean: -0.08, scale: 0.85 },
      { x: -1, z: 14, lean: 0.05, scale: 0.95 },
    ]

    treeDefs.forEach((td) => {
      const g = new THREE.Group()

      // Trunk — slightly curved using two offset segments
      const trunkH = 2.0 * td.scale
      const trunkR = 0.15 * td.scale
      const lowerGeo = new THREE.CylinderGeometry(trunkR * 0.9, trunkR, trunkH * 0.6, 5)
      _m(lowerGeo, CHERRY_TRUNK, [0, trunkH * 0.3, 0], g)

      const upperGeo = new THREE.CylinderGeometry(trunkR * 0.7, trunkR * 0.9, trunkH * 0.5, 5)
      _m(upperGeo, CHERRY_TRUNK, [td.lean * 2, trunkH * 0.65, 0], g, [0, 0, td.lean])

      // Canopy — cluster of pink spheres
      const canopyY = trunkH + 0.5 * td.scale
      const canopyPositions = [
        [0, 0, 0, 1.2],
        [0.6, 0.2, 0.4, 0.8],
        [-0.5, 0.1, -0.3, 0.9],
        [0.2, 0.4, -0.5, 0.7],
        [-0.3, 0.3, 0.5, 0.75],
      ]
      canopyPositions.forEach(([ox, oy, oz, r]) => {
        const sphereGeo = new THREE.SphereGeometry(r * td.scale, 6, 5)
        _m(sphereGeo, CHERRY_PINK, [td.lean * 2 + ox * td.scale, canopyY + oy * td.scale, oz * td.scale], g)
      })

      // Petals on the ground — tiny pink flat planes
      for (let p = 0; p < 8; p++) {
        const px = (Math.random() - 0.5) * 3 * td.scale
        const pz = (Math.random() - 0.5) * 3 * td.scale
        const petalGeo = new THREE.PlaneGeometry(0.08, 0.08)
        const petal = _m(petalGeo, PETAL_PINK, [td.lean * 2 + px, 0.01, pz], g, [-Math.PI / 2, Math.random() * Math.PI, 0])
        petal.castShadow = false
      }

      g.position.set(td.x, 0, td.z)
      root.add(g)
    })
  })()

  // ═══════════════════════════════════════════════════════════════════════════
  // 9. STEPPING STONES — flat circular gray stones leading through the garden
  // ═══════════════════════════════════════════════════════════════════════════
  ;(function createSteppingStones() {
    const stonePositions = [
      { x: 0, z: 13 },
      { x: -0.5, z: 11 },
      { x: 0.3, z: 9 },
      { x: -0.2, z: 7 },
      { x: 0.5, z: 5 },
      { x: 1, z: 3 },
      { x: 2, z: 1 },
      { x: 3, z: -1 },
    ]
    stonePositions.forEach((sp) => {
      const radius = 0.3 + Math.random() * 0.15
      const stoneGeo = new THREE.CylinderGeometry(radius, radius * 1.1, 0.08, 6)
      const stone = _m(stoneGeo, STONE_GRAY, [sp.x, 0.04, sp.z], root)
    })
  })()

  // ═══════════════════════════════════════════════════════════════════════════
  // 10. WOODEN BENCH — facing the pond
  // ═══════════════════════════════════════════════════════════════════════════
  ;(function createBench() {
    const g = new THREE.Group()

    // Seat
    const seatGeo = new THREE.BoxGeometry(1.5, 0.08, 0.5)
    _m(seatGeo, DARK_WOOD, [0, 0.45, 0], g)

    // Legs (4)
    const legGeo = new THREE.BoxGeometry(0.08, 0.45, 0.08)
    _m(legGeo, DARK_WOOD, [-0.6, 0.225, 0.18], g)
    _m(legGeo, DARK_WOOD, [0.6, 0.225, 0.18], g)
    _m(legGeo, DARK_WOOD, [-0.6, 0.225, -0.18], g)
    _m(legGeo, DARK_WOOD, [0.6, 0.225, -0.18], g)

    // Backrest
    const backGeo = new THREE.BoxGeometry(1.5, 0.4, 0.06)
    _m(backGeo, DARK_WOOD, [0, 0.7, -0.22], g)

    g.position.set(1, 0, -5)
    root.add(g)
  })()

  // ═══════════════════════════════════════════════════════════════════════════
  // 11. BAMBOO FENCE — sections with horizontal cylinders between posts
  // ═══════════════════════════════════════════════════════════════════════════
  ;(function createBambooFence() {
    // Fence along the back edge (north)
    const fenceDefs = [
      { x1: -12, z1: -14, x2: 4, z2: -14 },
      { x1: -12, z1: -14, x2: -12, z2: 10 },
    ]

    fenceDefs.forEach((fd) => {
      const dx = fd.x2 - fd.x1
      const dz = fd.z2 - fd.z1
      const len = Math.sqrt(dx * dx + dz * dz)
      const angle = Math.atan2(dx, dz)
      const postCount = Math.floor(len / 2) + 1

      for (let i = 0; i < postCount; i++) {
        const t = i / (postCount - 1)
        const px = fd.x1 + dx * t
        const pz = fd.z1 + dz * t

        // Post
        const postGeo = new THREE.CylinderGeometry(0.06, 0.06, 1.0, 5)
        _m(postGeo, WOOD_FENCE, [px, 0.5, pz], root)
      }

      // Horizontal bamboo slats (3 levels)
      for (let h = 0; h < 3; h++) {
        const hy = 0.25 + h * 0.3
        const slats = Math.floor(len / 2)
        for (let s = 0; s < slats; s++) {
          const t = (s + 0.5) / slats
          const sx = fd.x1 + dx * t
          const sz = fd.z1 + dz * t
          const slatLen = len / slats + 0.05
          const slatGeo = new THREE.CylinderGeometry(0.03, 0.03, slatLen, 4)
          const slat = _m(slatGeo, WOOD_FENCE, [sx, hy, sz], root)
          slat.rotation.set(0, 0, Math.PI / 2)
          // Orient along the fence direction
          slat.rotation.y = angle
          if (Math.abs(dx) < 0.1) {
            // Vertical fence runs along Z
            slat.rotation.set(Math.PI / 2, 0, 0)
          }
        }
      }
    })
  })()

  // ═══════════════════════════════════════════════════════════════════════════
  // 12. SHISHI-ODOSHI (deer chaser) — decorative bamboo tube on pivot
  // ═══════════════════════════════════════════════════════════════════════════
  ;(function createShishiOdoshi() {
    const g = new THREE.Group()

    // Support posts (two)
    const postGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.6, 5)
    _m(postGeo, WOOD_FENCE, [-0.15, 0.3, 0], g)
    _m(postGeo, WOOD_FENCE, [0.15, 0.3, 0], g)

    // Horizontal pivot bar
    const barGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.35, 4)
    const bar = _m(barGeo, WOOD_FENCE, [0, 0.55, 0], g)
    bar.rotation.z = Math.PI / 2

    // Bamboo tube (tilted — resting position)
    const tubeGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.6, 5)
    const tube = _m(tubeGeo, BAMBOO_GREEN, [0.15, 0.55, 0], g, [0, 0, -0.4])

    // Water basin below
    const basinGeo = new THREE.CylinderGeometry(0.2, 0.15, 0.1, 6)
    _m(basinGeo, STONE_GRAY, [0.35, 0.05, 0], g)

    g.position.set(-3, 0, -6)
    root.add(g)
  })()

  // ═══════════════════════════════════════════════════════════════════════════
  // 13. TSUKUBAI — stone wash basin
  // ═══════════════════════════════════════════════════════════════════════════
  ;(function createTsukubai() {
    const g = new THREE.Group()

    // Stone basin — short wide cylinder
    const basinGeo = new THREE.CylinderGeometry(0.4, 0.45, 0.35, 7)
    _m(basinGeo, STONE_GRAY, [0, 0.175, 0], g)

    // Water inside — flat circle at the top
    const waterGeo = new THREE.CircleGeometry(0.35, 6)
    const water = _m(waterGeo, WATER_MAT, [0, 0.33, 0], g, [-Math.PI / 2, 0, 0])
    water.castShadow = false

    // Small bamboo ladle resting on top
    const ladleGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.5, 4)
    const ladle = _m(ladleGeo, BAMBOO_GREEN, [0, 0.38, 0], g, [0, 0, Math.PI / 2])

    g.position.set(-5, 0, 3)
    root.add(g)
  })()

  // ═══════════════════════════════════════════════════════════════════════════
  // 14. STONE STATUES — 2 simple seated Buddha-like shapes
  // ═══════════════════════════════════════════════════════════════════════════
  ;(function createStoneStatues() {
    const statuePositions = [
      { x: -7, z: -10 },
      { x: 10, z: -4 },
    ]

    statuePositions.forEach((sp) => {
      const g = new THREE.Group()

      // Base/body — cylinder (seated)
      const bodyGeo = new THREE.CylinderGeometry(0.25, 0.3, 0.5, 6)
      _m(bodyGeo, STONE_DARK, [0, 0.25, 0], g)

      // Head — sphere
      const headGeo = new THREE.SphereGeometry(0.18, 5, 4)
      _m(headGeo, STONE_DARK, [0, 0.62, 0], g)

      // Simple pedestal
      const pedestalGeo = new THREE.BoxGeometry(0.6, 0.1, 0.6)
      _m(pedestalGeo, STONE_GRAY, [0, 0.05, 0], g)

      g.position.set(sp.x, 0, sp.z)
      root.add(g)
    })
  })()

  // ═══════════════════════════════════════════════════════════════════════════
  // 15. MOSS PATCHES — small dark green planes scattered
  // ═══════════════════════════════════════════════════════════════════════════
  ;(function createMossPatches() {
    const mossPositions = [
      { x: -8, z: 0, s: 0.8 },
      { x: -3, z: 8, s: 0.6 },
      { x: 5, z: 6, s: 0.5 },
      { x: -9, z: -8, s: 0.7 },
      { x: 2, z: -10, s: 0.4 },
      { x: -5, z: -12, s: 0.55 },
      { x: 8, z: -2, s: 0.45 },
      { x: -2, z: 4, s: 0.5 },
    ]

    mossPositions.forEach((mp) => {
      const geo = new THREE.CircleGeometry(mp.s, 6)
      const moss = _m(geo, MOSS_GREEN, [mp.x, 0.01, mp.z], root, [-Math.PI / 2, Math.random() * Math.PI, 0])
      moss.castShadow = false
    })
  })()

  // ═══════════════════════════════════════════════════════════════════════════
  // 16. BONSAI TREE on a stone pedestal
  // ═══════════════════════════════════════════════════════════════════════════
  ;(function createBonsai() {
    const g = new THREE.Group()

    // Stone pedestal
    const pedestalGeo = new THREE.BoxGeometry(0.6, 0.5, 0.6)
    _m(pedestalGeo, STONE_GRAY, [0, 0.25, 0], g)

    // Tiny trunk
    const trunkGeo = new THREE.CylinderGeometry(0.04, 0.06, 0.35, 5)
    _m(trunkGeo, CHERRY_TRUNK, [0, 0.68, 0], g)

    // Round canopy
    const canopyGeo = new THREE.SphereGeometry(0.25, 5, 4)
    const canopyMat = _mat('#2a6e3a')
    _m(canopyGeo, canopyMat, [0, 0.95, 0], g)

    // Small secondary canopy lobe
    const lobe2Geo = new THREE.SphereGeometry(0.15, 5, 4)
    _m(lobe2Geo, canopyMat, [0.15, 0.85, 0.1], g)

    g.position.set(4, 0, 5)
    root.add(g)
  })()

  // ═══════════════════════════════════════════════════════════════════════════
  // 17. DYNAMIC WOODEN BUCKETS (2) — pushable
  // ═══════════════════════════════════════════════════════════════════════════
  ;(function createBuckets() {
    const bucketDefs = [
      { x: -3, z: 1 },
      { x: 9, z: 5 },
    ]

    bucketDefs.forEach((bd) => {
      const bucketR = 0.25
      const bucketH = 0.4
      const geo = new THREE.CylinderGeometry(bucketR, bucketR * 0.85, bucketH, 6)
      const mat = _mat('#9a7b4f')
      const mesh = _m(geo, mat, [0, 0, 0], root)

      // Metal band
      const bandGeo = new THREE.CylinderGeometry(bucketR + 0.01, bucketR + 0.01, 0.03, 6)
      const bandMat = _mat('#555555')
      const band = new THREE.Mesh(bandGeo, bandMat)
      band.position.y = bucketH * 0.3
      band.castShadow = true
      mesh.add(band)

      const gx = CX + bd.x
      const gz = CZ + bd.z
      const hs = bucketR
      syncList.push(_dynamicCuboid(RAPIER, world, mesh, gx, bucketH / 2, gz, hs, bucketH / 2, hs, 6.0))
    })
  })()

  // ═══════════════════════════════════════════════════════════════════════════
  // 18. GARDEN GROUND — subtle lighter patch under the whole garden area
  // ═══════════════════════════════════════════════════════════════════════════
  ;(function createGardenGround() {
    // Subtle gravel/earth tone base
    const groundGeo = new THREE.CircleGeometry(18, 8)
    const groundMat = _mat('#5a7a52', { side: THREE.DoubleSide })
    const ground = _m(groundGeo, groundMat, [0, 0.005, 0], root, [-Math.PI / 2, 0, 0])
    ground.receiveShadow = true
    ground.castShadow = false
  })()

  // ═══════════════════════════════════════════════════════════════════════════
  // UPDATE — animate koi fish + lantern glow
  // ═══════════════════════════════════════════════════════════════════════════
  return {
    syncList,
    update(dt) {
      // Animate koi fish swimming in circles
      for (const koi of koiFish) {
        koi.angle += koi.speed * dt
        const wx = koi.centerX + Math.cos(koi.angle) * koi.radius
        const wz = koi.centerZ + Math.sin(koi.angle) * koi.radius
        koi.mesh.position.set(wx, -0.03, wz)
        // Face direction of travel
        koi.mesh.rotation.y = -koi.angle + Math.PI / 2
      }

      // Pulse lantern glow
      const time = performance.now() * 0.001
      for (const lantern of lanternLights) {
        const pulse = 0.6 + Math.sin(time * 1.5 + lantern.phase) * 0.25
        lantern.mesh.material.emissiveIntensity = pulse
      }
    },
  }
}
