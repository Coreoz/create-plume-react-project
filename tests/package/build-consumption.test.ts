import { createRequire } from 'node:module';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, it } from 'vitest';

const require = createRequire(import.meta.url);
const currentDir = path.dirname(fileURLToPath(import.meta.url));

const packageRoot = path.resolve(currentDir, '..', '..');
const cliEntry = path.join(packageRoot, 'build', 'cli.js');
const configEntry = path.join(packageRoot, 'build', 'config', 'Config.js');
const creatorEntry = path.join(packageRoot, 'build', 'creator', 'Creator.js');
const templatesDirectory = path.join(packageRoot, 'build', 'templates');

const CTOR_NAME_SYMBOL = Symbol.for('___CTOR_NAME___');
const CTOR_ARGS_SYMBOL = Symbol.for('___CTOR_ARGS___');

// These tests run against the *built* CLI so that they verify the published artifacts:
// the compiled entry point, the copied templates and the DI metadata used by plume-ts-di.
describe('Built CLI consumption', () => {
  it('produces the CLI build outputs and the templates', () => {
    assert.ok(fs.existsSync(cliEntry), `missing CLI output: ${cliEntry}`);
    assert.ok(fs.existsSync(configEntry), `missing Config output: ${configEntry}`);
    assert.ok(fs.existsSync(creatorEntry), `missing Creator output: ${creatorEntry}`);
    assert.ok(
      fs.existsSync(path.join(templatesDirectory, 'front', '.gitignore_safe')),
      'missing copied front template .gitignore_safe',
    );
    assert.ok(
      fs.existsSync(path.join(templatesDirectory, 'admin', '.gitignore_safe')),
      'missing copied admin template .gitignore_safe',
    );
  });

  it('exposes the DI metadata expected by plume-ts-di on the compiled Config', () => {
    const Config = require(configEntry).default;
    assert.equal(Config[CTOR_NAME_SYMBOL], 'Config');
    assert.deepEqual(Config[CTOR_ARGS_SYMBOL], []);
  });

  it('exposes the DI metadata expected by plume-ts-di on the compiled Creator', () => {
    const Creator = require(creatorEntry).default;
    assert.equal(Creator[CTOR_NAME_SYMBOL], 'Creator');
    assert.deepEqual(Creator[CTOR_ARGS_SYMBOL], ['Config']);
  });
});
