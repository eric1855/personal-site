import * as THREE from 'three'

const LOCATION_DEFS = [
  {
    id: 'about',
    label: 'About Me',
    position: { x: 0, z: -20 },
    color: '#5b8dee',
    bodySize: { w: 4.0, h: 5.0, d: 3.0 },
    bodyY: 2.5,
    signOffset: { x: 0, y: 4.7, z: 1.57 },
    content: `
      <h3 style="margin:0 0 12px;font-size:1.1rem;color:#5b8dee;">Hi, I'm Eric</h3>
      <p style="margin:0;">From Las Vegas. I love race cars.</p>
    `,
  },
  {
    id: 'projects',
    label: 'Projects',
    position: { x: 20, z: 0 },
    color: '#f5a623',
    bodySize: { w: 5.5, h: 3.5, d: 3.5 },
    bodyY: 1.75,
    signOffset: { x: 0, y: 3.1, z: 1.82 },
    content: `
      <div style="display:flex;flex-direction:column;gap:20px;">
        <div>
          <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px;">
            <h3 style="margin:0;font-size:1.05rem;color:#f5a623;">This Site</h3>
            <a href="https://github.com/eric1855/personal-site" target="_blank" style="color:rgba(255,255,255,0.5);font-size:0.8rem;text-decoration:none;">GitHub &rarr;</a>
          </div>
          <p style="margin:0 0 6px;font-size:0.9rem;">Interactive 3D portfolio built with Three.js and Rapier physics. Drive a car around, knock over dominos, and explore buildings. You're looking at it right now.</p>
          <div style="display:flex;gap:6px;flex-wrap:wrap;">
            ${['Three.js','Rapier','Vite','JavaScript'].map(t => `<span style="padding:2px 8px;border-radius:4px;background:rgba(245,166,35,0.12);font-size:0.75rem;color:rgba(255,255,255,0.6);">${t}</span>`).join('')}
          </div>
        </div>
        <div>
          <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px;">
            <h3 style="margin:0;font-size:1.05rem;color:#f5a623;">ScottyStalls</h3>
            <a href="https://github.com/eric1855/ScottyStalls" target="_blank" style="color:rgba(255,255,255,0.5);font-size:0.8rem;text-decoration:none;">GitHub &rarr;</a>
          </div>
          <p style="margin:0 0 6px;font-size:0.9rem;">Campus restroom rating app with live location, supported on iOS, Android, and web. Gained over 50,000 impressions online within a week of launch.</p>
          <div style="display:flex;gap:6px;flex-wrap:wrap;">
            ${['Flutter','Dart','AWS','Figma'].map(t => `<span style="padding:2px 8px;border-radius:4px;background:rgba(245,166,35,0.12);font-size:0.75rem;color:rgba(255,255,255,0.6);">${t}</span>`).join('')}
          </div>
        </div>
        <div>
          <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px;">
            <h3 style="margin:0;font-size:1.05rem;color:#f5a623;">hackoweencandy.com</h3>
          </div>
          <p style="margin:0 0 6px;font-size:0.9rem;">Full-stack site that predicts the best trick-or-treating locations in your city using candy distribution datasets. First place overall at the 2025 Clark Hackathon.</p>
          <div style="display:flex;gap:6px;flex-wrap:wrap;">
            ${['AWS Lambda','S3','Amplify','JavaScript'].map(t => `<span style="padding:2px 8px;border-radius:4px;background:rgba(245,166,35,0.12);font-size:0.75rem;color:rgba(255,255,255,0.6);">${t}</span>`).join('')}
          </div>
        </div>
        <div>
          <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px;">
            <h3 style="margin:0;font-size:1.05rem;color:#f5a623;">ClipFarm</h3>
            <a href="https://github.com/eric1855/ClipFarm" target="_blank" style="color:rgba(255,255,255,0.5);font-size:0.8rem;text-decoration:none;">GitHub &rarr;</a>
          </div>
          <p style="margin:0 0 6px;font-size:0.9rem;">Automatic long-form to short-form content generator for TikTok and Instagram Reels. Built at HackCMU 2025.</p>
          <div style="display:flex;gap:6px;flex-wrap:wrap;">
            ${['Python'].map(t => `<span style="padding:2px 8px;border-radius:4px;background:rgba(245,166,35,0.12);font-size:0.75rem;color:rgba(255,255,255,0.6);">${t}</span>`).join('')}
          </div>
        </div>
        <div>
          <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px;">
            <h3 style="margin:0;font-size:1.05rem;color:#f5a623;">MinecraftLive</h3>
            <a href="https://github.com/eric1855/MinecraftLive" target="_blank" style="color:rgba(255,255,255,0.5);font-size:0.8rem;text-decoration:none;">GitHub &rarr;</a>
          </div>
          <p style="margin:0 0 6px;font-size:0.9rem;">Tartan Hacks 2026 project.</p>
          <div style="display:flex;gap:6px;flex-wrap:wrap;">
            ${['Python'].map(t => `<span style="padding:2px 8px;border-radius:4px;background:rgba(245,166,35,0.12);font-size:0.75rem;color:rgba(255,255,255,0.6);">${t}</span>`).join('')}
          </div>
        </div>
      </div>
    `,
  },
  {
    id: 'contact',
    label: 'Contact',
    position: { x: 0, z: 20 },
    color: '#50c878',
    bodySize: { w: 4.0, h: 4.0, d: 3.5 },
    bodyY: 2.0,
    signOffset: { x: 0, y: 3.7, z: 1.82 },
    content: `
      <h3 style="margin:0 0 16px;font-size:1.1rem;color:#50c878;">Let's connect</h3>
      <div style="display:flex;flex-direction:column;gap:14px;">
        <a href="mailto:ericwan2@andrew.cmu.edu" style="display:flex;align-items:center;gap:12px;padding:14px 16px;border-radius:10px;background:rgba(80,200,120,0.08);border:1px solid rgba(80,200,120,0.2);text-decoration:none;color:#fff;transition:background 0.15s;">
          <span style="font-size:1.3rem;">&#9993;</span>
          <div>
            <div style="font-size:0.9rem;font-weight:600;">Email</div>
            <div style="font-size:0.8rem;color:rgba(255,255,255,0.5);">ericwan2@andrew.cmu.edu</div>
          </div>
        </a>
        <a href="https://www.linkedin.com/in/whoisericwang/" target="_blank" style="display:flex;align-items:center;gap:12px;padding:14px 16px;border-radius:10px;background:rgba(80,200,120,0.08);border:1px solid rgba(80,200,120,0.2);text-decoration:none;color:#fff;transition:background 0.15s;">
          <span style="font-size:1.3rem;">in</span>
          <div>
            <div style="font-size:0.9rem;font-weight:600;">LinkedIn</div>
            <div style="font-size:0.8rem;color:rgba(255,255,255,0.5);">linkedin.com/in/whoisericwang</div>
          </div>
        </a>
        <a href="https://github.com/eric1855" target="_blank" style="display:flex;align-items:center;gap:12px;padding:14px 16px;border-radius:10px;background:rgba(80,200,120,0.08);border:1px solid rgba(80,200,120,0.2);text-decoration:none;color:#fff;transition:background 0.15s;">
          <span style="font-size:1.3rem;">&#128187;</span>
          <div>
            <div style="font-size:0.9rem;font-weight:600;">GitHub</div>
            <div style="font-size:0.8rem;color:rgba(255,255,255,0.5);">github.com/eric1855</div>
          </div>
        </a>
      </div>
      <p style="margin:20px 0 0;font-size:0.85rem;color:rgba(255,255,255,0.4);text-align:center;">Open to internships, collaborations, and interesting conversations.</p>
    `,
  },
  {
    id: 'experience',
    label: 'Experience',
    position: { x: -20, z: 0 },
    color: '#e84393',
    bodySize: { w: 3.5, h: 6.0, d: 3.0 },
    bodyY: 3.0,
    signOffset: { x: 0, y: 5.7, z: 1.57 },
    content: `
      <div style="display:flex;flex-direction:column;gap:20px;">
        <div>
          <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px;">
            <h3 style="margin:0;font-size:1.05rem;color:#e84393;">Pololu Robotics &amp; Electronics</h3>
            <span style="font-size:0.8rem;color:rgba(255,255,255,0.4);white-space:nowrap;">Jun&ndash;Jul 2025</span>
          </div>
          <p style="margin:0 0 6px;font-size:0.85rem;color:rgba(255,255,255,0.55);font-style:italic;">Machine Learning Intern</p>
          <ul style="margin:0;padding-left:18px;font-size:0.9rem;">
            <li style="margin-bottom:4px;">Automated robotic arm PCB quality testing with computer vision</li>
            <li style="margin-bottom:4px;">Built PyTorch OCR model to track motor inventory and auto-detect assembly line faults</li>
            <li>Learned PCB design (Altium), CAD (Solidworks), and laser printing</li>
          </ul>
        </div>
        <div>
          <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px;">
            <h3 style="margin:0;font-size:1.05rem;color:#e84393;">UNLV QGEN Lab</h3>
            <span style="font-size:0.8rem;color:rgba(255,255,255,0.4);white-space:nowrap;">Jun 2022&ndash;May 2025</span>
          </div>
          <p style="margin:0 0 6px;font-size:0.85rem;color:rgba(255,255,255,0.55);font-style:italic;">Bioinformatics Researcher</p>
          <ul style="margin:0;padding-left:18px;font-size:0.9rem;">
            <li style="margin-bottom:4px;">First-author paper: classified ~300 bacterial protein sequences as ice-related using ESM (3B param) + SVM with 0.96 accuracy</li>
            <li style="margin-bottom:4px;">Protein domain prediction on ~5,100 sequences using ESM tokenization features</li>
            <li>Ran ML/DL models on Linux supercomputing GPU clusters</li>
          </ul>
        </div>
        <div>
          <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px;">
            <h3 style="margin:0;font-size:1.05rem;color:#e84393;">Science Olympiad</h3>
            <span style="font-size:0.8rem;color:rgba(255,255,255,0.4);white-space:nowrap;">Aug 2023&ndash;May 2025</span>
          </div>
          <p style="margin:0 0 6px;font-size:0.85rem;color:rgba(255,255,255,0.55);font-style:italic;">Vice President of Builds</p>
          <ul style="margin:0;padding-left:18px;font-size:0.9rem;">
            <li style="margin-bottom:4px;">Built autonomous maze-running robots with Arduino, C++, Raspberry Pi</li>
            <li>20-time medalist: MIT, Northwestern, Nevada State competitions</li>
          </ul>
        </div>
      </div>
    `,
  },
]

// ── Shared materials ────────────────────────────────────────────
const _glassMat = new THREE.MeshStandardMaterial({
  color: '#aaddff',
  transparent: true,
  opacity: 0.35,
  flatShading: true,
  roughness: 0.1,
  metalness: 0.3,
})

const _darkWoodMat = new THREE.MeshStandardMaterial({
  color: '#5a3a1a',
  flatShading: true,
})

const _whiteMat = new THREE.MeshStandardMaterial({
  color: '#f0f0f0',
  flatShading: true,
})

const _darkMat = new THREE.MeshStandardMaterial({
  color: '#2a2a2a',
  flatShading: true,
})

const _stoneMat = new THREE.MeshStandardMaterial({
  color: '#888888',
  flatShading: true,
  roughness: 0.9,
})

const _brickMat = new THREE.MeshStandardMaterial({
  color: '#8B4513',
  flatShading: true,
  roughness: 0.85,
})

const _metalMat = new THREE.MeshStandardMaterial({
  color: '#999999',
  flatShading: true,
  roughness: 0.3,
  metalness: 0.8,
})

// ── Helper: shadow setup ────────────────────────────────────────
function _shadow(mesh) {
  mesh.castShadow = true
  mesh.receiveShadow = true
  return mesh
}

// ── About: Cozy house/cabin with pitched roof, chimney, porch ──
function _buildAbout(def, scene, RAPIER, world, syncList) {
  const group = new THREE.Group()
  group.position.set(def.position.x, 0, def.position.z)
  const bx = def.position.x
  const bz = def.position.z

  const mainColor = new THREE.Color(def.color)
  const wallMat = new THREE.MeshStandardMaterial({ color: mainColor, flatShading: true })
  const roofMat = new THREE.MeshStandardMaterial({ color: '#3a5a9e', flatShading: true })
  const doorMat = new THREE.MeshStandardMaterial({ color: '#3a2510', flatShading: true })
  const trimMat = new THREE.MeshStandardMaterial({ color: '#ffffff', flatShading: true })

  // Main body
  const body = _shadow(new THREE.Mesh(new THREE.BoxGeometry(4.0, 3.5, 3.0), wallMat))
  body.position.y = 1.75
  group.add(body)

  // Pitched roof (triangular prism via ExtrudeGeometry)
  const roofShape = new THREE.Shape()
  roofShape.moveTo(-2.3, 0)
  roofShape.lineTo(0, 2.0)
  roofShape.lineTo(2.3, 0)
  roofShape.lineTo(-2.3, 0)
  const roofGeo = new THREE.ExtrudeGeometry(roofShape, { depth: 3.4, bevelEnabled: false })
  const roof = _shadow(new THREE.Mesh(roofGeo, roofMat))
  roof.position.set(0, 3.5, -1.7)
  group.add(roof)

  // Chimney
  const chimney = _shadow(new THREE.Mesh(new THREE.BoxGeometry(0.6, 2.0, 0.6), _brickMat))
  chimney.position.set(1.2, 5.0, -0.5)
  group.add(chimney)

  // Chimney top cap
  const chimneyCap = _shadow(new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.15, 0.8), _stoneMat))
  chimneyCap.position.set(1.2, 6.05, -0.5)
  group.add(chimneyCap)

  // Front door
  const door = _shadow(new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.6, 0.08), doorMat))
  door.position.set(0, 0.85, 1.52)
  group.add(door)

  // Door frame
  const doorFrameTop = _shadow(new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.1, 0.12), trimMat))
  doorFrameTop.position.set(0, 1.7, 1.53)
  group.add(doorFrameTop)
  const doorFrameL = _shadow(new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.6, 0.12), trimMat))
  doorFrameL.position.set(-0.45, 0.85, 1.53)
  group.add(doorFrameL)
  const doorFrameR = _shadow(new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.6, 0.12), trimMat))
  doorFrameR.position.set(0.45, 0.85, 1.53)
  group.add(doorFrameR)

  // Door knob
  const knob = _shadow(new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 4), _metalMat))
  knob.position.set(0.25, 0.85, 1.58)
  group.add(knob)

  // Windows (front face) — two windows flanking the door
  for (const xOff of [-1.3, 1.3]) {
    // Window pane (glass)
    const pane = _shadow(new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.7, 0.06), _glassMat))
    pane.position.set(xOff, 2.3, 1.53)
    group.add(pane)
    // Window frame (white cross)
    const frameH = _shadow(new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.06, 0.08), trimMat))
    frameH.position.set(xOff, 2.3, 1.54)
    group.add(frameH)
    const frameV = _shadow(new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.75, 0.08), trimMat))
    frameV.position.set(xOff, 2.3, 1.54)
    group.add(frameV)
    // Window sill
    const sill = _shadow(new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.08, 0.15), trimMat))
    sill.position.set(xOff, 1.92, 1.56)
    group.add(sill)
  }

  // Side windows (left and right walls)
  for (const side of [-1, 1]) {
    const sidePane = _shadow(new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.6, 0.5), _glassMat))
    sidePane.position.set(side * 2.02, 2.3, 0)
    group.add(sidePane)
    const sideFrameH = _shadow(new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.06, 0.55), trimMat))
    sideFrameH.position.set(side * 2.03, 2.3, 0)
    group.add(sideFrameH)
    const sideFrameV = _shadow(new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.65, 0.06), trimMat))
    sideFrameV.position.set(side * 2.03, 2.3, 0)
    group.add(sideFrameV)
  }

  // Front porch — platform
  const porch = _shadow(new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.15, 1.2), _darkWoodMat))
  porch.position.set(0, 0.08, 2.1)
  group.add(porch)

  // Porch roof supports (two posts)
  for (const xOff of [-1.2, 1.2]) {
    const post = _shadow(new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 2.0, 6), trimMat))
    post.position.set(xOff, 1.1, 2.6)
    group.add(post)
  }

  // Porch overhang
  const overhang = _shadow(new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.1, 1.4), roofMat))
  overhang.position.set(0, 2.15, 2.15)
  group.add(overhang)

  // Steps (two steps leading to porch)
  const step1 = _shadow(new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.12, 0.3), _stoneMat))
  step1.position.set(0, 0.06, 2.85)
  group.add(step1)

  // ── Props: Potted plants near the front (dynamic physics) ──
  for (const xOff of [-1.8, 1.8]) {
    const wx = bx + xOff, wz = bz + 2.6
    const plantGroup = new THREE.Group()
    // Pot
    const pot = _shadow(new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.15, 0.35, 8), _brickMat))
    pot.position.set(0, 0.25, 0)
    plantGroup.add(pot)
    // Plant (green sphere)
    const plant = _shadow(new THREE.Mesh(new THREE.SphereGeometry(0.25, 6, 5),
      new THREE.MeshStandardMaterial({ color: '#3a8a3a', flatShading: true })))
    plant.position.set(0, 0.6, 0)
    plantGroup.add(plant)
    plantGroup.position.set(wx, 0, wz)
    scene.add(plantGroup)

    const bd = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(wx, 0.425, wz)
      .setLinearDamping(0.3)
      .setAngularDamping(0.4)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(0.2, 0.425, 0.2)
        .setDensity(3.0).setFriction(0.5).setRestitution(0.1),
      body
    )
    syncList.push({ mesh: plantGroup, body })
  }

  // Welcome mat
  const mat = _shadow(new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.02, 0.5),
    new THREE.MeshStandardMaterial({ color: '#8B6914', flatShading: true })))
  mat.position.set(0, 0.17, 2.1)
  group.add(mat)

  // Mailbox next to path (dynamic physics — toppleable)
  {
    const wx = bx + 2.5, wz = bz + 2.2
    const mailboxGroup = new THREE.Group()
    const mailboxPost = _shadow(new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.9, 6), _darkWoodMat))
    mailboxPost.position.set(0, 0.45, 0)
    mailboxGroup.add(mailboxPost)
    const mailboxBox = _shadow(new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.2, 0.2),
      new THREE.MeshStandardMaterial({ color: '#cc3333', flatShading: true })))
    mailboxBox.position.set(0, 0.95, 0)
    mailboxGroup.add(mailboxBox)
    mailboxGroup.position.set(wx, 0, wz)
    scene.add(mailboxGroup)

    const bd = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(wx, 0.525, wz)
      .setLinearDamping(0.3)
      .setAngularDamping(0.4)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(0.15, 0.525, 0.1)
        .setDensity(3.0).setFriction(0.5).setRestitution(0.1),
      body
    )
    syncList.push({ mesh: mailboxGroup, body })
  }

  return group
}

// ── Projects: Workshop/factory with sawtooth roof, garage door, smokestacks ──
function _buildProjects(def, scene, RAPIER, world, syncList) {
  const group = new THREE.Group()
  group.position.set(def.position.x, 0, def.position.z)
  const bx = def.position.x
  const bz = def.position.z

  const mainColor = new THREE.Color(def.color)
  const wallMat = new THREE.MeshStandardMaterial({ color: mainColor, flatShading: true })
  const roofMat = new THREE.MeshStandardMaterial({ color: '#c97a10', flatShading: true })
  const doorMat = new THREE.MeshStandardMaterial({ color: '#7a5a20', flatShading: true })
  const garageMat = new THREE.MeshStandardMaterial({ color: '#8a6a20', flatShading: true })

  // Main body
  const body = _shadow(new THREE.Mesh(new THREE.BoxGeometry(5.5, 3.0, 3.5), wallMat))
  body.position.y = 1.5
  group.add(body)

  // Sawtooth roof — three saw teeth across the width
  const toothW = 5.5 / 3
  for (let i = 0; i < 3; i++) {
    const toothShape = new THREE.Shape()
    toothShape.moveTo(0, 0)
    toothShape.lineTo(toothW * 0.3, 1.0)
    toothShape.lineTo(toothW, 0)
    toothShape.lineTo(0, 0)
    const toothGeo = new THREE.ExtrudeGeometry(toothShape, { depth: 3.7, bevelEnabled: false })
    const tooth = _shadow(new THREE.Mesh(toothGeo, roofMat))
    tooth.position.set(-2.75 + i * toothW, 3.0, -1.85)
    group.add(tooth)

    // Glass panel on the steep side of each sawtooth
    const glassPanel = _shadow(new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.8, 3.5), _glassMat))
    glassPanel.position.set(-2.75 + i * toothW + toothW * 0.15, 3.4, 0)
    group.add(glassPanel)
  }

  // Large garage door (front face)
  const garageDoor = _shadow(new THREE.Mesh(new THREE.BoxGeometry(2.5, 2.2, 0.1), garageMat))
  garageDoor.position.set(0.5, 1.15, 1.77)
  group.add(garageDoor)

  // Garage door horizontal lines (slats)
  for (let i = 0; i < 5; i++) {
    const slat = _shadow(new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.04, 0.12), _darkMat))
    slat.position.set(0.5, 0.3 + i * 0.45, 1.78)
    group.add(slat)
  }

  // Garage door frame
  const garageFrameTop = _shadow(new THREE.Mesh(new THREE.BoxGeometry(2.7, 0.12, 0.14), _metalMat))
  garageFrameTop.position.set(0.5, 2.3, 1.78)
  group.add(garageFrameTop)
  for (const side of [-1, 1]) {
    const garageFrameSide = _shadow(new THREE.Mesh(new THREE.BoxGeometry(0.1, 2.3, 0.14), _metalMat))
    garageFrameSide.position.set(0.5 + side * 1.3, 1.15, 1.78)
    group.add(garageFrameSide)
  }

  // Small personnel door on the side
  const sideDoor = _shadow(new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.5, 0.7), doorMat))
  sideDoor.position.set(-2.77, 0.78, 0.8)
  group.add(sideDoor)

  // Windows (front, left of garage)
  for (let i = 0; i < 2; i++) {
    const win = _shadow(new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.06), _glassMat))
    win.position.set(-1.8 + i * 0.7, 2.2, 1.78)
    group.add(win)
    const winFrame = _shadow(new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.55, 0.08), _metalMat))
    winFrame.position.set(-1.8 + i * 0.7, 2.2, 1.77)
    group.add(winFrame)
  }

  // Two smokestacks / vent pipes on the back
  for (const xOff of [-1.5, 1.5]) {
    const stack = _shadow(new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.25, 2.5, 8), _metalMat))
    stack.position.set(xOff, 4.2, -1.2)
    group.add(stack)
    // Vent cap
    const cap = _shadow(new THREE.Mesh(new THREE.ConeGeometry(0.35, 0.4, 8), _metalMat))
    cap.position.set(xOff, 5.6, -1.2)
    group.add(cap)
  }

  // ── Props: Gears/cogs near the building (dynamic physics) ──
  // Large gear (torus)
  {
    const wx = bx + -3.2, wy = 0.5, wz = bz + 1.5
    const gearGeo = new THREE.TorusGeometry(0.4, 0.08, 6, 12)
    const gear1 = _shadow(new THREE.Mesh(gearGeo, _metalMat))
    gear1.rotation.x = Math.PI * 0.5
    gear1.position.set(wx, wy, wz)
    scene.add(gear1)

    const bd = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(wx, wy, wz)
      .setLinearDamping(0.3)
      .setAngularDamping(0.4)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cylinder(0.08, 0.4)
        .setDensity(8.0).setFriction(0.5).setRestitution(0.1),
      body
    )
    syncList.push({ mesh: gear1, body })
  }

  // Smaller gear
  {
    const wx = bx + -3.2, wy = 0.5, wz = bz + 0.8
    const gear2 = _shadow(new THREE.Mesh(new THREE.TorusGeometry(0.25, 0.06, 6, 10), _metalMat))
    gear2.rotation.x = Math.PI * 0.5
    gear2.position.set(wx, wy, wz)
    scene.add(gear2)

    const bd = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(wx, wy, wz)
      .setLinearDamping(0.3)
      .setAngularDamping(0.4)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cylinder(0.06, 0.25)
        .setDensity(8.0).setFriction(0.5).setRestitution(0.1),
      body
    )
    syncList.push({ mesh: gear2, body })
  }

  // Tool bench (static — part of building)
  const bench = _shadow(new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.1, 0.6), _darkWoodMat))
  bench.position.set(-3.2, 0.8, 0.0)
  group.add(bench)
  // Bench legs
  for (const xo of [-0.6, 0.6]) {
    const leg = _shadow(new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.8, 0.08), _darkWoodMat))
    leg.position.set(-3.2 + xo, 0.4, 0.0)
    group.add(leg)
  }

  // Barrel (dynamic physics — rollable)
  {
    const wx = bx + 3.3, wy = 0.35, wz = bz + 1.0
    const barrel = _shadow(new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.28, 0.7, 10),
      new THREE.MeshStandardMaterial({ color: '#6a4a2a', flatShading: true })))
    barrel.position.set(wx, wy, wz)
    scene.add(barrel)

    const bd = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(wx, wy, wz)
      .setLinearDamping(0.3)
      .setAngularDamping(0.4)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cylinder(0.35, 0.3)
        .setDensity(5.0).setFriction(0.5).setRestitution(0.1),
      body
    )
    syncList.push({ mesh: barrel, body })
  }

  // Stack of crates (dynamic physics — pushable)
  {
    const crateMat = new THREE.MeshStandardMaterial({ color: '#a08050', flatShading: true })

    // Bottom crate
    const wx1 = bx + 3.3, wy1 = 0.3, wz1 = bz + -0.5
    const crate1 = _shadow(new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.6, 0.6), crateMat))
    crate1.position.set(wx1, wy1, wz1)
    scene.add(crate1)

    const bd1 = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(wx1, wy1, wz1)
      .setLinearDamping(0.3)
      .setAngularDamping(0.4)
    const body1 = world.createRigidBody(bd1)
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(0.3, 0.3, 0.3)
        .setDensity(5.0).setFriction(0.5).setRestitution(0.1),
      body1
    )
    syncList.push({ mesh: crate1, body: body1 })

    // Top crate
    const wx2 = bx + 3.3, wy2 = 0.85, wz2 = bz + -0.5
    const crate2 = _shadow(new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), crateMat))
    crate2.position.set(wx2, wy2, wz2)
    scene.add(crate2)

    const bd2 = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(wx2, wy2, wz2)
      .setLinearDamping(0.3)
      .setAngularDamping(0.4)
    const body2 = world.createRigidBody(bd2)
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(0.25, 0.25, 0.25)
        .setDensity(5.0).setFriction(0.5).setRestitution(0.1),
      body2
    )
    syncList.push({ mesh: crate2, body: body2 })
  }

  return group
}

// ── Experience: Office tower — tall, multi-floor windows, rooftop antenna ──
function _buildExperience(def, scene, RAPIER, world, syncList) {
  const group = new THREE.Group()
  group.position.set(def.position.x, 0, def.position.z)
  const bx = def.position.x
  const bz = def.position.z

  const mainColor = new THREE.Color(def.color)
  const wallMat = new THREE.MeshStandardMaterial({ color: mainColor, flatShading: true })
  const accentMat = new THREE.MeshStandardMaterial({ color: '#c03070', flatShading: true })
  const floorTrimMat = new THREE.MeshStandardMaterial({ color: '#b03878', flatShading: true })

  // Main tower body
  const body = _shadow(new THREE.Mesh(new THREE.BoxGeometry(3.5, 6.0, 3.0), wallMat))
  body.position.y = 3.0
  group.add(body)

  // Floor divider strips (horizontal lines separating floors)
  const numFloors = 4
  for (let i = 1; i <= numFloors; i++) {
    const strip = _shadow(new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.08, 3.1), floorTrimMat))
    strip.position.y = i * 1.5
    group.add(strip)
  }

  // Window grid on front face (4 floors x 3 columns)
  for (let floor = 0; floor < numFloors; floor++) {
    for (let col = 0; col < 3; col++) {
      const winX = -0.9 + col * 0.9
      const winY = 0.7 + floor * 1.5
      const win = _shadow(new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.8, 0.06), _glassMat))
      win.position.set(winX, winY, 1.52)
      group.add(win)
      // Thin window frame
      const frame = _shadow(new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.85, 0.04), _darkMat))
      frame.position.set(winX, winY, 1.51)
      group.add(frame)
    }
  }

  // Window grid on back face
  for (let floor = 0; floor < numFloors; floor++) {
    for (let col = 0; col < 3; col++) {
      const winX = -0.9 + col * 0.9
      const winY = 0.7 + floor * 1.5
      const win = _shadow(new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.8, 0.06), _glassMat))
      win.position.set(winX, winY, -1.52)
      group.add(win)
      const frame = _shadow(new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.85, 0.04), _darkMat))
      frame.position.set(winX, winY, -1.51)
      group.add(frame)
    }
  }

  // Window grid on left and right sides (4 floors x 2 columns)
  for (const side of [-1, 1]) {
    for (let floor = 0; floor < numFloors; floor++) {
      for (let col = 0; col < 2; col++) {
        const winZ = -0.5 + col * 1.0
        const winY = 0.7 + floor * 1.5
        const win = _shadow(new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.8, 0.55), _glassMat))
        win.position.set(side * 1.77, winY, winZ)
        group.add(win)
        const frame = _shadow(new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.85, 0.6), _darkMat))
        frame.position.set(side * 1.76, winY, winZ)
        group.add(frame)
      }
    }
  }

  // Front entrance — recessed glass door
  const entranceBg = _shadow(new THREE.Mesh(new THREE.BoxGeometry(1.2, 2.0, 0.15), _darkMat))
  entranceBg.position.set(0, 1.0, 1.5)
  group.add(entranceBg)
  const entranceDoor = _shadow(new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.8, 0.06), _glassMat))
  entranceDoor.position.set(0, 0.95, 1.54)
  group.add(entranceDoor)
  // Door handle
  const handle = _shadow(new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.3, 0.06), _metalMat))
  handle.position.set(0.3, 0.95, 1.58)
  group.add(handle)

  // Canopy/awning over entrance
  const canopy = _shadow(new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.08, 0.8), accentMat))
  canopy.position.set(0, 2.1, 1.9)
  group.add(canopy)

  // Rooftop slab
  const roofSlab = _shadow(new THREE.Mesh(new THREE.BoxGeometry(3.7, 0.2, 3.2), _stoneMat))
  roofSlab.position.y = 6.1
  group.add(roofSlab)

  // Rooftop equipment — AC units
  for (const xOff of [-0.8, 0.8]) {
    const ac = _shadow(new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.5, 0.6), _metalMat))
    ac.position.set(xOff, 6.45, -0.5)
    group.add(ac)
    // Fan on top
    const fan = _shadow(new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.05, 8), _darkMat))
    fan.position.set(xOff, 6.73, -0.5)
    group.add(fan)
  }

  // Main antenna/spire
  const antenna = _shadow(new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.06, 2.2, 6), _metalMat))
  antenna.position.set(0, 7.3, 0)
  group.add(antenna)

  // Antenna dishes / crossbars
  const crossbar1 = _shadow(new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.04, 0.04), _metalMat))
  crossbar1.position.set(0, 7.0, 0)
  group.add(crossbar1)
  const crossbar2 = _shadow(new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.04, 0.04), _metalMat))
  crossbar2.position.set(0, 7.6, 0)
  group.add(crossbar2)

  // Blinking light on antenna tip
  const light = new THREE.Mesh(
    new THREE.SphereGeometry(0.08, 6, 4),
    new THREE.MeshStandardMaterial({ color: '#ff2222', emissive: '#ff2222', emissiveIntensity: 2.0, flatShading: true })
  )
  light.position.set(0, 8.4, 0)
  group.add(light)

  // ── Props: Briefcase, office plant (dynamic physics) ──
  // Potted plant at entrance
  {
    const wx = bx + -1.0, wz = bz + 2.0
    const plantGroup = new THREE.Group()
    const pot = _shadow(new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.16, 0.4, 8),
      new THREE.MeshStandardMaterial({ color: '#555555', flatShading: true })))
    pot.position.set(0, 0.2, 0)
    plantGroup.add(pot)
    const plantLeaves = _shadow(new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.7, 7),
      new THREE.MeshStandardMaterial({ color: '#2d7a2d', flatShading: true })))
    plantLeaves.position.set(0, 0.75, 0)
    plantGroup.add(plantLeaves)
    plantGroup.position.set(wx, 0, wz)
    scene.add(plantGroup)

    const bd = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(wx, 0.55, wz)
      .setLinearDamping(0.3)
      .setAngularDamping(0.4)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(0.22, 0.55, 0.22)
        .setDensity(2.0).setFriction(0.5).setRestitution(0.1),
      body
    )
    syncList.push({ mesh: plantGroup, body })
  }

  // Briefcase
  {
    const wx = bx + 1.0, wz = bz + 2.0
    const bcGroup = new THREE.Group()
    const briefcase = _shadow(new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.3, 0.1),
      new THREE.MeshStandardMaterial({ color: '#4a3020', flatShading: true })))
    briefcase.position.set(0, 0.15, 0)
    bcGroup.add(briefcase)
    // Briefcase handle
    const bcHandle = _shadow(new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.06, 0.04), _metalMat))
    bcHandle.position.set(0, 0.33, 0)
    bcGroup.add(bcHandle)
    bcGroup.position.set(wx, 0, wz)
    scene.add(bcGroup)

    const bd = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(wx, 0.18, wz)
      .setLinearDamping(0.3)
      .setAngularDamping(0.4)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(0.2, 0.18, 0.05)
        .setDensity(2.0).setFriction(0.5).setRestitution(0.1),
      body
    )
    syncList.push({ mesh: bcGroup, body })
  }

  // Company sign next to entrance
  const companySign = _shadow(new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.3, 0.05),
    new THREE.MeshStandardMaterial({ color: '#222222', flatShading: true })))
  companySign.position.set(-1.3, 1.8, 1.54)
  group.add(companySign)

  return group
}

// ── Contact: Post office / mailbox building with arched entrance, clock ──
function _buildContact(def, scene, RAPIER, world, syncList) {
  const group = new THREE.Group()
  group.position.set(def.position.x, 0, def.position.z)
  const bx = def.position.x
  const bz = def.position.z

  const mainColor = new THREE.Color(def.color)
  const wallMat = new THREE.MeshStandardMaterial({ color: mainColor, flatShading: true })
  const roofMat = new THREE.MeshStandardMaterial({ color: '#2a7a48', flatShading: true })
  const doorMat = new THREE.MeshStandardMaterial({ color: '#2a5a3a', flatShading: true })

  // Main body
  const body = _shadow(new THREE.Mesh(new THREE.BoxGeometry(4.0, 3.5, 3.5), wallMat))
  body.position.y = 1.75
  group.add(body)

  // Flat roof with slight lip/parapet
  const roof = _shadow(new THREE.Mesh(new THREE.BoxGeometry(4.3, 0.2, 3.8), roofMat))
  roof.position.y = 3.6
  group.add(roof)

  // Parapet (raised front edge)
  const parapet = _shadow(new THREE.Mesh(new THREE.BoxGeometry(4.3, 0.6, 0.15), wallMat))
  parapet.position.set(0, 3.9, 1.82)
  group.add(parapet)

  // Arched entrance — built from a door + half-cylinder arch above
  const door = _shadow(new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.8, 0.1), doorMat))
  door.position.set(0, 0.95, 1.77)
  group.add(door)

  // Arch above door (half cylinder)
  const archGeo = new THREE.CylinderGeometry(0.65, 0.65, 0.12, 16, 1, false, 0, Math.PI)
  const arch = _shadow(new THREE.Mesh(archGeo, wallMat))
  arch.position.set(0, 1.85, 1.78)
  arch.rotation.set(Math.PI / 2, 0, 0)
  group.add(arch)

  // Arch trim (slightly larger, darker)
  const archTrimGeo = new THREE.CylinderGeometry(0.72, 0.72, 0.14, 16, 1, false, 0, Math.PI)
  const archTrim = _shadow(new THREE.Mesh(archTrimGeo, roofMat))
  archTrim.position.set(0, 1.85, 1.77)
  archTrim.rotation.set(Math.PI / 2, 0, 0)
  group.add(archTrim)

  // Door panels (vertical lines)
  for (const xOff of [-0.2, 0.2]) {
    const panel = _shadow(new THREE.Mesh(new THREE.BoxGeometry(0.04, 1.6, 0.06),
      new THREE.MeshStandardMaterial({ color: '#1a4a2a', flatShading: true })))
    panel.position.set(xOff, 0.85, 1.82)
    group.add(panel)
  }

  // Mail slot on the front wall (right of door)
  const slotBg = _shadow(new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.35, 0.08), _darkMat))
  slotBg.position.set(1.3, 1.5, 1.78)
  group.add(slotBg)
  const slot = _shadow(new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.06, 0.1), _metalMat))
  slot.position.set(1.3, 1.5, 1.82)
  group.add(slot)
  // Label above slot
  const slotLabel = _shadow(new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.1, 0.04), _whiteMat))
  slotLabel.position.set(1.3, 1.75, 1.80)
  group.add(slotLabel)

  // Windows (front face, flanking entrance)
  for (const xOff of [-1.4, 1.4]) {
    if (Math.abs(xOff - 1.3) < 0.5) continue // skip right if too close to mail slot
    const win = _shadow(new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.8, 0.06), _glassMat))
    win.position.set(xOff, 2.5, 1.78)
    group.add(win)
    const frame = _shadow(new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.85, 0.04), _whiteMat))
    frame.position.set(xOff, 2.5, 1.77)
    group.add(frame)
    // Cross divider
    const fH = _shadow(new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.04, 0.07), _whiteMat))
    fH.position.set(xOff, 2.5, 1.79)
    group.add(fH)
    const fV = _shadow(new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.85, 0.07), _whiteMat))
    fV.position.set(xOff, 2.5, 1.79)
    group.add(fV)
  }

  // Side windows
  for (const side of [-1, 1]) {
    for (let i = 0; i < 2; i++) {
      const winZ = -0.6 + i * 1.2
      const win = _shadow(new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.7, 0.5), _glassMat))
      win.position.set(side * 2.02, 2.2, winZ)
      group.add(win)
      const frame = _shadow(new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.75, 0.55), _whiteMat))
      frame.position.set(side * 2.01, 2.2, winZ)
      group.add(frame)
    }
  }

  // Clock on the front parapet
  const clockFace = _shadow(new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.08, 16), _whiteMat))
  clockFace.position.set(0, 3.9, 1.92)
  clockFace.rotation.x = Math.PI / 2
  group.add(clockFace)
  // Clock border
  const clockBorder = _shadow(new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.04, 8, 16), _darkMat))
  clockBorder.position.set(0, 3.9, 1.93)
  clockBorder.rotation.x = Math.PI / 2
  group.add(clockBorder)
  // Clock hands
  const hourHand = _shadow(new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.22, 0.04), _darkMat))
  hourHand.position.set(0, 4.0, 1.96)
  hourHand.rotation.z = Math.PI * 0.25
  group.add(hourHand)
  const minuteHand = _shadow(new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.32, 0.04), _darkMat))
  minuteHand.position.set(0.05, 3.95, 1.97)
  minuteHand.rotation.z = -Math.PI * 0.1
  group.add(minuteHand)
  // Clock center dot
  const clockDot = _shadow(new THREE.Mesh(new THREE.SphereGeometry(0.04, 6, 4), _darkMat))
  clockDot.position.set(0, 3.9, 1.97)
  group.add(clockDot)

  // Columns flanking entrance
  for (const xOff of [-0.85, 0.85]) {
    const column = _shadow(new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 2.8, 8), _whiteMat))
    column.position.set(xOff, 1.4, 1.85)
    group.add(column)
    // Column base
    const base = _shadow(new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.15, 0.35), _whiteMat))
    base.position.set(xOff, 0.08, 1.85)
    group.add(base)
    // Column capital
    const capital = _shadow(new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.12, 0.35), _whiteMat))
    capital.position.set(xOff, 2.84, 1.85)
    group.add(capital)
  }

  // ── Props: Large mailbox, letter, bench (dynamic physics) ──
  // Standing mailbox (toppleable)
  {
    const wx = bx + 2.8, wz = bz + 1.5
    const mbGroup = new THREE.Group()
    const mbPost = _shadow(new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.0, 6), _metalMat))
    mbPost.position.set(0, 0.5, 0)
    mbGroup.add(mbPost)
    const mbBody = _shadow(new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.55, 0.35),
      new THREE.MeshStandardMaterial({ color: '#2266bb', flatShading: true })))
    mbBody.position.set(0, 1.28, 0)
    mbGroup.add(mbBody)
    // Rounded top of mailbox
    const mbTop = _shadow(new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.5, 8, 1, false, 0, Math.PI),
      new THREE.MeshStandardMaterial({ color: '#2266bb', flatShading: true })))
    mbTop.position.set(0, 1.55, 0)
    mbTop.rotation.set(0, 0, Math.PI / 2)
    mbTop.rotation.order = 'ZYX'
    mbGroup.add(mbTop)
    // Mail slot on mailbox
    const mbSlot = _shadow(new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.04, 0.15), _darkMat))
    mbSlot.position.set(0, 1.45, 0.19)
    mbGroup.add(mbSlot)
    mbGroup.position.set(wx, 0, wz)
    scene.add(mbGroup)

    const bd = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(wx, 0.875, wz)
      .setLinearDamping(0.3)
      .setAngularDamping(0.4)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(0.25, 0.875, 0.175)
        .setDensity(4.0).setFriction(0.5).setRestitution(0.1),
      body
    )
    syncList.push({ mesh: mbGroup, body })
  }

  // Bench to the left of entrance (kickable)
  {
    const wx = bx + -2.6, wz = bz + 1.5
    const benchGroup = new THREE.Group()
    const benchSeat = _shadow(new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.08, 0.4), _darkWoodMat))
    benchSeat.position.set(0, 0.5, 0)
    benchGroup.add(benchSeat)
    for (const xo of [-0.5, 0.5]) {
      const benchLeg = _shadow(new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.5, 0.08), _metalMat))
      benchLeg.position.set(xo, 0.25, 0)
      benchGroup.add(benchLeg)
    }
    // Bench back
    const benchBack = _shadow(new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.5, 0.06), _darkWoodMat))
    benchBack.position.set(0, 0.8, -0.22)
    benchGroup.add(benchBack)
    benchGroup.position.set(wx, 0, wz)
    scene.add(benchGroup)

    const bd = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(wx, 0.52, wz)
      .setLinearDamping(0.3)
      .setAngularDamping(0.4)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(0.6, 0.52, 0.2)
        .setDensity(5.0).setFriction(0.5).setRestitution(0.1),
      body
    )
    syncList.push({ mesh: benchGroup, body })
  }

  // Envelope / letter prop on the ground near entrance (very light kickable)
  {
    const wx = bx + 0.5, wz = bz + 2.3
    const envelope = _shadow(new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.02, 0.2), _whiteMat))
    envelope.position.set(wx, 0.02, wz)
    envelope.rotation.y = 0.3
    scene.add(envelope)

    const bd = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(wx, 0.01, wz)
      .setLinearDamping(0.3)
      .setAngularDamping(0.4)
    const body = world.createRigidBody(bd)
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(0.15, 0.01, 0.1)
        .setDensity(0.5).setFriction(0.5).setRestitution(0.1),
      body
    )
    syncList.push({ mesh: envelope, body })
  }

  // Steps at entrance
  const step1 = _shadow(new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.12, 0.4), _stoneMat))
  step1.position.set(0, 0.06, 2.2)
  group.add(step1)
  const step2 = _shadow(new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.12, 0.3), _stoneMat))
  step2.position.set(0, 0.18, 2.0)
  group.add(step2)

  return group
}

// ── Build the right function for each location ──────────────────
const _builders = {
  about: _buildAbout,
  projects: _buildProjects,
  experience: _buildExperience,
  contact: _buildContact,
}

export function createLocations(scene, RAPIER, world) {
  const locations = []
  const syncList = []
  /** Map of location id -> { proceduralGroup, loadedRoot } for model swapping */
  const _meshRefs = {}

  for (const def of LOCATION_DEFS) {
    const builder = _builders[def.id] || _buildFallback
    const proceduralGroup = builder(def, scene, RAPIER, world, syncList)
    scene.add(proceduralGroup)

    _meshRefs[def.id] = { proceduralGroup, loadedRoot: null }

    locations.push({
      id:       def.id,
      label:    def.label,
      color:    def.color,
      radius:   6,
      content:  def.content,
      position: new THREE.Vector3(def.position.x, 0, def.position.z),
    })
  }

  /**
   * Replace a building's procedural mesh with a loaded GLTF scene.
   * The procedural mesh is hidden (not removed) so it can serve as fallback.
   *
   * @param {string} locationId — id of the location (e.g. 'about', 'projects')
   * @param {THREE.Object3D} gltfScene — the `gltf.scene` from GLTFLoader
   * @param {Object} [opts]
   * @param {number} [opts.scale=1] — uniform scale for the model
   * @param {THREE.Vector3} [opts.offset] — positional offset to center the model
   */
  function useLoadedModel(locationId, gltfScene, opts = {}) {
    const ref = _meshRefs[locationId]
    if (!ref) {
      console.warn(`[locations] unknown location id: ${locationId}`)
      return
    }

    const scale = opts.scale ?? 1
    const offset = opts.offset

    // Hide procedural mesh
    ref.proceduralGroup.visible = false

    // Remove previous loaded model if any
    if (ref.loadedRoot) {
      ref.proceduralGroup.parent.remove(ref.loadedRoot)
    }

    // Add loaded model at the same position as the procedural group
    ref.loadedRoot = gltfScene.clone()
    ref.loadedRoot.scale.setScalar(scale)
    ref.loadedRoot.position.copy(ref.proceduralGroup.position)
    if (offset) ref.loadedRoot.position.add(offset)

    // Ensure shadows
    ref.loadedRoot.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })

    scene.add(ref.loadedRoot)
  }

  /**
   * Revert a building to its procedural mesh.
   * @param {string} locationId
   */
  function useProceduralMesh(locationId) {
    const ref = _meshRefs[locationId]
    if (!ref) return

    if (ref.loadedRoot) {
      ref.proceduralGroup.parent.remove(ref.loadedRoot)
      ref.loadedRoot = null
    }
    ref.proceduralGroup.visible = true
  }

  return { locations, useLoadedModel, useProceduralMesh, syncList }
}

// Fallback builder (plain box) in case an id doesn't match
function _buildFallback(def, scene, RAPIER, world, syncList) {
  const group = new THREE.Group()
  group.position.set(def.position.x, 0, def.position.z)
  const body = _shadow(new THREE.Mesh(
    new THREE.BoxGeometry(def.bodySize.w, def.bodySize.h, def.bodySize.d),
    new THREE.MeshStandardMaterial({ color: def.color, flatShading: true })
  ))
  body.position.y = def.bodyY
  group.add(body)
  return group
}
