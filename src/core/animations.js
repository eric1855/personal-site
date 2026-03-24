/**
 * Animation system using GSAP — camera sequences and popup transitions.
 * Does NOT replace the physics game loop. Only controls camera/UI animations.
 */
import gsap from 'gsap'

// ── Camera mode constants ────────────────────────────────────────────
export const CameraMode = {
  FOLLOW:     'FOLLOW',      // Normal gameplay — camera follows car
  SCRIPTED:   'SCRIPTED',    // GSAP fully controls the camera (intro, cutscenes)
  TRANSITION: 'TRANSITION',  // Blending between scripted and follow
}

// ── Module state ─────────────────────────────────────────────────────
let _camera      = null
let _carState     = null
let _mode         = CameraMode.SCRIPTED
let _introComplete = false
let _onIntroComplete = null

// Saved camera state for popup transitions
let _savedCameraPos  = null
let _savedCameraLook = null
let _popupTimeline   = null

/**
 * Initialise the animation system.
 *
 * @param {THREE.PerspectiveCamera} camera
 * @param {object} carState  — { position, rotation, speed, ... }
 * @param {object} opts
 * @param {function} opts.onIntroComplete — called when intro finishes and gameplay begins
 */
export function initAnimations(camera, carState, opts = {}) {
  _camera          = camera
  _carState        = carState
  _onIntroComplete = opts.onIntroComplete || null
  _mode            = CameraMode.SCRIPTED
  _introComplete   = false
}

/** Current camera mode */
export function getCameraMode() {
  return _mode
}

/** Whether the intro sequence has finished */
export function isIntroComplete() {
  return _introComplete
}

// ── Intro camera sequence ────────────────────────────────────────────
/**
 * Birds-eye sweep that zooms down to the car.
 * Call this once the loading screen begins fading out.
 */
export function playIntroSequence() {
  if (!_camera || !_carState) return

  const carPos = _carState.position

  // Start position: high birds-eye, offset to the side for a sweep feel
  _camera.position.set(carPos.x + 30, 50, carPos.z + 30)
  _camera.lookAt(carPos.x, 0, carPos.z)

  _mode = CameraMode.SCRIPTED

  const tl = gsap.timeline({
    onUpdate: () => {
      // Keep looking at the car during the sweep
      if (_camera && _carState) {
        _camera.lookAt(_carState.position.x, _carState.position.y, _carState.position.z)
      }
    },
    onComplete: () => {
      _mode = CameraMode.FOLLOW
      _introComplete = true
      if (_onIntroComplete) _onIntroComplete()
    },
  })

  // Phase 1: Birds-eye orbit sweep (1.2s)
  tl.to(_camera.position, {
    x: carPos.x - 15,
    y: 30,
    z: carPos.z + 20,
    duration: 1.2,
    ease: 'power2.inOut',
  })

  // Phase 2: Zoom down toward car (1.0s)
  tl.to(_camera.position, {
    x: carPos.x,
    y: 12,
    z: carPos.z + 9,
    duration: 1.0,
    ease: 'power3.inOut',
  })
}

// ── Popup camera transitions ─────────────────────────────────────────
/**
 * Dolly camera toward a building when a popup opens.
 *
 * @param {object} location — { position: THREE.Vector3, ... }
 */
export function animatePopupOpen(location) {
  if (!_camera || !_carState) return

  // Kill any in-progress popup transition
  if (_popupTimeline) _popupTimeline.kill()

  // Save current camera state for return
  _savedCameraPos  = _camera.position.clone()
  _savedCameraLook = _carState.position.clone()

  _mode = CameraMode.TRANSITION

  // Compute a position partway between car and building, slightly elevated
  const buildingPos = location.position
  const midX = (_carState.position.x + buildingPos.x) * 0.5
  const midZ = (_carState.position.z + buildingPos.z) * 0.5

  _popupTimeline = gsap.timeline()
  _popupTimeline.to(_camera.position, {
    x: midX,
    y: 8,
    z: midZ + 5,
    duration: 0.5,
    ease: 'power2.out',
    onUpdate: () => {
      if (_camera && buildingPos) {
        _camera.lookAt(buildingPos.x, 2, buildingPos.z)
      }
    },
  })
}

/**
 * Smoothly return camera to follow position when a popup closes.
 */
export function animatePopupClose() {
  if (!_camera || !_savedCameraPos) {
    _mode = CameraMode.FOLLOW
    return
  }

  // Kill any in-progress popup transition
  if (_popupTimeline) _popupTimeline.kill()

  _mode = CameraMode.TRANSITION

  _popupTimeline = gsap.timeline({
    onComplete: () => {
      _mode = CameraMode.FOLLOW
      _popupTimeline = null
    },
  })

  _popupTimeline.to(_camera.position, {
    x: _savedCameraPos.x,
    y: _savedCameraPos.y,
    z: _savedCameraPos.z,
    duration: 0.4,
    ease: 'power2.inOut',
    onUpdate: () => {
      if (_camera && _savedCameraLook) {
        _camera.lookAt(_savedCameraLook.x, _savedCameraLook.y, _savedCameraLook.z)
      }
    },
  })
}
