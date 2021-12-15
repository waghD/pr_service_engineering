import { TestBed } from '@angular/core/testing';

import { AuthStateService } from './auth-state.service';
import { Subscription } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthStateService', () => {
  let service: AuthStateService;
  let subscription: Subscription;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{
        provide: Router,
        useClass: RouterTestingModule
      }]
    });
    service = TestBed.inject(AuthStateService);
  });

  afterEach(() => {
    if(subscription && !subscription.closed) {
      subscription.unsubscribe();
    }
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be unauthenticated by default', () => {
    expect(service.isLoggedIn).toBe(false);
  })

  it('should be authenticated after login', () => {
    service.loginAsGuest();
    expect(service.isLoggedIn).toBe(true);
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
