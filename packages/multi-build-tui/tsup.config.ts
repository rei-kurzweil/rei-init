import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.tsx', 'src/run.ts'],
  format: ['cjs'],
  splitting: false,
  sourcemap: false,
  dts: true,
  clean: true,
  target: 'node20',
  banner: {
    js: '#!/usr/bin/env node'
  }
})
