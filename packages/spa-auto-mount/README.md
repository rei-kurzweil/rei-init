# @rei-init/spa-auto-mount

A generalized auto-mounting utility for React SPAs in browser environments.

## Features

- **Automatic Detection**: Finds containers with `data-app-{prefix}` attributes
- **Props Extraction**: Converts `data-{prefix}-*` attributes to React props
- **Type Parsing**: Automatically converts "true"/"false" strings to booleans and numeric strings to numbers
- **Prevent Double-mounting**: Uses `data-app-{prefix}-mounted` flag to prevent duplicate renders
- **DOM Ready Support**: Works whether script loads before or after DOM is ready

## Installation

```bash
pnpm add @rei-init/spa-auto-mount
```

## Usage

### Basic Example

```typescript
import { createAutoMountFunction, runAutoMount } from '@rei-init/spa-auto-mount'
import App from './App'
import './index.css'

const autoMount = createAutoMountFunction({
  appPrefix: 'meow',
  component: App
})

runAutoMount(autoMount)
```

### HTML Usage

```html
<!-- Container with app identifier and props -->
<div data-app-meow data-meow-title="Hello World" data-meow-count="42">
  Loading...
</div>
```

After mounting, the container becomes:
```html
<div data-app-meow data-meow-title="Hello World" data-meow-count="42" data-app-meow-mounted="true">
  <!-- Your React app renders here -->
</div>
```

### Advanced Example

```typescript
import { createAutoMountFunction } from '@rei-init/spa-auto-mount'
import App from './App'

const autoMount = createAutoMountFunction({
  appPrefix: 'cats',
  component: App,
  cssImport: () => import('./styles.css') // Optional CSS import
})

// Custom mounting logic
autoMount()

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', autoMount)
}
```

## API

### `createAutoMountFunction(options)`

Creates an auto-mount function for a React SPA.

#### Options

- `appPrefix: string` - The app prefix used in data attributes (e.g., 'meow', 'cats')
- `component: ComponentType<any>` - The React component to mount
- `cssImport?: () => void` - Optional function to import CSS when mounting

#### Returns

A function that will auto-mount the component when called.

### `runAutoMount(autoMountFn)`

Utility function to run auto-mount immediately and on DOM ready.

#### Parameters

- `autoMountFn: () => void` - The auto-mount function to run

## Data Attribute Conventions

- `data-app-{prefix}` - Identifies containers for the SPA (required)
- `data-{prefix}-*` - Becomes props passed to the React component
- `data-app-{prefix}-mounted` - Added after mounting to prevent double-mounting

## Type Conversion

Data attributes are automatically converted:
- `"true"` → `true` (boolean)
- `"false"` → `false` (boolean) 
- `"123"` → `123` (number)
- `"hello"` → `"hello"` (string, unchanged)

## License

MIT