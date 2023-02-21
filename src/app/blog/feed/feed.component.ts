import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BloggerService } from '../blogger.service';
import { SeoService } from 'src/app/shared/seo.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent {

  posts: any = [];

  constructor(
    private seo: SeoService,
    public http:HttpClient,
    public bloggerService: BloggerService,
  ) {
    this.bloggerService.getBloggerPosts().subscribe(posts => this.posts = posts);
    this.seo.generateTags({ title: 'Blog Feed', description: 'A feed of blog posts' });
  }

}