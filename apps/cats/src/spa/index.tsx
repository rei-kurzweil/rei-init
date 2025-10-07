// Manual SPA mounting entry point
import { createRoot } from 'react-dom/client'
import App from '../App'
import '../index.css'

export function mountCatsSPA(container: HTMLElement, props = {}) {
  const root = createRoot(container)
  root.render(<App {...props} />)
  return root
}

// Default export for dynamic imports
export default App