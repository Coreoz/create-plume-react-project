import { CspPolicies } from 'vite-plugin-content-security-policy';

// Add your environment here (e.g. ['dev', 'staging', 'production']
export const ENVIRONMENTS: readonly ['dev'] = <const>['dev'];
export type Environment = typeof ENVIRONMENTS[number];

export const cspRules: CspPolicies<Environment> = {
  'default-src': '\'self\'',
  'script-src': {
    default: '\'self\' '
      + '\'sha256-9ETCSkgKPALncds5uxSOcK3MXx5BAgviQvfr52+3sgQ=\' ' // For import source script
      + '\'sha256-NEZvGkT0ZWP6XHdKYM4B1laRPcM6Lw4LJfkDtIEVAKc=\'', // For outdated browser script
  },
  'style-src': {
    // %{CSP_NONCE}e will be replaced by Apache
    default: '\'self\' \'nonce-%{CSP_NONCE}e\'',
    // {RANDOM} will be replaced by Vite (see cspProxyPlugin in vite.config.ts)
    dev: '\'self\' \'nonce-{RANDOM}\'',
  },
  'font-src': '\'self\'',
  'img-src': '\'self\'',
  'connect-src': '\'self\'',
  'media-src': '\'self\'',
};
