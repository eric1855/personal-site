import { World } from 'oimo'

/**
 * Create the Oimo physics world.
 * Synchronous — no WASM init needed (pure JS).
 */
export function createPhysicsEngine() {
  const world = new World({
    timestep: 1 / 60,
    iterations: 8,
    gravity: [0, -20, 0],
    broadphase: 2, // SAP broadphase
    worldscale: 1,
  })

  function step() {
    world.step()
  }

  return { world, step }
}
