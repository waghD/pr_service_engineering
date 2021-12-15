import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IAuthDto, IAuthResponseDto } from '../../../../../libs/models/IAuthDto';
import { map, take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {

  private redirectPage: string;
  private authState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private authToken: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private username: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public get isLoggedIn() {
    return this.authState.value;
  }

  public get authStream() {
    return this.authState.asObservable();
  }

  public get AuthToken() {
    return this.authToken.value;
  }

  public get Username() {
    return this.username.value;
  }

  public get isLoggedInWithAccount$() {
    return this.authToken.asObservable().pipe(
      map(token => !!token && token !== '')
    );
  }

  constructor(private httpClient: HttpClient, private router: Router) {
    this.redirectPage = '';
  }

  public loginAsGuest() {
    this.authState.next(true);
  }

  public async login(username: string, password: string) {
    const body: IAuthDto = {
      username,
      password
    };
    try {
      const response = await this.httpClient.post<IAuthResponseDto>('http://localhost:8080/api/auth/login', body).pipe(
        take(1)
      ).toPromise();
      if (response && response.access_token) {
        this.authToken.next(response.access_token);
        this.authState.next(true);
        this.username.next(response.username);
        return;
      }
      this.authToken.next('');
      this.authState.next(false);
    } catch (e) {
      console.error(e);
      this.authToken.next('');
      this.authState.next(false);
    }
  }


  public async signup(username: string, password: string) {
    const body: IAuthDto = {
      username,
      password
    };
    try {
      const response = await this.httpClient.post<IAuthResponseDto>('http://localhost:8080/api/auth/signup', body).pipe(
        take(1)
      ).toPromise();
      if (response && response.access_token) {
        this.authToken.next(response.access_token);
        this.authState.next(true);
        this.username.next(response.username);
        return;
      }
      this.authToken.next('');
      this.authState.next(false);
    } catch (e) {
      console.error(e);
      this.authToken.next('');
      this.authState.next(false);
    }
  }

  public logout() {
    this.authState.next(false);
    this.authToken.next('');
    this.username.next('');
    this.router.navigateByUrl('/login')
      .catch(e => console.error(e));
  }

  public setRedirectPage(url: string) {
    this.redirectPage = url;
  }

  public hasRedirectPage() {
    return this.redirectPage !== '';
  }

  public consumeRedirectPage() {
    const redirect = this.redirectPage;
    this.redirectPage = '';
    return redirect;
  }
}
