import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  server: {
    port: 3000, 
    strictPort: true,
    // Force IPv4 to prevent crashes
    host: '127.0.0.1',
    // This simulates Vercel's serverless environment locally
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        bypass: function (req, res, proxyOptions) {
          if (req.url.startsWith('/api/')) {
            // Dynamically import and run your API file
            const apiRoute = req.url.replace('/api/', '');
            import(`./api/${apiRoute}.js`)
              .then(module => module.default(req, res))
              .catch(err => {
                console.error("API Proxy Error:", err);
                res.statusCode = 500;
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
              });
            return false; // Tells Vite we handled the response
          }
        }
      }
    }
  }
});