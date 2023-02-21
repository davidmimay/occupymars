import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaylistComponent } from './playlist/playlist.component';
import { VideoComponent } from './video/video.component';

const routes: Routes = [
  { path: '', component: PlaylistComponent },
  // { path: ':id', component: VideoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class YoutubeRoutingModule { }
