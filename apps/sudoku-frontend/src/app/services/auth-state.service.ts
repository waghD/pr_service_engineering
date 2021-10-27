import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {

  private redirectPage: string;
  private authState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public get isLoggedIn() {
    return this.authState.value;
  }
  public get authStream() {
    return this.authState.asObservable();
  }

  constructor() {
    this.redirectPage = '';
  }

  public login() {
    this.authState.next(true);
  }

  public logout() {
    this.authState.next(false);
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
