import * as THREE from 'three'
import { createCarState, stepCar, syncToRapier, readFromRapier, GROUND_Y } from '../physics/carPhysics.js'
import { loadModel } from '../core/assetLoader.js'

// Dust constants
const MAX_PARTICLES        = 120
const PARTICLE_LIFETIME    = 35
const EMIT_SPEED_THRESHOLD = 0.01
const BURST_PARTICLE_COUNT = 18

// Speed trail constants
const TRAIL_POOL_SIZE      = 12
const TRAIL_SPEED_THRESHOLD = 0.06
const TRAIL_FADE_RATE      = 0.04

// Suspension constants
const SUSPENSION_AMPLITUDE = 0.03
const SUSPENSION_FREQUENCY = 12.0

// Module-level reusable
const _euler = new THREE.Euler()

function buildCarMesh() {
  const group = new THREE.Group()

  const flatMat = (color) =>
    new THREE.MeshStandardMaterial({ color, flatShading: true })

  // ── Car body ───────────────────────────────────────────────────────
  const body = new THREE.Mesh(new THREE.BoxGeometry(1, 0.38, 1.9), flatMat('#ff6b35'))
  body.castShadow = true
  body.name = 'body'
  group.add(body)

  // ── Cabin ──────────────────────────────────────────────────────────
  const cabin = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.34, 1.1), flatMat('#ff8c5a'))
  cabin.position.set(0, 0.34, -0.05)
  cabin.castShadow = true
  cabin.name = 'cabin'
  group.add(cabin)

  // ── Windshield ─────────────────────────────────────────────────────
  const glassMat = new THREE.MeshStandardMaterial({
    color: '#88bbee', transparent: true, opacity: 0.7, flatShading: true
  })
  const windshield = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.28, 0.05), glassMat)
  windshield.position.set(0, 0.36, 0.52)
  windshield.rotation.x = 0.25
  group.add(windshield)

  // ── Rear window ────────────────────────────────────────────────────
  const rearWindow = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.28, 0.05), glassMat.clone())
  rearWindow.position.set(0, 0.36, -0.62)
  rearWindow.rotation.x = -0.25
  group.add(rearWindow)

  // ── Side windows ───────────────────────────────────────────────────
  const sideWindowGeo = new THREE.BoxGeometry(0.05, 0.22, 0.65)
  const swL = new THREE.Mesh(sideWindowGeo, glassMat.clone())
  swL.position.set(-0.40, 0.38, -0.05)
  const swR = new THREE.Mesh(sideWindowGeo, glassMat.clone())
  swR.position.set(0.40, 0.38, -0.05)
  group.add(swL, swR)

  // ── Front bumper ───────────────────────────────────────────────────
  const bumperMat = flatMat('#cc5020')
  const frontBumper = new THREE.Mesh(new THREE.BoxGeometry(1.06, 0.14, 0.12), bumperMat)
  frontBumper.position.set(0, -0.10, 0.98)
  frontBumper.castShadow = true
  group.add(frontBumper)

  // ── Rear bumper ────────────────────────────────────────────────────
  const rearBumper = new THREE.Mesh(new THREE.BoxGeometry(1.06, 0.14, 0.12), bumperMat.clone())
  rearBumper.position.set(0, -0.10, -0.98)
  rearBumper.castShadow = true
  group.add(rearBumper)

  // ── Spoiler ────────────────────────────────────────────────────────
  // Spoiler wing — thin angled box on rear
  const spoilerMat = flatMat('#dd5525')
  const spoilerWing = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.04, 0.22), spoilerMat)
  spoilerWing.position.set(0, 0.46, -0.72)
  spoilerWing.rotation.x = -0.20
  spoilerWing.castShadow = true
  group.add(spoilerWing)

  // Spoiler supports (two small stalks)
  const stalkGeo = new THREE.BoxGeometry(0.06, 0.18, 0.06)
  const stalkL = new THREE.Mesh(stalkGeo, spoilerMat)
  stalkL.position.set(-0.28, 0.34, -0.72)
  const stalkR = new THREE.Mesh(stalkGeo, spoilerMat)
  stalkR.position.set(0.28, 0.34, -0.72)
  group.add(stalkL, stalkR)

  // ── Side mirrors ───────────────────────────────────────────────────
  const mirrorMat = flatMat('#cc5020')
  // Mirror stalk + head (left)
  const mirrorStalkGeo = new THREE.BoxGeometry(0.15, 0.04, 0.04)
  const mirrorHeadGeo  = new THREE.BoxGeometry(0.06, 0.08, 0.10)
  const msL = new THREE.Mesh(mirrorStalkGeo, mirrorMat)
  msL.position.set(-0.55, 0.26, 0.30)
  const mhL = new THREE.Mesh(mirrorHeadGeo, mirrorMat)
  mhL.position.set(-0.62, 0.26, 0.30)
  // Right
  const msR = new THREE.Mesh(mirrorStalkGeo, mirrorMat)
  msR.position.set(0.55, 0.26, 0.30)
  const mhR = new THREE.Mesh(mirrorHeadGeo, mirrorMat)
  mhR.position.set(0.62, 0.26, 0.30)
  group.add(msL, mhL, msR, mhR)

  // ── Door lines (thin dark strips) ─────────────────────────────────
  const doorMat = flatMat('#2a2a2a')
  const doorGeo = new THREE.BoxGeometry(0.02, 0.28, 0.55)
  const doorL = new THREE.Mesh(doorGeo, doorMat)
  doorL.position.set(-0.51, 0.12, 0.0)
  const doorR = new THREE.Mesh(doorGeo, doorMat)
  doorR.position.set(0.51, 0.12, 0.0)
  group.add(doorL, doorR)

  // Door handle accents
  const handleGeo = new THREE.BoxGeometry(0.03, 0.04, 0.10)
  const handleMat = flatMat('#aaaaaa')
  const dhL = new THREE.Mesh(handleGeo, handleMat)
  dhL.position.set(-0.52, 0.16, 0.05)
  const dhR = new THREE.Mesh(handleGeo, handleMat)
  dhR.position.set(0.52, 0.16, 0.05)
  group.add(dhL, dhR)

  // ── Headlights ─────────────────────────────────────────────────────
  const hlMat = new THREE.MeshStandardMaterial({
    color: '#ffffcc', emissive: '#ffff88', emissiveIntensity: 0.5, flatShading: true
  })
  const hlGeo = new THREE.BoxGeometry(0.2, 0.1, 0.05)
  const hlL = new THREE.Mesh(hlGeo, hlMat); hlL.position.set(-0.3, 0.04, 0.96)
  const hlR = new THREE.Mesh(hlGeo, hlMat); hlR.position.set( 0.3, 0.04, 0.96)
  group.add(hlL, hlR)

  // ── Headlight beam cones ───────────────────────────────────────────
  const beamMat = new THREE.MeshBasicMaterial({
    color: '#ffeeaa',
    transparent: true,
    opacity: 0.12,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
  })
  const beamGeo = new THREE.ConeGeometry(0.25, 1.2, 6)
  // Left beam cone
  const beamL = new THREE.Mesh(beamGeo, beamMat)
  beamL.rotation.x = -Math.PI / 2  // point forward (+Z)
  beamL.position.set(-0.3, 0.04, 1.56)
  // Right beam cone
  const beamR = new THREE.Mesh(beamGeo, beamMat.clone())
  beamR.rotation.x = -Math.PI / 2
  beamR.position.set(0.3, 0.04, 1.56)
  group.add(beamL, beamR)

  // ── Taillights ─────────────────────────────────────────────────────
  const tlMat = new THREE.MeshStandardMaterial({
    color: '#ff2222', emissive: '#ff0000', emissiveIntensity: 0.6, flatShading: true
  })
  const tlGeo = new THREE.BoxGeometry(0.2, 0.1, 0.05)
  const tlL = new THREE.Mesh(tlGeo, tlMat); tlL.position.set(-0.3, 0.04, -0.96)
  const tlR = new THREE.Mesh(tlGeo, tlMat); tlR.position.set( 0.3, 0.04, -0.96)
  group.add(tlL, tlR)

  // ── Roof rack / subtle roof detail ─────────────────────────────────
  const roofBarMat = flatMat('#666666')
  const roofBarGeo = new THREE.BoxGeometry(0.6, 0.025, 0.03)
  const rb1 = new THREE.Mesh(roofBarGeo, roofBarMat)
  rb1.position.set(0, 0.52, -0.15)
  const rb2 = new THREE.Mesh(roofBarGeo, roofBarMat)
  rb2.position.set(0, 0.52, 0.10)
  group.add(rb1, rb2)

  // ── Exhaust pipe ───────────────────────────────────────────────────
  const exhaustMat = flatMat('#555555')
  const exhaustGeo = new THREE.CylinderGeometry(0.04, 0.05, 0.14, 6)
  const exhaust = new THREE.Mesh(exhaustGeo, exhaustMat)
  exhaust.rotation.x = Math.PI / 2
  exhaust.position.set(0.28, -0.14, -1.02)
  group.add(exhaust)

  // ── Undercarriage glow ─────────────────────────────────────────────
  const underglowMat = new THREE.MeshBasicMaterial({
    color: '#ff6622',
    transparent: true,
    opacity: 0.35,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
  })
  const underglow = new THREE.Mesh(
    new THREE.PlaneGeometry(0.85, 1.7),
    underglowMat
  )
  underglow.rotation.x = -Math.PI / 2
  underglow.position.set(0, -0.19, 0)
  underglow.name = 'underglow'
  group.add(underglow)

  // ── Wheels — no spin (user preference), front wheels steer visually ──
  const wheelGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.16, 8)
  const wheelMat = new THREE.MeshStandardMaterial({ color: '#222222', flatShading: true })
  // Wheel hub detail
  const hubGeo = new THREE.CylinderGeometry(0.10, 0.10, 0.17, 6)
  const hubMat = new THREE.MeshStandardMaterial({
    color: '#888888', flatShading: true, metalness: 0.4, roughness: 0.5
  })

  function makeWheel() {
    const wGroup = new THREE.Group()
    const tire = new THREE.Mesh(wheelGeo, wheelMat)
    tire.rotation.z = Math.PI / 2
    tire.castShadow = true
    wGroup.add(tire)
    // Hub cap
    const hub = new THREE.Mesh(hubGeo, hubMat)
    hub.rotation.z = Math.PI / 2
    wGroup.add(hub)
    return wGroup
  }

  const flGroup = new THREE.Group(); flGroup.position.set(-0.57, -0.13,  0.62); flGroup.add(makeWheel())
  const frGroup = new THREE.Group(); frGroup.position.set( 0.57, -0.13,  0.62); frGroup.add(makeWheel())
  const rlWheel = makeWheel();       rlWheel.position.set(-0.57, -0.13, -0.62)
  const rrWheel = makeWheel();       rrWheel.position.set( 0.57, -0.13, -0.62)
  group.add(flGroup, frGroup, rlWheel, rrWheel)

  return { group, flGroup, frGroup, underglowMat }
}

// ── Speed Trail Pool ─────────────────────────────────────────────────────
function buildTrailPool(scene) {
  const pool = []
  const trailMat = new THREE.MeshBasicMaterial({
    color: '#ff8844',
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
  })
  const trailGeo = new THREE.PlaneGeometry(0.15, 0.15)

  for (let i = 0; i < TRAIL_POOL_SIZE; i++) {
    const mesh = new THREE.Mesh(trailGeo, trailMat.clone())
    mesh.visible = false
    mesh.userData.active = false
    mesh.userData.opacity = 0
    mesh.userData.age = 0
    scene.add(mesh)
    pool.push(mesh)
  }

  return pool
}

function _updateTrail(trailPool, state) {
  const { position, rotation, speed } = state

  // Emit new trail quads when moving fast
  if (speed > TRAIL_SPEED_THRESHOLD) {
    // Find an inactive trail particle
    for (let i = 0; i < trailPool.length; i++) {
      const t = trailPool[i]
      if (!t.userData.active) {
        t.userData.active = true
        t.userData.opacity = 0.45
        t.userData.age = 0
        // Place behind the car
        const rearOffset = 1.1
        t.position.set(
          position.x - Math.sin(rotation) * rearOffset + (Math.random() - 0.5) * 0.3,
          0.15 + Math.random() * 0.1,
          position.z - Math.cos(rotation) * rearOffset + (Math.random() - 0.5) * 0.3
        )
        // Face the camera (billboarding is handled by lookAt in render, but for flat planes just set rotation)
        t.rotation.set(0, rotation, 0)
        const s = 0.6 + Math.random() * 0.5
        t.scale.set(s, s, s)
        t.visible = true
        t.material.opacity = t.userData.opacity
        break  // only emit one per frame
      }
    }
  }

  // Fade and recycle
  for (let i = 0; i < trailPool.length; i++) {
    const t = trailPool[i]
    if (!t.userData.active) continue
    t.userData.age++
    t.userData.opacity -= TRAIL_FADE_RATE
    if (t.userData.opacity <= 0) {
      t.userData.active = false
      t.visible = false
      t.material.opacity = 0
    } else {
      t.material.opacity = t.userData.opacity
      // Drift upward slightly
      t.position.y += 0.005
      // Scale down
      t.scale.multiplyScalar(0.96)
    }
  }
}

// ── Dust System ──────────────────────────────────────────────────────────
function buildDustSystem(scene) {
  const positions = new Float32Array(MAX_PARTICLES * 3)
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  const mat = new THREE.PointsMaterial({
    color: '#c8a96e', size: 0.18, transparent: true, opacity: 0,
    sizeAttenuation: true, depthWrite: false,
  })
  const points = new THREE.Points(geo, mat)
  scene.add(points)
  return { geo, mat, positions, particles: [] }
}

// ── Main Export ──────────────────────────────────────────────────────────
export function createCar(scene, rapierCtx) {
  const { group: carGroup, flGroup, frGroup, underglowMat } = buildCarMesh()
  scene.add(carGroup)

  const dust      = buildDustSystem(scene)
  const trailPool = buildTrailPool(scene)
  const state     = createCarState()

  const { RAPIER, world, carBody, carCollider } = rapierCtx

  // Track collision state for VFX
  let collisionThisFrame = false
  let impactSpeed = 0
  let prevSpeed = 0

  // Suspension tracking
  let distanceTraveled = 0

  // Underglow pulse phase
  let underglowPhase = 0

  // Loaded model state (null = using procedural mesh)
  let _loadedModelRoot = null

  // ── GLTF model loading (async, non-blocking) ────────────────────────
  // Try loading the GLB model; fall back to procedural mesh on error
  loadModel('/assets/models/car.glb')
    .then((gltf) => {
      const modelScene = gltf.scene.clone()

      // Kenney car-kit models are large — scale down to match our car size
      // The sedan-sports is roughly 4 units long, we want ~1.9
      const targetScale = 0.48
      modelScene.scale.setScalar(targetScale)

      // Center and adjust offset (Kenney models have wheels at Y=0)
      modelScene.position.set(0, -0.18, 0)

      // Rotate to face +Z (forward) — Kenney models face +Z by default
      modelScene.rotation.y = 0

      // Enable flat shading + shadows on all meshes
      modelScene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true
          child.receiveShadow = true
          if (child.material) {
            const mat = child.material.clone()
            mat.flatShading = true
            mat.needsUpdate = true
            child.material = mat
          }
        }
      })

      // Use the loaded model
      useLoadedModel(modelScene, { scale: 1, offset: null })
      console.log('[car] Loaded GLB model successfully')
    })
    .catch((err) => {
      console.warn('[car] GLB model load failed, using procedural mesh:', err.message || err)
      // Procedural mesh is already active — nothing to do
    })

  /**
   * Replace the procedural car mesh with a loaded GLTF scene.
   * The loaded model is added as a child of carGroup and the procedural
   * children are hidden (not removed, so we can fall back).
   *
   * @param {THREE.Object3D} gltfScene — the `gltf.scene` from GLTFLoader
   * @param {Object} [opts]
   * @param {number} [opts.scale=1] — uniform scale for the model
   * @param {THREE.Vector3} [opts.offset] — positional offset to center the model
   */
  function useLoadedModel(gltfScene, opts = {}) {
    const scale = opts.scale ?? 1
    const offset = opts.offset

    // Hide procedural mesh children (except underglow)
    carGroup.children.forEach((child) => {
      if (child.name !== 'underglow') {
        child.visible = false
      }
    })

    // Remove previous loaded model if any
    if (_loadedModelRoot) {
      carGroup.remove(_loadedModelRoot)
    }

    // Add loaded model
    _loadedModelRoot = gltfScene
    _loadedModelRoot.scale.multiplyScalar(scale)
    if (offset) _loadedModelRoot.position.copy(offset)

    // Ensure shadows
    _loadedModelRoot.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })

    carGroup.add(_loadedModelRoot)
  }

  /**
   * Revert to the procedural car mesh — removes loaded model if present.
   */
  function useProceduralMesh() {
    if (_loadedModelRoot) {
      carGroup.remove(_loadedModelRoot)
      _loadedModelRoot = null
    }
    carGroup.children.forEach((child) => { child.visible = true })
  }

  function preStep(keys) {
    prevSpeed = Math.abs(state.velocity)

    // 1. Kinematic math — compute desired heading/speed
    stepCar(state, keys)

    // 2. Push velocity into Rapier dynamic body
    syncToRapier(state, carBody, GROUND_Y)
  }

  /**
   * Called after world.step() — reads the car's actual position from Rapier
   * (which may differ from kinematic intent due to collision response).
   */
  function postStep() {
    // Read back position from Rapier (captures collision push-out)
    readFromRapier(state, carBody)

    // ── Suspension bobbing ─────────────────────────────────────────
    distanceTraveled += state.speed
    const bobAmount = state.speed > 0.005
      ? Math.sin(distanceTraveled * SUSPENSION_FREQUENCY) * SUSPENSION_AMPLITUDE * Math.min(state.speed / 0.10, 1.0)
      : 0

    // Sync mesh from state (with suspension offset)
    carGroup.position.set(state.position.x, state.position.y + bobAmount, state.position.z)
    _euler.set(0, state.rotation, 0)
    carGroup.quaternion.setFromEuler(_euler)

    // Front wheel visual steering (only relevant for procedural mesh)
    if (!_loadedModelRoot) {
      flGroup.rotation.y = state.steer
      frGroup.rotation.y = state.steer
    }

    // ── Underglow pulse ────────────────────────────────────────────
    underglowPhase += 0.05
    const baseOpacity = 0.25
    const pulse = Math.sin(underglowPhase) * 0.10
    const speedBoost = Math.min(state.speed / 0.12, 1.0) * 0.15
    underglowMat.opacity = baseOpacity + pulse + speedBoost

    // Check for collision via Rapier contact pairs
    world.contactPairsWith(carCollider, (otherCollider) => {
      if (prevSpeed > 0.04) {
        collisionThisFrame = true
        impactSpeed = Math.max(impactSpeed, prevSpeed)
      }
    })

    // Impact dust burst
    if (collisionThisFrame) {
      _emitBurst(dust, state)
    }

    _updateDust(dust, state)
    _updateTrail(trailPool, state)
  }

  /** Returns impact speed if collision occurred this frame, else 0. Resets flag. */
  function consumeCollision() {
    if (collisionThisFrame) {
      collisionThisFrame = false
      const spd = impactSpeed
      impactSpeed = 0
      return spd
    }
    return 0
  }

  return { carState: state, preStep, postStep, consumeCollision, useLoadedModel, useProceduralMesh }
}

// ── Dust helpers (unchanged logic) ───────────────────────────────────────
function _emitBurst(dust, state) {
  const { position } = state
  const { particles } = dust
  for (let i = 0; i < BURST_PARTICLE_COUNT && particles.length < MAX_PARTICLES; i++) {
    const angle = Math.random() * Math.PI * 2
    const spd = 0.03 + Math.random() * 0.06
    particles.push({
      position: new THREE.Vector3(
        position.x + (Math.random() - 0.5) * 1.2,
        0.15 + Math.random() * 0.25,
        position.z + (Math.random() - 0.5) * 1.2
      ),
      velocity: new THREE.Vector3(
        Math.cos(angle) * spd,
        0.02 + Math.random() * 0.04,
        Math.sin(angle) * spd
      ),
      life: PARTICLE_LIFETIME,
      maxLife: PARTICLE_LIFETIME,
    })
  }
}

function _updateDust(dust, state) {
  const { position, rotation, speed } = state
  const { geo, mat, positions, particles } = dust

  if (Math.abs(speed) > EMIT_SPEED_THRESHOLD && particles.length < MAX_PARTICLES) {
    const rearX = position.x - Math.sin(rotation) * 1.05
    const rearZ = position.z - Math.cos(rotation) * 1.05
    const count = speed > 0.1 ? 2 : 1
    for (let i = 0; i < count; i++) {
      particles.push({
        position: new THREE.Vector3(
          rearX + (Math.random() - 0.5) * 0.3,
          0.15 + Math.random() * 0.1,
          rearZ + (Math.random() - 0.5) * 0.3
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.04 - Math.sin(rotation) * 0.02,
          0.01 + Math.random() * 0.02,
          (Math.random() - 0.5) * 0.04 - Math.cos(rotation) * 0.02
        ),
        life: PARTICLE_LIFETIME,
        maxLife: PARTICLE_LIFETIME,
      })
    }
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].life--
    particles[i].position.add(particles[i].velocity)
    particles[i].velocity.y *= 0.98
    if (particles[i].life <= 0) particles.splice(i, 1)
  }

  const n = particles.length
  for (let i = 0; i < n; i++) {
    positions[i * 3]     = particles[i].position.x
    positions[i * 3 + 1] = particles[i].position.y
    positions[i * 3 + 2] = particles[i].position.z
  }
  for (let i = n; i < MAX_PARTICLES; i++) positions[i * 3 + 1] = -999
  geo.attributes.position.needsUpdate = true
  geo.setDrawRange(0, n)

  mat.opacity = n > 0
    ? particles.reduce((s, p) => s + p.life / p.maxLife, 0) / n * 0.75
    : 0
}
