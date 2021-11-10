import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeStateService {

  public readonly title = 'service-frontend';
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

}
