import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HowToPlayRoutingModule } from './how-to-play-routing.module';
import { HowToPlayComponent } from './how-to-play.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    HowToPlayComponent
  ],
  imports: [
    CommonModule,
    HowToPlayRoutingModule,
    SharedModule
  ]
})
export class HowToPlayModule {
}
