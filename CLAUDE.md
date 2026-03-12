# Personal Site — Claude Context

## Project Goal
Interactive 3D personal website inspired by bruno-simon.com.
User drives a low-poly car around a world. Buildings represent portfolio sections (About, Projects, Blog, Contact).
Drive near a building and press E to open it as a popup.

## Stack
- **Vite** + vanilla JS (ESM modules), no React, no TypeScript
- **Three.js** for 3D rendering
- **cannon-es** for physics (RaycastVehicle)

## File Structure
```
main.js                   game loop, wires everything together
src/core/
  renderer.js             WebGL renderer setup
  scene.js                lights, fog, background
  camera.js               follow camera (fixed world-space offset)
  input.js                keyboard state (WASD + E)
src/entities/
  car.js                  car mesh + dust particles + postStep sync from physics
  worldObjects.js         ground mesh + trees (Three.js visuals only)
  locations.js            portfolio buildings (mesh only)
src/physics/
  engine.js               cannon-es World setup (gravity, ground plane, solver)
  carPhysics.js           RaycastVehicle (chassis body + 4 wheels, applyInput, syncState)
  colliders.js            static cannon-es bodies for buildings, trees, boundary walls
  collision.js            (legacy SAT collision — no longer used, kept for reference)
src/ui/
  ui.js                   proximity HUD prompt
  popup.js                location content popup
```

## Physics Architecture (cannon-es)
- **World**: gravity (0, -20, 0), SAPBroadphase, 10 solver iterations
- **Ground**: CANNON.Plane (static body, rotated to face +Y)
- **Car**: CANNON.Body (box 1x0.38x1.9, mass 80) + CANNON.RaycastVehicle with 4 wheels
  - Rear-wheel drive: engine force applied to wheels [2] and [3]
  - Front-wheel steering: wheels [0] and [1]
  - Suspension: stiffness 55, damping 4.0, rest length 0.35
- **Buildings**: static CANNON.Box bodies matching LOCATION_DEFS dimensions
- **Trees**: static CANNON.Cylinder bodies (radius 0.5, height 4)
- **Boundary walls**: 4 static CANNON.Box walls at +/-142 on X and Z axes

## Car Design
- WASD / arrow keys: W/S = forward/backward, A/D = steer
- RaycastVehicle physics: engine force + steering angle, cannon-es handles the rest
- Suspension keeps car grounded; car can tilt/bounce naturally
- Front wheels visually steer (Y rotation). No wheel spin (user preference).
- Dust particles emit from rear when moving

## Game Loop
Fixed-timestep accumulator at 60 Hz decoupled from display framerate:
```
accumulate real delta time
while (accumulator >= 1/60):
  applyInput(keys)  ← set engine force + steering on vehicle
  stepPhysics(dt)   ← advance cannon-es world
  accumulator -= 1/60
syncState()          ← copy physics body pos/quat into carState
carPostStep(carState) ← sync Three.js mesh from carState (once per render frame)
camera update → render
```

## Claude Workflow Rules
- **After every file write or deletion, update this CLAUDE.md** to reflect the current state of the project (file structure, design decisions, conventions).

## Conventions
- One named export per file (`createX` factory pattern)
- Module-level THREE reusables (`_euler`, `_quat`) — avoid per-frame allocation
- `carState` object is the single source of truth for car position/rotation/speed
- Proximity detection is pure distance math — no physics colliders needed for buildings
- cannon-es handles all collision detection and response
