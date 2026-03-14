/**
 * Beach World — Tropical Island Paradise
 *
 * Full-sized world (~120×120 units, origin-centered).
 * Sandy island surrounded by ocean, palm trees, lighthouse, tiki bar,
 * harbor dock, boats, and tons of beach props.
 *
 * Portfolio buildings sit at (0,-20), (20,0), (0,20), (-20,0).
 */
import * as THREE from 'three'

// ── Reusable temp objects ──────────────────────────────────────────
const _q = new THREE.Quaternion()
const _e = new THREE.Euler()

// ── Palette ────────────────────────────────────────────────────────
const SAND          = 0xe8d5a3
const SAND_DARK     = 0xd4c48a
const SAND_WET      = 0xc4b07a
const WATER_BLUE    = 0x2196f3
const WATER_SHALLOW = 0x4fc3f7
const WATER_DEEP    = 0x0d47a1
const SKY_COLOR     = 0x6ecbf5
const WOOD          = 0x8b6914
const WOOD_DARK     = 0x6d4c2a
const BAMBOO        = 0xa08040
const WHITE         = 0xffffff
const RED           = 0xcc2222
const LIGHTHOUSE_RED = 0xcc3333
const YELLOW        = 0xffdd44
const ORANGE        = 0xff6600
const PALM_TRUNK    = 0x8b5e3c
const PALM_GREEN    = 0x2d8a4e
const PALM_GREEN2   = 0x35a058
const COCONUT_BROWN = 0x6b4226
const ROCK_GRAY     = 0x777777
const ROCK_DARK     = 0x555555
const CORAL_PINK    = 0xff7799
const CORAL_ORANGE  = 0xff8844
const CORAL_PURPLE  = 0xaa55cc
const SEAWEED_GREEN = 0x2a6e3f
const THATCH        = 0xb8a060
const ROPE_COLOR    = 0xc4a35a
const IRON          = 0x444444
const GOLD          = 0xdaa520
const FLAME_COLOR   = 0xff6622

// ── Helpers ────────────────────────────────────────────────────────
function mat(color, opts = {}) {
  return new THREE.MeshStandardMaterial({ color, flatShading: true, ...opts })
}

function shadow(mesh) {
  mesh.castShadow = true
  mesh.receiveShadow = true
  return mesh
}

// ── Main export ────────────────────────────────────────────────────
export function createWorld(scene, RAPIER, world) {
  const syncList = []
  const group = new THREE.Group()

  // Animated object references
  let waterMesh, waterOrigY
  let lighthouseBeacon
  let sailboatGroup, pirateShipGroup
  let buoy1Group, buoy2Group
  const tikitorches = []
  let elapsedTime = 0
  const seaweedPlanes = []

  // ════════════════════════════════════════════════════════════════
  // SCENE — sky + fog
  // ════════════════════════════════════════════════════════════════
  scene.background = new THREE.Color(SKY_COLOR)
  scene.fog = new THREE.Fog(SKY_COLOR, 60, 130)

  // ════════════════════════════════════════════════════════════════
  // GROUND — sandy island (circular) + Rapier collider
  // ════════════════════════════════════════════════════════════════
  const groundGeo = new THREE.CircleGeometry(55, 24)
  const groundMesh = new THREE.Mesh(groundGeo, mat(SAND))
  groundMesh.rotation.x = -Math.PI / 2
  groundMesh.position.set(0, 0, 0)
  groundMesh.receiveShadow = true
  group.add(groundMesh)

  // Ground Rapier collider — large flat cuboid
  {
    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(0, -0.25, 0)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(60, 0.25, 60).setFriction(0.7),
      body
    )
  }

  // Wet sand ring near shore (slightly darker)
  const wetSandGeo = new THREE.RingGeometry(42, 52, 32)
  const wetSand = new THREE.Mesh(wetSandGeo, mat(SAND_WET))
  wetSand.rotation.x = -Math.PI / 2
  wetSand.position.y = 0.01
  wetSand.receiveShadow = true
  group.add(wetSand)

  // ════════════════════════════════════════════════════════════════
  // WATER — large transparent plane surrounding island
  // ════════════════════════════════════════════════════════════════
  const waterGeo = new THREE.PlaneGeometry(180, 180, 32, 32)
  waterMesh = new THREE.Mesh(waterGeo, mat(WATER_BLUE, {
    transparent: true,
    opacity: 0.6,
    side: THREE.DoubleSide,
  }))
  waterMesh.rotation.x = -Math.PI / 2
  waterMesh.position.y = -0.15
  waterMesh.receiveShadow = true
  group.add(waterMesh)
  waterOrigY = Float32Array.from(waterGeo.attributes.position.array)

  // Shallow lagoon (lighter blue, enclosed area)
  const lagoonGeo = new THREE.CircleGeometry(8, 12)
  const lagoonMesh = new THREE.Mesh(lagoonGeo, mat(WATER_SHALLOW, {
    transparent: true,
    opacity: 0.5,
  }))
  lagoonMesh.rotation.x = -Math.PI / 2
  lagoonMesh.position.set(35, -0.05, -25)
  group.add(lagoonMesh)

  // Lagoon enclosing rocks
  const lagoonRockAngles = [0, 0.5, 1.0, 1.5, 2.1, 2.7, 3.3, 3.9, 4.5, 5.1, 5.7]
  for (const angle of lagoonRockAngles) {
    const rx = 35 + Math.cos(angle) * 8.5
    const rz = -25 + Math.sin(angle) * 8.5
    const size = 0.6 + Math.random() * 0.8
    const rockGeo = new THREE.DodecahedronGeometry(size, 0)
    const rock = shadow(new THREE.Mesh(rockGeo, mat(ROCK_GRAY)))
    rock.position.set(rx, size * 0.3, rz)
    rock.rotation.set(Math.random(), Math.random(), Math.random())
    rock.scale.y = 0.5 + Math.random() * 0.3
    group.add(rock)
  }

  // ════════════════════════════════════════════════════════════════
  // BOUNDARY WALLS — invisible at ±60
  // ════════════════════════════════════════════════════════════════
  const wallH = 5
  const wallPositions = [
    { x: 0,   z: -60, hw: 60, hd: 0.5 },
    { x: 0,   z:  60, hw: 60, hd: 0.5 },
    { x: -60, z: 0,   hw: 0.5, hd: 60 },
    { x:  60, z: 0,   hw: 0.5, hd: 60 },
  ]
  for (const w of wallPositions) {
    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(w.x, wallH / 2, w.z)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(w.hw, wallH / 2, w.hd).setFriction(0.3),
      body
    )
  }

  // ════════════════════════════════════════════════════════════════
  // ROCKY OUTCROPS (clusters at edges)
  // ════════════════════════════════════════════════════════════════
  const rockClusterPositions = [
    [-45, -35], [-40, 30], [42, 35], [48, -10], [-35, -42], [30, 45],
    [-48, 5], [45, -38], [-25, 48], [50, 20],
  ]
  for (const [rcx, rcz] of rockClusterPositions) {
    const count = 3 + Math.floor(Math.random() * 4)
    for (let i = 0; i < count; i++) {
      const size = 0.5 + Math.random() * 1.2
      const rockGeo = new THREE.DodecahedronGeometry(size, 0)
      const rock = shadow(new THREE.Mesh(rockGeo, mat(
        Math.random() > 0.5 ? ROCK_GRAY : ROCK_DARK
      )))
      rock.position.set(
        rcx + (Math.random() - 0.5) * 5,
        size * 0.3,
        rcz + (Math.random() - 0.5) * 5
      )
      rock.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2)
      rock.scale.y = 0.4 + Math.random() * 0.4
      group.add(rock)
    }
  }

  // ════════════════════════════════════════════════════════════════
  // LIGHTHOUSE — tall, white+red stripes, pulsing beacon
  // ════════════════════════════════════════════════════════════════
  const LH_X = -40, LH_Z = -30
  const lighthouseGroup = new THREE.Group()
  lighthouseGroup.position.set(LH_X, 0, LH_Z)

  // Tower
  const towerGeo = new THREE.CylinderGeometry(1.2, 1.8, 12, 8)
  lighthouseGroup.add(shadow(new THREE.Mesh(towerGeo, mat(WHITE))).translateY(6))

  // Red stripes (4 bands)
  for (let i = 0; i < 4; i++) {
    const t = i / 4
    const r = 1.75 - t * 0.5
    const stripeGeo = new THREE.CylinderGeometry(r + 0.03, r + 0.06, 0.7, 8)
    const stripe = shadow(new THREE.Mesh(stripeGeo, mat(LIGHTHOUSE_RED)))
    stripe.position.y = 1.5 + i * 2.8
    lighthouseGroup.add(stripe)
  }

  // Railing platform
  const railingGeo = new THREE.TorusGeometry(1.6, 0.06, 6, 10)
  const railing = shadow(new THREE.Mesh(railingGeo, mat(IRON)))
  railing.rotation.x = Math.PI / 2
  railing.position.y = 12.2
  lighthouseGroup.add(railing)

  // Railing posts
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2
    const post = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 0.8, 4),
      mat(IRON)
    ))
    post.position.set(Math.cos(a) * 1.6, 11.9, Math.sin(a) * 1.6)
    lighthouseGroup.add(post)
  }

  // Dome top
  const domeGeo = new THREE.SphereGeometry(1.4, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2)
  const dome = shadow(new THREE.Mesh(domeGeo, mat(RED)))
  dome.position.y = 12.5
  lighthouseGroup.add(dome)

  // Beacon
  const beaconMat = new THREE.MeshStandardMaterial({
    color: YELLOW,
    emissive: YELLOW,
    emissiveIntensity: 2,
    flatShading: true,
  })
  lighthouseBeacon = new THREE.Mesh(new THREE.SphereGeometry(0.5, 6, 6), beaconMat)
  lighthouseBeacon.position.y = 12.8
  lighthouseGroup.add(lighthouseBeacon)

  const beaconLight = new THREE.PointLight(0xffee88, 4, 40)
  beaconLight.position.y = 12.8
  lighthouseGroup.add(beaconLight)
  lighthouseBeacon._pointLight = beaconLight

  // Door
  const lhDoor = shadow(new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 1.4, 0.12),
    mat(WOOD_DARK)
  ))
  lhDoor.position.set(0, 0.7, 1.8)
  lighthouseGroup.add(lhDoor)

  group.add(lighthouseGroup)

  // Lighthouse collider
  {
    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(LH_X, 6, LH_Z)
    const body = world.createRigidBody(bd)
    world.createCollider(RAPIER.ColliderDesc.cylinder(6, 1.8).setFriction(0.5), body)
  }

  // ════════════════════════════════════════════════════════════════
  // WOODEN DOCK / PIER — extends from shore into water, driveable
  // ════════════════════════════════════════════════════════════════
  const DOCK_X = 40, DOCK_Z = 0
  const dockLength = 20
  const dockWidth = 4
  const dockGroup = new THREE.Group()

  // Planks
  const plankCount = 18
  for (let i = 0; i < plankCount; i++) {
    const plankGeo = new THREE.BoxGeometry(dockWidth, 0.14, dockLength / plankCount - 0.04)
    const plank = shadow(new THREE.Mesh(plankGeo, mat(i % 2 === 0 ? WOOD : WOOD_DARK)))
    plank.position.set(DOCK_X, 0.45, DOCK_Z - dockLength / 2 + (i + 0.5) * (dockLength / plankCount))
    dockGroup.add(plank)
  }

  // Side rails
  for (let side = -1; side <= 1; side += 2) {
    const railGeo = new THREE.BoxGeometry(0.1, 0.7, dockLength)
    const rail = shadow(new THREE.Mesh(railGeo, mat(WOOD)))
    rail.position.set(DOCK_X + side * (dockWidth / 2 + 0.05), 0.85, DOCK_Z)
    dockGroup.add(rail)

    // Rail posts
    for (let p = 0; p < 6; p++) {
      const postGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.9, 4)
      const post = shadow(new THREE.Mesh(postGeo, mat(WOOD_DARK)))
      post.position.set(
        DOCK_X + side * (dockWidth / 2 + 0.05),
        0.6,
        DOCK_Z - dockLength / 2 + 2 + p * (dockLength / 6)
      )
      dockGroup.add(post)
    }
  }

  // Support pilings
  for (let i = 0; i < 5; i++) {
    for (let side = -1; side <= 1; side += 2) {
      const pilingGeo = new THREE.CylinderGeometry(0.14, 0.18, 2.0, 6)
      const piling = shadow(new THREE.Mesh(pilingGeo, mat(WOOD_DARK)))
      piling.position.set(
        DOCK_X + side * (dockWidth / 2 - 0.4),
        -0.5,
        DOCK_Z - dockLength / 2 + 2 + i * (dockLength / 4.5)
      )
      dockGroup.add(piling)
    }
  }

  // Mooring posts with rope coils
  for (let i = 0; i < 4; i++) {
    const side = i % 2 === 0 ? 1 : -1
    const mz = DOCK_Z - dockLength / 2 + 3 + i * 5
    const postGeo = new THREE.CylinderGeometry(0.15, 0.18, 0.6, 6)
    const post = shadow(new THREE.Mesh(postGeo, mat(WOOD_DARK)))
    post.position.set(DOCK_X + side * (dockWidth / 2 - 0.3), 0.8, mz)
    dockGroup.add(post)

    const ropeGeo = new THREE.TorusGeometry(0.2, 0.04, 4, 8)
    const rope = shadow(new THREE.Mesh(ropeGeo, mat(ROPE_COLOR)))
    rope.rotation.x = Math.PI / 2
    rope.position.set(DOCK_X + side * (dockWidth / 2 - 0.3), 1.1, mz)
    dockGroup.add(rope)
  }

  group.add(dockGroup)

  // Dock collider (driveable surface)
  {
    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(DOCK_X, 0.25, DOCK_Z)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(dockWidth / 2, 0.25, dockLength / 2).setFriction(0.6),
      body
    )
  }

  // ════════════════════════════════════════════════════════════════
  // TIKI BAR — open structure with bamboo + thatched roof
  // ════════════════════════════════════════════════════════════════
  const TIKI_X = -25, TIKI_Z = 25
  const tikiGroup = new THREE.Group()
  tikiGroup.position.set(TIKI_X, 0, TIKI_Z)

  // Bamboo poles (4 corners)
  const tikCorners = [[-2, -1.5], [2, -1.5], [-2, 1.5], [2, 1.5]]
  for (const [tx, tz] of tikCorners) {
    const poleGeo = new THREE.CylinderGeometry(0.12, 0.14, 3.5, 6)
    const pole = shadow(new THREE.Mesh(poleGeo, mat(BAMBOO)))
    pole.position.set(tx, 1.75, tz)
    tikiGroup.add(pole)
  }

  // Thatched roof (wide cone)
  const roofGeo = new THREE.ConeGeometry(3.5, 1.5, 8)
  const roof = shadow(new THREE.Mesh(roofGeo, mat(THATCH)))
  roof.position.y = 4.0
  tikiGroup.add(roof)

  // Bar counter
  const counterGeo = new THREE.BoxGeometry(4.2, 0.2, 1.0)
  const counter = shadow(new THREE.Mesh(counterGeo, mat(WOOD)))
  counter.position.set(0, 1.1, -1.3)
  tikiGroup.add(counter)

  // Shelves behind bar
  const shelfGeo = new THREE.BoxGeometry(3.8, 0.08, 0.5)
  for (let sh = 0; sh < 2; sh++) {
    const shelf = shadow(new THREE.Mesh(shelfGeo, mat(WOOD_DARK)))
    shelf.position.set(0, 1.8 + sh * 0.7, 1.2)
    tikiGroup.add(shelf)
  }

  // Bar stools (5)
  for (let s = 0; s < 5; s++) {
    const stoolGroup = new THREE.Group()
    const sx = -1.6 + s * 0.8
    // Leg
    const legGeo = new THREE.CylinderGeometry(0.05, 0.06, 0.9, 6)
    stoolGroup.add(shadow(new THREE.Mesh(legGeo, mat(WOOD_DARK))).translateY(0.45))
    // Seat
    const seatGeo = new THREE.CylinderGeometry(0.22, 0.2, 0.08, 8)
    stoolGroup.add(shadow(new THREE.Mesh(seatGeo, mat(WOOD))).translateY(0.92))
    stoolGroup.position.set(sx, 0, -2.0)
    tikiGroup.add(stoolGroup)
  }

  // Bottles on shelf (small cylinders)
  const bottleColors = [0x44aa44, 0xaa4444, 0x4444aa, 0xaaaa44, 0xaa44aa]
  for (let b = 0; b < 5; b++) {
    const bottleGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.3, 5)
    const bottle = shadow(new THREE.Mesh(bottleGeo, mat(bottleColors[b])))
    bottle.position.set(-1.4 + b * 0.7, 1.95, 1.2)
    tikiGroup.add(bottle)
  }

  group.add(tikiGroup)

  // Tiki bar collider
  {
    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(TIKI_X, 1.75, TIKI_Z)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(2.2, 1.75, 1.8).setFriction(0.5),
      body
    )
  }

  // ════════════════════════════════════════════════════════════════
  // LIFEGUARD TOWER — elevated platform on stilts
  // ════════════════════════════════════════════════════════════════
  const LG_X = 25, LG_Z = -35
  const lgGroup = new THREE.Group()
  lgGroup.position.set(LG_X, 0, LG_Z)

  // Stilts (4 legs)
  for (let lx = -1; lx <= 1; lx += 2) {
    for (let lz = -1; lz <= 1; lz += 2) {
      const stiltGeo = new THREE.CylinderGeometry(0.1, 0.12, 3.5, 6)
      const stilt = shadow(new THREE.Mesh(stiltGeo, mat(WOOD)))
      stilt.position.set(lx * 0.8, 1.75, lz * 0.6)
      lgGroup.add(stilt)
    }
  }

  // Cross braces
  for (let side = -1; side <= 1; side += 2) {
    const braceGeo = new THREE.BoxGeometry(0.06, 0.06, 2.0)
    const brace = shadow(new THREE.Mesh(braceGeo, mat(WOOD)))
    brace.position.set(side * 0.8, 1.5, 0)
    brace.rotation.x = 0.7
    lgGroup.add(brace)
  }

  // Platform
  const platGeo = new THREE.BoxGeometry(2.0, 0.14, 1.5)
  lgGroup.add(shadow(new THREE.Mesh(platGeo, mat(WOOD))).translateY(3.4))

  // Walls
  const wallBack = shadow(new THREE.Mesh(
    new THREE.BoxGeometry(2.0, 1.2, 0.08), mat(WHITE)
  ))
  wallBack.position.set(0, 4.1, -0.7)
  lgGroup.add(wallBack)

  for (let side = -1; side <= 1; side += 2) {
    const sw = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 1.2, 1.3), mat(WHITE)
    ))
    sw.position.set(side * 0.96, 4.1, -0.05)
    lgGroup.add(sw)
  }

  // Roof (red)
  const lgRoof = shadow(new THREE.Mesh(
    new THREE.BoxGeometry(2.4, 0.1, 1.8), mat(RED)
  ))
  lgRoof.position.set(0, 4.8, 0)
  lgRoof.rotation.x = 0.08
  lgGroup.add(lgRoof)

  // Ladder
  for (let r = 0; r < 6; r++) {
    const rung = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(0.6, 0.05, 0.05), mat(WOOD)
    ))
    rung.position.set(0, 0.3 + r * 0.55, 0.7)
    lgGroup.add(rung)
  }

  group.add(lgGroup)

  // Lifeguard collider
  {
    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(LG_X, 2.4, LG_Z)
    const body = world.createRigidBody(bd)
    world.createCollider(RAPIER.ColliderDesc.cuboid(1.0, 2.4, 0.8).setFriction(0.5), body)
  }

  // ════════════════════════════════════════════════════════════════
  // BEACH SHACK — small surf rental building
  // ════════════════════════════════════════════════════════════════
  const SHACK_X = -15, SHACK_Z = -35
  const shackGroup = new THREE.Group()
  shackGroup.position.set(SHACK_X, 0, SHACK_Z)

  // Walls
  const shackWall = shadow(new THREE.Mesh(
    new THREE.BoxGeometry(3.5, 2.5, 3.0), mat(0xddcc99)
  ))
  shackWall.position.y = 1.25
  shackGroup.add(shackWall)

  // Roof
  const shackRoof = shadow(new THREE.Mesh(
    new THREE.ConeGeometry(2.8, 1.2, 4), mat(THATCH)
  ))
  shackRoof.position.y = 3.1
  shackRoof.rotation.y = Math.PI / 4
  shackGroup.add(shackRoof)

  // Door
  const shackDoor = shadow(new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 1.5, 0.1), mat(WOOD_DARK)
  ))
  shackDoor.position.set(0, 0.75, 1.51)
  shackGroup.add(shackDoor)

  // Window
  const shackWindow = shadow(new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 0.6, 0.1), mat(0x88bbdd, { transparent: true, opacity: 0.4 })
  ))
  shackWindow.position.set(1.2, 1.5, 1.51)
  shackGroup.add(shackWindow)

  // Sign "SURF" (thin box)
  const surfSign = shadow(new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 0.4, 0.08), mat(0xff4444)
  ))
  surfSign.position.set(0, 2.3, 1.52)
  shackGroup.add(surfSign)

  // Surfboards leaning against shack
  const surfColors = [ORANGE, 0x33aaff, 0xffcc00]
  for (let sb = 0; sb < 3; sb++) {
    const surfGeo = new THREE.BoxGeometry(0.28, 2.0, 0.06)
    const surf = shadow(new THREE.Mesh(surfGeo, mat(surfColors[sb])))
    surf.position.set(-1.3 + sb * 0.4, 1.0, -1.6)
    surf.rotation.z = 0.15
    surf.rotation.y = 0.1 * sb
    shackGroup.add(surf)
  }

  group.add(shackGroup)

  // Shack collider
  {
    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(SHACK_X, 1.25, SHACK_Z)
    const body = world.createRigidBody(bd)
    world.createCollider(RAPIER.ColliderDesc.cuboid(1.75, 1.25, 1.5).setFriction(0.5), body)
  }

  // ════════════════════════════════════════════════════════════════
  // BOARDWALK — wooden plank path along part of the shore
  // ════════════════════════════════════════════════════════════════
  const boardwalkPlanks = 30
  for (let i = 0; i < boardwalkPlanks; i++) {
    const angle = (i / boardwalkPlanks) * Math.PI * 0.6 - Math.PI * 0.3
    const radius = 44
    const bx = Math.cos(angle) * radius
    const bz = Math.sin(angle) * radius
    const plankGeo = new THREE.BoxGeometry(2.5, 0.1, 0.8)
    const plank = shadow(new THREE.Mesh(plankGeo, mat(i % 2 === 0 ? WOOD : WOOD_DARK)))
    plank.position.set(bx, 0.08, bz)
    plank.rotation.y = angle + Math.PI / 2
    group.add(plank)
  }

  // ════════════════════════════════════════════════════════════════
  // SAILBOAT (bobbing, in water)
  // ════════════════════════════════════════════════════════════════
  const SB_X = 48, SB_Z = 20
  sailboatGroup = new THREE.Group()
  sailboatGroup.position.set(SB_X, 0.05, SB_Z)

  // Hull
  const sbHull = shadow(new THREE.Mesh(
    new THREE.BoxGeometry(1.4, 0.6, 3.5), mat(0x884422)
  ))
  sailboatGroup.add(sbHull)

  // Keel
  const sbKeel = shadow(new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 0.35, 3.0), mat(0x663311)
  ))
  sbKeel.position.y = -0.4
  sailboatGroup.add(sbKeel)

  // Mast
  const sbMast = shadow(new THREE.Mesh(
    new THREE.CylinderGeometry(0.06, 0.07, 4.5, 6), mat(WOOD)
  ))
  sbMast.position.set(0, 2.25, -0.2)
  sailboatGroup.add(sbMast)

  // Sail (triangle)
  const sailShape = new THREE.Shape()
  sailShape.moveTo(0, 0)
  sailShape.lineTo(0, 3.2)
  sailShape.lineTo(2.0, 0)
  sailShape.closePath()
  const sailGeo = new THREE.ShapeGeometry(sailShape)
  const sail = new THREE.Mesh(sailGeo, mat(0xf5f0e0, { side: THREE.DoubleSide }))
  sail.rotation.y = Math.PI / 2
  sail.position.set(0, 0.6, -0.2)
  sail.castShadow = true
  sailboatGroup.add(sail)

  // Flag
  const sbFlag = new THREE.Mesh(
    new THREE.PlaneGeometry(0.5, 0.25),
    mat(RED, { side: THREE.DoubleSide })
  )
  sbFlag.position.set(0.3, 4.4, -0.2)
  sailboatGroup.add(sbFlag)

  group.add(sailboatGroup)

  // Sailboat collider
  {
    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(SB_X, 0.1, SB_Z)
    const body = world.createRigidBody(bd)
    world.createCollider(RAPIER.ColliderDesc.cuboid(0.7, 0.5, 1.75).setFriction(0.3), body)
  }

  // ════════════════════════════════════════════════════════════════
  // ROWBOATS on beach (2)
  // ════════════════════════════════════════════════════════════════
  const rowboatPositions = [
    [30, 0.15, -40, 0.4],
    [-35, 0.15, 35, -0.6],
  ]
  for (const [rbx, rby, rbz, rot] of rowboatPositions) {
    const rbGroup = new THREE.Group()
    rbGroup.position.set(rbx, rby, rbz)
    rbGroup.rotation.y = rot

    const rbHull = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(0.9, 0.35, 2.0), mat(0x996633)
    ))
    rbHull.position.y = 0.05
    rbGroup.add(rbHull)

    const rbInner = new THREE.Mesh(
      new THREE.BoxGeometry(0.65, 0.18, 1.6), mat(0x664422)
    )
    rbInner.position.y = 0.2
    rbGroup.add(rbInner)

    // Bench
    rbGroup.add(shadow(new THREE.Mesh(
      new THREE.BoxGeometry(0.6, 0.06, 0.15), mat(WOOD)
    )).translateY(0.24))

    // Oars
    for (let side = -1; side <= 1; side += 2) {
      const oar = shadow(new THREE.Mesh(
        new THREE.CylinderGeometry(0.025, 0.025, 1.6, 4), mat(WOOD)
      ))
      oar.rotation.z = side * 0.3
      oar.rotation.x = 0.1
      oar.position.set(side * 0.5, 0.3, 0.1)
      rbGroup.add(oar)

      const blade = shadow(new THREE.Mesh(
        new THREE.BoxGeometry(0.15, 0.02, 0.3), mat(WOOD_DARK)
      ))
      blade.position.set(side * 0.85, 0.6, 0.1)
      rbGroup.add(blade)
    }

    group.add(rbGroup)
  }

  // ════════════════════════════════════════════════════════════════
  // PIRATE SHIP — larger hull, multiple masts, skull flag (bobbing)
  // ════════════════════════════════════════════════════════════════
  const PS_X = -50, PS_Z = -45
  pirateShipGroup = new THREE.Group()
  pirateShipGroup.position.set(PS_X, -0.1, PS_Z)

  // Hull
  const psHull = shadow(new THREE.Mesh(
    new THREE.BoxGeometry(3.0, 1.2, 7.0), mat(0x5c3a1e)
  ))
  pirateShipGroup.add(psHull)

  // Hull bottom keel
  const psKeel = shadow(new THREE.Mesh(
    new THREE.BoxGeometry(1.8, 0.6, 6.5), mat(0x4a2e15)
  ))
  psKeel.position.y = -0.8
  pirateShipGroup.add(psKeel)

  // Bow (front wedge)
  const bowGeo = new THREE.BoxGeometry(1.5, 0.8, 1.5)
  const bow = shadow(new THREE.Mesh(bowGeo, mat(0x5c3a1e)))
  bow.position.set(0, 0.3, 4.0)
  bow.rotation.x = 0.3
  pirateShipGroup.add(bow)

  // Stern raised deck
  const sternDeck = shadow(new THREE.Mesh(
    new THREE.BoxGeometry(3.0, 0.15, 2.0), mat(WOOD_DARK)
  ))
  sternDeck.position.set(0, 0.9, -2.8)
  pirateShipGroup.add(sternDeck)

  // Stern railing
  const sternRailing = shadow(new THREE.Mesh(
    new THREE.BoxGeometry(3.0, 0.5, 0.08), mat(WOOD)
  ))
  sternRailing.position.set(0, 1.2, -3.8)
  pirateShipGroup.add(sternRailing)

  // Main mast
  const mainMast = shadow(new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 0.12, 7, 6), mat(WOOD)
  ))
  mainMast.position.set(0, 3.5, 0)
  pirateShipGroup.add(mainMast)

  // Fore mast
  const foreMast = shadow(new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.1, 5, 6), mat(WOOD)
  ))
  foreMast.position.set(0, 2.5, 2.5)
  pirateShipGroup.add(foreMast)

  // Mizzen mast
  const mizzenMast = shadow(new THREE.Mesh(
    new THREE.CylinderGeometry(0.07, 0.09, 4, 6), mat(WOOD)
  ))
  mizzenMast.position.set(0, 2.0, -2.5)
  pirateShipGroup.add(mizzenMast)

  // Cross beams (yards)
  for (const [mz, w, my] of [[0, 3.0, 5.5], [0, 2.2, 3.5], [2.5, 2.0, 4.0], [-2.5, 1.6, 3.2]]) {
    const yard = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, w, 4), mat(WOOD_DARK)
    ))
    yard.rotation.z = Math.PI / 2
    yard.position.set(0, my, mz)
    pirateShipGroup.add(yard)
  }

  // Sails (rectangular planes)
  const sailPositions = [
    [0, 4.5, 0, 2.8, 1.8],
    [0, 3.0, 2.5, 1.8, 1.2],
    [0, 2.5, -2.5, 1.4, 1.0],
  ]
  for (const [sx, sy, sz, sw, sh] of sailPositions) {
    const psSail = new THREE.Mesh(
      new THREE.PlaneGeometry(sw, sh),
      mat(0xe8dcc8, { side: THREE.DoubleSide })
    )
    psSail.position.set(sx, sy, sz)
    psSail.castShadow = true
    pirateShipGroup.add(psSail)
  }

  // Skull and crossbones flag (on main mast top)
  const skullFlag = new THREE.Mesh(
    new THREE.PlaneGeometry(1.0, 0.6),
    mat(0x111111, { side: THREE.DoubleSide })
  )
  skullFlag.position.set(0.6, 6.8, 0)
  pirateShipGroup.add(skullFlag)

  // Skull on flag (tiny white sphere)
  const skull = new THREE.Mesh(
    new THREE.SphereGeometry(0.12, 5, 4), mat(WHITE)
  )
  skull.position.set(0.6, 6.85, 0.02)
  pirateShipGroup.add(skull)

  // Crossbones
  for (let cb = -1; cb <= 1; cb += 2) {
    const bone = new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.02, 0.35, 4), mat(WHITE)
    )
    bone.rotation.z = cb * 0.7
    bone.position.set(0.6, 6.72, 0.02)
    pirateShipGroup.add(bone)
  }

  // Cannons (small cylinders)
  for (let ci = 0; ci < 3; ci++) {
    for (let side = -1; side <= 1; side += 2) {
      const cannon = shadow(new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.1, 0.6, 6), mat(IRON)
      ))
      cannon.rotation.z = Math.PI / 2
      cannon.position.set(side * 1.55, 0.3, -1.5 + ci * 1.5)
      pirateShipGroup.add(cannon)
    }
  }

  // Wheel at stern
  const wheelGeo = new THREE.TorusGeometry(0.3, 0.04, 6, 8)
  const wheel = shadow(new THREE.Mesh(wheelGeo, mat(WOOD)))
  wheel.position.set(0, 1.6, -3.0)
  pirateShipGroup.add(wheel)

  // Wheel spokes
  for (let sp = 0; sp < 6; sp++) {
    const spoke = new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.02, 0.6, 4), mat(WOOD)
    )
    spoke.rotation.z = (sp / 6) * Math.PI
    spoke.position.set(0, 1.6, -3.0)
    pirateShipGroup.add(spoke)
  }

  group.add(pirateShipGroup)

  // ════════════════════════════════════════════════════════════════
  // KAYAK on beach
  // ════════════════════════════════════════════════════════════════
  const kayak = shadow(new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.2, 2.2), mat(0xee5522)
  ))
  kayak.position.set(15, 0.12, -42)
  kayak.rotation.y = 0.5
  group.add(kayak)

  // Kayak inner
  const kayakInner = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.1, 1.8), mat(0xaa3311)
  )
  kayakInner.position.set(15, 0.2, -42)
  kayakInner.rotation.y = 0.5
  group.add(kayakInner)

  // Paddle
  const paddle = shadow(new THREE.Mesh(
    new THREE.CylinderGeometry(0.025, 0.025, 2.0, 4), mat(0x222222)
  ))
  paddle.position.set(15.4, 0.3, -42.2)
  paddle.rotation.z = Math.PI / 2
  paddle.rotation.y = 0.5
  group.add(paddle)

  // ════════════════════════════════════════════════════════════════
  // PALM TREES (22) — curved trunks, sphere canopy, coconuts
  // ════════════════════════════════════════════════════════════════
  const palmPositions = [
    // Beach perimeter
    [-30, -38, 1.0], [35, -30, -0.7], [-38, 20, 0.8], [28, 38, -0.5],
    [-20, -40, -0.6], [40, -18, 0.9], [-42, -15, -0.8], [15, 42, 0.6],
    [38, 28, -0.4], [-35, 38, 0.7], [45, -5, -0.9], [-45, -5, 0.5],
    // Interior clusters
    [-10, 10, 0.3], [12, -8, -0.4], [-5, -12, 0.6], [8, 12, -0.3],
    [-15, -5, 0.5], [18, 8, -0.5], [-8, 30, 0.4], [10, -30, -0.7],
    // Near buildings
    [5, -25, 0.3], [-25, 5, -0.4],
  ]

  for (const [px, pz, lean] of palmPositions) {
    const palmGroup = new THREE.Group()
    palmGroup.position.set(px, 0, pz)

    // Height variation
    const segments = 5 + Math.floor(Math.random() * 3)
    const segHeight = 0.7 + Math.random() * 0.2

    // Curved trunk (stacked offset cylinders)
    let offsetX = 0
    for (let s = 0; s < segments; s++) {
      const t = s / segments
      const radius = 0.2 - t * 0.07
      const trunkSeg = shadow(new THREE.Mesh(
        new THREE.CylinderGeometry(radius - 0.02, radius, segHeight, 6),
        mat(PALM_TRUNK)
      ))
      offsetX += lean * 0.13 * t
      trunkSeg.position.set(offsetX, s * segHeight + segHeight / 2, 0)
      trunkSeg.rotation.z = lean * 0.05 * t
      palmGroup.add(trunkSeg)
    }

    const topY = segments * segHeight + 0.2
    const topX = offsetX + lean * 0.1

    // Canopy (cluster of green spheres)
    for (let f = 0; f < 5; f++) {
      const angle = (f / 5) * Math.PI * 2
      const frondSize = 0.7 + Math.random() * 0.4
      const frond = shadow(new THREE.Mesh(
        new THREE.SphereGeometry(frondSize, 6, 5),
        mat(Math.random() > 0.5 ? PALM_GREEN : PALM_GREEN2)
      ))
      frond.position.set(
        topX + Math.cos(angle) * 0.65,
        topY + 0.1 - Math.abs(Math.cos(angle)) * 0.3,
        Math.sin(angle) * 0.65
      )
      frond.scale.y = 0.45
      palmGroup.add(frond)
    }

    // Central top sphere
    const centralFrond = shadow(new THREE.Mesh(
      new THREE.SphereGeometry(0.55, 6, 5),
      mat(PALM_GREEN2)
    ))
    centralFrond.position.set(topX, topY + 0.4, 0)
    centralFrond.scale.y = 0.55
    palmGroup.add(centralFrond)

    // Coconuts (small brown spheres) — some trees have them
    if (Math.random() > 0.3) {
      const coconutCount = 2 + Math.floor(Math.random() * 3)
      for (let c = 0; c < coconutCount; c++) {
        const cAngle = (c / coconutCount) * Math.PI * 2
        const coconut = shadow(new THREE.Mesh(
          new THREE.SphereGeometry(0.1, 5, 4),
          mat(COCONUT_BROWN)
        ))
        coconut.position.set(
          topX + Math.cos(cAngle) * 0.28,
          topY - 0.2,
          Math.sin(cAngle) * 0.28
        )
        palmGroup.add(coconut)
      }
    }

    group.add(palmGroup)

    // Palm tree collider (thin cylinder)
    {
      const h = segments * segHeight / 2
      const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(px, h, pz)
      const body = world.createRigidBody(bd)
      world.createCollider(
        RAPIER.ColliderDesc.cylinder(h, 0.28).setFriction(0.5),
        body
      )
    }
  }

  // ════════════════════════════════════════════════════════════════
  // BEACH UMBRELLAS (8, bright colors spread across beach)
  // ════════════════════════════════════════════════════════════════
  const umbrellaData = [
    [-12, -28, 0xff3333], [8, -32, 0xffdd33], [-22, -20, 0x3388ff],
    [18, -25, 0xff33ff], [-8, -38, 0x33ff88], [30, -20, 0xff8833],
    [-30, -25, 0x33ddff], [12, -40, 0xffaa33],
  ]
  for (const [ux, uz, color] of umbrellaData) {
    // Pole
    const pole = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 2.5, 4), mat(0xcccccc)
    ))
    pole.position.set(ux, 1.25, uz)
    group.add(pole)
    // Canopy
    const canopy = shadow(new THREE.Mesh(
      new THREE.ConeGeometry(1.4, 0.7, 8), mat(color)
    ))
    canopy.position.set(ux, 2.6, uz)
    group.add(canopy)
  }

  // ════════════════════════════════════════════════════════════════
  // BEACH TOWELS (6, flat colored planes)
  // ════════════════════════════════════════════════════════════════
  const towelData = [
    [-11, -29, 0xff6688, 0.3], [9, -33, 0x66bbff, -0.2],
    [-21, -21, 0xffcc33, 0.6], [19, -26, 0x66ff99, -0.4],
    [-7, -39, 0xff99cc, 0.1], [31, -21, 0xaaddff, 0.5],
  ]
  for (const [tx, tz, color, rot] of towelData) {
    const towel = new THREE.Mesh(
      new THREE.PlaneGeometry(0.9, 1.8), mat(color, { side: THREE.DoubleSide })
    )
    towel.rotation.x = -Math.PI / 2
    towel.rotation.z = rot
    towel.position.set(tx, 0.03, tz)
    towel.receiveShadow = true
    group.add(towel)
  }

  // ════════════════════════════════════════════════════════════════
  // BEACH CHAIRS / LOUNGERS (5)
  // ════════════════════════════════════════════════════════════════
  const chairPositions = [
    [-10, -28, 0.2], [10, -33, -0.15], [-20, -20, 0.4],
    [20, -25, -0.3], [-28, -24, 0.1],
  ]
  for (const [chx, chz, rot] of chairPositions) {
    const chairGroup = new THREE.Group()
    chairGroup.position.set(chx, 0, chz)
    chairGroup.rotation.y = rot

    // Seat
    const seat = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(0.6, 0.08, 1.4), mat(0x4488cc)
    ))
    seat.position.set(0, 0.3, 0)
    seat.rotation.x = -0.1
    chairGroup.add(seat)

    // Backrest
    const back = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(0.6, 0.7, 0.08), mat(0x4488cc)
    ))
    back.position.set(0, 0.55, -0.6)
    back.rotation.x = -0.4
    chairGroup.add(back)

    // Legs
    for (let lx = -1; lx <= 1; lx += 2) {
      for (let lz = -1; lz <= 1; lz += 2) {
        chairGroup.add(shadow(new THREE.Mesh(
          new THREE.CylinderGeometry(0.025, 0.025, 0.35, 4), mat(0xdddddd)
        )).translateX(lx * 0.25).translateY(0.12).translateZ(lz * 0.55))
      }
    }

    group.add(chairGroup)
  }

  // ════════════════════════════════════════════════════════════════
  // SANDCASTLES (4) — stacked cylinders + cone turrets
  // ════════════════════════════════════════════════════════════════
  const sandcastlePositions = [
    [5, -30], [-18, -32], [25, -18], [-10, -42],
  ]
  for (const [scx, scz] of sandcastlePositions) {
    const scGroup = new THREE.Group()
    scGroup.position.set(scx, 0, scz)

    // Base
    scGroup.add(shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.65, 0.75, 0.55, 8), mat(0xd4b87a)
    )).translateY(0.28))

    // Upper tier
    scGroup.add(shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.38, 0.48, 0.4, 8), mat(0xd4b87a)
    )).translateY(0.75))

    // Turrets (4)
    for (let t = 0; t < 4; t++) {
      const a = (t / 4) * Math.PI * 2 + Math.PI / 4
      scGroup.add(shadow(new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.16, 0.6, 6), mat(0xd4b87a)
      )).translateX(Math.cos(a) * 0.58).translateY(0.32).translateZ(Math.sin(a) * 0.58))

      scGroup.add(shadow(new THREE.Mesh(
        new THREE.ConeGeometry(0.14, 0.22, 6), mat(0xc4a868)
      )).translateX(Math.cos(a) * 0.58).translateY(0.7).translateZ(Math.sin(a) * 0.58))
    }

    // Top cone flag
    scGroup.add(shadow(new THREE.Mesh(
      new THREE.ConeGeometry(0.15, 0.25, 6), mat(0xc4a868)
    )).translateY(1.08))

    group.add(scGroup)
  }

  // ════════════════════════════════════════════════════════════════
  // SURFBOARDS standing in sand (4)
  // ════════════════════════════════════════════════════════════════
  const standingSurfPositions = [
    [22, -38, 0.3], [-32, -30, -0.5], [38, -28, 0.7], [-5, -44, -0.2],
  ]
  for (const [sx, sz, rot] of standingSurfPositions) {
    const surfGeo = new THREE.BoxGeometry(0.28, 2.2, 0.06)
    const surfMesh = shadow(new THREE.Mesh(surfGeo, mat(
      [ORANGE, 0x33aaff, 0xffcc00, 0xff3366][Math.floor(Math.random() * 4)]
    )))
    surfMesh.position.set(sx, 1.1, sz)
    surfMesh.rotation.z = 0.15
    surfMesh.rotation.y = rot
    group.add(surfMesh)

    // Stripe
    const stripe = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(0.14, 1.7, 0.065), mat(0xffcc00)
    ))
    stripe.position.set(sx, 1.1, sz)
    stripe.rotation.z = 0.15
    stripe.rotation.y = rot
    group.add(stripe)
  }

  // ════════════════════════════════════════════════════════════════
  // BEACH VOLLEYBALL NET
  // ════════════════════════════════════════════════════════════════
  const VN_X = 0, VN_Z = -35

  // Poles
  for (let side = -1; side <= 1; side += 2) {
    const vPole = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.06, 3.0, 6), mat(0xcccccc)
    ))
    vPole.position.set(VN_X + side * 3.5, 1.5, VN_Z)
    group.add(vPole)
  }

  // Top bar
  const netTop = shadow(new THREE.Mesh(
    new THREE.BoxGeometry(7.0, 0.05, 0.05), mat(WHITE)
  ))
  netTop.position.set(VN_X, 2.8, VN_Z)
  group.add(netTop)

  // Net lines (vertical)
  for (let nl = 0; nl < 14; nl++) {
    const vLine = new THREE.Mesh(
      new THREE.BoxGeometry(0.015, 1.2, 0.015), mat(WHITE)
    )
    vLine.position.set(VN_X - 3.2 + nl * 0.48, 2.2, VN_Z)
    group.add(vLine)
  }

  // Net lines (horizontal)
  for (let hl = 0; hl < 4; hl++) {
    const hLine = new THREE.Mesh(
      new THREE.BoxGeometry(6.8, 0.015, 0.015), mat(WHITE)
    )
    hLine.position.set(VN_X, 1.8 + hl * 0.3, VN_Z)
    group.add(hLine)
  }

  // ════════════════════════════════════════════════════════════════
  // SEASHELLS (12+ tiny flat spheres, pastel)
  // ════════════════════════════════════════════════════════════════
  const shellColors = [0xffd4cc, 0xffe0b2, 0xd4c4b0, 0xf0e0d0, 0xffccdd, 0xddeeff]
  const shellPositions = [
    [-14, -30], [16, -28], [-6, -36], [26, -22],
    [-24, -18], [12, -42], [-30, -35], [35, -15],
    [5, -38], [-18, -40], [22, -32], [40, -25],
  ]
  for (let i = 0; i < shellPositions.length; i++) {
    const [sx, sz] = shellPositions[i]
    const shellGeo = new THREE.SphereGeometry(0.08, 6, 4)
    shellGeo.scale(1, 0.3, 1)
    const shell = new THREE.Mesh(shellGeo, mat(shellColors[i % shellColors.length]))
    shell.position.set(sx, 0.04, sz)
    shell.rotation.y = Math.random() * Math.PI
    shell.receiveShadow = true
    group.add(shell)
  }

  // ════════════════════════════════════════════════════════════════
  // STARFISH (3 flat star shapes)
  // ════════════════════════════════════════════════════════════════
  const starfishPositions = [
    [8, -34], [-16, -36], [28, -28],
  ]
  for (const [sfx, sfz] of starfishPositions) {
    for (let arm = 0; arm < 5; arm++) {
      const angle = (arm / 5) * Math.PI * 2
      const armMesh = new THREE.Mesh(
        new THREE.BoxGeometry(0.06, 0.02, 0.22), mat(0xff6644)
      )
      armMesh.position.set(
        sfx + Math.cos(angle) * 0.12,
        0.035,
        sfz + Math.sin(angle) * 0.12
      )
      armMesh.rotation.y = -angle + Math.PI / 2
      group.add(armMesh)
    }
  }

  // ════════════════════════════════════════════════════════════════
  // DRIFTWOOD pieces (5)
  // ════════════════════════════════════════════════════════════════
  const driftwoodPositions = [
    [-25, -35, 0.7], [32, -32, -0.3], [-38, -18, 1.1],
    [42, -12, 0.2], [-12, -44, -0.8],
  ]
  for (const [dx, dz, rot] of driftwoodPositions) {
    const dw = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.07, 0.09, 1.4, 5), mat(0x9e8b72)
    ))
    dw.position.set(dx, 0.07, dz)
    dw.rotation.z = Math.PI / 2
    dw.rotation.y = rot
    group.add(dw)
  }

  // ════════════════════════════════════════════════════════════════
  // CAMPFIRE — cylinder logs + orange emissive sphere
  // ════════════════════════════════════════════════════════════════
  const CF_X = -5, CF_Z = 35
  const campfireGroup = new THREE.Group()
  campfireGroup.position.set(CF_X, 0, CF_Z)

  // Ring of stones
  for (let st = 0; st < 8; st++) {
    const a = (st / 8) * Math.PI * 2
    const stone = shadow(new THREE.Mesh(
      new THREE.SphereGeometry(0.15, 5, 4), mat(ROCK_GRAY)
    ))
    stone.position.set(Math.cos(a) * 0.6, 0.1, Math.sin(a) * 0.6)
    stone.scale.y = 0.6
    campfireGroup.add(stone)
  }

  // Logs (crossed)
  for (let l = 0; l < 4; l++) {
    const log = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.08, 0.9, 5), mat(WOOD_DARK)
    ))
    log.rotation.z = Math.PI / 2
    log.rotation.y = (l / 4) * Math.PI
    log.position.y = 0.1 + l * 0.05
    campfireGroup.add(log)
  }

  // Flame (emissive sphere)
  const flameMat = new THREE.MeshStandardMaterial({
    color: FLAME_COLOR,
    emissive: FLAME_COLOR,
    emissiveIntensity: 2,
    flatShading: true,
  })
  const flame = new THREE.Mesh(new THREE.SphereGeometry(0.2, 6, 5), flameMat)
  flame.position.y = 0.35
  flame.scale.y = 1.5
  campfireGroup.add(flame)

  const fireLight = new THREE.PointLight(0xff6622, 3, 15)
  fireLight.position.y = 0.5
  campfireGroup.add(fireLight)

  group.add(campfireGroup)

  // ════════════════════════════════════════════════════════════════
  // HAMMOCK between two palm trees (curved plane)
  // ════════════════════════════════════════════════════════════════
  // Between palms at (-10,10) and (12,-8) — use nearby positions
  const hammockGeo = new THREE.PlaneGeometry(1.2, 3.5, 1, 6)
  // Curve the hammock vertices
  const hammockPosAttr = hammockGeo.attributes.position
  for (let i = 0; i < hammockPosAttr.count; i++) {
    const y = hammockPosAttr.getY(i)
    const sag = -Math.cos((y / 3.5) * Math.PI) * 0.3
    hammockPosAttr.setZ(i, sag)
  }
  hammockGeo.computeVertexNormals()
  const hammock = new THREE.Mesh(hammockGeo, mat(0xffcc88, { side: THREE.DoubleSide }))
  hammock.position.set(-10, 2.5, 10)
  hammock.rotation.y = 0.4
  hammock.rotation.x = -Math.PI / 2 + 0.1
  group.add(hammock)

  // ════════════════════════════════════════════════════════════════
  // HARBOR / DOCK AREA — barrels, crates, fishing net, anchor, seagulls
  // ════════════════════════════════════════════════════════════════

  // Static barrels on dock
  const staticBarrelPositions = [
    [DOCK_X - 1.2, 0.7, DOCK_Z + 7],
    [DOCK_X - 0.7, 0.7, DOCK_Z + 7.5],
    [DOCK_X - 0.95, 1.4, DOCK_Z + 7.25],
  ]
  for (const [bx, by, bz] of staticBarrelPositions) {
    const barrel = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.34, 0.85, 8), mat(0x7a4a1a)
    ))
    barrel.position.set(bx, by, bz)
    group.add(barrel)
  }

  // Fishing net on frame
  const NET_X = DOCK_X - 1.5, NET_Z = DOCK_Z + 9
  for (let side = -1; side <= 1; side += 2) {
    group.add(shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.06, 2.0, 6), mat(WOOD)
    )).translateX(NET_X + side * 0.8).translateY(1.4).translateZ(NET_Z))
  }
  group.add(shadow(new THREE.Mesh(
    new THREE.BoxGeometry(1.7, 0.06, 0.06), mat(WOOD)
  )).translateX(NET_X).translateY(2.35).translateZ(NET_Z))

  // Net grid
  const netMat = mat(0x998866)
  for (let i = 0; i < 6; i++) {
    group.add(new THREE.Mesh(
      new THREE.BoxGeometry(0.015, 1.5, 0.015), netMat
    ).translateX(NET_X - 0.65 + i * 0.26).translateY(1.55).translateZ(NET_Z))
  }
  for (let j = 0; j < 5; j++) {
    group.add(new THREE.Mesh(
      new THREE.BoxGeometry(1.4, 0.015, 0.015), netMat
    ).translateX(NET_X).translateY(0.9 + j * 0.35).translateZ(NET_Z))
  }

  // Anchor
  const anchorGroup = new THREE.Group()
  anchorGroup.position.set(DOCK_X + 1.5, 0.55, DOCK_Z + 8)

  anchorGroup.add(shadow(new THREE.Mesh(
    new THREE.CylinderGeometry(0.04, 0.04, 0.9, 6), mat(IRON)
  )).translateY(0.45))

  anchorGroup.add(shadow(new THREE.Mesh(
    new THREE.TorusGeometry(0.13, 0.03, 4, 8), mat(IRON)
  )).translateY(0.95))

  anchorGroup.add(shadow(new THREE.Mesh(
    new THREE.BoxGeometry(0.55, 0.05, 0.05), mat(IRON)
  )).translateY(0.35))

  for (let side = -1; side <= 1; side += 2) {
    const fluke = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(0.04, 0.28, 0.04), mat(IRON)
    ))
    fluke.position.set(side * 0.24, 0.1, 0)
    fluke.rotation.z = side * 0.6
    anchorGroup.add(fluke)

    const tip = shadow(new THREE.Mesh(
      new THREE.ConeGeometry(0.06, 0.12, 4), mat(IRON)
    ))
    tip.position.set(side * 0.35, -0.04, 0)
    tip.rotation.z = side * 1.2
    anchorGroup.add(tip)
  }
  group.add(anchorGroup)

  // Seagulls (3) on dock
  const seagullPositions = [
    [DOCK_X + 1.5, 1.2, DOCK_Z - 5],
    [DOCK_X - 1.5, 1.2, DOCK_Z + 3],
    [DOCK_X + 0.5, 1.2, DOCK_Z + 6],
  ]
  for (const [gx, gy, gz] of seagullPositions) {
    const sgGroup = new THREE.Group()
    sgGroup.position.set(gx, gy, gz)

    // Body
    const bodyGeo = new THREE.SphereGeometry(0.12, 6, 5)
    bodyGeo.scale(1, 0.7, 1.4)
    sgGroup.add(shadow(new THREE.Mesh(bodyGeo, mat(WHITE))))

    // Head
    const head = shadow(new THREE.Mesh(
      new THREE.SphereGeometry(0.07, 5, 4), mat(WHITE)
    ))
    head.position.set(0, 0.07, 0.14)
    sgGroup.add(head)

    // Beak
    const beak = shadow(new THREE.Mesh(
      new THREE.ConeGeometry(0.02, 0.09, 4), mat(ORANGE)
    ))
    beak.rotation.x = Math.PI / 2
    beak.position.set(0, 0.05, 0.22)
    sgGroup.add(beak)

    // Wings
    for (let side = -1; side <= 1; side += 2) {
      const wingShape = new THREE.Shape()
      wingShape.moveTo(0, 0)
      wingShape.lineTo(side * 0.22, 0.05)
      wingShape.lineTo(side * 0.1, -0.04)
      wingShape.closePath()
      const wing = new THREE.Mesh(
        new THREE.ShapeGeometry(wingShape),
        mat(0xdddddd, { side: THREE.DoubleSide })
      )
      wing.rotation.x = -Math.PI / 2
      wing.position.set(0, 0.02, 0)
      sgGroup.add(wing)
    }

    sgGroup.rotation.y = Math.random() * Math.PI * 2
    group.add(sgGroup)
  }

  // Rope coils on dock (2)
  for (const [rx, rz] of [[DOCK_X + 1.0, DOCK_Z - 3], [DOCK_X - 1.2, DOCK_Z + 5]]) {
    const rope = new THREE.Mesh(
      new THREE.TorusGeometry(0.22, 0.04, 4, 12), mat(ROPE_COLOR)
    )
    rope.rotation.x = Math.PI / 2
    rope.position.set(rx, 0.56, rz)
    group.add(rope)
  }

  // Fish drying rack
  const RACK_X = DOCK_X - 1.8, RACK_Z = DOCK_Z - 6
  // Posts
  for (let side = -1; side <= 1; side += 2) {
    group.add(shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.06, 1.8, 6), mat(WOOD)
    )).translateX(RACK_X + side * 0.8).translateY(0.9).translateZ(RACK_Z))
  }
  // Bar
  group.add(shadow(new THREE.Mesh(
    new THREE.BoxGeometry(1.7, 0.05, 0.05), mat(WOOD)
  )).translateX(RACK_X).translateY(1.75).translateZ(RACK_Z))

  // Fish hanging (small flat triangles)
  for (let fi = 0; fi < 4; fi++) {
    const fish = new THREE.Mesh(
      new THREE.ConeGeometry(0.08, 0.35, 4), mat(0x99aabb)
    )
    fish.position.set(RACK_X - 0.5 + fi * 0.35, 1.5, RACK_Z)
    fish.rotation.z = Math.PI
    group.add(fish)
  }

  // ════════════════════════════════════════════════════════════════
  // BUOYS in water (2, bobbing animated)
  // ════════════════════════════════════════════════════════════════
  buoy1Group = new THREE.Group()
  buoy1Group.position.set(52, 0.0, 12)
  const buoy1Body = shadow(new THREE.Mesh(
    new THREE.SphereGeometry(0.45, 8, 6), mat(RED)
  ))
  buoy1Body.position.y = 0.2
  buoy1Group.add(buoy1Body)
  buoy1Group.add(shadow(new THREE.Mesh(
    new THREE.CylinderGeometry(0.47, 0.47, 0.15, 8), mat(WHITE)
  )).translateY(0.2))
  buoy1Group.add(shadow(new THREE.Mesh(
    new THREE.CylinderGeometry(0.03, 0.03, 0.55, 4), mat(IRON)
  )).translateY(0.65))
  group.add(buoy1Group)

  buoy2Group = new THREE.Group()
  buoy2Group.position.set(-48, 0.0, 35)
  const buoy2Body = shadow(new THREE.Mesh(
    new THREE.SphereGeometry(0.35, 8, 6), mat(ORANGE)
  ))
  buoy2Body.position.y = 0.15
  buoy2Group.add(buoy2Body)
  buoy2Group.add(shadow(new THREE.Mesh(
    new THREE.CylinderGeometry(0.03, 0.03, 0.4, 4), mat(IRON)
  )).translateY(0.5))
  group.add(buoy2Group)

  // ════════════════════════════════════════════════════════════════
  // TIKI TORCHES (7) — cylinder post + emissive flame sphere
  // ════════════════════════════════════════════════════════════════
  const torchPositions = [
    [-28, 22], [-22, 28], [-18, 22], [35, 25],
    [30, 30], [-35, 15], [10, 38],
  ]
  for (const [ttx, ttz] of torchPositions) {
    const torchGroup = new THREE.Group()
    torchGroup.position.set(ttx, 0, ttz)

    // Post
    torchGroup.add(shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.08, 2.0, 6), mat(BAMBOO)
    )).translateY(1.0))

    // Carved top bowl
    torchGroup.add(shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.08, 0.2, 6), mat(WOOD_DARK)
    )).translateY(2.05))

    // Flame sphere
    const torchFlame = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 5, 4),
      new THREE.MeshStandardMaterial({
        color: FLAME_COLOR,
        emissive: FLAME_COLOR,
        emissiveIntensity: 2,
        flatShading: true,
      })
    )
    torchFlame.position.y = 2.2
    torchGroup.add(torchFlame)

    // Point light
    const torchLight = new THREE.PointLight(0xff6622, 1.5, 8)
    torchLight.position.y = 2.2
    torchGroup.add(torchLight)

    tikitorches.push({ flame: torchFlame, light: torchLight })

    group.add(torchGroup)
  }

  // ════════════════════════════════════════════════════════════════
  // UNDERWATER HINTS — coral + seaweed visible through transparent water
  // ════════════════════════════════════════════════════════════════
  // Coral shapes
  const coralData = [
    [48, -0.3, 30, CORAL_PINK, 0.5],
    [50, -0.25, 15, CORAL_ORANGE, 0.6],
    [-45, -0.3, -35, CORAL_PURPLE, 0.4],
    [55, -0.28, -5, CORAL_PINK, 0.5],
    [-52, -0.25, 20, CORAL_ORANGE, 0.55],
    [45, -0.3, 40, CORAL_PURPLE, 0.45],
  ]
  for (const [cx, cy, cz, color, size] of coralData) {
    // Main coral branch
    const coral = shadow(new THREE.Mesh(
      new THREE.DodecahedronGeometry(size, 0), mat(color)
    ))
    coral.position.set(cx, cy, cz)
    coral.scale.y = 1.5
    group.add(coral)

    // Secondary smaller branch
    const coral2 = shadow(new THREE.Mesh(
      new THREE.DodecahedronGeometry(size * 0.6, 0), mat(color)
    ))
    coral2.position.set(cx + 0.4, cy, cz + 0.3)
    coral2.scale.y = 1.3
    group.add(coral2)
  }

  // Seaweed (thin green planes waving)
  const seaweedPositions = [
    [50, 25], [-48, -30], [52, 0], [-50, 15],
    [48, -20], [-45, 40], [55, 35], [-52, -10],
  ]
  for (const [swx, swz] of seaweedPositions) {
    for (let s = 0; s < 3; s++) {
      const sw = new THREE.Mesh(
        new THREE.PlaneGeometry(0.15, 0.8),
        mat(SEAWEED_GREEN, { side: THREE.DoubleSide })
      )
      sw.position.set(swx + s * 0.2, -0.15, swz + s * 0.15)
      sw.rotation.y = Math.random() * Math.PI
      group.add(sw)
      seaweedPlanes.push(sw)
    }
  }

  // ════════════════════════════════════════════════════════════════
  // FUN DETAILS
  // ════════════════════════════════════════════════════════════════

  // Treasure chest
  const chestGroup = new THREE.Group()
  chestGroup.position.set(35, 0, 35)
  // Base
  chestGroup.add(shadow(new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 0.5, 0.5), mat(WOOD_DARK)
  )).translateY(0.25))
  // Lid (domed)
  chestGroup.add(shadow(new THREE.Mesh(
    new THREE.CylinderGeometry(0.25, 0.4, 0.82, 6, 1, false, 0, Math.PI),
    mat(WOOD_DARK)
  )).translateY(0.5).rotateZ(Math.PI / 2))
  // Gold trim
  chestGroup.add(shadow(new THREE.Mesh(
    new THREE.BoxGeometry(0.82, 0.06, 0.52), mat(GOLD)
  )).translateY(0.5))
  // Lock
  chestGroup.add(shadow(new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 0.1, 0.06), mat(GOLD)
  )).translateY(0.35).translateZ(0.28))
  // Gold coins spilling out (small flat cylinders)
  for (let gc = 0; gc < 6; gc++) {
    const coin = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.05, 0.02, 6),
      mat(GOLD, { emissive: 0xaa8800, emissiveIntensity: 0.3 })
    )
    coin.position.set(
      35 + 0.3 + Math.random() * 0.3,
      0.02 + gc * 0.02,
      35 + (Math.random() - 0.5) * 0.3
    )
    coin.rotation.x = Math.random() * 0.5
    group.add(coin)
  }
  group.add(chestGroup)

  // Message in a bottle
  const bottleGroup = new THREE.Group()
  bottleGroup.position.set(-8, 0.06, -42)
  bottleGroup.rotation.z = Math.PI / 2
  bottleGroup.rotation.y = 0.3
  // Bottle body
  bottleGroup.add(shadow(new THREE.Mesh(
    new THREE.CylinderGeometry(0.04, 0.05, 0.3, 6), mat(0x88cc88, { transparent: true, opacity: 0.6 })
  )))
  // Cork
  bottleGroup.add(shadow(new THREE.Mesh(
    new THREE.CylinderGeometry(0.03, 0.035, 0.05, 5), mat(0xccaa77)
  )).translateY(0.17))
  group.add(bottleGroup)

  // Conch shell
  const conchGeo = new THREE.SphereGeometry(0.18, 6, 5)
  conchGeo.scale(1.5, 0.7, 1)
  const conch = shadow(new THREE.Mesh(conchGeo, mat(0xffccaa)))
  conch.position.set(18, 0.08, -38)
  conch.rotation.y = 0.8
  group.add(conch)

  // Footprints in sand (small dark circles, 2 trails)
  // Trail 1
  for (let f = 0; f < 10; f++) {
    const fp = new THREE.Mesh(new THREE.CircleGeometry(0.06, 5), mat(SAND_DARK))
    fp.rotation.x = -Math.PI / 2
    fp.position.set(
      -4 + f * 0.6 + (f % 2) * 0.25,
      0.025,
      -25 + f * 0.5
    )
    group.add(fp)
  }
  // Trail 2
  for (let f = 0; f < 8; f++) {
    const fp = new THREE.Mesh(new THREE.CircleGeometry(0.06, 5), mat(SAND_DARK))
    fp.rotation.x = -Math.PI / 2
    fp.position.set(
      15 + f * 0.4 + (f % 2) * 0.3,
      0.025,
      -30 + f * 0.6
    )
    group.add(fp)
  }

  // ════════════════════════════════════════════════════════════════
  // DYNAMIC OBJECTS — pushable by car
  // ════════════════════════════════════════════════════════════════

  // ── Coconuts (6, DYNAMIC brown spheres) ──
  const coconutDynPositions = [
    [-12, 0.25, 8], [14, 0.25, -6], [-6, 0.25, -10],
    [8, 0.25, 14], [-16, 0.25, -4], [20, 0.25, 10],
  ]
  for (const [cx, cy, cz] of coconutDynPositions) {
    const coconutGeo = new THREE.SphereGeometry(0.18, 6, 5)
    const coconutMesh = shadow(new THREE.Mesh(coconutGeo, mat(COCONUT_BROWN)))
    coconutMesh.position.set(cx, cy, cz)
    group.add(coconutMesh)

    const bd = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(cx, cy, cz)
      .setLinearDamping(0.3)
      .setAngularDamping(0.3)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.ball(0.18)
        .setDensity(3.0)
        .setFriction(0.5)
        .setRestitution(0.4),
      body
    )
    syncList.push({ mesh: coconutMesh, body })
  }

  // ── Dock crates (4, DYNAMIC boxes) ──
  const cratePositions = [
    [DOCK_X + 1.0, 0.8, DOCK_Z - 2],
    [DOCK_X + 1.0, 0.8, DOCK_Z - 3],
    [DOCK_X - 1.0, 0.8, DOCK_Z + 4],
    [DOCK_X + 1.0, 1.4, DOCK_Z - 2.5],
  ]
  for (const [cx, cy, cz] of cratePositions) {
    const crateSize = 0.3 + Math.random() * 0.15
    const crateGeo = new THREE.BoxGeometry(crateSize * 2, crateSize * 2, crateSize * 2)
    const crateMesh = shadow(new THREE.Mesh(crateGeo, mat(WOOD_DARK)))
    crateMesh.position.set(cx, cy, cz)
    group.add(crateMesh)

    const bd = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(cx, cy, cz)
      .setLinearDamping(0.4)
      .setAngularDamping(0.5)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(crateSize, crateSize, crateSize)
        .setDensity(4.0)
        .setFriction(0.5)
        .setRestitution(0.15),
      body
    )
    syncList.push({ mesh: crateMesh, body })
  }

  // ── Beach balls (3, DYNAMIC spheres, bouncy) ──
  const beachBallPositions = [
    [-2, 0.5, -32], [15, 0.5, -25], [-20, 0.5, -18],
  ]
  const ballColorSets = [
    [0xff3333, 0xffff33, 0x3333ff, 0xff33ff, 0x33ff33, 0xff8833],
    [0xff6600, 0x00ff66, 0x6600ff, 0xffff00, 0x00ffff, 0xff0066],
    [0xff0000, 0x00ff00, 0x0000ff, 0xffcc00, 0xcc00ff, 0x00ccff],
  ]
  for (let bi = 0; bi < 3; bi++) {
    const [bx, by, bz] = beachBallPositions[bi]
    const ballGeo = new THREE.SphereGeometry(0.28, 8, 6)
    const ballColors = new Float32Array(ballGeo.attributes.position.count * 3)
    const colorSet = ballColorSets[bi].map(c => new THREE.Color(c))
    for (let v = 0; v < ballGeo.attributes.position.count; v++) {
      const c = colorSet[v % colorSet.length]
      ballColors[v * 3] = c.r
      ballColors[v * 3 + 1] = c.g
      ballColors[v * 3 + 2] = c.b
    }
    ballGeo.setAttribute('color', new THREE.BufferAttribute(ballColors, 3))
    const ballMat = new THREE.MeshStandardMaterial({
      vertexColors: true, flatShading: true,
    })
    const ballMesh = shadow(new THREE.Mesh(ballGeo, ballMat))
    ballMesh.position.set(bx, by, bz)
    group.add(ballMesh)

    const bd = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(bx, by, bz)
      .setLinearDamping(0.15)
      .setAngularDamping(0.2)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.ball(0.28)
        .setDensity(1.0)
        .setFriction(0.3)
        .setRestitution(0.7),
      body
    )
    syncList.push({ mesh: ballMesh, body })
  }

  // ── Barrels (2, DYNAMIC cylinders) ──
  const barrelDynPositions = [
    [DOCK_X - 1.3, 0.7, DOCK_Z + 2],
    [DOCK_X + 1.3, 0.7, DOCK_Z - 6],
  ]
  for (const [bx, by, bz] of barrelDynPositions) {
    const barrelMesh = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.34, 0.85, 8), mat(0x7a4a1a)
    ))
    barrelMesh.position.set(bx, by, bz)
    group.add(barrelMesh)

    const bd = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(bx, by, bz)
      .setLinearDamping(0.3)
      .setAngularDamping(0.4)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cylinder(0.425, 0.34)
        .setDensity(5.0)
        .setFriction(0.4)
        .setRestitution(0.2),
      body
    )
    syncList.push({ mesh: barrelMesh, body })
  }

  // ── Wooden logs (5, DYNAMIC, from campfire area) ──
  const logPositions = [
    [CF_X + 2, 0.15, CF_Z + 1],
    [CF_X - 2, 0.15, CF_Z - 1],
    [CF_X + 1, 0.15, CF_Z - 2],
    [CF_X - 1.5, 0.15, CF_Z + 2],
    [CF_X + 3, 0.15, CF_Z],
  ]
  for (const [lx, ly, lz] of logPositions) {
    const logMesh = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.1, 1.0, 6), mat(WOOD_DARK)
    ))
    logMesh.position.set(lx, ly, lz)
    logMesh.rotation.z = Math.PI / 2
    group.add(logMesh)

    const bd = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(lx, ly, lz)
      .setLinearDamping(0.5)
      .setAngularDamping(0.5)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cylinder(0.5, 0.1)
        .setDensity(3.0)
        .setFriction(0.6)
        .setRestitution(0.1),
      body
    )
    syncList.push({ mesh: logMesh, body })
  }

  // ════════════════════════════════════════════════════════════════
  // EXTRA SCATTER — filling the ENTIRE map
  // ════════════════════════════════════════════════════════════════

  // Additional small rocks scattered everywhere
  const scatterRockPositions = [
    [-30, 5], [25, 15], [-10, 25], [30, -10], [-35, -10],
    [10, 30], [-20, 35], [35, 5], [-40, 25], [20, -35],
    [15, 20], [-25, -15], [40, 15], [-15, 40], [5, -15],
    [-5, 20], [25, 30], [-30, -20], [38, -30], [-42, 10],
  ]
  for (const [rx, rz] of scatterRockPositions) {
    const size = 0.2 + Math.random() * 0.35
    const rock = shadow(new THREE.Mesh(
      new THREE.SphereGeometry(size, 5, 4), mat(ROCK_GRAY)
    ))
    rock.position.set(rx, size * 0.3, rz)
    rock.scale.set(1, 0.5 + Math.random() * 0.3, 0.8 + Math.random() * 0.3)
    rock.rotation.set(Math.random(), Math.random(), Math.random())
    group.add(rock)
  }

  // Small bushes/tropical plants scattered
  const bushPositions = [
    [-8, -5], [12, 5], [-18, 12], [22, -12], [-5, 18],
    [15, -18], [-12, -18], [8, 25], [-22, -8], [28, 8],
    [-32, 12], [32, -15], [-15, 28], [18, 32], [-28, -28],
  ]
  for (const [bx, bz] of bushPositions) {
    const bushSize = 0.4 + Math.random() * 0.5
    const bush = shadow(new THREE.Mesh(
      new THREE.SphereGeometry(bushSize, 6, 5),
      mat([0x2d8a4e, 0x35a058, 0x228844][Math.floor(Math.random() * 3)])
    ))
    bush.position.set(bx, bushSize * 0.5, bz)
    bush.scale.y = 0.6 + Math.random() * 0.3
    group.add(bush)
  }

  // Flower clusters (tiny colored dots on ground)
  const flowerColors = [0xff6688, 0xffdd33, 0xff33aa, 0xff8833, 0xaa33ff]
  for (let fc = 0; fc < 25; fc++) {
    const fx = (Math.random() - 0.5) * 80
    const fz = (Math.random() - 0.5) * 80
    const dist = Math.sqrt(fx * fx + fz * fz)
    if (dist > 48) continue // Only on island
    const flower = new THREE.Mesh(
      new THREE.SphereGeometry(0.06, 4, 3),
      mat(flowerColors[fc % flowerColors.length])
    )
    flower.position.set(fx, 0.08, fz)
    group.add(flower)
  }

  // Wooden sign near tiki bar
  const signPost = shadow(new THREE.Mesh(
    new THREE.CylinderGeometry(0.06, 0.06, 1.8, 4), mat(WOOD)
  ))
  signPost.position.set(TIKI_X + 4, 0.9, TIKI_Z - 2)
  group.add(signPost)

  const signBoard = shadow(new THREE.Mesh(
    new THREE.BoxGeometry(1.2, 0.45, 0.06), mat(WOOD_DARK)
  ))
  signBoard.position.set(TIKI_X + 4, 1.7, TIKI_Z - 2)
  group.add(signBoard)

  // Second sign near shack
  const signPost2 = shadow(new THREE.Mesh(
    new THREE.CylinderGeometry(0.06, 0.06, 1.5, 4), mat(WOOD)
  ))
  signPost2.position.set(SHACK_X + 3, 0.75, SHACK_Z + 2)
  group.add(signPost2)

  const signBoard2 = shadow(new THREE.Mesh(
    new THREE.BoxGeometry(1.0, 0.4, 0.06), mat(WOOD_DARK)
  ))
  signBoard2.position.set(SHACK_X + 3, 1.4, SHACK_Z + 2)
  group.add(signBoard2)

  // Wave-breaker posts along parts of shore
  for (let w = 0; w < 8; w++) {
    const angle = (w / 8) * Math.PI * 0.5 + Math.PI * 0.75
    const r = 48
    const wb = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.07, 0.09, 0.9, 6), mat(WOOD_DARK)
    ))
    wb.position.set(Math.cos(angle) * r, 0.2, Math.sin(angle) * r)
    group.add(wb)
  }

  // Crab (tiny body with legs)
  const crabGroup = new THREE.Group()
  crabGroup.position.set(12, 0.06, -36)
  const crabBody = new THREE.Mesh(
    new THREE.SphereGeometry(0.08, 5, 4), mat(0xcc4422)
  )
  crabBody.scale.set(1.3, 0.5, 1)
  crabGroup.add(crabBody)
  for (let side = -1; side <= 1; side += 2) {
    crabGroup.add(new THREE.Mesh(
      new THREE.SphereGeometry(0.04, 4, 3), mat(0xcc4422)
    ).translateX(side * 0.1).translateZ(0.08))
  }
  for (let leg = 0; leg < 3; leg++) {
    for (let side = -1; side <= 1; side += 2) {
      crabGroup.add(new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.01, 0.01), mat(0xcc4422)
      ).translateX(side * 0.1).translateY(-0.02).translateZ(-0.04 + leg * 0.04))
    }
  }
  group.add(crabGroup)

  // Second crab
  const crab2 = crabGroup.clone()
  crab2.position.set(-22, 0.06, -30)
  crab2.rotation.y = 1.2
  group.add(crab2)

  // Bucket and spade near sandcastles
  const bucket = shadow(new THREE.Mesh(
    new THREE.CylinderGeometry(0.12, 0.09, 0.18, 6), mat(0x3388ff)
  ))
  bucket.position.set(6, 0.09, -30.5)
  group.add(bucket)

  const spade = shadow(new THREE.Mesh(
    new THREE.BoxGeometry(0.04, 0.28, 0.04), mat(0xff4444)
  ))
  spade.position.set(6.3, 0.12, -30.3)
  spade.rotation.z = 0.5
  group.add(spade)

  const spadeBlade = shadow(new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 0.01, 0.08), mat(0xff4444)
  ))
  spadeBlade.position.set(6.18, -0.01, -30.3)
  group.add(spadeBlade)

  // Small path of stepping stones connecting areas
  const steppingStoneAngles = [0, 0.4, 0.8, 1.2, 1.6, 2.0, 2.4, 2.8, 3.2, 3.6]
  for (const angle of steppingStoneAngles) {
    const r = 15 + Math.random() * 3
    const stone = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.55, 0.1, 6), mat(ROCK_GRAY)
    ))
    stone.position.set(Math.cos(angle) * r, 0.04, Math.sin(angle) * r)
    stone.rotation.y = Math.random() * Math.PI
    group.add(stone)
  }

  // Additional seashells scattered far
  for (let es = 0; es < 8; es++) {
    const sx = (Math.random() - 0.5) * 70
    const sz = (Math.random() - 0.5) * 70
    const dist = Math.sqrt(sx * sx + sz * sz)
    if (dist > 50 || dist < 20) continue
    const shell = new THREE.Mesh(
      new THREE.SphereGeometry(0.07, 5, 3), mat(shellColors[es % shellColors.length])
    )
    shell.position.set(sx, 0.035, sz)
    shell.scale.y = 0.3
    group.add(shell)
  }

  // Wooden barrel clusters near tiki bar
  for (let tb = 0; tb < 3; tb++) {
    const tBarrel = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.28, 0.32, 0.8, 8), mat(0x7a4a1a)
    ))
    tBarrel.position.set(TIKI_X + 3 + tb * 0.7, 0.4, TIKI_Z + 1.5)
    group.add(tBarrel)
  }

  // Fishing pole leaning against lifeguard tower
  const fishPole = shadow(new THREE.Mesh(
    new THREE.CylinderGeometry(0.02, 0.03, 3.0, 4), mat(BAMBOO)
  ))
  fishPole.position.set(LG_X + 1.2, 1.5, LG_Z + 0.8)
  fishPole.rotation.z = 0.3
  group.add(fishPole)

  // ════════════════════════════════════════════════════════════════
  // ADD EVERYTHING TO SCENE
  // ════════════════════════════════════════════════════════════════
  scene.add(group)

  // ════════════════════════════════════════════════════════════════
  // RETURN — syncList + update
  // ════════════════════════════════════════════════════════════════
  return {
    syncList,
    update(dt) {
      elapsedTime += dt

      // ── Water wave animation ──────────────────────────────────
      const posAttr = waterMesh.geometry.attributes.position
      for (let i = 0; i < posAttr.count; i++) {
        const origX = waterOrigY[i * 3]
        const origZ = waterOrigY[i * 3 + 2]
        posAttr.array[i * 3 + 1] = waterOrigY[i * 3 + 1]
          + Math.sin(elapsedTime * 1.2 + origX * 0.4 + origZ * 0.3) * 0.08
          + Math.cos(elapsedTime * 0.8 + origZ * 0.6) * 0.05
          + Math.sin(elapsedTime * 2.0 + origX * 0.8) * 0.03
      }
      posAttr.needsUpdate = true

      // ── Lighthouse beacon pulse ───────────────────────────────
      const pulse = (Math.sin(elapsedTime * 3.0) + 1) * 0.5
      lighthouseBeacon.material.emissiveIntensity = 1.0 + pulse * 3.5
      lighthouseBeacon.scale.setScalar(0.9 + pulse * 0.35)
      if (lighthouseBeacon._pointLight) {
        lighthouseBeacon._pointLight.intensity = 1.5 + pulse * 5
      }

      // ── Sailboat bobbing ──────────────────────────────────────
      sailboatGroup.position.y = 0.05 + Math.sin(elapsedTime * 1.5) * 0.1
      sailboatGroup.rotation.z = Math.sin(elapsedTime * 1.1 + 0.5) * 0.04
      sailboatGroup.rotation.x = Math.sin(elapsedTime * 0.9) * 0.025

      // ── Pirate ship bobbing (slower, bigger) ──────────────────
      pirateShipGroup.position.y = -0.1 + Math.sin(elapsedTime * 0.8) * 0.12
      pirateShipGroup.rotation.z = Math.sin(elapsedTime * 0.6 + 1.0) * 0.03
      pirateShipGroup.rotation.x = Math.sin(elapsedTime * 0.5) * 0.02

      // ── Buoy bobbing ──────────────────────────────────────────
      buoy1Group.position.y = 0.0 + Math.sin(elapsedTime * 2.0 + 1.0) * 0.12
      buoy1Group.rotation.z = Math.sin(elapsedTime * 1.3) * 0.1
      buoy2Group.position.y = 0.0 + Math.sin(elapsedTime * 1.8 + 2.5) * 0.1
      buoy2Group.rotation.z = Math.sin(elapsedTime * 1.5 + 1.0) * 0.08

      // ── Tiki torch flame flicker ──────────────────────────────
      for (let i = 0; i < tikitorches.length; i++) {
        const t = tikitorches[i]
        const flicker = 0.7 + Math.sin(elapsedTime * 8 + i * 2.3) * 0.15
          + Math.sin(elapsedTime * 12 + i * 5.1) * 0.1
          + Math.cos(elapsedTime * 6 + i * 3.7) * 0.05
        t.flame.material.emissiveIntensity = 1.5 + flicker * 2
        t.flame.scale.setScalar(0.8 + flicker * 0.4)
        t.light.intensity = 1.0 + flicker * 1.5
      }

      // ── Seaweed waving ────────────────────────────────────────
      for (let i = 0; i < seaweedPlanes.length; i++) {
        const sw = seaweedPlanes[i]
        sw.rotation.x = Math.sin(elapsedTime * 1.5 + i * 0.7) * 0.15
        sw.rotation.z = Math.cos(elapsedTime * 1.2 + i * 1.3) * 0.1
      }
    },
  }
}
