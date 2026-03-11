/**
 * cannon-es world setup.
 * Creates the CANNON.World with gravity and default solver settings.
 */
import * as CANNON from 'cannon-es'

export function createCannonWorld() {
  const world = new CANNON.World()
  world.gravity.set(0, -9.82, 0)

  // Broadphase — SAPBroadphase is faster for mostly-static scenes
  world.broadphase = new CANNON.SAPBroadphase(world)

  // Allow sleeping for static bodies to improve performance
  world.allowSleep = true

  // Solver iterations for stable stacking / spring contacts
  world.solver.iterations = 10
  world.solver.tolerance = 0.001

  // Default contact material — moderate friction, low restitution
  const defaultMaterial = new CANNON.Material('default')
  const defaultContact = new CANNON.ContactMaterial(defaultMaterial, defaultMaterial, {
    friction: 0.4,
    restitution: 0.1,
  })
  world.addContactMaterial(defaultContact)
  world.defaultContactMaterial = defaultContact

  return { world, defaultMaterial }
}
