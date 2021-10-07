const {defaults} = require('jest-config');

module.exports = {
    bail: true,
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    setupFilesAfterEnv: [
        "./tests/setupTests.ts"
    ],
    globals: {
        "ts-jest": {
            "compiler": "ttypescript",
            "tsconfig": "tsconfig.json"
        }
    },
    moduleNameMapper: {
        "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$": "<rootDir>/tests/jestMock.js"
    },
    testEnvironment: 'jsdom',
    verbose: true,
};
