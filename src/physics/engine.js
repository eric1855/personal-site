import RAPIER from '@dimforge/rapier3d-compat'

/**
 * Initialise the Rapier WASM module and create a physics world.
 * Gravity is -20 on Y — objects fall realistically, car stays grounded via velocity override.
 */
export async function createPhysicsEngine() {
  await RAPIER.init()

  const world = new RAPIER.World({ x: 0, y: -20, z: 0 })

  return { RAPIER, world }
}
