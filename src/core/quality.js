/**
 * Adaptive quality system — auto-adjusts rendering settings based on FPS.
 *
 * Three tiers: High, Medium, Low. Each tier controls shadow map size,
 * pixel ratio, and post-processing toggles. FPS is tracked with a rolling
 * window and tier changes happen automatically.
 *
 * Usage:
 *   import { initQuality, updateQuality, getQualityTier, getQualitySettings } from './quality.js'
 *   initQuality(renderer)
 *   // In the render loop:
 *   updateQuality(fps)
 */

// ── Quality Tiers ────────────────────────────────────────────────────────

export const TIER_HIGH   = 'high'
export const TIER_MEDIUM = 'medium'
export const TIER_LOW    = 'low'

const TIER_SETTINGS = {
  [TIER_HIGH]: {
    shadowMapSize:    2048,
    pixelRatio:       Math.min(window.devicePixelRatio, 2),
    postProcessing:   true,
    ssao:             true,
    bloomEnabled:     true,
  },
  [TIER_MEDIUM]: {
    shadowMapSize:    1024,
    pixelRatio:       Math.min(window.devicePixelRatio, 1.5),
    postProcessing:   true,
    ssao:             false,
    bloomEnabled:     true,
  },
  [TIER_LOW]: {
    shadowMapSize:    512,
    pixelRatio:       1,
    postProcessing:   false,
    ssao:             false,
    bloomEnabled:     false,
  },
}

const TIER_ORDER = [TIER_LOW, TIER_MEDIUM, TIER_HIGH]

// ── Thresholds ───────────────────────────────────────────────────────────

const DROP_FPS_THRESHOLD  = 45   // drop tier if avg FPS < this
const DROP_DURATION_S     = 3    // ...for this many seconds

const RAISE_FPS_THRESHOLD = 58   // try upgrading if avg FPS > this
const RAISE_DURATION_S    = 10   // ...for this many seconds

const STORAGE_KEY = 'quality-tier'

// ── State ────────────────────────────────────────────────────────────────

let _currentTier = TIER_HIGH
let _renderer = null

// FPS tracking (rolling window)
const FPS_WINDOW_SIZE = 120  // ~2 seconds at 60fps
const _fpsHistory = []
let _avgFps = 60

// Duration tracking for tier transitions
let _lowFpsAccumulator = 0    // seconds spent below DROP threshold
let _highFpsAccumulator = 0   // seconds spent above RAISE threshold
let _lastUpdateTime = 0

// Performance monitor
let _frameCount = 0
let _fpsDisplayValue = 60
let _fpsCounterStart = 0

// Debug overlay (dev mode only)
let _debugOverlay = null

// ── Public API ───────────────────────────────────────────────────────────

/**
 * Initialise the quality system. Restores saved tier from localStorage
 * and applies initial settings to the renderer.
 *
 * @param {THREE.WebGLRenderer} renderer
 */
export function initQuality(renderer) {
  _renderer = renderer

  // Detect mobile — start at Medium
  const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)

  // Restore saved preference, or use default based on device
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved && TIER_ORDER.includes(saved)) {
    _currentTier = saved
  } else {
    _currentTier = isMobile ? TIER_MEDIUM : TIER_HIGH
  }

  _applyTier()

  _lastUpdateTime = performance.now() / 1000
  _fpsCounterStart = performance.now()

  // Create debug overlay in dev mode
  if (import.meta.env.DEV) {
    _createDebugOverlay()
  }
}

/**
 * Returns the current quality tier string: 'high', 'medium', or 'low'.
 * @returns {string}
 */
export function getQualityTier() {
  return _currentTier
}

/**
 * Returns the full settings object for the current tier.
 * @returns {{ shadowMapSize: number, pixelRatio: number, postProcessing: boolean, ssao: boolean, bloomEnabled: boolean }}
 */
export function getQualitySettings() {
  return { ...TIER_SETTINGS[_currentTier] }
}

/**
 * Call once per frame with the current timestamp (from requestAnimationFrame).
 * Tracks FPS and auto-adjusts quality tier if needed.
 *
 * @param {number} now — performance.now() timestamp in milliseconds
 */
export function updateQuality(now) {
  const nowS = now / 1000

  // ── FPS calculation ────────────────────────────────────────────
  _frameCount++

  const elapsed = now - _fpsCounterStart
  if (elapsed >= 500) {
    _fpsDisplayValue = Math.round((_frameCount / elapsed) * 1000)
    _frameCount = 0
    _fpsCounterStart = now
  }

  // Rolling FPS window
  _fpsHistory.push(_fpsDisplayValue)
  if (_fpsHistory.length > FPS_WINDOW_SIZE) _fpsHistory.shift()
  _avgFps = _fpsHistory.reduce((a, b) => a + b, 0) / _fpsHistory.length

  // ── Tier auto-adjustment ───────────────────────────────────────
  const dt = nowS - _lastUpdateTime
  _lastUpdateTime = nowS

  // Clamp dt to avoid huge jumps from tab switches
  const clampedDt = Math.min(dt, 0.25)

  if (_avgFps < DROP_FPS_THRESHOLD) {
    _lowFpsAccumulator += clampedDt
    _highFpsAccumulator = 0
  } else if (_avgFps > RAISE_FPS_THRESHOLD) {
    _highFpsAccumulator += clampedDt
    _lowFpsAccumulator = 0
  } else {
    // In the middle zone — slowly decay both accumulators
    _lowFpsAccumulator = Math.max(0, _lowFpsAccumulator - clampedDt * 0.5)
    _highFpsAccumulator = Math.max(0, _highFpsAccumulator - clampedDt * 0.5)
  }

  if (_lowFpsAccumulator >= DROP_DURATION_S) {
    _dropTier()
    _lowFpsAccumulator = 0
  }

  if (_highFpsAccumulator >= RAISE_DURATION_S) {
    _raiseTier()
    _highFpsAccumulator = 0
  }

  // ── Debug overlay update ───────────────────────────────────────
  if (_debugOverlay) {
    _updateDebugOverlay()
  }
}

// ── Internal ─────────────────────────────────────────────────────────────

function _dropTier() {
  const idx = TIER_ORDER.indexOf(_currentTier)
  if (idx > 0) {
    _currentTier = TIER_ORDER[idx - 1]
    _saveTier()
    _applyTier()
    if (import.meta.env.DEV) {
      console.log(`[quality] dropped to ${_currentTier} (avg FPS: ${_avgFps.toFixed(1)})`)
    }
  }
}

function _raiseTier() {
  const idx = TIER_ORDER.indexOf(_currentTier)
  if (idx < TIER_ORDER.length - 1) {
    _currentTier = TIER_ORDER[idx + 1]
    _saveTier()
    _applyTier()
    if (import.meta.env.DEV) {
      console.log(`[quality] raised to ${_currentTier} (avg FPS: ${_avgFps.toFixed(1)})`)
    }
  }
}

function _saveTier() {
  try {
    localStorage.setItem(STORAGE_KEY, _currentTier)
  } catch { /* localStorage may be unavailable */ }
}

function _applyTier() {
  if (!_renderer) return

  const s = TIER_SETTINGS[_currentTier]

  _renderer.setPixelRatio(s.pixelRatio)

  // Update shadow map size on all shadow-casting lights
  _renderer.shadowMap.enabled = true
  const scene = _renderer.domElement?.parentElement
    ? undefined  // scene reference not needed for renderer-level settings
    : undefined

  // Note: shadow map size changes on existing lights require scene traversal,
  // which is handled by the caller if needed. The renderer pixel ratio takes
  // effect immediately.
}

// ── Debug Overlay (dev mode only) ────────────────────────────────────────

function _createDebugOverlay() {
  _debugOverlay = document.createElement('div')
  _debugOverlay.id = 'quality-debug'
  Object.assign(_debugOverlay.style, {
    position:       'fixed',
    top:            '8px',
    left:           '8px',
    padding:        '8px 12px',
    background:     'rgba(0, 0, 0, 0.7)',
    color:          '#0f0',
    fontFamily:     'monospace',
    fontSize:       '12px',
    lineHeight:     '1.6',
    borderRadius:   '6px',
    zIndex:         '9999',
    pointerEvents:  'none',
    userSelect:     'none',
    whiteSpace:     'pre',
  })
  document.body.appendChild(_debugOverlay)
}

function _updateDebugOverlay() {
  if (!_debugOverlay || !_renderer) return

  const info = _renderer.info
  const drawCalls = info.render ? info.render.calls : 0
  const triangles = info.render ? info.render.triangles : 0
  const programs = info.programs ? info.programs.length : 0

  const fpsColor = _avgFps >= 55 ? '#0f0' : _avgFps >= 40 ? '#ff0' : '#f00'

  _debugOverlay.innerHTML =
    `<span style="color:${fpsColor}">FPS: ${_fpsDisplayValue}</span> (avg: ${_avgFps.toFixed(0)})\n` +
    `Quality: ${_currentTier.toUpperCase()}\n` +
    `Draw calls: ${drawCalls}\n` +
    `Triangles: ${(triangles / 1000).toFixed(1)}k\n` +
    `Programs: ${programs}`
}
