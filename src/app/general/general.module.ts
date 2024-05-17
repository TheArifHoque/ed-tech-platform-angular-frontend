import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallbackPageComponent } from './page/callback-page/callback-page.component';
import { GeneralRoutingModule } from './general-routing.module';

@NgModule({
  declarations: [
    CallbackPageComponent
  ],
  imports: [
    CommonModule,
    GeneralRoutingModule,
  ]
})
export class GeneralModule { }
