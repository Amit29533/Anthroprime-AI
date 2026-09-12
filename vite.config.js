import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
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
        },
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    cors: true,
    hmr: {
      clientPort: 443
    },
    // @ts-ignore - allow all hosts for e2b preview
    allowedHosts: true
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    cors: true
  }
})
