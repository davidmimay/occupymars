import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { SeoService } from 'src/app/shared/seo.service';
// import { CustomerDataService } from '../customer-data.service';
import { Observable, of } from 'rxjs';
import { doc, onSnapshot, Firestore } from '@angular/fire/firestore';
import { getAuth } from "firebase/auth";

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  customerId: any;
  // customer: Observable<any>;
  customer: any;
  cust: any;
  customers = null;

  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    private seo: SeoService,
    // public data: CustomerDataService
  ) {
    this.customerId = this.route.snapshot.paramMap.get('id');
  }

  // getCustomer(id: string) {
  //   if (this.customers) {
  //     const cached = this.customers.find(v => v.id === id);
  //     console.log('use cached');
  //     return of(cached);
  //   } else {
  //     console.log('use db');
  //     return this.firestore.collection('customers').doc(id).valueChanges();
  //   }

  // }

  ngOnInit() {
    this.customerId = this.route.snapshot.paramMap.get('id');

    // this.customer = this.firestore
    //   .collection('customers')
    //   .doc<any>(customerId)
    //   .valueChanges()
    // this.customer = this.data.getCustomer(this.customerId)
    //   .pipe(
    //     tap(cust =>
    //       this.seo.generateTags({
    //         title: cust.displayName,
    //         description: cust.bio,
    //         image: cust.photoURL,
    //       })
    //     )
    //   );

    const unsub = onSnapshot(doc(this.firestore, 'customers', this.customerId), (doc) => {
      const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
      console.log(source, " data: ", doc.data());
      this.customer = doc.data(); 
    });
    unsub();
  }

}