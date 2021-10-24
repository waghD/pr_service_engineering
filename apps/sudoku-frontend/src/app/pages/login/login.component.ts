import { Component } from '@angular/core';
import { AuthStateService } from '../../services/auth-state.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'se-sudoku-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private router: Router, private authService: AuthStateService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required])
    });
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
