// SPA mount function for embedding in other applications
import { createRoot } from 'react-dom/client'
import App from '../App'
import '../App.css'

export interface MountOptions {
  container: HTMLElement
  props?: Record<string, unknown>
}

export function mountMeowSPA({ container, props = {} }: MountOptions) {
  const root = createRoot(container)
  root.render(<App {...props} />)
  
  return {
    unmount: () => root.unmount()
  }
}

// Export the App component and types for more flexibility
export { default as MeowApp, MeowAppIslandType } from '../App'