import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { DemoInterface } from '../../../../../../libs/interfaces/demo-interface';

@Injectable({
  providedIn: 'root'
})
export class HomeStateService {

  public readonly title = 'sudoku-frontend';
  private httpSrc$ = new BehaviorSubject<string>('');
  public get httpRes$() {
    return this.httpSrc$.asObservable();
  }

  constructor(private readonly http: HttpClient) {
    this.http
    .get<{ message: string }>('http://localhost:8080/api')
    .pipe(
      take(1),
      map((cur) => cur.message)
    )
    .subscribe((res) => (this.httpSrc$.next(res)));
  }

  getFoo() {
    this.http
      .get<DemoInterface>('http://localhost:8080/api/test')
      .pipe(
        take(1)
      )
      .subscribe(res => console.log('foo: ', res.foo));
  }
}
