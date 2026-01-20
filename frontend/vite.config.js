import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: [
      '3d-force-graph-ar', 
      '3d-force-graph-vr', 
      'aframe-forcegraph-component', 
      'aframe'
    ]
  }
})
