/**
 * Collision detection & resolution.
 * Car is modelled as an AABB (axis-aligned), ignoring rotation for simplicity.
 *
 * Car half-extents: hx = 0.5 (width 1), hz = 0.95 (length 1.9)
 *
 * Resolution strategy (speed-dependent):
 *   - Push the car out of the collider along the smallest overlap axis
 *   - If |velocity| > 0.04  →  velocity *= -0.1  (small bounce)
 *   - if |velocity| <= 0.04 →  velocity = 0       (dead stop)
 *
 * Returns true if any collision occurred this frame (used for camera shake).
 */

const CAR_HX = 0.5    // half-extent x  (car width  / 2)
const CAR_HZ = 0.95   // half-extent z  (car length / 2)
const BOUNCE_THRESHOLD = 0.04
const BOUNCE_FACTOR    = -0.1

export function resolveCollisions(state, colliders) {
  let hit = false

  const cx = state.position.x
  const cz = state.position.z
  const carMinX = cx - CAR_HX
  const carMaxX = cx + CAR_HX
  const carMinZ = cz - CAR_HZ
  const carMaxZ = cz + CAR_HZ

  for (let i = 0; i < colliders.length; i++) {
    const col = colliders[i]

    if (col.type === 'aabb') {
      // AABB vs AABB
      if (carMaxX <= col.minX || carMinX >= col.maxX ||
          carMaxZ <= col.minZ || carMinZ >= col.maxZ) continue

      // Overlap on each axis
      const overlapLeft  = carMaxX - col.minX
      const overlapRight = col.maxX - carMinX
      const overlapFront = carMaxZ - col.minZ
      const overlapBack  = col.maxZ - carMinZ

      const overlapX = Math.min(overlapLeft, overlapRight)
      const overlapZ = Math.min(overlapFront, overlapBack)

      // Push out along smallest overlap axis
      if (overlapX < overlapZ) {
        state.position.x += (overlapLeft < overlapRight) ? -overlapX : overlapX
      } else {
        state.position.z += (overlapFront < overlapBack) ? -overlapZ : overlapZ
      }

      _applyBounce(state)
      hit = true

    } else if (col.type === 'circle') {
      // AABB vs Circle
      // Find closest point on the car AABB to the circle centre
      const closestX = Math.max(carMinX, Math.min(col.x, carMaxX))
      const closestZ = Math.max(carMinZ, Math.min(col.z, carMaxZ))

      const dx = col.x - closestX
      const dz = col.z - closestZ
      const distSq = dx * dx + dz * dz

      if (distSq >= col.radius * col.radius) continue
      if (distSq === 0) {
        // Car centre is exactly on the circle centre — push out along x
        state.position.x += col.radius + CAR_HX
        _applyBounce(state)
        hit = true
        continue
      }

      const dist = Math.sqrt(distSq)
      const penetration = col.radius - dist
      // Push car away from circle centre
      const nx = dx / dist
      const nz = dz / dist
      state.position.x -= nx * penetration
      state.position.z -= nz * penetration

      _applyBounce(state)
      hit = true
    }
  }

  return hit
}

function _applyBounce(state) {
  if (Math.abs(state.velocity) > BOUNCE_THRESHOLD) {
    state.velocity *= BOUNCE_FACTOR
  } else {
    state.velocity = 0
  }
}
