// File: rii-make/src/index.ts

import { select, confirm, input } from '@inquirer/prompts'
import { initAppProject } from './app/index.js'
import { initPackageProject, createPackageByType, PackageType } from './package/index.js'
import chalk from 'chalk'
import path from 'path'
import fs from 'fs'
import { findMonorepoRoot } from './util.js'
import { AppType } from './app/app-type.js'


const mono_repo_root = await findMonorepoRoot();

console.log(chalk.magentaBright(`
╭───────────────────────────╮✿
│ rei-init :: monorepo tool │
│                           │
╰───────────────────────────╯
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

  const subPackageChoices: { name: string; value: PackageType }[] = [
    { name: 'TypeScript Library', value: 'ts-lib' },
    { name: 'TypeScript Library (react)', value: 'react-lib' },
    { name: 'TypeScript Library (react-three/fiber peer dep)', value: 'react-three/fiber-lib' },
    { name: 'TypeScript Library (react-three/drei peer dep)', value: 'react-three/drei-lib' },
    { name: 'TypeScript Library (react-three/drei + XR peer dep)', value: 'react-three/drei-and-xr-lib' },
    { name: 'Utility Package', value: 'util' },
    { name: 'Drizzle D1 Schema + Migration Runner CLI', value: 'database-schema-and-migration-runner-cli-drizzle-d1-package' },
    { name: 'Blender Python Plugin', value: 'python-blender-plugin' }
  ];
  

  let createAnother = true
  while (createAnother) {
    console.log(chalk.blueBright(`\nCreating sub-package for app ${appName}`))
    
    const subPackageName = await input({
      message: 'Sub-package name?',
      validate: (input) => input.length > 0 || 'Sub-package name is required'
    })
    
    const subPackageType = await select({
      message: 'What type of sub-package?',
      choices: subPackageChoices
    })
    
    // Create sub-package in app's packages directory
    const targetDir = path.join(packagesDir, subPackageName)
    await createPackageByType(targetDir, subPackageName, subPackageType)
    
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

  const demoTypeChoices: { name: string; value: AppType }[] = [
    { name: 'React SPA',                    value: AppType.ReactSPA      },
    { name: 'React SPA with Three.js (R3F)',value: AppType.ReactSPAR3F   },
    { name: 'React SPA with Three.js + XR', value: AppType.ReactSPAR3FXR }
  ];
  
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
      choices: demoTypeChoices
    })
    
    // Create demo app in package's apps directory
    const targetDir = path.join(appsDir, demoName)
    await createPackageByType(targetDir, demoName, demoType)
    
    createAnother = await confirm({
      message: 'Would you like to create another demo app?',
      default: false
    })
  }
}

console.log(chalk.greenBright(`
  🌸
✨ great success >w<
`));