import path from 'path';
import { defineConfig, ViteDevServer } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-scss-files-in-dev',
      configureServer: (server: ViteDevServer) => {
        const sourceFolder: string = path.resolve('src');
        const tsBuiltFolder: string = path.resolve('ts-built');
        server.watcher.on('change', (absolutePath: string) => {
          if (absolutePath.endsWith('.scss') && absolutePath.startsWith(sourceFolder)) {
            fs.copyFile(
              absolutePath,
              tsBuiltFolder + absolutePath.substring(sourceFolder.length),
              (error: NodeJS.ErrnoException | null) => {
                if (error) {
                  // eslint-disable-next-line no-console
                  console.log(`Could not copy SCSS file ${absolutePath}`, error);
                } else {
                  // eslint-disable-next-line no-console
                  console.log(`SCSS file updated ${absolutePath}`);
                }
              },
            );
          }
        });
      },
    },
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
      globalModulePaths: [/.+\.global\.module\.(css|scss)$/],
      exportGlobals: true,
    },
    preprocessorOptions: {
      scss: {
        additionalData: '@use \'@scssVariables\' as *;',
      },
    },
  },
  resolve: {
    alias: {
      '@scssVariables': path.resolve(__dirname, 'assets/scss/variables'),
      '@api': path.resolve(__dirname, 'ts-built/api'),
      '@components': path.resolve(__dirname, 'ts-built/components'),
      '@i18n': path.resolve(__dirname, 'ts-built/i18n'),
      '@lib': path.resolve(__dirname, 'ts-built/lib'),
      '@services': path.resolve(__dirname, 'ts-built/services'),
    },
  },
});
