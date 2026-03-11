// Collision detection & response for a circle-collider car
// Car modeled as circle (radius ~1.0) vs AABB buildings and circle trees
// Response: push out of overlap + bounce velocity

const CAR_RADIUS    = 1.0
const BOUNCE_FACTOR = -0.15  // arcade bounce-back

/**
 * Resolve all collisions for one physics step.
 * Mutates state.position and state.velocity.
 * Returns true if any collision happened this step (for VFX triggers).
 */
export function resolveCollisions(state, colliderWorld) {
  const { colliders, boundary } = colliderWorld
  let hit = false

  for (const c of colliders) {
    if (c.type === 'aabb') {
      if (_resolveCircleVsAABB(state, c)) hit = true
    } else if (c.type === 'circle') {
      if (_resolveCircleVsCircle(state, c)) hit = true
    }
  }

  // World boundary
  if (_resolveBoundary(state, boundary)) hit = true

  return hit
}

// ── Circle vs AABB ──────────────────────────────────────────────────────────

function _resolveCircleVsAABB(state, aabb) {
  // Find the closest point on the AABB to the car center
  const closestX = Math.max(aabb.cx - aabb.hw, Math.min(state.position.x, aabb.cx + aabb.hw))
  const closestZ = Math.max(aabb.cz - aabb.hd, Math.min(state.position.z, aabb.cz + aabb.hd))

  const dx = state.position.x - closestX
  const dz = state.position.z - closestZ
  const distSq = dx * dx + dz * dz

  if (distSq >= CAR_RADIUS * CAR_RADIUS) return false  // no overlap
  if (distSq < 0.0001) {
    // Car center is inside the AABB — push out along x arbitrarily
    state.position.x = aabb.cx + aabb.hw + CAR_RADIUS
    state.velocity *= BOUNCE_FACTOR
    return true
  }

  const dist = Math.sqrt(distSq)
  const overlap = CAR_RADIUS - dist
  const nx = dx / dist
  const nz = dz / dist

  // Push car out
  state.position.x += nx * overlap
  state.position.z += nz * overlap

  // Bounce
  state.velocity *= BOUNCE_FACTOR

  return true
}

// ── Circle vs Circle ────────────────────────────────────────────────────────

function _resolveCircleVsCircle(state, circle) {
  const dx = state.position.x - circle.cx
  const dz = state.position.z - circle.cz
  const distSq = dx * dx + dz * dz
  const minDist = CAR_RADIUS + circle.radius

  if (distSq >= minDist * minDist) return false
  if (distSq < 0.0001) {
    state.position.x += CAR_RADIUS + circle.radius
    state.velocity *= BOUNCE_FACTOR
    return true
  }

  const dist = Math.sqrt(distSq)
  const overlap = minDist - dist
  const nx = dx / dist
  const nz = dz / dist

  state.position.x += nx * overlap
  state.position.z += nz * overlap
  state.velocity *= BOUNCE_FACTOR

  return true
}

// ── World boundary ──────────────────────────────────────────────────────────

function _resolveBoundary(state, boundary) {
  let hit = false
  const limit = boundary - CAR_RADIUS

  if (state.position.x > limit) {
    state.position.x = limit
    state.velocity *= BOUNCE_FACTOR
    hit = true
  } else if (state.position.x < -limit) {
    state.position.x = -limit
    state.velocity *= BOUNCE_FACTOR
    hit = true
  }

  if (state.position.z > limit) {
    state.position.z = limit
    state.velocity *= BOUNCE_FACTOR
    hit = true
  } else if (state.position.z < -limit) {
    state.position.z = -limit
    state.velocity *= BOUNCE_FACTOR
    hit = true
  }

  return hit
}
