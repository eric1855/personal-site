/**
 * Physics bridge — main-thread interface to the physics Web Worker.
 *
 * Sends input state, receives car transforms.
 * Exposes a reactive `carState` that Three.js rendering reads each frame.
 */

import * as THREE from 'three'

const GROUND_Y = 0.3

export function createPhysicsBridge() {
  // Spawn the worker (Vite handles ?worker URL transform)
  const worker = new Worker(
    new URL('./physicsWorker.js', import.meta.url),
    { type: 'module' }
  )

  // Car state — main thread reads this to position the mesh
  const carState = {
    position: new THREE.Vector3(0, GROUND_Y, 0),
    quaternion: new THREE.Quaternion(),
    rotation: 0,    // Y heading (radians)
    speed: 0,       // abs forward speed
    forwardSpeed: 0, // signed forward speed
    steer: 0,       // current visual steer angle
  }

  let ready = false
  const readyPromise = new Promise((resolve) => {
    worker.onmessage = (e) => {
      const msg = e.data
      switch (msg.type) {
        case 'ready':
          ready = true
          resolve()
          break
        case 'frame':
          _applyFrame(msg.car)
          break
      }
    }
  })

  function _applyFrame(car) {
    carState.position.set(car.px, car.py, car.pz)
    carState.quaternion.set(car.qx, car.qy, car.qz, car.qw)
    carState.rotation = car.heading
    carState.speed = car.speed
    carState.forwardSpeed = car.forwardSpeed
    carState.steer = car.steer
  }

  // Send init to create the world
  worker.postMessage({ type: 'init' })

  // Send current keys to the worker each frame
  function sendInput(keys) {
    if (!ready) return
    worker.postMessage({
      type: 'input',
      keys: {
        forward: keys.forward,
        backward: keys.backward,
        left: keys.left,
        right: keys.right,
      }
    })
  }

  function pause() {
    worker.postMessage({ type: 'pause' })
  }

  function resume() {
    worker.postMessage({ type: 'resume' })
  }

  return {
    carState,
    sendInput,
    pause,
    resume,
    ready: readyPromise,
  }
}
