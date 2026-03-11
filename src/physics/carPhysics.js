/**
 * Rapier dynamic-body car physics.
 *
 * The car is a dynamic RigidBody with a cuboid collider.
 * Movement: forces along the car's forward direction.
 * Steering: torque impulse around Y axis, scaled by speed.
 * Lateral grip: cancel ~90% of sideways velocity each step.
 * Rotation locked to Y-axis only (no tipping).
 */
import * as THREE from 'three'

// Tuning constants
const DRIVE_FORCE    = 48      // forward force
const BRAKE_FORCE    = 60      // braking / reverse force
const REVERSE_FORCE  = 20      // reverse driving force
const MAX_SPEED      = 22      // clamp linear speed
const STEER_TORQUE   = 4.5     // steering torque impulse
const STEER_LERP     = 0.18    // visual steer interpolation
const MAX_STEER      = 0.48    // max visual steer angle
const LATERAL_GRIP   = 0.92    // fraction of lateral velocity cancelled each step
const LINEAR_DAMPING = 1.5     // natural deceleration when no input
const ANGULAR_DAMPING = 8.0    // how quickly rotation stops when not steering

// Ground Y for the car's rest position (bottom of car mesh sits here)
export const GROUND_Y = 0.3

// Reusable temporaries
const _quat = new THREE.Quaternion()
const _euler = new THREE.Euler()
const _forward = new THREE.Vector3()

export function createCarPhysics(RAPIER, world) {
  // ── Create dynamic rigid body ────────────────────────────────
  const bodyDesc = RAPIER.RigidBodyDesc.dynamic()
    .setTranslation(0, GROUND_Y + 0.19, 0) // center of cuboid at ground + half-height
    .setLinearDamping(LINEAR_DAMPING)
    .setAngularDamping(ANGULAR_DAMPING)
    .setCanSleep(false)
  // Lock rotations to Y-axis only (no tipping)
  bodyDesc.enabledRotations(false, true, false)

  const rigidBody = world.createRigidBody(bodyDesc)

  // Cuboid collider: half-extents match car mesh (1 x 0.38 x 1.9)
  const colliderDesc = RAPIER.ColliderDesc.cuboid(0.5, 0.19, 0.95)
    .setMass(1.0)
    .setRestitution(0.05)
    .setFriction(0.6)
  world.createCollider(colliderDesc, rigidBody)

  // ── Car state (exposed for camera, UI, dust) ─────────────────
  const carState = {
    position: new THREE.Vector3(0, GROUND_Y, 0),
    rotation: 0,       // heading angle (radians)
    velocity: 0,       // signed scalar speed along heading
    speed: 0,          // absolute speed
    steer: 0,          // visual steer angle
  }

  // ── Per-frame physics step ───────────────────────────────────
  function preStep(keys) {
    const pos = rigidBody.translation()
    const rot = rigidBody.rotation()    // quaternion {x,y,z,w}
    const linVel = rigidBody.linvel()   // {x,y,z}

    // Compute heading from quaternion
    _quat.set(rot.x, rot.y, rot.z, rot.w)
    _euler.setFromQuaternion(_quat, 'YXZ')
    const heading = _euler.y

    // Forward direction in world space (car faces +Z in local space)
    _forward.set(Math.sin(heading), 0, Math.cos(heading))

    // Current speed along forward axis
    const forwardSpeed = linVel.x * _forward.x + linVel.z * _forward.z

    // ── Drive forces ───────────────────────────────────────────
    if (keys.forward) {
      const force = DRIVE_FORCE * (1 - Math.min(Math.abs(forwardSpeed) / MAX_SPEED, 1) * 0.5)
      rigidBody.addForce({ x: _forward.x * force, y: 0, z: _forward.z * force }, true)
    } else if (keys.backward) {
      if (forwardSpeed > 0.5) {
        // Braking
        rigidBody.addForce({ x: -_forward.x * BRAKE_FORCE, y: 0, z: -_forward.z * BRAKE_FORCE }, true)
      } else {
        // Reverse
        rigidBody.addForce({ x: -_forward.x * REVERSE_FORCE, y: 0, z: -_forward.z * REVERSE_FORCE }, true)
      }
    }

    // ── Steering torque ────────────────────────────────────────
    const absSpeed = Math.sqrt(linVel.x * linVel.x + linVel.z * linVel.z)
    // Speed factor: steering effectiveness scales with speed (reduced at very low speed)
    const speedFactor = Math.min(absSpeed / 3, 1) * (1 - Math.min(absSpeed / MAX_SPEED, 1) * 0.3)

    if (keys.left) {
      rigidBody.applyTorqueImpulse({ x: 0, y: STEER_TORQUE * speedFactor, z: 0 }, true)
    } else if (keys.right) {
      rigidBody.applyTorqueImpulse({ x: 0, y: -STEER_TORQUE * speedFactor, z: 0 }, true)
    }

    // ── Lateral grip (cancel sideways sliding) ─────────────────
    const rightX = Math.cos(heading)
    const rightZ = -Math.sin(heading)
    const lateralSpeed = linVel.x * rightX + linVel.z * rightZ
    const cancelX = -rightX * lateralSpeed * LATERAL_GRIP
    const cancelZ = -rightZ * lateralSpeed * LATERAL_GRIP
    rigidBody.applyImpulse({ x: cancelX, y: 0, z: cancelZ }, true)

    // ── Keep car on ground (prevent flying/sinking) ────────────
    if (pos.y < GROUND_Y + 0.19) {
      rigidBody.setTranslation({ x: pos.x, y: GROUND_Y + 0.19, z: pos.z }, true)
      // Kill downward velocity
      if (linVel.y < 0) {
        rigidBody.setLinvel({ x: linVel.x, y: 0, z: linVel.z }, true)
      }
    }

    // ── Speed clamp ────────────────────────────────────────────
    if (absSpeed > MAX_SPEED) {
      const scale = MAX_SPEED / absSpeed
      rigidBody.setLinvel({ x: linVel.x * scale, y: linVel.y, z: linVel.z * scale }, true)
    }
  }

  /** Sync carState from Rapier body (call once per render frame, after world.step) */
  function postStep(keys) {
    const pos = rigidBody.translation()
    const rot = rigidBody.rotation()
    const linVel = rigidBody.linvel()

    // Update carState
    carState.position.set(pos.x, GROUND_Y, pos.z)

    _quat.set(rot.x, rot.y, rot.z, rot.w)
    _euler.setFromQuaternion(_quat, 'YXZ')
    carState.rotation = _euler.y

    // Speed
    const absSpeed = Math.sqrt(linVel.x * linVel.x + linVel.z * linVel.z)
    _forward.set(Math.sin(carState.rotation), 0, Math.cos(carState.rotation))
    const forwardSpeed = linVel.x * _forward.x + linVel.z * _forward.z
    carState.velocity = forwardSpeed
    carState.speed = absSpeed

    // Visual steer interpolation
    const targetSteer = keys.left ? MAX_STEER : keys.right ? -MAX_STEER : 0
    carState.steer += (targetSteer - carState.steer) * STEER_LERP
  }

  return { carState, preStep, postStep, rigidBody }
}
