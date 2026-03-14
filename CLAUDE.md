# Personal Site — Claude Context

## Project Goal
Interactive 3D personal website inspired by bruno-simon.com.
User drives a low-poly car around a dense, detailed world with 10 themed zones.
Buildings represent portfolio sections (About, Projects, Experience, Contact).
Drive near a building and press E to open it as a popup.
Interactive pushable objects, animated attractions, and knockable trees add physics playground feel.

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
  interactables.js        interactive physics objects: dominos, box pyramid, bouncy spheres
src/physics/
  engine.js               Rapier WASM init + world creation (gravity: {0, -20, 0})
  carPhysics.js           kinematic car math (stepCar) + Rapier sync helpers
  colliders.js            Rapier collider world — car, buildings, trees, ground, boundary walls
src/zones/
  cityCenter.js           urban zone (origin, r~20) — roads, roundabout, street lamps, benches, cones, parked cars
  amusementPark.js        carnival zone (45,-30) — ferris wheel (animated), carousel (animated), game booths, roller coaster, bowling pins
  beachHarbor.js          coastal zone (45,35) — lighthouse (pulsing beacon), dock, sailboat (bobbing), palm trees, seagulls, crates
  enchantedForest.js      magical forest (-45,-30) — dense trees, giant mushrooms, fairy lights (bobbing), creatures, stream, pushable logs
  constructionSite.js     construction zone (-45,30) — tower crane (animated), vehicles, 15 cones, barriers, steel beams, hard hats
  japaneseGarden.js       zen garden (0,-50) — torii gate, pagoda, koi pond (animated fish), arched bridge, bamboo grove, cherry blossoms
  spaceStation.js         launch site (0,50) — rocket, satellite dishes (rotating), control tower, moon rover, astronaut, warning lights
  farm.js                 countryside (-50,0) — windmill (animated), red barn, animals, crops, hay bales, tractor, scarecrow
  playground.js           park (40,15) — swings (animated), slide, seesaw (animated), fountain (animated), sandbox, gazebo, hedge maze
  raceTrack.js            racing circuit (-30,50) — oval track, ramps, grandstand, pit stop, 20 cones, checkered flags, tire barriers
src/worlds/
  city.js                 dense urban city world (120x120, origin-centered) — ground+physics, road grid (NS/EW at 0/±20/±40), diagonal boulevard, roundabout at (-30,-30), 15+ shops/buildings (church w/ steeple, gas station, diner w/ neon, awning shops), 27 street lamps, 8 benches, 6 hydrants, 4 mailboxes, 6 trash cans, 4 bus shelters, 3 phone booths, 4 newspaper stands, 10 parked vehicles (8 cars + van + pickup), 27 ball-canopy trees, 12 bushes, 6 flower beds, park w/ fountain, 4 stop signs, 6 road signs, bridge/overpass at z=-40, water tower atop building, 2 billboards, power lines; Dynamic: 10 traffic cones, 5 barriers, 3 garbage bins, ~8 cardboard boxes, 2 shopping carts, 8 bowling pins; boundary walls at ±60
  forest.js               enchanted forest world (120x120, origin-centered) — dense trees, giant mushrooms, fairy lights, crystals, creatures, stream, wishing well, tree houses, dynamic pushable objects
  beach.js                tropical island paradise world (120x120, origin-centered) — circular sandy island, ocean water (wave-animated), lagoon, lighthouse (pulsing beacon), dock/pier (driveable), tiki bar, lifeguard tower, beach shack, boardwalk, sailboat+pirate ship (bobbing), 2 rowboats, kayak, 22 palm trees (curved trunks, coconuts), 8 umbrellas, 6 towels, 5 chairs, 4 sandcastles, volleyball net, 12 seashells, 3 starfish, campfire, hammock, treasure chest, tiki torches (7, flickering), coral+seaweed underwater, rocky outcrops; Dynamic: 6 coconuts, 4 crates, 3 beach balls (bouncy), 2 barrels, 5 logs; boundary walls at ±60
  construction.js         massive construction site world (120x120, origin-centered) — overcast sky (#b0b0b0), dirt ground w/ Rapier collider, boundary walls at ±60, 3 tower cranes (2 animated rotating jibs + 1 mobile crane), 9 heavy vehicles (2 excavators, 2 dump trucks, concrete mixer, bulldozer, steamroller, loader, cement pump truck), 6 scaffolding structures, 6 buildings under construction (exposed columns, rebar, formwork), 4 sand/gravel piles, 3 concrete pipe stacks, 2 lumber stacks, 2 cement bag stacks, 4 porta-potties, 3 tool sheds, 3 generators, 2 fuel tanks, 3 dumpsters, 8 barrier tape sections, 6 warning signs, 2 big construction signs, ground features (tire tracks, puddles, trenches, concrete pads, dirt roads); Dynamic (80+): 35 traffic cones, 12 barriers (6 dynamic), 10 steel beams, 8 hard hats, 6 wooden planks, 5 paint cans, 4 toolboxes, 3 wheelbarrows, 6 barrels, 4 cinder blocks, 24 dynamic bricks; maximum physics chaos world
  japanese.js             serene Japanese village world (120x120, origin-centered) — soft pink-gray sky (#d4c4c8), muted green grass (#5a7a50) w/ Rapier collider, boundary walls at ±60, 2 torii gates (red pillars+beams, fixed colliders), 3-tier pagoda w/ spire, 6 small houses (angled roofs, sliding doors, paper windows, verandas), tea house (open w/ tatami floor, low table, zabuton cushions), shrine (w/ offering box, shimenawa), castle gate; 3 zen rock gardens (sand patches, raked lines, rocks, wooden borders), 3 koi ponds (animated fish swimming circles, lily pads, lotus flowers, stone borders), red arched bridge + flat wooden bridge + stepping stone bridge (all driveable w/ fixed colliders); 3 bamboo groves (10-15 stalks each, nodes, leaves), 18 cherry blossom trees (pink sphere canopies, scattered petals), 12 stone lanterns (animated pulsing warm glow); winding stream, waterfall w/ mist, 4 tsukubai, 2 shishi-odoshi; 23 stepping stones, stone paths, 6 benches, 4 Buddha statues, 3 bamboo fences (w/ colliders), 5 bonsai on pedestals, 20 moss patches, 16 flower arrangements, raked gravel paths, 2 rice paddies, stone well; paper lanterns on strings (animated sway), wind chimes, sake barrels, folding screens; Dynamic: 5 zen garden stones, 4 wooden buckets, 3 sake barrels, 3 lantern stands (toppleable), 2 wooden carts
  space.js                alien planet colony world (120x120, origin-centered) — dark terrain (#2a2a3a), space background (#0a0a1a), purple fog, 300 stars (Points cloud); 3 rockets (main ~16u tall on pad w/ landing lights, smaller rocket, under-construction w/ scaffolding), 5 satellite dishes (animated rotation), 3 domed habitats, 2 rectangular modules w/ antenna arrays, control tower w/ radar dome, communications array, power station w/ glowing panels, greenhouse dome (transparent green), landing bay; 2 moon rovers, hover transport, mining vehicle w/ drill; 18 glowing alien plants (pulsing emissive), 10 crystal formations (transparent dodecahedrons, shimmer), 8 alien mushroom clusters, 10 glowing ground patches; 10 craters w/ rims, 23 rocks, 4 geysers (animated mist); walkways/roads, 6 solar arrays, 4 fuel tanks, 8 containers, 5 control panels, 3 telescopes, 4 warning pylons (pulsing), 5 antenna towers, cable runs, 6 O2 tanks, robotic arm, 4 astronaut figures; Dynamic: 6 supply crates, 4 fuel barrels, 3 satellites on stands, 5 alien crystals (low density), 3 O2 tanks, 2 repair kits; boundary walls at ±60
  farm.js                 charming countryside farm world (120x120, origin-centered) — warm blue sky (#87ceeb), lush green ground (#4a7c59) w/ Rapier collider, boundary walls at ±60 (stone+hedge); 2 windmills (animated rotating blades, stone towers, conical roofs, doors/windows, fixed colliders), main red barn (#8B0000) w/ gambrel roof + white X-trim doors + hay loft + silo w/ bands, smaller barn/stable, tool shed; 6 cows (white+black spots), 6 sheep (cream sphere bodies), 5 chickens + 1 rooster (on fence post), 2 pigs (pink, curly tails), 2 horses; 4 fenced enclosures w/ gate openings + field border fencing (post+rail, fixed colliders on posts); 6 crop fields (wheat rows, corn w/ cobs, carrots, sunflowers w/ petals, pumpkin patch, hay field), 2 orchards (apple trees w/ red apples, cherry trees w/ pink canopies); 2 tractors (green+red, cabs, wheels, exhaust, fixed colliders), hay wagon w/ bales, plow; duck pond (4 yellow ducks, reeds), well w/ roof+rope+bucket, 3 water troughs, 4 irrigation channels; 2 scarecrows, clothesline w/ clothes, dog house, bird bath, wood chopping block+axe, 2 beehive sets, 6 flower pots, 2 barrel stacks, 3 feed troughs, 5 haystacks (cone, fixed colliders), 3 decorative wheelbarrows, 2 sign posts; dirt paths connecting structures, stone path; 16 scattered trees, 16 bushes, 8 rock clusters, 8 wildflower patches, mushroom clusters; grain silo (tall, banded); Dynamic: 10 hay bales (cylinder colliders on side — ROLLABLE!), 5 pumpkins, 4 milk churns, 3 wooden crates, 4 fallen apples, 3 feed buckets, 2 wheelbarrows
  playground.js           giant playground / toy world (120x120, origin-centered) — cheerful sky (#a8e4f0), bright green ground (#6dbf5a) w/ Rapier collider, boundary walls at ±60; 3 swing sets (animated pendulum, A-frame+bar+2 swings each, fixed colliders), 2 slides (platform+ladder+angled surface+side rails, fixed colliders), 2 seesaws (animated tilt), 2 merry-go-rounds (animated spin, colored segments+handles), climbing frame (2-level bar grid+top platform, fixed collider), monkey bars (8 rungs on supports, fixed collider), 4 spring riders; 3 block walls (fixed, stacked colorful boxes), 15 dynamic scattered blocks (pushable), 2 block towers (5 high, dynamic), block bridge (driveable, fixed colliders); 3 sandboxes (wooden walls, sand fill, sandcastle w/ turrets, shovel, bucket, fixed wall colliders); 2 fountains (animated water particles, tiered bowls, fixed colliders); 3 gazebos (hex floor, 6 pillars, cone roof, picnic table in one, fixed colliders); 10 colorful benches, 8 lamp posts (emissive warm glow), 6 fun-colored trash cans, 4 picnic tables, 3 drinking fountains, 2 basketball hoops (backboard+rim, fixed colliders); giant toy car (5x scale, red, fixed collider), 4 toy soldiers, 3 toy robots (box+cylinder+sphere), jack-in-the-box, 3 giant dice (dynamic), kite on string, 4 pinwheels (animated spin), 2 hopscotch grids, tic-tac-toe board on post, 3 giant pencils (leaning), toy train (engine+3 cars on track); ball pit (3 fixed walls + breakable front wall segments, 20 dynamic balls, bouncy 0.7); hedge maze (outer+inner walls, fixed colliders, entrance bushes); 16 lollipop trees (bright sphere canopies on thin trunks), 12 round bushes, 8 flower arrangements; Dynamic (80+): 15 building blocks, 10 tower blocks, 8 playground balls (bouncy), 6 bowling pins, 20 ball pit balls, 4 toy cars, 3 giant dice, 3 breakable wall segments; primary colors everywhere, all animated elements
  racing.js               motorsport racing paradise world (120x120, origin-centered) — blue sky (#87ceeb), green grass (#4a7c59) w/ Rapier collider, boundary walls at ±60; large rounded-rectangle race track loop (~84x84 outer, 5.5u wide, asphalt segments) w/ white dashed center lines + red/white curb markings at curves; start/finish line (checkered ground + overhead gantry w/ pillars + checkered banner + flag on pole, fixed colliders), 4 ramps on straights (angled boxes w/ rotated Rapier colliders, red/white stripes, side rails), 3 grandstands (main 5-row + 2 smaller 3-row, concrete tiers + colored seat cubes + roof overhangs, fixed colliders); pit lane along right straight (pit road + pit wall w/ fixed collider + 4 garages w/ tire stacks + tool racks + jack stands + 2 fuel pumps + speed bumps); tire barriers at 4 corners (5x3 stacks, bottom 2 rows fixed + top row dynamic), 6 gravel/sand trap patches; podium (gold/silver/bronze steps + trophy) + large display trophy; 8 sponsor billboards (colored panels on poles, fixed colliders); 8 marshal posts (animated waving flags); starting lights gantry (5 red lights, animated sequence); infield: media center (box building w/ emissive screens + satellite dish, fixed collider), parc ferme (fenced area), safety car + ambulance (box vehicles, fixed colliders); 8 racing vehicles: 4 go-karts + 2 formula cars + pace car + pickup truck w/ trailer (all fixed colliders); 12 direction arrows on track, 4 chevron warning signs, 4 fencing segments, 4 advertising hoardings, 4 camera towers, 4 flag poles, 4 viewing mounds w/ benches, 12 trees; Dynamic (80+): 35 traffic cones, 8 loose tires, 4 barrier pieces, 1 giant checkered beach ball (bouncy), 3 tool boxes, 4 fuel barrels, 20 dynamic tire barrier tops; maximum cone chaos
src/ui/
  ui.js                   proximity HUD prompt
  popup.js                location content popup
```

## Zone / World Architecture
Each zone file exports `createZoneName(scene, RAPIER, world)` returning `{ syncList, update(dt) }`.
World files (in `src/worlds/`) export `createWorld(scene, RAPIER, world)` with same signature — full standalone maps loaded via `?world=` URL param.
- `syncList`: array of `{ mesh, body }` for dynamic Rapier bodies synced each frame
- `update(dt)`: called each fixed timestep for animations (ferris wheel, windmill, koi fish, etc.)
- All zones initialized in `main.js`, syncLists merged into `interactSyncList`, updates called in physics loop
- Zones/worlds use Three.js primitives only (no external 3D models) with `flatShading: true`
- World files set `scene.background` and `scene.fog` for themed atmosphere, create own ground + boundary walls

## Car Design
- WASD / arrow keys: W/S = forward/backward, A/D = steer
- **Hybrid approach**: kinematic math computes desired heading/speed, then velocity is SET on a dynamic Rapier body
- Rapier's collision solver handles push-out naturally (car pushes objects, bounces off buildings)
- Fixed Y height maintained via stiff spring velocity (GROUND_Y = 0.3)
- Front wheels visually steer (Y rotation). No wheel spin (user preference).
- Dust particles emit from rear when moving

## Game Loop
Fixed-timestep accumulator at 60 Hz decoupled from display framerate:
```
await Rapier WASM init (top-level await)
accumulate real delta time
while (accumulator >= 1/60):
  carPreStep(keys)         ← stepCar() kinematic math + syncToRapier()
  world.step()             ← Rapier collision solver runs
  for (z of zones) z.update(dt)  ← zone animations
  accumulator -= 1/60
carPostStep()              ← readFromRapier() + sync car mesh
syncDynamicBodies()        ← sync trees + interactables + zone dynamic objects
consume collision          ← trigger camera shake if impact occurred
camera update → render
```

## Loading Screen
- Pure CSS animated loading screen in `index.html`
- CSS car drives across a road line, dust trail, spinning wheels
- Text reveals: name (0.3s) → subtitle (1.0s) → WASD/E controls (1.8s)
- Minimum display time: `MIN_DISPLAY_MS = 3000`
- Game loop starts only AFTER loading screen fades out

## Claude Workflow Rules
- **After every file write or deletion, update this CLAUDE.md** to reflect the current state of the project.

## Conventions
- One named export per file (`createX` factory pattern)
- Module-level THREE reusables (`_euler`, `_quat`) — avoid per-frame allocation
- `carState` object is the single source of truth for car position/rotation/speed
- Proximity detection is pure distance math — no physics colliders needed for buildings
- Rapier body → Three.js mesh sync done in main.js `_syncDynamicBodies()` helper
- `vite.config.js` targets `esnext` for top-level `await` (Rapier WASM init)
