import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegionGameComponent } from './region-game.component';

const routes: Routes = [{ path: '', component: RegionGameComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegionGameRoutingModule {
}
