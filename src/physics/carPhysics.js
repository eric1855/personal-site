/**
 * Rapier-based car physics.
 *
 * The car is a dynamic RigidBody with a cuboid collider.
 * Movement: force applied in the body's forward direction.
 * Steering: torque impulse around the Y axis.
 * The carState object is kept in sync so the rest of the codebase
 * (camera, proximity, dust) can read it unchanged.
 */
import * as THREE from 'three'

// Tuning — adjust these to change how the car feels
const DRIVE_FORCE     = 65      // forward force magnitude
const REVERSE_FORCE   = 30      // backward force magnitude
const BRAKE_FORCE     = 80      // braking force when pressing reverse while moving forward
const STEER_TORQUE    = 18      // torque applied for turning
const MAX_SPEED       = 18      // clamp linear velocity magnitude (units/s)
const MAX_ANGULAR     = 3.5     // clamp angular velocity Y (rad/s)
const LINEAR_DAMPING  = 2.0     // friction-like damping on linear velocity
const ANGULAR_DAMPING = 6.0     // friction-like damping on angular velocity
const LATERAL_GRIP    = 0.92    // how much lateral velocity is cancelled each step (1 = perfect grip)

// Car body dimensions — match the Three.js mesh (BoxGeometry 1, 0.38, 1.9)
const CAR_HW = 0.5    // half-width
const CAR_HH = 0.19   // half-height
const CAR_HD = 0.95   // half-depth (half-length)

export const GROUND_Y = 0.3

// Module-level reusables
const _v3 = new THREE.Vector3()
const _q  = new THREE.Quaternion()

export function createCarPhysics(RAPIER, world) {
  // ── Rigid body ──────────────────────────────────────────────────
  const bodyDesc = RAPIER.RigidBodyDesc.dynamic()
    .setTranslation(0, GROUND_Y + CAR_HH + 0.01, 0)
    .setLinearDamping(LINEAR_DAMPING)
    .setAngularDamping(ANGULAR_DAMPING)
    .lockRotations()            // we unlock only Y below
    .setCanSleep(false)

  const rigidBody = world.createRigidBody(bodyDesc)

  // Allow rotation only around Y (up) axis
  rigidBody.setEnabledRotations(false, true, false, true)

  // ── Collider ────────────────────────────────────────────────────
  const colliderDesc = RAPIER.ColliderDesc.cuboid(CAR_HW, CAR_HH, CAR_HD)
    .setFriction(0.5)
    .setRestitution(0.15)
    .setDensity(3.0)           // heavier car = more stable
    .setActiveEvents(RAPIER.ActiveEvents.COLLISION_EVENTS)

  world.createCollider(colliderDesc, rigidBody)

  // ── State object (read by camera, dust, proximity) ─────────────
  const carState = {
    position: new THREE.Vector3(0, GROUND_Y, 0),
    rotation: 0,          // heading angle around Y (radians)
    velocity: 0,          // signed scalar speed along heading
    steer: 0,             // visual steering amount for front wheels
    speed: 0,             // absolute speed
  }

  // ── Step (called at fixed 60Hz) ────────────────────────────────
  function preStep(keys) {
    const pos = rigidBody.translation()
    const rot = rigidBody.rotation()  // quaternion {x,y,z,w}

    // Extract heading from quaternion (Y-axis rotation)
    // heading = atan2(2*(w*y + x*z), 1 - 2*(y*y + z*z))
    const heading = Math.atan2(
      2 * (rot.w * rot.y + rot.x * rot.z),
      1 - 2 * (rot.y * rot.y + rot.z * rot.z)
    )

    // Forward direction in world space
    const fwdX = Math.sin(heading)
    const fwdZ = Math.cos(heading)

    // Current linear velocity
    const linvel = rigidBody.linvel()
    const speed = Math.sqrt(linvel.x * linvel.x + linvel.z * linvel.z)
    const forwardSpeed = linvel.x * fwdX + linvel.z * fwdZ

    // ── Cancel lateral sliding (grip) ───────────────────────────
    // Lateral direction: perpendicular to forward in XZ plane
    const latX = fwdZ
    const latZ = -fwdX
    const lateralSpeed = linvel.x * latX + linvel.z * latZ

    // Remove a portion of lateral velocity for tire grip
    const correctionX = -lateralSpeed * LATERAL_GRIP * latX
    const correctionZ = -lateralSpeed * LATERAL_GRIP * latZ
    rigidBody.setLinvel({
      x: linvel.x + correctionX,
      y: linvel.y,
      z: linvel.z + correctionZ,
    }, true)

    // ── Drive forces ────────────────────────────────────────────
    if (keys.forward) {
      if (speed < MAX_SPEED) {
        rigidBody.addForce({ x: fwdX * DRIVE_FORCE, y: 0, z: fwdZ * DRIVE_FORCE }, true)
      }
    } else if (keys.backward) {
      if (forwardSpeed > 1.0) {
        // Braking (pressing reverse while moving forward)
        rigidBody.addForce({ x: -fwdX * BRAKE_FORCE, y: 0, z: -fwdZ * BRAKE_FORCE }, true)
      } else {
        // Actual reverse
        if (speed < MAX_SPEED * 0.4) {
          rigidBody.addForce({ x: -fwdX * REVERSE_FORCE, y: 0, z: -fwdZ * REVERSE_FORCE }, true)
        }
      }
    }

    // ── Steering torque ─────────────────────────────────────────
    const steerDir = keys.left ? 1 : keys.right ? -1 : 0
    if (steerDir !== 0 && speed > 0.3) {
      // Scale torque with speed for realistic feel (less turn when slow/stopped)
      const speedFactor = Math.min(speed / 5, 1.0)
      // Reverse steering direction when going backward
      const reverseSign = forwardSpeed < -0.3 ? -1 : 1
      const angvel = rigidBody.angvel()
      if (Math.abs(angvel.y) < MAX_ANGULAR) {
        rigidBody.applyTorqueImpulse({
          x: 0,
          y: steerDir * STEER_TORQUE * speedFactor * reverseSign,
          z: 0,
        }, true)
      }
    }

    // Clamp max speed
    const linvel2 = rigidBody.linvel()
    const spd2 = Math.sqrt(linvel2.x * linvel2.x + linvel2.z * linvel2.z)
    if (spd2 > MAX_SPEED) {
      const scale = MAX_SPEED / spd2
      rigidBody.setLinvel({
        x: linvel2.x * scale,
        y: linvel2.y,
        z: linvel2.z * scale,
      }, true)
    }
  }

  // ── Sync Three.js state from Rapier (called once per render frame) ──
  function postStep() {
    const pos = rigidBody.translation()
    const rot = rigidBody.rotation()
    const linvel = rigidBody.linvel()

    carState.position.set(pos.x, pos.y - CAR_HH, pos.z)
    carState.rotation = Math.atan2(
      2 * (rot.w * rot.y + rot.x * rot.z),
      1 - 2 * (rot.y * rot.y + rot.z * rot.z)
    )

    const fwdX = Math.sin(carState.rotation)
    const fwdZ = Math.cos(carState.rotation)
    carState.velocity = linvel.x * fwdX + linvel.z * fwdZ
    carState.speed = Math.sqrt(linvel.x * linvel.x + linvel.z * linvel.z)

    // Visual steering for front wheels
    const targetSteer = 0
    const steerAmount = Math.atan2(
      rigidBody.angvel().y,
      Math.max(carState.speed, 1)
    ) * 1.5
    carState.steer = THREE.MathUtils.clamp(steerAmount, -0.5, 0.5)
  }

  return { carState, preStep, postStep, rigidBody }
}
