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
      <p style="margin:0 0 12px;">Software engineer and creative technologist. I build things for the web — interactive experiences, developer tools, and whatever else seems interesting.</p>
      <p style="color:rgba(255,255,255,0.45);font-size:0.85rem;margin:0;">More coming soon.</p>
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
      <h3 style="margin:0 0 12px;font-size:1.1rem;color:#f5a623;">Work in progress</h3>
      <p style="margin:0 0 12px;">A collection of projects spanning web tooling, 3D graphics, and side experiments. Each one taught me something useful.</p>
      <p style="color:rgba(255,255,255,0.45);font-size:0.85rem;margin:0;">More coming soon.</p>
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
      <h3 style="margin:0 0 12px;font-size:1.1rem;color:#50c878;">Say hello</h3>
      <p style="margin:0 0 12px;">I'm available for interesting conversations, collaborations, and the occasional coffee chat.</p>
      <p style="color:rgba(255,255,255,0.45);font-size:0.85rem;margin:0;">More coming soon.</p>
    `,
  },
  {
    id: 'blog',
    label: 'Blog',
    position: { x: -20, z: 0 },
    color: '#e84393',
    bodySize: { w: 3.5, h: 6.0, d: 3.0 },
    bodyY: 3.0,
    signOffset: { x: 0, y: 5.7, z: 1.57 },
    content: `
      <h3 style="margin:0 0 12px;font-size:1.1rem;color:#e84393;">Thinking out loud</h3>
      <p style="margin:0 0 12px;">Notes on engineering, design, and the occasional rabbit hole. Written when something feels worth writing down.</p>
      <p style="color:rgba(255,255,255,0.45);font-size:0.85rem;margin:0;">More coming soon.</p>
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

  for (const def of LOCATION_DEFS) {
    scene.add(_buildLocationMesh(def))
    locations.push({
      id:       def.id,
      label:    def.label,
      color:    def.color,
      radius:   6,
      content:  def.content,
      position: new THREE.Vector3(def.position.x, 0, def.position.z),
    })
  }

  return { locations }
}
