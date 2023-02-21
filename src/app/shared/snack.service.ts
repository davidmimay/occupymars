import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SnackService {
  constructor(
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  authError() {
    this.snackBar.open('You must be logged in!', 'OK', {
      duration: 5000
    });

    return this.snackBar._openedSnackBarRef!
      .onAction()
      .pipe(tap(_ => this.router.navigate(['/user'])))
      .subscribe();
  }

  success(){
    this.snackBar.open('Sucess', 'OK', {
      duration: 5000
    });
  }
  getSuccessDetail(info: string) {
    if (info === 'cardApplication') {
      this.snackBar.open('Customer Successfully Registered!');
    }
    if (info === 'addBank') {
      this.snackBar.open('Bank Successfully Added to your Account!');
    }
    if (info === 'addFunds') {
      this.snackBar.open('Funds Successfully Added to your Account!');
    }
  }
}
