import * as THREE from 'three'

// Dust constants
const MAX_PARTICLES        = 120
const PARTICLE_LIFETIME    = 35
const EMIT_SPEED_THRESHOLD = 0.5  // raised for physics-based speed (m/s)

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
  const hlL = new THREE.Mesh(hlGeo, hlMat); hlL.position.set(-0.3, 0.04, 0.96)
  const hlR = new THREE.Mesh(hlGeo, hlMat); hlR.position.set( 0.3, 0.04, 0.96)
  group.add(hlL, hlR)

  // Taillights
  const tlMat = new THREE.MeshStandardMaterial({ color: '#ff2222', emissive: '#ff0000', emissiveIntensity: 0.6 })
  const tlGeo = new THREE.BoxGeometry(0.2, 0.1, 0.05)
  const tlL = new THREE.Mesh(tlGeo, tlMat); tlL.position.set(-0.3, 0.04, -0.96)
  const tlR = new THREE.Mesh(tlGeo, tlMat); tlR.position.set( 0.3, 0.04, -0.96)
  group.add(tlL, tlR)

  // Wheels — no spin (user preference), front wheels steer visually
  const wheelGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.16, 8)
  const wheelMat = new THREE.MeshStandardMaterial({ color: '#222222', flatShading: true })
  function makeWheel() {
    const mesh = new THREE.Mesh(wheelGeo, wheelMat)
    mesh.rotation.z = Math.PI / 2
    mesh.castShadow = true
    return mesh
  }

  const flGroup = new THREE.Group(); flGroup.position.set(-0.57, -0.13,  0.62); flGroup.add(makeWheel())
  const frGroup = new THREE.Group(); frGroup.position.set( 0.57, -0.13,  0.62); frGroup.add(makeWheel())
  const rlWheel = makeWheel();       rlWheel.position.set(-0.57, -0.13, -0.62)
  const rrWheel = makeWheel();       rrWheel.position.set( 0.57, -0.13, -0.62)
  group.add(flGroup, frGroup, rlWheel, rrWheel)

  return { group, flGroup, frGroup }
}

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

/**
 * createCar — builds the visual car mesh.
 * Physics is handled externally; this module only syncs visuals.
 */
export function createCar(scene) {
  const { group: carGroup, flGroup, frGroup } = buildCarMesh()
  scene.add(carGroup)

  const dust = buildDustSystem(scene)

  /**
   * syncMesh — called after physics step to copy Bullet transform to Three.js mesh
   */
  function syncMesh(carState) {
    // Use quaternion directly from Bullet (full 3D rotation)
    carGroup.position.copy(carState.position)
    carGroup.quaternion.copy(carState.quaternion)

    // Front wheel visual steering
    flGroup.rotation.y = carState.steer
    frGroup.rotation.y = carState.steer

    _updateDust(dust, carState)
  }

  return { carGroup, syncMesh }
}

function _updateDust(dust, state) {
  const { position, rotation, speed } = state
  const { geo, mat, positions, particles } = dust

  if (speed > EMIT_SPEED_THRESHOLD && particles.length < MAX_PARTICLES) {
    const rearX = position.x - Math.sin(rotation) * 1.05
    const rearZ = position.z - Math.cos(rotation) * 1.05
    const count = speed > 3 ? 2 : 1
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
