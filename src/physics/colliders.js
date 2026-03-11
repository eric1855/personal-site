// Collider registry — AABB colliders for buildings, circle colliders for trees
// No physics engine: pure geometric overlap tests

/**
 * AABB collider: axis-aligned bounding box (buildings)
 *   { type: 'aabb', cx, cz, hw, hd }
 *   cx/cz = center,  hw = half-width (x), hd = half-depth (z)
 *
 * Circle collider: (trees, world boundary segments)
 *   { type: 'circle', cx, cz, radius }
 */

const BUILDING_DEFS = [
  { x:   0, z: -20, w: 4.0, d: 3.0 },   // about
  { x:  20, z:   0, w: 5.5, d: 3.5 },   // projects
  { x:   0, z:  20, w: 4.0, d: 3.5 },   // contact
  { x: -20, z:   0, w: 3.5, d: 3.0 },   // blog
]

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
const WORLD_BOUNDARY = 140  // |x| or |z| > 140 → push back

// Padding around buildings so the car can't clip into edges
const BUILDING_PAD = 0.3

export function createColliderWorld() {
  const colliders = []

  // Buildings → AABB colliders (with padding)
  for (const b of BUILDING_DEFS) {
    colliders.push({
      type: 'aabb',
      cx: b.x,
      cz: b.z,
      hw: b.w / 2 + BUILDING_PAD,
      hd: b.d / 2 + BUILDING_PAD,
    })
  }

  // Trees → circle colliders
  for (const [tx, tz] of TREE_POSITIONS) {
    colliders.push({
      type: 'circle',
      cx: tx,
      cz: tz,
      radius: TREE_COLLISION_RADIUS,
    })
  }

  return { colliders, boundary: WORLD_BOUNDARY }
}
