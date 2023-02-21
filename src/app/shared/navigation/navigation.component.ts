import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { Auth, authState, User } from '@angular/fire/auth';
import { EMPTY, Observable } from 'rxjs';
import { BloggerService } from 'src/app/blog/blogger.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  public user: Observable<User | null> = EMPTY;
  public pages: any[] = [];
  public app = environment.firebase.projectId;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public auth: Auth,
    public bloggerService: BloggerService,
  ) {
    this.user = authState(auth);
    
    //🟢 Dynamic menu: get a list of the blogger pages.
    this.bloggerService.getBloggerPages().subscribe(pages => this.pages = pages);
  }

}
