// Variant 5: Smooth / Floaty (Mario Kart feel)
// Punchy off the line, sharp braking, bell-curve turn rate that peaks at mid-speed.
//
// Hybrid approach: kinematic math computes desired heading/speed,
// then we SET the Rapier body's linear velocity to match (+ override Y to stay grounded).
import * as THREE from 'three'

const ACCEL      = 0.007
const MAX_SPEED  = 0.18
const MAX_REV    = 0.06
const STEER_LERP = 0.18
const MAX_STEER  = 0.48

export const GROUND_Y = 0.3

export function createCarState() {
  return {
    position: new THREE.Vector3(0, GROUND_Y, 0),
    rotation: 0, velocity: 0, steer: 0, speed: 0,
  }
}

/**
 * Pure kinematic step — computes desired position/heading/speed.
 * Does NOT touch Rapier. Call syncToRapier() after this.
 */
export function stepCar(state, keys) {
  const targetSteer = keys.left ? MAX_STEER : keys.right ? -MAX_STEER : 0
  state.steer += (targetSteer - state.steer) * STEER_LERP

  if (keys.forward) {
    const t = state.velocity / MAX_SPEED
    state.velocity = Math.min(state.velocity + ACCEL * (1 - t * 0.5), MAX_SPEED)
  } else if (keys.backward) {
    if (state.velocity > 0.01) { state.velocity = Math.max(state.velocity - ACCEL * 2.0, 0) }
    else { state.velocity = Math.max(state.velocity - ACCEL * 0.5, -MAX_REV) }
  } else {
    state.velocity *= 0.92
    if (Math.abs(state.velocity) < 0.0008) state.velocity = 0
  }

  // Bell-curve turn rate: peaks at ~40% max speed
  const speedRatio = Math.abs(state.velocity) / MAX_SPEED
  const turnCurve  = speedRatio * (1 - speedRatio * 0.6) * 2.2
  if (Math.abs(state.velocity) > 0.001) {
    state.rotation += state.steer * Math.sign(state.velocity) * turnCurve * 0.065
  }

  // Compute desired XZ displacement per tick (at 60 Hz)
  state._desiredVx = Math.sin(state.rotation) * state.velocity * 60
  state._desiredVz = Math.cos(state.rotation) * state.velocity * 60
  state.speed = Math.abs(state.velocity)
}

/**
 * Push the kinematic-computed velocity into the Rapier dynamic body.
 * Also sets the body rotation and overrides Y velocity to keep the car grounded.
 */
export function syncToRapier(state, carBody, GROUND_Y_VAL) {
  // Set linear velocity — XZ from kinematic math, Y pushes toward ground
  const pos = carBody.translation()
  const yError = GROUND_Y_VAL - pos.y
  const yVel = yError * 20  // stiff spring to keep car at ground height

  carBody.setLinvel({ x: state._desiredVx || 0, y: yVel, z: state._desiredVz || 0 }, true)

  // Set rotation (Y-axis only) as quaternion
  const halfAngle = state.rotation * 0.5
  carBody.setRotation({
    x: 0,
    y: Math.sin(halfAngle),
    z: 0,
    w: Math.cos(halfAngle),
  }, true)
}

/**
 * After Rapier steps, read the car body's actual position back into carState.
 * This captures any collision push-out that Rapier applied.
 */
export function readFromRapier(state, carBody) {
  const pos = carBody.translation()
  state.position.set(pos.x, GROUND_Y, pos.z)
}
