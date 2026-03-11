# Personal Site — Claude Context

## Project Goal
Interactive 3D personal website inspired by bruno-simon.com.
User drives a low-poly car around a world. Buildings represent portfolio sections (About, Projects, Blog, Contact).
Drive near a building and press E to open it as a popup.

## Stack
- **Vite** + vanilla JS (ESM modules), no React, no TypeScript
- **Three.js** for 3D rendering
- No physics engine — car uses pure kinematic math with OBB collision via SAT

## File Structure
```
main.js                   game loop, wires everything together
src/core/
  renderer.js             WebGL renderer setup
  scene.js                lights, fog, background
  camera.js               follow camera (fixed world-space offset) + shake effect
  input.js                keyboard state (WASD + E)
src/entities/
  car.js                  car mesh + kinematic step + dust particles + collision dust burst
  worldObjects.js         ground mesh + trees
  locations.js            portfolio buildings (mesh only, no physics)
src/physics/
  carPhysics.js           kinematic car state + stepCar()
  colliders.js            collider registry — AABB (buildings) + circle (trees)
  collision.js            OBB-vs-AABB and OBB-vs-Circle SAT detection + resolution
src/ui/
  ui.js                   proximity HUD prompt
  popup.js                location content popup
```

## Car Design
- WASD / arrow keys: W/S = forward/backward, A/D = steer
- Pure kinematic: position/heading updated with math each step — no physics engine, no bouncing
- Fixed Y height (GROUND_Y = 0.3), never falls or bounces
- Front wheels visually steer (Y rotation). No wheel spin (user preference).
- Dust particles emit from rear when moving

## Collision System
- **OBB (Oriented Bounding Box)** for the car: half-extents (0.5, 0.95) — matches the 1.0 x 1.9 body
- **SAT (Separating Axis Theorem)** for detection against:
  - **AABB colliders** for buildings (4 axes: car-localX, car-localZ, world-X, world-Z)
  - **Circle colliders** for trees (closest-point-on-OBB method, radius 0.8)
- **Resolution**: push car out along minimum-penetration axis, zero normal velocity component (slide along walls, no bounce)
- **World boundary**: car is clamped to |x| < 140, |z| < 140
- **VFX**: camera shake (intensity scales with impact speed) + dust burst on impact
- Collision runs after `stepCar()` in `preStep()`, before mesh sync

## Game Loop
Fixed-timestep accumulator at 60 Hz decoupled from display framerate:
```
accumulate real delta time
while (accumulator >= 1/60):
  preStep(keys)   ← advance kinematic car state + resolve collisions
  accumulator -= 1/60
postStep()         ← sync mesh from state (once per render frame)
consume collision  ← trigger camera shake if impact occurred
camera update → render
```

## Claude Workflow Rules
- **After every file write or deletion, update this CLAUDE.md** to reflect the current state of the project (file structure, design decisions, conventions).

## Conventions
- One named export per file (`createX` factory pattern)
- Module-level THREE reusables (`_euler`, `_quat`) — avoid per-frame allocation
- `carState` object is the single source of truth for car position/rotation/speed
- Proximity detection is pure distance math — no physics colliders needed for buildings
- Collision uses pure math (SAT) — no physics engine
