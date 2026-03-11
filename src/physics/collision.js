/**
 * OBB (Oriented Bounding Box) collision detection using SAT (Separating Axis Theorem).
 *
 * The car is modelled as an OBB. Buildings are AABBs, trees are circles.
 * Resolution: push the car out along the minimum-penetration axis,
 * then zero the velocity component in the collision normal direction (slide, no bounce).
 */

// Car half-extents (local X = width, local Z = length)
const CAR_HW = 0.5    // half-width  (body 1.0 wide)
const CAR_HD = 0.95   // half-depth  (body 1.9 long)

// World boundary
const WORLD_BOUND = 140

/**
 * Resolve all collisions for the car against the collider world.
 * Mutates state.position and state.velocity in-place.
 * Returns true if any collision occurred this frame (used for VFX).
 */
export function resolveCollisions(state, colliders) {
  let hit = false

  // Precompute car OBB axes from heading
  const cosR = Math.cos(state.rotation)
  const sinR = Math.sin(state.rotation)

  // Car local X-axis in world space (right)
  const axX = cosR,  axZ = -sinR
  // Car local Z-axis in world space (forward)
  const azX = sinR,  azZ = cosR

  for (const c of colliders) {
    let result = null
    if (c.type === 'aabb') {
      result = _obbVsAABB(state, axX, axZ, azX, azZ, c)
    } else if (c.type === 'circle') {
      result = _obbVsCircle(state, axX, axZ, azX, azZ, c)
    }
    if (result) {
      // Push car out
      state.position.x += result.nx * result.depth
      state.position.z += result.nz * result.depth

      // Zero velocity in the collision normal direction (slide, no bounce)
      // velocity is scalar along heading, so project heading onto normal
      const headX = Math.sin(state.rotation)
      const headZ = Math.cos(state.rotation)
      const dot = headX * result.nx + headZ * result.nz
      if (dot * state.velocity > 0) {
        // Moving into the wall — remove the normal component of velocity
        // Since velocity is scalar * heading, we scale it down
        const factor = Math.abs(dot)
        state.velocity *= (1 - factor)
      }

      hit = true
    }
  }

  // ── World boundary ──────────────────────────────────────────
  if (state.position.x > WORLD_BOUND) {
    state.position.x = WORLD_BOUND
    _clampVelocityAxis(state, 1, 0)
    hit = true
  } else if (state.position.x < -WORLD_BOUND) {
    state.position.x = -WORLD_BOUND
    _clampVelocityAxis(state, -1, 0)
    hit = true
  }
  if (state.position.z > WORLD_BOUND) {
    state.position.z = WORLD_BOUND
    _clampVelocityAxis(state, 0, 1)
    hit = true
  } else if (state.position.z < -WORLD_BOUND) {
    state.position.z = -WORLD_BOUND
    _clampVelocityAxis(state, 0, -1)
    hit = true
  }

  return hit
}

/** Zero the velocity component along a world-axis normal */
function _clampVelocityAxis(state, nx, nz) {
  const headX = Math.sin(state.rotation)
  const headZ = Math.cos(state.rotation)
  const dot = headX * nx + headZ * nz
  if (dot * state.velocity > 0) {
    state.velocity *= (1 - Math.abs(dot))
  }
}

// ─── OBB vs AABB (SAT) ─────────────────────────────────────────

/**
 * Returns { nx, nz, depth } for the minimum penetration axis, or null if separated.
 * We test 4 axes: car-localX, car-localZ, world-X, world-Z.
 */
function _obbVsAABB(state, axX, axZ, azX, azZ, aabb) {
  // Vector from car center to AABB center
  const dx = aabb.cx - state.position.x
  const dz = aabb.cz - state.position.z

  let minDepth = Infinity
  let minNx = 0, minNz = 0

  // Test each of the 4 separating axes
  const axes = [
    { nx: axX,  nz: axZ,  label: 'carX' },
    { nx: azX,  nz: azZ,  label: 'carZ' },
    { nx: 1,    nz: 0,    label: 'worldX' },
    { nx: 0,    nz: 1,    label: 'worldZ' },
  ]

  for (const axis of axes) {
    // Project car OBB onto axis
    const carProj = Math.abs(CAR_HW * (axX * axis.nx + axZ * axis.nz))
                  + Math.abs(CAR_HD * (azX * axis.nx + azZ * axis.nz))
    // Project AABB onto axis
    const aabbProj = Math.abs(aabb.hw * axis.nx) + Math.abs(aabb.hd * axis.nz)
    // Distance between centers projected onto axis
    const dist = Math.abs(dx * axis.nx + dz * axis.nz)

    const overlap = carProj + aabbProj - dist
    if (overlap <= 0) return null  // separating axis found → no collision

    if (overlap < minDepth) {
      minDepth = overlap
      // Normal should push car AWAY from AABB
      const sign = (dx * axis.nx + dz * axis.nz) > 0 ? -1 : 1
      minNx = axis.nx * sign
      minNz = axis.nz * sign
    }
  }

  return { nx: minNx, nz: minNz, depth: minDepth }
}

// ─── OBB vs Circle (SAT) ────────────────────────────────────────

/**
 * For OBB vs circle we find the closest point on the OBB to the circle center,
 * then check distance. This is equivalent to SAT for convex vs circle.
 */
function _obbVsCircle(state, axX, axZ, azX, azZ, circle) {
  // Vector from car center to circle center
  const dx = circle.cx - state.position.x
  const dz = circle.cz - state.position.z

  // Project delta onto car local axes
  let localX = dx * axX + dz * axZ
  let localZ = dx * azX + dz * azZ

  // Clamp to OBB half-extents to find closest point on OBB
  const clampedX = Math.max(-CAR_HW, Math.min(CAR_HW, localX))
  const clampedZ = Math.max(-CAR_HD, Math.min(CAR_HD, localZ))

  // Closest point on OBB in world space
  const closestX = state.position.x + clampedX * axX + clampedZ * azX
  const closestZ = state.position.z + clampedX * axZ + clampedZ * azZ

  // Distance from closest point to circle center
  const toCircleX = circle.cx - closestX
  const toCircleZ = circle.cz - closestZ
  const distSq = toCircleX * toCircleX + toCircleZ * toCircleZ
  const rSq = circle.r * circle.r

  if (distSq >= rSq) return null  // no collision

  const dist = Math.sqrt(distSq)
  if (dist < 0.0001) {
    // Car center is exactly at circle center — push along arbitrary axis
    return { nx: -Math.sin(state.rotation), nz: -Math.cos(state.rotation), depth: circle.r }
  }

  const depth = circle.r - dist
  // Normal points from circle toward car (push car out)
  const nx = -toCircleX / dist
  const nz = -toCircleZ / dist

  return { nx, nz, depth }
}
