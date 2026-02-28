export function createInput() {
  const keys = {
    forward:  false,
    backward: false,
    left:     false,
    right:    false,
  }

  function onKeyDown(e) {
    // Prevent arrow keys from scrolling the page
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
      e.preventDefault()
    }
    switch (e.code) {
      case 'KeyW': case 'ArrowUp':    keys.forward  = true; break
      case 'KeyS': case 'ArrowDown':  keys.backward = true; break
      case 'KeyA': case 'ArrowLeft':  keys.left     = true; break
      case 'KeyD': case 'ArrowRight': keys.right    = true; break
    }
  }

  function onKeyUp(e) {
    switch (e.code) {
      case 'KeyW': case 'ArrowUp':    keys.forward  = false; break
      case 'KeyS': case 'ArrowDown':  keys.backward = false; break
      case 'KeyA': case 'ArrowLeft':  keys.left     = false; break
      case 'KeyD': case 'ArrowRight': keys.right    = false; break
    }
  }

  window.addEventListener('keydown', onKeyDown)
  window.addEventListener('keyup', onKeyUp)

  // keys is mutated in-place — callers hold a reference, always current
  return { keys }
}
