import { Options } from '@swc/core';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig, PluginOption } from 'vite';
import {
  cspConfigurationFileGenerationPlugin,
  cspProxyPlugin,
} from 'vite-plugin-content-security-policy';
import {
  AppEnvironment,
  cspRules,
  ENVIRONMENTS,
} from './content-security-policy/csp-configuration.ts';

const vitePlugins: PluginOption[] = [];

const isVitest: boolean = process.env.VITEST === 'true';

// Vite CSP plugins must not be added when running tests
if (!isVitest) {
  vitePlugins.push(
    cspProxyPlugin<AppEnvironment>(
      {
        developmentKey: 'dev',
        rules: cspRules,
        noncesConfiguration: {
          nonceTemplate: '{RANDOM}',
        },
      },
    ),
    cspConfigurationFileGenerationPlugin<AppEnvironment>(
      {
        rules: cspRules,
        environments: new Set<AppEnvironment>(ENVIRONMENTS),
      },
    ));
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      plugins: [['swc-class-decorator-plugin', {}]],
      useAtYourOwnRisk_mutateSwcOptions: (options: Options) => {
        options.jsc!.experimental!.runPluginFirst = true;
      },
    }),
    ...vitePlugins,
  ],
  html: {
    // Overridden by cspProxyPlugin in dev, used nominally when building the project
    cspNonce: `<!--#echo var='CSP_NONCE' -->`,
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
      '@scssVariables': path.resolve(import.meta.dirname, 'assets/scss/variables'),
      '@api': path.resolve(import.meta.dirname, 'src/api'),
      '@components': path.resolve(import.meta.dirname, 'src/components'),
      '@i18n': path.resolve(import.meta.dirname, 'src/i18n'),
      '@lib': path.resolve(import.meta.dirname, 'src/lib'),
      '@services': path.resolve(import.meta.dirname, 'src/services'),
    },
  },
});
