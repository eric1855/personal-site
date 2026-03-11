/**
 * Rapier-based collision detection for the kinematic car.
 *
 * After moving the car body with setNextKinematicTranslation + setNextKinematicRotation,
 * we step the Rapier world and then inspect contacts via contactPairsWith / contactPair.
 *
 * For each contact manifold we compute the push-out vector and adjust the car velocity
 * so it slides along walls (no bounce). This mirrors the old SAT approach but uses
 * Rapier's broadphase/narrowphase for detection.
 */

import { GROUND_Y } from './carPhysics.js'

/**
 * Move the kinematic car body to its new position, step the physics world,
 * then detect and resolve any collisions.
 *
 * @param {object} RAPIER      - the Rapier module
 * @param {object} world       - Rapier world
 * @param {object} carBody     - Rapier kinematic rigid body for the car
 * @param {object} carCollider - Rapier collider attached to carBody
 * @param {object} state       - carState (position, rotation, velocity)
 * @returns {boolean} true if any collision occurred
 */
export function stepPhysicsAndResolve(RAPIER, world, carBody, carCollider, state) {
  // 1. Tell Rapier where the car wants to be
  carBody.setNextKinematicTranslation({
    x: state.position.x,
    y: GROUND_Y,
    z: state.position.z,
  })

  // Set rotation (Y-axis only) as quaternion
  const halfAngle = state.rotation * 0.5
  carBody.setNextKinematicRotation({
    x: 0,
    y: Math.sin(halfAngle),
    z: 0,
    w: Math.cos(halfAngle),
  })

  // 2. Step Rapier — this performs broadphase + narrowphase
  world.step()

  // 3. Check all contacts involving the car collider
  let hit = false
  let totalPushX = 0
  let totalPushZ = 0

  world.contactPairsWith(carCollider, (otherCollider) => {
    world.contactPair(carCollider, otherCollider, (manifold, flipped) => {
      // manifold.normal() is the world-space contact normal.
      // When flipped is false: normal points from collider1 (car) toward collider2 (obstacle).
      // When flipped is true: normal points from collider2 (obstacle) toward collider1 (car).
      //
      // We want the push direction: push the car AWAY from the obstacle.
      // So we need the normal pointing from obstacle toward car.
      //   - flipped=false → normal points car→obstacle → negate it
      //   - flipped=true  → normal points obstacle→car → keep it
      const normal = manifold.normal()
      const sign = flipped ? 1 : -1
      let pushNx = normal.x * sign
      let pushNz = normal.z * sign

      // Find deepest penetration from contact distances
      // contactDist is negative when penetrating
      let maxPen = 0
      const n = manifold.numContacts()
      for (let i = 0; i < n; i++) {
        const dist = manifold.contactDist(i)
        if (dist < 0) {
          maxPen = Math.max(maxPen, -dist)
        }
      }

      if (maxPen > 0.0001) {
        // Normalise push direction in XZ plane
        const len = Math.sqrt(pushNx * pushNx + pushNz * pushNz)
        if (len > 0.0001) {
          pushNx /= len
          pushNz /= len

          totalPushX += pushNx * maxPen
          totalPushZ += pushNz * maxPen

          // Zero the velocity component going INTO the wall (slide, no bounce).
          // velocity vector = heading * scalar_velocity.
          // Component along push normal = velocity * dot(heading, pushNormal).
          // Negative → moving into wall → kill that component.
          const headX = Math.sin(state.rotation)
          const headZ = Math.cos(state.rotation)
          const dot = headX * pushNx + headZ * pushNz
          if (dot * state.velocity < 0) {
            state.velocity *= (1 - Math.abs(dot))
          }

          hit = true
        }
      }
    })
  })

  // 4. Apply accumulated push-out
  if (hit) {
    state.position.x += totalPushX
    state.position.z += totalPushZ
    state.position.y = GROUND_Y

    // Re-sync the body position after push-out so next frame starts clean
    carBody.setNextKinematicTranslation({
      x: state.position.x,
      y: GROUND_Y,
      z: state.position.z,
    })
  }

  return hit
}
