import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    // host: '2a00:a041:28a0:7b00::1001',
    // host: '::',
    port: 51730
  //   allowedHosts: ["yonatan-h110m-s2v.local"]
  },
})
