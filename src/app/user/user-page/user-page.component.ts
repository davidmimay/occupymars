import { Component, Optional } from '@angular/core';
import { Auth, authState, User } from '@angular/fire/auth';
import { EMPTY, Observable } from 'rxjs';
import { SeoService } from 'src/app/shared/seo.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent {
  public user: Observable<User | null> = EMPTY;
  public url = window.location.origin;

  constructor(
    @Optional() public auth: Auth,
    private seo: SeoService
  ) {
    this.user = authState(auth);
    this.seo.generateTags({ title: 'User', description: 'User page to edit data and mannage payments'});
  }

  alertCopy() {
     alert(`Link copied 👍`);
  }

  

}