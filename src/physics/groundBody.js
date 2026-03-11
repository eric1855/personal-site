/**
 * Ground plane body for cannon-es.
 * Creates a static infinite plane at y=0 facing up.
 */
import * as CANNON from 'cannon-es'

export function createGroundBody(world, material) {
  const groundBody = new CANNON.Body({
    type: CANNON.Body.STATIC,
    shape: new CANNON.Plane(),
    material,
  })
  // Rotate plane to face upward (default Plane is in XZ facing +Y already,
  // but CANNON.Plane faces +Z by default, so rotate -90 deg around X)
  groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0)
  world.addBody(groundBody)

  return { groundBody }
}
