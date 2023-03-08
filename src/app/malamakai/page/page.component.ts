import { Component } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { SeoService } from 'src/app/shared/seo.service';
import { of } from 'rxjs';

@Component({
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent {
  // customers;
  title = 'Helpers';
  description = 'People supporting the project';

  constructor(
    private firestore: Firestore,
    private seo: SeoService
  ) {}

  ngOnInit() {

    this.seo.generateTags({
      title: this.title,
      description: this.description,
    });

    // this.customers = this.db.collection('customers').valueChanges({ idField: 'id' });
    //this.subscribeToCustomers();
  }

  /*
  getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }*/

  /*
  customers = null;
  subscription;

  subscribeToCustomers() {
    if (!this.customers) {
      this.subscription = this.db.collection('customers').valueChanges({idField: 'id'})
      .subscribe(customers =>  {
        this.customers = customers;
      });
    }
  }

  getCustomer(id: string) {
    if (this.customers) {
      const cached = this.customers.find(v => v.id === id);
      console.log('use cached');
      return of(cached);
    } else {
      console.log('use db');
      return this.db.collection('customers').doc(id).valueChanges();
    }

  }

  dispose() {
    this.subscription.unsubscribe();
    this.customers = null;
  }
  */
}