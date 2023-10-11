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
      localsConvention: 'dashes',
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@use '@scssVariables' as *;`
      },
    }
  },
  resolve: {
    alias: {
      '@scssVariables': require('path').resolve(__dirname, 'assets/scss/variables.scss'),
      '@api': require('path').resolve(__dirname, 'ts-built/api'),
      '@components': require('path').resolve(__dirname, 'ts-built/components'),
      '@i18n': require('path').resolve(__dirname, 'ts-built/i18n'),
      '@lib': require('path').resolve(__dirname, 'ts-built/lib'),
      '@services': require('path').resolve(__dirname, 'ts-built/services'),
    }
  },
});
