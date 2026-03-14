/**
 * Japanese Village & Gardens — serene full-sized world (~120x120 units).
 *
 * Traditional architecture, zen rock gardens, koi ponds, cherry blossoms,
 * bamboo groves, stone lanterns, bridges, and winding paths. Portfolio
 * buildings sit at the four cardinal positions within a peaceful village.
 *
 * Animated: koi fish swim in circles, lanterns pulse with warm glow,
 * paper lanterns sway gently.
 */
import * as THREE from 'three'

// ── Reusable materials ──────────────────────────────────────────────────
const _mat = (color, opts = {}) =>
  new THREE.MeshStandardMaterial({ color, flatShading: true, ...opts })

const _emissiveMat = (color, emissive, intensity = 0.6) =>
  new THREE.MeshStandardMaterial({
    color, emissive, emissiveIntensity: intensity, flatShading: true,
  })

// ── Palette ─────────────────────────────────────────────────────────────
const PAL = {
  grass:        '#5a7a50',
  sand:         '#d4c5a0',
  darkWood:     '#4a3728',
  wood:         '#6b4c2a',
  lightWood:    '#8b6f47',
  red:          '#b8372e',
  darkRed:      '#8b2920',
  roofTile:     '#3a3a3a',
  roofDark:     '#2e2e2e',
  stone:        '#7a7a7a',
  darkStone:    '#5a5a5a',
  lightStone:   '#9a9a9a',
  water:        '#1a8a7a',
  bamboo:       '#4a8a3a',
  bambooLight:  '#6aaa5a',
  cherryTrunk:  '#4a2a1a',
  cherryPink:   '#FFB7C5',
  cherryLight:  '#ffd1dc',
  petalPink:    '#ffccd5',
  moss:         '#3a5a2a',
  tatami:       '#c8b87a',
  paper:        '#f0e6d0',
  white:        '#eeeee6',
  lanternWarm:  '#ffaa44',
  koiOrange:    '#e86830',
  koiWhite:     '#f0e8e0',
  koiRed:       '#cc3030',
  lilyPad:      '#3a6a30',
  lotus:        '#f0a0b0',
  chrysanthemum:'#e8c840',
  iris:         '#6a40a0',
  riceGreen:    '#7aaa50',
  sake:         '#c8a870',
}

export function createWorld(scene, RAPIER, world) {
  const syncList = []
  const koiFish = []
  const lanterns = []
  const paperLanterns = []

  // ── Sky & fog ───────────────────────────────────────────────────────
  scene.background = new THREE.Color('#d4c4c8')
  scene.fog = new THREE.Fog('#d4c4c8', 40, 140)

  // ── Ground ──────────────────────────────────────────────────────────
  _createGround(scene, RAPIER, world)

  // ── Boundary walls ──────────────────────────────────────────────────
  _createBoundaryWalls(RAPIER, world)

  // ── Structures ──────────────────────────────────────────────────────
  _createToriiGates(scene, RAPIER, world)
  _createPagoda(scene, RAPIER, world)
  _createSmallHouses(scene, RAPIER, world)
  _createTeaHouse(scene, RAPIER, world)
  _createShrine(scene, RAPIER, world)
  _createCastleGate(scene, RAPIER, world)

  // ── Zen rock gardens ────────────────────────────────────────────────
  _createZenGardens(scene, RAPIER, world, syncList)

  // ── Koi ponds ───────────────────────────────────────────────────────
  _createKoiPonds(scene, RAPIER, world, koiFish)

  // ── Bridges ─────────────────────────────────────────────────────────
  _createBridges(scene, RAPIER, world)

  // ── Bamboo groves ───────────────────────────────────────────────────
  _createBambooGroves(scene, RAPIER, world)

  // ── Cherry blossom trees ────────────────────────────────────────────
  _createCherryTrees(scene)

  // ── Stone lanterns ──────────────────────────────────────────────────
  _createStoneLanterns(scene, RAPIER, world, lanterns)

  // ── Water features ──────────────────────────────────────────────────
  _createWaterFeatures(scene, RAPIER, world)

  // ── Garden details ──────────────────────────────────────────────────
  _createGardenDetails(scene, RAPIER, world)

  // ── Cultural props ──────────────────────────────────────────────────
  _createCulturalProps(scene, paperLanterns)

  // ── Interactive dynamic objects ─────────────────────────────────────
  _createDynamicObjects(scene, RAPIER, world, syncList)

  return {
    syncList,
    update(dt) {
      const t = performance.now() * 0.001

      // Koi fish swim in circles
      for (const koi of koiFish) {
        const angle = t * koi.speed + koi.phase
        koi.mesh.position.x = koi.cx + Math.cos(angle) * koi.radius
        koi.mesh.position.z = koi.cz + Math.sin(angle) * koi.radius
        koi.mesh.rotation.y = -angle + Math.PI / 2
      }

      // Lantern glow pulsing
      for (const l of lanterns) {
        const pulse = 0.4 + Math.sin(t * 1.2 + l.phase) * 0.25
        l.mat.emissiveIntensity = pulse
      }

      // Paper lanterns gentle sway
      for (const pl of paperLanterns) {
        pl.mesh.rotation.z = Math.sin(t * 0.8 + pl.phase) * 0.06
        pl.mesh.rotation.x = Math.cos(t * 0.6 + pl.phase * 1.3) * 0.04
      }
    },
  }
}

// ═════════════════════════════════════════════════════════════════════════
//  GROUND
// ═════════════════════════════════════════════════════════════════════════
function _createGround(scene, RAPIER, world) {
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(300, 300),
    _mat(PAL.grass, { side: THREE.DoubleSide })
  )
  mesh.rotation.x = -Math.PI / 2
  mesh.receiveShadow = true
  scene.add(mesh)

  // Rapier ground collider
  const bodyDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(0, 0, 0)
  const body = world.createRigidBody(bodyDesc)
  const colDesc = RAPIER.ColliderDesc.cuboid(150, 0.1, 150)
    .setFriction(0.8)
    .setRestitution(0.0)
  world.createCollider(colDesc, body)
}

// ═════════════════════════════════════════════════════════════════════════
//  BOUNDARY WALLS
// ═════════════════════════════════════════════════════════════════════════
function _createBoundaryWalls(RAPIER, world) {
  const HALF = 60
  const WALL_H = 5
  const WALL_THICK = 1
  const walls = [
    { x: 0,     z: -HALF, hx: HALF, hz: WALL_THICK / 2 },
    { x: 0,     z:  HALF, hx: HALF, hz: WALL_THICK / 2 },
    { x: -HALF, z: 0,     hx: WALL_THICK / 2, hz: HALF },
    { x:  HALF, z: 0,     hx: WALL_THICK / 2, hz: HALF },
  ]
  for (const w of walls) {
    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(w.x, WALL_H / 2, w.z)
    const b = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(w.hx, WALL_H / 2, w.hz).setFriction(0.5),
      b
    )
  }
}

// ═════════════════════════════════════════════════════════════════════════
//  TORII GATES
// ═════════════════════════════════════════════════════════════════════════
function _createToriiGates(scene, RAPIER, world) {
  const positions = [
    { x: 0, z: -40, ry: 0 },          // south entrance
    { x: -40, z: 0, ry: Math.PI / 2 }, // west entrance
  ]

  for (const pos of positions) {
    const group = new THREE.Group()
    group.position.set(pos.x, 0, pos.z)
    group.rotation.y = pos.ry

    const pillarMat = _mat(PAL.red)
    const beamMat = _mat(PAL.darkRed)

    // Two pillars
    const pillarGeo = new THREE.CylinderGeometry(0.25, 0.3, 5, 6)
    const pL = new THREE.Mesh(pillarGeo, pillarMat)
    pL.position.set(-2.2, 2.5, 0)
    pL.castShadow = true
    const pR = new THREE.Mesh(pillarGeo, pillarMat)
    pR.position.set(2.2, 2.5, 0)
    pR.castShadow = true
    group.add(pL, pR)

    // Top beam (kasagi) — slightly curved via wider top
    const topBeam = new THREE.Mesh(
      new THREE.BoxGeometry(6, 0.35, 0.6),
      beamMat
    )
    topBeam.position.set(0, 5.1, 0)
    topBeam.castShadow = true
    group.add(topBeam)

    // Second beam (nuki)
    const midBeam = new THREE.Mesh(
      new THREE.BoxGeometry(5.2, 0.2, 0.35),
      beamMat
    )
    midBeam.position.set(0, 4.0, 0)
    midBeam.castShadow = true
    group.add(midBeam)

    // Small roof overhangs on top beam
    const roofGeo = new THREE.BoxGeometry(6.6, 0.15, 0.9)
    const roof = new THREE.Mesh(roofGeo, _mat(PAL.roofDark))
    roof.position.set(0, 5.35, 0)
    roof.castShadow = true
    group.add(roof)

    scene.add(group)

    // Collider — two pillars
    for (const px of [-2.2, 2.2]) {
      const rcos = Math.cos(pos.ry)
      const rsin = Math.sin(pos.ry)
      const wx = pos.x + px * rcos
      const wz = pos.z + px * (-rsin)
      const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(wx, 2.5, wz)
      const b = world.createRigidBody(bd)
      world.createCollider(RAPIER.ColliderDesc.cylinder(2.5, 0.35).setFriction(0.5), b)
    }
  }
}

// ═════════════════════════════════════════════════════════════════════════
//  PAGODA (3-tier)
// ═════════════════════════════════════════════════════════════════════════
function _createPagoda(scene, RAPIER, world) {
  const group = new THREE.Group()
  group.position.set(30, 0, -30)

  const wallMat = _mat(PAL.paper)
  const roofMat = _mat(PAL.roofTile)
  const trimMat = _mat(PAL.red)

  // Three tiers — each smaller
  const tiers = [
    { w: 4.0, h: 2.5, roofW: 5.5, y: 0 },
    { w: 3.0, h: 2.0, roofW: 4.2, y: 3.2 },
    { w: 2.0, h: 1.6, roofW: 3.0, y: 5.8 },
  ]

  let topY = 0
  for (const tier of tiers) {
    // Walls
    const wall = new THREE.Mesh(
      new THREE.BoxGeometry(tier.w, tier.h, tier.w),
      wallMat
    )
    wall.position.y = tier.y + tier.h / 2
    wall.castShadow = true
    wall.receiveShadow = true
    group.add(wall)

    // Roof — wider, angled planes
    const roofGeo = new THREE.BoxGeometry(tier.roofW, 0.15, tier.roofW)
    const roof = new THREE.Mesh(roofGeo, roofMat)
    roof.position.y = tier.y + tier.h + 0.08
    roof.castShadow = true
    group.add(roof)

    // Roof edge trim
    const trimGeo = new THREE.BoxGeometry(tier.roofW + 0.2, 0.08, tier.roofW + 0.2)
    const trim = new THREE.Mesh(trimGeo, trimMat)
    trim.position.y = tier.y + tier.h + 0.16
    group.add(trim)

    // Corner eaves (small angled boxes suggesting upturned tips)
    const eaveGeo = new THREE.BoxGeometry(0.6, 0.08, 0.6)
    const hw = tier.roofW / 2 + 0.15
    for (const [cx, cz] of [[-hw,-hw],[hw,-hw],[-hw,hw],[hw,hw]]) {
      const eave = new THREE.Mesh(eaveGeo, roofMat)
      eave.position.set(cx, tier.y + tier.h + 0.25, cz)
      eave.rotation.x = cz > 0 ? -0.15 : 0.15
      eave.rotation.z = cx > 0 ? -0.15 : 0.15
      group.add(eave)
    }

    topY = tier.y + tier.h + 0.3
  }

  // Spire on top
  const spire = new THREE.Mesh(
    new THREE.CylinderGeometry(0.06, 0.12, 2.0, 5),
    _mat(PAL.darkWood)
  )
  spire.position.y = topY + 1.0
  spire.castShadow = true
  group.add(spire)

  // Spire finial
  const finial = new THREE.Mesh(
    new THREE.SphereGeometry(0.15, 6, 4),
    _mat('#c8a040')
  )
  finial.position.y = topY + 2.1
  group.add(finial)

  scene.add(group)

  // Collider — whole pagoda as a big box
  const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(30, 4, -30)
  const b = world.createRigidBody(bd)
  world.createCollider(RAPIER.ColliderDesc.cuboid(2.8, 4, 2.8).setFriction(0.5), b)
}

// ═════════════════════════════════════════════════════════════════════════
//  SMALL HOUSES
// ═════════════════════════════════════════════════════════════════════════
function _createSmallHouses(scene, RAPIER, world) {
  const houses = [
    { x: -35, z: -25, w: 4, h: 2.8, d: 3.5, ry: 0.3 },
    { x:  35, z:  15, w: 3.5, h: 2.5, d: 3, ry: -0.2 },
    { x: -15, z:  35, w: 4.5, h: 3.0, d: 3.5, ry: 0.5 },
    { x:  25, z: -45, w: 3, h: 2.2, d: 3, ry: 0.8 },
    { x: -45, z:  35, w: 3.8, h: 2.6, d: 3.2, ry: -0.4 },
    { x:  40, z: -15, w: 3.5, h: 2.4, d: 3.5, ry: 1.2 },
  ]

  for (const h of houses) {
    const group = new THREE.Group()
    group.position.set(h.x, 0, h.z)
    group.rotation.y = h.ry

    // Body
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(h.w, h.h, h.d),
      _mat(PAL.paper)
    )
    body.position.y = h.h / 2
    body.castShadow = true
    body.receiveShadow = true
    group.add(body)

    // Angled roof — two planes meeting at a ridge
    const roofW = h.w + 0.6
    const roofD = h.d / 2 + 0.4
    const roofGeo = new THREE.PlaneGeometry(roofW, roofD)
    const roofMatl = _mat(PAL.roofTile, { side: THREE.DoubleSide })

    const roofL = new THREE.Mesh(roofGeo, roofMatl)
    roofL.position.set(0, h.h + 0.5, -roofD / 2 * 0.35)
    roofL.rotation.x = -0.55
    roofL.castShadow = true
    group.add(roofL)

    const roofR = new THREE.Mesh(roofGeo, roofMatl)
    roofR.position.set(0, h.h + 0.5, roofD / 2 * 0.35)
    roofR.rotation.x = 0.55
    roofR.castShadow = true
    group.add(roofR)

    // Sliding door (dark rectangle on front face)
    const door = new THREE.Mesh(
      new THREE.PlaneGeometry(0.8, 1.6),
      _mat(PAL.darkWood)
    )
    door.position.set(0, 0.8, h.d / 2 + 0.01)
    group.add(door)

    // Paper windows (semi-transparent)
    const windowMat = _mat(PAL.paper, { transparent: true, opacity: 0.5 })
    const windowGeo = new THREE.PlaneGeometry(0.7, 0.5)
    const wL = new THREE.Mesh(windowGeo, windowMat)
    wL.position.set(-h.w / 2 + 0.6, h.h * 0.6, h.d / 2 + 0.01)
    const wR = new THREE.Mesh(windowGeo, windowMat)
    wR.position.set(h.w / 2 - 0.6, h.h * 0.6, h.d / 2 + 0.01)
    group.add(wL, wR)

    // Wooden frame lines
    const frameMat = _mat(PAL.darkWood)
    // Horizontal frame under windows
    const hFrame = new THREE.Mesh(new THREE.BoxGeometry(h.w, 0.06, 0.06), frameMat)
    hFrame.position.set(0, h.h * 0.35, h.d / 2 + 0.01)
    group.add(hFrame)

    // Engawa (veranda)
    const veranda = new THREE.Mesh(
      new THREE.BoxGeometry(h.w + 0.4, 0.08, 0.8),
      _mat(PAL.lightWood)
    )
    veranda.position.set(0, 0.2, h.d / 2 + 0.4)
    veranda.receiveShadow = true
    group.add(veranda)

    scene.add(group)

    // Collider
    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(h.x, h.h / 2, h.z)
    const b = world.createRigidBody(bd)
    const halfA = h.ry * 0.5
    b.setRotation({ x: 0, y: Math.sin(halfA), z: 0, w: Math.cos(halfA) })
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(h.w / 2 + 0.2, h.h / 2, h.d / 2 + 0.2).setFriction(0.5),
      b
    )
  }
}

// ═════════════════════════════════════════════════════════════════════════
//  TEA HOUSE
// ═════════════════════════════════════════════════════════════════════════
function _createTeaHouse(scene, RAPIER, world) {
  const group = new THREE.Group()
  group.position.set(-30, 0, 25)

  // Platform / tatami floor
  const floor = new THREE.Mesh(
    new THREE.BoxGeometry(5, 0.15, 4),
    _mat(PAL.tatami)
  )
  floor.position.y = 0.4
  floor.receiveShadow = true
  group.add(floor)

  // Corner posts
  const postGeo = new THREE.CylinderGeometry(0.1, 0.1, 2.5, 5)
  const postMat = _mat(PAL.darkWood)
  for (const [px, pz] of [[-2.3,-1.8],[2.3,-1.8],[-2.3,1.8],[2.3,1.8]]) {
    const post = new THREE.Mesh(postGeo, postMat)
    post.position.set(px, 1.65, pz)
    post.castShadow = true
    group.add(post)
  }

  // Roof
  const roof = new THREE.Mesh(
    new THREE.BoxGeometry(5.8, 0.12, 4.6),
    _mat(PAL.roofTile)
  )
  roof.position.y = 2.95
  roof.castShadow = true
  group.add(roof)

  // Low table
  const tableTop = new THREE.Mesh(
    new THREE.BoxGeometry(1.4, 0.06, 0.8),
    _mat(PAL.darkWood)
  )
  tableTop.position.y = 0.72
  group.add(tableTop)
  // Table legs
  const legGeo = new THREE.BoxGeometry(0.06, 0.25, 0.06)
  for (const [lx, lz] of [[-0.6,-0.3],[0.6,-0.3],[-0.6,0.3],[0.6,0.3]]) {
    const leg = new THREE.Mesh(legGeo, _mat(PAL.darkWood))
    leg.position.set(lx, 0.55, lz)
    group.add(leg)
  }

  // Zabuton cushions (flat boxes)
  const cushionGeo = new THREE.BoxGeometry(0.5, 0.06, 0.5)
  const cushionMat = _mat('#8b3040')
  for (const [cx, cz] of [[0.7, 0], [-0.7, 0], [0, 0.8]]) {
    const c = new THREE.Mesh(cushionGeo, cushionMat)
    c.position.set(cx, 0.48, cz)
    group.add(c)
  }

  scene.add(group)

  // Collider for the raised floor
  const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(-30, 0.4, 25)
  const b = world.createRigidBody(bd)
  world.createCollider(RAPIER.ColliderDesc.cuboid(2.8, 0.4, 2.2).setFriction(0.5), b)
}

// ═════════════════════════════════════════════════════════════════════════
//  SHRINE
// ═════════════════════════════════════════════════════════════════════════
function _createShrine(scene, RAPIER, world) {
  const group = new THREE.Group()
  group.position.set(40, 0, 40)

  // Base platform
  const base = new THREE.Mesh(
    new THREE.BoxGeometry(3, 0.4, 2.5),
    _mat(PAL.lightStone)
  )
  base.position.y = 0.2
  base.receiveShadow = true
  group.add(base)

  // Shrine body
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(2.2, 2.2, 1.8),
    _mat(PAL.paper)
  )
  body.position.y = 1.5
  body.castShadow = true
  group.add(body)

  // Shrine roof
  const roof = new THREE.Mesh(
    new THREE.BoxGeometry(3.2, 0.2, 2.8),
    _mat(PAL.roofDark)
  )
  roof.position.y = 2.75
  roof.castShadow = true
  group.add(roof)

  // Offering box
  const offerBox = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 0.3, 0.6),
    _mat(PAL.darkWood)
  )
  offerBox.position.set(0, 0.55, 1.4)
  group.add(offerBox)

  // Small shimenawa (rope) — simplified as a cylinder
  const rope = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.08, 2.4, 5),
    _mat('#c8c070')
  )
  rope.rotation.z = Math.PI / 2
  rope.position.set(0, 2.5, 0.92)
  group.add(rope)

  scene.add(group)

  const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(40, 1.5, 40)
  const b = world.createRigidBody(bd)
  world.createCollider(RAPIER.ColliderDesc.cuboid(1.6, 1.5, 1.4).setFriction(0.5), b)
}

// ═════════════════════════════════════════════════════════════════════════
//  CASTLE GATE
// ═════════════════════════════════════════════════════════════════════════
function _createCastleGate(scene, RAPIER, world) {
  const group = new THREE.Group()
  group.position.set(0, 0, -50)

  const wallMat = _mat(PAL.white)
  const roofM = _mat(PAL.roofDark)
  const woodM = _mat(PAL.darkWood)

  // Two large pillars / walls
  for (const side of [-1, 1]) {
    const wall = new THREE.Mesh(
      new THREE.BoxGeometry(2, 4, 3),
      wallMat
    )
    wall.position.set(side * 4, 2, 0)
    wall.castShadow = true
    group.add(wall)
  }

  // Gate beam across top
  const beam = new THREE.Mesh(
    new THREE.BoxGeometry(10, 0.6, 3.2),
    woodM
  )
  beam.position.y = 4.3
  beam.castShadow = true
  group.add(beam)

  // Tiled roof on top
  const gateRoof = new THREE.Mesh(
    new THREE.BoxGeometry(11, 0.25, 4),
    roofM
  )
  gateRoof.position.y = 4.85
  gateRoof.castShadow = true
  group.add(gateRoof)

  // Ridge on roof
  const ridge = new THREE.Mesh(
    new THREE.BoxGeometry(11.5, 0.15, 0.3),
    roofM
  )
  ridge.position.y = 5.05
  group.add(ridge)

  scene.add(group)

  // Colliders for the two wall pillars
  for (const side of [-1, 1]) {
    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(side * 4, 2, -50)
    const b = world.createRigidBody(bd)
    world.createCollider(RAPIER.ColliderDesc.cuboid(1, 2, 1.5).setFriction(0.5), b)
  }
}

// ═════════════════════════════════════════════════════════════════════════
//  ZEN ROCK GARDENS (3 areas)
// ═════════════════════════════════════════════════════════════════════════
function _createZenGardens(scene, RAPIER, world, syncList) {
  const gardens = [
    { x: 30, z: 20, w: 10, d: 8 },
    { x: -25, z: -40, w: 8, d: 7 },
    { x: 45, z: -5, w: 7, d: 6 },
  ]

  for (const g of gardens) {
    // Sand patch
    const sand = new THREE.Mesh(
      new THREE.BoxGeometry(g.w, 0.04, g.d),
      _mat(PAL.sand)
    )
    sand.position.set(g.x, 0.02, g.z)
    sand.receiveShadow = true
    scene.add(sand)

    // Low wooden border
    const borderMat = _mat(PAL.darkWood)
    const bw = 0.1
    const bh = 0.12
    const borders = [
      { bx: 0, bz: -g.d / 2, bxs: g.w + bw * 2, bzs: bw },
      { bx: 0, bz:  g.d / 2, bxs: g.w + bw * 2, bzs: bw },
      { bx: -g.w / 2, bz: 0, bxs: bw, bzs: g.d },
      { bx:  g.w / 2, bz: 0, bxs: bw, bzs: g.d },
    ]
    for (const br of borders) {
      const borderMesh = new THREE.Mesh(
        new THREE.BoxGeometry(br.bxs, bh, br.bzs),
        borderMat
      )
      borderMesh.position.set(g.x + br.bx, bh / 2, g.z + br.bz)
      scene.add(borderMesh)
    }

    // Rocks (fixed visual) — 3-4 per garden
    const rockCount = 3 + Math.floor(Math.random() * 2)
    for (let i = 0; i < rockCount; i++) {
      const rx = g.x + (Math.random() - 0.5) * (g.w - 2)
      const rz = g.z + (Math.random() - 0.5) * (g.d - 2)
      const rScale = 0.3 + Math.random() * 0.4

      const rock = new THREE.Mesh(
        new THREE.DodecahedronGeometry(rScale, 0),
        _mat(PAL.darkStone)
      )
      rock.position.set(rx, rScale * 0.5, rz)
      rock.rotation.set(Math.random(), Math.random(), Math.random())
      rock.castShadow = true
      scene.add(rock)

      // Concentric raked sand lines around this rock (thin raised rings)
      for (let ring = 1; ring <= 3; ring++) {
        const ringR = rScale + ring * 0.35
        const segments = 24
        for (let s = 0; s < segments; s++) {
          const a = (s / segments) * Math.PI * 2
          const nx = rx + Math.cos(a) * ringR
          const nz = rz + Math.sin(a) * ringR
          // Skip if outside garden bounds
          if (Math.abs(nx - g.x) > g.w / 2 - 0.2 || Math.abs(nz - g.z) > g.d / 2 - 0.2) continue
          const dot = new THREE.Mesh(
            new THREE.BoxGeometry(0.12, 0.015, 0.04),
            _mat('#c8b890')
          )
          dot.position.set(nx, 0.04, nz)
          dot.rotation.y = a + Math.PI / 2
          scene.add(dot)
        }
      }
    }
  }

  // Dynamic zen garden stones (pushable!) — 5 total
  const dynamicStonePositions = [
    { x: 30, z: 22 }, { x: 32, z: 18 }, { x: -24, z: -42 },
    { x: -27, z: -38 }, { x: 46, z: -4 },
  ]
  for (const sp of dynamicStonePositions) {
    const scale = 0.35 + Math.random() * 0.25
    const mesh = new THREE.Mesh(
      new THREE.DodecahedronGeometry(scale, 0),
      _mat(PAL.stone)
    )
    mesh.castShadow = true
    scene.add(mesh)

    const bd = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(sp.x, scale * 0.7, sp.z)
      .setLinearDamping(2.0)
      .setAngularDamping(2.0)
    const body = world.createRigidBody(bd)
    // Approximate dodecahedron as sphere collider
    world.createCollider(
      RAPIER.ColliderDesc.ball(scale * 0.85).setDensity(30).setFriction(0.8).setRestitution(0.1),
      body
    )
    syncList.push({ mesh, body })
  }
}

// ═════════════════════════════════════════════════════════════════════════
//  KOI PONDS
// ═════════════════════════════════════════════════════════════════════════
function _createKoiPonds(scene, RAPIER, world, koiFish) {
  const ponds = [
    { x: -10, z: 10, r: 5 },
    { x: 35, z: 35, r: 3.5 },
    { x: -40, z: -10, r: 4 },
  ]

  for (const p of ponds) {
    // Water surface
    const water = new THREE.Mesh(
      new THREE.CircleGeometry(p.r, 24),
      _mat(PAL.water, { transparent: true, opacity: 0.7, side: THREE.DoubleSide })
    )
    water.rotation.x = -Math.PI / 2
    water.position.set(p.x, 0.03, p.z)
    water.receiveShadow = true
    scene.add(water)

    // Stone border
    const stoneCount = Math.floor(p.r * 5)
    for (let i = 0; i < stoneCount; i++) {
      const a = (i / stoneCount) * Math.PI * 2
      const sx = p.x + Math.cos(a) * (p.r + 0.2)
      const sz = p.z + Math.sin(a) * (p.r + 0.2)
      const stone = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.25, 0.4),
        _mat(PAL.stone)
      )
      stone.position.set(sx, 0.12, sz)
      stone.rotation.y = a
      stone.castShadow = true
      scene.add(stone)
    }

    // Koi fish — 4-5 per pond
    const fishCount = 4 + Math.floor(Math.random() * 2)
    const koiColors = [PAL.koiOrange, PAL.koiWhite, PAL.koiRed, '#f0a050', '#e04040']
    for (let i = 0; i < fishCount; i++) {
      const fishGroup = new THREE.Group()
      const koiColor = koiColors[i % koiColors.length]

      // Body — elongated sphere
      const body = new THREE.Mesh(
        new THREE.SphereGeometry(0.15, 6, 4),
        _mat(koiColor)
      )
      body.scale.set(1, 0.5, 2.2)
      fishGroup.add(body)

      // Tail
      const tail = new THREE.Mesh(
        new THREE.ConeGeometry(0.1, 0.2, 4),
        _mat(koiColor)
      )
      tail.position.z = -0.35
      tail.rotation.x = Math.PI / 2
      fishGroup.add(tail)

      fishGroup.position.set(p.x, 0.04, p.z)
      scene.add(fishGroup)

      const swimRadius = 0.8 + Math.random() * (p.r - 1.5)
      koiFish.push({
        mesh: fishGroup,
        cx: p.x,
        cz: p.z,
        radius: swimRadius,
        speed: 0.3 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
      })
    }

    // Lily pads
    const lilyCount = 3 + Math.floor(Math.random() * 3)
    for (let i = 0; i < lilyCount; i++) {
      const a = Math.random() * Math.PI * 2
      const dist = Math.random() * (p.r - 0.5)
      const lx = p.x + Math.cos(a) * dist
      const lz = p.z + Math.sin(a) * dist
      const lily = new THREE.Mesh(
        new THREE.CircleGeometry(0.25 + Math.random() * 0.15, 8),
        _mat(PAL.lilyPad, { side: THREE.DoubleSide })
      )
      lily.rotation.x = -Math.PI / 2
      lily.position.set(lx, 0.04, lz)
      scene.add(lily)

      // Lotus flower on some lily pads
      if (Math.random() > 0.5) {
        const lotus = new THREE.Mesh(
          new THREE.SphereGeometry(0.1, 6, 4),
          _mat(PAL.lotus)
        )
        lotus.position.set(lx, 0.1, lz)
        scene.add(lotus)
        // Petals around lotus
        for (let pe = 0; pe < 5; pe++) {
          const pa = (pe / 5) * Math.PI * 2
          const petal = new THREE.Mesh(
            new THREE.SphereGeometry(0.06, 4, 3),
            _mat(PAL.cherryPink)
          )
          petal.position.set(
            lx + Math.cos(pa) * 0.12,
            0.08,
            lz + Math.sin(pa) * 0.12
          )
          petal.scale.set(1, 0.3, 1.5)
          scene.add(petal)
        }
      }
    }
  }
}

// ═════════════════════════════════════════════════════════════════════════
//  BRIDGES (3 — all driveable with FIXED colliders)
// ═════════════════════════════════════════════════════════════════════════
function _createBridges(scene, RAPIER, world) {
  // 1) Red arched bridge over largest koi pond at (-10, 10)
  _createArchedBridge(scene, RAPIER, world, -10, 10, 6, 0)

  // 2) Flat wooden bridge over stream area
  _createFlatBridge(scene, RAPIER, world, -20, 5, 0, Math.PI / 4)

  // 3) Stepping stone bridge
  _createSteppingStoneBridge(scene, RAPIER, world, -35, -15, Math.PI / 6)
}

function _createArchedBridge(scene, RAPIER, world, cx, cz, span, ry) {
  const group = new THREE.Group()
  group.position.set(cx, 0, cz)
  group.rotation.y = ry

  const bridgeMat = _mat(PAL.red)
  const railMat = _mat(PAL.darkRed)

  // Arc segments
  const segments = 10
  const halfSpan = span / 2
  const archHeight = 1.2

  for (let i = 0; i < segments; i++) {
    const t = i / segments
    const t1 = (i + 1) / segments
    const x0 = -halfSpan + t * span
    const x1 = -halfSpan + t1 * span
    const y0 = Math.sin(t * Math.PI) * archHeight
    const y1 = Math.sin(t1 * Math.PI) * archHeight
    const midX = (x0 + x1) / 2
    const midY = (y0 + y1) / 2
    const segLen = Math.sqrt((x1 - x0) ** 2 + (y1 - y0) ** 2)
    const angle = Math.atan2(y1 - y0, x1 - x0)

    const plank = new THREE.Mesh(
      new THREE.BoxGeometry(segLen + 0.05, 0.12, 2.0),
      bridgeMat
    )
    plank.position.set(midX, midY + 0.4, 0)
    plank.rotation.z = angle
    plank.castShadow = true
    plank.receiveShadow = true
    group.add(plank)
  }

  // Railings
  for (const side of [-1.1, 1.1]) {
    for (let i = 0; i <= 8; i++) {
      const t = i / 8
      const x = -halfSpan + t * span
      const y = Math.sin(t * Math.PI) * archHeight + 0.4
      const post = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 0.7, 4),
        railMat
      )
      post.position.set(x, y + 0.35, side)
      post.castShadow = true
      group.add(post)
    }
    // Railing top rail
    for (let i = 0; i < 8; i++) {
      const t = i / 8
      const t1 = (i + 1) / 8
      const x0 = -halfSpan + t * span
      const x1 = -halfSpan + t1 * span
      const y0 = Math.sin(t * Math.PI) * archHeight + 1.05
      const y1 = Math.sin(t1 * Math.PI) * archHeight + 1.05
      const rail = new THREE.Mesh(
        new THREE.BoxGeometry(span / 8 + 0.05, 0.06, 0.06),
        railMat
      )
      rail.position.set((x0 + x1) / 2, (y0 + y1) / 2, side)
      rail.rotation.z = Math.atan2(y1 - y0, x1 - x0)
      group.add(rail)
    }
  }

  scene.add(group)

  // Driveable collider — flat box at slight elevation
  const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(cx, 0.5, cz)
  const b = world.createRigidBody(bd)
  world.createCollider(
    RAPIER.ColliderDesc.cuboid(halfSpan, 0.5, 1.2).setFriction(0.8),
    b
  )
}

function _createFlatBridge(scene, RAPIER, world, cx, cz, ry) {
  const group = new THREE.Group()
  group.position.set(cx, 0, cz)
  group.rotation.y = ry || 0

  const woodM = _mat(PAL.lightWood)

  // Planks
  const plankCount = 8
  for (let i = 0; i < plankCount; i++) {
    const plank = new THREE.Mesh(
      new THREE.BoxGeometry(2.5, 0.1, 0.45),
      woodM
    )
    plank.position.set(0, 0.25, -1.75 + i * 0.5)
    plank.receiveShadow = true
    plank.castShadow = true
    group.add(plank)
  }

  // Support beams underneath
  for (const sx of [-1, 1]) {
    const support = new THREE.Mesh(
      new THREE.BoxGeometry(0.15, 0.15, 4),
      _mat(PAL.darkWood)
    )
    support.position.set(sx, 0.12, 0)
    group.add(support)
  }

  // Simple railings
  for (const side of [-1.3, 1.3]) {
    const rail = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, 0.5, 4),
      _mat(PAL.darkWood)
    )
    rail.position.set(side, 0.55, 0)
    rail.castShadow = true
    group.add(rail)
  }

  scene.add(group)

  // Collider
  const halfA = (ry || 0) * 0.5
  const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(cx, 0.25, cz)
  const b = world.createRigidBody(bd)
  b.setRotation({ x: 0, y: Math.sin(halfA), z: 0, w: Math.cos(halfA) })
  world.createCollider(
    RAPIER.ColliderDesc.cuboid(1.4, 0.25, 2.2).setFriction(0.8),
    b
  )
}

function _createSteppingStoneBridge(scene, RAPIER, world, cx, cz, ry) {
  const stoneCount = 6
  const spacing = 1.2
  const cos = Math.cos(ry)
  const sin = Math.sin(ry)

  for (let i = 0; i < stoneCount; i++) {
    const offset = (i - stoneCount / 2 + 0.5) * spacing
    const sx = cx + cos * offset
    const sz = cz + sin * offset
    // Slight zigzag
    const zigzag = (i % 2 === 0 ? 0.3 : -0.3)
    const fx = sx + (-sin) * zigzag
    const fz = sz + cos * zigzag

    const stone = new THREE.Mesh(
      new THREE.CylinderGeometry(0.4, 0.45, 0.15, 6),
      _mat(PAL.lightStone)
    )
    stone.position.set(fx, 0.08, fz)
    stone.receiveShadow = true
    stone.castShadow = true
    scene.add(stone)

    // Each stone is driveable
    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(fx, 0.08, fz)
    const b = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cylinder(0.08, 0.45).setFriction(0.9),
      b
    )
  }
}

// ═════════════════════════════════════════════════════════════════════════
//  BAMBOO GROVES (3 clusters)
// ═════════════════════════════════════════════════════════════════════════
function _createBambooGroves(scene, RAPIER, world) {
  const clusters = [
    { x: -50, z: -30, count: 14 },
    { x: 50, z: 25, count: 12 },
    { x: -15, z: -50, count: 11 },
  ]

  for (const c of clusters) {
    for (let i = 0; i < c.count; i++) {
      const bx = c.x + (Math.random() - 0.5) * 8
      const bz = c.z + (Math.random() - 0.5) * 8
      const height = 3 + Math.random() * 4
      const radius = 0.06 + Math.random() * 0.05
      const lean = (Math.random() - 0.5) * 0.12

      const shade = Math.random() > 0.5 ? PAL.bamboo : PAL.bambooLight

      // Main stalk
      const stalk = new THREE.Mesh(
        new THREE.CylinderGeometry(radius * 0.8, radius, height, 5),
        _mat(shade)
      )
      stalk.position.set(bx, height / 2, bz)
      stalk.rotation.x = lean
      stalk.rotation.z = (Math.random() - 0.5) * 0.1
      stalk.castShadow = true
      scene.add(stalk)

      // Bamboo nodes (rings)
      const nodeCount = Math.floor(height / 0.8)
      for (let n = 1; n < nodeCount; n++) {
        const node = new THREE.Mesh(
          new THREE.CylinderGeometry(radius + 0.015, radius + 0.015, 0.04, 5),
          _mat('#3a7a2a')
        )
        node.position.set(bx, n * 0.8, bz)
        scene.add(node)
      }

      // Small leaves at top (flat cones)
      for (let l = 0; l < 3; l++) {
        const leaf = new THREE.Mesh(
          new THREE.ConeGeometry(0.3, 0.5, 4),
          _mat(PAL.bambooLight)
        )
        leaf.position.set(
          bx + (Math.random() - 0.5) * 0.4,
          height - 0.2 + Math.random() * 0.3,
          bz + (Math.random() - 0.5) * 0.4
        )
        leaf.rotation.set(Math.random() * 0.5, Math.random(), 0)
        scene.add(leaf)
      }

      // Collider on thicker stalks only
      if (radius > 0.08) {
        const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(bx, height / 2, bz)
        const b = world.createRigidBody(bd)
        world.createCollider(RAPIER.ColliderDesc.cylinder(height / 2, radius + 0.05).setFriction(0.3), b)
      }
    }
  }
}

// ═════════════════════════════════════════════════════════════════════════
//  CHERRY BLOSSOM TREES (15-20)
// ═════════════════════════════════════════════════════════════════════════
function _createCherryTrees(scene) {
  const positions = [
    [-8, -30], [12, -35], [25, 15], [-20, 20], [5, 45],
    [-30, -10], [45, 10], [-10, -45], [15, 30], [-45, 15],
    [50, -20], [-35, 40], [10, -10], [-5, 15], [40, -40],
    [-48, -45], [28, 48], [-25, 50],
  ]

  const trunkMat = _mat(PAL.cherryTrunk)
  const pinkMat = _mat(PAL.cherryPink)
  const lightPinkMat = _mat(PAL.cherryLight)

  for (let i = 0; i < positions.length; i++) {
    const [px, pz] = positions[i]
    const scale = 0.7 + Math.random() * 0.6
    const group = new THREE.Group()
    group.position.set(px, 0, pz)
    group.scale.setScalar(scale)

    // Trunk
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.18, 2.0, 5),
      trunkMat
    )
    trunk.position.y = 1.0
    trunk.castShadow = true
    group.add(trunk)

    // Main branch split
    for (const angle of [-0.4, 0.3]) {
      const branch = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.1, 1.2, 4),
        trunkMat
      )
      branch.position.set(Math.sin(angle) * 0.5, 1.8, 0)
      branch.rotation.z = angle
      branch.castShadow = true
      group.add(branch)
    }

    // Pink sphere clusters for canopy
    const canopyMat = i % 2 === 0 ? pinkMat : lightPinkMat
    const clusterPositions = [
      [0, 2.8, 0], [0.6, 2.5, 0.3], [-0.5, 2.6, -0.3],
      [0.2, 3.1, -0.4], [-0.3, 2.4, 0.5],
    ]
    for (const [cx, cy, cz] of clusterPositions) {
      const cluster = new THREE.Mesh(
        new THREE.SphereGeometry(0.5 + Math.random() * 0.3, 6, 5),
        canopyMat
      )
      cluster.position.set(cx, cy, cz)
      cluster.castShadow = true
      group.add(cluster)
    }

    scene.add(group)

    // Scattered petals on ground underneath
    for (let p = 0; p < 8; p++) {
      const petal = new THREE.Mesh(
        new THREE.PlaneGeometry(0.08, 0.06),
        _mat(PAL.petalPink, { side: THREE.DoubleSide })
      )
      petal.position.set(
        px + (Math.random() - 0.5) * 2 * scale,
        0.01,
        pz + (Math.random() - 0.5) * 2 * scale
      )
      petal.rotation.x = -Math.PI / 2
      petal.rotation.z = Math.random() * Math.PI
      scene.add(petal)
    }
  }
}

// ═════════════════════════════════════════════════════════════════════════
//  STONE LANTERNS (10-12)
// ═════════════════════════════════════════════════════════════════════════
function _createStoneLanterns(scene, RAPIER, world, lanterns) {
  const positions = [
    [-5, -25], [15, -15], [-25, 5], [10, 25],
    [-15, -10], [25, 10], [-35, -20], [5, 35],
    [35, -10], [-10, 40], [-40, 25], [20, -40],
  ]

  for (let i = 0; i < positions.length; i++) {
    const [lx, lz] = positions[i]
    const group = new THREE.Group()
    group.position.set(lx, 0, lz)

    // Base
    const base = new THREE.Mesh(
      new THREE.CylinderGeometry(0.35, 0.4, 0.15, 6),
      _mat(PAL.lightStone)
    )
    base.position.y = 0.08
    group.add(base)

    // Post
    const post = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.12, 1.0, 6),
      _mat(PAL.stone)
    )
    post.position.y = 0.65
    post.castShadow = true
    group.add(post)

    // Housing (light box)
    const housingMat = _emissiveMat(PAL.lanternWarm, PAL.lanternWarm, 0.5)
    const housing = new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 0.35, 0.4),
      housingMat
    )
    housing.position.y = 1.35
    housing.castShadow = true
    group.add(housing)

    // Pyramid hat
    const hat = new THREE.Mesh(
      new THREE.ConeGeometry(0.4, 0.3, 4),
      _mat(PAL.darkStone)
    )
    hat.position.y = 1.7
    hat.rotation.y = Math.PI / 4
    hat.castShadow = true
    group.add(hat)

    scene.add(group)

    lanterns.push({
      mat: housingMat,
      phase: i * 1.3,
    })

    // Collider
    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(lx, 0.85, lz)
    const b = world.createRigidBody(bd)
    world.createCollider(RAPIER.ColliderDesc.cylinder(0.85, 0.25).setFriction(0.5), b)
  }
}

// ═════════════════════════════════════════════════════════════════════════
//  WATER FEATURES — stream, waterfall, tsukubai, shishi-odoshi
// ═════════════════════════════════════════════════════════════════════════
function _createWaterFeatures(scene, RAPIER, world) {
  // ── Winding stream ──────────────────────────────────────────────
  const streamPoints = [
    [-55, -20], [-45, -15], [-35, -8], [-25, 0], [-20, 5],
    [-15, 12], [-10, 18], [-5, 22], [0, 28], [5, 35],
    [10, 42], [15, 50],
  ]
  const streamWidth = 2.5
  for (let i = 0; i < streamPoints.length - 1; i++) {
    const [x0, z0] = streamPoints[i]
    const [x1, z1] = streamPoints[i + 1]
    const mx = (x0 + x1) / 2
    const mz = (z0 + z1) / 2
    const len = Math.sqrt((x1 - x0) ** 2 + (z1 - z0) ** 2)
    const angle = Math.atan2(z1 - z0, x1 - x0)

    const seg = new THREE.Mesh(
      new THREE.PlaneGeometry(len + 0.5, streamWidth),
      _mat(PAL.water, { transparent: true, opacity: 0.6, side: THREE.DoubleSide })
    )
    seg.rotation.x = -Math.PI / 2
    seg.rotation.z = -angle
    seg.position.set(mx, 0.015, mz)
    seg.receiveShadow = true
    scene.add(seg)
  }

  // ── Small waterfall ─────────────────────────────────────────────
  const waterfallGroup = new THREE.Group()
  waterfallGroup.position.set(-55, 0, -20)

  // Rock wall behind waterfall
  const rockWall = new THREE.Mesh(
    new THREE.BoxGeometry(3, 2.5, 1.5),
    _mat(PAL.darkStone)
  )
  rockWall.position.set(0, 1.25, -1)
  rockWall.castShadow = true
  waterfallGroup.add(rockWall)

  // Vertical blue water plane
  const waterfall = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 2),
    _mat('#3ab8b8', { transparent: true, opacity: 0.6 })
  )
  waterfall.position.set(0, 1.2, -0.2)
  waterfallGroup.add(waterfall)

  // Mist at base (small white transparent spheres)
  for (let m = 0; m < 5; m++) {
    const mist = new THREE.Mesh(
      new THREE.SphereGeometry(0.3 + Math.random() * 0.2, 5, 4),
      _mat('#ffffff', { transparent: true, opacity: 0.15 })
    )
    mist.position.set(
      (Math.random() - 0.5) * 1.5,
      0.2 + Math.random() * 0.3,
      0.3 + Math.random() * 0.5
    )
    waterfallGroup.add(mist)
  }

  scene.add(waterfallGroup)

  // Collider for rock wall
  const wbd = RAPIER.RigidBodyDesc.fixed().setTranslation(-55, 1.25, -21)
  const wb = world.createRigidBody(wbd)
  world.createCollider(RAPIER.ColliderDesc.cuboid(1.5, 1.25, 0.75).setFriction(0.5), wb)

  // ── Tsukubai (stone wash basins) ────────────────────────────────
  const tsukubaiPositions = [
    { x: -28, z: -38 }, { x: 38, z: 42 },
    { x: -42, z: 20 }, { x: 15, z: -42 },
  ]
  for (const tp of tsukubaiPositions) {
    const basin = new THREE.Mesh(
      new THREE.CylinderGeometry(0.4, 0.5, 0.4, 8),
      _mat(PAL.stone)
    )
    basin.position.set(tp.x, 0.4, tp.z)
    basin.castShadow = true
    scene.add(basin)

    // Water inside
    const basinWater = new THREE.Mesh(
      new THREE.CircleGeometry(0.35, 8),
      _mat(PAL.water, { transparent: true, opacity: 0.7, side: THREE.DoubleSide })
    )
    basinWater.rotation.x = -Math.PI / 2
    basinWater.position.set(tp.x, 0.58, tp.z)
    scene.add(basinWater)

    // Stone pedestal
    const pedestal = new THREE.Mesh(
      new THREE.CylinderGeometry(0.2, 0.3, 0.3, 6),
      _mat(PAL.darkStone)
    )
    pedestal.position.set(tp.x, 0.15, tp.z)
    scene.add(pedestal)

    // Bamboo ladle
    const ladle = new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.02, 0.6, 4),
      _mat(PAL.bamboo)
    )
    ladle.position.set(tp.x + 0.25, 0.65, tp.z)
    ladle.rotation.z = 0.3
    scene.add(ladle)
  }

  // ── Shishi-odoshi (deer chasers) ────────────────────────────────
  const shishiPositions = [
    { x: -8, z: -15 }, { x: 28, z: 22 },
  ]
  for (const sp of shishiPositions) {
    // Support post
    const support = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 0.8, 4),
      _mat(PAL.darkWood)
    )
    support.position.set(sp.x, 0.4, sp.z)
    scene.add(support)

    // Bamboo tube (pivots) — simplified as angled cylinder
    const tube = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.05, 0.7, 5),
      _mat(PAL.bamboo)
    )
    tube.position.set(sp.x, 0.7, sp.z)
    tube.rotation.z = 0.3
    scene.add(tube)

    // Stone that it hits
    const hitStone = new THREE.Mesh(
      new THREE.DodecahedronGeometry(0.15, 0),
      _mat(PAL.darkStone)
    )
    hitStone.position.set(sp.x + 0.35, 0.15, sp.z)
    scene.add(hitStone)
  }
}

// ═════════════════════════════════════════════════════════════════════════
//  GARDEN DETAILS
// ═════════════════════════════════════════════════════════════════════════
function _createGardenDetails(scene, RAPIER, world) {
  // ── Stepping stones along paths (20+) ───────────────────────────
  const steppingStonePositions = [
    [0, -10], [1.2, -8], [0.5, -6], [1.5, -4], [0.8, -2],
    [5, 5], [7, 6], [9, 7], [11, 8], [13, 7.5],
    [-5, 10], [-7, 12], [-9, 14], [-11, 16], [-13, 18],
    [15, 15], [17, 16], [19, 17], [21, 18], [23, 17.5],
    [-15, -5], [-17, -7], [-19, -9],
  ]
  for (const [sx, sz] of steppingStonePositions) {
    const stone = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3 + Math.random() * 0.15, 0.35 + Math.random() * 0.15, 0.06, 6),
      _mat(PAL.lightStone)
    )
    stone.position.set(sx, 0.03, sz)
    stone.receiveShadow = true
    scene.add(stone)
  }

  // ── Stone paths connecting areas ────────────────────────────────
  const pathSegments = [
    { x0: 0, z0: -10, x1: 0, z1: -40, w: 2 },
    { x0: -10, z0: 0, x1: -40, z1: 0, w: 2 },
    { x0: 5, z0: 5, x1: 20, z1: 0, w: 1.8 },
    { x0: -5, z0: 5, x1: 0, z1: 20, w: 1.8 },
  ]
  for (const ps of pathSegments) {
    const dx = ps.x1 - ps.x0
    const dz = ps.z1 - ps.z0
    const len = Math.sqrt(dx * dx + dz * dz)
    const angle = Math.atan2(dx, dz)
    const path = new THREE.Mesh(
      new THREE.PlaneGeometry(ps.w, len),
      _mat('#8a8070', { side: THREE.DoubleSide })
    )
    path.rotation.x = -Math.PI / 2
    path.rotation.z = angle
    path.position.set((ps.x0 + ps.x1) / 2, 0.01, (ps.z0 + ps.z1) / 2)
    path.receiveShadow = true
    scene.add(path)
  }

  // ── Wooden benches (6) ──────────────────────────────────────────
  const benchPositions = [
    { x: 8, z: -15, ry: 0 }, { x: -12, z: 8, ry: 0.5 },
    { x: 22, z: 20, ry: -0.3 }, { x: -30, z: -15, ry: 0.8 },
    { x: 15, z: 40, ry: 1.2 }, { x: -20, z: 30, ry: -0.6 },
  ]
  for (const bp of benchPositions) {
    const bench = new THREE.Group()
    bench.position.set(bp.x, 0, bp.z)
    bench.rotation.y = bp.ry

    // Seat
    const seat = new THREE.Mesh(
      new THREE.BoxGeometry(1.4, 0.06, 0.5),
      _mat(PAL.lightWood)
    )
    seat.position.y = 0.4
    seat.castShadow = true
    bench.add(seat)

    // Legs
    const legGeo = new THREE.BoxGeometry(0.08, 0.4, 0.08)
    const legMat = _mat(PAL.darkWood)
    for (const [lx, lz] of [[-0.6,-0.2],[0.6,-0.2],[-0.6,0.2],[0.6,0.2]]) {
      const leg = new THREE.Mesh(legGeo, legMat)
      leg.position.set(lx, 0.2, lz)
      bench.add(leg)
    }

    scene.add(bench)
  }

  // ── Stone Buddha statues (4) ────────────────────────────────────
  const buddhaPositions = [
    { x: -30, z: -38 }, { x: 42, z: 38 },
    { x: -44, z: 30 }, { x: 38, z: -45 },
  ]
  for (const bp of buddhaPositions) {
    const group = new THREE.Group()
    group.position.set(bp.x, 0, bp.z)

    // Pedestal
    const pedestal = new THREE.Mesh(
      new THREE.CylinderGeometry(0.4, 0.5, 0.3, 6),
      _mat(PAL.stone)
    )
    pedestal.position.y = 0.15
    group.add(pedestal)

    // Body
    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(0.25, 0.3, 0.7, 6),
      _mat(PAL.lightStone)
    )
    body.position.y = 0.65
    body.castShadow = true
    group.add(body)

    // Head
    const head = new THREE.Mesh(
      new THREE.SphereGeometry(0.2, 6, 5),
      _mat(PAL.lightStone)
    )
    head.position.y = 1.15
    head.castShadow = true
    group.add(head)

    scene.add(group)
  }

  // ── Bamboo fences ───────────────────────────────────────────────
  const fences = [
    { x: 10, z: -25, len: 6, ry: 0 },
    { x: -20, z: 15, len: 5, ry: Math.PI / 3 },
    { x: 30, z: -15, len: 4, ry: Math.PI / 2 },
  ]
  for (const f of fences) {
    const fenceGroup = new THREE.Group()
    fenceGroup.position.set(f.x, 0, f.z)
    fenceGroup.rotation.y = f.ry

    const postCount = Math.ceil(f.len / 0.8)
    const postMat = _mat(PAL.bamboo)

    for (let i = 0; i <= postCount; i++) {
      const px = -f.len / 2 + i * (f.len / postCount)
      const post = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 1.0, 4),
        postMat
      )
      post.position.set(px, 0.5, 0)
      post.castShadow = true
      fenceGroup.add(post)
    }

    // Horizontal bars
    for (const hy of [0.3, 0.6, 0.9]) {
      const bar = new THREE.Mesh(
        new THREE.CylinderGeometry(0.025, 0.025, f.len, 4),
        _mat(PAL.bambooLight)
      )
      bar.position.set(0, hy, 0)
      bar.rotation.z = Math.PI / 2
      fenceGroup.add(bar)
    }

    scene.add(fenceGroup)

    // Fence collider
    const halfA = f.ry * 0.5
    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(f.x, 0.5, f.z)
    const b = world.createRigidBody(bd)
    b.setRotation({ x: 0, y: Math.sin(halfA), z: 0, w: Math.cos(halfA) })
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(f.len / 2, 0.5, 0.08).setFriction(0.3),
      b
    )
  }

  // ── Bonsai trees on stone pedestals (5) ─────────────────────────
  const bonsaiPositions = [
    { x: -25, z: -30 }, { x: 32, z: 25 },
    { x: -38, z: 10 }, { x: 18, z: -38 },
    { x: -5, z: 38 },
  ]
  for (const bp of bonsaiPositions) {
    const group = new THREE.Group()
    group.position.set(bp.x, 0, bp.z)

    // Stone pedestal
    const ped = new THREE.Mesh(
      new THREE.BoxGeometry(0.6, 0.8, 0.6),
      _mat(PAL.stone)
    )
    ped.position.y = 0.4
    group.add(ped)

    // Tiny trunk
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.03, 0.05, 0.4, 4),
      _mat(PAL.cherryTrunk)
    )
    trunk.position.y = 1.0
    trunk.rotation.z = 0.15
    group.add(trunk)

    // Tiny canopy — small spheres
    const canopyMat = _mat('#2a6a2a')
    for (const [cx, cy, cz] of [[0.05, 1.3, 0], [-0.1, 1.2, 0.08], [0.12, 1.25, -0.06]]) {
      const c = new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 5, 4),
        canopyMat
      )
      c.position.set(cx, cy, cz)
      group.add(c)
    }

    scene.add(group)
  }

  // ── Moss patches ────────────────────────────────────────────────
  for (let i = 0; i < 20; i++) {
    const mx = (Math.random() - 0.5) * 100
    const mz = (Math.random() - 0.5) * 100
    const mossSize = 0.4 + Math.random() * 0.8
    const moss = new THREE.Mesh(
      new THREE.CircleGeometry(mossSize, 6),
      _mat(PAL.moss, { side: THREE.DoubleSide })
    )
    moss.rotation.x = -Math.PI / 2
    moss.position.set(mx, 0.005, mz)
    scene.add(moss)
  }

  // ── Flower arrangements (chrysanthemums, irises) ────────────────
  const flowerPositions = [
    [-3, -18], [8, -22], [-18, 8], [12, 18], [-8, 28],
    [22, -8], [-28, 15], [5, -32], [-12, 42], [35, 8],
    [18, 38], [-42, -8], [48, -30], [-8, -42], [28, -25],
    [-32, 32],
  ]
  const flowerColors = [PAL.chrysanthemum, PAL.iris, PAL.lotus, '#e85050', '#f0a030', '#a050c0']

  for (let i = 0; i < flowerPositions.length; i++) {
    const [fx, fz] = flowerPositions[i]
    const color = flowerColors[i % flowerColors.length]

    // Stem
    const stem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.02, 0.4, 3),
      _mat('#3a6a20')
    )
    stem.position.set(fx, 0.2, fz)
    scene.add(stem)

    // Flower head
    const flower = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 5, 4),
      _mat(color)
    )
    flower.position.set(fx, 0.42, fz)
    scene.add(flower)
  }

  // ── Raked gravel paths ──────────────────────────────────────────
  const gravelPaths = [
    { x: 15, z: -30, w: 2, d: 12, ry: 0 },
    { x: -30, z: -5, w: 2, d: 10, ry: Math.PI / 4 },
  ]
  for (const gp of gravelPaths) {
    const gravel = new THREE.Mesh(
      new THREE.PlaneGeometry(gp.w, gp.d),
      _mat('#b8a880', { side: THREE.DoubleSide })
    )
    gravel.rotation.x = -Math.PI / 2
    gravel.rotation.z = gp.ry
    gravel.position.set(gp.x, 0.012, gp.z)
    gravel.receiveShadow = true
    scene.add(gravel)

    // Rake lines
    const lineCount = Math.floor(gp.d / 0.3)
    const cos = Math.cos(gp.ry)
    const sin = Math.sin(gp.ry)
    for (let i = 0; i < lineCount; i++) {
      const offset = -gp.d / 2 + i * 0.3 + 0.15
      const lx = gp.x + sin * offset
      const lz = gp.z + cos * offset
      const line = new THREE.Mesh(
        new THREE.BoxGeometry(gp.w - 0.2, 0.008, 0.03),
        _mat('#a09070')
      )
      line.position.set(lx, 0.018, lz)
      line.rotation.y = gp.ry
      scene.add(line)
    }
  }

  // ── Rice paddy patches ──────────────────────────────────────────
  const paddies = [
    { x: -45, z: -45, w: 8, d: 6 },
    { x: 50, z: 45, w: 7, d: 5 },
  ]
  for (const pd of paddies) {
    // Water surface
    const water = new THREE.Mesh(
      new THREE.PlaneGeometry(pd.w, pd.d),
      _mat(PAL.water, { transparent: true, opacity: 0.4, side: THREE.DoubleSide })
    )
    water.rotation.x = -Math.PI / 2
    water.position.set(pd.x, 0.02, pd.z)
    water.receiveShadow = true
    scene.add(water)

    // Rice plant rows
    const rows = Math.floor(pd.d / 0.5)
    const cols = Math.floor(pd.w / 0.5)
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const rx = pd.x - pd.w / 2 + c * 0.5 + 0.25
        const rz = pd.z - pd.d / 2 + r * 0.5 + 0.25
        const rice = new THREE.Mesh(
          new THREE.CylinderGeometry(0.01, 0.01, 0.3, 3),
          _mat(PAL.riceGreen)
        )
        rice.position.set(rx, 0.17, rz)
        scene.add(rice)
      }
    }

    // Earth border around paddy
    const borderMat = _mat('#6a5a3a')
    const bh = 0.12
    for (const [bx, bz, bw, bd] of [
      [pd.x, pd.z - pd.d / 2, pd.w + 0.3, 0.15],
      [pd.x, pd.z + pd.d / 2, pd.w + 0.3, 0.15],
      [pd.x - pd.w / 2, pd.z, 0.15, pd.d],
      [pd.x + pd.w / 2, pd.z, 0.15, pd.d],
    ]) {
      const border = new THREE.Mesh(
        new THREE.BoxGeometry(bw, bh, bd),
        borderMat
      )
      border.position.set(bx, bh / 2, bz)
      scene.add(border)
    }
  }

  // ── Stone well ──────────────────────────────────────────────────
  _createStoneWell(scene, RAPIER, world, 25, -30)
}

function _createStoneWell(scene, RAPIER, world, wx, wz) {
  const group = new THREE.Group()
  group.position.set(wx, 0, wz)

  // Well wall (cylinder with hole)
  const wall = new THREE.Mesh(
    new THREE.CylinderGeometry(0.7, 0.8, 0.8, 8),
    _mat(PAL.stone)
  )
  wall.position.y = 0.4
  wall.castShadow = true
  group.add(wall)

  // Dark water inside
  const waterInside = new THREE.Mesh(
    new THREE.CircleGeometry(0.55, 8),
    _mat('#0a3030', { side: THREE.DoubleSide })
  )
  waterInside.rotation.x = -Math.PI / 2
  waterInside.position.y = 0.6
  group.add(waterInside)

  // Roof supports
  for (const sx of [-0.5, 0.5]) {
    const support = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.05, 1.5, 4),
      _mat(PAL.darkWood)
    )
    support.position.set(sx, 1.55, 0)
    support.castShadow = true
    group.add(support)
  }

  // Small roof
  const roof = new THREE.Mesh(
    new THREE.BoxGeometry(1.6, 0.1, 1.0),
    _mat(PAL.roofTile)
  )
  roof.position.y = 2.35
  roof.castShadow = true
  group.add(roof)

  // Ridge
  const ridge = new THREE.Mesh(
    new THREE.BoxGeometry(1.7, 0.08, 0.15),
    _mat(PAL.roofDark)
  )
  ridge.position.y = 2.45
  group.add(ridge)

  // Rope and bucket hint
  const rope = new THREE.Mesh(
    new THREE.CylinderGeometry(0.015, 0.015, 1.2, 3),
    _mat('#8a7a60')
  )
  rope.position.set(0, 1.7, 0)
  group.add(rope)

  scene.add(group)

  // Collider
  const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(wx, 0.5, wz)
  const b = world.createRigidBody(bd)
  world.createCollider(RAPIER.ColliderDesc.cylinder(0.5, 0.8).setFriction(0.5), b)
}

// ═════════════════════════════════════════════════════════════════════════
//  CULTURAL PROPS
// ═════════════════════════════════════════════════════════════════════════
function _createCulturalProps(scene, paperLanterns) {
  // ── Paper lanterns hanging on strings ────────────────────────────
  const lanternStringPositions = [
    { x0: -5, z0: -18, x1: 5, z1: -18, count: 5 },
    { x0: -22, z0: 2, x1: -18, z1: 2, count: 3 },
    { x0: 15, z0: 18, x1: 25, z1: 18, count: 5 },
    { x0: -30, z0: 28, x1: -25, z1: 22, count: 4 },
  ]
  const paperLanternColors = ['#cc3030', '#e86830', '#cc3030', '#e85030']

  for (const ls of lanternStringPositions) {
    // String
    const dx = ls.x1 - ls.x0
    const dz = ls.z1 - ls.z0
    const len = Math.sqrt(dx * dx + dz * dz)
    const angle = Math.atan2(dx, dz)

    const string = new THREE.Mesh(
      new THREE.CylinderGeometry(0.01, 0.01, len, 3),
      _mat('#3a3a3a')
    )
    string.rotation.z = Math.PI / 2
    string.rotation.y = angle
    string.position.set((ls.x0 + ls.x1) / 2, 3.5, (ls.z0 + ls.z1) / 2)
    scene.add(string)

    // Hanging lanterns
    for (let i = 0; i < ls.count; i++) {
      const t = (i + 0.5) / ls.count
      const lx = ls.x0 + dx * t
      const lz = ls.z0 + dz * t
      const color = paperLanternColors[i % paperLanternColors.length]

      const lantern = new THREE.Mesh(
        new THREE.SphereGeometry(0.18, 6, 5),
        _emissiveMat(color, color, 0.4)
      )
      lantern.position.set(lx, 3.2, lz)
      scene.add(lantern)

      // Thin wire from string
      const wire = new THREE.Mesh(
        new THREE.CylinderGeometry(0.005, 0.005, 0.3, 3),
        _mat('#2a2a2a')
      )
      wire.position.set(lx, 3.35, lz)
      scene.add(wire)

      paperLanterns.push({
        mesh: lantern,
        phase: i * 2.1 + ls.x0 * 0.3,
      })
    }
  }

  // ── Wind chimes ─────────────────────────────────────────────────
  const chimePositions = [
    { x: -30, z: 27 }, { x: 35, z: 17 }, { x: -15, z: 37 },
  ]
  for (const cp of chimePositions) {
    // Hanging thread
    const thread = new THREE.Mesh(
      new THREE.CylinderGeometry(0.005, 0.005, 0.5, 3),
      _mat('#5a5a5a')
    )
    thread.position.set(cp.x, 2.75, cp.z)
    scene.add(thread)

    // Chime tubes
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2
      const tube = new THREE.Mesh(
        new THREE.CylinderGeometry(0.015, 0.015, 0.15 + i * 0.03, 4),
        _mat('#c0b090')
      )
      tube.position.set(
        cp.x + Math.cos(a) * 0.05,
        2.45 - i * 0.02,
        cp.z + Math.sin(a) * 0.05
      )
      scene.add(tube)
    }

    // Small paper strip (catcher)
    const catcher = new THREE.Mesh(
      new THREE.PlaneGeometry(0.06, 0.2),
      _mat(PAL.paper, { side: THREE.DoubleSide })
    )
    catcher.position.set(cp.x, 2.25, cp.z)
    scene.add(catcher)
  }

  // ── Sake barrels (decorative, near buildings) ───────────────────
  const sakeDecoPositions = [
    { x: -22, z: -2 }, { x: -22, z: 2 },
    { x: 2, z: -22 }, { x: 22, z: 2 },
  ]
  for (const sp of sakeDecoPositions) {
    const barrel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.35, 0.5, 8),
      _mat(PAL.sake)
    )
    barrel.position.set(sp.x, 0.25, sp.z)
    barrel.castShadow = true
    scene.add(barrel)

    // Band
    const band = new THREE.Mesh(
      new THREE.CylinderGeometry(0.32, 0.37, 0.04, 8),
      _mat(PAL.darkWood)
    )
    band.position.set(sp.x, 0.25, sp.z)
    scene.add(band)
  }

  // ── Folding screens (byobu) ─────────────────────────────────────
  const screenPositions = [
    { x: -32, z: 23, ry: 0.2 },
    { x: 42, z: -12, ry: -0.5 },
  ]
  for (const sp of screenPositions) {
    const screenGroup = new THREE.Group()
    screenGroup.position.set(sp.x, 0, sp.z)
    screenGroup.rotation.y = sp.ry

    // 4 panels
    for (let i = 0; i < 4; i++) {
      const panel = new THREE.Mesh(
        new THREE.BoxGeometry(0.6, 1.5, 0.03),
        _mat(i % 2 === 0 ? '#c8a850' : '#b89840')
      )
      panel.position.set(-0.9 + i * 0.62, 0.75, i % 2 === 0 ? 0 : 0.08)
      panel.castShadow = true
      screenGroup.add(panel)

      // Gold frame
      const frame = new THREE.Mesh(
        new THREE.BoxGeometry(0.62, 0.03, 0.04),
        _mat('#a08030')
      )
      frame.position.set(-0.9 + i * 0.62, 1.5, i % 2 === 0 ? 0 : 0.08)
      screenGroup.add(frame)
    }

    scene.add(screenGroup)
  }
}

// ═════════════════════════════════════════════════════════════════════════
//  DYNAMIC (PUSHABLE) OBJECTS
// ═════════════════════════════════════════════════════════════════════════
function _createDynamicObjects(scene, RAPIER, world, syncList) {
  // ── Wooden buckets (4) ──────────────────────────────────────────
  const bucketPositions = [
    { x: -28, z: 26 }, { x: 5, z: -28 },
    { x: 32, z: 32 }, { x: -40, z: -12 },
  ]
  for (const bp of bucketPositions) {
    const mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.25, 0.3, 0.5, 8),
      _mat(PAL.lightWood)
    )
    mesh.castShadow = true
    scene.add(mesh)

    // Band
    const band = new THREE.Mesh(
      new THREE.CylinderGeometry(0.27, 0.32, 0.04, 8),
      _mat(PAL.darkWood)
    )
    band.position.y = 0.1
    mesh.add(band)

    const bd = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(bp.x, 0.3, bp.z)
      .setLinearDamping(1.5)
      .setAngularDamping(1.5)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cylinder(0.25, 0.3).setDensity(8).setFriction(0.5).setRestitution(0.2),
      body
    )
    syncList.push({ mesh, body })
  }

  // ── Sake barrels (3, pushable) ──────────────────────────────────
  const sakePositions = [
    { x: 3, z: -24 }, { x: -23, z: -4 }, { x: 18, z: 3 },
  ]
  for (const sp of sakePositions) {
    const mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.35, 0.6, 8),
      _mat(PAL.sake)
    )
    mesh.castShadow = true
    scene.add(mesh)

    const bd = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(sp.x, 0.35, sp.z)
      .setLinearDamping(1.5)
      .setAngularDamping(1.5)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cylinder(0.3, 0.35).setDensity(12).setFriction(0.5).setRestitution(0.15),
      body
    )
    syncList.push({ mesh, body })
  }

  // ── Lantern stands (3, toppleable) ──────────────────────────────
  const lanternStandPositions = [
    { x: -5, z: 25 }, { x: 22, z: -5 }, { x: -18, z: -25 },
  ]
  for (const lp of lanternStandPositions) {
    const group = new THREE.Group()

    // Post
    const post = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.08, 1.2, 5),
      _mat(PAL.darkWood)
    )
    post.position.y = 0.0
    group.add(post)

    // Lantern on top
    const lantern = new THREE.Mesh(
      new THREE.SphereGeometry(0.15, 6, 5),
      _emissiveMat('#e86830', '#e86830', 0.3)
    )
    lantern.position.y = 0.65
    group.add(lantern)

    group.castShadow = true
    scene.add(group)

    const bd = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(lp.x, 0.7, lp.z)
      .setLinearDamping(0.8)
      .setAngularDamping(0.8)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(0.08, 0.6, 0.08).setDensity(10).setFriction(0.4).setRestitution(0.1),
      body
    )
    syncList.push({ mesh: group, body })
  }

  // ── Wooden carts (2) ────────────────────────────────────────────
  const cartPositions = [
    { x: -35, z: 10 }, { x: 30, z: -35 },
  ]
  for (const cp of cartPositions) {
    const group = new THREE.Group()

    // Cart bed
    const bed = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 0.1, 0.7),
      _mat(PAL.lightWood)
    )
    bed.position.y = 0.0
    bed.castShadow = true
    group.add(bed)

    // Low sides
    for (const sz of [-0.35, 0.35]) {
      const side = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, 0.2, 0.05),
        _mat(PAL.wood)
      )
      side.position.set(0, 0.15, sz)
      group.add(side)
    }

    // Wheels
    const wheelGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.06, 8)
    const wheelMat = _mat(PAL.darkWood)
    for (const [wx, wz] of [[-0.5, -0.4], [-0.5, 0.4], [0.5, -0.4], [0.5, 0.4]]) {
      const wheel = new THREE.Mesh(wheelGeo, wheelMat)
      wheel.position.set(wx, -0.15, wz)
      wheel.rotation.x = Math.PI / 2
      wheel.castShadow = true
      group.add(wheel)
    }

    // Handle
    const handle = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, 0.06, 0.8),
      _mat(PAL.wood)
    )
    handle.position.set(0.8, 0.1, 0)
    group.add(handle)

    scene.add(group)

    const bd = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(cp.x, 0.4, cp.z)
      .setLinearDamping(1.0)
      .setAngularDamping(1.0)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(0.6, 0.2, 0.4).setDensity(8).setFriction(0.6).setRestitution(0.1),
      body
    )
    syncList.push({ mesh: group, body })
  }
}
