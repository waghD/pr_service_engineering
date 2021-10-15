export class DemoModel {
  private _foo: string;
  public set foo(newFoo: string) {
    this._foo = newFoo;
  }
  public get foo(): string {
    return this._foo;
  }

  constructor() {
    this.foo = 'bar';
  }
}
