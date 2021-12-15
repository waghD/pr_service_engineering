import { TestBed } from '@angular/core/testing';

import { AuthStateService } from './auth-state.service';
import { Subscription } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';

@Component({
  selector: 'se-sudoku-login',
  template: `Login`
})
export class MockLoginComponent {
}

@Component({
  template: `<router-outlet></router-outlet>`
})
export class MockAppComponent {
}

describe('AuthStateService', () => {
  let service: AuthStateService;
  let subscription: Subscription;
  let httpMock: HttpTestingController;

  const authUrlBase = 'http://localhost:8080/api/auth';

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MockAppComponent, MockLoginComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([{
          path: 'login',
          component: MockLoginComponent
        }])
      ],
    });
    service = TestBed.inject(AuthStateService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    if(subscription && !subscription.closed) {
      subscription.unsubscribe();
    }
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be unauthenticated by default', () => {
    expect(service.isLoggedIn).toBe(false);
  })

  it('should be authenticated after login as guest', () => {
    service.loginAsGuest();
    expect(service.isLoggedIn).toBe(true);
  })

  it('should be unauthenticated after login with wrong credentials', () => {

    // silence error logs since an error is the expected behavior
    jest.spyOn(console, 'error').mockImplementation(() => false);

    service.login('false@no-user.at', 'some-password')
      .then(() => {
        expect(service.isLoggedIn).toBe(false);
      });

    const req = httpMock.expectOne(`${authUrlBase}/login`);
    expect(req.request.method).toBe('POST');
    req.flush({
      message: 'Not authenticated'
    }, {
      status: 404,
      statusText: 'Unauthenticated'
    });
  })

  it('should be unauthenticated when connection to login api fails', () => {
    // silence error logs since an error is the expected behavior
    jest.spyOn(console, 'error').mockImplementation(() => false);

    service.login('false@no-user.at', 'some-password')
    .then(() => {
      expect(service.isLoggedIn).toBe(false);
    });

    const req = httpMock.expectOne(`${authUrlBase}/login`);
    expect(req.request.method).toBe('POST');
    req.error(new ErrorEvent('No network connection'));
  })

  it('should be authenticated after login with correct credentials', () => {
    const token = 'thisShoudlBesomeJwTToken';
    const username = 'correct@is-user.at';

    service.login(username, 'real-password')
    .then(() => {
      expect(service.isLoggedIn).toBe(true);
      expect(service.AuthToken).toEqual(token);
      expect(service.Username).toEqual(username);
    });

    const req = httpMock.expectOne(`${authUrlBase}/login`);
    expect(req.request.method).toBe('POST');
    req.flush({
      id: 12,
      username,
      access_token: token
    }, {
      status: 200,
      statusText: 'Success'
    });
  })

  it('should be authenticated after signup', () => {
    const token = 'thisShoudlBesomeJwTToken';
    const username = 'correct@is-user.at';

    service.signup(username, 'real-password')
    .then(() => {
      expect(service.isLoggedIn).toBe(true);
      expect(service.AuthToken).toEqual(token);
      expect(service.Username).toEqual(username);
    });

    const req = httpMock.expectOne(`${authUrlBase}/signup`);
    expect(req.request.method).toBe('POST');
    req.flush({
      id: 12,
      username,
      access_token: token
    }, {
      status: 200,
      statusText: 'Success'
    });
  })

  it('should be unauthenticated after logout', () => {
    const token = 'thisShoudlBesomeJwTToken';
    const username = 'correct@is-user.at';

    // login and check login prior to logout
    service.login(username, 'real-password')
    .then(() => {
      expect(service.isLoggedIn).toBe(true);
      expect(service.AuthToken).toEqual(token);
      expect(service.Username).toEqual(username);

      service.logout();

      expect(service.isLoggedIn).toBe(false);
      expect(service.AuthToken).toBeFalsy();
      expect(service.Username).toBeFalsy();
    });

    const req = httpMock.expectOne(`${authUrlBase}/login`);
    expect(req.request.method).toBe('POST');
    req.flush({
      id: 12,
      username,
      access_token: token
    }, {
      status: 200,
      statusText: 'Success'
    });
  })

  it('should push auth state to stream',(done) => {
    let shouldBeLoggedIn = false;
    subscription = service.authStream.subscribe(authState => {
      expect(authState).toBe(shouldBeLoggedIn);
      if(!shouldBeLoggedIn) {
        shouldBeLoggedIn = true;
        service.loginAsGuest();
      } else {
        done();
      }
    });
  })

  it('should have no redirect url by default', () => {
    expect(service.hasRedirectPage()).toBe(false);
    expect(service.consumeRedirectPage()).toBeFalsy();
  })

  it('should return correct redirect url', () => {
    const url = '/somewhere/over/the/rainbow';
    service.setRedirectPage(url);
    expect(service.hasRedirectPage()).toBe(true);
    const redirectUrl = service.consumeRedirectPage();
    expect(redirectUrl).toEqual(url);
  })

  it('redirect should be consumed and only be available once', () => {
    service.setRedirectPage('/somepage');
    service.consumeRedirectPage();
    expect(service.hasRedirectPage()).toBe(false);
  })
});
