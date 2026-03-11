/**
 * Collider registry — AABB colliders for buildings, circle colliders for trees.
 *
 * AABB: { type: 'aabb', cx, cz, hw, hd }  (center-x, center-z, half-width, half-depth)
 * Circle: { type: 'circle', cx, cz, r }    (center-x, center-z, radius)
 */

export function createColliderWorld() {
  const colliders = []

  // ── Buildings (AABB) ─────────────────────────────────────────
  // Data from LOCATION_DEFS in locations.js
  const buildings = [
    { cx: 0,   cz: -20, hw: 4.0 / 2, hd: 3.0 / 2 },  // about
    { cx: 20,  cz: 0,   hw: 5.5 / 2, hd: 3.5 / 2 },  // projects
    { cx: 0,   cz: 20,  hw: 4.0 / 2, hd: 3.5 / 2 },  // contact
    { cx: -20, cz: 0,   hw: 3.5 / 2, hd: 3.0 / 2 },  // blog
  ]
  for (const b of buildings) {
    colliders.push({ type: 'aabb', cx: b.cx, cz: b.cz, hw: b.hw, hd: b.hd })
  }

  // ── Trees (Circle) ──────────────────────────────────────────
  // 28 tree positions from worldObjects.js, each with collision radius ~0.8
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
    colliders.push({ type: 'circle', cx: x, cz: z, r: 0.8 })
  }

  return { colliders }
}
