import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  target: 'es2020',
  platform: 'browser',
  external: ['react', 'react-dom'],
  // Create a browser-compatible bundle
  outExtension() {
    return {
      js: '.js'
    }
  }
})