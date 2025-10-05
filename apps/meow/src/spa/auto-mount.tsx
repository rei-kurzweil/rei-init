// Self-contained auto-mounting SPA - no external bootstrapping needed
import { createRoot } from 'react-dom/client'
import App from '../App'
import '../index.css'

// Generalized auto-mount functionality
function createAutoMountFunction(appPrefix: string, AppComponent: React.ComponentType<any>) {
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

        // Clear loading content and mount React app
        container.innerHTML = ''
        const root = createRoot(container)
        root.render(<AppComponent {...props} />)
    }
}

// Create the specific auto-mount function for this app
const autoMount = createAutoMountFunction('meow', App)

// Run immediately and also on DOM ready (in case script loads before DOM)
autoMount()

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoMount)
}