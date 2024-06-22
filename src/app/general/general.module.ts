import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallbackPageComponent } from './page/callback-page/callback-page.component';
import { GeneralRoutingModule } from './general-routing.module';
import { HomePageComponent } from './page/home-page/home-page.component';
import { ProfilePageComponent } from './page/profile-page/profile-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CoursePreviewPageComponent } from './page/course-preview-page/course-preview-page.component';

@NgModule({
  declarations: [
    CallbackPageComponent,
    HomePageComponent,
    ProfilePageComponent,
    CoursePreviewPageComponent
  ],
  imports: [
    CommonModule,
    GeneralRoutingModule,
    ReactiveFormsModule,
  ]
})
export class GeneralModule { }
