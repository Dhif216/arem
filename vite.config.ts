import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // 💡 CRITICAL FIX: Tell Vite to prefix all asset paths with the repository name
  base: '/arem/', 
  
  plugins: [react()],
});