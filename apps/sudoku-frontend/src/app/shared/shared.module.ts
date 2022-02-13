import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { LoginBannerComponent } from './components/login-banner/login-banner.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { FinishSudokuButtonComponent } from './components/finish-sudoku-button/finish-sudoku-button.component';
import { GenericInfoDialogComponent } from './components/generic-info-dialog/generic-info-dialog.component';
import { SudokuTypeSelectionComponent } from '../pages/home/sudoku-type-selection/sudoku-type-selection.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoginBannerComponent,
    FinishSudokuButtonComponent,
    LoginBannerComponent,
    DeleteDialogComponent,
    GenericInfoDialogComponent,
    SudokuTypeSelectionComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LoginBannerComponent,
    FinishSudokuButtonComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class SharedModule {
}
