import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { YoutubeRoutingModule } from './youtube-routing.module';
import { PlaylistComponent } from './playlist/playlist.component';
import { VideoComponent } from './video/video.component';



@NgModule({
  declarations: [
    PlaylistComponent,
    VideoComponent
  ],
  imports: [
    CommonModule,
    YoutubeRoutingModule,
    SharedModule,
  ]
})
export class YoutubeModule { }
