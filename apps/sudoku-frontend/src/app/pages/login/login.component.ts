import { Component } from '@angular/core';
import { AuthStateService } from '../../services/auth-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'se-sudoku-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private router: Router, private authService: AuthStateService) {
  }

  login() {
    this.authService.login();
    if(this.authService.hasRedirectPage()) {
      this.router.navigateByUrl(this.authService.consumeRedirectPage());
    } else {
      this.router.navigateByUrl('/');
    }
  }

}
