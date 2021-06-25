import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalCabinetPage } from './pages/personal-cabinet/personal-cabinet.page';

const routes: Routes = [
  {
    path: '',
    component: PersonalCabinetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalCabinetRoutingModule {}
