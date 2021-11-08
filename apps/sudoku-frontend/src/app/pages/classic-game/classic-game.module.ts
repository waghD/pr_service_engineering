import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassicGameRoutingModule } from './classic-game-routing.module';
import { ClassicGameComponent } from './classic-game.component';


@NgModule({
  declarations: [
    ClassicGameComponent
  ],
  imports: [
    CommonModule,
    ClassicGameRoutingModule
  ]
})
export class ClassicGameModule {
}
