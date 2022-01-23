import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SavedGamesRoutingModule } from './saved-games-routing.module';
import { SavedGamesComponent } from './saved-games.component';


@NgModule({
  declarations: [
    SavedGamesComponent
  ],
  imports: [
    CommonModule,
    SavedGamesRoutingModule
  ]
})
export class SavedGamesModule { }
