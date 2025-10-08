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
        cats: path.resolve(__dirname, 'src/lib/index.ts'),
        'cats-spa': path.resolve(__dirname, 'src/spa/index.tsx'),
        'cats-spa-auto': path.resolve(__dirname, 'src/spa/auto-mount.tsx')
      },
      name: 'CatsApp',
      formats: ['es']
    },
    rollupOptions: {
      // Externalize React and ReactDOM - they're provided by import map
      external: ['react', 'react-dom', 'react-dom/client'],
      output: {
        // Ensure proper chunking for better loading
        manualChunks: undefined
      }
    }
  }
})