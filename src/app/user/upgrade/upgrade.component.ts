import { Component,Optional } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { Auth, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { where, getDocs, addDoc, onSnapshot, collection, doc, Firestore, orderBy, query } from '@angular/fire/firestore';
import { getFunctions, httpsCallable } from '@angular/fire/functions';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.scss']
})
export class UpgradeComponent {

  user: any = [];
  item: any = [];
  stripeRole?: string;
  isloading: boolean = false;
  products: any = [];
  invoices: any = [];
  subscriptions: any = [];
  
  constructor(
    @Optional() public auth: Auth,
    private readonly firestore: Firestore,
    private app: FirebaseApp
  ) {
    this.displayProducts();
    this.checkUserSubscriptions();
    this.getCustomClaimRole();
  }
  
  // ✅ DISPLAY PRODUCTS & PRICES
  async displayProducts() {
    const productRef = query(collection(this.firestore, 'products'), where('active', '==', true));
    const productSnap = await getDocs(productRef);
    const items: any = [];

    productSnap.forEach(async (doc) => {
      const productId = doc.id;
      const product: any = await doc.data();
      // console.log('🛒 PRODUCT:', product);

      const priceRef = query(collection(this.firestore, 'products', productId, 'prices'), where('active', '==', true), where('type', '==', 'recurring'), orderBy('unit_amount'));
      const priceSnap = await getDocs(priceRef);

      priceSnap.forEach(async (doc) => {
        const priceId = doc.id;
        const price: any = await doc.data();
        console.log('🛒 PRICE:', price);

        if (price['active'] === true) {
          items.push({
            name: product.name,
            image: product.images[0],
            description: product.description,
            billing_scheme: price['billing_scheme'],
            currency: price['currency'],
            type: price['type'],
            interval: price['interval'],
            price: ((price['unit_amount'] / 100).toFixed(0)),
            priceId,
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
        quantity: 1
      });
    }

    if (user) {
      const uid = user.uid;
      const checkoutRef = await addDoc(collection(this.firestore, 'customers', uid, 'checkout_sessions'), {
        // automatic_tax: true,
        // tax_id_collection: true,
        // tax_rates: [],
        client: 'web',
        billing_address_collection: 'auto',
        payment_method_types: ['card'],
        allow_promotion_codes: true,
        line_items: [{
          price,
          quantity: 1
        }],
        mode: 'subscription',
        success_url: `${window.location.origin}/success`,// window.location.href,
        cancel_url: `${window.location.origin}/cancel`,
        metadata: { key: 'value'},
        locale: 'en',
      });
     
      const unsubscribe = onSnapshot(doc(this.firestore, 'customers', uid, 'checkout_sessions', checkoutRef.id), (doc) => {
        const checkout: any = doc.data();
        if (checkout.url) {
          // console.log("Checkout URL: ", checkout.url);
          window.location.assign(checkout.url)
        } else if (checkout.error) {
          alert(`🙃 ${checkout.error.message}`);
          console.log("Error: ", checkoutRef.id);
          console.log("Error: ", checkout.error.message);
          this.isloading = false;
        }
      });      
    }
  }
    
  // ✅ GET USER SUBSCRIPTIONS
  private checkUserSubscriptions() {
    const items: any = [];
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;        
        const subscriptionRef = query(collection(this.firestore, 'customers', uid, 'subscriptions'), where('status', '==', 'active')); // where('status', 'in', ['trialing', 'active']));
        const unsubscribe = onSnapshot(subscriptionRef, (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const subscription = doc.data();
            console.log('📄 ACTIVE SUBSCRIPTION:', subscription);

            items.push({
              nextPayment: subscription['current_period_end'].seconds * 1000,
              // status: subscription['status'],
              // role: subscription['role'],
              // priceId: subscription['price'].id,
              interval: subscription['items'][0].plan.interval,
              currency: subscription['items'][0].plan.currency,
              price: ((subscription['items'][0].plan.amount / 100).toFixed(0)),
              name: subscription['items'][0].price.product.name,
              description: subscription['items'][0].price.product.description,
              active: subscription['items'][0].price.active,
            });
            
          });
        });
        this.subscriptions = items; 
      }
    });
  }

  // ✅ CUSTOMER PORTAL
  // ℹ️ https://firebase.google.com/docs/functions/callable#web-version-9_2
  async accessCustomerPortal() {
    this.isloading = true // Spinner
    const region = getFunctions(this.app, environment.firebase.locationId);
    const functionRef = await httpsCallable(region, 'ext-firestore-stripe-subscriptions-createPortalLink'); // 🔥 Change 'subscriptions' to 'payments'
    await functionRef({ returnUrl: window.location.origin }) // 'window.location.href' to return to same page, or: `${window.location.origin}/account`})
      .then(({ data }: any) => window.location.assign(data.url))
      .catch((error) => console.trace(error.message));  
  }
  
  // ✅ STRIPE ROLES
  // IMPORTANT: at Stripe dashboard/product add metadata field: 'firebaseRole' and example value: 'premium'
  async getCustomClaimRole() {
    await this.auth.currentUser?.getIdToken(true);
    const decodedToken = await this.auth.currentUser?.getIdTokenResult();
    console.log('👤 USER ROLE:', decodedToken?.claims['stripeRole']);
    this.stripeRole = decodedToken?.claims['stripeRole'];
    return decodedToken?.claims['stripeRole'] || 'free';
  }
}