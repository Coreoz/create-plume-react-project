import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // eslint-disable-next-line consistent-return
      parserConfig(id: string) {
        // fix hot reloading with js files exported by TypeScript in the ts-built directory
        if (id.endsWith('.js')) return { syntax: 'ecmascript', jsx: true };
      },
    }),
  ],
  // uncomment the line with the base attribute to use the context path /admin/
  // base: '/admin/',
  build: {
    outDir: 'build',
  },
  server: {
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
});
