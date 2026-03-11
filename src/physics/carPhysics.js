// Variant 5: Smooth / Floaty (Mario Kart feel)
// Punchy off the line, sharp braking, bell-curve turn rate that peaks at mid-speed.
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

  state.position.x += Math.sin(state.rotation) * state.velocity
  state.position.z += Math.cos(state.rotation) * state.velocity
  state.position.y  = GROUND_Y
  state.speed = Math.abs(state.velocity)
}
