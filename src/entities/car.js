import * as THREE from 'three'

// Physics constants — from Car.tsx
const ACCELERATION   = 0.02
const MAX_SPEED      = 0.4
const REVERSE_SPEED  = 0.18
const FRICTION       = 0.88
const STEER_SPEED    = 0.032   // radians/frame
const MAX_STEER_VIS  = 0.5     // max visual front-wheel steer angle (radians)
const STEER_VIS_LERP = 0.14    // how fast the visual wheels animate
const GROUND_Y       = 0.28

// Dust constants — from DustParticles.tsx
const MAX_PARTICLES        = 120
const PARTICLE_LIFETIME    = 35
const EMIT_SPEED_THRESHOLD = 0.01

// Module-level reusables
const _euler = new THREE.Euler()
const _quat  = new THREE.Quaternion()

function buildCarMesh() {
  const group = new THREE.Group()

  const flatMat = (color) =>
    new THREE.MeshStandardMaterial({ color, flatShading: true })

  // Car body
  const body = new THREE.Mesh(new THREE.BoxGeometry(1, 0.38, 1.9), flatMat('#ff6b35'))
  body.castShadow = true
  group.add(body)

  // Cabin
  const cabin = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.34, 1.1), flatMat('#ff8c5a'))
  cabin.position.set(0, 0.34, -0.05)
  cabin.castShadow = true
  group.add(cabin)

  // Windshield
  const windshield = new THREE.Mesh(
    new THREE.BoxGeometry(0.72, 0.28, 0.05),
    new THREE.MeshStandardMaterial({ color: '#88bbee', transparent: true, opacity: 0.7, flatShading: true })
  )
  windshield.position.set(0, 0.36, 0.52)
  windshield.rotation.x = 0.25
  group.add(windshield)

  // Rear window
  const rearWindow = new THREE.Mesh(
    new THREE.BoxGeometry(0.72, 0.28, 0.05),
    new THREE.MeshStandardMaterial({ color: '#88bbee', transparent: true, opacity: 0.7, flatShading: true })
  )
  rearWindow.position.set(0, 0.36, -0.62)
  rearWindow.rotation.x = -0.25
  group.add(rearWindow)

  // Headlights
  const hlMat = new THREE.MeshStandardMaterial({ color: '#ffffcc', emissive: '#ffff88', emissiveIntensity: 0.5 })
  const hlGeo = new THREE.BoxGeometry(0.2, 0.1, 0.05)
  const hlL = new THREE.Mesh(hlGeo, hlMat)
  hlL.position.set(-0.3, 0.04, 0.96)
  const hlR = new THREE.Mesh(hlGeo, hlMat)
  hlR.position.set(0.3, 0.04, 0.96)
  group.add(hlL, hlR)

  // Taillights
  const tlMat = new THREE.MeshStandardMaterial({ color: '#ff2222', emissive: '#ff0000', emissiveIntensity: 0.6 })
  const tlGeo = new THREE.BoxGeometry(0.2, 0.1, 0.05)
  const tlL = new THREE.Mesh(tlGeo, tlMat)
  tlL.position.set(-0.3, 0.04, -0.96)
  const tlR = new THREE.Mesh(tlGeo, tlMat)
  tlR.position.set(0.3, 0.04, -0.96)
  group.add(tlL, tlR)

  // Wheel geometry + material reused for all 4 wheels
  const wheelGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.16, 8)
  const wheelMat = new THREE.MeshStandardMaterial({ color: '#222222', flatShading: true })

  function makeWheel() {
    const mesh = new THREE.Mesh(wheelGeo, wheelMat)
    mesh.rotation.z = Math.PI / 2
    mesh.castShadow = true
    return mesh
  }

  // Front-left wheel group (steering rotation on Y)
  const flGroup = new THREE.Group()
  flGroup.position.set(-0.57, -0.13, 0.62)
  flGroup.add(makeWheel())
  group.add(flGroup)

  // Front-right wheel group
  const frGroup = new THREE.Group()
  frGroup.position.set(0.57, -0.13, 0.62)
  frGroup.add(makeWheel())
  group.add(frGroup)

  // Rear-left wheel (static, no group needed)
  const rlWheel = makeWheel()
  rlWheel.position.set(-0.57, -0.13, -0.62)
  group.add(rlWheel)

  // Rear-right wheel (static)
  const rrWheel = makeWheel()
  rrWheel.position.set(0.57, -0.13, -0.62)
  group.add(rrWheel)

  return { group, flGroup, frGroup }
}

function buildDustSystem(scene) {
  const positions = new Float32Array(MAX_PARTICLES * 3)
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  const mat = new THREE.PointsMaterial({
    color: '#c8a96e',
    size: 0.18,
    transparent: true,
    opacity: 0,
    sizeAttenuation: true,
    depthWrite: false,
  })

  const points = new THREE.Points(geo, mat)
  scene.add(points)

  return { geo, mat, positions, particles: [] }
}

export function createCar(scene, rigidBody) {
  const { group: carGroup, flGroup, frGroup } = buildCarMesh()
  carGroup.position.set(0, GROUND_Y, 0)
  scene.add(carGroup)

  const dust = buildDustSystem(scene)

  // Car state — shared with camera and updated each frame
  const carState = {
    position: new THREE.Vector3(0, GROUND_Y, 0),
    rotation: 0,
    speed: 0,
  }

  let velocity   = 0
  let rotation   = 0
  let steerAngle = 0

  function update(keys) {
    // ── Acceleration / braking ────────────────────────────────────────────
    if (keys.forward) {
      velocity = Math.min(velocity + ACCELERATION, MAX_SPEED)
    } else if (keys.backward) {
      velocity = Math.max(velocity - ACCELERATION, -REVERSE_SPEED)
    } else {
      velocity *= FRICTION
      if (Math.abs(velocity) < 0.001) velocity = 0
    }

    // ── Steering (only effective when moving) ─────────────────────────────
    if (Math.abs(velocity) > 0.001) {
      const steerDir = velocity > 0 ? 1 : -1
      if (keys.left)  rotation += STEER_SPEED * steerDir
      if (keys.right) rotation -= STEER_SPEED * steerDir
    }

    // ── Front wheel visual steering lerp ──────────────────────────────────
    const targetSteer = keys.left ? MAX_STEER_VIS : keys.right ? -MAX_STEER_VIS : 0
    steerAngle += (targetSteer - steerAngle) * STEER_VIS_LERP
    flGroup.rotation.y = steerAngle
    frGroup.rotation.y = steerAngle

    // ── Position ──────────────────────────────────────────────────────────
    carState.position.x += Math.sin(rotation) * velocity
    carState.position.y  = GROUND_Y
    carState.position.z += Math.cos(rotation) * velocity
    carState.rotation    = rotation
    carState.speed       = velocity

    // ── Push kinematic body ───────────────────────────────────────────────
    rigidBody.setNextKinematicTranslation({
      x: carState.position.x,
      y: carState.position.y,
      z: carState.position.z,
    })
    _euler.set(0, rotation, 0)
    _quat.setFromEuler(_euler)
    rigidBody.setNextKinematicRotation({ x: _quat.x, y: _quat.y, z: _quat.z, w: _quat.w })

    // ── Sync mesh (must be called after world.step() in main.js) ──────────
    // We sync directly from carState.position since we control the kinematic body
    carGroup.position.copy(carState.position)
    carGroup.rotation.y = rotation

    // ── Dust particles ─────────────────────────────────────────────────────
    _updateDust(dust, carState)
  }

  return { carGroup, carState, update }
}

function _updateDust(dust, carState) {
  const { position, rotation, speed } = carState
  const { geo, mat, positions, particles } = dust

  // Emit new particles when moving
  if (Math.abs(speed) > EMIT_SPEED_THRESHOLD && particles.length < MAX_PARTICLES) {
    const rearOffset = 1.05
    const rearX = position.x - Math.sin(rotation) * rearOffset
    const rearZ = position.z - Math.cos(rotation) * rearOffset
    const emitCount = Math.abs(speed) > 0.1 ? 2 : 1

    for (let i = 0; i < emitCount; i++) {
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

  // Age and remove dead particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].life--
    particles[i].position.add(particles[i].velocity)
    particles[i].velocity.y *= 0.98
    if (particles[i].life <= 0) particles.splice(i, 1)
  }

  // Update buffer
  const count = particles.length
  for (let i = 0; i < count; i++) {
    positions[i * 3]     = particles[i].position.x
    positions[i * 3 + 1] = particles[i].position.y
    positions[i * 3 + 2] = particles[i].position.z
  }
  // Hide unused slots below ground
  for (let i = count; i < MAX_PARTICLES; i++) {
    positions[i * 3 + 1] = -999
  }
  geo.attributes.position.needsUpdate = true
  geo.setDrawRange(0, count)

  // Fade opacity with average particle age
  if (count > 0) {
    const avgLife = particles.reduce((s, p) => s + p.life / p.maxLife, 0) / count
    mat.opacity = avgLife * 0.75
  } else {
    mat.opacity = 0
  }
}
