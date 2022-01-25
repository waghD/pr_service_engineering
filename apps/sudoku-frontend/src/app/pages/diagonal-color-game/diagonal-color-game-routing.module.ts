import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiagonalColorGameComponent } from './diagonal-color-game.component';

const routes: Routes = [{ path: '', component: DiagonalColorGameComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiagonalColorGameRoutingModule { }
