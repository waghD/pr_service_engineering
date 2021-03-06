import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColorGameRoutingModule } from './color-game-routing.module';
import { ColorGameComponent } from './color-game.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    ColorGameComponent
  ],
  imports: [
    CommonModule,
    ColorGameRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatDialogModule
  ]
})
export class ColorGameModule {
}
