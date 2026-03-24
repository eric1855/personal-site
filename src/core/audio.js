/**
 * Audio system using Howler.js.
 * All sounds are stub/placeholder — missing audio files will NOT crash the app.
 * Initialises on first user gesture (browser autoplay policy).
 */
import { Howl, Howler } from 'howler'

// ── State ────────────────────────────────────────────────────────────
let _initialised = false
let _muted       = false

// Sound instances (nullable — created lazily on first gesture)
let _engineHum   = null
let _collision   = null
let _popupOpen   = null
let _popupClose  = null
let _proximity   = null
let _ambient     = null

// localStorage key
const MUTE_KEY = 'audio_muted'

// ── Safe Howl factory ────────────────────────────────────────────────
/**
 * Creates a Howl instance. If the file doesn't exist, the Howl will fire
 * a 'loaderror' event — we catch it silently so nothing crashes.
 */
function _safeHowl(opts) {
  try {
    const howl = new Howl(opts)
    howl.on('loaderror', () => { /* file not present — silent no-op */ })
    howl.on('playerror', () => { /* playback blocked — silent no-op */ })
    return howl
  } catch (_e) {
    return null
  }
}

// ── Initialisation (call on first user gesture) ──────────────────────
function _initSounds() {
  if (_initialised) return
  _initialised = true

  // Restore mute preference
  try {
    _muted = localStorage.getItem(MUTE_KEY) === '1'
  } catch (_e) { /* localStorage unavailable */ }
  Howler.mute(_muted)

  // Engine hum — looping, pitch-shifted by speed
  _engineHum = _safeHowl({
    src: ['/assets/audio/engine.webm', '/assets/audio/engine.mp3'],
    loop:   true,
    volume: 0.25,
  })

  // Collision impact
  _collision = _safeHowl({
    src: ['/assets/audio/collision.webm', '/assets/audio/collision.mp3'],
    volume: 0.5,
  })

  // UI: popup open
  _popupOpen = _safeHowl({
    src: ['/assets/audio/popup-open.webm', '/assets/audio/popup-open.mp3'],
    volume: 0.3,
  })

  // UI: popup close
  _popupClose = _safeHowl({
    src: ['/assets/audio/popup-close.webm', '/assets/audio/popup-close.mp3'],
    volume: 0.25,
  })

  // UI: proximity prompt
  _proximity = _safeHowl({
    src: ['/assets/audio/proximity.webm', '/assets/audio/proximity.mp3'],
    volume: 0.15,
  })

  // Ambient background loop
  _ambient = _safeHowl({
    src: ['/assets/audio/ambient.webm', '/assets/audio/ambient.mp3'],
    loop:   true,
    volume: 0.12,
  })
}

// ── Mute button ──────────────────────────────────────────────────────
let _muteBtn = null

function _createMuteButton() {
  _muteBtn = document.createElement('button')
  _muteBtn.id = 'audio-mute-btn'
  Object.assign(_muteBtn.style, {
    position:        'fixed',
    top:             '16px',
    right:           '16px',
    width:           '36px',
    height:          '36px',
    borderRadius:    '8px',
    border:          '1px solid rgba(255,255,255,0.2)',
    background:      'rgba(10,10,20,0.6)',
    backdropFilter:  'blur(8px)',
    webkitBackdropFilter: 'blur(8px)',
    color:           'rgba(255,255,255,0.7)',
    fontSize:        '18px',
    cursor:          'pointer',
    display:         'flex',
    alignItems:      'center',
    justifyContent:  'center',
    zIndex:          '900',
    transition:      'background 0.12s ease',
    userSelect:      'none',
    lineHeight:      '1',
    padding:         '0',
  })
  _muteBtn.title = 'Toggle sound'
  _updateMuteIcon()
  _muteBtn.addEventListener('click', toggleMute)
  _muteBtn.addEventListener('mouseover', () => {
    _muteBtn.style.background = 'rgba(255,255,255,0.12)'
  })
  _muteBtn.addEventListener('mouseout', () => {
    _muteBtn.style.background = 'rgba(10,10,20,0.6)'
  })

  const hud = document.getElementById('hud')
  if (hud) hud.appendChild(_muteBtn)
  else document.body.appendChild(_muteBtn)
}

function _updateMuteIcon() {
  if (!_muteBtn) return
  // Speaker icon vs muted icon (plain text, no emoji)
  _muteBtn.textContent = _muted ? '/' : ')'
  _muteBtn.innerHTML = _muted
    ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>'
    : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>'
}

// ── Public API ────────────────────────────────────────────────────────

/**
 * Set up the audio system. Should be called once during boot.
 * Actual sound loading is deferred until first user gesture.
 */
export function initAudio() {
  _createMuteButton()

  // Initialise sounds on first user interaction (click, key, touch)
  const gestures = ['click', 'keydown', 'touchstart']
  function onFirstGesture() {
    _initSounds()
    for (const evt of gestures) window.removeEventListener(evt, onFirstGesture, true)
    // Start looping sounds after init
    _startLoops()
  }
  for (const evt of gestures) window.addEventListener(evt, onFirstGesture, { once: false, capture: true })
}

/** Start looping sounds (engine hum, ambient) */
function _startLoops() {
  try { if (_engineHum && !_engineHum.playing()) _engineHum.play() } catch (_e) {}
  try { if (_ambient && !_ambient.playing()) _ambient.play() } catch (_e) {}
}

/**
 * Call each frame to modulate engine hum by car speed.
 * @param {number} speed — carState.speed (0 to ~0.18)
 */
export function updateAudioEngine(speed) {
  if (!_engineHum || !_initialised) return
  try {
    // Map speed 0..0.18 to playback rate 0.6..1.5
    const rate = 0.6 + (speed / 0.18) * 0.9
    _engineHum.rate(Math.min(Math.max(rate, 0.6), 1.5))

    // Volume scales slightly with speed
    const vol = 0.15 + (speed / 0.18) * 0.2
    _engineHum.volume(Math.min(vol, 0.35))
  } catch (_e) {}
}

/**
 * Play collision sound. Volume scales with impact speed.
 * @param {number} impactSpeed — 0 to ~0.18
 */
export function playCollisionSound(impactSpeed) {
  if (!_collision || !_initialised) return
  try {
    const vol = 0.2 + (impactSpeed / 0.18) * 0.6
    _collision.volume(Math.min(vol, 0.8))
    _collision.play()
  } catch (_e) {}
}

/** Play popup open sound */
export function playPopupOpenSound() {
  if (!_popupOpen || !_initialised) return
  try { _popupOpen.play() } catch (_e) {}
}

/** Play popup close sound */
export function playPopupCloseSound() {
  if (!_popupClose || !_initialised) return
  try { _popupClose.play() } catch (_e) {}
}

/** Play proximity prompt sound (call once when prompt appears) */
export function playProximitySound() {
  if (!_proximity || !_initialised) return
  try { _proximity.play() } catch (_e) {}
}

/**
 * Switch ambient loop. Call when changing worlds.
 * @param {string} worldName — used to build the file path
 */
export function setAmbient(worldName) {
  if (!_initialised) return
  try {
    if (_ambient) _ambient.stop()
    _ambient = _safeHowl({
      src: [`/assets/audio/ambient-${worldName}.webm`, `/assets/audio/ambient-${worldName}.mp3`],
      loop:   true,
      volume: 0.12,
    })
    if (_ambient && !_muted) _ambient.play()
  } catch (_e) {}
}

/** Toggle mute on/off */
export function toggleMute() {
  _muted = !_muted
  Howler.mute(_muted)
  _updateMuteIcon()
  try { localStorage.setItem(MUTE_KEY, _muted ? '1' : '0') } catch (_e) {}
}

/** @returns {boolean} current mute state */
export function isMuted() {
  return _muted
}
