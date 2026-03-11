/**
 * Physics Web Worker — owns the CANNON.World, steps at 60 Hz,
 * posts body transforms back to the main thread.
 *
 * Protocol (postMessage):
 *   Main → Worker:
 *     { type: 'init' }                        — create world + bodies
 *     { type: 'input', keys: {...} }          — current WASD state
 *     { type: 'pause' }                       — stop stepping
 *     { type: 'resume' }                      — resume stepping
 *
 *   Worker → Main:
 *     { type: 'ready' }                       — world created, simulation will start
 *     { type: 'frame', bodies: [...] }        — per-step body transforms
 */

import * as CANNON from 'cannon-es'

// ─── Constants ──────────────────────────────────────────────────────────────

const FIXED_DT = 1 / 60
const MAX_SUB_STEPS = 3

// Car tuning
const CAR_MASS = 80
const CAR_HALF_W = 0.5    // half-width
const CAR_HALF_H = 0.19   // half-height (0.38 / 2)
const CAR_HALF_D = 0.95   // half-depth  (1.9 / 2)
const GROUND_Y = 0.3      // visual ground offset

const DRIVE_FORCE = 320
const BRAKE_FORCE = 600
const REVERSE_FORCE = 120
const MAX_SPEED = 12
const MAX_REV_SPEED = 4
const STEER_LERP = 0.18
const MAX_STEER = 0.48
const LINEAR_DAMPING = 0.35
const ANGULAR_DAMPING = 0.98

// World boundary
const WORLD_BOUND = 140

// ─── State ──────────────────────────────────────────────────────────────────

let world = null
let carBody = null
let currentKeys = { forward: false, backward: false, left: false, right: false }
let steer = 0
let paused = false
let running = false

// Body registry: array of { id, body, isStatic }
const bodyRegistry = []

// ─── Message handler ────────────────────────────────────────────────────────

self.onmessage = (e) => {
  const msg = e.data
  switch (msg.type) {
    case 'init':
      _initWorld()
      self.postMessage({ type: 'ready' })
      if (!running) {
        running = true
        _loop()
      }
      break
    case 'input':
      currentKeys = msg.keys
      break
    case 'pause':
      paused = true
      break
    case 'resume':
      paused = false
      break
  }
}

// ─── World setup ────────────────────────────────────────────────────────────

function _initWorld() {
  world = new CANNON.World({
    gravity: new CANNON.Vec3(0, -20, 0),
  })

  // Better broadphase
  world.broadphase = new CANNON.SAPBroadphase(world)
  world.allowSleep = true

  // Materials
  const groundMat = new CANNON.Material('ground')
  const carMat = new CANNON.Material('car')
  const wallMat = new CANNON.Material('wall')

  world.addContactMaterial(new CANNON.ContactMaterial(groundMat, carMat, {
    friction: 0.5,
    restitution: 0.05,
  }))
  world.addContactMaterial(new CANNON.ContactMaterial(carMat, wallMat, {
    friction: 0.3,
    restitution: 0.2,
  }))

  // ── Ground plane ──────────────────────────────────────────────────────
  const groundBody = new CANNON.Body({
    type: CANNON.Body.STATIC,
    shape: new CANNON.Plane(),
    material: groundMat,
  })
  groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0)
  world.addBody(groundBody)

  // ── Car body ──────────────────────────────────────────────────────────
  carBody = new CANNON.Body({
    mass: CAR_MASS,
    shape: new CANNON.Box(new CANNON.Vec3(CAR_HALF_W, CAR_HALF_H, CAR_HALF_D)),
    position: new CANNON.Vec3(0, GROUND_Y, 0),
    material: carMat,
    linearDamping: LINEAR_DAMPING,
    angularDamping: ANGULAR_DAMPING,
    fixedRotation: false,
  })
  // Lock rotation to Y-axis only (no tipping)
  carBody.angularFactor = new CANNON.Vec3(0, 1, 0)
  world.addBody(carBody)
  bodyRegistry.push({ id: 'car', body: carBody, isStatic: false })

  // ── Buildings (static boxes) ──────────────────────────────────────────
  const buildings = [
    { id: 'about',    cx: 0,   cz: -20, w: 4.0, h: 5.0, d: 3.0 },
    { id: 'projects', cx: 20,  cz: 0,   w: 5.5, h: 3.5, d: 3.5 },
    { id: 'contact',  cx: 0,   cz: 20,  w: 4.0, h: 4.0, d: 3.5 },
    { id: 'blog',     cx: -20, cz: 0,   w: 3.5, h: 6.0, d: 3.0 },
  ]
  for (const b of buildings) {
    const body = new CANNON.Body({
      type: CANNON.Body.STATIC,
      shape: new CANNON.Box(new CANNON.Vec3(b.w / 2, b.h / 2, b.d / 2)),
      position: new CANNON.Vec3(b.cx, b.h / 2, b.cz),
      material: wallMat,
    })
    world.addBody(body)
    bodyRegistry.push({ id: b.id, body, isStatic: true })
  }

  // ── Trees (static cylinders) ──────────────────────────────────────────
  const treePositions = [
    [-15, -20], [20, -15], [-25, 10], [18, 25],
    [-10, 30],  [30, 5],  [-35, -5], [12, -30],
    [-20, -40], [35, -25], [-40, 20], [25, 40],
    [-8, -15],  [14, 8],  [-18, 18], [28, -10],
    [-30, 35],  [40, 15], [-45, -15], [22, -45],
    [-12, 45],  [38, -40], [-50, 8],  [16, 50],
    [-22, -52], [44, 28], [-38, -30], [10, -48],
  ]
  for (let i = 0; i < treePositions.length; i++) {
    const [x, z] = treePositions[i]
    const scale = 0.8 + Math.sin(i * 7.3) * 0.4
    const trunkR = 0.2 * scale
    const trunkH = 1.6 * scale
    const body = new CANNON.Body({
      type: CANNON.Body.STATIC,
      shape: new CANNON.Cylinder(trunkR, trunkR, trunkH, 6),
      position: new CANNON.Vec3(x, trunkH / 2, z),
      material: wallMat,
    })
    world.addBody(body)
    bodyRegistry.push({ id: `tree_${i}`, body, isStatic: true })
  }

  // ── World boundary walls ──────────────────────────────────────────────
  const wallThickness = 2
  const wallHeight = 10
  const wallDefs = [
    // north wall (positive Z)
    { cx: 0, cz: WORLD_BOUND + wallThickness / 2, w: WORLD_BOUND * 2 + wallThickness * 2, d: wallThickness },
    // south wall
    { cx: 0, cz: -(WORLD_BOUND + wallThickness / 2), w: WORLD_BOUND * 2 + wallThickness * 2, d: wallThickness },
    // east wall (positive X)
    { cx: WORLD_BOUND + wallThickness / 2, cz: 0, w: wallThickness, d: WORLD_BOUND * 2 + wallThickness * 2 },
    // west wall
    { cx: -(WORLD_BOUND + wallThickness / 2), cz: 0, w: wallThickness, d: WORLD_BOUND * 2 + wallThickness * 2 },
  ]
  for (const wd of wallDefs) {
    const body = new CANNON.Body({
      type: CANNON.Body.STATIC,
      shape: new CANNON.Box(new CANNON.Vec3(wd.w / 2, wallHeight / 2, wd.d / 2)),
      position: new CANNON.Vec3(wd.cx, wallHeight / 2, wd.cz),
      material: wallMat,
    })
    world.addBody(body)
  }
}

// ─── Simulation loop ────────────────────────────────────────────────────────

let lastTime = performance.now()

function _loop() {
  const now = performance.now()
  const dt = Math.min((now - lastTime) / 1000, 0.05)
  lastTime = now

  if (!paused && world) {
    _applyCarForces()
    world.step(FIXED_DT, dt, MAX_SUB_STEPS)
    _enforceCarConstraints()
    _postTransforms()
  }

  // Use setTimeout to run at ~60Hz without blocking
  setTimeout(_loop, 1000 / 60)
}

// ─── Car driving logic ─────────────────────────────────────────────────────

function _applyCarForces() {
  if (!carBody) return

  const { forward, backward, left, right } = currentKeys

  // Get car's forward direction from its quaternion
  const quat = carBody.quaternion
  // Forward is local -Z in cannon-es (but we use +Z as forward in our convention)
  // The car faces along its local +Z axis
  const fwdX = 2 * (quat.x * quat.z + quat.w * quat.y)
  const fwdZ = 1 - 2 * (quat.x * quat.x + quat.y * quat.y)
  // Normalize
  const fwdLen = Math.sqrt(fwdX * fwdX + fwdZ * fwdZ)
  const nfX = fwdX / fwdLen
  const nfZ = fwdZ / fwdLen

  // Current speed along forward direction
  const vel = carBody.velocity
  const forwardSpeed = vel.x * nfX + vel.z * nfZ

  // Steering
  const targetSteer = left ? MAX_STEER : right ? -MAX_STEER : 0
  steer += (targetSteer - steer) * STEER_LERP

  // Apply steering torque proportional to speed
  const speedRatio = Math.abs(forwardSpeed) / MAX_SPEED
  const turnCurve = speedRatio * (1 - speedRatio * 0.6) * 2.2
  const torqueY = steer * Math.sign(forwardSpeed || 1) * turnCurve * 80

  if (Math.abs(forwardSpeed) > 0.3) {
    carBody.torque.set(0, torqueY, 0)
  } else {
    carBody.torque.set(0, 0, 0)
  }

  // Drive forces
  if (forward) {
    if (forwardSpeed < MAX_SPEED) {
      const t = forwardSpeed / MAX_SPEED
      const accelMult = 1 - Math.max(0, t) * 0.5
      carBody.applyForce(
        new CANNON.Vec3(nfX * DRIVE_FORCE * accelMult, 0, nfZ * DRIVE_FORCE * accelMult),
        carBody.position
      )
    }
  } else if (backward) {
    if (forwardSpeed > 0.5) {
      // Braking
      carBody.applyForce(
        new CANNON.Vec3(-nfX * BRAKE_FORCE, 0, -nfZ * BRAKE_FORCE),
        carBody.position
      )
    } else {
      // Reversing
      if (forwardSpeed > -MAX_REV_SPEED) {
        carBody.applyForce(
          new CANNON.Vec3(-nfX * REVERSE_FORCE, 0, -nfZ * REVERSE_FORCE),
          carBody.position
        )
      }
    }
  } else {
    // Natural slowdown — additional friction when no input
    if (Math.abs(forwardSpeed) > 0.1) {
      const brakeFactor = 0.15
      carBody.applyForce(
        new CANNON.Vec3(-vel.x * CAR_MASS * brakeFactor, 0, -vel.z * CAR_MASS * brakeFactor),
        carBody.position
      )
    } else if (Math.abs(forwardSpeed) < 0.5) {
      // Bring to a stop
      vel.x *= 0.92
      vel.z *= 0.92
    }
  }

  // Lateral friction — resist sideways sliding for car-like feel
  const rightX = 2 * (quat.x * quat.y - quat.w * quat.z)
  const rightZ = 2 * (quat.y * quat.z + quat.w * quat.x)
  // Hmm, let's compute right vector properly
  // Right is local +X: rotate (1,0,0) by quaternion
  const rx = 1 - 2 * (quat.y * quat.y + quat.z * quat.z)
  const rz = 2 * (quat.x * quat.z - quat.w * quat.y)
  const rLen = Math.sqrt(rx * rx + rz * rz)
  const nrX = rx / rLen
  const nrZ = rz / rLen

  const lateralSpeed = vel.x * nrX + vel.z * nrZ
  const lateralFriction = 0.9
  carBody.applyForce(
    new CANNON.Vec3(-nrX * lateralSpeed * CAR_MASS * lateralFriction, 0, -nrZ * lateralSpeed * CAR_MASS * lateralFriction),
    carBody.position
  )
}

function _enforceCarConstraints() {
  if (!carBody) return

  // Keep car at ground level — prevent sinking or flying
  if (carBody.position.y < GROUND_Y) {
    carBody.position.y = GROUND_Y
    if (carBody.velocity.y < 0) carBody.velocity.y = 0
  }
  // Prevent excessive bounce
  if (carBody.position.y > GROUND_Y + 0.5) {
    carBody.position.y = GROUND_Y + 0.5
    if (carBody.velocity.y > 0) carBody.velocity.y = 0
  }

  // Lock pitch and roll — only Y rotation
  // Extract Y rotation (heading) from quaternion and reconstruct
  const q = carBody.quaternion
  const heading = Math.atan2(
    2 * (q.w * q.y + q.x * q.z),
    1 - 2 * (q.y * q.y + q.z * q.z)
  )
  carBody.quaternion.setFromEuler(0, heading, 0)
}

// ─── Post transforms to main thread ────────────────────────────────────────

function _postTransforms() {
  // Only send the car body (dynamic) — static bodies don't move
  const p = carBody.position
  const q = carBody.quaternion
  const v = carBody.velocity

  // Extract heading from quaternion
  const heading = Math.atan2(
    2 * (q.w * q.y + q.x * q.z),
    1 - 2 * (q.y * q.y + q.z * q.z)
  )

  // Forward speed along heading
  const fwdX = Math.sin(heading)
  const fwdZ = Math.cos(heading)
  const forwardSpeed = v.x * fwdX + v.z * fwdZ

  self.postMessage({
    type: 'frame',
    car: {
      px: p.x, py: p.y, pz: p.z,
      qx: q.x, qy: q.y, qz: q.z, qw: q.w,
      heading,
      speed: Math.abs(forwardSpeed),
      forwardSpeed,
      steer,
    }
  })
}
