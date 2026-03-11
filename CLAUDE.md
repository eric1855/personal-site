# Personal Site — Claude Context

## Project Goal
Interactive 3D personal website inspired by bruno-simon.com.
User drives a low-poly car around a world. Buildings represent portfolio sections (About, Projects, Blog, Contact).
Drive near a building and press E to open it as a popup.

## Stack
- **Vite** + vanilla JS (ESM modules), no React, no TypeScript
- **Three.js** for 3D rendering
- No physics engine — car uses pure kinematic math + circle-based collision

## File Structure
```
main.js                   game loop, wires everything together, screen tint overlay
src/core/
  renderer.js             WebGL renderer setup
  scene.js                lights, fog, background
  camera.js               follow camera (fixed world-space offset)
  input.js                keyboard state (WASD + E)
src/entities/
  car.js                  car mesh + kinematic step + dust particles + collision dust burst
  worldObjects.js         ground mesh + trees (28 positions)
  locations.js            portfolio buildings (mesh only)
src/physics/
  carPhysics.js           kinematic car state + stepCar()
  colliders.js            AABB colliders (buildings) + circle colliders (trees) registry
  collision.js            circle-vs-AABB / circle-vs-circle detection + wall-slide response
src/ui/
  ui.js                   proximity HUD prompt
  popup.js                location content popup
```

## Collision System
- Car modelled as a circle (radius 1.0)
- Buildings use AABB colliders (half-width/half-depth + 0.3 padding)
- Trees use circle colliders (radius ~0.8 scaled per tree)
- Response: push out of overlap, decompose velocity into normal/tangent
  - Zero the normal component for wall sliding
  - Speed-dependent bounce: if speed > 0.08, reflect a fraction along the normal
- World boundary at |x| or |z| > 140
- Dust burst emitted at collision contact point (12 particles)
- Screen tint: brief red/orange radial gradient overlay that fades in ~200ms

## Car Design
- WASD / arrow keys: W/S = forward/backward, A/D = steer
- Pure kinematic: position/heading updated with math each step — no physics engine
- Fixed Y height (GROUND_Y = 0.3), never falls or bounces
- Front wheels visually steer (Y rotation). No wheel spin (user preference).
- Dust particles emit from rear when moving

## Game Loop
Fixed-timestep accumulator at 60 Hz decoupled from display framerate:
```
accumulate real delta time
while (accumulator >= 1/60):
  preStep(keys)   ← stepCar() then resolveCollisions()
  accumulator -= 1/60
postStep()         ← sync mesh from state (once per render frame)
fade tint → camera update → render
```

## Claude Workflow Rules
- **After every file write or deletion, update this CLAUDE.md** to reflect the current state of the project (file structure, design decisions, conventions).

## Conventions
- One named export per file (`createX` factory pattern)
- Module-level THREE reusables (`_euler`, `_quat`) — avoid per-frame allocation
- `carState` object is the single source of truth for car position/rotation/speed
- Proximity detection is pure distance math — no physics colliders needed for buildings
- Collision uses pure math (circle vs AABB, circle vs circle) — no physics engine
