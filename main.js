import { initAmmoWorld }      from './src/physics/ammoWorld.js'
import { createVehiclePhysics } from './src/physics/carPhysics.js'
import { createRenderer }    from './src/core/renderer.js'
import { createScene }       from './src/core/scene.js'
import { createCamera }      from './src/core/camera.js'
import { createInput }       from './src/core/input.js'
import { createCar }         from './src/entities/car.js'
import { createWorldObjects } from './src/entities/worldObjects.js'
import { createLocations }   from './src/entities/locations.js'
import { createUI }          from './src/ui/ui.js'
import { createPopup }       from './src/ui/popup.js'

// ── Async init ────────────────────────────────────────────────────────────────
async function main() {
  // 1) Initialize Ammo.js and create physics world
  const { world } = await initAmmoWorld()

  // 2) Rendering
  const { renderer } = createRenderer()
  const { scene }    = createScene()
  const { camera, update: updateCamera } = createCamera(window.innerWidth / window.innerHeight)

  // 3) Input
  const { keys } = createInput()

  // 4) World objects (ground + trees) — with physics colliders
  createWorldObjects(scene, world)

  // 5) Buildings — with physics colliders
  const { locations } = createLocations(scene, world)

  // 6) Car mesh (visual only)
  const { syncMesh } = createCar(scene)

  // 7) Vehicle physics (Ammo btRaycastVehicle)
  const { carState, preStep: vehiclePreStep, postStep: vehiclePostStep } =
    createVehiclePhysics(world)

  // 8) HUD + popup
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

  // ── Game loop ─────────────────────────────────────────────────────────────
  // Ammo.js stepSimulation handles sub-stepping internally,
  // so we pass the real delta and let Bullet subdivide as needed.
  const FIXED_DT    = 1 / 60
  const MAX_SUBSTEPS = 3
  let prevTime = performance.now()

  function loop(now) {
    requestAnimationFrame(loop)

    const dt = Math.min((now - prevTime) / 1000, 0.05) // cap for tab-blur
    prevTime = now

    // Apply input forces
    if (!isPaused) vehiclePreStep(keys)

    // Step the physics world
    world.stepSimulation(dt, MAX_SUBSTEPS, FIXED_DT)

    // Sync car state from Bullet
    vehiclePostStep()

    // Sync Three.js mesh from car state
    syncMesh(carState)

    // Proximity detection
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
}

main()

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
