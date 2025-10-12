const RT_RESOLUTION = 1024;
const rt = new THREE.WebGLRenderTarget(RT_RESOLUTION, RT_RESOLUTION);

try {
      const w = RT_RESOLUTION
      const h = RT_RESOLUTION
      const pixels = new Uint8Array(w * h * 4)
      // read while the RT is still bound
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(gl as any).readRenderTargetPixels(rt, 0, 0, w, h, pixels)

      if (typeof document !== 'undefined') {
        const canvas = document.createElement('canvas')
        canvas.width = w
        canvas.height = h
        const ctx = canvas.getContext('2d')!
        const imageData = ctx.createImageData(w, h)
        // Flip Y: WebGL origin is bottom-left, canvas is top-left
        const rowSize = w * 4
        for (let y = 0; y < h; y++) {
          const src = (h - 1 - y) * rowSize
          const dst = y * rowSize
          imageData.data.set(pixels.subarray(src, src + rowSize), dst)
        }
        ctx.putImageData(imageData, 0, 0)

        let img = document.getElementById('shader-rasterizer-preview') as HTMLImageElement | null
        if (!img) {
          img = document.createElement('img')
          img.id = 'shader-rasterizer-preview'
          img.style.position = 'fixed'
          img.style.right = '8px'
          img.style.bottom = '8px'
          img.style.width = '256px'
          img.style.height = '256px'
          img.style.zIndex = '9999'
          img.style.border = '1px solid #999'
          img.style.background = '#222'
          img.style.imageRendering = 'pixelated'
          document.body.appendChild(img)
        }
        img.src = canvas.toDataURL('image/png')
      }
    } catch (err) {
      console.warn('ShaderRasterizerMaterial: failed to read/preview RT', err)
    }