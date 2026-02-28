import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    target: 'esnext', // required for top-level await (Rapier WASM init)
  },
})
