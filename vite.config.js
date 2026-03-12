import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          three: ['three'],
          postfx: ['postprocessing'],
          ui: ['lucide-react', '@cursorify/react', '@cursorify/cursors'],
          supabase: ['@supabase/supabase-js'],
        },
      },
    },
  },
})
