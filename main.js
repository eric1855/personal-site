/**
 * Main game loop — Rapier hybrid physics with space colony world.
 */
import { createRenderer }      from './src/core/renderer.js'
import { createScene }          from './src/core/scene.js'
import { createCamera }         from './src/core/camera.js'
import { createInput }          from './src/core/input.js'
import { createPhysicsEngine }  from './src/physics/engine.js'
import { createColliderWorld }  from './src/physics/colliders.js'
import { createCar }            from './src/entities/car.js'
import { createLocations }      from './src/entities/locations.js'
import { createUI }             from './src/ui/ui.js'
import { createPopup }          from './src/ui/popup.js'
import { createWorld }          from './src/worlds/space.js'

// ── Boot — Rapier WASM must be initialised before anything else ───
const MIN_DISPLAY_MS = 3000
const bootStart = performance.now()
const { RAPIER, world } = await createPhysicsEngine()

// ── Rendering ───────────────────────────────────────────────────
const { renderer } = createRenderer()
const { scene }    = createScene()
const { camera, update: updateCamera, shake: shakeCamera } = createCamera(window.innerWidth / window.innerHeight)

// ── Input ───────────────────────────────────────────────────────
const { keys } = createInput()

// ── Portfolio buildings (constant across all worlds) ─────────────
const { locations }  = createLocations(scene)

// ── Car + building colliders ────────────────────────────────────
const { carBody, carCollider } = createColliderWorld(RAPIER, world)

// ── Car (hybrid kinematic + dynamic Rapier) ─────────────────────
const { carState, preStep: carPreStep, postStep: carPostStep, consumeCollision } =
  createCar(scene, { RAPIER, world, carBody, carCollider })

// ── Load world ──────────────────────────────────────────────────
const { syncList: worldSyncList, update: updateWorld } = createWorld(scene, RAPIER, world)

// ── HUD + popup ─────────────────────────────────────────────────
const { updateProximityPrompt } = createUI()
const popup = createPopup(() => { isPaused = false })

let isPaused     = false
let prevInteract = false

window.addEventListener('keydown', (e) => {
  if (e.code === 'Escape' && isPaused) { isPaused = false; popup.close() }
})

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
})

// ── Fixed-timestep game loop ────────────────────────────────────
const FIXED_DT  = 1 / 60
let prevTime    = performance.now()
let accumulator = 0

function loop(now) {
  requestAnimationFrame(loop)

  const elapsed = Math.min((now - prevTime) / 1000, 0.05)
  prevTime      = now
  accumulator  += elapsed

  while (accumulator >= FIXED_DT) {
    if (!isPaused) {
      carPreStep(keys)
      world.step()
      updateWorld(FIXED_DT)
    }
    accumulator -= FIXED_DT
  }

  // Sync all meshes from Rapier bodies
  carPostStep()
  _syncDynamicBodies(worldSyncList)

  // Camera shake on collision
  const impactSpeed = consumeCollision()
  if (impactSpeed > 0) {
    const MAX_SPEED = 0.18
    const intensity = 0.03 + (impactSpeed / MAX_SPEED) * 0.10
    shakeCamera(intensity)
  }

  // Proximity / interaction
  const near = isPaused ? null : _findNearest(carState.position, locations)
  updateProximityPrompt(near)

  const triggered = keys.interact && !prevInteract
  prevInteract = keys.interact
  if (triggered && near && !isPaused) {
    isPaused = true
    popup.open(near)
  }

  updateCamera(carState)
  renderer.render(scene, camera)
}

// ── Dismiss loading screen after minimum display time, then start loop ──
const _bootElapsed = performance.now() - bootStart
const _remaining = Math.max(0, MIN_DISPLAY_MS - _bootElapsed)

setTimeout(() => {
  const ls = document.getElementById('loading-screen')
  ls.classList.add('fade-out')
  let started = false
  const start = () => {
    if (started) return
    started = true
    ls.remove()
    loop(performance.now())
  }
  ls.addEventListener('transitionend', (e) => {
    if (e.propertyName === 'opacity') start()
  }, { once: true })
  setTimeout(start, 1000)
}, _remaining)

// ── Helpers ─────────────────────────────────────────────────────

function _syncDynamicBodies(syncList) {
  for (const item of syncList) {
    const { mesh, body, offset } = item
    const pos = body.translation()
    const rot = body.rotation()
    if (offset) {
      mesh.position.set(pos.x + offset.x, pos.y + offset.y, pos.z + offset.z)
    } else {
      mesh.position.set(pos.x, pos.y, pos.z)
    }
    mesh.quaternion.set(rot.x, rot.y, rot.z, rot.w)
  }
}

function _findNearest(pos, locations) {
  let best = null, bestD = Infinity
  for (const loc of locations) {
    const dx = pos.x - loc.position.x
    const dz = pos.z - loc.position.z
    const d  = Math.sqrt(dx * dx + dz * dz)
    if (d < loc.radius && d < bestD) { best = loc; bestD = d }
  }
  return best
}
