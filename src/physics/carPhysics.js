/**
 * Cannon-es car body — velocity-driven (Bruno Simon style).
 *
 * Instead of applying forces, we directly set the body's velocity each frame
 * based on input. This gives tight, arcade-style control while still
 * interacting with the physics world (knocking things around).
 */
import * as CANNON from 'cannon-es'

// Tuning constants
const MAX_SPEED    = 12      // m/s forward
const MAX_REV      = 4       // m/s reverse
const ACCEL        = 0.4     // m/s per step acceleration
const BRAKE_DECEL  = 0.8     // m/s per step braking
const REV_ACCEL    = 0.2     // m/s per step reverse
const DRAG         = 0.92    // velocity multiplier when no input
const STEER_LERP   = 0.18
const MAX_STEER    = 0.48

// Car dimensions (match the Three.js mesh: BoxGeometry(1, 0.38, 1.9))
const CAR_HW = 0.5     // half width
const CAR_HH = 0.19    // half height
const CAR_HD = 0.95    // half depth (length)

export const GROUND_Y = 0.3

export function createCarBody(world, carMat) {
  const shape = new CANNON.Box(new CANNON.Vec3(CAR_HW, CAR_HH, CAR_HD))
  const body = new CANNON.Body({
    mass: 50,
    shape,
    material: carMat,
    position: new CANNON.Vec3(0, GROUND_Y, 0),
    linearDamping: 0.1,
    angularDamping: 0.99,    // resist spinning from collisions
    fixedRotation: false,
  })

  // Lock rotation to Y axis only — car doesn't flip over
  body.angularFactor = new CANNON.Vec3(0, 1, 0)

  // Don't let the car sleep
  body.allowSleep = false

  world.addBody(body)

  // Kinematic state (used for input processing)
  const state = {
    speed: 0,       // current forward speed (scalar)
    steer: 0,       // current visual steer angle
    heading: 0,     // current heading angle (Y rotation)
    body,
    // Convenience getters for camera/UI
    get position() { return body.position },
    get rotation() { return state.heading },
  }

  return state
}

/**
 * Called each fixed timestep. Reads input, computes desired velocity,
 * and sets it on the cannon body. The physics world handles collisions.
 */
export function stepCar(state, keys) {
  // ── Steering ──────────────────────────────────────────────────
  const targetSteer = keys.left ? MAX_STEER : keys.right ? -MAX_STEER : 0
  state.steer += (targetSteer - state.steer) * STEER_LERP

  // ── Speed (forward/backward scalar) ───────────────────────────
  if (keys.forward) {
    const t = state.speed / MAX_SPEED
    state.speed = Math.min(state.speed + ACCEL * (1 - t * 0.5), MAX_SPEED)
  } else if (keys.backward) {
    if (state.speed > 0.05) {
      // Braking
      state.speed = Math.max(state.speed - BRAKE_DECEL, 0)
    } else {
      // Reversing
      state.speed = Math.max(state.speed - REV_ACCEL, -MAX_REV)
    }
  } else {
    state.speed *= DRAG
    if (Math.abs(state.speed) < 0.05) state.speed = 0
  }

  // ── Heading (turn rate based on speed) ────────────────────────
  const speedRatio = Math.abs(state.speed) / MAX_SPEED
  const turnCurve  = speedRatio * (1 - speedRatio * 0.6) * 2.2
  if (Math.abs(state.speed) > 0.05) {
    state.heading += state.steer * Math.sign(state.speed) * turnCurve * 0.065
  }

  // ── Apply velocity to cannon body ─────────────────────────────
  const sinH = Math.sin(state.heading)
  const cosH = Math.cos(state.heading)

  // Set horizontal velocity from heading + speed
  state.body.velocity.x = sinH * state.speed
  state.body.velocity.z = cosH * state.speed

  // Keep vertical velocity from physics (gravity, ramps) but clamp if on ground
  if (state.body.position.y <= GROUND_Y + 0.05) {
    state.body.velocity.y = Math.max(state.body.velocity.y, 0)
  }

  // Set body orientation from heading
  state.body.quaternion.setFromEuler(0, state.heading, 0)

  // Clamp Y to ground (prevent sinking)
  if (state.body.position.y < GROUND_Y) {
    state.body.position.y = GROUND_Y
  }
}
