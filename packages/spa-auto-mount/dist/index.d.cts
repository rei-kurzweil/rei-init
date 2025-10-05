import { ComponentType } from 'react';

/**
 * Configuration options for auto-mounting
 */
interface AutoMountOptions {
    /** The app prefix used in data attributes (e.g., 'meow', 'cats') */
    appPrefix: string;
    /** The React component to mount */
    component: ComponentType<any>;
    /** Optional CSS to import when mounting */
    cssImport?: () => void;
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
declare function createAutoMountFunction(options: AutoMountOptions): () => void;
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
declare function runAutoMount(autoMountFn: () => void): void;

export { type AutoMountOptions, createAutoMountFunction, runAutoMount };
