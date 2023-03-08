import { Component } from '@angular/core';
import { getDocs, where, addDoc, collection, collectionData, doc, docData, getDoc, Firestore, increment, orderBy, query, serverTimestamp, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ocean',
  templateUrl: './ocean.component.html',
  styleUrls: ['./ocean.component.scss']
})
export class OceanComponent {
  invoices: any = [];
  item: any = [];
  // public customerId:any = this.route.snapshot.paramMap.get('id'); // public customerId:any = this.afAuth.auth.currentUser.uid;

  constructor(
    private route: ActivatedRoute,
    // private afAuth: AngularFireAuth,
    private firestore: Firestore,
  ) {
    this.getUserInvoices();
  }

  ngOnInit(): void {
  }

  // ✅ DISPLAY INVOICES
  // refactor this, new version 9.

  /*
    const customerId = this.route.snapshot.paramMap.get('id'); // const customerId = this.afAuth.auth.currentUser.uid;
    // const docRef = doc(this.firestore, 'customers', uid);
    const ref = this.afStore.collection('customers').ref;
    ref.doc(customerId)
      .collection('subscriptions')
      .where('status', 'in', ['trialing', 'active'])
      .get()
      .then(querySnapshot => {
        const items = [];
        querySnapshot.forEach(async function (doc) {
          const invoiceSnap = await doc.ref
            .collection('invoices')
            .where('status', '==', 'paid')
            //.orderBy('unit_amount')
            .get();
          
          invoiceSnap.docs.forEach((doc) => {
            const invoiceId = doc.id;
            const invoiceData = doc.data();
            // console.log('📄 USER INVOICES:', invoiceData);
            if (invoiceData.status === 'paid') {
              items.push({
                number: invoiceData.number,
                url: invoiceData.hosted_invoice_url,
                created: invoiceData.created * 1000,
                label: invoiceData.lines.data[0].price.nickname, // price name inside product at Stripe dashboard
                help: invoiceData.metadata.help,
                // clean: (invoiceData.amount_paid / 100 ) * (6), // x6 litres every 1$ spend.
                invoiceId,
              });
            }
          });
        });
        this.invoices = items;  
      });
      */

  // ✅ DISPLAY INVOICES
  async getUserInvoices() {
    const customerId: any = this.route.snapshot.paramMap.get('id');
    const subscriptionRef = query(collection(this.firestore, 'customers', customerId, 'subscriptions'), where('status', 'in', ['trialing', 'active']));
    const subscriptionSnap = await getDocs(subscriptionRef);
    const items: any = [];

    subscriptionSnap.forEach(async (doc) => {
      const subscriptionId = doc.id;
      const subscription: any = await doc.data();
      console.log('🛒 SUBSCRIPTION:', subscription);

      const invoiceRef = query(collection(this.firestore, 'customers', customerId, 'subscriptions', subscriptionId, 'invoices'), where('status', '==', 'paid')/* orderBy('unit_amount')*/);
      const invoiceSnap = await getDocs(invoiceRef);
      
      invoiceSnap.forEach(async (doc) => {
        const invoiceId = doc.id;
        const invoice: any = await doc.data();
        console.log('🛒 INVOICE:', invoice);

        if (invoice.status === 'paid') {
          items.push({
            number: invoice['number'],
            url: invoice['hosted_invoice_url'],
            created: invoice['created'] * 1000,
            // label: invoice.lines.data[0].price.nickname, // price name inside product at Stripe dashboard
            // help: invoice['metadata'].help,
            // clean: (invoiceData.amount_paid / 100 ) * (6), // x6 litres every 1$ spend.
            invoiceId,
            description: 'hello',
          });
        }
      });
      this.invoices = items;  
    });
  }
}
