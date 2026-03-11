/**
 * Rapier physics world — initializes WASM, creates world, and provides
 * helpers to create static colliders for buildings, trees, ground, and walls.
 */
import RAPIER from '@dimforge/rapier3d-compat'

export async function createRapierWorld() {
  await RAPIER.init()

  const world = new RAPIER.World({ x: 0, y: -30, z: 0 })

  function step() {
    world.step()
  }

  // ── Static collider helpers ──────────────────────────────────────

  /** Ground plane — large flat cuboid at y = -0.5 (top surface at y = 0) */
  function addGround() {
    const bodyDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(0, -0.5, 0)
    const body = world.createRigidBody(bodyDesc)
    const colliderDesc = RAPIER.ColliderDesc.cuboid(150, 0.5, 150)
      .setRestitution(0.0)
      .setFriction(0.8)
    world.createCollider(colliderDesc, body)
  }

  /** Building — axis-aligned box collider */
  function addBuilding(x, z, halfW, halfH, halfD, bodyY) {
    const bodyDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(x, bodyY, z)
    const body = world.createRigidBody(bodyDesc)
    const colliderDesc = RAPIER.ColliderDesc.cuboid(halfW, halfH, halfD)
      .setRestitution(0.2)
      .setFriction(0.5)
    world.createCollider(colliderDesc, body)
  }

  /** Tree — cylinder collider (approximated as cuboid for simplicity with Rapier) */
  function addTree(x, z, radius) {
    // Use a cylinder collider: half-height 2.0 covers trunk + lower foliage
    const bodyDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(x, 2.0, z)
    const body = world.createRigidBody(bodyDesc)
    const colliderDesc = RAPIER.ColliderDesc.cylinder(2.0, radius)
      .setRestitution(0.1)
      .setFriction(0.5)
    world.createCollider(colliderDesc, body)
  }

  /** World boundary walls at |x|=140, |z|=140 */
  function addBoundaryWalls() {
    const wallThickness = 1
    const wallHeight = 5
    const wallLength = 140

    // +X wall
    _addWall(wallLength + wallThickness, wallHeight / 2, 0, wallThickness, wallHeight / 2, wallLength + wallThickness)
    // -X wall
    _addWall(-(wallLength + wallThickness), wallHeight / 2, 0, wallThickness, wallHeight / 2, wallLength + wallThickness)
    // +Z wall
    _addWall(0, wallHeight / 2, wallLength + wallThickness, wallLength + wallThickness, wallHeight / 2, wallThickness)
    // -Z wall
    _addWall(0, wallHeight / 2, -(wallLength + wallThickness), wallLength + wallThickness, wallHeight / 2, wallThickness)
  }

  function _addWall(x, y, z, hw, hh, hd) {
    const bodyDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(x, y, z)
    const body = world.createRigidBody(bodyDesc)
    const colliderDesc = RAPIER.ColliderDesc.cuboid(hw, hh, hd)
      .setRestitution(0.1)
      .setFriction(0.5)
    world.createCollider(colliderDesc, body)
  }

  return { RAPIER, world, step, addGround, addBuilding, addTree, addBoundaryWalls }
}
