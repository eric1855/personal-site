/**
 * Space Launch Site Zone — futuristic space launch facility south of the city.
 * Center: x=0, z=50, radius ~18.
 *
 * Features a tall rocket on launch pad, satellite dishes (animated rotation),
 * control tower, moon rover, astronaut figure, and many sci-fi props.
 * Dynamic objects: equipment crates, fuel barrels, small satellites on stands.
 * Warning lights pulse red in update().
 */
import * as THREE from 'three'

// ── Zone center ──────────────────────────────────────────────────────────
const CX = 0
const CZ = 50

// ── Reusable temp objects ────────────────────────────────────────────────
const _q = new THREE.Quaternion()
const _e = new THREE.Euler()

// ── Sci-fi palette materials ─────────────────────────────────────────────
function mat(color, opts = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    flatShading: true,
    ...opts,
  })
}

function shadow(mesh) {
  mesh.castShadow = true
  mesh.receiveShadow = true
  return mesh
}

// Colors
const WHITE = 0xffffff
const SILVER = 0xb0b0b0
const DARK_GRAY = 0x4a4a4a
const BLUE = 0x1565c0
const LIGHT_BLUE = 0x42a5f5
const RED = 0xcc2222
const DARK_RED = 0x8b1a1a
const ORANGE = 0xff6600
const YELLOW = 0xffdd44
const BLACK = 0x111111
const STEEL = 0x78909c
const PANEL_BLUE = 0x0d47a1
const EMISSIVE_GREEN = 0x00ff66
const EMISSIVE_CYAN = 0x00ccff

export function createSpaceStation(scene, RAPIER, world) {
  const syncList = []
  const group = new THREE.Group()

  // Animated object refs
  const dishes = []
  const warningLights = []
  let elapsedTime = 0

  // ─── GROUND: DARK CONCRETE PAD ────────────────────────────────────
  const groundGeo = new THREE.CircleGeometry(20, 16)
  const groundMesh = new THREE.Mesh(groundGeo, mat(DARK_GRAY))
  groundMesh.rotation.x = -Math.PI / 2
  groundMesh.position.set(CX, 0.02, CZ)
  groundMesh.receiveShadow = true
  group.add(groundMesh)

  // Landing pad markings — outer circle
  const padCircleGeo = new THREE.RingGeometry(4.5, 4.8, 24)
  const padCircle = new THREE.Mesh(padCircleGeo, mat(WHITE))
  padCircle.rotation.x = -Math.PI / 2
  padCircle.position.set(CX + 8, 0.025, CZ - 6)
  group.add(padCircle)

  // Landing pad markings — inner circle
  const padInnerGeo = new THREE.RingGeometry(2.0, 2.2, 20)
  const padInner = new THREE.Mesh(padInnerGeo, mat(YELLOW))
  padInner.rotation.x = -Math.PI / 2
  padInner.position.set(CX + 8, 0.025, CZ - 6)
  group.add(padInner)

  // Landing pad "H" — two vertical bars + crossbar
  const hBarMat = mat(WHITE)
  for (let side = -1; side <= 1; side += 2) {
    const vBar = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 2.5), hBarMat)
    vBar.rotation.x = -Math.PI / 2
    vBar.position.set(CX + 8 + side * 0.9, 0.026, CZ - 6)
    group.add(vBar)
  }
  const crossBar = new THREE.Mesh(new THREE.PlaneGeometry(1.8, 0.4), hBarMat)
  crossBar.rotation.x = -Math.PI / 2
  crossBar.position.set(CX + 8, 0.026, CZ - 6)
  group.add(crossBar)

  // Landing lights — emissive white circles around pad
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2
    const lightGeo = new THREE.CircleGeometry(0.2, 8)
    const lightMat = new THREE.MeshStandardMaterial({
      color: WHITE,
      emissive: WHITE,
      emissiveIntensity: 1.5,
      flatShading: true,
    })
    const lightMesh = new THREE.Mesh(lightGeo, lightMat)
    lightMesh.rotation.x = -Math.PI / 2
    lightMesh.position.set(
      CX + 8 + Math.cos(angle) * 5.2,
      0.025,
      CZ - 6 + Math.sin(angle) * 5.2
    )
    group.add(lightMesh)
  }

  // ─── ROCKET (CENTERPIECE) ────────────────────────────────────────
  const rocketGroup = new THREE.Group()
  const rocketX = CX
  const rocketZ = CZ + 2
  rocketGroup.position.set(rocketX, 0, rocketZ)

  // Launch pad platform
  const padGeo = new THREE.CylinderGeometry(3.5, 3.5, 0.3, 8)
  const pad = shadow(new THREE.Mesh(padGeo, mat(STEEL)))
  pad.position.y = 0.15
  rocketGroup.add(pad)

  // Pad support ring
  const padRingGeo = new THREE.CylinderGeometry(3.7, 3.7, 0.15, 8)
  const padRing = shadow(new THREE.Mesh(padRingGeo, mat(DARK_GRAY)))
  padRing.position.y = 0.05
  rocketGroup.add(padRing)

  // Engine nozzle (dark cone under the body)
  const nozzleGeo = new THREE.ConeGeometry(0.8, 1.2, 8)
  const nozzle = shadow(new THREE.Mesh(nozzleGeo, mat(0x333333)))
  nozzle.position.y = 0.9
  rocketGroup.add(nozzle)

  // Inner nozzle glow
  const nozzleInnerGeo = new THREE.ConeGeometry(0.5, 0.6, 8)
  const nozzleInner = new THREE.Mesh(nozzleInnerGeo, new THREE.MeshStandardMaterial({
    color: ORANGE,
    emissive: ORANGE,
    emissiveIntensity: 0.5,
    flatShading: true,
  }))
  nozzleInner.position.y = 0.6
  rocketGroup.add(nozzleInner)

  // Rocket body — tall white cylinder
  const bodyGeo = new THREE.CylinderGeometry(1.0, 1.2, 10, 8)
  const rocketBody = shadow(new THREE.Mesh(bodyGeo, mat(WHITE)))
  rocketBody.position.y = 6.5
  rocketGroup.add(rocketBody)

  // Blue stripe (lower)
  const blueStripeGeo = new THREE.CylinderGeometry(1.22, 1.22, 0.6, 8)
  const blueStripe = shadow(new THREE.Mesh(blueStripeGeo, mat(BLUE)))
  blueStripe.position.y = 3.5
  rocketGroup.add(blueStripe)

  // Red stripe (upper)
  const redStripeGeo = new THREE.CylinderGeometry(1.05, 1.05, 0.5, 8)
  const redStripe = shadow(new THREE.Mesh(redStripeGeo, mat(RED)))
  redStripe.position.y = 9.0
  rocketGroup.add(redStripe)

  // Second blue stripe
  const blueStripe2Geo = new THREE.CylinderGeometry(1.1, 1.1, 0.4, 8)
  const blueStripe2 = shadow(new THREE.Mesh(blueStripe2Geo, mat(BLUE)))
  blueStripe2.position.y = 6.0
  rocketGroup.add(blueStripe2)

  // Nose cone (red)
  const noseGeo = new THREE.ConeGeometry(1.0, 3.0, 8)
  const nose = shadow(new THREE.Mesh(noseGeo, mat(RED)))
  nose.position.y = 13.0
  rocketGroup.add(nose)

  // Nose tip highlight
  const noseTipGeo = new THREE.ConeGeometry(0.15, 0.5, 6)
  const noseTip = shadow(new THREE.Mesh(noseTipGeo, mat(WHITE)))
  noseTip.position.y = 14.3
  rocketGroup.add(noseTip)

  // Fins (4 angled boxes)
  for (let i = 0; i < 4; i++) {
    const angle = (i / 4) * Math.PI * 2
    const finGroup = new THREE.Group()
    finGroup.rotation.y = angle

    const finGeo = new THREE.BoxGeometry(0.1, 2.5, 1.2)
    const fin = shadow(new THREE.Mesh(finGeo, mat(SILVER)))
    fin.position.set(0, 2.0, 1.4)
    fin.rotation.x = -0.15
    finGroup.add(fin)

    // Fin tip accent
    const finTipGeo = new THREE.BoxGeometry(0.12, 0.6, 0.5)
    const finTip = shadow(new THREE.Mesh(finTipGeo, mat(RED)))
    finTip.position.set(0, 3.1, 1.2)
    finGroup.add(finTip)

    rocketGroup.add(finGroup)
  }

  // Porthole windows on rocket body
  for (let i = 0; i < 3; i++) {
    const portGeo = new THREE.CircleGeometry(0.15, 8)
    const portMat = new THREE.MeshStandardMaterial({
      color: LIGHT_BLUE,
      emissive: EMISSIVE_CYAN,
      emissiveIntensity: 0.6,
      flatShading: true,
    })
    const port = new THREE.Mesh(portGeo, portMat)
    port.position.set(0, 7.0 + i * 1.2, 1.01)
    rocketGroup.add(port)
  }

  group.add(rocketGroup)

  // Rocket collider (fixed)
  {
    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(rocketX, 6.5, rocketZ)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cylinder(6.5, 1.2).setFriction(0.5),
      body
    )
  }

  // Launch pad collider
  {
    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(rocketX, 0.15, rocketZ)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cylinder(0.15, 3.5).setFriction(0.6),
      body
    )
  }

  // ─── GANTRY TOWER ────────────────────────────────────────────────
  const gantryGroup = new THREE.Group()
  const gantryX = rocketX - 3.5
  const gantryZ = rocketZ
  gantryGroup.position.set(gantryX, 0, gantryZ)

  // 4 vertical beams
  for (let lx = -1; lx <= 1; lx += 2) {
    for (let lz = -1; lz <= 1; lz += 2) {
      const beamGeo = new THREE.BoxGeometry(0.2, 14, 0.2)
      const beam = shadow(new THREE.Mesh(beamGeo, mat(STEEL)))
      beam.position.set(lx * 0.8, 7, lz * 0.8)
      gantryGroup.add(beam)
    }
  }

  // Horizontal cross-braces
  for (let h = 0; h < 6; h++) {
    const braceGeo = new THREE.BoxGeometry(1.8, 0.1, 0.1)
    const brace = shadow(new THREE.Mesh(braceGeo, mat(STEEL)))
    brace.position.set(0, 2 + h * 2.2, 0.8)
    gantryGroup.add(brace)

    const brace2 = shadow(new THREE.Mesh(braceGeo.clone(), mat(STEEL)))
    brace2.position.set(0, 2 + h * 2.2, -0.8)
    gantryGroup.add(brace2)
  }

  // Gantry arm extending toward rocket
  const armGeo = new THREE.BoxGeometry(3.0, 0.15, 0.3)
  const arm = shadow(new THREE.Mesh(armGeo, mat(SILVER)))
  arm.position.set(2.0, 10, 0)
  gantryGroup.add(arm)

  // Arm support diagonal
  const diagGeo = new THREE.BoxGeometry(0.1, 3.0, 0.1)
  const diag = shadow(new THREE.Mesh(diagGeo, mat(STEEL)))
  diag.position.set(1.5, 8.8, 0)
  diag.rotation.z = 0.5
  gantryGroup.add(diag)

  // Red warning light on top of gantry
  const gantryLightGeo = new THREE.SphereGeometry(0.2, 6, 6)
  const gantryLightMat = new THREE.MeshStandardMaterial({
    color: RED,
    emissive: RED,
    emissiveIntensity: 2.0,
    flatShading: true,
  })
  const gantryLight = new THREE.Mesh(gantryLightGeo, gantryLightMat)
  gantryLight.position.y = 14.3
  gantryGroup.add(gantryLight)
  warningLights.push(gantryLight)

  group.add(gantryGroup)

  // Gantry collider
  {
    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(gantryX, 7, gantryZ)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(1.0, 7, 1.0).setFriction(0.5),
      body
    )
  }

  // ─── SATELLITE DISHES (3) ────────────────────────────────────────
  const dishPositions = [
    [CX - 10, CZ + 8, 0],
    [CX - 12, CZ + 3, 0.4],
    [CX - 8, CZ + 12, -0.3],
  ]
  for (let i = 0; i < dishPositions.length; i++) {
    const [dx, dz, initRot] = dishPositions[i]
    const dishGroup = new THREE.Group()
    dishGroup.position.set(dx, 0, dz)
    dishGroup.rotation.y = initRot

    // Pedestal
    const pedestalGeo = new THREE.CylinderGeometry(0.4, 0.6, 1.5, 6)
    const pedestal = shadow(new THREE.Mesh(pedestalGeo, mat(STEEL)))
    pedestal.position.y = 0.75
    dishGroup.add(pedestal)

    // Support arm
    const supportGeo = new THREE.CylinderGeometry(0.15, 0.15, 2.0, 6)
    const support = shadow(new THREE.Mesh(supportGeo, mat(SILVER)))
    support.position.y = 2.2
    support.rotation.x = 0.3
    dishGroup.add(support)

    // Dish (inverted cone — wide opening up)
    const dishGeo = new THREE.ConeGeometry(2.5, 1.2, 8)
    const dish = shadow(new THREE.Mesh(dishGeo, mat(WHITE)))
    dish.position.y = 3.2
    dish.rotation.x = Math.PI // flip so opening faces up
    dishGroup.add(dish)

    // Inner dish surface
    const innerDishGeo = new THREE.ConeGeometry(2.3, 0.8, 8)
    const innerDish = shadow(new THREE.Mesh(innerDishGeo, mat(SILVER)))
    innerDish.position.y = 3.0
    innerDish.rotation.x = Math.PI
    dishGroup.add(innerDish)

    // Feed horn (cylinder pointing up from center)
    const hornGeo = new THREE.CylinderGeometry(0.08, 0.12, 1.5, 6)
    const horn = shadow(new THREE.Mesh(hornGeo, mat(DARK_GRAY)))
    horn.position.y = 3.5
    dishGroup.add(horn)

    // Feed horn tip
    const hornTipGeo = new THREE.SphereGeometry(0.15, 6, 6)
    const hornTip = shadow(new THREE.Mesh(hornTipGeo, mat(RED)))
    hornTip.position.y = 4.3
    dishGroup.add(hornTip)

    group.add(dishGroup)
    dishes.push({ group: dishGroup, speed: 0.15 + i * 0.08 })
  }

  // ─── CONTROL TOWER ───────────────────────────────────────────────
  const towerGroup = new THREE.Group()
  const towerX = CX + 10
  const towerZ = CZ + 10
  towerGroup.position.set(towerX, 0, towerZ)

  // Base floor (wide)
  const base1Geo = new THREE.BoxGeometry(4, 2.5, 3.5)
  const base1 = shadow(new THREE.Mesh(base1Geo, mat(SILVER)))
  base1.position.y = 1.25
  towerGroup.add(base1)

  // Middle floor (slightly narrower)
  const base2Geo = new THREE.BoxGeometry(3.5, 2.5, 3.0)
  const base2 = shadow(new THREE.Mesh(base2Geo, mat(STEEL)))
  base2.position.y = 3.75
  towerGroup.add(base2)

  // Top floor (observation deck with blue windows)
  const topGeo = new THREE.BoxGeometry(4.2, 2.0, 3.8)
  const topFloor = shadow(new THREE.Mesh(topGeo, new THREE.MeshStandardMaterial({
    color: BLUE,
    flatShading: true,
    transparent: true,
    opacity: 0.7,
  })))
  topFloor.position.y = 6.0
  towerGroup.add(topFloor)

  // Window frame overlay
  const frameGeo = new THREE.BoxGeometry(4.25, 0.1, 3.85)
  for (let fy = 0; fy < 3; fy++) {
    const frame = shadow(new THREE.Mesh(frameGeo, mat(SILVER)))
    frame.position.y = 5.2 + fy * 0.8
    towerGroup.add(frame)
  }

  // Vertical window dividers on front face
  for (let vd = -1; vd <= 1; vd++) {
    const divGeo = new THREE.BoxGeometry(0.08, 2.0, 0.08)
    const div = shadow(new THREE.Mesh(divGeo, mat(SILVER)))
    div.position.set(vd * 1.2, 6.0, 1.92)
    towerGroup.add(div)
  }

  // Roof slab
  const roofGeo = new THREE.BoxGeometry(4.5, 0.2, 4.0)
  const roof = shadow(new THREE.Mesh(roofGeo, mat(DARK_GRAY)))
  roof.position.y = 7.1
  towerGroup.add(roof)

  // Antenna array — 3 thin vertical rods
  for (let ai = -1; ai <= 1; ai++) {
    const antennaGeo = new THREE.CylinderGeometry(0.03, 0.03, 2.5, 4)
    const antenna = shadow(new THREE.Mesh(antennaGeo, mat(STEEL)))
    antenna.position.set(ai * 0.6, 8.4, 0)
    towerGroup.add(antenna)

    // Small cross-element
    if (ai === 0) {
      const crossElGeo = new THREE.BoxGeometry(1.0, 0.04, 0.04)
      const crossEl = shadow(new THREE.Mesh(crossElGeo, mat(STEEL)))
      crossEl.position.set(0, 9.2, 0)
      towerGroup.add(crossEl)

      const crossEl2 = shadow(new THREE.Mesh(crossElGeo.clone(), mat(STEEL)))
      crossEl2.position.set(0, 8.8, 0)
      towerGroup.add(crossEl2)
    }
  }

  // Radar dome (hemisphere on roof)
  const radarGeo = new THREE.SphereGeometry(0.8, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2)
  const radar = shadow(new THREE.Mesh(radarGeo, mat(WHITE)))
  radar.position.set(-1.2, 7.2, 0)
  towerGroup.add(radar)

  // Warning light on tower roof
  const towerLightGeo = new THREE.SphereGeometry(0.15, 6, 6)
  const towerLightMat = new THREE.MeshStandardMaterial({
    color: RED,
    emissive: RED,
    emissiveIntensity: 2.0,
    flatShading: true,
  })
  const towerLight = new THREE.Mesh(towerLightGeo, towerLightMat)
  towerLight.position.set(1.5, 7.4, 0)
  towerGroup.add(towerLight)
  warningLights.push(towerLight)

  // Door
  const doorGeo = new THREE.BoxGeometry(0.8, 1.5, 0.1)
  const door = shadow(new THREE.Mesh(doorGeo, mat(DARK_GRAY)))
  door.position.set(0, 0.75, 1.76)
  towerGroup.add(door)

  group.add(towerGroup)

  // Control tower collider (fixed)
  {
    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(towerX, 3.5, towerZ)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(2.2, 3.5, 2.0).setFriction(0.5),
      body
    )
  }

  // ─── MOON ROVER ──────────────────────────────────────────────────
  const roverGroup = new THREE.Group()
  const roverX = CX + 12
  const roverZ = CZ - 4
  roverGroup.position.set(roverX, 0, roverZ)

  // Body (boxy, gray)
  const roverBodyGeo = new THREE.BoxGeometry(1.6, 0.7, 2.4)
  const roverBody = shadow(new THREE.Mesh(roverBodyGeo, mat(SILVER)))
  roverBody.position.y = 0.8
  roverGroup.add(roverBody)

  // Upper instrument section
  const roverUpperGeo = new THREE.BoxGeometry(1.2, 0.4, 1.4)
  const roverUpper = shadow(new THREE.Mesh(roverUpperGeo, mat(STEEL)))
  roverUpper.position.set(0, 1.35, -0.3)
  roverGroup.add(roverUpper)

  // Wheels (4 thick cylinders)
  const wheelGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.25, 8)
  const wheelMat = mat(DARK_GRAY)
  const wheelPositions = [
    [-0.9, 0.35, -0.8],
    [0.9, 0.35, -0.8],
    [-0.9, 0.35, 0.8],
    [0.9, 0.35, 0.8],
  ]
  for (const [wx, wy, wz] of wheelPositions) {
    const wheel = shadow(new THREE.Mesh(wheelGeo, wheelMat))
    wheel.position.set(wx, wy, wz)
    wheel.rotation.z = Math.PI / 2
    roverGroup.add(wheel)

    // Hub cap
    const hubGeo = new THREE.CircleGeometry(0.18, 6)
    const hub = new THREE.Mesh(hubGeo, mat(SILVER))
    hub.position.set(wx > 0 ? wx + 0.13 : wx - 0.13, wy, wz)
    hub.rotation.y = wx > 0 ? Math.PI / 2 : -Math.PI / 2
    roverGroup.add(hub)
  }

  // Antenna mast
  const roverAntennaGeo = new THREE.CylinderGeometry(0.03, 0.03, 1.8, 4)
  const roverAntenna = shadow(new THREE.Mesh(roverAntennaGeo, mat(STEEL)))
  roverAntenna.position.set(-0.4, 2.0, -0.6)
  roverGroup.add(roverAntenna)

  // Antenna dish
  const roverDishGeo = new THREE.SphereGeometry(0.2, 6, 4, 0, Math.PI * 2, 0, Math.PI / 2)
  const roverDish = shadow(new THREE.Mesh(roverDishGeo, mat(WHITE)))
  roverDish.position.set(-0.4, 2.9, -0.6)
  roverGroup.add(roverDish)

  // Solar panel (blue thin box)
  const solarPanelGeo = new THREE.BoxGeometry(1.8, 0.05, 1.0)
  const solarPanel = shadow(new THREE.Mesh(solarPanelGeo, mat(PANEL_BLUE)))
  solarPanel.position.set(0, 1.7, 0.5)
  roverGroup.add(solarPanel)

  // Solar panel frame
  const panelFrameGeo = new THREE.BoxGeometry(1.85, 0.08, 0.05)
  const panelFrame1 = shadow(new THREE.Mesh(panelFrameGeo, mat(STEEL)))
  panelFrame1.position.set(0, 1.7, 0.0)
  roverGroup.add(panelFrame1)
  const panelFrame2 = shadow(new THREE.Mesh(panelFrameGeo.clone(), mat(STEEL)))
  panelFrame2.position.set(0, 1.7, 1.0)
  roverGroup.add(panelFrame2)

  group.add(roverGroup)

  // Moon rover collider (fixed)
  {
    const bd = RAPIER.RigidBodyDesc.fixed().setTranslation(roverX, 0.8, roverZ)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(0.9, 0.8, 1.3).setFriction(0.5),
      body
    )
  }

  // ─── ASTRONAUT FIGURE ────────────────────────────────────────────
  const astroGroup = new THREE.Group()
  const astroX = CX + 5
  const astroZ = CZ + 6
  astroGroup.position.set(astroX, 0, astroZ)

  // Legs (2 white cylinders)
  for (let side = -1; side <= 1; side += 2) {
    const legGeo = new THREE.CylinderGeometry(0.12, 0.14, 0.8, 6)
    const leg = shadow(new THREE.Mesh(legGeo, mat(WHITE)))
    leg.position.set(side * 0.18, 0.4, 0)
    astroGroup.add(leg)

    // Boots (dark)
    const bootGeo = new THREE.BoxGeometry(0.2, 0.15, 0.3)
    const boot = shadow(new THREE.Mesh(bootGeo, mat(DARK_GRAY)))
    boot.position.set(side * 0.18, 0.07, 0.05)
    astroGroup.add(boot)
  }

  // Body (box)
  const astroBodyGeo = new THREE.BoxGeometry(0.55, 0.7, 0.35)
  const astroBody = shadow(new THREE.Mesh(astroBodyGeo, mat(WHITE)))
  astroBody.position.y = 1.15
  astroGroup.add(astroBody)

  // Backpack (life support)
  const backpackGeo = new THREE.BoxGeometry(0.45, 0.5, 0.2)
  const backpack = shadow(new THREE.Mesh(backpackGeo, mat(SILVER)))
  backpack.position.set(0, 1.15, -0.25)
  astroGroup.add(backpack)

  // Arms (2 cylinders)
  for (let side = -1; side <= 1; side += 2) {
    const armGeo2 = new THREE.CylinderGeometry(0.08, 0.08, 0.6, 6)
    const armMesh = shadow(new THREE.Mesh(armGeo2, mat(WHITE)))
    armMesh.position.set(side * 0.38, 1.1, 0)
    armMesh.rotation.z = side * 0.3
    astroGroup.add(armMesh)

    // Gloves
    const gloveGeo = new THREE.SphereGeometry(0.1, 6, 5)
    const glove = shadow(new THREE.Mesh(gloveGeo, mat(SILVER)))
    glove.position.set(side * 0.5, 0.82, 0)
    astroGroup.add(glove)
  }

  // Head (white sphere)
  const headGeo = new THREE.SphereGeometry(0.22, 8, 6)
  const head = shadow(new THREE.Mesh(headGeo, mat(WHITE)))
  head.position.y = 1.72
  astroGroup.add(head)

  // Visor (dark circle on face)
  const visorGeo = new THREE.SphereGeometry(0.18, 8, 6, 0, Math.PI, 0, Math.PI / 2)
  const visorMat = new THREE.MeshStandardMaterial({
    color: 0x112244,
    emissive: 0x112244,
    emissiveIntensity: 0.3,
    flatShading: true,
  })
  const visor = new THREE.Mesh(visorGeo, visorMat)
  visor.position.set(0, 1.72, 0.12)
  visor.rotation.x = -Math.PI / 2
  astroGroup.add(visor)

  group.add(astroGroup)

  // ─── FUEL TANKS (2 horizontal cylinders) ─────────────────────────
  const tankPositions = [
    [CX - 6, CZ - 4, 0.3],
    [CX - 4, CZ - 5, -0.2],
  ]
  for (const [tx, tz, rot] of tankPositions) {
    const tankGroup = new THREE.Group()
    tankGroup.position.set(tx, 0, tz)
    tankGroup.rotation.y = rot

    // Main tank body (horizontal)
    const tankGeo = new THREE.CylinderGeometry(0.6, 0.6, 3.0, 8)
    const tank = shadow(new THREE.Mesh(tankGeo, mat(WHITE)))
    tank.position.y = 0.7
    tank.rotation.z = Math.PI / 2
    tankGroup.add(tank)

    // End caps (hemispheres)
    for (let side = -1; side <= 1; side += 2) {
      const capGeo = new THREE.SphereGeometry(0.6, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2)
      const cap = shadow(new THREE.Mesh(capGeo, mat(WHITE)))
      cap.position.set(side * 1.5, 0.7, 0)
      cap.rotation.z = side > 0 ? -Math.PI / 2 : Math.PI / 2
      tankGroup.add(cap)
    }

    // Support cradles
    for (let ci = -1; ci <= 1; ci += 2) {
      const cradleGeo = new THREE.BoxGeometry(0.15, 0.5, 0.8)
      const cradle = shadow(new THREE.Mesh(cradleGeo, mat(STEEL)))
      cradle.position.set(ci * 0.8, 0.25, 0)
      tankGroup.add(cradle)
    }

    // Warning stripe
    const wStripeGeo = new THREE.CylinderGeometry(0.62, 0.62, 0.15, 8)
    const wStripe = shadow(new THREE.Mesh(wStripeGeo, mat(RED)))
    wStripe.position.y = 0.7
    wStripe.rotation.z = Math.PI / 2
    tankGroup.add(wStripe)

    group.add(tankGroup)
  }

  // ─── SOLAR PANEL ARRAY ───────────────────────────────────────────
  const solarArrayGroup = new THREE.Group()
  solarArrayGroup.position.set(CX - 12, 0, CZ - 6)

  // Support pole
  const solePoleGeo = new THREE.CylinderGeometry(0.1, 0.15, 2.5, 6)
  const solePole = shadow(new THREE.Mesh(solePoleGeo, mat(STEEL)))
  solePole.position.y = 1.25
  solarArrayGroup.add(solePole)

  // Panel array (2x3 grid of blue panels)
  for (let px = 0; px < 3; px++) {
    for (let pz = 0; pz < 2; pz++) {
      const panelGeo = new THREE.BoxGeometry(1.2, 0.06, 0.9)
      const panel = shadow(new THREE.Mesh(panelGeo, mat(PANEL_BLUE)))
      panel.position.set(-1.2 + px * 1.3, 2.6, -0.5 + pz * 1.0)
      panel.rotation.x = -0.3
      solarArrayGroup.add(panel)

      // Panel frame
      const pfGeo = new THREE.BoxGeometry(1.25, 0.08, 0.03)
      const pf = shadow(new THREE.Mesh(pfGeo, mat(STEEL)))
      pf.position.set(-1.2 + px * 1.3, 2.6, -0.5 + pz * 1.0)
      pf.rotation.x = -0.3
      solarArrayGroup.add(pf)
    }
  }

  group.add(solarArrayGroup)

  // ─── COMMUNICATION ANTENNA ───────────────────────────────────────
  const commAntennaGroup = new THREE.Group()
  commAntennaGroup.position.set(CX + 14, 0, CZ + 5)

  // Base
  const commBaseGeo = new THREE.CylinderGeometry(0.3, 0.5, 0.6, 6)
  const commBase = shadow(new THREE.Mesh(commBaseGeo, mat(STEEL)))
  commBase.position.y = 0.3
  commAntennaGroup.add(commBase)

  // Main mast
  const commMastGeo = new THREE.CylinderGeometry(0.06, 0.08, 6, 6)
  const commMast = shadow(new THREE.Mesh(commMastGeo, mat(SILVER)))
  commMast.position.y = 3.3
  commAntennaGroup.add(commMast)

  // Cross arms at top
  for (let ca = 0; ca < 3; ca++) {
    const crossArmGeo = new THREE.BoxGeometry(1.5, 0.05, 0.05)
    const crossArm = shadow(new THREE.Mesh(crossArmGeo, mat(STEEL)))
    crossArm.position.set(0, 5.5 + ca * 0.5, 0)
    commAntennaGroup.add(crossArm)
  }

  // Dipole elements
  for (let d = 0; d < 3; d++) {
    for (let side = -1; side <= 1; side += 2) {
      const dipoleGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.5, 4)
      const dipole = shadow(new THREE.Mesh(dipoleGeo, mat(SILVER)))
      dipole.position.set(side * 0.65, 5.5 + d * 0.5, 0)
      dipoleGeo.rotateZ(Math.PI / 2)
      commAntennaGroup.add(dipole)
    }
  }

  // Red warning light on top
  const commLightGeo = new THREE.SphereGeometry(0.1, 6, 6)
  const commLightMat = new THREE.MeshStandardMaterial({
    color: RED,
    emissive: RED,
    emissiveIntensity: 2.0,
    flatShading: true,
  })
  const commLight = new THREE.Mesh(commLightGeo, commLightMat)
  commLight.position.y = 6.5
  commAntennaGroup.add(commLight)
  warningLights.push(commLight)

  group.add(commAntennaGroup)

  // ─── EQUIPMENT CONTAINERS ────────────────────────────────────────
  const containerPositions = [
    [CX - 8, CZ + 14, 0.2, 0xeeeeee],
    [CX - 6, CZ + 14.5, -0.1, STEEL],
    [CX - 7, CZ + 13, 0, BLUE],
  ]
  for (const [cx, cz, rot, color] of containerPositions) {
    const contGeo = new THREE.BoxGeometry(2.5, 1.5, 1.2)
    const cont = shadow(new THREE.Mesh(contGeo, mat(color)))
    cont.position.set(cx, 0.75, cz)
    cont.rotation.y = rot
    group.add(cont)

    // Container ribs
    for (let r = 0; r < 4; r++) {
      const ribGeo = new THREE.BoxGeometry(0.06, 1.5, 1.22)
      const rib = shadow(new THREE.Mesh(ribGeo, mat(DARK_GRAY)))
      rib.position.set(cx - 0.9 + r * 0.6, 0.75, cz)
      rib.rotation.y = rot
      group.add(rib)
    }
  }

  // ─── CONTROL PANELS (3 with emissive screens) ───────────────────
  const panelPositions = [
    [CX + 6, CZ + 12, 0.5],
    [CX + 8, CZ + 11, 0.3],
    [CX - 2, CZ + 14, -0.6],
  ]
  for (const [px, pz, rot] of panelPositions) {
    const cpGroup = new THREE.Group()
    cpGroup.position.set(px, 0, pz)
    cpGroup.rotation.y = rot

    // Panel body
    const cpBodyGeo = new THREE.BoxGeometry(0.8, 1.2, 0.4)
    const cpBody = shadow(new THREE.Mesh(cpBodyGeo, mat(DARK_GRAY)))
    cpBody.position.y = 0.6
    cpGroup.add(cpBody)

    // Screen (emissive)
    const screenGeo = new THREE.BoxGeometry(0.6, 0.5, 0.02)
    const screenMat = new THREE.MeshStandardMaterial({
      color: 0x003322,
      emissive: EMISSIVE_GREEN,
      emissiveIntensity: 1.5,
      flatShading: true,
    })
    const screen = new THREE.Mesh(screenGeo, screenMat)
    screen.position.set(0, 0.9, 0.21)
    cpGroup.add(screen)

    // Button row (small colored circles)
    const buttonColors = [RED, YELLOW, EMISSIVE_GREEN]
    for (let b = 0; b < 3; b++) {
      const btnGeo = new THREE.SphereGeometry(0.04, 6, 4)
      const btn = new THREE.Mesh(btnGeo, new THREE.MeshStandardMaterial({
        color: buttonColors[b],
        emissive: buttonColors[b],
        emissiveIntensity: 0.8,
        flatShading: true,
      }))
      btn.position.set(-0.15 + b * 0.15, 0.55, 0.21)
      cpGroup.add(btn)
    }

    // Pedestal
    const cpPedGeo = new THREE.BoxGeometry(0.3, 0.3, 0.3)
    const cpPed = shadow(new THREE.Mesh(cpPedGeo, mat(STEEL)))
    cpPed.position.y = 0.15
    cpGroup.add(cpPed)

    group.add(cpGroup)
  }

  // ─── TELESCOPE ───────────────────────────────────────────────────
  const telescopeGroup = new THREE.Group()
  telescopeGroup.position.set(CX - 14, 0, CZ + 2)

  // Tripod legs
  for (let ti = 0; ti < 3; ti++) {
    const tAngle = (ti / 3) * Math.PI * 2
    const tripodLegGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.8, 4)
    const tripodLeg = shadow(new THREE.Mesh(tripodLegGeo, mat(DARK_GRAY)))
    tripodLeg.position.set(Math.cos(tAngle) * 0.4, 0.8, Math.sin(tAngle) * 0.4)
    tripodLeg.rotation.x = Math.sin(tAngle) * 0.25
    tripodLeg.rotation.z = -Math.cos(tAngle) * 0.25
    telescopeGroup.add(tripodLeg)
  }

  // Tube
  const tubeGeo = new THREE.CylinderGeometry(0.12, 0.18, 1.5, 8)
  const tube = shadow(new THREE.Mesh(tubeGeo, mat(WHITE)))
  tube.position.set(0, 1.6, 0)
  tube.rotation.z = 0.6
  telescopeGroup.add(tube)

  // Lens end
  const lensGeo = new THREE.CircleGeometry(0.18, 8)
  const lens = new THREE.Mesh(lensGeo, new THREE.MeshStandardMaterial({
    color: LIGHT_BLUE,
    emissive: EMISSIVE_CYAN,
    emissiveIntensity: 0.3,
    flatShading: true,
  }))
  lens.position.set(0.55, 2.1, 0)
  lens.rotation.y = Math.PI / 2
  lens.rotation.z = 0.6
  telescopeGroup.add(lens)

  // Eyepiece
  const eyeGeo = new THREE.CylinderGeometry(0.06, 0.08, 0.3, 6)
  const eyepiece = shadow(new THREE.Mesh(eyeGeo, mat(BLACK)))
  eyepiece.position.set(-0.5, 1.25, 0)
  eyepiece.rotation.z = 0.6
  telescopeGroup.add(eyepiece)

  group.add(telescopeGroup)

  // ─── DYNAMIC EQUIPMENT CRATES (4) ────────────────────────────────
  const cratePositions = [
    [CX + 3, 0.5, CZ - 8],
    [CX + 4, 0.5, CZ - 7.5],
    [CX + 3.5, 1.1, CZ - 7.8],
    [CX - 3, 0.5, CZ + 8],
  ]
  for (const [cx, cy, cz] of cratePositions) {
    const crateSize = 0.35
    const crateGeo = new THREE.BoxGeometry(crateSize * 2, crateSize * 2, crateSize * 2)
    const crateMesh = shadow(new THREE.Mesh(crateGeo, mat(STEEL)))
    crateMesh.position.set(cx, cy, cz)
    group.add(crateMesh)

    // Orange warning stripe on crate
    const cStripeGeo = new THREE.BoxGeometry(crateSize * 2.02, 0.1, crateSize * 2.02)
    const cStripe = shadow(new THREE.Mesh(cStripeGeo, mat(ORANGE)))
    cStripe.position.set(cx, cy, cz)
    group.add(cStripe)
    // Note: the stripe doesn't get synced — crate is small, visual only enhancement

    const bd = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(cx, cy, cz)
      .setLinearDamping(0.4)
      .setAngularDamping(0.5)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(crateSize, crateSize, crateSize)
        .setDensity(4.0)
        .setFriction(0.5)
        .setRestitution(0.15),
      body
    )
    syncList.push({ mesh: crateMesh, body })
  }

  // ─── DYNAMIC FUEL BARRELS (3) ────────────────────────────────────
  const barrelPositions = [
    [CX - 2, 0.55, CZ - 7],
    [CX - 1, 0.55, CZ - 8],
    [CX - 1.5, 0.55, CZ - 7.3],
  ]
  for (const [bx, by, bz] of barrelPositions) {
    const barrelGeo = new THREE.CylinderGeometry(0.28, 0.32, 0.8, 8)
    const barrelMesh = shadow(new THREE.Mesh(barrelGeo, mat(RED)))
    barrelMesh.position.set(bx, by, bz)
    group.add(barrelMesh)

    // Warning band
    const bandGeo = new THREE.CylinderGeometry(0.33, 0.33, 0.1, 8)
    const band = shadow(new THREE.Mesh(bandGeo, mat(YELLOW)))
    band.position.set(bx, by + 0.1, bz)
    group.add(band)

    const bd = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(bx, by, bz)
      .setLinearDamping(0.3)
      .setAngularDamping(0.4)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cylinder(0.4, 0.32)
        .setDensity(5.0)
        .setFriction(0.4)
        .setRestitution(0.2),
      body
    )
    syncList.push({ mesh: barrelMesh, body })
  }

  // ─── DYNAMIC SMALL SATELLITES ON STANDS (2) ─────────────────────
  const satPositions = [
    [CX - 10, 1.2, CZ - 3],
    [CX + 15, 1.2, CZ + 0],
  ]
  for (const [sx, sy, sz] of satPositions) {
    const satGroup = new THREE.Group()

    // Satellite body (small box)
    const satBodyGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5)
    const satBody = shadow(new THREE.Mesh(satBodyGeo, mat(SILVER)))
    satGroup.add(satBody)

    // Solar wings (2 thin blue panels)
    for (let side = -1; side <= 1; side += 2) {
      const wingGeo = new THREE.BoxGeometry(0.8, 0.04, 0.4)
      const wing = shadow(new THREE.Mesh(wingGeo, mat(PANEL_BLUE)))
      wing.position.set(side * 0.65, 0, 0)
      satGroup.add(wing)

      // Wing frame
      const wfGeo = new THREE.BoxGeometry(0.82, 0.06, 0.02)
      const wf = shadow(new THREE.Mesh(wfGeo, mat(STEEL)))
      wf.position.set(side * 0.65, 0, 0.2)
      satGroup.add(wf)
    }

    // Antenna nub
    const satAntennaGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.4, 4)
    const satAntenna = shadow(new THREE.Mesh(satAntennaGeo, mat(STEEL)))
    satAntenna.position.y = 0.45
    satGroup.add(satAntenna)

    satGroup.position.set(sx, sy, sz)
    group.add(satGroup)

    // Stand (static visual)
    const standGeo = new THREE.CylinderGeometry(0.08, 0.12, 1.0, 6)
    const stand = shadow(new THREE.Mesh(standGeo, mat(STEEL)))
    stand.position.set(sx, 0.5, sz)
    group.add(stand)

    // Stand base
    const standBaseGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.1, 6)
    const standBase = shadow(new THREE.Mesh(standBaseGeo, mat(DARK_GRAY)))
    standBase.position.set(sx, 0.05, sz)
    group.add(standBase)

    // Dynamic body for satellite
    const bd = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(sx, sy, sz)
      .setLinearDamping(0.3)
      .setAngularDamping(0.4)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(0.65, 0.25, 0.25)
        .setDensity(2.0)
        .setFriction(0.4)
        .setRestitution(0.3),
      body
    )
    syncList.push({ mesh: satGroup, body })
  }

  // ─── ADDITIONAL PROPS ────────────────────────────────────────────

  // Road markings / guide lines on ground (dashed lines toward launchpad)
  for (let rl = 0; rl < 8; rl++) {
    const lineGeo = new THREE.PlaneGeometry(0.2, 1.2)
    const lineMesh = new THREE.Mesh(lineGeo, mat(YELLOW))
    lineMesh.rotation.x = -Math.PI / 2
    lineMesh.position.set(CX - 5, 0.022, CZ - 8 + rl * 2.5)
    group.add(lineMesh)
  }

  // Caution stripes on ground near rocket
  for (let cs = 0; cs < 6; cs++) {
    const csAngle = (cs / 6) * Math.PI * 2
    const csGeo = new THREE.PlaneGeometry(1.5, 0.2)
    const csMesh = new THREE.Mesh(csGeo, mat(ORANGE))
    csMesh.rotation.x = -Math.PI / 2
    csMesh.rotation.z = csAngle
    csMesh.position.set(
      rocketX + Math.cos(csAngle) * 4.5,
      0.023,
      rocketZ + Math.sin(csAngle) * 4.5
    )
    group.add(csMesh)
  }

  // Small debris / scattered bolts (tiny dark cubes)
  const debrisPositions = [
    [CX + 2, CZ + 10],
    [CX - 4, CZ + 6],
    [CX + 7, CZ + 3],
    [CX - 9, CZ - 1],
    [CX + 11, CZ + 14],
  ]
  for (const [dx, dz] of debrisPositions) {
    const debrisGeo = new THREE.BoxGeometry(0.08, 0.04, 0.08)
    const debris = new THREE.Mesh(debrisGeo, mat(STEEL))
    debris.position.set(dx, 0.04, dz)
    debris.rotation.y = Math.random() * Math.PI
    group.add(debris)
  }

  // Pipe runs along ground (connecting fuel tanks area to rocket)
  const pipeGeo = new THREE.CylinderGeometry(0.08, 0.08, 12, 6)
  const pipe = shadow(new THREE.Mesh(pipeGeo, mat(STEEL)))
  pipe.position.set(CX - 3, 0.12, CZ - 1)
  pipe.rotation.z = Math.PI / 2
  pipe.rotation.y = 0.6
  group.add(pipe)

  // Pipe supports
  for (let ps = 0; ps < 4; ps++) {
    const psGeo = new THREE.BoxGeometry(0.15, 0.2, 0.15)
    const psMesh = shadow(new THREE.Mesh(psGeo, mat(DARK_GRAY)))
    psMesh.position.set(CX - 6 + ps * 2.5, 0.1, CZ - 3 + ps * 1.0)
    group.add(psMesh)
  }

  // Small equipment boxes near control panels
  for (let eq = 0; eq < 3; eq++) {
    const eqGeo = new THREE.BoxGeometry(0.4, 0.3, 0.3)
    const eqMesh = shadow(new THREE.Mesh(eqGeo, mat(eq % 2 === 0 ? SILVER : STEEL)))
    eqMesh.position.set(CX + 7 + eq * 0.6, 0.15, CZ + 13)
    group.add(eqMesh)
  }

  // Cable coils on ground
  for (let cc = 0; cc < 2; cc++) {
    const coilGeo = new THREE.TorusGeometry(0.25, 0.04, 6, 8)
    const coil = new THREE.Mesh(coilGeo, mat(BLACK))
    coil.rotation.x = Math.PI / 2
    coil.position.set(CX + 1 + cc * 3, 0.06, CZ + 10 + cc * 2)
    group.add(coil)
  }

  // Ladder leaning against gantry
  const ladderGroup = new THREE.Group()
  ladderGroup.position.set(gantryX + 1.5, 0, gantryZ + 1.5)
  ladderGroup.rotation.z = 0.15
  ladderGroup.rotation.y = 0.4
  // Rails
  for (let side = -1; side <= 1; side += 2) {
    const railGeo = new THREE.BoxGeometry(0.05, 3.0, 0.05)
    const rail = shadow(new THREE.Mesh(railGeo, mat(STEEL)))
    rail.position.set(side * 0.2, 1.5, 0)
    ladderGroup.add(rail)
  }
  // Rungs
  for (let rg = 0; rg < 8; rg++) {
    const rungGeo = new THREE.BoxGeometry(0.4, 0.04, 0.04)
    const rung = shadow(new THREE.Mesh(rungGeo, mat(STEEL)))
    rung.position.set(0, 0.3 + rg * 0.35, 0)
    ladderGroup.add(rung)
  }
  group.add(ladderGroup)

  // Fire extinguisher near rocket pad
  const extGroup = new THREE.Group()
  extGroup.position.set(CX + 3, 0, CZ + 4)
  const extBodyGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.5, 8)
  const extBody = shadow(new THREE.Mesh(extBodyGeo, mat(RED)))
  extBody.position.y = 0.25
  extGroup.add(extBody)
  const extNozzleGeo = new THREE.CylinderGeometry(0.02, 0.03, 0.15, 4)
  const extNozzle = shadow(new THREE.Mesh(extNozzleGeo, mat(BLACK)))
  extNozzle.position.y = 0.55
  extGroup.add(extNozzle)
  group.add(extGroup)

  // Flag pole with flag
  const flagPoleGeo = new THREE.CylinderGeometry(0.04, 0.04, 5, 4)
  const flagPole = shadow(new THREE.Mesh(flagPoleGeo, mat(SILVER)))
  flagPole.position.set(CX + 6, 2.5, CZ + 15)
  group.add(flagPole)

  // Flag (blue rectangle)
  const flagGeo = new THREE.PlaneGeometry(1.2, 0.8)
  const flag = new THREE.Mesh(flagGeo, mat(BLUE, { side: THREE.DoubleSide }))
  flag.position.set(CX + 6.65, 4.6, CZ + 15)
  group.add(flag)

  // Star on flag
  const starGeo = new THREE.CircleGeometry(0.12, 5)
  const star = new THREE.Mesh(starGeo, mat(WHITE))
  star.position.set(CX + 6.65, 4.6, CZ + 14.99)
  group.add(star)

  // Spotlight fixtures on ground (pointing up at rocket)
  const spotPositions = [
    [CX + 3, CZ + 2],
    [CX - 3, CZ + 2],
    [CX, CZ + 5],
    [CX, CZ - 1],
  ]
  for (const [spx, spz] of spotPositions) {
    const spotHousingGeo = new THREE.CylinderGeometry(0.15, 0.2, 0.15, 6)
    const spotHousing = shadow(new THREE.Mesh(spotHousingGeo, mat(BLACK)))
    spotHousing.position.set(spx, 0.08, spz)
    group.add(spotHousing)

    // Light surface (emissive)
    const spotLensGeo = new THREE.CircleGeometry(0.13, 6)
    const spotLens = new THREE.Mesh(spotLensGeo, new THREE.MeshStandardMaterial({
      color: YELLOW,
      emissive: YELLOW,
      emissiveIntensity: 1.0,
      flatShading: true,
    }))
    spotLens.rotation.x = -Math.PI / 2
    spotLens.position.set(spx, 0.16, spz)
    group.add(spotLens)
  }

  // ─── ADD EVERYTHING TO SCENE ─────────────────────────────────────
  scene.add(group)

  // ─── RETURN ──────────────────────────────────────────────────────
  return {
    syncList,
    update(dt) {
      elapsedTime += dt

      // Rotate satellite dishes
      for (const dish of dishes) {
        dish.group.rotation.y += dish.speed * dt
      }

      // Pulse warning lights
      const pulse = (Math.sin(elapsedTime * 4.0) + 1) * 0.5 // 0..1
      for (const light of warningLights) {
        light.material.emissiveIntensity = 0.5 + pulse * 3.0
        light.scale.setScalar(0.8 + pulse * 0.4)
      }
    },
  }
}
