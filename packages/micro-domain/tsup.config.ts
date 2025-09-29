import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'db/schema': 'src/db/schema.ts',
  },
  format: ['esm'],
  dts: true,
  clean: true,
  external: ['drizzle-orm'], // prevent embedding its code (keeps single instance)
})