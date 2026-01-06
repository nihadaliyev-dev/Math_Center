import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true, // Listen on all addresses
    port: 5173,
    strictPort: false,
    // Allow the production domain
    allowedHosts: [
      'mrc.asoiu.edu.az',
      'www.mrc.asoiu.edu.az',
      'localhost',
      '127.0.0.1',
    ],
  },
  preview: {
    host: true,
    port: 4173,
    strictPort: false,
    allowedHosts: [
      'mrc.asoiu.edu.az',
      'www.mrc.asoiu.edu.az',
      'localhost',
      '127.0.0.1',
    ],
  },
  build: {
    // Ensure robots.txt and .htaccess are copied to dist
    copyPublicDir: true,
    // Optimize build for production
    minify: 'esbuild',
    sourcemap: false, // Disable sourcemaps in production for security
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
})
