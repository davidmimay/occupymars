import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { doc, onSnapshot, Firestore } from '@angular/fire/firestore';
// import { ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';


@Component({
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  priceId: any;
  product: any;

  constructor(
    // private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firestore: Firestore,
  ) {
    // const productId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    console.log('Price:', this.data);
    const unsub = onSnapshot(doc(this.firestore, 'products', this.data.priceId), (doc) => {
      // const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
      // console.log(source, " data: ", doc.data());
      this.product = doc.data(); 
    });
    unsub();
  }

  // ✅ PAGINATOR
  pageIndex = 0;
  pageEvent!: PageEvent;
  public handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageIndex = e.pageIndex;
  }
 
  /*
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
  */

}
