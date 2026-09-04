import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
  },
  // Pre-bundle the heavy 3D deps at server start so Vite never re-optimizes
  // (and force-reloads the page) mid-request. Without this, several browsers
  // hitting a cold dev server in parallel can race a dep re-optimization and
  // see dropped connections — which is exactly what the E2E suite does.
  optimizeDeps: {
    include: [
      'three',
      '@react-three/fiber',
      '@react-three/drei',
      'framer-motion',
      'react-router-dom',
    ],
  },
  preview: {
    port: 4173,
    strictPort: true,
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        // Keep the heavy 3D runtime (three + R3F + drei) in one cacheable
        // vendor chunk, separate from the app entry. It is only fetched when a
        // lazily-imported <SceneCanvas> mounts.
        manualChunks(id) {
          if (
            id.includes('/three/') ||
            id.includes('/three-stdlib/') ||
            id.includes('@react-three/')
          ) {
            return 'r3f'
          }
        },
      },
    },
  },
})
