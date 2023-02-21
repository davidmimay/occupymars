import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EthtomarsPageComponent } from './ethtomars-page/ethtomars-page.component';
import { CourseComponent } from './course/course.component';
import { LessonComponent } from './lesson/lesson.component';

const routes: Routes = [
  { path: '', component: EthtomarsPageComponent },
  { path: ':id', component: CourseComponent },
  { path: ':id/:id', component: LessonComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EthtomarsRoutingModule { }
