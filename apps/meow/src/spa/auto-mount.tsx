// Self-contained auto-mounting SPA using @rei-init/spa-auto-mount
import { createAutoMountFunction, runAutoMount } from '@rei-init/spa-auto-mount'
import App from '../App'
import '../index.css'

// Create the auto-mount function for the meow app
const autoMount = createAutoMountFunction({
    appPrefix: 'meow',
    component: App
})

// Use the utility function to run auto-mount
runAutoMount(autoMount)