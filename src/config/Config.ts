import minimist from 'minimist';
import path from 'path';

export type ConfigType = {
  template: 'admin' | 'front',
  projectName: string,
  verbose: boolean,
  targetDirectory: string,
  templateDirectory: string,
};

/**
 * Handle cli config reader
 */
export default class Config {
  private configValue?: ConfigType;

  initialize(): void {
    const parsedArgs = minimist(process.argv.slice(2), { boolean: 'verbose' });
    this.configValue = {
      template: 'front',
      projectName: 'my-project',
      verbose: false,
      targetDirectory: process.cwd(),
      templateDirectory: path.resolve(__dirname, '../templates'),
      ...(parsedArgs as Partial<Config>),
    };
  }

  get(): ConfigType {
    if (this.configValue) {
      return this.configValue;
    }
    throw new Error('Config.initialize() must be called before configuration is used');
  }
}
