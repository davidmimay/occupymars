import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    private title: Title,
    private meta: Meta,
    private router: Router
  ) { }

  generateTags({ title = '', description = '', image = '' }) {

    this.title.setTitle(title);
    this.meta.addTags([
      // Open Graph
      { name: 'og:url', content: `${window.location.origin}/${this.router.url}` },
      { name: 'og:title', content: title },
      { name: 'og:description', content: description },
      { name: 'og:image', content: image },
      // Twitter Card
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: environment.google.twitterId },
    ]);
  }
}
