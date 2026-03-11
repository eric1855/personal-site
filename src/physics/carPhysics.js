/**
 * Oimo.js-based car physics.
 *
 * The car is a dynamic rigid body (box shape) driven by setting
 * linearVelocity (forward/backward) and angularVelocity.y (steering).
 * Oimo handles gravity, collisions, and ground contact automatically.
 */

// Tuning constants
const ACCEL         = 12     // forward acceleration (m/s^2)
const MAX_SPEED     = 11     // max forward speed (m/s)
const MAX_REV       = 3.5    // max reverse speed (m/s)
const BRAKE_DECEL   = 18     // braking deceleration when going forward and pressing backward
const FRICTION_DRAG = 0.94   // per-frame velocity multiplier when coasting (60 Hz)
const STEER_LERP    = 0.18   // how quickly steering input blends
const MAX_STEER     = 2.8    // max angular velocity for steering (rad/s)
const DT            = 1 / 60

// Car body dimensions — matches the Three.js BoxGeometry(1, 0.38, 1.9)
export const CAR_SIZE = { w: 1.0, h: 0.38, d: 1.9 }

// Y position of the car body center above ground
// ground plane is at Y=0, car half-height = 0.19, so center ~0.19
// We place it a bit higher so it rests naturally
export const CAR_START_Y = 0.5

export function createCarState() {
  return {
    steer: 0,       // current steer input (smoothed)
    speed: 0,       // absolute speed (for dust particles etc.)
    forwardSpeed: 0, // signed forward speed along car's heading
  }
}

/**
 * Apply driving forces to the Oimo body based on keyboard input.
 * Called once per fixed timestep (60 Hz), BEFORE world.step().
 */
export function stepCar(body, state, keys) {
  // ── Steering ─────────────────────────────────────────────
  const targetSteer = keys.left ? MAX_STEER : keys.right ? -MAX_STEER : 0
  state.steer += (targetSteer - state.steer) * STEER_LERP

  // ── Read current velocity in the car's forward direction ──
  const lv = body.linearVelocity
  // Car forward direction from its orientation
  const q = body.orientation
  // Forward vector (local +Z) rotated by quaternion
  const fwdX = 2 * (q.x * q.z + q.w * q.y)
  const fwdZ = q.w * q.w - q.x * q.x - q.y * q.y + q.z * q.z

  // Project linear velocity onto forward direction
  const forwardSpeed = lv.x * fwdX + lv.z * fwdZ
  state.forwardSpeed = forwardSpeed

  // ── Acceleration / braking ────────────────────────────────
  let desiredSpeed = forwardSpeed

  if (keys.forward) {
    // Accelerate forward, capped at MAX_SPEED
    desiredSpeed = Math.min(forwardSpeed + ACCEL * DT, MAX_SPEED)
  } else if (keys.backward) {
    if (forwardSpeed > 0.05) {
      // Braking (going forward, pressing backward)
      desiredSpeed = Math.max(forwardSpeed - BRAKE_DECEL * DT, 0)
    } else {
      // Reversing
      desiredSpeed = Math.max(forwardSpeed - ACCEL * 0.5 * DT, -MAX_REV)
    }
  } else {
    // Coasting — friction drag
    desiredSpeed = forwardSpeed * FRICTION_DRAG
    if (Math.abs(desiredSpeed) < 0.04) desiredSpeed = 0
  }

  // ── Set linear velocity along forward, preserve lateral + vertical ──
  const deltaSpeed = desiredSpeed - forwardSpeed

  // Lateral component (perpendicular to forward, in XZ plane)
  const rightX = fwdZ  // perpendicular to forward in XZ
  const rightZ = -fwdX
  const lateralSpeed = lv.x * rightX + lv.z * rightZ

  // Dampen lateral sliding (drift reduction) — apply 70% each frame
  const lateralDamping = 0.70

  lv.x += fwdX * deltaSpeed + rightX * (lateralSpeed * lateralDamping - lateralSpeed)
  lv.z += fwdZ * deltaSpeed + rightZ * (lateralSpeed * lateralDamping - lateralSpeed)

  // Keep vertical velocity from Oimo (gravity, ground contact)
  // lv.y is untouched

  // ── Steering — angular velocity on Y axis ─────────────────
  // Bell-curve turn rate: peaks at ~40% max speed, weaker at low and high speeds
  const speedRatio = Math.min(Math.abs(forwardSpeed) / MAX_SPEED, 1)
  const turnCurve = speedRatio * (1 - speedRatio * 0.6) * 2.2

  if (Math.abs(forwardSpeed) > 0.08) {
    body.angularVelocity.y = state.steer * Math.sign(forwardSpeed) * turnCurve
  } else {
    body.angularVelocity.y *= 0.8 // dampen when nearly stopped
  }

  // Zero out angular velocity on X and Z to prevent tipping over
  body.angularVelocity.x = 0
  body.angularVelocity.z = 0

  // ── Clamp the car upright ─────────────────────────────────
  // Prevent the car from tipping — reset orientation to only keep Y rotation
  _keepUpright(body)

  // Update speed for VFX
  state.speed = Math.abs(forwardSpeed)
}

/**
 * Ensure the car body stays upright by zeroing out X and Z rotation
 * while preserving the Y (heading) rotation.
 */
function _keepUpright(body) {
  const q = body.orientation
  // Extract yaw angle from quaternion
  const yaw = Math.atan2(2 * (q.w * q.y + q.x * q.z), 1 - 2 * (q.y * q.y + q.z * q.z))
  // Reconstruct quaternion from yaw only
  const halfYaw = yaw * 0.5
  q.w = Math.cos(halfYaw)
  q.x = 0
  q.y = Math.sin(halfYaw)
  q.z = 0
}
