import type { Context } from "hono";

export async function HandleSpaAssets(c: Context) {
    const url = new URL(c.req.url);
    const assetPath = url.pathname.replace(/^\//, ''); // Remove leading slash
    const fileExtension = assetPath.split('.').pop()?.toLowerCase();

    // MIME type mapping for SPA assets
    const mimeTypes: Record<string, string> = {
        'js': 'text/javascript; charset=utf-8',
        'css': 'text/css; charset=utf-8',
        'json': 'application/json; charset=utf-8',
        'map': 'application/json; charset=utf-8', // Source maps
        'svg': 'image/svg+xml',
        'png': 'image/png',
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'gif': 'image/gif',
        'webp': 'image/webp',
        'ico': 'image/x-icon',
        'woff': 'font/woff',
        'woff2': 'font/woff2',
        'ttf': 'font/ttf',
        'eot': 'application/vnd.ms-fontobject'
    };

    const contentType = mimeTypes[fileExtension || ''] || 'application/octet-stream';

    try {
        const asset = await c.env.ASSETS.fetch(new URL(assetPath, 'https://placeholder.com'));
        if (asset.ok) {
            const content = await asset.arrayBuffer();
            return new Response(content, {
                headers: {
                    'Content-Type': contentType,
                    'Cache-Control': 'public, max-age=31536000', // 1 year cache for SPA assets
                    'Cross-Origin-Resource-Policy': 'cross-origin', // Allow cross-origin loading
                },
            });
        }
    } catch (error) {
        console.error('Error serving SPA asset:', assetPath, error);
    }

    return c.text('Not Found', 404);
}