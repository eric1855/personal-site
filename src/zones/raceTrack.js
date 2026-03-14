/**
 * Racing Circuit Zone — a small oval race track south-west of the city.
 * Center: x=-30, z=50, radius ~18.
 *
 * Features: drivable oval track with ramps, checkered start/finish,
 * grandstand, pit stop garage, traffic cones (DYNAMIC), loose tires,
 * marshal posts, sponsor billboards, podium, go-karts, and more.
 */
import * as THREE from 'three'

// ── Zone center ──────────────────────────────────────────────────────────
const CX = -30
const CZ = 50

// ── Reusable materials ──────────────────────────────────────────────────
const MAT = {
  asphalt:    new THREE.MeshStandardMaterial({ color: '#3a3a3a', flatShading: true }),
  darkAsphalt:new THREE.MeshStandardMaterial({ color: '#2a2a2a', flatShading: true }),
  white:      new THREE.MeshStandardMaterial({ color: '#FFFFFF', flatShading: true }),
  black:      new THREE.MeshStandardMaterial({ color: '#111111', flatShading: true }),
  red:        new THREE.MeshStandardMaterial({ color: '#c0392b', flatShading: true }),
  brightRed:  new THREE.MeshStandardMaterial({ color: '#e74c3c', flatShading: true }),
  yellow:     new THREE.MeshStandardMaterial({ color: '#f1c40f', flatShading: true }),
  orange:     new THREE.MeshStandardMaterial({ color: '#FF6F00', flatShading: true }),
  blue:       new THREE.MeshStandardMaterial({ color: '#2980b9', flatShading: true }),
  green:      new THREE.MeshStandardMaterial({ color: '#27ae60', flatShading: true }),
  darkGreen:  new THREE.MeshStandardMaterial({ color: '#1a6b37', flatShading: true }),
  gray:       new THREE.MeshStandardMaterial({ color: '#7f8c8d', flatShading: true }),
  steel:      new THREE.MeshStandardMaterial({ color: '#78909C', flatShading: true }),
  concrete:   new THREE.MeshStandardMaterial({ color: '#9E9E9E', flatShading: true }),
  gravel:     new THREE.MeshStandardMaterial({ color: '#a08060', flatShading: true }),
  gold:       new THREE.MeshStandardMaterial({ color: '#FFD700', flatShading: true }),
  silver:     new THREE.MeshStandardMaterial({ color: '#C0C0C0', flatShading: true }),
  bronze:     new THREE.MeshStandardMaterial({ color: '#CD7F32', flatShading: true }),
  tire:       new THREE.MeshStandardMaterial({ color: '#1a1a1a', flatShading: true }),
  emissiveRed:new THREE.MeshStandardMaterial({ color: '#ff0000', flatShading: true, emissive: '#ff0000', emissiveIntensity: 0.6 }),
  emissiveGreen: new THREE.MeshStandardMaterial({ color: '#00ff00', flatShading: true, emissive: '#00ff00', emissiveIntensity: 0.5 }),
  emissiveYellow: new THREE.MeshStandardMaterial({ color: '#ffff00', flatShading: true, emissive: '#ffff00', emissiveIntensity: 0.4 }),
  purple:     new THREE.MeshStandardMaterial({ color: '#8e44ad', flatShading: true }),
}

export function createRaceTrack(scene, RAPIER, world) {
  const syncList = []
  const group = new THREE.Group()
  const animatedObjects = []

  // ────────────────────────────────────────────────────────────────────────
  //  GROUND SURFACES
  // ────────────────────────────────────────────────────────────────────────
  _createGroundSurfaces(group)

  // ────────────────────────────────────────────────────────────────────────
  //  TRACK LAYOUT (oval loop)
  // ────────────────────────────────────────────────────────────────────────
  _createTrackSurface(group)

  // ────────────────────────────────────────────────────────────────────────
  //  CURB MARKINGS
  // ────────────────────────────────────────────────────────────────────────
  _createCurbMarkings(group)

  // ────────────────────────────────────────────────────────────────────────
  //  CENTER LINE DASHES
  // ────────────────────────────────────────────────────────────────────────
  _createCenterLineDashes(group)

  // ────────────────────────────────────────────────────────────────────────
  //  START / FINISH LINE + GANTRY + FLAG
  // ────────────────────────────────────────────────────────────────────────
  _createStartFinish(group, RAPIER, world)

  // ────────────────────────────────────────────────────────────────────────
  //  GRANDSTAND
  // ────────────────────────────────────────────────────────────────────────
  _createGrandstand(group, RAPIER, world)

  // ────────────────────────────────────────────────────────────────────────
  //  RAMPS (2)
  // ────────────────────────────────────────────────────────────────────────
  _createRamps(group, RAPIER, world)

  // ────────────────────────────────────────────────────────────────────────
  //  PIT STOP
  // ────────────────────────────────────────────────────────────────────────
  _createPitStop(group, RAPIER, world, syncList)

  // ────────────────────────────────────────────────────────────────────────
  //  TRAFFIC CONES (DYNAMIC - 20)
  // ────────────────────────────────────────────────────────────────────────
  _createTrafficCones(group, RAPIER, world, syncList)

  // ────────────────────────────────────────────────────────────────────────
  //  TIRE BARRIERS + LOOSE TIRES
  // ────────────────────────────────────────────────────────────────────────
  _createTireBarriers(group, RAPIER, world)
  _createLooseTires(group, RAPIER, world, syncList)

  // ────────────────────────────────────────────────────────────────────────
  //  MARSHAL POSTS (4)
  // ────────────────────────────────────────────────────────────────────────
  _createMarshalPosts(group, animatedObjects)

  // ────────────────────────────────────────────────────────────────────────
  //  TROPHY + PODIUM
  // ────────────────────────────────────────────────────────────────────────
  _createPodium(group, RAPIER, world)

  // ────────────────────────────────────────────────────────────────────────
  //  SPONSOR BILLBOARDS
  // ────────────────────────────────────────────────────────────────────────
  _createBillboards(group, RAPIER, world)

  // ────────────────────────────────────────────────────────────────────────
  //  LAP TIMER DISPLAY
  // ────────────────────────────────────────────────────────────────────────
  _createLapTimer(group, animatedObjects)

  // ────────────────────────────────────────────────────────────────────────
  //  TRACK MARKERS (arrows, speed bumps, chevrons)
  // ────────────────────────────────────────────────────────────────────────
  _createTrackMarkers(group)

  // ────────────────────────────────────────────────────────────────────────
  //  VEHICLES (go-karts + pickup truck with trailer)
  // ────────────────────────────────────────────────────────────────────────
  _createVehicles(group, RAPIER, world)

  // ────────────────────────────────────────────────────────────────────────
  //  CHECKERED BEACH BALL (DYNAMIC)
  // ────────────────────────────────────────────────────────────────────────
  _createBeachBall(group, RAPIER, world, syncList)

  // ────────────────────────────────────────────────────────────────────────
  //  GRAVEL TRAPS
  // ────────────────────────────────────────────────────────────────────────
  _createGravelTraps(group)

  scene.add(group)

  return {
    syncList,
    update(dt) {
      // Flag waving animation on marshal posts
      animatedObjects.forEach(obj => {
        if (obj.type === 'flag') {
          obj.mesh.rotation.y = Math.sin(obj.phase + performance.now() * 0.003) * 0.3
        }
        if (obj.type === 'lapTimer') {
          // Pulse the lap timer emissive
          const t = performance.now() * 0.002
          obj.mesh.material.emissiveIntensity = 0.4 + Math.sin(t) * 0.3
        }
      })
    },
  }
}

// ══════════════════════════════════════════════════════════════════════════
//  GROUND SURFACES
// ══════════════════════════════════════════════════════════════════════════

function _createGroundSurfaces(group) {
  // Main asphalt ground beneath the whole track area
  const asphaltGround = new THREE.Mesh(
    new THREE.CircleGeometry(22, 10),
    MAT.asphalt
  )
  asphaltGround.rotation.x = -Math.PI / 2
  asphaltGround.position.set(CX, 0.015, CZ)
  asphaltGround.receiveShadow = true
  group.add(asphaltGround)

  // Green infield (inside the oval)
  const infield = new THREE.Mesh(
    new THREE.PlaneGeometry(16, 20),
    MAT.green
  )
  infield.rotation.x = -Math.PI / 2
  infield.position.set(CX, 0.018, CZ)
  infield.receiveShadow = true
  group.add(infield)
}

// ══════════════════════════════════════════════════════════════════════════
//  TRACK SURFACE — Oval loop built from many plane segments
// ══════════════════════════════════════════════════════════════════════════

function _createTrackSurface(group) {
  const trackW = 4.5
  const ovalA = 14   // semi-major axis (z direction)
  const ovalB = 9    // semi-minor axis (x direction)
  const segments = 48

  for (let i = 0; i < segments; i++) {
    const angle0 = (i / segments) * Math.PI * 2
    const angle1 = ((i + 1) / segments) * Math.PI * 2
    const midAngle = (angle0 + angle1) / 2

    // Center of track at this segment
    const cx = CX + Math.cos(midAngle) * ovalB
    const cz = CZ + Math.sin(midAngle) * ovalA

    // Tangent direction for rotation
    const tx = -Math.sin(midAngle)
    const tz = Math.cos(midAngle)
    const segLen = Math.sqrt(
      Math.pow(Math.cos(angle1) * ovalB - Math.cos(angle0) * ovalB, 2) +
      Math.pow(Math.sin(angle1) * ovalA - Math.sin(angle0) * ovalA, 2)
    )

    const strip = new THREE.Mesh(
      new THREE.PlaneGeometry(trackW, segLen + 0.3),
      MAT.darkAsphalt
    )
    strip.rotation.x = -Math.PI / 2
    strip.rotation.z = -Math.atan2(tz, tx) + Math.PI / 2
    strip.position.set(cx, 0.02, cz)
    strip.receiveShadow = true
    group.add(strip)
  }
}

// ══════════════════════════════════════════════════════════════════════════
//  CURB MARKINGS — red/white on inside edge of the track
// ══════════════════════════════════════════════════════════════════════════

function _createCurbMarkings(group) {
  const ovalA = 14
  const ovalB = 9
  const curbOffset = 1.8   // inside edge offset from center
  const segments = 36

  for (let i = 0; i < segments; i++) {
    const angle = (i / segments) * Math.PI * 2
    const nextAngle = ((i + 1) / segments) * Math.PI * 2
    const midAngle = (angle + nextAngle) / 2

    const innerB = ovalB - curbOffset
    const innerA = ovalA - curbOffset

    const cx = CX + Math.cos(midAngle) * innerB
    const cz = CZ + Math.sin(midAngle) * innerA

    const tx = -Math.sin(midAngle)
    const tz = Math.cos(midAngle)

    const curbMat = i % 2 === 0 ? MAT.red : MAT.white
    const curb = new THREE.Mesh(
      new THREE.PlaneGeometry(0.4, 2.0),
      curbMat
    )
    curb.rotation.x = -Math.PI / 2
    curb.rotation.z = -Math.atan2(tz, tx) + Math.PI / 2
    curb.position.set(cx, 0.025, cz)
    curb.receiveShadow = true
    group.add(curb)
  }
}

// ══════════════════════════════════════════════════════════════════════════
//  CENTER LINE DASHES
// ══════════════════════════════════════════════════════════════════════════

function _createCenterLineDashes(group) {
  const ovalA = 14
  const ovalB = 9
  const segments = 36

  for (let i = 0; i < segments; i++) {
    if (i % 2 === 0) continue   // dashed — skip every other

    const angle = (i / segments) * Math.PI * 2
    const nextAngle = ((i + 1) / segments) * Math.PI * 2
    const midAngle = (angle + nextAngle) / 2

    const cx = CX + Math.cos(midAngle) * ovalB
    const cz = CZ + Math.sin(midAngle) * ovalA

    const tx = -Math.sin(midAngle)
    const tz = Math.cos(midAngle)

    const dash = new THREE.Mesh(
      new THREE.PlaneGeometry(0.15, 1.4),
      MAT.white
    )
    dash.rotation.x = -Math.PI / 2
    dash.rotation.z = -Math.atan2(tz, tx) + Math.PI / 2
    dash.position.set(cx, 0.026, cz)
    group.add(dash)
  }
}

// ══════════════════════════════════════════════════════════════════════════
//  START / FINISH LINE + OVERHEAD GANTRY + CHECKERED FLAG
// ══════════════════════════════════════════════════════════════════════════

function _createStartFinish(group, RAPIER, world) {
  // Position: bottom of the oval (south side)
  const sx = CX
  const sz = CZ + 14   // south of oval center

  // Checkered pattern on the ground (8x4 squares)
  const sqSize = 0.55
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 8; c++) {
      const isWhite = (r + c) % 2 === 0
      const sq = new THREE.Mesh(
        new THREE.PlaneGeometry(sqSize, sqSize),
        isWhite ? MAT.white : MAT.black
      )
      sq.rotation.x = -Math.PI / 2
      sq.position.set(
        sx - 2.2 + c * sqSize,
        0.028,
        sz + r * sqSize - 1.0
      )
      sq.receiveShadow = true
      group.add(sq)
    }
  }

  // Overhead gantry — two pillars + beam
  const pillarH = 5
  const pillarGeo = new THREE.BoxGeometry(0.4, pillarH, 0.4)

  const pillarL = new THREE.Mesh(pillarGeo, MAT.steel)
  pillarL.position.set(sx - 3, pillarH / 2, sz)
  pillarL.castShadow = true
  group.add(pillarL)

  const pillarR = new THREE.Mesh(pillarGeo, MAT.steel)
  pillarR.position.set(sx + 3, pillarH / 2, sz)
  pillarR.castShadow = true
  group.add(pillarR)

  // Gantry colliders
  const lpDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(sx - 3, pillarH / 2, sz)
  const lpBody = world.createRigidBody(lpDesc)
  world.createCollider(RAPIER.ColliderDesc.cuboid(0.2, pillarH / 2, 0.2).setFriction(0.5), lpBody)

  const rpDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(sx + 3, pillarH / 2, sz)
  const rpBody = world.createRigidBody(rpDesc)
  world.createCollider(RAPIER.ColliderDesc.cuboid(0.2, pillarH / 2, 0.2).setFriction(0.5), rpBody)

  // Cross beam
  const beam = new THREE.Mesh(
    new THREE.BoxGeometry(6.4, 0.3, 0.5),
    MAT.steel
  )
  beam.position.set(sx, pillarH + 0.15, sz)
  beam.castShadow = true
  group.add(beam)

  // Checkered banner on beam
  const bannerW = 5.5
  const bannerH = 0.8
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 10; c++) {
      const isWhite = (r + c) % 2 === 0
      const sq = new THREE.Mesh(
        new THREE.PlaneGeometry(bannerW / 10, bannerH / 2),
        isWhite ? MAT.white : MAT.black
      )
      sq.position.set(
        sx - bannerW / 2 + c * (bannerW / 10) + (bannerW / 20),
        pillarH - 0.1 - r * (bannerH / 2),
        sz + 0.26
      )
      group.add(sq)
    }
  }

  // Checkered flag on a pole (right side)
  const flagPole = new THREE.Mesh(
    new THREE.CylinderGeometry(0.04, 0.04, 3, 4),
    MAT.steel
  )
  flagPole.position.set(sx + 4, 1.5, sz)
  flagPole.castShadow = true
  group.add(flagPole)

  // Flag cloth (checkered pattern)
  const flagGroup = new THREE.Group()
  flagGroup.position.set(sx + 4, 2.8, sz)
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 4; c++) {
      const isW = (r + c) % 2 === 0
      const sq = new THREE.Mesh(
        new THREE.PlaneGeometry(0.2, 0.2),
        isW ? MAT.white : MAT.black
      )
      sq.position.set(0.4 + c * 0.2, -r * 0.2, 0)
      flagGroup.add(sq)
    }
  }
  group.add(flagGroup)
}

// ══════════════════════════════════════════════════════════════════════════
//  GRANDSTAND — 3 tiered rows with colored seat cubes + roof
// ══════════════════════════════════════════════════════════════════════════

function _createGrandstand(group, RAPIER, world) {
  const gx = CX + 15
  const gz = CZ
  const standGroup = new THREE.Group()
  standGroup.position.set(gx, 0, gz)

  // 3 tiered rows
  const rowColors = [MAT.red, MAT.blue, MAT.yellow]
  const rowW = 10
  const seatSize = 0.4

  for (let tier = 0; tier < 3; tier++) {
    const tierH = 0.5 + tier * 0.8
    const tierD = -tier * 1.0

    // Row platform
    const platform = new THREE.Mesh(
      new THREE.BoxGeometry(rowW, 0.3, 1.2),
      MAT.concrete
    )
    platform.position.set(0, tierH, tierD)
    platform.castShadow = true
    platform.receiveShadow = true
    standGroup.add(platform)

    // Seat cubes (crowd)
    const numSeats = Math.floor(rowW / (seatSize + 0.1))
    for (let s = 0; s < numSeats; s++) {
      const crowdColors = [MAT.red, MAT.blue, MAT.yellow, MAT.green, MAT.orange, MAT.purple, MAT.white]
      const seat = new THREE.Mesh(
        new THREE.BoxGeometry(seatSize, seatSize * 0.8, seatSize * 0.6),
        crowdColors[(s + tier * 3) % crowdColors.length]
      )
      seat.position.set(
        -rowW / 2 + seatSize / 2 + s * (seatSize + 0.1) + 0.15,
        tierH + 0.35,
        tierD
      )
      seat.castShadow = true
      standGroup.add(seat)

      // Small head sphere on top of each seat
      if (s % 2 === 0) {
        const head = new THREE.Mesh(
          new THREE.SphereGeometry(0.12, 4, 3),
          crowdColors[(s * 2 + tier) % crowdColors.length]
        )
        head.position.set(
          seat.position.x,
          seat.position.y + 0.35,
          tierD
        )
        head.castShadow = true
        standGroup.add(head)
      }
    }
  }

  // Roof overhang
  const roof = new THREE.Mesh(
    new THREE.BoxGeometry(rowW + 1, 0.15, 4.5),
    MAT.gray
  )
  roof.position.set(0, 3.2, -1.5)
  roof.castShadow = true
  roof.receiveShadow = true
  standGroup.add(roof)

  // Roof support pillars (4)
  const pillarGeo = new THREE.BoxGeometry(0.25, 3.2, 0.25)
  const pillarXPositions = [-rowW / 2 + 0.3, -rowW / 2 + 3.3, rowW / 2 - 3.3, rowW / 2 - 0.3]
  pillarXPositions.forEach(px => {
    const pillar = new THREE.Mesh(pillarGeo, MAT.steel)
    pillar.position.set(px, 1.6, -3.2)
    pillar.castShadow = true
    standGroup.add(pillar)
  })

  group.add(standGroup)

  // FIXED collider for the whole grandstand
  const gsBody = RAPIER.RigidBodyDesc.fixed().setTranslation(gx, 1.6, gz - 1.2)
  const gsRb = world.createRigidBody(gsBody)
  world.createCollider(
    RAPIER.ColliderDesc.cuboid(rowW / 2 + 0.5, 1.8, 2.5).setFriction(0.5),
    gsRb
  )
}

// ══════════════════════════════════════════════════════════════════════════
//  RAMPS (2) — angled boxes on the track, red/white striped
// ══════════════════════════════════════════════════════════════════════════

function _createRamps(group, RAPIER, world) {
  const ramps = [
    // Ramp on the left straight (west side of oval)
    { x: CX - 9, z: CZ - 3, angle: 0.26, rotY: Math.PI / 2 },
    // Ramp on the right straight (east side of oval)
    { x: CX + 9, z: CZ + 3, angle: -0.26, rotY: Math.PI / 2 },
  ]

  ramps.forEach(r => {
    const rampW = 4.0
    const rampL = 3.0
    const rampH = 0.3

    const rampGroup = new THREE.Group()
    rampGroup.position.set(r.x, 0, r.z)

    // Main ramp body
    const rampMesh = new THREE.Mesh(
      new THREE.BoxGeometry(rampW, rampH, rampL),
      MAT.red
    )
    rampMesh.position.set(0, rampH / 2, 0)
    rampMesh.castShadow = true
    rampMesh.receiveShadow = true
    rampGroup.add(rampMesh)

    // Red/white stripes on top surface
    const stripeCount = 6
    for (let i = 0; i < stripeCount; i++) {
      const stripe = new THREE.Mesh(
        new THREE.PlaneGeometry(rampW * 0.95, rampL / stripeCount * 0.45),
        i % 2 === 0 ? MAT.white : MAT.red
      )
      stripe.rotation.x = -Math.PI / 2
      stripe.position.set(
        0,
        rampH + 0.01,
        -rampL / 2 + (i + 0.5) * (rampL / stripeCount)
      )
      rampGroup.add(stripe)
    }

    // Rotate the visual group
    rampGroup.rotation.y = r.rotY
    rampGroup.rotation.x = r.angle
    group.add(rampGroup)

    // FIXED collider with proper rotation quaternion
    const halfA = Math.abs(r.angle) * 0.5
    const sign = r.angle > 0 ? 1 : -1

    // Build quaternion: first Y rotation, then X rotation for the tilt
    const qY = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), r.rotY)
    const qX = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), r.angle)
    const qFinal = new THREE.Quaternion().multiplyQuaternions(qY, qX)

    const bodyDesc = RAPIER.RigidBodyDesc.fixed()
      .setTranslation(r.x, rampH / 2, r.z)
      .setRotation({ x: qFinal.x, y: qFinal.y, z: qFinal.z, w: qFinal.w })
    const body = world.createRigidBody(bodyDesc)
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(rampW / 2, rampH / 2, rampL / 2).setFriction(0.8),
      body
    )
  })
}

// ══════════════════════════════════════════════════════════════════════════
//  PIT STOP — garage structure + tools
// ══════════════════════════════════════════════════════════════════════════

function _createPitStop(group, RAPIER, world, syncList) {
  const px = CX - 5
  const pz = CZ + 18
  const pitGroup = new THREE.Group()
  pitGroup.position.set(px, 0, pz)

  // Garage frame — open front
  const frameW = 8
  const frameH = 3.5
  const frameD = 5

  // Back wall
  const backWall = new THREE.Mesh(
    new THREE.BoxGeometry(frameW, frameH, 0.2),
    MAT.concrete
  )
  backWall.position.set(0, frameH / 2, -frameD / 2)
  backWall.castShadow = true
  pitGroup.add(backWall)

  // Left wall
  const sideWall = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, frameH, frameD),
    MAT.concrete
  )
  sideWall.position.set(-frameW / 2, frameH / 2, 0)
  sideWall.castShadow = true
  pitGroup.add(sideWall)

  // Right wall
  const sideWallR = sideWall.clone()
  sideWallR.position.set(frameW / 2, frameH / 2, 0)
  pitGroup.add(sideWallR)

  // Flat roof
  const roof = new THREE.Mesh(
    new THREE.BoxGeometry(frameW + 0.5, 0.15, frameD + 1),
    MAT.gray
  )
  roof.position.set(0, frameH, -0.2)
  roof.castShadow = true
  roof.receiveShadow = true
  pitGroup.add(roof)

  // Floor
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(frameW, frameD),
    MAT.asphalt
  )
  floor.rotation.x = -Math.PI / 2
  floor.position.set(0, 0.02, 0)
  floor.receiveShadow = true
  pitGroup.add(floor)

  // ── Tool rack on back wall ──
  const rackBoard = new THREE.Mesh(
    new THREE.BoxGeometry(2.5, 1.5, 0.1),
    MAT.gray
  )
  rackBoard.position.set(-2, 1.8, -frameD / 2 + 0.15)
  pitGroup.add(rackBoard)

  // Small tool shapes on the rack
  for (let i = 0; i < 5; i++) {
    const tool = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.6 + Math.random() * 0.4, 0.06),
      i % 2 === 0 ? MAT.red : MAT.steel
    )
    tool.position.set(-2.8 + i * 0.5, 1.9, -frameD / 2 + 0.2)
    pitGroup.add(tool)
  }

  // ── 4 Tire stacks (cylinders) ──
  const tireGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.22, 8)
  const tireStackPositions = [
    { x: 2.5, z: -1.5 },
    { x: 2.5, z: -0.5 },
    { x: 3.0, z: -1.5 },
    { x: 3.0, z: -0.5 },
  ]

  tireStackPositions.forEach((tp, si) => {
    const stackH = 3 + Math.floor(Math.random() * 2)
    for (let t = 0; t < stackH; t++) {
      const tire = new THREE.Mesh(tireGeo, MAT.tire)
      tire.position.set(tp.x, 0.11 + t * 0.23, tp.z)
      tire.castShadow = true
      pitGroup.add(tire)

      // Top tires of each stack are DYNAMIC (can be knocked off)
      if (t >= stackH - 1 && si < 2) {
        const tBody = RAPIER.RigidBodyDesc.dynamic()
          .setTranslation(px + tp.x, 0.11 + t * 0.23, pz + tp.z)
          .setLinearDamping(0.5)
        const tRb = world.createRigidBody(tBody)
        world.createCollider(
          RAPIER.ColliderDesc.cylinder(0.11, 0.35)
            .setDensity(3)
            .setRestitution(0.3),
          tRb
        )
        syncList.push({ mesh: tire, body: tRb })
      }
    }
  })

  // ── Jack stand ──
  const jackBase = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.1, 0.5),
    MAT.red
  )
  jackBase.position.set(0, 0.05, 0.5)
  pitGroup.add(jackBase)

  const jackPole = new THREE.Mesh(
    new THREE.CylinderGeometry(0.06, 0.08, 0.6, 5),
    MAT.steel
  )
  jackPole.position.set(0, 0.4, 0.5)
  jackPole.castShadow = true
  pitGroup.add(jackPole)

  const jackTop = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.05, 0.3),
    MAT.steel
  )
  jackTop.position.set(0, 0.7, 0.5)
  pitGroup.add(jackTop)

  // ── Fuel pump ──
  const pumpBody = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 1.2, 0.4),
    MAT.red
  )
  pumpBody.position.set(-3, 0.6, 0.5)
  pumpBody.castShadow = true
  pitGroup.add(pumpBody)

  const pumpScreen = new THREE.Mesh(
    new THREE.BoxGeometry(0.35, 0.25, 0.05),
    MAT.emissiveGreen
  )
  pumpScreen.position.set(-3, 1.0, 0.73)
  pitGroup.add(pumpScreen)

  const pumpHose = new THREE.Mesh(
    new THREE.CylinderGeometry(0.03, 0.03, 1.2, 4),
    MAT.black
  )
  pumpHose.position.set(-2.7, 0.6, 0.5)
  pumpHose.rotation.z = 0.5
  pitGroup.add(pumpHose)

  group.add(pitGroup)

  // Pit stop collider (back wall)
  const pitWallBody = RAPIER.RigidBodyDesc.fixed()
    .setTranslation(px, frameH / 2, pz - frameD / 2)
  const pitWallRb = world.createRigidBody(pitWallBody)
  world.createCollider(
    RAPIER.ColliderDesc.cuboid(frameW / 2, frameH / 2, 0.15).setFriction(0.5),
    pitWallRb
  )

  // Side wall colliders
  const lWallBody = RAPIER.RigidBodyDesc.fixed()
    .setTranslation(px - frameW / 2, frameH / 2, pz)
  const lWallRb = world.createRigidBody(lWallBody)
  world.createCollider(
    RAPIER.ColliderDesc.cuboid(0.15, frameH / 2, frameD / 2).setFriction(0.5),
    lWallRb
  )

  const rWallBody = RAPIER.RigidBodyDesc.fixed()
    .setTranslation(px + frameW / 2, frameH / 2, pz)
  const rWallRb = world.createRigidBody(rWallBody)
  world.createCollider(
    RAPIER.ColliderDesc.cuboid(0.15, frameH / 2, frameD / 2).setFriction(0.5),
    rWallRb
  )
}

// ══════════════════════════════════════════════════════════════════════════
//  TRAFFIC CONES — 20 dynamic, lightweight
// ══════════════════════════════════════════════════════════════════════════

function _createTrafficCones(group, RAPIER, world, syncList) {
  const ovalA = 14
  const ovalB = 9

  // Place cones along both sides of the track + some scattered
  const conePositions = []

  // Along the track (outer edge)
  for (let i = 0; i < 14; i++) {
    const angle = (i / 14) * Math.PI * 2
    const outerR = 1.0
    conePositions.push({
      x: CX + Math.cos(angle) * (ovalB + 2.5 + Math.random() * 0.5),
      z: CZ + Math.sin(angle) * (ovalA + 2.5 + Math.random() * 0.5),
    })
  }

  // Some scattered on track
  for (let i = 0; i < 6; i++) {
    const angle = Math.random() * Math.PI * 2
    conePositions.push({
      x: CX + Math.cos(angle) * (ovalB + (Math.random() - 0.5) * 2),
      z: CZ + Math.sin(angle) * (ovalA + (Math.random() - 0.5) * 2),
    })
  }

  const coneGeo = new THREE.ConeGeometry(0.15, 0.45, 5)
  const stripeGeo = new THREE.CylinderGeometry(0.12, 0.14, 0.08, 5)

  conePositions.forEach((p, i) => {
    const coneGroup = new THREE.Group()

    // Cone body
    const cone = new THREE.Mesh(coneGeo, MAT.orange)
    cone.position.set(0, 0.225, 0)
    cone.castShadow = true
    coneGroup.add(cone)

    // White reflective stripe
    const stripe = new THREE.Mesh(stripeGeo, MAT.white)
    stripe.position.set(0, 0.22, 0)
    coneGroup.add(stripe)

    // Base
    const base = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 0.04, 0.3),
      MAT.orange
    )
    base.position.set(0, 0.02, 0)
    coneGroup.add(base)

    coneGroup.position.set(p.x, 0, p.z)
    group.add(coneGroup)

    // DYNAMIC Rapier body — lightweight
    const bodyDesc = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(p.x, 0.225, p.z)
      .setLinearDamping(0.3)
      .setAngularDamping(0.3)
    const body = world.createRigidBody(bodyDesc)
    world.createCollider(
      RAPIER.ColliderDesc.cone(0.225, 0.15)
        .setDensity(2)
        .setRestitution(0.3)
        .setFriction(0.4),
      body
    )
    syncList.push({ mesh: coneGroup, body })
  })
}

// ══════════════════════════════════════════════════════════════════════════
//  TIRE BARRIERS — fixed cylinder groups at corners
// ══════════════════════════════════════════════════════════════════════════

function _createTireBarriers(group, RAPIER, world) {
  // Place barriers at the 4 curve points of the oval
  const barrierPositions = [
    { x: CX, z: CZ + 15, count: 6, dir: 'x' },    // south curve
    { x: CX, z: CZ - 15, count: 6, dir: 'x' },    // north curve
    { x: CX - 11, z: CZ, count: 4, dir: 'z' },     // west midpoint
    { x: CX + 11, z: CZ, count: 4, dir: 'z' },     // east midpoint
  ]

  const barrierTireGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.3, 8)

  barrierPositions.forEach(bp => {
    for (let i = 0; i < bp.count; i++) {
      const stack = 2 + Math.floor(Math.random() * 2)
      for (let s = 0; s < stack; s++) {
        const tire = new THREE.Mesh(barrierTireGeo, MAT.tire)
        const offset = i * 0.65 - (bp.count * 0.65) / 2

        if (bp.dir === 'x') {
          tire.position.set(bp.x + offset, 0.15 + s * 0.3, bp.z)
        } else {
          tire.position.set(bp.x, 0.15 + s * 0.3, bp.z + offset)
        }
        tire.castShadow = true
        group.add(tire)
      }
    }

    // FIXED collider for the whole barrier group
    const bLen = bp.count * 0.65
    const bBody = RAPIER.RigidBodyDesc.fixed().setTranslation(bp.x, 0.45, bp.z)
    const bRb = world.createRigidBody(bBody)
    if (bp.dir === 'x') {
      world.createCollider(
        RAPIER.ColliderDesc.cuboid(bLen / 2, 0.45, 0.35).setFriction(0.6),
        bRb
      )
    } else {
      world.createCollider(
        RAPIER.ColliderDesc.cuboid(0.35, 0.45, bLen / 2).setFriction(0.6),
        bRb
      )
    }
  })
}

// ══════════════════════════════════════════════════════════════════════════
//  LOOSE TIRES — 6 DYNAMIC cylinders
// ══════════════════════════════════════════════════════════════════════════

function _createLooseTires(group, RAPIER, world, syncList) {
  const positions = [
    { x: CX - 6, z: CZ + 12 },
    { x: CX + 7, z: CZ - 10 },
    { x: CX - 3, z: CZ - 13 },
    { x: CX + 5, z: CZ + 8 },
    { x: CX - 8, z: CZ + 5 },
    { x: CX + 10, z: CZ - 2 },
  ]

  const tireGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.25, 8)

  positions.forEach(p => {
    const tire = new THREE.Mesh(tireGeo, MAT.tire)
    tire.position.set(p.x, 0.35, p.z)
    tire.rotation.x = Math.PI / 2   // lay on side
    tire.castShadow = true
    group.add(tire)

    const bodyDesc = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(p.x, 0.35, p.z)
      .setLinearDamping(0.4)
      .setAngularDamping(0.3)
    const body = world.createRigidBody(bodyDesc)
    world.createCollider(
      RAPIER.ColliderDesc.cylinder(0.125, 0.35)
        .setDensity(4)
        .setRestitution(0.4)
        .setFriction(0.6),
      body
    )
    syncList.push({ mesh: tire, body })
  })
}

// ══════════════════════════════════════════════════════════════════════════
//  MARSHAL POSTS — 4 posts with flag planes
// ══════════════════════════════════════════════════════════════════════════

function _createMarshalPosts(group, animatedObjects) {
  const posts = [
    { x: CX - 12, z: CZ + 10, color: MAT.yellow },
    { x: CX + 12, z: CZ + 10, color: MAT.green },
    { x: CX - 12, z: CZ - 10, color: MAT.red },
    { x: CX + 12, z: CZ - 10, color: MAT.blue },
  ]

  posts.forEach((p, i) => {
    // Post pole
    const pole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.06, 2.5, 4),
      MAT.steel
    )
    pole.position.set(p.x, 1.25, p.z)
    pole.castShadow = true
    group.add(pole)

    // Flag plane
    const flag = new THREE.Mesh(
      new THREE.PlaneGeometry(0.7, 0.5),
      p.color
    )
    flag.position.set(p.x + 0.4, 2.2, p.z)
    flag.castShadow = true
    group.add(flag)

    animatedObjects.push({
      type: 'flag',
      mesh: flag,
      phase: i * 1.5,
    })

    // Post base
    const base = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.2, 0.5),
      MAT.concrete
    )
    base.position.set(p.x, 0.1, p.z)
    group.add(base)
  })
}

// ══════════════════════════════════════════════════════════════════════════
//  PODIUM — 3 stepped boxes + trophy
// ══════════════════════════════════════════════════════════════════════════

function _createPodium(group, RAPIER, world) {
  const pdx = CX + 4
  const pdz = CZ + 18

  // First place (center, tallest)
  const p1 = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.6, 1.2), MAT.gold)
  p1.position.set(pdx, 0.8, pdz)
  p1.castShadow = true
  group.add(p1)

  // "1" marker
  const m1 = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.05), MAT.white)
  m1.position.set(pdx, 1.0, pdz + 0.63)
  group.add(m1)

  // Second place (left)
  const p2 = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.1, 1.2), MAT.silver)
  p2.position.set(pdx - 1.3, 0.55, pdz)
  p2.castShadow = true
  group.add(p2)

  // Third place (right)
  const p3 = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.7, 1.2), MAT.bronze)
  p3.position.set(pdx + 1.3, 0.35, pdz)
  p3.castShadow = true
  group.add(p3)

  // Trophy on first place
  const trophyBase = new THREE.Mesh(
    new THREE.CylinderGeometry(0.25, 0.3, 0.2, 6),
    MAT.gold
  )
  trophyBase.position.set(pdx, 1.7, pdz)
  trophyBase.castShadow = true
  group.add(trophyBase)

  const trophyStem = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.08, 0.4, 6),
    MAT.gold
  )
  trophyStem.position.set(pdx, 2.0, pdz)
  trophyStem.castShadow = true
  group.add(trophyStem)

  const trophyCup = new THREE.Mesh(
    new THREE.CylinderGeometry(0.3, 0.15, 0.35, 6),
    MAT.gold
  )
  trophyCup.position.set(pdx, 2.38, pdz)
  trophyCup.castShadow = true
  group.add(trophyCup)

  // Handles
  const handleGeo = new THREE.TorusGeometry(0.1, 0.025, 4, 6)
  const handleL = new THREE.Mesh(handleGeo, MAT.gold)
  handleL.position.set(pdx - 0.3, 2.35, pdz)
  handleL.rotation.y = Math.PI / 2
  group.add(handleL)

  const handleR = new THREE.Mesh(handleGeo, MAT.gold)
  handleR.position.set(pdx + 0.3, 2.35, pdz)
  handleR.rotation.y = Math.PI / 2
  group.add(handleR)

  // Podium collider
  const podBody = RAPIER.RigidBodyDesc.fixed().setTranslation(pdx, 0.8, pdz)
  const podRb = world.createRigidBody(podBody)
  world.createCollider(
    RAPIER.ColliderDesc.cuboid(2.2, 0.9, 0.7).setFriction(0.5),
    podRb
  )
}

// ══════════════════════════════════════════════════════════════════════════
//  SPONSOR BILLBOARDS
// ══════════════════════════════════════════════════════════════════════════

function _createBillboards(group, RAPIER, world) {
  const billboards = [
    { x: CX - 14, z: CZ + 14, rotY: 0.3, color: MAT.red },
    { x: CX + 14, z: CZ + 14, rotY: -0.3, color: MAT.blue },
    { x: CX - 14, z: CZ - 8, rotY: 0.5, color: MAT.yellow },
  ]

  billboards.forEach(b => {
    // Two support poles
    const poleGeo = new THREE.CylinderGeometry(0.08, 0.08, 3, 4)
    const poleL = new THREE.Mesh(poleGeo, MAT.steel)
    poleL.position.set(b.x - 1.2, 1.5, b.z)
    poleL.castShadow = true
    group.add(poleL)

    const poleR = new THREE.Mesh(poleGeo, MAT.steel)
    poleR.position.set(b.x + 1.2, 1.5, b.z)
    poleR.castShadow = true
    group.add(poleR)

    // Billboard face
    const billboard = new THREE.Mesh(
      new THREE.BoxGeometry(3.5, 1.5, 0.1),
      b.color
    )
    billboard.position.set(b.x, 2.8, b.z)
    billboard.rotation.y = b.rotY
    billboard.castShadow = true
    group.add(billboard)

    // Billboard frame
    const frame = new THREE.Mesh(
      new THREE.BoxGeometry(3.7, 1.7, 0.05),
      MAT.steel
    )
    frame.position.set(b.x, 2.8, b.z - 0.06)
    frame.rotation.y = b.rotY
    group.add(frame)

    // Sponsor text placeholder (white stripe)
    const textStripe = new THREE.Mesh(
      new THREE.PlaneGeometry(2.5, 0.4),
      MAT.white
    )
    textStripe.position.set(b.x, 2.8, b.z + 0.06)
    textStripe.rotation.y = b.rotY
    group.add(textStripe)

    // Collider for the poles
    const bBody = RAPIER.RigidBodyDesc.fixed().setTranslation(b.x, 1.5, b.z)
    const bRb = world.createRigidBody(bBody)
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(1.5, 1.5, 0.15).setFriction(0.5),
      bRb
    )
  })
}

// ══════════════════════════════════════════════════════════════════════════
//  LAP TIMER DISPLAY — emissive panel
// ══════════════════════════════════════════════════════════════════════════

function _createLapTimer(group, animatedObjects) {
  const lx = CX + 3
  const lz = CZ + 14.5

  // Display pole
  const pole = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.08, 3, 4),
    MAT.steel
  )
  pole.position.set(lx, 1.5, lz)
  pole.castShadow = true
  group.add(pole)

  // Display panel
  const panel = new THREE.Mesh(
    new THREE.BoxGeometry(1.8, 0.8, 0.1),
    MAT.black
  )
  panel.position.set(lx, 3.2, lz)
  panel.castShadow = true
  group.add(panel)

  // Emissive screen
  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 0.55),
    MAT.emissiveGreen
  )
  screen.position.set(lx, 3.2, lz + 0.06)
  group.add(screen)

  animatedObjects.push({
    type: 'lapTimer',
    mesh: screen,
  })

  // Small time segments (faux digital display)
  for (let i = 0; i < 4; i++) {
    const seg = new THREE.Mesh(
      new THREE.BoxGeometry(0.25, 0.35, 0.02),
      MAT.emissiveGreen
    )
    seg.position.set(lx - 0.55 + i * 0.38, 3.2, lz + 0.07)
    group.add(seg)
  }

  // Colon separators
  for (let i = 0; i < 2; i++) {
    const dot1 = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, 0.06, 0.02),
      MAT.emissiveGreen
    )
    dot1.position.set(lx - 0.17 + i * 0.75, 3.3, lz + 0.08)
    group.add(dot1)

    const dot2 = dot1.clone()
    dot2.position.y = 3.1
    group.add(dot2)
  }
}

// ══════════════════════════════════════════════════════════════════════════
//  TRACK MARKERS — arrows, speed bumps, chevrons
// ══════════════════════════════════════════════════════════════════════════

function _createTrackMarkers(group) {
  const ovalA = 14
  const ovalB = 9

  // Direction arrows on the track surface
  const arrowAngles = [0, Math.PI / 4, Math.PI / 2, Math.PI * 3 / 4, Math.PI, Math.PI * 5 / 4, Math.PI * 3 / 2, Math.PI * 7 / 4]
  arrowAngles.forEach(angle => {
    const ax = CX + Math.cos(angle) * ovalB
    const az = CZ + Math.sin(angle) * ovalA

    // Arrow body (rectangle)
    const arrowBody = new THREE.Mesh(
      new THREE.PlaneGeometry(0.15, 0.8),
      MAT.white
    )
    arrowBody.rotation.x = -Math.PI / 2
    const tangentAngle = angle + Math.PI / 2   // perpendicular to radius = tangent
    arrowBody.rotation.z = -tangentAngle
    arrowBody.position.set(ax, 0.027, az)
    group.add(arrowBody)

    // Arrowhead (triangle shape approximated with a plane)
    const arrowHead = new THREE.Mesh(
      new THREE.PlaneGeometry(0.4, 0.3),
      MAT.white
    )
    arrowHead.rotation.x = -Math.PI / 2
    arrowHead.rotation.z = -tangentAngle
    arrowHead.position.set(
      ax + Math.cos(tangentAngle) * 0.5,
      0.027,
      az + Math.sin(tangentAngle) * 0.5
    )
    group.add(arrowHead)
  })

  // Speed bumps (thin raised boxes across the track)
  const bumpAngles = [Math.PI / 6, Math.PI * 2 / 3, Math.PI * 7 / 6, Math.PI * 5 / 3]
  bumpAngles.forEach(angle => {
    const bx = CX + Math.cos(angle) * ovalB
    const bz = CZ + Math.sin(angle) * ovalA
    const tangent = angle + Math.PI / 2

    const bump = new THREE.Mesh(
      new THREE.BoxGeometry(3.5, 0.06, 0.25),
      MAT.yellow
    )
    bump.position.set(bx, 0.03, bz)
    bump.rotation.y = -tangent + Math.PI / 2
    bump.receiveShadow = true
    group.add(bump)
  })

  // Chevron warning signs at the curves
  const chevronPositions = [
    { x: CX, z: CZ + 16.5, rotY: 0 },
    { x: CX, z: CZ - 16.5, rotY: Math.PI },
    { x: CX - 12, z: CZ, rotY: Math.PI / 2 },
    { x: CX + 12, z: CZ, rotY: -Math.PI / 2 },
  ]

  chevronPositions.forEach(cp => {
    // Sign post
    const post = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 1.5, 4),
      MAT.steel
    )
    post.position.set(cp.x, 0.75, cp.z)
    post.castShadow = true
    group.add(post)

    // Chevron sign face
    const sign = new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 0.6, 0.05),
      MAT.yellow
    )
    sign.position.set(cp.x, 1.6, cp.z)
    sign.rotation.y = cp.rotY
    sign.castShadow = true
    group.add(sign)

    // Chevron arrow marks (V shapes approximated with thin boxes)
    for (let v = 0; v < 2; v++) {
      const chevL = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, 0.06, 0.04),
        MAT.black
      )
      chevL.position.set(cp.x - 0.1 + v * 0.3, 1.62, cp.z + 0.03)
      chevL.rotation.y = cp.rotY
      chevL.rotation.z = 0.4
      group.add(chevL)

      const chevR = chevL.clone()
      chevR.rotation.z = -0.4
      chevR.position.y = 1.58
      group.add(chevR)
    }
  })
}

// ══════════════════════════════════════════════════════════════════════════
//  VEHICLES — 2 go-karts + pickup truck with trailer
// ══════════════════════════════════════════════════════════════════════════

function _createVehicles(group, RAPIER, world) {
  // ── Go-karts in pit area ──
  const kartPositions = [
    { x: CX - 3, z: CZ + 19, rotY: 0.2, color: MAT.red },
    { x: CX - 1, z: CZ + 19, rotY: -0.1, color: MAT.blue },
  ]

  kartPositions.forEach(kp => {
    const kartGroup = new THREE.Group()

    // Body
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(0.6, 0.25, 1.0),
      kp.color
    )
    body.position.set(0, 0.25, 0)
    body.castShadow = true
    kartGroup.add(body)

    // Seat
    const seat = new THREE.Mesh(
      new THREE.BoxGeometry(0.35, 0.3, 0.3),
      MAT.black
    )
    seat.position.set(0, 0.4, 0.1)
    kartGroup.add(seat)

    // Steering wheel
    const wheel = new THREE.Mesh(
      new THREE.TorusGeometry(0.08, 0.02, 3, 6),
      MAT.black
    )
    wheel.position.set(0, 0.45, -0.2)
    wheel.rotation.x = Math.PI / 4
    kartGroup.add(wheel)

    // 4 wheels
    const wheelGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.08, 6)
    const wheelPositions = [
      { x: -0.35, z: -0.35 },
      { x: 0.35, z: -0.35 },
      { x: -0.35, z: 0.35 },
      { x: 0.35, z: 0.35 },
    ]
    wheelPositions.forEach(wp => {
      const w = new THREE.Mesh(wheelGeo, MAT.tire)
      w.position.set(wp.x, 0.1, wp.z)
      w.rotation.z = Math.PI / 2
      w.castShadow = true
      kartGroup.add(w)
    })

    // Roll bar
    const rollBar = new THREE.Mesh(
      new THREE.BoxGeometry(0.6, 0.04, 0.04),
      MAT.steel
    )
    rollBar.position.set(0, 0.55, 0.2)
    kartGroup.add(rollBar)

    const rollBarL = new THREE.Mesh(
      new THREE.BoxGeometry(0.04, 0.2, 0.04),
      MAT.steel
    )
    rollBarL.position.set(-0.28, 0.45, 0.2)
    kartGroup.add(rollBarL)

    const rollBarR = rollBarL.clone()
    rollBarR.position.x = 0.28
    kartGroup.add(rollBarR)

    kartGroup.position.set(kp.x, 0, kp.z)
    kartGroup.rotation.y = kp.rotY
    group.add(kartGroup)
  })

  // ── Pickup truck with trailer ──
  const tx = CX + 8
  const tz = CZ + 18

  const truckGroup = new THREE.Group()

  // Truck cab
  const cab = new THREE.Mesh(
    new THREE.BoxGeometry(1.4, 1.0, 1.6),
    MAT.green
  )
  cab.position.set(0, 0.7, -0.8)
  cab.castShadow = true
  truckGroup.add(cab)

  // Windshield
  const windshield = new THREE.Mesh(
    new THREE.BoxGeometry(1.2, 0.5, 0.05),
    MAT.blue
  )
  windshield.position.set(0, 1.0, -1.58)
  truckGroup.add(windshield)

  // Truck bed
  const bed = new THREE.Mesh(
    new THREE.BoxGeometry(1.4, 0.15, 2.0),
    MAT.green
  )
  bed.position.set(0, 0.4, 0.8)
  bed.castShadow = true
  truckGroup.add(bed)

  // Bed walls
  const bedWallGeo = new THREE.BoxGeometry(0.08, 0.5, 2.0)
  const bedWallL = new THREE.Mesh(bedWallGeo, MAT.green)
  bedWallL.position.set(-0.66, 0.65, 0.8)
  truckGroup.add(bedWallL)

  const bedWallR = new THREE.Mesh(bedWallGeo, MAT.green)
  bedWallR.position.set(0.66, 0.65, 0.8)
  truckGroup.add(bedWallR)

  const tailgate = new THREE.Mesh(
    new THREE.BoxGeometry(1.4, 0.5, 0.08),
    MAT.green
  )
  tailgate.position.set(0, 0.65, 1.8)
  truckGroup.add(tailgate)

  // Truck wheels
  const truckWheelGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.15, 6)
  const truckWheelPos = [
    { x: -0.8, z: -0.8 },
    { x: 0.8, z: -0.8 },
    { x: -0.8, z: 1.0 },
    { x: 0.8, z: 1.0 },
  ]
  truckWheelPos.forEach(wp => {
    const w = new THREE.Mesh(truckWheelGeo, MAT.tire)
    w.position.set(wp.x, 0.25, wp.z)
    w.rotation.z = Math.PI / 2
    w.castShadow = true
    truckGroup.add(w)
  })

  truckGroup.position.set(tx, 0, tz)
  truckGroup.rotation.y = Math.PI * 0.7
  group.add(truckGroup)

  // Trailer behind truck
  const trailerGroup = new THREE.Group()

  const trailerBed = new THREE.Mesh(
    new THREE.BoxGeometry(1.2, 0.1, 2.5),
    MAT.gray
  )
  trailerBed.position.set(0, 0.35, 0)
  trailerGroup.add(trailerBed)

  // Trailer walls
  const twGeo = new THREE.BoxGeometry(0.06, 0.4, 2.5)
  const twL = new THREE.Mesh(twGeo, MAT.gray)
  twL.position.set(-0.57, 0.5, 0)
  trailerGroup.add(twL)

  const twR = new THREE.Mesh(twGeo, MAT.gray)
  twR.position.set(0.57, 0.5, 0)
  trailerGroup.add(twR)

  // Trailer wheels
  const tWheelGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.12, 6)
  const twl = new THREE.Mesh(tWheelGeo, MAT.tire)
  twl.position.set(-0.65, 0.2, 0.5)
  twl.rotation.z = Math.PI / 2
  trailerGroup.add(twl)

  const twr = new THREE.Mesh(tWheelGeo, MAT.tire)
  twr.position.set(0.65, 0.2, 0.5)
  twr.rotation.z = Math.PI / 2
  trailerGroup.add(twr)

  // Hitch
  const hitch = new THREE.Mesh(
    new THREE.BoxGeometry(0.08, 0.08, 1.0),
    MAT.steel
  )
  hitch.position.set(0, 0.35, -1.7)
  trailerGroup.add(hitch)

  trailerGroup.position.set(tx + 2.5, 0, tz + 1.5)
  trailerGroup.rotation.y = Math.PI * 0.7
  group.add(trailerGroup)

  // Fixed colliders for truck + trailer
  const trBody = RAPIER.RigidBodyDesc.fixed().setTranslation(tx, 0.6, tz)
  const trRb = world.createRigidBody(trBody)
  world.createCollider(
    RAPIER.ColliderDesc.cuboid(0.8, 0.7, 1.2).setFriction(0.5),
    trRb
  )

  const tlBody = RAPIER.RigidBodyDesc.fixed().setTranslation(tx + 2.5, 0.45, tz + 1.5)
  const tlRb = world.createRigidBody(tlBody)
  world.createCollider(
    RAPIER.ColliderDesc.cuboid(0.65, 0.4, 1.3).setFriction(0.5),
    tlRb
  )
}

// ══════════════════════════════════════════════════════════════════════════
//  CHECKERED BEACH BALL (DYNAMIC)
// ══════════════════════════════════════════════════════════════════════════

function _createBeachBall(group, RAPIER, world, syncList) {
  const bx = CX + 2
  const bz = CZ + 10

  const ball = new THREE.Mesh(
    new THREE.SphereGeometry(0.4, 6, 5),
    MAT.white
  )

  // Add checkered pattern by manipulating vertex colors
  const ballGeo = ball.geometry
  const posAttr = ballGeo.getAttribute('position')
  const colors = new Float32Array(posAttr.count * 3)
  for (let i = 0; i < posAttr.count; i++) {
    const face = Math.floor(i / 3)
    const isBlack = face % 2 === 0
    colors[i * 3] = isBlack ? 0.1 : 1.0
    colors[i * 3 + 1] = isBlack ? 0.1 : 1.0
    colors[i * 3 + 2] = isBlack ? 0.1 : 1.0
  }
  ballGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  ball.material = new THREE.MeshStandardMaterial({
    vertexColors: true,
    flatShading: true,
  })
  ball.position.set(bx, 0.5, bz)
  ball.castShadow = true
  group.add(ball)

  const bodyDesc = RAPIER.RigidBodyDesc.dynamic()
    .setTranslation(bx, 0.5, bz)
    .setLinearDamping(0.3)
    .setAngularDamping(0.2)
  const body = world.createRigidBody(bodyDesc)
  world.createCollider(
    RAPIER.ColliderDesc.ball(0.4)
      .setDensity(1.5)
      .setRestitution(0.7)
      .setFriction(0.3),
    body
  )
  syncList.push({ mesh: ball, body })
}

// ══════════════════════════════════════════════════════════════════════════
//  GRAVEL TRAPS — at the corners of the oval
// ══════════════════════════════════════════════════════════════════════════

function _createGravelTraps(group) {
  const traps = [
    { x: CX, z: CZ + 17, w: 6, h: 3 },
    { x: CX, z: CZ - 17, w: 6, h: 3 },
    { x: CX - 13, z: CZ, w: 3, h: 5 },
    { x: CX + 13, z: CZ, w: 3, h: 5 },
  ]

  traps.forEach(t => {
    const gravel = new THREE.Mesh(
      new THREE.PlaneGeometry(t.w, t.h),
      MAT.gravel
    )
    gravel.rotation.x = -Math.PI / 2
    gravel.position.set(t.x, 0.016, t.z)
    gravel.receiveShadow = true
    group.add(gravel)

    // Scattered gravel stones
    for (let i = 0; i < 8; i++) {
      const stone = new THREE.Mesh(
        new THREE.SphereGeometry(0.06 + Math.random() * 0.05, 3, 2),
        MAT.gravel
      )
      stone.position.set(
        t.x + (Math.random() - 0.5) * t.w * 0.8,
        0.04,
        t.z + (Math.random() - 0.5) * t.h * 0.8
      )
      group.add(stone)
    }
  })
}
