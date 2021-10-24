import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {

  private authState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public get isLoggedIn() {
    return this.authState.value;
  }
  public get authStream() {
    return this.authState.asObservable();
  }

  public login() {
    this.authState.next(true);
  }

  public logout() {
    this.authState.next(false);
  }
}
