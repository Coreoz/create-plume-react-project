import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [reactRefresh()],
    build: {
        outDir: 'build'
    },
    server: {
        proxy: {
            '/api': 'http://localhost:8080'
        }
    },
    css: {
        modules: {
            localsConvention: 'camelCase',
        }
    },
})
