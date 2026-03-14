import * as THREE from 'three'

// Zone center
const CX = 45
const CZ = -30

// Reusable helpers
const _v3 = new THREE.Vector3()

function mat(color, opts = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    flatShading: true,
    ...opts,
  })
}

function emissiveMat(color) {
  return new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: 0.8,
    flatShading: true,
  })
}

function shadow(mesh) {
  mesh.castShadow = true
  mesh.receiveShadow = true
  return mesh
}

// ─── Ferris Wheel ───────────────────────────────────────────────────────────

function createFerrisWheel(scene) {
  const group = new THREE.Group()
  group.position.set(CX + 8, 0, CZ - 5)

  // A-frame support legs
  const legGeo = new THREE.CylinderGeometry(0.2, 0.3, 10, 6)
  const legMat = mat(0x888888)

  const legL = shadow(new THREE.Mesh(legGeo, legMat))
  legL.position.set(-2.5, 5, -1)
  legL.rotation.z = 0.2
  group.add(legL)

  const legL2 = shadow(new THREE.Mesh(legGeo, legMat))
  legL2.position.set(-2.5, 5, 1)
  legL2.rotation.z = 0.2
  group.add(legL2)

  const legR = shadow(new THREE.Mesh(legGeo, legMat))
  legR.position.set(2.5, 5, -1)
  legR.rotation.z = -0.2
  group.add(legR)

  const legR2 = shadow(new THREE.Mesh(legGeo, legMat))
  legR2.position.set(2.5, 5, 1)
  legR2.rotation.z = -0.2
  group.add(legR2)

  // Cross brace between legs
  const braceGeo = new THREE.CylinderGeometry(0.12, 0.12, 5, 6)
  const braceL = shadow(new THREE.Mesh(braceGeo, legMat))
  braceL.position.set(-1.5, 3, 0)
  braceL.rotation.z = Math.PI / 2
  braceL.rotation.y = Math.PI / 4
  group.add(braceL)

  const braceR = shadow(new THREE.Mesh(braceGeo, legMat))
  braceR.position.set(1.5, 3, 0)
  braceR.rotation.z = Math.PI / 2
  braceR.rotation.y = -Math.PI / 4
  group.add(braceR)

  // Wheel group (rotates around Z)
  const wheelGroup = new THREE.Group()
  wheelGroup.position.set(0, 9, 0)

  // Central axle
  const axleGeo = new THREE.CylinderGeometry(0.4, 0.4, 1.5, 8)
  const axle = shadow(new THREE.Mesh(axleGeo, mat(0x555555)))
  axle.rotation.x = Math.PI / 2
  wheelGroup.add(axle)

  // Main ring
  const ringGeo = new THREE.TorusGeometry(7, 0.25, 6, 24)
  const ring = shadow(new THREE.Mesh(ringGeo, mat(0xff2222)))
  wheelGroup.add(ring)

  // Inner ring for structure
  const innerRingGeo = new THREE.TorusGeometry(3.5, 0.15, 6, 24)
  const innerRing = shadow(new THREE.Mesh(innerRingGeo, mat(0xff4444)))
  wheelGroup.add(innerRing)

  // Spokes
  const spokeGeo = new THREE.CylinderGeometry(0.08, 0.08, 14, 6)
  const spokeMat = mat(0xcccccc)
  const NUM_GONDOLAS = 8

  for (let i = 0; i < NUM_GONDOLAS; i++) {
    const angle = (i / NUM_GONDOLAS) * Math.PI * 2
    const spoke = shadow(new THREE.Mesh(spokeGeo, spokeMat))
    spoke.position.set(0, 0, 0)
    spoke.rotation.z = angle
    wheelGroup.add(spoke)
  }

  // Gondola cars
  const gondolas = []
  const gondolaColors = [0xff4444, 0x4444ff, 0x44ff44, 0xffff00, 0xff8800, 0xff44ff, 0x44ffff, 0xffffff]
  const gondolaBodyGeo = new THREE.BoxGeometry(1.0, 0.8, 0.8, 1, 1, 1)
  const gondolaArmGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.2, 4)

  for (let i = 0; i < NUM_GONDOLAS; i++) {
    const angle = (i / NUM_GONDOLAS) * Math.PI * 2
    const gx = Math.cos(angle) * 7
    const gy = Math.sin(angle) * 7

    const gondolaContainer = new THREE.Group()
    gondolaContainer.position.set(gx, gy, 0)

    // Arm connecting to ring
    const arm = shadow(new THREE.Mesh(gondolaArmGeo, spokeMat))
    arm.position.set(0, -0.6, 0)
    gondolaContainer.add(arm)

    // Gondola box
    const box = shadow(new THREE.Mesh(gondolaBodyGeo, mat(gondolaColors[i % gondolaColors.length])))
    box.position.set(0, -1.2, 0)
    gondolaContainer.add(box)

    wheelGroup.add(gondolaContainer)
    gondolas.push(gondolaContainer)
  }

  group.add(wheelGroup)
  scene.add(group)

  return { group, wheelGroup, gondolas }
}

// ─── Carousel ───────────────────────────────────────────────────────────────

function createCarousel(scene) {
  const group = new THREE.Group()
  group.position.set(CX - 5, 0, CZ + 2)

  // Platform base (static)
  const baseGeo = new THREE.CylinderGeometry(4.5, 4.5, 0.3, 12)
  const base = shadow(new THREE.Mesh(baseGeo, mat(0xdddddd)))
  base.position.y = 0.15
  group.add(base)

  // Rotating part
  const spinGroup = new THREE.Group()
  spinGroup.position.y = 0.3

  // Platform deck
  const deckGeo = new THREE.CylinderGeometry(4.2, 4.2, 0.15, 12)
  const deck = shadow(new THREE.Mesh(deckGeo, mat(0xff4466)))
  deck.position.y = 0.075
  spinGroup.add(deck)

  // Inner ring decoration
  const innerDeckGeo = new THREE.CylinderGeometry(2, 2, 0.2, 12)
  const innerDeck = shadow(new THREE.Mesh(innerDeckGeo, mat(0xffcc00)))
  innerDeck.position.y = 0.1
  spinGroup.add(innerDeck)

  // Center pole
  const poleGeo = new THREE.CylinderGeometry(0.25, 0.25, 5, 8)
  const pole = shadow(new THREE.Mesh(poleGeo, mat(0xddaa00)))
  pole.position.y = 2.5
  spinGroup.add(pole)

  // Conical roof
  const roofGeo = new THREE.ConeGeometry(5, 2, 12)
  const roof = shadow(new THREE.Mesh(roofGeo, mat(0xff2244)))
  roof.position.y = 5.5
  spinGroup.add(roof)

  // Roof trim ring
  const trimGeo = new THREE.TorusGeometry(5, 0.15, 6, 12)
  const trim = shadow(new THREE.Mesh(trimGeo, mat(0xffdd00)))
  trim.position.y = 4.5
  trim.rotation.x = Math.PI / 2
  spinGroup.add(trim)

  // Horses on poles
  const NUM_HORSES = 6
  const horseColors = [0xff3333, 0x3333ff, 0x33ff33, 0xffff33, 0xff33ff, 0x33ffff]

  for (let i = 0; i < NUM_HORSES; i++) {
    const angle = (i / NUM_HORSES) * Math.PI * 2
    const hx = Math.cos(angle) * 3.2
    const hz = Math.sin(angle) * 3.2

    // Pole
    const hPoleGeo = new THREE.CylinderGeometry(0.08, 0.08, 4, 6)
    const hPole = shadow(new THREE.Mesh(hPoleGeo, mat(0xddaa00)))
    hPole.position.set(hx, 2.2, hz)
    spinGroup.add(hPole)

    // Horse body
    const horseGroup = new THREE.Group()
    horseGroup.position.set(hx, 1.5, hz)
    horseGroup.rotation.y = -angle + Math.PI / 2

    const bodyGeo = new THREE.BoxGeometry(1.2, 0.5, 0.5, 1, 1, 1)
    const body = shadow(new THREE.Mesh(bodyGeo, mat(horseColors[i])))
    horseGroup.add(body)

    // Head
    const headGeo = new THREE.BoxGeometry(0.35, 0.5, 0.35, 1, 1, 1)
    const head = shadow(new THREE.Mesh(headGeo, mat(horseColors[i])))
    head.position.set(0.6, 0.35, 0)
    horseGroup.add(head)

    // Legs
    const legGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.6, 4)
    const legMaterial = mat(horseColors[i])
    const positions = [
      [0.4, -0.55, 0.15],
      [0.4, -0.55, -0.15],
      [-0.4, -0.55, 0.15],
      [-0.4, -0.55, -0.15],
    ]
    for (const [lx, ly, lz] of positions) {
      const leg = shadow(new THREE.Mesh(legGeo, legMaterial))
      leg.position.set(lx, ly, lz)
      horseGroup.add(leg)
    }

    spinGroup.add(horseGroup)
  }

  // Lights around the roof edge
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2
    const lx = Math.cos(angle) * 4.8
    const lz = Math.sin(angle) * 4.8
    const bulbGeo = new THREE.SphereGeometry(0.12, 6, 6)
    const bulbColors = [0xffff00, 0xff4444, 0x4444ff, 0x44ff44]
    const bulb = new THREE.Mesh(bulbGeo, emissiveMat(bulbColors[i % bulbColors.length]))
    bulb.position.set(lx, 4.5, lz)
    spinGroup.add(bulb)
  }

  group.add(spinGroup)
  scene.add(group)

  return { group, spinGroup }
}

// ─── Game Booths ────────────────────────────────────────────────────────────

function createGameBooths(scene, RAPIER, world, syncList) {
  const boothPositions = [
    { x: CX - 10, z: CZ - 10, ry: 0.3 },
    { x: CX - 7, z: CZ - 13, ry: 0.1 },
    { x: CX - 4, z: CZ - 10, ry: -0.2 },
  ]

  boothPositions.forEach((pos, idx) => {
    const boothGroup = new THREE.Group()
    boothGroup.position.set(pos.x, 0, pos.z)
    boothGroup.rotation.y = pos.ry

    // Back wall
    const wallGeo = new THREE.BoxGeometry(3, 2.5, 0.15, 1, 1, 1)
    const wall = shadow(new THREE.Mesh(wallGeo, mat(0xeebb44)))
    wall.position.set(0, 1.25, -1.2)
    boothGroup.add(wall)

    // Side walls
    const sideGeo = new THREE.BoxGeometry(0.15, 2.5, 2.4, 1, 1, 1)
    const sideMatL = mat(0xddaa33)
    const sideL = shadow(new THREE.Mesh(sideGeo, sideMatL))
    sideL.position.set(-1.5, 1.25, 0)
    boothGroup.add(sideL)

    const sideR = shadow(new THREE.Mesh(sideGeo, sideMatL))
    sideR.position.set(1.5, 1.25, 0)
    boothGroup.add(sideR)

    // Counter
    const counterGeo = new THREE.BoxGeometry(3, 0.15, 1, 1, 1, 1)
    const counter = shadow(new THREE.Mesh(counterGeo, mat(0x885522)))
    counter.position.set(0, 1.0, 0.5)
    boothGroup.add(counter)

    // Striped awning
    const awningColors = [0xff2222, 0xffffff]
    const stripeWidth = 0.5
    for (let s = 0; s < 6; s++) {
      const stripeGeo = new THREE.BoxGeometry(stripeWidth, 0.06, 1.8, 1, 1, 1)
      const stripe = shadow(new THREE.Mesh(stripeGeo, mat(awningColors[s % 2])))
      stripe.position.set(-1.25 + s * stripeWidth, 2.7, 0)
      stripe.rotation.z = -0.15
      boothGroup.add(stripe)
    }

    // Static collider for booth
    const boothBody = world.createRigidBody(
      RAPIER.RigidBodyDesc.fixed().setTranslation(pos.x, 1.25, pos.z)
    )
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(1.5, 1.25, 1.2).setFriction(0.5),
      boothBody
    )

    // Booth-specific contents
    if (idx === 0) {
      // Stacked bottles (dynamic, knockable)
      const bottleGeo = new THREE.CylinderGeometry(0.1, 0.12, 0.4, 6)
      const bottleMat = mat(0x88aaff)
      const bottlePositions = [
        [0, 1.3, -0.5],
        [-0.3, 1.3, -0.5],
        [0.3, 1.3, -0.5],
        [-0.15, 1.7, -0.5],
        [0.15, 1.7, -0.5],
        [0, 2.1, -0.5],
      ]

      for (const [bx, by, bz] of bottlePositions) {
        const wx = pos.x + bx
        const wy = by
        const wz = pos.z + bz

        const bottle = shadow(new THREE.Mesh(bottleGeo, bottleMat))
        bottle.position.set(wx, wy, wz)
        scene.add(bottle)

        const body = world.createRigidBody(
          RAPIER.RigidBodyDesc.dynamic()
            .setTranslation(wx, wy, wz)
            .setLinearDamping(0.4)
            .setAngularDamping(0.5)
        )
        world.createCollider(
          RAPIER.ColliderDesc.cylinder(0.2, 0.12)
            .setDensity(3.0)
            .setFriction(0.4)
            .setRestitution(0.15),
          body
        )
        syncList.push({ mesh: bottle, body })
      }
    } else if (idx === 1) {
      // Balloon targets
      const balloonGeo = new THREE.SphereGeometry(0.2, 6, 6)
      const stickGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.6, 4)
      const stickMat = mat(0x886633)
      const balloonColors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff]

      for (let b = 0; b < 5; b++) {
        const bx = -0.8 + b * 0.4
        const stick = shadow(new THREE.Mesh(stickGeo, stickMat))
        stick.position.set(bx, 1.4, -0.5)
        boothGroup.add(stick)

        const balloon = shadow(new THREE.Mesh(balloonGeo, mat(balloonColors[b])))
        balloon.position.set(bx, 1.8, -0.5)
        boothGroup.add(balloon)
      }
    } else {
      // Prize shelf with stuffed animals
      const shelfGeo = new THREE.BoxGeometry(2.5, 0.08, 0.5, 1, 1, 1)
      const shelf = shadow(new THREE.Mesh(shelfGeo, mat(0x885522)))
      shelf.position.set(0, 1.8, -0.8)
      boothGroup.add(shelf)

      // Stuffed animals: simple sphere+cone combos
      const animalColors = [0xff88aa, 0x88aaff, 0xaaff88, 0xffdd66]
      for (let a = 0; a < 4; a++) {
        const ax = -0.75 + a * 0.5
        // Body
        const animalBody = shadow(new THREE.Mesh(
          new THREE.SphereGeometry(0.18, 6, 6),
          mat(animalColors[a])
        ))
        animalBody.position.set(ax, 2.05, -0.8)
        boothGroup.add(animalBody)
        // Ears
        const earGeo = new THREE.ConeGeometry(0.06, 0.12, 4)
        const earMaterial = mat(animalColors[a])
        const earL = shadow(new THREE.Mesh(earGeo, earMaterial))
        earL.position.set(ax - 0.1, 2.28, -0.8)
        boothGroup.add(earL)
        const earR = shadow(new THREE.Mesh(earGeo, earMaterial))
        earR.position.set(ax + 0.1, 2.28, -0.8)
        boothGroup.add(earR)
      }
    }

    scene.add(boothGroup)
  })
}

// ─── Roller Coaster Segment ─────────────────────────────────────────────────

function createRollerCoaster(scene, RAPIER, world) {
  const rcGroup = new THREE.Group()
  const trackCenterX = CX + 12
  const trackCenterZ = CZ + 10

  const trackMat = mat(0xcc3333)
  const pillarMat = mat(0x888888)
  const railMat = mat(0x444444)

  // Arc track segments
  const NUM_SEGMENTS = 16
  const arcRadius = 10
  const arcStart = -Math.PI * 0.4
  const arcEnd = Math.PI * 0.4

  for (let i = 0; i < NUM_SEGMENTS; i++) {
    const t = i / NUM_SEGMENTS
    const angle = arcStart + (arcEnd - arcStart) * t
    const nextAngle = arcStart + (arcEnd - arcStart) * ((i + 1) / NUM_SEGMENTS)

    const x = trackCenterX + Math.cos(angle) * arcRadius
    const z = trackCenterZ + Math.sin(angle) * arcRadius
    const nx = trackCenterX + Math.cos(nextAngle) * arcRadius
    const nz = trackCenterZ + Math.sin(nextAngle) * arcRadius

    // Height varies for hills
    const height = 3 + Math.sin(t * Math.PI * 2) * 2

    const dx = nx - x
    const dz = nz - z
    const len = Math.sqrt(dx * dx + dz * dz)
    const midX = (x + nx) / 2
    const midZ = (z + nz) / 2

    // Track segment
    const segGeo = new THREE.BoxGeometry(len, 0.15, 1.2, 1, 1, 1)
    const seg = shadow(new THREE.Mesh(segGeo, trackMat))
    seg.position.set(midX, height, midZ)
    seg.rotation.y = -Math.atan2(dz, dx)
    rcGroup.add(seg)

    // Rails
    for (const rOffset of [-0.5, 0.5]) {
      const railGeo = new THREE.BoxGeometry(len, 0.1, 0.08, 1, 1, 1)
      const rail = shadow(new THREE.Mesh(railGeo, railMat))
      rail.position.set(midX, height + 0.12, midZ)
      rail.rotation.y = seg.rotation.y
      // Offset the rail sideways
      rail.position.x += Math.sin(seg.rotation.y) * rOffset
      rail.position.z += Math.cos(seg.rotation.y) * rOffset
      rcGroup.add(rail)
    }

    // Support pillars every 2 segments
    if (i % 2 === 0) {
      const pillarH = height
      const pillarGeo = new THREE.CylinderGeometry(0.15, 0.2, pillarH, 6)
      const pillar = shadow(new THREE.Mesh(pillarGeo, pillarMat))
      pillar.position.set(midX, pillarH / 2, midZ)
      rcGroup.add(pillar)

      // Static collider for pillars
      const pillarBody = world.createRigidBody(
        RAPIER.RigidBodyDesc.fixed().setTranslation(midX, pillarH / 2, midZ)
      )
      world.createCollider(
        RAPIER.ColliderDesc.cuboid(0.2, pillarH / 2, 0.2).setFriction(0.5),
        pillarBody
      )
    }
  }

  // Cart on the track
  const cartGroup = new THREE.Group()
  const cartBodyGeo = new THREE.BoxGeometry(0.8, 0.5, 1.0, 1, 1, 1)
  const cartBody = shadow(new THREE.Mesh(cartBodyGeo, mat(0x2244ff)))
  cartBody.position.y = 0.35
  cartGroup.add(cartBody)

  const cartSeatGeo = new THREE.BoxGeometry(0.6, 0.3, 0.3, 1, 1, 1)
  const cartSeat = shadow(new THREE.Mesh(cartSeatGeo, mat(0xffcc00)))
  cartSeat.position.set(0, 0.55, -0.15)
  cartGroup.add(cartSeat)

  // Place cart at start of track
  const startAngle = arcStart + (arcEnd - arcStart) * 0.3
  cartGroup.position.set(
    trackCenterX + Math.cos(startAngle) * arcRadius,
    3 + Math.sin(0.3 * Math.PI * 2) * 2,
    trackCenterZ + Math.sin(startAngle) * arcRadius
  )
  cartGroup.rotation.y = -startAngle + Math.PI / 2
  rcGroup.add(cartGroup)

  scene.add(rcGroup)
}

// ─── Entry Arch / Gate ──────────────────────────────────────────────────────

function createEntryArch(scene, RAPIER, world) {
  const archGroup = new THREE.Group()
  // Face toward origin: gate positioned on the side closest to (0,0,0)
  const gateX = CX - 18
  const gateZ = CZ + 12

  archGroup.position.set(gateX, 0, gateZ)
  // Rotate to face toward origin
  archGroup.rotation.y = Math.atan2(-gateX, -gateZ)

  // Two pillars
  const pillarGeo = new THREE.CylinderGeometry(0.4, 0.5, 6, 8)
  const pillarMat = mat(0xcc2222)
  const pillarL = shadow(new THREE.Mesh(pillarGeo, pillarMat))
  pillarL.position.set(-3, 3, 0)
  archGroup.add(pillarL)

  const pillarR = shadow(new THREE.Mesh(pillarGeo, pillarMat))
  pillarR.position.set(3, 3, 0)
  archGroup.add(pillarR)

  // Pillar caps
  const capGeo = new THREE.SphereGeometry(0.5, 6, 6)
  const capMat = mat(0xffdd00)
  const capL = shadow(new THREE.Mesh(capGeo, capMat))
  capL.position.set(-3, 6.2, 0)
  archGroup.add(capL)
  const capR = shadow(new THREE.Mesh(capGeo, capMat))
  capR.position.set(3, 6.2, 0)
  archGroup.add(capR)

  // Curved top - approximate with boxes
  const archTopSegments = 8
  for (let i = 0; i <= archTopSegments; i++) {
    const t = i / archTopSegments
    const angle = Math.PI * t
    const ax = -3 + 6 * t
    const ay = 6.5 + Math.sin(angle) * 1.5
    const segGeo = new THREE.BoxGeometry(0.9, 0.5, 0.6, 1, 1, 1)
    const segColor = i % 2 === 0 ? 0xff4444 : 0xffdd00
    const seg = shadow(new THREE.Mesh(segGeo, mat(segColor)))
    seg.position.set(ax, ay, 0)
    archGroup.add(seg)
  }

  // "AMUSEMENT PARK" sign - decorative colored blocks
  const signGeo = new THREE.BoxGeometry(5, 0.8, 0.3, 1, 1, 1)
  const sign = shadow(new THREE.Mesh(signGeo, mat(0x2222cc)))
  sign.position.set(0, 7.8, 0)
  archGroup.add(sign)

  // Static colliders for pillars
  const bodyL = world.createRigidBody(
    RAPIER.RigidBodyDesc.fixed().setTranslation(gateX - 3, 3, gateZ)
  )
  world.createCollider(RAPIER.ColliderDesc.cuboid(0.5, 3, 0.5).setFriction(0.5), bodyL)

  const bodyR = world.createRigidBody(
    RAPIER.RigidBodyDesc.fixed().setTranslation(gateX + 3, 3, gateZ)
  )
  world.createCollider(RAPIER.ColliderDesc.cuboid(0.5, 3, 0.5).setFriction(0.5), bodyR)

  scene.add(archGroup)
}

// ─── Ticket Booth ───────────────────────────────────────────────────────────

function createTicketBooth(scene, RAPIER, world) {
  const group = new THREE.Group()
  group.position.set(CX - 15, 0, CZ + 8)

  // Main box
  const boothGeo = new THREE.BoxGeometry(1.8, 2.2, 1.5, 1, 1, 1)
  const booth = shadow(new THREE.Mesh(boothGeo, mat(0xffcc33)))
  booth.position.y = 1.1
  group.add(booth)

  // Roof
  const roofGeo = new THREE.BoxGeometry(2.2, 0.2, 1.9, 1, 1, 1)
  const roof = shadow(new THREE.Mesh(roofGeo, mat(0xcc2222)))
  roof.position.y = 2.3
  group.add(roof)

  // Window opening (dark inset)
  const windowGeo = new THREE.BoxGeometry(1.0, 0.8, 0.05, 1, 1, 1)
  const window = new THREE.Mesh(windowGeo, mat(0x224466))
  window.position.set(0, 1.5, 0.76)
  group.add(window)

  // "TICKETS" sign block
  const signGeo = new THREE.BoxGeometry(1.5, 0.3, 0.1, 1, 1, 1)
  const signMesh = shadow(new THREE.Mesh(signGeo, mat(0xff4444)))
  signMesh.position.set(0, 2.0, 0.78)
  group.add(signMesh)

  // Static collider
  const body = world.createRigidBody(
    RAPIER.RigidBodyDesc.fixed().setTranslation(CX - 15, 1.1, CZ + 8)
  )
  world.createCollider(RAPIER.ColliderDesc.cuboid(0.9, 1.1, 0.75).setFriction(0.5), body)

  scene.add(group)
}

// ─── Balloon Cluster ────────────────────────────────────────────────────────

function createBalloonCluster(scene) {
  const group = new THREE.Group()
  group.position.set(CX + 2, 0, CZ - 3)

  // Weight at bottom
  const weightGeo = new THREE.BoxGeometry(0.4, 0.3, 0.4, 1, 1, 1)
  const weight = shadow(new THREE.Mesh(weightGeo, mat(0x555555)))
  weight.position.y = 0.15
  group.add(weight)

  // Balloons
  const balloonColors = [0xff2222, 0x2222ff, 0x22ff22, 0xffff22, 0xff22ff, 0xff8800]
  const stringGeo = new THREE.CylinderGeometry(0.015, 0.015, 3, 4)
  const stringMat = mat(0x888888)

  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2
    const bx = Math.cos(angle) * 0.3
    const bz = Math.sin(angle) * 0.3
    const by = 3.5 + Math.random() * 1.0

    const balloon = shadow(new THREE.Mesh(
      new THREE.SphereGeometry(0.3, 6, 6),
      mat(balloonColors[i])
    ))
    balloon.position.set(bx, by, bz)
    balloon.scale.y = 1.3
    group.add(balloon)

    // String
    const string = new THREE.Mesh(stringGeo, stringMat)
    string.position.set(bx, by / 2, bz)
    string.scale.y = by / 3
    group.add(string)

    // Knot at bottom of balloon
    const knotGeo = new THREE.ConeGeometry(0.06, 0.12, 4)
    const knot = shadow(new THREE.Mesh(knotGeo, mat(balloonColors[i])))
    knot.position.set(bx, by - 0.35, bz)
    knot.rotation.x = Math.PI
    group.add(knot)
  }

  scene.add(group)
}

// ─── Cotton Candy Cart ──────────────────────────────────────────────────────

function createCottonCandyCart(scene, RAPIER, world) {
  const group = new THREE.Group()
  group.position.set(CX - 2, 0, CZ - 8)

  // Cart body
  const cartGeo = new THREE.BoxGeometry(1.5, 1.0, 1.0, 1, 1, 1)
  const cart = shadow(new THREE.Mesh(cartGeo, mat(0xffffff)))
  cart.position.y = 1.0
  group.add(cart)

  // Wheels
  const wheelGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.1, 8)
  const wheelMat = mat(0x333333)
  const wheelPositions = [
    [0.7, 0.35, 0.55],
    [0.7, 0.35, -0.55],
    [-0.7, 0.35, 0.55],
    [-0.7, 0.35, -0.55],
  ]
  for (const [wx, wy, wz] of wheelPositions) {
    const wheel = shadow(new THREE.Mesh(wheelGeo, wheelMat))
    wheel.position.set(wx, wy, wz)
    wheel.rotation.x = Math.PI / 2
    group.add(wheel)
  }

  // Big pink cotton candy sphere
  const ccGeo = new THREE.SphereGeometry(0.8, 8, 8)
  const cc = shadow(new THREE.Mesh(ccGeo, mat(0xff88cc)))
  cc.position.set(0, 2.2, 0)
  group.add(cc)

  // Stick
  const stickGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.8, 4)
  const stick = shadow(new THREE.Mesh(stickGeo, mat(0xdddddd)))
  stick.position.set(0, 1.6, 0)
  group.add(stick)

  // Canopy
  const canopyGeo = new THREE.BoxGeometry(1.8, 0.1, 1.3, 1, 1, 1)
  const canopy = shadow(new THREE.Mesh(canopyGeo, mat(0xff66aa)))
  canopy.position.set(0, 2.8, 0)
  group.add(canopy)

  // Static collider
  const body = world.createRigidBody(
    RAPIER.RigidBodyDesc.fixed().setTranslation(CX - 2, 1.0, CZ - 8)
  )
  world.createCollider(RAPIER.ColliderDesc.cuboid(0.75, 0.5, 0.5).setFriction(0.5), body)

  scene.add(group)
}

// ─── Popcorn Machine ────────────────────────────────────────────────────────

function createPopcornMachine(scene, RAPIER, world) {
  const group = new THREE.Group()
  group.position.set(CX + 3, 0, CZ - 12)

  // Box body
  const boxGeo = new THREE.BoxGeometry(1.0, 1.5, 1.0, 1, 1, 1)
  const box = shadow(new THREE.Mesh(boxGeo, mat(0xcc2222)))
  box.position.y = 1.25
  group.add(box)

  // Glass front (semi-transparent)
  const glassGeo = new THREE.BoxGeometry(0.9, 1.0, 0.05, 1, 1, 1)
  const glass = new THREE.Mesh(glassGeo, new THREE.MeshStandardMaterial({
    color: 0xaaddff,
    flatShading: true,
    transparent: true,
    opacity: 0.4,
  }))
  glass.position.set(0, 1.2, 0.52)
  group.add(glass)

  // Popcorn kernels inside
  const kernelGeo = new THREE.SphereGeometry(0.08, 4, 4)
  const kernelMat = mat(0xffee44)
  for (let i = 0; i < 15; i++) {
    const kx = (Math.random() - 0.5) * 0.6
    const ky = 0.8 + Math.random() * 0.8
    const kz = (Math.random() - 0.5) * 0.6
    const kernel = shadow(new THREE.Mesh(kernelGeo, kernelMat))
    kernel.position.set(kx, ky, kz)
    group.add(kernel)
  }

  // Roof
  const roofGeo = new THREE.BoxGeometry(1.2, 0.15, 1.2, 1, 1, 1)
  const roof = shadow(new THREE.Mesh(roofGeo, mat(0xcc2222)))
  roof.position.y = 2.1
  group.add(roof)

  // Legs
  const legGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.5, 6)
  const legMaterial = mat(0x888888)
  for (const [lx, lz] of [[0.35, 0.35], [0.35, -0.35], [-0.35, 0.35], [-0.35, -0.35]]) {
    const leg = shadow(new THREE.Mesh(legGeo, legMaterial))
    leg.position.set(lx, 0.25, lz)
    group.add(leg)
  }

  // Static collider
  const body = world.createRigidBody(
    RAPIER.RigidBodyDesc.fixed().setTranslation(CX + 3, 1.0, CZ - 12)
  )
  world.createCollider(RAPIER.ColliderDesc.cuboid(0.5, 1.0, 0.5).setFriction(0.5), body)

  scene.add(group)
}

// ─── String Lights ──────────────────────────────────────────────────────────

function createStringLights(scene) {
  const lightColor = [0xffff44, 0xff4444, 0x44ff44, 0x4444ff, 0xff88ff, 0xff8844]

  // Define lines between attractions
  const lines = [
    // Ferris wheel area to carousel area
    { from: [CX + 5, 5, CZ - 2], to: [CX - 2, 5, CZ + 2], count: 10 },
    // Carousel to booths
    { from: [CX - 5, 4, CZ], to: [CX - 8, 3.5, CZ - 8], count: 8 },
    // Entry arch toward ticket booth
    { from: [CX - 16, 4.5, CZ + 10], to: [CX - 13, 3.5, CZ + 7], count: 6 },
    // Across the park
    { from: [CX + 8, 4, CZ + 5], to: [CX - 3, 4, CZ - 5], count: 12 },
    // Near roller coaster
    { from: [CX + 6, 4, CZ + 6], to: [CX + 15, 4, CZ + 12], count: 8 },
  ]

  const bulbGeo = new THREE.SphereGeometry(0.1, 6, 6)

  lines.forEach((line) => {
    const fx = line.from[0], fy = line.from[1], fz = line.from[2]
    const tx = line.to[0], ty = line.to[1], tz = line.to[2]

    for (let i = 0; i < line.count; i++) {
      const t = i / (line.count - 1)
      const x = fx + (tx - fx) * t
      const z = fz + (tz - fz) * t
      // Catenary sag
      const sag = Math.sin(t * Math.PI) * 0.8
      const y = fy + (ty - fy) * t - sag

      const bulb = new THREE.Mesh(
        bulbGeo,
        emissiveMat(lightColor[i % lightColor.length])
      )
      bulb.position.set(x, y, z)
      scene.add(bulb)
    }

    // Wire between bulbs (thin line using a stretched box)
    const dx = tx - fx
    const dy = ty - fy
    const dz = tz - fz
    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
    const wireGeo = new THREE.CylinderGeometry(0.015, 0.015, dist, 4)
    const wire = new THREE.Mesh(wireGeo, mat(0x222222))
    wire.position.set((fx + tx) / 2, (fy + ty) / 2, (fz + tz) / 2)
    wire.lookAt(tx, ty, tz)
    wire.rotateX(Math.PI / 2)
    scene.add(wire)
  })
}

// ─── Pennant Flags ──────────────────────────────────────────────────────────

function createPennantFlags(scene) {
  const flagColors = [0xff2222, 0xffff22, 0x2222ff, 0x22ff22, 0xff22ff, 0xff8822, 0x22ffff, 0xffffff]

  // Rope line
  const ropeStart = new THREE.Vector3(CX - 12, 4, CZ + 3)
  const ropeEnd = new THREE.Vector3(CX + 1, 4.5, CZ - 1)

  // Rope wire
  const ropeDist = ropeStart.distanceTo(ropeEnd)
  const ropeGeo = new THREE.CylinderGeometry(0.02, 0.02, ropeDist, 4)
  const rope = new THREE.Mesh(ropeGeo, mat(0x664422))
  const mid = ropeStart.clone().add(ropeEnd).multiplyScalar(0.5)
  rope.position.copy(mid)
  rope.lookAt(ropeEnd)
  rope.rotateX(Math.PI / 2)
  scene.add(rope)

  // Triangular pennant flags
  const flagGeo = new THREE.BufferGeometry()
  const vertices = new Float32Array([
    0, 0, 0,
    0.3, 0, 0,
    0.15, -0.5, 0,
  ])
  flagGeo.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
  flagGeo.computeVertexNormals()

  for (let i = 0; i < 8; i++) {
    const t = (i + 0.5) / 8
    const pos = ropeStart.clone().lerp(ropeEnd, t)
    // Add catenary sag
    pos.y -= Math.sin(t * Math.PI) * 0.4

    const flag = new THREE.Mesh(flagGeo, mat(flagColors[i % flagColors.length]))
    flag.material.side = THREE.DoubleSide
    flag.position.copy(pos)
    flag.rotation.y = Math.random() * 0.5 - 0.25
    flag.castShadow = true
    scene.add(flag)
  }
}

// ─── Garbage Bins (Clown Styled) ────────────────────────────────────────────

function createGarbageBins(scene, RAPIER, world) {
  const binPositions = [
    [CX - 8, CZ + 4],
    [CX + 4, CZ + 5],
    [CX + 10, CZ - 10],
    [CX - 3, CZ - 14],
  ]

  binPositions.forEach(([bx, bz]) => {
    const binGroup = new THREE.Group()
    binGroup.position.set(bx, 0, bz)

    // Body (cylinder)
    const bodyGeo = new THREE.CylinderGeometry(0.35, 0.4, 1.0, 8)
    const body = shadow(new THREE.Mesh(bodyGeo, mat(0x44aa44)))
    body.position.y = 0.5
    binGroup.add(body)

    // Clown face: eyes (small spheres)
    const eyeGeo = new THREE.SphereGeometry(0.06, 6, 6)
    const eyeMat = mat(0xffffff)
    const eyeL = new THREE.Mesh(eyeGeo, eyeMat)
    eyeL.position.set(-0.12, 0.7, 0.35)
    binGroup.add(eyeL)
    const eyeR = new THREE.Mesh(eyeGeo, eyeMat)
    eyeR.position.set(0.12, 0.7, 0.35)
    binGroup.add(eyeR)

    // Pupils
    const pupilGeo = new THREE.SphereGeometry(0.03, 4, 4)
    const pupilMat = mat(0x000000)
    const pupilL = new THREE.Mesh(pupilGeo, pupilMat)
    pupilL.position.set(-0.12, 0.7, 0.38)
    binGroup.add(pupilL)
    const pupilR = new THREE.Mesh(pupilGeo, pupilMat)
    pupilR.position.set(0.12, 0.7, 0.38)
    binGroup.add(pupilR)

    // Nose (red sphere)
    const noseGeo = new THREE.SphereGeometry(0.08, 6, 6)
    const nose = shadow(new THREE.Mesh(noseGeo, mat(0xff0000)))
    nose.position.set(0, 0.55, 0.38)
    binGroup.add(nose)

    // Mouth (thin red box)
    const mouthGeo = new THREE.BoxGeometry(0.2, 0.04, 0.04, 1, 1, 1)
    const mouth = new THREE.Mesh(mouthGeo, mat(0xff0000))
    mouth.position.set(0, 0.4, 0.38)
    mouth.rotation.z = 0.1
    binGroup.add(mouth)

    // Hat (cone on top)
    const hatGeo = new THREE.ConeGeometry(0.3, 0.5, 8)
    const hat = shadow(new THREE.Mesh(hatGeo, mat(0xff4444)))
    hat.position.y = 1.3
    binGroup.add(hat)

    // Lid
    const lidGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.06, 8)
    const lid = shadow(new THREE.Mesh(lidGeo, mat(0x338833)))
    lid.position.y = 1.03
    binGroup.add(lid)

    // Static collider
    const binBody = world.createRigidBody(
      RAPIER.RigidBodyDesc.fixed().setTranslation(bx, 0.5, bz)
    )
    world.createCollider(RAPIER.ColliderDesc.cylinder(0.5, 0.4).setFriction(0.5), binBody)

    scene.add(binGroup)
  })
}

// ─── Strength Test Tower ────────────────────────────────────────────────────

function createStrengthTower(scene, RAPIER, world) {
  const group = new THREE.Group()
  group.position.set(CX + 15, 0, CZ - 2)

  // Base
  const baseGeo = new THREE.BoxGeometry(1.2, 0.4, 1.2, 1, 1, 1)
  const base = shadow(new THREE.Mesh(baseGeo, mat(0x884422)))
  base.position.y = 0.2
  group.add(base)

  // Tall tower
  const towerGeo = new THREE.BoxGeometry(0.5, 7, 0.5, 1, 1, 1)
  const tower = shadow(new THREE.Mesh(towerGeo, mat(0xcc3333)))
  tower.position.y = 3.7
  group.add(tower)

  // Measurement markings (colored stripes)
  const markColors = [0x22cc22, 0xcccc22, 0xff8800, 0xff2222]
  for (let i = 0; i < 4; i++) {
    const markGeo = new THREE.BoxGeometry(0.52, 0.1, 0.52, 1, 1, 1)
    const mark = shadow(new THREE.Mesh(markGeo, mat(markColors[i])))
    mark.position.set(0, 1.5 + i * 1.5, 0)
    group.add(mark)
  }

  // Slider
  const sliderGeo = new THREE.BoxGeometry(0.55, 0.4, 0.55, 1, 1, 1)
  const slider = shadow(new THREE.Mesh(sliderGeo, mat(0xffdd00)))
  slider.position.set(0, 1.5, 0)
  group.add(slider)

  // Bell at top
  const bellGeo = new THREE.SphereGeometry(0.35, 8, 6, 0, Math.PI * 2, 0, Math.PI * 0.6)
  const bell = shadow(new THREE.Mesh(bellGeo, mat(0xddaa00)))
  bell.position.y = 7.3
  group.add(bell)

  // Bell clapper
  const clapperGeo = new THREE.SphereGeometry(0.1, 6, 6)
  const clapper = shadow(new THREE.Mesh(clapperGeo, mat(0x888888)))
  clapper.position.set(0, 7.15, 0)
  group.add(clapper)

  // Hammer platform at base
  const hammerBaseGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.15, 8)
  const hammerBase = shadow(new THREE.Mesh(hammerBaseGeo, mat(0x666666)))
  hammerBase.position.set(0, 0.42, 0.8)
  group.add(hammerBase)

  // Static collider
  const body = world.createRigidBody(
    RAPIER.RigidBodyDesc.fixed().setTranslation(CX + 15, 3.5, CZ - 2)
  )
  world.createCollider(RAPIER.ColliderDesc.cuboid(0.6, 3.5, 0.6).setFriction(0.5), body)

  scene.add(group)
}

// ─── Bowling Pins (Dynamic) ────────────────────────────────────────────────

function createBowlingPins(scene, RAPIER, world, syncList) {
  const pinBaseX = CX - 10
  const pinBaseZ = CZ - 16

  const pinGeo = new THREE.CylinderGeometry(0.08, 0.12, 0.5, 6)
  const pinHeadGeo = new THREE.SphereGeometry(0.1, 6, 6)
  const pinMat = mat(0xffffff)
  const pinStripeMat = mat(0xff2222)

  // Classic bowling pin triangle arrangement
  const pinLayout = [
    [0, 0],
    [-0.3, -0.35],
    [0.3, -0.35],
    [-0.6, -0.7],
    [0, -0.7],
  ]

  pinLayout.forEach(([px, pz]) => {
    const wx = pinBaseX + px
    const wz = pinBaseZ + pz

    const pinGroup = new THREE.Group()

    // Pin body
    const body = shadow(new THREE.Mesh(pinGeo, pinMat))
    body.position.y = 0.25
    pinGroup.add(body)

    // Pin head
    const head = shadow(new THREE.Mesh(pinHeadGeo, pinMat))
    head.position.y = 0.55
    pinGroup.add(head)

    // Red stripes
    const stripeGeo = new THREE.CylinderGeometry(0.13, 0.13, 0.04, 6)
    const stripe = shadow(new THREE.Mesh(stripeGeo, pinStripeMat))
    stripe.position.y = 0.35
    pinGroup.add(stripe)

    pinGroup.position.set(wx, 0, wz)
    scene.add(pinGroup)

    // Dynamic rigid body
    const rbDesc = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(wx, 0.3, wz)
      .setLinearDamping(0.3)
      .setAngularDamping(0.4)
    const rb = world.createRigidBody(rbDesc)
    const colDesc = RAPIER.ColliderDesc.cylinder(0.25, 0.12)
      .setDensity(4.0)
      .setFriction(0.4)
      .setRestitution(0.2)
    world.createCollider(colDesc, rb)

    syncList.push({ mesh: pinGroup, body: rb })
  })
}

// ─── Beach Ball (Dynamic) ───────────────────────────────────────────────────

function createBeachBall(scene, RAPIER, world, syncList) {
  const bx = CX + 1
  const bz = CZ + 7

  // Multi-colored beach ball - use segments
  const ballGroup = new THREE.Group()
  const radius = 0.6

  // Create the ball as a single sphere with a bright color
  const ballGeo = new THREE.SphereGeometry(radius, 8, 8)
  const ball = shadow(new THREE.Mesh(ballGeo, mat(0xff4444)))
  ballGroup.add(ball)

  // Add colored stripes as thin rings
  const stripeColors = [0xffffff, 0x2244ff, 0xffff00, 0x22cc22]
  for (let i = 0; i < 4; i++) {
    const ringGeo = new THREE.TorusGeometry(
      radius * Math.cos((i + 1) * 0.3),
      0.03,
      4,
      12
    )
    const ring = new THREE.Mesh(ringGeo, mat(stripeColors[i]))
    ring.position.y = radius * Math.sin((i + 1) * 0.3) - 0.1
    ring.rotation.x = Math.PI / 2
    ballGroup.add(ring)
  }

  ballGroup.position.set(bx, radius + 0.1, bz)
  scene.add(ballGroup)

  // Dynamic body with high restitution (bouncy!)
  const rbDesc = RAPIER.RigidBodyDesc.dynamic()
    .setTranslation(bx, radius + 0.1, bz)
    .setLinearDamping(0.1)
    .setAngularDamping(0.1)
  const rb = world.createRigidBody(rbDesc)
  const colDesc = RAPIER.ColliderDesc.ball(radius)
    .setDensity(1.0)
    .setFriction(0.3)
    .setRestitution(0.85)
  world.createCollider(colDesc, rb)

  syncList.push({ mesh: ballGroup, body: rb })
}

// ─── Ground Decoration ─────────────────────────────────────────────────────

function createGroundDecoration(scene) {
  // Circular ground patch for the park
  const groundGeo = new THREE.CylinderGeometry(22, 22, 0.05, 16)
  const ground = new THREE.Mesh(groundGeo, mat(0x77aa55))
  ground.position.set(CX, -0.02, CZ)
  ground.receiveShadow = true
  scene.add(ground)

  // Inner path - lighter colored
  const pathGeo = new THREE.CylinderGeometry(18, 18, 0.06, 16)
  const path = new THREE.Mesh(pathGeo, mat(0xccbb88))
  path.position.set(CX, -0.01, CZ)
  path.receiveShadow = true
  scene.add(path)
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════════════════════

export function createAmusementPark(scene, RAPIER, world) {
  const syncList = []

  // Ground
  createGroundDecoration(scene)

  // Major attractions (animated)
  const ferris = createFerrisWheel(scene)
  const carousel = createCarousel(scene)

  // Structures
  createRollerCoaster(scene, RAPIER, world)
  createEntryArch(scene, RAPIER, world)
  createTicketBooth(scene, RAPIER, world)
  createGameBooths(scene, RAPIER, world, syncList)
  createStrengthTower(scene, RAPIER, world)

  // Props
  createBalloonCluster(scene)
  createCottonCandyCart(scene, RAPIER, world)
  createPopcornMachine(scene, RAPIER, world)
  createStringLights(scene)
  createPennantFlags(scene)
  createGarbageBins(scene, RAPIER, world)

  // Interactive dynamic objects
  createBowlingPins(scene, RAPIER, world, syncList)
  createBeachBall(scene, RAPIER, world, syncList)

  return {
    syncList,
    update(dt) {
      // ── Ferris Wheel rotation ──
      if (ferris.wheelGroup) {
        ferris.wheelGroup.rotation.z += dt * 0.3

        // Counter-rotate each gondola to keep it upright (cancel parent rotation)
        const wheelAngle = ferris.wheelGroup.rotation.z
        for (let i = 0; i < ferris.gondolas.length; i++) {
          // Each gondola sits at a fixed local position on the wheel.
          // We need its child objects to appear upright despite the wheel turning.
          // The gondola container rotates with the wheel (it's a child), so we
          // set its local Z rotation to the negative of the wheel's Z rotation
          // to cancel it out and keep gondolas hanging straight down.
          ferris.gondolas[i].rotation.z = -wheelAngle
        }
      }

      // ── Carousel rotation ──
      if (carousel.spinGroup) {
        carousel.spinGroup.rotation.y += dt * 0.5
      }
    },
  }
}
