# Personal Site — Claude Context

## Project Goal
Interactive 3D personal website inspired by bruno-simon.com.
User drives a low-poly car around a world. Buildings represent portfolio sections (About, Projects, Blog, Contact).
Drive near a building and press E to open it as a popup.

## Stack
- **Vite** + vanilla JS (ESM modules), no React, no TypeScript
- **Three.js** for 3D rendering
- **Rapier** (`@dimforge/rapier3d-compat`) for physics — dynamic vehicle body + static colliders

## File Structure
```
main.js                   game loop (async init), wires everything together
src/core/
  renderer.js             WebGL renderer setup
  scene.js                lights, fog, background
  camera.js               follow camera (fixed world-space offset) + shake effect
  input.js                keyboard state (WASD + E)
src/entities/
  car.js                  car mesh + dust particles, delegates physics to carPhysics.js
  worldObjects.js         ground mesh + 28 trees (exports TREE_POSITIONS)
  locations.js            portfolio buildings (exports LOCATION_DEFS)
src/physics/
  rapierWorld.js          Rapier WASM init, world creation, static collider helpers
  carPhysics.js           Rapier dynamic body car — forces, torque, lateral grip
src/ui/
  ui.js                   proximity HUD prompt
  popup.js                location content popup
```

## Physics System (Rapier)
- **Rapier World**: gravity `{0, -30, 0}`, stepped at 60 Hz in the game loop
- **Car**: dynamic RigidBody with cuboid collider (half-extents 0.5, 0.19, 0.95)
  - Movement via `addForce()` in forward direction
  - Steering via `applyTorqueImpulse()` around Y axis, scaled by speed
  - Lateral grip: ~92% of sideways velocity cancelled each step (tire friction simulation)
  - Rotation locked to Y-axis: `enabledRotations(false, true, false)`
  - Speed clamped to MAX_SPEED = 22
- **Buildings**: fixed RigidBody + cuboid colliders (dimensions from LOCATION_DEFS bodySize)
- **Trees**: fixed RigidBody + cylinder colliders (radius 0.5, half-height 2.0)
- **Ground**: fixed cuboid collider (150 x 0.5 x 150, top surface at y=0)
- **Boundary walls**: fixed cuboid colliders at |x|=141, |z|=141

## Car State
`carState` object exposes: `position` (THREE.Vector3), `rotation` (heading angle), `velocity` (signed scalar), `speed` (absolute), `steer` (visual steer angle).
Synced from Rapier body each frame in `postStep()`.

## Car Design
- WASD / arrow keys: W/S = forward/backward, A/D = steer
- Front wheels visually steer (Y rotation). No wheel spin (user preference).
- Dust particles emit from rear when moving

## Game Loop
Fixed-timestep accumulator at 60 Hz decoupled from display framerate:
```
await Rapier init (top-level await)
accumulate real delta time
while (accumulator >= 1/60):
  carPreStep(keys)   ← apply forces/torque to Rapier body
  stepPhysics()      ← Rapier world.step()
  accumulator -= 1/60
carPostStep(keys)    ← sync carState from Rapier, sync Three.js mesh
camera update → render
```

## Claude Workflow Rules
- **After every file write or deletion, update this CLAUDE.md** to reflect the current state of the project (file structure, design decisions, conventions).

## Conventions
- One named export per file (`createX` factory pattern)
- Module-level THREE reusables (`_euler`, `_quat`) — avoid per-frame allocation
- `carState` object is the single source of truth for car position/rotation/speed
- Proximity detection is pure distance math — no physics colliders needed for building interaction
- All collision detection handled by Rapier — no manual SAT
