import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthStateService } from '../../../services/auth-state.service';

@Injectable({
  providedIn: 'root'
})
export class LoginBannerService {

  private baseApiURL = 'http://localhost:8080/api';

  public readonly title = 'service-frontend';

  constructor(private readonly http: HttpClient, private authService: AuthStateService) {
  }

  public logout(): void {
    //TODO: perform logout in RC 3
    console.log('do logout...');
  }

}
