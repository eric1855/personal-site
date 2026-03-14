/**
 * Farm World — Charming Countryside Farm (full 120x120 world).
 *
 * Portfolio buildings at (0,-20), (20,0), (0,20), (-20,0) become farmstead structures.
 * Windmills (2, animated), barns (3), animals (cows, sheep, chickens, pigs, horses, rooster),
 * crop fields (wheat, corn, carrots, sunflowers, pumpkin patch, hay), orchards (apple, cherry),
 * farm vehicles (tractors, wagon, plow), water features (pond, well, troughs, irrigation),
 * props (scarecrows, clothesline, beehives, barrel stacks, haystacks, dog house, bird bath,
 * wood chopping block, flower pots, grain silo, feed troughs), fencing enclosures,
 * dirt paths, and many dynamic pushable objects (hay bales, pumpkins, milk churns,
 * crates, apples, feed buckets, wheelbarrows).
 *
 * Export: createWorld(scene, RAPIER, world) => { syncList, update(dt) }
 */
import * as THREE from 'three'

// ── Helpers ──────────────────────────────────────────────────────────────
function mat(color, opts = {}) {
  return new THREE.MeshStandardMaterial({ color, flatShading: true, ...opts })
}
function s(mesh) {
  mesh.castShadow = true
  mesh.receiveShadow = true
  return mesh
}

// ── Colors ───────────────────────────────────────────────────────────────
const GROUND_GREEN = 0x4a7c59
const SKY_BLUE     = 0x87ceeb
const BARN_RED     = 0x8B0000
const HAY_GOLD     = 0xD4A234
const EARTH_BROWN  = 0x7a6a4e
const DIRT_PATH    = 0x8B7355
const WOOD         = 0x8b6914
const WOOD_DARK    = 0x5d4e37
const WHITE        = 0xffffff
const CREAM        = 0xfaf0dc
const BLACK        = 0x222222
const GRAY         = 0x888888
const DARK_GRAY    = 0x555555
const GREEN        = 0x3a7d2e
const DARK_GREEN   = 0x2d5e22
const PINK         = 0xf0a0a0
const BROWN        = 0x8b5e3c
const STONE        = 0xa0917a
const STONE_LIGHT  = 0xb8a99a
const WHEAT_GREEN  = 0x9aad3c
const CORN_GREEN   = 0x4e8a2e
const ORANGE       = 0xff8c00
const PUMPKIN_ORG  = 0xe87020
const SUNFL_YELLOW = 0xffd700
const CHERRY_PINK  = 0xf0a0b8
const APPLE_RED    = 0xcc2222
const WATER_BLUE   = 0x4a90b0
const IRON_GRAY    = 0x606060
const TRACTOR_GRN  = 0x2e7d32
const TRACTOR_RED  = 0xb71c1c
const ROPE_BROWN   = 0x8b7355

export function createWorld(scene, RAPIER, world) {
  const syncList = []
  const group = new THREE.Group()
  const windmillBlades = [] // { group, speed }

  // ── Scene setup ─────────────────────────────────────────────────────
  scene.background = new THREE.Color(SKY_BLUE)
  scene.fog = new THREE.Fog(SKY_BLUE, 40, 160)

  // ═══════════════════════════════════════════════════════════════════════
  //  GROUND — lush green + Rapier collider
  // ═══════════════════════════════════════════════════════════════════════
  const groundMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(200, 200),
    mat(GROUND_GREEN)
  )
  groundMesh.rotation.x = -Math.PI / 2
  groundMesh.receiveShadow = true
  group.add(groundMesh)

  const groundBody = world.createRigidBody(
    RAPIER.RigidBodyDesc.fixed().setTranslation(0, 0, 0)
  )
  world.createCollider(
    RAPIER.ColliderDesc.cuboid(100, 0.1, 100)
      .setTranslation(0, -0.1, 0)
      .setFriction(0.8)
      .setRestitution(0.0),
    groundBody
  )

  // ═══════════════════════════════════════════════════════════════════════
  //  BOUNDARY WALLS at +/- 60
  // ═══════════════════════════════════════════════════════════════════════
  const BOUND = 60
  const WALL_H = 4
  const WALL_T = 1
  const wallDefs = [
    { x: 0, z: -BOUND, hw: BOUND, hd: WALL_T / 2 },
    { x: 0, z:  BOUND, hw: BOUND, hd: WALL_T / 2 },
    { x: -BOUND, z: 0, hw: WALL_T / 2, hd: BOUND },
    { x:  BOUND, z: 0, hw: WALL_T / 2, hd: BOUND },
  ]
  for (const w of wallDefs) {
    // Visual — stone wall with hedge top
    const wallMesh = s(new THREE.Mesh(
      new THREE.BoxGeometry(w.hw * 2, 1.2, w.hd * 2),
      mat(0x8a8070)
    ))
    wallMesh.position.set(w.x, 0.6, w.z)
    group.add(wallMesh)

    // Hedge on top
    const hedge = s(new THREE.Mesh(
      new THREE.BoxGeometry(w.hw * 2, 0.8, w.hd * 2 + 0.3),
      mat(0x3a6e2a)
    ))
    hedge.position.set(w.x, 1.6, w.z)
    group.add(hedge)

    // Collider
    const wb = world.createRigidBody(
      RAPIER.RigidBodyDesc.fixed().setTranslation(w.x, WALL_H / 2, w.z)
    )
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(w.hw, WALL_H / 2, w.hd)
        .setFriction(0.5).setRestitution(0.0),
      wb
    )
  }

  // ═══════════════════════════════════════════════════════════════════════
  //  DIRT PATHS connecting structures
  // ═══════════════════════════════════════════════════════════════════════
  const pathMat = mat(DIRT_PATH)
  const PATH_Y = 0.02

  // Cross roads connecting the 4 portfolio buildings
  const nsPath = new THREE.Mesh(new THREE.PlaneGeometry(3.5, 50), pathMat)
  nsPath.rotation.x = -Math.PI / 2
  nsPath.position.set(0, PATH_Y, 0)
  nsPath.receiveShadow = true
  group.add(nsPath)

  const ewPath = new THREE.Mesh(new THREE.PlaneGeometry(50, 3.5), pathMat)
  ewPath.rotation.x = -Math.PI / 2
  ewPath.position.set(0, PATH_Y, 0)
  ewPath.receiveShadow = true
  group.add(ewPath)

  // Paths to outer areas
  const outerPaths = [
    { x: -30, z: 0, w: 25, d: 3 },
    { x: 30, z: 0, w: 25, d: 3 },
    { x: 0, z: -35, w: 3, d: 20 },
    { x: 0, z: 35, w: 3, d: 20 },
    // Diagonal-ish paths
    { x: 25, z: -25, w: 15, d: 2.5 },
    { x: -25, z: 25, w: 15, d: 2.5 },
    { x: -30, z: -20, w: 12, d: 2.5 },
    { x: 30, z: 20, w: 12, d: 2.5 },
  ]
  for (const p of outerPaths) {
    const path = new THREE.Mesh(new THREE.PlaneGeometry(p.w, p.d), pathMat)
    path.rotation.x = -Math.PI / 2
    path.position.set(p.x, PATH_Y, p.z)
    path.receiveShadow = true
    group.add(path)
  }

  // Stone path near farmhouse (about building at 0,-20)
  const stonePathMat = mat(0x9a9080)
  for (let i = 0; i < 12; i++) {
    const stone = new THREE.Mesh(
      new THREE.CircleGeometry(0.3 + Math.random() * 0.2, 6),
      stonePathMat
    )
    stone.rotation.x = -Math.PI / 2
    stone.position.set(
      (Math.random() - 0.5) * 2,
      PATH_Y + 0.01,
      -14 + i * 0.8
    )
    stone.receiveShadow = true
    group.add(stone)
  }

  // ═══════════════════════════════════════════════════════════════════════
  //  WINDMILL 1 — Main windmill (large, near NE)
  // ═══════════════════════════════════════════════════════════════════════
  {
    const wx = 35, wz = -30
    const towerH = 8
    const tower = s(new THREE.Mesh(
      new THREE.CylinderGeometry(1.0, 1.6, towerH, 8),
      mat(STONE)
    ))
    tower.position.set(wx, towerH / 2, wz)
    group.add(tower)

    // Conical roof
    const roof = s(new THREE.Mesh(
      new THREE.ConeGeometry(1.5, 2.0, 8),
      mat(WOOD_DARK)
    ))
    roof.position.set(wx, towerH + 1.0, wz)
    group.add(roof)

    // Door
    const door = new THREE.Mesh(
      new THREE.BoxGeometry(0.6, 1.2, 0.1),
      mat(WOOD)
    )
    door.position.set(wx, 0.6, wz + 1.6)
    group.add(door)

    // Window (circle approx)
    const win = new THREE.Mesh(
      new THREE.CircleGeometry(0.3, 6),
      mat(0x88bbdd, { transparent: true, opacity: 0.5 })
    )
    win.position.set(wx, 5.5, wz + 1.15)
    group.add(win)

    // Blade hub
    const hub = s(new THREE.Mesh(
      new THREE.CylinderGeometry(0.2, 0.2, 0.5, 6),
      mat(WOOD_DARK)
    ))
    hub.rotation.x = Math.PI / 2
    hub.position.set(wx, towerH - 0.5, wz + 1.7)
    group.add(hub)

    // Blades (4 sails)
    const bladesGroup = new THREE.Group()
    bladesGroup.position.set(wx, towerH - 0.5, wz + 1.8)

    for (let i = 0; i < 4; i++) {
      const sail = new THREE.Group()
      // Arm
      const arm = s(new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 3.5, 0.08),
        mat(WOOD)
      ))
      arm.position.y = 1.75
      sail.add(arm)
      // Cloth
      const cloth = new THREE.Mesh(
        new THREE.PlaneGeometry(0.7, 3.0),
        mat(CREAM, { side: THREE.DoubleSide })
      )
      cloth.position.set(0.4, 1.75, 0)
      sail.add(cloth)
      sail.rotation.z = (Math.PI / 2) * i
      bladesGroup.add(sail)
    }
    group.add(bladesGroup)
    windmillBlades.push({ group: bladesGroup, speed: 0.8 })

    // Fixed collider
    const wmBody = world.createRigidBody(
      RAPIER.RigidBodyDesc.fixed().setTranslation(wx, towerH / 2, wz)
    )
    world.createCollider(
      RAPIER.ColliderDesc.cylinder(towerH / 2, 1.6).setFriction(0.5),
      wmBody
    )
  }

  // ═══════════════════════════════════════════════════════════════════════
  //  WINDMILL 2 — Smaller windmill (SW area)
  // ═══════════════════════════════════════════════════════════════════════
  {
    const wx = -35, wz = 28
    const towerH = 5.5
    const tower = s(new THREE.Mesh(
      new THREE.CylinderGeometry(0.7, 1.1, towerH, 7),
      mat(STONE_LIGHT)
    ))
    tower.position.set(wx, towerH / 2, wz)
    group.add(tower)

    const roof = s(new THREE.Mesh(
      new THREE.ConeGeometry(1.1, 1.5, 7),
      mat(BROWN)
    ))
    roof.position.set(wx, towerH + 0.75, wz)
    group.add(roof)

    const door = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 1.0, 0.1),
      mat(WOOD_DARK)
    )
    door.position.set(wx, 0.5, wz + 1.1)
    group.add(door)

    // Hub
    const hub = s(new THREE.Mesh(
      new THREE.CylinderGeometry(0.15, 0.15, 0.4, 6),
      mat(WOOD_DARK)
    ))
    hub.rotation.x = Math.PI / 2
    hub.position.set(wx, towerH - 0.3, wz + 1.2)
    group.add(hub)

    // Blades
    const bladesGroup = new THREE.Group()
    bladesGroup.position.set(wx, towerH - 0.3, wz + 1.3)
    for (let i = 0; i < 4; i++) {
      const sail = new THREE.Group()
      const arm = s(new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 2.5, 0.06),
        mat(WOOD)
      ))
      arm.position.y = 1.25
      sail.add(arm)
      const cloth = new THREE.Mesh(
        new THREE.PlaneGeometry(0.5, 2.2),
        mat(WHITE, { side: THREE.DoubleSide })
      )
      cloth.position.set(0.3, 1.25, 0)
      sail.add(cloth)
      sail.rotation.z = (Math.PI / 2) * i
      bladesGroup.add(sail)
    }
    group.add(bladesGroup)
    windmillBlades.push({ group: bladesGroup, speed: 1.2 })

    const wmBody = world.createRigidBody(
      RAPIER.RigidBodyDesc.fixed().setTranslation(wx, towerH / 2, wz)
    )
    world.createCollider(
      RAPIER.ColliderDesc.cylinder(towerH / 2, 1.1).setFriction(0.5),
      wmBody
    )
  }

  // ═══════════════════════════════════════════════════════════════════════
  //  MAIN RED BARN + SILO (NW area)
  // ═══════════════════════════════════════════════════════════════════════
  {
    const bx = -35, bz = -25
    const bW = 8, bH = 5, bD = 6

    // Body
    const body = s(new THREE.Mesh(
      new THREE.BoxGeometry(bW, bH, bD),
      mat(BARN_RED)
    ))
    body.position.set(bx, bH / 2, bz)
    group.add(body)

    // Gambrel roof — two angled planes per side
    const roofMat = mat(0x6a0000)
    // Lower roof (steeper)
    for (const side of [-1, 1]) {
      const lowerRoof = s(new THREE.Mesh(
        new THREE.BoxGeometry(bD + 0.4, 3.0, 0.15),
        roofMat
      ))
      lowerRoof.position.set(bx, bH + 0.8, bz + side * 2.0)
      lowerRoof.rotation.x = side * 0.7
      lowerRoof.rotation.y = Math.PI / 2
      group.add(lowerRoof)
    }
    // Upper roof (flatter)
    for (const side of [-1, 1]) {
      const upperRoof = s(new THREE.Mesh(
        new THREE.BoxGeometry(bD + 0.4, 2.5, 0.15),
        roofMat
      ))
      upperRoof.position.set(bx, bH + 2.0, bz + side * 0.9)
      upperRoof.rotation.x = side * 0.3
      upperRoof.rotation.y = Math.PI / 2
      group.add(upperRoof)
    }

    // White X-trim on barn door
    const doorW = 2.5, doorH = 3.5
    const barnDoor = new THREE.Mesh(
      new THREE.BoxGeometry(doorW, doorH, 0.12),
      mat(WOOD_DARK)
    )
    barnDoor.position.set(bx, doorH / 2, bz + bD / 2 + 0.06)
    group.add(barnDoor)

    // X trim
    const trimMat = mat(WHITE)
    const diagLen = Math.sqrt(doorW * doorW + doorH * doorH)
    for (const angle of [0.95, -0.95]) {
      const trim = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, diagLen, 0.05),
        trimMat
      )
      trim.position.set(bx, doorH / 2, bz + bD / 2 + 0.15)
      trim.rotation.z = angle
      group.add(trim)
    }

    // Hay loft opening (above door)
    const loft = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 1.0, 0.12),
      mat(WOOD)
    )
    loft.position.set(bx, bH + 0.5, bz + bD / 2 + 0.06)
    group.add(loft)

    // Silo (tall gray cylinder + dome)
    const siloH = 8
    const silo = s(new THREE.Mesh(
      new THREE.CylinderGeometry(1.5, 1.5, siloH, 10),
      mat(GRAY)
    ))
    silo.position.set(bx + bW / 2 + 2, siloH / 2, bz)
    group.add(silo)

    const siloDome = s(new THREE.Mesh(
      new THREE.SphereGeometry(1.5, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2),
      mat(DARK_GRAY)
    ))
    siloDome.position.set(bx + bW / 2 + 2, siloH, bz)
    group.add(siloDome)

    // Silo bands
    for (let h = 1; h < siloH; h += 2) {
      const band = new THREE.Mesh(
        new THREE.TorusGeometry(1.52, 0.04, 4, 12),
        mat(IRON_GRAY)
      )
      band.rotation.x = Math.PI / 2
      band.position.set(bx + bW / 2 + 2, h, bz)
      group.add(band)
    }

    // Barn collider
    const barnBody = world.createRigidBody(
      RAPIER.RigidBodyDesc.fixed().setTranslation(bx, bH / 2, bz)
    )
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(bW / 2, bH / 2, bD / 2).setFriction(0.5),
      barnBody
    )

    // Silo collider
    const siloBody = world.createRigidBody(
      RAPIER.RigidBodyDesc.fixed().setTranslation(bx + bW / 2 + 2, siloH / 2, bz)
    )
    world.createCollider(
      RAPIER.ColliderDesc.cylinder(siloH / 2, 1.5).setFriction(0.5),
      siloBody
    )
  }

  // ═══════════════════════════════════════════════════════════════════════
  //  SMALLER BARN / STABLE (SE area)
  // ═══════════════════════════════════════════════════════════════════════
  {
    const bx = 35, bz = 20
    const bW = 5, bH = 3.5, bD = 4

    const body = s(new THREE.Mesh(
      new THREE.BoxGeometry(bW, bH, bD),
      mat(0x7a3030)
    ))
    body.position.set(bx, bH / 2, bz)
    group.add(body)

    // Simple gable roof
    const roofGeo = new THREE.BoxGeometry(bW + 0.5, 0.15, bD + 0.5)
    for (const side of [-1, 1]) {
      const rp = s(new THREE.Mesh(roofGeo, mat(WOOD_DARK)))
      rp.position.set(bx, bH + 0.6, bz + side * 0.3)
      rp.rotation.z = side * 0.3
      group.add(rp)
    }

    // Door opening
    const stallDoor = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 2.5, 0.1),
      mat(WOOD)
    )
    stallDoor.position.set(bx, 1.25, bz + bD / 2 + 0.05)
    group.add(stallDoor)

    const barnBody = world.createRigidBody(
      RAPIER.RigidBodyDesc.fixed().setTranslation(bx, bH / 2, bz)
    )
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(bW / 2, bH / 2, bD / 2).setFriction(0.5),
      barnBody
    )
  }

  // ═══════════════════════════════════════════════════════════════════════
  //  TOOL SHED (near main barn)
  // ═══════════════════════════════════════════════════════════════════════
  {
    const sx = -28, sz = -18
    const sW = 3, sH = 2.5, sD = 2.5

    const body = s(new THREE.Mesh(
      new THREE.BoxGeometry(sW, sH, sD),
      mat(WOOD)
    ))
    body.position.set(sx, sH / 2, sz)
    group.add(body)

    const roof = s(new THREE.Mesh(
      new THREE.BoxGeometry(sW + 0.4, 0.12, sD + 0.4),
      mat(WOOD_DARK)
    ))
    roof.position.set(sx, sH + 0.06, sz)
    roof.rotation.z = 0.15
    group.add(roof)

    const shedBody = world.createRigidBody(
      RAPIER.RigidBodyDesc.fixed().setTranslation(sx, sH / 2, sz)
    )
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(sW / 2, sH / 2, sD / 2).setFriction(0.5),
      shedBody
    )
  }

  // ═══════════════════════════════════════════════════════════════════════
  //  GRAIN SILO (standalone, near fields)
  // ═══════════════════════════════════════════════════════════════════════
  {
    const gx = 40, gz = -15
    const gH = 10
    const gR = 1.8
    const silo = s(new THREE.Mesh(
      new THREE.CylinderGeometry(gR, gR, gH, 10),
      mat(0xa0a0a0)
    ))
    silo.position.set(gx, gH / 2, gz)
    group.add(silo)

    const dome = s(new THREE.Mesh(
      new THREE.SphereGeometry(gR, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2),
      mat(0x808080)
    ))
    dome.position.set(gx, gH, gz)
    group.add(dome)

    for (let h = 1.5; h < gH; h += 2.5) {
      const band = new THREE.Mesh(
        new THREE.TorusGeometry(gR + 0.02, 0.05, 4, 12),
        mat(IRON_GRAY)
      )
      band.rotation.x = Math.PI / 2
      band.position.set(gx, h, gz)
      group.add(band)
    }

    const siloBody = world.createRigidBody(
      RAPIER.RigidBodyDesc.fixed().setTranslation(gx, gH / 2, gz)
    )
    world.createCollider(
      RAPIER.ColliderDesc.cylinder(gH / 2, gR).setFriction(0.5),
      siloBody
    )
  }

  // ═══════════════════════════════════════════════════════════════════════
  //  FENCING — Post and rail enclosures
  // ═══════════════════════════════════════════════════════════════════════
  const fencePostMat = mat(WOOD)
  const fenceRailMat = mat(WOOD_DARK)

  function buildFenceLine(x1, z1, x2, z2, gateCenter, gateWidth) {
    const dx = x2 - x1
    const dz = z2 - z1
    const len = Math.sqrt(dx * dx + dz * dz)
    const angle = Math.atan2(dx, dz)
    const postSpacing = 2.5
    const numPosts = Math.floor(len / postSpacing) + 1

    for (let i = 0; i < numPosts; i++) {
      const t = i / (numPosts - 1)
      const px = x1 + dx * t
      const pz = z1 + dz * t

      // Gate opening check
      if (gateCenter !== undefined) {
        const gx = x1 + dx * gateCenter
        const gz = z1 + dz * gateCenter
        const dist = Math.sqrt((px - gx) ** 2 + (pz - gz) ** 2)
        if (dist < (gateWidth || 3)) continue
      }

      // Post
      const post = s(new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.08, 1.2, 5),
        fencePostMat
      ))
      post.position.set(px, 0.6, pz)
      group.add(post)

      // Post collider
      const postBody = world.createRigidBody(
        RAPIER.RigidBodyDesc.fixed().setTranslation(px, 0.6, pz)
      )
      world.createCollider(
        RAPIER.ColliderDesc.cuboid(0.08, 0.6, 0.08).setFriction(0.3),
        postBody
      )
    }

    // Rails (2 horizontal)
    for (const ry of [0.35, 0.75]) {
      // If there's a gate, split into two segments
      if (gateCenter !== undefined) {
        const gw = gateWidth || 3
        const gt = gateCenter
        // Before gate
        const segLen1 = len * gt - gw / 2
        if (segLen1 > 0.5) {
          const midT = (gt - gw / (2 * len)) / 2
          const mx = x1 + dx * midT
          const mz = z1 + dz * midT
          const rail = s(new THREE.Mesh(
            new THREE.BoxGeometry(0.05, 0.06, segLen1),
            fenceRailMat
          ))
          rail.position.set(mx, ry, mz)
          rail.rotation.y = angle
          group.add(rail)
        }
        // After gate
        const segLen2 = len * (1 - gt) - gw / 2
        if (segLen2 > 0.5) {
          const midT = gt + gw / (2 * len) + (1 - gt - gw / (2 * len)) / 2
          const mx = x1 + dx * midT
          const mz = z1 + dz * midT
          const rail = s(new THREE.Mesh(
            new THREE.BoxGeometry(0.05, 0.06, segLen2),
            fenceRailMat
          ))
          rail.position.set(mx, ry, mz)
          rail.rotation.y = angle
          group.add(rail)
        }
      } else {
        const mx = (x1 + x2) / 2
        const mz = (z1 + z2) / 2
        const rail = s(new THREE.Mesh(
          new THREE.BoxGeometry(0.05, 0.06, len),
          fenceRailMat
        ))
        rail.position.set(mx, ry, mz)
        rail.rotation.y = angle
        group.add(rail)
      }
    }
  }

  // Enclosure 1: Cow pen (SW)
  buildFenceLine(-50, 8, -38, 8)
  buildFenceLine(-50, 18, -38, 18)
  buildFenceLine(-50, 8, -50, 18, 0.5, 3)
  buildFenceLine(-38, 8, -38, 18, 0.5, 3)

  // Enclosure 2: Sheep pen (NE)
  buildFenceLine(25, -40, 40, -40)
  buildFenceLine(25, -48, 40, -48)
  buildFenceLine(25, -40, 25, -48, 0.5, 3)
  buildFenceLine(40, -40, 40, -48, 0.5, 3)

  // Enclosure 3: Chicken yard (E)
  buildFenceLine(38, 30, 50, 30)
  buildFenceLine(38, 40, 50, 40)
  buildFenceLine(38, 30, 38, 40, 0.3, 2.5)
  buildFenceLine(50, 30, 50, 40)

  // Enclosure 4: Pig pen + horse paddock (S)
  buildFenceLine(-15, 35, -5, 35)
  buildFenceLine(-15, 45, -5, 45)
  buildFenceLine(-15, 35, -15, 45, 0.4, 3)
  buildFenceLine(-5, 35, -5, 45)

  // Field border fencing (along crop areas)
  buildFenceLine(10, -45, 22, -45)
  buildFenceLine(10, -35, 22, -35)
  buildFenceLine(10, -45, 10, -35)
  buildFenceLine(22, -45, 22, -35)

  buildFenceLine(-48, -35, -38, -35)
  buildFenceLine(-48, -45, -38, -45)
  buildFenceLine(-48, -35, -48, -45)

  // ═══════════════════════════════════════════════════════════════════════
  //  FARM ANIMALS
  // ═══════════════════════════════════════════════════════════════════════

  // -- COWS (6, in cow pen) --
  function makeCow(cx, cz, rot) {
    const cow = new THREE.Group()
    cow.position.set(cx, 0, cz)
    cow.rotation.y = rot

    // Body
    const body = s(new THREE.Mesh(
      new THREE.BoxGeometry(0.7, 0.5, 1.0),
      mat(WHITE)
    ))
    body.position.y = 0.6
    cow.add(body)

    // Spots
    const spotPositions = [[0.2, 0.7, 0.2], [-0.15, 0.65, -0.1], [0.1, 0.75, -0.3]]
    for (const [sx2, sy, sz2] of spotPositions) {
      const spot = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 0.15, 0.25),
        mat(BLACK)
      )
      spot.position.set(sx2, sy, sz2)
      cow.add(spot)
    }

    // Head
    const head = s(new THREE.Mesh(
      new THREE.BoxGeometry(0.35, 0.3, 0.3),
      mat(WHITE)
    ))
    head.position.set(0, 0.7, 0.6)
    cow.add(head)

    // Nose
    const nose = new THREE.Mesh(
      new THREE.BoxGeometry(0.2, 0.12, 0.08),
      mat(PINK)
    )
    nose.position.set(0, 0.62, 0.76)
    cow.add(nose)

    // Legs (4)
    const legGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.45, 4)
    const legMat2 = mat(WHITE)
    const legs = [[-0.22, 0.22, 0.3], [0.22, 0.22, 0.3], [-0.22, 0.22, -0.3], [0.22, 0.22, -0.3]]
    for (const [lx, ly, lz] of legs) {
      const leg = s(new THREE.Mesh(legGeo, legMat2))
      leg.position.set(lx, ly, lz)
      cow.add(leg)
    }

    // Tail
    const tail = new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.01, 0.4, 3),
      mat(BROWN)
    )
    tail.position.set(0, 0.7, -0.55)
    tail.rotation.x = 0.5
    cow.add(tail)

    group.add(cow)
  }

  const cowPositions = [
    [-47, 11, 0.3], [-44, 14, 1.2], [-42, 10, 2.5],
    [-46, 16, 0.8], [-40, 12, 1.9], [-48, 15, 3.1]
  ]
  for (const [cx, cz, r] of cowPositions) makeCow(cx, cz, r)

  // -- SHEEP (6, in sheep pen) --
  function makeSheep(sx2, sz, rot) {
    const sheep = new THREE.Group()
    sheep.position.set(sx2, 0, sz)
    sheep.rotation.y = rot

    // Fluffy body
    const body = s(new THREE.Mesh(
      new THREE.SphereGeometry(0.35, 6, 5),
      mat(CREAM)
    ))
    body.position.y = 0.5
    sheep.add(body)

    // Head
    const head = s(new THREE.Mesh(
      new THREE.BoxGeometry(0.2, 0.2, 0.25),
      mat(0x4a4a4a)
    ))
    head.position.set(0, 0.45, 0.4)
    sheep.add(head)

    // Legs (4 thin)
    const legGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.3, 3)
    const legMat2 = mat(0x4a4a4a)
    const legs = [[-0.15, 0.15, 0.15], [0.15, 0.15, 0.15], [-0.15, 0.15, -0.15], [0.15, 0.15, -0.15]]
    for (const [lx, ly, lz] of legs) {
      sheep.add(s(new THREE.Mesh(legGeo, legMat2)).position.set(lx, ly, lz) && s(new THREE.Mesh(legGeo, legMat2)))
      const leg = s(new THREE.Mesh(legGeo, legMat2))
      leg.position.set(lx, ly, lz)
      sheep.add(leg)
    }

    group.add(sheep)
  }

  const sheepPositions = [
    [28, -43, 0.5], [32, -45, 1.0], [35, -42, 2.1],
    [30, -46, 0.2], [37, -44, 1.8], [33, -47, 2.8]
  ]
  for (const [x, z, r] of sheepPositions) makeSheep(x, z, r)

  // -- CHICKENS (5, in chicken yard) --
  function makeChicken(cx, cz, rot) {
    const chicken = new THREE.Group()
    chicken.position.set(cx, 0, cz)
    chicken.rotation.y = rot

    // Body
    const body = s(new THREE.Mesh(
      new THREE.SphereGeometry(0.15, 5, 4),
      mat(BROWN)
    ))
    body.position.y = 0.25
    chicken.add(body)

    // Head
    const head = new THREE.Mesh(
      new THREE.SphereGeometry(0.08, 4, 3),
      mat(BROWN)
    )
    head.position.set(0, 0.38, 0.12)
    chicken.add(head)

    // Beak
    const beak = new THREE.Mesh(
      new THREE.ConeGeometry(0.03, 0.06, 3),
      mat(SUNFL_YELLOW)
    )
    beak.rotation.x = -Math.PI / 2
    beak.position.set(0, 0.36, 0.22)
    chicken.add(beak)

    // Comb
    const comb = new THREE.Mesh(
      new THREE.BoxGeometry(0.04, 0.06, 0.06),
      mat(0xcc0000)
    )
    comb.position.set(0, 0.44, 0.1)
    chicken.add(comb)

    // Legs
    for (const lx of [-0.06, 0.06]) {
      const leg = new THREE.Mesh(
        new THREE.CylinderGeometry(0.015, 0.015, 0.15, 3),
        mat(SUNFL_YELLOW)
      )
      leg.position.set(lx, 0.08, 0)
      chicken.add(leg)
    }

    // Tail feathers
    const tail = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, 0.1, 0.04),
      mat(0x6a4020)
    )
    tail.position.set(0, 0.3, -0.15)
    tail.rotation.x = -0.3
    chicken.add(tail)

    group.add(chicken)
  }

  const chickenPositions = [
    [41, 33, 0.4], [44, 35, 1.5], [46, 32, 2.3],
    [42, 37, 0.8], [48, 36, 3.0]
  ]
  for (const [x, z, r] of chickenPositions) makeChicken(x, z, r)

  // -- ROOSTER (1, on a fence post near chicken yard) --
  {
    const rx = 38, rz = 32
    const rooster = new THREE.Group()
    rooster.position.set(rx, 1.2, rz) // on top of fence post

    const body = s(new THREE.Mesh(
      new THREE.SphereGeometry(0.18, 5, 4),
      mat(0x8B4513)
    ))
    body.position.y = 0.18
    rooster.add(body)

    const head = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 4, 3),
      mat(0x8B4513)
    )
    head.position.set(0, 0.35, 0.1)
    rooster.add(head)

    const beak = new THREE.Mesh(
      new THREE.ConeGeometry(0.04, 0.08, 3),
      mat(SUNFL_YELLOW)
    )
    beak.rotation.x = -Math.PI / 2
    beak.position.set(0, 0.33, 0.22)
    rooster.add(beak)

    // Tall red comb
    const comb = new THREE.Mesh(
      new THREE.BoxGeometry(0.04, 0.12, 0.1),
      mat(0xcc0000)
    )
    comb.position.set(0, 0.44, 0.08)
    rooster.add(comb)

    // Tail plume
    const plume = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.2, 0.06),
      mat(0x2a4a2a)
    )
    plume.position.set(0, 0.25, -0.18)
    plume.rotation.x = -0.6
    rooster.add(plume)

    group.add(rooster)
  }

  // -- PIGS (2, in pig pen) --
  function makePig(px, pz, rot) {
    const pig = new THREE.Group()
    pig.position.set(px, 0, pz)
    pig.rotation.y = rot

    const body = s(new THREE.Mesh(
      new THREE.SphereGeometry(0.3, 6, 5),
      mat(PINK)
    ))
    body.position.y = 0.35
    pig.add(body)

    const head = s(new THREE.Mesh(
      new THREE.BoxGeometry(0.2, 0.2, 0.2),
      mat(PINK)
    ))
    head.position.set(0, 0.35, 0.35)
    pig.add(head)

    // Snout
    const snout = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.06, 0.06, 5),
      mat(0xe08080)
    )
    snout.rotation.x = Math.PI / 2
    snout.position.set(0, 0.32, 0.46)
    pig.add(snout)

    // Legs
    const legGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.2, 4)
    for (const [lx, lz] of [[-0.12, 0.12], [0.12, 0.12], [-0.12, -0.12], [0.12, -0.12]]) {
      const leg = new THREE.Mesh(legGeo, mat(PINK))
      leg.position.set(lx, 0.1, lz)
      pig.add(leg)
    }

    // Curly tail (ring)
    const tail = new THREE.Mesh(
      new THREE.TorusGeometry(0.06, 0.015, 4, 6),
      mat(PINK)
    )
    tail.position.set(0, 0.4, -0.32)
    pig.add(tail)

    // Ears
    for (const ex of [-0.08, 0.08]) {
      const ear = new THREE.Mesh(
        new THREE.BoxGeometry(0.06, 0.08, 0.02),
        mat(PINK)
      )
      ear.position.set(ex, 0.48, 0.35)
      ear.rotation.x = -0.4
      pig.add(ear)
    }

    group.add(pig)
  }

  makePig(-12, 38, 0.3)
  makePig(-9, 41, 1.8)

  // -- HORSES (2, in pig/horse pen) --
  function makeHorse(hx, hz, rot, color) {
    const horse = new THREE.Group()
    horse.position.set(hx, 0, hz)
    horse.rotation.y = rot

    // Body (taller box)
    const body = s(new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.6, 1.2),
      mat(color)
    ))
    body.position.y = 0.9
    horse.add(body)

    // Head
    const head = s(new THREE.Mesh(
      new THREE.BoxGeometry(0.25, 0.35, 0.4),
      mat(color)
    ))
    head.position.set(0, 1.1, 0.7)
    head.rotation.x = 0.3
    horse.add(head)

    // Legs (4 tall cylinders)
    const legGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.7, 4)
    for (const [lx, lz] of [[-0.15, 0.35], [0.15, 0.35], [-0.15, -0.35], [0.15, -0.35]]) {
      const leg = s(new THREE.Mesh(legGeo, mat(color)))
      leg.position.set(lx, 0.35, lz)
      horse.add(leg)
    }

    // Mane
    const mane = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, 0.3, 0.5),
      mat(BLACK)
    )
    mane.position.set(0, 1.25, 0.3)
    horse.add(mane)

    // Tail
    const tail = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.02, 0.6, 3),
      mat(BLACK)
    )
    tail.position.set(0, 0.7, -0.65)
    tail.rotation.x = 0.6
    horse.add(tail)

    group.add(horse)
  }

  makeHorse(-13, 43, 0.6, 0x8b5a2b)
  makeHorse(-8, 37, 2.2, 0x3a3a3a)

  // ═══════════════════════════════════════════════════════════════════════
  //  CROP FIELDS
  // ═══════════════════════════════════════════════════════════════════════

  // -- Wheat field --
  {
    const fx = 14, fz = -40, fw = 10, fd = 8
    const fieldGround = new THREE.Mesh(
      new THREE.PlaneGeometry(fw, fd),
      mat(0x8a7a50)
    )
    fieldGround.rotation.x = -Math.PI / 2
    fieldGround.position.set(fx, 0.015, fz)
    fieldGround.receiveShadow = true
    group.add(fieldGround)

    // Wheat stalks in rows
    const stalkMat = mat(WHEAT_GREEN)
    const topMat = mat(HAY_GOLD)
    for (let row = -fd / 2 + 0.5; row < fd / 2; row += 0.8) {
      for (let col = -fw / 2 + 0.5; col < fw / 2; col += 0.6) {
        const stalk = new THREE.Mesh(
          new THREE.CylinderGeometry(0.02, 0.02, 0.6 + Math.random() * 0.2, 3),
          stalkMat
        )
        stalk.position.set(fx + col, 0.35, fz + row)
        group.add(stalk)
        // Wheat head
        const head = new THREE.Mesh(
          new THREE.CylinderGeometry(0.035, 0.02, 0.12, 4),
          topMat
        )
        head.position.set(fx + col, 0.7 + Math.random() * 0.1, fz + row)
        group.add(head)
      }
    }
  }

  // -- Corn field --
  {
    const fx = -44, fz = -40, fw = 8, fd = 8
    const fieldGround = new THREE.Mesh(
      new THREE.PlaneGeometry(fw, fd),
      mat(0x5a6a3a)
    )
    fieldGround.rotation.x = -Math.PI / 2
    fieldGround.position.set(fx, 0.015, fz)
    fieldGround.receiveShadow = true
    group.add(fieldGround)

    const cornMat = mat(CORN_GREEN)
    const cobMat = mat(0xe8d44a)
    for (let row = -fd / 2 + 0.5; row < fd / 2; row += 1.2) {
      for (let col = -fw / 2 + 0.5; col < fw / 2; col += 0.8) {
        const stalk = new THREE.Mesh(
          new THREE.CylinderGeometry(0.03, 0.04, 1.2 + Math.random() * 0.3, 4),
          cornMat
        )
        const h = 0.7 + Math.random() * 0.15
        stalk.position.set(fx + col, h, fz + row)
        group.add(stalk)
        // Corn cob
        const cob = new THREE.Mesh(
          new THREE.BoxGeometry(0.06, 0.15, 0.06),
          cobMat
        )
        cob.position.set(fx + col + 0.05, h + 0.1, fz + row)
        group.add(cob)
      }
    }
  }

  // -- Carrot field --
  {
    const fx = -44, fz = 40, fw = 7, fd = 6
    const fieldGround = new THREE.Mesh(
      new THREE.PlaneGeometry(fw, fd),
      mat(0x6a5030)
    )
    fieldGround.rotation.x = -Math.PI / 2
    fieldGround.position.set(fx, 0.015, fz)
    fieldGround.receiveShadow = true
    group.add(fieldGround)

    for (let row = -fd / 2 + 0.4; row < fd / 2; row += 0.9) {
      for (let col = -fw / 2 + 0.4; col < fw / 2; col += 0.7) {
        // Green top
        const top = new THREE.Mesh(
          new THREE.ConeGeometry(0.08, 0.2, 4),
          mat(GREEN)
        )
        top.position.set(fx + col, 0.12, fz + row)
        group.add(top)
      }
    }
  }

  // -- Sunflower field --
  {
    const fx = 40, fz = 40, fw = 8, fd = 8
    const fieldGround = new THREE.Mesh(
      new THREE.PlaneGeometry(fw, fd),
      mat(0x5a7a3a)
    )
    fieldGround.rotation.x = -Math.PI / 2
    fieldGround.position.set(fx, 0.015, fz)
    fieldGround.receiveShadow = true
    group.add(fieldGround)

    const stemMat = mat(CORN_GREEN)
    for (let row = -fd / 2 + 0.8; row < fd / 2; row += 1.5) {
      for (let col = -fw / 2 + 0.8; col < fw / 2; col += 1.2) {
        // Stem
        const stemH = 1.5 + Math.random() * 0.5
        const stem = new THREE.Mesh(
          new THREE.CylinderGeometry(0.03, 0.04, stemH, 4),
          stemMat
        )
        stem.position.set(fx + col, stemH / 2, fz + row)
        group.add(stem)

        // Flower disc (brown center)
        const disc = new THREE.Mesh(
          new THREE.CircleGeometry(0.15, 8),
          mat(BROWN)
        )
        disc.position.set(fx + col, stemH + 0.05, fz + row)
        group.add(disc)

        // Petals ring
        const petals = new THREE.Mesh(
          new THREE.RingGeometry(0.12, 0.28, 10),
          mat(SUNFL_YELLOW, { side: THREE.DoubleSide })
        )
        petals.position.set(fx + col, stemH + 0.04, fz + row)
        group.add(petals)

        // Leaf
        const leaf = new THREE.Mesh(
          new THREE.BoxGeometry(0.2, 0.12, 0.02),
          stemMat
        )
        leaf.position.set(fx + col + 0.12, stemH * 0.5, fz + row)
        leaf.rotation.z = -0.4
        group.add(leaf)
      }
    }
  }

  // -- Pumpkin patch --
  {
    const fx = 30, fz = -45, fw = 8, fd = 6
    const fieldGround = new THREE.Mesh(
      new THREE.PlaneGeometry(fw, fd),
      mat(0x4a6a30)
    )
    fieldGround.rotation.x = -Math.PI / 2
    fieldGround.position.set(fx, 0.015, fz)
    fieldGround.receiveShadow = true
    group.add(fieldGround)

    // Static pumpkins (decorative, not pushable)
    for (let i = 0; i < 8; i++) {
      const px = fx + (Math.random() - 0.5) * (fw - 1)
      const pz = fz + (Math.random() - 0.5) * (fd - 1)
      const pumpkin = s(new THREE.Mesh(
        new THREE.SphereGeometry(0.2 + Math.random() * 0.1, 6, 5),
        mat(PUMPKIN_ORG)
      ))
      pumpkin.position.set(px, 0.15, pz)
      pumpkin.scale.y = 0.7
      group.add(pumpkin)
      // Stem
      const stem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.02, 0.08, 3),
        mat(GREEN)
      )
      stem.position.set(px, 0.28, pz)
      group.add(stem)
    }

    // Vines
    for (let i = 0; i < 5; i++) {
      const vine = new THREE.Mesh(
        new THREE.BoxGeometry(2 + Math.random(), 0.02, 0.04),
        mat(GREEN)
      )
      vine.position.set(fx + (Math.random() - 0.5) * fw, 0.02, fz + (Math.random() - 0.5) * fd)
      vine.rotation.y = Math.random() * Math.PI
      group.add(vine)
    }
  }

  // -- Hay field --
  {
    const fx = -20, fz = -45, fw = 10, fd = 8
    const fieldGround = new THREE.Mesh(
      new THREE.PlaneGeometry(fw, fd),
      mat(0xb8a040)
    )
    fieldGround.rotation.x = -Math.PI / 2
    fieldGround.position.set(fx, 0.015, fz)
    fieldGround.receiveShadow = true
    group.add(fieldGround)
  }

  // ═══════════════════════════════════════════════════════════════════════
  //  ORCHARDS
  // ═══════════════════════════════════════════════════════════════════════

  // -- Apple orchard (neat rows) --
  {
    const ox = 45, oz = 0
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const tx = ox + col * 3.5 - 3.5
        const tz = oz + row * 3.5 - 3.5
        const tree = new THREE.Group()
        tree.position.set(tx, 0, tz)

        // Trunk
        const trunk = s(new THREE.Mesh(
          new THREE.CylinderGeometry(0.1, 0.15, 1.5, 5),
          mat(0x6b4c2a)
        ))
        trunk.position.y = 0.75
        tree.add(trunk)

        // Round canopy
        const canopy = s(new THREE.Mesh(
          new THREE.SphereGeometry(1.0, 7, 5),
          mat(GREEN)
        ))
        canopy.position.y = 2.2
        tree.add(canopy)

        // Red apples
        for (let a = 0; a < 4; a++) {
          const apple = new THREE.Mesh(
            new THREE.SphereGeometry(0.07, 4, 3),
            mat(APPLE_RED)
          )
          apple.position.set(
            (Math.random() - 0.5) * 1.2,
            1.6 + Math.random() * 0.8,
            (Math.random() - 0.5) * 1.2
          )
          tree.add(apple)
        }

        group.add(tree)
      }
    }
  }

  // -- Cherry orchard --
  {
    const ox = -50, oz = -10
    for (let row = 0; row < 2; row++) {
      for (let col = 0; col < 3; col++) {
        const tx = ox + col * 3 - 3
        const tz = oz + row * 3 - 1.5
        const tree = new THREE.Group()
        tree.position.set(tx, 0, tz)

        const trunk = s(new THREE.Mesh(
          new THREE.CylinderGeometry(0.08, 0.12, 1.3, 5),
          mat(0x6b4c2a)
        ))
        trunk.position.y = 0.65
        tree.add(trunk)

        const canopy = s(new THREE.Mesh(
          new THREE.SphereGeometry(0.9, 7, 5),
          mat(CHERRY_PINK)
        ))
        canopy.position.y = 1.9
        tree.add(canopy)

        // Cherry clusters
        for (let c = 0; c < 5; c++) {
          const cherry = new THREE.Mesh(
            new THREE.SphereGeometry(0.05, 4, 3),
            mat(0xcc2255)
          )
          cherry.position.set(
            (Math.random() - 0.5) * 1.0,
            1.3 + Math.random() * 0.6,
            (Math.random() - 0.5) * 1.0
          )
          tree.add(cherry)
        }

        group.add(tree)
      }
    }
  }

  // ═══════════════════════════════════════════════════════════════════════
  //  FARM VEHICLES & EQUIPMENT (FIXED colliders)
  // ═══════════════════════════════════════════════════════════════════════

  // -- Tractor 1 (green, in field) --
  {
    const tx = -16, tz = -42
    const tractor = new THREE.Group()
    tractor.position.set(tx, 0, tz)
    tractor.rotation.y = 0.3

    // Body
    const body = s(new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 0.8, 2.0),
      mat(TRACTOR_GRN)
    ))
    body.position.y = 0.8
    tractor.add(body)

    // Cab
    const cab = s(new THREE.Mesh(
      new THREE.BoxGeometry(1.0, 0.8, 1.0),
      mat(TRACTOR_GRN)
    ))
    cab.position.set(0, 1.6, -0.2)
    tractor.add(cab)

    // Cab window
    const window1 = new THREE.Mesh(
      new THREE.BoxGeometry(0.9, 0.5, 0.05),
      mat(0x88bbdd, { transparent: true, opacity: 0.5 })
    )
    window1.position.set(0, 1.7, 0.33)
    tractor.add(window1)

    // Exhaust pipe
    const exhaust = s(new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.05, 0.8, 5),
      mat(DARK_GRAY)
    ))
    exhaust.position.set(-0.4, 1.6, 0.6)
    tractor.add(exhaust)

    // Large rear wheels
    const bigWheelGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.2, 8)
    const wheelMat = mat(BLACK)
    for (const side of [-0.7, 0.7]) {
      const w = new THREE.Mesh(bigWheelGeo, wheelMat)
      w.rotation.z = Math.PI / 2
      w.position.set(side, 0.4, -0.5)
      tractor.add(w)
    }

    // Small front wheels
    const smallWheelGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.15, 7)
    for (const side of [-0.55, 0.55]) {
      const w = new THREE.Mesh(smallWheelGeo, wheelMat)
      w.rotation.z = Math.PI / 2
      w.position.set(side, 0.25, 0.6)
      tractor.add(w)
    }

    group.add(tractor)

    const trBody = world.createRigidBody(
      RAPIER.RigidBodyDesc.fixed().setTranslation(tx, 0.8, tz)
    )
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(0.7, 0.8, 1.2).setFriction(0.5),
      trBody
    )
  }

  // -- Tractor 2 (red, near stable) --
  {
    const tx = 30, tz = 15
    const tractor = new THREE.Group()
    tractor.position.set(tx, 0, tz)
    tractor.rotation.y = -0.5

    const body = s(new THREE.Mesh(
      new THREE.BoxGeometry(1.1, 0.7, 1.8),
      mat(TRACTOR_RED)
    ))
    body.position.y = 0.75
    tractor.add(body)

    const cab = s(new THREE.Mesh(
      new THREE.BoxGeometry(0.9, 0.7, 0.9),
      mat(TRACTOR_RED)
    ))
    cab.position.set(0, 1.45, -0.15)
    tractor.add(cab)

    const exhaust = s(new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 0.7, 5),
      mat(DARK_GRAY)
    ))
    exhaust.position.set(0.35, 1.4, 0.5)
    tractor.add(exhaust)

    const wheelMat = mat(BLACK)
    for (const side of [-0.6, 0.6]) {
      const w = new THREE.Mesh(
        new THREE.CylinderGeometry(0.35, 0.35, 0.18, 8),
        wheelMat
      )
      w.rotation.z = Math.PI / 2
      w.position.set(side, 0.35, -0.45)
      tractor.add(w)
    }
    for (const side of [-0.5, 0.5]) {
      const w = new THREE.Mesh(
        new THREE.CylinderGeometry(0.22, 0.22, 0.14, 7),
        wheelMat
      )
      w.rotation.z = Math.PI / 2
      w.position.set(side, 0.22, 0.55)
      tractor.add(w)
    }

    group.add(tractor)

    const trBody = world.createRigidBody(
      RAPIER.RigidBodyDesc.fixed().setTranslation(tx, 0.75, tz)
    )
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(0.6, 0.75, 1.0).setFriction(0.5),
      trBody
    )
  }

  // -- Hay wagon --
  {
    const wx = -30, wz = -30
    const wagon = new THREE.Group()
    wagon.position.set(wx, 0, wz)

    // Flat bed
    const bed = s(new THREE.Mesh(
      new THREE.BoxGeometry(2.5, 0.12, 4.0),
      mat(WOOD)
    ))
    bed.position.y = 0.5
    wagon.add(bed)

    // Wheels
    const wheelMat = mat(WOOD_DARK)
    for (const [x, z] of [[-1.1, 1.2], [1.1, 1.2], [-1.1, -1.2], [1.1, -1.2]]) {
      const w = new THREE.Mesh(
        new THREE.CylinderGeometry(0.3, 0.3, 0.1, 8),
        wheelMat
      )
      w.rotation.z = Math.PI / 2
      w.position.set(x, 0.3, z)
      wagon.add(w)
    }

    // Hay bales on top (decorative stacked)
    for (let i = 0; i < 4; i++) {
      const bale = s(new THREE.Mesh(
        new THREE.BoxGeometry(0.8, 0.5, 0.8),
        mat(HAY_GOLD)
      ))
      bale.position.set(
        (i % 2 - 0.5) * 0.9,
        0.8 + Math.floor(i / 2) * 0.5,
        (Math.floor(i / 2) - 0.5) * 1.0
      )
      wagon.add(bale)
    }

    // Side rails
    for (const side of [-1.2, 1.2]) {
      const rail = new THREE.Mesh(
        new THREE.BoxGeometry(0.06, 0.5, 4.0),
        mat(WOOD)
      )
      rail.position.set(side, 0.8, 0)
      wagon.add(rail)
    }

    group.add(wagon)

    const wBody = world.createRigidBody(
      RAPIER.RigidBodyDesc.fixed().setTranslation(wx, 0.6, wz)
    )
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(1.3, 0.8, 2.0).setFriction(0.5),
      wBody
    )
  }

  // -- Plow --
  {
    const px = -12, pz = -42
    const plow = new THREE.Group()
    plow.position.set(px, 0, pz)
    plow.rotation.y = 0.5

    // Frame
    const frame = s(new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 0.3, 2.0),
      mat(IRON_GRAY)
    ))
    frame.position.y = 0.4
    plow.add(frame)

    // Blades (3 angled)
    for (let i = 0; i < 3; i++) {
      const blade = s(new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.5, 0.08),
        mat(0x808080)
      ))
      blade.position.set(0, 0.25, -0.6 + i * 0.6)
      blade.rotation.x = -0.4
      blade.rotation.z = 0.3
      plow.add(blade)
    }

    group.add(plow)

    const plowBody = world.createRigidBody(
      RAPIER.RigidBodyDesc.fixed().setTranslation(px, 0.4, pz)
    )
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(0.5, 0.4, 1.2).setFriction(0.5),
      plowBody
    )
  }

  // ═══════════════════════════════════════════════════════════════════════
  //  WATER FEATURES
  // ═══════════════════════════════════════════════════════════════════════

  // -- Duck pond --
  {
    const px = 15, pz = 30
    const pond = new THREE.Mesh(
      new THREE.CircleGeometry(4, 16),
      mat(WATER_BLUE, { transparent: true, opacity: 0.7 })
    )
    pond.rotation.x = -Math.PI / 2
    pond.position.set(px, 0.03, pz)
    group.add(pond)

    // Pond edge (dirt ring)
    const edge = new THREE.Mesh(
      new THREE.RingGeometry(3.8, 4.5, 16),
      mat(EARTH_BROWN)
    )
    edge.rotation.x = -Math.PI / 2
    edge.position.set(px, 0.025, pz)
    group.add(edge)

    // Reeds around pond
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2
      const rx = px + Math.cos(angle) * 3.8
      const rz = pz + Math.sin(angle) * 3.8
      const reed = new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.02, 0.6 + Math.random() * 0.4, 3),
        mat(DARK_GREEN)
      )
      reed.position.set(rx, 0.4, rz)
      group.add(reed)
    }

    // Ducks (4 yellow shapes)
    const duckPositions = [
      [px + 1, pz + 0.5], [px - 1.5, pz - 0.5],
      [px + 0.5, pz - 1.5], [px - 0.5, pz + 1.5]
    ]
    for (const [dx, dz] of duckPositions) {
      const duck = new THREE.Group()
      duck.position.set(dx, 0.06, dz)
      duck.rotation.y = Math.random() * Math.PI * 2

      const duckBody = new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 5, 4),
        mat(SUNFL_YELLOW)
      )
      duckBody.scale.z = 1.3
      duck.add(duckBody)

      const duckHead = new THREE.Mesh(
        new THREE.SphereGeometry(0.07, 4, 3),
        mat(SUNFL_YELLOW)
      )
      duckHead.position.set(0, 0.08, 0.12)
      duck.add(duckHead)

      const bill = new THREE.Mesh(
        new THREE.ConeGeometry(0.025, 0.06, 3),
        mat(ORANGE)
      )
      bill.rotation.x = -Math.PI / 2
      bill.position.set(0, 0.06, 0.2)
      duck.add(bill)

      group.add(duck)
    }
  }

  // -- Well with roof + rope + bucket --
  {
    const wx = 5, wz = -30
    // Stone base
    const base = s(new THREE.Mesh(
      new THREE.CylinderGeometry(0.8, 0.9, 0.8, 8),
      mat(STONE)
    ))
    base.position.set(wx, 0.4, wz)
    group.add(base)

    // Inner dark opening
    const inner = new THREE.Mesh(
      new THREE.CircleGeometry(0.6, 8),
      mat(0x1a1a1a)
    )
    inner.rotation.x = -Math.PI / 2
    inner.position.set(wx, 0.81, wz)
    group.add(inner)

    // Support posts
    for (const side of [-0.7, 0.7]) {
      const post = s(new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.06, 2.0, 5),
        mat(WOOD)
      ))
      post.position.set(wx + side, 1.5, wz)
      group.add(post)
    }

    // Roof
    const wellRoof = s(new THREE.Mesh(
      new THREE.ConeGeometry(1.0, 0.8, 4),
      mat(WOOD_DARK)
    ))
    wellRoof.position.set(wx, 2.9, wz)
    wellRoof.rotation.y = Math.PI / 4
    group.add(wellRoof)

    // Crossbar + rope
    const crossbar = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 1.6, 4),
      mat(WOOD)
    )
    crossbar.rotation.z = Math.PI / 2
    crossbar.position.set(wx, 2.5, wz)
    group.add(crossbar)

    // Rope
    const rope = new THREE.Mesh(
      new THREE.CylinderGeometry(0.015, 0.015, 1.5, 3),
      mat(ROPE_BROWN)
    )
    rope.position.set(wx, 1.7, wz)
    group.add(rope)

    // Bucket
    const bucket = s(new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.1, 0.2, 6),
      mat(WOOD)
    ))
    bucket.position.set(wx, 0.9, wz)
    group.add(bucket)

    const wellBody = world.createRigidBody(
      RAPIER.RigidBodyDesc.fixed().setTranslation(wx, 0.8, wz)
    )
    world.createCollider(
      RAPIER.ColliderDesc.cylinder(1.5, 0.9).setFriction(0.5),
      wellBody
    )
  }

  // -- Water troughs (3, in animal pens) --
  const troughPositions = [[-45, 10], [30, -42], [-10, 38]]
  for (const [tx, tz] of troughPositions) {
    const trough = new THREE.Group()
    trough.position.set(tx, 0, tz)

    const body = s(new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 0.4, 0.5),
      mat(WOOD)
    ))
    body.position.y = 0.4
    trough.add(body)

    // Water inside
    const water = new THREE.Mesh(
      new THREE.PlaneGeometry(1.1, 0.4),
      mat(WATER_BLUE, { transparent: true, opacity: 0.6 })
    )
    water.rotation.x = -Math.PI / 2
    water.position.y = 0.58
    trough.add(water)

    // Legs
    for (const [lx, lz] of [[-0.5, 0.15], [0.5, 0.15], [-0.5, -0.15], [0.5, -0.15]]) {
      const leg = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 0.2, 4),
        mat(WOOD_DARK)
      )
      leg.position.set(lx, 0.1, lz)
      trough.add(leg)
    }

    group.add(trough)
  }

  // -- Irrigation channels (thin blue planes between fields) --
  const irrigationPaths = [
    { x: -8, z: -40, w: 0.3, d: 12 },
    { x: 5, z: -40, w: 0.3, d: 12 },
    { x: -20, z: -50, w: 20, d: 0.3 },
    { x: 25, z: -50, w: 12, d: 0.3 },
  ]
  for (const ip of irrigationPaths) {
    const channel = new THREE.Mesh(
      new THREE.PlaneGeometry(ip.w, ip.d),
      mat(0x4a80a0, { transparent: true, opacity: 0.5 })
    )
    channel.rotation.x = -Math.PI / 2
    channel.position.set(ip.x, 0.025, ip.z)
    group.add(channel)
  }

  // ═══════════════════════════════════════════════════════════════════════
  //  FARM PROPS
  // ═══════════════════════════════════════════════════════════════════════

  // -- Scarecrows (2) --
  function makeScarecrow(sx2, sz, rot) {
    const sc = new THREE.Group()
    sc.position.set(sx2, 0, sz)
    sc.rotation.y = rot

    // Pole
    const pole = s(new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.05, 2.0, 4),
      mat(WOOD)
    ))
    pole.position.y = 1.0
    sc.add(pole)

    // Cross arms
    const arms = s(new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 0.06, 0.06),
      mat(WOOD)
    ))
    arms.position.y = 1.6
    sc.add(arms)

    // Head
    const head = s(new THREE.Mesh(
      new THREE.SphereGeometry(0.18, 6, 5),
      mat(0xddc898)
    ))
    head.position.y = 2.15
    sc.add(head)

    // Hat
    const hat = s(new THREE.Mesh(
      new THREE.ConeGeometry(0.25, 0.3, 6),
      mat(WOOD_DARK)
    ))
    hat.position.y = 2.4
    sc.add(hat)

    // Hat brim
    const brim = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.3, 0.03, 8),
      mat(WOOD_DARK)
    )
    brim.position.y = 2.25
    sc.add(brim)

    // Shirt body
    const shirt = new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 0.5, 0.2),
      mat(0xaa4444)
    )
    shirt.position.y = 1.4
    sc.add(shirt)

    // Hay tufts from sleeves
    for (const side of [-0.75, 0.75]) {
      const tuft = new THREE.Mesh(
        new THREE.ConeGeometry(0.06, 0.15, 4),
        mat(HAY_GOLD)
      )
      tuft.position.set(side, 1.55, 0)
      tuft.rotation.z = side > 0 ? -0.3 : 0.3
      sc.add(tuft)
    }

    group.add(sc)
  }

  makeScarecrow(16, -38, 0.2)
  makeScarecrow(-42, -38, -0.5)

  // -- Clothesline with clothes --
  {
    const cx = -25, cz = 12
    // Two poles
    for (const side of [-3, 3]) {
      const pole = s(new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 2.5, 4),
        mat(WOOD)
      ))
      pole.position.set(cx + side, 1.25, cz)
      group.add(pole)
    }

    // Line
    const line = new THREE.Mesh(
      new THREE.CylinderGeometry(0.01, 0.01, 6, 3),
      mat(WHITE)
    )
    line.rotation.z = Math.PI / 2
    line.position.set(cx, 2.4, cz)
    group.add(line)

    // Hanging clothes (colored planes)
    const clothColors = [0xcc4444, 0x4444cc, 0xffffff, 0x44cc44, 0xcccc44]
    for (let i = 0; i < 5; i++) {
      const cloth = new THREE.Mesh(
        new THREE.PlaneGeometry(0.5, 0.6 + Math.random() * 0.3),
        mat(clothColors[i], { side: THREE.DoubleSide })
      )
      cloth.position.set(cx - 2 + i * 1.1, 2.0, cz)
      cloth.rotation.x = -0.1 + Math.random() * 0.2
      group.add(cloth)
    }
  }

  // -- Dog house --
  {
    const dx = -25, dz = -18
    const house = new THREE.Group()
    house.position.set(dx, 0, dz)

    const body = s(new THREE.Mesh(
      new THREE.BoxGeometry(1.0, 0.7, 0.8),
      mat(WOOD)
    ))
    body.position.y = 0.35
    house.add(body)

    // Triangular roof (two planes)
    for (const side of [-1, 1]) {
      const roofPanel = s(new THREE.Mesh(
        new THREE.BoxGeometry(0.65, 1.1, 0.08),
        mat(BARN_RED)
      ))
      roofPanel.position.set(0, 0.75, side * 0.28)
      roofPanel.rotation.x = side * 0.7
      house.add(roofPanel)
    }

    // Door opening (dark circle)
    const doorway = new THREE.Mesh(
      new THREE.CircleGeometry(0.18, 8),
      mat(0x1a1a1a)
    )
    doorway.position.set(0.51, 0.25, 0)
    doorway.rotation.y = Math.PI / 2
    house.add(doorway)

    group.add(house)
  }

  // -- Bird bath --
  {
    const bx = 8, bz = -10
    const pedestal = s(new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.18, 0.8, 6),
      mat(STONE)
    ))
    pedestal.position.set(bx, 0.4, bz)
    group.add(pedestal)

    const basin = s(new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.3, 0.12, 8),
      mat(STONE)
    ))
    basin.position.set(bx, 0.86, bz)
    group.add(basin)

    const water = new THREE.Mesh(
      new THREE.CircleGeometry(0.4, 8),
      mat(WATER_BLUE, { transparent: true, opacity: 0.5 })
    )
    water.rotation.x = -Math.PI / 2
    water.position.set(bx, 0.93, bz)
    group.add(water)
  }

  // -- Wood chopping block with axe --
  {
    const cx = -30, cz = -14
    // Stump
    const stump = s(new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.35, 0.5, 7),
      mat(WOOD)
    ))
    stump.position.set(cx, 0.25, cz)
    group.add(stump)

    // Axe handle
    const handle = new THREE.Mesh(
      new THREE.CylinderGeometry(0.025, 0.025, 0.8, 4),
      mat(WOOD_DARK)
    )
    handle.position.set(cx, 0.7, cz)
    handle.rotation.z = 0.3
    group.add(handle)

    // Axe blade
    const blade = new THREE.Mesh(
      new THREE.BoxGeometry(0.25, 0.15, 0.04),
      mat(IRON_GRAY)
    )
    blade.position.set(cx + 0.15, 1.05, cz)
    blade.rotation.z = 0.3
    group.add(blade)
  }

  // -- Beehive boxes (2 sets) --
  const beehivePositions = [[48, 8], [-35, 15]]
  for (const [bx, bz] of beehivePositions) {
    for (let stack = 0; stack < 3; stack++) {
      const hive = s(new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.2, 0.4),
        mat(stack === 2 ? WHITE : 0xd4c090)
      ))
      hive.position.set(bx, 0.1 + stack * 0.22, bz)
      group.add(hive)
    }
    // Roof
    const hiveRoof = new THREE.Mesh(
      new THREE.BoxGeometry(0.55, 0.06, 0.45),
      mat(WOOD_DARK)
    )
    hiveRoof.position.set(bx, 0.69, bz)
    hiveRoof.rotation.z = 0.05
    group.add(hiveRoof)
  }

  // -- Flower pots near buildings (6) --
  const potPositions = [
    [2.5, -18], [-2.5, -18], [22, 2], [22, -2], [2, 22], [-2, 22]
  ]
  for (const [px, pz] of potPositions) {
    const pot = s(new THREE.Mesh(
      new THREE.CylinderGeometry(0.18, 0.14, 0.3, 6),
      mat(0xaa5533)
    ))
    pot.position.set(px, 0.15, pz)
    group.add(pot)

    // Plant
    const plant = new THREE.Mesh(
      new THREE.SphereGeometry(0.15, 5, 4),
      mat(GREEN)
    )
    plant.position.set(px, 0.4, pz)
    group.add(plant)

    // Small flower
    const flower = new THREE.Mesh(
      new THREE.SphereGeometry(0.06, 4, 3),
      mat([0xff4466, 0xffaa22, 0xff66cc, 0xffee44, 0xff8844, 0xcc44ff][Math.floor(Math.random() * 6)])
    )
    flower.position.set(px, 0.52, pz)
    group.add(flower)
  }

  // -- Barrel stacks (2 locations) --
  const barrelPositions = [[-32, -22], [34, 24]]
  for (const [bx, bz] of barrelPositions) {
    // Bottom row (3)
    for (let i = 0; i < 3; i++) {
      const barrel = s(new THREE.Mesh(
        new THREE.CylinderGeometry(0.3, 0.28, 0.7, 8),
        mat(WOOD)
      ))
      barrel.position.set(bx + (i - 1) * 0.65, 0.35, bz)
      group.add(barrel)

      // Bands
      for (const by of [0.15, 0.55]) {
        const band = new THREE.Mesh(
          new THREE.TorusGeometry(0.29, 0.02, 4, 8),
          mat(IRON_GRAY)
        )
        band.rotation.x = Math.PI / 2
        band.position.set(bx + (i - 1) * 0.65, by, bz)
        group.add(band)
      }
    }
    // Top row (2)
    for (let i = 0; i < 2; i++) {
      const barrel = s(new THREE.Mesh(
        new THREE.CylinderGeometry(0.3, 0.28, 0.7, 8),
        mat(WOOD)
      ))
      barrel.position.set(bx + (i - 0.5) * 0.65, 1.05, bz)
      group.add(barrel)
    }
  }

  // -- Feed troughs (3, in pens) --
  const feedTroughPositions = [[-43, 16], [35, -46], [45, 35]]
  for (const [fx, fz] of feedTroughPositions) {
    const trough = s(new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 0.25, 0.35),
      mat(WOOD_DARK)
    ))
    trough.position.set(fx, 0.2, fz)
    group.add(trough)

    // Feed inside (golden)
    const feed = new THREE.Mesh(
      new THREE.BoxGeometry(0.7, 0.08, 0.28),
      mat(HAY_GOLD)
    )
    feed.position.set(fx, 0.35, fz)
    group.add(feed)
  }

  // -- Haystacks (large ConeGeometry, golden) --
  const haystackPositions = [
    [-18, -48, 1.8], [8, -48, 1.5], [-30, -35, 2.0],
    [25, 45, 1.6], [-48, 20, 1.4]
  ]
  for (const [hx, hz, scale] of haystackPositions) {
    const haystack = s(new THREE.Mesh(
      new THREE.ConeGeometry(scale, scale * 1.5, 7),
      mat(HAY_GOLD)
    ))
    haystack.position.set(hx, scale * 0.75, hz)
    group.add(haystack)

    const hsBody = world.createRigidBody(
      RAPIER.RigidBodyDesc.fixed().setTranslation(hx, scale * 0.75, hz)
    )
    world.createCollider(
      RAPIER.ColliderDesc.cone(scale * 0.75, scale).setFriction(0.6),
      hsBody
    )
  }

  // -- Wheelbarrows (3, static decorative) --
  const wbPositions = [[-26, -16, 0.5], [38, 18, 1.2], [10, 42, 2.5]]
  for (const [wx, wz, rot] of wbPositions) {
    const wb = new THREE.Group()
    wb.position.set(wx, 0, wz)
    wb.rotation.y = rot

    // Tray
    const tray = s(new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.3, 0.8),
      mat(IRON_GRAY)
    ))
    tray.position.set(0, 0.35, 0)
    tray.rotation.x = 0.15
    wb.add(tray)

    // Wheel
    const wheel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.15, 0.15, 0.06, 7),
      mat(BLACK)
    )
    wheel.rotation.z = Math.PI / 2
    wheel.position.set(0, 0.15, 0.5)
    wb.add(wheel)

    // Handles
    for (const side of [-0.2, 0.2]) {
      const handle = new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.02, 0.8, 3),
        mat(WOOD)
      )
      handle.position.set(side, 0.4, -0.5)
      handle.rotation.x = 0.4
      wb.add(handle)
    }

    group.add(wb)
  }

  // ═══════════════════════════════════════════════════════════════════════
  //  DYNAMIC / INTERACTIVE OBJECTS
  // ═══════════════════════════════════════════════════════════════════════

  // -- HAY BALES (10 rollable cylinders on side!) --
  const hayBalePositions = [
    [-22, -46], [-18, -44], [-14, -46], [-16, -48],
    [6, -46], [10, -48], [12, -44],
    [-28, -32], [22, 42], [25, 40]
  ]
  for (const [hx, hz] of hayBalePositions) {
    const radius = 0.4
    const length = 0.6
    const bale = s(new THREE.Mesh(
      new THREE.CylinderGeometry(radius, radius, length, 8),
      mat(HAY_GOLD)
    ))
    group.add(bale)

    // Hay bale on its side => cylinder collider rotated 90 degrees
    // We use a cylinder collider but orient the body so it rolls
    const bodyDesc = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(hx, radius, hz)
      .setRotation({ x: 0, y: 0, z: Math.sin(Math.PI / 4), w: Math.cos(Math.PI / 4) }) // rotated 90 deg around Z
      .setLinearDamping(0.5)
      .setAngularDamping(0.3)
    const body = world.createRigidBody(bodyDesc)

    const colDesc = RAPIER.ColliderDesc.cylinder(length / 2, radius)
      .setDensity(6.0)
      .setFriction(0.6)
      .setRestitution(0.15)
    world.createCollider(colDesc, body)

    syncList.push({ mesh: bale, body })
  }

  // -- PUMPKINS (5 dynamic orange spheres) --
  const pumpkinDynPositions = [
    [28, -43], [32, -47], [34, -44], [26, -46], [30, -49]
  ]
  for (const [px, pz] of pumpkinDynPositions) {
    const radius = 0.2 + Math.random() * 0.08
    const pumpkin = s(new THREE.Mesh(
      new THREE.SphereGeometry(radius, 6, 5),
      mat(PUMPKIN_ORG)
    ))
    pumpkin.scale.y = 0.75
    group.add(pumpkin)

    const stem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.02, 0.06, 3),
      mat(GREEN)
    )
    stem.position.y = radius * 0.75
    pumpkin.add(stem)

    const bodyDesc = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(px, radius, pz)
      .setLinearDamping(0.5)
      .setAngularDamping(0.3)
    const body = world.createRigidBody(bodyDesc)
    const colDesc = RAPIER.ColliderDesc.ball(radius)
      .setDensity(5.0)
      .setFriction(0.5)
      .setRestitution(0.3)
    world.createCollider(colDesc, body)

    syncList.push({ mesh: pumpkin, body })
  }

  // -- MILK CHURNS (4 dynamic cylinders) --
  const churnPositions = [[-40, 14], [-38, 16], [36, 22], [38, 24]]
  for (const [cx, cz] of churnPositions) {
    const churnH = 0.5
    const churnR = 0.12
    const churn = s(new THREE.Mesh(
      new THREE.CylinderGeometry(churnR * 0.7, churnR, churnH, 6),
      mat(0xc0c0c0)
    ))
    group.add(churn)

    // Handle
    const handle = new THREE.Mesh(
      new THREE.TorusGeometry(0.08, 0.015, 4, 6, Math.PI),
      mat(IRON_GRAY)
    )
    handle.position.y = churnH / 2 + 0.05
    churn.add(handle)

    const bodyDesc = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(cx, churnH / 2, cz)
      .setLinearDamping(0.4)
      .setAngularDamping(0.5)
    const body = world.createRigidBody(bodyDesc)
    const colDesc = RAPIER.ColliderDesc.cylinder(churnH / 2, churnR)
      .setDensity(10.0)
      .setFriction(0.4)
      .setRestitution(0.1)
    world.createCollider(colDesc, body)

    syncList.push({ mesh: churn, body })
  }

  // -- WOODEN CRATES (3 dynamic boxes) --
  const cratePositions = [[-28, -20], [36, 18], [-32, -26]]
  for (const [cx, cz] of cratePositions) {
    const size = 0.5
    const crate = s(new THREE.Mesh(
      new THREE.BoxGeometry(size, size, size),
      mat(WOOD)
    ))
    group.add(crate)

    // Cross detail
    for (const rot of [0.78, -0.78]) {
      const trim = new THREE.Mesh(
        new THREE.BoxGeometry(0.04, size * 0.9, 0.04),
        mat(WOOD_DARK)
      )
      trim.position.z = size / 2 + 0.01
      trim.rotation.z = rot
      crate.add(trim)
    }

    const bodyDesc = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(cx, size / 2, cz)
      .setLinearDamping(0.4)
      .setAngularDamping(0.4)
    const body = world.createRigidBody(bodyDesc)
    const colDesc = RAPIER.ColliderDesc.cuboid(size / 2, size / 2, size / 2)
      .setDensity(8.0)
      .setFriction(0.5)
      .setRestitution(0.1)
    world.createCollider(colDesc, body)

    syncList.push({ mesh: crate, body })
  }

  // -- FALLEN APPLES (4 dynamic small spheres) --
  const applePositions = [[43, -2], [45, 3], [41, 1], [47, -1]]
  for (const [ax, az] of applePositions) {
    const radius = 0.08
    const apple = s(new THREE.Mesh(
      new THREE.SphereGeometry(radius, 5, 4),
      mat(APPLE_RED)
    ))
    group.add(apple)

    const bodyDesc = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(ax, radius, az)
      .setLinearDamping(0.6)
      .setAngularDamping(0.5)
    const body = world.createRigidBody(bodyDesc)
    const colDesc = RAPIER.ColliderDesc.ball(radius)
      .setDensity(3.0)
      .setFriction(0.6)
      .setRestitution(0.4)
    world.createCollider(colDesc, body)

    syncList.push({ mesh: apple, body })
  }

  // -- FEED BUCKETS (3 dynamic cylinders) --
  const bucketPositions = [[-42, 12], [32, -44], [44, 34]]
  for (const [bx, bz] of bucketPositions) {
    const bH = 0.3
    const bR = 0.12
    const bucket = s(new THREE.Mesh(
      new THREE.CylinderGeometry(bR, bR * 0.85, bH, 6),
      mat(IRON_GRAY)
    ))
    group.add(bucket)

    const handle = new THREE.Mesh(
      new THREE.TorusGeometry(0.1, 0.012, 4, 6, Math.PI),
      mat(IRON_GRAY)
    )
    handle.position.y = bH / 2
    bucket.add(handle)

    const bodyDesc = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(bx, bH / 2, bz)
      .setLinearDamping(0.5)
      .setAngularDamping(0.5)
    const body = world.createRigidBody(bodyDesc)
    const colDesc = RAPIER.ColliderDesc.cylinder(bH / 2, bR)
      .setDensity(5.0)
      .setFriction(0.4)
      .setRestitution(0.15)
    world.createCollider(colDesc, body)

    syncList.push({ mesh: bucket, body })
  }

  // -- DYNAMIC WHEELBARROWS (2) --
  const dynWbPositions = [[-24, 8], [28, -10]]
  for (const [wx, wz] of dynWbPositions) {
    const wb = new THREE.Group()

    // Tray
    const tray = s(new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.25, 0.7),
      mat(IRON_GRAY)
    ))
    tray.position.y = 0
    wb.add(tray)

    // Wheel
    const wheel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.12, 0.05, 6),
      mat(BLACK)
    )
    wheel.rotation.z = Math.PI / 2
    wheel.position.set(0, -0.1, 0.4)
    wb.add(wheel)

    // Handles
    for (const side of [-0.18, 0.18]) {
      const handle = new THREE.Mesh(
        new THREE.CylinderGeometry(0.015, 0.015, 0.5, 3),
        mat(WOOD)
      )
      handle.position.set(side, 0, -0.4)
      handle.rotation.x = 0.3
      wb.add(handle)
    }

    group.add(wb)

    const bodyDesc = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(wx, 0.3, wz)
      .setLinearDamping(0.5)
      .setAngularDamping(0.5)
    const body = world.createRigidBody(bodyDesc)
    const colDesc = RAPIER.ColliderDesc.cuboid(0.25, 0.15, 0.4)
      .setDensity(6.0)
      .setFriction(0.4)
      .setRestitution(0.1)
    world.createCollider(colDesc, body)

    syncList.push({ mesh: wb, body })
  }

  // ═══════════════════════════════════════════════════════════════════════
  //  EXTRA TREES scattered around (non-orchard)
  // ═══════════════════════════════════════════════════════════════════════
  const scatteredTrees = [
    [-55, -50], [-55, 50], [55, -50], [55, 50],
    [-50, -30], [50, -25], [-50, 40], [50, 45],
    [-40, 48], [48, -48], [-48, -48], [48, 48],
    [10, 48], [-10, -50], [50, 10], [-50, -10],
  ]
  for (const [tx, tz] of scatteredTrees) {
    const tree = new THREE.Group()
    tree.position.set(tx, 0, tz)
    const scale = 0.8 + Math.random() * 0.5

    const trunk = s(new THREE.Mesh(
      new THREE.CylinderGeometry(0.12 * scale, 0.18 * scale, 1.8 * scale, 5),
      mat(0x6b4c2a)
    ))
    trunk.position.y = 0.9 * scale
    tree.add(trunk)

    // 2-tier foliage
    const greenShade = [0x2d6a4f, 0x40916c, 0x52b788][Math.floor(Math.random() * 3)]
    const fMat = mat(greenShade)
    const tiers = [[0.9, 1.5, 2.2], [0.55, 1.1, 3.2]]
    for (const [r, h, y] of tiers) {
      const foliage = s(new THREE.Mesh(
        new THREE.ConeGeometry(r * scale, h * scale, 6),
        fMat
      ))
      foliage.position.y = y * scale
      tree.add(foliage)
    }

    group.add(tree)
  }

  // ═══════════════════════════════════════════════════════════════════════
  //  EXTRA DECORATIVE DETAILS to fill the map
  // ═══════════════════════════════════════════════════════════════════════

  // -- Bushes along paths and fences --
  const bushPositions = [
    [5, -12], [-5, 12], [12, 5], [-12, -5],
    [15, -8], [-8, 15], [25, 10], [-10, 25],
    [30, -5], [-5, -30], [38, -8], [-8, 38],
    [15, 25], [-25, -15], [8, 40], [-40, -8],
  ]
  for (const [bx, bz] of bushPositions) {
    const bushSize = 0.3 + Math.random() * 0.3
    const bush = s(new THREE.Mesh(
      new THREE.SphereGeometry(bushSize, 6, 5),
      mat([0x2d8c4e, 0x389e5c, 0x45a862, 0x2a7a42][Math.floor(Math.random() * 4)])
    ))
    bush.position.set(bx, bushSize * 0.6, bz)
    group.add(bush)
  }

  // -- Rock clusters --
  const rockPositions = [
    [20, -35], [-35, 35], [45, 25], [-20, 50],
    [50, -35], [-45, -15], [5, 50], [-50, 5],
  ]
  for (const [rx, rz] of rockPositions) {
    for (let i = 0; i < 3; i++) {
      const rock = s(new THREE.Mesh(
        new THREE.SphereGeometry(0.2 + Math.random() * 0.3, 5, 4),
        mat(0x808080)
      ))
      rock.position.set(
        rx + (Math.random() - 0.5) * 1.5,
        0.12 + Math.random() * 0.05,
        rz + (Math.random() - 0.5) * 1.5
      )
      rock.scale.y = 0.5 + Math.random() * 0.3
      group.add(rock)
    }
  }

  // -- Wildflower patches --
  const flowerPatchPositions = [
    [8, 8], [-8, -8], [15, 15], [-15, -15],
    [30, 8], [-8, 30], [10, -8], [-8, -10],
  ]
  for (const [fx, fz] of flowerPatchPositions) {
    for (let i = 0; i < 6; i++) {
      const flowerColors2 = [0xff4466, 0xffaa22, 0xff66cc, 0xffee44, 0xff8844]
      const flower = new THREE.Mesh(
        new THREE.SphereGeometry(0.05, 4, 3),
        mat(flowerColors2[Math.floor(Math.random() * flowerColors2.length)])
      )
      flower.position.set(
        fx + (Math.random() - 0.5) * 2,
        0.1 + Math.random() * 0.1,
        fz + (Math.random() - 0.5) * 2
      )
      group.add(flower)

      // Stem
      const stem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.01, 0.01, 0.12, 3),
        mat(GREEN)
      )
      stem.position.set(flower.position.x, 0.05, flower.position.z)
      group.add(stem)
    }
  }

  // -- Dirt mounds / plowed earth patches --
  const moundPositions = [[-15, -40], [8, -42], [-42, -42]]
  for (const [mx, mz] of moundPositions) {
    for (let i = 0; i < 8; i++) {
      const mound = new THREE.Mesh(
        new THREE.SphereGeometry(0.3, 5, 3),
        mat(EARTH_BROWN)
      )
      mound.position.set(
        mx + i * 0.7,
        0.08,
        mz + (Math.random() - 0.5) * 0.5
      )
      mound.scale.y = 0.3
      mound.receiveShadow = true
      group.add(mound)
    }
  }

  // -- Wooden sign posts (2, at path crossings) --
  const signPositions = [[5, 5, 0.4], [-5, -5, 2.0]]
  for (const [sx2, sz, rot] of signPositions) {
    const signPost = new THREE.Group()
    signPost.position.set(sx2, 0, sz)
    signPost.rotation.y = rot

    const pole = s(new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.05, 1.8, 4),
      mat(WOOD)
    ))
    pole.position.y = 0.9
    signPost.add(pole)

    // Arrow sign
    const sign = new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 0.2, 0.05),
      mat(WOOD)
    )
    sign.position.set(0.2, 1.6, 0)
    signPost.add(sign)

    // Second arrow
    const sign2 = new THREE.Mesh(
      new THREE.BoxGeometry(0.7, 0.18, 0.05),
      mat(WOOD)
    )
    sign2.position.set(-0.15, 1.3, 0)
    sign2.rotation.z = 0.1
    signPost.add(sign2)

    group.add(signPost)
  }

  // -- Mushroom clusters --
  const mushroomPositions = [[-55, -20], [55, 30], [-45, 50]]
  for (const [mx, mz] of mushroomPositions) {
    for (let i = 0; i < 4; i++) {
      const mushroom = new THREE.Group()
      mushroom.position.set(
        mx + (Math.random() - 0.5) * 2,
        0,
        mz + (Math.random() - 0.5) * 2
      )

      const stem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.03, 0.04, 0.12, 4),
        mat(CREAM)
      )
      stem.position.y = 0.06
      mushroom.add(stem)

      const cap = new THREE.Mesh(
        new THREE.SphereGeometry(0.06, 5, 3, 0, Math.PI * 2, 0, Math.PI / 2),
        mat([0xcc3333, 0xddaa33, 0xbbbb88][Math.floor(Math.random() * 3)])
      )
      cap.position.y = 0.12
      mushroom.add(cap)

      group.add(mushroom)
    }
  }

  // ═══════════════════════════════════════════════════════════════════════
  //  ADD GROUP TO SCENE
  // ═══════════════════════════════════════════════════════════════════════
  scene.add(group)

  // ═══════════════════════════════════════════════════════════════════════
  //  RETURN
  // ═══════════════════════════════════════════════════════════════════════
  return {
    syncList,
    update(dt) {
      for (const w of windmillBlades) {
        w.group.rotation.z += dt * w.speed
      }
    }
  }
}
