# Personal Site — Claude Context

## Project Goal
Interactive 3D personal website inspired by bruno-simon.com.
User drives a low-poly car around a world. Buildings represent portfolio sections (About, Projects, Blog, Contact).
Drive near a building and press E to open it as a popup.

## Stack
- **Vite** + vanilla JS (ESM modules), no React, no TypeScript
- **Three.js** for 3D rendering
- No physics engine — car uses pure kinematic math

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
  colliders.js            collider registry — AABB (buildings, world bounds) + circle (trees)
  collision.js            AABB-vs-AABB & AABB-vs-Circle detection + push-out resolution
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
- **Approach:** AABB-first — car modelled as axis-aligned bounding box (ignores rotation)
- **Car AABB half-extents:** hx=0.5, hz=0.95 (from BoxGeometry 1 x 1.9)
- **Building colliders:** AABB derived from bodySize {w, d} + 0.15 margin
- **Tree colliders:** Circle with radius 0.8 at each tree position
- **World boundary:** Four AABB walls at |x|=140, |z|=140
- **Resolution:** Push car out along smallest overlap axis
- **Speed-dependent bounce:** velocity *= -0.1 if fast (>0.04), else velocity = 0
- **Camera shake:** 12-frame decaying random offset on collision

## Game Loop
Fixed-timestep accumulator at 60 Hz decoupled from display framerate:
```
accumulate real delta time
while (accumulator >= 1/60):
  preStep(keys)   ← advance kinematic car state, then resolve collisions
  accumulator -= 1/60
postStep()         ← sync mesh from state (once per render frame)
camera update(carState, didCollide) → render
```

## Claude Workflow Rules
- **After every file write or deletion, update this CLAUDE.md** to reflect the current state of the project (file structure, design decisions, conventions).

## Conventions
- One named export per file (`createX` factory pattern)
- Module-level THREE reusables (`_euler`, `_quat`) — avoid per-frame allocation
- `carState` object is the single source of truth for car position/rotation/speed
- Proximity detection is pure distance math — no physics colliders needed for buildings
- Collision detection runs every physics tick (60 Hz), after stepCar but before mesh sync
