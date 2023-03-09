import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HydroflorumRoutingModule } from './hydroflorum-routing.module';
import { PageComponent } from './page/page.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { ProductComponent } from './product/product.component';

@NgModule({
  declarations: [
    PageComponent,
    CatalogueComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    HydroflorumRoutingModule,
    SharedModule
  ]
})
export class HydroflorumModule { }
