# Personal Site — Claude Context

## Project Goal
Interactive 3D personal website inspired by bruno-simon.com.
User drives a low-poly car around a world. Buildings represent portfolio sections (About, Projects, Blog, Contact).
Drive near a building and press E to open it as a popup.
Drive into trees, dominos, boxes, and balls to knock them around — physics-driven fun!

## Stack
- **Vite** + vanilla JS (ESM modules), no React, no TypeScript
- **Three.js** for 3D rendering
- **cannon-es** for physics simulation (gravity, collisions, dynamic bodies)

## File Structure
```
main.js                   game loop, wires everything together, syncs physics→meshes
src/core/
  renderer.js             WebGL renderer setup
  scene.js                lights, fog, background
  camera.js               follow camera (fixed world-space offset) + shake
  input.js                keyboard state (WASD + E)
src/entities/
  car.js                  car mesh + dust particles, syncs from cannon body
  worldObjects.js         ground (static) + trees (dynamic, knockable)
  locations.js            portfolio buildings (static cannon bodies)
  interactables.js        dominos, box stacks, bouncy spheres (all dynamic)
src/physics/
  engine.js               cannon-es world, broadphase, contact materials
  carPhysics.js           cannon body for car + velocity-driven stepCar()
src/ui/
  ui.js                   proximity HUD prompt + WASD key display
  popup.js                location content popup (Esc to close)
```

## Physics Design (cannon-es)
- CANNON.World with gravity (0, -20, 0), SAPBroadphase, sleeping enabled
- Car = CANNON.Body (mass 50, box shape) — velocity-driven each frame (not force-driven)
  - stepCar() reads input, sets body.velocity directly (arcade-style control)
  - Angular rotation locked to Y axis (car doesn't flip)
  - Body quaternion set from heading angle each tick
- Buildings = CANNON.Body.STATIC — can't be knocked over
- Trees = dynamic CANNON.Body (mass 8) — compound shape (cylinder trunk + sphere foliage)
- Interactable objects:
  - Dominos (mass 1.5) — arc of 14 thin boxes near Projects building
  - Box stack (mass 3 each) — 3-2-1 pyramid of 14 colored cubes near About building
  - Bouncy spheres (mass 2) — 8 colorful balls near Contact building
- Contact materials define friction/restitution between car, ground, objects, buildings
- All dynamic Three.js meshes synced from cannon body position/quaternion each frame

## Car Design
- WASD / arrow keys: W/S = forward/backward, A/D = steer
- Velocity-driven: heading updated with math, velocity set on cannon body each tick
- Car body locked to Y rotation only (never tips over)
- Y position clamped to GROUND_Y = 0.3 minimum
- Front wheels visually steer (Y rotation). No wheel spin (user preference).
- Dust particles emit from rear when moving

## Game Loop
Fixed-timestep accumulator at 60 Hz decoupled from display framerate:
```
accumulate real delta time
while (accumulator >= 1/60):
  carPreStep(keys)         ← set velocity on cannon body from input
  world.step(1/60)         ← cannon-es resolves all collisions
  accumulator -= 1/60
carPostStep()              ← sync car mesh from body
syncDynamicBodies()        ← sync trees + interactables
camera update → render
```

## Claude Workflow Rules
- **After every file write or deletion, update this CLAUDE.md** to reflect the current state of the project (file structure, design decisions, conventions).

## Conventions
- One named export per file (`createX` factory pattern)
- Module-level THREE reusables (`_euler`, `_quat`) — avoid per-frame allocation
- `carState` object wraps cannon body + kinematic state (speed, heading, steer)
- Proximity detection is pure distance math — no physics colliders needed for UI triggers
- Dynamic body meshes synced via position.copy + quaternion.set each render frame
