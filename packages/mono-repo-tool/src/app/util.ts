import fs from 'fs-extra'
import path from 'path'
import { AppPresetType } from './app-type';

export async function ensurePackagesDirectory(appDirPath: string): Promise<void> {
    // Apps always go in apps/ and have app/ + packages/ structure
    const packagesDir = path.join(appDirPath, 'packages');
    await fs.ensureDir(packagesDir)
}

export async function createReadMe(preset: AppPresetType, appName: string, appDirPath: string): Promise<void> {
    const readmeContent = `# ${appName}
This is the ${appName} application.

## Structure

- \`app/\` - Main application (${preset})
- \`packages/\` - Sub-packages for this app

## Development

See the main app in the \`app/\` directory for development instructions.
`
    await fs.writeFile(path.join(appDirPath, 'README.md'), readmeContent)
}