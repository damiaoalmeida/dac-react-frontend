import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/dac-react-frontend/", // Nome do repositório do GitHub
  plugins: [react()],
})
