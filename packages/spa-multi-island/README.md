# SPA Multi-Island

Mount multiple React SPA instances with different props and a shared micro-bus.

## Features

- Mount multiple instances of the same React app with different props
- Shared micro-bus instance across all islands
- Type-safe island configuration
- Support for different island types/modes

## Usage

```typescript
import { mountMultipleIslands } from '@rei-init/spa-multi-island'
import App from './App'

// Define your island types
export enum AppIslandType {
    LOGIN = "login",
    EDITOR = "editor", 
    STATUS = "status"
}

// Configure islands
const islandConfigs = [
    {
        selector: '#login-island',
        props: { 
            islandType: AppIslandType.LOGIN,
            islandBus:? MicroBus
        }
    },
    {
        selector: '#editor-island', 
        props: { 
            islandType: AppIslandType.EDITOR 
            islandBus:? MicroBus
        }
    },
    {
        selector: '#status-island',
        props: { 
            islandType: AppIslandType.STATUS 
            islandBus:? MicroBus
        }
    }
]

// Mount all islands with shared micro-bus
mountMultipleIslands(App, islandConfigs)
```