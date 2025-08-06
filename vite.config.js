import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/wealth-map-us/', // 👈 this is critical for GitHub Pages
  plugins: [react()],
});