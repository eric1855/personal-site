/**
 * Cannon-es physics world setup.
 * Gravity, broadphase, solver iterations, and contact materials.
 */
import * as CANNON from 'cannon-es'

export function createPhysicsWorld() {
  const world = new CANNON.World({
    gravity: new CANNON.Vec3(0, -20, 0),
  })

  // SAP broadphase — fast for worlds with many bodies
  world.broadphase = new CANNON.SAPBroadphase(world)

  // Allow sleeping — dynamic bodies that stop moving go to sleep (perf)
  world.allowSleep = true

  // Solver iterations — higher = more accurate stacking
  world.solver.iterations = 10

  // ── Materials ─────────────────────────────────────────────────
  const groundMat    = new CANNON.Material('ground')
  const carMat       = new CANNON.Material('car')
  const objectMat    = new CANNON.Material('object')
  const buildingMat  = new CANNON.Material('building')

  // Car on ground — moderate friction, no bounce
  world.addContactMaterial(new CANNON.ContactMaterial(carMat, groundMat, {
    friction: 0.3,
    restitution: 0.0,
  }))

  // Car hits objects — low friction so things fly, some bounce
  world.addContactMaterial(new CANNON.ContactMaterial(carMat, objectMat, {
    friction: 0.2,
    restitution: 0.4,
  }))

  // Objects on ground — moderate friction so things slide then stop
  world.addContactMaterial(new CANNON.ContactMaterial(objectMat, groundMat, {
    friction: 0.5,
    restitution: 0.3,
  }))

  // Objects on objects — for stacking
  world.addContactMaterial(new CANNON.ContactMaterial(objectMat, objectMat, {
    friction: 0.4,
    restitution: 0.2,
  }))

  // Car hits buildings — no bounce, high friction
  world.addContactMaterial(new CANNON.ContactMaterial(carMat, buildingMat, {
    friction: 0.8,
    restitution: 0.0,
  }))

  // Objects hit buildings
  world.addContactMaterial(new CANNON.ContactMaterial(objectMat, buildingMat, {
    friction: 0.4,
    restitution: 0.3,
  }))

  return { world, materials: { groundMat, carMat, objectMat, buildingMat } }
}
