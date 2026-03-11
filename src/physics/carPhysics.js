/**
 * cannon-es RaycastVehicle car physics.
 *
 * Creates a box chassis body + 4-wheel RaycastVehicle.
 * Exposes applyInput(keys) and a carState object that mirrors
 * the old kinematic state shape so the rest of the codebase stays compatible.
 */
import * as CANNON from 'cannon-es'
import * as THREE from 'three'

// ── Chassis dimensions (match Three.js BoxGeometry(1, 0.38, 1.9)) ───────
const CHASSIS_W = 1.0
const CHASSIS_H = 0.38
const CHASSIS_D = 1.9
const CHASSIS_MASS = 80

// ── Engine / steering ───────────────────────────────────────────────────
const MAX_FORCE   = 600   // engine force applied to rear wheels
const MAX_BRAKE   = 30    // braking force
const MAX_STEER   = 0.5   // max steering angle (radians)
const STEER_LERP  = 0.12  // steering interpolation speed

// ── Suspension ──────────────────────────────────────────────────────────
const SUSPENSION_STIFFNESS   = 55
const SUSPENSION_DAMPING     = 4.0
const SUSPENSION_COMPRESSION = 3.5
const SUSPENSION_REST_LENGTH = 0.35
const SUSPENSION_TRAVEL      = 0.3

// ── Wheel geometry ──────────────────────────────────────────────────────
const WHEEL_RADIUS      = 0.22
const WHEEL_HALF_WIDTH  = 0.08  // half of cylinder width (0.16)

// Wheel positions relative to chassis center
// Front axle z = +0.62, Rear axle z = -0.62
// Left x = -0.57, Right x = +0.57
const WHEEL_POSITIONS = [
  { x: -0.57, y: 0,  z:  0.62 },  // front-left  [0]
  { x:  0.57, y: 0,  z:  0.62 },  // front-right [1]
  { x: -0.57, y: 0,  z: -0.62 },  // rear-left   [2]
  { x:  0.57, y: 0,  z: -0.62 },  // rear-right  [3]
]

export function createCarPhysics(world, groundMaterial) {
  // ── Chassis body ──────────────────────────────────────────────
  const chassisShape = new CANNON.Box(
    new CANNON.Vec3(CHASSIS_W / 2, CHASSIS_H / 2, CHASSIS_D / 2)
  )

  const chassisBody = new CANNON.Body({
    mass: CHASSIS_MASS,
    shape: chassisShape,
    position: new CANNON.Vec3(0, 2, 0), // spawn above ground, will settle
    linearDamping: 0.1,
    angularDamping: 0.6,  // prevent excessive spinning
  })

  // Wheel material — high friction for traction
  const wheelMaterial = new CANNON.Material('wheel')
  const wheelGroundContact = new CANNON.ContactMaterial(wheelMaterial, groundMaterial, {
    friction: 0.6,
    restitution: 0.0,
    contactEquationStiffness: 1e8,
    contactEquationRelaxation: 3,
  })
  world.addContactMaterial(wheelGroundContact)

  world.addBody(chassisBody)

  // ── RaycastVehicle ────────────────────────────────────────────
  const vehicle = new CANNON.RaycastVehicle({
    chassisBody,
    indexRightAxis: 0,   // X
    indexUpAxis: 1,       // Y
    indexForwardAxis: 2,  // Z
  })

  // Wheel options shared by all 4 wheels
  const wheelOptions = {
    radius: WHEEL_RADIUS,
    directionLocal: new CANNON.Vec3(0, -1, 0),
    axleLocal: new CANNON.Vec3(-1, 0, 0),
    suspensionStiffness: SUSPENSION_STIFFNESS,
    dampingRelaxation: SUSPENSION_DAMPING,
    dampingCompression: SUSPENSION_COMPRESSION,
    suspensionRestLength: SUSPENSION_REST_LENGTH,
    maxSuspensionTravel: SUSPENSION_TRAVEL,
    frictionSlip: 3.0,
    rollInfluence: 0.05,
    maxSuspensionForce: 50000,
    customSlidingRotationalSpeed: -30,
    useCustomSlidingRotationalSpeed: true,
  }

  for (const wp of WHEEL_POSITIONS) {
    vehicle.addWheel({
      ...wheelOptions,
      chassisConnectionPointLocal: new CANNON.Vec3(wp.x, wp.y, wp.z),
    })
  }

  vehicle.addToWorld(world)

  // ── carState — compatible shape with old kinematic API ────────
  const carState = {
    position: new THREE.Vector3(0, 0.3, 0),
    quaternion: new THREE.Quaternion(),
    rotation: 0,   // Y-axis heading (for dust + proximity)
    velocity: 0,   // scalar forward speed (for dust)
    steer: 0,      // current visual steer angle
    speed: 0,      // abs(velocity)
  }

  let currentSteer = 0

  /**
   * Apply keyboard input to the vehicle each physics tick.
   */
  function applyInput(keys) {
    // Steering — smooth interpolation
    const targetSteer = keys.left ? MAX_STEER : keys.right ? -MAX_STEER : 0
    currentSteer += (targetSteer - currentSteer) * STEER_LERP
    vehicle.setSteeringValue(currentSteer, 0) // front-left
    vehicle.setSteeringValue(currentSteer, 1) // front-right

    // Engine force on rear wheels (RWD)
    if (keys.forward) {
      vehicle.applyEngineForce(MAX_FORCE, 2)
      vehicle.applyEngineForce(MAX_FORCE, 3)
      vehicle.setBrake(0, 0)
      vehicle.setBrake(0, 1)
      vehicle.setBrake(0, 2)
      vehicle.setBrake(0, 3)
    } else if (keys.backward) {
      // Check current forward speed to decide brake vs reverse
      const chassisVel = chassisBody.velocity
      const fwd = new CANNON.Vec3(0, 0, 1)
      chassisBody.quaternion.vmult(fwd, fwd)
      const forwardSpeed = chassisVel.dot(fwd)

      if (forwardSpeed > 0.5) {
        // Moving forward — brake
        vehicle.applyEngineForce(0, 2)
        vehicle.applyEngineForce(0, 3)
        vehicle.setBrake(MAX_BRAKE, 0)
        vehicle.setBrake(MAX_BRAKE, 1)
        vehicle.setBrake(MAX_BRAKE, 2)
        vehicle.setBrake(MAX_BRAKE, 3)
      } else {
        // Stopped or rolling back — reverse
        vehicle.applyEngineForce(-MAX_FORCE * 0.4, 2)
        vehicle.applyEngineForce(-MAX_FORCE * 0.4, 3)
        vehicle.setBrake(0, 0)
        vehicle.setBrake(0, 1)
        vehicle.setBrake(0, 2)
        vehicle.setBrake(0, 3)
      }
    } else {
      // No input — coast with gentle braking
      vehicle.applyEngineForce(0, 2)
      vehicle.applyEngineForce(0, 3)
      vehicle.setBrake(2, 0)
      vehicle.setBrake(2, 1)
      vehicle.setBrake(2, 2)
      vehicle.setBrake(2, 3)
    }
  }

  /**
   * Sync carState from the physics body (call once per render frame, after world.step).
   */
  function syncState() {
    const p = chassisBody.position
    const q = chassisBody.quaternion

    carState.position.set(p.x, p.y, p.z)
    carState.quaternion.set(q.x, q.y, q.z, q.w)

    // Extract Y-axis heading from quaternion for dust / proximity
    // heading = atan2(2*(qw*qy + qx*qz), 1 - 2*(qy^2 + qz^2))  — but we use Three.js Euler
    const euler = new THREE.Euler().setFromQuaternion(carState.quaternion, 'YXZ')
    carState.rotation = euler.y

    // Forward speed — dot(velocity, local forward)
    const vel = chassisBody.velocity
    const fwd = new CANNON.Vec3(0, 0, 1)
    chassisBody.quaternion.vmult(fwd, fwd)
    carState.velocity = vel.x * fwd.x + vel.y * fwd.y + vel.z * fwd.z

    carState.speed = Math.abs(carState.velocity)
    carState.steer = currentSteer

    // World boundary clamping (soft)
    const BOUND = 140
    if (Math.abs(p.x) > BOUND) {
      chassisBody.position.x = Math.sign(p.x) * BOUND
      chassisBody.velocity.x *= -0.3
    }
    if (Math.abs(p.z) > BOUND) {
      chassisBody.position.z = Math.sign(p.z) * BOUND
      chassisBody.velocity.z *= -0.3
    }

    // Safety: if car falls below ground, reset it
    if (p.y < -5) {
      chassisBody.position.set(0, 3, 0)
      chassisBody.velocity.set(0, 0, 0)
      chassisBody.angularVelocity.set(0, 0, 0)
      chassisBody.quaternion.set(0, 0, 0, 1)
    }
  }

  return { vehicle, chassisBody, carState, applyInput, syncState }
}
