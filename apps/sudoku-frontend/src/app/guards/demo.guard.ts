import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DemoGuard implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
    console.log('DemoGuard route: ', route.url);
    console.log('DemoGuard state: ', state.url);
    return true;
  }
}
