import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['esm'], // add 'cjs' if needed
    dts: true,
    sourcemap: true,
    clean: true,
});