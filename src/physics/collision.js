/**
 * Capsule-based collision detection & resolution.
 *
 * The car is modelled as 2 circles along its forward axis (front + rear).
 * Each tick we run 2–3 resolution iterations to handle wedge/corner cases.
 */

const CAR_CIRCLE_RADIUS = 0.5
const CAR_CIRCLE_OFFSET = 0.45   // distance from car centre to each circle centre along forward axis
const FRICTION          = 0.7    // tangential velocity retention on scrape
const ITERATIONS        = 3

// ---------- Helpers ----------

/** Resolve a single circle (cx, cz, r) against one AABB collider. */
function circleVsAABB(cx, cz, r, aabb) {
  // Closest point on AABB to circle centre
  const closestX = Math.max(aabb.cx - aabb.halfW, Math.min(cx, aabb.cx + aabb.halfW))
  const closestZ = Math.max(aabb.cz - aabb.halfD, Math.min(cz, aabb.cz + aabb.halfD))

  const dx = cx - closestX
  const dz = cz - closestZ
  const distSq = dx * dx + dz * dz

  if (distSq >= r * r) return null

  const dist = Math.sqrt(distSq)

  if (dist < 1e-6) {
    // Circle centre is inside the AABB — push out along shortest axis
    const overlapX = aabb.halfW - Math.abs(cx - aabb.cx) + r
    const overlapZ = aabb.halfD - Math.abs(cz - aabb.cz) + r
    if (overlapX < overlapZ) {
      const sign = cx < aabb.cx ? -1 : 1
      return { nx: sign, nz: 0, pen: overlapX }
    } else {
      const sign = cz < aabb.cz ? -1 : 1
      return { nx: 0, nz: sign, pen: overlapZ }
    }
  }

  const pen = r - dist
  return { nx: dx / dist, nz: dz / dist, pen }
}

/** Resolve a single circle (cx, cz, r) against a circle collider. */
function circleVsCircle(cx, cz, r, col) {
  const dx = cx - col.cx
  const dz = cz - col.cz
  const distSq = dx * dx + dz * dz
  const minDist = r + col.r

  if (distSq >= minDist * minDist) return null

  const dist = Math.sqrt(distSq)
  if (dist < 1e-6) {
    return { nx: 1, nz: 0, pen: minDist }
  }

  const pen = minDist - dist
  return { nx: dx / dist, nz: dz / dist, pen }
}

// ---------- Main resolution ----------

/**
 * Resolve collisions for one physics tick.
 *
 * Mutates state.position.x, state.position.z, state.velocity.
 * Sets state.collided = true if any collision happened this tick.
 *
 * @param {object} state   - carState (position, rotation, velocity, collided)
 * @param {object} world   - { colliders, worldHalf }
 */
export function resolveCollisions(state, world) {
  state.collided = false

  for (let iter = 0; iter < ITERATIONS; iter++) {
    // Compute capsule circle positions (front & rear)
    const sinR = Math.sin(state.rotation)
    const cosR = Math.cos(state.rotation)

    const circles = [
      { // front
        x: state.position.x + sinR * CAR_CIRCLE_OFFSET,
        z: state.position.z + cosR * CAR_CIRCLE_OFFSET,
      },
      { // rear
        x: state.position.x - sinR * CAR_CIRCLE_OFFSET,
        z: state.position.z - cosR * CAR_CIRCLE_OFFSET,
      },
    ]

    // Find deepest penetration across both circles and all colliders
    let best = null
    let bestPen = 0

    for (const circ of circles) {
      for (const col of world.colliders) {
        let hit
        if (col.type === 'aabb') {
          hit = circleVsAABB(circ.x, circ.z, CAR_CIRCLE_RADIUS, col)
        } else {
          hit = circleVsCircle(circ.x, circ.z, CAR_CIRCLE_RADIUS, col)
        }
        if (hit && hit.pen > bestPen) {
          best = hit
          bestPen = hit.pen
        }
      }
    }

    // World boundary check
    const bx = worldBoundaryPen(state.position.x, world.worldHalf)
    if (bx) {
      if (bx.pen > bestPen) { best = bx; bestPen = bx.pen }
    }
    const bz = worldBoundaryPen(state.position.z, world.worldHalf)
    if (bz) {
      // Test z axis boundary
      const bzResult = { nx: 0, nz: bz.nx, pen: bz.pen }
      if (bzResult.pen > bestPen) { best = bzResult; bestPen = bzResult.pen }
    }

    if (!best) break   // no collision this iteration

    state.collided = true

    // Push car out along collision normal
    state.position.x += best.nx * best.pen
    state.position.z += best.nz * best.pen

    // Decompose velocity into normal & tangential components
    // velocity is scalar along car's forward direction, convert to vector
    const vx = Math.sin(state.rotation) * state.velocity
    const vz = Math.cos(state.rotation) * state.velocity

    const vDotN = vx * best.nx + vz * best.nz

    if (vDotN < 0) {
      // Moving into the collider — zero out normal component, apply friction to tangent
      const vnx = vDotN * best.nx
      const vnz = vDotN * best.nz

      const vtx = (vx - vnx) * FRICTION
      const vtz = (vz - vnz) * FRICTION

      // Project back to scalar velocity along car forward axis
      const fwd_x = Math.sin(state.rotation)
      const fwd_z = Math.cos(state.rotation)
      state.velocity = vtx * fwd_x + vtz * fwd_z
    }
  }
}

/** Check single-axis world boundary. Returns { nx, pen } or null. */
function worldBoundaryPen(coord, half) {
  if (coord > half) {
    return { nx: -1, pen: coord - half }
  }
  if (coord < -half) {
    return { nx: 1, pen: -half - coord }
  }
  return null
}
