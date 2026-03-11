// Screen-edge flash on collision — red/white vignette that fades quickly

export function createCollisionFlash() {
  const el = document.createElement('div')
  el.id = 'collision-flash'
  Object.assign(el.style, {
    position:       'fixed',
    inset:          '0',
    pointerEvents:  'none',
    zIndex:         '999',
    opacity:        '0',
    transition:     'opacity 0.08s ease-out',
    background:     'radial-gradient(ellipse at center, transparent 55%, rgba(255,60,40,0.35) 100%)',
  })
  document.body.appendChild(el)

  let timer = null

  function flash() {
    // Immediately show, then fade out
    el.style.transition = 'none'
    el.style.opacity = '1'
    // Force reflow so the transition reset takes effect
    void el.offsetWidth
    el.style.transition = 'opacity 0.35s ease-out'
    el.style.opacity = '0'

    // Clean up any pending timer
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => { timer = null }, 400)
  }

  return { flash }
}
