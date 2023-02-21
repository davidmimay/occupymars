import { Component } from '@angular/core';
import { SeoService } from 'src/app/shared/seo.service';
import { EMPTY, Observable } from 'rxjs';
import { Auth, authState, User, GoogleAuthProvider, signInWithPopup, getAuth, signInWithRedirect } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

declare var gapi: any;

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent {

  public user: Observable<User | null> = EMPTY;
  public youtubeItems: any = [];
  public youtubeId: string = environment.google.youtubeId;
  
  constructor(
    public auth: Auth,
    private seo: SeoService
  ) {
    this.seo.generateTags({ title: 'Subscribe', description: 'Subscribe to see more content'});
    this.user = authState(auth);
    this.initClient();
    this.getYoutuber();
  }

  // ✅ INIT CLIENT YOUTUBE
  // ℹ️ https://fireship.io/lessons/google-calendar-api-with-firebase/
  initClient() {
    gapi.load('client', () => {
      console.log('loaded client')
      gapi.client.init({
        apiKey: environment.firebase.apiKey, // 🔥 Enable Youtube API on GCP
        clientId: environment.google.authClientId, // 🔥 Find OAuth2 ClientID on https://console.cloud.google.com/apis/credentials
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
        scope: 'https://www.googleapis.com/auth/youtube.readonly'
      })
      gapi.client.load('youtube', 'v3', () => console.log('loaded youtube'));
    });
  }

  // ✅ CHECK YOUTUBE STATUS
  async getYoutuber() {
    await gapi.client.load("youtube", "v3");
    const events = await gapi.client.youtube.subscriptions.list({
      part: ['snippet,contentDetails'],
      forChannelId: environment.google.youtubeId,
      mine: true
      })
      console.log(events)
      this.youtubeItems = events.result.items;
  }

}
