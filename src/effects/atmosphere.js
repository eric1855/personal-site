/**
 * Atmospheric effects — floating ambient particles, building beacon glow,
 * and ground ring effects around portfolio buildings.
 */
import * as THREE from 'three'

// ── Reusable temps to avoid per-frame allocation ────────────────
const _color = new THREE.Color()

// ── Constants ───────────────────────────────────────────────────
const PARTICLE_COUNT    = 300
const SPREAD_X          = 50
const SPREAD_Z          = 50
const MIN_Y             = 0.5
const MAX_Y             = 8.0
const BASE_DRIFT_SPEED  = 0.3   // base upward drift units/sec
const LATERAL_AMPLITUDE = 0.4   // lateral sway amplitude
const BEACON_HEIGHT     = 12
const BEACON_RADIUS     = 0.25
const RING_INNER_RADIUS = 4.5
const RING_OUTER_RADIUS = 5.5

/**
 * Create the atmosphere system.
 * @param {THREE.Scene} scene
 * @param {Array<{position: THREE.Vector3, color: string}>} buildings — location objects from locations.js
 * @returns {{ update(dt: number): void }}
 */
export function createAtmosphere(scene, buildings) {
  // ────────────────────────────────────────────────────────────
  // 1.  Floating Ambient Particles
  // ────────────────────────────────────────────────────────────
  const positions  = new Float32Array(PARTICLE_COUNT * 3)
  const colors     = new Float32Array(PARTICLE_COUNT * 3)
  const sizes      = new Float32Array(PARTICLE_COUNT)
  const phases     = new Float32Array(PARTICLE_COUNT) // unique phase offset per particle
  const speeds     = new Float32Array(PARTICLE_COUNT) // unique vertical speed multiplier

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    // Random initial position within the play area
    positions[i * 3]     = (Math.random() - 0.5) * SPREAD_X * 2  // x
    positions[i * 3 + 1] = MIN_Y + Math.random() * (MAX_Y - MIN_Y) // y
    positions[i * 3 + 2] = (Math.random() - 0.5) * SPREAD_Z * 2  // z

    // Warm soft yellow/white color with slight variation
    _color.setHSL(
      0.1 + Math.random() * 0.07,  // hue: 0.10-0.17 (warm yellow-amber)
      0.3 + Math.random() * 0.3,   // saturation: 0.3-0.6
      0.7 + Math.random() * 0.3    // lightness: 0.7-1.0
    )
    colors[i * 3]     = _color.r
    colors[i * 3 + 1] = _color.g
    colors[i * 3 + 2] = _color.b

    sizes[i]  = 1.5 + Math.random() * 2.5  // point size 1.5 - 4.0
    phases[i] = Math.random() * Math.PI * 2 // random phase [0, 2PI]
    speeds[i] = 0.6 + Math.random() * 0.8   // speed multiplier 0.6 - 1.4
  }

  const particleGeom = new THREE.BufferGeometry()
  particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  particleGeom.setAttribute('color',    new THREE.BufferAttribute(colors, 3))
  particleGeom.setAttribute('size',     new THREE.BufferAttribute(sizes, 1))

  const particleMat = new THREE.PointsMaterial({
    size: 0.15,
    sizeAttenuation: true,
    vertexColors: true,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })

  const particleSystem = new THREE.Points(particleGeom, particleMat)
  particleSystem.frustumCulled = false
  scene.add(particleSystem)

  // ────────────────────────────────────────────────────────────
  // 2.  Building Beacon / Glow Columns
  // ────────────────────────────────────────────────────────────
  const beacons = []

  for (const bld of buildings) {
    _color.set(bld.color)

    // Tall transparent cylinder — beacon light beam
    const beaconGeom = new THREE.CylinderGeometry(
      BEACON_RADIUS * 0.3,   // radiusTop (narrows at top)
      BEACON_RADIUS,          // radiusBottom
      BEACON_HEIGHT,          // height
      8,                      // radialSegments (low poly)
      1,                      // heightSegments
      true                    // openEnded
    )
    const beaconMat = new THREE.MeshBasicMaterial({
      color: _color.clone(),
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    })
    const beaconMesh = new THREE.Mesh(beaconGeom, beaconMat)
    beaconMesh.position.set(bld.position.x, BEACON_HEIGHT / 2, bld.position.z)
    scene.add(beaconMesh)

    beacons.push({ mesh: beaconMesh, mat: beaconMat })
  }

  // ────────────────────────────────────────────────────────────
  // 3.  Ground Ring Effects
  // ────────────────────────────────────────────────────────────
  const rings = []

  for (const bld of buildings) {
    _color.set(bld.color)

    const ringGeom = new THREE.RingGeometry(RING_INNER_RADIUS, RING_OUTER_RADIUS, 32)
    const ringMat = new THREE.MeshBasicMaterial({
      color: _color.clone(),
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    })
    const ringMesh = new THREE.Mesh(ringGeom, ringMat)
    // Lay flat on the ground (rotate -90deg around X) and position just above ground
    ringMesh.rotation.x = -Math.PI / 2
    ringMesh.position.set(bld.position.x, 0.05, bld.position.z)
    scene.add(ringMesh)

    rings.push({ mesh: ringMesh, mat: ringMat })
  }

  // ────────────────────────────────────────────────────────────
  // Update — called every frame
  // ────────────────────────────────────────────────────────────
  let elapsed = 0

  function update(dt) {
    elapsed += dt

    // --- Animate particles ---
    const posAttr = particleGeom.getAttribute('position')
    const posArr  = posAttr.array

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      const phase = phases[i]
      const spd   = speeds[i]

      // Drift upward
      posArr[i3 + 1] += BASE_DRIFT_SPEED * spd * dt

      // Lateral sway (sin/cos with unique phase)
      posArr[i3]     += Math.sin(elapsed * 0.5 + phase) * LATERAL_AMPLITUDE * dt
      posArr[i3 + 2] += Math.cos(elapsed * 0.7 + phase * 1.3) * LATERAL_AMPLITUDE * dt

      // Wrap particles that go too high back to the bottom
      if (posArr[i3 + 1] > MAX_Y) {
        posArr[i3 + 1] = MIN_Y
        // Randomize x/z to avoid obvious repetition
        posArr[i3]     = (Math.random() - 0.5) * SPREAD_X * 2
        posArr[i3 + 2] = (Math.random() - 0.5) * SPREAD_Z * 2
      }
    }
    posAttr.needsUpdate = true

    // --- Pulse beacons and rings ---
    // Sinusoidal pulse: opacity oscillates between 0.1 and 0.3
    const pulse = 0.1 + 0.1 * (1 + Math.sin(elapsed * 1.5))  // range: 0.1 to 0.3

    for (const beacon of beacons) {
      beacon.mat.opacity = pulse
    }

    // Ring pulse synchronized with beacon (slightly attenuated)
    const ringPulse = 0.08 + 0.07 * (1 + Math.sin(elapsed * 1.5))  // range: 0.08 to 0.22

    for (const ring of rings) {
      ring.mat.opacity = ringPulse
    }
  }

  return { update }
}
