# Personal Site — Claude Context

## Project Goal
Interactive 3D personal website inspired by bruno-simon.com.
User drives a low-poly car around a world. Buildings represent portfolio sections (About, Projects, Blog, Contact).
Drive near a building and press E to open it as a popup.

## Stack
- **Vite** + vanilla JS (ESM modules), no React, no TypeScript
- **Three.js** for 3D rendering
- No physics engine — car uses pure kinematic math + capsule collision

## File Structure
```
main.js                   game loop, wires everything together
src/core/
  renderer.js             WebGL renderer setup
  scene.js                lights, fog, background
  camera.js               follow camera (fixed world-space offset)
  input.js                keyboard state (WASD + E)
src/entities/
  car.js                  car mesh + kinematic step + dust particles + collision feedback
  worldObjects.js         ground mesh + trees
  locations.js            portfolio buildings (mesh only, no physics)
src/physics/
  carPhysics.js           kinematic car state + stepCar()
  colliders.js            collider registry — AABB for buildings, circles for trees, world boundary
  collision.js            capsule collision detection (2-circle car model) + multi-iteration resolution
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
- **Capsule collider**: car modelled as 2 circles (r=0.5) along forward axis, offset ±0.45 from centre
- **AABB colliders** for buildings (from LOCATION_DEFS), with 0.15 padding
- **Circle colliders** for trees (r=0.8 each)
- **World boundary** at ±140 on both axes
- **Resolution**: up to 3 iterations per tick. Each iteration finds deepest penetration across both car circles and all colliders, pushes car out along collision normal, zeros normal velocity component, applies friction (0.7) to tangential component
- **Visual feedback**: `state.collided` flag triggers taillight flash (emissiveIntensity spike that decays)

## Game Loop
Fixed-timestep accumulator at 60 Hz decoupled from display framerate:
```
accumulate real delta time
while (accumulator >= 1/60):
  preStep(keys)   ← advance kinematic car state + resolve collisions
  accumulator -= 1/60
postStep()         ← sync mesh from state (once per render frame)
camera update → render
```

## Claude Workflow Rules
- **After every file write or deletion, update this CLAUDE.md** to reflect the current state of the project (file structure, design decisions, conventions).

## Conventions
- One named export per file (`createX` factory pattern)
- Module-level THREE reusables (`_euler`, `_quat`) — avoid per-frame allocation
- `carState` object is the single source of truth for car position/rotation/speed
- Proximity detection is pure distance math — no physics colliders needed for buildings
