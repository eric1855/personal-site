/**
 * Collider registry — AABB colliders for buildings, circle colliders for trees.
 * No physics engine; pure math collision shapes.
 */

/**
 * @typedef {{ type: 'aabb', cx: number, cz: number, hw: number, hd: number }} AABBCollider
 * @typedef {{ type: 'circle', cx: number, cz: number, r: number }}            CircleCollider
 * @typedef {AABBCollider | CircleCollider}                                     Collider
 */

const BUILDING_DEFS = [
  { id: 'about',    x:   0, z: -20, w: 4.0, d: 3.0 },
  { id: 'projects', x:  20, z:   0, w: 5.5, d: 3.5 },
  { id: 'contact',  x:   0, z:  20, w: 4.0, d: 3.5 },
  { id: 'blog',     x: -20, z:   0, w: 3.5, d: 3.0 },
]

// Matching worldObjects.js — 28 tree positions, same scale formula
const TREE_POSITIONS = [
  [-15, -20], [20, -15], [-25, 10], [18, 25],
  [-10, 30],  [30, 5],  [-35, -5], [12, -30],
  [-20, -40], [35, -25], [-40, 20], [25, 40],
  [-8, -15],  [14, 8],  [-18, 18], [28, -10],
  [-30, 35],  [40, 15], [-45, -15], [22, -45],
  [-12, 45],  [38, -40], [-50, 8],  [16, 50],
  [-22, -52], [44, 28], [-38, -30], [10, -48],
]

const TREE_COLLISION_RADIUS = 0.8

// Padding added to building half-extents so the car doesn't clip into the mesh
const BUILDING_PADDING = 0.3

/**
 * Build the full list of colliders for the world.
 * @returns {Collider[]}
 */
export function createColliderWorld() {
  /** @type {Collider[]} */
  const colliders = []

  // Buildings → AABB
  for (const b of BUILDING_DEFS) {
    colliders.push({
      type: 'aabb',
      cx:   b.x,
      cz:   b.z,
      hw:   b.w / 2 + BUILDING_PADDING,
      hd:   b.d / 2 + BUILDING_PADDING,
    })
  }

  // Trees → circle
  TREE_POSITIONS.forEach(([x, z], i) => {
    const scale = 0.8 + Math.sin(i * 7.3) * 0.4
    colliders.push({
      type: 'circle',
      cx:   x,
      cz:   z,
      r:    TREE_COLLISION_RADIUS * scale,
    })
  })

  return colliders
}
