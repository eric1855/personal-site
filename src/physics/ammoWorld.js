/**
 * ammoWorld.js — Ammo.js (Bullet) physics world setup + helpers
 *
 * Exports an async init function that returns the physics world,
 * plus helpers for creating rigid bodies and the vehicle.
 */
import Ammo from 'ammo.js'

// Module-level Ammo reference (set after init)
let A = null

/** Temp Bullet math objects — allocated once, reused every frame */
let tmpBtV3 = null
let tmpBtQ  = null
let tmpBtT  = null

/**
 * Initialize the Ammo / Bullet physics world.
 * Must be called (and awaited) before anything else.
 */
export async function initAmmoWorld() {
  // ammo.js npm package (0.0.10) exports the initialized module directly
  // In Vite's CJS interop, it arrives as the module object itself
  A = Ammo

  // If Ammo has a then (promise-like init), await it
  if (typeof A === 'function') {
    A = await A()
  } else if (A && typeof A.then === 'function') {
    A = await A
  }

  // Verify it loaded
  if (!A || typeof A.btVector3 !== 'function') {
    throw new Error('Ammo.js failed to initialize')
  }

  // Allocate reusable temp objects
  tmpBtV3 = new A.btVector3(0, 0, 0)
  tmpBtQ  = new A.btQuaternion(0, 0, 0, 1)
  tmpBtT  = new A.btTransform()

  // --- Build the Bullet dynamics world ---
  const collisionConfiguration = new A.btDefaultCollisionConfiguration()
  const dispatcher             = new A.btCollisionDispatcher(collisionConfiguration)
  const broadphase             = new A.btDbvtBroadphase()
  const solver                 = new A.btSequentialImpulseConstraintSolver()

  const world = new A.btDiscreteDynamicsWorld(dispatcher, broadphase, solver, collisionConfiguration)

  tmpBtV3.setValue(0, -9.81, 0)
  world.setGravity(tmpBtV3)

  return { world, Ammo: A }
}

/**
 * Get the Ammo module reference (after init).
 */
export function getAmmo() {
  return A
}

// ── Helper: create a static rigid body (mass = 0) ─────────────────────────────
export function createStaticBody(world, shape, position, quaternion) {
  tmpBtT.setIdentity()
  tmpBtV3.setValue(position.x, position.y, position.z)
  tmpBtT.setOrigin(tmpBtV3)

  if (quaternion) {
    tmpBtQ.setValue(quaternion.x, quaternion.y, quaternion.z, quaternion.w)
    tmpBtT.setRotation(tmpBtQ)
  }

  const motionState = new A.btDefaultMotionState(tmpBtT)
  tmpBtV3.setValue(0, 0, 0)
  const rbInfo = new A.btRigidBodyConstructionInfo(0, motionState, shape, tmpBtV3)
  const body = new A.btRigidBody(rbInfo)

  world.addRigidBody(body)

  // Clean up construction info (body keeps its own references)
  A.destroy(rbInfo)

  return body
}

// ── Helper: create a dynamic rigid body ────────────────────────────────────────
export function createDynamicBody(world, shape, mass, position) {
  tmpBtT.setIdentity()
  tmpBtV3.setValue(position.x, position.y, position.z)
  tmpBtT.setOrigin(tmpBtV3)

  const localInertia = new A.btVector3(0, 0, 0)
  shape.calculateLocalInertia(mass, localInertia)

  const motionState = new A.btDefaultMotionState(tmpBtT)
  const rbInfo = new A.btRigidBodyConstructionInfo(mass, motionState, shape, localInertia)
  const body = new A.btRigidBody(rbInfo)

  world.addRigidBody(body)

  A.destroy(rbInfo)
  A.destroy(localInertia)

  return body
}
