import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EthtomarsRoutingModule } from './ethtomars-routing.module';
import { EthtomarsPageComponent } from './ethtomars-page/ethtomars-page.component';
import { CourseComponent } from './course/course.component';
import { LessonComponent } from './lesson/lesson.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    EthtomarsPageComponent,
    CourseComponent,
    LessonComponent
  ],
  imports: [
    CommonModule,
    EthtomarsRoutingModule,
    SharedModule
  ]
})
export class EthtomarsModule { }
