import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { LoginBannerComponent } from './components/login-banner/login-banner.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoginBannerComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LoginBannerComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule {
}
