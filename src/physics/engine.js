import RAPIER from '@dimforge/rapier3d-compat'

/**
 * Rapier WASM physics engine — singleton world.
 * Must be awaited before any other physics code runs.
 */
export async function createPhysicsEngine() {
  await RAPIER.init()

  const world = new RAPIER.World({ x: 0, y: -20, z: 0 })

  function step() {
    world.step()
  }

  return { RAPIER, world, step }
}
