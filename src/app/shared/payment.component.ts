import { Component } from '@angular/core';
import { orderBy } from '@angular/fire/firestore';
import { ClientRequest } from 'http';

@Component({
  selector: 'app-success',
  template: `
      <h1>Thanks for your order.</h1>
      <h3>Your payment has been received</h3>
      <!-- <mat-card>
      <mat-card-title>Thanks for your order.</mat-card-title>
      <mat-card-subtitle>Your payment has been received</mat-card-subtitle>
    </mat-card> -->
  `
})
export class PaymentComponent {

}
