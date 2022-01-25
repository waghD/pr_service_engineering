import { Component } from '@angular/core';
import { AuthStateService } from '../../../services/auth-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'se-sudoku-login-banner',
  templateUrl: './login-banner.component.html',
  styleUrls: ['./login-banner.component.scss']
})
export class LoginBannerComponent {

  constructor(public authService: AuthStateService, public router: Router) {
  }

  logoutButtonClicked() {
    this.authService.logout();
  }

}
