import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutPage } from './routed/shared/pages/about-page/about.page';
import { NotFoundPage } from './routed/shared/pages/not-found-page/not-found-.page';
import { HomePage } from './routed/shared/pages/home-page/home.page';
import { AuthGuards } from './auth.guards';

const routes: Routes = [
  {
    path: 'feed',
    loadChildren: () => import('./routed/feed/feed.module').then((m) => m.FeedModule)
  },
  {
    path: 'personal-cabinet',
    loadChildren: () => import('./routed/personal-cabinet/personal-cabinet.module').then((m) => m.PersonalCabinetModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./routed/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'about',
    component: HomePage
  },
  {
    path: '**',
    component: NotFoundPage
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy', onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
