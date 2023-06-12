import * as path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import watchAndRun from 'vite-plugin-watch-and-run';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    watchAndRun([
      {
        name: 'gen',
        watchKind: ['add', 'change', 'unlink'],
        watch: path.resolve('src/**/*.scss'),
        run: 'yarn copy-css',
        delay: 300
      }
    ])
  ],
  build: {
    outDir: 'build',
  },
  server: {
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
  resolve: {
    alias: {
      '@scssVariables': require('path').resolve(__dirname, 'assets/scss/variables.scss'),
      '@api': require('path').resolve(__dirname, 'src/api'),
      '@components': require('path').resolve(__dirname, 'src/components'),
      '@i18n': require('path').resolve(__dirname, 'src/i18n'),
      '@lib': require('path').resolve(__dirname, 'src/lib'),
      '@services': require('path').resolve(__dirname, 'src/services'),
    }
  },
});
