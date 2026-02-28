import { createRenderer }      from './src/core/renderer.js'
import { createScene }         from './src/core/scene.js'
import { createCamera }        from './src/core/camera.js'
import { createInput }         from './src/core/input.js'
import { createPhysicsEngine } from './src/physics/engine.js'
import { createCarPhysics }    from './src/physics/carPhysics.js'
import { createCar }           from './src/entities/car.js'
import { createWorldObjects }  from './src/entities/worldObjects.js'
import { createUI }            from './src/ui/ui.js'

async function init() {
  // 1. Physics MUST init first — Rapier WASM is async
  const { world, step } = await createPhysicsEngine()

  // 2. Rendering infrastructure
  const { renderer } = createRenderer()
  const { scene }    = createScene()
  const { camera, update: updateCamera } = createCamera(
    window.innerWidth / window.innerHeight
  )

  // 3. Input
  const { keys } = createInput()

  // 4. World objects — ground collider + trees
  createWorldObjects(scene, world)

  // 5. Car — physics body first, then mesh + state
  const { rigidBody }                   = createCarPhysics(world)
  const { carState, update: updateCar } = createCar(scene, rigidBody)

  // 6. HUD overlay
  createUI()

  // 7. Resize handler
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
  })

  // 8. Game loop
  // Frame order is critical:
  //   updateCar  → computes new position, pushes kinematic targets to physics body
  //   step()     → world.step() processes kinematic targets + resolves collisions
  //   updateCamera → reads carState written by updateCar
  //   render
  function loop() {
    requestAnimationFrame(loop)
    updateCar(keys)
    step()
    updateCamera(carState)
    renderer.render(scene, camera)
  }

  loop()
}

init()
