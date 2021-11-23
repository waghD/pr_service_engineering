import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiagonalGameRoutingModule } from './diagonal-game-routing.module';
import { DiagonalGameComponent } from './diagonal-game.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DiagonalGameComponent
  ],
  imports: [
    CommonModule,
    DiagonalGameRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class DiagonalGameModule { }
