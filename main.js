/**
 * Main game loop — cannon-es physics with interactive world objects.
 *
 * Fixed-timestep accumulator at 60 Hz. Each tick:
 *   1. Process car input (sets velocity on cannon body)
 *   2. Step the cannon-es world (resolves all collisions)
 *   3. Sync all Three.js meshes from cannon bodies
 */
import { createRenderer }      from './src/core/renderer.js'
import { createScene }          from './src/core/scene.js'
import { createCamera }         from './src/core/camera.js'
import { createInput }          from './src/core/input.js'
import { createPhysicsWorld }   from './src/physics/engine.js'
import { createCar }            from './src/entities/car.js'
import { createWorldObjects }   from './src/entities/worldObjects.js'
import { createLocations }      from './src/entities/locations.js'
import { createInteractables }  from './src/entities/interactables.js'
import { createUI }             from './src/ui/ui.js'
import { createPopup }          from './src/ui/popup.js'

// ── Rendering ───────────────────────────────────────────────────
const { renderer } = createRenderer()
const { scene }    = createScene()
const { camera, update: updateCamera } = createCamera(window.innerWidth / window.innerHeight)

// ── Input ───────────────────────────────────────────────────────
const { keys } = createInput()

// ── Physics ─────────────────────────────────────────────────────
const { world, materials } = createPhysicsWorld()

// ── World ───────────────────────────────────────────────────────
const { treeSyncList } = createWorldObjects(scene, world, materials)
const { locations }    = createLocations(scene, world, materials.buildingMat)

// ── Car ─────────────────────────────────────────────────────────
const { carState, preStep: carPreStep, postStep: carPostStep } = createCar(scene, world, materials.carMat)

// ── Interactive objects ─────────────────────────────────────────
const { syncList: interactSyncList } = createInteractables(scene, world, materials.objectMat)

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

  const elapsed = Math.min((now - prevTime) / 1000, 0.05) // cap at 50 ms (tab-blur recovery)
  prevTime      = now
  accumulator  += elapsed

  while (accumulator >= FIXED_DT) {
    if (!isPaused) {
      // 1. Process car input → sets velocity on cannon body
      carPreStep(keys)

      // 2. Step the physics world
      world.step(FIXED_DT)
    }
    accumulator -= FIXED_DT
  }

  // 3. Sync all Three.js meshes from cannon bodies
  carPostStep()
  _syncDynamicBodies(treeSyncList)
  _syncDynamicBodies(interactSyncList)

  // ── Proximity / interaction ─────────────────────────────────
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

loop(performance.now())

// ── Helpers ─────────────────────────────────────────────────────

function _syncDynamicBodies(syncList) {
  for (const item of syncList) {
    const { mesh, body, scale } = item

    if (scale) {
      // Trees: mesh origin is at ground level, body origin is at center of mass
      // We need to account for the scale and body offset
      mesh.position.set(body.position.x, body.position.y, body.position.z)
      mesh.quaternion.set(body.quaternion.x, body.quaternion.y, body.quaternion.z, body.quaternion.w)
    } else {
      // Simple objects: mesh origin matches body origin
      mesh.position.set(body.position.x, body.position.y, body.position.z)
      mesh.quaternion.set(body.quaternion.x, body.quaternion.y, body.quaternion.z, body.quaternion.w)
    }
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
