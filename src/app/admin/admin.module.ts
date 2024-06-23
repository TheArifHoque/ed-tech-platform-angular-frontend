import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardPageComponent } from './page/dashboard-page/dashboard-page.component';
import { CourseDetailsPageComponent } from './page/course-details-page/course-details-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckPaymentsPageComponent } from './page/check-payments-page/check-payments-page.component';


@NgModule({
  declarations: [
    DashboardPageComponent,
    CourseDetailsPageComponent,
    CheckPaymentsPageComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
