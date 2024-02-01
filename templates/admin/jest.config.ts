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
    './tests/setupTests.ts',
  ],
  globals: {
    'ts-jest': {
      'compiler': 'ttypescript',
      'tsconfig': 'tsconfig.json',
    },
  },
  moduleNameMapper: {
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$': '<rootDir>/tests/jestMock.js',
  },
  testEnvironment: 'jsdom',
  verbose: true,
};

export default config;