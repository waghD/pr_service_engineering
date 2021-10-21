import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoGuard } from './guards/demo.guard';
import { ImpressComponent } from './pages/impress/impress.component';
import { HowToPlayComponent } from './pages/how-to-play/how-to-play.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  }, {
    path: '',
    component: HomeComponent
  }, {
    path: 'impress',
    component: ImpressComponent
  },
  {
    path: 'how-to-play',
    component: HowToPlayComponent
  }, {
    path: 'privacy',
    component: PrivacyComponent
  },
  {
    path: '**',
    loadChildren: () => import('./pages/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
