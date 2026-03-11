import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    target: 'esnext', // required for top-level await (Ammo WASM init)
  },
  optimizeDeps: {
    include: ['ammo.js'], // pre-bundle ammo.js for faster dev server startup
  },
})
