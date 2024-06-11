import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { FooterComponent } from './component/footer/footer.component';
import { RouterModule } from '@angular/router';
import { PopNotificationComponent } from './component/pop-notification/pop-notification.component';



@NgModule({
  declarations: [
    SidebarComponent,
    FooterComponent,
    PopNotificationComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [SidebarComponent, FooterComponent, PopNotificationComponent]
})
export class SharedModule { }
