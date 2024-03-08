import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

export default defineConfig({
  plugins: [svelte()],
  server: {
    open: true
  },
  base: isProduction ? '/fe-clock/' : '/fe-clock/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      '@src': path.resolve(__dirname, './src'),
      '@scripts': path.resolve(__dirname, './src/scripts'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@components': path.resolve(__dirname, './src/lib/components'),
      '@containers': path.resolve(__dirname, './src/lib/containers'),
    }
  }
});
