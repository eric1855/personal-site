/**
 * Location content popup — glassmorphic panel with scale-up/down animations
 * and frosted background overlay.
 */

export function createPopup(onClose) {
  // ── Build DOM ──────────────────────────────────────────────────────────────

  const overlay = document.createElement('div')
  overlay.id = 'location-overlay'
  Object.assign(overlay.style, {
    position:             'fixed',
    inset:                '0',
    display:              'flex',
    alignItems:           'center',
    justifyContent:       'center',
    background:           'rgba(0,0,0,0.55)',
    backdropFilter:       'blur(6px)',
    webkitBackdropFilter: 'blur(6px)',
    zIndex:               '1000',
    opacity:              '0',
    pointerEvents:        'none',
    transition:           'opacity 0.25s ease, backdrop-filter 0.25s ease',
  })

  const panel = document.createElement('div')
  panel.id = 'location-panel'
  Object.assign(panel.style, {
    width:                'min(600px, 80vw)',
    height:               'min(500px, 70vh)',
    display:              'flex',
    flexDirection:        'column',
    background:           'rgba(10,10,20,0.82)',
    backdropFilter:       'blur(16px)',
    webkitBackdropFilter: 'blur(16px)',
    border:               '1px solid rgba(255,255,255,0.18)',
    borderRadius:         '16px',
    boxShadow:            '0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)',
    overflow:             'hidden',
    fontFamily:           'Arial, sans-serif',
    color:                '#ffffff',
    transform:            'scale(0.85) translateY(16px)',
    opacity:              '0',
    transition:           'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), opacity 0.25s ease',
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
  closeBtn.textContent = '\u2715'
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

    // Show overlay
    overlay.style.opacity = '1'
    overlay.style.pointerEvents = 'auto'

    // Trigger panel scale-up animation (need a frame for the browser to register the initial state)
    // Reset to starting state
    panel.style.transform = 'scale(0.85) translateY(16px)'
    panel.style.opacity   = '0'
    // Force reflow then animate to final state
    void panel.offsetHeight
    panel.style.transform = 'scale(1) translateY(0)'
    panel.style.opacity   = '1'
  }

  function _close() {
    // Animate panel out (scale down + fade)
    panel.style.transform = 'scale(0.9) translateY(12px)'
    panel.style.opacity   = '0'

    // Fade overlay out
    overlay.style.opacity = '0'
    overlay.style.pointerEvents = 'none'
  }

  return { open, close: _close }
}
