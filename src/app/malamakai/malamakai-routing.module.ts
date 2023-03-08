import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from 'src/app/malamakai/page/page.component';

const routes: Routes = [
  { path: '', component: PageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MalamakaiRoutingModule { }
