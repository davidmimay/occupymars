import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './page/page.component';
import { FeedComponent } from './feed/feed.component';

const routes: Routes = [
  { path: 'feed', component: FeedComponent },
  { path: 'page/:id', component: PageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
