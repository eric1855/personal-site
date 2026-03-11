export function createUI() {
  const hud = document.getElementById('hud')

  hud.innerHTML = `
    <div style="
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

  // Proximity prompt — shown when car is near a location
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

  return { updateProximityPrompt }
}

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
