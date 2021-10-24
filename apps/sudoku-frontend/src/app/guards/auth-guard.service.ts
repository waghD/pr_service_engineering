import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthStateService } from '../services/auth-state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthStateService) {
  }

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
    console.log('route: ', route);
    console.log('state: ', state);
    if(route.url.some((segment) => segment.path === 'login')) {
      // already on /login. Redirect already authenticated users to /home
      if(this.authService.isLoggedIn) {
        this.router.navigateByUrl('/');
        return false;
      } else {
        return true;
      }
    }

    // on protected route. Redirect unauthenticated users to /login
    if(this.authService.isLoggedIn) {
      return true;
    } else {
      this.authService.setRedirectPage(state.url);
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
