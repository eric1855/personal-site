# Personal Site — Claude Context

## Project Goal
Interactive 3D personal website inspired by bruno-simon.com.
User drives a low-poly car around a world. Buildings represent portfolio sections (About, Projects, Blog, Contact).
Drive near a building and press E to open it as a popup.

## Stack
- **Vite** + vanilla JS (ESM modules), no React, no TypeScript
- **Three.js** for 3D rendering
- **Rapier** (`@dimforge/rapier3d-compat`) for collision detection (hybrid kinematic approach)

## File Structure
```
main.js                   game loop, wires everything together (async init for Rapier)
src/core/
  renderer.js             WebGL renderer setup
  scene.js                lights, fog, background
  camera.js               follow camera (fixed world-space offset) + shake effect
  input.js                keyboard state (WASD + E)
src/entities/
  car.js                  car mesh + kinematic step + dust particles + collision dust burst
  worldObjects.js         ground mesh + trees (visual only)
  locations.js            portfolio buildings (visual mesh only)
src/physics/
  engine.js               Rapier WASM init + world creation (zero gravity)
  carPhysics.js           kinematic car state + stepCar() (pure math, no Rapier)
  colliders.js            Rapier collider world — car (kinematic body), buildings (fixed cuboids), trees (fixed cylinders), boundary walls
  collision.js            Rapier-based collision detection + resolution (push-out + velocity damping)
src/ui/
  ui.js                   proximity HUD prompt
  popup.js                location content popup
```

## Car Design
- WASD / arrow keys: W/S = forward/backward, A/D = steer
- Hybrid kinematic: position/heading updated with pure math each step, collision detection via Rapier
- Fixed Y height (GROUND_Y = 0.3), never falls or bounces
- Front wheels visually steer (Y rotation). No wheel spin (user preference).
- Dust particles emit from rear when moving

## Collision System — Rapier Hybrid
- **Car** = Rapier `KinematicPositionBased` rigid body + cuboid collider (half-extents 0.5 x 50 x 0.95)
- **Movement** = pure kinematic math in `stepCar()` — no Rapier forces
- **Detection** = Rapier broadphase/narrowphase via `contactPairsWith()` + `contactPair()`
- **Resolution** = push car out along contact normal by penetration depth, zero velocity component into wall (slide, no bounce)
- **Buildings** = fixed Rapier cuboids matching visual mesh dimensions
- **Trees** = fixed Rapier cylinders (radius 0.5)
- **World boundary** = 4 invisible wall cuboids at |x|/|z| = 140
- **Y trick**: all colliders share the same Y center (GROUND_Y) and a large half-height (50) so Rapier's SAT always produces XZ normals, never vertical push
- **Active collision types**: `KINEMATIC_FIXED` explicitly enabled (Rapier skips kinematic-vs-fixed by default)
- **VFX**: camera shake (intensity scales with impact speed) + dust burst on impact
- Collision runs after `stepCar()` in `preStep()`, before mesh sync

## Game Loop
Fixed-timestep accumulator at 60 Hz decoupled from display framerate:
```
await Rapier WASM init (top-level await)
accumulate real delta time
while (accumulator >= 1/60):
  preStep(keys)   ← stepCar() + stepPhysicsAndResolve()
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
- Collision uses Rapier for detection, pure math for resolution
- `vite.config.js` targets `esnext` for top-level `await` (Rapier WASM init)
