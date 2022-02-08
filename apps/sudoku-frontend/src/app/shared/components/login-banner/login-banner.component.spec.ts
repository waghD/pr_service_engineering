import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginBannerComponent } from './login-banner.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthStateService } from '../../../services/auth-state.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LoginBannerComponent', () => {
  let component: LoginBannerComponent;
  let fixture: ComponentFixture<LoginBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthStateService, {
        provide: Router,
        useClass: RouterTestingModule
      }],
      declarations: [LoginBannerComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
