import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DemoServiceService {

  private readonly _foo: string;
  public get foo() {
    return this._foo;
  }

  constructor() {
    this._foo = 'bar';
  }
}
