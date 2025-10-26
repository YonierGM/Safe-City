import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://api2.safecity.fun',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path,
      },
    },
  },
})
