'use client'
import { useEffect, useRef } from 'react'

export interface CarControls {
  forward: boolean
  backward: boolean
  left: boolean
  right: boolean
}

export function useCarControls(): React.RefObject<CarControls> {
  const keys = useRef<CarControls>({
    forward: false,
    backward: false,
    left: false,
    right: false,
  })

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // Prevent arrow keys from scrolling the page
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        e.preventDefault()
      }
      switch (e.code) {
        case 'KeyW': case 'ArrowUp':    keys.current.forward  = true;  break
        case 'KeyS': case 'ArrowDown':  keys.current.backward = true;  break
        case 'KeyA': case 'ArrowLeft':  keys.current.left     = true;  break
        case 'KeyD': case 'ArrowRight': keys.current.right    = true;  break
      }
    }
    const onKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW': case 'ArrowUp':    keys.current.forward  = false; break
        case 'KeyS': case 'ArrowDown':  keys.current.backward = false; break
        case 'KeyA': case 'ArrowLeft':  keys.current.left     = false; break
        case 'KeyD': case 'ArrowRight': keys.current.right    = false; break
      }
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  return keys
}
