import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BloggerService {

  page: any;
  pages: any[] = [];
  posts: any[] = [];
  private bloggerId: string = environment.google.bloggerId;
  private bloggerUrl: string = 'https://www.googleapis.com/blogger/v3';
  private label: string = environment.firebase.projectId;
  private apikey: string = environment.firebase.apiKey; // 🔥 Enable Blogger API on GCP

  constructor(
    public http:HttpClient,
  ) {}

  // 🟢 Get Specific page from blogger using API.
  // GET PAGE: https://www.googleapis.com/blogger/v3/blogs/4967929378133675647/pages/273541696466681878?key=YOUR-API-KEY
  getBloggerPage(id: string) {
    let url = `${this.bloggerUrl }/blogs/${this.bloggerId}/pages/${id}`;
    let params = new HttpParams();
    params = params.append('key', this.apikey);

    return this.http.get( url, { params } ).pipe( map( (res: any) => {
      // console.log('📋 Page detail:', res);
      let page = res;
      return page;
    }) );
  }

  // 🟢 Get List of pages from blogger using API.
  // SAMPLE PAGES: https://www.googleapis.com/blogger/v3/blogs/4967929378133675647/pages?key=YOUR-API-KEY
  getBloggerPages() {
    let url = `${ this.bloggerUrl }/blogs/${this.bloggerId}/pages`;
    let params = new HttpParams();
    params = params.append('key', this.apikey);

    return this.http.get( url, { params } ).pipe( map( (res: any) => {
      // console.log('📋 Page list:', res);
      let pages: any[] = [];
      for ( let page of res.items ) {
        let snippet = page;
        pages.push( snippet );
      }
      return pages;
    }) );
  }

  // 🟢 Get Posts from blogger using API.
  // GET POST: https://www.googleapis.com/blogger/v3/blogs/2399953/posts?labels=yourlabel&key=YOUR-API-KEY
  getBloggerPosts() {
    let url = `${ this.bloggerUrl }/blogs/${this.bloggerId}/posts`;
    let params = new HttpParams();
    params = params.append('labels', this.label);
    params = params.append('key', this.apikey);

    return this.http.get( url, { params } ).pipe( map( (res: any) => {
      // console.log('📋 Posts:', res);
      let posts: any[] = [];
      for ( let post of res.items ) {
        let snippet = post;
        posts.push( snippet );
      }
      return posts;
    }) );
  }

}