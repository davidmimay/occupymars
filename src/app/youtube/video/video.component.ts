import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  videoUrl: string;
  videoId: string;
  comments: any[] = [];
  apiLoaded = false;
  
  private youtubeUrl:string = 'https://www.googleapis.com/youtube/v3';
  private apikey:string = environment.firebase.apiKey;

  constructor(
    private route: ActivatedRoute,
    public http:HttpClient,
  ) {
    this.videoId = this.route.snapshot.paramMap.get('id')!;
    this.getComments().subscribe(comments => this.comments = comments);
    this.videoUrl = `https://www.youtube.com/watch?v=${this.videoId}`;

  }

  getComments() {
    let url = `${ this.youtubeUrl }/commentThreads`;
    let params = new HttpParams();

    params = params.append('part', 'snippet, replies');
    params = params.append('maxResults', '5');
    params = params.append('videoId', this.videoId);
    params = params.append('key', this.apikey);


    return this.http.get( url, { params } ).pipe( map( (res: any) => {
      console.log(res);
      let comments: any[] = [];
      for ( let comment of res.items ) {
        let snippet = comment.snippet.topLevelComment.snippet;
        comments.push( snippet );
      }
      return comments;
    }) );

  }

  ngOnInit() {
    if (!this.apiLoaded) {
      // This code loads the IFrame Player API code asynchronously, according to the instructions at
      // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
  }

}
