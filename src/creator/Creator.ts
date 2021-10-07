import fs from 'fs-extra';
import Config from '../config/Config';
import path from 'path';
import { Logger } from 'simple-logging-system';

const logger = new Logger('Creator');

/**
 * Handle project creation using templates
 */
export default class Creator {
  constructor(private readonly config: Config) {
  }

  create() {
    try {
      this.copyTemplate();
      this.updateTargetFilesWithProjectName();
    } catch (e) {
      logger.error('Could not create project', e);
    }
  }

  private copyTemplate() {
    fs.copySync(
      path.resolve(this.config.get().templateDirectory, this.config.get().template),
      this.config.get().targetDirectory,
    );
  }

  private updateTargetFilesWithProjectName() {
    const { projectName } = this.config.get();
    this.updateFileContent('package.json', (fileContent) => {
      const packageJsonContent = JSON.parse(fileContent);
      packageJsonContent.name = projectName;
      return JSON.stringify(packageJsonContent, null, 2);
    });
  }

  private updateFileContent(relativePath: string, fileTransformer: (fileContent: string) => string) {
    const absolutePath = path.resolve(this.config.get().targetDirectory, relativePath);
    const fileContent = fs.readFileSync(absolutePath, 'utf-8');
    const fileUpdatedContent = fileTransformer(fileContent);
    fs.writeFileSync(absolutePath, fileUpdatedContent, 'utf-8');
  }
}
