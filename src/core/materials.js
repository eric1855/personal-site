/**
 * Centralized material factory — consistent PBR across the project.
 * All materials use flatShading: true for the low-poly aesthetic.
 */
import * as THREE from 'three'

/**
 * General-purpose material with sensible defaults.
 * @param {number|string} color
 * @param {object} opts — roughness, metalness, emissive, emissiveIntensity, transparent, opacity, side, ...
 */
export function createMaterial(color, opts = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness:  opts.roughness  ?? 0.7,
    metalness:  opts.metalness  ?? 0.0,
    flatShading: true,
    ...opts,
  })
}

/** Metallic preset — shiny, reflective surfaces (rails, beams, machinery). */
export function metal(color) {
  return createMaterial(color, { roughness: 0.3, metalness: 0.8 })
}

/** Glass preset — smooth, transparent, catches environment reflections. */
export function glass(color) {
  return createMaterial(color, {
    roughness: 0.1,
    metalness: 0.0,
    transparent: true,
    opacity: 0.35,
  })
}

/** Default organic preset — matte, non-metallic (ground, plants, wood). */
export function organic(color) {
  return createMaterial(color, { roughness: 0.7, metalness: 0.0 })
}
