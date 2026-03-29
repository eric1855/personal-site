import * as THREE from 'three'

/**
 * Creates the ground plane, trees, paths, ground variation, and decorative props.
 * Trees are returned as a list for syncing with their Rapier dynamic bodies.
 */
export function createWorldObjects(scene) {
  _createGround(scene)
  _createGroundVariation(scene)
  _createPaths(scene)
  _createLampposts(scene)
  _createBenches(scene)
  _createRocks(scene)
  _createFlowerPatches(scene)
  _createSignposts(scene)
  _createFence(scene)
  const treeMeshes = _createTrees(scene)
  return { treeMeshes }
}

/* ── Ground ──────────────────────────────────────────────── */

function _createGround(scene) {
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(300, 300),
    new THREE.MeshStandardMaterial({ color: '#4a7c59', side: THREE.DoubleSide, flatShading: true })
  )
  mesh.rotation.x = -Math.PI / 2
  mesh.receiveShadow = true
  scene.add(mesh)
}

/* ── Ground Variation (color patches & mounds) ───────────── */

function _createGroundVariation(scene) {
  // Flat color patches to break up monotony
  const patches = [
    { x: -8,  z: -12, sx: 6,  sz: 5,  color: '#3d6b4e' },
    { x: 12,  z: 8,   sx: 7,  sz: 4,  color: '#5a8a5f' },
    { x: -14, z: 15,  sx: 5,  sz: 6,  color: '#3f6d42' },
    { x: 8,   z: -8,  sx: 4,  sz: 5,  color: '#567a4a' },
    { x: -6,  z: 6,   sx: 8,  sz: 3,  color: '#4e8055' },
    { x: 18,  z: -12, sx: 5,  sz: 4,  color: '#3b6545' },
    { x: -18, z: -8,  sx: 4,  sz: 5,  color: '#5d8c5a' },
    { x: 5,   z: 16,  sx: 6,  sz: 4,  color: '#436e48' },
    // Larger distant patches
    { x: 30,  z: -20, sx: 10, sz: 8,  color: '#3a6344' },
    { x: -30, z: 25,  sx: 9,  sz: 7,  color: '#548553' },
    { x: -25, z: -35, sx: 8,  sz: 6,  color: '#4d7d50' },
    { x: 35,  z: 15,  sx: 7,  sz: 9,  color: '#3e6a47' },
    // Brown/earthy patches
    { x: 15,  z: -25, sx: 4,  sz: 3,  color: '#6b7a55' },
    { x: -22, z: 8,   sx: 3,  sz: 4,  color: '#5e7050' },
    { x: 10,  z: 28,  sx: 5,  sz: 3,  color: '#6a7a52' },
  ]

  for (const p of patches) {
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(p.sx, p.sz),
      new THREE.MeshStandardMaterial({ color: p.color, flatShading: true })
    )
    mesh.rotation.x = -Math.PI / 2
    mesh.position.set(p.x, 0.005, p.z)
    mesh.receiveShadow = true
    scene.add(mesh)
  }

  // Small mounds / gentle hills
  const mounds = [
    { x: -12, z: -18, r: 2.5, h: 0.4 },
    { x: 16,  z: 14,  r: 3.0, h: 0.35 },
    { x: -20, z: 12,  r: 2.0, h: 0.3 },
    { x: 25,  z: -8,  r: 2.8, h: 0.25 },
    { x: -8,  z: 28,  r: 3.5, h: 0.4 },
    { x: 30,  z: -30, r: 2.2, h: 0.35 },
    { x: -32, z: -10, r: 2.6, h: 0.3 },
    { x: 5,   z: -35, r: 3.0, h: 0.45 },
  ]

  const moundMat = new THREE.MeshStandardMaterial({ color: '#4d7f55', flatShading: true })
  for (const m of mounds) {
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(m.r, 6, 4, 0, Math.PI * 2, 0, Math.PI / 2),
      moundMat
    )
    mesh.scale.y = m.h / m.r
    mesh.position.set(m.x, 0, m.z)
    mesh.receiveShadow = true
    scene.add(mesh)
  }
}

/* ── Paths / Roads ───────────────────────────────────────── */

function _createPaths(scene) {
  // Building positions: About (0,-20), Projects (20,0), Contact (0,20), Experience (-20,0)
  // Car spawn at origin (0,0)

  const pathMat = new THREE.MeshStandardMaterial({ color: '#8a7d6b', flatShading: true })
  const edgeMat = new THREE.MeshStandardMaterial({ color: '#7a6d5b', flatShading: true })

  // Path segments: each defined as { start, end, width }
  // We build rectangular strips along each path
  const pathDefs = [
    // Spawn to About (0,0) -> (0,-20): straight north
    { sx: 0, sz: 0, ex: 0, ez: -17, w: 2.4 },
    // Spawn to Projects (0,0) -> (20,0): straight east
    { sx: 0, sz: 0, ex: 17, ez: 0, w: 2.4 },
    // Spawn to Contact (0,0) -> (0,20): straight south
    { sx: 0, sz: 0, ex: 0, ez: 17, w: 2.4 },
    // Spawn to Experience (0,0) -> (-20,0): straight west
    { sx: 0, sz: 0, ex: -17, ez: 0, w: 2.4 },
    // Cross paths connecting buildings around the perimeter
    // About to Projects (0,-20) -> (20,0): diagonal-ish, two segments
    { sx: 0, sz: -17, ex: 10, ez: -17, w: 1.8 },
    { sx: 10, sz: -17, ex: 17, ez: -5, w: 1.8 },
    // Projects to Contact (20,0) -> (0,20)
    { sx: 17, sz: 5, ex: 17, ez: 12, w: 1.8 },
    { sx: 17, sz: 12, ex: 5, ez: 17, w: 1.8 },
    // Contact to Experience (0,20) -> (-20,0)
    { sx: -5, sz: 17, ex: -17, ez: 12, w: 1.8 },
    { sx: -17, sz: 12, ex: -17, ez: 5, w: 1.8 },
    // Experience to About (-20,0) -> (0,-20)
    { sx: -17, sz: -5, ex: -17, ez: -12, w: 1.8 },
    { sx: -17, sz: -12, ex: -5, ez: -17, w: 1.8 },
  ]

  for (const p of pathDefs) {
    const dx = p.ex - p.sx
    const dz = p.ez - p.sz
    const len = Math.sqrt(dx * dx + dz * dz)
    const angle = Math.atan2(dx, dz)

    // Main path surface
    const pathMesh = new THREE.Mesh(
      new THREE.BoxGeometry(p.w, 0.06, len),
      pathMat
    )
    pathMesh.position.set(
      p.sx + dx * 0.5,
      0.03,
      p.sz + dz * 0.5
    )
    pathMesh.rotation.y = angle
    pathMesh.receiveShadow = true
    scene.add(pathMesh)

    // Edge trim strips (slightly darker, flanking the path)
    const edgeW = 0.2
    for (const side of [-1, 1]) {
      const offsetX = Math.cos(angle) * (p.w / 2 + edgeW / 2) * side
      const offsetZ = -Math.sin(angle) * (p.w / 2 + edgeW / 2) * side
      const edge = new THREE.Mesh(
        new THREE.BoxGeometry(edgeW, 0.08, len),
        edgeMat
      )
      edge.position.set(
        p.sx + dx * 0.5 + offsetX,
        0.04,
        p.sz + dz * 0.5 + offsetZ
      )
      edge.rotation.y = angle
      edge.receiveShadow = true
      scene.add(edge)
    }
  }

  // Central roundabout/hub at spawn
  const hubGeo = new THREE.CylinderGeometry(2.2, 2.2, 0.07, 16)
  const hubMesh = new THREE.Mesh(hubGeo, pathMat)
  hubMesh.position.set(0, 0.035, 0)
  hubMesh.receiveShadow = true
  scene.add(hubMesh)

  // Inner circle accent
  const innerHub = new THREE.Mesh(
    new THREE.CylinderGeometry(1.0, 1.0, 0.08, 12),
    new THREE.MeshStandardMaterial({ color: '#9a8d7b', flatShading: true })
  )
  innerHub.position.set(0, 0.04, 0)
  innerHub.receiveShadow = true
  scene.add(innerHub)
}

/* ── Lampposts ───────────────────────────────────────────── */

function _createLampposts(scene) {
  const positions = [
    { x: 3,   z: -10 },
    { x: -3,  z: -10 },
    { x: 10,  z: 3 },
    { x: 10,  z: -3 },
    { x: -10, z: 3 },
    { x: -10, z: -3 },
    { x: 3,   z: 10 },
    { x: -3,  z: 10 },
  ]

  const poleMat = new THREE.MeshStandardMaterial({ color: '#3a3a3a', flatShading: true, metalness: 0.5, roughness: 0.6 })
  const lampMat = new THREE.MeshStandardMaterial({
    color: '#ffdd88',
    emissive: '#ffcc44',
    emissiveIntensity: 1.8,
    flatShading: true,
  })
  const capMat = new THREE.MeshStandardMaterial({ color: '#2a2a2a', flatShading: true, metalness: 0.6 })

  for (const p of positions) {
    const group = new THREE.Group()
    group.position.set(p.x, 0, p.z)

    // Base plate
    const base = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.35, 0.15, 6),
      poleMat
    )
    base.position.y = 0.075
    base.castShadow = true
    group.add(base)

    // Pole
    const pole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.1, 3.5, 6),
      poleMat
    )
    pole.position.y = 1.9
    pole.castShadow = true
    group.add(pole)

    // Lamp arm (short horizontal extension)
    const arm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 0.6, 4),
      poleMat
    )
    arm.position.set(0.3, 3.5, 0)
    arm.rotation.z = Math.PI / 2
    group.add(arm)

    // Lamp cap (dark cone on top)
    const cap = new THREE.Mesh(
      new THREE.ConeGeometry(0.28, 0.2, 6),
      capMat
    )
    cap.position.set(0.5, 3.6, 0)
    group.add(cap)

    // Glowing lamp bulb
    const lamp = new THREE.Mesh(
      new THREE.SphereGeometry(0.2, 6, 4),
      lampMat
    )
    lamp.position.set(0.5, 3.4, 0)
    group.add(lamp)

    // Point light for local illumination
    const light = new THREE.PointLight('#ffcc44', 0.6, 8, 2)
    light.position.set(0.5, 3.3, 0)
    group.add(light)

    scene.add(group)
  }
}

/* ── Benches ─────────────────────────────────────────────── */

function _createBenches(scene) {
  // Place benches near buildings, facing outward from center
  const benchDefs = [
    { x: 4,   z: -16, ry: 0 },          // near About
    { x: -4,  z: -16, ry: 0 },          // near About
    { x: 16,  z: 4,   ry: Math.PI / 2 }, // near Projects
    { x: -16, z: -4,  ry: -Math.PI / 2 }, // near Experience
    { x: 4,   z: 16,  ry: Math.PI },     // near Contact
    { x: -4,  z: 16,  ry: Math.PI },     // near Contact
  ]

  const woodMat = new THREE.MeshStandardMaterial({ color: '#7a5c3a', flatShading: true })
  const metalMat = new THREE.MeshStandardMaterial({ color: '#4a4a4a', flatShading: true, metalness: 0.5 })

  for (const b of benchDefs) {
    const group = new THREE.Group()
    group.position.set(b.x, 0, b.z)
    group.rotation.y = b.ry

    // Seat
    const seat = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 0.08, 0.5),
      woodMat
    )
    seat.position.y = 0.5
    seat.castShadow = true
    group.add(seat)

    // Backrest
    const back = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 0.5, 0.06),
      woodMat
    )
    back.position.set(0, 0.8, -0.22)
    back.castShadow = true
    group.add(back)

    // Legs (4 metal legs)
    const legGeo = new THREE.BoxGeometry(0.06, 0.5, 0.06)
    const legPositions = [
      [-0.65, 0.25, 0.18],
      [0.65, 0.25, 0.18],
      [-0.65, 0.25, -0.18],
      [0.65, 0.25, -0.18],
    ]
    for (const [lx, ly, lz] of legPositions) {
      const leg = new THREE.Mesh(legGeo, metalMat)
      leg.position.set(lx, ly, lz)
      leg.castShadow = true
      group.add(leg)
    }

    // Armrests
    for (const side of [-1, 1]) {
      const armrest = new THREE.Mesh(
        new THREE.BoxGeometry(0.06, 0.06, 0.5),
        metalMat
      )
      armrest.position.set(side * 0.75, 0.65, 0)
      group.add(armrest)
    }

    scene.add(group)
  }
}

/* ── Rocks ───────────────────────────────────────────────── */

function _createRocks(scene) {
  const rockDefs = [
    { x: -7,  z: -5,  s: 0.5, color: '#7a7a78' },
    { x: 13,  z: -14, s: 0.7, color: '#6b6b68' },
    { x: -16, z: 8,   s: 0.4, color: '#8a8580' },
    { x: 9,   z: 12,  s: 0.6, color: '#757570' },
    { x: -5,  z: 22,  s: 0.5, color: '#6e6e6b' },
    { x: 22,  z: -6,  s: 0.35,color: '#807c78' },
    { x: -24, z: -14, s: 0.8, color: '#6b6860' },
    { x: 28,  z: 10,  s: 0.45,color: '#7c7870' },
    { x: -12, z: -28, s: 0.6, color: '#858580' },
    { x: 15,  z: 25,  s: 0.55,color: '#726e68' },
    { x: -28, z: 18,  s: 0.4, color: '#7a7570' },
    { x: 6,   z: -28, s: 0.7, color: '#6a6a65' },
    { x: -18, z: -22, s: 0.35,color: '#8a8a85' },
  ]

  for (const r of rockDefs) {
    const mesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(r.s, 0),
      new THREE.MeshStandardMaterial({ color: r.color, flatShading: true })
    )
    // Squash vertically a bit for a more grounded look, random rotation for variety
    mesh.scale.y = 0.5 + Math.random() * 0.3
    mesh.rotation.y = Math.random() * Math.PI * 2
    mesh.rotation.z = (Math.random() - 0.5) * 0.3
    mesh.position.set(r.x, r.s * 0.3, r.z)
    mesh.castShadow = true
    mesh.receiveShadow = true
    scene.add(mesh)

    // Sometimes add a smaller companion rock
    if (Math.random() > 0.5) {
      const companion = new THREE.Mesh(
        new THREE.IcosahedronGeometry(r.s * 0.45, 0),
        new THREE.MeshStandardMaterial({ color: r.color, flatShading: true })
      )
      companion.scale.y = 0.4 + Math.random() * 0.3
      companion.rotation.y = Math.random() * Math.PI * 2
      const offsetAngle = Math.random() * Math.PI * 2
      companion.position.set(
        r.x + Math.cos(offsetAngle) * r.s * 1.2,
        r.s * 0.15,
        r.z + Math.sin(offsetAngle) * r.s * 1.2
      )
      companion.castShadow = true
      scene.add(companion)
    }
  }
}

/* ── Flower Patches ──────────────────────────────────────── */

function _createFlowerPatches(scene) {
  const patchDefs = [
    { x: -6,  z: -14, colors: ['#ff6b8a', '#ff8fab', '#ff4d6d'] },
    { x: 14,  z: 6,   colors: ['#ffd166', '#ffb347', '#ff9f1c'] },
    { x: -15, z: 14,  colors: ['#b388ff', '#9c6fff', '#7c4dff'] },
    { x: 8,   z: -22, colors: ['#ff6b8a', '#fff176', '#ff8fab'] },
    { x: -22, z: -6,  colors: ['#64ffda', '#80cbc4', '#4db6ac'] },
    { x: 18,  z: 18,  colors: ['#ff80ab', '#f48fb1', '#f06292'] },
    { x: -10, z: 26,  colors: ['#fff176', '#ffd54f', '#ffca28'] },
    { x: 26,  z: -16, colors: ['#b388ff', '#ff6b8a', '#64ffda'] },
  ]

  const stemMat = new THREE.MeshStandardMaterial({ color: '#3a8a3a', flatShading: true })

  for (const patch of patchDefs) {
    const group = new THREE.Group()
    group.position.set(patch.x, 0, patch.z)

    // Generate 5-9 flowers per patch in a small cluster
    const count = 5 + Math.floor(Math.random() * 5)
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const dist = Math.random() * 0.8
      const fx = Math.cos(angle) * dist
      const fz = Math.sin(angle) * dist
      const height = 0.3 + Math.random() * 0.3

      // Stem
      const stem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.02, height, 3),
        stemMat
      )
      stem.position.set(fx, height / 2, fz)
      group.add(stem)

      // Flower head — small cone for a tulip-like shape
      const color = patch.colors[i % patch.colors.length]
      const petal = new THREE.Mesh(
        new THREE.ConeGeometry(0.08, 0.12, 5),
        new THREE.MeshStandardMaterial({ color, flatShading: true })
      )
      petal.position.set(fx, height + 0.04, fz)
      petal.rotation.x = Math.PI  // flip cone to point up like a cup
      group.add(petal)
    }

    // Small grass base
    const grassBase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.6, 0.7, 0.05, 8),
      new THREE.MeshStandardMaterial({ color: '#3d7a45', flatShading: true })
    )
    grassBase.position.y = 0.025
    grassBase.receiveShadow = true
    group.add(grassBase)

    scene.add(group)
  }
}

/* ── Signposts ───────────────────────────────────────────── */

function _createSignposts(scene) {
  // Each signpost is a pole with multiple directional arrow signs
  const signposts = [
    {
      x: 5, z: -5,
      signs: [
        { text: 'ABOUT', angle: Math.PI, color: '#5b8dee', y: 2.2 },       // points toward (0,-20)
        { text: 'PROJECTS', angle: -Math.PI / 2, color: '#f5a623', y: 1.7 }, // points toward (20,0)
      ]
    },
    {
      x: -5, z: 5,
      signs: [
        { text: 'EXPERIENCE', angle: Math.PI / 2, color: '#e84393', y: 2.2 }, // points toward (-20,0)
        { text: 'CONTACT', angle: 0, color: '#50c878', y: 1.7 },             // points toward (0,20)
      ]
    },
    {
      x: 12, z: -12,
      signs: [
        { text: 'ABOUT', angle: Math.PI * 0.75, color: '#5b8dee', y: 2.0 },
        { text: 'PROJECTS', angle: -Math.PI * 0.25, color: '#f5a623', y: 1.5 },
      ]
    },
  ]

  const poleMat = new THREE.MeshStandardMaterial({ color: '#5a4a3a', flatShading: true })

  for (const sp of signposts) {
    const group = new THREE.Group()
    group.position.set(sp.x, 0, sp.z)

    // Pole
    const pole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.08, 2.5, 5),
      poleMat
    )
    pole.position.y = 1.25
    pole.castShadow = true
    group.add(pole)

    // Arrow signs
    for (const s of sp.signs) {
      const signGroup = new THREE.Group()
      signGroup.position.y = s.y
      signGroup.rotation.y = s.angle

      // Sign board (arrow-shaped: box + triangle)
      const board = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, 0.3, 0.06),
        new THREE.MeshStandardMaterial({ color: s.color, flatShading: true })
      )
      board.position.z = 0.6
      board.castShadow = true
      signGroup.add(board)

      // Arrow tip (triangle pointing outward)
      const arrowShape = new THREE.Shape()
      arrowShape.moveTo(0, 0.2)
      arrowShape.lineTo(0.2, 0)
      arrowShape.lineTo(0, -0.2)
      arrowShape.lineTo(0, 0.2)
      const arrowGeo = new THREE.ExtrudeGeometry(arrowShape, { depth: 0.06, bevelEnabled: false })
      const arrow = new THREE.Mesh(
        arrowGeo,
        new THREE.MeshStandardMaterial({ color: s.color, flatShading: true })
      )
      arrow.position.set(0, 0, 1.2)
      arrow.rotation.y = Math.PI / 2
      signGroup.add(arrow)

      group.add(signGroup)
    }

    // Decorative cap on top of pole
    const cap = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 5, 3),
      poleMat
    )
    cap.position.y = 2.55
    group.add(cap)

    scene.add(group)
  }
}

/* ── Perimeter Fence ─────────────────────────────────────── */

function _createFence(scene) {
  // Low stone wall around the main play area (roughly ±40 perimeter)
  const wallSize = 40
  const wallHeight = 0.6
  const wallThickness = 0.4
  const segmentLen = 3.0
  const gapBetween = 0.15

  const stoneMat = new THREE.MeshStandardMaterial({ color: '#8a8278', flatShading: true })
  const stoneTopMat = new THREE.MeshStandardMaterial({ color: '#9a928a', flatShading: true })

  // Build walls on each side, leaving gaps at path intersections
  const sides = [
    { axis: 'x', fixed: 'z', fixedVal: -wallSize, dir: 1 },  // north wall
    { axis: 'x', fixed: 'z', fixedVal: wallSize,  dir: 1 },  // south wall
    { axis: 'z', fixed: 'x', fixedVal: -wallSize, dir: 1 },  // west wall
    { axis: 'z', fixed: 'x', fixedVal: wallSize,  dir: 1 },  // east wall
  ]

  for (const side of sides) {
    const start = -wallSize
    const end = wallSize
    let pos = start

    while (pos < end) {
      // Skip gaps where paths cross the perimeter (at approx 0 on the varying axis)
      const center = pos + segmentLen / 2
      // Leave a ~3 unit gap centered at 0 for path openings
      if (Math.abs(center) < 2.5) {
        pos += segmentLen + gapBetween
        continue
      }

      const seg = new THREE.Group()

      // Main wall block
      const block = new THREE.Mesh(
        new THREE.BoxGeometry(
          side.axis === 'x' ? segmentLen : wallThickness,
          wallHeight,
          side.axis === 'z' ? segmentLen : wallThickness
        ),
        stoneMat
      )
      block.position.y = wallHeight / 2
      block.castShadow = true
      block.receiveShadow = true
      seg.add(block)

      // Capstone on top
      const capstone = new THREE.Mesh(
        new THREE.BoxGeometry(
          side.axis === 'x' ? segmentLen + 0.1 : wallThickness + 0.1,
          0.1,
          side.axis === 'z' ? segmentLen + 0.1 : wallThickness + 0.1
        ),
        stoneTopMat
      )
      capstone.position.y = wallHeight + 0.05
      seg.add(capstone)

      if (side.axis === 'x') {
        seg.position.set(center, 0, side.fixedVal)
      } else {
        seg.position.set(side.fixedVal, 0, center)
      }

      scene.add(seg)
      pos += segmentLen + gapBetween
    }

    // Corner posts (stone pillars at each corner)
  }

  // Corner pillars
  const cornerPositions = [
    [-wallSize, -wallSize],
    [-wallSize, wallSize],
    [wallSize, -wallSize],
    [wallSize, wallSize],
  ]
  for (const [cx, cz] of cornerPositions) {
    const pillar = new THREE.Mesh(
      new THREE.BoxGeometry(0.7, wallHeight + 0.4, 0.7),
      stoneMat
    )
    pillar.position.set(cx, (wallHeight + 0.4) / 2, cz)
    pillar.castShadow = true
    scene.add(pillar)

    // Pillar cap — small sphere
    const pillarCap = new THREE.Mesh(
      new THREE.SphereGeometry(0.25, 5, 3),
      stoneTopMat
    )
    pillarCap.position.set(cx, wallHeight + 0.55, cz)
    scene.add(pillarCap)
  }
}

/* ── Trees (original) ────────────────────────────────────── */

function _createTrees(scene) {
  // All 28 positions from Scene.tsx — exact values
  const treePositions = [
    [-15, 0, -20], [20, 0, -15], [-25, 0, 10], [18, 0, 25],
    [-10, 0, 30],  [30, 0, 5],  [-35, 0, -5], [12, 0, -30],
    [-20, 0, -40], [35, 0, -25], [-40, 0, 20], [25, 0, 40],
    [-8, 0, -15],  [14, 0, 8],  [-18, 0, 18], [28, 0, -10],
    [-30, 0, 35],  [40, 0, 15], [-45, 0, -15], [22, 0, -45],
    [-12, 0, 45],  [38, 0, -40], [-50, 0, 8],  [16, 0, 50],
    [-22, 0, -52], [44, 0, 28], [-38, 0, -30], [10, 0, -48],
  ]

  const treeMeshes = []

  treePositions.forEach(([x, y, z], i) => {
    // Same scale formula and color selection as Scene.tsx
    const scale      = 0.8 + Math.sin(i * 7.3) * 0.4
    const greenShade = i % 3 === 0 ? '#2d6a4f' : i % 3 === 1 ? '#40916c' : '#52b788'

    const group = new THREE.Group()
    // Position will be synced from Rapier body each frame.
    // Set initial position here for first render before physics step.
    group.position.set(x, 0, z)
    group.scale.setScalar(scale)

    // Trunk
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.15, 0.2, 1.6, 5),
      new THREE.MeshStandardMaterial({ color: '#6b4c2a', flatShading: true })
    )
    trunk.position.set(0, 0.8, 0)
    trunk.castShadow = true
    group.add(trunk)

    // 3-tier foliage — [radius, height, segments, y-position]
    const tiers = [[1.2, 2.0, 6, 2.4], [0.9, 1.6, 6, 3.6], [0.5, 1.2, 5, 4.5]]
    const foliageMat = new THREE.MeshStandardMaterial({ color: greenShade, flatShading: true })
    tiers.forEach(([r, h, seg, py]) => {
      const foliage = new THREE.Mesh(new THREE.ConeGeometry(r, h, seg), foliageMat)
      foliage.position.set(0, py, 0)
      foliage.castShadow = true
      group.add(foliage)
    })

    scene.add(group)
    treeMeshes.push({ mesh: group, scale })
  })

  return treeMeshes
}
