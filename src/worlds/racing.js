/**
 * Racing World — full-sized 120x120 motorsport paradise.
 *
 * A large racing circuit loops around the entire map. The 4 portfolio buildings
 * sit in the infield at (0,-20), (20,0), (0,20), (-20,0). The track is wide
 * enough for the car (~5 units), with straights, sweeping curves, ramps for jumps,
 * tire barriers, grandstands, a pit lane, and 30+ dynamic traffic cones for chaos.
 *
 * Export: createWorld(scene, RAPIER, world) => { syncList, update(dt) }
 */
import * as THREE from 'three'

// ── Reusable materials ──────────────────────────────────────────────────
const MAT = {
  grass:        new THREE.MeshStandardMaterial({ color: '#4a7c59', flatShading: true }),
  asphalt:      new THREE.MeshStandardMaterial({ color: '#3a3a3a', flatShading: true }),
  darkAsphalt:  new THREE.MeshStandardMaterial({ color: '#2e2e2e', flatShading: true }),
  pitAsphalt:   new THREE.MeshStandardMaterial({ color: '#454545', flatShading: true }),
  white:        new THREE.MeshStandardMaterial({ color: '#ffffff', flatShading: true }),
  black:        new THREE.MeshStandardMaterial({ color: '#111111', flatShading: true }),
  red:          new THREE.MeshStandardMaterial({ color: '#c0392b', flatShading: true }),
  brightRed:    new THREE.MeshStandardMaterial({ color: '#e74c3c', flatShading: true }),
  yellow:       new THREE.MeshStandardMaterial({ color: '#f1c40f', flatShading: true }),
  orange:       new THREE.MeshStandardMaterial({ color: '#FF6F00', flatShading: true }),
  blue:         new THREE.MeshStandardMaterial({ color: '#2980b9', flatShading: true }),
  green:        new THREE.MeshStandardMaterial({ color: '#27ae60', flatShading: true }),
  darkGreen:    new THREE.MeshStandardMaterial({ color: '#1a6b37', flatShading: true }),
  gray:         new THREE.MeshStandardMaterial({ color: '#7f8c8d', flatShading: true }),
  steel:        new THREE.MeshStandardMaterial({ color: '#78909C', flatShading: true }),
  concrete:     new THREE.MeshStandardMaterial({ color: '#9E9E9E', flatShading: true }),
  gravel:       new THREE.MeshStandardMaterial({ color: '#a08060', flatShading: true }),
  sand:         new THREE.MeshStandardMaterial({ color: '#d4b576', flatShading: true }),
  gold:         new THREE.MeshStandardMaterial({ color: '#FFD700', flatShading: true }),
  silver:       new THREE.MeshStandardMaterial({ color: '#C0C0C0', flatShading: true }),
  bronze:       new THREE.MeshStandardMaterial({ color: '#CD7F32', flatShading: true }),
  tire:         new THREE.MeshStandardMaterial({ color: '#1a1a1a', flatShading: true }),
  purple:       new THREE.MeshStandardMaterial({ color: '#8e44ad', flatShading: true }),
  cyan:         new THREE.MeshStandardMaterial({ color: '#00bcd4', flatShading: true }),
  wood:         new THREE.MeshStandardMaterial({ color: '#8b6914', flatShading: true }),
  rampRed:      new THREE.MeshStandardMaterial({ color: '#cc3333', flatShading: true }),
  rampWhite:    new THREE.MeshStandardMaterial({ color: '#eeeeee', flatShading: true }),
  emissiveRed:  new THREE.MeshStandardMaterial({ color: '#ff0000', flatShading: true, emissive: '#ff0000', emissiveIntensity: 0.6 }),
  emissiveGreen:new THREE.MeshStandardMaterial({ color: '#00ff00', flatShading: true, emissive: '#00ff00', emissiveIntensity: 0.5 }),
  emissiveAmber:new THREE.MeshStandardMaterial({ color: '#ffaa00', flatShading: true, emissive: '#ffaa00', emissiveIntensity: 0.5 }),
  emissiveBlue: new THREE.MeshStandardMaterial({ color: '#4488ff', flatShading: true, emissive: '#4488ff', emissiveIntensity: 0.4 }),
  glass:        new THREE.MeshStandardMaterial({ color: '#88bbee', transparent: true, opacity: 0.5, flatShading: true }),
}

// ── Track geometry helpers ──────────────────────────────────────────────
// The track is a large rounded-rectangle loop going around the map.
// It's defined as a set of waypoints that form a closed loop.
// Portfolio buildings at (0,-20), (20,0), (0,20), (-20,0) are in the infield.

/**
 * Generate track centerline points as a closed loop.
 * The track is roughly a rounded rectangle: large corners connected by straights.
 * Goes around the outside perimeter, leaving the center (and portfolio buildings) as infield.
 */
function _generateTrackPoints() {
  const points = []
  // Rounded rectangle path — the track goes around the outside
  // Corners at roughly (+-42, +-42), with large arcs
  const cornerRadius = 18
  const halfW = 42 // half width of the rectangle
  const halfH = 42 // half height

  // We'll trace: bottom straight -> bottom-right corner arc -> right straight ->
  // top-right corner arc -> top straight -> top-left corner arc -> left straight ->
  // bottom-left corner arc -> close

  const arcSegs = 12 // segments per quarter arc

  // Bottom straight: from (-halfW + cornerRadius, -halfH) to (halfW - cornerRadius, -halfH)
  const bsStart = -halfW + cornerRadius
  const bsEnd = halfW - cornerRadius
  for (let i = 0; i <= 8; i++) {
    const t = i / 8
    points.push({ x: bsStart + (bsEnd - bsStart) * t, z: -halfH })
  }

  // Bottom-right arc: center at (halfW - cornerRadius, -halfH + cornerRadius)
  const brCx = halfW - cornerRadius, brCz = -halfH + cornerRadius
  for (let i = 1; i <= arcSegs; i++) {
    const a = -Math.PI / 2 + (i / arcSegs) * (Math.PI / 2)
    points.push({ x: brCx + Math.cos(a) * cornerRadius, z: brCz + Math.sin(a) * cornerRadius })
  }

  // Right straight: from (halfW, -halfH + cornerRadius) to (halfW, halfH - cornerRadius)
  const rsStart = -halfH + cornerRadius
  const rsEnd = halfH - cornerRadius
  for (let i = 1; i <= 8; i++) {
    const t = i / 8
    points.push({ x: halfW, z: rsStart + (rsEnd - rsStart) * t })
  }

  // Top-right arc: center at (halfW - cornerRadius, halfH - cornerRadius)
  const trCx = halfW - cornerRadius, trCz = halfH - cornerRadius
  for (let i = 1; i <= arcSegs; i++) {
    const a = 0 + (i / arcSegs) * (Math.PI / 2)
    points.push({ x: trCx + Math.cos(a) * cornerRadius, z: trCz + Math.sin(a) * cornerRadius })
  }

  // Top straight: from (halfW - cornerRadius, halfH) to (-halfW + cornerRadius, halfH)
  for (let i = 1; i <= 8; i++) {
    const t = i / 8
    points.push({ x: bsEnd - (bsEnd - bsStart) * t, z: halfH })
  }

  // Top-left arc: center at (-halfW + cornerRadius, halfH - cornerRadius)
  const tlCx = -halfW + cornerRadius, tlCz = halfH - cornerRadius
  for (let i = 1; i <= arcSegs; i++) {
    const a = Math.PI / 2 + (i / arcSegs) * (Math.PI / 2)
    points.push({ x: tlCx + Math.cos(a) * cornerRadius, z: tlCz + Math.sin(a) * cornerRadius })
  }

  // Left straight: from (-halfW, halfH - cornerRadius) to (-halfW, -halfH + cornerRadius)
  for (let i = 1; i <= 8; i++) {
    const t = i / 8
    points.push({ x: -halfW, z: rsEnd - (rsEnd - rsStart) * t })
  }

  // Bottom-left arc: center at (-halfW + cornerRadius, -halfH + cornerRadius)
  const blCx = -halfW + cornerRadius, blCz = -halfH + cornerRadius
  for (let i = 1; i <= arcSegs; i++) {
    const a = Math.PI + (i / arcSegs) * (Math.PI / 2)
    points.push({ x: blCx + Math.cos(a) * cornerRadius, z: blCz + Math.sin(a) * cornerRadius })
  }

  return points
}

const TRACK_POINTS = _generateTrackPoints()
const TRACK_WIDTH = 5.5

export function createWorld(scene, RAPIER, world) {
  const syncList = []
  const animatedObjects = []

  // ── Sky + Fog ─────────────────────────────────────────────────────────
  scene.background = new THREE.Color('#87ceeb')
  scene.fog = new THREE.Fog('#87ceeb', 60, 200)

  // ── Ground ────────────────────────────────────────────────────────────
  _createGround(scene, RAPIER, world)

  // ── Boundary Walls ────────────────────────────────────────────────────
  _createBoundaryWalls(scene, RAPIER, world)

  // ── Track Surface ─────────────────────────────────────────────────────
  _createTrackSurface(scene)

  // ── Track Markings (center lines, curbs) ──────────────────────────────
  _createTrackMarkings(scene)

  // ── Start/Finish Line + Gantry ────────────────────────────────────────
  _createStartFinish(scene, RAPIER, world)

  // ── Ramps (4) ─────────────────────────────────────────────────────────
  _createRamps(scene, RAPIER, world)

  // ── Grandstands (3) ───────────────────────────────────────────────────
  _createGrandstands(scene, RAPIER, world)

  // ── Pit Lane ──────────────────────────────────────────────────────────
  _createPitLane(scene, RAPIER, world, syncList)

  // ── Tire Barriers at corners ──────────────────────────────────────────
  _createTireBarriers(scene, RAPIER, world, syncList)

  // ── Gravel + Sand Traps ───────────────────────────────────────────────
  _createGravelTraps(scene)

  // ── Podium + Trophy ───────────────────────────────────────────────────
  _createPodium(scene, RAPIER, world)

  // ── Sponsor Billboards (8) ────────────────────────────────────────────
  _createBillboards(scene, RAPIER, world)

  // ── Marshal Posts (8) ─────────────────────────────────────────────────
  _createMarshalPosts(scene, animatedObjects)

  // ── Starting Lights Gantry ────────────────────────────────────────────
  _createStartingLights(scene, animatedObjects)

  // ── Infield Features ──────────────────────────────────────────────────
  _createInfieldFeatures(scene, RAPIER, world)

  // ── Racing Vehicles (8) ───────────────────────────────────────────────
  _createRacingVehicles(scene, RAPIER, world)

  // ── Traffic Cones (35+ DYNAMIC) ───────────────────────────────────────
  _createTrafficCones(scene, RAPIER, world, syncList)

  // ── Loose Tires (8 DYNAMIC) ───────────────────────────────────────────
  _createLooseTires(scene, RAPIER, world, syncList)

  // ── Dynamic Barriers + Beach Ball + Fuel Barrels + Tool Boxes ─────────
  _createDynamicObjects(scene, RAPIER, world, syncList)

  // ── Track Decorations (arrows, chevrons, speed bumps, fencing) ────────
  _createTrackDecorations(scene)

  // ── Trees Outside Track ───────────────────────────────────────────────
  _createTrees(scene)

  // ── Camera Towers + Flag Poles ────────────────────────────────────────
  _createTowersAndFlags(scene, RAPIER, world)

  // ── Viewing Mounds ────────────────────────────────────────────────────
  _createViewingMounds(scene)

  return {
    syncList,
    update(dt) {
      for (const obj of animatedObjects) {
        if (obj.type === 'flag') {
          obj.mesh.rotation.y = Math.sin(obj.phase + performance.now() * 0.004) * 0.35
        }
        if (obj.type === 'lapTimer') {
          const t = performance.now() * 0.002
          obj.mesh.material.emissiveIntensity = 0.3 + Math.sin(t + obj.phase) * 0.25
        }
        if (obj.type === 'startLight') {
          // Cycle through lights — each light has a different phase
          const cycle = (performance.now() * 0.001 + obj.phase) % 6
          if (cycle < 3) {
            obj.mesh.material.emissiveIntensity = cycle < obj.index + 1 ? 0.8 : 0.1
          } else {
            obj.mesh.material.emissiveIntensity = 0.1
          }
        }
      }
    },
  }
}

// ═══════════════════════════════════════════════════════════════════════════
//  GROUND — grass + large asphalt pad + Rapier collider
// ═══════════════════════════════════════════════════════════════════════════

function _createGround(scene, RAPIER, world) {
  // Big green grass
  const grass = new THREE.Mesh(
    new THREE.PlaneGeometry(150, 150),
    MAT.grass
  )
  grass.rotation.x = -Math.PI / 2
  grass.receiveShadow = true
  scene.add(grass)

  // Rapier ground collider
  const groundBody = world.createRigidBody(
    RAPIER.RigidBodyDesc.fixed().setTranslation(0, -0.05, 0)
  )
  world.createCollider(
    RAPIER.ColliderDesc.cuboid(75, 0.05, 75).setFriction(0.6).setRestitution(0.0),
    groundBody
  )
}

// ═══════════════════════════════════════════════════════════════════════════
//  BOUNDARY WALLS at +/-60
// ═══════════════════════════════════════════════════════════════════════════

function _createBoundaryWalls(scene, RAPIER, world) {
  const WALL_H = 3
  const WALL_HALF = 60
  const wallMat = new THREE.MeshStandardMaterial({ color: '#cccccc', flatShading: true })

  const walls = [
    { x: 0,         z: -WALL_HALF, hw: WALL_HALF, hd: 0.3 },
    { x: 0,         z:  WALL_HALF, hw: WALL_HALF, hd: 0.3 },
    { x: -WALL_HALF, z: 0,         hw: 0.3,       hd: WALL_HALF },
    { x:  WALL_HALF, z: 0,         hw: 0.3,       hd: WALL_HALF },
  ]

  for (const w of walls) {
    // Visual
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(w.hw * 2, WALL_H, w.hd * 2),
      wallMat
    )
    mesh.position.set(w.x, WALL_H / 2, w.z)
    mesh.castShadow = true
    mesh.receiveShadow = true
    scene.add(mesh)

    // Rapier collider
    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(w.x, WALL_H / 2, w.z)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(w.hw, WALL_H / 2, w.hd).setFriction(0.5).setRestitution(0.2),
      body
    )
  }
}

// ═══════════════════════════════════════════════════════════════════════════
//  TRACK SURFACE — rounded rectangle loop made of PlaneGeometry segments
// ═══════════════════════════════════════════════════════════════════════════

function _createTrackSurface(scene) {
  const pts = TRACK_POINTS
  const trackY = 0.02

  for (let i = 0; i < pts.length; i++) {
    const p0 = pts[i]
    const p1 = pts[(i + 1) % pts.length]
    const dx = p1.x - p0.x
    const dz = p1.z - p0.z
    const len = Math.sqrt(dx * dx + dz * dz)
    if (len < 0.01) continue

    const mx = (p0.x + p1.x) / 2
    const mz = (p0.z + p1.z) / 2
    const angle = Math.atan2(dx, dz)

    const seg = new THREE.Mesh(
      new THREE.PlaneGeometry(TRACK_WIDTH, len + 0.3),
      MAT.asphalt
    )
    seg.rotation.x = -Math.PI / 2
    seg.rotation.z = -angle
    seg.position.set(mx, trackY, mz)
    seg.receiveShadow = true
    scene.add(seg)
  }
}

// ═══════════════════════════════════════════════════════════════════════════
//  TRACK MARKINGS — center dashes + red/white curbs at corners
// ═══════════════════════════════════════════════════════════════════════════

function _createTrackMarkings(scene) {
  const pts = TRACK_POINTS
  const trackY = 0.025

  // Center line dashes
  let dist = 0
  for (let i = 0; i < pts.length; i++) {
    const p0 = pts[i]
    const p1 = pts[(i + 1) % pts.length]
    const dx = p1.x - p0.x
    const dz = p1.z - p0.z
    const len = Math.sqrt(dx * dx + dz * dz)
    if (len < 0.01) continue

    const angle = Math.atan2(dx, dz)
    const steps = Math.floor(len / 1.8)

    for (let j = 0; j < steps; j++) {
      dist += 1.8
      // dash every other
      if (Math.floor(dist / 1.8) % 2 !== 0) continue

      const t = (j + 0.5) / steps
      const cx = p0.x + dx * t
      const cz = p0.z + dz * t

      const dash = new THREE.Mesh(
        new THREE.PlaneGeometry(0.15, 0.9),
        MAT.white
      )
      dash.rotation.x = -Math.PI / 2
      dash.rotation.z = -angle
      dash.position.set(cx, trackY, cz)
      dash.receiveShadow = true
      scene.add(dash)
    }
  }

  // Red/white curb markings at corners (inside edge)
  // The corner sections are segments 9-20 (bottom-right), 29-40 (top-right),
  // 49-60 (top-left), 69-80 (bottom-left) approximately.
  // We approximate corners by checking if the segment is in an arc section.
  const arcStartIndices = [9, 9+12+9, 9+12+9+12+9, 9+12+9+12+9+12+9] // approximate
  for (let i = 0; i < pts.length; i++) {
    const p0 = pts[i]
    const p1 = pts[(i + 1) % pts.length]
    const dx = p1.x - p0.x
    const dz = p1.z - p0.z
    const len = Math.sqrt(dx * dx + dz * dz)
    if (len < 0.01) continue

    // Check if this is a corner (arc) segment — the direction changes
    const p_prev = pts[(i - 1 + pts.length) % pts.length]
    const dx_prev = p0.x - p_prev.x
    const dz_prev = p0.z - p_prev.z
    const cross = dx_prev * dz - dz_prev * dx
    const isCurve = Math.abs(cross) > 0.5

    if (!isCurve) continue

    const angle = Math.atan2(dx, dz)
    const mx = (p0.x + p1.x) / 2
    const mz = (p0.z + p1.z) / 2

    // Normal pointing inward (perpendicular to track direction, toward center)
    const nx = -Math.cos(angle)
    const nz = Math.sin(angle)
    const inwardSign = (mx * nx + mz * nz) < 0 ? 1 : -1

    // Place curb on inside of the curve
    const curbDist = TRACK_WIDTH / 2 - 0.2
    const cx = mx + nx * inwardSign * curbDist
    const cz = mz + nz * inwardSign * curbDist

    // Alternating red/white
    const curbMat = (i % 2 === 0) ? MAT.red : MAT.white
    const curb = new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 0.06, len * 0.8),
      curbMat
    )
    curb.rotation.y = angle
    curb.position.set(cx, 0.03, cz)
    curb.receiveShadow = true
    scene.add(curb)
  }
}

// ═══════════════════════════════════════════════════════════════════════════
//  START/FINISH LINE + OVERHEAD GANTRY
// ═══════════════════════════════════════════════════════════════════════════

function _createStartFinish(scene, RAPIER, world) {
  // Place at the bottom straight, around z=-42, x=0
  const sfX = 0
  const sfZ = -42

  // Checkered ground pattern
  const sqSize = 0.5
  const cols = 10
  const rows = 4
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const isWhite = (r + c) % 2 === 0
      const sq = new THREE.Mesh(
        new THREE.PlaneGeometry(sqSize, sqSize),
        isWhite ? MAT.white : MAT.black
      )
      sq.rotation.x = -Math.PI / 2
      sq.position.set(
        sfX - (cols * sqSize) / 2 + c * sqSize + sqSize / 2,
        0.03,
        sfZ - (rows * sqSize) / 2 + r * sqSize + sqSize / 2
      )
      sq.receiveShadow = true
      scene.add(sq)
    }
  }

  // Starting grid markings (3 grid boxes behind start line)
  for (let i = 0; i < 3; i++) {
    const gridBox = new THREE.Mesh(
      new THREE.PlaneGeometry(1.2, 2.0),
      MAT.white
    )
    gridBox.rotation.x = -Math.PI / 2
    gridBox.position.set(sfX + (i - 1) * 1.8, 0.025, sfZ + 3.5 + i * 2.5)
    gridBox.receiveShadow = true
    scene.add(gridBox)

    // Inner dark fill
    const inner = new THREE.Mesh(
      new THREE.PlaneGeometry(1.0, 1.8),
      MAT.asphalt
    )
    inner.rotation.x = -Math.PI / 2
    inner.position.set(sfX + (i - 1) * 1.8, 0.026, sfZ + 3.5 + i * 2.5)
    inner.receiveShadow = true
    scene.add(inner)
  }

  // Overhead gantry: two pillars + horizontal beam
  const pillarH = 6
  const gantryW = TRACK_WIDTH + 2
  const pillarGeo = new THREE.BoxGeometry(0.4, pillarH, 0.4)

  for (const side of [-1, 1]) {
    const pillar = new THREE.Mesh(pillarGeo, MAT.steel)
    pillar.position.set(sfX + side * (gantryW / 2), pillarH / 2, sfZ)
    pillar.castShadow = true
    scene.add(pillar)

    // Pillar collider
    const bd = RAPIER.RigidBodyDesc.fixed()
      .setTranslation(sfX + side * (gantryW / 2), pillarH / 2, sfZ)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(0.2, pillarH / 2, 0.2).setFriction(0.5),
      body
    )
  }

  // Horizontal beam
  const beam = new THREE.Mesh(
    new THREE.BoxGeometry(gantryW, 0.5, 0.6),
    MAT.steel
  )
  beam.position.set(sfX, pillarH, sfZ)
  beam.castShadow = true
  scene.add(beam)

  // Checkered banner on gantry
  const bannerW = gantryW - 1
  const bannerCols = 12
  const bannerRows = 2
  const bsqW = bannerW / bannerCols
  const bsqH = 0.4
  for (let r = 0; r < bannerRows; r++) {
    for (let c = 0; c < bannerCols; c++) {
      const isW = (r + c) % 2 === 0
      const bsq = new THREE.Mesh(
        new THREE.BoxGeometry(bsqW, bsqH, 0.05),
        isW ? MAT.white : MAT.black
      )
      bsq.position.set(
        sfX - bannerW / 2 + c * bsqW + bsqW / 2,
        pillarH - 0.5 - r * bsqH,
        sfZ + 0.35
      )
      scene.add(bsq)
    }
  }

  // Checkered flag on a pole
  const flagPole = new THREE.Mesh(
    new THREE.CylinderGeometry(0.04, 0.04, 4, 5),
    MAT.steel
  )
  flagPole.position.set(sfX + gantryW / 2 + 1.5, 2, sfZ)
  flagPole.castShadow = true
  scene.add(flagPole)

  // Flag (small checkered plane)
  const flagGeo = new THREE.PlaneGeometry(1.0, 0.7)
  const flagCanvas = document.createElement('canvas')
  flagCanvas.width = 32
  flagCanvas.height = 24
  const ctx = flagCanvas.getContext('2d')
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 8; c++) {
      ctx.fillStyle = (r + c) % 2 === 0 ? '#ffffff' : '#000000'
      ctx.fillRect(c * 4, r * 4, 4, 4)
    }
  }
  const flagTex = new THREE.CanvasTexture(flagCanvas)
  flagTex.magFilter = THREE.NearestFilter
  const flagMesh = new THREE.Mesh(flagGeo, new THREE.MeshStandardMaterial({
    map: flagTex, flatShading: true, side: THREE.DoubleSide
  }))
  flagMesh.position.set(sfX + gantryW / 2 + 2.0, 3.6, sfZ)
  scene.add(flagMesh)
}

// ═══════════════════════════════════════════════════════════════════════════
//  RAMPS (4) — angled boxes with proper Rapier rotated colliders
// ═══════════════════════════════════════════════════════════════════════════

function _createRamps(scene, RAPIER, world) {
  // Place ramps on straights
  const ramps = [
    // Bottom straight, heading +x
    { x: -15, z: -42, angle: 0.26, rotY: 0, w: 3, h: 0.15, d: 4, label: 'big' },
    // Right straight, heading +z
    { x: 42, z: -10, angle: 0.22, rotY: Math.PI / 2, w: 3, h: 0.12, d: 3.5, label: 'med' },
    // Top straight, heading -x
    { x: 10, z: 42, angle: 0.30, rotY: Math.PI, w: 2.5, h: 0.18, d: 3, label: 'steep' },
    // Left straight, heading -z
    { x: -42, z: 15, angle: 0.20, rotY: -Math.PI / 2, w: 3, h: 0.10, d: 3.5, label: 'gentle' },
  ]

  for (const ramp of ramps) {
    const { x, z, angle, rotY, w, h, d } = ramp

    // Visual ramp mesh
    const rampGroup = new THREE.Group()
    const rampMesh = new THREE.Mesh(
      new THREE.BoxGeometry(w, h, d),
      MAT.rampRed
    )
    rampMesh.castShadow = true
    rampMesh.receiveShadow = true
    rampGroup.add(rampMesh)

    // Red/white stripes on top
    const stripeCount = 4
    for (let s = 0; s < stripeCount; s++) {
      const stripe = new THREE.Mesh(
        new THREE.BoxGeometry(w * 0.95, 0.02, d / stripeCount * 0.4),
        s % 2 === 0 ? MAT.white : MAT.rampRed
      )
      stripe.position.set(0, h / 2 + 0.01, -d / 2 + (s + 0.5) * (d / stripeCount))
      rampGroup.add(stripe)
    }

    // Position and rotate the visual group
    rampGroup.position.set(x, h / 2 + 0.01, z)
    rampGroup.rotation.y = rotY

    // Apply ramp tilt angle around local X
    rampGroup.rotation.x = -angle
    scene.add(rampGroup)

    // Rapier collider with combined rotation (Y turn + X tilt)
    // Build quaternion: first Y rotation, then X tilt
    const qY = new THREE.Quaternion()
    qY.setFromAxisAngle(new THREE.Vector3(0, 1, 0), rotY)
    const qX = new THREE.Quaternion()
    qX.setFromAxisAngle(new THREE.Vector3(1, 0, 0), -angle)
    const qCombined = new THREE.Quaternion()
    qCombined.multiplyQuaternions(qY, qX)

    const bd = RAPIER.RigidBodyDesc.fixed()
      .setTranslation(x, h / 2 + 0.01, z)
      .setRotation({ x: qCombined.x, y: qCombined.y, z: qCombined.z, w: qCombined.w })
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(w / 2, h / 2, d / 2).setFriction(0.8),
      body
    )

    // Side rails (small walls along ramp edges)
    for (const side of [-1, 1]) {
      const rail = new THREE.Mesh(
        new THREE.BoxGeometry(0.15, h + 0.2, d),
        MAT.yellow
      )
      rail.position.set(side * (w / 2 + 0.08), 0.1, 0)
      rail.castShadow = true
      rampGroup.add(rail)
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════
//  GRANDSTANDS (3 — one big, two smaller)
// ═══════════════════════════════════════════════════════════════════════════

function _createGrandstands(scene, RAPIER, world) {
  const stands = [
    // Big grandstand along bottom straight outside
    { x: 0, z: -52, rows: 5, width: 20, rotY: 0, label: 'main' },
    // Smaller one along right straight
    { x: 52, z: 0, rows: 3, width: 12, rotY: Math.PI / 2, label: 'east' },
    // Smaller one along top straight
    { x: -10, z: 52, rows: 3, width: 10, rotY: Math.PI, label: 'north' },
  ]

  const seatColors = ['#c0392b', '#2980b9', '#f1c40f', '#27ae60', '#e74c3c', '#8e44ad', '#ff6f00']

  for (const stand of stands) {
    const g = new THREE.Group()
    g.position.set(stand.x, 0, stand.z)
    g.rotation.y = stand.rotY

    const rowH = 0.8
    const rowD = 1.2
    const seatSpacing = 0.8

    for (let r = 0; r < stand.rows; r++) {
      // Concrete tier
      const tier = new THREE.Mesh(
        new THREE.BoxGeometry(stand.width, rowH, rowD),
        MAT.concrete
      )
      tier.position.set(0, r * rowH + rowH / 2, r * rowD)
      tier.castShadow = true
      tier.receiveShadow = true
      g.add(tier)

      // Colored seat cubes (the "crowd")
      const seatsPerRow = Math.floor(stand.width / seatSpacing)
      for (let s = 0; s < seatsPerRow; s++) {
        const seatColor = seatColors[(r * seatsPerRow + s) % seatColors.length]
        const seat = new THREE.Mesh(
          new THREE.BoxGeometry(0.35, 0.4, 0.35),
          new THREE.MeshStandardMaterial({ color: seatColor, flatShading: true })
        )
        seat.position.set(
          -stand.width / 2 + seatSpacing / 2 + s * seatSpacing,
          r * rowH + rowH + 0.2,
          r * rowD
        )
        seat.castShadow = true
        g.add(seat)
      }
    }

    // Roof overhang
    const roofW = stand.width + 2
    const roofD = stand.rows * rowD + 2
    const roofH = stand.rows * rowH + 2.5
    const roof = new THREE.Mesh(
      new THREE.BoxGeometry(roofW, 0.15, roofD),
      MAT.steel
    )
    roof.position.set(0, roofH, roofD / 2 - 1)
    roof.castShadow = true
    g.add(roof)

    // Roof support pillars
    for (const sx of [-roofW / 2 + 0.5, roofW / 2 - 0.5]) {
      for (const sz of [0, roofD - 2]) {
        const pillar = new THREE.Mesh(
          new THREE.CylinderGeometry(0.15, 0.15, roofH, 6),
          MAT.steel
        )
        pillar.position.set(sx, roofH / 2, sz)
        pillar.castShadow = true
        g.add(pillar)
      }
    }

    scene.add(g)

    // Collider for the entire grandstand (big box)
    const totalH = stand.rows * rowH + 1
    const totalD = stand.rows * rowD + 1
    const halfA = stand.rotY * 0.5
    const bd = RAPIER.RigidBodyDesc.fixed()
      .setTranslation(stand.x, totalH / 2, stand.z)
      .setRotation({ x: 0, y: Math.sin(halfA), z: 0, w: Math.cos(halfA) })
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(stand.width / 2, totalH / 2, totalD / 2).setFriction(0.5),
      body
    )
  }
}

// ═══════════════════════════════════════════════════════════════════════════
//  PIT LANE — along right straight (x ~ 36-42), with garages, fuel, tools
// ═══════════════════════════════════════════════════════════════════════════

function _createPitLane(scene, RAPIER, world, syncList) {
  const pitX = 36  // pit lane runs parallel to main straight at x=42
  const pitStartZ = -25
  const pitEndZ = 25
  const pitLen = pitEndZ - pitStartZ

  // Pit lane road surface
  const pitRoad = new THREE.Mesh(
    new THREE.PlaneGeometry(4, pitLen),
    MAT.pitAsphalt
  )
  pitRoad.rotation.x = -Math.PI / 2
  pitRoad.position.set(pitX, 0.02, (pitStartZ + pitEndZ) / 2)
  pitRoad.receiveShadow = true
  scene.add(pitRoad)

  // Pit wall separating pit from track (low wall)
  const wallLen = pitLen
  const wallH = 0.8
  const wall = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, wallH, wallLen),
    MAT.concrete
  )
  wall.position.set(pitX + 2.5, wallH / 2, (pitStartZ + pitEndZ) / 2)
  wall.castShadow = true
  scene.add(wall)

  // Pit wall Rapier collider
  const wbd = RAPIER.RigidBodyDesc.fixed()
    .setTranslation(pitX + 2.5, wallH / 2, (pitStartZ + pitEndZ) / 2)
  world.createCollider(
    RAPIER.ColliderDesc.cuboid(0.15, wallH / 2, wallLen / 2).setFriction(0.5),
    world.createRigidBody(wbd)
  )

  // Speed bumps at pit entry and exit
  for (const sz of [pitStartZ + 1, pitEndZ - 1]) {
    const bump = new THREE.Mesh(
      new THREE.BoxGeometry(3.5, 0.08, 0.4),
      MAT.yellow
    )
    bump.position.set(pitX, 0.04, sz)
    bump.castShadow = true
    scene.add(bump)
  }

  // 4 pit garages
  const garageW = 5
  const garageH = 3
  const garageD = 5
  for (let i = 0; i < 4; i++) {
    const gz = pitStartZ + 4 + i * (pitLen - 8) / 3.5

    const garageGroup = new THREE.Group()
    garageGroup.position.set(pitX - 5, 0, gz)

    // Back wall
    const back = new THREE.Mesh(
      new THREE.BoxGeometry(garageW, garageH, 0.2),
      MAT.gray
    )
    back.position.set(0, garageH / 2, -garageD / 2)
    back.castShadow = true
    garageGroup.add(back)

    // Side walls
    for (const side of [-1, 1]) {
      const sw = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, garageH, garageD),
        MAT.gray
      )
      sw.position.set(side * garageW / 2, garageH / 2, 0)
      sw.castShadow = true
      garageGroup.add(sw)
    }

    // Roof
    const roofMesh = new THREE.Mesh(
      new THREE.BoxGeometry(garageW + 0.4, 0.15, garageD + 0.4),
      MAT.steel
    )
    roofMesh.position.set(0, garageH, 0)
    roofMesh.castShadow = true
    garageGroup.add(roofMesh)

    // Floor
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(garageW, garageD),
      MAT.darkAsphalt
    )
    floor.rotation.x = -Math.PI / 2
    floor.position.set(0, 0.015, 0)
    garageGroup.add(floor)

    // Tire stacks (2 per garage)
    for (let t = 0; t < 2; t++) {
      for (let row = 0; row < 3; row++) {
        const tireMesh = new THREE.Mesh(
          new THREE.CylinderGeometry(0.25, 0.25, 0.15, 8),
          MAT.tire
        )
        tireMesh.position.set(
          -garageW / 2 + 0.6 + t * 1.2,
          0.15 + row * 0.28,
          -garageD / 2 + 0.6
        )
        tireMesh.rotation.x = Math.PI / 2
        tireMesh.castShadow = true
        garageGroup.add(tireMesh)
      }
    }

    // Tool rack (flat colored boxes on back wall)
    for (let tr = 0; tr < 3; tr++) {
      const tool = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 0.5, 0.08),
        tr % 2 === 0 ? MAT.red : MAT.blue
      )
      tool.position.set(garageW / 2 - 0.8 - tr * 0.3, 1.2, -garageD / 2 + 0.2)
      garageGroup.add(tool)
    }

    // Jack stand
    const jack = new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 0.3, 0.6),
      MAT.red
    )
    jack.position.set(1.0, 0.15, 0)
    jack.castShadow = true
    garageGroup.add(jack)

    scene.add(garageGroup)

    // Garage collider (back wall + sides)
    const gbd = RAPIER.RigidBodyDesc.fixed()
      .setTranslation(pitX - 5, garageH / 2, gz)
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(garageW / 2, garageH / 2, 0.1).setFriction(0.5),
      world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(pitX - 5, garageH / 2, gz - garageD / 2))
    )
  }

  // Fuel pumps (2)
  for (let f = 0; f < 2; f++) {
    const fz = pitStartZ + 12 + f * 18
    const pumpGroup = new THREE.Group()
    pumpGroup.position.set(pitX - 1.5, 0, fz)

    const pumpBody = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 1.2, 0.4),
      MAT.red
    )
    pumpBody.position.y = 0.6
    pumpBody.castShadow = true
    pumpGroup.add(pumpBody)

    const pumpTop = new THREE.Mesh(
      new THREE.BoxGeometry(0.55, 0.15, 0.45),
      MAT.steel
    )
    pumpTop.position.y = 1.25
    pumpGroup.add(pumpTop)

    // Gauge (small emissive circle)
    const gauge = new THREE.Mesh(
      new THREE.CircleGeometry(0.1, 6),
      MAT.emissiveGreen
    )
    gauge.position.set(0, 0.8, 0.21)
    pumpGroup.add(gauge)

    // Hose (small cylinder)
    const hose = new THREE.Mesh(
      new THREE.CylinderGeometry(0.03, 0.03, 0.8, 5),
      MAT.black
    )
    hose.position.set(0.3, 0.9, 0)
    hose.rotation.z = 0.5
    pumpGroup.add(hose)

    scene.add(pumpGroup)
  }
}

// ═══════════════════════════════════════════════════════════════════════════
//  TIRE BARRIERS — stacked cylinders at corners (mix FIXED + DYNAMIC)
// ═══════════════════════════════════════════════════════════════════════════

function _createTireBarriers(scene, RAPIER, world, syncList) {
  // Place tire walls at the 4 corners of the track
  const corners = [
    { cx: 30, cz: -30, angle: -Math.PI / 4 },   // bottom-right
    { cx: 30, cz: 30, angle: Math.PI / 4 },      // top-right
    { cx: -30, cz: 30, angle: 3 * Math.PI / 4 }, // top-left
    { cx: -30, cz: -30, angle: -3 * Math.PI / 4 }, // bottom-left
  ]

  for (const corner of corners) {
    const tireR = 0.28
    const tireH = 0.18

    // Fixed barrier wall (3x3 stack)
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 5; col++) {
        const offsetAlongWall = (col - 2) * (tireR * 2.2)
        const x = corner.cx + Math.cos(corner.angle) * offsetAlongWall
        const z = corner.cz + Math.sin(corner.angle) * offsetAlongWall
        const y = tireR + row * (tireR * 2)

        const tireMesh = new THREE.Mesh(
          new THREE.CylinderGeometry(tireR, tireR, tireH, 8),
          MAT.tire
        )
        tireMesh.position.set(x, y, z)
        tireMesh.rotation.x = Math.PI / 2
        tireMesh.rotation.y = corner.angle
        tireMesh.castShadow = true
        scene.add(tireMesh)

        // Fixed colliders for the bottom 2 rows, dynamic for top row
        if (row < 2) {
          const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(x, y, z)
          const body = world.createRigidBody(bd)
          world.createCollider(
            RAPIER.ColliderDesc.cylinder(tireH / 2, tireR).setFriction(0.6).setRestitution(0.3),
            body
          )
        } else {
          // Top row is dynamic — can be knocked off!
          const bd = RAPIER.RigidBodyDesc.dynamic()
            .setTranslation(x, y, z)
            .setLinearDamping(0.5)
            .setAngularDamping(0.5)
          const body = world.createRigidBody(bd)
          world.createCollider(
            RAPIER.ColliderDesc.cylinder(tireH / 2, tireR)
              .setDensity(8.0).setFriction(0.6).setRestitution(0.4),
            body
          )
          syncList.push({ mesh: tireMesh, body })
        }
      }
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════
//  GRAVEL + SAND TRAPS outside corners
// ═══════════════════════════════════════════════════════════════════════════

function _createGravelTraps(scene) {
  const traps = [
    // Outside each corner
    { x: 35, z: -35, w: 10, d: 10, mat: MAT.gravel },
    { x: 35, z: 35, w: 10, d: 10, mat: MAT.sand },
    { x: -35, z: 35, w: 10, d: 10, mat: MAT.gravel },
    { x: -35, z: -35, w: 10, d: 10, mat: MAT.sand },
    // Run-off areas
    { x: 46, z: -35, w: 6, d: 8, mat: MAT.gravel },
    { x: -46, z: 35, w: 6, d: 8, mat: MAT.sand },
  ]

  for (const trap of traps) {
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(trap.w, trap.d),
      trap.mat
    )
    mesh.rotation.x = -Math.PI / 2
    mesh.position.set(trap.x, 0.015, trap.z)
    mesh.receiveShadow = true
    scene.add(mesh)
  }
}

// ═══════════════════════════════════════════════════════════════════════════
//  PODIUM + TROPHY (infield near center)
// ═══════════════════════════════════════════════════════════════════════════

function _createPodium(scene, RAPIER, world) {
  const px = -8
  const pz = 8

  // 3 stepped boxes
  const steps = [
    { dx: 0, w: 1.5, h: 2.0, d: 1.5, mat: MAT.gold, label: '1st' },
    { dx: -2, w: 1.5, h: 1.5, d: 1.5, mat: MAT.silver, label: '2nd' },
    { dx: 2, w: 1.5, h: 1.0, d: 1.5, mat: MAT.bronze, label: '3rd' },
  ]

  for (const step of steps) {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(step.w, step.h, step.d),
      step.mat
    )
    mesh.position.set(px + step.dx, step.h / 2, pz)
    mesh.castShadow = true
    mesh.receiveShadow = true
    scene.add(mesh)

    // Number plate
    const plate = new THREE.Mesh(
      new THREE.BoxGeometry(0.6, 0.4, 0.05),
      MAT.white
    )
    plate.position.set(px + step.dx, step.h - 0.3, pz + step.d / 2 + 0.03)
    scene.add(plate)
  }

  // Trophy on top of 1st place
  const trophyBase = new THREE.Mesh(
    new THREE.CylinderGeometry(0.3, 0.4, 0.3, 8),
    MAT.gold
  )
  trophyBase.position.set(px, 2.15, pz)
  trophyBase.castShadow = true
  scene.add(trophyBase)

  const trophyCup = new THREE.Mesh(
    new THREE.CylinderGeometry(0.35, 0.15, 0.6, 8),
    MAT.gold
  )
  trophyCup.position.set(px, 2.6, pz)
  trophyCup.castShadow = true
  scene.add(trophyCup)

  // Trophy handles (2 small boxes)
  for (const side of [-1, 1]) {
    const handle = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.3, 0.08),
      MAT.gold
    )
    handle.position.set(px + side * 0.4, 2.5, pz)
    handle.castShadow = true
    scene.add(handle)
  }

  // Large display trophy nearby
  const bigTrophy = new THREE.Group()
  bigTrophy.position.set(px + 6, 0, pz)

  const bigBase = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 0.5, 1.5),
    MAT.concrete
  )
  bigBase.position.y = 0.25
  bigBase.castShadow = true
  bigTrophy.add(bigBase)

  const bigCupStem = new THREE.Mesh(
    new THREE.CylinderGeometry(0.15, 0.3, 1.5, 6),
    MAT.gold
  )
  bigCupStem.position.y = 1.25
  bigCupStem.castShadow = true
  bigTrophy.add(bigCupStem)

  const bigCup = new THREE.Mesh(
    new THREE.CylinderGeometry(0.6, 0.2, 0.8, 8),
    MAT.gold
  )
  bigCup.position.y = 2.4
  bigCup.castShadow = true
  bigTrophy.add(bigCup)

  scene.add(bigTrophy)

  // Podium collider
  const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(px, 1, pz)
  world.createCollider(
    RAPIER.ColliderDesc.cuboid(3, 1, 1).setFriction(0.5),
    world.createRigidBody(bd)
  )
}

// ═══════════════════════════════════════════════════════════════════════════
//  SPONSOR BILLBOARDS (8)
// ═══════════════════════════════════════════════════════════════════════════

function _createBillboards(scene, RAPIER, world) {
  const billboards = [
    { x: 15, z: -48, rotY: 0, color: '#e74c3c', stripeColor: '#f1c40f' },
    { x: -15, z: -48, rotY: 0, color: '#2980b9', stripeColor: '#ffffff' },
    { x: 48, z: 15, rotY: Math.PI / 2, color: '#27ae60', stripeColor: '#f1c40f' },
    { x: 48, z: -15, rotY: Math.PI / 2, color: '#8e44ad', stripeColor: '#ffffff' },
    { x: 15, z: 48, rotY: Math.PI, color: '#ff6f00', stripeColor: '#111111' },
    { x: -15, z: 48, rotY: Math.PI, color: '#c0392b', stripeColor: '#ffffff' },
    { x: -48, z: 15, rotY: -Math.PI / 2, color: '#2980b9', stripeColor: '#f1c40f' },
    { x: -48, z: -15, rotY: -Math.PI / 2, color: '#27ae60', stripeColor: '#e74c3c' },
  ]

  for (const bb of billboards) {
    const g = new THREE.Group()
    g.position.set(bb.x, 0, bb.z)
    g.rotation.y = bb.rotY

    // Two poles
    for (const side of [-1, 1]) {
      const pole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.08, 4, 5),
        MAT.steel
      )
      pole.position.set(side * 2.5, 2, 0)
      pole.castShadow = true
      g.add(pole)
    }

    // Billboard face
    const face = new THREE.Mesh(
      new THREE.BoxGeometry(5.5, 2, 0.1),
      new THREE.MeshStandardMaterial({ color: bb.color, flatShading: true })
    )
    face.position.set(0, 3.5, 0)
    face.castShadow = true
    g.add(face)

    // Stripe accent
    const stripe = new THREE.Mesh(
      new THREE.BoxGeometry(5.3, 0.3, 0.12),
      new THREE.MeshStandardMaterial({ color: bb.stripeColor, flatShading: true })
    )
    stripe.position.set(0, 3.5, 0.06)
    g.add(stripe)

    // Second stripe
    const stripe2 = new THREE.Mesh(
      new THREE.BoxGeometry(3.5, 0.2, 0.12),
      new THREE.MeshStandardMaterial({ color: bb.stripeColor, flatShading: true })
    )
    stripe2.position.set(0, 3.0, 0.06)
    g.add(stripe2)

    scene.add(g)

    // Billboard pole colliders
    for (const side of [-1, 1]) {
      const halfA = bb.rotY * 0.5
      const cos = Math.cos(bb.rotY)
      const sin = Math.sin(bb.rotY)
      const wx = bb.x + side * 2.5 * cos
      const wz = bb.z + side * 2.5 * (-sin)
      // Simplified: just put small colliders at pole world positions
      const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(wx, 2, wz)
      world.createCollider(
        RAPIER.ColliderDesc.cuboid(0.12, 2, 0.12).setFriction(0.5),
        world.createRigidBody(bd)
      )
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════
//  MARSHAL POSTS (8 with animated flags)
// ═══════════════════════════════════════════════════════════════════════════

function _createMarshalPosts(scene, animatedObjects) {
  const posts = [
    { x: -30, z: -46, color: '#ffff00' },
    { x: 30, z: -46, color: '#00ff00' },
    { x: 46, z: -20, color: '#ff0000' },
    { x: 46, z: 20, color: '#0000ff' },
    { x: 30, z: 46, color: '#ffff00' },
    { x: -30, z: 46, color: '#ffffff' },
    { x: -46, z: 20, color: '#ff0000' },
    { x: -46, z: -20, color: '#00ff00' },
  ]

  for (let i = 0; i < posts.length; i++) {
    const p = posts[i]

    // Pole
    const pole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.06, 3.5, 5),
      MAT.steel
    )
    pole.position.set(p.x, 1.75, p.z)
    pole.castShadow = true
    scene.add(pole)

    // Platform base
    const base = new THREE.Mesh(
      new THREE.CylinderGeometry(0.4, 0.4, 0.2, 6),
      MAT.concrete
    )
    base.position.set(p.x, 0.1, p.z)
    scene.add(base)

    // Flag (animated)
    const flag = new THREE.Mesh(
      new THREE.PlaneGeometry(0.8, 0.5),
      new THREE.MeshStandardMaterial({
        color: p.color,
        flatShading: true,
        side: THREE.DoubleSide,
      })
    )
    flag.position.set(p.x + 0.5, 3.2, p.z)
    scene.add(flag)

    animatedObjects.push({ type: 'flag', mesh: flag, phase: i * 1.3 })
  }
}

// ═══════════════════════════════════════════════════════════════════════════
//  STARTING LIGHTS GANTRY
// ═══════════════════════════════════════════════════════════════════════════

function _createStartingLights(scene, animatedObjects) {
  const slX = 5
  const slZ = -42
  const pillarH = 5.5

  // Gantry structure
  const gantryGroup = new THREE.Group()
  gantryGroup.position.set(slX, 0, slZ)

  // Pillar
  const pillar = new THREE.Mesh(
    new THREE.CylinderGeometry(0.12, 0.15, pillarH, 6),
    MAT.steel
  )
  pillar.position.y = pillarH / 2
  pillar.castShadow = true
  gantryGroup.add(pillar)

  // Light housing
  const housing = new THREE.Mesh(
    new THREE.BoxGeometry(0.6, 2.5, 0.4),
    MAT.black
  )
  housing.position.set(0, pillarH - 0.5, 0)
  housing.castShadow = true
  gantryGroup.add(housing)

  // 5 red lights (column)
  for (let i = 0; i < 5; i++) {
    const light = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 6, 5),
      new THREE.MeshStandardMaterial({
        color: '#ff0000', flatShading: true,
        emissive: '#ff0000', emissiveIntensity: 0.1,
      })
    )
    light.position.set(0, pillarH - 1.5 + i * 0.45, 0.25)
    gantryGroup.add(light)
    animatedObjects.push({ type: 'startLight', mesh: light, phase: 0, index: i })
  }

  scene.add(gantryGroup)
}

// ═══════════════════════════════════════════════════════════════════════════
//  INFIELD FEATURES — media center, parc ferme, safety vehicles
// ═══════════════════════════════════════════════════════════════════════════

function _createInfieldFeatures(scene, RAPIER, world) {
  // Media center (boxy building with "screens")
  const mcX = 12
  const mcZ = -8
  const mcGroup = new THREE.Group()
  mcGroup.position.set(mcX, 0, mcZ)

  const mcBody = new THREE.Mesh(
    new THREE.BoxGeometry(6, 3, 4),
    MAT.gray
  )
  mcBody.position.y = 1.5
  mcBody.castShadow = true
  mcGroup.add(mcBody)

  const mcRoof = new THREE.Mesh(
    new THREE.BoxGeometry(6.5, 0.15, 4.5),
    MAT.steel
  )
  mcRoof.position.y = 3.1
  mcGroup.add(mcRoof)

  // Screen panels (emissive blue)
  for (let i = 0; i < 3; i++) {
    const screen = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 1.0, 0.05),
      MAT.emissiveBlue
    )
    screen.position.set(-2 + i * 2, 2.0, 2.03)
    mcGroup.add(screen)
  }

  // Satellite dish on roof
  const dish = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 6, 4, 0, Math.PI * 2, 0, Math.PI / 2),
    MAT.white
  )
  dish.position.set(2, 3.3, -1)
  dish.rotation.x = -0.3
  mcGroup.add(dish)

  scene.add(mcGroup)

  // Media center collider
  const mcBd = RAPIER.RigidBodyDesc.fixed().setTranslation(mcX, 1.5, mcZ)
  world.createCollider(
    RAPIER.ColliderDesc.cuboid(3, 1.5, 2).setFriction(0.5),
    world.createRigidBody(mcBd)
  )

  // Parc ferme area (fenced)
  const pfX = -12
  const pfZ = -10
  const pfW = 8
  const pfD = 6

  // Fence posts + rails
  const fenceMat = MAT.steel
  const fenceH = 1.2
  const postSpacing = 2

  for (let side = 0; side < 4; side++) {
    let startX, startZ, endX, endZ
    if (side === 0) { startX = pfX - pfW / 2; startZ = pfZ - pfD / 2; endX = pfX + pfW / 2; endZ = pfZ - pfD / 2 }
    else if (side === 1) { startX = pfX + pfW / 2; startZ = pfZ - pfD / 2; endX = pfX + pfW / 2; endZ = pfZ + pfD / 2 }
    else if (side === 2) { startX = pfX + pfW / 2; startZ = pfZ + pfD / 2; endX = pfX - pfW / 2; endZ = pfZ + pfD / 2 }
    else { startX = pfX - pfW / 2; startZ = pfZ + pfD / 2; endX = pfX - pfW / 2; endZ = pfZ - pfD / 2 }

    const dx = endX - startX
    const dz = endZ - startZ
    const len = Math.sqrt(dx * dx + dz * dz)
    const posts = Math.max(2, Math.floor(len / postSpacing) + 1)

    for (let p = 0; p < posts; p++) {
      const t = p / (posts - 1)
      const fx = startX + dx * t
      const fz = startZ + dz * t

      const post = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, fenceH, 4),
        fenceMat
      )
      post.position.set(fx, fenceH / 2, fz)
      post.castShadow = true
      scene.add(post)
    }

    // Horizontal rail
    const angle = Math.atan2(dz, dx)
    for (const rh of [0.4, 0.9]) {
      const rail = new THREE.Mesh(
        new THREE.BoxGeometry(len, 0.04, 0.04),
        fenceMat
      )
      rail.position.set(
        (startX + endX) / 2,
        rh,
        (startZ + endZ) / 2
      )
      rail.rotation.y = -angle
      scene.add(rail)
    }
  }

  // Parc ferme label sign
  const pfSign = new THREE.Mesh(
    new THREE.BoxGeometry(2, 0.6, 0.08),
    MAT.white
  )
  pfSign.position.set(pfX, 1.6, pfZ - pfD / 2)
  scene.add(pfSign)

  // Safety car (box vehicle, infield)
  _createBoxVehicle(scene, RAPIER, world, -5, -5, 0.5, '#ffffff', 'safety')

  // Ambulance
  _createBoxVehicle(scene, RAPIER, world, 8, 5, Math.PI / 4, '#ffffff', 'ambulance')
}

function _createBoxVehicle(scene, RAPIER, world, x, z, rotY, color, type) {
  const g = new THREE.Group()
  g.position.set(x, 0, z)
  g.rotation.y = rotY

  const bodyMat = new THREE.MeshStandardMaterial({ color, flatShading: true })

  // Body
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(1.2, 0.5, 2.2),
    bodyMat
  )
  body.position.y = 0.35
  body.castShadow = true
  g.add(body)

  // Cabin (slightly narrower, raised)
  const cabin = new THREE.Mesh(
    new THREE.BoxGeometry(1.0, 0.4, 1.4),
    bodyMat
  )
  cabin.position.set(0, 0.8, -0.1)
  cabin.castShadow = true
  g.add(cabin)

  // Windshield
  const ws = new THREE.Mesh(
    new THREE.BoxGeometry(0.9, 0.3, 0.04),
    MAT.glass
  )
  ws.position.set(0, 0.8, 0.6)
  ws.rotation.x = 0.2
  g.add(ws)

  // Wheels
  const wheelGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.14, 7)
  const wheelPositions = [[-0.6, 0.15, 0.65], [0.6, 0.15, 0.65], [-0.6, 0.15, -0.65], [0.6, 0.15, -0.65]]
  for (const [wx, wy, wz] of wheelPositions) {
    const wheel = new THREE.Mesh(wheelGeo, MAT.tire)
    wheel.rotation.z = Math.PI / 2
    wheel.position.set(wx, wy, wz)
    wheel.castShadow = true
    g.add(wheel)
  }

  // Roof light bar
  if (type === 'safety' || type === 'ambulance') {
    const lightBar = new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 0.12, 0.3),
      type === 'ambulance' ? MAT.emissiveRed : MAT.emissiveAmber
    )
    lightBar.position.set(0, 1.06, 0)
    g.add(lightBar)
  }

  // Red cross for ambulance
  if (type === 'ambulance') {
    const crossH = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.12, 0.04),
      MAT.brightRed
    )
    crossH.position.set(0, 0.4, 1.12)
    g.add(crossH)
    const crossV = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 0.5, 0.04),
      MAT.brightRed
    )
    crossV.position.set(0, 0.4, 1.12)
    g.add(crossV)
  }

  scene.add(g)

  // Collider
  const halfA = rotY * 0.5
  const bd = RAPIER.RigidBodyDesc.fixed()
    .setTranslation(x, 0.45, z)
    .setRotation({ x: 0, y: Math.sin(halfA), z: 0, w: Math.cos(halfA) })
  world.createCollider(
    RAPIER.ColliderDesc.cuboid(0.6, 0.45, 1.1).setFriction(0.5),
    world.createRigidBody(bd)
  )
}

// ═══════════════════════════════════════════════════════════════════════════
//  RACING VEHICLES (8 — go-karts, formula cars, pace car, pickup+trailer)
// ═══════════════════════════════════════════════════════════════════════════

function _createRacingVehicles(scene, RAPIER, world) {
  // 4 go-karts
  const kartColors = ['#e74c3c', '#2980b9', '#27ae60', '#f1c40f']
  const kartPositions = [
    { x: -28, z: -5, rotY: 0.3 },
    { x: -26, z: -3, rotY: 0.5 },
    { x: -28, z: 3, rotY: -0.2 },
    { x: -26, z: 5, rotY: -0.4 },
  ]

  for (let i = 0; i < 4; i++) {
    const kp = kartPositions[i]
    const g = new THREE.Group()
    g.position.set(kp.x, 0, kp.z)
    g.rotation.y = kp.rotY

    // Kart body (small flat box)
    const kartBody = new THREE.Mesh(
      new THREE.BoxGeometry(0.6, 0.2, 1.1),
      new THREE.MeshStandardMaterial({ color: kartColors[i], flatShading: true })
    )
    kartBody.position.y = 0.2
    kartBody.castShadow = true
    g.add(kartBody)

    // Seat back
    const seat = new THREE.Mesh(
      new THREE.BoxGeometry(0.35, 0.3, 0.2),
      MAT.black
    )
    seat.position.set(0, 0.35, -0.2)
    g.add(seat)

    // Steering column
    const steer = new THREE.Mesh(
      new THREE.CylinderGeometry(0.03, 0.03, 0.25, 4),
      MAT.steel
    )
    steer.position.set(0, 0.35, 0.2)
    steer.rotation.x = -0.4
    g.add(steer)

    // Steering wheel
    const steerWheel = new THREE.Mesh(
      new THREE.TorusGeometry(0.08, 0.02, 4, 6),
      MAT.black
    )
    steerWheel.position.set(0, 0.45, 0.3)
    steerWheel.rotation.x = -0.4
    g.add(steerWheel)

    // 4 wheels
    const kwGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.1, 6)
    const kwPositions = [[-0.35, 0.1, 0.35], [0.35, 0.1, 0.35], [-0.35, 0.1, -0.35], [0.35, 0.1, -0.35]]
    for (const [wx, wy, wz] of kwPositions) {
      const kw = new THREE.Mesh(kwGeo, MAT.tire)
      kw.rotation.z = Math.PI / 2
      kw.position.set(wx, wy, wz)
      kw.castShadow = true
      g.add(kw)
    }

    // Number plate
    const numPlate = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 0.2, 0.04),
      MAT.white
    )
    numPlate.position.set(0, 0.25, 0.57)
    g.add(numPlate)

    scene.add(g)

    // Collider
    const halfA = kp.rotY * 0.5
    const bd = RAPIER.RigidBodyDesc.fixed()
      .setTranslation(kp.x, 0.2, kp.z)
      .setRotation({ x: 0, y: Math.sin(halfA), z: 0, w: Math.cos(halfA) })
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(0.3, 0.2, 0.55).setFriction(0.5),
      world.createRigidBody(bd)
    )
  }

  // 2 formula-style cars
  const formulaColors = ['#e74c3c', '#2980b9']
  const formulaPositions = [
    { x: 10, z: 10, rotY: Math.PI / 3 },
    { x: 12, z: 12, rotY: Math.PI / 3 + 0.2 },
  ]

  for (let i = 0; i < 2; i++) {
    const fp = formulaPositions[i]
    const g = new THREE.Group()
    g.position.set(fp.x, 0, fp.z)
    g.rotation.y = fp.rotY

    const fColor = new THREE.MeshStandardMaterial({ color: formulaColors[i], flatShading: true })

    // Low flat body
    const fBody = new THREE.Mesh(
      new THREE.BoxGeometry(0.7, 0.15, 2.2),
      fColor
    )
    fBody.position.y = 0.18
    fBody.castShadow = true
    g.add(fBody)

    // Nose cone (tapered box)
    const nose = new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 0.12, 0.6),
      fColor
    )
    nose.position.set(0, 0.16, 1.3)
    g.add(nose)

    // Cockpit
    const cockpit = new THREE.Mesh(
      new THREE.BoxGeometry(0.45, 0.25, 0.5),
      MAT.black
    )
    cockpit.position.set(0, 0.33, -0.2)
    g.add(cockpit)

    // Rear wing
    const wingPillarGeo = new THREE.BoxGeometry(0.04, 0.35, 0.04)
    for (const side of [-1, 1]) {
      const pillar = new THREE.Mesh(wingPillarGeo, MAT.steel)
      pillar.position.set(side * 0.3, 0.35, -1.0)
      g.add(pillar)
    }
    const wing = new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 0.04, 0.25),
      fColor
    )
    wing.position.set(0, 0.55, -1.0)
    wing.castShadow = true
    g.add(wing)

    // Front wing
    const fwing = new THREE.Mesh(
      new THREE.BoxGeometry(0.7, 0.03, 0.15),
      fColor
    )
    fwing.position.set(0, 0.08, 1.5)
    g.add(fwing)

    // 4 wheels
    const fwGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.12, 7)
    const fwPositions = [[-0.45, 0.12, 0.7], [0.45, 0.12, 0.7], [-0.4, 0.12, -0.7], [0.4, 0.12, -0.7]]
    for (const [wx, wy, wz] of fwPositions) {
      const fw = new THREE.Mesh(fwGeo, MAT.tire)
      fw.rotation.z = Math.PI / 2
      fw.position.set(wx, wy, wz)
      fw.castShadow = true
      g.add(fw)
    }

    scene.add(g)

    const halfA = fp.rotY * 0.5
    const bd = RAPIER.RigidBodyDesc.fixed()
      .setTranslation(fp.x, 0.2, fp.z)
      .setRotation({ x: 0, y: Math.sin(halfA), z: 0, w: Math.cos(halfA) })
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(0.35, 0.2, 1.1).setFriction(0.5),
      world.createRigidBody(bd)
    )
  }

  // Pace car (yellow)
  _createBoxVehicle(scene, RAPIER, world, -15, 10, 0.8, '#f1c40f', 'safety')

  // Pickup truck with trailer
  const truckX = 25
  const truckZ = -12
  const truckRotY = -0.3
  const truckG = new THREE.Group()
  truckG.position.set(truckX, 0, truckZ)
  truckG.rotation.y = truckRotY

  // Truck cab
  const truckCab = new THREE.Mesh(
    new THREE.BoxGeometry(1.3, 0.6, 1.5),
    new THREE.MeshStandardMaterial({ color: '#2c3e50', flatShading: true })
  )
  truckCab.position.set(0, 0.4, 0.5)
  truckCab.castShadow = true
  truckG.add(truckCab)

  // Truck cabin top
  const truckCabTop = new THREE.Mesh(
    new THREE.BoxGeometry(1.1, 0.4, 1.0),
    new THREE.MeshStandardMaterial({ color: '#2c3e50', flatShading: true })
  )
  truckCabTop.position.set(0, 0.9, 0.7)
  truckCabTop.castShadow = true
  truckG.add(truckCabTop)

  // Windshield
  const truckWS = new THREE.Mesh(
    new THREE.BoxGeometry(1.0, 0.3, 0.04),
    MAT.glass
  )
  truckWS.position.set(0, 0.85, 1.2)
  truckWS.rotation.x = 0.15
  truckG.add(truckWS)

  // Truck bed
  const truckBed = new THREE.Mesh(
    new THREE.BoxGeometry(1.3, 0.12, 1.6),
    new THREE.MeshStandardMaterial({ color: '#34495e', flatShading: true })
  )
  truckBed.position.set(0, 0.26, -0.6)
  truckG.add(truckBed)

  // Bed walls
  for (const side of [-1, 1]) {
    const bedWall = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, 0.4, 1.6),
      new THREE.MeshStandardMaterial({ color: '#34495e', flatShading: true })
    )
    bedWall.position.set(side * 0.62, 0.5, -0.6)
    truckG.add(bedWall)
  }
  const tailgate = new THREE.Mesh(
    new THREE.BoxGeometry(1.2, 0.4, 0.06),
    new THREE.MeshStandardMaterial({ color: '#34495e', flatShading: true })
  )
  tailgate.position.set(0, 0.5, -1.38)
  truckG.add(tailgate)

  // Truck wheels
  const truckWheelGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.16, 7)
  const truckWheelPos = [[-0.65, 0.15, 0.7], [0.65, 0.15, 0.7], [-0.65, 0.15, -0.8], [0.65, 0.15, -0.8]]
  for (const [wx, wy, wz] of truckWheelPos) {
    const tw = new THREE.Mesh(truckWheelGeo, MAT.tire)
    tw.rotation.z = Math.PI / 2
    tw.position.set(wx, wy, wz)
    tw.castShadow = true
    truckG.add(tw)
  }

  // Small trailer behind truck
  const trailer = new THREE.Mesh(
    new THREE.BoxGeometry(1.2, 0.5, 2.0),
    MAT.gray
  )
  trailer.position.set(0, 0.35, -2.8)
  trailer.castShadow = true
  truckG.add(trailer)

  // Trailer hitch bar
  const hitch = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 0.1, 0.8),
    MAT.steel
  )
  hitch.position.set(0, 0.25, -1.8)
  truckG.add(hitch)

  // Trailer wheels
  for (const side of [-1, 1]) {
    const trlW = new THREE.Mesh(truckWheelGeo, MAT.tire)
    trlW.rotation.z = Math.PI / 2
    trlW.position.set(side * 0.65, 0.15, -2.8)
    trlW.castShadow = true
    truckG.add(trlW)
  }

  scene.add(truckG)

  // Truck + trailer collider
  const truckHalfA = truckRotY * 0.5
  const bd = RAPIER.RigidBodyDesc.fixed()
    .setTranslation(truckX, 0.4, truckZ)
    .setRotation({ x: 0, y: Math.sin(truckHalfA), z: 0, w: Math.cos(truckHalfA) })
  world.createCollider(
    RAPIER.ColliderDesc.cuboid(0.65, 0.5, 2.4).setFriction(0.5),
    world.createRigidBody(bd)
  )
}

// ═══════════════════════════════════════════════════════════════════════════
//  TRAFFIC CONES — 35+ DYNAMIC, scattered along and around track
// ═══════════════════════════════════════════════════════════════════════════

function _createTrafficCones(scene, RAPIER, world, syncList) {
  const CONE_R = 0.14
  const CONE_H = 0.42
  const BASE_H = 0.04

  // Generate cone positions — scattered along the track and around interesting areas
  const conePositions = [
    // Along bottom straight
    [-20, -42], [-18, -41.5], [-16, -42.3], [-12, -41.8],
    [-8, -42], [-4, -42.2], [4, -41.8], [8, -42.3],
    [12, -42], [16, -41.5], [20, -42],
    // Along right straight
    [42, -18], [41.5, -14], [42.3, -10], [41.8, -6],
    [42, 6], [42.2, 10], [41.5, 14], [42, 18],
    // Along top straight
    [20, 42], [16, 42.3], [12, 41.8], [8, 42],
    [-8, 42.2], [-12, 42], [-16, 41.5], [-20, 42],
    // Along left straight
    [-42, -15], [-42.3, -10], [-41.8, -5],
    [-42, 5], [-42.2, 10], [-41.5, 15],
    // Around pit entrance
    [38, -26], [37, -24], [36, -22],
    // Random infield
    [5, -5], [-3, 3], [0, -8],
  ]

  for (const [x, z] of conePositions) {
    const coneGroup = new THREE.Group()

    // Base plate
    const base = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, BASE_H, 0.3),
      MAT.orange
    )
    base.position.y = -(CONE_H / 2) + BASE_H / 2
    base.castShadow = true
    coneGroup.add(base)

    // Cone body
    const cone = new THREE.Mesh(
      new THREE.ConeGeometry(CONE_R, CONE_H, 6),
      MAT.orange
    )
    cone.castShadow = true
    coneGroup.add(cone)

    // White reflective stripe
    const stripe = new THREE.Mesh(
      new THREE.CylinderGeometry(CONE_R * 0.6, CONE_R * 0.75, 0.05, 6),
      new THREE.MeshStandardMaterial({
        color: '#ffffff', emissive: '#888888', emissiveIntensity: 0.3, flatShading: true,
      })
    )
    stripe.position.y = -0.04
    coneGroup.add(stripe)

    scene.add(coneGroup)

    // Dynamic Rapier body
    const centerY = CONE_H / 2 + BASE_H
    const bodyDesc = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(x, centerY, z)
      .setLinearDamping(0.3)
      .setAngularDamping(0.4)
    const body = world.createRigidBody(bodyDesc)

    // Lightweight density ~1.5: volume = pi * r^2 * h / 3 ~ 0.0086, density = 1.5 / 0.0086 ~ 174
    // But using cuboid approx: vol ~ 0.28*0.42*0.28 = 0.033, density = 1.5 / 0.033 ~ 45
    const colDesc = RAPIER.ColliderDesc.cuboid(0.14, CONE_H / 2, 0.14)
      .setDensity(6.0)
      .setFriction(0.3)
      .setRestitution(0.15)
    world.createCollider(colDesc, body)

    syncList.push({ mesh: coneGroup, body })
  }
}

// ═══════════════════════════════════════════════════════════════════════════
//  LOOSE TIRES — 8 DYNAMIC cylinders
// ═══════════════════════════════════════════════════════════════════════════

function _createLooseTires(scene, RAPIER, world, syncList) {
  const positions = [
    [32, -28], [28, -32], [32, 28], [28, 32],
    [-32, 28], [-28, 32], [-32, -28], [-28, -32],
  ]

  const tireR = 0.3
  const tireH = 0.2

  for (const [x, z] of positions) {
    const tireMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(tireR, tireR, tireH, 8),
      MAT.tire
    )
    tireMesh.castShadow = true
    scene.add(tireMesh)

    const bodyDesc = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(x, tireR + 0.05, z)
      .setLinearDamping(0.3)
      .setAngularDamping(0.3)
    const body = world.createRigidBody(bodyDesc)

    world.createCollider(
      RAPIER.ColliderDesc.cylinder(tireH / 2, tireR)
        .setDensity(5.0).setFriction(0.5).setRestitution(0.5),
      body
    )
    syncList.push({ mesh: tireMesh, body })
  }
}

// ═══════════════════════════════════════════════════════════════════════════
//  DYNAMIC OBJECTS — barriers, beach ball, fuel barrels, tool boxes
// ═══════════════════════════════════════════════════════════════════════════

function _createDynamicObjects(scene, RAPIER, world, syncList) {
  // 4 dynamic barrier pieces (boxes)
  const barrierPositions = [
    [25, -38], [-25, -38], [25, 38], [-25, 38],
  ]
  for (const [x, z] of barrierPositions) {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 0.5, 0.4),
      MAT.red
    )
    mesh.castShadow = true
    scene.add(mesh)

    const bd = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(x, 0.25, z)
      .setLinearDamping(0.4).setAngularDamping(0.4)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(0.75, 0.25, 0.2)
        .setDensity(5.0).setFriction(0.5).setRestitution(0.2),
      body
    )
    syncList.push({ mesh, body })
  }

  // 1 giant checkered beach ball (DYNAMIC, bouncy)
  const ballR = 0.8
  const ballMesh = new THREE.Mesh(
    new THREE.SphereGeometry(ballR, 10, 8),
    new THREE.MeshStandardMaterial({
      color: '#ffffff', flatShading: true,
    })
  )
  // Add checkered pattern via second mesh overlay
  const ballOverlay = new THREE.Mesh(
    new THREE.SphereGeometry(ballR * 1.01, 10, 8),
    new THREE.MeshStandardMaterial({
      color: '#111111', flatShading: true,
      wireframe: true,
    })
  )
  ballMesh.add(ballOverlay)
  ballMesh.castShadow = true
  scene.add(ballMesh)

  const ballBd = RAPIER.RigidBodyDesc.dynamic()
    .setTranslation(0, ballR + 3, 0) // Start above ground so it bounces down
    .setLinearDamping(0.1).setAngularDamping(0.1)
  const ballBody = world.createRigidBody(ballBd)
  world.createCollider(
    RAPIER.ColliderDesc.ball(ballR)
      .setDensity(1.5).setFriction(0.3).setRestitution(0.75),
    ballBody
  )
  syncList.push({ mesh: ballMesh, body: ballBody })

  // 3 tool boxes in pit lane (DYNAMIC small boxes)
  const toolboxPositions = [
    [34, -5], [34, 0], [34, 5],
  ]
  const toolboxColors = ['#c0392b', '#2980b9', '#27ae60']
  for (let i = 0; i < toolboxPositions.length; i++) {
    const [x, z] = toolboxPositions[i]
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.3, 0.3),
      new THREE.MeshStandardMaterial({ color: toolboxColors[i], flatShading: true })
    )
    mesh.castShadow = true
    scene.add(mesh)

    const bd = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(x, 0.15, z)
      .setLinearDamping(0.4).setAngularDamping(0.4)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(0.25, 0.15, 0.15)
        .setDensity(10.0).setFriction(0.5).setRestitution(0.1),
      body
    )
    syncList.push({ mesh, body })
  }

  // 4 fuel barrels (DYNAMIC cylinders)
  const barrelPositions = [
    [33, -15], [33, -10], [33, 15], [33, 20],
  ]
  for (const [x, z] of barrelPositions) {
    const barrelGroup = new THREE.Group()

    const barrel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.3, 0.8, 8),
      new THREE.MeshStandardMaterial({ color: '#2c3e50', flatShading: true })
    )
    barrel.castShadow = true
    barrelGroup.add(barrel)

    // Barrel band
    const band = new THREE.Mesh(
      new THREE.CylinderGeometry(0.32, 0.32, 0.05, 8),
      MAT.yellow
    )
    band.position.y = 0.15
    barrelGroup.add(band)

    scene.add(barrelGroup)

    const bd = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(x, 0.4, z)
      .setLinearDamping(0.3).setAngularDamping(0.3)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cylinder(0.4, 0.3)
        .setDensity(4.0).setFriction(0.5).setRestitution(0.2),
      body
    )
    syncList.push({ mesh: barrelGroup, body })
  }
}

// ═══════════════════════════════════════════════════════════════════════════
//  TRACK DECORATIONS — arrows, chevrons, speed bumps, fencing, lap timers
// ═══════════════════════════════════════════════════════════════════════════

function _createTrackDecorations(scene) {
  // Direction arrows on track (flat triangular shapes made from boxes)
  const arrowPositions = [
    // Bottom straight arrows (pointing +x direction)
    { x: -25, z: -42, rotY: 0 },
    { x: -5, z: -42, rotY: 0 },
    { x: 25, z: -42, rotY: 0 },
    // Right straight arrows (pointing +z)
    { x: 42, z: -25, rotY: Math.PI / 2 },
    { x: 42, z: 0, rotY: Math.PI / 2 },
    { x: 42, z: 25, rotY: Math.PI / 2 },
    // Top straight arrows (pointing -x)
    { x: 25, z: 42, rotY: Math.PI },
    { x: -5, z: 42, rotY: Math.PI },
    { x: -25, z: 42, rotY: Math.PI },
    // Left straight arrows (pointing -z)
    { x: -42, z: 25, rotY: -Math.PI / 2 },
    { x: -42, z: 0, rotY: -Math.PI / 2 },
    { x: -42, z: -25, rotY: -Math.PI / 2 },
  ]

  for (const ap of arrowPositions) {
    const arrowGroup = new THREE.Group()
    arrowGroup.position.set(ap.x, 0.025, ap.z)
    arrowGroup.rotation.y = ap.rotY

    // Arrow shaft
    const shaft = new THREE.Mesh(
      new THREE.PlaneGeometry(0.3, 1.2),
      MAT.white
    )
    shaft.rotation.x = -Math.PI / 2
    arrowGroup.add(shaft)

    // Arrow head (wider box)
    const head = new THREE.Mesh(
      new THREE.PlaneGeometry(0.7, 0.5),
      MAT.white
    )
    head.rotation.x = -Math.PI / 2
    head.position.z = -0.85
    arrowGroup.add(head)

    scene.add(arrowGroup)
  }

  // Chevron warning signs at corners (V-shapes on poles)
  const chevronPositions = [
    { x: 38, z: -38, rotY: Math.PI / 4 },
    { x: 38, z: 38, rotY: -Math.PI / 4 },
    { x: -38, z: 38, rotY: -3 * Math.PI / 4 },
    { x: -38, z: -38, rotY: 3 * Math.PI / 4 },
  ]

  for (const cp of chevronPositions) {
    const cg = new THREE.Group()
    cg.position.set(cp.x, 0, cp.z)
    cg.rotation.y = cp.rotY

    // Pole
    const pole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.05, 2.5, 5),
      MAT.steel
    )
    pole.position.y = 1.25
    pole.castShadow = true
    cg.add(pole)

    // Chevron board (V-shape approximated with angled boxes)
    const boardBg = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 0.8, 0.06),
      MAT.black
    )
    boardBg.position.set(0, 2.2, 0)
    cg.add(boardBg)

    // Yellow V stripes
    for (let v = 0; v < 3; v++) {
      const chevStripe = new THREE.Mesh(
        new THREE.BoxGeometry(0.12, 0.6, 0.07),
        MAT.yellow
      )
      chevStripe.position.set(-0.3 + v * 0.3, 2.2, 0.035)
      chevStripe.rotation.z = v % 2 === 0 ? 0.3 : -0.3
      cg.add(chevStripe)
    }

    scene.add(cg)
  }

  // Fencing along parts of the track
  const fenceSegments = [
    // Along bottom outside (spectator barrier)
    { x1: -35, z1: -47, x2: 35, z2: -47 },
    // Along top outside
    { x1: -35, z1: 47, x2: 35, z2: 47 },
    // Along right outside
    { x1: 47, z1: -35, x2: 47, z2: 35 },
    // Along left outside
    { x1: -47, z1: -35, x2: -47, z2: 35 },
  ]

  const fencePostGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.5, 4)
  const fencePostMat = MAT.steel

  for (const seg of fenceSegments) {
    const dx = seg.x2 - seg.x1
    const dz = seg.z2 - seg.z1
    const len = Math.sqrt(dx * dx + dz * dz)
    const posts = Math.floor(len / 3)
    const angle = Math.atan2(dz, dx)

    for (let p = 0; p <= posts; p++) {
      const t = p / posts
      const fx = seg.x1 + dx * t
      const fz = seg.z1 + dz * t

      const post = new THREE.Mesh(fencePostGeo, fencePostMat)
      post.position.set(fx, 0.75, fz)
      post.castShadow = true
      scene.add(post)
    }

    // Rails (2 horizontal lines)
    for (const rh of [0.5, 1.1]) {
      const rail = new THREE.Mesh(
        new THREE.BoxGeometry(len, 0.04, 0.04),
        fencePostMat
      )
      rail.position.set(
        (seg.x1 + seg.x2) / 2,
        rh,
        (seg.z1 + seg.z2) / 2
      )
      rail.rotation.y = -angle
      scene.add(rail)
    }
  }

  // Advertising hoarding walls (long flat colored planes along track)
  const hoardings = [
    { x: 0, z: -50, w: 30, rotY: 0, color: '#e74c3c', stripe: '#ffffff' },
    { x: 50, z: 0, w: 25, rotY: Math.PI / 2, color: '#2980b9', stripe: '#f1c40f' },
    { x: 0, z: 50, w: 28, rotY: Math.PI, color: '#27ae60', stripe: '#ffffff' },
    { x: -50, z: 0, w: 22, rotY: -Math.PI / 2, color: '#8e44ad', stripe: '#f1c40f' },
  ]

  for (const h of hoardings) {
    const hGroup = new THREE.Group()
    hGroup.position.set(h.x, 0, h.z)
    hGroup.rotation.y = h.rotY

    const board = new THREE.Mesh(
      new THREE.BoxGeometry(h.w, 1.2, 0.08),
      new THREE.MeshStandardMaterial({ color: h.color, flatShading: true })
    )
    board.position.y = 0.6
    board.castShadow = true
    hGroup.add(board)

    // Stripe on board
    const stripe = new THREE.Mesh(
      new THREE.BoxGeometry(h.w * 0.9, 0.2, 0.09),
      new THREE.MeshStandardMaterial({ color: h.stripe, flatShading: true })
    )
    stripe.position.set(0, 0.6, 0.045)
    hGroup.add(stripe)

    scene.add(hGroup)
  }

  // Lap timer displays (boxes with emissive screens)
  // Already created marshal posts — add lap timer displays near start/finish
  // (These are standalone from the animated objects — handled via the animatedObjects array in the main function)
}

// ═══════════════════════════════════════════════════════════════════════════
//  TREES OUTSIDE TRACK (12 ornamental trees)
// ═══════════════════════════════════════════════════════════════════════════

function _createTrees(scene) {
  const treePositions = [
    [-55, -55], [-50, -40], [-55, -20], [-55, 10], [-50, 35], [-55, 55],
    [55, -55], [50, -35], [55, -10], [55, 15], [50, 40], [55, 55],
  ]

  const greenShades = ['#2d6a4f', '#40916c', '#52b788']

  for (let i = 0; i < treePositions.length; i++) {
    const [x, z] = treePositions[i]
    const scale = 0.8 + Math.sin(i * 5.3) * 0.3
    const shade = greenShades[i % 3]

    const tree = new THREE.Group()
    tree.position.set(x, 0, z)
    tree.scale.setScalar(scale)

    // Trunk
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.15, 0.2, 1.6, 5),
      MAT.wood
    )
    trunk.position.y = 0.8
    trunk.castShadow = true
    tree.add(trunk)

    // 3-tier foliage
    const foliageMat = new THREE.MeshStandardMaterial({ color: shade, flatShading: true })
    const tiers = [[1.2, 2.0, 6, 2.4], [0.9, 1.6, 6, 3.6], [0.5, 1.2, 5, 4.5]]
    for (const [r, h, seg, py] of tiers) {
      const foliage = new THREE.Mesh(new THREE.ConeGeometry(r, h, seg), foliageMat)
      foliage.position.y = py
      foliage.castShadow = true
      tree.add(foliage)
    }

    scene.add(tree)
  }
}

// ═══════════════════════════════════════════════════════════════════════════
//  CAMERA TOWERS + FLAG POLES
// ═══════════════════════════════════════════════════════════════════════════

function _createTowersAndFlags(scene, RAPIER, world) {
  // Camera towers (4 tall poles with box on top)
  const towerPositions = [
    [40, -45], [45, 40], [-45, 40], [-40, -45],
  ]

  for (const [x, z] of towerPositions) {
    const towerH = 8

    const pole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.15, towerH, 6),
      MAT.steel
    )
    pole.position.set(x, towerH / 2, z)
    pole.castShadow = true
    scene.add(pole)

    // Camera box on top
    const camBox = new THREE.Mesh(
      new THREE.BoxGeometry(0.6, 0.4, 0.8),
      MAT.black
    )
    camBox.position.set(x, towerH + 0.2, z)
    camBox.castShadow = true
    scene.add(camBox)

    // Camera lens (small cylinder)
    const lens = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.1, 0.15, 6),
      MAT.glass
    )
    lens.position.set(x, towerH + 0.2, z + 0.45)
    lens.rotation.x = Math.PI / 2
    scene.add(lens)

    // Tower base
    const tBase = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 0.3, 1.2),
      MAT.concrete
    )
    tBase.position.set(x, 0.15, z)
    scene.add(tBase)

    // Tower collider
    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(x, towerH / 2, z)
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(0.2, towerH / 2, 0.2).setFriction(0.5),
      world.createRigidBody(bd)
    )
  }

  // Flag poles with racing flags (4)
  const flagPolePositions = [
    { x: -35, z: -50, color: '#ff0000' },
    { x: 35, z: -50, color: '#ffffff' },
    { x: -35, z: 50, color: '#f1c40f' },
    { x: 35, z: 50, color: '#00ff00' },
  ]

  for (const fp of flagPolePositions) {
    const pole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.06, 5, 5),
      MAT.steel
    )
    pole.position.set(fp.x, 2.5, fp.z)
    pole.castShadow = true
    scene.add(pole)

    // Pole base
    const base = new THREE.Mesh(
      new THREE.CylinderGeometry(0.2, 0.25, 0.3, 6),
      MAT.concrete
    )
    base.position.set(fp.x, 0.15, fp.z)
    scene.add(base)

    // Flag
    const flag = new THREE.Mesh(
      new THREE.PlaneGeometry(1.2, 0.7),
      new THREE.MeshStandardMaterial({
        color: fp.color, flatShading: true, side: THREE.DoubleSide,
      })
    )
    flag.position.set(fp.x + 0.7, 4.5, fp.z)
    scene.add(flag)

    // Pole top ball
    const topBall = new THREE.Mesh(
      new THREE.SphereGeometry(0.06, 5, 4),
      MAT.gold
    )
    topBall.position.set(fp.x, 5.05, fp.z)
    scene.add(topBall)
  }
}

// ═══════════════════════════════════════════════════════════════════════════
//  VIEWING MOUNDS (4 raised earth shapes)
// ═══════════════════════════════════════════════════════════════════════════

function _createViewingMounds(scene) {
  const mounds = [
    { x: -48, z: -48, r: 4, h: 1.5 },
    { x: 48, z: -48, r: 3.5, h: 1.2 },
    { x: 48, z: 48, r: 4, h: 1.4 },
    { x: -48, z: 48, r: 3, h: 1.0 },
  ]

  for (const m of mounds) {
    // Mound shape (flattened sphere)
    const mound = new THREE.Mesh(
      new THREE.SphereGeometry(m.r, 8, 5, 0, Math.PI * 2, 0, Math.PI / 2),
      new THREE.MeshStandardMaterial({ color: '#5a8a5f', flatShading: true })
    )
    mound.position.set(m.x, 0, m.z)
    mound.scale.y = m.h / m.r
    mound.receiveShadow = true
    mound.castShadow = true
    scene.add(mound)

    // Small bench/seats on top
    const bench = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 0.15, 0.5),
      MAT.wood
    )
    bench.position.set(m.x, m.h - 0.1, m.z)
    bench.castShadow = true
    scene.add(bench)

    // Bench legs
    for (const dx of [-0.6, 0.6]) {
      const leg = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 0.4, 0.08),
        MAT.wood
      )
      leg.position.set(m.x + dx, m.h - 0.3, m.z)
      scene.add(leg)
    }
  }
}
