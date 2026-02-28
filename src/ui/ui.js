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
