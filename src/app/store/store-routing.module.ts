import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  { path: '', component: CatalogueComponent },
  { path: 'order', component: OrdersComponent },
  // { path: 'product/:id', component: OrdersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
