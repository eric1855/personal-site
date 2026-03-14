/**
 * City World — Dense urban low-poly city filling ~120x120 units centered on origin.
 *
 * Portfolio buildings at (0,-20), (20,0), (0,20), (-20,0) are created elsewhere.
 * This file builds everything around them: road grid, shops, street furniture,
 * parked vehicles, vegetation, dynamic pushable objects, bridge, water tower,
 * billboards, power lines, parking lot, and more.
 *
 * Export: createWorld(scene, RAPIER, world) => { syncList, update(dt) }
 */
import * as THREE from 'three'

// ── Shared helpers ─────────────────────────────────────────────────────────
function mat(color, opts = {}) {
  return new THREE.MeshStandardMaterial({ color, flatShading: true, ...opts })
}

function emissive(color, intensity = 0.8) {
  return new THREE.MeshStandardMaterial({
    color, emissive: color, emissiveIntensity: intensity, flatShading: true,
  })
}

function shadow(mesh) {
  mesh.castShadow = true
  return mesh
}

function shadowRecv(mesh) {
  mesh.castShadow = true
  mesh.receiveShadow = true
  return mesh
}

function fixedBody(RAPIER, world, x, y, z) {
  return world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(x, y, z))
}

function fixedBodyRot(RAPIER, world, x, y, z, rotY) {
  const ha = rotY * 0.5
  return world.createRigidBody(
    RAPIER.RigidBodyDesc.fixed()
      .setTranslation(x, y, z)
      .setRotation({ x: 0, y: Math.sin(ha), z: 0, w: Math.cos(ha) })
  )
}

function dynamicBody(RAPIER, world, x, y, z, linDamp = 0.2, angDamp = 0.3) {
  return world.createRigidBody(
    RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(x, y, z)
      .setLinearDamping(linDamp)
      .setAngularDamping(angDamp)
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════════════════════

export function createWorld(scene, RAPIER, world) {
  const syncList = []

  // Shared materials
  const roadMat     = mat('#3a3a3a')
  const sidewalkMat = mat('#b0a898')
  const whiteMat    = mat('#eeeeee')
  const yellowMat   = mat('#e8c840')
  const curbMat     = mat('#888888')
  const poleMat     = mat('#555555')
  const woodMat     = mat('#8b6914')
  const redMat      = mat('#cc2222')
  const blueMat     = mat('#2255aa')
  const greenMat    = mat('#2d8c4e')
  const darkMat     = mat('#333333')
  const orangeMat   = mat('#ff6600')
  const glassMat    = mat('#88bbdd', { transparent: true, opacity: 0.4 })
  const lampGlowMat = emissive('#ffee88')
  const concreteMat = mat('#a0a0a0')
  const brickMat    = mat('#9e5a42')

  // ── GROUND + PHYSICS ─────────────────────────────────────────────
  createGround(scene, RAPIER, world, sidewalkMat)
  createBoundaryWalls(RAPIER, world)

  // ── ROAD NETWORK ─────────────────────────────────────────────────
  createRoadGrid(scene, roadMat, whiteMat, yellowMat, curbMat)
  createMainBoulevard(scene, roadMat, whiteMat, yellowMat, curbMat)
  createRoundabout(scene, roadMat, yellowMat, greenMat)
  createCrosswalks(scene, whiteMat)
  createManholes(scene)

  // ── BUILDINGS / SHOPS ────────────────────────────────────────────
  createShopsAndBuildings(scene, RAPIER, world, glassMat)

  // ── STREET FURNITURE ─────────────────────────────────────────────
  createStreetLamps(scene, poleMat, lampGlowMat)
  createBenches(scene, woodMat, poleMat)
  createFireHydrants(scene, redMat)
  createMailboxes(scene, blueMat, poleMat)
  createTrashCans(scene, darkMat, poleMat)
  createBusShelters(scene, poleMat, glassMat, woodMat, RAPIER, world)
  createPhoneBooths(scene, poleMat, glassMat, RAPIER, world)
  createNewspaperStands(scene, darkMat, glassMat)

  // ── PARKED VEHICLES ──────────────────────────────────────────────
  createParkedVehicles(scene, RAPIER, world)

  // ── VEGETATION ───────────────────────────────────────────────────
  createTrees(scene)
  createBushes(scene, greenMat)
  createFlowerBeds(scene)
  createPark(scene, RAPIER, world, woodMat, poleMat, greenMat, concreteMat)

  // ── ROAD SIGNS ───────────────────────────────────────────────────
  createStopSigns(scene, redMat, whiteMat, poleMat, RAPIER, world)
  createRoadSigns(scene, poleMat, RAPIER, world)

  // ── DYNAMIC / INTERACTIVE ────────────────────────────────────────
  createTrafficCones(scene, orangeMat, RAPIER, world, syncList)
  createBarriers(scene, RAPIER, world, syncList)
  createGarbageBins(scene, RAPIER, world, syncList)
  createCardboardBoxes(scene, RAPIER, world, syncList)
  createShoppingCarts(scene, RAPIER, world, syncList)
  createBowlingPins(scene, RAPIER, world, syncList)

  // ── LARGE STRUCTURES ─────────────────────────────────────────────
  createParkingLot(scene, roadMat, whiteMat, yellowMat)
  createBridge(scene, RAPIER, world, concreteMat, poleMat)
  createWaterTower(scene, RAPIER, world, poleMat, concreteMat)
  createBillboards(scene, RAPIER, world, poleMat)
  createPowerLines(scene, poleMat)

  // Timer for animations
  let time = 0

  return {
    syncList,
    update(dt) {
      time += dt
      // Subtle lamp flicker
      const flicker = 0.7 + Math.sin(time * 8.3) * 0.05 + Math.sin(time * 13.7) * 0.03
      lampGlowMat.emissiveIntensity = flicker
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// GROUND + BOUNDARY WALLS
// ═══════════════════════════════════════════════════════════════════════════

function createGround(scene, RAPIER, world, sidewalkMat) {
  // Visual ground plane
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(140, 140),
    sidewalkMat
  )
  ground.rotation.x = -Math.PI / 2
  ground.receiveShadow = true
  scene.add(ground)

  // Rapier ground collider
  const gd = RAPIER.RigidBodyDesc.fixed().setTranslation(0, -0.5, 0)
  const gb = world.createRigidBody(gd)
  world.createCollider(
    RAPIER.ColliderDesc.cuboid(200, 0.5, 200).setFriction(0.5),
    gb
  )
}

function createBoundaryWalls(RAPIER, world) {
  const walls = [
    { x:  62, y: 5, z: 0,  hx: 2, hy: 5, hz: 64 },
    { x: -62, y: 5, z: 0,  hx: 2, hy: 5, hz: 64 },
    { x: 0,  y: 5, z:  62, hx: 64, hy: 5, hz: 2 },
    { x: 0,  y: 5, z: -62, hx: 64, hy: 5, hz: 2 },
  ]
  for (const w of walls) {
    const wd = RAPIER.RigidBodyDesc.fixed().setTranslation(w.x, w.y, w.z)
    const wb = world.createRigidBody(wd)
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(w.hx, w.hy, w.hz).setFriction(0.3),
      wb
    )
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ROAD GRID
// ═══════════════════════════════════════════════════════════════════════════

function createRoadGrid(scene, roadMat, whiteMat, yellowMat, curbMat) {
  const RY = 0.01
  const RW = 5 // road width

  // North-South roads at x = 0, -20, 20, -40, 40
  const nsRoads = [0, -20, 20, -40, 40]
  for (const x of nsRoads) {
    const road = new THREE.Mesh(new THREE.PlaneGeometry(RW, 120), roadMat)
    road.rotation.x = -Math.PI / 2
    road.position.set(x, RY, 0)
    road.receiveShadow = true
    scene.add(road)

    // Yellow edge lines
    for (const side of [-1, 1]) {
      const edge = new THREE.Mesh(new THREE.PlaneGeometry(0.08, 120), yellowMat)
      edge.rotation.x = -Math.PI / 2
      edge.position.set(x + side * (RW / 2 - 0.1), RY + 0.002, 0)
      edge.receiveShadow = true
      scene.add(edge)
    }

    // White dashed center line
    for (let z = -58; z <= 58; z += 3) {
      const dash = new THREE.Mesh(new THREE.PlaneGeometry(0.12, 1.5), whiteMat)
      dash.rotation.x = -Math.PI / 2
      dash.position.set(x, RY + 0.002, z)
      dash.receiveShadow = true
      scene.add(dash)
    }

    // Curb stones
    for (const side of [-1, 1]) {
      const curb = new THREE.Mesh(
        new THREE.BoxGeometry(0.15, 0.1, 120), curbMat
      )
      curb.position.set(x + side * (RW / 2 + 0.075), 0.05, 0)
      curb.receiveShadow = true
      scene.add(curb)
    }
  }

  // East-West roads at z = 0, -20, 20, -40, 40
  const ewRoads = [0, -20, 20, -40, 40]
  for (const z of ewRoads) {
    const road = new THREE.Mesh(new THREE.PlaneGeometry(120, RW), roadMat)
    road.rotation.x = -Math.PI / 2
    road.position.set(0, RY + 0.001, z)
    road.receiveShadow = true
    scene.add(road)

    for (const side of [-1, 1]) {
      const edge = new THREE.Mesh(new THREE.PlaneGeometry(120, 0.08), yellowMat)
      edge.rotation.x = -Math.PI / 2
      edge.position.set(0, RY + 0.003, z + side * (RW / 2 - 0.1))
      edge.receiveShadow = true
      scene.add(edge)
    }

    for (let x = -58; x <= 58; x += 3) {
      const dash = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 0.12), whiteMat)
      dash.rotation.x = -Math.PI / 2
      dash.position.set(x, RY + 0.003, z)
      dash.receiveShadow = true
      scene.add(dash)
    }

    for (const side of [-1, 1]) {
      const curb = new THREE.Mesh(
        new THREE.BoxGeometry(120, 0.1, 0.15), curbMat
      )
      curb.position.set(0, 0.05, z + side * (RW / 2 + 0.075))
      curb.receiveShadow = true
      scene.add(curb)
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN BOULEVARD — wider road diagonally from NW to SE
// ═══════════════════════════════════════════════════════════════════════════

function createMainBoulevard(scene, roadMat, whiteMat, yellowMat, curbMat) {
  // Diagonal boulevard from (-55, -55) to (55, 55) — wider road
  const BW = 7
  const diag = Math.sqrt(2)
  const len = 120 * diag

  const blvd = new THREE.Mesh(new THREE.PlaneGeometry(BW, len), roadMat)
  blvd.rotation.x = -Math.PI / 2
  blvd.rotation.z = Math.PI / 4
  blvd.position.set(0, 0.012, 0)
  blvd.receiveShadow = true
  scene.add(blvd)

  // Edge lines
  for (const side of [-1, 1]) {
    const edge = new THREE.Mesh(new THREE.PlaneGeometry(0.1, len), yellowMat)
    edge.rotation.x = -Math.PI / 2
    edge.rotation.z = Math.PI / 4
    // Offset perpendicular to the diagonal
    const perpX = -Math.sin(Math.PI / 4) * side * (BW / 2 - 0.15)
    const perpZ = Math.cos(Math.PI / 4) * side * (BW / 2 - 0.15)
    edge.position.set(perpX, 0.014, perpZ)
    edge.receiveShadow = true
    scene.add(edge)
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ROUNDABOUT at (-30, -30)
// ═══════════════════════════════════════════════════════════════════════════

function createRoundabout(scene, roadMat, yellowMat, greenMat) {
  const CX = -30, CZ = -30
  const RY = 0.012

  // Road ring
  const ring = new THREE.Mesh(new THREE.RingGeometry(3, 6, 24), roadMat)
  ring.rotation.x = -Math.PI / 2
  ring.position.set(CX, RY, CZ)
  ring.receiveShadow = true
  scene.add(ring)

  // Yellow inner/outer circles
  const inner = new THREE.Mesh(new THREE.RingGeometry(2.8, 3.1, 24), yellowMat)
  inner.rotation.x = -Math.PI / 2
  inner.position.set(CX, RY + 0.002, CZ)
  scene.add(inner)

  const outer = new THREE.Mesh(new THREE.RingGeometry(5.8, 6.1, 24), yellowMat)
  outer.rotation.x = -Math.PI / 2
  outer.position.set(CX, RY + 0.002, CZ)
  scene.add(outer)

  // Green island
  const island = new THREE.Mesh(new THREE.CircleGeometry(2.7, 16), greenMat)
  island.rotation.x = -Math.PI / 2
  island.position.set(CX, 0.04, CZ)
  island.receiveShadow = true
  scene.add(island)

  // Central decorative column
  const col = shadow(new THREE.Mesh(
    new THREE.CylinderGeometry(0.3, 0.4, 1.5, 8),
    mat('#aaaaaa')
  ))
  col.position.set(CX, 0.75, CZ)
  scene.add(col)

  // Small tree on island
  const trunk = shadow(new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.12, 1.2, 5),
    mat('#6b4c2a')
  ))
  trunk.position.set(CX + 1, 0.6, CZ)
  scene.add(trunk)

  const canopy = shadow(new THREE.Mesh(
    new THREE.SphereGeometry(0.7, 7, 5),
    mat('#2d8c4e')
  ))
  canopy.position.set(CX + 1, 1.5, CZ)
  scene.add(canopy)
}

// ═══════════════════════════════════════════════════════════════════════════
// CROSSWALKS at key intersections
// ═══════════════════════════════════════════════════════════════════════════

function createCrosswalks(scene, whiteMat) {
  const RY = 0.015
  const STRIPE_W = 0.4
  const GAP = 0.15
  const COUNT = 10

  // Crosswalks near portfolio buildings + at major intersections
  const crosswalks = [
    // Near About (0,-20) — EW stripes across NS road
    { cx: 0, cz: -17, alongX: true },
    // Near Projects (20,0) — NS stripes across EW road
    { cx: 17, cz: 0, alongX: false },
    // Near Contact (0,20) — EW stripes across NS road
    { cx: 0, cz: 17, alongX: true },
    // Near Experience (-20,0) — NS stripes across EW road
    { cx: -17, cz: 0, alongX: false },
    // At (20, 20) intersection
    { cx: 20, cz: 17, alongX: true },
    { cx: 17, cz: 20, alongX: false },
    // At (-20, -20) intersection
    { cx: -20, cz: -17, alongX: true },
    { cx: -17, cz: -20, alongX: false },
    // At (40, 0) intersection
    { cx: 37, cz: 0, alongX: false },
    // At (0, 40) intersection
    { cx: 0, cz: 37, alongX: true },
    // At (-40, 0)
    { cx: -37, cz: 0, alongX: false },
    // At (0, -40)
    { cx: 0, cz: -37, alongX: true },
  ]

  for (const cw of crosswalks) {
    for (let i = 0; i < COUNT; i++) {
      let geo, x, z
      if (cw.alongX) {
        geo = new THREE.PlaneGeometry(STRIPE_W, 0.08)
        x = cw.cx + (i - (COUNT - 1) / 2) * (STRIPE_W + GAP)
        z = cw.cz
      } else {
        geo = new THREE.PlaneGeometry(0.08, STRIPE_W)
        x = cw.cx
        z = cw.cz + (i - (COUNT - 1) / 2) * (STRIPE_W + GAP)
      }
      const stripe = new THREE.Mesh(geo, whiteMat)
      stripe.rotation.x = -Math.PI / 2
      stripe.position.set(x, RY, z)
      stripe.receiveShadow = true
      scene.add(stripe)
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// MANHOLE COVERS
// ═══════════════════════════════════════════════════════════════════════════

function createManholes(scene) {
  const manholeMat = mat('#2a2a2a')
  const crossMat = mat('#444444')
  const geo = new THREE.CircleGeometry(0.35, 8)

  const positions = [
    [0, -8], [0, 8], [8, 0], [-8, 0],
    [20, -8], [-20, 8], [20, 12], [-20, -12],
    [40, 5], [-40, -5], [0, -35], [0, 35],
    [-30, -30], [30, 30], [10, 40], [-10, -40],
  ]

  for (const [x, z] of positions) {
    const cover = new THREE.Mesh(geo, manholeMat)
    cover.rotation.x = -Math.PI / 2
    cover.position.set(x, 0.015, z)
    cover.receiveShadow = true
    scene.add(cover)

    const cH = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.04), crossMat)
    cH.rotation.x = -Math.PI / 2
    cH.position.set(x, 0.016, z)
    scene.add(cH)

    const cV = new THREE.Mesh(new THREE.PlaneGeometry(0.04, 0.5), crossMat)
    cV.rotation.x = -Math.PI / 2
    cV.position.set(x, 0.016, z)
    scene.add(cV)
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// SHOPS AND BUILDINGS (12 scattered buildings, different from portfolio)
// ═══════════════════════════════════════════════════════════════════════════

function createShopsAndBuildings(scene, RAPIER, world, glassMat) {
  const buildings = [
    // NE quadrant
    { x: 32, z: -32, w: 5, h: 6, d: 4, color: '#8c6b50', windows: true },
    { x: 42, z: -12, w: 4, h: 4.5, d: 3.5, color: '#6b8c9e', windows: true },
    { x: 35, z: 12, w: 5.5, h: 5, d: 4.5, color: '#9e7b5e', windows: true },
    // NW quadrant
    { x: -32, z: -35, w: 4.5, h: 7, d: 4, color: '#7a5c3e', windows: true },
    { x: -42, z: -15, w: 4, h: 3.5, d: 3.5, color: '#5e8c7a', windows: true },
    { x: -35, z: 12, w: 5, h: 5.5, d: 4, color: '#8c5e6b', windows: true },
    // SE quadrant
    { x: 32, z: 32, w: 5, h: 4, d: 4, color: '#6b7a8c', windows: true },
    { x: 45, z: 30, w: 3.5, h: 8, d: 3, color: '#5e6b8c', windows: true },
    // SW quadrant
    { x: -32, z: 32, w: 4.5, h: 5, d: 3.5, color: '#8c7a5e', windows: true },
    { x: -45, z: 28, w: 4, h: 6, d: 3.5, color: '#5e8c5e', windows: true },
    // Far edges
    { x: 10, z: -45, w: 5, h: 5.5, d: 4, color: '#7a8c5e', windows: true },
    { x: -10, z: 45, w: 4.5, h: 4, d: 4, color: '#8c5e8c', windows: true },
  ]

  for (const b of buildings) {
    const group = new THREE.Group()
    group.position.set(b.x, 0, b.z)

    // Main body
    const body = shadowRecv(new THREE.Mesh(
      new THREE.BoxGeometry(b.w, b.h, b.d),
      mat(b.color)
    ))
    body.position.y = b.h / 2
    group.add(body)

    // Roof ledge
    const ledge = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(b.w + 0.3, 0.15, b.d + 0.3),
      mat('#666666')
    ))
    ledge.position.y = b.h + 0.075
    group.add(ledge)

    // Windows (darker rectangles on front face)
    if (b.windows) {
      const windowMat = mat('#2a3a4a')
      const floors = Math.floor(b.h / 1.5)
      const cols = Math.floor(b.w / 1.2)
      for (let f = 0; f < floors; f++) {
        for (let c = 0; c < cols; c++) {
          const wx = (c - (cols - 1) / 2) * 1.1
          const wy = 1.2 + f * 1.4
          if (wy > b.h - 0.5) continue
          const win = new THREE.Mesh(
            new THREE.PlaneGeometry(0.5, 0.7),
            windowMat
          )
          win.position.set(wx, wy, b.d / 2 + 0.01)
          group.add(win)

          // Back windows too
          const winB = new THREE.Mesh(
            new THREE.PlaneGeometry(0.5, 0.7),
            windowMat
          )
          winB.rotation.y = Math.PI
          winB.position.set(wx, wy, -b.d / 2 - 0.01)
          group.add(winB)
        }
      }

      // Door on front
      const door = new THREE.Mesh(
        new THREE.PlaneGeometry(0.8, 1.4),
        mat('#3a2a1a')
      )
      door.position.set(0, 0.7, b.d / 2 + 0.01)
      group.add(door)
    }

    scene.add(group)

    // Fixed collider
    const rb = fixedBody(RAPIER, world, b.x, b.h / 2, b.z)
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(b.w / 2, b.h / 2, b.d / 2).setFriction(0.5),
      rb
    )
  }

  // ── Church with steeple at (42, -35) ─────────────────────
  {
    const cx = 42, cz = -35
    const group = new THREE.Group()
    group.position.set(cx, 0, cz)

    // Church body
    const body = shadowRecv(new THREE.Mesh(
      new THREE.BoxGeometry(5, 5, 6), mat('#e8dcc8')
    ))
    body.position.y = 2.5
    group.add(body)

    // Steeple base
    const steepleBase = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 3, 1.5), mat('#d4c8b4')
    ))
    steepleBase.position.y = 6.5
    group.add(steepleBase)

    // Steeple cone
    const steeple = shadow(new THREE.Mesh(
      new THREE.ConeGeometry(1.2, 4, 6), mat('#5a5a5a')
    ))
    steeple.position.y = 10
    group.add(steeple)

    // Cross at top
    const crossV = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(0.1, 1.2, 0.1), mat('#c8a832')
    ))
    crossV.position.y = 12.6
    group.add(crossV)
    const crossH = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(0.6, 0.1, 0.1), mat('#c8a832')
    ))
    crossH.position.y = 12.8
    group.add(crossH)

    // Round window on front
    const roundWin = new THREE.Mesh(
      new THREE.CircleGeometry(0.6, 8),
      mat('#88bbee', { transparent: true, opacity: 0.6 })
    )
    roundWin.position.set(0, 3.5, 3.01)
    group.add(roundWin)

    // Arched door
    const doorFrame = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 2, 0.15), mat('#4a3520')
    ))
    doorFrame.position.set(0, 1, 3.01)
    group.add(doorFrame)

    scene.add(group)

    const rb = fixedBody(RAPIER, world, cx, 5, cz)
    world.createCollider(RAPIER.ColliderDesc.cuboid(2.5, 5, 3).setFriction(0.5), rb)
  }

  // ── Gas Station at (-45, -42) ──────────────────────────────
  {
    const gx = -45, gz = -42
    const group = new THREE.Group()
    group.position.set(gx, 0, gz)

    // Flat roof shelter
    const roof = shadowRecv(new THREE.Mesh(
      new THREE.BoxGeometry(8, 0.2, 5), mat('#dddddd')
    ))
    roof.position.y = 3.5
    group.add(roof)

    // 4 support poles
    const poleGeo = new THREE.CylinderGeometry(0.15, 0.15, 3.5, 6)
    const pm = mat('#888888')
    for (const [px, pz] of [[-3.5, -2], [3.5, -2], [-3.5, 2], [3.5, 2]]) {
      const pole = shadow(new THREE.Mesh(poleGeo, pm))
      pole.position.set(px, 1.75, pz)
      group.add(pole)
    }

    // Gas pumps (2)
    for (const px of [-1.5, 1.5]) {
      const pump = shadow(new THREE.Mesh(
        new THREE.BoxGeometry(0.6, 1.5, 0.5), mat('#cc3333')
      ))
      pump.position.set(px, 0.75, 0)
      group.add(pump)

      // Screen
      const screen = new THREE.Mesh(
        new THREE.PlaneGeometry(0.35, 0.25), mat('#222222')
      )
      screen.position.set(px, 1.1, 0.26)
      group.add(screen)

      // Nozzle holster
      const holster = shadow(new THREE.Mesh(
        new THREE.BoxGeometry(0.15, 0.3, 0.1), mat('#444444')
      ))
      holster.position.set(px + 0.25, 0.8, 0.28)
      group.add(holster)
    }

    // Small store building behind pumps
    const store = shadowRecv(new THREE.Mesh(
      new THREE.BoxGeometry(6, 3, 3), mat('#e8dcc8')
    ))
    store.position.set(0, 1.5, -3.5)
    group.add(store)

    // Store sign (emissive)
    const sign = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(4, 0.6, 0.1), emissive('#44cc44', 0.6)
    ))
    sign.position.set(0, 2.8, -1.96)
    group.add(sign)

    scene.add(group)

    // Colliders for store and poles
    const storeRb = fixedBody(RAPIER, world, gx, 1.5, gz - 3.5)
    world.createCollider(RAPIER.ColliderDesc.cuboid(3, 1.5, 1.5).setFriction(0.5), storeRb)

    for (const [px, pz] of [[-3.5, -2], [3.5, -2], [-3.5, 2], [3.5, 2]]) {
      const pRb = fixedBody(RAPIER, world, gx + px, 1.75, gz + pz)
      world.createCollider(RAPIER.ColliderDesc.cuboid(0.2, 1.75, 0.2).setFriction(0.5), pRb)
    }

    for (const px of [-1.5, 1.5]) {
      const pumpRb = fixedBody(RAPIER, world, gx + px, 0.75, gz)
      world.createCollider(RAPIER.ColliderDesc.cuboid(0.3, 0.75, 0.25).setFriction(0.5), pumpRb)
    }
  }

  // ── Diner / Restaurant at (45, 42) ──────────────────────────
  {
    const dx = 45, dz = 42
    const group = new THREE.Group()
    group.position.set(dx, 0, dz)

    // Wider body
    const body = shadowRecv(new THREE.Mesh(
      new THREE.BoxGeometry(7, 3, 5), mat('#cc4444')
    ))
    body.position.y = 1.5
    group.add(body)

    // Chrome trim strip
    const trim = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(7.1, 0.15, 5.1), mat('#cccccc')
    ))
    trim.position.y = 1.5
    group.add(trim)

    // Flat roof
    const roof = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(7.2, 0.15, 5.2), mat('#888888')
    ))
    roof.position.y = 3.08
    group.add(roof)

    // Neon sign (emissive)
    const neonSign = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(3, 0.8, 0.1), emissive('#ff4466', 1.0)
    ))
    neonSign.position.set(0, 3.5, 2.56)
    group.add(neonSign)

    // Large front windows
    for (const wx of [-2, 0, 2]) {
      const win = new THREE.Mesh(
        new THREE.PlaneGeometry(1.2, 1.5),
        mat('#88bbee', { transparent: true, opacity: 0.5 })
      )
      win.position.set(wx, 1.8, 2.51)
      group.add(win)
    }

    // Door
    const door = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(1.0, 2.2, 0.1), mat('#4a3520')
    ))
    door.position.set(-3.2, 1.1, 2.51)
    group.add(door)

    scene.add(group)

    const rb = fixedBody(RAPIER, world, dx, 1.5, dz)
    world.createCollider(RAPIER.ColliderDesc.cuboid(3.5, 1.5, 2.5).setFriction(0.5), rb)
  }

  // ── Awning buildings (3 shops with awnings) ──────────────────
  const awningShops = [
    { x: -10, z: -32, w: 3.5, h: 3.5, d: 3, color: '#b87c50', awningColor: '#cc3333' },
    { x: 10, z: 32, w: 3.5, h: 4, d: 3, color: '#5e8c6b', awningColor: '#2255aa' },
    { x: -33, z: 10, w: 3, h: 3, d: 3, color: '#8c6b5e', awningColor: '#cc8833' },
  ]

  for (const s of awningShops) {
    const group = new THREE.Group()
    group.position.set(s.x, 0, s.z)

    const body = shadowRecv(new THREE.Mesh(
      new THREE.BoxGeometry(s.w, s.h, s.d), mat(s.color)
    ))
    body.position.y = s.h / 2
    group.add(body)

    // Awning (angled plane)
    const awning = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(s.w + 0.5, 0.06, 1.5), mat(s.awningColor)
    ))
    awning.position.set(0, s.h * 0.6, s.d / 2 + 0.6)
    awning.rotation.x = 0.25
    group.add(awning)

    // Window
    const win = new THREE.Mesh(
      new THREE.PlaneGeometry(s.w * 0.6, s.h * 0.3),
      mat('#2a3a4a')
    )
    win.position.set(0, s.h * 0.5, s.d / 2 + 0.01)
    group.add(win)

    // Door
    const door = new THREE.Mesh(
      new THREE.PlaneGeometry(0.7, 1.4), mat('#3a2a1a')
    )
    door.position.set(s.w * 0.25, 0.7, s.d / 2 + 0.01)
    group.add(door)

    scene.add(group)

    const rb = fixedBody(RAPIER, world, s.x, s.h / 2, s.z)
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(s.w / 2, s.h / 2, s.d / 2).setFriction(0.5), rb
    )
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// STREET LAMPS (20+ spread across entire map)
// ═══════════════════════════════════════════════════════════════════════════

function createStreetLamps(scene, poleMat, glowMat) {
  const POLE_H = 3.8
  const positions = [
    // Center area
    [3, -7], [-3, -12], [3, 7], [-3, 12],
    [7, -3], [12, 3], [-7, 3], [-12, -3],
    // Mid-range
    [23, -12], [-23, 12], [12, 23], [-12, -23],
    [23, 12], [-23, -12], [-12, 23], [12, -23],
    // Outer area
    [35, -5], [-35, 5], [5, 35], [-5, -35],
    [45, 15], [-45, -15], [15, 45], [-15, -45],
    // Far edges
    [50, -30], [-50, 30], [30, 50], [-30, -50],
  ]

  const poleGeo = new THREE.CylinderGeometry(0.06, 0.08, POLE_H, 6)
  const bulbGeo = new THREE.SphereGeometry(0.2, 6, 5)
  const armGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.7, 4)

  for (const [x, z] of positions) {
    const pole = shadow(new THREE.Mesh(poleGeo, poleMat))
    pole.position.set(x, POLE_H / 2, z)
    scene.add(pole)

    const arm = shadow(new THREE.Mesh(armGeo, poleMat))
    arm.rotation.z = Math.PI / 2
    arm.position.set(x, POLE_H - 0.1, z)
    scene.add(arm)

    const bulb = new THREE.Mesh(bulbGeo, glowMat)
    bulb.position.set(x, POLE_H + 0.1, z)
    scene.add(bulb)

    const light = new THREE.PointLight('#ffee88', 0.5, 10, 1.5)
    light.position.set(x, POLE_H + 0.1, z)
    scene.add(light)

    // Base plate
    const base = new THREE.Mesh(
      new THREE.CylinderGeometry(0.15, 0.18, 0.1, 6), poleMat
    )
    base.position.set(x, 0.05, z)
    scene.add(base)
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// BENCHES (8 total spread across map)
// ═══════════════════════════════════════════════════════════════════════════

function createBenches(scene, woodMat, metalMat) {
  const positions = [
    { x: 3.5, z: -10, rotY: 0 },
    { x: -3.5, z: 10, rotY: Math.PI },
    { x: 10, z: 3.5, rotY: -Math.PI / 2 },
    { x: -10, z: -3.5, rotY: Math.PI / 2 },
    { x: 33, z: -10, rotY: 0 },
    { x: -33, z: 15, rotY: Math.PI },
    { x: 15, z: 33, rotY: -Math.PI / 2 },
    { x: -15, z: -33, rotY: Math.PI / 2 },
  ]

  for (const p of positions) {
    const bench = new THREE.Group()
    bench.position.set(p.x, 0, p.z)
    bench.rotation.y = p.rotY

    const seat = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(1.4, 0.06, 0.45), woodMat
    ))
    seat.position.y = 0.4
    bench.add(seat)

    const back = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(1.4, 0.4, 0.06), woodMat
    ))
    back.position.set(0, 0.6, -0.2)
    back.rotation.x = -0.15
    bench.add(back)

    const legGeo = new THREE.BoxGeometry(0.06, 0.4, 0.06)
    for (const [lx, ly, lz] of [[-0.6, 0.2, 0.15], [0.6, 0.2, 0.15], [-0.6, 0.2, -0.15], [0.6, 0.2, -0.15]]) {
      bench.add(shadow(new THREE.Mesh(legGeo, metalMat)).position.set(lx, ly, lz) && bench.children[bench.children.length - 1])
    }
    // Re-do legs properly
    bench.remove(bench.children[bench.children.length - 1])
    bench.remove(bench.children[bench.children.length - 1])
    bench.remove(bench.children[bench.children.length - 1])
    bench.remove(bench.children[bench.children.length - 1])

    for (const [lx, ly, lz] of [[-0.6, 0.2, 0.15], [0.6, 0.2, 0.15], [-0.6, 0.2, -0.15], [0.6, 0.2, -0.15]]) {
      const leg = shadow(new THREE.Mesh(legGeo, metalMat))
      leg.position.set(lx, ly, lz)
      bench.add(leg)
    }

    scene.add(bench)
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// FIRE HYDRANTS (6 total)
// ═══════════════════════════════════════════════════════════════════════════

function createFireHydrants(scene, redMat) {
  const positions = [
    [3, -5.5], [-3, 15], [15, 3], [-15, -3],
    [33, 5], [-33, -5],
  ]

  for (const [x, z] of positions) {
    const h = new THREE.Group()
    h.position.set(x, 0, z)

    const body = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.15, 0.55, 6), redMat
    ))
    body.position.y = 0.275
    h.add(body)

    const cap = shadow(new THREE.Mesh(
      new THREE.SphereGeometry(0.13, 5, 4, 0, Math.PI * 2, 0, Math.PI / 2), redMat
    ))
    cap.position.y = 0.55
    h.add(cap)

    for (const side of [-1, 1]) {
      const nozzle = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 0.12, 5), redMat
      )
      nozzle.rotation.z = Math.PI / 2
      nozzle.position.set(side * 0.15, 0.35, 0)
      h.add(nozzle)
    }

    const base = new THREE.Mesh(
      new THREE.CylinderGeometry(0.17, 0.17, 0.05, 6),
      mat('#991111')
    )
    base.position.y = 0.025
    h.add(base)

    scene.add(h)
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// MAILBOXES (4 total)
// ═══════════════════════════════════════════════════════════════════════════

function createMailboxes(scene, blueMat, poleMat) {
  const positions = [
    { x: -3.2, z: -7, rotY: 0 },
    { x: 7, z: 3.2, rotY: -Math.PI / 2 },
    { x: -23, z: -7, rotY: 0 },
    { x: 33, z: 12, rotY: -Math.PI / 2 },
  ]

  for (const p of positions) {
    const mb = new THREE.Group()
    mb.position.set(p.x, 0, p.z)
    mb.rotation.y = p.rotY

    const post = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.06, 0.9, 5), poleMat
    ))
    post.position.y = 0.45
    mb.add(post)

    const box = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 0.35, 0.3), blueMat
    ))
    box.position.set(0, 1.08, 0)
    mb.add(box)

    const top = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.2, 0.2, 0.4, 6, 1, false, 0, Math.PI), blueMat
    ))
    top.rotation.z = Math.PI / 2
    top.rotation.y = Math.PI / 2
    top.position.set(0, 1.26, 0)
    mb.add(top)

    const slot = new THREE.Mesh(
      new THREE.BoxGeometry(0.25, 0.03, 0.02), mat('#112244')
    )
    slot.position.set(0, 1.1, 0.16)
    mb.add(slot)

    scene.add(mb)
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// TRASH CANS (6 total)
// ═══════════════════════════════════════════════════════════════════════════

function createTrashCans(scene, darkMat, metalMat) {
  const positions = [
    [3.2, 5], [-3.2, -14], [-14, -3],
    [25, 12], [-25, -12], [12, -35],
  ]

  for (const [x, z] of positions) {
    const t = new THREE.Group()
    t.position.set(x, 0, z)

    const body = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.22, 0.2, 0.65, 7), darkMat
    ))
    body.position.y = 0.325
    t.add(body)

    const rim = new THREE.Mesh(
      new THREE.TorusGeometry(0.22, 0.025, 5, 8), metalMat
    )
    rim.position.y = 0.65
    rim.rotation.x = Math.PI / 2
    t.add(rim)

    scene.add(t)
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// BUS SHELTERS (4 total at outer locations)
// ═══════════════════════════════════════════════════════════════════════════

function createBusShelters(scene, poleMat, glassMat, woodMat, RAPIER, world) {
  const shelters = [
    { x: 10, z: -23, rotY: 0 },
    { x: -23, z: -10, rotY: Math.PI / 2 },
    { x: 33, z: 23, rotY: 0 },
    { x: -10, z: 35, rotY: 0 },
  ]

  const ROOF_W = 2.5, ROOF_D = 1.2, ROOF_H = 2.6

  for (const s of shelters) {
    const shelter = new THREE.Group()
    shelter.position.set(s.x, 0, s.z)
    shelter.rotation.y = s.rotY

    const poleGeo = new THREE.CylinderGeometry(0.05, 0.05, ROOF_H, 5)

    // 4 poles
    for (const [px, pz] of [[-1.1, 0.5], [1.1, 0.5], [-1.1, -0.5], [1.1, -0.5]]) {
      const pole = shadow(new THREE.Mesh(poleGeo, poleMat))
      pole.position.set(px, ROOF_H / 2, pz)
      shelter.add(pole)
    }

    // Roof
    const roof = shadowRecv(new THREE.Mesh(
      new THREE.BoxGeometry(ROOF_W + 0.3, 0.08, ROOF_D + 0.2),
      mat('#99aabb', { transparent: true, opacity: 0.5 })
    ))
    roof.position.y = ROOF_H
    shelter.add(roof)

    // Back wall
    const back = new THREE.Mesh(
      new THREE.BoxGeometry(ROOF_W - 0.1, ROOF_H * 0.7, 0.04),
      mat('#aabbcc', { transparent: true, opacity: 0.35 })
    )
    back.position.set(0, ROOF_H * 0.4, -0.5)
    shelter.add(back)

    // Bench
    const bench = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(ROOF_W - 0.5, 0.06, 0.35), woodMat
    ))
    bench.position.set(0, 0.45, -0.3)
    shelter.add(bench)

    scene.add(shelter)

    // Collider for the shelter as a whole
    const rb = fixedBodyRot(RAPIER, world, s.x, ROOF_H / 2, s.z, s.rotY)
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(ROOF_W / 2, ROOF_H / 2, ROOF_D / 2).setFriction(0.5), rb
    )
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// PHONE BOOTHS (3 total)
// ═══════════════════════════════════════════════════════════════════════════

function createPhoneBooths(scene, poleMat, glassMat, RAPIER, world) {
  const positions = [
    { x: -3.5, z: 25, rotY: 0 },
    { x: 25, z: -3.5, rotY: -Math.PI / 2 },
    { x: -35, z: -25, rotY: Math.PI / 4 },
  ]

  for (const p of positions) {
    const booth = new THREE.Group()
    booth.position.set(p.x, 0, p.z)
    booth.rotation.y = p.rotY

    // Frame (red)
    const frame = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(1, 2.5, 1), mat('#cc2222')
    ))
    frame.position.y = 1.25
    booth.add(frame)

    // Glass panels on 3 sides
    const gp = new THREE.Mesh(
      new THREE.PlaneGeometry(0.8, 1.8),
      mat('#aaddee', { transparent: true, opacity: 0.3 })
    )
    gp.position.set(0, 1.4, 0.51)
    booth.add(gp)

    for (const side of [-1, 1]) {
      const sp = new THREE.Mesh(
        new THREE.PlaneGeometry(0.8, 1.8),
        mat('#aaddee', { transparent: true, opacity: 0.3 })
      )
      sp.rotation.y = Math.PI / 2
      sp.position.set(side * 0.51, 1.4, 0)
      booth.add(sp)
    }

    // Phone inside
    const phone = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(0.2, 0.3, 0.15), mat('#222222')
    ))
    phone.position.set(0, 1.5, -0.35)
    booth.add(phone)

    // Roof cap
    const cap = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(1.1, 0.1, 1.1), mat('#aa1111')
    ))
    cap.position.y = 2.55
    booth.add(cap)

    scene.add(booth)

    const rb = fixedBodyRot(RAPIER, world, p.x, 1.25, p.z, p.rotY)
    world.createCollider(RAPIER.ColliderDesc.cuboid(0.5, 1.25, 0.5).setFriction(0.5), rb)
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// NEWSPAPER STANDS (4 total)
// ═══════════════════════════════════════════════════════════════════════════

function createNewspaperStands(scene, darkMat, glassMat) {
  const positions = [
    { x: -3.3, z: 6, rotY: 0 },
    { x: 14, z: -3, rotY: -Math.PI / 2 },
    { x: -25, z: 15, rotY: Math.PI },
    { x: 35, z: -15, rotY: -Math.PI / 2 },
  ]

  for (const p of positions) {
    const stand = new THREE.Group()
    stand.position.set(p.x, 0, p.z)
    stand.rotation.y = p.rotY

    const box = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(0.6, 0.8, 0.4), darkMat
    ))
    box.position.y = 0.4
    stand.add(box)

    const glass = new THREE.Mesh(
      new THREE.BoxGeometry(0.55, 0.5, 0.02), glassMat
    )
    glass.position.set(0, 0.5, 0.21)
    stand.add(glass)

    const top = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(0.65, 0.04, 0.45), darkMat
    ))
    top.position.y = 0.82
    stand.add(top)

    const paper = new THREE.Mesh(
      new THREE.BoxGeometry(0.45, 0.35, 0.02), mat('#f5f0e0')
    )
    paper.position.set(0, 0.45, 0.15)
    stand.add(paper)

    scene.add(stand)
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// PARKED VEHICLES (10 total — cars, van, pickup)
// ═══════════════════════════════════════════════════════════════════════════

function createParkedVehicles(scene, RAPIER, world) {
  const vehicles = [
    // Sedans
    { x: -3.5, z: -9, rotY: 0, color: '#3366aa', type: 'car' },
    { x: 9, z: 3.5, rotY: Math.PI / 2, color: '#44aa44', type: 'car' },
    { x: -23, z: -30, rotY: 0, color: '#aa3344', type: 'car' },
    { x: 30, z: -23, rotY: Math.PI / 2, color: '#8844aa', type: 'car' },
    { x: -30, z: 23, rotY: Math.PI, color: '#aa8844', type: 'car' },
    { x: 23, z: 30, rotY: -Math.PI / 2, color: '#44aaaa', type: 'car' },
    { x: -43, z: 5, rotY: Math.PI / 2, color: '#666666', type: 'car' },
    { x: 43, z: -5, rotY: -Math.PI / 2, color: '#884422', type: 'car' },
    // Delivery van
    { x: 10, z: -33, rotY: 0, color: '#eeeeee', type: 'van' },
    // Pickup truck
    { x: -10, z: 33, rotY: Math.PI, color: '#2266aa', type: 'pickup' },
  ]

  for (const v of vehicles) {
    const group = new THREE.Group()
    group.position.set(v.x, 0, v.z)
    group.rotation.y = v.rotY

    const carMat = mat(v.color)
    const wheelGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.14, 7)
    const wheelMat = mat('#222222')

    if (v.type === 'car') {
      // Body
      const body = shadow(new THREE.Mesh(
        new THREE.BoxGeometry(1.0, 0.38, 1.9), carMat
      ))
      body.position.y = 0.3
      group.add(body)

      // Cabin
      const cabin = shadow(new THREE.Mesh(
        new THREE.BoxGeometry(0.78, 0.3, 1.0), carMat
      ))
      cabin.position.set(0, 0.62, -0.1)
      group.add(cabin)

      // Windshield
      const ws = new THREE.Mesh(
        new THREE.BoxGeometry(0.7, 0.24, 0.04),
        mat('#88bbee', { transparent: true, opacity: 0.6 })
      )
      ws.position.set(0, 0.64, 0.45)
      ws.rotation.x = 0.2
      group.add(ws)

      // Headlights
      const hlMat = mat('#ffffaa')
      const hlGeo = new THREE.BoxGeometry(0.18, 0.08, 0.04)
      for (const [hx, hz] of [[-0.3, 0.97], [0.3, 0.97]]) {
        const hl = new THREE.Mesh(hlGeo, hlMat)
        hl.position.set(hx, 0.3, hz)
        group.add(hl)
      }

      // Taillights
      const tlMat = mat('#cc2222')
      for (const [tx, tz] of [[-0.3, -0.97], [0.3, -0.97]]) {
        const tl = new THREE.Mesh(hlGeo, tlMat)
        tl.position.set(tx, 0.3, tz)
        group.add(tl)
      }

      // Wheels
      for (const [wx, wy, wz] of [[-0.55, 0.13, 0.6], [0.55, 0.13, 0.6], [-0.55, 0.13, -0.6], [0.55, 0.13, -0.6]]) {
        const wheel = shadow(new THREE.Mesh(wheelGeo, wheelMat))
        wheel.rotation.z = Math.PI / 2
        wheel.position.set(wx, wy, wz)
        group.add(wheel)
      }

      scene.add(group)

      const rb = fixedBodyRot(RAPIER, world, v.x, 0.3, v.z, v.rotY)
      world.createCollider(RAPIER.ColliderDesc.cuboid(0.5, 0.38, 0.95).setFriction(0.5), rb)

    } else if (v.type === 'van') {
      // Larger box body
      const body = shadow(new THREE.Mesh(
        new THREE.BoxGeometry(1.3, 1.5, 2.8), carMat
      ))
      body.position.y = 0.9
      group.add(body)

      // Cabin front
      const cabin = shadow(new THREE.Mesh(
        new THREE.BoxGeometry(1.3, 0.9, 0.8),
        mat('#dddddd')
      ))
      cabin.position.set(0, 0.65, 1.5)
      group.add(cabin)

      // Windshield
      const ws = new THREE.Mesh(
        new THREE.BoxGeometry(1.1, 0.6, 0.04),
        mat('#88bbee', { transparent: true, opacity: 0.5 })
      )
      ws.position.set(0, 0.9, 1.91)
      ws.rotation.x = 0.15
      group.add(ws)

      // Wheels
      for (const [wx, wy, wz] of [[-0.7, 0.22, 0.8], [0.7, 0.22, 0.8], [-0.7, 0.22, -0.8], [0.7, 0.22, -0.8]]) {
        const wheel = shadow(new THREE.Mesh(
          new THREE.CylinderGeometry(0.28, 0.28, 0.16, 7), wheelMat
        ))
        wheel.rotation.z = Math.PI / 2
        wheel.position.set(wx, wy, wz)
        group.add(wheel)
      }

      scene.add(group)

      const rb = fixedBodyRot(RAPIER, world, v.x, 0.9, v.z, v.rotY)
      world.createCollider(RAPIER.ColliderDesc.cuboid(0.65, 0.75, 1.4).setFriction(0.5), rb)

    } else if (v.type === 'pickup') {
      // Cab
      const cab = shadow(new THREE.Mesh(
        new THREE.BoxGeometry(1.1, 0.8, 1.2), carMat
      ))
      cab.position.set(0, 0.6, 0.5)
      group.add(cab)

      // Bed
      const bed = shadow(new THREE.Mesh(
        new THREE.BoxGeometry(1.1, 0.4, 1.3), carMat
      ))
      bed.position.set(0, 0.3, -0.55)
      group.add(bed)

      // Bed walls
      for (const side of [-1, 1]) {
        const wall = shadow(new THREE.Mesh(
          new THREE.BoxGeometry(0.06, 0.35, 1.3), carMat
        ))
        wall.position.set(side * 0.52, 0.68, -0.55)
        group.add(wall)
      }
      // Tailgate
      const tg = shadow(new THREE.Mesh(
        new THREE.BoxGeometry(1.1, 0.35, 0.06), carMat
      ))
      tg.position.set(0, 0.68, -1.22)
      group.add(tg)

      // Windshield
      const ws = new THREE.Mesh(
        new THREE.BoxGeometry(0.9, 0.45, 0.04),
        mat('#88bbee', { transparent: true, opacity: 0.5 })
      )
      ws.position.set(0, 0.85, 1.11)
      ws.rotation.x = 0.15
      group.add(ws)

      // Wheels
      for (const [wx, wy, wz] of [[-0.6, 0.15, 0.7], [0.6, 0.15, 0.7], [-0.6, 0.15, -0.7], [0.6, 0.15, -0.7]]) {
        const wheel = shadow(new THREE.Mesh(wheelGeo, wheelMat))
        wheel.rotation.z = Math.PI / 2
        wheel.position.set(wx, wy, wz)
        group.add(wheel)
      }

      scene.add(group)

      const rb = fixedBodyRot(RAPIER, world, v.x, 0.5, v.z, v.rotY)
      world.createCollider(RAPIER.ColliderDesc.cuboid(0.55, 0.5, 1.0).setFriction(0.5), rb)
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// TREES (25+ ball-canopy trees scattered)
// ═══════════════════════════════════════════════════════════════════════════

function createTrees(scene) {
  const positions = [
    // Near roads and buildings
    [7, 10], [-7, -12], [13, -14], [-13, 14],
    [27, 7], [-27, -7], [7, 27], [-7, -27],
    // Mid-range
    [33, -18], [-33, 18], [18, 33], [-18, -33],
    [27, 27], [-27, -27], [27, -27], [-27, 27],
    // Outer edges
    [48, -8], [-48, 8], [8, 48], [-8, -48],
    [48, 38], [-48, -38], [38, 48], [-38, -48],
    [52, -25], [-52, 25], [25, 52], [-25, -52],
    // Extra far
    [50, 10], [-50, -10],
  ]

  const greens = ['#2d6a4f', '#40916c', '#52b788', '#45a05a', '#3a9050']

  for (let i = 0; i < positions.length; i++) {
    const [x, z] = positions[i]
    const scale = 0.8 + Math.sin(i * 5.7) * 0.3
    const color = greens[i % greens.length]

    // Trunk
    const trunk = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.06 * scale, 0.1 * scale, 1.8 * scale, 5),
      mat('#6b4c2a')
    ))
    trunk.position.set(x, 0.9 * scale, z)
    scene.add(trunk)

    // Ball canopy (sphere, NOT cone)
    const canopy = shadow(new THREE.Mesh(
      new THREE.SphereGeometry(0.8 * scale, 7, 6),
      mat(color)
    ))
    canopy.position.set(x, 2.2 * scale, z)
    scene.add(canopy)

    // Secondary smaller sphere for organic shape
    const bump = shadow(new THREE.Mesh(
      new THREE.SphereGeometry(0.5 * scale, 6, 5),
      mat(color)
    ))
    bump.position.set(x + 0.3 * scale, 2.5 * scale, z + 0.2 * scale)
    scene.add(bump)
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// BUSHES (12+ green spheres half-buried)
// ═══════════════════════════════════════════════════════════════════════════

function createBushes(scene, greenMat) {
  const positions = [
    { x: 8, z: -8, s: 0.9 }, { x: -8, z: 8, s: 0.7 },
    { x: 8, z: 8, s: 0.8 }, { x: -8, z: -8, s: 1.0 },
    { x: 28, z: -28, s: 0.7 }, { x: -28, z: 28, s: 0.85 },
    { x: 28, z: 28, s: 0.6 }, { x: -28, z: -28, s: 0.75 },
    { x: 45, z: 8, s: 0.9 }, { x: -45, z: -8, s: 0.8 },
    { x: 8, z: 45, s: 0.7 }, { x: -8, z: -45, s: 0.65 },
  ]

  const colors = ['#2d8c4e', '#389e5c', '#45a862', '#2a7a42', '#33944e']

  for (let i = 0; i < positions.length; i++) {
    const p = positions[i]
    const r = 0.5 * p.s
    const bushMat = mat(colors[i % colors.length])

    const bush = shadow(new THREE.Mesh(
      new THREE.SphereGeometry(r, 7, 5), bushMat
    ))
    bush.position.set(p.x, r * 0.5, p.z)
    scene.add(bush)

    const bump = shadow(new THREE.Mesh(
      new THREE.SphereGeometry(r * 0.6, 6, 4), bushMat
    ))
    bump.position.set(p.x + r * 0.4, r * 0.45, p.z + r * 0.3)
    scene.add(bump)
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// FLOWER BEDS (6 rectangular patches)
// ═══════════════════════════════════════════════════════════════════════════

function createFlowerBeds(scene) {
  const beds = [
    { x: 6, z: -14, w: 2, d: 1 },
    { x: -6, z: 14, w: 2, d: 1 },
    { x: 14, z: 6, w: 1, d: 2 },
    { x: -14, z: -6, w: 1, d: 2 },
    { x: 30, z: 10, w: 2.5, d: 1 },
    { x: -30, z: -10, w: 1, d: 2.5 },
  ]

  const flowerColors = ['#ff4466', '#ffaa22', '#ff66cc', '#ffee44', '#ff8844', '#cc44ff']

  for (const bed of beds) {
    // Dirt
    const dirt = new THREE.Mesh(
      new THREE.BoxGeometry(bed.w, 0.06, bed.d), mat('#5a3e1e')
    )
    dirt.position.set(bed.x, 0.03, bed.z)
    dirt.receiveShadow = true
    scene.add(dirt)

    // Border
    const borderMat = mat('#888888')
    for (const side of [-1, 1]) {
      const longSide = bed.w >= bed.d
      if (longSide) {
        const border = new THREE.Mesh(
          new THREE.BoxGeometry(bed.w + 0.1, 0.1, 0.06), borderMat
        )
        border.position.set(bed.x, 0.05, bed.z + side * (bed.d / 2 + 0.03))
        scene.add(border)

        const bShort = new THREE.Mesh(
          new THREE.BoxGeometry(0.06, 0.1, bed.d + 0.16), borderMat
        )
        bShort.position.set(bed.x + side * (bed.w / 2 + 0.03), 0.05, bed.z)
        scene.add(bShort)
      } else {
        const border = new THREE.Mesh(
          new THREE.BoxGeometry(0.06, 0.1, bed.d + 0.1), borderMat
        )
        border.position.set(bed.x + side * (bed.w / 2 + 0.03), 0.05, bed.z)
        scene.add(border)

        const bShort = new THREE.Mesh(
          new THREE.BoxGeometry(bed.w + 0.16, 0.1, 0.06), borderMat
        )
        bShort.position.set(bed.x, 0.05, bed.z + side * (bed.d / 2 + 0.03))
        scene.add(bShort)
      }
    }

    // Flowers
    const count = Math.floor(bed.w * bed.d * 6)
    for (let i = 0; i < count; i++) {
      const fx = bed.x + (Math.random() - 0.5) * (bed.w - 0.2)
      const fz = bed.z + (Math.random() - 0.5) * (bed.d - 0.2)
      const ci = Math.floor(Math.random() * flowerColors.length)
      const stemH = 0.12 + Math.random() * 0.12

      const flower = new THREE.Mesh(
        new THREE.SphereGeometry(0.06, 5, 4),
        mat(flowerColors[ci])
      )
      flower.position.set(fx, 0.06 + stemH, fz)
      scene.add(flower)

      const leaf = new THREE.Mesh(
        new THREE.SphereGeometry(0.04, 4, 3), mat('#2d7a3e')
      )
      leaf.position.set(fx, 0.06 + stemH * 0.5, fz)
      scene.add(leaf)
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// PARK AREA at (30, -10) — grass + bench + fountain
// ═══════════════════════════════════════════════════════════════════════════

function createPark(scene, RAPIER, world, woodMat, poleMat, greenMat, concreteMat) {
  const PX = 30, PZ = -10
  const SIZE = 8

  // Grass patch
  const grass = new THREE.Mesh(
    new THREE.PlaneGeometry(SIZE * 2, SIZE * 2), mat('#5aaa4a')
  )
  grass.rotation.x = -Math.PI / 2
  grass.position.set(PX, 0.005, PZ)
  grass.receiveShadow = true
  scene.add(grass)

  // Fountain in center
  // Base pool
  const pool = shadow(new THREE.Mesh(
    new THREE.CylinderGeometry(1.5, 1.8, 0.4, 8), concreteMat
  ))
  pool.position.set(PX, 0.2, PZ)
  scene.add(pool)

  // Water
  const water = new THREE.Mesh(
    new THREE.CircleGeometry(1.4, 8),
    mat('#4488cc', { transparent: true, opacity: 0.6 })
  )
  water.rotation.x = -Math.PI / 2
  water.position.set(PX, 0.42, PZ)
  scene.add(water)

  // Central column
  const col = shadow(new THREE.Mesh(
    new THREE.CylinderGeometry(0.2, 0.25, 1.2, 6), concreteMat
  ))
  col.position.set(PX, 1.0, PZ)
  scene.add(col)

  // Top basin
  const basin = shadow(new THREE.Mesh(
    new THREE.CylinderGeometry(0.6, 0.3, 0.15, 8), concreteMat
  ))
  basin.position.set(PX, 1.65, PZ)
  scene.add(basin)

  // Top water
  const topWater = new THREE.Mesh(
    new THREE.CircleGeometry(0.5, 8),
    mat('#4488cc', { transparent: true, opacity: 0.6 })
  )
  topWater.rotation.x = -Math.PI / 2
  topWater.position.set(PX, 1.73, PZ)
  scene.add(topWater)

  // Fountain collider
  const fRb = fixedBody(RAPIER, world, PX, 0.6, PZ)
  world.createCollider(RAPIER.ColliderDesc.cylinder(0.6, 1.2).setFriction(0.5), fRb)

  // Park benches (2)
  for (const [bx, bz, ry] of [[PX + 4, PZ, -Math.PI / 2], [PX - 4, PZ, Math.PI / 2]]) {
    const bench = new THREE.Group()
    bench.position.set(bx, 0, bz)
    bench.rotation.y = ry

    const seat = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(1.4, 0.06, 0.45), woodMat
    ))
    seat.position.y = 0.4
    bench.add(seat)

    const back = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(1.4, 0.4, 0.06), woodMat
    ))
    back.position.set(0, 0.6, -0.2)
    back.rotation.x = -0.15
    bench.add(back)

    for (const [lx, ly, lz] of [[-0.6, 0.2, 0.15], [0.6, 0.2, 0.15], [-0.6, 0.2, -0.15], [0.6, 0.2, -0.15]]) {
      const leg = shadow(new THREE.Mesh(
        new THREE.BoxGeometry(0.06, 0.4, 0.06), poleMat
      ))
      leg.position.set(lx, ly, lz)
      bench.add(leg)
    }
    scene.add(bench)
  }

  // Park trees (3 around fountain)
  for (const [tx, tz] of [[PX + 3, PZ + 4], [PX - 3, PZ - 4], [PX + 5, PZ - 3]]) {
    const trunk = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.12, 2, 5), mat('#6b4c2a')
    ))
    trunk.position.set(tx, 1, tz)
    scene.add(trunk)

    const canopy = shadow(new THREE.Mesh(
      new THREE.SphereGeometry(1.0, 7, 6), mat('#3a9050')
    ))
    canopy.position.set(tx, 2.5, tz)
    scene.add(canopy)
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// STOP SIGNS (4 at key intersections)
// ═══════════════════════════════════════════════════════════════════════════

function createStopSigns(scene, redMat, whiteMat, poleMat, RAPIER, world) {
  const positions = [
    { x: 3, z: -4.5, rotY: 0 },
    { x: -4.5, z: 3, rotY: Math.PI / 2 },
    { x: 23, z: -24.5, rotY: 0 },
    { x: -24.5, z: 23, rotY: Math.PI / 2 },
  ]

  const POLE_H = 2.5

  for (const p of positions) {
    const sign = new THREE.Group()
    sign.position.set(p.x, 0, p.z)
    sign.rotation.y = p.rotY

    const pole = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, POLE_H, 5), poleMat
    ))
    pole.position.y = POLE_H / 2
    sign.add(pole)

    const face = shadow(new THREE.Mesh(
      new THREE.CircleGeometry(0.35, 8), redMat
    ))
    face.position.set(0, POLE_H - 0.1, 0.05)
    sign.add(face)

    const border = new THREE.Mesh(
      new THREE.RingGeometry(0.28, 0.33, 8), whiteMat
    )
    border.position.set(0, POLE_H - 0.1, 0.06)
    sign.add(border)

    const back = new THREE.Mesh(
      new THREE.CircleGeometry(0.35, 8), poleMat
    )
    back.rotation.y = Math.PI
    back.position.set(0, POLE_H - 0.1, 0.04)
    sign.add(back)

    scene.add(sign)

    const rb = fixedBody(RAPIER, world, p.x, POLE_H / 2, p.z)
    world.createCollider(RAPIER.ColliderDesc.cuboid(0.08, POLE_H / 2, 0.08).setFriction(0.5), rb)
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ROAD SIGNS (yield, one-way on poles — some with colliders)
// ═══════════════════════════════════════════════════════════════════════════

function createRoadSigns(scene, poleMat, RAPIER, world) {
  // Yield signs (triangle)
  const yieldPositions = [
    { x: -3, z: -25, rotY: Math.PI },
    { x: 25, z: 3, rotY: -Math.PI / 2 },
  ]

  for (const p of yieldPositions) {
    const sg = new THREE.Group()
    sg.position.set(p.x, 0, p.z)
    sg.rotation.y = p.rotY

    const pole = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 2.5, 5), poleMat
    ))
    pole.position.y = 1.25
    sg.add(pole)

    // Triangle sign (yield) — use custom geometry
    const triGeo = new THREE.BufferGeometry()
    const verts = new Float32Array([
      0, 0.35, 0, -0.3, -0.15, 0, 0.3, -0.15, 0,
    ])
    triGeo.setAttribute('position', new THREE.BufferAttribute(verts, 3))
    triGeo.computeVertexNormals()
    const triFace = new THREE.Mesh(triGeo, mat('#ff0000'))
    triFace.material.side = THREE.DoubleSide
    triFace.position.set(0, 2.3, 0.05)
    triFace.castShadow = true
    sg.add(triFace)

    scene.add(sg)

    const rb = fixedBody(RAPIER, world, p.x, 1.25, p.z)
    world.createCollider(RAPIER.ColliderDesc.cuboid(0.08, 1.25, 0.08).setFriction(0.5), rb)
  }

  // One-way signs (rectangular)
  const oneWayPositions = [
    { x: -43, z: 3, rotY: Math.PI / 2 },
    { x: 43, z: -3, rotY: -Math.PI / 2 },
    { x: 3, z: 43, rotY: 0 },
    { x: -3, z: -43, rotY: Math.PI },
  ]

  for (const p of oneWayPositions) {
    const sg = new THREE.Group()
    sg.position.set(p.x, 0, p.z)
    sg.rotation.y = p.rotY

    const pole = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 2.2, 5), poleMat
    ))
    pole.position.y = 1.1
    sg.add(pole)

    // Rectangular black sign with white arrow
    const signBoard = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 0.25, 0.04), mat('#222222')
    ))
    signBoard.position.set(0, 2.1, 0)
    sg.add(signBoard)

    // Arrow (simple box pointing right)
    const arrow = new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 0.06, 0.02), mat('#ffffff')
    )
    arrow.position.set(0, 2.1, 0.025)
    sg.add(arrow)

    const arrowHead = new THREE.Mesh(
      new THREE.BufferGeometry().setAttribute('position',
        new THREE.BufferAttribute(new Float32Array([
          0.25, 0.1, 0, 0.25, -0.1, 0, 0.4, 0, 0,
        ]), 3)
      ),
      mat('#ffffff')
    )
    arrowHead.material.side = THREE.DoubleSide
    arrowHead.position.set(0, 2.1, 0.025)
    sg.add(arrowHead)

    scene.add(sg)

    const rb = fixedBody(RAPIER, world, p.x, 1.1, p.z)
    world.createCollider(RAPIER.ColliderDesc.cuboid(0.08, 1.1, 0.08).setFriction(0.5), rb)
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// TRAFFIC CONES — DYNAMIC (10 total)
// ═══════════════════════════════════════════════════════════════════════════

function createTrafficCones(scene, orangeMat, RAPIER, world, syncList) {
  const positions = [
    [3.5, -4.5], [-3.5, 4.5], [4.5, 3.5], [-4.5, -3.5],
    [22, -3], [-22, 3], [3, 22], [-3, -22],
    [35, 35], [-35, -35],
  ]

  const CONE_R = 0.15, CONE_H = 0.45, BASE_H = 0.04

  for (const [x, z] of positions) {
    const cg = new THREE.Group()

    // Base
    const base = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(0.35, BASE_H, 0.35), orangeMat
    ))
    base.position.y = -CONE_H / 2 + BASE_H / 2
    cg.add(base)

    // Cone
    const cone = shadow(new THREE.Mesh(
      new THREE.ConeGeometry(CONE_R, CONE_H, 6), orangeMat
    ))
    cg.add(cone)

    // White stripe
    const stripe = new THREE.Mesh(
      new THREE.CylinderGeometry(CONE_R * 0.65, CONE_R * 0.8, 0.06, 6),
      mat('#ffffff', { emissive: '#888888', emissiveIntensity: 0.3 })
    )
    stripe.position.y = -0.05
    cg.add(stripe)

    scene.add(cg)

    const centerY = CONE_H / 2 + BASE_H
    const rb = dynamicBody(RAPIER, world, x, centerY, z, 0.3, 0.4)
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(0.15, CONE_H / 2, 0.15)
        .setDensity(2.0).setFriction(0.4).setRestitution(0.15),
      rb
    )
    syncList.push({ mesh: cg, body: rb })
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// WOODEN BARRIERS — DYNAMIC (5 total)
// ═══════════════════════════════════════════════════════════════════════════

function createBarriers(scene, RAPIER, world, syncList) {
  const positions = [
    [5, -5], [-5, 5], [22, -5], [-22, 5], [38, 38],
  ]

  for (const [x, z] of positions) {
    const bar = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(2, 0.15, 0.1), mat('#cc8833')
    ))
    scene.add(bar)

    const rb = dynamicBody(RAPIER, world, x, 0.5, z, 0.2, 0.3)
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(1, 0.075, 0.05)
        .setDensity(3.0).setFriction(0.5).setRestitution(0.1),
      rb
    )
    syncList.push({ mesh: bar, body: rb })
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// GARBAGE BINS — DYNAMIC (3 total, knockable)
// ═══════════════════════════════════════════════════════════════════════════

function createGarbageBins(scene, RAPIER, world, syncList) {
  const positions = [
    [6, -28], [-6, 28], [40, -25],
  ]

  for (const [x, z] of positions) {
    const bin = new THREE.Group()

    const body = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.28, 0.8, 7), mat('#444444')
    ))
    body.position.y = 0
    bin.add(body)

    const lid = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.32, 0.32, 0.06, 7), mat('#555555')
    ))
    lid.position.y = 0.43
    bin.add(lid)

    scene.add(bin)

    const rb = dynamicBody(RAPIER, world, x, 0.5, z, 0.2, 0.3)
    world.createCollider(
      RAPIER.ColliderDesc.cylinder(0.4, 0.3)
        .setDensity(4.0).setFriction(0.4).setRestitution(0.15),
      rb
    )
    syncList.push({ mesh: bin, body: rb })
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// CARDBOARD BOXES — DYNAMIC (4 stacks of 1-3 boxes)
// ═══════════════════════════════════════════════════════════════════════════

function createCardboardBoxes(scene, RAPIER, world, syncList) {
  const stacks = [
    // position, then array of box sizes and heights
    { x: -35, z: -8, boxes: [[0.5, 0.5, 0.5, 0.25], [0.4, 0.4, 0.4, 0.7], [0.3, 0.3, 0.3, 1.05]] },
    { x: 35, z: 8, boxes: [[0.6, 0.4, 0.5, 0.2], [0.5, 0.35, 0.45, 0.55]] },
    { x: -8, z: 38, boxes: [[0.45, 0.45, 0.45, 0.225], [0.35, 0.35, 0.35, 0.625]] },
    { x: 8, z: -38, boxes: [[0.5, 0.5, 0.5, 0.25]] },
  ]

  const boxMat = mat('#b08850')

  for (const stack of stacks) {
    for (const [bw, bh, bd, by] of stack.boxes) {
      const box = shadow(new THREE.Mesh(
        new THREE.BoxGeometry(bw, bh, bd), boxMat
      ))
      // Tape stripe on top
      const tape = new THREE.Mesh(
        new THREE.PlaneGeometry(bw * 0.8, 0.04), mat('#8a7040')
      )
      tape.rotation.x = -Math.PI / 2
      tape.position.y = bh / 2 + 0.001
      box.add(tape)

      scene.add(box)

      const rb = dynamicBody(RAPIER, world, stack.x, by + bh / 2, stack.z, 0.3, 0.3)
      world.createCollider(
        RAPIER.ColliderDesc.cuboid(bw / 2, bh / 2, bd / 2)
          .setDensity(3.0).setFriction(0.5).setRestitution(0.1),
        rb
      )
      syncList.push({ mesh: box, body: rb })
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// SHOPPING CARTS — DYNAMIC (2 total)
// ═══════════════════════════════════════════════════════════════════════════

function createShoppingCarts(scene, RAPIER, world, syncList) {
  const positions = [
    { x: -38, z: -20, rotY: 0.3 },
    { x: 38, z: 20, rotY: -0.5 },
  ]

  for (const p of positions) {
    const cart = new THREE.Group()

    // Basket (wireframe box effect — use edges)
    const basket = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(0.7, 0.5, 0.9),
      mat('#cccccc', { wireframe: false })
    ))
    basket.position.y = 0.15
    cart.add(basket)

    // Wire frame overlay
    const wireframe = new THREE.Mesh(
      new THREE.BoxGeometry(0.72, 0.52, 0.92),
      new THREE.MeshStandardMaterial({ color: '#aaaaaa', wireframe: true, flatShading: true })
    )
    wireframe.position.y = 0.15
    cart.add(wireframe)

    // Handle
    const handle = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.04, 0.04), mat('#888888')
    ))
    handle.position.set(0, 0.5, -0.5)
    cart.add(handle)

    // Handle uprights
    for (const side of [-0.22, 0.22]) {
      const upright = shadow(new THREE.Mesh(
        new THREE.BoxGeometry(0.04, 0.2, 0.04), mat('#888888')
      ))
      upright.position.set(side, 0.48, -0.48)
      cart.add(upright)
    }

    // Wheels (4 small)
    const wheelGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.04, 6)
    const wheelMat = mat('#333333')
    for (const [wx, wz] of [[-0.28, 0.35], [0.28, 0.35], [-0.28, -0.35], [0.28, -0.35]]) {
      const wheel = new THREE.Mesh(wheelGeo, wheelMat)
      wheel.rotation.z = Math.PI / 2
      wheel.position.set(wx, -0.12, wz)
      cart.add(wheel)
    }

    scene.add(cart)

    const rb = dynamicBody(RAPIER, world, p.x, 0.4, p.z, 0.15, 0.2)
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(0.35, 0.3, 0.45)
        .setDensity(2.5).setFriction(0.3).setRestitution(0.1),
      rb
    )
    syncList.push({ mesh: cart, body: rb })
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// BOWLING PINS — DYNAMIC (8 near parking lot)
// ═══════════════════════════════════════════════════════════════════════════

function createBowlingPins(scene, RAPIER, world, syncList) {
  const BX = -40, BZ = 15

  // Diamond/triangle layout
  const layout = [
    [0, 0], [-0.3, -0.35], [0.3, -0.35],
    [-0.6, -0.7], [0, -0.7], [0.6, -0.7],
    [-0.3, -1.05], [0.3, -1.05],
  ]

  const pinGeo = new THREE.CylinderGeometry(0.08, 0.12, 0.5, 6)
  const pinHeadGeo = new THREE.SphereGeometry(0.1, 6, 6)
  const pinMat = mat('#ffffff')
  const stripeMat = mat('#cc2222')

  for (const [px, pz] of layout) {
    const wx = BX + px
    const wz = BZ + pz

    const pg = new THREE.Group()

    const body = shadow(new THREE.Mesh(pinGeo, pinMat))
    body.position.y = 0.25
    pg.add(body)

    const head = shadow(new THREE.Mesh(pinHeadGeo, pinMat))
    head.position.y = 0.55
    pg.add(head)

    const stripe = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.13, 0.13, 0.04, 6), stripeMat
    ))
    stripe.position.y = 0.35
    pg.add(stripe)

    pg.position.set(wx, 0, wz)
    scene.add(pg)

    const rb = dynamicBody(RAPIER, world, wx, 0.3, wz, 0.3, 0.4)
    world.createCollider(
      RAPIER.ColliderDesc.cylinder(0.25, 0.12)
        .setDensity(4.0).setFriction(0.4).setRestitution(0.2),
      rb
    )
    syncList.push({ mesh: pg, body: rb })
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// PARKING LOT at (-40, 35) — lined spaces
// ═══════════════════════════════════════════════════════════════════════════

function createParkingLot(scene, roadMat, whiteMat, yellowMat) {
  const LX = -40, LZ = 38, LW = 14, LH = 10
  const RY = 0.011

  // Asphalt surface
  const lot = new THREE.Mesh(
    new THREE.PlaneGeometry(LW, LH), roadMat
  )
  lot.rotation.x = -Math.PI / 2
  lot.position.set(LX, RY, LZ)
  lot.receiveShadow = true
  scene.add(lot)

  // Parking space lines (white)
  const SPACE_W = 2.5, SPACE_D = 4
  const numSpaces = Math.floor(LW / SPACE_W)

  for (let i = 0; i <= numSpaces; i++) {
    const sx = LX - LW / 2 + i * SPACE_W
    const line = new THREE.Mesh(
      new THREE.PlaneGeometry(0.06, SPACE_D), whiteMat
    )
    line.rotation.x = -Math.PI / 2
    line.position.set(sx, RY + 0.002, LZ - LH / 2 + SPACE_D / 2)
    line.receiveShadow = true
    scene.add(line)
  }

  // Front line
  const frontLine = new THREE.Mesh(
    new THREE.PlaneGeometry(LW, 0.06), yellowMat
  )
  frontLine.rotation.x = -Math.PI / 2
  frontLine.position.set(LX, RY + 0.002, LZ - LH / 2 + SPACE_D)
  frontLine.receiveShadow = true
  scene.add(frontLine)

  // Back boundary
  const backLine = new THREE.Mesh(
    new THREE.PlaneGeometry(LW, 0.08), yellowMat
  )
  backLine.rotation.x = -Math.PI / 2
  backLine.position.set(LX, RY + 0.002, LZ - LH / 2)
  backLine.receiveShadow = true
  scene.add(backLine)
}

// ═══════════════════════════════════════════════════════════════════════════
// BRIDGE / OVERPASS at x=0, z=-40 — spans over EW road
// ═══════════════════════════════════════════════════════════════════════════

function createBridge(scene, RAPIER, world, concreteMat, poleMat) {
  const BX = 0, BZ = -40
  const BRIDGE_W = 6, BRIDGE_L = 12, BRIDGE_H = 4
  const DECK_THICK = 0.3

  // Support pillars (4)
  const pillarGeo = new THREE.CylinderGeometry(0.4, 0.5, BRIDGE_H, 6)
  const pillarPositions = [
    [BX - BRIDGE_L / 2 + 1, BZ - BRIDGE_W / 2 + 0.5],
    [BX - BRIDGE_L / 2 + 1, BZ + BRIDGE_W / 2 - 0.5],
    [BX + BRIDGE_L / 2 - 1, BZ - BRIDGE_W / 2 + 0.5],
    [BX + BRIDGE_L / 2 - 1, BZ + BRIDGE_W / 2 - 0.5],
  ]

  for (const [px, pz] of pillarPositions) {
    const pillar = shadow(new THREE.Mesh(pillarGeo, concreteMat))
    pillar.position.set(px, BRIDGE_H / 2, pz)
    scene.add(pillar)

    const rb = fixedBody(RAPIER, world, px, BRIDGE_H / 2, pz)
    world.createCollider(RAPIER.ColliderDesc.cuboid(0.5, BRIDGE_H / 2, 0.5).setFriction(0.5), rb)
  }

  // Bridge deck
  const deck = shadowRecv(new THREE.Mesh(
    new THREE.BoxGeometry(BRIDGE_L, DECK_THICK, BRIDGE_W), concreteMat
  ))
  deck.position.set(BX, BRIDGE_H + DECK_THICK / 2, BZ)
  scene.add(deck)

  // Deck collider
  const deckRb = fixedBody(RAPIER, world, BX, BRIDGE_H + DECK_THICK / 2, BZ)
  world.createCollider(
    RAPIER.ColliderDesc.cuboid(BRIDGE_L / 2, DECK_THICK / 2, BRIDGE_W / 2).setFriction(0.5),
    deckRb
  )

  // Ramp on each side
  for (const side of [-1, 1]) {
    const rampLen = 8
    const rampGeo = new THREE.BoxGeometry(rampLen, DECK_THICK, BRIDGE_W)
    const ramp = shadowRecv(new THREE.Mesh(rampGeo, concreteMat))
    const rx = BX + side * (BRIDGE_L / 2 + rampLen / 2)
    const ry = (BRIDGE_H + DECK_THICK / 2) / 2
    ramp.position.set(rx, ry, BZ)
    ramp.rotation.z = side * Math.atan2(BRIDGE_H, rampLen)
    scene.add(ramp)

    // Ramp collider (rotated cuboid)
    const rampAngle = side * Math.atan2(BRIDGE_H, rampLen)
    const halfAngle = rampAngle / 2
    const rampRb = world.createRigidBody(
      RAPIER.RigidBodyDesc.fixed()
        .setTranslation(rx, ry, BZ)
        .setRotation({ x: 0, y: 0, z: Math.sin(halfAngle), w: Math.cos(halfAngle) })
    )
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(rampLen / 2, DECK_THICK / 2, BRIDGE_W / 2).setFriction(0.6),
      rampRb
    )
  }

  // Railings on bridge
  for (const zOff of [-BRIDGE_W / 2, BRIDGE_W / 2]) {
    const rail = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(BRIDGE_L, 0.6, 0.1), poleMat
    ))
    rail.position.set(BX, BRIDGE_H + DECK_THICK + 0.3, BZ + zOff)
    scene.add(rail)

    // Railing collider
    const railRb = fixedBody(RAPIER, world, BX, BRIDGE_H + DECK_THICK + 0.3, BZ + zOff)
    world.createCollider(RAPIER.ColliderDesc.cuboid(BRIDGE_L / 2, 0.3, 0.05).setFriction(0.5), railRb)

    // Railing posts
    for (let i = 0; i < 7; i++) {
      const postX = BX - BRIDGE_L / 2 + 1 + i * (BRIDGE_L - 2) / 6
      const post = shadow(new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 0.8, 5), poleMat
      ))
      post.position.set(postX, BRIDGE_H + DECK_THICK + 0.4, BZ + zOff)
      scene.add(post)
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// WATER TOWER on top of building at (32, -32)
// ═══════════════════════════════════════════════════════════════════════════

function createWaterTower(scene, RAPIER, world, poleMat, concreteMat) {
  const WX = 32, WZ = -32
  const BUILDING_H = 6 // Height of building underneath

  // 4 legs
  const LEG_H = 3
  const legGeo = new THREE.CylinderGeometry(0.12, 0.15, LEG_H, 6)
  const legPositions = [
    [WX - 1, WZ - 1], [WX + 1, WZ - 1],
    [WX - 1, WZ + 1], [WX + 1, WZ + 1],
  ]

  for (const [lx, lz] of legPositions) {
    const leg = shadow(new THREE.Mesh(legGeo, poleMat))
    leg.position.set(lx, BUILDING_H + LEG_H / 2, lz)
    scene.add(leg)
  }

  // Cross braces
  for (const [x1, z1, x2, z2] of [
    [WX - 1, WZ - 1, WX + 1, WZ + 1],
    [WX + 1, WZ - 1, WX - 1, WZ + 1],
  ]) {
    const dx = x2 - x1, dz = z2 - z1
    const dist = Math.sqrt(dx * dx + dz * dz)
    const brace = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, dist, 5), poleMat
    ))
    brace.position.set((x1 + x2) / 2, BUILDING_H + LEG_H * 0.4, (z1 + z2) / 2)
    brace.rotation.z = Math.PI / 2
    brace.rotation.y = Math.atan2(dz, dx)
    scene.add(brace)
  }

  // Tank (cylinder)
  const tank = shadow(new THREE.Mesh(
    new THREE.CylinderGeometry(1.5, 1.5, 2.5, 8), concreteMat
  ))
  tank.position.set(WX, BUILDING_H + LEG_H + 1.25, WZ)
  scene.add(tank)

  // Tank top cone
  const tankTop = shadow(new THREE.Mesh(
    new THREE.ConeGeometry(1.6, 1, 8), mat('#777777')
  ))
  tankTop.position.set(WX, BUILDING_H + LEG_H + 3, WZ)
  scene.add(tankTop)

  // Small pipe coming down from tank
  const pipe = shadow(new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.08, LEG_H + 1, 5), poleMat
  ))
  pipe.position.set(WX + 0.8, BUILDING_H + LEG_H / 2, WZ)
  scene.add(pipe)
}

// ═══════════════════════════════════════════════════════════════════════════
// BILLBOARDS (2 total, large advertisement signs on poles)
// ═══════════════════════════════════════════════════════════════════════════

function createBillboards(scene, RAPIER, world, poleMat) {
  const billboards = [
    { x: -50, z: -40, rotY: Math.PI / 4, color: '#2244aa' },
    { x: 50, z: 40, rotY: -Math.PI * 0.75, color: '#aa4422' },
  ]

  for (const b of billboards) {
    const group = new THREE.Group()
    group.position.set(b.x, 0, b.z)
    group.rotation.y = b.rotY

    // Two poles
    for (const px of [-1.5, 1.5]) {
      const pole = shadow(new THREE.Mesh(
        new THREE.CylinderGeometry(0.15, 0.18, 6, 6), poleMat
      ))
      pole.position.set(px, 3, 0)
      group.add(pole)
    }

    // Billboard face
    const face = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(5, 2.5, 0.15),
      mat(b.color)
    ))
    face.position.set(0, 5.5, 0)
    group.add(face)

    // Border
    const border = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(5.2, 2.7, 0.1), poleMat
    ))
    border.position.set(0, 5.5, -0.05)
    group.add(border)

    // Spotlight on billboard
    const spotBulb = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 5, 5),
      emissive('#ffeecc', 0.6)
    )
    spotBulb.position.set(0, 7, 0.5)
    group.add(spotBulb)

    scene.add(group)

    // Colliders for the two poles
    for (const px of [-1.5, 1.5]) {
      const rx = b.x + Math.cos(b.rotY) * px
      const rz = b.z + Math.sin(b.rotY) * px
      const rb = fixedBody(RAPIER, world, rx, 3, rz)
      world.createCollider(RAPIER.ColliderDesc.cuboid(0.2, 3, 0.2).setFriction(0.5), rb)
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// POWER LINES (thin cylinders between poles along outer edges)
// ═══════════════════════════════════════════════════════════════════════════

function createPowerLines(scene, poleMat) {
  // Utility poles along z = -50, from x = -50 to x = 50
  const POLE_H = 7
  const poleGeo = new THREE.CylinderGeometry(0.12, 0.16, POLE_H, 6)
  const crossArmGeo = new THREE.BoxGeometry(2, 0.1, 0.1)
  const wireMat = mat('#333333')

  const poles = []
  for (let x = -50; x <= 50; x += 20) {
    const pole = shadow(new THREE.Mesh(poleGeo, poleMat))
    pole.position.set(x, POLE_H / 2, -50)
    scene.add(pole)

    // Cross arm
    const arm = shadow(new THREE.Mesh(crossArmGeo, poleMat))
    arm.position.set(x, POLE_H - 0.3, -50)
    scene.add(arm)

    // Insulator knobs
    for (const xOff of [-0.8, 0, 0.8]) {
      const knob = shadow(new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.06, 0.15, 5), mat('#557788')
      ))
      knob.position.set(x + xOff, POLE_H - 0.1, -50)
      scene.add(knob)
    }

    poles.push([x, POLE_H - 0.05, -50])
  }

  // Wires between poles (3 wires per span)
  for (let i = 0; i < poles.length - 1; i++) {
    const [x1, y1, z1] = poles[i]
    const [x2, y2, z2] = poles[i + 1]
    const dx = x2 - x1
    const dist = Math.abs(dx)

    for (const xOff of [-0.8, 0, 0.8]) {
      const wire = new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.02, dist, 4),
        wireMat
      )
      wire.position.set((x1 + x2) / 2 + xOff, y1 - 0.3, z1)
      wire.rotation.z = Math.PI / 2
      scene.add(wire)
    }
  }

  // Another line along z = 50
  for (let x = -50; x <= 50; x += 20) {
    const pole = shadow(new THREE.Mesh(poleGeo, poleMat))
    pole.position.set(x, POLE_H / 2, 50)
    scene.add(pole)

    const arm = shadow(new THREE.Mesh(crossArmGeo, poleMat))
    arm.position.set(x, POLE_H - 0.3, 50)
    scene.add(arm)

    for (const xOff of [-0.8, 0, 0.8]) {
      const knob = shadow(new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.06, 0.15, 5), mat('#557788')
      ))
      knob.position.set(x + xOff, POLE_H - 0.1, 50)
      scene.add(knob)
    }
  }

  // Wires along z=50
  for (let i = 0; i < 5; i++) {
    const x1 = -50 + i * 20
    const x2 = x1 + 20
    const dist = 20
    for (const xOff of [-0.8, 0, 0.8]) {
      const wire = new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.02, dist, 4),
        wireMat
      )
      wire.position.set((x1 + x2) / 2 + xOff, POLE_H - 0.35, 50)
      wire.rotation.z = Math.PI / 2
      scene.add(wire)
    }
  }
}
