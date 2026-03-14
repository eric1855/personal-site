/**
 * Playground World — Giant toy-box / playground theme.
 * Full 120x120 map, origin-centered. 4 portfolio buildings at (0,-20),(20,0),(0,20),(-20,0).
 * Bright primary colors, animated playground equipment, tons of dynamic pushable objects.
 */
import * as THREE from 'three'

// ── Helpers ────────────────────────────────────────────────────────────

function mat(color, opts = {}) {
  return new THREE.MeshStandardMaterial({ color, flatShading: true, ...opts })
}

function eMat(color, intensity = 0.8) {
  return new THREE.MeshStandardMaterial({
    color, emissive: color, emissiveIntensity: intensity, flatShading: true,
  })
}

function s(mesh) {
  mesh.castShadow = true
  mesh.receiveShadow = true
  return mesh
}

// ── Reusable geometries ───────────────────────────────────────────────

const _box = (w, h, d) => new THREE.BoxGeometry(w, h, d)
const _cyl = (rt, rb, h, seg = 8) => new THREE.CylinderGeometry(rt, rb, h, seg)
const _sph = (r, ws = 8, hs = 6) => new THREE.SphereGeometry(r, ws, hs)
const _cone = (r, h, seg = 8) => new THREE.ConeGeometry(r, h, seg)

// ═══════════════════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════════════════

export function createWorld(scene, RAPIER, world) {
  const syncList = []

  // ── Sky + fog ──
  scene.background = new THREE.Color(0xa8e4f0)
  scene.fog = new THREE.Fog(0xa8e4f0, 60, 140)

  // Animated element arrays
  const swingPivots = []
  const seesawPlanks = []
  const merryGoRounds = []
  const pinwheelSpins = []
  const fountainParticles = []

  // ── Ground ──
  _createGround(scene, RAPIER, world)

  // ── Boundary walls ──
  _createWalls(RAPIER, world)

  // ── Playground Equipment (animated) ──
  _createSwingSets(scene, RAPIER, world, swingPivots)
  _createSlides(scene, RAPIER, world)
  _createSeesaws(scene, seesawPlanks)
  _createMerryGoRounds(scene, merryGoRounds)
  _createClimbingFrame(scene, RAPIER, world)
  _createMonkeyBars(scene, RAPIER, world)
  _createSpringRiders(scene)

  // ── Building Block Zones ──
  _createBlockWalls(scene, RAPIER, world)
  _createDynamicBlocks(scene, RAPIER, world, syncList)
  _createBlockTowers(scene, RAPIER, world, syncList)
  _createBlockBridge(scene, RAPIER, world)

  // ── Sandboxes ──
  _createSandboxes(scene, RAPIER, world)

  // ── Fountains (animated) ──
  _createFountains(scene, RAPIER, world, fountainParticles)

  // ── Gazebos / Shelters ──
  _createGazebos(scene, RAPIER, world)

  // ── Park Furniture ──
  _createBenches(scene)
  _createLampPosts(scene)
  _createTrashCans(scene)
  _createPicnicTables(scene)
  _createDrinkingFountains(scene)
  _createBasketballHoops(scene, RAPIER, world)

  // ── Toy Props ──
  _createGiantToyCar(scene, RAPIER, world)
  _createToySoldiers(scene)
  _createToyRobots(scene)
  _createJackInTheBox(scene)
  _createGiantDice(scene, RAPIER, world, syncList)
  _createKite(scene)
  _createPinwheels(scene, pinwheelSpins)
  _createHopscotchGrids(scene)
  _createTicTacToe(scene)
  _createGiantPencils(scene)
  _createToyTrain(scene)

  // ── Ball Pit ──
  _createBallPit(scene, RAPIER, world, syncList)

  // ── Hedge Maze ──
  _createHedgeMaze(scene, RAPIER, world)

  // ── Vegetation (toy-style) ──
  _createLollipopTrees(scene)
  _createRoundBushes(scene)
  _createFlowerArrangements(scene)

  // ── Dynamic Interactive Objects ──
  _createPlaygroundBalls(scene, RAPIER, world, syncList)
  _createBowlingPins(scene, RAPIER, world, syncList)
  _createDynamicToyCars(scene, RAPIER, world, syncList)

  // ── Animation state ──
  let time = 0

  return {
    syncList,
    update(dt) {
      time += dt

      // Swing pendulum
      for (let i = 0; i < swingPivots.length; i++) {
        const sp = swingPivots[i]
        sp.rotation.z = Math.sin(time * 2.0 + i * 0.9) * 0.5
      }

      // Seesaw tilt
      for (let i = 0; i < seesawPlanks.length; i++) {
        seesawPlanks[i].rotation.z = Math.sin(time * 1.4 + i * 1.5) * 0.28
      }

      // Merry-go-round spin
      for (const mgr of merryGoRounds) {
        mgr.rotation.y += dt * 0.9
      }

      // Pinwheel spin
      for (const pw of pinwheelSpins) {
        pw.rotation.z += dt * 5.0
      }

      // Fountain particles
      for (const pArr of fountainParticles) {
        for (const p of pArr) {
          const ud = p.userData
          const progress = ((time * ud.speed + ud.phase) % (Math.PI * 2)) / (Math.PI * 2)
          const h = Math.sin(progress * Math.PI) * ud.maxH
          const r = ud.radius + progress * 0.9
          p.position.set(
            ud.cx + Math.cos(ud.angle + time * 0.3) * r,
            ud.baseY + h,
            ud.cz + Math.sin(ud.angle + time * 0.3) * r
          )
          p.scale.setScalar(0.5 + Math.sin(progress * Math.PI) * 0.6)
        }
      }
    },
  }
}

// ═══════════════════════════════════════════════════════════════════════
// GROUND
// ═══════════════════════════════════════════════════════════════════════

function _createGround(scene, RAPIER, world) {
  const geo = _box(130, 0.2, 130)
  const ground = s(new THREE.Mesh(geo, mat(0x6dbf5a)))
  ground.position.y = -0.1
  scene.add(ground)

  // Rapier ground collider
  const body = world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(0, -0.1, 0))
  world.createCollider(RAPIER.ColliderDesc.cuboid(65, 0.1, 65).setFriction(0.6), body)

  // Decorative lighter patches
  const patchColors = [0x7dcf6a, 0x5daf4a, 0x6ec95e]
  const patchPositions = [
    [-30, -30], [25, 40], [40, -25], [-35, 20], [-15, 45], [35, -45],
  ]
  for (let i = 0; i < patchPositions.length; i++) {
    const [px, pz] = patchPositions[i]
    const patchGeo = _cyl(6 + Math.random() * 4, 6 + Math.random() * 4, 0.02, 12)
    const patch = new THREE.Mesh(patchGeo, mat(patchColors[i % patchColors.length]))
    patch.position.set(px, 0.01, pz)
    patch.receiveShadow = true
    scene.add(patch)
  }
}

// ═══════════════════════════════════════════════════════════════════════
// BOUNDARY WALLS
// ═══════════════════════════════════════════════════════════════════════

function _createWalls(RAPIER, world) {
  const HALF = 60
  const H = 3
  const T = 0.5
  const walls = [
    { x: 0, z: -HALF, hw: HALF, hd: T / 2 },
    { x: 0, z: HALF, hw: HALF, hd: T / 2 },
    { x: -HALF, z: 0, hw: T / 2, hd: HALF },
    { x: HALF, z: 0, hw: T / 2, hd: HALF },
  ]
  for (const w of walls) {
    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(w.x, H / 2, w.z)
    const b = world.createRigidBody(bd)
    world.createCollider(RAPIER.ColliderDesc.cuboid(w.hw, H / 2, w.hd).setFriction(0.3), b)
  }
}

// ═══════════════════════════════════════════════════════════════════════
// SWING SETS (3, ANIMATED)
// ═══════════════════════════════════════════════════════════════════════

function _createSwingSets(scene, RAPIER, world, swingPivots) {
  const positions = [
    { x: -35, z: -10 },
    { x: 30, z: -35 },
    { x: -10, z: 40 },
  ]

  for (const pos of positions) {
    const group = new THREE.Group()
    group.position.set(pos.x, 0, pos.z)

    const frameMat = mat(0xcc3333)
    const chainMat = mat(0x888888)
    const seatMat = mat(0x2255cc)

    // A-frame legs
    const legGeo = _box(0.15, 4.0, 0.15)
    const legData = [
      [-2, 2, -1.1, 0.15], [-2, 2, 1.1, -0.15],
      [2, 2, -1.1, 0.15], [2, 2, 1.1, -0.15],
    ]
    for (const [lx, ly, lz, rz] of legData) {
      const leg = s(new THREE.Mesh(legGeo, frameMat))
      leg.position.set(lx, ly, lz)
      leg.rotation.z = rz
      group.add(leg)
    }

    // Top bar
    const bar = s(new THREE.Mesh(_cyl(0.1, 0.1, 4.5, 8), frameMat))
    bar.position.set(0, 3.8, 0)
    bar.rotation.z = Math.PI / 2
    group.add(bar)

    // Two swings each
    for (let i = 0; i < 2; i++) {
      const pivot = new THREE.Group()
      pivot.position.set(-1.0 + i * 2.0, 3.8, 0)

      const chainGeo = _cyl(0.025, 0.025, 2.5, 4)
      const cL = s(new THREE.Mesh(chainGeo, chainMat))
      cL.position.set(-0.22, -1.25, 0)
      pivot.add(cL)
      const cR = s(new THREE.Mesh(chainGeo, chainMat))
      cR.position.set(0.22, -1.25, 0)
      pivot.add(cR)

      const seat = s(new THREE.Mesh(_box(0.55, 0.07, 0.28), seatMat))
      seat.position.set(0, -2.5, 0)
      pivot.add(seat)

      group.add(pivot)
      swingPivots.push(pivot)
    }

    // Fixed collider
    const fb = world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(pos.x, 2, pos.z))
    world.createCollider(RAPIER.ColliderDesc.cuboid(2.2, 2, 1.2).setFriction(0.5), fb)

    scene.add(group)
  }
}

// ═══════════════════════════════════════════════════════════════════════
// SLIDES (2, FIXED colliders)
// ═══════════════════════════════════════════════════════════════════════

function _createSlides(scene, RAPIER, world) {
  const positions = [
    { x: -30, z: -25, ry: 0 },
    { x: 35, z: 25, ry: Math.PI },
  ]

  for (const pos of positions) {
    const group = new THREE.Group()
    group.position.set(pos.x, 0, pos.z)
    group.rotation.y = pos.ry

    const frameMat = mat(0xdddd22)
    const slideMat = mat(0xcccccc)
    const railMat = mat(0xff4444)

    // Platform
    const plat = s(new THREE.Mesh(_box(1.8, 0.15, 1.8), frameMat))
    plat.position.y = 2.8
    group.add(plat)

    // Supports
    const supGeo = _cyl(0.1, 0.1, 2.8, 6)
    const supMat = mat(0x888888)
    for (const [sx, sz] of [[-0.7, -0.7], [-0.7, 0.7], [0.7, -0.7], [0.7, 0.7]]) {
      const sup = s(new THREE.Mesh(supGeo, supMat))
      sup.position.set(sx, 1.4, sz)
      group.add(sup)
    }

    // Ladder rungs
    for (let r = 0; r < 6; r++) {
      const rung = s(new THREE.Mesh(_cyl(0.04, 0.04, 0.9, 6), supMat))
      rung.position.set(0, 0.5 + r * 0.45, -0.75)
      rung.rotation.z = Math.PI / 2
      group.add(rung)
    }

    // Slide surface
    const slide = s(new THREE.Mesh(_box(1.1, 0.07, 4.0), slideMat))
    slide.position.set(0, 1.5, 2.5)
    slide.rotation.x = 0.38
    group.add(slide)

    // Side rails
    const railGeo = _box(0.07, 0.45, 4.0)
    for (const rx of [-0.55, 0.55]) {
      const rail = s(new THREE.Mesh(railGeo, railMat))
      rail.position.set(rx, 1.65, 2.5)
      rail.rotation.x = 0.38
      group.add(rail)
    }

    // Guard rails on platform
    const guardGeo = _box(1.8, 0.5, 0.07)
    for (const gz of [-0.8, 0.8]) {
      const guard = s(new THREE.Mesh(guardGeo, railMat))
      guard.position.set(0, 3.15, gz)
      group.add(guard)
    }

    // Fixed collider
    const fb = world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(pos.x, 1.6, pos.z + (pos.ry === 0 ? 1.0 : -1.0)))
    world.createCollider(RAPIER.ColliderDesc.cuboid(1.1, 1.6, 2.8).setFriction(0.3), fb)

    scene.add(group)
  }
}

// ═══════════════════════════════════════════════════════════════════════
// SEESAWS (2, ANIMATED)
// ═══════════════════════════════════════════════════════════════════════

function _createSeesaws(scene, seesawPlanks) {
  const positions = [
    { x: -25, z: 15 },
    { x: 40, z: -15 },
  ]

  for (const pos of positions) {
    const group = new THREE.Group()
    group.position.set(pos.x, 0, pos.z)

    // Pivot
    const pivot = s(new THREE.Mesh(_cyl(0.3, 0.4, 0.7, 8), mat(0x888888)))
    pivot.position.y = 0.35
    group.add(pivot)

    // Plank pivot group
    const plankPivot = new THREE.Group()
    plankPivot.position.set(0, 0.7, 0)

    const plank = s(new THREE.Mesh(_box(4.5, 0.14, 0.55), mat(0x44bb44)))
    plankPivot.add(plank)

    // Handle bars
    const handleMat = mat(0xdd4444)
    for (const hx of [-2.0, 2.0]) {
      const handle = s(new THREE.Mesh(_cyl(0.04, 0.04, 0.55, 6), handleMat))
      handle.position.set(hx, 0.28, 0)
      plankPivot.add(handle)
      const cross = s(new THREE.Mesh(_cyl(0.035, 0.035, 0.45, 6), handleMat))
      cross.position.set(hx, 0.55, 0)
      cross.rotation.z = Math.PI / 2
      plankPivot.add(cross)
    }

    group.add(plankPivot)
    scene.add(group)
    seesawPlanks.push(plankPivot)
  }
}

// ═══════════════════════════════════════════════════════════════════════
// MERRY-GO-ROUNDS (2, ANIMATED)
// ═══════════════════════════════════════════════════════════════════════

function _createMerryGoRounds(scene, merryGoRounds) {
  const positions = [
    { x: 35, z: 10 },
    { x: -40, z: -35 },
  ]

  const segColors = [0xff4444, 0x44ff44, 0x4444ff, 0xffff44, 0xff44ff, 0x44ffff]

  for (const pos of positions) {
    const group = new THREE.Group()
    group.position.set(pos.x, 0, pos.z)

    // Axle
    const axle = s(new THREE.Mesh(_cyl(0.18, 0.18, 0.55, 8), mat(0x888888)))
    axle.position.y = 0.28
    group.add(axle)

    // Spinning platform
    const spin = new THREE.Group()
    spin.position.y = 0.4

    const platform = s(new THREE.Mesh(_cyl(2.0, 2.0, 0.14, 12), mat(0x3388dd)))
    spin.add(platform)

    // Colored segments
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2
      const seg = s(new THREE.Mesh(_box(0.9, 0.05, 0.35), mat(segColors[i])))
      seg.position.set(Math.cos(angle) * 1.1, 0.1, Math.sin(angle) * 1.1)
      seg.rotation.y = -angle
      spin.add(seg)
    }

    // Grab handles
    const handleMat = mat(0xdddddd)
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2
      const hx = Math.cos(angle) * 1.5
      const hz = Math.sin(angle) * 1.5
      const vH = s(new THREE.Mesh(_cyl(0.045, 0.045, 0.9, 6), handleMat))
      vH.position.set(hx, 0.5, hz)
      spin.add(vH)
    }

    group.add(spin)
    scene.add(group)
    merryGoRounds.push(spin)
  }
}

// ═══════════════════════════════════════════════════════════════════════
// CLIMBING FRAME
// ═══════════════════════════════════════════════════════════════════════

function _createClimbingFrame(scene, RAPIER, world) {
  const group = new THREE.Group()
  group.position.set(45, 0, -20)

  const barMat = mat(0xff6600)
  const barGeo = _cyl(0.06, 0.06, 3.0, 6)
  const hBarGeo = _cyl(0.06, 0.06, 2.5, 6)

  // Vertical bars (grid: 3x3)
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const bar = s(new THREE.Mesh(barGeo, barMat))
      bar.position.set(i * 1.25 - 1.25, 1.5, j * 1.25 - 1.25)
      group.add(bar)
    }
  }

  // Horizontal bars level 1
  for (let j = 0; j < 3; j++) {
    const hb = s(new THREE.Mesh(hBarGeo, mat(0x2255cc)))
    hb.position.set(0, 1.5, j * 1.25 - 1.25)
    hb.rotation.z = Math.PI / 2
    group.add(hb)
  }

  // Horizontal bars level 2
  for (let i = 0; i < 3; i++) {
    const hb = s(new THREE.Mesh(_cyl(0.06, 0.06, 2.5, 6), mat(0xdd2222)))
    hb.position.set(i * 1.25 - 1.25, 3.0, 0)
    hb.rotation.x = Math.PI / 2
    group.add(hb)
  }

  // Platform on top
  const topPlat = s(new THREE.Mesh(_box(2.7, 0.1, 2.7), mat(0xffcc00)))
  topPlat.position.y = 3.05
  group.add(topPlat)

  const fb = world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(45, 1.5, -20))
  world.createCollider(RAPIER.ColliderDesc.cuboid(1.5, 1.5, 1.5).setFriction(0.5), fb)

  scene.add(group)
}

// ═══════════════════════════════════════════════════════════════════════
// MONKEY BARS
// ═══════════════════════════════════════════════════════════════════════

function _createMonkeyBars(scene, RAPIER, world) {
  const group = new THREE.Group()
  group.position.set(-45, 0, 15)

  const poleMat = mat(0x2255cc)
  const barMat = mat(0xffcc00)

  // Support poles (4)
  const poleGeo = _cyl(0.08, 0.08, 3.0, 6)
  for (const [px, pz] of [[-3, -0.5], [-3, 0.5], [3, -0.5], [3, 0.5]]) {
    const pole = s(new THREE.Mesh(poleGeo, poleMat))
    pole.position.set(px, 1.5, pz)
    group.add(pole)
  }

  // Top rails
  for (const rz of [-0.5, 0.5]) {
    const rail = s(new THREE.Mesh(_cyl(0.06, 0.06, 6.5, 6), poleMat))
    rail.position.set(0, 3.0, rz)
    rail.rotation.z = Math.PI / 2
    group.add(rail)
  }

  // Rungs (8)
  for (let i = 0; i < 8; i++) {
    const rung = s(new THREE.Mesh(_cyl(0.04, 0.04, 1.0, 6), barMat))
    rung.position.set(-2.8 + i * 0.8, 3.0, 0)
    rung.rotation.x = Math.PI / 2
    group.add(rung)
  }

  const fb = world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(-45, 1.5, 15))
  world.createCollider(RAPIER.ColliderDesc.cuboid(3.5, 1.5, 0.7).setFriction(0.5), fb)

  scene.add(group)
}

// ═══════════════════════════════════════════════════════════════════════
// SPRING RIDERS (4)
// ═══════════════════════════════════════════════════════════════════════

function _createSpringRiders(scene) {
  const riders = [
    { x: -15, z: -35, color: 0xff4444 },
    { x: 15, z: 35, color: 0x44ff44 },
    { x: 25, z: -30, color: 0x4488ff },
    { x: -30, z: 30, color: 0xffaa00 },
  ]

  for (const rd of riders) {
    const group = new THREE.Group()
    group.position.set(rd.x, 0, rd.z)

    // Spring
    const spring = s(new THREE.Mesh(_cyl(0.12, 0.15, 0.6, 8), mat(0x888888)))
    spring.position.y = 0.3
    group.add(spring)

    // Body (sphere animal)
    const body = s(new THREE.Mesh(_sph(0.4, 6, 5), mat(rd.color)))
    body.position.y = 0.9
    group.add(body)

    // Head
    const head = s(new THREE.Mesh(_sph(0.25, 6, 5), mat(rd.color)))
    head.position.set(0.2, 1.3, 0)
    group.add(head)

    // Eyes
    for (const ez of [-0.08, 0.08]) {
      const eye = new THREE.Mesh(_sph(0.04, 4, 4), mat(0x111111))
      eye.position.set(0.42, 1.35, ez)
      group.add(eye)
    }

    // Handle
    const handle = s(new THREE.Mesh(_cyl(0.03, 0.03, 0.4, 4), mat(0xdddddd)))
    handle.position.set(0, 1.1, 0)
    handle.rotation.z = Math.PI / 2
    group.add(handle)

    scene.add(group)
  }
}

// ═══════════════════════════════════════════════════════════════════════
// BUILDING BLOCK WALLS (fixed structures)
// ═══════════════════════════════════════════════════════════════════════

function _createBlockWalls(scene, RAPIER, world) {
  const wallDefs = [
    { x: -50, z: -15, blocks: 8 },
    { x: 50, z: 15, blocks: 6 },
    { x: 10, z: -45, blocks: 7 },
  ]

  const blockColors = [0xff2222, 0x2222ff, 0xffff22, 0x22cc22, 0xff8800, 0xcc22cc]

  for (const wd of wallDefs) {
    const group = new THREE.Group()
    group.position.set(wd.x, 0, wd.z)

    for (let i = 0; i < wd.blocks; i++) {
      const row = Math.floor(i / 3)
      const col = i % 3
      const bw = 1.2 + Math.random() * 0.4
      const bh = 0.8
      const bd = 1.0
      const block = s(new THREE.Mesh(_box(bw, bh, bd), mat(blockColors[i % blockColors.length])))
      block.position.set(col * 1.5 - 1.5, row * bh + bh / 2, 0)
      group.add(block)
    }

    // Fixed collider for whole wall
    const fb = world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(wd.x, 1.0, wd.z))
    world.createCollider(RAPIER.ColliderDesc.cuboid(2.5, 1.2, 0.6).setFriction(0.5), fb)

    scene.add(group)
  }
}

// ═══════════════════════════════════════════════════════════════════════
// DYNAMIC BLOCKS (pushable, scattered)
// ═══════════════════════════════════════════════════════════════════════

function _createDynamicBlocks(scene, RAPIER, world, syncList) {
  const blockColors = [0xff2222, 0x2222ff, 0xffff22, 0x22cc22, 0xff8800, 0xcc22cc, 0xff6688, 0x22dddd,
    0xaa44ff, 0xffaa44, 0x44ff88, 0xff4488, 0x88ff44, 0x4488ff, 0xdddd22]
  const positions = [
    [-12, -12], [15, -15], [-18, 25], [25, 18], [-8, -40], [8, 40],
    [38, -8], [-38, 8], [22, -22], [-22, 22], [45, 30], [-45, -10],
    [10, 30], [-10, -30], [30, -40],
  ]

  for (let i = 0; i < positions.length; i++) {
    const [bx, bz] = positions[i]
    const size = 0.6 + Math.random() * 0.4
    const hs = size / 2
    const geo = _box(size, size, size)
    const block = s(new THREE.Mesh(geo, mat(blockColors[i % blockColors.length])))
    const by = hs + 0.05
    block.position.set(bx, by, bz)
    scene.add(block)

    const rb = world.createRigidBody(
      RAPIER.RigidBodyDesc.dynamic().setTranslation(bx, by, bz).setLinearDamping(0.4).setAngularDamping(0.5)
    )
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(hs, hs, hs).setDensity(3.0).setFriction(0.5).setRestitution(0.15), rb
    )
    syncList.push({ mesh: block, body: rb })
  }
}

// ═══════════════════════════════════════════════════════════════════════
// BLOCK TOWERS (stacked, dynamic)
// ═══════════════════════════════════════════════════════════════════════

function _createBlockTowers(scene, RAPIER, world, syncList) {
  const towerPositions = [
    { x: -35, z: 40 },
    { x: 50, z: -35 },
  ]
  const blockColors = [0xff2222, 0x2222ff, 0xffff22, 0x22cc22, 0xff8800, 0xcc22cc]

  for (const tp of towerPositions) {
    for (let i = 0; i < 5; i++) {
      const size = 0.8
      const hs = size / 2
      const by = i * size + hs + 0.05
      const block = s(new THREE.Mesh(_box(size, size, size), mat(blockColors[i % blockColors.length])))
      block.position.set(tp.x, by, tp.z)
      scene.add(block)

      const rb = world.createRigidBody(
        RAPIER.RigidBodyDesc.dynamic().setTranslation(tp.x, by, tp.z).setLinearDamping(0.4).setAngularDamping(0.5)
      )
      world.createCollider(
        RAPIER.ColliderDesc.cuboid(hs, hs, hs).setDensity(3.5).setFriction(0.6).setRestitution(0.1), rb
      )
      syncList.push({ mesh: block, body: rb })
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════
// BLOCK BRIDGE (fixed, driveable)
// ═══════════════════════════════════════════════════════════════════════

function _createBlockBridge(scene, RAPIER, world) {
  const group = new THREE.Group()
  const bx = -10
  const bz = -50

  // Two pillars
  for (const side of [-1, 1]) {
    for (let row = 0; row < 3; row++) {
      const pillar = s(new THREE.Mesh(_box(1.5, 0.8, 1.2), mat(row % 2 === 0 ? 0xff2222 : 0x2222ff)))
      pillar.position.set(bx + side * 2.5, row * 0.8 + 0.4, bz)
      scene.add(pillar)
    }
  }

  // Bridge deck
  const deck = s(new THREE.Mesh(_box(7, 0.3, 1.5), mat(0xffff22)))
  deck.position.set(bx, 2.55, bz)
  scene.add(deck)

  // Colliders for pillars
  for (const side of [-1, 1]) {
    const fb = world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(bx + side * 2.5, 1.2, bz))
    world.createCollider(RAPIER.ColliderDesc.cuboid(0.75, 1.2, 0.6).setFriction(0.5), fb)
  }
  // Collider for deck
  const fbd = world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(bx, 2.55, bz))
  world.createCollider(RAPIER.ColliderDesc.cuboid(3.5, 0.15, 0.75).setFriction(0.5), fbd)
}

// ═══════════════════════════════════════════════════════════════════════
// SANDBOXES (3)
// ═══════════════════════════════════════════════════════════════════════

function _createSandboxes(scene, RAPIER, world) {
  const sandboxes = [
    { x: 30, z: 40 },
    { x: -25, z: -45 },
    { x: -50, z: 35 },
  ]
  const woodMat = mat(0x8b5e3c)
  const sandMat = mat(0xe8d5a3)

  for (const sb of sandboxes) {
    const group = new THREE.Group()
    group.position.set(sb.x, 0, sb.z)

    // Walls
    const wGeo = _box(3.5, 0.45, 0.14)
    const wsGeo = _box(0.14, 0.45, 3.5)
    for (const [geo, x, z] of [[wGeo, 0, -1.75], [wGeo, 0, 1.75], [wsGeo, -1.75, 0], [wsGeo, 1.75, 0]]) {
      const wall = s(new THREE.Mesh(geo, woodMat))
      wall.position.set(x, 0.22, z)
      group.add(wall)
    }

    // Sand fill
    const sand = new THREE.Mesh(_box(3.36, 0.08, 3.36), sandMat)
    sand.position.y = 0.04
    sand.receiveShadow = true
    group.add(sand)

    // Sandcastle
    const castle = s(new THREE.Mesh(_cyl(0.4, 0.45, 0.55, 8), mat(0xdcc48e)))
    castle.position.set(0.4, 0.35, 0.3)
    group.add(castle)

    const castleTop = s(new THREE.Mesh(_cyl(0.3, 0.35, 0.35, 8), mat(0xd4b87a)))
    castleTop.position.set(0.4, 0.8, 0.3)
    group.add(castleTop)

    // 4 turrets
    for (const [tx, tz] of [[0.7, 0.2], [0.1, 0.2], [0.7, 0.55], [0.1, 0.55]]) {
      const turret = s(new THREE.Mesh(_cyl(0.09, 0.11, 0.55, 6), mat(0xdcc48e)))
      turret.position.set(tx, 0.38, tz)
      group.add(turret)
      const turretTop = s(new THREE.Mesh(_cone(0.12, 0.18, 6), mat(0xc4a860)))
      turretTop.position.set(tx, 0.73, tz)
      group.add(turretTop)
    }

    // Toy shovel
    const sHandle = s(new THREE.Mesh(_cyl(0.025, 0.025, 0.45, 4), mat(0x44aadd)))
    sHandle.position.set(-0.7, 0.18, -0.5)
    sHandle.rotation.z = 0.6
    group.add(sHandle)

    // Bucket
    const bucket = s(new THREE.Mesh(_cyl(0.13, 0.16, 0.22, 8), mat(0xff4466)))
    bucket.position.set(-0.3, 0.19, -0.7)
    group.add(bucket)

    // Fixed collider for walls
    for (const [wx, wz, hw, hd] of [[0, -1.75, 1.75, 0.1], [0, 1.75, 1.75, 0.1], [-1.75, 0, 0.1, 1.75], [1.75, 0, 0.1, 1.75]]) {
      const fb = world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(sb.x + wx, 0.22, sb.z + wz))
      world.createCollider(RAPIER.ColliderDesc.cuboid(hw, 0.22, hd).setFriction(0.4), fb)
    }

    scene.add(group)
  }
}

// ═══════════════════════════════════════════════════════════════════════
// FOUNTAINS (2, ANIMATED)
// ═══════════════════════════════════════════════════════════════════════

function _createFountains(scene, RAPIER, world, fountainParticles) {
  const fDefs = [
    { x: -35, z: -30 },
    { x: 40, z: 40 },
  ]

  const stoneMat = mat(0x999999)
  const waterMat = mat(0x3388cc, { transparent: true, opacity: 0.6 })

  for (const fd of fDefs) {
    const group = new THREE.Group()
    group.position.set(fd.x, 0, fd.z)

    // Base pool
    const pool = s(new THREE.Mesh(_cyl(2.8, 3.1, 0.55, 12), stoneMat))
    pool.position.y = 0.28
    group.add(pool)

    // Water surface
    const waterSurf = new THREE.Mesh(_cyl(2.5, 2.5, 0.07, 12), waterMat)
    waterSurf.position.y = 0.5
    waterSurf.receiveShadow = true
    group.add(waterSurf)

    // Pillar
    const pillar = s(new THREE.Mesh(_cyl(0.22, 0.28, 2.2, 8), stoneMat))
    pillar.position.y = 1.35
    group.add(pillar)

    // Lower bowl
    const bowl1 = s(new THREE.Mesh(_cyl(1.1, 0.55, 0.35, 10), stoneMat))
    bowl1.position.y = 1.5
    group.add(bowl1)

    // Upper bowl
    const bowl2 = s(new THREE.Mesh(_cyl(0.55, 0.3, 0.22, 10), stoneMat))
    bowl2.position.y = 2.15
    group.add(bowl2)

    // Cap
    const cap = s(new THREE.Mesh(_sph(0.17, 6, 6), mat(0x777777)))
    cap.position.y = 2.4
    group.add(cap)

    // Water particles
    const particles = []
    const pGeo = _sph(0.07, 4, 4)
    const pMat = mat(0x55aaff, { transparent: true, opacity: 0.7 })
    for (let i = 0; i < 20; i++) {
      const p = new THREE.Mesh(pGeo, pMat)
      const angle = (i / 20) * Math.PI * 2
      const r = 0.15 + Math.random() * 0.35
      p.userData = {
        angle, radius: r,
        speed: 1.5 + Math.random(), phase: Math.random() * Math.PI * 2,
        maxH: 0.5 + Math.random() * 0.7,
        cx: fd.x, cz: fd.z, baseY: 2.45,
      }
      p.position.set(fd.x + Math.cos(angle) * r, 2.45, fd.z + Math.sin(angle) * r)
      scene.add(p)
      particles.push(p)
    }
    fountainParticles.push(particles)

    // Fixed collider
    const fb = world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(fd.x, 1.1, fd.z))
    world.createCollider(RAPIER.ColliderDesc.cylinder(1.1, 2.9).setFriction(0.5), fb)

    scene.add(group)
  }
}

// ═══════════════════════════════════════════════════════════════════════
// GAZEBOS / SHELTERS (3)
// ═══════════════════════════════════════════════════════════════════════

function _createGazebos(scene, RAPIER, world) {
  const gazebos = [
    { x: -45, z: -25, roofColor: 0xcc4444 },
    { x: 45, z: 35, roofColor: 0x4444cc },
    { x: 10, z: 50, roofColor: 0x44cc44 },
  ]

  for (const gz of gazebos) {
    const group = new THREE.Group()
    group.position.set(gz.x, 0, gz.z)

    const pillarMat = mat(0xcccccc)

    // Floor
    const floor = s(new THREE.Mesh(_cyl(2.8, 2.8, 0.22, 6), mat(0xaa9977)))
    floor.position.y = 0.11
    group.add(floor)

    // 6 pillars
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2
      const px = Math.cos(angle) * 2.3
      const pz = Math.sin(angle) * 2.3
      const pillar = s(new THREE.Mesh(_cyl(0.13, 0.13, 3.2, 8), pillarMat))
      pillar.position.set(px, 1.8, pz)
      group.add(pillar)
    }

    // Roof
    const roof = s(new THREE.Mesh(_cone(3.2, 1.6, 6), mat(gz.roofColor)))
    roof.position.y = 4.2
    group.add(roof)

    // Finial
    const finial = s(new THREE.Mesh(_sph(0.14, 6, 6), mat(0xddaa00)))
    finial.position.y = 5.05
    group.add(finial)

    // Picnic table inside (first gazebo only)
    if (gz.roofColor === 0xcc4444) {
      const tTop = s(new THREE.Mesh(_box(2.2, 0.08, 0.9), mat(0x8b5e3c)))
      tTop.position.y = 0.8
      group.add(tTop)
      for (const lx of [-0.8, 0.8]) {
        const leg = s(new THREE.Mesh(_box(0.08, 0.75, 0.9), mat(0x8b5e3c)))
        leg.position.set(lx, 0.45, 0)
        group.add(leg)
      }
    }

    // Fixed collider (cylinder around pillars)
    const fb = world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(gz.x, 1.6, gz.z))
    world.createCollider(RAPIER.ColliderDesc.cylinder(1.6, 2.5).setFriction(0.5), fb)

    scene.add(group)
  }
}

// ═══════════════════════════════════════════════════════════════════════
// BENCHES (10)
// ═══════════════════════════════════════════════════════════════════════

function _createBenches(scene) {
  const benchData = [
    { x: -8, z: -8, ry: 0, color: 0xff4444 },
    { x: 8, z: 8, ry: 0.5, color: 0x4444ff },
    { x: -15, z: 10, ry: 1.2, color: 0xffff44 },
    { x: 15, z: -10, ry: -0.8, color: 0x44ff44 },
    { x: -30, z: -5, ry: 0.3, color: 0xff8800 },
    { x: 30, z: 5, ry: -0.3, color: 0xcc44ff },
    { x: -20, z: 35, ry: 1.0, color: 0xff4488 },
    { x: 20, z: -35, ry: -1.0, color: 0x44ffaa },
    { x: -40, z: -40, ry: 0.7, color: 0xff6644 },
    { x: 40, z: 45, ry: -0.5, color: 0x44aaff },
  ]

  for (const bd of benchData) {
    const group = new THREE.Group()
    group.position.set(bd.x, 0, bd.z)
    group.rotation.y = bd.ry

    // Seat
    const seat = s(new THREE.Mesh(_box(1.4, 0.07, 0.45), mat(bd.color)))
    seat.position.y = 0.45
    group.add(seat)

    // Backrest
    const back = s(new THREE.Mesh(_box(1.4, 0.42, 0.07), mat(bd.color)))
    back.position.set(0, 0.72, -0.19)
    back.rotation.x = -0.15
    group.add(back)

    // Legs
    const legGeo = _box(0.07, 0.45, 0.07)
    const legMat = mat(0xdddddd)
    for (const [lx, lz] of [[-0.55, -0.16], [-0.55, 0.16], [0.55, -0.16], [0.55, 0.16]]) {
      const leg = s(new THREE.Mesh(legGeo, legMat))
      leg.position.set(lx, 0.22, lz)
      group.add(leg)
    }

    scene.add(group)
  }
}

// ═══════════════════════════════════════════════════════════════════════
// LAMP POSTS (8)
// ═══════════════════════════════════════════════════════════════════════

function _createLampPosts(scene) {
  const lampPos = [
    [-12, -15], [12, 15], [-25, 5], [25, -5],
    [-5, 30], [5, -30], [-40, 20], [40, -20],
  ]
  const poleMat = mat(0x555555)

  for (const [lx, lz] of lampPos) {
    const group = new THREE.Group()
    group.position.set(lx, 0, lz)

    // Pole
    const pole = s(new THREE.Mesh(_cyl(0.07, 0.09, 3.8, 6), poleMat))
    pole.position.y = 1.9
    group.add(pole)

    // Base
    const base = s(new THREE.Mesh(_cyl(0.18, 0.22, 0.18, 8), poleMat))
    base.position.y = 0.09
    group.add(base)

    // Arm
    const arm = s(new THREE.Mesh(_cyl(0.04, 0.04, 0.65, 6), poleMat))
    arm.position.set(0.28, 3.7, 0)
    arm.rotation.z = Math.PI / 2
    group.add(arm)

    // Bulb (emissive warm glow)
    const bulb = new THREE.Mesh(_sph(0.17, 6, 6), eMat(0xffee66))
    bulb.position.set(0.55, 3.65, 0)
    group.add(bulb)

    // Shade
    const shade = s(new THREE.Mesh(_cone(0.28, 0.17, 8), poleMat))
    shade.position.set(0.55, 3.8, 0)
    group.add(shade)

    scene.add(group)
  }
}

// ═══════════════════════════════════════════════════════════════════════
// TRASH CANS (6)
// ═══════════════════════════════════════════════════════════════════════

function _createTrashCans(scene) {
  const positions = [
    [-10, -20, 0xff4444], [10, 20, 0x4444ff], [-30, 15, 0x44cc44],
    [30, -15, 0xffff44], [-20, -30, 0xff8800], [20, 30, 0xcc44ff],
  ]

  for (const [tx, tz, color] of positions) {
    const group = new THREE.Group()
    group.position.set(tx, 0, tz)

    const body = s(new THREE.Mesh(_cyl(0.28, 0.32, 0.75, 8), mat(color)))
    body.position.y = 0.38
    group.add(body)

    const lid = s(new THREE.Mesh(_cyl(0.3, 0.3, 0.07, 8), mat(color)))
    lid.position.y = 0.78
    group.add(lid)

    const handle = s(new THREE.Mesh(_cyl(0.02, 0.02, 0.2, 4), mat(0xdddddd)))
    handle.position.set(0, 0.85, 0)
    group.add(handle)

    scene.add(group)
  }
}

// ═══════════════════════════════════════════════════════════════════════
// PICNIC TABLES (4)
// ═══════════════════════════════════════════════════════════════════════

function _createPicnicTables(scene) {
  const tables = [
    { x: -15, z: -25, ry: 0.4 },
    { x: 15, z: 25, ry: -0.6 },
    { x: -35, z: 10, ry: 0.2 },
    { x: 35, z: -10, ry: -0.3 },
  ]
  const woodMat = mat(0x8b5e3c)

  for (const t of tables) {
    const group = new THREE.Group()
    group.position.set(t.x, 0, t.z)
    group.rotation.y = t.ry

    const top = s(new THREE.Mesh(_box(2.2, 0.09, 0.85), woodMat))
    top.position.y = 0.78
    group.add(top)

    for (const lx of [-0.75, 0.75]) {
      const leg = s(new THREE.Mesh(_box(0.09, 0.78, 0.85), woodMat))
      leg.position.set(lx, 0.39, 0)
      group.add(leg)
    }

    for (const bz of [-0.65, 0.65]) {
      const bench = s(new THREE.Mesh(_box(2.2, 0.07, 0.32), mat(0x7a5020)))
      bench.position.set(0, 0.42, bz)
      group.add(bench)
    }

    scene.add(group)
  }
}

// ═══════════════════════════════════════════════════════════════════════
// DRINKING FOUNTAINS (3)
// ═══════════════════════════════════════════════════════════════════════

function _createDrinkingFountains(scene) {
  const positions = [[-8, 15], [8, -15], [25, 25]]

  for (const [dx, dz] of positions) {
    const group = new THREE.Group()
    group.position.set(dx, 0, dz)

    const ped = s(new THREE.Mesh(_cyl(0.22, 0.28, 0.85, 8), mat(0x999999)))
    ped.position.y = 0.42
    group.add(ped)

    const basin = s(new THREE.Mesh(_cyl(0.32, 0.22, 0.18, 8), mat(0xaaaaaa)))
    basin.position.y = 0.9
    group.add(basin)

    const spout = s(new THREE.Mesh(_cyl(0.035, 0.035, 0.22, 6), mat(0x888888)))
    spout.position.set(0, 1.0, 0.13)
    spout.rotation.x = -0.5
    group.add(spout)

    scene.add(group)
  }
}

// ═══════════════════════════════════════════════════════════════════════
// BASKETBALL HOOPS (2)
// ═══════════════════════════════════════════════════════════════════════

function _createBasketballHoops(scene, RAPIER, world) {
  const hoops = [
    { x: -50, z: -40 },
    { x: 50, z: 40 },
  ]

  for (const hp of hoops) {
    const group = new THREE.Group()
    group.position.set(hp.x, 0, hp.z)

    // Pole
    const pole = s(new THREE.Mesh(_cyl(0.1, 0.12, 4.0, 6), mat(0x555555)))
    pole.position.y = 2.0
    group.add(pole)

    // Backboard
    const backboard = s(new THREE.Mesh(_box(1.6, 1.0, 0.08), mat(0xffffff)))
    backboard.position.set(0, 3.8, 0.3)
    group.add(backboard)

    // Backboard square
    const square = s(new THREE.Mesh(_box(0.8, 0.55, 0.02), mat(0xff4444)))
    square.position.set(0, 3.7, 0.35)
    group.add(square)

    // Rim (torus)
    const rim = s(new THREE.Mesh(
      new THREE.TorusGeometry(0.3, 0.025, 6, 12),
      mat(0xff6600)
    ))
    rim.position.set(0, 3.3, 0.6)
    rim.rotation.x = Math.PI / 2
    group.add(rim)

    // Arm connecting pole to backboard
    const arm = s(new THREE.Mesh(_box(0.08, 0.08, 0.6), mat(0x555555)))
    arm.position.set(0, 3.8, 0.15)
    group.add(arm)

    const fb = world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(hp.x, 2.0, hp.z))
    world.createCollider(RAPIER.ColliderDesc.cuboid(0.15, 2.0, 0.15).setFriction(0.5), fb)

    scene.add(group)
  }
}

// ═══════════════════════════════════════════════════════════════════════
// GIANT TOY CAR (5x scale, parked)
// ═══════════════════════════════════════════════════════════════════════

function _createGiantToyCar(scene, RAPIER, world) {
  const group = new THREE.Group()
  group.position.set(-40, 0, 45)
  group.rotation.y = 0.6

  const carMat = mat(0xff2222)

  // Body
  const body = s(new THREE.Mesh(_box(5.0, 1.9, 2.8), carMat))
  body.position.y = 1.5
  group.add(body)

  // Cabin
  const cabin = s(new THREE.Mesh(_box(2.8, 1.2, 2.5), carMat))
  cabin.position.set(-0.3, 3.1, 0)
  group.add(cabin)

  // Windows
  const winMat = mat(0x88bbdd, { transparent: true, opacity: 0.5 })
  const windshield = new THREE.Mesh(_box(0.1, 0.9, 2.0), winMat)
  windshield.position.set(1.1, 3.1, 0)
  group.add(windshield)
  const rearWin = new THREE.Mesh(_box(0.1, 0.9, 2.0), winMat)
  rearWin.position.set(-1.7, 3.1, 0)
  group.add(rearWin)

  // Wheels
  const wheelGeo = _cyl(0.6, 0.6, 0.4, 8)
  const wheelMat = mat(0x222222)
  for (const [wx, wz] of [[1.8, 1.6], [1.8, -1.6], [-1.8, 1.6], [-1.8, -1.6]]) {
    const wheel = s(new THREE.Mesh(wheelGeo, wheelMat))
    wheel.position.set(wx, 0.6, wz)
    wheel.rotation.x = Math.PI / 2
    group.add(wheel)
    // Hubcap
    const hub = s(new THREE.Mesh(_cyl(0.3, 0.3, 0.05, 6), mat(0xdddddd)))
    hub.position.set(wx, 0.6, wz > 0 ? wz + 0.22 : wz - 0.22)
    hub.rotation.x = Math.PI / 2
    group.add(hub)
  }

  // Headlights
  for (const hz of [-0.9, 0.9]) {
    const hl = s(new THREE.Mesh(_sph(0.2, 6, 5), eMat(0xffffaa, 0.5)))
    hl.position.set(2.55, 1.5, hz)
    group.add(hl)
  }

  const fb = world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(-40, 1.5, 45))
  world.createCollider(RAPIER.ColliderDesc.cuboid(2.8, 1.9, 1.6).setFriction(0.5), fb)

  scene.add(group)
}

// ═══════════════════════════════════════════════════════════════════════
// TOY SOLDIERS (4)
// ═══════════════════════════════════════════════════════════════════════

function _createToySoldiers(scene) {
  const soldiers = [
    { x: -48, z: -10 }, { x: 48, z: 10 },
    { x: 10, z: -48 }, { x: -10, z: 48 },
  ]

  for (const sd of soldiers) {
    const group = new THREE.Group()
    group.position.set(sd.x, 0, sd.z)

    // Body
    const body = s(new THREE.Mesh(_cyl(0.35, 0.3, 1.4, 8), mat(0x2255cc)))
    body.position.y = 0.9
    group.add(body)

    // Head
    const head = s(new THREE.Mesh(_sph(0.3, 6, 6), mat(0xffcc88)))
    head.position.y = 1.9
    group.add(head)

    // Hat
    const hat = s(new THREE.Mesh(_cyl(0.2, 0.32, 0.4, 8), mat(0xff2222)))
    hat.position.y = 2.25
    group.add(hat)

    // Hat brim
    const brim = s(new THREE.Mesh(_cyl(0.35, 0.35, 0.04, 8), mat(0x111111)))
    brim.position.y = 2.05
    group.add(brim)

    // Legs
    for (const lz of [-0.12, 0.12]) {
      const leg = s(new THREE.Mesh(_cyl(0.1, 0.1, 0.5, 6), mat(0x222222)))
      leg.position.set(0, 0.25, lz)
      group.add(leg)
    }

    // Arms
    for (const ax of [-0.4, 0.4]) {
      const arm = s(new THREE.Mesh(_cyl(0.08, 0.08, 0.7, 6), mat(0x2255cc)))
      arm.position.set(ax, 1.0, 0)
      group.add(arm)
    }

    scene.add(group)
  }
}

// ═══════════════════════════════════════════════════════════════════════
// TOY ROBOTS (3)
// ═══════════════════════════════════════════════════════════════════════

function _createToyRobots(scene) {
  const robots = [
    { x: -30, z: -20, color: 0xcccccc },
    { x: 30, z: 20, color: 0xff6644 },
    { x: 0, z: -40, color: 0x44ccff },
  ]

  for (const rb of robots) {
    const group = new THREE.Group()
    group.position.set(rb.x, 0, rb.z)

    // Body
    const body = s(new THREE.Mesh(_box(0.9, 1.2, 0.7), mat(rb.color)))
    body.position.y = 1.2
    group.add(body)

    // Head
    const head = s(new THREE.Mesh(_sph(0.35, 6, 6), mat(rb.color)))
    head.position.y = 2.2
    group.add(head)

    // Antenna
    const antenna = s(new THREE.Mesh(_cyl(0.03, 0.03, 0.4, 4), mat(0x888888)))
    antenna.position.y = 2.6
    group.add(antenna)
    const antennaBall = s(new THREE.Mesh(_sph(0.07, 4, 4), mat(0xff2222)))
    antennaBall.position.y = 2.85
    group.add(antennaBall)

    // Eyes
    for (const ez of [-0.12, 0.12]) {
      const eye = s(new THREE.Mesh(_sph(0.08, 4, 4), eMat(0xff4444)))
      eye.position.set(0.3, 2.25, ez)
      group.add(eye)
    }

    // Arms
    for (const ax of [-0.6, 0.6]) {
      const arm = s(new THREE.Mesh(_cyl(0.12, 0.1, 0.8, 6), mat(0x888888)))
      arm.position.set(ax, 1.1, 0)
      group.add(arm)
      // Hand
      const hand = s(new THREE.Mesh(_sph(0.12, 5, 5), mat(0xaaaaaa)))
      hand.position.set(ax, 0.65, 0)
      group.add(hand)
    }

    // Legs
    for (const lz of [-0.2, 0.2]) {
      const leg = s(new THREE.Mesh(_box(0.25, 0.6, 0.25), mat(0x666666)))
      leg.position.set(0, 0.3, lz)
      group.add(leg)
    }

    scene.add(group)
  }
}

// ═══════════════════════════════════════════════════════════════════════
// JACK IN THE BOX
// ═══════════════════════════════════════════════════════════════════════

function _createJackInTheBox(scene) {
  const group = new THREE.Group()
  group.position.set(0, 0, 35)

  // Box
  const boxMat = mat(0xff4444)
  const box = s(new THREE.Mesh(_box(1.2, 1.0, 1.2), boxMat))
  box.position.y = 0.5
  group.add(box)

  // Stars decoration
  for (let i = 0; i < 4; i++) {
    const star = s(new THREE.Mesh(_box(0.15, 0.15, 0.02), mat(0xffff44)))
    const angle = (i / 4) * Math.PI * 2
    star.position.set(Math.cos(angle) * 0.61, 0.5, Math.sin(angle) * 0.61)
    star.lookAt(0, 0.5, 0)
    group.add(star)
  }

  // Lid (open, tilted back)
  const lid = s(new THREE.Mesh(_box(1.3, 0.08, 1.3), mat(0xcc2222)))
  lid.position.set(0, 1.05, -0.6)
  lid.rotation.x = -0.8
  group.add(lid)

  // Spring
  const spring = s(new THREE.Mesh(_cyl(0.15, 0.15, 1.0, 8), mat(0xdddddd)))
  spring.position.y = 1.5
  group.add(spring)

  // Head on top
  const head = s(new THREE.Mesh(_sph(0.4, 6, 6), mat(0xffcc88)))
  head.position.y = 2.2
  group.add(head)

  // Hat (cone)
  const hat = s(new THREE.Mesh(_cone(0.3, 0.5, 6), mat(0xff44ff)))
  hat.position.y = 2.65
  group.add(hat)

  // Eyes
  for (const ez of [-0.12, 0.12]) {
    const eye = new THREE.Mesh(_sph(0.05, 4, 4), mat(0x111111))
    eye.position.set(0.35, 2.25, ez)
    group.add(eye)
  }

  // Smile
  const smile = new THREE.Mesh(_box(0.2, 0.03, 0.02), mat(0xff2222))
  smile.position.set(0.38, 2.1, 0)
  group.add(smile)

  scene.add(group)
}

// ═══════════════════════════════════════════════════════════════════════
// GIANT DICE (DYNAMIC)
// ═══════════════════════════════════════════════════════════════════════

function _createGiantDice(scene, RAPIER, world, syncList) {
  const dicePos = [
    { x: -20, z: -15 },
    { x: 20, z: 15 },
    { x: 35, z: -45 },
  ]

  for (const dp of dicePos) {
    const size = 1.2
    const hs = size / 2
    const group = new THREE.Group()

    // White cube
    const cube = s(new THREE.Mesh(_box(size, size, size), mat(0xffffff)))
    group.add(cube)

    // Dots (simplified: just on front face)
    const dotGeo = _cyl(0.08, 0.08, 0.02, 6)
    const dotMat = mat(0x111111)
    // Front face (6 dots)
    const dotPositions = [
      [hs + 0.01, 0.25, 0.25], [hs + 0.01, 0.25, -0.25],
      [hs + 0.01, 0, 0.25], [hs + 0.01, 0, -0.25],
      [hs + 0.01, -0.25, 0.25], [hs + 0.01, -0.25, -0.25],
    ]
    for (const [dx, dy, dz] of dotPositions) {
      const dot = new THREE.Mesh(dotGeo, dotMat)
      dot.position.set(dx, dy, dz)
      dot.rotation.z = Math.PI / 2
      group.add(dot)
    }

    // Top face (1 dot)
    const topDot = new THREE.Mesh(dotGeo, dotMat)
    topDot.position.set(0, hs + 0.01, 0)
    group.add(topDot)

    const by = hs + 0.05
    group.position.set(dp.x, by, dp.z)
    scene.add(group)

    const rb = world.createRigidBody(
      RAPIER.RigidBodyDesc.dynamic().setTranslation(dp.x, by, dp.z).setLinearDamping(0.4).setAngularDamping(0.5)
    )
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(hs, hs, hs).setDensity(4.0).setFriction(0.5).setRestitution(0.2), rb
    )
    syncList.push({ mesh: group, body: rb })
  }
}

// ═══════════════════════════════════════════════════════════════════════
// KITE
// ═══════════════════════════════════════════════════════════════════════

function _createKite(scene) {
  const group = new THREE.Group()
  group.position.set(15, 10, 40)

  // Diamond shape
  const kiteGeo = new THREE.BufferGeometry()
  const verts = new Float32Array([
    0, 0.7, 0, -0.45, 0, 0, 0, -0.9, 0,
    0, 0.7, 0, 0, -0.9, 0, 0.45, 0, 0,
  ])
  kiteGeo.setAttribute('position', new THREE.BufferAttribute(verts, 3))
  kiteGeo.computeVertexNormals()
  const kite = s(new THREE.Mesh(kiteGeo, mat(0xff4444, { side: THREE.DoubleSide })))
  group.add(kite)

  // Cross struts
  const strutH = s(new THREE.Mesh(_cyl(0.012, 0.012, 0.9, 4), mat(0x886633)))
  strutH.rotation.z = Math.PI / 2
  group.add(strutH)
  const strutV = s(new THREE.Mesh(_cyl(0.012, 0.012, 1.6, 4), mat(0x886633)))
  strutV.position.y = -0.1
  group.add(strutV)

  // Tail bows
  const tailColors = [0xff4444, 0x4444ff, 0xffff44, 0x44ff44, 0xff44ff]
  for (let i = 0; i < 5; i++) {
    const bow = s(new THREE.Mesh(_box(0.18, 0.05, 0.07), mat(tailColors[i])))
    bow.position.set(0, -1.1 - i * 0.45, 0)
    bow.rotation.z = (i % 2 === 0) ? 0.3 : -0.3
    group.add(bow)
  }

  // String
  const string = new THREE.Mesh(_cyl(0.01, 0.01, 9, 4), mat(0xaaaaaa))
  string.position.set(0, -5.5, 0)
  string.rotation.z = 0.12
  group.add(string)

  group.rotation.set(-0.1, 0.2, 0.1)
  scene.add(group)
}

// ═══════════════════════════════════════════════════════════════════════
// PINWHEELS (4, ANIMATED)
// ═══════════════════════════════════════════════════════════════════════

function _createPinwheels(scene, pinwheelSpins) {
  const pwPos = [
    { x: -18, z: -10 }, { x: 18, z: 10 },
    { x: -8, z: 35 }, { x: 8, z: -35 },
  ]
  const bladeColors = [0xff2222, 0x2222ff, 0xffff22, 0x22ff22]

  for (const pp of pwPos) {
    const group = new THREE.Group()
    group.position.set(pp.x, 0, pp.z)

    // Stick
    const stick = s(new THREE.Mesh(_cyl(0.025, 0.035, 1.3, 6), mat(0x886633)))
    stick.position.y = 0.65
    group.add(stick)

    // Spinning part
    const spin = new THREE.Group()
    spin.position.y = 1.3

    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2
      const bladeGeo = new THREE.BufferGeometry()
      const v = new Float32Array([
        0, 0, 0,
        Math.cos(angle) * 0.35, Math.sin(angle) * 0.35, 0.06,
        Math.cos(angle + 0.55) * 0.28, Math.sin(angle + 0.55) * 0.28, 0,
      ])
      bladeGeo.setAttribute('position', new THREE.BufferAttribute(v, 3))
      bladeGeo.computeVertexNormals()
      const blade = new THREE.Mesh(bladeGeo, mat(bladeColors[i], { side: THREE.DoubleSide }))
      blade.castShadow = true
      spin.add(blade)
    }

    // Center pin
    const pin = s(new THREE.Mesh(_sph(0.035, 4, 4), mat(0xdddddd)))
    spin.add(pin)

    group.add(spin)
    scene.add(group)
    pinwheelSpins.push(spin)
  }
}

// ═══════════════════════════════════════════════════════════════════════
// HOPSCOTCH GRIDS (2)
// ═══════════════════════════════════════════════════════════════════════

function _createHopscotchGrids(scene) {
  const grids = [
    { x: -12, z: 20, ry: 0.3 },
    { x: 12, z: -20, ry: -0.5 },
  ]

  const sqColors = [0xff6666, 0x6666ff, 0x66ff66, 0xffff66, 0xff66ff, 0x66ffff, 0xffaa66, 0xaa66ff]
  const layout = [
    [0, 0], [-0.38, 0.65], [0.38, 0.65], [0, 1.3],
    [-0.38, 1.95], [0.38, 1.95], [0, 2.6], [0, 3.25],
  ]

  for (const gd of grids) {
    const group = new THREE.Group()
    group.position.set(gd.x, 0.02, gd.z)
    group.rotation.y = gd.ry

    layout.forEach(([hx, hz], i) => {
      const sq = new THREE.Mesh(
        new THREE.PlaneGeometry(0.6, 0.6),
        mat(sqColors[i], { transparent: true, opacity: 0.8 })
      )
      sq.rotation.x = -Math.PI / 2
      sq.position.set(hx, 0, hz)
      sq.receiveShadow = true
      group.add(sq)
    })

    scene.add(group)
  }
}

// ═══════════════════════════════════════════════════════════════════════
// TIC-TAC-TOE BOARD
// ═══════════════════════════════════════════════════════════════════════

function _createTicTacToe(scene) {
  const group = new THREE.Group()
  group.position.set(0, 0, -35)

  // Post
  const post = s(new THREE.Mesh(_cyl(0.08, 0.08, 1.5, 6), mat(0x886633)))
  post.position.y = 0.75
  group.add(post)

  // Board
  const board = s(new THREE.Mesh(_box(1.5, 1.5, 0.08), mat(0xffffff)))
  board.position.y = 1.8
  group.add(board)

  // Grid lines (4)
  for (let i = 0; i < 2; i++) {
    const hLine = s(new THREE.Mesh(_box(1.4, 0.04, 0.02), mat(0x222222)))
    hLine.position.set(0, 1.5 + i * 0.5, 0.05)
    group.add(hLine)
    const vLine = s(new THREE.Mesh(_box(0.04, 1.4, 0.02), mat(0x222222)))
    vLine.position.set(-0.25 + i * 0.5, 1.8, 0.05)
    group.add(vLine)
  }

  // Some X and O marks
  const xMat = mat(0xff2222)
  const oMat = mat(0x2222ff)
  // X in top-left
  const x1 = s(new THREE.Mesh(_box(0.3, 0.04, 0.02), xMat))
  x1.position.set(-0.5, 2.3, 0.06)
  x1.rotation.z = 0.785
  group.add(x1)
  const x2 = s(new THREE.Mesh(_box(0.3, 0.04, 0.02), xMat))
  x2.position.set(-0.5, 2.3, 0.06)
  x2.rotation.z = -0.785
  group.add(x2)

  // O in center
  const o1 = s(new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.025, 6, 12), oMat))
  o1.position.set(0, 1.8, 0.06)
  group.add(o1)

  scene.add(group)
}

// ═══════════════════════════════════════════════════════════════════════
// GIANT PENCILS (3)
// ═══════════════════════════════════════════════════════════════════════

function _createGiantPencils(scene) {
  const pencils = [
    { x: -55, z: 0, ry: 0.2 },
    { x: 55, z: 0, ry: -0.3 },
    { x: 0, z: -55, ry: 0.5 },
  ]

  for (const pp of pencils) {
    const group = new THREE.Group()
    group.position.set(pp.x, 0, pp.z)
    group.rotation.y = pp.ry

    // Body (yellow cylinder)
    const body = s(new THREE.Mesh(_cyl(0.2, 0.2, 4.0, 6), mat(0xffdd22)))
    body.position.y = 2.0
    body.rotation.z = 0.25
    group.add(body)

    // Tip (cone)
    const tip = s(new THREE.Mesh(_cone(0.2, 0.5, 6), mat(0xffcc88)))
    tip.position.set(-1.08, 3.96, 0)
    tip.rotation.z = 0.25
    group.add(tip)

    // Lead point
    const lead = s(new THREE.Mesh(_cone(0.06, 0.15, 6), mat(0x333333)))
    lead.position.set(-1.22, 4.2, 0)
    lead.rotation.z = 0.25
    group.add(lead)

    // Eraser
    const eraser = s(new THREE.Mesh(_cyl(0.2, 0.2, 0.3, 6), mat(0xff6688)))
    eraser.position.set(0.98, 0.17, 0)
    eraser.rotation.z = 0.25
    group.add(eraser)

    // Metal band
    const band = s(new THREE.Mesh(_cyl(0.22, 0.22, 0.12, 6), mat(0xdddddd)))
    band.position.set(0.85, 0.28, 0)
    band.rotation.z = 0.25
    group.add(band)

    scene.add(group)
  }
}

// ═══════════════════════════════════════════════════════════════════════
// TOY TRAIN
// ═══════════════════════════════════════════════════════════════════════

function _createToyTrain(scene) {
  const group = new THREE.Group()
  group.position.set(-20, 0, -40)

  const trainColors = [0xff2222, 0x2222ff, 0x22cc22, 0xffff22]

  // Track (simple rail lines on ground)
  for (const tz of [-0.35, 0.35]) {
    const rail = s(new THREE.Mesh(_box(12, 0.05, 0.08), mat(0x888888)))
    rail.position.set(0, 0.03, tz)
    group.add(rail)
  }
  // Ties
  for (let i = 0; i < 12; i++) {
    const tie = s(new THREE.Mesh(_box(0.15, 0.04, 0.9), mat(0x6b4226)))
    tie.position.set(-5.5 + i * 1.0, 0.02, 0)
    group.add(tie)
  }

  // Engine + 3 cars
  for (let c = 0; c < 4; c++) {
    const car = new THREE.Group()
    car.position.set(-4.0 + c * 2.8, 0, 0)

    if (c === 0) {
      // Engine
      const ebody = s(new THREE.Mesh(_box(1.6, 0.8, 0.9), mat(trainColors[0])))
      ebody.position.y = 0.7
      car.add(ebody)

      // Smokestack
      const stack = s(new THREE.Mesh(_cyl(0.12, 0.15, 0.5, 6), mat(0x222222)))
      stack.position.set(0.5, 1.35, 0)
      car.add(stack)

      // Cabin roof
      const roof = s(new THREE.Mesh(_box(0.7, 0.07, 1.0), mat(trainColors[0])))
      roof.position.set(-0.45, 1.35, 0)
      car.add(roof)

      // Front bumper
      const bumper = s(new THREE.Mesh(_box(0.15, 0.3, 0.6), mat(0x222222)))
      bumper.position.set(0.88, 0.45, 0)
      car.add(bumper)
    } else {
      // Cargo car
      const cBody = s(new THREE.Mesh(_box(1.4, 0.6, 0.8), mat(trainColors[c])))
      cBody.position.y = 0.6
      car.add(cBody)

      // Cargo (various items)
      if (c === 1) {
        // Logs
        for (let l = 0; l < 3; l++) {
          const log = s(new THREE.Mesh(_cyl(0.08, 0.08, 0.7, 6), mat(0x6b4226)))
          log.position.set(-0.3 + l * 0.3, 1.0, 0)
          log.rotation.x = Math.PI / 2
          car.add(log)
        }
      } else if (c === 2) {
        // Boxes
        const cbox = s(new THREE.Mesh(_box(0.35, 0.35, 0.35), mat(0xff8800)))
        cbox.position.set(0, 1.1, 0)
        car.add(cbox)
      } else {
        // Coal
        const coal = s(new THREE.Mesh(_sph(0.3, 5, 5), mat(0x333333)))
        coal.position.y = 1.0
        car.add(coal)
      }
    }

    // Wheels (4 per car)
    for (const [wx, wz] of [[0.5, 0.5], [0.5, -0.5], [-0.5, 0.5], [-0.5, -0.5]]) {
      const wheel = s(new THREE.Mesh(_cyl(0.15, 0.15, 0.06, 8), mat(0x222222)))
      wheel.position.set(wx, 0.15, wz)
      wheel.rotation.x = Math.PI / 2
      car.add(wheel)
    }

    // Coupling (between cars)
    if (c > 0) {
      const coupling = s(new THREE.Mesh(_box(0.6, 0.05, 0.05), mat(0x555555)))
      coupling.position.set(-1.0, 0.3, 0)
      car.add(coupling)
    }

    group.add(car)
  }

  scene.add(group)
}

// ═══════════════════════════════════════════════════════════════════════
// BALL PIT (with dynamic balls and breakable wall)
// ═══════════════════════════════════════════════════════════════════════

function _createBallPit(scene, RAPIER, world, syncList) {
  const cx = 45
  const cz = 45
  const wallMat = mat(0xff4444)

  // Walls (3 fixed, 1 dynamic/breakable)
  const wallDefs = [
    { x: cx, z: cz - 3, hw: 3, hd: 0.15, fixed: true },
    { x: cx - 3, z: cz, hw: 0.15, hd: 3, fixed: true },
    { x: cx + 3, z: cz, hw: 0.15, hd: 3, fixed: true },
    // Front wall: dynamic (breakable!)
    { x: cx, z: cz + 3, hw: 3, hd: 0.15, fixed: false },
  ]

  for (const wd of wallDefs) {
    const wallMesh = s(new THREE.Mesh(_box(wd.hw * 2, 0.8, wd.hd * 2), wallMat))
    wallMesh.position.set(wd.x, 0.4, wd.z)
    scene.add(wallMesh)

    if (wd.fixed) {
      const fb = world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(wd.x, 0.4, wd.z))
      world.createCollider(RAPIER.ColliderDesc.cuboid(wd.hw, 0.4, wd.hd).setFriction(0.4), fb)
    } else {
      // Dynamic breakable wall - 3 segments
      scene.remove(wallMesh)
      for (let i = 0; i < 3; i++) {
        const seg = s(new THREE.Mesh(_box(1.8, 0.8, 0.25), mat(0xff6666)))
        const sx = cx - 1.8 + i * 1.8
        seg.position.set(sx, 0.4, wd.z)
        scene.add(seg)

        const rb = world.createRigidBody(
          RAPIER.RigidBodyDesc.dynamic().setTranslation(sx, 0.4, wd.z).setLinearDamping(0.3).setAngularDamping(0.4)
        )
        world.createCollider(
          RAPIER.ColliderDesc.cuboid(0.9, 0.4, 0.125).setDensity(5.0).setFriction(0.5).setRestitution(0.1), rb
        )
        syncList.push({ mesh: seg, body: rb })
      }
    }
  }

  // Ball pit balls (20 dynamic small spheres)
  const ballColors = [0xff2222, 0x2222ff, 0xffff22, 0x22cc22, 0xff8800, 0xcc22cc, 0xff6688, 0x22dddd]
  for (let i = 0; i < 20; i++) {
    const radius = 0.2
    const bx = cx + (Math.random() - 0.5) * 4.0
    const by = radius + 0.1 + Math.random() * 0.8
    const bz = cz + (Math.random() - 0.5) * 4.0
    const ball = s(new THREE.Mesh(_sph(radius, 6, 5), mat(ballColors[i % ballColors.length])))
    ball.position.set(bx, by, bz)
    scene.add(ball)

    const rb = world.createRigidBody(
      RAPIER.RigidBodyDesc.dynamic().setTranslation(bx, by, bz).setLinearDamping(0.3).setAngularDamping(0.3)
    )
    world.createCollider(
      RAPIER.ColliderDesc.ball(radius).setDensity(1.0).setFriction(0.3).setRestitution(0.7), rb
    )
    syncList.push({ mesh: ball, body: rb })
  }
}

// ═══════════════════════════════════════════════════════════════════════
// HEDGE MAZE
// ═══════════════════════════════════════════════════════════════════════

function _createHedgeMaze(scene, RAPIER, world) {
  const mx = -45
  const mz = -45
  const hedgeMat = mat(0x2d6e2d)
  const hedgeH = 0.7

  // Maze walls (wide enough for car ~1 wide)
  const walls = [
    // Outer boundary
    { x: 0, z: -5, w: 10, d: 0.3 },
    { x: 0, z: 5, w: 10, d: 0.3 },
    { x: -5, z: 0, w: 0.3, d: 10 },
    { x: 5, z: 0, w: 0.3, d: 10 },
    // Inner walls
    { x: -2, z: -3, w: 4, d: 0.3 },
    { x: 2, z: -1, w: 0.3, d: 4 },
    { x: -1, z: 2, w: 4, d: 0.3 },
    { x: -3, z: 0, w: 0.3, d: 3 },
    { x: 3, z: 3, w: 0.3, d: 2 },
  ]

  for (const hw of walls) {
    const wallMesh = s(new THREE.Mesh(_box(hw.w, hedgeH, hw.d), hedgeMat))
    wallMesh.position.set(mx + hw.x, hedgeH / 2, mz + hw.z)
    scene.add(wallMesh)

    // Fixed collider
    const fb = world.createRigidBody(
      RAPIER.RigidBodyDesc.fixed().setTranslation(mx + hw.x, hedgeH / 2, mz + hw.z)
    )
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(hw.w / 2, hedgeH / 2, hw.d / 2).setFriction(0.5), fb
    )
  }

  // Entrance gap (remove part of south wall)
  // The south wall at z:5 has a gap already since it's w:10 centered at x:0
  // Add opening indicator: two small bushes at entrance
  for (const side of [-1, 1]) {
    const bush = s(new THREE.Mesh(_sph(0.35, 6, 5), mat(0x44aa44)))
    bush.position.set(mx + side * 0.8, 0.35, mz + 5.3)
    scene.add(bush)
  }
}

// ═══════════════════════════════════════════════════════════════════════
// LOLLIPOP TREES (16)
// ═══════════════════════════════════════════════════════════════════════

function _createLollipopTrees(scene) {
  const treeData = [
    { x: -25, z: -10, color: 0xff4444 }, { x: 25, z: 10, color: 0xff8800 },
    { x: -10, z: 25, color: 0xffff44 }, { x: 10, z: -25, color: 0xff4488 },
    { x: -35, z: 20, color: 0xff6644 }, { x: 35, z: -20, color: 0xffaa44 },
    { x: -20, z: 40, color: 0xff2222 }, { x: 20, z: -40, color: 0xffcc44 },
    { x: -50, z: -30, color: 0xff8844 }, { x: 50, z: 30, color: 0xff4444 },
    { x: -40, z: 10, color: 0xffaa00 }, { x: 40, z: -10, color: 0xff6600 },
    { x: -15, z: -45, color: 0xff2244 }, { x: 15, z: 45, color: 0xffcc00 },
    { x: -55, z: 15, color: 0xff8866 }, { x: 55, z: -15, color: 0xff4422 },
  ]

  for (const td of treeData) {
    const group = new THREE.Group()
    group.position.set(td.x, 0, td.z)

    const trunkH = 2.0 + Math.random() * 1.0
    // Thin straight trunk
    const trunk = s(new THREE.Mesh(_cyl(0.1, 0.12, trunkH, 6), mat(0x8b6914)))
    trunk.position.y = trunkH / 2
    group.add(trunk)

    // Sphere canopy (bright color)
    const canopy = s(new THREE.Mesh(_sph(0.9 + Math.random() * 0.3, 8, 6), mat(td.color)))
    canopy.position.y = trunkH + 0.7
    group.add(canopy)

    scene.add(group)
  }
}

// ═══════════════════════════════════════════════════════════════════════
// ROUND BUSHES (12)
// ═══════════════════════════════════════════════════════════════════════

function _createRoundBushes(scene) {
  const bushPos = [
    [-8, -30], [8, 30], [-22, -8], [22, 8],
    [-35, -15], [35, 15], [-12, 40], [12, -40],
    [-48, 5], [48, -5], [-30, 45], [30, -45],
  ]

  for (const [bx, bz] of bushPos) {
    const radius = 0.4 + Math.random() * 0.3
    const bush = s(new THREE.Mesh(_sph(radius, 6, 5), mat(0x44bb44)))
    bush.position.set(bx, radius * 0.6, bz)
    scene.add(bush)

    // Sub-sphere
    const sub = s(new THREE.Mesh(_sph(radius * 0.6, 5, 4), mat(0x3da83d)))
    sub.position.set(bx + radius * 0.4, radius * 0.5, bz + radius * 0.3)
    scene.add(sub)
  }
}

// ═══════════════════════════════════════════════════════════════════════
// FLOWER ARRANGEMENTS (8)
// ═══════════════════════════════════════════════════════════════════════

function _createFlowerArrangements(scene) {
  const flowerPos = [
    { x: -5, z: -12, colors: [0xff4488, 0xff8844, 0xffdd44] },
    { x: 5, z: 12, colors: [0xaa44ff, 0x44aaff, 0x44ffaa] },
    { x: -18, z: 18, colors: [0xff4444, 0xffff44, 0xff88ff] },
    { x: 18, z: -18, colors: [0x44ff44, 0x4488ff, 0xff8844] },
    { x: -30, z: -35, colors: [0xff2288, 0x88ff22, 0x2288ff] },
    { x: 30, z: 35, colors: [0xffaa44, 0x44ffaa, 0xaa44ff] },
    { x: -42, z: 30, colors: [0xff4444, 0x44ff44, 0x4444ff] },
    { x: 42, z: -30, colors: [0xffff22, 0xff22ff, 0x22ffff] },
  ]

  for (const fp of flowerPos) {
    const group = new THREE.Group()
    group.position.set(fp.x, 0, fp.z)

    // 4-5 flowers per arrangement
    for (let f = 0; f < 5; f++) {
      const fx = (Math.random() - 0.5) * 0.8
      const fz = (Math.random() - 0.5) * 0.8
      const stemH = 0.3 + Math.random() * 0.3

      // Thick stem
      const stem = s(new THREE.Mesh(_cyl(0.03, 0.03, stemH, 4), mat(0x339933)))
      stem.position.set(fx, stemH / 2, fz)
      group.add(stem)

      // Big colorful sphere flower head
      const flower = s(new THREE.Mesh(_sph(0.12 + Math.random() * 0.08, 6, 5),
        mat(fp.colors[f % fp.colors.length])))
      flower.position.set(fx, stemH + 0.1, fz)
      group.add(flower)

      // Leaf
      const leaf = s(new THREE.Mesh(_sph(0.06, 4, 3), mat(0x44aa44)))
      leaf.position.set(fx + 0.06, stemH * 0.5, fz)
      leaf.scale.set(1.5, 0.5, 1)
      group.add(leaf)
    }

    scene.add(group)
  }
}

// ═══════════════════════════════════════════════════════════════════════
// PLAYGROUND BALLS (8 DYNAMIC)
// ═══════════════════════════════════════════════════════════════════════

function _createPlaygroundBalls(scene, RAPIER, world, syncList) {
  const ballData = [
    { x: -6, z: 5, color: 0xff2222 },
    { x: 6, z: -5, color: 0x2222ff },
    { x: -3, z: -8, color: 0xffff22 },
    { x: 3, z: 8, color: 0x22cc22 },
    { x: -12, z: 12, color: 0xff8800 },
    { x: 12, z: -12, color: 0xcc22cc },
    { x: -18, z: -18, color: 0xff4488 },
    { x: 18, z: 18, color: 0x44dddd },
  ]
  const radius = 0.35

  for (const bd of ballData) {
    const by = radius + 0.1
    const ball = s(new THREE.Mesh(_sph(radius, 8, 6), mat(bd.color)))
    ball.position.set(bd.x, by, bd.z)
    scene.add(ball)

    const rb = world.createRigidBody(
      RAPIER.RigidBodyDesc.dynamic().setTranslation(bd.x, by, bd.z).setLinearDamping(0.3).setAngularDamping(0.3)
    )
    world.createCollider(
      RAPIER.ColliderDesc.ball(radius).setDensity(1.5).setFriction(0.4).setRestitution(0.7), rb
    )
    syncList.push({ mesh: ball, body: rb })
  }
}

// ═══════════════════════════════════════════════════════════════════════
// BOWLING PINS (6 DYNAMIC)
// ═══════════════════════════════════════════════════════════════════════

function _createBowlingPins(scene, RAPIER, world, syncList) {
  // Triangle formation
  const cx = 30
  const cz = -25
  const pinPositions = [
    [0, 0], [-0.4, 0.7], [0.4, 0.7],
    [-0.8, 1.4], [0, 1.4], [0.8, 1.4],
  ]

  for (const [px, pz] of pinPositions) {
    const group = new THREE.Group()

    // Pin body (cylinder with sphere top)
    const body = s(new THREE.Mesh(_cyl(0.1, 0.15, 0.6, 6), mat(0xffffff)))
    group.add(body)

    // Neck
    const neck = s(new THREE.Mesh(_cyl(0.06, 0.1, 0.2, 6), mat(0xffffff)))
    neck.position.y = 0.4
    group.add(neck)

    // Head
    const head = s(new THREE.Mesh(_sph(0.08, 6, 5), mat(0xffffff)))
    head.position.y = 0.55
    group.add(head)

    // Red stripe
    const stripe = s(new THREE.Mesh(_cyl(0.12, 0.12, 0.06, 6), mat(0xff2222)))
    stripe.position.y = 0.15
    group.add(stripe)

    const bx = cx + px
    const by = 0.35
    const bz = cz + pz
    group.position.set(bx, by, bz)
    scene.add(group)

    const rb = world.createRigidBody(
      RAPIER.RigidBodyDesc.dynamic().setTranslation(bx, by, bz).setLinearDamping(0.3).setAngularDamping(0.4)
    )
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(0.1, 0.3, 0.1).setDensity(3.0).setFriction(0.5).setRestitution(0.15), rb
    )
    syncList.push({ mesh: group, body: rb })
  }
}

// ═══════════════════════════════════════════════════════════════════════
// DYNAMIC TOY CARS (4)
// ═══════════════════════════════════════════════════════════════════════

function _createDynamicToyCars(scene, RAPIER, world, syncList) {
  const carData = [
    { x: -15, z: -5, color: 0xff4444, ry: 0.5 },
    { x: 15, z: 5, color: 0x4444ff, ry: -0.3 },
    { x: -5, z: 15, color: 0x44cc44, ry: 1.0 },
    { x: 5, z: -15, color: 0xffaa00, ry: -0.8 },
  ]

  for (const cd of carData) {
    const group = new THREE.Group()

    // Body
    const body = s(new THREE.Mesh(_box(0.55, 0.22, 0.35), mat(cd.color)))
    group.add(body)

    // Cabin
    const cabin = s(new THREE.Mesh(_box(0.28, 0.14, 0.3), mat(cd.color)))
    cabin.position.set(-0.03, 0.18, 0)
    group.add(cabin)

    // Wheels
    const wheelGeo = _cyl(0.07, 0.07, 0.05, 6)
    const wheelMat = mat(0x222222)
    for (const [wx, wy, wz] of [[0.2, -0.09, 0.2], [0.2, -0.09, -0.2], [-0.2, -0.09, 0.2], [-0.2, -0.09, -0.2]]) {
      const wheel = s(new THREE.Mesh(wheelGeo, wheelMat))
      wheel.position.set(wx, wy, wz)
      wheel.rotation.x = Math.PI / 2
      group.add(wheel)
    }

    // Windshield
    const wind = new THREE.Mesh(_box(0.02, 0.12, 0.22), mat(0x88bbdd, { transparent: true, opacity: 0.5 }))
    wind.position.set(0.13, 0.18, 0)
    group.add(wind)

    const by = 0.16
    group.position.set(cd.x, by, cd.z)
    group.rotation.y = cd.ry
    scene.add(group)

    const rb = world.createRigidBody(
      RAPIER.RigidBodyDesc.dynamic().setTranslation(cd.x, by, cd.z).setLinearDamping(0.5).setAngularDamping(0.5)
    )
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(0.28, 0.16, 0.18).setDensity(2.5).setFriction(0.5).setRestitution(0.2), rb
    )
    syncList.push({ mesh: group, body: rb })
  }
}
