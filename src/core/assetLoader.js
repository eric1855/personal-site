/**
 * Centralized asset loader — GLTFLoader + DRACOLoader with progress tracking.
 * Uses Three.js LoadingManager for unified progress and model cache for instancing.
 *
 * Usage:
 *   import { initLoaders, loadModel, getLoadingProgress } from './assetLoader.js'
 *   initLoaders()
 *   const gltf = await loadModel('/assets/models/car.glb')
 */
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

// ── State ────────────────────────────────────────────────────────────────
let _gltfLoader = null
let _dracoLoader = null
let _manager = null

/** path -> Promise<GLTF> — deduplicates in-flight + completed loads */
const _cache = new Map()

/** Progress tracking */
let _itemsLoaded = 0
let _itemsTotal = 0
let _isLoading = false

// ── Public API ───────────────────────────────────────────────────────────

/**
 * Initialise loaders. Safe to call multiple times (no-op after first).
 * @param {Object} [opts]
 * @param {string} [opts.dracoDecoderPath] — CDN path for Draco WASM decoder.
 *   Defaults to the jsDelivr-hosted Three.js Draco decoder.
 * @param {function} [opts.onProgress] — called with (loaded, total) on each item.
 */
export function initLoaders(opts = {}) {
  if (_gltfLoader) return  // already initialised

  _manager = new THREE.LoadingManager()

  _manager.onStart = () => {
    _isLoading = true
  }

  _manager.onLoad = () => {
    _isLoading = false
  }

  _manager.onProgress = (_url, loaded, total) => {
    _itemsLoaded = loaded
    _itemsTotal = total
    if (opts.onProgress) opts.onProgress(loaded, total)
  }

  _manager.onError = (url) => {
    console.warn(`[assetLoader] failed to load: ${url}`)
  }

  // Draco decoder — compressed glTF support
  _dracoLoader = new DRACOLoader(_manager)
  _dracoLoader.setDecoderPath(
    opts.dracoDecoderPath ||
    'https://cdn.jsdelivr.net/npm/three@0.183.1/examples/jsm/libs/draco/'
  )
  _dracoLoader.preload()

  // GLTF loader
  _gltfLoader = new GLTFLoader(_manager)
  _gltfLoader.setDRACOLoader(_dracoLoader)
}

/**
 * Load a GLB/GLTF model. Returns a cached result if the same path has been
 * requested before (deduplicates both in-flight and completed loads).
 *
 * @param {string} path — URL or relative path (e.g. '/assets/models/car.glb')
 * @returns {Promise<import('three/examples/jsm/loaders/GLTFLoader.js').GLTF>}
 */
export function loadModel(path) {
  if (!_gltfLoader) {
    initLoaders()  // auto-init with defaults if caller forgot
  }

  if (_cache.has(path)) return _cache.get(path)

  const promise = new Promise((resolve, reject) => {
    _gltfLoader.load(
      path,
      (gltf) => {
        // Enable shadows on all meshes by default
        gltf.scene.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
          }
        })
        resolve(gltf)
      },
      undefined,  // progress handled by LoadingManager
      (err) => {
        _cache.delete(path)  // allow retry on error
        reject(err)
      }
    )
  })

  _cache.set(path, promise)
  return promise
}

/**
 * Returns loading progress as a value between 0 and 1.
 * Returns 1 when nothing is loading or all items are done.
 */
export function getLoadingProgress() {
  if (!_isLoading || _itemsTotal === 0) return 1
  return _itemsLoaded / _itemsTotal
}
