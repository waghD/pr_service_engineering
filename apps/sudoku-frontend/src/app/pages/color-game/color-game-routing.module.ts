import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColorGameComponent } from './color-game.component';

const routes: Routes = [{ path: '', component: ColorGameComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColorGameRoutingModule { }
