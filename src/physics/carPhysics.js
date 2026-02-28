import RAPIER from '@dimforge/rapier3d-compat'

const GROUND_Y = 0.28

export function createCarPhysics(world) {
  // Kinematic position-based rigid body — matches RigidBody type="kinematicPosition"
  const rbDesc = RAPIER.RigidBodyDesc.kinematicPositionBased()
    .setTranslation(0, GROUND_Y, 0)
  const rigidBody = world.createRigidBody(rbDesc)

  // CuboidCollider args={[0.48, 0.28, 0.92]} — half-extents
  const colliderDesc = RAPIER.ColliderDesc.cuboid(0.48, 0.28, 0.92)
  world.createCollider(colliderDesc, rigidBody)

  return { rigidBody }
}
