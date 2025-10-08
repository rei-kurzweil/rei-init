import { createRoot } from 'react-dom/client'
import { MicroBus } from '@rei-init/micro-bus'
import { createElement } from 'react'

export interface IslandConfig<T = any> {
    component: React.ComponentType<any>
    selector: string
    props?: T
}

export interface IslandMountOptions {
    microBus?: MicroBus
    onMount?: (selector: string, props: any) => void
    onError?: (selector: string, error: Error) => void
}

/**
 * Mount multiple React components as islands with different props
 * All islands share the same micro-bus instance
 */
export function mountMultipleIslands(
    islandConfigs: IslandConfig[],
    options: IslandMountOptions = {}
): MicroBus {
    // Create shared micro-bus instance
    const microBus = options.microBus || new MicroBus()
    
    // Mount each island
    islandConfigs.forEach(({ component: Component, selector, props = {} }) => {
        try {
            const element = document.querySelector(selector)
            
            if (!element) {
                console.warn(`Island selector not found: ${selector}`)
                return
            }

            // Create root and render component with props + micro-bus
            const root = createRoot(element)
            const componentProps = {
                ...props,
                islandBus: microBus
            }

            root.render(createElement(Component, componentProps))
            
            options.onMount?.(selector, props)
            
        } catch (error) {
            console.error(`Failed to mount island at ${selector}:`, error)
            options.onError?.(selector, error as Error)
        }
    })

    return microBus
}

/**
 * Mount a single island (convenience function)
 */
export function mountSingleIsland<T extends React.ComponentType<any>>(
    Component: T,
    selector: string,
    props?: React.ComponentProps<T>,
    microBus?: MicroBus
): MicroBus {
    return mountMultipleIslands([{ component: Component, selector, props }], { microBus })
}

/**
 * Auto-mount islands based on data attributes
 * Looks for elements with data-spa-island attribute
 */
export function autoMountIslands<T extends React.ComponentType<any>>(
    Component: T,
    options: IslandMountOptions = {}
): MicroBus {
    const islands = document.querySelectorAll('[data-spa-island]')
    const islandConfigs: IslandConfig[] = []

    islands.forEach((element) => {
        const islandType = element.getAttribute('data-spa-island')
        const islandProps = element.getAttribute('data-spa-props')
        
        // Create selector from element
        const id = element.id
        const className = element.className
        const selector = id ? `#${id}` : className ? `.${className.split(' ')[0]}` : `[data-spa-island="${islandType}"]`
        
        // Parse props if provided
        let props: any = {}
        if (islandProps) {
            try {
                props = JSON.parse(islandProps)
            } catch (error) {
                console.warn(`Failed to parse props for island ${selector}:`, error)
            }
        }
        
        // Add island type to props if specified
        if (islandType) {
            props = { ...props, islandType }
        }

        islandConfigs.push({ component: Component, selector, props })
    })

    return mountMultipleIslands(islandConfigs, options)
}

// Export MicroBus for convenience
export { MicroBus } from '@rei-init/micro-bus'