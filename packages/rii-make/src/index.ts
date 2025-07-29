// File: rii-make/src/index.ts

import { select, confirm, input } from '@inquirer/prompts'
import { initAppProject } from './app/index.js'
import { initPackageProject, createPackageByType } from './package/index.js'
import chalk from 'chalk'
import path from 'path'
import fs from 'fs'
import { findMonorepoRoot } from './util.js'


const mono_repo_root = await findMonorepoRoot();

console.log(chalk.magentaBright(`
╭────────────────────────────╮ ✿
│  rii-make  monorepo tool   │
│                            │
╰────────────────────────────╯
`))

const kind = await select({
  message: 'What would you like to create?',
  choices: [
    { name: 'App (subdomain.domain.ext)', value: 'app' },
    { name: 'Package (reusable library)', value: 'pkg' }
  ]
})

if (kind === 'app') {
  const appName = await initAppProject();
  console.log(chalk.greenBright(`🎉 App '${appName}' created in apps/${appName}`))
  
  // Ask about sub-packages after creating the main app
  const wantSubPackages = await confirm({
    message: 'Would you like to create sub-packages for this app?',
    default: false
  })
  
  if (wantSubPackages) {
    const appDir = path.resolve(mono_repo_root, 'apps', appName)

    if (!fs.existsSync(appDir)) {
      console.log(chalk.red(`App directory ${appDir} not found. Skipping sub-packages.`))
    } else {
      await createSubPackagesForApp(appDir, appName)
    }
  }
  
} else if (kind === 'pkg') {
  const packageName = await initPackageProject();
  
  // Ask about demo apps after creating the package
  const wantDemoApps = await confirm({
    message: 'Would you like to create demo apps for this package?',
    default: true
  })
  
  if (wantDemoApps) {
    const packageDir = path.resolve(mono_repo_root, 'packages', packageName)
    // Package directory
    // /home/plush/dev/rii-init/apps/packages/rii-design-3d not found. Skipping demo apps.
    // /home/plush/dev/rii-init/apps/  apparently is cwd()
    // but the directory that's used should be the mono repo root
    // `${monoRepoRoot}/packages/${packageName}`
    // and then
    // `${monoRepoRoot}/packages/${packageName}/apps` is the package_apps_dir which we should pass to createDemoAppsForPackage
    // 

    if (!fs.existsSync(packageDir)) {
      console.log(chalk.red(`Package directory ${packageDir} not found. Skipping demo apps.`))
    } else {
      await createDemoAppsForPackage(packageDir, packageName)
    }
  }
}

async function createSubPackagesForApp(appDir: string, appName: string) {
  const packagesDir = path.join(appDir, 'packages')
  
  // Ensure packages directory exists
  if (!fs.existsSync(packagesDir)) {
    fs.mkdirSync(packagesDir, { recursive: true })
  }
  
  let createAnother = true
  while (createAnother) {
    console.log(chalk.blueBright(`\nCreating sub-package for app ${appName}`))
    
    const subPackageName = await input({
      message: 'Sub-package name?',
      validate: (input) => input.length > 0 || 'Sub-package name is required'
    })
    
    const subPackageType = await select({
      message: 'What type of sub-package?',
      choices: [
        { name: 'React SPA', value: 'react-spa' },
        { name: 'React SPA with Three.js (R3F)', value: 'react-spa-r3f' },
        { name: 'React SPA with Three.js + XR', value: 'react-spa-r3f-xr' },
        { name: 'TypeScript Library', value: 'ts-lib' }
      ]
    })
    
    // Create sub-package in app's packages directory
    const targetDir = path.join(packagesDir, subPackageName)
    await createPackageByType(targetDir, subPackageName, subPackageType, true)
    
    createAnother = await confirm({
      message: 'Would you like to create another sub-package?',
      default: false
    })
  }
}

async function createDemoAppsForPackage(
    packageDir: string /** already contains packageName */, 
    packageName: string
  ) {
  
  const appsDir = path.join(packageDir, 'apps')
  
  // Ensure apps directory exists
  if (!fs.existsSync(appsDir)) {
    fs.mkdirSync(appsDir, { recursive: true })
  }
  
  let createAnother = true
  while (createAnother) {
    console.log(chalk.blueBright(`\nCreating demo app for package ${packageName}`))
    
    const demoName = await input({
      message: 'Demo app name?',
      default: 'demo',
      validate: (input) => input.length > 0 || 'Demo app name is required'
    })
    
    const demoType = await select({
      message: 'What type of demo app?',
      choices: [
        { name: 'React SPA', value: 'react-spa' },
        { name: 'React SPA with Three.js (R3F)', value: 'react-spa-r3f' },
        { name: 'React SPA with Three.js + XR', value: 'react-spa-r3f-xr' }
      ]
    })
    
    // Create demo app in package's apps directory
    const targetDir = path.join(appsDir, demoName)
    await createPackageByType(targetDir, demoName, demoType, false)
    
    createAnother = await confirm({
      message: 'Would you like to create another demo app?',
      default: false
    })
  }
}

console.log(chalk.greenBright(`
🌸 すべてうまくいきました！
✨ great success >w<
`))
