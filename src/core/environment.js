/**
 * Procedural environment map — gradient sky for PBR reflections.
 * Uses PMREMGenerator to create a pre-filtered environment cubemap.
 */
import * as THREE from 'three'

export function createEnvironment(renderer, scene) {
  const pmremGenerator = new THREE.PMREMGenerator(renderer)
  pmremGenerator.compileCubemapShader()

  // Build a simple gradient sky scene
  const skyScene = new THREE.Scene()

  // Top-down gradient sphere (sky dome)
  const skyGeo = new THREE.SphereGeometry(100, 32, 16)
  const skyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    uniforms: {
      topColor:    { value: new THREE.Color(0x0a0a2e) },  // dark blue-black (space)
      bottomColor: { value: new THREE.Color(0x2a2a3a) },  // dark terrain tint
      offset:      { value: 10 },
      exponent:    { value: 0.6 },
    },
    vertexShader: `
      varying vec3 vWorldPosition;
      void main() {
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPos.xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 topColor;
      uniform vec3 bottomColor;
      uniform float offset;
      uniform float exponent;
      varying vec3 vWorldPosition;
      void main() {
        float h = normalize(vWorldPosition + offset).y;
        gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
      }
    `,
  })
  skyScene.add(new THREE.Mesh(skyGeo, skyMat))

  // Add a few bright points to simulate star reflections
  const lightA = new THREE.PointLight(0x8888ff, 2, 200)
  lightA.position.set(50, 80, -30)
  skyScene.add(lightA)
  const lightB = new THREE.PointLight(0xaa66ff, 1.5, 200)
  lightB.position.set(-40, 60, 50)
  skyScene.add(lightB)

  // Generate environment map from sky scene
  const envMap = pmremGenerator.fromScene(skyScene, 0.04).texture
  scene.environment = envMap

  // Clean up — sky scene is no longer needed
  pmremGenerator.dispose()
  skyGeo.dispose()
  skyMat.dispose()

  return { envMap }
}
