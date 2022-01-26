import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiagonalColorGameRoutingModule } from './diagonal-color-game-routing.module';
import { DiagonalColorGameComponent } from './diagonal-color-game.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    DiagonalColorGameComponent
  ],
  imports: [
    CommonModule,
    DiagonalColorGameRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatDialogModule
  ]
})
export class DiagonalColorGameModule {
}
