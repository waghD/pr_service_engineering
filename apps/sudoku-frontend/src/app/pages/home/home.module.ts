import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { HeaderComponent } from '../header/header.component';
import { ImpressComponent } from '../impress/impress.component';
import { HowToPlayComponent } from '../how-to-play/how-to-play.component';
import { PrivacyComponent } from '../privacy/privacy.component';
import { AppModule } from '../../app.module';


const routes: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    ImpressComponent,
    HowToPlayComponent,
    PrivacyComponent
  ],
  exports: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AppModule
  ]
})
export class HomeModule { }
