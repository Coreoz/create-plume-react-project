export default class NonParametrizedRoute {
  path: string;

  constructor(path: string) {
    this.path = path;
  }

  getPath(): string {
    return this.path;
  }
}
