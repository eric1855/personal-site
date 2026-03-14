import * as THREE from 'three'

// Reusable temp objects
const _q = new THREE.Quaternion()
const _e = new THREE.Euler()

// Zone center
const CX = 45
const CZ = 35

// Colors
const SAND = 0xe8d5a3
const WATER_BLUE = 0x2196f3
const WOOD = 0x8b6914
const WOOD_DARK = 0x6d4c2a
const WHITE = 0xffffff
const RED = 0xcc2222
const LIGHTHOUSE_RED = 0xcc3333
const YELLOW = 0xffdd44
const PALM_TRUNK = 0x8b5e3c
const PALM_GREEN = 0x2d8a4e

function mat(color, opts = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    flatShading: true,
    ...opts,
  })
}

function shadow(mesh) {
  mesh.castShadow = true
  mesh.receiveShadow = true
  return mesh
}

export function createBeachHarbor(scene, RAPIER, world) {
  const syncList = []
  const group = new THREE.Group()

  // Track animated objects
  let waterMesh
  let lighthouseBeacon
  let buoyMesh
  let sailboatGroup
  let rowboatGroup
  const seagulls = []
  let elapsedTime = 0

  // ─── TERRAIN: SAND ─────────────────────────────────────────
  const sandGeo = new THREE.CircleGeometry(22, 16)
  const sandMat = mat(SAND)
  const sand = new THREE.Mesh(sandGeo, sandMat)
  sand.rotation.x = -Math.PI / 2
  sand.position.set(CX, 0.02, CZ)
  sand.receiveShadow = true
  group.add(sand)

  // ─── TERRAIN: WATER ────────────────────────────────────────
  const waterGeo = new THREE.PlaneGeometry(60, 50, 12, 12)
  const waterMat = mat(WATER_BLUE, {
    transparent: true,
    opacity: 0.6,
    side: THREE.DoubleSide,
  })
  waterMesh = new THREE.Mesh(waterGeo, waterMat)
  waterMesh.rotation.x = -Math.PI / 2
  waterMesh.position.set(CX + 15, -0.1, CZ + 10)
  waterMesh.receiveShadow = true
  group.add(waterMesh)
  // Store original vertex positions for wave animation
  const waterOrigY = Float32Array.from(waterGeo.attributes.position.array)

  // ─── LIGHTHOUSE ────────────────────────────────────────────
  const lhX = CX - 8
  const lhZ = CZ + 12
  const lighthouseGroup = new THREE.Group()
  lighthouseGroup.position.set(lhX, 0, lhZ)

  // Tower base
  const towerGeo = new THREE.CylinderGeometry(1.2, 1.6, 10, 8)
  const towerMesh = shadow(new THREE.Mesh(towerGeo, mat(WHITE)))
  towerMesh.position.y = 5
  lighthouseGroup.add(towerMesh)

  // Red stripes (3 bands)
  for (let i = 0; i < 3; i++) {
    const stripeGeo = new THREE.CylinderGeometry(
      1.22 + (2 - i) * 0.04,
      1.26 + (2 - i) * 0.04,
      0.6,
      8
    )
    const stripe = shadow(new THREE.Mesh(stripeGeo, mat(LIGHTHOUSE_RED)))
    stripe.position.y = 2 + i * 3
    lighthouseGroup.add(stripe)
  }

  // Dome top
  const domeGeo = new THREE.SphereGeometry(1.3, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2)
  const dome = shadow(new THREE.Mesh(domeGeo, mat(RED)))
  dome.position.y = 10.3
  lighthouseGroup.add(dome)

  // Railing
  const railingGeo = new THREE.TorusGeometry(1.5, 0.06, 6, 8)
  const railing = shadow(new THREE.Mesh(railingGeo, mat(0x333333)))
  railing.rotation.x = Math.PI / 2
  railing.position.y = 10.1
  lighthouseGroup.add(railing)

  // Railing posts
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2
    const postGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.7, 4)
    const post = shadow(new THREE.Mesh(postGeo, mat(0x333333)))
    post.position.set(Math.cos(angle) * 1.5, 9.8, Math.sin(angle) * 1.5)
    lighthouseGroup.add(post)
  }

  // Beacon light
  const beaconGeo = new THREE.SphereGeometry(0.4, 6, 6)
  const beaconMat = new THREE.MeshStandardMaterial({
    color: YELLOW,
    emissive: YELLOW,
    emissiveIntensity: 2,
    flatShading: true,
  })
  lighthouseBeacon = new THREE.Mesh(beaconGeo, beaconMat)
  lighthouseBeacon.position.y = 10.5
  lighthouseGroup.add(lighthouseBeacon)

  // Beacon point light
  const beaconPointLight = new THREE.PointLight(0xffee88, 3, 30)
  beaconPointLight.position.y = 10.5
  lighthouseGroup.add(beaconPointLight)
  lighthouseBeacon._pointLight = beaconPointLight

  // Door
  const doorGeo = new THREE.BoxGeometry(0.6, 1.2, 0.1)
  const door = shadow(new THREE.Mesh(doorGeo, mat(WOOD_DARK)))
  door.position.set(0, 0.6, 1.55)
  lighthouseGroup.add(door)

  group.add(lighthouseGroup)

  // Lighthouse fixed collider (cylinder approximated as cuboid)
  {
    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(lhX, 5, lhZ)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cylinder(5, 1.6).setFriction(0.5),
      body
    )
  }

  // ─── WOODEN DOCK / PIER ────────────────────────────────────
  const dockX = CX + 2
  const dockZ = CZ + 8
  const dockGroup = new THREE.Group()

  // Main platform planks
  const plankCount = 12
  const dockLength = 14
  const dockWidth = 3.5
  for (let i = 0; i < plankCount; i++) {
    const plankGeo = new THREE.BoxGeometry(dockWidth, 0.12, dockLength / plankCount - 0.04)
    const plank = shadow(new THREE.Mesh(plankGeo, mat(i % 2 === 0 ? WOOD : WOOD_DARK)))
    plank.position.set(
      dockX,
      0.45,
      dockZ + (i / plankCount) * dockLength
    )
    dockGroup.add(plank)
  }

  // Side rails
  for (let side = -1; side <= 1; side += 2) {
    const railGeo = new THREE.BoxGeometry(0.1, 0.6, dockLength)
    const rail = shadow(new THREE.Mesh(railGeo, mat(WOOD)))
    rail.position.set(dockX + side * (dockWidth / 2 + 0.05), 0.8, dockZ + dockLength / 2)
    dockGroup.add(rail)
  }

  // Support pilings
  for (let i = 0; i < 4; i++) {
    for (let side = -1; side <= 1; side += 2) {
      const pilingGeo = new THREE.CylinderGeometry(0.12, 0.15, 1.5, 6)
      const piling = shadow(new THREE.Mesh(pilingGeo, mat(WOOD_DARK)))
      piling.position.set(
        dockX + side * (dockWidth / 2 - 0.3),
        -0.3,
        dockZ + 1.5 + i * (dockLength / 3.5)
      )
      dockGroup.add(piling)
    }
  }

  // Mooring posts
  for (let i = 0; i < 3; i++) {
    const side = i % 2 === 0 ? 1 : -1
    const postGeo = new THREE.CylinderGeometry(0.15, 0.18, 0.5, 6)
    const post = shadow(new THREE.Mesh(postGeo, mat(WOOD_DARK)))
    post.position.set(
      dockX + side * (dockWidth / 2 - 0.2),
      0.7,
      dockZ + 2 + i * 4
    )
    dockGroup.add(post)

    // Rope coil
    const ropeGeo = new THREE.TorusGeometry(0.2, 0.04, 4, 8)
    const rope = shadow(new THREE.Mesh(ropeGeo, mat(0xc4a35a)))
    rope.rotation.x = Math.PI / 2
    rope.position.set(
      dockX + side * (dockWidth / 2 - 0.2),
      0.95,
      dockZ + 2 + i * 4
    )
    dockGroup.add(rope)
  }

  group.add(dockGroup)

  // Dock fixed collider (drivable surface)
  {
    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(dockX, 0.25, dockZ + dockLength / 2)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(dockWidth / 2, 0.25, dockLength / 2).setFriction(0.6),
      body
    )
  }

  // ─── DYNAMIC CRATES ON DOCK ────────────────────────────────
  const cratePositions = [
    [dockX + 1.0, 0.75, dockZ + 3],
    [dockX + 1.0, 0.75, dockZ + 3.7],
    [dockX - 1.0, 0.75, dockZ + 7],
    [dockX + 1.0, 1.35, dockZ + 3.35],
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

  // ─── DYNAMIC BARRELS ON DOCK ───────────────────────────────
  const barrelDynPositions = [
    [dockX - 1.2, 0.7, dockZ + 10],
    [dockX + 1.2, 0.7, dockZ + 5],
  ]
  for (const [bx, by, bz] of barrelDynPositions) {
    const barrelGeo = new THREE.CylinderGeometry(0.28, 0.32, 0.8, 8)
    const barrelMesh = shadow(new THREE.Mesh(barrelGeo, mat(0x7a4a1a)))
    barrelMesh.position.set(bx, by, bz)
    group.add(barrelMesh)

    const bd = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(bx, by, bz)
      .setLinearDamping(0.3)
      .setAngularDamping(0.4)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cylinder(0.4, 0.32)
        .setDensity(5.0)
        .setFriction(0.4)
        .setRestitution(0.2),
      body
    )
    syncList.push({ mesh: barrelMesh, body })
  }

  // ─── STATIC BARRELS ON DOCK ────────────────────────────────
  const barrelStaticPositions = [
    [dockX - 1.0, 0.7, dockZ + 11],
    [dockX - 0.55, 0.7, dockZ + 10.7],
    [dockX - 0.8, 1.4, dockZ + 10.8],
  ]
  for (const [bx, by, bz] of barrelStaticPositions) {
    const barrelGeo = new THREE.CylinderGeometry(0.28, 0.32, 0.8, 8)
    const barrelMesh = shadow(new THREE.Mesh(barrelGeo, mat(0x7a4a1a)))
    barrelMesh.position.set(bx, by, bz)
    group.add(barrelMesh)
  }

  // ─── SAILBOAT ──────────────────────────────────────────────
  sailboatGroup = new THREE.Group()
  const sbX = CX + 12
  const sbZ = CZ + 16
  sailboatGroup.position.set(sbX, 0.05, sbZ)

  // Hull
  const hullGeo = new THREE.BoxGeometry(1.2, 0.5, 3.0)
  const hull = shadow(new THREE.Mesh(hullGeo, mat(0x884422)))
  hull.position.y = 0
  hull.scale.set(1, 1, 1)
  sailboatGroup.add(hull)

  // Hull keel taper (bottom wedge)
  const keelGeo = new THREE.BoxGeometry(0.6, 0.3, 2.6)
  const keel = shadow(new THREE.Mesh(keelGeo, mat(0x663311)))
  keel.position.y = -0.35
  sailboatGroup.add(keel)

  // Mast
  const mastGeo = new THREE.CylinderGeometry(0.05, 0.06, 3.5, 6)
  const mast = shadow(new THREE.Mesh(mastGeo, mat(WOOD)))
  mast.position.set(0, 1.75, -0.2)
  sailboatGroup.add(mast)

  // Sail (triangle shape)
  const sailShape = new THREE.Shape()
  sailShape.moveTo(0, 0)
  sailShape.lineTo(0, 2.5)
  sailShape.lineTo(1.5, 0)
  sailShape.closePath()
  const sailGeo = new THREE.ShapeGeometry(sailShape)
  const sailMat = mat(0xf5f0e0, { side: THREE.DoubleSide })
  const sail = new THREE.Mesh(sailGeo, sailMat)
  sail.rotation.y = Math.PI / 2
  sail.position.set(0, 0.5, -0.2)
  sail.castShadow = true
  sailboatGroup.add(sail)

  // Small flag at top of mast
  const flagGeo = new THREE.PlaneGeometry(0.4, 0.2)
  const flag = new THREE.Mesh(flagGeo, mat(RED, { side: THREE.DoubleSide }))
  flag.position.set(0.25, 3.4, -0.2)
  sailboatGroup.add(flag)

  group.add(sailboatGroup)

  // Sailboat collider (fixed, in water)
  {
    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(sbX, 0.1, sbZ)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(0.6, 0.4, 1.5).setFriction(0.3),
      body
    )
  }

  // ─── ROWBOAT ON BEACH ──────────────────────────────────────
  rowboatGroup = new THREE.Group()
  const rbX = CX + 5
  const rbZ = CZ + 2
  rowboatGroup.position.set(rbX, 0.15, rbZ)
  rowboatGroup.rotation.y = 0.4

  // Rowboat hull
  const rbHullGeo = new THREE.BoxGeometry(0.8, 0.3, 1.8)
  const rbHull = shadow(new THREE.Mesh(rbHullGeo, mat(0x996633)))
  rbHull.position.y = 0.05
  rowboatGroup.add(rbHull)

  // Inner hollow look (darker inside)
  const rbInnerGeo = new THREE.BoxGeometry(0.6, 0.15, 1.5)
  const rbInner = new THREE.Mesh(rbInnerGeo, mat(0x664422))
  rbInner.position.y = 0.18
  rowboatGroup.add(rbInner)

  // Bench seat
  const benchGeo = new THREE.BoxGeometry(0.55, 0.06, 0.15)
  const bench = shadow(new THREE.Mesh(benchGeo, mat(WOOD)))
  bench.position.set(0, 0.22, 0)
  rowboatGroup.add(bench)

  // Oars
  for (let side = -1; side <= 1; side += 2) {
    const oarShaftGeo = new THREE.CylinderGeometry(0.025, 0.025, 1.4, 4)
    const oarShaft = shadow(new THREE.Mesh(oarShaftGeo, mat(WOOD)))
    oarShaft.rotation.z = side * 0.3
    oarShaft.rotation.x = 0.1
    oarShaft.position.set(side * 0.45, 0.25, 0.1)
    rowboatGroup.add(oarShaft)

    // Oar blade
    const bladeGeo = new THREE.BoxGeometry(0.15, 0.02, 0.3)
    const blade = shadow(new THREE.Mesh(bladeGeo, mat(WOOD_DARK)))
    blade.position.set(side * 0.8, 0.55, 0.1)
    rowboatGroup.add(blade)
  }

  group.add(rowboatGroup)

  // ─── BEACH UMBRELLAS ───────────────────────────────────────
  const umbrellaColors = [0xff3333, 0xffdd33, 0x3388ff]
  const umbrellaPositions = [
    [CX - 3, CZ - 5],
    [CX + 1, CZ - 7],
    [CX - 6, CZ - 2],
  ]
  for (let i = 0; i < 3; i++) {
    const [ux, uz] = umbrellaPositions[i]
    // Pole
    const poleGeo = new THREE.CylinderGeometry(0.04, 0.04, 2.2, 4)
    const pole = shadow(new THREE.Mesh(poleGeo, mat(0xcccccc)))
    pole.position.set(ux, 1.1, uz)
    group.add(pole)
    // Canopy
    const canopyGeo = new THREE.ConeGeometry(1.2, 0.6, 8)
    const canopy = shadow(new THREE.Mesh(canopyGeo, mat(umbrellaColors[i])))
    canopy.position.set(ux, 2.3, uz)
    group.add(canopy)
  }

  // ─── BEACH TOWELS ──────────────────────────────────────────
  const towelColors = [0xff6688, 0x66bbff, 0xffcc33]
  const towelPositions = [
    [CX - 2.5, CZ - 5.5, 0.3],
    [CX + 1.5, CZ - 7.5, -0.2],
    [CX - 5.5, CZ - 2.5, 0.6],
  ]
  for (let i = 0; i < 3; i++) {
    const [tx, tz, rot] = towelPositions[i]
    const towelGeo = new THREE.PlaneGeometry(0.8, 1.6)
    const towel = new THREE.Mesh(towelGeo, mat(towelColors[i], { side: THREE.DoubleSide }))
    towel.rotation.x = -Math.PI / 2
    towel.rotation.z = rot
    towel.position.set(tx, 0.03, tz)
    towel.receiveShadow = true
    group.add(towel)
  }

  // ─── BEACH CHAIRS / LOUNGERS ───────────────────────────────
  const chairPositions = [
    [CX - 2, CZ - 4.5, 0.2],
    [CX + 2, CZ - 6.8, -0.15],
  ]
  for (const [chx, chz, rot] of chairPositions) {
    const chairGroup = new THREE.Group()
    chairGroup.position.set(chx, 0, chz)
    chairGroup.rotation.y = rot

    // Seat base
    const seatGeo = new THREE.BoxGeometry(0.6, 0.08, 1.4)
    const seat = shadow(new THREE.Mesh(seatGeo, mat(0x4488cc)))
    seat.position.set(0, 0.3, 0)
    seat.rotation.x = -0.1
    chairGroup.add(seat)

    // Backrest
    const backGeo = new THREE.BoxGeometry(0.6, 0.7, 0.08)
    const back = shadow(new THREE.Mesh(backGeo, mat(0x4488cc)))
    back.position.set(0, 0.55, -0.6)
    back.rotation.x = -0.4
    chairGroup.add(back)

    // Legs (4)
    for (let lx = -1; lx <= 1; lx += 2) {
      for (let lz = -1; lz <= 1; lz += 2) {
        const legGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.35, 4)
        const leg = shadow(new THREE.Mesh(legGeo, mat(0xdddddd)))
        leg.position.set(lx * 0.25, 0.12, lz * 0.55)
        chairGroup.add(leg)
      }
    }

    group.add(chairGroup)
  }

  // ─── SANDCASTLE ────────────────────────────────────────────
  const scX = CX + 3
  const scZ = CZ - 3
  const sandcastleGroup = new THREE.Group()
  sandcastleGroup.position.set(scX, 0, scZ)

  // Main body
  const scBase = shadow(new THREE.Mesh(
    new THREE.CylinderGeometry(0.6, 0.7, 0.5, 8),
    mat(0xd4b87a)
  ))
  scBase.position.y = 0.25
  sandcastleGroup.add(scBase)

  // Upper tier
  const scUpper = shadow(new THREE.Mesh(
    new THREE.CylinderGeometry(0.35, 0.45, 0.4, 8),
    mat(0xd4b87a)
  ))
  scUpper.position.y = 0.7
  sandcastleGroup.add(scUpper)

  // Turrets (4 corners)
  for (let i = 0; i < 4; i++) {
    const angle = (i / 4) * Math.PI * 2 + Math.PI / 4
    const turretGeo = new THREE.CylinderGeometry(0.12, 0.15, 0.55, 6)
    const turret = shadow(new THREE.Mesh(turretGeo, mat(0xd4b87a)))
    turret.position.set(Math.cos(angle) * 0.55, 0.3, Math.sin(angle) * 0.55)
    sandcastleGroup.add(turret)

    // Cone cap
    const capGeo = new THREE.ConeGeometry(0.14, 0.2, 6)
    const cap = shadow(new THREE.Mesh(capGeo, mat(0xc4a868)))
    cap.position.set(Math.cos(angle) * 0.55, 0.65, Math.sin(angle) * 0.55)
    sandcastleGroup.add(cap)
  }

  // Top cone
  const topCone = shadow(new THREE.Mesh(
    new THREE.ConeGeometry(0.15, 0.25, 6),
    mat(0xc4a868)
  ))
  topCone.position.y = 1.05
  sandcastleGroup.add(topCone)

  group.add(sandcastleGroup)

  // ─── SEASHELLS ─────────────────────────────────────────────
  const shellColors = [0xffd4cc, 0xffe0b2, 0xd4c4b0, 0xf0e0d0, 0xffccdd, 0xddeeff]
  const shellPositions = [
    [CX - 4, CZ - 6],
    [CX + 4, CZ - 4],
    [CX - 1, CZ - 8],
    [CX + 6, CZ - 1],
    [CX - 7, CZ + 1],
    [CX + 2, CZ - 2],
  ]
  for (let i = 0; i < 6; i++) {
    const [sx, sz] = shellPositions[i]
    const shellGeo = new THREE.SphereGeometry(0.08, 6, 4)
    shellGeo.scale(1, 0.3, 1)
    const shell = new THREE.Mesh(shellGeo, mat(shellColors[i]))
    shell.position.set(sx, 0.04, sz)
    shell.rotation.y = Math.random() * Math.PI
    shell.receiveShadow = true
    group.add(shell)
  }

  // ─── PALM TREES ────────────────────────────────────────────
  const palmPositions = [
    [CX - 10, CZ - 3, 1.0],
    [CX + 8, CZ - 5, -0.6],
  ]
  for (const [px, pz, lean] of palmPositions) {
    const palmGroup = new THREE.Group()
    palmGroup.position.set(px, 0, pz)

    // Curved trunk (stacked offset cylinders)
    const segments = 6
    const segHeight = 0.8
    let offsetX = 0
    for (let s = 0; s < segments; s++) {
      const t = s / segments
      const radius = 0.18 - t * 0.06
      const trunkSeg = shadow(new THREE.Mesh(
        new THREE.CylinderGeometry(radius - 0.02, radius, segHeight, 6),
        mat(PALM_TRUNK)
      ))
      offsetX += lean * 0.12 * t
      trunkSeg.position.set(offsetX, s * segHeight + segHeight / 2, 0)
      trunkSeg.rotation.z = lean * 0.05 * t
      palmGroup.add(trunkSeg)
    }

    // Canopy (cluster of spheres for coconut palm look)
    const topY = segments * segHeight + 0.2
    const topX = offsetX + lean * 0.1
    for (let f = 0; f < 5; f++) {
      const angle = (f / 5) * Math.PI * 2
      const frondGeo = new THREE.SphereGeometry(0.8 + Math.random() * 0.3, 6, 5)
      const frond = shadow(new THREE.Mesh(frondGeo, mat(PALM_GREEN)))
      frond.position.set(
        topX + Math.cos(angle) * 0.6,
        topY + 0.1 - Math.abs(Math.cos(angle)) * 0.3,
        Math.sin(angle) * 0.6
      )
      frond.scale.y = 0.5
      palmGroup.add(frond)
    }

    // Central top
    const centralFrond = shadow(new THREE.Mesh(
      new THREE.SphereGeometry(0.6, 6, 5),
      mat(0x35a058)
    ))
    centralFrond.position.set(topX, topY + 0.4, 0)
    centralFrond.scale.y = 0.6
    palmGroup.add(centralFrond)

    // Coconuts (small brown spheres)
    for (let c = 0; c < 3; c++) {
      const coconutAngle = (c / 3) * Math.PI * 2
      const coconut = shadow(new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 5, 4),
        mat(0x6b4226)
      ))
      coconut.position.set(
        topX + Math.cos(coconutAngle) * 0.25,
        topY - 0.2,
        Math.sin(coconutAngle) * 0.25
      )
      palmGroup.add(coconut)
    }

    group.add(palmGroup)

    // Palm tree collider
    {
      const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(px, 2.5, pz)
      const body = world.createRigidBody(bd)
      world.createCollider(
        RAPIER.ColliderDesc.cylinder(2.5, 0.25).setFriction(0.5),
        body
      )
    }
  }

  // ─── BEACH BALL (DYNAMIC) ──────────────────────────────────
  const ballX = CX - 1
  const ballZ = CZ - 6
  const ballGeo = new THREE.SphereGeometry(0.25, 8, 6)
  // Multicolored beach ball: use vertex colors
  const ballColors = new Float32Array(ballGeo.attributes.position.count * 3)
  const ballColorOptions = [
    new THREE.Color(0xff3333),
    new THREE.Color(0xffff33),
    new THREE.Color(0x3333ff),
    new THREE.Color(0xff33ff),
    new THREE.Color(0x33ff33),
    new THREE.Color(0xff8833),
  ]
  for (let v = 0; v < ballGeo.attributes.position.count; v++) {
    const c = ballColorOptions[v % ballColorOptions.length]
    ballColors[v * 3] = c.r
    ballColors[v * 3 + 1] = c.g
    ballColors[v * 3 + 2] = c.b
  }
  ballGeo.setAttribute('color', new THREE.BufferAttribute(ballColors, 3))
  const ballMat = new THREE.MeshStandardMaterial({
    vertexColors: true,
    flatShading: true,
  })
  const ballMesh = shadow(new THREE.Mesh(ballGeo, ballMat))
  ballMesh.position.set(ballX, 0.4, ballZ)
  group.add(ballMesh)

  {
    const bd = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(ballX, 0.4, ballZ)
      .setLinearDamping(0.15)
      .setAngularDamping(0.2)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.ball(0.25)
        .setDensity(1.0)
        .setFriction(0.3)
        .setRestitution(0.7),
      body
    )
    syncList.push({ mesh: ballMesh, body })
  }

  // ─── SURFBOARD ─────────────────────────────────────────────
  const surfX = CX - 5
  const surfZ = CZ - 7
  const surfGeo = new THREE.BoxGeometry(0.3, 2.0, 0.06)
  const surfMesh = shadow(new THREE.Mesh(surfGeo, mat(0xff6600)))
  surfMesh.position.set(surfX, 1.0, surfZ)
  surfMesh.rotation.z = 0.15
  surfMesh.rotation.y = 0.3
  group.add(surfMesh)

  // Surfboard stripe
  const stripeGeo = new THREE.BoxGeometry(0.15, 1.6, 0.065)
  const stripe = shadow(new THREE.Mesh(stripeGeo, mat(0xffcc00)))
  stripe.position.set(surfX, 1.0, surfZ)
  stripe.rotation.z = 0.15
  stripe.rotation.y = 0.3
  group.add(stripe)

  // ─── LIFEGUARD TOWER ──────────────────────────────────────
  const lgX = CX - 8
  const lgZ = CZ - 7
  const lgGroup = new THREE.Group()
  lgGroup.position.set(lgX, 0, lgZ)

  // Stilts (4 legs)
  for (let lx = -1; lx <= 1; lx += 2) {
    for (let lz = -1; lz <= 1; lz += 2) {
      const stiltGeo = new THREE.CylinderGeometry(0.08, 0.1, 3.0, 6)
      const stilt = shadow(new THREE.Mesh(stiltGeo, mat(WOOD)))
      stilt.position.set(lx * 0.7, 1.5, lz * 0.5)
      lgGroup.add(stilt)
    }
  }

  // Platform
  const platGeo = new THREE.BoxGeometry(1.8, 0.12, 1.3)
  const plat = shadow(new THREE.Mesh(platGeo, mat(WOOD)))
  plat.position.y = 2.9
  lgGroup.add(plat)

  // Walls (partial)
  const wallBack = shadow(new THREE.Mesh(
    new THREE.BoxGeometry(1.8, 1.0, 0.08),
    mat(WHITE)
  ))
  wallBack.position.set(0, 3.45, -0.6)
  lgGroup.add(wallBack)

  // Side walls
  for (let side = -1; side <= 1; side += 2) {
    const sideWall = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 1.0, 1.1),
      mat(WHITE)
    ))
    sideWall.position.set(side * 0.86, 3.45, -0.05)
    lgGroup.add(sideWall)
  }

  // Roof
  const roofGeo = new THREE.BoxGeometry(2.1, 0.1, 1.6)
  const roof = shadow(new THREE.Mesh(roofGeo, mat(RED)))
  roof.position.set(0, 4.0, 0)
  roof.rotation.x = 0.08
  lgGroup.add(roof)

  // Cross brace
  const braceGeo = new THREE.BoxGeometry(0.06, 0.06, 1.5)
  const brace = shadow(new THREE.Mesh(braceGeo, mat(WOOD)))
  brace.position.set(0, 1.5, 0)
  brace.rotation.x = 0.8
  lgGroup.add(brace)

  // Ladder
  for (let r = 0; r < 5; r++) {
    const rungGeo = new THREE.BoxGeometry(0.5, 0.05, 0.05)
    const rung = shadow(new THREE.Mesh(rungGeo, mat(WOOD)))
    rung.position.set(0, 0.4 + r * 0.55, 0.6)
    lgGroup.add(rung)
  }

  group.add(lgGroup)

  // Lifeguard tower collider
  {
    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(lgX, 2, lgZ)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(0.9, 2, 0.7).setFriction(0.5),
      body
    )
  }

  // ─── FISHING NET ON FRAME ─────────────────────────────────
  const netX = dockX - 1.2
  const netZ = dockZ + 13
  // Frame posts
  for (let side = -1; side <= 1; side += 2) {
    const framePost = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.06, 2.0, 6),
      mat(WOOD)
    ))
    framePost.position.set(netX + side * 0.8, 1.4, netZ)
    group.add(framePost)
  }
  // Top bar
  const topBar = shadow(new THREE.Mesh(
    new THREE.BoxGeometry(1.7, 0.06, 0.06),
    mat(WOOD)
  ))
  topBar.position.set(netX, 2.35, netZ)
  group.add(topBar)

  // Net lines (grid of thin line segments using boxes)
  const netLineMat = mat(0x998866)
  for (let i = 0; i < 6; i++) {
    // Vertical lines
    const vLine = new THREE.Mesh(
      new THREE.BoxGeometry(0.015, 1.5, 0.015),
      netLineMat
    )
    vLine.position.set(netX - 0.65 + i * 0.26, 1.55, netZ)
    group.add(vLine)
  }
  for (let j = 0; j < 5; j++) {
    // Horizontal lines
    const hLine = new THREE.Mesh(
      new THREE.BoxGeometry(1.4, 0.015, 0.015),
      netLineMat
    )
    hLine.position.set(netX, 0.9 + j * 0.35, netZ)
    group.add(hLine)
  }

  // ─── ANCHOR ON DOCK ───────────────────────────────────────
  const anchorX = dockX + 1.3
  const anchorZ = dockZ + 12
  const anchorGroup = new THREE.Group()
  anchorGroup.position.set(anchorX, 0.55, anchorZ)

  // Shaft
  const shaftGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.8, 6)
  const shaft = shadow(new THREE.Mesh(shaftGeo, mat(0x444444)))
  shaft.position.y = 0.4
  anchorGroup.add(shaft)

  // Top ring
  const ringGeo = new THREE.TorusGeometry(0.12, 0.03, 4, 8)
  const ring = shadow(new THREE.Mesh(ringGeo, mat(0x444444)))
  ring.position.y = 0.85
  anchorGroup.add(ring)

  // Cross bar
  const crossGeo = new THREE.BoxGeometry(0.5, 0.05, 0.05)
  const cross = shadow(new THREE.Mesh(crossGeo, mat(0x444444)))
  cross.position.y = 0.3
  anchorGroup.add(cross)

  // Flukes (curved arm shapes - simple angled boxes)
  for (let side = -1; side <= 1; side += 2) {
    const flukeGeo = new THREE.BoxGeometry(0.04, 0.25, 0.04)
    const fluke = shadow(new THREE.Mesh(flukeGeo, mat(0x444444)))
    fluke.position.set(side * 0.22, 0.1, 0)
    fluke.rotation.z = side * 0.6
    anchorGroup.add(fluke)

    // Fluke tip
    const tipGeo = new THREE.ConeGeometry(0.06, 0.12, 4)
    const tip = shadow(new THREE.Mesh(tipGeo, mat(0x444444)))
    tip.position.set(side * 0.32, -0.02, 0)
    tip.rotation.z = side * 1.2
    anchorGroup.add(tip)
  }

  group.add(anchorGroup)

  // ─── SEAGULLS ──────────────────────────────────────────────
  const seagullPositions = [
    [dockX + 1.5, 1.1, dockZ + 2],
    [dockX - 1.5, 1.1, dockZ + 6],
    [dockX + 0.5, 1.1, dockZ + 9],
  ]
  for (const [gx, gy, gz] of seagullPositions) {
    const seagullGroup = new THREE.Group()
    seagullGroup.position.set(gx, gy, gz)

    // Body
    const bodyGeo = new THREE.SphereGeometry(0.1, 6, 5)
    bodyGeo.scale(1, 0.7, 1.4)
    const body = shadow(new THREE.Mesh(bodyGeo, mat(WHITE)))
    seagullGroup.add(body)

    // Head
    const headGeo = new THREE.SphereGeometry(0.06, 5, 4)
    const head = shadow(new THREE.Mesh(headGeo, mat(WHITE)))
    head.position.set(0, 0.06, 0.12)
    seagullGroup.add(head)

    // Beak
    const beakGeo = new THREE.ConeGeometry(0.02, 0.08, 4)
    const beak = shadow(new THREE.Mesh(beakGeo, mat(0xff8800)))
    beak.rotation.x = Math.PI / 2
    beak.position.set(0, 0.04, 0.2)
    seagullGroup.add(beak)

    // Wings
    for (let side = -1; side <= 1; side += 2) {
      const wingShape = new THREE.Shape()
      wingShape.moveTo(0, 0)
      wingShape.lineTo(side * 0.2, 0.05)
      wingShape.lineTo(side * 0.08, -0.04)
      wingShape.closePath()
      const wingGeo = new THREE.ShapeGeometry(wingShape)
      const wing = new THREE.Mesh(wingGeo, mat(0xdddddd, { side: THREE.DoubleSide }))
      wing.rotation.x = -Math.PI / 2
      wing.position.set(0, 0.02, 0)
      seagullGroup.add(wing)
    }

    // Tail
    const tailGeo = new THREE.ConeGeometry(0.03, 0.1, 4)
    const tail = shadow(new THREE.Mesh(tailGeo, mat(0xdddddd)))
    tail.rotation.x = -Math.PI / 3
    tail.position.set(0, 0.03, -0.15)
    seagullGroup.add(tail)

    seagullGroup.rotation.y = Math.random() * Math.PI * 2
    group.add(seagullGroup)
    seagulls.push(seagullGroup)
  }

  // ─── BUOY IN WATER ────────────────────────────────────────
  const buoyX = CX + 18
  const buoyZ = CZ + 12
  buoyMesh = new THREE.Group()
  buoyMesh.position.set(buoyX, 0.0, buoyZ)

  // Main buoy body (sphere)
  const buoyBodyGeo = new THREE.SphereGeometry(0.4, 8, 6)
  const buoyBody = shadow(new THREE.Mesh(buoyBodyGeo, mat(RED)))
  buoyBody.position.y = 0.15
  buoyMesh.add(buoyBody)

  // White stripe
  const buoyStripe = shadow(new THREE.Mesh(
    new THREE.CylinderGeometry(0.42, 0.42, 0.15, 8),
    mat(WHITE)
  ))
  buoyStripe.position.y = 0.15
  buoyMesh.add(buoyStripe)

  // Top spike
  const buoyTop = shadow(new THREE.Mesh(
    new THREE.CylinderGeometry(0.03, 0.03, 0.5, 4),
    mat(0x333333)
  ))
  buoyTop.position.y = 0.6
  buoyMesh.add(buoyTop)

  group.add(buoyMesh)

  // ─── EXTRA DETAILS ─────────────────────────────────────────

  // Starfish near shore
  const starfishX = CX + 1
  const starfishZ = CZ + 3.5
  for (let arm = 0; arm < 5; arm++) {
    const angle = (arm / 5) * Math.PI * 2
    const armGeo = new THREE.BoxGeometry(0.06, 0.02, 0.2)
    const armMesh = new THREE.Mesh(armGeo, mat(0xff6644))
    armMesh.position.set(
      starfishX + Math.cos(angle) * 0.1,
      0.035,
      starfishZ + Math.sin(angle) * 0.1
    )
    armMesh.rotation.y = -angle + Math.PI / 2
    group.add(armMesh)
  }

  // Driftwood pieces
  const driftwoodPositions = [
    [CX - 3, CZ + 4, 0.7],
    [CX + 7, CZ + 1, -0.3],
  ]
  for (const [dx, dz, rot] of driftwoodPositions) {
    const dwGeo = new THREE.CylinderGeometry(0.06, 0.08, 1.2, 5)
    const dw = shadow(new THREE.Mesh(dwGeo, mat(0x9e8b72)))
    dw.position.set(dx, 0.07, dz)
    dw.rotation.z = Math.PI / 2
    dw.rotation.y = rot
    group.add(dw)
  }

  // Small rocks near water edge
  const rockPositions = [
    [CX - 2, CZ + 6],
    [CX + 4, CZ + 5],
    [CX - 5, CZ + 4],
    [CX + 9, CZ + 4],
  ]
  for (const [rx, rz] of rockPositions) {
    const size = 0.15 + Math.random() * 0.2
    const rockGeo = new THREE.SphereGeometry(size, 5, 4)
    rockGeo.scale(1, 0.6, 0.9)
    const rock = shadow(new THREE.Mesh(rockGeo, mat(0x888888)))
    rock.position.set(rx, size * 0.2, rz)
    rock.rotation.set(Math.random(), Math.random(), Math.random())
    group.add(rock)
  }

  // Footprints (tiny dark ovals on sand)
  for (let f = 0; f < 8; f++) {
    const fpGeo = new THREE.CircleGeometry(0.06, 5)
    const fp = new THREE.Mesh(fpGeo, mat(0xc4b48a))
    fp.rotation.x = -Math.PI / 2
    fp.position.set(
      CX - 4 + f * 0.6 + (f % 2) * 0.3,
      0.025,
      CZ - 3 + f * 0.5
    )
    group.add(fp)
  }

  // Wooden sign on beach
  const signPostGeo = new THREE.CylinderGeometry(0.05, 0.05, 1.5, 4)
  const signPost = shadow(new THREE.Mesh(signPostGeo, mat(WOOD)))
  signPost.position.set(CX - 6, 0.75, CZ + 4)
  group.add(signPost)

  const signBoardGeo = new THREE.BoxGeometry(1.0, 0.4, 0.06)
  const signBoard = shadow(new THREE.Mesh(signBoardGeo, mat(WOOD_DARK)))
  signBoard.position.set(CX - 6, 1.4, CZ + 4)
  group.add(signBoard)

  // Small wave-breakers (partially submerged cylinders along shore)
  for (let w = 0; w < 5; w++) {
    const wbGeo = new THREE.CylinderGeometry(0.07, 0.09, 0.8, 6)
    const wb = shadow(new THREE.Mesh(wbGeo, mat(WOOD_DARK)))
    wb.position.set(CX - 6 + w * 3.5, 0.15, CZ + 7 + Math.sin(w) * 0.5)
    group.add(wb)
  }

  // Rope coiled on beach
  const beachRopeGeo = new THREE.TorusGeometry(0.2, 0.03, 4, 12)
  const beachRope = new THREE.Mesh(beachRopeGeo, mat(0xc4a35a))
  beachRope.rotation.x = Math.PI / 2
  beachRope.position.set(CX + 6, 0.05, CZ + 0.5)
  group.add(beachRope)

  // Bucket and spade near sandcastle
  const bucketGeo = new THREE.CylinderGeometry(0.1, 0.08, 0.15, 6)
  const bucket = shadow(new THREE.Mesh(bucketGeo, mat(0x3388ff)))
  bucket.position.set(scX + 0.5, 0.08, scZ + 0.3)
  group.add(bucket)

  const spadeGeo = new THREE.BoxGeometry(0.04, 0.25, 0.04)
  const spade = shadow(new THREE.Mesh(spadeGeo, mat(0xff4444)))
  spade.position.set(scX + 0.7, 0.1, scZ + 0.2)
  spade.rotation.z = 0.5
  group.add(spade)

  // Spade blade
  const spadeBladeGeo = new THREE.BoxGeometry(0.1, 0.01, 0.08)
  const spadeBlade = shadow(new THREE.Mesh(spadeBladeGeo, mat(0xff4444)))
  spadeBlade.position.set(scX + 0.58, -0.01, scZ + 0.2)
  group.add(spadeBlade)

  // Second buoy (smaller, further out)
  const buoy2 = shadow(new THREE.Mesh(
    new THREE.SphereGeometry(0.2, 6, 5),
    mat(0xff8800)
  ))
  buoy2.position.set(CX + 22, 0.05, CZ + 18)
  group.add(buoy2)

  // Seaweed patches near waterline
  const seaweedColor = 0x2a6e3f
  for (let sw = 0; sw < 4; sw++) {
    const swGeo = new THREE.PlaneGeometry(0.3, 0.15)
    const swMesh = new THREE.Mesh(swGeo, mat(seaweedColor, { side: THREE.DoubleSide }))
    swMesh.rotation.x = -Math.PI / 2
    swMesh.position.set(
      CX - 4 + sw * 4 + Math.random(),
      0.025,
      CZ + 6 + Math.random() * 1.5
    )
    swMesh.rotation.z = Math.random() * Math.PI
    group.add(swMesh)
  }

  // Crab (tiny body with legs)
  const crabGroup = new THREE.Group()
  crabGroup.position.set(CX + 3, 0.06, CZ + 1)
  const crabBody = new THREE.Mesh(
    new THREE.SphereGeometry(0.07, 5, 4),
    mat(0xcc4422)
  )
  crabBody.scale.set(1.3, 0.5, 1)
  crabGroup.add(crabBody)
  // Claws
  for (let side = -1; side <= 1; side += 2) {
    const claw = new THREE.Mesh(
      new THREE.SphereGeometry(0.035, 4, 3),
      mat(0xcc4422)
    )
    claw.position.set(side * 0.1, 0, 0.08)
    crabGroup.add(claw)
  }
  // Legs
  for (let leg = 0; leg < 3; leg++) {
    for (let side = -1; side <= 1; side += 2) {
      const legMesh = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 0.01, 0.01),
        mat(0xcc4422)
      )
      legMesh.position.set(side * 0.09, -0.02, -0.04 + leg * 0.04)
      crabGroup.add(legMesh)
    }
  }
  group.add(crabGroup)

  // ─── ADD EVERYTHING TO SCENE ──────────────────────────────
  scene.add(group)

  // ─── RETURN ────────────────────────────────────────────────
  return {
    syncList,
    update(dt) {
      elapsedTime += dt

      // Water wave animation
      const posAttr = waterMesh.geometry.attributes.position
      for (let i = 0; i < posAttr.count; i++) {
        const origX = waterOrigY[i * 3]
        const origZ = waterOrigY[i * 3 + 2]
        // Gentle wave - modulate the Y (which is Z in world because plane is rotated)
        posAttr.array[i * 3 + 1] = waterOrigY[i * 3 + 1]
          + Math.sin(elapsedTime * 1.2 + origX * 0.5 + origZ * 0.3) * 0.06
          + Math.cos(elapsedTime * 0.8 + origZ * 0.7) * 0.04
      }
      posAttr.needsUpdate = true

      // Lighthouse beacon pulse
      const pulseIntensity = (Math.sin(elapsedTime * 3.0) + 1) * 0.5 // 0..1
      lighthouseBeacon.material.emissiveIntensity = 1.0 + pulseIntensity * 3.0
      lighthouseBeacon.scale.setScalar(0.9 + pulseIntensity * 0.3)
      if (lighthouseBeacon._pointLight) {
        lighthouseBeacon._pointLight.intensity = 1.5 + pulseIntensity * 4
      }

      // Sailboat bobbing
      sailboatGroup.position.y = 0.05 + Math.sin(elapsedTime * 1.5) * 0.08
      sailboatGroup.rotation.z = Math.sin(elapsedTime * 1.1 + 0.5) * 0.03
      sailboatGroup.rotation.x = Math.sin(elapsedTime * 0.9) * 0.02

      // Rowboat gentle rock (on beach, subtle)
      rowboatGroup.rotation.z = Math.sin(elapsedTime * 0.5) * 0.015

      // Buoy bobbing
      buoyMesh.position.y = 0.0 + Math.sin(elapsedTime * 2.0 + 1.0) * 0.1
      buoyMesh.rotation.z = Math.sin(elapsedTime * 1.3) * 0.08

      // Seagull subtle head bob
      for (let i = 0; i < seagulls.length; i++) {
        const g = seagulls[i]
        g.position.y = seagullPositions[i][1] + Math.sin(elapsedTime * 2 + i * 1.5) * 0.02
      }
    },
  }
}
