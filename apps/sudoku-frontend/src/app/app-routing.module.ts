import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard.service';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard]
  }, {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'impress',
    loadChildren: () => import('./pages/impress/impress.module').then(m => m.ImpressModule)
  },
  {
    path: 'privacy',
    loadChildren: () => import('./pages/privacy/privacy.module').then(m => m.PrivacyModule)
  },
  {
    path: 'how-to-play',
    loadChildren: () => import('./pages/how-to-play/how-to-play.module').then(m => m.HowToPlayModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'classic-game',
    loadChildren: () => import('./pages/classic-game/classic-game.module').then(m => m.ClassicGameModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'diagonal-game',
    loadChildren: () => import('./pages/diagonal-game/diagonal-game.module').then(m => m.DiagonalGameModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'saved-games',
    loadChildren: () => import('./pages/saved-games/saved-games.module').then(m => m.SavedGamesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'color-game',
    loadChildren: () => import('./pages/color-game/color-game.module').then(m => m.ColorGameModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'diagonal-color-game',
    loadChildren: () => import('./pages/diagonal-color-game/diagonal-color-game.module').then(m => m.DiagonalColorGameModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'region-game',
    loadChildren: () => import('./pages/region-game/region-game.module').then(m => m.RegionGameModule),
    canActivate: [AuthGuard]
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
