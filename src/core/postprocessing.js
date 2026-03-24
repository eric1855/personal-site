/**
 * Post-processing pipeline — pmndrs postprocessing library.
 * Single EffectPass with Bloom + Vignette.
 */
import { EffectComposer, EffectPass, RenderPass, BloomEffect, VignetteEffect, BlendFunction } from 'postprocessing'

export function createPostProcessing(renderer, scene, camera) {
  const composer = new EffectComposer(renderer)

  // Base render pass
  composer.addPass(new RenderPass(scene, camera))

  // Bloom — picks up emissive materials (alien plants, headlights, warning lights)
  const bloom = new BloomEffect({
    luminanceThreshold: 0.4,
    luminanceSmoothing: 0.3,
    intensity: 0.8,
    mipmapBlur: true,
  })

  // Vignette — subtle edge darkening for cinematic feel
  const vignette = new VignetteEffect({
    darkness: 0.45,
    offset: 0.3,
  })

  // Single combined EffectPass
  composer.addPass(new EffectPass(camera, bloom, vignette))

  return { composer }
}
