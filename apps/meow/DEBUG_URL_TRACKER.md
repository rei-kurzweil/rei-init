# Meow Debug URL Tracker

The `DebugUrlTracker` class automatically tracks URL query parameters and fragment/hash parameters whenever the meow app loads.

## Features

- **Automatic Initialization**: Tracks URL parameters on app startup
- **Persistent Storage**: Stores parameter history in `localStorage` under the key `meow_debug`
- **Query Parameters**: Captures all `?param=value` parameters with `query_` prefix
- **Fragment Parameters**: Captures all `#param=value` parameters with `fragment_` prefix
- **Raw Fragment Support**: Stores raw fragment content if it's not URL parameter format
- **Timestamping**: Adds timestamps for each capture session
- **Console Logging**: Automatically logs captured data to browser console

## Usage

The debug tracker is automatically initialized when the meow app starts. You can access it from the browser console:

```javascript
// Access the debug tracker instance
window.meowDebug

// Manually refresh and capture current URL parameters
window.meowDebug.refresh()

// View current debug data
window.meowDebug.getData()

// Clear all debug data
window.meowDebug.clear()
```

## Example

If you load the meow app with URLs like:
- `https://example.com/meow?user=john&debug=true#access_token=abc123&refresh_token=def456`
- `https://example.com/meow?theme=dark#state=authorized`

The debug tracker will capture and store:
```json
{
  "_last_captured_1637123456789": "2021-11-17T10:30:56.789Z",
  "query_user": "john",
  "query_debug": "true",
  "fragment_access_token": "abc123",
  "fragment_refresh_token": "def456",
  "_last_captured_1637123500000": "2021-11-17T10:31:40.000Z",
  "query_theme": "dark",
  "fragment_state": "authorized"
}
```

## Storage

All data is stored in `localStorage` under the key `meow_debug` as a JSON object. The data persists across browser sessions and accumulates over time, allowing you to see the history of all URL parameters that have been used with the meow app.