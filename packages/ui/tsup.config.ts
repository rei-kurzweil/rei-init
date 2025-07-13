import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['esm'],
    dts: true,
    sourcemap: true,
    clean: true,
    outExtension({ format }) {
        return {
            js: format === 'esm' ? '.mjs' : '.js'
        }
    }
});