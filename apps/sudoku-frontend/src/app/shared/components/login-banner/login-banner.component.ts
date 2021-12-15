import { Component, OnInit } from '@angular/core';
import { AuthStateService } from '../../../services/auth-state.service';
import { LoginBannerService } from './login-banner.service';

@Component({
  selector: 'se-sudoku-login-banner',
  templateUrl: './login-banner.component.html',
  styleUrls: ['./login-banner.component.scss']
})
export class LoginBannerComponent implements OnInit {


  constructor(public authService: AuthStateService, private loginBannerService: LoginBannerService) {
  }

  ngOnInit(): void {
    console.log(this.authService);
    console.log(this.authService.isLoggedIn);
    console.log(this.authService.Username);
  }

  logoutButtonClicked() {
    this.loginBannerService.logout();
  }


}
