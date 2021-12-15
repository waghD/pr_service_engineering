import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiagonalGameRoutingModule } from './diagonal-game-routing.module';
import { DiagonalGameComponent } from './diagonal-game.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


@NgModule({
  declarations: [
    DiagonalGameComponent
  ],
  imports: [
    CommonModule,
    DiagonalGameRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatSlideToggleModule
  ]
})
export class DiagonalGameModule { }
