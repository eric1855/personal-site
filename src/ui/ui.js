/**
 * HUD overlay — WASD keys, proximity prompt, minimap, speedometer, splash screen.
 *
 * All CSS is inline (no separate stylesheet), matching the project convention.
 */

// ── Location data for minimap (positions + colors) ───────────────────────────
const MINIMAP_LOCATIONS = [
  { x:   0, z: -20, color: '#5b8dee' },  // About
  { x:  20, z:   0, color: '#f5a623' },  // Projects
  { x:   0, z:  20, color: '#50c878' },  // Contact
  { x: -20, z:   0, color: '#e84393' },  // Experience
]

// World boundary radius for minimap scaling (world is ±60)
const WORLD_HALF = 60
const MINIMAP_SIZE = 120
const MINIMAP_PAD  = 6   // pixels of inset padding inside the circle

export function createUI() {
  const hud = document.getElementById('hud')

  // ─── WASD key legend (bottom center) ─────────────────────────────────────
  hud.innerHTML = `
    <div id="wasd-hud" style="
      position: fixed;
      bottom: 32px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      pointer-events: none;
      user-select: none;
      font-family: monospace;
    ">
      <div style="display:flex;gap:4px;">
        ${_keyHTML('W')}
      </div>
      <div style="display:flex;gap:4px;">
        ${_keyHTML('A')}${_keyHTML('S')}${_keyHTML('D')}
      </div>
      <p style="
        color: rgba(255,255,255,0.6);
        font-size: 12px;
        margin: 4px 0 0;
        letter-spacing: 0.1em;
        text-transform: uppercase;
      ">or Arrow Keys to drive</p>
    </div>
  `

  // ─── Proximity prompt ────────────────────────────────────────────────────
  const prompt = document.createElement('div')
  prompt.id = 'proximity-prompt'
  Object.assign(prompt.style, {
    position:            'fixed',
    bottom:              '120px',
    left:                '50%',
    transform:           'translateX(-50%) translateY(8px)',
    background:          'rgba(10,10,20,0.75)',
    backdropFilter:      'blur(8px)',
    webkitBackdropFilter:'blur(8px)',
    border:              '1px solid rgba(255,255,255,0.25)',
    borderRadius:        '10px',
    padding:             '10px 20px',
    color:               '#ffffff',
    fontFamily:          'monospace',
    fontSize:            '14px',
    letterSpacing:       '0.06em',
    boxShadow:           '0 4px 16px rgba(0,0,0,0.4)',
    pointerEvents:       'none',
    userSelect:          'none',
    opacity:             '0',
    transition:          'opacity 0.14s ease, transform 0.14s ease',
    whiteSpace:          'nowrap',
  })
  hud.appendChild(prompt)

  // ─── Speedometer (bottom-left, above nothing) ────────────────────────────
  const speedEl = document.createElement('div')
  speedEl.id = 'speedometer'
  Object.assign(speedEl.style, {
    position:            'fixed',
    bottom:              '32px',
    left:                '32px',
    display:             'flex',
    flexDirection:       'column',
    alignItems:          'flex-start',
    gap:                 '4px',
    pointerEvents:       'none',
    userSelect:          'none',
    fontFamily:          'monospace',
  })
  speedEl.innerHTML = `
    <div style="
      display: flex;
      align-items: baseline;
      gap: 6px;
    ">
      <span id="speed-value" style="
        font-size: 28px;
        font-weight: 700;
        color: #ffffff;
        min-width: 42px;
        text-align: right;
        text-shadow: 0 0 12px rgba(91,141,238,0.4);
      ">0</span>
      <span style="
        font-size: 11px;
        color: rgba(255,255,255,0.45);
        letter-spacing: 0.08em;
        text-transform: uppercase;
      ">km/h</span>
    </div>
    <div style="
      width: 80px;
      height: 4px;
      border-radius: 2px;
      background: rgba(255,255,255,0.12);
      overflow: hidden;
    ">
      <div id="speed-bar" style="
        width: 0%;
        height: 100%;
        border-radius: 2px;
        background: linear-gradient(90deg, #5b8dee, #50c878);
        transition: width 0.08s ease;
      "></div>
    </div>
  `
  hud.appendChild(speedEl)
  const speedValueEl = speedEl.querySelector('#speed-value')
  const speedBarEl   = speedEl.querySelector('#speed-bar')

  // ─── Minimap (top-right) ──────────────────────────────────────────────────
  const minimapWrap = document.createElement('div')
  minimapWrap.id = 'minimap-wrap'
  Object.assign(minimapWrap.style, {
    position:            'fixed',
    top:                 '20px',
    right:               '20px',
    width:               `${MINIMAP_SIZE}px`,
    height:              `${MINIMAP_SIZE}px`,
    borderRadius:        '50%',
    background:          'rgba(10,10,20,0.6)',
    backdropFilter:      'blur(8px)',
    webkitBackdropFilter:'blur(8px)',
    border:              '1px solid rgba(255,255,255,0.2)',
    boxShadow:           '0 4px 20px rgba(0,0,0,0.4)',
    overflow:            'hidden',
    pointerEvents:       'none',
    userSelect:          'none',
  })
  const minimapCanvas = document.createElement('canvas')
  minimapCanvas.width  = MINIMAP_SIZE * 2  // retina
  minimapCanvas.height = MINIMAP_SIZE * 2
  minimapCanvas.style.width  = `${MINIMAP_SIZE}px`
  minimapCanvas.style.height = `${MINIMAP_SIZE}px`
  minimapWrap.appendChild(minimapCanvas)
  hud.appendChild(minimapWrap)
  const mCtx = minimapCanvas.getContext('2d')

  // ─── Splash / Intro screen ────────────────────────────────────────────────
  const splash = document.createElement('div')
  splash.id = 'splash-screen'
  Object.assign(splash.style, {
    position:            'fixed',
    inset:               '0',
    zIndex:              '5000',
    display:             'flex',
    flexDirection:       'column',
    alignItems:          'center',
    justifyContent:      'center',
    background:          'linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(10,10,30,0.92) 100%)',
    backdropFilter:      'blur(12px)',
    webkitBackdropFilter:'blur(12px)',
    opacity:             '1',
    transition:          'opacity 0.5s ease',
    cursor:              'pointer',
  })
  splash.innerHTML = `
    <h1 style="
      margin: 0 0 8px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-size: clamp(2.4rem, 7vw, 4.5rem);
      font-weight: 800;
      letter-spacing: -0.03em;
      color: #ffffff;
      text-shadow: 0 0 30px rgba(91,141,238,0.45), 0 0 60px rgba(91,141,238,0.2);
    ">ERIC WANG</h1>
    <p style="
      margin: 0 0 48px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-size: clamp(0.9rem, 2.2vw, 1.3rem);
      color: rgba(255,255,255,0.5);
      letter-spacing: 0.12em;
      text-transform: uppercase;
    ">Interactive Portfolio</p>
    <div id="splash-cta" style="
      padding: 14px 36px;
      border-radius: 10px;
      background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.25);
      backdrop-filter: blur(4px);
      color: rgba(255,255,255,0.85);
      font-family: monospace;
      font-size: 14px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      animation: splashPulse 2s ease-in-out infinite;
    ">CLICK TO START</div>
  `

  // Inject the pulse keyframe
  const styleTag = document.createElement('style')
  styleTag.textContent = `
    @keyframes splashPulse {
      0%, 100% { opacity: 0.85; transform: scale(1); }
      50%      { opacity: 1;    transform: scale(1.04); }
    }
  `
  document.head.appendChild(styleTag)

  document.body.appendChild(splash)

  // Splash dismiss logic — resolved via a promise the caller can await
  let splashResolveFn = null
  const splashDone = new Promise(resolve => { splashResolveFn = resolve })

  function _dismissSplash() {
    splash.style.opacity = '0'
    splash.style.pointerEvents = 'none'
    splash.addEventListener('transitionend', () => {
      splash.remove()
      if (splashResolveFn) { splashResolveFn(); splashResolveFn = null }
    }, { once: true })
    // Fallback in case transitionend doesn't fire
    setTimeout(() => { if (splashResolveFn) { splashResolveFn(); splashResolveFn = null } }, 700)
  }

  splash.addEventListener('click', _dismissSplash, { once: true })
  window.addEventListener('keydown', function _splashKey() {
    window.removeEventListener('keydown', _splashKey)
    _dismissSplash()
  }, { once: true })

  // ─── Public helpers ───────────────────────────────────────────────────────

  function updateProximityPrompt(nearLocation) {
    if (nearLocation) {
      prompt.textContent = `[ E ]  Enter ${nearLocation.label}`
      prompt.style.opacity = '1'
      prompt.style.transform = 'translateX(-50%) translateY(0)'
    } else {
      prompt.style.opacity = '0'
      prompt.style.transform = 'translateX(-50%) translateY(8px)'
    }
  }

  /**
   * Update speedometer display.
   * @param {number} speed — carState.speed (0 .. ~0.18)
   */
  const MAX_SPEED = 0.18
  function updateSpeedometer(speed) {
    // Convert internal speed units to a "km/h" display value (purely cosmetic)
    const displaySpeed = Math.round((speed / MAX_SPEED) * 120)
    speedValueEl.textContent = displaySpeed
    speedBarEl.style.width = `${Math.min(100, (speed / MAX_SPEED) * 100)}%`
  }

  /**
   * Redraw the minimap canvas.
   * @param {{ x: number, z: number }} carPos — car position in world space
   * @param {number} carRotation — car heading in radians
   */
  function updateMinimap(carPos, carRotation) {
    const s  = MINIMAP_SIZE * 2 // canvas pixel size (retina)
    const cx = s / 2
    const cy = s / 2
    const r  = s / 2

    mCtx.clearRect(0, 0, s, s)

    // Clipping circle
    mCtx.save()
    mCtx.beginPath()
    mCtx.arc(cx, cy, r, 0, Math.PI * 2)
    mCtx.clip()

    // Background (already handled by CSS, but fill for canvas)
    mCtx.fillStyle = 'rgba(10,10,20,0.01)'
    mCtx.fillRect(0, 0, s, s)

    // Boundary circle (faint)
    mCtx.beginPath()
    mCtx.arc(cx, cy, r - MINIMAP_PAD * 2, 0, Math.PI * 2)
    mCtx.strokeStyle = 'rgba(255,255,255,0.12)'
    mCtx.lineWidth = 1.5
    mCtx.stroke()

    // Helper: world coords -> minimap coords
    const usable = r - MINIMAP_PAD * 2
    const scale  = usable / WORLD_HALF
    function toMinimap(wx, wz) {
      return [cx + wx * scale, cy + wz * scale]
    }

    // Draw location dots
    for (const loc of MINIMAP_LOCATIONS) {
      const [mx, mz] = toMinimap(loc.x, loc.z)
      mCtx.beginPath()
      mCtx.arc(mx, mz, 6, 0, Math.PI * 2)
      mCtx.fillStyle = loc.color
      mCtx.fill()
      // Glow
      mCtx.beginPath()
      mCtx.arc(mx, mz, 10, 0, Math.PI * 2)
      mCtx.fillStyle = loc.color + '30' // ~19% alpha via hex
      mCtx.fill()
    }

    // Draw car (triangle arrow)
    const [carMx, carMz] = toMinimap(carPos.x, carPos.z)
    mCtx.save()
    mCtx.translate(carMx, carMz)
    // Three.js rotation: 0 = looking down +Z. On the minimap, +Z is down.
    // So we negate the rotation and add PI so "forward" is up when rotation=0 …
    // Actually: rotation 0 = +Z, on canvas +Z = down, so car facing +Z should point down.
    // Let's keep it: rotate canvas by (-rotation) so car points correctly
    mCtx.rotate(-carRotation + Math.PI)
    mCtx.beginPath()
    mCtx.moveTo(0, -8)   // tip (forward)
    mCtx.lineTo(-5, 6)
    mCtx.lineTo(5, 6)
    mCtx.closePath()
    mCtx.fillStyle = '#ffffff'
    mCtx.fill()
    mCtx.strokeStyle = 'rgba(0,0,0,0.5)'
    mCtx.lineWidth = 1
    mCtx.stroke()
    mCtx.restore()

    mCtx.restore()
  }

  /**
   * Show the splash screen. Returns a Promise that resolves when the user dismisses it.
   */
  function waitForSplash() {
    return splashDone
  }

  return { updateProximityPrompt, updateSpeedometer, updateMinimap, waitForSplash }
}

// ── Private helpers ──────────────────────────────────────────────────────────

function _keyHTML(label) {
  return `<div style="
    width: 36px;
    height: 36px;
    border-radius: 6px;
    background: rgba(255,255,255,0.15);
    border: 1px solid rgba(255,255,255,0.3);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 14px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.3);
  ">${label}</div>`
}
