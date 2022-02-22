import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  define: { 'process.env': {} },
  plugins: [vue()],
  // We alias vue references to a seperate vue build to make sure Vue-Router is working
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
      '@': path.resolve(__dirname, '/src'),
    },
  },
});
