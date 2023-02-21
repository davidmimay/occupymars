import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent {

  // playlistId: string;
  playlistUrl: string;
  safeUrl: any;
  // githubUrl: string;

  videos: any[] = [];

  private youtubeUrl:string = 'https://www.googleapis.com/youtube/v3';
  // private apikey:string = environment.firebase.apiKey;
  private playlistId: string = environment.google.playlistId;

  constructor(
    private route: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public http:HttpClient,
  ) {
    // this.playlistId = this.route.snapshot.paramMap.get('id');
    this.playlistUrl = `https://www.youtube.com/embed/videoseries?list=${this.playlistId}`;
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.playlistUrl);
    // this.githubUrl = `https://www.github.com/ethtomars/${this.playlistId}`;
    this.getVideos().subscribe(videos => this.videos = videos);
  }

  getVideos() {
    let url = `${ this.youtubeUrl }/playlistItems`;
    let params = new HttpParams();

    params = params.append('part', 'snippet');
    params = params.append('maxResults', '100');
    params = params.append('playlistId', this.playlistId);
    params = params.append('key', environment.firebase.apiKey);

    return this.http.get( url, { params } ).pipe( map( (res: any) => {
      console.log(res);
      let videos: any[] = [];
      for ( let video of res.items ) {
        videos.push( video.snippet );
      }
      return videos;
    }) );

  }

}
