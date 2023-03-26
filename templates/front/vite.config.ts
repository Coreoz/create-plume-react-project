import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
        alias: {
            '@scssVariables' : path.resolve(__dirname,'./assets/scss/_variables.scss')
        },
    },
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
        }
    },
});
