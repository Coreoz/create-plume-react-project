import { Config } from 'jest';
import { defaults } from 'jest-config';

const config: Config = {
  bail: true,
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  transform: {
    '^.+\\.(ts|tsx|js)$': [
      'ts-jest', {
        tsconfig: 'tsconfig.test.json',
        compiler: 'ttypescript',
      },
    ],
  },
  setupFilesAfterEnv: [
    '<rootDir>/tests/installation/setupTests.ts',
  ],
  moduleNameMapper: {
    '@i18n/translations/hmr-config': '<rootDir>/tests/installation/hmrMock.js',
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$': '<rootDir>/tests/installation/jestMock.js',
    '\\.(css|scss)$': '<rootDir>/tests/installation/styleMock.js',
    "@api/(.*)": ["<rootDir>/src/api/$1"],
    "@components/(.*)": ["<rootDir>/src/components/$1"],
    "@i18n/(.*)": ["<rootDir>/src/i18n/$1"],
    "@lib/(.*)": ["<rootDir>/src/lib/$1"],
    "@services/(.*)": ["<rootDir>/src/services/$1"],
    "@assets/(.*)": ["<rootDir>/assets/$1"],
  },
  testEnvironment: 'jest-environment-jsdom',
  verbose: true,
};

export default config;