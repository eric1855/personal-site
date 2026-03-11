import * as CANNON from 'cannon-es'

/**
 * Creates the cannon-es physics world.
 *
 * Returns the world instance and a step function that advances physics
 * by one fixed timestep (called from the game loop accumulator).
 */
export function createPhysicsEngine() {
  const world = new CANNON.World({
    gravity: new CANNON.Vec3(0, -20, 0),
  })

  // Broadphase — SAPBroadphase is efficient for mostly-static worlds
  world.broadphase = new CANNON.SAPBroadphase(world)

  // Allow sleeping for static bodies (performance)
  world.allowSleep = true

  // Default contact material — moderate friction, very low restitution (no bounce)
  const defaultMaterial = new CANNON.Material('default')
  const defaultContact = new CANNON.ContactMaterial(defaultMaterial, defaultMaterial, {
    friction: 0.3,
    restitution: 0.05,
  })
  world.defaultContactMaterial = defaultContact

  // Ground contact material — high friction so the car grips
  const groundMaterial = new CANNON.Material('ground')
  const chassisMaterial = new CANNON.Material('chassis')
  const groundChassisContact = new CANNON.ContactMaterial(groundMaterial, chassisMaterial, {
    friction: 0.5,
    restitution: 0.0,
  })
  world.addContactMaterial(groundChassisContact)

  const FIXED_DT = 1 / 60

  function step() {
    world.step(FIXED_DT)
  }

  return { world, step, groundMaterial, chassisMaterial }
}
