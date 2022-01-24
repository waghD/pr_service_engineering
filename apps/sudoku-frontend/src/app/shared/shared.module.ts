import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { LoginBannerComponent } from './components/login-banner/login-banner.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoginBannerComponent,
    DeleteDialogComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LoginBannerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule
  ]
})
export class SharedModule {
}
