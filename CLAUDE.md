# Personal Site — Claude Context

## Project Goal
Interactive 3D personal website inspired by bruno-simon.com.
User drives a low-poly car around a world. Buildings represent portfolio sections (About, Projects, Blog, Contact).
Drive near a building and press E to open it as a popup.

## Stack
- **Vite** + vanilla JS (ESM modules), no React, no TypeScript
- **Three.js** for 3D rendering
- No physics engine — car uses pure kinematic math
- Collision detection via geometric overlap tests (circle vs AABB, circle vs circle)

## File Structure
```
main.js                   game loop, wires everything together
src/core/
  renderer.js             WebGL renderer setup
  scene.js                lights, fog, background
  camera.js               follow camera (fixed world-space offset) + collision shake
  input.js                keyboard state (WASD + E)
src/entities/
  car.js                  car mesh + kinematic step + dust particles + collision wiring
  worldObjects.js         ground mesh + trees
  locations.js            portfolio buildings (mesh only, no physics)
src/physics/
  carPhysics.js           kinematic car state + stepCar()
  colliders.js            collider registry — AABB (buildings) + circle (trees) + world boundary
  collision.js            circle-vs-AABB, circle-vs-circle detection + bounce-back response
src/ui/
  ui.js                   proximity HUD prompt
  popup.js                location content popup
  collisionFlash.js       screen-edge red vignette flash on collision
```

## Car Design
- WASD / arrow keys: W/S = forward/backward, A/D = steer
- Pure kinematic: position/heading updated with math each step — no physics engine, no bouncing
- Fixed Y height (GROUND_Y = 0.3), never falls or bounces
- Front wheels visually steer (Y rotation). No wheel spin (user preference).
- Dust particles emit from rear when moving

## Collision System
- Car modeled as a circle collider (radius 1.0, encompassing the 1x1.9 body)
- Buildings use AABB colliders (half-width/half-depth from bodySize + 0.3 padding)
- Trees use circle colliders (radius 0.8)
- World boundary at |x| > 140 or |z| > 140
- On collision: push car out of overlap, `velocity *= -0.15` (arcade bounce-back)
- VFX on impact: camera shake (random offset decaying at 0.88/frame) + red vignette flash

## Game Loop
Fixed-timestep accumulator at 60 Hz decoupled from display framerate:
```
accumulate real delta time
while (accumulator >= 1/60):
  preStep(keys)   ← advance kinematic car state + resolve collisions
  accumulator -= 1/60
postStep()         ← sync mesh from state (once per render frame)
consumeCollision() ← trigger camera shake + screen flash if hit
camera update → render
```

## Conventions
- One named export per file (`createX` factory pattern)
- Module-level THREE reusables (`_euler`, `_quat`) — avoid per-frame allocation
- `carState` object is the single source of truth for car position/rotation/speed
- Proximity detection is pure distance math — no physics colliders needed for buildings
- After every file write or deletion, update this CLAUDE.md
