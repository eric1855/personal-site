---
name: Project Goal and Architecture
description: Interactive 3D portfolio site — car driving sim with Rapier physics, multiple engine prototypes on branches
type: project
---

The project is an interactive 3D personal website (bruno-simon.com style) where a user drives a low-poly car around a world. Buildings represent portfolio sections (About, Projects, Blog, Contact) — drive near and press E to interact.

**Stack**: Vite + vanilla JS (ESM), Three.js, Rapier (@dimforge/rapier3d-compat) for physics, no React/TypeScript.

**Current working branch** appears to use Rapier hybrid kinematic/dynamic car physics with interactive objects (dominos, boxes, bouncy spheres) and knockable trees.

**Branch Strategy (as of 2026-03-12)**:
- `main`: kinematic car + OBB-SAT collision system (no physics engine)
- `physicssim1`: cannon-es RaycastVehicle prototype
- `physicssim4`: Ammo.js (Bullet) btRaycastVehicle prototype
- `physicssim7`: Rapier hybrid kinematic prototype
- `physicssim9`: cannon-es with interactive objects
- `collision/obb-sat`: merged to main
- `archive/*`: scratched/broken branches (physicssim 2,3,5,6,8,10 and collision experiments)

**Why:** The user is evaluating multiple physics engines to find the best fit for car driving feel before committing to one approach on main.

**How to apply:** When reviewing physics-related work, keep in mind the user is in an evaluation phase. Suggestions should help them converge on a final choice rather than polish any single prototype.

**Known Issues (from 2026-03-12 review)**:
- package.json lists cannon-es but not @dimforge/rapier3d-compat (broken for fresh clone)
- collision.js is an empty dead file
- Building/tree data is duplicated between visual and physics modules
- No mobile/touch support, no loading state, no WebGL fallback
- Dust particle system uses per-frame allocations + splice in hot loop
