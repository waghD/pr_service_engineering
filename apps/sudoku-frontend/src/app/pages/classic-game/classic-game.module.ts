import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassicGameRoutingModule } from './classic-game-routing.module';
import { ClassicGameComponent } from './classic-game.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    ClassicGameComponent
  ],
  imports: [
    CommonModule,
    ClassicGameRoutingModule,
    SharedModule
  ]
})
export class ClassicGameModule {
}
