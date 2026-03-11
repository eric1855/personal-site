# Personal Site — Claude Context

## Project Goal
Interactive 3D personal website inspired by bruno-simon.com.
User drives a low-poly car around a world. Buildings represent portfolio sections (About, Projects, Blog, Contact).
Drive near a building and press E to open it as a popup.

## Stack
- **Vite** + vanilla JS (ESM modules), no React, no TypeScript
- **Three.js** for 3D rendering
- **cannon-es** physics engine — simple rigid body car (Bruno Simon style)

## File Structure
```
main.js                   game loop, wires everything together
src/core/
  renderer.js             WebGL renderer setup
  scene.js                lights, fog, background
  camera.js               follow camera (fixed world-space offset) + shake effect
  input.js                keyboard state (WASD + E)
src/entities/
  car.js                  car mesh + dust particles + sync from cannon-es body
  worldObjects.js         ground mesh + trees + cannon-es static bodies
  locations.js            portfolio buildings + cannon-es static bodies
src/physics/
  engine.js               cannon-es world setup (gravity, materials, broadphase)
  carPhysics.js           cannon-es rigid body car + force/steering logic
src/ui/
  ui.js                   proximity HUD prompt
  popup.js                location content popup
```

## Physics System (cannon-es)
- **World**: CANNON.World with gravity (0, -20, 0), SAPBroadphase, sleep enabled
- **Car**: single CANNON.Body (mass 20) with box shape matching the visual mesh (1.0 x 0.38 x 1.9)
  - Movement: forward force applied along chassis heading when W pressed
  - Braking: reverse force when S pressed (stronger when moving forward, weaker for reverse)
  - Steering: angularVelocity.y set based on input, scaled by forward speed
  - Lateral grip: 90% of lateral velocity removed each step for arcade feel
  - Locked to ground: Y position fixed, rotation locked to Y-axis only
  - Linear damping 0.6, angular damping 0.95 for arcade feel
- **Ground**: CANNON.Plane (static, rotated to face +Y) with ground contact material
- **Buildings**: CANNON.Box static bodies matching LOCATION_DEFS bodySize
- **Trees**: CANNON.Cylinder static bodies (trunk radius ~0.2, scaled per tree)
- **Contact materials**: ground-chassis (friction 0.5, restitution 0.0), default (friction 0.3, restitution 0.05)

## Car Design
- WASD / arrow keys: W/S = forward/backward, A/D = steer
- cannon-es rigid body: forces applied based on input, physics engine handles collision
- Fixed Y height (GROUND_Y = 0.3), locked to Y-axis rotation only
- Front wheels visually steer (Y rotation). No wheel spin (user preference).
- Dust particles emit from rear when moving
- Max forward speed ~18, max reverse speed ~6

## Game Loop
Fixed-timestep accumulator at 60 Hz decoupled from display framerate:
```
accumulate real delta time
while (accumulator >= 1/60):
  carPreStep(keys)   ← apply forces/steering based on input
  stepPhysics()      ← advance cannon-es world
  accumulator -= 1/60
carPostStep()        ← sync Three.js mesh from cannon body (once per render frame)
camera update → render
```

## Claude Workflow Rules
- **After every file write or deletion, update this CLAUDE.md** to reflect the current state of the project (file structure, design decisions, conventions).

## Conventions
- One named export per file (`createX` factory pattern)
- Module-level THREE reusables (`_euler`, `_quat`) — avoid per-frame allocation
- `carState` object is the single source of truth for car position/rotation/speed (synced from cannon body)
- Proximity detection is pure distance math — no physics colliders needed for buildings
- Collision handled entirely by cannon-es — no manual SAT or OBB code
