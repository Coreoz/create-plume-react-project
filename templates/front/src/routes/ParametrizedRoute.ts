export default class ParametrizedRoute<T extends Record<string, unknown>> {
  path: string;

  constructor(path: string) {
    this.path = path;
  }

  getParametrizedPath(args: T): string {
    let path: string = `${this.path}`;
    Object.keys(args).forEach((key: string): void => {
      path = path.replace(`:${key}`, `${args[key]}`);
    });
    return path;
  }

  getRawPath(): string {
    return this.path;
  }
}
