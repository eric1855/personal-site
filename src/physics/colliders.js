/**
 * Rapier-based collider world.
 *
 * Creates static Rapier rigid-bodies + colliders for buildings (cuboids) and trees (cylinders).
 * Also creates the car kinematic body + cuboid collider.
 *
 * IMPORTANT: All colliders share the same Y center and half-height so Rapier always
 * produces XZ contact normals (never vertical). This is effectively 2D collision
 * on a flat plane — the car never leaves the ground.
 *
 * The car collider half-extents in XZ match the body mesh: BoxGeometry(1, 0.38, 1.9)
 *   → half-extents X=0.5, Z=0.95
 */

import { GROUND_Y } from './carPhysics.js'

// Shared Y parameters — everything at the same height so contacts are XZ only.
// COLLIDER_HY is deliberately large so Y overlap always exceeds any XZ overlap,
// ensuring Rapier's SAT always produces XZ normals (never vertical push).
const COLLIDER_Y = GROUND_Y   // center Y for all colliders
const COLLIDER_HY = 50        // large half-height → Y is never the min-penetration axis

// Car half-extents (XZ only — HY is shared)
const CAR_HX = 0.5
const CAR_HZ = 0.95

// World boundary (invisible walls)
const WORLD_BOUND = 140
const WALL_THICKNESS = 2

export function createColliderWorld(RAPIER, world) {
  // ── Car — KinematicPositionBased ─────────────────────────────
  const carBodyDesc = RAPIER.RigidBodyDesc.kinematicPositionBased()
    .setTranslation(0, COLLIDER_Y, 0)
  const carBody = world.createRigidBody(carBodyDesc)

  const carColliderDesc = RAPIER.ColliderDesc.cuboid(CAR_HX, COLLIDER_HY, CAR_HZ)
  carColliderDesc.setActiveEvents(RAPIER.ActiveEvents.COLLISION_EVENTS)
  // By default Rapier skips kinematic-vs-fixed contacts — enable them explicitly
  carColliderDesc.setActiveCollisionTypes(
    RAPIER.ActiveCollisionTypes.DEFAULT | RAPIER.ActiveCollisionTypes.KINEMATIC_FIXED
  )
  const carCollider = world.createCollider(carColliderDesc, carBody)

  // ── Buildings — Fixed (static) cuboids ───────────────────────
  // Half-extents in XZ match the visual mesh; HY is shared
  const buildings = [
    { cx: 0,   cz: -20, hw: 4.0 / 2, hd: 3.0 / 2 },  // about
    { cx: 20,  cz: 0,   hw: 5.5 / 2, hd: 3.5 / 2 },  // projects
    { cx: 0,   cz: 20,  hw: 4.0 / 2, hd: 3.5 / 2 },  // contact
    { cx: -20, cz: 0,   hw: 3.5 / 2, hd: 3.0 / 2 },  // blog
  ]

  for (const b of buildings) {
    const bodyDesc = RAPIER.RigidBodyDesc.fixed()
      .setTranslation(b.cx, COLLIDER_Y, b.cz)
    const body = world.createRigidBody(bodyDesc)
    const colDesc = RAPIER.ColliderDesc.cuboid(b.hw, COLLIDER_HY, b.hd)
    world.createCollider(colDesc, body)
  }

  // ── Trees — Fixed cylinders ──────────────────────────────────
  const treePositions = [
    [-15, -20], [20, -15], [-25, 10], [18, 25],
    [-10, 30],  [30, 5],  [-35, -5], [12, -30],
    [-20, -40], [35, -25], [-40, 20], [25, 40],
    [-8, -15],  [14, 8],  [-18, 18], [28, -10],
    [-30, 35],  [40, 15], [-45, -15], [22, -45],
    [-12, 45],  [38, -40], [-50, 8],  [16, 50],
    [-22, -52], [44, 28], [-38, -30], [10, -48],
  ]

  for (const [x, z] of treePositions) {
    const bodyDesc = RAPIER.RigidBodyDesc.fixed()
      .setTranslation(x, COLLIDER_Y, z)
    const body = world.createRigidBody(bodyDesc)
    // Cylinder: half-height matches shared value, radius 0.5 for trunk
    const colDesc = RAPIER.ColliderDesc.cylinder(COLLIDER_HY, 0.5)
    world.createCollider(colDesc, body)
  }

  // ── World boundary walls ─────────────────────────────────────
  const wallDefs = [
    // +X wall
    { x: WORLD_BOUND + WALL_THICKNESS, z: 0,
      hx: WALL_THICKNESS, hz: WORLD_BOUND + WALL_THICKNESS * 2 },
    // -X wall
    { x: -(WORLD_BOUND + WALL_THICKNESS), z: 0,
      hx: WALL_THICKNESS, hz: WORLD_BOUND + WALL_THICKNESS * 2 },
    // +Z wall
    { x: 0, z: WORLD_BOUND + WALL_THICKNESS,
      hx: WORLD_BOUND + WALL_THICKNESS * 2, hz: WALL_THICKNESS },
    // -Z wall
    { x: 0, z: -(WORLD_BOUND + WALL_THICKNESS),
      hx: WORLD_BOUND + WALL_THICKNESS * 2, hz: WALL_THICKNESS },
  ]
  for (const w of wallDefs) {
    const bodyDesc = RAPIER.RigidBodyDesc.fixed()
      .setTranslation(w.x, COLLIDER_Y, w.z)
    const body = world.createRigidBody(bodyDesc)
    const colDesc = RAPIER.ColliderDesc.cuboid(w.hx, COLLIDER_HY, w.hz)
    world.createCollider(colDesc, body)
  }

  return { carBody, carCollider }
}
