import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(viteConfig, defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ['./tests/setup.ts'],
    globals: true, // Ensure globals like 'expect' are available
  },
}))
