# Personal Site — Claude Context

## Project Goal
Interactive 3D personal website inspired by bruno-simon.com.
User drives a low-poly car around a world. Buildings represent portfolio sections (About, Projects, Blog, Contact).
Drive near a building and press E to open it as a popup.
Interactive pushable objects (dominos, boxes, bouncy spheres) and knockable trees add physics playground feel.

## Stack
- **Vite** + vanilla JS (ESM modules), no React, no TypeScript
- **Three.js** for 3D rendering
- **Rapier** (`@dimforge/rapier3d-compat`) for full dynamic physics (hybrid kinematic car + dynamic objects)

## File Structure
```
main.js                   game loop, wires everything together (async init for Rapier)
src/core/
  renderer.js             WebGL renderer setup
  scene.js                lights, fog, background
  camera.js               follow camera (fixed world-space offset) + shake effect
  input.js                keyboard state (WASD + E)
src/entities/
  car.js                  car mesh + hybrid kinematic/dynamic step + dust particles + collision dust burst
  worldObjects.js         ground mesh + tree visual meshes (returned for Rapier body sync)
  locations.js            portfolio buildings (visual mesh only)
  interactables.js        interactive physics objects: dominos, box pyramid, bouncy spheres (Rapier dynamic bodies + Three.js meshes)
src/physics/
  engine.js               Rapier WASM init + world creation (gravity: {0, -20, 0})
  carPhysics.js           kinematic car math (stepCar) + Rapier sync helpers (syncToRapier, readFromRapier)
  colliders.js            Rapier collider world — car (dynamic body), buildings (fixed cuboids), trees (dynamic cylinders), ground (fixed cuboid), boundary walls
  (collision.js removed — Rapier solver handles all collision response)
src/ui/
  ui.js                   proximity HUD prompt
  popup.js                location content popup
```

## Car Design
- WASD / arrow keys: W/S = forward/backward, A/D = steer
- **Hybrid approach**: kinematic math computes desired heading/speed, then velocity is SET on a dynamic Rapier body
- Rapier's collision solver handles push-out naturally (car pushes objects, bounces off buildings)
- Position read back from Rapier body after world.step() captures collision response
- Fixed Y height maintained via stiff spring velocity (GROUND_Y = 0.3)
- Rotations locked on Rapier body — heading set directly from kinematic math
- Front wheels visually steer (Y rotation). No wheel spin (user preference).
- Dust particles emit from rear when moving

## Physics System — Rapier Hybrid
- **World gravity**: `{0, -20, 0}` — objects fall and stack realistically
- **Car** = Rapier Dynamic rigid body + cuboid collider (half-extents 0.5 x 0.19 x 0.95), rotations locked, ~15 mass
- **Movement** = kinematic math in `stepCar()` computes velocity, `syncToRapier()` sets it on body
- **After step** = `readFromRapier()` reads actual position back (captures collision push-out)
- **Buildings** = Fixed Rapier cuboids matching visual mesh dimensions (proper 3D half-heights)
- **Trees** = Dynamic Rapier cylinders (~8 mass, 0.3 linear damping) — car can knock them over
- **Ground** = Fixed cuboid (200x0.5x200) at y=-0.5
- **World boundary** = 4 invisible wall cuboids at |x|/|z| = 140, 10 units tall
- **VFX**: camera shake (intensity scales with impact speed) + dust burst on impact
- Collision detection uses `world.contactPairsWith()` for VFX triggers

## Interactive Objects
- **14 dominos** — thin cuboids (0.12x0.8x0.5), ~1.5 mass, arranged in arc near Projects building (x:14, z:-4)
- **14 colored boxes** — 0.8 cubes, ~3 mass, stacked in 3-2-1 pyramid near About building (x:5, z:-16)
- **8 bouncy spheres** — radius 0.45, ~2 mass, high restitution (0.6), scattered near Contact building (x:-5, z:16)
- All objects are Rapier dynamic bodies synced to Three.js meshes each frame

## Game Loop
Fixed-timestep accumulator at 60 Hz decoupled from display framerate:
```
await Rapier WASM init (top-level await)
accumulate real delta time
while (accumulator >= 1/60):
  carPreStep(keys)   ← stepCar() kinematic math + syncToRapier()
  world.step()       ← Rapier collision solver runs
  accumulator -= 1/60
carPostStep()         ← readFromRapier() + sync car mesh
syncDynamicBodies()   ← sync trees + interactables meshes from Rapier bodies
consume collision     ← trigger camera shake if impact occurred
camera update → render
```

## Claude Workflow Rules
- **After every file write or deletion, update this CLAUDE.md** to reflect the current state of the project (file structure, design decisions, conventions).

## Conventions
- One named export per file (`createX` factory pattern)
- Module-level THREE reusables (`_euler`, `_quat`) — avoid per-frame allocation
- `carState` object is the single source of truth for car position/rotation/speed
- Proximity detection is pure distance math — no physics colliders needed for buildings
- Rapier body → Three.js mesh sync done in main.js `_syncDynamicBodies()` helper
- Tree sync accounts for mesh origin (ground level) vs body origin (center of mass) offset
- `vite.config.js` targets `esnext` for top-level `await` (Rapier WASM init)
