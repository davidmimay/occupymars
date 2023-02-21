import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { SnackService } from '../shared/snack.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: Auth,
    private snack: SnackService,
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    // state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return true;
    
    state: RouterStateSnapshot): Promise <boolean> {
      const user = this.auth.currentUser;
      const isLoggedIn = !!user;
      if (!isLoggedIn) {
        this.snack.authError();
      }
      return isLoggedIn;
    }
}
