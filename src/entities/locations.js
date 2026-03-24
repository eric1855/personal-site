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
      <p style="margin:0 0 16px;">CS and Math student at Carnegie Mellon University (3.93 GPA, May 2027). I build things across ML, robotics, full-stack web, and creative coding.</p>
      <div style="margin:0 0 16px;">
        <h4 style="margin:0 0 8px;font-size:0.95rem;color:rgba(255,255,255,0.7);">Skills</h4>
        <div style="display:flex;flex-wrap:wrap;gap:6px;">
          ${['C','C++','Java','JavaScript','Python','Dart','PyTorch','React.js','Node.js','AWS','Kubernetes','Docker','Flutter','Arduino','Figma','Git'].map(s =>
            `<span style="padding:3px 10px;border-radius:6px;background:rgba(91,141,238,0.15);border:1px solid rgba(91,141,238,0.3);font-size:0.8rem;color:rgba(255,255,255,0.85);">${s}</span>`
          ).join('')}
        </div>
      </div>
      <div>
        <h4 style="margin:0 0 8px;font-size:0.95rem;color:rgba(255,255,255,0.7);">Awards</h4>
        <p style="margin:0;font-size:0.9rem;">USACO Gold Division (2023, 2024) &middot; 4X AIME Qualifier &middot; Science Olympiad 20-time medalist</p>
      </div>
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

function _buildLocationMesh(def) {
  const group = new THREE.Group()
  group.position.set(def.position.x, 0, def.position.z)

  const body = new THREE.Mesh(
    new THREE.BoxGeometry(def.bodySize.w, def.bodySize.h, def.bodySize.d),
    new THREE.MeshStandardMaterial({ color: def.color, flatShading: true })
  )
  body.position.y = def.bodyY
  body.castShadow = true
  body.receiveShadow = true
  group.add(body)

  const sign = new THREE.Mesh(
    new THREE.BoxGeometry(def.bodySize.w * 0.8, def.bodySize.h * 0.15, 0.15),
    new THREE.MeshStandardMaterial({ color: '#ffffff', transparent: true, opacity: 0.9, flatShading: true })
  )
  sign.position.set(def.signOffset.x, def.signOffset.y, def.signOffset.z)
  sign.castShadow = true
  group.add(sign)

  return group
}

export function createLocations(scene) {
  const locations = []
  /** Map of location id -> { proceduralGroup, loadedRoot } for model swapping */
  const _meshRefs = {}

  for (const def of LOCATION_DEFS) {
    const proceduralGroup = _buildLocationMesh(def)
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

  return { locations, useLoadedModel, useProceduralMesh }
}
