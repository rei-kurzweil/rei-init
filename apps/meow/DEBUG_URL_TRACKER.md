# Meow Debug URL Tracker

The `DebugUrlTracker` class automatically tracks URL query parameters and fragment/hash parameters whenever the meow app loads.

## Features

- **Automatic Initialization**: Tracks URL parameters on app startup
- **Persistent Storage**: Stores parameter history in `localStorage` under the key `meow_debug`
- **Query Parameters**: Captures all `?param=value` parameters in `query` bucket
- **Fragment Parameters**: Captures all `#param=value` parameters in `fragment` bucket
- **Raw Fragment Support**: Stores raw fragment content as `_raw` if it's not URL parameter format
- **Time-based Organization**: Groups captures by hour/minute (YYYY-MM-DD HH:MM format)
- **Security**: Automatically truncates sensitive tokens (`provider_token`, `access_token`, `refresh_token`)
- **Console Logging**: Automatically logs captured data to browser console

## Usage

The debug tracker is automatically initialized when the meow app starts. You can access it from the browser console:

```javascript
// Access the debug tracker instance
window.meowDebug

// Manually refresh and capture current URL parameters
window.meowDebug.refresh()

// View all debug data (organized by time)
window.meowDebug.getData()

// Get data for a specific time
window.meowDebug.getDataForTime('2025-11-17 10:30')

// Get all available time keys
window.meowDebug.getTimeKeys()

// Clear all debug data
window.meowDebug.clear()
```

## Example

If you load the meow app with URLs like:
- `https://example.com/meow?user=john&debug=true#access_token=abc123&refresh_token=def456` at 10:30 AM
- `https://example.com/meow?theme=dark#state=authorized` at 10:31 AM

The debug tracker will capture and store:
```json
{
  "2025-11-17 10:30": {
    "query": {
      "user": "john",
      "debug": "true"
    },
    "fragment": {
      "access_token": "abc1...",
      "refresh_token": "def4..."
    }
  },
  "2025-11-17 10:31": {
    "query": {
      "theme": "dark"
    },
    "fragment": {
      "state": "authorized"
    }
  }
}
```

## Security

Sensitive authentication tokens are automatically sanitized for security:
- `provider_token`, `access_token`, and `refresh_token` values are truncated
- Only the first 4 characters are shown, followed by `...`
- This applies to both structured parameters and raw fragment content
- Example: `access_token=eyJ0eXAiOiJKV1QiLCJhbGc` becomes `access_token=eyJ0...`

## Storage

All data is stored in `localStorage` under the key `meow_debug` as a JSON object. The data persists across browser sessions and accumulates over time, allowing you to see the history of all URL parameters that have been used with the meow app.