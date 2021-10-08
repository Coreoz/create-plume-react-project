import fs from 'fs-extra';
import path from 'path';
import { Logger } from 'simple-logging-system';
import Config from '../config/Config';

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
      logger.info(`Project created in ${this.config.get().targetDirectory}`);
    } catch (e) {
      logger.error('Could not create project', e);
    }
  }

  private copyTemplate() {
    const { targetDirectory } = this.config.get();
    if (fs.readdirSync(targetDirectory).length > 0) {
      throw new Error(`Target directory '${targetDirectory}' is not empty`);
    }
    fs.copySync(
      path.resolve(this.config.get().templateDirectory, this.config.get().template),
      targetDirectory,
    );
  }

  private updateTargetFilesWithProjectName() {
    this.updatePackageJson();
    this.updateIndexHtml();
  }

  private updatePackageJson() {
    const { projectName } = this.config.get();
    this.updateFileContent('package.json', (fileContent) => {
      const packageJsonContent = JSON.parse(fileContent);
      packageJsonContent.name = projectName;
      return JSON.stringify(packageJsonContent, null, 2);
    });
  }

  private updateIndexHtml() {
    const { projectName } = this.config.get();
    this.updateFileContent('index.html', (fileContent) => fileContent.replace('Plume admin', projectName));
  }

  private updateFileContent(relativePath: string, fileTransformer: (fileContent: string) => string) {
    const absolutePath = path.resolve(this.config.get().targetDirectory, relativePath);
    const fileContent = fs.readFileSync(absolutePath, 'utf-8');
    const fileUpdatedContent = fileTransformer(fileContent);
    fs.writeFileSync(absolutePath, fileUpdatedContent, 'utf-8');
  }
}
