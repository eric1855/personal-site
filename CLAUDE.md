# Personal Site — Claude Context

## Project Goal
Interactive 3D personal website inspired by bruno-simon.com.
User drives a low-poly car around a world. Buildings represent portfolio sections (About, Projects, Blog, Contact).
Drive near a building and press E to open it as a popup.

## Stack
- **Vite** + vanilla JS (ESM modules), no React, no TypeScript
- **Three.js** for 3D rendering
- **Oimo.js** for physics (lightweight ~80KB pure JS engine, no WASM)

## File Structure
```
main.js                   game loop, wires everything together
src/core/
  renderer.js             WebGL renderer setup
  scene.js                lights, fog, background
  camera.js               follow camera (fixed world-space offset) + shake effect
  input.js                keyboard state (WASD + E)
src/entities/
  car.js                  car mesh + dust particles + Oimo body sync
  worldObjects.js         ground mesh + trees + static Oimo bodies (ground, trees, walls)
  locations.js            portfolio buildings + static Oimo bodies
src/physics/
  engine.js               Oimo.World setup (gravity, timestep, broadphase)
  carPhysics.js           car driving logic (velocity/angular velocity on Oimo body)
src/ui/
  ui.js                   proximity HUD prompt
  popup.js                location content popup
```

## Physics Architecture (Oimo.js)
- **World**: Oimo.World with gravity [0, -20, 0], timestep 1/60, SAP broadphase
- **Car**: Dynamic rigid body (box shape 1.0 x 0.38 x 1.9), driven by setting linearVelocity (forward/backward) and angularVelocity.y (steering)
- **Ground**: Static box body (300 x 1 x 300) at Y = -0.5 (top surface at Y = 0)
- **Buildings**: Static box bodies matching visual geometry
- **Trees**: Static cylinder bodies (radius ~0.35 * scale, height ~2.0 * scale)
- **Walls**: 4 invisible static box bodies forming world boundary at |x|, |z| = 150
- Oimo handles all collision detection and response automatically
- Car is kept upright by zeroing X/Z angular velocity and clamping orientation to Y-only rotation each frame

## Car Design
- WASD / arrow keys: W/S = forward/backward, A/D = steer
- Oimo dynamic body: position/rotation updated by physics engine each step
- Driving via direct linearVelocity manipulation along car's forward axis
- Steering via angularVelocity.y with bell-curve turn rate (peaks at ~40% max speed)
- Lateral drift damped (70% per frame) for controllable feel
- Front wheels visually steer (Y rotation). No wheel spin (user preference).
- Dust particles emit from rear when moving

## Game Loop
Fixed-timestep accumulator at 60 Hz decoupled from display framerate:
```
accumulate real delta time
while (accumulator >= 1/60):
  carPreStep(keys)   ← apply input forces to Oimo body
  world.step()       ← advance Oimo physics
  accumulator -= 1/60
carPostStep()        ← sync Three.js mesh from Oimo body (once per render frame)
camera update → render
```

## Claude Workflow Rules
- **After every file write or deletion, update this CLAUDE.md** to reflect the current state of the project (file structure, design decisions, conventions).

## Conventions
- One named export per file (`createX` factory pattern)
- Module-level THREE reusables — avoid per-frame allocation
- `carState` object is the public interface for car position/rotation/speed (synced from Oimo body each frame)
- Proximity detection is pure distance math — no physics colliders needed for building interaction
- Physics uses Oimo.js — all collision detection/response is handled by the engine
