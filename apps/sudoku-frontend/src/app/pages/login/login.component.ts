import { Component } from '@angular/core';
import { AuthStateService } from '@Services/auth-state.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'se-sudoku-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  createAccount = false;

  constructor(private router: Router, private authService: AuthStateService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  toggleMode() {
    this.createAccount = !this.createAccount;
    this.loginForm.reset();
  }

  async login() {
    if(this.loginForm.invalid) {
      return;
    }
    const username = this.loginForm.get('email')?.value ?? '';
    const password = this.loginForm.get('password')?.value ?? '';
    if(!username || !password) {
      return;
    }
    if(this.createAccount) {
      const responseCode = await this.authService.signup(username, password);
      if (responseCode === 401) {
        this.loginForm.get('email')?.setErrors({
          'taken': true
        });
      }
      if (responseCode === 200) {
        this.loginForm.get('email')?.setErrors({});
      }
    } else {
      const responseCode = await this.authService.login(username, password);
      if (responseCode === 401) {
        this.loginForm.get('email')?.setErrors({
          'em-wrong': true
        });
      }
      if (responseCode === 402) {
        this.loginForm.get('password')?.setErrors({
          'pw-wrong': true
        });
      }
      if (responseCode === 200) {
        this.loginForm.get('email')?.setErrors({});
      }
    }
    if(this.authService.hasRedirectPage()) {
      this.router.navigateByUrl(this.authService.consumeRedirectPage());
    } else {
      this.router.navigateByUrl('/');
    }
  }

  loginAsGuest() {
    this.authService.loginAsGuest();
    if(this.authService.hasRedirectPage()) {
      this.router.navigateByUrl(this.authService.consumeRedirectPage());
    } else {
      this.router.navigateByUrl('/');
    }
  }

}
