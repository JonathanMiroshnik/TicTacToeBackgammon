import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import mkcert from 'vite-plugin-mkcert'

// https://vite.dev/config/
export default defineConfig({
  base: '/tictac/', // TODO: remove added 5.5.25 for testing purposes
  plugins: [react()], //mkcert() - https compliance
  server: {
    host: '0.0.0.0',
    // host: true,
    // host: '2a00:a041:28a0:7b00::1001',
    // host: '::',
    // https: true,
    port: 51730,
    allowedHosts: ["yonatan-h110m-s2v.local", 'www.sensorcensor.xyz']
  },
})
