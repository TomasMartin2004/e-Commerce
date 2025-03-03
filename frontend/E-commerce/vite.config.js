import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  optimizeDeps: {
    exclude: [
      '@mui/icons-material',
      '@mui/material',
      '@react-google-maps/api',
    ],
  },
})