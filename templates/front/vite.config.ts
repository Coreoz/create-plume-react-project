import { Options } from '@swc/core';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig, Environment } from 'vite';
import { cspProxyPlugin, cspConfigurationFileGenerationPlugin } from 'vite-plugin-content-security-policy';
import { cspRules } from './content-security-policy/csp-configuration';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      plugins: [['swc-class-decorator-plugin', {}]],
      useAtYourOwnRisk_mutateSwcOptions: (options: Options) => {
        options.jsc!.experimental!.runPluginFirst = true;
      },
    }),
    cspProxyPlugin<Environment>(
      {
        rules: cspRules,
        noncesConfiguration: {
          nonceTemplate: '{RANDOM}',
          developmentKey: 'dev',
        },
      },
    ),
    cspConfigurationFileGenerationPlugin<Environment>(
      {
        rules: cspRules,
        environments: new Set<Environment>(['int']),
      },
    ),
  ],
  html: {
    // Overridden by cspProxyPlugin in dev, used nominally when building the project
    cspNonce: `<!--#echo var="CSP_NONCE" -->`,
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
      '@scssVariables': path.resolve(__dirname, 'assets/scss/variables'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@i18n': path.resolve(__dirname, 'src/i18n'),
      '@lib': path.resolve(__dirname, 'src/lib'),
      '@services': path.resolve(__dirname, 'src/services'),
    },
  },
});
