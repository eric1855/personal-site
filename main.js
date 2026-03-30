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
import { createWorldObjects }   from './src/entities/worldObjects.js'
import { createInteractables }  from './src/entities/interactables.js'
import { createUI }             from './src/ui/ui.js'
import { createPopup }          from './src/ui/popup.js'
import { createWorld }          from './src/worlds/space.js'
import { createNameBlocks }     from './src/entities/nameBlocks.js'
import { createPostProcessing } from './src/core/postprocessing.js'
import { createEnvironment }    from './src/core/environment.js'
import { createLabels }         from './src/ui/labels.js'
import { initAnimations, playIntroSequence, animatePopupOpen, animatePopupClose, getCameraMode, CameraMode } from './src/core/animations.js'
import { initAudio, updateAudioEngine, playCollisionSound, playPopupOpenSound, playPopupCloseSound, playProximitySound } from './src/core/audio.js'
import { initLoaders }          from './src/core/assetLoader.js'
import { initQuality, updateQuality } from './src/core/quality.js'
import { createAtmosphere }           from './src/effects/atmosphere.js'
import { createGrass }                from './src/effects/grass.js'

// ── Boot — Rapier WASM must be initialised before anything else ───
const MIN_DISPLAY_MS = 3000
const bootStart = performance.now()
const { RAPIER, world } = await createPhysicsEngine()

// ── Rendering ───────────────────────────────────────────────────
const { renderer } = createRenderer()
const { scene }    = createScene()
const { camera, update: updateCamera, shake: shakeCamera, setLocations } = createCamera(window.innerWidth / window.innerHeight)

// ── Asset loader + adaptive quality ─────────────────────────────
initLoaders()
initQuality(renderer)

// ── Post-processing + environment ─────────────────────────────
const { composer } = createPostProcessing(renderer, scene, camera)
createEnvironment(renderer, scene)

// ── Input ───────────────────────────────────────────────────────
const { keys } = createInput()

// ── Portfolio buildings (constant across all worlds) ─────────────
const { locations, syncList: locationSyncList }  = createLocations(scene, RAPIER, world)
setLocations(locations)
createLabels(scene, locations)

// ── World objects (ground, trees, paths, lampposts, rocks, etc.) ──
const { syncList: worldObjSyncList } = createWorldObjects(scene, RAPIER, world)

// ── Grass system (instanced blades + treadmarks) ──────────────────
const { update: updateGrass } = createGrass(scene)

// ── Atmospheric effects (particles, building glow, ground rings) ──
const { update: updateAtmosphere } = createAtmosphere(scene, locations)

// ── Car + building colliders ────────────────────────────────────
const { carBody, carCollider } = createColliderWorld(RAPIER, world)

// ── Car (hybrid kinematic + dynamic Rapier) ─────────────────────
const { carState, preStep: carPreStep, postStep: carPostStep, consumeCollision } =
  createCar(scene, { RAPIER, world, carBody, carCollider })

// ── Load world ──────────────────────────────────────────────────
const { syncList: worldSyncList, update: updateWorld } = createWorld(scene, RAPIER, world)

// ── Name blocks + "IN PROGRESS" sign near spawn ─────────────
const { syncList: nameSyncList } = createNameBlocks(scene, RAPIER, world)
worldSyncList.push(...nameSyncList)
worldSyncList.push(...worldObjSyncList)
worldSyncList.push(...locationSyncList)

// ── Interactive physics objects (bowling pins, cones, crystals, etc.) ──
const { syncList: interactSyncList } = createInteractables(scene, RAPIER, world)
worldSyncList.push(...interactSyncList)

// ── HUD + popup ─────────────────────────────────────────────────
const { updateProximityPrompt, updateSpeedometer, updateMinimap, waitForSplash } = createUI()
const popup = createPopup(() => {
  isPaused = false
  justClosedPopup = true
  playPopupCloseSound()
  animatePopupClose()
})

// ── Animations + Audio ────────────────────────────────────────────
initAnimations(camera, carState)
initAudio()

let isPaused     = false
let prevInteract = false
let prevNear     = null
let justClosedPopup = false

window.addEventListener('keydown', (e) => {
  if (e.code === 'Escape' && isPaused) {
    isPaused = false
    justClosedPopup = true
    popup.close()
    playPopupCloseSound()
    animatePopupClose()
  }
})

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  composer.setSize(window.innerWidth, window.innerHeight)
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

  // Camera shake + sound on collision
  const impactSpeed = consumeCollision()
  if (impactSpeed > 0) {
    const MAX_SPEED = 0.18
    const intensity = 0.03 + (impactSpeed / MAX_SPEED) * 0.10
    shakeCamera(intensity)
    playCollisionSound(impactSpeed)
  }

  // Engine audio modulation
  updateAudioEngine(carState.speed)

  // Proximity / interaction
  const near = isPaused ? null : _findNearest(carState.position, locations)
  updateProximityPrompt(near)
  if (near && !prevNear) playProximitySound()

  const triggered = keys.interact && !prevInteract
  prevInteract = keys.interact

  // Open popup on E press OR on entering the building's proximity circle
  const justEnteredCircle = near && !prevNear && !justClosedPopup
  if ((triggered || justEnteredCircle) && near && !isPaused) {
    isPaused = true
    popup.open(near)
    playPopupOpenSound()
    animatePopupOpen(near)
  }
  justClosedPopup = false
  prevNear = near

  // HUD updates: speedometer + minimap
  updateSpeedometer(carState.speed)
  updateMinimap(carState.position, carState.rotation)

  // Atmosphere (particles, beacon pulse, ground rings)
  updateAtmosphere(elapsed)

  // Grass (wind sway + treadmarks)
  updateGrass(carState, elapsed, now / 1000)

  if (getCameraMode() === CameraMode.FOLLOW) updateCamera(carState)
  updateQuality(now)
  composer.render()
}

// ── Dismiss loading screen after minimum display time, then start loop ──
const _bootElapsed = performance.now() - bootStart
const _remaining = Math.max(0, MIN_DISPLAY_MS - _bootElapsed)

setTimeout(() => {
  const ls = document.getElementById('loading-screen')
  ls.classList.add('fade-out')

  let lsRemoved = false
  const removeLs = () => {
    if (lsRemoved) return
    lsRemoved = true
    ls.remove()
  }
  ls.addEventListener('transitionend', (e) => {
    if (e.propertyName === 'opacity') removeLs()
  }, { once: true })
  setTimeout(removeLs, 1000)

  // Wait for user to dismiss the splash screen, then start the game
  waitForSplash().then(() => {
    playIntroSequence()
    loop(performance.now())
  })
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
