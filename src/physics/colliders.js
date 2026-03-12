/**
 * Rapier-based collider world.
 *
 * Creates rigid-bodies + colliders for:
 *   - Car (Dynamic body — velocity set from kinematic math each frame)
 *   - Buildings (Fixed cuboids)
 *   - Trees (Dynamic bodies — can be knocked over)
 *   - Ground plane (Fixed cuboid)
 *   - World boundary walls (Fixed cuboids)
 *
 * The car is now a Dynamic body so Rapier's solver handles pushing objects.
 * Velocity is set directly each frame from the kinematic math (hybrid approach).
 */

import { GROUND_Y } from './carPhysics.js'

// Car half-extents matching visual mesh: BoxGeometry(1, 0.38, 1.9)
const CAR_HX = 0.5
const CAR_HY = 0.19
const CAR_HZ = 0.95

// World boundary (invisible walls)
const WORLD_BOUND = 140
const WALL_THICKNESS = 2
const WALL_HEIGHT = 10

export function createColliderWorld(RAPIER, world) {
  // ── Ground — Fixed flat cuboid ──────────────────────────────────
  const groundDesc = RAPIER.RigidBodyDesc.fixed()
    .setTranslation(0, -0.5, 0)
  const groundBody = world.createRigidBody(groundDesc)
  const groundColDesc = RAPIER.ColliderDesc.cuboid(200, 0.5, 200)
    .setFriction(0.5)
    .setRestitution(0.0)
  world.createCollider(groundColDesc, groundBody)

  // ── Car — Dynamic body (velocity driven from kinematic math) ────
  const carBodyDesc = RAPIER.RigidBodyDesc.dynamic()
    .setTranslation(0, GROUND_Y, 0)
    .setLinearDamping(0.0)
    .setAngularDamping(0.0)
    // Lock all rotations — car heading is set via kinematic math
    .lockRotations()
  const carBody = world.createRigidBody(carBodyDesc)

  // Set car mass via density. Cuboid volume = 2*hx * 2*hy * 2*hz
  // We want ~15 mass. density = mass / volume = 15 / (1 * 0.38 * 1.9) ~ 20.8
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
    { cx: -20, cz: 0,   hw: 3.5 / 2, hh: 6.0 / 2, hd: 3.0 / 2 },  // blog
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

  // ── Trees — Dynamic bodies (can be knocked over) ──────────────
  const treePositions = [
    [-15, -20], [20, -15], [-25, 10], [18, 25],
    [-10, 30],  [30, 5],  [-35, -5], [12, -30],
    [-20, -40], [35, -25], [-40, 20], [25, 40],
    [-8, -15],  [14, 8],  [-18, 18], [28, -10],
    [-30, 35],  [40, 15], [-45, -15], [22, -45],
    [-12, 45],  [38, -40], [-50, 8],  [16, 50],
    [-22, -52], [44, 28], [-38, -30], [10, -48],
  ]

  const treeBodies = []

  for (let i = 0; i < treePositions.length; i++) {
    const [x, z] = treePositions[i]
    const scale = 0.8 + Math.sin(i * 7.3) * 0.4

    // Tree trunk + foliage approximated as a cylinder
    // Trunk height ~1.6*scale, foliage adds more. Total ~4*scale
    const totalHeight = 4.0 * scale
    const halfH = totalHeight / 2
    const radius = 0.5 * scale

    const bodyDesc = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(x, halfH, z)
      .setLinearDamping(0.3)
      .setAngularDamping(0.4)
    const body = world.createRigidBody(bodyDesc)

    const colDesc = RAPIER.ColliderDesc.cylinder(halfH, radius)
      .setDensity(2.5)  // gives reasonable mass ~8 for average tree
      .setFriction(0.5)
      .setRestitution(0.1)
    world.createCollider(colDesc, body)

    treeBodies.push({ body, scale })
  }

  // ── World boundary walls ─────────────────────────────────────
  const wallDefs = [
    { x: WORLD_BOUND + WALL_THICKNESS, z: 0,
      hx: WALL_THICKNESS, hz: WORLD_BOUND + WALL_THICKNESS * 2 },
    { x: -(WORLD_BOUND + WALL_THICKNESS), z: 0,
      hx: WALL_THICKNESS, hz: WORLD_BOUND + WALL_THICKNESS * 2 },
    { x: 0, z: WORLD_BOUND + WALL_THICKNESS,
      hx: WORLD_BOUND + WALL_THICKNESS * 2, hz: WALL_THICKNESS },
    { x: 0, z: -(WORLD_BOUND + WALL_THICKNESS),
      hx: WORLD_BOUND + WALL_THICKNESS * 2, hz: WALL_THICKNESS },
  ]
  for (const w of wallDefs) {
    const bodyDesc = RAPIER.RigidBodyDesc.fixed()
      .setTranslation(w.x, WALL_HEIGHT / 2, w.z)
    const body = world.createRigidBody(bodyDesc)
    const colDesc = RAPIER.ColliderDesc.cuboid(w.hx, WALL_HEIGHT / 2, w.hz)
    world.createCollider(colDesc, body)
  }

  return { carBody, carCollider, treeBodies }
}
