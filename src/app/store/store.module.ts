import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { StoreRoutingModule } from './store-routing.module';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductComponent } from './product/product.component';


@NgModule({
  declarations: [
    CatalogueComponent,
    OrdersComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    SharedModule
  ],
  exports: [
    CatalogueComponent,
  ]
})
export class StoreModule { }
