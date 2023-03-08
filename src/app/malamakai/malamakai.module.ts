import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MalamakaiRoutingModule } from './malamakai-routing.module';
import { OceanComponent } from './ocean/ocean.component';
import { SharedModule } from '../shared/shared.module';
import { PageComponent } from './page/page.component';


@NgModule({
  declarations: [
    OceanComponent,
    PageComponent
  ],
  imports: [
    CommonModule,
    MalamakaiRoutingModule,
    SharedModule
  ],
  exports: [
    OceanComponent
  ]
})
export class MalamakaiModule { }
