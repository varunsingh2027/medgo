import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // Set NODE_ENV based on the command (build or serve)
  const isProduction = command === 'build'
  process.env.NODE_ENV = isProduction ? 'production' : 'development'
  
  return {
    plugins: [react()],
    base: '/',
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }
  }
})
