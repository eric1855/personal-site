/**
 * Custom spring-damper suspension car using cannon-es.
 *
 * Architecture:
 * - Chassis: CANNON.Body with Box shape (matches Three.js mesh 1.0 x 0.38 x 1.9)
 * - 4 Wheels: CANNON.Body spheres, each connected to chassis via manual spring forces
 * - Each frame we compute spring + damper forces and apply them to chassis & wheel
 * - Drive force applied to rear wheels, steering by rotating front wheel positions
 * - No built-in RaycastVehicle — all suspension from scratch
 */
import * as CANNON from 'cannon-es'

// ── Chassis dimensions ──────────────────────────────────────────
const CHASSIS_HALF_W = 0.5     // half-width (x)
const CHASSIS_HALF_H = 0.19    // half-height (y) — 0.38 total
const CHASSIS_HALF_D = 0.95    // half-depth (z) — 1.9 total
const CHASSIS_MASS   = 80      // kg

// ── Wheel dimensions ────────────────────────────────────────────
const WHEEL_RADIUS   = 0.22
const WHEEL_MASS     = 5       // kg each

// ── Spring-damper parameters ────────────────────────────────────
const SPRING_STIFFNESS  = 600   // N/m — how stiff the suspension is
const SPRING_DAMPING    = 45    // N*s/m — how quickly oscillations die
const SPRING_REST_LEN   = 0.40  // natural length of spring (chassis to wheel center)

// ── Drive parameters ────────────────────────────────────────────
const DRIVE_FORCE       = 280   // N — applied to rear wheels
const BRAKE_FORCE       = 450   // N — braking force
const REVERSE_FORCE     = 140   // N — reverse drive
const MAX_STEER_ANGLE   = 0.42  // radians (~24 deg)
const STEER_SPEED       = 3.5   // radians/sec — how fast steering responds

// ── Anti-roll and stability ─────────────────────────────────────
const ANTI_ROLL_FORCE   = 120   // N — keeps car from rolling over
const LINEAR_DAMPING    = 0.15  // overall velocity drag
const ANGULAR_DAMPING   = 0.85  // prevents endless spinning
const MAX_SPEED         = 18    // m/s cap

// ── Wheel attachment points (local to chassis) ──────────────────
//    [x, y, z] — y is below chassis, x is left(-)/right(+), z is front(+)/back(-)
const WHEEL_POSITIONS = [
  { name: 'FL', x: -0.57, y: -SPRING_REST_LEN, z:  0.62, driven: false, steered: true },
  { name: 'FR', x:  0.57, y: -SPRING_REST_LEN, z:  0.62, driven: false, steered: true },
  { name: 'RL', x: -0.57, y: -SPRING_REST_LEN, z: -0.62, driven: true,  steered: false },
  { name: 'RR', x:  0.57, y: -SPRING_REST_LEN, z: -0.62, driven: true,  steered: false },
]

// Material for wheels — high friction for traction
const wheelMaterial = new CANNON.Material('wheel')

export function createSpringCar(world, defaultMaterial) {
  // ── Wheel-ground contact material ─────────────────────────
  const wheelGroundContact = new CANNON.ContactMaterial(wheelMaterial, defaultMaterial, {
    friction: 0.6,
    restitution: 0.05,
  })
  world.addContactMaterial(wheelGroundContact)

  // ── Chassis body ──────────────────────────────────────────
  const chassisShape = new CANNON.Box(
    new CANNON.Vec3(CHASSIS_HALF_W, CHASSIS_HALF_H, CHASSIS_HALF_D)
  )
  const chassisBody = new CANNON.Body({
    mass: CHASSIS_MASS,
    material: defaultMaterial,
    linearDamping: LINEAR_DAMPING,
    angularDamping: ANGULAR_DAMPING,
    allowSleep: false,
  })
  chassisBody.addShape(chassisShape)
  // Start elevated so springs can settle
  chassisBody.position.set(0, SPRING_REST_LEN + WHEEL_RADIUS + 0.3, 0)
  world.addBody(chassisBody)

  // ── Wheel bodies ──────────────────────────────────────────
  const wheels = []
  for (const wp of WHEEL_POSITIONS) {
    const wheelShape = new CANNON.Sphere(WHEEL_RADIUS)
    const wheelBody = new CANNON.Body({
      mass: WHEEL_MASS,
      material: wheelMaterial,
      linearDamping: 0.05,
      angularDamping: 0.5,
      allowSleep: false,
    })
    wheelBody.addShape(wheelShape)

    // Position wheel below chassis
    const worldPos = _localToWorld(chassisBody, wp.x, wp.y, wp.z)
    wheelBody.position.copy(worldPos)
    world.addBody(wheelBody)

    wheels.push({
      body: wheelBody,
      localAttach: new CANNON.Vec3(wp.x, wp.y + SPRING_REST_LEN, wp.z), // attachment point on chassis (top of spring)
      restY: wp.y, // rest position relative to chassis
      driven: wp.driven,
      steered: wp.steered,
      name: wp.name,
    })
  }

  // ── State ─────────────────────────────────────────────────
  let currentSteer = 0

  // ── Pre-step: apply spring forces + drive forces ──────────
  function preStep(keys, dt) {
    // Update steering
    const targetSteer = keys.left ? MAX_STEER_ANGLE : keys.right ? -MAX_STEER_ANGLE : 0
    const steerDelta = STEER_SPEED * dt
    if (currentSteer < targetSteer) {
      currentSteer = Math.min(currentSteer + steerDelta, targetSteer)
    } else if (currentSteer > targetSteer) {
      currentSteer = Math.max(currentSteer - steerDelta, targetSteer)
    }

    // Get chassis orientation vectors
    const chassisUp = new CANNON.Vec3()
    const chassisFwd = new CANNON.Vec3()
    const chassisRight = new CANNON.Vec3()
    chassisBody.quaternion.vmult(new CANNON.Vec3(0, 1, 0), chassisUp)
    chassisBody.quaternion.vmult(new CANNON.Vec3(0, 0, 1), chassisFwd)
    chassisBody.quaternion.vmult(new CANNON.Vec3(1, 0, 0), chassisRight)

    // ── Spring-damper forces for each wheel ─────────────────
    for (const wheel of wheels) {
      // Compute the world-space attachment point on the chassis
      const attachWorld = new CANNON.Vec3()
      chassisBody.quaternion.vmult(wheel.localAttach, attachWorld)
      attachWorld.vadd(chassisBody.position, attachWorld)

      // Vector from attachment point to wheel center
      const dx = wheel.body.position.x - attachWorld.x
      const dy = wheel.body.position.y - attachWorld.y
      const dz = wheel.body.position.z - attachWorld.z
      const currentLen = Math.sqrt(dx * dx + dy * dy + dz * dz)

      if (currentLen < 0.001) continue

      // Direction from attachment to wheel (normalized)
      const dirX = dx / currentLen
      const dirY = dy / currentLen
      const dirZ = dz / currentLen

      // Spring force: F = -k * (currentLen - restLen)
      const stretch = currentLen - SPRING_REST_LEN
      const springF = -SPRING_STIFFNESS * stretch

      // Damping force: F = -c * relative_velocity_along_spring
      const relVelX = wheel.body.velocity.x - chassisBody.velocity.x
      const relVelY = wheel.body.velocity.y - chassisBody.velocity.y
      const relVelZ = wheel.body.velocity.z - chassisBody.velocity.z
      const relVelAlongSpring = relVelX * dirX + relVelY * dirY + relVelZ * dirZ
      const dampingF = -SPRING_DAMPING * relVelAlongSpring

      const totalF = springF + dampingF

      // Apply force along spring direction
      const forceOnWheel = new CANNON.Vec3(
        dirX * totalF,
        dirY * totalF,
        dirZ * totalF,
      )
      const forceOnChassis = new CANNON.Vec3(
        -dirX * totalF,
        -dirY * totalF,
        -dirZ * totalF,
      )

      wheel.body.applyForce(forceOnWheel)
      chassisBody.applyForce(forceOnChassis, attachWorld.vsub(chassisBody.position))

      // ── Lateral constraint ────────────────────────────────
      // Prevent wheels from sliding sideways (keep them roughly under the chassis)
      // Project wheel position error onto chassis right axis
      const localWheelTarget = new CANNON.Vec3()
      if (wheel.steered) {
        // For steered wheels, rotate attachment around Y by steer angle
        const cosS = Math.cos(currentSteer)
        const sinS = Math.sin(currentSteer)
        const origX = wheel.localAttach.x
        const origZ = wheel.localAttach.z
        localWheelTarget.set(
          origX * cosS - origZ * sinS,
          wheel.localAttach.y - SPRING_REST_LEN, // target at rest below attach
          origX * sinS + origZ * cosS
        )
      } else {
        localWheelTarget.set(
          wheel.localAttach.x,
          wheel.localAttach.y - SPRING_REST_LEN,
          wheel.localAttach.z,
        )
      }

      const targetWorld = new CANNON.Vec3()
      chassisBody.quaternion.vmult(localWheelTarget, targetWorld)
      targetWorld.vadd(chassisBody.position, targetWorld)

      // Horizontal constraint force (keep wheel from drifting laterally)
      const errX = targetWorld.x - wheel.body.position.x
      const errZ = targetWorld.z - wheel.body.position.z
      const lateralStiffness = 800
      const lateralDamping = 60
      const latRelVelX = wheel.body.velocity.x - chassisBody.velocity.x
      const latRelVelZ = wheel.body.velocity.z - chassisBody.velocity.z

      const latForceX = errX * lateralStiffness - latRelVelX * lateralDamping
      const latForceZ = errZ * lateralStiffness - latRelVelZ * lateralDamping

      wheel.body.applyForce(new CANNON.Vec3(latForceX, 0, latForceZ))
      chassisBody.applyForce(new CANNON.Vec3(-latForceX, 0, -latForceZ))
    }

    // ── Anti-roll bars (front pair + rear pair) ─────────────
    _applyAntiRoll(chassisBody, wheels[0].body, wheels[1].body, chassisUp)
    _applyAntiRoll(chassisBody, wheels[2].body, wheels[3].body, chassisUp)

    // ── Drive force ─────────────────────────────────────────
    // Get chassis forward direction projected on ground plane
    const fwdFlat = new CANNON.Vec3(chassisFwd.x, 0, chassisFwd.z)
    const fwdLen = Math.sqrt(fwdFlat.x * fwdFlat.x + fwdFlat.z * fwdFlat.z)
    if (fwdLen > 0.001) {
      fwdFlat.scale(1 / fwdLen, fwdFlat)
    }

    // Current forward speed
    const forwardSpeed = chassisBody.velocity.x * fwdFlat.x + chassisBody.velocity.z * fwdFlat.z

    if (keys.forward) {
      if (forwardSpeed < MAX_SPEED) {
        const driveDir = new CANNON.Vec3()
        // For driven (rear) wheels, apply force in chassis forward direction
        // For steered front wheels when driven, apply in their steered direction
        for (const wheel of wheels) {
          if (wheel.driven) {
            driveDir.set(fwdFlat.x * DRIVE_FORCE, 0, fwdFlat.z * DRIVE_FORCE)
            wheel.body.applyForce(driveDir)
          }
        }
      }
    } else if (keys.backward) {
      if (forwardSpeed > 0.5) {
        // Braking
        for (const wheel of wheels) {
          if (wheel.driven) {
            const brakeDir = new CANNON.Vec3(
              -fwdFlat.x * BRAKE_FORCE,
              0,
              -fwdFlat.z * BRAKE_FORCE,
            )
            wheel.body.applyForce(brakeDir)
          }
        }
      } else {
        // Reverse
        if (forwardSpeed > -MAX_SPEED * 0.4) {
          for (const wheel of wheels) {
            if (wheel.driven) {
              const revDir = new CANNON.Vec3(
                -fwdFlat.x * REVERSE_FORCE,
                0,
                -fwdFlat.z * REVERSE_FORCE,
              )
              wheel.body.applyForce(revDir)
            }
          }
        }
      }
    }

    // ── Steering torque ─────────────────────────────────────
    // Apply yaw torque to chassis based on steering input and speed
    if (Math.abs(currentSteer) > 0.01 && Math.abs(forwardSpeed) > 0.3) {
      const steerTorque = currentSteer * Math.sign(forwardSpeed) * 150
      // Torque around world up axis, transformed to local
      const worldTorque = new CANNON.Vec3(0, steerTorque, 0)
      chassisBody.torque.vadd(worldTorque, chassisBody.torque)
    }

    // ── Speed limiter ───────────────────────────────────────
    const speed = chassisBody.velocity.length()
    if (speed > MAX_SPEED) {
      chassisBody.velocity.scale(MAX_SPEED / speed, chassisBody.velocity)
    }

    // ── Keep chassis from flipping ──────────────────────────
    // If chassis tilts too far, apply corrective torque
    const upDot = chassisUp.y
    if (upDot < 0.85) {
      // Apply corrective torque to bring chassis upright
      const correctX = -chassisBody.angularVelocity.x * 5
      const correctZ = -chassisBody.angularVelocity.z * 5
      chassisBody.torque.x += correctX
      chassisBody.torque.z += correctZ
    }
  }

  /**
   * Get the state needed by Three.js for rendering.
   * Returns a state object compatible with the existing postStep / camera system.
   */
  function getState() {
    // Extract yaw (heading) from chassis quaternion
    const q = chassisBody.quaternion
    // yaw = atan2(2*(qw*qy + qx*qz), 1 - 2*(qy*qy + qz*qz)) — but cannon uses xyzw
    // Actually cannon-es quaternion is {x, y, z, w}
    const yaw = Math.atan2(
      2 * (q.w * q.y + q.x * q.z),
      1 - 2 * (q.y * q.y + q.z * q.z)  // was wrong in comment, using standard formula
    )

    // Forward speed for dust particles
    const chassisFwd = new CANNON.Vec3()
    chassisBody.quaternion.vmult(new CANNON.Vec3(0, 0, 1), chassisFwd)
    const forwardSpeed = chassisBody.velocity.x * chassisFwd.x
                       + chassisBody.velocity.y * chassisFwd.y
                       + chassisBody.velocity.z * chassisFwd.z

    return {
      position: {
        x: chassisBody.position.x,
        y: chassisBody.position.y,
        z: chassisBody.position.z,
      },
      quaternion: {
        x: q.x,
        y: q.y,
        z: q.z,
        w: q.w,
      },
      rotation: yaw,
      velocity: forwardSpeed,
      speed: Math.abs(forwardSpeed),
      steer: currentSteer,
      // Wheel positions for visual sync
      wheels: wheels.map(w => ({
        x: w.body.position.x,
        y: w.body.position.y,
        z: w.body.position.z,
        steered: w.steered,
      })),
    }
  }

  return {
    chassisBody,
    wheels,
    preStep,
    getState,
  }
}

/** Convert a local point to world space using body's position + quaternion */
function _localToWorld(body, lx, ly, lz) {
  const worldPt = new CANNON.Vec3()
  body.quaternion.vmult(new CANNON.Vec3(lx, ly, lz), worldPt)
  worldPt.vadd(body.position, worldPt)
  return worldPt
}

/** Anti-roll bar: equalize vertical displacement between a pair of wheels */
function _applyAntiRoll(chassis, wheelL, wheelR, chassisUp) {
  // Project each wheel's displacement relative to chassis onto chassis up axis
  const dispL = wheelL.position.y - chassis.position.y
  const dispR = wheelR.position.y - chassis.position.y
  const diff = dispL - dispR

  const force = diff * ANTI_ROLL_FORCE

  // Apply opposing vertical forces to each wheel
  wheelL.applyForce(new CANNON.Vec3(0, -force, 0))
  wheelR.applyForce(new CANNON.Vec3(0, force, 0))
}
