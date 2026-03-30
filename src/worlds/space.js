/**
 * Space Colony World — alien planet base with rockets, satellite dishes,
 * glowing alien flora, craters, astronauts, and sci-fi technology.
 *
 * Full 120×120 map (±60). Dark atmosphere with dramatic emissive contrast.
 * Portfolio buildings at (0,-20), (20,0), (0,20), (-20,0).
 *
 * Animated: satellite dishes (rotation), alien plants (glow pulse),
 * warning lights (pulse), geysers (mist glow), crystal shimmer.
 */
import * as THREE from 'three'

// ── Reusable temp objects ──────────────────────────────────────────────
const _q = new THREE.Quaternion()
const _e = new THREE.Euler()

// ── Palette ────────────────────────────────────────────────────────────
function mat(color, opts = {}) {
  return new THREE.MeshStandardMaterial({ color, flatShading: true, ...opts })
}
function emissiveMat(color, emissive, intensity = 1.0, opts = {}) {
  return new THREE.MeshStandardMaterial({
    color, emissive, emissiveIntensity: intensity, flatShading: true, ...opts,
  })
}
function shadow(mesh) {
  mesh.castShadow = true
  mesh.receiveShadow = true
  return mesh
}

const TERRAIN   = 0x2a2a3a
const DARK_ROCK = 0x1e1e2e
const CRATER    = 0x18182a
const WHITE     = 0xffffff
const SILVER    = 0xb0b0b0
const STEEL     = 0x78909c
const DARK_GRAY = 0x4a4a4a
const BLACK     = 0x111111
const RED       = 0xcc2222
const ORANGE    = 0xff6600
const YELLOW    = 0xffdd44
const BLUE      = 0x1565c0
const LIGHT_BLUE= 0x42a5f5
const PANEL_BLUE= 0x0d47a1
const CYAN_E    = 0x00ffff
const PURPLE_E  = 0xaa44ff
const PINK_E    = 0xff44cc
const GREEN_E   = 0x00ff66
const DOME_GREEN= 0x225533
const METAL_DARK= 0x333344

export function createWorld(scene, RAPIER, world) {
  const syncList = []
  const group = new THREE.Group()

  // Animated references
  const dishes = []
  const alienPlants = []
  const warningLights = []
  const geysers = []
  const crystals = []
  const monolithAnims = []    // crater monolith pulse
  const goopAnims = []        // goop pond glow
  const bubbleAnims = []      // goop bubbles
  let elapsed = 0

  // ═══════════════════════════════════════════════════════════════════
  // SCENE SETUP — dark space background + fog
  // ═══════════════════════════════════════════════════════════════════
  scene.background = new THREE.Color(0x0a0a1a)
  scene.fog = new THREE.Fog(0x0a0a1a, 40, 100)

  // ═══════════════════════════════════════════════════════════════════
  // STARS — 300 tiny points in a large sphere
  // ═══════════════════════════════════════════════════════════════════
  {
    const starCount = 300
    const starGeo = new THREE.BufferGeometry()
    const positions = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 80 + Math.random() * 40
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = Math.abs(r * Math.cos(phi)) // keep above horizon
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.3, sizeAttenuation: true })
    const stars = new THREE.Points(starGeo, starMat)
    group.add(stars)
  }

  // ═══════════════════════════════════════════════════════════════════
  // GROUND — dark alien terrain + Rapier collider
  // ═══════════════════════════════════════════════════════════════════
  {
    const groundGeo = new THREE.PlaneGeometry(130, 130, 8, 8)
    const groundMesh = new THREE.Mesh(groundGeo, mat(TERRAIN))
    groundMesh.rotation.x = -Math.PI / 2
    groundMesh.position.y = 0
    groundMesh.receiveShadow = true
    group.add(groundMesh)

    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(0, -0.05, 0)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(65, 0.05, 65).setFriction(0.6), body
    )
  }

  // ═══════════════════════════════════════════════════════════════════
  // GLASS DOME — habitat dome enclosing the colony
  // ═══════════════════════════════════════════════════════════════════
  {
    const DOME_RADIUS = 62
    const DOME_HEIGHT = 45

    // Main dome — transparent glass with subtle blue tint
    const domeGeo = new THREE.SphereGeometry(DOME_RADIUS, 48, 32, 0, Math.PI * 2, 0, Math.PI / 2)
    const domeMat = new THREE.MeshPhysicalMaterial({
      color: 0x88ccff,
      transparent: true,
      opacity: 0.08,
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.9,
      thickness: 0.5,
      side: THREE.DoubleSide,
      depthWrite: false,
    })
    const dome = new THREE.Mesh(domeGeo, domeMat)
    dome.scale.set(1, DOME_HEIGHT / DOME_RADIUS, 1)
    dome.position.y = 0
    group.add(dome)

    // Wireframe overlay — visible structural ribs
    const wireGeo = new THREE.SphereGeometry(DOME_RADIUS + 0.1, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2)
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x4488aa,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
      depthWrite: false,
    })
    const wireframe = new THREE.Mesh(wireGeo, wireMat)
    wireframe.scale.set(1, DOME_HEIGHT / DOME_RADIUS, 1)
    wireframe.position.y = 0
    group.add(wireframe)

    // Base ring — thick metal ring at ground level
    const ringGeo = new THREE.TorusGeometry(DOME_RADIUS, 0.8, 8, 64)
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x556677,
      metalness: 0.7,
      roughness: 0.3,
      flatShading: true,
    })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    ring.rotation.x = -Math.PI / 2
    ring.position.y = 0.3
    ring.castShadow = true
    ring.receiveShadow = true
    group.add(ring)

    // Invisible collision boundary — ring of cuboid segments around perimeter
    const WALL_SEGMENTS = 32
    for (let i = 0; i < WALL_SEGMENTS; i++) {
      const angle = (i / WALL_SEGMENTS) * Math.PI * 2
      const wx = Math.cos(angle) * (DOME_RADIUS - 1)
      const wz = Math.sin(angle) * (DOME_RADIUS - 1)
      const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(wx, 3, wz)
      const body = world.createRigidBody(bd)
      // Tangent-aligned wall segment
      const segLen = (2 * Math.PI * (DOME_RADIUS - 1)) / WALL_SEGMENTS / 2 + 0.5
      const cd = RAPIER.ColliderDesc.cuboid(segLen, 3, 0.5).setFriction(0.5)
      cd.setRotation({ x: 0, y: Math.sin(-angle / 2), z: 0, w: Math.cos(-angle / 2) })
      world.createCollider(cd, body)
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  // MAIN ROCKET — tallest structure (~15 units) on launch pad
  // ═══════════════════════════════════════════════════════════════════
  {
    const rx = 18, rz = -18
    const rocketGroup = new THREE.Group()
    rocketGroup.position.set(rx, 0, rz)

    // Launch pad platform
    const padGeo = new THREE.CylinderGeometry(5, 5, 0.4, 10)
    const pad = shadow(new THREE.Mesh(padGeo, mat(STEEL)))
    pad.position.y = 0.2
    rocketGroup.add(pad)

    // Pad ring
    const padRing = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(5.3, 5.3, 0.15, 10), mat(DARK_GRAY)
    ))
    padRing.position.y = 0.075
    rocketGroup.add(padRing)

    // Pad markings
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2
      const markGeo = new THREE.PlaneGeometry(1.5, 0.15)
      const mark = new THREE.Mesh(markGeo, mat(YELLOW))
      mark.rotation.x = -Math.PI / 2
      mark.rotation.z = angle
      mark.position.set(Math.cos(angle) * 4, 0.41, Math.sin(angle) * 4)
      rocketGroup.add(mark)
    }

    // Landing lights around pad
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2
      const lg = new THREE.Mesh(
        new THREE.CircleGeometry(0.2, 6),
        emissiveMat(WHITE, WHITE, 1.5)
      )
      lg.rotation.x = -Math.PI / 2
      lg.position.set(Math.cos(angle) * 5.5, 0.02, Math.sin(angle) * 5.5)
      rocketGroup.add(lg)
    }

    // Engine nozzle
    const nozzle = shadow(new THREE.Mesh(
      new THREE.ConeGeometry(1.0, 1.5, 8), mat(0x333333)
    ))
    nozzle.position.y = 1.15
    rocketGroup.add(nozzle)

    // Inner nozzle glow
    const nozzleGlow = new THREE.Mesh(
      new THREE.ConeGeometry(0.6, 0.8, 8),
      emissiveMat(ORANGE, ORANGE, 0.6)
    )
    nozzleGlow.position.y = 0.8
    rocketGroup.add(nozzleGlow)

    // Rocket body
    const rBody = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(1.2, 1.5, 11, 8), mat(WHITE)
    ))
    rBody.position.y = 7.4
    rocketGroup.add(rBody)

    // Blue stripe lower
    const blueS1 = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(1.52, 1.52, 0.6, 8), mat(BLUE)
    ))
    blueS1.position.y = 3.8
    rocketGroup.add(blueS1)

    // Red stripe middle
    const redS = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(1.3, 1.3, 0.5, 8), mat(RED)
    ))
    redS.position.y = 10.0
    rocketGroup.add(redS)

    // Blue stripe upper
    const blueS2 = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(1.25, 1.25, 0.4, 8), mat(BLUE)
    ))
    blueS2.position.y = 7.5
    rocketGroup.add(blueS2)

    // Nose cone
    const nose = shadow(new THREE.Mesh(
      new THREE.ConeGeometry(1.2, 3.5, 8), mat(RED)
    ))
    nose.position.y = 14.65
    rocketGroup.add(nose)

    // Nose tip
    const noseTip = shadow(new THREE.Mesh(
      new THREE.ConeGeometry(0.18, 0.6, 6), mat(WHITE)
    ))
    noseTip.position.y = 16.2
    rocketGroup.add(noseTip)

    // Fins (4)
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2
      const finGrp = new THREE.Group()
      finGrp.rotation.y = angle
      const fin = shadow(new THREE.Mesh(
        new THREE.BoxGeometry(0.12, 3.0, 1.5), mat(SILVER)
      ))
      fin.position.set(0, 2.5, 1.8)
      fin.rotation.x = -0.15
      finGrp.add(fin)
      const finTip = shadow(new THREE.Mesh(
        new THREE.BoxGeometry(0.14, 0.7, 0.6), mat(RED)
      ))
      finTip.position.set(0, 3.8, 1.5)
      finGrp.add(finTip)
      rocketGroup.add(finGrp)
    }

    // Portholes
    for (let i = 0; i < 4; i++) {
      const port = new THREE.Mesh(
        new THREE.CircleGeometry(0.18, 8),
        emissiveMat(LIGHT_BLUE, CYAN_E, 0.6)
      )
      port.position.set(0, 8.0 + i * 1.4, 1.21)
      rocketGroup.add(port)
    }

    group.add(rocketGroup)

    // Rocket collider
    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(rx, 8, rz)
    const body = world.createRigidBody(bd)
    world.createCollider(RAPIER.ColliderDesc.cylinder(8, 1.5).setFriction(0.5), body)

    // Pad collider
    const padBd = RAPIER.RigidBodyDesc.fixed().setTranslation(rx, 0.2, rz)
    const padBody = world.createRigidBody(padBd)
    world.createCollider(RAPIER.ColliderDesc.cylinder(0.2, 5).setFriction(0.6), padBody)
  }

  // ═══════════════════════════════════════════════════════════════════
  // SMALLER ROCKET on second pad
  // ═══════════════════════════════════════════════════════════════════
  {
    const rx = -21, rz = 15
    const g = new THREE.Group()
    g.position.set(rx, 0, rz)

    // Pad
    const pad = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(3.5, 3.5, 0.3, 8), mat(STEEL)
    ))
    pad.position.y = 0.15
    g.add(pad)

    // Body
    const b = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.7, 0.9, 7, 8), mat(SILVER)
    ))
    b.position.y = 4.2
    g.add(b)

    // Stripe
    const stripe = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.92, 0.92, 0.4, 8), mat(ORANGE)
    ))
    stripe.position.y = 3.0
    g.add(stripe)

    // Nose
    const nose = shadow(new THREE.Mesh(
      new THREE.ConeGeometry(0.7, 2.0, 8), mat(ORANGE)
    ))
    nose.position.y = 8.7
    g.add(nose)

    // Fins (3)
    for (let i = 0; i < 3; i++) {
      const angle = (i / 3) * Math.PI * 2
      const finGrp = new THREE.Group()
      finGrp.rotation.y = angle
      const fin = shadow(new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 2.0, 1.0), mat(STEEL)
      ))
      fin.position.set(0, 1.5, 1.1)
      finGrp.add(fin)
      g.add(finGrp)
    }

    group.add(g)

    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(rx, 4, rz)
    const body = world.createRigidBody(bd)
    world.createCollider(RAPIER.ColliderDesc.cylinder(4, 1.0).setFriction(0.5), body)
  }

  // ═══════════════════════════════════════════════════════════════════
  // ROCKET UNDER CONSTRUCTION (no nose cone, scaffolding)
  // ═══════════════════════════════════════════════════════════════════
  {
    const rx = 24, rz = 12
    const g = new THREE.Group()
    g.position.set(rx, 0, rz)

    // Pad
    const pad = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(4, 4, 0.3, 8), mat(STEEL)
    ))
    pad.position.y = 0.15
    g.add(pad)

    // Partial body (no nose)
    const b = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(1.0, 1.2, 8, 8), mat(WHITE)
    ))
    b.position.y = 4.5
    g.add(b)

    // Open top ring
    const topRing = shadow(new THREE.Mesh(
      new THREE.TorusGeometry(1.0, 0.08, 6, 12), mat(STEEL)
    ))
    topRing.position.y = 8.5
    topRing.rotation.x = Math.PI / 2
    g.add(topRing)

    // Scaffolding (4 vertical + horizontal beams)
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2
      const sx = Math.cos(angle) * 2.2
      const sz = Math.sin(angle) * 2.2
      // Vertical beam
      const vb = shadow(new THREE.Mesh(
        new THREE.BoxGeometry(0.15, 10, 0.15), mat(YELLOW)
      ))
      vb.position.set(sx, 5, sz)
      g.add(vb)
      // Horizontal braces
      for (let h = 0; h < 4; h++) {
        const hb = shadow(new THREE.Mesh(
          new THREE.BoxGeometry(0.1, 0.1, 1.2), mat(YELLOW)
        ))
        hb.position.set(sx * 0.6, 2 + h * 2.5, sz * 0.6)
        hb.lookAt(new THREE.Vector3(0, 2 + h * 2.5, 0))
        g.add(hb)
      }
    }

    // Cross braces at each level
    for (let h = 0; h < 4; h++) {
      for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2
        const nextAngle = ((i + 1) / 4) * Math.PI * 2
        const midAngle = (angle + nextAngle) / 2
        const cb = shadow(new THREE.Mesh(
          new THREE.BoxGeometry(0.08, 0.08, 3.2), mat(YELLOW)
        ))
        cb.position.set(Math.cos(midAngle) * 2.2, 2 + h * 2.5, Math.sin(midAngle) * 2.2)
        cb.rotation.y = -midAngle + Math.PI / 2
        g.add(cb)
      }
    }

    group.add(g)

    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(rx, 4.5, rz)
    const body = world.createRigidBody(bd)
    world.createCollider(RAPIER.ColliderDesc.cylinder(4.5, 2.5).setFriction(0.5), body)
  }

  // ═══════════════════════════════════════════════════════════════════
  // SATELLITE DISHES (5, animated rotation)
  // ═══════════════════════════════════════════════════════════════════
  {
    const dishDefs = [
      { x: -11, z: -13, speed: 0.15 },
      { x: -13, z: -11, speed: 0.22 },
      { x: 27,  z: -6,  speed: 0.18 },
      { x: 25,  z: -9,  speed: 0.12 },
      { x: -9,  z: 27,  speed: 0.25 },
    ]
    for (const d of dishDefs) {
      const dg = new THREE.Group()
      dg.position.set(d.x, 0, d.z)

      // Pedestal
      const pedestal = shadow(new THREE.Mesh(
        new THREE.CylinderGeometry(0.4, 0.6, 1.8, 6), mat(STEEL)
      ))
      pedestal.position.y = 0.9
      dg.add(pedestal)

      // Support arm
      const support = shadow(new THREE.Mesh(
        new THREE.CylinderGeometry(0.15, 0.15, 2.2, 6), mat(SILVER)
      ))
      support.position.y = 2.5
      support.rotation.x = 0.3
      dg.add(support)

      // Dish (inverted cone)
      const dish = shadow(new THREE.Mesh(
        new THREE.ConeGeometry(3.0, 1.4, 8), mat(WHITE)
      ))
      dish.position.y = 3.6
      dish.rotation.x = Math.PI
      dg.add(dish)

      // Inner dish
      const inner = shadow(new THREE.Mesh(
        new THREE.ConeGeometry(2.7, 1.0, 8), mat(SILVER)
      ))
      inner.position.y = 3.4
      inner.rotation.x = Math.PI
      dg.add(inner)

      // Feed horn
      const horn = shadow(new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.12, 1.8, 6), mat(DARK_GRAY)
      ))
      horn.position.y = 3.9
      dg.add(horn)

      // Feed tip
      const tip = shadow(new THREE.Mesh(
        new THREE.SphereGeometry(0.18, 6, 6), mat(RED)
      ))
      tip.position.y = 4.9
      dg.add(tip)

      group.add(dg)
      dishes.push({ group: dg, speed: d.speed })
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  // BASE BUILDINGS — futuristic shapes with colliders
  // ═══════════════════════════════════════════════════════════════════

  // — Domed Habitats (3) —
  {
    const habDefs = [
      { x: -24, z: -6,  r: 3.5, h: 2.0 },
      { x: 21,  z: 24,  r: 3.0, h: 1.8 },
      { x: -12, z: -24, r: 2.8, h: 1.6 },
    ]
    for (const hb of habDefs) {
      // Cylinder base
      const base = shadow(new THREE.Mesh(
        new THREE.CylinderGeometry(hb.r, hb.r, hb.h, 10), mat(STEEL)
      ))
      base.position.set(hb.x, hb.h / 2, hb.z)
      group.add(base)
      // Hemisphere dome
      const dome = shadow(new THREE.Mesh(
        new THREE.SphereGeometry(hb.r, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2), mat(SILVER)
      ))
      dome.position.set(hb.x, hb.h, hb.z)
      group.add(dome)
      // Door
      const door = shadow(new THREE.Mesh(
        new THREE.BoxGeometry(0.8, 1.5, 0.1), mat(DARK_GRAY)
      ))
      door.position.set(hb.x, 0.75, hb.z + hb.r)
      group.add(door)
      // Collider
      const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(hb.x, hb.h / 2 + hb.r * 0.3, hb.z)
      const body = world.createRigidBody(bd)
      world.createCollider(
        RAPIER.ColliderDesc.cylinder(hb.h / 2 + hb.r * 0.3, hb.r).setFriction(0.5), body
      )
    }
  }

  // — Rectangular Modules (2) with antenna arrays —
  {
    const modDefs = [
      { x: 15, z: 35, w: 6, h: 3.5, d: 4 },
      { x: -45, z: 15, w: 5, h: 3, d: 3.5 },
    ]
    for (const m of modDefs) {
      const box = shadow(new THREE.Mesh(
        new THREE.BoxGeometry(m.w, m.h, m.d), mat(STEEL)
      ))
      box.position.set(m.x, m.h / 2, m.z)
      group.add(box)
      // Antenna array on roof
      for (let a = 0; a < 4; a++) {
        const ant = shadow(new THREE.Mesh(
          new THREE.CylinderGeometry(0.03, 0.03, 2.5, 4), mat(SILVER)
        ))
        ant.position.set(m.x - 1.5 + a * 1.0, m.h + 1.25, m.z)
        group.add(ant)
      }
      // Cross elements
      const cross = shadow(new THREE.Mesh(
        new THREE.BoxGeometry(4.0, 0.05, 0.05), mat(SILVER)
      ))
      cross.position.set(m.x, m.h + 2.0, m.z)
      group.add(cross)

      const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(m.x, m.h / 2, m.z)
      const body = world.createRigidBody(bd)
      world.createCollider(
        RAPIER.ColliderDesc.cuboid(m.w / 2, m.h / 2, m.d / 2).setFriction(0.5), body
      )
    }
  }

  // — Control Tower —
  {
    const tx = -21, tz = -27
    const tg = new THREE.Group()
    tg.position.set(tx, 0, tz)

    // Base floor
    const b1 = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(5, 3, 4), mat(STEEL)
    ))
    b1.position.y = 1.5
    tg.add(b1)

    // Middle floor
    const b2 = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(4.5, 3, 3.5), mat(DARK_GRAY)
    ))
    b2.position.y = 4.5
    tg.add(b2)

    // Top observation deck (blue transparent windows)
    const top = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(5.5, 2.5, 4.5), mat(BLUE, { transparent: true, opacity: 0.7 })
    ))
    top.position.y = 7.25
    tg.add(top)

    // Window dividers
    for (let v = -1; v <= 1; v++) {
      const div = shadow(new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 2.5, 0.08), mat(SILVER)
      ))
      div.position.set(v * 1.5, 7.25, 2.26)
      tg.add(div)
    }

    // Roof
    const roof = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(6, 0.2, 5), mat(DARK_GRAY)
    ))
    roof.position.y = 8.6
    tg.add(roof)

    // Radar dome
    const radar = shadow(new THREE.Mesh(
      new THREE.SphereGeometry(1.0, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2), mat(WHITE)
    ))
    radar.position.set(-1.5, 8.7, 0)
    tg.add(radar)

    // Warning light
    const wl = new THREE.Mesh(
      new THREE.SphereGeometry(0.2, 6, 6),
      emissiveMat(RED, RED, 2.0)
    )
    wl.position.set(2.0, 8.9, 0)
    tg.add(wl)
    warningLights.push(wl)

    group.add(tg)

    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(tx, 4.5, tz)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(3.0, 4.5, 2.5).setFriction(0.5), body
    )
  }

  // — Communications Array —
  {
    const cx = 30, cz = -24
    // Tall cylinder
    const mast = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.7, 8, 6), mat(STEEL)
    ))
    mast.position.set(cx, 4, cz)
    group.add(mast)

    // Cross elements at top
    for (let i = 0; i < 3; i++) {
      const cross = shadow(new THREE.Mesh(
        new THREE.BoxGeometry(4, 0.08, 0.08), mat(SILVER)
      ))
      cross.position.set(cx, 7 + i * 0.6, cz)
      group.add(cross)
      const crossZ = shadow(new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 0.08, 4), mat(SILVER)
      ))
      crossZ.position.set(cx, 7 + i * 0.6, cz)
      group.add(crossZ)
    }

    // Warning light
    const wl = new THREE.Mesh(
      new THREE.SphereGeometry(0.15, 6, 6),
      emissiveMat(RED, RED, 2.0)
    )
    wl.position.set(cx, 9, cz)
    group.add(wl)
    warningLights.push(wl)

    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(cx, 4, cz)
    const body = world.createRigidBody(bd)
    world.createCollider(RAPIER.ColliderDesc.cylinder(4, 0.7).setFriction(0.5), body)
  }

  // — Power Station —
  {
    const px = -30, pz = -12
    const ps = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(5, 3, 4), mat(DARK_GRAY)
    ))
    ps.position.set(px, 1.5, pz)
    group.add(ps)

    // Glowing panels on sides
    for (let s = -1; s <= 1; s += 2) {
      const panel = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 2.0, 3.0),
        emissiveMat(CYAN_E, CYAN_E, 1.2)
      )
      panel.position.set(px + s * 2.55, 1.5, pz)
      group.add(panel)
    }

    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(px, 1.5, pz)
    const body = world.createRigidBody(bd)
    world.createCollider(RAPIER.ColliderDesc.cuboid(2.5, 1.5, 2).setFriction(0.5), body)
  }

  // — Greenhouse Dome (semi-transparent green) —
  {
    const gx = 15, gz = -27
    // Base cylinder
    const base = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(4, 4, 1.0, 10), mat(STEEL)
    ))
    base.position.set(gx, 0.5, gz)
    group.add(base)

    // Transparent green dome
    const dome = new THREE.Mesh(
      new THREE.SphereGeometry(4, 10, 8, 0, Math.PI * 2, 0, Math.PI / 2),
      mat(DOME_GREEN, { transparent: true, opacity: 0.4 })
    )
    dome.position.set(gx, 1.0, gz)
    group.add(dome)

    // Internal plant shapes (visible through dome)
    for (let p = 0; p < 6; p++) {
      const pa = (p / 6) * Math.PI * 2
      const pr = 2.0 + Math.random()
      const plant = shadow(new THREE.Mesh(
        new THREE.SphereGeometry(0.5 + Math.random() * 0.3, 5, 4),
        mat(0x33aa44)
      ))
      plant.position.set(
        gx + Math.cos(pa) * pr,
        1.2 + Math.random() * 0.5,
        gz + Math.sin(pa) * pr
      )
      group.add(plant)
    }

    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(gx, 2, gz)
    const body = world.createRigidBody(bd)
    world.createCollider(RAPIER.ColliderDesc.cylinder(2, 4).setFriction(0.5), body)
  }

  // — Landing Bay (open-roof box) —
  {
    const lx = -6, lz = 27
    const wallH = 3
    // 3 walls (open on one side)
    const wallDefs = [
      { dx: 0, dz: -3, w: 8, d: 0.3 },  // back
      { dx: -4, dz: 0, w: 0.3, d: 6 },   // left
      { dx: 4, dz: 0, w: 0.3, d: 6 },    // right
    ]
    for (const wd of wallDefs) {
      const wall = shadow(new THREE.Mesh(
        new THREE.BoxGeometry(wd.w, wallH, wd.d), mat(STEEL)
      ))
      wall.position.set(lx + wd.dx, wallH / 2, lz + wd.dz)
      group.add(wall)
    }
    // Floor
    const floor = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(8, 0.2, 6), mat(DARK_GRAY)
    ))
    floor.position.set(lx, 0.1, lz)
    group.add(floor)

    // Colliders for walls
    for (const wd of wallDefs) {
      const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(lx + wd.dx, wallH / 2, lz + wd.dz)
      const body = world.createRigidBody(bd)
      world.createCollider(
        RAPIER.ColliderDesc.cuboid(wd.w / 2, wallH / 2, wd.d / 2).setFriction(0.5), body
      )
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  // VEHICLES
  // ═══════════════════════════════════════════════════════════════════

  // — Moon Rovers (2) —
  {
    const roverDefs = [
      { x: 35, z: -5, rot: 0.3 },
      { x: -25, z: 35, rot: -0.5 },
    ]
    for (const rv of roverDefs) {
      const rg = new THREE.Group()
      rg.position.set(rv.x, 0, rv.z)
      rg.rotation.y = rv.rot

      // Body
      const body = shadow(new THREE.Mesh(
        new THREE.BoxGeometry(1.8, 0.8, 2.8), mat(SILVER)
      ))
      body.position.y = 0.9
      rg.add(body)

      // Upper instruments
      const upper = shadow(new THREE.Mesh(
        new THREE.BoxGeometry(1.4, 0.4, 1.6), mat(STEEL)
      ))
      upper.position.set(0, 1.5, -0.3)
      rg.add(upper)

      // Thick wheels (4)
      const wheelGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 8)
      const wheelMat = mat(DARK_GRAY)
      const wpos = [[-1.0, 0.4, -1.0], [1.0, 0.4, -1.0], [-1.0, 0.4, 1.0], [1.0, 0.4, 1.0]]
      for (const [wx, wy, wz] of wpos) {
        const wheel = shadow(new THREE.Mesh(wheelGeo, wheelMat))
        wheel.position.set(wx, wy, wz)
        wheel.rotation.z = Math.PI / 2
        rg.add(wheel)
      }

      // Antenna
      const ant = shadow(new THREE.Mesh(
        new THREE.CylinderGeometry(0.03, 0.03, 2.0, 4), mat(STEEL)
      ))
      ant.position.set(-0.5, 2.3, -0.7)
      rg.add(ant)

      // Antenna dish
      const adish = shadow(new THREE.Mesh(
        new THREE.SphereGeometry(0.25, 6, 4, 0, Math.PI * 2, 0, Math.PI / 2), mat(WHITE)
      ))
      adish.position.set(-0.5, 3.3, -0.7)
      rg.add(adish)

      // Solar panel
      const sp = shadow(new THREE.Mesh(
        new THREE.BoxGeometry(2.0, 0.05, 1.2), mat(PANEL_BLUE)
      ))
      sp.position.set(0, 1.9, 0.5)
      rg.add(sp)

      group.add(rg)

      // Collider (account for rotation)
      const halfA = rv.rot * 0.5
      const bd = RAPIER.RigidBodyDesc.fixed()
        .setTranslation(rv.x, 0.9, rv.z)
        .setRotation({ x: 0, y: Math.sin(halfA), z: 0, w: Math.cos(halfA) })
      const b = world.createRigidBody(bd)
      world.createCollider(
        RAPIER.ColliderDesc.cuboid(1.0, 0.9, 1.5).setFriction(0.5), b
      )
    }
  }

  // — Hover Transport —
  {
    const hx = -24, hz = 24
    // Platform body
    const platform = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(4, 0.3, 3), mat(STEEL)
    ))
    platform.position.set(hx, 1.0, hz)
    group.add(platform)

    // Landing legs (4)
    for (let lx = -1; lx <= 1; lx += 2) {
      for (let lz = -1; lz <= 1; lz += 2) {
        const leg = shadow(new THREE.Mesh(
          new THREE.CylinderGeometry(0.1, 0.15, 1.0, 6), mat(DARK_GRAY)
        ))
        leg.position.set(hx + lx * 1.5, 0.5, hz + lz * 1.0)
        group.add(leg)
        // Foot pad
        const foot = shadow(new THREE.Mesh(
          new THREE.CylinderGeometry(0.25, 0.25, 0.08, 6), mat(STEEL)
        ))
        foot.position.set(hx + lx * 1.5, 0.04, hz + lz * 1.0)
        group.add(foot)
      }
    }

    // Engine glow under platform
    const glow = new THREE.Mesh(
      new THREE.CircleGeometry(1.0, 8),
      emissiveMat(CYAN_E, CYAN_E, 0.6)
    )
    glow.rotation.x = -Math.PI / 2
    glow.position.set(hx, 0.85, hz)
    group.add(glow)

    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(hx, 1.0, hz)
    const body = world.createRigidBody(bd)
    world.createCollider(RAPIER.ColliderDesc.cuboid(2, 0.5, 1.5).setFriction(0.5), body)
  }

  // — Mining Vehicle —
  {
    const mx = 30, mz = 18
    const mg = new THREE.Group()
    mg.position.set(mx, 0, mz)

    // Body
    const body = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(2.5, 1.5, 3.5), mat(YELLOW)
    ))
    body.position.y = 1.0
    mg.add(body)

    // Cab
    const cab = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(2.0, 1.0, 1.5), mat(DARK_GRAY)
    ))
    cab.position.set(0, 2.0, -0.8)
    mg.add(cab)

    // Windshield
    const ws = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 0.7, 0.05),
      mat(LIGHT_BLUE, { transparent: true, opacity: 0.5 })
    )
    ws.position.set(0, 2.1, 0.0)
    ws.rotation.x = 0.2
    mg.add(ws)

    // Drill arm
    const drillBase = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.2, 0.3, 1.0, 6), mat(STEEL)
    ))
    drillBase.position.set(0, 2.0, 1.5)
    mg.add(drillBase)

    const drillArm = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.12, 3.0, 6), mat(STEEL)
    ))
    drillArm.position.set(0, 2.0, 3.2)
    drillArm.rotation.x = Math.PI / 2
    mg.add(drillArm)

    // Drill bit
    const drillBit = shadow(new THREE.Mesh(
      new THREE.ConeGeometry(0.25, 0.8, 6), mat(SILVER)
    ))
    drillBit.position.set(0, 2.0, 4.7)
    drillBit.rotation.x = Math.PI / 2
    mg.add(drillBit)

    // Tracks (2 boxes)
    for (let s = -1; s <= 1; s += 2) {
      const track = shadow(new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.6, 3.8), mat(DARK_GRAY)
      ))
      track.position.set(s * 1.3, 0.3, 0)
      mg.add(track)
    }

    group.add(mg)

    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(mx, 1.2, mz)
    const b = world.createRigidBody(bd)
    world.createCollider(RAPIER.ColliderDesc.cuboid(1.5, 1.5, 2.5).setFriction(0.5), b)
  }

  // ═══════════════════════════════════════════════════════════════════
  // ALIEN FLORA — glowing plants (15-20)
  // ═══════════════════════════════════════════════════════════════════
  {
    const floraDefs = [
      { x: 10,  z: 10,  h: 2.5, color: CYAN_E },
      { x: -12, z: 12,  h: 3.0, color: PURPLE_E },
      { x: 8,   z: -10, h: 2.0, color: PINK_E },
      { x: -8,  z: -12, h: 2.8, color: GREEN_E },
      { x: 25,  z: 15,  h: 3.2, color: CYAN_E },
      { x: -25, z: -15, h: 2.4, color: PURPLE_E },
      { x: 30,  z: 10,  h: 2.6, color: PINK_E },
      { x: -30, z: 10,  h: 3.5, color: GREEN_E },
      { x: 15,  z: -35, h: 2.2, color: CYAN_E },
      { x: -15, z: 35,  h: 2.9, color: PURPLE_E },
      { x: 40,  z: -45, h: 2.0, color: PINK_E },
      { x: -45, z: -35, h: 3.0, color: GREEN_E },
      { x: 50,  z: 10,  h: 2.7, color: CYAN_E },
      { x: -50, z: 10,  h: 2.3, color: PURPLE_E },
      { x: 35,  z: 50,  h: 3.1, color: PINK_E },
      { x: -35, z: -50, h: 2.5, color: GREEN_E },
      { x: 45,  z: 45,  h: 2.8, color: CYAN_E },
      { x: -48, z: 45,  h: 3.3, color: PURPLE_E },
    ]
    for (const f of floraDefs) {
      // Stalk
      const stalk = shadow(new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.1, f.h, 5), mat(0x224422)
      ))
      stalk.position.set(f.x, f.h / 2, f.z)
      group.add(stalk)

      // Bulbous tip (emissive sphere)
      const tipMat = emissiveMat(f.color, f.color, 1.5)
      const tip = new THREE.Mesh(
        new THREE.SphereGeometry(0.3 + Math.random() * 0.2, 7, 5), tipMat
      )
      tip.position.set(f.x, f.h + 0.15, f.z)
      group.add(tip)

      alienPlants.push({ mesh: tip, material: tipMat, baseIntensity: 1.5, phase: Math.random() * Math.PI * 2 })
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  // CRYSTAL FORMATIONS (10)
  // ═══════════════════════════════════════════════════════════════════
  {
    const crystalDefs = [
      { x: 5,   z: 30,  s: 1.2, color: 0x8844cc },
      { x: -5,  z: -30, s: 1.0, color: 0x4466cc },
      { x: 30,  z: 5,   s: 1.4, color: 0x8844cc },
      { x: -30, z: -5,  s: 0.9, color: 0x4466cc },
      { x: 40,  z: 40,  s: 1.1, color: 0x8844cc },
      { x: -40, z: 40,  s: 1.3, color: 0x4466cc },
      { x: 45,  z: -25, s: 1.0, color: 0x8844cc },
      { x: -45, z: -25, s: 0.8, color: 0x4466cc },
      { x: 10,  z: 50,  s: 1.2, color: 0x8844cc },
      { x: -10, z: -50, s: 1.1, color: 0x4466cc },
    ]
    for (const c of crystalDefs) {
      const crystalMat = emissiveMat(c.color, c.color, 0.8, { transparent: true, opacity: 0.7 })
      // Main crystal (elongated dodecahedron)
      const crystal = shadow(new THREE.Mesh(
        new THREE.DodecahedronGeometry(0.6 * c.s, 0), crystalMat
      ))
      crystal.scale.set(0.5, 1.5, 0.5)
      crystal.position.set(c.x, 1.0 * c.s, c.z)
      crystal.rotation.set(Math.random() * 0.3, Math.random() * Math.PI, Math.random() * 0.3)
      group.add(crystal)

      // Smaller crystal beside
      const crystal2 = shadow(new THREE.Mesh(
        new THREE.DodecahedronGeometry(0.35 * c.s, 0), crystalMat
      ))
      crystal2.scale.set(0.4, 1.2, 0.4)
      crystal2.position.set(c.x + 0.5, 0.6 * c.s, c.z + 0.4)
      crystal2.rotation.set(0.2, Math.random() * Math.PI, -0.15)
      group.add(crystal2)

      crystals.push({ mesh: crystal, material: crystalMat, phase: Math.random() * Math.PI * 2 })
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  // ALIEN MUSHROOM CLUSTERS (8)
  // ═══════════════════════════════════════════════════════════════════
  {
    const mushDefs = [
      { x: 12,  z: 25,  color: 0x44ffaa },
      { x: -12, z: -25, color: 0xff44aa },
      { x: 35,  z: -15, color: 0x44aaff },
      { x: -35, z: 20,  color: 0xaaff44 },
      { x: 20,  z: -50, color: 0x44ffaa },
      { x: -20, z: 50,  color: 0xff44aa },
      { x: 50,  z: 0,   color: 0x44aaff },
      { x: -50, z: 0,   color: 0xaaff44 },
    ]
    for (const m of mushDefs) {
      // 2-3 mushrooms per cluster
      const count = 2 + Math.floor(Math.random() * 2)
      for (let i = 0; i < count; i++) {
        const ox = (Math.random() - 0.5) * 1.5
        const oz = (Math.random() - 0.5) * 1.5
        const h = 0.6 + Math.random() * 1.0
        const r = 0.3 + Math.random() * 0.3

        // Stem
        const stem = shadow(new THREE.Mesh(
          new THREE.CylinderGeometry(0.06, 0.1, h, 5), mat(0x888888)
        ))
        stem.position.set(m.x + ox, h / 2, m.z + oz)
        group.add(stem)

        // Cap (flat hemisphere)
        const cap = shadow(new THREE.Mesh(
          new THREE.SphereGeometry(r, 7, 4, 0, Math.PI * 2, 0, Math.PI / 2.5),
          emissiveMat(m.color, m.color, 0.8)
        ))
        cap.position.set(m.x + ox, h, m.z + oz)
        group.add(cap)
      }
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  // GLOWING GROUND PATCHES (10)
  // ═══════════════════════════════════════════════════════════════════
  {
    const patchDefs = [
      { x: 8,   z: 8,   r: 1.2, color: CYAN_E },
      { x: -8,  z: -8,  r: 1.0, color: PURPLE_E },
      { x: 25,  z: -20, r: 1.5, color: GREEN_E },
      { x: -25, z: 20,  r: 1.3, color: PINK_E },
      { x: 40,  z: 35,  r: 1.0, color: CYAN_E },
      { x: -40, z: -35, r: 1.4, color: PURPLE_E },
      { x: 15,  z: 45,  r: 1.1, color: GREEN_E },
      { x: -15, z: -45, r: 0.9, color: PINK_E },
      { x: 50,  z: -5,  r: 1.2, color: CYAN_E },
      { x: -50, z: 5,   r: 1.0, color: PURPLE_E },
    ]
    for (const p of patchDefs) {
      const patch = new THREE.Mesh(
        new THREE.CircleGeometry(p.r, 10),
        emissiveMat(p.color, p.color, 0.4, { transparent: true, opacity: 0.3 })
      )
      patch.rotation.x = -Math.PI / 2
      patch.position.set(p.x, 0.02, p.z)
      group.add(patch)
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  // CRATERS (10)
  // ═══════════════════════════════════════════════════════════════════
  {
    const craterDefs = [
      { x: -15, z: -10, r: 3.0 },
      { x: 20,  z: 25,  r: 2.5 },
      { x: -15, z: 42,  r: 4.0 },
      { x: 35,  z: -20, r: 2.8 },
      { x: -50, z: -45, r: 3.5 },
      { x: 50,  z: 45,  r: 2.2 },
      { x: 10,  z: -45, r: 3.0 },
      { x: -45, z: 50,  r: 2.6 },
      { x: 55,  z: 15,  r: 2.0 },
      { x: -55, z: -15, r: 3.2 },
    ]
    for (const c of craterDefs) {
      // Dark center
      const center = new THREE.Mesh(
        new THREE.CircleGeometry(c.r * 0.7, 10),
        mat(CRATER)
      )
      center.rotation.x = -Math.PI / 2
      center.position.set(c.x, 0.015, c.z)
      group.add(center)

      // Raised rim (low torus)
      const rim = shadow(new THREE.Mesh(
        new THREE.TorusGeometry(c.r, 0.15, 5, 12),
        mat(DARK_ROCK)
      ))
      rim.rotation.x = Math.PI / 2
      rim.position.set(c.x, 0.08, c.z)
      group.add(rim)
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  // ROCKY TERRAIN — scattered rocks (20+)
  // ═══════════════════════════════════════════════════════════════════
  {
    const rockPositions = [
      [-8, -35], [12, -40], [-18, 28], [28, -12], [-38, -22],
      [42, 25], [-42, 32], [20, 48], [-20, -48], [48, -35],
      [-48, 38], [5, 40], [-5, -38], [38, 8], [-38, -8],
      [55, -50], [-55, 50], [25, 55], [-25, -55], [0, 55],
      [0, -55], [55, 0], [-55, 0],
    ]
    const rockGeo = new THREE.DodecahedronGeometry(0.5, 0)
    for (const [rx, rz] of rockPositions) {
      const scale = 0.5 + Math.random() * 1.5
      const rock = shadow(new THREE.Mesh(rockGeo, mat(DARK_ROCK)))
      rock.scale.set(scale, scale * 0.6, scale)
      rock.position.set(rx, scale * 0.2, rz)
      rock.rotation.set(Math.random(), Math.random(), Math.random())
      group.add(rock)
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  // ALIEN GEYSERS (4, animated)
  // ═══════════════════════════════════════════════════════════════════
  {
    const geyserDefs = [
      { x: -20, z: 15 },
      { x: 15,  z: -15 },
      { x: -40, z: -50 },
      { x: 45,  z: 50 },
    ]
    for (const g of geyserDefs) {
      // Base vent
      const vent = shadow(new THREE.Mesh(
        new THREE.CylinderGeometry(0.3, 0.5, 0.5, 6), mat(DARK_ROCK)
      ))
      vent.position.set(g.x, 0.25, g.z)
      group.add(vent)

      // Geyser column (thin cylinder)
      const col = shadow(new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.15, 2.5, 6), mat(STEEL)
      ))
      col.position.set(g.x, 1.5, g.z)
      group.add(col)

      // Glowing mist at top
      const mistMat = emissiveMat(CYAN_E, CYAN_E, 1.5, { transparent: true, opacity: 0.4 })
      const mist = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 6, 5), mistMat
      )
      mist.position.set(g.x, 3.0, g.z)
      group.add(mist)

      geysers.push({ mesh: mist, material: mistMat, phase: Math.random() * Math.PI * 2 })
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  // CONNECTED WALKWAYS / ROADS between buildings
  // ═══════════════════════════════════════════════════════════════════
  {
    // Metal gray plates connecting the 4 portfolio buildings
    const walkDefs = [
      { x: 0,  z: 0,  w: 3, d: 40, rot: 0 },     // N-S main path
      { x: 0,  z: 0,  w: 40, d: 3, rot: 0 },      // E-W main path
      // Diagonal paths to corners
      { x: 10,  z: -10, w: 2, d: 14, rot: Math.PI / 4 },
      { x: -10, z: 10,  w: 2, d: 14, rot: Math.PI / 4 },
    ]
    for (const w of walkDefs) {
      const plate = new THREE.Mesh(
        new THREE.BoxGeometry(w.w, 0.08, w.d),
        mat(0x555566)
      )
      plate.position.set(w.x, 0.04, w.z)
      plate.rotation.y = w.rot
      plate.receiveShadow = true
      group.add(plate)
    }

    // Metal grate details along main paths
    for (let i = -18; i <= 18; i += 4) {
      // N-S direction
      const grateNS = new THREE.Mesh(
        new THREE.PlaneGeometry(2.8, 0.1), mat(0x444455)
      )
      grateNS.rotation.x = -Math.PI / 2
      grateNS.position.set(0, 0.085, i)
      group.add(grateNS)

      // E-W direction
      const grateEW = new THREE.Mesh(
        new THREE.PlaneGeometry(0.1, 2.8), mat(0x444455)
      )
      grateEW.rotation.x = -Math.PI / 2
      grateEW.position.set(i, 0.085, 0)
      group.add(grateEW)
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  // SOLAR PANEL ARRAYS (6)
  // ═══════════════════════════════════════════════════════════════════
  {
    const solarDefs = [
      { x: -15, z: -30, rot: 0 },
      { x: 20,  z: -35, rot: 0.3 },
      { x: -40, z: 5,   rot: -0.2 },
      { x: 45,  z: 5,   rot: 0.4 },
      { x: -10, z: 50,  rot: 0 },
      { x: 30,  z: 45,  rot: -0.3 },
    ]
    for (const s of solarDefs) {
      const sg = new THREE.Group()
      sg.position.set(s.x, 0, s.z)
      sg.rotation.y = s.rot

      // Support pole
      const pole = shadow(new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.15, 2.5, 6), mat(STEEL)
      ))
      pole.position.y = 1.25
      sg.add(pole)

      // Panel grid (2x3)
      for (let px = 0; px < 3; px++) {
        for (let pz = 0; pz < 2; pz++) {
          const panel = shadow(new THREE.Mesh(
            new THREE.BoxGeometry(1.2, 0.06, 0.9), mat(PANEL_BLUE)
          ))
          panel.position.set(-1.2 + px * 1.3, 2.6, -0.5 + pz * 1.0)
          panel.rotation.x = -0.3
          sg.add(panel)
        }
      }

      group.add(sg)
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  // FUEL TANKS (4 horizontal cylinders)
  // ═══════════════════════════════════════════════════════════════════
  {
    const tankDefs = [
      { x: 25,  z: -10, rot: 0.3 },
      { x: -25, z: -10, rot: -0.2 },
      { x: 35,  z: 30,  rot: 0.5 },
      { x: -35, z: 30,  rot: -0.4 },
    ]
    for (const t of tankDefs) {
      const tg = new THREE.Group()
      tg.position.set(t.x, 0, t.z)
      tg.rotation.y = t.rot

      // Tank body (horizontal)
      const tank = shadow(new THREE.Mesh(
        new THREE.CylinderGeometry(0.7, 0.7, 3.5, 8), mat(WHITE)
      ))
      tank.position.y = 0.8
      tank.rotation.z = Math.PI / 2
      tg.add(tank)

      // End caps
      for (let s = -1; s <= 1; s += 2) {
        const cap = shadow(new THREE.Mesh(
          new THREE.SphereGeometry(0.7, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2), mat(WHITE)
        ))
        cap.position.set(s * 1.75, 0.8, 0)
        cap.rotation.z = s > 0 ? -Math.PI / 2 : Math.PI / 2
        tg.add(cap)
      }

      // Supports
      for (let ci = -1; ci <= 1; ci += 2) {
        const cradle = shadow(new THREE.Mesh(
          new THREE.BoxGeometry(0.15, 0.6, 0.9), mat(STEEL)
        ))
        cradle.position.set(ci * 0.9, 0.3, 0)
        tg.add(cradle)
      }

      // Warning stripe
      const ws = shadow(new THREE.Mesh(
        new THREE.CylinderGeometry(0.72, 0.72, 0.2, 8), mat(RED)
      ))
      ws.position.y = 0.8
      ws.rotation.z = Math.PI / 2
      tg.add(ws)

      group.add(tg)
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  // EQUIPMENT CONTAINERS (8)
  // ═══════════════════════════════════════════════════════════════════
  {
    const contDefs = [
      { x: -20, z: -30, color: WHITE, rot: 0.1 },
      { x: -18, z: -31, color: STEEL, rot: -0.1 },
      { x: 40,  z: -10, color: BLUE, rot: 0.3 },
      { x: 38,  z: -8,  color: RED, rot: -0.2 },
      { x: -40, z: 30,  color: ORANGE, rot: 0 },
      { x: -38, z: 28,  color: STEEL, rot: 0.5 },
      { x: 20,  z: 45,  color: WHITE, rot: -0.3 },
      { x: 22,  z: 43,  color: BLUE, rot: 0.2 },
    ]
    for (const c of contDefs) {
      const cont = shadow(new THREE.Mesh(
        new THREE.BoxGeometry(2.5, 1.5, 1.2), mat(c.color)
      ))
      cont.position.set(c.x, 0.75, c.z)
      cont.rotation.y = c.rot
      group.add(cont)
      // Ribs
      for (let r = 0; r < 4; r++) {
        const rib = shadow(new THREE.Mesh(
          new THREE.BoxGeometry(0.06, 1.5, 1.22), mat(DARK_GRAY)
        ))
        rib.position.set(c.x - 0.9 + r * 0.6, 0.75, c.z)
        rib.rotation.y = c.rot
        group.add(rib)
      }
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  // CONTROL PANELS (5)
  // ═══════════════════════════════════════════════════════════════════
  {
    const panelDefs = [
      { x: 8,   z: -18, rot: 0 },
      { x: 18,  z: 8,   rot: -1.5 },
      { x: -8,  z: 18,  rot: Math.PI },
      { x: -18, z: -8,  rot: 1.5 },
      { x: 30,  z: -28, rot: 0.3 },
    ]
    for (const p of panelDefs) {
      const pg = new THREE.Group()
      pg.position.set(p.x, 0, p.z)
      pg.rotation.y = p.rot

      // Body
      const body = shadow(new THREE.Mesh(
        new THREE.BoxGeometry(0.8, 1.2, 0.4), mat(DARK_GRAY)
      ))
      body.position.y = 0.6
      pg.add(body)

      // Emissive screen
      const screen = new THREE.Mesh(
        new THREE.BoxGeometry(0.6, 0.5, 0.02),
        emissiveMat(0x003322, GREEN_E, 1.5)
      )
      screen.position.set(0, 0.9, 0.21)
      pg.add(screen)

      // Buttons
      const btnColors = [RED, YELLOW, GREEN_E]
      for (let b = 0; b < 3; b++) {
        const btn = new THREE.Mesh(
          new THREE.SphereGeometry(0.04, 6, 4),
          emissiveMat(btnColors[b], btnColors[b], 0.8)
        )
        btn.position.set(-0.15 + b * 0.15, 0.55, 0.21)
        pg.add(btn)
      }

      // Pedestal
      const ped = shadow(new THREE.Mesh(
        new THREE.BoxGeometry(0.3, 0.3, 0.3), mat(STEEL)
      ))
      ped.position.y = 0.15
      pg.add(ped)

      group.add(pg)
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  // TELESCOPES (3)
  // ═══════════════════════════════════════════════════════════════════
  {
    const teleDefs = [
      { x: -50, z: 40 },
      { x: 50,  z: -50 },
      { x: -55, z: -40 },
    ]
    for (const t of teleDefs) {
      const tg = new THREE.Group()
      tg.position.set(t.x, 0, t.z)

      // Tripod
      for (let i = 0; i < 3; i++) {
        const a = (i / 3) * Math.PI * 2
        const leg = shadow(new THREE.Mesh(
          new THREE.CylinderGeometry(0.04, 0.04, 1.8, 4), mat(DARK_GRAY)
        ))
        leg.position.set(Math.cos(a) * 0.4, 0.8, Math.sin(a) * 0.4)
        leg.rotation.x = Math.sin(a) * 0.25
        leg.rotation.z = -Math.cos(a) * 0.25
        tg.add(leg)
      }

      // Tube
      const tube = shadow(new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.18, 1.5, 8), mat(WHITE)
      ))
      tube.position.set(0, 1.6, 0)
      tube.rotation.z = 0.6
      tg.add(tube)

      // Lens
      const lens = new THREE.Mesh(
        new THREE.CircleGeometry(0.18, 8),
        emissiveMat(LIGHT_BLUE, CYAN_E, 0.3)
      )
      lens.position.set(0.55, 2.1, 0)
      lens.rotation.y = Math.PI / 2
      lens.rotation.z = 0.6
      tg.add(lens)

      group.add(tg)
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  // WARNING LIGHTS ON PYLONS (4)
  // ═══════════════════════════════════════════════════════════════════
  {
    const pylonDefs = [
      { x: 10,  z: -25 },
      { x: -10, z: 25 },
      { x: 25,  z: 10 },
      { x: -25, z: -10 },
    ]
    for (const p of pylonDefs) {
      // Pylon
      const pylon = shadow(new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.12, 4, 6), mat(STEEL)
      ))
      pylon.position.set(p.x, 2, p.z)
      group.add(pylon)

      // Light
      const wl = new THREE.Mesh(
        new THREE.SphereGeometry(0.18, 6, 6),
        emissiveMat(RED, RED, 2.0)
      )
      wl.position.set(p.x, 4.1, p.z)
      group.add(wl)
      warningLights.push(wl)
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  // ANTENNA TOWERS (5)
  // ═══════════════════════════════════════════════════════════════════
  {
    const antDefs = [
      { x: -33, z: 0 },
      { x: 33,  z: 0 },
      { x: 0,   z: 33 },
      { x: 0,   z: -33 },
      { x: -18, z: 30 },
    ]
    for (const a of antDefs) {
      const mast = shadow(new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.08, 6, 4), mat(STEEL)
      ))
      mast.position.set(a.x, 3, a.z)
      group.add(mast)

      // Elements
      for (let e = 0; e < 3; e++) {
        const el = shadow(new THREE.Mesh(
          new THREE.BoxGeometry(1.5, 0.04, 0.04), mat(SILVER)
        ))
        el.position.set(a.x, 5 + e * 0.5, a.z)
        group.add(el)
      }

      // Tip light
      const tip = new THREE.Mesh(
        new THREE.SphereGeometry(0.08, 6, 4),
        emissiveMat(RED, RED, 1.5)
      )
      tip.position.set(a.x, 6.1, a.z)
      group.add(tip)
      warningLights.push(tip)
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  // CABLE RUNS (connecting structures)
  // ═══════════════════════════════════════════════════════════════════
  {
    const cableDefs = [
      { x1: 0, z1: -20, x2: 15, z2: 35 },
      { x1: 20, z1: 0, x2: -20, z2: 0 },
      { x1: 0, z1: 20, x2: 30, z2: -30 },
    ]
    for (const c of cableDefs) {
      const dx = c.x2 - c.x1
      const dz = c.z2 - c.z1
      const len = Math.sqrt(dx * dx + dz * dz)
      const angle = Math.atan2(dx, dz)

      const cable = new THREE.Mesh(
        new THREE.CylinderGeometry(0.03, 0.03, len, 4),
        mat(0x555555)
      )
      cable.position.set((c.x1 + c.x2) / 2, 0.03, (c.z1 + c.z2) / 2)
      cable.rotation.y = angle
      cable.rotation.z = Math.PI / 2
      cable.rotation.order = 'YZX'
      group.add(cable)
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  // OXYGEN TANKS near buildings (static decorations, 6)
  // ═══════════════════════════════════════════════════════════════════
  {
    const o2Defs = [
      { x: 3,   z: -22 },
      { x: -3,  z: -22 },
      { x: 22,  z: 3 },
      { x: -22, z: -3 },
      { x: 3,   z: 22 },
      { x: -3,  z: 22 },
    ]
    for (const o of o2Defs) {
      const tank = shadow(new THREE.Mesh(
        new THREE.CylinderGeometry(0.15, 0.15, 0.6, 6), mat(WHITE)
      ))
      tank.position.set(o.x, 0.3, o.z)
      group.add(tank)
      // Cap
      const cap = shadow(new THREE.Mesh(
        new THREE.SphereGeometry(0.15, 6, 4, 0, Math.PI * 2, 0, Math.PI / 2), mat(SILVER)
      ))
      cap.position.set(o.x, 0.6, o.z)
      group.add(cap)
      // Valve
      const valve = shadow(new THREE.Mesh(
        new THREE.CylinderGeometry(0.03, 0.03, 0.12, 4), mat(RED)
      ))
      valve.position.set(o.x, 0.7, o.z)
      group.add(valve)
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  // ROBOTIC ARM
  // ═══════════════════════════════════════════════════════════════════
  {
    const ax = 18, az = 9
    // Base
    const base = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.6, 0.8, 0.5, 8), mat(STEEL)
    ))
    base.position.set(ax, 0.25, az)
    group.add(base)

    // Lower arm
    const arm1 = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.15, 2.5, 6), mat(SILVER)
    ))
    arm1.position.set(ax, 1.5, az)
    arm1.rotation.z = 0.3
    group.add(arm1)

    // Joint
    const joint = shadow(new THREE.Mesh(
      new THREE.SphereGeometry(0.2, 6, 6), mat(RED)
    ))
    joint.position.set(ax + 0.75, 2.7, az)
    group.add(joint)

    // Upper arm
    const arm2 = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.12, 2.0, 6), mat(SILVER)
    ))
    arm2.position.set(ax + 1.3, 2.2, az)
    arm2.rotation.z = -0.8
    group.add(arm2)

    // Gripper
    for (let s = -1; s <= 1; s += 2) {
      const grip = shadow(new THREE.Mesh(
        new THREE.BoxGeometry(0.05, 0.4, 0.08), mat(DARK_GRAY)
      ))
      grip.position.set(ax + 1.9 + s * 0.08, 1.5, az)
      group.add(grip)
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  // ASTRONAUT FIGURES (4)
  // ═══════════════════════════════════════════════════════════════════
  {
    const astroDefs = [
      { x: 1.5, z: -17, rot: 0 },       // in front of About Me house
      { x: 18,  z: 5,   rot: -1.5 },
      { x: -5,  z: 18,  rot: Math.PI },
      { x: -18, z: -5,  rot: 1.5 },      // near Experience building (was at 32,-28 which is too far)
    ]
    for (const a of astroDefs) {
      const ag = new THREE.Group()
      ag.position.set(a.x, 0, a.z)
      ag.rotation.y = a.rot

      // Legs — thicker with knee joints
      for (let s = -1; s <= 1; s += 2) {
        // Upper leg
        const upperLeg = shadow(new THREE.Mesh(
          new THREE.CylinderGeometry(0.14, 0.13, 0.45, 8), mat(WHITE)
        ))
        upperLeg.position.set(s * 0.18, 0.58, 0)
        ag.add(upperLeg)
        // Knee pad
        const kneePad = shadow(new THREE.Mesh(
          new THREE.BoxGeometry(0.18, 0.12, 0.2), mat(SILVER)
        ))
        kneePad.position.set(s * 0.18, 0.38, 0.06)
        ag.add(kneePad)
        // Lower leg
        const lowerLeg = shadow(new THREE.Mesh(
          new THREE.CylinderGeometry(0.13, 0.15, 0.35, 8), mat(WHITE)
        ))
        lowerLeg.position.set(s * 0.18, 0.18, 0)
        ag.add(lowerLeg)
        // Boots — chunkier
        const boot = shadow(new THREE.Mesh(
          new THREE.BoxGeometry(0.24, 0.18, 0.35), mat(DARK_GRAY)
        ))
        boot.position.set(s * 0.18, 0.05, 0.04)
        ag.add(boot)
        // Boot sole
        const sole = shadow(new THREE.Mesh(
          new THREE.BoxGeometry(0.26, 0.04, 0.37), mat(BLACK)
        ))
        sole.position.set(s * 0.18, -0.02, 0.04)
        ag.add(sole)
      }

      // Body — torso with chest panel
      const torso = shadow(new THREE.Mesh(
        new THREE.BoxGeometry(0.6, 0.75, 0.4), mat(WHITE)
      ))
      torso.position.y = 1.18
      ag.add(torso)

      // Chest control panel
      const chestPanel = shadow(new THREE.Mesh(
        new THREE.BoxGeometry(0.3, 0.25, 0.06), mat(DARK_GRAY)
      ))
      chestPanel.position.set(0, 1.2, 0.22)
      ag.add(chestPanel)
      // Panel buttons (colored dots)
      for (let bi = 0; bi < 3; bi++) {
        const btn = new THREE.Mesh(
          new THREE.SphereGeometry(0.025, 6, 4),
          emissiveMat([RED, GREEN_E, LIGHT_BLUE][bi], [RED, GREEN_E, LIGHT_BLUE][bi], 0.8)
        )
        btn.position.set(-0.08 + bi * 0.08, 1.25, 0.26)
        ag.add(btn)
      }

      // Belt
      const belt = shadow(new THREE.Mesh(
        new THREE.BoxGeometry(0.62, 0.08, 0.42), mat(SILVER)
      ))
      belt.position.y = 0.82
      ag.add(belt)

      // Backpack — life support with tubes
      const backpack = shadow(new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.55, 0.25), mat(SILVER)
      ))
      backpack.position.set(0, 1.18, -0.3)
      ag.add(backpack)
      // Backpack details — oxygen tanks
      for (let s = -1; s <= 1; s += 2) {
        const tank = shadow(new THREE.Mesh(
          new THREE.CylinderGeometry(0.06, 0.06, 0.4, 6), mat(STEEL)
        ))
        tank.position.set(s * 0.14, 1.2, -0.45)
        ag.add(tank)
        // Tank cap
        const cap = shadow(new THREE.Mesh(
          new THREE.SphereGeometry(0.06, 6, 4), mat(STEEL)
        ))
        cap.position.set(s * 0.14, 1.42, -0.45)
        ag.add(cap)
      }

      // Arms — with elbow bend
      for (let s = -1; s <= 1; s += 2) {
        // Shoulder joint
        const shoulder = shadow(new THREE.Mesh(
          new THREE.SphereGeometry(0.1, 6, 5), mat(WHITE)
        ))
        shoulder.position.set(s * 0.4, 1.4, 0)
        ag.add(shoulder)
        // Upper arm
        const upperArm = shadow(new THREE.Mesh(
          new THREE.CylinderGeometry(0.09, 0.08, 0.35, 6), mat(WHITE)
        ))
        upperArm.position.set(s * 0.42, 1.18, 0)
        upperArm.rotation.z = s * 0.15
        ag.add(upperArm)
        // Lower arm
        const lowerArm = shadow(new THREE.Mesh(
          new THREE.CylinderGeometry(0.08, 0.08, 0.3, 6), mat(WHITE)
        ))
        lowerArm.position.set(s * 0.48, 0.95, 0.08)
        lowerArm.rotation.z = s * 0.3
        lowerArm.rotation.x = -0.3
        ag.add(lowerArm)
        // Gloves — chunkier
        const glove = shadow(new THREE.Mesh(
          new THREE.BoxGeometry(0.12, 0.1, 0.14), mat(SILVER)
        ))
        glove.position.set(s * 0.52, 0.8, 0.12)
        ag.add(glove)
      }

      // Head — helmet with more detail
      const helmet = shadow(new THREE.Mesh(
        new THREE.SphereGeometry(0.26, 10, 8), mat(WHITE)
      ))
      helmet.position.y = 1.76
      ag.add(helmet)

      // Helmet rim (ring around the base)
      const helmRim = shadow(new THREE.Mesh(
        new THREE.TorusGeometry(0.24, 0.03, 6, 12), mat(SILVER)
      ))
      helmRim.position.y = 1.58
      helmRim.rotation.x = Math.PI / 2
      ag.add(helmRim)

      // Visor — golden reflective
      const visor = new THREE.Mesh(
        new THREE.SphereGeometry(0.22, 10, 8, 0, Math.PI, 0, Math.PI * 0.55),
        emissiveMat(0x443300, 0x886600, 0.4, { metalness: 0.8, roughness: 0.1 })
      )
      visor.position.set(0, 1.76, 0.1)
      visor.rotation.x = -Math.PI / 2
      ag.add(visor)

      // Antenna on helmet
      const antenna = shadow(new THREE.Mesh(
        new THREE.CylinderGeometry(0.015, 0.015, 0.3, 4), mat(STEEL)
      ))
      antenna.position.set(0.15, 2.05, -0.05)
      ag.add(antenna)
      const antennaTip = new THREE.Mesh(
        new THREE.SphereGeometry(0.03, 6, 4),
        emissiveMat(RED, RED, 1.0)
      )
      antennaTip.position.set(0.15, 2.22, -0.05)
      ag.add(antennaTip)

      // Flag patch on arm (small colored rectangle)
      const flag = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.06, 0.01),
        new THREE.MeshStandardMaterial({ color: 0xcc3333, flatShading: true })
      )
      flag.position.set(-0.35, 1.3, 0.12)
      ag.add(flag)

      group.add(ag)

      // Collider so car can't drive through
      const astroBd = RAPIER.RigidBodyDesc.fixed().setTranslation(a.x, 1.0, a.z)
      const astroBody = world.createRigidBody(astroBd)
      world.createCollider(
        RAPIER.ColliderDesc.cuboid(0.35, 1.0, 0.3).setFriction(0.5), astroBody
      )
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  // DYNAMIC OBJECTS — pushable!
  // ═══════════════════════════════════════════════════════════════════

  // — Supply Crates (6, dynamic) —
  {
    const crateDefs = [
      { x: 5,   z: 5 },
      { x: -5,  z: 5 },
      { x: 5,   z: -5 },
      { x: -5,  z: -5 },
      { x: 12,  z: -12 },
      { x: -12, z: 12 },
    ]
    for (const c of crateDefs) {
      const size = 0.4
      const crateMesh = shadow(new THREE.Mesh(
        new THREE.BoxGeometry(size * 2, size * 2, size * 2), mat(STEEL)
      ))
      crateMesh.position.set(c.x, size, c.z)
      group.add(crateMesh)

      // Orange stripe
      const stripe = shadow(new THREE.Mesh(
        new THREE.BoxGeometry(size * 2.02, 0.12, size * 2.02), mat(ORANGE)
      ))
      stripe.position.set(c.x, size, c.z)
      group.add(stripe)

      const bd = RAPIER.RigidBodyDesc.dynamic()
        .setTranslation(c.x, size, c.z)
        .setLinearDamping(0.4).setAngularDamping(0.5)
      const body = world.createRigidBody(bd)
      world.createCollider(
        RAPIER.ColliderDesc.cuboid(size, size, size)
          .setDensity(4.0).setFriction(0.5).setRestitution(0.15), body
      )
      syncList.push({ mesh: crateMesh, body })
    }
  }

  // — Fuel Barrels (4, dynamic) —
  {
    const barrelDefs = [
      { x: 8,   z: 15 },
      { x: -8,  z: -15 },
      { x: 15,  z: 8 },
      { x: -15, z: -8 },
    ]
    for (const b of barrelDefs) {
      const barrelGroup = new THREE.Group()

      const barrelMesh = shadow(new THREE.Mesh(
        new THREE.CylinderGeometry(0.3, 0.35, 0.9, 8), mat(RED)
      ))
      barrelMesh.position.set(0, 0, 0)
      barrelGroup.add(barrelMesh)

      // Band
      const band = shadow(new THREE.Mesh(
        new THREE.CylinderGeometry(0.36, 0.36, 0.1, 8), mat(YELLOW)
      ))
      band.position.set(0, 0.1, 0)
      barrelGroup.add(band)

      barrelGroup.position.set(b.x, 0.45, b.z)
      group.add(barrelGroup)

      const bd = RAPIER.RigidBodyDesc.dynamic()
        .setTranslation(b.x, 0.45, b.z)
        .setLinearDamping(0.3).setAngularDamping(0.4)
      const body = world.createRigidBody(bd)
      world.createCollider(
        RAPIER.ColliderDesc.cylinder(0.45, 0.35)
          .setDensity(5.0).setFriction(0.4).setRestitution(0.2), body
      )
      syncList.push({ mesh: barrelGroup, body })
    }
  }

  // — Satellites on Stands (3, dynamic — knock them over!) —
  {
    const satDefs = [
      { x: -10, z: -35 },
      { x: 40,  z: 10 },
      { x: -30, z: 45 },
    ]
    for (const s of satDefs) {
      const sg = new THREE.Group()

      // Satellite body
      const satBody = shadow(new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.5, 0.5), mat(SILVER)
      ))
      sg.add(satBody)

      // Solar wings
      for (let side = -1; side <= 1; side += 2) {
        const wing = shadow(new THREE.Mesh(
          new THREE.BoxGeometry(0.8, 0.04, 0.4), mat(PANEL_BLUE)
        ))
        wing.position.set(side * 0.65, 0, 0)
        sg.add(wing)
      }

      // Antenna
      const ant = shadow(new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.02, 0.4, 4), mat(STEEL)
      ))
      ant.position.y = 0.45
      sg.add(ant)

      sg.position.set(s.x, 1.3, s.z)
      group.add(sg)

      // Stand (visual only)
      const stand = shadow(new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.12, 1.2, 6), mat(STEEL)
      ))
      stand.position.set(s.x, 0.6, s.z)
      group.add(stand)
      const standBase = shadow(new THREE.Mesh(
        new THREE.CylinderGeometry(0.3, 0.3, 0.1, 6), mat(DARK_GRAY)
      ))
      standBase.position.set(s.x, 0.05, s.z)
      group.add(standBase)

      const bd = RAPIER.RigidBodyDesc.dynamic()
        .setTranslation(s.x, 1.3, s.z)
        .setLinearDamping(0.3).setAngularDamping(0.4)
      const body = world.createRigidBody(bd)
      world.createCollider(
        RAPIER.ColliderDesc.cuboid(0.65, 0.25, 0.25)
          .setDensity(2.0).setFriction(0.4).setRestitution(0.3), body
      )
      syncList.push({ mesh: sg, body })
    }
  }

  // — Alien Crystals (5, dynamic — low density, scatter easily!) —
  {
    const acDefs = [
      { x: 7,   z: 7,   color: 0xaa44ff },
      { x: -7,  z: -7,  color: 0x44aaff },
      { x: 10,  z: -10, color: 0xff44aa },
      { x: -10, z: 10,  color: 0x44ff88 },
      { x: 15,  z: 15,  color: 0xaa44ff },
    ]
    for (const c of acDefs) {
      const crystalMat = emissiveMat(c.color, c.color, 1.2, { transparent: true, opacity: 0.7 })
      const crystalMesh = shadow(new THREE.Mesh(
        new THREE.DodecahedronGeometry(0.4, 0), crystalMat
      ))
      crystalMesh.position.set(c.x, 0.5, c.z)
      group.add(crystalMesh)

      const bd = RAPIER.RigidBodyDesc.dynamic()
        .setTranslation(c.x, 0.5, c.z)
        .setLinearDamping(0.2).setAngularDamping(0.3)
      const body = world.createRigidBody(bd)
      world.createCollider(
        RAPIER.ColliderDesc.ball(0.4)
          .setDensity(1.0).setFriction(0.3).setRestitution(0.5), body
      )
      syncList.push({ mesh: crystalMesh, body })
    }
  }

  // — Dynamic Oxygen Tanks (3) —
  {
    const o2Defs = [
      { x: 6,   z: -6 },
      { x: -6,  z: 6 },
      { x: 12,  z: 0 },
    ]
    for (const o of o2Defs) {
      const tankMesh = shadow(new THREE.Mesh(
        new THREE.CylinderGeometry(0.15, 0.15, 0.6, 6), mat(WHITE)
      ))
      tankMesh.position.set(o.x, 0.3, o.z)
      group.add(tankMesh)

      const bd = RAPIER.RigidBodyDesc.dynamic()
        .setTranslation(o.x, 0.3, o.z)
        .setLinearDamping(0.3).setAngularDamping(0.4)
      const body = world.createRigidBody(bd)
      world.createCollider(
        RAPIER.ColliderDesc.cylinder(0.3, 0.15)
          .setDensity(3.0).setFriction(0.4).setRestitution(0.2), body
      )
      syncList.push({ mesh: tankMesh, body })
    }
  }

  // — Repair Kits (2, dynamic small boxes) —
  {
    const rkDefs = [
      { x: 3,   z: 10 },
      { x: -3,  z: -10 },
    ]
    for (const r of rkDefs) {
      const kitMesh = shadow(new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.3, 0.35), mat(GREEN_E)
      ))
      kitMesh.position.set(r.x, 0.15, r.z)
      group.add(kitMesh)

      // Cross symbol
      const crossH = shadow(new THREE.Mesh(
        new THREE.BoxGeometry(0.25, 0.05, 0.02), mat(WHITE)
      ))
      crossH.position.set(0, 0.05, 0.18)
      kitMesh.add(crossH)
      const crossV = shadow(new THREE.Mesh(
        new THREE.BoxGeometry(0.05, 0.2, 0.02), mat(WHITE)
      ))
      crossV.position.set(0, 0.02, 0.18)
      kitMesh.add(crossV)

      const bd = RAPIER.RigidBodyDesc.dynamic()
        .setTranslation(r.x, 0.15, r.z)
        .setLinearDamping(0.3).setAngularDamping(0.4)
      const body = world.createRigidBody(bd)
      world.createCollider(
        RAPIER.ColliderDesc.cuboid(0.25, 0.15, 0.175)
          .setDensity(3.0).setFriction(0.5).setRestitution(0.1), body
      )
      syncList.push({ mesh: kitMesh, body })
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  // LANDMARK 1: MOUNTAIN RANGE (NW corner, centered ~(-32, -34))
  // ═══════════════════════════════════════════════════════════════════
  {
    const DARK_ROCK_MAT = mat(0x1e1e2e)

    // --- Tallest peak at (-19, 0, -22): 3 stacked cones ---
    const peak1Base = shadow(new THREE.Mesh(
      new THREE.ConeGeometry(5, 4, 8), DARK_ROCK_MAT
    ))
    peak1Base.position.set(-19, 2, -22)
    group.add(peak1Base)
    const peak1Mid = shadow(new THREE.Mesh(
      new THREE.ConeGeometry(3, 3, 8), DARK_ROCK_MAT
    ))
    peak1Mid.position.set(-19, 5.5, -22)
    group.add(peak1Mid)
    const peak1Top = shadow(new THREE.Mesh(
      new THREE.ConeGeometry(1.5, 3, 8), DARK_ROCK_MAT
    ))
    peak1Top.position.set(-19, 8.5, -22)
    group.add(peak1Top)

    // --- Medium peak at (-17, 0, -19): 2 cones ---
    const peak2Base = shadow(new THREE.Mesh(
      new THREE.ConeGeometry(4, 3, 8), DARK_ROCK_MAT
    ))
    peak2Base.position.set(-17, 1.5, -19)
    group.add(peak2Base)
    const peak2Top = shadow(new THREE.Mesh(
      new THREE.ConeGeometry(2, 2.5, 8), DARK_ROCK_MAT
    ))
    peak2Top.position.set(-17, 4.25, -19)
    group.add(peak2Top)

    // --- Small peak at (-22, 0, -20): 2 cones ---
    const peak3Base = shadow(new THREE.Mesh(
      new THREE.ConeGeometry(3, 2.5, 8), DARK_ROCK_MAT
    ))
    peak3Base.position.set(-22, 1.25, -20)
    group.add(peak3Base)
    const peak3Top = shadow(new THREE.Mesh(
      new THREE.ConeGeometry(1.5, 2, 8), DARK_ROCK_MAT
    ))
    peak3Top.position.set(-22, 3.5, -20)
    group.add(peak3Top)

    // --- Rocky base boulders ---
    const boulderGeo = new THREE.DodecahedronGeometry(2, 0)
    const boulderPositions = [
      [-18, 0.4, -20], [-20, 0.4, -21], [-17, 0.4, -23], [-21, 0.4, -19]
    ]
    for (const [bx, by, bz] of boulderPositions) {
      const boulder = shadow(new THREE.Mesh(boulderGeo, DARK_ROCK_MAT))
      boulder.scale.set(1, 0.4, 1)
      boulder.position.set(bx, by, bz)
      boulder.rotation.y = Math.random() * Math.PI
      group.add(boulder)
    }

    // --- Cave entrance on tallest peak south face ---
    const cave = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(2, 1.8, 1), mat(0x050510)
    ))
    cave.position.set(-18, 0.9, -20)
    group.add(cave)

    // --- Purple emissive crystals flanking cave ---
    const caveCrystalMat = emissiveMat(0xaa44ff, 0xaa44ff, 0.8)
    const caveCrystalGeo = new THREE.DodecahedronGeometry(0.4, 0)
    const caveCrystalDefs = [
      [-19.2, 0.5, -19.8], [-16.8, 0.5, -20.2], [-18, 1.9, -19.7]
    ]
    for (const [cx, cy, cz] of caveCrystalDefs) {
      const crystal = shadow(new THREE.Mesh(caveCrystalGeo, caveCrystalMat))
      crystal.position.set(cx, cy, cz)
      crystal.rotation.set(Math.random() * 0.5, Math.random() * Math.PI, Math.random() * 0.5)
      group.add(crystal)
    }

    // --- PointLight inside cave ---
    const caveLight = new THREE.PointLight(0x00ffff, 0.5, 6)
    caveLight.position.set(-18, 1.2, -20.6)
    group.add(caveLight)

    // --- Fixed Rapier colliders at each peak base ---
    {
      const bd1 = RAPIER.RigidBodyDesc.fixed().setTranslation(-19, 2, -22)
      const b1 = world.createRigidBody(bd1)
      world.createCollider(RAPIER.ColliderDesc.cuboid(5, 2, 5).setFriction(0.5), b1)
    }
    {
      const bd2 = RAPIER.RigidBodyDesc.fixed().setTranslation(-17, 1.5, -19)
      const b2 = world.createRigidBody(bd2)
      world.createCollider(RAPIER.ColliderDesc.cuboid(4, 1.5, 4).setFriction(0.5), b2)
    }
    {
      const bd3 = RAPIER.RigidBodyDesc.fixed().setTranslation(-22, 1.25, -20)
      const b3 = world.createRigidBody(bd3)
      world.createCollider(RAPIER.ColliderDesc.cuboid(3, 1.25, 3).setFriction(0.5), b3)
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  // LANDMARK 2: LARGE CRATER at (-28, 28), radius ~8
  // ═══════════════════════════════════════════════════════════════════
  {
    const CX = -17, CZ = 17, CR = 8

    // --- Crater rim: 12 box segments arranged in a circle ---
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2
      const rx = CX + Math.cos(angle) * CR
      const rz = CZ + Math.sin(angle) * CR
      const seg = shadow(new THREE.Mesh(
        new THREE.BoxGeometry(3, 0.6, 0.8), mat(DARK_ROCK)
      ))
      seg.position.set(rx, 0.3, rz)
      seg.rotation.y = -angle + Math.PI / 2
      group.add(seg)

      // Fixed collider per rim segment
      const halfA = (-angle + Math.PI / 2) * 0.5
      const rbd = RAPIER.RigidBodyDesc.fixed()
        .setTranslation(rx, 0.3, rz)
        .setRotation({ x: 0, y: Math.sin(halfA), z: 0, w: Math.cos(halfA) })
      const rb = world.createRigidBody(rbd)
      world.createCollider(RAPIER.ColliderDesc.cuboid(1.5, 0.3, 0.4).setFriction(0.5), rb)
    }

    // --- Ramp on east side ---
    const rampMesh = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(2, 0.3, 4), mat(DARK_ROCK)
    ))
    rampMesh.position.set(CX + CR, 0.0, CZ)
    rampMesh.rotation.z = -0.15  // slight slope
    group.add(rampMesh)
    {
      // Rotated ramp collider
      _e.set(-0.0, 0, -0.15)
      _q.setFromEuler(_e)
      const rampBd = RAPIER.RigidBodyDesc.fixed()
        .setTranslation(CX + CR, 0.0, CZ)
        .setRotation({ x: _q.x, y: _q.y, z: _q.z, w: _q.w })
      const rampBody = world.createRigidBody(rampBd)
      world.createCollider(RAPIER.ColliderDesc.cuboid(1, 0.15, 2).setFriction(0.6), rampBody)
    }

    // --- Inner floor ---
    const craterFloor = new THREE.Mesh(
      new THREE.CircleGeometry(7, 16), mat(0x0a0a15)
    )
    craterFloor.rotation.x = -Math.PI / 2
    craterFloor.position.set(CX, -0.2, CZ)
    group.add(craterFloor)

    // --- Central monolith ---
    const monolithMat = emissiveMat(0x1a1a2a, 0xaa44ff, 0.5)
    const monolith = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(0.6, 3.0, 0.6), monolithMat
    ))
    monolith.position.set(CX, 1.5, CZ)
    group.add(monolith)
    monolithAnims.push({ material: monolithMat, phase: 0 })

    // --- 5 crystals in a pentagon at r=3 (dynamic, pushable) ---
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2
      const px = CX + Math.cos(angle) * 3
      const pz = CZ + Math.sin(angle) * 3
      const isOdd = i % 2 === 1
      const cColor = isOdd ? 0x00ffff : 0xaa44ff
      const cMat = emissiveMat(cColor, cColor, 0.8, { transparent: true, opacity: 0.7 })
      const cMesh = shadow(new THREE.Mesh(
        new THREE.DodecahedronGeometry(0.3, 0), cMat
      ))
      cMesh.scale.set(0.5, 1.2, 0.5)
      cMesh.position.set(px, 0.4, pz)
      group.add(cMesh)

      const cbd = RAPIER.RigidBodyDesc.dynamic()
        .setTranslation(px, 0.4, pz)
        .setLinearDamping(0.3).setAngularDamping(0.4)
      const cBody = world.createRigidBody(cbd)
      world.createCollider(
        RAPIER.ColliderDesc.ball(0.35)
          .setDensity(1.5).setFriction(0.3).setRestitution(0.4), cBody
      )
      syncList.push({ mesh: cMesh, body: cBody })
    }

    // --- 3 concentric floor rings ---
    const ringRadii = [[2, 2.3], [3.8, 4.1], [5.5, 5.8]]
    const ringMat = emissiveMat(0x00ffff, 0x00ffff, 0.3, { transparent: true, opacity: 0.5, side: THREE.DoubleSide })
    for (const [inner, outer] of ringRadii) {
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(inner, outer, 32), ringMat
      )
      ring.rotation.x = -Math.PI / 2
      ring.position.set(CX, -0.18, CZ)
      group.add(ring)
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  // LANDMARK 3: GOOP POND at (30, 28)
  // ═══════════════════════════════════════════════════════════════════
  {
    const goopMat = new THREE.MeshStandardMaterial({
      color: 0x0a2a2a,
      emissive: 0x00ff88,
      emissiveIntensity: 0.4,
      flatShading: true,
      transparent: true,
      opacity: 0.75,
      side: THREE.DoubleSide,
    })
    goopAnims.push({ material: goopMat, phase: 0 })

    // --- 3 overlapping circles for irregular shape ---
    const pondDefs = [
      { x: 18, z: 17, r: 4, y: 0.03 },
      { x: 19, z: 16, r: 2.5, y: 0.04 },
      { x: 17, z: 18, r: 2, y: 0.05 },
    ]
    for (const p of pondDefs) {
      const pond = new THREE.Mesh(
        new THREE.CircleGeometry(p.r, 16), goopMat
      )
      pond.rotation.x = -Math.PI / 2
      pond.position.set(p.x, p.y, p.z)
      group.add(pond)
    }

    // --- Shoreline rocks ---
    const shoreRockGeo = new THREE.DodecahedronGeometry(1, 0)
    const shoreRockPositions = [
      [15.9, 0.15, 17.1, 0.35],
      [18, 0.15, 19.3, 0.4],
      [20.4, 0.15, 15.3, 0.3],
      [20.1, 0.15, 16.8, 0.5],
      [16.5, 0.15, 18.3, 0.4],
      [17.4, 0.15, 14.7, 0.35],
    ]
    for (const [sx, sy, sz, ss] of shoreRockPositions) {
      const rock = shadow(new THREE.Mesh(shoreRockGeo, mat(DARK_ROCK)))
      rock.scale.set(ss, ss * 0.6, ss)
      rock.position.set(sx, sy, sz)
      rock.rotation.y = Math.random() * Math.PI
      group.add(rock)
    }

    // --- Goo splatter patches ---
    const splatMat = new THREE.MeshStandardMaterial({
      color: 0x0a2a2a,
      emissive: 0x00ff88,
      emissiveIntensity: 0.4,
      flatShading: true,
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide,
    })
    goopAnims.push({ material: splatMat, phase: 1.0 })
    const splatDefs = [
      { x: 15.6, z: 16.2, r: 0.8 },
      { x: 20.7, z: 16.5, r: 0.6 },
      { x: 17.4, z: 19.2, r: 1.0 },
      { x: 18.6, z: 14.1, r: 0.5 },
    ]
    for (const sp of splatDefs) {
      const splat = new THREE.Mesh(
        new THREE.CircleGeometry(sp.r, 10), splatMat
      )
      splat.rotation.x = -Math.PI / 2
      splat.position.set(sp.x, 0.06, sp.z)
      group.add(splat)
    }

    // --- Bubble animation: 6 small spheres ---
    const bubbleMat = emissiveMat(0x00ff88, 0x00ff88, 0.6, { transparent: true, opacity: 0.5 })
    const bubbleDefs = [
      { x: 18, z: 17 }, { x: 18.6, z: 16.2 }, { x: 17.4, z: 17.4 },
      { x: 19.2, z: 15.9 }, { x: 17.1, z: 17.7 }, { x: 18.3, z: 17.1 },
    ]
    for (let i = 0; i < bubbleDefs.length; i++) {
      const bd = bubbleDefs[i]
      const bubble = new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 6, 6), bubbleMat
      )
      bubble.position.set(bd.x, 0.02, bd.z)
      group.add(bubble)
      bubbleAnims.push({
        mesh: bubble,
        baseX: bd.x,
        baseZ: bd.z,
        phase: (i / bubbleDefs.length) * Math.PI * 2,
        speed: 0.4 + Math.random() * 0.3,
      })
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  // LANDMARK 4: RESEARCH STATION at (28, -30)
  // ═══════════════════════════════════════════════════════════════════
  {
    const RSX = 17, RSZ = -18

    // --- Main lab ---
    const lab = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(5, 3, 4), mat(STEEL)
    ))
    lab.position.set(RSX, 1.5, RSZ)
    group.add(lab)

    // Cyan emissive window strips on front face
    const winMat = emissiveMat(0x00ffff, 0x00ffff, 0.5)
    const win1 = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.3, 0.05), winMat)
    win1.position.set(RSX - 1, 2.0, RSZ + 2.01)
    group.add(win1)
    const win2 = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.3, 0.05), winMat)
    win2.position.set(RSX + 1, 2.0, RSZ + 2.01)
    group.add(win2)

    // --- Observation dome ---
    const domeBaseGeo = new THREE.CylinderGeometry(2, 2, 0.5, 16)
    const domeBase = shadow(new THREE.Mesh(domeBaseGeo, mat(STEEL)))
    domeBase.position.set(20, 0.25, -17)
    group.add(domeBase)

    const domeGeo = new THREE.SphereGeometry(2, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2)
    const domeMesh = new THREE.Mesh(domeGeo, mat(LIGHT_BLUE, { transparent: true, opacity: 0.25 }))
    domeMesh.position.set(20, 0.5, -17)
    group.add(domeMesh)

    // --- Equipment shed ---
    const shed = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(2, 2, 2), mat(DARK_GRAY)
    ))
    shed.position.set(15, 1, -20)
    group.add(shed)

    // --- Antenna ---
    const antMast = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.06, 5, 6), mat(STEEL)
    ))
    antMast.position.set(18, 2.5, -20)
    group.add(antMast)
    // 2 horizontal crossbars
    const crossbar1 = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 1.5, 4), mat(SILVER)
    ))
    crossbar1.position.set(18, 3.5, -20)
    crossbar1.rotation.z = Math.PI / 2
    group.add(crossbar1)
    const crossbar2 = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 1.0, 4), mat(SILVER)
    ))
    crossbar2.position.set(18, 4.5, -20)
    crossbar2.rotation.z = Math.PI / 2
    group.add(crossbar2)

    // --- 2 PointLights on lab corners ---
    const labLight1 = new THREE.PointLight(0x00ffff, 0.4, 8)
    labLight1.position.set(RSX - 2.5, 3.2, RSZ + 2)
    group.add(labLight1)
    const labLight2 = new THREE.PointLight(0x00ffff, 0.4, 8)
    labLight2.position.set(RSX + 2.5, 3.2, RSZ + 2)
    group.add(labLight2)

    // --- Connecting walkway from lab to dome ---
    const walkway = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 0.1, 6), mat(STEEL)
    ))
    // Position between lab (17,-18) and dome (20,-17)
    walkway.position.set(18.5, 0.05, -17.5)
    walkway.rotation.y = Math.atan2(20 - 17, -17 - (-18))
    group.add(walkway)

    // --- Fixed Rapier colliders ---
    {
      // Lab
      const labBd = RAPIER.RigidBodyDesc.fixed().setTranslation(RSX, 1.5, RSZ)
      const labBody = world.createRigidBody(labBd)
      world.createCollider(RAPIER.ColliderDesc.cuboid(2.5, 1.5, 2).setFriction(0.5), labBody)
    }
    {
      // Dome base
      const domeBd = RAPIER.RigidBodyDesc.fixed().setTranslation(20, 1, -17)
      const domeBody = world.createRigidBody(domeBd)
      world.createCollider(RAPIER.ColliderDesc.cylinder(1, 2).setFriction(0.5), domeBody)
    }
    {
      // Shed
      const shedBd = RAPIER.RigidBodyDesc.fixed().setTranslation(15, 1, -20)
      const shedBody = world.createRigidBody(shedBd)
      world.createCollider(RAPIER.ColliderDesc.cuboid(1, 1, 1).setFriction(0.5), shedBody)
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  // LANDMARK 5: ABANDONED LUNAR ROVER at (24, -15)
  // ═══════════════════════════════════════════════════════════════════
  {
    const roverGroup = new THREE.Group()
    roverGroup.position.set(-12, 0, 12)
    roverGroup.rotation.y = 0.4
    roverGroup.rotation.z = 0.05  // tilted

    // --- Chassis ---
    const chassis = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(2.5, 0.8, 3.5), mat(SILVER)
    ))
    chassis.position.y = 0.6
    roverGroup.add(chassis)

    // --- 6 wheels in 3 pairs ---
    const wheelGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.3, 8)
    const wheelMat = mat(DARK_GRAY)
    const wheelPositions = [
      // [x, y, z] — left side then right side, front to back
      [-1.4, 0.3, -1.2],  // front-left (sunk)
      [1.4,  0.5, -1.2],  // front-right
      [-1.4, 0.5, 0],     // mid-left
      [1.4,  0.5, 0],     // mid-right
      [-1.4, 0.5, 1.2],   // rear-left
      [1.4,  0.5, 1.2],   // rear-right
    ]
    for (const [wx, wy, wz] of wheelPositions) {
      const wheel = shadow(new THREE.Mesh(wheelGeo, wheelMat))
      wheel.position.set(wx, wy, wz)
      wheel.rotation.z = Math.PI / 2
      roverGroup.add(wheel)
    }

    // --- Roll cage: 2 arched bars ---
    for (let s = -1; s <= 1; s += 2) {
      const bar = shadow(new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 2.5, 6), mat(STEEL)
      ))
      bar.position.set(s * 0.8, 1.4, 0)
      bar.rotation.z = s * 0.3
      bar.rotation.x = 0.15
      roverGroup.add(bar)
    }

    // --- Antenna dish: mast + inverted cone ---
    const antMast = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 2, 6), mat(STEEL)
    ))
    antMast.position.set(-0.8, 1.6, -1.5)
    roverGroup.add(antMast)
    const antDish = shadow(new THREE.Mesh(
      new THREE.ConeGeometry(0.4, 0.3, 8), mat(WHITE)
    ))
    antDish.position.set(-0.8, 2.7, -1.5)
    antDish.rotation.x = Math.PI  // inverted
    roverGroup.add(antDish)

    // --- Solar panel on short arm ---
    const panelArm = shadow(new THREE.Mesh(
      new THREE.CylinderGeometry(0.03, 0.03, 1.2, 4), mat(STEEL)
    ))
    panelArm.position.set(0.8, 1.3, -1.0)
    panelArm.rotation.z = Math.PI / 2
    roverGroup.add(panelArm)
    const solarPanel = shadow(new THREE.Mesh(
      new THREE.BoxGeometry(2, 0.04, 1.2), mat(PANEL_BLUE)
    ))
    solarPanel.position.set(0.8, 1.5, -1.0)
    roverGroup.add(solarPanel)

    group.add(roverGroup)

    // --- Tire tracks behind rover ---
    for (let s = -1; s <= 1; s += 2) {
      const track = shadow(new THREE.Mesh(
        new THREE.BoxGeometry(0.25, 0.02, 8), mat(0x222230)
      ))
      // Tracks extend behind (positive local Z) at slight offset
      track.position.set(-12 + Math.cos(0.4) * s * 1.2, 0.01, 12 + Math.sin(0.4) * 4 + 4)
      track.rotation.y = 0.4
      group.add(track)
    }

    // --- Fixed Rapier cuboid collider around chassis ---
    {
      const halfA = 0.4 * 0.5
      const roverBd = RAPIER.RigidBodyDesc.fixed()
        .setTranslation(-12, 0.6, 12)
        .setRotation({ x: 0, y: Math.sin(halfA), z: 0, w: Math.cos(halfA) })
      const roverBody = world.createRigidBody(roverBd)
      world.createCollider(RAPIER.ColliderDesc.cuboid(1.25, 0.5, 1.75).setFriction(0.5), roverBody)
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  // ADD EVERYTHING TO SCENE
  // ═══════════════════════════════════════════════════════════════════
  scene.add(group)

  // ═══════════════════════════════════════════════════════════════════
  // RETURN with update loop
  // ═══════════════════════════════════════════════════════════════════
  return {
    syncList,
    update(dt) {
      elapsed += dt

      // Satellite dish rotation
      for (const d of dishes) {
        d.group.rotation.y += d.speed * dt
      }

      // Alien plant glow pulsing
      for (const p of alienPlants) {
        const pulse = (Math.sin(elapsed * 2.0 + p.phase) + 1) * 0.5
        p.material.emissiveIntensity = p.baseIntensity * (0.4 + pulse * 0.8)
        p.mesh.scale.setScalar(0.9 + pulse * 0.2)
      }

      // Warning light pulsing
      const wPulse = (Math.sin(elapsed * 4.0) + 1) * 0.5
      for (const wl of warningLights) {
        wl.material.emissiveIntensity = 0.5 + wPulse * 3.0
        wl.scale.setScalar(0.8 + wPulse * 0.4)
      }

      // Geyser animation
      for (const g of geysers) {
        const gPulse = (Math.sin(elapsed * 3.0 + g.phase) + 1) * 0.5
        g.material.opacity = 0.15 + gPulse * 0.5
        g.material.emissiveIntensity = 0.5 + gPulse * 2.0
        g.mesh.scale.setScalar(0.6 + gPulse * 0.8)
        g.mesh.position.y = 3.0 + gPulse * 0.5
      }

      // Crystal shimmer
      for (const c of crystals) {
        const cPulse = (Math.sin(elapsed * 1.5 + c.phase) + 1) * 0.5
        c.material.emissiveIntensity = 0.3 + cPulse * 1.0
      }

      // Crater monolith pulsing (emissive 0.3-0.8)
      for (const m of monolithAnims) {
        const mPulse = (Math.sin(elapsed * 2.0 + m.phase) + 1) * 0.5
        m.material.emissiveIntensity = 0.3 + mPulse * 0.5
      }

      // Goop pond glow pulsing (emissiveIntensity 0.2-0.6)
      for (const g of goopAnims) {
        const gPulse = (Math.sin(elapsed * 1.5 + g.phase) + 1) * 0.5
        g.material.emissiveIntensity = 0.2 + gPulse * 0.4
      }

      // Goop bubbles rising
      for (const b of bubbleAnims) {
        const cycle = ((elapsed * b.speed + b.phase) % (Math.PI * 2)) / (Math.PI * 2)
        b.mesh.position.y = 0.02 + cycle * 1.48
        b.mesh.position.x = b.baseX + Math.sin(elapsed * 1.5 + b.phase) * 0.15
        b.mesh.position.z = b.baseZ + Math.cos(elapsed * 1.2 + b.phase) * 0.15
        b.mesh.material.opacity = 0.5 * (1 - cycle * 0.7)
        b.mesh.scale.setScalar(0.8 + cycle * 0.4)
      }
    },
  }
}
