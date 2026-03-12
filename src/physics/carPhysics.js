/**
 * Rapier-based car physics.
 *
 * The car is a dynamic RigidBody with a cuboid collider.
 * Movement: force applied in the body's forward direction.
 * Steering: torque impulse around the Y axis, scaled by speed.
 * The carState object is kept in sync so the rest of the codebase
 * (camera, proximity, dust) can read it unchanged.
 */
import * as THREE from 'three'

// Tuning — adjust these to change how the car feels
const DRIVE_FORCE     = 60      // forward force magnitude (N)
const REVERSE_FORCE   = 25      // backward force magnitude (N)
const BRAKE_FORCE     = 80      // braking force when pressing reverse while moving forward
const STEER_TORQUE    = 18      // torque applied for turning
const MAX_SPEED       = 18      // clamp linear velocity magnitude (units/s)
const MAX_ANGULAR     = 3.5     // clamp angular velocity Y (rad/s)
const LINEAR_DAMPING  = 1.5     // friction-like damping on linear velocity
const ANGULAR_DAMPING = 6.0     // friction-like damping on angular velocity
const LATERAL_GRIP    = 0.90    // how much lateral velocity is cancelled each step (1 = perfect grip)

// Car body dimensions — match the Three.js mesh (BoxGeometry 1, 0.38, 1.9)
const CAR_HW = 0.5    // half-width
const CAR_HH = 0.19   // half-height
const CAR_HD = 0.95   // half-depth (half-length)

// Spawn position
const SPAWN_Y = 0.5

// Module-level reusables (avoid per-frame allocation)
const _euler = new THREE.Euler()
const _quat  = new THREE.Quaternion()

// ── Exported state (single source of truth) ─────────────────────────
export const carState = {
  position:   new THREE.Vector3(0, 0, 0),
  quaternion: new THREE.Quaternion(),
  rotation:   0,       // Y-axis heading in radians
  velocity:   0,       // scalar speed (signed along heading)
  steer:      0,       // current visual steering value
  speed:      0,       // absolute speed
}

let _body = null

export function createCarPhysics(world, RAPIER) {
  // ── Rigid body ──────────────────────────────────────────────────
  const bodyDesc = RAPIER.RigidBodyDesc.dynamic()
    .setTranslation(0, SPAWN_Y, 0)
    .setLinearDamping(LINEAR_DAMPING)
    .setAngularDamping(ANGULAR_DAMPING)
    .lockRotations()            // we unlock only Y below
    .setCanSleep(false)

  _body = world.createRigidBody(bodyDesc)

  // Allow rotation only around Y (up) axis
  _body.setEnabledRotations(false, true, false, true)

  // ── Collider ────────────────────────────────────────────────────
  const colliderDesc = RAPIER.ColliderDesc.cuboid(CAR_HW, CAR_HH, CAR_HD)
    .setFriction(0.5)
    .setRestitution(0.1)
    .setDensity(3.0)
    .setActiveEvents(RAPIER.ActiveEvents.COLLISION_EVENTS)

  world.createCollider(colliderDesc, _body)

  // Initialize carState from spawn
  carState.position.set(0, SPAWN_Y - CAR_HH, 0)
  carState.quaternion.identity()
  carState.rotation = 0
  carState.speed = 0
  carState.velocity = 0
  carState.steer = 0
}

// ── preStep (called at fixed 60Hz before world.step()) ─────────────
export function preStep(keys) {
  if (!_body) return

  const pos = _body.translation()
  const rot = _body.rotation()  // quaternion {x,y,z,w}

  // Extract heading from quaternion (Y-axis rotation)
  const heading = Math.atan2(
    2 * (rot.w * rot.y + rot.x * rot.z),
    1 - 2 * (rot.y * rot.y + rot.z * rot.z)
  )

  // Forward direction in world space
  const fwdX = Math.sin(heading)
  const fwdZ = Math.cos(heading)

  // Current linear velocity
  const linvel = _body.linvel()
  const speed = Math.sqrt(linvel.x * linvel.x + linvel.z * linvel.z)
  const forwardSpeed = linvel.x * fwdX + linvel.z * fwdZ

  // ── Cancel lateral sliding (grip) ───────────────────────────
  const latX = fwdZ
  const latZ = -fwdX
  const lateralSpeed = linvel.x * latX + linvel.z * latZ

  const correctionX = -lateralSpeed * LATERAL_GRIP * latX
  const correctionZ = -lateralSpeed * LATERAL_GRIP * latZ
  _body.setLinvel({
    x: linvel.x + correctionX,
    y: linvel.y,
    z: linvel.z + correctionZ,
  }, true)

  // ── Drive forces ────────────────────────────────────────────
  if (keys.forward) {
    if (speed < MAX_SPEED) {
      _body.addForce({ x: fwdX * DRIVE_FORCE, y: 0, z: fwdZ * DRIVE_FORCE }, true)
    }
  } else if (keys.backward) {
    if (forwardSpeed > 1.0) {
      // Braking (pressing reverse while moving forward)
      _body.addForce({ x: -fwdX * BRAKE_FORCE, y: 0, z: -fwdZ * BRAKE_FORCE }, true)
    } else {
      // Actual reverse
      if (speed < MAX_SPEED * 0.4) {
        _body.addForce({ x: -fwdX * REVERSE_FORCE, y: 0, z: -fwdZ * REVERSE_FORCE }, true)
      }
    }
  }

  // ── Steering torque ─────────────────────────────────────────
  const steerDir = keys.left ? 1 : keys.right ? -1 : 0
  if (steerDir !== 0 && speed > 0.3) {
    const speedFactor = Math.min(speed / 5, 1.0)
    const reverseSign = forwardSpeed < -0.3 ? -1 : 1
    const angvel = _body.angvel()
    if (Math.abs(angvel.y) < MAX_ANGULAR) {
      _body.applyTorqueImpulse({
        x: 0,
        y: steerDir * STEER_TORQUE * speedFactor * reverseSign,
        z: 0,
      }, true)
    }
  }

  // ── Clamp max speed ─────────────────────────────────────────
  const linvel2 = _body.linvel()
  const spd2 = Math.sqrt(linvel2.x * linvel2.x + linvel2.z * linvel2.z)
  if (spd2 > MAX_SPEED) {
    const scale = MAX_SPEED / spd2
    _body.setLinvel({
      x: linvel2.x * scale,
      y: linvel2.y,
      z: linvel2.z * scale,
    }, true)
  }

  // ── Safety: reset if car falls below y=-5 ───────────────────
  if (pos.y < -5) {
    _body.setTranslation({ x: 0, y: SPAWN_Y, z: 0 }, true)
    _body.setLinvel({ x: 0, y: 0, z: 0 }, true)
    _body.setAngvel({ x: 0, y: 0, z: 0 }, true)
  }
}

// ── postStep: sync Three.js state from Rapier (called once per render frame) ──
export function postStep() {
  if (!_body) return

  const pos = _body.translation()
  const rot = _body.rotation()
  const linvel = _body.linvel()

  // Sync position (offset by half-height so mesh sits on surface)
  carState.position.set(pos.x, pos.y - CAR_HH, pos.z)

  // Sync quaternion directly from Rapier
  carState.quaternion.set(rot.x, rot.y, rot.z, rot.w)

  // Extract Y-axis heading
  carState.rotation = Math.atan2(
    2 * (rot.w * rot.y + rot.x * rot.z),
    1 - 2 * (rot.y * rot.y + rot.z * rot.z)
  )

  // Compute speed from linear velocity
  const fwdX = Math.sin(carState.rotation)
  const fwdZ = Math.cos(carState.rotation)
  carState.velocity = linvel.x * fwdX + linvel.z * fwdZ
  carState.speed = Math.sqrt(linvel.x * linvel.x + linvel.z * linvel.z)

  // Visual steering for front wheels — derive from angular velocity
  const steerAmount = Math.atan2(
    _body.angvel().y,
    Math.max(carState.speed, 1)
  ) * 1.5
  carState.steer = THREE.MathUtils.clamp(steerAmount, -0.5, 0.5)
}
