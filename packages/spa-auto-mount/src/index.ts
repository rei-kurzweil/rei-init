import { createRoot } from 'react-dom/client'
import { createElement } from 'react'
import type { ComponentType } from 'react'

/**
 * Configuration options for auto-mounting
 */
export interface AutoMountOptions {
  /** The app prefix used in data attributes (e.g., 'meow', 'cats') */
  appPrefix: string
  /** The React component to mount */
  component: ComponentType<any>
  /** Optional CSS to import when mounting */
  cssImport?: () => void
}

/**
 * Creates an auto-mount function for a React SPA
 * 
 * @param options Configuration options for auto-mounting
 * @returns A function that will auto-mount the component when called
 * 
 * @example
 * ```typescript
 * import { createAutoMountFunction } from '@rei-init/spa-auto-mount'
 * import App from './App'
 * import './index.css'
 * 
 * const autoMount = createAutoMountFunction({
 *   appPrefix: 'meow',
 *   component: App,
 *   cssImport: () => import('./index.css')
 * })
 * 
 * // Auto-mount on script load
 * autoMount()
 * 
 * // Also mount on DOM ready if script loads before DOM
 * if (document.readyState === 'loading') {
 *   document.addEventListener('DOMContentLoaded', autoMount)
 * }
 * ```
 */
export function createAutoMountFunction(options: AutoMountOptions) {
  const { appPrefix, component: AppComponent, cssImport } = options

  return function autoMount() {
    // Look for containers with data-app-{appPrefix} attribute that haven't been mounted yet
    const selector = `[data-app-${appPrefix}]:not([data-app-${appPrefix}-mounted])`
    
    // Find the first container that matches
    const container = document.querySelector(selector)
    
    if (!container || !(container instanceof HTMLElement)) {
      return // No suitable container found
    }
    
    // Mark as mounted to prevent double-mounting
    container.setAttribute(`data-app-${appPrefix}-mounted`, 'true')

    // Extract props from data attributes
    const props: Record<string, unknown> = {}

    // Convert data-{appPrefix}-* attributes to props
    Object.keys(container.dataset).forEach(key => {
      if (key.startsWith(appPrefix)) {
        const propKey = key.replace(new RegExp(`^${appPrefix}`), '').replace(/([A-Z])/g, (_, letter) =>
          letter.toLowerCase()
        )
        let value: unknown = container.dataset[key]

        // Parse special values
        if (value === 'true') value = true
        else if (value === 'false') value = false
        else if (value && !isNaN(Number(value))) value = Number(value)

        if (propKey) props[propKey] = value
      }
    })

    // Import CSS if provided
    if (cssImport) {
      cssImport()
    }

    // Clear loading content and mount React app
    container.innerHTML = ''
    const root = createRoot(container)
    root.render(createElement(AppComponent, props))
  }
}

/**
 * Utility function to run auto-mount immediately and on DOM ready
 * 
 * @param autoMountFn The auto-mount function to run
 * 
 * @example
 * ```typescript
 * const autoMount = createAutoMountFunction({ appPrefix: 'meow', component: App })
 * runAutoMount(autoMount)
 * ```
 */
export function runAutoMount(autoMountFn: () => void) {
  // Run immediately
  autoMountFn()
  
  // Also run on DOM ready if script loads before DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoMountFn)
  }
}