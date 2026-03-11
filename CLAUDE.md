# Personal Site — Claude Context

## Project Goal
Interactive 3D personal website inspired by bruno-simon.com.
User drives a low-poly car around a world. Buildings represent portfolio sections (About, Projects, Blog, Contact).
Drive near a building and press E to open it as a popup.

## Stack
- **Vite** + vanilla JS (ESM modules), no React, no TypeScript
- **Three.js** for 3D rendering
- **cannon-es** for physics simulation, running in a **Web Worker** (off main thread)

## Architecture
```
Main Thread (main.js):            Web Worker (physicsWorker.js):
  Input handling (WASD/E)    →     Receive input via postMessage
  Three.js rendering          ←     CANNON.World.step() at 60 Hz
  Mesh sync from transforms   ←     Post car transforms back
  UI / popups                       Collision detection (cannon-es)
```

## File Structure
```
main.js                        render loop, wires everything together
src/core/
  renderer.js                  WebGL renderer setup
  scene.js                     lights, fog, background
  camera.js                    follow camera (fixed world-space offset + shake)
  input.js                     keyboard state (WASD + E)
src/entities/
  car.js                       car mesh + dust particles + syncFromPhysics()
  worldObjects.js              ground mesh + trees (visual only)
  locations.js                 portfolio buildings (visual mesh + popup data)
src/physics/
  physicsBridge.js             main-thread ↔ worker bridge (postMessage)
  physicsWorker.js             Web Worker: CANNON.World, car body, static colliders
  carPhysics.js                (legacy) kinematic car state — no longer used
  colliders.js                 (legacy) AABB/circle collider registry — no longer used
  collision.js                 (legacy) SAT collision detection — no longer used
  engine.js                    (legacy) Rapier init — no longer used
src/ui/
  ui.js                        proximity HUD prompt
  popup.js                     location content popup
```

## Physics (cannon-es in Web Worker)
- **physicsWorker.js** owns the CANNON.World and runs at 60 Hz via `setTimeout`
- Car = CANNON.Body (box, mass 80) with velocity-driven forces
- Buildings = static CANNON.Body boxes
- Trees = static CANNON.Body cylinders
- Ground = static CANNON.Plane
- World boundary = 4 invisible static walls at ±140
- Worker receives `{ type: 'input', keys }` from main thread
- Worker posts `{ type: 'frame', car: { px, py, pz, qx, qy, qz, qw, heading, speed, steer } }` each step
- **physicsBridge.js** spawns the worker, exposes `carState` (THREE.Vector3/Quaternion) + `sendInput()`

## Car Design
- WASD / arrow keys: W/S = forward/backward, A/D = steer
- Physics-driven: forces applied to CANNON.Body each step
- Lateral friction simulates car-like (non-holonomic) movement
- Car constrained to Y-axis rotation only (no tipping)
- Front wheels visually steer. No wheel spin (user preference).
- Dust particles emit from rear when speed > threshold

## Render Loop
Main thread runs a simple `requestAnimationFrame` loop:
1. Send current input to worker via `sendInput(keys)`
2. Read latest `carState` (position, quaternion, steer, speed) from bridge
3. Sync Three.js mesh via `syncFromPhysics(carState)`
4. Update camera, proximity detection, render

Physics stepping is fully decoupled in the worker thread.

## Claude Workflow Rules
- **After every file write or deletion, update this CLAUDE.md** to reflect the current state of the project (file structure, design decisions, conventions).

## Conventions
- One named export per file (`createX` factory pattern)
- Module-level THREE reusables — avoid per-frame allocation
- `carState` in physicsBridge is the single source of truth for car position/rotation/speed
- Proximity detection is pure distance math — no physics colliders needed for buildings
- Physics worker communicates via postMessage (structured clone)
