import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { CoursePurchasePageComponent } from './page/course-purchase-page/course-purchase-page.component';


@NgModule({
  declarations: [
    CoursePurchasePageComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
