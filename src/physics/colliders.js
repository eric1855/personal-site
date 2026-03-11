/**
 * Collider registry — AABB colliders for buildings, circle colliders for trees,
 * plus world boundary.
 */

// ---------- Collider shapes ----------

/**
 * AABB collider (axis-aligned bounding box) for buildings.
 * center: {x, z}, halfW (half-width on x), halfD (half-depth on z)
 */
function aabb(cx, cz, halfW, halfD) {
  return { type: 'aabb', cx, cz, halfW, halfD }
}

/**
 * Circle collider for trees.
 * center: {x, z}, radius
 */
function circle(cx, cz, r) {
  return { type: 'circle', cx, cz, r }
}

// ---------- Building defs (from locations.js) ----------

const BUILDING_DEFS = [
  { x:   0, z: -20, w: 4.0, d: 3.0 },   // about
  { x:  20, z:   0, w: 5.5, d: 3.5 },   // projects
  { x:   0, z:  20, w: 4.0, d: 3.5 },   // contact
  { x: -20, z:   0, w: 3.5, d: 3.0 },   // blog
]

// ---------- Tree positions (from worldObjects.js) ----------

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

// ---------- World boundary ----------

const WORLD_HALF = 140

// ---------- Factory ----------

export function createColliderWorld() {
  const colliders = []

  // Buildings — AABB with a small padding (0.15) so the car doesn't clip visually
  const PADDING = 0.15
  for (const b of BUILDING_DEFS) {
    colliders.push(aabb(b.x, b.z, b.w / 2 + PADDING, b.d / 2 + PADDING))
  }

  // Trees — circle colliders
  for (const [x, z] of TREE_POSITIONS) {
    colliders.push(circle(x, z, TREE_COLLISION_RADIUS))
  }

  return { colliders, worldHalf: WORLD_HALF }
}
