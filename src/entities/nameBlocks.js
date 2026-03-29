/**
 * Name letters — "ERIC WANG" as 3D extruded letter shapes near spawn.
 * Each letter is an actual TextGeometry mesh (like Bruno Simon's portfolio).
 * Letters topple when the car drives into them.
 */
import * as THREE from 'three'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { Font } from 'three/examples/jsm/loaders/FontLoader.js'
import helvetikerBold from 'three/examples/fonts/helvetiker_bold.typeface.json'

const LETTERS = [
  { char: 'E' },
  { char: 'R' },
  { char: 'I' },
  { char: 'C' },
  null, // word gap
  { char: 'W' },
  { char: 'A' },
  { char: 'N' },
  { char: 'G' },
]

const LETTER_COLOR = 0xeeeeee

const LETTER_SIZE  = 2.2   // text height (world units)
const LETTER_DEPTH = 0.7   // extrusion depth
const NAME_Z       = -6    // behind car (visible from camera)
const LETTER_GAP   = 0.3
const WORD_GAP     = 1.2

export function createNameBlocks(scene, RAPIER, world) {
  const syncList = []
  const group = new THREE.Group()

  const font = new Font(helvetikerBold)

  // ── Generate geometry + measurements for each letter ────────
  const letterData = []
  for (const entry of LETTERS) {
    if (!entry) { letterData.push(null); continue }

    const geo = new TextGeometry(entry.char, {
      font,
      size: LETTER_SIZE,
      depth: LETTER_DEPTH,
      bevelEnabled: true,
      bevelThickness: 0.06,
      bevelSize: 0.04,
      bevelSegments: 2,
      curveSegments: 5,
    })
    geo.computeBoundingBox()
    const bb = geo.boundingBox
    const w = bb.max.x - bb.min.x
    const h = bb.max.y - bb.min.y
    const d = bb.max.z - bb.min.z

    // Center geometry on its bounding box
    geo.translate(
      -(bb.min.x + w / 2),
      -(bb.min.y + h / 2),
      -(bb.min.z + d / 2),
    )

    letterData.push({ geo, w, h, d })
  }

  // ── Compute total width for centering ───────────────────────
  let totalW = 0
  for (let i = 0; i < letterData.length; i++) {
    if (!letterData[i]) { totalW += WORD_GAP; continue }
    if (i > 0 && letterData[i - 1]) totalW += LETTER_GAP
    totalW += letterData[i].w
  }

  // ── Place each letter ───────────────────────────────────────
  let cx = -totalW / 2

  for (let i = 0; i < letterData.length; i++) {
    const data = letterData[i]
    if (!data) { cx += WORD_GAP; continue }
    if (i > 0 && letterData[i - 1]) cx += LETTER_GAP

    const { geo, w, h, d } = data

    const mat = new THREE.MeshStandardMaterial({
      color: LETTER_COLOR,
      flatShading: true,
      roughness: 0.35,
      metalness: 0.15,
    })

    const x = cx + w / 2
    const y = h / 2   // bottom of letter sits on ground
    const z = NAME_Z

    const mesh = new THREE.Mesh(geo, mat)
    mesh.castShadow = true
    mesh.receiveShadow = true
    group.add(mesh)

    // Dynamic Rapier body — topples on impact
    const bd = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(x, y, z)
      .setLinearDamping(0.3)
      .setAngularDamping(0.4)
    const body = world.createRigidBody(bd)

    world.createCollider(
      RAPIER.ColliderDesc.cuboid(w / 2, h / 2, d / 2)
        .setDensity(3.0)
        .setFriction(0.6)
        .setRestitution(0.1),
      body,
    )

    syncList.push({ mesh, body })
    cx += w
  }

  // ── Directional signpost at center ────────────────────────
  _buildDirectionPost(group, RAPIER, world)

  scene.add(group)
  return { syncList }
}

// ── Multi-directional signpost at center ─────────────────────
function _buildDirectionPost(group, RAPIER, world) {
  const POLE_R = 0.08
  const POLE_H = 3.5
  const POLE_Y = POLE_H / 2
  const POST_X = -3
  const POST_Z = 3

  // Central pole
  const poleGeo = new THREE.CylinderGeometry(POLE_R, POLE_R, POLE_H, 8)
  const poleMat = new THREE.MeshStandardMaterial({
    color: 0x555555, flatShading: true, metalness: 0.7, roughness: 0.3,
  })
  const pole = new THREE.Mesh(poleGeo, poleMat)
  pole.position.set(POST_X, POLE_Y, POST_Z)
  pole.castShadow = true
  group.add(pole)

  // Cap sphere on top
  const capGeo = new THREE.SphereGeometry(0.14, 8, 6)
  const cap = new THREE.Mesh(capGeo, poleMat)
  cap.position.set(POST_X, POLE_H + 0.06, POST_Z)
  cap.castShadow = true
  group.add(cap)

  // Fixed Rapier body for the pole
  const poleBd = RAPIER.RigidBodyDesc.fixed().setTranslation(POST_X, POLE_Y, POST_Z)
  const poleBody = world.createRigidBody(poleBd)
  world.createCollider(
    RAPIER.ColliderDesc.cylinder(POLE_H / 2, POLE_R).setFriction(0.5), poleBody,
  )

  // Sign definitions: label, y position, target direction (x, z), color
  const signs = [
    { label: 'ABOUT',      y: 3.0, tx: 0,   tz: -20, color: '#5b8dee', hex: 0x5b8dee },
    { label: 'PROJECTS',   y: 2.5, tx: 20,  tz: 0,   color: '#f5a623', hex: 0xf5a623 },
    { label: 'CONTACT',    y: 2.0, tx: 0,   tz: 20,  color: '#50c878', hex: 0x50c878 },
    { label: 'EXPERIENCE', y: 1.5, tx: -20, tz: 0,   color: '#e84393', hex: 0xe84393 },
  ]

  const BOARD_W = 1.8
  const BOARD_H = 0.35
  const BOARD_D = 0.06
  const ARROW_SIZE = 0.14

  for (const sign of signs) {
    const angle = Math.atan2(sign.tx - POST_X, sign.tz - POST_Z)

    // Canvas texture for the sign label
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 100
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = sign.color
    ctx.fillRect(0, 0, 512, 100)

    ctx.strokeStyle = 'rgba(0,0,0,0.3)'
    ctx.lineWidth = 4
    ctx.strokeRect(2, 2, 508, 96)

    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 52px sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(sign.label + ' \u2192', 256, 52)

    const frontTex = new THREE.CanvasTexture(canvas)
    frontTex.colorSpace = THREE.SRGBColorSpace

    const boardMat = new THREE.MeshStandardMaterial({
      color: sign.hex, flatShading: true, roughness: 0.5, metalness: 0.1,
    })
    const frontMat = new THREE.MeshStandardMaterial({
      map: frontTex, flatShading: true,
    })

    const boardGeo = new THREE.BoxGeometry(BOARD_W, BOARD_H, BOARD_D)
    const board = new THREE.Mesh(boardGeo, [boardMat, boardMat, boardMat, boardMat, frontMat, frontMat])

    const signGroup = new THREE.Group()
    signGroup.position.set(POST_X, sign.y, POST_Z)
    signGroup.rotation.y = angle

    board.position.set(BOARD_W / 2 + POLE_R, 0, 0)
    board.rotation.y = 0
    board.castShadow = true
    signGroup.add(board)

    // Arrow tip
    const arrowGeo = new THREE.ConeGeometry(ARROW_SIZE, ARROW_SIZE * 2.5, 4)
    const arrowMat = new THREE.MeshStandardMaterial({
      color: sign.hex, flatShading: true, roughness: 0.4, metalness: 0.2,
    })
    const arrowMesh = new THREE.Mesh(arrowGeo, arrowMat)
    arrowMesh.rotation.z = -Math.PI / 2
    arrowMesh.position.set(BOARD_W + POLE_R + ARROW_SIZE * 1.2, 0, 0)
    arrowMesh.castShadow = true
    signGroup.add(arrowMesh)

    group.add(signGroup)
  }
}
