import { Component, OnInit } from '@angular/core';
import { AuthStateService } from '../../../services/auth-state.service';

@Component({
  selector: 'se-sudoku-login-banner',
  templateUrl: './login-banner.component.html',
  styleUrls: ['./login-banner.component.scss']
})
export class LoginBannerComponent implements OnInit {

  constructor(public authService: AuthStateService) {
  }

  logoutButtonClicked() {
    this.authService.logout();
  }

}
