import { Component, Optional } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { Auth, getAuth } from '@angular/fire/auth';
import { where, getDocs, addDoc, onSnapshot, collection, doc, Firestore, orderBy, query, arrayRemove } from '@angular/fire/firestore';
import { getFunctions, httpsCallable } from '@angular/fire/functions';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent {

  user: any = [];
  item: any = [];
  stripeRole?: string;
  isloading: boolean = false;
  products: any = [];
  invoices: any = [];
  subscriptions: any = [];
  youtubeItems: any;

  constructor(
    @Optional() public auth: Auth,
    private readonly firestore: Firestore,
    public dialog: MatDialog
  ) {
    this.displayProducts();
  }

  // PRODUCT DIALOG
  openDialog(priceId: string, name: string, description: string, photo: string) {
    const dialogRef = this.dialog.open(ProductComponent, {
      maxWidth: '400px',
      data: {
        priceId: priceId,
        name: name,
        description: description,
        photo: photo,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // ✅ PAGINATOR
  pageIndex = 0;
  pageEvent!: PageEvent;
  public handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageIndex = e.pageIndex;
  }

  // ✅ DISPLAY PRODUCTS & PRICES
  async displayProducts() {
    const productRef = query(collection(this.firestore, 'products'), where('active', '==', true));
    const productSnap = await getDocs(productRef);
    const items: any = [];

    productSnap.forEach(async (doc) => {
      const productId = doc.id;
      const product: any = await doc.data();
      console.log('🛒 PRODUCT:', product);

      const priceRef = query(collection(this.firestore, 'products', productId, 'prices'), where('active', '==', true), where('type', '==', 'one_time'), orderBy('unit_amount'));
      const priceSnap = await getDocs(priceRef);

      priceSnap.forEach(async (doc) => {
        const priceId = doc.id;
        const price: any = await doc.data();
        console.log('🛒 PRICE:', price);

        if (price['active'] === true) {
          items.push({
            name: product.name,
            description: product.description, 
            billing_scheme: price['billing_scheme'],
            currency: price['currency'],
            type: price['type'],
            interval: price['interval'],
            price: ((price['unit_amount'] / 100).toFixed(0)),
            priceId,
            metadata: product['metadata'],
            image: product.images,
            photo: product.photos,
          });
        }
      });
      this.products = items;
    });
  }

  // ✅ CHECKOUT
  async checkout(price: string) {
    this.isloading = true // Spinner
    const user = this.auth.currentUser;

    const id = [];
    for (const prod of this.products) {
      id.push({
        price: prod.priceId,
      });
    }

    if (user) {
      const uid = user.uid;
      const checkoutRef = await addDoc(collection(this.firestore, 'customers', uid, 'checkout_sessions'), {
        // automatic_tax: true,
        // tax_id_collection: true,
        // tax_rates: [],
        // allow_promotion_codes: true,
        payment_method_types: ['card'],
        collect_shipping_address: true, // 🔥 Create shipping_countries doc at products collection, with arrray: allowed_countries, and add country codes to ship.

        // shipping_address_collection: {allowed_countries: ['US']},
        billing_address_collection: 'auto',
        line_items: [{
          price,
          quantity: 1,
        }],
        phone_number_collection: { enabled: true },
        mode: 'payment',
        success_url: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,// window.location.href,
        cancel_url: `${window.location.origin}/cancel?session_id={CHECKOUT_SESSION_ID}`,
        metadata: { key: 'value'},
        locale: 'en',
      });
     
      const unsubscribe = onSnapshot(doc(this.firestore, 'customers', uid, 'checkout_sessions', checkoutRef.id), (doc) => {
        const checkout: any = doc.data();
        if (checkout.url) {
          // console.log('Checkout URL: ', checkout.url);
          window.location.assign(checkout.url)
        } else if (checkout.error) {
          alert(`🙃 ${checkout.error.message}`);
          console.log('Error: ', checkoutRef.id, checkout.error.message);
          this.isloading = false;
        }
      });      
    }
  }
}
