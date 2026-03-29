# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
Interactive 3D personal website inspired by bruno-simon.com. User drives a low-poly car around a world with portfolio buildings (About, Projects, Experience, Contact). Drive near a building and press E to open a popup. Physics playground with knockable objects, animated attractions, and themed zones.

## Commands
```bash
npm run dev      # Start Vite dev server (hot reload)
npm run build    # Production build (outputs to dist/)
npm run preview  # Preview production build locally
```
No tests or linter configured. Verify changes by running `npm run build` — build errors are the primary signal.

## Stack
- **Vite** + vanilla JS (ESM modules), no React, no TypeScript
- **Three.js** for 3D rendering (all meshes are procedural primitives, `flatShading: true`)
- **Rapier** (`@dimforge/rapier3d-compat`) for physics — WASM initialized via top-level `await`
- **postprocessing** (pmndrs) for Bloom + Vignette
- **troika-three-text** for SDF 3D text labels
- **GSAP** for camera/UI animations
- **Howler.js** for spatial audio

`vite.config.js` sets `base: '/personal-site/'` (GitHub Pages) and `target: 'esnext'` (top-level await).

## Architecture

### Game Loop (`main.js`)
Fixed-timestep accumulator at 60 Hz, decoupled from display framerate:
```
Rapier WASM init (top-level await) → create renderer/scene/camera/input →
create all entities → loading screen → splash → intro camera → loop:
  accumulate delta → while (acc >= 1/60): carPreStep → world.step() → updateWorld → acc -= 1/60
  → carPostStep → _syncDynamicBodies(syncList) → collision sound/shake →
  proximity check → HUD → atmosphere → grass → camera → quality → composer.render()
```

### Entity Pattern
Every entity module exports a `createX(scene, RAPIER, world)` factory returning `{ syncList, update? }`:
- **syncList**: `Array<{ mesh, body, offset? }>` — dynamic Rapier bodies synced to Three.js meshes each frame by `_syncDynamicBodies()` in main.js
- **update(dt)**: optional per-frame callback for animations (ferris wheel, windmill, fish, etc.)

All syncLists from all entities/zones/worlds are merged into a single array in main.js.

### Car Physics (Hybrid Kinematic + Dynamic)
- `carPhysics.js`: pure kinematic math computes heading/speed from WASD input
- `colliders.js`: creates a dynamic Rapier body for the car
- Each frame: kinematic state → set velocity on Rapier body → `world.step()` handles collisions naturally
- Car stays at fixed Y=0.3 via stiff spring velocity correction. No falling or bouncing.

### Dynamic Objects (Rapier body at ground, collider offset)
For objects that should sit on the ground (trees, lampposts, etc.): body is placed at `y=0`, collider is offset up via `ColliderDesc.setTranslation(0, halfHeight, 0)`. This prevents objects from floating when synced.

### Worlds vs Zones
- **Worlds** (`src/worlds/`): full standalone maps loaded via `?world=` URL param. Set their own sky, fog, ground. Default is `space.js`.
- **Zones** (`src/zones/`): additive areas layered onto the base world at specific coordinates. Each has own `createZoneName(scene, RAPIER, world)`.

### Portfolio Building Interaction
- `locations.js` defines 4 buildings with `id`, `position`, `radius`, `content` (HTML string for popup)
- `main.js` does proximity check via distance math (no physics colliders)
- Press E within radius → `popup.open(location)` → GSAP camera animation + frosted overlay

### UI Layers
- **Loading screen**: CSS-only in `index.html` (animated car driving across road)
- **Splash/intro**: full-screen overlay, click to dismiss → GSAP camera sweep → game starts
- **HUD**: minimap (canvas, top-right), speedometer (bottom-left), proximity prompt ("Press E")
- **Popup**: scale-up/down content panel with frosted backdrop

## Key Conventions
- One named export per file (`createX` factory pattern)
- Module-level reusable Three.js objects (`_euler`, `_quat`) to avoid per-frame GC
- `carState` is the single source of truth for car position/rotation/speed
- All 3D is procedural primitives — no external GLB models in use (asset pipeline exists but unused)
- Material: always `flatShading: true`, use `MeshStandardMaterial`
- Dynamic (knockable) objects: `RigidBodyDesc.dynamic()` + add to syncList
- Fixed (immovable) objects: `RigidBodyDesc.fixed()` — no syncList entry needed

## Spawn Area
- **Name blocks**: "ERIC WANG" as 3D extruded TextGeometry letters (white, dynamic, topple on impact) at z=-6
- **Direction signpost**: pole at (-3, 0, 3) with 4 colored arrow signs pointing to buildings (ABOUT/PROJECTS/CONTACT/EXPERIENCE)

## Workflow Rules
- **After every file write or deletion, update this CLAUDE.md** to reflect current project state.
