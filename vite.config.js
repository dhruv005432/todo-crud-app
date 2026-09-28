import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Plugin to stream client-side Todo CRUD actions directly into VS Code Terminal output
function terminalLoggerPlugin() {
  return {
    name: 'terminal-logger-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/__terminal_log' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const { type, message, data } = JSON.parse(body);
              const colorMap = {
                CREATE: '\x1b[32m', // Green
                STATUS: '\x1b[36m', // Cyan
                UPDATE: '\x1b[33m', // Yellow
                DELETE: '\x1b[31m', // Red
                INIT: '\x1b[34m',   // Blue
                DEFAULT: '\x1b[37m',// White
              };
              const color = colorMap[type] || colorMap.DEFAULT;
              const timestamp = new Date().toLocaleTimeString();
              console.log(
                `${color}[TODO OUTPUT ${timestamp}] ${message}\x1b[0m`,
                data ? data : ''
              );
            } catch (err) {
              console.error('Error logging to terminal:', err);
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('OK');
          });
          return;
        }
        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), terminalLoggerPlugin()],
});
