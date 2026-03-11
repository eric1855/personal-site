import * as CANNON from 'cannon-es'

/**
 * Creates and configures the cannon-es physics world.
 * Ground plane, gravity, solver iterations — all set up here.
 */
export function createPhysicsEngine() {
  const world = new CANNON.World({
    gravity: new CANNON.Vec3(0, -20, 0),
  })

  // Broadphase — SAPBroadphase is fastest for mostly-static scenes
  world.broadphase = new CANNON.SAPBroadphase(world)

  // Allow sleeping for static bodies to save CPU
  world.allowSleep = true

  // Solver iterations — more = more accurate stacking / friction
  world.solver.iterations = 10

  // Default contact material (low friction ground)
  world.defaultContactMaterial.friction = 0.3
  world.defaultContactMaterial.restitution = 0.1

  // ── Ground plane ──────────────────────────────────────────────
  const groundBody = new CANNON.Body({
    type: CANNON.Body.STATIC,
    shape: new CANNON.Plane(),
  })
  // Rotate so plane normal points +Y
  groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0)
  world.addBody(groundBody)

  // Contact material: ground ↔ car wheels (high friction for traction)
  const groundMaterial = new CANNON.Material('ground')
  groundBody.material = groundMaterial

  function step(dt) {
    world.step(1 / 60, dt, 3)
  }

  return { world, step, groundMaterial }
}
