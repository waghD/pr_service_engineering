import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { LoginBannerComponent } from './components/login-banner/login-banner.component';
import { FinishSudokuButtonComponent } from './components/finish-sudoku-button/finish-sudoku-button.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoginBannerComponent,
    FinishSudokuButtonComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LoginBannerComponent,
    FinishSudokuButtonComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule {
}
