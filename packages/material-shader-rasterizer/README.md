# @rei-init/material-shader-rasterizer

React Three Fiber material that rasterizes a fragment shader to a texture via an offscreen render target, then applies it as a MeshBasicMaterial.

## Install (workspace)

Use pnpm workspace filter to install only this package's dev deps:

```bash
pnpm -w --filter @rei-init/material-shader-rasterizer install
```

Build just this package:

```bash
pnpm -w --filter @rei-init/material-shader-rasterizer run build
```

Note: prefer `pnpm install` (without `run`) for dependency installation. `run` is for scripts (e.g., `run build`).

## Peer dependencies

- react >= 19
- react-dom >= 19
- three ^0.160.0
- @react-three/fiber ^9.3.0 (matches apps/cats)

## Usage

Add the dependency in the app that consumes it (example):

```jsonc
// apps/cats/package.json
{
  "dependencies": {
    "@rei-init/material-shader-rasterizer": "workspace:*"
  }
}
```

Then use it in your R3F scene:

```tsx
import ShaderRasterizerMaterial from '@rei-init/material-shader-rasterizer'

const fragmentShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vec2 uv = vUv;
    gl_FragColor = vec4(uv, 0.0, 1.0);
  }
`

export function Quad() {
  return (
    <mesh>
      <planeGeometry args={[1, 1]} />
      <ShaderRasterizerMaterial fragmentShader={fragmentShader} RT_RESOLUTION={1024} />
    </mesh>
  )
}
```

## Notes
- The shader is baked once on mount and when `fragmentShader` or `RT_RESOLUTION` changes.
- The component returns a `<meshBasicMaterial>` using the baked texture.

Exports
- Default export: `ShaderRasterizerMaterial`
- Named export also available: `{ ShaderRasterizerMaterial }`
