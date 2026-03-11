# Personal Site — Claude Context

## Project Goal
Interactive 3D personal website inspired by bruno-simon.com.
User drives a low-poly car around a world. Buildings represent portfolio sections (About, Projects, Blog, Contact).
Drive near a building and press E to open it as a popup.

## Stack
- **Vite** + vanilla JS (ESM modules), no React, no TypeScript
- **Three.js** for 3D rendering
- **cannon-es** physics engine with custom spring-damper suspension

## File Structure
```
main.js                   game loop, wires everything together
src/core/
  renderer.js             WebGL renderer setup
  scene.js                lights, fog, background
  camera.js               follow camera (fixed world-space offset) + shake effect
  input.js                keyboard state (WASD + E)
src/entities/
  car.js                  car mesh + syncs Three.js visuals from cannon-es state + dust particles
  worldObjects.js         ground mesh + trees (Three.js visuals only)
  locations.js            portfolio buildings (Three.js mesh + interaction data)
src/physics/
  cannonWorld.js          CANNON.World setup (gravity, broadphase, solver, materials)
  groundBody.js           static ground plane body
  staticBodies.js         static bodies for buildings, trees, world boundary walls
  springCar.js            custom spring-damper suspension car (chassis + 4 wheel bodies)
src/ui/
  ui.js                   proximity HUD prompt + WASD key display
  popup.js                location content popup (glassmorphism panel)
```

## Physics Architecture — Custom Spring Suspension
- **Engine**: cannon-es (pure JS, no WASM)
- **Chassis**: CANNON.Body with Box shape (1.0 x 0.38 x 1.9), mass 80 kg
- **4 Wheels**: separate CANNON.Body spheres (radius 0.22, mass 5 kg each)
- **Suspension**: manual spring-damper forces computed each frame
  - Spring stiffness: 600 N/m, damping: 45 N*s/m, rest length: 0.40m
  - Lateral constraint springs keep wheels under chassis (stiffness 800, damping 60)
  - Anti-roll bars equalize vertical displacement between wheel pairs (120 N)
- **Drive**: rear-wheel drive — force applied to rear wheel bodies (280 N forward, 450 N braking)
- **Steering**: yaw torque on chassis + front wheel attachment points rotated by steer angle
- **Stability**: angular damping 0.85, anti-flip corrective torque if chassis tilts past 0.85 upDot
- **Static colliders**: buildings (Box), trees (Cylinder), ground (Plane), boundary walls (Box)
- No built-in RaycastVehicle — all suspension from scratch

## Car Design
- WASD / arrow keys: W/S = forward/backward, A/D = steer
- cannon-es physics: position/orientation driven by rigid body simulation
- Wheels visually positioned from physics wheel body positions
- Front wheels visually steer (Y rotation offset by steer angle)
- Dust particles emit from rear when moving

## Game Loop
Fixed-timestep accumulator at 60 Hz decoupled from display framerate:
```
accumulate real delta time
while (accumulator >= 1/60):
  carPreStep(keys, dt)   ← apply spring + drive forces
  world.step(dt)         ← cannon-es physics step
  accumulator -= 1/60
carPostStep()            ← sync Three.js mesh from cannon-es bodies (once per render frame)
camera update → render
```

## Claude Workflow Rules
- **After every file write or deletion, update this CLAUDE.md** to reflect the current state of the project (file structure, design decisions, conventions).

## Conventions
- One named export per file (`createX` factory pattern)
- Module-level THREE reusables (`_quat`) — avoid per-frame allocation
- `carState` object is derived from cannon-es chassis body each frame — used by camera and proximity
- Proximity detection is pure distance math — no physics colliders needed for buildings
- Static physics bodies match the visual mesh dimensions from Three.js
