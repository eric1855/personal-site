/**
 * Rapier colliders for car and portfolio buildings only.
 * Ground, vegetation, boundary walls, and decorations are created by each world module.
 */

import { GROUND_Y } from './carPhysics.js'

// Car half-extents matching visual mesh: BoxGeometry(1, 0.38, 1.9)
const CAR_HX = 0.5
const CAR_HY = 0.19
const CAR_HZ = 0.95

export function createColliderWorld(RAPIER, world) {
  // ── Car — Dynamic body (velocity driven from kinematic math) ────
  const carBodyDesc = RAPIER.RigidBodyDesc.dynamic()
    .setTranslation(0, GROUND_Y, 0)
    .setLinearDamping(0.0)
    .setAngularDamping(0.0)
    .lockRotations()
  const carBody = world.createRigidBody(carBodyDesc)

  const carColliderDesc = RAPIER.ColliderDesc.cuboid(CAR_HX, CAR_HY, CAR_HZ)
    .setDensity(20.0)
    .setFriction(0.3)
    .setRestitution(0.0)
    .setActiveEvents(RAPIER.ActiveEvents.COLLISION_EVENTS)
  const carCollider = world.createCollider(carColliderDesc, carBody)

  // ── Buildings — Fixed (static) cuboids ───────────────────────
  const buildings = [
    { cx: 0,   cz: -20, hw: 4.0 / 2, hh: 5.0 / 2, hd: 3.0 / 2 },  // about
    { cx: 20,  cz: 0,   hw: 5.5 / 2, hh: 3.5 / 2, hd: 3.5 / 2 },  // projects
    { cx: 0,   cz: 20,  hw: 4.0 / 2, hh: 4.0 / 2, hd: 3.5 / 2 },  // contact
    { cx: -20, cz: 0,   hw: 3.5 / 2, hh: 6.0 / 2, hd: 3.0 / 2 },  // experience
  ]

  for (const b of buildings) {
    const bodyDesc = RAPIER.RigidBodyDesc.fixed()
      .setTranslation(b.cx, b.hh, b.cz)
    const body = world.createRigidBody(bodyDesc)
    const colDesc = RAPIER.ColliderDesc.cuboid(b.hw, b.hh, b.hd)
      .setFriction(0.8)
      .setRestitution(0.0)
    world.createCollider(colDesc, body)
  }

  return { carBody, carCollider }
}
