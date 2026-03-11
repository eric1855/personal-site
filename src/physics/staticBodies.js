/**
 * Static cannon-es bodies for buildings and trees.
 * Buildings = Box shapes, Trees = Cylinder shapes.
 */
import * as CANNON from 'cannon-es'

// Building definitions (matching locations.js)
const BUILDING_DEFS = [
  { cx: 0,   cz: -20, w: 4.0, h: 5.0, d: 3.0 },  // about
  { cx: 20,  cz: 0,   w: 5.5, h: 3.5, d: 3.5 },  // projects
  { cx: 0,   cz: 20,  w: 4.0, h: 4.0, d: 3.5 },  // contact
  { cx: -20, cz: 0,   w: 3.5, h: 6.0, d: 3.0 },  // blog
]

// Tree positions (matching worldObjects.js)
const TREE_POSITIONS = [
  [-15, -20], [20, -15], [-25, 10], [18, 25],
  [-10, 30],  [30, 5],  [-35, -5], [12, -30],
  [-20, -40], [35, -25], [-40, 20], [25, 40],
  [-8, -15],  [14, 8],  [-18, 18], [28, -10],
  [-30, 35],  [40, 15], [-45, -15], [22, -45],
  [-12, 45],  [38, -40], [-50, 8],  [16, 50],
  [-22, -52], [44, 28], [-38, -30], [10, -48],
]

export function createStaticBodies(world, material) {
  // ── Buildings ──────────────────────────────────────────────
  for (const b of BUILDING_DEFS) {
    const body = new CANNON.Body({
      type: CANNON.Body.STATIC,
      shape: new CANNON.Box(new CANNON.Vec3(b.w / 2, b.h / 2, b.d / 2)),
      material,
    })
    body.position.set(b.cx, b.h / 2, b.cz)
    world.addBody(body)
  }

  // ── Trees ──────────────────────────────────────────────────
  // Approximate each tree trunk + foliage as a cylinder (radius 0.8, height 5)
  for (let i = 0; i < TREE_POSITIONS.length; i++) {
    const [x, z] = TREE_POSITIONS[i]
    const scale = 0.8 + Math.sin(i * 7.3) * 0.4
    const radius = 0.8 * scale
    const height = 5.0 * scale

    const body = new CANNON.Body({
      type: CANNON.Body.STATIC,
      shape: new CANNON.Cylinder(radius, radius, height, 8),
      material,
    })
    body.position.set(x, height / 2, z)
    world.addBody(body)
  }

  // ── World boundary walls ───────────────────────────────────
  const BOUND = 140
  const WALL_HEIGHT = 10
  const WALL_THICKNESS = 2
  const walls = [
    { x: BOUND + WALL_THICKNESS / 2,  z: 0, hw: WALL_THICKNESS / 2, hd: BOUND },
    { x: -BOUND - WALL_THICKNESS / 2, z: 0, hw: WALL_THICKNESS / 2, hd: BOUND },
    { x: 0, z: BOUND + WALL_THICKNESS / 2,  hw: BOUND, hd: WALL_THICKNESS / 2 },
    { x: 0, z: -BOUND - WALL_THICKNESS / 2, hw: BOUND, hd: WALL_THICKNESS / 2 },
  ]
  for (const w of walls) {
    const body = new CANNON.Body({
      type: CANNON.Body.STATIC,
      shape: new CANNON.Box(new CANNON.Vec3(w.hw, WALL_HEIGHT / 2, w.hd)),
      material,
    })
    body.position.set(w.x, WALL_HEIGHT / 2, w.z)
    world.addBody(body)
  }
}
