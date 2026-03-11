/**
 * Collider registry — AABB colliders for buildings, circle colliders for trees.
 * All colliders are 2D (top-down, xz-plane).
 */

/**
 * createColliderWorld()
 * Builds a flat list of colliders from building definitions and tree positions.
 *
 * AABB collider:  { type:'aabb', minX, maxX, minZ, maxZ }
 * Circle collider: { type:'circle', x, z, radius }
 */
export function createColliderWorld() {
  const colliders = []

  // --- Buildings (AABB) ---
  // Each building sits at (def.position.x, def.position.z) with bodySize {w, d}.
  const buildings = [
    { x:   0, z: -20, w: 4.0, d: 3.0 },  // about
    { x:  20, z:   0, w: 5.5, d: 3.5 },  // projects
    { x:   0, z:  20, w: 4.0, d: 3.5 },  // contact
    { x: -20, z:   0, w: 3.5, d: 3.0 },  // blog
  ]

  for (const b of buildings) {
    const hw = b.w / 2   // half-width  (x)
    const hd = b.d / 2   // half-depth  (z)
    // Add a small margin (0.15) so the car doesn't clip into the mesh
    colliders.push({
      type: 'aabb',
      minX: b.x - hw - 0.15,
      maxX: b.x + hw + 0.15,
      minZ: b.z - hd - 0.15,
      maxZ: b.z + hd + 0.15,
    })
  }

  // --- Trees (circle) ---
  const treePositions = [
    [-15, 0, -20], [20, 0, -15], [-25, 0, 10], [18, 0, 25],
    [-10, 0, 30],  [30, 0, 5],  [-35, 0, -5], [12, 0, -30],
    [-20, 0, -40], [35, 0, -25], [-40, 0, 20], [25, 0, 40],
    [-8, 0, -15],  [14, 0, 8],  [-18, 0, 18], [28, 0, -10],
    [-30, 0, 35],  [40, 0, 15], [-45, 0, -15], [22, 0, -45],
    [-12, 0, 45],  [38, 0, -40], [-50, 0, 8],  [16, 0, 50],
    [-22, 0, -52], [44, 0, 28], [-38, 0, -30], [10, 0, -48],
  ]

  for (const [x, , z] of treePositions) {
    colliders.push({ type: 'circle', x, z, radius: 0.8 })
  }

  // --- World boundary ---
  // Represented as four "wall" AABBs just outside the playable area (|x|>140 or |z|>140)
  const BOUND = 140
  const THICK = 20
  colliders.push({ type: 'aabb', minX: -BOUND - THICK, maxX:  BOUND + THICK, minZ: -BOUND - THICK, maxZ: -BOUND })  // north wall
  colliders.push({ type: 'aabb', minX: -BOUND - THICK, maxX:  BOUND + THICK, minZ:  BOUND,         maxZ:  BOUND + THICK })  // south wall
  colliders.push({ type: 'aabb', minX: -BOUND - THICK, maxX: -BOUND,         minZ: -BOUND - THICK, maxZ:  BOUND + THICK })  // west wall
  colliders.push({ type: 'aabb', minX:  BOUND,         maxX:  BOUND + THICK, minZ: -BOUND - THICK, maxZ:  BOUND + THICK })  // east wall

  return { colliders }
}
