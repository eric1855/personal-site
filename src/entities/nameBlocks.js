/**
 * Name blocks — "ERIC WANG" as big individual letter blocks near spawn.
 * Each letter is a single large block with the character on its faces.
 * Blocks topple when the car drives into them.
 * Includes a static "IN PROGRESS" sign above the spawn point.
 */
import * as THREE from 'three'

const BLOCK_W = 2.5
const BLOCK_H = 3.0
const BLOCK_D = 1.0

const LETTERS = [
  { char: 'E', color: '#ff4444', hex: 0xff4444 },
  { char: 'R', color: '#ff8844', hex: 0xff8844 },
  { char: 'I', color: '#ffcc44', hex: 0xffcc44 },
  { char: 'C', color: '#44dd44', hex: 0x44dd44 },
  null, // word gap
  { char: 'W', color: '#4488ff', hex: 0x4488ff },
  { char: 'A', color: '#9944ff', hex: 0x9944ff },
  { char: 'N', color: '#ff44cc', hex: 0xff44cc },
  { char: 'G', color: '#44ffcc', hex: 0x44ffcc },
]

// ── Canvas helper — draws a single letter on a colored background ──
function _letterCanvas(char, bgColor) {
  const c = document.createElement('canvas')
  c.width = 256
  c.height = 256
  const ctx = c.getContext('2d')

  ctx.fillStyle = bgColor
  ctx.fillRect(0, 0, 256, 256)

  // Subtle inner border
  ctx.strokeStyle = 'rgba(255,255,255,0.25)'
  ctx.lineWidth = 6
  ctx.strokeRect(6, 6, 244, 244)

  // Big white letter
  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 200px sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(char, 128, 135)

  return c
}

export function createNameBlocks(scene, RAPIER, world) {
  const syncList = []
  const group = new THREE.Group()

  const blockGeo = new THREE.BoxGeometry(BLOCK_W, BLOCK_H, BLOCK_D)
  const NAME_Z = -6  // behind car (visible from camera at +Z offset)
  const LETTER_GAP = 0.3
  const WORD_GAP = 1.2

  // Calculate total width for centering
  let totalW = 0
  for (let i = 0; i < LETTERS.length; i++) {
    if (!LETTERS[i]) { totalW += WORD_GAP; continue }
    if (i > 0 && LETTERS[i - 1]) totalW += LETTER_GAP
    totalW += BLOCK_W
  }

  let cx = -totalW / 2 + BLOCK_W / 2

  for (let i = 0; i < LETTERS.length; i++) {
    const entry = LETTERS[i]
    if (!entry) { cx += WORD_GAP; continue }
    if (i > 0 && LETTERS[i - 1]) cx += LETTER_GAP

    const { char, color, hex } = entry

    // Front texture (letter on colored bg)
    const canvas = _letterCanvas(char, color)
    const frontTex = new THREE.CanvasTexture(canvas)
    frontTex.colorSpace = THREE.SRGBColorSpace

    // Back texture (horizontally flipped so letter reads correctly from behind)
    const backTex = frontTex.clone()
    backTex.wrapS = THREE.RepeatWrapping
    backTex.repeat.x = -1
    backTex.offset.x = 1
    backTex.needsUpdate = true

    const sideMat = new THREE.MeshStandardMaterial({
      color: hex, flatShading: true, roughness: 0.4, metalness: 0.1,
      emissive: hex, emissiveIntensity: 0.15,
    })
    const frontMat = new THREE.MeshStandardMaterial({
      map: frontTex, flatShading: true, emissive: hex, emissiveIntensity: 0.1,
    })
    const backMat = new THREE.MeshStandardMaterial({
      map: backTex, flatShading: true, emissive: hex, emissiveIntensity: 0.1,
    })

    // BoxGeometry material groups: +X, -X, +Y, -Y, +Z, -Z
    const mats = [sideMat, sideMat, sideMat, sideMat, frontMat, backMat]

    const x = cx
    const y = BLOCK_H / 2  // sitting on ground
    const z = NAME_Z

    const mesh = new THREE.Mesh(blockGeo, mats)
    mesh.castShadow = true
    mesh.receiveShadow = true
    mesh.position.set(x, y, z)
    group.add(mesh)

    // Dynamic Rapier body — topples on impact
    const bd = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(x, y, z)
      .setLinearDamping(0.3)
      .setAngularDamping(0.4)
    const body = world.createRigidBody(bd)

    world.createCollider(
      RAPIER.ColliderDesc.cuboid(BLOCK_W / 2, BLOCK_H / 2, BLOCK_D / 2)
        .setDensity(3.0)
        .setFriction(0.6)
        .setRestitution(0.1),
      body
    )

    syncList.push({ mesh, body })
    cx += BLOCK_W
  }

  // ── "IN PROGRESS" sign ─────────────────────────────────────
  _buildSign(group, RAPIER, world)

  scene.add(group)
  return { syncList }
}

// ── Static sign directly above car spawn ─────────────────────
function _buildSign(group, RAPIER, world) {
  const PANEL_W = 7
  const PANEL_H = 1.5
  const PANEL_D = 0.15
  const SIGN_Y  = 6
  const SIGN_Z  = 0  // directly above spawn
  const POST_R  = 0.12
  const POST_H  = SIGN_Y + PANEL_H / 2 + 0.2

  // Metal posts
  const postGeo = new THREE.CylinderGeometry(POST_R, POST_R, POST_H, 6)
  const postMat = new THREE.MeshStandardMaterial({
    color: 0x888888, flatShading: true, metalness: 0.6, roughness: 0.3,
  })

  for (const px of [-(PANEL_W / 2 - 0.3), PANEL_W / 2 - 0.3]) {
    const post = new THREE.Mesh(postGeo, postMat)
    post.position.set(px, POST_H / 2, SIGN_Z)
    post.castShadow = true
    group.add(post)

    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(px, POST_H / 2, SIGN_Z)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cylinder(POST_H / 2, POST_R).setFriction(0.5), body
    )
  }

  // Panel texture — dark panel with bright text (avoids bloom artifacts)
  const canvas  = document.createElement('canvas')
  canvas.width  = 1024
  canvas.height = 220
  const ctx     = canvas.getContext('2d')

  ctx.fillStyle = '#1a1a2a'
  ctx.fillRect(0, 0, 1024, 220)

  ctx.strokeStyle = '#FF9800'
  ctx.lineWidth   = 4
  ctx.strokeRect(4, 4, 1016, 212)

  ctx.fillStyle    = '#FFB300'
  ctx.font         = 'bold 100px sans-serif'
  ctx.textAlign    = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('IN PROGRESS', 512, 114)

  // Front texture (+Z face — faces the camera)
  const frontTex = new THREE.CanvasTexture(canvas)
  frontTex.colorSpace = THREE.SRGBColorSpace

  // Back texture (-Z face — flipped so text reads correctly from other side)
  const backTex = frontTex.clone()
  backTex.wrapS = THREE.RepeatWrapping
  backTex.repeat.x = -1
  backTex.offset.x = 1
  backTex.needsUpdate = true

  const sideMat = new THREE.MeshStandardMaterial({
    color: 0x1a1a2a, flatShading: true,
  })
  const frontMat = new THREE.MeshStandardMaterial({
    map: frontTex, flatShading: true,
  })
  const backMat = new THREE.MeshStandardMaterial({
    map: backTex, flatShading: true,
  })

  // BoxGeometry: +X, -X, +Y, -Y, +Z, -Z
  const panelGeo = new THREE.BoxGeometry(PANEL_W, PANEL_H, PANEL_D)
  const panel = new THREE.Mesh(panelGeo, [sideMat, sideMat, sideMat, sideMat, frontMat, backMat])
  panel.position.set(0, SIGN_Y, SIGN_Z)
  panel.castShadow = true
  group.add(panel)

  // Collider
  const bd   = RAPIER.RigidBodyDesc.fixed().setTranslation(0, SIGN_Y, SIGN_Z)
  const body = world.createRigidBody(bd)
  world.createCollider(
    RAPIER.ColliderDesc.cuboid(PANEL_W / 2, PANEL_H / 2, PANEL_D / 2).setFriction(0.5), body
  )
}
