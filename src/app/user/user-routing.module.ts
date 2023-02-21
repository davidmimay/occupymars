import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPageComponent } from '../user/user-page/user-page.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', component: UserPageComponent},
  { path: ':id', component: ProfileComponent},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
