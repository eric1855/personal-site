import { createRenderer }      from './src/core/renderer.js'
import { createScene }         from './src/core/scene.js'
import { createCamera }        from './src/core/camera.js'
import { createInput }         from './src/core/input.js'
import { createCar }           from './src/entities/car.js'
import { createWorldObjects }  from './src/entities/worldObjects.js'
import { createLocations }     from './src/entities/locations.js'
import { createUI }            from './src/ui/ui.js'
import { createPopup }         from './src/ui/popup.js'
import { createPhysicsBridge } from './src/physics/physicsBridge.js'

// Rendering
const { renderer } = createRenderer()
const { scene }    = createScene()
const { camera, update: updateCamera } = createCamera(window.innerWidth / window.innerHeight)

// Input
const { keys } = createInput()

// World (visual only — physics bodies are in the worker)
createWorldObjects(scene)
const { locations } = createLocations(scene)

// Car mesh (visual only — sync from worker each frame)
const { syncFromPhysics } = createCar(scene)

// Physics worker bridge
const physics = createPhysicsBridge()

// HUD + popup
const { updateProximityPrompt } = createUI()
const popup = createPopup(() => { isPaused = false; physics.resume() })

let isPaused     = false
let prevInteract = false

window.addEventListener('keydown', (e) => {
  if (e.code === 'Escape' && isPaused) {
    isPaused = false
    popup.close()
    physics.resume()
  }
})

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
})

// ─── Render loop ────────────────────────────────────────────────────────────
// Physics runs at 60Hz in the worker. Main thread only renders + reads state.

function loop() {
  requestAnimationFrame(loop)

  // Send current input to the worker
  if (!isPaused) {
    physics.sendInput(keys)
  }

  // Sync Three.js mesh from latest worker state
  syncFromPhysics(physics.carState)

  // Proximity detection for location popups
  const near = isPaused ? null : _findNearest(physics.carState.position, locations)
  updateProximityPrompt(near)

  const triggered = keys.interact && !prevInteract
  prevInteract = keys.interact
  if (triggered && near && !isPaused) {
    isPaused = true
    physics.pause()
    popup.open(near)
  }

  updateCamera(physics.carState)
  renderer.render(scene, camera)
}

// Wait for physics worker to be ready, then start rendering
physics.ready.then(() => {
  loop()
})

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
