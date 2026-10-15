import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  define: {
    // Match the reference site's Netlify flow. Local and deploy previews never send.
    'import.meta.env.VITE_NETLIFY_FORMS_ENABLED': JSON.stringify(
      process.env.NETLIFY === 'true' && process.env.CONTEXT === 'production'
        ? 'true'
        : 'false'
    )
  },
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        // Function form: only called for modules actually in the bundle,
        // so SSR builds (which externalize "three") don't break.
        manualChunks(id) {
          if (id.includes('node_modules/three/')) return 'three'
          if (id.includes('node_modules/@react-three/')) return 'r3f'
        }
      }
    }
  },
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true
  },
  preview: {
    host: '127.0.0.1',
    port: 4173,
    strictPort: true
  }
})
