import { execSync } from 'child_process'
import fs from 'fs-extra'
import path from 'path'

export async function findMonorepoRoot(start = process.cwd()): Promise<string> {
    let dir = start

    while (true) {
        const pkgPath = path.join(dir, 'package.json');
        const appsDir = path.join(dir, 'apps');
        const pkgsDir = path.join(dir, 'packages');

        const hasPkgJson  = await fs.pathExists(pkgPath);
        const hasApps     = await fs.pathExists(appsDir);
        const hasPackages = await fs.pathExists(pkgsDir);

        if (hasPkgJson && hasApps && hasPackages) {
            const pkg = await fs.readJSON(pkgPath)
            if (pkg.private && pkg.workspaces) {
                return dir
            }
        }

        const parent = path.dirname(dir)
        if (parent === dir) break // Hit filesystem root
        dir = parent
    }

    throw new Error('Monorepo root not found: must contain package.json + apps/ + packages/')
}


/**
 * Build the React app and copy its output into the associated Wrangler public folder.
 * @param reactPath Path to the React app (e.g., 'apps/rei-init.net/react')
 * @param wranglerPath Path to the Wrangler folder (e.g., 'apps/rei-init.net/wrangler')
 */
export async function buildReactAndCopy(reactPath: string, wranglerPath: string) {
    const distPath = path.resolve(reactPath, 'dist')
    const publicPath = path.resolve(wranglerPath, 'public')

    console.log(`[🔨] Building React app in ${reactPath}...`)
    execSync('pnpm run build', { cwd: reactPath, stdio: 'inherit' })

    console.log(`[📦] Copying from ${distPath} to ${publicPath}...`)
    await fs.ensureDir(publicPath)
    await fs.copy(distPath, publicPath)

    console.log(`[✅] Done! React assets now in ${wranglerPath}/public`)
}