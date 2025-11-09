import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // Using custom domain, so we use root path
  plugins: [react()],
});
