const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

/**
 * Copy the (git-tracked) template files into `build/`, preserving their relative paths.
 *
 * The `.gitignore` files are copied as `.gitignore_safe` because npm/yarn strip `.gitignore`
 * files from published packages. The CLI restores them at project creation time.
 */
const root = path.resolve(__dirname, '..');

const gitOutput = execFileSync('git', ['ls-files', 'templates'], { cwd: root, encoding: 'utf8' });
const files = gitOutput.split(/\r?\n/).filter((line) => line.length > 0);

files.forEach((file) => {
  const destination = path.join(root, 'build', file);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(path.join(root, file), destination);
});

const templatesDirectory = path.join(root, 'build', 'templates');
fs.readdirSync(templatesDirectory, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .forEach((entry) => {
    const gitignore = path.join(templatesDirectory, entry.name, '.gitignore');
    if (fs.existsSync(gitignore)) {
      fs.renameSync(gitignore, path.join(templatesDirectory, entry.name, '.gitignore_safe'));
    }
  });

console.log(`Copied ${files.length} template files to build/templates`);
