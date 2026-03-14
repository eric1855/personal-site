import * as THREE from 'three'

// ─── Reusable helpers ────────────────────────────────────────────────
const _v3 = new THREE.Vector3()
const COLORS = {
  red: 0xe03030,
  yellow: 0xf0d020,
  blue: 0x3070e0,
  pink: 0xf070a0,
  orange: 0xf09020,
  green: 0x40b050,
  purple: 0x9040d0,
  white: 0xffffff,
  cream: 0xfff8e0,
  brown: 0x8b5e3c,
  darkRed: 0x901818,
  gold: 0xffd700,
  cyan: 0x40d0d0,
  magenta: 0xd040d0,
  lime: 0xa0f040,
}

function mat(color, opts = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    flatShading: true,
    roughness: opts.roughness ?? 0.7,
    metalness: opts.metalness ?? 0.1,
    emissive: opts.emissive ?? 0x000000,
    emissiveIntensity: opts.emissiveIntensity ?? 0,
    transparent: opts.transparent ?? false,
    opacity: opts.opacity ?? 1,
    side: opts.side ?? THREE.FrontSide,
  })
}

function box(w, h, d, color, opts) {
  const g = new THREE.BoxGeometry(w, h, d)
  const m = new THREE.Mesh(g, mat(color, opts))
  m.castShadow = true
  m.receiveShadow = true
  return m
}

function cyl(rTop, rBot, h, segs, color, opts) {
  const g = new THREE.CylinderGeometry(rTop, rBot, h, segs || 6)
  const m = new THREE.Mesh(g, mat(color, opts))
  m.castShadow = true
  m.receiveShadow = true
  return m
}

function sphere(r, wSegs, hSegs, color, opts) {
  const g = new THREE.SphereGeometry(r, wSegs || 6, hSegs || 5)
  const m = new THREE.Mesh(g, mat(color, opts))
  m.castShadow = true
  m.receiveShadow = true
  return m
}

function cone(r, h, segs, color, opts) {
  const g = new THREE.ConeGeometry(r, h, segs || 6)
  const m = new THREE.Mesh(g, mat(color, opts))
  m.castShadow = true
  m.receiveShadow = true
  return m
}

function torus(r, tube, rSegs, tSegs, color, opts) {
  const g = new THREE.TorusGeometry(r, tube, rSegs || 6, tSegs || 8)
  const m = new THREE.Mesh(g, mat(color, opts))
  m.castShadow = true
  m.receiveShadow = true
  return m
}

function group(...children) {
  const g = new THREE.Group()
  children.forEach(c => g.add(c))
  return g
}

function setPos(m, x, y, z) { m.position.set(x, y, z); return m }
function setRot(m, x, y, z) { m.rotation.set(x, y, z); return m }
function setScale(m, x, y, z) { m.scale.set(x, y ?? x, z ?? x); return m }

// ─── WORLD EXPORT ────────────────────────────────────────────────────
export function createWorld(scene, RAPIER, world) {
  const syncList = []
  const animatedObjects = []

  // ── Scene atmosphere ─────────────────────────────────────────────
  scene.background = new THREE.Color(0xf0a050)
  scene.fog = new THREE.FogExp2(0xf0a050, 0.008)

  // Warm ambient + directional
  const ambient = new THREE.AmbientLight(0xffe0b0, 0.6)
  scene.add(ambient)
  const sun = new THREE.DirectionalLight(0xfff0d0, 1.0)
  sun.position.set(30, 40, 20)
  sun.castShadow = true
  sun.shadow.mapSize.set(2048, 2048)
  sun.shadow.camera.left = -70
  sun.shadow.camera.right = 70
  sun.shadow.camera.top = 70
  sun.shadow.camera.bottom = -70
  sun.shadow.camera.near = 1
  sun.shadow.camera.far = 120
  scene.add(sun)

  // Colored point lights for carnival glow
  const ptLight1 = new THREE.PointLight(0xff6040, 1.2, 50)
  ptLight1.position.set(20, 10, 20)
  scene.add(ptLight1)
  const ptLight2 = new THREE.PointLight(0x6040ff, 0.8, 50)
  ptLight2.position.set(-20, 10, -20)
  scene.add(ptLight2)
  const ptLight3 = new THREE.PointLight(0xff40a0, 0.8, 50)
  ptLight3.position.set(-20, 10, 20)
  scene.add(ptLight3)

  // ── Ground ───────────────────────────────────────────────────────
  // Checkerboard carnival ground using a canvas texture
  const groundCanvas = document.createElement('canvas')
  groundCanvas.width = 512
  groundCanvas.height = 512
  const gtx = groundCanvas.getContext('2d')
  const patchSize = 64
  const patchColors = ['#d4a040', '#c89030', '#e0b050', '#b88020', '#d09838', '#c8a048', '#dca840', '#c49030']
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      gtx.fillStyle = patchColors[(r + c) % patchColors.length]
      gtx.fillRect(c * patchSize, r * patchSize, patchSize, patchSize)
    }
  }
  // Star and circle decorations
  gtx.fillStyle = '#e8c060'
  for (let i = 0; i < 20; i++) {
    const cx = Math.random() * 512
    const cy = Math.random() * 512
    gtx.beginPath()
    gtx.arc(cx, cy, 8 + Math.random() * 12, 0, Math.PI * 2)
    gtx.fill()
  }
  const groundTex = new THREE.CanvasTexture(groundCanvas)
  groundTex.wrapS = groundTex.wrapT = THREE.RepeatWrapping
  groundTex.repeat.set(8, 8)

  const groundGeo = new THREE.PlaneGeometry(130, 130, 8, 8)
  const groundMat = new THREE.MeshStandardMaterial({
    map: groundTex,
    flatShading: true,
    roughness: 0.9,
  })
  const groundMesh = new THREE.Mesh(groundGeo, groundMat)
  groundMesh.rotation.x = -Math.PI / 2
  groundMesh.receiveShadow = true
  scene.add(groundMesh)

  // Ground collider
  const groundBody = world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(0, -0.5, 0))
  world.createCollider(RAPIER.ColliderDesc.cuboid(200, 0.5, 200).setFriction(0.5), groundBody)

  // ── Boundary walls (invisible) ──────────────────────────────────
  const wallPositions = [
    [62, 5, 0, 2, 5, 64],   // +X
    [-62, 5, 0, 2, 5, 64],  // -X
    [0, 5, 62, 64, 5, 2],   // +Z
    [0, 5, -62, 64, 5, 2],  // -Z
  ]
  wallPositions.forEach(([x, y, z, hx, hy, hz]) => {
    const wb = world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(x, y, z))
    world.createCollider(RAPIER.ColliderDesc.cuboid(hx, hy, hz), wb)
  })

  // ════════════════════════════════════════════════════════════════
  // FERRIS WHEEL — position (~35, 0, -35)
  // ════════════════════════════════════════════════════════════════
  const ferrisGroup = new THREE.Group()
  ferrisGroup.position.set(35, 0, -35)
  scene.add(ferrisGroup)

  // A-frame legs
  const legMat = mat(COLORS.red)
  const leg1 = box(0.6, 16, 0.6, COLORS.red)
  leg1.position.set(-2, 8, 0)
  leg1.rotation.z = 0.15
  ferrisGroup.add(leg1)
  const leg2 = box(0.6, 16, 0.6, COLORS.red)
  leg2.position.set(2, 8, 0)
  leg2.rotation.z = -0.15
  ferrisGroup.add(leg2)
  const leg3 = box(0.6, 16, 0.6, COLORS.red)
  leg3.position.set(-2, 8, -1)
  leg3.rotation.z = 0.15
  ferrisGroup.add(leg3)
  const leg4 = box(0.6, 16, 0.6, COLORS.red)
  leg4.position.set(2, 8, -1)
  leg4.rotation.z = -0.15
  ferrisGroup.add(leg4)
  // Cross braces
  const brace1 = box(4.5, 0.3, 0.3, COLORS.yellow)
  brace1.position.set(0, 5, -0.5)
  brace1.rotation.z = 0.3
  ferrisGroup.add(brace1)
  const brace2 = box(4.5, 0.3, 0.3, COLORS.yellow)
  brace2.position.set(0, 10, -0.5)
  brace2.rotation.z = -0.3
  ferrisGroup.add(brace2)

  // Central axle
  const axle = cyl(0.4, 0.4, 1.5, 8, COLORS.white, { metalness: 0.5 })
  axle.position.set(0, 14, -0.5)
  axle.rotation.x = Math.PI / 2
  ferrisGroup.add(axle)

  // Wheel ring (rotates)
  const wheelPivot = new THREE.Group()
  wheelPivot.position.set(0, 14, -0.5)
  ferrisGroup.add(wheelPivot)

  const wheelRing = torus(8, 0.25, 6, 24, COLORS.blue, { metalness: 0.3 })
  wheelPivot.add(wheelRing)

  // Spokes
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2
    const spoke = box(0.15, 16, 0.15, COLORS.white, { metalness: 0.3 })
    spoke.rotation.z = angle
    wheelPivot.add(spoke)
  }

  // 8 Gondolas
  const gondolas = []
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2
    const gondolaGroup = new THREE.Group()
    const gx = Math.cos(angle) * 8
    const gy = Math.sin(angle) * 8
    gondolaGroup.position.set(gx, gy, 0)

    const gondolaBody = box(1.2, 1.4, 1.0, [COLORS.red, COLORS.yellow, COLORS.blue, COLORS.green, COLORS.pink, COLORS.orange, COLORS.purple, COLORS.cyan][i])
    gondolaBody.position.set(0, -0.7, 0)
    gondolaGroup.add(gondolaBody)

    // Hanging rod
    const rod = box(0.08, 1.0, 0.08, COLORS.white, { metalness: 0.4 })
    rod.position.set(0, 0.2, 0)
    gondolaGroup.add(rod)

    wheelPivot.add(gondolaGroup)
    gondolas.push(gondolaGroup)
  }

  // Collider for legs
  const ferrisBody = world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(35, 8, -35))
  world.createCollider(RAPIER.ColliderDesc.cuboid(3, 8, 1.5).setFriction(0.3), ferrisBody)

  animatedObjects.push({
    type: 'ferris',
    pivot: wheelPivot,
    gondolas,
    speed: 0.15,
  })

  // ════════════════════════════════════════════════════════════════
  // CAROUSEL — position (-30, 0, -30)
  // ════════════════════════════════════════════════════════════════
  const carouselGroup = new THREE.Group()
  carouselGroup.position.set(-30, 0, -30)
  scene.add(carouselGroup)

  // Base platform
  const carouselBase = cyl(5, 5.5, 0.6, 8, COLORS.gold)
  carouselBase.position.set(0, 0.3, 0)
  carouselGroup.add(carouselBase)

  // Decorative edge
  const carouselEdge = torus(5.2, 0.2, 6, 16, COLORS.red)
  carouselEdge.position.set(0, 0.6, 0)
  carouselEdge.rotation.x = Math.PI / 2
  carouselGroup.add(carouselEdge)

  // Center pole
  const carouselPole = cyl(0.4, 0.4, 6, 6, COLORS.gold, { metalness: 0.4 })
  carouselPole.position.set(0, 3.6, 0)
  carouselGroup.add(carouselPole)

  // Conical roof
  const carouselRoof = cone(6, 3, 8, COLORS.red)
  carouselRoof.position.set(0, 7.6, 0)
  carouselGroup.add(carouselRoof)

  // Roof stripes (alternating panels using individual triangles is complex, use small cones)
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2 + Math.PI / 8
    const stripe = box(0.05, 3.2, 3, i % 2 === 0 ? COLORS.white : COLORS.red)
    stripe.position.set(Math.cos(angle) * 3, 7.6, Math.sin(angle) * 3)
    stripe.rotation.y = angle
    stripe.rotation.x = -0.45
    carouselGroup.add(stripe)
  }

  // Top ornament
  const carouselTop = sphere(0.5, 6, 5, COLORS.gold, { metalness: 0.5 })
  carouselTop.position.set(0, 9.2, 0)
  carouselGroup.add(carouselTop)

  // Rotating platform for horses
  const carouselSpin = new THREE.Group()
  carouselSpin.position.set(0, 0.6, 0)
  carouselGroup.add(carouselSpin)

  // 6 horses on poles
  const horseColors = [COLORS.white, COLORS.brown, COLORS.cream, COLORS.pink, COLORS.gold, COLORS.cyan]
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2
    const hx = Math.cos(angle) * 3.8
    const hz = Math.sin(angle) * 3.8

    // Pole
    const pole = cyl(0.1, 0.1, 5, 6, COLORS.gold, { metalness: 0.4 })
    pole.position.set(hx, 2.8, hz)
    carouselSpin.add(pole)

    // Horse body (box + cone head)
    const horseBody = box(0.5, 0.5, 1.2, horseColors[i])
    horseBody.position.set(hx, 2.0 + (i % 2) * 0.8, hz)
    horseBody.rotation.y = angle + Math.PI / 2
    carouselSpin.add(horseBody)

    // Horse head
    const horseHead = box(0.3, 0.6, 0.3, horseColors[i])
    horseHead.position.set(
      hx + Math.cos(angle + Math.PI / 2) * 0.5,
      2.4 + (i % 2) * 0.8,
      hz + Math.sin(angle + Math.PI / 2) * 0.5
    )
    carouselSpin.add(horseHead)

    // Horse legs (4 thin boxes)
    for (let l = 0; l < 4; l++) {
      const legOff = (l < 2 ? -0.3 : 0.3)
      const sideOff = (l % 2 === 0 ? 0.2 : -0.2)
      const horseLeg = box(0.1, 0.6, 0.1, horseColors[i])
      horseLeg.position.set(
        hx + Math.cos(angle + Math.PI / 2) * legOff + Math.cos(angle) * sideOff,
        1.4 + (i % 2) * 0.8,
        hz + Math.sin(angle + Math.PI / 2) * legOff + Math.sin(angle) * sideOff
      )
      carouselSpin.add(horseLeg)
    }
  }

  // Carousel collider
  const carouselBody = world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(-30, 3, -30))
  world.createCollider(RAPIER.ColliderDesc.cylinder(3, 5.5).setFriction(0.3), carouselBody)

  animatedObjects.push({
    type: 'carousel',
    spin: carouselSpin,
    roof: carouselRoof,
    speed: 0.3,
  })

  // ════════════════════════════════════════════════════════════════
  // SWING RIDE — position (30, 0, 30)
  // ════════════════════════════════════════════════════════════════
  const swingGroup = new THREE.Group()
  swingGroup.position.set(30, 0, 30)
  scene.add(swingGroup)

  // Central pillar
  const swingPillar = cyl(0.6, 0.8, 12, 6, COLORS.blue, { metalness: 0.3 })
  swingPillar.position.set(0, 6, 0)
  swingGroup.add(swingPillar)

  // Top disc
  const swingTop = cyl(5, 5, 0.4, 8, COLORS.yellow)
  swingTop.position.set(0, 12, 0)
  swingGroup.add(swingTop)

  // Conical roof
  const swingRoof = cone(6, 2.5, 8, COLORS.red)
  swingRoof.position.set(0, 13.5, 0)
  swingGroup.add(swingRoof)

  // Spinning top with chains
  const swingSpin = new THREE.Group()
  swingSpin.position.set(0, 12, 0)
  swingGroup.add(swingSpin)

  const swingSeats = []
  for (let i = 0; i < 10; i++) {
    const angle = (i / 10) * Math.PI * 2
    const chainGroup = new THREE.Group()

    // Chain
    const chain = box(0.05, 4, 0.05, COLORS.white, { metalness: 0.5 })
    chain.position.set(0, -2, 0)
    chainGroup.add(chain)

    // Seat
    const seat = box(0.6, 0.15, 0.6, [COLORS.red, COLORS.blue, COLORS.green, COLORS.yellow, COLORS.pink][i % 5])
    seat.position.set(0, -4, 0)
    chainGroup.add(seat)

    chainGroup.position.set(Math.cos(angle) * 4.5, 0, Math.sin(angle) * 4.5)
    swingSpin.add(chainGroup)
    swingSeats.push(chainGroup)
  }

  // Swing collider
  const swingBody = world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(30, 6, 30))
  world.createCollider(RAPIER.ColliderDesc.cylinder(6, 1).setFriction(0.3), swingBody)

  animatedObjects.push({
    type: 'swing',
    spin: swingSpin,
    seats: swingSeats,
    speed: 0.4,
    tiltAmount: 0.5,
  })

  // ════════════════════════════════════════════════════════════════
  // HELTER SKELTER / SLIDE TOWER — position (-35, 0, 25)
  // ════════════════════════════════════════════════════════════════
  const helterGroup = new THREE.Group()
  helterGroup.position.set(-35, 0, 25)
  scene.add(helterGroup)

  // Main tower
  const helterTower = cyl(3, 3.5, 16, 8, COLORS.red)
  helterTower.position.set(0, 8, 0)
  helterGroup.add(helterTower)

  // Spiral slide segments
  const spiralSegs = 24
  for (let i = 0; i < spiralSegs; i++) {
    const angle = (i / spiralSegs) * Math.PI * 6 // 3 full wraps
    const y = (i / spiralSegs) * 14 + 1
    const r = 3.8
    const slideBlock = box(1.5, 0.2, 1.0, i % 2 === 0 ? COLORS.yellow : COLORS.white)
    slideBlock.position.set(Math.cos(angle) * r, y, Math.sin(angle) * r)
    slideBlock.rotation.y = -angle
    slideBlock.rotation.z = -0.15
    helterGroup.add(slideBlock)

    // Side rail
    const rail = box(0.1, 0.5, 1.0, COLORS.green)
    rail.position.set(Math.cos(angle) * (r + 0.8), y + 0.25, Math.sin(angle) * (r + 0.8))
    rail.rotation.y = -angle
    helterGroup.add(rail)
  }

  // Pointed top
  const helterTop = cone(3.5, 4, 8, COLORS.orange)
  helterTop.position.set(0, 18, 0)
  helterGroup.add(helterTop)

  // Flag on top
  const flagPole = cyl(0.08, 0.08, 2, 4, COLORS.white)
  flagPole.position.set(0, 21, 0)
  helterGroup.add(flagPole)
  const flag = box(1, 0.6, 0.05, COLORS.purple)
  flag.position.set(0.5, 21.8, 0)
  helterGroup.add(flag)

  // Collider
  const helterBody = world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(-35, 8, 25))
  world.createCollider(RAPIER.ColliderDesc.cylinder(8, 4).setFriction(0.3), helterBody)

  // ════════════════════════════════════════════════════════════════
  // ROLLER COASTER — winding track across NE quadrant
  // ════════════════════════════════════════════════════════════════
  const coasterGroup = new THREE.Group()
  scene.add(coasterGroup)

  // Track path points
  const trackPoints = [
    [40, 2, -10], [45, 4, -5], [48, 7, 2], [46, 10, 10],
    [42, 8, 15], [36, 5, 18], [30, 3, 14], [28, 2, 8],
    [32, 4, 2], [38, 6, -4], [42, 3, -8], [40, 2, -10],
  ]

  // Track segments (rails + crossties)
  for (let i = 0; i < trackPoints.length; i++) {
    const [x1, y1, z1] = trackPoints[i]
    const [x2, y2, z2] = trackPoints[(i + 1) % trackPoints.length]

    const mx = (x1 + x2) / 2
    const my = (y1 + y2) / 2
    const mz = (z1 + z2) / 2
    const dx = x2 - x1
    const dy = y2 - y1
    const dz = z2 - z1
    const len = Math.sqrt(dx * dx + dy * dy + dz * dz)

    // Rail segment
    const rail = box(0.3, 0.3, len, COLORS.red, { metalness: 0.4 })
    rail.position.set(mx, my, mz)
    rail.lookAt(x2, y2, z2)
    coasterGroup.add(rail)

    // Second rail
    const rail2 = box(0.3, 0.3, len, COLORS.red, { metalness: 0.4 })
    rail2.position.set(mx + 0.8 * Math.cos(Math.atan2(dz, dx) + Math.PI / 2), my, mz + 0.8 * Math.sin(Math.atan2(dz, dx) + Math.PI / 2))
    rail2.lookAt(x2 + 0.8 * Math.cos(Math.atan2(dz, dx) + Math.PI / 2), y2, z2 + 0.8 * Math.sin(Math.atan2(dz, dx) + Math.PI / 2))
    coasterGroup.add(rail2)

    // Support pillars
    if (my > 1.5) {
      const pillar = box(0.4, my, 0.4, COLORS.white, { metalness: 0.3 })
      pillar.position.set(mx, my / 2, mz)
      coasterGroup.add(pillar)

      // Cross brace
      const crossBrace = box(0.15, 0.15, 1.5, COLORS.yellow)
      crossBrace.position.set(mx, my * 0.6, mz)
      crossBrace.rotation.z = 0.4
      coasterGroup.add(crossBrace)
    }

    // Collider for track supports
    if (i % 3 === 0) {
      const tb = world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(mx, my / 2, mz))
      world.createCollider(RAPIER.ColliderDesc.cuboid(0.6, my / 2, 0.6).setFriction(0.3), tb)
    }
  }

  // Coaster cart
  const cart = box(0.8, 0.6, 1.5, COLORS.blue)
  cart.position.set(trackPoints[0][0], trackPoints[0][1] + 0.5, trackPoints[0][2])
  coasterGroup.add(cart)

  animatedObjects.push({
    type: 'coaster',
    cart,
    points: trackPoints,
    t: 0,
    speed: 0.03,
  })

  // ════════════════════════════════════════════════════════════════
  // GAME BOOTHS — spread across the map
  // ════════════════════════════════════════════════════════════════
  function createBooth(x, z, rotY, awningColor1, awningColor2) {
    const boothGroup = new THREE.Group()
    boothGroup.position.set(x, 0, z)
    boothGroup.rotation.y = rotY || 0

    // Back wall
    const back = box(4, 3, 0.2, COLORS.cream)
    back.position.set(0, 1.5, -1.5)
    boothGroup.add(back)

    // Side walls
    const sideL = box(0.2, 3, 3, COLORS.cream)
    sideL.position.set(-2, 1.5, 0)
    boothGroup.add(sideL)
    const sideR = box(0.2, 3, 3, COLORS.cream)
    sideR.position.set(2, 1.5, 0)
    boothGroup.add(sideR)

    // Counter
    const counter = box(4, 0.2, 1, COLORS.brown)
    counter.position.set(0, 1.2, 1)
    boothGroup.add(counter)

    // Striped awning
    const awningSegments = 6
    for (let i = 0; i < awningSegments; i++) {
      const stripe = box(4 / awningSegments, 0.1, 2, i % 2 === 0 ? awningColor1 : awningColor2)
      stripe.position.set(-2 + (4 / awningSegments) * (i + 0.5), 3.2, 0.5)
      stripe.rotation.x = -0.2
      boothGroup.add(stripe)
    }

    scene.add(boothGroup)

    // Collider
    const bb = world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(x, 1.5, z))
    world.createCollider(RAPIER.ColliderDesc.cuboid(2.2, 1.5, 1.7).setFriction(0.3), bb)

    return boothGroup
  }

  // Booth 1: Bottle toss — stacked dynamic bottles
  const booth1 = createBooth(-12, -40, 0, COLORS.red, COLORS.white)
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col <= 2 - row; col++) {
      const bottleX = -12 + (col - (2 - row) / 2) * 0.5
      const bottleY = 1.6 + row * 0.8
      const bottleZ = -40 - 0.8

      const bottle = cyl(0.15, 0.15, 0.7, 6, COLORS.green)
      bottle.position.set(bottleX, bottleY, bottleZ)
      scene.add(bottle)

      const bottleRB = world.createRigidBody(
        RAPIER.RigidBodyDesc.dynamic().setTranslation(bottleX, bottleY, bottleZ).setLinearDamping(0.2).setAngularDamping(0.3)
      )
      world.createCollider(
        RAPIER.ColliderDesc.cylinder(0.35, 0.15).setDensity(5).setFriction(0.4).setRestitution(0.2),
        bottleRB
      )
      syncList.push({ mesh: bottle, body: bottleRB })
    }
  }

  // Booth 2: Balloon pop — spheres on sticks
  const booth2 = createBooth(12, -40, 0, COLORS.blue, COLORS.yellow)
  const balloonColors = [COLORS.red, COLORS.yellow, COLORS.blue, COLORS.pink, COLORS.green]
  for (let i = 0; i < 5; i++) {
    const bx = 12 + (i - 2) * 0.7
    const stick = cyl(0.05, 0.05, 1.2, 4, COLORS.brown)
    stick.position.set(bx, 2.2, -40 - 0.8)
    scene.add(stick)
    const balloon = sphere(0.25, 6, 5, balloonColors[i])
    balloon.position.set(bx, 3.0, -40 - 0.8)
    scene.add(balloon)
  }

  // Booth 3: Ring toss pegs
  const booth3 = createBooth(-40, -12, Math.PI / 2, COLORS.orange, COLORS.white)
  for (let i = 0; i < 5; i++) {
    const px = -40 - 0.8
    const pz = -12 + (i - 2) * 0.7
    const peg = cyl(0.08, 0.12, 0.8, 5, COLORS.red)
    peg.position.set(px, 1.8, pz)
    scene.add(peg)
    // Rings on some pegs
    if (i % 2 === 0) {
      const ring = torus(0.2, 0.04, 4, 8, COLORS.blue)
      ring.position.set(px, 1.7, pz)
      ring.rotation.x = Math.PI / 2
      scene.add(ring)
    }
  }

  // Booth 4: Duck pond
  const booth4 = createBooth(40, 12, -Math.PI / 2, COLORS.yellow, COLORS.blue)
  // Pond (blue disc)
  const pond = cyl(1.2, 1.2, 0.1, 8, COLORS.blue, { roughness: 0.3 })
  pond.position.set(40 + 0.8, 1.35, 12)
  scene.add(pond)
  // Rubber ducks (dynamic)
  for (let i = 0; i < 5; i++) {
    const dAngle = (i / 5) * Math.PI * 2
    const duckX = 40 + 0.8 + Math.cos(dAngle) * 0.7
    const duckZ = 12 + Math.sin(dAngle) * 0.7
    const duck = sphere(0.15, 5, 4, COLORS.yellow)
    duck.position.set(duckX, 1.6, duckZ)
    scene.add(duck)
    const duckBeak = cone(0.05, 0.12, 4, COLORS.orange)
    duckBeak.position.set(duckX + 0.1, 1.65, duckZ)
    duckBeak.rotation.z = Math.PI / 2
    scene.add(duckBeak)

    const duckRB = world.createRigidBody(
      RAPIER.RigidBodyDesc.dynamic().setTranslation(duckX, 1.6, duckZ).setLinearDamping(0.5).setAngularDamping(0.5)
    )
    world.createCollider(
      RAPIER.ColliderDesc.ball(0.15).setDensity(2).setFriction(0.3).setRestitution(0.4),
      duckRB
    )
    syncList.push({ mesh: duck, body: duckRB })
  }

  // Booth 5: Shooting gallery
  const booth5 = createBooth(-12, 40, Math.PI, COLORS.green, COLORS.white)
  for (let i = 0; i < 6; i++) {
    const targetX = -12 + (i - 2.5) * 0.7
    const target = cyl(0.25, 0.25, 0.08, 8, i % 2 === 0 ? COLORS.red : COLORS.white)
    target.position.set(targetX, 2.2, 40 + 0.8)
    target.rotation.x = Math.PI / 2
    scene.add(target)
    // Bullseye center
    const center = cyl(0.1, 0.1, 0.09, 6, COLORS.red)
    center.position.set(targetX, 2.2, 40 + 0.79)
    center.rotation.x = Math.PI / 2
    scene.add(center)
  }

  // Booth 6: Prize booth with stuffed animals
  const booth6 = createBooth(12, 40, Math.PI, COLORS.purple, COLORS.pink)
  for (let i = 0; i < 4; i++) {
    const px = 12 + (i - 1.5) * 0.8
    // Stuffed animal: sphere body + cone hat
    const animalBody = sphere(0.25, 5, 4, [COLORS.pink, COLORS.blue, COLORS.yellow, COLORS.green][i])
    animalBody.position.set(px, 2.5, 40 + 0.8)
    scene.add(animalBody)
    const animalHat = cone(0.15, 0.3, 5, COLORS.purple)
    animalHat.position.set(px, 2.9, 40 + 0.8)
    scene.add(animalHat)
    // Eyes
    const eyeL = sphere(0.04, 4, 3, COLORS.white)
    eyeL.position.set(px - 0.08, 2.55, 40 + 0.57)
    scene.add(eyeL)
    const eyeR = sphere(0.04, 4, 3, COLORS.white)
    eyeR.position.set(px + 0.08, 2.55, 40 + 0.57)
    scene.add(eyeR)
  }

  // Booth 7: Strength test
  const booth7Group = new THREE.Group()
  booth7Group.position.set(40, 0, -25)
  scene.add(booth7Group)
  const strengthBase = box(1.5, 0.5, 1.5, COLORS.red)
  strengthBase.position.set(0, 0.25, 0)
  booth7Group.add(strengthBase)
  const strengthPole = box(0.3, 10, 0.3, COLORS.yellow)
  strengthPole.position.set(0, 5.25, 0)
  booth7Group.add(strengthPole)
  // Markings
  for (let i = 0; i < 8; i++) {
    const mark = box(0.5, 0.1, 0.35, i < 3 ? COLORS.green : i < 6 ? COLORS.yellow : COLORS.red)
    mark.position.set(0, 1.5 + i * 1.0, 0)
    booth7Group.add(mark)
  }
  // Bell at top
  const bell = sphere(0.3, 5, 4, COLORS.gold, { metalness: 0.6 })
  bell.position.set(0, 10.5, 0)
  booth7Group.add(bell)
  const strengthBdy = world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(40, 5, -25))
  world.createCollider(RAPIER.ColliderDesc.cuboid(0.8, 5, 0.8).setFriction(0.3), strengthBdy)

  // Booth 8: Fortune teller
  const fortuneGroup = new THREE.Group()
  fortuneGroup.position.set(-40, 0, 15)
  scene.add(fortuneGroup)
  const fortuneBox = box(3, 3, 3, COLORS.purple)
  fortuneBox.position.set(0, 1.5, 0)
  fortuneGroup.add(fortuneBox)
  const fortuneRoof = cone(2.5, 2, 6, COLORS.gold)
  fortuneRoof.position.set(0, 4, 0)
  fortuneGroup.add(fortuneRoof)
  // Crystal ball
  const crystalBall = sphere(0.4, 8, 6, COLORS.cyan, { roughness: 0.1, metalness: 0.3, emissive: 0x204060, emissiveIntensity: 0.5 })
  crystalBall.position.set(0, 2.2, 1.3)
  fortuneGroup.add(crystalBall)
  // Stars decoration
  for (let i = 0; i < 6; i++) {
    const star = sphere(0.08, 4, 3, COLORS.gold, { emissive: 0xffd700, emissiveIntensity: 0.5 })
    const sa = (i / 6) * Math.PI * 2
    star.position.set(Math.cos(sa) * 1.6, 2.5 + Math.sin(sa * 2) * 0.3, Math.sin(sa) * 1.6)
    fortuneGroup.add(star)
  }
  const fortuneBdy = world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(-40, 1.5, 15))
  world.createCollider(RAPIER.ColliderDesc.cuboid(1.7, 1.5, 1.7).setFriction(0.3), fortuneBdy)

  // Booth 9: Claw machine
  const clawGroup = new THREE.Group()
  clawGroup.position.set(-25, 0, 40)
  scene.add(clawGroup)
  // Glass box
  const clawBox = box(2, 2.5, 2, COLORS.cyan, { transparent: true, opacity: 0.3 })
  clawBox.position.set(0, 1.25, 0)
  clawGroup.add(clawBox)
  // Machine top
  const clawTop = box(2.2, 0.8, 2.2, COLORS.red)
  clawTop.position.set(0, 2.9, 0)
  clawGroup.add(clawTop)
  // Prizes inside
  for (let i = 0; i < 6; i++) {
    const prize = sphere(0.2, 5, 4, [COLORS.pink, COLORS.yellow, COLORS.green, COLORS.blue, COLORS.orange, COLORS.purple][i])
    prize.position.set((Math.random() - 0.5) * 1.2, 0.3 + Math.random() * 0.5, (Math.random() - 0.5) * 1.2)
    clawGroup.add(prize)
  }
  const clawBdy = world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(-25, 1.5, 40))
  world.createCollider(RAPIER.ColliderDesc.cuboid(1.2, 1.5, 1.2).setFriction(0.3), clawBdy)

  // Booth 10: Whack-a-mole style
  const whackGroup = new THREE.Group()
  whackGroup.position.set(25, 0, -40)
  scene.add(whackGroup)
  const whackTable = box(3, 1, 2, COLORS.green)
  whackTable.position.set(0, 0.5, 0)
  whackGroup.add(whackTable)
  for (let i = 0; i < 6; i++) {
    const hole = cyl(0.25, 0.25, 0.15, 6, COLORS.brown)
    hole.position.set((i % 3 - 1) * 0.8, 1.05, (Math.floor(i / 3) - 0.5) * 0.7)
    whackGroup.add(hole)
    // Some moles popping up
    if (i % 2 === 0) {
      const mole = sphere(0.2, 5, 4, COLORS.brown)
      mole.position.set((i % 3 - 1) * 0.8, 1.25, (Math.floor(i / 3) - 0.5) * 0.7)
      whackGroup.add(mole)
    }
  }
  const whackBdy = world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(25, 0.5, -40))
  world.createCollider(RAPIER.ColliderDesc.cuboid(1.7, 0.5, 1.2).setFriction(0.3), whackBdy)

  // ════════════════════════════════════════════════════════════════
  // FOOD / VENDOR STALLS
  // ════════════════════════════════════════════════════════════════
  function createFoodStall(x, z, rotY, color, label) {
    const stallGroup = new THREE.Group()
    stallGroup.position.set(x, 0, z)
    stallGroup.rotation.y = rotY || 0

    const stallBody = box(3, 2.5, 2, color)
    stallBody.position.set(0, 1.25, 0)
    stallGroup.add(stallBody)

    // Awning
    const awning = box(3.5, 0.15, 1.5, COLORS.white)
    awning.position.set(0, 2.7, 1.2)
    awning.rotation.x = -0.15
    stallGroup.add(awning)

    // Counter
    const stallCounter = box(3, 0.15, 0.6, COLORS.brown)
    stallCounter.position.set(0, 1.5, 1.2)
    stallGroup.add(stallCounter)

    scene.add(stallGroup)

    const sb = world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(x, 1.25, z))
    world.createCollider(RAPIER.ColliderDesc.cuboid(1.7, 1.25, 1.2).setFriction(0.3), sb)

    return stallGroup
  }

  // Cotton candy cart
  const cottonCandy = createFoodStall(-15, -25, 0.3, COLORS.pink)
  const cottonStick = cyl(0.05, 0.05, 1, 4, COLORS.white)
  cottonStick.position.set(-15, 3.0, -24.5)
  scene.add(cottonStick)
  const cottonFluff = sphere(0.6, 6, 5, COLORS.pink, { roughness: 1.0 })
  cottonFluff.position.set(-15, 3.7, -24.5)
  scene.add(cottonFluff)

  // Popcorn machine
  const popcornStall = createFoodStall(15, -25, -0.3, COLORS.red)
  const popcornBox = box(0.8, 1.0, 0.8, COLORS.red, { transparent: true, opacity: 0.5 })
  popcornBox.position.set(15, 2.8, -24.5)
  scene.add(popcornBox)
  for (let i = 0; i < 8; i++) {
    const kernel = sphere(0.08, 4, 3, COLORS.yellow)
    kernel.position.set(15 + (Math.random() - 0.5) * 0.5, 2.5 + Math.random() * 0.6, -24.5 + (Math.random() - 0.5) * 0.5)
    scene.add(kernel)
  }

  // Hot dog stand
  const hotdogStall = createFoodStall(-15, 30, 0.5, COLORS.yellow)
  // Hot dogs on counter
  for (let i = 0; i < 3; i++) {
    const bun = box(0.15, 0.1, 0.5, COLORS.cream)
    bun.position.set(-15 + (i - 1) * 0.4, 1.75, 30.8)
    scene.add(bun)
    const sausage = cyl(0.04, 0.04, 0.5, 5, COLORS.darkRed)
    sausage.position.set(-15 + (i - 1) * 0.4, 1.8, 30.8)
    sausage.rotation.x = Math.PI / 2
    scene.add(sausage)
  }

  // Ice cream truck
  const iceCreamGroup = new THREE.Group()
  iceCreamGroup.position.set(45, 0, 0)
  scene.add(iceCreamGroup)
  const truckBody = box(4, 2.5, 2.2, COLORS.white)
  truckBody.position.set(0, 1.25, 0)
  iceCreamGroup.add(truckBody)
  const truckCab = box(1.5, 1.8, 2.2, COLORS.pink)
  truckCab.position.set(2.5, 0.9, 0)
  iceCreamGroup.add(truckCab)
  const truckRoof = box(4.2, 0.15, 2.4, COLORS.pink)
  truckRoof.position.set(0, 2.6, 0)
  iceCreamGroup.add(truckRoof)
  // Wheels
  for (const wx of [-1.2, 1.2, 2.5]) {
    for (const wz of [-1.2, 1.2]) {
      const wheel = cyl(0.3, 0.3, 0.2, 8, 0x222222)
      wheel.position.set(wx, 0.3, wz)
      wheel.rotation.x = Math.PI / 2
      iceCreamGroup.add(wheel)
    }
  }
  // Giant ice cream cone on top
  const iceCone = cone(0.4, 0.8, 6, COLORS.cream)
  iceCone.position.set(0, 3.6, 0)
  iceCone.rotation.x = Math.PI
  iceCreamGroup.add(iceCone)
  const iceScoop = sphere(0.5, 6, 5, COLORS.pink)
  iceScoop.position.set(0, 3.2, 0)
  iceCreamGroup.add(iceScoop)
  const iceScoop2 = sphere(0.4, 6, 5, COLORS.cream)
  iceScoop2.position.set(0, 3.8, 0)
  iceCreamGroup.add(iceScoop2)
  const iceBdy = world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(45, 1.25, 0))
  world.createCollider(RAPIER.ColliderDesc.cuboid(3, 1.25, 1.3).setFriction(0.3), iceBdy)

  // Funnel cake booth
  const funnelStall = createFoodStall(15, 30, -0.5, COLORS.orange)
  // Funnel cakes on display
  for (let i = 0; i < 2; i++) {
    const cake = torus(0.25, 0.08, 5, 8, COLORS.cream)
    cake.position.set(15 + (i - 0.5) * 0.6, 1.75, 30.8)
    cake.rotation.x = Math.PI / 2
    scene.add(cake)
  }

  // Drink stand
  const drinkStall = createFoodStall(-45, 0, Math.PI / 2, COLORS.cyan)
  // Drink cups
  for (let i = 0; i < 4; i++) {
    const cup = cyl(0.1, 0.08, 0.3, 6, [COLORS.red, COLORS.blue, COLORS.green, COLORS.yellow][i])
    cup.position.set(-44.2, 1.75, (i - 1.5) * 0.35)
    scene.add(cup)
  }

  // Lemonade stand
  const lemonStall = createFoodStall(35, 40, Math.PI, COLORS.yellow)
  const lemon = sphere(0.3, 6, 5, COLORS.yellow)
  lemon.position.set(35, 3.2, 40)
  scene.add(lemon)

  // ════════════════════════════════════════════════════════════════
  // ENTRY ARCHES — 4 cardinal directions
  // ════════════════════════════════════════════════════════════════
  function createArch(x, z, rotY) {
    const archGroup = new THREE.Group()
    archGroup.position.set(x, 0, z)
    archGroup.rotation.y = rotY

    // Two pillars
    const pillarL = box(1.2, 7, 1.2, COLORS.red)
    pillarL.position.set(-3, 3.5, 0)
    archGroup.add(pillarL)
    const pillarR = box(1.2, 7, 1.2, COLORS.red)
    pillarR.position.set(3, 3.5, 0)
    archGroup.add(pillarR)

    // Pillar decorations
    for (const px of [-3, 3]) {
      const band1 = box(1.4, 0.3, 1.4, COLORS.gold)
      band1.position.set(px, 2, 0)
      archGroup.add(band1)
      const band2 = box(1.4, 0.3, 1.4, COLORS.gold)
      band2.position.set(px, 5, 0)
      archGroup.add(band2)
      // Ball on top
      const topBall = sphere(0.5, 6, 5, COLORS.gold, { metalness: 0.4 })
      topBall.position.set(px, 7.5, 0)
      archGroup.add(topBall)
    }

    // Curved top (half torus)
    const archTop = torus(3, 0.5, 6, 12, COLORS.gold, { metalness: 0.3 })
    archTop.position.set(0, 7, 0)
    archTop.rotation.y = Math.PI / 2
    // Only show top half - we'll just use a full torus for simplicity (looks like arch)
    archGroup.add(archTop)

    // Sign board
    const sign = box(5, 1.2, 0.3, COLORS.yellow)
    sign.position.set(0, 8.5, 0)
    archGroup.add(sign)

    // Light bulbs along arch
    for (let i = 0; i < 7; i++) {
      const bulb = sphere(0.12, 4, 3, COLORS.white, { emissive: 0xffffaa, emissiveIntensity: 0.8 })
      bulb.position.set((i - 3) * 0.8, 9.2, 0)
      archGroup.add(bulb)
    }

    scene.add(archGroup)

    // Colliders for pillars
    const plb = world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(
      x + Math.cos(rotY) * -3 - Math.sin(rotY) * 0,
      3.5,
      z + Math.sin(rotY) * -3 + Math.cos(rotY) * 0
    ))
    world.createCollider(RAPIER.ColliderDesc.cuboid(0.7, 3.5, 0.7).setFriction(0.3), plb)

    const prb = world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(
      x + Math.cos(rotY) * 3 - Math.sin(rotY) * 0,
      3.5,
      z + Math.sin(rotY) * 3 + Math.cos(rotY) * 0
    ))
    world.createCollider(RAPIER.ColliderDesc.cuboid(0.7, 3.5, 0.7).setFriction(0.3), prb)

    return archGroup
  }

  createArch(0, -50, 0)        // South
  createArch(0, 50, Math.PI)   // North
  createArch(-50, 0, Math.PI / 2)  // West
  createArch(50, 0, -Math.PI / 2)  // East

  // ════════════════════════════════════════════════════════════════
  // CIRCUS TENTS — large decorative structures
  // ════════════════════════════════════════════════════════════════
  function createCircusTent(x, z, radius, height, color1, color2) {
    const tentGroup = new THREE.Group()
    tentGroup.position.set(x, 0, z)

    // Cylinder wall with stripes
    const wallSegs = 8
    for (let i = 0; i < wallSegs; i++) {
      const angle = (i / wallSegs) * Math.PI * 2
      const nextAngle = ((i + 1) / wallSegs) * Math.PI * 2
      const wallPanel = box(radius * 0.8, height * 0.6, 0.1, i % 2 === 0 ? color1 : color2)
      wallPanel.position.set(
        Math.cos(angle + Math.PI / wallSegs) * radius,
        height * 0.3,
        Math.sin(angle + Math.PI / wallSegs) * radius
      )
      wallPanel.rotation.y = -(angle + Math.PI / wallSegs)
      tentGroup.add(wallPanel)
    }

    // Cone roof
    const roof = cone(radius * 1.3, height * 0.5, 8, color1)
    roof.position.set(0, height * 0.75, 0)
    tentGroup.add(roof)

    // Flag
    const tentFlag = cyl(0.06, 0.06, 1.5, 4, COLORS.white)
    tentFlag.position.set(0, height * 1.05, 0)
    tentGroup.add(tentFlag)
    const tentFlagCloth = box(0.6, 0.4, 0.05, color2)
    tentFlagCloth.position.set(0.35, height * 1.15, 0)
    tentGroup.add(tentFlagCloth)

    scene.add(tentGroup)

    const tentBdy = world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(x, height * 0.3, z))
    world.createCollider(RAPIER.ColliderDesc.cylinder(height * 0.3, radius).setFriction(0.3), tentBdy)

    return tentGroup
  }

  createCircusTent(-45, -40, 5, 8, COLORS.red, COLORS.white)
  createCircusTent(45, 35, 4, 7, COLORS.blue, COLORS.yellow)
  createCircusTent(-40, 40, 3.5, 6, COLORS.purple, COLORS.gold)

  // ════════════════════════════════════════════════════════════════
  // STAGE / PERFORMANCE AREA — center-ish
  // ════════════════════════════════════════════════════════════════
  const stageGroup = new THREE.Group()
  stageGroup.position.set(-10, 0, 10)
  scene.add(stageGroup)

  // Stage platform
  const stagePlatform = box(8, 0.8, 5, COLORS.brown)
  stagePlatform.position.set(0, 0.4, 0)
  stageGroup.add(stagePlatform)

  // Curtain backdrop
  const curtainBack = box(8, 5, 0.2, COLORS.darkRed)
  curtainBack.position.set(0, 3, -2.4)
  stageGroup.add(curtainBack)

  // Side curtains
  const curtainL = box(0.6, 5, 0.3, COLORS.darkRed)
  curtainL.position.set(-3.5, 3, -1.5)
  stageGroup.add(curtainL)
  const curtainR = box(0.6, 5, 0.3, COLORS.darkRed)
  curtainR.position.set(3.5, 3, -1.5)
  stageGroup.add(curtainR)

  // Curtain top valance
  const valance = box(8.5, 0.8, 0.5, COLORS.gold)
  valance.position.set(0, 5.5, -1.5)
  stageGroup.add(valance)

  // Stage lights
  for (let i = 0; i < 5; i++) {
    const stageLight = sphere(0.2, 5, 4, COLORS.white, { emissive: 0xffffdd, emissiveIntensity: 1.0 })
    stageLight.position.set((i - 2) * 1.8, 5.8, -1)
    stageGroup.add(stageLight)
  }

  // Microphone stand
  const micStand = cyl(0.04, 0.15, 1.5, 4, COLORS.white, { metalness: 0.5 })
  micStand.position.set(0, 1.6, 0.5)
  stageGroup.add(micStand)
  const mic = sphere(0.08, 5, 4, 0x333333, { metalness: 0.6 })
  mic.position.set(0, 2.4, 0.5)
  stageGroup.add(mic)

  const stageBdy = world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(-10, 0.4, 10))
  world.createCollider(RAPIER.ColliderDesc.cuboid(4.2, 0.4, 2.7).setFriction(0.3), stageBdy)
  const stageBackBdy = world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(-10, 3, 7.6))
  world.createCollider(RAPIER.ColliderDesc.cuboid(4.2, 2.5, 0.3).setFriction(0.3), stageBackBdy)

  // ════════════════════════════════════════════════════════════════
  // FOUNTAIN — near center
  // ════════════════════════════════════════════════════════════════
  const fountainGroup = new THREE.Group()
  fountainGroup.position.set(10, 0, -10)
  scene.add(fountainGroup)

  // Basin
  const basin = cyl(3, 3.2, 0.8, 8, COLORS.white, { metalness: 0.2 })
  basin.position.set(0, 0.4, 0)
  fountainGroup.add(basin)
  // Water
  const water = cyl(2.8, 2.8, 0.3, 8, COLORS.blue, { roughness: 0.1, transparent: true, opacity: 0.6 })
  water.position.set(0, 0.65, 0)
  fountainGroup.add(water)
  // Center pillar
  const fountainPillar = cyl(0.4, 0.5, 2, 6, COLORS.white, { metalness: 0.2 })
  fountainPillar.position.set(0, 1.8, 0)
  fountainGroup.add(fountainPillar)
  // Top dish
  const topDish = cyl(1.2, 0.8, 0.3, 6, COLORS.white, { metalness: 0.2 })
  topDish.position.set(0, 2.95, 0)
  fountainGroup.add(topDish)
  // Water jets (small spheres simulating water)
  const fountainLights = []
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2
    const jet = sphere(0.15, 4, 3, COLORS.cyan, { emissive: 0x40d0d0, emissiveIntensity: 0.5, transparent: true, opacity: 0.7 })
    jet.position.set(Math.cos(angle) * 1.5, 1.2 + Math.sin(i * 0.5) * 0.3, Math.sin(angle) * 1.5)
    fountainGroup.add(jet)
    fountainLights.push(jet)
  }
  const fountainBdy = world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(10, 0.4, -10))
  world.createCollider(RAPIER.ColliderDesc.cylinder(0.4, 3.2).setFriction(0.3), fountainBdy)

  animatedObjects.push({
    type: 'fountain',
    lights: fountainLights,
    baseY: 1.2,
  })

  // ════════════════════════════════════════════════════════════════
  // MIRROR MAZE — box walls with reflective material
  // ════════════════════════════════════════════════════════════════
  const mazeGroup = new THREE.Group()
  mazeGroup.position.set(35, 0, 15)
  scene.add(mazeGroup)

  const mirrorMat = mat(0xc0d0e0, { metalness: 0.7, roughness: 0.15 })
  const mazeWalls = [
    [0, 1.5, -3, 6, 3, 0.2],
    [0, 1.5, 3, 6, 3, 0.2],
    [-3, 1.5, 0, 0.2, 3, 6],
    [3, 1.5, 0, 0.2, 3, 6],
    [0, 1.5, 0, 3, 3, 0.2],
    [1, 1.5, 1.5, 0.2, 3, 3],
    [-1.5, 1.5, -1, 3, 3, 0.2],
  ]
  mazeWalls.forEach(([x, y, z, w, h, d]) => {
    const wallMesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mirrorMat)
    wallMesh.position.set(x, y, z)
    wallMesh.castShadow = true
    mazeGroup.add(wallMesh)

    const mwb = world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(35 + x, y, 15 + z))
    world.createCollider(RAPIER.ColliderDesc.cuboid(w / 2, h / 2, d / 2).setFriction(0.2), mwb)
  })

  // Entrance sign
  const mazeSign = box(2, 0.6, 0.15, COLORS.purple)
  mazeSign.position.set(0, 3.5, 3.2)
  mazeGroup.add(mazeSign)

  // ════════════════════════════════════════════════════════════════
  // GIANT INFLATABLE ARCH
  // ════════════════════════════════════════════════════════════════
  const inflatableArch = torus(4, 1.2, 8, 16, COLORS.magenta)
  inflatableArch.position.set(-20, 4, -40)
  inflatableArch.rotation.y = Math.PI / 4
  scene.add(inflatableArch)
  const iaBdy = world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(-20, 4, -40))
  world.createCollider(RAPIER.ColliderDesc.cuboid(3, 4, 1.5).setFriction(0.3), iaBdy)

  // ════════════════════════════════════════════════════════════════
  // TICKET BOOTH — near entrance
  // ════════════════════════════════════════════════════════════════
  for (const [tx, tz, tr] of [[5, -48, 0], [-5, -48, 0], [-48, 5, Math.PI / 2], [48, -5, -Math.PI / 2]]) {
    const ticketBooth = new THREE.Group()
    ticketBooth.position.set(tx, 0, tz)
    ticketBooth.rotation.y = tr

    const tBody = box(2, 2.5, 2, COLORS.yellow)
    tBody.position.set(0, 1.25, 0)
    ticketBooth.add(tBody)

    const tRoof = cone(1.8, 1.5, 6, COLORS.red)
    tRoof.position.set(0, 3.25, 0)
    ticketBooth.add(tRoof)

    // Window
    const tWindow = box(1, 0.8, 0.05, COLORS.cyan, { transparent: true, opacity: 0.4 })
    tWindow.position.set(0, 1.8, 1.01)
    ticketBooth.add(tWindow)

    scene.add(ticketBooth)

    const tbdy = world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(tx, 1.25, tz))
    world.createCollider(RAPIER.ColliderDesc.cuboid(1.2, 1.25, 1.2).setFriction(0.3), tbdy)
  }

  // ════════════════════════════════════════════════════════════════
  // STRING LIGHTS — lines of small emissive spheres between structures
  // ════════════════════════════════════════════════════════════════
  const stringLightBulbs = []

  function createStringLights(x1, y1, z1, x2, y2, z2, count, color) {
    for (let i = 0; i <= count; i++) {
      const t = i / count
      const x = x1 + (x2 - x1) * t
      const z = z1 + (z2 - z1) * t
      // Sag in the middle (catenary-like)
      const sag = -Math.sin(t * Math.PI) * 1.5
      const y = y1 + (y2 - y1) * t + sag + 4
      const bulb = sphere(0.1, 4, 3, color, { emissive: color, emissiveIntensity: 0.8 })
      bulb.position.set(x, y, z)
      scene.add(bulb)
      stringLightBulbs.push(bulb)
    }
    // Wire
    const wirePts = []
    for (let i = 0; i <= 20; i++) {
      const t = i / 20
      const x = x1 + (x2 - x1) * t
      const z = z1 + (z2 - z1) * t
      const sag = -Math.sin(t * Math.PI) * 1.5
      const y = y1 + (y2 - y1) * t + sag + 4
      wirePts.push(new THREE.Vector3(x, y, z))
    }
    const wireCurve = new THREE.CatmullRomCurve3(wirePts)
    const wireGeo = new THREE.TubeGeometry(wireCurve, 16, 0.02, 4, false)
    const wire = new THREE.Mesh(wireGeo, mat(0x333333))
    scene.add(wire)
  }

  // Many string light lines connecting various structures
  const lightColor = [COLORS.yellow, COLORS.red, COLORS.blue, COLORS.green, COLORS.pink, COLORS.orange, COLORS.white]
  const lightPairs = [
    [-12, 0, -40, 12, 0, -40],
    [-30, 0, -30, -12, 0, -40],
    [12, 0, -40, 35, 0, -35],
    [-40, 0, -12, -30, 0, -30],
    [40, 0, 12, 35, 0, -35],
    [-12, 0, 40, 12, 0, 40],
    [-10, 0, 10, 10, 0, -10],
    [-15, 0, -25, 15, 0, -25],
    [-15, 0, 30, 15, 0, 30],
    [-45, 0, -40, -30, 0, -30],
    [30, 0, 30, 45, 0, 35],
    [-35, 0, 25, -40, 0, 40],
    [-40, 0, 15, -45, 0, 0],
    [35, 0, 15, 45, 0, 0],
    [0, 0, -50, -20, 0, -40],
    [0, 0, -50, 20, 0, -40],
    [-10, 0, 10, -30, 0, -30],
    [10, 0, -10, 30, 0, 30],
    [-50, 0, 0, -40, 0, -12],
    [50, 0, 0, 40, 0, 12],
    [0, 0, 50, -12, 0, 40],
    [0, 0, 50, 12, 0, 40],
    [-25, 0, 40, -40, 0, 40],
    [25, 0, -40, 40, 0, -25],
    [35, 0, 40, 45, 0, 35],
    [-50, 0, 0, -45, 0, -40],
    [50, 0, 0, 45, 0, 35],
    [-10, 0, 10, -15, 0, 30],
    [10, 0, -10, 15, 0, -25],
    [25, 0, -40, 35, 0, -35],
    [-35, 0, 25, -25, 0, 40],
  ]
  lightPairs.forEach(([x1, y1, z1, x2, y2, z2], i) => {
    createStringLights(x1, y1, z1, x2, y2, z2, 6 + Math.floor(Math.random() * 4), lightColor[i % lightColor.length])
  })

  animatedObjects.push({
    type: 'stringLights',
    bulbs: stringLightBulbs,
  })

  // ════════════════════════════════════════════════════════════════
  // PENNANT FLAG LINES — triangular planes in alternating colors
  // ════════════════════════════════════════════════════════════════
  function createPennantLine(x1, y1, z1, x2, y2, z2, count) {
    const pennantColors = [COLORS.red, COLORS.yellow, COLORS.blue, COLORS.green, COLORS.pink, COLORS.orange]
    for (let i = 0; i <= count; i++) {
      const t = i / count
      const x = x1 + (x2 - x1) * t
      const z = z1 + (z2 - z1) * t
      const sag = -Math.sin(t * Math.PI) * 1.0
      const y = y1 + (y2 - y1) * t + sag + 3.5

      // Triangle pennant
      const triGeo = new THREE.BufferGeometry()
      const vertices = new Float32Array([
        -0.15, 0.3, 0,
        0.15, 0.3, 0,
        0, -0.2, 0,
      ])
      triGeo.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
      triGeo.computeVertexNormals()
      const triMesh = new THREE.Mesh(triGeo, mat(pennantColors[i % pennantColors.length], { side: THREE.DoubleSide }))
      triMesh.position.set(x, y, z)
      triMesh.rotation.y = Math.atan2(x2 - x1, z2 - z1)
      scene.add(triMesh)
    }
  }

  const pennantLines = [
    [-30, 0, -30, 0, 0, -50, 12],
    [0, 0, -50, 35, 0, -35, 14],
    [-45, 0, -40, -30, 0, -30, 8],
    [30, 0, 30, 45, 0, 35, 8],
    [-35, 0, 25, -40, 0, 40, 6],
    [0, 0, 50, 30, 0, 30, 12],
    [-50, 0, 0, -35, 0, 25, 8],
    [50, 0, 0, 35, 0, 15, 8],
    [-10, 0, 10, 10, 0, -10, 10],
    [-40, 0, 15, -25, 0, 40, 8],
    [25, 0, -40, 40, 0, -25, 8],
    [-15, 0, -25, -30, 0, -30, 6],
    [15, 0, -25, 35, 0, -35, 8],
    [-15, 0, 30, -35, 0, 25, 8],
    [15, 0, 30, 30, 0, 30, 6],
    [-12, 0, -40, -20, 0, -40, 5],
    [12, 0, -40, 25, 0, -40, 6],
    [-40, 0, -12, -45, 0, 0, 5],
    [40, 0, 12, 45, 0, 0, 5],
    [-12, 0, 40, 0, 0, 50, 6],
  ]
  pennantLines.forEach(([x1, y1, z1, x2, y2, z2, count]) => {
    createPennantLine(x1, y1, z1, x2, y2, z2, count)
  })

  // ════════════════════════════════════════════════════════════════
  // BALLOON CLUSTERS — groups of colored spheres on strings
  // ════════════════════════════════════════════════════════════════
  function createBalloonCluster(x, z) {
    const clusterGroup = new THREE.Group()
    clusterGroup.position.set(x, 0, z)

    const bColors = [COLORS.red, COLORS.yellow, COLORS.blue, COLORS.pink, COLORS.green]
    const count = 3 + Math.floor(Math.random() * 3)
    for (let i = 0; i < count; i++) {
      const bx = (Math.random() - 0.5) * 0.8
      const by = 3 + Math.random() * 1.5
      const bz = (Math.random() - 0.5) * 0.8

      const balloonMesh = sphere(0.3, 6, 5, bColors[i % bColors.length], { roughness: 0.4 })
      balloonMesh.position.set(bx, by, bz)
      clusterGroup.add(balloonMesh)

      // String
      const stringGeo = new THREE.CylinderGeometry(0.01, 0.01, by, 4)
      const stringMesh = new THREE.Mesh(stringGeo, mat(0x888888))
      stringMesh.position.set(bx, by / 2, bz)
      clusterGroup.add(stringMesh)
    }

    scene.add(clusterGroup)
    return clusterGroup
  }

  const balloonPositions = [
    [-8, -35], [8, -35], [-25, -20], [25, -20],
    [-20, 5], [5, 5], [-5, -5], [20, 5],
    [-8, 35], [8, 35], [-30, 10], [30, -10],
    [-45, -20], [45, 20], [-35, -15], [35, 20],
    [-18, 45], [18, -45], [-48, 30], [48, -30],
    [0, -30], [0, 30], [-25, -45], [25, 45],
  ]
  balloonPositions.forEach(([x, z]) => createBalloonCluster(x, z))

  // ════════════════════════════════════════════════════════════════
  // INTERACTIVE DYNAMIC OBJECTS
  // ════════════════════════════════════════════════════════════════

  // Bowling pins — cluster near (-20, -15)
  const bowlingPositions = []
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col <= row; col++) {
      bowlingPositions.push([
        -20 + (col - row / 2) * 0.5,
        0.5,
        -15 + row * 0.5,
      ])
    }
  }
  bowlingPositions.forEach(([px, py, pz]) => {
    const pin = cyl(0.1, 0.15, 0.8, 6, COLORS.white)
    pin.position.set(px, py, pz)
    scene.add(pin)

    // Red stripe
    const stripe = cyl(0.12, 0.12, 0.15, 6, COLORS.red)
    stripe.position.set(px, py + 0.2, pz)
    scene.add(stripe)

    const pinRB = world.createRigidBody(
      RAPIER.RigidBodyDesc.dynamic().setTranslation(px, py, pz).setLinearDamping(0.2).setAngularDamping(0.3)
    )
    world.createCollider(
      RAPIER.ColliderDesc.cylinder(0.4, 0.15).setDensity(5).setFriction(0.4).setRestitution(0.2),
      pinRB
    )
    syncList.push({ mesh: pin, body: pinRB })
    syncList.push({ mesh: stripe, body: pinRB, offset: new THREE.Vector3(0, 0.2, 0) })
  })

  // Beach balls — large bouncy dynamic spheres
  const beachBallPositions = [
    [0, 2, -25], [15, 2, 15], [-25, 2, 0],
  ]
  beachBallPositions.forEach(([bx, by, bz]) => {
    const beachBall = sphere(0.8, 8, 6, COLORS.red)
    // Add colored stripes by using a second hemisphere
    beachBall.position.set(bx, by, bz)
    scene.add(beachBall)

    const bbRB = world.createRigidBody(
      RAPIER.RigidBodyDesc.dynamic().setTranslation(bx, by, bz).setLinearDamping(0.1).setAngularDamping(0.1)
    )
    world.createCollider(
      RAPIER.ColliderDesc.ball(0.8).setDensity(1).setFriction(0.3).setRestitution(0.8),
      bbRB
    )
    syncList.push({ mesh: beachBall, body: bbRB })
  })

  // Prize boxes — dynamic scattered around
  const prizeBoxPositions = [
    [8, 0.4, -30], [-8, 0.4, 30], [30, 0.4, -15], [-30, 0.4, 15],
  ]
  prizeBoxPositions.forEach(([px, py, pz], i) => {
    const prizeBox = box(0.7, 0.7, 0.7, [COLORS.gold, COLORS.pink, COLORS.cyan, COLORS.lime][i])
    prizeBox.position.set(px, py, pz)
    scene.add(prizeBox)
    // Ribbon
    const ribbon = box(0.72, 0.1, 0.72, COLORS.red)
    ribbon.position.set(px, py + 0.35, pz)
    scene.add(ribbon)
    const ribbon2 = box(0.1, 0.72, 0.72, COLORS.red)
    ribbon2.position.set(px, py, pz)
    scene.add(ribbon2)

    const pbRB = world.createRigidBody(
      RAPIER.RigidBodyDesc.dynamic().setTranslation(px, py, pz).setLinearDamping(0.3).setAngularDamping(0.3)
    )
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(0.35, 0.35, 0.35).setDensity(4).setFriction(0.5).setRestitution(0.3),
      pbRB
    )
    syncList.push({ mesh: prizeBox, body: pbRB })
    syncList.push({ mesh: ribbon, body: pbRB, offset: new THREE.Vector3(0, 0.35, 0) })
    syncList.push({ mesh: ribbon2, body: pbRB })
  })

  // More stacked bottles in booth area (dynamic)
  for (let i = 0; i < 8; i++) {
    const bx = 12 + (i % 4 - 1.5) * 0.4
    const by = 1.5 + Math.floor(i / 4) * 0.6
    const bz = -39

    const extraBottle = cyl(0.12, 0.12, 0.5, 6, COLORS.orange)
    extraBottle.position.set(bx, by, bz)
    scene.add(extraBottle)

    const ebRB = world.createRigidBody(
      RAPIER.RigidBodyDesc.dynamic().setTranslation(bx, by, bz).setLinearDamping(0.2).setAngularDamping(0.3)
    )
    world.createCollider(
      RAPIER.ColliderDesc.cylinder(0.25, 0.12).setDensity(5).setFriction(0.4).setRestitution(0.2),
      ebRB
    )
    syncList.push({ mesh: extraBottle, body: ebRB })
  }

  // ════════════════════════════════════════════════════════════════
  // TRASH BINS — clown themed (cylinder + sphere head)
  // ════════════════════════════════════════════════════════════════
  const trashBinPositions = [
    [-8, -20], [8, -20], [-20, -8], [20, -8],
    [-8, 20], [8, 20], [-20, 8], [20, 8],
    [-35, 0], [35, 0],
  ]
  trashBinPositions.forEach(([tx, tz]) => {
    const binBody = cyl(0.4, 0.35, 1.0, 6, COLORS.green)
    binBody.position.set(tx, 0.5, tz)
    scene.add(binBody)
    // Clown face
    const clownHead = sphere(0.35, 6, 5, COLORS.white)
    clownHead.position.set(tx, 1.35, tz)
    scene.add(clownHead)
    // Red nose
    const nose = sphere(0.1, 4, 3, COLORS.red)
    nose.position.set(tx, 1.35, tz + 0.3)
    scene.add(nose)
    // Hat
    const hat = cone(0.3, 0.5, 5, COLORS.purple)
    hat.position.set(tx, 1.8, tz)
    scene.add(hat)

    const binBdy = world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(tx, 0.5, tz))
    world.createCollider(RAPIER.ColliderDesc.cylinder(0.5, 0.4).setFriction(0.3), binBdy)
  })

  // ════════════════════════════════════════════════════════════════
  // ADDITIONAL DECORATIONS — scattered across map
  // ════════════════════════════════════════════════════════════════

  // Lamp posts with colored lights
  const lampPositions = [
    [-10, -30], [10, -30], [-30, -10], [30, -10],
    [-10, 30], [10, 30], [-30, 10], [30, 10],
    [-45, -20], [45, -20], [-45, 20], [45, 20],
    [0, -15], [0, 15], [-15, 0], [15, 0],
  ]
  lampPositions.forEach(([lx, lz], i) => {
    const lampPole = cyl(0.1, 0.15, 4, 5, 0x444444, { metalness: 0.5 })
    lampPole.position.set(lx, 2, lz)
    scene.add(lampPole)
    const lampGlobe = sphere(0.25, 6, 5, lightColor[i % lightColor.length], { emissive: lightColor[i % lightColor.length], emissiveIntensity: 0.6 })
    lampGlobe.position.set(lx, 4.2, lz)
    scene.add(lampGlobe)

    const lpBdy = world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(lx, 2, lz))
    world.createCollider(RAPIER.ColliderDesc.cylinder(2, 0.15).setFriction(0.3), lpBdy)
  })

  // Benches
  const benchPositions = [
    [-5, -30, 0], [5, -30, 0], [-30, -5, Math.PI / 2], [30, -5, Math.PI / 2],
    [-5, 30, 0], [5, 30, 0], [-30, 5, Math.PI / 2], [30, 5, Math.PI / 2],
  ]
  benchPositions.forEach(([bx, bz, br]) => {
    const benchGroup = new THREE.Group()
    benchGroup.position.set(bx, 0, bz)
    benchGroup.rotation.y = br

    const benchSeat = box(2, 0.15, 0.6, COLORS.brown)
    benchSeat.position.set(0, 0.6, 0)
    benchGroup.add(benchSeat)
    const benchBack = box(2, 0.8, 0.1, COLORS.brown)
    benchBack.position.set(0, 1.1, -0.3)
    benchGroup.add(benchBack)
    // Legs
    for (const lx of [-0.8, 0.8]) {
      const benchLeg = box(0.1, 0.6, 0.5, 0x444444)
      benchLeg.position.set(lx, 0.3, 0)
      benchGroup.add(benchLeg)
    }

    scene.add(benchGroup)

    const benchBdy = world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(bx, 0.5, bz))
    world.createCollider(RAPIER.ColliderDesc.cuboid(1.1, 0.5, 0.4).setFriction(0.3), benchBdy)
  })

  // Popcorn cart (standalone)
  const popcornCartGroup = new THREE.Group()
  popcornCartGroup.position.set(-35, 0, -10)
  scene.add(popcornCartGroup)
  const pcBody = box(1.5, 1.5, 1, COLORS.red)
  pcBody.position.set(0, 1, 0)
  popcornCartGroup.add(pcBody)
  const pcGlass = box(1.3, 0.8, 0.8, COLORS.white, { transparent: true, opacity: 0.3 })
  pcGlass.position.set(0, 2.15, 0)
  popcornCartGroup.add(pcGlass)
  // Popcorn inside
  for (let i = 0; i < 10; i++) {
    const k = sphere(0.06, 4, 3, COLORS.yellow)
    k.position.set((Math.random() - 0.5) * 0.8, 1.9 + Math.random() * 0.5, (Math.random() - 0.5) * 0.5)
    popcornCartGroup.add(k)
  }
  // Wheels
  for (const wz of [-0.5, 0.5]) {
    const pcWheel = cyl(0.25, 0.25, 0.1, 8, 0x333333)
    pcWheel.position.set(-0.8, 0.25, wz)
    pcWheel.rotation.x = Math.PI / 2
    popcornCartGroup.add(pcWheel)
  }
  const pcBdy = world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(-35, 1, -10))
  world.createCollider(RAPIER.ColliderDesc.cuboid(0.8, 1, 0.6).setFriction(0.3), pcBdy)

  // Candy cane poles (decorative, at various spots)
  const candyCanePositions = [
    [-15, -45], [15, -45], [-45, -15], [45, -15],
    [-15, 45], [15, 45], [-45, 15], [45, 15],
    [-25, -25], [25, -25], [-25, 25], [25, 25],
  ]
  candyCanePositions.forEach(([cx, cz]) => {
    // Striped pole
    for (let s = 0; s < 6; s++) {
      const seg = cyl(0.12, 0.12, 0.5, 5, s % 2 === 0 ? COLORS.red : COLORS.white)
      seg.position.set(cx, 0.25 + s * 0.5, cz)
      scene.add(seg)
    }
    // Top sphere
    const ccTop = sphere(0.2, 5, 4, COLORS.red)
    ccTop.position.set(cx, 3.25, cz)
    scene.add(ccTop)

    const ccBdy = world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(cx, 1.5, cz))
    world.createCollider(RAPIER.ColliderDesc.cylinder(1.5, 0.15).setFriction(0.3), ccBdy)
  })

  // ════════════════════════════════════════════════════════════════
  // SIGNPOSTS — directional signs around the park
  // ════════════════════════════════════════════════════════════════
  const signPositions = [
    [0, 0, -10, 0], [0, 0, 10, Math.PI],
    [-10, 0, 0, Math.PI / 2], [10, 0, 0, -Math.PI / 2],
  ]
  signPositions.forEach(([sx, _, sz, sr]) => {
    const signPost = cyl(0.08, 0.08, 3, 4, COLORS.brown)
    signPost.position.set(sx, 1.5, sz)
    scene.add(signPost)

    for (let a = 0; a < 3; a++) {
      const arrow = box(1.2, 0.3, 0.08, [COLORS.red, COLORS.blue, COLORS.green][a])
      arrow.position.set(sx + 0.5, 2.2 + a * 0.4, sz)
      arrow.rotation.y = sr + (a - 1) * 0.3
      scene.add(arrow)
    }
  })

  // ════════════════════════════════════════════════════════════════
  // FLOWER BEDS — colorful flower patches
  // ════════════════════════════════════════════════════════════════
  const flowerBedPositions = [
    [-5, -15], [5, -15], [-15, -5], [15, -5],
    [-5, 25], [5, 25], [-25, 5], [25, 5],
  ]
  flowerBedPositions.forEach(([fx, fz]) => {
    // Flower bed border
    const border = torus(1.2, 0.15, 4, 8, COLORS.brown)
    border.position.set(fx, 0.15, fz)
    border.rotation.x = Math.PI / 2
    scene.add(border)

    // Dirt patch
    const dirt = cyl(1.1, 1.1, 0.1, 6, COLORS.brown)
    dirt.position.set(fx, 0.05, fz)
    scene.add(dirt)

    // Flowers
    const flowerColors = [COLORS.red, COLORS.yellow, COLORS.pink, COLORS.purple, COLORS.orange]
    for (let f = 0; f < 7; f++) {
      const fAngle = (f / 7) * Math.PI * 2
      const fr = 0.5 + Math.random() * 0.4
      const stem = cyl(0.02, 0.02, 0.4, 4, COLORS.green)
      stem.position.set(fx + Math.cos(fAngle) * fr, 0.3, fz + Math.sin(fAngle) * fr)
      scene.add(stem)
      const petal = sphere(0.1, 5, 4, flowerColors[f % flowerColors.length])
      petal.position.set(fx + Math.cos(fAngle) * fr, 0.55, fz + Math.sin(fAngle) * fr)
      scene.add(petal)
    }
  })

  // ════════════════════════════════════════════════════════════════
  // PINWHEELS — spinning decorations
  // ════════════════════════════════════════════════════════════════
  const pinwheels = []
  const pinwheelPositions = [
    [-18, -35], [18, -35], [-35, -18], [35, -18],
    [-18, 35], [18, 35], [-35, 18], [35, 18],
  ]
  pinwheelPositions.forEach(([px, pz]) => {
    const pinGroup = new THREE.Group()
    pinGroup.position.set(px, 0, pz)

    // Stick
    const stick = cyl(0.04, 0.04, 1.5, 4, COLORS.white)
    stick.position.set(0, 0.75, 0)
    pinGroup.add(stick)

    // Pinwheel head (spinning part)
    const headGroup = new THREE.Group()
    headGroup.position.set(0, 1.6, 0)

    for (let b = 0; b < 4; b++) {
      const blade = box(0.4, 0.02, 0.15, [COLORS.red, COLORS.blue, COLORS.yellow, COLORS.green][b])
      blade.position.set(0.2, 0, 0)
      blade.rotation.z = (b / 4) * Math.PI * 2

      const bladeGroup = new THREE.Group()
      bladeGroup.add(blade)
      bladeGroup.rotation.z = (b / 4) * Math.PI * 2
      headGroup.add(bladeGroup)
    }

    pinGroup.add(headGroup)
    scene.add(pinGroup)

    pinwheels.push(headGroup)
  })

  animatedObjects.push({
    type: 'pinwheels',
    heads: pinwheels,
    speed: 3.0,
  })

  // ════════════════════════════════════════════════════════════════
  // STARS / SKY DECORATIONS — large glowing spheres up high
  // ════════════════════════════════════════════════════════════════
  for (let i = 0; i < 12; i++) {
    const starX = (Math.random() - 0.5) * 100
    const starY = 25 + Math.random() * 15
    const starZ = (Math.random() - 0.5) * 100
    const starMesh = sphere(0.3, 4, 3, COLORS.gold, { emissive: 0xffd700, emissiveIntensity: 1.0 })
    starMesh.position.set(starX, starY, starZ)
    scene.add(starMesh)
  }

  // ════════════════════════════════════════════════════════════════
  // RETURN OBJECT
  // ════════════════════════════════════════════════════════════════
  let elapsed = 0

  return {
    syncList,
    update(dt) {
      elapsed += dt

      for (const obj of animatedObjects) {
        switch (obj.type) {
          case 'ferris': {
            // Rotate the wheel
            obj.pivot.rotation.z += obj.speed * dt
            // Counter-rotate gondolas to keep them upright
            for (const gondola of obj.gondolas) {
              gondola.rotation.z = -obj.pivot.rotation.z
            }
            break
          }

          case 'carousel': {
            obj.spin.rotation.y += obj.speed * dt
            break
          }

          case 'swing': {
            // Rotate the whole swing mechanism
            obj.spin.rotation.y += obj.speed * dt

            // Tilt seats outward as they spin
            const tilt = obj.tiltAmount * Math.min(1, obj.speed)
            for (const seat of obj.seats) {
              // Seats tilt outward from center
              const angle = Math.atan2(seat.position.x, seat.position.z)
              seat.rotation.x = Math.sin(angle + obj.spin.rotation.y) * tilt * 0.3
              seat.rotation.z = Math.cos(angle + obj.spin.rotation.y) * tilt * 0.3
            }
            break
          }

          case 'coaster': {
            // Move cart along track
            obj.t += obj.speed * dt
            if (obj.t >= obj.points.length) obj.t -= obj.points.length

            const idx = Math.floor(obj.t)
            const frac = obj.t - idx
            const p1 = obj.points[idx % obj.points.length]
            const p2 = obj.points[(idx + 1) % obj.points.length]

            const cx = p1[0] + (p2[0] - p1[0]) * frac
            const cy = p1[1] + (p2[1] - p1[1]) * frac + 0.5
            const cz = p1[2] + (p2[2] - p1[2]) * frac

            obj.cart.position.set(cx, cy, cz)
            obj.cart.lookAt(p2[0], p2[1] + 0.5, p2[2])
            break
          }

          case 'fountain': {
            // Animated fountain jets bobbing
            obj.lights.forEach((light, i) => {
              light.position.y = obj.baseY + Math.sin(elapsed * 2 + i * 0.8) * 0.4
              light.material.emissiveIntensity = 0.3 + Math.sin(elapsed * 3 + i) * 0.3
            })
            break
          }

          case 'stringLights': {
            // Shimmer string lights
            if (Math.floor(elapsed * 10) % 3 === 0) {
              const idx = Math.floor(Math.random() * obj.bulbs.length)
              const bulb = obj.bulbs[idx]
              if (bulb) {
                bulb.material.emissiveIntensity = 0.4 + Math.random() * 0.6
              }
            }
            break
          }

          case 'pinwheels': {
            for (const head of obj.heads) {
              head.rotation.z += obj.speed * dt
            }
            break
          }
        }
      }

      // Sync dynamic bodies
      for (const item of syncList) {
        const pos = item.body.translation()
        const rot = item.body.rotation()
        if (item.offset) {
          // Apply offset in local space
          _v3.copy(item.offset)
          _v3.applyQuaternion(new THREE.Quaternion(rot.x, rot.y, rot.z, rot.w))
          item.mesh.position.set(pos.x + _v3.x, pos.y + _v3.y, pos.z + _v3.z)
        } else {
          item.mesh.position.set(pos.x, pos.y, pos.z)
        }
        item.mesh.quaternion.set(rot.x, rot.y, rot.z, rot.w)
      }
    },
  }
}
