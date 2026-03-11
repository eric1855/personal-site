import { createRenderer }   from './src/core/renderer.js'
import { createScene }      from './src/core/scene.js'
import { createCamera }     from './src/core/camera.js'
import { createInput }      from './src/core/input.js'
import { createCar }        from './src/entities/car.js'
import { createWorldObjects } from './src/entities/worldObjects.js'
import { createLocations }  from './src/entities/locations.js'
import { createUI }         from './src/ui/ui.js'
import { createPopup }      from './src/ui/popup.js'

// Rendering
const { renderer } = createRenderer()
const { scene }    = createScene()
const { camera, update: updateCamera } = createCamera(window.innerWidth / window.innerHeight)

// Input
const { keys } = createInput()

// World
createWorldObjects(scene)
const { locations } = createLocations(scene)

// Car (pure kinematic — no physics engine)
const { carState, preStep: carPreStep, postStep: carPostStep } = createCar(scene)

// HUD + popup
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

// Fixed-timestep game loop — physics always runs at 60 Hz regardless of display framerate
const FIXED_DT  = 1 / 60
let prevTime    = performance.now()
let accumulator = 0

function loop(now) {
  requestAnimationFrame(loop)

  const elapsed = Math.min((now - prevTime) / 1000, 0.05) // cap at 50 ms (tab-blur recovery)
  prevTime      = now
  accumulator  += elapsed

  while (accumulator >= FIXED_DT) {
    if (!isPaused) carPreStep(keys)
    accumulator -= FIXED_DT
  }

  carPostStep()

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
