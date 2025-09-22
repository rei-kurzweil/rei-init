import fs from "fs-extra";
import path from "path";
import { execa } from "execa";

/**
 * Add peerDependencies to a package.json in the specified directory.
 * - Installs them as devDependencies so the lib can build/test.
 * - Ensures they exist in peerDependencies.
 * - Removes them from dependencies if present.
 */
export async function addPeerDeps(
    pkgs: string[],
    options?: {
        targetDir?: string,
        versions?: Record<string, string>
    }
) {
    const { targetDir, versions } = options || {
        targetDir: process.cwd(), versions: {}
    };

    // 1. Install as devDependencies
    await execa("pnpm", ["add", ...pkgs, "-D"],
        { 
            cwd: targetDir || process.cwd() 
        }
    );

    // 2. Load package.json
    const pkgJsonPath = path.join(targetDir, "package.json");
    const pkgJson = await fs.readJson(pkgJsonPath);

    if (!pkgJson.peerDependencies) pkgJson.peerDependencies = {};

    // 3. For each package
    pkgs.forEach((dep) => {
        // Get version (prefer explicit versions param → fallback to devDeps version)
        const installedVersion =
            versions?.[dep] || pkgJson.devDependencies?.[dep] || "*";

        // Add/update in peerDependencies
        pkgJson.peerDependencies[dep] = installedVersion.replace(
            /^[^0-9]*/,
            "^"
        );

        // Ensure it's NOT in dependencies
        if (pkgJson.dependencies?.[dep]) {
            delete pkgJson.dependencies[dep];
        }
    });

    // 4. Write back package.json
    await fs.writeJson(pkgJsonPath, pkgJson, { spaces: 2 });
}
