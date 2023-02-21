import { Component, Optional } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { Auth, getAuth, User, authState, onAuthStateChanged } from '@angular/fire/auth';
import { EMPTY, Observable } from 'rxjs';
import { where, getDocs, addDoc, onSnapshot, collection, doc, Firestore, orderBy, query } from '@angular/fire/firestore';
import { getFunctions, httpsCallable } from '@angular/fire/functions';
import { environment } from 'src/environments/environment';


// There is some kind of configuration portal on stripe and a ID to write.
// array de fotos en upgrade de la misma forma que aqui.

@Component({
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  
  payments: any = [];

  constructor(
    // private readonly auth: Auth,
    private readonly firestore: Firestore,
    private app: FirebaseApp
  ) {
    this.checkUserPayments();
  }

  // ✅ GET USER PRODUCTS
  // ℹ️ https://stripe.com/docs/payments/payment-intents/verifying-status
  private checkUserPayments() {
    const items: any = [];
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;   
        const paymentRef = query(collection(this.firestore, 'customers', uid, 'payments'), where('status', '==', 'succeeded'));
        const unsubscribe = onSnapshot(paymentRef, (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const payment = doc.data();
            // console.log('📄 ACTIVE PAYMENT:', payment);
            items.push({
              created: payment['created'],
              amount: ((payment['amount'] / 100).toFixed(0)),
              receipt_url: payment['charges'].data[0].receipt_url,
              status: payment['status'],
              currency: payment['currency'],
              items: payment['items'],
            });
          });
        });
        this.payments = items; 
      }
    });
  }
}