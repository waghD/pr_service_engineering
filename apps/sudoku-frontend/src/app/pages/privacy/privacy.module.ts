import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivacyRoutingModule } from './privacy-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { PrivacyComponent } from './privacy.component';


@NgModule({
  declarations: [
    PrivacyComponent
  ],
  imports: [
    CommonModule,
    PrivacyRoutingModule,
    SharedModule
  ]
})
export class PrivacyModule {
}
