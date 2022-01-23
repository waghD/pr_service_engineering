import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SavedGamesComponent } from './saved-games.component';

const routes: Routes = [{ path: '', component: SavedGamesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SavedGamesRoutingModule { }
