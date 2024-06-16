import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardPageComponent } from './page/dashboard-page/dashboard-page.component';
import { CourseDetailsPageComponent } from './page/course-details-page/course-details-page.component';


@NgModule({
  declarations: [
    DashboardPageComponent,
    CourseDetailsPageComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
