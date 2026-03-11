# Personal Site — Claude Context

## Project Goal
Interactive 3D personal website inspired by bruno-simon.com.
User drives a low-poly car around a world. Buildings represent portfolio sections (About, Projects, Blog, Contact).
Drive near a building and press E to open it as a popup.

## Stack
- **Vite** + vanilla JS (ESM modules), no React, no TypeScript
- **Three.js** for 3D rendering
- **Rapier** (`@dimforge/rapier3d-compat`) for WASM-based physics simulation

## File Structure
```
main.js                   game loop, async Rapier init, wires everything together
src/core/
  renderer.js             WebGL renderer setup
  scene.js                lights, fog, background
  camera.js               follow camera (fixed world-space offset) + shake effect
  input.js                keyboard state (WASD + E)
src/entities/
  car.js                  car mesh + dust particles, delegates physics to carPhysics
  worldObjects.js         ground mesh + trees + Rapier static colliders + world boundary walls
  locations.js            portfolio buildings (mesh + Rapier static colliders)
src/physics/
  engine.js               Rapier WASM init + world creation (async)
  carPhysics.js           Rapier dynamic RigidBody car — forces, torque, lateral grip, state sync
src/ui/
  ui.js                   proximity HUD prompt
  popup.js                location content popup
```

## Physics (Rapier)
- **Async init**: `engine.js` calls `RAPIER.init()` before any physics objects are created. `main.js` uses top-level `await`.
- **World**: gravity `{ x: 0, y: -30, z: 0 }`
- **Car**: dynamic RigidBody with cuboid collider (half-extents 0.5, 0.19, 0.95). Movement via `addForce()` in forward direction, steering via `applyTorqueImpulse()` around Y. Lateral grip cancels sideways sliding each step.
- **Buildings**: fixed RigidBody + cuboid collider matching each building's bodySize
- **Trees**: fixed RigidBody + cylinder collider (radius ~0.4*scale, height ~2.5*scale)
- **Ground**: fixed cuboid at y=-0.5 (half-extents 150, 0.5, 150)
- **World boundary**: 4 invisible wall colliders at |x|=140, |z|=140
- **Collision**: handled entirely by Rapier's solver — no custom SAT code

## Car Design
- WASD / arrow keys: W/S = forward/backward, A/D = steer
- Rapier dynamic body with forces/torques — realistic sliding and collisions
- Lateral grip: 92% of sideways velocity cancelled each step (simulates tire friction)
- Front wheels visually steer based on angular velocity. No wheel spin (user preference).
- Dust particles emit from rear when moving

## Game Loop
Fixed-timestep accumulator at 60 Hz decoupled from display framerate:
```
await RAPIER.init()           ← async WASM init (top-level await)
accumulate real delta time
while (accumulator >= 1/60):
  carPreStep(keys)            ← apply forces/torques based on input + lateral grip
  stepPhysics()               ← advance Rapier world one timestep
  accumulator -= 1/60
carPostStep()                 ← sync Three.js meshes from Rapier bodies (once per render frame)
camera update → render
```

## Claude Workflow Rules
- **After every file write or deletion, update this CLAUDE.md** to reflect the current state of the project (file structure, design decisions, conventions).

## Conventions
- One named export per file (`createX` factory pattern)
- Module-level THREE reusables (`_euler`, `_quat`) — avoid per-frame allocation
- `carState` object is the single source of truth for car position/rotation/speed (synced from Rapier each frame)
- Proximity detection is pure distance math — no physics colliders needed for buildings (proximity check)
- Rapier WASM must be initialized before any RAPIER objects are created
- `vite.config.js` sets `build.target: 'esnext'` for top-level await support
