/**
 * Cannon-es rigid body car — Bruno Simon style.
 *
 * The car is a single CANNON.Body with a box shape.
 * Movement: set velocity in the chassis's forward direction based on input.
 * Steering: set angularVelocity.y based on steering input.
 * Damping handles the arcade feel (deceleration, slide reduction).
 */
import * as CANNON from 'cannon-es'

// ── Tuning constants ─────────────────────────────────────────────────────────
const FORWARD_FORCE   = 80     // force applied when W is pressed
const REVERSE_FORCE   = 40     // force applied when S is pressed (braking/reverse)
const MAX_SPEED       = 18     // cap forward speed
const MAX_REV_SPEED   = 6      // cap reverse speed
const STEER_SPEED     = 3.5    // angular velocity for turning
const STEER_LERP      = 0.18   // how quickly steering input blends

const LINEAR_DAMPING  = 0.6    // friction-like slowdown
const ANGULAR_DAMPING = 0.95   // stops rotation quickly when not steering

// Chassis dimensions (match the Three.js BoxGeometry(1, 0.38, 1.9))
const CHASSIS_W = 1.0
const CHASSIS_H = 0.38
const CHASSIS_D = 1.9

// Ground Y — the car body center sits at this Y
export const GROUND_Y = 0.3

export function createCarPhysics(world, chassisMaterial) {
  // ── Rigid body ───────────────────────────────────────────────────────────
  const chassisShape = new CANNON.Box(
    new CANNON.Vec3(CHASSIS_W / 2, CHASSIS_H / 2, CHASSIS_D / 2)
  )

  const chassisBody = new CANNON.Body({
    mass: 20,
    position: new CANNON.Vec3(0, GROUND_Y, 0),
    material: chassisMaterial,
    linearDamping: LINEAR_DAMPING,
    angularDamping: ANGULAR_DAMPING,
    fixedRotation: false,
  })
  chassisBody.addShape(chassisShape)

  // Lock rotation to Y-axis only (no tipping over)
  // We achieve this by zeroing X/Z angular velocity each step
  // and constraining the quaternion

  world.addBody(chassisBody)

  // ── State exposed to the rest of the game ────────────────────────────────
  // This mirrors the old carState interface so camera, UI, dust all still work.
  const carState = {
    position: { x: 0, y: GROUND_Y, z: 0 },
    rotation: 0,       // heading angle around Y
    velocity: 0,       // signed scalar speed along forward direction
    speed: 0,          // absolute speed
    steer: 0,          // current visual steering amount
    body: chassisBody, // expose for external access if needed
  }

  let currentSteer = 0

  // ── Pre-step: apply forces based on input ────────────────────────────────
  function preStep(keys) {
    // --- Steering ---
    const targetSteer = keys.left ? 1 : keys.right ? -1 : 0
    currentSteer += (targetSteer - currentSteer) * STEER_LERP

    // Get forward direction from the chassis quaternion
    const quat = chassisBody.quaternion
    // Forward is local -Z in cannon-es convention, but our car faces +Z
    // Our car model faces +Z, so forward = rotate (0,0,1) by quaternion
    const forward = new CANNON.Vec3(0, 0, 1)
    quat.vmult(forward, forward)
    forward.y = 0
    forward.normalize()

    // Current forward speed (dot product of velocity with forward)
    const vel = chassisBody.velocity
    const forwardSpeed = vel.x * forward.x + vel.z * forward.z

    // --- Throttle / brake ---
    if (keys.forward) {
      if (forwardSpeed < MAX_SPEED) {
        chassisBody.applyForce(
          new CANNON.Vec3(
            forward.x * FORWARD_FORCE,
            0,
            forward.z * FORWARD_FORCE
          ),
          chassisBody.position
        )
      }
    } else if (keys.backward) {
      if (forwardSpeed > 0.5) {
        // Braking (moving forward, pressing S)
        chassisBody.applyForce(
          new CANNON.Vec3(
            -forward.x * FORWARD_FORCE * 1.5,
            0,
            -forward.z * FORWARD_FORCE * 1.5
          ),
          chassisBody.position
        )
      } else if (forwardSpeed > -MAX_REV_SPEED) {
        // Reversing
        chassisBody.applyForce(
          new CANNON.Vec3(
            -forward.x * REVERSE_FORCE,
            0,
            -forward.z * REVERSE_FORCE
          ),
          chassisBody.position
        )
      }
    }

    // --- Steering angular velocity ---
    // Only steer when moving (like a real car)
    const speedFactor = Math.min(Math.abs(forwardSpeed) / 3, 1)
    const steerSign = forwardSpeed >= 0 ? 1 : -1  // reverse steering when going backward
    chassisBody.angularVelocity.y = currentSteer * STEER_SPEED * speedFactor * steerSign

    // --- Lock to ground plane ---
    // Prevent the car from flying off or tipping
    chassisBody.position.y = GROUND_Y
    chassisBody.velocity.y = 0

    // Lock rotation to Y only
    chassisBody.angularVelocity.x = 0
    chassisBody.angularVelocity.z = 0

    // Keep quaternion upright (extract Y rotation, discard X/Z tilt)
    const q = chassisBody.quaternion
    // Extract yaw from quaternion
    const yaw = Math.atan2(
      2 * (q.w * q.y + q.x * q.z),
      1 - 2 * (q.y * q.y + q.x * q.x)
    )
    chassisBody.quaternion.setFromEuler(0, yaw, 0)

    // --- Cancel lateral velocity (reduce sliding, more arcade feel) ---
    const right = new CANNON.Vec3(1, 0, 0)
    quat.vmult(right, right)
    right.y = 0
    right.normalize()
    const lateralSpeed = vel.x * right.x + vel.z * right.z
    // Remove 90% of lateral velocity each step for arcade grip
    chassisBody.velocity.x -= right.x * lateralSpeed * 0.9
    chassisBody.velocity.z -= right.z * lateralSpeed * 0.9

    // --- World boundary ---
    const BOUND = 140
    if (chassisBody.position.x > BOUND) { chassisBody.position.x = BOUND; chassisBody.velocity.x = 0 }
    if (chassisBody.position.x < -BOUND) { chassisBody.position.x = -BOUND; chassisBody.velocity.x = 0 }
    if (chassisBody.position.z > BOUND) { chassisBody.position.z = BOUND; chassisBody.velocity.z = 0 }
    if (chassisBody.position.z < -BOUND) { chassisBody.position.z = -BOUND; chassisBody.velocity.z = 0 }

    // --- Sync carState ---
    _syncState(forwardSpeed)
  }

  // ── Post-step: sync state from physics body ──────────────────────────────
  function postStep() {
    const q = chassisBody.quaternion
    const yaw = Math.atan2(
      2 * (q.w * q.y + q.x * q.z),
      1 - 2 * (q.y * q.y + q.x * q.x)
    )

    const forward = new CANNON.Vec3(0, 0, 1)
    chassisBody.quaternion.vmult(forward, forward)
    forward.y = 0
    forward.normalize()
    const vel = chassisBody.velocity
    const forwardSpeed = vel.x * forward.x + vel.z * forward.z

    carState.position.x = chassisBody.position.x
    carState.position.y = chassisBody.position.y
    carState.position.z = chassisBody.position.z
    carState.rotation = yaw
    carState.velocity = forwardSpeed
    carState.speed = Math.abs(forwardSpeed)
    carState.steer = currentSteer * 0.48  // scale to visual steer angle
  }

  function _syncState(forwardSpeed) {
    const q = chassisBody.quaternion
    const yaw = Math.atan2(
      2 * (q.w * q.y + q.x * q.z),
      1 - 2 * (q.y * q.y + q.x * q.x)
    )
    carState.position.x = chassisBody.position.x
    carState.position.y = chassisBody.position.y
    carState.position.z = chassisBody.position.z
    carState.rotation = yaw
    carState.velocity = forwardSpeed
    carState.speed = Math.abs(forwardSpeed)
    carState.steer = currentSteer * 0.48
  }

  return { carState, preStep, postStep, chassisBody }
}
