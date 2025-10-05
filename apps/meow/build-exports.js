// Simple build script to generate proper exports
import fs from 'fs'
import path from 'path'

const distDir = 'dist'

// Create proper index files for the different entry points
const meowIndex = `export { MeowApp } from './meow.js'
export type { MeowAppProps } from './meow.js'
`

const spaIndex = `export { mountMeowSPA, MeowApp } from './spa.js'
export type { MountOptions } from './spa.js'
`

fs.writeFileSync(path.join(distDir, 'index.js'), meowIndex)
fs.writeFileSync(path.join(distDir, 'index.d.ts'), meowIndex.replace(/\.js'/g, "'"))

console.log('Build exports generated successfully!')