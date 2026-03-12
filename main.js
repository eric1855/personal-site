/**
 * Main game loop — Rapier hybrid physics with interactive world objects.
 *
 * Fixed-timestep accumulator at 60 Hz. Each tick:
 *   1. Process car input (kinematic math computes desired velocity)
 *   2. Sync car velocity to Rapier dynamic body
 *   3. Step the Rapier world (resolves all collisions dynamically)
 *   4. Read car position back from Rapier (captures push-out)
 *   5. Sync all Three.js meshes from Rapier bodies
 */
import { createRenderer }      from './src/core/renderer.js'
import { createScene }          from './src/core/scene.js'
import { createCamera }         from './src/core/camera.js'
import { createInput }          from './src/core/input.js'
import { createPhysicsEngine }  from './src/physics/engine.js'
import { createColliderWorld }  from './src/physics/colliders.js'
import { createCar }            from './src/entities/car.js'
import { createWorldObjects }   from './src/entities/worldObjects.js'
import { createLocations }      from './src/entities/locations.js'
import { createInteractables }  from './src/entities/interactables.js'
import { createUI }             from './src/ui/ui.js'
import { createPopup }          from './src/ui/popup.js'

// ── Boot — Rapier WASM must be initialised before anything else ───
const { RAPIER, world } = await createPhysicsEngine()

// ── Rendering ───────────────────────────────────────────────────
const { renderer } = createRenderer()
const { scene }    = createScene()
const { camera, update: updateCamera, shake: shakeCamera } = createCamera(window.innerWidth / window.innerHeight)

// ── Input ───────────────────────────────────────────────────────
const { keys } = createInput()

// ── World (visual meshes) ───────────────────────────────────────
const { treeMeshes } = createWorldObjects(scene)
const { locations }  = createLocations(scene)

// ── Rapier colliders (buildings, trees, boundary walls, ground) + car body ───
const { carBody, carCollider, treeBodies } = createColliderWorld(RAPIER, world)

// ── Wire tree meshes to their Rapier bodies for sync ────────────
const treeSyncList = treeMeshes.map((tm, i) => ({
  mesh: tm.mesh,
  body: treeBodies[i].body,
  scale: tm.scale,
}))

// ── Car (hybrid kinematic + dynamic Rapier) ─────────────────────
const { carState, preStep: carPreStep, postStep: carPostStep, consumeCollision } =
  createCar(scene, { RAPIER, world, carBody, carCollider })

// ── Interactive objects (dominos, boxes, spheres) ────────────────
const { syncList: interactSyncList } = createInteractables(scene, RAPIER, world)

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
      // 1. Kinematic math + sync velocity to Rapier body
      carPreStep(keys)

      // 2. Step the Rapier physics world (collision solver runs here)
      world.step()
    }
    accumulator -= FIXED_DT
  }

  // 3. Sync all meshes from Rapier bodies
  carPostStep()
  _syncDynamicBodies(treeSyncList)
  _syncDynamicBodies(interactSyncList)

  // Camera shake on collision
  const impactSpeed = consumeCollision()
  if (impactSpeed > 0) {
    const MAX_SPEED = 0.18
    const intensity = 0.03 + (impactSpeed / MAX_SPEED) * 0.10
    shakeCamera(intensity)
  }

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
    const pos = body.translation()
    const rot = body.rotation()

    if (scale) {
      // Trees: the Rapier body center is at the middle of the tree.
      // The Three.js mesh group has its origin at ground level (y=0) and is scaled.
      // We need to offset: mesh.y = body.y - halfHeight
      // halfHeight = 4.0 * scale / 2 = 2.0 * scale
      const halfH = 2.0 * scale
      mesh.position.set(pos.x, pos.y - halfH, pos.z)
      mesh.quaternion.set(rot.x, rot.y, rot.z, rot.w)
    } else {
      mesh.position.set(pos.x, pos.y, pos.z)
      mesh.quaternion.set(rot.x, rot.y, rot.z, rot.w)
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
