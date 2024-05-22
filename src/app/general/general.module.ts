import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallbackPageComponent } from './page/callback-page/callback-page.component';
import { GeneralRoutingModule } from './general-routing.module';
import { HomePageComponent } from './page/home-page/home-page.component';

@NgModule({
  declarations: [
    CallbackPageComponent,
    HomePageComponent
  ],
  imports: [
    CommonModule,
    GeneralRoutingModule,
  ]
})
export class GeneralModule { }
