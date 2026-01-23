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
} from './content-security-policy/csp-configuration';

const vitePlugins: PluginOption[] = [];

const isVitest: boolean = process.env.VITEST === 'true';

// Vite CSP plugins must not be added when running tests
if (!isVitest) {
  vitePlugins.push(
    cspProxyPlugin<AppEnvironment>(
      {
        rules: cspRules,
        noncesConfiguration: {
          nonceTemplate: '{RANDOM}',
          developmentKey: 'dev',
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
      '@api': path.resolve(__dirname, 'src/api'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@i18n': path.resolve(__dirname, 'src/i18n'),
      '@lib': path.resolve(__dirname, 'src/lib'),
      '@services': path.resolve(__dirname, 'src/services'),
    },
  },
});
