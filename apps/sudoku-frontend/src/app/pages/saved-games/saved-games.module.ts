import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SavedGamesRoutingModule } from './saved-games-routing.module';
import { SavedGamesComponent } from './saved-games.component';
import { SharedModule } from '../../shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    SavedGamesComponent
  ],
  imports: [
    CommonModule,
    SavedGamesRoutingModule,
    SharedModule,
    MatDialogModule
  ]
})
export class SavedGamesModule { }
