import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassicGameComponent } from './classic-game.component';

const routes: Routes = [{ path: '', component: ClassicGameComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassicGameRoutingModule {
}
