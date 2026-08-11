import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],

  base: process.env.NODE_ENV === 'production'
    ? '/dgx-a100-dashboard/'
    : '/',

  server: {
    proxy: {
      '/api': {
        target: 'https://api-dummy-dashboard.halkh-systems.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})