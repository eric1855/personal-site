/**
 * Circle-based collision detection & response.
 *
 * The car is modelled as a circle (radius ~1.0).
 * Colliders are either AABB (buildings) or circle (trees).
 *
 * Response: push out of overlap, decompose velocity into normal + tangent.
 *   - Zero the normal component (wall sliding).
 *   - At high speed, apply a small bounce along the normal.
 *
 * World boundary: keeps the car inside |x| < 140, |z| < 140.
 */

const MAX_SPEED      = 0.18   // must match carPhysics.js
const WORLD_HALF     = 140
const BOUNCE_MIN_SPD = 0.08   // below this speed, no bounce — just stop

/**
 * Resolve all collisions for the car circle against the collider list.
 * Mutates `state.position` and `state.velocity` in-place.
 *
 * @param {{ position: {x:number, z:number}, velocity: number, rotation: number, speed: number }} state
 * @param {import('./colliders.js').Collider[]} colliders
 * @param {number} carRadius
 * @returns {{ hit: boolean, hitPoint: {x:number, z:number}|null }}
 */
export function resolveCollisions(state, colliders, carRadius) {
  let hit = false
  let hitPoint = null

  for (const col of colliders) {
    const result = col.type === 'aabb'
      ? _circleVsAABB(state.position.x, state.position.z, carRadius, col)
      : _circleVsCircle(state.position.x, state.position.z, carRadius, col)

    if (!result) continue

    hit = true
    hitPoint = { x: result.contactX, z: result.contactZ }

    // Push car out of overlap
    state.position.x += result.nx * result.overlap
    state.position.z += result.nz * result.overlap

    // Decompose velocity (scalar along heading) into world vx/vz
    const vx = Math.sin(state.rotation) * state.velocity
    const vz = Math.cos(state.rotation) * state.velocity

    // Project velocity onto collision normal
    const dot = vx * result.nx + vz * result.nz

    // Only resolve if moving into the wall (dot < 0 means into the surface)
    if (dot < 0) {
      // Remove normal component (wall slide) — keep tangent
      let newVx = vx - dot * result.nx
      let newVz = vz - dot * result.nz

      // Speed-dependent bounce: at high speed, reflect a small fraction
      const speed = state.speed
      if (speed > BOUNCE_MIN_SPD) {
        const bounceFactor = 0.1 * (speed / MAX_SPEED)
        newVx += result.nx * (-dot) * bounceFactor
        newVz += result.nz * (-dot) * bounceFactor
      }

      // Reconstruct scalar velocity from the new world-space vector
      // Project back onto the car's heading direction
      const headX = Math.sin(state.rotation)
      const headZ = Math.cos(state.rotation)
      state.velocity = newVx * headX + newVz * headZ
    }
  }

  // World boundary
  _clampWorldBoundary(state, carRadius)

  return { hit, hitPoint }
}

// ── Circle vs AABB ──────────────────────────────────────────────────────────

function _circleVsAABB(cx, cz, cr, aabb) {
  // Find closest point on the AABB to the circle centre
  const closestX = Math.max(aabb.cx - aabb.hw, Math.min(cx, aabb.cx + aabb.hw))
  const closestZ = Math.max(aabb.cz - aabb.hd, Math.min(cz, aabb.cz + aabb.hd))

  const dx = cx - closestX
  const dz = cz - closestZ
  const distSq = dx * dx + dz * dz

  if (distSq >= cr * cr) return null   // no overlap

  const dist = Math.sqrt(distSq)

  // Edge case: circle centre is inside the AABB
  if (dist < 0.0001) {
    // Push out along the axis with the smallest overlap
    const overlapX = aabb.hw - Math.abs(cx - aabb.cx) + cr
    const overlapZ = aabb.hd - Math.abs(cz - aabb.cz) + cr
    if (overlapX < overlapZ) {
      const sign = cx < aabb.cx ? -1 : 1
      return { nx: sign, nz: 0, overlap: overlapX, contactX: closestX, contactZ: closestZ }
    } else {
      const sign = cz < aabb.cz ? -1 : 1
      return { nx: 0, nz: sign, overlap: overlapZ, contactX: closestX, contactZ: closestZ }
    }
  }

  const overlap = cr - dist
  return {
    nx: dx / dist,
    nz: dz / dist,
    overlap,
    contactX: closestX,
    contactZ: closestZ,
  }
}

// ── Circle vs Circle ────────────────────────────────────────────────────────

function _circleVsCircle(cx, cz, cr, circle) {
  const dx = cx - circle.cx
  const dz = cz - circle.cz
  const distSq = dx * dx + dz * dz
  const rSum = cr + circle.r

  if (distSq >= rSum * rSum) return null

  const dist = Math.sqrt(distSq)

  if (dist < 0.0001) {
    // Circles are coincident — push along +x
    return { nx: 1, nz: 0, overlap: rSum, contactX: circle.cx, contactZ: circle.cz }
  }

  const overlap = rSum - dist
  return {
    nx: dx / dist,
    nz: dz / dist,
    overlap,
    contactX: circle.cx + (dx / dist) * circle.r,
    contactZ: circle.cz + (dz / dist) * circle.r,
  }
}

// ── World boundary ──────────────────────────────────────────────────────────

function _clampWorldBoundary(state, carRadius) {
  const limit = WORLD_HALF - carRadius

  if (state.position.x >  limit) { state.position.x =  limit; _killNormalVelocity(state,  1, 0) }
  if (state.position.x < -limit) { state.position.x = -limit; _killNormalVelocity(state, -1, 0) }
  if (state.position.z >  limit) { state.position.z =  limit; _killNormalVelocity(state,  0, 1) }
  if (state.position.z < -limit) { state.position.z = -limit; _killNormalVelocity(state,  0, -1) }
}

function _killNormalVelocity(state, nx, nz) {
  const vx = Math.sin(state.rotation) * state.velocity
  const vz = Math.cos(state.rotation) * state.velocity
  const dot = vx * nx + vz * nz
  if (dot > 0) {
    const newVx = vx - dot * nx
    const newVz = vz - dot * nz
    const headX = Math.sin(state.rotation)
    const headZ = Math.cos(state.rotation)
    state.velocity = newVx * headX + newVz * headZ
  }
}
