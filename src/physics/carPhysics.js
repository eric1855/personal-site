/**
 * carPhysics.js — Ammo.js btRaycastVehicle car physics
 *
 * Creates a rigid body chassis + 4-wheel raycast vehicle.
 * Exposes preStep(keys) and postStep() to sync Three.js mesh.
 */
import * as THREE from 'three'
import { getAmmo, createDynamicBody } from './ammoWorld.js'

// ── Vehicle tuning constants ──────────────────────────────────────────────────
const CHASSIS_WIDTH  = 1.0   // matches BoxGeometry(1, 0.38, 1.9)
const CHASSIS_HEIGHT = 0.38
const CHASSIS_DEPTH  = 1.9

const CHASSIS_MASS   = 800   // kg

// Wheel geometry
const WHEEL_RADIUS       = 0.22
const WHEEL_WIDTH         = 0.16
const WHEEL_HALF_TRACK    = 0.57   // lateral offset from center
const WHEEL_AXIS_FRONT_Z  = 0.62  // forward offset
const WHEEL_AXIS_REAR_Z   = -0.62 // backward offset

// Suspension
const SUSPENSION_REST_LENGTH = 0.3
const SUSPENSION_STIFFNESS   = 30.0
const SUSPENSION_DAMPING     = 4.0
const SUSPENSION_COMPRESSION = 2.0
const MAX_SUSPENSION_TRAVEL  = 0.3
const MAX_SUSPENSION_FORCE   = 10000

// Driving
const ENGINE_FORCE    = 2500
const BRAKE_FORCE     = 80
const MAX_STEER_ANGLE = 0.38   // radians (~22 degrees) — reduced to prevent high-speed spins
const STEER_LERP      = 0.10   // how fast steering converges

// Friction
const WHEEL_FRICTION  = 3.0
const ROLL_INFLUENCE   = 0.08

// Start position
const START_Y = 2.0  // drop car from a small height to let it settle

// Module-level reusables (avoid per-frame allocation)
const _euler = new THREE.Euler()

// ── State object (for camera / HUD / dust) ────────────────────────────────────
export function createCarState() {
  return {
    position: new THREE.Vector3(0, START_Y, 0),
    rotation: 0,        // Y-axis heading (radians)
    quaternion: new THREE.Quaternion(),
    velocity: 0,
    steer: 0,
    speed: 0,
  }
}

/**
 * Build the btRaycastVehicle and chassis body.
 * Returns { vehicle, chassisBody, carState }.
 */
export function createVehiclePhysics(world) {
  const A = getAmmo()

  // ── Chassis shape ──────────────────────────────────────────────────────────
  const chassisHalf = new A.btVector3(CHASSIS_WIDTH / 2, CHASSIS_HEIGHT / 2, CHASSIS_DEPTH / 2)
  const chassisShape = new A.btBoxShape(chassisHalf)
  A.destroy(chassisHalf)

  // ── Chassis body ───────────────────────────────────────────────────────────
  const chassisBody = createDynamicBody(world, chassisShape, CHASSIS_MASS, {
    x: 0, y: START_Y, z: 0,
  })
  // Prevent the chassis from sleeping (so forces always apply)
  chassisBody.setActivationState(4) // DISABLE_DEACTIVATION

  // Prevent the car from rolling over too easily
  const angularFactor = new A.btVector3(0.1, 1, 0.3)
  chassisBody.setAngularFactor(angularFactor)
  A.destroy(angularFactor)

  // ── Vehicle raycaster + tuning ─────────────────────────────────────────────
  const tuning = new A.btVehicleTuning()
  const rayCaster = new A.btDefaultVehicleRaycaster(world)
  const vehicle = new A.btRaycastVehicle(tuning, chassisBody, rayCaster)

  // Bullet vehicles don't use world's contact response for the chassis
  vehicle.setCoordinateSystem(0, 1, 2) // X=right, Y=up, Z=forward

  world.addAction(vehicle)

  // ── Add 4 wheels ───────────────────────────────────────────────────────────
  const wheelDir    = new A.btVector3(0, -1, 0) // suspension direction (down)
  const wheelAxle   = new A.btVector3(-1, 0, 0) // axle direction (left)
  const connectionPt = new A.btVector3(0, 0, 0)

  // Wheel positions: [x, z, isFront]
  const wheelDefs = [
    [-WHEEL_HALF_TRACK,  WHEEL_AXIS_FRONT_Z, true],   // FL
    [ WHEEL_HALF_TRACK,  WHEEL_AXIS_FRONT_Z, true],   // FR
    [-WHEEL_HALF_TRACK,  WHEEL_AXIS_REAR_Z,  false],  // RL
    [ WHEEL_HALF_TRACK,  WHEEL_AXIS_REAR_Z,  false],  // RR
  ]

  for (const [wx, wz, isFront] of wheelDefs) {
    connectionPt.setValue(wx, 0, wz) // connection point relative to chassis center
    const wheelInfo = vehicle.addWheel(
      connectionPt,
      wheelDir,
      wheelAxle,
      SUSPENSION_REST_LENGTH,
      WHEEL_RADIUS,
      tuning,
      isFront,
    )

    wheelInfo.set_m_suspensionStiffness(SUSPENSION_STIFFNESS)
    wheelInfo.set_m_wheelsDampingRelaxation(SUSPENSION_DAMPING)
    wheelInfo.set_m_wheelsDampingCompression(SUSPENSION_COMPRESSION)
    wheelInfo.set_m_frictionSlip(WHEEL_FRICTION)
    wheelInfo.set_m_rollInfluence(ROLL_INFLUENCE)
    wheelInfo.set_m_maxSuspensionTravelCm(MAX_SUSPENSION_TRAVEL * 100)
    wheelInfo.set_m_maxSuspensionForce(MAX_SUSPENSION_FORCE)
  }

  A.destroy(wheelDir)
  A.destroy(wheelAxle)
  A.destroy(connectionPt)

  // ── Car state ──────────────────────────────────────────────────────────────
  const carState = createCarState()

  // Steering state (lerped)
  let currentSteer = 0

  // ── preStep: apply input forces ────────────────────────────────────────────
  function preStep(keys) {
    // Steering — reduce max angle at high speed to prevent 180 spins
    const forwardSpeed = carState.velocity  // approximate km/h-ish
    const steerFactor = Math.max(0.15, 1.0 - (Math.abs(forwardSpeed) / 15))
    const steerDir = keys.left ? 1 : keys.right ? -1 : 0
    const targetSteer = steerDir * MAX_STEER_ANGLE * steerFactor
    currentSteer += (targetSteer - currentSteer) * STEER_LERP

    vehicle.setSteeringValue(currentSteer, 0) // FL
    vehicle.setSteeringValue(currentSteer, 1) // FR

    // Engine force on rear wheels
    let engineForce = 0
    let brakingForce = 0

    if (keys.forward) {
      engineForce = ENGINE_FORCE
    } else if (keys.backward) {
      // Check current velocity to decide brake vs reverse
      const vel = chassisBody.getLinearVelocity()
      const fwd = vehicle.getForwardVector()
      const dot = vel.x() * fwd.x() + vel.y() * fwd.y() + vel.z() * fwd.z()

      if (dot > 0.5) {
        // Moving forward — brake
        brakingForce = BRAKE_FORCE
      } else {
        // Stopped or moving backward — reverse
        engineForce = -ENGINE_FORCE * 0.5
      }
    } else {
      // No input: gentle brake to slow down
      brakingForce = 5
    }

    // Apply engine force to rear wheels
    vehicle.applyEngineForce(engineForce, 2)  // RL
    vehicle.applyEngineForce(engineForce, 3)  // RR

    // Apply braking to all 4 wheels
    vehicle.setBrake(brakingForce, 0)
    vehicle.setBrake(brakingForce, 1)
    vehicle.setBrake(brakingForce, 2)
    vehicle.setBrake(brakingForce, 3)
  }

  // ── postStep: read Bullet transforms → update carState ─────────────────────
  function postStep() {
    const tm = chassisBody.getWorldTransform()
    const origin = tm.getOrigin()
    const rot    = tm.getRotation()

    carState.position.set(origin.x(), origin.y(), origin.z())
    carState.quaternion.set(rot.x(), rot.y(), rot.z(), rot.w())

    // Extract Y heading from quaternion for compatibility
    _euler.setFromQuaternion(carState.quaternion, 'YXZ')
    carState.rotation = _euler.y

    // Speed (magnitude of linear velocity)
    const vel = chassisBody.getLinearVelocity()
    carState.velocity = Math.sqrt(vel.x() * vel.x() + vel.z() * vel.z())
    carState.speed    = carState.velocity

    // Clamp angular velocity Y to prevent excessive yaw / 180 spins
    const angvel = chassisBody.getAngularVelocity()
    const maxYaw = 2.5  // rad/s — tighter clamp to prevent 180 spins
    if (Math.abs(angvel.y()) > maxYaw) {
      angvel.setY(Math.sign(angvel.y()) * maxYaw)
      chassisBody.setAngularVelocity(angvel)
    }

    // Steer (for visual wheel rotation)
    carState.steer = currentSteer
  }

  return { vehicle, chassisBody, carState, preStep, postStep }
}
