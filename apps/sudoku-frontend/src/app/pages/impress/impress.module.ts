import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImpressRoutingModule } from './impress-routing.module';
import { ImpressComponent } from './impress.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    ImpressComponent
  ],
  imports: [
    CommonModule,
    ImpressRoutingModule,
    SharedModule
  ]
})
export class ImpressModule {
}
