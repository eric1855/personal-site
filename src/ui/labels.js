/**
 * 3D text labels for portfolio buildings — SDF-rendered via troika-three-text.
 * Crisp at any distance, no texture atlas needed.
 */
import { Text } from 'troika-three-text'

/**
 * Create floating 3D labels above each building.
 * @param {THREE.Scene} scene
 * @param {Array<{label: string, color: string, position: THREE.Vector3}>} locations
 */
export function createLabels(scene, locations) {
  const labels = []

  for (const loc of locations) {
    const text = new Text()
    text.text = loc.label
    text.fontSize = 1.2
    text.color = loc.color
    text.anchorX = 'center'
    text.anchorY = 'bottom'
    text.position.set(loc.position.x, loc.labelY || 7, loc.position.z)
    // Face the default camera direction (looking from +z toward -z)
    text.rotation.set(0, 0, 0)
    text.outlineWidth = 0.04
    text.outlineColor = '#000000'
    text.depthOffset = -1  // render slightly in front to avoid z-fighting

    text.sync()
    scene.add(text)
    labels.push(text)
  }

  return { labels }
}
