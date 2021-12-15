import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginBannerComponent } from './login-banner.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginBannerComponent', () => {
  let component: LoginBannerComponent;
  let fixture: ComponentFixture<LoginBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [LoginBannerComponent]
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
