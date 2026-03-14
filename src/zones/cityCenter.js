/**
 * City Center zone — dense urban details filling the space between
 * and around the 4 portfolio buildings at (0,-20), (20,0), (0,20), (-20,0).
 *
 * Contains: roads with markings, roundabout, street lamps, benches,
 * fire hydrants, mailboxes, newspaper stands, trash cans, traffic cones
 * (dynamic), stop signs (fixed collider), bus stop shelter, parked cars
 * (fixed collider), manhole covers, curb stones, bushes, flower beds,
 * ornamental trees.
 */
import * as THREE from 'three'

export function createCityCenter(scene, RAPIER, world) {
  const group = new THREE.Group()
  const syncList = [] // { mesh, body } pairs for dynamic Rapier bodies

  // ── Shared materials ───────────────────────────────────────────────
  const roadMat   = new THREE.MeshStandardMaterial({ color: '#3a3a3a', flatShading: true })
  const whiteMat  = new THREE.MeshStandardMaterial({ color: '#eeeeee', flatShading: true })
  const yellowMat = new THREE.MeshStandardMaterial({ color: '#e8c840', flatShading: true })
  const curbMat   = new THREE.MeshStandardMaterial({ color: '#888888', flatShading: true })
  const poleMat   = new THREE.MeshStandardMaterial({ color: '#555555', flatShading: true })
  const woodMat   = new THREE.MeshStandardMaterial({ color: '#8b6914', flatShading: true })
  const redMat    = new THREE.MeshStandardMaterial({ color: '#cc2222', flatShading: true })
  const blueMat   = new THREE.MeshStandardMaterial({ color: '#2255aa', flatShading: true })
  const greenMat  = new THREE.MeshStandardMaterial({ color: '#2d8c4e', flatShading: true })
  const darkMat   = new THREE.MeshStandardMaterial({ color: '#333333', flatShading: true })
  const orangeMat = new THREE.MeshStandardMaterial({ color: '#ff6600', flatShading: true })
  const glassMat  = new THREE.MeshStandardMaterial({ color: '#88bbdd', transparent: true, opacity: 0.4, flatShading: true })
  const lampGlowMat = new THREE.MeshStandardMaterial({ color: '#ffee88', emissive: '#ffdd44', emissiveIntensity: 0.8, flatShading: true })
  const manholeMat = new THREE.MeshStandardMaterial({ color: '#2a2a2a', flatShading: true })
  const roofMat = new THREE.MeshStandardMaterial({ color: '#99aabb', transparent: true, opacity: 0.5, flatShading: true })

  // ── ROADS ──────────────────────────────────────────────────────────
  _createRoads(group, roadMat, whiteMat, yellowMat, curbMat)

  // ── ROUNDABOUT ─────────────────────────────────────────────────────
  _createRoundabout(group, roadMat, yellowMat, greenMat)

  // ── CROSSWALKS ─────────────────────────────────────────────────────
  _createCrosswalks(group, whiteMat)

  // ── MANHOLE COVERS ─────────────────────────────────────────────────
  _createManholes(group, manholeMat)

  // ── CURB STONES ────────────────────────────────────────────────────
  _createCurbs(group, curbMat)

  // ── STREET LAMPS ───────────────────────────────────────────────────
  _createStreetLamps(group, poleMat, lampGlowMat)

  // ── PARK BENCHES ───────────────────────────────────────────────────
  _createBenches(group, woodMat, poleMat)

  // ── FIRE HYDRANTS ──────────────────────────────────────────────────
  _createFireHydrants(group, redMat)

  // ── MAILBOXES ──────────────────────────────────────────────────────
  _createMailboxes(group, blueMat, poleMat)

  // ── NEWSPAPER STANDS ───────────────────────────────────────────────
  _createNewspaperStands(group, darkMat, glassMat)

  // ── TRASH CANS ─────────────────────────────────────────────────────
  _createTrashCans(group, darkMat, poleMat)

  // ── TRAFFIC CONES (Dynamic) ────────────────────────────────────────
  _createTrafficCones(group, orangeMat, RAPIER, world, syncList)

  // ── STOP SIGNS (Fixed collider) ────────────────────────────────────
  _createStopSigns(group, redMat, whiteMat, poleMat, RAPIER, world)

  // ── BUS STOP SHELTER ───────────────────────────────────────────────
  _createBusShelter(group, poleMat, roofMat, woodMat, RAPIER, world)

  // ── PARKED CARS (Fixed collider) ───────────────────────────────────
  _createParkedCars(group, RAPIER, world)

  // ── BUSHES ─────────────────────────────────────────────────────────
  _createBushes(group, greenMat)

  // ── FLOWER BEDS ────────────────────────────────────────────────────
  _createFlowerBeds(group)

  // ── ORNAMENTAL TREES ───────────────────────────────────────────────
  _createOrnamentalTrees(group)

  scene.add(group)

  // Track time for lamp flicker animation
  let flickerTime = 0

  return {
    syncList,
    update(dt) {
      flickerTime += dt
      // Subtle lamp flicker — modulate emissive intensity
      const flicker = 0.7 + Math.sin(flickerTime * 8.3) * 0.05 + Math.sin(flickerTime * 13.7) * 0.03
      lampGlowMat.emissiveIntensity = flicker
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════
// ROAD NETWORK
// ═══════════════════════════════════════════════════════════════════════

function _createRoads(group, roadMat, whiteMat, yellowMat, curbMat) {
  const ROAD_W = 4.0  // road width
  const ROAD_Y = 0.01 // just above ground

  // North-South road strip (connecting About at z:-20 and Contact at z:20)
  const nsRoad = new THREE.Mesh(
    new THREE.PlaneGeometry(ROAD_W, 44),
    roadMat
  )
  nsRoad.rotation.x = -Math.PI / 2
  nsRoad.position.set(0, ROAD_Y, 0)
  nsRoad.receiveShadow = true
  group.add(nsRoad)

  // East-West road strip (connecting Experience at x:-20 and Projects at x:20)
  const ewRoad = new THREE.Mesh(
    new THREE.PlaneGeometry(44, ROAD_W),
    roadMat
  )
  ewRoad.rotation.x = -Math.PI / 2
  ewRoad.position.set(0, ROAD_Y, 0)
  ewRoad.receiveShadow = true
  group.add(ewRoad)

  // ── White dashed center lines ──
  const dashGeo = new THREE.PlaneGeometry(0.12, 1.0)

  // N-S center dashes
  for (let z = -21; z <= 21; z += 2.0) {
    // Skip dashes in the roundabout center area
    if (Math.abs(z) < 3.5) continue
    const dash = new THREE.Mesh(dashGeo, whiteMat)
    dash.rotation.x = -Math.PI / 2
    dash.position.set(0, ROAD_Y + 0.002, z)
    dash.receiveShadow = true
    group.add(dash)
  }

  // E-W center dashes
  const dashGeoH = new THREE.PlaneGeometry(1.0, 0.12)
  for (let x = -21; x <= 21; x += 2.0) {
    if (Math.abs(x) < 3.5) continue
    const dash = new THREE.Mesh(dashGeoH, whiteMat)
    dash.rotation.x = -Math.PI / 2
    dash.position.set(x, ROAD_Y + 0.002, 0)
    dash.receiveShadow = true
    group.add(dash)
  }

  // ── Yellow edge lines ──
  const edgeGeo = new THREE.PlaneGeometry(0.08, 44)

  // N-S road yellow edge lines (left and right)
  for (const xOff of [-ROAD_W / 2 + 0.1, ROAD_W / 2 - 0.1]) {
    const edge = new THREE.Mesh(edgeGeo, yellowMat)
    edge.rotation.x = -Math.PI / 2
    edge.position.set(xOff, ROAD_Y + 0.002, 0)
    edge.receiveShadow = true
    group.add(edge)
  }

  // E-W road yellow edge lines (top and bottom)
  const edgeGeoH = new THREE.PlaneGeometry(44, 0.08)
  for (const zOff of [-ROAD_W / 2 + 0.1, ROAD_W / 2 - 0.1]) {
    const edge = new THREE.Mesh(edgeGeoH, yellowMat)
    edge.rotation.x = -Math.PI / 2
    edge.position.set(0, ROAD_Y + 0.002, zOff)
    edge.receiveShadow = true
    group.add(edge)
  }
}

// ═══════════════════════════════════════════════════════════════════════
// ROUNDABOUT (center of the cross intersection)
// ═══════════════════════════════════════════════════════════════════════

function _createRoundabout(group, roadMat, yellowMat, greenMat) {
  const ROAD_Y = 0.01

  // Circular road ring
  const ringOuter = new THREE.Mesh(
    new THREE.RingGeometry(2.5, 4.0, 24),
    roadMat
  )
  ringOuter.rotation.x = -Math.PI / 2
  ringOuter.position.y = ROAD_Y + 0.001
  ringOuter.receiveShadow = true
  group.add(ringOuter)

  // Yellow painted circle outline (inner edge)
  const innerCircle = new THREE.Mesh(
    new THREE.RingGeometry(2.35, 2.55, 24),
    yellowMat
  )
  innerCircle.rotation.x = -Math.PI / 2
  innerCircle.position.y = ROAD_Y + 0.003
  innerCircle.receiveShadow = true
  group.add(innerCircle)

  // Yellow painted circle outline (outer edge)
  const outerCircle = new THREE.Mesh(
    new THREE.RingGeometry(3.9, 4.1, 24),
    yellowMat
  )
  outerCircle.rotation.x = -Math.PI / 2
  outerCircle.position.y = ROAD_Y + 0.003
  outerCircle.receiveShadow = true
  group.add(outerCircle)

  // Green center island
  const island = new THREE.Mesh(
    new THREE.CircleGeometry(2.3, 16),
    greenMat
  )
  island.rotation.x = -Math.PI / 2
  island.position.y = 0.05
  island.receiveShadow = true
  group.add(island)

  // Small decorative fountain/column in the center
  const fountain = new THREE.Mesh(
    new THREE.CylinderGeometry(0.3, 0.4, 0.8, 8),
    new THREE.MeshStandardMaterial({ color: '#aaaaaa', flatShading: true })
  )
  fountain.position.set(0, 0.45, 0)
  fountain.castShadow = true
  group.add(fountain)

  // Fountain top basin
  const basin = new THREE.Mesh(
    new THREE.CylinderGeometry(0.6, 0.3, 0.15, 8),
    new THREE.MeshStandardMaterial({ color: '#999999', flatShading: true })
  )
  basin.position.set(0, 0.9, 0)
  basin.castShadow = true
  group.add(basin)

  // Tiny water pool (blue circle on top)
  const waterPool = new THREE.Mesh(
    new THREE.CircleGeometry(0.5, 8),
    new THREE.MeshStandardMaterial({ color: '#4488cc', transparent: true, opacity: 0.6, flatShading: true })
  )
  waterPool.rotation.x = -Math.PI / 2
  waterPool.position.set(0, 0.98, 0)
  group.add(waterPool)
}

// ═══════════════════════════════════════════════════════════════════════
// CROSSWALKS at each building entrance
// ═══════════════════════════════════════════════════════════════════════

function _createCrosswalks(group, whiteMat) {
  const ROAD_Y = 0.01
  const STRIPE_W = 0.35
  const STRIPE_H = 0.08
  const STRIPE_COUNT = 8
  const GAP = 0.18

  // Crosswalk definitions: position, and whether stripes go along X or Z
  const crosswalks = [
    // Near About building (z:-20) — stripes run along X
    { cx: 0, cz: -17.5, alongX: true },
    // Near Projects building (x:20) — stripes run along Z
    { cx: 17.5, cz: 0, alongX: false },
    // Near Contact building (z:20) — stripes run along X
    { cx: 0, cz: 17.5, alongX: true },
    // Near Experience building (x:-20) — stripes run along Z
    { cx: -17.5, cz: 0, alongX: false },
  ]

  for (const cw of crosswalks) {
    for (let i = 0; i < STRIPE_COUNT; i++) {
      const offset = (i - (STRIPE_COUNT - 1) / 2) * (STRIPE_H + GAP)
      let geo, x, z
      if (cw.alongX) {
        geo = new THREE.PlaneGeometry(STRIPE_W, STRIPE_H)
        x = cw.cx + (i - (STRIPE_COUNT - 1) / 2) * (STRIPE_W + 0.08)
        z = cw.cz
      } else {
        geo = new THREE.PlaneGeometry(STRIPE_H, STRIPE_W)
        x = cw.cx
        z = cw.cz + (i - (STRIPE_COUNT - 1) / 2) * (STRIPE_W + 0.08)
      }
      const stripe = new THREE.Mesh(geo, whiteMat)
      stripe.rotation.x = -Math.PI / 2
      stripe.position.set(x, ROAD_Y + 0.003, z)
      stripe.receiveShadow = true
      group.add(stripe)
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════
// MANHOLE COVERS
// ═══════════════════════════════════════════════════════════════════════

function _createManholes(group, manholeMat) {
  const ROAD_Y = 0.01
  const positions = [
    [0, -8], [0, 8], [8, 0], [-8, 0],
    [0, -14], [0, 14], [12, 0], [-12, 0],
  ]

  const geo = new THREE.CircleGeometry(0.35, 8)

  for (const [x, z] of positions) {
    const cover = new THREE.Mesh(geo, manholeMat)
    cover.rotation.x = -Math.PI / 2
    cover.position.set(x, ROAD_Y + 0.004, z)
    cover.receiveShadow = true
    group.add(cover)

    // Cross detail on manhole
    const crossH = new THREE.Mesh(
      new THREE.PlaneGeometry(0.5, 0.04),
      new THREE.MeshStandardMaterial({ color: '#444444', flatShading: true })
    )
    crossH.rotation.x = -Math.PI / 2
    crossH.position.set(x, ROAD_Y + 0.005, z)
    group.add(crossH)

    const crossV = new THREE.Mesh(
      new THREE.PlaneGeometry(0.04, 0.5),
      new THREE.MeshStandardMaterial({ color: '#444444', flatShading: true })
    )
    crossV.rotation.x = -Math.PI / 2
    crossV.position.set(x, ROAD_Y + 0.005, z)
    group.add(crossV)
  }
}

// ═══════════════════════════════════════════════════════════════════════
// CURB STONES along road edges
// ═══════════════════════════════════════════════════════════════════════

function _createCurbs(group, curbMat) {
  const CURB_H = 0.08 // height of curb
  const CURB_W = 0.15  // width of curb
  const ROAD_HW = 2.0  // road half width

  // N-S road curbs — left side (4 < z < 22 and -22 < z < -4, skip intersection)
  const nsSegments = [
    { zStart: -22, zEnd: -4.5 },
    { zStart: 4.5, zEnd: 22 },
  ]

  for (const seg of nsSegments) {
    const length = seg.zEnd - seg.zStart
    const midZ = (seg.zStart + seg.zEnd) / 2

    for (const side of [-1, 1]) {
      const curb = new THREE.Mesh(
        new THREE.BoxGeometry(CURB_W, CURB_H, length),
        curbMat
      )
      curb.position.set(side * (ROAD_HW + CURB_W / 2), CURB_H / 2, midZ)
      curb.receiveShadow = true
      curb.castShadow = true
      group.add(curb)
    }
  }

  // E-W road curbs
  const ewSegments = [
    { xStart: -22, xEnd: -4.5 },
    { xStart: 4.5, xEnd: 22 },
  ]

  for (const seg of ewSegments) {
    const length = seg.xEnd - seg.xStart
    const midX = (seg.xStart + seg.xEnd) / 2

    for (const side of [-1, 1]) {
      const curb = new THREE.Mesh(
        new THREE.BoxGeometry(length, CURB_H, CURB_W),
        curbMat
      )
      curb.position.set(midX, CURB_H / 2, side * (ROAD_HW + CURB_W / 2))
      curb.receiveShadow = true
      curb.castShadow = true
      group.add(curb)
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════
// STREET LAMPS (8 total, scattered along roads)
// ═══════════════════════════════════════════════════════════════════════

function _createStreetLamps(group, poleMat, glowMat) {
  const POLE_H = 3.5
  const POLE_R = 0.06

  const positions = [
    // Along N-S road
    [2.8, -7],  [-2.8, -12],
    [2.8, 7],   [-2.8, 12],
    // Along E-W road
    [7, -2.8],  [12, 2.8],
    [-7, 2.8],  [-12, -2.8],
  ]

  const poleGeo = new THREE.CylinderGeometry(POLE_R, POLE_R * 1.3, POLE_H, 6)
  const bulbGeo = new THREE.SphereGeometry(0.18, 6, 5)
  const armGeo  = new THREE.CylinderGeometry(0.03, 0.03, 0.6, 4)

  for (const [x, z] of positions) {
    // Pole
    const pole = new THREE.Mesh(poleGeo, poleMat)
    pole.position.set(x, POLE_H / 2, z)
    pole.castShadow = true
    group.add(pole)

    // Arm (horizontal extension at top)
    const arm = new THREE.Mesh(armGeo, poleMat)
    arm.rotation.z = Math.PI / 2
    arm.position.set(x, POLE_H - 0.1, z)
    arm.castShadow = true
    group.add(arm)

    // Glowing bulb
    const bulb = new THREE.Mesh(bulbGeo, glowMat)
    bulb.position.set(x, POLE_H + 0.08, z)
    group.add(bulb)

    // Point light for actual illumination
    const light = new THREE.PointLight('#ffee88', 0.6, 8, 1.5)
    light.position.set(x, POLE_H + 0.1, z)
    group.add(light)

    // Base plate
    const base = new THREE.Mesh(
      new THREE.CylinderGeometry(0.15, 0.18, 0.1, 6),
      poleMat
    )
    base.position.set(x, 0.05, z)
    group.add(base)
  }
}

// ═══════════════════════════════════════════════════════════════════════
// PARK BENCHES (4 total)
// ═══════════════════════════════════════════════════════════════════════

function _createBenches(group, woodMat, metalMat) {
  const positions = [
    { x: 3.5, z: -10, rotY: 0 },
    { x: -3.5, z: 10, rotY: Math.PI },
    { x: 10, z: 3.5, rotY: -Math.PI / 2 },
    { x: -10, z: -3.5, rotY: Math.PI / 2 },
  ]

  for (const p of positions) {
    const bench = new THREE.Group()
    bench.position.set(p.x, 0, p.z)
    bench.rotation.y = p.rotY

    // Seat (flat box)
    const seat = new THREE.Mesh(
      new THREE.BoxGeometry(1.4, 0.06, 0.45),
      woodMat
    )
    seat.position.y = 0.4
    seat.castShadow = true
    bench.add(seat)

    // Backrest
    const back = new THREE.Mesh(
      new THREE.BoxGeometry(1.4, 0.4, 0.06),
      woodMat
    )
    back.position.set(0, 0.6, -0.2)
    back.rotation.x = -0.15
    back.castShadow = true
    bench.add(back)

    // 4 legs
    const legGeo = new THREE.BoxGeometry(0.06, 0.4, 0.06)
    const legPositions = [
      [-0.6, 0.2, 0.15], [0.6, 0.2, 0.15],
      [-0.6, 0.2, -0.15], [0.6, 0.2, -0.15],
    ]
    for (const [lx, ly, lz] of legPositions) {
      const leg = new THREE.Mesh(legGeo, metalMat)
      leg.position.set(lx, ly, lz)
      leg.castShadow = true
      bench.add(leg)
    }

    // Seat slat detail (3 planks)
    for (let i = 0; i < 3; i++) {
      const slat = new THREE.Mesh(
        new THREE.BoxGeometry(1.35, 0.02, 0.12),
        woodMat
      )
      slat.position.set(0, 0.44, -0.15 + i * 0.15)
      bench.add(slat)
    }

    group.add(bench)
  }
}

// ═══════════════════════════════════════════════════════════════════════
// FIRE HYDRANTS (3 total)
// ═══════════════════════════════════════════════════════════════════════

function _createFireHydrants(group, redMat) {
  const positions = [
    [3.0, -5.5],
    [-3.0, 15],
    [15, 3.0],
  ]

  for (const [x, z] of positions) {
    const hydrant = new THREE.Group()
    hydrant.position.set(x, 0, z)

    // Main body
    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.15, 0.55, 6),
      redMat
    )
    body.position.y = 0.275
    body.castShadow = true
    hydrant.add(body)

    // Top cap (dome)
    const cap = new THREE.Mesh(
      new THREE.SphereGeometry(0.13, 5, 4, 0, Math.PI * 2, 0, Math.PI / 2),
      redMat
    )
    cap.position.y = 0.55
    cap.castShadow = true
    hydrant.add(cap)

    // Side nozzle left
    const nozzleL = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 0.12, 5),
      redMat
    )
    nozzleL.rotation.z = Math.PI / 2
    nozzleL.position.set(-0.15, 0.35, 0)
    hydrant.add(nozzleL)

    // Side nozzle right
    const nozzleR = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 0.12, 5),
      redMat
    )
    nozzleR.rotation.z = Math.PI / 2
    nozzleR.position.set(0.15, 0.35, 0)
    hydrant.add(nozzleR)

    // Base ring
    const base = new THREE.Mesh(
      new THREE.CylinderGeometry(0.17, 0.17, 0.05, 6),
      new THREE.MeshStandardMaterial({ color: '#991111', flatShading: true })
    )
    base.position.y = 0.025
    hydrant.add(base)

    group.add(hydrant)
  }
}

// ═══════════════════════════════════════════════════════════════════════
// MAILBOXES (2 total)
// ═══════════════════════════════════════════════════════════════════════

function _createMailboxes(group, blueMat, poleMat) {
  const positions = [
    { x: -3.2, z: -7, rotY: 0 },
    { x: 7, z: 3.2, rotY: -Math.PI / 2 },
  ]

  for (const p of positions) {
    const mailbox = new THREE.Group()
    mailbox.position.set(p.x, 0, p.z)
    mailbox.rotation.y = p.rotY

    // Post
    const post = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.06, 0.9, 5),
      poleMat
    )
    post.position.y = 0.45
    post.castShadow = true
    mailbox.add(post)

    // Box body
    const box = new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 0.35, 0.3),
      blueMat
    )
    box.position.set(0, 1.08, 0)
    box.castShadow = true
    mailbox.add(box)

    // Rounded top
    const top = new THREE.Mesh(
      new THREE.CylinderGeometry(0.2, 0.2, 0.4, 6, 1, false, 0, Math.PI),
      blueMat
    )
    top.rotation.z = Math.PI / 2
    top.rotation.y = Math.PI / 2
    top.position.set(0, 1.26, 0)
    top.castShadow = true
    mailbox.add(top)

    // Mail slot
    const slot = new THREE.Mesh(
      new THREE.BoxGeometry(0.25, 0.03, 0.02),
      new THREE.MeshStandardMaterial({ color: '#112244', flatShading: true })
    )
    slot.position.set(0, 1.1, 0.16)
    mailbox.add(slot)

    group.add(mailbox)
  }
}

// ═══════════════════════════════════════════════════════════════════════
// NEWSPAPER STANDS (2 total)
// ═══════════════════════════════════════════════════════════════════════

function _createNewspaperStands(group, darkMat, glassMat) {
  const positions = [
    { x: -3.3, z: 6, rotY: 0 },
    { x: 14, z: -3.0, rotY: -Math.PI / 2 },
  ]

  for (const p of positions) {
    const stand = new THREE.Group()
    stand.position.set(p.x, 0, p.z)
    stand.rotation.y = p.rotY

    // Box body
    const box = new THREE.Mesh(
      new THREE.BoxGeometry(0.6, 0.8, 0.4),
      darkMat
    )
    box.position.y = 0.4
    box.castShadow = true
    stand.add(box)

    // Glass front panel
    const glass = new THREE.Mesh(
      new THREE.BoxGeometry(0.55, 0.5, 0.02),
      glassMat
    )
    glass.position.set(0, 0.5, 0.21)
    stand.add(glass)

    // Top
    const top = new THREE.Mesh(
      new THREE.BoxGeometry(0.65, 0.04, 0.45),
      darkMat
    )
    top.position.y = 0.82
    top.castShadow = true
    stand.add(top)

    // Newspaper inside (visible through glass — flat colored strip)
    const paper = new THREE.Mesh(
      new THREE.BoxGeometry(0.45, 0.35, 0.02),
      new THREE.MeshStandardMaterial({ color: '#f5f0e0', flatShading: true })
    )
    paper.position.set(0, 0.45, 0.15)
    stand.add(paper)

    // Headline text bar
    const headline = new THREE.Mesh(
      new THREE.BoxGeometry(0.35, 0.04, 0.02),
      new THREE.MeshStandardMaterial({ color: '#222222', flatShading: true })
    )
    headline.position.set(0, 0.55, 0.16)
    stand.add(headline)

    group.add(stand)
  }
}

// ═══════════════════════════════════════════════════════════════════════
// TRASH CANS (3 total)
// ═══════════════════════════════════════════════════════════════════════

function _createTrashCans(group, darkMat, metalMat) {
  const positions = [
    [3.2, 5], [-3.2, -14], [-14, -3.0],
  ]

  for (const [x, z] of positions) {
    const trash = new THREE.Group()
    trash.position.set(x, 0, z)

    // Body cylinder
    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(0.22, 0.2, 0.65, 7),
      darkMat
    )
    body.position.y = 0.325
    body.castShadow = true
    trash.add(body)

    // Rim ring at top
    const rim = new THREE.Mesh(
      new THREE.TorusGeometry(0.22, 0.025, 5, 8),
      metalMat
    )
    rim.position.y = 0.65
    rim.rotation.x = Math.PI / 2
    trash.add(rim)

    // Bottom ring
    const bottomRim = new THREE.Mesh(
      new THREE.TorusGeometry(0.2, 0.02, 5, 8),
      metalMat
    )
    bottomRim.position.y = 0.02
    bottomRim.rotation.x = Math.PI / 2
    trash.add(bottomRim)

    // Bands (2 horizontal stripes)
    for (const bandY of [0.2, 0.45]) {
      const band = new THREE.Mesh(
        new THREE.TorusGeometry(0.215, 0.012, 4, 8),
        metalMat
      )
      band.position.y = bandY
      band.rotation.x = Math.PI / 2
      trash.add(band)
    }

    group.add(trash)
  }
}

// ═══════════════════════════════════════════════════════════════════════
// TRAFFIC CONES — DYNAMIC Rapier bodies (4 total)
// ═══════════════════════════════════════════════════════════════════════

function _createTrafficCones(group, orangeMat, RAPIER, world, syncList) {
  const positions = [
    [3.5, -4.5], [-3.5, 4.5], [4.5, 3.5], [-4.5, -3.5],
  ]

  const CONE_R = 0.15
  const CONE_H = 0.45
  const BASE_H = 0.04

  for (const [x, z] of positions) {
    const coneGroup = new THREE.Group()

    // Base plate
    const base = new THREE.Mesh(
      new THREE.BoxGeometry(0.35, BASE_H, 0.35),
      orangeMat
    )
    base.position.y = BASE_H / 2 - CONE_H / 2 - BASE_H / 2
    base.castShadow = true
    coneGroup.add(base)

    // Cone body
    const cone = new THREE.Mesh(
      new THREE.ConeGeometry(CONE_R, CONE_H, 6),
      orangeMat
    )
    cone.position.y = 0
    cone.castShadow = true
    coneGroup.add(cone)

    // White reflective stripe
    const stripe = new THREE.Mesh(
      new THREE.CylinderGeometry(CONE_R * 0.65, CONE_R * 0.8, 0.06, 6),
      new THREE.MeshStandardMaterial({ color: '#ffffff', emissive: '#888888', emissiveIntensity: 0.3, flatShading: true })
    )
    stripe.position.y = -0.05
    coneGroup.add(stripe)

    group.add(coneGroup)

    // Dynamic Rapier body — car can push these around
    const centerY = CONE_H / 2 + BASE_H
    const bodyDesc = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(x, centerY, z)
      .setLinearDamping(0.3)
      .setAngularDamping(0.4)
    const body = world.createRigidBody(bodyDesc)

    // Use cuboid collider slightly smaller than visual
    const colDesc = RAPIER.ColliderDesc.cuboid(0.15, CONE_H / 2, 0.15)
      .setDensity(8.0) // light enough to push easily
      .setFriction(0.4)
      .setRestitution(0.15)
    world.createCollider(colDesc, body)

    syncList.push({ mesh: coneGroup, body })
  }
}

// ═══════════════════════════════════════════════════════════════════════
// STOP SIGNS — FIXED Rapier colliders (2 total)
// ═══════════════════════════════════════════════════════════════════════

function _createStopSigns(group, redMat, whiteMat, poleMat, RAPIER, world) {
  const positions = [
    { x: 3.0, z: -4.5, rotY: 0 },
    { x: -4.5, z: 3.0, rotY: Math.PI / 2 },
  ]

  const POLE_H = 2.5

  for (const p of positions) {
    const sign = new THREE.Group()
    sign.position.set(p.x, 0, p.z)
    sign.rotation.y = p.rotY

    // Pole
    const pole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, POLE_H, 5),
      poleMat
    )
    pole.position.y = POLE_H / 2
    pole.castShadow = true
    sign.add(pole)

    // Octagonal sign face — approximated with circle geometry (8 segments)
    const signFace = new THREE.Mesh(
      new THREE.CircleGeometry(0.35, 8),
      redMat
    )
    signFace.position.set(0, POLE_H - 0.1, 0.05)
    signFace.castShadow = true
    sign.add(signFace)

    // White border ring
    const border = new THREE.Mesh(
      new THREE.RingGeometry(0.28, 0.33, 8),
      whiteMat
    )
    border.position.set(0, POLE_H - 0.1, 0.06)
    sign.add(border)

    // Back of sign
    const signBack = new THREE.Mesh(
      new THREE.CircleGeometry(0.35, 8),
      poleMat
    )
    signBack.rotation.y = Math.PI
    signBack.position.set(0, POLE_H - 0.1, 0.04)
    sign.add(signBack)

    group.add(sign)

    // Fixed Rapier collider for the pole
    const bodyDesc = RAPIER.RigidBodyDesc.fixed()
      .setTranslation(p.x, POLE_H / 2, p.z)
    const body = world.createRigidBody(bodyDesc)
    const colDesc = RAPIER.ColliderDesc.cuboid(0.08, POLE_H / 2, 0.08)
      .setFriction(0.5)
      .setRestitution(0.0)
    world.createCollider(colDesc, body)
  }
}

// ═══════════════════════════════════════════════════════════════════════
// BUS STOP SHELTER
// ═══════════════════════════════════════════════════════════════════════

function _createBusShelter(group, poleMat, roofMat, woodMat, RAPIER, world) {
  const shelter = new THREE.Group()
  const SX = 10
  const SZ = -3.0

  shelter.position.set(SX, 0, SZ)

  const ROOF_W = 2.5
  const ROOF_D = 1.2
  const ROOF_H = 2.6
  const POLE_R = 0.05

  // 2 support poles (front)
  const poleGeo = new THREE.CylinderGeometry(POLE_R, POLE_R, ROOF_H, 5)
  const poleL = new THREE.Mesh(poleGeo, poleMat)
  poleL.position.set(-ROOF_W / 2 + 0.1, ROOF_H / 2, ROOF_D / 2 - 0.1)
  poleL.castShadow = true
  shelter.add(poleL)

  const poleR = new THREE.Mesh(poleGeo, poleMat)
  poleR.position.set(ROOF_W / 2 - 0.1, ROOF_H / 2, ROOF_D / 2 - 0.1)
  poleR.castShadow = true
  shelter.add(poleR)

  // 2 back poles
  const poleBL = new THREE.Mesh(poleGeo, poleMat)
  poleBL.position.set(-ROOF_W / 2 + 0.1, ROOF_H / 2, -ROOF_D / 2 + 0.1)
  poleBL.castShadow = true
  shelter.add(poleBL)

  const poleBR = new THREE.Mesh(poleGeo, poleMat)
  poleBR.position.set(ROOF_W / 2 - 0.1, ROOF_H / 2, -ROOF_D / 2 + 0.1)
  poleBR.castShadow = true
  shelter.add(poleBR)

  // Roof
  const roof = new THREE.Mesh(
    new THREE.BoxGeometry(ROOF_W + 0.3, 0.08, ROOF_D + 0.2),
    roofMat
  )
  roof.position.y = ROOF_H
  roof.castShadow = true
  roof.receiveShadow = true
  shelter.add(roof)

  // Back wall (semi-transparent)
  const backWall = new THREE.Mesh(
    new THREE.BoxGeometry(ROOF_W - 0.1, ROOF_H * 0.7, 0.04),
    new THREE.MeshStandardMaterial({ color: '#aabbcc', transparent: true, opacity: 0.35, flatShading: true })
  )
  backWall.position.set(0, ROOF_H * 0.4, -ROOF_D / 2 + 0.1)
  shelter.add(backWall)

  // Bench inside shelter
  const benchSeat = new THREE.Mesh(
    new THREE.BoxGeometry(ROOF_W - 0.5, 0.06, 0.35),
    woodMat
  )
  benchSeat.position.set(0, 0.45, -ROOF_D / 2 + 0.3)
  benchSeat.castShadow = true
  shelter.add(benchSeat)

  // Bench support
  const benchSupL = new THREE.Mesh(
    new THREE.BoxGeometry(0.06, 0.45, 0.35),
    poleMat
  )
  benchSupL.position.set(-ROOF_W / 2 + 0.35, 0.225, -ROOF_D / 2 + 0.3)
  shelter.add(benchSupL)

  const benchSupR = new THREE.Mesh(
    new THREE.BoxGeometry(0.06, 0.45, 0.35),
    poleMat
  )
  benchSupR.position.set(ROOF_W / 2 - 0.35, 0.225, -ROOF_D / 2 + 0.3)
  shelter.add(benchSupR)

  // Side panels (left and right, partial height)
  const sidePanelGeo = new THREE.BoxGeometry(0.04, ROOF_H * 0.6, ROOF_D - 0.3)
  const sidePanelMat = new THREE.MeshStandardMaterial({ color: '#aabbcc', transparent: true, opacity: 0.25, flatShading: true })

  const sideL = new THREE.Mesh(sidePanelGeo, sidePanelMat)
  sideL.position.set(-ROOF_W / 2 + 0.12, ROOF_H * 0.35, 0)
  shelter.add(sideL)

  const sideR = new THREE.Mesh(sidePanelGeo, sidePanelMat)
  sideR.position.set(ROOF_W / 2 - 0.12, ROOF_H * 0.35, 0)
  shelter.add(sideR)

  group.add(shelter)

  // Fixed colliders for the shelter poles (4 poles)
  const polePositions = [
    [SX - ROOF_W / 2 + 0.1, SZ + ROOF_D / 2 - 0.1],
    [SX + ROOF_W / 2 - 0.1, SZ + ROOF_D / 2 - 0.1],
    [SX - ROOF_W / 2 + 0.1, SZ - ROOF_D / 2 + 0.1],
    [SX + ROOF_W / 2 - 0.1, SZ - ROOF_D / 2 + 0.1],
  ]
  for (const [px, pz] of polePositions) {
    const bodyDesc = RAPIER.RigidBodyDesc.fixed()
      .setTranslation(px, ROOF_H / 2, pz)
    const body = world.createRigidBody(bodyDesc)
    const colDesc = RAPIER.ColliderDesc.cuboid(0.1, ROOF_H / 2, 0.1)
      .setFriction(0.5)
      .setRestitution(0.0)
    world.createCollider(colDesc, body)
  }
}

// ═══════════════════════════════════════════════════════════════════════
// PARKED CARS — FIXED Rapier colliders (2 total)
// ═══════════════════════════════════════════════════════════════════════

function _createParkedCars(group, RAPIER, world) {
  const parkedDefs = [
    { x: -3.5, z: -9, rotY: 0, color: '#3366aa' },
    { x: 9, z: 3.5, rotY: Math.PI / 2, color: '#44aa44' },
  ]

  for (const def of parkedDefs) {
    const car = new THREE.Group()
    car.position.set(def.x, 0, def.z)
    car.rotation.y = def.rotY

    const carMat = new THREE.MeshStandardMaterial({ color: def.color, flatShading: true })

    // Car body
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(1.0, 0.38, 1.9),
      carMat
    )
    body.position.y = 0.3
    body.castShadow = true
    car.add(body)

    // Cabin
    const cabin = new THREE.Mesh(
      new THREE.BoxGeometry(0.78, 0.3, 1.0),
      new THREE.MeshStandardMaterial({ color: def.color, flatShading: true })
    )
    cabin.position.set(0, 0.62, -0.1)
    cabin.castShadow = true
    car.add(cabin)

    // Windows
    const windshield = new THREE.Mesh(
      new THREE.BoxGeometry(0.7, 0.24, 0.04),
      new THREE.MeshStandardMaterial({ color: '#88bbee', transparent: true, opacity: 0.6, flatShading: true })
    )
    windshield.position.set(0, 0.64, 0.45)
    windshield.rotation.x = 0.2
    car.add(windshield)

    const rearWin = new THREE.Mesh(
      new THREE.BoxGeometry(0.7, 0.24, 0.04),
      new THREE.MeshStandardMaterial({ color: '#88bbee', transparent: true, opacity: 0.6, flatShading: true })
    )
    rearWin.position.set(0, 0.64, -0.65)
    rearWin.rotation.x = -0.2
    car.add(rearWin)

    // Headlights
    const hlMat = new THREE.MeshStandardMaterial({ color: '#ffffaa', flatShading: true })
    const hlGeo = new THREE.BoxGeometry(0.18, 0.08, 0.04)
    const hlL = new THREE.Mesh(hlGeo, hlMat)
    hlL.position.set(-0.3, 0.3, 0.97)
    car.add(hlL)
    const hlR = new THREE.Mesh(hlGeo, hlMat)
    hlR.position.set(0.3, 0.3, 0.97)
    car.add(hlR)

    // Taillights
    const tlMat = new THREE.MeshStandardMaterial({ color: '#cc2222', flatShading: true })
    const tlL = new THREE.Mesh(hlGeo, tlMat)
    tlL.position.set(-0.3, 0.3, -0.97)
    car.add(tlL)
    const tlR = new THREE.Mesh(hlGeo, tlMat)
    tlR.position.set(0.3, 0.3, -0.97)
    car.add(tlR)

    // Wheels (4)
    const wheelGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.14, 7)
    const wheelMat = new THREE.MeshStandardMaterial({ color: '#222222', flatShading: true })
    const wheelPositions = [
      [-0.55, 0.13, 0.6], [0.55, 0.13, 0.6],
      [-0.55, 0.13, -0.6], [0.55, 0.13, -0.6],
    ]
    for (const [wx, wy, wz] of wheelPositions) {
      const wheel = new THREE.Mesh(wheelGeo, wheelMat)
      wheel.rotation.z = Math.PI / 2
      wheel.position.set(wx, wy, wz)
      wheel.castShadow = true
      car.add(wheel)
    }

    group.add(car)

    // Fixed Rapier collider (car-sized cuboid)
    // Need to account for rotation when placing the collider
    const halfA = def.rotY * 0.5
    const bodyDesc = RAPIER.RigidBodyDesc.fixed()
      .setTranslation(def.x, 0.3, def.z)
      .setRotation({ x: 0, y: Math.sin(halfA), z: 0, w: Math.cos(halfA) })
    const rBody = world.createRigidBody(bodyDesc)
    const colDesc = RAPIER.ColliderDesc.cuboid(0.5, 0.38, 0.95)
      .setFriction(0.5)
      .setRestitution(0.0)
    world.createCollider(colDesc, rBody)
  }
}

// ═══════════════════════════════════════════════════════════════════════
// BUSHES (6 small round bushes between buildings)
// ═══════════════════════════════════════════════════════════════════════

function _createBushes(group, greenMat) {
  const bushPositions = [
    { x: 8, z: -8, scale: 0.9 },
    { x: -8, z: -8, scale: 0.7 },
    { x: 8, z: 8, scale: 0.8 },
    { x: -8, z: 8, scale: 1.0 },
    { x: 12, z: -12, scale: 0.6 },
    { x: -12, z: 12, scale: 0.75 },
  ]

  const bushColors = ['#2d8c4e', '#389e5c', '#45a862', '#2a7a42', '#33944e', '#4db86a']

  for (let i = 0; i < bushPositions.length; i++) {
    const bp = bushPositions[i]
    const mat = new THREE.MeshStandardMaterial({ color: bushColors[i], flatShading: true })

    // Main sphere (half buried — position it so bottom half is underground)
    const radius = 0.5 * bp.scale
    const bush = new THREE.Mesh(
      new THREE.SphereGeometry(radius, 7, 5),
      mat
    )
    bush.position.set(bp.x, radius * 0.5, bp.z)
    bush.castShadow = true
    group.add(bush)

    // Add a smaller secondary sphere for organic look
    const bump = new THREE.Mesh(
      new THREE.SphereGeometry(radius * 0.6, 6, 4),
      mat
    )
    bump.position.set(
      bp.x + radius * 0.4,
      radius * 0.45,
      bp.z + radius * 0.3
    )
    bump.castShadow = true
    group.add(bump)
  }
}

// ═══════════════════════════════════════════════════════════════════════
// FLOWER BEDS (4 rectangular patches with colored small spheres)
// ═══════════════════════════════════════════════════════════════════════

function _createFlowerBeds(group) {
  const beds = [
    { x: 6, z: -14, w: 2.0, d: 1.0 },
    { x: -6, z: 14, w: 2.0, d: 1.0 },
    { x: 14, z: 6, w: 1.0, d: 2.0 },
    { x: -14, z: -6, w: 1.0, d: 2.0 },
  ]

  const flowerColors = ['#ff4466', '#ffaa22', '#ff66cc', '#ffee44', '#ff8844', '#cc44ff']
  const leafColor = '#2d7a3e'

  for (const bed of beds) {
    // Dirt patch
    const dirt = new THREE.Mesh(
      new THREE.BoxGeometry(bed.w, 0.06, bed.d),
      new THREE.MeshStandardMaterial({ color: '#5a3e1e', flatShading: true })
    )
    dirt.position.set(bed.x, 0.03, bed.z)
    dirt.receiveShadow = true
    group.add(dirt)

    // Border stones
    const borderMat = new THREE.MeshStandardMaterial({ color: '#888888', flatShading: true })
    // Long sides
    for (const side of [-1, 1]) {
      if (bed.w >= bed.d) {
        const border = new THREE.Mesh(
          new THREE.BoxGeometry(bed.w + 0.1, 0.1, 0.06),
          borderMat
        )
        border.position.set(bed.x, 0.05, bed.z + side * (bed.d / 2 + 0.03))
        group.add(border)
      } else {
        const border = new THREE.Mesh(
          new THREE.BoxGeometry(0.06, 0.1, bed.d + 0.1),
          borderMat
        )
        border.position.set(bed.x + side * (bed.w / 2 + 0.03), 0.05, bed.z)
        group.add(border)
      }
    }
    // Short sides
    for (const side of [-1, 1]) {
      if (bed.w >= bed.d) {
        const border = new THREE.Mesh(
          new THREE.BoxGeometry(0.06, 0.1, bed.d + 0.16),
          borderMat
        )
        border.position.set(bed.x + side * (bed.w / 2 + 0.03), 0.05, bed.z)
        group.add(border)
      } else {
        const border = new THREE.Mesh(
          new THREE.BoxGeometry(bed.w + 0.16, 0.1, 0.06),
          borderMat
        )
        border.position.set(bed.x, 0.05, bed.z + side * (bed.d / 2 + 0.03))
        group.add(border)
      }
    }

    // Scatter flowers (small colored spheres + green stem spheres)
    const flowerCount = Math.floor(bed.w * bed.d * 6)
    for (let i = 0; i < flowerCount; i++) {
      const fx = bed.x + (Math.random() - 0.5) * (bed.w - 0.2)
      const fz = bed.z + (Math.random() - 0.5) * (bed.d - 0.2)
      const colorIdx = Math.floor(Math.random() * flowerColors.length)

      // Flower head
      const flower = new THREE.Mesh(
        new THREE.SphereGeometry(0.06, 5, 4),
        new THREE.MeshStandardMaterial({ color: flowerColors[colorIdx], flatShading: true })
      )
      const stemH = 0.12 + Math.random() * 0.12
      flower.position.set(fx, 0.06 + stemH, fz)
      group.add(flower)

      // Small leaf/stem (tiny green sphere)
      const leaf = new THREE.Mesh(
        new THREE.SphereGeometry(0.04, 4, 3),
        new THREE.MeshStandardMaterial({ color: leafColor, flatShading: true })
      )
      leaf.position.set(fx, 0.06 + stemH * 0.5, fz)
      group.add(leaf)
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════
// ORNAMENTAL TREES (2 total — ball-shaped canopy, different from forest)
// ═══════════════════════════════════════════════════════════════════════

function _createOrnamentalTrees(group) {
  const trees = [
    { x: 7, z: 10, scale: 1.0, color: '#45a05a' },
    { x: -7, z: -12, scale: 0.85, color: '#3a9050' },
  ]

  for (const t of trees) {
    const tree = new THREE.Group()
    tree.position.set(t.x, 0, t.z)

    // Thin trunk
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06 * t.scale, 0.09 * t.scale, 1.8 * t.scale, 5),
      new THREE.MeshStandardMaterial({ color: '#6b4c2a', flatShading: true })
    )
    trunk.position.y = 0.9 * t.scale
    trunk.castShadow = true
    tree.add(trunk)

    // Ball-shaped canopy (sphere, not cone)
    const canopy = new THREE.Mesh(
      new THREE.SphereGeometry(0.7 * t.scale, 7, 6),
      new THREE.MeshStandardMaterial({ color: t.color, flatShading: true })
    )
    canopy.position.y = 2.1 * t.scale
    canopy.castShadow = true
    tree.add(canopy)

    // Secondary smaller sphere for organic shape
    const canopy2 = new THREE.Mesh(
      new THREE.SphereGeometry(0.45 * t.scale, 6, 5),
      new THREE.MeshStandardMaterial({ color: t.color, flatShading: true })
    )
    canopy2.position.set(0.3 * t.scale, 2.4 * t.scale, 0.2 * t.scale)
    canopy2.castShadow = true
    tree.add(canopy2)

    group.add(tree)
  }
}
