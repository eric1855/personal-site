# Personal Site — Claude Context

## Project Goal
Interactive 3D personal website inspired by bruno-simon.com.
User drives a low-poly car around a world. Buildings represent portfolio sections (About, Projects, Blog, Contact).
Drive near a building and press E to open it as a popup.

## Stack
- **Vite** + vanilla JS (ESM modules), no React, no TypeScript
- **Three.js** for 3D rendering
- **Ammo.js** (Bullet physics engine compiled to JS via Emscripten) for physics

## File Structure
```
main.js                   async game loop, wires everything together
src/core/
  renderer.js             WebGL renderer setup
  scene.js                lights, fog, background
  camera.js               follow camera (fixed world-space offset)
  input.js                keyboard state (WASD + E)
src/entities/
  car.js                  car mesh + dust particles (visual only)
  worldObjects.js         ground mesh + trees + static physics colliders
  locations.js            portfolio buildings + static physics colliders
src/physics/
  ammoWorld.js            Ammo.js init, physics world, static body helpers
  carPhysics.js           btRaycastVehicle setup, preStep/postStep
src/ui/
  ui.js                   proximity HUD prompt
  popup.js                location content popup
```

## Physics Architecture (Ammo.js / Bullet)
- **ammoWorld.js**: Initializes Ammo.js, creates btDiscreteDynamicsWorld with gravity -9.81
  - Exports `initAmmoWorld()` (async), `getAmmo()`, `createStaticBody()`, `createDynamicBody()`
- **carPhysics.js**: Creates btRigidBody chassis (box, 800kg) + btRaycastVehicle with 4 wheels
  - Rear-wheel drive, front-wheel steering (lerped)
  - Suspension: stiffness 30, damping 4, compression 2
  - Engine force 2500N, brake force 80N, max steer 0.38 rad, steer lerp 0.10
  - **Speed-dependent steering**: at high speed, max steer angle scales down to 15% (factor = max(0.15, 1 - speed/15)) to prevent 180 spins
  - Angular factor constrained (0.1, 1, 0.3) to prevent easy rollover
  - **Angular velocity Y clamped** to +/-2.5 rad/s in postStep() to prevent excessive yaw
  - `preStep(keys)` applies engine/brake/steer from input (with speed-dependent steering reduction)
  - `postStep()` reads Bullet transform into carState, clamps angular velocity Y
- **Ground**: btStaticPlaneShape at Y=0
- **Trees**: 28 static btBoxShape colliders (trunk-sized)
- **Buildings**: 4 static btBoxShape colliders matching building dimensions

## Car Design
- WASD / arrow keys: W/S = forward/backward, A/D = steer
- Physics-based: btRaycastVehicle with suspension, friction, forces
- Car drops from Y=2 at start and settles on ground via physics
- Front wheels visually steer (Y rotation). No wheel spin (user preference).
- Dust particles emit from rear when moving

## Game Loop
```
async main():
  await initAmmoWorld()
  ... create scene, car, world ...

  loop(now):
    dt = capped real delta
    vehiclePreStep(keys)         <- apply forces from input
    world.stepSimulation(dt, 3)  <- Bullet steps at 60Hz internally
    vehiclePostStep()            <- read Bullet transform -> carState
    syncMesh(carState)           <- update Three.js mesh
    camera update -> render
```

## Claude Workflow Rules
- **After every file write or deletion, update this CLAUDE.md** to reflect the current state of the project (file structure, design decisions, conventions).

## Conventions
- One named export per file (`createX` factory pattern)
- Module-level THREE reusables (`_euler`, `_quat`) — avoid per-frame allocation
- `carState` object is the single source of truth for car position/rotation/speed
- Proximity detection is pure distance math — no physics colliders needed for buildings (HUD only)
- Ammo.js temp objects (btVector3, btTransform) allocated once in ammoWorld.js, reused
