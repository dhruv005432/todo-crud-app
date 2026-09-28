/**
 * Sends real-time debug messages to the VS Code terminal running `npm run dev`
 */
export function logToTerminal(type, message, data = null) {
  try {
    // 1. Browser DevTools Console
    console.log(`[TODO APP] ${message}`, data || '');

    // 2. Stream to Node/Vite Terminal Output
    fetch('/__terminal_log', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type, message, data }),
    }).catch(() => {
      // Ignore if dev server middleware is not reachable
    });
  } catch {
    // Ignore error
  }
}
