import * as THREE from 'three'

/**
 * Bruno-Simon-style grass — dense 3D cone/pyramid spikes with organic noise distribution.
 * Uses InstancedMesh with ConeGeometry (3-sided = triangular pyramids).
 * Treadmarks flatten cones where the car drives.
 */

/* ── Constants ──────────────────────────────────────────────── */

const MAX_BLADES = 60000

// Cone geometry
const CONE_RADIUS = 0.10
const CONE_HEIGHT = 1.0 // normalized, scaled per instance
const CONE_SEGMENTS = 3  // triangular pyramid

// Height range (world units)
const MIN_HEIGHT = 0.35
const MAX_HEIGHT = 0.65

// Treadmark
const TRAIL_LENGTH = 500
const TREAD_RADIUS = 0.9
const TREAD_CHECK_RADIUS = 5.0
const RECOVERY_TIME = 15.0

// Grass colors — muted greens that work on dark terrain
const GRASS_COLORS = [
  new THREE.Color(0x3a6b3a), // dark forest
  new THREE.Color(0x4a7c4a), // medium green
  new THREE.Color(0x3d7035), // olive green
  new THREE.Color(0x4e8848), // grass green
  new THREE.Color(0x356830), // deep green
]

/* ── 2D value noise for organic grass distribution ────────── */

const _perm = new Uint8Array(512)
// Fill with seeded pseudo-random permutation
for (let i = 0; i < 256; i++) _perm[i] = i
// Fisher-Yates shuffle with fixed seed
let seed = 12345
for (let i = 255; i > 0; i--) {
  seed = (seed * 16807 + 0) % 2147483647
  const j = seed % (i + 1)
  ;[_perm[i], _perm[j]] = [_perm[j], _perm[i]]
}
for (let i = 0; i < 256; i++) _perm[256 + i] = _perm[i]

function _hash(x, y) {
  return _perm[(_perm[x & 255] + y) & 255] / 255
}

function _noise2D(x, y) {
  const ix = Math.floor(x), iy = Math.floor(y)
  const fx = x - ix, fy = y - iy
  const sx = fx * fx * (3 - 2 * fx) // smoothstep
  const sy = fy * fy * (3 - 2 * fy)
  const n00 = _hash(ix, iy)
  const n10 = _hash(ix + 1, iy)
  const n01 = _hash(ix, iy + 1)
  const n11 = _hash(ix + 1, iy + 1)
  return n00 * (1-sx) * (1-sy) + n10 * sx * (1-sy) + n01 * (1-sx) * sy + n11 * sx * sy
}

function _fbm(x, y) {
  return _noise2D(x, y) * 0.6 + _noise2D(x*2.1, y*2.1) * 0.3 + _noise2D(x*4.3, y*4.3) * 0.1
}

/* ── Noise-based grass acceptance ─────────────────────────── */

function _grassAcceptance(px, pz) {
  // Base noise — creates large organic meadow shapes
  let n = _fbm(px * 0.07, pz * 0.07)

  // Reduce near fence edges
  const edgeDist = Math.min(38 - Math.abs(px), 38 - Math.abs(pz))
  if (edgeDist < 5) n *= edgeDist / 5

  // Reduce near buildings (6 unit radius)
  for (const b of BUILDINGS) {
    const d = Math.sqrt((px-b.cx)*(px-b.cx) + (pz-b.cz)*(pz-b.cz))
    if (d < 6) n *= d / 6
  }

  // Avoid new landmarks (scaled 0.6x closer to center)
  // Mountain base (-19,-20, r=10)
  const mDist = Math.sqrt((px+19)*(px+19) + (pz+20)*(pz+20))
  if (mDist < 10) n *= mDist / 10

  // Crater (-17, 17, r=9)
  const cDist = Math.sqrt((px+17)*(px+17) + (pz-17)*(pz-17))
  if (cDist < 9) n *= cDist / 9

  // Goop pond (18, 17, r=6)
  const gDist = Math.sqrt((px-18)*(px-18) + (pz-17)*(pz-17))
  if (gDist < 6) n *= gDist / 6

  // Research station (17, -18, r=6)
  const rDist = Math.sqrt((px-17)*(px-17) + (pz+18)*(pz+18))
  if (rDist < 6) n *= rDist / 6

  // Patchy grass reduction in center-right area
  if (px > 5 && px < 25 && pz > -10 && pz < 10) {
    const patchNoise = _noise2D(px * 0.3, pz * 0.3)
    if (patchNoise > 0.4) n *= 0.3  // create holes in the grass
  }

  return n
}

/* ── Avoidance — paths & buildings ────────────────────────── */

const BUILDINGS = [
  { cx: 0,   cz: -20, hx: 4.0, hz: 3.5 },
  { cx: 20,  cz: 0,   hx: 4.5, hz: 3.5 },
  { cx: 0,   cz: 20,  hx: 4.0, hz: 3.5 },
  { cx: -20, cz: 0,   hx: 4.0, hz: 3.5 },
]

const PATH_SEGMENTS = [
  { sx: 0, sz: 0, ex: 0, ez: -17, hw: 1.8 },
  { sx: 0, sz: 0, ex: 17, ez: 0, hw: 1.8 },
  { sx: 0, sz: 0, ex: 0, ez: 17, hw: 1.8 },
  { sx: 0, sz: 0, ex: -17, ez: 0, hw: 1.8 },
  { sx: 0, sz: -17, ex: 10, ez: -17, hw: 1.4 },
  { sx: 10, sz: -17, ex: 17, ez: -5, hw: 1.4 },
  { sx: 17, sz: 5, ex: 17, ez: 12, hw: 1.4 },
  { sx: 17, sz: 12, ex: 5, ez: 17, hw: 1.4 },
  { sx: -5, sz: 17, ex: -17, ez: 12, hw: 1.4 },
  { sx: -17, sz: 12, ex: -17, ez: 5, hw: 1.4 },
  { sx: -17, sz: -5, ex: -17, ez: -12, hw: 1.4 },
  { sx: -17, sz: -12, ex: -5, ez: -17, hw: 1.4 },
]

const HUB_RADIUS = 3.2

function _distToSegSq(px, pz, sx, sz, ex, ez) {
  const dx = ex - sx, dz = ez - sz
  const lenSq = dx * dx + dz * dz
  if (lenSq < 0.001) { const a = px - sx, b = pz - sz; return a * a + b * b }
  const t = Math.max(0, Math.min(1, ((px - sx) * dx + (pz - sz) * dz) / lenSq))
  const cx = sx + t * dx - px, cz = sz + t * dz - pz
  return cx * cx + cz * cz
}

function _isBlocked(px, pz) {
  if (px * px + pz * pz < HUB_RADIUS * HUB_RADIUS) return true
  for (const b of BUILDINGS) {
    if (Math.abs(px - b.cx) < b.hx && Math.abs(pz - b.cz) < b.hz) return true
  }
  for (const s of PATH_SEGMENTS) {
    if (_distToSegSq(px, pz, s.sx, s.sz, s.ex, s.ez) < s.hw * s.hw) return true
  }
  return false
}

/* ── Spatial grid ─────────────────────────────────────────── */

const GRID_CELL = 2.0
const AREA_MIN = -40
const AREA_MAX = 40
const AREA_RANGE = AREA_MAX - AREA_MIN
const GRID_CELLS = Math.ceil(AREA_RANGE / GRID_CELL)

function _gridKey(gx, gz) { return gz * GRID_CELLS + gx }
function _worldToGrid(v) { return Math.floor((v - AREA_MIN) / GRID_CELL) }

/* ── Main export ──────────────────────────────────────────── */

const _dummy = new THREE.Object3D()

export function createGrass(scene) {
  // Cone geometry — 3-sided triangular pyramid
  const coneGeo = new THREE.ConeGeometry(CONE_RADIUS, CONE_HEIGHT, CONE_SEGMENTS, 1)
  // Shift so base sits at y=0 (default cone is centered at origin)
  coneGeo.translate(0, CONE_HEIGHT / 2, 0)

  // Material — flat-shaded PBR to match scene aesthetic
  const material = new THREE.MeshStandardMaterial({
    color: 0x4a7c4a,
    flatShading: true,
    roughness: 0.85,
    metalness: 0.0,
  })

  const mesh = new THREE.InstancedMesh(coneGeo, material, MAX_BLADES)
  mesh.castShadow = true
  mesh.receiveShadow = true
  mesh.frustumCulled = false

  // Per-instance data
  const bladeX = new Float32Array(MAX_BLADES)
  const bladeZ = new Float32Array(MAX_BLADES)
  const baseHeight = new Float32Array(MAX_BLADES)
  const flatness = new Float32Array(MAX_BLADES)
  const flatTimer = new Float32Array(MAX_BLADES)
  const bladeRotY = new Float32Array(MAX_BLADES)

  // Spatial grid
  const grid = new Map()

  // Place blades using noise-based organic distribution
  let placed = 0
  let attempts = 0
  const maxAttempts = MAX_BLADES * 5

  while (placed < MAX_BLADES && attempts < maxAttempts) {
    attempts++

    const px = AREA_MIN + Math.random() * AREA_RANGE
    const pz = AREA_MIN + Math.random() * AREA_RANGE
    if (_isBlocked(px, pz)) continue

    const acceptance = _grassAcceptance(px, pz)
    if (acceptance < 0.35) continue  // threshold for grass growth
    if (Math.random() > acceptance * 1.5) continue  // probabilistic density

    const i = placed
    bladeX[i] = px
    bladeZ[i] = pz
    bladeRotY[i] = Math.random() * Math.PI * 2

    // Height modulated by noise: lusher areas = taller grass
    const h = MIN_HEIGHT + (MAX_HEIGHT - MIN_HEIGHT) * acceptance
    baseHeight[i] = h
    flatness[i] = 0
    flatTimer[i] = 0

    // Set instance matrix
    _dummy.position.set(px, 0, pz)
    _dummy.rotation.set(0, bladeRotY[i], 0)
    _dummy.scale.set(1, h, 1)
    _dummy.updateMatrix()
    mesh.setMatrixAt(i, _dummy.matrix)

    // Random color per instance
    const col = GRASS_COLORS[Math.floor(Math.random() * GRASS_COLORS.length)]
    const variation = 0.9 + Math.random() * 0.2 // 0.9 to 1.1
    mesh.setColorAt(i, col.clone().multiplyScalar(variation))

    // Add to spatial grid
    const gx = _worldToGrid(px)
    const gz = _worldToGrid(pz)
    const key = _gridKey(gx, gz)
    if (!grid.has(key)) grid.set(key, [])
    grid.get(key).push(i)

    placed++
  }

  mesh.count = placed
  mesh.instanceMatrix.needsUpdate = true
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  scene.add(mesh)

  // Trail ring buffer
  const trail = new Float32Array(TRAIL_LENGTH * 2)
  let trailHead = 0
  let trailCount = 0
  let lastTrailX = Infinity
  let lastTrailZ = Infinity
  const TRAIL_STEP_SQ = 0.25 * 0.25

  // Dirty tracking
  const dirtyBlades = new Set()
  let matrixDirty = false

  function _updateBladeMatrix(i, yScale) {
    _dummy.position.set(bladeX[i], 0, bladeZ[i])
    _dummy.rotation.set(0, bladeRotY[i], 0)
    _dummy.scale.set(1, yScale, 1)
    _dummy.updateMatrix()
    mesh.setMatrixAt(i, _dummy.matrix)
  }

  return {
    update(carState, dt, _elapsed) {
      if (!carState) return

      const carX = carState.position.x
      const carZ = carState.position.z
      const speed = Math.abs(carState.speed || 0)

      // ── Record car trail ────────────────────────────
      if (speed > 0.02) {
        const ddx = carX - lastTrailX
        const ddz = carZ - lastTrailZ
        if (ddx * ddx + ddz * ddz > TRAIL_STEP_SQ) {
          const idx = trailHead * 2
          trail[idx] = carX
          trail[idx + 1] = carZ
          trailHead = (trailHead + 1) % TRAIL_LENGTH
          if (trailCount < TRAIL_LENGTH) trailCount++
          lastTrailX = carX
          lastTrailZ = carZ
        }
      }

      // ── Flatten blades near car trail (spatial grid) ──
      const cMinGX = _worldToGrid(carX - TREAD_CHECK_RADIUS)
      const cMaxGX = _worldToGrid(carX + TREAD_CHECK_RADIUS)
      const cMinGZ = _worldToGrid(carZ - TREAD_CHECK_RADIUS)
      const cMaxGZ = _worldToGrid(carZ + TREAD_CHECK_RADIUS)

      for (let gx = cMinGX; gx <= cMaxGX; gx++) {
        for (let gz = cMinGZ; gz <= cMaxGZ; gz++) {
          if (gx < 0 || gx >= GRID_CELLS || gz < 0 || gz >= GRID_CELLS) continue
          const cell = grid.get(_gridKey(gx, gz))
          if (!cell) continue

          for (const i of cell) {
            const bx = bladeX[i]
            const bz = bladeZ[i]

            let minDistSq = Infinity
            for (let t = 0; t < trailCount; t++) {
              const ti = ((trailHead - 1 - t + TRAIL_LENGTH) % TRAIL_LENGTH) * 2
              const tx = trail[ti], tz = trail[ti + 1]
              const tdSq = (bx - tx) * (bx - tx) + (bz - tz) * (bz - tz)
              if (tdSq < minDistSq) minDistSq = tdSq
              if (minDistSq < 0.04) break
              // Stop checking old trail points far from car
              const ctx = tx - carX, ctz = tz - carZ
              if (ctx * ctx + ctz * ctz > TREAD_CHECK_RADIUS * TREAD_CHECK_RADIUS * 4) break
            }

            if (minDistSq < TREAD_RADIUS * TREAD_RADIUS) {
              const dist = Math.sqrt(minDistSq)
              const strength = 1.0 - dist / TREAD_RADIUS
              const target = Math.max(flatness[i], strength * 0.9 + 0.1)
              if (target > flatness[i]) {
                flatness[i] = Math.min(1.0, target)
                flatTimer[i] = 0
                dirtyBlades.add(i)
                _updateBladeMatrix(i, baseHeight[i] * (1.0 - flatness[i]))
                matrixDirty = true
              }
            }
          }
        }
      }

      // ── Recovery ────────────────────────────────────
      const recoveryRate = dt / RECOVERY_TIME
      const toRemove = []

      for (const i of dirtyBlades) {
        flatTimer[i] += dt
        if (flatTimer[i] > 0.5) {
          flatness[i] = Math.max(0, flatness[i] - recoveryRate)
          _updateBladeMatrix(i, baseHeight[i] * (1.0 - flatness[i]))
          matrixDirty = true
          if (flatness[i] <= 0) {
            flatness[i] = 0
            _updateBladeMatrix(i, baseHeight[i])
            toRemove.push(i)
          }
        }
      }

      for (const i of toRemove) dirtyBlades.delete(i)

      if (matrixDirty) {
        mesh.instanceMatrix.needsUpdate = true
        matrixDirty = false
      }
    }
  }
}
