/**
 * Static cannon-es collider bodies for buildings and trees.
 * These are added to the CANNON.World so the car bounces off them.
 */
import * as CANNON from 'cannon-es'

export function createColliders(world) {
  // ── Buildings (box colliders) ─────────────────────────────────
  // Data matches LOCATION_DEFS in locations.js
  const buildings = [
    { x: 0,   z: -20, w: 4.0, h: 5.0, d: 3.0 },  // about
    { x: 20,  z: 0,   w: 5.5, h: 3.5, d: 3.5 },  // projects
    { x: 0,   z: 20,  w: 4.0, h: 4.0, d: 3.5 },  // contact
    { x: -20, z: 0,   w: 3.5, h: 6.0, d: 3.0 },  // blog
  ]

  for (const b of buildings) {
    const body = new CANNON.Body({
      type: CANNON.Body.STATIC,
      shape: new CANNON.Box(new CANNON.Vec3(b.w / 2, b.h / 2, b.d / 2)),
      position: new CANNON.Vec3(b.x, b.h / 2, b.z),
    })
    world.addBody(body)
  }

  // ── Trees (cylinder colliders) ────────────────────────────────
  // 28 tree positions from worldObjects.js — trunk radius ~0.2, height ~5 (scaled)
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
    // Use a cylinder for each tree trunk
    const body = new CANNON.Body({
      type: CANNON.Body.STATIC,
      shape: new CANNON.Cylinder(0.5, 0.5, 4, 6),
      position: new CANNON.Vec3(x, 2, z),
    })
    world.addBody(body)
  }

  // ── World boundary walls ──────────────────────────────────────
  const BOUND = 142
  const WALL_HEIGHT = 10
  const WALL_THICK = 2
  const wallDefs = [
    { x:  BOUND, z: 0, hw: WALL_THICK / 2, hd: BOUND },  // +X
    { x: -BOUND, z: 0, hw: WALL_THICK / 2, hd: BOUND },  // -X
    { x: 0, z:  BOUND, hw: BOUND, hd: WALL_THICK / 2 },  // +Z
    { x: 0, z: -BOUND, hw: BOUND, hd: WALL_THICK / 2 },  // -Z
  ]
  for (const w of wallDefs) {
    const body = new CANNON.Body({
      type: CANNON.Body.STATIC,
      shape: new CANNON.Box(new CANNON.Vec3(w.hw, WALL_HEIGHT / 2, w.hd)),
      position: new CANNON.Vec3(w.x, WALL_HEIGHT / 2, w.z),
    })
    world.addBody(body)
  }
}
