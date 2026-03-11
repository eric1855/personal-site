import RAPIER from '@dimforge/rapier3d-compat'

/**
 * Initialise the Rapier WASM module and create a physics world.
 * Gravity is zero — the car is kinematic and never falls.
 */
export async function createPhysicsEngine() {
  await RAPIER.init()

  const world = new RAPIER.World({ x: 0, y: 0, z: 0 })

  return { RAPIER, world }
}
