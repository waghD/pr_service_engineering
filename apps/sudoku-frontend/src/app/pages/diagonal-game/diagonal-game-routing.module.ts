import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiagonalGameComponent } from './diagonal-game.component';

const routes: Routes = [{ path: '', component: DiagonalGameComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiagonalGameRoutingModule { }
