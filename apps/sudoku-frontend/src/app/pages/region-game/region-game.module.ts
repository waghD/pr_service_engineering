import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegionGameRoutingModule } from './region-game-routing.module';
import { RegionGameComponent } from './region-game.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


@NgModule({
  declarations: [
    RegionGameComponent
  ],
  imports: [
    CommonModule,
    RegionGameRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatSlideToggleModule
  ]
})
export class RegionGameModule {
}
