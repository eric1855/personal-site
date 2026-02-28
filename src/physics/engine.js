import RAPIER from '@dimforge/rapier3d-compat'

export async function createPhysicsEngine() {
  // WASM must be initialized before any RAPIER objects are created
  await RAPIER.init()

  // Gravity matches Scene.tsx: gravity={[0, -20, 0]}
  const world = new RAPIER.World({ x: 0, y: -20, z: 0 })

  function step() {
    world.step()
  }

  return { RAPIER, world, step }
}
