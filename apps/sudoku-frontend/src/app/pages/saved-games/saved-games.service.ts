import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthStateService } from '../../services/auth-state.service';

@Injectable({
  providedIn: 'root'
})
export class SavedGamesService {

  public readonly title = 'service-frontend';
  private baseApiURL = 'http://localhost:8080/api';

  constructor(private readonly http: HttpClient, private authStateService: AuthStateService) {
  }

}
