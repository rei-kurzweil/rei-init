# Meow Source Maps Configuration

The meow app is now configured to generate source maps for all build outputs.

## Configuration

Source maps are enabled in `vite.config.ts` with:

```typescript
build: {
  sourcemap: true,
  // ... other build options
}
```

## Generated Files

When you run `npm run build`, the following source map files are generated in the `dist/` directory:

- `meow.js.map` - Source map for the main library entry
- `meow-spa.js.map` - Source map for the SPA entry
- `meow-spa-auto.js.map` - Source map for the auto-mounting SPA
- `App-[hash].js.map` - Source map for the main App chunk

## Benefits

- **Debugging**: Allows debugging the original TypeScript/TSX source code in browser dev tools
- **Error tracking**: Stack traces will show original source locations
- **Development**: Easier to trace issues back to source code during development and production

## Usage

Source maps are automatically served alongside the JavaScript files. Modern browsers will automatically load and use them when:

1. Developer tools are open
2. Debugging JavaScript code
3. Viewing stack traces for errors

The source maps include:
- Original source file paths
- Full source content 
- Variable name mappings
- Line/column mappings

## File Size Impact

Source maps add approximately:
- `meow.js`: +0.09 kB
- `meow-spa.js`: +0.97 kB  
- `meow-spa-auto.js`: +3.34 kB
- `App-[hash].js`: +750.43 kB

These files are only loaded by browsers when developer tools are open, so they don't impact runtime performance for end users.