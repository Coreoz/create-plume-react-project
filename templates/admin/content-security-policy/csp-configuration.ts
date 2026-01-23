import { CspPolicies } from '../../../../vite-plugin-content-security-policy';

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
    // %{CSP_NONCE}e will be replaced by Apache (use {RANDOM} for dev environment if needed,
    // see noncesConfiguration.nonceTemplate of cspProxyPlugin in vite.config.ts)
    default: '\'self\' \'nonce-%{CSP_NONCE}e\' '
      + '\'sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=\' ' // For MUI/Emotion
      + '\'sha256-Xo8/tnRnpUxMw05nUf764oT49W2GEbQN9LaX8Wqxuwg=\'', // For MUI/Emotion
    // nonce/sha can not be used in dev because of library that adds tag at runtime
    dev: '\'self\' \'unsafe-inline\'',
  },
  'font-src': '\'self\'',
  'img-src': '\'self\'',
  'connect-src': '\'self\'',
  'media-src': '\'self\'',
};
