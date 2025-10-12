import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.tsx'],
  format: ['esm'],
  dts: true,
  clean: true,
  external: ['react', 'react-dom', 'three', '@react-three/fiber'],
  jsx: 'preserve'
})
