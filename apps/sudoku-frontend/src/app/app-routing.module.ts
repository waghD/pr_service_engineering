import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoGuard } from './guards/demo.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },{
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
    canActivate: [DemoGuard]
  },
  {
    path: '**',
    loadChildren: () => import('./pages/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
