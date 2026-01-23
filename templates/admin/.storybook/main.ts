import type { StorybookConfig } from '@storybook/react-vite';
import { createRequire } from 'node:module';
import { dirname, join } from 'path';
import { InlineConfig, PluginOption } from 'vite';

const { resolve } = createRequire(import.meta.url);

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
// getAbsolutePath use internal types of storybook : "FrameworkName"
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getAbsolutePath(value: string): any {
  return dirname(resolve(join(value, 'package.json')));
}

const config: StorybookConfig = {
  stories: [
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],

  addons: [
    getAbsolutePath('@storybook/addon-docs'),
  ],

  // Exclude from config unwanted plugins (merge of vite.config.ts and storybook's vite config)
  async viteFinal(config: InlineConfig) {
    // See vite.config.ts for the names of the plugins
    const pluginsToExclude: string[] = [
      'csp-configuration-file-generation-plugin', // CSP plugin that generates Apache/Nginx file
      'csp-proxy-plugin', // CSP plugin that add CSP to dev server
      'vite:react-swc:resolve-runtime', // SWC react plugin -> it interferes with internal storybook configuration
    ];

    return {
      ...config,
      plugins: [
        ...(config.plugins || []).filter((plugin: PluginOption) => {
          if (!plugin) {
            return false;
          }

          if ('name' in plugin) {
            return !pluginsToExclude.includes(plugin?.name);
          }

          if (Array.isArray(plugin)) {
            return !plugin.some((subPlugin: PluginOption) =>
              !!subPlugin
              && 'name' in subPlugin
              && !pluginsToExclude.includes(subPlugin?.name),
            );
          }

          return true;
        }),
      ],
    };
  },

  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
};
export default config;
