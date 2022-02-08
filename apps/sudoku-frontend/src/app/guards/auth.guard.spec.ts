import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth-guard.service';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthStateService } from '@Services/auth-state.service';
import { Component } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

const loginRouteStateMock = {
  url: [{
    path: 'login'
  }]
} as ActivatedRouteSnapshot;

const homeRouteStateMock = {
  url: [{
    path: 'home'
  }]
} as ActivatedRouteSnapshot;

@Component({
  template: '<router-outlet></router-outlet>'
})
class RoutingComponent { }

@Component({
  template: ''
})
class DummyComponent { }

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {path: 'login', component: DummyComponent},
          {path: 'home', component: DummyComponent},
          {path: '', pathMatch: 'full', redirectTo: '/home'}
        ])
      ],
      declarations: [DummyComponent, RoutingComponent],
      providers: [AuthStateService]
    });
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthStateService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should block access for unauthenticated', () => {
    const canActivate = guard.canActivate(homeRouteStateMock, {url: '/home'} as RouterStateSnapshot);
    expect(canActivate).toBe(false);
  })

  it('should allow access for authenticated', () => {
    authService.loginAsGuest();
    const canActivate = guard.canActivate(homeRouteStateMock, {url: '/home'} as RouterStateSnapshot);
    expect(canActivate).toBe(true);
  })

  it('should allow access to /login for unauthenticated', () => {
    const canActivate = guard.canActivate(loginRouteStateMock, {url: '/login'} as RouterStateSnapshot);
    expect(canActivate).toBe(true);
  })

  it('should block access to /login for authenticated', () => {
    authService.loginAsGuest();
    const canActivate = guard.canActivate(loginRouteStateMock, {url: '/login'} as RouterStateSnapshot);
    expect(canActivate).toBe(false);
  })

  it('should store blocked url in redirect', () => {
    guard.canActivate(homeRouteStateMock, {url: '/home'} as RouterStateSnapshot);
    expect(authService.hasRedirectPage()).toBe(true);
    expect(authService.consumeRedirectPage()).toEqual('/home');
  })
});
