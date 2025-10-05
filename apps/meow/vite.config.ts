import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Fix "process is not defined" error in browser
    'process.env': {},
    'process.env.NODE_ENV': JSON.stringify('production'),
    global: 'globalThis',
  },
  build: {
    lib: {
      entry: {
        'meow-spa': path.resolve(__dirname, 'src/spa/index.tsx'),
        'meow-spa-auto': path.resolve(__dirname, 'src/spa/auto-mount.tsx'),
        meow: path.resolve(__dirname, 'src/lib/index.ts')
      },
      name: 'MeowApp',
      formats: ['es']
    },
    rollupOptions: {
      // Bundle React and ReactDOM for self-contained SPA modules
      // external: ['react', 'react-dom'], // Commented out - we want everything bundled
      output: {
        // Ensure proper chunking for better loading
        manualChunks: undefined
      }
    }
  }
})