import { defineConfig } from 'vite'

export default defineConfig({
  base: '/personal-site/',
  build: {
    target: 'esnext', // required for top-level await (Rapier WASM init)
  },
})
