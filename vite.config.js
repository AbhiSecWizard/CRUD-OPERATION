
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,   // <- YEH LINE ADD KAR DE
    port: 5173,
  }
})
