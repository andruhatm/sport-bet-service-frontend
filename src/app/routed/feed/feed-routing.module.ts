import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPage } from './pages/main/main.page';
import { BetsComponent } from './components/bets/bets.component';
import { PlaceBetComponent } from './components/place-bet/place-bet.component';

const routes: Routes = [
  {
    path: '',
    component: MainPage
  },
  {
    path: 'bets',
    component: BetsComponent
  },
  {
    path: 'placeBet/:id',
    component: PlaceBetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedRoutingModule {}
