import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassicGameRoutingModule } from './classic-game-routing.module';
import { ClassicGameComponent } from './classic-game.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ClassicGameComponent
  ],
  imports: [
    CommonModule,
    ClassicGameRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ClassicGameModule {
}
