import { ViteHotContext } from 'vite/types/hot';

// This is needed in order to mock the import.meta.hot object which is not available in Jest
// See https://github.com/kulshekhar/ts-jest/issues/3888
export const viteHotContext: { hot?: ViteHotContext } = { hot: import.meta.hot };