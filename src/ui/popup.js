export function createPopup(onClose) {
  // ── Build DOM ──────────────────────────────────────────────────────────────

  const overlay = document.createElement('div')
  overlay.id = 'location-overlay'
  Object.assign(overlay.style, {
    position:        'fixed',
    inset:           '0',
    display:         'flex',
    alignItems:      'center',
    justifyContent:  'center',
    background:      'rgba(0,0,0,0.55)',
    backdropFilter:  'blur(3px)',
    webkitBackdropFilter: 'blur(3px)',
    zIndex:          '1000',
    opacity:         '0',
    pointerEvents:   'none',
    transition:      'opacity 0.18s ease',
  })

  const panel = document.createElement('div')
  panel.id = 'location-panel'
  Object.assign(panel.style, {
    width:           'min(600px, 80vw)',
    height:          'min(500px, 70vh)',
    display:         'flex',
    flexDirection:   'column',
    background:      'rgba(10,10,20,0.82)',
    backdropFilter:  'blur(16px)',
    webkitBackdropFilter: 'blur(16px)',
    border:          '1px solid rgba(255,255,255,0.18)',
    borderRadius:    '16px',
    boxShadow:       '0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)',
    overflow:        'hidden',
    fontFamily:      'Arial, sans-serif',
    color:           '#ffffff',
    transform:       'translateY(12px)',
    transition:      'transform 0.18s ease',
  })

  // Header
  const header = document.createElement('div')
  Object.assign(header.style, {
    display:       'flex',
    alignItems:    'center',
    gap:           '12px',
    padding:       '20px 24px 16px',
    borderBottom:  '1px solid rgba(255,255,255,0.1)',
    flexShrink:    '0',
  })

  const accent = document.createElement('div')
  Object.assign(accent.style, {
    width:        '4px',
    height:       '28px',
    borderRadius: '2px',
    flexShrink:   '0',
    background:   '#fff',
  })

  const title = document.createElement('h2')
  Object.assign(title.style, {
    flex:          '1',
    margin:        '0',
    fontSize:      '1.375rem',
    fontWeight:    '700',
    letterSpacing: '-0.02em',
    color:         '#ffffff',
  })

  const closeBtn = document.createElement('button')
  closeBtn.textContent = '✕'
  Object.assign(closeBtn.style, {
    width:        '32px',
    height:       '32px',
    borderRadius: '8px',
    border:       '1px solid rgba(255,255,255,0.2)',
    background:   'rgba(255,255,255,0.08)',
    color:        'rgba(255,255,255,0.7)',
    fontSize:     '14px',
    cursor:       'pointer',
    display:      'flex',
    alignItems:   'center',
    justifyContent: 'center',
    transition:   'background 0.12s ease, color 0.12s ease',
    flexShrink:   '0',
  })
  closeBtn.addEventListener('mouseover', () => {
    closeBtn.style.background = 'rgba(255,255,255,0.18)'
    closeBtn.style.color = '#fff'
  })
  closeBtn.addEventListener('mouseout', () => {
    closeBtn.style.background = 'rgba(255,255,255,0.08)'
    closeBtn.style.color = 'rgba(255,255,255,0.7)'
  })
  closeBtn.addEventListener('click', () => { _close(); onClose() })

  header.append(accent, title, closeBtn)

  // Scrollable body
  const body = document.createElement('div')
  Object.assign(body.style, {
    flex:         '1',
    overflowY:    'auto',
    padding:      '24px',
    fontSize:     '0.9375rem',
    lineHeight:   '1.65',
    color:        'rgba(255,255,255,0.82)',
    scrollbarWidth: 'thin',
    scrollbarColor: 'rgba(255,255,255,0.2) transparent',
  })

  // Footer
  const footer = document.createElement('div')
  Object.assign(footer.style, {
    flexShrink:    '0',
    padding:       '12px 24px',
    borderTop:     '1px solid rgba(255,255,255,0.08)',
    fontFamily:    'monospace',
    fontSize:      '12px',
    color:         'rgba(255,255,255,0.38)',
    letterSpacing: '0.08em',
    textAlign:     'center',
  })
  footer.innerHTML = `Press <kbd style="display:inline-block;padding:1px 6px;border-radius:4px;border:1px solid rgba(255,255,255,0.25);background:rgba(255,255,255,0.1);font-family:monospace;font-size:11px;">Esc</kbd> to close and resume driving`

  panel.append(header, body, footer)
  overlay.appendChild(panel)
  document.body.appendChild(overlay)

  // ── API ────────────────────────────────────────────────────────────────────

  function open(location) {
    accent.style.background = location.color
    title.textContent = location.label
    body.textContent = ''
    const frag = document.createRange().createContextualFragment(location.content)
    body.appendChild(frag)
    body.scrollTop = 0
    overlay.style.opacity = '1'
    overlay.style.pointerEvents = 'auto'
    panel.style.transform = 'translateY(0)'
  }

  function _close() {
    overlay.style.opacity = '0'
    overlay.style.pointerEvents = 'none'
    panel.style.transform = 'translateY(12px)'
  }

  return { open, close: _close }
}
