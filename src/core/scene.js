import * as THREE from 'three'

export function createScene() {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#87ceeb')
  scene.fog = new THREE.Fog('#87ceeb', 40, 180)

  // Ambient light — intensity 0.7
  const ambient = new THREE.AmbientLight(0xffffff, 0.7)
  scene.add(ambient)

  // Directional light with shadows — exact settings from Scene.tsx
  const dirLight = new THREE.DirectionalLight(0xffffff, 1.2)
  dirLight.position.set(15, 25, 10)
  dirLight.castShadow = true
  dirLight.shadow.mapSize.width  = 2048
  dirLight.shadow.mapSize.height = 2048
  dirLight.shadow.camera.far    = 200
  dirLight.shadow.camera.left   = -80
  dirLight.shadow.camera.right  =  80
  dirLight.shadow.camera.top    =  80
  dirLight.shadow.camera.bottom = -80
  scene.add(dirLight)

  // Hemisphere light — sky/ground colors from Scene.tsx
  const hemi = new THREE.HemisphereLight('#87ceeb', '#4a7c59', 0.3)
  scene.add(hemi)

  return { scene }
}
