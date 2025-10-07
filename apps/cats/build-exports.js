// Build-time script to generate proper TypeScript declarations
import { writeFileSync } from 'fs'

const mainExport = `// Auto-generated TypeScript declarations
export { CatsApp as default } from './lib/index';
export type { CatsAppProps } from './lib/index';
`

const spaExport = `// Auto-generated TypeScript declarations  
export { mountCatsSPA } from './spa/index';
export { default } from './spa/index';
`

try {
  writeFileSync('dist/cats.d.ts', mainExport)
  writeFileSync('dist/cats-spa.d.ts', spaExport)
  console.log('✅ TypeScript declarations generated')
} catch (error) {
  console.error('❌ Failed to generate declarations:', error)
  process.exit(1)
}