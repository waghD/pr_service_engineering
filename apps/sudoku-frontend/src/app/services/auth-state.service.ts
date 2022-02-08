import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { IAuthDto, IAuthErrorDto, IAuthResponseDto } from '@models/IAuthDto';
import { map, take } from "rxjs/operators";
import { Router } from "@angular/router";
import { isDevMode } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AuthStateService {

  private redirectPage: string;
  private authState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private authToken: BehaviorSubject<string> = new BehaviorSubject<string>("");
  private username: BehaviorSubject<string> = new BehaviorSubject<string>("");

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
      map(token => !!token && token !== "")
    );
  }

  constructor(private httpClient: HttpClient, private router: Router) {
    this.redirectPage = "";
  }

  public loginAsGuest() {
    this.authState.next(true);
  }

  /**
   * Logs the user into the app. Returns statuscode: 200 for OK, 401 for wrong email, 402 for wrong password
   * @param username
   * @param password
   */
  public async login(username: string, password: string): Promise<200 | 401 | 402> {
    const body: IAuthDto = {
      username,
      password
    };

    let url;
    if (isDevMode()) {
      url = "http://localhost:8080/api/auth/login";
    } else {
      url = "http://localhost/api/auth/login";
    }

    try {
      const response = await this.httpClient.post<IAuthResponseDto>(url, body).pipe(
        take(1)
      ).toPromise();
      if (response && response.access_token) {
        this.authToken.next(response.access_token);
        this.authState.next(true);
        this.username.next(response.username);
        return 200;
      }
      this.authToken.next("");
      this.authState.next(false);

      return 401;
    } catch (e) {
      console.error(e);
      this.authToken.next("");
      this.authState.next(false);
      const typesError: IAuthErrorDto = e;

      return typesError?.error?.statusCode ?? 401;
    }
  }

  /**
   * Sign user up. Returns status code: 200 for ok, 401 for email taken
   * @param username
   * @param password
   */
  public async signup(username: string, password: string): Promise<200 | 401 | 402> {
    const body: IAuthDto = {
      username,
      password
    };
    let url;
    if (isDevMode()) {
      url = "http://localhost:8080/api/auth/signup";
    } else {
      url = "http://localhost/api/auth/signup";
    }

    try {
      const response = await this.httpClient.post<IAuthResponseDto>(url, body).pipe(
        take(1)
      ).toPromise();

      if (response && response.access_token) {
        this.authToken.next(response.access_token);
        this.authState.next(true);
        this.username.next(response.username);
        return 200;
      }
      this.authToken.next("");
      this.authState.next(false);
      return 401;
    } catch (e) {
      console.error(e);
      const typedError: IAuthErrorDto = e;
      this.authToken.next("");
      this.authState.next(false);
      return typedError?.error?.statusCode ?? 401;
    }
  }

  public logout() {
    this.authState.next(false);
    this.authToken.next("");
    this.username.next("");
    this.router.navigateByUrl("/login")
      .catch(e => console.error(e));
  }

  public setRedirectPage(url: string) {
    this.redirectPage = url;
  }

  public hasRedirectPage() {
    return this.redirectPage !== "";
  }

  public consumeRedirectPage() {
    const redirect = this.redirectPage;
    this.redirectPage = "";
    return redirect;
  }
}
