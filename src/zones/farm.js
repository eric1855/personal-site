/**
 * Farm Zone — pastoral farm west of the city.
 * Center: x=-50, z=0, radius ~20.
 *
 * Windmill (animated spinning blades), red barn + silo, animals (cows, sheep,
 * chickens, pig), fenced pen, crop patches (wheat, corn, carrots), tractor,
 * scarecrow, well, wagon, water trough, milk churns, apple trees.
 *
 * Dynamic objects: 6 hay bales (cylinders on side), 3 milk churns, 3 pumpkins.
 */
import * as THREE from 'three'

// ── Zone center ────────────────────────────────────────────────────────
const CX = -50
const CZ = 0

// ── Reusable materials ─────────────────────────────────────────────────
function mat(color, opts = {}) {
  return new THREE.MeshStandardMaterial({ color, flatShading: true, ...opts })
}

function shadow(mesh) {
  mesh.castShadow = true
  mesh.receiveShadow = true
  return mesh
}

// ── Colors ─────────────────────────────────────────────────────────────
const BARN_RED    = 0x8B0000
const HAY_GOLD    = 0xD4A234
const EARTH_BROWN = 0x7a6a4e
const WOOD        = 0x8b6914
const WOOD_DARK   = 0x5d4e37
const WHITE       = 0xffffff
const CREAM       = 0xfaf0dc
const BLACK       = 0x222222
const GRAY        = 0x888888
const DARK_GRAY   = 0x555555
const GREEN       = 0x3a7d2e
const DARK_GREEN  = 0x2d5e22
const PINK        = 0xf0a0a0
const BROWN       = 0x8b5e3c
const STONE       = 0xa0978a

export function createFarm(scene, RAPIER, world) {
  const syncList = []
  const group = new THREE.Group()

  let windmillBlades = null
  let elapsedTime = 0

  // ═══════════════════════════════════════════════════════════════════════
  //  GROUND
  // ═══════════════════════════════════════════════════════════════════════
  const groundGeo = new THREE.CircleGeometry(22, 16)
  const ground = new THREE.Mesh(groundGeo, mat(EARTH_BROWN))
  ground.rotation.x = -Math.PI / 2
  ground.position.set(CX, 0.015, CZ)
  ground.receiveShadow = true
  group.add(ground)

  // Grass patches (lighter green circles)
  const grassPositions = [
    [CX - 8, CZ - 10], [CX + 5, CZ + 12], [CX - 14, CZ + 5],
    [CX + 10, CZ - 8], [CX - 3, CZ + 6],
  ]
  for (const [gx, gz] of grassPositions) {
    const grassGeo = new THREE.CircleGeometry(3 + Math.random() * 2, 8)
    const grass = new THREE.Mesh(grassGeo, mat(0x5a8a3e))
    grass.rotation.x = -Math.PI / 2
    grass.position.set(gx, 0.018, gz)
    grass.receiveShadow = true
    group.add(grass)
  }

  // ═══════════════════════════════════════════════════════════════════════
  //  WINDMILL
  // ═══════════════════════════════════════════════════════════════════════
  const wmX = CX + 8
  const wmZ = CZ - 8
  const windmillGroup = new THREE.Group()
  windmillGroup.position.set(wmX, 0, wmZ)

  // Tapered tower
  const towerGeo = new THREE.CylinderGeometry(0.8, 1.4, 6, 8)
  const tower = shadow(new THREE.Mesh(towerGeo, mat(0xa0917a)))
  tower.position.y = 3
  windmillGroup.add(tower)

  // Conical roof
  const roofGeo = new THREE.ConeGeometry(1.1, 1.5, 8)
  const roof = shadow(new THREE.Mesh(roofGeo, mat(0x6b4226)))
  roof.position.y = 6.75
  windmillGroup.add(roof)

  // Door
  const doorGeo = new THREE.BoxGeometry(0.5, 1.0, 0.15)
  const door = shadow(new THREE.Mesh(doorGeo, mat(WOOD_DARK)))
  door.position.set(0, 0.5, 1.35)
  windmillGroup.add(door)

  // Window (small box)
  const windowGeo = new THREE.BoxGeometry(0.35, 0.35, 0.15)
  const windowMesh = shadow(new THREE.Mesh(windowGeo, mat(0x8ec8f0)))
  windowMesh.position.set(0, 4.0, 0.78)
  windmillGroup.add(windowMesh)
  // Window frame
  const wfH = shadow(new THREE.Mesh(
    new THREE.BoxGeometry(0.4, 0.04, 0.16), mat(WOOD_DARK)
  ))
  wfH.position.set(0, 4.0, 0.78)
  windmillGroup.add(wfH)
  const wfV = shadow(new THREE.Mesh(
    new THREE.BoxGeometry(0.04, 0.4, 0.16), mat(WOOD_DARK)
  ))
  wfV.position.set(0, 4.0, 0.78)
  windmillGroup.add(wfV)

  // Blade hub
  const hubGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.3, 8)
  const hub = shadow(new THREE.Mesh(hubGeo, mat(WOOD)))
  hub.rotation.x = Math.PI / 2
  hub.position.set(0, 5.0, 0.9)
  windmillGroup.add(hub)

  // Blades pivot group — rotates around Z
  windmillBlades = new THREE.Group()
  windmillBlades.position.set(0, 5.0, 1.0)

  for (let i = 0; i < 4; i++) {
    const angle = (i / 4) * Math.PI * 2
    const bladeGroup = new THREE.Group()
    bladeGroup.rotation.z = angle

    // Blade arm
    const armGeo = new THREE.BoxGeometry(0.1, 3.0, 0.05)
    const arm = shadow(new THREE.Mesh(armGeo, mat(WOOD)))
    arm.position.y = 1.5
    bladeGroup.add(arm)

    // Sail (thin rectangular plane)
    const sailGeo = new THREE.PlaneGeometry(0.7, 2.6)
    const sail = new THREE.Mesh(sailGeo, mat(CREAM, { side: THREE.DoubleSide }))
    sail.castShadow = true
    sail.position.set(0.25, 1.5, 0)
    bladeGroup.add(sail)

    windmillBlades.add(bladeGroup)
  }

  windmillGroup.add(windmillBlades)
  group.add(windmillGroup)

  // Windmill FIXED collider
  {
    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(wmX, 3, wmZ)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cylinder(3, 1.4).setFriction(0.5),
      body
    )
  }

  // ═══════════════════════════════════════════════════════════════════════
  //  RED BARN + SILO
  // ═══════════════════════════════════════════════════════════════════════
  const barnX = CX - 5
  const barnZ = CZ - 8
  const barnGroup = new THREE.Group()
  barnGroup.position.set(barnX, 0, barnZ)

  // Main barn body
  const barnBody = shadow(new THREE.Mesh(
    new THREE.BoxGeometry(6, 4, 8), mat(BARN_RED)
  ))
  barnBody.position.y = 2
  barnGroup.add(barnBody)

  // Gambrel roof — two angled planes per side
  const roofMat = mat(0x5a3a1a)
  // Lower roof sections
  for (let side = -1; side <= 1; side += 2) {
    const lowerRoof = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(3.8, 0.15, 8.2), roofMat
    ))
    lowerRoof.position.set(side * 2.2, 4.3, 0)
    lowerRoof.rotation.z = side * -0.55
    barnGroup.add(lowerRoof)
  }
  // Upper roof sections
  for (let side = -1; side <= 1; side += 2) {
    const upperRoof = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(2.2, 0.15, 8.2), roofMat
    ))
    upperRoof.position.set(side * 1.0, 5.2, 0)
    upperRoof.rotation.z = side * -0.2
    barnGroup.add(upperRoof)
  }
  // Roof ridge
  const ridge = shadow(new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.2, 8.4), roofMat
  ))
  ridge.position.y = 5.35
  barnGroup.add(ridge)

  // Gable ends (triangles approximated with boxes)
  for (let fz = -1; fz <= 1; fz += 2) {
    const gable = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(5.5, 0.15, 1.5), mat(BARN_RED)
    ))
    gable.rotation.x = Math.PI / 2
    gable.position.set(0, 4.65, fz * 4.05)
    gable.scale.set(1, 1, 0.8)
    barnGroup.add(gable)
  }

  // White X-trim on front door
  const barnDoorBg = shadow(new THREE.Mesh(
    new THREE.BoxGeometry(2.5, 3.0, 0.12), mat(BARN_RED)
  ))
  barnDoorBg.position.set(0, 1.5, 4.05)
  barnGroup.add(barnDoorBg)

  // X trim — two diagonal bars
  const trimMat = mat(WHITE)
  const xBar1 = shadow(new THREE.Mesh(
    new THREE.BoxGeometry(0.08, 3.5, 0.05), trimMat
  ))
  xBar1.position.set(0, 1.5, 4.12)
  xBar1.rotation.z = 0.62
  barnGroup.add(xBar1)

  const xBar2 = shadow(new THREE.Mesh(
    new THREE.BoxGeometry(0.08, 3.5, 0.05), trimMat
  ))
  xBar2.position.set(0, 1.5, 4.12)
  xBar2.rotation.z = -0.62
  barnGroup.add(xBar2)

  // Hay loft opening (dark rectangle on back)
  const loftGeo = new THREE.BoxGeometry(1.5, 1.0, 0.12)
  const loft = shadow(new THREE.Mesh(loftGeo, mat(0x2a1a0a)))
  loft.position.set(0, 3.8, -4.05)
  barnGroup.add(loft)

  // Hay peeking out of loft
  const loftHay = shadow(new THREE.Mesh(
    new THREE.BoxGeometry(1.3, 0.4, 0.3), mat(HAY_GOLD)
  ))
  loftHay.position.set(0, 3.4, -4.1)
  barnGroup.add(loftHay)

  group.add(barnGroup)

  // Barn FIXED collider
  {
    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(barnX, 2, barnZ)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(3, 2, 4).setFriction(0.5),
      body
    )
  }

  // ── Silo ─────────────────────────────────────────────────────────────
  const siloX = barnX + 5
  const siloZ = barnZ - 2
  const siloGroup = new THREE.Group()
  siloGroup.position.set(siloX, 0, siloZ)

  // Silo body (tall cylinder)
  const siloBody = shadow(new THREE.Mesh(
    new THREE.CylinderGeometry(1.2, 1.2, 7, 10), mat(GRAY)
  ))
  siloBody.position.y = 3.5
  siloGroup.add(siloBody)

  // Silo dome
  const siloDome = shadow(new THREE.Mesh(
    new THREE.SphereGeometry(1.2, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2), mat(DARK_GRAY)
  ))
  siloDome.position.y = 7
  siloGroup.add(siloDome)

  // Silo bands
  for (let b = 0; b < 4; b++) {
    const band = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(1.25, 1.25, 0.1, 10), mat(DARK_GRAY)
    ))
    band.position.y = 1.0 + b * 1.8
    siloGroup.add(band)
  }

  group.add(siloGroup)

  // Silo collider
  {
    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(siloX, 3.5, siloZ)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cylinder(3.5, 1.2).setFriction(0.5),
      body
    )
  }

  // ═══════════════════════════════════════════════════════════════════════
  //  FENCING (post and rail)
  // ═══════════════════════════════════════════════════════════════════════
  // Animal pen: rectangular area near barn
  const penCX = CX - 4
  const penCZ = CZ + 6
  const penW = 10 // half-width
  const penD = 6  // half-depth
  const postSpacing = 2.5
  const gateZ = penCZ + penD // gate on the far +z side

  function addFenceSegment(x1, z1, x2, z2, skipGate) {
    const dx = x2 - x1
    const dz = z2 - z1
    const len = Math.sqrt(dx * dx + dz * dz)
    const angle = Math.atan2(dx, dz)
    const posts = Math.floor(len / postSpacing) + 1

    for (let i = 0; i < posts; i++) {
      const t = i / (posts - 1)
      const px = x1 + dx * t
      const pz = z1 + dz * t

      // Skip posts near gate opening
      if (skipGate && Math.abs(pz - gateZ) < 1.5 && Math.abs(px - penCX) < 1.5) continue

      // Post
      const post = shadow(new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.08, 1.2, 5), mat(WOOD)
      ))
      post.position.set(px, 0.6, pz)
      group.add(post)
    }

    // Horizontal rails (skip gate section)
    for (let r = 0; r < 2; r++) {
      const railY = 0.4 + r * 0.4

      if (skipGate) {
        // Split rail around gate
        // left part
        const leftLen = len * 0.35
        const rail1 = shadow(new THREE.Mesh(
          new THREE.BoxGeometry(0.05, 0.06, leftLen), mat(WOOD)
        ))
        rail1.position.set(
          x1 + dx * 0.175,
          railY,
          z1 + dz * 0.175
        )
        rail1.rotation.y = -angle
        group.add(rail1)
        // right part
        const rail2 = shadow(new THREE.Mesh(
          new THREE.BoxGeometry(0.05, 0.06, leftLen), mat(WOOD)
        ))
        rail2.position.set(
          x1 + dx * 0.825,
          railY,
          z1 + dz * 0.825
        )
        rail2.rotation.y = -angle
        group.add(rail2)
      } else {
        const rail = shadow(new THREE.Mesh(
          new THREE.BoxGeometry(0.05, 0.06, len), mat(WOOD)
        ))
        rail.position.set(
          x1 + dx * 0.5,
          railY,
          z1 + dz * 0.5
        )
        rail.rotation.y = -angle
        group.add(rail)
      }
    }
  }

  // Four sides of the pen
  addFenceSegment(penCX - penW, penCZ - penD, penCX + penW, penCZ - penD, false) // back
  addFenceSegment(penCX - penW, penCZ - penD, penCX - penW, penCZ + penD, false) // left
  addFenceSegment(penCX + penW, penCZ - penD, penCX + penW, penCZ + penD, false) // right
  addFenceSegment(penCX - penW, penCZ + penD, penCX + penW, penCZ + penD, true)   // front (with gate)

  // Fence colliders (4 sides, gap for gate)
  {
    // Back wall
    const bd1 = RAPIER.RigidBodyDesc.fixed().setTranslation(penCX, 0.5, penCZ - penD)
    const b1 = world.createRigidBody(bd1)
    world.createCollider(RAPIER.ColliderDesc.cuboid(penW, 0.5, 0.1).setFriction(0.3), b1)
    // Left wall
    const bd2 = RAPIER.RigidBodyDesc.fixed().setTranslation(penCX - penW, 0.5, penCZ)
    const b2 = world.createRigidBody(bd2)
    world.createCollider(RAPIER.ColliderDesc.cuboid(0.1, 0.5, penD).setFriction(0.3), b2)
    // Right wall
    const bd3 = RAPIER.RigidBodyDesc.fixed().setTranslation(penCX + penW, 0.5, penCZ)
    const b3 = world.createRigidBody(bd3)
    world.createCollider(RAPIER.ColliderDesc.cuboid(0.1, 0.5, penD).setFriction(0.3), b3)
    // Front wall left section
    const bd4 = RAPIER.RigidBodyDesc.fixed().setTranslation(penCX - penW / 2 - 1, 0.5, penCZ + penD)
    const b4 = world.createRigidBody(bd4)
    world.createCollider(RAPIER.ColliderDesc.cuboid(penW / 2 - 1.5, 0.5, 0.1).setFriction(0.3), b4)
    // Front wall right section
    const bd5 = RAPIER.RigidBodyDesc.fixed().setTranslation(penCX + penW / 2 + 1, 0.5, penCZ + penD)
    const b5 = world.createRigidBody(bd5)
    world.createCollider(RAPIER.ColliderDesc.cuboid(penW / 2 - 1.5, 0.5, 0.1).setFriction(0.3), b5)
  }

  // ═══════════════════════════════════════════════════════════════════════
  //  ANIMALS
  // ═══════════════════════════════════════════════════════════════════════

  // ── Cows (3) ─────────────────────────────────────────────────────────
  const cowPositions = [
    [penCX - 4, penCZ + 1, 0.3],
    [penCX + 2, penCZ + 3, -0.8],
    [penCX - 1, penCZ - 2, 1.5],
  ]

  for (const [cx, cz, rot] of cowPositions) {
    const cowGroup = new THREE.Group()
    cowGroup.position.set(cx, 0, cz)
    cowGroup.rotation.y = rot

    // Body
    const cowBody = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 0.6, 1.2), mat(WHITE)
    ))
    cowBody.position.y = 0.7
    cowGroup.add(cowBody)

    // Black spots (small boxes on body)
    const spotMat = mat(BLACK)
    const spot1 = shadow(new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.2, 0.3), spotMat))
    spot1.position.set(0.15, 0.85, 0.2)
    cowGroup.add(spot1)
    const spot2 = shadow(new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.15, 0.25), spotMat))
    spot2.position.set(-0.2, 0.75, -0.3)
    cowGroup.add(spot2)

    // Head
    const cowHead = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 0.4, 0.35), mat(WHITE)
    ))
    cowHead.position.set(0, 0.85, 0.75)
    cowGroup.add(cowHead)

    // Snout
    const snout = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(0.25, 0.15, 0.12), mat(PINK)
    ))
    snout.position.set(0, 0.75, 0.92)
    cowGroup.add(snout)

    // Horns
    for (let side = -1; side <= 1; side += 2) {
      const horn = shadow(new THREE.Mesh(
        new THREE.ConeGeometry(0.04, 0.2, 4), mat(CREAM)
      ))
      horn.position.set(side * 0.18, 1.1, 0.75)
      horn.rotation.z = side * 0.4
      cowGroup.add(horn)
    }

    // Legs (4 cylinders)
    const legPositions = [
      [-0.25, 0, 0.35], [0.25, 0, 0.35],
      [-0.25, 0, -0.35], [0.25, 0, -0.35],
    ]
    for (const [lx, , lz] of legPositions) {
      const leg = shadow(new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.06, 0.4, 5), mat(WHITE)
      ))
      leg.position.set(lx, 0.2, lz)
      cowGroup.add(leg)
    }

    // Udder
    const udder = shadow(new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 5, 4), mat(PINK)
    ))
    udder.position.set(0, 0.42, -0.15)
    cowGroup.add(udder)

    // Tail
    const tail = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.02, 0.5, 4), mat(BLACK)
    ))
    tail.position.set(0, 0.65, -0.65)
    tail.rotation.x = 0.3
    cowGroup.add(tail)

    group.add(cowGroup)
  }

  // ── Sheep (4) ────────────────────────────────────────────────────────
  const sheepPositions = [
    [penCX + 5, penCZ - 1, 0.5],
    [penCX + 6, penCZ + 2, -0.3],
    [penCX + 3, penCZ - 3, 2.2],
    [penCX + 7, penCZ + 4, 1.0],
  ]

  for (const [sx, sz, rot] of sheepPositions) {
    const sheepGroup = new THREE.Group()
    sheepGroup.position.set(sx, 0, sz)
    sheepGroup.rotation.y = rot

    // Woolly body (sphere)
    const sheepBody = shadow(new THREE.Mesh(
      new THREE.SphereGeometry(0.4, 6, 5), mat(CREAM)
    ))
    sheepBody.position.y = 0.55
    sheepBody.scale.set(1, 0.85, 1.2)
    sheepGroup.add(sheepBody)

    // Head (dark box)
    const sheepHead = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(0.22, 0.22, 0.25), mat(0x3a3a3a)
    ))
    sheepHead.position.set(0, 0.55, 0.55)
    sheepGroup.add(sheepHead)

    // Ears
    for (let side = -1; side <= 1; side += 2) {
      const ear = shadow(new THREE.Mesh(
        new THREE.BoxGeometry(0.15, 0.06, 0.06), mat(0x3a3a3a)
      ))
      ear.position.set(side * 0.15, 0.6, 0.5)
      ear.rotation.z = side * 0.5
      sheepGroup.add(ear)
    }

    // Legs (4 thin cylinders)
    const sLegPos = [
      [-0.15, 0, 0.2], [0.15, 0, 0.2],
      [-0.15, 0, -0.2], [0.15, 0, -0.2],
    ]
    for (const [lx, , lz] of sLegPos) {
      const leg = shadow(new THREE.Mesh(
        new THREE.CylinderGeometry(0.035, 0.035, 0.3, 4), mat(0x3a3a3a)
      ))
      leg.position.set(lx, 0.15, lz)
      sheepGroup.add(leg)
    }

    group.add(sheepGroup)
  }

  // ── Chickens (3) ─────────────────────────────────────────────────────
  const chickenPositions = [
    [penCX - 6, penCZ + 4, 1.2],
    [penCX - 7, penCZ + 2, -0.5],
    [penCX - 5, penCZ + 3, 2.8],
  ]

  for (const [chx, chz, rot] of chickenPositions) {
    const chickenGroup = new THREE.Group()
    chickenGroup.position.set(chx, 0, chz)
    chickenGroup.rotation.y = rot

    // Body (sphere)
    const chBody = shadow(new THREE.Mesh(
      new THREE.SphereGeometry(0.15, 5, 4), mat(BROWN)
    ))
    chBody.position.y = 0.28
    chBody.scale.set(1, 0.9, 1.2)
    chickenGroup.add(chBody)

    // Head
    const chHead = shadow(new THREE.Mesh(
      new THREE.SphereGeometry(0.08, 5, 4), mat(BROWN)
    ))
    chHead.position.set(0, 0.38, 0.15)
    chickenGroup.add(chHead)

    // Beak (cone)
    const beak = shadow(new THREE.Mesh(
      new THREE.ConeGeometry(0.03, 0.08, 4), mat(0xf0a020)
    ))
    beak.rotation.x = Math.PI / 2
    beak.position.set(0, 0.36, 0.24)
    chickenGroup.add(beak)

    // Comb
    const comb = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(0.04, 0.08, 0.06), mat(0xcc2222)
    ))
    comb.position.set(0, 0.46, 0.14)
    chickenGroup.add(comb)

    // Tail feathers
    const tailF = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(0.04, 0.12, 0.1), mat(0x5a3a1a)
    ))
    tailF.position.set(0, 0.35, -0.18)
    tailF.rotation.x = -0.5
    chickenGroup.add(tailF)

    // Legs
    for (let side = -1; side <= 1; side += 2) {
      const leg = shadow(new THREE.Mesh(
        new THREE.CylinderGeometry(0.015, 0.015, 0.15, 3), mat(0xd0a020)
      ))
      leg.position.set(side * 0.06, 0.08, 0)
      chickenGroup.add(leg)
    }

    group.add(chickenGroup)
  }

  // ── Pig (1) ──────────────────────────────────────────────────────────
  {
    const pigGroup = new THREE.Group()
    pigGroup.position.set(penCX + 1, 0, penCZ + 4)
    pigGroup.rotation.y = 0.8

    // Body (pink sphere)
    const pigBody = shadow(new THREE.Mesh(
      new THREE.SphereGeometry(0.35, 6, 5), mat(PINK)
    ))
    pigBody.position.y = 0.45
    pigBody.scale.set(1, 0.85, 1.3)
    pigGroup.add(pigBody)

    // Head (box)
    const pigHead = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(0.28, 0.25, 0.25), mat(PINK)
    ))
    pigHead.position.set(0, 0.48, 0.5)
    pigGroup.add(pigHead)

    // Snout
    const pigSnout = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 0.06, 6), mat(0xe08888)
    ))
    pigSnout.rotation.x = Math.PI / 2
    pigSnout.position.set(0, 0.45, 0.63)
    pigGroup.add(pigSnout)

    // Eyes
    for (let side = -1; side <= 1; side += 2) {
      const eye = shadow(new THREE.Mesh(
        new THREE.SphereGeometry(0.025, 4, 3), mat(BLACK)
      ))
      eye.position.set(side * 0.08, 0.54, 0.6)
      pigGroup.add(eye)
    }

    // Ears
    for (let side = -1; side <= 1; side += 2) {
      const ear = shadow(new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.1, 0.04), mat(PINK)
      ))
      ear.position.set(side * 0.12, 0.6, 0.48)
      ear.rotation.z = side * 0.5
      pigGroup.add(ear)
    }

    // Legs (4)
    const pigLegPos = [
      [-0.14, 0, 0.2], [0.14, 0, 0.2],
      [-0.14, 0, -0.2], [0.14, 0, -0.2],
    ]
    for (const [lx, , lz] of pigLegPos) {
      const leg = shadow(new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 0.2, 4), mat(PINK)
      ))
      leg.position.set(lx, 0.1, lz)
      pigGroup.add(leg)
    }

    // Curly tail (torus ring)
    const pigTail = shadow(new THREE.Mesh(
      new THREE.TorusGeometry(0.06, 0.015, 4, 8, Math.PI * 1.5), mat(PINK)
    ))
    pigTail.position.set(0, 0.45, -0.47)
    pigTail.rotation.y = Math.PI / 2
    pigGroup.add(pigTail)

    group.add(pigGroup)
  }

  // ═══════════════════════════════════════════════════════════════════════
  //  CROP PATCHES
  // ═══════════════════════════════════════════════════════════════════════

  // ── Wheat patch ──────────────────────────────────────────────────────
  const wheatX = CX - 14
  const wheatZ = CZ - 5
  // Ground patch
  const wheatGround = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 4), mat(0x6a5a3e)
  )
  wheatGround.rotation.x = -Math.PI / 2
  wheatGround.position.set(wheatX, 0.02, wheatZ)
  wheatGround.receiveShadow = true
  group.add(wheatGround)

  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 8; col++) {
      const stalk = shadow(new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.02, 0.6 + Math.random() * 0.2, 3),
        mat(0xb8c44a)
      ))
      stalk.position.set(
        wheatX - 2 + col * 0.6 + Math.random() * 0.15,
        0.35,
        wheatZ - 1.5 + row * 0.8 + Math.random() * 0.1
      )
      stalk.rotation.x = (Math.random() - 0.5) * 0.1
      stalk.rotation.z = (Math.random() - 0.5) * 0.1
      group.add(stalk)

      // Wheat head
      const head = shadow(new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.02, 0.12, 4), mat(HAY_GOLD)
      ))
      head.position.set(
        stalk.position.x,
        stalk.position.y + 0.35,
        stalk.position.z
      )
      group.add(head)
    }
  }

  // ── Corn patch ───────────────────────────────────────────────────────
  const cornX = CX - 14
  const cornZ = CZ + 3
  const cornGround = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 4), mat(0x6a5a3e)
  )
  cornGround.rotation.x = -Math.PI / 2
  cornGround.position.set(cornX, 0.02, cornZ)
  cornGround.receiveShadow = true
  group.add(cornGround)

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 5; col++) {
      const cornStalk = shadow(new THREE.Mesh(
        new THREE.CylinderGeometry(0.03, 0.03, 1.2 + Math.random() * 0.3, 4),
        mat(0x4a8a2a)
      ))
      cornStalk.position.set(
        cornX - 1.8 + col * 1.0,
        0.65,
        cornZ - 1.2 + row * 1.2
      )
      group.add(cornStalk)

      // Corn cob (yellow box top)
      const cob = shadow(new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 0.2, 0.08), mat(0xe8c820)
      ))
      cob.position.set(
        cornStalk.position.x + 0.08,
        0.9,
        cornStalk.position.z
      )
      group.add(cob)

      // Leaves
      for (let l = 0; l < 2; l++) {
        const leaf = shadow(new THREE.Mesh(
          new THREE.PlaneGeometry(0.4, 0.08), mat(GREEN, { side: THREE.DoubleSide })
        ))
        leaf.position.set(
          cornStalk.position.x,
          0.6 + l * 0.4,
          cornStalk.position.z
        )
        leaf.rotation.y = Math.random() * Math.PI
        leaf.rotation.z = 0.4
        group.add(leaf)
      }
    }
  }

  // ── Carrot patch ─────────────────────────────────────────────────────
  const carrotX = CX - 14
  const carrotZ = CZ + 10
  const carrotGround = new THREE.Mesh(
    new THREE.PlaneGeometry(4, 3), mat(0x6a5a3e)
  )
  carrotGround.rotation.x = -Math.PI / 2
  carrotGround.position.set(carrotX, 0.02, carrotZ)
  carrotGround.receiveShadow = true
  group.add(carrotGround)

  // Dirt mounds with green tops
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 5; col++) {
      // Small dirt mound
      const mound = shadow(new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 4, 3), mat(0x7a5a3e)
      ))
      mound.scale.set(1, 0.4, 1)
      mound.position.set(
        carrotX - 1.4 + col * 0.8,
        0.04,
        carrotZ - 0.8 + row * 0.9
      )
      group.add(mound)

      // Green carrot top cone
      const carrotTop = shadow(new THREE.Mesh(
        new THREE.ConeGeometry(0.08, 0.2, 4), mat(GREEN)
      ))
      carrotTop.position.set(
        mound.position.x,
        0.16,
        mound.position.z
      )
      group.add(carrotTop)
    }
  }

  // ═══════════════════════════════════════════════════════════════════════
  //  TRACTOR
  // ═══════════════════════════════════════════════════════════════════════
  const tractorX = CX + 12
  const tractorZ = CZ + 5
  const tractorGroup = new THREE.Group()
  tractorGroup.position.set(tractorX, 0, tractorZ)
  tractorGroup.rotation.y = -0.4

  // Main body
  const tractorBody = shadow(new THREE.Mesh(
    new THREE.BoxGeometry(1.2, 0.8, 2.0), mat(0x2d7a2d)
  ))
  tractorBody.position.y = 0.8
  tractorGroup.add(tractorBody)

  // Engine hood
  const hood = shadow(new THREE.Mesh(
    new THREE.BoxGeometry(0.9, 0.5, 1.0), mat(0x2d7a2d)
  ))
  hood.position.set(0, 0.65, 1.2)
  tractorGroup.add(hood)

  // Cab
  const cab = shadow(new THREE.Mesh(
    new THREE.BoxGeometry(1.0, 0.7, 0.9), mat(0x348a34)
  ))
  cab.position.set(0, 1.55, -0.2)
  tractorGroup.add(cab)

  // Cab window (front)
  const cabWindow = shadow(new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 0.4, 0.05), mat(0x8ec8f0)
  ))
  cabWindow.position.set(0, 1.6, 0.25)
  tractorGroup.add(cabWindow)

  // Cab roof
  const cabRoof = shadow(new THREE.Mesh(
    new THREE.BoxGeometry(1.1, 0.08, 1.1), mat(0x2a6a2a)
  ))
  cabRoof.position.set(0, 1.94, -0.2)
  tractorGroup.add(cabRoof)

  // Exhaust pipe
  const exhaust = shadow(new THREE.Mesh(
    new THREE.CylinderGeometry(0.04, 0.04, 0.8, 4), mat(DARK_GRAY)
  ))
  exhaust.position.set(0.35, 1.4, 0.9)
  tractorGroup.add(exhaust)

  // Wheels (4) — rear bigger
  const wheelMat = mat(0x222222)
  // Rear wheels (big)
  for (let side = -1; side <= 1; side += 2) {
    const rearWheel = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.45, 0.45, 0.2, 8), wheelMat
    ))
    rearWheel.rotation.z = Math.PI / 2
    rearWheel.position.set(side * 0.7, 0.45, -0.5)
    tractorGroup.add(rearWheel)

    // Hub
    const rHub = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.12, 0.22, 6), mat(0xcccc44)
    ))
    rHub.rotation.z = Math.PI / 2
    rHub.position.set(side * 0.7, 0.45, -0.5)
    tractorGroup.add(rHub)
  }
  // Front wheels (smaller)
  for (let side = -1; side <= 1; side += 2) {
    const frontWheel = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.3, 0.15, 8), wheelMat
    ))
    frontWheel.rotation.z = Math.PI / 2
    frontWheel.position.set(side * 0.55, 0.3, 1.2)
    tractorGroup.add(frontWheel)

    const fHub = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 0.17, 6), mat(0xcccc44)
    ))
    fHub.rotation.z = Math.PI / 2
    fHub.position.set(side * 0.55, 0.3, 1.2)
    tractorGroup.add(fHub)
  }

  // Steering wheel (tiny torus)
  const steeringWheel = shadow(new THREE.Mesh(
    new THREE.TorusGeometry(0.08, 0.015, 4, 8), mat(BLACK)
  ))
  steeringWheel.position.set(0, 1.35, 0.15)
  steeringWheel.rotation.x = -0.5
  tractorGroup.add(steeringWheel)

  group.add(tractorGroup)

  // Tractor FIXED collider
  {
    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(tractorX, 0.8, tractorZ)
    const body = world.createRigidBody(bd)
    const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, -0.4, 0))
    body.setRotation({ x: q.x, y: q.y, z: q.z, w: q.w })
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(0.7, 0.8, 1.2).setFriction(0.5),
      body
    )
  }

  // ═══════════════════════════════════════════════════════════════════════
  //  WATER TROUGH
  // ═══════════════════════════════════════════════════════════════════════
  {
    const wtX = penCX + 5
    const wtZ = penCZ - 4
    // Outer box
    const trough = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.35, 1.2), mat(WOOD)
    ))
    trough.position.set(wtX, 0.18, wtZ)
    group.add(trough)
    // Water inside
    const water = new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 0.1, 1.1), mat(0x4488cc, { transparent: true, opacity: 0.6 })
    )
    water.position.set(wtX, 0.32, wtZ)
    group.add(water)
  }

  // ═══════════════════════════════════════════════════════════════════════
  //  SCARECROW
  // ═══════════════════════════════════════════════════════════════════════
  {
    const scX = CX - 10
    const scZ = CZ - 8
    const scGroup = new THREE.Group()
    scGroup.position.set(scX, 0, scZ)

    // Pole
    const pole = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.05, 2.5, 4), mat(WOOD)
    ))
    pole.position.y = 1.25
    scGroup.add(pole)

    // Cross arms
    const crossArm = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.03, 0.03, 1.6, 4), mat(WOOD)
    ))
    crossArm.rotation.z = Math.PI / 2
    crossArm.position.y = 1.8
    scGroup.add(crossArm)

    // Body (cylinder shirt)
    const shirt = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.2, 0.25, 0.8, 6), mat(0x3366aa)
    ))
    shirt.position.y = 1.2
    scGroup.add(shirt)

    // Head (sphere)
    const head = shadow(new THREE.Mesh(
      new THREE.SphereGeometry(0.2, 6, 5), mat(0xe8c89a)
    ))
    head.position.y = 2.2
    scGroup.add(head)

    // Hat (cone)
    const hat = shadow(new THREE.Mesh(
      new THREE.ConeGeometry(0.25, 0.35, 6), mat(0x5a3a1a)
    ))
    hat.position.y = 2.55
    scGroup.add(hat)

    // Hat brim
    const brim = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.3, 0.04, 6), mat(0x5a3a1a)
    ))
    brim.position.y = 2.38
    scGroup.add(brim)

    // Eyes (small black spheres)
    for (let side = -1; side <= 1; side += 2) {
      const eye = shadow(new THREE.Mesh(
        new THREE.SphereGeometry(0.025, 4, 3), mat(BLACK)
      ))
      eye.position.set(side * 0.07, 2.22, 0.18)
      scGroup.add(eye)
    }

    // Straw bits hanging from sleeves
    for (let side = -1; side <= 1; side += 2) {
      for (let s = 0; s < 3; s++) {
        const straw = shadow(new THREE.Mesh(
          new THREE.CylinderGeometry(0.01, 0.01, 0.15, 3), mat(HAY_GOLD)
        ))
        straw.position.set(side * 0.8, 1.7 + s * 0.04, 0)
        straw.rotation.z = side * 0.8 + s * 0.2
        scGroup.add(straw)
      }
    }

    group.add(scGroup)
  }

  // ═══════════════════════════════════════════════════════════════════════
  //  WELL WITH ROOF
  // ═══════════════════════════════════════════════════════════════════════
  {
    const wellX = CX + 3
    const wellZ = CZ + 10
    const wellGroup = new THREE.Group()
    wellGroup.position.set(wellX, 0, wellZ)

    // Stone wall (cylinder)
    const wellWall = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.7, 0.8, 0.8, 10), mat(STONE)
    ))
    wellWall.position.y = 0.4
    wellGroup.add(wellWall)

    // Inner dark (water hole)
    const wellInner = new THREE.Mesh(
      new THREE.CylinderGeometry(0.55, 0.55, 0.1, 8), mat(0x1a2a3a)
    )
    wellInner.position.y = 0.8
    wellGroup.add(wellInner)

    // Support posts (2)
    for (let side = -1; side <= 1; side += 2) {
      const wPost = shadow(new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.05, 1.8, 4), mat(WOOD)
      ))
      wPost.position.set(side * 0.55, 1.3, 0)
      wellGroup.add(wPost)
    }

    // Crossbeam
    const crossbeam = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 1.2, 4), mat(WOOD)
    ))
    crossbeam.rotation.z = Math.PI / 2
    crossbeam.position.y = 2.2
    wellGroup.add(crossbeam)

    // Roof
    for (let side = -1; side <= 1; side += 2) {
      const roofPanel = shadow(new THREE.Mesh(
        new THREE.BoxGeometry(1.0, 0.06, 0.8), mat(0x6b4226)
      ))
      roofPanel.position.set(side * 0.35, 2.45, 0)
      roofPanel.rotation.z = side * -0.4
      wellGroup.add(roofPanel)
    }

    // Rope
    const rope = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.015, 0.015, 1.2, 3), mat(0xc4a35a)
    ))
    rope.position.set(0, 1.4, 0)
    wellGroup.add(rope)

    // Bucket at bottom of rope
    const bucket = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.06, 0.12, 5), mat(WOOD_DARK)
    ))
    bucket.position.set(0, 0.85, 0)
    wellGroup.add(bucket)

    group.add(wellGroup)

    // Well collider
    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(wellX, 0.4, wellZ)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cylinder(0.4, 0.8).setFriction(0.5),
      body
    )
  }

  // ═══════════════════════════════════════════════════════════════════════
  //  WAGON
  // ═══════════════════════════════════════════════════════════════════════
  {
    const wgX = CX + 5
    const wgZ = CZ - 12
    const wagonGroup = new THREE.Group()
    wagonGroup.position.set(wgX, 0, wgZ)
    wagonGroup.rotation.y = 0.5

    // Bed
    const bed = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 0.1, 2.0), mat(WOOD)
    ))
    bed.position.y = 0.5
    wagonGroup.add(bed)

    // Side walls
    for (let side = -1; side <= 1; side += 2) {
      const sideW = shadow(new THREE.Mesh(
        new THREE.BoxGeometry(0.06, 0.3, 2.0), mat(WOOD)
      ))
      sideW.position.set(side * 0.57, 0.65, 0)
      wagonGroup.add(sideW)
    }
    // Front/back walls
    for (let fb = -1; fb <= 1; fb += 2) {
      const fbW = shadow(new THREE.Mesh(
        new THREE.BoxGeometry(1.2, 0.3, 0.06), mat(WOOD)
      ))
      fbW.position.set(0, 0.65, fb * 0.97)
      wagonGroup.add(fbW)
    }

    // Wheels (4)
    for (let wx = -1; wx <= 1; wx += 2) {
      for (let wz = -1; wz <= 1; wz += 2) {
        const wheel = shadow(new THREE.Mesh(
          new THREE.CylinderGeometry(0.25, 0.25, 0.06, 8), mat(WOOD_DARK)
        ))
        wheel.rotation.z = Math.PI / 2
        wheel.position.set(wx * 0.65, 0.25, wz * 0.65)
        wagonGroup.add(wheel)

        // Spokes (cross)
        const spoke1 = shadow(new THREE.Mesh(
          new THREE.BoxGeometry(0.04, 0.4, 0.02), mat(WOOD)
        ))
        spoke1.rotation.z = Math.PI / 2
        spoke1.position.copy(wheel.position)
        wagonGroup.add(spoke1)
      }
    }

    // Tongue/handle
    const tongue = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.03, 0.03, 1.2, 4), mat(WOOD)
    ))
    tongue.rotation.x = Math.PI / 2
    tongue.position.set(0, 0.35, 1.55)
    tongue.rotation.z = 0.15
    wagonGroup.add(tongue)

    // Hay in wagon
    const wagonHay = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(1.0, 0.3, 1.6), mat(HAY_GOLD)
    ))
    wagonHay.position.y = 0.7
    wagonGroup.add(wagonHay)

    group.add(wagonGroup)
  }

  // ═══════════════════════════════════════════════════════════════════════
  //  APPLE TREES (2)
  // ═══════════════════════════════════════════════════════════════════════
  const appleTreePositions = [
    [CX + 14, CZ - 3],
    [CX + 12, CZ + 12],
  ]
  for (const [atx, atz] of appleTreePositions) {
    const treeGroup = new THREE.Group()
    treeGroup.position.set(atx, 0, atz)

    // Trunk
    const trunk = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.15, 0.2, 2.0, 6), mat(WOOD_DARK)
    ))
    trunk.position.y = 1.0
    treeGroup.add(trunk)

    // Round canopy (cluster of spheres)
    const canopyColors = [GREEN, 0x3a8a2e, DARK_GREEN]
    for (let c = 0; c < 4; c++) {
      const angle = (c / 4) * Math.PI * 2
      const canopy = shadow(new THREE.Mesh(
        new THREE.SphereGeometry(0.7 + Math.random() * 0.2, 6, 5),
        mat(canopyColors[c % canopyColors.length])
      ))
      canopy.position.set(
        Math.cos(angle) * 0.35,
        2.3 + Math.random() * 0.2,
        Math.sin(angle) * 0.35
      )
      treeGroup.add(canopy)
    }
    // Central top
    const topCanopy = shadow(new THREE.Mesh(
      new THREE.SphereGeometry(0.6, 6, 5), mat(0x3a8a2e)
    ))
    topCanopy.position.y = 2.8
    treeGroup.add(topCanopy)

    // Red apples (small spheres)
    const appleMat = mat(0xcc2222)
    for (let a = 0; a < 5; a++) {
      const aAngle = Math.random() * Math.PI * 2
      const aRadius = 0.3 + Math.random() * 0.5
      const apple = shadow(new THREE.Mesh(
        new THREE.SphereGeometry(0.06, 5, 4), appleMat
      ))
      apple.position.set(
        Math.cos(aAngle) * aRadius,
        2.0 + Math.random() * 0.6,
        Math.sin(aAngle) * aRadius
      )
      treeGroup.add(apple)
    }

    group.add(treeGroup)

    // Tree collider
    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(atx, 1.5, atz)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cylinder(1.5, 0.25).setFriction(0.5),
      body
    )
  }

  // ═══════════════════════════════════════════════════════════════════════
  //  STATIC MILK CHURNS (decoration near barn)
  // ═══════════════════════════════════════════════════════════════════════
  const staticChurnPositions = [
    [barnX + 3.2, barnZ + 3.5],
    [barnX + 3.8, barnZ + 3.2],
  ]
  for (const [mcx, mcz] of staticChurnPositions) {
    const churnGroup = new THREE.Group()
    churnGroup.position.set(mcx, 0, mcz)

    const churnBody = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.15, 0.5, 6), mat(0xc0c0c0)
    ))
    churnBody.position.y = 0.25
    churnGroup.add(churnBody)

    const churnLid = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.12, 0.06, 6), mat(0xa0a0a0)
    ))
    churnLid.position.y = 0.53
    churnGroup.add(churnLid)

    // Handle
    const handle = shadow(new THREE.Mesh(
      new THREE.TorusGeometry(0.06, 0.015, 4, 8, Math.PI), mat(0x888888)
    ))
    handle.position.y = 0.58
    churnGroup.add(handle)

    group.add(churnGroup)
  }

  // ═══════════════════════════════════════════════════════════════════════
  //  DYNAMIC OBJECTS
  // ═══════════════════════════════════════════════════════════════════════

  // ── Hay bales (6 DYNAMIC cylinders on side) ──────────────────────────
  const hayBalePositions = [
    [CX + 0,  0.4, CZ - 14],
    [CX + 1.2, 0.4, CZ - 14],
    [CX + 0.6, 1.1, CZ - 14],
    [CX - 8,  0.4, CZ - 12],
    [CX - 7,  0.4, CZ - 12.5],
    [CX + 8,  0.4, CZ + 14],
  ]
  for (const [hx, hy, hz] of hayBalePositions) {
    const hayGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.6, 8)
    const hayMesh = shadow(new THREE.Mesh(hayGeo, mat(HAY_GOLD)))
    hayMesh.position.set(hx, hy, hz)
    group.add(hayMesh)

    // Cylinder on its side: rotate 90 deg around Z for Rapier
    const bd = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(hx, hy, hz)
      .setLinearDamping(0.6)
      .setAngularDamping(0.5)
    // Rotate body so cylinder is on its side (rolls forward/back)
    const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, Math.PI / 2))
    bd.setRotation({ x: q.x, y: q.y, z: q.z, w: q.w })
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cylinder(0.3, 0.4)
        .setDensity(3.0)
        .setFriction(0.5)
        .setRestitution(0.15),
      body
    )
    syncList.push({ mesh: hayMesh, body })
  }

  // ── Milk churns (3 DYNAMIC) ──────────────────────────────────────────
  const dynChurnPositions = [
    [barnX - 3.5, 0.25, barnZ + 3],
    [barnX - 3.0, 0.25, barnZ + 3.5],
    [barnX - 3.8, 0.25, barnZ + 4],
  ]
  for (const [mcx, mcy, mcz] of dynChurnPositions) {
    const churnMesh = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.15, 0.5, 6), mat(0xc0c0c0)
    ))
    churnMesh.position.set(mcx, mcy, mcz)
    group.add(churnMesh)

    // Lid on mesh
    const lid = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.12, 0.06, 6), mat(0xa0a0a0)
    ))
    lid.position.y = 0.28
    churnMesh.add(lid)

    const bd = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(mcx, mcy, mcz)
      .setLinearDamping(0.4)
      .setAngularDamping(0.5)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cylinder(0.25, 0.15)
        .setDensity(5.0)
        .setFriction(0.4)
        .setRestitution(0.1),
      body
    )
    syncList.push({ mesh: churnMesh, body })
  }

  // ── Pumpkins (3 DYNAMIC orange spheres) ──────────────────────────────
  const pumpkinPositions = [
    [CX - 12, 0.2, CZ + 8],
    [CX - 11, 0.2, CZ + 9],
    [CX - 12.5, 0.2, CZ + 9.5],
  ]
  for (const [px, py, pz] of pumpkinPositions) {
    const pumpGeo = new THREE.SphereGeometry(0.2, 7, 5)
    const pumpMesh = shadow(new THREE.Mesh(pumpGeo, mat(0xe87420)))
    pumpMesh.scale.set(1, 0.8, 1)
    pumpMesh.position.set(px, py, pz)
    group.add(pumpMesh)

    // Stem
    const stem = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.025, 0.08, 3), mat(0x3a6a1a)
    ))
    stem.position.y = 0.18
    pumpMesh.add(stem)

    const bd = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(px, py, pz)
      .setLinearDamping(0.3)
      .setAngularDamping(0.3)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.ball(0.2)
        .setDensity(3.0)
        .setFriction(0.4)
        .setRestitution(0.3),
      body
    )
    syncList.push({ mesh: pumpMesh, body })
  }

  // ═══════════════════════════════════════════════════════════════════════
  //  EXTRA PROPS
  // ═══════════════════════════════════════════════════════════════════════

  // ── Dirt path from gate to barn ──────────────────────────────────────
  {
    const pathGeo = new THREE.PlaneGeometry(2.0, 12)
    const path = new THREE.Mesh(pathGeo, mat(0x8a7a5e))
    path.rotation.x = -Math.PI / 2
    path.position.set(CX - 4, 0.016, CZ - 1)
    path.receiveShadow = true
    group.add(path)
  }

  // ── Wooden fence gate posts (decorative at pen opening) ──────────────
  for (let side = -1; side <= 1; side += 2) {
    const gatePost = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.1, 1.4, 5), mat(WOOD_DARK)
    ))
    gatePost.position.set(penCX + side * 1.5, 0.7, gateZ)
    group.add(gatePost)

    // Post cap
    const cap = shadow(new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 5, 4), mat(WOOD_DARK)
    ))
    cap.position.set(penCX + side * 1.5, 1.4, gateZ)
    group.add(cap)
  }

  // ── Flower pots near barn door ───────────────────────────────────────
  for (let side = -1; side <= 1; side += 2) {
    const potX = barnX + side * 1.5
    const potZ = barnZ + 4.2
    const pot = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.1, 0.18, 6), mat(0xaa5522)
    ))
    pot.position.set(potX, 0.09, potZ)
    group.add(pot)

    // Flowers
    const flower = shadow(new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 5, 4), mat(side > 0 ? 0xff4466 : 0xffcc33)
    ))
    flower.position.set(potX, 0.24, potZ)
    group.add(flower)
    const fLeaf = shadow(new THREE.Mesh(
      new THREE.SphereGeometry(0.06, 4, 3), mat(GREEN)
    ))
    fLeaf.position.set(potX + 0.05, 0.18, potZ)
    group.add(fLeaf)
  }

  // ── Wooden sign ──────────────────────────────────────────────────────
  {
    const signPost = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 1.2, 4), mat(WOOD)
    ))
    signPost.position.set(CX + 15, 0.6, CZ)
    group.add(signPost)

    const signBoard = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 0.5, 0.06), mat(WOOD_DARK)
    ))
    signBoard.position.set(CX + 15, 1.1, CZ)
    group.add(signBoard)
  }

  // ── Wooden barrel near barn ──────────────────────────────────────────
  {
    const barrel = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.25, 0.28, 0.6, 8), mat(0x7a4a1a)
    ))
    barrel.position.set(barnX - 3.5, 0.3, barnZ - 2)
    group.add(barrel)

    // Barrel bands
    for (let b = 0; b < 2; b++) {
      const band = shadow(new THREE.Mesh(
        new THREE.CylinderGeometry(0.27, 0.3, 0.04, 8), mat(DARK_GRAY)
      ))
      band.position.set(barnX - 3.5, 0.12 + b * 0.35, barnZ - 2)
      group.add(band)
    }
  }

  // ── Hay fork leaning on barn wall ────────────────────────────────────
  {
    const forkHandle = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.02, 1.8, 4), mat(WOOD)
    ))
    forkHandle.position.set(barnX + 3.05, 0.9, barnZ + 2)
    forkHandle.rotation.z = -0.15
    group.add(forkHandle)
  }

  // ── Small pond ───────────────────────────────────────────────────────
  {
    const pondGeo = new THREE.CircleGeometry(1.5, 10)
    const pond = new THREE.Mesh(pondGeo, mat(0x3388aa, {
      transparent: true,
      opacity: 0.5,
    }))
    pond.rotation.x = -Math.PI / 2
    pond.position.set(CX + 8, 0.02, CZ + 10)
    pond.receiveShadow = true
    group.add(pond)

    // Reeds around pond
    for (let r = 0; r < 6; r++) {
      const angle = (r / 6) * Math.PI * 2
      const reed = shadow(new THREE.Mesh(
        new THREE.CylinderGeometry(0.015, 0.015, 0.6 + Math.random() * 0.3, 3),
        mat(0x4a7a2a)
      ))
      reed.position.set(
        CX + 8 + Math.cos(angle) * 1.4,
        0.3,
        CZ + 10 + Math.sin(angle) * 1.4
      )
      group.add(reed)
    }
  }

  // ── Mushrooms (tiny details) ─────────────────────────────────────────
  const mushroomPositions = [
    [CX - 6, CZ - 14], [CX + 10, CZ + 8], [CX - 12, CZ + 13],
  ]
  for (const [mx, mz] of mushroomPositions) {
    const mStem = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.025, 0.03, 0.08, 4), mat(CREAM)
    ))
    mStem.position.set(mx, 0.04, mz)
    group.add(mStem)
    const mCap = shadow(new THREE.Mesh(
      new THREE.SphereGeometry(0.05, 5, 3, 0, Math.PI * 2, 0, Math.PI / 2), mat(0xcc3322)
    ))
    mCap.position.set(mx, 0.09, mz)
    group.add(mCap)
  }

  // ── Rocks scattered around ───────────────────────────────────────────
  const rockPositions = [
    [CX - 16, CZ - 10], [CX + 16, CZ + 6], [CX + 2, CZ + 16],
    [CX - 18, CZ + 8], [CX + 14, CZ - 14],
  ]
  for (const [rx, rz] of rockPositions) {
    const size = 0.15 + Math.random() * 0.2
    const rock = shadow(new THREE.Mesh(
      new THREE.SphereGeometry(size, 5, 4), mat(STONE)
    ))
    rock.scale.set(1, 0.6, 0.9)
    rock.position.set(rx, size * 0.2, rz)
    rock.rotation.set(Math.random(), Math.random(), Math.random())
    group.add(rock)
  }

  // ── Sunflowers (tall, cheerful) ──────────────────────────────────────
  const sunflowerPositions = [
    [CX + 16, CZ - 8], [CX + 17, CZ - 7], [CX + 15.5, CZ - 9],
  ]
  for (const [sfx, sfz] of sunflowerPositions) {
    // Stem
    const sfStem = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.025, 0.03, 1.5, 4), mat(0x3a6a1a)
    ))
    sfStem.position.set(sfx, 0.75, sfz)
    group.add(sfStem)

    // Flower head (yellow disc)
    const sfHead = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.2, 0.2, 0.05, 8), mat(0xffcc00)
    ))
    sfHead.position.set(sfx, 1.55, sfz)
    sfHead.rotation.x = -0.2
    group.add(sfHead)

    // Center (brown)
    const sfCenter = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.1, 0.06, 6), mat(0x5a3a1a)
    ))
    sfCenter.position.set(sfx, 1.56, sfz + 0.02)
    sfCenter.rotation.x = -0.2
    group.add(sfCenter)

    // Leaves
    for (let l = 0; l < 2; l++) {
      const sfLeaf = shadow(new THREE.Mesh(
        new THREE.PlaneGeometry(0.3, 0.12), mat(GREEN, { side: THREE.DoubleSide })
      ))
      sfLeaf.position.set(sfx + 0.1, 0.5 + l * 0.4, sfz)
      sfLeaf.rotation.z = 0.5 - l * 0.3
      sfLeaf.rotation.y = l * 0.8
      group.add(sfLeaf)
    }
  }

  // ── Bird bath ────────────────────────────────────────────────────────
  {
    const bbX = CX + 5
    const bbZ = CZ + 5
    // Pedestal
    const pedestal = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.18, 0.8, 6), mat(STONE)
    ))
    pedestal.position.set(bbX, 0.4, bbZ)
    group.add(pedestal)
    // Basin
    const basin = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.35, 0.2, 0.12, 8), mat(STONE)
    ))
    basin.position.set(bbX, 0.82, bbZ)
    group.add(basin)
    // Water in basin
    const basinWater = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.3, 0.03, 8),
      mat(0x4488cc, { transparent: true, opacity: 0.5 })
    )
    basinWater.position.set(bbX, 0.87, bbZ)
    group.add(basinWater)
  }

  // ── Wheelbarrow ──────────────────────────────────────────────────────
  {
    const wbX = CX - 8
    const wbZ = CZ + 14
    const wbGroup = new THREE.Group()
    wbGroup.position.set(wbX, 0, wbZ)
    wbGroup.rotation.y = 1.2

    // Tray
    const tray = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.25, 0.8), mat(0x666666)
    ))
    tray.position.set(0, 0.35, 0)
    wbGroup.add(tray)

    // Wheel
    const wbWheel = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.15, 0.15, 0.06, 6), mat(BLACK)
    ))
    wbWheel.rotation.z = Math.PI / 2
    wbWheel.position.set(0, 0.15, 0.55)
    wbGroup.add(wbWheel)

    // Handles (2)
    for (let side = -1; side <= 1; side += 2) {
      const handleBar = shadow(new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.02, 0.8, 4), mat(WOOD)
      ))
      handleBar.rotation.x = Math.PI / 2
      handleBar.position.set(side * 0.22, 0.35, -0.55)
      wbGroup.add(handleBar)
    }

    // Dirt/soil in wheelbarrow
    const soil = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 0.12, 0.7), mat(0x5a4a2e)
    ))
    soil.position.set(0, 0.5, 0)
    wbGroup.add(soil)

    group.add(wbGroup)
  }

  // ── Clothesline ──────────────────────────────────────────────────────
  {
    const clX = CX - 2
    const clZ = CZ + 14
    // Posts
    for (let side = -1; side <= 1; side += 2) {
      const clPost = shadow(new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 2.0, 4), mat(WOOD)
      ))
      clPost.position.set(clX + side * 2, 1.0, clZ)
      group.add(clPost)
    }
    // Line
    const line = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(4, 0.01, 0.01), mat(0xcccccc)
    ))
    line.position.set(clX, 1.95, clZ)
    group.add(line)

    // Clothes (colored rectangles hanging)
    const clothColors = [0xff4466, 0x4488ff, 0xffcc33, 0x44cc66]
    for (let c = 0; c < 4; c++) {
      const cloth = new THREE.Mesh(
        new THREE.PlaneGeometry(0.4, 0.5),
        mat(clothColors[c], { side: THREE.DoubleSide })
      )
      cloth.position.set(clX - 1.2 + c * 0.8, 1.7, clZ + 0.02)
      cloth.castShadow = true
      group.add(cloth)
    }
  }

  // ═══════════════════════════════════════════════════════════════════════
  //  ADD TO SCENE
  // ═══════════════════════════════════════════════════════════════════════
  scene.add(group)

  // ═══════════════════════════════════════════════════════════════════════
  //  RETURN
  // ═══════════════════════════════════════════════════════════════════════
  return {
    syncList,
    update(dt) {
      elapsedTime += dt

      // Windmill blades spin
      if (windmillBlades) {
        windmillBlades.rotation.z += dt * 0.8
      }
    },
  }
}
